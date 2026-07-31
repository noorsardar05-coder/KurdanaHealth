import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const productsPath = path.join(root, 'src', 'features', 'beauty', 'data', 'beautyProducts.js')
const mapPath = path.join(root, 'src', 'features', 'beauty', 'data', 'productImageMap.js')
const reportPath = path.join(root, 'public', 'beauty', 'products', '_remote-map-report.txt')

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

const PRODUCT_RE = /\{\s*id:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g

const CURATED_FALLBACKS = {
  'rare-softpinch': 'https://www.sephora.com/productimages/sku/s2911741-main-zoom.jpg?imwidth=600',
  'nars-orgasm': 'https://www.sephora.com/productimages/sku/s1533058-main-zoom.jpg?imwidth=600',
  'ct-pillow': 'https://www.sephora.com/productimages/sku/s2116507-main-zoom.jpg?imwidth=600',
  'dior-addict': 'https://www.sephora.com/productimages/sku/s2920676-main-zoom.jpg?imwidth=600',
  'dior-miss': 'https://www.sephora.com/productimages/sku/s2467355-main-zoom.jpg?imwidth=600',
  'clinique-almost': 'https://www.sephora.com/productimages/sku/s70680-main-zoom.jpg?imwidth=600',
  'torriden-dive': 'https://www.sephora.com/productimages/sku/s3039609-main-zoom.jpg?imwidth=600',
  'boj-dynasty': 'https://www.sephora.com/productimages/sku/s2896215-main-zoom.jpg?imwidth=600',
  'boj-spf': 'https://www.sephora.com/productimages/sku/s2745115-main-zoom.jpg?imwidth=600',
  'boj-glow': 'https://www.sephora.com/productimages/sku/s2745123-main-zoom.jpg?imwidth=600',
  'cosrx-snail': 'https://www.sephora.com/productimages/sku/s2421387-main-zoom.jpg?imwidth=600',
  'olaplex-7': 'https://www.sephora.com/productimages/sku/s2266765-main-zoom.jpg?imwidth=600',
  'olaplex-4': 'https://www.sephora.com/productimages/sku/s2118867-main-zoom.jpg?imwidth=600',
  'cerave-foam': 'https://www.sephora.com/productimages/sku/s2025633-main-zoom.jpg?imwidth=600',
  'lrp-effaclar': 'https://www.sephora.com/productimages/sku/s2031383-main-zoom.jpg?imwidth=600',
  'vichy-mineral89': 'https://www.sephora.com/productimages/sku/s2210623-main-zoom.jpg?imwidth=600',
  'el-adv-night': 'https://www.sephora.com/productimages/sku/s515890-main-zoom.jpg?imwidth=600',
}

const MIN_SCORE = 2.5
const DELAY_MS = 120

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function normalize(s) {
  return String(s)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
}

function tokens(s, minLen = 2) {
  return normalize(s)
    .replace(/[^a-z0-9+.\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= minLen || /^\d+$/.test(t))
}

function brandTokens(brand) {
  const t = tokens(brand, 2)
  const n = normalize(brand)
  if (n.includes('round lab')) t.push('round', 'lab', '1025')
  if (n.includes('la roche')) t.push('roche', 'laroche')
  return [...new Set(t)]
}

function brandMatches(brand, candidateBrand, product = null) {
  const ncb = normalize(candidateBrand)
  if (product?.id?.startsWith('tool-')) {
    const ok = ['sephora', 'tweezerman', 'foreo', 'shark', 'real techniques', 'danessa', 'revlon']
    if (ok.some((x) => ncb.includes(x))) return true
  }
  const b = brandTokens(brand)
  const cb = tokens(candidateBrand)
  if (!b.length || !cb.length) return false
  return b.some((t) => cb.some((x) => x.includes(t) || t.includes(x)))
}

function scoreProduct(brand, name, candidateBrand, candidateName, product = null) {
  if (!brandMatches(brand, candidateBrand, product)) return 0
  const n = tokens(name)
  const cn = tokens(candidateName)
  let hit = 0
  for (const t of n) {
    if (cn.some((x) => x.includes(t) || t.includes(x))) hit++
  }
  return 2 + (n.length ? hit / n.length : 0) * 5
}

function normalizeSephoraImage(url) {
  if (!url) return ''
  return url.replace(/imwidth=\d+/i, 'imwidth=600')
}

function normalizeObfImage(url) {
  if (!url) return ''
  return url
    .replace(/\.(full|800|200)\.jpg/i, '.400.jpg')
    .replace(/images\.openbeautyfacts\.org\/images\/products\/(\d+)\/(\d+)\/(\d+)\/(\d+)\/front_[a-z]{2}\.\d+\.jpg/i, (m) => {
      if (/\.400\.jpg$/i.test(m)) return m
      return m.replace(/\.(full|\d+)\.jpg$/i, '.400.jpg')
    })
}

function parseProducts(source) {
  const products = []
  let m
  while ((m = PRODUCT_RE.exec(source)) !== null) {
    products.push({ id: m[1], brand: m[2], name: m[3] })
  }
  return products
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function sephoraCandidates(product, json) {
  const ranked = []
  for (const p of json.products || []) {
    const s = scoreProduct(product.brand, product.name, p.brandName || '', p.displayName || '', product)
    if (s < MIN_SCORE) continue
    const img = normalizeSephoraImage(p.image450 || p.heroImage || '')
    if (!img.startsWith('http')) continue
    ranked.push({ score: s, img, label: `${p.brandName} | ${p.displayName}` })
  }
  ranked.sort((a, b) => b.score - a.score)
  return ranked
}

function sephoraQueries(product) {
  const q = new Set()
  q.add(`${product.brand} ${product.name}`)
  if (product.id.startsWith('tool-')) {
    q.add(`Sephora Collection ${product.name}`)
    q.add(`Tweezerman ${product.name}`)
    q.add(`FOREO ${product.name}`)
  }
  if (normalize(product.brand).includes('round lab')) q.add(`Round Lab ${product.name}`)
  const nt = tokens(product.name, 3)
  if (nt.length) q.add(`${product.brand} ${nt.slice(0, 4).join(' ')}`)
  q.add(product.name)
  return [...q]
}

async function searchSephora(product) {
  const all = []
  for (const q of sephoraQueries(product)) {
    const url = `https://www.sephora.com/api/v2/catalog/search?type=keyword&q=${encodeURIComponent(q)}&pageSize=12`
    try {
      const json = await fetchJson(url)
      all.push(...sephoraCandidates(product, json))
    } catch (e) {
      console.warn('Sephora fail', product.id, q, e.message)
    }
    await sleep(60)
  }
  const seen = new Set()
  return all
    .filter((c) => {
      const k = c.img + '|' + c.label
      if (seen.has(k)) return false
      seen.add(k)
      return true
    })
    .sort((a, b) => b.score - a.score)
}

function obfBrandOk(brand, brandsField, productName = '') {
  const hay = normalize(String(brandsField || '') + ' ' + productName)
  const b = brandTokens(brand)
  if (b.some((t) => hay.includes(t))) return true
  const pn = normalize(productName)
  return b.filter((t) => t.length >= 3).every((t) => pn.includes(t))
}

function obfNameScore(name, productName) {
  const n = tokens(name)
  const pn = tokens(productName)
  let hit = 0
  for (const t of pn) {
    if (n.some((x) => x.includes(t) || t.includes(x))) hit++
  }
  return pn.length ? hit / pn.length : 0
}

function obfCandidates(product, json) {
  const ranked = []
  for (const p of json.products || []) {
    if (!obfBrandOk(product.brand, p.brands, p.product_name || p.product_name_en || '')) continue
    const ns = obfNameScore(p.product_name || p.product_name_en || '', product.name)
    if (ns < 0.12) continue
    let img = p.image_front_url || p.image_url || ''
    img = normalizeObfImage(img)
    if (!img.startsWith('http')) continue
    ranked.push({ score: ns, img, label: p.product_name || p.code })
  }
  ranked.sort((a, b) => b.score - a.score)
  return ranked
}

async function searchObf(product) {
  const queries = [
    `${product.brand} ${product.name}`,
    product.brand,
    `${product.brand} ${tokens(product.name).slice(0, 3).join(' ')}`,
  ]
  const seen = new Set()
  const all = []
  for (const q of queries) {
    if (!q.trim()) continue
    const key = q.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    const url = `https://world.openbeautyfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(q)}&json=1&page_size=15`
    try {
      const json = await fetchJson(url)
      all.push(...obfCandidates(product, json))
      await sleep(80)
    } catch (e) {
      console.warn('OBF fail', product.id, q, e.message)
    }
  }
  all.sort((a, b) => b.score - a.score)
  return all
}

function tryAssign(url, usedUrls, collisions) {
  if (!url) return null
  if (usedUrls.has(url)) {
    collisions.push(url)
    return null
  }
  usedUrls.add(url)
  return url
}

function pickFromCandidates(candidates, usedUrls, collisions) {
  for (const c of candidates) {
    const url = tryAssign(c.img, usedUrls, collisions)
    if (url) return { url, via: c.label }
  }
  return null
}

function writeMap(map) {
  const keys = Object.keys(map).sort()
  const lines = keys.map((id) => `  "${id}": "${map[id]}",`)
  const body = `/** Unique official product photographs (remote CDN). */
export const PRODUCT_IMAGE_MAP = {
${lines.join('\n')}
}

export function productImageSrc(id, fallback) {
  return PRODUCT_IMAGE_MAP[id] || fallback || ''
}
`
  fs.writeFileSync(mapPath, body, 'utf8')
}

async function main() {
  fs.mkdirSync(path.dirname(reportPath), { recursive: true })
  const source = fs.readFileSync(productsPath, 'utf8')
  const products = parseProducts(source)
  console.log('Products parsed:', products.length)

  const map = {}
  const usedUrls = new Set()
  const collisions = []
  const sources = {}
  const missing = []

  for (const product of products) {
    let assigned = null

    const sephora = await searchSephora(product)
    assigned = pickFromCandidates(sephora, usedUrls, collisions)
    if (assigned) sources[product.id] = `sephora: ${assigned.via}`

    if (!assigned && CURATED_FALLBACKS[product.id]) {
      const url = tryAssign(CURATED_FALLBACKS[product.id], usedUrls, collisions)
      if (url) {
        assigned = { url, via: 'curated-fallback' }
        sources[product.id] = 'curated-fallback'
      }
    }

    if (!assigned) {
      const obf = await searchObf(product)
      assigned = pickFromCandidates(obf, usedUrls, collisions)
      if (assigned) sources[product.id] = `obf: ${assigned.via}`
    }

    if (assigned) {
      map[product.id] = assigned.url
      console.log('OK', product.id, sources[product.id])
    } else {
      missing.push(product.id)
      console.log('MISS', product.id)
    }

    await sleep(DELAY_MS)
  }

  writeMap(map)

  const uniqueCollisions = [...new Set(collisions)]
  const report = [
    `Generated: ${new Date().toISOString()}`,
    `Total products: ${products.length}`,
    `Coverage: ${Object.keys(map).length}/${products.length}`,
    '',
    'Missing ids:',
    ...(missing.length ? missing.map((id) => `  - ${id}`) : ['  (none)']),
    '',
    `URL collision skips (duplicate URLs rejected): ${uniqueCollisions.length}`,
    ...(uniqueCollisions.length ? uniqueCollisions.map((u) => `  ${u}`) : []),
    '',
    'Assigned sources:',
    ...Object.keys(map)
      .sort()
      .map((id) => `  ${id}: ${sources[id] || '?'}`),
  ].join('\n')

  fs.writeFileSync(reportPath, report, 'utf8')
  console.log('\nCoverage:', Object.keys(map).length, '/', products.length)
  console.log('Missing:', missing.join(', ') || '(none)')
  console.log('Wrote', mapPath)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
