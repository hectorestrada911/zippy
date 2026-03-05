"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getInvoice } from "@/lib/api";

export default function InvoiceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [inv, setInv] = useState<Awaited<ReturnType<typeof getInvoice>> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getInvoice(id)
      .then(setInv)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) {
    return (
      <div className="card max-w-md">
        <p className="text-[var(--error)]">{error}</p>
        <Link href="/invoices" className="mt-4 inline-block link">← Back to invoices</Link>
      </div>
    );
  }
  if (!inv) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-32 animate-pulse rounded bg-white/10" />
        <div className="card h-64 animate-pulse bg-white/5" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link href="/invoices" className="inline-block text-sm text-[var(--muted)] transition-colors hover:text-white">
        ← Invoices
      </Link>

      <div className="card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="page-title text-2xl">{inv.number || inv.id}</h1>
            <p className="page-subtitle mt-0">
              {inv.customer_name || "—"}
              {inv.customer_email ? ` · ${inv.customer_email}` : ""}
            </p>
          </div>
          {inv.pay_url && (
            <a
              href={inv.pay_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary shrink-0"
            >
              Pay invoice
            </a>
          )}
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm md:grid-cols-3">
          <div>
            <dt className="stat-label">Amount</dt>
            <dd className="stat-value text-lg">${Number(inv.amount).toLocaleString()}</dd>
          </div>
          <div>
            <dt className="stat-label">Due date</dt>
            <dd className="font-medium text-white">{inv.due_date}</dd>
          </div>
          <div>
            <dt className="stat-label">Status</dt>
            <dd>
              <span className={inv.status === "overdue" ? "text-[var(--warning)]" : ""}>{inv.status}</span>
              {inv.escalated_at && (
                <span className="ml-2 rounded bg-amber-500/20 px-1.5 py-0.5 text-xs text-amber-400">Escalated</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="stat-label">Dispute open</dt>
            <dd>{inv.dispute_open ? "Yes" : "No"}</dd>
          </div>
        </dl>
      </div>

      <div className="card">
        <h2 className="section-title">Reminders we’ve sent</h2>
        {inv.messages.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No reminders sent for this invoice yet.</p>
        ) : (
          <ul className="space-y-3">
            {inv.messages.map((m) => (
              <li key={m.id} className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-medium text-white">{m.channel}</span>
                <span className="text-[var(--muted-soft)]">
                  {new Date(m.sent_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                </span>
                <span className={`rounded px-1.5 py-0.5 text-xs ${m.status === "sent" ? "bg-white/10 text-[var(--success)]" : "text-[var(--muted)]"}`}>
                  {m.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h2 className="section-title">Questions or issues from this invoice</h2>
        {inv.disputes.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No customer questions or issues for this invoice.</p>
        ) : (
          <ul className="space-y-2">
            {inv.disputes.map((d) => (
              <li key={d.id} className="flex items-center gap-3">
                <Link href={`/disputes/${d.id}`} className="link">
                  {d.reason.replace(/_/g, " ")}
                </Link>
                <span className="text-sm text-[var(--muted)]">{d.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
