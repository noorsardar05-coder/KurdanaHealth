/**
 * Fetch unique real product photos for Beauty Encyclopedia.
 * Prefer curated CDN URLs (fast), fall back to Open Beauty Facts search.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'beauty', 'products')
const mapPath = path.join(root, 'src', 'features', 'beauty', 'data', 'productImageMap.js')
const logPath = path.join(outDir, '_fetch-report.txt')

fs.mkdirSync(outDir, { recursive: true })

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

/** Proven / best-effort authentic product bottle URLs (unique per id) */
const CURATED = {
  'lrp-effaclar': 'https://images.openbeautyfacts.org/images/products/333/787/241/3995/front_en.4.400.jpg',
  'lrp-cicaplast': 'https://images.openbeautyfacts.org/images/products/333/787/241/2998/front_en.21.400.jpg',
  'lrp-anthelios': 'https://images.openbeautyfacts.org/images/products/333/787/558/7998/front_en.3.400.jpg',
  'lrp-hyalu': 'https://images.openbeautyfacts.org/images/products/333/787/566/0262/front_en.6.400.jpg',
  'cerave-foam': 'https://images.openbeautyfacts.org/images/products/360/600/053/7194/front_en.4.400.jpg',
  'cerave-cream': 'https://images.openbeautyfacts.org/images/products/360/600/040/2157/front_en.11.400.jpg',
  'cerave-pm': 'https://images.openbeautyfacts.org/images/products/301/462/352/0026/front_en.4.400.jpg',
  'vichy-mineral89': 'https://images.openbeautyfacts.org/images/products/333/787/132/2757/front_en.11.400.jpg',
  'vichy-liftactiv': 'https://images.openbeautyfacts.org/images/products/333/787/132/5505/front_en.4.400.jpg',
  'avene-tol': 'https://images.openbeautyfacts.org/images/products/328/277/014/1351/front_en.4.400.jpg',
  'avene-cleanance': 'https://images.openbeautyfacts.org/images/products/328/277/010/1483/front_en.7.400.jpg',
  'bioderma-sensibio': 'https://images.openbeautyfacts.org/images/products/340/139/537/5845/front_en.16.400.jpg',
  'bioderma-sebium': 'https://images.openbeautyfacts.org/images/products/340/139/537/3682/front_en.8.400.jpg',
  'boj-spf': 'https://images.openbeautyfacts.org/images/products/880/974/406/0111/front_en.3.400.jpg',
  'boj-glow': 'https://images.openbeautyfacts.org/images/products/880/951/406/0375/front_en.4.400.jpg',
  'boj-retin': 'https://images.openbeautyfacts.org/images/products/880/974/406/0470/front_en.3.400.jpg',
  'cosrx-snail': 'https://images.openbeautyfacts.org/images/products/880/941/647/0009/front_en.14.400.jpg',
  'cosrx-aha': 'https://images.openbeautyfacts.org/images/products/880/941/647/0016/front_en.6.400.jpg',
  'cosrx-bha': 'https://images.openbeautyfacts.org/images/products/880/941/647/0085/front_en.8.400.jpg',
  'roundlab-dokdo': 'https://images.openbeautyfacts.org/images/products/880/964/739/0047/front_en.3.400.jpg',
  'roundlab-birch': 'https://images.openbeautyfacts.org/images/products/880/964/739/0412/front_en.3.400.jpg',
  'anua-heartleaf': 'https://images.openbeautyfacts.org/images/products/880/953/006/4278/front_en.4.400.jpg',
  'anua-cleanser': 'https://images.openbeautyfacts.org/images/products/880/953/006/5039/front_en.3.400.jpg',
  'skin1004-ampoule': 'https://images.openbeautyfacts.org/images/products/880/957/470/0025/front_en.5.400.jpg',
  'skin1004-spf': 'https://images.openbeautyfacts.org/images/products/880/957/470/1145/front_en.3.400.jpg',
  'skin1004-cleanser': 'https://images.openbeautyfacts.org/images/products/880/957/470/0063/front_en.3.400.jpg',
  'laneige-lip': 'https://images.openbeautyfacts.org/images/products/880/964/282/0155/front_en.8.400.jpg',
  'laneige-cream': 'https://images.openbeautyfacts.org/images/products/880/968/174/0461/front_en.3.400.jpg',
  'laneige-cream-skin': 'https://www.sephora.com/productimages/sku/s2404847-main-zoom.jpg?imwidth=600',
  'laneige-glowy': 'https://www.sephora.com/productimages/sku/s2492734-main-zoom.jpg?imwidth=600',
  'medicube-zero': 'https://images.openbeautyfacts.org/images/products/880/973/603/0122/front_en.3.400.jpg',
  'medicube-age': 'https://images.openbeautyfacts.org/images/products/880/973/603/1082/front_en.2.400.jpg',
  'torriden-dive': 'https://images.openbeautyfacts.org/images/products/880/976/202/0115/front_en.3.400.jpg',
  'torriden-cleanser': 'https://images.openbeautyfacts.org/images/products/880/976/202/0030/front_en.3.400.jpg',
  'purito-centella': 'https://images.openbeautyfacts.org/images/products/880/956/002/0321/front_en.6.400.jpg',
  'purito-spf': 'https://images.openbeautyfacts.org/images/products/880/956/002/1427/front_en.3.400.jpg',
  'isntree-ha': 'https://images.openbeautyfacts.org/images/products/880/953/423/0132/front_en.4.400.jpg',
  'isntree-onion': 'https://images.openbeautyfacts.org/images/products/880/953/423/0613/front_en.3.400.jpg',
  'clinique-ddmj': 'https://www.sephora.com/productimages/sku/s535910-main-zoom.jpg?imwidth=600',
  'clinique-take': 'https://www.sephora.com/productimages/sku/s1220786-main-zoom.jpg?imwidth=600',
  'clinique-moisture': 'https://www.sephora.com/productimages/sku/s1778856-main-zoom.jpg?imwidth=600',
  'clinique-almost': 'https://www.sephora.com/productimages/sku/s1384376-main-zoom.jpg?imwidth=600',
  'el-adv-night': 'https://www.sephora.com/productimages/sku/s515879-main-zoom.jpg?imwidth=600',
  'el-revital': 'https://www.sephora.com/productimages/sku/s1885730-main-zoom.jpg?imwidth=600',
  'el-beautiful': 'https://www.sephora.com/productimages/sku/s513168-main-zoom.jpg?imwidth=600',
  'shiseido-ess': 'https://www.sephora.com/productimages/sku/s1932924-main-zoom.jpg?imwidth=600',
  'shiseido-benefiance': 'https://www.sephora.com/productimages/sku/s1932916-main-zoom.jpg?imwidth=600',
  'shiseido-ginza': 'https://www.sephora.com/productimages/sku/s2046633-main-zoom.jpg?imwidth=600',
  'dior-capture': 'https://www.sephora.com/productimages/sku/s2417062-main-zoom.jpg?imwidth=600',
  'dior-forever': 'https://www.sephora.com/productimages/sku/s2264586-main-zoom.jpg?imwidth=600',
  'dior-addict': 'https://www.sephora.com/productimages/sku/s2417070-main-zoom.jpg?imwidth=600',
  'dior-miss': 'https://www.sephora.com/productimages/sku/s2417088-main-zoom.jpg?imwidth=600',
  'rare-softpinch': 'https://www.sephora.com/productimages/sku/s2362160-main-zoom.jpg?imwidth=600',
  'rare-mascara': 'https://www.sephora.com/productimages/sku/s2495513-main-zoom.jpg?imwidth=600',
  'rare-primer': 'https://www.sephora.com/productimages/sku/s2495521-main-zoom.jpg?imwidth=600',
  'ct-pillow': 'https://www.sephora.com/productimages/sku/s1964711-main-zoom.jpg?imwidth=600',
  'ct-hairbrush': 'https://www.sephora.com/productimages/sku/s2035859-main-zoom.jpg?imwidth=600',
  'ct-hollywoodwand': 'https://www.sephora.com/productimages/sku/s1925969-main-zoom.jpg?imwidth=600',
  'nars-orgasm': 'https://www.sephora.com/productimages/sku/s1775423-main-zoom.jpg?imwidth=600',
  'nars-radiant': 'https://www.sephora.com/productimages/sku/s2172311-main-zoom.jpg?imwidth=600',
  'nars-laguna': 'https://www.sephora.com/productimages/sku/s1533857-main-zoom.jpg?imwidth=600',
  'fenty-profilt': 'https://www.sephora.com/productimages/sku/s2151687-main-zoom.jpg?imwidth=600',
  'fenty-gloss': 'https://www.sephora.com/productimages/sku/s1925910-main-zoom.jpg?imwidth=600',
  'fenty-match': 'https://www.sephora.com/productimages/sku/s2114069-main-zoom.jpg?imwidth=600',
  'mac-ruby': 'https://www.sephora.com/productimages/sku/s1389177-main-zoom.jpg?imwidth=600',
  'mac-fix': 'https://www.sephora.com/productimages/sku/s853419-main-zoom.jpg?imwidth=600',
  'mac-fix-fix': 'https://www.sephora.com/productimages/sku/s1373651-main-zoom.jpg?imwidth=600',
  'huda-easybake': 'https://www.sephora.com/productimages/sku/s2183391-main-zoom.jpg?imwidth=600',
  'huda-obsessions': 'https://www.sephora.com/productimages/sku/s2114085-main-zoom.jpg?imwidth=600',
  'kerastase-genesis': 'https://www.sephora.com/productimages/sku/s2319731-main-zoom.jpg?imwidth=600',
  'kerastase-elixir': 'https://www.sephora.com/productimages/sku/s2319749-main-zoom.jpg?imwidth=600',
  'kerastase-mask': 'https://www.sephora.com/productimages/sku/s2319756-main-zoom.jpg?imwidth=600',
  'k18-leavein': 'https://www.sephora.com/productimages/sku/s2495661-main-zoom.jpg?imwidth=600',
  'k18-shampoo': 'https://www.sephora.com/productimages/sku/s2561785-main-zoom.jpg?imwidth=600',
  'olaplex-3': 'https://www.sephora.com/productimages/sku/s2033854-main-zoom.jpg?imwidth=600',
  'olaplex-7': 'https://www.sephora.com/productimages/sku/s2203330-main-zoom.jpg?imwidth=600',
  'olaplex-4': 'https://www.sephora.com/productimages/sku/s2033862-main-zoom.jpg?imwidth=600',
  'moroccanoil-treat': 'https://www.sephora.com/productimages/sku/s2031452-main-zoom.jpg?imwidth=600',
  'moroccanoil-hydrate': 'https://www.sephora.com/productimages/sku/s2031460-main-zoom.jpg?imwidth=600',
  'redken-abc': 'https://www.sephora.com/productimages/sku/s2496156-main-zoom.jpg?imwidth=600',
  'redken-shampoo': 'https://www.sephora.com/productimages/sku/s1987753-main-zoom.jpg?imwidth=600',
  'lrp-toleriane': 'https://images.openbeautyfacts.org/images/products/333/787/554/6094/front_en.4.400.jpg',
  'lrp-retinol': 'https://images.openbeautyfacts.org/images/products/333/787/241/4190/front_en.5.400.jpg',
  'cerave-sa': 'https://images.openbeautyfacts.org/images/products/360/600/057/2682/front_en.3.400.jpg',
  'cerave-eye': 'https://images.openbeautyfacts.org/images/products/360/600/040/2973/front_en.4.400.jpg',
  'vichy-normaderm': 'https://images.openbeautyfacts.org/images/products/333/787/554/0788/front_en.4.400.jpg',
  'avene-eau': 'https://images.openbeautyfacts.org/images/products/328/277/900/7441/front_en.9.400.jpg',
  'avene-spf': 'https://images.openbeautyfacts.org/images/products/328/277/014/8176/front_en.4.400.jpg',
  'bioderma-atoderm': 'https://images.openbeautyfacts.org/images/products/340/139/881/9860/front_en.7.400.jpg',
  'bioderma-spf': 'https://images.openbeautyfacts.org/images/products/340/139/974/6017/front_en.4.400.jpg',
  'vichy-spf': 'https://images.openbeautyfacts.org/images/products/333/787/554/7923/front_en.3.400.jpg',
  'boj-dynasty': 'https://images.openbeautyfacts.org/images/products/880/951/406/0016/front_en.3.400.jpg',
  'roundlab-toner': 'https://images.openbeautyfacts.org/images/products/880/964/739/0016/front_en.3.400.jpg',
  'tool-jade': 'https://www.sephora.com/productimages/sku/s1899104-main-zoom.jpg?imwidth=600',
  'tool-gua': 'https://www.sephora.com/productimages/sku/s2210723-main-zoom.jpg?imwidth=600',
  'tool-sponge': 'https://www.sephora.com/productimages/sku/s1900080-main-zoom.jpg?imwidth=600',
  'tool-brush': 'https://www.sephora.com/productimages/sku/s1903530-main-zoom.jpg?imwidth=600',
  'tool-derma': 'https://www.sephora.com/productimages/sku/s2233843-main-zoom.jpg?imwidth=600',
  'tool-eyelash': 'https://www.sephora.com/productimages/sku/s2415162-main-zoom.jpg?imwidth=600',
  'tool-ice': 'https://www.sephora.com/productimages/sku/s2495992-main-zoom.jpg?imwidth=600',
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetchWithTimeout(url, ms = 12000) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), ms)
  try {
    return await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': UA,
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        Referer: url.includes('sephora.com')
          ? 'https://www.sephora.com/'
          : 'https://world.openbeautyfacts.org/',
      },
      redirect: 'follow',
    })
  } finally {
    clearTimeout(t)
  }
}

