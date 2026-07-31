import { useState } from "react";
import { t } from "../i18n/strings.js";
import { organizeBrainDump } from "../utils/ai.js";
import { softHaptic } from "../utils/haptics.js";

/** Local brain dump sorter — on-device only, not AI. */
export default function BrainDump({ lang }) {
  const tx = (k) => t(k, lang);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [sorted, setSorted] = useState(null);

  function run() {
    if (!text.trim() || busy) return;
    softHaptic();
    setBusy(true);
    setSorted(null);
    window.setTimeout(() => {
      setSorted(organizeBrainDump(text, lang));
      setBusy(false);
    }, 700);
  }

  const blocks = sorted
    ? [
        ["canControl", sorted.can],
        ["cannotControl", sorted.cannot],
        ["tomorrow", sorted.tomorrow],
        ["letGo", sorted.letGo],
        ["wins", sorted.wins],
      ]
    : [];

  return (
    <section className="mh-panel">
      <h2 className="mh-display mh-panel__title">{tx("dump")}</h2>
      <textarea
        className="mh-textarea mh-textarea--tall"
        placeholder={tx("dumpPh")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        dir={lang === "ku" ? "rtl" : "ltr"}
      />
      <button type="button" className="mh-big-cta" onClick={run} disabled={!text.trim() || busy}>
        {busy ? tx("sorting") : tx("dumpDone")}
      </button>

      {busy && (
        <div className="mh-sort-anim" aria-hidden="true">
          <span /><span /><span />
        </div>
      )}

      {sorted && (
        <div className="mh-dump-out">
          {blocks.map(([key, items]) => (
            <div key={key} className="mh-dump-block">
              <h3>{tx(key)}</h3>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mh-dump-next">
            <h3>{tx("nextStep")}</h3>
            <p>{sorted.next}</p>
          </div>
        </div>
      )}
    </section>
  );
}
