/**
 * Curated Beauty Encyclopedia — 300+ real, well-known products for education.
 * Not a store: no prices, carts, or marketplace claims.
 * Product copy is bilingual: English + Kurdish (Sorani).
 */

import { productImageSrc } from "./productImageMap.js";
import { BEAUTY_COLLECTIONS, collectionLabel } from "./beautyCollections.js";
import { L, searchBlob } from "../utils/locale.js";

import { FRENCH_PHARMACY_PRODUCTS } from "./catalog/frenchPharmacy.js";
import { KOREAN_BEAUTY_PRODUCTS } from "./catalog/koreanBeauty.js";
import { LUXURY_BEAUTY_PRODUCTS } from "./catalog/luxuryBeauty.js";
import { MAKEUP_PRODUCTS } from "./catalog/makeup.js";
import { HAIRCARE_PRODUCTS } from "./catalog/haircare.js";
import { NAILS_PRODUCTS } from "./catalog/nails.js";
import { FRAGRANCE_PRODUCTS } from "./catalog/fragrance.js";
import { BEAUTY_TOOLS_PRODUCTS } from "./catalog/beautyTools.js";

export { BEAUTY_COLLECTIONS, collectionLabel };

export const BEAUTY_CATEGORIES = [
  { id: "skincare", label: { en: "Skincare", ku: "چاودێری پێست" } },
  { id: "korean-beauty", label: { en: "Korean Beauty", ku: "جوانی کۆری" } },
  { id: "french-pharmacy", label: { en: "French Pharmacy", ku: "دەرمانخانەی فەڕەنسی" } },
  { id: "makeup", label: { en: "Makeup", ku: "میکاپ" } },
  { id: "haircare", label: { en: "Haircare", ku: "چاودێری قژ" } },
  { id: "lip-care", label: { en: "Lip Care", ku: "چاودێری لێو" } },
  { id: "sunscreens", label: { en: "Sunscreens", ku: "دژی خۆر" } },
  { id: "serums", label: { en: "Serums", ku: "سیرەم" } },
  { id: "cleansers", label: { en: "Cleansers", ku: "پاککەرەوە" } },
  { id: "moisturizers", label: { en: "Moisturizers", ku: "نەرمکەرەوە" } },
  { id: "fragrance", label: { en: "Fragrance", ku: "بۆن" } },
  { id: "nails", label: { en: "Nails", ku: "نینۆک" } },
  { id: "beauty-tools", label: { en: "Beauty Tools", ku: "ئامرازی جوانی" } },
];

const RAW = [
  ...FRENCH_PHARMACY_PRODUCTS,
  ...KOREAN_BEAUTY_PRODUCTS,
  ...LUXURY_BEAUTY_PRODUCTS,
  ...MAKEUP_PRODUCTS,
  ...HAIRCARE_PRODUCTS,
  ...NAILS_PRODUCTS,
  ...FRAGRANCE_PRODUCTS,
  ...BEAUTY_TOOLS_PRODUCTS,
];

const SKIN_LABELS = {
  oily: { en: "Oily skin", ku: "پێستی چەور" },
  combination: { en: "Combination skin", ku: "پێستی تێکەڵ" },
  dry: { en: "Dry skin", ku: "پێستی وشک" },
  sensitive: { en: "Sensitive skin", ku: "پێستی هەستیار" },
  normal: { en: "Normal skin", ku: "پێستی ئاسایی" },
};

function categoryLabel(id, lang = "en") {
  const cat = BEAUTY_CATEGORIES.find((c) => c.id === id);
  if (!cat) return id;
  return L(cat.label, lang) || id;
}

function withEnrichment(p) {
  const image = productImageSrc(p.id);
  const rating = 4.6 + ((p.id.charCodeAt(0) + p.id.length) % 5) * 0.08;
  const collections = new Set(p.collections || []);
  // Editorial collection enrichment from tags / category / brand signals
  if ((p.tags || []).includes("french-pharmacy") || p.category === "french-pharmacy") {
    collections.add("french-pharmacy");
  }
  if ((p.tags || []).includes("korean-beauty")) collections.add("korean-beauty");
  if ((p.tags || []).includes("luxury") || (p.collections || []).includes("luxury-beauty")) {
    collections.add("luxury-beauty");
  }
  if ((p.skinTypes || []).includes("sensitive")) collections.add("sensitive-skin");
  const concernBlob = searchBlob(p.concerns).toLowerCase();
  if (/acne|blemish|blackhead|pore|comedone|salicylic|clarity/.test(concernBlob)) {
    collections.add("acne-essentials");
  }
  if ((p.tags || []).includes("korean-beauty") && /hydrat|glow|glass|dehydrat|radiance|dew/.test(concernBlob + " " + searchBlob(p.benefits).toLowerCase())) {
    collections.add("glass-skin");
  }
  if (p.category === "haircare") collections.add("haircare");
  if (p.category === "fragrance") collections.add("fragrance");
  if (p.category === "nails") collections.add("nails");
  if (/cerave|elf|cosrx|the ordinary|tower 28|essie|opi/.test((p.brand || "").toLowerCase())) {
    collections.add("under-20");
  }
  if (collections.size === 0) collections.add("editors-picks");

  return {
    ...p,
    collections: [...collections],
    image,
    imageCredit: "Product photo",
    gallery: image ? [image] : [],
    rating: Math.min(5, Math.round(rating * 10) / 10),
  };
}

