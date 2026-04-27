import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
);

const STATIC_URLS = [
  {
    loc: "https://adiss.dev/",
    priority: "1.0",
    changefreq: "monthly",
    lastmod: "2025-01-01",
  },
  {
    loc: "https://adiss.dev/hire",
    priority: "0.9",
    changefreq: "monthly",
    lastmod: "2025-01-01",
  },
  {
    loc: "https://adiss.dev/pricing",
    priority: "0.9",
    changefreq: "monthly",
    lastmod: "2025-01-01",
  },
  { loc: "https://adiss.dev/blog", priority: "0.8", changefreq: "weekly" },
  {
    loc: "https://adiss.dev/uses",
    priority: "0.6",
    changefreq: "yearly",
    lastmod: "2025-01-01",
  },
  {
    loc: "https://adiss.dev/contents/projects",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: "2025-01-01",
  },
  {
    loc: "https://adiss.dev/contents/projects/medibook",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    loc: "https://adiss.dev/contents/projects/dalmatinske-vizure",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    loc: "https://adiss.dev/contents/projects/korijen",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    loc: "https://adiss.dev/contents/projects/travel-app",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    loc: "https://adiss.dev/contents/projects/duolingo-clone",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    loc: "https://adiss.dev/contents/projects/instagram-clone",
    priority: "0.7",
    changefreq: "yearly",
  },
];

const { data: posts } = await supabase
  .from("posts")
  .select("slug, date")
  .eq("published", true);

const blogUrls = (posts || []).map((p) => ({
  loc: `https://adiss.dev/blog/${p.slug}`,
  priority: "0.7",
  changefreq: "yearly",
  lastmod: p.date,
}));

const allUrls = [...STATIC_URLS, ...blogUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    ${u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : ""}
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

writeFileSync("public/sitemap.xml", xml);
console.log(`Sitemap generated with ${allUrls.length} URLs`);
