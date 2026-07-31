/**
 * Coordinated anatomical SVG — front & back, shared viewBox 0 0 360 820.
 * Interactive hit paths for accurate organ selection (not rectangles).
 */

const VB = "0 0 360 820";

function Silhouette({ side }) {
  if (side === "back") {
    return (
      <path
        className="bw-lite-sil"
        d="M180 42
          C152 42 138 62 138 88
          C138 108 148 122 162 128
          L158 148 C140 152 128 168 128 190
          L122 310 C118 360 112 410 118 460
          L124 520 C128 560 138 600 148 660
          L152 780 L168 780 L172 620
          L180 520 L188 620 L192 780 L208 780
          L212 660 C222 600 232 560 236 520
          L242 460 C248 410 242 360 238 310
          L232 190 C232 168 220 152 202 148
          L198 128 C212 122 222 108 222 88
          C222 62 208 42 180 42 Z"
      />
    );
  }
  return (
    <path
      className="bw-lite-sil"
      d="M180 40
        C150 40 136 62 136 90
        C136 112 148 126 162 132
        L156 152 C138 156 126 172 126 196
        L118 300 C112 350 108 400 114 455
        L122 530 C126 575 136 620 146 680
        L150 790 L168 790 L174 640
        L180 540 L186 640 L192 790 L210 790
        L214 680 C224 620 234 575 238 530
        L246 455 C252 400 248 350 242 300
        L234 196 C234 172 222 156 204 152
        L198 132 C212 126 224 112 224 90
        C224 62 210 40 180 40 Z"
    />
  );
}

function SkeletonLayer({ side }) {
  const spine = side === "back";
  return (
    <g className="bw-lite-layer bw-lite-skeleton" aria-hidden="true">
      {/* Skull */}
      <ellipse cx="180" cy="78" rx="34" ry="40" />
      {/* Spine */}
      <path d={spine ? "M180 118 V470" : "M180 130 V455"} strokeWidth="6" fill="none" />
      {/* Ribs */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 168 + i * 18;
        return (
          <g key={i}>
            <path d={`M180 ${y} C150 ${y + 4} 128 ${y + 10} 118 ${y + 22}`} fill="none" strokeWidth="3" />
            <path d={`M180 ${y} C210 ${y + 4} 232 ${y + 10} 242 ${y + 22}`} fill="none" strokeWidth="3" />
          </g>
        );
      })}
      {/* Pelvis */}
      <path d="M140 455 C150 440 210 440 220 455 L228 490 C200 505 160 505 132 490 Z" />
      {/* Femurs */}
      <path d="M155 495 L148 680" fill="none" strokeWidth="7" strokeLinecap="round" />
      <path d="M205 495 L212 680" fill="none" strokeWidth="7" strokeLinecap="round" />
      {/* Arms */}
      <path d="M126 196 L88 320 L80 400" fill="none" strokeWidth="5" strokeLinecap="round" />
      <path d="M234 196 L272 320 L280 400" fill="none" strokeWidth="5" strokeLinecap="round" />
      {spine && (
        <>
          <circle cx="180" cy="200" r="5" />
          <circle cx="180" cy="260" r="5" />
          <circle cx="180" cy="320" r="5" />
          <circle cx="180" cy="380" r="5" />
        </>
      )}
    </g>
  );
}

function MusclesLayer() {
  return (
    <g className="bw-lite-layer bw-lite-muscles" aria-hidden="true">
      <ellipse cx="155" cy="210" rx="28" ry="48" opacity="0.85" />
      <ellipse cx="205" cy="210" rx="28" ry="48" opacity="0.85" />
      <path d="M140 300 C160 290 200 290 220 300 L225 400 C200 420 160 420 135 400 Z" opacity="0.75" />
      <ellipse cx="150" cy="560" rx="22" ry="70" opacity="0.7" />
      <ellipse cx="210" cy="560" rx="22" ry="70" opacity="0.7" />
    </g>
  );
}

