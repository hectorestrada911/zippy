"""Audit log service."""
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.audit import AuditLog


async def log(
    session: AsyncSession,
    organization_id: str,
    action: str,
    *,
    actor_type: str | None = "system",
    actor_id: str | None = None,
    entity_type: str | None = None,
    entity_id: str | None = None,
    payload: dict | None = None,
) -> None:
    entry = AuditLog(
        organization_id=organization_id,
        actor_type=actor_type,
        actor_id=actor_id,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        payload=payload,
    )
    session.add(entry)


async def get_logs(
    session: AsyncSession,
    organization_id: str,
    entity_type: str | None = None,
    entity_id: str | None = None,
    limit: int = 100,
):
    q = select(AuditLog).where(AuditLog.organization_id == organization_id).order_by(AuditLog.created_at.desc())
    if entity_type:
        q = q.where(AuditLog.entity_type == entity_type)
    if entity_id:
        q = q.where(AuditLog.entity_id == entity_id)
    q = q.limit(limit)
    result = await session.execute(q)
    return result.scalars().all()
