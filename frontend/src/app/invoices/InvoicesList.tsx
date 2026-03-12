"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getInvoices } from "@/lib/api";
import { getFriendlyError } from "@/lib/getFriendlyError";

export default function InvoicesList() {
  const [list, setList] = useState<Awaited<ReturnType<typeof getInvoices>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getInvoices()
      .then(setList)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    const { message, primary, secondary } = getFriendlyError(error);
    return (
      <div className="card max-w-md">
        <p className="text-[var(--error)]">{message}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {primary && <Link href={primary.href} className="link">{primary.label}</Link>}
          {secondary && <Link href={secondary.href} className="link">{secondary.label}</Link>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="page-header">
        <h1 className="page-title">Who owes you what</h1>
        <p className="page-subtitle">All open invoices and next autopilot action</p>
      </header>

      {list.length > 0 ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
              <th>Invoice</th>
              <th>Amount</th>
              <th>Due date</th>
              <th>Status</th>
              <th>Issue?</th>
              <th>Next action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((inv) => (
                <tr key={inv.id}>
                  <td>
                    <Link href={`/invoices/${inv.id}`} className="link">
                      {inv.number || inv.external_id}
                    </Link>
                  </td>
                  <td className="tabular-nums">${Number(inv.amount).toLocaleString()}</td>
                  <td>{inv.due_date}</td>
                  <td>
                    <span className={inv.status === "overdue" ? "text-[var(--warning)]" : ""}>
                      {inv.status}
                    </span>
                    {inv.escalated_at && (
                      <span className="ml-2 rounded bg-amber-500/20 px-1.5 py-0.5 text-xs text-amber-400">Escalated</span>
                    )}
                  </td>
                  <td>{inv.dispute_open ? "Yes" : "-"}</td>
                  <td className="text-[var(--muted)]">
                    {inv.next_scheduled_at
                      ? new Date(inv.next_scheduled_at).toLocaleString(undefined, {
                          dateStyle: "short",
                          timeStyle: "short",
                        })
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-state-title">No invoices yet</p>
          <p className="empty-state-desc">
            Connect QuickBooks in Settings to pull in your customers and open invoices. Once synced, set your first reminder schedule so we know when to nudge.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/settings/integrations" className="btn-primary">
              Connect QuickBooks
            </Link>
            <Link href="/settings/autopilot" className="btn-secondary">
              Set reminder schedule
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