function OrgansLayer({ side }) {
  if (side === "back") {
    return (
      <g className="bw-lite-layer bw-lite-organs" aria-hidden="true">
        {/* Kidneys prominent on back */}
        <ellipse className="bw-org-kidney-l" cx="148" cy="355" rx="22" ry="32" />
        <ellipse className="bw-org-kidney-r" cx="212" cy="355" rx="22" ry="32" />
        <ellipse cx="180" cy="95" rx="26" ry="30" className="bw-org-brain" opacity="0.5" />
      </g>
    );
  }
  return (
    <g className="bw-lite-layer bw-lite-organs" aria-hidden="true">
      {/* Brain */}
      <path
        className="bw-org-brain"
        d="M180 48 C158 48 148 62 148 78 C148 96 158 108 170 112 L170 122 L190 122 L190 112
           C202 108 212 96 212 78 C212 62 202 48 180 48 Z"
      />
      {/* Lungs — patient's right lung on image left */}
      <path
        className="bw-org-lung-r"
        d="M168 175 C145 172 120 185 118 215 C116 250 122 285 138 295 C155 288 168 260 170 220 Z"
      />
      <path
        className="bw-org-lung-l"
        d="M192 175 C215 172 240 185 242 215 C244 250 238 285 222 295 C205 288 192 260 190 220 Z"
      />
      {/* Heart — central, apex left (image right) */}
      <path
        className="bw-org-heart"
        d="M180 220 C170 208 152 210 148 228 C144 248 162 268 180 285 C198 268 216 248 212 228
           C208 210 190 208 180 220 Z"
      />
      {/* Liver — RUQ = image left */}
      <path
        className="bw-org-liver"
        d="M100 290 C95 310 105 345 130 350 C155 348 175 330 178 310 C170 295 145 282 120 285 Z"
      />
      {/* Gallbladder under liver */}
      <ellipse className="bw-org-gallbladder" cx="125" cy="340" rx="8" ry="12" />
      {/* Stomach — LUQ = image right */}
      <path
        className="bw-org-stomach"
        d="M195 295 C210 288 235 295 238 315 C240 335 225 350 205 348 C190 345 185 325 188 310 Z"
      />
      {/* Spleen — left upper = image right */}
      <ellipse className="bw-org-spleen" cx="248" cy="320" rx="14" ry="20" />
      {/* Pancreas — deep, across midline behind stomach */}
      <path
        className="bw-org-pancreas"
        d="M145 325 C170 318 200 320 225 328 C220 338 175 342 150 335 Z"
      />
      {/* Intestines */}
      <path
        className="bw-org-intestines"
        d="M125 365 C140 355 175 350 200 358 C225 365 235 390 220 415 C200 440 155 445 135 425
           C115 400 110 380 125 365 Z"
      />
      {/* Bladder */}
      <ellipse className="bw-org-bladder" cx="180" cy="490" rx="28" ry="20" />
      {/* Kidneys faintly (retroperitoneal) */}
      <ellipse className="bw-org-kidney-l" cx="128" cy="360" rx="14" ry="22" opacity="0.45" />
      <ellipse className="bw-org-kidney-r" cx="232" cy="360" rx="14" ry="22" opacity="0.45" />
    </g>
  );
}

function RespiratoryLayer() {
  return (
    <g className="bw-lite-layer bw-lite-respiratory" aria-hidden="true">
      <path d="M180 115 V175" fill="none" strokeWidth="5" strokeLinecap="round" className="bw-lite-trachea" />
      <path
        d="M168 175 C145 172 120 185 118 215 C116 250 122 285 138 295 C155 288 168 260 170 220 Z"
        className="bw-org-lung-r"
      />
      <path
        d="M192 175 C215 172 240 185 242 215 C244 250 238 285 222 295 C205 288 192 260 190 220 Z"
        className="bw-org-lung-l"
      />
      {/* Diaphragm dome */}
      <path d="M118 295 C150 275 210 275 242 295" fill="none" strokeWidth="4" className="bw-lite-diaphragm" />
    </g>
  );
}

function DigestiveLayer() {
  return (
    <g className="bw-lite-layer bw-lite-digestive" aria-hidden="true">
      <path d="M180 120 V200" fill="none" strokeWidth="4" className="bw-lite-esophagus" />
      <path
        className="bw-org-stomach"
        d="M195 295 C210 288 235 295 238 315 C240 335 225 350 205 348 C190 345 185 325 188 310 Z"
      />
      <path
        className="bw-org-liver"
        d="M100 290 C95 310 105 345 130 350 C155 348 175 330 178 310 C170 295 145 282 120 285 Z"
        opacity="0.55"
      />
      <path
        className="bw-org-intestines"
        d="M125 365 C140 355 175 350 200 358 C225 365 235 390 220 415 C200 440 155 445 135 425
           C115 400 110 380 125 365 Z"
      />
      <path d="M180 430 V485" fill="none" strokeWidth="3" />
    </g>
  );
}

function NervousLayer({ side }) {
  return (
    <g className="bw-lite-layer bw-lite-nervous" aria-hidden="true">
      <ellipse cx="180" cy="78" rx="28" ry="34" className="bw-org-brain" />
      <path d="M180 112 V470" fill="none" strokeWidth="5" strokeLinecap="round" className="bw-lite-cord" />
      {[180, 220, 260, 300, 340, 380].map((y) => (
        <g key={y}>
          <path d={`M180 ${y} L140 ${y + 12}`} fill="none" strokeWidth="2" />
          <path d={`M180 ${y} L220 ${y + 12}`} fill="none" strokeWidth="2" />
        </g>
      ))}
      {side === "back" && <circle cx="180" cy="200" r="4" />}
    </g>
  );
}

