"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function QuickBooksCallbackPage() {
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
      `/api/v1/settings/integrations/quickbooks/callback?code=${encodeURIComponent(code)}&realm_id=${encodeURIComponent(realmId)}&state=${encodeURIComponent(state || "")}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Connection failed"))))
      .then(() => router.replace("/settings/integrations"))
      .catch((e) => setError(e.message));
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="card max-w-md mx-auto mt-12">
        <p className="text-amber-400">{error}</p>
        <a href="/settings/integrations" className="mt-4 inline-block text-cyan-400 hover:underline">Back to settings</a>
      </div>
    );
  }
  return <div className="text-zinc-400 text-center py-12">Connecting QuickBooks…</div>;
}
