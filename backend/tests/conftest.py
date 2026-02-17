import asyncio
from datetime import date, datetime, timedelta, timezone
from decimal import Decimal
import pytest
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app
from app.models import Organization, User, Customer, Invoice, DunningRule
from app.services.dunning import (
    compute_reminder_dates,
    get_next_reminder_datetime,
    get_idempotency_key,
    get_default_offset_days,
)


# In-memory SQLite for fast tests (optional: use real Postgres for integration)
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture
async def engine():
    eng = create_async_engine(
        TEST_DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    async with eng.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield eng
    await eng.dispose()


@pytest.fixture
async def session(engine):
    async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with async_session() as s:
        yield s


@pytest.fixture
async def org_and_user(session):
    org = Organization(name="Test Org")
    session.add(org)
    await session.flush()
    user = User(organization_id=org.id, email="test@example.com")
    session.add(user)
    await session.flush()
    await session.commit()
    return org, user
