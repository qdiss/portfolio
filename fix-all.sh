#!/usr/bin/env bash
set -euo pipefail

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
log()  { echo -e "${GREEN}✓${NC} $1"; }
warn() { echo -e "${YELLOW}⚠${NC}  $1"; }
err()  { echo -e "${RED}✗${NC} $1"; }

# ─────────────────────────────────────────────────────────────────────
# 1. Rewrite src/hooks/useSEO.js
# ─────────────────────────────────────────────────────────────────────
mkdir -p src/hooks
cat > src/hooks/useSEO.js << 'USESEO'
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
USESEO
log "Rewrote src/hooks/useSEO.js"

# ─────────────────────────────────────────────────────────────────────
# 2. index.html — remove hardcoded canonical
# ─────────────────────────────────────────────────────────────────────
if [[ -f "index.html" ]]; then
  if grep -qF 'rel="canonical" href="https://adiss.dev"' index.html; then
    node -e "
      const fs = require('fs');
      let c = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');
      c = c.replace('    <link rel=\"canonical\" href=\"https://adiss.dev\" />\n', '');
      fs.writeFileSync('index.html', c);
      console.log('Patched: index.html');
    "
  else
    warn "No changes: index.html (already patched?)"
  fi
else
  err "File not found: index.html"
fi

# ─────────────────────────────────────────────────────────────────────
# 3. Fragment pages — useSEO( → const seo = useSEO( + inject {seo}
# ─────────────────────────────────────────────────────────────────────
FRAGMENT_PAGES=(
  "src/pages/NotFoundPage.tsx"
  "src/pages/PostPage.jsx"
  "src/pages/PricingPage.jsx"
  "src/pages/ProjectDetailPage.jsx"
  "src/pages/ProjectsListingPage.jsx"
  "src/pages/UsesPage.jsx"
)

for page in "${FRAGMENT_PAGES[@]}"; do
  if [[ ! -f "$page" ]]; then
    err "File not found: $page"
    continue
  fi
  node -e "
    const fs = require('fs');
    const path = '$page';
    let c = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
    const orig = c;
    c = c.replace('  useSEO(', '  const seo = useSEO(');
    c = c.replace(
      '  return (\n    <>\n',
      '  return (\n    <>\n      {seo}\n'
    );
    if (c !== orig) {
      fs.writeFileSync(path, c);
      console.log('Patched: ' + path);
    } else {
      console.log('No changes: ' + path + ' (already patched?)');
    }
  "
done

# ─────────────────────────────────────────────────────────────────────
# 4. BlogPage
# ─────────────────────────────────────────────────────────────────────
if [[ -f "src/pages/BlogPage.jsx" ]]; then
  node -e "
    const fs = require('fs');
    const path = 'src/pages/BlogPage.jsx';
    let c = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
    const orig = c;

    c = c.replace('  useSEO({', '  const seo = useSEO({');

    c = c.replace(
      '  return (\n    <div\n      style={{ display: \"flex\", flexDirection: \"column\", minHeight: \"100vh\" }}\n    >',
      '  return (\n    <>\n      {seo}\n      <div\n        style={{ display: \"flex\", flexDirection: \"column\", minHeight: \"100vh\" }}\n      >'
    );

    const CLOSE = '    </div>\n  );\n}';
    const idx = c.lastIndexOf(CLOSE);
    if (idx !== -1) {
      c = c.slice(0, idx) + '    </div>\n    </>\n  );\n}' + c.slice(idx + CLOSE.length);
    } else {
      console.log('⚠  BlogPage: could not find closing div — check manually');
    }

    if (c !== orig) {
      fs.writeFileSync(path, c);
      console.log('Patched: src/pages/BlogPage.jsx');
    } else {
      console.log('No changes: src/pages/BlogPage.jsx (already patched?)');
    }
  "
else
  err "File not found: src/pages/BlogPage.jsx"
fi

