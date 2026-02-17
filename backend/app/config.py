"""Application configuration from environment."""
from __future__ import annotations
from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # App
    app_name: str = "Zippy"
    debug: bool = False
    secret_key: str = "change-me-in-production"

    # DB
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/collections_autopilot"

    # Auth
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60 * 24 * 7  # 7 days for magic link
    magic_link_expire_minutes: int = 15
    tokenized_link_expire_hours: int = 168  # 7 days for pay/dispute links

    # Integrations
    quickbooks_client_id: str = ""
    quickbooks_client_secret: str = ""
    quickbooks_redirect_uri: str = "http://localhost:3000/settings/integrations"  # frontend callback
    quickbooks_environment: str = "sandbox"  # sandbox | production

    stripe_secret_key: str = ""
    stripe_webhook_secret: str = ""
    stripe_publishable_key: str = ""

    resend_api_key: str = ""
    email_from: str = "Zippy <noreply@example.com>"
    reply_to: str = ""

    twilio_account_sid: str = ""
    twilio_auth_token: str = ""
    twilio_from_number: str = ""

    # Storage (S3-compatible; local dev can use LocalStack or filesystem)
    s3_bucket: str = "dispute-uploads"
    s3_region: str = "us-east-1"
    s3_endpoint_url: Optional[str] = None  # set for LocalStack/minio
    s3_use_path_style: bool = False
    # Local fallback: store under this path if s3 not configured
    local_upload_path: str = "./uploads"

    # Frontend (for links in emails)
    frontend_url: str = "http://localhost:3000"

    # Scheduler
    scheduler_run_reminders_every_seconds: int = 60


settings = Settings()
