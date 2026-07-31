/**
 * Generates Baby Essentials educational catalog — no prices, rich bilingual fields.
 * Run: node scripts/generate-ftm-essentials.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

/** Category lifestyle / product-stage photography (Unsplash) — paired with real brand names in UI */
const CAT_IMAGES = {
  monitors: [
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1600&q=80",
  ],
  pumps: [
    "https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1600&q=80",
  ],
  bottles: [
    "https://images.unsplash.com/photo-1544126592-807adefc41b7?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1566004100631-35d2679f1277?auto=format&fit=crop&w=1600&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&w=1600&q=80",
  ],
};

function imgs(cat, i) {
  const pool = CAT_IMAGES[cat] || CAT_IMAGES.default;
  const extra = CAT_IMAGES.default;
  return [pool[i % pool.length], extra[(i + 1) % extra.length], extra[(i + 2) % extra.length]];
}

const bi = (en, ku) => ({ en, ku });
const bil = (enArr, kuArr) => ({ en: enArr, ku: kuArr });

const cats = [
  { id: "monitors", en: "Baby monitors", ku: "مۆنیتەری منداڵ", brands: [
    ["Nanit", "Pro Camera", "premium", ["apartment", "privacy", "nightAnxiety"], { apartments: "high", video: "high", nightVision: "high", app: "high", privacy: "medium", value: "medium", travel: "low", setup: "medium" }],
    ["Owlet", "Dream Sock", "premium", ["nightAnxiety", "premature"], { apartments: "high", video: "low", nightVision: "low", app: "high", privacy: "medium", value: "medium", travel: "high", setup: "high" }],
    ["Cubo AI", "Smart Baby Monitor", "premium", ["apartment", "privacy"], { apartments: "high", video: "high", nightVision: "high", app: "high", privacy: "high", value: "medium", travel: "low", setup: "medium" }],
    ["Infant Optics", "DXR-8 Pro", "medium", ["apartment"], { apartments: "high", video: "medium", nightVision: "high", app: "low", privacy: "high", value: "high", travel: "medium", setup: "high" }],
    ["Eufy", "SpaceView Pro", "medium", ["privacy", "apartment"], { apartments: "high", video: "high", nightVision: "high", app: "medium", privacy: "high", value: "high", travel: "low", setup: "medium" }],
    ["Motorola", "VM85 Connect", "low", ["apartment"], { apartments: "medium", video: "medium", nightVision: "medium", app: "medium", privacy: "low", value: "high", travel: "medium", setup: "high" }],
    ["Babysense", "HD S2", "medium", ["nightAnxiety"], { apartments: "medium", video: "medium", nightVision: "high", app: "low", privacy: "medium", value: "high", travel: "medium", setup: "high" }],
    ["VTech", "RM5766HD", "low", ["apartment"], { apartments: "medium", video: "medium", nightVision: "medium", app: "low", privacy: "medium", value: "high", travel: "medium", setup: "high" }],
  ]},
  { id: "pumps", en: "Breast pumps", ku: "پەمپی شیر", brands: [
    ["Medela", "Freestyle Flex", "premium", ["breastfeeding", "travel"], { travel: "high", setup: "medium", value: "medium", apartments: "high", app: "medium", privacy: "high", video: "low", nightVision: "low" }],
    ["Spectra", "S1 Plus", "premium", ["breastfeeding"], { travel: "medium", setup: "medium", value: "high", apartments: "high", app: "low", privacy: "high", video: "low", nightVision: "low" }],
    ["Elvie", "Pump", "premium", ["breastfeeding", "travel", "apartment"], { travel: "high", setup: "high", value: "low", apartments: "high", app: "high", privacy: "high", video: "low", nightVision: "low" }],
    ["Momcozy", "M5", "medium", ["breastfeeding", "travel"], { travel: "high", setup: "high", value: "high", apartments: "high", app: "medium", privacy: "high", video: "low", nightVision: "low" }],
    ["Willow", "Go", "premium", ["breastfeeding", "travel"], { travel: "high", setup: "medium", value: "medium", apartments: "high", app: "high", privacy: "high", video: "low", nightVision: "low" }],
    ["Lansinoh", "Signature Pro", "medium", ["breastfeeding"], { travel: "medium", setup: "medium", value: "high", apartments: "high", app: "low", privacy: "high", video: "low", nightVision: "low" }],
    ["Philips Avent", "Double Electric", "medium", ["breastfeeding"], { travel: "medium", setup: "high", value: "high", apartments: "high", app: "low", privacy: "high", video: "low", nightVision: "low" }],
    ["Haakaa", "Generation 3", "low", ["breastfeeding"], { travel: "high", setup: "high", value: "high", apartments: "high", app: "low", privacy: "high", video: "low", nightVision: "low" }],
  ]},
  { id: "bottles", en: "Baby bottles", ku: "بوتڵی منداڵ", brands: [
    ["Philips Avent", "Natural Response", "medium", ["breastfeeding"], null],
    ["Dr Browns", "Options Plus", "medium", ["premature"], null],
    ["Comotomo", "Natural Feel", "medium", ["breastfeeding"], null],
    ["Nanobebe", "Flexy", "medium", ["travel"], null],
    ["Tommee Tippee", "Closer to Nature", "low", ["breastfeeding"], null],
    ["Pigeon", "SofTouch", "medium", ["premature"], null],
    ["Nuk", "Simply Natural", "low", [], null],
    ["MAM", "Easy Start", "low", [], null],
  ]},
  { id: "sterilizers", en: "Sterilizers", ku: "ستەریلایزەر", brands: [
    ["Philips Avent", "Advanced Electric", "medium", ["apartment"], null],
    ["Baby Brezza", "Superfast", "premium", [], null],
    ["Tommee Tippee", "Ultra UV", "medium", ["apartment"], null],
    ["Chicco", "Sterilnatural", "medium", [], null],
    ["Papablic", "Mini", "low", ["travel", "apartment"], null],
    ["Dr Browns", "Deluxe", "medium", [], null],
    ["Grownsy", "4-in-1", "low", ["apartment"], null],
    ["Munchkin", "Steam Guard", "low", [], null],
  ]},
  { id: "warmers", en: "Bottle warmers", ku: "گەرمکەری بوتڵ", brands: [
    ["Philips Avent", "Fast Bottle Warmer", "medium", ["nightAnxiety"], null],
    ["Baby Brezza", "Safe and Sound", "premium", [], null],
    ["Tommee Tippee", "Easi-Warm", "low", [], null],
    ["Dr Browns", "Deluxe Warm Water", "medium", [], null],
    ["Kiinde", "Kozii", "medium", ["breastfeeding"], null],
    ["Chicco", "Digital", "medium", [], null],
    ["The First Years", "Nighttime", "low", ["nightAnxiety"], null],
    ["Boon", "Orb", "low", ["apartment"], null],
  ]},
  { id: "carriers", en: "Baby carriers", ku: "هەڵگرەی منداڵ", brands: [
    ["Ergobaby", "Omni Breeze", "premium", ["travel", "twins"], null],
    ["BabyBjorn", "Mini", "premium", ["newborn", "travel"], null],
    ["Artipoppe", "Zeitgeist", "premium", [], null],
    ["Tula", "Explore", "medium", ["travel"], null],
    ["Lillebaby", "Complete", "medium", [], null],
    ["Boba", "X", "medium", ["travel"], null],
    ["Sakura Bloom", "Scout", "premium", [], null],
    ["WildBird", "Aerial", "premium", [], null],
  ]},
  { id: "strollers", en: "Strollers", ku: "عەرەبانە", brands: [
    ["Bugaboo", "Butterfly", "premium", ["travel", "apartment"], null],
    ["UPPAbaby", "Vista V2", "premium", ["twins"], null],
    ["Doona", "Infant Car Seat Stroller", "premium", ["travel", "apartment"], null],
    ["Thule", "Shine", "premium", ["travel"], null],
    ["Babyzen", "YOYO2", "premium", ["travel", "apartment"], null],
    ["Nuna", "TRVL", "premium", ["travel"], null],
    ["Cybex", "Melio", "medium", ["apartment"], null],
    ["Maxi-Cosi", "Zelia", "medium", [], null],
  ]},
  { id: "carseats", en: "Car seats", ku: "کورسی ئۆتۆمبێل", brands: [
    ["Nuna", "PIPA urbn", "premium", ["travel"], null],
    ["Cybex", "Cloud G", "premium", ["travel"], null],
    ["Maxi-Cosi", "Mico Luxe Plus", "medium", [], null],
    ["Britax", "B-Safe Gen2", "medium", [], null],
    ["Graco", "SnugRide", "low", [], null],
    ["Chicco", "KeyFit 35", "medium", [], null],
    ["UPPAbaby", "Mesa V2", "premium", [], null],
    ["Evenflo", "Revolve360", "medium", [], null],
  ]},
  { id: "highchairs", en: "High chairs", ku: "کورسی خواردن", brands: [
    ["Stokke", "Tripp Trapp", "premium", ["apartment"], null],
    ["Abiie", "Beyond", "medium", [], null],
    ["Cybex", "Lemo", "premium", [], null],
    ["BabyBjorn", "High Chair", "premium", ["apartment"], null],
    ["Ingenuity", "SmartClean", "low", [], null],
    ["Graco", "Blossom", "low", ["twins"], null],
    ["Maxi-Cosi", "Minla", "medium", [], null],
    ["Oribel", "Cocoon", "medium", ["apartment"], null],
  ]},
  { id: "noise", en: "White noise", ku: "دەنگی سپی", brands: [
    ["Hatch", "Rest Plus", "premium", ["nightAnxiety", "apartment"], null],
    ["LectroFan", "Evo", "medium", ["nightAnxiety"], null],
    ["Dohm", "Classic", "low", ["nightAnxiety"], null],
    ["SoundBub", "Portable", "medium", ["travel"], null],
    ["Skip Hop", "Moonlight", "medium", [], null],
    ["Yogasleep", "Rohm", "low", ["travel"], null],
    ["Homedics", "SoundSpa", "low", [], null],
    ["Adaptive Sound", "Nightingale", "premium", ["privacy"], null],
  ]},
  { id: "thermometers", en: "Thermometers", ku: "پلە گەرمەپێو", brands: [
    ["Braun", "ThermoScan 7", "premium", ["nightAnxiety"], null],
    ["Withings", "Thermo", "premium", [], null],
    ["iHealth", "No-Touch", "medium", [], null],
    ["Kinsa", "QuickCare", "medium", [], null],
    ["Exergen", "TemporalScanner", "medium", [], null],
    ["Vicks", "ComfortFlex", "low", [], null],
    ["FridaBaby", "3-in-1 Ear", "medium", [], null],
    ["NoseFrida", "Snotsucker", "low", [], null],
  ]},
  { id: "humidifiers", en: "Humidifiers", ku: "شێدارکەر", brands: [
    ["Crane", "EE-5301", "low", ["apartment"], null],
    ["Levoit", "Classic 300", "medium", ["apartment"], null],
    ["Honeywell", "HCM-350", "medium", [], null],
    ["Pure Enrichment", "MistAire", "low", ["apartment"], null],
    ["Vicks", "Filter-Free", "low", [], null],
    ["Canopy", "Humidifier", "premium", ["privacy"], null],
    ["FridaBaby", "3-in-1 Humidifier", "medium", [], null],
    ["Homedics", "TotalComfort", "medium", [], null],
  ]},
  { id: "diaper", en: "Diaper care", ku: "چاودێری پارچە", brands: [
    ["Ubbi", "Steel Diaper Pail", "medium", ["apartment"], null],
    ["Dekor", "Plus", "medium", [], null],
    ["Diaper Genie", "Complete", "low", [], null],
    ["Skip Hop", "Nursery Style", "medium", ["apartment"], null],
    ["Munchkin", "Step Diaper Pail", "low", [], null],
    ["Angelcare", "Dress Up", "medium", [], null],
    ["Playtex", "Diaper Genie Elite", "low", [], null],
    ["Litter Genie", "Pail", "low", [], null],
  ]},
  { id: "swaddles", en: "Swaddles", ku: "پێچە", brands: [
    ["Halo", "SleepSack", "medium", ["nightAnxiety"], null],
    ["Love To Dream", "Swaddle UP", "medium", ["nightAnxiety"], null],
    ["Aden Anais", "Classic", "medium", [], null],
    ["Miracle Blanket", "Original", "low", [], null],
    ["SwaddleMe", "Original", "low", [], null],
    ["Ergobaby", "Swaddler", "medium", [], null],
    ["Nested Bean", "Zen", "medium", ["nightAnxiety"], null],
    ["Woolino", "4 Season", "premium", [], null],
  ]},
  { id: "pacifiers", en: "Pacifiers", ku: "مژۆک", brands: [
    ["BIBS", "Colour", "medium", [], null],
    ["Philips Avent", "Soothie", "low", ["premature"], null],
    ["MAM", "Original", "low", [], null],
    ["Natursutten", "Butterfly", "medium", [], null],
    ["Nuk", "Sensitive", "low", [], null],
    ["Frigg", "Daisy", "medium", [], null],
    ["Tommee Tippee", "Ultra Light", "low", [], null],
    ["Itzy Ritzy", "Sweetie", "medium", [], null],
  ]},
  { id: "bath", en: "Bath time", ku: "کاتی حەمام", brands: [
    ["Skip Hop", "Moby", "medium", ["apartment"], null],
    ["Stokke", "Flexi Bath", "premium", ["travel"], null],
    ["Puj", "Tub", "medium", ["apartment", "travel"], null],
    ["Angelcare", "Soft Touch", "medium", [], null],
    ["Fisher-Price", "4-in-1", "low", [], null],
    ["Summer Infant", "Clean Rinse", "low", [], null],
    ["OXO Tot", "Splash", "medium", [], null],
    ["The First Years", "Sure Comfort", "low", [], null],
  ]},
  { id: "bags", en: "Diaper bags", ku: "جانتای پارچە", brands: [
    ["Freshly Picked", "Classic", "premium", ["travel"], null],
    ["Petunia Pickle Bottom", "Boxy", "premium", [], null],
    ["Skip Hop", "Duo", "medium", ["travel"], null],
    ["JuJuBe", "BFF", "medium", [], null],
    ["TushBaby", "Hip Carrier", "medium", ["travel"], null],
    ["Dagne Dover", "Indigo", "premium", [], null],
    ["State Bags", "Kane", "medium", [], null],
    ["Fawn Design", "Original", "medium", [], null],
  ]},
  { id: "gym", en: "Activity gyms", ku: "یاریگای چالاکی", brands: [
    ["Lovevery", "Play Gym", "premium", [], null],
    ["Skip Hop", "Treetop", "medium", ["apartment"], null],
    ["Fisher-Price", "Deluxe Kick", "low", [], null],
    ["Tiny Love", "Gymini", "medium", [], null],
    ["Baby Einstein", "Curiosity", "low", [], null],
    ["Parklon", "Pure Soft Gym", "medium", ["apartment"], null],
    ["Infantino", "Grow-with-Me", "low", [], null],
    ["Skip Hop", "Silver Lining", "medium", [], null],
  ]},
  { id: "mats", en: "Play mats", ku: "سەرجێگای یاری", brands: [
    ["Parklon", "Pure Soft", "medium", ["apartment"], null],
    ["Skip Hop", "Playspot", "medium", [], null],
    ["Baby Care", "Folding", "medium", ["apartment"], null],
    ["Toddlefar", "Extra Large", "medium", [], null],
    ["Lovevery", "Play Gym Mat", "premium", [], null],
    ["Melissa Doug", "Round", "low", [], null],
    ["Brica", "Fold", "low", ["travel"], null],
    ["Elonbo", "Reversible", "low", [], null],
  ]},
  { id: "storage", en: "Milk storage", ku: "پاشەکەوتی شیر", brands: [
    ["Medela", "Storage Bags", "medium", ["breastfeeding"], null],
    ["Lansinoh", "Breastmilk Bags", "low", ["breastfeeding"], null],
    ["Kiinde", "Twist", "medium", ["breastfeeding", "travel"], null],
    ["Philips Avent", "Storage Cups", "medium", ["breastfeeding"], null],
    ["Momcozy", "Storage Bags", "low", ["breastfeeding"], null],
    ["Freemie", "Collection Cups", "medium", ["breastfeeding"], null],
    ["Spectra", "Bags", "low", ["breastfeeding"], null],
    ["Tommee Tippee", "Closer Bags", "low", ["breastfeeding"], null],
  ]},
  { id: "pillows", en: "Nursing pillows", ku: "بالیشی شیردان", brands: [
    ["Boppy", "Original", "medium", ["breastfeeding", "twins"], null],
    ["My Brest Friend", "Deluxe", "medium", ["breastfeeding"], null],
    ["Frida Mom", "Adjustable", "medium", ["breastfeeding"], null],
    ["Snuggle Me", "Organic", "premium", [], null],
    ["Leachco", "Cuddle", "low", ["breastfeeding"], null],
    ["Momcozy", "Nursing Pillow", "low", ["breastfeeding"], null],
    ["Boppy", "Pregnancy Wedge", "medium", [], null],
    ["Ingenuity", "Smart", "low", [], null],
  ]},
  { id: "food", en: "Food makers", ku: "ئامێری خۆراکی منداڵ", brands: [
    ["Baby Brezza", "Food Maker Pro", "premium", [], null],
    ["BEABA", "Babycook Neo", "premium", ["apartment"], null],
    ["Philips Avent", "Combined Steamer", "medium", [], null],
    ["Sage", "Baby Food", "premium", [], null],
    ["OXO Tot", "Mash Maker", "low", [], null],
    ["Nuby", "Garden Fresh", "low", [], null],
    ["Cuisinart", "Baby Food Maker", "medium", [], null],
    ["Hamilton Beach", "Fresh Prep", "low", [], null],
  ]},
];

