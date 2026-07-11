import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Home,
  Hotel,
  Inbox,
  Mail,
  Map,
  MapPin,
  Plane,
  Plus,
  Search,
  Settings,
  Sparkles,
  Train,
  UserPlus,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import mysaIcon from "./assets/mysa-icon.png";
import mysaLogo from "./assets/mysa-logo.png";

type Page =
  | "login"
  | "dashboard"
  | "trips"
  | "places"
  | "imports"
  | "costs"
  | "invite"
  | "settings";

type TripTab = "upcoming" | "past";
type TripSection = "overview" | "create" | "stats";

const upcomingTrip = {
  title: "Europe summer 2026",
  dates: "8-24 Aug",
  route: "Brisbane → Rome → Stockholm → Pula → Venice → Florence → Rome",
  cost: "$5,367",
  travellers: 3,
  imported: 14,
  places: 38,
  daysToGo: 28,
};

const tripCostTotals = [
  { person: "You", total: "$2,578" },
  { person: "Hannah", total: "$2,789" },
];

const dashboardNotifications = [
  {
    title: "You owe Hannah $237",
    detail: "Flights to Rome and Pula ferry tickets are waiting to be balanced.",
    action: "Balance",
  },
  {
    title: "Accommodation gap",
    detail: "No stay is booked for 19-20 Aug between Venice and Florence.",
    action: "Review dates",
  },
  {
    title: "Saved places ready",
    detail: "12 saved places are close to planned days but not assigned yet.",
    action: "Plan places",
  },
];

const upcomingTrips = [
  {
    id: "europe-summer-2026",
    title: upcomingTrip.title,
    dates: upcomingTrip.dates,
    where: "Rome, Stockholm, Ljusdal, Pula, Venice and Florence",
    cost: upcomingTrip.cost,
    meta: `tracked so far · You ${tripCostTotals[0].total} · Hannah ${tripCostTotals[1].total}`,
  },
  {
    id: "bali-birthday-2026",
    title: "Bali birthday escape",
    dates: "2-9 Oct",
    where: "Canggu, Ubud and Uluwatu",
    cost: "$3,240",
    meta: "4 travellers · 12 saved places · 83 days to go",
  },
];

const pastTrips = [
  { title: "Japan spring notes", dates: "Apr 2025", cost: "$3,940" },
  { title: "Melbourne long weekend", dates: "Nov 2025", cost: "$860" },
];

const navItems: Array<{ page: Page; label: string; icon: React.ElementType }> = [
  { page: "dashboard", label: "Dashboard", icon: Home },
  { page: "trips", label: "Trips", icon: CalendarDays },
  { page: "costs", label: "Costs", icon: CircleDollarSign },
  { page: "places", label: "My Places", icon: MapPin },
  { page: "imports", label: "Imports", icon: Inbox },
  { page: "invite", label: "Invite", icon: UserPlus },
  { page: "settings", label: "Settings", icon: Settings },
];

const itinerary = [
  {
    time: "09:40",
    label: "Flight arrives",
    detail: "FCO Terminal 3 · parsed from forwarded Qantas email",
    icon: Plane,
  },
  {
    time: "15:00",
    label: "Check in",
    detail: "Airbnb Trastevere Terrace Studio · Piazza di Santa Rufina",
    icon: Hotel,
  },
  {
    time: "17:30",
    label: "Saved place nearby",
    detail: "Sant'Eustachio Il Caffe · from Google saved places",
    icon: MapPin,
  },
];

