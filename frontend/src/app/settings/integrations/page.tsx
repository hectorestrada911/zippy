"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSyncStatus, runSync, getQuickBooksAuthUrl } from "@/lib/api";

export default function SettingsIntegrationsPage() {
  const [status, setStatus] = useState<Awaited<ReturnType<typeof getSyncStatus>> | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSyncStatus()
      .then(setStatus)
      .catch((e) => setError(e.message));
  }, []);

  async function handleSync() {
    setSyncing(true);
    setSyncResult(null);
    try {
      const r = await runSync();
      setSyncResult(`Synced ${r.customers} customers, ${r.invoices} invoices.`);
      getSyncStatus().then(setStatus);
    } catch (e) {
      setSyncResult(e instanceof Error ? e.message : "Sync failed");
    } finally {
      setSyncing(false);
    }
  }

  async function connectQuickBooks() {
    try {
      const { url } = await getQuickBooksAuthUrl(Math.random().toString(36));
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to get auth URL");
    }
  }

  if (error) {
    return (
      <div className="card max-w-md">
        <p className="text-[var(--error)]">{error}</p>
        <Link href="/dashboard" className="mt-4 inline-block link">← Dashboard</Link>
      </div>
    );
  }
  if (!status) {
    return (
      <div className="page-header">
        <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
        <div className="mt-8 h-64 animate-pulse rounded-[var(--radius)] bg-white/5" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Connect your books and payment tools</p>
      </header>

      <div className="card max-w-2xl">
        <h2 className="section-title">Your books</h2>
        <p className="text-sm text-[var(--muted)] mb-6">
          Connect QuickBooks so Zippy can see your customers and open invoices. Not connected yet? You can still run a sync with sample data to try everything out.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
              status.quickbooks_connected ? "bg-[var(--success)]/20 text-[var(--success)]" : "bg-white/10 text-[var(--muted)]"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            QuickBooks {status.quickbooks_connected ? "Connected" : "Not connected"}
          </span>
          {!status.quickbooks_connected && (
            <button onClick={connectQuickBooks} className="btn-primary">
              Connect QuickBooks
            </button>
          )}
        </div>
        <div className="mt-6 flex items-center gap-4">
          <button onClick={handleSync} disabled={syncing} className="btn-secondary">
            {syncing ? "Syncing…" : "Sync now"}
          </button>
          {syncResult && (
            <p className={`text-sm ${syncResult.startsWith("Synced") ? "text-[var(--success)]" : "text-[var(--error)]"}`}>
              {syncResult}
            </p>
          )}
        </div>
      </div>

      <div className="card max-w-2xl">
        <h2 className="section-title">Getting paid</h2>
        <p className="text-sm text-[var(--muted)]">
          Connect Stripe if you want customers to pay by card in one click. Otherwise, your invoice emails can use your QuickBooks pay link or any other way you collect payment.
        </p>
        <p className="mt-3 text-sm text-[var(--muted-soft)]">
          Stripe: {status.stripe_connected ? "Connected" : "Not connected"}
        </p>
      </div>
    </div>
  );
}
