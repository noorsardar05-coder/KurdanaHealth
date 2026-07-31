/**
 * Build verified remote-only PRODUCT_IMAGE_MAP for Beauty Encyclopedia.
 * Validates: HTTP 200, image bytes > 3KB, unique URLs, brand-safe sources.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const productsPath = path.join(root, 'src/features/beauty/data/beautyProducts.js')
const mapPath = path.join(root, 'src/features/beauty/data/productImageMap.js')
const reportPath = path.join(root, 'scripts', 'product-image-verification-report.txt')

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

const src = fs.readFileSync(productsPath, 'utf8')
const PRODUCTS = [...src.matchAll(/\{\s*id:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)].map(
  (m) => ({ id: m[1], brand: m[2], name: m[3] }),
)

/** id -> [domain, handle] for Shopify product.json */
const SHOPIFY = {
  'cosrx-snail': ['cosrx.com', 'advanced-snail-96-mucin-power-essence'],
  'cosrx-aha': ['cosrx.com', 'aha-bha-clarifying-treatment-toner'],
  'cosrx-bha': ['cosrx.com', 'bha-blackhead-power-liquid'],
  'boj-spf': ['beautyofjoseon.com', 'relief-sun-rice-probiotics-spf50'],
  'boj-glow': ['beautyofjoseon.com', 'glow-serum-propolis-niacinamide'],
  'boj-dynasty': ['beautyofjoseon.com', 'dynasty-cream'],
  'boj-retin': ['beautyofjoseon.com', 'revive-serum-ginseng-retinal-2'],
  'olaplex-3': ['olaplex.com', 'no-3-hair-perfector'],
  'olaplex-4': ['olaplex.com', 'no-4-bond-maintenance-shampoo'],
  'olaplex-7': ['olaplex.com', 'no-7-bonding-oil'],
  'laneige-lip': ['us.laneige.com', 'lip-sleeping-mask'],
  'laneige-cream': ['us.laneige.com', 'water-bank-blue-hyaluronic-cream-moisturizer'],
  'laneige-cream-skin': ['us.laneige.com', 'cream-skin-refiner'],
  'laneige-glowy': ['us.laneige.com', 'glowy-makeup-serum'],
  'anua-heartleaf': ['anua.us', 'heartleaf-77-soothing-toner'],
  'anua-cleanser': ['anua.us', 'heartleaf-quercetinol-pore-deep-cleansing-foam'],
  'torriden-dive': ['torriden.us', 'dive-in-low-molecular-hyaluronic-acid-serum'],
  'torriden-cleanser': ['torriden.us', 'dive-in-low-molecular-hyaluronic-acid-cleansing-foam'],
  'roundlab-dokdo': ['roundlab.com', '1025-dokdo-cleanser'],
  'roundlab-birch': ['roundlab.com', 'birch-juice-moisturizing-sun-cream-spf50-pa'],
  'roundlab-toner': ['roundlab.com', '1025-dokdo-toner'],
  'skin1004-ampoule': ['skin1004.com', 'madagascar-centella-ampoule'],
  'skin1004-spf': ['skin1004.com', 'hyalu-cica-water-fit-sun-serum-spf50-pa'],
  'skin1004-cleanser': ['skin1004.com', 'madagascar-centella-ampoule-foam'],
  'purito-centella': ['purito.com', 'centella-unscented-serum'],
  'purito-spf': ['purito.com', 'daily-go-to-sunscreen-spf50-pa'],
  'isntree-ha': ['isntree.com', 'hyaluronic-acid-watery-sun-gel-spf50-pa'],
  'isntree-onion': ['isntree.com', 'onion-newpair-essence-toner'],
  'medicube-zero': ['medicube.us', 'zero-pore-blackhead-mud-mask'],
  'medicube-age': ['medicube.us', 'age-r-booster-pro'],
}

