/**
 * Resolve official product image URLs → public/ftm-essentials/url-map.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";
import http from "node:http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outPath = path.join(root, "public", "ftm-essentials", "url-map.json");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchRaw(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 10) return reject(new Error("redirects"));
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent": UA,
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.9",
        },
        timeout: 35000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const next = new URL(res.headers.location, url).href;
          res.resume();
          return resolve(fetchRaw(next, redirects + 1));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({
            status: res.statusCode,
            buffer: Buffer.concat(chunks),
            url,
          }),
        );
      },
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("timeout"));
    });
  });
}

async function fetchText(url) {
  const r = await fetchRaw(url);
  return { ...r, text: r.buffer.toString("utf8") };
}

function normalizeSrc(src) {
  if (!src) return null;
  let u = src.replace(/&amp;/g, "&");
  if (u.startsWith("//")) u = `https:${u}`;
  return u;
}

function shopifyImage(productJson) {
  const p = productJson.product;
  if (!p) return null;
  const img = p.image || p.images?.[0];
  if (!img?.src) return null;
  return normalizeSrc(img.src);
}

async function tryShopify(pageUrl) {
  const jsonUrl = pageUrl.replace(/\?.*$/, "").replace(/\/$/, "") + ".json";
  const r = await fetchText(jsonUrl);
  if (r.status !== 200) throw new Error(`shopify ${r.status}`);
  const data = JSON.parse(r.text);
  const src = shopifyImage(data);
  if (!src) throw new Error("no shopify image");
  return src;
}

function extractOg(html) {
  const patterns = [
    /property=["']og:image:secure_url["']\s+content=["']([^"']+)["']/i,
    /property=["']og:image["']\s+content=["']([^"']+)["']/i,
    /content=["']([^"']+)["']\s+property=["']og:image["']/i,
    /"image"\s*:\s*\[?\s*"(https?:[^"]+)"/i,
    /"image"\s*:\s*"([^"]+)"/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1]) return normalizeSrc(m[1]);
  }
  return null;
}

async function tryOg(pageUrl) {
  const r = await fetchText(pageUrl);
  if (r.status !== 200) throw new Error(`og page ${r.status}`);
  const img = extractOg(r.text);
  if (!img) throw new Error("no og:image");
  return img;
}

async function tryPhilips(pageUrl) {
  const r = await fetchText(pageUrl);
  if (r.status !== 200) throw new Error(`philips ${r.status}`);
  const m =
    r.text.match(/images\.philips\.com\/is\/image\/philipsconsumer\/[^"'\s]+/i) ||
    r.text.match(/https:\/\/images\.philips\.com[^"'\s]+/i);
  if (m) return normalizeSrc(m[0].startsWith("http") ? m[0] : `https://${m[0]}`);
  return tryOg(pageUrl);
}

const CATALOG = [
  { id: "nanit-pro", pages: ["https://www.nanit.com/products/smart-baby-monitor"], shopify: true },
  { id: "owlet-dream-sock", pages: ["https://owletcare.com/products/owlet-dream-sock"], shopify: true },
  {
    id: "eufy-spaceview-pro",
    pages: [
      "https://www.eufy.com/au/products/eufy-baby-e210-spaceview-pro-monitor",
      "https://www.eufy.com/nz/products/e8312cd1",
      "https://us.eufy.com/products/t8400121",
    ],
    shopify: true,
  },
  {
    id: "cubo-ai-plus",
    pages: ["https://us.getcubo.com/products/cuboai-plus-smart-baby-monitor-glow"],
    shopify: true,
  },
  { id: "ergobaby-omni-breeze", pages: ["https://ergobaby.com/omni-breeze"], shopify: false },
  {
    id: "babybjorn-mini",
    pages: [
      "https://www.babybjorn.com/products/baby-carriers/baby-carrier-mini-cotton-jersey-dark-green",
      "https://www.babybjorn.com/products/baby-carriers/baby-carrier-mini/",
    ],
    shopify: true,
  },
  {
    id: "babybjorn-harmony",
    pages: [
      "https://www.babybjorn.com/products/baby-carriers/baby-carrier-harmony-3d-mesh-silver",
      "https://www.babybjorn.com/products/baby-carriers/baby-carrier-harmony/",
    ],
    shopify: true,
  },
  { id: "ergobaby-embrace", pages: ["https://ergobaby.com/embrace"], shopify: false },
  { id: "stokke-limas", pages: ["https://www.stokke.com/US/en-us/babywearing/stokke-limas-carrier.html"], shopify: false },
  { id: "uppababy-vista-v2", pages: ["https://uppababy.com/vista/", "https://uppababy.com/products/vista-v3-stroller"], shopify: false },
  { id: "bugaboo-butterfly", pages: ["https://www.bugaboo.com/us-en/strollers/compact-bugaboo-butterfly/"], shopify: false },
  {
    id: "doona-plus",
    pages: [
      "https://www.doona.com/products/doona-infant-car-seat-stroller-plus-nitro-black",
      "https://www.doona.com/products/doona-car-seat-stroller-plus",
    ],
    shopify: true,
  },
  { id: "uppababy-minu-v2", pages: ["https://uppababy.com/minu/", "https://uppababy.com/products/minu-v3-stroller"], shopify: false },
  { id: "bugaboo-fox-5", pages: ["https://www.bugaboo.com/us-en/strollers/full-size-bugaboo-fox-5/"], shopify: false },
  {
    id: "medela-freestyle-flex",
    pages: ["https://www.medela.us/breastfeeding/products/breast-pumps/freestyle-flex-breast-pump"],
    shopify: false,
  },
  {
    id: "spectra-s1-plus",
    pages: ["https://www.spectrababyusa.com/products/spectra-s1-plus-premier-rechargeable-double-electric-breast-pump"],
    shopify: true,
  },
  { id: "elvie-pump", pages: ["https://www.elvie.com/products/elvie-pump"], shopify: true },
  {
    id: "momcozy-s12-pro",
    pages: ["https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump-s12-pro"],
    shopify: true,
  },
  {
    id: "philips-avent-double",
    pages: ["https://www.philips.com/c-p/SCF394_01/avent-natural-response-double-electric-breast-pump"],
    philips: true,
  },
  {
    id: "philips-avent-natural",
    pages: ["https://www.philips.com/c-p/SCY903_01/avent-natural-response-baby-bottle"],
    philips: true,
  },
  { id: "comotomo-natural-feel", pages: ["https://comotomo.com/products/baby-bottle-2"], shopify: true },
  { id: "dr-browns-options-plus", pages: ["https://www.drbrownsbaby.com/product/options-narrow-bottle-8oz-2pk/"], shopify: false },
  { id: "tommee-tippee-closer", pages: ["https://www.tommeetippee.com/en-us/product/closer-to-nature-bottle-9oz-3-pack/"], shopify: false },
  {
    id: "philips-avent-anti-colic",
    pages: ["https://www.philips.com/c-p/SCY703_01/avent-anti-colic-baby-bottle-with-airfree-vent"],
    philips: true,
  },
  { id: "bibs-colour", pages: ["https://bibsworld.com/products/bibs-colour-pacifier-2-pack", "https://bibsworld.com/products/bibs-colour"], shopify: true },
  { id: "philips-soothie", pages: ["https://www.philips.com/c-p/SCF192_05/avent-soothie-pacifier-0-3-months"], philips: true },
  { id: "fridababy-nosefrida", pages: ["https://frida.com/products/nosefrida-the-snotsucker"], shopify: true },
  { id: "hatch-rest-plus", pages: ["https://www.hatch.co/products/rest-plus-second-gen", "https://www.hatch.co/rest-plus-second-gen"], shopify: true },
  { id: "fridababy-humidifier", pages: ["https://frida.com/products/frida-baby-3-in-1-humidifier"], shopify: true },
  {
    id: "halo-sleepsack-swaddle",
    pages: ["https://www.halosleep.com/products/sleepsack-swaddle-100-cotton-heather-gray", "https://www.halosleep.com/sleepsack-swaddle/"],
    shopify: true,
  },
  {
    id: "love-to-dream-swaddle-up",
    pages: ["https://lovetodream.com/products/swaddle-up-original-cotton-1-0-tog-white"],
    shopify: true,
  },
  {
    id: "halo-bassinest",
    pages: ["https://www.halosleep.com/products/bassinest-swivel-sleeper-3-0-series", "https://www.halosleep.com/bassinest/"],
    shopify: true,
  },
  { id: "skip-hop-moonlight", pages: ["https://www.skiphop.com/products/moonlight-and-melodies-crib-mobile-soother"], shopify: false },
  { id: "stokke-sleepi-mini", pages: ["https://www.stokke.com/US/en-us/c/sleepi/sleepi-mini-bed.html"], shopify: false },
  { id: "braun-thermoscan-7", pages: ["https://www.braunhealthcare.com/en-us/products/thermometers/thermoscan-7-irt6520"], shopify: false },
  { id: "fridababy-3in1-ear", pages: ["https://frida.com/products/3-in-1-ear-forehead-touchless-thermometer"], shopify: true },
  { id: "skip-hop-moby-bath", pages: ["https://www.skiphop.com/products/moby-smart-sling-3-stage-tub"], shopify: false },
  { id: "stokke-flexi-bath", pages: ["https://www.stokke.com/US/en-us/bathing/stokke-flexi-bath.html"], shopify: false },
  { id: "fridababy-nailfrida", pages: ["https://frida.com/products/nailfrida-the-snipperclipper-set"], shopify: true },
  { id: "baby-brezza-formula-pro", pages: ["https://babybrezza.com/products/formula-pro-advanced-wifi"], shopify: true },
  { id: "baby-brezza-sterilizer", pages: ["https://babybrezza.com/products/bottle-washer-pro", "https://babybrezza.com/products/one-step-sterilizer-dryer-advanced"], shopify: true },
  { id: "philips-avent-warmer", pages: ["https://www.philips.com/c-p/SCF355_01/avent-premium-fast-bottle-warmer"], philips: true },
  {
    id: "medela-storage-bags",
    pages: ["https://www.medela.us/breastfeeding/products/breast-milk-storage/pump-save-breast-milk-bags"],
    shopify: false,
  },
  { id: "momcozy-nursing-pillow", pages: ["https://momcozy.com/products/momcozy-nursing-pillow-ergonomic-support"], shopify: true },
];

/** Verified CDN URLs when pages block bots (no placeholders) */
const DIRECT = {};

