"""Settings: integrations (QBO OAuth callback), company profile, dunning config."""
from __future__ import annotations
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

from app.api.deps import get_current_user
from app.database import get_db
from app.models import Organization, IntegrationCredential, User
from app.integrations.quickbooks import get_oauth_authorize_url, exchange_code_for_tokens

router = APIRouter(prefix="/settings", tags=["settings"])


class CompanyProfile(BaseModel):
    name: str
    logo_url: str | None
    signature_text: str | None
    reply_to_email: str | None


class AutopilotSettings(BaseModel):
    escalation_days: int | None


class AutopilotSettingsUpdate(BaseModel):
    escalation_days: int | None


@router.get("/company", response_model=CompanyProfile)
async def get_company(
  db: AsyncSession = Depends(get_db),
  user: User = Depends(get_current_user),
):
    r = await db.execute(select(Organization).where(Organization.id == user.organization_id))
    org = r.scalar_one_or_none()
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return CompanyProfile(
        name=org.name,
        logo_url=org.logo_url,
        signature_text=org.signature_text,
        reply_to_email=org.reply_to_email,
    )


@router.get("/autopilot", response_model=AutopilotSettings)
async def get_autopilot(
  db: AsyncSession = Depends(get_db),
  user: User = Depends(get_current_user),
):
    r = await db.execute(select(Organization).where(Organization.id == user.organization_id))
    org = r.scalar_one_or_none()
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return AutopilotSettings(escalation_days=org.escalation_days)


@router.patch("/autopilot", response_model=AutopilotSettings)
async def update_autopilot(
  body: AutopilotSettingsUpdate,
  db: AsyncSession = Depends(get_db),
  user: User = Depends(get_current_user),
):
    r = await db.execute(select(Organization).where(Organization.id == user.organization_id))
    org = r.scalar_one_or_none()
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    if body.escalation_days is not None:
        if body.escalation_days < 1 or body.escalation_days > 365:
            raise HTTPException(status_code=400, detail="escalation_days must be between 1 and 365")
        org.escalation_days = body.escalation_days
    await db.commit()
    return AutopilotSettings(escalation_days=org.escalation_days)


@router.get("/integrations/quickbooks/authorize-url")
async def quickbooks_authorize_url(
  state: str,
  user: User = Depends(get_current_user),
):
    """Return URL to redirect user to QBO OAuth."""
    url = get_oauth_authorize_url(state)
    return {"url": url}


@router.post("/integrations/quickbooks/callback")
async def quickbooks_oauth_callback(
  code: str,
  realm_id: str,
  state: str = "",
  db: AsyncSession = Depends(get_db),
  user: User = Depends(get_current_user),
):
    """Exchange code for tokens and store credential (upsert one QBO cred per org)."""
    tokens = await exchange_code_for_tokens(code)
    r = await db.execute(
        select(IntegrationCredential).where(
            IntegrationCredential.organization_id == user.organization_id,
            IntegrationCredential.provider == "quickbooks",
        )
    )
    existing = r.scalar_one_or_none()
    if existing:
        existing.access_token = tokens["access_token"]
        existing.refresh_token = tokens.get("refresh_token") or existing.refresh_token
        existing.metadata_ = (existing.metadata_ or {}) | {"realm_id": realm_id}
        if tokens.get("expires_in"):
            from datetime import datetime, timezone, timedelta
            existing.expires_at = datetime.now(timezone.utc) + timedelta(seconds=tokens["expires_in"])
    else:
        cred = IntegrationCredential(
            organization_id=user.organization_id,
            provider="quickbooks",
            access_token=tokens["access_token"],
            refresh_token=tokens.get("refresh_token"),
            metadata_={"realm_id": realm_id},
        )
        if tokens.get("expires_in"):
            from datetime import datetime, timezone, timedelta
            cred.expires_at = datetime.now(timezone.utc) + timedelta(seconds=tokens["expires_in"])
        db.add(cred)
    await db.commit()
    return {"status": "connected"}
