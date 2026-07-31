/**
 * Z-Anatomy / BodyParts3D atlas — one shared coordinate system.
 * Modes load only solid systems. Unused layers stay unloaded or visible=false.
 * Never place organs by hand.
 *
 * Source: https://github.com/LluisV/Z-Anatomy (CC BY-SA 4.0)
 */

export const ATLAS_BASE = "/bodywise/models/atlas";

/** System layers that compose the complete anatomical body. */
export const ATLAS_SYSTEMS = {
  visceral: {
    id: "visceral",
    label: "Visceral organs",
    url: `${ATLAS_BASE}/visceral.fbx`,
    required: true,
    color: "#c4785a",
    /** Rough size hint for progressive loading UX */
    weight: "medium",
  },
  lymphoid: {
    id: "lymphoid",
    label: "Lymphoid organs",
    url: `${ATLAS_BASE}/lymphoid.fbx`,
    required: false,
    color: "#9b6bb5",
    weight: "light",
  },
  skeleton: {
    id: "skeleton",
    label: "Skeleton",
    url: `${ATLAS_BASE}/skeleton.fbx`,
    required: false,
    color: "#e8e4dc",
    weight: "heavy",
  },
  muscles: {
    id: "muscles",
    label: "Muscles",
    url: `${ATLAS_BASE}/muscles.fbx`,
    required: false,
    color: "#a84840",
    weight: "heavy",
  },
  cardiovascular: {
    id: "cardiovascular",
    label: "Cardiovascular",
    url: `${ATLAS_BASE}/cardiovascular.fbx`,
    required: false,
    color: "#c41e3a",
    weight: "heavy",
  },
  nervous: {
    id: "nervous",
    label: "Nervous system",
    url: `${ATLAS_BASE}/nervous.fbx`,
    required: false,
    color: "#c4a1ff",
    weight: "heavy",
  },
};

/**
 * Mode → solid systems only.
 * Do NOT keep other systems as transparent ghosts in the GPU scene.
 * Optional skeleton reference is added only when quality allows (see systemsForMode).
 */
export const MODE_VISIBILITY = {
  organs: {
    visceral: "solid",
    lymphoid: "solid",
    cardiovascular: "hidden",
    skeleton: "hidden",
    muscles: "hidden",
    nervous: "hidden",
  },
  skeleton: {
    skeleton: "solid",
    visceral: "hidden",
    lymphoid: "hidden",
    muscles: "hidden",
    cardiovascular: "hidden",
    nervous: "hidden",
  },
  muscle: {
    muscles: "solid",
    skeleton: "hidden",
    visceral: "hidden",
    lymphoid: "hidden",
    cardiovascular: "hidden",
    nervous: "hidden",
  },
  blood: {
    cardiovascular: "solid",
    visceral: "hidden",
    skeleton: "hidden",
    lymphoid: "hidden",
    muscles: "hidden",
    nervous: "hidden",
  },
  nervous: {
    nervous: "solid",
    skeleton: "hidden",
    visceral: "hidden",
    lymphoid: "hidden",
    muscles: "hidden",
    cardiovascular: "hidden",
  },
  respiratory: {
    visceral: "solid",
    skeleton: "hidden",
    cardiovascular: "hidden",
    lymphoid: "hidden",
    muscles: "hidden",
    nervous: "hidden",
  },
  digestive: {
    visceral: "solid",
    skeleton: "hidden",
    lymphoid: "hidden",
    cardiovascular: "hidden",
    muscles: "hidden",
    nervous: "hidden",
  },
  endocrine: {
    visceral: "solid",
    lymphoid: "solid",
    skeleton: "hidden",
    cardiovascular: "hidden",
    muscles: "hidden",
    nervous: "hidden",
  },
  immune: {
    lymphoid: "solid",
    visceral: "solid",
    skeleton: "hidden",
    cardiovascular: "hidden",
    muscles: "hidden",
    nervous: "hidden",
  },
  xray: {
    skeleton: "solid",
    visceral: "hidden",
    cardiovascular: "hidden",
    nervous: "hidden",
    lymphoid: "hidden",
    muscles: "hidden",
  },
};

/**
 * Modes that may show a low-cost skeleton silhouette on high-tier desktops only.
 * Never used on low/medium tiers.
 */
export const MODE_OPTIONAL_SKELETON = new Set([
  "organs",
  "nervous",
  "blood",
  "respiratory",
  "digestive",
  "endocrine",
  "immune",
  "muscle",
]);

/**
 * Map mesh names (BodyParts3D / Terminologia Anatomica) → organ ids.
 */
