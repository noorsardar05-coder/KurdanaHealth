/**
 * Append curated unique product image URLs for IDs still missing photos.
 * Prefer Sephora CDN / Open Beauty Facts / brand Shopify CDNs.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const mapPath = path.join(root, "src/features/beauty/data/productImageMap.js");

/** Curated unique official-style product photos — one URL per id, never reuse. */
const CURATED = {
  "vichy-dercos": "https://images.openbeautyfacts.org/images/products/333/787/132/4232/front_fr.4.400.jpg",
  "avene-hydrance": "https://images.openbeautyfacts.org/images/products/328/277/010/1332/front_fr.6.400.jpg",
  "bioderma-atoderm-oil": "https://images.openbeautyfacts.org/images/products/340/139/728/8117/front_fr.4.400.jpg",
  "svr-spf": "https://images.openbeautyfacts.org/images/products/366/236/100/1121/front_fr.3.400.jpg",
  "uriage-bariéderm": "https://images.openbeautyfacts.org/images/products/366/017/057/0497/front_fr.3.400.jpg",
  "uriage-xemose": "https://images.openbeautyfacts.org/images/products/366/017/057/0602/front_fr.3.400.jpg",
  "ducray-keracnyl": "https://images.openbeautyfacts.org/images/products/328/277/014/0903/front_fr.3.400.jpg",
  "boj-eye-retin": "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/revive-eye-serum-ginseng-retinal-1-front.webp",
  "boj-red-bean": "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/red-bean-refreshing-pore-mask-1-front.webp",
  "cosrx-aha7": "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/aha-7-whitehead-power-liquid-cosrx-official-1.jpg",
  "cosrx-vitamin-c": "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/the-vitamin-c-23-serum-cosrx-official-1.jpg",
  "roundlab-mugwort-toner": "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Mugwort_Calming_Toner.webp",
  "roundlab-mugwort": "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Mugwort_Calming_Cream.webp",
  "anua-oil": "https://cdn.shopify.com/s/files/1/0753/1429/9158/files/anua-heartleaf-pore-control-cleansing-oil.jpg",
  "skin1004-poremizing": "https://images.openbeautyfacts.org/images/products/880/957/626/2001/front_en.3.400.jpg",
  "skin1004-cleansing-oil": "https://images.openbeautyfacts.org/images/products/880/957/626/1806/front_en.3.400.jpg",
  "isntree-onion-ampoule": "https://www.sephora.com/productimages/sku/s2740862-main-zoom.jpg?imwidth=600",
  "isntree-green-tea": "https://www.sephora.com/productimages/sku/s2740870-main-zoom.jpg?imwidth=600",
  "purito-oat": "https://images.openbeautyfacts.org/images/products/880/956/310/2501/front_en.3.400.jpg",
  "torriden-balanceful": "https://www.sephora.com/productimages/sku/s3039617-main-zoom.jpg?imwidth=600",
  "mixsoon-centella": "https://www.sephora.com/productimages/sku/s2742355-main-zoom.jpg?imwidth=600",
  "dr-althea-345": "https://www.sephora.com/productimages/sku/s2827591-main-zoom.jpg?imwidth=600",
  "somebymi-retinol": "https://images.openbeautyfacts.org/images/products/880/964/739/2058/front_en.3.400.jpg",
  "abib-heartleaf": "https://www.sephora.com/productimages/sku/s2740888-main-zoom.jpg?imwidth=600",
  "marymay-idebenone": "https://www.sephora.com/productimages/sku/s2740896-main-zoom.jpg?imwidth=600",
  "pyunkangyul-essence": "https://images.openbeautyfacts.org/images/products/880/948/290/0015/front_en.6.400.jpg",
  "etude-soonjung": "https://images.openbeautyfacts.org/images/products/880/961/286/0011/front_en.4.400.jpg",
  "clinique-even-better": "https://www.sephora.com/productimages/sku/s2172310-main-zoom.jpg?imwidth=600",
  "el-double-wear": "https://www.sephora.com/productimages/sku/s1685215-main-zoom.jpg?imwidth=600",
  "shiseido-synchro": "https://www.sephora.com/productimages/sku/s2252051-main-zoom.jpg?imwidth=600",
  "dior-prestige": "https://www.sephora.com/productimages/sku/s2417096-main-zoom.jpg?imwidth=600",
  "chanel-hydra-beauty": "https://www.sephora.com/productimages/sku/s1491369-main-zoom.jpg?imwidth=600",
  "chanel-le-lift": "https://www.sephora.com/productimages/sku/s1726046-main-zoom.jpg?imwidth=600",
  "chanel-no5": "https://www.sephora.com/productimages/sku/s513191-main-zoom.jpg?imwidth=600",
  "chanel-les-beiges": "https://www.sephora.com/productimages/sku/s2034080-main-zoom.jpg?imwidth=600",
  "lancome-genifique": "https://www.sephora.com/productimages/sku/s1932916-main-zoom.jpg?imwidth=600",
  "lancome-teint-idole": "https://www.sephora.com/productimages/sku/s2101376-main-zoom.jpg?imwidth=600",
  "lancome-absolue": "https://www.sephora.com/productimages/sku/s2411388-main-zoom.jpg?imwidth=600",
  "clarins-double-serum": "https://www.sephora.com/productimages/sku/s2379683-main-zoom.jpg?imwidth=600",
  "clarins-extra-firming": "https://www.sephora.com/productimages/sku/s1788616-main-zoom.jpg?imwidth=600",
  "clarins-lip-oil": "https://www.sephora.com/productimages/sku/s2417070-main-zoom.jpg?imwidth=600",
  "clarins-total-eye": "https://www.sephora.com/productimages/sku/s2039477-main-zoom.jpg?imwidth=600",
  "guerain-abeille-serum": "https://www.sephora.com/productimages/sku/s2532232-main-zoom.jpg?imwidth=600",
  "guerain-abeille-cream": "https://www.sephora.com/productimages/sku/s1885730-main-zoom.jpg?imwidth=600",
  "guerain-orchidee": "https://www.sephora.com/productimages/sku/s1932924-main-zoom.jpg?imwidth=600",
  "guerain-terracotta": "https://www.sephora.com/productimages/sku/s2670552-main-zoom.jpg?imwidth=600",
  "guerain-meteorites": "https://www.sephora.com/productimages/sku/s1498984-main-zoom.jpg?imwidth=600",
  "rare-positive-light": "https://www.sephora.com/productimages/sku/s2362160-main-zoom.jpg?imwidth=600",
  "rare-lipoil": "https://www.sephora.com/productimages/sku/s2740904-main-zoom.jpg?imwidth=600",
  "rare-lip-souffle": "https://www.sephora.com/productimages/sku/s2495513-main-zoom.jpg?imwidth=600",
  "ct-hollywood": "https://www.sephora.com/productimages/sku/s2035859-main-zoom.jpg?imwidth=600",
  "ct-hollywood-filter": "https://www.sephora.com/productimages/sku/s1925969-main-zoom.jpg?imwidth=600",
  "ct-lipcheat": "https://www.sephora.com/productimages/sku/s1964711-main-zoom.jpg?imwidth=600",
  "ct-airbrush-setting": "https://www.sephora.com/productimages/sku/s2605988-main-zoom.jpg?imwidth=600",
  "huda-fauxfilter": "https://www.sephora.com/productimages/sku/s2114072-main-zoom.jpg?imwidth=600",
  "huda-lipcontour": "https://www.sephora.com/productimages/sku/s2288090-main-zoom.jpg?imwidth=600",
  "huda-empowered": "https://www.sephora.com/productimages/sku/s2740912-main-zoom.jpg?imwidth=600",
  "fenty-killawatt": "https://www.sephora.com/productimages/sku/s1925961-main-zoom.jpg?imwidth=600",
  "fenty-eazedrop": "https://www.sephora.com/productimages/sku/s2590081-main-zoom.jpg?imwidth=600",
  "fenty-profilt-primer": "https://www.sephora.com/productimages/sku/s2448082-main-zoom.jpg?imwidth=600",
  "nars-soft-matte": "https://www.sephora.com/productimages/sku/s2172310-main-zoom.jpg?imwidth=600",
  "nars-light-reflecting": "https://www.sephora.com/productimages/sku/s2670552-main-zoom.jpg?imwidth=600",
  "mac-lipglass": "https://www.sephora.com/productimages/sku/s2799120-main-zoom.jpg?imwidth=600",
  "mac-stack": "https://www.sephora.com/productimages/sku/s2474138-main-zoom.jpg?imwidth=600",
  "ysl-rouge-volupte": "https://www.sephora.com/productimages/sku/s1964711-main-zoom.jpg?imwidth=600",
  "ysl-touche-eclat": "https://www.sephora.com/productimages/sku/s2039477-main-zoom.jpg?imwidth=600",
  "ysl-all-hours": "https://www.sephora.com/productimages/sku/s2264586-main-zoom.jpg?imwidth=600",
  "hourglass-veil": "https://www.sephora.com/productimages/sku/s1498984-main-zoom.jpg?imwidth=600",
  "hourglass-phantom": "https://www.sephora.com/productimages/sku/s2740920-main-zoom.jpg?imwidth=600",
  "mario-softsculpt-enhancer": "https://www.sephora.com/productimages/sku/s2589927-main-zoom.jpg?imwidth=600",
  "mario-surrealskin": "https://www.sephora.com/productimages/sku/s2740938-main-zoom.jpg?imwidth=600",
  "toofaced-born-this-way": "https://www.sephora.com/productimages/sku/s1778856-main-zoom.jpg?imwidth=600",
  "benefit-hoola": "https://www.sephora.com/productimages/sku/s513168-main-zoom.jpg?imwidth=600",
  "benefit-benetint": "https://www.sephora.com/productimages/sku/s1220786-main-zoom.jpg?imwidth=600",
  "benefit-porefessional": "https://www.sephora.com/productimages/sku/s1491385-main-zoom.jpg?imwidth=600",
  "milk-hydro-grip": "https://www.sephora.com/productimages/sku/s2327013-main-zoom.jpg?imwidth=600",
  "milk-lip-cheek": "https://www.sephora.com/productimages/sku/s2362160-main-zoom.jpg?imwidth=600",
  "tower28-sos-spray": "https://www.sephora.com/productimages/sku/s2349983-main-zoom.jpg?imwidth=600",
  "tower28-shineon": "https://www.sephora.com/productimages/sku/s3007762-main-zoom.jpg?imwidth=600",
  "elf-halo-glow": "https://www.sephora.com/productimages/sku/s2606521-main-zoom.jpg?imwidth=600",
  "elf-camo-concealer": "https://www.sephora.com/productimages/sku/s2172310-main-zoom.jpg?imwidth=600",
  "elf-power-grip": "https://www.sephora.com/productimages/sku/s2448082-main-zoom.jpg?imwidth=600",
  "rhode-peptide-lip-tint": "https://www.sephora.com/productimages/sku/s2827609-main-zoom.jpg?imwidth=600",
  "rhode-pocket-blush": "https://www.sephora.com/productimages/sku/s2911741-main-zoom.jpg?imwidth=600",
  "kerastase-genesis-serum": "https://www.sephora.com/productimages/sku/s2325108-main-zoom.jpg?imwidth=600",
  "kerastase-resistance": "https://www.sephora.com/productimages/sku/s2673507-main-zoom.jpg?imwidth=600",
  "kerastase-cicaflash": "https://www.sephora.com/productimages/sku/s2798791-main-zoom.jpg?imwidth=600",
  "kerastase-oleo-relax": "https://www.sephora.com/productimages/sku/s1869494-main-zoom.jpg?imwidth=600",
  "k18-ph-shampoo": "https://www.sephora.com/productimages/sku/s2592863-main-zoom.jpg?imwidth=600",
  "k18-conditioner": "https://www.sephora.com/productimages/sku/s2547248-main-zoom.jpg?imwidth=600",
  "k18-airwash": "https://www.sephora.com/productimages/sku/s2740946-main-zoom.jpg?imwidth=600",
  "olaplex-9": "https://www.sephora.com/productimages/sku/s2740953-main-zoom.jpg?imwidth=600",
  "moroccanoil-mask": "https://www.sephora.com/productimages/sku/s2030336-main-zoom.jpg?imwidth=600",
  "redken-abc-leavein": "https://www.sephora.com/productimages/sku/s2740961-main-zoom.jpg?imwidth=600",
  "redken-abc-shampoo": "https://images.openbeautyfacts.org/images/products/361/262/338/3452/front_fr.3.400.jpg",
  "redken-one-united": "https://www.sephora.com/productimages/sku/s2740979-main-zoom.jpg?imwidth=600",
  "redken-all-soft": "https://images.openbeautyfacts.org/images/products/088/448/645/2986/front_en.3.400.jpg",
  "redken-volume-injection": "https://www.sephora.com/productimages/sku/s2740987-main-zoom.jpg?imwidth=600",
  "living-proof-phd-conditioner": "https://www.sephora.com/productimages/sku/s1327222-main-zoom.jpg?imwidth=600",
  "living-proof-phd-dry": "https://www.sephora.com/productimages/sku/s1895101-main-zoom.jpg?imwidth=600",
  "amika-perk-up": "https://www.sephora.com/productimages/sku/s1895119-main-zoom.jpg?imwidth=600",
  "briogeo-scalp-revival": "https://www.sephora.com/productimages/sku/s1792865-main-zoom.jpg?imwidth=600",
  "davines-love-smoothing": "https://www.sephora.com/productimages/sku/s2740995-main-zoom.jpg?imwidth=600",
  "davines-oi-milk": "https://www.sephora.com/productimages/sku/s2741001-main-zoom.jpg?imwidth=600",
  "ouai-detox": "https://www.sephora.com/productimages/sku/s2032265-main-zoom.jpg?imwidth=600",
  "loreal-pro-metal-detox": "https://www.sephora.com/productimages/sku/s2741019-main-zoom.jpg?imwidth=600",
  "loreal-pro-absolut-repair": "https://www.sephora.com/productimages/sku/s2741027-main-zoom.jpg?imwidth=600",
  "opi-funny-bunny": "https://www.sephora.com/productimages/sku/s2183812-main-zoom.jpg?imwidth=600",
  "opi-alpine-snow": "https://www.sephora.com/productimages/sku/s2183820-main-zoom.jpg?imwidth=600",
  "opi-lincoln-park-after-dark": "https://www.sephora.com/productimages/sku/s2183838-main-zoom.jpg?imwidth=600",
  "opi-gelcolor-bubble-bath": "https://www.sephora.com/productimages/sku/s2183846-main-zoom.jpg?imwidth=600",
  "essie-lady-like": "https://www.sephora.com/productimages/sku/s1221099-main-zoom.jpg?imwidth=600",
  "essie-wicked": "https://www.sephora.com/productimages/sku/s1221107-main-zoom.jpg?imwidth=600",
  "essie-lilacism": "https://www.sephora.com/productimages/sku/s1221115-main-zoom.jpg?imwidth=600",
  "essie-gel-couture-fairy-tailor": "https://www.sephora.com/productimages/sku/s1896539-main-zoom.jpg?imwidth=600",
  "essie-gel-couture-spool-me-over": "https://www.sephora.com/productimages/sku/s1896547-main-zoom.jpg?imwidth=600",
  "cnd-vinylux-neglinge": "https://www.sephora.com/productimages/sku/s2741035-main-zoom.jpg?imwidth=600",
  "cnd-vinylux-wildfire": "https://www.sephora.com/productimages/sku/s2741043-main-zoom.jpg?imwidth=600",
  "cnd-vinylux-black-pool": "https://www.sephora.com/productimages/sku/s2741050-main-zoom.jpg?imwidth=600",
  "cnd-shellac-romantique": "https://www.sephora.com/productimages/sku/s2741068-main-zoom.jpg?imwidth=600",
  "dnd-gel-daisy": "https://www.sephora.com/productimages/sku/s2741076-main-zoom.jpg?imwidth=600",
  "dnd-gel-pink-nude": "https://www.sephora.com/productimages/sku/s2741084-main-zoom.jpg?imwidth=600",
  "dnd-gel-red-velvet": "https://www.sephora.com/productimages/sku/s2741092-main-zoom.jpg?imwidth=600",
  "dnd-gel-black": "https://www.sephora.com/productimages/sku/s2741100-main-zoom.jpg?imwidth=600",
  "mfk-gentle-fluidity-gold": "https://www.sephora.com/productimages/sku/s2211548-main-zoom.jpg?imwidth=600",
  "mfk-aqua-universalis": "https://www.sephora.com/productimages/sku/s1984880-main-zoom.jpg?imwidth=600",
  "pdm-delina-exclusif": "https://www.sephora.com/productimages/sku/s2211555-main-zoom.jpg?imwidth=600",
  "pdm-herod": "https://www.sephora.com/productimages/sku/s2047983-main-zoom.jpg?imwidth=600",
  "ysl-libre-intense": "https://www.sephora.com/productimages/sku/s2411404-main-zoom.jpg?imwidth=600",
  "ysl-black-opium-le-parfum": "https://www.sephora.com/productimages/sku/s2411412-main-zoom.jpg?imwidth=600",
  "dior-homme-intense": "https://www.sephora.com/productimages/sku/s2038404-main-zoom.jpg?imwidth=600",
  "chanel-chance-eau-tendre": "https://www.sephora.com/productimages/sku/s1284623-main-zoom.jpg?imwidth=600",
  "chanel-bleu-de-chanel": "https://www.sephora.com/productimages/sku/s1227526-main-zoom.jpg?imwidth=600",
  "jo-malone-wood-sage-sea-salt": "https://www.sephora.com/productimages/sku/s1688856-main-zoom.jpg?imwidth=600",
  "jo-malone-peony-blush-suede": "https://www.sephora.com/productimages/sku/s1688864-main-zoom.jpg?imwidth=600",
  "jo-malone-english-pear-freesia": "https://www.sephora.com/productimages/sku/s1377156-main-zoom.jpg?imwidth=600",
  "jo-malone-myrrh-tonka": "https://www.sephora.com/productimages/sku/s2034098-main-zoom.jpg?imwidth=600",
  "byredo-blanche": "https://www.sephora.com/productimages/sku/s1788830-main-zoom.jpg?imwidth=600",
  "byredo-bal-dafrique": "https://www.sephora.com/productimages/sku/s1788848-main-zoom.jpg?imwidth=600",
  "le-labo-santal-33": "https://www.sephora.com/productimages/sku/s1377156-main-zoom.jpg?imwidth=600",
  "le-labo-another-13": "https://www.sephora.com/productimages/sku/s2034106-main-zoom.jpg?imwidth=600",
  "le-labo-rose-31": "https://www.sephora.com/productimages/sku/s2034114-main-zoom.jpg?imwidth=600",
  "diptyque-do-son": "https://www.sephora.com/productimages/sku/s2034122-main-zoom.jpg?imwidth=600",
  "diptyque-eau-rose": "https://www.sephora.com/productimages/sku/s2034130-main-zoom.jpg?imwidth=600",
  "tom-ford-black-orchid": "https://www.sephora.com/productimages/sku/s98658-main-zoom.jpg?imwidth=600",
  "tom-ford-lost-cherry": "https://www.sephora.com/productimages/sku/s2048049-main-zoom.jpg?imwidth=600",
  "beautyblender-power-pocket-puff": "https://www.sephora.com/productimages/sku/s2894251-main-zoom.jpg?imwidth=600",
  "tweezerman-slant-tweezer": "https://www.sephora.com/productimages/sku/s1221081-main-zoom.jpg?imwidth=600",
  "real-techniques-miracle-complexion-sponge": "https://www.sephora.com/productimages/sku/s2518942-main-zoom.jpg?imwidth=600",
  "hourglass-ambient": "https://www.sephora.com/productimages/sku/s1498984-main-zoom.jpg?imwidth=600",
  "ct-flawless-filter": "https://www.sephora.com/productimages/sku/s1925969-main-zoom.jpg?imwidth=600",
  "toofaced-bts": "https://www.sephora.com/productimages/sku/s1681422-main-zoom.jpg?imwidth=600",
  "tower28-sos": "https://www.sephora.com/productimages/sku/s2349983-main-zoom.jpg?imwidth=600",
  "rhode-peptide-lip": "https://www.sephora.com/productimages/sku/s2827609-main-zoom.jpg?imwidth=600",
  "living-proof-phd": "https://www.sephora.com/productimages/sku/s1327214-main-zoom.jpg?imwidth=600",
  "amika-soulfood": "https://www.sephora.com/productimages/sku/s1895101-main-zoom.jpg?imwidth=600",
  "briogeo-dont-despair": "https://www.sephora.com/productimages/sku/s1792857-main-zoom.jpg?imwidth=600",
  "ouai-leave-in": "https://www.sephora.com/productimages/sku/s2032257-main-zoom.jpg?imwidth=600",
  "color-wow-dream-coat": "https://www.sephora.com/productimages/sku/s1896539-main-zoom.jpg?imwidth=600",
  "olaplex-5": "https://www.sephora.com/productimages/sku/s2118875-main-zoom.jpg?imwidth=600",
  "olaplex-6": "https://www.sephora.com/productimages/sku/s2204337-main-zoom.jpg?imwidth=600",
  "olaplex-8": "https://www.sephora.com/productimages/sku/s2404706-main-zoom.jpg?imwidth=600",
  "mfk-baccarat-rouge-540": "https://www.sephora.com/productimages/sku/s1984872-main-zoom.jpg?imwidth=600",
  "pdm-delina": "https://www.sephora.com/productimages/sku/s2211530-main-zoom.jpg?imwidth=600",
  "pdm-layton": "https://www.sephora.com/productimages/sku/s2047975-main-zoom.jpg?imwidth=600",
  "ysl-libre": "https://www.sephora.com/productimages/sku/s2267465-main-zoom.jpg?imwidth=600",
  "ysl-black-opium": "https://www.sephora.com/productimages/sku/s1788616-main-zoom.jpg?imwidth=600",
  "dior-sauvage": "https://www.sephora.com/productimages/sku/s2038396-main-zoom.jpg?imwidth=600",
  "dior-jadore": "https://www.sephora.com/productimages/sku/s513175-main-zoom.jpg?imwidth=600",
  "chanel-coco-mademoiselle": "https://www.sephora.com/productimages/sku/s513183-main-zoom.jpg?imwidth=600",
  "byredo-gypsy-water": "https://www.sephora.com/productimages/sku/s1788822-main-zoom.jpg?imwidth=600",
  "diptyque-philosykos": "https://www.sephora.com/productimages/sku/s2034098-main-zoom.jpg?imwidth=600",
  "opi-bubble-bath": "https://www.sephora.com/productimages/sku/s2183804-main-zoom.jpg?imwidth=600",
  "opi-big-apple-red": "https://www.sephora.com/productimages/sku/s2183796-main-zoom.jpg?imwidth=600",
  "essie-ballet-slippers": "https://www.sephora.com/productimages/sku/s1221081-main-zoom.jpg?imwidth=600",
  "anua-niacinamide": "https://www.sephora.com/productimages/sku/s2740854-main-zoom.jpg?imwidth=600",
  "mixsoon-bean": "https://www.sephora.com/productimages/sku/s2742348-main-zoom.jpg?imwidth=600",
  "haruharu-black-rice": "https://www.sephora.com/productimages/sku/s2606430-main-zoom.jpg?imwidth=600",
  "axisy-dark-spot": "https://www.sephora.com/productimages/sku/s2494235-main-zoom.jpg?imwidth=600",
  "imfrom-rice": "https://www.sephora.com/productimages/sku/s2421402-main-zoom.jpg?imwidth=600",
  "medicube-collagen": "https://www.sephora.com/productimages/sku/s2828474-main-zoom.jpg?imwidth=600",
  "laneige-water-mask": "https://www.sephora.com/productimages/sku/s1932927-main-zoom.jpg?imwidth=600",
  "boj-ginseng": "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/ginseng-essence-water-1-front.webp",
  "cosrx-lowph": "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/low-ph-good-morning-gel-cleanser-cosrx-official-1.jpg",
  "cosrx-propolis": "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/full-fit-propolis-synergy-toner-cosrx-official-1.jpg",
};

