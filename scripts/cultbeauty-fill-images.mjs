/**
 * Resolve missing product photos via Cult Beauty search → static.thcdn.com originals.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'beauty', 'products')
const mapPath = path.join(root, 'src', 'features', 'beauty', 'data', 'productImageMap.js')
fs.mkdirSync(outDir, { recursive: true })

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

const src = fs.readFileSync(path.join(root, 'src/features/beauty/data/beautyProducts.js'), 'utf8')
const PRODUCTS = [...src.matchAll(/\{\s*id:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)].map(
  (m) => ({ id: m[1], brand: m[2], name: m[3] }),
)

const ALIAS = {
  'rare-softpinch': 'Rare Beauty Soft Pinch Liquid Blush',
  'ct-pillow': 'Charlotte Tilbury Pillow Talk Lipstick',
  'ct-hairbrush': 'Charlotte Tilbury Airbrush Flawless Finish Powder',
  'ct-hollywoodwand': 'Charlotte Tilbury Beauty Light Wand',
  'nars-orgasm': 'NARS Orgasm Blush',
  'nars-radiant': 'NARS Radiant Creamy Concealer',
  'nars-laguna': 'NARS Laguna Bronzing Powder',
  'fenty-profilt': "Fenty Beauty Pro Filt'r Soft Matte Foundation",
  'fenty-gloss': 'Fenty Beauty Gloss Bomb',
  'fenty-match': 'Fenty Beauty Match Stix Contour',
  'huda-easybake': 'Huda Beauty Easy Bake Powder',
  'huda-obsessions': 'Huda Beauty Nude Obsessions',
  'dior-addict': 'Dior Addict Lip Glow Oil',
  'dior-miss': 'Miss Dior Eau de Parfum',
  'olaplex-7': 'Olaplex No.7 Bonding Oil',
  'olaplex-4': 'Olaplex No.4 Bond Maintenance Shampoo',
  'kerastase-genesis': 'Kerastase Genesis Bain Hydra Fortifiant',
  'kerastase-mask': 'Kerastase Nutritive Masquintense',
  'shiseido-ess': 'Shiseido Ultimune Power Infusing Serum',
  'shiseido-benefiance': 'Shiseido Benefiance Wrinkle Smoothing Cream',
  'shiseido-ginza': 'Shiseido Ginza Eau de Parfum',
  'cosrx-aha': 'COSRX AHA BHA Clarifying Treatment Toner',
  'cosrx-bha': 'COSRX BHA Blackhead Power Liquid',
  'roundlab-dokdo': 'Round Lab 1025 Dokdo Cleanser',
  'roundlab-birch': 'Round Lab Birch Juice Moisturizing Sunscreen',
  'roundlab-toner': 'Round Lab 1025 Dokdo Toner',
  'anua-heartleaf': 'Anua Heartleaf 77 Soothing Toner',
  'skin1004-spf': 'SKIN1004 Hyalu-Cica Water-Fit Sun Serum',
  'skin1004-cleanser': 'SKIN1004 Madagascar Centella Ampoule Foam',
  'laneige-cream': 'Laneige Water Bank Blue Hyaluronic Cream',
  'laneige-cream-skin': 'Laneige Cream Skin Refiner',
  'torriden-dive': 'Torriden DIVE-IN Serum',
  'torriden-cleanser': 'Torriden DIVE-IN Cleansing Foam',
  'purito-centella': 'Purito Centella Unscented Serum',
  'purito-spf': 'Purito Daily Soft Touch Sunscreen',
  'isntree-ha': 'Isntree Hyaluronic Acid Watery Sun Gel',
  'isntree-onion': 'Isntree Onion Newpair Essence',
  'medicube-zero': 'Medicube Zero Pore Blackhead Mud Mask',
  'medicube-age': 'Medicube Age-R Booster Pro',
  'bioderma-sebium': 'Bioderma Sebium Global',
  'bioderma-spf': 'Bioderma Photoderm Aquafluide',
  'vichy-spf': 'Vichy Capital Soleil UV-Age Daily',
  'vichy-normaderm': 'Vichy Normaderm',
  'lrp-retinol': 'La Roche-Posay Redermic Retinol',
  'cerave-sa': 'CeraVe Hydrating Hyaluronic Acid Serum',
  'boj-dynasty': 'Beauty of Joseon Dynasty Cream',
  'clinique-almost': 'Clinique Almost Lipstick Black Honey',
  'mac-fix': 'MAC Studio Fix Fluid',
  'mac-fix-fix': 'MAC Prep + Prime Fix+',
  'tool-jade': 'jade facial roller',
  'tool-gua': 'rose quartz gua sha',
  'tool-brush': 'angled blush brush',
  'tool-derma': 'facial cleansing brush',
  'tool-eyelash': 'heated eyelash curler',
}

async function fetchTimeout(url, ms = 15000, headers = {}) {
  const c = new AbortController()
  const t = setTimeout(() => c.abort(), ms)
  try {
    return await fetch(url, { signal: c.signal, headers: { 'User-Agent': UA, ...headers } })
  } finally {
    clearTimeout(t)
  }
}

function extractThcdn(html) {
  const matches = [...html.matchAll(/https:\/\/static\.thcdn\.com\/productimg\/original\/[0-9]+-[0-9]+\.jpe?g/gi)]
  return [...new Set(matches.map((m) => m[0]))]
}

async function resolveCultBeauty(query) {
  const url = `https://www.cultbeauty.com/search/?q=${encodeURIComponent(query)}`
  const res = await fetchTimeout(url, 18000, { Accept: 'text/html' })
  if (!res.ok) return null
  const html = await res.text()
  const urls = extractThcdn(html)
  return urls[0] || null
}

async function download(url, dest) {
  const res = await fetchTimeout(url, 18000, {
    Accept: 'image/*,*/*',
    Referer: 'https://www.cultbeauty.com/',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 2000) throw new Error(`small ${buf.length}`)
  const head = buf.subarray(0, 20).toString('utf8').toLowerCase()
  if (head.includes('<html') || head.includes('<!doct')) throw new Error('html')
  fs.writeFileSync(dest, buf)
  return buf.length
}

