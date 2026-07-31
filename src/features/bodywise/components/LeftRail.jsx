import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { ORGANS, listOrgans } from "../data/organs.js";
import ModeSelector from "./ModeSelector.jsx";

export default function LeftRail({
  mode,
  setMode,
  organId,
  availableIds,
  onSelectOrgan,
  collapsed,
  onToggle,
  onSearch,
  layout,
}) {
  const selected = organId ? ORGANS[organId] : null;
  const organs = listOrgans(availableIds?.length ? availableIds : null);

  return (
    <aside className={`bw-rail bw-rail--left ${collapsed ? "is-collapsed" : ""}`} aria-label="BodyWise controls">
      <div className="bw-rail__head">
        {!collapsed && (
          <div>
            <p className="bw-rail__kicker">Department</p>
            <h1 className="bw-rail__title bw-display">BodyWise</h1>
            <p className="bw-rail__sub">One anatomical atlas. Systems toggle. No fake placement.</p>
          </div>
        )}
        <button
          type="button"
          className="bw-icon-btn"
          onClick={onToggle}
          aria-label={collapsed ? "Expand panel" : "Collapse panel"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {!collapsed && (
        <>
          <ModeSelector mode={mode} setMode={setMode} orientation={layout === "wide" ? "vertical" : "vertical"} />

          <div className="bw-rail__section">
            <div className="bw-rail__section-head">
              <span>Atlas organs</span>
              <button type="button" className="bw-icon-btn" onClick={onSearch} aria-label="Search">
                <Search size={14} />
              </button>
            </div>
            <div className="bw-organ-list">
              {organs.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={`bw-organ-item ${organId === o.id ? "is-on" : ""}`}
                  onClick={() => onSelectOrgan(o.id)}
                >
                  <span className="bw-organ-item__dot" style={{ background: o.accent }} />
                  {o.name}
                </button>
              ))}
            </div>
            {availableIds?.length === 0 && (
              <p className="bw-rail__empty">Loading atlas meshes… only discovered structures will appear.</p>
            )}
          </div>

          {selected && (
            <div className="bw-rail__summary">
              <p className="bw-rail__summary-title">{selected.name}</p>
              <p className="bw-rail__summary-body">{selected.location}</p>
            </div>
          )}
        </>
      )}
    </aside>
  );
}
