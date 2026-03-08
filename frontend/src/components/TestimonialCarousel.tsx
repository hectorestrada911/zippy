"use client";

import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const testimonials = [
  {
    quote: "I stopped chasing. Money comes in faster. I finally see who paid in one place.",
    attribution: "Bookkeeper, small firm",
  },
  {
    quote: "Set up in five minutes. They get one link—pay or tell me what’s wrong. No more digging through email.",
    attribution: "Freelance consultant",
  },
  {
    quote: "Overdue dropped by a third. I look professional. Clients actually pay.",
    attribution: "Agency owner",
  },
];

const ROTATE_MS = 8000;
const DRIFT_DURATION_MS = 1200;

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [isPaused, testimonials.length]);

  const go = (delta: number) => {
    setIsPaused(true);
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
    setTimeout(() => setIsPaused(false), ROTATE_MS);
  };

  return (
    <section
      className="border-t border-[var(--border)] px-4 py-16 md:py-20"
      style={{ backgroundColor: "rgba(15, 15, 18, 0.4)" }}
      aria-label="Testimonials"
    >
      <div
        className="mx-auto max-w-3xl text-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Sliding strip: drift by one slide width (each slide = 100% of viewport) */}
        <div className="min-h-[120px] overflow-hidden md:min-h-[100px]">
          <div
            className="flex"
            style={{
              width: `${testimonials.length * 100}%`,
              transform: `translateX(-${(index / testimonials.length) * 100}%)`,
              transition: `transform ${DRIFT_DURATION_MS}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex shrink-0 flex-col items-center justify-center px-2 py-4"
                style={{ width: `${100 / testimonials.length}%` }}
                aria-hidden={i !== index}
              >
                <blockquote className="text-xl font-medium leading-relaxed text-white md:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="mt-4 text-sm text-[var(--muted)]">{t.attribution}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-2 text-xs text-[var(--muted-soft)]">
          Join teams who get paid faster with Zippy
        </p>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            className="rounded-full p-2 text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), ROTATE_MS);
                }}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-[var(--accent)]"
                    : "w-2 bg-[var(--border)] hover:bg-[var(--muted)]"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            className="rounded-full p-2 text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
