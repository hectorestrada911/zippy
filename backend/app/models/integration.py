"""Integration credentials (QBO, Stripe) per organization."""
from __future__ import annotations
from typing import Optional
import uuid
from datetime import datetime
from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.base import TimestampMixin


def gen_uuid():
    return str(uuid.uuid4())


class IntegrationCredential(Base, TimestampMixin):
    __tablename__ = "integration_credentials"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    organization_id: Mapped[str] = mapped_column(
        String(32), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False
    )
    provider: Mapped[str] = mapped_column(String(32), nullable=False)  # quickbooks, stripe
    # Encrypted or opaque tokens in production
    access_token: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    refresh_token: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    expires_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    external_account_id: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)  # Stripe account
    metadata_: Mapped[Optional[dict]] = mapped_column("metadata", JSONB, nullable=True)

    organization: Mapped["Organization"] = relationship(
        "Organization", back_populates="integration_credentials"
    )
