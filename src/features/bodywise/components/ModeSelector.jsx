import { BODY_MODES } from "../data/organs.js";
import { MODE_ICONS } from "../data/modes.js";

export default function ModeSelector({ mode, setMode, orientation = "horizontal", lang = "en" }) {
  return (
    <div className={`bw-modes bw-modes--${orientation}`} role="tablist" aria-label="Body modes">
      {BODY_MODES.map((m) => {
        const Icon = MODE_ICONS[m.id];
        const label = typeof m.label === "string" ? m.label : m.label[lang] || m.label.en;
        return (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={mode === m.id}
            title={`${label}${m.shortcut ? ` (${m.shortcut})` : ""}`}
            className={`bw-mode ${mode === m.id ? "is-on" : ""}`}
            style={{ "--mode-tint": m.tint }}
            onClick={() => setMode(m.id)}
          >
            {Icon ? <Icon size={15} strokeWidth={2} aria-hidden /> : null}
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
