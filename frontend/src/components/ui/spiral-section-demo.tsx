"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { SpiralAnimation } from "@/components/ui/spiral-animation";

/**
 * Full-section spiral animation with centered "Connect QuickBooks" CTA.
 * Replaces the pulse-beams section: same dark full-screen block, spiral as background.
 */
export function SpiralSectionDemo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setButtonVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <SpiralAnimation
          containerRef={sectionRef}
          className="absolute inset-0"
        />
      </div>
      <div
        className={`
          absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out
          ${buttonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        <Link
          href="/login"
          className="inline-flex h-[120px] w-[320px] items-center justify-center rounded-full border border-white/10 bg-black/80 px-8 py-4 text-xl font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-sm transition-all hover:brightness-110 md:text-3xl"
        >
          Connect QuickBooks
        </Link>
      </div>
    </div>
  );
}
