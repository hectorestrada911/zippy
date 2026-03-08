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
          <h3 className="text-lg font-semibold text-white">Know who owes what</h3>
          <p className="text-sm text-[var(--muted)]">
            Connect QuickBooks once. Customers and invoices stay in sync. No guesswork.
          </p>
        </div>
      </GlowCard>
      <GlowCard glowColor="blue" size="md" className="bg-[var(--card)]/80">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
            <Bell className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">We nudge so you don’t have to</h3>
          <p className="text-sm text-[var(--muted)]">
            Friendly follow-ups at the right time. When something’s wrong, we stop—you never look like you’re nagging.
          </p>
        </div>
      </GlowCard>
      <GlowCard glowColor="blue" size="md" className="bg-[var(--card)]/80">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
            <MessageCircle className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">See why they haven’t paid</h3>
          <p className="text-sm text-[var(--muted)]">
            Wrong amount? Need a PO? It lands in one place. You fix it. We only nudge again when you’re ready.
          </p>
        </div>
      </GlowCard>
    </div>
  );
}
