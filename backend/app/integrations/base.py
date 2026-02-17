"""Abstract interface for accounting provider (QuickBooks vs mock)."""
from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import date
from decimal import Decimal


@dataclass
class SyncCustomer:
    external_id: str
    name: str
    email: str | None
    phone: str | None
    raw: dict | None = None


@dataclass
class SyncInvoice:
    external_id: str
    customer_external_id: str
    number: str | None
    amount: Decimal
    due_date: date
    status: str
    currency: str
    pay_url: str | None
    raw: dict | None = None


class AccountingProvider(ABC):
    """Interface for syncing customers and invoices."""

    @abstractmethod
    async def get_customers(self, credential: dict) -> list[SyncCustomer]:
        pass

    @abstractmethod
    async def get_invoices(self, credential: dict) -> list[SyncInvoice]:
        pass

    @abstractmethod
    async def refresh_credential(self, credential: dict) -> dict | None:
        """Refresh OAuth token if needed. Returns updated credential or None."""
        pass
