/** Editorial beauty magazine — cards open into full article pages. Educational only. */

function img(id, w = 1200) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
}

const E = {
  makeup: img("1522335789203-aabd1fc54bc9"),
  makeup2: img("1512496015851-a90fb38ba796"),
  hair: img("1527799806301-45557f6c30e9"),
  skin: img("1570172619642-dfd955f59757"),
  skin2: img("1556228720-195a672e8a03"),
  kbeauty: img("1596755389378-c31d21fd14bd"),
  french: img("1612817286624-256ec988f846"),
  luxury: img("1487412940907-3f0a5b2a7ea8"),
  tips: img("1570194065650-d99fb26b27dc"),
  trends: img("1515377905703-c4788e51af15"),
  ingredients: img("1620916568636-48a477a4a4ed"),
  perfume: img("1541643600914-78b084683601"),
  nails: img("1515377905703-c4788e51af15"),
  self: img("1540553016722-7a2ab1b53319"),
  lips: img("1586495777748-ca884908055c"),
};

export const DISCOVER_CATEGORIES = [
  { id: "all", labelKey: "topicAll" },
  { id: "makeup", labelKey: "topicMakeup" },
  { id: "haircare", labelKey: "topicHair" },
  { id: "skincare", labelKey: "topicSkincare" },
  { id: "korean-beauty", labelKey: "topicKorean" },
  { id: "french-pharmacy", labelKey: "topicFrench" },
  { id: "luxury", labelKey: "topicLuxury" },
  { id: "tips", labelKey: "topicTips" },
  { id: "trends", labelKey: "topicTrends" },
  { id: "ingredients", labelKey: "topicIngredients" },
  { id: "perfume", labelKey: "topicPerfume" },
  { id: "nails", labelKey: "topicNails" },
  { id: "self-care", labelKey: "topicSelfCare" },
];

