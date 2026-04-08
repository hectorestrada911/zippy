"use client";

import { useRef, useState, useEffect } from "react";
import ConnectQuickBooksLink from "@/components/ConnectQuickBooksLink";
import { SpiralAnimation } from "@/components/ui/spiral-animation";

/**
 * Full-section spiral animation with centered "Connect QuickBooks" CTA.
 * Replaces the pulse-beams section: same dark full-screen block, spiral as background.
 */
export function SpiralSectionDemo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [showSpiral, setShowSpiral] = useState(false);

  useEffect(() => {
    const mqW = window.matchMedia("(min-width: 768px)");
    const mqR = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setShowSpiral(mqW.matches && !mqR.matches);
    sync();
    mqW.addEventListener("change", sync);
    mqR.addEventListener("change", sync);
    return () => {
      mqW.removeEventListener("change", sync);
      mqR.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const delayMs = showSpiral ? 2000 : 400;
    const timer = setTimeout(() => setButtonVisible(true), delayMs);
    return () => clearTimeout(timer);
  }, [showSpiral]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[var(--background)]"
    >
      <div className="absolute inset-0">
        {showSpiral ? (
          <SpiralAnimation
            containerRef={sectionRef}
            className="absolute inset-0"
          />
        ) : (
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08)_0%,_transparent_55%)]"
            aria-hidden
          />
        )}
      </div>
      <div
        className={`
          absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out
          ${buttonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        <ConnectQuickBooksLink
          className="inline-flex h-[120px] w-[320px] items-center justify-center rounded-full border border-white/40 bg-transparent px-8 py-4 text-xl font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.25)] transition-all hover:bg-white/5 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.4)] md:text-3xl"
        >
          Connect QuickBooks
        </ConnectQuickBooksLink>
      </div>
    </div>
  );
}
