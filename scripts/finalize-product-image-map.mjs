/** Merge gap-fill URLs, validate all 100 products, write final map + report */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const PRODUCTS_PATH = path.join(ROOT, 'src/features/beauty/data/beautyProducts.js')
const MAP_PATH = path.join(ROOT, 'src/features/beauty/data/productImageMap.js')
const REPORT_PATH = path.join(ROOT, 'scripts/product-image-verification-report.txt')

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36'
const MIN_BYTES = 3000

/** Verified gap-fill from prior validation passes */
const GAP_FILL = {
  'lrp-effaclar': {
    url: 'https://images.openbeautyfacts.org/images/products/333/787/241/1083/front_fr.7.400.jpg',
    source: 'obf:Effaclar Gel moussant purifiant',
  },
  'lrp-anthelios': {
    url: 'https://images.openbeautyfacts.org/images/products/869/059/521/4177/front_tr.5.400.jpg',
    source: 'obf:Anthelios',
  },
  'vichy-liftactiv': {
    url: 'https://www.sephora.com/productimages/sku/s2210631-main-zoom.jpg?imwidth=600',
    source: 'sephora:s2210631',
  },
  'avene-tol': {
    url: 'https://images.openbeautyfacts.org/images/products/328/277/013/8801/front_fr.12.400.jpg',
    source: 'obf:Toleriane',
  },
  'bioderma-sebium': {
    url: 'https://images.openbeautyfacts.org/images/products/340/157/865/3709/front_fr.5.400.jpg',
    source: 'obf:Sebium',
  },
  'roundlab-birch': {
    url: 'https://cdn.shopify.com/s/files/1/0651/7656/8022/files/BIRCH_JUICE_MOISTURIZING_UVLOCK3_Large_10126e46-dfcc-4cd5-970c-146d4be65989.webp?v=1772852134',
    source: 'shopify:roundlab.com/birch-moisturizing-uv-sunscreen',
  },
  'skin1004-ampoule': {
    url: 'https://images.openbeautyfacts.org/images/products/880/957/626/0601/front_en.3.400.jpg',
    source: 'obf:Madagascar Centella Ampoule',
  },
  'skin1004-spf': {
    url: 'https://images.openbeautyfacts.org/images/products/880/991/383/0177/front_fr.3.400.jpg',
    source: 'obf:Hyalu-Cica Water-Fit Sun Serum',
  },
  'purito-centella': {
    url: 'https://images.openbeautyfacts.org/images/products/880/956/310/0095/front_en.6.400.jpg',
    source: 'obf:Centella Unscented Serum',
  },
  'shiseido-ess': {
    url: 'https://www.sephora.com/productimages/sku/s1932920-main-zoom.jpg?imwidth=600',
    source: 'sephora:s1932920',
  },
  'shiseido-ginza': {
    url: 'https://images.openbeautyfacts.org/images/products/076/861/419/1100/front_fr.7.400.jpg',
    source: 'obf:Ginza Eau de Parfum',
  },
  'lrp-retinol': {
    url: 'https://images.openbeautyfacts.org/images/products/333/787/569/4469/front_en.7.400.jpg',
    source: 'obf:Retinol B3 Serum',
  },
  'cerave-sa': {
    url: 'https://images.openbeautyfacts.org/images/products/333/787/559/7180/front_en.35.400.jpg',
    source: 'obf:SA Smoothing Cleanser',
  },
  'cerave-eye': {
    url: 'https://images.openbeautyfacts.org/images/products/333/787/559/8996/front_en.28.400.jpg',
    source: 'obf:Eye Repair Cream',
  },
  'vichy-normaderm': {
    url: 'https://images.openbeautyfacts.org/images/products/333/787/555/3278/front_fr.4.400.jpg',
    source: 'obf:Normaderm Phytosolution',
  },
  'avene-eau': {
    url: 'https://images.openbeautyfacts.org/images/products/328/277/900/3124/front_en.10.400.jpg',
    source: 'obf:Eau Thermale',
  },
  'purito-spf': {
    url: 'https://images.openbeautyfacts.org/images/products/880/956/310/3072/front_ru.3.400.jpg',
    source: 'obf:Daily Go-To Sunscreen',
  },
  'skin1004-cleanser': {
    url: 'https://images.openbeautyfacts.org/images/products/880/957/626/1769/front_en.3.400.jpg',
    source: 'obf:Ampoule Foam Cleanser',
  },
  'redken-shampoo': {
    url: 'https://images.openbeautyfacts.org/images/products/088/448/645/2986/front_en.3.400.jpg',
    source: 'obf:Extreme Shampoo',
  },
  'avene-spf': {
    url: 'https://images.openbeautyfacts.org/images/products/328/277/014/1214/front_fr.6.400.jpg',
    source: 'obf:Intense Protect SPF50+',
  },
  'bioderma-spf': {
    url: 'https://images.openbeautyfacts.org/images/products/340/152/852/0846/front_fr.3.400.jpg',
    source: 'obf:Photoderm SPF',
  },
  'vichy-spf': {
    url: 'https://images.openbeautyfacts.org/images/products/333/787/132/7804/front_en.18.400.jpg',
    source: 'obf:Capital Soleil SPF',
  },
  'clinique-almost': {
    url: 'https://www.sephora.com/productimages/sku/s70680-main-zoom.jpg?imwidth=600',
    source: 'sephora:s70680',
  },
}