function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildProduct(cat, brand, model, tier, tags, traits, i) {
  const id = `${cat.id}-${slug(brand)}-${slug(model)}`;
  const ages = ["Newborn+", "0–3 months", "0–6 months", "0–12 months", "6+ months", "1+ year", "All ages"];
  const age = ages[i % ages.length];

  return {
    id,
    category: cat.id,
    categoryEn: cat.en,
    categoryKu: cat.ku,
    brand,
    brandKu: brand,
    name: model,
    nameKu: model,
    tier,
    tags: tags || [],
    age,
    images: imgs(cat.id, i),
    compareTraits: traits || {
      apartments: "medium",
      video: "low",
      nightVision: "low",
      app: "low",
      privacy: "medium",
      value: "medium",
      travel: "medium",
      setup: "medium",
    },
    tagline: bi(
      `A trusted ${brand} pick parents research carefully.`,
      `هەڵبژاردەیەکی متمانەپێکراوی ${brand} کە دایک و باوک بە وریایی لێکۆڵینەوەی لەسەر دەکەن.`,
    ),
    whatIs: bi(
      `The ${brand} ${model} is a real ${cat.en.toLowerCase()} designed for everyday parenting. This guide explains fit, limits, and alternatives — not shopping.`,
      `${brand} ${model} ${cat.ku}یەکی ڕاستەقینەیە بۆ ژیانی ڕۆژانەی دایکایەتی. ئەم ڕێنماییە گونجان، سنوور و جێگرەوە ڕوون دەکاتەوە — نەک کڕین.`,
    ),
    whyLove: bil(
      [
        "Familiar brand with clear manuals and replacement parts.",
        "Parents share detailed setup and cleaning habits online.",
        "Fits a common stage of the newborn-to-toddler journey.",
      ],
      [
        "براندێکی ناسراو لەگەڵ ڕێنمایی ڕوون و پارچەی گۆڕینەوە.",
        "دایک و باوک ئەزموونی دامەزراندن و پاککردنەوە هاوبەش دەکەن.",
        "لەگەڵ قۆناغێکی باوی گەشتی منداڵدا دەگونجێت.",
      ],
    ),
    whoShould: bi(
      `Parents who want a reliable ${cat.en.toLowerCase()} and prefer researching before deciding.`,
      `دایک و باوک کە ${cat.ku}ی متمانەپێکراو دەوێت و پێش بڕیار لێکۆڵینەوە دەکەن.`,
    ),
    whoShouldNot: bi(
      "Anyone looking for a medical device prescription, or who needs clinician-only guidance for a high-risk condition.",
      "کەسێک کە پێویستی بە وەسفکردنی پزیشکی هەیە، یان ڕێنمایی تایبەتی پزیشک بۆ دۆخی مەترسیدار.",
    ),
    pros: bil(
      ["Strong brand reputation", "Clear category purpose", "Widely discussed by parents"],
      ["ناوبانگی بەهێزی براند", "مەبەستی ڕوونی پۆل", "باسکراو لەلایەن دایک و باوکەوە"],
    ),
    cons: bil(
      ["Learning curve in the first week", "May need compatible accessories", "Not one-size-fits-all"],
      ["کەمێک فێربوون لە هەفتەی یەکەم", "لەوانەیە پێویستی بە پارچەی گونجاو هەبێت", "بۆ هەموو کەسێک نییە"],
    ),
    cleaning: bi(
      "Follow the manufacturer cleaning chart. Wash parts that touch milk or skin after each use; dry fully before storing.",
      "خشتەی پاککردنەوەی دروستکەر جێبەجێ بکە. پارچەکانی پەیوەندیدار بە شیر یان پێست دوای هەر بەکارهێنانێک بشۆ؛ پێش پاشەکەوتکردن ووشک بکە.",
    ),
    safety: bi(
      "This guide is educational, not medical advice. Follow age/weight limits on the box. Register the product for recall alerts. Ask your clinician for personal medical questions.",
      "ئەم ڕێنماییە پەروەردەییە، نەک ئامۆژگاری پزیشکی. سنووری تەمەن/کێشی سەر سندووق جێبەجێ بکە. بۆ ئاگاداری گەڕاندنەوە تۆماری بکە. بۆ پرسیاری پزیشکی کەسی لە پزیشک بپرسە.",
    ),
    howTo: bil(
      [
        "Unbox and read the first-week setup once.",
        "Do a dry run before you need it at 2 a.m.",
        "Write one note: what worked for your baby.",
      ],
      [
        "دەریبهێنە و دامەزراندنی هەفتەی یەکەم یەکجار بخوێنەوە.",
        "پێش پێویستی لە ٢ی شەو جارێک تاقی بکە.",
        "یەک تێبینی بنووسە: چی بۆ منداڵەکەت کار دەکات.",
      ],
    ),
    parentTips: bil(
      [
        "Buy from authorized sellers so warranty and recalls work.",
        "If something feels unsafe, stop and check the manual.",
      ],
      [
        "لە فرۆشیاری فەرمی دابین بکە بۆ گەرەنتی و ئاگاداری گەڕاندنەوە.",
        "ئەگەر هەستت کرد مەترسیدارە، بوەستە و ڕێنمایی بپشکنە.",
      ],
    ),
    expertAdvice: bi(
      "Pediatric and lactation guidance always outranks product marketing. Use this page to understand fit — then confirm with your care team when health is involved.",
      "ڕێنمایی پزیشکی منداڵ و شیردان هەمیشە لەسەر مارکێتینگ دەکەوێت. ئەم پەڕەیە بۆ تێگەیشتنی گونجان بەکاربهێنە — پاشان لەگەڵ تیمی چاودێری پشتڕاستی بکەوە کاتێک تەندروستی پەیوەندیدارە.",
    ),
    mistakes: bil(
      [
        "Skipping the weight/age limit on the label.",
        "Comparing products only by looks.",
        "Using third-party parts that void safety testing.",
      ],
      [
        "پشتگوێخستنی سنووری کێش/تەمەن لەسەر ناونیشان.",
        "بەراوردکردن تەنها بە ڕواڵەت.",
        "بەکارهێنانی پارچەی ناڕەسمی کە تاقیکردنەوەی سەلامەتی هەڵدەوەشێنێت.",
      ],
    ),
    faq: [
      {
        q: bi("Should I get this?", "ئایا ئەمە وەربگرم؟"),
        a: bi(
          `Only if it matches your stage and constraints (space, travel, feeding style). Compare with two alternatives in the same category first.`,
          `تەنها ئەگەر لەگەڵ قۆناغ و سنوورەکانتدا بگونجێت (شوێن، گەشت، شێوازی خۆراکدان). سەرەتا لەگەڵ دوو جێگرەوە لە هەمان پۆلدا بەراوردی بکە.`,
        ),
      },
      {
        q: bi("Is it good for newborns?", "ئایا بۆ تازەلەدایکبوو باشە؟"),
        a: bi(
          `Check the listed age: ${age}. If your baby is premature or has medical needs, ask your clinician before relying on any consumer product.`,
          `تەمەنی نیشانەکراو بپشکنە: ${age}. ئەگەر منداڵەکەت پێش‌وەختە یان پێویستی پزیشکی هەیە، پێش پشتبەستن بە هەر بەرهەمێکی بازاڕی لە پزیشک بپرسە.`,
        ),
      },
      {
        q: bi("Can I travel with it?", "ئایا دەتوانم لەگەڵ خۆم بیبەم بۆ گەشت؟"),
        a: bi(
          tags.includes("travel")
            ? "Many parents choose this partly because it packs more easily — still check airline and car rules."
            : "It can travel, but it may not be the most compact option. Look at tags marked travel-friendly in recommendations.",
          tags.includes("travel")
            ? "زۆر دایک و باوک هەڵیدەبژێرن چونکە ئاسانتر هەڵدەگیرێت — هێشتا یاسای فڕۆکە و ئۆتۆمبێل بپشکنە."
            : "دەتوانرێت ببرێت، بەڵام لەوانەیە کۆمپاکتترین نەبێت. لە پێشنیارەکاندا ئەوانەی گەشتیاری ببینە.",
        ),
      },
      {
        q: bi("How do I clean it?", "چۆن پاکی دەکەمەوە؟"),
        a: bi(
          "Use the cleaning section on this page and the official manual. Never invent sterilizing steps that are not listed by the brand.",
          "بەشی پاککردنەوەی ئەم پەڕەیە و ڕێنمایی فەرمی بەکاربهێنە. هەنگاوی ستەریلایزکردن دروست مەکە کە براند نەیهێناوە.",
        ),
      },
      {
        q: bi("What are better alternatives?", "جێگرەوەی باشتر چین؟"),
        a: bi(
          "Open Alternatives below and Compare up to three in this category. There is no single winner — only better fit.",
          "جێگرەوەکان لە خوارەوە بکەرەوە و تا سێ دانە بەراورد بکە. براوەیەکی تاک نییە — تەنها گونجانی باشتر.",
        ),
      },
    ],
    demoHint: bi("20-second setup rhythm", "ڕیتمی دامەزراندنی ٢٠ چرکەیی"),
  };
}

