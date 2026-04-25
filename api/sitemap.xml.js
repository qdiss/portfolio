//api>sitemap.xml.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
);

const STATIC_URLS = [
  { loc: "https://adiss.dev/", changefreq: "monthly", priority: "1.0" },
  { loc: "https://adiss.dev/hire", changefreq: "monthly", priority: "0.9" },
  { loc: "https://adiss.dev/blog", changefreq: "weekly", priority: "0.8" },
  { loc: "https://adiss.dev/uses", changefreq: "monthly", priority: "0.6" },
  {
    loc: "https://adiss.dev/contents/projects",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://adiss.dev/contents/projects/medibook",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    loc: "https://adiss.dev/contents/projects/dalmatinske-vizure",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    loc: "https://adiss.dev/contents/projects/travel-app",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    loc: "https://adiss.dev/contents/projects/duolingo-clone",
    changefreq: "monthly",
    priority: "0.7",
  },
];

export default async function handler(req, res) {
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, updated_at, date")
    .eq("published", true)
    .order("date", { ascending: false });

  const dynamicUrls = (posts || []).map((p) => ({
    loc: `https://adiss.dev/blog/${p.slug}`,
    lastmod: (p.updated_at || p.date)?.slice(0, 10),
    changefreq: "never",
    priority: "0.7",
  }));

  const allUrls = [...STATIC_URLS, ...dynamicUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.end(xml);
}
