/**
 * DEPRECATED — Mental Health Thought Mirror is fully local now.
 * Kept only so old imports do not crash. Do not call from live UI.
 */

export function companionApiUrl() {
  return "";
}

export async function fetchCompanionReply() {
  return {
    reply: "",
    reflection: "",
    gentleReframe: "",
    nextStep: "",
    followUpQuestion: "",
    suggestedTool: "none",
    riskLevel: "none",
    language: "en",
    dump: {
      canControl: [],
      cannotControl: [],
      tomorrow: [],
      letGo: [],
      wins: [],
    },
    usedFallback: true,
    status: null,
    error: "Local Thought Mirror only — network AI disabled",
  };
}
