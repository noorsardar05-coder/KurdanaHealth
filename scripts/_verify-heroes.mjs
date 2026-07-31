import fs from 'node:fs'

const src = fs.readFileSync('src/features/beauty/data/productImageMap.js', 'utf8')
const entries = [...src.matchAll(/"([^"]+)":\s*"(https:[^"]+)"/g)].map((m) => ({ id: m[1], url: m[2] }))
const heroes = ['lrp-effaclar', 'cerave-foam', 'boj-spf', 'cosrx-snail', 'vichy-mineral89', 'el-adv-night']

for (const id of heroes) {
  const e = entries.find((x) => x.id === id)
  if (!e) {
    console.log(id, 'MISSING FROM MAP')
    continue
  }
  const r = await fetch(e.url, { headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'image/*' } })
  const b = Buffer.from(await r.arrayBuffer())
  console.log(id, r.status, b.length, e.url.slice(0, 90))
}

const byUrl = {}
for (const e of entries) (byUrl[e.url] ||= []).push(e.id)
const dups = Object.values(byUrl).filter((a) => a.length > 1)
console.log('total', entries.length, 'unique', Object.keys(byUrl).length, 'dups', dups.length)
