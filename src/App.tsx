import {
  CalendarDays,
  Check,
  Coffee,
  Compass,
  Filter,
  Hotel,
  Import,
  Landmark,
  MapPin,
  Moon,
  Navigation,
  Route,
  Sparkles,
  Store,
  Utensils,
  Wand2,
} from "lucide-react";
import { useMemo, useState } from "react";

type Category =
  | "Cafe"
  | "Restaurant"
  | "Museum"
  | "Shopping"
  | "Viewpoint"
  | "Bar"
  | "Hotel";

type Place = {
  id: number;
  name: string;
  category: Category;
  area: string;
  note: string;
  day: number;
  x: number;
  y: number;
  saved: boolean;
};

type ItineraryDay = {
  day: number;
  title: string;
  pace: string;
  walking: string;
  places: number[];
  summary: string;
};

const categoryMeta: Record<Category, { color: string; icon: React.ElementType }> = {
  Cafe: { color: "#d97706", icon: Coffee },
  Restaurant: { color: "#dc2626", icon: Utensils },
  Museum: { color: "#7c3aed", icon: Landmark },
  Shopping: { color: "#0891b2", icon: Store },
  Viewpoint: { color: "#16a34a", icon: Compass },
  Bar: { color: "#be185d", icon: Moon },
  Hotel: { color: "#2563eb", icon: Hotel },
};

const savedPlaces: Place[] = [
  {
    id: 1,
    name: "Sant'Eustachio Il Caffe",
    category: "Cafe",
    area: "Centro Storico",
    note: "Pinned for espresso before the Pantheon.",
    day: 1,
    x: 48,
    y: 45,
    saved: true,
  },
  {
    id: 2,
    name: "Pantheon",
    category: "Museum",
    area: "Centro Storico",
    note: "History anchor and good rainy-day option.",
    day: 1,
    x: 53,
    y: 42,
    saved: true,
  },
  {
    id: 3,
    name: "Roscioli",
    category: "Restaurant",
    area: "Campo de' Fiori",
    note: "Saved for carbonara and wine list.",
    day: 1,
    x: 45,
    y: 58,
    saved: true,
  },
  {
    id: 4,
    name: "Via del Governo Vecchio",
    category: "Shopping",
    area: "Navona",
    note: "Independent stores and vintage finds.",
    day: 1,
    x: 41,
    y: 47,
    saved: true,
  },
  {
    id: 5,
    name: "Villa Borghese",
    category: "Viewpoint",
    area: "Pinciano",
    note: "Gentle afternoon reset with views.",
    day: 2,
    x: 58,
    y: 20,
    saved: true,
  },
  {
    id: 6,
    name: "Galleria Borghese",
    category: "Museum",
    area: "Pinciano",
    note: "Requires timed tickets.",
    day: 2,
    x: 62,
    y: 25,
    saved: true,
  },
  {
    id: 7,
    name: "Trattoria Pennestri",
    category: "Restaurant",
    area: "Ostiense",
    note: "Local dinner, short taxi back.",
    day: 3,
    x: 60,
    y: 79,
    saved: true,
  },
  {
    id: 8,
    name: "Terrazza del Gianicolo",
    category: "Viewpoint",
    area: "Trastevere",
    note: "Sunset walk with city panorama.",
    day: 3,
    x: 29,
    y: 64,
    saved: true,
  },
  {
    id: 9,
    name: "Hotel Artemide",
    category: "Hotel",
    area: "Monti",
    note: "Accommodation base.",
    day: 0,
    x: 70,
    y: 34,
    saved: false,
  },
  {
    id: 10,
    name: "Jerry Thomas Speakeasy",
    category: "Bar",
    area: "Navona",
    note: "Optional late drink if energy allows.",
    day: 1,
    x: 39,
    y: 50,
    saved: true,
  },
];

const itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: "Centro Storico, coffee, and classic Rome",
    pace: "Relaxed",
    walking: "4.8 km",
    places: [1, 2, 4, 3, 10],
    summary:
      "Start from saved coffee, loop through the Pantheon and Navona lanes, then keep dinner close so the day does not sprawl.",
  },
  {
    day: 2,
    title: "Borghese art with a soft landing",
    pace: "Balanced",
    walking: "3.1 km",
    places: [6, 5],
    summary:
      "Book the gallery window first, then let the park absorb the rest of the afternoon with flexible cafe time nearby.",
  },
  {
    day: 3,
    title: "Trastevere sunset into local dinner",
    pace: "Leisurely",
    walking: "3.7 km",
    places: [8, 7],
    summary:
      "Use the viewpoint as the day anchor, then head south for a saved restaurant that feels more local than central.",
  },
];

const categories = Object.keys(categoryMeta) as Category[];

