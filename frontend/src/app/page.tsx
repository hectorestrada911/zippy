import Link from "next/link";
import {
  LinkIcon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterTextIcon,
  BookOpenIcon,
  CreditCardIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import ZippyLogo from "@/components/ZippyLogo";
import TakeCloserLook from "@/components/TakeCloserLook";
import SpeedBlock from "@/components/SpeedBlock";
import HeroVisual from "@/components/HeroVisual";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import FlowStrip from "@/components/FlowStrip";
import { GlowingEffectDemo } from "@/components/ui/glowing-effect-demo";
import { SplineSceneBasic } from "@/components/ui/spline-scene-demo";
import { DisplayCardsDemo } from "@/components/ui/display-cards-demo";
import { PulseBeamsFirstDemo } from "@/components/ui/pulse-beams-demo";
import { TestimonialsSectionDemo } from "@/components/ui/testimonials-with-marquee-demo";
import { SpotlightCardDemo } from "@/components/ui/spotlight-card-demo";
import { FeatureStepsDemo } from "@/components/ui/feature-section-demo";
import { FlowFieldBackgroundDemo } from "@/components/ui/flow-field-background-demo";

export default function Home() {
  return (
    <>
      {/* Hero: split layout, product-led visual */}
      <section className="relative min-h-[90vh] overflow-hidden px-4 pb-20 pt-16 md:min-h-[88vh] md:pb-28 md:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[var(--background)]" />
        {/* Gradient orbs — no blur for Safari performance */}
        <div
          className="pointer-events-none absolute -left-1/2 top-0 h-[80vh] w-full -z-10 opacity-30"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 30% 20%, rgba(34, 211, 238, 0.2), transparent 55%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-1/3 top-1/3 h-[50vh] w-full -z-10 opacity-20"
          style={{
            background: "radial-gradient(ellipse 50% 50% at 70% 40%, rgba(34, 211, 238, 0.12), transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 -z-10 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <p
              className="animate-fade-in text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              Invoice resolution on autopilot
            </p>
            <h1
              className="animate-fade-in-up mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl xl:leading-[1.05]"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Stop chasing.
              <br />
              <span
                className="inline-block bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(34,211,238,0.35)]"
                style={{
                  backgroundImage: "linear-gradient(90deg, #22d3ee, #a5f3fc, #67e8f9, #22d3ee)",
                }}
              >
                Start resolving.
              </span>
            </h1>
            <p
              className="animate-fade-in-up mx-auto mt-6 max-w-md text-base text-[var(--muted)] md:text-lg lg:mx-0"
              style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
            >
              Reminders run on your schedule. When a customer reports what’s blocking payment, we pause until you fix it. Get paid faster without awkward follow-up.
            </p>
            <div
              className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              <Link
                href="/login"
                className="btn-primary inline-flex items-center gap-2 text-base transition-all hover:brightness-110"
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
          <div
            className="animate-fade-in-up relative flex justify-center opacity-0 lg:justify-end"
            style={{ animation: "fade-in-up 0.8s ease-out 0.4s forwards" }}
          >
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-y border-[var(--border)] px-4 py-14 md:py-20" style={{ backgroundColor: "rgba(20, 20, 22, 0.5)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-title mx-auto mb-2">
            Built for people who send invoices and hate the chase
          </p>
          <p className="text-[var(--muted)] leading-relaxed">
            Consultants, agencies, bookkeepers, and small teams. Missing PO, W-9, or approval questions?
            Zippy’s Blockers Inbox collects them in one place and auto-pauses reminders until you resolve them.
          </p>
        </div>
      </section>

      {/* Supporting headline — static to avoid Safari lag from hover-disperse */}
      <section className="border-t border-[var(--border)] px-4 py-12 md:py-16" style={{ backgroundColor: "rgba(15, 15, 18, 0.4)" }}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-2xl font-light text-[var(--muted)] md:text-3xl">
            Get paid fast
          </p>
          <p className="mt-2 text-sm text-[var(--muted-soft)]">
            Invoice resolution on autopilot
          </p>
        </div>
      </section>

      {/* Supporting headline — static (no cycle animation for Safari) */}
      <section className="border-t border-[var(--border)] px-4 py-12 md:py-16" style={{ backgroundColor: "rgba(15, 15, 18, 0.4)" }}>
        <div className="mx-auto flex max-w-6xl justify-center">
          <div className="max-w-[500px] p-4">
            <h2 className="text-left text-4xl font-light text-[var(--muted)]">
              Your <span className="font-semibold text-[var(--foreground)]">invoices</span> deserve better tools
            </h2>
          </div>
        </div>
      </section>

      {/* Social proof — carousel */}
      <TestimonialCarousel />

      {/* Social proof — marquee testimonials */}
      <TestimonialsSectionDemo />

      {/* Interactive 3D — Spline scene */}
      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SplineSceneBasic />
        </div>
      </section>

      {/* Display cards — stacked cards */}
      <section className="px-4 py-12 md:py-16" style={{ backgroundColor: "rgba(15, 15, 18, 0.5)" }}>
        <DisplayCardsDemo />
      </section>

      {/* Spotlight cards — cursor-following glow cards */}
      <section className="px-4 py-12 md:py-16" style={{ backgroundColor: "rgba(15, 15, 18, 0.5)" }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="page-title text-center">See the difference</h2>
          <p className="page-subtitle mx-auto mt-2 max-w-xl text-center">
            Move your cursor over the cards — reminders that follow you.
          </p>
          <SpotlightCardDemo />
        </div>
      </section>

      {/* Pulse beams — animated gradient beams + Connect CTA */}
      <section className="min-h-screen">
        <PulseBeamsFirstDemo />
      </section>

      {/* Flow field background — particle canvas + CTA */}
      <section className="relative overflow-hidden">
        <FlowFieldBackgroundDemo />
      </section>

      {/* Why Zippy vs QuickBooks / generic AR */}
      <section className="relative px-4 py-20 md:py-28" style={{ backgroundColor: "rgba(15, 15, 18, 0.5)" }}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(34,211,238,0.04),transparent)]" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="page-title text-center">Why Zippy vs QuickBooks reminders</h2>
          <p className="page-subtitle mx-auto mt-2 max-w-xl text-center">
            QuickBooks can send reminders—but they don’t stop when there’s a problem. Zippy pauses automatically when a customer reports an issue (wrong amount, missing PO, W-9). You resolve it in one inbox; we resume when you’re ready. Tokenized pay and report-issue links: no customer login.
          </p>
          <div className="mt-14">
            <GlowingEffectDemo />
          </div>
        </div>
      </section>

      {/* Take a closer look */}
      <TakeCloserLook />

      {/* Speed / performance block */}
      <SpeedBlock />

      {/* What you get — results, not steps */}
      <section id="how-it-works" className="relative border-t border-[var(--border)] px-4 py-20 md:py-28" style={{ backgroundColor: "rgba(18, 18, 20, 0.6)" }}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(34,211,238,0.03),transparent)]" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="page-title text-center">What you get</h2>
          <p className="page-subtitle mx-auto mt-2 max-w-lg text-center">
            Always-current AR. Safe autopilot. One place for payment blockers.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center transition-all hover:border-[var(--accent)]/30 hover:shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--accent)]/50 bg-[var(--accent)]/5 text-[var(--accent)]">
                <LinkIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">Always current, no spreadsheet AR</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Customers and open invoices sync from QuickBooks. Connect once; everything stays current.
              </p>
            </div>
            <div className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center transition-all hover:border-[var(--accent)]/30 hover:shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--accent)]/50 bg-[var(--accent)]/5 text-[var(--accent)]">
                <CalendarDaysIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">Safe Autopilot (with stop rules)</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Reminders send at the right time. When someone reports an issue, we auto-pause that invoice until you resolve it.
              </p>
            </div>
            <div className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center transition-all hover:border-[var(--accent)]/30 hover:shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--accent)]/50 bg-[var(--accent)]/5 text-[var(--accent)]">
                <ChatBubbleBottomCenterTextIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">Blockers Inbox (auto-pause on issues)</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Pay and Report issue in every email. You see what’s blocking payment in one place; reminders stay paused until you’re done.
              </p>
            </div>
          </div>

          {/* Stop chasing. Start resolving. — differentiator bullets */}
          <div className="mt-20 rounded-2xl border border-[var(--border)] bg-[var(--card)]/50 px-6 py-8 sm:px-10 sm:py-10">
            <h3 className="text-center text-xl font-semibold text-white sm:text-2xl">Stop chasing. Start resolving.</h3>
            <ul className="mx-auto mt-6 grid max-w-2xl gap-3 text-sm text-[var(--muted)] sm:grid-cols-2 sm:gap-4">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                Auto-remind based on due dates and your rules
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                Customers can pay or report what’s blocking payment
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                Issues auto-pause reminders until resolved
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                Escalation when an invoice goes past a threshold
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Integrations — connector strip + trust bar */}
      <section className="relative border-t border-[var(--border)] px-4 py-20 md:py-24" style={{ backgroundColor: "rgba(15, 15, 18, 0.5)" }}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(34,211,238,0.03),transparent)]" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="page-title text-center">Works with what you use</h2>
          <p className="page-subtitle mx-auto mt-2 max-w-xl text-center">
            Connect once. Zippy stays in sync with your books and payments.
          </p>
          <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-stretch sm:justify-center sm:gap-4">
            {/* QuickBooks — books */}
            <div className="group flex flex-1 flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:shadow-lg sm:max-w-[280px]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)]/20">
                <BookOpenIcon className="h-6 w-6" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">Books</p>
              <h3 className="mt-1 text-lg font-semibold text-white">QuickBooks</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Customers and open invoices sync automatically. No re-typing.
              </p>
            </div>
            <div className="hidden flex-shrink-0 items-center justify-center sm:flex sm:w-8">
              <div className="h-6 w-px bg-[var(--border)]" />
            </div>
            {/* Stripe — payments */}
            <div className="group flex flex-1 flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:shadow-lg sm:max-w-[280px]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)]/20">
                <CreditCardIcon className="h-6 w-6" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">Payments</p>
              <h3 className="mt-1 text-lg font-semibold text-white">Stripe</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Accept payments from reminder links. Payouts go to your account.
              </p>
            </div>
            <div className="hidden flex-shrink-0 items-center justify-center sm:flex sm:w-8">
              <div className="h-6 w-px bg-[var(--border)]" />
            </div>
            {/* Resend — email */}
            <div className="group flex flex-1 flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:shadow-lg sm:max-w-[280px]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)]/20">
                <EnvelopeIcon className="h-6 w-6" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">Email</p>
              <h3 className="mt-1 text-lg font-semibold text-white">Resend</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Reminders go out from your domain. Reliable, professional email.
              </p>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--card)]/80 px-5 py-2.5 text-sm text-[var(--muted)]">
              <ShieldCheckIcon className="h-5 w-5 shrink-0 text-[var(--accent)]" />
              <span>Secure</span>
              <span className="text-[var(--border)]">·</span>
              <span>No card required to start</span>
            </div>
          </div>
        </div>
      </section>

      {/* How to get started — step-by-step with images */}
      <section className="border-t border-[var(--border)]" style={{ backgroundColor: "rgba(15, 15, 18, 0.5)" }}>
        <FeatureStepsDemo />
      </section>

      {/* FAQ — trust + blocker resolution + safe autopilot */}
      <section className="border-t border-[var(--border)] px-4 py-16 md:py-20" style={{ backgroundColor: "rgba(20, 20, 22, 0.5)" }}>
        <div className="mx-auto max-w-2xl">
          <h2 className="page-title text-center">Common questions</h2>
          <dl className="mt-10 space-y-8">
            {[
              {
                q: "How does Zippy work with my books?",
                a: "Zippy connects to QuickBooks and syncs your customers and open invoices. Reminders and pay links work from that data. No double entry.",
              },
              {
                q: "Does Zippy stop reminding when there’s an issue?",
                a: "Yes. When a customer reports an issue from the link in the email, we pause reminders for that invoice until you mark it resolved. No more reminders while you’re fixing the problem.",
              },
              {
                q: "What if a customer has a question about an invoice?",
                a: "Every reminder includes a “Report an issue” link. They describe what’s blocking payment (e.g. missing PO, wrong amount); it lands in your Blockers inbox. We auto-pause reminders on that invoice until you resolve it, then you choose when to resume.",
              },
              {
                q: "Is my data secure?",
                a: "Yes. We use industry-standard encryption and don’t store card details. You can disconnect QuickBooks anytime.",
              },
              {
                q: "Can I try it before committing?",
                a: "Yes. Sign up with email, connect QuickBooks, and run reminders. No credit card required to start.",
              },
            ].map((faq) => (
              <div key={faq.q}>
                <dt className="text-base font-semibold text-white">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Service-tier blurb — Concierge / Managed Autopilot */}
      <section className="border-t border-[var(--border)] px-4 py-12 md:py-16" style={{ backgroundColor: "rgba(18, 18, 20, 0.6)" }}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-[var(--accent)]">Optional</p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Concierge AR Sprint</h2>
          <p className="mt-4 text-[var(--muted)]">
            Want someone to set up your first dunning rules and blocker workflow? We offer done-with-you onboarding so you see results in the first 14 days. Contact for pricing.
          </p>
          <p className="mt-4">
            <Link href="/ar-sprint" className="text-sm font-medium text-[var(--accent)] underline underline-offset-2 hover:no-underline">
              See the 14-day AR Sprint checklist →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)]">
            <ZippyLogo className="text-base text-[var(--accent)]" />
            <span>Free to start</span>
          </div>
          <h2 className="mt-8 text-3xl font-bold text-white md:text-4xl">
            Ready for invoice resolution on autopilot?
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            Log in with your email. We’ll send you a link. No password, no credit card.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/login" className="btn-primary text-base">
              Get started free
            </Link>
            <Link href="/dashboard" className="btn-secondary text-base">
              Go to dashboard
            </Link>
          </div>
          <p className="mt-6 text-xs text-[var(--muted-soft)]">
            Free to start · No credit card · Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="text-white hover:opacity-90">
            <ZippyLogo />
          </Link>
          <span className="text-sm text-[var(--muted-soft)]">
            © {new Date().getFullYear()} Zippy. Invoice resolution on autopilot.
          </span>
          <div className="flex gap-8 text-sm">
            <Link href="/login" className="text-[var(--muted)] transition-colors hover:text-white">
              Log in
            </Link>
            <Link href="/dashboard" className="text-[var(--muted)] transition-colors hover:text-white">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
