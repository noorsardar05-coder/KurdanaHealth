import { MODE_ICONS } from "../data/modes.js";
import { LITE_MODES } from "../data/liteLayers.js";

export default function FloatingModes({ mode, setMode, lang }) {
  return (
    <div className="bw-float-modes" role="toolbar" aria-label="Body systems">
      {LITE_MODES.map((m) => {
        const Icon = MODE_ICONS[m.id];
        const label = typeof m.label === "string" ? m.label : m.label[lang] || m.label.en;
        return (
          <button
            key={m.id}
            type="button"
            className={`bw-float-mode ${mode === m.id ? "is-on" : ""}`}
            style={{ ["--mode-tint"]: m.tint }}
            onClick={() => setMode(m.id)}
            title={`${label} (${m.shortcut})`}
            aria-pressed={mode === m.id}
          >
            {Icon ? <Icon size={16} strokeWidth={1.75} /> : null}
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