const tripLegs = [
  {
    id: "rome",
    label: "Rome",
    dates: "9-13 Aug",
    base: "Trastevere",
    days: [
      {
        id: "rome-1",
        label: "Day 1",
        date: "Sun 9 Aug",
        title: "Arrival and Trastevere check-in",
        summary: "Land, settle into the Airbnb and keep the first evening gentle.",
        distance: "2.4 km",
        items: itinerary,
      },
      {
        id: "rome-2",
        label: "Day 2",
        date: "Mon 10 Aug",
        title: "Coffee, Centro Storico and saved bakeries",
        summary: "AI clusters saved Google places around the Pantheon and Campo de' Fiori.",
        distance: "4.1 km",
        items: [
          {
            time: "09:30",
            label: "Faro coffee option",
            detail: "Saved under Coffee · near the morning route",
            icon: MapPin,
          },
          {
            time: "11:00",
            label: "Pantheon area",
            detail: "History stop with bakeries and shops nearby",
            icon: Map,
          },
          {
            time: "15:30",
            label: "Forno Campo de' Fiori",
            detail: "TikTok bakery save · add if still nearby",
            icon: MapPin,
          },
        ],
      },
      {
        id: "rome-3",
        label: "Day 3",
        date: "Tue 11 Aug",
        title: "Markets and viewpoints",
        summary: "A slower day using saved markets, viewpoints and flexible lunch options.",
        distance: "5.2 km",
        items: [
          {
            time: "10:00",
            label: "Mercato Testaccio",
            detail: "Saved market · lunch-friendly",
            icon: MapPin,
          },
          {
            time: "16:30",
            label: "Giardino degli Aranci",
            detail: "Sunset viewpoint option from Google saved places",
            icon: MapPin,
          },
        ],
      },
    ],
  },
  {
    id: "stockholm",
    label: "Stockholm",
    dates: "13-16 Aug",
    base: "Villa Dahlia / Ljusdal",
    days: [
      {
        id: "stockholm-1",
        label: "Day 5",
        date: "Thu 13 Aug",
        title: "Fly to Stockholm",
        summary: "Transport-heavy day with hotel check-in and a light evening.",
        distance: "1.8 km",
        items: [
          {
            time: "08:55",
            label: "FCO to ARN",
            detail: "Austrian flight · parsed from email import",
            icon: Plane,
          },
          {
            time: "15:00",
            label: "Check in Villa Dahlia",
            detail: "Accommodation tab · Vasastan",
            icon: Hotel,
          },
        ],
      },
      {
        id: "stockholm-2",
        label: "Day 6",
        date: "Fri 14 Aug",
        title: "Car pickup and Ljusdal transfer",
        summary: "Car hire, checkout and drive to the wedding accommodation.",
        distance: "0.9 km",
        items: [
          {
            time: "10:30",
            label: "Pick up Enterprise",
            detail: "Arlanda Terminal 2/4 · transport tab",
            icon: Train,
          },
          {
            time: "15:00",
            label: "Check in Airbnb - Larisa",
            detail: "Ljusdal stay · house rules stored",
            icon: Hotel,
          },
        ],
      },
    ],
  },
  {
    id: "italy-2",
    label: "Pula, Venice, Florence",
    dates: "16-23 Aug",
    base: "Multi-city",
    days: [
      {
        id: "pula-1",
        label: "Day 9",
        date: "Tue 18 Aug",
        title: "Pula concert night",
        summary: "Keep the day light before the Lorde concert at the arena.",
        distance: "2.7 km",
        items: [
          {
            time: "20:00",
            label: "Lorde: The Ultrasound Tour",
            detail: "CoreEvent ticket email · two lawn tickets",
            icon: CalendarDays,
          },
        ],
      },
      {
        id: "venice-1",
        label: "Day 10",
        date: "Wed 19 Aug",
        title: "Ferry to Venice",
        summary: "Transport day with check-in and a short evening walk.",
        distance: "2.2 km",
        items: [
          {
            time: "07:00",
            label: "Kompas ferry",
            detail: "Pula to Venice · imported transport",
            icon: Train,
          },
          {
            time: "15:00",
            label: "Check in Luxury Venetian Rooms",
            detail: "Castello accommodation",
            icon: Hotel,
          },
        ],
      },
    ],
  },
];

