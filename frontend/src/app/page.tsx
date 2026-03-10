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
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { GlowingEffectDemo } from "@/components/ui/glowing-effect-demo";
import { SplineSceneBasic } from "@/components/ui/spline-scene-demo";
import { DisplayCardsDemo } from "@/components/ui/display-cards-demo";
import { SpiralSectionDemo } from "@/components/ui/spiral-section-demo";
import { TestimonialsSectionDemo } from "@/components/ui/testimonials-with-marquee-demo";
import { SpotlightCardDemo } from "@/components/ui/spotlight-card-demo";
import { FeatureStepsDemo } from "@/components/ui/feature-section-demo";
import { AnimatedGradientDemo } from "@/components/ui/animated-gradient-demo";
import { MapDemo } from "@/components/ui/map-demo";
import { HeroSection9 } from "@/components/ui/hero-section-9";

export default function Home() {
  return (
    <>
      {/* Hero: HeroSection9 (nav + headline + angled image + partners) */}
      <HeroSection9 />

      {/* Who it's for */}
      <section className="border-y border-[var(--border)] px-4 py-14 md:py-20" style={{ backgroundColor: "rgba(20, 20, 22, 0.5)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-title mx-auto mb-2">
            Tired of being the bad guy? Get paid without the awkward follow-ups.
          </p>
          <p className="text-[var(--muted)] leading-relaxed">
            You send invoices. They sit. You don’t want to nag, but you need the cash. Zippy does the nudge. When something’s wrong (wrong amount, need PO, W-9), they tell you in one place. You fix it. You get paid. Relationships stay intact.
          </p>
        </div>
      </section>

      {/* Supporting headline: static to avoid Safari lag from hover-disperse */}
      <section className="border-t border-[var(--border)] px-4 py-12 md:py-16" style={{ backgroundColor: "rgba(15, 15, 18, 0.4)" }}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-2xl font-light text-[var(--muted)] md:text-3xl">
            Get paid fast
          </p>
          <p className="mt-2 text-sm text-[var(--muted-soft)]">
            Less chasing. More money in the bank.
          </p>
        </div>
      </section>

      {/* Supporting headline: static (no cycle animation for Safari) */}
      <section className="border-t border-[var(--border)] px-4 py-12 md:py-16" style={{ backgroundColor: "rgba(15, 15, 18, 0.4)" }}>
        <div className="mx-auto flex max-w-6xl justify-center">
          <div className="max-w-[500px] p-4">
            <h2 className="text-left text-4xl font-light text-[var(--muted)]">
              Your <span className="font-semibold text-[var(--foreground)]">invoices</span> get paid, and you stay the good guy
            </h2>
          </div>
        </div>
      </section>

      {/* Social proof: carousel */}
      <TestimonialCarousel />

      {/* Social proof: marquee testimonials */}
      <TestimonialsSectionDemo />

      {/* Interactive 3D: Spline scene */}
      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SplineSceneBasic />
        </div>
      </section>

      {/* Display cards: stacked cards */}
      <section className="px-4 py-12 md:py-16" style={{ backgroundColor: "rgba(15, 15, 18, 0.5)" }}>
        <DisplayCardsDemo />
      </section>

      {/* Spotlight cards: cursor-following glow cards */}
      <section className="px-4 py-12 md:py-16" style={{ backgroundColor: "rgba(15, 15, 18, 0.5)" }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="page-title text-center">See the difference</h2>
          <p className="page-subtitle mx-auto mt-2 max-w-xl text-center">
            What you see when you use Zippy: who’s overdue, who paid, what needs your attention.
          </p>
          <SpotlightCardDemo />
        </div>
      </section>

      {/* World map: get paid from anywhere */}
      <section className="border-t border-[var(--border)] px-4 py-12 md:py-16" style={{ backgroundColor: "rgba(15, 15, 18, 0.5)" }}>
        <MapDemo />
      </section>

      {/* Animated gradient bento: example outcomes */}
      <section className="border-t border-[var(--border)] px-4 py-16 md:py-20" style={{ backgroundColor: "rgba(18, 18, 20, 0.6)" }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="page-title text-center">What you can expect</h2>
          <p className="page-subtitle mx-auto mt-2 max-w-xl text-center">
            One place for who owes what, what's overdue, and what you've gotten paid.
          </p>
          <div className="mt-10">
            <AnimatedGradientDemo />
          </div>
        </div>
      </section>

      {/* Spiral animation: full-section Connect QuickBooks CTA */}
      <section className="min-h-screen">
        <SpiralSectionDemo />
      </section>

      {/* Why Zippy vs QuickBooks */}
      <section className="relative px-4 py-20 md:py-28" style={{ backgroundColor: "rgba(15, 15, 18, 0.5)" }}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(34,211,238,0.04),transparent)]" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="page-title text-center">Why not just use QuickBooks?</h2>
          <p className="page-subtitle mx-auto mt-2 max-w-xl text-center">
            QuickBooks can remind. But when there’s a problem, it keeps reminding. Zippy stops. You see what’s wrong, fix it, then we nudge again, and you see exactly how much you’ve gotten paid.
          </p>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 px-6 py-5 text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">The difference in plain English</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              QuickBooks: sends reminders. Zippy: sends reminders that stop when something’s wrong, shows you why they haven’t paid in one place, and only starts again when you’re ready. So you get paid without annoying your clients.
            </p>
          </div>
          <div className="mt-14">
            <GlowingEffectDemo />
          </div>
        </div>
      </section>

      {/* Take a closer look */}
      <TakeCloserLook />

      {/* Speed / performance block */}
      <SpeedBlock />

      {/* What you get: results, not steps */}
      <section id="how-it-works" className="relative border-t border-[var(--border)] px-4 py-20 md:py-28" style={{ backgroundColor: "rgba(18, 18, 20, 0.6)" }}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(34,211,238,0.03),transparent)]" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="page-title text-center">What you get</h2>
          <p className="page-subtitle mx-auto mt-2 max-w-lg text-center">
            Know who owes what. We nudge so you don’t have to. See why they haven’t paid, fix it once, get paid.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center transition-all hover:border-[var(--accent)]/30 hover:shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--accent)]/50 bg-[var(--accent)]/5 text-[var(--accent)]">
                <LinkIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">Know exactly who owes what</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Connect QuickBooks once. Your customers and open invoices stay in sync. No spreadsheets, no guesswork.
              </p>
            </div>
            <div className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center transition-all hover:border-[var(--accent)]/30 hover:shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--accent)]/50 bg-[var(--accent)]/5 text-[var(--accent)]">
                <CalendarDaysIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">We nudge so you don’t have to</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Friendly follow-ups go out at the right time. When they have a problem, we stop so you never look like you’re nagging.
              </p>
            </div>
            <div className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center transition-all hover:border-[var(--accent)]/30 hover:shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--accent)]/50 bg-[var(--accent)]/5 text-[var(--accent)]">
                <ChatBubbleBottomCenterTextIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">See why they haven’t paid, fix it once</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Wrong amount? Need a PO? They tell you with one link. It all lands in one place. You fix it. We only nudge again when you’re ready. You get paid.
              </p>
            </div>
          </div>

          {/* Outcome bullets */}
          <div className="mt-20 rounded-2xl border border-[var(--border)] bg-[var(--card)]/50 px-6 py-8 sm:px-10 sm:py-10">
            <h3 className="text-center text-xl font-semibold text-white sm:text-2xl">More money in. Less stress. Better relationships.</h3>
            <ul className="mx-auto mt-6 grid max-w-2xl gap-3 text-sm text-[var(--muted)] sm:grid-cols-2 sm:gap-4">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                Get paid faster without chasing yourself
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                One-click pay link in every email: they pay without leaving their inbox
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                When something’s wrong, we stop; you fix it, then we nudge again
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                See how much you’ve gotten paid since you started
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Integrations: connector strip + trust bar */}
      <section className="relative border-t border-[var(--border)] px-4 py-20 md:py-24" style={{ backgroundColor: "rgba(15, 15, 18, 0.5)" }}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(34,211,238,0.03),transparent)]" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="page-title text-center">Works with what you use</h2>
          <p className="page-subtitle mx-auto mt-2 max-w-xl text-center">
            Connect once. Zippy stays in sync with your books and payments.
          </p>
          <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-stretch sm:justify-center sm:gap-4">
            {/* QuickBooks: books */}
            <div className="group flex flex-1 flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:shadow-lg sm:max-w-[280px]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)]/20">
                <BookOpenIcon className="h-6 w-6" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">Books</p>
              <h3 className="mt-1 text-lg font-semibold text-white">QuickBooks</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Connect once. Your customers and open invoices stay in sync. No re-typing.
              </p>
            </div>
            <div className="hidden flex-shrink-0 items-center justify-center sm:flex sm:w-8">
              <div className="h-6 w-px bg-[var(--border)]" />
            </div>
            {/* Stripe: payments */}
            <div className="group flex flex-1 flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:shadow-lg sm:max-w-[280px]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)]/20">
                <CreditCardIcon className="h-6 w-6" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">Payments</p>
              <h3 className="mt-1 text-lg font-semibold text-white">Stripe</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                They click the link, they pay. Money lands in your account.
              </p>
            </div>
            <div className="hidden flex-shrink-0 items-center justify-center sm:flex sm:w-8">
              <div className="h-6 w-px bg-[var(--border)]" />
            </div>
            {/* Resend: email */}
            <div className="group flex flex-1 flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:shadow-lg sm:max-w-[280px]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)]/20">
                <EnvelopeIcon className="h-6 w-6" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">Email</p>
              <h3 className="mt-1 text-lg font-semibold text-white">Resend</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Emails go out from your domain. You look professional. Reliable delivery.
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

      {/* How to get started: step-by-step with images */}
      <section className="border-t border-[var(--border)]" style={{ backgroundColor: "rgba(15, 15, 18, 0.5)" }}>
        <FeatureStepsDemo />
      </section>

      {/* FAQ: trust + blocker resolution + safe autopilot */}
      <section className="border-t border-[var(--border)] px-4 py-16 md:py-20" style={{ backgroundColor: "rgba(20, 20, 22, 0.5)" }}>
        <div className="mx-auto max-w-2xl">
          <h2 className="page-title text-center">Common questions</h2>
          <dl className="mt-10 space-y-8">
            {[
              {
                q: "How does Zippy work with my books?",
                a: "Connect QuickBooks once. Zippy syncs your customers and open invoices. Everything stays current. No re-typing, no spreadsheets.",
              },
              {
                q: "Will Zippy keep nagging if there’s a problem?",
                a: "No. When a customer says “wrong amount” or “need a PO” from the link in the email, we stop follow-ups for that invoice. You fix it, mark it done, and we only nudge again when you’re ready. So you never look like you’re chasing while something’s broken.",
              },
              {
                q: "What if a customer has a question about an invoice?",
                a: "Every email has a “Report an issue” link. They pick what’s wrong (need PO, wrong amount, W-9, etc.). It all lands in one place for you. You fix it. We don’t send another nudge until you say so. Then you get paid.",
              },
              {
                q: "Is my data secure?",
                a: "Yes. We use industry-standard encryption and don’t store card details. You can disconnect QuickBooks anytime.",
              },
              {
                q: "Can I try it before committing?",
                a: "Yes. Sign up with email, connect QuickBooks, and start getting paid faster. No credit card required.",
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

      {/* Service-tier blurb: Concierge / Managed Autopilot */}
      <section className="border-t border-[var(--border)] px-4 py-12 md:py-16" style={{ backgroundColor: "rgba(18, 18, 20, 0.6)" }}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-[var(--accent)]">Optional</p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Concierge AR Sprint</h2>
          <p className="mt-4 text-[var(--muted)]">
            Want someone to set up your first follow-up schedule and show you how to fix “why they haven’t paid”? We offer done-with-you onboarding so you see money coming in within 14 days. Contact for pricing.
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
            Ready to get paid faster, without the awkward chase?
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
