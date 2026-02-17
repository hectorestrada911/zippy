# Collections Autopilot

MVP for small B2B service businesses to **reduce Days Sales Outstanding (DSO)** by automating reminders with pay links and dispute handling. Late invoices often stall on friction (missing PO, W-9, wrong hours); this app makes paying or disputing one click and gives the owner a dashboard of what to do next.

## Features

- **Accounting sync**: QuickBooks Online (OAuth2) or mock provider for customers + open invoices
- **Automated dunning**: Schedule (-7, -1, due, +3, +10, +20 days), email + optional SMS, idempotent sends
- **Pay links**: Stripe Checkout (optional) or QBO/in-app invoice URL
- **Dispute workflow**: Customer opens dispute via token link; internal queue; dunning auto-pauses until resolved
- **Dashboard**: Total/overdue AR, expected cash 7/30 days, overdue list, disputes needing action
- **Audit log**: Messages, disputes, payments, sync events

## Tech stack

- **Backend**: Python 3.12, FastAPI (async), SQLAlchemy 2.0 (async), Postgres, APScheduler
- **Frontend**: Next.js 15, TypeScript, Tailwind
- **Integrations**: QuickBooks (interface + mock), Stripe (Checkout + webhooks), Resend (email)

## Quick start

### Prerequisites

- Python 3.12+, Node 20+, Docker (for Postgres)

### 1. Database

```bash
docker compose up -d
```

### 2. Backend

```bash
cd backend
cp ../.env.example .env   # edit if needed
python -m venv .venv
source .venv/bin/activate   # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
python scripts/seed.py
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

- App: http://localhost:3000  
- API: http://localhost:8000  
- Log in: use **demo@example.com** and request magic link; in dev the response includes a `dev_link` you can open to sign in.

### 4. Optional

- **QuickBooks**: Set `QUICKBOOKS_CLIENT_ID`, `QUICKBOOKS_CLIENT_SECRET`, `QUICKBOOKS_REDIRECT_URI` in backend `.env`, then connect in Settings → Integrations.
- **Stripe**: Set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`; configure webhook to `POST /api/v1/webhooks/stripe`.
- **Email**: Set `RESEND_API_KEY` so reminders are sent; otherwise dunning logic still runs but no email.

## Project structure

```
PayWow/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # Routes: auth, dashboard, invoices, disputes, sync, webhooks, settings, public
│   │   ├── core/             # Security, tokens
│   │   ├── integrations/    # QBO, mock, Stripe, email
│   │   ├── jobs/            # Dunning runner (APScheduler)
│   │   ├── models/          # SQLAlchemy models
│   │   ├── schemas/         # Pydantic
│   │   └── services/       # Audit, dunning domain logic
│   ├── scripts/seed.py
│   └── requirements.txt
├── frontend/
│   └── src/app/             # Next.js App Router pages
├── docker-compose.yml      # Postgres
├── .env.example
├── ARCHITECTURE.md
└── README.md
```

## API overview

| Area | Endpoints |
|------|-----------|
| Auth | `POST /api/v1/auth/magic-link`, `POST /api/v1/auth/callback?token=` |
| Dashboard | `GET /api/v1/dashboard` |
| Invoices | `GET /api/v1/invoices`, `GET /api/v1/invoices/{id}` |
| Disputes | `GET/PATCH /api/v1/disputes`, `GET /api/v1/disputes/{id}` |
| Sync | `GET /api/v1/sync/status`, `POST /api/v1/sync/run` |
| Settings | `GET /api/v1/settings/company`, QBO authorize + callback |
| Webhooks | `POST /api/v1/webhooks/stripe` |
| Public | `GET /api/v1/public/invoice-by-token?token=`, `POST /api/v1/public/dispute?token=` |

## Tests

```bash
cd backend
pytest
```

See `ARCHITECTURE.md` for design decisions and extension points.
