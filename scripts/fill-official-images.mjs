/**
 * Fill remaining product photos from official brand Shopify CDNs + known retailer CDNs.
 * Then rebuild PRODUCT_IMAGE_MAP from local files.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'beauty', 'products')
const mapPath = path.join(root, 'src', 'features', 'beauty', 'data', 'productImageMap.js')
fs.mkdirSync(outDir, { recursive: true })

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

/** Official / retailer product bottle photos — unique per id */
const OFFICIAL = {
  'cosrx-snail': 'https://www.cosrx.com/cdn/shop/files/advanced-snail-96-mucin-power-essence-cosrx-official-4.jpg?v=1763111577&width=800',
  'cosrx-aha': 'https://www.cosrx.com/cdn/shop/files/AHA-BHAClarifyingTreatmentToner_1.jpg?width=800',
  'cosrx-bha': 'https://www.cosrx.com/cdn/shop/files/BHABlackheadPowerLiquid_1.jpg?width=800',
  'boj-spf': 'https://beautyofjoseon.com/cdn/shop/files/ReliefSun_RiceProbiotics_1.jpg?width=800',
  'boj-glow': 'https://beautyofjoseon.com/cdn/shop/files/GlowSerum_PropolisNiacinamide.jpg?width=800',
  'anua-heartleaf': 'https://anua.official.com/cdn/shop/files/Heartleaf77SoothingToner.jpg?width=800',
  'torriden-dive': 'https://cdn.shopify.com/s/files/1/0531/0864/4699/products/dive-in-serum.png?width=800',
  'skin1004-ampoule': 'https://skin1004.com/cdn/shop/files/MadagascarCentellaAmpoule.jpg?width=800',
  'laneige-lip': 'https://www.laneige.com/cdn/shop/products/lip-sleeping-mask.jpg?width=800',
  'rare-softpinch': 'https://www.sephora.com/productimages/sku/s2513180-main-zoom.jpg?imwidth=600',
  'ct-pillow': 'https://www.charlottetilbury.com/media/catalog/product/p/i/pillow-talk-lipstick.jpg',
  'nars-orgasm': 'https://www.narscosmetics.com/on/demandware.static/-/Sites-itemmaster_NARS/default/orgasm-blush.jpg',
  'fenty-gloss': 'https://www.fentybeauty.com/dw/image/v2/AAQP_PRD/on/demandware.static/-/Sites-fentybeautymaster/default/dw/gloss-bomb.jpg',
  'olaplex-7': 'https://olaplex.com/cdn/shop/products/No.7_BondingOil.png?width=800',
  'olaplex-4': 'https://olaplex.com/cdn/shop/products/No.4_BondMaintenanceShampoo.png?width=800',
  'dior-miss': 'https://www.dior.com/couture/ecommerce/media/catalog/product/miss-dior-edp.jpg',
  'dior-addict': 'https://www.dior.com/couture/ecommerce/media/catalog/product/addict-lip-glow-oil.jpg',
  'tool-jade': 'https://images.openbeautyfacts.org/images/products/007/790/229/0976/front_en.4.400.jpg',
  'tool-gua': 'https://images.openbeautyfacts.org/images/products/506/053/290/0110/front_en.3.400.jpg',
}

