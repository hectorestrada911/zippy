from datetime import date, datetime
from decimal import Decimal
from pydantic import BaseModel, ConfigDict


class TimestampSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    created_at: datetime | None = None
    updated_at: datetime | None = None
