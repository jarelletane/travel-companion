import { ArrowRight, ChevronLeft, Map } from "lucide-react";
import { useState } from "react";

type TripMapPageProps = {
  title: string;
  onBack: () => void;
};

export function TripMapPage({ title, onBack }: TripMapPageProps) {
  const [activeLayer, setActiveLayer] = useState("Day 2");
  const [selectedPin, setSelectedPin] = useState("Pantheon area");
  const mapPins = [
    ["Hotel", "Trastevere stay", "Check-in · 15:00", "hotel"],
    ["Day 2", "Pantheon area", "History, coffee and saved bakeries", "day"],
    ["Food", "Forno Campo de' Fiori", "Saved bakery · add to afternoon", "food"],
    ["View", "Giardino degli Aranci", "Sunset option · 16:30", "view"],
    ["Transit", "Roma Termini", "Train connection", "transit"],
  ];

  return (
    <section className="trip-map-page">
      <button className="back-button trip-back-button" onClick={onBack}>
        <ChevronLeft size={15} />
        Back to trip
      </button>
      <div className="trip-map-header">
        <div>
          <p className="eyebrow">{title}</p>
          <h2>Map</h2>
          <p>Saved places, bookings and daily routes in one interactive view.</p>
        </div>
        <div className="map-layer-tabs" aria-label="Map layers">
          {["All", "Day 1", "Day 2", "Food", "Transit"].map((layer) => (
            <button
              key={layer}
              className={activeLayer === layer ? "active" : ""}
              onClick={() => setActiveLayer(layer)}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>
      <div className="full-trip-map">
        <div className="route-line" />
        {mapPins.map(([type, label, detail, className]) => (
          <button
            key={label}
            className={`map-pin-button ${className} ${selectedPin === label ? "active" : ""}`}
            onClick={() => setSelectedPin(label)}
          >
            <span>{type}</span>
          </button>
        ))}
        <aside className="map-info-card">
          <span>Selected</span>
          <strong>{selectedPin}</strong>
          <p>{mapPins.find((pin) => pin[1] === selectedPin)?.[2]}</p>
          <button className="pill-button orange">Add to day</button>
        </aside>
      </div>
    </section>
  );
}

type MapPreviewProps = {
  copy?: string;
  onViewMap?: () => void;
};

export function MapPreview({
  copy = "Saved places, bookings and daily routes stay connected visually.",
  onViewMap,
}: MapPreviewProps) {
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
      {onViewMap && (
        <button className="pill-button orange map-view-button" onClick={onViewMap}>
          View map
          <ArrowRight size={16} />
        </button>
      )}
    </aside>
  );
}

