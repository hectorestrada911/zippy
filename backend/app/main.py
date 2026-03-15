"""Zippy - FastAPI app and scheduler."""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger

from app.config import settings
from app.database import engine, Base, get_db
from app.api.v1 import auth, dashboard, invoices, disputes, public, sync, webhooks, settings as settings_router
from app.jobs.dunning_runner import run_dunning_job


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start scheduler
    scheduler = AsyncIOScheduler()
    scheduler.add_job(
        run_dunning_job,
        IntervalTrigger(seconds=settings.scheduler_run_reminders_every_seconds),
        id="dunning",
    )
    scheduler.start()
    yield
    scheduler.shutdown()


app = FastAPI(
    title=settings.app_name,
    lifespan=lifespan,
)
# Normalize frontend URL (no trailing slash) so CORS matches browser Origin header
_frontend_origin = (settings.frontend_url or "").rstrip("/")
_origins = ["http://localhost:3000", "http://localhost:3001"]
if _frontend_origin:
    _origins.append(_frontend_origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API v1
app.include_router(auth.router, prefix="/api/v1")
app.include_router(dashboard.router, prefix="/api/v1")
app.include_router(invoices.router, prefix="/api/v1")
app.include_router(disputes.router, prefix="/api/v1")
app.include_router(public.router, prefix="/api/v1")
app.include_router(sync.router, prefix="/api/v1")
app.include_router(webhooks.router, prefix="/api/v1")
app.include_router(settings_router.router, prefix="/api/v1")


@app.get("/health")
def health():
    return {"status": "ok"}


# Create tables on startup (for dev; use Alembic in production)
@app.on_event("startup")
async def create_tables():
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    except Exception as e:
        import logging
        logging.getLogger("app").warning("Database not available: %s. Start Postgres (e.g. docker compose up -d).", e)
