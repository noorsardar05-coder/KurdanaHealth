/**
 * Kurdana Thought Mirror — active local thought reframer.
 * Not AI. Challenges negative thoughts with structure:
 * Reflect → Challenge → Perspective → Replace → Action
 */

import { PATTERNS } from "./patterns.js";
import { applyMode, variantFocus } from "./modes.js";
import { CATEGORIES, INTENSITY_MARKERS, KEYWORDS } from "./keywords.js";

const usedIds = new Set();
const MAX_USED = 100;

const RISK_PATTERNS = {
  en: [
    /i\s+want\s+to\s+die/i,
    /i\s+want\s+to\s+kill\s+myself/i,
    /kill\s+myself/i,
    /end\s+my\s+life/i,
    /i'?m\s+going\s+to\s+hurt\s+myself/i,
    /hurt\s+myself/i,
    /can'?t\s+stay\s+safe/i,
    /i\s+want\s+to\s+hurt\s+someone/i,
    /suicide/i,
    /self[\s-]?harm/i,
  ],
  ku: [
    /دەمەوێت بمرم/,
    /دەمەوێت خۆم بکوژم/,
    /خۆم دەکوژم/,
    /ژیانم تەواو/,
    /دەمەوێت خۆم بئێشم/,
    /خۆم دەئێشم/,
    /ناتوانم سەلامەت بمێنمەوە/,
    /دەمەوێت کەسێک بئێشم/,
    /خۆکوشتن/,
  ],
};

const BANNED_SNIPPETS = [
  /i'?m sorry/i,
  /take a breath/i,
  /you'?re not alone/i,
  /everything will be okay/i,
  /you'?re amazing/i,
  /everything happens for a reason/i,
];

export function detectUrgentRisk(text) {
  const raw = String(text || "");
  for (const re of RISK_PATTERNS.en) if (re.test(raw)) return true;
  for (const re of RISK_PATTERNS.ku) if (re.test(raw)) return true;
  return false;
}

