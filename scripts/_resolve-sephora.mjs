import fs from 'node:fs'

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

const PRODUCTS = [
  ['rare-softpinch', 'Rare Beauty', 'Soft Pinch Liquid Blush'],
  ['ct-pillow', 'Charlotte Tilbury', 'Pillow Talk Lipstick'],
  ['ct-hairbrush', 'Charlotte Tilbury', 'Airbrush Flawless Finish'],
  ['ct-fairywand', 'Charlotte Tilbury', 'Beauty Light Wand'],
  ['nars-orgasm', 'NARS', 'Orgasm Blush'],
  ['nars-radiant', 'NARS', 'Radiant Creamy Concealer'],
  ['nars-laguna', 'NARS', 'Laguna Bronzing Powder'],
  ['fenty-profilt', 'Fenty Beauty', "Pro Filt'r Soft Matte Longwear Foundation"],
  ['fenty-gloss', 'Fenty Beauty', 'Gloss Bomb Universal Lip Luminizer'],
  ['fenty-match', 'Fenty Beauty', 'Match Stix Contour Skinstick'],
  ['huda-easybake', 'Huda Beauty', 'Easy Bake Loose Baking & Setting Powder'],
  ['huda-obsessions', 'Huda Beauty', 'Nude Obsessions Eyeshadow Palette'],
  ['dior-addict', 'Dior', 'Addict Lip Glow Oil'],
  ['dior-miss', 'Dior', 'Miss Dior Eau de Parfum'],
  ['clinique-almost', 'Clinique', 'Almost Lipstick Black Honey'],
  ['shiseido-ess', 'Shiseido', 'Ultimune Power Infusing Serum'],
  ['shiseido-benefiance', 'Shiseido', 'Benefiance Wrinkle Smoothing Cream'],
  ['shiseido-ginza', 'Shiseido', 'Ginza Eau de Parfum'],
  ['kerastase-genesis', 'Kérastase', 'Genesis Bain Hydra-Fortifiant'],
  ['kerastase-mask', 'Kérastase', 'Nutritive Masquintense'],
  ['bioderma-sebium', 'Bioderma', 'Sebium Global'],
  ['bioderma-spf', 'Bioderma', 'Photoderm'],
  ['vichy-normaderm', 'Vichy', 'Normaderm'],
  ['vichy-spf', 'Vichy', 'Capital Soleil UV-Age Daily'],
  ['lrp-retinol', 'La Roche-Posay', 'Redermic Retinol'],
  ['cerave-sa', 'CeraVe', 'Hydrating Hyaluronic Acid Serum'],
  ['olaplex-7', 'Olaplex', 'No.7 Bonding Oil'],
  ['olaplex-4', 'Olaplex', 'No.4 Bond Maintenance Shampoo'],
  ['torriden-dive', 'Torriden', 'DIVE IN Hyaluronic Acid Serum'],
  ['boj-dynasty', 'Beauty of Joseon', 'Dynasty Cream'],
  ['anua-heartleaf', 'Anua', 'Heartleaf 77% Soothing Toner'],
  ['roundlab-dokdo', 'Round Lab', '1025 Dokdo Cleanser'],
  ['roundlab-birch', 'Round Lab', 'Birch Juice Moisturizing Sunscreen'],
  ['roundlab-toner', 'Round Lab', '1025 Dokdo Toner'],
  ['purito-centella', 'Purito', 'Centella Unscented Serum'],
  ['purito-spf', 'Purito', 'Daily Soft Touch Sunscreen'],
  ['isntree-ha', 'Isntree', 'Hyaluronic Acid Watery Sun Gel'],
  ['isntree-onion', 'Isntree', 'Onion Newpair Essence'],
  ['medicube-zero', 'Medicube', 'Zero Pore Blackhead Mud Mask'],
  ['medicube-age', 'Medicube', 'Age-R Booster Pro'],
  ['tool-jade', 'Sephora Collection', 'Jade Facial Roller'],
  ['tool-gua', 'Sephora Collection', 'Gua Sha'],
  ['tool-brush', 'Sephora Collection', 'Blush Brush'],
  ['tool-derma', 'Foreo', 'Luna'],
  ['tool-eyelash', 'Tweezerman', 'eyelash curler'],
]

function tokens(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9+.\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2)
}

function score(brand, name, cb, cn) {
  const b = tokens(brand)
  const n = tokens(name)
  const brandHit = b.some((t) => tokens(cb).some((x) => x.includes(t) || t.includes(x)))
  if (!brandHit) return 0
  let hit = 0
  for (const t of n) if (tokens(cn).some((x) => x.includes(t) || t.includes(x))) hit++
  return 2 + (n.length ? hit / n.length : 0) * 5
}

const out = {}
for (const [id, brand, name] of PRODUCTS) {
  const q = `${brand} ${name}`
  const url = `https://www.sephora.com/api/v2/catalog/search?type=keyword&q=${encodeURIComponent(q)}&pageSize=16`
  try {
    const j = await (await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } })).json()
    let best = null
    let bestScore = 0
    for (const p of j.products || []) {
      const s = score(brand, name, p.brandName, p.displayName)
      if (s > bestScore) {
        bestScore = s
        best = p
      }
    }
    if (best && bestScore >= 2.5) {
      const img = (best.image450 || best.heroImage || '').replace(/imwidth=\d+/, 'imwidth=600')
      out[id] = { score: bestScore, brand: best.brandName, name: best.displayName, img }
      console.log('OK', id, bestScore.toFixed(2), best.brandName, '|', best.displayName)
    } else {
      console.log('NO', id, 'best', bestScore.toFixed(2), best?.brandName, best?.displayName)
    }
  } catch (e) {
    console.log('ERR', id, e.message)
  }
  await new Promise((r) => setTimeout(r, 150))
}
fs.writeFileSync('scripts/_sephora-resolved.json', JSON.stringify(out, null, 2))
console.log('resolved', Object.keys(out).length)
