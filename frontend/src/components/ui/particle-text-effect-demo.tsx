"use client";

import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

const WORDS = ["ZIPPY", "GET PAID", "LESS CHASE", "MORE CASH", "RESOLVE"];

export function ParticleTextEffectDemo() {
  return (
    <ParticleTextEffect
      words={WORDS}
      caption="Get paid what you're owed, without the awkward chase"
      subcaption="We nudge. They pay or tell you why not. You fix it once. Money lands."
    />
  );
}