// High-confidence Sweetcare / Lookfantastic-style retailer bottles for missing encyclopedia SKUs
const RETAILER = {
  'cosrx-snail': 'https://static.sweetcare.com/img/prd/488/v-638233396529476297/cosrx-016711kx_01.jpg',
  'cosrx-aha': 'https://static.thcdn.com/productimg/960/960/11289631-5844892062903113.jpg',
  'cosrx-bha': 'https://static.thcdn.com/productimg/960/960/11370303-1044892064189361.jpg',
  'roundlab-dokdo': 'https://static.thcdn.com/productimg/960/960/13983701-2065000289468279.jpg',
  'roundlab-birch': 'https://static.thcdn.com/productimg/960/960/13983684-1335000289382140.jpg',
  'roundlab-toner': 'https://static.thcdn.com/productimg/960/960/13983699-6875000289452855.jpg',
  'anua-heartleaf': 'https://static.thcdn.com/productimg/960/960/14602486-1155047213384372.jpg',
  'skin1004-spf': 'https://static.thcdn.com/productimg/960/960/14408944-1735033221954799.jpg',
  'skin1004-cleanser': 'https://static.thcdn.com/productimg/960/960/13907039-5854972136435014.jpg',
  'laneige-cream': 'https://static.thcdn.com/productimg/960/960/12588255-1344782243739714.jpg',
  'laneige-cream-skin': 'https://static.thcdn.com/productimg/960/960/13516299-1084931039180200.jpg',
  'medicube-zero': 'https://static.thcdn.com/productimg/960/960/14429489-8675038512649719.jpg',
  'torriden-dive': 'https://static.thcdn.com/productimg/960/960/14408959-7095033222139849.jpg',
  'torriden-cleanser': 'https://static.thcdn.com/productimg/960/960/14679257-5575053874715180.jpg',
  'purito-centella': 'https://static.thcdn.com/productimg/960/960/12004855-1894722029596300.jpg',
  'purito-spf': 'https://static.thcdn.com/productimg/960/960/13538077-1024938887302877.jpg',
  'isntree-ha': 'https://static.thcdn.com/productimg/960/960/12664594-6554824059845303.jpg',
  'isntree-onion': 'https://static.thcdn.com/productimg/960/960/13538067-1624938887159375.jpg',
  'boj-dynasty': 'https://static.thcdn.com/productimg/960/960/13907047-1754972136553350.jpg',
  'bioderma-sebium': 'https://static.thcdn.com/productimg/960/960/11207443-1803196571442020.jpg',
  'bioderma-spf': 'https://static.thcdn.com/productimg/960/960/12299142-1474728478626806.jpg',
  'vichy-spf': 'https://static.thcdn.com/productimg/960/960/14088285-4745030944768725.jpg',
  'vichy-normaderm': 'https://static.thcdn.com/productimg/960/960/11286824-1053196574791853.jpg',
  'lrp-retinol': 'https://static.thcdn.com/productimg/960/960/11692687-1974932670768572.jpg',
  'cerave-sa': 'https://static.thcdn.com/productimg/960/960/11715475-3904771010665844.jpg',
  'shiseido-ess': 'https://static.thcdn.com/productimg/960/960/11691656-1855002662522117.jpg',
  'shiseido-benefiance': 'https://static.thcdn.com/productimg/960/960/11691647-7695002662415878.jpg',
  'shiseido-ginza': 'https://static.thcdn.com/productimg/960/960/12355124-5694953390445911.jpg',
  'rare-softpinch': 'https://static.thcdn.com/productimg/960/960/13530819-1324983154159566.jpg',
  'ct-pillow': 'https://static.thcdn.com/productimg/960/960/11370344-8844892064845393.jpg',
  'ct-hairbrush': 'https://static.thcdn.com/productimg/960/960/11691629-1624932670576667.jpg',
  'ct-hollywoodwand': 'https://static.thcdn.com/productimg/960/960/12064138-6724665358201052.jpg',
  'nars-orgasm': 'https://static.thcdn.com/productimg/960/960/11370356-2044892064990299.jpg',
  'nars-radiant': 'https://static.thcdn.com/productimg/960/960/11287484-1513196575040877.jpg',
  'nars-laguna': 'https://static.thcdn.com/productimg/960/960/11287474-7403196574902083.jpg',
  'fenty-profilt': 'https://static.thcdn.com/productimg/960/960/12543422-5124767207009071.jpg',
  'fenty-gloss': 'https://static.thcdn.com/productimg/960/960/12004800-2714665356344426.jpg',
  'fenty-match': 'https://static.thcdn.com/productimg/960/960/12004808-1864665356456179.jpg',
  'huda-easybake': 'https://static.thcdn.com/productimg/960/960/12543441-3374767207285451.jpg',
  'huda-obsessions': 'https://static.thcdn.com/productimg/960/960/12408755-9904740868805738.jpg',
  'dior-addict': 'https://static.thcdn.com/productimg/960/960/13030968-1564926015580871.jpg',
  'dior-miss': 'https://static.thcdn.com/productimg/960/960/13030980-5684926015750215.jpg',
  'kerastase-genesis': 'https://static.thcdn.com/productimg/960/960/12664641-1104824060429522.jpg',
  'kerastase-mask': 'https://static.thcdn.com/productimg/960/960/11287503-1893196575324849.jpg',
  'olaplex-7': 'https://static.thcdn.com/productimg/960/960/12408784-6624740869294931.jpg',
  'olaplex-4': 'https://static.thcdn.com/productimg/960/960/12004830-1334665356783898.jpg',
  'clinique-almost': 'https://static.thcdn.com/productimg/960/960/11286801-5813196574540556.jpg',
  'medicube-age': 'https://static.thcdn.com/productimg/960/960/14602499-2085047213593588.jpg',
  'mac-fix': 'https://static.thcdn.com/productimg/960/960/11287514-1853196575447113.jpg',
  'mac-fix-fix': 'https://static.thcdn.com/productimg/960/960/11287518-5193196575496402.jpg',
  'tool-jade': 'https://static.thcdn.com/productimg/960/960/11691701-9394932671118187.jpg',
  'tool-gua': 'https://static.thcdn.com/productimg/960/960/12664668-2064824060828830.jpg',
  'tool-brush': 'https://static.thcdn.com/productimg/960/960/11287450-1933196574618939.jpg',
  'tool-derma': 'https://static.thcdn.com/productimg/960/960/12064155-1184665358512207.jpg',
  'tool-eyelash': 'https://static.thcdn.com/productimg/960/960/13530845-4994983154626220.jpg',
}

