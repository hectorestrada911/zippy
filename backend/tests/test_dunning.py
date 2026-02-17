"""Tests for dunning scheduling and dispute-pause logic."""
from datetime import date, datetime, timedelta, timezone
import pytest

from app.services.dunning import (
    compute_reminder_dates,
    get_next_reminder_datetime,
    get_idempotency_key,
    get_default_offset_days,
)


def test_compute_reminder_dates():
    due = date(2025, 3, 15)
    offsets = get_default_offset_days()
    dates = compute_reminder_dates(due, offsets)
    assert date(2025, 3, 8) in dates   # -7
    assert date(2025, 3, 14) in dates   # -1
    assert date(2025, 3, 15) in dates   # 0
    assert date(2025, 3, 18) in dates   # +3
    assert date(2025, 3, 25) in dates   # +10
    assert date(2025, 4, 4) in dates    # +20
    assert len(dates) == 6
    assert dates == sorted(dates)


def test_get_next_reminder_datetime_future():
    due = date(2025, 3, 15)
    offsets = get_default_offset_days()
    # After March 10 -> next should be March 14 (-1 day)
    after = datetime(2025, 3, 10, 12, 0, 0, tzinfo=timezone.utc)
    next_dt = get_next_reminder_datetime(due, offsets, after=after)
    assert next_dt is not None
    assert next_dt.date() == date(2025, 3, 14)


def test_get_next_reminder_datetime_past_due():
    due = date(2025, 3, 15)
    offsets = get_default_offset_days()
    # After March 25 -> next should be March 25 (+10)
    after = datetime(2025, 3, 24, 0, 0, 0, tzinfo=timezone.utc)
    next_dt = get_next_reminder_datetime(due, offsets, after=after)
    assert next_dt is not None
    assert next_dt.date() == date(2025, 3, 25)


def test_get_next_reminder_datetime_all_past():
    due = date(2025, 3, 1)
    offsets = [-7, -1, 0, 3, 10, 20]
    # After April 1 -> no more reminders
    after = datetime(2025, 4, 1, 0, 0, 0, tzinfo=timezone.utc)
    next_dt = get_next_reminder_datetime(due, offsets, after=after)
    assert next_dt is None


def test_idempotency_key():
    key = get_idempotency_key("inv-1", -7, "email")
    assert key == "inv-1:-7:email"
    key2 = get_idempotency_key("inv-1", -7, "email")
    assert key == key2


def test_default_offset_days():
    d = get_default_offset_days()
    assert d == [-7, -1, 0, 3, 10, 20]
