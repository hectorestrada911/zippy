const API_BASE = typeof window !== "undefined" ? "" : "http://localhost:8000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (token) (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Request failed");
  }
  return res.json();
}

export async function getDashboard() {
  return api<{
    summary: {
      total_ar: number;
      overdue_ar: number;
      expected_7_days: number;
      expected_30_days: number;
      overdue_count: number;
      paid_count_this_month: number;
      paid_after_reminder_total: number;
    };
    overdue_invoices: Array<{ invoice_id: string; invoice_number: string | null; customer_name: string; amount: number; due_date: string; next_scheduled_at: string | null; status: string }>;
    disputes_needing_action: Array<{ dispute_id: string; invoice_id: string; invoice_number: string | null; reason: string; status: string; created_at: string }>;
  }>("/api/v1/dashboard");
}

export async function getInvoices() {
  return api<Array<{
    id: string;
    external_id: string;
    number: string | null;
    amount: number;
    due_date: string;
    status: string;
    dispute_open: boolean;
    next_scheduled_at: string | null;
    paid_at: string | null;
    escalated_at: string | null;
    customer_id: string;
  }>>("/api/v1/invoices");
}

export async function getInvoice(id: string) {
  return api<{
    id: string;
    number: string | null;
    amount: number;
    due_date: string;
    status: string;
    dispute_open: boolean;
    escalated_at: string | null;
    messages: Array<{ id: string; channel: string; sent_at: string; status: string }>;
    disputes: Array<{ id: string; reason: string; status: string }>;
    customer_name: string | null;
    customer_email: string | null;
    pay_url: string | null;
  }>(`/api/v1/invoices/${id}`);
}

export async function getDisputes(status?: string) {
  const q = status ? `?status_filter=${status}` : "";
  return api<Array<{
    id: string;
    invoice_id: string;
    reason: string;
    description: string | null;
    status: string;
    created_at: string;
  }>>(`/api/v1/disputes${q}`);
}

export async function getDispute(id: string) {
  return api<{
    id: string;
    invoice_id: string;
    reason: string;
    description: string | null;
    status: string;
    events: Array<{ kind: string; payload: unknown; created_at: string }>;
    created_at: string;
  }>(`/api/v1/disputes/${id}`);
}

export async function updateDispute(id: string, body: { status?: string; assigned_to_id?: string }) {
  return api<{ id: string; status: string }>(`/api/v1/disputes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function getSyncStatus() {
  return api<{ last_sync_at: string | null; quickbooks_connected: boolean; stripe_connected: boolean }>("/api/v1/sync/status");
}

export async function runSync() {
  return api<{ status: string; customers: number; invoices: number }>("/api/v1/sync/run", { method: "POST" });
}

export async function getCompany() {
  return api<{ name: string; logo_url: string | null; signature_text: string | null; reply_to_email: string | null }>("/api/v1/settings/company");
}

export async function getAutopilotSettings() {
  return api<{ escalation_days: number | null }>("/api/v1/settings/autopilot");
}

export async function updateAutopilotSettings(body: { escalation_days: number | null }) {
  return api<{ escalation_days: number | null }>("/api/v1/settings/autopilot", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function getQuickBooksAuthUrl(state: string) {
  return api<{ url: string }>(`/api/v1/settings/integrations/quickbooks/authorize-url?state=${encodeURIComponent(state)}`);
}

export async function magicLink(email: string, next?: string) {
  return api<{ message: string; dev_link?: string }>("/api/v1/auth/magic-link", {
    method: "POST",
    body: JSON.stringify({ email, next: next ?? undefined }),
  });
}

export async function authCallback(token: string) {
  const res = await fetch(`/api/v1/auth/callback?token=${encodeURIComponent(token)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Invalid or expired link");
  return res.json();
}
