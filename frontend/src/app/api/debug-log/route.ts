import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

const LOG_PATH = "/Users/hectorestrada/Desktop/Z/PayWow/.cursor/debug-4c3e2e.log";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    await mkdir(path.dirname(LOG_PATH), { recursive: true });
    await appendFile(LOG_PATH, `${JSON.stringify(payload)}\n`, "utf8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

