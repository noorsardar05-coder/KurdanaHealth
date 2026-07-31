/**
 * Gap-fill remaining beauty product photos via broader OBF queries + Commons.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PRODUCT_IMAGE_MAP } from '../src/features/beauty/data/productImageMap.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'beauty', 'products')
const mapPath = path.join(root, 'src', 'features', 'beauty', 'data', 'productImageMap.js')

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36'

const src = fs.readFileSync(path.join(root, 'src/features/beauty/data/beautyProducts.js'), 'utf8')
const PRODUCTS = [...src.matchAll(/\{\s*id:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)].map(
  (m) => ({ id: m[1], brand: m[2], name: m[3] }),
)

/** Extra query aliases when catalog names don't hit OBF */
const ALIASES = {
  'lrp-effaclar': ['Effaclar gel moussant', 'La Roche Posay Effaclar gel', 'Effaclar purifying'],
  'lrp-anthelios': ['Anthelios UVMune', 'La Roche Posay Anthelios invisible fluid'],
  'vichy-mineral89': ['Vichy Mineral 89', 'Minéral 89', 'Mineral 89 hyaluronic'],
  'vichy-liftactiv': ['Vichy Liftactiv vitamin C', 'Liftactiv supreme C'],
  'avene-tol': ['Avene Tolerance Control', 'Avène Tolerance'],
  'bioderma-sebium': ['Bioderma Sebium Global', 'Sébium Global'],
  'boj-glow': ['Beauty of Joseon Glow Serum', 'Joseon glow serum propolis'],
  'boj-retin': ['Beauty of Joseon Revive Serum', 'Joseon ginseng retinal'],
  'cosrx-snail': ['COSRX Advanced Snail 96', 'Snail Mucin Power Essence', 'COSRX snail essence'],
  'cosrx-aha': ['COSRX AHA BHA toner', 'COSRX clarifying treatment toner'],
  'cosrx-bha': ['COSRX BHA Blackhead Power Liquid'],
  'roundlab-dokdo': ['Round Lab Dokdo cleanser', '1025 Dokdo cleanser'],
  'roundlab-birch': ['Round Lab Birch Juice sunscreen'],
  'roundlab-toner': ['Round Lab Dokdo toner'],
  'anua-heartleaf': ['Anua Heartleaf 77', 'Heartleaf soothing toner'],
  'anua-cleanser': ['Anua Heartleaf cleansing foam'],
  'skin1004-ampoule': ['SKIN1004 Centella Ampoule', 'Madagascar Centella ampoule'],
  'skin1004-spf': ['SKIN1004 Hyalu-Cica sun serum', 'Hyalu Cica Water Fit'],
  'skin1004-cleanser': ['SKIN1004 Centella Ampoule Foam'],
  'laneige-lip': ['Laneige Lip Sleeping Mask berry'],
  'laneige-cream': ['Laneige Water Bank cream'],
  'torriden-dive': ['Torriden Dive In serum', 'Torriden hyaluronic serum'],
  'purito-centella': ['Purito Centella Unscented Serum'],
  'isntree-ha': ['Isntree Hyaluronic Acid Watery Sun Gel'],
  'rare-softpinch': ['Rare Soft Pinch Liquid Blush'],
  'ct-pillow': ['Charlotte Tilbury Pillow Talk lipstick'],
  'ct-hairbrush': ['Charlotte Tilbury Airbrush Flawless Finish'],
  'nars-orgasm': ['NARS Orgasm blush'],
  'nars-radiant': ['NARS Radiant Creamy Concealer'],
  'fenty-profilt': ['Fenty Pro Filt r foundation', 'Fenty Soft Matte foundation'],
  'fenty-gloss': ['Fenty Gloss Bomb'],
  'mac-ruby': ['MAC Ruby Woo'],
  'mac-fix': ['MAC Studio Fix Fluid'],
  'dior-forever': ['Dior Forever foundation'],
  'dior-addict': ['Dior Addict Lip Glow Oil'],
  'dior-miss': ['Miss Dior Eau de Parfum'],
  'dior-capture': ['Dior Capture Totale serum'],
  'el-adv-night': ['Estée Lauder Advanced Night Repair', 'Estee Lauder ANR'],
  'olaplex-3': ['Olaplex No.3 Hair Perfector', 'Olaplex 3'],
  'olaplex-7': ['Olaplex No.7 Bonding Oil'],
  'olaplex-4': ['Olaplex No.4 Bond Maintenance Shampoo'],
  'moroccanoil-treat': ['Moroccanoil Treatment oil'],
  'kerastase-genesis': ['Kerastase Genesis Bain'],
  'kerastase-elixir': ['Kerastase Elixir Ultime'],
  'huda-easybake': ['Huda Beauty Easy Bake powder'],
  'clinique-ddmj': ['Clinique Dramatically Different Moisturizing Lotion'],
  'clinique-take': ['Clinique Take The Day Off balm'],
  'shiseido-ess': ['Shiseido Ultimune'],
  'tool-jade': ['jade roller facial'],
  'tool-gua': ['gua sha rose quartz'],
  'tool-sponge': ['beauty blender sponge'],
}

