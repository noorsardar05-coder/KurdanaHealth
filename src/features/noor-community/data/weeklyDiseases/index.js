import ironDeficiency from "./iron-deficiency-anemia.json";
import asthma from "./asthma.json";

/** Registry — add a new weekly disease by importing one JSON file and appending here. */
export const WEEKLY_DISEASES = [ironDeficiency, asthma];

export function getDiseaseById(id) {
  return WEEKLY_DISEASES.find((d) => d.id === id || d.slug === id) || null;
}

export function getDiseaseBySlug(slug) {
  return WEEKLY_DISEASES.find((d) => d.slug === slug) || null;
}
