import { Helmet } from "react-helmet-async";

/**
 * useSEO - sets all meta tags per page via react-helmet-async.
 * Returns JSX — must be rendered inside the component's return.
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
  jsonLdId,
  breadcrumb,
  onlyBs = false,
  noIndex = false,
}) {
  const robots = noIndex
    ? "noindex, nofollow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  const path =
    typeof window !== "undefined"
      ? window.location.pathname
      : canonical?.replace("https://adiss.dev", "") || "/";

  const allLangs = ["en", "bs", "de", "fr", "nl", "sv"];

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta
        property="og:image"
        content={ogImage || "https://adiss.dev/og-image.png"}
      />
      <meta property="og:image:alt" content={ogImageAlt || title || ""} />
      <meta property="og:site_name" content="adiss.dev" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta
        name="twitter:image"
        content={ogImage || "https://adiss.dev/og-image.png"}
      />
      <meta name="twitter:image:alt" content={ogImageAlt || title || ""} />

      {/* Article meta (blog posts) */}
      {articleDate && (
        <meta property="article:published_time" content={articleDate} />
      )}
      {articleDate && (
        <meta property="article:author" content="Adis Klobodanovic" />
      )}
      {articleModified && (
        <meta property="article:modified_time" content={articleModified} />
      )}
      {articleTags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Hreflang */}
      {onlyBs ? (
        <>
          <link
            rel="alternate"
            hreflang="bs"
            href={`https://adiss.dev${path}`}
          />
          <link
            rel="alternate"
            hreflang="x-default"
            href={`https://adiss.dev${path}`}
          />
        </>
      ) : (
        <>
          {allLangs.map((l) => (
            <link
              key={l}
              rel="alternate"
              hreflang={l}
              href={`https://adiss.dev${path}`}
            />
          ))}
          <link
            rel="alternate"
            hreflang="x-default"
            href={`https://adiss.dev${path}`}
          />
        </>
      )}

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      {breadcrumb && (
        <script type="application/ld+json">
          {typeof breadcrumb === "string"
            ? breadcrumb
            : JSON.stringify(breadcrumb)}
        </script>
      )}
    </Helmet>
  );
}
