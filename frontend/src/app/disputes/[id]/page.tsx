"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getDispute, updateDispute } from "@/lib/api";

export default function DisputeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [d, setD] = useState<Awaited<ReturnType<typeof getDispute>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  function load() {
    getDispute(id).then(setD).catch((e) => setError(e.message));
  }

  useEffect(() => {
    load();
  }, [id]);

  async function setStatus(status: string) {
    setUpdating(true);
    try {
      await updateDispute(id, { status });
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setUpdating(false);
    }
  }

  if (error) {
    return (
      <div className="card max-w-md">
        <p className="text-[var(--error)]">{error}</p>
        <Link href="/disputes" className="mt-4 inline-block link">← Back to disputes</Link>
      </div>
    );
  }
  if (!d) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-32 animate-pulse rounded bg-white/10" />
        <div className="card h-48 animate-pulse bg-white/5" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link href="/disputes" className="inline-block text-sm text-[var(--muted)] transition-colors hover:text-white">
        ← Disputes
      </Link>

      <div className="card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="page-title text-2xl">{d.reason.replace(/_/g, " ")}</h1>
            <p className="page-subtitle mt-0">From their invoice link</p>
          </div>
          {d.status !== "resolved" && (
            <button
              onClick={() => setStatus("resolved")}
              disabled={updating}
              className="btn-primary shrink-0"
            >
              {updating ? "Saving…" : "Mark as resolved"}
            </button>
          )}
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm md:grid-cols-3">
          <div>
            <dt className="stat-label">Status</dt>
            <dd>
              <span
                className={
                  d.status === "resolved"
                    ? "text-[var(--success)]"
                    : d.status === "open"
                      ? "text-[var(--warning)]"
                      : "text-white"
                }
              >
                {d.status}
              </span>
            </dd>
          </div>
          <div>
            <dt className="stat-label">Invoice</dt>
            <dd>
              <Link href={`/invoices/${d.invoice_id}`} className="link">View invoice</Link>
            </dd>
          </div>
          <div className="col-span-2 md:col-span-3">
            <dt className="stat-label">Description</dt>
            <dd className="mt-1 text-white">{d.description || "—"}</dd>
          </div>
        </dl>
      </div>

      {d.events && d.events.length > 0 && (
        <div className="card">
          <h2 className="section-title">What happened</h2>
          <ul className="space-y-3">
            {d.events.map((e, i) => (
              <li key={i} className="flex flex-wrap items-baseline gap-2 text-sm">
                <span className="text-[var(--muted-soft)]">
                  {e.created_at ? new Date(e.created_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : ""}
                </span>
                <span className="font-medium text-white">{e.kind.replace(/_/g, " ")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
