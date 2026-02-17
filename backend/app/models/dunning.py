"""Dunning rules and message templates."""
from __future__ import annotations
from typing import Optional
import uuid
from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.base import TimestampMixin


def gen_uuid():
    return str(uuid.uuid4())


# Default schedule: -7, -1, 0, +3, +10, +20 days relative to due date
DEFAULT_OFFSET_DAYS = [-7, -1, 0, 3, 10, 20]


class DunningRule(Base, TimestampMixin):
    __tablename__ = "dunning_rules"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    organization_id: Mapped[str] = mapped_column(
        String(32), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False
    )
    # Offset in days from due_date (negative = before, positive = after)
    offset_days: Mapped[int] = mapped_column(Integer, nullable=False)
    # Order of execution when multiple rules match same day
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    send_email: Mapped[bool] = mapped_column(default=True)
    send_sms: Mapped[bool] = mapped_column(default=False)

    organization: Mapped["Organization"] = relationship(
        "Organization", back_populates="dunning_rules"
    )


class MessageTemplate(Base, TimestampMixin):
    __tablename__ = "message_templates"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    organization_id: Mapped[str] = mapped_column(
        String(32), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False
    )
    name: Mapped[str] = mapped_column(String(64), nullable=False)  # e.g. reminder_7d_before
    channel: Mapped[str] = mapped_column(String(16), nullable=False)  # email, sms
    subject: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)  # email only
    body: Mapped[str] = mapped_column(Text, nullable=False)
    # Variables: {{invoice_number}}, {{amount}}, {{due_date}}, {{pay_link}}, {{dispute_link}}

    organization: Mapped["Organization"] = relationship(
        "Organization", back_populates="message_templates"
    )