const baliTripLegs = [
  {
    id: "canggu",
    label: "Canggu",
    dates: "2-5 Oct",
    base: "Berawa villa",
    days: [
      {
        id: "bali-1",
        label: "Day 1",
        date: "Fri 2 Oct",
        title: "Arrival and villa check-in",
        summary: "Land in Denpasar, transfer to Canggu and keep dinner nearby.",
        distance: "1.6 km",
        items: [
          {
            time: "14:20",
            label: "Arrive in Denpasar",
            detail: "DPS airport · imported flight booking",
            icon: Plane,
          },
          {
            time: "16:30",
            label: "Check in Berawa villa",
            detail: "Four travellers · accommodation tab",
            icon: Hotel,
          },
          {
            time: "19:00",
            label: "Birthday dinner shortlist",
            detail: "Saved restaurants near Canggu",
            icon: MapPin,
          },
        ],
      },
      {
        id: "bali-2",
        label: "Day 2",
        date: "Sat 3 Oct",
        title: "Cafes, beach clubs and saved boutiques",
        summary: "Use saved Google places to cluster coffee, shops and sunset drinks.",
        distance: "3.8 km",
        items: [
          {
            time: "09:30",
            label: "Baked Canggu",
            detail: "Saved under Bakeries · brunch option",
            icon: MapPin,
          },
          {
            time: "13:00",
            label: "Boutique loop",
            detail: "Saved shops around Berawa and Batu Bolong",
            icon: Map,
          },
          {
            time: "17:30",
            label: "Sunset drinks",
            detail: "Beach club shortlist · split costs with four travellers",
            icon: CalendarDays,
          },
        ],
      },
    ],
  },
  {
    id: "ubud",
    label: "Ubud",
    dates: "5-7 Oct",
    base: "Jungle stay",
    days: [
      {
        id: "ubud-1",
        label: "Day 4",
        date: "Mon 5 Oct",
        title: "Transfer to Ubud",
        summary: "A slower transfer day with one optional saved lunch stop.",
        distance: "2.1 km",
        items: [
          {
            time: "10:00",
            label: "Private driver",
            detail: "Canggu to Ubud · transport tab",
            icon: Train,
          },
          {
            time: "15:00",
            label: "Check in jungle stay",
            detail: "Accommodation for four travellers",
            icon: Hotel,
          },
        ],
      },
      {
        id: "ubud-2",
        label: "Day 5",
        date: "Tue 6 Oct",
        title: "Rice terraces and spa time",
        summary: "AI keeps the morning active and the afternoon relaxed.",
        distance: "4.4 km",
        items: [
          {
            time: "08:30",
            label: "Tegalalang rice terrace",
            detail: "Saved viewpoint · early start suggested",
            icon: MapPin,
          },
          {
            time: "15:00",
            label: "Spa booking",
            detail: "Custom event · split four ways",
            icon: CalendarDays,
          },
        ],
      },
    ],
  },
  {
    id: "uluwatu",
    label: "Uluwatu",
    dates: "7-9 Oct",
    base: "Clifftop stay",
    days: [
      {
        id: "uluwatu-1",
        label: "Day 6",
        date: "Wed 7 Oct",
        title: "Cliffs and beach dinner",
        summary: "Saved beaches and dinner options grouped around sunset.",
        distance: "3.2 km",
        items: [
          {
            time: "11:00",
            label: "Bingin Beach",
            detail: "Saved beach · flexible swimming stop",
            icon: MapPin,
          },
          {
            time: "18:00",
            label: "Clifftop birthday dinner",
            detail: "Custom event · four travellers",
            icon: CalendarDays,
          },
        ],
      },
    ],
  },
];

const tripDetails = {
  "europe-summer-2026": {
    title: upcomingTrip.title,
    description:
      "Long trips are grouped by leg first, then by day, so six weeks of bookings, places and AI suggestions stay manageable.",
    legs: tripLegs,
    stats: [
      ["Tracked spend", "$5,367"],
      ["Imported bookings", "14"],
      ["Saved places", "38"],
      ["Planned walking", "18.6 km"],
    ],
    costTotals: tripCostTotals,
    mapCopy: "Saved places, bookings and daily routes stay connected visually.",
  },
  "bali-birthday-2026": {
    title: "Bali birthday escape",
    description:
      "A shorter four-person trip with each base split into days, saved Google places and shared birthday costs.",
    legs: baliTripLegs,
    stats: [
      ["Tracked spend", "$3,240"],
      ["Imported bookings", "6"],
      ["Saved places", "12"],
      ["Planned walking", "15.1 km"],
    ],
    costTotals: [
      { person: "You", total: "$810" },
      { person: "Hannah", total: "$810" },
      { person: "Mia", total: "$810" },
      { person: "Sam", total: "$810" },
    ],
    mapCopy: "Villa stays, saved cafes, beaches and dinner bookings grouped by base.",
  },
};

const imports = [
  { title: "QF 937 BNE → PER", type: "Flight", status: "Added to transport", icon: Plane },
  { title: "Airbnb Trastevere Terrace", type: "Accommodation", status: "Check-in added", icon: Hotel },
  { title: "Lorde ticket in Pula", type: "Activity", status: "Event created", icon: CalendarDays },
  { title: "Kompas Pula → Venice", type: "Ferry", status: "Transport added", icon: Train },
];

