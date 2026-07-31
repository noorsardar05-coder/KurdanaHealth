import en from "./en.json";
import ckb from "./ckb.json";

const TABLES = { en, ku: ckb, ckb };

/**
 * Resolve nested UI keys. App language "ku" maps to Central Kurdish (ckb.json).
 * @param {string} key dot path e.g. "bodySystems.blood"
 * @param {"en"|"ku"|"ckb"} lang
 * @param {Record<string, string|number>|null} vars
 */
export function t(key, lang = "en", vars = null) {
  const table = TABLES[lang] || TABLES.en;
  const parts = key.split(".");
  let cur = table;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") {
      cur = undefined;
      break;
    }
    cur = cur[p];
  }
  if (typeof cur !== "string") {
    const fallback = TABLES.en;
    let f = fallback;
    for (const p of parts) f = f?.[p];
    cur = typeof f === "string" ? f : key;
  }
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      cur = cur.replace(`{${k}}`, String(v));
    });
  }
  return cur;
}

/**
 * Localize a bilingual field { en, ckb } or badge-like { en, ckb, id }.
 * If ckb is a TODO: key, return null so UI can show contentPending.
 */
export function L(field, lang = "en") {
  if (!field) return null;
  if (typeof field === "string") return field;
  const isKu = lang === "ku" || lang === "ckb";
  if (isKu) {
    const v = field.ckb ?? field.ku;
    if (typeof v === "string" && v.startsWith("TODO:")) return null;
    if (typeof v === "string" && v.trim()) return v;
  }
  if (typeof field.en === "string") return field.en;
  return null;
}

export function isPending(field, lang = "en") {
  const isKu = lang === "ku" || lang === "ckb";
  if (!isKu || !field || typeof field === "string") return false;
  const v = field.ckb ?? field.ku;
  return typeof v === "string" && v.startsWith("TODO:");
}
