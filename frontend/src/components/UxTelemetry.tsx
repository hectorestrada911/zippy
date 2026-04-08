"use client";

import { useEffect } from "react";

type UxTelemetryProps = {
  page: "home" | "pricing" | "waitlist";
};

const ENDPOINT = "http://127.0.0.1:7358/ingest/09609727-79f6-48ed-8830-8c381fd51540";

function sendUxLog(hypothesisId: string, location: string, message: string, data: Record<string, unknown>) {
  const payload = {
    sessionId: "4c3e2e",
    runId: "pre-fix-copy",
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

export default function UxTelemetry({ page }: UxTelemetryProps) {
  useEffect(() => {
    const startedAt = Date.now();
    const seenSections = new Set<string>();

    sendUxLog("H11-H14", `frontend/src/components/UxTelemetry.tsx:${page}:view`, "UX page view", {
      page,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      isMobileViewport: window.innerWidth < 768,
    });

    const onClick = (event: MouseEvent) => {
      const element = (event.target as HTMLElement | null)?.closest("[data-ux-cta]") as HTMLElement | null;
      if (!element) return;
      const ctaId = element.getAttribute("data-ux-cta") || "unknown";
      sendUxLog("H12-H15", `frontend/src/components/UxTelemetry.tsx:${page}:cta`, "CTA clicked", {
        page,
        ctaId,
        dwellMs: Date.now() - startedAt,
      });
    };

    document.addEventListener("click", onClick, { capture: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const sectionId = (entry.target as HTMLElement).getAttribute("data-ux-section");
          if (!sectionId || seenSections.has(sectionId)) return;
          seenSections.add(sectionId);
          sendUxLog("H11-H14", `frontend/src/components/UxTelemetry.tsx:${page}:section`, "Section reached", {
            page,
            sectionId,
            dwellMs: Date.now() - startedAt,
            viewportWidth: window.innerWidth,
          });
        });
      },
      { threshold: 0.35 }
    );

    document.querySelectorAll("[data-ux-section]").forEach((node) => observer.observe(node));

    const onBeforeUnload = () => {
      sendUxLog("H11-H14", `frontend/src/components/UxTelemetry.tsx:${page}:unload`, "Session end", {
        page,
        dwellMs: Date.now() - startedAt,
        sectionsReached: Array.from(seenSections),
      });
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [page]);

  return null;
}

