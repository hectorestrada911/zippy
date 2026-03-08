"use client";

import { Box, Bell, Lock, Sparkles, CreditCard } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

/** Bento grid with cursor-following glowing border — Zippy feature highlights. */
export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<CreditCard className="h-4 w-4 text-[var(--accent)]" />}
        title="Get your money faster"
        description="Follow-ups go out at the right time. Every message includes a pay link so customers settle in one click."
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Bell className="h-4 w-4 text-[var(--accent)]" />}
title="Professional follow-ups, not spam"
    description="One message per step so customers never get duplicate emails. You look professional; they know what to do."
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4 text-[var(--accent)]" />}
        title="Blockers in one place"
        description="Wrong amount, missing PO, W-9? They report it with one link. You fix it; we auto-pause follow-ups until you're done."
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-[var(--accent)]" />}
        title="One screen, zero guesswork"
        description="See who owes what, what's overdue, what's coming in, and what needs your attention."
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Box className="h-4 w-4 text-[var(--accent)]" />}
        title="Books in sync"
        description="Customers and open invoices sync automatically. Connect once and everything stays current."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div
        className="relative h-full rounded-[1.25rem] border-[0.75px] p-2 md:rounded-[1.5rem] md:p-3"
        style={{ borderColor: "var(--border)" }}
      >
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div
          className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] p-6 shadow-sm md:p-6"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--card)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.02)",
          }}
        >
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div
              className="w-fit rounded-lg border-[0.75px] p-2"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
            >
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold tracking-tight text-white pt-0.5 text-xl leading-[1.375rem] text-balance md:text-2xl md:leading-[1.875rem]">
                {title}
              </h3>
              <p className="font-sans text-sm leading-[1.125rem] text-[var(--muted)] md:text-base md:leading-[1.375rem]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
