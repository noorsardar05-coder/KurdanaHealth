import fs from 'fs'
import { PRODUCT_IMAGE_MAP } from '../src/features/beauty/data/productImageMap.js'

const src = fs.readFileSync('src/features/beauty/data/beautyProducts.js', 'utf8')
const ids = [...src.matchAll(/id: "([^"]+)"/g)].map((m) => m[1])
const missing = ids.filter((id) => {
  const local = fs.existsSync(`public/beauty/products/${id}.jpg`)
  return !local && !PRODUCT_IMAGE_MAP[id]
})
fs.writeFileSync('scripts/_missing-products.txt', missing.join('\n'))
console.log('have', ids.length - missing.length, 'missing', missing.length)
console.log(missing.join(','))