export const DISCOVER_ARTICLES = [
  {
    id: "soft-blush",
    topic: "makeup",
    title: {
      en: "The modern blush: soft color, real skin",
      ku: "سوورکەرەوەی مۆدێرن: ڕەنگی نەرم، پێستی ڕاستەقینە",
    },
    excerpt: {
      en: "How liquid and cream blush create a lit-from-within flush without heavy powder.",
      ku: "چۆن سوورکەرەوەی شل و کرێمی سوورێکی سروشتی دروست دەکەن.",
    },
    image: E.makeup,
    imageCredit: "Unsplash",
    readMin: 5,
    body: {
      en: [
        "Editorial makeup today is less about masking and more about light. A single well-placed blush can do what a full contour once claimed to do — bring life back to the center of the face.",
        "Liquid and cream formulas melt into skin, especially over moisturized, lightly primed bases. Start with less than you think: one tiny dot on each cheek, blended upward toward the temples.",
        "If you love powder, treat it as a second veil — never the only story. The goal is a flush that looks like you stepped out of soft daylight, not a shop window.",
      ],
      ku: [
        "مەیکی ئەمڕۆ زیاتر دەربارەی ڕووناکییە نەک داپۆشین. سوورکەرەوەیەکی باش دەتوانێت گیان بگەڕێنێتەوە بۆ ناوەڕاستی دەموچاو.",
        "فۆرمۆلای شل و کرێمی لەناو پێستدا دەتوێنەوە. بە کەم دەست پێبکە: خاڵێکی بچووک لە هەر ڕوومەتێک و تێکەڵکردن بەرەو سەرەوە.",
        "ئەگەر پاوودەر خۆش دەوێت، وەک چینێکی دووەم بەکاریبهێنە. ئامانج ئەوەیە کە سوورەکە وەک ڕووناکی سروشتی دەربکەوێت.",
      ],
    },
  },
  {
    id: "foundation-ethic",
    topic: "makeup",
    title: {
      en: "Foundation as a veil, not a mask",
      ku: "فاوندەیشن وەک پەردەیەک، نەک ماسک",
    },
    excerpt: {
      en: "A guide to sheer coverage, shade matching, and skin that still looks like skin.",
      ku: "ڕێنمایی بۆ کڤەریجێکی نەرم و پێستێک کە هێشتا وەک پێست دەردەکەوێت.",
    },
    image: E.makeup2,
    imageCredit: "Unsplash",
    readMin: 6,
    body: {
      en: [
        "Luxury makeup houses and clean-girl culture share one quiet rule: skin should remain present. Coverage is a choice, not a default.",
        "Match shade in natural light along the jaw. Prefers dry skin a hydrating serum base; oily skin a soft-matte primer only where needed.",
        "Build from the center outward. Wherever you feel tempted to cover completely, pause — often a concealer spot + blended foundation edge looks more expensive than opacity.",
      ],
      ku: [
        "یاسایەکی بێدەنگ: پێست دەبێت ئامادە بمێنێت. کڤەریج هەڵبژاردنە، نەک بنەما.",
        "لە ژێر ڕووناکی سروشتیدا شەید لەگەڵ چەناگە بگونجێنە.",
        "لە ناوەڕاستەوە بنیات بنێ. زۆرجار کۆنسیلەری خاڵی + لێواری نەرم گرانبەهاتر دەردەکەوێت لە داپۆشینی تەواو.",
      ],
    },
  },
  {
    id: "scalp-is-skin",
    topic: "haircare",
    title: {
      en: "Scalp care is skin care",
      ku: "چاودێری سەرپێست وەک چاودێری پێست",
    },
    excerpt: {
      en: "Why bond builders, gentle cleansers, and massage belong in a serious hair library.",
      ku: "بۆچی پاککەرەوەی نەرم و ماساژ لە کتێبخانەی قژدان.",
    },
    image: E.hair,
    imageCredit: "Unsplash",
    readMin: 5,
    body: {
      en: [
        "Hair culture has moved beyond fragrance and shine alone. Houses like Kérastase, Olaplex, K18, and Redken treat the fiber and scalp as systems — educational tools for understanding damage and recovery.",
        "Clarify when product builds up; nourish lengths; repair bonds on a schedule, not impulsively every wash.",
        "Massage with fingertips, not nails. Warm water first, cool rinse last. The scalp that feels calm usually shows healthier-looking lengths.",
      ],
      ku: [
        "کلتووری قژ تەنها بۆن و درەوشانەوە نییە. براندە گەورەکان فایبەر و سەرپێست وەک سیستەم دەبینن.",
        "کاتێک بەرهەم کۆدەبێتەوە پاک بکەرەوە؛ درێژییەکان خۆراک بدە؛ چاککردنەوە بە خشتە، نەک هەموو شوشتنێک.",
        "بە سەری پەنجە ماساژ بکە. سەرپێستی ئارام زۆرجار قژی تەندروستتر نیشان دەدات.",
      ],
    },
  },
  {
    id: "spf-editorial",
    topic: "skincare",
    title: {
      en: "Why sunscreen is the quiet luxury",
      ku: "بۆچی کرێمی خۆر لوکسێکی بێدەنگە",
    },
    excerpt: {
      en: "French pharmacy fluids and Korean sun serums — a cultured approach to daily UV.",
      ku: "فلویدی دەرمانخانەی فەڕەنسی و سێرەمی خۆری کۆری.",
    },
    image: E.skin2,
    imageCredit: "Unsplash",
    readMin: 5,
    body: {
      en: [
        "In every serious beauty encyclopedia, sunscreen sits above trend. La Roche-Posay Anthelios, Avène fluids, Beauty of Joseon Relief Sun — different textures, same role.",
        "Apply as the last skincare step. Reapply outdoors. Makeup can sit on top of modern filters when textures are chosen with care.",
        "There is no glow ritual without UV awareness. Educational beauty puts protection before highlighter.",
      ],
      ku: [
        "لە هەموو ئینسایکڵۆپیدیایەکی جدی جوانیدا، کرێمی خۆر لەسەر ترێند دەمێنێتەوە.",
        "وەک دوا هەنگاوی چاودێری جێبەجێی بکە. لە دەرەوە دووبارە بکەرەوە.",
        "بەبێ پاراستنی UV ڕێوڕەسمی درەوشانەوە نییە.",
      ],
    },
  },
  {
    id: "layer-like-korea",
    topic: "korean-beauty",
    title: {
      en: "How Korean layering teaches patience",
      ku: "چۆن چینبەچینی کۆری ئارامی فێر دەکات",
    },
    excerpt: {
      en: "Essence, ampoule, cream — a calm map of K-beauty sequencing without the pressure to buy ten steps.",
      ku: "ئێسێنس، ئەمپۆل، کرێم — نەخشەیەکی ئارام بەبێ پەلە بۆ دە هەنگاو.",
    },
    image: E.kbeauty,
    imageCredit: "Unsplash",
    readMin: 6,
    body: {
      en: [
        "Korean beauty is often misunderstood as maximalism. In practice, brands like COSRX, Torriden, Anua, and Round Lab teach hydration stacking: thin to rich, water to oil.",
        "You do not need ten bottles. You need order. Cleanse, treat, moisturize, protect. Add actives slowly; listen when skin feels tight.",
        "The editorial lesson is rhythm. Glass skin is a metaphor for comfort and light reflection — not a shopping list.",
      ],
      ku: [
        "جوانی کۆری زۆرجار وەک زۆری تێدەگەن. لە ڕاستیدا فێری چینی شلکردنەوە دەکات: لە تەنکەوە بۆ ئەستوور.",
        "پێویستت بە دە بوتڵ نییە. پێویستت بە ڕیزبەندییە.",
        "وانەکە ڕیتمە. پێستی شووشە وێنەی ئاسوودەیی و ڕەنگدانەوەی ڕووناکییە.",
      ],
    },
  },
  {
    id: "pharmacy-beauty",
    topic: "french-pharmacy",
    title: {
      en: "The French pharmacy cabinet, decoded",
      ku: "دەرمانخانەی فەڕەنسی، کراوە",
    },
    excerpt: {
      en: "Cicaplast, Sensibio, Thermal Spring Water — why dermo-cosmetics belong in a beauty library.",
      ku: "سیکاپلاست، سێنسیبۆ، ئاوی گەرماو — بۆچی لە کتێبخانەی جوانیدان.",
    },
    image: E.french,
    imageCredit: "Unsplash",
    readMin: 5,
    body: {
      en: [
        "French pharmacy beauty is less glamorous packaging and more disciplined formulas. La Roche-Posay, Avène, Bioderma, and Vichy built trust through dermatologist culture.",
        "Soothing balms, micellar waters, mineral sunscreens — educational staples for sensitive and urban skin stories.",
        "Treat this aisle as reference material: reliable textures, known roles, calm language. Not a marketplace, a shelf of soft sciences.",
      ],
      ku: [
        "جوانی دەرمانخانەی فەڕەنسی زیاتر فۆرمۆلای دیسپلیندارە نەک پاکێجی جلیوە.",
        "بالمی ئارامکەر، ئاوی مایسێلەر، کرێمی خۆر — بنەمای پەروەردەیین.",
        "وەک سەرچاوە مامەڵەی لەگەڵ بکە، نەک بازاڕ.",
      ],
    },
  },
  {
    id: "luxury-ritual",
    topic: "luxury",
    title: {
      en: "What luxury skincare actually teaches",
      ku: "لوکسی چاودێری پێست چی فێر دەکات",
    },
    excerpt: {
      en: "Estée Lauder, Dior, Shiseido — sensorial education beyond the price tag.",
      ku: "ئێستی لۆدەر، دیۆر، شیشێدۆ — پەروەردەی هەست بەبێ باسی نرخ.",
    },
    image: E.luxury,
    imageCredit: "Unsplash",
    readMin: 5,
    body: {
      en: [
        "Luxury formulas often excel at texture storytelling: silks, scents, and press-and-pat rituals that slow you down.",
        "Study Advanced Night Repair or Ultimune as examples of serum culture — not as something you must own. Learn the layering grammar: antioxidant or repair at night, cream seal, daytime UV.",
        "True editorial luxury is attention. The bottle is only the teacher’s desk.",
      ],
      ku: [
        "فۆرمۆلا لوکسەکان زۆرجار لە دەق و ڕێوڕەسمدا بەهێزن.",
        "وەک نموونەی کلتووری سێرەم لێیان فێر ببە — نەک وەک شتێک کە دەبێت بیکڕیت.",
        "لوکسی ڕاستەقینە سەرنجە.",
      ],
    },
  },
  {
    id: "glow-habits",
    topic: "tips",
    title: {
      en: "Five soft habits for luminous skin",
      ku: "پێنج عادەتی نەرم بۆ پێستی درەوشاوە",
    },
    excerpt: {
      en: "Gentle consistency beats complicated routines every season.",
      ku: "بەردەوامی نەرم لە ڕێوڕەسمی ئاڵۆز باشترە.",
    },
    image: E.tips,
    imageCredit: "Unsplash",
    readMin: 4,
    body: {
      en: [
        "Wash with lukewarm water. Moisturize while skin is still slightly damp. Wear SPF. Sleep. Do not layer five acids on a Tuesday for drama.",
        "Consistency is the unglamorous editorial tip Vogue and SkinSort quietly agree on: formulas need time.",
        "If your skin feels tight, simplify before you escalate.",
      ],
      ku: [
        "بە ئاوی گەرم-فێنک بشۆ. کاتێک پێست تەڕە نەرمکەرەوە بەکاربهێنە. SPF. خەو.",
        "فۆرمۆلا پێویستی بە کات هەیە.",
        "ئەگەر پێستت توند هەست دەکات، سادە بکەرەوە پێش ئەوەی زیاتر زیاد بکەیت.",
      ],
    },
  },
  {
    id: "glass-trend",
    topic: "trends",
    title: {
      en: "After glass skin: the calm skin era",
      ku: "دوای پێستی شووشە: سەردەمی پێستی ئارام",
    },
    excerpt: {
      en: "Trends soften — barrier care and skin comfort define the next chapter.",
      ku: "ترێندەکان نەرم دەبن — چاودێری پەردە و ئاسوودەیی.",
    },
    image: E.trends,
    imageCredit: "Unsplash",
    readMin: 4,
    body: {
      en: [
        "Glass skin taught hydration. The next editorial chapter values calm: fewer peels, smarter SPF, makeup that respects texture.",
        "Rhode-like minimalism and pharmacy softness meet K-beauty hydration — not as shopping tribes, as complementary ideas.",
        "Follow trends as moodboards, not mandates.",
      ],
      ku: [
        "پێستی شووشە شلکردنەوەی فێرکرد. ئێستا ئارامی گرنگە.",
        "مینیمالیزم و نەرمی دەرمانخانە و شلکردنەوەی کۆری تەواوکەری یەکترن.",
        "ترێند وەک مودبۆرد ببینە، نەک فەرمان.",
      ],
    },
  },
  {
    id: "niacinamide",
    topic: "ingredients",
    title: {
      en: "Niacinamide, explained gently",
      ku: "نیاسینامید بە شێوەیەکی نەرم",
    },
    excerpt: {
      en: "What this vitamin B3 derivative is celebrated for — and how to introduce it calmly.",
      ku: "بۆچی ناودەبرێت و چۆن بە ئارامی دەست پێبکەیت.",
    },
    image: E.ingredients,
    imageCredit: "Unsplash",
    readMin: 5,
    body: {
      en: [
        "Niacinamide appears across CeraVe, The Inkey List culture, and countless serums because it is generally well-tolerated and supports an even-looking finish.",
        "Educational use: start a few times weekly in a simple moisturizer or serum. Patch test if your skin is reactive.",
        "It is not a miracle. It is a steady supportive player in an encyclopedia of actives.",
      ],
      ku: [
        "نیاسینامید لە زۆر فۆرمۆلادا دەردەکەوێت چونکە زۆرجار باشتەحەمول دەکرێت.",
        "هەفتەی چەند جارێک دەست پێبکە. ئەگەر پێستت هەستیارە، تاقی بکەرەوە.",
        "مۆعیزە نییە — یاریزانێکی جێگیرە.",
      ],
    },
  },
  {
    id: "ceramides",
    topic: "ingredients",
    title: {
      en: "Ceramides and the comfort barrier",
      ku: "سیرامید و پەردەی ئاسوودەیی",
    },
    excerpt: {
      en: "Think soft seal — the lipids that help skin feel less fragile.",
      ku: "مۆری نەرم — چەورییەکان کە یارمەتی پێست دەدەن.",
    },
    image: E.skin,
    imageCredit: "Unsplash",
    readMin: 4,
    body: {
      en: [
        "Ceramides are part of the skin’s natural lipid matrix. Formulas from CeraVe and pharmacy creams use them to support a comfortable feel.",
        "Dry, wind-exposed, or over-exfoliated skin often responds to ceramide-rich textures.",
        "Pair with gentle cleansing — ceramides work best when you stop stripping the stage they perform on.",
      ],
      ku: [
        "سیرامید بەشێکە لە ماتریکسی چەوری سروشتی پێست.",
        "پێستی وشک یان زۆر سڕیوە زۆرجار بە سیرامید هەست بە باشی دەکات.",
        "لەگەڵ پاککردنەوەی نەرم بەکاریبهێنە.",
      ],
    },
  },
  {
    id: "perfume-wardrobe",
    topic: "perfume",
    title: {
      en: "Building a quiet perfume wardrobe",
      ku: "دروستکردنی گەنجینەیەکی بۆنی ئارام",
    },
    excerpt: {
      en: "Floral, woody, skin scents — how to study fragrance without turning it into clutter.",
      ku: "گوڵی، دارین، بۆنی پێست — چۆن بۆن بخوێنیتەوە.",
    },
    image: E.perfume,
    imageCredit: "Unsplash",
    readMin: 5,
    body: {
      en: [
        "Miss Dior, Beautiful, Ginza — iconic bottles can be studied for structure: top notes, heart, dry-down.",
        "Spray on pulse points; do not rub. Let alcohol lift. One signature for day, one softer for evening can be enough.",
        "Fragrance is memory education. Collect moments, not shelves — unless the shelf is your encyclopedia.",
      ],
      ku: [
        "بوتڵە ئایکۆنەکان دەکرێت بۆ پێکهاتە بخوێنرێنەوە: نۆتی سەرەوە، دڵ، وشکبوونەوە.",
        "لە خاڵی لێدان بۆن بکە؛ مەمەڵێنە.",
        "بۆن پەروەردەی بیرەوەرییە.",
      ],
    },
  },
  {
    id: "nail-quiet",
    topic: "nails",
    title: {
      en: "The quiet manicure: clean shape, soft shine",
      ku: "مانیکێوری ئارام: شێوەی پاک، درەوشانەوەی نەرم",
    },
    excerpt: {
      en: "Editorial nails for people who want polish without spectacle.",
      ku: "نووک بۆ کەسانی کە پۆلیش دەیانەوێت بەبێ نمایش.",
    },
    image: E.nails,
    imageCredit: "Unsplash",
    readMin: 3,
    body: {
      en: [
        "Shape first. A soft almond or rounded square looks expensive in any frame.",
        "Hydrate cuticles. Choose sheer nudes or milky finishes when you want Rhode-adjacent calm.",
        "Remove with care; give nails breath between long gel chapters.",
      ],
      ku: [
        "سەرەتا شێوە. بادەم یان چوارگۆشەی نەرم هەمیشە پاک دەردەکەوێت.",
        "کوتیکڵ شل بکەرەوە. ڕەنگی شفاف و شیرەیی بۆ ڕۆژانی ئارام.",
        "نوقڵ بە ووریایی لاببە.",
      ],
    },
  },
  {
    id: "selfcare-evening",
    topic: "self-care",
    title: {
      en: "An evening that feels like a beauty editor’s reset",
      ku: "ئێوارەیەک وەک ڕیسێتی سەرنووسەری جوانی",
    },
    excerpt: {
      en: "Steam, soft cloth, diary, early lights — rituals that restore more than skin.",
      ku: "هەڵم، خشتەی نەرم، ڕۆژنامە، ڕووناکی نزم.",
    },
    image: E.self,
    imageCredit: "Unsplash",
    readMin: 4,
    body: {
      en: [
        "Turn down overhead lights. Cleanse slowly. Apply something rich only where you need it.",
        "Write three lines in your beauty journal: sleep, water, skin feel. Patterns teach more than products.",
        "Self care in an encyclopedia is permission to stop optimizing and start noticing.",
      ],
      ku: [
        "ڕووناکی نزم بکەرەوە. بە هێواشی پاک بکەرەوە.",
        "سێ دێڕ لە ڕۆژنامە بنووسە: خەو، ئاو، هەستی پێست.",
        "چاودێری خۆت مۆڵەتە بۆ وەستان و سەرنجدان.",
      ],
    },
  },
  {
    id: "lip-library",
    topic: "tips",
    title: {
      en: "Lip care as quiet couture",
      ku: "چاودێری لێو وەک کووتوری ئارام",
    },
    excerpt: {
      en: "Masks, oils, and iconic tints — building soft lips into your ritual.",
      ku: "ماسك، ڕۆن، و تینت — لێوی نەرم لە ڕێوڕەسمدا.",
    },
    image: E.lips,
    imageCredit: "Unsplash",
    readMin: 3,
    body: {
      en: [
        "Laneige Lip Sleeping Mask, Dior Lip Glow Oil, Clinique Black Honey — different moods in one soft chapter.",
        "Exfoliate rarely and gently. Seal at night. Tint by day.",
        "Lips reveal dehydration early. Treat them as part of skincare, not an afterthought.",
      ],
      ku: [
        "ماسكی شەوانە، ڕۆنی لێو، تینتی ڕۆژ — مودای جیاواز.",
        "کەم سڕینەوە. شەو بداخە. ڕۆژ تینت.",
        "لێو بەشی چاودێری پێستە.",
      ],
    },
  },
];

export const BEAUTY_GAMES = [
  { id: "routine-order", icon: "layers", titleKey: "gameOrder", descKey: "gameOrderDesc" },
  { id: "myth-fact", icon: "help", titleKey: "gameMyth", descKey: "gameMythDesc" },
];

export const DAILY_INSPIRATIONS = {
  en: [
    "Glow is a routine, not a rush.",
    "Your skin hears kindness.",
    "Soft rituals create lasting confidence.",
    "Hydration is self-respect.",
    "Luxury is how gently you care for yourself.",
  ],
  ku: [
    "درەوشانەوە ڕێوڕەسمێکە، نەک پەلە.",
    "پێستت میهرەبانی دەبیستێت.",
    "ڕێوڕەسمە نەرمەکان متمانەی درێژخایەن دروست دەکەن.",
    "شلکردنەوە ڕێزگرتنە لە خۆت.",
    "لوکس واته چۆن بە نەرمی چاودێری خۆت دەکەیت.",
  ],
};

export function getDiscoverArticle(id) {
  return DISCOVER_ARTICLES.find((a) => a.id === id) || null;
}
