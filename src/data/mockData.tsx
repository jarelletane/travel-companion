import { CalendarDays, CircleDollarSign, Home, Hotel, Inbox, Map, MapPin, Plane, Settings, Train, UserPlus } from "lucide-react";
import type { ElementType } from "react";
import type { Page } from "../types/navigation";

export const upcomingTrip = {
  title: "Europe summer 2026",
  dates: "8-24 Aug",
  route: "Brisbane → Rome → Stockholm → Pula → Venice → Florence → Rome",
  cost: "$5,367",
  travellers: 3,
  imported: 14,
  places: 38,
  daysToGo: 28,
};

export const tripCostTotals = [
  { person: "You", total: "$2,578" },
  { person: "Hannah", total: "$2,789" },
];

export const dashboardNotifications = [
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

export const upcomingTrips = [
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

export const pastTrips = [
  { title: "Japan spring notes", dates: "Apr 2025", cost: "$3,940" },
  { title: "Melbourne long weekend", dates: "Nov 2025", cost: "$860" },
];

export const navItems: Array<{ page: Page; label: string; icon: ElementType }> = [
  { page: "dashboard", label: "Dashboard", icon: Home },
  { page: "trips", label: "Trips", icon: CalendarDays },
  { page: "costs", label: "Costs", icon: CircleDollarSign },
  { page: "places", label: "My Places", icon: MapPin },
  { page: "imports", label: "Imports", icon: Inbox },
  { page: "invite", label: "Invite", icon: UserPlus },
  { page: "settings", label: "Settings", icon: Settings },
];

export const itinerary = [
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

export const tripLegs = [
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

export const baliTripLegs = [
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

export const tripDetails = {
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

export const imports = [
  { title: "QF 937 BNE → PER", type: "Flight", status: "Added to transport", icon: Plane },
  { title: "Airbnb Trastevere Terrace", type: "Accommodation", status: "Check-in added", icon: Hotel },
  { title: "Lorde ticket in Pula", type: "Activity", status: "Event created", icon: CalendarDays },
  { title: "Kompas Pula → Venice", type: "Ferry", status: "Transport added", icon: Train },
];

export const savedPlaces = [
  { title: "Roscioli", category: "Restaurants", note: "Imported from Google Maps saved places", added: true },
  { title: "Forno Campo de' Fiori", category: "Bakeries", note: "Added from Google Places search", added: true },
  { title: "Giardino degli Aranci", category: "Views", note: "Imported from a saved places file", added: true },
  { title: "Mercato Testaccio", category: "Markets", note: "Suggested from Google Places search", added: false },
  { title: "Faro - Caffe Specialty", category: "Coffee", note: "Suggested from Google Places search", added: false },
  { title: "Via del Governo Vecchio", category: "Shopping", note: "Imported from Google Maps saved places", added: true },
];

export const stats = [
  ["Tracked spend", "$5,367"],
  ["Imported bookings", "14"],
  ["Saved places", "38"],
  ["Planned walking", "18.6 km"],
];

export const costBalances = [
  { name: "You", total: "$2,578", trips: "Flights, accommodation, tours and bookings paid so far" },
  { name: "Hannah", total: "$2,789", trips: "Rome flights, Pula concert, Florence train and shared stays" },
  { name: "Mia", total: "$118", trips: "Stockholm hotel and shared taxis" },
];

export const itineraryCosts = [
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

export const friends = [
  { name: "Hannah", trips: ["Europe summer 2026", "Japan spring notes"], access: "Can edit costs" },
  { name: "Mia", trips: ["Europe summer 2026"], access: "Can edit itinerary" },
  { name: "Sam", trips: ["Melbourne long weekend"], access: "View only" },
];

