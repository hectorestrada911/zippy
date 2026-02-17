from datetime import date
from decimal import Decimal
from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_ar: Decimal
    overdue_ar: Decimal
    expected_7_days: Decimal
    expected_30_days: Decimal
    overdue_count: int


class OverdueItem(BaseModel):
    invoice_id: str
    invoice_number: str | None
    customer_name: str
    amount: Decimal
    due_date: date
    next_scheduled_at: str | None  # ISO datetime
    status: str


class DisputeNeedingAction(BaseModel):
    dispute_id: str
    invoice_id: str
    invoice_number: str | None
    reason: str
    status: str
    created_at: str


class DashboardResponse(BaseModel):
    summary: DashboardSummary
    overdue_invoices: list[OverdueItem]
    disputes_needing_action: list[DisputeNeedingAction]
