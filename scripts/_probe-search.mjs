import fs from 'node:fs'

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

async function probe(name, url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html' } })
  const html = await res.text()
  const re = /https:\/\/static\.thcdn\.com\/productimg\/original\/[0-9]+-[0-9]+\.jpe?g/gi
  const urls = [...new Set([...html.matchAll(re)].map((m) => m[0]))]
  console.log(name, 'status', res.status, 'len', html.length, 'thcdn', urls.length)
  console.log(urls.slice(0, 8).join('\n'))
  // product card snippets with title + img
  const cards = [...html.matchAll(/"imageUrl"\s*:\s*"([^"]+)"[^}]{0,400}"title"\s*:\s*"([^"]+)"/gi)]
  console.log('imageUrl+title', cards.length)
  cards.slice(0, 5).forEach((m) => console.log('-', m[2], '→', m[1].slice(0, 100)))
  const cards2 = [...html.matchAll(/"title"\s*:\s*"([^"]+)"[^}]{0,400}"imageUrl"\s*:\s*"([^"]+)"/gi)]
  console.log('title+imageUrl', cards2.length)
  cards2.slice(0, 5).forEach((m) => console.log('-', m[1], '→', m[2].slice(0, 100)))
  fs.writeFileSync(`scripts/_probe-${name}.html`, html.slice(0, 200000))
}

const q = encodeURIComponent('Round Lab 1025 Dokdo Cleanser')
await probe('cult', `https://www.cultbeauty.com/search/?q=${q}`)
await probe('lf', `https://www.lookfantastic.com/search/?q=${q}`)
