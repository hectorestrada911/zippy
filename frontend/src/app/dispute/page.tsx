"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const REASONS = [
  { value: "missing_po", label: "Missing PO" },
  { value: "incorrect_amount", label: "Incorrect amount" },
  { value: "need_w9", label: "Need W-9" },
  { value: "scope_timesheet", label: "Scope / timesheet question" },
  { value: "other", label: "Other" },
];

export default function DisputePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [invoice, setInvoice] = useState<{
    invoice_id: string;
    number: string;
    amount: number;
    due_date: string;
    has_open_dispute: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Missing link. Use the link from your invoice email.");
      return;
    }
    fetch(`/api/v1/public/invoice-by-token?token=${encodeURIComponent(token)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Invalid or expired link"))))
      .then(setInvoice)
      .catch((e) => setError(e.message));
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !reason) return;
    setSubmitting(true);
    try {
      const res = await fetch(
        `/api/v1/public/dispute?token=${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason, description: description || null }),
        }
      );
      if (!res.ok) throw new Error("Failed to submit");
      setDone(true);
    } catch {
      setError("Failed to submit dispute. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (error) {
    return (
      <div className="card mx-auto mt-12 max-w-md">
        <p className="text-[var(--error)]">{error}</p>
      </div>
    );
  }
  if (!invoice) {
    return (
      <div className="py-12 text-center text-[var(--muted)]">Loading…</div>
    );
  }
  if (invoice.has_open_dispute) {
    return (
      <div className="card mx-auto mt-12 max-w-md">
        <p className="text-[var(--accent)]">You’ve already reported an issue for this invoice. The sender will get back to you soon.</p>
      </div>
    );
  }
  if (done) {
    return (
      <div className="card mx-auto mt-12 max-w-md">
        <p className="text-[var(--success)]">Thanks, we’ve passed this along. The sender will follow up with you shortly.</p>
      </div>
    );
  }

  return (
    <div className="card mx-auto mt-12 max-w-md">
      <h1 className="page-title text-2xl">Something wrong with this invoice?</h1>
      <p className="page-subtitle mt-0">
        Invoice {invoice.number} · ${invoice.amount.toLocaleString()} (due {invoice.due_date})
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="reason" className="stat-label mb-2 block">Reason</label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="input"
            required
          >
            <option value="">Select…</option>
            {REASONS.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="details" className="stat-label mb-2 block">Details (optional)</label>
          <textarea
            id="details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input min-h-[100px] resize-y"
            placeholder="Describe the issue…"
          />
        </div>
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </form>
    </div>
  );
}
