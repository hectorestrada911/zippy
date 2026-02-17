"""Mock accounting provider for local dev and testing."""
from datetime import date, timedelta
from decimal import Decimal

from app.integrations.base import AccountingProvider, SyncCustomer, SyncInvoice


class MockAccountingProvider(AccountingProvider):
    """Returns deterministic seed data without external API."""

    async def get_customers(self, credential: dict) -> list[SyncCustomer]:
        return [
            SyncCustomer(
                external_id="cust-mock-1",
                name="Acme Corp",
                email="ap@acme.example",
                phone="+15551234567",
            ),
            SyncCustomer(
                external_id="cust-mock-2",
                name="Beta LLC",
                email="billing@beta.example",
                phone=None,
            ),
        ]

    async def get_invoices(self, credential: dict) -> list[SyncInvoice]:
        today = date.today()
        return [
            SyncInvoice(
                external_id="inv-mock-1",
                customer_external_id="cust-mock-1",
                number="INV-001",
                amount=Decimal("1500.00"),
                due_date=today - timedelta(days=5),
                status="overdue",
                currency="USD",
                pay_url="https://pay.example/inv-001",
            ),
            SyncInvoice(
                external_id="inv-mock-2",
                customer_external_id="cust-mock-1",
                number="INV-002",
                amount=Decimal("3200.50"),
                due_date=today + timedelta(days=7),
                status="open",
                currency="USD",
                pay_url=None,
            ),
            SyncInvoice(
                external_id="inv-mock-3",
                customer_external_id="cust-mock-2",
                number="INV-003",
                amount=Decimal("800.00"),
                due_date=today + timedelta(days=1),
                status="open",
                currency="USD",
                pay_url=None,
            ),
        ]

    async def refresh_credential(self, credential: dict) -> dict | None:
        return credential