/** Isntree candidates to probe */
const ISNTREE_CANDIDATES = {
  'isntree-ha': [
    { url: 'https://images.openbeautyfacts.org/images/products/880/953/423/0132/front_en.4.400.jpg', source: 'obf:8809534230132' },
    { url: 'https://www.sephora.com/productimages/sku/s2929289-main-zoom.jpg?imwidth=600', source: 'sephora:s2929289' },
    { url: 'https://www.sephora.com/productimages/sku/s2697568-main-zoom.jpg?imwidth=600', source: 'sephora:s2697568' },
    { url: 'https://cdn.shopify.com/s/files/1/0531/0864/4699/products/isntree-hyaluronic-acid-watery-sun-gel.jpg', source: 'shopify:isntree.com' },
    { url: 'https://maskmarie.com/cdn/shop/files/isntree-hyaluronic-acid-watery-sun-gel.webp', source: 'maskmarie' },
    { url: 'https://wooltariusa.com/cdn/shop/files/isntree_hyaluronic_sun_gel.jpg', source: 'wooltariusa' },
  ],
  'isntree-onion': [
    { url: 'https://images.openbeautyfacts.org/images/products/880/953/423/0613/front_en.3.400.jpg', source: 'obf:8809534230613' },
    { url: 'https://www.sephora.com/productimages/sku/s2960003-main-zoom.jpg?imwidth=600', source: 'sephora:s2960003' },
    { url: 'https://cdn.shopify.com/s/files/1/0531/0864/4699/products/isntree-onion-newpair-essence.jpg', source: 'shopify:isntree.com' },
    { url: 'https://maskmarie.com/cdn/shop/files/isntree-onion-newpair-essence-toner.webp', source: 'maskmarie' },
  ],
}

function parseProducts(raw) {
  const re = /\{\s*id:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g
  const out = []
  let m
  while ((m = re.exec(raw))) out.push({ id: m[1], brand: m[2], name: m[3] })
  return out
}

function parseExistingMap(raw) {
  const re = /"([^"]+)":\s*"(https:[^"]+)"/g
  const out = {}
  let m
  while ((m = re.exec(raw))) out[m[1]] = m[2]
  return out
}

async function validateUrl(url) {
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': UA, Accept: 'image/*,*/*' },
      redirect: 'follow',
    })
    const ct = (r.headers.get('content-type') || '').toLowerCase()
    const buf = Buffer.from(await r.arrayBuffer())
    const ok =
      r.status === 200 &&
      buf.length >= MIN_BYTES &&
      !ct.includes('text/html') &&
      !buf.slice(0, 15).toString('utf8').toLowerCase().includes('<!doctype')
    return { ok, status: r.status, size: buf.length, ct }
  } catch (e) {
    return { ok: false, error: e.message }
  }
}

async function fetchIsntreeShopify(handle) {
  try {
    const r = await fetch(`https://isntree.com/products/${handle}.json`, {
      headers: { 'User-Agent': UA },
    })
    if (!r.ok) return null
    const j = await r.json()
    const src = j.product?.images?.[0]?.src
    return src ? { url: src, source: `shopify:isntree.com/${handle}` } : null
  } catch {
    return null
  }
}

async function resolveIsntree() {
  const resolved = {}
  const handles = {
    'isntree-ha': 'hyaluronic-acid-watery-sun-gel-spf50-pa',
    'isntree-onion': 'onion-newpair-essence-toner',
  }
  for (const [id, handle] of Object.entries(handles)) {
    const shop = await fetchIsntreeShopify(handle)
    if (shop) ISNTREE_CANDIDATES[id].unshift(shop)
  }
  for (const [id, candidates] of Object.entries(ISNTREE_CANDIDATES)) {
    for (const c of candidates) {
      const v = await validateUrl(c.url)
      console.log(`  ${id} ${v.ok ? 'OK' : 'FAIL'} ${v.size || v.status || v.error} ${c.source}`)
      if (v.ok) {
        resolved[id] = { ...c, size: v.size }
        break
      }
    }
  }
  return resolved
}

