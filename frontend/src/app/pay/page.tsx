"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { API_BASE } from "@/lib/api";

function PayContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [invoice, setInvoice] = useState<{
    invoice_id: string;
    number: string;
    amount: number;
    due_date: string;
    currency: string;
    customer_name: string | null;
    pay_url: string | null;
    company_name: string | null;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Missing payment link. Use the link from your invoice email.");
      return;
    }
    fetch(`${API_BASE}/api/v1/public/invoice-by-token?token=${encodeURIComponent(token)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Invalid or expired link"))))
      .then(setInvoice)
      .catch((e) => setError(e.message));
  }, [token]);

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

  const disputeUrl = token ? `/dispute?token=${encodeURIComponent(token)}` : "/dispute";
  return (
    <div className="card mx-auto mt-12 max-w-md">
      <h1 className="page-title text-2xl">
        {invoice.company_name ? `Pay ${invoice.company_name}` : "Pay this invoice"}
      </h1>
      <p className="page-subtitle mt-0">Invoice {invoice.number}</p>
      <p className="stat-value mt-4">{invoice.currency} ${invoice.amount.toLocaleString()}</p>
      <p className="stat-label mt-1">Due {invoice.due_date}</p>
      {invoice.pay_url ? (
        <a
          href={invoice.pay_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8 block w-full text-center"
        >
          Pay now
        </a>
      ) : (
        <p className="mt-8 text-sm text-[var(--muted)]">
          There’s no pay link set up for this invoice. Reach out to the sender for how to pay.
        </p>
      )}
      <p className="mt-6 text-center">
        <Link href={disputeUrl} className="text-sm text-[var(--muted)] underline underline-offset-2 hover:text-white">
          Report a payment blocker
        </Link>
      </p>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-[var(--muted)]">Loading…</div>}>
      <PayContent />
    </Suspense>
  );
}
