# Implementation Plan: CaveTemplate Component

**Spec Version:** 1.0.0
**Plan Version:** 1.0.0
**Created:** 2025-12-30
**SPEC-ID:** SPEC-16

---

## Architecture Overview

CaveTemplate is a reusable Astro component (~475 lines) for West Virginia cave destination pages. It follows established patterns from SkiTemplate (773 lines) while introducing cave-specific sections for geological formations, tours, accessibility requirements, and safety guidelines.

**Key Architecture Decisions (from SPARC swarm):**
- 13 sections with white/cream background alternation
- Border-left accents: sign-green (tours/formations), brand-orange (safety/accessibility)
- Formation taxonomy with 14 geological types
- Tour difficulty with 4 levels and accessible color coding
- Third-party booking disclaimer pattern for commercial caves

---

## Component Structure

```
wv-wild-web/src/
├── types/
│   ├── cave-types.ts              # NEW (~280 lines) - Zod schemas + types
│   └── index.ts                   # UPDATE - Add cave-types barrel export
├── components/
│   └── templates/
│       └── CaveTemplate.astro     # NEW (~475 lines) - Main template
└── pages/
    └── destinations/              # FUTURE (SPEC-36, 37, 49)
        ├── seneca-caverns.astro
        ├── smoke-hole-caverns.astro
        └── lost-world-caverns.astro
```

---

## Implementation Phases

### Phase 1: Type System Foundation [PR-1]
**Scope:** Create cave-types.ts with all Zod schemas and TypeScript types

- [ ] Create `cave-types.ts` file structure with JSDoc header
- [ ] Implement FormationType enum (14 types) with labels/descriptions
- [ ] Implement TourDifficulty enum (4 levels) with color mappings
- [ ] Implement sub-schemas:
  - CaveTourSchema
  - CaveFormationSchema
  - CaveConditionsSchema
  - CaveAccessibilitySchema
  - CavePricingSchema
  - CaveHoursSchema
  - CaveSafetySchema
  - CaveHistorySchema
- [ ] Implement CaveTemplatePropsSchema (main props)
- [ ] Add helper functions (getTourDifficultyColor, getFormationTypeLabel)
- [ ] Add type guards (isCaveAdventure)
- [ ] Update types/index.ts barrel export

**Estimated LOC:** ~280 lines
**Dependencies:** adventure.ts (existing shared types)

### Phase 2: Template Structure [PR-2]
**Scope:** Create CaveTemplate.astro skeleton with hero and core sections

- [ ] Create CaveTemplate.astro with imports and prop destructuring
- [ ] Implement helper functions in frontmatter
- [ ] Implement Section 1: Hero
- [ ] Implement Section 2: Description Prose
- [ ] Implement Section 3: Tour Information (with difficulty badges)
- [ ] Implement Section 4: Notable Formations (with formation grid)
- [ ] Implement Section 5: Conditions & Preparation

**Estimated LOC:** ~225 lines
**Dependencies:** Phase 1 complete

### Phase 3: Safety & Integration [PR-3]
**Scope:** Complete remaining sections and shared component integration

- [ ] Implement Section 6: Accessibility (orange accents)
- [ ] Implement Section 7: Pricing & Hours
- [ ] Implement Section 8: Safety Guidelines (orange accents)
- [ ] Implement Section 9: History & Geology
- [ ] Implement Section 10: Nearby Attractions (conditional)
- [ ] Implement Section 11-13: Shared component integrations
  - AdventureGearChecklist
  - AdventureRelatedShop
  - AdventureCTA
- [ ] Add third-party disclaimer footer
- [ ] Add booking disclaimer pattern
- [ ] Add prefers-reduced-motion CSS block

**Estimated LOC:** ~250 lines
**Dependencies:** Phase 2 complete

### Phase 4: Testing & Polish
**Scope:** Validation, accessibility testing, and documentation

- [ ] Create cave-types.test.ts with Zod validation tests
- [ ] Test template with mock cave data
- [ ] Run Lighthouse accessibility audit (target: 100)
- [ ] Verify WCAG AA color contrast compliance
- [ ] Keyboard navigation testing
- [ ] Update types/index.ts with cave-types exports
- [ ] Run build to verify no TypeScript errors

**Estimated LOC:** ~50 lines (tests)
**Dependencies:** Phase 3 complete

---

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Formation taxonomy | 14 fixed types | Covers all WV cave formations from research; enables consistent badge styling |
| Tour difficulty colors | Green/Brown/Orange/Red | WCAG AA compliant with brown text on orange; matches WVWO palette |
| External booking | Link out with disclaimer | Caves are separate businesses; WVWO is not a booking agent |
| Border-left accents | 4px solid | Consistent with SkiTemplate pattern; visual hierarchy |
| Orange badge text | brand-brown (not white) | White fails WCAG AA (2.45:1); brown passes (4.87:1) |
| Section backgrounds | Alternating white/cream | Consistent with existing templates; visual rhythm |
| Formations section | Optional (can be empty) | Some caves may not list formations in v1 |
| Photo gallery | Deferred to v2 | Text-only for initial release; reduces complexity |

---

## Dependencies

### External
- None (pure Astro/TypeScript component)

### Internal (Existing - No Changes Needed)
- `src/types/adventure.ts` - StatItem, GearItem, RelatedCategory, NearbyAttraction, Coordinates
- `src/components/adventure/AdventureGearChecklist.astro`
- `src/components/adventure/AdventureRelatedShop.astro`
- `src/components/adventure/AdventureCTA.astro`

