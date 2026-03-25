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
    // #region agent log
    fetch("http://127.0.0.1:7358/ingest/09609727-79f6-48ed-8830-8c381fd51540",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"4c3e2e"},body:JSON.stringify({sessionId:"4c3e2e",runId:"pre-fix",hypothesisId:"H1-H3",location:"frontend/src/app/login/page.tsx:useEffect",message:"Login effect initialized",data:{hasToken:Boolean(token),nextPath,isConnectingQuickBooks:nextPath.includes("integrations"),isAbsoluteUrl:/^https?:\/\//i.test(nextPath),isRootRelative:nextPath.startsWith("/")},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    if (!token) return;
    authCallback(token)
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        // #region agent log
        fetch("http://127.0.0.1:7358/ingest/09609727-79f6-48ed-8830-8c381fd51540",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"4c3e2e"},body:JSON.stringify({sessionId:"4c3e2e",runId:"pre-fix",hypothesisId:"H2-H3",location:"frontend/src/app/login/page.tsx:authSuccess",message:"Token stored and redirecting",data:{nextPath,tokenStored:typeof window!=="undefined"&&Boolean(localStorage.getItem("access_token")),isAbsoluteUrl:/^https?:\/\//i.test(nextPath)},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
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

  const isConnectingQuickBooks = nextPath.includes("integrations");

  return (
    <div className="mx-auto max-w-md">
      <div className="card">
        <h1 className="page-title text-2xl">Welcome back</h1>
        <p className="page-subtitle mt-1">
          Enter your email and we’ll send you a sign-in link. No password to remember.
        </p>

        {isConnectingQuickBooks && (
          <div className="mt-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--background)]/60 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
              To connect QuickBooks
            </p>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 text-xs font-semibold text-[var(--accent)]">
                  1
                </span>
                <span className="text-sm text-[var(--muted)]">
                  Enter your email below — we’ll send a sign-in link.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-xs font-semibold text-[var(--muted)]">
                  2
                </span>
                <span className="text-sm text-[var(--muted)]">
                  Check your inbox and click the link to sign in.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-xs font-semibold text-[var(--muted)]">
                  3
                </span>
                <span className="text-sm text-[var(--muted)]">
                  You’ll land on the integrations page to connect QuickBooks.
                </span>
              </li>
            </ol>
          </div>
        )}

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
