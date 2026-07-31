const KEY = "noor_community_v1";

function blank() {
  return {
    progress: {}, // diseaseId -> { sectionIndex, completed, quizScore, quizTotal, badge }
  };
}

export function loadNoorState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    return { ...blank(), ...JSON.parse(raw) };
  } catch {
    return blank();
  }
}

export function saveNoorState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function getDiseaseProgress(state, diseaseId) {
  return (
    state.progress?.[diseaseId] || {
      sectionIndex: 0,
      completed: false,
      quizScore: null,
      quizTotal: null,
      badge: false,
    }
  );
}

export function updateDiseaseProgress(state, diseaseId, patch) {
  const prev = getDiseaseProgress(state, diseaseId);
  const next = {
    ...state,
    progress: {
      ...state.progress,
      [diseaseId]: { ...prev, ...patch },
    },
  };
  saveNoorState(next);
  return next;
}
