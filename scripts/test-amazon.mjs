import { execSync } from "node:child_process";

function amazon(asin) {
  const html = execSync(`curl.exe -sL -A "Mozilla/5.0" "https://www.amazon.com/dp/${asin}"`, {
    maxBuffer: 15 * 1024 * 1024,
  }).toString();
  const m = html.match(/https:\/\/m\.media-amazon\.com\/images\/I\/([A-Za-z0-9+_-]+)\._AC_[A-Z0-9_]+\./);
  if (!m) return null;
  const id = m[0].match(/\/I\/([A-Za-z0-9+_-]+)\./)[1];
  return `https://m.media-amazon.com/images/I/${id}._AC_SL1500_.jpg`;
}

const asins = {
  "ergobaby-omni-breeze": "B0915Y5S5D",
  "babybjorn-mini": "B07DY3QXS7",
  "babybjorn-harmony": "B07H8XZQZQ",
  "ergobaby-embrace": "B07H8QZQZQ",
  "uppababy-vista-v2": "B0BVWL6GB3",
  "uppababy-minu-v2": "B08F2WZQZQ",
  "bugaboo-butterfly": "B0B5VZQZQZ",
  "bugaboo-fox-5": "B0C5VZQZQZ",
  "doona-plus": "B00K8VZQZQ",
  "medela-freestyle-flex": "B07D5VZQZQ",
  "medela-storage-bags": "B0011ZQZQZ",
  "momcozy-s12-pro": "B09VPRJ2S8",
  "bibs-colour": "B07TQKVCG7",
  "love-to-dream-swaddle-up": "B0081GJ038",
  "braun-thermoscan-7": "B00TYO7XR8",
  "dr-browns-options-plus": "B00E4QZQZQ",
  "tommee-tippee-closer": "B00E4QZQZQ",
  "skip-hop-moonlight": "B00E4QZQZQ",
  "skip-hop-moby-bath": "B00E4QZQZQ",
  "stokke-sleepi-mini": "B00E4QZQZQ",
  "stokke-flexi-bath": "B00E4QZQZQ",
  "stokke-limas": "B08L8QZQZQ",
  "halo-sleepsack-swaddle": "B00E4QZQZQ",
  "halo-bassinest": "B00E4QZQZQ",
};

for (const [k, v] of Object.entries(asins)) {
  console.log(k, v, amazon(v) || "NONE");
}
