"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NeuralBackground from "@/components/ui/flow-field-background";

/** Flow-field section styled to match hero: same typography, tokens, and CTA. */
export function FlowFieldBackgroundDemo() {
  return (
    <div className="relative w-full min-h-[60vh] md:min-h-[70vh]">
      <NeuralBackground
        color="#22d3ee"
        trailOpacity={0.12}
        particleCount={400}
        speed={0.8}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Get paid what you’re owed, without the awkward chase
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl xl:leading-[1.05]">
          Stop chasing.
          <br />
          <span className="text-[var(--accent)]">Start getting paid.</span>
        </h2>
        <p className="mx-auto max-w-md text-base text-[var(--muted)] md:text-lg">
          We nudge. They pay or tell you why not. You fix it once, money lands. No awkward texts.
        </p>
        <Link
          href="/waitlist"
          className="btn-primary inline-flex items-center gap-2 text-base transition-all hover:brightness-110"
        >
          Join the waitlist
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-sm text-[var(--muted-soft)]">
          No credit card · 2 minutes to first sync
        </p>
      </div>
    </div>
  );
}
