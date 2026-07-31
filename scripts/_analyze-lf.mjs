import fs from 'node:fs'

const html = fs.readFileSync('scripts/_probe-lf.html', 'utf8')
// find product-name patterns near thcdn
const re = /https:\/\/static\.thcdn\.com\/productimg\/original\/([0-9]+-[0-9]+\.jpe?g)/gi
const urls = [...html.matchAll(re)]
console.log('urls', urls.length)

// try to find product tiles with data attributes
for (const key of ['productName', 'displayName', 'product-name', 'data-product', 'schema.org/Product', '"name":', 'alt=']) {
  console.log(key, (html.match(new RegExp(key, 'gi')) || []).length)
}

// extract alt texts with thcdn nearby
const alts = [...html.matchAll(/alt="([^"]{8,120})"[^>]{0,300}productimg\/original\/([0-9]+-[0-9]+\.jpe?g)/gi)]
console.log('alt-before-img', alts.length)
alts.slice(0, 8).forEach((m) => console.log(m[1], m[2]))

const alts2 = [...html.matchAll(/productimg\/original\/([0-9]+-[0-9]+\.jpe?g)[^>]{0,300}alt="([^"]{8,120})"/gi)]
console.log('img-before-alt', alts2.length)
alts2.slice(0, 8).forEach((m) => console.log(m[2], m[1]))

// JSON blob in page
const jsonMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*(\{[\s\S]*?\});?\s*<\/script>/)
console.log('initial state', !!jsonMatch)
const nextData = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)
console.log('next data', !!nextData)
const apollo = html.match(/__APOLLO_STATE__|__PRELOADED_STATE__|productSearch/i)
console.log('apollo-ish', !!apollo)

// search for Round Lab in html
const idx = html.toLowerCase().indexOf('dokdo')
console.log('dokdo idx', idx)
if (idx > 0) console.log(html.slice(Math.max(0, idx - 200), idx + 300).replace(/\s+/g, ' '))