/** id -> Sephora SKU (verified or high-confidence) */
const SEPHORA_SKU = {
  'rare-softpinch': 's2911741',
  'rare-mascara': 's2474138',
  'rare-primer': 's2448082',
  'el-adv-night': 's2379683',
  'el-revital': 's2532232',
  'el-beautiful': 's513168',
  'torriden-dive': 's3039609',
  'torriden-cleanser': 's3039559',
  'cosrx-snail': 's2421387',
  'boj-spf': 's2893485',
  'boj-glow': 's2896298',
  'boj-retin': 's2896223',
  'boj-dynasty': 's2896215',
  'cerave-foam': 's2025633',
  'lrp-effaclar': 's1894303',
  'lrp-hyalu': 's2379691',
  'vichy-mineral89': 's2210623',
  'clinique-ddmj': 's1538354',
  'clinique-take': 's2039477',
  'clinique-moisture': 's2421683',
  'clinique-almost': 's70680',
  'ct-pillow': 's2801371',
  'ct-hollywood': 's2605988',
  'ct-hollywoodwand': 's2201424',
  'nars-orgasm': 's2927366',
  'nars-radiant': 's2172310',
  'nars-laguna': 's2670552',
  'fenty-profilt': 's2590081',
  'fenty-gloss': 's3007762',
  'fenty-match': 's2589927',
  'mac-ruby': 's2799120',
  'mac-fix': 's2779098',
  'mac-fix-fix': 's2799096',
  'huda-easybake': 's2114072',
  'huda-obsessions': 's2288090',
  'dior-capture': 's2835759',
  'dior-forever': 's2933869',
  'dior-addict': 's2830479',
  'dior-miss': 's2467355',
  'shiseido-benefiance': 's2234144',
  'kerastase-genesis': 's2325108',
  'kerastase-elixir': 's2798791',
  'kerastase-mask': 's2673507',
  'k18-leavein': 's2547248',
  'k18-shampoo': 's2592863',
  'olaplex-3': 's2944429',
  'olaplex-4': 's2118867',
  'olaplex-7': 's2266765',
  'moroccanoil-treat': 's1869494',
  'moroccanoil-hydrate': 's2030336',
  'laneige-lip': 's2961324',
  'laneige-cream': 's2735843',
  'laneige-cream-skin': 's2671873',
  'laneige-glowy': 's2931764',
  'tool-jade': 's2759934',
  'tool-gua': 's2759967',
  'tool-sponge': 's2894251',
  'tool-brush': 's2518942',
  'tool-derma': 's2683209',
  'tool-eyelash': 's2726248',
  'tool-ice': 's2927945',
}

