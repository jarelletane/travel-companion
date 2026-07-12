import { Plus, X } from "lucide-react";
import { friends } from "../data/mockData";

export function InvitePage() {
  return (
    <section className="panel large">
      <div className="toolbar invite-toolbar">
        <button className="pill-button orange">
          <Plus size={16} />
          Add friend
        </button>
        <button className="pill-button">Assign to trip</button>
      </div>
      <div className="friend-list">
        {friends.map((friend) => (
          <article key={friend.name}>
            <div>
              <span>{friend.access}</span>
              <strong>{friend.name}</strong>
              <p>{friend.trips.join(" · ")}</p>
            </div>
            <button title={`Remove ${friend.name}`}>
              <X size={16} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