export const ORGAN_MESH_RULES = [
  {
    id: "appendix",
    include: [/vermiform appendix/i],
    exclude: [/fibrous appendix|liver/i],
    systems: ["visceral"],
  },
  {
    id: "heart",
    include: [
      /\bheart\b/i,
      /\bleft atrium\b/i,
      /\bright atrium\b/i,
      /\bleft ventricle\b/i,
      /\bright ventricle\b/i,
      /\binterventricular\b/i,
      /\binteratrial\b/i,
    ],
    exclude: [/impression|notch|liver|lung|gastric/i],
    systems: ["cardiovascular"],
  },
  {
    id: "brain",
    include: [
      /\bbrain\b/i,
      /\bcerebrum\b/i,
      /\bcerebellum\b/i,
      /\bcerebral hemisphere\b/i,
      /\bfrontal lobe\b/i,
      /\btemporal lobe\b/i,
      /\bparietal lobe\b/i,
      /\boccipital lobe\b/i,
      /\bpons\b/i,
      /\bmedulla oblongata\b/i,
    ],
    exclude: [/bone|vessel|artery|vein|nerve of/i],
    systems: ["nervous"],
  },
  {
    id: "spinalCord",
    include: [/\bspinal cord\b/i],
    exclude: [/canal|process|nerve root/i],
    systems: ["nervous"],
  },
  {
    id: "lungs",
    include: [/\blung\b/i, /\blobe of (left|right) lung\b/i],
    exclude: [/impression|ligament|node/i],
    systems: ["visceral"],
  },
  {
    id: "liver",
    include: [/\bliver\b/i],
    exclude: [/hepatic (artery|vein|duct)|node/i],
    systems: ["visceral"],
  },
  {
    id: "stomach",
    include: [/\bstomach\b/i, /\bgastric\b/i],
    exclude: [/artery|vein|nerve|node|impression|ligament/i],
    systems: ["visceral"],
  },
  {
    id: "pancreas",
    include: [/\bpancreas\b/i, /\bpancreatic\b/i],
    exclude: [/artery|vein|duct|node|impression/i],
    systems: ["visceral"],
  },
  {
    id: "kidneys",
    include: [/\bkidney\b/i, /\brenal\b/i],
    exclude: [/artery|vein|pelvis of|node|impression|capsule of/i],
    systems: ["visceral"],
  },
  {
    id: "spleen",
    include: [/\bspleen\b/i, /\bsplenic\b/i],
    exclude: [/artery|vein|node|impression/i],
    systems: ["lymphoid"],
  },
  {
    id: "bladder",
    include: [/\burinary bladder\b/i, /\bbladder\b/i],
    exclude: [/gallbladder|bile/i],
    systems: ["visceral"],
  },
  {
    id: "intestines",
    include: [
      /\bcolon\b/i,
      /\bduodenum\b/i,
      /\bjejunum\b/i,
      /\bileum\b/i,
      /\bcecum\b/i,
      /\bcaecum\b/i,
      /\brectum\b/i,
      /\bsigmoid\b/i,
      /\blarge intestine\b/i,
      /\bsmall intestine\b/i,
      /\bintestine\b/i,
    ],
    exclude: [/node|artery|vein|impression/i],
    systems: ["visceral"],
  },
  {
    id: "gallbladder",
    include: [/\bgallbladder\b/i, /\bgall bladder\b/i],
    exclude: [/fossa for/i],
    systems: ["visceral"],
  },
];

export function matchOrganId(meshName = "") {
  const name = String(meshName).trim();
  if (!name) return null;
  for (const rule of ORGAN_MESH_RULES) {
    if (rule.exclude?.some((re) => re.test(name))) continue;
    if (rule.include.some((re) => re.test(name))) return rule.id;
  }
  return null;
}

/**
 * Systems that must be present for a mode.
 * @param {string} mode
 * @param {{ tier?: string, allowSkeletonRef?: boolean }} opts
 */
export function systemsForMode(mode, opts = {}) {
  const vis = MODE_VISIBILITY[mode] || MODE_VISIBILITY.organs;
  let solids = Object.entries(vis)
    .filter(([, state]) => state === "solid")
    .map(([sys]) => sys);

  // Low-tier: one primary system only (drop companion lymphoid when visceral is enough)
  if (opts.tier === "low") {
    if (mode === "organs" || mode === "digestive" || mode === "respiratory" || mode === "endocrine") {
      solids = solids.filter((s) => s === "visceral");
    } else if (mode === "immune") {
      solids = solids.filter((s) => s === "lymphoid");
    } else {
      solids = solids.slice(0, 1);
    }
  }

  const allowSkeletonRef =
    opts.allowSkeletonRef === true &&
    opts.tier === "high" &&
    MODE_OPTIONAL_SKELETON.has(mode) &&
    !solids.includes("skeleton");

  if (allowSkeletonRef) solids.push("skeleton");
  return solids;
}

export function visibilityFor(mode, systemId, opts = {}) {
  const vis = MODE_VISIBILITY[mode] || MODE_VISIBILITY.organs;
  if (vis[systemId] === "solid") return "solid";

  const allowSkeletonRef =
    opts.allowSkeletonRef === true &&
    opts.tier === "high" &&
    systemId === "skeleton" &&
    MODE_OPTIONAL_SKELETON.has(mode) &&
    vis.skeleton !== "solid";

  if (allowSkeletonRef) return "ghost";
  return "hidden";
}

/** Extra systems needed when focusing a specific organ. */
export function systemsForFocus(focusId) {
  if (!focusId) return [];
  if (focusId === "heart") return ["cardiovascular"];
  if (focusId === "brain" || focusId === "spinalCord") return ["nervous"];
  if (focusId === "spleen") return ["lymphoid"];
  return [];
}
