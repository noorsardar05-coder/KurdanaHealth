(function () {
  "use strict";

  var STORAGE_BADGES = "bodywise_badges_v1";
  var STORAGE_LANG = "bodywise_lang_v1";

  var SYSTEM_ORDER = [
    "skeletal",
    "muscular",
    "nervous",
    "digestive",
    "respiratory",
    "circulatory",
    "endocrine",
    "reproductive",
    "immune",
  ];

  var BADGE_IDS = {
    skeletal: "bone_explorer",
    muscular: "muscle_master",
    nervous: "nerve_navigator",
    digestive: "digest_detective",
    respiratory: "breath_scholar",
    circulatory: "pulse_pro",
    endocrine: "hormone_hero",
    reproductive: "life_system_steward",
    immune: "organ_genius",
  };

  var BADGE_ICONS = {
    bone_explorer: "🦴",
    muscle_master: "💪",
    nerve_navigator: "🧭",
    digest_detective: "🔍",
    breath_scholar: "🫁",
    pulse_pro: "❤",
    hormone_hero: "⚗",
    life_system_steward: "🧬",
    organ_genius: "🛡",
  };

  /** Need 3/5 correct to unlock badge + confetti */
  var PASS_SCORE = 3;

  var SYSTEM_ICONS = {
    skeletal: "🦴",
    muscular: "💪",
    nervous: "🧠",
    digestive: "🍽",
    respiratory: "🫁",
    circulatory: "❤",
    endocrine: "⚗",
    reproductive: "🧬",
    immune: "🛡",
  };

  var TAGLINES = {
    en: {
      skeletal: "Architecture, leverage, and quiet resilience beneath every move.",
      muscular: "Power, posture, and the chemistry of contraction.",
      nervous: "Electric speed meets memory and meaning.",
      digestive: "From bite to bloodstream — fuel refined.",
      respiratory: "Rhythm of gases that keeps every cell speaking.",
      circulatory: "One river, many shores — delivery without pause.",
      endocrine: "Whispers in blood that steer the whole orchestra.",
      reproductive: "Life’s renewal, shaped by hormones and careful design.",
      immune: "Patrol, memory, and the art of knowing friend from threat.",
    },
    ku: {
      skeletal: "پێکهاتە و دەستەپێگەیشتن و بەهێزی بێدەنگ لە پشت هەر جوڵەیەک.",
      muscular: "هێز، ڕەوش، و کیمیای کڕینەوە.",
      nervous: "خێرایی کارەبایی لەگەڵ بیرکردنەوە و بیرپەپەر.",
      digestive: "لە گازوو بۆ خوێن — سووتەمەنیی پاڵاوتن.",
      respiratory: "ڕیتمی غازەکان کە هەر خانەیەک زیندوو دەهێڵێت.",
      circulatory: "یەک ڕووبار و زۆر کەش — گەیاندن بێ وەستان.",
      endocrine: "پچڕپچڕەکان لە خوێندا کە ئۆکسترا ڕێکدەخەن.",
      reproductive: "نوێبوونەوەی ژیان، بە هۆرمۆن و پێکهاتەی وریایانە.",
      immune: "پاساداری، بیرپەپەر، و ناسینی هاوکار لە هەڕەشە.",
    },
  };

  var UI = {
    en: {
      brandName: "BodyWise",
      brandSub: "Human Body Learning System",
      tabSystems: "Systems",
      tabVisual: "Visual",
      tabLearn: "Learn",
      tabDiscover: "Discover",
      systemsTitle: "Organ systems",
      systemsLead:
        "Choose a system to explore structure, function, and a short mastery quiz.",
      backToSystems: "← All systems",
      overview: "Overview",
      whyMatters: "Why it matters",
      components: "Components",
      hormones: "Key hormones",
      source: "Source",
      function: "Function",
      significance: "Why it matters",
      specialFact: "Special fact",
      startQuiz: "Start quiz",
      quizProgress: "Question",
      of: "of",
      next: "Next",
      finish: "See results",
      close: "Close",
      scoreLine: "You scored",
      badgeUnlocked: "Badge unlocked",
      quizFeedbackHigh: "Strong grasp — keep connecting ideas across systems.",
      quizFeedbackMid: "Solid progress — review the overview and try again anytime.",
      quizFeedbackLow: "Great start — read the cards once more and revisit the quiz.",
      badgesTitle: "Your badges",
      visualTitle: "Body map",
      visualLead: "Tap a region to see which systems are most active there.",
      visualHint: "Regions highlight on hover; click for details.",
      visualPick: "Select a body region.",
      learnTitle: "How it fits together",
      learnLead: "Short guides on cooperation between systems and everyday choices.",
      discoverTitle: "Discover",
      discoverLead: "Facts, myth checks, and quick cards.",
      factsTitle: "Body facts",
      mythTitle: "Myth vs fact",
      nextFact: "Next fact",
      nextMyth: "Next",
      langLabel: "KU — کوردی",
      langLabelKu: "EN — English",
      quoteHint: "Tap the quote to rotate",
      quoteLabel: "Noor reflection",
      pickSystem: "Choose a system above to open this learning space.",
      rewardsThisSystem: "Reward for this system",
      quizPassSuccess: "You passed — badge unlocked!",
      quizRetryForBadge: "Score 3/5 or higher to unlock this system’s badge. Review the cards and try again.",
      locked: "Locked",
      bodyModule: "Learning module",
      keyParts: "Key parts",
    },
    ku: {
      brandName: "بۆدیوایز",
      brandSub: "سیستەمی فێربوونی جەستەی مرۆڤ",
      tabSystems: "سیستەمەکان",
      tabVisual: "وێنەی جەستە",
      tabLearn: "فێربوون",
      tabDiscover: "دۆزینەوە",
      systemsTitle: "سیستەمی ئەردەوەکان",
      systemsLead:
        "سیستەمێک هەڵبژێرە بۆ ناسینی پێکهاتە، کاریگەری، و تێستێکی کورت.",
      backToSystems: "← گەڕانەوە بۆ هەموو سیستەمەکان",
      overview: "پێداچوونەوە",
      whyMatters: "بۆچی گرنگە",
      components: "پێکهاتەکان",
      hormones: "هۆرمۆنە گرنگەکان",
      source: "سەرچاوە",
      function: "کەرستە",
      significance: "بۆچی گرنگە",
      specialFact: "ڕاستیی سوودبەخش",
      startQuiz: "دەستپێکردنی تێست",
      quizProgress: "پرسیار",
      of: "لە",
      next: "دواتر",
      finish: "ئەنجامەکان",
      close: "داخستن",
      scoreLine: "ئەنجامەکەت",
      badgeUnlocked: "نیشانە نوێ کرایەوە",
      quizFeedbackHigh: "تێگەیشتنێکی بەهێز — بەردەوام بە لە بەستنەوەی بیرۆکەکان.",
      quizFeedbackMid: "پێشڕەوی باشە — پێداچوونەوەکە بخوێنەرەوە و دووبارە تێست بکە.",
      quizFeedbackLow: "سەرەتایەکی باش — کارتیەکان بخوێنەرەوە و تێستەکە بگەڕێنەرەوە.",
      badgesTitle: "نیشانەکەت",
      visualTitle: "نەخشەی جەستە",
      visualLead: "ناوچەیەک دابگرە بۆ بینینی سیستەمە پەیوەندیدارەکان.",
      visualHint: "لەسەر هەوەرکردن ڕوون دەبێتەوە؛ کرتە بکە بۆ وردەکاری.",
      visualPick: "ناوچەی جەستە هەڵبژێرە.",
      learnTitle: "چۆن یەکتر دەگرنەوە",
      learnLead: "ڕێنمایی کورت دەربارەی هاوکاری نێوان سیستەمەکان و هەڵبژاردەکانی ڕۆژانە.",
      discoverTitle: "دۆزینەوە",
      discoverLead: "ڕاستی، هەڵسەنگاندنی ئاسەوار، و کارتی خێرا.",
      factsTitle: "ڕاستیی جەستە",
      mythTitle: "ئاسەوار لەبەرانبەر ڕاستی",
      nextFact: "ڕاستیی داهاتوو",
      nextMyth: "دواتر",
      langLabel: "KU — کوردی",
      langLabelKu: "EN — English",
      quoteHint: "کرتە لەسەر دەقەکە بکە",
      quoteLabel: "ووچانی نور",
      pickSystem: "سیستەمێک لە سەرەوە هەڵبژێرە بۆ کردنەوەی ئەم بۆشاییە.",
      rewardsThisSystem: "نیشانە بۆ ئەم سیستەمە",
      quizPassSuccess: "تێپەڕێی — نیشانەکەت کرایەوە!",
      quizRetryForBadge: "بۆ کردنەوەی نیشانە لە ٥ پرسیاردا ٣ یان زیاتر دەبێت. کارتیەکان بخوێنەرەوە و دووبارە هەوڵ بدە.",
      locked: "داخراو",
      bodyModule: "ماژوولی فێربوون",
      keyParts: "پێکهاتە گرنگەکان",
    },
  };

  var BADGE_LABELS = {
    en: {
      bone_explorer: "Bone Explorer",
      muscle_master: "Muscle Master",
      nerve_navigator: "Nerve Navigator",
      digest_detective: "Digest Detective",
      breath_scholar: "Breath Scholar",
      pulse_pro: "Pulse Pro",
      hormone_hero: "Hormone Hero",
      life_system_steward: "Life System Steward",
      organ_genius: "Organ Genius",
    },
    ku: {
      bone_explorer: "گەڕان لە استخان",
      muscle_master: "شاری ماسولکە",
      nerve_navigator: "گەشتن بە دەمارەکان",
      digest_detective: "شاری هەرمکردن",
      breath_scholar: "زاناەی هەناسە",
      pulse_pro: "پیشەی لێدان",
      hormone_hero: "قەهرەمانی هۆرمۆن",
      life_system_steward: "چاودێری سیستەمی ژیان",
      organ_genius: "داهێنەر ئەندامەکان",
    },
  };

  var QUOTES = {
    en: [
      "Understanding your body is understanding your life.",
      "Knowledge turns anatomy into awareness.",
      "Every system tells part of your story.",
      "The body is not random. It is organized wisdom.",
      "Understanding your body is understanding yourself.",
      "Knowledge is the first step to care.",
      "Every system whispers the same lesson: balance.",
      "Curiosity keeps the body’s story readable.",
      "Structure and function dance together — learn both.",
      "Small facts build a big picture of health.",
      "Your body is a library; patience is the key.",
      "Learning anatomy is learning respect for life’s design.",
      "Cells cooperate — so should your study habits.",
      "When you map the body, you map possibility.",
      "Science begins with careful observation.",
      "Rhythm, pressure, chemistry — elegance in motion.",
      "Names are doorways; meaning is the room beyond.",
      "A clear model prevents fuzzy thinking.",
      "Wisdom grows where questions stay welcome.",
      "The body teaches cause and effect with every breath.",
    ],
    ku: [
      "تێگەیشتن لە جەستە هەمان تێگەیشتنە لە ژیانت.",
      "زانین ئەناتۆمی دەگۆڕێت بۆ ئاگاداری.",
      "هەر سیستەمێک بەشێکی چیرۆکەکەت دەگێڕێتەوە.",
      "جەستە هەڕەمەکی نییە — ڕێکخراوی دانایییە.",
      "تێگەیشتن لە جەستە هەمان تێگەیشتنە لە خۆت.",
      "زانین یەکەم هەنگاوە بۆ چاودێریی وریایانە.",
      "هەموو سیستەمێک هەمان وانە دەڵێن: هاوسەنگی.",
      "سەرنجڕاکێشانی زانستی چیرۆکی جەستەت ڕوونتر دەکاتەوە.",
      "پێکهاتە و کارپێکردن پێکەوە سەما دەکەن — هەردووکیان فێربە.",
      "ڕاستی بچووک وێنەیەکی گەورە درووست دەکات.",
      "جەستەکەت وەک کتێبخانەیەکە؛ ئارامی سەرەکیی کلیلەکەیە.",
      "فێربوونی ئەناتۆمی ڕێزگرتنە لە پلاندانانی ژیان.",
      "خانەکان هاوکاری دەکەن — فێربوونەکەت ئاڵۆزی مەدە.",
      "کاتێک نەخشەی جەستە دادەنێیت، ئەگەرەکان ڕوونتر دەبن.",
      "زانست بە چاودێری ورد دەست پێ دەکات.",
      "ڕیتم، فشان، کیمیا — جوانی لە جوڵەدا.",
      "ناوەکان دەرگانەن؛ واتا ژوورەکەی دوایە.",
      "ئامادەی ڕوون بیرکردنەوەی ڕوون دەگرێت.",
      "دانایی لە شوێنی پرسکردن گەشە دەکات.",
      "جەستە بە هەر هەناسەیەک وانەی هۆکار و کاریگەری دەبەخشێت.",
    ],
  };

  var FACTS = {
    en: [
      "Your brain uses roughly 20% of the body’s resting energy — a very hungry organ.",
      "Bone is remarkably strong for its weight; its mineral lattice resists forces in clever ways.",
      "The liver can regrow after partial loss, which helps recovery from some injuries or donation.",
      "Skin is your largest organ and a living barrier against water, UV, and microbes.",
      "The heart beats about 100,000 times per day, pumping millions of liters over a lifetime.",
      "Nerve impulses can travel faster than 100 meters per second along thick insulated fibers.",
      "The small intestine is about 6 meters long uncoiled, maximizing surface for absorption.",
      "You produce around 1–1.5 liters of saliva daily, starting digestion and lubricating food.",
      "Red blood cells lack a nucleus, leaving more room to carry oxygen.",
      "The cornea is one of the body’s most densely innervated tissues — very sensitive.",
      "A single neuron can form thousands of synapses, wiring complexity into memory.",
      "Your nose can detect trillions of odor combinations with a few hundred receptor types.",
      "The diaphragm is the main muscle of quiet breathing, doming and flattening rhythmically.",
      "Capillaries are so numerous that most cells sit within about 25–50 μm of one.",
      "The pancreas both makes digestive enzymes and releases hormones like insulin.",
      "Adults usually have 206 named bones after smaller bones fuse during growth.",
      "Taste buds renew on a timescale of weeks, so flavor sensitivity can shift.",
      "Brown fat generates heat in infants; adults retain small amounts with similar chemistry.",
      "The human genome, if typed as letters, would fill hundreds of printed volumes.",
      "Kidneys filter huge volumes daily but reclaim water and salts with fine control.",
      "Collagen is the most abundant protein in many animals, including humans.",
      "T cells mature largely in the thymus in youth; its role shifts with age.",
      "The placenta is a temporary organ exchanging gases, nutrients, and waste for the fetus.",
      "A single motor unit is one motor neuron plus the muscle fibers it activates together.",
      "REM sleep shows vivid brain activity even when skeletal muscles are mostly quiet.",
      "Vitamin D can be synthesized in skin with sun exposure — geography and season matter.",
      "The inner ear turns vibration into neural signals with exquisite mechanical precision.",
      "Lysozyme in tears and saliva helps dismantle bacterial cell walls continually.",
      "Even “at rest,” skeletal muscle uses glucose and fat to stay ready to move.",
      "The bladder wall can expand considerably without tearing, thanks to elastic layering.",
      "Hair grows from follicles that cycle through growth, rest, and shedding phases.",
      "The appendix houses immune tissue and may help repopulate gut bacteria after illness.",
      "Astronauts lose bone mineral in microgravity unless they exercise against resistance.",
      "The spleen filters aging red cells and stores platelets, supporting clot readiness.",
      "Hormones often work in feedback loops — too much signal can dampen production.",
      "Every breath exchanges only part of lung volume; residual air keeps alveoli open.",
    ],
    ku: [
      "مێشک نزیکەی ٢٠٪ی وزەی پشوووی جەستە بەکاردەهێنێت — ئەندامێکی زۆر پرۆتێینی خوازراو.",
      "لە هێندەیەکدا ئێسک بەهێزە بۆ قەبارەکەی؛ تۆڕی کانزایی فشانی زیرەک بەرگری دەکات.",
      "جگەر دەتوانێت دوای کەمبوونەوە دووبارە بگەڕێتەوە، یارمەتی چاکبوونەوە دەدات.",
      "پێست گەورەترین ئەندامە و بەرگێکی زیندووە لە ئاو، تیشکی UV، و میکڕۆب.",
      "دڵ لە نزیکەی ١٠٠ هەزار جار لە ڕۆژێکدا لێدەدات؛ لە ماوەی ژیاندا ملیۆنەها لیتر دەگوازێتەوە.",
      "پەیامی دەمار دەتوانێت خێراتر بێت لە ١٠٠ مەتر/چرکە لە تەلەکانێکی ئارام.",
      "رەحەمە بچووک کاتێک درێژ دەبێتەوە نزیکەی ٦ مەتر درێژە بۆ زۆرکردنی ڕووبەر.",
      "لە ڕۆژێکدا نزیکەی ١–١٫٥ لیتر بێنوونی درووست دەبێت و هەرمکردن دەست پێ دەکات.",
      "خانەی خوێنی سوور ناوک نییە بۆ ئەوەی شوێنی زیاتر بۆ ئۆکسژین بهێڵێت.",
      "کڕنوس یەکێکە لە هەستیارترین تیشووەکان بە دەمار.",
      "یەک نیرۆن دەتوانێت هەزاران سنایپس درووست بکات و ئاڵۆزی لە بیرەوەری.",
      "لە پجەکەت چەند سەدان جۆر ئەستێنەر تریلیۆن ترکیبی بۆن دەناسێنن.",
      "دایەفرام ماسولکەی سەرەکیی هەناسەی ئارامە، بە ڕیتم بەرزی و نزمی دەگۆڕێت.",
      "کاپیلاری ئەوەندە زۆرن کە زۆربەی خانەکان لە نزیک ٢٥–٥٠ میکڕۆمەتردا دەبن.",
      "جەژدان هەم ئەنزیم هەرمنکاوی دەکات هەم هۆرمۆن وەک ئینسوولین دەردەکات.",
      "لە گەورەکاندا بە پێی ناونان ٢٠٦ دەستە هەیە دوای یەکگرتنەوەی ئێسک بچوکەکان.",
      "تام پەپکەکان لە چەند هەفتەیەکدا نوێ دەبنەوە؛ هەستی تەم دووبارە دەگۆڕێت.",
      "چەوری قاوەی گەرمی درووست دەکات لە منداڵدا؛ لە گەورەدا بە کەمێ مایەیە.",
      "گێنۆمی مرۆڤ ئەگەر وەک پیت بنوسرێت، چەند سەدان کتێب پڕدەکات.",
      "گورچیلە ڕۆژانە حەجمێکی زۆر دەپاڵاوێتەوە بەڵام ئاو و ئاسڵ بە ئارامی دەگەڕێنێتەوە.",
      "کۆلاگێن بەرهەمدارترین پرۆتێینە لە زۆرێک لە ئاژەڵ و مرۆڤ.",
      "تی سێل زۆربە لە ناو تیموسدا گەشە دەکەن لە گەنجی؛ ڕۆڵەکەی لە تەمەندا دەگۆڕێتەوە.",
      "جەندەرە ئەندامێکی کاتییە: غاز و خواردەمەنی بۆ منداڵەکە بەشێوەیەکی ئارام دەگوازێتەوە.",
      "یەک یەکەی جوڵە یەک نیرۆنی جوڵەر و ئەو ماسولکانەیە کە پێکەوە دەیانگرێتەوە.",
      "خەوی REM مێشک چالاک نیشان دەدات کاتێک ماسولکەکانی ئێسکی زۆربە بێدەنگن.",
      "ڤیتامین D لە پێست لەگەڵ بەرفراوانبوونی خۆر درووست دەبێت — جوگرافیا و وەرز کاریگەری دەبەن.",
      "گوێی ناوەوەی دەنگ دەگۆڕێت بۆ سیگنالی دەمار بە وردەکاریی میکانیکی.",
      "لایزۆزایم لە دەمووەر و بێنووندا یارمەتی لەشکەری خانەی باکترییا دەدات.",
      "ئەگەرچی پشووو، ماسولکەی ئێسکی زۆربە گلووکۆز و چەوری بەکاردەهێنێت.",
      "دیوارەی مۆڕ دەتوانێت بە ئارامی فراوان ببێت بەبێ پچڕان بە تەبەقەی کشسانەوە.",
      "قژ لە فۆلی کلەکان دەردەکەوێت کە خولێکی گەشاندن، پشوو، و کەلوەپار هەیە.",
      "دوانسەر تیشوەی بەرگری هەیە و لەوانەیە دوای نەخۆشی باکتریای ناو رەحەم بگەوەڕێتەوە.",
      "لە بێ وزەیەکی کەم ئاسمانەوانان مادەی کانزایی ئێسک لە دەست دەدەن ئەگەر بەرەوژەر بەکار نەهێنرێت.",
      "تابورە خوێنی سوورە کۆن دەپاڵاوێتەوە و ئەوێست دەپارێزێت بۆ ئامادەیی کڵپە.",
      "هۆرمۆنەکان زۆرجار لە چرخەی فیدبەک کار دەکەن — زۆر سیگناڵ کەمکردنەوەی بەرهەمهێنان دەکات.",
      "هەر هەناسە تەنها بەشێکی قەبارەی سیقەکان دەگوازێتەوە؛ هەوای مایەوە لە پفنۆکە کراوەکاندا دەمێنێتەوە.",
    ],
  };

  var MYTHS = {
    en: [
      { myth: "You only use 10% of your brain.", fact: "Brain scans show broad, coordinated activity across regions all day." },
      { myth: "Cracking knuckles causes arthritis.", fact: "Studies find no strong link to osteoarthritis from habitual knuckle cracking." },
      { myth: "Muscle turns into fat when you stop exercising.", fact: "Muscle and fat are different tissues; one does not transform into the other." },
      { myth: "Cold weather by itself gives you a cold.", fact: "Colds are caused by viruses; cold air may dry mucosa but does not inject the virus." },
      { myth: "You should drink exactly eight glasses of water a day.", fact: "Needs vary with size, climate, and activity; thirst and pale urine are practical guides." },
      { myth: "Reading in dim light ruins your eyes forever.", fact: "It can cause temporary strain; permanent damage from normal dim reading is unlikely." },
      { myth: "Shaved hair grows back thicker.", fact: "Cut hair can feel coarser at the tip, but follicle density and thickness are not increased." },
      { myth: "The tongue has four simple taste zones.", fact: "All taste qualities can be detected across much of the tongue’s surface." },
      { myth: "Antibiotics cure viral infections like the common cold.", fact: "Antibiotics target bacteria; they do not kill common cold viruses." },
      { myth: "You can ‘detox’ your liver with special juices.", fact: "The liver and kidneys already filter waste; extreme cleanses can be risky, not magical." },
      { myth: "Sugar makes children hyperactive by chemistry.", fact: "Controlled trials usually fail to show sugar alone causes hyperactivity." },
      { myth: "Humans have five senses.", fact: "Proprioception, balance, temperature, pain, and internal states add to the classical five." },
      { myth: "Swallowed gum stays in the stomach seven years.", fact: "Most gum base passes through the digestive tract within days like other indigestibles." },
      { myth: "Hair and fingernails keep growing after death.", fact: "Skin retracts as it dries, making nails and stubble appear longer." },
      { myth: "Babies are born with all their brain cells.", fact: "Neurogenesis continues in some regions early on, and synapses remodel massively." },
      { myth: "Eating late at night always causes more weight gain.", fact: "Total calories over time matter more than clock time for most people." },
      { myth: "Stretching before every workout prevents all injury.", fact: "Warm-up helps, but injury risk depends on load, technique, sleep, and history." },
      { myth: "Heart attacks only happen to older adults.", fact: "They are rarer in youth but can occur with certain conditions or substance use." },
      { myth: "Memory works like a video recording.", fact: "Memory reconstructs; each recall can blend detail with inference." },
      { myth: "Black eyes mean bone fracture around the orbit.", fact: "Bruising can follow blunt trauma without fracture; imaging clarifies when needed." },
      { myth: "If you’re not sore, you didn’t train hard enough.", fact: "Adaptation occurs without DOMS; soreness is not the only marker of stimulus." },
      { myth: "Alcohol warms you in freezing weather.", fact: "It dilates skin vessels, increasing heat loss; core temperature can drop faster." },
      { myth: "The heart is on the left side only.", fact: "It sits mostly left of midline, but the mediastinum is central with right-sided chambers too." },
      { myth: "Carrots dramatically improve night vision unless you’re deficient.", fact: "Vitamin A prevents deficiency-related night blindness; excess won’t give super sight." },
      { myth: "Leeches were useless in old medicine.", fact: "Today medical leeches are used in some reattachment and venous congestion cases." },
      { myth: "CPR always restarts the heart like in movies.", fact: "CPR buys time by circulating blood until defibrillation or advanced care can help." },
      { myth: "We only breathe through one dominant nostril at a time — exclusively.", fact: "Nasal cycle shifts airflow emphasis, but both passages usually participate." },
      { myth: "Microwaves make food radioactive.", fact: "They heat by agitating water molecules; they do not leave ionizing radiation in food." },
    ],
    ku: [
      { myth: "تەنها ١٠٪ی مێشکت بەکاردەهێنیت.", fact: "وێنەی مێشک پیشان دەدا چالاکی هەماهەنگ لە زۆر ناوچەدا هەیە." },
      { myth: "قرتاندنی پەنجە توونێلی ئارترۆز پێدەهێنێت.", fact: "تێکڕای قورتان بە هەمان شێوە بە بەڵگەی بەهێز نەناسراوە بە ئارترۆز." },
      { myth: "کاتی ڕاهێنان وەستێ ماسولکە دەبێتە چەوری.", fact: "ماسولکە و چەوری تیشوەی جیاوازن؛ یەک نابێتە ئەوی تر." },
      { myth: "سەرما بە تەنها زکام پێدەدرکێنیت.", fact: "زکام بە ڤایرۆس دەبێت؛ هەوای سارد ڕێتوبەر وشک دەکات بەڵام ڤایرۆس ناگرێت." },
      { myth: "دەبێت ڕۆژانە تەنانەت ٨ لیوان ئاو بخوێنیتەوە.", fact: "پێداویستی بە قەبارە و کەش و چالاکی دەگۆڕێت؛ تینگی و ڕەنگی مۆڕ ئاماژەن." },
      { myth: "خوێندنەوە لە ڕووناکی کەم چاوت هەمیشە لەناو دەبات.", fact: "دەتوانێت بۆ ماوەیەک فشان بهێنێت؛ زیانی هەمیشەیی لە ڕووناکی ئاسایی کەم وردەکارییە." },
      { myth: "قژ تەراش کراو قەڵەوتر دەگەڕێتەوە.", fact: "نووک توندتر هەست دەکات، بەڵام چڕی فۆلی کل زیاد نابێت." },
      { myth: "زمان چوار ناوچەی تامێکی سادەی هەیە.", fact: "هەموو جۆری تام لە زۆربەی ڕووبەری زمان دەتوانرێت هەست پێ بکرێت." },
      { myth: "دەرمانی دژەباکتری نەخۆشی ڤایرۆسی وەک زکامی ئاسایی چاک دەکات.", fact: "دەرمانەکان بۆ باکتریان؛ ڤایرۆسی بەکرەی سەردەمی ئاسایی نەکوژن." },
      { myth: "با ‘پاککردنەوەی جگەر’ بە شیرەمەنی تایبەت بکەیت.", fact: "جگەر و گورچیلە پەلەکان پاڵاوتن دەکەن؛ ڕێکخستنە توندەکان مەترسیدار دەبن." },
      { myth: "شەکر بە کیمیا منداڵ هایپەر دەکات.", fact: "تاقیکردنەوە کۆنترۆڵکراو زۆرجار شەکر بە تەنها هایپەر ناکات." },
      { myth: "مرۆڤ پێنج هەستی هەیە.", fact: "جێگری جەستە، هاوسەنگی، گەرمی، ئازار، و هەستی ناوخۆیی زیاد دەکەن." },
      { myth: "گومێ خاو کە لە گەدە دەمێنێتەوە حەوت ساڵ.", fact: "زۆربەی بنەماکە بە ڕێگەی هەرمکردن دەڕوات وەک شتی تر کە هەرم نابێت." },
      { myth: "دوای مردن قژ و نونەکەت درێژ دەبێتەوە.", fact: "پێست دەکشێتەوە کاتێک وشک دەبێت؛ نون و قژ درێژتر دەردەکەون." },
      { myth: "منداڵ بە هەموو مێشکی لەدایک دەبێت.", fact: "لە هەندێک ناوچە دروستبوونی نیرۆنی نوێ و گۆڕینی سنایپس درێژە دەدات." },
      { myth: "خواردن لە شەو هەمیشە قەبارە زیاد دەکات.", fact: "کۆی کالۆری بە کات درێژە گرنگترە لە کاتژمێر بۆ زۆربەی کەسان." },
      { myth: "کشان پێش هەر وەرزشێک هەموو پێکانێک ڕێگری دەکات.", fact: "گەرمبوون یارمەتی دەدات؛ بەڵام مەترسێک بە بار، تەکنیک، خەوتن و مێژوو دەچەسپێت." },
      { myth: "فەوج لە دڵ تەنها بۆ گەورەکانە.", fact: "لە لاواندا کەمترە بەڵام بە هەندێک نەخۆشی یان مادە دەتوانێت ڕووبدات." },
      { myth: "بیرەوەری وەک ڤیدیۆ تۆمار کراوە.", fact: "بیرەوەری درووستکراوە؛ هەر جار هەڵبژاردن لەگەڵ نزیکیکردنەوە تێکەڵ دەکات." },
      { myth: "چاو ڕەش مانای شکانی ئێسکە.", fact: "کەللەپۆش دەکرێت بە فشانی بێ شکان؛ وێنە کاتێک پێویستە ڕوون دەکاتەوە." },
      { myth: "ئەگەر ئازار نەبیت وەرزشت بەتوندی نەبووە.", fact: "گونجاندن بەبێ DOMS دەبێت؛ ئازار تەنها نیشانە نییە." },
      { myth: "مەی سەرما لە کەشە ساریدا گەرمت دەکات.", fact: "لەمپەکانی پێست فراوان دەکات و زیان بە گەرمی ناوەندی دەگەیەنێت." },
      { myth: "دڵ تەنها لە لای چەپە.", fact: "زۆربەی لای چەپە بەڵام هەریەک لە چەپ و ڕاست هەیە." },
      { myth: "هویج بە شێوەیەکی زۆر بینایی شەوان باش دەکات.", fact: "ڤیتامین A کەمی ڕێگری لە بینایی شەوان؛ زۆرەی زیاد نابینیت." },
      { myth: "زاڵوو لە پزیشکی کۆن بێسوود بوو.", fact: "ئەمڕۆ لە هەندێک چاککردنی ئەندام و فشانی ڤێن بەکاردەهێنرێت." },
      { myth: "CPR هەمیشە دڵ وەک فیلم دەگەڕێنێتەوە.", fact: "CPR خوێن دەگوازێتەوە و کات دەکڕێت تا یارمەتی پێشکەوتوو یان دژەشەکە بەردەست بێت." },
      { myth: "تەنها لە یەک کاڵیکردنەوە هەناسە دەگیرین بە تەواو.", fact: "چرخەی نەخت و ڕزگار کردن هەیە؛ هەردوو ڕێڕەو بەشدارن." },
      { myth: "مایکرۆیڤ خواردەمەنی رادیۆئاکتیڤ دەکات.", fact: "بە جوڵاندنی مۆڵیکوولی ئاو گەرم دەکات؛ تیشکی یۆنکەر لە خواردن ناهێڵێت." },
    ],
  };

  var LEARN = {
    en: [
      {
        title: "Systems work as a team",
        body:
          "Circulation moves oxygen and nutrients; nerves coordinate urgency; hormones adjust long-term balance. When one system adapts, others feel it.",
      },
      {
        title: "Energy flow in a nutshell",
        body:
          "Digestion breaks food down, respiratory brings oxygen, circulatory delivers both, mitochondria make usable energy. Efficiency depends on steady sleep and hydration.",
      },
      {
        title: "Lifestyle signals the body reads",
        body:
          "Movement strengthens muscle and bone, patterns influence sleep hormones, stress touches immunity and digestion. Small habits stack into signals.",
      },
      {
        title: "Why medical terms help",
        body:
          "Precise names anchor maps in memory — they are tools for clear questions with teachers, coaches, or clinicians when needed.",
      },
    ],
    ku: [
      {
        title: "سیستەمەکان وەک تیمێک کار دەکەن",
        body:
          "گەشتن ئۆکسژین و خواردەمەنی دەگوازێتەوە؛ دەمارەکان هاوکاری دەکەن؛ هۆرمۆنەکان هاوسەنگی درێژخایەن ڕێکدەخەن. کاتێک سیستەمێک دەگۆڕێت، ئەوانەش هەست پێدەکەن.",
      },
      {
        title: "هێزی وزە بە کورتەیەک",
        body:
          "هەرمکردن خواردەمەنی دابەش دەکات، هەناسە ئۆکسژین دەهێنێت، گەشتن هەردووکیان دەگوازێتەوە، میتۆکۆندریە وزەی بەکار دەهێنراو درووست دەکات. ئارامی خەفتن و خواردنەوەی ئاو یارمەتی کارایی دەدات.",
      },
      {
        title: "کەرەسەتی ژیان کە جەستە دەخوێنێتەوە",
        body:
          "جوڵە ماسولکە و ئێسک بەهێز دەکات، ڕیتم کاریگەری لەسەر هۆرمۆنی خەوتن هەیە، فشان کاریگەری لەسەر بەرگری و هەرمکردن. نەریتی بچووک پاشەکیو دەبێتەوە.",
      },
      {
        title: "بۆچی زاراوەی پزیشکی سوودبەخشە",
        body:
          "ناوە ڕوونەکان نەخشە لە بیردا جێگیر دەکەن — دەبنە ئامراز بۆ پرسیاری ڕوون لەگەڵ مامۆستا، ڕاهێنەر، یان پزیشک کاتێک پێویستە.",
      },
    ],
  };

  var VISUAL = {
    en: {
      head: {
        title: "Head & neck",
        lines: [
          "Nervous: brain, cranial nerves",
          "Skeletal: skull, cervical spine",
          "Endocrine: pituitary, pineal context",
        ],
      },
      chest: {
        title: "Chest",
        lines: [
          "Respiratory: lungs, trachea, diaphragm edge",
          "Circulatory: heart, great vessels",
          "Muscular: intercostals, pectorals",
        ],
      },
      abdomen: {
        title: "Abdomen",
        lines: [
          "Digestive: stomach, liver, intestines",
          "Endocrine: pancreas (insulin/glucagon)",
          "Immune: gut‑associated lymph tissue",
        ],
      },
      limbs: {
        title: "Limbs",
        lines: [
          "Skeletal: long bones, joints",
          "Muscular: movers of arms and legs",
          "Circulatory: arteries and veins routing blood",
        ],
      },
    },
    ku: {
      head: {
        title: "سەرو سەر و مل",
        lines: [
          "دەمار: مێشک، دەماری سەر",
          "ئێسک: کەللە، مۆخێلی ملی",
          "هۆرمۆن: کەرتەی پاساو، چەرچەوی سەر",
        ],
      },
      chest: {
        title: "سینگ",
        lines: [
          "هەناسە: سیەکان، کانیوق، نزیکی مێفرەق",
          "گەشت: دڵ، خوێنباغەکان گەورە",
          "ماسولکە: نێوان قفقاڵ، لەشی سینگ",
        ],
      },
      abdomen: {
        title: "سک",
        lines: [
          "هەرمکردن: گەدە، جگەر، رەحەمەکان",
          "هۆرمۆن: پانکریاس (ئینسولین/گلوکاگۆن)",
          "بەرگری: تیشوەی لیمفی پەیوەندیدار بە رەحەم",
        ],
      },
      limbs: {
        title: "ئەندامەکانی جوڵە",
        lines: [
          "ئێسک: ئێسکە درێژەکان، ئەفسەرەکان",
          "ماسولکە: جوڵکەرەکانی قۆڵ و قاچ",
          "گەشت: بەڕە و کۆیل خوێن",
        ],
      },
    },
  };

  function sysEnKu(enObj, kuObj) {
    return { en: enObj, ku: kuObj };
  }

  var SYSTEM_DATA = {
    skeletal: sysEnKu(
      {
        title: "Skeletal System",
        blurb: "Rigid support, leverage, mineral storage, blood cell birthplace in marrow.",
        overview:
          "The skeleton forms the scaffold that shields organs and anchors muscles while housing marrow that helps blood formation.",
        why:
          "Without structural support, movement, protection, and mineral homeostasis would collapse — literally.",
        items: [
          {
            n: "Skull",
            f: "Protects the brain and sensory organs; anchors chewing motion.",
            s: "Facial bones and cranial vault develop from distinct embryonic sources.",
          },
          {
            n: "Spine",
            f: "Supports upright posture and shields the spinal cord within its canal.",
            s: "Discs between vertebrae add flex where rigid bones alone would not.",
          },
          {
            n: "Rib cage",
            f: "Forms a protective basket around the heart and lungs.",
            s: "Most adults have 12 pairs of ribs with shapes tuned near the diaphragm.",
          },
          {
            n: "Femur",
            f: "Transmits body weight from hip to knee during stance and gait.",
            s: "Often taught as the longest and strongest bone in typical adult anatomy.",
          },
          {
            n: "Pelvis",
            f: "Links the spine to the legs and cradles digestive and reproductive organs.",
            s: "The bowl-like structure transfers force evenly across both hips when walking.",
          },
        ],
        quiz: [
          {
            q: "Primary mineral stored abundantly in bone matrix?",
            o: ["Keratin", "Collagen only", "Calcium salts", "Melanin"],
            a: 2,
          },
          {
            q: "Which structure protects the spinal cord centrally?",
            o: ["Rib cage", "Vertebral canal", "Pelvic brim", "Mandible"],
            a: 1,
          },
          {
            q: "Femur primarily links which two regions?",
            o: ["Skull to spine", "Hip to knee", "Elbow to wrist", "Jaw to neck"],
            a: 1,
          },
          {
            q: "Red marrow in adults is especially relevant for:",
            o: ["Bile storage", "Blood cell formation", "Insulin release", "Visual focus"],
            a: 1,
          },
          {
            q: "Ribs cooperate most directly with:",
            o: ["Peristalsis", "Ventilation mechanics", "Synaptic speed", "Filtration rate"],
            a: 1,
          },
        ],
      },
      {
        title: "سیستەمی ئێسک",
        blurb: "پاڵپشتی تووند، دەستەپێگەیشتن، کۆگای کانزا، لەناو شۆنەوەیدا دروستبوونی خوێن.",
        overview:
          "ئاسکەڵەت چوارچێوەی پاراستن و نوێنەری ماسولکە درووست دەکات و شۆنەوە کۆگای دروستبوونی خوێن هەڵدەگرێت.",
        why:
          "بەبێ ئەم پاڵپشتییە جوڵە، پاراستن، و هاوسەنگی کانزا بەئاسانی تێکدەچووایە.",
        items: [
          {
            n: "کەللە",
            f: "مێشک و دەمەنی هەستکردن دەپارێزێت؛ جوڵەی چەنان پەیوەست دەکات.",
            s: "ئێسکی دەموچاو و سەر جیاوازن لە سەرچاوەی ئەمبریۆنیەکان.",
          },
          {
            n: "مۆخێل",
            f: "پۆستی ڕاستەوە پشتی دەدات و دەمارای ناو ئەناڵ پارێز دەکات.",
            s: "دیسکەکان نەرمی دەدەن لێرەی ئێسک تەنها سخت دەبوو.",
          },
          {
            n: "قەفەزەی قفقاڵ",
            f: "قەڵغان بۆ دڵ و سیەکان دروست دەکات.",
            s: "زۆرینە ١٢ جفت قفقاڵ؛ نزیک مێفرەق شێوە جیاواز دەبێت.",
          },
          {
            n: "ئێسکی ڕان (فیمۆر)",
            f: "کێش لە کەڵە کەز بۆ ئەژنۆ دەگوازێتەوە لە ڕۆیشتندا.",
            s: "زۆرجار درێژترین ئێسکی بەهێز دادەنرێت.",
          },
          {
            n: "حەوز (پێڵڤیس)",
            f: "مۆخێل بە قاچ دەبەستێتەوە و ئەندامی ناو سک دەپارێزێت.",
            s: "شێوەی بۆڵ فشان لە هەردوو کەڵە کەزدا هاوسەنگ دەگوازێتەوە.",
          },
        ],
        quiz: [
          {
            q: "کام کانزا لە ماتڕێکی ئێسکدا زۆر کۆگا دەکرێت؟",
            o: ["کێراتین", "تەنها کۆلاگەن", "تیژەی کالسیۆم", "مێلانین"],
            a: 2,
          },
          {
            q: "کام پێکهاتە دەمارای ناو ئەنالی مۆخێل ناوەڕاست پارێز دەکات؟",
            o: ["قەفەزەی قفقاڵ", "ئەنالی مۆخێل", "حەوزی لوک", "چەنان"],
            a: 1,
          },
          {
            q: "ئێسکی فیمۆر سەرەکییە لە بەستنەوەی:",
            o: ["کەللە بۆ مۆخێل", "کەڵە کەز بۆ ئەژنۆ", "ٱێڵ بۆ دەست", "چەنان بۆ مل"],
            a: 1,
          },
          {
            q: "شۆنەوەی سوور لە گەورەکاندا بەتایبەت پەیوەستە بە:",
            o: ["کۆگای ئەفرەز", "دروستبوونی خانەکانی خوێن", "دەرچوونی ئینسولین", "چڕکردنەوە"],
            a: 1,
          },
          {
            q: "قفقاڵ زیاتر هاوکاری دەکات لەگەڵ:",
            o: ["پێرهستە", "میکانیکی هەناسە", "خێرایی دەمار", "ڕێژەی پاڵاوتن"],
            a: 1,
          },
        ],
      }
    ),
    muscular: sysEnKu(
      {
        title: "Muscular System",
        blurb: "Movement, posture, heat, and metabolic demand shaped by fiber chemistry.",
        overview:
          "Skeletal muscle drives voluntary motion; smooth muscle lines hollow organs; cardiac muscle never rests contractile rhythms.",
        why:
          "Muscles translate nerve signals into motion and temperature stability — defining interaction with the world.",
        items: [
          { n: "Biceps", f: "Flexes the elbow and helps supinate the forearm.", s: "Shows two prominent “heads” on the upper arm." },
          { n: "Triceps", f: "The main elbow extensor on the back of the arm.", s: "Three heads merge into a strong tendon near the elbow." },
          { n: "Deltoid", f: "Lifts and rotates the shoulder through multiple directions.", s: "Caps the shoulder joint like a curved awning." },
          { n: "Quadriceps", f: "Straightens the knee for standing, stairs, and kicks.", s: "Includes a head that crosses both hip and knee." },
          { n: "Hamstrings", f: "Flex the knee and extend the hip when walking or running.", s: "Mostly on the back of the thigh with shared tendon landmarks." },
          { n: "Abdominals", f: "Flex the trunk, stabilize posture, and raise abdominal pressure.", s: "Work with breathing, laughter, and protected lifting." },
        ],
        quiz: [
          { q: "Cardiac muscle is found chiefly in:", o: ["Liver lobules", "Heart walls", "Dermis", "Cartilage"], a: 1 },
          { q: "Primary inspiratory muscle at quiet rest:", o: ["Masseter", "Diaphragm", "Gastrocnemius", "Orbicularis oculi"], a: 1 },
          { q: "Quadriceps primarily extend:", o: ["Hip", "Elbow", "Knee", "Ankle inversion"], a: 2 },
          { q: "Smooth muscle lines:", o: ["Bone cortex", "Hollow organs", "Tendons", "Lens"], a: 1 },
          { q: "Skeletal muscle contraction ultimately uses:", o: ["ATP", "Iron alone", "Melatonin", "Bile salts"], a: 0 },
        ],
      },
      {
        title: "سیستەمی ماسولکە",
        blurb: "جوڵە، ڕەوش، گەرمی، و داوای مێتابۆلی پەیوەست بە کیمیای تاکەکان.",
        overview:
          "ماسولکەی ئێسکی جوڵەی ئارەزووکراو دەدات؛ ماسولکەی نەرم ئەندامە بەتاڵ دەکێشێتەوە؛ دڵ بە جوڵەی بێوەستان دەجووڵێت.",
        why:
          "ماسولکەکان ئاماژەی دەمار دەگۆڕن بۆ جوڵە و گەرمیی جێگیر — کاریگەری لەگەڵ جیهان.",
        items: [
          { n: "بایسێپس", f: "ئەژنۆ دەست دەخاتە ناوەوە و قۆڵ دەسوڕێنێتەوە.", s: "دوو سەری دیار لەسەر سەرەڕێی باڵا." },
          { n: "ترایسێپس", f: "سەرەکی درێژکەرەکانی ئەژنۆ لە پشتی قۆڵ.", s: "سێ سەر تێکەڵ دەبن بۆ تاندۆنی بەهێز." },
          { n: "دێلتۆید", f: "ئاڵوگۆشەی هەڵدەگرێت و دەوری هەڵدەسوڕێنێت.", s: "وەک سێبەر لەسەر ئاڵوگۆشە دایدەنێت." },
          { n: "چوارسەرەوەی ڕان", f: "ئەژنۆ درێژ دەکاتەوە بۆ هەستن و هەنگاو.", s: "یەکێک لە سەرەکان کەڵە کەزیش دەپەڕێت." },
          { n: "هامسترینگ", f: "ئەژنۆ دەخاتە ناوەوە و کەڵە کەز درێژ دەکاتەوە.", s: "لە پشتی ڕان لە ڕۆیشتندا زۆر کار دەکەن." },
          { n: "ماسولکەی سک", f: "تەڕکردن و ڕەوشی پشت ڕێکدەخات.", s: "لەگەڵ هەناسە و پیت دەکڕن." },
        ],
        quiz: [
          { q: "ماسولکەی دڵ سەرەکیان دۆزینەوە:", o: ["تاوەکانی جگەر", "دیواری دڵ", "پیسک", "ڕەوتوفەڕ"], a: 1 },
          { q: "ماسولکەی سەرەکی هەناسەی ئاسان:", o: ["ماسێتەر", "مێفرەق", "گەسترۆکنیمێن", "ئۆربیکواریس"], a: 1 },
          { q: "چوارسەرەوە سەرەکی ئەژنۆی درێژ دەکاتەوە:", o: ["کەڵە کەز", "ٱێڵ", "ئەژنۆ", "سوڕانەوەی قاچ"], a: 2 },
          { q: "ماسولکەی نەرم زیاتر لە چی داپۆشدراوە؟", o: ["قەوزی ئێسک", "ئەندامە بەتاڵ", "تاندۆن", "لێنس"], a: 1 },
          { q: "کڕینەوەی ماسولکەی ئێسک لە کۆتاییدا پەیوەستە بە:", o: ["ئا تی پی", "تەنها ئاسین", "مێلاتۆنین", "تۆزەکانی ئافرە"], a: 0 },
        ],
      }
    ),
    nervous: sysEnKu(
      {
        title: "Nervous System",
        blurb: "Rapid signaling for sensation, movement, thought, and home regulation.",
        overview:
          "Central and peripheral divisions unite electrical and chemical signals so the body responds in milliseconds to internal and external change.",
        why:
          "Without integration and wiring, organs would act out of sync — coordination is survival.",
        items: [
          { n: "Brain", f: "Plans movement, learns, and interprets sensory streams.", s: "Uses a remarkable share of resting energy for its mass." },
          { n: "Spinal cord", f: "Superhighway for tracts plus automatic reflex arcs.", s: "Crossing pathways explain contralateral control patterns." },
          { n: "Neurons", f: "Fire action potentials and release neurotransmitters.", s: "Some peripheral axons regrow slowly after injury." },
          { n: "Peripheral nerves", f: "Connect cord and brainstem to muscles and skin.", s: "Often carry both motor commands and sensory feedback." },
          { n: "Synapses", f: "Junctions where chemical messengers pass between cells.", s: "Synaptic change is central to models of learning." },
        ],
        quiz: [
          { q: "The central nervous system primarily includes:", o: ["Liver and spleen", "Brain and spinal cord", "Kidneys only", "Pancreas ducts"], a: 1 },
          { q: "Fast long-distance neural signals use:", o: ["Bile flow", "Action potentials", "Collagen tension", "Keratin sheets"], a: 1 },
          { q: "Spinal reflexes can occur:", o: ["Only during sleep", "Without deliberate thought", "Without synapses", "Only in infants"], a: 1 },
          { q: "Neurotransmitters cross:", o: ["Bone matrix", "Synaptic clefts", "Tendon sheaths", "Hair shafts"], a: 1 },
          { q: "Sensory pathways generally:", o: ["Ignore the brain", "Converge toward interpretation centers", "Stop at skin only", "Move bones directly"], a: 1 },
        ],
      },
      {
        title: "سیستەمی دەمار",
        blurb: "ئاگاداری خێرا بۆ هەست، جوڵە، بیرکردنەوە، و ڕێکخستنی ناوخۆیی.",
        overview:
          "ناوەندی دەمار و دەوری دەمار ئاماژەکانی کارەبایی و کیمیایی تێکەڵ دەکەن بۆ وەڵامدانەوەی خێرا.",
        why:
          "بەبێ تێکەڵکردن و بەستەر، ئەندامەکان لەکاتی یەکدا کار ناکەن.",
        items: [
          { n: "مێشک", f: "جوڵە پلان دەکات، فێر دەبێت، هەست تێدەگات.", s: "وزەی زۆر بە ڕێژەیی پارەوانە بەکاردەهێنێت." },
          { n: "مۆخێلی دەمار", f: "ڕێڕەو بۆ دەمارەکان و ڕەفلێکس.", s: "ڕێڕە جیاوازەکان نەخۆشی ڕوون دەکەنەوە." },
          { n: "نێرۆن", f: "پەتانسیالی کارەبایی دروست دەکەن و نوێرۆترانسمیتەر دەردەکەن.", s: "دەماری دەوربەش دوای برین هێواش دەگەڕێتەوە." },
          { n: "دەماری دەوربەش", f: "مۆخێل بە ماسولکە و پێست دەبەستێتەوە.", s: "دەماری تێکەڵ مووشک و هەست دەگوازێتەوە." },
          { n: "سیناپس", f: "خاڵی گواستنەوەی پیام کیمیایی نێوان خانە.", s: "گۆڕانکاریی سیناپس بنەمای فێربوونە." },
        ],
        quiz: [
          { q: "سیستەمی دەماری ناوەندی سەرەکی پێکهاتووە لە:", o: ["جگەر و تال", "مێشک و مۆخێل", "تەنها گورچیلە", "مەڕەتی پانکریاس"], a: 1 },
          { q: "ئاگاداری خێرا لە دەماردا بە:", o: ["رەوتی ئافرە", "پەتانسیالی کارەبایی", "کێشی کۆلاگەن", "قەوزی کێراتین"], a: 1 },
          { q: "ڕەفلێکسی مۆخێل دەتوانێت:", o: ["تەنها لە خەوتن", "بەبێ بیرکردنەوە", "بەبێ سیناپس", "تەنها لە منداڵدا"], a: 1 },
          { q: "نوێرۆترانسمیتەر دەپەڕنەوە لە:", o: ["ماتڕێکی ئێسک", "نێوانەی سینaptic", "غیشەی تاندۆن", "تارەی قژ"], a: 1 },
          { q: "ڕێڕەوی هەمەواری بە گشتی:", o: ["مێشک پشتگوێدەخات", "بەرەو ناوەندی تێگەیشتن دەچێت", "لە پێستەوە وەقوو دەبێت", "ئێسک ڕاستەوخۆ جوڵاندەکات"], a: 1 },
        ],
      }
    ),
    digestive: sysEnKu(
      {
        title: "Digestive System",
        blurb: "Mechanical and chemical processing to absorb fuel and building blocks.",
        overview:
          "From mouth to anus, muscular layers mix contents while glands secrete enzymes and buffers for breakdown and uptake.",
        why:
          "Nutrient entry sets limits for growth, repair, and daily energy budgets system-wide.",
        items: [
          { n: "Mouth", f: "Mechanical breakdown and start of carbohydrate digestion with saliva.", s: "Teeth and tongue shape the food bolus before swallowing." },
          { n: "Esophagus", f: "Muscular tube that propels food to the stomach.", s: "Gravity helps, but peristalsis does most of the work." },
          { n: "Stomach", f: "Churns chyme and activates protein digestion with acid.", s: "A rugged lining renews constantly despite low pH." },
          { n: "Liver", f: "Processes nutrients, makes proteins, and releases bile.", s: "Dual blood inflow highlights its central metabolic role." },
          { n: "Small intestine", f: "Main site for enzymatic digestion and absorption.", s: "Villi and microvilli massively increase surface area." },
          { n: "Large intestine", f: "Reabsorbs water and electrolytes; houses helpful bacteria.", s: "Forms more solid waste for elimination." },
        ],
        quiz: [
          { q: "Most nutrient absorption occurs in:", o: ["Trachea", "Small intestine", "Urethra", "Epidermis"], a: 1 },
          { q: "Bile aids primarily digestion of:", o: ["Starches only", "Fats", "DNA exclusively", "Nitrogen gas"], a: 1 },
          { q: "Pepsinogen activation depends on:", o: ["Alkaline pH", "Acidic gastric pH", "Bone pressure", "Surfactant"], a: 1 },
          { q: "Peristalsis describes:", o: ["Synaptic summation", "Wavelike muscular propulsion", "Bone remodeling", "Hair cycling"], a: 1 },
          { q: "Liver helps blood sugar stability by:", o: ["Only vision", "Storing and releasing glucose", "Tendon stiffness", "Nail gloss"], a: 1 },
        ],
      },
      {
        title: "سیستەمی پێکردنی خواردن",
        blurb: "پڕۆسەی میکانیکی و کیمیایی بۆ وەرگرتنی سووتەمەنی.",
        overview:
          "لە دەموچاوەوە تا دواوە ماسولکە تێکەڵ دەکات و ئەفرەز ئەنزایم و بافەر دەردەکات.",
        why:
          "خواردەمەندەکان سنووری گەشە و چاکبوونەوە و وزەی ڕۆژانە دیاری دەکەن.",
        items: [
          { n: "دەموچاو", f: "تێکدان بە میکانیکی و دەستپێکی هەرمکردنی کەرەسەتەکان.", s: "ددان و زمان بۆلە ئامادە دەکەن." },
          { n: "میزرەپش", f: "لوولەی ماسولکەیی بۆ گواستنەوە بۆ گەدە.", s: "پێرهستە زۆرینەی کار دەکات." },
          { n: "گەدە", f: "کایم تێکدات و هەرمکردنی پرۆتئین لەگەڵ ئاسید دەست پێدەکات.", s: "ڕووبەر خۆی نوێدەکاتەوە لەگەڵ پی ئەیچ توند." },
          { n: "جگەر", f: "خواردەمەند پرۆسێس دەکات؛ پرۆتئین و ئافرە.", s: "دوو هاتنی خوێن ناوەندی مێتابۆڵیک دەردەکەن." },
          { n: "رەحەمە بچووک", f: "سەرەکی هەرمکردن و وەرگرتن.", s: "وێلای زۆر روونەڕایی زیاد دەکەن." },
          { n: "رەحەمە گەورە", f: "ئاو و ئەلکترۆلایت دەگەڕێنێتەوە؛ میکڕۆبی سوودبەخش.", s: "ئامادەکردنی بەربەست بۆ دەرچوون." },
        ],
        quiz: [
          { q: "زۆرینەی وەرگرتن لە:", o: ["کانیوق", "رەحەمە بچووک", "میزرەپشی", "پیسک"], a: 1 },
          { q: "ئافرەی جگەر سەرەکی یارمەتی:", o: ["تەنهانیشان", "چەوری", "دی ئێن ئەی تەنها", "ئازۆتی هەوا"], a: 1 },
          { q: "چالاکبوونی پێپسینۆجەن پەیوەستە بە:", o: ["پی ئەیچ ئەلکاڵی", "پی ئەیچ ئاسیدی گەدە", "فشانی ئێسک", "سەرپێنجی سیەکان"], a: 1 },
          { q: "پێرهستە واتا:", o: ["کۆکردنەوەی سیناپس", "جوڵەی شەپۆل وە لە ماسولکە", "نوێبوونەوەی ئێسک", "سووری قژ"], a: 1 },
          { q: "جگەر لە شەکرەی خوێندا:", o: ["تەنها بینین", "کۆگا و دەرچوونی گلووکۆز", "تەنها تاندۆن", "پێستکردنی نون"], a: 1 },
        ],
      }
    ),
    respiratory: sysEnKu(
      {
        title: "Respiratory System",
        blurb: "Gas exchange linking atmosphere to blood chemistry.",
        overview:
          "Conducting airways warm and filter air; alveoli create thin diffusion barriers with capillary blood.",
        why:
          "Oxygen delivery scales aerobic metabolism; CO₂ removal stabilizes blood pH.",
        items: [
          { n: "Nose", f: "Warms, humidifies, and filters inspired air.", s: "Nasal turbinate anatomy swirls airflow for contact with mucosa." },
          { n: "Trachea", f: "Conducts air toward the lungs with cartilage support.", s: "Cilia move mucus-trapped particles upward." },
          { n: "Bronchi", f: "Branching tubes that distribute air within the lungs.", s: "Cartilage amount decreases as branches narrow." },
          { n: "Lungs", f: "House alveoli where oxygen enters blood.", s: "Together they offer enormous respiratory surface." },
          { n: "Diaphragm", f: "Primary muscle changing chest volume for breathing.", s: "Innervation via the phrenic nerves is clinically memorable." },
        ],
        quiz: [
          { q: "Primary gases exchanged at the alveoli:", o: ["Iron and zinc", "Oxygen and carbon dioxide", "Glucose only", "Keratin"], a: 1 },
          { q: "Surfactant mainly prevents:", o: ["Bone cracking", "Alveolar collapse from surface tension", "Muscle cramp", "Deafness"], a: 1 },
          { q: "The trachea is kept open partly by:", o: ["Liquid cartilage alone", "C-shaped cartilage rings", "Dense bone plates", "Retina"], a: 1 },
          { q: "Quiet breathing at rest relies heavily on:", o: ["Masseter", "Diaphragm motion", "Biceps only", "Ciliary beat in cochlea"], a: 1 },
          { q: "CO₂ removal helps maintain:", o: ["Nail color only", "Acid–base balance of blood", "Tendon length", "Hair thickness"], a: 1 },
        ],
      },
      {
        title: "سیستەمی هەناسە",
        blurb: "ئاڵوگۆڕی غاز نێوان هەوا و خوێن.",
        overview:
          "ڕێڕەوی هەوا هەوا گەرم و پاڵاوتن دەکات؛ ئالڤئۆل دیواری ناسک لەگەڵ کاپیلاری خوێن دروست دەکات.",
        why:
          "گەیاندنی ئۆکسجین مێتابۆڵیزی ئایرۆبیک گەورە دەکات؛ لابردنی CO₂ پی ئەیچ خوێن ڕێکدەخات.",
        items: [
          { n: "لووت", f: "هەوا گەرم و نەم و پاڵاوتن دەکات.", s: "شێوەی ناوی لووت هەوا لەگەڵ میکۆسا دەتێکێنێت." },
          { n: "کانیوق", f: "هەوا دەگوازێتەوە بە پاڵپشتی غەرقیڕ.", s: "ڕیشاڵ قوزە بەرەو سەر دەنێرێت." },
          { n: "برۆنک", f: "لولەکان دابەش دەکەنە ناو سیەکان.", s: "غەرقیڕ کەم دەبێتەوە کاتێک لولەکان بچووک دەبن." },
          { n: "سیەکان", f: "ئالڤئۆل لەناویدا — ئۆکسجین بۆ خوێن.", s: "رووبەری هەناسە زۆر گەورەیە." },
          { n: "مێفرەق", f: "سەرەکی ماسولکەی هەناسە هێنان.", s: "دەماری فرénیک لە کلینیکدا ناسراوە." },
        ],
        quiz: [
          { q: "غازە سەرەکییەکان لە ئالڤئۆلدا:", o: ["ئاسین و زینک", "ئۆکسجین و کاربۆن دای ئۆکساید", "تەنها گلووکۆز", "کێراتین"], a: 1 },
          { q: "سەرپێنج سەرەکی ڕێگری دەکات لە:", o: ["ئێسک شکاو", "داخستنەوەی ئالڤئۆل لە رووبەرکێش", "کڕکڕی ماسولکە", "کڕێشە"], a: 1 },
          { q: "کانیوق بە کرانەوە یارمەتی:", o: ["تەنها شل", "ئەڵقەی غەرقیڕ", "قەوزی ئێسکی تەسک", "ڕێتیینا"], a: 1 },
          { q: "هەناسەی ئارام لەسەر مێفرەق زۆر:", o: ["ماسێتەر", "جوڵەی مێفرەق", "تەنها بایسێپس", "پیل لە کەلووک"], a: 1 },
          { q: "لابردنی CO₂ یارمەتی:", o: ["تەنها ڕەنگی نون", "هاوسەنگی ئاسید–ئەلکاڵی خوێن", "درێژی تاندۆن", "تووکی قژ"], a: 1 },
        ],
      }
    ),
    circulatory: sysEnKu(
      {
        title: "Circulatory System",
        blurb: "Transport network for cells, gases, nutrients, heat, and immunity.",
        overview:
          "Heart pumps blood through high-pressure arteries, exchange capillaries, and low-pressure veins homeostatically tuned.",
        why:
          "Distribution couples every organ to shared chemistry and defense within minutes.",
        items: [
          { n: "Heart", f: "Chambers coordinate rhythmic contraction propelling blood.", s: "Coronary arteries feed the pump itself." },
          { n: "Arteries", f: "Carry oxygenated blood away from heart (systemic exceptions noted in courses).", s: "Elastic walls damp pressure waves." },
          { n: "Veins", f: "Return blood under lower pressure, often with valves.", s: "Skeletal muscle pump assists venous return." },
          { n: "Capillaries", f: "Thin-walled exchange interfaces.", s: "Huge total surface area despite microscopic diameter." },
        ],
        quiz: [
          { q: "The heart’s systemic pump sends blood into:", o: ["Pulmonary veins first", "Aorta", "Bile duct", "Nasal cavity"], a: 1 },
          { q: "Most gas and nutrient exchange occurs across:", o: ["Tendon cores", "Capillary walls", "Hair cortex", "Lens"], a: 1 },
          { q: "Veins compared with arteries typically show:", o: ["Higher pressure always", "Lower pressure and valves in limbs", "No endothelium", "No blood"], a: 1 },
          { q: "Coronary circulation supplies:", o: ["Liver lobules", "Cardiac muscle", "Renal pyramids", "Nasal mucosa"], a: 1 },
          { q: "Whole-body transport time scales are:", o: ["Years", "Roughly minutes for a lap", "Days only", "Nanoseconds only"], a: 1 },
        ],
      },
      {
        title: "سیستەمی گەشتن",
        blurb: "تۆڕی گواستنەوە بۆ خانە، غاز، خواردەمەند، گەرمی، و بەرگری.",
        overview:
          "دڵ خوێن لە ڕێگەی ئارتیری فشان بەرز، کاپیلاری ئاڵوگۆڕ، و ڤێنین فشان نزم دەگوازێتەوە.",
        why:
          "گواستنەوە هەموو ئەندامەکان بە کیمیاناسی هاوبەش دەبەستێتەوە.",
        items: [
          { n: "دڵ", f: "ژێدەر کاردەکەن بۆ کڕینەوەی ڕیتمیک.", s: "ئارتیری کۆرۆنەر دڵ خۆی دەپۆشنێت." },
          { n: "ئارتیری", f: "خوێن لە دڵ دەڕوانێتە دەرەوە ( جیاوازی سیستەماتیک فێر دەکرێت).", s: "دیواری کشسان فشان دەنرمەکات." },
          { n: "ڤێنین", f: "خوێن لە فشانی کەمتر دەگەڕێتەوە، لەگەڵ ڤالڤ.", s: "پەمپکردنی ماسولکە یارمەتی گەرانەوەی ڤێنین دەدات." },
          { n: "کاپیلاری", f: "دیواری ناسک بۆ ئاڵوگۆڕ.", s: "رووبەر زۆر گەورەیە گەر کۆ بکرێتەوە." },
        ],
        quiz: [
          { q: "پەمپی سیستەماتیکی دڵ خوێن دەنێرێت بۆ:", o: ["سەرەتا ڤێنین سیەکان", "ئۆرتە", "مەڕەتی ئافرە", " دەموچاو"], a: 1 },
          { q: "زۆرینەی ئاڵوگۆڕی غاز و خواردەمەند لە:", o: ["ناوکی تاندۆن", "دیواری کاپیلاری", "قۆژی قژ", "لێنس"], a: 1 },
          { q: "ڤێنین لەگەڵ ئارتیری بە گشتی:", o: ["فشان بەرزترە", "فشان کەمتر و ڤالڤ لەئەندامەکاندا", "بێ ئێندۆسێیل", "بێ خوێن"], a: 1 },
          { q: "گەشتی کۆرۆنەر دەرمان دەکات بە:", o: ["تاوەکانی جگەر", "تیشوەی دڵ", "هەرمەکانی گورچیلە", "میکۆسای دەموچاو"], a: 1 },
          { q: "ماوەی گەشتێکی گشتی نزیکەی:", o: ["ساڵان", "خولەکێک", "ڕۆژ", "نانۆچرکە تەنها"], a: 1 },
        ],
      }
    ),
    endocrine: sysEnKu(
      {
        title: "Endocrine System",
        blurb: "Hormonal regulation pacing growth, metabolism, stress, and reproduction.",
        overview:
          "Glands release messengers into blood for slower, widespread coordination complementing nerves.",
        why:
          "Minute concentrations shift entire organ budgets hours to days at a time.",
        items: [
          { n: "Pituitary", f: "Master hub influencing growth, thyroid, adrenal axes.", s: "Sits in sella turcica below hypothalamic control." },
          { n: "Thyroid", f: "Sets basal metabolic tone via iodinated hormones.", s: "Butterfly shape straddling anterior trachea." },
          { n: "Adrenal glands", f: "Cortex secretes cortisol and aldosterone; medulla catecholamines.", s: "Sitting atop kidneys links stress and salt balance." },
          { n: "Pancreatic islets", f: "Insulin and glucagon steer blood glucose.", s: "Scattered islets amid exocrine acini." },
          { n: "Ovaries / testes (gonads)", f: "Produce gametes and key sex hormones.", s: "Feedback loops with the brain tune hormone rhythms over life stages." },
        ],
        hormones: [
          { n: "Insulin", src: "Pancreatic β cells", f: "Lowers blood glucose by promoting uptake and storage.", m: "Keeps cells fed without chronic hyperglycemia damage." },
          { n: "Cortisol", src: "Adrenal cortex", f: "Mobilizes energy and modulates stress responses.", m: "Timing links sleep–wake and immune tone when balanced." },
          { n: "Estrogen", src: "Ovaries (also placenta, adipose in part)", f: "Shapes reproductive tissues and bone maintenance.", m: "Understanding levels informs health conversations with clinicians." },
          { n: "Testosterone", src: "Testes (adrenal minor)", f: "Supports muscle, bone density, and reproductive function.", m: "Normal ranges vary by age and lab context." },
          { n: "Melatonin", src: "Pineal gland", f: "Signals circadian darkness for sleep timing.", m: "Light exposure shifts secretion patterns." },
          { n: "Thyroid hormones (T3/T4)", src: "Thyroid follicular cells", f: "Set metabolic set-point for many tissues.", m: "Iodine availability ties to hormone construction." },
        ],
        quiz: [
          { q: "Endocrine signals typically travel via:", o: ["Tendon tension only", "Bloodstream", "Bone canals only", "Synapses exclusively"], a: 1 },
          { q: "Insulin’s main effect direction on blood glucose:", o: ["Raises sharply", "Lowers by promoting uptake", "No effect", "Only in tendons"], a: 1 },
          { q: "Cortisol arises chiefly from:", o: ["Pineal only", "Adrenal cortex", "Thymus cortex", "Gallbladder"], a: 1 },
          { q: "Melatonin is strongly tied to:", o: ["Circadian light cues", "Tendon stretch", "Nail growth only", "Bile color"], a: 1 },
          { q: "Thyroid hormones require mainly:", o: ["Silver atoms", "Iodine", "Diamond dust", "Chlorophyll"], a: 1 },
        ],
      },
      {
        title: "سیستەمی هۆرمۆن",
        blurb: "ڕێکخستنی هۆرمۆن بۆ گەشە، مێتابۆڵ، فشان، و تەواوکاری.",
        overview:
          "ئەرکەکان پەیامبەری خوێن دەردەکەن بۆ هاوکاری هێواشتر کە دەمار تەواو دەکات.",
        why:
          "بڕی زۆر کەم کاریگەری لەسەر هەموو ئەندامەکان دەبێت.",
        items: [
          { n: "کەرتەی پاساو", f: "ناوەند بۆ گەشە، تیرۆئید، ئadrەنال.", s: "لە ناو سێلا تورسیکا لەژێر کۆنتڕۆلی هایپۆتالامۆس." },
          { n: "تیرۆئید", f: "تۆنەکانی مێتابۆڵی بنەڕەتی بە هۆرمۆنی یۆددار.", s: "شێوەی پەپڵۆک لەسەر کانیوق پێشەوە." },
          { n: "ئadrەنال", f: "قۆرتێکس کۆرتیزۆل و ئالدۆستیرۆن؛ مێدەڵا کاتێکۆلامین.", s: "لەسەر گورچیلە دانیشتووە؛ فشان و نانەک." },
          { n: "دوڕگی پانکریاس", f: "ئینسولین و گلووکاگۆن شەکرەی خوێن ڕێکدەخەن.", s: "دوڕگەکان لەناو تیشوەی ئەفرەز داپۆشراون." },
          { n: "هەنجیرەکانی ژن و نێر (گۆناد)", f: "تەواوکەر و هۆرمۆنی سێکسی دروست دەکەن.", s: "هەناردەتی مێشک کاتی هۆرمۆن ڕێکدەخات." },
        ],
        hormones: [
          { n: "ئینسولین", src: "خانەکانی بێتای پانکریاس", f: "شەکرەی خوێن کەم دەکاتەوە بە وەرگرتن و کۆگا.", m: "خانەکان پارێز دەکات لە زیانەکانی شەکرەی بەرز." },
          { n: "کۆرتیزۆڵ", src: "قۆرتێکسی ئadrەنال", f: "وزە دەگوازێتەوە و وەڵامی فشان ڕێکدەخات.", m: "کات پەیوەستە بە خەوتن و تۆنەی بەرگری کاتێک هاوسەنگە." },
          { n: "ئێستڕۆجین", src: "هەنجیر (جەستەش لە بڕێکی)", f: "تیشوەی تەواوکاری و ئێسک پارێز دەکات.", m: "زانین دەربارەی ئاستەکان یارمەتی گفتوگۆی پزیشکی دەدات." },
          { n: "تێستۆستیرۆن", src: "هەنجیر (ئadrەنال کەم)", f: "ماسولکە و ئێسک و تەواوکاری.", m: "ئاستەکان بە تەمەن و تاقیکردنەوە جیاوازن." },
          { n: "مێلاتۆنین", src: "ئارەزەی سەربێسکی", f: "کاتی تاریکی ڕۆژانە بۆ خەوتن.", m: "ڕووناکی کاریگەری لەسەر دەرچوون." },
          { n: "هۆرمۆنی تیرۆئید (تی ٣ / تی ٤)", src: "خانەی فۆلیکی تیرۆئید", f: "خاڵی مێتابۆڵی زۆرینەی تیشوەکان.", m: "یۆد پێویستە بۆ دروستکردنی هۆرمۆن." },
        ],
        quiz: [
          { q: "پەیامی ئەندۆکراین بە گشتی دەچێتە:", o: ["تەنها تاندۆن", "خوێن", "نەقی ئێسک", "تەنها سیناپس"], a: 1 },
          { q: "ئینسولین سەرەکی شەکرەی خوێن:", o: ["زۆر بەرز دەکاتەوە", "کەم دەکاتەوە بە وەرگرتن", "هیچ کاریگەری نییە", "تەنها لە تاندۆن"], a: 1 },
          { q: "کۆرتیزۆڵ سەرەکی لە:", o: ["تەنها سەربێسکی", "قۆرتێکسی ئadrەنال", "تایمۆس", "سدی"], a: 1 },
          { q: "مێلاتۆنین زۆر پەیوەستە بە:", o: ["ڕووناکی ڕۆژانە", "کێشی تاندۆن", "تەنها نون", "ڕەنگی ئافرە"], a: 1 },
          { q: "هۆرمۆنی تیرۆئید پێویستی بە:", o: ["زیێن", "یۆد", "ئاڵماس", "کلۆرۆفیل"], a: 1 },
        ],
      }
    ),
    reproductive: sysEnKu(
      {
        title: "Reproductive System",
        blurb: "Structures for gamete formation, fertilization, and (in assigned female physiology) gestation support.",
        overview:
          "Hormones and anatomy coordinate cycles, maturation, and safe environments for early development in humans.",
        why:
          "Understanding anatomy supports informed health literacy about fertility, screening, and puberty timing.",
        items: [
          { n: "Ovaries", f: "Produce egg cells and cyclic estrogen and progesterone.", s: "Each cycle recruits a cohort of follicles before one typically dominates." },
          { n: "Fallopian tubes", f: "Capture the egg and are the usual site of fertilization.", s: "Cilia and gentle muscle motion help transport the embryo toward the uterus." },
          { n: "Uterus", f: "Muscular chamber where implantation and growth can occur.", s: "Its wall thickens and sheds in rhythm with hormonal signals." },
          { n: "Testes", f: "Make sperm and secrete testosterone.", s: "Kept slightly cooler than core temperature to support sperm formation." },
          { n: "Epididymis & ducts", f: "Store and mature sperm on their way out.", s: "Long coiled tubing is packed compactly along the back of each testis." },
        ],
        quiz: [
          { q: "Testosterone is chiefly produced in adult assigned male anatomy by:", o: ["Pineal", "Testes", "Thyroid", "Trachea"], a: 1 },
          { q: "Ovaries cyclically influence:", o: ["Bone density signals among others", "Only hair color permanently", "Tendon length fixedly", "Lens opacity only"], a: 0 },
          { q: "The uterus is best described as:", o: ["Gas exchange sac", "Muscular organ supporting gestation", "Sound transducer", "Bile reservoir"], a: 1 },
          { q: "Sperm maturation benefits from:", o: ["Warmer than core optional regulation", "Cooler scrotal environment", "Bone marrow only", "Alveoli"], a: 1 },
          { q: "Reproductive health literacy helps:", o: ["Replacing clinicians", " Asking clear questions during visits", "Ignoring screenings", "Avoiding anatomy study"], a: 1 },
        ],
      },
      {
        title: "سیستەمی تەواوکاری",
        blurb: "پێکهاتەکان بۆ خانەی تەواوکاری، تێکەڵبوون، و پشتگیری (لە فیزیۆلۆژیای ژن) گەشە.",
        overview:
          "هۆرمۆن و ئەناتۆمی بەرەو چاڵاکی، بەسەردەچوون، و ژینگەی سەلامەت بۆ گەشەی سەرەتایی کاردەکەن.",
        why:
          "ناسینی ئەناتۆمی یارمەتی ئاگاداری تەندروستی دەدات دەربارەی باروری و پشکنین و گەشەپێدان.",
        items: [
          { n: "هەنجیرەکان", f: "نەیتەی تەواوکاری و ئێستڕۆجین/پڕۆجێستیرۆن.", s: "مامناوەندێک فۆلیکێل گرنگ دەکات." },
          { n: "مەترەی فەلوپی", f: "نەیتە دەگرێت؛ شوێنی تێکەڵبوونی ئاسان.", s: "پیل و ماسولکە تەنێرە دەگوازنەوە." },
          { n: "میترۆس", f: "ژێگیربوون و گەشە لە ئەناتۆمیی ئاسان.", s: "دیواری قەڵەو و دەرچوون بەگوێرەی هۆرمۆن." },
          { n: "هەنجیر (نێر)", f: "تەنێرە و تێستۆستیرۆن.", s: "گەرمی کەمتر لە ناو کەڵک یارمەتیدەرە." },
          { n: "ئێپیدیدایمەس و مەترە", f: "تەنێرە گەشە و کۆگا و گواستنەوە.", s: "لولە پێچراو لە پشتی هەنجیر کۆکراوەتەوە." },
        ],
        quiz: [
          { q: "تێستۆستیرۆن لە گەورە نێردا سەرەکی لە کوێ دروست دەبێت؟", o: ["سەربێسکی", "هەنجیر", "تیرۆئید", "کانیوق"], a: 1 },
          { q: "هەنجیرەکان کاریگەریان هەیە لەسەر:", o: ["ئێسک و هۆرمۆن و زۆر شتی تر", "تەنها ڕەنگی قژ", "درێژی تاندۆن", "لێنس تەنها"], a: 0 },
          { q: "میترۆس بە باشی دەناسرێتەوە وەک:", o: ["کیسەی غاز", "ئەندامی ماسولکەیی پشتگیر", "هەستەوەرێکی دەنگ", "کۆگای ئافرە"], a: 1 },
          { q: "گەشەی تەنێرە سوود لە چی دەبینێت؟", o: ["گەرمی بەرز لە ناو", "گەرمی نەرمتر لە سکرۆتۆم", "شۆنەوەی تەنها", "ئالڤئۆل"], a: 1 },
          { q: "ئاگاداری تەواوکاری یارمەتی دەدات لە:", o: ["جێگرتنەوەی پزیشک", "پرسیاری ڕوون لە پزیشک", "پشتگوێخستنی پشکنین", "دژی فێربوون"], a: 1 },
        ],
      }
    ),
    immune: sysEnKu(
      {
        title: "Immune System",
        blurb: "Defense, surveillance, and memory against pathogens and abnormal cells.",
        overview:
          "Innate fast responders meet adaptive lymphocytes with specificity and immunologic memory.",
        why:
          "Balanced regulation protects tissue while controlling infection.",
        items: [
          { n: "White blood cells", f: "Neutrophils, lymphocytes, monocytes, and more respond to threats.", s: "A blood differential highlights which line is most active." },
          { n: "Lymph nodes", f: "Filter lymph and give immune cells a place to coordinate.", s: "Can enlarge when lymphocytes multiply during infection." },
          { n: "Spleen", f: "Screens blood, stores platelets, clears worn cells.", s: "Connects circulatory traffic with immune surveillance." },
          { n: "Bone marrow", f: "Birthplace of many blood and immune cell lines.", s: "Stem cells there divide into diverse defensive lineages." },
          { n: "Thymus", f: "Educates young T cells so they recognize threats safely.", s: "Most active earlier in life, then gradually shrinks." },
        ],
        quiz: [
          { q: "Adaptive immunity prominently features:", o: ["Only sweat", "Lymphocytes with memory", "Keratin alone", "Collagen only"], a: 1 },
          { q: "Lymph nodes filter primarily:", o: ["Bile", "Lymph fluid", "Vitreous only", "Pleural air"], a: 1 },
          { q: "The spleen monitors:", o: ["Only saliva", "Blood for immune surveillance", "Urine color", "Earwax pH"], a: 1 },
          { q: "Neutrophils classically lead early:", o: ["Photosynthesis", "Bacterial inflammation", "Nail polish drying", "Lens accommodation"], a: 1 },
          { q: "Vaccination aims to build:", o: ["Hair texture", "Immune memory without full disease", "Bone width only", "Tendon stiffness"], a: 1 },
        ],
      },
      {
        title: "سیستەمی بەرگری",
        blurb: "پاراستن، چاودێری، و بیرپەپەر لەبەرامبەر میکڕۆب و خانەی نەناسراو.",
        overview:
          "بەرگری لەدایکبووی خێرا دەست پێدەکات؛ لیمفۆسیتی فێربوون تایبەتمەندی و بیرپەپەر دەهێنێت.",
        why:
          "هاوسەنگی بەرگری تیشوە پارێز دەکات و هەناردەتیش کۆنتڕۆل دەکات.",
        items: [
          { n: "خانەی سپی خوێن", f: "نێتڕۆفیل، لیمفۆسیت و هاوکارەکان وەڵام دەدەنەوە.", s: "جیاکردنەوەی خوێن دەڵێت کام هێڵ چالاکترە." },
          { n: "گرێی لیمفی", f: "لەمف پاڵاوتن؛ کۆبوونەوەی خانەی بەرگری.", s: "گەورەبوون کاتێک لیمفۆسیت زۆر دەبن." },
          { n: "تال", f: "خوێن دەپاڵێوێت، پڵت کۆدەکاتەوە.", s: "پردی نێوان گەشتن و بەرگری." },
          { n: "شۆنەوە ئێسک", f: "جێی دروستبوونی زۆرینەی خانەی خوێن و بەرگری.", s: "تاکی سەرەتایی دابەش دەبن بۆ هێڵی جیاواز." },
          { n: "تایمۆس", f: "ڕاهێنانی T بۆ ناسینی مەترسی بە سەلامەتی.", s: "لە منداڵیدا چالاکتر، پاشان کەم دەبێتەوە." },
        ],
        quiz: [
          { q: "بەرگری فێربوون سەرەکی تێدایەتی:", o: ["هەراو تەنها", "لیمفۆسیت و بیرپەپەر", "کێراتین تەنها", "کۆلاگەن تەنها"], a: 1 },
          { q: "گرێی لیمفی سەرەکی:", o: ["ئافرە پاڵاوتن", "شلە لیمفی پاڵاوتن", "شلەی چاو تەنها", "هەوای سینگ"], a: 1 },
          { q: "تال خوێن بۆ:", o: ["تەنها خواش", "چاودێری بەرگری", "ڕەنگی میز", "پ ئەیچ بۆنی گوێ"], a: 1 },
          { q: "نێتڕۆفیل لە سەرەتای:", o: ["فۆتۆسینتێز", "ئاسێتمانی بەکتەریای", "وشیای نون", "چڕکردنەوەی لێنس"], a: 1 },
          { q: "وەکسین مەبەستی:", o: ["قژ", "بیرپەپەری بەرگری بەبێ نەخۆشی تەواو", "پانی ئێسک", "سختی تاندۆن"], a: 1 },
        ],
      }
    ),
  };

  var state = {
    lang: "en",
    quoteIndex: 0,
    factIndex: 0,
    mythIndex: 0,
    selectedId: null,
    quoteRotateTimer: null,
    quiz: null,
  };

  function loadBadges() {
    try {
      var raw = localStorage.getItem(STORAGE_BADGES);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function saveBadge(id) {
    var b = loadBadges();
    if (b.indexOf(id) === -1) {
      b.push(id);
      localStorage.setItem(STORAGE_BADGES, JSON.stringify(b));
    }
  }

  function hasBadge(id) {
    return loadBadges().indexOf(id) !== -1;
  }

  function t(key) {
    var L = UI[state.lang] || UI.en;
    return L[key] || UI.en[key] || key;
  }

  function applyI18nAttrs() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      el.textContent = t(k);
    });
    document.documentElement.lang = state.lang === "ku" ? "ckb" : "en";
    document.documentElement.dir = state.lang === "ku" ? "rtl" : "ltr";
    var btn = document.getElementById("langToggle");
    if (btn) btn.textContent = state.lang === "ku" ? UI.ku.langLabelKu : UI.en.langLabel;
  }

  function dataSys(id) {
    var pack = SYSTEM_DATA[id];
    if (!pack) return null;
    return state.lang === "ku" ? pack.ku : pack.en;
  }

  function renderBadges() {
    var row = document.getElementById("badgeRow");
    if (!row) return;
    row.innerHTML = "";
    var title = document.createElement("span");
    title.className = "badge-pill badge-pill--title";
    title.textContent = t("badgesTitle");
    row.appendChild(title);
    SYSTEM_ORDER.forEach(function (sid) {
      var bid = BADGE_IDS[sid];
      var labels = BADGE_LABELS[state.lang] || BADGE_LABELS.en;
      var unlocked = hasBadge(bid);
      var pill = document.createElement("span");
      pill.className =
        "badge-pill" + (unlocked ? " is-unlocked" : " is-locked");
      var ic = unlocked ? BADGE_ICONS[bid] || "◆" : "🔒";
      pill.innerHTML =
        '<span class="badge-pill__ic" aria-hidden="true">' +
        ic +
        "</span><span>" +
        esc(labels[bid] || bid) +
        "</span>";
      row.appendChild(pill);
    });
  }

  function renderSystemsGrid() {
    var grid = document.getElementById("systemsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    SYSTEM_ORDER.forEach(function (id) {
      var d = dataSys(id);
      if (!d) return;
      var card = document.createElement("article");
      card.className =
        "system-card accent-" + id + (state.selectedId === id ? " is-selected" : "");
      card.setAttribute("data-system", id);
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      var icon = SYSTEM_ICONS[id] || "◆";
      card.innerHTML =
        '<div class="system-card__top"><span class="system-card__icon" aria-hidden="true">' +
        icon +
        "</span><div><h2>" +
        esc(d.title) +
        "</h2><p>" +
        esc(d.blurb) +
        "</p></div></div>";
      card.addEventListener("click", function () {
        selectSystem(id);
      });
      card.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          selectSystem(id);
        }
      });
      grid.appendChild(card);
    });
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function selectSystem(id) {
    state.selectedId = id;
    var panel = document.getElementById("detailPanel");
    if (panel) {
      panel.classList.remove("is-focused", "is-revealing");
    }
    renderSystemsGrid();
    renderDetailPanel(id);
    var clicked = document.querySelector('.system-card[data-system="' + id + '"]');
    if (clicked) {
      clicked.classList.add("is-pressed");
      setTimeout(function () {
        clicked.classList.remove("is-pressed");
      }, 420);
    }
    if (panel) {
      panel.classList.add("is-focused");
      panel.classList.add("is-revealing");
      setTimeout(function () {
        panel.classList.remove("is-revealing");
      }, 520);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          panel.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      });
    }
  }

  function renderDetailPanel(id) {
    var host = document.getElementById("detailPanelInner");
    if (!host) return;
    var h = dataSys(id);
    if (!h) return;
    var bid = BADGE_IDS[id];
    var unlocked = hasBadge(bid);
    var labels = BADGE_LABELS[state.lang] || BADGE_LABELS.en;
    var tag =
      (TAGLINES[state.lang] && TAGLINES[state.lang][id]) ||
      (TAGLINES.en && TAGLINES.en[id]) ||
      "";

    host.classList.remove("is-reveal");
    void host.offsetWidth;
    host.classList.add("is-reveal");

    var html =
      '<div class="detail-root accent-' +
      id +
      '"><header class="detail-module__hero"><div class="detail-module__accent-bar" aria-hidden="true"></div><span class="detail-head__accent">' +
      esc(SYSTEM_ICONS[id] || "") +
      " · " +
      esc(t("bodyModule")) +
      '</span><h2 class="detail-module__title">' +
      esc(h.title) +
      '</h2><p class="detail-tagline">' +
      esc(tag) +
      "</p></header>";

    html +=
      '<div class="rewards-strip rewards-strip--inline"><span class="rewards-strip__label">' +
      esc(t("rewardsThisSystem")) +
      '</span><span class="badge-chip badge-chip--hero' +
      (unlocked ? " is-unlocked" : " is-locked") +
      '"><span class="badge-chip__ic" aria-hidden="true">' +
      (unlocked ? BADGE_ICONS[bid] || "✦" : "🔒") +
      "</span><span>" +
      esc(labels[bid] || bid) +
      "</span></span></div>";

    html +=
      '<div class="detail-section"><h3 class="detail-section__title">' +
      esc(t("overview")) +
      "</h3><p class=\"detail-section__body\">" +
      esc(h.overview) +
      "</p></div>";
    html +=
      '<div class="detail-section"><h3 class="detail-section__title">' +
      esc(t("whyMatters")) +
      "</h3><p class=\"detail-section__body\">" +
      esc(h.why) +
      "</p></div>";
    html +=
      '<div class="detail-section detail-section--parts"><h3 class="detail-section__title">' +
      esc(t("keyParts")) +
      '</h3><div class="item-grid">';
    h.items.forEach(function (it) {
      html +=
        '<article class="item-card"><h4>' +
        esc(it.n) +
        "</h4><p class=\"label\">" +
        esc(t("function")) +
        "</p><p class=\"value\">" +
        esc(it.f) +
        "</p><p class=\"label\">" +
        esc(t("specialFact")) +
        "</p><p class=\"value\">" +
        esc(it.s) +
        "</p></article>";
    });
    html += "</div></div>";

    if (id === "endocrine" && h.hormones) {
      html +=
        '<div class="detail-section detail-section--hormones"><h3 class="detail-section__title">' +
        esc(t("hormones")) +
        '</h3><div class="item-grid">';
      h.hormones.forEach(function (horm) {
        html +=
          '<article class="item-card"><h4>' +
          esc(horm.n) +
          "</h4><p class=\"label\">" +
          esc(t("source")) +
          "</p><p class=\"value\">" +
          esc(horm.src) +
          "</p><p class=\"label\">" +
          esc(t("function")) +
          "</p><p class=\"value\">" +
          esc(horm.f) +
          "</p><p class=\"label\">" +
          esc(t("significance")) +
          "</p><p class=\"value\">" +
          esc(horm.m) +
          "</p></article>";
      });
      html += "</div></div>";
    }

    html +=
      '<div class="detail-section detail-section--quiz"><h3 class="detail-section__title">' +
      esc(t("startQuiz")) +
      "</h3><p class=\"detail-section__body muted\">" +
      esc(
        state.lang === "ku"
          ? "وەڵام بدەرەوە و نیشانە بکەرەوە"
          : "Answer all five — score at least " +
              PASS_SCORE +
              " to earn your badge."
      ) +
      '</p><div class="quiz-cta"><button type="button" class="btn-primary btn-primary--large" id="openQuiz">' +
      esc(t("startQuiz")) +
      "</button></div></div></div>";

    host.innerHTML = html;
    var btn = document.getElementById("openQuiz");
    if (btn) {
      btn.addEventListener("click", function () {
        startQuiz(id);
      });
    }
  }

  function startQuiz(systemId) {
    var pack = SYSTEM_DATA[systemId];
    if (!pack) return;
    var d = state.lang === "ku" ? pack.ku : pack.en;
    state.quiz = {
      systemId: systemId,
      questions: d.quiz.slice(),
      index: 0,
      score: 0,
      answered: false,
      choice: null,
    };
    var modal = document.getElementById("quizModal");
    if (modal) modal.classList.remove("hidden");
    renderQuizQuestion();
  }

  function closeQuiz() {
    var modal = document.getElementById("quizModal");
    if (modal) modal.classList.add("hidden");
    state.quiz = null;
  }

  function pulseQuizBody() {
    var body = document.getElementById("quizBody");
    if (!body) return;
    body.classList.remove("quiz-body--step");
    void body.offsetWidth;
    body.classList.add("quiz-body--step");
  }

  function renderQuizQuestion() {
    var qz = state.quiz;
    if (!qz) return;
    var d = dataSys(qz.systemId);
    document.getElementById("quizTitle").textContent = d.title + " — " + t("startQuiz");
    var n = qz.questions.length;
    var i = qz.index;
    var pct = n ? ((i + (qz.answered ? 1 : 0)) / n) * 100 : 0;
    document.getElementById("quizProgressFill").style.width = pct + "%";
    document.getElementById("quizCounter").textContent =
      t("quizProgress") + " " + (i + 1) + " " + t("of") + " " + n;

    var body = document.getElementById("quizBody");
    var item = qz.questions[i];
    var html = '<p class="quiz-q">' + esc(item.q) + "</p>";
    item.o.forEach(function (opt, idx) {
      var cls = "quiz-option";
      if (qz.answered && idx === item.a) cls += " is-correct";
      if (qz.answered && qz.choice === idx && idx !== item.a) cls += " is-wrong";
      if (!qz.answered && qz.choice === idx) cls += " is-selected";
      html +=
        '<button type="button" class="' +
        cls +
        '" data-idx="' +
        idx +
        "\" " +
        (qz.answered ? "disabled" : "") +
        ">" +
        esc(opt) +
        "</button>";
    });
    html += '<div class="quiz-nav">';
    if (qz.answered) {
      var last = i >= n - 1;
      html +=
        '<button type="button" class="btn-primary" id="quizNext">' +
        esc(last ? t("finish") : t("next")) +
        "</button>";
    }
    html += "</div>";
    body.innerHTML = html;
    pulseQuizBody();
    body.querySelectorAll(".quiz-option").forEach(function (btn) {
      if (qz.answered) return;
      btn.addEventListener("click", function () {
        var idx = parseInt(btn.getAttribute("data-idx"), 10);
        qz.choice = idx;
        qz.answered = true;
        if (idx === item.a) qz.score++;
        renderQuizQuestion();
      });
    });
    var nextBtn = document.getElementById("quizNext");
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (i >= n - 1) {
          finishQuiz();
        } else {
          qz.index++;
          qz.answered = false;
          qz.choice = null;
          renderQuizQuestion();
        }
      });
    }
  }

  function finishQuiz() {
    var qz = state.quiz;
    if (!qz) return;
    var n = qz.questions.length;
    var s = qz.score;
    var pct = n ? Math.round((s / n) * 100) : 0;
    var bid = BADGE_IDS[qz.systemId];
    var passed = s >= PASS_SCORE;
    if (passed) saveBadge(bid);
    renderBadges();
    var feedback =
      pct >= 80
        ? t("quizFeedbackHigh")
        : pct >= 50
          ? t("quizFeedbackMid")
          : t("quizFeedbackLow");
    var badgeMsg = passed
      ? t("quizPassSuccess") + " " + (BADGE_LABELS[state.lang][bid] || bid)
      : t("quizRetryForBadge");
    document.getElementById("quizBody").innerHTML =
      '<div class="quiz-result"><h3>' +
      esc(t("scoreLine")) +
      " " +
      s +
      "/" +
      n +
      "</h3><p>" +
      esc(feedback) +
      '</p><p style="margin-top:.75rem;font-weight:700;color:' +
      (passed ? "#0f766e" : "#b45309") +
      '">' +
      esc(badgeMsg) +
      '</p><div class="quiz-nav"><button type="button" class="btn-primary" id="quizDone">' +
      esc(t("close")) +
      "</button></div></div>";
    pulseQuizBody();
    document.getElementById("quizProgressFill").style.width = "100%";
    document.getElementById("quizCounter").textContent = "";
    document.getElementById("quizTitle").textContent = dataSys(qz.systemId).title;
    document.getElementById("quizDone").addEventListener("click", function () {
      closeQuiz();
      if (state.selectedId) {
        renderDetailPanel(state.selectedId);
        renderBadges();
      }
    });
    if (passed) fireConfetti();
  }

  function fireConfetti() {
    var c = document.getElementById("confetti");
    if (!c) return;
    var ctx = c.getContext("2d");
    var w = (c.width = window.innerWidth);
    var h = (c.height = window.innerHeight);
    var pieces = [];
    for (var i = 0; i < 120; i++) {
      pieces.push({
        x: Math.random() * w,
        y: Math.random() * -h,
        r: 4 + Math.random() * 6,
        vy: 2 + Math.random() * 4,
        vx: -2 + Math.random() * 4,
        rot: Math.random() * 6.28,
        vr: -0.1 + Math.random() * 0.2,
        color: ["#0ea5e9", "#6366f1", "#14b8a6", "#1e3a5f", "#fbbf24"][(Math.random() * 5) | 0],
      });
    }
    var start = Date.now();
    function frame() {
      var elapsed = Date.now() - start;
      ctx.clearRect(0, 0, w, h);
      pieces.forEach(function (p) {
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
        ctx.restore();
      });
      if (elapsed < 2200) requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, w, h);
    }
    requestAnimationFrame(frame);
  }

  function showQuote() {
    var list = QUOTES[state.lang] || QUOTES.en;
    var el = document.getElementById("quoteText");
    if (!el) return;
    el.classList.remove("hero-quote__text--in");
    el.style.opacity = "0";
    el.style.transform = "translateY(6px)";
    setTimeout(function () {
      el.textContent = list[state.quoteIndex % list.length];
      el.style.transition = "opacity 0.45s ease, transform 0.45s cubic-bezier(0.34, 1.05, 0.64, 1)";
      el.style.opacity = "1";
      el.style.transform = "none";
      el.classList.add("hero-quote__text--in");
    }, 160);
  }

  function showFact() {
    var list = FACTS[state.lang] || FACTS.en;
    var el = document.getElementById("factCard");
    if (!el) return;
    el.classList.remove("is-visible");
    void el.offsetWidth;
    el.textContent = list[state.factIndex % list.length];
    el.classList.add("is-visible");
  }

  function showMyth() {
    var list = MYTHS[state.lang] || MYTHS.en;
    var el = document.getElementById("mythCard");
    if (!el) return;
    var m = list[state.mythIndex % list.length];
    el.classList.remove("is-visible");
    void el.offsetWidth;
    el.innerHTML =
      '<div class="myth-card__block myth-card__block--myth"><span class="myth-pill myth-pill--myth">' +
      (state.lang === "ku" ? "ڕوایەت" : "Myth") +
      '</span><p class="myth-card__text">' +
      esc(m.myth) +
      '</p></div><div class="myth-card__block myth-card__block--fact"><span class="myth-pill myth-pill--fact">' +
      (state.lang === "ku" ? "ڕاستی" : "Fact") +
      '</span><p class="myth-card__text">' +
      esc(m.fact) +
      "</p></div>";
    el.classList.add("is-visible");
  }

  function renderLearn() {
    var stack = document.getElementById("learnStack");
    if (!stack) return;
    var L = LEARN[state.lang] || LEARN.en;
    stack.innerHTML = "";
    L.forEach(function (block, idx) {
      var acc = document.createElement("div");
      acc.className = "learn-acc";
      acc.innerHTML =
        '<button type="button" data-idx="' +
        idx +
        '"><span>' +
        esc(block.title) +
        '</span><span aria-hidden="true">+</span></button><div class="acc-panel"><p>' +
        esc(block.body) +
        "</p></div>";
      acc.querySelector("button").addEventListener("click", function () {
        acc.classList.toggle("is-open");
      });
      stack.appendChild(acc);
    });
  }

  function bindVisual() {
    document.querySelectorAll(".body-zone").forEach(function (z) {
      z.addEventListener("mouseenter", function () {
        z.classList.add("is-hot");
      });
      z.addEventListener("mouseleave", function () {
        z.classList.remove("is-hot");
      });
      z.addEventListener("click", function () {
        var zone = z.getAttribute("data-zone");
        var pack = VISUAL[state.lang][zone];
        var aside = document.getElementById("visualAside");
        if (!aside || !pack) return;
        aside.innerHTML =
          "<h3>" +
          esc(pack.title) +
          "</h3><ul>" +
          pack.lines.map(function (ln) {
            return "<li>" + esc(ln) + "</li>";
          }).join("") +
          "</ul>";
      });
    });
  }

  function switchTab(name) {
    document.querySelectorAll(".tab").forEach(function (tab) {
      var on = tab.getAttribute("data-tab") === name;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
    });
    ["systems", "visual", "learn", "discover"].forEach(function (id) {
      var p = document.getElementById("panel-" + id);
      if (!p) return;
      var vis = id === name;
      p.hidden = !vis;
      p.classList.toggle("is-visible", vis);
      if (vis) p.removeAttribute("hidden");
      else p.setAttribute("hidden", "");
    });
  }

  function init() {
    try {
      var stored = localStorage.getItem(STORAGE_LANG);
      if (stored === "en" || stored === "ku") state.lang = stored;
    } catch (e) {}

    applyI18nAttrs();
    showQuote();
    renderBadges();
    renderSystemsGrid();
    renderLearn();
    showFact();
    showMyth();
    bindVisual();

    document.getElementById("langToggle").addEventListener("click", function () {
      state.lang = state.lang === "en" ? "ku" : "en";
      try {
        localStorage.setItem(STORAGE_LANG, state.lang);
      } catch (e) {}
      applyI18nAttrs();
      showQuote();
      renderBadges();
      renderSystemsGrid();
      renderLearn();
      showFact();
      showMyth();
      if (state.selectedId) renderDetailPanel(state.selectedId);
      var activeTab = document.querySelector(".tab.is-active");
      if (activeTab) switchTab(activeTab.getAttribute("data-tab"));
    });

    document.getElementById("quoteBtn").addEventListener("click", function () {
      state.quoteIndex++;
      showQuote();
    });
    if (state.quoteRotateTimer) clearInterval(state.quoteRotateTimer);
    state.quoteRotateTimer = setInterval(function () {
      if (document.hidden) return;
      state.quoteIndex++;
      showQuote();
    }, 38000);

    document.querySelectorAll(".tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        switchTab(tab.getAttribute("data-tab"));
      });
    });

    document.getElementById("quizClose").addEventListener("click", closeQuiz);

    document.getElementById("nextFact").addEventListener("click", function () {
      state.factIndex++;
      showFact();
    });
    document.getElementById("nextMyth").addEventListener("click", function () {
      state.mythIndex++;
      showMyth();
    });

    window.addEventListener("resize", function () {
      var c = document.getElementById("confetti");
      if (c) {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
      }
    });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
