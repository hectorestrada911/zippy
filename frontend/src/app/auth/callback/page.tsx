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
    // #region agent log
    fetch("http://127.0.0.1:7358/ingest/09609727-79f6-48ed-8830-8c381fd51540",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"4c3e2e"},body:JSON.stringify({sessionId:"4c3e2e",runId:"pre-fix",hypothesisId:"H1-H3",location:"frontend/src/app/auth/callback/page.tsx:useEffect",message:"Auth callback invoked",data:{hasToken:Boolean(token),nextPath,isAbsoluteUrl:/^https?:\/\//i.test(nextPath),isRootRelative:nextPath.startsWith("/")},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    if (!token) {
      setError("Missing token");
      return;
    }
    authCallback(token)
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        // #region agent log
        fetch("http://127.0.0.1:7358/ingest/09609727-79f6-48ed-8830-8c381fd51540",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"4c3e2e"},body:JSON.stringify({sessionId:"4c3e2e",runId:"pre-fix",hypothesisId:"H2-H3",location:"frontend/src/app/auth/callback/page.tsx:authSuccess",message:"Auth callback succeeded",data:{nextPath,tokenStored:typeof window!=="undefined"&&Boolean(localStorage.getItem("access_token")),isAbsoluteUrl:/^https?:\/\//i.test(nextPath)},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
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
