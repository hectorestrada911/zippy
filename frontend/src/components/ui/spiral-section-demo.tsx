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

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[52vh] w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] md:min-h-[64vh]"
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
          absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2
        `}
      >
        <ConnectQuickBooksLink
          data-ux-cta="spiral-connect-quickbooks"
          className="inline-flex h-14 w-[220px] items-center justify-center rounded-full border border-[var(--accent)]/35 bg-[var(--card)]/55 px-5 py-3 text-base font-semibold text-white shadow-[0_0_0_1px_rgba(34,211,238,0.15)] transition-all hover:border-[var(--accent)]/60 hover:bg-[var(--accent)]/10 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.35)] md:h-16 md:w-[260px] md:text-lg"
        >
          Connect QuickBooks
        </ConnectQuickBooksLink>
      </div>
    </div>
  );
}
