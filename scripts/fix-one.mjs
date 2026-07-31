/**
 * Fix one bad product image per invocation: node scripts/fix-one.mjs <id>
 * Or process next pending: node scripts/fix-one.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'beauty', 'products')
const mapPath = path.join(root, 'src', 'features', 'beauty', 'data', 'productImageMap.js')
const BAD = '9a650a6f772f7f55b4731344fd2b85580cc04eac'
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

function sha1(buf) {
  return crypto.createHash('sha1').update(buf).digest('hex')
}

/** Carefully curated unique product photos */
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
    'https://www.sephora.com/productimages/sku/s2827608-main-zoom.jpg?imwidth=600',
  'nars-orgasm':
    'https://www.sephora.com/productimages/sku/s1533058-main-zoom.jpg?imwidth=600',
  // Open Beauty Facts / Wikimedia-friendly known fronts where available
  'bioderma-sebium':
    'https://images.openbeautyfacts.org/images/products/340/134/495/9603/front_en.4.400.jpg',
  'bioderma-spf':
    'https://images.openbeautyfacts.org/images/products/340/139/537/4416/front_fr.4.400.jpg',
  'vichy-normaderm':
    'https://images.openbeautyfacts.org/images/products/333/787/132/2900/front_en.4.400.jpg',
  'vichy-spf':
    'https://images.openbeautyfacts.org/images/products/333/787/554/9200/front_en.4.400.jpg',
  'roundlab-dokdo':
    'https://images.openbeautyfacts.org/images/products/880/964/739/0123/front_en.3.400.jpg',
  'roundlab-toner':
    'https://images.openbeautyfacts.org/images/products/880/964/739/0116/front_en.3.400.jpg',
  'roundlab-birch':
    'https://images.openbeautyfacts.org/images/products/880/964/739/1632/front_en.3.400.jpg',
  'purito-centella':
    'https://images.openbeautyfacts.org/images/products/880/956/680/0002/front_en.4.400.jpg',
  'purito-spf':
    'https://images.openbeautyfacts.org/images/products/880/948/515/2431/front_en.3.400.jpg',
  'isntree-ha':
    'https://images.openbeautyfacts.org/images/products/880/968/308/0001/front_en.3.400.jpg',
  'isntree-onion':
    'https://images.openbeautyfacts.org/images/products/880/968/308/0124/front_en.3.400.jpg',
  'medicube-zero':
    'https://images.openbeautyfacts.org/images/products/880/941/647/0702/front_en.3.400.jpg',
}

async function dl(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: 'image/*,*/*',
      Referer: 'https://world.openbeautyfacts.org/',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1500) throw new Error(`small ${buf.length}`)
  const head = buf.subarray(0, 20).toString('utf8').toLowerCase()
  if (head.includes('<html') || head.includes('<!doct')) throw new Error('html')
  return buf
}

async function sephoraImg(q, mustInclude) {
  const url = `https://www.sephora.com/api/v2/catalog/search?type=keyword&q=${encodeURIComponent(q)}&pageSize=12`
  const j = await (await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } })).json()
  const must = (mustInclude || '').toLowerCase()
  for (const p of j.products || []) {
    const blob = `${p.brandName} ${p.displayName}`.toLowerCase()
    if (must && !blob.includes(must)) continue
    return (p.image450 || p.heroImage || '').replace(/imwidth=\d+/, 'imwidth=600')
  }
  return null
}

async function obfImg(q) {
  const url =
    'https://world.openbeautyfacts.org/cgi/search.pl?' +
    new URLSearchParams({ search_terms: q, search_simple: '1', action: 'process', json: '1', page_size: '8' })
  const j = await (await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } })).json()
  for (const p of j.products || []) {
    const img = p.image_front_url || p.image_url
    if (img) return img.replace(/\.100\.jpg/i, '.400.jpg').replace(/\.200\.jpg/i, '.400.jpg')
  }
  return null
}

function listBad() {
  return fs
    .readdirSync(outDir)
    .filter((f) => f.endsWith('.jpg'))
    .map((f) => f.replace(/\.jpg$/, ''))
    .filter((id) => sha1(fs.readFileSync(path.join(outDir, `${id}.jpg`))) === BAD)
}

function usedHashes(excludeId) {
  const used = new Set()
  for (const f of fs.readdirSync(outDir)) {
    if (!f.endsWith('.jpg')) continue
    const id = f.replace(/\.jpg$/, '')
    if (id === excludeId || id.startsWith('_')) continue
    used.add(sha1(fs.readFileSync(path.join(outDir, f))))
  }
  return used
}

