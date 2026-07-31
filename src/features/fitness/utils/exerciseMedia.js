import { attachExerciseMedia, getExerciseMedia } from "../../../data/exerciseMedia.js";

export { slugify, getMediaSlugs } from "./exerciseMediaSlugs.js";
export { attachExerciseMedia, getExerciseMedia };

/** @deprecated Use attachExerciseMedia from src/data/exerciseMedia.js */
export function enrichExerciseMedia(ex, manifest = {}) {
  return attachExerciseMedia(ex, manifest);
}

/** @deprecated Use getExerciseMedia */
export function resolveExerciseMedia(ex, manifest = {}) {
  const media = getExerciseMedia(ex, manifest);
  return {
    candidates: media.candidates || [],
    slug: ex.mediaSlug || ex.animationType || ex.id,
  };
}

/** @deprecated Use getExerciseMedia */
export function buildMediaCandidates(ex, manifest = {}) {
  return getExerciseMedia(ex, manifest).candidates || [];
}
