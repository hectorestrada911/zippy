"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authCallback } from "@/lib/api";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    const nextPath = searchParams.get("next") || "/dashboard";
    if (!token) {
      setError("Missing token");
      return;
    }
    authCallback(token)
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        router.replace(nextPath);
      })
      .catch(() => setError("Invalid or expired link"));
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="card max-w-md mx-auto mt-12">
        <p className="text-amber-400">{error}</p>
        <a href="/login" className="mt-4 inline-block text-cyan-400 hover:underline">Back to login</a>
      </div>
    );
  }
  return <div className="text-zinc-400 text-center py-12">Signing you in…</div>;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="text-zinc-400 text-center py-12">Signing you in…</div>}>
      <AuthCallbackContent />
    </Suspense>
  );
}
