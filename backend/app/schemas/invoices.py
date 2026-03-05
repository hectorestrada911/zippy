from datetime import date, datetime
from decimal import Decimal
from pydantic import BaseModel, ConfigDict


class InvoiceList(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    external_id: str
    number: str | None
    amount: Decimal
    due_date: date
    status: str
    dispute_open: bool
    next_scheduled_at: datetime | None
    paid_at: datetime | None
    escalated_at: datetime | None = None
    customer_id: str


class InvoiceDetail(InvoiceList):
    pay_url: str | None
    link_token: str | None  # Only for internal; public uses token in URL
    messages: list[dict]
    disputes: list[dict]
    customer_name: str | None = None
    customer_email: str | None = None


class MessageOut(BaseModel):
    id: str
    channel: str
    template_used: str | None
    sent_at: datetime
    status: str
