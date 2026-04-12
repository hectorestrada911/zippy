import { NextResponse } from "next/server";

import { DEMO_ACTIVITY, DEMO_DASHBOARD } from "@/lib/demoDashboard";

/** Same-origin demo JSON — no Python backend. Useful for Vercel-only previews. */
export async function GET() {
  return NextResponse.json({
    dashboard: DEMO_DASHBOARD,
    activity: DEMO_ACTIVITY,
  });
}
