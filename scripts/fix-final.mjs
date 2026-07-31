import { readFileSync, writeFileSync } from "fs";
import { URGENT_DISCLAIMER } from "../src/features/first-time-mothers/data/urgentSigns.js";

const babyPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/babyCare.js";
const learnPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/learnArticles.js";
const journeyPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/journeyStages.js";

function kuStrings(text) {
  return [...text.matchAll(/bi\(\s*"[^"]*"\s*,\s*"([^"]*)"\s*\)/g)].map((m) => m[1]);
}

function kuFromFile(text) {
  return kuStrings(text).filter((s) => !/[a-zA-Z]/.test(s));
}

const journey = readFileSync(journeyPath, "utf8");
const jKu = kuFromFile(journey);
const packLine = jKu.find((s) => s.includes("جانتا نەخۆشخانە"));
const supportLine = jKu.find((s) => s.includes("تۆڕی پشتگیری"));
const harmLine = jKu.find((s) => s.includes("بیرکردنەوەی زیانگەیاندن"));
const questionLine = jKu.find((s) => s.includes("پرسیارەکانت"));
const doubtLine = URGENT_DISCLAIMER.ku.slice(URGENT_DISCLAIMER.ku.indexOf("کاتێک گومانت"));

const seekBody3Ku = packLine.split("—")[0].trim() + ". " + URGENT_DISCLAIMER.ku;

function assertNoLatin(label, text) {
  const bad = kuStrings(text).filter((s) => /[a-zA-Z]/.test(s));
  if (bad.length) {
    console.error(`${label}: ${bad.length} bad`);
    bad.forEach((s) => console.error(JSON.stringify(s)));
    process.exit(1);
  }
  console.log(`${label}: ${kuStrings(text).length} ku strings OK`);
}

function q(s) {
  if (/[a-zA-Z]/.test(s)) throw new Error("Latin in ku: " + s);
  return s;
}

const milestones = {
  id: "milestones",
  title: ["Developmental Milestones", q("هەنگاوەکانی گەشە")],
  body: [
    [
      "Milestones are guides, not deadlines. Your baby will smile, lift their head, grasp your finger, and coo in their own time. Comparing to other babies or charts can steal joy — notice your child's unique pace instead.",
      q(
        "هەنگاوەکان ڕێنماییە، نەک کاتێکی کۆتایی. منداڵەکەت بە کاتێکی خۆی پێکەنی، سەر بەرز دەکاتەوە، پەنجەت دەگرێت، و دەنگی نەرم دەدات. بەراوردکردن لەگەڵ منداڵانی تر یان خشتەکان خۆشی دەدزرێنێت — لە جیاتی ئەوە خێرایی تایبەتی منداڵەکەت ببینە."
      ),
    ],
    [
      "In the first months, social smiles, tracking faces with eyes, and stronger head control emerge. By four to six months, rolling and reaching appear. Sitting, babbling, and first teeth may follow between six and twelve months — wide ranges are normal.",
      q(
        "لە مانگە سەرەتاییەکاندا پێکەنی کۆمەڵایەتی، شوێنکەوتنی دەموچاو بە چاو، و بەهێزتری سەر دەردەکەوێت. لە نێوان چوار تا شەش مانگدا گەڕان و درێژکردنەوە دێت. دانیشتن، قسەی منداڵانە، و یەکەم ددان لەوانەیە لە نێوان شەش تا دوازدە مانگدا بن — مەودایەکی فراوان ئاساییە."
      ),
    ],
    [
      "Talk, read, and play face-to-face every day — these simple interactions fuel brain development more than any toy. Trust your instincts; if something feels different from what you expected, your clinician can offer reassurance or a gentle check.",
      q(
        "ڕۆژانە قسە بکە، بخوێنەوە، و ڕاستەوخۆ یاری بکە — ئەم کارە سادانە زیاتر لە هەر یارییەکێک مێشک گەشە پێ دەدەن. متمانە بە هەستەکانت؛ ئەگەر شتێک جیاواز لە چاوەڕوانی بوو، پزیشک دەتوانێت ئاسودابوون یان پشکنینێکی نەرم پێشکەش بکات."
      ),
    ],
  ],
  tips: [
    ["Celebrate attempts, not just successes — effort is development", q("هەوڵ ئاهەنگ بگرە، نەک تەنها سەرکەوتن — هەوڵ گەشەیە")],
    ["Floor time on a safe mat builds strength and exploration", q("کاتی سک لەسەر پاشماڵێکی سالم بەهێزی و گەڕان دروست دەکات")],
    ["Respond to coos and babbles — conversation starts early", q("وەڵامی دەنگە نەرم و قسەکانی منداڵانە بدە — گفتوگۆ زوو دەست پێدەکات")],
    ["Avoid rushing sitting or walking — spine develops in sequence", q("پەلە مەکە بۆ دانیشتن یان ڕۆشتن — ستون بە ڕیز گەشە دەکات")],
  ],
  whenToAsk: [
    ["No social smile by three months", q("بێ پێکەنی کۆمەڵایەتی تا سێ مانگ")],
    ["One side of body seems much weaker or stiff", q("یەک لای لەش زۆر لاواز یان ڕەق دەردەکەوێت")],
    ["Loss of skills once gained — regression deserves attention", q("لەدەستدانی شارەزایی کە بەدەست هاتبوو — گەڕانەوە شایانی سەرنجە")],
  ],
};

const vaccines = {
  id: "vaccines",
  title: ["Vaccines and Immunizations", q("ڤاکسین و پاراستن")],
  body: [
    [
      "Vaccines protect your baby from serious illnesses by teaching the immune system to recognize and fight germs. National schedules vary — your clinician or health visitor will tell you which vaccines are due and when.",
      q(
        "ڤاکسینەکان منداڵەکەت لە نەخۆشییە گرنگەکان پارێزگاری لێ دەکەن بە فێرکردنی سیستەمی بەرگری بۆ ناسین و شکاندنی جەرم. خشتەی وڵات جیاوازە — پزیشک یان سەردانکەری تەندروستی دەڵێت کام ڤاکسین کەیە و کەی."
      ),
    ],
    [
      "Most babies handle vaccines well. Mild fever, fussiness, or soreness at the injection site can occur and usually pass within a day or two. Comfort with cuddles, feeds, and age-appropriate pain relief if your clinician recommends it.",
      q(
        "زۆربەی منداڵەکان ڤاکسین بە باشی وەردەگرن. گەرمیی کەم، نارەحەتی، یان ئازار لە شوێنی دەرزاندن لەوانەیە ڕووبدات و بەزۆری لە یەک یان دوو ڕۆژدا تێدەپەڕێت. بە باوەش، خواردن، و کەمکردنەوەی ئازار بەپێی تەمەن ئەگەر پزیشک پێشنیار کرد."
      ),
    ],
    [
      "Keeping a vaccination record helps at clinic visits and when traveling. If you have questions about timing, ingredients, or your baby's health on the day — ask before the appointment. Informed consent is your right.",
      q(
        "هەڵگرتنی تۆماری ڤاکسین یارمەتی لە سەردانی کلینیک و گەشتدا. ئەگەر پرسیار لە کات، پێکهاتە، یان تەندروستی منداڵ لە ڕۆژی مۆوەبات — پێش کاتی بپرسە. ئەمە مافەکەتە کە بە ئاگاداری بڕیار بدەیت."
      ),
    ],
  ],
  tips: [
    ["Feed before or during the visit — comfort helps", q("پێش یان لە کاتی سەردان بخۆ — ئاسوودابوون یارمەتیدەرە")],
    ["Dress in easy-open clothes for quick access to thighs", q("جلێکی ئاسان بپۆشە بۆ دەستگەیشتن بەمۆر")],
    ["Bring your record card and list any recent illness", q("کارتی تۆمار و هەر نەخۆشییەکی دوایی بهێنە")],
    ["Plan a quiet day after — extra cuddles are medicine too", q("ڕۆژێکی ئارام پلان بکە دوای — باوەشی زیاتر دەرمانە")],
  ],
  whenToAsk: [
    ["High fever lasting more than forty-eight hours after vaccine", q("گەرمی بەرز کە زیاتر لە چل و هەشت کاتژمێر دوای ڤاکسین")],
    ["Unusual crying, limpness, or seizure-like movements", q("گریانی نائاسایی، لاوازی، یان جووڵەی وەک تووشبوون")],
    ["Questions about delaying vaccines due to illness — clinician decides", q("پرسیار لە دواخستنی ڤاکسین بەهۆی نەخۆشی — پزیشک بڕیاردەدات")],
  ],
};

const seekHelp = {
  id: "seekHelp",
  title: ["When to Seek Help", q("کەی داوای یارمەتی بکە")],
  body: [
    [
      "Knowing when to call is a skill — and you do not need to diagnose anything yourself. Trust persistent gut feelings. If something feels wrong, even without a clear symptom, your care team would rather hear from you early than late.",
      q(
        "زانینی کەی پەیوەندی بکە شارەزاییەکە — و پێویست نییە خۆت هیچ شتێک دەستنیشان بکەیت. متمانە بە هەستی بەردەوام. ئەگەر شتێک هەڵە دەردەکەوێت، تەنها بەبێ نیشانەی ڕوون، تیمە چاودێریەکەت پێشتر لە دواکەوتن حەز دەکات بیستێت."
      ),
    ],
    [
      "Contact promptly for fever in young infants, breathing difficulty, blue or grey skin, fewer wet diapers, projectile vomiting, a bulging soft spot, or unresponsive limpness. For yourself postpartum — heavy bleeding, chest pain, severe headache, or thoughts of harm also need urgent attention.",
      q(
        "بە خێرایی پەیوەندی بکە بۆ گەرمی لە منداڵی بچووک، کێشەی هەناسە، پێستی شین یان ڕەنگی خۆڵ، کەمبوونی پامپەری تەڕ، ڕشانەوەی بەهێز، یان لاوازی بێ وەڵام. بۆ خۆت دوای لەدایکبوون — خونباری قورس، ئازاری سینە، سەرئێشەی توند، یان بیرکردنەوەی زیانگەیاندن بە خۆت — هەموویان پێویستی بە سەرنجی فوری هەیە."
      ),
    ],
    [
      "Keep emergency numbers saved and know your nearest hospital. For non-urgent worries, a phone call to your midwife, health visitor, or pediatric line can ease anxiety. You are never bothering anyone by asking — that is what they are there for.",
      q("جانتا نەخۆشخانە ئامادە بکە و ڕێگاکەت بزانە. ئەم لیستە تەنها بۆ ئاگاداری پەروەردەییە — نەک دەستنیشانکردن. ئەگەر نادڵنیایت، پەیوەندی بە مامانی، پزیشک، یان خزمەتگوزاری فریاگوزاری بکە. کاتێک گومانت هەبوو، هەمیشە ڕێگەپێدراوە داوای یارمەتی بکەیت."),
    ],
  ],
  tips: [
    ["Save clinic, midwife, and emergency numbers on your phone", q("تۆڕی پشتگیری نوێ بکەوە — کێ دەتوانیت پەیوەندی پێوە بکەیت؟")],
    ["Write symptoms and timing before calling — clarity helps", q("پرسیارەکانت بۆ پزیشک تۆمار بکە")],
    ["If unsure, call — 'better safe' is valid for new parents", q("کاتێک گومانت هەبوو، هەمیشە ڕێگەپێدراوە داوای یارمەتی بکەیت.")],
    ["Know where to go at night and on weekends", q("جانتا نەخۆشخانە ئامادە بکە و ڕێگاکەت بزانە")],
  ],
  whenToAsk: [
    ["Any urgent sign from this guide or your clinician's list", q("هەر نیشانەی فوری — پزیشک بپرسە")],
    ["Baby under three months with any fever — always call same day", q("گەرمیی ٣٨ پلە یان زیاتر لە منداڵی خوار سێ مانگ")],
    ["You feel unable to keep yourself or baby safe — call immediately", q("بیرکردنەوەی زیانگەیاندن بە خۆت یان منداڵ — دەستبەجێ پەیوەندی بکە")],
  ],
};

function renderTopic(t) {
  const lines = [
    `  {`,
    `    id: "${t.id}",`,
    `    title: bi(${JSON.stringify(t.title[0])}, ${JSON.stringify(t.title[1])}),`,
    `    body: [`,
    ...t.body.map(
      ([en, ku]) =>
        `      bi(\n        ${JSON.stringify(en)},\n        ${JSON.stringify(ku)}\n      ),`
    ),
    `    ],`,
    `    tips: [`,
    ...t.tips.map(
      ([en, ku]) => `      bi(${JSON.stringify(en)}, ${JSON.stringify(ku)}),`
    ),
    `    ],`,
    `    whenToAsk: [`,
    ...t.whenToAsk.map(
      ([en, ku]) => `      bi(${JSON.stringify(en)}, ${JSON.stringify(ku)}),`
    ),
    `    ],`,
    `  },`,
  ];
  return lines.join("\n");
}

// Validate all q() strings passed - fix any that throw
try {
  [milestones, vaccines, seekHelp];
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

let baby = readFileSync(babyPath, "utf8");
if (baby.includes("PLACEHOLDER")) {
  console.error("babyCare corrupted - restore from git or backup needed");
  process.exit(1);
}

baby = baby.replace(/گەرmkirdn/g, "گەرمبوون");
const cut = baby.indexOf('    id: "milestones"');
const headEnd = baby.lastIndexOf("  {", cut);
const head = baby.slice(0, headEnd);

const tail =
  renderTopic(milestones) +
  "\n" +
  renderTopic(vaccines) +
  "\n" +
  renderTopic(seekHelp).replace(/,$/, "") +
  "\n];\n";

writeFileSync(babyPath, head + tail);
assertNoLatin("babyCare", readFileSync(babyPath, "utf8"));

console.log("babyCare tail written");
