/**
 * Map camera beauty observations → Beauty Library product picks (educational).
 * Includes a short “why it may suit” note — never disease-treatment claims.
 */
import { getBeautyProducts, localizeProduct } from "../data/beautyProducts.js";
import { searchBlob } from "./locale.js";

const FOCUS_QUERIES = {
  clarity: ["niacinamide", "salicylic", "foaming", "sebium", "effaclar", "cleanser"],
  balance: ["lightweight", "gel", "mattify", "oil", "combination"],
  hydration: ["hyaluronic", "hydrating", "moisture", "water", "glycerin"],
  barrier: ["ceramide", "cicaplast", "panthenol", "barrier", "cica"],
  calm: ["centella", "heartleaf", "thermal", "sensitive", "fragrance-free", "soothing", "toleriane"],
  gentleCare: ["eye", "gentle", "soft", "caffeine"],
  softPolish: ["aha", "bha", "exfoliat", "toner", "pha"],
  radiance: ["vitamin c", "brighten", "glow", "niacinamide", "tone"],
  dailyBasics: ["sunscreen", "spf", "moisturizer", "cleanser"],
};

function haystack(product) {
  return [
    product.brand,
    searchBlob(product.name),
    searchBlob(product.description),
    (product.ingredients || []).join(" "),
    (product.tags || []).join(" "),
    product.category,
    searchBlob(product.benefits),
  ]
    .join(" ")
    .toLowerCase();
}

function scoreProduct(product, needles) {
  const hay = haystack(product);
  let score = 0;
  for (const n of needles) {
    if (hay.includes(n.toLowerCase())) score += 2;
  }
  return score;
}

function dominantObservationKinds(observations = []) {
  const kinds = [];
  for (const o of observations) {
    if (o.kind === "shine" && (o.level === "moderate" || o.level === "high")) kinds.push("shine");
    if (o.kind === "dryness" && (o.level === "slight" || o.level === "moderate")) kinds.push("dryness");
    if (o.kind === "redness" && o.level !== "notVisible" && o.level !== "unable") kinds.push("redness");
    if (o.kind === "underEye" && o.level !== "notVisible" && o.level !== "unable") kinds.push("underEye");
    if (o.kind === "texture" && (o.level === "some" || o.level === "more")) kinds.push("texture");
    if (o.kind === "tone" && (o.level === "slight" || o.level === "moderate")) kinds.push("tone");
  }
  return [...new Set(kinds)];
}

function whyForProduct(product, observationKinds, t) {
  const hay = haystack(product);
  if (observationKinds.includes("shine")) {
    if (hay.includes("niacinamide") || hay.includes("sebium") || hay.includes("effaclar") || hay.includes("foaming")) {
      return t("camWhyShine");
    }
  }
  if (observationKinds.includes("dryness")) {
    if (hay.includes("hyaluronic") || hay.includes("ceramide") || hay.includes("hydrat") || hay.includes("barrier")) {
      return t("camWhyDry");
    }
  }
  if (observationKinds.includes("redness")) {
    if (
      hay.includes("centella") ||
      hay.includes("cica") ||
      hay.includes("sensitive") ||
      hay.includes("sooth") ||
      hay.includes("toleriane")
    ) {
      return t("camWhyRed");
    }
  }
  if (observationKinds.includes("underEye") && (hay.includes("eye") || hay.includes("caffeine"))) {
    return t("camWhyEye");
  }
  if (hay.includes("spf") || hay.includes("sunscreen") || hay.includes("sun ")) {
    return t("camWhySpf");
  }
  return t("camWhyDefault");
}

export function matchProductsForObservations(observations, routineFocus = [], lang = "en", limit = 4, t = (k) => k) {
  const products = getBeautyProducts();
  const needles = new Set();
  for (const focus of routineFocus) {
    (FOCUS_QUERIES[focus] || []).forEach((n) => needles.add(n));
  }
  for (const o of observations || []) {
    if (o.kind === "shine" && (o.level === "moderate" || o.level === "high")) {
      FOCUS_QUERIES.clarity.forEach((n) => needles.add(n));
      FOCUS_QUERIES.balance.forEach((n) => needles.add(n));
    }
    if (o.kind === "dryness" && (o.level === "slight" || o.level === "moderate")) {
      FOCUS_QUERIES.hydration.forEach((n) => needles.add(n));
      FOCUS_QUERIES.barrier.forEach((n) => needles.add(n));
    }
    if (o.kind === "redness" && o.level !== "notVisible" && o.level !== "unable") {
      FOCUS_QUERIES.calm.forEach((n) => needles.add(n));
    }
    if (o.kind === "underEye" && o.level !== "notVisible" && o.level !== "unable") {
      FOCUS_QUERIES.gentleCare.forEach((n) => needles.add(n));
    }
  }
  if (!needles.size) FOCUS_QUERIES.dailyBasics.forEach((n) => needles.add(n));

  needles.add("spf");
  needles.add("sunscreen");

  const kinds = dominantObservationKinds(observations);

  return products
    .map((p) => ({ p, score: scoreProduct(p, [...needles]) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => {
      const loc = localizeProduct(x.p, lang);
      return {
        ...loc,
        whySuit: whyForProduct(x.p, kinds, t),
        matchSource: "camera",
      };
    });
}

export function helpsForObservation(kind, t) {
  const map = {
    shine: [t("camHelpShine1"), t("camHelpShine2"), t("camHelpShine3")],
    dryness: [t("camHelpDry1"), t("camHelpDry2"), t("camHelpDry3")],
    redness: [t("camHelpRed1"), t("camHelpRed2"), t("camHelpRed3")],
    underEye: [t("camHelpEye1"), t("camHelpEye2")],
    texture: [t("camHelpTex1"), t("camHelpTex2")],
    tone: [t("camHelpTone1"), t("camHelpTone2")],
    lightBalance: [t("camHelpLight1"), t("camHelpLight2")],
  };
  return map[kind] || [t("camHelpDefault")];
}