function rebuildMap(remoteOverrides = {}) {
  const src = fs.readFileSync(path.join(root, 'src/features/beauty/data/beautyProducts.js'), 'utf8')
  const PRODUCTS = [...src.matchAll(/\{\s*id:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)].map(
    (m) => ({ id: m[1] }),
  )
  const prev = {}
  try {
    const raw = fs.readFileSync(mapPath, 'utf8')
    const m = raw.match(/PRODUCT_IMAGE_MAP = (\{[\s\S]*?\})\n/)
    if (m) Object.assign(prev, JSON.parse(m[1]))
  } catch {}
  const map = { ...prev, ...remoteOverrides }
  for (const p of PRODUCTS) {
    if (remoteOverrides[p.id]) continue
    const dest = path.join(outDir, `${p.id}.jpg`)
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1500) {
      const h = sha1(fs.readFileSync(dest))
      if (h !== BAD) map[p.id] = `/beauty/products/${p.id}.jpg`
    }
  }
  fs.writeFileSync(
    mapPath,
    `/** Unique product photos */
export const PRODUCT_IMAGE_MAP = ${JSON.stringify(map, null, 2)}

export function productImageSrc(id, fallback) {
  return PRODUCT_IMAGE_MAP[id] || fallback || ''
}
`,
  )
  return map
}

const idArg = process.argv[2]
const bad = listBad()
const id = idArg || bad[0]
if (!id) {
  console.log('No bad files left')
  rebuildMap()
  process.exit(0)
}

console.log('fixing', id, `(${bad.length} bad remaining)`)
const used = usedHashes(id)
const candidates = []

if (URLS[id]) candidates.push(URLS[id])

const queries = {
  'rare-softpinch': ['Rare Beauty Soft Pinch Liquid Blush', 'rare'],
  'bioderma-sebium': ['Bioderma Sebium Global', 'bioderma'],
  'bioderma-spf': ['Bioderma Photoderm Aquafluide', 'bioderma'],
  'vichy-normaderm': ['Vichy Normaderm', 'vichy'],
  'vichy-spf': ['Vichy Capital Soleil UV-Age', 'vichy'],
  'roundlab-dokdo': ['ROUND LAB Dokdo Cleanser', 'round'],
  'roundlab-toner': ['ROUND LAB Dokdo Toner', 'round'],
  'roundlab-birch': ['ROUND LAB Birch Juice Sunscreen', 'round'],
  'purito-centella': ['PURITO Centella Unscented Serum', 'purito'],
  'purito-spf': ['PURITO Daily Soft Touch Sunscreen', 'purito'],
  'isntree-ha': ['Isntree Watery Sun Gel', 'isntree'],
  'isntree-onion': ['Isntree Onion Newpair', 'isntree'],
  'medicube-zero': ['medicube Zero Pore', 'medicube'],
  'torriden-cleanser': ['Torriden DIVE IN Low Molecular Hyaluronic Acid Cleansing Foam', 'torriden'],
  'torriden-dive': ['Torriden DIVE IN Serum', 'torriden'],
  'shiseido-ginza': ['Shiseido Ginza Eau de Parfum', 'shiseido'],
  'kerastase-genesis': ['Kerastase Genesis Strengthening Shampoo', 'kérastase'],
  'kerastase-mask': ['Kerastase Nutritive Mask', 'kérastase'],
  'dior-addict': ['Dior Lip Glow Oil', 'dior'],
  'dior-miss': ['Miss Dior Eau de Parfum', 'dior'],
  'clinique-almost': ['Clinique Almost Lipstick Black Honey', 'clinique'],
  'tool-jade': ['facial roller sephora collection', 'sephora'],
}

if (queries[id]) {
  try {
    const u = await sephoraImg(queries[id][0], queries[id][1])
    if (u) candidates.push(u)
  } catch (e) {
    console.log('sephora err', e.message)
  }
  try {
    const u = await obfImg(queries[id][0])
    if (u) candidates.push(u)
  } catch (e) {
    console.log('obf err', e.message)
  }
}

let ok = false
for (const url of [...new Set(candidates)]) {
  try {
    const buf = await dl(url)
    const h = sha1(buf)
    if (h === BAD) throw new Error('bad-promo')
    if (used.has(h)) throw new Error('dup-hash')
    const dest = path.join(outDir, `${id}.jpg`)
    const tmp = path.join(outDir, `_${id}.tmp`)
    fs.writeFileSync(tmp, buf)
    fs.renameSync(tmp, dest)
    const verify = sha1(fs.readFileSync(dest))
    if (verify !== h) throw new Error('verify fail')
    console.log('OK local', buf.length, h.slice(0, 10), url.slice(0, 80))
    ok = true
    rebuildMap()
    break
  } catch (e) {
    console.log('fail', e.message, url.slice(0, 70))
  }
}

if (!ok) {
  // last resort: keep remote URL in map and remove bad local
  const remote = candidates[0] || URLS[id]
  if (remote) {
    try {
      fs.unlinkSync(path.join(outDir, `${id}.jpg`))
    } catch {}
    rebuildMap({ [id]: remote })
    console.log('OK remote map', remote.slice(0, 90))
  } else {
    console.log('FAILED', id)
    process.exit(1)
  }
}

console.log('remaining bad', listBad().length)
