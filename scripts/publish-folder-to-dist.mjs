import fs from "node:fs";
import path from "node:path";

const src = process.argv[2] || process.env.PUBLISH_FORCE;
if (!src || !fs.existsSync(path.join(src, "index.html"))) {
  console.error("usage: node scripts/publish-folder-to-dist.mjs <build-folder>");
  process.exit(1);
}
const dest = "dist";
fs.mkdirSync(path.join(dest, "assets"), { recursive: true });
fs.copyFileSync(path.join(src, "index.html"), path.join(dest, "index.html"));
for (const name of fs.readdirSync(path.join(src, "assets"))) {
  fs.copyFileSync(path.join(src, "assets", name), path.join(dest, "assets", name));
}
const html = fs.readFileSync(path.join(dest, "index.html"), "utf8");
console.log("published", html.match(/index-[^"']+/)?.[0], "from", src);
