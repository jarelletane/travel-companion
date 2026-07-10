import {
  Archive,
  BarChart3,
  BedDouble,
  CalendarDays,
  Car,
  Check,
  CircleDollarSign,
  Coffee,
  Compass,
  Gem,
  Heart,
  Hotel,
  Import,
  Landmark,
  LayoutDashboard,
  Luggage,
  Map,
  MapPin,
  Plane,
  Plus,
  Receipt,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Train,
  Utensils,
  Wand2,
  Waves,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type Category =
  | "Accommodation"
  | "Cafe"
  | "Restaurant"
  | "Bar"
  | "Museum"
  | "Shopping"
  | "Market"
  | "Beach"
  | "Viewpoint"
  | "Hidden Gem"
  | "Transport"
  | "Event";

type SavedPlace = {
  id: string;
  name: string;
  category: Category;
  area: string;
  note: string;
  x: number;
  y: number;
  source: "Google saved" | "Added from Google";
};

type FixedEvent = {
  id: string;
  title: string;
  category: Category;
  day: number;
  time: string;
  area: string;
  note: string;
  x: number;
  y: number;
};

type Accommodation = {
  id: string;
  title: string;
  dayRange: string;
  area: string;
  note: string;
  x: number;
  y: number;
};

type MapItem = {
  id: string;
  title: string;
  category: Category;
  area: string;
  note: string;
  x: number;
  y: number;
  kind: "stay" | "fixed" | "place";
  day?: number;
  time?: string;
};

type Trip = {
  id: string;
  title: string;
  dates: string;
  status: "upcoming" | "past";
  summary: string;
};

type Collaborator = {
  name: string;
  role: string;
  status: string;
};

type InboxItem = {
  id: string;
  title: string;
  source: string;
  status: string;
  icon: React.ElementType;
};

type Module = {
  title: string;
  description: string;
  metric: string;
  icon: React.ElementType;
};

const categoryMeta: Record<Category, { color: string; icon: React.ElementType }> = {
  Accommodation: { color: "#7c6a55", icon: Hotel },
  Cafe: { color: "#b87949", icon: Coffee },
  Restaurant: { color: "#b65a54", icon: Utensils },
  Bar: { color: "#8f6aa9", icon: Gem },
  Museum: { color: "#7b83b9", icon: Landmark },
  Shopping: { color: "#5798a6", icon: ShoppingBag },
  Market: { color: "#8c9961", icon: ShoppingBag },
  Beach: { color: "#4f9fb6", icon: Waves },
  Viewpoint: { color: "#679269", icon: Compass },
  "Hidden Gem": { color: "#c78b62", icon: Heart },
  Transport: { color: "#68717b", icon: Train },
  Event: { color: "#c06b8a", icon: CalendarDays },
};

const accommodations: Accommodation[] = [
  {
    id: "stay-monti",
    title: "Hotel Artemide",
    dayRange: "Days 1-4",
    area: "Monti",
    note: "Primary base for morning starts and evening resets.",
    x: 69,
    y: 35,
  },
  {
    id: "stay-airport",
    title: "Fiumicino airport hotel",
    dayRange: "Final night",
    area: "FCO",
    note: "Added as a practical stop before the early flight home.",
    x: 16,
    y: 80,
  },
];

const fixedEvents: FixedEvent[] = [
  {
    id: "flight-in",
    title: "Arrive from Brisbane via Doha",
    category: "Transport",
    day: 1,
    time: "09:40",
    area: "FCO",
    note: "Leave buffer before the first planned stop.",
    x: 16,
    y: 80,
  },
  {
    id: "dinner-friday",
    title: "Dinner reservation at Roscioli",
    category: "Restaurant",
    day: 1,
    time: "20:00",
    area: "Campo de' Fiori",
    note: "Fixed booking the AI must work around.",
    x: 45,
    y: 58,
  },
  {
    id: "borghese-tour",
    title: "Galleria Borghese timed entry",
    category: "Event",
    day: 2,
    time: "11:00",
    area: "Pinciano",
    note: "Two-hour ticket window with a gentle park walk after.",
    x: 62,
    y: 25,
  },
  {
    id: "wedding-drinks",
    title: "Welcome drinks",
    category: "Event",
    day: 3,
    time: "18:30",
    area: "Trastevere",
    note: "Custom event imported into the trip workspace.",
    x: 32,
    y: 62,
  },
];

const savedPlaces: SavedPlace[] = [
  {
    id: "cafe-eustachio",
    name: "Sant'Eustachio Il Caffe",
    category: "Cafe",
    area: "Centro Storico",
    note: "Classic espresso stop near the Pantheon.",
    x: 48,
    y: 45,
    source: "Google saved",
  },
  {
    id: "pantheon",
    name: "Pantheon",
    category: "Museum",
    area: "Centro Storico",
    note: "History anchor and good rainy-day option.",
    x: 53,
    y: 42,
    source: "Google saved",
  },
  {
    id: "governo",
    name: "Via del Governo Vecchio",
    category: "Shopping",
    area: "Navona",
    note: "Independent stores and vintage finds.",
    x: 41,
    y: 47,
    source: "Google saved",
  },
  {
    id: "testaccio",
    name: "Mercato Testaccio",
    category: "Market",
    area: "Testaccio",
    note: "Food stalls for a casual lunch.",
    x: 55,
    y: 73,
    source: "Added from Google",
  },
  {
    id: "aranci",
    name: "Giardino degli Aranci",
    category: "Viewpoint",
    area: "Aventino",
    note: "Quiet sunset viewpoint with softer crowds.",
    x: 45,
    y: 70,
    source: "Added from Google",
  },
  {
    id: "faro",
    name: "Faro - Caffe Specialty",
    category: "Cafe",
    area: "Sallustiano",
    note: "Specialty coffee near the hotel.",
    x: 68,
    y: 29,
    source: "Added from Google",
  },
  {
    id: "jerry-thomas",
    name: "Jerry Thomas Speakeasy",
    category: "Bar",
    area: "Navona",
    note: "Optional late drink if the day still has energy.",
    x: 39,
    y: 50,
    source: "Google saved",
  },
  {
    id: "ostiense-dinner",
    name: "Trattoria Pennestri",
    category: "Restaurant",
    area: "Ostiense",
    note: "Local dinner option away from the busiest centre.",
    x: 60,
    y: 79,
    source: "Google saved",
  },
  {
    id: "hidden-courtyard",
    name: "Chiostro del Bramante",
    category: "Hidden Gem",
    area: "Navona",
    note: "Pretty indoor stop for a slower afternoon.",
    x: 38,
    y: 44,
    source: "Added from Google",
  },
];

const initialDayAssignments: Record<string, number> = {
  "cafe-eustachio": 1,
  pantheon: 1,
  governo: 1,
  faro: 2,
  testaccio: 3,
  aranci: 3,
};

const dayNotes = [
  {
    day: 1,
    title: "Arrival, centro storico and dinner",
    freeTime: "13:00-19:00",
    walking: "4.9 km",
    transport: "Taxi from FCO, then walk",
  },
  {
    day: 2,
    title: "Borghese morning and soft shopping loop",
    freeTime: "14:00-18:30",
    walking: "3.4 km",
    transport: "Mostly walking",
  },
  {
    day: 3,
    title: "Markets, Aventino and welcome drinks",
    freeTime: "09:30-17:30",
    walking: "4.2 km",
    transport: "Metro plus walk",
  },
  {
    day: 4,
    title: "Open morning and airport reset",
    freeTime: "09:00-15:00",
    walking: "2.1 km",
    transport: "Train to airport hotel",
  },
];

const categories = Object.keys(categoryMeta) as Category[];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Trip Overview", icon: CalendarDays },
  { label: "Daily Itinerary", icon: MapPin },
  { label: "Interactive Map", icon: Map },
  { label: "Add Places", icon: Heart },
  { label: "Create", icon: Sparkles },
  { label: "Accommodation", icon: BedDouble },
  { label: "Transport", icon: Train },
  { label: "Activities", icon: CalendarDays },
  { label: "Costs", icon: Receipt },
  { label: "Stats", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

const trips: Trip[] = [
  {
    id: "euro-2026",
    title: "Europe summer 2026",
    dates: "8-24 Aug",
    status: "upcoming",
    summary: "Rome, Stockholm, Ljusdal, Pula, Venice and Florence.",
  },
  {
    id: "rome-weekend",
    title: "Rome saved places draft",
    dates: "4 days",
    status: "upcoming",
    summary: "A focused planning board for saved cafes, markets and views.",
  },
  {
    id: "japan-2025",
    title: "Japan spring notes",
    dates: "Apr 2025",
    status: "past",
    summary: "Visited places, costs and favourite neighbourhoods kept for next time.",
  },
];

const collaborators: Collaborator[] = [
  { name: "Jarelle", role: "Owner", status: "Planning" },
  { name: "Mia", role: "Travel buddy", status: "Can edit costs" },
  { name: "Sam", role: "Guest", status: "View only" },
];

const inboxItems: InboxItem[] = [
  {
    id: "qf937",
    title: "QF 937 BNE to PER",
    source: "Forwarded email",
    status: "Flight added to Transport",
    icon: Plane,
  },
  {
    id: "airbnb-trastevere",
    title: "Airbnb Trastevere Terrace",
    source: "Booking email",
    status: "Stay added to Accommodation",
    icon: Hotel,
  },
  {
    id: "lorde-pula",
    title: "Lorde ticket in Pula",
    source: "CoreEvent email",
    status: "Event added to Activities",
    icon: CalendarDays,
  },
];

const modules: Module[] = [
  {
    title: "Accommodation",
    description: "Airbnbs, hotels, check-in rules and address details.",
    metric: "2 stays",
    icon: BedDouble,
  },
  {
    title: "Transport",
    description: "Flights, trains, ferries, car hire and airport transfers.",
    metric: "6 legs",
    icon: Luggage,
  },
  {
    title: "Entertainment & activities",
    description: "Tours, restaurants, concerts, weddings and timed bookings.",
    metric: "4 events",
    icon: CalendarDays,
  },
  {
    title: "Cost tracking",
    description: "Split expenses with friends, Tricount-style.",
    metric: "$1,842 tracked",
    icon: CircleDollarSign,
  },
  {
    title: "Stats",
    description: "Costs, kilometres, visited places and trip pace.",
    metric: "18.6 km planned",
    icon: BarChart3,
  },
];

export function App() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState("cafe-eustachio");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategories, setActiveCategories] = useState<Category[]>(
    categories.filter((category) => !["Accommodation", "Transport", "Event"].includes(category))
  );
  const [dayAssignments, setDayAssignments] =
    useState<Record<string, number>>(initialDayAssignments);
  const [visitedIds, setVisitedIds] = useState<string[]>(["pantheon"]);
  const [generated, setGenerated] = useState(true);

  const selectedDayMeta = dayNotes.find((day) => day.day === selectedDay)!;

  const mapItems = useMemo<MapItem[]>(() => {
    const stayItems = accommodations.map((stay) => ({
      id: stay.id,
      title: stay.title,
      category: "Accommodation" as Category,
      area: stay.area,
      note: stay.note,
      x: stay.x,
      y: stay.y,
      kind: "stay" as const,
    }));
    const eventItems = fixedEvents.map((event) => ({
      id: event.id,
      title: event.title,
      category: event.category,
      area: event.area,
      note: event.note,
      x: event.x,
      y: event.y,
      kind: "fixed" as const,
      day: event.day,
      time: event.time,
    }));
    const placeItems = savedPlaces.map((place) => ({
      id: place.id,
      title: place.name,
      category: place.category,
      area: place.area,
      note: place.note,
      x: place.x,
      y: place.y,
      kind: "place" as const,
      day: dayAssignments[place.id],
    }));

    return [...stayItems, ...eventItems, ...placeItems];
  }, [dayAssignments]);

  const visibleMapItems = useMemo(
    () =>
      mapItems.filter((item) => {
        const isAlwaysVisible = item.kind === "stay";
        const matchesDay = isAlwaysVisible || !item.day || item.day === selectedDay;
        const matchesCategory =
          item.kind !== "place" || activeCategories.includes(item.category);
        return matchesDay && matchesCategory;
      }),
    [activeCategories, mapItems, selectedDay]
  );

  const filteredSavedPlaces = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return savedPlaces.filter((place) => {
      const matchesSearch =
        query.length === 0 ||
        [place.name, place.category, place.area, place.note, place.source]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesSearch && activeCategories.includes(place.category);
    });
  }, [activeCategories, searchTerm]);

  const timelineItems = useMemo(() => {
    const fixed = fixedEvents
      .filter((event) => event.day === selectedDay)
      .map((event) => ({
        id: event.id,
        title: event.title,
        category: event.category,
        area: event.area,
        note: event.note,
        time: event.time,
        kind: "Fixed" as const,
      }));
    const planned = savedPlaces
      .filter((place) => dayAssignments[place.id] === selectedDay)
      .map((place, index) => ({
        id: place.id,
        title: place.name,
        category: place.category,
        area: place.area,
        note: place.note,
        time: index === 0 ? "10:30" : index === 1 ? "12:00" : index === 2 ? "15:30" : "17:00",
        kind: "Flexible" as const,
      }));

    return [...fixed, ...planned].sort((a, b) => a.time.localeCompare(b.time));
  }, [dayAssignments, selectedDay]);

  const selectedItem = mapItems.find((item) => item.id === selectedItemId) ?? mapItems[0];
  const plannedCount = Object.keys(dayAssignments).length;
  const visitedCount = visitedIds.length;

  function assignPlaceToDay(placeId: string, day: number) {
    setDayAssignments((current) => ({ ...current, [placeId]: day }));
    setSelectedDay(day);
    setSelectedItemId(placeId);
    setGenerated(false);
  }

  function removePlaceFromDay(placeId: string) {
    setDayAssignments((current) => {
      const next = { ...current };
      delete next[placeId];
      return next;
    });
    setGenerated(false);
  }

  function toggleVisited(placeId: string) {
    setVisitedIds((current) =>
      current.includes(placeId)
        ? current.filter((id) => id !== placeId)
        : [...current, placeId]
    );
  }

  function toggleCategory(category: Category) {
    if (["Accommodation", "Transport", "Event"].includes(category)) return;
    setActiveCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  }

  return (
    <main className="app-shell">
      <aside className="rail" aria-label="Workspace navigation">
        <div className="brand">
          <span className="brand-mark">
            <Sparkles size={19} />
          </span>
          <div>
            <strong>Travel Companion</strong>
            <span>A softer way to plan</span>
          </div>
        </div>

        <nav className="nav-list">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button key={item.label} className={index === 1 ? "is-active" : ""}>
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="trip-card">
          <span>Logged in as</span>
          <strong>Jarelle</strong>
          <p>3 trips · 2 collaborators · email import on</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">Your trips, gathered gently</span>
            <h1>Forward the booking, save the bakery, invite the friend, then let the day take shape.</h1>
            <p>
              A calm TripIt-like home for bookings, collaborators, saved Google
              places, costs and AI planning, without making you enter the same
              trip twice.
            </p>
          </div>
          <div className="mood-card" aria-label="Trip mood">
            <span>Trip mood</span>
            <strong>Shared notes, cute bakeries, easy days, no duplicate admin</strong>
          </div>
          <button className="primary-action" onClick={() => setGenerated(true)}>
            {generated ? <Check size={18} /> : <Wand2 size={18} />}
            {generated ? "Workspace refreshed" : "Create the plan"}
          </button>
        </header>

        <section className="summary-grid" aria-label="Trip summary">
          <article>
            <span>Upcoming trips</span>
            <strong>{trips.filter((trip) => trip.status === "upcoming").length}</strong>
            <p>Create a new trip or jump back into one already underway.</p>
          </article>
          <article>
            <span>Email imports</span>
            <strong>{inboxItems.length}</strong>
            <p>Forwarded bookings become transport, stays and events.</p>
          </article>
          <article>
            <span>Saved places</span>
            <strong>{savedPlaces.length}</strong>
            <p>Google categories become a personal place library.</p>
          </article>
          <article>
            <span>Costs tracked</span>
            <strong>$1.8k</strong>
            <p>Shared expenses live beside the itinerary.</p>
          </article>
        </section>

        <section className="hub-grid" aria-label="Trip dashboard">
          <div className="hub-panel">
            <div className="panel-heading">
              <div>
                <span>Dashboard</span>
                <h2>Create a trip or return to one already in motion.</h2>
              </div>
              <button className="secondary-action">
                <Plus size={17} />
                New trip
              </button>
            </div>
            <div className="trip-list">
              {trips.map((trip) => (
                <article key={trip.id} className="trip-row">
                  <div>
                    <span>{trip.status === "upcoming" ? "Upcoming" : "Past"}</span>
                    <strong>{trip.title}</strong>
                    <p>{trip.dates} · {trip.summary}</p>
                  </div>
                  <Archive size={17} />
                </article>
              ))}
            </div>
          </div>

          <aside className="hub-panel compact-hub">
            <div className="panel-heading compact">
              <div>
                <span>Collaborators</span>
                <h2>Plan with the people coming along.</h2>
              </div>
            </div>
            <div className="collab-list">
              {collaborators.map((person) => (
                <article key={person.name}>
                  <div className="avatar">{person.name.slice(0, 1)}</div>
                  <div>
                    <strong>{person.name}</strong>
                    <p>{person.role} · {person.status}</p>
                  </div>
                </article>
              ))}
            </div>
          </aside>

          <aside className="hub-panel compact-hub">
            <div className="panel-heading compact">
              <div>
                <span>Email inbox</span>
                <h2>Forward bookings and let the app file them.</h2>
              </div>
            </div>
            <div className="inbox-list">
              {inboxItems.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.id}>
                    <Icon size={17} />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.source} · {item.status}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </aside>
        </section>

        <section className="planner-grid">
          <div className="map-panel">
            <div className="panel-heading">
              <div>
                <span>Interactive map</span>
                <h2>A quiet map of what matters today.</h2>
              </div>
              <div className="day-switcher" aria-label="Select trip day">
                {dayNotes.map((day) => (
                  <button
                    key={day.day}
                    className={selectedDay === day.day ? "is-selected" : ""}
                    onClick={() => setSelectedDay(day.day)}
                  >
                    Day {day.day}
                  </button>
                ))}
              </div>
            </div>

            <div className="map-canvas" aria-label="Rome planning map">
              <div className="river" />
              <div className="street street-a" />
              <div className="street street-b" />
              <div className="street street-c" />
              <svg className="route-line" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                  points={visibleMapItems
                    .filter((item) => item.kind !== "stay")
                    .map((item) => `${item.x},${item.y}`)
                    .join(" ")}
                />
              </svg>
              {visibleMapItems.map((item) => {
                const Icon = categoryMeta[item.category].icon;
                return (
                  <button
                    key={item.id}
                    className={[
                      "map-pin",
                      item.kind,
                      selectedItem.id === item.id ? "is-selected" : "",
                    ].join(" ")}
                    style={
                      {
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        "--pin-color": categoryMeta[item.category].color,
                      } as React.CSSProperties
                    }
                    onClick={() => setSelectedItemId(item.id)}
                    title={`${item.title} - ${item.note}`}
                  >
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>

            <div className="selected-detail">
              <div
                className="detail-icon"
                style={{ backgroundColor: categoryMeta[selectedItem.category].color }}
              >
                {(() => {
                  const Icon = categoryMeta[selectedItem.category].icon;
                  return <Icon size={18} />;
                })()}
              </div>
              <div>
                <span>{selectedItem.kind === "fixed" ? "Fixed commitment" : selectedItem.category}</span>
                <strong>{selectedItem.title}</strong>
                <p>{selectedItem.area} · {selectedItem.note}</p>
              </div>
            </div>
          </div>

          <aside className="timeline-panel" aria-label="Daily itinerary">
            <div className="panel-heading compact">
              <div>
                <span>Daily itinerary</span>
                <h2>{selectedDayMeta.title}</h2>
              </div>
            </div>

            <div className="day-stats">
              <span>{selectedDayMeta.freeTime} free</span>
              <span>{selectedDayMeta.walking} walking</span>
              <span>{selectedDayMeta.transport}</span>
            </div>

            <div className="timeline-list">
              {timelineItems.map((item) => {
                const Icon = categoryMeta[item.category].icon;
                const isVisited = visitedIds.includes(item.id);
                return (
                  <article
                    key={item.id}
                    className={[
                      "timeline-item",
                      selectedItem.id === item.id ? "is-selected" : "",
                    ].join(" ")}
                    onClick={() => setSelectedItemId(item.id)}
                  >
                    <time>{item.time}</time>
                    <div
                      className="timeline-icon"
                      style={{ backgroundColor: categoryMeta[item.category].color }}
                    >
                      <Icon size={15} />
                    </div>
                    <div>
                      <span>{item.kind}</span>
                      <strong>{item.title}</strong>
                      <p>{item.area} · {item.note}</p>
                      {item.kind === "Flexible" && (
                        <button
                          className={isVisited ? "mini-action is-done" : "mini-action"}
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleVisited(item.id);
                          }}
                        >
                          {isVisited ? "Visited" : "Mark visited"}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </aside>
        </section>

        <section className="module-grid" aria-label="Trip modules">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <article key={module.title} className="module-card">
                <Icon size={19} />
                <span>{module.metric}</span>
                <strong>{module.title}</strong>
                <p>{module.description}</p>
              </article>
            );
          })}
        </section>

        <section className="lower-grid">
          <div className="library-panel">
            <div className="panel-heading">
              <div>
                <span>Saved places library</span>
                <h2>Look up any place, import saved lists, then choose what belongs on this trip.</h2>
              </div>
              <button className="secondary-action">
                <Import size={17} />
                Import Google
              </button>
            </div>

            <div className="search-row">
              <label>
                <Search size={16} />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search bakeries, markets, saved lists..."
                />
              </label>
            </div>

            <div className="filter-list">
              {categories
                .filter((category) => !["Accommodation", "Transport", "Event"].includes(category))
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

            <div className="place-list">
              {filteredSavedPlaces.map((place) => {
                const Icon = categoryMeta[place.category].icon;
                const assignedDay = dayAssignments[place.id];
                const isVisited = visitedIds.includes(place.id);
                return (
                  <article key={place.id} className="place-card">
                    <div
                      className="place-icon"
                      style={{ backgroundColor: categoryMeta[place.category].color }}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="place-copy">
                      <span>{place.source} · {place.category}</span>
                      <strong>{place.name}</strong>
                      <p>{place.area} · {place.note}</p>
                      <div className="place-actions">
                        {dayNotes.map((day) => (
                          <button
                            key={day.day}
                            className={assignedDay === day.day ? "is-active" : ""}
                            onClick={() => assignPlaceToDay(place.id, day.day)}
                          >
                            Day {day.day}
                          </button>
                        ))}
                        {assignedDay && (
                          <button onClick={() => removePlaceFromDay(place.id)}>
                            <X size={14} />
                          </button>
                        )}
                        <button
                          className={isVisited ? "visited-toggle is-active" : "visited-toggle"}
                          onClick={() => toggleVisited(place.id)}
                        >
                          <Check size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="ai-panel" aria-label="AI planner">
            <div className="panel-heading compact">
              <div>
                <span>AI planner</span>
                <h2>Create a day from everything already in the trip.</h2>
              </div>
            </div>

            <div className="prompt-box">
              <Sparkles size={18} />
              <p>
                Use my forwarded bookings, accommodation, transport, saved Google
                places, collaborators' notes and costs. Suggest a gentle day in
                Rome with bakeries nearby and no clashes.
              </p>
            </div>

            <div className="ai-stack">
              <article>
                <span>Constraint found</span>
                <strong>Email bookings parsed</strong>
                <p>Flights, check-ins and tickets are filed into the right tabs.</p>
              </article>
              <article>
                <span>Saved-place fit</span>
                <strong>{plannedCount} flexible places placed</strong>
                <p>Nearby Google saves are chosen before generic suggestions.</p>
              </article>
              <article>
                <span>Shared context</span>
                <strong>{collaborators.length} travellers included</strong>
                <p>Costs, notes and preferences stay attached to the trip.</p>
              </article>
            </div>

            <button className="primary-action wide" onClick={() => setGenerated(true)}>
              <Wand2 size={18} />
              Soften the plan
            </button>
          </aside>
        </section>
      </section>
    </main>
  );
}
