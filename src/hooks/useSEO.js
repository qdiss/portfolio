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
 * @param {boolean}  [opts.onlyBs]         — true za blog postove (samo bosanski hreflang)
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
  onlyBs = false,
}) {
  useEffect(() => {
    const pageLang = document.documentElement.lang || "en";
    if (pageLang) document.documentElement.lang = pageLang;

    // ── Title ─────────────────────────────────────────────────────────
    if (title) document.title = title;

    // ── Helper: set/create meta ───────────────────────────────────────
    const setMeta = (selector, content) => {
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
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', canonical || window.location.href);
    setMeta(
      'meta[property="og:image"]',
      ogImage || "https://adiss.dev/og-image.png",
    );
    setMeta('meta[property="og:image:alt"]', ogImageAlt || title);
    setMeta('meta[property="og:site_name"]', "adiss.dev");
    setMeta(
      'meta[property="og:locale"]',
      pageLang === "en" ? "en_US" : pageLang,
    );

    // ── Twitter ───────────────────────────────────────────────────────
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta(
      'meta[name="twitter:image"]',
      ogImage || "https://adiss.dev/og-image.png",
    );
    setMeta('meta[name="twitter:image:alt"]', ogImageAlt || title);
    setMeta('meta[name="twitter:card"]', "summary_large_image");

    // ── Article meta (blog posts) ─────────────────────────────────────
    if (articleDate) {
      setMeta('meta[property="article:published_time"]', articleDate);
      setMeta('meta[property="article:author"]', "Adis Klobodanovic");
      setMeta('meta[property="article:publisher"]', "https://adiss.dev");
      if (articleModified) {
        setMeta('meta[property="article:modified_time"]', articleModified);
      }
      if (articleTags?.length) {
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

    // ── Hreflang ─────────────────────────────────────────────────────
    const path = window.location.pathname;
    const allLangs = ["en", "bs", "de", "fr", "nl", "sv"];

    if (onlyBs) {
      // Blog postovi — samo bosanski, makni ostale ako postoje
      allLangs.forEach((l) => {
        document
          .querySelector(`link[rel="alternate"][hreflang="${l}"]`)
          ?.remove();
      });
      document
        .querySelector(`link[rel="alternate"][hreflang="x-default"]`)
        ?.remove();

      // Dodaj bs
      const bsLink = document.createElement("link");
      bsLink.setAttribute("rel", "alternate");
      bsLink.setAttribute("hreflang", "bs");
      bsLink.setAttribute("href", `https://adiss.dev${path}`);
      document.head.appendChild(bsLink);

      // x-default uvijek treba postojati
      const xDefault = document.createElement("link");
      xDefault.setAttribute("rel", "alternate");
      xDefault.setAttribute("hreflang", "x-default");
      xDefault.setAttribute("href", `https://adiss.dev${path}`);
      document.head.appendChild(xDefault);
    } else {
      // Ostale stranice — svih 6 jezika s ?lang= parametrom
      allLangs.forEach((l) => {
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
    }

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

    // Cleanup on unmount
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
    onlyBs,
  ]);
}
