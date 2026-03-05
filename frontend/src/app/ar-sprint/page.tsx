import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import ZippyLogo from "@/components/ZippyLogo";

/** Marketing-style AR Sprint: 7–14 day checklist. No backend required. */
export default function ARSprintPage() {
  const steps = [
    {
      day: "Day 0",
      title: "Connect & import",
      items: ["Connect QuickBooks", "Sync customers and open invoices", "Review AR snapshot"],
    },
    {
      day: "Day 1",
      title: "First reminder preview & approval mode",
      items: ["Review default dunning schedule", "Preview first reminder copy", "Turn on approval mode for first 10 reminders (optional)"],
    },
    {
      day: "Days 2–7",
      title: "Autopilot + blockers triage",
      items: ["Reminders send on schedule", "Check Blockers inbox for issues (missing PO, W-9, etc.)", "Resolve blockers; reminders stay paused until you’re done"],
    },
    {
      day: "Days 7–14",
      title: "Escalation & stale blockers",
      items: ["Escalation rules for invoices past threshold", "Follow up on resolved blockers; resume reminders when ready", "Review paid vs overdue in dashboard"],
    },
  ];

  return (
    <div className="mx-auto max-w-2xl py-12">
      <div className="mb-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-white">
          <ZippyLogo className="h-4 w-4 text-[var(--accent)]" />
          Back to home
        </Link>
      </div>
      <h1 className="page-title text-3xl md:text-4xl">14-day AR Sprint</h1>
      <p className="page-subtitle mt-2">
        A simple checklist to see value in the first two weeks: connect, run autopilot, resolve blockers, and tighten escalation.
      </p>

      <ul className="mt-12 space-y-10">
        {steps.map((step) => (
          <li key={step.day} className="rounded-2xl border border-[var(--border)] bg-[var(--card)]/50 p-6">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[var(--accent)]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {step.day}
              </span>
              <h2 className="text-xl font-semibold text-white">{step.title}</h2>
            </div>
            <ul className="mt-4 space-y-2">
              {step.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--success)]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="mt-14 rounded-2xl border border-[var(--border)] bg-[var(--card)]/30 p-6 text-center">
        <p className="text-sm text-[var(--muted)]">
          Want done-with-you setup? Check out our{" "}
          <Link href="/#how-it-works" className="text-[var(--accent)] underline underline-offset-2 hover:no-underline">
            Concierge AR Sprint
          </Link>{" "}
          (contact for pricing).
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/login" className="btn-primary text-base">
          Get started
        </Link>
        <Link href="/dashboard" className="btn-secondary text-base">
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
