"""Public endpoints: pay and dispute by token (no login)."""
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models import Invoice, Dispute, DisputeEvent
from app.models.dispute import DISPUTE_REASONS, DISPUTE_STATUS_OPEN
from app.schemas.disputes import DisputeCreate
from app.services.audit import log as audit_log

router = APIRouter(prefix="/public", tags=["public"])


async def _get_invoice_by_token(db: AsyncSession, token: str):
    """Validate token and return invoice or None. Token is stored link_token on invoice."""
    r = await db.execute(
        select(Invoice)
        .options(selectinload(Invoice.customer))
        .where(Invoice.link_token == token)
        .where(Invoice.paid_at.is_(None))
    )
    inv = r.scalar_one_or_none()
    if not inv:
        return None
    if inv.link_token_expires_at and inv.link_token_expires_at < datetime.now(timezone.utc):
        return None
    return inv


# We need to make this async in the dependency - so we'll do token validation in the route
@router.get("/invoice-by-token")
async def get_invoice_by_token(
    token: str,
  db: AsyncSession = Depends(get_db),
):
    """Return invoice summary for pay/dispute page (customer-facing, no auth)."""
    inv = await _get_invoice_by_token(db, token)
    if not inv:
        raise HTTPException(status_code=404, detail="Invalid or expired link")
    return {
        "invoice_id": inv.id,
        "number": inv.number or inv.external_id,
        "amount": float(inv.amount),
        "due_date": inv.due_date.isoformat(),
        "currency": inv.currency,
        "customer_name": inv.customer.name if inv.customer else None,
        "pay_url": inv.pay_url,
        "has_open_dispute": inv.dispute_open,
    }


@router.post("/dispute")
async def open_dispute(
  token: str,
  body: DisputeCreate,
  db: AsyncSession = Depends(get_db),
):
    """Customer opens dispute via token link. Pauses dunning for this invoice."""
    inv = await _get_invoice_by_token(db, token)
    if not inv:
        raise HTTPException(status_code=404, detail="Invalid or expired link")
    if body.reason not in DISPUTE_REASONS:
        raise HTTPException(status_code=400, detail="Invalid reason")
    dispute = Dispute(
        invoice_id=inv.id,
        reason=body.reason,
        description=body.description,
        status=DISPUTE_STATUS_OPEN,
    )
    db.add(dispute)
    await db.flush()
    inv.dispute_open = True
    inv.next_scheduled_at = None  # Pause dunning
    ev = DisputeEvent(dispute_id=dispute.id, kind="opened", payload={"reason": body.reason})
    db.add(ev)
    await audit_log(db, inv.organization_id, "dispute_opened", actor_type="customer", entity_type="dispute", entity_id=dispute.id, payload={"reason": body.reason})
    return {"dispute_id": dispute.id, "message": "Dispute submitted. We will follow up shortly."}
</think>
Fixing the public router: making the helper async and correcting the signature.
<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
StrReplace