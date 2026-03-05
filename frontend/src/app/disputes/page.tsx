"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDisputes } from "@/lib/api";

export default function DisputesPage() {
  const [list, setList] = useState<Awaited<ReturnType<typeof getDisputes>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDisputes()
      .then(setList)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="card max-w-md">
        <p className="text-[var(--error)]">{error}</p>
        <Link href="/login" className="mt-4 inline-block link">Log in</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="page-header">
        <h1 className="page-title">Blockers</h1>
        <p className="page-subtitle">Payment blockers from your invoice links show here. Resolve them and we’ll resume reminders when you’re ready.</p>
      </header>

      {list.length > 0 ? (
        <div className="table-wrap">
          <table>
          <thead>
            <tr>
              <th>Reason</th>
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
                    {d.reason.replace(/_/g, " ")}
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
                  {d.created_at ? new Date(d.created_at).toLocaleDateString(undefined, { dateStyle: "medium" }) : "—"}
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
        </div>
      )}
    </div>
  );
}
