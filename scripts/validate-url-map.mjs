import fs from "node:fs";
import path from "node:path";

const root = path.join(import.meta.dirname, "..");
const map = JSON.parse(
  fs.readFileSync(path.join(root, "public/ftm-essentials/url-map.json"), "utf8")
);
const catalogSrc = fs.readFileSync(
  path.join(root, "scripts/download-ftm-product-images.mjs"),
  "utf8"
);
const ids = [...catalogSrc.matchAll(/id: "([^"]+)"/g)].map((m) => m[1]);
const keys = Object.keys(map);
const missing = ids.filter((id) => !keys.includes(id));
const extra = keys.filter((k) => !ids.includes(k));
const urls = Object.values(map);
const dupUrlSet = new Set(
  urls.filter((u, i) => urls.indexOf(u) !== i)
);

console.log("Keys:", keys.length);
console.log("Expected:", ids.length);
console.log("Missing:", missing.length ? missing.join(", ") : "none");
console.log("Extra:", extra.length ? extra.join(", ") : "none");
console.log("Duplicate URLs:", dupUrlSet.size ? [...dupUrlSet].join(", ") : "none");
