import { Mail } from "lucide-react";
import { imports } from "../data/mockData";

export function ImportsPage() {
  return (
    <section className="panel large">
      <div className="mail-drop">
        <Mail size={22} />
        <div>
          <h2>Forward travel emails to your trip inbox.</h2>
          <p>
            Forward emails to <strong>plans@mysatrips.com</strong>. Flights, hotels,
            trains, tickets and restaurant bookings are parsed into the right pages.
          </p>
        </div>
      </div>
      <h3 className="section-title">Recently added</h3>
      <div className="import-list">
        {imports.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title}>
              <Icon size={18} />
              <div>
                <span>{item.type}</span>
                <strong>{item.title}</strong>
                <p>{item.status}</p>
              </div>
              <button type="button">Reassign</button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

