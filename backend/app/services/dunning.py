"""
Dunning domain logic: compute next reminder date, idempotency, pause on dispute/paid.
"""
from __future__ import annotations

from datetime import date, datetime, timedelta, timezone
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.invoice import Invoice
from app.models.message import Message
from app.models.dunning import DunningRule


def get_default_offset_days() -> list[int]:
    return [-7, -1, 0, 3, 10, 20]


def compute_reminder_dates(due_date: date, offset_days: list[int]) -> list[date]:
    """Return sorted list of reminder dates (may include past dates)."""
    return sorted({due_date + timedelta(days=d) for d in offset_days})


def get_next_reminder_datetime(
    due_date: date,
    offset_days: list[int],
    after: datetime | None = None,
) -> datetime | None:
    """
    Next reminder moment (start of day UTC) that is >= after.
    If after is None, use now.
    """
    now = after or datetime.now(timezone.utc)
    today = now.date()
    for d in sorted(offset_days):
        reminder_date = due_date + timedelta(days=d)
        if reminder_date >= today:
            # Return start of that day UTC
            return datetime(reminder_date.year, reminder_date.month, reminder_date.day, tzinfo=timezone.utc)
    return None


def get_idempotency_key(invoice_id: str, offset_days: int, channel: str) -> str:
    """One message per (invoice, offset_days, channel)."""
    return f"{invoice_id}:{offset_days}:{channel}"


async def already_sent(session: AsyncSession, idempotency_key: str) -> bool:
    r = await session.execute(select(Message.id).where(Message.idempotency_key == idempotency_key).limit(1))
    return r.scalar_one_or_none() is not None


async def get_organization_dunning_offsets(session: AsyncSession, organization_id: str) -> list[int]:
    """Ordered list of offset_days for an org (from DunningRule or default)."""
    r = await session.execute(
        select(DunningRule.offset_days)
        .where(DunningRule.organization_id == organization_id)
        .order_by(DunningRule.offset_days, DunningRule.sort_order)
    )
    rows = r.scalars().all()
    if rows:
        return list(rows)
    return get_default_offset_days()


async def compute_next_scheduled_at(
    session: AsyncSession,
    invoice: Invoice,
    offset_days: list[int] | None = None,
) -> datetime | None:
    """
    Compute next_scheduled_at for an invoice.
    Returns None if no more reminders (all past or invoice paid/disputed).
    """
    if invoice.paid_at or invoice.dispute_open:
        return None
    if offset_days is None:
        offset_days = await get_organization_dunning_offsets(session, invoice.organization_id)
    after = invoice.last_dunning_at
    return get_next_reminder_datetime(invoice.due_date, offset_days, after=after)
