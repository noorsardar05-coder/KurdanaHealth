import { defineProduct } from "./defineProduct.js";

const makeupProduct = ({
  id, brand, nameEn, nameKu, category = "makeup", tags = [], collections = [],
  descriptionEn, descriptionKu, forWhomEn, forWhomKu, ingredients, benefitsEn,
  benefitsKu, howToUseEn, howToUseKu, skinTypes = ["normal", "dry", "combination", "oily"],
  concernsEn = ["Complexion appearance"], concernsKu = ["دەرکەوتنی ڕووخسار"],
  textureEn, textureKu, size, originEn, originKu, avoidEn, avoidKu,
  pairsWith = [], similarAlternatives = [], dermNotesEn, dermNotesKu,
}) => defineProduct({
  id, brand, nameEn, nameKu, category,
  tags: ["makeup", ...tags],
  collections,
  descriptionEn,
  descriptionKu,
  forWhomEn,
  forWhomKu,
  ingredients,
  benefitsEn,
  benefitsKu,
  howToUseEn,
  howToUseKu,
  skinTypes,
  hairTypes: [],
  concernsEn,
  concernsKu,
  timeOfDayEn: "Any time; remove before sleep",
  timeOfDayKu: "هەر کاتێک؛ پێش خەوتن لایببە",
  textureEn,
  textureKu,
  size,
  originEn,
  originKu,
  avoidEn,
  avoidKu,
  pairsWith,
  similarAlternatives,
  dermNotesEn,
  dermNotesKu,
});

const product = (data) => {
  const type = data.type || "makeup product";
  const kuType = data.kuType || "بەرهەمی میکاپ";
  return makeupProduct({
    ...data,
    tags: data.tags || [type],
    descriptionEn: data.descriptionEn || `A well-known ${type} designed to create a considered, customizable makeup finish.`,
    descriptionKu: data.descriptionKu || `${data.nameKu} ${kuType}ێکی ناسراوە بۆ دروستکردنی کۆتایی میکاپێکی ڕێک و گونجاو.`,
    forWhomEn: data.forWhomEn || `People seeking a reliable ${type} for everyday or occasion makeup.`,
    forWhomKu: data.forWhomKu || `بۆ ئەو کەسانەی ${kuType}ێکی متمانەپێکراو بۆ میکاپی ڕۆژانە یان بۆنە دەوێن.`,
    ingredients: data.ingredients || ["Pigments", "Emollients", "Film Formers"],
    benefitsEn: data.benefitsEn || ["Buildable result", "Polished makeup finish"],
    benefitsKu: data.benefitsKu || ["ئەنجامی لایەبەندی", "کۆتایی میکاپی ڕێک"],
    howToUseEn: data.howToUseEn || "Apply a small amount, then build gradually and blend the edges.",
    howToUseKu: data.howToUseKu || "بڕێکەیەکی کەم بخە، پاشان بە هێواشی زیاد بکە و لێوارەکان تێکەڵ بکە.",
    textureEn: data.textureEn || "Smooth makeup formula",
    textureKu: data.textureKu || "فۆرمولای میکاپی نەرم",
    size: data.size || "Standard retail size",
    originEn: data.originEn || "United States",
    originKu: data.originKu || "ویلایەتە یەکگرتووەکانی ئەمریکا",
    avoidEn: data.avoidEn || "Do not use on broken skin or in the eyes; discontinue if irritation occurs.",
    avoidKu: data.avoidKu || "لەسەر پێستی بریندار یان ناو چاو بەکارمەهێنە؛ ئەگەر هەستیاری دروست بوو وازی لێبهێنە.",
    dermNotesEn: data.dermNotesEn || "Cosmetics do not treat skin disease. Remove thoroughly and patch test if your skin is reactive.",
    dermNotesKu: data.dermNotesKu || "میکاپ نەخۆشی پێست چارەسەر ناکات. بە تەواوی لایببە و ئەگەر پێستت کارلێکەرە تاقیکردنەوەی بچووک بکە.",
  });
};

