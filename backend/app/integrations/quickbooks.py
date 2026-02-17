"""QuickBooks Online integration (OAuth2 + API). Implemented behind AccountingProvider interface."""
from __future__ import annotations
from datetime import datetime, timezone
from decimal import Decimal
import httpx

from app.config import settings
from app.integrations.base import AccountingProvider, SyncCustomer, SyncInvoice


# QBO base URL
QBO_SANDBOX = "https://sandbox-quickbooks.api.intuit.com"
QBO_PROD = "https://quickbooks.api.intuit.com"


def _base_url() -> str:
    return QBO_SANDBOX if settings.quickbooks_environment == "sandbox" else QBO_PROD


def get_oauth_authorize_url(state: str) -> str:
    """Redirect user to this URL to start OAuth flow."""
    base = "https://appcenter.intuit.com/connect/oauth2"
    params = {
        "client_id": settings.quickbooks_client_id,
        "response_type": "code",
        "scope": "com.intuit.quickbooks.accounting",
        "redirect_uri": settings.quickbooks_redirect_uri,
        "state": state,
    }
    q = "&".join(f"{k}={v}" for k, v in params.items())
    return f"{base}?{q}"


async def exchange_code_for_tokens(code: str) -> dict:
    """Exchange auth code for access/refresh tokens."""
    async with httpx.AsyncClient() as client:
        r = await client.post(
            "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
            auth=(settings.quickbooks_client_id, settings.quickbooks_client_secret),
            headers={"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"},
            data={
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": settings.quickbooks_redirect_uri,
            },
        )
        r.raise_for_status()
        data = r.json()
        return {
            "access_token": data["access_token"],
            "refresh_token": data.get("refresh_token"),
            "expires_in": data.get("expires_in", 3600),
        }


async def refresh_tokens(refresh_token: str) -> dict | None:
    """Refresh access token."""
    try:
        async with httpx.AsyncClient() as client:
            r = await client.post(
                "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
                auth=(settings.quickbooks_client_id, settings.quickbooks_client_secret),
                headers={"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"},
                data={"grant_type": "refresh_token", "refresh_token": refresh_token},
            )
            r.raise_for_status()
            data = r.json()
            return {
                "access_token": data["access_token"],
                "refresh_token": data.get("refresh_token", refresh_token),
                "expires_in": data.get("expires_in", 3600),
            }
    except Exception:
        return None


class QuickBooksAccountingProvider(AccountingProvider):
    """Real QBO implementation."""

    async def _get_realm_id(self, credential: dict) -> str | None:
        return credential.get("realm_id")  # Set when user completes OAuth

    async def _request(self, credential: dict, method: str, path: str, **kwargs) -> dict | list:
        realm = await self._get_realm_id(credential)
        if not realm:
            return []
        token = credential.get("access_token")
        if not token:
            return []
        url = f"{_base_url()}/v3/company/{realm}/{path.lstrip('/')}"
        async with httpx.AsyncClient() as client:
            r = await client.request(
                method,
                url,
                headers={"Authorization": f"Bearer {token}", "Accept": "application/json"},
                **kwargs,
            )
            if r.status_code == 401:
                # Token expired; caller should refresh and retry
                raise PermissionError("QBO token expired")
            r.raise_for_status()
            return r.json()

    async def get_customers(self, credential: dict) -> list[SyncCustomer]:
        try:
            data = await self._request(credential, "GET", "query?query=select * from Customer maxresults 1000")
            if isinstance(data, dict) and "QueryResponse" in data:
                customers = data["QueryResponse"].get("Customer") or []
            else:
                customers = []
            return [
                SyncCustomer(
                    external_id=str(c["Id"]),
                    name=c.get("DisplayName") or c.get("CompanyName") or "Unknown",
                    email=c.get("PrimaryEmailAddr", {}).get("Address") if isinstance(c.get("PrimaryEmailAddr"), dict) else None,
                    phone=c.get("PrimaryPhone", {}).get("FreeFormNumber") if isinstance(c.get("PrimaryPhone"), dict) else None,
                    raw=c,
                )
                for c in customers
            ]
        except Exception:
            return []

    async def get_invoices(self, credential: dict) -> list[SyncInvoice]:
        try:
            data = await self._request(credential, "GET", "query?query=select * from Invoice Where Balance > '0' maxresults 1000")
            if isinstance(data, dict) and "QueryResponse" in data:
                invoices = data["QueryResponse"].get("Invoice") or []
            else:
                invoices = []
            result = []
            for inv in invoices:
                due = inv.get("DueDate")
                if due:
                    from datetime import datetime as dt
                    due_date = dt.strptime(due, "%Y-%m-%d").date() if isinstance(due, str) else due
                else:
                    due_date = datetime.now(timezone.utc).date()
                balance = inv.get("Balance") or inv.get("Total", 0)
                amount = balance if isinstance(balance, (int, float)) else float(balance)
                result.append(
                    SyncInvoice(
                        external_id=str(inv["Id"]),
                        customer_external_id=str(inv.get("CustomerRef", {}).get("value", "")),
                        number=inv.get("DocNumber"),
                        amount=Decimal(str(amount)),
                        due_date=due_date,
                        status="open" if amount else "paid",
                        currency=inv.get("CurrencyRef", {}).get("value", "USD"),
                        pay_url=None,  # QBO has hosted invoice URL in different API
                        raw=inv,
                    )
                )
            return result
        except Exception:
            return []

    async def refresh_credential(self, credential: dict) -> dict | None:
        ref = credential.get("refresh_token")
        if not ref:
            return credential
        out = await refresh_tokens(ref)
        if not out:
            return None
        cred = dict(credential)
        cred["access_token"] = out["access_token"]
        cred["refresh_token"] = out.get("refresh_token") or ref
        expires_in = out.get("expires_in", 3600)
        cred["expires_at"] = datetime.now(timezone.utc).timestamp() + expires_in
        return cred
