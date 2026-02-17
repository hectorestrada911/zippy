"""Accounting sync: trigger sync, last sync time."""
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.database import get_db
from app.models import IntegrationCredential, Invoice, Customer, Organization
from app.integrations.base import SyncCustomer, SyncInvoice
from app.integrations.mock_accounting import MockAccountingProvider
from app.integrations.quickbooks import QuickBooksAccountingProvider
from app.services.audit import log as audit_log

router = APIRouter(prefix="/sync", tags=["sync"])


def _get_provider(provider_name: str):
    if provider_name == "quickbooks":
        return QuickBooksAccountingProvider()
    return MockAccountingProvider()


@router.get("/status")
async def sync_status(
  db: AsyncSession = Depends(get_db),
  user = Depends(get_current_user),
):
    """Return last sync time and connected providers."""
    r = await db.execute(
        select(IntegrationCredential)
        .where(IntegrationCredential.organization_id == user.organization_id)
    )
    creds = r.scalars().all()
    quickbooks = next((c for c in creds if c.provider == "quickbooks"), None)
    return {
        "last_sync_at": None,  # Could add Organization.last_sync_at if we store it
        "quickbooks_connected": quickbooks is not None,
        "stripe_connected": any(c.provider == "stripe" for c in creds),
    }


@router.post("/run")
async def run_sync(
  db: AsyncSession = Depends(get_db),
  user = Depends(get_current_user),
):
    """Run accounting sync now. Uses mock if QBO not connected."""
    org_id = user.organization_id
    r = await db.execute(
        select(IntegrationCredential).where(
            IntegrationCredential.organization_id == org_id,
            IntegrationCredential.provider == "quickbooks",
        )
    )
    cred_row = r.scalar_one_or_none()
    if cred_row:
        provider = QuickBooksAccountingProvider()
        cred = {
            "access_token": cred_row.access_token,
            "refresh_token": cred_row.refresh_token,
            "realm_id": cred_row.metadata_.get("realm_id") if cred_row.metadata_ else None,
        }
        try:
            cred = await provider.refresh_credential(cred) or cred
        except Exception:
            pass
        if cred_row.metadata_:
            cred["realm_id"] = cred_row.metadata_.get("realm_id")
        customers = await provider.get_customers(cred)
        invoices = await provider.get_invoices(cred)
    else:
        provider = MockAccountingProvider()
        cred = {}
        customers = await provider.get_customers(cred)
        invoices = await provider.get_invoices(cred)

    # Upsert customers
    ext_to_customer = {}
    for c in customers:
        r = await db.execute(
            select(Customer).where(
                Customer.organization_id == org_id,
                Customer.external_id == c.external_id,
            )
        )
        existing = r.scalar_one_or_none()
        if existing:
            existing.name = c.name
            existing.email = c.email
            existing.phone = c.phone
            existing.raw = c.raw
            ext_to_customer[c.external_id] = existing
        else:
            new_c = Customer(
                organization_id=org_id,
                external_id=c.external_id,
                name=c.name,
                email=c.email,
                phone=c.phone,
                raw=c.raw,
            )
            db.add(new_c)
            await db.flush()
            ext_to_customer[c.external_id] = new_c

    # Upsert invoices (only open/unpaid from provider)
    for inv in invoices:
        cust = ext_to_customer.get(inv.customer_external_id)
        if not cust:
            continue
        r = await db.execute(
            select(Invoice).where(
                Invoice.organization_id == org_id,
                Invoice.external_id == inv.external_id,
            )
        )
        existing = r.scalar_one_or_none()
        from app.services.dunning import get_organization_dunning_offsets, compute_next_scheduled_at
        if existing:
            existing.customer_id = cust.id
            existing.number = inv.number
            existing.amount = inv.amount
            existing.due_date = inv.due_date
            existing.status = inv.status
            existing.pay_url = inv.pay_url
            if existing.paid_at is None and not existing.dispute_open:
                existing.next_scheduled_at = await compute_next_scheduled_at(db, existing, await get_organization_dunning_offsets(db, org_id))
        else:
            next_at = None
            if inv.status.lower() in ("open", "overdue") and inv.pay_url != "paid":
                next_at = await _next_scheduled_for_new_invoice(db, org_id, inv.due_date)
            new_inv = Invoice(
                organization_id=org_id,
                customer_id=cust.id,
                external_id=inv.external_id,
                number=inv.number,
                amount=inv.amount,
                due_date=inv.due_date,
                status=inv.status,
                currency=inv.currency,
                pay_url=inv.pay_url,
                next_scheduled_at=next_at,
            )
            db.add(new_inv)
    await audit_log(db, org_id, "sync_completed", actor_type="user", actor_id=user.id, payload={"customers": len(customers), "invoices": len(invoices)})
    await db.commit()
    return {"status": "ok", "customers": len(customers), "invoices": len(invoices)}


async def _next_scheduled_for_new_invoice(db: AsyncSession, org_id: str, due_date):
    from app.services.dunning import get_organization_dunning_offsets, get_next_reminder_datetime
    offsets = await get_organization_dunning_offsets(db, org_id)
    return get_next_reminder_datetime(due_date, offsets)
