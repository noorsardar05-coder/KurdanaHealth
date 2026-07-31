import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "kh-bw-atlas");
const dest = path.join(root, "dist");

if (!fs.existsSync(path.join(source, "index.html"))) {
  console.error("missing kh-bw-atlas");
  process.exit(1);
}

console.log("public atlas visceral", fs.existsSync(path.join(root, "public/bodywise/models/atlas/visceral.fbx")));

fs.cpSync(source, dest, { recursive: true });
fs.cpSync(path.join(root, "public/bodywise"), path.join(dest, "bodywise"), { recursive: true });

const html = fs.readFileSync(path.join(dest, "index.html"), "utf8");
const m = html.match(/assets\/index-[^"']+/);
console.log("bundle", m?.[0]);
console.log("atlas visceral", fs.existsSync(path.join(dest, "bodywise/models/atlas/visceral.fbx")));
console.log("atlas cardio", fs.existsSync(path.join(dest, "bodywise/models/atlas/cardiovascular.fbx")));
console.log("atlas nervous", fs.existsSync(path.join(dest, "bodywise/models/atlas/nervous.fbx")));
