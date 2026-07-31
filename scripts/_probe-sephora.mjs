import fs from 'node:fs'

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

async function sephora(q) {
  const url = `https://www.sephora.com/api/v2/catalog/search?type=keyword&q=${encodeURIComponent(q)}&pageSize=12`
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: 'application/json',
      'x-requested-source': 'web',
    },
  })
  const j = await res.json()
  const products = j.products || []
  console.log('q=', q, 'n=', products.length)
  for (const p of products.slice(0, 6)) {
    console.log({
      brand: p.brandName || p.brand?.displayName,
      name: p.displayName,
      img: p.image450 || p.heroImage || p.image135 || p.targetUrl,
      keys: Object.keys(p).filter((k) => /image|name|brand|sku/i.test(k)),
    })
  }
  fs.writeFileSync('scripts/_sephora-sample.json', JSON.stringify(products[0] || j, null, 2).slice(0, 8000))
}

await sephora('Rare Beauty Soft Pinch Liquid Blush')
await sephora('La Roche-Posay Effaclar Foaming Gel')
await sephora('Round Lab Dokdo')
await sephora('Torriden DIVE-IN')
await sephora('Anua Heartleaf')
