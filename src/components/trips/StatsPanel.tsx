import { stats as defaultStats, tripCostTotals } from "../../data/mockData";

type StatsPanelProps = {
  stats?: string[][];
  costTotals?: typeof tripCostTotals;
};

export function StatsPanel({
  stats: statItems = defaultStats,
  costTotals = tripCostTotals,
}: StatsPanelProps) {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        {statItems.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
      <div className="trip-cost-breakdown">
        <span>Cost split for this trip</span>
        <div className="cost-share-row compact">
          {costTotals.map((cost) => (
            <span key={cost.person}>{cost.total}<small>{cost.person}</small></span>
          ))}
        </div>
      </div>
    </section>
  );
}

