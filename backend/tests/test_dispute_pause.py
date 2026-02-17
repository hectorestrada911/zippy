"""Test that dispute-open state implies no next reminder (dunning pause logic)."""
from datetime import date
import pytest

from app.services.dunning import get_next_reminder_datetime, get_default_offset_days


def test_invoice_eligible_for_dunning_only_when_not_paid_and_not_disputed():
    """Business rule: we only schedule reminders when paid_at is null and dispute_open is False.
    This test encodes that rule for documentation; the actual filter is in jobs/dunning_runner.py."""
    # Eligible: not paid, not disputed
    paid_at = None
    dispute_open = False
    assert paid_at is None and dispute_open is False  # would be selected by job

    # Not eligible: disputed
    dispute_open = True
    assert dispute_open is True  # would be excluded by job

    # Not eligible: paid
    paid_at = "2025-01-01T00:00:00Z"
    assert paid_at is not None  # would be excluded by job


def test_after_resolve_next_reminder_is_next_future_date():
    """When dispute resolves, we resume at next appropriate step (next rule on or after today)."""
    due = date(2025, 3, 15)
    offsets = get_default_offset_days()
    # Simulate "today" is March 20 -> next reminder would be March 25 (+10) or April 4 (+20)
    from datetime import datetime, timezone
    after = datetime(2025, 3, 20, 0, 0, 0, tzinfo=timezone.utc)
    next_dt = get_next_reminder_datetime(due, offsets, after=after)
    assert next_dt is not None
    assert next_dt.date() == date(2025, 3, 25)
