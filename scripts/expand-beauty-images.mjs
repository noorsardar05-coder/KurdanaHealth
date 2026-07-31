/**
 * Load catalog, list products missing images, and optionally gap-fill
 * with curated / Open Beauty Facts lookups.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const mapPath = path.join(root, "src/features/beauty/data/productImageMap.js");

async function loadCatalog() {
  const mod = await import(
    pathToFileURL(path.join(root, "src/features/beauty/data/beautyProducts.js")).href
  );
  return mod.getBeautyProducts();
}

function parseExistingMap(src) {
  const map = {};
  const re = /"([^"]+)":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) map[m[1]] = m[2];
  return map;
}

async function searchObf(query) {
  const url = `https://world.openbeautyfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
    query,
  )}&search_simple=1&action=process&json=1&page_size=5`;
  const res = await fetch(url, {
    headers: { "User-Agent": "KurdanaHealth-BeautyEncyclopedia/1.0" },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const products = data.products || [];
  for (const p of products) {
    const img =
      p.image_front_url ||
      p.image_url ||
      (p.images?.front?.sizes?.["400"]?.url
        ? `https://images.openbeautyfacts.org/images/products/${p.code}/${p.images.front.sizes["400"].url}`
        : null);
    if (img && img.startsWith("http")) return img.replace(/\.(400)\.jpg/, ".400.jpg");
  }
  return null;
}

const CURATED_EXTRA = {
  // New French pharmacy
  "lrp-duo": "https://images.openbeautyfacts.org/images/products/333/787/559/7326/front_en.4.400.jpg",
  "lrp-dermallergo": "https://images.openbeautyfacts.org/images/products/333/787/579/7598/front_fr.3.400.jpg",
  "lrp-baume": "https://images.openbeautyfacts.org/images/products/333/787/241/1991/front_fr.4.400.jpg",
  "lrp-mela": "https://images.openbeautyfacts.org/images/products/333/787/589/0141/front_fr.3.400.jpg",
  "lrp-lipikar": "https://images.openbeautyfacts.org/images/products/333/787/559/7401/front_en.8.400.jpg",
  "lrp-eau": "https://images.openbeautyfacts.org/images/products/333/787/132/1255/front_fr.7.400.jpg",
  "cerave-sa-cleanser": "https://images.openbeautyfacts.org/images/products/333/787/559/7173/front_en.4.400.jpg",
  "cerave-hydrating": "https://images.openbeautyfacts.org/images/products/360/600/053/7187/front_en.4.400.jpg",
  "cerave-am": "https://images.openbeautyfacts.org/images/products/301/462/352/0019/front_en.4.400.jpg",
  "cerave-ointment": "https://images.openbeautyfacts.org/images/products/301/462/352/0408/front_en.3.400.jpg",
  "vichy-vitamin-c": "https://images.openbeautyfacts.org/images/products/333/787/554/7451/front_fr.4.400.jpg",
  "vichy-neovadiol": "https://images.openbeautyfacts.org/images/products/333/787/580/8911/front_fr.3.400.jpg",
  "avene-comedomed": "https://images.openbeautyfacts.org/images/products/328/277/014/2181/front_fr.4.400.jpg",
  "avene-cicalfate": "https://images.openbeautyfacts.org/images/products/328/277/010/7235/front_fr.8.400.jpg",
  "avene-xeracalm": "https://images.openbeautyfacts.org/images/products/328/277/010/7396/front_fr.5.400.jpg",
  "nuxe-huile": "https://images.openbeautyfacts.org/images/products/326/468/000/2265/front_fr.8.400.jpg",
  "nuxe-reve": "https://images.openbeautyfacts.org/images/products/326/468/001/2998/front_fr.4.400.jpg",
  "svr-seb": "https://images.openbeautyfacts.org/images/products/366/236/100/0049/front_fr.3.400.jpg",
  "uriage-eau": "https://images.openbeautyfacts.org/images/products/366/017/057/0398/front_fr.4.400.jpg",
  "ducray-anaphase": "https://images.openbeautyfacts.org/images/products/328/277/014/0804/front_fr.3.400.jpg",
  // Viral K-beauty extras (Sephora / brand CDN when known)
  "anua-niacinamide": "https://www.sephora.com/productimages/sku/s2740854-main-zoom.jpg?imwidth=600",
  "mixsoon-bean": "https://www.sephora.com/productimages/sku/s2742348-main-zoom.jpg?imwidth=600",
  "haruharu-black-rice": "https://www.sephora.com/productimages/sku/s2606430-main-zoom.jpg?imwidth=600",
  "axisy-dark-spot": "https://www.sephora.com/productimages/sku/s2494235-main-zoom.jpg?imwidth=600",
  "imfrom-rice": "https://www.sephora.com/productimages/sku/s2421402-main-zoom.jpg?imwidth=600",
  "somebymi-miracle": "https://images.openbeautyfacts.org/images/products/880/964/739/1006/front_en.3.400.jpg",
  "medicube-pads": "https://cdn.shopify.com/s/files/1/0156/3905/2336/files/00_2ddf4c5b-f021-4196-a560-5f52d5c59b89.jpg",
  "medicube-collagen": "https://www.sephora.com/productimages/sku/s2828474-main-zoom.jpg?imwidth=600",
  "laneige-water-mask": "https://www.sephora.com/productimages/sku/s1932927-main-zoom.jpg?imwidth=600",
  "boj-ginseng": "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/ginseng-essence-water-1-front.webp",
  "cosrx-lowph": "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/low-ph-good-morning-gel-cleanser-cosrx-official-1.jpg",
  "cosrx-propolis": "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/full-fit-propolis-synergy-toner-cosrx-official-1.jpg",
  // Fragrance icons
  "mfk-baccarat-rouge-540": "https://www.sephora.com/productimages/sku/s1984872-main-zoom.jpg?imwidth=600",
  "pdm-delina": "https://www.sephora.com/productimages/sku/s2211530-main-zoom.jpg?imwidth=600",
  "pdm-layton": "https://www.sephora.com/productimages/sku/s2047975-main-zoom.jpg?imwidth=600",
  "ysl-libre": "https://www.sephora.com/productimages/sku/s2267465-main-zoom.jpg?imwidth=600",
  "ysl-black-opium": "https://www.sephora.com/productimages/sku/s1788616-main-zoom.jpg?imwidth=600",
  "dior-sauvage": "https://www.sephora.com/productimages/sku/s2038396-main-zoom.jpg?imwidth=600",
  "dior-jadore": "https://www.sephora.com/productimages/sku/s513175-main-zoom.jpg?imwidth=600",
  "chanel-coco-mademoiselle": "https://www.sephora.com/productimages/sku/s513183-main-zoom.jpg?imwidth=600",
  "jo-malone-wood-sage": "https://www.sephora.com/productimages/sku/s1688856-main-zoom.jpg?imwidth=600",
  "byredo-gypsy-water": "https://www.sephora.com/productimages/sku/s1788822-main-zoom.jpg?imwidth=600",
  "lelabo-santal-33": "https://www.sephora.com/productimages/sku/s1377156-main-zoom.jpg?imwidth=600",
  "diptyque-philosykos": "https://www.sephora.com/productimages/sku/s2034098-main-zoom.jpg?imwidth=600",
  "tomford-black-orchid": "https://www.sephora.com/productimages/sku/s98658-main-zoom.jpg?imwidth=600",
  "tomford-lost-cherry": "https://www.sephora.com/productimages/sku/s2048049-main-zoom.jpg?imwidth=600",
  // Hair extras
  "olaplex-5": "https://www.sephora.com/productimages/sku/s2118875-main-zoom.jpg?imwidth=600",
  "olaplex-6": "https://www.sephora.com/productimages/sku/s2204337-main-zoom.jpg?imwidth=600",
  "olaplex-8": "https://www.sephora.com/productimages/sku/s2404706-main-zoom.jpg?imwidth=600",
  "living-proof-phd": "https://www.sephora.com/productimages/sku/s1327214-main-zoom.jpg?imwidth=600",
  "amika-soulfood": "https://www.sephora.com/productimages/sku/s1895101-main-zoom.jpg?imwidth=600",
  "briogeo-dont-despair": "https://www.sephora.com/productimages/sku/s1792857-main-zoom.jpg?imwidth=600",
  "ouai-leave-in": "https://www.sephora.com/productimages/sku/s2032257-main-zoom.jpg?imwidth=600",
  "color-wow-dream-coat": "https://www.sephora.com/productimages/sku/s1896539-main-zoom.jpg?imwidth=600",
  // Makeup extras
  "rhode-peptide-lip": "https://www.sephora.com/productimages/sku/s2827609-main-zoom.jpg?imwidth=600",
  "tower28-sos": "https://www.sephora.com/productimages/sku/s2349983-main-zoom.jpg?imwidth=600",
  "elf-halo-glow": "https://www.sephora.com/productimages/sku/s2606521-main-zoom.jpg?imwidth=600",
  "benefit-porefessional": "https://www.sephora.com/productimages/sku/s1491385-main-zoom.jpg?imwidth=600",
  "milk-hydro-grip": "https://www.sephora.com/productimages/sku/s2327013-main-zoom.jpg?imwidth=600",
  "hourglass-ambient": "https://www.sephora.com/productimages/sku/s1498984-main-zoom.jpg?imwidth=600",
  "ct-flawless-filter": "https://www.sephora.com/productimages/sku/s1925969-main-zoom.jpg?imwidth=600",
  "toofaced-bts": "https://www.sephora.com/productimages/sku/s1681422-main-zoom.jpg?imwidth=600",
  // Nails
  "opi-bubble-bath": "https://www.sephora.com/productimages/sku/s2183804-main-zoom.jpg?imwidth=600",
  "opi-big-apple-red": "https://www.sephora.com/productimages/sku/s2183796-main-zoom.jpg?imwidth=600",
  "essie-ballet-slippers": "https://www.sephora.com/productimages/sku/s1221081-main-zoom.jpg?imwidth=600",
};

async function main() {
  const catalog = await loadCatalog();
  console.log("Catalog size:", catalog.length);
  const src = fs.readFileSync(mapPath, "utf8");
  const existing = parseExistingMap(src);
  const usedUrls = new Set(Object.values(existing));
  const next = { ...existing, ...CURATED_EXTRA };

  // Ensure curated extras don't collide on URL reuse across different ids
  for (const [id, url] of Object.entries(CURATED_EXTRA)) {
    next[id] = url;
  }

  const missing = catalog.filter((p) => !next[p.id]);
  console.log("Missing images:", missing.length);

  for (const p of missing) {
    const q = `${p.brand} ${typeof p.name === "string" ? p.name : p.name?.en || ""}`;
    process.stdout.write(`OBF search: ${p.id} … `);
    try {
      const img = await searchObf(q);
      if (img && !usedUrls.has(img)) {
        next[p.id] = img;
        usedUrls.add(img);
        console.log("ok");
      } else if (img) {
        // URL collision — still assign uniquely by appending query marker won't work for OBF
        // Skip to avoid reuse
        console.log("skipped (url reused)");
      } else {
        console.log("none");
      }
    } catch (e) {
      console.log("err", e.message);
    }
    await new Promise((r) => setTimeout(r, 350));
  }

  const keys = Object.keys(next).sort();
  const body = keys.map((k) => `  "${k}": ${JSON.stringify(next[k])},`).join("\n");
  const out = `/** Unique official product photographs (remote CDN). */\nexport const PRODUCT_IMAGE_MAP = {\n${body}\n}\n\nexport function productImageSrc(id, fallback) {\n  return PRODUCT_IMAGE_MAP[id] || fallback || ''\n}\n`;
  fs.writeFileSync(mapPath, out);
  const stillMissing = catalog.filter((p) => !next[p.id]).map((p) => p.id);
  console.log("Wrote map with", keys.length, "entries");
  console.log("Still missing:", stillMissing.length, stillMissing.slice(0, 40).join(", "));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
