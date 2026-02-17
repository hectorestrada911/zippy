"""Invoice model (synced from accounting + our state)."""
from __future__ import annotations
from typing import Optional
import uuid
from datetime import date, datetime
from decimal import Decimal
from sqlalchemy import Date, DateTime, ForeignKey, Numeric, String, Text, Boolean, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.base import TimestampMixin


def gen_uuid():
    return str(uuid.uuid4())


class Invoice(Base, TimestampMixin):
    __tablename__ = "invoices"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    organization_id: Mapped[str] = mapped_column(
        String(32), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False
    )
    customer_id: Mapped[str] = mapped_column(
        String(32), ForeignKey("customers.id", ondelete="CASCADE"), nullable=False
    )
    external_id: Mapped[str] = mapped_column(String(128), nullable=False, index=True)  # QBO Invoice.Id
    number: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)  # display number

    amount: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False)
    due_date: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False)  # open, paid, overdue, etc.
    currency: Mapped[str] = mapped_column(String(3), default="USD")

    # Our state
    pay_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)  # QBO hosted or Stripe
    dispute_open: Mapped[bool] = mapped_column(Boolean, default=False)
    next_scheduled_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    last_dunning_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    paid_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Token for secure pay/dispute links (rotate on use or expiry)
    link_token: Mapped[Optional[str]] = mapped_column(String(64), nullable=True, index=True)
    link_token_expires_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    organization: Mapped["Organization"] = relationship("Organization", back_populates="invoices")
    customer: Mapped["Customer"] = relationship("Customer", back_populates="invoices")
    messages: Mapped[list["Message"]] = relationship("Message", back_populates="invoice")
    disputes: Mapped[list["Dispute"]] = relationship("Dispute", back_populates="invoice")
