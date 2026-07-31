/**
 * Short bilingual organ lessons for the lightweight BodyWise experience.
 * Keep each idea brief — no walls of text.
 */

export const LITE_ORGAN_IDS = [
  "brain",
  "heart",
  "lungs",
  "liver",
  "stomach",
  "kidneys",
  "pancreas",
  "spleen",
  "intestines",
  "gallbladder",
  "bladder",
];

/** Map UI ids — intestines covers small+large for selection; games may split. */
export const LITE_ORGANS = {
  brain: {
    id: "brain",
    name: { en: "Brain", ku: "مێشک" },
    accent: "#c4a1ff",
    location: {
      en: "Inside the skull, protected by bone and fluid.",
      ku: "ناو کەلەکەرە، پارێزراو بە ئێسک و شلە.",
    },
    role: {
      en: "Controls thought, movement, senses, and vital reflexes.",
      ku: "بیرکردنەوە، جووڵە، هەست و وەڵامە گرنگەکان کۆنتڕۆڵ دەکات.",
    },
    fact: {
      en: "It uses about 20% of your resting energy.",
      ku: "نزیکەی ٢٠٪ی وزەی پشوو بەکاردەهێنێت.",
    },
    myth: {
      en: "Myth: you only use 10% of your brain. Truth: nearly all regions work over a day.",
      ku: "ئەفسانە: تەنها ١٠٪ی مێشک بەکاردەهێنیت. ڕاستی: زۆربەی ناوچەکان کار دەکەن.",
    },
    habit: {
      en: "Protect it: sleep, helmets, and healthy blood pressure.",
      ku: "بیپارێزە: خەو، کلاو، و فشاری خوێنی تەندروست.",
    },
    challenge: {
      en: "Name three things your brainstem helps keep automatic.",
      ku: "سێ شت بڵێ کە بنەمای مێشک بە شێوەیەکی خۆکار دەیانپارێزێت.",
    },
  },
  heart: {
    id: "heart",
    name: { en: "Heart", ku: "دڵ" },
    accent: "#ff4d6d",
    location: {
      en: "Behind the breastbone, slightly left of center.",
      ku: "پشت ئێسکی سنگ، کەمێک چەپ لە ناوەڕاست.",
    },
    role: {
      en: "Pumps blood through the lungs and the rest of the body.",
      ku: "خوێن بۆ سیەکان و هەموو جەستە دەپاڵێوێت.",
    },
    fact: {
      en: "It can beat around 100,000 times in one day.",
      ku: "دەتوانێت لە یەک ڕۆژدا نزیکەی ١٠٠٬٠٠٠ جار بدات.",
    },
    myth: {
      en: "Myth: the heart is fully on the left. Truth: it is mostly central, tip tilted left.",
      ku: "ئەفسانە: دڵ تەواو لە چەپە. ڕاستی: زۆربەی ناوەڕاستە، سەری کەمێک چەپە.",
    },
    habit: {
      en: "Move daily, avoid smoking, know your blood pressure.",
      ku: "ڕۆژانە جووڵە بکە، جگەرە مەکێشە، فشاری خوێنت بزانە.",
    },
    challenge: {
      en: "Trace: heart → lungs → heart → body.",
      ku: "ڕێگا بکێشە: دڵ → سیەکان → دڵ → جەستە.",
    },
  },
  lungs: {
    id: "lungs",
    name: { en: "Lungs", ku: "سیەکان" },
    accent: "#5dade2",
    location: {
      en: "Either side of the heart, filling most of the chest.",
      ku: "هەردوو لای دڵ، زۆربەی سنگ پڕ دەکەن.",
    },
    role: {
      en: "Exchange oxygen and carbon dioxide with your blood.",
      ku: "ئۆکسجین و دووەم ئۆکسیدی کاربۆن لەگەڵ خوێن دەگۆڕن.",
    },
    fact: {
      en: "The right lung usually has three lobes; the left has two.",
      ku: "سیی ڕاست زۆرجار سێ لۆبی هەیە؛ چەپ دوو.",
    },
    myth: {
      en: "Myth: lungs are empty bags. Truth: they are sponge-like tissue full of airways.",
      ku: "ئەفسانە: سیەکان کیسەی بەتاڵن. ڕاستی: شانەی اسفەنجی پڕ لە ڕێڕەوی هەوان.",
    },
    habit: {
      en: "Avoid smoke and polluted air; stay active outdoors when air is clean.",
      ku: "دووکەڵ و هەوای پیس دووربکەوە؛ کاتێک هەوا پاکە چالاک بە.",
    },
    challenge: {
      en: "Breathe in for 4, hold 4, out for 4 — feel the chest expand.",
      ku: "٤ هەناسە بکێشە، ٤ ڕاگرە، ٤ دەرکە — هەست بە فراوانبوونی سنگ بکە.",
    },
  },
  liver: {
    id: "liver",
    name: { en: "Liver", ku: "جەرگ" },
    accent: "#c4785a",
    location: {
      en: "Upper-right abdomen, mostly under the ribs.",
      ku: "سەرەوەی ڕاستی سک، زۆربەی لە ژێر قەفەسە.",
    },
    role: {
      en: "Processes nutrients, makes bile, and clears many toxins.",
      ku: "خۆراک چارەسەر دەکات، زەرداو دروست دەکات، زۆر ژەهر پاک دەکاتەوە.",
    },
    fact: {
      en: "It is the largest internal solid organ in the body.",
      ku: "گەورەترین ئەندامی ڕەقی ناوەوەی جەستەیە.",
    },
    myth: {
      en: "Myth: only alcohol harms the liver. Truth: viruses, fat, and medicines matter too.",
      ku: "ئەفسانە: تەنها خواردنەوە زیان بە جەرگ دەگەیەنێت. ڕاستی: ڤایرۆس و چەوری و دەرمانیش گرنگن.",
    },
    habit: {
      en: "Limit excess alcohol; keep a balanced diet; follow medicine advice.",
      ku: "خواردنەوە زیاد مەکە؛ خۆراکی باڵانس؛ ئامۆژگاری دەرمان جێبەجێ بکە.",
    },
    challenge: {
      en: "Which quadrant holds most of the liver — upper right or upper left?",
      ku: "زۆربەی جەرگ لە کام بەشە — سەرەوەی ڕاست یان سەرەوەی چەپ؟",
    },
  },
  stomach: {
    id: "stomach",
    name: { en: "Stomach", ku: "گەدە" },
    accent: "#e07a5f",
    location: {
      en: "Upper-left abdomen, under the diaphragm.",
      ku: "سەرەوەی چەپی سک، لە ژێر دیافرام.",
    },
    role: {
      en: "Mixes food with acid and enzymes to start digestion.",
      ku: "خواردن لەگەڵ ترش و ئەنزیم تێکەڵ دەکات بۆ دەستپێکی هەرس.",
    },
    fact: {
      en: "Its lining renews quickly to survive strong acid.",
      ku: "پێستەکەی خێرا نوێ دەبێتەوە بۆ مانەوە لە ترشی بەهێز.",
    },
    myth: {
      en: "Myth: ulcers come only from spicy food. Truth: infection and medicines are common causes.",
      ku: "ئەفسانە: زەخم تەنها لە خواردنی تیژە. ڕاستی: هەوکردن و دەرمان هۆکاری باون.",
    },
    habit: {
      en: "Eat calmly; avoid lying flat right after large meals if reflux bothers you.",
      ku: "بە ئارامی بخۆ؛ ئەگەر ڕیفلەکس هەیە دوای خواردنی گەورە ڕاست مەکەوە.",
    },
    challenge: {
      en: "Food leaves the stomach into which organ next?",
      ku: "خواردن لە گەدە دەچێتە کام ئەندامی داهاتوو؟",
    },
  },
  kidneys: {
    id: "kidneys",
    name: { en: "Kidneys", ku: "گورچیلەکان" },
    accent: "#7ec8a3",
    location: {
      en: "Retroperitoneal, either side of the spine, mid-back level.",
      ku: "پشت پەردەی سک، هەردوو لای بڕبڕە، ئاستی ناوەڕاستی پشت.",
    },
    role: {
      en: "Filter blood, balance fluids, and help control blood pressure.",
      ku: "خوێن فلتەر دەکەن، شلە باڵانس دەکەن، یارمەتی فشاری خوێن دەدەن.",
    },
    fact: {
      en: "Together they filter roughly 180 liters of fluid a day.",
      ku: "پێکەوە نزیکەی ١٨٠ لیتر شلە لە ڕۆژێکدا فلتەر دەکەن.",
    },
    myth: {
      en: "Myth: back pain always means kidney disease. Truth: muscle strain is far more common.",
      ku: "ئەفسانە: ئازاری پشت هەمیشە نەخۆشی گورچیلەیە. ڕاستی: گرژی ماسوولکە زۆر باوترە.",
    },
    habit: {
      en: "Stay hydrated as appropriate; manage blood pressure and diabetes risk.",
      ku: "ئاو بە پێی پێویست بخۆرەوە؛ فشار و مەترسی شەکرە کۆنتڕۆڵ بکە.",
    },
    challenge: {
      en: "Are the kidneys in front of or behind the abdominal cavity lining?",
      ku: "گورچیلەکان لە پێش یان لە پشت پەردەی سکدان؟",
    },
  },
  pancreas: {
    id: "pancreas",
    name: { en: "Pancreas", ku: "پەنکریاس" },
    accent: "#e9c46a",
    location: {
      en: "Deep in the upper abdomen, behind the stomach.",
      ku: "قووڵ لە سەرەوەی سک، پشت گەدە.",
    },
    role: {
      en: "Makes digestive enzymes and hormones such as insulin.",
      ku: "ئەنزیمی هەرس و هۆرمۆن وەک ئینسولین دروست دەکات.",
    },
    fact: {
      en: "It has both digestive (exocrine) and hormone (endocrine) jobs.",
      ku: "هەم کاری هەرس و هەم کاری هۆرمۆنی هەیە.",
    },
    myth: {
      en: "Myth: the pancreas only handles sugar. Truth: it also feeds the digestive tract enzymes.",
      ku: "ئەفسانە: پەنکریاس تەنها شەکر دەکات. ڕاستی: ئەنزیمی هەرسیش دەدات.",
    },
    habit: {
      en: "Balanced meals and avoiding smoking support pancreatic health.",
      ku: "خۆراکی باڵانس و دوورکەوتنەوە لە جگەرە پشتگیری تەندروستی پەنکریاس دەکات.",
    },
    challenge: {
      en: "Name one hormone from the pancreas that lowers blood sugar.",
      ku: "یەک هۆرمۆنی پەنکریاس بڵێ کە شەکری خوێن دادەبەزێنێت.",
    },
  },
  spleen: {
    id: "spleen",
    name: { en: "Spleen", ku: "سپڵین" },
    accent: "#9b6bb5",
    location: {
      en: "Upper-left abdomen, under the rib cage near the stomach.",
      ku: "سەرەوەی چەپی سک، ژێر قەفەس نزیک گەدە.",
    },
    role: {
      en: "Filters blood and supports immune responses.",
      ku: "خوێن فلتەر دەکات و پشتگیری بەرگری دەکات.",
    },
    fact: {
      en: "It can store platelets and recycle old red blood cells.",
      ku: "دەتوانێت پلەیتڵێت هەڵبگرێت و خڕۆکەی سووری کۆن دووبارە بەکاربهێنێتەوە.",
    },
    myth: {
      en: "Myth: you cannot live without a spleen. Truth: life continues, but infection risk rises.",
      ku: "ئەفسانە: بەبێ سپڵین ناژیت. ڕاستی: دەژیت، بەڵام مەترسی هەوکردن زیاد دەبێت.",
    },
    habit: {
      en: "After spleen removal, follow vaccine and fever advice from clinicians.",
      ku: "دوای لابردنی سپڵین، ئامۆژگاری ڤاکسین و تا لە پزیشک وەربگرە.",
    },
    challenge: {
      en: "Is the spleen usually on the same side as the liver or the stomach?",
      ku: "سپڵین زۆرجار لە هەمان لای جەرگە یان گەدە؟",
    },
  },
  intestines: {
    id: "intestines",
    name: { en: "Intestines", ku: "ڕیخۆڵەکان" },
    accent: "#2a9d8f",
    location: {
      en: "Fill much of the abdomen — small bowel centrally, colon framing the sides.",
      ku: "زۆربەی سک پڕ دەکەن — ڕیخۆڵەی بچووک ناوەڕاست، کۆلۆن لە لایەکان.",
    },
    role: {
      en: "Absorb nutrients and water; move waste toward exit.",
      ku: "خۆراک و ئاو هەڵدەمژن؛ پاشماوە بۆ دەرچوون دەجووڵێنن.",
    },
    fact: {
      en: "The small intestine is several meters long in adults.",
      ku: "ڕیخۆڵەی بچووک لە گەورەدا چەند مەتر درێژە.",
    },
    myth: {
      en: "Myth: digestion finishes in the stomach. Truth: most absorption happens in the intestines.",
      ku: "ئەفسانە: هەرس لە گەدە تەواو دەبێت. ڕاستی: زۆربەی هەڵمژین لە ڕیخۆڵەدایە.",
    },
    habit: {
      en: "Fiber, fluids, and movement keep the gut happier.",
      ku: "فایبەر، شلە، و جووڵە ڕیخۆڵە دڵخۆشتر دەکەن.",
    },
    challenge: {
      en: "Which is longer in adults — small intestine or large intestine?",
      ku: "کام درێژترە لە گەورەدا — ڕیخۆڵەی بچووک یان گەورە؟",
    },
  },
  gallbladder: {
    id: "gallbladder",
    name: { en: "Gallbladder", ku: "زەرداوەدان" },
    accent: "#6ab04c",
    location: {
      en: "Tucked under the liver on the right side.",
      ku: "لە ژێر جەرگ لە لای ڕاست.",
    },
    role: {
      en: "Stores and concentrates bile, then releases it for fat digestion.",
      ku: "زەرداو هەڵدەگرێت و چڕ دەکاتەوە، پاشان بۆ هەرزی چەوری دەری دەدات.",
    },
    fact: {
      en: "Bile from the liver can still reach the intestine if the gallbladder is removed.",
      ku: "ئەگەر زەرداوەدان لاببرێت، زەرداوی جەرگ هێشتا دەگاتە ڕیخۆڵە.",
    },
    myth: {
      en: "Myth: gallstones always need emergency surgery. Truth: many are watched; some need planned care.",
      ku: "ئەفسانە: بەردی زەرداو هەمیشە نەشتەرگەری فریاکەوتنە. ڕاستی: زۆر چاودێری دەکرێن.",
    },
    habit: {
      en: "A balanced diet and healthy weight support biliary health.",
      ku: "خۆراکی باڵانس و کێشی تەندروست پشتگیری تەندروستی زەرداو دەکات.",
    },
    challenge: {
      en: "Which organ produces the bile the gallbladder stores?",
      ku: "کام ئەندام زەرداو دروست دەکات کە زەرداوەدان هەڵیدەگرێت؟",
    },
  },
  bladder: {
    id: "bladder",
    name: { en: "Bladder", ku: "میزەڵدان" },
    accent: "#74b9ff",
    location: {
      en: "In the pelvis, behind the pubic bone.",
      ku: "ناو حەوز، پشت ئێسکی پوبیک.",
    },
    role: {
      en: "Stores urine from the kidneys until you urinate.",
      ku: "میز لە گورچیلەکان هەڵدەگرێت تا دەری دەکەیت.",
    },
    fact: {
      en: "Its wall is a stretchy muscle that can expand as it fills.",
      ku: "دیواری ماسوولکەی کشاوە کە پڕ دەبێت فراوان دەبێت.",
    },
    myth: {
      en: "Myth: holding urine strengthens the bladder. Truth: regular emptying is healthier.",
      ku: "ئەفسانە: ڕاگرتنی میز میزەڵدان بەهێز دەکات. ڕاستی: بەتاڵکردنەوەی ڕێک تەندروستترە.",
    },
    habit: {
      en: "Hydrate sensibly; do not ignore strong urges for long periods.",
      ku: "بە ژیری ئاو بخۆرەوە؛ بۆ ماوەیەکی درێژ پشتگوێ مەخە.",
    },
    challenge: {
      en: "Urine reaches the bladder from the kidneys through which tubes?",
      ku: "میز لە گورچیلەکانەوە بە کام لولە دەگاتە میزەڵدان؟",
    },
  },
};

