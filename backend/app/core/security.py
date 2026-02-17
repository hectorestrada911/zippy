"""Token generation and verification for magic links and pay/dispute links."""
from __future__ import annotations
import secrets
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from app.config import settings


def create_access_token(subject: str, expires_delta: timedelta | None = None) -> str:
    if expires_delta is None:
        expires_delta = timedelta(minutes=settings.jwt_expire_minutes)
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = {"sub": subject, "exp": expire, "type": "access"}
    return jwt.encode(to_encode, settings.secret_key, algorithm=settings.jwt_algorithm)


def decode_access_token(token: str) -> str | None:
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.jwt_algorithm])
        if payload.get("type") != "access":
            return None
        return payload.get("sub")
    except JWTError:
        return None


def create_magic_link_token(email: str) -> str:
    expire = timedelta(minutes=settings.magic_link_expire_minutes)
    return create_access_token(email, expires_delta=expire)


def create_tokenized_link_token(invoice_id: str, purpose: str = "pay") -> str:
    """Secure token for pay/dispute links (no login)."""
    expire = timedelta(hours=settings.tokenized_link_expire_hours)
    to_encode = {
        "sub": invoice_id,
        "purpose": purpose,
        "exp": datetime.now(timezone.utc) + expire,
        "type": "invoice_link",
    }
    return jwt.encode(to_encode, settings.secret_key, algorithm=settings.jwt_algorithm)


def decode_tokenized_link_token(token: str) -> tuple[str | None, str | None]:
    """Returns (invoice_id, purpose) or (None, None)."""
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.jwt_algorithm])
        if payload.get("type") != "invoice_link":
            return None, None
        return payload.get("sub"), payload.get("purpose")
    except JWTError:
        return None, None


def generate_link_token_legacy() -> str:
    """Opaque token stored on invoice (legacy/rotation)."""
    return secrets.token_urlsafe(32)
