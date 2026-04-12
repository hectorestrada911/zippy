"""Recent activity from audit log (sync, reminders, payments, disputes)."""
from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.database import get_db
from app.models import User
from app.schemas.activity import ActivityItem
from app.services.audit import get_logs

router = APIRouter(prefix="/activity", tags=["activity"])


@router.get("", response_model=list[ActivityItem])
async def list_activity(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
    limit: int = Query(default=30, ge=1, le=100),
    entity_type: str | None = Query(default=None, description="Filter by entity_type, e.g. invoice"),
    entity_id: str | None = Query(default=None, description="Filter by entity id"),
):
    """Latest audit events for the signed-in user's organization."""
    rows = await get_logs(
        db,
        user.organization_id,
        entity_type=entity_type,
        entity_id=entity_id,
        limit=limit,
    )
    return rows
