import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";

// Fresh import of products + map
const root = path.resolve(".");
const { getBeautyProducts } = await import(
  pathToFileURL(path.join(root, "src/features/beauty/data/beautyProducts.js")).href + "?t=" + Date.now()
);
const { PRODUCT_IMAGE_MAP } = await import(
  pathToFileURL(path.join(root, "src/features/beauty/data/productImageMap.js")).href + "?t=" + Date.now()
);

const products = getBeautyProducts();
const urls = Object.values(PRODUCT_IMAGE_MAP);
const uniqueUrls = new Set(urls.map((u) => u.split("?")[0].split("&pid=")[0]));
const missing = products.filter((p) => !PRODUCT_IMAGE_MAP[p.id]);
const withImg = products.filter((p) => PRODUCT_IMAGE_MAP[p.id]);

console.log(JSON.stringify({
  products: products.length,
  mapped: Object.keys(PRODUCT_IMAGE_MAP).length,
  withImages: withImg.length,
  missingImages: missing.map((p) => p.id),
  uniqueBaseUrls: uniqueUrls.size,
  totalMappedUrls: urls.length,
}, null, 2));
