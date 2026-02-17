"""Dispute and dispute timeline events."""
from __future__ import annotations
from typing import Optional
import uuid
from datetime import datetime
from sqlalchemy import DateTime, ForeignKey, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.base import TimestampMixin


def gen_uuid():
    return str(uuid.uuid4())


# Dispute reasons (customer-facing)
DISPUTE_REASONS = [
    "missing_po",
    "incorrect_amount",
    "need_w9",
    "scope_timesheet",
    "other",
]

# Internal workflow status
DISPUTE_STATUS_OPEN = "open"
DISPUTE_STATUS_WAITING = "waiting"  # waiting on customer
DISPUTE_STATUS_RESOLVED = "resolved"


class Dispute(Base, TimestampMixin):
    __tablename__ = "disputes"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    invoice_id: Mapped[str] = mapped_column(
        String(32), ForeignKey("invoices.id", ondelete="CASCADE"), nullable=False
    )
    reason: Mapped[str] = mapped_column(String(64), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(32), default=DISPUTE_STATUS_OPEN)
    assigned_to_id: Mapped[Optional[str]] = mapped_column(
        String(32), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    resolved_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    invoice: Mapped["Invoice"] = relationship("Invoice", back_populates="disputes")
    file_uploads: Mapped[list["FileUpload"]] = relationship(
        "FileUpload", back_populates="dispute", cascade="all, delete-orphan"
    )
    events: Mapped[list["DisputeEvent"]] = relationship(
        "DisputeEvent", back_populates="dispute", order_by="DisputeEvent.created_at"
    )


class DisputeEvent(Base, TimestampMixin):
    __tablename__ = "dispute_events"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    dispute_id: Mapped[str] = mapped_column(
        String(32), ForeignKey("disputes.id", ondelete="CASCADE"), nullable=False
    )
    kind: Mapped[str] = mapped_column(String(32), nullable=False)  # opened, comment, status_change, resolved
    payload: Mapped[Optional[dict]] = mapped_column(JSONB, nullable=True)

    dispute: Mapped["Dispute"] = relationship("Dispute", back_populates="events")
