/**
 * Repair pass: OBF search for every product missing a valid local photo.
 * Never keeps 404 remote URLs.
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

const src = fs.readFileSync(path.join(root, 'src/features/beauty/data/beautyProducts.js'), 'utf8')
const PRODUCTS = [...src.matchAll(/\{\s*id:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)].map(
  (m) => ({ id: m[1], brand: m[2], name: m[3] }),
)

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetchTimeout(url, ms = 14000, extra = {}) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), ms)
  try {
    return await fetch(url, { signal: ctrl.signal, ...extra })
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
        page_size: '10',
      })
    try {
      const res = await fetchTimeout(url, 12000, {
        headers: { 'User-Agent': UA, Accept: 'application/json' },
      })
      if (!res.ok) continue
      const data = await res.json()
      for (const p of data.products || []) {
        const img = p.image_front_url || p.image_url || p.image_front_small_url
        if (img) {
          return img
            .replace(/\.100\.jpg/i, '.400.jpg')
            .replace(/\.200\.jpg/i, '.400.jpg')
        }
      }
    } catch {
      /* next query */
    }
    await sleep(200)
  }
  return null
}

async function download(url, dest) {
  const res = await fetchTimeout(url, 15000, {
    headers: {
      'User-Agent': UA,
      Accept: 'image/*,*/*;q=0.8',
      Referer: 'https://world.openbeautyfacts.org/',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1200) throw new Error(`small ${buf.length}`)
  const head = buf.subarray(0, 20).toString('utf8').toLowerCase()
  if (head.includes('<html') || head.includes('<!doct')) throw new Error('html')
  fs.writeFileSync(dest, buf)
  return buf.length
}

const localMap = {}
const report = []

function saveMap() {
  fs.writeFileSync(
    mapPath,
    `/** Auto-generated unique product photos */
export const PRODUCT_IMAGE_MAP = ${JSON.stringify(localMap, null, 2)}

export function productImageSrc(id, fallback) {
  return PRODUCT_IMAGE_MAP[id] || fallback || \`/beauty/products/\${id}.jpg\`
}
`,
  )
  fs.writeFileSync(path.join(outDir, '_fetch-report.txt'), report.join('\n'))
}

for (let i = 0; i < PRODUCTS.length; i++) {
  const p = PRODUCTS[i]
  const dest = path.join(outDir, `${p.id}.jpg`)
  process.stdout.write(`[${i + 1}/${PRODUCTS.length}] ${p.id} `)

  if (fs.existsSync(dest) && fs.statSync(dest).size > 1200) {
    localMap[p.id] = `/beauty/products/${p.id}.jpg`
    report.push(`${p.id}\tKEEP`)
    console.log('KEEP')
    saveMap()
    continue
  }

  const shortName = p.name.split(/[:(+]/)[0].trim()
  const queries = [
    `${p.brand} ${shortName}`,
    `${p.brand} ${p.name.split(' ').slice(0, 5).join(' ')}`,
    shortName,
    p.name,
  ]

  const url = await searchObf(queries)
  if (!url) {
    report.push(`${p.id}\tNO_URL`)
    console.log('NO_URL')
    saveMap()
    continue
  }

  try {
    const size = await download(url, dest)
    localMap[p.id] = `/beauty/products/${p.id}.jpg`
    report.push(`${p.id}\tOK\t${size}\t${url}`)
    console.log(`OK ${size}`)
  } catch (e) {
    // try tiny size variant
    try {
      const tiny = url.replace(/\.400\.jpg/i, '.200.jpg')
      const size = await download(tiny, dest)
      localMap[p.id] = `/beauty/products/${p.id}.jpg`
      report.push(`${p.id}\tOK\t${size}\t${tiny}`)
      console.log(`OK-tiny ${size}`)
    } catch (e2) {
      report.push(`${p.id}\tFAIL\t${e.message}\t${url}`)
      console.log(`FAIL ${e.message}`)
    }
  }
  saveMap()
  await sleep(150)
}

const covered = Object.keys(localMap).length
console.log(`\nCovered ${covered}/${PRODUCTS.length}`)