async function fetchTimeout(url, ms = 15000) {
  const c = new AbortController()
  const t = setTimeout(() => c.abort(), ms)
  try {
    return await fetch(url, {
      signal: c.signal,
      headers: {
        'User-Agent': UA,
        Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
        Referer: 'https://www.cultbeauty.com/',
      },
    })
  } finally {
    clearTimeout(t)
  }
}

async function download(url, dest) {
  const res = await fetchTimeout(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1500) throw new Error(`small ${buf.length}`)
  const head = buf.subarray(0, 24).toString('utf8').toLowerCase()
  if (head.includes('<html') || head.includes('<!doct')) throw new Error('html')
  fs.writeFileSync(dest, buf)
  return buf.length
}

const src = fs.readFileSync(path.join(root, 'src/features/beauty/data/beautyProducts.js'), 'utf8')
const PRODUCTS = [...src.matchAll(/\{\s*id:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)].map((m) => m[1])

let gained = 0
for (const id of PRODUCTS) {
  const dest = path.join(outDir, `${id}.jpg`)
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1500) continue
  const url = RETAILER[id] || OFFICIAL[id]
  if (!url) {
    console.log(`${id}: no curated url`)
    continue
  }
  process.stdout.write(`${id}… `)
  try {
    const size = await download(url, dest)
    gained++
    console.log(`OK ${size}`)
  } catch (e) {
    // try cosrx official as second chance for cosrx
    try {
      if (OFFICIAL[id] && OFFICIAL[id] !== url) {
        const size = await download(OFFICIAL[id], dest)
        gained++
        console.log(`OK-alt ${size}`)
        continue
      }
    } catch {
      /* fallthrough */
    }
    console.log(`FAIL ${e.message}`)
  }
  await new Promise((r) => setTimeout(r, 80))
}

// rebuild map strictly from local unique files
const map = {}
for (const id of PRODUCTS) {
  const dest = path.join(outDir, `${id}.jpg`)
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1500) {
    map[id] = `/beauty/products/${id}.jpg`
  }
}

fs.writeFileSync(
  mapPath,
  `/** Auto-generated unique official product photos (local) */
export const PRODUCT_IMAGE_MAP = ${JSON.stringify(map, null, 2)}

export function productImageSrc(id, fallback) {
  return PRODUCT_IMAGE_MAP[id] || fallback || ''
}
`,
)

console.log(`\nGained ${gained}. Local unique photos: ${Object.keys(map).length}/${PRODUCTS.length}`)
const missing = PRODUCTS.filter((id) => !map[id])
fs.writeFileSync(path.join(outDir, '_still-missing.txt'), missing.join('\n'))
console.log('Still missing:', missing.join(', ') || '(none)')
