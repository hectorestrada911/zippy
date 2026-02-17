# Architecture

This document explains the main design choices for Collections Autopilot and how to extend the system.

## Why this structure

- **Clean separation of concerns**: Integrations (QBO, Stripe, email) live behind interfaces so we can swap or mock them. Domain logic (dunning schedule, dispute → pause dunning) lives in `services/` and is independent of HTTP or DB details. The API layer only orchestrates and validates.
- **Ship fast without blocking on QBO**: The accounting sync is behind an `AccountingProvider` interface. We ship a **mock provider** that returns deterministic seed-style data, plus full **QuickBooks scaffolding** (OAuth2, token refresh, customer/invoice fetch). You can run and demo the product without QBO credentials; when ready, connect QBO and the same sync flow runs against real data.
- **Python backend**: FastAPI + async SQLAlchemy 2.0 was chosen to demonstrate a modern Python stack: async all the way, type hints, Pydantic, and clear dependency injection (e.g. `Depends(get_db)`, `Depends(get_current_user)`).
- **APScheduler over Celery**: For the MVP, reminder sending runs on a simple interval (e.g. every 60s) inside the same process as the API. This avoids Redis and a separate worker for local dev and small deployments. The job is a single function that queries “invoices due for a reminder” and sends; it’s easy to move to Celery or a cron later by calling the same logic from a task.

## Core flows

### Dunning

1. **Schedule**: For each invoice we store `next_scheduled_at` (next reminder time). It’s computed from `due_date` and the org’s dunning rules (default: -7, -1, 0, +3, +10, +20 days).
2. **Job**: On a timer, we select invoices where `next_scheduled_at <= now`, `paid_at` is null, and `dispute_open` is false. For each we send one reminder (email and optionally SMS), record a `Message` with an idempotency key `(invoice_id, offset_days, channel)`, then set `last_dunning_at` and recompute `next_scheduled_at` for the next step.
3. **Pause**: When a dispute is opened we set `invoice.dispute_open = True` and `invoice.next_scheduled_at = None`, so the job no longer picks it up. When the dispute is resolved we set `dispute_open = False` and set `next_scheduled_at` to the next appropriate reminder date (next rule on or after today).
4. **Pay**: When we receive a Stripe webhook (or mark paid manually), we set `paid_at` and `next_scheduled_at = None` so dunning stops.

### Tokenized links

- **Pay / Report issue**: Each invoice has a stored `link_token` (opaque, with expiry). Reminder emails include `{frontend_url}/pay?token={link_token}` and `.../dispute?token=...`. The public API validates the token and returns invoice summary or accepts a new dispute. No login required.
- **Magic link login**: Separate JWT used only for dashboard auth; short-lived and exchanged for an access token.

### Audit

- Key events (invoice synced, reminder sent, dispute opened, payment received, dispute updated) are written to `AuditLog` with organization, actor, action, entity type/id, and optional payload. Queries can filter by org and entity for per-invoice or per-dispute history.

## Data model (minimal)

- **Organization**, **User**: One org, many users; magic-link auth by email.
- **Customer**: Synced from accounting; `external_id` for provider mapping.
- **Invoice**: `external_id`, amount, due_date, status, `pay_url`, `dispute_open`, `next_scheduled_at`, `link_token` (+ expiry).
- **Message**: Per reminder send; channel, template, `idempotency_key`, provider id.
- **Dispute**, **DisputeEvent**: Reason, status, assignment, timeline.
- **FileUpload**: Dispute attachments (storage key + metadata).
- **IntegrationCredential**: Provider, tokens, `realm_id` (QBO), etc.
- **DunningRule**, **MessageTemplate**: Per-org schedule and copy.
- **AuditLog**: Event log.

## Extending

- **New accounting provider**: Implement `AccountingProvider` (get_customers, get_invoices, refresh_credential) and register in sync code (e.g. by org setting or credential type).
- **New channel (e.g. SMS)**: In the dunning job, for each rule that has `send_sms`, send via Twilio (or similar), record a `Message` with the same idempotency pattern.
- **Stripe Connect / ACH**: Stripe client already has Checkout; add ACH payment method types and handle additional webhook events to mark paid.
- **Background worker**: Move `run_dunning_job` into a Celery task (or RQ) and trigger it on a schedule; keep the same DB and service calls so behavior is unchanged.
- **Resume after dispute**: The current “resume at next appropriate step” is: set `next_scheduled_at` to the next reminder date on or after today using the org’s dunning offsets. You can refine this (e.g. “resume at due+3” only) by changing `compute_next_scheduled_at` in `services/dunning.py`.

## Security notes

- Stripe webhooks: signature verified with `stripe.Webhook.construct_event` before processing.
- Tokenized links: validated server-side; token stored on invoice with expiry; rotate on use if you need one-time links.
- Auth: JWT for API; magic link is short-lived; protect `/api/v1/*` (except public and webhooks) with `get_current_user` and org checks (`require_org`).
