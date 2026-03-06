"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import NeuralBackground from "@/components/ui/flow-field-background";

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
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-[#22d3ee]" />
          <span>Invoice resolution on autopilot</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          Stop chasing.
          <br />
          <span className="text-[#22d3ee]">Start resolving.</span>
        </h2>
        <p className="max-w-lg text-base text-white/80 md:text-lg">
          Reminders run on your schedule. When a customer reports what’s blocking payment, we pause until you fix it.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-lg bg-[#22d3ee] px-6 py-3 font-semibold text-zinc-900 transition-opacity hover:opacity-90"
        >
          Connect QuickBooks
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
