"""Invoices list and detail."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.api.deps import get_current_user, require_org
from app.database import get_db
from app.models import Invoice, User
from app.schemas.invoices import InvoiceDetail, InvoiceList, MessageOut

router = APIRouter(prefix="/invoices", tags=["invoices"])


@router.get("", response_model=list[InvoiceList])
async def list_invoices(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    r = await db.execute(
        select(Invoice)
        .where(Invoice.organization_id == user.organization_id)
        .order_by(Invoice.due_date.desc())
    )
    invoices = r.scalars().all()
    return [InvoiceList(
        id=inv.id,
        external_id=inv.external_id,
        number=inv.number,
        amount=inv.amount,
        due_date=inv.due_date,
        status=inv.status,
        dispute_open=inv.dispute_open,
        next_scheduled_at=inv.next_scheduled_at,
        paid_at=inv.paid_at,
        escalated_at=inv.escalated_at,
        customer_id=inv.customer_id,
    ) for inv in invoices]


@router.get("/{invoice_id}", response_model=InvoiceDetail)
async def get_invoice(
    invoice_id: str,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    r = await db.execute(
        select(Invoice)
        .options(
            selectinload(Invoice.customer),
            selectinload(Invoice.messages),
            selectinload(Invoice.disputes),
        )
        .where(Invoice.id == invoice_id)
    )
    inv = r.scalar_one_or_none()
    if not inv:
        raise HTTPException(status_code=404, detail="Invoice not found")
    require_org(inv.organization_id, user)
    messages = [MessageOut(id=m.id, channel=m.channel, template_used=m.template_used, sent_at=m.sent_at, status=m.status) for m in inv.messages]
    disputes = [{"id": d.id, "reason": d.reason, "status": d.status, "created_at": d.created_at.isoformat() if d.created_at else None} for d in inv.disputes]
    return InvoiceDetail(
        id=inv.id,
        external_id=inv.external_id,
        number=inv.number,
        amount=inv.amount,
        due_date=inv.due_date,
        status=inv.status,
        dispute_open=inv.dispute_open,
        next_scheduled_at=inv.next_scheduled_at,
        paid_at=inv.paid_at,
        escalated_at=inv.escalated_at,
        customer_id=inv.customer_id,
        pay_url=inv.pay_url,
        link_token=None,  # Don't expose token in API
        messages=messages,
        disputes=disputes,
        customer_name=inv.customer.name if inv.customer else None,
        customer_email=inv.customer.email if inv.customer else None,
    )
