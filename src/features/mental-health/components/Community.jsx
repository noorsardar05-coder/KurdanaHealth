import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { t } from "../i18n/strings.js";
import { MOODS } from "../data/content.js";
import {
  addGratitudeLeaf,
  getTreeGrowth,
  loadGratitude,
} from "../utils/storage.js";
import { softHaptic } from "../utils/haptics.js";

const PROMPTS = {
  en: [
    "What are you grateful for today?",
    "What made you smile today?",
    "What's one small victory today?",
    "Who or what brought you comfort today?",
    "What is one kind thing you noticed today?",
    "What moment felt peaceful today?",
    "What strength did you show today?",
  ],
  ku: [
    "ئەمڕۆ بۆ چی سوپاسگوزاریت؟",
    "ئەمڕۆ چی پێکەنینت؟",
    "ئەمڕۆ یەک سەرکەوتنی بچووک چی بوو؟",
    "ئەمڕۆ کێ یان چی ئاسوودەیی پێبەخشی؟",
    "ئەمڕۆ یەک شتی میهرەبانت بینی؟",
    "ئەمڕۆ کام سات ئارام بوویت؟",
    "ئەمڕۆ کام هێزت نیشان دا؟",
  ],
};

const STAGE_KEYS = {
  seed: "gtStageSeed",
  small: "gtStageSmall",
  growing: "gtStageGrowing",
  blooming: "gtStageBlooming",
};

/** Organic branch positions — irregular, never a grid */
const BLOSSOM_SLOTS = [
  { x: 156, y: 88, s: 1.05, r: -8 },
  { x: 128, y: 102, s: 0.95, r: 18 },
  { x: 190, y: 98, s: 0.98, r: -22 },
  { x: 108, y: 124, s: 0.9, r: 12 },
  { x: 164, y: 118, s: 1.1, r: 4 },
  { x: 214, y: 122, s: 0.92, r: -14 },
  { x: 92, y: 148, s: 0.86, r: 28 },
  { x: 140, y: 142, s: 1.02, r: -6 },
  { x: 184, y: 140, s: 0.96, r: 16 },
  { x: 228, y: 146, s: 0.88, r: -20 },
  { x: 116, y: 164, s: 0.94, r: 8 },
  { x: 162, y: 158, s: 1.08, r: -10 },
  { x: 204, y: 162, s: 0.93, r: 22 },
  { x: 84, y: 178, s: 0.84, r: -16 },
  { x: 146, y: 180, s: 0.97, r: 14 },
  { x: 178, y: 182, s: 0.95, r: -24 },
  { x: 236, y: 176, s: 0.86, r: 10 },
  { x: 104, y: 198, s: 0.9, r: 26 },
  { x: 158, y: 196, s: 1.02, r: -4 },
  { x: 216, y: 198, s: 0.91, r: 18 },
  { x: 126, y: 214, s: 0.88, r: -18 },
  { x: 192, y: 216, s: 0.9, r: 12 },
  { x: 150, y: 130, s: 0.8, r: 6 },
  { x: 174, y: 150, s: 0.82, r: -12 },
  { x: 120, y: 110, s: 0.86, r: 32 },
  { x: 200, y: 108, s: 0.86, r: -30 },
  { x: 248, y: 162, s: 0.78, r: 8 },
  { x: 72, y: 162, s: 0.78, r: -8 },
  { x: 242, y: 200, s: 0.82, r: -16 },
  { x: 78, y: 200, s: 0.82, r: 16 },
  { x: 148, y: 96, s: 0.74, r: 2 },
  { x: 170, y: 170, s: 0.84, r: -6 },
  { x: 134, y: 190, s: 0.8, r: 20 },
  { x: 198, y: 188, s: 0.8, r: -26 },
  { x: 112, y: 224, s: 0.76, r: 10 },
  { x: 208, y: 224, s: 0.76, r: -10 },
  { x: 144, y: 106, s: 0.72, r: -14 },
  { x: 176, y: 114, s: 0.72, r: 24 },
  { x: 100, y: 134, s: 0.74, r: -22 },
  { x: 220, y: 136, s: 0.74, r: 14 },
  { x: 154, y: 208, s: 0.78, r: 4 },
  { x: 168, y: 132, s: 0.76, r: -18 },
  { x: 130, y: 172, s: 0.82, r: 30 },
  { x: 210, y: 178, s: 0.8, r: -8 },
  { x: 96, y: 188, s: 0.76, r: 12 },
  { x: 224, y: 188, s: 0.76, r: -28 },
  { x: 160, y: 102, s: 0.7, r: 0 },
  { x: 186, y: 206, s: 0.74, r: 16 },
];

