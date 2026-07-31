import { readFileSync, writeFileSync } from "fs";

const file = "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/babyCare.js";
let head = readFileSync(file, "utf8");

const cut = head.indexOf('  {\n    id: "tummy"');
if (cut >= 0) head = head.slice(0, cut);

// Fix temperature + skin Kurdish in head
head = head
  .replace(/گەرmkirdn/g, "گەرمبوونەوە")
  .replace(/گەرmda/g, "گەرمدا")
  .replace(/خێra(یی)?/g, (_, s) => (s ? "خێraیی" : "خێra"))
  .replace(/ڕەنگاوڕەng/g, "ڕەنگاوڕەنگ")
  .replace(/کاتێk/g, "کاتێk")
  .replace(/قیscale/g, "پووک")
  .replace(/فırçekirdni/g, "خاوێنکردنەوە")
  .replace(/پarastgari لە ڕuونak/g, "پارastگاری لە ڕuونak")
  .replace(/دژە-ڕuونak/g, "دژە-ڕuونak")
  .replace(/پzیشk/g, "پzیشk");

const tail = `
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
      bi(
        "In the first months, social smiles, tracking faces with eyes, and stronger head control emerge. By four to six months, rolling and reaching appear. Sitting, babbling, and first teeth may follow between six and twelve months — wide ranges are normal.",
        "لە مانگە سەرەتاییەکاندا پێkەni کۆmەڵayەتی، شوێnkەوتنی دەموچاو بە چاو، و کۆntrۆڵی بەهێztەری سەر دەردەکەوێت. لە نێوان چوار تا شەش مانگدا گەڕan و درێژkirdnەوە دێت. دانیشتن، قسekirdنی منداڵane، و یەکem ددان لەوانەیە لە نێوان شەش تا دوازdە مانگدا بن — مەودایەکی فراوان ئاساییە."
      ),
      bi(
        "Talk, read, and play face-to-face every day — these simple interactions fuel brain development more than any toy. Trust your instincts; if something feels different from what you expected, your clinician can offer reassurance or a gentle check.",
        "ڕۆژانە قسە بکە، بخوێnە، و ڕastەوڕast یاری بکە — ئەم کارە سادانە زیاتر لە هەر یارییەکێk مێشk گەشە پێ دەدەن. متمانە بە هەstەکانت؛ ئەگەر شتێk جیاواز لە چاوەڕwanka بوو، پzیشk دەتوانێت ئاسudabوون یان پشکنinێki نەرm پێشkەsh بکات."
      ),
    ],
    tips: [
      bi("Celebrate attempts, not just successes — effort is development", "هەوڵ ئاهەng بگرە، نەک تەنha سەرkەوتn — هەوڵ گەشەیە"),
      bi("Floor time on a safe mat builds strength and exploration", "کاتی سک لەسەر پاشماڵێکی سالم بەهێz و گەڕan دروست دەکات"),
      bi("Respond to coos and babbles — conversation starts early", "وەڵامی دەngە نەرm و قسeکانی منداڵane بدە — گفتوگۆ زوو دەست پێدەکات"),
      bi("Avoid rushing sitting or walking — spine develops in sequence", "پەلە مەکە بۆ دانیشتن یان ڕۆشتن — ستون بە ڕیز گەشە دەکات"),
    ],
    whenToAsk: [
      bi("No social smile by three months", "بێ پێkەni کۆmەڵayەتی تا سێ مانگ"),
      bi("One side of body seems much weaker or stiff", "یەک لای لەsh زۆr لاواز یان ڕەq دەردەکەوێت"),
      bi("Loss of skills once gained — regression deserves attention", "لەدەstدانی شارەزایی کە بەدەst هاتبوو — گەڕanەوە شایانی سەرنجە"),
    ],
  },
  {
    id: "vaccines",
    title: bi("Vaccines and Immunizations", "ڤaksin و پarastin"),
    body: [
      bi(
        "Vaccines protect your baby from serious illnesses by teaching the immune system to recognize and fight germs. National schedules vary — your clinician or health visitor will tell you which vaccines are due and when.",
        "ڤaksinەکان منداڵەکەت لە نەخۆشییە گرنگەکان دەparێزn بە فێrkirdni سیستەمی بەرگری بۆ ناسin و شikandni مikrob. خشتەی نیشtimani جیاوازە — پzیشk یان سەردankeri تەndroстi دەڵێت کام ڤaksin کەیە و کەی."
      ),
      bi(
        "Most babies handle vaccines well. Mild fever, fussiness, or soreness at the injection site can occur and usually pass within a day or two. Comfort with cuddles, feeds, and age-appropriate pain relief if your clinician recommends it.",
        "زۆrbey منداڵەکان ڤaksin بە باشی وەردەگرن. گەرmiی کەm، نارەحەti، یان ئازار لە شwێni دەرzandan لەوانەیە ڕuوبdat و بەزۆri لە یەک یان دوو ڕۆژدا تێدەpەڕit. بە باوەsh، خواردن، و کەmkirdnەوەی ئازار بەپێی تەمەن ئەگەر پzیشk پێشنیار کرد."
      ),
      bi(
        "Keeping a vaccination record helps at clinic visits and when traveling. If you have questions about timing, ingredients, or your baby's health on the day — ask before the appointment. Informed consent is your right.",
        "هەڵgrti تۆmari ڤaksin یarمəti لە سەردانی کلینیک و گەشتدا. ئەگەر پرsiar لە کات، پێkkhatە، یان تەndroстi مndal لە ڕۆژی مۆwəbat — پێsh کati بپرسە. ڕazibوونی ئاگادار mafەکەتە."
      ),
    ],
    tips: [
      bi("Feed before or during the visit — comfort helps", "پێsh یان لە کati سەردan بخۆ — ئاسudaboun یarمətidەرە"),
      bi("Dress in easy-open clothes for quick access to thighs", "جلێki ئاسan بپۆshە بۆ دەstگەیشتن بەمۆر"),
      bi("Bring your record card and list any recent illness", "کارتی تۆmar و هەر نەخۆشییەکی دوایی بهێnə"),
      bi("Plan a quiet day after — extra cuddles are medicine too", "ڕۆژێki ئaram پllan بکە دوای — باوەshی زیاتr دەرmanە"),
    ],
    whenToAsk: [
      bi("High fever lasting more than forty-eight hours after vaccine", "گەرmi بەرz کە زیاتr لە چل و هەشت کاتژmêr دوای ڤaksin"),
      bi("Unusual crying, limpness, or seizure-like movements", "گریانی نائاسایی، لاوازی، یان جوڵەی وەک تووشboon"),
      bi("Questions about delaying vaccines due to illness — clinician decides", "پرsiar لە دواخstni ڤaksin بەهۆی نەخۆشی — پzیشk بڕiاردەdat"),
    ],
  },
  {
    id: "seekHelp",
    title: bi("When to Seek Help", "کەی داوای یarمəti بکەیت"),
    body: [
      bi(
        "Knowing when to call is a skill — and you do not need to diagnose anything yourself. Trust persistent gut feelings. If something feels wrong, even without a clear symptom, your care team would rather hear from you early than late.",
        "زanini کەی پەیwەndi بکەیت شارەzایییەکە — و پێویst نییە خۆt هیچ شtێk dagnose بkەit. متمانە بە هەstە بەردەوam. ئەگەر شtێk هەڵە دەrdەکewit، تەnanەت بێ nishaney ڕast، تیمە چاودێriەکet پێshtr لە doatr حەz دەکat bbiSit."
      ),
      bi(
        "Contact promptly for fever in young infants, breathing difficulty, blue or grey skin, fewer wet diapers, projectile vomiting, a bulging soft spot, or unresponsive limpness. For yourself postpartum — heavy bleeding, chest pain, severe headache, or thoughts of harm also need urgent attention.",
        "بە خێra پەیwەndi بkە بۆ گەرmi لە mndali بچووk، kێshay هەناسە، pێsti shin یan ڕengi xol، pampéri têr kêm، ڕshanevey بەhêz، shwêniki nerm ku pirtir، yan laveazi bê wەڵam. بۆ xot doai ladaykbooun — xonbari qurs، azari sine، sereşey tund، yan birkardnewey ziyan herweha پێویsti بە sernjey furi هeyé."
      ),
      bi(
        "Keep emergency numbers saved and know your nearest hospital. For non-urgent worries, a phone call to your midwife, health visitor, or pediatric line can ease anxiety. You are never bothering anyone by asking — that is what they are there for.",
        "ژmāra فوری pashkewt bkە w nزiktrin nexoşxane bnasە. bo nigërani nafuri، peywendiyeki telefon legel pzishk، sərdankeri təndroстi، yan xetti mndalal detwane dlxat bkat. hergiz kes naxapinit bə prsiar — bo eme hén."
      ),
    ],
    tips: [
      bi("Save clinic, midwife, and emergency numbers on your phone", "ژmāra klíník، pzishk، w fúri le mobayl pashkewt bkە"),
      bi("Write symptoms and timing before calling — clarity helps", "nishane w kat bnusə pesh peywendi — ڕastnəbooun yarمətidərə"),
      bi("If unsure, call — 'better safe' is valid for new parents", "əgər naddlni — peywendi bkə — salmتر bo dayk w bawk noy drوstə"),
      bi("Know where to go at night and on weekends", "bnasə şev w kotayi hefte bo kuy bçit"),
    ],
    whenToAsk: [
      bi("Any urgent sign from this guide or your clinician's list", "her nishaneyek furi lem rênmaye yan listey pzishk"),
      bi("Baby under three months with any fever — always call same day", "mndal xwar se mang legel her germiyek — hemo kati heman roj peywendi"),
      bi("You feel unable to keep yourself or baby safe — call immediately", "hest dekait natwanit xot yan mndal salm bparizit — yeksar peywendi"),
    ],
  },
];
`;

writeFileSync(file, head + tail);
console.log("Wrote complete babyCare.js", (head + tail).split("\n").length, "lines");