export function App() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeCategories, setActiveCategories] = useState<Category[]>(
    categories.filter((category) => category !== "Hotel")
  );
  const [generated, setGenerated] = useState(false);

  const visiblePlaces = useMemo(
    () =>
      savedPlaces.filter((place) => {
        const matchesCategory =
          place.category === "Hotel" || activeCategories.includes(place.category);
        const matchesDay = place.day === 0 || place.day === selectedDay;
        return matchesCategory && matchesDay;
      }),
    [activeCategories, selectedDay]
  );

  const currentDay = itinerary.find((day) => day.day === selectedDay)!;
  const savedUseRate = Math.round(
    (new Set(itinerary.flatMap((day) => day.places)).size /
      savedPlaces.filter((place) => place.saved).length) *
      100
  );

  function toggleCategory(category: Category) {
    if (category === "Hotel") return;
    setActiveCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  }

  return (
    <main className="app-shell">
      <section className="workspace">
        <aside className="sidebar" aria-label="Trip setup">
          <div className="brand">
            <span className="brand-mark">
              <Sparkles size={20} />
            </span>
            <div>
              <strong>AI Travel Companion</strong>
              <span>Saved places into real routes</span>
            </div>
          </div>

          <button className="import-button">
            <Import size={18} />
            Import Google Maps export
          </button>

          <div className="panel">
            <div className="panel-title">
              <CalendarDays size={18} />
              Trip setup
            </div>
            <label>
              Destination
              <input value="Rome, Italy" readOnly />
            </label>
            <div className="field-grid">
              <label>
                Dates
                <input value="4 days" readOnly />
              </label>
              <label>
                Pace
                <input value="Relaxed" readOnly />
              </label>
            </div>
            <label>
              Accommodation
              <input value="Hotel Artemide, Monti" readOnly />
            </label>
            <label>
              AI prompt
              <textarea
                value="We have 4 days in Rome. We enjoy walking, great coffee, local food and history. We'd like a relaxed pace."
                readOnly
              />
            </label>
            <button
              className={generated ? "generate-button is-done" : "generate-button"}
              onClick={() => setGenerated(true)}
            >
              {generated ? <Check size={18} /> : <Wand2 size={18} />}
              {generated ? "Itinerary generated" : "Generate itinerary"}
            </button>
          </div>

          <div className="panel">
            <div className="panel-title">
              <Filter size={18} />
              Saved place filters
            </div>
            <div className="filter-list">
              {categories
                .filter((category) => category !== "Hotel")
                .map((category) => {
                  const Icon = categoryMeta[category].icon;
                  const isActive = activeCategories.includes(category);
                  return (
                    <button
                      key={category}
                      className={isActive ? "filter-chip is-active" : "filter-chip"}
                      onClick={() => toggleCategory(category)}
                      style={{ "--chip-color": categoryMeta[category].color } as React.CSSProperties}
                    >
                      <Icon size={15} />
                      {category}
                    </button>
                  );
                })}
            </div>
          </div>
        </aside>

        <section className="map-stage" aria-label="Interactive trip map">
          <div className="topbar">
            <div>
              <span className="eyebrow">Personal itinerary workspace</span>
              <h1>Rome plans shaped around places you already saved.</h1>
            </div>
            <div className="metrics">
              <div>
                <strong>{savedPlaces.filter((place) => place.saved).length}</strong>
                saved places
              </div>
              <div>
                <strong>{savedUseRate}%</strong>
                used by AI
              </div>
              <div>
                <strong>{currentDay.walking}</strong>
                day walk
              </div>
            </div>
          </div>

          <div className="content-grid">
            <div className="map-card">
              <div className="map-toolbar">
                <div className="segmented" aria-label="Select itinerary day">
                  {itinerary.map((day) => (
                    <button
                      key={day.day}
                      className={selectedDay === day.day ? "is-selected" : ""}
                      onClick={() => setSelectedDay(day.day)}
                    >
                      Day {day.day}
                    </button>
                  ))}
                </div>
                <span className="route-pill">
                  <Route size={16} />
                  Walking route
                </span>
              </div>

              <div className="map-canvas">
                <div className="river" />
                <div className="street street-a" />
                <div className="street street-b" />
                <div className="street street-c" />
                <svg className="route-line" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polyline
                    points={visiblePlaces
                      .filter((place) => place.day !== 0)
                      .map((place) => `${place.x},${place.y}`)
                      .join(" ")}
                  />
                </svg>
                {visiblePlaces.map((place) => {
                  const Icon = categoryMeta[place.category].icon;
                  return (
                    <button
                      key={place.id}
                      className={place.category === "Hotel" ? "pin hotel-pin" : "pin"}
                      style={
                        {
                          left: `${place.x}%`,
                          top: `${place.y}%`,
                          "--pin-color": categoryMeta[place.category].color,
                        } as React.CSSProperties
                      }
                      title={`${place.name} - ${place.note}`}
                    >
                      <Icon size={16} />
                    </button>
                  );
                })}
              </div>
            </div>

            <aside className="itinerary-panel">
              <div className="day-header">
                <span>Day {currentDay.day}</span>
                <h2>{currentDay.title}</h2>
                <p>{currentDay.summary}</p>
              </div>

              <div className="day-stats">
                <span>{currentDay.pace} pace</span>
                <span>{currentDay.walking} walking</span>
              </div>

              <div className="stop-list">
                {currentDay.places.map((placeId, index) => {
                  const place = savedPlaces.find((item) => item.id === placeId)!;
                  const Icon = categoryMeta[place.category].icon;
                  return (
                    <article key={place.id} className="stop-card">
                      <span className="stop-index">{index + 1}</span>
                      <div
                        className="stop-icon"
                        style={{ backgroundColor: categoryMeta[place.category].color }}
                      >
                        <Icon size={16} />
                      </div>
                      <div>
                        <h3>{place.name}</h3>
                        <p>{place.area} · {place.note}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </aside>
          </div>

          <section className="insight-strip" aria-label="Portfolio highlights">
            <article>
              <MapPin size={20} />
              <strong>Import layer</strong>
              Parses saved Google Maps exports into typed, filterable place data.
            </article>
            <article>
              <Navigation size={20} />
              <strong>Spatial planning</strong>
              Clusters nearby stops and keeps daily walking distance visible.
            </article>
            <article>
              <Sparkles size={20} />
              <strong>AI orchestration</strong>
              Turns user intent, hotel location, and saved places into a plan.
            </article>
          </section>
        </section>
      </section>
    </main>
  );
}
