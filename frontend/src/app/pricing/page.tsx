import type { Metadata } from "next";
import Link from "next/link";
import ConnectQuickBooksLink from "@/components/ConnectQuickBooksLink";

export const metadata: Metadata = {
  title: "Pricing | Zippy",
  description: "Control cashflow and get paid faster. Core $199/mo, Team $399/mo, Concierge AR Sprint. Outcomes-focused pricing.",
};

export default function PricingPage() {
  return (
    <div className="py-12 md:py-20">
      <Link href="/" className="text-sm text-[var(--muted)] hover:text-white transition-colors">
        ← Back to home
      </Link>

      <section className="mt-8 px-4">
        <div className="mx-auto max-w-5xl">
          <h1 className="page-title text-center">Pricing</h1>
          <p className="page-subtitle mx-auto mt-2 max-w-2xl text-center">
            Control cashflow and get paid faster. Most teams sit on ~$17k+ in unpaid invoices—recover more, sooner.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Core — best default */}
            <div className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--card)] p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.12)] transition-colors hover:border-[var(--accent)]/60">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Best default</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">Core</p>
              <p className="mt-2 text-3xl font-bold text-white">
                $199<span className="text-base font-normal text-[var(--muted)]">/mo</span>
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Safe autopilot, blockers capture, escalation ladder, and ROI reporting.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-[var(--muted)]">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  Safe autopilot
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  Blockers capture
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  Escalation ladder
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  ROI reporting
                </li>
              </ul>
              <ConnectQuickBooksLink className="btn-primary mt-6 block w-full text-center">
                Get started
              </ConnectQuickBooksLink>
            </div>
            {/* Team — higher AR volume */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--border-subtle)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-soft)]">Higher AR volume</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">Team</p>
              <p className="mt-2 text-3xl font-bold text-white">
                $399<span className="text-base font-normal text-[var(--muted)]">/mo</span>
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Everything in Core, plus roles, approvals, escalation rules, and better reporting.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-[var(--muted)]">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  Everything in Core
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  Roles & approvals
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  Escalation rules
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  Better reporting
                </li>
              </ul>
              <ConnectQuickBooksLink className="btn-secondary mt-6 block w-full text-center">
                Get started
              </ConnectQuickBooksLink>
            </div>
            {/* Concierge / AR Sprint */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--border-subtle)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--success)]">Best early revenue</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">Concierge / AR Sprint</p>
              <p className="mt-2 text-2xl font-bold text-white">
                $999 <span className="text-sm font-normal text-[var(--muted)]">setup</span>
              </p>
              <p className="text-lg font-bold text-white">
                + $399<span className="text-sm font-normal text-[var(--muted)]">/mo</span>
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                14-day overdue invoice rescue + ongoing autopilot. We get you caught up, then keep you there.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-[var(--muted)]">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  14-day rescue sprint
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  Ongoing autopilot
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  Everything in Team
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  Dedicated setup
                </li>
              </ul>
              <a href="mailto:sales@zippy.com?subject=AR%20Sprint%20inquiry" className="btn-secondary mt-6 block w-full text-center">
                Contact sales
              </a>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-[var(--muted-soft)]">
            Outcomes-focused. Recover more cash, faster—easy to justify when you’re sitting on unpaid invoices.
          </p>
        </div>
      </section>
    </div>
  );
}
