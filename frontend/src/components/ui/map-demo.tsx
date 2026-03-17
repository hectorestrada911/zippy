"use client";

import { WorldMap } from "@/components/ui/map";
import { DollarSign } from "lucide-react";

// Flows point toward North America (money flows to you)
const MAP_DOTS = [
  {
    start: { lat: 51.5074, lng: -0.1278, label: "London" },
    end: { lat: 40.7128, lng: -74.006, label: "New York" },
  },
  {
    start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    end: { lat: 40.7128, lng: -74.006, label: "New York" },
  },
  {
    start: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
    end: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
  },
  {
    start: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
    end: { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
  },
  {
    start: { lat: -15.7975, lng: -47.8919, label: "Brasília" },
    end: { lat: 40.7128, lng: -74.006, label: "New York" },
  },
  {
    start: { lat: 48.8566, lng: 2.3522, label: "Paris" },
    end: { lat: 41.8781, lng: -87.6298, label: "Chicago" },
  },
];

export function MapDemo() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl px-4 sm:px-4 text-center">
        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)]/80 px-4 py-2">
          <DollarSign className="h-5 w-5 text-[var(--success)]" aria-hidden />
          <span className="text-sm font-medium text-[var(--muted)]">
            Get paid from anywhere
          </span>
        </div>
        <h2 className="page-title mt-4">
          Money flows to you, no matter where your clients are
        </h2>
        <p className="page-subtitle mx-auto mt-2 max-w-2xl">
          Send invoices and follow up from one place. Your customers can be
          anywhere. Zippy keeps track so you get paid.
        </p>
      </div>
      <div className="mt-8 w-full sm:mx-auto sm:max-w-6xl sm:px-4 h-screen min-h-[100dvh] sm:h-auto sm:min-h-0">
        <WorldMap
          dots={MAP_DOTS}
          lineColor="#22d3ee"
          showLabels={true}
          animationDuration={2}
          loop={true}
          theme="dark"
        />
        <p className="sm:hidden text-center text-xs text-[var(--muted)] mt-3 px-4">
          Tap a dot to see the city name
        </p>
      </div>
    </div>
  );
}
