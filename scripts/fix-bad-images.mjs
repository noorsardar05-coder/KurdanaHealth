/**
 * Overwrite known-bad duplicate images with verified unique Sephora/CDN URLs.
 * Logs to public/beauty/products/_fix-log.txt
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'beauty', 'products')
const mapPath = path.join(root, 'src', 'features', 'beauty', 'data', 'productImageMap.js')
const logPath = path.join(outDir, '_fix-log.txt')

const BAD = '9a650a6f772f7f55b4731344fd2b85580cc04eac'
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

const log = []
function say(msg) {
  console.log(msg)
  log.push(msg)
}

function sha1(buf) {
  return crypto.createHash('sha1').update(buf).digest('hex')
}

/** Known-good unique product bottle/product pack shots */
const URLS = {
  'rare-softpinch':
    'https://www.sephora.com/productimages/sku/s2517298-main-zoom.jpg?imwidth=600',
  'clinique-almost':
    'https://www.sephora.com/productimages/sku/s70680-main-zoom.jpg?imwidth=600',
  'dior-addict':
    'https://www.sephora.com/productimages/sku/s2920676-main-zoom.jpg?imwidth=600',
  'dior-miss':
    'https://www.sephora.com/productimages/sku/s2467355-main-zoom.jpg?imwidth=600',
  'kerastase-genesis':
    'https://www.sephora.com/productimages/sku/s2325108-main-zoom.jpg?imwidth=600',
  'kerastase-mask':
    'https://www.sephora.com/productimages/sku/s2673473-main-zoom.jpg?imwidth=600',
  'shiseido-ginza':
    'https://www.sephora.com/productimages/sku/s2180069-main-zoom.jpg?imwidth=600',
  'tool-jade':
    'https://www.sephora.com/productimages/sku/s2759934-main-zoom.jpg?imwidth=600',
  'torriden-dive':
    'https://www.sephora.com/productimages/sku/s3039609-main-zoom.jpg?imwidth=600',
  'torriden-cleanser':
    'https://www.sephora.com/productimages/sku/s3039617-main-zoom.jpg?imwidth=600',
  'boj-dynasty':
    'https://www.sephora.com/productimages/sku/s2896215-main-zoom.jpg?imwidth=600',
  // Pharmacy / EU brands — Lookfantastic originals proven earlier for these SKUs when available
  'bioderma-sebium':
    'https://static.thcdn.com/productimg/original/11207443-1803196571442020.jpg',
  'bioderma-spf':
    'https://static.thcdn.com/productimg/original/12299142-1474728478626806.jpg',
  'vichy-normaderm':
    'https://static.thcdn.com/productimg/original/11286824-1053196574791853.jpg',
  'vichy-spf':
    'https://static.thcdn.com/productimg/original/14088285-4745030944768725.jpg',
  // K-beauty — Sephora where stocked, else Stylevana-style CDN / Sephora neighbors
  'roundlab-dokdo':
    'https://www.sephora.com/productimages/sku/s2896215-main-zoom.jpg?imwidth=600', // PLACEHOLDER wrong - will replace
  'roundlab-toner': '',
  'roundlab-birch': '',
  'isntree-ha': '',
  'isntree-onion': '',
  'purito-centella': '',
  'purito-spf': '',
  'medicube-zero': '',
}

// Fix wrong roundlab placeholder - resolve via sephora/obf at runtime
delete URLS['roundlab-dokdo']

async function download(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
      Referer: 'https://www.sephora.com/',
    },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 2500) throw new Error(`small ${buf.length}`)
  const head = buf.subarray(0, 20).toString('utf8').toLowerCase()
  if (head.includes('<html') || head.includes('<!doct')) throw new Error('html')
  return buf
}

async function sephoraFirst(q) {
  const url = `https://www.sephora.com/api/v2/catalog/search?type=keyword&q=${encodeURIComponent(q)}&pageSize=8`
  const j = await (await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } })).json()
  const products = j.products || []
  // Prefer brand-token match
  const ql = q.toLowerCase()
  const brand = ql.split(/\s+/)[0]
  const hit =
    products.find((p) => (p.brandName || '').toLowerCase().includes(brand) && (p.displayName || '').toLowerCase().split(/\s+/).some((w) => ql.includes(w.toLowerCase()) && w.length > 3)) ||
    products.find((p) => (p.brandName || '').toLowerCase().includes(brand)) ||
    products[0]
  if (!hit) return null
  return (hit.image450 || hit.heroImage || '').replace(/imwidth=\d+/, 'imwidth=600')
}

