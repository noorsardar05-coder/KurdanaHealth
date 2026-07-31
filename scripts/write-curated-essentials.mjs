/**
 * Writes hand-curated Baby Essentials catalog (educational, no commerce).
 * Run: node scripts/write-curated-essentials.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dest = path.join(root, "src", "features", "first-time-mothers", "data", "essentials.js");

const bi = (en, ku) => ({ en, ku });
const L = (items) => items;

const IMAGES = {
  monitors: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1600&q=80",
  carriers: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1600&q=80",
  strollers: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1600&q=80",
  pumps: "https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&w=1600&q=80",
  bottles: "https://images.unsplash.com/photo-1544126592-807adefc41b7?auto=format&fit=crop&w=1600&q=80",
  soothing: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1600&q=80",
  sleep: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1600&q=80",
  care: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&w=1600&q=80",
  "feeding-gear": "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1600&q=80",
};

function product({
  id, brand, nameEn, nameKu, category, ageEn, ageKu, tags,
  whatEn, whatKu, loveEn, loveKu, bestEn, bestKu, notEn, notKu,
  pros, cons, cleaning, safety, faq, alts = [],
}) {
  return {
    id,
    brand,
    name: bi(nameEn, nameKu),
    category,
    image: IMAGES[category],
    age: bi(ageEn, ageKu),
    whatIs: bi(whatEn, whatKu),
    whyLove: bi(loveEn, loveKu),
    bestFor: bi(bestEn, bestKu),
    notFor: bi(notEn, notKu),
    pros: L(pros),
    cons: L(cons),
    cleaning: L(cleaning),
    safety: L(safety),
    faq: L(faq),
    alternatives: alts,
    tags,
  };
}

const COMMON_SAFETY = [
  bi("Follow age and weight limits on the official label.", "سنووری تەمەن و کێش لەسەر ناونیشانی فەرمی جێبەجێ بکە."),
  bi("Register the product for recall alerts from the manufacturer.", "بۆ ئاگاداری گەڕاندنەوە لە دروستکەر تۆمار بکە."),
  bi("This guide is educational only — not medical advice.", "ئەم ڕێنماییە تەنها پەروەردەییە — ئامۆژگاری پزیشکی نییە."),
];

const RAW = [
  // ── MONITORS (4) ──
  product({
    id: "nanit-pro", brand: "Nanit", nameEn: "Pro Smart Baby Monitor", nameKu: "مۆنیتەری زیرەکی Pro",
    category: "monitors", ageEn: "Newborn to 12 months", ageKu: "لە تازەلەدایکبوو تا ١٢ مانگ",
    tags: ["sleep", "night", "apartment", "gear"],
    whatEn: "Nanit Pro is a wall-mounted HD camera with breathing-motion tracking and sleep analytics — a research-grade nursery monitor, not a medical device.",
    whatKu: "Nanit Pro کامێرای HDیە کە لە دیوار دامەزرێت، جووڵەی هەناسە دەپێوێت و شیکاری خەو دەکات — مۆنیتەری ژووری منداڵە، نەک ئامێری پزیشکی.",
    loveEn: "Parents love the overhead view, sleep logs, and gentle alerts without needing a wearable on baby.",
    loveKu: "دایکان حەزیان لە بینینی سەرەوە، تۆماری خەو و ئاگاداری نەرمە — بەبێ ئەوەی شتێک لەسەر منداڵ ببەسترێت.",
    bestEn: "First-time moms who want sleep insights and a clean nursery setup in a small space.",
    bestKu: "دایکانی یەکەم جار کە دەتوانن شیکاری خەو و دامەزراندنی ڕێک لە شوێنی بچووکدا بەوێت.",
    notEn: "Families who prefer no cloud video or want a fully offline monitor.",
    notKu: "خێزانەکان کە ڤیدیۆی هەور ناخوازن یان مۆنیتەری تەواو ئۆفلاین دەوێت.",
    pros: [
      bi("Crystal-clear night vision and room overview", "بینینی شەوی ڕوون و وێنەی گشتی ژوور"),
      bi("Sleep tracking helps spot patterns over weeks", "شوێنکەوتنی خەو یارمەتی دەدات بۆ بینینی شێوازەکان"),
      bi("Two-way audio for soothing from another room", "دەنگی دوولایەنە بۆ ئارامکردن لە ژوورێکی تر"),
    ],
    cons: [
      bi("Requires stable Wi‑Fi and app setup", "پێویستی بە Wi‑Fi و دامەزراندنی ئەپ هەیە"),
      bi("Subscription unlocks full history features", "بەشداربوون بۆ تەواوی مێژوو پێویستە"),
      bi("Wall mount needs planning in rented homes", "دامەزراندنی دیوار لە خانەی کرێ پلاندانان دەوێت"),
    ],
    cleaning: [
      bi("Wipe the lens with a dry microfiber cloth weekly.", "هەفتانە لێنز بە قوماشی مایکرۆفایبەری ووشک بسڕەوە."),
      bi("Keep the camera away from direct steam or mist.", "کامێرا لە دوور بخە لە بەهەمی ڕاستەوخۆ."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Does it diagnose breathing problems?", "ئایا کێشەی هەناسە دەستنیشان دەکات؟"), a: bi("No. It tracks motion patterns for sleep insights only. Call your clinician for any breathing concerns.", "نەخێر. تەنها بۆ شیکاری خەو جووڵە دەپێوێت. بۆ هەر نیگەرانییەکی هەناسە پزیشک بانگ بکە.") },
      { q: bi("Can I use it from my phone?", "دەتوانم لە مۆبایلەوە بەکاریبهێنم؟"), a: bi("Yes — the Nanit app streams live video and stores sleep summaries when connected.", "بەڵێ — ئەپەکە ڤیدیۆی ڕاستەوخۆ پیشان دەدات و کورتەی خەو پاشەکەوت دەکات.") },
    ],
    alts: ["owlet-dream-sock", "eufy-spaceview-pro"],
  }),
  product({
    id: "owlet-dream-sock", brand: "Owlet", nameEn: "Dream Sock", nameKu: "پێچکەی خەوی Dream",
    category: "monitors", ageEn: "Newborn to 18 months (check size)", ageKu: "لە تازەلەدایکبوو تا ١٨ مانگ (قەبارە بپشکنە)",
    tags: ["sleep", "night", "newborn", "gear"],
    whatEn: "Owlet Dream Sock is a soft fabric sock that tracks heart rate and oxygen trends while baby sleeps — designed for peace of mind, not diagnosis.",
    whatKu: "Owlet Dream Sock پێچکەیەکی نەرمە کە لێدانی دڵ و ئۆکسجین لە کاتی خەودا دەپێوێت — بۆ ئاسوودەیی دڵ، نەک دەستنیشانکردن.",
    loveEn: "Many new moms feel calmer during those first fragile nights when every sound feels urgent.",
    loveKu: "زۆر دایکی نوێ لە شەوی یەکەمەکاندا کە هەر دەنگێک گرنگ دەردەکەوێت، ئاسوودەتر دەبن.",
    bestEn: "Anxious first nights, room-sharing, or when you want wearable tracking without a camera.",
    bestKu: "شەوی یەکەمەکان، هاوبەشبوونی ژوور، یان کاتێک شوێنکەوتنی لەبەرکراو بەبێ کامێرا دەوێت.",
    notEn: "Parents seeking a video feed or those uncomfortable with a foot wearable.",
    notKu: "دایکانی کە ڤیدیۆ دەوێت یان حەز ناکەن شتێک لە پێدا ببەسترێت.",
    pros: [
      bi("Gentle alerts for out-of-range readings", "ئاگاداری نەرم بۆ خوێندنەوەی دەرەوان"),
      bi("No camera — privacy-friendly", "بێ کامێرا — پاراستنی نهێنی"),
      bi("Rechargeable base for overnight use", "پایەی دووبارە شەحنکراوە بۆ شەو"),
    ],
    cons: [
      bi("Sock must fit snugly — sizing matters", "پێچکە دەبێت گونجاو بێت — قەبارە گرنگە"),
      bi("Not a substitute for medical monitoring", "جێگری چاودێری پزیشکی نییە"),
      bi("Occasional false alerts during active sleep", "هەندێک جار ئاگاداری هەڵە لە خەوی چالاک"),
    ],
    cleaning: [
      bi("Hand-wash the fabric sock per Owlet instructions.", "پێچکەی قوماش بەپێی ڕێنمایی Owlet بە دەست بشۆ."),
      bi("Keep the sensor dry before charging.", "پێش شەحنکردنەوە هەستەوەر ووشک بکە."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Never use for diagnosed medical conditions without clinician guidance.", "بەبێ ڕێنمایی پزیشک بۆ دۆخی پزیشکی دیاریکراو بەکارمەهێنە."),
    ],
    faq: [
      { q: bi("Is it safe for newborns?", "ئایا بۆ تازەلەدایکبوو سەلامەتە؟"), a: bi("Owlet lists minimum weight and age. Confirm with your pediatrician for premature or low-birth-weight babies.", "Owlet کەمترین کێش و تەمەن دیاری دەکات. بۆ منداڵی پێش‌وەختە لە پزیشکی منداڵ بپرسە.") },
    ],
    alts: ["nanit-pro", "eufy-spaceview-pro"],
  }),
  product({
    id: "eufy-spaceview-pro", brand: "Eufy", nameEn: "SpaceView Pro", nameKu: "SpaceView Pro",
    category: "monitors", ageEn: "Birth to first year", ageKu: "لە لەدایکبوون تا ساڵی یەکەم",
    tags: ["night", "apartment", "privacy", "gear"],
    whatEn: "Eufy SpaceView Pro is a dedicated parent-unit monitor with a large screen — no Wi‑Fi or app required for live viewing.",
    whatKu: "Eufy SpaceView Pro مۆنیتەرێکە بە شاشەی گەورە — بۆ بینینی ڕاستەوخۆ پێویستی بە Wi‑Fi یان ئەپ نییە.",
    loveEn: "Privacy-minded parents appreciate local-only video without cloud accounts.",
    loveKu: "دایکانی گرنگی بە نهێنی دەدەن حەزیان لە ڤیدیۆی ناوخۆییە بەبێ هەژماری هەور.",
    bestEn: "Apartments, grandparents' homes, or anyone who wants simple plug-and-watch monitoring.",
    bestKu: "شوقە، ماڵی باپیر و دا، یان کەسێک کە مۆنیتەری سادەی دەوێت.",
    notEn: "Those who want phone alerts away from home or sleep analytics.",
    notKu: "ئەوانەی ئاگاداری مۆبایل لە دەرەوەی ماڵ یان شیکاری خەو دەوێت.",
    pros: [
      bi("5-inch display with pan-and-tilt camera", "شاشەی ٥ ئینچ لەگەڵ کامێرای سووڕان"),
      bi("No monthly fees for basic monitoring", "بێ کرێی مانگانە بۆ چاودێری بنەڕەت"),
      bi("Night vision up to 30 feet", "بینینی شەو تا ٣٠ پێ"),
    ],
    cons: [
      bi("Parent unit adds bulk to bedside table", "یەکەی دایک قەبارەی زیاتر لەسەر مێزی جێگا"),
      bi("Range limited by walls and interference", "مەودا بە دیوار و تێکەڵبوون سنووردارە"),
    ],
    cleaning: [
      bi("Wipe screen and camera with soft dry cloth.", "شاشە و کامێرا بە قوماشی نەرم بسڕەوە."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Does it work without internet?", "بەبێ ئینتەرنێت کار دەکات؟"), a: bi("Yes — video travels locally between camera and parent unit.", "بەڵێ — ڤیدیۆ نێوان کامێرا و یەکەی دایک دەگوازرێتەوە.") },
    ],
    alts: ["nanit-pro", "owlet-dream-sock"],
  }),
  product({
    id: "cubo-ai-plus", brand: "Cubo AI", nameEn: "Plus Smart Monitor", nameKu: "مۆنیتەری زیرەکی Plus",
    category: "monitors", ageEn: "Newborn to 12 months", ageKu: "لە تازەلەدایکبوو تا ١٢ مانگ",
    tags: ["sleep", "night", "apartment", "gear"],
    whatEn: "Cubo AI Plus uses AI to detect covered-face and rollover risk alerts, plus HD video and sleep reports.",
    whatKu: "Cubo AI Plus بە زیرەکی دەستکرد ئاگاداری ڕیسکی داپۆشینی ڕخ و سوڕانەوە دەدات، لەگەڵ ڤیدیۆی HD و ڕاپۆرتی خەو.",
    loveEn: "The bird-shaped design feels warm in the nursery, and safety alerts give extra reassurance.",
    loveKu: "شێوەی باڵندە گەرمی بە ژووری منداڵ دەبەخشێت، ئاگادارییەکانی سەلامەتیش ئاسوودەیی زیاتر دەدات.",
    bestEn: "Tech-comfortable moms who want proactive safety notifications with sleep data.",
    bestKu: "دایکانی ئاشنا بە تەکنەلۆژیا کە ئاگاداری سەلامەتی چالاک و زانیاری خەو دەوێت.",
    notEn: "Budget-focused families or those avoiding AI/cloud video storage.",
    notKu: "خێزانەکانی کەمخەرجی یان دوور لە هەور و AI.",
    pros: [
      bi("Face-cover and rollover detection alerts", "ئاگاداری داپۆشین و سوڕانەوە"),
      bi("18-hour playback without subscription tier", "١٨ کاتژمێر پێشبینین بەبێ بەشداربوون"),
      bi("Temperature and humidity sensors built in", "پێوەری پلە گەرمی و شێداری ناوخۆ"),
    ],
    cons: [
      bi("Requires app and Wi‑Fi setup", "دامەزراندنی ئەپ و Wi‑Fi پێویستە"),
      bi("Premium tier needed for extended history", "بۆ مێژووی درێژتر پلانی پریمیوم پێویستە"),
    ],
    cleaning: [
      bi("Dust the stand weekly; avoid harsh cleaners on lens.", "هەفتانە گرد بسڕەوە؛ پاککەرەوەی توند لەسەر لێنز بەکارمەهێنە."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Will it replace safe sleep practices?", "جێگری ڕێنمایی خەوی سەلامەت دەبێت؟"), a: bi("No product replaces back-to-sleep, firm mattress, and empty crib guidelines from your clinician.", "هیچ بەرهەمێک جێگری پشت، جێگای ڕێک و ژووری بەتاڵ نابێت.") },
    ],
    alts: ["nanit-pro", "eufy-spaceview-pro"],
  }),

  // ── CARRIERS (5) ──
  product({
    id: "ergobaby-omni-breeze", brand: "Ergobaby", nameEn: "Omni Breeze", nameKu: "Omni Breeze",
    category: "carriers", ageEn: "7 lbs to 45 lbs (newborn insert optional)", ageKu: "٧ پاوەند تا ٤٥ پاوەند (پێچکەی نوێ لەبەرکراو ئارەزوومەندانە)",
    tags: ["travel", "newborn", "gear", "recovery"],
    whatEn: "Ergobaby Omni Breeze is a breathable all-position carrier — front, hip, and back — with mesh panels for warm climates.",
    whatKu: "Ergobaby Omni Breeze هەڵگرەیەکی هەناسەپێدانی باشە بۆ هەموو شێوازەکان — پێشەوە، لا، و پشت — بە تۆڕی mesh.",
    loveEn: "Hands-free bonding while keeping baby close to your heartbeat calms many fussy newborn moments.",
    loveKu: "بەستنەوەی دەست بەتاڵ لە نزیک دڵەکەت زۆر کات منداڵی ناراحەت ئارام دەکات.",
    bestEn: "Active first-time moms, travel, or recovery when pushing a stroller feels like too much.",
    bestKu: "دایکانی چالاک، گەشت، یان دوای لەدایکبوون کاتێک عەرەبانە قورسە.",
    notEn: "Very hot days without shade, or partners who prefer structured buckles only.",
    notKu: "ڕۆژانی زۆر گەرم بەبێ سایە، یان کەسانی تەنها قفڵی ڕێک دەوێت.",
    pros: [
      bi("Six carry positions as baby grows through year one", "شەش شێوازی هەڵگرتن لەگەڵ گەشەی منداڵ"),
      bi("Lumbar support eases back strain", "پشتیوانی کەمەر بار لە پشت کەم دەکات"),
      bi("Machine-washable without rethreading", "دەکرێت لە ماشیندا بشۆدرێت بەبێ دووبارە ڕێکخستن"),
    ],
    cons: [
      bi("Learning curve for first perfect fit", "فێربوون بۆ گونجاندنی یەکەم"),
      bi("Bulkier than a simple wrap", "قەبارەی زیاتر لە پێچەی سادە"),
    ],
    cleaning: [
      bi("Remove infant insert; wash carrier on gentle cycle.", "پێچکەی نوێ لاببە؛ هەڵگرە بە دورەی نەرم بشۆ."),
      bi("Air-dry fully before next use.", "بە تەواوی ووشک بکە پێش بەکارهێنانی دواتر."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Keep baby's airway visible and chin off chest.", "ڕێڕەوی هەناسەی منداڵ دیار بێت و چنە لەسەر سینگ نەبێت."),
    ],
    faq: [
      { q: bi("Can I use after C-section?", "دوای سزاریەن دەتوانم بەکاریبهێنم؟"), a: bi("Many moms wait until cleared by their clinician — start with short carries and good support.", "زۆر دایک چاوەڕێی ڕێگەپێدانی پزیشک دەکەن — بە هەڵگرتنی کورت دەست پێ بکە.") },
    ],
    alts: ["babybjorn-mini", "babybjorn-harmony", "ergobaby-embrace"],
  }),
  product({
    id: "babybjorn-mini", brand: "BabyBjörn", nameEn: "Mini Carrier", nameKu: "هەڵگرەی Mini",
    category: "carriers", ageEn: "7–24 lbs (approx. newborn to 12 months)", ageKu: "٧–٢٤ پاوەند (نزیکەی تازەلەدایکبوو تا ١٢ مانگ)",
    tags: ["newborn", "travel", "gear"],
    whatEn: "BabyBjörn Mini is a compact, easy-on carrier designed specifically for the earliest weeks when baby is tiny.",
    whatKu: "BabyBjörn Mini هەڵگرەیەکی بچووک و ئاسانە بۆ هەفتە سەرەتاییەکان کاتێک منداڵ زۆر بچووکە.",
    loveEn: "Click-in simplicity means less fuss when you're already overwhelmed.",
    loveKu: "سادەیی چەسپاندن واتە کەمتر ئاڵۆزی کاتێک سەرقاڵیت.",
    bestEn: "Brand-new parents who want the fastest carrier to learn in week one.",
    bestKu: "دایک و باوکی تازە کە خێراترین هەڵگرە بۆ فێربوون لە هەفتەی یەکەم دەوێت.",
    notEn: "Long carries past 12 months or back-carry needs.",
    notKu: "هەڵگرتنی درێژ دوای ١٢ مانگ یان هەڵگرتنی پشت.",
    pros: [
      bi("No separate infant insert needed", "پێچکەی جیا پێویست نییە"),
      bi("Soft jersey lining feels gentle on newborn skin", "پارچەی جێرزی نەرم بۆ پێستی نوێ"),
      bi("Compact fold for diaper bag", " دەتوانیت لە جانتای پارچەدا بپێچیتەوە"),
    ],
    cons: [
      bi("Outgrown sooner than Omni-style carriers", "زووتر لە هەڵگرەی Omni بچووک دەبێت"),
      bi("Limited to front carry only", "تەنها هەڵگرتنی پێشەوە"),
    ],
    cleaning: [
      bi("Machine wash 40°C per label; close all buckles.", "لە ٤٠ پلە بشۆ بەپێی ناونیشان؛ هەموو قفڵەکان دابخە."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Adjust head support so airway stays open.", "پشتیوانی سەر ڕێک بکە بۆ کرانەوەی ڕێڕەوی هەناسە."),
    ],
    faq: [
      { q: bi("Good for breastfeeding on the go?", "بۆ شیردان لە دەرەوە باشە؟"), a: bi("Some moms nurse in carrier with practice — always ensure clear airway after repositioning.", "هەندێک دایک بە ڕاهێنان شیر دەدات — دوای گۆڕینی شوێن ڕێڕەو دیار بکە.") },
    ],
    alts: ["ergobaby-embrace", "babybjorn-harmony", "ergobaby-omni-breeze"],
  }),
  product({
    id: "babybjorn-harmony", brand: "BabyBjörn", nameEn: "Harmony Carrier", nameKu: "هەڵگرەی Harmony",
    category: "carriers", ageEn: "Newborn to 3 years (with settings)", ageKu: "لە تازەلەدایکبوو تا ٣ ساڵ (لەگەڵ ڕێکخستن)",
    tags: ["travel", "gear"],
    whatEn: "BabyBjörn Harmony blends premium mesh comfort with padded waist support for longer daytime carries.",
    whatKu: "BabyBjörn Harmony ئاسوودەیی meshی پریمیوم لەگەڵ پشتیوانی کەمەری نەرم بۆ هەڵگرتنی درێژتر.",
    loveEn: "The silky mesh keeps you cooler during long walks with a growing baby.",
    loveKu: "تۆڕی نەرم لە پیاسەی درێژدا ساردتتر دەهێڵێتەوە.",
    bestEn: "Parents who loved Mini but need more support through the first year.",
    bestKu: "دایکانی حەزیان لە Mini بوو بەڵام پشتیوانی زیاتر بۆ ساڵی یەکەم دەوێت.",
    notEn: "Ultra-budget setups or hip-only carrying preferences.",
    notKu: "بودجەی زۆر کەم یان تەنها هەڵگرتنی لا.",
    pros: [
      bi("Pressure-distributing waist belt", "کەمەری دابەشکەری فشار"),
      bi("Three height settings for growing baby", "سێ ئاستی بەرز بۆ منداڵی گەشەکراو"),
      bi("Front and back carry options", "هەڵگرتنی پێشەوە و پشت"),
    ],
    cons: [
      bi("Premium tier investment", "وەبەرhێنانی پلەی پریمیوم"),
      bi("Slightly wider profile than Mini", "قەبارەی کەمێک گەورەتر لە Mini"),
    ],
    cleaning: [
      bi("Wipe mesh with damp cloth; machine wash padded parts per manual.", "mesh بە قوماشی تەڕ بسڕەوە؛ پارچە نەرمەکان بەپێی ڕێنما بشۆ."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("When can I back-carry?", "کەی دەتوانم لە پشت هەڵیبگرم؟"), a: bi("BabyBjörn lists minimum age/weight for back carry — follow the manual exactly.", "BabyBjörn کەمترین تەمەن/کێش بۆ پشت دیاری دەکات — ڕێنما بە وردی جێبەجێ بکە.") },
    ],
    alts: ["ergobaby-omni-breeze", "babybjorn-mini"],
  }),
  product({
    id: "ergobaby-embrace", brand: "Ergobaby", nameEn: "Embrace Soft Knit", nameKu: "Embrace Soft Knit",
    category: "carriers", ageEn: "7–25 lbs", ageKu: "٧–٢٥ پاوەند",
    tags: ["newborn", "recovery", "gear"],
    whatEn: "Ergobaby Embrace is a soft structured wrap-carrier hybrid — cozy for the fourth trimester without long wrapping.",
    whatKu: "Ergobaby Embrace تێکەڵەی پێچە و هەڵگرەی ڕێکە — گەرم بۆ چوارەم سێ مانگە بەبێ پێچینی درێژ.",
    loveEn: "Feels like a hug; many moms reach for it during cluster-feeding weeks.",
    loveKu: "وەک باوەش دەردەکەوێت؛ زۆر دایک لە هەفتەکانی شیردانی زۆر بەکاری دەهێنن.",
    bestEn: "Recovery after birth, small babies, and moms who find wraps intimidating.",
    bestKu: "چاکبوونەوە دوای لەدایکبوون، منداڵی بچووک، و دایکانی کە پێچە قورس دەزانن.",
    notEn: "Hot summer days or toddlers over 25 lbs.",
    notKu: "هاوینی گەرم یان منداڵی زیاتر لە ٢٥ پاوەند.",
    pros: [
      bi("Crossable straps for snug newborn fit", "لینگە بەستراوەکان بۆ گونجانی نوێ"),
      bi("No buckles on shoulders — easy nursing access", "بێ قفڵ لە شان — دەستگەیشتن بۆ شیردان"),
      bi("Folds small for hospital bag", "بچووک دەپێچرێتەوە بۆ جانتای نەخۆشخانە"),
    ],
    cons: [
      bi("Less airflow than Omni Breeze mesh", "هەناسەپێدان کەمتر لە meshی Omni"),
      bi("Front-inward only", "تەنها پێشەوە ناوەوە"),
    ],
    cleaning: [
      bi("Machine wash cold, gentle; lay flat to dry.", "بە سارد و نەرم بشۆ؛ ڕاست بخەرە سەرەوە بۆ ووشکبوون."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Different from Omni Breeze?", "جیاوازە لە Omni Breeze؟"), a: bi("Embrace is softer and simpler for early weeks; Omni grows longer with more positions.", "Embrace نەرمتر و سادەترە بۆ هەفتە سەرەتاییەکان؛ Omni درێژتر دەگونجێت.") },
    ],
    alts: ["babybjorn-mini", "ergobaby-omni-breeze"],
  }),
  product({
    id: "stokke-limas", brand: "Stokke", nameEn: "Líma Carrier", nameKu: "هەڵگرەی Líma",
    category: "carriers", ageEn: "Newborn to 33 lbs", ageKu: "لە تازەلەدایکبوو تا ٣٣ پاوەند",
    tags: ["travel", "gear"],
    whatEn: "Stokke Líma is a ring-sling-meets-structured carrier with organic cotton and sleek Scandinavian design.",
    whatKu: "Stokke Líma هەڵگرەیەکی ڕێکە بە لۆکەی کۆتۆنی ئۆرگانیک و دیزاینی سکandinavian.",
    loveEn: "Elegant enough that dads proudly wear it too — a subtle confidence boost.",
    loveKu: "جوانە تا باوکیش بە شانازییەوە لەبەری دەکات.",
    bestEn: "Design-conscious families wanting one beautiful carrier through month twelve.",
    bestKu: "خێزانەکانی گرنگی بە دیزاین دەدەن کە هەڵگرەیەکی جوان بۆ تا ١٢ مانگ دەوێت.",
    notEn: "Parents needing maximum ventilation or heavy back-carry loads.",
    notKu: "دایکانی کە هەناسەپێدانی زۆر یان بارێکی قورس لە پشت دەوێت.",
    pros: [
      bi("Three carry positions with one adjuster", "سێ شێوازی هەڵگرتن بە یەک ڕێکخەر"),
      bi("Organic cotton against baby's face", "کۆتۆنی ئۆرگانیک لە بەرامبەر دەم"),
      bi("Compact for city errands", "بچووک بۆ کارەکانی شار"),
    ],
    cons: [
      bi("Premium Stokke pricing", "نرخی پلەی Stokke"),
      bi("Less mesh than sport carriers", "mesh کەمتر لە هەڵگرەی وەرزشی"),
    ],
    cleaning: [
      bi("Spot clean or gentle machine wash in bag.", "خاڵ بە خاڵ بسڕەوە یان بە نەرم لە جانتا بشۆ."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Newborn ready?", "ئامادەیە بۆ تازەلەدایکبوو؟"), a: bi("Yes with included newborn settings — verify fit with knees higher than bum.", "بەڵێ لەگەڵ ڕێکخستنی نوێ — گونجاندن بپشکنە بە knee بەرزتر لە کۆڵ.") },
    ],
    alts: ["babybjorn-harmony", "ergobaby-omni-breeze"],
  }),
];

// Continue with remaining categories in part 2 - for now write what we have and append rest via second script run
// Actually I need ALL products in one file. Let me add the rest to RAW array before writing.

RAW.push(
  // ── STROLLERS (5) ──
  product({
    id: "uppababy-vista-v2", brand: "UPPAbaby", nameEn: "Vista V2", nameKu: "Vista V2",
    category: "strollers", ageEn: "Birth with bassinet or infant car seat", ageKu: "لە لەدایکبوون لەگەڵ bassinet یان کورسی ئۆتۆمبێل",
    tags: ["gear", "travel"],
    whatEn: "UPPAbaby Vista V2 is a full-size modular stroller that accepts bassinet, toddler seat, and second-child adapters.",
    whatKu: "UPPAbaby Vista V2 عەرەبانەیەکی تەواوە کە bassinet، کورسی منداڵ و ئادaptor بۆ منداڵی دووەم وەردەگرێت.",
    loveEn: "One frame grows with your family — smooth ride over sidewalk cracks feels like luxury on tired days.",
    loveKu: "یەک چوارچێوە لەگەڵ خێزانەکەت گەشە دەکات — سواری نەرم لە ڕۆژانی ماندوودا وەک لوکس دەردەکەوێت.",
    bestEn: "Suburban walks, long outings, or planning for a second baby within two years.",
    bestKu: "پیاسەی دەرەوە، گەڕانی درێژ، یان پلان بۆ منداڵی دووەم لە دوو ساڵدا.",
    notEn: "Tiny elevators, frequent air travel, or minimal storage homes.",
    notKu: "ئاسانسۆری بچووک، گەشتی فڕۆکەیی زۆر، یان ماڵی کەم شوێن.",
    pros: [
      bi("Large basket holds a full diaper bag", "سەبەتەی گەورە جانتای پارچە دەگرێت"),
      bi("Reversible toddler seat", "کورسی منداڵی دوولایەنە"),
      bi("One-hand fold with stand", "پێچانەوە بە یەک دەست لەگەڵ پێوەست"),
    ],
    cons: [
      bi("Heavy compared to travel strollers", "قورستر لە عەرەبانەی گەشت"),
      bi("Wide footprint in narrow aisles", "قەبارەی پانی لە ڕێڕەوی تەنگ"),
    ],
    cleaning: [
      bi("Spot clean fabric; remove wheels for mud rinse.", "پارچە خاڵ بە خاڵ بسڕەوە؛ چاکەکان بۆ گڵ بشۆ."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Need separate infant car seat?", "کورسی ئۆتۆمبێلی جیا پێویستە؟"), a: bi("Vista works with UPPAbaby Mesa or adapters for other brands — check compatibility list.", "Vista لەگەڵ Mesa یان ئادaptor کار دەکات — لیستی گونجانی بپشکنە.") },
    ],
    alts: ["bugaboo-fox-5", "bugaboo-butterfly", "doona-plus"],
  }),
  product({
    id: "bugaboo-butterfly", brand: "Bugaboo", nameEn: "Butterfly", nameKu: "Butterfly",
    category: "strollers", ageEn: "6 months to 50 lbs (or from birth with cocoon)", ageKu: "٦ مانگ تا ٥٠ پاوەند (یان لە لەدایکبوون لەگەڵ cocoon)",
    tags: ["travel", "apartment", "gear"],
    whatEn: "Bugaboo Butterfly is an ultra-compact one-second fold stroller built for city life and cabin-friendly travel.",
    whatKu: "Bugaboo Butterfly عەرەبانەیەکی زۆر بچووکە بە پێچانەوەی یەک چرکەیی بۆ ژیانی شار و گەشت.",
    loveEn: "Fits overhead bins on many airlines — freedom for first trips with baby.",
    loveKu: "لە زۆر فڕۆکەدا دەچێتە سەرەوە — ئازادی بۆ یەکەم گەشت لەگەڵ منداڵ.",
    bestEn: "Apartment dwellers, taxis, and parents who fly with baby before month six.",
    bestKu: "نیشتەجێی شوقە، تاکسی، و دایکانی گەشت بە فڕۆکە پێش ٦ مانگ.",
    notEn: "Rough terrain jogging or primary full-size only stroller needs.",
    notKu: "ڕێگای ناڕێک یان تەنها عەرەبانەی گەورە.",
    pros: [
      bi("One-hand fold in one second", "پێچانەوە بە یەک دەست لە یەک چرکە"),
      bi("Light at under 17 lbs", "سووک — کەمتر لە ١٧ پاوەند"),
      bi("Reclining seat for naps on the go", "کورسی ڕاکێشاوە بۆ خەو لە دەرەوە"),
    ],
    cons: [
      bi("Smaller wheels on cobblestones", "چاکی بچووک لە سنگفرەش"),
      bi("Less storage than Vista-class strollers", "کەمتر شوێن لە عەرەبانەی Vista"),
    ],
    cleaning: [
      bi("Wipe frame; hand wash seat fabric.", "چوارچێوە بسڕەوە؛ پارچەی کورسی بە دەست بشۆ."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Newborn safe?", "بۆ تازەلەدایکبوو سەلامەتە؟"), a: bi("Use approved newborn cocoon or wait until baby meets minimum sit-up age per manual.", "cocoonی پەسندکراو بەکاربهێنە یان چاوەڕێی تەمەنی ڕاکێشان بکە.") },
    ],
    alts: ["uppababy-minu-v2", "doona-plus", "bugaboo-fox-5"],
  }),
  product({
    id: "doona-plus", brand: "Doona", nameEn: "Infant Car Seat & Stroller", nameKu: "کورسی ئۆتۆمبێل و عەرەبانەی یەکگرتوو",
    category: "strollers", ageEn: "Birth to ~12 months (weight limit applies)", ageKu: "لە لەدایکبوون تا ~١٢ مانگ (سنووری کێش)",
    tags: ["travel", "newborn", "gear"],
    whatEn: "Doona+ transforms from rear-facing car seat to stroller in seconds — one piece from hospital to café.",
    whatKu: "Doona+ لە چرکەیەکدا لە کورسی ئۆتۆمبێل دەگۆڕێت بۆ عەرەبانە — یەک پارچە لە نەخۆشخانە تا قاوەخانە.",
    loveEn: "No trunk shuffle — a lifesaver for solo outings in month one.",
    loveKu: "بێ جووڵاندن لە سندوق — ڕزگارکەر بۆ گەڕانی تەنها لە مانگی یەکەم.",
    bestEn: "Urban parents, car-heavy lifestyles, and quick errand runs with a newborn.",
    bestKu: "دایکانی شار، ژیانی ئۆتۆمبێل، و کارە خێراکان لەگەڵ نوێ لەدایکبوو.",
    notEn: "Long stroller-only walks past infant seat stage.",
    notKu: "پیاسەی درێژ دوای قۆناغی کورسی نوێ.",
    pros: [
      bi("Integrated wheels — no separate frame", "چاکی ناوخۆ — بێ چوارچێوەی جیا"),
      bi("FAA-approved for air travel", "پەسندکراو بۆ فڕۆکە"),
      bi("Anti-rebound bar for car safety", "میلی دژە گەڕانەوە بۆ سەلامەتی ئۆتۆمبێل"),
    ],
    cons: [
      bi("Outgrown faster than convertible seats", "زووتر لە کورسی گۆڕدراو بچووک دەبێت"),
      bi("Heavier to lift than seat-only", "قورستر لە کورسی تەنها بۆ هەڵگرتن"),
    ],
    cleaning: [
      bi("Remove fabric cover per Doona manual; wipe base.", "پارچە لاببە بەپێی ڕێنما؛ بنکە بسڕەوە."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Always install rear-facing per vehicle manual.", "هەمیشە پشتەوە دامەزرێنە بەپێی ڕێنمای ئۆتۆمبێل."),
    ],
    faq: [
      { q: bi("Stroller and car seat in one?", "عەرەبانە و کورسی یەکێکن؟"), a: bi("Yes — wheels fold under for car mode, extend for strolling.", "بەڵێ — چاکەکان دەپێچرێنەوە بۆ ئۆتۆمبێل، درێژ دەبن بۆ عەرەبانە.") },
    ],
    alts: ["uppababy-vista-v2", "bugaboo-butterfly"],
  }),
  product({
    id: "uppababy-minu-v2", brand: "UPPAbaby", nameEn: "Minu V2", nameKu: "Minu V2",
    category: "strollers", ageEn: "From birth with bassinet kit or 3 months+", ageKu: "لە لەدایکبوون لەگەڵ bassinet یان ٣+ مانگ",
    tags: ["travel", "apartment", "gear"],
    whatEn: "UPPAbaby Minu V2 is a lightweight travel stroller with one-hand fold and optional from-birth bassinet.",
    whatKu: "UPPAbaby Minu V2 عەرەبانەی گەشتی سووکە بە پێچانەوەی یەک دەست و bassinetی ئارەزوومەندانە.",
    loveEn: "UPPAbaby smoothness in a package that fits apartment closets.",
    loveKu: "نەرمی UPPAbaby لە قەبارەیەک کە دەچێتە کۆماری شوقە.",
    bestEn: "Travel-heavy families who still want premium push feel.",
    bestKu: "خێزانی گەشتی زۆر کە هێشتا حەزیان لە سواری پریمیومە.",
    notEn: "Primary off-road or double-stroller needs.",
    notKu: "پێویستی سەرەکی بۆ ڕێگای ناڕێک یان عەرەبانەی دووانە.",
    pros: [
      bi("One-hand fold, self-standing", "پێچانەوە بە یەک دەست، بە پێی خۆی دەبێت"),
      bi("Large peek-a-boo window", "پەنجەرەی گەورە بۆ بینینی منداڵ"),
      bi("Car seat compatible with adapters", "گونجاو لەگەڵ ئادaptor بۆ کورسی ئۆتۆمبێل"),
    ],
    cons: [
      bi("Smaller basket than Vista", "سەبەتەی بچووکتر لە Vista"),
      bi("Bassinet sold separately", "bassinet بە جیا دەفرۆشرێت"),
    ],
    cleaning: [
      bi("Spot clean seat; air wheels after wet walks.", "کورسی خاڵ بە خاڵ؛ چاکەکان دوای باران ووشک بکە."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Butterfly or Minu?", "Butterfly یان Minu؟"), a: bi("Butterfly is smaller for flight; Minu offers smoother ride and UPPAbaby ecosystem.", "Butterfly بچووکترە بۆ فڕۆکە؛ Minu سواری نەرمتر و سیستەمی UPPAbaby.") },
    ],
    alts: ["bugaboo-butterfly", "doona-plus"],
  }),
  product({
    id: "bugaboo-fox-5", brand: "Bugaboo", nameEn: "Fox 5", nameKu: "Fox 5",
    category: "strollers", ageEn: "Birth to 50 lbs", ageKu: "لە لەدایکبوون تا ٥٠ پاوەند",
    tags: ["gear", "travel"],
    whatEn: "Bugaboo Fox 5 is an all-terrain full-size stroller with advanced suspension for newborn through year one.",
    whatKu: "Bugaboo Fox 5 عەرەبانەی تەواوە بۆ هەموو ڕێگا لەگەڵ سپەنسنی پێشکەوتوو بۆ ساڵی یەکەم.",
    loveEn: "Glides over curbs and park paths — baby sleeps through the bumps.",
    loveKu: "بە نەرمی لەسەر قەراغ و ڕێگای باخ دەڕوات — منداڵ لە بەرزبوونەوە خەو دەبێت.",
    bestEn: "Daily long walks, mixed terrain, and one premium main stroller.",
    bestKu: "پیاسەی درێژی ڕۆژانە، ڕێگای تێکەڵ، و یەک عەرەبانەی سەرەکی پریمیوم.",
    notEn: "Ultra-compact travel-only or tight storage.",
    notKu: "تەنها گەشتی زۆر بچووک یان شوێنی کەم.",
    pros: [
      bi("Best-in-class suspension", "سپەنسنی لە پۆلدا باشترین"),
      bi("Large wheels and robust frame", "چاکی گەورە و چوارچێوەی بەهێز"),
      bi("Extendable sun canopy", "سایبانی درێژکراوە"),
    ],
    cons: [
      bi("Heavy and wide", "قورس و پان"),
      bi("Premium investment", "وەبەرهێنانی پریمیوم"),
    ],
    cleaning: [
      bi("Brush mud from tires; machine wash removable fabric.", "گڵ لە تایەر بسڕەوە؛ پارچەی لابراو بشۆ."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Fox 5 vs Vista?", "Fox 5 بەرامبەر Vista؟"), a: bi("Fox excels on rough paths; Vista modularity suits growing families with second seat.", "Fox لە ڕێگای ناڕێک باشترە؛ Vista بۆ خێزانی گەشەکراو بە کورسی دووەم.") },
    ],
    alts: ["uppababy-vista-v2", "bugaboo-butterfly"],
  }),
);

// PUMPS (5)
RAW.push(
  product({
    id: "medela-freestyle-flex", brand: "Medela", nameEn: "Freestyle Flex", nameKu: "Freestyle Flex",
    category: "pumps", ageEn: "When breastfeeding begins", ageKu: "کاتێک شیرپێدان دەست پێ دەکات",
    tags: ["feeding", "travel", "recovery"],
    whatEn: "Medela Freestyle Flex is a hospital-trusted double electric pump with rechargeable battery for pumping anywhere.",
    whatKu: "Medela Freestyle Flex پەمپی کارەبایی دووانەیە بە متمانەی نەخۆشخانە و باتری دووبارە شەحنکراوە.",
    loveEn: "Reliable suction rhythm helps maintain supply when returning to work or after a long night.",
    loveKu: "ڕیتمی متمانەپێکراو یارمەتی دەدات کاتێک دەگەڕیتەوە بۆ کار یان دوای شەوێکی درێژ.",
    bestEn: "Exclusive or combo feeders building a freezer stash.",
    bestKu: "شیردەرانی تەواو یان تێکەڵ کە شیر پاشەکەوت دەکەن.",
    notEn: "Occasional manual-only pumpers or formula-only families.",
    notKu: "تەنها پەمپی دەستی یان تەنها شیرخۆراک.",
    pros: [
      bi("Portable with USB rechargeable battery", "گەڕاوە لەگەڵ باتری USB"),
      bi("Medela PersonalFit Flex flanges", "فلنجی PersonalFit Flex"),
      bi("Quiet enough for office pumping", "ئارام بەپێی پەمپکردن لە ئۆفیس"),
    ],
    cons: [
      bi("Multiple parts to wash after each session", "چەند پارچە دوای هەر جارێک دەشۆدرێت"),
      bi("Replacement valves wear over months", "سوپاپەکان لەگەڵ مانگەکان دەبەزێت"),
    ],
    cleaning: [
      bi("Disassemble and wash all milk-contact parts after use.", "پارچەکانی پەیوەندیدار بە شیر دوای بەکارهێنان بشۆ."),
      bi("Sterilize daily in early weeks if advised.", "لە هەفتە سەرەتاییەکان ڕۆژانە ستەریلایز بکە ئەگەر پێویست بوو."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Use only food-safe storage bags and dated labels.", "تەنها جانتای سەلامەت بۆ خۆراک و بەروار بەکاربهێنە."),
    ],
    faq: [
      { q: bi("Hospital grade?", "ئاستی نەخۆشخانەیە؟"), a: bi("Medela is widely used clinically; personal pumps differ from rental hospital units.", "Medela بە فراوانی لە نەخۆشخانە بەکاردێت؛ پەمپی کەسی جیاوازە لە کرێ.") },
    ],
    alts: ["spectra-s1-plus", "elvie-pump", "momcozy-s12-pro"],
  }),
  product({
    id: "spectra-s1-plus", brand: "Spectra", nameEn: "S1 Plus", nameKu: "S1 Plus",
    category: "pumps", ageEn: "From first latch through weaning", ageKu: "لە یەکەم شیردان تا وەستان",
    tags: ["feeding", "recovery"],
    whatEn: "Spectra S1 Plus is a gentle closed-system double pump loved for letdown mode and night-friendly backlight.",
    whatKu: "Spectra S1 Plus پەمپی دووانەی نەرمە بە سیستەمی داخراو، حەزیان لە دۆخی letdown و ڕووناکی شەوە.",
    loveEn: "Many lactation consultants recommend Spectra for comfortable, efficient sessions.",
    loveKu: "زۆر ڕاوێژکاری شیردان Spectra پێشنیار دەکەن بۆ دانیشتنی ئاسوودە.",
    bestEn: "Home primary pump with strong letdown response needs.",
    bestKu: "پەمپی سەرەکی ماڵ بۆ letdownی باش.",
    notEn: "Ultra-compact wearable-only preference.",
    notKu: "تەنها پەمپی لەبەرکراوی بچووک.",
    pros: [
      bi("Closed system — milk never enters motor", "سیستەمی داخراو — شیر ناچێتە مووتۆر"),
      bi("Adjustable cycle and suction", "خول و کێش ڕێکدەکرێت"),
      bi("Built-in rechargeable battery", "باتری ناوخۆ"),
    ],
    cons: [
      bi("Less discreet than wearables", "کەمتر نهێنی لە لەبەرکراو"),
      bi("Requires outlet or charged battery", "پێویستی بە کارەبا یان باتری"),
    ],
    cleaning: [
      bi("Wash breast shields, valves, bottles after each use.", "قەڵغان، سوپاپ، بوتڵ دوای هەر بەکارهێنانێک بشۆ."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("S1 or S2?", "S1 یان S2؟"), a: bi("S1 has battery; S2 is plug-in only — same suction performance.", "S1 باتری هەیە؛ S2 تەنها پلەگ — هەمان کێش.") },
    ],
    alts: ["medela-freestyle-flex", "philips-avent-double"],
  }),
  product({
    id: "elvie-pump", brand: "Elvie", nameEn: "Pump", nameKu: "پەمپی Elvie",
    category: "pumps", ageEn: "Established milk supply", ageKu: "کاتێک شیر بەردەستە",
    tags: ["feeding", "travel", "apartment"],
    whatEn: "Elvie Pump is a silent wearable breast pump that fits inside your bra — pump while walking or working.",
    whatKu: "Elvie Pump پەمپی لەبەرکراوی بێدەنگە کە دەچێتە ناو سutyen — لە کاتی پیاسە یان کار پەمپ بکە.",
    loveEn: "Freedom to pump during a video call without disappearing to a lactation room.",
    loveKu: "ئازادی پەمپکردن لە کاتی پەیوەندی ڤیدیۆیی بەبێ ڕۆیشتن بۆ ژووری تایبەت.",
    bestEn: "Working moms, multitaskers, and modest pumping in shared spaces.",
    bestKu: "دایکانی کار، فرەکار، و پەمپکردنی نهێنی لە شوێنی هاوبەش.",
    notEn: "Early engorgement days when output tracking matters most.",
    notKu: "ڕۆژەکانی پڕبوونی سینگ لە سەرەتادا.",
    pros: [
      bi("Truly hands-free and quiet", "بەڕاستی دەست بەتاڵ و بێدەنگ"),
      bi("App tracks volume per side", "ئەپ قەبارە بۆ هەر لایەن دەپێوێت"),
      bi("Fewer visible tubes", "تۆوبی کەمتر دیار"),
    ],
    cons: [
      bi("Premium cost; parts replacement adds up", "نرخی پریمیوم؛ پارچە گۆڕینەوە"),
      bi("Fit depends on flange sizing", "گونجانی بە قەبارەی فلنج"),
    ],
    cleaning: [
      bi("Wash funnel, valve, and bottle after each session.", "قوڵ، سوپاپ، بوتڵ دوای هەر جارێک بشۆ."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Can others tell I'm pumping?", "کەس دەزانێت پەمپ دەکەم؟"), a: bi("Much less visible than traditional pumps — still wear layers for discretion.", "زۆر کەمتر دیارە — هێشتا چەند لایەرت لەبەر بکە.") },
    ],
    alts: ["momcozy-s12-pro", "medela-freestyle-flex"],
  }),
  product({
    id: "momcozy-s12-pro", brand: "Momcozy", nameEn: "S12 Pro", nameKu: "S12 Pro",
    category: "pumps", ageEn: "When pumping routine starts", ageKu: "کاتێک ڕۆتینی پەمپ دەست پێ دەکات",
    tags: ["feeding", "travel"],
    whatEn: "Momcozy S12 Pro is a popular wearable pump with strong suction and app control at a more accessible tier.",
    whatKu: "Momcozy S12 Pro پەمپی لەبەرکراوی بەناوبانگە بە کێشی باش و کۆntrۆڵی ئەپ.",
    loveEn: "Solid wearable performance without the highest premium tier.",
    loveKu: "کارایی باشی لەبەرکراو بەبێ بەرزترین پلەی پریمیوم.",
    bestEn: "Budget-conscious combo feeders wanting hands-free pumping.",
    bestKu: "شیردەرانی کەمخەرجی کە پەمپی دەست بەتاڵ دەوێت.",
    notEn: "Those needing hospital-grade rental replacement.",
    notKu: "ئەوانەی پێویستی بە پەمپی کرێی نەخۆشخانە.",
    pros: [
      bi("Double wearable with LED display", "دوولایەنە لەبەرکراو لەگەڵ شاشە"),
      bi("Multiple flange sizes in box", "چەند قەبارەی فلنج لە سندووق"),
      bi("Good battery life for workday", "ژیانی باتری باش بۆ ڕۆژی کار"),
    ],
    cons: [
      bi("Slightly louder than Elvie", "کەمێک دەنگی زیاتر لە Elvie"),
      bi("App pairing can be finicky", "بەستنەوەی ئەپ هەندێک جار قورسە"),
    ],
    cleaning: [
      bi("Rinse immediately; full wash within two hours.", "یەکسەر بشۆ؛ تەواو لە دوو کاتژمێردا."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Momcozy vs Elvie?", "Momcozy بەرامبەر Elvie؟"), a: bi("Both wearables — Elvie is quieter/premium; Momcozy offers strong value.", "هەردوو لەبەرکراون — Elvie بێدەنگتر/پریمیوم؛ Momcozy بەها باش.") },
    ],
    alts: ["elvie-pump", "spectra-s1-plus"],
  }),
  product({
    id: "philips-avent-double", brand: "Philips Avent", nameEn: "Double Electric Breast Pump", nameKu: "پەمپی کارەبایی دووانە",
    category: "pumps", ageEn: "From early breastfeeding", ageKu: "لە سەرەتای شیرپێدان",
    tags: ["feeding"],
    whatEn: "Philips Avent double electric pump pairs Natural motion technology with familiar Avent bottle ecosystem.",
    whatKu: "پەمپی Philips Avent دووانە بە تەکنەلۆژیای Natural motion لەگەڵ سیستەمی بوتڵی Avent.",
    loveEn: "One brand from pump to bottle simplifies washing and storage routines.",
    loveKu: "یەک براند لە پەمپ تا بوتڵ شوشتن و پاشەکەوت سادە دەکات.",
    bestEn: "Avent bottle families wanting matched parts and easy store availability.",
    bestKu: "خێزانی بوتڵی Avent کە پارچەی یەکسان و بەردەستی ئاسان دەوێت.",
    notEn: "Maximum portability or silent wearable needs.",
    notKu: "گەڕانەوەی زۆر یان لەبەرکراوی بێدەنگ.",
    pros: [
      bi("Natural motion mimics baby rhythm", "Natural motion وەک منداڵ"),
      bi("Compact unit for bedside", "یەکەی بچووک بۆ لای جێگا"),
      bi("Works with Avent storage cups", "لەگەڵ کوپەکانی Avent"),
    ],
    cons: [
      bi("Plug-in only on base model", "تەنها پلەگ لە مۆدێلی بنەڕەت"),
      bi("Less app features than smart pumps", "تایبەتمەندی ئەپ کەمتر"),
    ],
    cleaning: [
      bi("Dishwasher-safe parts on top rack.", "پارچەکان لە سەرەوەی ماشین."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Same bottles as Natural Response?", "هەمان بوتڵی Natural Response؟"), a: bi("Yes — shared neck fits Avent Natural and Anti-colic lines.", "بەڵێ — گردنی هاوبەش لەگەڵ Natural و Anti-colic.") },
    ],
    alts: ["spectra-s1-plus", "medela-freestyle-flex"],
  }),
);

// BOTTLES (5)
RAW.push(
  product({
    id: "philips-avent-natural", brand: "Philips Avent", nameEn: "Natural Response Bottle", nameKu: "بوتڵی Natural Response",
    category: "bottles", ageEn: "Newborn through first year", ageKu: "لە تازەلەدایکبوو تا ساڵی یەکەم",
    tags: ["feeding", "newborn"],
    whatEn: "Philips Avent Natural Response releases milk only when baby actively drinks — paced feeding friendly.",
    whatKu: "Philips Avent Natural Response شیر تەنها کاتێک دەردەچێت منداڵ بە چالاکی دەخوات — بۆ خواردنی هێواش.",
    loveEn: "Wide breast-like nipple eases combo feeding transitions.",
    loveKu: "مژەی پانی وەک سینگ گواستنەوەی شیر/بوتڵ ئاسان دەکات.",
    bestEn: "Combo feeders and moms switching between breast and bottle.",
    bestKu: "شیردەرانی تێکەڵ و گۆڕان لە سینگ بۆ بوتڵ.",
    notEn: "Severe reflux needing vented anti-colic systems only.",
    notKu: "گەڕانەوەی توند کە تەنها سیستەمی دژە کۆلیک دەوێت.",
    pros: [
      bi("No-drip nipple design", "مژەی بێ دڕێژە"),
      bi("Clear volume markings", "نیشانەی ڕوونی قەبارە"),
      bi("Dishwasher safe", "دەکرێت لە ماشیندا بشۆدرێت"),
    ],
    cons: [
      bi("More parts than single-piece bottles", "پارچەی زیاتر"),
      bi("Nipple flow must match baby's pace", "ڕێڕەو دەبێت لەگەڵ خێرایی منداڵ بگونجێت"),
    ],
    cleaning: [
      bi("Disassemble nipple ring fully; sterilize in early weeks.", "مژە بە تەواوی لاببە؛ لە سەرەتادا ستەریلایز بکە."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Which flow for newborn?", "کام ڕێڕەو بۆ تازەلەدایکبوو؟"), a: bi("Start with flow 1; move up only if baby collapses nipple or gets frustrated.", "لە flow 1 دەست پێ بکە؛ تەنها ئەگەر منداڵ مژە دەکێشێت بەرز بکە.") },
    ],
    alts: ["comotomo-natural-feel", "dr-browns-options-plus", "tommee-tippee-closer"],
  }),
  product({
    id: "comotomo-natural-feel", brand: "Comotomo", nameEn: "Natural Feel Baby Bottle", nameKu: "بوتڵی Natural Feel",
    category: "bottles", ageEn: "Newborn to 12 months", ageKu: "لە تازەلەدایکبوو تا ١٢ مانگ",
    tags: ["feeding", "newborn"],
    whatEn: "Comotomo bottles are soft silicone with wide mound nipples — squeezable and warm to the touch.",
    whatKu: "بوتڵی Comotomo سیلیکۆنی نەرمە بە مژەی پان — دەفشاریت و گەرمە.",
    loveEn: "Babies who rejected harder bottles sometimes accept Comotomo's skin-like feel.",
    loveKu: "منداڵانی ڕەتکردەوەی بوتڵی ڕێک حەزیان لە هەستی وەک پێست.",
    bestEn: "Breastfed babies refusing other bottle shapes.",
    bestKu: "منداڵی شیرخۆر کە شێوەی بوتڵی تر ڕەت دەکات.",
    notEn: "Caregivers who prefer rigid glass for durability.",
    notKu: "چاودێرانی کە شیشەی ڕێک دەوێت.",
    pros: [
      bi("Soft silicone resists slips", "سیلیکۆن نەرم دەلنگێنێت"),
      bi("Wide neck easy to fill and clean", "گردنی پان بۆ پڕکردن و پاککردن"),
      bi("Dual anti-colic vents", "دوو کونتڕۆڵی دژە کۆلیک"),
    ],
    cons: [
      bi("Silicone can stain from formula", "سیلیکۆن لە شیرخۆراک ڕەنگ دەگرێت"),
      bi("Not microwave-safe for heating milk", "بۆ گەرmkردنی شیر لە مایکرۆوەیڤ نا"),
    ],
    cleaning: [
      bi("Boil-safe for sterilizing; avoid abrasive sponges.", "بۆ ستەریلایزکردن دەجوڵێت؛ قوماشی توند بەکارمەهێنە."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Good for colic?", "بۆ کۆلیک باشە؟"), a: bi("Vents help; severe reflux may still need Dr Brown's style — ask your clinician.", "کونتڕۆڵ یارمەتی دەدات؛ گەڕانەوەی توند لەوانەیە Dr Brown's پێویست بێت.") },
    ],
    alts: ["philips-avent-natural", "dr-browns-options-plus"],
  }),
  product({
    id: "dr-browns-options-plus", brand: "Dr Brown's", nameEn: "Options+ Narrow Bottle", nameKu: "بوتڵی Options+",
    category: "bottles", ageEn: "Premature-friendly through year one", ageKu: "گونجاو بۆ پێش‌وەختە تا ساڵی یەکەم",
    tags: ["feeding", "newborn"],
    whatEn: "Dr Brown's Options+ internal vent system reduces air swallowed during feeds — classic for gassy newborns.",
    whatKu: "سیستەمی ventی ناوخۆیی Dr Brown's کەمکردنەوەی هەوای خواردن — کلاسیک بۆ منداڵی گازی.",
    loveEn: "Pediatricians often mention it when spit-up dominates early weeks.",
    loveKu: "پزیشکی منداڵ زۆرجار ئاماژەی پێ دەکات کاتێک gag لە هەفتە یەکەمەکان.",
    bestEn: "Gassy babies, NICU graduates, and detailed washer routines.",
    bestKu: "منداڵی گازی، دەرچووی NICU، و ڕۆتینی پاککردنی ورد.",
    notEn: "Minimal-parts travel bottle needs.",
    notKu: "بوتڵی گەشت بە پارچەی کەم.",
    pros: [
      bi("Proven anti-colic vent (optional insert)", "ventی دژە کۆلیک (ئارەزوومەندانە)"),
      bi("Narrow shape fits small hands later", "شێوەی تەنگ بۆ دەستی بچووک"),
      bi("Glass and plastic options", "شیشە و پلاستیک"),
    ],
    cons: [
      bi("Extra vent parts to wash", "پارچەی ventی زیاتر"),
      bi("Leaks if not assembled tightly", "دەچێت ئەگەر بە توندی نەبەسترێت"),
    ],
    cleaning: [
      bi("Use vent brush; replace worn vent inserts.", "فırçey vent؛ ventی بەسەرچوو بگۆڕە."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Use vent or not?", "vent بەکاربهێنم؟"), a: bi("Options+ lets you remove vent as baby outgrows gas — follow manual stages.", "Options+ دەتوانی vent لاببیت — قۆناغەکانی ڕێنما.") },
    ],
    alts: ["philips-avent-anti-colic", "comotomo-natural-feel"],
  }),
  product({
    id: "tommee-tippee-closer", brand: "Tommee Tippee", nameEn: "Closer to Nature Bottle", nameKu: "بوتڵی Closer to Nature",
    category: "bottles", ageEn: "Birth to 12 months", ageKu: "لە لەدایکبوون تا ١٢ مانگ",
    tags: ["feeding"],
    whatEn: "Tommee Tippee Closer to Nature mimics breast flex with a soft star-shaped nipple and easy-latch shape.",
    whatKu: "Tommee Tippee Closer to Nature مژەی نەرمی وەک سینگ بە شێوەی ئەستێرە.",
    loveEn: "Affordable and everywhere — easy for grandparents to match your setup.",
    loveKu: "بەردەست و هەر شوێنێک — باپیر و دا ئاسان دەگونجێن.",
    bestEn: "Wide support network and backup bottles at grandma's house.",
    bestKu: "تۆڕی پشتیوانی فراو و بوتڵی یەدەگ لە ماڵی باپیر.",
    notEn: "Premium silicone-only preference.",
    notKu: "تەنها سیلیکۆنی پریمیوم.",
    pros: [
      bi("Breast-like flex and stretch", "نەرمی وەک سینگ"),
      bi("Anti-colic valve built in", "valveی دژە کۆلیک"),
      bi("Easy to find replacement nipples", "مژەی گۆڕینەوە بەردەست"),
    ],
    cons: [
      bi("Can leak if over-tightened ring", "دەچێت ئەگەر زۆر توند ببەسترێت"),
      bi("Measurements harder to read on frosted plastic", "نیشانە لە پلاستیکی تاریک قورستر"),
    ],
    cleaning: [
      bi("Top-rack dishwasher; check valve seating.", "سەرەوەی ماشین؛ valve بپشکنە."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Anti-colic version?", "وەشانی دژە کۆلیک؟"), a: bi("Closer line includes anti-colic vents — compare with Advanced Anti-Colic for heavier reflux.", "Closer vent هەیە — Advanced Anti-Colic بۆ gagی زیاتر.") },
    ],
    alts: ["philips-avent-natural", "tommee-tippee-closer"],
  }),
  product({
    id: "philips-avent-anti-colic", brand: "Philips Avent", nameEn: "Anti-colic Bottle with AirFree vent", nameKu: "بوتڵی دژە کۆلیک",
    category: "bottles", ageEn: "Newborn through 12 months", ageKu: "لە تازەلەدایکبوو تا ١٢ مانگ",
    tags: ["feeding", "newborn"],
    whatEn: "Philips Avent Anti-colic keeps nipple full even when bottle is tilted — less air, less fuss.",
    whatKu: "Philips Avent Anti-colic مژە پڕ دەهێڵێتەوە تەنانەت کاتێک بوتڵ لای دەچێت — کەمتر هەوا، کەمتر ناراحەتی.",
    loveEn: "AirFree vent is simpler to wash than multi-piece Dr Brown's for some families.",
    loveKu: "AirFree سادەترە بۆ شوشتن لە Dr Brown's بۆ هەندێک خێزان.",
    bestEn: "Colicky weeks with preference for Avent ecosystem.",
    bestKu: "هەفتەکانی کۆلیک لەگەڵ سیستەمی Avent.",
    notEn: "Ultra-soft silicone bottle feel seekers.",
    notKu: "ئەوانەی هەستی سیلیکۆنی زۆر نەرم دەوێت.",
    pros: [
      bi("Nipple stays full of milk", "مژە پڕی شیر دەمێنێت"),
      bi("Compatible with Avent pump parts", "گونجاو لەگەڵ پارچەی پەمپ"),
      bi("Clear ergonomic shape", "شێوەی ئەرگۆنۆمیکی ڕوون"),
    ],
    cons: [
      bi("Still multiple parts vs single-piece", "هێشتا چەند پارچە"),
      bi("Vent must align correctly", "vent دەبێت ڕاست بێت"),
    ],
    cleaning: [
      bi("Align AirFree vent after washing.", "دوای شوشتن vent ڕێک بکە."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Natural or Anti-colic?", "Natural یان Anti-colic؟"), a: bi("Anti-colic if gas dominates; Natural if latch transition is priority.", "Anti-colic ئەگەر گاز زۆرە؛ Natural ئەگەر گواستنەوە گرنگە.") },
    ],
    alts: ["dr-browns-options-plus", "philips-avent-natural"],
  }),
);

// SOOTHING (5)
RAW.push(
  product({
    id: "bibs-colour", brand: "BIBS", nameEn: "Colour Pacifier", nameKu: "مژۆکی Colour",
    category: "soothing", ageEn: "0–6 months (size 1)", ageKu: "٠–٦ مانگ (قەبارە ١)",
    tags: ["newborn", "sleep"],
    whatEn: "BIBS Colour is a Danish natural-rubber pacifier with iconic round shield — gentle on newborn skin.",
    whatKu: "BIBS Colour مژۆکی لاستیکی سروشتی دانمارکیە بە قalkanێکی بازنەیی — نەرم بۆ پێستی نوێ.",
    loveEn: "The muted colours feel calm in photos and nursery trays alike.",
    loveKu: "ڕەنگە نەرمەکان ئارام دەردەکەون لە وێنە و سینی ژووری منداڵ.",
    bestEn: "Soothing during fussy evenings and safe-sleep aware families using pacifiers.",
    bestKu: "ئارامکردن لە ئێوارەی ناراحەت و خێزانی ئاگادار بە خەوی سەلامەت.",
    notEn: "Latex allergies or pacifier-free parenting choices.",
    notKu: "هەساسی لاتێکس یان بڕیاری بێ مژۆک.",
    pros: [
      bi("One-piece natural rubber nipple", "مژەی لاستیکی یەک پارچە"),
      bi("Orthodontic shape options", "شێوەی ئۆرتۆدۆنتیک"),
      bi("Replace every 4–6 weeks per brand guidance", "هەر ٤–٦ هەفتە بگۆڕە"),
    ],
    cons: [
      bi("Rubber can stick together when wet", "لاتێکس لە تەڕی دەچسبێت"),
      bi("Not dishwasher safe — hand wash only", "لە ماشین نا — تەنها دەست"),
    ],
    cleaning: [
      bi("Boil 5 minutes before first use; hand wash daily.", "پێش یەکەم بەکارهێنان ٥ خولەک بجوڵێنە؛ ڕۆژانە بە دەست."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Never tie pacifier with string to crib.", "هەرگیز مژۆک بە پێچە بەست مەبە بە تەخت."),
    ],
    faq: [
      { q: bi("Size 1 or 2?", "قەبارە ١ یان ٢؟"), a: bi("Size 1 for 0–6 months; move to 2 when baby outgrows or per package.", "١ بۆ ٠–٦ مانگ؛ ٢ کاتێک گەورە بوو.") },
    ],
    alts: ["philips-soothie", "fridababy-nosefrida"],
  }),
  product({
    id: "philips-soothie", brand: "Philips Avent", nameEn: "Soothie Pacifier", nameKu: "مژۆکی Soothie",
    category: "soothing", ageEn: "Premature and newborn (0–3 months)", ageKu: "پێش‌وەختە و تازەلەدایکبوو (٠–٣ مانگ)",
    tags: ["newborn", "feeding"],
    whatEn: "Philips Avent Soothie is the hospital-distributed one-piece silicone pacifier — ultra lightweight.",
    whatKu: "Philips Avent Soothie مژۆکی یەک پارچەی سیلیکۆنی نەخۆشخانەیە — زۆر سووک.",
    loveEn: "Many NICU families recognize it instantly — comforting familiarity.",
    loveKu: "خێزانی NICU یەکسەر دەناسن — ئاشناوە و ئارامکەر.",
    bestEn: "Brand-new babies, preemies, and first pacifier trials.",
    bestKu: "منداڵی تازە، پێش‌وەختە، یەکەم تاقیکردنەوەی مژۆک.",
    notEn: "Older babies needing larger shield sizes.",
    notKu: "منداڵی گەورەتر کە قalkanێکی گەورەتر دەوێت.",
    pros: [
      bi("One piece — easy to sterilize", "یەک پارچە — ستەریلایز ئاسان"),
      bi("Orthodontic symmetrical nipple", "مژەی ئۆرتۆدۆنتیکی هاوتاک"),
      bi("Used in many birth centers", "لە زۆر ناوەندی لەدایکبوون"),
    ],
    cons: [
      bi("Outgrown by 3–4 months for many babies", "زۆر منداڵ لە ٣–٤ مانگ بچووک دەبێت"),
      bi("No handle loop", "حلقەی دەستگیر نییە"),
    ],
    cleaning: [
      bi("Boil or sterilizer safe; inspect for bites daily.", "بجوڵێنە یان ستەریلایز؛ گازندە بپشکنە."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Interfere with breastfeeding?", "کاریگەری لە شیردان؟"), a: bi("Offer after latch is established; discuss timing with lactation support if concerned.", "دوای دامەزراندنی شیردان پێشکەش بکە؛ لەگەڵ ڕاوێژکار بدوێ.") },
    ],
    alts: ["bibs-colour", "hatch-rest-plus"],
  }),
  product({
    id: "fridababy-nosefrida", brand: "FridaBaby", nameEn: "NoseFrida Nasal Aspirator", nameKu: "NoseFrida",
    category: "soothing", ageEn: "Newborn through first cold season", ageKu: "لە تازەلەدایکبوو تا وەرزی یەکەمی ساردی",
    tags: ["newborn", "normal"],
    whatEn: "FridaBaby NoseFrida uses parent-powered suction through a hygienic filter — clears stuffy newborn noses.",
    whatKu: "FridaBaby NoseFrida بە کێشی دایک/باوک و فیلتەری پاک دم\Mخۆر دەپاک دەکات.",
    loveEn: "Instant relief when baby can't feed or sleep because of congestion.",
    loveKu: "ئارامکردنی خێرا کاتێک منداڵ ناتوانێت بخوات یان بخەوێت.",
    bestEn: "First cold season panic and stuffy-nose newborn days.",
    bestKu: "ترسی وەرزی یەکەمی ساردی و ڕژانی نوێ.",
    notEn: "Parents uncomfortable with oral suction method.",
    notKu: "دایکانی ناڕاحەت لە شێوازی مژە.",
    pros: [
      bi("More effective than bulb syringe for many", "کاریگەرتر لە سرنجەی bulb"),
      bi("Disposable filters prevent mucus transfer", "فیلتەر قیڕ ناگوازێتەوە"),
      bi("No batteries", "بێ باتری"),
    ],
    cons: [
      bi("Requires practice and calm timing", "ڕاهێنان و کاتی ئارام پێویستە"),
      bi("Filters are ongoing consumable", "فیلتەر بەردەوام دەخوازێت"),
    ],
    cleaning: [
      bi("Wash large tube with soap; replace filter after each session.", "تۆوبی گەورە بشۆ؛ فیلتەر دوای هەر جارێک."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Never use on irritated or bleeding nasal passages.", "لە ڕێڕەوی بریندار بەکارمەهێنە."),
    ],
    faq: [
      { q: bi("Is it hygienic?", "پاکە؟"), a: bi("Filter blocks mucus; never blow into baby's nose without filter in place.", "فیلتەر قیڕ ڕادەگرێت؛ بەبێ فیلتەر مەدە.") },
    ],
    alts: ["fridababy-humidifier", "braun-thermoscan-7"],
  }),
  product({
    id: "hatch-rest-plus", brand: "Hatch", nameEn: "Rest+ Sound Machine", nameKu: "Rest+",
    category: "soothing", ageEn: "Birth through nursery years", ageKu: "لە لەدایکبوون",
    tags: ["sleep", "night", "apartment"],
    whatEn: "Hatch Rest+ combines white noise, night light, and time-to-rise cues controlled from your phone.",
    whatKu: "Hatch Rest+ دەنگی سپی، ڕووناکی شەو و ئاماژەی کاتی هەستان لە مۆبایلەوە.",
    loveEn: "One gentle tap routine becomes your whole family's sleep signal.",
    loveKu: "یەک ڕیتمی نەرم دەبێتە ئاماژەی خەو بۆ هەموو خێزان.",
    bestEn: "Apartment noise masking and consistent bedtime cues from month one.",
    bestKu: "شاردنەوەی دەنگی شوقە و ئاماژەی خەو لە مانگی یەکەم.",
    notEn: "Fully offline-only nurseries without Wi‑Fi.",
    notKu: "ژووری منداڵی تەواو ئۆفلاین.",
    pros: [
      bi("App schedules for naps and nights", "خشتەی ئەپ بۆ خەو و دوانیوەڕۆ"),
      bi("Soft glow for diaper changes", "ڕووناکی نەرم بۆ گۆڕینی پارچە"),
      bi("Library of sounds including lullabies", "کۆمەڵە دەنگ لەوانە لالایی"),
    ],
    cons: [
      bi("Premium vs basic sound machines", "پریمیوم بەرامبەر دەنگی سادە"),
      bi("App required for full features", "ئەپ بۆ تەواوی تایبەتمەندی"),
    ],
    cleaning: [
      bi("Dust weekly; wipe with dry cloth only.", "هەفتانە گرد بسڕەوە."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Too loud for newborn?", "زۆر دەنگی بۆ نوێ؟"), a: bi("Keep volume low — nursery sound machines should be across room, not in crib.", "دەنگ نزم — لە بەدوای ژوور، نە لە تەخت.") },
    ],
    alts: ["skip-hop-moonlight", "love-to-dream-swaddle-up"],
  }),
  product({
    id: "fridababy-humidifier", brand: "FridaBaby", nameEn: "3-in-1 Humidifier", nameKu: "شێدارکەری ٣ لە ١",
    category: "soothing", ageEn: "Newborn through dry seasons", ageKu: "لە تازەلەدایکبوو تا وەرزی وشک",
    tags: ["sleep", "newborn", "normal"],
    whatEn: "FridaBaby 3-in-1 humidifies, diffuses, and night-lights — nursery comfort during dry air or colds.",
    whatKu: "FridaBaby ٣ لە ١ شێداری، بۆن و ڕووناکی — ئاسوودەیی لە هەوای وشک یان ساردی.",
    loveEn: "All-in-one reduces clutter on the small nursery dresser.",
    loveKu: "هەموو لە یەکدا کەمتر شت لەسەر مێزی ژوور.",
    bestEn: "Dry climate homes and congested newborn nights.",
    bestKu: "ماڵی وشک و شەوی ڕژانی نوێ.",
    notEn: "Homes with mold sensitivity without proper cleaning discipline.",
    notKu: "ماڵی هەساسی بە mould بەبێ پاککردنی ڕێک.",
    pros: [
      bi("Cool mist safe around crib area", "تەنی cool mist لە نزیک تەخت"),
      bi("Optional Vapo pads slot", "شوێنی padی Vapo"),
      bi("Auto shut-off when empty", "کوژاندنەوە کاتێک بەتاڵە"),
    ],
    cons: [
      bi("Must descale weekly in hard water areas", "هەفتانە descale لە ئاوێکی قورس"),
      bi("Filter replacements over time", "فیلتەر بە کات دەگۆڕدرێت"),
    ],
    cleaning: [
      bi("Empty daily; descale with vinegar per manual.", "ڕۆژانە بەتاڵ بکە؛ بە سرکە descale."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Place on stable surface away from crib reach.", "لەسەر ڕووی جێگیر دوور لە تەخت."),
    ],
    faq: [
      { q: bi("Help stuffy nose?", "یارمەتی ڕژان؟"), a: bi("Humidity can ease comfort — pair with saline and NoseFrida; not a cure.", "شێداری ئاسوودەیی دەدات — لەگەڵ saline و NoseFrida؛ چارەسەر نییە.") },
    ],
    alts: ["fridababy-nosefrida", "hatch-rest-plus"],
  }),
);

// Fix typo in NoseFrida Kurdish
const nose = RAW.find((p) => p.id === "fridababy-nosefrida");
if (nose) nose.whatIs.ku = "FridaBaby NoseFrida بە کێشی دایک/باوک و فیلتەری پاک دم\Mخۆر دەپاک دەکات.".replace("\\M", "");

// SLEEP (5)
RAW.push(
  product({
    id: "halo-sleepsack-swaddle", brand: "Halo", nameEn: "SleepSack Swaddle", nameKu: "SleepSack Swaddle",
    category: "sleep", ageEn: "Newborn until rolling (stop swaddle)", ageKu: "تا سوڕانەوە (swaddle بوەستێنە)",
    tags: ["sleep", "newborn", "night"],
    whatEn: "Halo SleepSack Swaddle is a wearable blanket with adjustable wings — safe sleep alternative to loose blankets.",
    whatKu: "Halo SleepSack Swaddle پێچەی لەبەرکراوە بە بالی Adjustable — جێگرەوەی سەلامەت بۆ پتووی شل.",
    loveEn: "TOG-rated warmth without overheating worries when sized correctly.",
    loveKu: "گەرمی TOG بەبێ ترسی گەرمبوونەوە کاتێک قەبارە ڕاستە.",
    bestEn: "Safe-sleep focused first-time moms transitioning from hospital blanket.",
    bestKu: "دایکانی گرنگی بە خەوی سەلامەت لە پتووی نەخۆشخانە.",
    notEn: "Babies who roll early — switch to arms-free version.",
    notKu: "منداڵی زوو سوڕانەوە — وەشانی بێ بال.",
    pros: [
      bi("Hip-healthy recognized design", "دیزاینی گونجاو بۆ کۆڵ"),
      bi("Inverted zipper for easy changes", "زیپێکی پێچەوانە بۆ گۆڕین"),
      bi("TOG options for season", "TOG بۆ وەرز"),
    ],
    cons: [
      bi("Must stop when baby rolls", "دوای سوڕانەوە بوەستێنە"),
      bi("Sizing wrong = unsafe fit", "قەبارەی هەڵە = ناسەلامەت"),
    ],
    cleaning: [
      bi("Machine wash low heat; close zipper.", "بە گەرمی نزم بشۆ؛ زیپ دابخە."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Always place baby on back to sleep.", "هەمیشە منداڵ لە پشت بخەوێنە."),
    ],
    faq: [
      { q: bi("When stop swaddling?", "کەی swaddle بوەستێنم؟"), a: bi("At first signs of rolling — move to arms-out SleepSack.", "لە یەکەم نیشانەی سوڕانەوە — SleepSack بێ بال.") },
    ],
    alts: ["love-to-dream-swaddle-up", "halo-bassinest"],
  }),
  product({
    id: "love-to-dream-swaddle-up", brand: "Love To Dream", nameEn: "Swaddle UP Original", nameKu: "Swaddle UP",
    category: "sleep", ageEn: "Newborn until rolling", ageKu: "لە تازەلەدایکبوو تا سوڕانەوە",
    tags: ["sleep", "newborn", "night"],
    whatEn: "Love To Dream Swaddle UP lets baby sleep arms-up naturally while still feeling snug.",
    whatKu: "Love To Dream Swaddle UP منداڵ بە بالی سەرەوە بە سروشتی دەخەوێنێت بەڵام گرتۆ.",
    loveEn: "Perfect for babies who fight traditional arms-down swaddles.",
    loveKu: "نایاب بۆ منداڵی دژای swaddleی بالی خوارەوە.",
    bestEn: "Startle-reflex heavy newborns who self-soothe with hands near face.",
    bestKu: "منداڵی startleی بەهێز کە دەست لە نزیک دەم ئارام دەبێت.",
    notEn: "Cold rooms without appropriate TOG layer.",
    notKu: "ژووری سارد بەبێ TOGی گونجاو.",
    pros: [
      bi("Arms-up ergonomic position", "شێوازی بالی سەرەوە"),
      bi("Two-way zipper for changes", "زیپی دوولایەنە"),
      bi("Transition bag available later", "جانتا بۆ گواستنەوە هەیە"),
    ],
    cons: [
      bi("Unique shape — not all babies love it", "شێوەی تایبەت — هەموو منداڵ حەز ناکەن"),
      bi("Premium vs basic swaddle blankets", "پریمیوم بەرامبەر پتووی سادە"),
    ],
    cleaning: [
      bi("Wash inside out; tumble low.", "لە ناوەوە بشۆ؛ ووشککەرەوەی نزم."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("vs Halo SleepSack?", "بەرامبەر Halo؟"), a: bi("Swaddle UP for arms-up preference; Halo for classic swaddle wings.", "Swaddle UP بۆ بالی سەرەوە؛ Halo بۆ بالی کلاسیک.") },
    ],
    alts: ["halo-sleepsack-swaddle", "skip-hop-moonlight"],
  }),
  product({
    id: "halo-bassinest", brand: "Halo", nameEn: "Bassinest Swivel Sleeper", nameKu: "Bassinest Swivel",
    category: "sleep", ageEn: "Newborn to ~5 months or 20 lbs", ageKu: "لە تازەلەدایکبوو تا ~٥ مانگ یان ٢٠ پاوەند",
    tags: ["sleep", "newborn", "night", "recovery"],
    whatEn: "Halo Bassinest swivels over adult bed for close safe sleep without bed-sharing.",
    whatKu: "Halo Bassinest لەسەر جێگای گەورە دەسوڕێت بۆ خەوی نزیک بەبێ هاوبەشبوونی جێگا.",
    loveEn: "Reach baby for feeds without standing — gentle on C-section recovery.",
    loveKu: "گەیشتن بە منداڵ بەبێ هەستان — نەرم بۆ چاکبوونەوەی سزاریەن.",
    bestEn: "Room-sharing plan and night feeding ease in month zero.",
    bestKu: "هاوبەشبوونی ژوور و ئاسانی شیردان لە شەوی یەکەم.",
    notEn: "Low beds or thick mattresses without fit check.",
    notKu: "جێگای نزم یان دشکی قورس بەبێ پشکنینی گونجان.",
    pros: [
      bi("360° swivel and lowering wall", "سوڕانەوەی ٣٦٠° و دیواری دابەزێنراو"),
      bi("Firm flat sleep surface", "ڕووی ڕێک و ڕێک"),
      bi("Storage pocket for essentials", "گیرفان بۆ پێداویستی"),
    ],
    cons: [
      bi("Large footprint beside bed", "قەبارەی گەورە لە لای جێگا"),
      bi("Short use window before crib", "کاتێکی کورت پێش تەخت"),
    ],
    cleaning: [
      bi("Remove fabric for machine wash per manual.", "پارچە لاببە بۆ ماشین."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Never add loose bedding inside bassinet.", "پتووی شل زیاد مەکە."),
    ],
    faq: [
      { q: bi("Safe sleep approved?", "پەسندی خەوی سەلامەت؟"), a: bi("Designed for bedside room-sharing — follow assembly and weight limits.", "بۆ هاوبەشبوونی ژوور — سنوور و دامەزراندن.") },
    ],
    alts: ["stokke-sleepi-mini", "halo-sleepsack-swaddle"],
  }),
  product({
    id: "skip-hop-moonlight", brand: "Skip Hop", nameEn: "Moonlight & Melodies Soother", nameKu: "Moonlight & Melodies",
    category: "sleep", ageEn: "Newborn to 12 months", ageKu: "لە تازەلەدایکبوو تا ١٢ مانگ",
    tags: ["sleep", "night", "soothing"],
    whatEn: "Skip Hop Moonlight projects stars on ceiling with lullabies — crib or nursery soother attachment.",
    whatKu: "Skip Hop Moonlight ئەستێرە لە سەرقەفە پیشان دەدات لەگەڵ لالایی — چەسپاندن بە تەخت یان ژوور.",
    loveEn: "Portable comfort object for travel crib naps.",
    loveKu: "ئارامکەری گەڕاوە بۆ خەوی گەشت.",
    bestEn: "Visual soothers who calm to gentle light and music.",
    bestKu: "منداڵی کە بە ڕووناکی و دەنگی نەرم ئارام دەبێت.",
    notEn: "Minimal stimulation bedtime philosophy.",
    notKu: "فلسەفەی کەمتر هاندان پێش خەو.",
    pros: [
      bi("Clip-on for crib rail", "چەسپاندن بە تەخت"),
      bi("Timer auto shut-off", "کاتژمێر و کوژاندنەوە"),
      bi("Battery or USB power", "باتری یان USB"),
    ],
    cons: [
      bi("Light may overstimulate some babies", "ڕووناکی لەوانەیە زۆر هاندەر بێت"),
      bi("Not a substitute for safe sleep space", "جێگری جێگای خەوی سەلامەت نییە"),
    ],
    cleaning: [
      bi("Wipe projector lens gently.", "لێنزی پرۆجێکتۆر بە نەرمی."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Leave on all night?", "هەموو شەو بەجێبهێڵم؟"), a: bi("Use timer; remove from crib when baby sleeps for safe sleep guidelines.", "کاتژمێر بەکاربهێنە؛ دوای خەو لاببە.") },
    ],
    alts: ["hatch-rest-plus", "love-to-dream-swaddle-up"],
  }),
  product({
    id: "stokke-sleepi-mini", brand: "Stokke", nameEn: "Sleepi Mini V3", nameKu: "Sleepi Mini V3",
    category: "sleep", ageEn: "Birth to ~6 months (extends with kit)", ageKu: "لە لەدایکبوون تا ~٦ مانگ (درێژ دەبێت)",
    tags: ["sleep", "newborn", "gear"],
    whatEn: "Stokke Sleepi Mini is an oval bedside crib that grows into full Sleepi bed through extension kits.",
    whatKu: "Stokke Sleepi Mini تەختێکی بازنەییە کە بە kit درێژ دەبێت بۆ Sleepi.",
    loveEn: "Scandinavian aesthetic that feels like furniture, not plastic clutter.",
    loveKu: "جوانی سکandinavian وەک کەلوپەل، نەک پلاستیکی پڕ.",
    bestEn: "Design-led nurseries wanting longevity beyond bassinet stage.",
    bestKu: "ژووری منداڵی دیزاین کە دوورتر لە bassinet دەمێنێت.",
    notEn: "Tight budgets or short-term rental moves.",
    notKu: "بودجەی کەم یان گۆڕینی کرێی خێرا.",
    pros: [
      bi("Breathable oval design", "دیزاینی بازنەیی هەناسەپێدان"),
      bi("Lockable wheels for room moves", "چاکی قفlldar بۆ جووڵاندن"),
      bi("Extension path to toddler bed", "ڕێگا بۆ تەختی منداڵ"),
    ],
    cons: [
      bi("Premium Stokke investment", "وەبەرhێنانی Stokke"),
      bi("Mattress and textiles sold separately", "دشک و پارچە بە جیا"),
    ],
    cleaning: [
      bi("Wipe rails; wash textiles per label.", "تەختە بسڕەوە؛ پارچە بەپێی ناونیشان."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Mini vs full Sleepi?", "Mini یان Sleepi تەواو؟"), a: bi("Mini fits small rooms first six months; kits extend if you love the line.", "Mini بۆ ٦ مانگی یەکەم؛ kit درێژ دەکات.") },
    ],
    alts: ["halo-bassinest", "halo-sleepsack-swaddle"],
  }),
);

// Fix typos
const sleepi = RAW.find((p) => p.id === "stokke-sleepi-mini");
if (sleepi) {
  sleepi.pros[1].ku = sleepi.pros[1].ku.replace("قفlldar", "قفlldar").replace("قفlldar", "قفڵدار");
  sleepi.cons[0].ku = sleepi.cons[0].ku.replace("وەبەرhێnan", "وەبەرhێnan").replace("وەبەرhێnan", "وەبەرhێنان").replace("وەبەرhێنان", "وەبەرhێنانی");
}

// CARE (5)
RAW.push(
  product({
    id: "braun-thermoscan-7", brand: "Braun", nameEn: "ThermoScan 7", nameKu: "ThermoScan 7",
    category: "care", ageEn: "Newborn ear readings with proper technique", ageKu: "خوێندنەوەی گوێ بە تەکنیکی ڕاست",
    tags: ["normal", "night", "newborn"],
    whatEn: "Braun ThermoScan 7 is an in-ear thermometer with age-adjusted fever guidance display.",
    whatKu: "Braun ThermoScan 7 پلە گەرمەپێوی گوێیە بە ڕێنمایی تەمەن بۆ تا.",
    loveEn: "Fast reading when you're panicking at 3 a.m. — still call clinician for medical decisions.",
    loveKu: "خوێندنەوەی خێرا لە ٣ی شەو — هێشتا بۆ بڕیاری پزیشکی پزیشک بانگ بکە.",
    bestEn: "First fever scares and parents wanting clinical-grade home tool.",
    bestKu: "ترسی یەکەم تا و ئامێری ماڵی ئاستی نەخۆshخانە.",
    notEn: "Parents preferring non-contact forehead only.",
    notKu: "دایکانی تەنها پێشانی بێ دەستگەیشتن.",
    pros: [
      bi("Age Precision color coding", "ڕەنگ بەپێی تەمەن"),
      bi("Pre-warmed tip for comfort", "سەرگەرم بۆ ئاسوودەیی"),
      bi("Disposable lens filters hygienic", "فیلتەری لێنز پاک"),
    ],
    cons: [
      bi("Ear technique learning curve", "فێrbوونی تەکنیکی گوێ"),
      bi("Filters ongoing cost", "تێچووی فیلتەر"),
    ],
    cleaning: [
      bi("Replace lens filter each use; wipe body.", "فیلتەر هەر جارێک؛ جەستە بسڕەوە."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Thermometer supports care calls — never replaces clinician assessment.", "پلە گەرمەپێو یارمەتی پەیوەندی پزیشکە — جێگری نەبێت."),
    ],
    faq: [
      { q: bi("Newborn ear ok?", "گوێی نوێ؟"), a: bi("Follow Braun age guidance; rectal temp gold standard for tiny babies per pediatrician.", "ڕێنمایی Braun؛ بۆ بچووک پzیشک rectal پێشنیار دەکات.") },
    ],
    alts: ["fridababy-3in1-ear", "fridababy-nosefrida"],
  }),
  product({
    id: "fridababy-3in1-ear", brand: "FridaBaby", nameEn: "3-in-1 Ear, Forehead & Touchless", nameKu: "٣ لە ١ گوێ و پێشان",
    category: "care", ageEn: "All first-year ages", ageKu: "هەموو تەمەنی ساڵی یەکەم",
    tags: ["normal", "night"],
    whatEn: "FridaBaby 3-in-1 thermometer offers ear, forehead swipe, and touchless modes for fussy babies.",
    whatKu: "FridaBaby ٣ لە ١ گوێ، پێشان و بێ دەستگەیشتن بۆ منداڵی ناراحەت.",
    loveEn: "Switch modes when baby won't hold still for ear reading.",
    loveKu: "شێواز بگۆڕە کاتێک منداڵ بۆ گوێ ناچێت.",
    bestEn: "Squirmy infants and parents wanting one device flexibility.",
    bestKu: "منداڵی جووڵاو و دایکانی یەک ئامێری فرە شێواز.",
    notEn: "Those wanting single-method clinical consistency only.",
    notKu: "تەنها یەک شێوازی کلینیکی.",
    pros: [
      bi("Three modes in one unit", "سێ شێواز لە یەکدا"),
      bi("Fever indicator alerts", "ئاگاداری تا"),
      bi("Backlit screen for nights", "شاشەی ڕووناک بۆ شەو"),
    ],
    cons: [
      bi("Forehead affected by sweat", "پێشان لە عرق"),
      bi("Battery life moderate", "ژیانی باتری مامناوەند"),
    ],
    cleaning: [
      bi("Alcohol wipe probe between uses.", "پڕۆب بە alcohول بسڕەوە."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Which mode best?", "کام شێواز باشتر؟"), a: bi("Ear often most consistent when technique correct; use mode baby tolerates.", "گوێ زۆرجار یەکسانترە؛ شێوازی منداڵ قبوڵ دەکات.") },
    ],
    alts: ["braun-thermoscan-7", "fridababy-nailfrida"],
  }),
  product({
    id: "skip-hop-moby-bath", brand: "Skip Hop", nameEn: "Moby Smart Sling Tub", nameKu: "Moby Smart Sling",
    category: "care", ageEn: "Newborn to sit-up (~6 months)", ageKu: "لە تازەلەدایکبوو تا دانیشتن (~٦ مانگ)",
    tags: ["newborn", "apartment"],
    whatEn: "Skip Hop Moby is a whale-shaped infant tub with newborn sling insert for supported early baths.",
    whatKu: "Skip Hop Moby گەرمکەری شێوەی نەهەنگە بە sling بۆ حەمامی سەرەتایی.",
    loveEn: "The sling cradles floppy newborns so one hand stays free.",
    loveKu: "sling منداڵی نەرمی نوێ دەگرێت — یەک دەست بەتاڵ دەمێنێت.",
    bestEn: "Kitchen sink or counter baths in small apartments.",
    bestKu: "حەمام لە سینک یان کۆunter لە شوقەی بچووک.",
    notEn: "Walk-in shower-only homes without flat surface.",
    notKu: "تەنها دوش بەبێ ڕووی ڕێک.",
    pros: [
      bi("Newborn sling plus sit-up stage", "sling و قۆناغی دانیشتن"),
      bi("Compact whale fits standard sinks", "لە سینکی ئاسایی دەگونجێت"),
      bi("Drain plug easy empty", "دەرچەی بەتاڵکردن"),
    ],
    cons: [
      bi("Outgrown after sit-up milestone", "دوای دانیشتن بچووک"),
      bi("Plastic requires storage space", "پلاستیک شوێن دەوێت"),
    ],
    cleaning: [
      bi("Rinse and air-dry after each bath; mild bleach monthly.", "دوای حەمام ووشک؛ مانگانە bleach سووک."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Never leave baby unattended in water.", "منداڵ بە تەنها لە ئاو مەهێڵە."),
    ],
    faq: [
      { q: bi("First bath when?", "یەکەم حەمام کەی؟"), a: bi("Many wait until cord falls off — follow your pediatrician's guidance.", "زۆرجار تا پەیکەر دەکەوێت — ڕێنمایی پzیشک.") },
    ],
    alts: ["stokke-flexi-bath", "fridababy-nailfrida"],
  }),
  product({
    id: "stokke-flexi-bath", brand: "Stokke", nameEn: "Flexi Bath", nameKu: "Flexi Bath",
    category: "care", ageEn: "Newborn to 4 years (with insert)", ageKu: "لە تازەлەدایکبوو تا ٤ ساڵ (لەگەڵ insert)",
    tags: ["travel", "apartment"],
    whatEn: "Stokke Flexi Bath folds flat for storage — full-size tub that disappears behind the door.",
    whatKu: "Stokke Flexi Bath دەپێچرێتەوە — گەرمکەری تەواو کە لە دوای دەرگا دەشاردرێتەوە.",
    loveEn: "Travel to grandma's without skipping bath routine.",
    loveKu: "گەشت بۆ باپیر بەبێ وەستاندنی حەمام.",
    bestEn: "Space-starved bathrooms and frequent visitors.",
    bestKu: "حمامی بچووک و سەردانی زۆر.",
    notEn: "Parents wanting permanent built-in tub only.",
    notKu: "تەنها گەرمکەری هەمیشەی دامەzrاو.",
    pros: [
      bi("Fold-flat storage", "پێچانەوەی ڕێک"),
      bi("Newborn support insert available", "insertی نوێ"),
      bi("Non-slip base", "بنەی دژە هەڵخەلە"),
    ],
    cons: [
      bi("Need floor space when open", "کاتێک کراوە شوێن دەوێت"),
      bi("Premium vs basic tub", "پریمیوم بەرامبەر سادە"),
    ],
    cleaning: [
      bi("Wipe dry before folding to prevent mildew.", "پێش پێچانەوە ووشk بکە."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Fits in shower?", "لە دوش دەگونجێت؟"), a: bi("Opens on shower floor or bedroom — ensure stable flat surface.", "لە ڕووی دوش یان ژوور — ڕووی جێگیر.") },
    ],
    alts: ["skip-hop-moby-bath", "braun-thermoscan-7"],
  }),
  product({
    id: "fridababy-nailfrida", brand: "FridaBaby", nameEn: "SnipperClipper Nail Set", nameKu: "SnipperClipper",
    category: "care", ageEn: "Newborn nails onward", ageKu: "لە نینۆکی نوێ",
    tags: ["newborn", "normal"],
    whatEn: "FridaBaby SnipperClipper combines safety scissors and emery board designed for tiny newborn nails.",
    whatKu: "FridaBaby SnipperClipper قەچ و سەبون بۆ نینۆکی بچووکی نوێ.",
    loveEn: "Stops face scratches without terror of adult clippers.",
    loveKu: "ڕێگری لە scratch بەبێ ترسی قەچی گەورە.",
    bestEn: "Week-one face scratches and nervous first trims.",
    bestKu: "scratchی هەفتەی یەکەم و ترسی یەکەم بڕین.",
    notEn: "Parents who only use nail file approach.",
    notKu: "تەنها سەبون.",
    pros: [
      bi("Rounded-tip scissors", "قەچی گرد"),
      bi("Spy-hole window sees nail line", "پەنجەرە بۆ بینینی هێڵ"),
      bi("Includes emery board", "سەbون لەگەڵدایە"),
    ],
    cons: [
      bi("Still requires steady hands", "دەستی جێگیر پێویستە"),
      bi("Baby may still wiggle", "منداڵ هێشتا جووڵە دەکات"),
    ],
    cleaning: [
      bi("Wipe blades with alcohol after use.", "تیغ بە alcohول بسڕەوە."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Trim while baby sleeps or with partner holding.", "لە خەو یان بە یارمەتی هاوڕێ بڕین."),
    ],
    faq: [
      { q: bi("How often trim?", "چەند جار بڕین؟"), a: bi("Newborn nails grow fast — weekly or when you hear scratching.", "نینۆک خێرا درێژ دەبێت — هەفتانە یان کاتێک scratch دەبیستیت.") },
    ],
    alts: ["fridababy-3in1-ear", "skip-hop-moby-bath"],
  }),
);

// FEEDING-GEAR (5)
RAW.push(
  product({
    id: "baby-brezza-formula-pro", brand: "Baby Brezza", nameEn: "Formula Pro Advanced", nameKu: "Formula Pro Advanced",
    category: "feeding-gear", ageEn: "When formula feeding begins", ageKu: "کاتێک شیرخۆراک دەست پێ دەکات",
    tags: ["feeding", "night"],
    whatEn: "Baby Brezza Formula Pro Advanced mixes warmed formula bottles to precise temperature on demand.",
    whatKu: "Baby Brezza Formula Pro Advanced بوتڵی گەرm و ڕێک لە شیرخۆراک دروست دەکات.",
    loveEn: "3 a.m. bottle prep drops from ten minutes to thirty seconds.",
    loveKu: "ئامادەکردنی بوتڵ لە ٣ی شەو لە ١٠ خولەک بۆ ٣٠ چrکە.",
    bestEn: "Formula-primary night feeds and exhausted partners sharing duty.",
    bestKu: "شیرخۆراکی شەو و هاوڕێی ماندوو.",
    notEn: "Exclusive breastfeeders with no formula plan.",
    notKu: "تەنها شیردان بەبێ شیرخۆراک.",
    pros: [
      bi("Customizable ounce and temp", "ئۆنس و پلە گەرmi ڕێک"),
      bi("Compatible with most formula brands", "زۆر براندی شیرخۆراک"),
      bi("Frees hands during crying spells", "دەست بەتاڵ لە کاتی گریا"),
    ],
    cons: [
      bi("Must clean funnel weekly", "قوڵ هەftanە پاک"),
      bi("Counter space and power cord", "شوێن و پلەگ"),
    ],
    cleaning: [
      bi("Daily wipe; weekly funnel wash per manual.", "ڕۆژانە؛ هەftanە قوڵ."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Breast milk too?", "شیریش؟"), a: bi("Designed for formula — do not use for breast milk unless manual says otherwise.", "بۆ شیرخۆراک — شیر نا.") },
    ],
    alts: ["philips-avent-warmer", "baby-brezza-sterilizer"],
  }),
  product({
    id: "baby-brezza-sterilizer", brand: "Baby Brezza", nameEn: "Sterilizer Dryer Advanced", nameKu: "Sterilizer Dryer",
    category: "feeding-gear", ageEn: "First year feeding gear", ageKu: "ساڵی یەکەمی خواردن",
    tags: ["feeding", "newborn"],
    whatEn: "Baby Brezza Sterilizer Dryer steam-sterilizes and dries bottles, pump parts, and pacifiers in one cycle.",
    whatKu: "Baby Brezza بە بخار ستەریلایز و ووشk دەکات — بوتڵ، پەمپ، مژۆک.",
    loveEn: "Counter station that ends wet-bottle-on-rack chaos.",
    loveKu: "وێستگەی کۆunter کە ئاڵۆزی بوتڵی تەڕ کۆتایی پێ دەهێنێت.",
    bestEn: "Heavy bottle washers and pump-heavy households.",
    bestKu: "ماڵی زۆر بوتڵ و پەمپ.",
    notEn: "Minimalists boiling occasionally only.",
    notKu: "تەنها هەndێک جار بجوڵێنن.",
    pros: [
      bi("Sterilize and dry automatically", "خۆکار ستەریلایز و ووشk"),
      bi("Fits multiple bottles at once", "چەند بوتڵ"),
      bi("HEPA-filtered dry air option", "وشkکردن بە HEPA"),
    ],
    cons: [
      bi("Large countertop footprint", "قەبارەی گەورە"),
      bi("Descale needed in hard water", "descale لە ئاوێ قورس"),
    ],
    cleaning: [
      bi("Descale monthly; wipe chamber.", "مانگانە descale."),
    ],
    safety: COMMON_SAFETY,
    faq: [
      { q: bi("Daily sterilize needed?", "ڕۆژانە؟"), a: bi("Many clinicians say after first weeks thorough wash suffices — follow your guidance.", "دوای هەftە سەرەتایی شوشتن بەسە — ڕێنمایی خۆت.") },
    ],
    alts: ["philips-avent-warmer", "medela-storage-bags"],
  }),
  product({
    id: "philips-avent-warmer", brand: "Philips Avent", nameEn: "Fast Bottle Warmer", nameKu: "گەرمکەری خێرای بوتڵ",
    category: "feeding-gear", ageEn: "From first bottle feed", ageKu: "لە یەکەم بوتڵ",
    tags: ["feeding", "night"],
    whatEn: "Philips Avent Fast Bottle Warmer gently heats milk with circulating water bath — even warming, no hotspots.",
    whatKu: "Philips Avent بە ئاو گەرm دەکات — یەکسان، بێ گەرمی زۆر.",
    loveEn: "Simple one-dial warmer partners actually learn to use half-asleep.",
    loveKu: "گەرmکەری سادە کە هاوڕێ لە نیو خەو فێr دەبێت.",
    bestEn: "Breast milk bag thawing and formula warming alike.",
    bestKu: "شیر و شیرخۆراک.",
    notEn: "All-in-one formula mixing needs.",
    notKu: "تێکەڵکردنی تەواو.",
    pros: [
      bi("Fast cycle ~3 minutes", "~٣ خولەک"),
      bi("Fits most bottle shapes", "زۆر شێوە"),
      bi("Defrost setting for frozen milk", "یخکردنەوە"),
    ],
    cons: [
      bi("Requires water refill", "پڕکردنەوەی ئاو"),
      bi("Not portable for travel", "بۆ گەشت نا"),
    ],
    cleaning: [
      bi("Descale with citric acid monthly.", "مانگانە بە لیمۆ."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Test drip on wrist — no microwaving breast milk.", "لە مەچ تاقی بکە — شیر لە مایکرۆوەیڤ نا."),
    ],
    faq: [
      { q: bi("Microwave instead?", "مایکرۆوەیڤ؟"), a: bi("Warmer avoids hotspots that destroy milk nutrients and burn mouth.", "گەرmکەر hotspot نابێت.") },
    ],
    alts: ["baby-brezza-formula-pro", "baby-brezza-sterilizer"],
  }),
  product({
    id: "medela-storage-bags", brand: "Medela", nameEn: "Breast Milk Storage Bags", nameKu: "جantای پashەکەوتی شیر",
    category: "feeding-gear", ageEn: "When pumping starts", ageKu: "کاتێک پەمپ دەست پێ دەکات",
    tags: ["feeding", "travel"],
    whatEn: "Medela breast milk storage bags are pre-sterilized, lay-flat bags with ounce markings and double seal.",
    whatKu: "جantای Medela پێش ستەریلایز، ڕێک، بە niشanە و دوو قفڵ.",
    loveEn: "Freezer stacks neatly — gold for building stash before return to work.",
    loveKu: "لە سەلاجە ڕێک — بۆ پashەکەوت پێsh گەڕانەوە بۆ کار.",
    bestEn: "Pumpers freezing milk and combo feeding backup.",
    bestKu: "پەمپ و شیری یەdegە.",
    notEn: "Formula-only families with no pumping.",
    notKu: "تەنها شیرخۆراک بەبێ پەمپ.",
    pros: [
      bi("Self-standing fill design", "دەست پێ بە پێی خۆی"),
      bi("Pump adapter direct fill", "ڕاستەوخۆ لە پەمپ"),
      bi("Thaws flat quickly", "خێra یخدەکاتەوە"),
    ],
    cons: [
      bi("Single-use plastic", "پلاستیکی یەکجار"),
      bi("Can leak if overfilled", "دەچێت ئەگەر زۆر پڕ بکەیت"),
    ],
    cleaning: [
      bi("Single use — do not wash and reuse.", "یەکجار — دووبارە مەکە."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Label date and time; use oldest first.", "بەroوار بنووسە؛ کۆنترین یەکەم."),
    ],
    faq: [
      { q: bi("How long frozen?", "چەند لە سەلاجە؟"), a: bi("Follow CDC/lactation guidance — typically ~6 months in standard freezer.", "ڕێنمایی CDC — نزیکەی ٦ مانگ.") },
    ],
    alts: ["medela-freestyle-flex", "momcozy-nursing-pillow"],
  }),
  product({
    id: "momcozy-nursing-pillow", brand: "Momcozy", nameEn: "Adjustable Nursing Pillow", nameKu: "بالیشی شیردان",
    category: "feeding-gear", ageEn: "Birth through breastfeeding journey", ageKu: "لە لەدایکبوون",
    tags: ["feeding", "recovery", "newborn"],
    whatEn: "Momcozy adjustable nursing pillow supports baby at breast height — reduces arm and back strain.",
    whatKu: "بالیشی Momcozy منداڵ لە ئاستی سینg دەهێڵێت — کەمکردنەوەی ئازاری دەst و پشت.",
    loveEn: "C-section moms appreciate firm wrap without pressure on incision.",
    loveKu: "دایکی سزاریەن حەزیان لە پشتیوانی بەبێ فشار لە برین.",
    bestEn: "Long cluster feeds and couch nursing sessions.",
    bestKu: "شیردانی درێژ لە کۆگە.",
    notEn: "Bed co-sleeping nursing — use only while awake seated.",
    notKu: "شیردان لە جێگا لە خەو — تەنها لە کاتی ئاگاداری.",
    pros: [
      bi("Adjustable firmness straps", "پێچی ڕێkdraو"),
      bi("Removable washable cover", "پarچەی لابraو"),
      bi("Back support for mom", "پشت بۆ دایک"),
    ],
    cons: [
      bi("Bulky for small sofas", "قورس بۆ کۆگەی بچووک"),
      bi("Not a sleep surface for baby", "جێگای خەو نییە"),
    ],
    cleaning: [
      bi("Wash cover weekly; spot clean foam.", "پarچە هەftanە."),
    ],
    safety: [
      ...COMMON_SAFETY,
      bi("Never leave baby sleeping on pillow.", "منداڵ لەسەر بالیش مەخewێnە."),
    ],
    faq: [
      { q: bi("Boppy alternative?", "جێگرەوەی Boppy؟"), a: bi("Similar purpose — Momcozy adds adjustable strap many C-section moms prefer.", "هەمان مەبەست — پێچی Momcozy بۆ سزاریەن.") },
    ],
    alts: ["medela-storage-bags", "philips-avent-warmer"],
  }),
);

// Polish selected Kurdish strings
const polish = {
  "fridababy-nosefrida": { whatIs: { ku: "FridaBaby NoseFrida بە کێشی دایک/باوک و فیلتەری پاک دم\Mخۆر دەپاک دەکات." } },
  "medela-storage-bags": {
    name: { ku: "جantای پاشەکەوتی شیر" },
    whatIs: { ku: "جantای Medela پێش ستەریلایز، ڕێک، بە niشanە و دوو قفڵ." },
    whyLove: { ku: "لە سەلاجە ڕێک — بۆ پاشەکەوت پێش گەڕانەوە بۆ کار." },
    bestFor: { ku: "پەمپ و شیری یەdegە." },
  },
  "stokke-sleepi-mini": { pros: [{ i: 1, ku: "چاکی قفڵدار بۆ جووڵاندن" }], cons: [{ i: 0, ku: "وەبەرhێنانی Stokke" }] },
  "momcozy-nursing-pillow": { safety: [{ i: 2, ku: "منداڵ لەسەر بالیش مەخewێnە." }] },
};
for (const [id, patch] of Object.entries(polish)) {
  const p = RAW.find((x) => x.id === id);
  if (!p) continue;
  if (patch.whatIs) Object.assign(p.whatIs, patch.whatIs);
  if (patch.name) Object.assign(p.name, patch.name);
  if (patch.whyLove) Object.assign(p.whyLove, patch.whyLove);
  if (patch.bestFor) Object.assign(p.bestFor, patch.bestFor);
  for (const item of patch.pros || []) p.pros[item.i].ku = item.ku;
  for (const item of patch.cons || []) p.cons[item.i].ku = item.ku;
  for (const item of patch.safety || []) p.safety[item.i].ku = item.ku;
}
RAW.find((p) => p.id === "fridababy-nosefrida").whatIs.ku =
  "FridaBaby NoseFrida بە کێشی دایک/باوک و فیلتەری پاک دەم\Mخۆر دەپاک دەکات.";

// Wire alternatives bidirectionally where empty
const byCat = {};
for (const p of RAW) {
  (byCat[p.category] ||= []).push(p.id);
}
for (const p of RAW) {
  if (!p.alternatives?.length) {
    p.alternatives = byCat[p.category].filter((id) => id !== p.id).slice(0, 3);
  }
}

const ESSENTIAL_CATEGORIES = [
  { id: "monitors", en: "Baby monitors", ku: "مۆنیتەری منداڵ" },
  { id: "carriers", en: "Baby carriers", ku: "هەڵگرەی منداڵ" },
  { id: "strollers", en: "Strollers", ku: "عەرەبانە" },
  { id: "pumps", en: "Breast pumps", ku: "پەمپی شیر" },
  { id: "bottles", en: "Baby bottles", ku: "بوتڵی منداڵ" },
  { id: "soothing", en: "Soothing", ku: "ئارامکردن" },
  { id: "sleep", en: "Sleep", ku: "خەو" },
  { id: "care", en: "Baby care", ku: "چاودێری منداڵ" },
  { id: "feeding-gear", en: "Feeding gear", ku: "ئامێری خواردن" },
];

const COMPARE_TRAITS = {
  monitors: ["video", "privacy", "sleepTracking", "portable"],
  carriers: ["newbornFit", "breathability", "longevity", "easeOfUse"],
  strollers: ["compactFold", "terrain", "newbornReady", "storage"],
  pumps: ["portability", "discretion", "power", "easeClean"],
  bottles: ["colicRelief", "breastLike", "easyClean", "durability"],
  soothing: ["effectiveness", "portability", "easeClean", "newbornSafe"],
  sleep: ["safeSleep", "longevity", "easeUse", "comfort"],
  care: ["accuracy", "easeUse", "newbornFit", "storage"],
  "feeding-gear": ["speed", "easeClean", "counterSpace", "versatility"],
};

const WORRY_MAP = {
  feeding: ["feeding", "newborn"],
  sleep: ["sleep", "night", "newborn"],
  recovery: ["recovery", "newborn"],
  normal: ["normal", "newborn"],
  gear: ["gear", "travel", "apartment"],
};

const FEEDING_MAP = {
  breast: ["feeding", "newborn"],
  combo: ["feeding", "newborn"],
  formula: ["feeding", "night"],
  figuring: ["feeding", "newborn", "gear"],
};

const STAGE_MAP = {
  pregnant: ["gear", "newborn"],
  "0-2w": ["newborn", "sleep", "feeding"],
  "2-8w": ["newborn", "sleep", "feeding", "normal"],
  "2-6m": ["feeding", "travel", "sleep"],
  "6-12m": ["travel", "gear", "feeding"],
};

const out = `/** Educational Baby Essentials guide for first-time mothers (newborn–12 months). No prices. No commerce. */

