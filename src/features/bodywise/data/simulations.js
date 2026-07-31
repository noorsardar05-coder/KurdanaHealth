export const SIMULATIONS = [
  {
    id: "sleep3",
    title: "Only sleep 3 hours",
    emoji: "😴",
    effects: [
      { organ: "brain", level: 0.85, note: "Focus and memory drop." },
      { organ: "heart", level: 0.35, note: "Stress hormones rise." },
      { organ: "immune", level: 0.55, note: "Defenses weaken." },
    ],
  },
  {
    id: "smoke",
    title: "Smoke",
    emoji: "🚬",
    effects: [
      { organ: "lungs", level: 0.9, note: "Airways tighten. Oxygen falls." },
      { organ: "heart", level: 0.7, note: "Blood vessels constrict." },
      { organ: "blood", level: 0.6, note: "Carbon monoxide competes with O₂." },
    ],
  },
  {
    id: "exercise",
    title: "Exercise",
    emoji: "🏃",
    effects: [
      { organ: "heart", level: 0.75, note: "Pulse rises — training the pump." },
      { organ: "lungs", level: 0.7, note: "Breathing deepens." },
      { organ: "brain", level: 0.4, note: "Blood flow and mood lift." },
    ],
  },
  {
    id: "water",
    title: "Drink water",
    emoji: "💧",
    effects: [
      { organ: "kidneys", level: 0.5, note: "Filtration stays smooth." },
      { organ: "brain", level: 0.3, note: "Alertness steadies." },
      { organ: "blood", level: 0.35, note: "Volume stays balanced." },
    ],
  },
  {
    id: "dehydrated",
    title: "Become dehydrated",
    emoji: "🏜️",
    effects: [
      { organ: "kidneys", level: 0.8, note: "They conserve water hard." },
      { organ: "brain", level: 0.55, note: "Headache risk rises." },
      { organ: "heart", level: 0.45, note: "Blood thickens slightly." },
    ],
  },
  {
    id: "breath",
    title: "Hold your breath",
    emoji: "😮‍💨",
    effects: [
      { organ: "lungs", level: 0.95, note: "CO₂ builds fast." },
      { organ: "brain", level: 0.7, note: "Urge to breathe explodes." },
      { organ: "heart", level: 0.5, note: "Heart rate shifts to cope." },
    ],
  },
  {
    id: "sugar",
    title: "Eat too much sugar",
    emoji: "🍬",
    effects: [
      { organ: "stomach", level: 0.4, note: "Quick energy spike." },
      { organ: "liver", level: 0.65, note: "Extra sugar is processed and stored." },
      { organ: "brain", level: 0.35, note: "Brief rush, then a dip." },
    ],
  },
];
