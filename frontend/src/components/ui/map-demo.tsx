"use client";

import { useEffect, useRef, useState } from "react";
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
  const [liteMap, setLiteMap] = useState(false);
  const loggedRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const narrow = window.matchMedia("(max-width: 767px)").matches;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const nextLite = narrow || reduceMotion;
      setLiteMap(nextLite);
      if (!loggedRef.current) {
        loggedRef.current = true;
        const payload = {
          sessionId: "4c3e2e",
          runId: "pre-fix-map-mobile",
          hypothesisId: "M1-M3",
          location: "frontend/src/components/ui/map-demo.tsx:update",
          message: "Map mode selected",
          data: {
            narrow,
            reduceMotion,
            liteMap: nextLite,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            loop: !nextLite,
            animationDuration: nextLite ? 0.6 : 2,
          },
          timestamp: Date.now(),
        };
        // #region agent log
        fetch("http://127.0.0.1:7358/ingest/09609727-79f6-48ed-8830-8c381fd51540", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "4c3e2e",
          },
          body: JSON.stringify(payload),
        }).catch(() => {});
        fetch("/api/debug-log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch(() => {});
        // #endregion
      }
    };
    update();
    const mqN = window.matchMedia("(max-width: 767px)");
    const mqR = window.matchMedia("(prefers-reduced-motion: reduce)");
    mqN.addEventListener("change", update);
    mqR.addEventListener("change", update);
    return () => {
      mqN.removeEventListener("change", update);
      mqR.removeEventListener("change", update);
    };
  }, []);

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
      <div className="mt-8 w-full sm:mx-auto sm:max-w-6xl sm:px-4 h-[min(70dvh,520px)] min-h-[280px] sm:h-auto sm:min-h-0">
        <WorldMap
          dots={MAP_DOTS}
          lineColor="#22d3ee"
          showLabels={true}
          animationDuration={liteMap ? 0.6 : 2}
          loop={!liteMap}
          enableMarkerPulse={!liteMap}
          theme="dark"
        />
        <p className="sm:hidden text-center text-xs text-[var(--muted)] mt-3 px-4">
          Tap a dot to see the city name
        </p>
      </div>
    </div>
  );
}
