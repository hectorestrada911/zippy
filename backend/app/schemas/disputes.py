from datetime import datetime
from pydantic import BaseModel, ConfigDict


class DisputeCreate(BaseModel):
    reason: str  # missing_po, incorrect_amount, need_w9, scope_timesheet, other
    description: str | None = None


class DisputeUpdate(BaseModel):
    status: str | None = None
    assigned_to_id: str | None = None


class DisputeOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    invoice_id: str
    reason: str
    description: str | None
    status: str
    assigned_to_id: str | None
    resolved_at: datetime | None
    created_at: datetime
    events: list[dict] | None = None
