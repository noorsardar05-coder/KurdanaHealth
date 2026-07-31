import fs from 'node:fs'

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

const queries = [
  'Rare Beauty Soft Pinch Liquid Blush',
  'Round Lab 1025 Dokdo Cleanser',
  'Olaplex No.7 Bonding Oil',
]

async function tryFetch(label, url, headers = {}) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, Accept: 'application/json,text/html,*/*', ...headers },
      redirect: 'follow',
    })
    const ct = res.headers.get('content-type') || ''
    const text = await res.text()
    console.log('\n==', label, res.status, ct, 'len', text.length)
    if (ct.includes('json') || text.trim().startsWith('{') || text.trim().startsWith('[')) {
      try {
        const j = JSON.parse(text)
        const s = JSON.stringify(j)
        const imgs = [...s.matchAll(/https?:\\\/\\\/[^"\\]+?\.(?:jpg|jpeg|png|webp)/gi)].map((m) =>
          m[0].replace(/\\\//g, '/'),
        )
        const imgs2 = [...s.matchAll(/https?:\/\/[^"\\]+\.(?:jpg|jpeg|png|webp)/gi)].map((m) => m[0])
        console.log('json imgs', [...new Set([...imgs, ...imgs2])].slice(0, 8))
        console.log('keys sample', Object.keys(j).slice(0, 12))
      } catch {
        console.log('json parse fail', text.slice(0, 200))
      }
    } else {
      const th = [...text.matchAll(/https:\/\/static\.thcdn\.com\/productimg\/[^"'\s>]+\.jpe?g/gi)].map((m) => m[0])
      const seph = [...text.matchAll(/https:\/\/www\.sephora\.com\/productimages\/[^"'\s>]+\.jpg[^"'\s>]*/gi)].map(
        (m) => m[0],
      )
      const ys = [...text.matchAll(/https:\/\/[^"'\s>]*yesstyle[^"'\s>]+\.(?:jpg|jpeg|png|webp)[^"'\s>]*/gi)].map(
        (m) => m[0],
      )
      console.log('thcdn', [...new Set(th)].slice(0, 5))
      console.log('sephora', [...new Set(seph)].slice(0, 5))
      console.log('yesstyle', [...new Set(ys)].slice(0, 5))
      fs.writeFileSync(`scripts/_probe-src-${label.replace(/\W+/g, '_')}.txt`, text.slice(0, 50000))
    }
  } catch (e) {
    console.log(label, 'ERR', e.message)
  }
}

const q = encodeURIComponent(queries[0])
await tryFetch('sephora-api', `https://www.sephora.com/api/v2/catalog/search?type=keyword&q=${q}&pageSize=8`)
await tryFetch(
  'ulta-search',
  `https://www.ulta.com/services/v5/search/products?search=${q}&page=1&limit=8`,
)
await tryFetch(
  'iherb-search',
  `https://catalog.app.iherb.com/suggestions?term=${encodeURIComponent('Round Lab Dokdo')}&storeId=0`,
)
await tryFetch(
  'stylevana',
  `https://www.stylevana.com/search?q=${encodeURIComponent('Round Lab 1025 Dokdo Cleanser')}`,
  { Accept: 'text/html' },
)
await tryFetch(
  'oliveyoung',
  `https://global.oliveyoung.com/product/search?query=${encodeURIComponent('Anua Heartleaf 77')}`,
  { Accept: 'text/html' },
)
await tryFetch(
  'yesstyle',
  `https://www.yesstyle.com/en/list.html/bcc.15189_bpt.46?q=${encodeURIComponent('Torriden DIVE-IN')}`,
  { Accept: 'text/html' },
)
await tryFetch(
  'wikimedia',
  `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent('CeraVe foaming cleanser bottle')}&srnamespace=6&format=json`,
)
await tryFetch(
  'ddg',
  `https://duckduckgo.com/?q=${encodeURIComponent('Miss Dior Eau de Parfum bottle')}&iax=images&ia=images`,
  { Accept: 'text/html' },
)
