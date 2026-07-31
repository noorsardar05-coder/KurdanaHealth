import { getBeautyProducts } from "../src/features/beauty/data/beautyProducts.js";
import { L } from "../src/features/beauty/utils/locale.js";

const products = getBeautyProducts();
const ids = new Set();
const dupes = [];
for (const p of products) {
  if (ids.has(p.id)) dupes.push(p.id);
  ids.add(p.id);
}
console.log("Total products:", products.length);
console.log("Unique ids:", ids.size);
console.log("Duplicates:", dupes.length ? dupes.join(", ") : "none");
console.log("With images:", products.filter((p) => p.image).length);
console.log("Without images:", products.filter((p) => !p.image).length);
console.log("Sample EN:", L(products[0].name, "en"), "| KU:", L(products[0].name, "ku"));

const byCat = {};
for (const p of products) {
  byCat[p.category] = (byCat[p.category] || 0) + 1;
}
console.log("By category:", byCat);
