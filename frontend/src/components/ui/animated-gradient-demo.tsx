"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";

interface BentoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  colors: string[];
  delay: number;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  value,
  subtitle,
  colors,
  delay,
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
      <AnimatedGradient colors={colors} speed={0.05} blur="heavy" />
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
  warning: "#fbbf24",
  warningDim: "#b45309",
  warningLight: "#fde047",
  muted: "#71717a",
} as const;

export function AnimatedGradientDemo() {
  React.useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7358/ingest/09609727-79f6-48ed-8830-8c381fd51540",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"4c3e2e"},body:JSON.stringify({sessionId:"4c3e2e",runId:"pre-fix",hypothesisId:"H5",location:"frontend/src/components/ui/animated-gradient-demo.tsx:useEffect",message:"Animated gradient mounted",data:{viewportWidth:typeof window!=="undefined"?window.innerWidth:null,prefersReducedMotion:typeof window!=="undefined"&&window.matchMedia?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
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
          />
        </div>
        <div className="md:min-h-[140px]">
          <BentoCard
            title="Overdue"
            value="$12,400"
            subtitle="Needs a nudge"
            colors={[ZIPPY.warning, ZIPPY.warningDim, ZIPPY.warningLight]}
            delay={0.4}
          />
        </div>
        <div className="md:min-h-[140px]">
          <BentoCard
            title="Got paid this month"
            value="18"
            subtitle="Invoices closed"
            colors={[ZIPPY.success, ZIPPY.successDim, ZIPPY.successLight]}
            delay={0.6}
          />
        </div>
        <div className="md:col-span-2 md:min-h-[140px]">
          <BentoCard
            title="Blockers needing reply"
            value="3"
            subtitle="Why they haven't paid"
            colors={[ZIPPY.accent, ZIPPY.accentDim, ZIPPY.muted]}
            delay={0.8}
          />
        </div>
        <div className="md:col-span-3 md:min-h-[120px]">
          <BentoCard
            title="Invoices past due"
            value="7"
            subtitle="We'll nudge them. You stay the good guy."
            colors={[ZIPPY.accent, ZIPPY.success, ZIPPY.accentDim]}
            delay={1}
          />
        </div>
      </div>
    </div>
  );
}