async function main() {
  const productsRaw = fs.readFileSync(PRODUCTS_PATH, 'utf8')
  const products = parseProducts(productsRaw)
  const existingRaw = fs.readFileSync(MAP_PATH, 'utf8')
  const existing = parseExistingMap(existingRaw)

  console.log(`Products: ${products.length}, existing map: ${Object.keys(existing).length}`)
  console.log('\nResolving Isntree…')
  const isntree = await resolveIsntree()

  const merged = { ...existing }
  const meta = {}

  for (const [id, entry] of Object.entries(GAP_FILL)) merged[id] = entry.url
  for (const [id, entry] of Object.entries(isntree)) merged[id] = entry.url

  console.log('\nValidating all URLs…')
  const usedUrls = new Map()
  const rows = []

  for (const p of products) {
    const url = merged[p.id]
    if (!url) {
      rows.push({ ...p, url: 'MISSING', source: '-', size: 0, ok: false })
      continue
    }
    const v = await validateUrl(url)
    let source = GAP_FILL[p.id]?.source || isntree[p.id]?.source || 'existing-map'
    if (source === 'existing-map' && url.includes('sephora.com')) {
      const sku = url.match(/sku\/(s\d+)/)?.[1]
      if (sku) source = `sephora:${sku}`
    } else if (source === 'existing-map' && url.includes('openbeautyfacts')) {
      source = 'obf'
    } else if (source === 'existing-map' && url.includes('cdn.shopify')) {
      source = 'shopify'
    }
    const dup = usedUrls.get(url)
    rows.push({
      ...p,
      url,
      source,
      size: v.size || 0,
      ok: v.ok && !dup,
      dup: dup || null,
      status: v.status,
    })
    if (v.ok) usedUrls.set(url, p.id)
  }

  const okRows = rows.filter((r) => r.ok)
  const missing = rows.filter((r) => r.url === 'MISSING')
  const failed = rows.filter((r) => r.url !== 'MISSING' && !r.ok)
  const dups = rows.filter((r) => r.dup)

  // Build final map (only validated unique URLs)
  const finalMap = {}
  for (const r of okRows.sort((a, b) => a.id.localeCompare(b.id))) {
    finalMap[r.id] = r.url
  }

  const mapJs = `/** Unique official product photographs (remote CDN). */
export const PRODUCT_IMAGE_MAP = {
${Object.entries(finalMap)
  .map(([k, v]) => `  "${k}": "${v}",`)
  .join('\n')}
}

export function productImageSrc(id, fallback) {
  return PRODUCT_IMAGE_MAP[id] || fallback || ''
}
`
  fs.writeFileSync(MAP_PATH, mapJs)

  const heroIds = ['lrp-effaclar', 'cerave-foam', 'boj-spf', 'cosrx-snail', 'vichy-mineral89', 'el-adv-night']
  const heroLines = heroIds.map((id) => {
    const r = rows.find((x) => x.id === id)
    return `  ${id}: ${r?.ok ? 'OK' : 'FAIL'} ${r?.url || 'MISSING'} (${r?.source})`
  })

  const report = [
    'Product Image Verification Report',
    `Generated: ${new Date().toISOString()}`,
    `Coverage: ${okRows.length}/${products.length}`,
    `Unique URLs: ${new Set(okRows.map((r) => r.url)).size}`,
    `Duplicates: ${dups.length ? dups.map((d) => `${d.id} shares ${d.dup}`).join(', ') : 'none'}`,
    `Missing: ${missing.map((m) => m.id).join(', ') || 'none'}`,
    `Failed validation: ${failed.map((f) => f.id).join(', ') || 'none'}`,
    '',
    'HERO PRODUCTS:',
    ...heroLines,
    '',
    'id\tbrand\turl\tsource\tsize_bytes\tstatus',
    ...rows.map(
      (r) =>
        `${r.id}\t${r.brand}\t${r.url === 'MISSING' ? 'MISSING' : r.url}\t${r.source}\t${r.size || '-'}\t${r.ok ? 'OK' : r.dup ? 'DUPLICATE' : r.url === 'MISSING' ? 'MISSING' : 'FAIL'}`,
    ),
  ].join('\n')
  fs.writeFileSync(REPORT_PATH, report)

  console.log('\n=== SUMMARY ===')
  console.log(`Coverage: ${okRows.length}/${products.length}`)
  console.log(`Missing: ${missing.map((m) => m.id).join(', ') || 'none'}`)
  console.log(`Failed: ${failed.map((f) => f.id).join(', ') || 'none'}`)
  console.log(`Duplicates: ${dups.length}`)
  console.log('\nHERO:')
  console.log(heroLines.join('\n'))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