/** Open Beauty Facts / official CDN — brand-verified product photos */
const OBF_CURATED = {
  'lrp-effaclar': 'https://images.openbeautyfacts.org/images/products/333/787/241/3995/front_en.4.400.jpg',
  'lrp-cicaplast': 'https://images.openbeautyfacts.org/images/products/333/787/241/2998/front_en.21.400.jpg',
  'lrp-anthelios': 'https://images.openbeautyfacts.org/images/products/333/787/558/7998/front_en.3.400.jpg',
  'lrp-hyalu': 'https://images.openbeautyfacts.org/images/products/333/787/566/0262/front_en.6.400.jpg',
  'lrp-toleriane': 'https://images.openbeautyfacts.org/images/products/333/787/554/6094/front_en.4.400.jpg',
  'lrp-retinol': 'https://images.openbeautyfacts.org/images/products/333/787/241/4190/front_en.5.400.jpg',
  'cerave-foam': 'https://images.openbeautyfacts.org/images/products/360/600/053/7194/front_en.4.400.jpg',
  'cerave-cream': 'https://images.openbeautyfacts.org/images/products/360/600/040/2157/front_en.11.400.jpg',
  'cerave-pm': 'https://images.openbeautyfacts.org/images/products/301/462/352/0026/front_en.4.400.jpg',
  'cerave-sa': 'https://images.openbeautyfacts.org/images/products/360/600/057/2682/front_en.3.400.jpg',
  'cerave-eye': 'https://images.openbeautyfacts.org/images/products/360/600/040/2973/front_en.4.400.jpg',
  'vichy-mineral89': 'https://images.openbeautyfacts.org/images/products/333/787/132/2757/front_en.11.400.jpg',
  'vichy-liftactiv': 'https://images.openbeautyfacts.org/images/products/333/787/132/5505/front_en.4.400.jpg',
  'vichy-normaderm': 'https://images.openbeautyfacts.org/images/products/333/787/554/0788/front_en.4.400.jpg',
  'vichy-spf': 'https://images.openbeautyfacts.org/images/products/333/787/554/7923/front_en.3.400.jpg',
  'avene-tol': 'https://images.openbeautyfacts.org/images/products/328/277/014/1351/front_en.4.400.jpg',
  'avene-cleanance': 'https://images.openbeautyfacts.org/images/products/328/277/010/1483/front_en.7.400.jpg',
  'avene-eau': 'https://images.openbeautyfacts.org/images/products/328/277/900/7441/front_en.9.400.jpg',
  'avene-spf': 'https://images.openbeautyfacts.org/images/products/328/277/014/8176/front_en.4.400.jpg',
  'bioderma-sensibio': 'https://images.openbeautyfacts.org/images/products/340/139/537/5845/front_en.16.400.jpg',
  'bioderma-sebium': 'https://images.openbeautyfacts.org/images/products/340/139/537/3682/front_en.8.400.jpg',
  'bioderma-atoderm': 'https://images.openbeautyfacts.org/images/products/340/139/881/9860/front_en.7.400.jpg',
  'bioderma-spf': 'https://images.openbeautyfacts.org/images/products/340/139/974/6017/front_en.4.400.jpg',
  'cosrx-aha': 'https://images.openbeautyfacts.org/images/products/880/941/647/0016/front_en.6.400.jpg',
  'cosrx-bha': 'https://images.openbeautyfacts.org/images/products/880/941/647/0085/front_en.8.400.jpg',
  'roundlab-dokdo': 'https://images.openbeautyfacts.org/images/products/880/964/739/0047/front_en.3.400.jpg',
  'roundlab-birch': 'https://images.openbeautyfacts.org/images/products/880/964/739/0412/front_en.3.400.jpg',
  'roundlab-toner': 'https://images.openbeautyfacts.org/images/products/880/964/739/0016/front_en.3.400.jpg',
  'anua-heartleaf': 'https://images.openbeautyfacts.org/images/products/880/953/006/4278/front_en.4.400.jpg',
  'anua-cleanser': 'https://images.openbeautyfacts.org/images/products/880/953/006/5039/front_en.3.400.jpg',
  'skin1004-ampoule': 'https://images.openbeautyfacts.org/images/products/880/957/470/0025/front_en.5.400.jpg',
  'skin1004-spf': 'https://images.openbeautyfacts.org/images/products/880/957/470/1145/front_en.3.400.jpg',
  'skin1004-cleanser': 'https://images.openbeautyfacts.org/images/products/880/957/470/0063/front_en.3.400.jpg',
  'purito-centella': 'https://images.openbeautyfacts.org/images/products/880/956/002/0321/front_en.6.400.jpg',
  'purito-spf': 'https://images.openbeautyfacts.org/images/products/880/956/002/1427/front_en.3.400.jpg',
  'isntree-ha': 'https://images.openbeautyfacts.org/images/products/880/953/423/0132/front_en.4.400.jpg',
  'isntree-onion': 'https://images.openbeautyfacts.org/images/products/880/953/423/0613/front_en.3.400.jpg',
  'medicube-zero': 'https://images.openbeautyfacts.org/images/products/880/973/603/0122/front_en.3.400.jpg',
  'medicube-age': 'https://images.openbeautyfacts.org/images/products/880/973/603/1082/front_en.2.400.jpg',
  'torriden-dive': 'https://images.openbeautyfacts.org/images/products/880/976/202/0115/front_en.3.400.jpg',
  'torriden-cleanser': 'https://images.openbeautyfacts.org/images/products/880/976/202/0030/front_en.3.400.jpg',
  'redken-abc': 'https://images.openbeautyfacts.org/images/products/361/262/338/3452/front_fr.3.400.jpg',
  'redken-shampoo': 'https://images.openbeautyfacts.org/images/products/361/262/338/3452/front_fr.3.400.jpg',
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function sephoraUrl(sku) {
  const id = sku.startsWith('s') ? sku : `s${sku}`
  return `https://www.sephora.com/productimages/sku/${id}-main-zoom.jpg?imwidth=600`
}

function brandToken(brand) {
  return brand
    .toLowerCase()
    .replace(/[éèê]/g, 'e')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)[0]
}

function nameTokens(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s+]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !['the', 'and', 'for', 'with'].includes(t))
}

async function fetchTimeout(url, ms = 14000, init = {}) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), ms)
  try {
    return await fetch(url, { signal: ctrl.signal, ...init })
  } finally {
    clearTimeout(t)
  }
}

