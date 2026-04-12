"""Activity / audit log API shapes."""
from __future__ import annotations

from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict


class ActivityItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    action: str
    actor_type: str | None
    entity_type: str | None
    entity_id: str | None
    payload: dict[str, Any] | None
    created_at: datetime
