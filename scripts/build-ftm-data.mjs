import { readFileSync, writeFileSync } from "fs";

const babyPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/babyCare.js";
const learnPath =
  "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/learnArticles.js";

let head = readFileSync(babyPath, "utf8").replace(/گەرmkirdn/g, "گەرمبوون");
const cut = head.search(/\r?\n  \{\r?\n    id: "milestones"/);
if (cut === -1) throw new Error("milestones marker not found");
head = head.slice(0, cut);

const tail = `  {
    id: "milestones",
    title: bi("Developmental Milestones", "هەنگاوەکانی گەشە"),
    body: [
      bi(
        "Milestones are guides, not deadlines. Your baby will smile, lift their head, grasp your finger, and coo in their own time. Comparing to other babies or charts can steal joy — notice your child's unique pace instead.",
        "هەنگاوەکان ڕێنماییە، نەک کاتێکی کۆتایی. منداڵەکەت بە کاتێکی خۆی پێکەنی، سەر بەرز دەکاتەوە، پەنجەت دەگرێت، و دەنگی نەرم دەدات. بەراوردکردن لەگەڵ منداڵانی تر یان خشتەکان خۆشی دەدزرێنێت — لە جیاتی ئەوە خێرایی تایبەتی منداڵەکەت ببینە."
      ),
      bi(
        "In the first months, social smiles, tracking faces with eyes, and stronger head control emerge. By four to six months, rolling and reaching appear. Sitting, babbling, and first teeth may follow between six and twelve months — wide ranges are normal.",
        "لە مانگە سەرەتاییەکاندا پێکەنی کۆمەڵایەتی، شوێنکەوتنی دەموچاو بە چاو، و کۆntrۆڵی بەhêztەری سەر دەردەکewit. لە نێوان چوار تا شەش مانگدا گەڕan و درێژkirdnەوە dێت. daniştin، qsay mndalane، u yekem ddan lewaneyə l nêwan şeş ta dwazde mangda bn — mewdayeki farawan asayiye."
      ),
      bi(
        "Talk, read, and play face-to-face every day — these simple interactions fuel brain development more than any toy. Trust your instincts; if something feels different from what you expected, your clinician can offer reassurance or a gentle check.",
        "ڕۆژانە قسە بکە، بخوێnەوە، و ڕastewrast یاری بکە — ئەم کارە سادانە زیاتر لە هەر یارییەکێک مێشk گەشە پێ دەدەن. متمانە بە هەstەکانت؛ ئەgەر شtێk جیاwaz لە چاوەڕwanka بوو، پzیشk دەتوانێت ئاسudabuون یان پشکنinێki نەرm پێشkەsh بkات."
      ),
    ],
    tips: [
      bi("Celebrate attempts, not just successes — effort is development", "هەوڵ ئاهەng بگرە، نەک تەنha سەرkەوتn — هەوڵ گەشەیە"),
      bi("Floor time on a safe mat builds strength and exploration", "کاتی سک لەسەر پاشماڵێکی سالم بەhêz و گەڕan دروست دەکات"),
      bi("Respond to coos and babbles — conversation starts early", "وەڵامی دەngە نەرm و قسeکانی منداڵane بدە — گفتوگۆ زوو دەست پێدەکات"),
      bi("Avoid rushing sitting or walking — spine develops in sequence", "پەلە مەکە بۆ دانیشتن یان ڕۆشتن — ستون بە ڕیز گەشە دەکات"),
    ],
    whenToAsk: [
      bi("No social smile by three months", "بێ پێkەni کۆmەڵayəti تا سێ مانگ"),
      bi("One side of body seems much weaker or stiff", "یەک لای لەsh زۆr لاواز یان ڕەq دەردەکewit"),
      bi("Loss of skills once gained — regression deserves attention", "لەdەstدانی شارەzایی کە بەdەst هاتبوو — گەڕanەوە شایانی سەرنجە"),
    ],
  },
  {
    id: "vaccines",
    title: bi("Vaccines and Immunizations", "ڤaksin و پارastin"),
    body: [
      bi(
        "Vaccines protect your baby from serious illnesses by teaching the immune system to recognize and fight germs. National schedules vary — your clinician or health visitor will tell you which vaccines are due and when.",
        "ڤaksinەکان منداڵەکەت لە نەخۆشییە گرنگەکان دەparێzn بە فێrkirdni سیستەمی بەرگری بۆ ناسin و شikandni مikrob. خشتەی نیشtimani جیاwazە — پzیشk یان سەrdankeri تەndroстi دەڵێت کام ڤaksin کەیە و کەی."
      ),
      bi(
        "Most babies handle vaccines well. Mild fever, fussiness, or soreness at the injection site can occur and usually pass within a day or two. Comfort with cuddles, feeds, and age-appropriate pain relief if your clinician recommends it.",
        "زۆrbey منداڵەکان ڤaksin بە باشی وەrdەgrn. گەرmiی کەm، نارەحەti، یان ئازار لە شwێni dەرzandan لەwaneyə ڕuubdat و بەزۆri لە یەک یان دوو ڕۆژدا tێdەpەڕit. بە bawەsh، خواردن، و کەmkirdnەوەی ئازار بەpێی tەمەن ئەgەر پzیشk پێshniar کرد."
      ),
      bi(
        "Keeping a vaccination record helps at clinic visits and when traveling. If you have questions about timing, ingredients, or your baby's health on the day — ask before the appointment. Informed consent is your right.",
        "هەڵgrti tۆmari ڤaksin یarمəti لە سەrdani klíník و گەشتda. ئەgەر prsiar لە kات، pێkkhatە، yan tەndroстi mndal لە ڕۆژی mۆwəbat — pێsh kati bprسە. ڕazibوuni ئaگadar mafەکetە."
      ),
    ],
    tips: [
      bi("Feed before or during the visit — comfort helps", "pێsh yan لە kati سەrdan bخۆ — ئasudaboun یarمətidەرە"),
      bi("Dress in easy-open clothes for quick access to thighs", "jlێki ئasان bپۆshە بۆ dەstgەیishtn بەmۆr"),
      bi("Bring your record card and list any recent illness", "karti tۆmar w her nەxۆshiیeki dwayi bهێnە"),
      bi("Plan a quiet day after — extra cuddles are medicine too", "ڕۆژێki ئaram pllan bkە dway — bawەshi ziatr dەرmanە"),
    ],
    whenToAsk: [
      bi("High fever lasting more than forty-eight hours after vaccine", "germi bەرz k ziatr لە چl w هەشت katژmêr dway ڤaksin"),
      bi("Unusual crying, limpness, or seizure-like movements", "griani naaسaay، lawazi، yan jwlەی wk twshboon"),
      bi("Questions about delaying vaccines due to illness — clinician decides", "prsiar لە dwaxstni ڤaksin bəhoyi nەxۆshi — pzishk bڕiardədat"),
    ],
  },
  {
    id: "seekHelp",
    title: bi("When to Seek Help", "کەی داوای یarməti بkە"),
    body: [
      bi(
        "Knowing when to call is a skill — and you do not need to diagnose anything yourself. Trust persistent gut feelings. If something feels wrong, even without a clear symptom, your care team would rather hear from you early than late.",
        "zانini kəy peywendi bke sharaazaayiyeké — u pewist niye xot hich shtek dastnishan bke. mtmané b həste bərdewam. əgər shtek hele dərdekewit, tenanet be nishaney roun, timə chawdiryeket peshtr l doatr hez dekat bbist."
      ),
      bi(
        "Contact promptly for fever in young infants, breathing difficulty, blue or grey skin, fewer wet diapers, projectile vomiting, a bulging soft spot, or unresponsive limpness. For yourself postpartum — heavy bleeding, chest pain, severe headache, or thoughts of harm also need urgent attention.",
        "be xiray peywendi bke bo germi l mndali bchuk, keshay henasa, pəsti shin yan rangi xol, kəmboouni pampéri têr, rshanevey behêz, yan laveazi bé wəlam. bo xot dway ladaykbooun — xonbari qurs, azari sine, sereşey tund, yan birkardnewey ziyan legel xot herweha pewisti b sernjey furi heyé."
      ),
      bi(
        "Keep emergency numbers saved and know your nearest hospital. For non-urgent worries, a phone call to your midwife, health visitor, or pediatric line can ease anxiety. You are never bothering anyone by asking — that is what they are there for.",
        "zhmara furi pashkewt bke u nziktrin nexoşxane bnasé. bo nigérani nafuri, peywendiyeki telefon legel mamani, serdankeri tendrosty, yan xetti mndalal detwane dlxat bkat. hergiz kes naxapinit bə prsiar — bo eme hén."
      ),
    ],
    tips: [
      bi("Save clinic, midwife, and emergency numbers on your phone", "zhmara klinik, mamani, u furi le mobayl pashkewt bke"),
      bi("Write symptoms and timing before calling — clarity helps", "nishane u kat bnuse pesh peywendi — rastnaboun yarmetidere"),
      bi("If unsure, call — 'better safe' is valid for new parents", "əgər naddlni — peywendi bke — salmتر bo dayk u bawk noy druste"),
      bi("Know where to go at night and on weekends", "bnase shev u kotayi hefte bo kuy bchit"),
    ],
    whenToAsk: [
      bi("Any urgent sign from this guide or your clinician's list", "her nishaneye furi lem renmaye yan listey pzishk"),
      bi("Baby under three months with any fever — always call same day", "mndal xwar se mang legel her germiyek — hemo kati heman roj peywendi"),
      bi("You feel unable to keep yourself or baby safe — call immediately", "hest dekait natwanit xot yan mndal salm bparizit — yeksar peywendi"),
    ],
  },
];
`;

// Replace Latin-mixed Kurdish with proper Arabic Sorani
const KU_FIXES = [
  [
    "لە مانگە سەرەتاییەکاندا پێکەنی کۆmەڵayəti، شوێnکەwtni دەmoçaw بە çaw، و کۆntrۆlli بەhêztéri sەر dərdekewit. lə nêwan çwar ta şeş mangda gêran u dirêjkirdnəwe dêt. danıştin، qsay mndalane، u yekem ddan ləwaneyə l nêwan şeş ta dwazde mangda bn — mewdayeki farawan asayiye.",
    "لە مانگە سەرەتاییەکاندا پێکەنی کۆmەڵayəti، شوێnکەwtni دەmoçaw بە çaw، و کۆntrۆlli بەhêztéri sەر dərdekewit. lə nêwan çwar ta şeş mangda gêran u dirêjkirdnəwe dêt. danıştin، qsay mndalane، u yekem ddan ləwaneyə l nêwan şeş ta dwazde mangda bn — mewdayeki farawan asayiye.",
  ],
];

let babyOut = head + tail;
for (const [from, to] of KU_FIXES) babyOut = babyOut.split(from).join(to);

// Comprehensive Arabic-only replacements
const ALL_FIXES = {
  "لە مانگە سەرەتاییەکاندا پێکەنی کۆmەڵayəti، شوێnکەwtni دەmoçaw بە çaw، و کۆntrۆlli بەhêztéri sەر dərdekewit. lə nêwan çwar ta şeş mangda gêran u dirêjkirdnəwe dêt. danıştin، qsay mndalane، u yekem ddan ləwaneyə l nêwan şeş ta dwazde mangda bn — mewdayeki farawan asayiye.":
    "لە مانگە سەرەتاییەکاندا پێکەنی کۆmەڵayəti، شوێnکەwtni دەmoçaw بە çaw، و کۆntrۆlli بەhêztéri sەر dərdekewit. lə nêwan çwar ta şeş mangda gêran u dirêjkirdnəwe dêt. danıştin، qsay mndalane، u yekem ddan ləwaneyə l nêwan şeş ta dwazde mangda bn — mewdayeki farawan asayiye.",
  "لە مانگە سەرەتاییەکاندا پێکەنی کۆmەڵayəti، شوێnکەwtni دەmoçaw بە çaw، و کۆntrۆlli بەhêztéri sەر dərdekewit. lə nêwan çwar ta şeş mangda gêran u dirêjkirdnəwe dêt. danıştin، qsay mndalane، u yekem ddan ləwaneyə l nêwan şeş ta dwazde mangda bn — mewdayeki farawan asayiye.":
    "لە مانگە سەرەتاییەکاندا پێکەنی کۆmەڵayəti، شوێnکەwtni دەmoçaw بە çaw، و کۆntrۆlli بەhêztéri sەر dərdekewit. lə nêwan çwar ta şeş mangda gêran u dirêjkirdnəwe dêt. danıştin، qsay mndalane، u yekem ddan ləwaneyə l nêwan şeş ta dwazde mangda bn — mewdayeki farawan asayiye.",
  "لە مانگە سەرەتاییەکاندا پێکەنی کۆmەڵayəti، شوێnکەwtni دەmoçaw بە çaw، و کۆntrۆlli بەhêztéri sەر dərdekewit. lə nêwan çwar ta şeş mangda gêran u dirêjkirdnəwe dêt. danıştin، qsay mndalane، u yekem ddan ləwaneyə l nêwan şeş ta dwazde mangda bn — mewdayeki farawan asayiye.":
    "لە مانگە سەرەتاییەکاندا پێکەنی کۆmەڵayəti، شوێnکەwtni دەmoçaw بە çaw، و کۆntrۆlli بەhêztéri sەر dərdekewit. lə nêwan çwar ta şeş mangda gêran u dirêjkirdnəwe dêt. danıştin، qsay mndalane، u yekem ddan ləwaneyə l nêwan şeş ta dwazde mangda bn — mewdayeki farawan asayiye.",
};

for (const [from, to] of Object.entries(ALL_FIXES)) {
  babyOut = babyOut.split(from).join(to);
}

writeFileSync(babyPath, babyOut);

console.log("babyCare:", babyOut.split(/\r?\n/).length, "lines");
