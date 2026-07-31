import { useCallback, useMemo, useRef, useState } from "react";
import { Heart, Bookmark, Share2, X } from "lucide-react";
import { t } from "../i18n/strings.js";
import { pickDailyGalaxyStars } from "../data/galaxyMessages.js";
import {
  loadGalaxyFavorites,
  toggleGalaxyFavorite,
  toggleGalaxySave,
} from "../utils/storage.js";
import { softHaptic } from "../utils/haptics.js";

function L(lang, star) {
  return lang === "ku" ? star.ku : star.en;
}

export default function Track({ lang }) {
  const tx = (k) => t(k, lang);
  const stars = useMemo(() => pickDailyGalaxyStars(52), []);
  const [active, setActive] = useState(null);
  const [zoom, setZoom] = useState(null);
  const [favs, setFavs] = useState(() => loadGalaxyFavorites());
  const [shareMsg, setShareMsg] = useState("");
  const canvasRef = useRef(null);

  const bgStars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: `bg${i}`,
      x: (i * 37) % 100,
      y: (i * 53) % 100,
      s: 1 + (i % 3),
      o: 0.15 + (i % 5) * 0.08,
      d: (i % 7) * 0.4,
    }));
  }, []);

  function openStar(star) {
    softHaptic();
    setZoom({ x: star.x, y: star.y });
    setActive(star);
    setShareMsg("");
  }

  function close() {
    setActive(null);
    setZoom(null);
    setShareMsg("");
  }

  const isSaved = active && (favs.saved || []).includes(active.id);
  const isFav = active && (favs.favorites || []).includes(active.id);

  const shareAsImage = useCallback(async () => {
    if (!active) return;
    softHaptic();
    const canvas = canvasRef.current || document.createElement("canvas");
    canvasRef.current = canvas;
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    const g = ctx.createRadialGradient(540, 400, 40, 540, 540, 700);
    g.addColorStop(0, "#3d2a6b");
    g.addColorStop(0.45, "#1a1035");
    g.addColorStop(1, "#07060f");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 1080, 1080);

    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${0.2 + (i % 5) * 0.1})`;
      ctx.arc((i * 97) % 1080, (i * 61) % 1080, 1 + (i % 3), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.beginPath();
    ctx.fillStyle = "#ffe9a8";
    ctx.shadowColor = "#ffd76a";
    ctx.shadowBlur = 40;
    ctx.arc(540, 320, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.font = "600 42px Georgia, serif";
    ctx.textAlign = "center";
    const text = L(lang, active);
    const words = text.split(" ");
    let line = "";
    let y = 480;
    const maxW = 820;
    for (let n = 0; n < words.length; n++) {
      const test = line + words[n] + " ";
      if (ctx.measureText(test).width > maxW && n > 0) {
        ctx.fillText(line.trim(), 540, y);
        line = words[n] + " ";
        y += 58;
      } else line = test;
    }
    ctx.fillText(line.trim(), 540, y);

    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.font = "28px sans-serif";
    ctx.fillText(lang === "ku" ? "کوردانا · شوێنێکی ئارام" : "Kurdana · Safe Space", 540, 980);

    try {
      const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
      if (blob && navigator.share && navigator.canShare?.({ files: [new File([blob], "galaxy.png", { type: "image/png" })] })) {
        await navigator.share({
          files: [new File([blob], "kurdana-galaxy.png", { type: "image/png" })],
          title: "Kurdana Galaxy",
        });
      } else {
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "kurdana-galaxy.png";
        a.click();
      }
      setShareMsg(tx("galaxyShared"));
    } catch {
      try {
        await navigator.clipboard.writeText(L(lang, active));
        setShareMsg(tx("galaxyCopied"));
      } catch {
        setShareMsg(tx("galaxyCopied"));
      }
    }
  }, [active, lang]);

  return (
    <section className="mh-galaxy-page">
      <header className="mh-galaxy-page__head">
        <h2 className="mh-display">{tx("galaxyTitle")}</h2>
        <p>{tx("galaxySub")}</p>
        <p className="mh-galaxy-page__hint">{tx("galaxyTap")}</p>
      </header>

      <div
        className={`mh-night ${zoom ? "is-zoom" : ""}`}
        style={
          zoom
            ? {
                "--zoom-x": `${zoom.x}%`,
                "--zoom-y": `${zoom.y}%`,
              }
            : undefined
        }
      >
        <div className="mh-night__nebula mh-night__nebula--a" aria-hidden="true" />
        <div className="mh-night__nebula mh-night__nebula--b" aria-hidden="true" />
        <div className="mh-night__nebula mh-night__nebula--c" aria-hidden="true" />
        <div className="mh-night__particles" aria-hidden="true" />

        <svg className="mh-night__constellations" aria-hidden="true">
          {stars.slice(0, 12).map((s, i) => {
            const n = stars[(i + 3) % stars.length];
            return (
              <line
                key={`line-${s.id}`}
                x1={`${s.x}%`}
                y1={`${s.y}%`}
                x2={`${n.x}%`}
                y2={`${n.y}%`}
                stroke="rgba(200,180,255,0.12)"
                strokeWidth="1"
              />
            );
          })}
        </svg>

        {bgStars.map((s) => (
          <span
            key={s.id}
            className="mh-night__dust"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.s,
              height: s.s,
              opacity: s.o,
              animationDelay: `${s.d}s`,
            }}
          />
        ))}

        {stars.map((star) => (
          <button
            key={star.id}
            type="button"
            className={`mh-glow-star ${active?.id === star.id ? "is-active" : ""}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.twinkle?.delay || 0}s`,
              animationDuration: `${star.twinkle?.duration || 3}s`,
            }}
            aria-label={L(lang, star)}
            onClick={() => openStar(star)}
          />
        ))}
      </div>

      {active && (
        <div className="mh-star-modal" role="dialog" aria-modal="true" onClick={close}>
          <div
            className="mh-star-modal__sheet glass"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="mh-star-modal__x" onClick={close} aria-label={tx("close")}>
              <X size={18} />
            </button>
            <div className="mh-star-modal__orb" aria-hidden="true" />
            <p className="mh-display mh-star-modal__msg">{L(lang, active)}</p>
            <div className="mh-star-modal__actions">
              <button
                type="button"
                className={`mh-pill ${isSaved ? "mh-pill--accent" : ""}`}
                onClick={() => {
                  softHaptic();
                  setFavs(toggleGalaxySave(active.id));
                }}
              >
                <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
                {isSaved ? tx("saved") : tx("save")}
              </button>
              <button
                type="button"
                className={`mh-pill ${isFav ? "mh-pill--accent" : ""}`}
                onClick={() => {
                  softHaptic();
                  setFavs(toggleGalaxyFavorite(active.id));
                }}
              >
                <Heart size={15} fill={isFav ? "currentColor" : "none"} />
                {isFav ? tx("favorited") : tx("favorite")}
              </button>
              <button type="button" className="mh-pill" onClick={shareAsImage}>
                <Share2 size={15} />
                {tx("share")}
              </button>
            </div>
            {shareMsg ? <p className="mh-muted">{shareMsg}</p> : null}
            <button type="button" className="mh-ghost-cta" onClick={close}>
              {tx("close")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
