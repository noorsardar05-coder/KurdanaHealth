export const SEARCH_ENTRIES = [
  {
    q: ["liver location", "where is liver", "right upper abdomen"],
    title: "Where is the liver?",
    answer: "Upper right abdomen, mostly under the right diaphragm / costal margin.",
    organId: "liver",
  },
  {
    q: ["heart location", "left side heart", "where is heart"],
    title: "Where is the heart?",
    answer: "Mediastinum — mostly central, tip slightly left, between the lungs behind the sternum.",
    organId: "heart",
  },
  {
    q: ["appendix pain", "right lower", "appendicitis"],
    title: "Where is the appendix?",
    answer: "Usually right lower quadrant, arising from the cecum near McBurney's point.",
    organId: "appendix",
  },
  {
    q: ["kidney location", "flank", "back pain kidney"],
    title: "Where are the kidneys?",
    answer: "Retroperitoneal — posterior upper abdomen beside the spine, not in the front belly.",
    organId: "kidneys",
  },
  {
    q: ["stomach left", "upper left abdomen"],
    title: "Where is the stomach?",
    answer: "Upper left abdomen under the diaphragm.",
    organId: "stomach",
  },
  {
    q: ["brain skull", "inside head"],
    title: "Where is the brain?",
    answer: "Inside the cranial cavity, protected by skull and meninges.",
    organId: "brain",
  },
  {
    q: ["spinal cord", "spine nerves"],
    title: "Where is the spinal cord?",
    answer: "Inside the vertebral canal; in adults it usually ends around L1–L2.",
    organId: "spinalCord",
  },
  {
    q: ["lungs heart", "breathing"],
    title: "Where are the lungs?",
    answer: "Thoracic cavity on either side of the heart within the pleural sacs.",
    organId: "lungs",
  },
  {
    q: ["pancreas behind stomach"],
    title: "Where is the pancreas?",
    answer: "Retroperitoneal, behind the stomach, crossing the midline.",
    organId: "pancreas",
  },
  {
    q: ["spleen left"],
    title: "Where is the spleen?",
    answer: "Left upper quadrant under the left diaphragm.",
    organId: "spleen",
  },
];

export function searchBody(query) {
  const q = String(query || "")
    .trim()
    .toLowerCase();
  if (!q) return SEARCH_ENTRIES.slice(0, 6);
  return SEARCH_ENTRIES.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.answer.toLowerCase().includes(q) ||
      e.q.some((k) => k.includes(q) || q.includes(k))
  );
}
