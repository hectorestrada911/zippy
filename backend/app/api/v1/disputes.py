"""Disputes list and detail, update status."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.api.deps import get_current_user, require_org
from app.database import get_db
from app.models import Dispute, DisputeEvent, Invoice, User
from app.models.dispute import DISPUTE_REASONS, DISPUTE_STATUS_RESOLVED
from app.schemas.disputes import DisputeOut, DisputeUpdate
from app.services.audit import log as audit_log

router = APIRouter(prefix="/disputes", tags=["disputes"])


@router.get("", response_model=list[DisputeOut])
async def list_disputes(
    status_filter: str | None = None,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    q = (
        select(Dispute)
        .join(Invoice, Dispute.invoice_id == Invoice.id)
        .where(Invoice.organization_id == user.organization_id)
        .order_by(Dispute.created_at.desc())
    )
    if status_filter:
        q = q.where(Dispute.status == status_filter)
    r = await db.execute(q)
    disputes = r.scalars().all()
    return [DisputeOut(
        id=d.id,
        invoice_id=d.invoice_id,
        reason=d.reason,
        description=d.description,
        status=d.status,
        assigned_to_id=d.assigned_to_id,
        resolved_at=d.resolved_at,
        created_at=d.created_at,
        events=None,
    ) for d in disputes]


@router.get("/{dispute_id}", response_model=DisputeOut)
async def get_dispute(
    dispute_id: str,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    r = await db.execute(
        select(Dispute)
        .options(selectinload(Dispute.events), selectinload(Dispute.invoice))
        .where(Dispute.id == dispute_id)
    )
    d = r.scalar_one_or_none()
    if not d:
        raise HTTPException(status_code=404, detail="Dispute not found")
    require_org(d.invoice.organization_id, user)
    events = [{"id": e.id, "kind": e.kind, "payload": e.payload, "created_at": e.created_at.isoformat() if e.created_at else None} for e in d.events]
    return DisputeOut(
        id=d.id,
        invoice_id=d.invoice_id,
        reason=d.reason,
        description=d.description,
        status=d.status,
        assigned_to_id=d.assigned_to_id,
        resolved_at=d.resolved_at,
        created_at=d.created_at,
        events=events,
    )


@router.patch("/{dispute_id}", response_model=DisputeOut)
async def update_dispute(
  dispute_id: str,
  body: DisputeUpdate,
  db: AsyncSession = Depends(get_db),
  user: User = Depends(get_current_user),
):
    r = await db.execute(select(Dispute).options(selectinload(Dispute.invoice)).where(Dispute.id == dispute_id))
    d = r.scalar_one_or_none()
    if not d:
        raise HTTPException(status_code=404, detail="Dispute not found")
    require_org(d.invoice.organization_id, user)
    if body.status is not None:
        d.status = body.status
        if body.status == DISPUTE_STATUS_RESOLVED:
            from datetime import datetime, timezone
            d.resolved_at = datetime.now(timezone.utc)
            d.invoice.dispute_open = False
            # Resume dunning: set next_scheduled_at (done in scheduler when it runs)
            from app.services.dunning import compute_next_scheduled_at, get_organization_dunning_offsets
            d.invoice.next_scheduled_at = await compute_next_scheduled_at(db, d.invoice, await get_organization_dunning_offsets(db, d.invoice.organization_id))
        ev = DisputeEvent(dispute_id=d.id, kind="status_change", payload={"status": body.status})
        db.add(ev)
    if body.assigned_to_id is not None:
        d.assigned_to_id = body.assigned_to_id
    await audit_log(db, d.invoice.organization_id, "dispute_updated", actor_type="user", actor_id=user.id, entity_type="dispute", entity_id=d.id, payload=body.model_dump())
    await db.flush()
    return DisputeOut(
        id=d.id,
        invoice_id=d.invoice_id,
        reason=d.reason,
        description=d.description,
        status=d.status,
        assigned_to_id=d.assigned_to_id,
        resolved_at=d.resolved_at,
        created_at=d.created_at,
        events=None,
    )
