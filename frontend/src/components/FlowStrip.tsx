"use client";

import { LinkIcon, BellAlertIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

/** Animated strip: Sync → Autopilot → Resolve blockers — differentiator flow. */
export default function FlowStrip() {
  return (
    <div
      className="flow-strip relative mx-auto flex max-w-md items-center justify-between gap-2 rounded-2xl px-6 py-5"
      style={{
        background: "linear-gradient(135deg, rgba(20, 20, 22, 0.95) 0%, rgba(26, 26, 32, 0.9) 100%)",
        boxShadow: "inset 0 0 0 1px rgba(34, 211, 238, 0.15), 0 0 32px -8px rgba(34, 211, 238, 0.12)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-2" style={{ animation: "flow-pop 0.5s ease-out 0.1s both" }}>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--background)]/80">
          <LinkIcon className="h-6 w-6 text-[var(--muted)]" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Sync</span>
      </div>

      <div className="relative flex-1 px-1" aria-hidden>
        <svg className="h-3 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
          <line x1="0" y1="6" x2="100" y2="6" className="flow-line" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-2" style={{ animation: "flow-pop 0.5s ease-out 0.25s both" }}>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--accent)]/50 bg-[var(--accent)]/15 shadow-[0_0_20px_-4px_rgba(34,211,238,0.25)]">
          <BellAlertIcon className="h-6 w-6 text-[var(--accent)]" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Autopilot</span>
      </div>

      <div className="relative flex-1 px-1" aria-hidden>
        <svg className="h-3 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
          <line x1="0" y1="6" x2="100" y2="6" className="flow-line flow-line-delay" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-2" style={{ animation: "flow-pop 0.5s ease-out 0.4s both" }}>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--success)]/50 bg-[var(--success)]/15 shadow-[0_0_16px_-4px_rgba(52,211,153,0.2)]">
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-[var(--success)]" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Resolve blockers</span>
      </div>
    </div>
  );
}
