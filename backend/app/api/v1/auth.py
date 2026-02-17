"""Magic link auth: request link, callback with token."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import User
from app.schemas.auth import MagicLinkRequest, TokenResponse
from app.core.security import create_magic_link_token, decode_access_token
from app.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/magic-link", response_model=dict)
async def request_magic_link(
    body: MagicLinkRequest,
    db: AsyncSession = Depends(get_db),
):
    """Request magic link. In production, send email with link. For MVP return link in response."""
    r = await db.execute(select(User).where(User.email == body.email))
    user = r.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    token = create_magic_link_token(body.email)
    # TODO: send email with link {frontend_url}/auth/callback?token={token}
    return {"message": "If an account exists, you will receive an email.", "dev_link": f"{settings.frontend_url}/auth/callback?token={token}"}


@router.post("/callback", response_model=TokenResponse)
async def auth_callback(token: str, db: AsyncSession = Depends(get_db)):
    """Exchange magic link token for access token (or login with token in body)."""
    email = decode_access_token(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired link")
    r = await db.execute(select(User).where(User.email == email))
    user = r.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    from app.core.security import create_access_token
    access_token = create_access_token(str(user.id))
    return TokenResponse(access_token=access_token)
