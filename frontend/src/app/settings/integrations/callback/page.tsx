"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getFriendlyError } from "@/lib/getFriendlyError";
import { API_BASE } from "@/lib/api";

function QuickBooksCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const realmId = searchParams.get("realmId");
    const state = searchParams.get("state");
    if (!code || !realmId) {
      setError("Missing code or realmId from QuickBooks");
      return;
    }
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) {
      setError("Please log in first, then connect QuickBooks.");
      return;
    }
    fetch(
      `${API_BASE}/api/v1/settings/integrations/quickbooks/callback?code=${encodeURIComponent(code)}&realm_id=${encodeURIComponent(realmId)}&state=${encodeURIComponent(state || "")}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Connection failed"))))
      .then(() => router.replace("/settings/integrations"))
      .catch((e) => setError(e.message));
  }, [searchParams, router]);

  if (error) {
    const { message, primary, secondary } = getFriendlyError(error);
    return (
      <div className="card max-w-md mx-auto mt-12">
        <p className="text-[var(--error)]">{message}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {primary && <Link href={primary.href} className="text-[var(--accent)] hover:underline">{primary.label}</Link>}
          {secondary && <Link href={secondary.href} className="text-[var(--accent)] hover:underline">{secondary.label}</Link>}
          <Link href="/settings/integrations" className="text-[var(--muted)] hover:text-white">← Back to settings</Link>
        </div>
      </div>
    );
  }
  return <div className="text-zinc-400 text-center py-12">Connecting QuickBooks…</div>;
}

export default function QuickBooksCallbackPage() {
  return (
    <Suspense fallback={<div className="text-zinc-400 text-center py-12">Connecting QuickBooks…</div>}>
      <QuickBooksCallbackContent />
    </Suspense>
  );
}
