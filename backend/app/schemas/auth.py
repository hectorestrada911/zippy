from pydantic import BaseModel, EmailStr


class MagicLinkRequest(BaseModel):
    email: EmailStr
    next: str | None = None  # Redirect path after login (e.g. /settings/integrations)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
