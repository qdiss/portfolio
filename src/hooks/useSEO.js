import { useEffect } from "react";

/**
 * useSEO — sets document title + meta tags per page.
 * Call at the top of any page component.
 *
 * @param {Object} opts
 * @param {string} opts.title        — full page title
 * @param {string} [opts.description]
 * @param {string} [opts.canonical]
 * @param {string} [opts.ogImage]
 */
export function useSEO({ title, description, canonical, ogImage }) {
  useEffect(() => {
    // Title
    if (title) document.title = title;

    const setMeta = (selector, content) => {
      if (!content) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const attr = selector.match(/\[([^\]]+)="([^"]+)"\]/);
        if (attr) el.setAttribute(attr[1], attr[2]);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', canonical || window.location.href);
    setMeta(
      'meta[property="og:image"]',
      ogImage || "https://adiss.dev/og-image.png",
    );
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }
  }, [title, description, canonical, ogImage]);
}
