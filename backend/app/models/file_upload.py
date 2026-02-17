"""File upload (e.g. dispute attachments)."""
from __future__ import annotations
from typing import Optional
import uuid
from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.base import TimestampMixin


def gen_uuid():
    return str(uuid.uuid4())


class FileUpload(Base, TimestampMixin):
    __tablename__ = "file_uploads"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=gen_uuid)
    dispute_id: Mapped[str] = mapped_column(
        String(32), ForeignKey("disputes.id", ondelete="CASCADE"), nullable=False
    )
    filename: Mapped[str] = mapped_column(String(255), nullable=False)
    content_type: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    size_bytes: Mapped[int] = mapped_column(Integer, nullable=False)
    storage_key: Mapped[str] = mapped_column(String(512), nullable=False)  # S3 key or local path
    url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)  # presigned or public URL

    dispute: Mapped["Dispute"] = relationship("Dispute", back_populates="file_uploads")
