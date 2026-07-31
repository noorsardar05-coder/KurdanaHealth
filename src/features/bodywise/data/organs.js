/**
 * BodyWise organ lessons — bilingual EN + Central Kurdish (Sorani).
 * Short, accurate, citizen-friendly. No medical jargon walls.
 */

export const ORGANS = [
  {
    id: "heart",
    icon: "❤️",
    color: "#ff6b8a",
    glow: "rgba(255,107,138,0.35)",
    name: { en: "Heart", ku: "دڵ" },
    subtitle: { en: "Your tireless pump", ku: "پەمپی بێوەستانی تۆ" },
    whatIs: {
      en: "Your heart is a strong muscle about the size of your fist. It sits near the center of your chest and tilts slightly left.",
      ku: "دڵت ماسولکەیەکی بەهێزە قەبارەی مشتت. لە ناوەڕاستی سنگتدانیزیک و کەمێک بە لای چەپ دەخەمڵێت.",
    },
    whatDoes: {
      en: "It pumps blood so oxygen and nutrients reach every cell. Without that rhythm, nothing else in your body works.",
      ku: "خوێن دەپەمپێت تا ئۆکسیجین و خۆراک بگاتە هەموو خانەیەک. بەبێ ئەم ڕیتمە، هیچ شتێکی تری جەستەت کار ناکات.",
    },
    amazingFacts: [
      {
        en: "Your heart beats about 100,000 times every day.",
        ku: "دڵت ڕۆژانە نزیکەی ١٠٠٬٠٠٠ جار لێدەدات.",
      },
      {
        en: "In one year, that is over 35 million beats.",
        ku: "لە یەک ساڵدا، ئەوە زیاتر لە ٣٥ ملیۆن لێدانە.",
      },
      {
        en: "Your heart creates enough pressure to push blood through thousands of kilometers of vessels.",
        ku: "دڵت ئەو پەستانە دروست دەکات کە خوێن لە هەزاران کیلۆمەتر لوولەدا بجوڵێنێت.",
      },
    ],
    myth: {
      myth: {
        en: "The heart is completely on the left side of the chest.",
        ku: "دڵ تەواو لە لای چەپی سنگدایە.",
      },
      fact: {
        en: "It sits near the center and only tilts slightly to the left.",
        ku: "لە نزیک ناوەڕاستدایە و تەنها کەمێک بە لای چەپ دەخەمڵێت.",
      },
    },
    didYouKnow: [
      { en: "A child's heart is about the size of their fist — and so is an adult's.", ku: "دڵی منداڵ قەبارەی مشتییەتی — و دڵی پێگەیشتووش هەروەها." },
      { en: "The sound of a heartbeat is valves closing, not the muscle \"hitting\".", ku: "دەنگی لێدانی دڵ داخستنی دەرچەکانە، نەک لێدانی ماسولکە." },
      { en: "Your heart rests between beats — tiny pauses that add up to hours each day.", ku: "دڵت لە نێوان لێدانەکاندا پشوو دەدات — کە ڕۆژانە دەبێتە چەند کاتژمێر." },
      { en: "Emotional stress can raise your heart rate within seconds.", ku: "ستڕێسی هەستەکی دەتوانێت لە چەند چرکەیەکدا لێدانی دڵت بەرز بکاتەوە." },
      { en: "Laughing can briefly improve blood vessel function.", ku: "پێکەنین دەتوانێت بۆ ماوەیەکی کورت کارکردنی لوولەی خوێن باشتر بکات." },
      { en: "The left side of the heart pumps blood to the whole body; the right side sends it to the lungs.", ku: "لای چەپی دڵ خوێن بۆ هەموو جەستە دەنێرێت؛ لای ڕاست بۆ سیهەکان دەینێرێت." },
      { en: "Athletes often have a slower resting heart rate because their hearts pump more efficiently.", ku: "وەرزشوانان زۆرجار لێدانی دڵی پشوودانیان خاوەترە چونکە دڵیان کاراترە." },
    ],
    habits: [
      { icon: "🚶", en: "Walk for 30 minutes most days.", ku: "زۆربەی ڕۆژەکان ٣٠ خولەک بڕۆ." },
      { icon: "😴", en: "Aim for 7–9 hours of sleep.", ku: "هەوڵ بدە ٧–٩ کاتژمێر بخەویت." },
      { icon: "🚭", en: "Avoid smoking and secondhand smoke.", ku: "دوور بکەوە لە جگەرە و دووکەڵی کەسانی تر." },
      { icon: "🥦", en: "Eat more vegetables and less ultra-processed food.", ku: "زیاتر سەوزە بخۆ و خۆراکێکی زۆر پرۆسێسکراو کەمتر." },
    ],
    quiz: [
      {
        q: { en: "How many chambers does the heart have?", ku: "دڵ چەند ژووری هەیە؟" },
        options: [
          { en: "2", ku: "٢" },
          { en: "3", ku: "٣" },
          { en: "4", ku: "٤" },
          { en: "6", ku: "٦" },
        ],
        answer: 2,
      },
      {
        q: { en: "Where does the heart mainly sit?", ku: "دڵ سەرەکی لە کوێدایە؟" },
        options: [
          { en: "Far left side only", ku: "تەنها لای چەپی دوور" },
          { en: "Near the center of the chest", ku: "نزیک ناوەڕاستی سنگ" },
          { en: "In the stomach", ku: "لە ناو سکدا" },
          { en: "Behind the brain", ku: "لە پشت مێشک" },
        ],
        answer: 1,
      },
      {
        q: { en: "About how many times does a heart beat per day?", ku: "دڵ ڕۆژانە نزیکەی چەند جار لێدەدات؟" },
        options: [
          { en: "1,000", ku: "١٬٠٠٠" },
          { en: "10,000", ku: "١٠٬٠٠٠" },
          { en: "100,000", ku: "١٠٠٬٠٠٠" },
          { en: "1 million", ku: "١ ملیۆن" },
        ],
        answer: 2,
      },
      {
        q: { en: "What does the heart mainly pump?", ku: "دڵ سەرەکی چی دەپەمپێت؟" },
        options: [
          { en: "Air only", ku: "تەنها هەوا" },
          { en: "Blood", ku: "خوێن" },
          { en: "Water from food", ku: "ئاو لە خۆراک" },
          { en: "Bone marrow", ku: "مۆخی ئێسک" },
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "brain",
    icon: "🧠",
    color: "#c084fc",
    glow: "rgba(192,132,252,0.35)",
    name: { en: "Brain", ku: "مێشک" },
    subtitle: { en: "Your command center", ku: "ناوەندی فەرماندەری تۆ" },
    whatIs: {
      en: "Your brain is soft tissue protected by the skull. It weighs about 1.3–1.4 kg in adults.",
      ku: "مێشکت شانەیەکی نەرمە کە کەللەسەر دەیپارێزێت. لە پێگەیشتوواندا نزیکەی ١٫٣–١٫٤ کیلۆیە.",
    },
    whatDoes: {
      en: "It thinks, remembers, feels emotions, and controls movement, breathing, and countless automatic jobs.",
      ku: "بیر دەکاتەوە، بیرەوەری هەیە، هەست دەکات، و جووڵە و هەناسە و کارە خۆکارەکان کۆنتڕۆڵ دەکات.",
    },
    amazingFacts: [
      { en: "Your brain uses around 20% of your body's energy.", ku: "مێشکت نزیکەی ٢٠٪ی وزەی جەستەت بەکاردەهێنێت." },
      { en: "It contains billions of nerve cells that talk through tiny electrical signals.", ku: "ملیارەها خانەی دەماری تێدایە کە بە سیگناڵی کارەبایی قسە دەکەن." },
      { en: "Different regions specialize — vision, language, balance, memory, and more.", ku: "ناوچە جیاوازەکان تایبەتمەندن — بینین، زمان، هاوسەنگی، بیرەوەری و زیاتر." },
    ],
    myth: {
      myth: { en: "Humans only use 10% of their brain.", ku: "مرۆڤ تەنها ١٠٪ی مێشکی بەکاردەهێنێت." },
      fact: { en: "Almost all brain regions have known jobs, and different parts activate for different tasks.", ku: "نزیکەی هەموو ناوچەکانی مێشک کارێکیان هەیە، و بەشە جیاوازەکان بۆ کارە جیاوازەکان چالاک دەبن." },
    },
    didYouKnow: [
      { en: "Your brain is about 75% water.", ku: "مێشکت نزیکەی ٧٥٪ ئاوە." },
      { en: "Sleep helps the brain clear waste and lock in memories.", ku: "خەو یارمەتی مێشک دەدات پاشماوە پاک بکاتەوە و بیرەوەری جێگیر بکات." },
      { en: "Learning a skill can literally reshape connections between brain cells.", ku: "فێربوونی کارامەیی دەتوانێت پەیوەندیی نێوان خانەکانی مێشک بگۆڕێت." },
      { en: "The brain has no pain receptors — headaches come from surrounding tissues.", ku: "مێشک هەستەوەری ئازاری نییە — سەرئێشە لە شانە دەوروبەرەوە دێت." },
      { en: "Reading and social connection both exercise your brain in healthy ways.", ku: "خوێندنەوە و پەیوەندی کۆمەڵایەتی هەردووکیان مێشکت بە شێوەیەکی تەندروست ڕاهێنان دەکەن." },
      { en: "Your brain keeps working even while you dream.", ku: "مێشکت تەنانەت لە کاتی خەونیشدا بەردەوام کار دەکات." },
    ],
    habits: [
      { icon: "😴", en: "Protect sleep — your brain needs it to reset.", ku: "خەو بپارێزە — مێشکت پێویستی پێیە بۆ نوێبوونەوە." },
      { icon: "📚", en: "Learn something new regularly.", ku: "بە بەردەوامی شتێکی نوێ فێر ببە." },
      { icon: "🚶", en: "Move daily — exercise supports brain blood flow.", ku: "ڕۆژانە بجوڵێ — وەرزش یارمەتی خوێنڕۆی مێشک دەدات." },
      { icon: "📱", en: "Take screen breaks to reduce mental fatigue.", ku: "پشووی شاشە وەربگرە بۆ کەمکردنەوەی ماندوویی مێشک." },
    ],
    quiz: [
      {
        q: { en: "About what share of body energy does the brain use?", ku: "مێشک نزیکەی چەند لەسەدی وزەی جەستە بەکاردەهێنێت؟" },
        options: [
          { en: "5%", ku: "٥٪" },
          { en: "10%", ku: "١٠٪" },
          { en: "20%", ku: "٢٠٪" },
          { en: "50%", ku: "٥٠٪" },
        ],
        answer: 2,
      },
      {
        q: { en: "Is the \"10% brain\" idea true?", ku: "ئایا بیرۆکەی «١٠٪ی مێشک» ڕاستە؟" },
        options: [
          { en: "Yes, proven", ku: "بەڵێ، سەلمێنراوە" },
          { en: "No, it is a myth", ku: "نەخێر، ئەفسانەیە" },
          { en: "Only for children", ku: "تەنها بۆ منداڵان" },
          { en: "Only while sleeping", ku: "تەنها لە خەودا" },
        ],
        answer: 1,
      },
      {
        q: { en: "What protects the brain?", ku: "چی مێشک دەپارێزێت؟" },
        options: [
          { en: "The rib cage only", ku: "تەنها قەفەسی سنگ" },
          { en: "The skull", ku: "کەللەسەر" },
          { en: "The liver", ku: "جگەر" },
          { en: "Tooth enamel", ku: "مینای ددان" },
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "lungs",
    icon: "🫁",
    color: "#5eead4",
    glow: "rgba(94,234,212,0.35)",
    name: { en: "Lungs", ku: "سیهەکان" },
    subtitle: { en: "Your air exchange team", ku: "تیمی ئاڵوگۆڕی هەوای تۆ" },
    whatIs: {
      en: "Your lungs are two spongy organs in the chest. The left lung is a bit smaller to leave room for the heart.",
      ku: "سیهەکانت دوو ئەندامی نەرمن لە سنگدا. سیەی چەپ کەمێک بچووکترینە بۆ ئەوەی شوێن بۆ دڵ بمێنێتەوە.",
    },
    whatDoes: {
      en: "They take in oxygen and remove carbon dioxide when you breathe — a swap your cells need every moment.",
      ku: "ئۆکسیجین وەردەگرن و دووەم ئۆکسیدی کاربۆن دەردەکەن کاتێک هەناسە دەدەیت — ئاڵوگۆڕێک کە خانەکانت هەمیشە پێویستیان پێیە.",
    },
    amazingFacts: [
      { en: "The left lung is smaller because your heart needs space.", ku: "سیەی چەپ بچووکترینە چونکە دڵت پێویستی بە شوێن هەیە." },
      { en: "You take roughly 20,000 breaths in a typical day.", ku: "لە ڕۆژێکی ئاساییدا نزیکەی ٢٠٬٠٠٠ هەناسە دەدەیت." },
      { en: "Tiny air sacs called alveoli give lungs a huge surface for gas exchange.", ku: "کیسەیە هەوای وردەکان ڕووبەرێکی گەورە بۆ ئاڵوگۆڕی گاز دەدەن بە سیهەکان." },
    ],
    myth: {
      myth: { en: "Bigger lungs always mean healthier lungs.", ku: "سیەی گەورەتر هەمیشە واتە سیەی تەندروستتر." },
      fact: { en: "Lung health depends more on how well they work than on size alone.", ku: "تەندروستی سیهە زیاتر پەیوەستە بە چۆنیەتی کارکردنیانەوە نەک تەنها قەبارە." },
    },
    didYouKnow: [
      { en: "Cold air can feel harsh because airways warm and humidify each breath.", ku: "هەوای سارد دەتوانێت ناخۆش بێت چونکە ڕێڕەوەکان هەناسە گەرم و شێدار دەکەن." },
      { en: "Yawning may help regulate brain temperature and alertness — science is still exploring it.", ku: "خوڕینەوە لەوانەیە یارمەتی ڕێکخستنی پلەی گەرمی و وریایی مێشک بدات — زانست هێشتا لێی دەکۆڵێتەوە." },
      { en: "Smoke damages the tiny hairs that clean your airways.", ku: "دووکەڵ ئەو مووە وردانە زیان پێدەگەیەنێت کە ڕێڕەوەکانت پاک دەکەنەوە." },
      { en: "Deep calm breathing can help your nervous system settle.", ku: "هەناسەی قووڵ و ئارام دەتوانێت یارمەتی ئارامبوونەوەی سیستەمی دەماری بدات." },
      { en: "Your lungs are not muscles — the diaphragm and chest muscles do the pumping work.", ku: "سیهەکان ماسولکە نین — دیافراگم و ماسولکەکانی سنگ کارەکە دەکەن." },
      { en: "At rest, you usually breathe without thinking — your brain handles it automatically.", ku: "لە پشوودا، بەبێ بیرکردنەوە هەناسە دەدەیت — مێشکت خۆکارانە ئەنجامی دەدات." },
    ],
    habits: [
      { icon: "🚭", en: "Do not smoke — and avoid smoky rooms.", ku: "جگەرە مەکێشە — و دوور بکەوە لە ژووری دووکەڵاوی." },
      { icon: "🏃", en: "Do activity that gently raises your breathing rate.", ku: "چالاکی بکە کە بە نەرمی هەناسەدانت خێرا بکات." },
      { icon: "🪟", en: "Air out rooms when outdoor air is cleaner.", ku: "کاتێک هەوای دەرەوە پاکترە، ژوورەکان هەوا بدە." },
      { icon: "😷", en: "Protect lungs from heavy dust and pollution when you can.", ku: "کاتێک دەتوانیت، سیهەکان لە تۆز و پیسبوونی قورس بپارێزە." },
    ],
    quiz: [
      {
        q: { en: "Why is the left lung smaller?", ku: "بۆچی سیەی چەپ بچووکترینە؟" },
        options: [
          { en: "It is unused", ku: "بەکارناهێنرێت" },
          { en: "To leave space for the heart", ku: "بۆ ئەوەی شوێن بۆ دڵ بمێنێتەوە" },
          { en: "Because we sleep on the left", ku: "چونکە لەسەر لای چەپ دەخەوین" },
          { en: "It filters less air", ku: "هەوای کەمتر فلتەر دەکات" },
        ],
        answer: 1,
      },
      {
        q: { en: "What gas do lungs mainly take in?", ku: "سیهەکان سەرەکی کام گاز وەردەگرن؟" },
        options: [
          { en: "Nitrogen only", ku: "تەنها نایترۆجین" },
          { en: "Oxygen", ku: "ئۆکسیجین" },
          { en: "Helium", ku: "هێلیۆم" },
          { en: "Carbon monoxide", ku: "یەکەم ئۆکسیدی کاربۆن" },
        ],
        answer: 1,
      },
      {
        q: { en: "Bigger lungs always mean healthier lungs — true or false?", ku: "سیەی گەورەتر هەمیشە تەندروستترە — ڕاست یان هەڵە؟" },
        options: [
          { en: "True", ku: "ڕاست" },
          { en: "False", ku: "هەڵە" },
          { en: "Only in athletes", ku: "تەنها لە وەرزشوانان" },
          { en: "Only in children", ku: "تەنها لە منداڵان" },
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "bones",
    icon: "🦴",
    color: "#fcd34d",
    glow: "rgba(252,211,77,0.3)",
    name: { en: "Bones", ku: "ئێسکەکان" },
    subtitle: { en: "Your living framework", ku: "چوارچێوەی زیندووی تۆ" },
    whatIs: {
      en: "Bones are living tissue that form your skeleton. They grow, repair, and store minerals like calcium.",
      ku: "ئێسکەکان شانەی زیندوون کە ئێسکبەندی تۆ پێکدەهێنن. گەشە دەکەن، چاک دەبنەوە، و کانزا وەک کالسیۆم پاشەکەوت دەکەن.",
    },
    whatDoes: {
      en: "They support your shape, protect organs, help you move with muscles, and make blood cells in marrow.",
      ku: "شێوەت دەگرن، ئەندامەکان دەپارێزن، لەگەڵ ماسولکە یارمەتی جووڵە دەدەن، و لە مۆخدا خانەی خوێن دروست دەکەن.",
    },
    amazingFacts: [
      { en: "Babies are born with more bones than adults — some fuse as we grow.", ku: "منداڵان بە ئێسکی زیاتر لە پێگەیشتووان لەدایک دەبن — هەندێکیان لە گەشەدا یەکدەگرن." },
      { en: "Bone is stronger than concrete by weight.", ku: "ئێسک بەپێی کێش لە کۆنکرێت بەهێزترە." },
      { en: "Your skeleton completely renews itself over years.", ku: "ئێسکبەندت لە ماوەی چەند ساڵدا خۆی نوێ دەکاتەوە." },
    ],
    myth: {
      myth: { en: "Bones are dry and dead like sticks.", ku: "ئێسکەکان وشک و مردوون وەک دار." },
      fact: { en: "Healthy bones are living organs with blood supply and constant rebuilding.", ku: "ئێسکی تەندروست ئەندامی زیندوون کە خوێنیان هەیە و بەردەوام نوێ دەبنەوە." },
    },
    didYouKnow: [
      { en: "Weight-bearing activity helps keep bones strong.", ku: "چالاکی کێش لەسەر ئێسک یارمەتی بەهێزی ئێسک دەدات." },
      { en: "Vitamin D helps your body use calcium for bones.", ku: "ڤیتامین دی یارمەتی جەستەت دەدات کالسیۆم بۆ ئێسک بەکاربهێنێت." },
      { en: "The thigh bone (femur) is the longest bone in the body.", ku: "ئێسکی ڕان درێژترین ئێسکی جەستەیە." },
      { en: "Broken bones can heal by forming new bone tissue.", ku: "ئێسکی شکاو دەتوانێت بە دروستکردنی شانەی نوێ چاک ببێتەوە." },
      { en: "Your spine's curves help absorb shock when you walk.", ku: "چەمانەوەکانی بڕبڕە یارمەتی هەڵمژینی شۆک دەدەن کاتێک دەڕۆیت." },
      { en: "Teeth are not bones — they have a different structure.", ku: "ددان ئێسک نییە — پێکهاتەی جیاوازی هەیە." },
    ],
    habits: [
      { icon: "🥛", en: "Get calcium from food (dairy or fortified alternatives).", ku: "کالسیۆم لە خۆراک وەربگرە (شیر یان جێگرەوەی دەوڵەمەندکراو)." },
      { icon: "🌞", en: "Get safe sunlight or ask about vitamin D needs.", ku: "خۆرگرتنی پارێزراو یان پرسیار لە پێویستی ڤیتامین دی بکە." },
      { icon: "🏋️", en: "Do strength or impact-friendly activity if safe for you.", ku: "ئەگەر بۆت گونجاوە، چالاکی هێز یان کاریگەری سووک بکە." },
      { icon: "🚭", en: "Avoid smoking — it weakens bone health over time.", ku: "جگەرە مەکێشە — بە تێپەڕبوونی کات ئێسک لاواز دەکات." },
    ],
    quiz: [
      {
        q: { en: "Do babies have more bones than adults?", ku: "ئایا منداڵان ئێسکی زیاتریان هەیە لە پێگەیشتووان؟" },
        options: [
          { en: "Yes", ku: "بەڵێ" },
          { en: "No", ku: "نەخێر" },
          { en: "Only girls", ku: "تەنها کچان" },
          { en: "Only boys", ku: "تەنها کوڕان" },
        ],
        answer: 0,
      },
      {
        q: { en: "Where are many blood cells made?", ku: "زۆر لە خانەکانی خوێن لە کوێ دروست دەبن؟" },
        options: [
          { en: "Hair", ku: "قژ" },
          { en: "Bone marrow", ku: "مۆخی ئێسک" },
          { en: "Nails", ku: "نینۆک" },
          { en: "Earwax", ku: "مۆمی گوێ" },
        ],
        answer: 1,
      },
      {
        q: { en: "Are bones dead tissue?", ku: "ئایا ئێسک شانەی مردووە؟" },
        options: [
          { en: "Yes", ku: "بەڵێ" },
          { en: "No — they are living", ku: "نەخێر — زیندوون" },
          { en: "Only after age 40", ku: "تەنها دوای تەمەنی ٤٠" },
          { en: "Only in the skull", ku: "تەنها لە کەللەسەر" },
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "blood",
    icon: "🩸",
    color: "#f87171",
    glow: "rgba(248,113,113,0.35)",
    name: { en: "Blood", ku: "خوێن" },
    subtitle: { en: "Your delivery network", ku: "تۆڕی گەیاندنی تۆ" },
    whatIs: {
      en: "Blood is a liquid tissue made of plasma, red cells, white cells, and platelets.",
      ku: "خوێن شانەیەکی شلە لە پلازما، خانەی سوور، خانەی سپی و تەزووکەکان پێکدێت.",
    },
    whatDoes: {
      en: "It carries oxygen, nutrients, hormones, and immune cells — and helps remove waste.",
      ku: "ئۆکسیجین، خۆراک، هۆرمۆن و خانەی بەرگری دەگوازێتەوە — و یارمەتی لابردنی پاشماوە دەدات.",
    },
    amazingFacts: [
      { en: "An adult has about 4.5–5.5 liters of blood.", ku: "پێگەیشتووێک نزیکەی ٤٫٥–٥٫٥ لیتر خوێنی هەیە." },
      { en: "Red blood cells live about 120 days before being replaced.", ku: "خانە سوورەکانی خوێن نزیکەی ١٢٠ ڕۆژ دەژین پێش ئەوەی جێگەیان بگرێتەوە." },
      { en: "A drop of blood can contain millions of red cells.", ku: "دڵۆپێک خوێن دەتوانێت ملیۆنەها خانەی سووری تێدا بێت." },
    ],
    myth: {
      myth: { en: "Blood inside veins is blue.", ku: "خوێنی ناو خوێنبەرەکان شینە." },
      fact: { en: "Blood is always shades of red. Veins can look bluish through skin because of how light travels.", ku: "خوێن هەمیشە جۆرەکانی سوورە. خوێنبەرەکان لە ڕێگەی پێستەوە شین دەردەکەون بەهۆی چۆنیەتی گەشتی ڕووناکی." },
    },
    didYouKnow: [
      { en: "Platelets help form clots so you stop bleeding after a cut.", ku: "تەزووکەکان یارمەتی دروستکردنی خوێن مەیین دەدەن تا دوای برین خوێن ڕاوەستێت." },
      { en: "White blood cells help fight infection.", ku: "خانە سپییەکانی خوێن یارمەتی شەڕ لەگەڵ تووشبوون دەدەن." },
      { en: "Blood type is inherited from your parents.", ku: "جۆری خوێن لە دایک و باوکەوە بۆت دەگوازرێتەوە." },
      { en: "Iron in food helps build hemoglobin, which carries oxygen.", ku: "ئاسن لە خۆراکدا یارمەتی دروستکردنی هیمۆگلۆبین دەدات کە ئۆکسیجین دەگوازێتەوە." },
      { en: "Donating blood can save lives when done safely through medical services.", ku: "بەخشینی خوێن دەتوانێت ژیان ڕزگار بکات کاتێک بە شێوەیەکی پارێزراو لە ڕێگەی خزمەتگوزاری پزیشکییەوە دەکرێت." },
      { en: "Your heart recirculates your blood volume many times each day.", ku: "دڵت چەندین جار لە ڕۆژدا خوێنەکەت دەگەڕێنێتەوە." },
    ],
    habits: [
      { icon: "💧", en: "Drink enough water so blood can circulate well.", ku: "ئاوێکی پێویست بخۆوە تا خوێن باش بسوڕێت." },
      { icon: "🥩", en: "Eat iron-rich foods if your diet allows.", ku: "ئەگەر خۆراکت ڕێگە بدات، خۆراکی دەوڵەمەند بە ئاسن بخۆ." },
      { icon: "🚶", en: "Move regularly to support healthy circulation.", ku: "بە بەردەوامی بجوڵێ بۆ پشتگیریکردنی سووڕانی تەندروست." },
      { icon: "🩹", en: "Clean cuts and seek care for heavy bleeding.", ku: "برینەکان پاک بکەوە و بۆ خوێنڕۆیشتنی زۆر داوای یارمەتی بکە." },
    ],
    quiz: [
      {
        q: { en: "Is blood inside veins blue?", ku: "ئایا خوێنی ناو خوێنبەر شینە؟" },
        options: [
          { en: "Yes", ku: "بەڵێ" },
          { en: "No — it is red", ku: "نەخێر — سوورە" },
          { en: "Only at night", ku: "تەنها شەوانە" },
          { en: "Only in children", ku: "تەنها لە منداڵان" },
        ],
        answer: 1,
      },
      {
        q: { en: "What do red blood cells mainly carry?", ku: "خانە سوورەکان سەرەکی چی دەگوازنەوە؟" },
        options: [
          { en: "Oxygen", ku: "ئۆکسیجین" },
          { en: "Bone", ku: "ئێسک" },
          { en: "Hair color", ku: "ڕەنگی قژ" },
          { en: "Sound", ku: "دەنگ" },
        ],
        answer: 0,
      },
      {
        q: { en: "About how long do red blood cells live?", ku: "خانە سوورەکان نزیکەی چەند دەژین؟" },
        options: [
          { en: "1 day", ku: "١ ڕۆژ" },
          { en: "12 days", ku: "١٢ ڕۆژ" },
          { en: "120 days", ku: "١٢٠ ڕۆژ" },
          { en: "12 years", ku: "١٢ ساڵ" },
        ],
        answer: 2,
      },
    ],
  },
  {
    id: "digestive",
    icon: "🍽",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.35)",
    name: { en: "Digestive System", ku: "سیستەمی هەرس" },
    subtitle: { en: "From bite to fuel", ku: "لە پارووەوە بۆ وزە" },
    whatIs: {
      en: "Your digestive system is a long pathway from mouth to exit that breaks food into usable pieces.",
      ku: "سیستەمی هەرس ڕێڕەوێکی درێژە لە دەمەوە تا دەرچوون کە خۆراک دەکاتە پارچەی بەکارهاتوو.",
    },
    whatDoes: {
      en: "It digests food, absorbs nutrients and water, and removes what your body cannot use.",
      ku: "خۆراک هەرس دەکات، خۆراکەکان و ئاو هەڵدەمژێت، و ئەوەی جەستە ناتوانێت بەکاریبهێنێت دەردەکات.",
    },
    amazingFacts: [
      { en: "Food can take many hours to travel the full digestive path.", ku: "خۆراک دەتوانێت چەندین کاتژمێر بخایەنێت بۆ تێپەڕین بە هەموو ڕێڕەوی هەرسدا." },
      { en: "Your stomach lining renews frequently to handle strong acid.", ku: "پەردەی ناو سک بە بەردەوامی نوێ دەبێتەوە بۆ بەرگەگرتنی ترشی بەهێز." },
      { en: "Most nutrient absorption happens in the small intestine.", ku: "زۆربەی هەڵمژینی خۆراک لە ڕیخۆڵەی باریکدا ڕوودەدات." },
    ],
    myth: {
      myth: { en: "Digestion happens only in the stomach.", ku: "هەرس تەنها لە سکدا ڕوودەدات." },
      fact: { en: "Digestion starts in the mouth and continues through intestines and more.", ku: "هەرس لە دەمەوە دەست پێدەکات و لە ڕیخۆڵە و زیاتردا بەردەوام دەبێت." },
    },
    didYouKnow: [
      { en: "Chewing well makes the rest of digestion easier.", ku: "باش جووینی خۆراک هەرەسکردن ئاسانتر دەکات." },
      { en: "Fiber helps keep the digestive journey regular.", ku: "فایبەر یارمەتی ڕێکبوونی گەشتی هەرس دەدات." },
      { en: "Gut microbes help break down some foods and support immunity.", ku: "میکرۆبەکانی ڕیخۆڵە یارمەتی شکاندنی هەندێک خۆراک دەدەن و پشتگیری بەرگری دەکەن." },
      { en: "The small intestine is longer than the large intestine.", ku: "ڕیخۆڵەی باریک درێژترە لە ڕیخۆڵەی قەڵەو." },
      { en: "Stress can change how your gut feels and moves.", ku: "ستڕێس دەتوانێت هەست و جووڵەی ڕیخۆڵەت بگۆڕێت." },
      { en: "Water helps move food smoothly along the tract.", ku: "ئاو یارمەتی جووڵەی نەرمی خۆراک لە ڕێڕەودا دەدات." },
    ],
    habits: [
      { icon: "🥦", en: "Eat more vegetables and fiber-rich foods.", ku: "زیاتر سەوزە و خۆراکی دەوڵەمەند بە فایبەر بخۆ." },
      { icon: "💧", en: "Drink water through the day.", ku: "لە درێژایی ڕۆژدا ئاو بخۆوە." },
      { icon: "🍽️", en: "Eat slowly and chew thoroughly.", ku: "بە هێواشی بخۆ و باش بجوو." },
      { icon: "🍬", en: "Limit sugary drinks for everyday sipping.", ku: "خواردنەوە شیرینەکان بۆ هەموو کاتێک کەمتر بکە." },
    ],
    quiz: [
      {
        q: { en: "Where does digestion begin?", ku: "هەرس لە کوێ دەست پێدەکات؟" },
        options: [
          { en: "Only the stomach", ku: "تەنها سک" },
          { en: "The mouth", ku: "دەم" },
          { en: "The liver only", ku: "تەنها جگەر" },
          { en: "The kidneys", ku: "گورچیلەکان" },
        ],
        answer: 1,
      },
      {
        q: { en: "Where are most nutrients absorbed?", ku: "زۆربەی خۆراکەکان لە کوێ هەڵدەمژرێن؟" },
        options: [
          { en: "Teeth", ku: "ددان" },
          { en: "Small intestine", ku: "ڕیخۆڵەی باریک" },
          { en: "Hair", ku: "قژ" },
          { en: "Nails", ku: "نینۆک" },
        ],
        answer: 1,
      },
      {
        q: { en: "Why does the stomach lining renew often?", ku: "بۆچی پەردەی ناو سک زوو نوێ دەبێتەوە؟" },
        options: [
          { en: "To handle strong acid", ku: "بۆ بەرگەگرتنی ترشی بەهێز" },
          { en: "To grow hair", ku: "بۆ گەشەی قژ" },
          { en: "To make bones", ku: "بۆ دروستکردنی ئێسک" },
          { en: "To hear sound", ku: "بۆ بیستنی دەنگ" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "liver",
    icon: "🫀",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.35)",
    name: { en: "Liver", ku: "جگەر" },
    subtitle: { en: "Your chemical workshop", ku: "کارگەی کیمیایی تۆ" },
    whatIs: {
      en: "The liver is a large organ in the upper right abdomen. It performs hundreds of quiet jobs every day.",
      ku: "جگەر ئەندامێکی گەورەیە لە لای سەرەوەی ڕاستی سک. ڕۆژانە سەدان کاری بێدەنگ ئەنجام دەدات.",
    },
    whatDoes: {
      en: "It processes nutrients, helps clean the blood, stores energy, and makes substances your body needs.",
      ku: "خۆراکەکان پرۆسێس دەکات، یارمەتی پاککردنەوەی خوێن دەدات، وزە پاشەکەوت دەکات، و ماددە دروست دەکات کە جەستەت پێویستی پێیە.",
    },
    amazingFacts: [
      { en: "The liver can regenerate — healthy tissue can regrow after injury if enough remains.", ku: "جگەر دەتوانێت خۆی نوێ بکاتەوە — شانەی تەندروست دەتوانێت دوای زیان بگەڕێتەوە ئەگەر بەشی پێویست بمێنێتەوە." },
      { en: "It is one of the busiest organs in the body.", ku: "یەکێکە لە سەرقاڵترین ئەندامەکانی جەستە." },
      { en: "Alcohol and some medicines are processed heavily by the liver.", ku: "کحول و هەندێک دەرمان بە قورسی لەلایەن جگەرەوە پرۆسێس دەکرێن." },
    ],
    myth: {
      myth: { en: "You can \"flush\" the liver with a juice cleanse overnight.", ku: "دەتوانیت بە شلەی میوە لە شەوێکدا جگەر «بشوات»." },
      fact: { en: "The liver already cleans continuously. Extreme cleanses are not a medical reset button.", ku: "جگەر خۆی بە بەردەوامی پاککردنەوە دەکات. پاککردنەوە توندەکان دوگمەی نوێکردنەوەی پزیشکی نین." },
    },
    didYouKnow: [
      { en: "The liver stores glycogen — a backup energy supply.", ku: "جگەر گلایکۆجین پاشەکەوت دەکات — سەرچاوەیەکی پشتگیری وزە." },
      { en: "Bile from the liver helps digest fats.", ku: "زەرداوی جگەر یارمەتی هەرسکردنی چەوری دەدات." },
      { en: "Fatty liver risk rises with excess calories, alcohol, and inactivity.", ku: "مەترسی جگەری چەور بە کالۆری زیاد، کحول و کەم جووڵە زیاد دەبێت." },
      { en: "Vaccines exist for some viruses that can harm the liver.", ku: "ڤاکسین هەیە بۆ هەندێک ڤایرۆس کە دەتوانن جگەر زیان پێبگەیەنن." },
      { en: "Where is the liver? Mostly upper right under the ribs.", ku: "جگەر لە کوێیە؟ زیاتر لای سەرەوەی ڕاست لە ژێر پەراسووەکان." },
      { en: "Your liver works even while you sleep.", ku: "جگەرت تەنانەت لە خەودا کار دەکات." },
    ],
    habits: [
      { icon: "🚫", en: "Limit alcohol — your liver works hard to process it.", ku: "کحول کەم بکە — جگەرت زۆر ماندوو دەبێت بۆ پرۆسێسکردنی." },
      { icon: "🥦", en: "Keep a balanced diet with vegetables and whole foods.", ku: "خۆراکی هاوسەنگ لەگەڵ سەوزە و خۆراکی سروشتی بپارێزە." },
      { icon: "💊", en: "Take medicines only as directed.", ku: "دەرمان تەنها وەک ڕێنمایی کراوە بەکاربهێنە." },
      { icon: "🏃", en: "Stay active to support a healthy weight.", ku: "چالاک بمێنەوە بۆ پشتگیریکردنی کێشی تەندروست." },
    ],
    quiz: [
      {
        q: { en: "Where is the liver mainly located?", ku: "جگەر سەرەکی لە کوێدایە؟" },
        options: [
          { en: "Lower left ankle", ku: "قوڵفی خوارەوەی چەپ" },
          { en: "Upper right abdomen", ku: "سەرەوەی ڕاستی سک" },
          { en: "Inside the ear", ku: "ناو گوێ" },
          { en: "Tip of the nose", ku: "سەری لووت" },
        ],
        answer: 1,
      },
      {
        q: { en: "Can healthy liver tissue regenerate?", ku: "ئایا شانەی تەندروستی جگەر دەتوانێت نوێ ببێتەوە؟" },
        options: [
          { en: "Yes", ku: "بەڵێ" },
          { en: "Never", ku: "هەرگیز" },
          { en: "Only on Mondays", ku: "تەنها دووشەممە" },
          { en: "Only in fish", ku: "تەنها لە ماسی" },
        ],
        answer: 0,
      },
      {
        q: { en: "Which organ filters and processes many chemicals in blood?", ku: "کام ئەندام زۆر ماددەی کیمیایی لە خوێندا فلتەر و پرۆسێس دەکات؟" },
        options: [
          { en: "Liver", ku: "جگەر" },
          { en: "Eyelashes", ku: "مووی چاو" },
          { en: "Fingernails", ku: "نینۆکی پەنجە" },
          { en: "Earlobe", ku: "گۆچکەی گوێ" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "kidneys",
    icon: "🫘",
    color: "#34d399",
    glow: "rgba(52,211,153,0.35)",
    name: { en: "Kidneys", ku: "گورچیلەکان" },
    subtitle: { en: "Your blood filters", ku: "فلتەری خوێنی تۆ" },
    whatIs: {
      en: "You have two bean-shaped kidneys in your mid-back area, one on each side of the spine.",
      ku: "دوو گورچیلەی شێوە لۆبیات هەیە لە ناوەڕاستی پشتت، یەکێک لە هەر لایەکی بڕبڕە.",
    },
    whatDoes: {
      en: "They filter waste from blood, balance water and salts, and help control blood pressure.",
      ku: "پاشماوە لە خوێن فلتەر دەکەن، ئاو و خوێکان هاوسەنگ دەکەن، و یارمەتی کۆنتڕۆڵی پەستانی خوێن دەدەن.",
    },
    amazingFacts: [
      { en: "Kidneys filter roughly 180 liters of fluid daily — most is reabsorbed.", ku: "گورچیلەکان ڕۆژانە نزیکەی ١٨٠ لیتر شلە فلتەر دەکەن — زۆربەی دەگەڕێتەوە." },
      { en: "You can often live with one healthy kidney.", ku: "زۆرجار دەتوانیت بە یەک گورچیلەی تەندروست بژیت." },
      { en: "Urine is mostly water plus filtered wastes.", ku: "میز زیاتر ئاوە لەگەڵ پاشماوەی فلتەرکراو." },
    ],
    myth: {
      myth: { en: "If you feel fine, your kidneys cannot be strained.", ku: "ئەگەر خۆت باش هەست بکەیت، گورچیلەکانت ناتوانن ماندوو بن." },
      fact: { en: "Kidney problems can develop quietly — hydration, blood pressure, and medical checks matter.", ku: "کێشەی گورچیلە دەتوانێت بێدەنگ گەشە بکات — ئاو خواردنەوە، پەستانی خوێن و پشکنینی پزیشکی گرنگن." },
    },
    didYouKnow: [
      { en: "Each kidney has about a million tiny filtering units called nephrons.", ku: "هەر گورچیلەیەک نزیکەی یەک ملیۆن یەکەی فلتەری وردی هەیە بە ناوی نێفرۆن." },
      { en: "High blood pressure can damage kidneys over time.", ku: "پەستانی خوێنی بەرز دەتوانێت بە تێپەڕبوونی کات گورچیلە زیان پێبگەیەنێت." },
      { en: "Salt excess can make the body hold more water.", ku: "خوێی زیاد دەتوانێت جەستە ئاو زیاتر ڕابگرێت." },
      { en: "Kidneys help activate vitamin D.", ku: "گورچیلەکان یارمەتی چالاککردنی ڤیتامین دی دەدەن." },
      { en: "Dark urine can sometimes mean you need more water — but check with a clinician if worried.", ku: "میزی تاریک هەندێک جار واتە پێویستیت بە ئاو زیاتر هەیە — بەڵام ئەگەر نیگەرانیت لەگەڵ پزیشک قسە بکە." },
      { en: "Which organ filters blood? Your kidneys are top of that list.", ku: "کام ئەندام خوێن فلتەر دەکات؟ گورچیلەکانت لە سەرەوەی ئەو لیستەدان." },
    ],
    habits: [
      { icon: "💧", en: "Drink water regularly through the day.", ku: "لە درێژایی ڕۆژدا بە بەردەوامی ئاو بخۆوە." },
      { icon: "🧂", en: "Do not overload meals with salt.", ku: "ژەمەکان بە خوێی زیاد قورس مەکە." },
      { icon: "💊", en: "Avoid unnecessary painkiller overuse.", ku: "لە بەکارهێنانی زیادەڕۆیی دەرمانی ئازار دوور بکەوە." },
      { icon: "🩺", en: "Keep blood pressure in a healthy range.", ku: "پەستانی خوێن لە مەودای تەندروستدا بپارێزە." },
    ],
    quiz: [
      {
        q: { en: "Which organ mainly filters blood?", ku: "کام ئەندام سەرەکی خوێن فلتەر دەکات؟" },
        options: [
          { en: "Kidneys", ku: "گورچیلەکان" },
          { en: "Hair", ku: "قژ" },
          { en: "Teeth enamel", ku: "مینای ددان" },
          { en: "Eyebrows", ku: "برۆ" },
        ],
        answer: 0,
      },
      {
        q: { en: "How many kidneys do most people have?", ku: "زۆربەی خەڵک چەند گورچیلەیان هەیە؟" },
        options: [
          { en: "1", ku: "١" },
          { en: "2", ku: "٢" },
          { en: "4", ku: "٤" },
          { en: "8", ku: "٨" },
        ],
        answer: 1,
      },
      {
        q: { en: "Urine is mostly…", ku: "میز زیاتر…" },
        options: [
          { en: "Solid bone", ku: "ئێسکی ڕەق" },
          { en: "Water plus wastes", ku: "ئاو لەگەڵ پاشماوە" },
          { en: "Pure oil", ku: "زەیتی پاک" },
          { en: "Air only", ku: "تەنها هەوا" },
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "dna",
    icon: "🧬",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.35)",
    name: { en: "DNA", ku: "دی ئێن ئەی" },
    subtitle: { en: "Your biological blueprint", ku: "نەخشەی بایۆلۆجی تۆ" },
    whatIs: {
      en: "DNA is the instruction code inside almost every cell. It is shaped like a twisted ladder — a double helix.",
      ku: "دی ئێن ئەی کۆدی ڕێنماییە لەناو نزیکەی هەموو خانەیەکدا. شێوەی نەردەبانی پێچدراوی هەیە — هێلیکسی دووانە.",
    },
    whatDoes: {
      en: "It stores the information that helps build and run your body, passed down from your parents.",
      ku: "زانیاری هەڵدەگرێت کە یارمەتی دروستکردن و کارکردنی جەستەت دەدات، و لە دایک و باوکەوە بۆت دەگوازرێتەوە.",
    },
    amazingFacts: [
      { en: "If stretched out, the DNA in one cell would be about 2 meters long.", ku: "ئەگەر درێژ بکرێتەوە، دی ئێن ئەی یەک خانە نزیکەی ٢ مەتر درێژ دەبێت." },
      { en: "Humans share a huge amount of DNA with each other — tiny differences matter a lot.", ku: "مرۆڤەکان ڕێژەیەکی زۆری دی ئێن ئەی هاوبەش دەکەن — جیاوازییە وردەکان زۆر گرنگن." },
      { en: "DNA can be damaged by UV light — sunscreen helps protect skin DNA.", ku: "دی ئێن ئەی دەتوانێت بە تیشکی UV زیان ببینێت — کرێمی خۆر یارمەتی پاراستنی دی ئێن ئەی پێست دەدات." },
    ],
    myth: {
      myth: { en: "Genes alone decide everything about your health.", ku: "جینەکان بە تەنها هەموو شتێک دەربارەی تەندروستیت بڕیار دەدەن." },
      fact: { en: "Genes matter, but environment, habits, and chance also shape health outcomes.", ku: "جینەکان گرنگن، بەڵام ژینگە، خوو و هەلومەرجیش ئەنجامی تەندروستی دادەڕێژن." },
    },
    didYouKnow: [
      { en: "Almost every cell has a full copy of your DNA (with a few exceptions).", ku: "نزیکەی هەموو خانەیەک کۆپییەکی تەواوی دی ئێن ئەیت هەیە (لەگەڵ هەندێک دەرچوون)." },
      { en: "DNA uses four letter-like bases: A, T, C, and G.", ku: "دی ئێن ئەی چوار بنەمای وەک پیت بەکاردەهێنێت: A، T، C و G." },
      { en: "Identical twins start with nearly the same DNA.", ku: "دووانەی یەکسان نزیکەی هەمان دی ئێن ئەی دەست پێدەکەن." },
      { en: "Mutations are DNA changes — some harmless, some meaningful.", ku: "میوتەیشن گۆڕانی دی ئێن ئەیە — هەندێکیان بێزیانن، هەندێکیان گرنگن." },
      { en: "Your DNA story includes ancestry and family traits.", ku: "چیرۆکی دی ئێن ئەیت باوباپیران و تایبەتمەندی خێزان لەخۆدەگرێت." },
      { en: "Science can read DNA sequences to study health and identity — with ethical rules.", ku: "زانست دەتوانێت ڕیزبەندی دی ئێن ئەی بخوێنێتەوە بۆ لێکۆڵینەوە لە تەندروستی و ناسنامە — لەگەڵ یاسای ئەخلاقی." },
    ],
    habits: [
      { icon: "🌞", en: "Use sunscreen and shade to protect skin DNA from UV.", ku: "کرێمی خۆر و سێبەر بەکاربهێنە بۆ پاراستنی دی ئێن ئەی پێست لە UV." },
      { icon: "🚭", en: "Avoid smoking — it raises DNA damage risk.", ku: "جگەرە مەکێشە — مەترسی زیانی دی ئێن ئەی زیاد دەکات." },
      { icon: "🥦", en: "Eat a varied diet full of plants.", ku: "خۆراکی هەمەجۆر دەوڵەمەند بە ڕووەک بخۆ." },
      { icon: "😴", en: "Sleep well — repair processes run overnight.", ku: "باش بخەوە — پرۆسەی چاکبوونەوە شەوانە کار دەکات." },
    ],
    quiz: [
      {
        q: { en: "What shape is DNA often compared to?", ku: "دی ئێن ئەی زۆرجار بە کام شێوە بەراورد دەکرێت؟" },
        options: [
          { en: "A twisted ladder (double helix)", ku: "نەردەبانی پێچدراو (هێلیکسی دووانە)" },
          { en: "A square brick", ku: "خشتێکی چوارگۆشە" },
          { en: "A flat coin", ku: "دراوێکی تەخت" },
          { en: "A triangle hat", ku: "کڵاوێکی سێگۆشە" },
        ],
        answer: 0,
      },
      {
        q: { en: "Do genes alone decide all health?", ku: "ئایا جینەکان بە تەنها هەموو تەندروستی بڕیار دەدەن؟" },
        options: [
          { en: "Yes", ku: "بەڵێ" },
          { en: "No — habits and environment matter too", ku: "نەخێر — خوو و ژینگەش گرنگن" },
          { en: "Only diet matters", ku: "تەنها خۆراک گرنگە" },
          { en: "Only sleep matters", ku: "تەنها خەو گرنگە" },
        ],
        answer: 1,
      },
      {
        q: { en: "DNA is found mainly…", ku: "دی ئێن ئەی زیاتر لە…" },
        options: [
          { en: "Inside cells", ku: "ناو خانەکاندا" },
          { en: "Only in shoes", ku: "تەنها لە پێڵاودا" },
          { en: "Only in clouds", ku: "تەنها لە هەوردا" },
          { en: "Only in plastic", ku: "تەنها لە پلاستیکدا" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "eyes",
    icon: "👁",
    color: "#60a5fa",
    glow: "rgba(96,165,250,0.35)",
    name: { en: "Eyes", ku: "چاوەکان" },
    subtitle: { en: "Windows that build your world", ku: "پەنجەرەکان کە جیهانت دروست دەکەن" },
    whatIs: {
      en: "Your eyes are complex organs that capture light and send signals to the brain.",
      ku: "چاوەکانت ئەندامی ئاڵۆزن کە ڕووناکی دەگرن و سیگناڵ بۆ مێشک دەنێرن.",
    },
    whatDoes: {
      en: "They turn light into neural messages so you can see colors, shapes, motion, and depth.",
      ku: "ڕووناکی دەکەنە پەیامی دەماری تا بتوانیت ڕەنگ، شێوە، جووڵە و قووڵایی ببینیت.",
    },
    amazingFacts: [
      { en: "The human eye can distinguish millions of colors.", ku: "چاوی مرۆڤ دەتوانێت ملیۆنەها ڕەنگ جیا بکاتەوە." },
      { en: "Blinking helps clean and moisturize the eye surface.", ku: "چاو لێکدان یارمەتی پاککردنەوە و شێدارکردنی ڕووی چاو دەدات." },
      { en: "Your brain flips and interprets the image — vision is teamwork.", ku: "مێشکت وێنەکە هەڵدەگەڕێنێتەوە و لێکی دەداتەوە — بینین کاری تیمیە." },
    ],
    myth: {
      myth: { en: "Sitting too close to a screen permanently ruins young eyes for sure.", ku: "دانیشتن لە نزیک شاشە بە دڵنیایی چاوی منداڵ بۆ هەمیشە تێکدەدات." },
      fact: { en: "Screens can cause eye strain, but lasting damage myths are overstated — blink, take breaks, and check vision.", ku: "شاشە دەتوانێت ماندوویی چاو دروست بکات، بەڵام ئەفسانەی زیانی هەمیشەیی زۆر گەورە کراوە — چاو بلێکە، پشوو وەربگرە، و بینین بپشکنە." },
    },
    didYouKnow: [
      { en: "Pupils change size to control how much light enters.", ku: "مردمی چاو قەبارە دەگۆڕێت بۆ کۆنتڕۆڵی چەندی ڕووناکی." },
      { en: "Tears are not only emotion — they protect and lubricate.", ku: "فرمێسک تەنها هەست نییە — دەپارێزێت و چەور دەکات." },
      { en: "Carrots help with vitamin A, which supports night vision — but they will not give you superpowers.", ku: "گەزەر یارمەتی ڤیتامین ئەی دەدات کە پشتگیری بینینی شەو دەکات — بەڵام هێزی سەروو مرۆڤت پێ نادات." },
      { en: "UV sunglasses protect eyes outdoors.", ku: "چاوپێکی UV چاو لە دەرەوە دەپارێزێت." },
      { en: "Reading in decent light is kinder to your eyes than struggling in dark.", ku: "خوێندنەوە لە ڕووناکی گونجاودا بۆ چاو باشترە لە ماندووبوون لە تاریکیدا." },
      { en: "Eye color comes from how iris pigment scatters light.", ku: "ڕەنگی چاو لە چۆنیەتی بڵاوبوونەوەی ڕەنگدانەوەی پەردەی چاوەوە دێت." },
    ],
    habits: [
      { icon: "👀", en: "Follow the 20-20-20 rule: every 20 minutes, look 20 feet away for 20 seconds.", ku: "یاسای ٢٠-٢٠-٢٠: هەر ٢٠ خولەک، ٢٠ پێ دوور بڕوانە بۆ ٢٠ چرکە." },
      { icon: "😎", en: "Wear UV protection in bright sun.", ku: "لە خۆری درەوشاوەدا پارێزەری UV لەبەر بکە." },
      { icon: "💤", en: "Rest eyes before sleep — dim screens late at night.", ku: "پێش خەو چاو پشوو بدە — شاشەکان شەوانە کەم ڕووناک بکە." },
      { icon: "🥕", en: "Eat a colorful diet including vitamin A sources.", ku: "خۆراکی ڕەنگاوڕەنگ لەگەڵ سەرچاوەی ڤیتامین ئەی بخۆ." },
    ],
    quiz: [
      {
        q: { en: "What do eyes primarily detect?", ku: "چاوەکان سەرەکی چی دەدۆزنەوە؟" },
        options: [
          { en: "Light", ku: "ڕووناکی" },
          { en: "Sound waves only", ku: "تەنها شەپۆلی دەنگ" },
          { en: "Smell molecules only", ku: "تەنها گەردیلەی بۆن" },
          { en: "Gravity alone", ku: "تەنها هێزی کێشکردن" },
        ],
        answer: 0,
      },
      {
        q: { en: "Can the human eye see millions of colors?", ku: "ئایا چاوی مرۆڤ دەتوانێت ملیۆنەها ڕەنگ ببینێت؟" },
        options: [
          { en: "Yes", ku: "بەڵێ" },
          { en: "No, only 3", ku: "نەخێر، تەنها ٣" },
          { en: "Only black and white", ku: "تەنها ڕەش و سپی" },
          { en: "Only red", ku: "تەنها سوور" },
        ],
        answer: 0,
      },
      {
        q: { en: "Blinking mainly helps…", ku: "چاو لێکدان سەرەکی یارمەتی…" },
        options: [
          { en: "Clean and moisten the eye", ku: "پاککردنەوە و شێدارکردنی چاو" },
          { en: "Grow taller", ku: "بەرزتربوون" },
          { en: "Change blood type", ku: "گۆڕینی جۆری خوێن" },
          { en: "Stop hearing", ku: "وەستاندنی بیستن" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "teeth",
    icon: "🦷",
    color: "#e2e8f0",
    glow: "rgba(226,232,240,0.25)",
    name: { en: "Teeth", ku: "ددانەکان" },
    subtitle: { en: "Tools for every meal", ku: "ئامرازی هەر ژەمێک" },
    whatIs: {
      en: "Teeth are hard structures in the mouth made of enamel, dentin, and pulp — not the same as bone.",
      ku: "ددان پێکهاتەی ڕەقن لە دەمدا لە مینا، دێنتین و پۆڵپ — هەمان شتی ئێسک نین.",
    },
    whatDoes: {
      en: "They cut and grind food so digestion can start, and they help you speak clearly.",
      ku: "خۆراک دەبڕن و دەهاڕن تا هەرس دەست پێبکات، و یارمەتی قسەکردنی ڕوون دەدەن.",
    },
    amazingFacts: [
      { en: "Enamel is the hardest substance in the human body.", ku: "مینا ڕەقترین ماددەیە لە جەستەی مرۆڤدا." },
      { en: "Adults usually have 32 teeth including wisdom teeth.", ku: "پێگەیشتووان زۆرجار ٣٢ ددانیان هەیە لەگەڵ ددانی ژیری." },
      { en: "Baby teeth make space and guide adult teeth into place.", ku: "ددانی منداڵ شوێن دەکاتەوە و ددانی پێگەیشتوو ڕێدەنیشێنێت." },
    ],
    myth: {
      myth: { en: "Brushing harder cleans better.", ku: "فەڕچەکردنی توندتر پاککردنەوەی باشترە." },
      fact: { en: "Gentle, thorough brushing with fluoride toothpaste is better — hard scrubbing can harm gums and enamel.", ku: "فەڕچەکردنی نەرم و تەواو لەگەڵ خەمیری ددانی فلوۆراید باشترە — فەڕچەکردنی توند دەتوانێت زیان بە گۆڵ و مینا بگەیەنێت." },
    },
    didYouKnow: [
      { en: "Sugar feeds bacteria that make acid — acid attacks enamel.", ku: "شەکر خۆراکی بەکتریا دەدات کە ترش دروست دەکەن — ترش هێرش دەکاتە سەر مینا." },
      { en: "Flossing cleans places a brush cannot reach.", ku: "فڵۆس ئەو شوێنانە پاک دەکاتەوە کە فەڕچە ناتوانێت پێیان بگات." },
      { en: "Dental checkups catch problems early.", ku: "پشکنینی ددان کێشەکان زوو دەدۆزێتەوە." },
      { en: "Teeth do not regrow enamel once it is lost.", ku: "ددان مینای لەدەستچوو دووبارە ناگەڕێنێتەوە." },
      { en: "Water after sugary snacks helps rinse the mouth.", ku: "ئاو دوای خواردنی شیرین یارمەتی شوشتنی دەم دەدات." },
      { en: "Different tooth shapes do different jobs — biting vs grinding.", ku: "شێوەی جیاوازی ددان کارێکی جیاواز دەکات — گەزین بەرامبەر هاڕین." },
    ],
    habits: [
      { icon: "🪥", en: "Brush twice daily with fluoride toothpaste.", ku: "ڕۆژانە دوو جار بە خەمیری فلوۆراید فەڕچە بکە." },
      { icon: "🧵", en: "Clean between teeth daily.", ku: "ڕۆژانە نێوان ددانەکان پاک بکەوە." },
      { icon: "🍬", en: "Limit frequent sugary snacks and drinks.", ku: "خواردن و خواردنەوەی شیرینی بەردەوام کەم بکە." },
      { icon: "🦷", en: "Visit a dentist for checkups.", ku: "سەردانی ددانساز بکە بۆ پشکنین." },
    ],
    quiz: [
      {
        q: { en: "What is the hardest substance in the body?", ku: "ڕەقترین ماددە لە جەستەدا کامەیە؟" },
        options: [
          { en: "Tooth enamel", ku: "مینای ددان" },
          { en: "Hair", ku: "قژ" },
          { en: "Eyelashes", ku: "مووی چاو" },
          { en: "Fingernails only", ku: "تەنها نینۆک" },
        ],
        answer: 0,
      },
      {
        q: { en: "Are teeth the same as bones?", ku: "ئایا ددان هەمان شتی ئێسکە؟" },
        options: [
          { en: "Yes", ku: "بەڵێ" },
          { en: "No", ku: "نەخێر" },
          { en: "Only molars", ku: "تەنها ددانی هاڕین" },
          { en: "Only baby teeth", ku: "تەنها ددانی منداڵ" },
        ],
        answer: 1,
      },
      {
        q: { en: "Brushing harder is always better — true?", ku: "فەڕچەکردنی توندتر هەمیشە باشترە — ڕاستە؟" },
        options: [
          { en: "True", ku: "ڕاست" },
          { en: "False", ku: "هەڵە" },
          { en: "Only at night", ku: "تەنها شەوانە" },
          { en: "Only for kids", ku: "تەنها بۆ منداڵان" },
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "immune",
    icon: "🦠",
    color: "#4ade80",
    glow: "rgba(74,222,128,0.35)",
    name: { en: "Immune System", ku: "سیستەمی بەرگری" },
    subtitle: { en: "Your defense network", ku: "تۆڕی بەرگری تۆ" },
    whatIs: {
      en: "Your immune system is a team of cells, tissues, and organs that protect you from harmful invaders.",
      ku: "سیستەمی بەرگری تیمی خانە، شانە و ئەندامە کە لە دوژمنە زیانبەخشەکان دەتپارێزێت.",
    },
    whatDoes: {
      en: "It detects germs, fights infection, and remembers past threats so responses can be faster next time.",
      ku: "میکرۆب دەدۆزێتەوە، تووشبوون شەڕ دەکات، و هەڕەشە کۆنەکان بیر دەهێنێتەوە تا وەڵامی داهاتوو خێراتر بێت.",
    },
    amazingFacts: [
      { en: "Fever is often your body raising temperature to help fight infection.", ku: "تا زۆرجار جەستەت پلەی گەرمی بەرز دەکاتەوە بۆ یارمەتیدانی شەڕ لەگەڵ تووشبوون." },
      { en: "Vaccines train immunity safely without giving you the full disease.", ku: "ڤاکسین بەرگری فێر دەکات بە شێوەیەکی پارێزراو بەبێ ئەوەی نەخۆشی تەواوت پێ بدات." },
      { en: "Skin is a first barrier — your largest organ and a shield.", ku: "پێست یەکەم بەربەستە — گەورەترین ئەندام و قەڵغانێک." },
    ],
    myth: {
      myth: { en: "You must \"boost\" immunity with random products every week.", ku: "دەبێت هەفتانە بە بەرهەمی هەڕەمەکی بەرگری «بەهێز» بکەیت." },
      fact: { en: "A balanced lifestyle supports immunity; extreme \"boosts\" are often marketing, not medicine.", ku: "ژیانێکی هاوسەنگ پشتگیری بەرگری دەکات؛ «بەهێزکردن»ی توند زۆرجار بازاڕگەرییە نەک پزیشکی." },
    },
    didYouKnow: [
      { en: "Sleep loss can weaken immune responses.", ku: "کەمخەوی دەتوانێت وەڵامی بەرگری لاواز بکات." },
      { en: "Handwashing cuts the spread of many germs.", ku: "شوشتنی دەست بڵاوبوونەوەی زۆر میکرۆب کەم دەکات." },
      { en: "Lymph nodes help filter and coordinate immune activity.", ku: "گرێی لیمف یارمەتی فلتەر و ڕێکخستنی چالاکی بەرگری دەدات." },
      { en: "Allergies happen when immunity overreacts to harmless things.", ku: "هەستیاری کاتێک ڕوودەدات کە بەرگری زیادەڕۆیی دەکات بەرامبەر شتی بێزیان." },
      { en: "White blood cells are key immune soldiers.", ku: "خانە سپییەکانی خوێن سەربازە سەرەکییەکانی بەرگرین." },
      { en: "Chronic stress can tilt immunity in unhelpful ways.", ku: "ستڕێسی درێژخایەن دەتوانێت بەرگری بە شێوەیەکی ناسوودمەند بگۆڕێت." },
    ],
    habits: [
      { icon: "🧼", en: "Wash hands with soap at key times.", ku: "لە کاتە گرنگەکاندا دەست بە سابوون بشۆ." },
      { icon: "😴", en: "Sleep enough most nights.", ku: "زۆربەی شەوانە بە پێویست بخەوە." },
      { icon: "💉", en: "Follow recommended vaccines for your age and place.", ku: "ڤاکسینی پێشنیازکراو بۆ تەمەن و شوێنت جێبەجێ بکە." },
      { icon: "🍎", en: "Eat a varied nutritious diet.", ku: "خۆراکی هەمەجۆر و بەنرخ بخۆ." },
    ],
    quiz: [
      {
        q: { en: "What do vaccines mainly do?", ku: "ڤاکسین سەرەکی چی دەکات؟" },
        options: [
          { en: "Train immunity safely", ku: "بەرگری بە شێوەیەکی پارێزراو فێر دەکات" },
          { en: "Replace sleep forever", ku: "بۆ هەمیشە جێگەی خەو دەگرێتەوە" },
          { en: "Change eye color", ku: "ڕەنگی چاو دەگۆڕێت" },
          { en: "Grow extra bones", ku: "ئێسکی زیادە گەشە دەکات" },
        ],
        answer: 0,
      },
      {
        q: { en: "What is a first physical barrier of defense?", ku: "یەکەم بەربەستی جەستەیی بەرگری کامەیە؟" },
        options: [
          { en: "Skin", ku: "پێست" },
          { en: "Earlobe jewelry", ku: "گوارەی گوێ" },
          { en: "Shoe laces", ku: "قەیتانی پێڵاو" },
          { en: "Hat logos", ku: "لۆگۆی کڵاو" },
        ],
        answer: 0,
      },
      {
        q: { en: "Does sleep affect immunity?", ku: "ئایا خەو کاریگەری لەسەر بەرگری هەیە؟" },
        options: [
          { en: "Yes", ku: "بەڵێ" },
          { en: "Never", ku: "هەرگیز" },
          { en: "Only in summer", ku: "تەنها لە هاویندا" },
          { en: "Only for plants", ku: "تەنها بۆ ڕووەک" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "muscles",
    icon: "💪",
    color: "#fb7185",
    glow: "rgba(251,113,133,0.35)",
    name: { en: "Muscles", ku: "ماسولکەکان" },
    subtitle: { en: "Your movement engines", ku: "مەکینەی جووڵەی تۆ" },
    whatIs: {
      en: "Muscles are tissues that contract. You have skeletal muscles you control, plus heart and smooth muscle you do not.",
      ku: "ماسولکەکان شانەن کە گرژ دەبن. ماسولکەی ئێسکبەندت هەیە کە کۆنتڕۆڵی دەکەیت، لەگەڵ ماسولکەی دڵ و نەرم کە ناکۆنتڕۆڵ دەکەیت.",
    },
    whatDoes: {
      en: "They move your body, help posture, generate heat, and power breathing and circulation with specialized types.",
      ku: "جەستەت دەجووڵێنن، یارمەتی هەڵوێست دەدەن، گەرمی دروست دەکەن، و لەگەڵ جۆرە تایبەتەکان هەناسە و سووڕان بەهێز دەکەن.",
    },
    amazingFacts: [
      { en: "There are over 600 skeletal muscles in the human body.", ku: "زیاتر لە ٦٠٠ ماسولکەی ئێسکبەند لە جەستەی مرۆڤدا هەیە." },
      { en: "Muscle cells can grow thicker with training — that is hypertrophy.", ku: "خانەکانی ماسولکە دەتوانن بە ڕاهێنان ئەستوورتر ببن — ئەوە هایپەرتڕۆفیە." },
      { en: "Smiling uses facial muscles — expression is movement too.", ku: "پێکەنین ماسولکەی دەموچاو بەکاردەهێنێت — دەربڕینیش جووڵەیە." },
    ],
    myth: {
      myth: { en: "No pain, no gain — sore every day means better results.", ku: "بێ ئازار بێ دەستکەوت — ئازار هەموو ڕۆژێک واتە ئەنجامی باشتر." },
      fact: { en: "Progress needs challenge and recovery. Constant extreme soreness can mean overdoing it.", ku: "پێشکەوتن پێویستی بە ئاستەنگ و چاکبوونەوە هەیە. ئازاری توندی هەمیشەیی دەتوانێت واتە زیادەڕۆیی بێت." },
    },
    didYouKnow: [
      { en: "Protein helps repair muscle after activity.", ku: "پرۆتین یارمەتی چاکبوونەوەی ماسولکە دەدات دوای چالاکی." },
      { en: "Sitting too long stiffens muscles — short movement breaks help.", ku: "زۆر دانیشتن ماسولکە ڕەق دەکات — پشووی جووڵەی کورت یارمەتی دەدات." },
      { en: "The strongest muscle by size is often debated — the tongue and jaw are surprisingly strong.", ku: "بەهێزترین ماسولکە بەپێی قەبارە جێی مشتومڕە — زمان و چەناگە بە سەرسوڕهێنەری بەهێزن." },
      { en: "Warm-ups prepare muscles for safer movement.", ku: "گەرمکردنەوە ماسولکە ئامادە دەکات بۆ جووڵەی پارێزراوتر." },
      { en: "Muscles store glycogen for quick energy.", ku: "ماسولکە گلایکۆجین پاشەکەوت دەکات بۆ وزەی خێرا." },
      { en: "Breathing uses the diaphragm — a dome-shaped muscle.", ku: "هەناسەدان دیافراگم بەکاردەهێنێت — ماسولکەیەکی شێوە گومەز." },
    ],
    habits: [
      { icon: "🏋️", en: "Do strength activity 2+ times a week if safe for you.", ku: "ئەگەر بۆت گونجاوە، هەفتانە ٢+ جار چالاکی هێز بکە." },
      { icon: "🚶", en: "Walk daily to keep muscles awake.", ku: "ڕۆژانە بڕۆ تا ماسولکەکان وریا بن." },
      { icon: "🥩", en: "Eat enough protein across meals.", ku: "لە ژەمەکاندا پرۆتینی پێویست بخۆ." },
      { icon: "😴", en: "Recover with sleep after hard days.", ku: "دوای ڕۆژە قورسەکان بە خەو چاک ببەوە." },
    ],
    quiz: [
      {
        q: { en: "About how many skeletal muscles do humans have?", ku: "مرۆڤ نزیکەی چەند ماسولکەی ئێسکبەندی هەیە؟" },
        options: [
          { en: "Over 600", ku: "زیاتر لە ٦٠٠" },
          { en: "12", ku: "١٢" },
          { en: "50", ku: "٥٠" },
          { en: "3", ku: "٣" },
        ],
        answer: 0,
      },
      {
        q: { en: "Is the heart a muscle?", ku: "ئایا دڵ ماسولکەیە؟" },
        options: [
          { en: "Yes — a special cardiac muscle", ku: "بەڵێ — ماسولکەیەکی تایبەتی دڵ" },
          { en: "No", ku: "نەخێر" },
          { en: "Only on Tuesdays", ku: "تەنها سێشەممە" },
          { en: "Only in athletes", ku: "تەنها لە وەرزشوانان" },
        ],
        answer: 0,
      },
      {
        q: { en: "Muscles mainly work by…", ku: "ماسولکەکان سەرەکی بە…" },
        options: [
          { en: "Contracting", ku: "گرژبوون" },
          { en: "Turning into bone nightly", ku: "شەوانە بوون بە ئێسک" },
          { en: "Becoming air", ku: "بوون بە هەوا" },
          { en: "Stopping blood forever", ku: "وەستاندنی خوێن بۆ هەمیشە" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "nervous",
    icon: "⚡",
    color: "#818cf8",
    glow: "rgba(129,140,248,0.35)",
    name: { en: "Nervous System", ku: "سیستەمی دەماری" },
    subtitle: { en: "Your wiring and wifi", ku: "هێڵ و وایفا‌ی تۆ" },
    whatIs: {
      en: "The nervous system is your brain, spinal cord, and a vast web of nerves throughout the body.",
      ku: "سیستەمی دەماری مێشک، بڕبڕەی پشتی و تۆڕێکی فراوانی دەمارە لە سەرتاسەری جەستەدا.",
    },
    whatDoes: {
      en: "It sends fast messages so you can sense, move, think, and keep automatic systems running.",
      ku: "پەیامی خێرا دەنێرێت تا هەست بکەیت، بجووڵێیت، بیر بکەیتەوە، و سیستەمە خۆکارەکان بەردەوام بن.",
    },
    amazingFacts: [
      { en: "Nerve signals are tiny electrical and chemical messages.", ku: "سیگناڵە دەمارییەکان پەیامی کارەبایی و کیمیایی وردن." },
      { en: "Reflexes can happen before you consciously \"decide\".", ku: "ڕیفڵێکس دەتوانێت ڕووبدات پێش ئەوەی بە ئاگایی «بڕیار» بدەیت." },
      { en: "The spinal cord is the superhighway between brain and body.", ku: "بڕبڕەی پشتی شاڕێی نێوان مێشک و جەستەیە." },
    ],
    myth: {
      myth: { en: "Nerves and \"feeling stressed\" are unrelated.", ku: "دەمار و «هەستکردن بە ستڕێس» پەیوەندییان نییە." },
      fact: { en: "Your nervous system drives stress responses — calm breathing can help dial them down.", ku: "سیستەمی دەماریت وەڵامی ستڕێس دەباتە پێشەوە — هەناسەی ئارام دەتوانێت یارمەتی کەمکردنەوەی بدات." },
    },
    didYouKnow: [
      { en: "Myelin is a coating that helps many nerves signal faster.", ku: "مایلین پۆششێکە کە یارمەتی خێراتر بوونی سیگناڵی زۆر دەمار دەدات." },
      { en: "Touch sensors in skin report pressure, temperature, and pain.", ku: "هەستەوەری دەستلێدان لە پێستدا پەستان، پلەی گەرمی و ئازار ڕاپۆرت دەکەن." },
      { en: "Caffeine affects nervous system alertness.", ku: "کافین کاریگەری لەسەر وریایی سیستەمی دەماری هەیە." },
      { en: "Protecting your neck and spine protects nerve pathways.", ku: "پاراستنی مل و بڕبڕە ڕێڕەوی دەمار دەپارێزێت." },
      { en: "Learning strengthens useful nerve pathways — practice wires the brain.", ku: "فێربوون ڕێڕەوی دەماری سوودمەند بەهێز دەکات — ڕاهێنان مێشک دەبەستێتەوە." },
      { en: "Autonomic nerves handle heart rate and digestion without conscious effort.", ku: "دەمارە خۆکارەکان لێدانی دڵ و هەرس بەبێ هەوڵی ئاگایی ئەنجام دەدەن." },
    ],
    habits: [
      { icon: "🧘", en: "Practice calm breathing when stressed.", ku: "کاتێک ستڕێست هەیە هەناسەی ئارام ڕابهێنە." },
      { icon: "🛡️", en: "Wear helmets and seatbelts to protect the nervous system.", ku: "کڵاو و پشتێنی سەلامەتی لەبەر بکە بۆ پاراستنی سیستەمی دەماری." },
      { icon: "😴", en: "Keep a steady sleep schedule.", ku: "خشتەی خەوی جێگیر بپارێزە." },
      { icon: "📵", en: "Take quiet breaks from constant notifications.", ku: "پشووی بێدەنگ لە ئاگاداری بەردەوام وەربگرە." },
    ],
    quiz: [
      {
        q: { en: "What is the \"superhighway\" between brain and body?", ku: "«شاڕێ»ی نێوان مێشک و جەستە کامەیە؟" },
        options: [
          { en: "Spinal cord", ku: "بڕبڕەی پشتی" },
          { en: "Hair follicle", ku: "ڕەگی قژ" },
          { en: "Toenail", ku: "نینۆکی پەنجەی پێ" },
          { en: "Earlobe", ku: "گۆچکەی گوێ" },
        ],
        answer: 0,
      },
      {
        q: { en: "Nerve signals are…", ku: "سیگناڵە دەمارییەکان…" },
        options: [
          { en: "Electrical and chemical messages", ku: "پەیامی کارەبایی و کیمیایی" },
          { en: "Only smoke signals", ku: "تەنها سیگناڵی دووکەڵ" },
          { en: "Only music notes", ku: "تەنها نۆتەی میوزیک" },
          { en: "Only colors", ku: "تەنها ڕەنگ" },
        ],
        answer: 0,
      },
      {
        q: { en: "Can reflexes happen before conscious decision?", ku: "ئایا ڕیفڵێکس دەتوانێت پێش بڕیاری ئاگایی ڕووبدات؟" },
        options: [
          { en: "Yes", ku: "بەڵێ" },
          { en: "No", ku: "نەخێر" },
          { en: "Only in fish", ku: "تەنها لە ماسی" },
          { en: "Only on Sundays", ku: "تەنها یەکشەممە" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "hormones",
    icon: "⚖",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.35)",
    name: { en: "Hormones", ku: "هۆرمۆنەکان" },
    subtitle: { en: "Chemical messengers", ku: "پەیامنێرە کیمیاییەکان" },
    whatIs: {
      en: "Hormones are chemical messengers made by glands. They travel in blood to target tissues.",
      ku: "هۆرمۆنەکان پەیامنێری کیمیایین کە لەلایەن غودەکانەوە دروست دەبن. لە خوێندا دەڕۆن بۆ شانە ئامانجەکان.",
    },
    whatDoes: {
      en: "They help regulate growth, energy, mood, sleep, stress, reproduction, and metabolism.",
      ku: "یارمەتی ڕێکخستنی گەشە، وزە، مەزاج، خەو، ستڕێس، زاوزێ و میتابۆلیزم دەدەن.",
    },
    amazingFacts: [
      { en: "Tiny amounts of hormone can cause big body changes.", ku: "بڕێکی زۆر کەمی هۆرمۆن دەتوانێت گۆڕانی گەورە لە جەستەدا دروست بکات." },
      { en: "Melatonin helps signal that it is time to sleep.", ku: "مێلاتۆنین یارمەتی سیگناڵدانی کاتی خەو دەدات." },
      { en: "Adrenaline (epinephrine) prepares you for \"fight or flight\" in seconds.", ku: "ئادرێنالین (ئەپی‌نێفرین) لە چەند چرکەیەکدا ئامادەت دەکات بۆ «شەڕ یان هەڵهاتن»." },
    ],
    myth: {
      myth: { en: "Hormones only matter during puberty.", ku: "هۆرمۆنەکان تەنها لە کاتی گەنجانیدا گرنگن." },
      fact: { en: "Hormones matter across the whole lifespan — childhood, adulthood, and aging.", ku: "هۆرمۆنەکان لە هەموو تەمەنەکاندا گرنگن — منداڵی، پێگەیشتن و پیری." },
    },
    didYouKnow: [
      { en: "Insulin helps cells take in sugar from blood.", ku: "ئینسوولین یارمەتی خانەکان دەدات شەکر لە خوێن وەربگرن." },
      { en: "Thyroid hormones influence metabolism speed.", ku: "هۆرمۆنەکانی تایرۆید کاریگەری لەسەر خێرایی میتابۆلیزم هەیە." },
      { en: "Stress hormones rise when you feel threatened — then should settle.", ku: "هۆرمۆنی ستڕێس بەرز دەبێتەوە کاتێک هەست بە هەڕەشە دەکەیت — پاشان دەبێت ئارام ببێتەوە." },
      { en: "Light at night can shift hormone timing for sleep.", ku: "ڕووناکی شەوانە دەتوانێت کاتی هۆرمۆنی خەو بگۆڕێت." },
      { en: "Puberty is a hormone-powered growth and change chapter.", ku: "گەنجانی بەشی گەشە و گۆڕانە بە هێزی هۆرمۆن." },
      { en: "Glands like the pituitary act as control hubs for many hormone pathways.", ku: "غودەکان وەک پیتیوتەری وەک ناوەندی کۆنتڕۆڵ بۆ زۆر ڕێڕەوی هۆرمۆن کاردەکەن." },
    ],
    habits: [
      { icon: "😴", en: "Keep a regular sleep-wake schedule.", ku: "خشتەی خەو و هەستانەوەی ڕێک بپارێزە." },
      { icon: "🌞", en: "Get morning daylight when you can.", ku: "کاتێک دەتوانیت، ڕووناکی بەیانی وەربگرە." },
      { icon: "🧘", en: "Use healthy stress outlets — walk, talk, breathe.", ku: "ڕێگای تەندروست بۆ ستڕێس بەکاربهێنە — بڕۆ، قسە بکە، هەناسە بدە." },
      { icon: "🍽️", en: "Eat regular balanced meals to support metabolic hormones.", ku: "ژەمی ڕێک و هاوسەنگ بخۆ بۆ پشتگیریکردنی هۆرمۆنی میتابۆلیزم." },
    ],
    quiz: [
      {
        q: { en: "Hormones travel mainly through…", ku: "هۆرمۆنەکان سەرەکی لە ڕێگەی…" },
        options: [
          { en: "Blood", ku: "خوێن" },
          { en: "Hair gel", ku: "ژێلی قژ" },
          { en: "Shoe polish", ku: "بۆیەی پێڵاو" },
          { en: "Earwax only", ku: "تەنها مۆمی گوێ" },
        ],
        answer: 0,
      },
      {
        q: { en: "Do hormones only matter in puberty?", ku: "ئایا هۆرمۆنەکان تەنها لە گەنجانیدا گرنگن؟" },
        options: [
          { en: "Yes", ku: "بەڵێ" },
          { en: "No — across life", ku: "نەخێر — لە هەموو تەمەندا" },
          { en: "Only in winter", ku: "تەنها لە زستاندا" },
          { en: "Only for plants", ku: "تەنها بۆ ڕووەک" },
        ],
        answer: 1,
      },
      {
        q: { en: "Melatonin is linked with…", ku: "مێلاتۆنین پەیوەستە بە…" },
        options: [
          { en: "Sleep timing", ku: "کاتی خەو" },
          { en: "Tooth color only", ku: "تەنها ڕەنگی ددان" },
          { en: "Shoe size", ku: "قەبارەی پێڵاو" },
          { en: "Hair gel strength", ku: "هێزی ژێلی قژ" },
        ],
        answer: 0,
      },
    ],
  },
];

export function getOrgan(id) {
  return ORGANS.find((o) => o.id === id) || null;
}

export function organProgress(state, organId) {
  const done = state.lessonsDone || [];
  const quiz = state.quizDone || [];
  const steps = [
    done.includes(`${organId}:learn`),
    done.includes(`${organId}:myth`),
    done.includes(`${organId}:facts`),
    done.includes(`${organId}:habits`),
    quiz.includes(organId),
  ];
  const completed = steps.filter(Boolean).length;
  return {
    completed,
    total: steps.length,
    pct: Math.round((completed / steps.length) * 100),
    isComplete: completed === steps.length,
  };
}