const savedPlaces = [
  { title: "Roscioli", category: "Restaurants", note: "Friday dinner area" },
  { title: "Forno Campo de' Fiori", category: "Bakeries", note: "TikTok save" },
  { title: "Giardino degli Aranci", category: "Views", note: "Sunset option" },
  { title: "Mercato Testaccio", category: "Markets", note: "Lunch stop" },
  { title: "Faro - Caffe Specialty", category: "Coffee", note: "Near hotel" },
  { title: "Via del Governo Vecchio", category: "Shopping", note: "Independent stores" },
];

const stats = [
  ["Tracked spend", "$5,367"],
  ["Imported bookings", "14"],
  ["Saved places", "38"],
  ["Planned walking", "18.6 km"],
];

const costBalances = [
  { name: "You", total: "$2,578", trips: "Flights, accommodation, tours and bookings paid so far" },
  { name: "Hannah", total: "$2,789", trips: "Rome flights, Pula concert, Florence train and shared stays" },
  { name: "Mia", total: "$118", trips: "Stockholm hotel and shared taxis" },
];

const itineraryCosts = [
  {
    item: "Flight arrives",
    trip: "Europe summer 2026",
    day: "Rome · Day 1",
    category: "Transport",
    paidBy: "Hannah",
    split: "You + Hannah",
    amount: "$237",
  },
  {
    item: "Check in",
    trip: "Europe summer 2026",
    day: "Rome · Day 1",
    category: "Accommodation",
    paidBy: "You",
    split: "You + Hannah",
    amount: "$1,820",
  },
  {
    item: "Clifftop birthday dinner",
    trip: "Bali birthday escape",
    day: "Uluwatu · Day 6",
    category: "Food",
    paidBy: "Mia",
    split: "Everyone",
    amount: "$420",
  },
];

const friends = [
  { name: "Hannah", trips: ["Europe summer 2026", "Japan spring notes"], access: "Can edit costs" },
  { name: "Mia", trips: ["Europe summer 2026"], access: "Can edit itinerary" },
  { name: "Sam", trips: ["Melbourne long weekend"], access: "View only" },
];

export function App() {
  const [page, setPage] = useState<Page>("login");
  const [collapsed, setCollapsed] = useState(false);
  const [tripTab, setTripTab] = useState<TripTab>("upcoming");
  const [tripSection, setTripSection] = useState<TripSection>("overview");

  const pageTitle = useMemo(() => {
    if (page === "dashboard") return "Dashboard";
    if (page === "trips") return "Trips";
    if (page === "places") return "My Places";
    if (page === "imports") return "Imports";
    if (page === "costs") return "Cost tracking";
    if (page === "invite") return "Invite";
    if (page === "settings") return "Settings";
    return "";
  }, [page]);

  if (page === "login") {
    return (
      <main className="login-page">
        <div className="gradient-band" />
        <nav className="login-nav">
          <img src={mysaLogo} alt="Mysa" className="logo-mark" />
          <span>Plan beautiful trips</span>
        </nav>
        <section className="login-hero">
          <div>
            <p className="eyebrow">AI planning for your real trip</p>
            <h1>
              From scattered plans to <em>beautiful days</em>
            </h1>
          </div>
          <aside className="login-panel">
            <p>
              Forward bookings, import saved Google places and let AI shape a
              realistic itinerary around what is already planned.
            </p>
            <div className="fake-form" aria-label="Login form">
              <label>
                Username
                <input value="jarelle@example.com" readOnly />
              </label>
              <label>
                Password
                <input value="mysa-demo" type="password" readOnly />
              </label>
              <button className="pill-button orange" onClick={() => setPage("dashboard")}>
                Log in
                <ArrowRight size={16} />
              </button>
            </div>
          </aside>
        </section>
      </main>
    );
  }

  return (
    <main className={collapsed ? "app-shell nav-collapsed" : "app-shell"}>
      <aside className="side-nav">
        <button className="collapse-button" onClick={() => setCollapsed((value) => !value)}>
          {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>
        <div className="brand">
          <img src={collapsed ? mysaIcon : mysaLogo} alt="Mysa" className="brand-logo" />
        </div>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.page}
                className={page === item.page ? "active" : ""}
                onClick={() => setPage(item.page)}
                title={item.label}
              >
                <Icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
        <button className="logout-button" onClick={() => setPage("login")} title="Log out">
          <ArrowRight size={18} />
          {!collapsed && <span>Log out</span>}
        </button>
      </aside>

      <section className="main-content">
        <header className="app-header">
          <div>
            {page !== "dashboard" && (
              <button className="back-button" onClick={() => setPage("dashboard")}>
                <ChevronLeft size={15} />
                Back to dashboard
              </button>
            )}
            <p className="eyebrow">{pageTitle}</p>
            <h1>{page === "dashboard" ? "Your next trip is ready." : pageTitle}</h1>
          </div>
          <button className="pill-button">
            <Plus size={17} />
            Add new
          </button>
        </header>

        {page === "dashboard" && (
          <Dashboard tripTab={tripTab} setTripTab={setTripTab} setPage={setPage} />
        )}
        {page === "trips" && (
          <Trips
            tripTab={tripTab}
            setTripTab={setTripTab}
            tripSection={tripSection}
            setTripSection={setTripSection}
          />
        )}
        {page === "places" && <Places />}
        {page === "imports" && <Imports />}
        {page === "costs" && <Costs />}
        {page === "invite" && <Invite />}
        {page === "settings" && <SettingsPage />}
      </section>
    </main>
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
}: {
  tripTab: TripTab;
  setTripTab: (tab: TripTab) => void;
  tripSection: TripSection;
  setTripSection: (section: TripSection) => void;
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
          {tripSection === "create" && <Create />}
          {tripSection === "stats" && <Stats stats={selectedTrip.stats} costTotals={selectedTrip.costTotals} />}
        </div>
        <MapPreview copy={selectedTrip.mapCopy} />
      </section>
      {isAddModalOpen && <AddEventModal onClose={() => setIsAddModalOpen(false)} />}
    </>
  );
}

