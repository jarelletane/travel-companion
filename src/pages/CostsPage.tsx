import { costBalances, itineraryCosts } from "../data/mockData";

export function CostsPage() {
  return (
    <section className="panel large">
      <p className="lede">
        Costs are pulled from itinerary item details, then rolled up across trips
        and friends.
      </p>
      <div className="balance-list">
        {costBalances.map((balance) => (
          <article key={balance.name}>
            <div>
              <span>Total assigned</span>
              <strong>{balance.name}</strong>
              <p>{balance.trips}</p>
            </div>
            <div className="balance-total">
              <strong>{balance.total}</strong>
              <button>{balance.name === "You" ? "View" : "Balance"}</button>
            </div>
          </article>
        ))}
      </div>
      <div className="itinerary-cost-list">
        <div className="section-heading-row">
          <h3>Itinerary item costs</h3>
          <span>Auto-pulled from trip days</span>
        </div>
        {itineraryCosts.map((cost) => (
          <article key={`${cost.trip}-${cost.item}`}>
            <div>
              <span>{cost.trip} · {cost.day}</span>
              <strong>{cost.item}</strong>
              <p>{cost.category} · paid by {cost.paidBy} · split with {cost.split}</p>
            </div>
            <strong>{cost.amount}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

