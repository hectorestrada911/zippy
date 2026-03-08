"use client";

import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

const WORDS = ["ZIPPY", "GET PAID", "AUTOPILOT", "BLOCKERS", "RESOLVE"];

export function ParticleTextEffectDemo() {
  return (
    <ParticleTextEffect
      words={WORDS}
      caption="Invoice resolution on autopilot"
      subcaption="Autopilot runs. Blockers land in one inbox. We pause until you resolve."
    />
  );
}
