"""Zippy - FastAPI app and scheduler."""
import json
from contextlib import asynccontextmanager
from pathlib import Path
from time import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger

from app.config import settings
from app.database import engine, Base, get_db
from app.api.v1 import activity, auth, dashboard, invoices, disputes, public, sync, webhooks, settings as settings_router
from app.jobs.dunning_runner import run_dunning_job

_DEBUG_LOG_PATH = Path("/Users/hectorestrada/Desktop/Z/PayWow/.cursor/debug-4c3e2e.log")


def _debug_log(run_id: str, hypothesis_id: str, location: str, message: str, data: dict) -> None:
    payload = {
        "sessionId": "4c3e2e",
        "runId": run_id,
        "hypothesisId": hypothesis_id,
        "location": location,
        "message": message,
        "data": data,
        "timestamp": int(time() * 1000),
    }
    try:
        _DEBUG_LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
        with _DEBUG_LOG_PATH.open("a", encoding="utf-8") as f:
            f.write(json.dumps(payload, separators=(",", ":")) + "\n")
    except Exception:
        pass


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
# CORS: allow localhost + FRONTEND_URL + optional CORS_ORIGINS (comma-separated)
_frontend_origin = (settings.frontend_url or "").rstrip("/")
_origins = ["http://localhost:3000", "http://localhost:3001"]
if _frontend_origin:
    _origins.append(_frontend_origin)
for origin in (settings.cors_origins or "").split(","):
    origin = origin.strip().rstrip("/")
    if origin and origin not in _origins:
        _origins.append(origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def debug_request_logger(request, call_next):
    # region agent log
    _debug_log(
        run_id="pre-fix",
        hypothesis_id="H8",
        location="backend/app/main.py:debug_request_logger:start",
        message="Backend request received",
        data={"method": request.method, "path": request.url.path},
    )
    # endregion
    response = await call_next(request)
    # region agent log
    _debug_log(
        run_id="pre-fix",
        hypothesis_id="H8",
        location="backend/app/main.py:debug_request_logger:end",
        message="Backend response sent",
        data={"method": request.method, "path": request.url.path, "statusCode": response.status_code},
    )
    # endregion
    return response

# API v1
app.include_router(auth.router, prefix="/api/v1")
app.include_router(activity.router, prefix="/api/v1")
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
