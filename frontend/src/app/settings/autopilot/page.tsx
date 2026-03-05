"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAutopilotSettings, updateAutopilotSettings } from "@/lib/api";

export default function SettingsAutopilotPage() {
  const [settings, setSettings] = useState<Awaited<ReturnType<typeof getAutopilotSettings>> | null>(null);
  const [escalationDays, setEscalationDays] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAutopilotSettings()
      .then((r) => {
        setSettings(r);
        setEscalationDays(r.escalation_days != null ? String(r.escalation_days) : "");
      })
      .catch((e) => setError(e.message));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const value = escalationDays.trim() === "" ? null : parseInt(escalationDays, 10);
      if (value !== null && (value < 1 || value > 365)) {
        setError("Enter a number between 1 and 365.");
        return;
      }
      const updated = await updateAutopilotSettings({ escalation_days: value });
      setSettings(updated);
      setEscalationDays(updated.escalation_days != null ? String(updated.escalation_days) : "");
      setMessage("Saved.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (error && !settings) {
    return (
      <div className="card max-w-md">
        <p className="text-[var(--error)]">{error}</p>
        <Link href="/dashboard" className="mt-4 inline-block link">← Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Link href="/settings/integrations" className="text-sm text-[var(--muted)] hover:text-white">
          ← Settings
        </Link>
        <h1 className="page-title mt-2">Autopilot</h1>
        <p className="page-subtitle">
          When an invoice is this many days past due, we mark it as escalated so you can prioritize.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card max-w-md space-y-4">
        <div>
          <label htmlFor="escalation_days" className="stat-label mb-2 block">
            Escalation (days past due)
          </label>
          <input
            id="escalation_days"
            type="number"
            min={1}
            max={365}
            value={escalationDays}
            onChange={(e) => setEscalationDays(e.target.value)}
            placeholder="e.g. 30"
            className="input w-full"
          />
          <p className="mt-1 text-xs text-[var(--muted)]">
            Leave empty to disable. When an invoice is this many days overdue, it’s marked escalated.
          </p>
        </div>
        {error && <p className="text-sm text-[var(--error)]">{error}</p>}
        {message && <p className="text-sm text-[var(--success)]">{message}</p>}
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Saving…" : "Save"}
        </button>
      </form>
    </div>
  );
}
