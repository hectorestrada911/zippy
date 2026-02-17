"""Email sending via Resend (or no-op if not configured)."""
from __future__ import annotations
import resend
from app.config import settings


def email_configured() -> bool:
    return bool(settings.resend_api_key)


async def send_email(to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    """Send email. Returns provider message id or None."""
    if not email_configured():
        return None
    resend.api_key = settings.resend_api_key
    params = {
        "from": settings.email_from,
        "to": [to],
        "subject": subject,
        "html": html,
    }
    if reply_to:
        params["reply_to"] = reply_to
    r = resend.Emails.send(params)
    return getattr(r, "id", None)