export const ESSENTIAL_CATEGORIES = ${JSON.stringify(ESSENTIAL_CATEGORIES, null, 2)};

export const COMPARE_TRAITS = ${JSON.stringify(COMPARE_TRAITS, null, 2)};

export const ESSENTIALS = ${JSON.stringify(RAW, null, 2)};

export function getEssential(id) {
  return ESSENTIALS.find((p) => p.id === id) ?? null;
}

export function essentialsByCategory(catId) {
  if (!catId || catId === "all") return ESSENTIALS;
  return ESSENTIALS.filter((p) => p.category === catId);
}

export function recommendEssentials(profile = {}) {
  const worry = profile.worry || profile.concern || "";
  const feeding = profile.feeding || "";
  const stage = profile.stage || profile.age || "0-2w";

  const WORRY_MAP = {
    feeding: ["feeding", "newborn"],
    sleep: ["sleep", "night", "newborn"],
    recovery: ["recovery", "newborn"],
    normal: ["normal", "newborn"],
    gear: ["gear", "travel", "apartment"],
  };
  const FEEDING_MAP = {
    breast: ["feeding", "newborn"],
    combo: ["feeding", "newborn"],
    formula: ["feeding", "night"],
    figuring: ["feeding", "newborn", "gear"],
  };
  const STAGE_MAP = {
    pregnant: ["gear", "newborn"],
    "0-2w": ["newborn", "sleep", "feeding"],
    "2-8w": ["newborn", "sleep", "feeding", "normal"],
    "2-6m": ["feeding", "travel", "sleep"],
    "6-12m": ["travel", "gear", "feeding"],
  };

  const tagBoost = new Set([
    ...(WORRY_MAP[worry] || []),
    ...(FEEDING_MAP[feeding] || []),
    ...(STAGE_MAP[stage] || []),
  ]);

  const score = (p) => {
    let s = 0;
    for (const t of p.tags) if (tagBoost.has(t)) s += 2;
    if (worry === "sleep" && p.category === "sleep") s += 3;
    if (worry === "feeding" && (p.category === "pumps" || p.category === "bottles" || p.category === "feeding-gear")) s += 3;
    if (worry === "gear" && ["monitors", "strollers", "carriers"].includes(p.category)) s += 2;
    if (feeding === "breast" && p.tags.includes("feeding")) s += 1;
    if (feeding === "formula" && ["bottles", "feeding-gear"].includes(p.category)) s += 2;
    if (stage === "0-2w" && p.tags.includes("newborn")) s += 2;
    return s;
  };

  return [...ESSENTIALS]
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s || a.p.name.en.localeCompare(b.p.name.en))
    .slice(0, 6)
    .map((x) => x.p);
}

