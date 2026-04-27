import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";
import { config } from "dotenv";

config({ path: ".env.local" }); // učitaj env varijable lokalno

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
);

const TODAY = new Date().toISOString().split("T")[0];

const STATIC_URLS = [
  {
    loc: "https://adiss.dev/",
    priority: "1.0",
    changefreq: "monthly",
    lastmod: TODAY,
  },
  {
    loc: "https://adiss.dev/hire",
    priority: "0.9",
    changefreq: "monthly",
    lastmod: TODAY,
  },
  {
    loc: "https://adiss.dev/pricing",
    priority: "0.9",
    changefreq: "monthly",
    lastmod: TODAY,
  },
  {
    loc: "https://adiss.dev/blog",
    priority: "0.8",
    changefreq: "weekly",
    lastmod: TODAY,
  },
  {
    loc: "https://adiss.dev/uses",
    priority: "0.6",
    changefreq: "yearly",
    lastmod: TODAY,
  },
  {
    loc: "https://adiss.dev/contents/projects",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: TODAY,
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

const { data: posts, error } = await supabase
  .from("posts")
  .select("slug, date, updated_at")
  .eq("published", true)
  .order("date", { ascending: false });

if (error) {
  console.error("Supabase error:", error.message);
  process.exit(1);
}

const blogUrls = (posts || []).map((p) => ({
  loc: `https://adiss.dev/blog/${p.slug}`,
  priority: "0.7",
  changefreq: "yearly",
  lastmod: p.updated_at ? p.updated_at.split("T")[0] : p.date || TODAY,
}));

const allUrls = [...STATIC_URLS, ...blogUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq || "yearly"}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

writeFileSync("public/sitemap.xml", xml);
console.log(
  `Sitemap generated: ${allUrls.length} URLs (${blogUrls.length} blog posts)`,
);
