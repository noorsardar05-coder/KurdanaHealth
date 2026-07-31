import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const dir = 'public/beauty/products'
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.jpg'))
const byHash = {}
for (const f of files) {
  const b = fs.readFileSync(path.join(dir, f))
  const h = crypto.createHash('sha1').update(b).digest('hex').slice(0, 12)
  ;(byHash[h] ||= []).push(f)
}
const dups = Object.entries(byHash).filter(([, v]) => v.length > 1)
console.log('files', files.length, 'unique', Object.keys(byHash).length, 'dupGroups', dups.length)
dups.forEach(([h, v]) => console.log(h, v.join(',')))
const src = fs.readFileSync('src/features/beauty/data/beautyProducts.js', 'utf8')
const ids = [...src.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1])
const missing = ids.filter((id) => !fs.existsSync(path.join(dir, `${id}.jpg`)))
console.log('product ids', ids.length, 'missing', missing.length, missing.join(','))
if (fs.existsSync(path.join(dir, '_repair-report.txt'))) {
  console.log('--- report ---')
  console.log(fs.readFileSync(path.join(dir, '_repair-report.txt'), 'utf8'))
}
if (fs.existsSync(path.join(dir, '_still-missing.txt'))) {
  console.log('still-missing', fs.readFileSync(path.join(dir, '_still-missing.txt'), 'utf8'))
}
