import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { searchBody } from "../data/search.js";
import { s } from "../data/ui.js";
import { useLanguage } from "../../../context/LanguageContext.jsx";

export default function SearchOverlay({ onClose, onOpenOrgan }) {
  const { language } = useLanguage();
  const lang = language === "ku" ? "ku" : "en";
  const [q, setQ] = useState("");
  const results = useMemo(() => searchBody(q), [q]);

  return (
    <div className="bw-search">
      <div className="bw-search__bar">
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={s(lang, "search")}
          aria-label={s(lang, "search")}
        />
        <button type="button" className="bw-overlay-close" onClick={onClose} aria-label={s(lang, "close")}>
          <X size={16} />
        </button>
      </div>
      <div className="bw-search__results">
        {results.map((r) => (
          <button
            key={r.title}
            type="button"
            className="bw-tile"
            onClick={() => {
              if (r.organId) onOpenOrgan?.(r.organId);
              onClose?.();
            }}
          >
            <p className="bw-tile__title">{r.title}</p>
            <p className="bw-tile__sub">{r.answer}</p>
          </button>
        ))}
        {!results.length && <p className="bw-rail__empty">{s(lang, "noResults")}</p>}
      </div>
    </div>
  );
}
