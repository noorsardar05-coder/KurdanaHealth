import { useMemo, useState } from "react";

function monthDays(year, month) {
  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function BeautyJournal({ t, entries, onSave }) {
  const today = new Date().toISOString().slice(0, 10);
  const now = new Date();
  const existing = (entries ?? []).find((e) => e.date === today);
  const [hydration, setHydration] = useState(existing?.hydration ?? 5);
  const [sleep, setSleep] = useState(existing?.sleep ?? 7);
  const [oiliness, setOiliness] = useState(existing?.oiliness ?? 5);
  const [breakouts, setBreakouts] = useState(existing?.breakouts ?? 2);
  const [sensitivity, setSensitivity] = useState(existing?.sensitivity ?? 3);
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const [selectedDay, setSelectedDay] = useState(today);

  const dated = useMemo(() => {
    const map = {};
    (entries ?? []).forEach((e) => {
      map[e.date] = e;
    });
    return map;
  }, [entries]);

  const cells = monthDays(now.getFullYear(), now.getMonth());
  const weekBars = (entries ?? []).slice(0, 7);
  const chartMetric = weekBars.map((e) => e.hydration ?? 0);
  const maxBar = Math.max(...chartMetric, 1);

  const handleSave = () => {
    const entry = {
      date: today,
      hydration,
      sleep,
      oiliness,
      breakouts,
      sensitivity,
      notes,
    };
    const rest = (entries ?? []).filter((e) => e.date !== today);
    onSave([entry, ...rest]);
  };

  const selectedEntry = dated[selectedDay];

  return (
    <section id="beauty-journal" className="bt-section">
      <h2 className="bt-section-title">{t("journalTitle")}</h2>
      <p className="bt-section-sub">{t("journalSub")}</p>

      <div className="bt-card bt-card--lux bt-journal-form">
        <p className="bt-section-label">{t("todayEntry")}</p>
        {[
          { label: t("sleep"), val: sleep, set: setSleep, max: 12 },
          { label: t("hydration"), val: hydration, set: setHydration, max: 10 },
          { label: t("oiliness"), val: oiliness, set: setOiliness, max: 10 },
          { label: t("sensitivity"), val: sensitivity, set: setSensitivity, max: 10 },
          { label: t("breakouts"), val: breakouts, set: setBreakouts, max: 10 },
        ].map((row) => (
          <div key={row.label} className="bt-slider-row">
            <label>
              <span>{row.label}</span>
              <span>{row.val}</span>
            </label>
            <input
              type="range"
              min={0}
              max={row.max}
              value={row.val}
              onChange={(e) => row.set(Number(e.target.value))}
            />
          </div>
        ))}
        <label className="bt-section-label" htmlFor="bt-notes">
          {t("notes")}
        </label>
        <textarea
          id="bt-notes"
          className="bt-textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={t("notesPh")}
        />
        <button type="button" className="bt-hero-cta bt-hero-cta--block" onClick={handleSave}>
          {t("saveEntry")}
        </button>
      </div>

      <div className="bt-card bt-card--lux">
        <p className="bt-section-label">{t("calendar")}</p>
        <div className="bt-calendar-grid">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={`${d}-${i}`} className="bt-calendar-dow">
              {d}
            </span>
          ))}
          {cells.map((day, i) => {
            if (!day) return <span key={`pad-${i}`} />;
            const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const has = !!dated[iso];
            const isToday = iso === today;
            const isSelected = iso === selectedDay;
            return (
              <button
                key={iso}
                type="button"
                className={`bt-calendar-day ${has ? "has-entry" : ""} ${isToday ? "is-today" : ""} ${isSelected ? "is-selected" : ""}`}
                onClick={() => setSelectedDay(iso)}
              >
                {day}
              </button>
            );
          })}
        </div>
        {selectedEntry ? (
          <p className="bt-calendar-note">
            {selectedDay}: {t("hydration")} {selectedEntry.hydration} · {t("sleep")} {selectedEntry.sleep}
            {selectedEntry.notes ? ` · ${selectedEntry.notes}` : ""}
          </p>
        ) : (
          <p className="bt-calendar-note">{t("noEntryDay")}</p>
        )}
      </div>

      <div className="bt-card bt-card--lux">
        <p className="bt-section-label">{t("weeklyProgress")}</p>
        {chartMetric.length ? (
          <div className="bt-chart-bars">
            {chartMetric.map((v, i) => (
              <div
                key={i}
                className="bt-chart-bar"
                style={{ height: `${Math.max(10, (v / maxBar) * 100)}%` }}
              />
            ))}
          </div>
        ) : (
          <p className="bt-empty">{t("emptyJournal")}</p>
        )}
      </div>
    </section>
  );
}
