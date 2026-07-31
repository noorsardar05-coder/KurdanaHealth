import fs from "node:fs";
import path from "node:path";

const src = "kh-mh-ai-020453";
const dest = "dist";

if (!fs.existsSync(path.join(src, "index.html"))) {
  console.error("missing build", src);
  process.exit(1);
}

fs.mkdirSync(path.join(dest, "assets"), { recursive: true });
fs.copyFileSync(path.join(src, "index.html"), path.join(dest, "index.html"));
for (const name of fs.readdirSync(path.join(src, "assets"))) {
  fs.copyFileSync(path.join(src, "assets", name), path.join(dest, "assets", name));
  console.log("copied", name);
}

const html = fs.readFileSync(path.join(dest, "index.html"), "utf8");
console.log("index", html.match(/index-[^"']+/)?.[0]);
