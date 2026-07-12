import {
  ArrowRight,
  ChevronLeft,
  Hotel,
  Plane,
  Plus,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "./components/layout/AppShell";
import { CreatePanel } from "./components/trips/CreatePanel";
import { StatsPanel } from "./components/trips/StatsPanel";
import { MapPreview, TripMapPage } from "./components/trips/TripMap";
import {
  dashboardNotifications,
  pastTrips,
  savedPlaces,
  tripCostTotals,
  tripDetails,
  tripLegs,
  upcomingTrip,
  upcomingTrips,
} from "./data/mockData";
import { CostsPage } from "./pages/CostsPage";
import { ImportsPage } from "./pages/ImportsPage";
import { InvitePage } from "./pages/InvitePage";
import { LoginPage } from "./pages/LoginPage";
import { PlacesPage } from "./pages/PlacesPage";
import { SettingsPage } from "./pages/SettingsPage";
import { useAppRoute } from "./routes/useAppRoute";
import type { Page } from "./types/navigation";

type TripTab = "upcoming" | "past";
type TripSection = "overview" | "create" | "stats";

export function App() {
  const { page, navigate } = useAppRoute();
  const [tripTab, setTripTab] = useState<TripTab>("upcoming");
  const [tripSection, setTripSection] = useState<TripSection>("overview");
  const [mapTripTitle, setMapTripTitle] = useState(upcomingTrip.title);

  const pageTitle = useMemo(() => {
    if (page === "dashboard") return "Dashboard";
    if (page === "trips") return "Trips";
    if (page === "tripMap") return "Trip Map";
    if (page === "places") return "My Places";
    if (page === "imports") return "Imports";
    if (page === "costs") return "Cost tracking";
    if (page === "invite") return "Invite";
    if (page === "settings") return "Settings";
    return "";
  }, [page]);

  if (page === "login") {
    return <LoginPage onLogin={() => navigate("dashboard")} />;
  }

  return (
    <AppShell page={page} pageTitle={pageTitle} onPageChange={navigate}>
        {page === "dashboard" && (
          <Dashboard tripTab={tripTab} setTripTab={setTripTab} setPage={navigate} />
        )}
        {page === "trips" && (
          <Trips
            tripTab={tripTab}
            setTripTab={setTripTab}
            tripSection={tripSection}
            setTripSection={setTripSection}
            onViewMap={(title) => {
              setMapTripTitle(title);
              navigate("tripMap");
            }}
          />
        )}
        {page === "tripMap" && <TripMapPage title={mapTripTitle} onBack={() => navigate("trips")} />}
        {page === "places" && <PlacesPage />}
        {page === "imports" && <ImportsPage />}
        {page === "costs" && <CostsPage />}
        {page === "invite" && <InvitePage />}
        {page === "settings" && <SettingsPage />}
    </AppShell>
  );
}

function Dashboard({
  tripTab,
  setTripTab,
  setPage,
}: {
  tripTab: TripTab;
  setTripTab: (tab: TripTab) => void;
  setPage: (page: Page) => void;
}) {
  return (
    <section className="dashboard-grid">
      <div className="trip-focus">
        <article className="hero-card">
          <div className="gradient-strip" />
          <div className="hero-card-content">
            <p className="eyebrow">Next up</p>
            <h2>{upcomingTrip.title}</h2>
            <p>{upcomingTrip.dates} · {upcomingTrip.route}</p>
            <div className="countdown-card">
              <strong>{upcomingTrip.daysToGo}</strong>
              <span>days to go</span>
            </div>
            <div className="cost-share-row" aria-label="Tracked cost split">
              {tripCostTotals.map((cost) => (
                <span key={cost.person}>{cost.total}<small>{cost.person}</small></span>
              ))}
            </div>
            <div className="metric-row">
              <span>{upcomingTrip.imported}<small>imports</small></span>
              <span>{upcomingTrip.places}<small>saved places</small></span>
              <span>{upcomingTrip.travellers}<small>travellers</small></span>
              <span>{upcomingTrip.cost}<small>tracked spend</small></span>
            </div>
            <button className="pill-button orange" onClick={() => setPage("trips")}>
              View all trips
              <ArrowRight size={16} />
            </button>
          </div>
        </article>
      </div>

      <aside className="side-panel notifications-panel">
        <h3>Helpful alerts</h3>
        <div className="notification-list">
          {dashboardNotifications.map((notification) => (
            <article key={notification.title}>
              <div>
                <strong>{notification.title}</strong>
                <p>{notification.detail}</p>
              </div>
              <button type="button">{notification.action}</button>
            </article>
          ))}
        </div>
      </aside>
    </section>
  );
}

function Trips({
  tripTab,
  setTripTab,
  tripSection,
  setTripSection,
  onViewMap,
}: {
  tripTab: TripTab;
  setTripTab: (tab: TripTab) => void;
  tripSection: TripSection;
  setTripSection: (section: TripSection) => void;
  onViewMap: (title: string) => void;
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const tripModeTabs = (
    <div className="tabs trip-mode-tabs">
      <button className={tripTab === "upcoming" ? "active" : ""} onClick={() => setTripTab("upcoming")}>
        Upcoming trips
      </button>
      <button className={tripTab === "past" ? "active" : ""} onClick={() => setTripTab("past")}>
        Past trips
      </button>
    </div>
  );

  if (!selectedTripId) {
    const visibleTrips =
      tripTab === "upcoming"
        ? upcomingTrips
        : [...pastTrips, { title: "Noosa girls weekend", dates: "Feb 2024", cost: "$1,120" }].map(
            (trip) => ({
              id: trip.title.toLowerCase().replaceAll(" ", "-"),
              title: trip.title,
              dates: trip.dates,
              where: "Places, notes and costs saved for next time",
              cost: trip.cost,
              meta: "Past trip",
            })
          );

    return (
      <>
        {tripModeTabs}
        <section className="panel large">
          <div className="trip-card-list">
            {visibleTrips.map((trip) => (
              <article
                key={trip.id}
                className={tripTab === "past" ? "trip-overview-card past-trip-card" : "trip-overview-card"}
              >
                <div>
                  <span>{trip.dates}</span>
                  <strong>{trip.title}</strong>
                  <p>{trip.where}</p>
                </div>
                <div className="trip-card-meta">
                  <strong>{trip.cost}</strong>
                  <span>{trip.meta}</span>
                  <button className="pill-button orange" onClick={() => setSelectedTripId(trip.id)}>
                    View trip
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </>
    );
  }

  const selectedTrip =
    tripDetails[selectedTripId as keyof typeof tripDetails] ?? tripDetails["europe-summer-2026"];

  return (
    <>
      <section className="two-column trip-page">
        <div className={tripSection === "stats" ? "panel large compact-fit" : "panel large"}>
          <button className="back-button trip-back-button" onClick={() => setSelectedTripId(null)}>
            <ChevronLeft size={15} />
            Back to trips
          </button>
          <div className="trip-tab-bar">
            <div className="tabs trip-tabs">
              <button
                className={tripSection === "overview" ? "active" : ""}
                onClick={() => setTripSection("overview")}
              >
                Overview
              </button>
              <button
                className={tripSection === "create" ? "active" : ""}
                onClick={() => setTripSection("create")}
              >
                Create
              </button>
              <button
                className={tripSection === "stats" ? "active" : ""}
                onClick={() => setTripSection("stats")}
              >
                Stats
              </button>
            </div>
            <button className="pill-button orange add-event-button" onClick={() => setIsAddModalOpen(true)}>
              <Plus size={16} />
              Add
            </button>
          </div>
          {tripSection === "overview" && <TripOverview trip={selectedTrip} />}
          {tripSection === "create" && <CreatePanel />}
          {tripSection === "stats" && <StatsPanel stats={selectedTrip.stats} costTotals={selectedTrip.costTotals} />}
        </div>
        <MapPreview copy={selectedTrip.mapCopy} onViewMap={() => onViewMap(selectedTrip.title)} />
      </section>
      {isAddModalOpen && <AddEventModal onClose={() => setIsAddModalOpen(false)} />}
    </>
  );
}

function AddEventModal({ onClose }: { onClose: () => void }) {
  const [addMode, setAddMode] = useState<"custom" | "library">("custom");
  const libraryPlaces = savedPlaces.filter((place) => place.added);
  const [selectedPlace, setSelectedPlace] = useState(libraryPlaces[0]);

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-event-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close add event modal">
          <X size={18} />
        </button>
        <span className="eyebrow">Add to itinerary</span>
        <h2 id="add-event-title">Add anything to this trip.</h2>
        <p>
          Add a custom plan, booking, note or a place from your library. Mysa places it
          into the right day based on the date, time and location.
        </p>
        <div className="add-source-options" aria-label="Add source">
          <button
            className={addMode === "custom" ? "active" : ""}
            type="button"
            onClick={() => setAddMode("custom")}
          >
            Custom item
          </button>
          <button
            className={addMode === "library" ? "active" : ""}
            type="button"
            onClick={() => setAddMode("library")}
          >
            From places library
          </button>
        </div>

        {addMode === "custom" ? (
          <div className="event-form">
            <label>
              Name
              <input value="Visit Sarah for dinner" readOnly />
            </label>
            <label>
              Address or note
              <input value="123 Street Name, Trastevere" readOnly />
            </label>
            <div className="form-grid">
              <label>
                Date
                <input value="Aug 10" readOnly />
              </label>
              <label>
                Time
                <input value="20:00" readOnly />
              </label>
            </div>
          </div>
        ) : (
          <div className="library-picker">
            <label>
              Search your places
              <input value="Restaurants, bakeries or views near Rome" readOnly />
            </label>
            <div className="library-place-list">
              {libraryPlaces.map((place) => (
                <button
                  key={place.title}
                  className={selectedPlace.title === place.title ? "active" : ""}
                  type="button"
                  onClick={() => setSelectedPlace(place)}
                >
                  <span>{place.category}</span>
                  <strong>{place.title}</strong>
                  <small>{place.note}</small>
                </button>
              ))}
            </div>
            <div className="form-grid">
              <label>
                Add to date
                <input value="Aug 10" readOnly />
              </label>
              <label>
                Preferred time
                <input value="15:30" readOnly />
              </label>
            </div>
          </div>
        )}
        <div className="modal-preview">
          <span>Will appear under</span>
          <strong>
            {addMode === "library"
              ? `Rome · Day 2 · ${selectedPlace.title} · from places library`
              : "Rome · Day 2 · Mon 10 Aug · 20:00 · custom item"}
          </strong>
        </div>
        <button className="pill-button orange" onClick={onClose}>
          Add to trip
          <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
}

function TripOverview({ trip }: { trip: (typeof tripDetails)[keyof typeof tripDetails] }) {
  const [selectedLegId, setSelectedLegId] = useState(trip.legs[0].id);
  const selectedLeg = trip.legs.find((leg) => leg.id === selectedLegId) ?? trip.legs[0];
  const [selectedDayId, setSelectedDayId] = useState(selectedLeg.days[0].id);
  const [selectedItem, setSelectedItem] = useState<
    (typeof selectedLeg.days)[number]["items"][number] | null
  >(null);
  const selectedDay =
    selectedLeg.days.find((day) => day.id === selectedDayId) ?? selectedLeg.days[0];

  function selectLeg(legId: string) {
    const nextLeg = trip.legs.find((leg) => leg.id === legId) ?? trip.legs[0];
    setSelectedLegId(nextLeg.id);
    setSelectedDayId(nextLeg.days[0].id);
  }

  return (
    <>
      <h2>{trip.title}</h2>
      <p className="lede">{trip.description}</p>
      <div className="leg-selector" aria-label="Trip legs">
        {trip.legs.map((leg) => (
          <button
            key={leg.id}
            className={selectedLeg.id === leg.id ? "active" : ""}
            onClick={() => selectLeg(leg.id)}
          >
            <strong>{leg.label}</strong>
            <span>{leg.dates} · {leg.base}</span>
          </button>
        ))}
      </div>
      <div className="day-strip" aria-label={`${selectedLeg.label} days`}>
        {selectedLeg.days.map((day) => (
          <button
            key={day.id}
            className={selectedDay.id === day.id ? "active" : ""}
            onClick={() => setSelectedDayId(day.id)}
          >
            <span>{day.label}</span>
            <strong>{day.date}</strong>
          </button>
        ))}
      </div>
      <article className="day-summary">
        <div>
          <span>{selectedLeg.label}</span>
          <h3>{selectedDay.title}</h3>
          <p>{selectedDay.summary}</p>
        </div>
        <strong>{selectedDay.distance}<small>planned walking</small></strong>
      </article>
      <div className="timeline">
        {selectedDay.items.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.label}
              className="clickable-timeline-item"
              role="button"
              tabIndex={0}
              onClick={() => setSelectedItem(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedItem(item);
                }
              }}
            >
              <time>{item.time}</time>
              <Icon size={18} />
              <div>
                <strong>{item.label}</strong>
                <p>{item.detail}</p>
              </div>
              <span className="timeline-cost-hint">Details</span>
            </article>
          );
        })}
      </div>
      {selectedItem && (
        <ItineraryItemModal
          item={selectedItem}
          legLabel={selectedLeg.label}
          dayLabel={selectedDay.date}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

function ItineraryItemModal({
  item,
  legLabel,
  dayLabel,
  onClose,
}: {
  item: (typeof tripLegs)[number]["days"][number]["items"][number];
  legLabel: string;
  dayLabel: string;
  onClose: () => void;
}) {
  const detailRows =
    item.icon === Plane
      ? [
          ["Departure", "Leaves Brisbane at 09:00 from International Terminal"],
          ["Stopover", "Perth connection · 2 hr 15 min layover"],
          ["Arrival", "Arrives Rome FCO Terminal 3 at 09:40"],
          ["Source", "Parsed from forwarded Qantas email"],
        ]
      : item.icon === Hotel
        ? [
            ["Check-in", `${item.time} · Airbnb Trastevere Terrace Studio`],
            ["Address", "Piazza di Santa Rufina, Trastevere"],
            ["Booking", "Confirmation email imported into accommodation"],
            ["Notes", "Keep first evening gentle and stay near the apartment"],
          ]
        : [
            ["Time", `${item.time} on ${dayLabel}`],
            ["Location", "Pinned from Google saved places"],
            ["Why it fits", "Close to the current route and grouped by AI"],
            ["Notes", item.detail],
          ];

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="modal-card itinerary-item-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="itinerary-item-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close itinerary item details">
          <X size={18} />
        </button>
        <span className="eyebrow">Itinerary item</span>
        <h2 id="itinerary-item-title">{item.label}</h2>
        <p>{item.detail}</p>
        <div className="itinerary-modal-grid">
          <div className="itinerary-detail-column">
            <div className="modal-preview">
              <span>Scheduled for</span>
              <strong>{legLabel} · {dayLabel} · {item.time}</strong>
            </div>
            <div className="item-detail-list">
              <article>
                <span>Name</span>
                <strong>{item.label}</strong>
              </article>
              <article>
                <span>Category</span>
                <strong>{item.icon === Plane ? "Transport" : item.icon === Hotel ? "Accommodation" : "Saved place"}</strong>
              </article>
              {detailRows.map(([label, value]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </article>
              ))}
            </div>
          </div>

          <aside className="itinerary-cost-column">
            <div className="modal-section-heading">
              <span>Cost details</span>
              <p>Optional, attached to this itinerary item.</p>
            </div>
            <div className="event-form">
              <label>
                Cost
                <input value="$237" readOnly />
              </label>
              <label>
                Category
                <input value="Transport" readOnly />
              </label>
              <label>
                Paid by
                <select value="Hannah" disabled>
                  <option>Hannah</option>
                  <option>Me</option>
                  <option>Mia</option>
                  <option>Sam</option>
                </select>
              </label>
              <label>
                Split with
                <select value="Me + Hannah" disabled>
                  <option>Me + Hannah</option>
                  <option>Everyone</option>
                  <option>Just me</option>
                </select>
              </label>
            </div>
            <button className="pill-button orange" onClick={onClose}>
              Save details
              <ArrowRight size={16} />
            </button>
          </aside>
        </div>
      </section>
    </div>
  );
}

