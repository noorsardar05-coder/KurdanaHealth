import { Layers, Sparkles, HelpCircle, Luggage, Wand2 } from "lucide-react";

const ICONS = {
  layers: Layers,
  sparkles: Sparkles,
  help: HelpCircle,
  bag: Luggage,
  wand: Wand2,
};

export default function BeautyGameCard({ game, t, onClick }) {
  const Icon = ICONS[game.icon] || Sparkles;
  return (
    <button type="button" className="bt-game-card glass" onClick={onClick}>
      <Icon size={22} strokeWidth={1.5} color="var(--bt-rose)" />
      <p className="bt-game-card__title">{t(game.titleKey)}</p>
      <p className="bt-game-card__desc">{t(game.descKey)}</p>
    </button>
  );
}