function VesselsLayer() {
  return (
    <g className="bw-lite-layer bw-lite-vessels" aria-hidden="true">
      <path
        className="bw-org-heart"
        d="M180 220 C170 208 152 210 148 228 C144 248 162 268 180 285 C198 268 216 248 212 228
           C208 210 190 208 180 220 Z"
      />
      {/* Aorta / vena cava simplified */}
      <path d="M180 285 V455" fill="none" strokeWidth="6" stroke="#c41e3a" strokeLinecap="round" />
      <path d="M172 200 V285" fill="none" strokeWidth="4" stroke="#c41e3a" />
      <path d="M188 200 V285" fill="none" strokeWidth="3" stroke="#5b8def" />
      <path d="M180 320 L130 360" fill="none" strokeWidth="3" stroke="#c41e3a" />
      <path d="M180 320 L230 360" fill="none" strokeWidth="3" stroke="#c41e3a" />
      <path d="M180 400 L150 520" fill="none" strokeWidth="3" stroke="#c41e3a" />
      <path d="M180 400 L210 520" fill="none" strokeWidth="3" stroke="#c41e3a" />
    </g>
  );
}

/** Accurate clickable regions — path shapes, not boxes */
function HitRegions({ side, hotId, focusId, onHover, onSelect, interactive }) {
  if (!interactive) return null;

  const common = (id) => ({
    className: `bw-lite-hit ${hotId === id ? "is-hot" : ""} ${focusId === id ? "is-focus" : ""}`,
    onMouseEnter: () => onHover?.(id),
    onMouseLeave: () => onHover?.(null),
    onClick: (e) => {
      e.stopPropagation();
      onSelect?.(id);
    },
    onTouchEnd: (e) => {
      e.preventDefault();
      onSelect?.(id);
    },
    role: "button",
    tabIndex: 0,
    "aria-label": id,
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect?.(id);
      }
    },
  });

  if (side === "back") {
    return (
      <g className="bw-lite-hits">
        <ellipse {...common("brain")} cx="180" cy="78" rx="34" ry="40" />
        <ellipse {...common("kidneys")} cx="148" cy="355" rx="26" ry="36" />
        <ellipse {...common("kidneys")} cx="212" cy="355" rx="26" ry="36" />
      </g>
    );
  }

  return (
    <g className="bw-lite-hits">
      <path
        {...common("brain")}
        d="M180 48 C158 48 148 62 148 78 C148 96 158 108 170 112 L170 122 L190 122 L190 112
           C202 108 212 96 212 78 C212 62 202 48 180 48 Z"
      />
      <path
        {...common("lungs")}
        d="M168 175 C145 172 120 185 118 215 C116 250 122 285 138 295 C155 288 168 260 170 220 Z
           M192 175 C215 172 240 185 242 215 C244 250 238 285 222 295 C205 288 192 260 190 220 Z"
      />
      <path
        {...common("heart")}
        d="M180 220 C170 208 152 210 148 228 C144 248 162 268 180 285 C198 268 216 248 212 228
           C208 210 190 208 180 220 Z"
      />
      <path
        {...common("liver")}
        d="M100 290 C95 310 105 345 130 350 C155 348 175 330 178 310 C170 295 145 282 120 285 Z"
      />
      <ellipse {...common("gallbladder")} cx="125" cy="340" rx="12" ry="16" />
      <path
        {...common("stomach")}
        d="M195 295 C210 288 235 295 238 315 C240 335 225 350 205 348 C190 345 185 325 188 310 Z"
      />
      <ellipse {...common("spleen")} cx="248" cy="320" rx="18" ry="24" />
      <path
        {...common("pancreas")}
        d="M145 325 C170 318 200 320 225 328 C220 338 175 342 150 335 Z"
      />
      <path
        {...common("intestines")}
        d="M125 365 C140 355 175 350 200 358 C225 365 235 390 220 415 C200 440 155 445 135 425
           C115 400 110 380 125 365 Z"
      />
      <ellipse {...common("kidneys")} cx="128" cy="360" rx="18" ry="26" />
      <ellipse {...common("kidneys")} cx="232" cy="360" rx="18" ry="26" />
      <ellipse {...common("bladder")} cx="180" cy="490" rx="32" ry="24" />
    </g>
  );
}

export default function BodySvg({
  side = "front",
  mode = "organs",
  hotId = null,
  focusId = null,
  breathe = true,
  onHover,
  onSelect,
  interactive = true,
  className = "",
}) {
  return (
    <svg
      className={`bw-lite-svg ${className} ${breathe ? "is-breathing" : ""} mode-${mode} ${
        focusId ? "is-focused" : ""
      }`}
      viewBox={VB}
      role="img"
      aria-label="Anatomical body"
    >
      <defs>
        <filter id="bwGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="bw-lite-depth" style={{ transformOrigin: "180px 400px" }}>
        <Silhouette side={side} />
        <SkeletonLayer side={side} />
        <MusclesLayer />
        <OrgansLayer side={side} />
        <RespiratoryLayer />
        <DigestiveLayer />
        <NervousLayer side={side} />
        <VesselsLayer />
        <HitRegions
          side={side}
          hotId={hotId}
          focusId={focusId}
          onHover={onHover}
          onSelect={onSelect}
          interactive={interactive}
        />
      </g>
    </svg>
  );
}
