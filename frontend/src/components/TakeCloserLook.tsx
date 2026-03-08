"use client";

import { useState } from "react";
import {
  BellAlertIcon,
  LinkIcon,
  ChatBubbleBottomCenterTextIcon,
  Squares2X2Icon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Zap } from "lucide-react";

const features = [
  {
    id: "reminders",
    label: "Resolution autopilot",
    description: "Follow-ups at the right time. Before due, on due, after. No duplicate emails.",
    icon: BellAlertIcon,
    visual: "reminders",
  },
  {
    id: "pay",
    label: "Pay links",
    description: "Every email includes a one-click pay link. Customers settle without leaving their inbox.",
    icon: LinkIcon,
    visual: "pay",
  },
  {
    id: "disputes",
    label: "Questions in one place",
    description: "Wrong amount, need a W-9? They report it with one link. You fix it; we pause follow-ups until you’re done.",
    icon: ChatBubbleBottomCenterTextIcon,
    visual: "disputes",
  },
  {
    id: "dashboard",
    label: "One dashboard",
    description: "Who owes what, what’s overdue, what’s coming in. No more digging through email.",
    icon: Squares2X2Icon,
    visual: "dashboard",
  },
];

export default function TakeCloserLook() {
  const [active, setActive] = useState("reminders");

  const activeFeature = features.find((f) => f.id === active) ?? features[0];
  const ActiveIcon = activeFeature.icon;

  return (
    <section className="border-t border-[var(--border)] px-4 py-20 md:py-28" style={{ backgroundColor: "rgba(10, 10, 12, 0.6)" }}>
      <div className="mx-auto max-w-6xl">
        <h2 className="page-title text-center">See it in action</h2>
        <p className="page-subtitle mx-auto mt-2 max-w-xl text-center">
          Everything you need to get paid faster, in one place.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-[320px_1fr]">
          {/* Left: feature list (pill buttons) */}
          <div className="flex flex-col gap-2">
            {features.map((f) => {
              const Icon = f.icon;
              const isActive = active === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(f.id)}
                  className={`flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-200 ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent)]/10 text-white"
                      : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:border-[var(--border)] hover:bg-[var(--card-hover)] hover:text-white"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-medium">{f.label}</span>
                  <ChevronRightIcon className={`ml-auto h-5 w-5 shrink-0 transition-transform ${isActive ? "opacity-100" : "opacity-40"}`} />
                </button>
              );
            })}
          </div>

          {/* Right: main visual + description */}
          <div className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
            <div className="relative flex min-h-[280px] items-center justify-center p-8 md:min-h-[320px]">
              {/* Abstract visual: gradient orb + icon */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,var(--accent-glow),transparent_70%)]" />
              <div className="relative flex flex-col items-center gap-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-[var(--accent)]/50 bg-[var(--background)] shadow-[0_0_40px_var(--accent-glow)]">
                  <ActiveIcon className="h-12 w-12 text-[var(--accent)]" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/20 text-[var(--accent)]">
                  <Zap className="h-6 w-6" strokeWidth={2} />
                </div>
              </div>
            </div>
            <div className="border-t border-[var(--border)] p-6 md:p-8">
              <h3 className="text-xl font-semibold text-white">{activeFeature.label}</h3>
              <p className="mt-2 text-[var(--muted)] leading-relaxed">
                {activeFeature.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
