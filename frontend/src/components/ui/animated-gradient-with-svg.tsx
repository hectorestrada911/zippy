"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDimensions } from "@/components/hooks/use-debounced-dimensions";
import { useAnimationPerfProbe } from "@/components/hooks/useAnimationPerfProbe";

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
  className?: string;
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
  className,
}) => {
  useAnimationPerfProbe({
    probeId: "animated-gradient-svg",
    hypothesisId: "A3",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const circleSize = useMemo(
    () => Math.max(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height]
  );

  const blurClass =
    blur === "light"
      ? "blur-2xl"
      : blur === "medium"
        ? "blur-3xl"
        : "blur-[100px]";

  const circles = useMemo(
    () =>
      mounted
        ? colors.map((color, index) => ({
            color,
            top: Math.random() * 50,
            left: Math.random() * 50,
            size: randomInt(50, 150) / 100,
            tx1: Math.random() - 0.5,
            ty1: Math.random() - 0.5,
            tx2: Math.random() - 0.5,
            ty2: Math.random() - 0.5,
            tx3: Math.random() - 0.5,
            ty3: Math.random() - 0.5,
            tx4: Math.random() - 0.5,
            ty4: Math.random() - 0.5,
          }))
        : [],
    [colors, mounted]
  );

  if (!mounted) {
    return (
      <div
        ref={containerRef}
        className={cn("absolute inset-0 overflow-hidden", className)}
        aria-hidden
      >
        <div className={cn("absolute inset-0", blurClass)} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <div className={cn("absolute inset-0", blurClass)}>
        {circles.map((c, index) => (
          <svg
            key={index}
            className="absolute animate-background-gradient"
            style={
              {
                top: `${c.top}%`,
                left: `${c.left}%`,
                "--background-gradient-speed": `${1 / speed}s`,
                "--tx-1": c.tx1,
                "--ty-1": c.ty1,
                "--tx-2": c.tx2,
                "--ty-2": c.ty2,
                "--tx-3": c.tx3,
                "--ty-3": c.ty3,
                "--tx-4": c.tx4,
                "--ty-4": c.ty4,
              } as React.CSSProperties
            }
            width={circleSize * c.size}
            height={circleSize * c.size}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill={c.color}
              className="opacity-30 dark:opacity-[0.15]"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export { AnimatedGradient };
