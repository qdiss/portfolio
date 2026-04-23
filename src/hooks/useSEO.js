import { useEffect } from "react";

/**
 * useSEO — sets document title + all meta tags per page.
 * Supports: basic, Open Graph, Twitter, canonical, JSON-LD, article meta.
 *
 * @param {Object} opts
 * @param {string}   opts.title
 * @param {string}   [opts.description]
 * @param {string}   [opts.canonical]
 * @param {string}   [opts.ogImage]
 * @param {string}   [opts.ogImageAlt]
 * @param {string}   [opts.ogType]         — default "website"
 * @param {string}   [opts.articleDate]    — ISO date, triggers article meta
 * @param {string}   [opts.articleModified]
 * @param {string[]} [opts.articleTags]
 * @param {Object}   [opts.jsonLd]         — raw schema object, injected as-is
 * @param {string}   [opts.jsonLdId]       — id of the <script> tag (for updates)
 * @param {string}   [opts.breadcrumb]     — JSON string for BreadcrumbList
 */
export function useSEO({
  title,
  description,
  canonical,
  ogImage,
  ogImageAlt,
  ogType = "website",
  articleDate,
  articleModified,
  articleTags,
  jsonLd,
  jsonLdId = "page-jsonld",
  breadcrumb,
}) {
  useEffect(() => {
    const pageLang = document.documentElement.lang || "en";
    // Keep <html lang> in sync so each page/route is correctly labelled
    if (pageLang) document.documentElement.lang = pageLang;
    // ── Title ─────────────────────────────────────────────────────────
    if (title) document.title = title;

    // ── Helper: set/create meta ───────────────────────────────────────
    const setMeta = (selector, content, isProperty = false) => {
      if (!content) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const attr = selector.match(/\[([^=\]]+)="([^"]+)"\]/);
        if (attr) el.setAttribute(attr[1], attr[2]);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // ── Basic ─────────────────────────────────────────────────────────
    setMeta('meta[name="description"]', description);
    setMeta(
      'meta[name="robots"]',
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    );

    // ── Open Graph ────────────────────────────────────────────────────
    setMeta('meta[property="og:type"]', ogType, true);
    setMeta('meta[property="og:title"]', title, true);
    setMeta('meta[property="og:description"]', description, true);
    setMeta('meta[property="og:url"]', canonical || window.location.href, true);
    setMeta(
      'meta[property="og:image"]',
      ogImage || "https://adiss.dev/og-image.svg",
      true,
    );
    setMeta('meta[property="og:image:alt"]', ogImageAlt || title, true);
    setMeta('meta[property="og:site_name"]', "adiss.dev", true);
    setMeta('meta[property="og:locale"]', pageLang === "en" ? "en_US" : pageLang, true);

    // ── Twitter ───────────────────────────────────────────────────────
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta(
      'meta[name="twitter:image"]',
      ogImage || "https://adiss.dev/og-image.svg",
    );
    setMeta('meta[name="twitter:image:alt"]', ogImageAlt || title);
    setMeta('meta[name="twitter:card"]', "summary_large_image");

    // ── Article meta (blog posts) ─────────────────────────────────────
    if (articleDate) {
      setMeta('meta[property="article:published_time"]', articleDate, true);
      setMeta('meta[property="article:author"]', "Adis Klobodanovic", true);
      setMeta('meta[property="article:publisher"]', "https://adiss.dev", true);
      if (articleModified) {
        setMeta(
          'meta[property="article:modified_time"]',
          articleModified,
          true,
        );
      }
      if (articleTags?.length) {
        // Remove old article:tag metas first
        document
          .querySelectorAll('meta[property="article:tag"]')
          .forEach((el) => el.remove());
        articleTags.forEach((tag) => {
          const el = document.createElement("meta");
          el.setAttribute("property", "article:tag");
          el.setAttribute("content", tag);
          document.head.appendChild(el);
        });
      }
    }

    // ── Canonical ─────────────────────────────────────────────────────
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    // ── Hreflang alternates ───────────────────────────────────────────────
    const path = window.location.pathname;
    const langs = ["en", "bs", "de", "fr", "nl", "sv"];
    langs.forEach((l) => {
      const href = `https://adiss.dev${path}${path.includes("?") ? "&" : "?"}lang=${l}`;
      const selector = `link[rel="alternate"][hreflang="${l}"]`;
      let alt = document.querySelector(selector);
      if (!alt) {
        alt = document.createElement("link");
        alt.setAttribute("rel", "alternate");
        alt.setAttribute("hreflang", l);
        document.head.appendChild(alt);
      }
      alt.setAttribute("href", href);
    });

    // ── JSON-LD structured data ───────────────────────────────────────
    if (jsonLd) {
      let script = document.getElementById(jsonLdId);
      if (!script) {
        script = document.createElement("script");
        script.id = jsonLdId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }

    // ── Breadcrumb JSON-LD ────────────────────────────────────────────
    if (breadcrumb) {
      let bcScript = document.getElementById("breadcrumb-jsonld");
      if (!bcScript) {
        bcScript = document.createElement("script");
        bcScript.id = "breadcrumb-jsonld";
        bcScript.type = "application/ld+json";
        document.head.appendChild(bcScript);
      }
      bcScript.textContent =
        typeof breadcrumb === "string"
          ? breadcrumb
          : JSON.stringify(breadcrumb);
    }

    // Cleanup on unmount: restore default title
    return () => {
      const prev = document.getElementById(jsonLdId);
      if (prev && jsonLd) prev.textContent = "{}";
    };
  }, [
    title,
    description,
    canonical,
    ogImage,
    ogType,
    articleDate,
    articleModified,
    jsonLd,
  ]);
}
