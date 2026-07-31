/**
 * Editorial collections for the Beauty Encyclopedia.
 * Products opt in via `collections: string[]`.
 */
export const BEAUTY_COLLECTIONS = [
  { id: "best-sellers", label: { en: "Best Sellers", ku: "پڕفرۆشترینەکان" } },
  { id: "tiktok-viral", label: { en: "TikTok Viral", ku: "ڤایرۆڵی تیکتۆک" } },
  { id: "editors-picks", label: { en: "Editor's Picks", ku: "هەڵبژاردەی سەرنووسەر" } },
  { id: "french-pharmacy", label: { en: "French Pharmacy", ku: "دەرمانخانەی فەڕەنسی" } },
  { id: "korean-beauty", label: { en: "Korean Beauty", ku: "جوانی کۆری" } },
  { id: "luxury-beauty", label: { en: "Luxury Beauty", ku: "جوانی لوکس" } },
  { id: "under-20", label: { en: "Under $20", ku: "کەمتر لە ٢٠ دۆلار" } },
  { id: "sensitive-skin", label: { en: "Sensitive Skin", ku: "پێستی هەستیار" } },
  { id: "acne-essentials", label: { en: "Acne Essentials", ku: "پێویستییەکانی کەڕووک" } },
  { id: "glass-skin", label: { en: "Glass Skin", ku: "پێستی شووشەیی" } },
  { id: "clean-girl", label: { en: "Clean Girl", ku: "شێوازی کلین گێرڵ" } },
  { id: "quiet-luxury", label: { en: "Quiet Luxury", ku: "لوکسی ئارام" } },
  { id: "celebrity-favorites", label: { en: "Celebrity Favorites", ku: "دڵخوازی ئەستێرەکان" } },
  { id: "award-winners", label: { en: "Award Winners", ku: "براوەی خەڵات" } },
  { id: "new-releases", label: { en: "New Releases", ku: "بڵاوکراوە نوێیەکان" } },
  { id: "haircare", label: { en: "Haircare Heroes", ku: "پاڵەوانەکانی قژ" } },
  { id: "fragrance", label: { en: "Fragrance Icons", ku: "ئاوی بۆنی کلاسیک" } },
  { id: "nails", label: { en: "Nail Classics", ku: "کلاسیکەکانی نینۆک" } },
];

export function collectionLabel(id, lang = "en") {
  const c = BEAUTY_COLLECTIONS.find((x) => x.id === id);
  if (!c) return id;
  return lang === "ku" ? c.label.ku : c.label.en;
}
