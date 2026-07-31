import { useEffect, useRef, useState } from "react";
import { getExerciseMedia } from "../../../data/exerciseMedia.js";
import { mediaUrl } from "../utils/mediaLoader.js";

function resolveUrl(src) {
  if (!src) return "";
  if (src.startsWith("http") || src.startsWith("blob:")) return src;
  return mediaUrl(src);
}

export default function ExerciseMediaPreview({ exercise, className, onUnavailable }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("loading");
  const [inView, setInView] = useState(false);

  const media = getExerciseMedia(exercise);
  const candidates = (media.candidates || []).filter((c) => c?.src && c.type === "video");
  const active = candidates[index] ?? null;

  useEffect(() => {
    setIndex(0);
    setStatus(candidates.length ? "loading" : "missing");
  }, [exercise?.id, candidates.length]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, active?.src]);

  const tryNext = () => {
    if (index + 1 >= candidates.length) {
      if (import.meta.env.DEV) console.warn("[ExerciseMedia] Missing media for:", exercise?.id, exercise?.nameEn);
      setStatus("missing");
      onUnavailable?.(exercise?.id);
      return;
    }
    setIndex((i) => i + 1);
    setStatus("loading");
  };

  if (status === "missing" || !active) {
    return null;
  }

  const url = resolveUrl(active.src);
  const poster = active.thumbnail ? resolveUrl(active.thumbnail) : undefined;
  const isVideo = active.type === "video" || /\.(mp4|webm)$/i.test(url);

  return (
    <div className={`el-media ${className || ""} ${status === "ready" ? "el-media--ready" : ""}`} ref={wrapRef}>
      {status === "loading" && (
        <div className="el-media__loader" aria-hidden="true">
          {poster && <img className="el-media__poster" src={poster} alt="" />}
          <div className="el-media__spinner" />
        </div>
      )}
      {isVideo ? (
        <video
          ref={videoRef}
          key={url}
          className="el-media__video"
          src={url}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setStatus("ready")}
          onCanPlay={() => setStatus("ready")}
          onError={tryNext}
        />
      ) : (
        <img
          key={url}
          className="el-media__img"
          src={url}
          alt=""
          onLoad={() => setStatus("ready")}
          onError={tryNext}
        />
      )}
    </div>
  );
}
