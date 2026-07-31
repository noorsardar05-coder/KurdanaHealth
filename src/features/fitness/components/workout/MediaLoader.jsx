import { useEffect, useState } from "react";
import { mediaUrl } from "../../utils/mediaLoader.js";

function resolveUrl(src) {
  if (!src) return "";
  if (src.startsWith("http") || src.startsWith("blob:")) return src;
  return mediaUrl(src);
}

function isVideoCandidate(candidate) {
  return candidate?.type === "video" || /\.(mp4|webm)$/i.test(candidate?.src || "");
}

export default function MediaLoader({ candidates, className, poster, compact }) {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("loading");

  const validCandidates = (candidates || []).filter((c) => c?.src && isVideoCandidate(c));

  useEffect(() => {
    setIndex(0);
    setStatus(validCandidates.length ? "loading" : "missing");
  }, [candidates, validCandidates.length]);

  const active = validCandidates[index] ?? null;

  const tryNext = () => {
    if (index + 1 >= validCandidates.length) {
      setStatus("missing");
      return;
    }
    setIndex((i) => i + 1);
    setStatus("loading");
  };

  const handleSuccess = () => setStatus("ready");

  if (status === "missing" || !active) {
    return null;
  }

  const url = resolveUrl(active.src);
  const thumb = poster ? resolveUrl(poster) : active.thumbnail ? resolveUrl(active.thumbnail) : undefined;

  return (
    <div className={`wp-media-video-wrap ${className || ""} ${status === "ready" ? "wp-media-video-wrap--ready" : ""}`}>
      {status === "loading" && (
        <div className="wp-media-loading">
          {thumb && <img className="wp-media-loading__poster" src={thumb} alt="" aria-hidden="true" />}
          <div className="wp-media-loading__ring" />
        </div>
      )}
      <video
        key={url}
        className="wp-media-video"
        src={url}
        poster={thumb}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={handleSuccess}
        onCanPlay={handleSuccess}
        onError={tryNext}
      />
    </div>
  );
}