async function validateImage(url) {
  try {
    const res = await fetchTimeout(url, 15000, {
      headers: {
        'User-Agent': UA,
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        Referer: url.includes('sephora.com')
          ? 'https://www.sephora.com/'
          : url.includes('openbeautyfacts')
            ? 'https://world.openbeautyfacts.org/'
            : 'https://www.google.com/',
      },
    })
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` }
    const ct = (res.headers.get('content-type') || '').toLowerCase()
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 3072) return { ok: false, reason: `small ${buf.length}` }
    const head = buf.subarray(0, 32).toString('utf8').toLowerCase()
    if (head.includes('<html') || head.includes('<!doctype')) return { ok: false, reason: 'html' }
    if (ct.includes('text/html')) return { ok: false, reason: 'content-type html' }
    return { ok: true, size: buf.length }
  } catch (e) {
    return { ok: false, reason: e.message }
  }
}

async function shopifyImage(domain, handle) {
  const domains = [domain]
  if (!domain.startsWith('www.')) domains.push(`www.${domain}`)
  for (const d of domains) {
    const url = `https://${d}/products/${handle}.json`
    try {
      const res = await fetchTimeout(url, 12000, {
        headers: { 'User-Agent': UA, Accept: 'application/json' },
      })
      if (!res.ok) continue
      const data = await res.json()
      const img = data.product?.featured_image || data.product?.images?.[0]?.src
      if (img) return img.split('?')[0]
    } catch {
      /* try next */
    }
  }
  return null
}

