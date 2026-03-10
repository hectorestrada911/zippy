"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { magicLink, authCallback } from "@/lib/api";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/dashboard";

  // If token in URL (e.g. user opened magic link on /login), exchange and redirect
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return;
    authCallback(token)
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        router.replace(nextPath);
      })
      .catch(() => setMessage("Invalid or expired link"));
  }, [searchParams, router, nextPath]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const data = await magicLink(email, nextPath);
      setMessage(data.message + (data.dev_link ? ` Check your email or use: ${data.dev_link}` : ""));
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card">
        <h1 className="page-title text-2xl">Welcome back</h1>
        <p className="page-subtitle mt-1">
          Enter your email and we’ll send you a sign-in link. No password to remember.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="stat-label block mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="input"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Sending link…" : "Send me the link"}
          </button>
        </form>
        {message && (
          <p className="mt-6 rounded-[var(--radius-sm)] bg-white/5 p-4 text-sm text-[var(--accent)]">
            {message}
          </p>
        )}
      </div>
      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        <Link href="/" className="link">← Back to home</Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md"><div className="card animate-pulse h-64" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
