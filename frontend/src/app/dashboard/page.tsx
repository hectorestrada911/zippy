"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDashboard } from "@/lib/api";
import CountUp from "@/components/CountUp";
import { AnimatedGradientDemo } from "@/components/ui/animated-gradient-demo";

export default function DashboardPage() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getDashboard>> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="card max-w-md">
        <p className="text-[var(--error)]">{error}</p>
        <Link href="/login" className="mt-4 inline-block link">
          Log in
        </Link>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="page-header">
        <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="stat-card h-24 animate-pulse bg-white/5" />
          ))}
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="card h-64 animate-pulse bg-white/5" />
          <div className="card h-64 animate-pulse bg-white/5" />
        </div>
      </div>
    );
  }

  const { summary, overdue_invoices, disputes_needing_action } = data;

  return (
    <div className="space-y-8">
      <header className="page-header">
        <h1 className="page-title">Your money at a glance</h1>
        <p className="page-subtitle">Who owes what, what’s overdue, and how much you’ve gotten paid</p>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="stat-card stat-card-glass">
          <span className="stat-label">Total outstanding</span>
          <span className="stat-value">
            <CountUp value={Number(summary.total_ar)} prefix="$" />
          </span>
        </div>
        <div className="stat-card stat-card-glass stat-card-warning">
          <span className="stat-label">Overdue</span>
          <span className="stat-value text-[var(--warning)]">
            <CountUp value={Number(summary.overdue_ar)} prefix="$" />
          </span>
        </div>
        <div className="stat-card stat-card-glass">
          <span className="stat-label">Expected in 7 days</span>
          <span className="stat-value">
            <CountUp value={Number(summary.expected_7_days)} prefix="$" />
          </span>
        </div>
        <div className="stat-card stat-card-glass">
          <span className="stat-label">Expected in 30 days</span>
          <span className="stat-value">
            <CountUp value={Number(summary.expected_30_days)} prefix="$" />
          </span>
        </div>
        <div className="stat-card stat-card-glass">
          <span className="stat-label">Invoices past due</span>
          <span className="stat-value">
            <CountUp value={summary.overdue_count} />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
        <div className="stat-card stat-card-glass">
          <span className="stat-label">Got paid this month</span>
          <span className="stat-value text-[var(--success)]">
            <CountUp value={summary.paid_count_this_month} />
          </span>
          <span className="text-xs text-[var(--muted)]">invoices</span>
        </div>
        <div className="stat-card stat-card-glass">
          <span className="stat-label">Money in since you started</span>
          <span className="stat-value text-[var(--success)]">
            <CountUp value={Number(summary.paid_after_reminder_total)} prefix="$" />
          </span>
          <span className="text-xs text-[var(--muted)]">from Zippy</span>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="section-title mb-4">Stats at a glance</h2>
        <AnimatedGradientDemo />
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="section-title">Overdue (we’ll nudge them)</h2>
          {overdue_invoices.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-title">You’re all caught up</p>
              <p className="empty-state-desc">No overdue invoices right now. When something is past due, it’ll show here.</p>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--border-subtle)]">
              {overdue_invoices.map((inv) => (
                <li key={inv.invoice_id}>
                  <Link href={`/invoices/${inv.invoice_id}`} className="list-item-link link">
                    <span>
                      <span className="font-medium text-white">{inv.invoice_number || inv.invoice_id}</span>
                      <span className="ml-2 text-[var(--muted-soft)]">{inv.customer_name}</span>
                    </span>
                    <span className="font-medium tabular-nums">${Number(inv.amount).toLocaleString()}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="section-title">Why they haven’t paid (needs your reply)</h2>
          {disputes_needing_action.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-title">Nothing waiting</p>
              <p className="empty-state-desc">When someone says “wrong amount” or “need a PO” from their invoice link, it’ll show here. Fix it and we’ll only nudge again when you’re ready.</p>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--border-subtle)]">
              {disputes_needing_action.map((d) => (
                <li key={d.dispute_id}>
                  <Link href={`/disputes/${d.dispute_id}`} className="list-item-link link">
                    <span className="font-medium text-white">{d.reason.replace(/_/g, " ")}</span>
                    <span className="text-[var(--muted-soft)]">{d.status}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
