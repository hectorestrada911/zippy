"use client";

import React from "react";
import { Link2, Bell, MessageCircle } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

/** Three spotlight/glow cards with cursor-following effect — Zippy value props. */
export function SpotlightCardDemo() {
  return (
    <div className="flex flex-wrap items-stretch justify-center gap-6 py-8 md:gap-10">
      <GlowCard glowColor="blue" size="md" className="bg-[var(--card)]/80">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
            <Link2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">Sync</h3>
          <p className="text-sm text-[var(--muted)]">
            Customers and invoices from QuickBooks. Always current.
          </p>
        </div>
      </GlowCard>
      <GlowCard glowColor="blue" size="md" className="bg-[var(--card)]/80">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
            <Bell className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">Autopilot</h3>
          <p className="text-sm text-[var(--muted)]">
            Reminders on your schedule. We pause when there’s an issue.
          </p>
        </div>
      </GlowCard>
      <GlowCard glowColor="blue" size="md" className="bg-[var(--card)]/80">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
            <MessageCircle className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">Blockers</h3>
          <p className="text-sm text-[var(--muted)]">
            One inbox for payment blockers. Resolve, then we resume.
          </p>
        </div>
      </GlowCard>
    </div>
  );
}