export function normalizeInput(text) {
  return String(text || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function loc(entry, lang) {
  if (!entry) return "";
  if (typeof entry === "string") return entry;
  return lang === "ku" ? entry.ku : entry.en;
}

function scorePattern(normalized, pattern, lang) {
  let score = 0;
  const keys = lang === "ku" ? pattern.keys?.ku || [] : pattern.keys?.en || [];
  const also = lang === "ku" ? pattern.keys?.en || [] : pattern.keys?.ku || [];
  for (const k of [...keys, ...also]) {
    const p = String(k || "").toLowerCase();
    if (!p) continue;
    if (normalized === p) score += 12;
    else if (normalized.includes(p)) score += p.includes(" ") ? 8 : 5;
  }
  return score;
}

function scoreCategory(normalized, lang) {
  const scores = Object.create(null);
  for (const cat of CATEGORIES) {
    scores[cat] = 0;
    const bag = KEYWORDS[cat];
    if (!bag) continue;
    const list = [...(lang === "ku" ? bag.ku : bag.en), ...(lang === "ku" ? bag.en : bag.ku)];
    for (const phrase of list) {
      const p = phrase.toLowerCase();
      if (p && normalized.includes(p)) scores[cat] += p.includes(" ") ? 3 : 2;
    }
  }
  return scores;
}

export function detectCategory(text, lang = "en") {
  const normalized = normalizeInput(text);
  const scores = scoreCategory(normalized, lang);
  let best = "general";
  let bestScore = 0;
  for (const cat of CATEGORIES) {
    if ((scores[cat] || 0) > bestScore) {
      bestScore = scores[cat];
      best = cat;
    }
  }
  return bestScore > 0 ? best : "general";
}

export function detectIntensity(text, lang = "en") {
  const normalized = normalizeInput(text);
  const markers = lang === "ku" ? INTENSITY_MARKERS.ku : INTENSITY_MARKERS.en;
  let hits = 0;
  for (const m of markers) if (normalized.includes(m.toLowerCase())) hits += 1;
  if (normalized.length > 120) hits += 1;
  if (hits >= 3) return "high";
  if (hits >= 1) return "medium";
  return "low";
}

function pickPattern(text, lang, preferredCategory, avoidId) {
  const normalized = normalizeInput(text);
  const category = preferredCategory || detectCategory(text, lang);

  let best = null;
  let bestScore = -1;
  const pool = [];

  for (const p of PATTERNS) {
    if (avoidId && p.id === avoidId) continue;
    const s = scorePattern(normalized, p, lang);
    const catBonus = p.category === category ? 2 : 0;
    const total = s + catBonus;
    if (total > 0) pool.push({ p, total });
    if (total > bestScore) {
      bestScore = total;
      best = p;
    }
  }

  // Prefer unused high-scoring matches
  const strong = pool
    .filter((x) => x.total >= 5)
    .sort((a, b) => b.total - a.total);

  for (const item of strong) {
    if (!usedIds.has(item.p.id)) {
      remember(item.p.id);
      return item.p;
    }
  }

  if (best && bestScore > 0) {
    remember(best.id);
    return best;
  }

  // Fallback: category patterns
  const catPool = PATTERNS.filter((p) => p.category === category);
  const unused = catPool.filter((p) => !usedIds.has(p.id));
  const source = unused.length ? unused : catPool.length ? catPool : PATTERNS;
  const chosen = source[Math.floor(Math.random() * source.length)];
  remember(chosen.id);
  return chosen;
}

function remember(id) {
  usedIds.add(id);
  if (usedIds.size > MAX_USED) {
    const first = usedIds.values().next().value;
    usedIds.delete(first);
  }
}

function scrubBanned(text) {
  let t = String(text || "");
  for (const re of BANNED_SNIPPETS) t = t.replace(re, "");
  return t.replace(/\n{3,}/g, "\n\n").trim();
}

function extractDetail(text, lang) {
  const raw = String(text || "").trim();
  if (!raw || lang === "ku") return null;
  const exam = raw.match(/failed\s+(?:my\s+)?([a-z0-9\s-]{2,40}?)\s+exam/i);
  if (exam) return `this ${exam[1].trim()} exam`;
  const friend = raw.match(/my\s+(friend|partner|mom|dad|sister|brother)\s+(ignored|left|rejected)\s+me/i);
  if (friend) return `being ${friend[2].toLowerCase()} by your ${friend[1].toLowerCase()}`;
  return null;
}

/**
 * @param {object} opts
 * @param {string} opts.text
 * @param {'en'|'ku'} [opts.lang]
 * @param {'gentle'|'coach'|'growth'|'future'|'friend'} [opts.mirrorMode]
 * @param {''|'another'|'perspective'|'challenge'|'kinder'|'logical'|'shorter'} [opts.variant]
 * @param {string} [opts.category]
 * @param {string} [opts.avoidPatternId]
 */
export function mirrorThought({
  text,
  lang = "en",
  mirrorMode = "coach",
  variant = "",
  category: forcedCategory,
  avoidPatternId,
} = {}) {
  const trimmed = String(text || "").trim();
  if (!trimmed) {
    return { urgent: false, empty: true };
  }

  if (detectUrgentRisk(trimmed)) {
    return { urgent: true, empty: false, category: "urgent", intensity: "high" };
  }

  const intensity = detectIntensity(trimmed, lang);
  const pattern = pickPattern(trimmed, lang, forcedCategory, avoidPatternId);
  const detail = extractDetail(trimmed, lang);

  let reflect = loc(pattern.reflect, lang);
  let challenge = loc(pattern.challenge, lang);
  let perspective = loc(pattern.perspective, lang);
  let replace = loc(pattern.replace, lang);
  let action = loc(pattern.action, lang);

  if (detail && lang === "en") {
    reflect = `${reflect}\nThis seems tied to ${detail}.`;
  }

  let parts = applyMode(
    { reflect, challenge, perspective, replace, action },
    mirrorMode,
    lang
  );

  parts = variantFocus(parts, variant === "another" ? "" : variant, lang);

  // Shorter: one tight paragraph — challenge + replace
  if (variant === "shorter") {
    const short = scrubBanned(
      lang === "ku"
        ? `${parts.challenge}\n\nبگۆڕە بۆ: «${parts.replace}»`
        : `${parts.challenge}\n\nReplace with: “${parts.replace}”`
    );
    return {
      urgent: false,
      empty: false,
      category: pattern.category,
      intensity,
      patternId: pattern.id,
      mirrorMode,
      mode: "short",
      reflect: "",
      challenge: "",
      perspective: "",
      replace: parts.replace,
      action: "",
      short,
      acknowledgment: short,
      reframe: parts.challenge,
      kinder: parts.replace,
      nextStep: parts.action,
    };
  }

  const clean = {
    reflect: scrubBanned(parts.reflect),
    challenge: scrubBanned(parts.challenge),
    perspective: scrubBanned(parts.perspective),
    replace: scrubBanned(parts.replace),
    action: scrubBanned(parts.action),
  };

  return {
    urgent: false,
    empty: false,
    category: pattern.category,
    intensity,
    patternId: pattern.id,
    mirrorMode,
    mode: "full",
    focus: parts.focus || "full",
    ...clean,
    // legacy field aliases for older UI bits
    acknowledgment: clean.reflect,
    reframe: clean.challenge,
    kinder: clean.replace,
    nextStep: clean.action,
    short: "",
  };
}

export function formatMirrorReply(result, lang = "en") {
  if (!result || result.urgent) return "";
  if (result.mode === "short") return result.short || result.replace;

  const labels =
    lang === "ku"
      ? { replace: "بگۆڕە بۆ", action: "ئەرکی بچووک" }
      : { replace: "Replace the thought", action: "Tiny mission" };

  const blocks = [];
  if (result.reflect) blocks.push(result.reflect);
  if (result.challenge) blocks.push(result.challenge);
  if (result.perspective) blocks.push(result.perspective);
  if (result.replace) blocks.push(`${labels.replace}:\n“${result.replace}”`);
  if (result.action) blocks.push(`${labels.action}:\n${result.action}`);
  return blocks.filter(Boolean).join("\n\n");
}

export function clearMirrorSession() {
  usedIds.clear();
}

export { MIRROR_MODES } from "./modes.js";
