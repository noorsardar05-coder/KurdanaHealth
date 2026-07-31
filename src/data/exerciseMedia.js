/**
 * Production exercise media resolver.
 *
 * Production exercises carry one explicit, verified media asset. There are no
 * category, keyword, mannequin, or placeholder substitutions: an exercise
 * without its exact video is unsupported and must not enter the app.
 */

const UNAVAILABLE_MEDIA = Object.freeze({
  type: "unavailable",
  src: "",
  thumbnail: "",
  source: "unavailable",
  candidates: [],
});

function isVerifiedMedia(media) {
  return (
    media?.type === "video" &&
    typeof media.src === "string" &&
    /^https:\/\//.test(media.src) &&
    typeof media.thumbnail === "string" &&
    /^https:\/\//.test(media.thumbnail) &&
    media.source === "production-verified"
  );
}

export function hasVerifiedExerciseMedia(exercise) {
  return Boolean(exercise && isVerifiedMedia(exercise.media));
}

export function getExerciseMedia(exercise) {
  if (!hasVerifiedExerciseMedia(exercise)) return UNAVAILABLE_MEDIA;

  const media = {
    type: "video",
    src: exercise.media.src,
    thumbnail: exercise.media.thumbnail,
    source: exercise.media.source,
  };

  return { ...media, candidates: [media] };
}

export function attachExerciseMedia(exercise) {
  const resolved = getExerciseMedia(exercise);
  if (!resolved.candidates.length) return null;

  return {
    ...exercise,
    media: {
      type: resolved.type,
      src: resolved.src,
      thumbnail: resolved.thumbnail,
      source: resolved.source,
    },
    mediaCandidates: resolved.candidates,
    mediaSlug: exercise.id,
  };
}
