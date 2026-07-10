# AI Travel Companion

A premium personal travel workspace that combines trip commitments, accommodation, transport, saved Google Maps places, an interactive map and AI itinerary planning.

Live demo: https://travel-companion-jarl11.vercel.app/

## Why I Built This

I travel a lot and already do this planning work manually: saving cafes, restaurants, viewpoints, museums and local spots in Google Maps, then later trying to turn those saved places into a realistic day-by-day itinerary. This project came from wanting to remove that repetitive manual step and use AI to plan around places I had already personally chosen.

## MVP Direction

The product is designed to feel more like a calm travel workspace than a traditional itinerary planner. Users bring all trip information into one place, then AI helps organise the plan around fixed commitments and flexible saved places.

Core workflow:

- Create a trip with destination and travel dates.
- Add accommodation, transport, restaurant bookings, tours and custom events.
- Import or add saved Google Maps places into a personal place library.
- Search and filter saved places by category.
- View accommodation, fixed events, saved places and daily routes on a central map.
- Add saved places to specific itinerary days.
- Mark places as visited without removing them from the library.
- Generate AI suggestions that work around fixed events, free time, walking distance and user preferences.

## Product Feel

The design direction is calm, premium and spacious, with inspiration from Notion, Linear, Airbnb, Apple Maps and Google Travel's more minimal surfaces. The target audience is travellers who enjoy planning and curating memorable experiences, especially women aged 25-40.

## Primary Screens Represented

- Dashboard
- Trip Overview
- Daily Itinerary
- Interactive Map
- Saved Places Library
- AI Planner
- Transport & Accommodation
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
- Weather-aware planning
- Public transport suggestions
- Collaborative planning
- Offline mode
- Expense tracking
- AI replanning during the trip
- Visited vs saved analytics
