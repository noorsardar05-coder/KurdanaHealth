/**
 * Lightweight BodyWise — coordinated anatomical layers.
 * All layers share viewBox 0 0 360 820 (anterior / posterior).
 *
 * Coordinate system (standard anatomical front view facing the viewer):
 * - Patient's RIGHT = image LEFT
 * - Patient's LEFT = image RIGHT
 *
 * Positions follow standard surface anatomy / abdominal quadrants.
 * Illustrations are original educational diagrams for Kurdana Health (Medico2026),
 * not a scan of a commercial atlas. See public/bodywise/layers/ATTRIBUTION.md
 */

export const VIEWBOX = "0 0 360 820";
export const BODY_W = 360;
export const BODY_H = 820;

/** Which layer groups are dominant / supporting for each mode */
export const LITE_MODE_LAYERS = {
  organs: { dominant: ["organs"], support: ["silhouette"], dim: ["skeleton"] },
  skeleton: { dominant: ["skeleton"], support: ["silhouette"], dim: [] },
  muscle: { dominant: ["muscles"], support: ["silhouette"], dim: ["skeleton"] },
  blood: { dominant: ["vessels"], support: ["silhouette", "organs"], dim: [] },
  nervous: { dominant: ["nervous"], support: ["silhouette"], dim: ["skeleton"] },
  respiratory: { dominant: ["respiratory"], support: ["silhouette"], dim: ["organs"] },
  digestive: { dominant: ["digestive"], support: ["silhouette"], dim: [] },
  endocrine: { dominant: ["organs"], support: ["silhouette"], dim: [] },
  immune: { dominant: ["organs"], support: ["silhouette"], dim: [] },
};

export const LITE_MODES = [
  { id: "organs", label: { en: "Organs", ku: "ئەندامەکان" }, tint: "#7ec8e3", shortcut: "1" },
  { id: "skeleton", label: { en: "Skeleton", ku: "ئێسک" }, tint: "#e8e4dc", shortcut: "2" },
  { id: "muscle", label: { en: "Muscles", ku: "ماسوولکە" }, tint: "#e07a5f", shortcut: "3" },
  { id: "blood", label: { en: "Vessels", ku: "خوێنبەر" }, tint: "#c41e3a", shortcut: "4" },
  { id: "nervous", label: { en: "Nervous", ku: "دەمار" }, tint: "#9b7ede", shortcut: "5" },
  { id: "respiratory", label: { en: "Breath", ku: "هەناسە" }, tint: "#5dade2", shortcut: "6" },
  { id: "digestive", label: { en: "Digest", ku: "هەرس" }, tint: "#2a9d8f", shortcut: "7" },
];

/** Puzzle drop zones — anatomically correct regions (same viewBox) */
export const PUZZLE_ZONES = [
  { id: "heart", accepts: ["heart"], label: { en: "Chest, slightly left", ku: "سنگ، کەمێک چەپ" }, cx: 188, cy: 248 },
  { id: "lungs", accepts: ["lungs"], label: { en: "Either side of heart", ku: "هەردوو لای دڵ" }, cx: 180, cy: 240 },
  { id: "liver", accepts: ["liver"], label: { en: "Upper-right abdomen", ku: "سەرەوەی ڕاستی سک" }, cx: 130, cy: 318 },
  { id: "stomach", accepts: ["stomach"], label: { en: "Upper-left abdomen", ku: "سەرەوەی چەپی سک" }, cx: 210, cy: 312 },
  { id: "kidneys", accepts: ["kidneys"], label: { en: "Flanks / mid-back", ku: "لا و ناوەڕاستی پشت" }, cx: 180, cy: 360 },
];
