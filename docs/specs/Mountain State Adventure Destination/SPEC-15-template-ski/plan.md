# SPEC-15 Implementation Plan: Ski Resort Template

**Created:** 2025-12-30
**Plan Version:** 2.0.0 (Post-Implementation Verification)
**Based on:** Architecture Swarm Output + speckit.plan Verification

---

## Implementation Status: ✅ MOSTLY COMPLETE

Core implementation completed. Gaps identified via speckit.plan verification.

---

## Acceptance Criteria Verification

### Template Structure

| Criterion | Status | Evidence |
|-----------|--------|----------|
| ~550-600 lines total | ❌ FAIL | 741 lines (141 over target) |
| All 9+ sections implemented | ✅ PASS | 15+ sections found in template |
| TypeScript props with Zod | ✅ PASS | ski-types.ts complete |
| Responsive grid layouts | ✅ PASS | Mobile-first grids present |

### WVWO Aesthetic Compliance

| Criterion | Status | Evidence |
|-----------|--------|----------|
| rounded-sm only (no md/lg/xl) | ✅ PASS | 0 forbidden classes |
| Trail difficulty with shapes | ✅ PASS | TRAIL_DIFFICULTY_SHAPES used |
| Border-left accents (border-l-4) | ✅ PASS | 8 occurrences |
| Pricing in grid format | ✅ PASS | Grid layout verified |
| Kim's Tips use font-hand | ❌ FAIL | Section missing entirely |
| Zero forbidden fonts | ✅ PASS | Only approved fonts |
| Zero purple/pink/neon | ✅ PASS | None found |

### Functionality

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Conditional rendering | ✅ PASS | terrainParks, summer, dining conditional |
| Snow conditions link | ✅ PASS | conditionsUrl + widgetEmbed |
| Booking URL for lodging | ✅ PASS | bookingUrl renders with target="_blank" |
| Trail map link in header | ✅ PASS | Hero section, brand-orange button |
| Pass affiliations displayed | ✅ PASS | Indy Pass with days/tier |

### Accessibility

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Trail: color + shape + text | ✅ PASS | All three elements |
| All images have alt text | ✅ PASS | imageAlt prop used |
| Heading hierarchy | ✅ PASS | h1 → h2 → h3 verified |
| prefers-reduced-motion | ⚠️ PARTIAL | Only 1 occurrence |
| Kim's Tips role="note" | ❌ FAIL | Section doesn't exist |

### Testing

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Content validates | ✅ PASS | Build succeeded |
| Component renders | ✅ PASS | 62 pages built |
| Mobile responsive | ⚠️ NEEDS VISUAL | Grid layouts present |
| Desktop layout | ⚠️ NEEDS VISUAL | Grid layouts present |

---

## Gaps Requiring Action

### Priority 1: Missing Core Feature

**Kim's Tips Section** (Core Requirement #10 in spec)
- Add optional `kimTips?: { tip: string; context?: string }[]` prop to ski-types.ts
- Create callout boxes with:
  - `font-hand` for Kim's voice
  - `role="note"` for accessibility
  - `border-l-4 border-brand-orange` accent
  - `bg-brand-cream` background
- Insert after Description section
- Estimated: +40 lines to template, +10 lines to types

### Priority 2: Accessibility Gap

**prefers-reduced-motion Coverage**
- Current: 1 occurrence of motion classes
- Required: Add `motion-safe:` prefix to all `transition-*` and `hover:` animations
- Estimated: ~15 lines of changes

### Priority 3: Accepted Deviation

**Template Line Count**
- Target: 550-600 lines
- Actual: 741 lines
- Recommendation: **ACCEPT AS-IS**
- Rationale: Template is feature-complete, well-organized, and maintainable. Splitting would reduce readability.

---

## Files Created/Modified

| File | Lines | Status |
|------|-------|--------|
| `src/types/ski-types.ts` | ~200 | ✅ Complete |
| `src/components/templates/SkiTemplate.astro` | 741 | ⚠️ Missing Kim's Tips |
| `src/content/adventures/snowshoe-mountain.md` | ~335 | ✅ Complete |
| `src/content/adventures/canaan-valley.md` | ~280 | ✅ Complete |
| `src/content.config.ts` | +40 | ✅ Complete |
| `src/pages/near/snowshoe-mountain.astro` | ~80 | ✅ Complete |
| `src/pages/near/canaan-valley.astro` | ~80 | ✅ Complete |

**Total Implementation:** ~1,760 lines across 7 files

---

## Next Steps

1. [ ] Add Kim's Tips section to SkiTemplate.astro
2. [ ] Add `kimTips` prop to ski-types.ts
3. [ ] Add motion-safe/motion-reduce prefixes
4. [ ] Update spec.md acceptance criteria checkboxes
5. [ ] Visual testing (mobile/tablet/desktop)
6. [ ] Create PR for merge to main

---

## Original Architecture Plan (Reference)

<details>
<summary>Phase 3 Section Breakdown (Original)</summary>

| Section | Target Lines | Background | Actual |
|---------|--------------|------------|--------|
| 1. Hero | ~45 | Full-bleed image + overlay | ✅ |
| 2. Description | ~25 | bg-brand-cream | ✅ |
| 3. Trails | ~55 | bg-white | ✅ |
| 4. Lifts & Conditions | ~50 | bg-brand-cream | ✅ |
| 5. Pricing | ~65 | bg-white | ✅ |
| 6. Terrain Parks | ~40 | bg-brand-cream | ✅ Conditional |
| 7. Lodging | ~55 | bg-white | ✅ |
| 8. Dining | ~40 | bg-brand-cream | ✅ Conditional |
| 9. Summer Activities | ~35 | bg-white | ✅ Conditional |
| 10. Gear Checklist | ~30 | bg-brand-cream | ✅ |
| 11. Related Shop | ~25 | bg-white | ✅ |
| 12. CTA | ~20 | bg-sign-green | ✅ |
| **Frontmatter** | ~70 | - | ✅ |

**Original Target:** 555 lines
**Actual:** 741 lines (+186 over)

Extra sections added:
- Nordic Skiing (conditional)
- Safety Section
- Park Affiliation Footer
- Pass Affiliations display

</details>

---

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Line count | Accept 741 | Feature-complete, maintainable |
| Blue color | bg-blue-700 approved | Industry ski standard |
| Kim's Tips | After Description | Best context for insider tips |
| Snow widget | widgetEmbed prop | Optional iframe support |

---

## Risk Mitigation (Updated)

| Risk | Status | Mitigation |
|------|--------|------------|
| OnTheSnow widget slow | ⚠️ Untested | Lazy load planned |
| Blue color confusion | ✅ Mitigated | Exception documented in spec |
| Dynamic pricing staleness | ✅ Mitigated | lastUpdated shown, resort link |
| Template exceeds 600 lines | ✅ Accepted | Document exception |
| Missing Kim's Tips | ❌ Open | Implement before merge |
