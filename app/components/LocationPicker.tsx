"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function LocationPicker({
  latitude,
  longitude,
  onLocationChange,
}: {
  latitude: string;
  longitude: string;
  onLocationChange: (lat: string, lng: string, address: string) => void;
}) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          
          // Optional: Reverse geocode to get a readable address string using OpenStreetMap Nominatim
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await res.json();
            const address = data.display_name || "Detected GPS Location";
            onLocationChange(lat, lng, address);
          } catch {
            onLocationChange(lat, lng, "GPS Location");
          }
        },
        (error) => {
          alert("Unable to retrieve your location. Please check browser permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">
          Interactive Map Selection *
        </label>
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          className="border border-green-400/40 bg-green-400/10 px-3 py-1.5 text-[10px] font-semibold tracking-wider text-green-400 transition hover:bg-green-400/20"
        >
          📍 Detect My GPS Location
        </button>
      </div>

      {/* Embedded OpenStreetMap via iframe for instant, lightweight zero-config setup */}
      <div className="relative h-64 w-full border border-white/10 overflow-hidden bg-black/40">
        <iframe
          title="Map Location Picker"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }} // Sleek dark-mode map style
          loading="lazy"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${Number(longitude) - 0.01}%2C${Number(latitude) - 0.01}%2C${Number(longitude) + 0.01}%2C${Number(latitude) + 0.01}&layer=mapnik&marker=${latitude}%2C${longitude}`}
        />
      </div>
      <p className="text-[10px] text-white/40 italic">
        Current active coordinates: <span className="font-mono text-green-400">{latitude}, {longitude}</span>
      </p>
    </div>
  );
}