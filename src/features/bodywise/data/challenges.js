export const DAILY_CHALLENGES = [
  {
    id: "c1",
    prompt: "Can you find the appendix?",
    organId: "appendix",
    hint: "Lower right abdomen — a tiny pouch.",
  },
  {
    id: "c2",
    prompt: "Can you locate the liver?",
    organId: "liver",
    hint: "Under the right ribs — larger than most people guess.",
  },
  {
    id: "c3",
    prompt: "Which lung is usually larger?",
    organId: "lungs",
    hint: "The right — the heart needs space on the left.",
    choices: ["Left", "Right", "Equal"],
    answer: "Right",
  },
  {
    id: "c4",
    prompt: "Tap the organ that beats ~100,000 times a day.",
    organId: "heart",
    hint: "Center of the chest.",
  },
  {
    id: "c5",
    prompt: "Where do thoughts spark?",
    organId: "brain",
    hint: "Protected by the skull.",
  },
  {
    id: "c6",
    prompt: "Find the twin filters.",
    organId: "kidneys",
    hint: "Mid-back, one on each side.",
  },
  {
    id: "c7",
    prompt: "Where does digestion begin its acid bath?",
    organId: "stomach",
    hint: "Upper left abdomen.",
  },
];

export function challengeForToday() {
  const day = Math.floor(Date.now() / 86400000);
  return DAILY_CHALLENGES[day % DAILY_CHALLENGES.length];
}
