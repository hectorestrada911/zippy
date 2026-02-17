"use client";

import { CheckCircleIcon, BoltIcon } from "@heroicons/react/24/solid";

/** Hero right-side visual: "inbox to paid" flow with depth and subtle motion */
export default function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow behind the composition */}
      <div
        className="absolute inset-0 rounded-3xl opacity-60"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(34, 211, 238, 0.2), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Main "window" frame */}
      <div
        className="relative w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)]/90 p-6 shadow-2xl backdrop-blur-sm"
        style={{
          boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 32px 64px -12px rgba(0,0,0,0.6), 0 0 80px -20px rgba(34, 211, 238, 0.15)",
        }}
      >
        {/* Window chrome */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex gap-1.5">
            {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
              <div key={c} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[var(--muted-soft)]">Zippy</span>
        </div>

        {/* Content: 3 rows = pending → pay → paid */}
        <div className="space-y-3">
          {/* Row 1: Pending (muted) */}
          <div className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--background)]/60 px-4 py-3 opacity-70">
            <div className="h-9 w-9 rounded-lg bg-[var(--muted)]/20" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[var(--muted)]">Acme Corp</p>
              <p className="text-xs text-[var(--muted-soft)]">Due in 5 days · $1,200</p>
            </div>
          </div>

          {/* Row 2: Active with Pay now (glowing) */}
          <div
            className="flex items-center gap-3 rounded-xl border px-4 py-3"
            style={{
              borderColor: "rgba(34, 211, 238, 0.4)",
              background: "linear-gradient(135deg, rgba(34, 211, 238, 0.08) 0%, transparent 50%)",
              boxShadow: "0 0 24px -4px rgba(34, 211, 238, 0.2)",
            }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)]/20">
              <BoltIcon className="h-4 w-4 text-[var(--accent)]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">Studio M</p>
              <p className="text-xs text-[var(--muted)]">Due tomorrow · $3,400</p>
            </div>
            <div
              className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-900"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Pay now
            </div>
          </div>

          {/* Row 3: Paid (success) */}
          <div className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--background)]/60 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--success)]/20">
              <CheckCircleIcon className="h-4 w-4 text-[var(--success)]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">Built LLC</p>
              <p className="text-xs text-[var(--success)]">Paid · $2,100</p>
            </div>
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="mt-4 flex gap-4 rounded-lg bg-[var(--background)]/80 px-4 py-2">
          <span className="text-xs text-[var(--muted)]">
            <span className="font-semibold text-white">$6,700</span> expected
          </span>
          <span className="text-xs text-[var(--muted)]">
            <span className="font-semibold text-[var(--success)]">2</span> paid this week
          </span>
        </div>
      </div>

      {/* Floating accent orbs (decorative) */}
      <div
        className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[var(--accent)] opacity-[0.12] blur-2xl"
        style={{ animation: "hero-float 6s ease-in-out infinite" }}
      />
      <div
        className="absolute -bottom-2 -left-4 h-20 w-20 rounded-full bg-[var(--accent)] opacity-[0.08] blur-xl"
        style={{ animation: "hero-float 5s ease-in-out infinite 1s" }}
      />
    </div>
  );
}
