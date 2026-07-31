import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'beauty', 'products')
const mapPath = path.join(root, 'src', 'features', 'beauty', 'data', 'productImageMap.js')

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

const src = fs.readFileSync(path.join(root, 'src/features/beauty/data/beautyProducts.js'), 'utf8')
const PRODUCTS = [...src.matchAll(/\{\s*id:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)].map(
  (m) => ({ id: m[1], brand: m[2], name: m[3] }),
)

const sephoraResolved = JSON.parse(fs.readFileSync(path.join(__dirname, '_sephora-resolved.json'), 'utf8'))

/** Prefer these curated queries / overrides for tricky matches */
const EXTRA_SEPHORA_Q = {
  'nars-orgasm': 'NARS Orgasm Powder Blush',
  'fenty-match': 'Fenty Beauty Match Stix Contour Skinstick',
  'shiseido-ess': 'Shiseido Ultimune Power Infusing Concentrate',
  'shiseido-ginza': 'Shiseido Ginza Eau de Parfum',
  'bioderma-sebium': 'Bioderma Sebium',
  'bioderma-spf': 'Bioderma Photoderm',
  'vichy-normaderm': 'Vichy Normaderm PhytoAction',
  'vichy-spf': 'Vichy Capital Soleil UV-Age Daily',
  'lrp-retinol': 'La Roche-Posay Pure Retinol Face Serum',
  'cerave-sa': 'CeraVe Hydrating Hyaluronic Acid Serum',
  'ct-pillow': 'Charlotte Tilbury Matte Revolution Pillow Talk lipstick',
  'anua-heartleaf': 'Anua Heartleaf 77 Soothing Toner',
  'medicube-age': 'Medicube Age-R Booster Pro',
  'medicube-zero': 'Medicube Zero Pore Pads',
}

const SHOPIFY_TRIES = {
  'cosrx-snail': ['https://www.cosrx.com/products/advanced-snail-96-mucin-power-essence.json'],
  'cosrx-aha': ['https://www.cosrx.com/products/aha-bha-clarifying-treatment-toner.json'],
  'cosrx-bha': ['https://www.cosrx.com/products/bha-blackhead-power-liquid.json'],
  'boj-spf': ['https://beautyofjoseon.com/products/relief-sun-rice-probiotics.json'],
  'boj-glow': ['https://beautyofjoseon.com/products/glow-serum-propolis-niacinamide.json'],
  'boj-dynasty': ['https://beautyofjoseon.com/products/dynasty-cream.json'],
  'olaplex-7': ['https://olaplex.com/products/no-7-bonding-oil.json'],
  'olaplex-4': ['https://olaplex.com/products/no-4-bond-maintenance-shampoo.json'],
  'anua-heartleaf': [
    'https://anuabeauty.com/products/heartleaf-77-soothing-toner.json',
    'https://anua.us/products/heartleaf-77-soothing-toner.json',
    'https://anuaskin.com/products/heartleaf-77-soothing-toner.json',
  ],
  'torriden-dive': [
    'https://torriden.com/products/dive-in-serum.json',
    'https://torriden.us/products/dive-in-low-molecular-hyaluronic-acid-serum.json',
  ],
  'torriden-cleanser': ['https://torriden.com/products/dive-in-low-molecular-hyaluronic-acid-cleansing-foam.json'],
  'roundlab-dokdo': [
    'https://roundlab.us/products/1025-dokdo-cleanser.json',
    'https://round-lab.com/products/1025-dokdo-cleanser.json',
  ],
  'roundlab-toner': ['https://roundlab.us/products/1025-dokdo-toner.json'],
  'roundlab-birch': ['https://roundlab.us/products/birch-juice-moisturizing-sunscreen.json'],
  'purito-centella': ['https://purito.com/products/centella-unscented-serum.json'],
  'purito-spf': ['https://purito.com/products/daily-soft-touch-sunscreen.json'],
  'isntree-ha': ['https://isntree.com/products/hyaluronic-acid-watery-sun-gel.json'],
  'isntree-onion': ['https://isntree.com/products/onion-newpair-essence.json'],
  'medicube-zero': [
    'https://medicube.us/products/zero-pore-pads-2-0.json',
    'https://medicube.us/products/zero-pore-blackhead-mud-mask.json',
  ],
  'medicube-age': ['https://medicube.us/products/age-r-booster-pro.json'],
  'skin1004-spf': ['https://skin1004.us/products/madagascar-centella-hyalu-cica-water-fit-sun-serum.json'],
  'skin1004-cleanser': ['https://skin1004.us/products/madagascar-centella-ampoule-foam.json'],
  'laneige-cream': ['https://us.laneige.com/products/water-bank-blue-hyaluronic-cream-moisturizer.json'],
  'laneige-cream-skin': ['https://us.laneige.com/products/cream-skin-toner-and-moisturizer.json'],
}

/** Last-resort direct image URLs found from retailer CDNs (unique product bottles) */
const DIRECT = {
  'nars-orgasm':
    'https://www.sephora.com/productimages/sku/s1533058-main-zoom.jpg?imwidth=600',
  'roundlab-dokdo':
    'https://cdn.shopify.com/s/files/1/0410/8605/6586/products/1025DokdoCleanser.png?v=1668754300',
  'roundlab-toner':
    'https://cdn.shopify.com/s/files/1/0410/8605/6586/products/1025DokdoToner.png?v=1668754370',
  'roundlab-birch':
    'https://cdn.shopify.com/s/files/1/0410/8605/6586/files/BirchJuiceMoisturizingSunscreen.png',
  'anua-heartleaf':
    'https://cdn.shopify.com/s/files/1/0531/0864/4699/files/anua-heartleaf-77-soothing-toner.jpg',
  'purito-centella':
    'https://cdn.shopify.com/s/files/1/0275/0820/4899/products/Centella_Unscented_Serum.png',
  'purito-spf':
    'https://cdn.shopify.com/s/files/1/0275/0820/4899/files/Daily_Soft_Touch_Sunscreen.png',
  'isntree-ha':
    'https://cdn.shopify.com/s/files/1/0531/0864/4699/products/isntree-hyaluronic-acid-watery-sun-gel.jpg',
  'isntree-onion':
    'https://cdn.shopify.com/s/files/1/0531/0864/4699/products/isntree-onion-newpair-essence.jpg',
  'medicube-zero':
    'https://cdn.shopify.com/s/files/1/0602/7191/6589/files/zero-pore-pads.png',
  'medicube-age':
    'https://cdn.shopify.com/s/files/1/0602/7191/6589/files/age-r-booster-pro.png',
  'bioderma-sebium':
    'https://www.bioderma.com/sites/default/files/styles/thumbnail_550/public/2021-03/sebium-global.png',
  'bioderma-spf':
    'https://www.bioderma.com/sites/default/files/styles/thumbnail_550/public/2021-03/photoderm-aguafluide.png',
  'vichy-normaderm':
    'https://www.vichyusa.com/dw/image/v2/AANG_PRD/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-vichy-master-catalog/default/dw/normaderm.jpg',
  'vichy-spf':
    'https://www.vichyusa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-vichy-master-catalog/default/dw/capital-soleil-uv-age.jpg',
  'lrp-retinol':
    'https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lrp-master-catalog/default/dw/pure-retinol-serum.jpg',
  'cerave-sa':
    'https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products/hydrating-hyaluronic-acid-serum/cerave_hydrating_hyaluronic_acid_serum_30ml_front.png',
  'shiseido-ess':
    'https://www.sephora.com/productimages/sku/s1932920-main-zoom.jpg?imwidth=600',
  'shiseido-ginza':
    'https://www.sephora.com/productimages/sku/s2180069-main-zoom.jpg?imwidth=600',
  'fenty-match':
    'https://www.sephora.com/productimages/sku/s1925536-main-zoom.jpg?imwidth=600',
  'tool-jade':
    'https://www.sephora.com/productimages/sku/s2210755-main-zoom.jpg?imwidth=600',
}

function hashBuf(buf) {
  return crypto.createHash('sha1').update(buf).digest('hex')
}

function tokens(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9+.\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !['the', 'and', 'for', 'with'].includes(t))
}

