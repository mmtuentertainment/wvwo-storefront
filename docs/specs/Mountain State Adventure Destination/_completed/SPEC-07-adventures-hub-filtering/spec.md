# Feature: Adventures Hub with Multi-Axis Filtering

**Version:** 2.1.0 (Research-Validated + Clarified)
**Created:** 2025-12-23
**Updated:** 2025-12-23 (Clarification Session)
**Status:** Specification Complete → Ready for Implementation
**Phase:** Mountain State Adventure Destination (Phase 3)
**Dependencies:**

- SPEC-06 (Content Collections schema - COMPLETED ✅)
- **BLOCKING: SPEC-06 Schema Update Required** - Add elevation_gain and suitability[] fields BEFORE SPEC-07

---

## Clarifications

### Session 2025-12-23

**Q1: Launch with 3 axes (schema ready) OR 5 axes (requires schema update)?**

- Answer: Option B - 5 axes (Season, Difficulty, Gear, Elevation, Suitability)
- Timeline: +3-4 days for schema update + data backfill

**Q2: Elevation slider - Single or dual-thumb?**

- Answer: Option A - Dual-thumb range slider (min-max)
- Specification: 0-5000 ft range, 100 ft increments, "1,200 ft" display format
- URL: ?elevation=500-2000 (min-max pair)
- Mobile: 44x44px thumb targets (WCAG compliant)
n**Q3: Data backfill strategy - How to populate elevation_gain and suitability for 70 adventures?**
- Answer: Option A - Google Maps Elevation API (automated) + Manual suitability research
- Elevation Strategy: Google Maps Elevation API (free tier 2,500/day), script queries coordinates → exact elevation in feet
- Suitability Strategy: Manual research per destination (trail websites, reviews), 5-10 min each
- Effort: Script 2 hours + manual 10-15 hours = 3-4 days total
- Note: SPEC-07 builds filtering infrastructure ONLY. Destinations created sequentially in SPEC-08, 09, 10... (not all 70 at once)
n**Q4: Filter persistence - Should filter selections persist across browser sessions?**
- Answer: Option A - Reset on new session (filters empty unless URL has params)
- Behavior: Every new visit to /adventures/ shows empty filters
- Exception: If URL contains filter params (?season=fall), those are applied
- Rationale: Shareable URLs provide persistence, different users have different intents
- IndexedDB Usage: Only for offline caching of adventure data, NOT for filter state persistence
n**Q5: Offline indicator UI - Where/how should offline status appear?**
- Answer: Option A - Top banner with Kim's voice (auto-hide on reconnect)
- Placement: Fixed top banner, below header navigation
- Message: "You're offline, but don't worry - filters still work. Grand love ya!"
- Style: bg-brand-brown text-brand-cream with subtle icon
- Behavior: Appears on connection loss, auto-hides when connection returns
- Accessibility: role="status" aria-live="polite" for screen reader announcement

---

## Overview

Adventures Hub (/adventures/) enables filtering 70+ WV destinations by 5 criteria. Uses React + Astro islands with offline support for rural WV spotty cell service.

See full specification in spec-v2.0.md for complete details.

**Grand love ya!** 🦌🏔️
