"use client";

import { FormEvent, useState } from "react";
import { API_BASE } from "@/lib/api";

type WaitlistState = {
  loading: boolean;
  message: string | null;
  error: string | null;
};

const initialState: WaitlistState = {
  loading: false,
  message: null,
  error: null,
};

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<WaitlistState>(initialState);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ loading: true, message: null, error: null });
    try {
      const res = await fetch(`${API_BASE}/api/v1/public/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "landing_page" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.detail || data.message || "Could not join waitlist.");
      }
      setState({ loading: false, message: data.message || "You're on the waitlist.", error: null });
      setEmail("");
    } catch (err) {
      setState({
        loading: false,
        message: null,
        error: err instanceof Error ? err.message : "Could not join waitlist.",
      });
    }
  }

  return (
    <section className="border-t border-[var(--border)] px-4 py-14 md:py-16" style={{ backgroundColor: "rgba(15, 15, 18, 0.6)" }}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="page-title">Join the Zippy waitlist</h2>
        <p className="page-subtitle mx-auto mt-2 max-w-xl">
          We're opening spots in waves. Leave your email and we'll invite you first.
        </p>
        <form onSubmit={onSubmit} className="mx-auto mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-white placeholder:text-[var(--muted-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
          />
          <button type="submit" className="btn-primary h-12 px-6 disabled:opacity-60" disabled={state.loading}>
            {state.loading ? "Joining..." : "Join waitlist"}
          </button>
        </form>
        {state.message && <p className="mt-3 text-sm text-emerald-400">{state.message}</p>}
        {state.error && <p className="mt-3 text-sm text-red-400">{state.error}</p>}
      </div>
    </section>
  );
}

