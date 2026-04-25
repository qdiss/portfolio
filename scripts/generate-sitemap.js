import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
);

const STATIC_URLS = [
  { loc: "https://adiss.dev/", priority: "1.0" },
  { loc: "https://adiss.dev/hire", priority: "0.9" },
  { loc: "https://adiss.dev/pricing", priority: "0.9" },
  { loc: "https://adiss.dev/blog", priority: "0.8" },
  { loc: "https://adiss.dev/uses", priority: "0.6" },
];

const { data: posts } = await supabase
  .from("posts")
  .select("slug, date")
  .eq("published", true);

const blogUrls = (posts || []).map((p) => ({
  loc: `https://adiss.dev/blog/${p.slug}`,
  priority: "0.7",
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
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

writeFileSync("public/sitemap.xml", xml);
console.log(`Sitemap generated with ${allUrls.length} URLs`);
