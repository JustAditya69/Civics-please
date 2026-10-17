"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { reverseGeocode, searchAddress } from "../actions/geocode";

interface LocationPickerProps {
  latitude: string;
  longitude: string;
  onLocationChange: (lat: string, lng: string, address: string) => void;
}

export default function LocationPicker({
  latitude,
  longitude,
  onLocationChange,
}: LocationPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [isLocating, setIsLocating] = useState(false);
  const [statusNotice, setStatusNotice] = useState("");
  
  // Search bar state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Function to create a custom retro vector marker (bypasses broken image asset paths in bundlers)
  const createRetroPin = () => {
    return L.divIcon({
      className: "custom-retro-marker",
      html: `
        <div style="
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translate(-16px, -32px);
          cursor: grab;
        ">
          <div style="
            background-color: #fa6355;
            border: 3px solid #113320;
            box-shadow: 3px 3px 0px #113320;
            width: 28px;
            height: 28px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background-color: #ffffff;
              border-radius: 50%;
              border: 2px solid #113320;
            "></div>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  // Helper to commit coordinates and trigger reverse-geocoding
  const handleCoordinateSelect = async (
    latNum: number,
    lngNum: number,
    knownAddress?: string,
    sourceLabel: string = "Map Pin"
  ) => {
    const latStr = latNum.toFixed(6);
    const lngStr = lngNum.toFixed(6);

    // Update marker and pan map
    if (markerRef.current) {
      markerRef.current.setLatLng([latNum, lngNum]);
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([latNum, lngNum], Math.max(mapInstanceRef.current.getZoom(), 15));
    }

    if (knownAddress) {
      onLocationChange(latStr, lngStr, knownAddress);
      setStatusNotice(`Location updated: ${sourceLabel}`);
      setTimeout(() => setStatusNotice(""), 3500);
      return;
    }

    setStatusNotice("Resolving address details...");
    try {
      const geoRes = await reverseGeocode(latStr, lngStr);
      if (geoRes.success && geoRes.address) {
        onLocationChange(latStr, lngStr, geoRes.address);
        setStatusNotice(`Address resolved (${sourceLabel})`);
      } else {
        onLocationChange(latStr, lngStr, `Location (${latStr}, ${lngStr})`);
        setStatusNotice(`Coordinates set (${sourceLabel})`);
      }
    } catch {
      onLocationChange(latStr, lngStr, `Location (${latStr}, ${lngStr})`);
      setStatusNotice(`Coordinates set (${sourceLabel})`);
    }

    setTimeout(() => setStatusNotice(""), 3500);
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const initialLat = parseFloat(latitude) || 12.9716;
    const initialLng = parseFloat(longitude) || 77.5946;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 14,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const pinIcon = createRetroPin();
    const marker = L.marker([initialLat, initialLng], {
      icon: pinIcon,
      draggable: true,
    }).addTo(map);

    // Click anywhere on map to reposition pin
    map.on("click", (e: L.LeafletMouseEvent) => {
      handleCoordinateSelect(e.latlng.lat, e.latlng.lng, undefined, "Map Click");
    });

    // Marker drag end
    marker.on("dragend", () => {
      const pos = marker.getLatLng();
      handleCoordinateSelect(pos.lat, pos.lng, undefined, "Dragged Marker");
    });

    mapInstanceRef.current = map;
    markerRef.current = marker;

    // Invalidate map size after DOM render to ensure full canvas coverage
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // Update marker position when parent props change externally
  useEffect(() => {
    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);
    if (!isNaN(latNum) && !isNaN(lngNum) && markerRef.current) {
      const current = markerRef.current.getLatLng();
      if (Math.abs(current.lat - latNum) > 0.0001 || Math.abs(current.lng - lngNum) > 0.0001) {
        markerRef.current.setLatLng([latNum, lngNum]);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo([latNum, lngNum]);
        }
      }
    }
  }, [latitude, longitude]);

  // Handle Geolocation Fetching with high-accuracy, low-accuracy, and IP fallback
  const handleGetCurrentLocation = async () => {
    if (isLocating) return;
    setIsLocating(true);
    setStatusNotice("Requesting device GPS coordinates...");

    const finishSuccess = async (latNum: number, lngNum: number, source: string) => {
      await handleCoordinateSelect(latNum, lngNum, undefined, source);
      setIsLocating(false);
    };

    const tryIpFallback = async (reason: string) => {
      setStatusNotice(`GPS unavailable (${reason}). Resolving approximate location via network IP...`);
      try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();
        if (data && data.latitude && data.longitude) {
          const locName = [data.city, data.region, data.country].filter(Boolean).join(", ");
          await handleCoordinateSelect(Number(data.latitude), Number(data.longitude), locName, "Network IP");
          setIsLocating(false);
          return;
        }
      } catch (err) {
        console.warn("IP Geolocation fallback failed:", err);
      }

      setIsLocating(false);
      setStatusNotice("Could not auto-detect location. Please click the map or search address.");
      setTimeout(() => setStatusNotice(""), 5000);
    };

    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          finishSuccess(pos.coords.latitude, pos.coords.longitude, "GPS Sensor");
        },
        (error) => {
          console.warn("High-accuracy GPS attempt failed:", error.message);
          // Try standard accuracy if high-accuracy timed out
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              finishSuccess(pos.coords.latitude, pos.coords.longitude, "Device Geolocation");
            },
            (err2) => {
              console.warn("Standard accuracy attempt failed:", err2.message);
              tryIpFallback(err2.code === 1 ? "Permission Blocked" : "Timed Out");
            },
            { enableHighAccuracy: false, timeout: 6000, maximumAge: 60000 }
          );
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
      );
    } else {
      tryIpFallback("Browser Geolocation Disabled");
    }
  };

  // Handle Address Search
  const handleSearchSubmit = async (e?: React.SyntheticEvent) => {
    if (e && "preventDefault" in e) e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;

    setIsSearching(true);
    setStatusNotice("Searching location...");

    try {
      const res = await searchAddress(searchQuery.trim());
      if (res.success && res.results && res.results.length > 0) {
        setSearchResults(res.results);
        setStatusNotice(`Found ${res.results.length} location matches.`);
      } else {
        setSearchResults([]);
        setStatusNotice("No matching location found. Try adding a city name.");
      }
    } catch (err) {
      setStatusNotice("Address search failed.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (result: any) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    if (!isNaN(lat) && !isNaN(lng)) {
      handleCoordinateSelect(lat, lng, result.display_name, "Address Search");
      setSearchResults([]);
      setSearchQuery(result.display_name.split(",")[0]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border-2 border-[#113320]">
      {/* Top Action Bar */}
      <div className="p-3 bg-[#e2f9e1] border-b-2 border-[#113320] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input (div instead of form to avoid nested form hydration error) */}
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearchSubmit(e);
              }
            }}
            placeholder="Search landmark, street, or city..."
            className="flex-1 border-2 border-[#113320] bg-white px-3 py-1.5 font-sans text-xs outline-none focus:bg-[#f4ebd6]"
          />
          <button
            type="button"
            onClick={handleSearchSubmit}
            disabled={isSearching}
            className="border-2 border-[#113320] bg-white px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-wider text-[#113320] shadow-[2px_2px_0px_#113320] hover:bg-[#113320] hover:text-white transition-colors disabled:opacity-50"
          >
            {isSearching ? "..." : "SEARCH"}
          </button>
        </div>

        {/* GPS Fetch Button */}
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          disabled={isLocating}
          className="border-2 border-[#113320] bg-[#fa6355] px-4 py-2 font-sans text-[11px] font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_#113320] hover:shadow-[4px_4px_0px_#113320] hover:-translate-y-0.5 transition-all disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-1.5"
        >
          {isLocating ? (
            <>
              <span className="animate-spin inline-block">⏳</span>
              <span>LOCATING...</span>
            </>
          ) : (
            <>
              <span>📍</span>
              <span>USE MY LOCATION</span>
            </>
          )}
        </button>
      </div>

      {/* Search Results Dropdown (if any) */}
      {searchResults.length > 0 && (
        <div className="border-b-2 border-[#113320] bg-[#f4ebd6] p-2 max-h-48 overflow-y-auto space-y-1 z-20">
          <div className="flex justify-between items-center px-2 py-1">
            <span className="font-sans text-[9px] font-bold uppercase text-[#113320]/70">SELECT PINPOINT:</span>
            <button
              type="button"
              onClick={() => setSearchResults([])}
              className="font-sans text-[9px] font-bold text-[#fa6355] uppercase underline"
            >
              Close
            </button>
          </div>
          {searchResults.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectSearchResult(item)}
              className="w-full text-left p-2 border border-[#113320]/30 bg-white hover:bg-[#e2f9e1] font-sans text-xs text-[#113320] transition-colors flex items-start gap-2"
            >
              <span className="text-[#fa6355] font-bold">📍</span>
              <span className="line-clamp-2">{item.display_name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Interactive Leaflet Map Container */}
      <div className="relative flex-1 w-full min-h-[220px] bg-[#e2f9e1] z-0">
        <div ref={mapContainerRef} className="w-full h-full min-h-[220px]" />
        
        {/* Helper overlay hint */}
        <div className="absolute bottom-2 left-2 z-[400] pointer-events-none bg-white/90 border border-[#113320] px-2 py-1 shadow-[2px_2px_0px_#113320]">
          <span className="font-sans text-[9px] font-bold text-[#113320] uppercase">
            💡 Click or drag pin to adjust
          </span>
        </div>
      </div>

      {/* Status & Coordinates Footer */}
      <div className="border-t-2 border-[#113320] bg-[#f4ebd6] px-3 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-sans text-[10px] font-bold text-[#113320] uppercase tracking-wider">
            COORDINATES:
          </span>
          <span className="font-mono text-[11px] font-bold text-[#fa6355]">
            {latitude || "0.000000"}, {longitude || "0.000000"}
          </span>
        </div>

        {statusNotice && (
          <span className="font-sans text-[10px] font-bold text-[#113320] bg-[#bce3c5] border border-[#113320] px-2 py-0.5 animate-pulse">
            {statusNotice}
          </span>
        )}
      </div>
    </div>
  );
}