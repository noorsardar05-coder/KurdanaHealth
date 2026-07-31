import { useCallback, useMemo, useState } from "react";
import { getAntibioticsUserKey } from "../../../utils/storage.js";

const LEGACY_SYM = {
  fever: "sym_fever", cough: "sym_cough", soreThroat: "sym_soreThroat",
  runnyNose: "sym_runnyNose", bodyAches: "sym_bodyAches", fatigue: "sym_fatigue",
  headache: "sym_headache", chills: "sym_chills", chest: "sym_chest",
  breath: "sym_breath", ear: "sym_ear", sinus: "sym_sinus",
  nausea: "sym_nausea", vomit: "sym_vomit", diarrhea: "sym_diarrhea",
};

function keyTracker(uk) {
  return `kurdana_antibiotics_tracker_${uk}`;
}

function normalizeEntry(e, idx, t) {
  const id = e.id ?? `legacy_${e.date ?? idx}`;
  let symptomsText = "";
  if (typeof e.symptoms === "object" && e.symptoms) {
    symptomsText = Object.keys(e.symptoms)
      .filter((k) => e.symptoms[k])
      .map((k) => t(LEGACY_SYM[k] || `sym_${k}`))
      .join(", ");
  } else symptomsText = e.symptoms || "";
  return { ...e, id, symptomsText };
}

function load(uk, t) {
  try {
    let raw = localStorage.getItem(keyTracker(uk));
    if (!raw) {
      const leg = localStorage.getItem("kurdana_afs_flu_v2");
      if (leg) {
        localStorage.setItem(keyTracker(uk), leg);
        raw = leg;
      }
    }
    const arr = raw ? JSON.parse(raw) : [];
    return (Array.isArray(arr) ? arr : []).map((e, i) => normalizeEntry(e, i, t));
  } catch {
    return [];
  }
}

function save(uk, entries) {
  try {
    localStorage.setItem(keyTracker(uk), JSON.stringify(entries));
  } catch {
    /* ignore */
  }
}

export function useFluTracker(t) {
  const uk = getAntibioticsUserKey();
  const [entries, setEntries] = useState(() => load(uk, t));

  const refresh = useCallback(() => setEntries(load(uk, t)), [uk, t]);

  const addEntry = useCallback(
    (entry) => {
      const next = [...entries, { ...entry, id: Date.now() }];
      save(uk, next);
      setEntries(next.map((e, i) => normalizeEntry(e, i, t)));
    },
    [entries, uk, t]
  );

  const removeEntry = useCallback(
    (id) => {
      const next = entries.filter((e) => String(e.id) !== String(id));
      save(uk, next);
      setEntries(next);
    },
    [entries, uk]
  );

  const clearAll = useCallback(() => {
    save(uk, []);
    setEntries([]);
  }, [uk]);

  const trends = useMemo(() => {
    const sorted = [...entries].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    const last = sorted.slice(0, 5).reverse();
    const num = (arr) => arr.filter((x) => !isNaN(x));
    const temps = num(last.map((x) => parseFloat(x.temp)));
    const sevs = num(last.map((x) => parseInt(x.severity, 10)));
    const hyd = num(last.map((x) => parseInt(x.hydration, 10)));
    const sleep = num(last.map((x) => parseFloat(x.sleep)));

    const arrow = (v) => {
      if (v.length < 2) return "→";
      const a = v[v.length - 1];
      const b = v[0];
      if (a < b) return "↓";
      if (a > b) return "↑";
      return "→";
    };

    let outlook = "stable";
    if (temps.length >= 2 && temps[temps.length - 1] < temps[0] && sevs.length >= 2 && sevs[sevs.length - 1] <= sevs[0])
      outlook = "improving";
    if (temps.length >= 2 && temps[temps.length - 1] > temps[0]) outlook = "worsening";

    const healthScore = Math.min(
      100,
      Math.round(
        (sevs.length ? ((6 - sevs[sevs.length - 1]) / 5) * 40 : 20) +
          (hyd.length ? (hyd[hyd.length - 1] / 10) * 30 : 15) +
          (sleep.length ? Math.min(sleep[sleep.length - 1] / 8, 1) * 30 : 15)
      )
    );

    return { temps, sevs, hyd, sleep, outlook, healthScore, arrow };
  }, [entries]);

  return { entries, addEntry, removeEntry, clearAll, trends, refresh };
}
