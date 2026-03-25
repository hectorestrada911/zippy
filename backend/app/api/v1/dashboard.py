"""Dashboard: AR summary, overdue list, disputes needing action, ROI."""
import json
from datetime import date, datetime, timedelta, timezone
from decimal import Decimal
from pathlib import Path
from time import time
from fastapi import APIRouter, Depends
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.api.deps import get_current_user
from app.database import get_db
from app.models import Invoice, Dispute, User, Message
from app.schemas.dashboard import (
    DashboardResponse,
    DashboardSummary,
    DisputeNeedingAction,
    OverdueItem,
)

router = APIRouter(prefix="/dashboard", tags=["dashboard"])
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


@router.get("", response_model=DashboardResponse)
async def get_dashboard(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    started_at = int(time() * 1000)
    # region agent log
    _debug_log(
        run_id="pre-fix",
        hypothesis_id="H4-H5-H6",
        location="backend/app/api/v1/dashboard.py:get_dashboard:start",
        message="Dashboard endpoint entered",
        data={"hasUser": bool(user), "orgIdPresent": bool(user.organization_id)},
    )
    # endregion
    org_id = user.organization_id
    today = date.today()

    # Total AR (open invoices)
    ar = await db.execute(
        select(func.coalesce(func.sum(Invoice.amount), 0)).where(
            Invoice.organization_id == org_id,
            Invoice.paid_at.is_(None),
        )
    )
    total_ar = ar.scalar_one() or Decimal(0)

    # Overdue AR
    overdue = await db.execute(
        select(func.coalesce(func.sum(Invoice.amount), 0)).where(
            Invoice.organization_id == org_id,
            Invoice.paid_at.is_(None),
            Invoice.due_date < today,
        )
    )
    overdue_ar = overdue.scalar_one() or Decimal(0)

    # Overdue count
    overdue_count_r = await db.execute(
        select(func.count(Invoice.id)).where(
            Invoice.organization_id == org_id,
            Invoice.paid_at.is_(None),
            Invoice.due_date < today,
        )
    )
    overdue_count = overdue_count_r.scalar_one() or 0

    # Expected in 7 and 30 days (simple: sum of amounts due in window)
    day7 = today + timedelta(days=7)
    day30 = today + timedelta(days=30)
    exp7 = await db.execute(
        select(func.coalesce(func.sum(Invoice.amount), 0)).where(
            Invoice.organization_id == org_id,
            Invoice.paid_at.is_(None),
            Invoice.due_date >= today,
            Invoice.due_date <= day7,
        )
    )
    exp30 = await db.execute(
        select(func.coalesce(func.sum(Invoice.amount), 0)).where(
            Invoice.organization_id == org_id,
            Invoice.paid_at.is_(None),
            Invoice.due_date >= today,
            Invoice.due_date <= day30,
        )
    )
    expected_7_days = exp7.scalar_one() or Decimal(0)
    expected_30_days = exp30.scalar_one() or Decimal(0)

    # Paid this month (invoices with paid_at in current month)
    start_of_month = datetime(today.year, today.month, 1, tzinfo=timezone.utc)
    if today.month == 12:
        start_next_month = datetime(today.year + 1, 1, 1, tzinfo=timezone.utc)
    else:
        start_next_month = datetime(today.year, today.month + 1, 1, tzinfo=timezone.utc)
    paid_month_r = await db.execute(
        select(func.count(Invoice.id)).where(
            Invoice.organization_id == org_id,
            Invoice.paid_at.is_not(None),
            Invoice.paid_at >= start_of_month,
            Invoice.paid_at < start_next_month,
        )
    )
    paid_count_this_month = paid_month_r.scalar_one() or 0

    # Total $ paid after at least one reminder (invoices with paid_at and at least one message)
    subq = select(Message.invoice_id).distinct()
    paid_after_r = await db.execute(
        select(func.coalesce(func.sum(Invoice.amount), 0)).where(
            Invoice.organization_id == org_id,
            Invoice.paid_at.is_not(None),
            Invoice.id.in_(subq),
        )
    )
    paid_after_reminder_total = paid_after_r.scalar_one() or Decimal(0)

    # Overdue invoices with next reminder
    inv_list = await db.execute(
        select(Invoice)
        .options(selectinload(Invoice.customer))
        .where(
            Invoice.organization_id == org_id,
            Invoice.paid_at.is_(None),
            Invoice.due_date < today,
        )
        .order_by(Invoice.due_date)
    )
    invoices = inv_list.scalars().all()
    overdue_items = []
    for inv in invoices:
        overdue_items.append(
            OverdueItem(
                invoice_id=inv.id,
                invoice_number=inv.number,
                customer_name=inv.customer.name if inv.customer else "—",
                amount=inv.amount,
                due_date=inv.due_date,
                next_scheduled_at=inv.next_scheduled_at.isoformat() if inv.next_scheduled_at else None,
                status=inv.status,
            )
        )

    # Disputes needing action (open or waiting)
    disp = await db.execute(
        select(Dispute)
        .where(Dispute.invoice_id.in_(select(Invoice.id).where(Invoice.organization_id == org_id)))
        .where(Dispute.status.in_(["open", "waiting"]))
        .order_by(Dispute.created_at.desc())
    )
    disputes = disp.scalars().all()
    dispute_items = []
    for d in disputes:
        inv = await db.get(Invoice, d.invoice_id)
        dispute_items.append(
            DisputeNeedingAction(
                dispute_id=d.id,
                invoice_id=d.invoice_id,
                invoice_number=inv.number if inv else None,
                reason=d.reason,
                status=d.status,
                created_at=d.created_at.isoformat() if d.created_at else None,
            )
        )

    # region agent log
    _debug_log(
        run_id="pre-fix",
        hypothesis_id="H4-H5-H6",
        location="backend/app/api/v1/dashboard.py:get_dashboard:end",
        message="Dashboard endpoint computed response",
        data={
            "overdueCount": overdue_count,
            "overdueItems": len(overdue_items),
            "disputeItems": len(dispute_items),
            "durationMs": int(time() * 1000) - started_at,
        },
    )
    # endregion
    return DashboardResponse(
        summary=DashboardSummary(
            total_ar=total_ar,
            overdue_ar=overdue_ar,
            expected_7_days=expected_7_days,
            expected_30_days=expected_30_days,
            overdue_count=overdue_count,
            paid_count_this_month=paid_count_this_month,
            paid_after_reminder_total=paid_after_reminder_total,
        ),
        overdue_invoices=overdue_items,
        disputes_needing_action=dispute_items,
    )