function scoreMatch(brand, name, candBrand, candName) {
  const b = tokens(brand)
  const n = tokens(name)
  const cb = tokens(candBrand || '')
  const cn = tokens(candName || '')
  const brandHit = b.some((t) => cb.some((x) => x.includes(t) || t.includes(x)))
  if (!brandHit && b.length) return 0
  let hit = 0
  for (const t of n) if (cn.some((x) => x.includes(t) || t.includes(x))) hit++
  const ratio = n.length ? hit / n.length : 0
  if (ratio < 0.34 && hit < 2) return 0
  return (brandHit ? 2 : 0) + ratio * 5 + hit * 0.15
}

async function fetchTimeout(url, ms = 16000, headers = {}) {
  const c = new AbortController()
  const t = setTimeout(() => c.abort(), ms)
  try {
    return await fetch(url, { signal: c.signal, headers: { 'User-Agent': UA, ...headers }, redirect: 'follow' })
  } finally {
    clearTimeout(t)
  }
}

async function download(url, dest, usedHashes) {
  const res = await fetchTimeout(url, 20000, {
    Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
    Referer: 'https://www.sephora.com/',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 2500) throw new Error(`small ${buf.length}`)
  const head = buf.subarray(0, 24).toString('utf8').toLowerCase()
  if (head.includes('<html') || head.includes('<!doct') || head.includes('{') || head.includes('<?xml'))
    throw new Error('not-image')
  const h = hashBuf(buf)
  if (usedHashes.has(h)) throw new Error(`dup-hash ${h.slice(0, 8)}`)
  fs.writeFileSync(dest, buf)
  usedHashes.add(h)
  return { size: buf.length, hash: h }
}

async function sephoraSearch(q, brand, name) {
  const url = `https://www.sephora.com/api/v2/catalog/search?type=keyword&q=${encodeURIComponent(q)}&pageSize=16`
  const res = await fetchTimeout(url, 16000, { Accept: 'application/json' })
  if (!res.ok) return null
  const j = await res.json()
  let best = null
  let bestScore = 0
  for (const p of j.products || []) {
    const s = scoreMatch(brand, name, p.brandName, p.displayName || p.productName)
    if (s > bestScore) {
      bestScore = s
      best = p
    }
  }
  if (!best || bestScore < 2.5) return null
  return (best.image450 || best.heroImage || '').replace(/imwidth=\d+/, 'imwidth=600')
}

async function shopifyImg(urls) {
  for (const u of urls || []) {
    try {
      const res = await fetchTimeout(u, 10000, { Accept: 'application/json' })
      if (!res.ok) continue
      const j = await res.json()
      const img = j.product?.image?.src || j.product?.images?.[0]?.src
      if (img) return img.includes('?') ? `${img}&width=900` : `${img}?width=900`
    } catch {
      /* next */
    }
  }
  return null
}

async function cultBeautySafe(query, brand, name) {
  const url = `https://www.cultbeauty.com/search/?q=${encodeURIComponent(query)}`
  const res = await fetchTimeout(url, 16000, { Accept: 'text/html' })
  if (!res.ok) return null
  const finalUrl = res.url || ''
  const html = await res.text()
  if (/emptySearch=true|zero-results|Do Not Stock This Brand/i.test(finalUrl + html.slice(0, 5000))) return null
  // Pair product titles with nearby thcdn original images
  const blocks = [...html.matchAll(/href="(\/p\/[^"]+)"[^>]*>[\s\S]{0,1200}?productimg\/original\/([0-9]+-[0-9]+\.jpe?g)/gi)]
  let bestUrl = null
  let bestScore = 0
  for (const m of blocks) {
    const slug = decodeURIComponent(m[1]).replace(/[-/]/g, ' ')
    const s = scoreMatch(brand, name, brand, slug)
    if (s > bestScore) {
      bestScore = s
      bestUrl = `https://static.thcdn.com/productimg/original/${m[2]}`
    }
  }
  if (bestScore >= 2.2) return bestUrl
  // Fallback: first original if title appears in page
  const nameTok = tokens(name)[0]
  if (nameTok && html.toLowerCase().includes(nameTok)) {
    const m = html.match(/https:\/\/static\.thcdn\.com\/productimg\/original\/[0-9]+-[0-9]+\.jpe?g/i)
    return m?.[0] || null
  }
  return null
}

async function obf(brand, name) {
  for (const q of [`${brand} ${name}`, name]) {
    const url =
      'https://world.openbeautyfacts.org/cgi/search.pl?' +
      new URLSearchParams({ search_terms: q, search_simple: '1', action: 'process', json: '1', page_size: '10' })
    try {
      const res = await fetchTimeout(url, 12000, { Accept: 'application/json' })
      if (!res.ok) continue
      const data = await res.json()
      for (const p of data.products || []) {
        if (scoreMatch(brand, name, p.brands || '', p.product_name || '') < 2) continue
        const img = p.image_front_url || p.image_url
        if (img) return img.replace(/\.100\.jpg/i, '.400.jpg').replace(/\.200\.jpg/i, '.400.jpg')
      }
    } catch {
      /* next */
    }
  }
  return null
}

function findDupIds() {
  const byHash = new Map()
  for (const f of fs.readdirSync(outDir)) {
    if (!f.endsWith('.jpg')) continue
    const buf = fs.readFileSync(path.join(outDir, f))
    const h = hashBuf(buf)
    if (!byHash.has(h)) byHash.set(h, [])
    byHash.get(h).push(f.replace(/\.jpg$/, ''))
  }
  const dups = []
  for (const [, ids] of byHash) if (ids.length > 1) dups.push(...ids)
  return [...new Set(dups)]
}

const dupIds = findDupIds()
console.log('Repairing dups:', dupIds.length)
for (const id of dupIds) {
  const dest = path.join(outDir, `${id}.jpg`)
  if (fs.existsSync(dest)) fs.unlinkSync(dest)
}

const need = PRODUCTS.filter((p) => !fs.existsSync(path.join(outDir, `${p.id}.jpg`)) || fs.statSync(path.join(outDir, `${p.id}.jpg`)).size < 2500)
console.log('Need:', need.map((p) => p.id).join(', '))

const usedHashes = new Set()
for (const f of fs.readdirSync(outDir)) {
  if (!f.endsWith('.jpg')) continue
  const id = f.replace(/\.jpg$/, '')
  if (need.some((p) => p.id === id)) continue
  usedHashes.add(hashBuf(fs.readFileSync(path.join(outDir, f))))
}

let gained = 0
const report = []

for (const p of need) {
  const dest = path.join(outDir, `${p.id}.jpg`)
  const candidates = []

  if (sephoraResolved[p.id]?.img) candidates.push(['sephora-resolved', sephoraResolved[p.id].img])
  if (EXTRA_SEPHORA_Q[p.id]) {
    try {
      const u = await sephoraSearch(EXTRA_SEPHORA_Q[p.id], p.brand, p.name)
      if (u) candidates.push(['sephora-extra', u])
    } catch {}
  }
  try {
    const u = await sephoraSearch(`${p.brand} ${p.name}`, p.brand, p.name)
    if (u) candidates.push(['sephora', u])
  } catch {}
  try {
    const u = await shopifyImg(SHOPIFY_TRIES[p.id])
    if (u) candidates.push(['shopify', u])
  } catch {}
  try {
    const u = await cultBeautySafe(`${p.brand} ${p.name}`, p.brand, p.name)
    if (u) candidates.push(['cult', u])
  } catch {}
  try {
    const u = await obf(p.brand, p.name)
    if (u) candidates.push(['obf', u])
  } catch {}
  if (DIRECT[p.id]) candidates.push(['direct', DIRECT[p.id]])

  // de-dupe candidate urls
  const seen = new Set()
  const uniq = []
  for (const c of candidates) {
    if (seen.has(c[1])) continue
    seen.add(c[1])
    uniq.push(c)
  }

  let ok = false
  for (const [srcName, url] of uniq) {
    try {
      const { size } = await download(url, dest, usedHashes)
      gained++
      ok = true
      report.push(`${p.id} OK ${srcName} ${size}`)
      console.log(`${p.id} OK ${srcName} ${size}`)
      break
    } catch (e) {
      report.push(`${p.id} fail ${srcName}: ${e.message}`)
    }
  }
  if (!ok) {
    console.log(`${p.id} MISSING`)
    report.push(`${p.id} MISSING`)
  }
  await new Promise((r) => setTimeout(r, 180))
}

const map = {}
for (const p of PRODUCTS) {
  const dest = path.join(outDir, `${p.id}.jpg`)
  if (fs.existsSync(dest) && fs.statSync(dest).size > 2500) map[p.id] = `/beauty/products/${p.id}.jpg`
}
fs.writeFileSync(
  mapPath,
  `/** Unique official product bottle photos (local) */
export const PRODUCT_IMAGE_MAP = ${JSON.stringify(map, null, 2)}

export function productImageSrc(id, fallback) {
  return PRODUCT_IMAGE_MAP[id] || fallback || ''
}
`,
)
const missing = PRODUCTS.filter((p) => !map[p.id]).map((p) => p.id)
const byHash = {}
for (const id of Object.keys(map)) {
  const h = hashBuf(fs.readFileSync(path.join(outDir, `${id}.jpg`))).slice(0, 12)
  ;(byHash[h] ||= []).push(id)
}
const leftover = Object.values(byHash).filter((a) => a.length > 1)
fs.writeFileSync(path.join(outDir, '_still-missing.txt'), missing.join('\n'))
fs.writeFileSync(path.join(outDir, '_repair-report.txt'), report.join('\n'))
console.log(`\nGained ${gained}. Coverage ${Object.keys(map).length}/${PRODUCTS.length}`)
console.log('Missing:', missing.join(', ') || 'none')
console.log('Dup groups:', leftover.length || 'none')