function AddEventModal({ onClose }: { onClose: () => void }) {
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
        <span className="eyebrow">Custom itinerary event</span>
        <h2 id="add-event-title">Add something only you know about.</h2>
        <p>
          Add a dinner, visit, appointment or personal note. Mysa places it into the
          right day based on the date and time.
        </p>
        <div className="event-form">
          <label>
            Event name
            <input value="Visit Sarah for dinner" readOnly />
          </label>
          <label>
            Address
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
        <div className="modal-preview">
          <span>Will appear under</span>
          <strong>Rome · Day 2 · Mon 10 Aug · 20:00</strong>
        </div>
        <button className="pill-button orange" onClick={onClose}>
          Add to itinerary
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

function Places() {
  return (
    <section className="two-column">
      <div className="panel large">
        <div className="toolbar">
          <label>
            <Search size={16} />
            <input value="Bakeries near Trastevere" readOnly />
          </label>
          <button className="pill-button">Import Google</button>
        </div>
        <div className="place-grid">
          {savedPlaces.map((place) => (
            <article key={place.title}>
              <span>{place.category}</span>
              <strong>{place.title}</strong>
              <p>{place.note}</p>
              <button>Add to day</button>
            </article>
          ))}
        </div>
      </div>
      <MapPreview />
    </section>
  );
}

function Imports() {
  return (
    <section className="panel large">
      <div className="mail-drop">
        <Mail size={22} />
        <div>
          <h2>Forward travel emails to your trip inbox.</h2>
          <p>Flights, hotels, trains, tickets and restaurant bookings are parsed into the right pages.</p>
        </div>
      </div>
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
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Create() {
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

function Costs() {
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

function Stats({
  stats: statItems = stats,
  costTotals = tripCostTotals,
}: {
  stats?: string[][];
  costTotals?: typeof tripCostTotals;
}) {
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

function Invite() {
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

function SettingsPage() {
  return (
    <section className="panel large">
      <h2>Settings</h2>
      <p className="lede">
        Profile, connected Google account, forwarded email address and notification preferences.
      </p>
      <div className="settings-list">
        <article>
          <strong>Google Maps</strong>
          <p>Saved places connected · Bakeries, Restaurants, Views, Markets.</p>
        </article>
        <article>
          <strong>Email forwarding</strong>
          <p>forward@mysa.example · bookings are sorted into trips automatically.</p>
        </article>
      </div>
    </section>
  );
}

function MapPreview({ copy = "Saved places, bookings and daily routes stay connected visually." }: { copy?: string }) {
  return (
    <aside className="panel map-panel">
      <div className="map-preview">
        <Map size={22} />
        <span className="pin one" />
        <span className="pin two" />
        <span className="pin three" />
        <span className="pin four" />
        <span className="pin five" />
        <span className="pin six" />
        <span className="pin seven" />
      </div>
      <h3>Trip Map</h3>
      <p>{copy}</p>
    </aside>
  );
}