const products = [];
let idx = 0;
for (const cat of cats) {
  for (const row of cat.brands) {
    const [brand, model, tier, tags, traits] = row;
    products.push(buildProduct(cat, brand, model, tier, tags, traits, idx++));
  }
}

for (let i = 0; i < products.length; i++) {
  const same = products.filter((p) => p.category === products[i].category && p.id !== products[i].id);
  products[i].related = same.slice(0, 3).map((p) => p.id);
  products[i].alternatives = same.slice(3, 6).map((p) => p.id);
}

const recommendFn = `
export function recommendEssentials(prefs = {}) {
  const {
    age = "0-6m",
    budget = "medium",
    home = "apartment",
    travel = false,
    breastfeeding = false,
    twins = false,
    premature = false,
    nightAnxiety = false,
    privacy = false,
  } = prefs;

  const score = (p) => {
    let s = 0;
    if (p.tier === budget) s += 3;
    else if (budget === "medium" && p.tier !== "premium") s += 1;
    else if (budget === "low" && p.tier === "low") s += 3;
    else if (budget === "premium" && p.tier === "premium") s += 3;

    if (home === "apartment" && p.tags.includes("apartment")) s += 2;
    if (travel && p.tags.includes("travel")) s += 2;
    if (breastfeeding && p.tags.includes("breastfeeding")) s += 2;
    if (twins && p.tags.includes("twins")) s += 2;
    if (premature && p.tags.includes("premature")) s += 3;
    if (nightAnxiety && p.tags.includes("nightAnxiety")) s += 2;
    if (privacy && p.tags.includes("privacy")) s += 2;

    if (age === "newborn" && /Newborn|0–3|0–6|All/.test(p.age)) s += 1;
    return s;
  };

  return [...ESSENTIALS]
    .map((p) => ({ p, s: score(p) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 9)
    .map((x) => x.p);
}

export function answerProductAi(product, text, lang) {
  if (!product) {
    return lang === "ku"
      ? "بەرهەمێک هەڵبژێرە، پاشان بپرسە. وەڵامەکان تەنها لە زانیاری پاشەکەوتکراوی ئەم ڕێنماییەوە دێن."
      : "Open a product first. Answers use only the stored guide for that product.";
  }
  const L = lang === "ku";
  const q = (text || "").toLowerCase();
  const pack = (en, ku) => (L ? ku : en);

  if (/price|cost|buy|discount|cart|نرخ|کڕین|داشکاندن/.test(q)) {
    return pack(
      "Kurdana Essentials never shows prices or buy buttons. Compare fit using pros, cons, and alternatives on this page.",
      "کوردانا پێداویستیەکان نرخ یان دوگمەی کڕین پیشان نادات. گونجان بە باشییەکان، لاوازییەکان و جێگرەوەکان بەراورد بکە.",
    );
  }
  if (/should i|worth|بکڕم|شایەنی/.test(q)) {
    return pack(
      \`Who it fits: \${product.whoShould.en} Who should skip: \${product.whoShouldNot.en}\`,
      \`بۆ کێ دەگونجێت: \${product.whoShould.ku} کێ با بیپەڕێنێت: \${product.whoShouldNot.ku}\`,
    );
  }
  if (/alternative|better than|جێگرەوە|باشتر/.test(q)) {
    const alts = (product.alternatives || []).join(", ") || "see Alternatives section";
    return pack(
      \`Compare within this category. Stored alternatives: \${alts}. There is no universal winner.\`,
      \`لە هەمان پۆلدا بەراورد بکە. جێگرەوە پاشەکەوتکراوەکان: \${alts}. براوەی گشتی نییە.\`,
    );
  }
  if (/clean|wash|پاک|بشۆ/.test(q)) {
    return L ? product.cleaning.ku : product.cleaning.en;
  }
  if (/safe|safety|سەلامەت/.test(q)) {
    return L ? product.safety.ku : product.safety.en;
  }
  if (/newborn|تازەلەدایک|age|تەمەن/.test(q)) {
    return pack(
      \`Listed age guidance: \${product.age}. Confirm with your clinician for premature or medical needs.\`,
      \`تەمەنی نیشانەکراو: \${product.age}. بۆ پێش‌وەختە یان پێویستی پزیشکی لە پزیشک بپرسە.\`,
    );
  }
  if (/travel|گەشت/.test(q)) {
    const faq = product.faq?.find((f) => /travel|گەشت/.test(f.q.en + f.q.ku));
    return faq ? (L ? faq.a.ku : faq.a.en) : pack("See travel notes in the FAQ on this page.", "تێبینی گەشت لە پرسیارە باوەکان ببینە.");
  }
  if (/twin|دووان/.test(q)) {
    return product.tags.includes("twins")
      ? pack("This guide tags this product as often considered by twin households — still verify capacity and setup.", "ئەم ڕێنماییە ئەم بەرهەمە بۆ ماڵی دووان نیشانە دەکات — هێشتا توانا و دامەزراندن بپشکنە.")
      : pack("Not specifically tagged for twins in this guide. Compare carriers/strollers marked for twins.", "لەم ڕێنماییەدا بە تایبەتی بۆ دووان نیشانە نەکراوە. هەڵگرە/عەرەبانەی نیشانەکراو بۆ دووان بەراورد بکە.");
  }
  if (/prematur|پێش.?وەخت/.test(q)) {
    return pack(
      "For premature babies, ask your clinician before relying on any consumer product. This page is educational only.",
      "بۆ منداڵی پێش‌وەختە، پێش پشتبەستن بە هەر بەرهەمێک لە پزیشک بپرسە. ئەم پەڕەیە تەنها پەروەردەییە.",
    );
  }
  if (/c-?section|سزاریەن/.test(q)) {
    return pack(
      "Comfort after C-section varies. Prefer light, easy-reach setups and ask your care team about lifting limits. This is not medical advice.",
      "ئاسوودەیی دوای سزاریەن جیاوازە. دامەزراندنی سووک هەڵبژێرە و لە تیمی چاودێری دەربارەی سنووری هەڵگرتن بپرسە. ئەمە ئامۆژگاری پزیشکی نییە.",
    );
  }
  if (/how (long|to use)|چۆن|چەند/.test(q)) {
    const steps = L ? product.howTo.ku : product.howTo.en;
    return steps.join(" ");
  }
  if (/pros|cons|باشی|لاوازی/.test(q)) {
    const pros = (L ? product.pros.ku : product.pros.en).join("; ");
    const cons = (L ? product.cons.ku : product.cons.en).join("; ");
    return pack(\`Pros: \${pros}. Cons: \${cons}.\`, \`باشییەکان: \${pros}. لاوازییەکان: \${cons}.\`);
  }

  return pack(
    \`\${product.whatIs.en} Expert note: \${product.expertAdvice.en}\`,
    \`\${product.whatIs.ku} تێبینی شارەزا: \${product.expertAdvice.ku}\`,
  );
}
`;