function upgrade(url) {
  return url.replace(/\.400\.jpg/i, '.800.jpg').replace(/\.200\.jpg/i, '.800.jpg')
}

async function searchObf(brand, name) {
  const q = `${brand} ${name}`.slice(0, 80)
  const url =
    'https://world.openbeautyfacts.org/cgi/search.pl?' +
    new URLSearchParams({
      search_terms: q,
      search_simple: '1',
      action: 'process',
      json: '1',
      page_size: '6',
    })
  const res = await fetchWithTimeout(url, 10000)
  if (!res.ok) return null
  const data = await res.json()
  const brandNeedle = brand.toLowerCase().split(/\s+/)[0]
  const list = [...(data.products || [])].sort((a, b) => {
    const ab = String(a.brands || '').toLowerCase().includes(brandNeedle) ? 1 : 0
    const bb = String(b.brands || '').toLowerCase().includes(brandNeedle) ? 1 : 0
    return bb - ab
  })
  for (const p of list) {
    const img = p.image_front_url || p.image_url
    if (img) return upgrade(img)
  }
  return null
}

async function download(url, dest) {
  const res = await fetchWithTimeout(url, 15000)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1500) throw new Error(`small ${buf.length}`)
  const head = buf.subarray(0, 32).toString('utf8').toLowerCase()
  if (head.includes('<html') || head.includes('<!doctype')) throw new Error('html')
  fs.writeFileSync(dest, buf)
  return buf.length
}

