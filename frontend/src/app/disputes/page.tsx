"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDisputes } from "@/lib/api";
import { getFriendlyError } from "@/lib/getFriendlyError";

const BLOCKER_LABELS: Record<string, string> = {
  missing_po: "Need PO",
  wrong_recipient: "Resend to AP / wrong recipient",
  incorrect_amount: "Wrong amount / line items",
  need_w9: "Need W-9 / vendor onboarding",
  waiting_approval: "Waiting approval",
  scope_timesheet: "Scope / timesheet question",
  paid_already: "Paid already",
  other: "Other",
};

function formatBlockerLabel(value: string): string {
  return BLOCKER_LABELS[value] ?? value.replace(/_/g, " ");
}

export default function DisputesPage() {
  const [list, setList] = useState<Awaited<ReturnType<typeof getDisputes>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDisputes()
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
        <h1 className="page-title">Blockers</h1>
        <p className="page-subtitle">When someone says “wrong amount” or “need a PO” from their invoice link, it shows here. Fix it and we’ll only nudge again when you’re ready.</p>
      </header>

      {list.length > 0 ? (
        <div className="table-wrap">
          <table>
          <thead>
            <tr>
              <th>Blocker</th>
              <th>Status</th>
              <th>Created</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {list.map((d) => (
              <tr key={d.id}>
                <td>
                  <Link href={`/disputes/${d.id}`} className="link">
                    {formatBlockerLabel(d.reason)}
                  </Link>
                </td>
                <td>
                  <span
                    className={
                      d.status === "resolved"
                        ? "text-[var(--success)]"
                        : d.status === "open"
                          ? "text-[var(--warning)]"
                          : ""
                    }
                  >
                    {d.status}
                  </span>
                </td>
                <td className="text-[var(--muted)]">
                  {d.created_at ? new Date(d.created_at).toLocaleDateString(undefined, { dateStyle: "medium" }) : "-"}
                </td>
                <td>
                  <Link href={`/invoices/${d.invoice_id}`} className="link">
                    View invoice
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
        <div className="empty-state">
          <p className="empty-state-title">Nothing here yet</p>
          <p className="empty-state-desc">
            When a customer clicks “Report an issue” on their invoice email, it’ll appear here so you can resolve it quickly.
          </p>
          <Link href="/help" className="mt-4 btn-secondary">How follow-ups & blockers work</Link>
        </div>
      )}
    </div>
  );
}