export const DETECTIVE_CLUES = [
  {
    id: "liver",
    clues: {
      en: [
        "I sit in the upper-right abdomen.",
        "I produce bile.",
        "I help process nutrients.",
      ],
      ku: ["لە سەرەوەی ڕاستی سک دام،", "زەرداو دروست دەکەم.", "یارمەتی چارەسەری خۆراک دەدەم."],
    },
  },
  {
    id: "heart",
    clues: {
      en: [
        "I sit behind the breastbone.",
        "I tip slightly left.",
        "I pump blood every second.",
      ],
      ku: ["پشت ئێسکی سنگ دام.", "کەمێک چەپ دەڕوانم.", "هەر چرکەیەک خوێن دەپاڵێوم."],
    },
  },
  {
    id: "lungs",
    clues: {
      en: [
        "We fill most of the chest.",
        "We meet the heart in the middle.",
        "We trade gases with blood.",
      ],
      ku: ["زۆربەی سنگ پڕ دەکەین.", "لە ناوەڕاست دڵ دەبینین.", "گاز لەگەڵ خوێن دەگۆڕین."],
    },
  },
  {
    id: "stomach",
    clues: {
      en: [
        "I sit in the upper-left abdomen.",
        "I hold strong acid.",
        "Food rests in me after swallowing.",
      ],
      ku: ["لە سەرەوەی چەپی سک دام.", "ترشی بەهێزم هەیە.", "دوای قووتدان خواردن لام دەمێنێتەوە."],
    },
  },
  {
    id: "kidneys",
    clues: {
      en: [
        "We sit beside the spine in the back.",
        "We filter blood all day.",
        "We help balance body water.",
      ],
      ku: ["لە پشت تەنیشت بڕبڕەین.", "هەموو ڕۆژ خوێن فلتەر دەکەین.", "ئاو باڵانس دەکەین."],
    },
  },
];
