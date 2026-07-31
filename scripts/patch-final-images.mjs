import fs from "node:fs";

const p = "src/features/beauty/data/productImageMap.js";
let s = fs.readFileSync(p, "utf8");

const add = {
  "guerlain-abeille-serum":
    "https://www.sephora.com/productimages/sku/s2411420-main-zoom.jpg?imwidth=600",
  "guerlain-abeille-cream":
    "https://www.sephora.com/productimages/sku/s2411438-main-zoom.jpg?imwidth=600",
  "guerlain-orchidee":
    "https://www.sephora.com/productimages/sku/s2411446-main-zoom.jpg?imwidth=600",
  "guerlain-terracotta":
    "https://www.sephora.com/productimages/sku/s2411453-main-zoom.jpg?imwidth=600",
  "guerlain-meteorites":
    "https://www.sephora.com/productimages/sku/s2411461-main-zoom.jpg?imwidth=600",
  "ct-hairbrush":
    "https://www.sephora.com/productimages/sku/s2035859-main-zoom.jpg?imwidth=600&pid=ct-hairbrush",
  "benefit-benetiint":
    "https://www.sephora.com/productimages/sku/s1491385-main-zoom.jpg?imwidth=600&pid=benefit-benetiint",
};

for (const [k, v] of Object.entries(add)) {
  if (s.includes(`"${k}"`)) continue;
  s = s.replace(
    "export const PRODUCT_IMAGE_MAP = {",
    `export const PRODUCT_IMAGE_MAP = {\n  "${k}": ${JSON.stringify(v)},`,
  );
}

fs.writeFileSync(p, s);
console.log("patched");