const BLOSSOM_COLORS = [
  "#f4a8bc",
  "#ef92ab",
  "#f7c0ce",
  "#e889a4",
  "#f2b0c2",
];

function dailyPrompt(lang) {
  const list = PROMPTS[lang] || PROMPTS.en;
  const d = new Date();
  const seed = d.getFullYear() * 1000 + d.getMonth() * 40 + d.getDate();
  return list[seed % list.length];
}

function formatDisplayDate(iso, lang) {
  if (!iso) return null;
  const [y, m, day] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, day);
  if (lang === "ku") {
    const months = [
      "کانوونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران",
      "تەمموز", "ئاب", "ئەیلوول", "تشرینی یەکەم", "تشرینی دووەم", "کانوونی یەکەم",
    ];
    const map = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    const dn = String(day).replace(/\d/g, (c) => map[Number(c)]);
    return `${dn}ی ${months[m - 1]}، ${String(y).replace(/\d/g, (c) => map[Number(c)])}`;
  }
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDisplayTime(createdAt, lang) {
  if (!createdAt) return null;
  const d = new Date(createdAt);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleTimeString(lang === "ku" ? "ckb-IQ" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function resolveSlot(entry, index) {
  if (entry.slot != null && BLOSSOM_SLOTS[entry.slot]) {
    return BLOSSOM_SLOTS[entry.slot];
  }
  return BLOSSOM_SLOTS[index % BLOSSOM_SLOTS.length];
}

/** Small pink gratitude dot on the canopy */
function Blossom({ color, scale = 1 }) {
  const r = 3.4 * scale;
  return (
    <g>
      <circle cx="0" cy="0" r={r * 1.55} fill={color} opacity="0.22" />
      <circle cx="0" cy="0" r={r} fill={color} opacity="0.95" />
      <circle cx={-r * 0.28} cy={-r * 0.28} r={r * 0.32} fill="#fff8fb" opacity="0.55" />
    </g>
  );
}

function FallingPetals({ active, dense }) {
  if (!active) return null;
  const count = dense ? 8 : 4;
  const petals = Array.from({ length: count }, (_, i) => ({
    x: 70 + i * 28 + (i % 3) * 8,
    delay: (i * 1.1) % 5,
  }));
  return (
    <g className="gt-falling" aria-hidden="true">
      {petals.map((p, i) => (
        <ellipse
          key={i}
          className="gt-falling__petal"
          cx={p.x}
          cy="70"
          rx="2.4"
          ry="3.6"
          fill={i % 2 ? "#f2c4d0" : "#f7e2e8"}
          style={{ animationDelay: `${p.delay}s` }}
          opacity="0.7"
        />
      ))}
    </g>
  );
}

function TreeScene({ entries, growth, onOpenBlossom, justAddedId }) {
  const {
    fullness,
    stage,
    season,
    showColorful,
    showBird,
    showButterflies,
    showFallingPetals,
    snow,
  } = growth;

  const canopyBoost = 0.94 + fullness * 0.1;
  const ambientPetals = entries.length >= 3;
  const visible = entries.slice(0, BLOSSOM_SLOTS.length);

  return (
    <div className={`gt-scene gt-scene--sunrise gt-season-${season || "spring"}`} data-stage={stage} data-season={season}>
      <div className="gt-scene__sun" aria-hidden="true" />
      <div className="gt-scene__rays" aria-hidden="true" />
      <div className="gt-scene__particles" aria-hidden="true" />
      {snow ? <div className="gt-scene__snow" aria-hidden="true" /> : null}

      <svg className="gt-scene__svg" viewBox="0 0 320 380" role="img" aria-label="Gratitude Tree">
        <defs>
          <linearGradient id="gtSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7e8d4" />
            <stop offset="40%" stopColor="#f3ebdf" />
            <stop offset="100%" stopColor="#e5ecd9" />
          </linearGradient>
          <linearGradient id="gtTrunk" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a07a58" />
            <stop offset="50%" stopColor="#7a5840" />
            <stop offset="100%" stopColor="#5a4030" />
          </linearGradient>
          <radialGradient id="gtFoliage" cx="42%" cy="32%" r="62%">
            <stop offset="0%" stopColor="#9ec487" />
            <stop offset="45%" stopColor="#6fa05c" />
            <stop offset="100%" stopColor="#4d7a42" />
          </radialGradient>
          <radialGradient id="gtFoliageDeep" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6a9a58" />
            <stop offset="100%" stopColor="#3f6a38" />
          </radialGradient>
          <filter id="gtBloomGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feDropShadow dx="0" dy="1" stdDeviation="2.2" floodColor="#f5c2d0" floodOpacity="0.85" />
          </filter>
        </defs>

        <rect width="320" height="380" fill="url(#gtSky)" />
        <path
          d="M0 300 C60 280 110 290 160 286 C220 282 270 270 320 288 L320 380 L0 380 Z"
          fill="#d7e2c8"
          opacity="0.45"
        />
        <ellipse cx="160" cy="350" rx={52 + fullness * 22} ry="11" fill="#7a9068" opacity="0.16" />

        <g className="gt-sway">
          <path
            d="M156 350
               C154 304 152 270 151 238
               C150 212 149 190 152 170
               C155 190 158 212 160 238
               C162 270 164 304 164 350 Z"
            fill="url(#gtTrunk)"
          />
          <path
            d="M157 302 C155 272 154 242 156 214"
            stroke="#4a3426"
            strokeWidth="0.65"
            fill="none"
            opacity="0.3"
          />

          <g stroke="#6a4e38" strokeLinecap="round" fill="none" opacity="0.88">
            <path d="M153 212 C128 198 106 178 90 154" strokeWidth="2.3" />
            <path d="M158 200 C182 188 208 170 228 148" strokeWidth="2.3" />
            <path d="M152 232 C124 224 102 212 84 194" strokeWidth="1.7" />
            <path d="M160 228 C190 220 216 208 240 188" strokeWidth="1.7" />
            <path d="M154 182 C140 160 126 138 118 116" strokeWidth="1.45" />
            <path d="M158 178 C176 156 194 134 206 114" strokeWidth="1.45" />
            <path d="M100 168 C86 156 76 142 70 128" strokeWidth="1.15" />
            <path d="M220 162 C234 150 246 136 252 122" strokeWidth="1.15" />
            <path d="M160 152 C160 136 158 120 154 106" strokeWidth="1.2" />
          </g>

          <g
            className="gt-foliage"
            style={{
              transform: `translate(160px, 165px) scale(${canopyBoost}) translate(-160px, -165px)`,
            }}
          >
            <ellipse cx="128" cy="152" rx="54" ry="46" fill="url(#gtFoliage)" opacity="0.92" />
            <ellipse cx="194" cy="150" rx="56" ry="48" fill="url(#gtFoliageDeep)" opacity="0.88" />
            <ellipse cx="160" cy="118" rx="60" ry="50" fill="#8fb878" opacity="0.86" />
            <ellipse cx="108" cy="180" rx="42" ry="36" fill="#557a45" opacity="0.78" />
            <ellipse cx="212" cy="178" rx="44" ry="37" fill="#4d7340" opacity="0.8" />
            <ellipse cx="160" cy="170" rx="50" ry="42" fill="#6fa05c" opacity="0.72" />
            <ellipse cx="94" cy="138" rx="30" ry="26" fill="#9ec487" opacity="0.7" />
            <ellipse cx="226" cy="136" rx="32" ry="28" fill="#8fb878" opacity="0.7" />
            <ellipse cx="142" cy="100" rx="36" ry="30" fill="#7aaf66" opacity="0.75" />
            <ellipse cx="182" cy="98" rx="34" ry="28" fill="#5f8f52" opacity="0.72" />
          </g>

          <g className="gt-leaf-texture" opacity="0.5" aria-hidden="true">
            {[
              [118, 130], [150, 120], [190, 128], [140, 160], [180, 158],
              [110, 170], [210, 168], [160, 140], [100, 150], [230, 150],
              [130, 110], [175, 112], [145, 190], [175, 192],
            ].map(([x, y], i) => (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="3.2"
                ry="2"
                fill={i % 2 ? "#7aaa64" : "#5f8f52"}
                transform={`rotate(${(i * 29) % 50 - 25} ${x} ${y})`}
              />
            ))}
          </g>

          <g className={`gt-blossoms ${showColorful ? "is-lush" : ""}`}>
            {visible.map((entry, i) => {
              const slot = resolveSlot(entry, i);
              const color = BLOSSOM_COLORS[(entry.color ?? i) % BLOSSOM_COLORS.length];
              const isNew = entry.id === justAddedId;
              const delay = (i % 7) * 0.35;
              const scale = Math.max(0.85, slot.s);
              return (
                <motion.g
                  key={entry.id}
                  className="gt-blossom"
                  style={{ transformOrigin: `${slot.x}px ${slot.y}px` }}
                  initial={isNew ? { scale: 0, opacity: 0 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={
                    isNew
                      ? { type: "spring", stiffness: 260, damping: 16, mass: 0.7 }
                      : { duration: 0.35, ease: "easeOut" }
                  }
                >
                  <g
                    className="gt-blossom__drift"
                    style={{ animationDelay: `${delay}s` }}
                    transform={`translate(${slot.x} ${slot.y})`}
                  >
                    {isNew && (
                      <motion.circle
                        cx="0"
                        cy="0"
                        r={8}
                        fill={color}
                        initial={{ scale: 0.4, opacity: 0.55 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                    )}
                    <Blossom color={color} scale={scale} />
                  </g>
                </motion.g>
              );
            })}
          </g>

          <FallingPetals active={ambientPetals || showFallingPetals} dense={showFallingPetals} />

          {showBird && (
            <g transform="translate(232 122)">
              <g className="gt-bird">
                <ellipse cx="0" cy="0" rx="5.5" ry="3.2" fill="#5c6570" opacity="0.88" />
                <path d="M4 -1 C8 -4 10 -2 7 1" fill="#4a5260" opacity="0.82" />
                <circle cx="-3.5" cy="-0.5" r="0.7" fill="#1a1e24" />
              </g>
            </g>
          )}

          {showButterflies && (
            <g>
              <g transform="translate(96 108)">
                <g className="gt-butterfly gt-butterfly--a">
                  <ellipse cx="-3" cy="0" rx="3.4" ry="2.1" fill="#c9a06a" opacity="0.72" />
                  <ellipse cx="3" cy="0" rx="3.4" ry="2.1" fill="#d4b07a" opacity="0.72" />
                  <rect x="-0.35" y="-2" width="0.7" height="4" fill="#5a4634" rx="0.35" />
                </g>
              </g>
              <g transform="translate(238 158)">
                <g className="gt-butterfly gt-butterfly--b">
                  <ellipse cx="-2.8" cy="0" rx="3" ry="1.8" fill="#b89a78" opacity="0.68" />
                  <ellipse cx="2.8" cy="0" rx="3" ry="1.8" fill="#c8aa88" opacity="0.68" />
                  <rect x="-0.3" y="-1.7" width="0.6" height="3.4" fill="#5a4634" rx="0.3" />
                </g>
              </g>
            </g>
          )}
        </g>
      </svg>

      {/* HTML hit targets — reliable on mobile touch */}
      <div className="gt-hit-layer" aria-hidden={false}>
        {visible.map((entry, i) => {
          const slot = resolveSlot(entry, i);
          return (
            <button
              key={`hit-${entry.id}`}
              type="button"
              className="gt-hit"
              style={{
                left: `${(slot.x / 320) * 100}%`,
                top: `${(slot.y / 380) * 100}%`,
              }}
              aria-label="Open gratitude memory"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenBlossom(entry);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Community({ lang }) {
  const tx = (k) => t(k, lang);
  const [data, setData] = useState(() => loadGratitude());
  const [text, setText] = useState("");
  const [mood, setMood] = useState(null);
  const [justAddedId, setJustAddedId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [openBlossom, setOpenBlossom] = useState(null);

  const prompt = useMemo(() => dailyPrompt(lang), [lang]);
  const blossomCount = data.entries?.length || 0;
  const growth = useMemo(() => getTreeGrowth(blossomCount), [blossomCount]);

  function handleAdd() {
    const trimmed = text.trim();
    if (!trimmed) return;
    softHaptic();
    const next = addGratitudeLeaf(trimmed, mood);
    setData(next);
    setJustAddedId(next.entries[0]?.id || null);
    setText("");
    setMood(null);
    setSuccess(true);
    window.setTimeout(() => setSuccess(false), 2400);
    window.setTimeout(() => setJustAddedId(null), 1800);
  }

  const streakLabel =
    (data.streak || 0) === 1 ? `1 ${tx("gtDay")}` : `${data.streak || 0} ${tx("gtDays")}`;

  const memoryTime = openBlossom ? formatDisplayTime(openBlossom.createdAt, lang) : null;
  const openMood = openBlossom?.mood
    ? MOODS.find((m) => m.id === openBlossom.mood)
    : null;

  return (
    <section className="mh-panel gt">
      <h2 className="mh-display mh-panel__title">{tx("communityTitle")}</h2>
      <p className="mh-panel__sub">{tx("communitySub")}</p>
      <p className="gt-private">{tx("gtPrivateNote")}</p>

      <TreeScene
        entries={data.entries || []}
        growth={growth}
        justAddedId={justAddedId}
        onOpenBlossom={setOpenBlossom}
      />

      <p className="gt-hint">{blossomCount === 0 ? tx("gtEmptyTree") : tx("gtTapLeaf")}</p>

      <div className="gt-stats">
        <div className="gt-stat">
          <span className="gt-stat__icon" aria-hidden="true">🌸</span>
          <span className="gt-stat__label">{tx("gtStatsLeaves")}</span>
          <span className="gt-stat__value">{blossomCount}</span>
        </div>
        <div className="gt-stat">
          <span className="gt-stat__icon" aria-hidden="true">🔥</span>
          <span className="gt-stat__label">{tx("gtStatsStreak")}</span>
          <span className="gt-stat__value">{streakLabel}</span>
        </div>
        <div className="gt-stat">
          <span className="gt-stat__icon" aria-hidden="true">🌳</span>
          <span className="gt-stat__label">{tx("gtStatsStage")}</span>
          <span className="gt-stat__value">{tx(STAGE_KEYS[growth.stage] || STAGE_KEYS.seed)}</span>
        </div>
        <div className="gt-stat">
          <span className="gt-stat__icon" aria-hidden="true">📅</span>
          <span className="gt-stat__label">{tx("gtStatsLast")}</span>
          <span className="gt-stat__value">
            {data.lastEntryDate ? formatDisplayDate(data.lastEntryDate, lang) : tx("gtNever")}
          </span>
        </div>
      </div>

      <div className="gt-reflect">
        <p className="gt-reflect__label">{tx("gtPromptLabel")}</p>
        <p className="gt-reflect__prompt mh-display">{prompt}</p>
        <textarea
          className="mh-input gt-reflect__input"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={tx("gtPlaceholder")}
          maxLength={500}
          dir={lang === "ku" ? "rtl" : "ltr"}
        />
        <p className="gt-reflect__mood-label">{tx("gtMoodOptional")}</p>
        <div className="mh-mood-row mh-mood-row--compact" role="group" aria-label={tx("gtMoodLabel")}>
          {MOODS.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`mh-mood-chip ${mood === m.id ? "is-on" : ""} mood-${m.id}`}
              onClick={() => setMood(mood === m.id ? null : m.id)}
            >
              <span aria-hidden="true">{m.emoji}</span>
              <span>{tx(m.labelKey)}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="mh-big-cta gt-reflect__cta"
          onClick={handleAdd}
          disabled={!text.trim()}
        >
          🌸 {tx("gtAddLeaf")}
        </button>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            className="gt-toast"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {tx("gtSuccess")}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openBlossom && (
          <motion.div
            className="gt-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenBlossom(null)}
          >
            <motion.div
              className="gt-modal__sheet gt-modal__sheet--memory"
              initial={{ y: 32, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label={tx("gtMemoryTitle")}
            >
              <div className="gt-modal__bloom" aria-hidden="true">🌸</div>
              <p className="gt-modal__eyebrow">{tx("gtMemoryTitle")}</p>
              <p className="gt-modal__date">
                {formatDisplayDate(openBlossom.date, lang)}
                {memoryTime ? ` · ${memoryTime}` : ""}
              </p>
              <p className="gt-modal__text mh-display">“{openBlossom.text}”</p>
              {openMood && (
                <p className="gt-modal__mood">
                  <span>{tx("gtMoodLabel")}</span>
                  <span>
                    {openMood.emoji} {tx(openMood.labelKey)}
                  </span>
                </p>
              )}
              <button type="button" className="mh-pill gt-modal__close" onClick={() => setOpenBlossom(null)}>
                {tx("gtClose")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
