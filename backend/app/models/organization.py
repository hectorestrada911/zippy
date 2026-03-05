"""Organization and User models."""
from __future__ import annotations
from datetime import datetime
from typing import Optional
import uuid
from sqlalchemy import Boolean, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.base import TimestampMixin


def gen_uuid():
    return str(uuid.uuid4())


class Organization(Base, TimestampMixin):
    __tablename__ = "organizations"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    logo_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    signature_text: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    reply_to_email: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    # Escalation: when invoice is this many days past due, mark escalated (e.g. 30)
    escalation_days: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    users: Mapped[list["User"]] = relationship("User", back_populates="organization")
    customers: Mapped[list["Customer"]] = relationship("Customer", back_populates="organization")
    invoices: Mapped[list["Invoice"]] = relationship("Invoice", back_populates="organization")
    integration_credentials: Mapped[list["IntegrationCredential"]] = relationship(
        "IntegrationCredential", back_populates="organization"
    )
    dunning_rules: Mapped[list["DunningRule"]] = relationship(
        "DunningRule", back_populates="organization"
    )
    message_templates: Mapped[list["MessageTemplate"]] = relationship(
        "MessageTemplate", back_populates="organization"
    )


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    organization_id: Mapped[str] = mapped_column(
        String(32), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False
    )
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    # Magic link auth: no password required for MVP
    last_login_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)

    organization: Mapped["Organization"] = relationship("Organization", back_populates="users")

    def __repr__(self):
        return f"<User {self.email}>"
