"use client";

import { Suspense, lazy, useMemo } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));
const ENDPOINT = "http://127.0.0.1:7358/ingest/09609727-79f6-48ed-8830-8c381fd51540";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const startedAt = useMemo(() => Date.now(), []);

  const onLoad = () => {
    const payload = {
      sessionId: "4c3e2e",
      runId: "pre-fix-animations",
      hypothesisId: "A2",
      location: "frontend/src/components/ui/spline.tsx:onLoad",
      message: "Spline scene loaded",
      data: {
        scene,
        loadMs: Date.now() - startedAt,
      },
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
  };

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="loader" />
        </div>
      }
    >
      <Spline scene={scene} className={className} onLoad={onLoad} />
    </Suspense>
  );
}
