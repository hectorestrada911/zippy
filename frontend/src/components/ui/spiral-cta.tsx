"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { SpiralAnimation } from "@/components/ui/spiral-animation";

/**
 * CTA that uses the spiral animation as background with "Connect QuickBooks" on top.
 * Replaces the plain button with the spiral visual.
 */
export function SpiralCta() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [startVisible, setStartVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStartVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-block h-[52px] w-[280px] overflow-hidden rounded-full border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
    >
      <div className="absolute inset-0">
        <SpiralAnimation containerRef={containerRef} className="absolute inset-0" />
      </div>
      <Link
        href="/login"
        className={`
          absolute inset-0 z-10 flex items-center justify-center text-base font-semibold text-white transition-all duration-500
          hover:brightness-110
          ${startVisible ? "opacity-100" : "opacity-0"}
        `}
      >
        Connect QuickBooks
      </Link>
    </div>
  );
}
