import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { LITE_ORGANS } from "../../data/organLessons.js";

function t(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.en;
}

/** Compact organ lesson — right panel (desktop) / bottom sheet (mobile). */
export default function LiteOrganPanel({ organId, lang, onClose, onComplete }) {
  const organ = LITE_ORGANS[organId];
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setChallengeOpen(false);
    setDone(false);
  }, [organId]);

  if (!organ) return null;

  return (
    <aside className="bw-lite-panel" role="dialog" aria-label={t(organ.name, lang)}>
      <header className="bw-lite-panel__head">
        <div>
          <p className="bw-lite-panel__eyebrow">{lang === "ku" ? "ئەندام" : "Meet"}</p>
          <h2 className="bw-display" style={{ color: organ.accent }}>
            {t(organ.name, lang)}
          </h2>
        </div>
        <button type="button" className="bw-glass-btn" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>
      </header>

      <div className="bw-lite-panel__body">
        <section>
          <h3>{lang === "ku" ? "شوێن" : "Location"}</h3>
          <p>{t(organ.location, lang)}</p>
        </section>
        <section>
          <h3>{lang === "ku" ? "ئەرکی سەرەکی" : "Main role"}</h3>
          <p>{t(organ.role, lang)}</p>
        </section>
        <section>
          <h3>{lang === "ku" ? "ڕاستی سەرسوڕهێنەر" : "Amazing fact"}</h3>
          <p>{t(organ.fact, lang)}</p>
        </section>
        <section>
          <h3>{lang === "ku" ? "هەڵە باو" : "Misconception"}</h3>
          <p>{t(organ.myth, lang)}</p>
        </section>
        <section>
          <h3>{lang === "ku" ? "عادەتی تەندروست" : "Healthy habit"}</h3>
          <p>{t(organ.habit, lang)}</p>
        </section>

        <section className="bw-lite-panel__challenge">
          <h3>{lang === "ku" ? "بەرەنگاری بچووک" : "Tiny challenge"}</h3>
          {!challengeOpen ? (
            <button type="button" className="bw-glass-chip is-on" onClick={() => setChallengeOpen(true)}>
              {lang === "ku" ? "پیشانی بدە" : "Show challenge"}
            </button>
          ) : (
            <>
              <p>{t(organ.challenge, lang)}</p>
              {!done && (
                <button
                  type="button"
                  className="bw-glass-chip is-on"
                  onClick={() => {
                    setDone(true);
                    onComplete?.(organId);
                  }}
                >
                  {lang === "ku" ? "تەواو (+XP)" : "Done (+XP)"}
                </button>
              )}
              {done && <p className="bw-lite-panel__ok">{lang === "ku" ? "ئفرین!" : "Nice work."}</p>}
            </>
          )}
        </section>
      </div>
    </aside>
  );
}