### Downstream (Will Use This Template - Future SPECs)
- SPEC-36: Seneca Caverns destination page
- SPEC-37: Smoke Hole Caverns destination page
- SPEC-49: Lost World Caverns destination page

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Orange contrast issues | Low | Medium | Architecture doc specifies brown text; test with WebAIM |
| Type mismatches with adventure.ts | Low | Low | Import and extend existing types; test integration |
| Formation taxonomy gaps | Low | Low | 'other' type as catch-all; can extend later |
| Third-party URL changes | Medium | Low | Display "visit official site" fallback if no URL |
| Template too large (>500 LOC) | Medium | Medium | Spec targets 475; split to 3 PRs if needed |

---

## PR Strategy

**Estimated Total LOC:** ~755 lines (excluding tests)

### Recommended PR Breakdown:

| PR | Scope | LOC | Checkpoint |
|----|-------|-----|------------|
| **PR-1** | cave-types.ts (Zod schemas + types) | ~280 | Types compile, tests pass |
| **PR-2** | CaveTemplate sections 1-5 (Hero through Conditions) | ~225 | Template renders with mock data |
| **PR-3** | CaveTemplate sections 6-13 + integration | ~250 | Full template complete |

**Checkpoint Triggers:**
- ⚠️ Warn at 300 LOC per PR
- 🛑 Split required at 500 LOC per PR

### PR Naming Convention:
```
feat(SPEC-16): Phase 1 - Cave type system
feat(SPEC-16): Phase 2 - CaveTemplate hero and core sections
feat(SPEC-16): Phase 3 - CaveTemplate safety and integration
```

---

## Testing Strategy

### Unit Tests (cave-types.test.ts)
- [ ] CaveTemplatePropsSchema validates complete data
- [ ] CaveTemplatePropsSchema rejects invalid data
- [ ] FormationType enum covers all 14 types
- [ ] TourDifficulty color mappings return correct classes
- [ ] Helper functions return expected values

### Visual Regression (Manual)
- [ ] Hero section renders with stats grid
- [ ] Formation grid layout (3-col desktop, 2-col tablet, 1-col mobile)
- [ ] Accessibility section orange accents visible
- [ ] Safety section orange accents visible
- [ ] Difficulty badges show correct colors

### Accessibility Tests
- [ ] Lighthouse accessibility score: 100
- [ ] All sections have aria-labelledby
- [ ] Focus states visible on all links/buttons
- [ ] Orange badges use brown text (not white)
- [ ] prefers-reduced-motion respected

### Integration Tests
- [ ] AdventureGearChecklist renders with cave gear
- [ ] AdventureRelatedShop renders with shop categories
- [ ] AdventureCTA renders with custom cave props
- [ ] External links have rel="noopener noreferrer"

---

## Rollback Plan

### If Issues in Production:
1. **Immediate:** Template is self-contained; no downstream pages depend on it yet
2. **Revert:** `git revert <commit>` for any problematic PR
3. **No database/API impact:** Pure static component
4. **Fallback:** Destination pages can render without template while fixing

### If Type Errors:
1. Cave pages (SPEC-36, 37, 49) are not yet implemented
2. No existing code depends on cave-types.ts
3. Safe to iterate on types before downstream use

---

## File Checklist

### New Files to Create:
- [ ] `wv-wild-web/src/types/cave-types.ts`
- [ ] `wv-wild-web/src/components/templates/CaveTemplate.astro`
- [ ] `wv-wild-web/src/types/__tests__/cave-types.test.ts` (optional)

### Files to Update:
- [ ] `wv-wild-web/src/types/index.ts` (add cave-types export)

### No Changes Needed:
- `src/components/adventure/AdventureGearChecklist.astro`
- `src/components/adventure/AdventureRelatedShop.astro`
- `src/components/adventure/AdventureCTA.astro`
- `src/types/adventure.ts`

---

## Constitutional Compliance

| Principle | Status | Verification |
|-----------|--------|--------------|
| Simplicity | ✅ Pass | Template-based, no complex state management |
| Tech Stack | ✅ Pass | Astro + TypeScript + Tailwind only |
| Free-Tier | ✅ Pass | No external services; pure static component |
| Voice | ✅ Pass | funFact in neutral voice, kimNote in Kim's voice |
| WVWO Aesthetic | ✅ Pass | rounded-sm only, brand colors, proper fonts |
| Mobile First | ✅ Pass | Responsive grids with mobile-first breakpoints |
| Quality Over Speed | ✅ Pass | Full spec, architecture docs, phased PRs |

---

## Quick Reference: Build Sequence

```
1. [PR-1] Create cave-types.ts
   └── Run: npm run typecheck
   └── Run: npm run test (if tests added)

2. [PR-2] Create CaveTemplate.astro (Hero through Conditions)
   └── Create mock data for testing
   └── Run: npm run dev (visual verify)

3. [PR-3] Complete CaveTemplate.astro (Safety through CTA)
   └── Run: npm run build (full build)
   └── Run: Lighthouse (accessibility)
   └── Delete mock data file

4. Ready for SPEC-36, 37, 49 destination pages
```

---

**Plan Status:** Complete
**Next Command:** `/speckit.tasks` to generate task breakdown with [P] markers
