"""FastAPI dependencies: DB session, current user."""
from __future__ import annotations
from collections.abc import AsyncGenerator
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer, OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_

from app.database import get_db, AsyncSessionLocal
from app.models import User
from app.core.security import decode_access_token

security = HTTPBearer(auto_error=False)


async def get_current_user_id(
    cred: HTTPAuthorizationCredentials | None = Depends(security),
) -> str | None:
    if not cred:
        return None
    user_id = decode_access_token(cred.credentials)
    return user_id


async def get_current_user(
    user_id: str | None = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
) -> User:
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    r = await db.execute(select(User).where(and_(User.id == user_id, User.is_active == True)))
    user = r.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user


def require_org(org_id: str, user: User) -> None:
    if user.organization_id != org_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
