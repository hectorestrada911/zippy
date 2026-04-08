"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
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

type WaitlistFormProps = {
  /** Stored on the waitlist row for attribution (e.g. waitlist_landing, landing_page). */
  source?: string;
  /** `section` = bordered band for the marketing home page; `bare` = form only for custom shells. */
  variant?: "section" | "bare";
};

export default function WaitlistForm({ source = "landing_page", variant = "section" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<WaitlistState>(initialState);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ loading: true, message: null, error: null });
    try {
      const res = await fetch(`${API_BASE}/api/v1/public/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
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

  const form = (
    <>
      <form
        data-ux-section="waitlist-form"
        onSubmit={onSubmit}
        className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-white placeholder:text-[var(--muted-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
        />
        <button
          type="submit"
          data-ux-cta="waitlist-submit"
          className="btn-primary h-12 min-w-40 whitespace-nowrap px-6 disabled:opacity-60"
          disabled={state.loading}
        >
          {state.loading ? "Joining..." : "Join waitlist"}
        </button>
      </form>
      {state.message && <p className="mt-3 text-sm text-emerald-400">{state.message}</p>}
      {state.error && <p className="mt-3 text-sm text-red-400">{state.error}</p>}
    </>
  );

  if (variant === "bare") {
    return <div className="text-left">{form}</div>;
  }

  return (
    <section
      data-ux-section="waitlist-home"
      className="border-t border-[var(--border)] px-4 py-14 md:py-16"
      style={{ backgroundColor: "rgba(15, 15, 18, 0.6)" }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="page-title">Join the Zippy waitlist</h2>
        <p className="page-subtitle mx-auto mt-2 max-w-xl">
          We&apos;re opening spots in waves. Leave your email and we&apos;ll invite you first—or{" "}
          <Link href="/waitlist" className="text-[var(--accent)] underline-offset-2 hover:underline">
            see the full QuickBooks waitlist page
          </Link>
          .
        </p>
        <div className="mt-8">{form}</div>
      </div>
    </section>
  );
}

