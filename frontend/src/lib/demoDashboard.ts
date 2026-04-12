/**
 * Offline demo: no FastAPI, Postgres, or Render. Enable with NEXT_PUBLIC_DEMO_MODE=1 and run `npm run dev`.
 * Optional same-origin JSON: GET /api/demo/snapshot
 */

export type DemoActivityRow = {
  id: string;
  action: string;
  actor_type: string | null;
  entity_type: string | null;
  entity_id: string | null;
  payload: Record<string, unknown> | null;
  created_at: string;
};

export type DemoDashboardData = {
  summary: {
    total_ar: number;
    overdue_ar: number;
    expected_7_days: number;
    expected_30_days: number;
    overdue_count: number;
    paid_count_this_month: number;
    paid_after_reminder_total: number;
  };
  overdue_invoices: Array<{
    invoice_id: string;
    invoice_number: string | null;
    customer_name: string;
    amount: number;
    due_date: string;
    next_scheduled_at: string | null;
    status: string;
  }>;
  disputes_needing_action: Array<{
    dispute_id: string;
    invoice_id: string;
    invoice_number: string | null;
    reason: string;
    status: string;
    created_at: string;
  }>;
};

export const DEMO_DASHBOARD: DemoDashboardData = {
  summary: {
    total_ar: 24_850,
    overdue_ar: 6_200,
    expected_7_days: 9_400,
    expected_30_days: 18_650,
    overdue_count: 3,
    paid_count_this_month: 7,
    paid_after_reminder_total: 14_200,
  },
  overdue_invoices: [
    {
      invoice_id: "demo-inv-1",
      invoice_number: "INV-1042",
      customer_name: "Harborline Services",
      amount: 2800,
      due_date: "2026-04-02",
      next_scheduled_at: "2026-04-12T09:00:00.000Z",
      status: "overdue",
    },
    {
      invoice_id: "demo-inv-2",
      invoice_number: "INV-1048",
      customer_name: "Northwind Cabinetry",
      amount: 3400,
      due_date: "2026-03-28",
      next_scheduled_at: "2026-04-11T09:00:00.000Z",
      status: "overdue",
    },
  ],
  disputes_needing_action: [
    {
      dispute_id: "demo-dsp-1",
      invoice_id: "demo-inv-3",
      invoice_number: "INV-1051",
      reason: "needs_po",
      status: "open",
      created_at: "2026-04-10T14:22:00.000Z",
    },
  ],
};

export const DEMO_ACTIVITY: DemoActivityRow[] = [
  {
    id: "demo-a1",
    action: "sync_completed",
    actor_type: "user",
    entity_type: null,
    entity_id: null,
    payload: { customers: 12, invoices: 28 },
    created_at: "2026-04-12T10:05:00.000Z",
  },
  {
    id: "demo-a2",
    action: "reminder_sent",
    actor_type: "system",
    entity_type: "invoice",
    entity_id: null,
    payload: { channel: "email", offset_days: 3 },
    created_at: "2026-04-12T09:00:00.000Z",
  },
  {
    id: "demo-a3",
    action: "payment_received",
    actor_type: "system",
    entity_type: "invoice",
    entity_id: null,
    payload: { source: "stripe" },
    created_at: "2026-04-11T16:40:00.000Z",
  },
  {
    id: "demo-a4",
    action: "dispute_opened",
    actor_type: "customer",
    entity_type: "invoice",
    entity_id: null,
    payload: { reason: "needs_po" },
    created_at: "2026-04-10T14:22:00.000Z",
  },
];

export function isDemoMode(): boolean {
  const v = process.env.NEXT_PUBLIC_DEMO_MODE?.toLowerCase() ?? "";
  return v === "1" || v === "true" || v === "yes";
}
