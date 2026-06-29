import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

const BASE = "https://adiss.dev";

function injectCanonical(filePath, url) {
  let html = readFileSync(filePath, "utf8");
  html = html.replace(/<link[^>]*rel="canonical"[^>]*>/g, "");
  html = html.replace(
    "</head>",
    `<link rel="canonical" href="${url}">\n</head>`,
  );
  writeFileSync(filePath, html);
  console.log("canonical: " + url);
}

function walk(dir, urlPath) {
  const indexFile = join(dir, "index.html");
  if (existsSync(indexFile)) {
    injectCanonical(indexFile, BASE + (urlPath || ""));
  }
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      walk(join(dir, entry.name), urlPath + "/" + entry.name);
    }
  }
}

walk("dist", "");
console.log("✓ Canonicals injected");
