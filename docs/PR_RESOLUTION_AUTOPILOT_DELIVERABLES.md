# PR: Resolution Autopilot + QBO-only V1 — Deliverables

## 1. Diff summary — files changed and why

### Flow-field section (mold to existing UI/UX)
- **`frontend/src/components/ui/flow-field-background-demo.tsx`**  
  Uses design tokens (eyebrow, `page-title`-style headline, `text-[var(--accent)]`, `btn-primary`, `text-[var(--muted)]`), subhead “Recover overdue invoices without awkward chasing,” and “No credit card · 2 minutes to first sync” so the section matches the rest of the site.

### Marketing copy (Resolution Autopilot wedge)
- **`frontend/src/app/page.tsx`**  
  Hero subhead to “Recover overdue invoices without awkward chasing”; Why Zippy section reframed to resolution workflow; added **“Why not just QuickBooks reminders?”** callout (QuickBooks = invoices + reminders, Zippy = resolution workflow, auto-pause, escalation, ROI); What you get / bullets / integrations / FAQ updated to “follow-ups,” “blockers,” “autopilot,” “resolution” (no generic “reminders” positioning).
- **`frontend/src/app/layout.tsx`**  
  Meta description: “Invoice resolution on autopilot. Recover overdue invoices without awkward chasing…”
- **`frontend/src/components/TakeCloserLook.tsx`**  
  “Smart reminders” → “Resolution autopilot”; “we pause reminders” → “we pause follow-ups.”
- **`frontend/src/components/SpeedBlock.tsx`**  
  “Friendly reminders” → “Resolution follow-ups.”
- **`frontend/src/components/HeroWithShader.tsx`**  
  “Friendly reminders” → “Resolution follow-ups.”
- **`frontend/src/components/ui/display-cards-demo.tsx`**  
  “Money in via reminder links” → “Money in via pay links”; “reminders paused” → “autopilot paused.”
- **`frontend/src/components/ui/feature-section-demo.tsx`**  
  Sync/resolution/blockers/autopilot language.
- **`frontend/src/components/ui/glowing-effect-demo.tsx`**  
  “Reminders” → “Follow-ups” / “Professional follow-ups.”
- **`frontend/src/components/ui/particle-text-effect-demo.tsx`**  
  “Reminders run” → “Autopilot runs.”
- **`frontend/src/components/ui/testimonials-with-marquee-demo.tsx`**  
  Testimonials to “Follow-ups run on autopilot” / “Resolution on autopilot.”
- **`frontend/src/components/TestimonialCarousel.tsx`**  
  Same testimonial wording.
- **`frontend/src/components/ui/spotlight-card-demo.tsx`**  
  “Reminders” → “Follow-ups”; “issue” → “blocker.”
- **`frontend/src/components/ui/spline-scene-demo.tsx`**  
  “Reminders send” → “Follow-ups send.”

### Disputes → Blockers (product UX)
- **`frontend/src/app/disputes/page.tsx`**  
  Table header “Reason” → “Blocker”; added `BLOCKER_LABELS` + `formatBlockerLabel()`; subtitle “resume reminders” → “resume autopilot.”
- **`frontend/src/app/disputes/[id]/page.tsx`**  
  Same `formatBlockerLabel()` for detail title; back link already “Blockers.”
- **`frontend/src/app/dashboard/page.tsx`**  
  Header “Your money at a glance” → “Resolution at a glance”; subtitle to “what you’ve recovered”; Blockers empty state “resume reminders” → “resume autopilot.”
- **`frontend/src/app/dispute/page.tsx`**  
  Public token page: copy “before the next reminder” → “follow-ups stay paused until they’re done.”
- **`frontend/src/app/invoices/[id]/page.tsx`**  
  “Dispute open” → “Blocker open” (+ “autopilot paused”); “Reminders we’ve sent” → “Follow-ups sent”; section “Questions or issues” → “What’s blocking payment?”; added inline note that customers report via email link; dispute list uses `formatBlockerLabel()`.
- **`frontend/src/app/invoices/InvoicesList.tsx`**  
  Subtitle “next reminder” → “next autopilot action”; table “Next reminder” → “Next action.”

### Blocker categories (customer + internal)
- **`frontend/src/app/dispute/page.tsx`**  
  `REASONS` → `BLOCKER_CATEGORIES`: Need PO, Resend to AP/wrong recipient, Wrong amount/line items, Need W-9/vendor onboarding, Waiting approval, Scope/timesheet, Paid already, Other.
- **`backend/app/models/dispute.py`**  
  `DISPUTE_REASONS` extended with `wrong_recipient`, `waiting_approval`, `paid_already` so API accepts new categories; comment updated to “Blocker categories.”

### Dashboard ROI
- **`frontend/src/app/dashboard/page.tsx`**  
  “Paid this month” → “Recovered this month” (invoices paid) + helper “invoices paid”; “Paid after reminder” → “Paid since connecting” + “recovered via autopilot.”

### FlowStrip
- **`frontend/src/components/FlowStrip.tsx`**  
  No change; already “Sync → Autopilot → Resolve blockers.”

---

## 2. Five concrete next experiments

| # | What it tests | Metric | Where it fits |
|---|----------------|--------|----------------|
| 1 | **AR Sprint entry after connect** — “Start AR Sprint” with top 10 overdue by score (amount × days) and default Approval Mode for first N sends | % of new users who start a sprint within 7 days; time to first “recovered” invoice | Onboarding / post–QBO connect; first proof of “get paid faster.” |
| 2 | **Blocker-to-resolution time** — time from “blocker submitted” to “marked resolved” and autopilot resumed | Median resolution time; % resolved in &lt;48 h | Blockers inbox; surfaces where process or templates need improvement. |
| 3 | **“Recovered this month” accuracy** — compare dashboard “Recovered” to QBO-paid invoices that had Zippy activity (dunning or pay link) in the 30 days before payment | Attribution accuracy; willingness to show “Recovered” in sales/marketing | ROI proof; avoid overclaiming while still showing value. |
| 4 | **Reply capture + auto-pause** — when we detect a reply in the customer thread, auto-pause that invoice’s sequence and show “Replied – review before next step” in Case view | % of cases correctly paused on reply; reduction in “reminded after they already replied” complaints | Trust / stop rules; differentiator vs generic reminders. |
| 5 | **Case status in UI** — expose Autopilot / Blocked / Escalated / Paid and “Next action” on invoice/case cards and detail view (using existing dispute_open, paid_at, escalation) | Engagement with case view; correlation with resolution time | Product primitive “Cases”; sets up escalation and reporting. |

---

**Note:** Reply capture is called out as “coming next” in positioning if not implemented yet; this PR does not fake it in copy. Blocker capture + auto-pause + dashboard ROI and Resolution/Blockers language are implemented and aligned with the new wedge.