async function fetchTimeout(url, ms = 12000, init = {}) {
  const c = new AbortController()
  const t = setTimeout(() => c.abort(), ms)
  try {
    return await fetch(url, { signal: c.signal, ...init })
  } finally {
    clearTimeout(t)
  }
}

async function searchObf(queries) {
  for (const q of queries) {
    const url =
      'https://world.openbeautyfacts.org/cgi/search.pl?' +
      new URLSearchParams({
        search_terms: q,
        search_simple: '1',
        action: 'process',
        json: '1',
        page_size: '12',
      })
    try {
      const res = await fetchTimeout(url, 12000, {
        headers: { 'User-Agent': UA, Accept: 'application/json' },
      })
      if (!res.ok) continue
      const data = await res.json()
      for (const p of data.products || []) {
        const img = p.image_front_url || p.image_url
        if (img) return img.replace(/\.100\.jpg/i, '.400.jpg')
      }
    } catch {
      /* continue */
    }
    await new Promise((r) => setTimeout(r, 180))
  }
  return null
}

async function searchCommons(query) {
  try {
    const api =
      'https://commons.wikimedia.org/w/api.php?' +
      new URLSearchParams({
        action: 'query',
        format: 'json',
        generator: 'search',
        gsrsearch: query,
        gsrlimit: '8',
        prop: 'imageinfo',
        iiprop: 'url',
        iiurlwidth: '800',
        origin: '*',
      })
    const res = await fetchTimeout(api, 12000, { headers: { 'User-Agent': UA } })
    if (!res.ok) return null
    const data = await res.json()
    const pages = Object.values(data.query?.pages || {})
    for (const page of pages) {
      const info = page.imageinfo?.[0]
      const url = info?.thumburl || info?.url
      if (url && /\.(jpe?g|png|webp)/i.test(url)) return url
    }
  } catch {
    return null
  }
  return null
}

async function download(url, dest) {
  const res = await fetchTimeout(url, 15000, {
    headers: { 'User-Agent': UA, Accept: 'image/*,*/*', Referer: 'https://world.openbeautyfacts.org/' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1200) throw new Error(`small ${buf.length}`)
  const head = buf.subarray(0, 20).toString('utf8').toLowerCase()
  if (head.includes('<html') || head.includes('<!doct')) throw new Error('html')
  fs.writeFileSync(dest, buf)
  return buf.length
}

const map = { ...PRODUCT_IMAGE_MAP }

async function main() {
  let gained = 0
  for (const p of PRODUCTS) {
    const dest = path.join(outDir, `${p.id}.jpg`)
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1200) {
      map[p.id] = `/beauty/products/${p.id}.jpg`
      continue
    }

    const queries = [
      ...(ALIASES[p.id] || []),
      `${p.brand} ${p.name.split(/[:(]/)[0].trim()}`,
      `${p.brand} ${p.name.split(' ').slice(0, 4).join(' ')}`,
      p.name.split(' ').slice(0, 5).join(' '),
    ]

    process.stdout.write(`${p.id}… `)
    let url = await searchObf(queries)
    if (!url && /tool-|jade|gua|sponge|brush|ice|eyelash/i.test(p.id + p.name)) {
      url = await searchCommons(`${p.name} beauty product`)
    }
    if (!url) {
      console.log('skip')
      continue
    }
    try {
      const size = await download(url, dest)
      map[p.id] = `/beauty/products/${p.id}.jpg`
      gained++
      console.log(`OK ${size}`)
    } catch (e) {
      console.log(`fail ${e.message}`)
    }
    await new Promise((r) => setTimeout(r, 160))
  }

  fs.writeFileSync(
    mapPath,
    `/** Auto-generated unique product photos */
export const PRODUCT_IMAGE_MAP = ${JSON.stringify(map, null, 2)}

export function productImageSrc(id, fallback) {
  return PRODUCT_IMAGE_MAP[id] || fallback || ''
}
`,
  )
  console.log(`Gained ${gained}. Map size ${Object.keys(map).length}/${PRODUCTS.length}`)
}

await main()
