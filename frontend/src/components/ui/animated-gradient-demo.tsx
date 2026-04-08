"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";

interface BentoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  colors: string[];
  delay: number;
  gradientAnimated: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  value,
  subtitle,
  colors,
  delay,
  gradientAnimated,
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay + 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]/90 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <AnimatedGradient
        colors={colors}
        speed={gradientAnimated ? 0.05 : 5}
        blur={gradientAnimated ? "heavy" : "medium"}
        animated={gradientAnimated}
      />
      <motion.div
        className="relative z-10 p-4 backdrop-blur-md sm:p-5 md:p-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h3
          className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] sm:text-sm"
          variants={item}
        >
          {title}
        </motion.h3>
        <motion.p
          className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
          variants={item}
        >
          {value}
        </motion.p>
        {subtitle && (
          <motion.p
            className="mt-2 text-sm leading-relaxed text-[var(--muted)]"
            variants={item}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

/** Zippy-themed bento grid: AR stats with animated gradient backgrounds. Uses only Zippy palette for a cohesive look. */
const ZIPPY = {
  accent: "#22d3ee",
  accentDim: "#0891b2",
  accentLight: "#67e8f9",
  success: "#34d399",
  successDim: "#047857",
  successLight: "#6ee7b7",
  /** Overdue: rose (reads as “needs attention”, not brown-on-dark) */
  alert: "#fb7185",
  alertDim: "#be123c",
  alertLight: "#fda4af",
  /** Blockers: distinct from cyan “outstanding” */
  slate: "#64748b",
  violet: "#8b5cf6",
  violetDim: "#5b21b6",
  muted: "#71717a",
} as const;

export function AnimatedGradientDemo() {
  const [gradientAnimated, setGradientAnimated] = useState(true);

  useEffect(() => {
    const update = () => {
      const narrow = window.matchMedia("(max-width: 767px)").matches;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      setGradientAnimated(!(narrow || reduceMotion));
    };
    update();
    const mqN = window.matchMedia("(max-width: 767px)");
    const mqR = window.matchMedia("(prefers-reduced-motion: reduce)");
    mqN.addEventListener("change", update);
    mqR.addEventListener("change", update);
    return () => {
      mqN.removeEventListener("change", update);
      mqR.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
        <div className="md:col-span-2 md:min-h-[140px]">
          <BentoCard
            title="Total outstanding"
            value="$47,200"
            subtitle="Across all open invoices"
            colors={[ZIPPY.accent, ZIPPY.accentDim, ZIPPY.accentLight]}
            delay={0.2}
            gradientAnimated={gradientAnimated}
          />
        </div>
        <div className="md:min-h-[140px]">
          <BentoCard
            title="Overdue"
            value="$12,400"
            subtitle="Needs a nudge"
            colors={[ZIPPY.alert, ZIPPY.alertDim, ZIPPY.alertLight]}
            delay={0.4}
            gradientAnimated={gradientAnimated}
          />
        </div>
        <div className="md:min-h-[140px]">
          <BentoCard
            title="Got paid this month"
            value="18"
            subtitle="Invoices closed"
            colors={[ZIPPY.success, ZIPPY.successDim, ZIPPY.successLight]}
            delay={0.6}
            gradientAnimated={gradientAnimated}
          />
        </div>
        <div className="md:col-span-2 md:min-h-[140px]">
          <BentoCard
            title="Blockers needing reply"
            value="3"
            subtitle="Why they haven't paid"
            colors={[ZIPPY.slate, ZIPPY.violet, ZIPPY.violetDim]}
            delay={0.8}
            gradientAnimated={gradientAnimated}
          />
        </div>
        <div className="md:col-span-3 md:min-h-[120px]">
          <BentoCard
            title="Invoices past due"
            value="7"
            subtitle="We'll nudge them. You stay the good guy."
            colors={[ZIPPY.accent, ZIPPY.success, ZIPPY.accentDim]}
            delay={1}
            gradientAnimated={gradientAnimated}
          />
        </div>
      </div>
    </div>
  );
}
