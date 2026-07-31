import { getExerciseMedia } from "../../../../data/exerciseMedia.js";
import MediaLoader from "./MediaLoader.jsx";

export default function ExerciseMediaPlayer({ exercise, className, variant = "fullscreen" }) {
  if (!exercise) return null;

  const resolved = exercise.mediaCandidates?.length
    ? { candidates: exercise.mediaCandidates }
    : getExerciseMedia(exercise);

  const candidates = resolved.candidates || [];
  const isThumb = variant === "thumbnail";

  return (
    <div className={`wp-media-player wp-media-player--${variant} ${className || ""}`}>
      <MediaLoader candidates={candidates} className="wp-media-player__inner" compact={isThumb} />
      {!isThumb && <div className="wp-media-player__vignette" aria-hidden="true" />}
    </div>
  );
}