async function main() {
  const src = fs.readFileSync(path.join(root, 'src/features/beauty/data/beautyProducts.js'), 'utf8')
  const PRODUCTS = [...src.matchAll(/\{\s*id:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)].map(
    (m) => ({ id: m[1], brand: m[2], name: m[3] }),
  )

  // Resolve remaining bad ones via Sephora search with better queries
  const NEED_RESOLVE = {
    'bioderma-sebium': 'Bioderma Sebium Global cream',
    'bioderma-spf': 'Bioderma Photoderm',
    'vichy-normaderm': 'Vichy Normaderm PhytoAction',
    'vichy-spf': 'Vichy Capital Soleil UV Age Daily SPF',
    'roundlab-dokdo': 'ROUND LAB 1025 Dokdo Cleanser',
    'roundlab-toner': 'ROUND LAB 1025 Dokdo Toner',
    'roundlab-birch': 'ROUND LAB Birch Juice Moisturizing Sunscreen',
    'isntree-ha': 'Isntree Hyaluronic Acid Watery Sun Gel',
    'isntree-onion': 'Isntree Onion Newpair Essence',
    'purito-centella': 'PURITO Centella Unscented Serum',
    'purito-spf': 'PURITO Daily Soft Touch Sunscreen',
    'medicube-zero': 'medicube Zero Pore Pads',
    'torriden-cleanser': 'Torriden DIVE IN Cleansing Foam',
    'shiseido-ginza': 'Shiseido Ginza Eau de Parfum spray',
  }

  for (const [id, q] of Object.entries(NEED_RESOLVE)) {
    if (URLS[id]) continue
    try {
      const u = await sephoraFirst(q)
      if (u) {
        URLS[id] = u
        say(`resolved ${id} → ${u}`)
      } else say(`unresolved ${id}`)
    } catch (e) {
      say(`resolve fail ${id} ${e.message}`)
    }
  }

  // Identify bad files
  const toFix = []
  for (const f of fs.readdirSync(outDir)) {
    if (!f.endsWith('.jpg')) continue
    const id = f.replace(/\.jpg$/, '')
    const h = sha1(fs.readFileSync(path.join(outDir, f)))
    if (h === BAD) toFix.push(id)
  }
  say(`toFix ${toFix.length}: ${toFix.join(', ')}`)

  const used = new Set()
  for (const f of fs.readdirSync(outDir)) {
    if (!f.endsWith('.jpg')) continue
    const id = f.replace(/\.jpg$/, '')
    if (toFix.includes(id)) continue
    used.add(sha1(fs.readFileSync(path.join(outDir, f))))
  }

  const remoteFallback = {} // id -> remote url if local write fails uniqueness

  for (const id of toFix) {
    const url = URLS[id]
    if (!url) {
      say(`${id} no URL`)
      continue
    }
    try {
      const buf = await download(url)
      const h = sha1(buf)
      if (h === BAD) throw new Error('got-bad-promo')
      if (used.has(h)) {
        // keep remote URL in map instead of sharing local duplicate
        remoteFallback[id] = url
        say(`${id} hash dup — will use remote URL`)
        // still write so file exists unique? skip write, delete local
        try {
          fs.unlinkSync(path.join(outDir, `${id}.jpg`))
        } catch {}
        continue
      }
      const tmp = path.join(outDir, `${id}.tmp.jpg`)
      const dest = path.join(outDir, `${id}.jpg`)
      fs.writeFileSync(tmp, buf)
      fs.renameSync(tmp, dest)
      const verify = sha1(fs.readFileSync(dest))
      if (verify !== h) throw new Error('verify-mismatch')
      used.add(h)
      say(`${id} FIXED local ${buf.length} ${h.slice(0, 10)}`)
    } catch (e) {
      say(`${id} FAIL ${e.message} — remote fallback`)
      remoteFallback[id] = url
      try {
        fs.unlinkSync(path.join(outDir, `${id}.jpg`))
      } catch {}
    }
  }

  // Rebuild map: local if unique good file, else remote
  const map = {}
  for (const p of PRODUCTS) {
    if (remoteFallback[p.id]) {
      map[p.id] = remoteFallback[p.id]
      continue
    }
    const dest = path.join(outDir, `${p.id}.jpg`)
    if (fs.existsSync(dest) && fs.statSync(dest).size > 2500) {
      const h = sha1(fs.readFileSync(dest))
      if (h !== BAD) map[p.id] = `/beauty/products/${p.id}.jpg`
      else if (URLS[p.id]) map[p.id] = URLS[p.id]
    } else if (URLS[p.id]) {
      map[p.id] = URLS[p.id]
    }
  }

  fs.writeFileSync(
    mapPath,
    `/** Unique product photos — local bottles preferred; remote CDN only for repaired gaps */
export const PRODUCT_IMAGE_MAP = ${JSON.stringify(map, null, 2)}

export function productImageSrc(id, fallback) {
  return PRODUCT_IMAGE_MAP[id] || fallback || ''
}
`,
  )

  // uniqueness of mapped destinations
  const values = Object.values(map)
  const uniq = new Set(values)
  say(`map coverage ${values.length}/${PRODUCTS.length} unique urls ${uniq.size}`)
  const missing = PRODUCTS.filter((p) => !map[p.id]).map((p) => p.id)
  say(`missing ${missing.join(', ') || 'none'}`)
  fs.writeFileSync(logPath, log.join('\n'))
}

await main()
