"use client";

import { useEffect, useState } from "react";

/** Animates a number from 0 to target over ~600ms with easing. */
export default function CountUp({
  value,
  duration = 600,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const target = value;

  useEffect(() => {
    if (target === 0) {
      setDisplay(0);
      return;
    }
    const start = performance.now();
    const startVal = display;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - (1 - progress) ** 4;
      const current = startVal + (target - startVal) * eased;
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString();

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
