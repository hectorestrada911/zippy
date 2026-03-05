# Repositioning: Diff Summary & Next 5 Experiments

## Positioning decision

- **Primary wedge:** Safe Collections Autopilot — reminders on your schedule; auto-pause when a customer reports an issue; escalation when past threshold.
- **Secondary wedge:** Payment Blockers Inbox — resolve missing PO, W-9, approval questions in one place; reminders stay paused until you’re done.
- **Service blurb:** Concierge AR Sprint — done-with-you onboarding, 14-day results (contact for pricing). Optional 14-day checklist page at `/ar-sprint`.

---

## D) Diff summary — files changed and why

| File | Why |
|------|-----|
| **frontend/src/app/page.tsx** | Hero: eyebrow “Invoice resolution on autopilot”, headline “Start resolving.”, subhead focused on pause-on-issue and no awkward follow-up. Who it’s for: Blockers Inbox + auto-pause. What you get: 3 cards renamed to “Always current, no spreadsheet AR”, “Safe Autopilot (with stop rules)”, “Blockers Inbox (auto-pause on issues)”; new “Stop chasing. Start resolving.” bullet block. Why Zippy: section retitled “Why Zippy vs QuickBooks reminders”, copy on pause-when-issue, tokenized links. FAQ: added “Does Zippy stop reminding when there’s an issue?”; reordered and tightened for trust + blocker resolution. New Concierge AR Sprint blurb + link to /ar-sprint. CTA “Ready for invoice resolution on autopilot?”; footer “Invoice resolution on autopilot.” |
| **frontend/src/components/FlowStrip.tsx** | Flow changed from Send → Remind → Get paid to **Sync → Autopilot → Resolve blockers**. Icons: LinkIcon (Sync), BellAlertIcon (Autopilot), ChatBubbleBottomCenterTextIcon (Resolve blockers). |
| **frontend/src/components/Nav.tsx** | Nav label “Disputes” → **“Blockers”** (route remains `/disputes`). |
| **frontend/src/app/dispute/page.tsx** | Public “Report an issue” page: title “Something wrong with this invoice?” → **“Report a payment blocker”**; added line “Tell us what’s blocking payment…”. Label “Reason” → **“What’s blocking payment?”**; button “Submit” → **“Report issue”**. Success/error and “already reported” copy made professional (payment blocker, passed along to sender). |
| **frontend/src/app/disputes/page.tsx** | Header title “Customer questions & issues” → **“Blockers”**; subtitle updated to “Payment blockers from your invoice links show here. Resolve them and we’ll resume reminders when you’re ready.” |
| **frontend/src/app/disputes/[id]/page.tsx** | Breadcrumb/link text “← Disputes” / “← Back to disputes” → **“← Blockers”** / **“← Back to Blockers”**. |
| **frontend/src/components/ui/display-cards-demo.tsx** | Card “Customer questions” → **“Payment blockers”**; description → “Issues to resolve — reminders paused”. |
| **frontend/src/components/ui/glowing-effect-demo.tsx** | Bento item “Questions in one place” → **“Blockers in one place”**; description updated to mention auto-pause. |
| **frontend/src/app/layout.tsx** | Metadata title/description updated to “Invoice resolution on autopilot” and pause-on-issue + Blockers inbox. |
| **frontend/src/app/ar-sprint/page.tsx** | **New.** Marketing 14-day AR Sprint checklist: Day 0 connect/import, Day 1 first reminder + approval mode, Days 2–7 autopilot + blockers triage, Days 7–14 escalation + stale blockers. Link to Concierge; CTAs to login/dashboard. |

### Copy-to-feature truth

- No new features invented in copy. All claims (auto-pause on issue, tokenized pay/report links, dunning schedule, Blockers inbox, resume when resolved) are scaffolded or implemented per ARCHITECTURE.md.
- “Escalation when an invoice goes past a threshold” is in the bullet list; backend escalation rules can be added later—positioning is “we support escalation” as a direction.
- Concierge AR Sprint and “approval mode for first 10 reminders” on /ar-sprint are framed as optional / coming or contact-based; no promise of current implementation.

---

## E) Next 5 experiments (what we test, metric, where it fits)

1. **Approval mode for first 10 reminders**  
   - **What it tests:** Users want to approve copy before reminders go out at the start.  
   - **Metric:** % of new orgs that enable “approval mode” and how many of those approve at least one reminder; time to first “live” reminder.  
   - **Where:** Settings or onboarding; first 10 reminders per invoice (or first N per org) go to a queue; user approves or edits then sends.

2. **Blockers SLA (time-to-first-response)**  
   - **What it tests:** Visibility into “how fast do I respond to blockers” drives behavior and positions Zippy as resolution-focused.  
   - **Metric:** Time from blocker created to first reply (or status change); dashboard widget “Blockers responded in &lt; 24h” or similar.  
   - **Where:** Blockers list or detail; optional org-level target (e.g. “Respond within 24h”).

3. **Invoice-level escalation rule (e.g. “past 30 days → escalate”)**  
   - **What it tests:** Escalation is a real differentiator; users will set one rule and see value.  
   - **Metric:** % of orgs that set at least one escalation rule; % of overdue invoices that hit escalation; correlation with payment rate.  
   - **Where:** Settings → Dunning / Autopilot: “When invoice is X days past due, [escalate to me / change template / add internal note]”.

4. **ROI / “Money recovered” widget**  
   - **What it tests:** Showing “$X collected after reminder” or “$X in AR resolved this month” increases perceived value and retention.  
   - **Metric:** Dashboard engagement; correlation with upgrade or continued use.  
   - **Where:** Dashboard: simple “Paid after Zippy reminder” (from payment webhook + reminder history) or “Overdue resolved this month”.

5. **Customer portal branding (pay link page)**  
   - **What it tests:** White-label or “Powered by Zippy” pay page affects trust and conversion to pay.  
   - **Metric:** Pay-link click → payment completion rate; optional A/B on branded vs generic.  
   - **Where:** Public pay-by-token page: logo, colors, short “Pay [Company]” headline; optional custom domain later.
