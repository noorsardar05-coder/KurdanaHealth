import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { ORGANS } from "../data/organs.js";

export default function RightRail({
  organId,
  onPlayGame,
  onOpenLesson,
  collapsed,
  onToggle,
}) {
  const organ = organId ? ORGANS[organId] : null;
  const playCard = organ?.stories?.find((s) => s.type === "play");

  return (
    <aside className={`bw-rail bw-rail--right ${collapsed ? "is-collapsed" : ""}`} aria-label="Organ context">
      <div className="bw-rail__head">
        <button
          type="button"
          className="bw-icon-btn"
          onClick={onToggle}
          aria-label={collapsed ? "Expand details" : "Collapse details"}
        >
          {collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
        {!collapsed && <span className="bw-rail__kicker">Context</span>}
      </div>

      {!collapsed && (
        <div className="bw-rail__body">
          {!organ && (
            <p className="bw-rail__empty">
              Select a real atlas mesh to open location, function, and clinical facts.
            </p>
          )}
          {organ && (
            <>
              <h2 className="bw-rail__organ bw-display">{organ.name}</h2>
              <p className="bw-rail__summary-body">{organ.guide}</p>
              <p className="bw-rail__meta">
                <strong>Location:</strong> {organ.location}
              </p>
              <p className="bw-rail__meta">
                <strong>Function:</strong> {organ.function}
              </p>

              <div className="bw-rail__card">
                <p className="bw-rail__card-label">Immersive lesson</p>
                <p className="bw-rail__card-title">Zoom · facts · quiz</p>
                <button type="button" className="bw-chip" onClick={() => onOpenLesson(organ.id)}>
                  Open learning panel
                </button>
              </div>

              <div className="bw-rail__actions">
                <button type="button" className="bw-chip" onClick={() => onOpenLesson(organ.id)}>
                  Full facts
                </button>
                {playCard && (
                  <button
                    type="button"
                    className="bw-chip is-on"
                    onClick={() => onPlayGame(playCard.game)}
                  >
                    <Play size={12} /> {playCard.title || "Challenge"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </aside>
  );
}