const out = `/** Educational Baby Essentials catalog — ${products.length} real-brand guides. No prices. */
export const ESSENTIAL_CATEGORIES = ${JSON.stringify(
  cats.map((c) => ({ id: c.id, en: c.en, ku: c.ku })),
  null,
  2,
)};

export const COMPARE_LABELS = {
  apartments: { en: "Best for apartments", ku: "باشترین بۆ شوقە" },
  video: { en: "Video quality", ku: "کوالێتی ڤیدیۆ" },
  nightVision: { en: "Night vision", ku: "بینینی شەو" },
  app: { en: "App experience", ku: "ئەزموونی ئەپ" },
  privacy: { en: "Privacy posture", ku: "پاراستنی نهێنی" },
  value: { en: "Everyday practicality", ku: "کارایی ڕۆژانە" },
  travel: { en: "Travel friendly", ku: "گونجاو بۆ گەشت" },
  setup: { en: "Easy setup", ku: "دامەزراندنی ئاسان" },
};

export const TRAIT_LEVEL = {
  high: { en: "Strong fit", ku: "گونجانی بەهێز" },
  medium: { en: "Solid", ku: "باش" },
  low: { en: "Limited", ku: "سنووردار" },
};

export const ESSENTIALS = ${JSON.stringify(products, null, 2)};

export function getEssential(id) {
  return ESSENTIALS.find((p) => p.id === id) || null;
}

export function essentialsByCategory(cat) {
  if (!cat || cat === "all") return ESSENTIALS;
  return ESSENTIALS.filter((p) => p.category === cat);
}
${recommendFn}
`;

const dest = path.join(root, "src", "features", "first-time-mothers", "data", "essentials.js");
fs.writeFileSync(dest, out);
console.log(`Wrote ${products.length} educational products (no prices) → ${dest}`);