let gained = 0
for (const p of PRODUCTS) {
  const dest = path.join(outDir, `${p.id}.jpg`)
  if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) continue

  const query = ALIAS[p.id] || `${p.brand} ${p.name.split(/[:(]/)[0].trim()}`
  process.stdout.write(`${p.id} ← ${query.slice(0, 42)}… `)
  let imgUrl = null
  try {
    imgUrl = await resolveCultBeauty(query)
  } catch (e) {
    console.log(`search-fail ${e.message}`)
    continue
  }
  if (!imgUrl) {
    console.log('no-img')
    await new Promise((r) => setTimeout(r, 200))
    continue
  }
  try {
    const size = await download(imgUrl, dest)
    gained++
    console.log(`OK ${size}`)
  } catch (e) {
    console.log(`dl-fail ${e.message}`)
  }
  await new Promise((r) => setTimeout(r, 250))
}

const map = {}
for (const p of PRODUCTS) {
  const dest = path.join(outDir, `${p.id}.jpg`)
  if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) map[p.id] = `/beauty/products/${p.id}.jpg`
}

fs.writeFileSync(
  mapPath,
  `/** Unique official-style product bottle photos (local) */
export const PRODUCT_IMAGE_MAP = ${JSON.stringify(map, null, 2)}

export function productImageSrc(id, fallback) {
  return PRODUCT_IMAGE_MAP[id] || fallback || ''
}
`,
)

const missing = PRODUCTS.filter((p) => !map[p.id]).map((p) => p.id)
fs.writeFileSync(path.join(outDir, '_still-missing.txt'), missing.join('\n'))
console.log(`\nGained ${gained}. Coverage ${Object.keys(map).length}/${PRODUCTS.length}`)
console.log('Missing:', missing.join(', ') || 'none')