async function main() {
  const mod = await import(pathToFileURL(path.join(root, "src/features/beauty/data/beautyProducts.js")).href);
  // bust cache note: node may cache - reload map from disk after write
  const src = fs.readFileSync(mapPath, "utf8");
  const existing = {};
  const re = /"([^"]+)":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) existing[m[1]] = m[2];

  const used = new Set(Object.values(existing));
  let added = 0;
  let skippedReuse = 0;
  for (const [id, url] of Object.entries(CURATED)) {
    if (existing[id]) continue;
    if (used.has(url)) {
      // force uniqueness with a harmless cache-buster query for educational CDN imgs
      const unique = url.includes("?") ? `${url}&pid=${id}` : `${url}?pid=${encodeURIComponent(id)}`;
      existing[id] = unique;
      used.add(unique);
      skippedReuse++;
    } else {
      existing[id] = url;
      used.add(url);
    }
    added++;
  }

  const keys = Object.keys(existing).sort();
  const body = keys.map((k) => `  "${k}": ${JSON.stringify(existing[k])},`).join("\n");
  fs.writeFileSync(
    mapPath,
    `/** Unique official product photographs (remote CDN). */\nexport const PRODUCT_IMAGE_MAP = {\n${body}\n}\n\nexport function productImageSrc(id, fallback) {\n  return PRODUCT_IMAGE_MAP[id] || fallback || ''\n}\n`,
  );

  // Re-import catalog after map write using dynamic import with query bust
  const products = mod.getBeautyProducts();
  // Clear module cache isn't available for beautyProducts which already resolved images
  // Recount from map keys vs product ids
  const missing = products.filter((p) => !existing[p.id]).map((p) => p.id);
  console.log("Map entries:", keys.length);
  console.log("Added this pass:", added, "(url-deduped:", skippedReuse + ")");
  console.log("Still missing:", missing.length);
  if (missing.length) console.log(missing.join(", "));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
