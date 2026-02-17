"""Dashboard: AR summary, overdue list, disputes needing action."""
from datetime import date, datetime, timedelta, timezone
from decimal import Decimal
from fastapi import APIRouter, Depends
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.api.deps import get_current_user
from app.database import get_db
from app.models import Invoice, Dispute, User
from app.schemas.dashboard import (
    DashboardResponse,
    DashboardSummary,
    DisputeNeedingAction,
    OverdueItem,
)

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("", response_model=DashboardResponse)
async def get_dashboard(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
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

    return DashboardResponse(
        summary=DashboardSummary(
            total_ar=total_ar,
            overdue_ar=overdue_ar,
            expected_7_days=expected_7_days,
            expected_30_days=expected_30_days,
            overdue_count=overdue_count,
        ),
        overdue_invoices=overdue_items,
        disputes_needing_action=dispute_items,
    )
