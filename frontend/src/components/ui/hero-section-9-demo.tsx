"use client";

import { HeroSection9 } from "@/components/ui/hero-section-9";

/**
 * Demo wrapper for HeroSection9. Use on a dedicated page (e.g. /hero)
 * or replace the hero section on the home page with <HeroSection9 />.
 * Note: HeroSection9 includes its own nav; if used inside the main layout
 * (which already has Nav), you may want to hide the layout Nav on that route
 * or use only the hero content (main + partners) by extracting that part.
 */
export function HeroSection9Demo() {
  return <HeroSection9 />;
}
