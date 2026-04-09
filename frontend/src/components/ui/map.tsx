"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DottedMap from "dotted-map";
import { useAnimationPerfProbe } from "@/components/hooks/useAnimationPerfProbe";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  showLabels?: boolean;
  labelClassName?: string;
  animationDuration?: number;
  loop?: boolean;
  /** Pulsing rings on markers — disable on low-power / mobile to save paint cost */
  enableMarkerPulse?: boolean;
  /** "dark" | "light" - defaults to "dark" (no next-themes required) */
  theme?: "dark" | "light";
}

export function WorldMap({
  dots = [],
  lineColor = "#22d3ee",
  showLabels = true,
  labelClassName = "text-sm",
  animationDuration = 2,
  loop = true,
  enableMarkerPulse = true,
  theme = "dark",
}: MapProps) {
  useAnimationPerfProbe({
    probeId: "world-map",
    hypothesisId: "A4",
    sampleMs: 3000,
  });

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const map = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal" }),
    []
  );

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: theme === "dark" ? "#FFFF7F40" : "#00000040",
        shape: "circle",
        backgroundColor: theme === "dark" ? "black" : "white",
      }),
    [map, theme]
  );

  const projectPoint = (lat: number, lng: number) => {
    const x = ((lng + 180) * 800) / 360;
    const y = ((90 - lat) * 400) / 180;
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const staggerDelay = 0.3;
  const totalAnimationTime = dots.length * staggerDelay + animationDuration;
  const pauseTime = 2;
  const fullCycleDuration = totalAnimationTime + pauseTime;

  // One label per unique location; add y-offset when close to another so they don't overlap
  const uniqueLabels = useMemo(() => {
    const seen = new Map<string, { lat: number; lng: number; label: string }>();
    const key = (lat: number, lng: number) => `${lat.toFixed(2)}_${lng.toFixed(2)}`;
    for (const dot of dots) {
      if (dot.start.label) {
        const k = key(dot.start.lat, dot.start.lng);
        if (!seen.has(k)) seen.set(k, { lat: dot.start.lat, lng: dot.start.lng, label: dot.start.label });
      }
      if (dot.end.label) {
        const k = key(dot.end.lat, dot.end.lng);
        if (!seen.has(k)) seen.set(k, { lat: dot.end.lat, lng: dot.end.lng, label: dot.end.label });
      }
    }
    const list = Array.from(seen.values());
    const LABEL_W = 120;
    const LABEL_H = 28;
    const LABEL_PAD = 10;
    const LABEL_BASE = 32;

    const projected = list.map((item) => ({
      ...item,
      pt: {
        x: ((item.lng + 180) * 800) / 360,
        y: ((90 - item.lat) * 400) / 180,
      },
    }));

    projected.sort((a, b) => a.pt.y - b.pt.y || a.pt.x - b.pt.x);

    type Rect = { left: number; top: number; right: number; bottom: number };
    const placed: Rect[] = [];

    const rectFor = (
      pt: { x: number; y: number },
      offsetX: number,
      offsetY: number
    ): Rect => {
      const left = pt.x - LABEL_W / 2 + offsetX;
      const top = pt.y - LABEL_BASE - offsetY;
      return {
        left,
        top,
        right: left + LABEL_W,
        bottom: top + LABEL_H,
      };
    };

    const collides = (r: Rect) => {
      for (const p of placed) {
        if (
          !(
            r.right + LABEL_PAD <= p.left ||
            r.left >= p.right + LABEL_PAD ||
            r.bottom + LABEL_PAD <= p.top ||
            r.top >= p.bottom + LABEL_PAD
          )
        ) {
          return true;
        }
      }
      return false;
    };

    // Keep labels close enough to their city markers to avoid "wrong city" perception.
    const OFFSETS: [number, number][] = [
      [0, 0],
      [0, 24],
      [0, -24],
      [44, 0],
      [-44, 0],
      [44, 24],
      [-44, 24],
      [44, -24],
      [-44, -24],
      [0, 48],
      [0, -48],
      [64, 0],
      [-64, 0],
      [64, 24],
      [-64, 24],
      [64, -24],
      [-64, -24],
    ];

    return projected.map((entry) => {
      const { pt, ...item } = entry;
      let offsetX = 0;
      let offsetY = 0;
      let placedRect: Rect | null = null;
      for (const [ox, oy] of OFFSETS) {
        const r = rectFor(pt, ox, oy);
        if (!collides(r)) {
          placed.push(r);
          offsetX = ox;
          offsetY = oy;
          placedRect = r;
          break;
        }
      }
      if (!placedRect) {
        placed.push(rectFor(pt, 0, 0));
      }
      const clamp = (v: number, min: number, max: number) =>
        Math.max(min, Math.min(max, v));
      return {
        ...item,
        labelOffsetX: clamp(offsetX, -64, 64),
        labelOffsetY: clamp(offsetY, -48, 48),
      };
    });
  }, [dots]);

  const mapDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const containerAspect = rect.width / Math.max(1, rect.height);
    const svgAspect = 2; // 800 / 400
    const letterboxSeverity = Number(Math.abs(containerAspect - svgAspect).toFixed(2));
    const payload = {
      sessionId: "4c3e2e",
      runId: "pre-fix-map-mobile",
      hypothesisId: "M2-M4",
      location: "frontend/src/components/ui/map.tsx:mount",
      message: "WorldMap layout snapshot",
      data: {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        containerAspect: Number(containerAspect.toFixed(2)),
        svgAspect,
        letterboxSeverity,
        dots: dots.length,
        loop,
        enableMarkerPulse,
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
  }, [dots.length, enableMarkerPulse, loop]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full min-h-0 sm:h-auto sm:aspect-[3/2] md:aspect-[2/1] lg:aspect-[2/1] rounded-none sm:rounded-lg relative font-sans overflow-hidden ${theme === "dark" ? "bg-black" : "bg-white"}`}
      style={{ touchAction: "pan-y" }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-auto select-none"
        preserveAspectRatio="xMidYMid meet"
        aria-label="World map"
      >
        <defs>
          <linearGradient id="map-fade-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="10%" stopColor="white" stopOpacity="1" />
            <stop offset="90%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="map-fade-mask">
            <rect x={-50} y={0} width={900} height={400} fill="url(#map-fade-gradient)" />
          </mask>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="map-glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Full world background map with top/bottom fade */}
        <image
          href={mapDataUrl}
          x={0}
          y={0}
          width={800}
          height={400}
          mask="url(#map-fade-mask)"
          className="pointer-events-none select-none"
        />
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const startTime = (i * staggerDelay) / fullCycleDuration;
          const endTime =
            (i * staggerDelay + animationDuration) / fullCycleDuration;
          const resetTime = totalAnimationTime / fullCycleDuration;
          const pathD = createCurvedPath(startPoint, endPoint);

          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={
                  loop
                    ? { pathLength: [0, 0, 1, 1, 0] }
                    : { pathLength: 1 }
                }
                transition={
                  loop
                    ? {
                        duration: fullCycleDuration,
                        times: [0, startTime, endTime, resetTime, 1],
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0,
                      }
                    : {
                        duration: animationDuration,
                        delay: i * staggerDelay,
                        ease: "easeInOut",
                      }
                }
              />
              {loop && (
                <motion.circle
                  r="4"
                  fill={lineColor}
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{
                    offsetDistance: ["0%", "0%", "100%", "100%", "100%"],
                    opacity: [0, 0, 1, 0, 0],
                  }}
                  transition={{
                    duration: fullCycleDuration,
                    times: [0, startTime, endTime, resetTime, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0,
                  }}
                  style={{
                    offsetPath: `path('${pathD}')`,
                  }}
                />
              )}
            </g>
          );
        })}

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);

          return (
            <g key={`points-group-${i}`}>
              <g key={`start-${i}`}>
                <motion.g
                  onHoverStart={() =>
                    setHoveredLocation(dot.start.label ?? `Location ${i}`)
                  }
                  onHoverEnd={() => setHoveredLocation(null)}
                  onClick={() =>
                    setHoveredLocation(dot.start.label ?? `Location ${i}`)
                  }
                  className="cursor-pointer touch-manipulation"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  style={{ touchAction: "manipulation" }}
                >
                  {/* Large invisible hit area for mobile tap targets (~44px) */}
                  <circle
                    cx={startPoint.x}
                    cy={startPoint.y}
                    r="30"
                    fill="transparent"
                    aria-label={dot.start.label}
                  />
                  <circle
                    cx={startPoint.x}
                    cy={startPoint.y}
                    r="3"
                    fill={lineColor}
                    filter="url(#map-glow)"
                    className="drop-shadow-lg"
                  />
                  {enableMarkerPulse ? (
                    <circle
                      cx={startPoint.x}
                      cy={startPoint.y}
                      r="3"
                      fill={lineColor}
                      opacity="0.5"
                    >
                      <animate
                        attributeName="r"
                        from="3"
                        to="12"
                        dur="2s"
                        begin="0s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="2s"
                        begin="0s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  ) : null}
                </motion.g>
              </g>
              <g key={`end-${i}`}>
                <motion.g
                  onHoverStart={() =>
                    setHoveredLocation(dot.end.label ?? `Destination ${i}`)
                  }
                  onHoverEnd={() => setHoveredLocation(null)}
                  onClick={() =>
                    setHoveredLocation(dot.end.label ?? `Destination ${i}`)
                  }
                  className="cursor-pointer touch-manipulation"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  style={{ touchAction: "manipulation" }}
                >
                  {/* Large invisible hit area for mobile tap targets (~44px) */}
                  <circle
                    cx={endPoint.x}
                    cy={endPoint.y}
                    r="30"
                    fill="transparent"
                    aria-label={dot.end.label}
                  />
                  <circle
                    cx={endPoint.x}
                    cy={endPoint.y}
                    r="3"
                    fill={lineColor}
                    filter="url(#map-glow)"
                    className="drop-shadow-lg"
                  />
                  {enableMarkerPulse ? (
                    <circle
                      cx={endPoint.x}
                      cy={endPoint.y}
                      r="3"
                      fill={lineColor}
                      opacity="0.5"
                    >
                      <animate
                        attributeName="r"
                        from="3"
                        to="12"
                        dur="2s"
                        begin="0.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="2s"
                        begin="0.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  ) : null}
                </motion.g>
              </g>
            </g>
          );
        })}

        {/* Single label per unique city; wider box + offset so no truncation/overlap */}
        {showLabels &&
          uniqueLabels.map((item, i) => {
            const pt = projectPoint(item.lat, item.lng);
            const labelW = 120;
            const labelH = 28;
            const offsetX = item.labelOffsetX;
            const offsetY = item.labelOffsetY;
            const labelCenterX = pt.x + offsetX;
            const labelCenterY = pt.y - 32 - offsetY + labelH / 2;
            const needsConnector = Math.abs(offsetX) + Math.abs(offsetY) > 20;
            return (
              <motion.g
                key={`label-${item.label}-${i}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i + 0.3, duration: 0.5 }}
                className="pointer-events-none hidden sm:block"
              >
                {needsConnector ? (
                  <line
                    x1={pt.x}
                    y1={pt.y}
                    x2={labelCenterX}
                    y2={labelCenterY}
                    stroke={lineColor}
                    strokeOpacity="0.45"
                    strokeWidth="0.9"
                  />
                ) : null}
                <foreignObject
                  x={pt.x - labelW / 2 + offsetX}
                  y={pt.y - 32 - offsetY}
                  width={labelW}
                  height={labelH}
                  className="block overflow-visible"
                >
                  <div className="flex items-center justify-center h-full w-full text-center">
                    <span
                      className={`${labelClassName} font-medium px-2 py-0.5 rounded-md bg-white/95 dark:bg-black/95 text-black dark:text-white border border-gray-200 dark:border-gray-700 shadow-sm whitespace-nowrap`}
                    >
                      {item.label}
                    </span>
                  </div>
                </foreignObject>
              </motion.g>
            );
          })}
      </svg>

      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/90 text-black dark:text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm sm:hidden border border-gray-200 dark:border-gray-700"
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
