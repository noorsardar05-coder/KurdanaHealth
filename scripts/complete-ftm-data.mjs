import { readFileSync, writeFileSync } from "fs";

const babyCarePath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/babyCare.js";

let head = readFileSync(babyCarePath, "utf8");
const cutAt = head.indexOf('  {\n    id: "skin"');
if (cutAt >= 0) head = head.slice(0, cutAt);

head = head.replace(/گەرmkirdn/g, "گەرمبوون");

const tail = `  {
    id: "skin",
    title: bi("Caring for Delicate Skin", "چاودێری پێستی ناسک"),
    body: [
      bi(
        "Newborn skin is thin and sensitive — it may peel, look blotchy, or develop small spots in the first weeks. Most changes are harmless and settle without treatment. Gentle cleansing and avoiding harsh products protect the natural barrier.",
        "پێستی نوێ لەدایکبوو نازک و هەستیارە — لەوانەیە پووک بێت، ڕەنگاوڕەنگ دەردەکەوێت، یان خاڵی بچووک لە هەفتە سەرەتاییەکاندا دروست ببێت. زۆربەی گۆڕانکارییەکان بێ زیانن و بەبێ چارەسەر چاک دەبن. پاککردنەوەی نەرم و دوورکەوتنەوە لە بەرهەمی توند سنگی سروشتی پارێزگاری دەکات."
      ),
      bi(
        "Diaper rash appears when skin stays wet or rubs — change frequently, air dry, and use a thin barrier cream if needed. Cradle cap — scaly patches on the scalp — is common; soft brushing and occasional oil can loosen flakes gently.",
        "پەستنی پامپەر کاتێک پێست شل دەمێنێت یان دەگریت — بە زوو گۆڕ بکە، لە هەوادا وشک بکەوە، کرمی پاراستن بەکاربهێنە ئەگەر پێویست بوو. پەستنی سەر — پارچەی پووک لە سەر — ئاساییە؛ شانەکردنی نەرم و کەمێک ڕۆن پارچەکان بە نەرمی لار دەکات."
      ),
      bi(
        "Avoid strongly scented lotions, powders, and fabric softeners on baby clothes. Sun protection for babies under six months means shade and clothing — ask your clinician before using sunscreen on very young infants.",
        "لۆشن و تۆز و نەرمکەری قوماشی بۆنی توند لە جلەکانی منداڵ دوور بخەوە. پاراستن لە ڕووناک بۆ منداڵی خوار شەش مانگ واتای سایە و جل — پێش بەکارهێنانی کرمی دژە-ڕووناک لە پزیشک بپرسە."
      ),
    ],
    tips: [
      bi("Pat dry, never rub — especially face and folds", "بە نەرمی وشک بکەوە، هەرگیز نەخشێنە — بەتایبەت دەموچاو و چەناک"),
      bi("Trim nails while baby sleeps or after a bath when soft", "ناخن ببڕە کاتێک منداڵ دەخەوێت یان دوای حەمام کاتێک نەرمن"),
      bi("Cotton-only layers reduce irritation for sensitive skin", "تەنها چینی لۆکە ئازاری کەم دەکات بۆ پێستی هەستیار"),
      bi("Note new rashes with a photo for your clinician if spreading", "پەستنی نوێ بە وێنە تۆمار بکە بۆ پزیشک ئەگەر بڵاودەبێتەوە"),
    ],
    whenToAsk: [
      bi("Blistering, oozing, or rapidly spreading rash", "بۆرە، دەرچوون، یان پەستنی خێرا بڵاو بوونەوە"),
      bi("Yellow crust around eyes or umbilical area with redness", "پووکێکی زەرد لە دەوروبەری چاو یان ناف لەگەڵ سووری"),
      bi("Rash with fever or poor feeding", "پەستن لەگەڵ گەرمی یان خواردنی لاواز"),
    ],
  },
  {
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
        "نارەحەتی گاز زۆرجار ئاساییە — پێیەکی وەک پاسکیل، ماساجی سک بە بازنەی ئاراستەی کاتژمێر، و گرتنی سەرەوە دوای خواردن لەوانەیە ئاسان بکات. هەموو منداڵێک هەرسێکی ناتەواو هەیە؛ گریان لە گاز زۆرجار لە هەفتە سەرەتاییەکاندا بەرز دەبێت و بە کات باشتر دەبێت."
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
      bi("Blood or mucus in stool", "خوێن یان لۆکە لە ڕشانەوە"),
    ],
  },
  {
    id: "milestones",
    title: bi("Developmental Milestones", "هەنگاوەکانی گەشە"),
    body: [
      bi(
        "Milestones are guides, not deadlines. Your baby will smile, lift their head, grasp your finger, and coo in their own time. Comparing to other babies or charts can steal joy — notice your child's unique pace instead.",
        "هەنگاوەکان ڕێنماییە، نەک کاتێکی کۆتایی. منداڵەکەت بە کاتێکی خۆی پێکەنی، سەر بەرز دەکاتەوە، پەنجەت دەگرێت، و دەنگی نەرم دەدات. بەراوردکردن لەگەڵ منداڵانی تر یان خشتەکان خۆشی دەدزرێنێت — لە جیاتی ئەوە خێرایی تایبەتی منداڵەکەت ببینە."
      ),
      bi(
        "In the first months, social smiles, tracking faces with eyes, and stronger head control emerge. By four to six months, rolling and reaching appear. Sitting, babbling, and first teeth may follow between six and twelve months — wide ranges are normal.",
        "لە مانگە سەرەتاییەکاندا پێکەنی کۆمەڵایەتی، شوێنکەوتنی دەموچاو بە چاو، و کۆntrۆڵی بەهێztەری سەر دەردەکەوێت. لە نێوان چوار تا شەش مانگدا گەڕان و درێژکردنەوە دێت. دانیشتن، قسekirdنی منداڵane، و یەکem ددان لەوانەیە لە نێوان شەش تا دوازdە مانگدا بن — مەودایەکی فراوان ئاساییە."
      ),
`;

writeFileSync(babyCarePath, "INCOMPLETE");
console.log("partial");
