/** Pick English or Kurdish (Sorani) from bilingual fields. */
export function L(value, lang = "en") {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value.map((item) => L(item, lang)).filter(Boolean);
  }
  if (typeof value === "object") {
    const key = lang === "ku" ? "ku" : "en";
    if (value[key] != null) return value[key];
    if (value.en != null) return value.en;
  }
  return "";
}

/** Normalize any bilingual or plain string for search (both languages). */
export function searchBlob(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(searchBlob).join(" ");
  if (typeof value === "object") {
    return [value.en, value.ku].filter(Boolean).join(" ");
  }
  return String(value);
}

export function bi(en, ku) {
  return { en, ku: ku || en };
}
