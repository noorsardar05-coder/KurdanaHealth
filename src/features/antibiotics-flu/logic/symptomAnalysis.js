const RF_KEYS = ["breath", "chest", "blue", "conf", "neck", "fever39", "fever4d", "dehyd", "weak", "worse"];

export function analyzeSymptoms({ symptoms, redFlags, duration, temp, severity }) {
  const anyRed = RF_KEYS.some((k) => redFlags[k]);
  const s = symptoms;
  let flu = 0,
    cold = 0,
    bact = 0;

  if (s.fever && s.bodyAches && s.fatigue) flu += 4;
  if (s.cough && (s.fever || s.fatigue)) flu += 1;
  if (s.runnyNose && s.soreThroat && !s.breath) cold += 3;
  if (s.runnyNose && s.cough) cold += 1;
  if (s.headache || s.chills) flu += 1;
  if (s.ear || (s.soreThroat && duration !== "dur12" && (temp === "tempHigh" || severity === "sevSev"))) bact += 2;
  if (s.breath || s.chest) bact += 2;
  if (duration === "dur6" && severity !== "sevMild") bact += 1;

  let patternKey = "pattern_viral";
  if (anyRed) patternKey = "pattern_urgent";
  else if (bact >= 3 && (duration === "dur6" || severity === "sevSev")) patternKey = "pattern_bact";
  else if (flu >= 4 && flu >= cold) patternKey = "pattern_flu";
  else if (cold >= 3) patternKey = "pattern_cold";

  let risk = "riskLow";
  if (anyRed) risk = "riskUrgent";
  else if (severity === "sevSev" || temp === "tempHigh") risk = "riskHigh";
  else if (severity === "sevMod" || duration === "dur6") risk = "riskMod";

  return { patternKey, risk, anyRed };
}

export { RF_KEYS };

export const SYM_KEYS = [
  "fever", "cough", "soreThroat", "runnyNose", "bodyAches", "fatigue",
  "headache", "chills", "chest", "breath", "ear", "sinus", "nausea", "vomit", "diarrhea",
];
