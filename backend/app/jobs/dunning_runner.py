"""
Dunning job: find invoices due for a reminder, send email (and optionally SMS), record message, update next_scheduled_at.
Idempotent: uses idempotency_key so retries don't duplicate sends.
"""
from datetime import datetime, timedelta, timezone
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.config import settings
from app.core.security import generate_link_token_legacy
from app.database import AsyncSessionLocal
from app.integrations.email_sender import send_email, email_configured
from app.models.invoice import Invoice
from app.models.message import Message
from app.services.audit import log as audit_log
from app.services.dunning import (
    already_sent,
    compute_next_scheduled_at,
    get_idempotency_key,
    get_organization_dunning_offsets,
)


async def _render_template(body: str, ctx: dict) -> str:
    for k, v in ctx.items():
        body = body.replace("{{" + k + "}}", str(v))
    return body


async def run_dunning_job() -> None:
    """Run once: process all invoices that have next_scheduled_at <= now and are not paid/disputed."""
    async with AsyncSessionLocal() as session:
        now = datetime.now(timezone.utc)
        # Invoices with next_scheduled_at in the past, not paid, not in dispute
        r = await session.execute(
            select(Invoice)
            .options(selectinload(Invoice.customer), selectinload(Invoice.organization))
            .where(Invoice.next_scheduled_at <= now)
            .where(Invoice.paid_at.is_(None))
            .where(Invoice.dispute_open == False)  # noqa: E712
        )
        invoices = r.scalars().all()
        for invoice in invoices:
            await _process_invoice_reminder(session, invoice)
        await session.commit()


async def _process_invoice_reminder(session: AsyncSession, invoice: Invoice) -> None:
    """Send reminder(s) for one invoice and set next_scheduled_at."""
    # Escalation: if org has escalation_days and invoice is that many days overdue, mark escalated
    if invoice.organization and invoice.organization.escalation_days is not None and invoice.escalated_at is None:
        from datetime import date
        today = date.today()
        days_overdue = (today - invoice.due_date).days
        if days_overdue >= invoice.organization.escalation_days:
            invoice.escalated_at = datetime.now(timezone.utc)
            await audit_log(
                session,
                invoice.organization_id,
                "invoice_escalated",
                entity_type="invoice",
                entity_id=invoice.id,
                payload={"days_overdue": days_overdue, "escalation_days": invoice.organization.escalation_days},
            )

    offsets = await get_organization_dunning_offsets(session, invoice.organization_id)
    due_date = invoice.due_date
    # Which offset are we at? next_scheduled_at is start of a day; find matching offset
    scheduled_date = invoice.next_scheduled_at.date() if invoice.next_scheduled_at else None
    sent_any = False
    # Ensure invoice has valid link token for pay/dispute links
    if not invoice.link_token or (invoice.link_token_expires_at and invoice.link_token_expires_at <= datetime.now(timezone.utc)):
        invoice.link_token = generate_link_token_legacy()
        invoice.link_token_expires_at = datetime.now(timezone.utc) + timedelta(hours=settings.tokenized_link_expire_hours)
    pay_link = f"{settings.frontend_url}/pay?token={invoice.link_token}"
    dispute_link = f"{settings.frontend_url}/dispute?token={invoice.link_token}"

    for offset_days in offsets:
        reminder_date = due_date + timedelta(days=offset_days)
        if scheduled_date and reminder_date != scheduled_date:
            continue
        # Send email
        if email_configured():
            key = get_idempotency_key(invoice.id, offset_days, "email")
            if not await already_sent(session, key):
                body = f"Invoice {invoice.number or invoice.external_id}: ${invoice.amount} due {invoice.due_date}. Pay: {pay_link} | Report issue: {dispute_link}"
                subject = f"Reminder: Invoice {invoice.number or invoice.external_id} - ${invoice.amount}"
                # TODO: load org reply_to and template from DB
                to = invoice.customer.email if invoice.customer else None
                if to:
                    msg_id = await send_email(to, subject, body)
                    if msg_id:
                        msg = Message(
                            invoice_id=invoice.id,
                            channel="email",
                            template_used="reminder",
                            status="sent",
                            provider_message_id=msg_id,
                            idempotency_key=key,
                        )
                        session.add(msg)
                        sent_any = True
                        await audit_log(
                            session,
                            invoice.organization_id,
                            "reminder_sent",
                            entity_type="invoice",
                            entity_id=invoice.id,
                            payload={"channel": "email", "offset_days": offset_days},
                        )
        break  # Only one reminder per run (the one for scheduled_date)
    # Update last_dunning_at and next_scheduled_at
    invoice.last_dunning_at = datetime.now(timezone.utc)
    invoice.next_scheduled_at = await compute_next_scheduled_at(session, invoice, offsets)
    await session.flush()
