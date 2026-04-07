"use client";

import { useEffect } from "react";

type PerfProbeOptions = {
  probeId: string;
  hypothesisId: string;
  sampleMs?: number;
};

const ENDPOINT = "http://127.0.0.1:7358/ingest/09609727-79f6-48ed-8830-8c381fd51540";

function sendPerfLog(hypothesisId: string, location: string, message: string, data: Record<string, unknown>) {
  const payload = {
    sessionId: "4c3e2e",
    runId: "pre-fix-animations",
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
  };
  // #region agent log
  fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "4c3e2e",
    },
    body: JSON.stringify(payload),
  }).catch(() => {});
  fetch("/api/debug-log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).catch(() => {});
  // #endregion
}

export function useAnimationPerfProbe({ probeId, hypothesisId, sampleMs = 2000 }: PerfProbeOptions) {
  useEffect(() => {
    const reducedMotion = typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;
    const lowEndDevice = typeof navigator !== "undefined" && navigator.hardwareConcurrency
      ? navigator.hardwareConcurrency <= 4
      : false;

    sendPerfLog(hypothesisId, `frontend/src/components/hooks/useAnimationPerfProbe.ts:${probeId}:start`, "Animation probe started", {
      probeId,
      viewportWidth: typeof window !== "undefined" ? window.innerWidth : null,
      reducedMotion,
      lowEndDevice,
      sampleMs,
    });

    let raf = 0;
    const startedAt = performance.now();
    let frames = 0;
    let slowFrames = 0;
    let maxDeltaMs = 0;
    let last = startedAt;

    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      frames += 1;
      if (delta > 20) slowFrames += 1;
      if (delta > maxDeltaMs) maxDeltaMs = delta;
      if (now - startedAt >= sampleMs) {
        const elapsed = now - startedAt;
        sendPerfLog(hypothesisId, `frontend/src/components/hooks/useAnimationPerfProbe.ts:${probeId}:summary`, "Animation probe summary", {
          probeId,
          sampleMs: Math.round(elapsed),
          frames,
          approxFps: Number(((frames / elapsed) * 1000).toFixed(1)),
          slowFramePct: Number(((slowFrames / Math.max(1, frames)) * 100).toFixed(1)),
          maxDeltaMs: Number(maxDeltaMs.toFixed(1)),
          reducedMotion,
          lowEndDevice,
        });
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [probeId, hypothesisId, sampleMs]);
}

