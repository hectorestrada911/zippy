"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TextDisperse } from "@/components/ui/text-disperse";

/** Zippy-themed demo: hover to disperse text (max 13 chars). */
export function TextDisperseDemo() {
  return (
    <div className="relative flex min-h-[40vh] w-full items-center justify-center py-16">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-full",
          "bg-[radial-gradient(ellipse_at_center,var(--accent)/.08,transparent_50%)]",
          "blur-[40px]"
        )}
      />
      <div className="relative w-full max-w-2xl px-4 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
          Hover to disperse
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <TextDisperse
            className="text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight text-white"
            style={{ color: "var(--accent)" }}
          >
            Get paid fast
          </TextDisperse>
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">
          Invoice resolution on autopilot
        </p>
      </div>
    </div>
  );
}