export const MAKEUP_PRODUCTS = [
  product({ id: "rare-softpinch", brand: "Rare Beauty", nameEn: "Soft Pinch Liquid Blush", nameKu: "سۆفت پینچ لیکوید بلاش", type: "liquid blush", kuType: "بلوشی شلە", collections: ["celebrity-favorites", "tiktok-viral", "best-sellers"], ingredients: ["Pigments", "Silicones", "Emollients"], textureEn: "Highly pigmented liquid", textureKu: "شلەی زۆر ڕەنگدار", size: "7.5 ml", pairsWith: ["rare-positive-light"], similarAlternatives: ["nars-orgasm"] }),
  product({ id: "rare-mascara", brand: "Rare Beauty", nameEn: "Perfect Strokes Universal Volumizing Mascara", nameKu: "پێرفێکت سترۆکس یونیڤێرسەل ڤۆلومی زینگ ماسکارا", type: "volumizing mascara", kuType: "ماسکارای پڕکەرەوە", collections: ["celebrity-favorites", "best-sellers"], ingredients: ["Waxes", "Iron Oxides", "Film Formers"], textureEn: "Buildable creamy mascara", textureKu: "ماسکارای کرێمی لایەبەندی", size: "8 ml", pairsWith: ["ct-pillow"] }),
  product({ id: "rare-primer", brand: "Rare Beauty", nameEn: "Always an Optimist Pore Diffusing Primer", nameKu: "ئەلویز ئەن ئۆپتیمیست پۆر دیفیوزینگ پرایمەر", type: "blurring primer", kuType: "پرایمەری تارکەرەوەی کونی پێست", collections: ["clean-girl", "celebrity-favorites"], ingredients: ["Silica", "Dimethicone", "Glycerin"], textureEn: "Weightless gel", textureKu: "جێلی بێ بار", size: "28 ml", pairsWith: ["fenty-profilt"], similarAlternatives: ["benefit-porefessional"] }),
  product({ id: "rare-positive-light", brand: "Rare Beauty", nameEn: "Positive Light Liquid Luminizer", nameKu: "پۆزیتیڤ لایت لیکوید لومینایزەر", type: "liquid highlighter", kuType: "هایلایتەری شلە", collections: ["celebrity-favorites", "tiktok-viral"], ingredients: ["Mica", "Pigments", "Emollients"], textureEn: "Sheer luminous liquid", textureKu: "شلەی ڕووناکی شەفاف", size: "7.5 ml", pairsWith: ["rare-softpinch"] }),
  product({ id: "rare-lipoil", brand: "Rare Beauty", nameEn: "Soft Pinch Tinted Lip Oil", nameKu: "سۆفت پینچ تینتد لیپ ئۆیل", category: "lip-care", type: "tinted lip oil", kuType: "ڕۆنی لێوی ڕەنگدار", collections: ["clean-girl", "tiktok-viral", "best-sellers"], ingredients: ["Jojoba Seed Oil", "Sunflower Seed Oil", "Pigments"], textureEn: "Glossy gel-oil", textureKu: "جێل-ڕۆنی بریقەدار", size: "3 ml", pairsWith: ["ct-pillow"] }),
  product({ id: "rare-lip-souffle", brand: "Rare Beauty", nameEn: "Lip Soufflé Matte Lip Cream", nameKu: "لیپ سوفلە مات لیپ کرێم", type: "matte lip cream", kuType: "کرێمی لێوی مات", collections: ["celebrity-favorites"], ingredients: ["Silicones", "Pigments", "Emollients"], textureEn: "Whipped matte cream", textureKu: "کرێمی ماتی فۆمکراو", size: "4 ml", pairsWith: ["rare-softpinch"] }),

  product({ id: "ct-pillow", brand: "Charlotte Tilbury", nameEn: "Pillow Talk Lipstick", nameKu: "پیلو تاک لیپستیک", type: "matte lipstick", kuType: "لیپستیکی مات", collections: ["celebrity-favorites", "best-sellers", "award-winners"], ingredients: ["Pigments", "Waxes", "Emollients"], textureEn: "Comfortable matte cream", textureKu: "کرێمی ماتی ئارام", size: "3.5 g", originEn: "United Kingdom", originKu: "بەریتانیا", pairsWith: ["ct-lipcheat"] }),
  product({ id: "ct-hairbrush", brand: "Charlotte Tilbury", nameEn: "Airbrush Flawless Finish Powder", nameKu: "ئیربرش فلاولێس فینیش پاودەر", type: "finishing powder", kuType: "پاودەری کۆتایی", collections: ["best-sellers", "award-winners", "quiet-luxury"], ingredients: ["Mica", "Silica", "Pigments"], textureEn: "Finely milled pressed powder", textureKu: "پاودەری پەستاندراوی ورد", size: "8 g", originEn: "United Kingdom", originKu: "بەریتانیا", pairsWith: ["ct-hollywood-filter"] }),
  product({ id: "ct-hollywoodwand", brand: "Charlotte Tilbury", nameEn: "Beauty Light Wand", nameKu: "بیوتی لایت واند", type: "liquid highlighter", kuType: "هایلایتەری شلە", collections: ["tiktok-viral", "celebrity-favorites", "best-sellers"], ingredients: ["Mica", "Silicones", "Pigments"], textureEn: "Creamy luminous liquid", textureKu: "شلەی کرێمی ڕووناک", size: "12 ml", originEn: "United Kingdom", originKu: "بەریتانیا" }),
  product({ id: "ct-hollywood-filter", brand: "Charlotte Tilbury", nameEn: "Hollywood Flawless Filter", nameKu: "هۆلیوود فلاولێس فیلتەر", type: "complexion booster", kuType: "بۆستەری ڕووخسار", collections: ["tiktok-viral", "celebrity-favorites", "best-sellers"], ingredients: ["Mica", "Glycerin", "Pigments"], textureEn: "Sheer illuminating fluid", textureKu: "فلۆیدی ڕووناکی شەفاف", size: "30 ml", originEn: "United Kingdom", originKu: "بەریتانیا", pairsWith: ["ct-hairbrush"] }),
  product({ id: "ct-lipcheat", brand: "Charlotte Tilbury", nameEn: "Lip Cheat Lip Liner", nameKu: "لیپ چیت لیپ لاینەر", type: "lip liner", kuType: "لاینەری لێو", collections: ["celebrity-favorites", "best-sellers"], ingredients: ["Waxes", "Pigments", "Silica"], textureEn: "Creamy pencil", textureKu: "پێنووسی کرێمی", size: "1.2 g", originEn: "United Kingdom", originKu: "بەریتانیا", pairsWith: ["ct-pillow"] }),
  product({ id: "ct-airbrush-setting", brand: "Charlotte Tilbury", nameEn: "Airbrush Flawless Setting Spray", nameKu: "ئیربرش فلاولێس سێتینگ سپرەی", type: "makeup setting spray", kuType: "سپرەی جێگیرکەری میکاپ", collections: ["best-sellers", "award-winners"], ingredients: ["Film Formers", "Aloe Vera", "Glycerin"], textureEn: "Fine setting mist", textureKu: "میشتی جێگیرکەری ناسک", size: "100 ml", originEn: "United Kingdom", originKu: "بەریتانیا" }),

  product({ id: "huda-easybake", brand: "Huda Beauty", nameEn: "Easy Bake Loose Baking & Setting Powder", nameKu: "ئیزی بێک لوس بێکینگ و سێتینگ پاودەر", type: "loose setting powder", kuType: "پاودەری شلی جێگیرکەر", collections: ["tiktok-viral", "best-sellers", "award-winners"], ingredients: ["Silica", "Mica", "Pigments"], textureEn: "Finely milled loose powder", textureKu: "پاودەری شلی ورد", size: "20 g", originEn: "United Arab Emirates", originKu: "ئیماراتی عەرەبی یەکگرتوو" }),
  product({ id: "huda-obsessions", brand: "Huda Beauty", nameEn: "Nude Obsessions Eyeshadow Palette", nameKu: "نود ئۆبسێشنز ئایشەدۆ پەلێت", type: "eyeshadow palette", kuType: "پالێتی سێبەری چاو", collections: ["best-sellers", "tiktok-viral"], ingredients: ["Mica", "Talc", "Pigments"], textureEn: "Powder shadow palette", textureKu: "پالێتی سێبەری پاودەری", size: "9 x 1.1 g", originEn: "United Arab Emirates", originKu: "ئیماراتی عەرەبی یەکگرتوو" }),
  product({ id: "huda-fauxfilter", brand: "Huda Beauty", nameEn: "#FauxFilter Luminous Matte Foundation", nameKu: "فاووفیلتەر لومینۆس مات فاندەیشن", type: "full-coverage foundation", kuType: "فاندەیشنی کاڤەری تەواو", collections: ["best-sellers", "tiktok-viral"], ingredients: ["Pigments", "Silicones", "Film Formers"], textureEn: "Creamy liquid foundation", textureKu: "فاندەیشنی شلەی کرێمی", size: "35 ml", originEn: "United Arab Emirates", originKu: "ئیماراتی عەرەبی یەکگرتوو", pairsWith: ["huda-easybake"] }),
  product({ id: "huda-lipcontour", brand: "Huda Beauty", nameEn: "Lip Contour 2.0", nameKu: "لیپ کۆنتۆر ٢.٠", type: "lip liner", kuType: "لاینەری لێو", collections: ["best-sellers"], ingredients: ["Waxes", "Pigments", "Emollients"], textureEn: "Creamy retractable pencil", textureKu: "پێنووسی کرێمی گەڕاوە", size: "0.5 g", originEn: "United Arab Emirates", originKu: "ئیماراتی عەرەبی یەکگرتوو" }),
  product({ id: "huda-empowered", brand: "Huda Beauty", nameEn: "Empowered Eyeshadow Palette", nameKu: "ئەمپاورد ئایشەدۆ پەلێت", type: "eyeshadow palette", kuType: "پالێتی سێبەری چاو", collections: ["celebrity-favorites"], ingredients: ["Mica", "Pigments", "Emollients"], textureEn: "Matte and shimmer powders", textureKu: "پاودەری مات و بریقەدار", size: "16 x 0.7 g", originEn: "United Arab Emirates", originKu: "ئیماراتی عەرەبی یەکگرتوو" }),

  product({ id: "fenty-profilt", brand: "Fenty Beauty", nameEn: "Pro Filt'r Soft Matte Longwear Foundation", nameKu: "پرۆ فیلتر سۆفت مات لانگوێر فاندەیشن", type: "long-wear foundation", kuType: "فاندەیشنی درێژخایەن", collections: ["celebrity-favorites", "best-sellers", "award-winners"], ingredients: ["Pigments", "Silicones", "Oil-absorbing Powders"], textureEn: "Soft-matte liquid", textureKu: "شلەی نەرم-مات", size: "32 ml", pairsWith: ["fenty-profilt-primer"] }),
  product({ id: "fenty-gloss", brand: "Fenty Beauty", nameEn: "Gloss Bomb Universal Lip Luminizer", nameKu: "گلۆس بۆم یونیڤێرسەل لیپ لومینایزەر", type: "lip gloss", kuType: "گلۆسی لێو", collections: ["celebrity-favorites", "tiktok-viral", "best-sellers"], ingredients: ["Shea Butter", "Emollients", "Pearl Pigments"], textureEn: "Cushiony glossy cream", textureKu: "کرێمی بریقەداری پڕ", size: "9 ml", pairsWith: ["fenty-match"] }),
  product({ id: "fenty-match", brand: "Fenty Beauty", nameEn: "Match Stix Contour Skinstick", nameKu: "ماتچ ستیکس کۆنتۆر سکینستیک", type: "cream contour stick", kuType: "ستیکی کۆنتۆری کرێمی", collections: ["celebrity-favorites", "best-sellers"], ingredients: ["Waxes", "Pigments", "Silicones"], textureEn: "Matte cream stick", textureKu: "ستیکی کرێمی مات", size: "7.1 g", pairsWith: ["fenty-profilt"] }),
  product({ id: "fenty-killawatt", brand: "Fenty Beauty", nameEn: "Killawatt Freestyle Highlighter", nameKu: "کیلەوات فریستایل هایلایتەر", type: "powder highlighter", kuType: "هایلایتەری پاودەری", collections: ["best-sellers", "award-winners"], ingredients: ["Mica", "Pigments", "Dimethicone"], textureEn: "Cream-to-powder sheen", textureKu: "بریقەی کرێم بۆ پاودەر", size: "7 g", pairsWith: ["fenty-match"] }),
  product({ id: "fenty-eazedrop", brand: "Fenty Beauty", nameEn: "Eaze Drop Blurring Skin Tint", nameKu: "ئیز درۆپ بلەرینگ سکین تینت", type: "skin tint", kuType: "تینتی پێست", collections: ["clean-girl", "tiktok-viral", "best-sellers"], ingredients: ["Pigments", "Silicones", "Humectants"], textureEn: "Lightweight blurring fluid", textureKu: "فلۆیدی سووکی تارکەرەوە", size: "32 ml", pairsWith: ["fenty-profilt-primer"] }),
  product({ id: "fenty-profilt-primer", brand: "Fenty Beauty", nameEn: "Pro Filt'r Instant Retouch Primer", nameKu: "پرۆ فیلتر ئینستەنت ریتاچ پرایمەر", type: "mattifying primer", kuType: "پرایمەری ماتکەرەوە", collections: ["best-sellers"], ingredients: ["Silicones", "Silica", "Glycerin"], textureEn: "Soft-matte cream", textureKu: "کرێمی نەرم-مات", size: "32 ml", pairsWith: ["fenty-profilt"] }),

  product({ id: "nars-orgasm", brand: "NARS", nameEn: "Blush in Orgasm", nameKu: "بلوشی ئۆرگازم", type: "powder blush", kuType: "بلوشی پاودەری", collections: ["best-sellers", "award-winners", "celebrity-favorites"], ingredients: ["Mica", "Pigments", "Dimethicone"], textureEn: "Silky shimmer powder", textureKu: "پاودەری ئاوریشمی بریقەدار", size: "4.8 g", originEn: "United States", originKu: "ویلایەتە یەکگرتووەکانی ئەمریکا" }),
  product({ id: "nars-radiant", brand: "NARS", nameEn: "Radiant Creamy Concealer", nameKu: "ڕادیەنت کریمی کۆنسێلەر", type: "cream concealer", kuType: "کۆنسێلەری کرێمی", collections: ["best-sellers", "award-winners"], ingredients: ["Pigments", "Emollients", "Silicones"], textureEn: "Medium-coverage creamy liquid", textureKu: "شلەی کرێمی کاڤەری ناوەند", size: "6 ml", pairsWith: ["nars-light-reflecting"] }),
  product({ id: "nars-laguna", brand: "NARS", nameEn: "Laguna Bronzing Powder", nameKu: "لاگونا برۆنزینگ پاودەر", type: "bronzing powder", kuType: "پاودەری برۆنزینگە", collections: ["best-sellers", "award-winners"], ingredients: ["Mica", "Pigments", "Silica"], textureEn: "Silky pressed powder", textureKu: "پاودەری پەستاندراوی ئاوریشمی", size: "11 g", pairsWith: ["nars-orgasm"] }),
  product({ id: "nars-soft-matte", brand: "NARS", nameEn: "Soft Matte Complete Concealer", nameKu: "سۆفت مات کۆمپلیت کۆنسێلەر", type: "pot concealer", kuType: "کۆنسێلەری ناو قاپ", collections: ["best-sellers", "award-winners"], ingredients: ["Pigments", "Silicones", "Peptides"], textureEn: "Soft matte cream", textureKu: "کرێمی نەرم-مات", size: "6.2 g", pairsWith: ["nars-radiant"] }),
  product({ id: "nars-light-reflecting", brand: "NARS", nameEn: "Light Reflecting Foundation", nameKu: "لایت ڕیفلێکتینگ فاندەیشن", type: "radiant foundation", kuType: "فاندەیشنی ڕووناک", collections: ["best-sellers", "quiet-luxury"], ingredients: ["Pigments", "Photochromic Pigments", "Glycerin"], textureEn: "Medium-coverage liquid", textureKu: "شلەی کاڤەری ناوەند", size: "30 ml", pairsWith: ["nars-radiant"] }),

  product({ id: "mac-ruby", brand: "MAC", nameEn: "Retro Matte Lipstick in Ruby Woo", nameKu: "ڕێترۆ مات لیپستیکی ڕوبی وو", type: "retro matte lipstick", kuType: "لیپستیکی ڕێترۆ مات", collections: ["best-sellers", "award-winners", "celebrity-favorites"], ingredients: ["Pigments", "Waxes", "Silica"], textureEn: "Intense matte bullet", textureKu: "لیپستیکی ماتی تۆخ", size: "3 g", pairsWith: ["mac-lipglass"] }),
  product({ id: "mac-fix", brand: "MAC", nameEn: "Studio Fix Fluid SPF 15 Foundation", nameKu: "ستودیۆ فیکس فلوید SPF ١٥ فاندەیشن", type: "matte foundation", kuType: "فاندەیشنی مات", collections: ["best-sellers", "award-winners"], ingredients: ["Pigments", "Silicones", "Titanium Dioxide"], textureEn: "Buildable liquid foundation", textureKu: "فاندەیشنی شلەی لایەبەندی", size: "30 ml", pairsWith: ["mac-fix-fix"] }),
  product({ id: "mac-fix-fix", brand: "MAC", nameEn: "Prep + Prime Fix+", nameKu: "پرێپ + پرایم فیکس+", type: "hydrating setting mist", kuType: "میشتی ئاوپێدەر و جێگیرکەر", collections: ["best-sellers", "award-winners"], ingredients: ["Water", "Glycerin", "Chamomile Extract"], textureEn: "Fine refreshing mist", textureKu: "میشتی تازەکەرەوەی ناسک", size: "100 ml", pairsWith: ["mac-fix"] }),
  product({ id: "mac-lipglass", brand: "MAC", nameEn: "Lipglass Clear", nameKu: "لیپگلاس کلیر", type: "clear lip gloss", kuType: "گلۆسی لێوی ڕوون", collections: ["best-sellers", "celebrity-favorites"], ingredients: ["Emollients", "Polybutene", "Vitamin E"], textureEn: "High-shine sticky gloss", textureKu: "گلۆسی بریقەداری پێوەبوو", size: "15 ml", pairsWith: ["mac-ruby"] }),
  product({ id: "mac-stack", brand: "MAC", nameEn: "MACStack Mascara", nameKu: "میکستاک ماسکارا", type: "buildable mascara", kuType: "ماسکارای لایەبەندی", collections: ["best-sellers"], ingredients: ["Waxes", "Film Formers", "Iron Oxides"], textureEn: "Layerable mascara", textureKu: "ماسکارای لایەبەندی", size: "12 ml" }),

  product({ id: "ysl-rouge-volupte", brand: "YSL Beauty", nameEn: "Rouge Volupté Shine Lipstick", nameKu: "ڕوژ ڤۆلوپتە شاین لیپستیک", type: "shine lipstick", kuType: "لیپستیکی بریقەدار", collections: ["quiet-luxury", "best-sellers"], ingredients: ["Macadamia Oil", "Waxes", "Pigments"], textureEn: "Melting glossy balm", textureKu: "باڵمی بریقەداری دادەتوێتەوە", size: "3.2 g", originEn: "France", originKu: "فەڕەنسا" }),
  product({ id: "ysl-touche-eclat", brand: "YSL Beauty", nameEn: "Touche Éclat All-Over Brightening Pen", nameKu: "تووش ئێکلا ئال-ئۆڤەر برایتنینگ پێن", type: "brightening pen", kuType: "پێنووسی ڕووناککەرەوە", collections: ["quiet-luxury", "award-winners"], ingredients: ["Pigments", "Glycerin", "Light-reflecting Particles"], textureEn: "Sheer illuminating fluid", textureKu: "فلۆیدی ڕووناکی شەفاف", size: "2.5 ml", originEn: "France", originKu: "فەڕەنسا" }),
  product({ id: "ysl-all-hours", brand: "YSL Beauty", nameEn: "All Hours Foundation", nameKu: "ئۆل هاوەرز فاندەیشن", type: "long-wear foundation", kuType: "فاندەیشنی درێژخایەن", collections: ["quiet-luxury", "best-sellers"], ingredients: ["Pigments", "Silicones", "Hyaluronic Acid"], textureEn: "Soft-matte liquid", textureKu: "شلەی نەرم-مات", size: "25 ml", originEn: "France", originKu: "فەڕەنسا" }),

  product({ id: "hourglass-ambient", brand: "Hourglass", nameEn: "Ambient Lighting Powder", nameKu: "ئەمبیەنت لایتینگ پاودەر", type: "finishing powder", kuType: "پاودەری کۆتایی", collections: ["quiet-luxury", "award-winners", "best-sellers"], ingredients: ["Mica", "Photoluminescent Technology", "Pigments"], textureEn: "Soft-focus pressed powder", textureKu: "پاودەری پەستاندراوی نەرم-فۆکس", size: "10 g" }),
  product({ id: "hourglass-veil", brand: "Hourglass", nameEn: "Veil Translucent Setting Powder", nameKu: "ڤێل ترانسلووسەنت سێتینگ پاودەر", type: "translucent setting powder", kuType: "پاودەری شەفافی جێگیرکەر", collections: ["quiet-luxury", "best-sellers"], ingredients: ["Mica", "Silica", "Diamond Powder"], textureEn: "Ultra-fine loose powder", textureKu: "پاودەری شلی زۆر ورد", size: "10.5 g" }),
  product({ id: "hourglass-phantom", brand: "Hourglass", nameEn: "Phantom Volumizing Glossy Balm", nameKu: "فانتۆم ڤۆلومی زینگ گلۆسی باڵم", category: "lip-care", type: "glossy lip balm", kuType: "باڵمی لێوی بریقەدار", collections: ["quiet-luxury", "tiktok-viral"], ingredients: ["Emollients", "Shea Butter", "Pigments"], textureEn: "Cushiony glossy balm", textureKu: "باڵمی بریقەداری پڕ", size: "1.7 g" }),

  product({ id: "mario-softsculpt-enhancer", brand: "Makeup by Mario", nameEn: "SoftSculpt Transforming Skin Enhancer", nameKu: "سۆفتسکۆڵپت ترانسفۆرمینگ سکین ئینهانسەر", type: "cream bronzer", kuType: "برۆنزەری کرێمی", collections: ["celebrity-favorites", "tiktok-viral", "best-sellers"], ingredients: ["Emollients", "Pigments", "Silica"], textureEn: "Sheer balm-to-powder cream", textureKu: "کرێمی شەفاف باڵم بۆ پاودەر", size: "12 g" }),
  product({ id: "mario-surrealskin", brand: "Makeup by Mario", nameEn: "SurrealSkin Awakening Concealer", nameKu: "سوریال سکین ئەوەیکەنینگ کۆنسێلەر", type: "serum concealer", kuType: "کۆنسێلەری سیرۆمی", collections: ["celebrity-favorites", "best-sellers"], ingredients: ["Pigments", "Glycerin", "Hyaluronic Acid"], textureEn: "Hydrating liquid concealer", textureKu: "کۆنسێلەری شلەی ئاوپێدەر", size: "5 ml" }),

  product({ id: "toofaced-better-than-sex", brand: "Too Faced", nameEn: "Better Than Sex Mascara", nameKu: "بێتەر دان سێکس ماسکارا", type: "volumizing mascara", kuType: "ماسکارای پڕکەرەوە", collections: ["best-sellers", "award-winners", "tiktok-viral"], ingredients: ["Waxes", "Film Formers", "Iron Oxides"], textureEn: "Thick volumizing mascara", textureKu: "ماسکارای قەڵەوی پڕکەرەوە", size: "8 ml" }),
  product({ id: "toofaced-born-this-way", brand: "Too Faced", nameEn: "Born This Way Foundation", nameKu: "بۆرن دیس وەی فاندەیشن", type: "natural-finish foundation", kuType: "فاندەیشنی کۆتایی سروشتی", collections: ["best-sellers"], ingredients: ["Pigments", "Hyaluronic Acid", "Coconut Water"], textureEn: "Medium-coverage liquid", textureKu: "شلەی کاڤەری ناوەند", size: "30 ml" }),

  product({ id: "benefit-porefessional", brand: "Benefit", nameEn: "The POREfessional Pore Minimizing Primer", nameKu: "دە پۆرفێشنال پۆر مینیمایزینگ پرایمەر", type: "pore-blurring primer", kuType: "پرایمەری تارکەرەوەی کونی پێست", collections: ["best-sellers", "award-winners"], ingredients: ["Silicones", "Silica", "Vitamin E"], textureEn: "Silky balm-gel", textureKu: "باڵم-جێلی ئاوریشمی", size: "22 ml", pairsWith: ["fenty-profilt"] }),
  product({ id: "benefit-hoola", brand: "Benefit", nameEn: "Hoola Matte Bronzer", nameKu: "هولا مات برۆنزەر", type: "matte bronzer", kuType: "برۆنزەری مات", collections: ["best-sellers", "award-winners"], ingredients: ["Mica", "Pigments", "Talc"], textureEn: "Soft pressed powder", textureKu: "پاودەری پەستاندراوی نەرم", size: "8 g" }),
  product({ id: "benefit-benetiint", brand: "Benefit", nameEn: "Benetint Cheek & Lip Stain", nameKu: "بێنتینت چیک و لیپ ستەین", category: "lip-care", type: "cheek and lip tint", kuType: "تینتی ڕوو و لێو", collections: ["tiktok-viral", "best-sellers"], ingredients: ["Water", "Colorants", "Glycerin"], textureEn: "Watery stain", textureKu: "ستەینی ئاویی", size: "6 ml" }),

  product({ id: "milk-hydro-grip", brand: "Milk Makeup", nameEn: "Hydro Grip Primer", nameKu: "هایدرۆ گریپ پرایمەر", type: "gripping primer", kuType: "پرایمەری گیراندن", collections: ["tiktok-viral", "best-sellers"], ingredients: ["Hemp-derived Cannabis Seed Extract", "Blue Agave Extract", "Niacinamide"], textureEn: "Tacky hydrating gel", textureKu: "جێلی ئاوپێدەر و گیراندن", size: "45 ml", pairsWith: ["fenty-eazedrop"] }),
  product({ id: "milk-lip-cheek", brand: "Milk Makeup", nameEn: "Lip + Cheek Cream Blush Stick", nameKu: "لیپ + چیک کرێم بلاش ستیک", type: "cream blush stick", kuType: "ستیکی بلوشی کرێمی", collections: ["clean-girl", "tiktok-viral"], ingredients: ["Mango Butter", "Avocado Oil", "Pigments"], textureEn: "Blendable cream stick", textureKu: "ستیکی کرێمی تێکەڵبوو", size: "6 g" }),

  product({ id: "tower28-sos-spray", brand: "Tower 28", nameEn: "SOS Daily Rescue Facial Spray", nameKu: "ئێس ئۆ ئێس دێیلی ڕێسکیو فەیشیاڵ سپرەی", type: "hypochlorous facial mist", kuType: "میشتی ڕوو بە هایپۆکلۆرۆس", collections: ["clean-girl", "sensitive-skin", "best-sellers"], ingredients: ["Hypochlorous Acid", "Water", "Sodium Chloride"], textureEn: "Water-light mist", textureKu: "میشتی سووک وەک ئاو", size: "120 ml", concernsEn: ["Visible redness", "Skin discomfort"], concernsKu: ["سووری دەرکەوتوو", "نائارامی پێست"], dermNotesEn: "Hypochlorous-acid mists may suit sensitive routines, but are not a substitute for medical care.", dermNotesKu: "میشتەکانی هایپۆکلۆرۆس ئەسید لە ڕوتینی پێستی هەستیاردا دەگونجێن، بەڵام جێگرەوەی چاودێری پزیشکی نین." }),
  product({ id: "tower28-shineon", brand: "Tower 28", nameEn: "ShineOn Lip Jelly", nameKu: "شاینئۆن لیپ جێلی", category: "lip-care", type: "lip gloss", kuType: "گلۆسی لێو", collections: ["clean-girl", "tiktok-viral", "best-sellers"], ingredients: ["Apricot Kernel Oil", "Raspberry Seed Oil", "Pigments"], textureEn: "Non-sticky jelly gloss", textureKu: "گلۆسی جێلی بێ پێوەبوون", size: "3.9 ml" }),

  product({ id: "elf-halo-glow", brand: "e.l.f. Cosmetics", nameEn: "Halo Glow Liquid Filter", nameKu: "هەیلۆ گلۆ لیکوید فیلتەر", type: "complexion booster", kuType: "بۆستەری ڕووخسار", collections: ["tiktok-viral", "best-sellers", "under-20"], ingredients: ["Squalane", "Hyaluronic Acid", "Pigments"], textureEn: "Sheer radiant liquid", textureKu: "شلەی ڕووناکی شەفاف", size: "31.5 ml", pairsWith: ["elf-camo-concealer"] }),
  product({ id: "elf-camo-concealer", brand: "e.l.f. Cosmetics", nameEn: "Hydrating Camo Concealer", nameKu: "هایدرەیتینگ کامۆ کۆنسێلەر", type: "full-coverage concealer", kuType: "کۆنسێلەری کاڤەری تەواو", collections: ["best-sellers", "under-20"], ingredients: ["Pigments", "Sodium Hyaluronate", "Rose Flower Water"], textureEn: "Hydrating creamy liquid", textureKu: "شلەی کرێمی ئاوپێدەر", size: "6 ml", pairsWith: ["elf-halo-glow"] }),
  product({ id: "elf-power-grip", brand: "e.l.f. Cosmetics", nameEn: "Power Grip Primer", nameKu: "پاوەر گریپ پرایمەر", type: "gripping primer", kuType: "پرایمەری گیراندن", collections: ["tiktok-viral", "best-sellers", "under-20"], ingredients: ["Niacinamide", "Glycerin", "Water"], textureEn: "Sticky gel primer", textureKu: "پرایمەری جێلی گیراندن", size: "24 ml", pairsWith: ["elf-halo-glow"] }),

  product({ id: "rhode-peptide-lip-tint", brand: "Rhode", nameEn: "Peptide Lip Tint", nameKu: "پێپتاید لیپ تینت", category: "lip-care", type: "tinted peptide lip treatment", kuType: "چاودێری پێپتایدی لێوی ڕەنگدار", collections: ["clean-girl", "celebrity-favorites", "tiktok-viral"], ingredients: ["Peptides", "Shea Butter", "Babassu Oil"], textureEn: "Cushiony tinted balm", textureKu: "باڵمی ڕەنگداری پڕ", size: "10 ml" }),
  product({ id: "rhode-pocket-blush", brand: "Rhode", nameEn: "Pocket Blush", nameKu: "پاکێت بلاش", type: "cream blush", kuType: "بلوشی کرێمی", collections: ["clean-girl", "celebrity-favorites", "tiktok-viral"], ingredients: ["Emollients", "Waxes", "Pigments"], textureEn: "Dewy cream balm", textureKu: "باڵمی کرێمی شێدار", size: "5.3 g", pairsWith: ["rhode-peptide-lip-tint"] }),
];