async function searchObf(brand, name) {
  const brandNeedle = brandToken(brand)
  const queries = [
    `${brand} ${name.split(/[:(+]/)[0].trim()}`,
    `${brand} ${name.split(' ').slice(0, 5).join(' ')}`,
    name.split(/[:(+]/)[0].trim(),
  ]
  for (const q of queries) {
    const url =
      'https://world.openbeautyfacts.org/cgi/search.pl?' +
      new URLSearchParams({
        search_terms: q.slice(0, 80),
        search_simple: '1',
        action: 'process',
        json: '1',
        page_size: '8',
      })
    try {
      const res = await fetchTimeout(url, 12000, {
        headers: { 'User-Agent': UA, Accept: 'application/json' },
      })
      if (!res.ok) continue
      const data = await res.json()
      for (const p of data.products || []) {
        const brands = String(p.brands || p.brands_tags?.join(' ') || '').toLowerCase()
        if (!brands.includes(brandNeedle) && !brands.includes(brand.toLowerCase().split('-')[0])) continue
        const pname = String(p.product_name || p.product_name_en || '').toLowerCase()
        const tokens = nameTokens(name)
        const hits = tokens.filter((t) => pname.includes(t)).length
        if (hits < Math.min(2, tokens.length)) continue
        const img = p.image_front_url || p.image_url
        if (img) return img.replace(/\.100\.jpg/i, '.400.jpg').replace(/\.200\.jpg/i, '.400.jpg')
      }
    } catch {
      /* next query */
    }
    await sleep(150)
  }
  return null
}

async function searchSephora(brand, name) {
  const q = `${brand} ${name.split(/[:(]/)[0].trim()}`.slice(0, 60)
  const url =
    'https://www.sephora.com/api/catalog/search?' +
    new URLSearchParams({ type: 'keyword', q, pageSize: '10', currentPage: '1' })
  try {
    const res = await fetchTimeout(url, 12000, {
      headers: {
        'User-Agent': UA,
        Accept: 'application/json',
        Referer: 'https://www.sephora.com/',
      },
    })
    if (!res.ok) return null
    const data = await res.json()
    const brandNeedle = brandToken(brand)
    const tokens = nameTokens(name)
    for (const p of data.products || []) {
      const bn = String(p.brandName || '').toLowerCase()
      const dn = String(p.displayName || p.productName || '').toLowerCase()
      if (!bn.includes(brandNeedle)) continue
      const hits = tokens.filter((t) => dn.includes(t)).length
      if (hits < Math.min(2, tokens.length)) continue
      const sku = p.currentSku?.skuId || p.skuId || p.defaultSku?.skuId
      if (sku) return sephoraUrl(`s${sku}`)
      const img = p.heroImage || p.image450 || p.image135
      if (img) return img
    }
  } catch {
    return null
  }
  return null
}

async function resolveProduct(product, usedUrls) {
  const candidates = []

  // 1. Shopify official
  if (SHOPIFY[product.id]) {
    const [domain, handle] = SHOPIFY[product.id]
    const img = await shopifyImage(domain, handle)
    if (img) candidates.push({ url: img, source: `shopify:${domain}/${handle}` })
  }

  // 2. Sephora SKU
  if (SEPHORA_SKU[product.id]) {
    candidates.push({ url: sephoraUrl(SEPHORA_SKU[product.id]), source: `sephora:${SEPHORA_SKU[product.id]}` })
  }

  // 3. OBF curated
  if (OBF_CURATED[product.id]) {
    candidates.push({ url: OBF_CURATED[product.id], source: 'obf-curated' })
  }

  // 4. OBF search
  const obf = await searchObf(product.brand, product.name)
  if (obf) candidates.push({ url: obf, source: 'obf-search' })

  // 5. Sephora search
  const sep = await searchSephora(product.brand, product.name)
  if (sep) candidates.push({ url: sep, source: 'sephora-search' })

  for (const c of candidates) {
    const norm = c.url.split('?')[0]
    if (usedUrls.has(norm)) continue
    const v = await validateImage(c.url)
    if (v.ok) return { ...c, size: v.size }
  }
  return null
}

async function main() {
  console.log(`Building map for ${PRODUCTS.length} products…\n`)
  const map = {}
  const report = []
  const usedUrls = new Set()
  const missing = []

  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i]
    process.stdout.write(`[${i + 1}/${PRODUCTS.length}] ${p.id}… `)
    const result = await resolveProduct(p, usedUrls)
    if (result) {
      const norm = result.url.split('?')[0]
      map[p.id] = result.url.includes('sephora.com') ? result.url : norm
      usedUrls.add(norm)
      report.push(`${p.id}\t${p.brand}\t${map[p.id]}\t${result.source}\t${result.size}`)
      console.log(`OK (${result.source})`)
    } else {
      missing.push(p.id)
      report.push(`${p.id}\t${p.brand}\tMISSING\t-\t-`)
      console.log('MISSING')
    }
    await sleep(80)
  }

  // Fix duplicate redken URLs — redken-shampoo needs unique URL
  if (map['redken-shampoo'] === map['redken-abc']) {
    delete map['redken-shampoo']
    const alt = await searchObf('Redken', 'All Soft Shampoo')
    if (alt) {
      const v = await validateImage(alt)
      if (v.ok && !usedUrls.has(alt.split('?')[0])) {
        map['redken-shampoo'] = alt
        usedUrls.add(alt.split('?')[0])
        report.push(`redken-shampoo\tRedken\t${alt}\tobf-search-fix\t${v.size}`)
      }
    }
  }

  // Sort map keys alphabetically
  const sorted = Object.fromEntries(Object.keys(map).sort().map((k) => [k, map[k]]))

  const mapJs = `/** Unique official product photographs (remote CDN). */
export const PRODUCT_IMAGE_MAP = ${JSON.stringify(sorted, null, 2)}

export function productImageSrc(id, fallback) {
  return PRODUCT_IMAGE_MAP[id] || fallback || ''
}
`
  fs.writeFileSync(mapPath, mapJs)

  const dupes = Object.entries(sorted).reduce((acc, [id, url]) => {
    const u = url.split('?')[0]
    if (!acc[u]) acc[u] = []
    acc[u].push(id)
    return acc
  }, {})
  const dupeIds = Object.values(dupes).filter((a) => a.length > 1)

  const summary = [
    `Product Image Verification Report`,
    `Generated: ${new Date().toISOString()}`,
    `Coverage: ${Object.keys(sorted).length}/${PRODUCTS.length}`,
    `Unique URLs: ${usedUrls.size}`,
    `Duplicates: ${dupeIds.length ? dupeIds.map((d) => d.join(', ')).join(' | ') : 'none'}`,
    `Missing: ${missing.join(', ') || 'none'}`,
    '',
    'id\tbrand\turl\tsource\tsize_bytes',
    ...report,
  ]
  fs.writeFileSync(reportPath, summary.join('\n'))

  console.log(`\nCoverage: ${Object.keys(sorted).length}/${PRODUCTS.length}`)
  console.log(`Missing: ${missing.length ? missing.join(', ') : 'none'}`)
  console.log(`Report: ${reportPath}`)
}

await main()