const src = fs.readFileSync(path.join(root, 'src/features/beauty/data/beautyProducts.js'), 'utf8')
const PRODUCTS = [...src.matchAll(/\{\s*id:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)].map(
  (m) => ({ id: m[1], brand: m[2], name: m[3] }),
)
if (PRODUCTS.length < 80) {
  console.error('Failed to parse products from beautyProducts.js', PRODUCTS.length)
  process.exit(1)
}
console.log(`Catalog: ${PRODUCTS.length} products`)

const localMap = {}
const report = []

function flush() {
  fs.writeFileSync(logPath, report.join('\n'))
  const mapJs = `/** Auto-generated unique product photos */
export const PRODUCT_IMAGE_MAP = ${JSON.stringify(localMap, null, 2)}

export function productImageSrc(id, fallback) {
  return PRODUCT_IMAGE_MAP[id] || fallback || \`/beauty/products/\${id}.jpg\`
}
`
  fs.writeFileSync(mapPath, mapJs)
}

for (let i = 0; i < PRODUCTS.length; i++) {
  const product = PRODUCTS[i]
  const dest = path.join(outDir, `${product.id}.jpg`)
  process.stdout.write(`[${i + 1}/${PRODUCTS.length}] ${product.id}… `)

  if (fs.existsSync(dest) && fs.statSync(dest).size > 1500) {
    localMap[product.id] = `/beauty/products/${product.id}.jpg`
    report.push(`${product.id}\tKEEP`)
    console.log('KEEP')
    flush()
    continue
  }

  let url = CURATED[product.id] || null
  if (!url) {
    try {
      url = await searchObf(product.brand, product.name)
    } catch (e) {
      url = null
      report.push(`${product.id}\tSEARCH_FAIL\t${e.message}`)
    }
  }

  if (!url) {
    report.push(`${product.id}\tNO_URL`)
    console.log('NO_URL')
    flush()
    continue
  }

  try {
    const size = await download(url, dest)
    localMap[product.id] = `/beauty/products/${product.id}.jpg`
    report.push(`${product.id}\tOK\t${size}\t${url}`)
    console.log(`OK ${size}`)
  } catch (e) {
    localMap[product.id] = url
    report.push(`${product.id}\tREMOTE\t${e.message}\t${url}`)
    console.log(`REMOTE ${e.message}`)
  }
  flush()
  await sleep(120)
}

console.log(`\nDone ${Object.keys(localMap).length}/${PRODUCTS.length}`)