export function answerProductAi(product, question, lang = "en") {
  const L = lang === "ku";
  const pack = (en, ku) => (L ? ku : en);

  if (!product) {
    return pack(
      "Choose a product from the guide first. Answers come only from stored educational notes — not medical diagnosis.",
      "سەرەتا بەرهەمێک لە ڕێنما هەڵبژێرە. وەڵامەکان تەنها لە تێبینی پەروەردەیی — نەک دەستنیshانکردن.",
    );
  }

  const q = (question || "").toLowerCase();

  if (/price|cost|buy|cart|shop|discount|نرخ|کڕین|فرۆشتن|داشکاندن/.test(q)) {
    return pack(
      "This is an educational guide only — no prices, buy buttons, or shopping links.",
      "ئەمە تەنها ڕێنمایی پەروەردەییە — بێ نرخ، دوگmەی کڕین، یان لینکی فرۆشتن.",
    );
  }

  if (/diagnos|prescri|sick|fever treat|دەستنیshان|چارەسەر|نەخۆsh/.test(q)) {
    return pack(
      "I cannot diagnose or prescribe. Use the safety notes here for general education, and contact your clinician for health concerns.",
      "ناتوانم دەستنیshان یان چارەسەر بکەم. تێbینی سەلامەti بۆ فێrbوون بەکاربهێنە و بۆ تەndروstی پzیشk بانگ بکە.",
    );
  }

  if (/clean|wash|پاک|شۆ/.test(q)) {
    const lines = product.cleaning.map((c) => (L ? c.ku : c.en)).join(" ");
    return lines || pack("See the cleaning section on this product page.", "بەشی پاککردنەوە ببینە.");
  }

  if (/safe|safety|سەlamet/.test(q)) {
    return product.safety.map((s) => (L ? s.ku : s.en)).join(" ");
  }

  if (/pro|con|advantage|disadvantage|باش|لاواز/.test(q)) {
    const pros = product.pros.map((x) => (L ? x.ku : x.en)).join("; ");
    const cons = product.cons.map((x) => (L ? x.ku : x.en)).join("; ");
    return pack(\`Pros: \${pros}. Cons: \${cons}.\`, \`باشی: \${pros}. لاوازی: \${cons}.\`);
  }

  if (/alternative|compare|جێگر|بەراورد/.test(q)) {
    const alts = (product.alternatives || []).join(", ") || pack("none listed", "نییە");
    return pack(
      \`Alternatives in this guide: \${alts}. Compare fit using bestFor and notFor — no single best product.\`,
      \`جێگرەوە: \${alts}. bestFor و notFor بەراورد بکە — یەک باشترین نییە.\`,
    );
  }

  if (/age|newborn|month|تەمەن|مانگ|تازە/.test(q)) {
    return pack(
      \`Age guidance: \${product.age.en}. Confirm with your care team for premature or medical needs.\`,
      \`تەمەن: \${product.age.ku}. بۆ پێش‌وەختە لە تیمی چاودێری بپرسە.\`,
    );
  }

  if (/who|fit|for me|بۆ من|کێ/.test(q)) {
    return pack(
      \`Best for: \${product.bestFor.en} Not ideal if: \${product.notFor.en}\`,
      \`باشە بۆ: \${product.bestFor.ku} باش نییە ئەگەر: \${product.notFor.ku}\`,
    );
  }

  const faqHit = product.faq?.find((f) => {
    const hay = (f.q.en + f.q.ku + f.a.en + f.a.ku).toLowerCase();
    return q.split(/\\s+/).some((w) => w.length > 3 && hay.includes(w));
  });
  if (faqHit) return L ? faqHit.a.ku : faqHit.a.en;

  return pack(
    \`\${product.whatIs.en} \${product.whyLove.en}\`,
    \`\${product.whatIs.ku} \${product.whyLove.ku}\`,
  );
}
`;

fs.writeFileSync(dest, out);
console.log(`Wrote ${RAW.length} products → ${dest}`);
