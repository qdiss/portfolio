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
