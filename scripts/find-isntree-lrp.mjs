/** Find Isntree + LRP retinol images */
const UA = 'Mozilla/5.0'

async function test(u) {
  const r = await fetch(u, { headers: { 'User-Agent': UA, Accept: 'image/*' } })
  const b = Buffer.from(await r.arrayBuffer())
  return { status: r.status, size: b.length, u }
}

async function shopSearch(domain, needle) {
  try {
    const r = await fetch(`https://${domain}/products.json?limit=250`, {
      headers: { 'User-Agent': UA },
    })
    const j = await r.json()
    return (j.products || []).filter((p) =>
      `${p.title} ${p.handle}`.toLowerCase().includes(needle.toLowerCase()),
    )
  } catch {
    return []
  }
}

async function obf(q) {
  const url =
    'https://world.openbeautyfacts.org/cgi/search.pl?' +
    new URLSearchParams({ search_terms: q, search_simple: '1', action: 'process', json: '1', page_size: '8' })
  const r = await fetch(url, { headers: { 'User-Agent': UA } })
  const d = await r.json()
  return d.products || []
}

const candidates = [
  'https://maskmarie.com/cdn/shop/files/isntree-hyaluronic-acid-watery-sun-gel.webp',
  'https://maskmarie.com/cdn/shop/files/isntree-onion-newpair-essence-toner.webp',
  'https://wooltariusa.com/cdn/shop/files/isntree_hyaluronic_sun_gel.jpg',
  'https://juuicosmetics.com/sites/default/files/styles/original/public/2026-03/isntree_hyaluronic_sun_gel.webp',
  'https://www.sephora.com/productimages/sku/s2697568-main-zoom.jpg?imwidth=600',
  'https://www.sephora.com/productimages/sku/s2766846-main-zoom.jpg?imwidth=600',
  'https://www.sephora.com/productimages/sku/s2766853-main-zoom.jpg?imwidth=600',
  'https://www.sephora.com/productimages/sku/s2379709-main-zoom.jpg?imwidth=600',
  'https://www.sephora.com/productimages/sku/s2648310-main-zoom.jpg?imwidth=600',
  'https://images.openbeautyfacts.org/images/products/333/787/566/0270/front_en.4.400.jpg',
  'https://images.openbeautyfacts.org/images/products/333/787/566/0270/front_fr.7.400.jpg',
]

for (const u of candidates) {
  console.log(await test(u))
}

for (const d of ['maskmarie.com', 'wooltariusa.com', 'stylevian.com', 'kbeauty.ca']) {
  for (const n of ['isntree', 'retinol']) {
    const hits = await shopSearch(d, n)
    for (const p of hits.slice(0, 2)) {
      const img = p.images?.[0]?.src
      if (img) console.log(d, p.title, await test(img))
    }
  }
}

for (const q of ['Isntree Hyaluronic', 'Isntree Onion', 'Redermic Retinol']) {
  console.log('\nOBF', q)
  for (const p of await obf(q)) {
    if (!p.image_front_url) continue
    console.log(p.brands, p.product_name, await test(p.image_front_url))
  }
}
