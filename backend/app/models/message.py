"""Outbound message (email/SMS) for dunning."""
from __future__ import annotations
from typing import Optional
import uuid
from datetime import datetime
from sqlalchemy import DateTime, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.base import TimestampMixin


def gen_uuid():
    return str(uuid.uuid4())


class Message(Base, TimestampMixin):
    __tablename__ = "messages"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    invoice_id: Mapped[str] = mapped_column(
        String(32), ForeignKey("invoices.id", ondelete="CASCADE"), nullable=False
    )
    channel: Mapped[str] = mapped_column(String(16), nullable=False)  # email, sms
    template_used: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    sent_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    status: Mapped[str] = mapped_column(String(32), default="sent")  # sent, failed, bounced
    provider_message_id: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    # Idempotency: same (invoice_id, channel, scheduled_key) = skip duplicate
    idempotency_key: Mapped[Optional[str]] = mapped_column(String(128), nullable=True, index=True)

    invoice: Mapped["Invoice"] = relationship("Invoice", back_populates="messages")
