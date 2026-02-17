"""Stripe webhooks: mark invoice paid, stop dunning."""
from fastapi import APIRouter, Request, HTTPException, Header
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import AsyncSessionLocal
from app.integrations.stripe_client import verify_webhook_signature
from app.models import Invoice
from app.services.audit import log as audit_log
from datetime import datetime, timezone

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


@router.post("/stripe")
async def stripe_webhook(
    request: Request,
    stripe_signature: str | None = Header(None, alias="Stripe-Signature"),
):
    """Handle Stripe checkout.session.completed and payment_intent.succeeded."""
    payload = await request.body()
    event = verify_webhook_signature(payload, stripe_signature or "")
    if not event:
        raise HTTPException(status_code=400, detail="Invalid signature")
    if event["type"] == "checkout.session.completed":
        session = event.get("data", {}).get("object", {})
        metadata = session.get("metadata") or {}
        invoice_id = metadata.get("invoice_id")
        if not invoice_id:
            return {"received": True}
        async with AsyncSessionLocal() as db:
            r = await db.execute(select(Invoice).where(Invoice.id == invoice_id))
            inv = r.scalar_one_or_none()
            if inv:
                inv.paid_at = datetime.now(timezone.utc)
                inv.next_scheduled_at = None
                inv.status = "paid"
                await audit_log(db, inv.organization_id, "payment_received", entity_type="invoice", entity_id=inv.id, payload={"source": "stripe"})
            await db.commit()
    return {"received": True}
