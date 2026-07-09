# AI Travel Companion

A portfolio project that turns a traveller's personally saved Google Maps places into realistic AI-generated itineraries.

Live demo: https://travel-companion-jarl11.vercel.app/

## Why I Built This

I travel a lot and already do this planning work manually: saving cafes, restaurants, viewpoints, museums, and local spots in Google Maps, then later trying to turn those saved places into a realistic day-by-day itinerary. This project came from wanting to remove that repetitive manual step and use AI to plan around places I had already personally chosen.

The prototype demonstrates the core product loop:

- Import saved places from a Google Maps export.
- Categorise places by type.
- Add trip context such as destination, dates, pace, accommodation, and interests.
- Generate a day-by-day itinerary that prioritises saved places.
- Visualise daily walking routes and map filters.

## Tech Stack

- React
- TypeScript
- Vite
- CSS with a Tailwind-friendly design-token structure
- Lucide React icons

## Run Locally

```bash
npm install
npm run dev
```

## Product Roadmap

- Google Takeout parser for saved places.
- Mapbox GL or Google Maps rendering.
- OpenAI itinerary generation endpoint.
- Places API enrichment for opening hours, ratings, and photos.
- PostGIS-backed clustering and distance calculations.
- Authentication and collaborative trips.
