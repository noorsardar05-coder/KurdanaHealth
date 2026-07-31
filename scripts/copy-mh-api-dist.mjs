import fs from "node:fs";
import path from "node:path";

const src = "kh-mh-api";
const dest = "dist";
fs.mkdirSync(path.join(dest, "assets"), { recursive: true });
fs.copyFileSync(path.join(src, "index.html"), path.join(dest, "index.html"));
for (const name of fs.readdirSync(path.join(src, "assets"))) {
  fs.copyFileSync(path.join(src, "assets", name), path.join(dest, "assets", name));
  console.log("copied", name);
}
console.log("index", fs.readFileSync(path.join(dest, "index.html"), "utf8").match(/index-[^"']+/)?.[0]);
