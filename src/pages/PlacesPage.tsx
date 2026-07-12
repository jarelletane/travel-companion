import { Link, Search } from "lucide-react";
import romeRestaurant from "../assets/rome-restaurant.jpg";
import { savedPlaces } from "../data/mockData";

export function PlacesPage() {
  return (
    <section className="panel large">
      <p className="lede places-lede">
        Your account-wide Google places library. Import saved places from a file
        or add new places from search, then use them across trips and AI planning.
      </p>
      <div className="toolbar">
        <label>
          <Search size={16} />
          <input value="Search your library" readOnly />
        </label>
        <button className="pill-button">Import file</button>
        <button className="pill-button orange">Search Google</button>
      </div>
      <div className="share-link-row">
        <label>
          <Link size={16} />
          <input value="Paste Google Maps share link" readOnly />
        </label>
        <button className="pill-button orange">Add place</button>
      </div>
      <div className="place-grid">
        {savedPlaces.map((place) => (
          <article key={place.title}>
            <img src={romeRestaurant} alt="" className="place-card-image" />
            <div className="place-card-body">
              <span>{place.category} · {place.added ? "In library" : "Search result"}</span>
              <strong>{place.title}</strong>
              <p>{place.note}</p>
              <div className="place-actions">
                <button className={place.added ? "added" : ""}>
                  {place.added ? "Added" : "Add +"}
                </button>
                {place.added && <button>Remove</button>}
                <button className="place-link-button" type="button" aria-label={`Open ${place.title}`}>
                  <Link size={15} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