/** Resolve a product into a display object for the active language. */
export function localizeProduct(product, lang = "en") {
  if (!product) return null;
  const skinTypes = product.skinTypes || [];
  return {
    ...product,
    name: L(product.name, lang),
    description: L(product.description, lang),
    forWhom: L(product.forWhom, lang),
    benefits: L(product.benefits, lang),
    howToUse: L(product.howToUse, lang),
    concerns: L(product.concerns, lang),
    timeOfDay: L(product.timeOfDay, lang),
    texture: L(product.texture, lang),
    origin: L(product.origin, lang),
    avoid: L(product.avoid, lang),
    dermNotes: product.dermNotes ? L(product.dermNotes, lang) : "",
    hairTypes: product.hairTypes || [],
    categoryLabel: categoryLabel(product.category, lang),
    collectionLabels: (product.collections || []).map((id) => collectionLabel(id, lang)),
    perfectFor: skinTypes.map((s) => L(SKIN_LABELS[s] || { en: s, ku: s }, lang)),
    searchText: [
      searchBlob(product.name),
      product.brand,
      searchBlob(product.description),
      searchBlob(product.forWhom),
      searchBlob(product.concerns),
      (product.ingredients || []).join(" "),
      searchBlob(product.benefits),
      (product.collections || []).join(" "),
      (product.tags || []).join(" "),
    ]
      .join(" ")
      .toLowerCase(),
  };
}

let _catalog = null;

export function getBeautyProducts() {
  if (_catalog) return _catalog;
  const seen = new Set();
  const base = [];
  for (const raw of RAW) {
    if (!raw?.id || seen.has(raw.id)) continue;
    seen.add(raw.id);
    base.push(withEnrichment(raw));
  }
  _catalog = base.map((p) => {
    const similar =
      (p.similarAlternatives || []).length > 0
        ? p.similarAlternatives.slice(0, 4)
        : base
            .filter((x) => x.id !== p.id && (x.brand === p.brand || x.category === p.category))
            .slice(0, 4)
            .map((x) => x.id);
    const pairs =
      (p.pairsWith || []).length > 0
        ? p.pairsWith.slice(0, 4)
        : similar.slice(0, 3);
    return { ...p, similarProducts: similar, pairsWith: pairs };
  });
  return _catalog;
}

export function getLocalizedBeautyProducts(lang = "en") {
  return getBeautyProducts().map((p) => localizeProduct(p, lang));
}

export function getProductById(id) {
  return getBeautyProducts().find((p) => p.id === id) || null;
}

export function getLocalizedProductById(id, lang = "en") {
  return localizeProduct(getProductById(id), lang);
}

export function getProductsByCategory(category) {
  if (!category || category === "all") return getBeautyProducts();
  return getBeautyProducts().filter(
    (p) => p.category === category || (p.tags || []).includes(category),
  );
}

export function getProductsByCollection(collectionId) {
  if (!collectionId || collectionId === "all") return getBeautyProducts();
  return getBeautyProducts().filter((p) => (p.collections || []).includes(collectionId));
}

export function getFeaturedProducts(limit = 8) {
  return getBeautyProducts().slice(0, limit);
}

/** @deprecated shopping removed — returns featured educational picks */
export function getSponsoredProducts(limit = 4) {
  return getFeaturedProducts(limit);
}

export function getLibraryCount() {
  return getBeautyProducts().length;
}

export function matchesLibraryFilter(product, filterId) {
  if (!filterId || filterId === "all") return true;
  if (product.category === filterId) return true;
  if ((product.tags || []).includes(filterId)) return true;
  if ((product.collections || []).includes(filterId)) return true;
  return false;
}
