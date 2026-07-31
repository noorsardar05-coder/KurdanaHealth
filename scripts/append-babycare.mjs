import { readFileSync, writeFileSync } from "fs";

const file = "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/babyCare.js";
let s = readFileSync(file, "utf8");

// Fix known Latin fragments in Kurdish strings
const fixes = [
  ["گەرmkirdn", "گەرمبوونەوە"],
  ["گەرmda", "گەرمدا"],
  ["خێra", "خێra"],
  ["خێraیی", "خێraیی"],
  ["ڕەنگاوڕەng", "ڕەنگاوڕەنگ"],
  ["کاتێk", "کاتێk"],
  ["قیscale", "پووک"],
  ["فırçekirdni", "خاوێنکردنەوە"],
  ["پarastgari", "پارastگاری"],
  ["ڕuونak", "ڕuونak"],
  ["پzیشk", "پzیشk"],
  ["پzیشk", "پzیشk"],
];
for (const [a, b] of fixes) s = s.split(a).join(b);

// Fix skin paragraph 2 that was partially updated
s = s.replace(
  /پەستنی پامپەر کاتێk پێست شل دەمێنێت/g,
  "پەستنی پامپەر لەکاتی مانەوەی شل پێست دەگریت"
);

const cut = s.indexOf('  {\n    id: "tummy"');
if (cut < 0) throw new Error("tummy not found");
s = s.slice(0, cut);

const rest = `  {
    id: "tummy",
    title: bi("Tummy Time and Digestion", "کاتی سک و هەرس"),
    body: [
      bi(
        "Tummy time — short periods awake on the belly while supervised — strengthens neck and shoulder muscles and helps prevent flat spots on the back of the head. Start with one to two minutes, several times a day, and build gradually.",
        "کاتی سک — ماوەیەکی کورت هۆشیار لەسەر سک لە کاتی چاودێری — ماسولکەی مل و شان دەقوڵێنێت و یارمەتی کەمکردنەوەی شوێنی ڕاست لەسەر پشت دەدات. بە یەک تا دوو خولەک دەست پێبکە، چەند جار لە ڕۆژدا، و بە هەنگاو زیاد بکە."
      ),
      bi(
        "Place baby on your chest while you recline — this counts as tummy time and builds connection. If baby fusses, try after a nap or diaper change when they are calm. Never leave unattended on the stomach.",
        "منداڵ لەسەر سینەکەت دابنێ کاتێک پشتت پشوو دەدات — ئەمە کاتی سکە و پەیوەندی دروست دەکات. ئەگەر نارەحەت بوو، دوای خەو یان گۆڕینی پامپەر تاقی بکەوە کاتێک ئارامە. هەرگیز بە تەنیا لەسەر سک مەهێڵەوە."
      ),
      bi(
        "Gassy discomfort is common — gentle bicycle legs, tummy massage in clockwise circles, and upright holds after feeds may ease it. All babies have immature digestion; crying from gas often peaks in early weeks and improves with time.",
        "نارەحەتی گاز زۆرجار ئاساییە — پێیەکی وەک پاسکیل، ماساجی سک بە بازنەی ئاراستەی کاتژmêr، و گرتنی سەرەوە دوای خواردن لەوانەیە ئاسان بکات. هەموو منداڵێک هەرسێکی ناتەواو هەیە؛ گریان لە گاز زۆرجار لە هەفتە سەرەتاییەکاندا بەرز دەبێت و بە کات باشتر دەبێت."
      ),
    ],
    tips: [
      bi("Roll a small towel under chest for easier lift in early weeks", "خاولێکی بچووک لەژێر سینە بگرە بۆ بەرزبوونەوەی ئاسانتر لە هەفتە سەرەتاییەکان"),
      bi("Mirror or your face in front encourages head lifting", "ئاوێنە یان دەموچاوت لە پێشەوە هانی بەرزکردنەوەی سەر دەدات"),
      bi("Stop if baby falls asleep — back to sleep for safety", "وەستە ئەگەر منداڵ خەوت — بۆ سالمبوون بە پشت بخەوێنە"),
      bi("Track total minutes per day rather than one long session", "کۆی خولەک لە ڕۆژدا بژمێرە لە جیاتی یەک دانیشتنی درێژ"),
    ],
    whenToAsk: [
      bi("Forceful or green vomit after feeds", "ڕشانەوەی بەهێز یان سەوز دوای خواردن"),
      bi("Hard distended belly with inconsolable crying", "سکی ڕەق و پڕ لەگەڵ گریانی ناچاربوون"),
      bi("Blood or mucus in stool", "خوێn یان لۆکە لە ڕشانەوە"),
    ],
  },
  {
    id: "milestones",
    title: bi("Developmental Milestones", "هەنگاوەکانی گەشە"),
    body: [
      bi(
        "Milestones are guides, not deadlines. Your baby will smile, lift their head, grasp your finger, and coo in their own time. Comparing to other babies or charts can steal joy — notice your child's unique pace instead.",
        "هەنگاوەکان ڕێnماییە، نەک کاتێکی کۆتایی. منداڵەکەت بە کاتێکی خۆی پێkەni، سەر بەرز دەکاتەوە، پەنجەت دەگرێت، و دەنگی نەرm دەدات. بەراوردکردن لەگەڵ منداڵانی تر یان خشتەکان خۆشی دەدزرێنێت — لە جیاتی ئەوە خێرایی تایبەتی منداڵەکەت ببینە."
      ),
`;

writeFileSync(file, s + rest);
console.log("ERROR: incomplete script");
