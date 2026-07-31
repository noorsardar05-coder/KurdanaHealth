/** Interactive body journey timelines. */

export const TIMELINES = [
  {
    id: "food",
    icon: "🍽",
    color: "#fb923c",
    title: { en: "How food travels", ku: "خۆراک چۆن دەڕوات" },
    subtitle: { en: "From first bite to exit", ku: "لە یەکەم پارووەوە تا دەرچوون" },
    steps: [
      {
        icon: "👄",
        title: { en: "Mouth", ku: "دەم" },
        text: {
          en: "Teeth chew and saliva starts breaking food down.",
          ku: "ددان دەهاڕێت و لیک دەست دەکات بە شکاندنی خۆراک.",
        },
      },
      {
        icon: "↓",
        title: { en: "Esophagus", ku: "سرنج" },
        text: {
          en: "A muscular tube pushes the bite toward the stomach.",
          ku: "لوولەیەکی ماسولکەیی پارووەکە بەرەو سک دەپاڵێت.",
        },
      },
      {
        icon: "🫙",
        title: { en: "Stomach", ku: "سک" },
        text: {
          en: "Acid and enzymes turn food into a thick mixture.",
          ku: "ترش و ئینزایم خۆراک دەکەنە تێکەڵەیەکی ئەستوور.",
        },
      },
      {
        icon: "🧵",
        title: { en: "Small intestine", ku: "ڕیخۆڵەی باریک" },
        text: {
          en: "Most nutrients are absorbed into the blood here.",
          ku: "زۆربەی خۆراکەکان لێرەدا دەچنە ناو خوێن.",
        },
      },
      {
        icon: "📦",
        title: { en: "Large intestine", ku: "ڕیخۆڵەی قەڵەو" },
        text: {
          en: "Water is absorbed and leftovers form stool.",
          ku: "ئاو هەڵدەمژرێت و پاشماوە دەبێتە پیسایی.",
        },
      },
      {
        icon: "🚪",
        title: { en: "Exit", ku: "دەرچوون" },
        text: {
          en: "Waste leaves the body — the journey ends.",
          ku: "پاشماوە جەستە جێدەهێڵێت — گەشت کۆتایی دێت.",
        },
      },
    ],
  },
  {
    id: "oxygen",
    icon: "💨",
    color: "#5eead4",
    title: { en: "How oxygen travels", ku: "ئۆکسیجین چۆن دەڕوات" },
    subtitle: { en: "From air to every cell", ku: "لە هەواوە بۆ هەموو خانەیەک" },
    steps: [
      {
        icon: "👃",
        title: { en: "Nose / mouth", ku: "لووت / دەم" },
        text: {
          en: "Air enters and is warmed and filtered a little.",
          ku: "هەوا دێتە ژوورەوە و کەمێک گەرم و فلتەر دەکرێت.",
        },
      },
      {
        icon: "🫁",
        title: { en: "Lungs", ku: "سیهەکان" },
        text: {
          en: "Oxygen crosses into the blood in tiny air sacs.",
          ku: "ئۆکسیجین لە کیسەیە هەوای وردەکاندا دەچێتە ناو خوێن.",
        },
      },
      {
        icon: "🩸",
        title: { en: "Blood", ku: "خوێن" },
        text: {
          en: "Red blood cells pick up oxygen like delivery trucks.",
          ku: "خانە سوورەکان ئۆکسیجین هەڵدەگرن وەک بارهەڵگری گەیاندن.",
        },
      },
      {
        icon: "❤️",
        title: { en: "Heart", ku: "دڵ" },
        text: {
          en: "The heart pumps oxygen-rich blood outward.",
          ku: "دڵ خوێنی دەوڵەمەند بە ئۆکسیجین بەرەو دەرەوە دەپەمپێت.",
        },
      },
      {
        icon: "🧍",
        title: { en: "Body cells", ku: "خانەکانی جەستە" },
        text: {
          en: "Cells use oxygen to make energy — every moment.",
          ku: "خانەکان ئۆکسیجین بەکاردەهێنن بۆ دروستکردنی وزە — هەموو ساتێک.",
        },
      },
    ],
  },
  {
    id: "message",
    icon: "⚡",
    color: "#818cf8",
    title: { en: "How a message travels", ku: "پەیامێک چۆن دەڕوات" },
    subtitle: { en: "Touch → brain → action", ku: "دەستلێدان → مێشک → کردار" },
    steps: [
      {
        icon: "✋",
        title: { en: "Sensors", ku: "هەستەوەرەکان" },
        text: {
          en: "Skin sensors detect touch, heat, or pain.",
          ku: "هەستەوەری پێست دەستلێدان، گەرمی یان ئازار دەدۆزێتەوە.",
        },
      },
      {
        icon: "🔌",
        title: { en: "Nerves", ku: "دەمارەکان" },
        text: {
          en: "Signals race along nerves toward the spinal cord and brain.",
          ku: "سیگناڵەکان بە خێرایی لە دەمارەکاندا دەڕۆن بەرەو بڕبڕە و مێشک.",
        },
      },
      {
        icon: "🧠",
        title: { en: "Brain", ku: "مێشک" },
        text: {
          en: "Your brain interprets what happened in a flash.",
          ku: "مێشکت لە چرکەیەکدا لێکدانەوەی ئەوەی ڕوویداوە دەکات.",
        },
      },
      {
        icon: "💪",
        title: { en: "Muscles", ku: "ماسولکەکان" },
        text: {
          en: "Orders return so you move — pull away, smile, or speak.",
          ku: "فەرمان دەگەڕێتەوە تا بجووڵێیت — دوور بکەویتەوە، پێبکەنیت، یان قسە بکەیت.",
        },
      },
    ],
  },
];
