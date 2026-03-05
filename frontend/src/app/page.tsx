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
import { HeroWithShader } from "@/components/HeroWithShader";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import FlowStrip from "@/components/FlowStrip";
import { GlowingEffectDemo } from "@/components/ui/glowing-effect-demo";
import { SplineSceneBasic } from "@/components/ui/spline-scene-demo";
import { DisplayCardsDemo } from "@/components/ui/display-cards-demo";
import { PulseBeamsFirstDemo } from "@/components/ui/pulse-beams-demo";

export default function Home() {
  return (
    <>
      {/* Hero: shader lines background + headline & CTA */}
      <HeroWithShader />

      {/* Who it's for */}
      <section className="border-y border-[var(--border)] px-4 py-14 md:py-20" style={{ backgroundColor: "rgba(20, 20, 22, 0.5)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-title mx-auto mb-2">
            Built for people who send invoices and hate the chase
          </p>
          <p className="text-[var(--muted)] leading-relaxed">
            Consultants, agencies, bookkeepers, and small teams. If you’ve ever waited on a “missing PO,”
            a W-9, or a “wrong hours” email, Zippy puts everything in one dashboard so you know exactly what to do next.
          </p>
        </div>
      </section>

      {/* Social proof — carousel */}
      <TestimonialCarousel />

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

      {/* Pulse beams — animated gradient beams + Connect CTA */}
      <section className="min-h-screen">
        <PulseBeamsFirstDemo />
      </section>

      {/* Why Zippy — bento layout, results */}
      <section className="relative px-4 py-20 md:py-28" style={{ backgroundColor: "rgba(15, 15, 18, 0.5)" }}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(34,211,238,0.04),transparent)]" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="page-title text-center">Why Zippy</h2>
          <p className="page-subtitle mx-auto mt-2 max-w-xl text-center">
            Less admin, more clarity. You focus on work; Zippy handles the follow-up.
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
            Your books connected. Reminders that send. Payments and questions in one place.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center transition-all hover:border-[var(--accent)]/30 hover:shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--accent)]/50 bg-[var(--accent)]/5 text-[var(--accent)]">
                <LinkIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">Books in sync</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Customers and open invoices, no re-typing. Connect once and everything stays current.
              </p>
            </div>
            <div className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center transition-all hover:border-[var(--accent)]/30 hover:shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--accent)]/50 bg-[var(--accent)]/5 text-[var(--accent)]">
                <CalendarDaysIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">Reminders on autopilot</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Right time, right message. Before due, on due, after. Your logo, your words.
              </p>
            </div>
            <div className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center transition-all hover:border-[var(--accent)]/30 hover:shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--accent)]/50 bg-[var(--accent)]/5 text-[var(--accent)]">
                <ChatBubbleBottomCenterTextIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">Paid and answered</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Pay now and Report an issue in every email. You see who paid and who needs help, in one place.
              </p>
            </div>
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

      {/* FAQ — objections + SEO */}
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
                q: "Is my data secure?",
                a: "Yes. We use industry-standard encryption and don’t store card details. You can disconnect QuickBooks anytime.",
              },
              {
                q: "Can I try it before committing?",
                a: "Yes. Sign up with email, connect QuickBooks, and run reminders. No credit card required to start.",
              },
              {
                q: "What if a customer has a question about an invoice?",
                a: "Every reminder includes a “Report an issue” link. They submit once; you see it in your Zippy dashboard and we pause reminders until you resolve it.",
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

      {/* CTA */}
      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)]">
            <ZippyLogo className="text-base text-[var(--accent)]" />
            <span>Free to start</span>
          </div>
          <h2 className="mt-8 text-3xl font-bold text-white md:text-4xl">
            Ready to get paid faster?
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
            © {new Date().getFullYear()} Zippy. Get paid faster.
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
