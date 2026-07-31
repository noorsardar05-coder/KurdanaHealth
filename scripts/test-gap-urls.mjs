/** Quick gap-fill: validate candidate URLs for missing products */
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36'

const CANDIDATES = {
  'lrp-effaclar': [
    'https://images.openbeautyfacts.org/images/products/333/787/241/3995/front_en.4.400.jpg',
    'https://images.openbeautyfacts.org/images/products/333/787/241/3995/front_en.400.jpg',
    'https://images.openbeautyfacts.org/images/products/333/787/241/3995/front_en.3.400.jpg',
    'https://www.sephora.com/productimages/sku/s1894303-main-zoom.jpg?imwidth=600',
    'https://www.sephora.com/productimages/sku/s2421196-main-zoom.jpg?imwidth=600',
    'https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lrp-us-master-catalog/default/dw8c8e8e8e/Effaclar-Purifying-Foaming-Gel-200ml.jpg',
  ],
  'lrp-anthelios': [
    'https://images.openbeautyfacts.org/images/products/333/787/558/7998/front_en.3.400.jpg',
    'https://images.openbeautyfacts.org/images/products/869/059/521/4177/front_tr.5.400.jpg',
    'https://www.sephora.com/productimages/sku/s2648310-main-zoom.jpg?imwidth=600',
  ],
  'vichy-liftactiv': [
    'https://images.openbeautyfacts.org/images/products/333/787/132/5505/front_en.4.400.jpg',
    'https://www.sephora.com/productimages/sku/s2210631-main-zoom.jpg?imwidth=600',
  ],
  'avene-tol': [
    'https://images.openbeautyfacts.org/images/products/328/277/014/1351/front_en.4.400.jpg',
    'https://images.openbeautyfacts.org/images/products/328/277/013/8801/front_fr.12.400.jpg',
  ],
  'bioderma-sebium': [
    'https://images.openbeautyfacts.org/images/products/340/139/537/3682/front_en.8.400.jpg',
    'https://images.openbeautyfacts.org/images/products/340/157/865/3709/front_fr.5.400.jpg',
  ],
  'roundlab-birch': [
    'https://images.openbeautyfacts.org/images/products/880/964/739/0412/front_en.3.400.jpg',
    'https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Birch_Juice_Moisturizing_Sunscreen.webp',
  ],
  'skin1004-ampoule': [
    'https://images.openbeautyfacts.org/images/products/880/957/470/0025/front_en.5.400.jpg',
    'https://images.openbeautyfacts.org/images/products/880/957/626/0601/front_en.3.400.jpg',
    'https://cdn.shopify.com/s/files/1/0637/1720/7526/files/Madagascar_Centella_Ampoule.png',
  ],
  'skin1004-spf': [
    'https://images.openbeautyfacts.org/images/products/880/957/470/1145/front_en.3.400.jpg',
    'https://images.openbeautyfacts.org/images/products/880/991/383/0177/front_fr.3.400.jpg',
  ],
  'purito-centella': [
    'https://images.openbeautyfacts.org/images/products/880/956/002/0321/front_en.6.400.jpg',
    'https://images.openbeautyfacts.org/images/products/880/956/310/0095/front_en.6.400.jpg',
  ],
  'isntree-ha': [
    'https://images.openbeautyfacts.org/images/products/880/953/423/0132/front_en.4.400.jpg',
    'https://www.sephora.com/productimages/sku/s2697568-main-zoom.jpg?imwidth=600',
  ],
  'shiseido-ess': [
    'https://www.sephora.com/productimages/sku/s1932924-main-zoom.jpg?imwidth=600',
    'https://images.openbeautyfacts.org/images/products/072/923/813/9237/front_fr.3.400.jpg',
  ],
  'shiseido-ginza': [
    'https://www.sephora.com/productimages/sku/s2046633-main-zoom.jpg?imwidth=600',
    'https://images.openbeautyfacts.org/images/products/076/861/419/1100/front_fr.7.400.jpg',
  ],
  'lrp-retinol': [
    'https://images.openbeautyfacts.org/images/products/333/787/241/4190/front_en.5.400.jpg',
    'https://www.sephora.com/productimages/sku/s2379709-main-zoom.jpg?imwidth=600',
  ],
  'cerave-sa': [
    'https://images.openbeautyfacts.org/images/products/360/600/057/2682/front_en.3.400.jpg',
    'https://images.openbeautyfacts.org/images/products/333/787/559/7180/front_en.35.400.jpg',
    'https://www.sephora.com/productimages/sku/s2031427-main-zoom.jpg?imwidth=600',
  ],
  'cerave-eye': [
    'https://images.openbeautyfacts.org/images/products/360/600/040/2973/front_en.4.400.jpg',
    'https://images.openbeautyfacts.org/images/products/333/787/559/8996/front_en.28.400.jpg',
    'https://www.sephora.com/productimages/sku/s2031429-main-zoom.jpg?imwidth=600',
  ],
  'vichy-normaderm': [
    'https://images.openbeautyfacts.org/images/products/333/787/554/0788/front_en.4.400.jpg',
    'https://images.openbeautyfacts.org/images/products/333/787/555/3278/front_fr.4.400.jpg',
  ],
  'avene-eau': [
    'https://images.openbeautyfacts.org/images/products/328/277/900/7441/front_en.9.400.jpg',
    'https://images.openbeautyfacts.org/images/products/328/277/900/3124/front_en.10.400.jpg',
  ],
  'purito-spf': [
    'https://images.openbeautyfacts.org/images/products/880/956/002/1427/front_en.3.400.jpg',
    'https://images.openbeautyfacts.org/images/products/880/956/310/3072/front_ru.3.400.jpg',
  ],
  'isntree-onion': [
    'https://images.openbeautyfacts.org/images/products/880/953/423/0613/front_en.3.400.jpg',
  ],
  'skin1004-cleanser': [
    'https://images.openbeautyfacts.org/images/products/880/957/470/0063/front_en.3.400.jpg',
    'https://images.openbeautyfacts.org/images/products/880/957/626/1769/front_en.3.400.jpg',
  ],
  'redken-shampoo': [
    'https://www.sephora.com/productimages/sku/s1987753-main-zoom.jpg?imwidth=600',
    'https://images.openbeautyfacts.org/images/products/361/262/338/3452/front_fr.3.400.jpg',
  ],
  'avene-spf': [
    'https://images.openbeautyfacts.org/images/products/328/277/014/8176/front_en.4.400.jpg',
    'https://images.openbeautyfacts.org/images/products/328/277/014/1214/front_fr.6.400.jpg',
  ],
  'bioderma-spf': [
    'https://images.openbeautyfacts.org/images/products/340/139/974/6017/front_en.4.400.jpg',
    'https://images.openbeautyfacts.org/images/products/340/152/852/0846/front_fr.3.400.jpg',
  ],
  'vichy-spf': [
    'https://images.openbeautyfacts.org/images/products/333/787/554/7923/front_en.3.400.jpg',
    'https://images.openbeautyfacts.org/images/products/333/787/132/7804/front_en.18.400.jpg',
  ],
  'clinique-almost': [
    'https://www.sephora.com/productimages/sku/s70680-main-zoom.jpg?imwidth=600',
    'https://www.sephora.com/productimages/sku/s1384376-main-zoom.jpg?imwidth=600',
  ],
}

async function test(url) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'image/*' } })
    const buf = Buffer.from(await r.arrayBuffer())
    return { status: r.status, size: buf.length, ct: r.headers.get('content-type') }
  } catch (e) {
    return { error: e.message }
  }
}

for (const [id, urls] of Object.entries(CANDIDATES)) {
  console.log(`\n=== ${id} ===`)
  for (const u of urls) {
    const r = await test(u)
    console.log(r.status || r.error, r.size || '', u.slice(0, 90))
  }
}
