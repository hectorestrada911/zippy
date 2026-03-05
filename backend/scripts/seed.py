"""Seed database with one org, one user, and mock data for local dev."""
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from datetime import date, datetime, timedelta, timezone
from decimal import Decimal
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import AsyncSessionLocal, engine
from app.models import (
    Base,
    Organization,
    User,
    Customer,
    Invoice,
    Message,
    DunningRule,
    IntegrationCredential,
)
from app.models.dunning import DEFAULT_OFFSET_DAYS
from app.core.security import generate_link_token_legacy


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        r = await session.execute(select(Organization).limit(1))
        if r.scalar_one_or_none():
            print("Already seeded.")
            return

        org = Organization(
            name="Demo Company",
            reply_to_email="billing@demo.example",
        )
        session.add(org)
        await session.flush()

        user = User(organization_id=org.id, email="demo@example.com")
        session.add(user)
        await session.flush()

        cust1 = Customer(
            organization_id=org.id,
            external_id="cust-mock-1",
            name="Acme Corp",
            email="ap@acme.example",
        )
        cust2 = Customer(
            organization_id=org.id,
            external_id="cust-mock-2",
            name="Beta LLC",
            email="billing@beta.example",
        )
        session.add_all([cust1, cust2])
        await session.flush()

        today = date.today()
        token1 = generate_link_token_legacy()
        token2 = generate_link_token_legacy()
        token3 = generate_link_token_legacy()
        exp = datetime.now(timezone.utc) + timedelta(days=30)
        inv1 = Invoice(
            organization_id=org.id,
            customer_id=cust1.id,
            external_id="inv-mock-1",
            number="INV-001",
            amount=Decimal("1500.00"),
            due_date=today - timedelta(days=5),
            status="overdue",
            next_scheduled_at=datetime(today.year, today.month, today.day, tzinfo=timezone.utc),
            link_token=token1,
            link_token_expires_at=exp,
        )
        inv2 = Invoice(
            organization_id=org.id,
            customer_id=cust1.id,
            external_id="inv-mock-2",
            number="INV-002",
            amount=Decimal("3200.50"),
            due_date=today + timedelta(days=7),
            status="open",
            next_scheduled_at=datetime((today + timedelta(days=7)).year, (today + timedelta(days=7)).month, (today + timedelta(days=7)).day, tzinfo=timezone.utc),
            link_token=token2,
            link_token_expires_at=exp,
        )
        inv3 = Invoice(
            organization_id=org.id,
            customer_id=cust2.id,
            external_id="inv-mock-3",
            number="INV-003",
            amount=Decimal("800.00"),
            due_date=today - timedelta(days=10),
            status="paid",
            paid_at=datetime.now(timezone.utc),
            link_token=token3,
            link_token_expires_at=exp,
        )
        session.add_all([inv1, inv2, inv3])
        await session.flush()
        session.add(
            Message(
                invoice_id=inv3.id,
                channel="email",
                template_used="reminder",
                status="sent",
                idempotency_key=f"{inv3.id}:0:email",
            )
        )

        for i, offset in enumerate(DEFAULT_OFFSET_DAYS):
            session.add(
                DunningRule(
                    organization_id=org.id,
                    offset_days=offset,
                    sort_order=i,
                    send_email=True,
                    send_sms=False,
                )
            )

        await session.commit()
        print("Seeded: org, user demo@example.com, 2 customers, 3 invoices (1 paid w/ reminder), dunning rules.")


if __name__ == "__main__":
    asyncio.run(seed())
