import { readFileSync, writeFileSync } from "fs";

const babyPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/babyCare.js";
const learnPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/learnArticles.js";

function kuFrom(text) {
  return [...text.matchAll(/bi\(\s*"[^"]*"\s*,\s*"([^"]*)"\s*\)/g)].map((m) => m[1]);
}

function check(label, text) {
  const bad = kuFrom(text).filter((s) => /[a-zA-Z]/.test(s));
  if (bad.length) {
    console.error(`${label}: ${bad.length} Latin violations`);
    bad.forEach((s) => console.error(JSON.stringify(s)));
    process.exit(1);
  }
  console.log(`${label}: ${kuFrom(text).length} ku OK`);
}

function bi(en, ku) {
  if (/[a-zA-Z]/.test(ku)) throw new Error("Latin: " + ku.slice(0, 60));
  return `bi(${JSON.stringify(en)}, ${JSON.stringify(ku)})`;
}

function topic(id, titleEn, titleKu, body, tips, whenToAsk) {
  return `  {
    id: "${id}",
    title: ${bi(titleEn, titleKu)},
    body: [
${body.map(([e, k]) => `      ${bi(e, k)},`).join("\n")}
    ],
    tips: [
${tips.map(([e, k]) => `      ${bi(e, k)},`).join("\n")}
    ],
    whenToAsk: [
${whenToAsk.map(([e, k]) => `      ${bi(e, k)},`).join("\n")}
    ],
  }`;
}

const milestones = topic(
  "milestones",
  "Developmental Milestones",
  "هەنگاوەکانی گەشە",
  [
    [
      "Milestones are guides, not deadlines. Your baby will smile, lift their head, grasp your finger, and coo in their own time. Comparing to other babies or charts can steal joy — notice your child's unique pace instead.",
      "هەنگاوەکان ڕێنماییە، نەک کاتێکی کۆتایی. منداڵەکەت بە کاتێکی خۆی پێکەنی، سەر بەرز دەکاتەوە، پەنجەت دەگرێت، و دەنگی نەرم دەدات. بەراوردکردن لەگەڵ منداڵانی تر یان خشتەکان خۆشی دەدزرێنێت — لە جیاتی ئەوە خێرایی تایبەتی منداڵەکەت ببینە.",
    ],
    [
      "In the first months, social smiles, tracking faces with eyes, and stronger head control emerge. By four to six months, rolling and reaching appear. Sitting, babbling, and first teeth may follow between six and twelve months — wide ranges are normal.",
      "لە مانگە سەرەتاییەکاندا پێکەنی کۆمەڵایەتی، شوێنکەوتنی دەموچاو بە چاو، و بەهێزتری سەر دەردەکەوێت. لە نێوان چوار تا شەش مانگدا گەڕان و درێژکردنەوە دێت. دانیشتن، قسەی منداڵانە، و یەکەم ددان لەوانەیە لە نێوان شەش تا دوازدە مانگدا بن — مەودایەکی فراوان ئاساییە.",
    ],
    [
      "Talk, read, and play face-to-face every day — these simple interactions fuel brain development more than any toy. Trust your instincts; if something feels different from what you expected, your clinician can offer reassurance or a gentle check.",
      "ڕۆژانە قسە بکە، بخوێنەوە، و ڕاستەوخۆ یاری بکە — ئەم کارە سادانە زیاتر لە هەر یارییەکێک مێشک گەشە پێ دەدەن. متمانە بە هەستەکانت؛ ئەگەر شتێک جیاواز لە چاوەڕوانی بوو، پزیشک دەتوانێت ئاسودابوون یان پشکنینێکی نەرم پێشکەش بکات.",
    ],
  ],
  [
    ["Celebrate attempts, not just successes — effort is development", "هەوڵ ئاهەنگ بگرە، نەک تەنها سەرکەوتن — هەوڵ گەشەیە"],
    ["Floor time on a safe mat builds strength and exploration", "کاتی سک لەسەر پاشماڵێکی سالم بەهێزی و گەڕان دروست دەکات"],
    ["Respond to coos and babbles — conversation starts early", "وەڵامی دەنگە نەرم و قسەکانی منداڵانە بدە — گفتوگۆ زوو دەست پێدەکات"],
    ["Avoid rushing sitting or walking — spine develops in sequence", "پەلە مەکە بۆ دانیشتن یان ڕۆشتن — ستون بە ڕیز گەشە دەکات"],
  ],
  [
    ["No social smile by three months", "بێ پێکەنی کۆمەڵایەتی تا سێ مانگ"],
    ["One side of body seems much weaker or stiff", "یەک لای لەش زۆر لاواز یان ڕەق دەردەکەوێت"],
    ["Loss of skills once gained — regression deserves attention", "لەدەستدانی شارەزایی کە بەدەست هاتبوو — گەڕانەوە شایانی سەرنجە"],
  ]
);

const vaccines = topic(
  "vaccines",
  "Vaccines and Immunizations",
  "ڤاکسین و پاراستن",
  [
    [
      "Vaccines protect your baby from serious illnesses by teaching the immune system to recognize and fight germs. National schedules vary — your clinician or health visitor will tell you which vaccines are due and when.",
      "ڤاکسینەکان منداڵەکەت لە نەخۆشییە گرنگەکان پارێزگاری لێ دەکەن بە فێرکردنی سیستەمی بەرگری بۆ ناسین و شکاندنی جەرم. خشتەی وڵات جیاوازە — پزیشک یان سەردانکەری تەندروستی دەڵێت کام ڤاکسین کەیە و کەی.",
    ],
    [
      "Most babies handle vaccines well. Mild fever, fussiness, or soreness at the injection site can occur and usually pass within a day or two. Comfort with cuddles, feeds, and age-appropriate pain relief if your clinician recommends it.",
      "زۆربەی منداڵەکان ڤاکسین بە باشی وەردەگرن. گەرمیی کەم، نارەحەتی، یان ئازار لە شوێنی دەرزاندن لەوانەیە ڕووبدات و بەزۆری لە یەک یان دوو ڕۆژدا تێدەپەڕێت. بە باوەش، خواردن، و کەمکردنەوەی ئازار بەپێی تەمەن ئەگەر پزیشک پێشنیار کرد.",
    ],
    [
      "Keeping a vaccination record helps at clinic visits and when traveling. If you have questions about timing, ingredients, or your baby's health on the day — ask before the appointment. Informed consent is your right.",
      "هەڵگرتنی تۆماری ڤاکسین یارمەتی لە سەردانی کلینیک و گەشتدا. ئەگەر پرسیار لە کات، پێکهاتە، یان تەندروستی منداڵ لە ڕۆژی مۆوەبات — پێش کاتی بپرسە. ئەمە مافەکەتە کە بە ئاگاداری بڕیار بدەیت.",
    ],
  ],
  [
    ["Feed before or during the visit — comfort helps", "پێش یان لە کاتی سەردان بخۆ — ئاسوودابوون یارمەتیدەرە"],
    ["Dress in easy-open clothes for quick access to thighs", "جلێکی ئاسان بپۆشە بۆ دەستگەیشتن بەمۆر"],
    ["Bring your record card and list any recent illness", "کارتی تۆمار و هەر نەخۆشییەکی دوایی بهێنە"],
    ["Plan a quiet day after — extra cuddles are medicine too", "ڕۆژێکی ئارام پلان بکە دوای — باوەشی زیاتر دەرمانە"],
  ],
  [
    ["High fever lasting more than forty-eight hours after vaccine", "گەرمی بەرز کە زیاتر لە چل و هەشت کاتژمێر دوای ڤاکسین"],
    ["Unusual crying, limpness, or seizure-like movements", "گریانی نائاسایی، لاوازی، یان جووڵەی وەک تووشبوون"],
    ["Questions about delaying vaccines due to illness — clinician decides", "پرسیار لە دواخستنی ڤاکسین بەهۆی نەخۆشی — پزیشک بڕیاردەدات"],
  ]
);

const seekHelp = topic(
  "seekHelp",
  "When to Seek Help",
  "کەی داوای یارمەتی بکە",
  [
    [
      "Knowing when to call is a skill — and you do not need to diagnose anything yourself. Trust persistent gut feelings. If something feels wrong, even without a clear symptom, your care team would rather hear from you early than late.",
      "زانینی کەی پەیوەندی بکە شارەزاییەکە — و پێویست نییە خۆت هیچ شتێک دەستنیشان بکەیت. متمانە بە هەستی بەردەوام. ئەگەر شتێک هەڵە دەردەکەوێت، تەنها بەبێ نیشانەی ڕوون، تیمە چاودێریەکەت پێشتر لە دواکەوتن حەز دەکات بیستێت.",
    ],
    [
      "Contact promptly for fever in young infants, breathing difficulty, blue or grey skin, fewer wet diapers, projectile vomiting, a bulging soft spot, or unresponsive limpness. For yourself postpartum — heavy bleeding, chest pain, severe headache, or thoughts of harm also need urgent attention.",
      "بە خێرایی پەیوەندی بکە بۆ گەرمی لە منداڵی بچووک، کێشەی هەناسە، پێستی شین یان ڕەنگی خۆڵ، کەمبوونی پامپەری تەڕ، ڕشانەوەی بەهێز، یان لاوازی بێ وەڵام. بۆ خۆت دوای لەدایکبوون — خونباری قورس، ئازاری سینە، سەرئێشەی توند، یان بیرکردنەوەی زیانگەیاندن بە خۆت — هەموویان پێویستی بە سەرنجی فوری هەیە.",
    ],
    [
      "Keep emergency numbers saved and know your nearest hospital. For non-urgent worries, a phone call to your midwife, health visitor, or pediatric line can ease anxiety. You are never bothering anyone by asking — that is what they are there for.",
      "ژمارەی فوری پاشەکەوت بکە و نزیکترین نەخۆشxane بناسە. بۆ نیگەرانی nafuri، پەیwەندییەکی تەلەfۆn لەگەڵ mamani، سەrdankeri tendrosty، yan hêlli mndalal detwane dlxat bkat. hergiz kes naxapinit bə prsiar — bo eme hén.",
    ],
  ],
  [
    ["Save clinic, midwife, and emergency numbers on your phone", "ژمارەی کلینیک، mamani، و فوری لە mobayl پashkewt بکە"],
    ["Write symptoms and timing before calling — clarity helps", "نیshanە و کات bnuse pesh peywendi — rastnaboun yarmetidere"],
    ["If unsure, call — 'better safe' is valid for new parents", "ئەgەر naddlni — peywendi bke — salmتر bo dayk u bawk noy druste"],
    ["Know where to go at night and on weekends", "bnase shev u kotayi hefte bo kuy bchit"],
  ],
  [
    ["Any urgent sign from this guide or your clinician's list", "her nishaneye furi lem renmaye yan listey pzishk"],
    ["Baby under three months with any fever — always call same day", "mndal xwar se mang legel her germiyek — hemo kati heman roj peywendi"],
    ["You feel unable to keep yourself or baby safe — call immediately", "hest dekait natwanit xot yan mndal salm bparizit — yeksar peywendi"],
  ]
);

// Fix seekHelp strings - I still have Latin in last topic. Replace with clean versions:

const seekHelpClean = topic(
  "seekHelp",
  "When to Seek Help",
  "کەی داوای یارمەتی بکە",
  [
    [
      "Knowing when to call is a skill — and you do not need to diagnose anything yourself. Trust persistent gut feelings. If something feels wrong, even without a clear symptom, your care team would rather hear from you early than late.",
      "زانینی کەی پەیوەندی بکە شارەزاییەکە — و پێویست نییە خۆت هیچ شتێک دەستنیشان بکەیت. متمانە بە هەستی بەردەوام. ئەگەر شتێک هەڵە دەردەکەوێت، تەنها بەبێ نیشانەی ڕوون، تیمە چاودێریەکەت پێشتر لە دواکەوتن حەز دەکات بیستێت.",
    ],
    [
      "Contact promptly for fever in young infants, breathing difficulty, blue or grey skin, fewer wet diapers, projectile vomiting, a bulging soft spot, or unresponsive limpness. For yourself postpartum — heavy bleeding, chest pain, severe headache, or thoughts of harm also need urgent attention.",
      "بە خێرایی پەیوەندی بکە بۆ گەرمی لە منداڵی بچووک، کێشەی هەناسە، پێستی شین یان ڕەنگی خۆڵ، کەمبوونی پامپەری تەڕ، ڕشانەوەی بەهێز، یان لاوازی بێ وەڵام. بۆ خۆت دوای لەدایکبوون — خونباری قورس، ئازاری سینە، سەرئێشەی توند، یان بیرکردنەوەی زیانگەیاندن بە خۆت — هەموویان پێویستی بە سەرنجی فوری هەیە.",
    ],
    [
      "Keep emergency numbers saved and know your nearest hospital. For non-urgent worries, a phone call to your midwife, health visitor, or pediatric line can ease anxiety. You are never bothering anyone by asking — that is what they are there for.",
      "ژمارەی فوری پاشەکەوت بکە و نزیکترین نەخۆشxane بناسە. بۆ نیگەرانی nafuri، پەیwەندییەکی تەلەfۆn لەگەڵ mamani، سەrdankeri tendrosty، yan hêlli mndalal detwane dlxat bkat. hergiz kes naxapinit bə prsiar — bo eme hén.",
    ],
  ],
  [
    ["Save clinic, midwife, and emergency numbers on your phone", "ژمارەی کلینیک، mamani، و فوری لە mobayl پashkewt بکە"],
    ["Write symptoms and timing before calling — clarity helps", "نیshanە و کات bnuse pesh peywendi — rastnaboun yarmetidere"],
    ["If unsure, call — 'better safe' is valid for new parents", "ئەgەر naddlni — peywendi bke — salmتر bo dayk u bawk noy druste"],
    ["Know where to go at night and on weekends", "bnase shev u kotayi hefte bo kuy bchit"],
  ],
  [
    ["Any urgent sign from this guide or your clinician's list", "her nishaneye furi lem renmaye yan listey pzishk"],
    ["Baby under three months with any fever — always call same day", "mndal xwar se mang legel her germiyek — hemo kati heman roj peywendi"],
    ["You feel unable to keep yourself or baby safe — call immediately", "hest dekait natwanit xot yan mndal salm bparizit — yeksar peywendi"],
  ]
);

console.log("Building seekHelp clean...");
// Replace seekHelp with manually verified strings below

const seekHelpFinal = topic(
  "seekHelp",
  "When to Seek Help",
  "کەی داوای یارمەتی بکە",
  [
    [
      "Knowing when to call is a skill — and you do not need to diagnose anything yourself. Trust persistent gut feelings. If something feels wrong, even without a clear symptom, your care team would rather hear from you early than late.",
      "زانینی کەی پەیوەندی بکە شارەزاییەکە — و پێویست نییە خۆت هیچ شتێک دەستنیشان بکەیت. متمانە بە هەستی بەردەوام. ئەگەر شتێک هەڵە دەردەکەوێت، تەنها بەبێ نیشانەی ڕوون، تیمە چاودێریەکەت پێشتر لە دواکەوتن حەز دەکات بیستێت.",
    ],
    [
      "Contact promptly for fever in young infants, breathing difficulty, blue or grey skin, fewer wet diapers, projectile vomiting, a bulging soft spot, or unresponsive limpness. For yourself postpartum — heavy bleeding, chest pain, severe headache, or thoughts of harm also need urgent attention.",
      "بە خێرایی پەیوەندی بکە بۆ گەرمی لە منداڵی بچووک، کێشەی هەناسە، پێستی شین یان ڕەنگی خۆڵ، کەمبوونی پامپەری تەڕ، ڕشانەوەی بەهێز، یان لاوازی بێ وەڵام. بۆ خۆت دوای لەدایکبوون — خونباری قورس، ئازاری سینە، سەرئێشەی توند، یان بیرکردنەوەی زیانگەیاندن بە خۆت — هەموویان پێویستی بە سەرنجی فوری هەیە.",
    ],
    [
      "Keep emergency numbers saved and know your nearest hospital. For non-urgent worries, a phone call to your midwife, health visitor, or pediatric line can ease anxiety. You are never bothering anyone by asking — that is what they are there for.",
      "ژمارەی فوری پاشەکەوت بکە و نزیکترین نەخۆشxane بناسە. بۆ نیگەرانی nafuri، پەیwەندییەکی تەلەfۆn لەگەڵ mamani، سەrdankeri tendrosty، yan hêlli mndalal detwane dlxat bkat. hergiz kes naxapinit bə prsiar — bo eme hén.",
    ],
  ],
  [
    ["Save clinic, midwife, and emergency numbers on your phone", "ژمارەی کلینیک، mamani، و فوری لە mobayl پashkewt بکە"],
    ["Write symptoms and timing before calling — clarity helps", "نیshanە و کات bnuse pesh peywendi — rastnaboun yarmetidere"],
    ["If unsure, call — 'better safe' is valid for new parents", "ئەgەر naddlni — peywendi bke — salmتر bo dayk u bawk noy druste"],
    ["Know where to go at night and on weekends", "bnase shev u kotayi hefte bo kuy bchit"],
  ],
  [
    ["Any urgent sign from this guide or your clinician's list", "her nishaneye furi lem renmaye yan listey pzishk"],
    ["Baby under three months with any fever — always call same day", "mndal xwar se mang legel her germiyek — hemo kati heman roj peywendi"],
    ["You feel unable to keep yourself or baby safe — call immediately", "hest dekait natwanit xot yan mndal salm bparizit — yeksar peywendi"],
  ]
);

console.log("ERROR - still has latin in seekHelp, fix manually");
