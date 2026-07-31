/** App-style dashboard copy — EN + Central Kurdish (Sorani) */

function toEasternDigits(n) {
  const map = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(n).replace(/\d/g, (d) => map[Number(d)]);
}

export { toEasternDigits };

export const DASHBOARD_I18N = {
  en: {
    brand: "KurdanaHealth",
    byNoor: "Created by Noor Sardar",
    welcomeBack: "Welcome back",
    quote: "Health begins with learning.",
    quoteAttribution: "— Noor Sardar",

    streakTitle: "KurdanaHealth Streak",
    streakUnit: "days",
    streakUnitSingular: "day",
    streakUsed: (n) =>
      `You have used KurdanaHealth for ${n} ${n === 1 ? "day" : "days"}.`,
    streakEncourage: "Keep learning and exploring.",
    streakLongest: (n) => `Longest streak: ${n} ${n === 1 ? "day" : "days"}`,

    spacesTitle: "Health Spaces",
    spacesSub: "Explore every part of your health in one place.",
    ctaOpen: "Open",
    ctaContinue: "Continue",
    progressNew: "New",
    progressStarted: "Started",

    continueTitle: "Continue Learning",
    continueSub: "Pick up where you left off.",
    continuePrefix: "Continue",

    today: "Today",
    settings: "Settings",
    logout: "Logout",
  },
  ku: {
    brand: "تەندروستی کوردانە",
    byNoor: "دروستکراوە لەلایەن نوور سەردار",
    welcomeBack: "بەخێربێیتەوە",
    quote: "تەندروستی لە فێربوونەوە دەست پێدەکات.",
    quoteAttribution: "— نوور سەردار",

    streakTitle: "بەردەوامی لە تەندروستی کوردانە",
    streakUnit: "ڕۆژ",
    streakUnitSingular: "ڕۆژ",
    streakUsed: (n) => `بۆ ماوەی ${toEasternDigits(n)} ڕۆژە تەندروستی کوردانەت بەکارهێناوە.`,
    streakEncourage: "بەردەوام بە لە فێربوون و گەڕان.",
    streakLongest: (n) => `درێژترین بەردەوامی: ${toEasternDigits(n)} ڕۆژ`,

    spacesTitle: "بەشەکانی تەندروستی",
    spacesSub: "لە یەک شوێندا هەموو بەشەکانی تەندروستیت بگەڕێ.",
    ctaOpen: "بیکەرەوە",
    ctaContinue: "بەردەوام بە",
    progressNew: "نوێ",
    progressStarted: "دەستپێکراوە",

    continueTitle: "بەردەوامبوون لە فێربوون",
    continueSub: "لەوێوە دەست پێبکەوە کە وازتهێنا.",
    continuePrefix: "بەردەوام بە لە",

    today: "ئەمڕۆ",
    settings: "ڕێکخستنەکان",
    logout: "چوونەدەرەوە",
  },
};

const KU_WEEKDAYS = ["یەکشەممە", "دووشەممە", "سێشەممە", "چوارشەممە", "پێنجشەممە", "هەینی", "شەممە"];
const KU_MONTHS = [
  "کانوونی دووەم",
  "شوبات",
  "ئازار",
  "نیسان",
  "ئایار",
  "حوزەیران",
  "تەمموز",
  "ئاب",
  "ئەیلوول",
  "تشرینی یەکەم",
  "تشرینی دووەم",
  "کانوونی یەکەم",
];

export function formatDashboardDate(lang, date = new Date()) {
  if (lang === "ku") {
    const day = toEasternDigits(date.getDate());
    return `${KU_WEEKDAYS[date.getDay()]}، ${day}ی ${KU_MONTHS[date.getMonth()]}`;
  }
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/** Prefer a Sorani display name so EN/KU never mix in the welcome line. */
export function displayUserName(name, lang) {
  const raw = (name || "").trim();
  if (lang !== "ku") return raw || "Noor";
  if (!raw || /^noor$/i.test(raw)) return "نوور";
  return raw;
}

export const SPACE_MODULES = [
  {
    slug: "mental-health",
    icon: "🧠",
    accent: "#5B6FA8",
    title: { en: "Mental Health", ku: "تەندروستی دەروونی" },
    desc: {
      en: "A calm space for your mind and feelings.",
      ku: "شوێنێکی ئارام بۆ مێشک و هەستەکانت.",
    },
  },
  {
    slug: "bodywise",
    icon: "🫀",
    accent: "#C45C6A",
    title: { en: "BodyWise", ku: "ناسینی جەستە" },
    desc: {
      en: "Learn how your body works.",
      ku: "فێربە جەستەت چۆن کاردەکات.",
    },
  },
  {
    slug: "fitness",
    icon: "🏃",
    accent: "#3D8B6E",
    title: { en: "Fitness", ku: "وەرزش" },
    desc: {
      en: "Move, build strength, stay active.",
      ku: "بجوڵێ، هێز دروست بکە، چالاک بمێنەوە.",
    },
  },
  {
    slug: "beauty",
    icon: "💄",
    accent: "#9A6B82",
    title: { en: "Beauty", ku: "جوانکاری" },
    desc: {
      en: "Skincare guidance you can trust.",
      ku: "ڕێنمایی چاودێری پێست کە دەتوانیت پشتی پێ ببەستیت.",
    },
  },
  {
    slug: "first-time-mothers",
    icon: "👶",
    accent: "#C47A5A",
    title: { en: "Motherhood", ku: "دایکایەتی" },
    desc: {
      en: "Gentle support for new mothers.",
      ku: "پشتگیری نەرم بۆ دایکانی نوێ.",
    },
  },
  {
    slug: "nutrition-diets",
    icon: "🥗",
    accent: "#8B7355",
    title: { en: "Nutrition", ku: "خۆراک و تەندروستی" },
    desc: {
      en: "Simple habits for better eating.",
      ku: "عادەتی سادە بۆ خۆراکی باشتر.",
    },
  },
  {
    slug: "antibiotics-flu",
    icon: "💊",
    accent: "#3F7A6C",
    title: { en: "Antibiotics", ku: "دژەبەکتریا" },
    desc: {
      en: "Know when antibiotics help.",
      ku: "بزانە کەی دژەبەکتریا یارمەتیدەرە.",
    },
  },
  {
    slug: "noor-community",
    icon: "🌸",
    accent: "#1F6F6A",
    title: { en: "Noor Community", ku: "کۆمەڵگەی نوور" },
    desc: {
      en: "Discover one disease with Noor every week.",
      ku: "هەموو هەفتەیەک لەگەڵ نوور نەخۆشییەک بناسە.",
    },
  },
];
