"""Magic link auth: request link, callback with token."""
import json
from pathlib import Path
from time import time
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import User, Organization
from app.schemas.auth import MagicLinkRequest, TokenResponse
from app.core.security import create_magic_link_token, decode_access_token
from app.config import settings
from app.integrations.email_sender import send_email, email_configured

router = APIRouter(prefix="/auth", tags=["auth"])
_DEBUG_LOG_PATH = Path("/Users/hectorestrada/Desktop/Z/PayWow/.cursor/debug-4c3e2e.log")


def _debug_log(run_id: str, hypothesis_id: str, location: str, message: str, data: dict) -> None:
    payload = {
        "sessionId": "4c3e2e",
        "runId": run_id,
        "hypothesisId": hypothesis_id,
        "location": location,
        "message": message,
        "data": data,
        "timestamp": int(time() * 1000),
    }
    try:
        _DEBUG_LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
        with _DEBUG_LOG_PATH.open("a", encoding="utf-8") as f:
            f.write(json.dumps(payload, separators=(",", ":")) + "\n")
    except Exception:
        pass


def _magic_link_html(link: str) -> str:
    return f"""
    <p>Sign in to Zippy (invoice resolution, no awkward chase).</p>
    <p><a href="{link}" style="display:inline-block;margin:1em 0;padding:12px 24px;background:#0ea5e9;color:#fff;text-decoration:none;border-radius:6px;">Sign in</a></p>
    <p>Or copy this link: <a href="{link}">{link}</a></p>
    <p>This link expires in 15 minutes. If you didn't request it, you can ignore this email.</p>
    """


@router.post("/magic-link", response_model=dict)
async def request_magic_link(
    body: MagicLinkRequest,
    db: AsyncSession = Depends(get_db),
):
    """Request magic link. Sends email when Resend is configured; optionally creates user+org if allow_public_signup."""
    # region agent log
    _debug_log(
        run_id="pre-fix",
        hypothesis_id="H6-H7",
        location="backend/app/api/v1/auth.py:request_magic_link:start",
        message="Magic link requested",
        data={
            "hasNext": bool(body.next),
            "nextIsAbsoluteUrl": bool(body.next and body.next.startswith(("http://", "https://"))),
            "allowPublicSignup": bool(settings.allow_public_signup),
            "emailConfigured": bool(email_configured()),
        },
    )
    # endregion
    r = await db.execute(select(User).where(User.email == body.email))
    user = r.scalar_one_or_none()
    if not user:
        if not settings.allow_public_signup:
            raise HTTPException(status_code=404, detail="User not found")
        org = Organization(name=f"{body.email.split('@')[0]}'s organization")
        db.add(org)
        await db.flush()
        user = User(organization_id=org.id, email=body.email)
        db.add(user)
        await db.flush()
    token = create_magic_link_token(body.email)
    link = f"{settings.frontend_url}/auth/callback?token={token}"
    if body.next:
        from urllib.parse import quote
        link += "&next=" + quote(body.next, safe="")
    if email_configured():
        await send_email(
            to=body.email,
            subject="Sign in to Zippy",
            html=_magic_link_html(link),
            reply_to=settings.reply_to or None,
        )
    out = {"message": "If an account exists, you will receive an email."}
    if not email_configured():
        out["dev_link"] = link
    # region agent log
    _debug_log(
        run_id="pre-fix",
        hypothesis_id="H6-H7",
        location="backend/app/api/v1/auth.py:request_magic_link:end",
        message="Magic link response generated",
        data={
            "userFoundOrCreated": bool(user),
            "returnsDevLink": "dev_link" in out,
        },
    )
    # endregion
    return out


@router.post("/callback", response_model=TokenResponse)
async def auth_callback(token: str, db: AsyncSession = Depends(get_db)):
    """Exchange magic link token for access token (or login with token in body)."""
    # region agent log
    _debug_log(
        run_id="pre-fix",
        hypothesis_id="H2-H6",
        location="backend/app/api/v1/auth.py:auth_callback:start",
        message="Auth callback called",
        data={"tokenLength": len(token)},
    )
    # endregion
    email = decode_access_token(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired link")
    r = await db.execute(select(User).where(User.email == email))
    user = r.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    from app.core.security import create_access_token
    access_token = create_access_token(str(user.id))
    # region agent log
    _debug_log(
        run_id="pre-fix",
        hypothesis_id="H2-H6",
        location="backend/app/api/v1/auth.py:auth_callback:end",
        message="Auth callback succeeded",
        data={"userFound": True, "accessTokenIssued": bool(access_token)},
    )
    # endregion
    return TokenResponse(access_token=access_token)
