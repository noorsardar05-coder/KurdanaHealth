import LightweightBody from "./lite/LightweightBody.jsx";
import Advanced3DGate from "./Advanced3DGate.jsx";

/** Default = lightweight 2.5D. Advanced 3D only when explicitly enabled. */
export default function BodyHome({
  mode,
  onSelectOrgan,
  focusId,
  layout,
  lang = "en",
  onAvailableOrgans,
  alive = true,
  viewer = "lite",
  onExitAdvanced,
}) {
  if (viewer === "advanced") {
    return (
      <Advanced3DGate
        lang={lang}
        mode={mode}
        focusId={focusId}
        layout={layout}
        onSelect={(id) => onSelectOrgan(id ?? null)}
        onHover={() => {}}
        onAvailableOrgans={onAvailableOrgans}
        onExitToLite={onExitAdvanced}
      />
    );
  }

  return (
    <LightweightBody
      mode={mode}
      focusId={focusId}
      lang={lang}
      onSelectOrgan={onSelectOrgan}
      onAvailableOrgans={onAvailableOrgans}
      alive={alive}
    />
  );
}
