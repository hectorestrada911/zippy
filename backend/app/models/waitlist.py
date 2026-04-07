"""Waitlist signup model."""
from __future__ import annotations

import uuid
from typing import Optional
from sqlalchemy import String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import TimestampMixin


def gen_uuid() -> str:
    return str(uuid.uuid4())


class WaitlistEntry(Base, TimestampMixin):
    __tablename__ = "waitlist_entries"
    __table_args__ = (UniqueConstraint("email", name="uq_waitlist_entries_email"),)

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    source: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