async function tryAmazonSearch(query) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
  const r = await fetchText(url);
  if (r.status !== 200) throw new Error(`amazon ${r.status}`);
  const imgs = [...r.text.matchAll(/https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9+_-]+\._AC_SL1500_\.jpg/g)];
  if (!imgs.length) throw new Error("no amazon image");
  return imgs[0][0];
}

const AMAZON_QUERIES = {
  "eufy-spaceview-pro": "eufy SpaceView Pro baby monitor T8312",
  "ergobaby-omni-breeze": "Ergobaby Omni Breeze carrier",
  "ergobaby-embrace": "Ergobaby Embrace carrier",
  "stokke-limas": "Stokke Limas carrier",
  "uppababy-vista-v2": "UPPAbaby Vista V2 stroller",
  "bugaboo-butterfly": "Bugaboo Butterfly stroller",
  "doona-plus": "Doona Plus car seat stroller",
  "uppababy-minu-v2": "UPPAbaby Minu V2 stroller",
  "bugaboo-fox-5": "Bugaboo Fox 5 stroller",
  "medela-freestyle-flex": "Medela Freestyle Flex breast pump",
  "philips-avent-double": "Philips Avent Natural Response double electric breast pump SCF394",
  "philips-avent-natural": "Philips Avent Natural Response baby bottle SCY903",
  "dr-browns-options-plus": "Dr Browns Options Plus bottle 8oz",
  "tommee-tippee-closer": "Tommee Tippee Closer to Nature bottle",
  "philips-avent-anti-colic": "Philips Avent Anti-colic bottle AirFree SCY703",
  "bibs-colour": "BIBS Colour pacifier 2 pack",
  "philips-soothie": "Philips Avent Soothie pacifier SCF192",
  "hatch-rest-plus": "Hatch Rest Plus second gen",
  "skip-hop-moonlight": "Skip Hop Moonlight Melodies mobile soother",
  "stokke-sleepi-mini": "Stokke Sleepi Mini bed",
  "skip-hop-moby-bath": "Skip Hop Moby Smart Sling tub",
  "stokke-flexi-bath": "Stokke Flexi Bath",
  "philips-avent-warmer": "Philips Avent fast bottle warmer SCF355",
  "medela-storage-bags": "Medela Pump Save breast milk storage bags",
  "momcozy-nursing-pillow": "Momcozy nursing pillow ergonomic",
  "love-to-dream-swaddle-up": "Love to Dream Swaddle Up Original 1.0 TOG",
  "momcozy-s12-pro": "Momcozy S12 Pro wearable breast pump",
};

async function resolveUrl(entry) {
  for (const page of entry.pages) {
    if (entry.shopify) {
      try {
        return await tryShopify(page);
      } catch {}
    }
    if (entry.philips) {
      try {
        return await tryPhilips(page);
      } catch {}
    }
    try {
      return await tryOg(page);
    } catch {}
    await sleep(300);
  }

  if (AMAZON_QUERIES[entry.id]) {
    try {
      return await tryAmazonSearch(AMAZON_QUERIES[entry.id]);
    } catch {}
  }

  if (DIRECT[entry.id]) return DIRECT[entry.id];

  throw new Error("unresolved");
}

const map = {};
const missing = [];

for (const entry of CATALOG) {
  process.stdout.write(`${entry.id}… `);
  try {
    const url = await resolveUrl(entry);
    map[entry.id] = url;
    console.log("OK");
  } catch (e) {
    console.log(`FAIL (${e.message})`);
    missing.push(entry.id);
  }
  await sleep(400);
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(map, null, 2) + "\n");

console.log(`\nCollected ${Object.keys(map).length} / ${CATALOG.length}`);
console.log(`Output: ${outPath}`);
if (missing.length) console.log(`Missing: ${missing.join(", ")}`);
