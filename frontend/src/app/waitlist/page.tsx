"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Zap } from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";
import UxTelemetry from "@/components/UxTelemetry";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const perks = [
  {
    icon: Sparkles,
    title: "Early access",
    body: "Invite waves as soon as QuickBooks sync is production-ready.",
  },
  {
    icon: Zap,
    title: "Priority onboarding",
    body: "We’ll help you connect cleanly and tune your first reminder cadence.",
  },
  {
    icon: BookOpen,
    title: "Shape the roadmap",
    body: "Tell us what your bookkeepers need—we’re building with firms like yours.",
  },
];

export default function WaitlistPage() {
  return (
    <>
      <UxTelemetry page="waitlist" />
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[var(--background)]" />
        <div
          className="pointer-events-none absolute -left-1/3 top-0 h-[min(90vh,720px)] w-[140%] -z-10 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 25% 15%, rgba(34, 211, 238, 0.35), transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-1/4 top-1/4 h-[70vh] w-[90%] -z-10 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 45% 55% at 75% 35%, rgba(167, 139, 250, 0.22), transparent 58%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-6 md:pb-28 md:pt-10">
          <motion.div
            initial="hidden"
            animate="show"
            className="mb-10 flex flex-wrap items-center justify-between gap-4"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            <motion.div custom={0} variants={fadeUp}>
              <Link
                href="/"
                data-ux-cta="waitlist-back-home"
                className="text-sm text-[var(--muted)] transition-colors hover:text-white"
              >
                ← Back to Zippy
              </Link>
            </motion.div>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="rounded-full border border-[var(--border)] bg-[var(--card)]/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted-soft)] backdrop-blur-sm"
            >
              QuickBooks · Coming soon
            </motion.p>
          </motion.div>

          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <motion.div initial="hidden" animate="show">
              <motion.h1
                custom={0}
                variants={fadeUp}
                className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
              >
                Get paid faster.
                <br />
                <span
                  className="inline-block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(105deg, #22d3ee 0%, #a5f3fc 35%, #c4b5fd 70%, #22d3ee 100%)",
                    backgroundSize: "200% auto",
                    animation: "gradient-shift 8s ease infinite",
                  }}
                >
                  QuickBooks sync is on the way.
                </span>
              </motion.h1>
              <motion.p
                custom={1}
                variants={fadeUp}
                className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)] md:text-xl"
              >
                We&apos;re finishing the integration so invoices, customers, and reminders stay in sync—without
                awkward chases. Drop your email and we&apos;ll save you a spot.
              </motion.p>

              <ul className="mt-10 space-y-5">
                {perks.map((p, i) => (
                  <motion.li
                    key={p.title}
                    custom={i + 2}
                    variants={fadeUp}
                    className="flex gap-4 rounded-2xl border border-[var(--border)]/80 bg-[var(--card)]/40 p-4 backdrop-blur-md transition-colors hover:border-[var(--accent)]/25"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                      <p.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-semibold text-white">{p.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-[var(--muted)]">{p.body}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                className="pointer-events-none absolute -inset-px rounded-[1.35rem] opacity-70 blur-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.25), rgba(167,139,250,0.15), rgba(34,211,238,0.2))",
                }}
              />
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[var(--card)]/75 p-8 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.65)] backdrop-blur-xl md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Join the list
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">One field. You&apos;re in.</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  We&apos;ll email you when QuickBooks is ready. Already on the list? We&apos;ll recognize your
                  address.
                </p>
                <div className="mt-8">
                  <WaitlistForm source="waitlist_landing" variant="bare" />
                </div>
                <p className="mt-6 text-center text-xs text-[var(--muted-soft)]">
                  No spam—just a heads-up when QuickBooks is live.{" "}
                  <Link href="/" className="text-[var(--muted)] underline-offset-2 hover:text-white hover:underline">
                    Zippy home
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