# ─────────────────────────────────────────────────────────────────────
# 5. HirePage
# ─────────────────────────────────────────────────────────────────────
if [[ -f "src/pages/HirePage.jsx" ]]; then
  node -e "
    const fs = require('fs');
    const path = 'src/pages/HirePage.jsx';
    let c = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
    const orig = c;

    c = c.replace('  useSEO({', '  const seo = useSEO({');

    c = c.replace(
      '  return (\n    <div className=\"hire-page-root\">',
      '  return (\n    <>\n      {seo}\n      <div className=\"hire-page-root\">'
    );

    const CLOSE = '    </div>\n  );\n}';
    const idx = c.lastIndexOf(CLOSE);
    if (idx !== -1) {
      c = c.slice(0, idx) + '    </div>\n    </>\n  );\n}' + c.slice(idx + CLOSE.length);
    } else {
      console.log('⚠  HirePage: could not find closing div — check manually');
    }

    if (c !== orig) {
      fs.writeFileSync(path, c);
      console.log('Patched: src/pages/HirePage.jsx');
    } else {
      console.log('No changes: src/pages/HirePage.jsx (already patched?)');
    }
  "
else
  err "File not found: src/pages/HirePage.jsx"
fi

# ─────────────────────────────────────────────────────────────────────
# 6. scripts/get-snap-routes.js
# ─────────────────────────────────────────────────────────────────────
mkdir -p scripts
cat > scripts/get-snap-routes.js << 'SNAPROUTES'
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "fs";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
);

const STATIC_ROUTES = [
  "/",
  "/hire",
  "/pricing",
  "/blog",
  "/uses",
  "/contents/projects",
  "/contents/projects/medibook",
  "/contents/projects/dalmatinske-vizure",
  "/contents/projects/korijen",
  "/contents/projects/travel-app",
  "/contents/projects/duolingo-clone",
  "/contents/projects/instagram-clone",
];

const { data: posts, error } = await supabase
  .from("posts")
  .select("slug")
  .eq("published", true);

if (error) {
  console.error("Supabase error:", error.message);
  process.exit(1);
}

const blogRoutes = (posts || []).map((p) => `/blog/${p.slug}`);
const allRoutes = [...STATIC_ROUTES, ...blogRoutes];

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
pkg.reactSnap.include = allRoutes;
writeFileSync("package.json", JSON.stringify(pkg, null, 2));

console.log(
  `Snap routes: ${allRoutes.length} (${blogRoutes.length} blog posts)`,
);
SNAPROUTES
log "Created scripts/get-snap-routes.js"

# ─────────────────────────────────────────────────────────────────────
# 7. package.json
# ─────────────────────────────────────────────────────────────────────
if [[ -f "package.json" ]]; then
  node -e "
    const fs = require('fs');
    let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8').replace(/\r\n/g, '\n'));

    pkg.scripts = {
      dev: 'vite',
      prebuild: 'node --env-file=.env scripts/generate-sitemap.js && node --env-file=.env scripts/get-snap-routes.js',
      build: 'node node_modules/vite/bin/vite.js build',
      postbuild: 'react-snap',
      preview: 'vite preview',
      'vercel-build': 'npm install && npm run prebuild && npm run build && npm run postbuild',
    };

    pkg.reactSnap = {
      source: 'dist',
      destination: 'dist',
      fallback: 'index.html',
      puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
      puppeteerExecutablePath: 'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
      crawl: false,
      include: [],
      skipThirdPartyRequests: true,
      headless: true,
      viewport: { width: 1440, height: 900 },
      minifyHtml: false,
    };

    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
    console.log('Patched: package.json');
  "
else
  err "File not found: package.json"
fi

# ─────────────────────────────────────────────────────────────────────
echo ""
echo "🎉 Done! Next steps:"
echo "  1. npm run build"
echo "  2. PowerShell: Select-String -Path 'dist\\hire\\index.html' -Pattern 'canonical'"
echo "  3. Provjeri da je canonical https://adiss.dev/hire"
