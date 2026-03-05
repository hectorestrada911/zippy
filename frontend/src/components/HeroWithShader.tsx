"use client";

import Link from "next/link";
import { ShaderAnimation } from "@/components/ui/shader-lines";
import FlowStrip from "@/components/FlowStrip";
import HeroVisual from "@/components/HeroVisual";

export function HeroWithShader() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden md:min-h-[88vh]">
      {/* Shader background — full bleed */}
      <div className="absolute inset-0 z-0 opacity-80">
        <ShaderAnimation />
      </div>
      {/* Dark overlay so text stays readable */}
      <div
        className="absolute inset-0 z-[1] bg-[var(--background)]/70"
        aria-hidden
      />
      {/* Hero content */}
      <div className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-4 pb-20 pt-16 md:min-h-[88vh] md:pb-28 md:pt-24">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <p
              className="animate-fade-in text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              Invoices that get paid
            </p>
            <h1
              className="animate-fade-in-up mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl xl:leading-[1.05]"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Stop chasing.
              <br />
              <span
                className="inline-block bg-[length:200%_auto] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(34,211,238,0.35)]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #22d3ee, #a5f3fc, #67e8f9, #22d3ee, #06b6d4)",
                  animation: "gradient-shift 3.5s ease-in-out infinite",
                }}
              >
                Start getting paid.
              </span>
            </h1>
            <p
              className="animate-fade-in-up mx-auto mt-6 max-w-md text-base text-[var(--muted)] md:text-lg lg:mx-0"
              style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
            >
              Friendly reminders with a one-click pay link. Questions land in
              one place. You get paid faster.
            </p>
            <div
              className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              <Link
                href="/login"
                className="btn-primary btn-hero-cta inline-flex items-center gap-2 text-base transition-all hover:brightness-110"
              >
                Connect QuickBooks
              </Link>
              <Link href="#how-it-works" className="btn-secondary text-base">
                What you get
              </Link>
            </div>
            <p
              className="animate-fade-in mt-6 text-sm text-[var(--muted-soft)]"
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              No credit card · 2 minutes to first sync
            </p>
            <div
              className="animate-fade-in-up mt-12 opacity-0 lg:mt-14"
              style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
            >
              <FlowStrip />
            </div>
          </div>
          {/* Right: product visual */}
          <div
            className="animate-fade-in-up relative flex justify-center opacity-0 lg:justify-end"
            style={{ animation: "fade-in-up 0.8s ease-out 0.4s forwards" }}
          >
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
