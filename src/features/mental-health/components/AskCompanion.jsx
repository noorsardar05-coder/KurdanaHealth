import { useState } from "react";
import { t } from "../i18n/strings.js";
import {
  MIRROR_MODES,
  formatMirrorReply,
  mirrorThought,
} from "../utils/thoughtMirror/engine.js";
import CompanionOrb from "./CompanionOrb.jsx";

/** Kurdana Thought Mirror sheet — local active reframer, not AI. */
export default function AskCompanion({ lang, state, onClose }) {
  const tx = (k) => t(k, lang);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [mirrorMode, setMirrorMode] = useState("coach");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text:
        lang === "ku"
          ? "لێرە دەتوانیت بیرێکی قورس بنووسیت. لەگەڵت دەمێنمەوە، بە نەرمی تاقی دەکەمەوە، و یەک هەنگاوی میهرەبان پێشنیار دەکەم."
          : "You can write a heavy thought here. I'll sit with it, challenge it gently, and offer one kind next step.",
    },
  ]);

  function send() {
    if (!q.trim() || busy) return;
    const user = q.trim();
    setQ("");
    setBusy(true);
    setMessages((m) => [...m, { role: "user", text: user }]);

    window.setTimeout(() => {
      const out = mirrorThought({ text: user, lang, mirrorMode, variant: "" });
      if (out.urgent) {
        setUrgent(true);
        setMessages((m) => [
          ...m,
          { role: "ai", text: tx("mirrorUrgentBody"), meta: { urgent: true } },
        ]);
        setBusy(false);
        return;
      }
      setUrgent(false);
      setMessages((m) => [
        ...m,
        { role: "ai", text: formatMirrorReply(out, lang), meta: { category: out.category } },
      ]);
      setBusy(false);
    }, 400);
  }

  return (
    <div
      className={`mh mh-ask-root ${lang === "ku" ? "is-ku" : ""} mood-${state.mood || "unknown"} ${state.darkMode ? "is-dark" : ""}`}
    >
      <div className="mh-ask" role="dialog" aria-modal="true">
        <div className="mh-ask__sheet">
          <header className="mh-ask__head">
            <CompanionOrb size="sm" mood={state.mood} speaking={busy} />
            <div>
              <strong className="mh-display">{tx("askTitle")}</strong>
              <p className="mh-muted">{tx("mirrorPrivateDevice")}</p>
            </div>
            <button type="button" className="mh-icon-btn" onClick={onClose}>
              {tx("close")}
            </button>
          </header>

          <div className="mh-mode-row mh-mode-row--sheet" role="tablist">
            {MIRROR_MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`mh-mode-chip ${mirrorMode === m.id ? "is-on" : ""}`}
                onClick={() => setMirrorMode(m.id)}
              >
                <span aria-hidden="true">{m.icon}</span>
                {lang === "ku" ? m.label.ku : m.label.en}
              </button>
            ))}
          </div>

          {urgent && (
            <div className="mh-urgent mh-urgent--sheet" role="alert">
              <p>{tx("mirrorUrgentBody")}</p>
              <p className="mh-muted">{tx("mirrorUrgentNote")}</p>
            </div>
          )}

          <div className="mh-ask__thread">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`mh-bubble mh-bubble--${m.role}${m.meta?.urgent ? " mh-bubble--urgent" : ""}`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="mh-ask__composer">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tx("askPh")}
              disabled={busy}
              dir={lang === "ku" ? "rtl" : "ltr"}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button type="button" className="mh-pill mh-pill--accent" onClick={send} disabled={busy}>
              {tx("send")}
            </button>
          </div>
          <p className="mh-ask__privacy">{tx("mirrorStaysHere")}</p>
        </div>
      </div>
    </div>
  );
}
