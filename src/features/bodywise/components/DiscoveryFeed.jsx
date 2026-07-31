import { DISCOVERY_FACTS } from "../data/discovery.js";

export default function DiscoveryFeed() {
  return (
    <div className="bw-discover" aria-label="Discovery mode">
      {DISCOVERY_FACTS.map((fact, idx) => (
        <article key={fact.id} className="bw-discover__card">
          <div className="bw-discover__emoji">{fact.emoji}</div>
          <p className="bw-discover__line bw-display">{fact.line}</p>
          {idx < DISCOVERY_FACTS.length - 1 && <span className="bw-discover__hint">Swipe</span>}
        </article>
      ))}
    </div>
  );
}
