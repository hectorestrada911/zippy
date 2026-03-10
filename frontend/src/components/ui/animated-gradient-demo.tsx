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
      className="relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <AnimatedGradient colors={colors} speed={0.05} blur="medium" />
      <motion.div
        className="relative z-10 p-4 backdrop-blur-sm sm:p-5 md:p-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h3
          className="text-sm font-medium text-[var(--muted)] sm:text-base"
          variants={item}
        >
          {title}
        </motion.h3>
        <motion.p
          className="mt-1 text-2xl font-semibold text-white sm:text-3xl md:text-4xl"
          variants={item}
        >
          {value}
        </motion.p>
        {subtitle && (
          <motion.p
            className="mt-2 text-sm text-[var(--muted)]"
            variants={item}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

/** Zippy-themed bento grid: AR stats with animated gradient backgrounds. Uses Zippy palette (accent, success, warning). */
export function AnimatedGradientDemo() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
        <div className="md:col-span-2 md:min-h-[140px]">
          <BentoCard
            title="Total outstanding"
            value="$47,200"
            subtitle="Across all open invoices"
            colors={["#22d3ee", "#0891b2", "#67e8f9"]}
            delay={0.2}
          />
        </div>
        <div className="md:min-h-[140px]">
          <BentoCard
            title="Overdue"
            value="$12,400"
            subtitle="Needs a nudge"
            colors={["#fbbf24", "#f59e0b", "#fcd34d"]}
            delay={0.4}
          />
        </div>
        <div className="md:min-h-[140px]">
          <BentoCard
            title="Got paid this month"
            value="18"
            subtitle="Invoices closed"
            colors={["#34d399", "#10b981", "#6ee7b7"]}
            delay={0.6}
          />
        </div>
        <div className="md:col-span-2 md:min-h-[140px]">
          <BentoCard
            title="Blockers needing reply"
            value="3"
            subtitle="Why they haven't paid"
            colors={["#22d3ee", "#a78bfa", "#c4b5fd"]}
            delay={0.8}
          />
        </div>
        <div className="md:col-span-3 md:min-h-[120px]">
          <BentoCard
            title="Invoices past due"
            value="7"
            subtitle="We'll nudge them. You stay the good guy."
            colors={["#22d3ee", "#f472b6", "#34d399"]}
            delay={1}
          />
        </div>
      </div>
    </div>
  );
}
