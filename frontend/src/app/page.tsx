import Link from "next/link";
import {
  BoltIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
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

export default function Home() {
  return (
    <>
      {/* Hero: split layout, product-led visual */}
      <section className="relative min-h-[90vh] overflow-hidden px-4 pb-20 pt-16 md:min-h-[88vh] md:pb-28 md:pt-24">
        {/* Layered background */}
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[var(--background)]" />
        <div
          className="pointer-events-none absolute -left-1/2 top-0 h-[80vh] w-full -z-10 opacity-40"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 30% 20%, rgba(34, 211, 238, 0.25), transparent 50%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-1/3 top-1/3 h-[50vh] w-full -z-10 opacity-30"
          style={{
            background: "radial-gradient(ellipse 50% 50% at 70% 40%, rgba(34, 211, 238, 0.15), transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0 -z-10 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Left: copy */}
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
                className="bg-gradient-to-r from-[var(--accent)] via-cyan-300 to-[var(--accent)] bg-clip-text text-transparent"
                style={{ backgroundSize: "200% auto" }}
              >
                Start getting paid.
              </span>
            </h1>
            <p
              className="animate-fade-in-up mx-auto mt-6 max-w-md text-base text-[var(--muted)] md:text-lg lg:mx-0"
              style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
            >
              Friendly reminders with a one-click pay link. Questions land in one place. You get paid faster.
            </p>
            <div
              className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              <Link
                href="/login"
                className="btn-primary inline-flex items-center gap-2 text-base shadow-lg transition-all hover:shadow-[0_0_30px_-5px_var(--accent-glow)]"
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
          </div>

          {/* Right: product visual */}
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
            Consultants, agencies, bookkeepers, and small teams. If you’ve ever waited on a “missing PO,”
            a W-9, or a “wrong hours” email, Zippy puts everything in one dashboard so you know exactly what to do next.
          </p>
        </div>
      </section>

      {/* Why Zippy — bento layout, results */}
      <section className="relative px-4 py-20 md:py-28" style={{ backgroundColor: "rgba(15, 15, 18, 0.5)" }}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(34,211,238,0.04),transparent)]" />
        <div className="relative mx-auto max-w-5xl">
          <h2 className="page-title text-center">Why Zippy</h2>
          <p className="page-subtitle mx-auto mt-2 max-w-xl text-center">
            Less admin, more clarity. You focus on work; Zippy handles the follow-up.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {/* Featured: Get your money faster — spans 2 cols on lg */}
            <div
              className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 transition-all duration-200 hover:border-[var(--accent)]/40 hover:shadow-xl hover:shadow-[var(--accent)]/5 lg:col-span-2 opacity-0"
              style={{
                animation: "fade-in-up 0.6s ease-out 0s forwards",
                boxShadow: "0 0 0 1px rgba(34, 211, 238, 0.08)",
              }}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                    One click to pay
                  </div>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-cyan-500/10 text-[var(--accent)] transition-transform group-hover:scale-105" aria-hidden>
                    <BoltIcon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">Get your money faster</h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    Reminders go out at the right time, before and after the due date. Every message includes a pay link so customers can settle in one click.
                  </p>
                </div>
                <div className="shrink-0 text-right text-3xl font-bold tabular-nums text-[var(--accent)]/20 sm:text-4xl">#1</div>
              </div>
            </div>

            <div
              className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:shadow-lg opacity-0"
              style={{ animation: "fade-in-up 0.6s ease-out 0.1s forwards" }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)]/20" aria-hidden>
                <ArrowPathIcon className="h-6 w-6" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">No duplicates</p>
              <h3 className="mt-1 text-lg font-semibold text-white">Friendly reminders, not spam</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                One reminder per step so customers never get duplicate emails. You look professional; they know what to do.
              </p>
            </div>

            <div
              className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:shadow-lg opacity-0 sm:col-span-2 lg:col-span-1"
              style={{ animation: "fade-in-up 0.6s ease-out 0.2s forwards" }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)]/20" aria-hidden>
                <CheckCircleIcon className="h-6 w-6" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">One link</p>
              <h3 className="mt-1 text-lg font-semibold text-white">Questions in one place</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Wrong amount, need a W-9? They report it with one link. You fix it; we pause reminders until you're done.
              </p>
            </div>

            <div
              className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:shadow-lg opacity-0 lg:col-span-3"
              style={{ animation: "fade-in-up 0.6s ease-out 0.3s forwards" }}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)]/20" aria-hidden>
                    <Squares2X2Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">Single dashboard</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">One screen, zero guesswork</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      See who owes what, what's overdue, what's coming in, and what needs your attention. No more digging through inboxes.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2 text-sm">
                  <span className="rounded-lg bg-[var(--background)]/80 px-3 py-1.5 font-medium text-white">AR at a glance</span>
                  <span className="rounded-lg bg-[var(--background)]/80 px-3 py-1.5 font-medium text-white">Overdue</span>
                  <span className="rounded-lg bg-[var(--background)]/80 px-3 py-1.5 font-medium text-white">Disputes</span>
                </div>
              </div>
            </div>
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

      {/* CTA */}
      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)]">
            <ZippyLogo className="text-base text-[var(--accent)]" />
            <span>Get started in minutes</span>
          </div>
          <h2 className="mt-8 text-3xl font-bold text-white md:text-4xl">
            Ready to get paid faster?
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            Log in with your email. We’ll send you a link. No password to remember.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/login" className="btn-primary text-base">
              Get started free
            </Link>
            <Link href="/dashboard" className="btn-secondary text-base">
              Go to dashboard
            </Link>
          </div>
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
