import { ArrowRight, Sparkles } from "lucide-react";

export function CreatePanel() {
  return (
    <section className="trip-section">
      <div className="ai-page">
        <Sparkles size={24} />
        <h2>Suggest a gentle day in Rome.</h2>
        <p>
          Use my accommodation, forwarded bookings, Google saved bakeries,
          restaurants and viewpoints. Keep walking reasonable and avoid clashes.
        </p>
        <button className="pill-button orange">
          Generate itinerary
          <ArrowRight size={16} />
        </button>
      </div>
      <div className="inline-panel">
        <h3>AI will consider</h3>
        <ul>
          <li>Fixed flights, check-ins and tickets</li>
          <li>Saved Google Maps categories</li>
          <li>Walking distance and location clusters</li>
          <li>Collaborator notes and preferences</li>
        </ul>
      </div>
    </section>
  );
}

