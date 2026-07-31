/** Search OBF + Sephora for stubborn missing products */
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36'

const SEARCHES = [
  { id: 'lrp-effaclar', brand: 'La Roche-Posay', q: 'Effaclar gel moussant purifiant' },
  { id: 'lrp-retinol', brand: 'La Roche-Posay', q: 'Redermic Retinol' },
  { id: 'roundlab-birch', brand: 'Round Lab', q: 'Birch Juice Moisturizing Sunscreen' },
  { id: 'isntree-ha', brand: 'Isntree', q: 'Hyaluronic Acid Watery Sun Gel' },
  { id: 'isntree-onion', brand: 'Isntree', q: 'Onion Newpair Essence Toner' },
  { id: 'redken-shampoo', brand: 'Redken', q: 'All Soft Shampoo' },
]

async function obfSearch(q) {
  const url = 'https://world.openbeautyfacts.org/cgi/search.pl?' + new URLSearchParams({
    search_terms: q, search_simple: '1', action: 'process', json: '1', page_size: '5',
  })
  const r = await fetch(url, { headers: { 'User-Agent': UA } })
  const d = await r.json()
  return (d.products || []).map(p => ({
    name: p.product_name || p.product_name_en,
    brands: p.brands,
    img: (p.image_front_url || p.image_url || '').replace(/\.100\.jpg/i, '.400.jpg'),
    code: p.code,
  }))
}

async function sephoraSearch(q) {
  const url = 'https://www.sephora.com/api/catalog/search?' + new URLSearchParams({
    type: 'keyword', q, pageSize: '5', currentPage: '1',
  })
  const r = await fetch(url, { headers: { 'User-Agent': UA, Referer: 'https://www.sephora.com/' } })
  if (!r.ok) return []
  const d = await r.json()
  return (d.products || []).map(p => ({
    brand: p.brandName,
    name: p.displayName,
    sku: p.currentSku?.skuId,
    img: p.currentSku?.skuImages?.imageUrl || p.heroImage,
  }))
}

for (const s of SEARCHES) {
  console.log('\n====', s.id, '====')
  const obf = await obfSearch(s.q)
  for (const p of obf) console.log('OBF', p.brands, '|', p.name, '|', p.img?.slice(0,70))
  const sep = await sephoraSearch(`${s.brand} ${s.q}`)
  for (const p of sep) console.log('SEP', p.brand, '|', p.name, '| s' + p.sku)
  await new Promise(r => setTimeout(r, 300))
}
