"""Stripe Checkout and webhook helpers. Payments are optional."""
from __future__ import annotations
import stripe
from app.config import settings


def stripe_configured() -> bool:
    return bool(settings.stripe_secret_key)


def create_checkout_session(
    invoice_id: str,
    amount_cents: int,
    currency: str,
    success_url: str,
    cancel_url: str,
    customer_email: str | None = None,
    metadata: dict | None = None,
) -> dict:
    """Create Stripe Checkout session for an invoice. Returns session URL and id."""
    if not stripe_configured():
        return {}
    stripe.api_key = settings.stripe_secret_key
    session = stripe.checkout.Session.create(
        mode="payment",
        payment_method_types=["card"],
        line_items=[
            {
                "price_data": {
                    "currency": currency.lower(),
                    "unit_amount": amount_cents,
                    "product_data": {"name": f"Invoice #{invoice_id}", "description": "Invoice payment"},
                },
                "quantity": 1,
            }
        ],
        success_url=success_url,
        cancel_url=cancel_url,
        customer_email=customer_email,
        metadata=metadata or {"invoice_id": invoice_id},
    )
    return {"url": session.url, "session_id": session.id}


def verify_webhook_signature(payload: bytes, sig_header: str) -> dict | None:
    """Verify Stripe webhook and return event dict or None."""
    if not settings.stripe_webhook_secret:
        return None
    try:
        return stripe.Webhook.construct_event(
            payload, sig_header, settings.stripe_webhook_secret
        )
    except Exception:
        return None
