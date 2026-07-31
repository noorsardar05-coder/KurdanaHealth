import { useMemo, useState } from "react";
import { t } from "../i18n/strings.js";
import { JOURNAL_PROMPTS } from "../data/content.js";
import { dateKey, loadJournal, saveJournal } from "../utils/storage.js";
import { softHaptic } from "../utils/haptics.js";

export default function Journal({ lang }) {
  const tx = (k) => t(k, lang);
  const prompt = useMemo(() => {
    const i = new Date().getDate() % JOURNAL_PROMPTS.length;
    return JOURNAL_PROMPTS[i];
  }, []);
  const [text, setText] = useState("");
  const [entries, setEntries] = useState(() => loadJournal());
  const [flash, setFlash] = useState(false);

  function save() {
    if (!text.trim()) return;
    softHaptic();
    const next = [
      {
        id: Date.now(),
        day: dateKey(),
        prompt: lang === "ku" ? prompt.ku : prompt.en,
        text: text.trim(),
      },
      ...entries,
    ].slice(0, 40);
    setEntries(next);
    saveJournal(next);
    setText("");
    setFlash(true);
    setTimeout(() => setFlash(false), 1600);
  }

  return (
    <section className="mh-panel">
      <h2 className="mh-display mh-panel__title">{tx("journalTitle")}</h2>
      <p className="mh-panel__sub">{tx("journalSub")}</p>
      <p className="mh-journal-prompt mh-display">{lang === "ku" ? prompt.ku : prompt.en}</p>
      <textarea
        className="mh-textarea"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="…"
      />
      <button type="button" className="mh-big-cta" onClick={save} disabled={!text.trim()}>
        {tx("saveEntry")}
      </button>
      {flash && <p className="mh-muted">{tx("saved")}</p>}
      <ul className="mh-journal-list">
        {entries.slice(0, 8).map((e) => (
          <li key={e.id}>
            <span>{e.day}</span>
            <p>{e.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
