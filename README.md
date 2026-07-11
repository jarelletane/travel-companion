# Mysa

A premium personal travel workspace that combines trip commitments, accommodation, transport, saved Google Maps places, an interactive map and AI itinerary planning.

Live demo: https://travel-companion-jarl11.vercel.app/

## Why I Built This

I travel a lot and already do this planning work manually: saving cafes, restaurants, viewpoints, museums and local spots in Google Maps, then later trying to turn those saved places into a realistic day-by-day itinerary. This project came from wanting to remove that repetitive manual step and use AI to plan around places I had already personally chosen.

## MVP Direction

The product is designed to feel like a clean, focused travel workspace rather than a traditional itinerary planner. The current prototype is a multi-step app flow with AI planning, Google Maps saved-place integration and TripIt-style email forwarding.

Core workflow:

- Log in and create a trip or view upcoming and past trips.
- Keep the dashboard simple, with the next upcoming trip as the main focus and past trips in a separate tab.
- Add travellers as collaborators.
- Forward booking emails so the app can parse flights, trains, accommodation, tickets and events into the itinerary.
- Add accommodation, transport, restaurant bookings, tours and custom events manually when needed.
- Import or add saved Google Maps places into a personal place library.
- Search and filter saved places by category.
- View accommodation, fixed events, saved places and daily routes on a central map.
- Add saved places to specific itinerary days.
- Mark places as visited without removing them from the library.
- Generate AI suggestions that work around fixed events, free time, walking distance and user preferences.
- Track shared costs and view trip stats such as spend, kilometres and visited places.
- Keep account-level navigation focused on Dashboard, Trips, Costs, My Places, Imports, Invite and Settings.
- Keep trip-specific actions like Create and Stats inside the selected trip.

Visual direction:

- Clean white/cream background.
- Editorial serif headings.
- Orange-to-lilac gradient accents.
- Collapsible left navigation so the main trip content stays central.
- Separate pages for each major workflow to avoid information overload.

## Product Feel

The design direction is calm, premium and spacious, with inspiration from Notion, Linear, Airbnb, Apple Maps and Google Travel's more minimal surfaces. The target audience is travellers who enjoy planning and curating memorable experiences, especially women aged 25-40.

## Primary Screens Represented

- Dashboard
- Trips
- Daily Itinerary
- Interactive Map
- My Places Library
- Trip-specific AI Create
- Transport & Accommodation
- Entertainment & Activities
- Cost Tracking
- Trip-specific Stats
- Invite
- Trip Settings

## Tech Stack

- React
- TypeScript
- Vite
- CSS with design-token structure
- Lucide React icons

## Run Locally

```bash
npm install
npm run dev
```

## Future Features

- Google Maps import
- TripIt integration
- Email forwarding and itinerary parsing
- Weather-aware planning
- Public transport suggestions
- Collaborative planning
- Offline mode
- Expense tracking
- AI replanning during the trip
- Visited vs saved analytics
