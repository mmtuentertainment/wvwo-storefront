# WVWO Field Reports System - Phase 5 Specifications

## Status: FUTURE WORK
**Priority:** After site completion (Phase 3C+)
**Owner:** Matt (digital operations)
**Stakeholder:** Kim (content source)

---

## Executive Summary

Build a sustainable system for Matt to publish hunting/fishing reports via email (Buttondown) with web archive. Voice-first workflow: Kim records → Matt transcribes → publish.

**Research Basis:** Hive mind analysis (3 agents) determined:
- Email is CRITICAL for FFLs (banned from FB/IG/Google Ads)
- ROI: $36-38 per $1 spent, 27% open rates for hobby emails
- Weekly during seasons, bi-weekly off-season = optimal frequency
- Voice-first preserves Kim's authentic voice

---

## Specification Index

| Spec | Title | Purpose |
|------|-------|---------|
| [SPEC-01](SPEC-01-report-data-model.md) | Report Data Model | TypeScript interface for report JSON |
| [SPEC-02](SPEC-02-voice-to-report-workflow.md) | Voice-to-Report Workflow | Kim records → Matt publishes process |
| [SPEC-03](SPEC-03-web-archive.md) | Web Archive | /reports pages in Astro |
| [SPEC-04](SPEC-04-email-templates.md) | Email Templates | Buttondown email templates |
| [SPEC-05](SPEC-05-subscriber-segmentation.md) | Subscriber Segmentation | Tagging system for hunters/anglers |
| [SPEC-06](SPEC-06-welcome-email.md) | Welcome Email | Auto-trigger welcome email |

---

## Implementation Roadmap

### Phase 1: Foundation (Est. 2-3 hours)
1. [ ] Create `reports.json` with schema (Spec 1)
2. [ ] Add 3 sample reports for testing
3. [ ] Document Kim→Matt workflow (Spec 2)

### Phase 2: Web Archive (Est. 4-6 hours)
4. [ ] Create `/reports/index.astro` (Spec 3)
5. [ ] Create `/reports/[slug].astro` (Spec 3)
6. [ ] Create `ReportCard.astro` component
7. [ ] Verify build passes

### Phase 3: Email System (Est. 2-3 hours)
8. [ ] Create email templates in Buttondown (Spec 4)
9. [ ] Set up welcome email automation (Spec 6)
10. [ ] Test full flow: JSON → Web → Email

### Phase 4: Segmentation (Est. 1-2 hours)
11. [ ] Update EmailCapture with preference checkboxes (Spec 5)
12. [ ] Configure Buttondown tags
13. [ ] Test segmented send

### Phase 5: Go Live
14. [ ] Kim records first real report
15. [ ] Matt publishes via workflow
16. [ ] Monitor metrics (open rate, clicks)

**Total Estimate:** 10-15 hours implementation + ongoing 15-25 min per report

---

## Research Sources

- [Email Marketing for Gun Stores & FFLs](https://www.capandballseo.com/email-marketing-for-gun-stores-ffls/)
- [Outdoor & Sports Industry Email Report](https://targetbay.com/ecommerce-email-marketing/outdoor-sports/)
- [Email Newsletter Frequency Best Practices](https://getanewsletter.com/en/blog/email-newsletter-frequency/)
- [Customer Newsletter Frequency Preferences](https://baymard.com/blog/newsletter-frequency)
- [Marketing for Fishing and Hunting Brands](https://emulent.com/blog/marketing-for-fishing-and-hunting-brands/)
- [Firearm Marketing Guide](https://giantpartners.com/firearm-marketing-guide/)
