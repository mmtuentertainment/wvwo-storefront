# Tasks: CaveTemplate Component

**Plan Version:** 1.0.0
**Generated:** 2025-12-30
**Status:** Ready for Implementation
**SPEC-ID:** SPEC-16

---

## Task Legend

- `[P]` Parallelizable - can run concurrently with other [P] tasks
- `[S]` Sequential - depends on previous tasks
- `[ ]` Not started
- `[X]` Completed
- `[~]` In progress

---

## Phase 1: Type System Foundation

### T-001: File Structure Setup

- [ ] [S] Create `wv-wild-web/src/types/cave-types.ts` with JSDoc header and imports

### T-002: Formation Type Enum (~40 lines)

- [ ] [P] Implement `FormationTypeSchema` Zod enum (14 types)
- [ ] [P] Create `FORMATION_TYPE_LABELS` constant record
- [ ] [P] Create `FORMATION_TYPE_DESCRIPTIONS` constant record

### T-003: Tour Difficulty Enum (~35 lines)

- [ ] [P] Implement `TourDifficultySchema` Zod enum (4 levels)
- [ ] [P] Create `TOUR_DIFFICULTY_COLORS` border classes record
- [ ] [P] Create `TOUR_DIFFICULTY_BADGES` background classes record
- [ ] [P] Create `TOUR_DIFFICULTY_LABELS` display names record

### T-004: Sub-Schemas - Tours & Formations (~60 lines)

- [ ] [S] Implement `CaveTourSchema` with all fields
- [ ] [P] Implement `CaveFormationSchema` with funFact/kimNote voice distinction

### T-005: Sub-Schemas - Conditions & Accessibility (~50 lines)

- [ ] [P] Implement `CaveConditionsSchema` (temperature, humidity, whatToWear/Bring)
- [ ] [P] Implement `CaveAccessibilitySchema` (requirements, limitations, accommodations)

### T-006: Sub-Schemas - Operational (~45 lines)

- [ ] [P] Implement `CavePricingSchema`
- [ ] [P] Implement `CaveHoursSchema`
- [ ] [P] Implement `CaveSafetySchema` (rules, prohibited, emergencyContact)
- [ ] [P] Implement `CaveHistorySchema`

### T-007: Main Props Schema (~50 lines)

- [ ] [S] Implement `CaveTemplatePropsSchema` combining all sub-schemas
- [ ] [S] Export all types using `z.infer<typeof Schema>`
- [ ] [P] Add explicit interface export for IDE support

### T-008: Helper Functions (~30 lines)

- [ ] [P] Create `getTourDifficultyColor()` function
- [ ] [P] Create `getTourDifficultyBadge()` function
- [ ] [P] Create `getFormationTypeLabel()` function
- [ ] [P] Create `isCaveAdventure()` type guard

### T-009: Barrel Export

- [ ] [S] Update `wv-wild-web/src/types/index.ts` to export cave-types

<!-- PR-CHECKPOINT: PR-1 Type System (~280 LOC) -->

---

## Phase 2: Template Structure (Hero through Conditions)

### T-010: Template Setup (~20 lines)

- [ ] [S] Create `CaveTemplate.astro` with imports and props interface
- [ ] [P] Add frontmatter helper functions (getMapUrl, formatPhoneForLink)
- [ ] [P] Import shared adventure components

### T-011: Hero Section (~45 lines)

- [ ] [S] Implement hero section with image overlay (bg-brand-brown/50)
- [ ] [P] Add cave name, tagline, location with proper typography
- [ ] [P] Implement stats grid (depth, temperature, discovery year, county)
- [ ] [P] Add quick highlights badges (bg-sign-green)

### T-012: Description Prose Section (~15 lines)

- [ ] [S] Implement centered description prose section
- [ ] [P] Apply bg-brand-cream background
- [ ] [P] Use font-body with leading-relaxed

### T-013: Tour Information Section (~70 lines)

- [ ] [S] Implement section structure with aria-labelledby="tours-heading"
- [ ] [P] Create tour card grid (md:grid-cols-2)
- [ ] [P] Implement difficulty badge with getTourDifficultyClass()
- [ ] [P] Add border-left accents (sign-green for easy/moderate, orange for strenuous, red for wild)
- [ ] [P] Implement tour highlights badges
- [ ] [S] Add external booking CTA with disclaimer text

### T-014: Formations Section (~50 lines)

- [ ] [S] Implement formations grid (lg:grid-cols-3, md:grid-cols-2)
- [ ] [P] Create formation cards with type badges (font-body text-sign-green)
- [ ] [P] Add funFact rendering (font-hand styling for Kim's tips)
- [ ] [S] Add conditional rendering for empty formations array

### T-015: Conditions Section (~45 lines)

- [ ] [S] Implement two-column layout (Conditions | What to Bring)
- [ ] [P] Add temperature and humidity display
- [ ] [P] Implement whatToWear checklist (✓ icons)
- [ ] [P] Implement whatToBring bullet list (• icons)
- [ ] [P] Apply border-l-4 border-sign-green accent

<!-- PR-CHECKPOINT: PR-2 Hero through Conditions (~225 LOC) -->

---

## Phase 3: Safety & Integration

### T-016: Accessibility Section (~55 lines)

- [ ] [S] Implement accessibility section with orange accent (border-brand-orange)
- [ ] [P] Create physical requirements list
- [ ] [P] Create limitations list
- [ ] [P] Add accommodations subsection (conditional)
- [ ] [P] Add medical disclaimer block (conditional)
- [ ] [P] Apply WCAG AA compliant styling (orange accent for visibility)

### T-017: Pricing & Hours Section (~50 lines)

- [ ] [S] Implement two-column layout (Pricing | Hours)
- [ ] [P] Create pricing tiers display with border-l-sign-green
- [ ] [P] Create seasonal hours cards with border-l-brand-brown
- [ ] [P] Add external pricing link with disclaimer

### T-018: Safety Section (~45 lines)

- [ ] [S] Implement safety section with orange accent (border-brand-orange)
- [ ] [P] Create rules list (• bullet icons)
- [ ] [P] Create prohibited items list (✕ X icons)
- [ ] [S] Add emergency contact block (conditional, clickable tel: link)

### T-019: History Section (~40 lines)

- [ ] [S] Implement two-column history layout
- [ ] [P] Add discovery story prose
- [ ] [P] Add geological age context
- [ ] [P] Add notable events list (conditional)
- [ ] [P] Add local legends in italics (conditional)

### T-020: Nearby Attractions Section (~30 lines)

- [ ] [S] Implement nearby attractions grid (conditional rendering)
- [ ] [P] Create attraction cards with distance display
- [ ] [P] Apply border-l-sign-green accent

### T-021: Shared Components Integration (~25 lines)

- [ ] [S] Integrate AdventureGearChecklist with cave-specific props
- [ ] [P] Integrate AdventureRelatedShop (conditional)
- [ ] [P] Integrate AdventureCTA with cave-specific heading/description

### T-022: Disclaimers & Footer (~30 lines)

- [ ] [S] Add booking disclaimer block (after Tours section)
- [ ] [S] Add third-party business disclaimer footer
- [ ] [P] Add prefers-reduced-motion CSS block

<!-- PR-CHECKPOINT: PR-3 Safety & Integration (~275 LOC) -->

---

## Phase 4: Testing & Polish

### T-023: Type Validation Tests

- [ ] [P] Create `cave-types.test.ts` file structure
- [ ] [P] Test CaveTemplatePropsSchema validates complete data
- [ ] [P] Test CaveTemplatePropsSchema rejects invalid data
- [ ] [P] Test helper functions return expected values

### T-024: Build Verification

- [ ] [S] Run `npm run build` - verify no TypeScript errors
- [ ] [S] Run `npm run typecheck` - verify types compile
- [ ] [P] Verify all imports resolve correctly

### T-025: Accessibility Audit

- [ ] [S] Run Lighthouse accessibility audit (target: 100)
- [ ] [P] Verify all sections have aria-labelledby
- [ ] [P] Verify focus states on all interactive elements
- [ ] [P] Verify orange badges use brown text (not white)
- [ ] [P] Test prefers-reduced-motion behavior

### T-026: Manual Testing Checklist

- [ ] [P] Verify hero section renders with stats grid
- [ ] [P] Verify formation grid responsive layout (3→2→1 columns)
- [ ] [P] Verify difficulty badges show correct colors
- [ ] [P] Verify accessibility section orange accents visible
- [ ] [P] Verify safety section orange accents visible
- [ ] [P] Verify external links have rel="noopener noreferrer"

<!-- PR-CHECKPOINT: PR-4 Testing & Polish (~50 LOC) -->

---

## PR Summary

| PR | Scope | Est. LOC | Tasks | Checkpoint |
|----|-------|----------|-------|------------|
| **PR-1** | Type System (cave-types.ts) | ~280 | T-001 to T-009 | Types compile |
| **PR-2** | Hero through Conditions | ~225 | T-010 to T-015 | Template renders |
| **PR-3** | Safety & Integration | ~275 | T-016 to T-022 | Full template |
| **PR-4** | Testing & Polish | ~50 | T-023 to T-026 | Lighthouse 100 |

**Total Estimated LOC:** ~830 lines (including tests)
**Total Tasks:** 26 task groups, 80+ subtasks
**Recommended PRs:** 4
**Parallelizable Ratio:** ~65% [P] tasks

---

## Dependencies Graph

```
[T-001 File Setup]
      │
      ▼
┌─────────────────────────────────────────────────┐
│  [T-002 FormationType] [P]                      │
│  [T-003 TourDifficulty] [P]                     │
│  [T-004 Tour/Formation Schemas] [P]             │
│  [T-005 Conditions/Accessibility Schemas] [P]   │
│  [T-006 Operational Schemas] [P]                │
└─────────────────────────────────────────────────┘
      │
      ▼
[T-007 Main Props Schema]
      │
      ▼
[T-008 Helper Functions] [P]
      │
      ▼
[T-009 Barrel Export]
      │
      ▼
═══════════════════════════════════════════════════
                 PR-1 CHECKPOINT
═══════════════════════════════════════════════════
      │
      ▼
[T-010 Template Setup]
      │
      ▼
┌─────────────────────────────────────────────────┐
│  [T-011 Hero] ──────────▶ [T-012 Description]   │
│       │                                          │
│       ▼                                          │
│  [T-013 Tours] ─────────▶ [T-014 Formations]    │
│       │                          │               │
│       ▼                          ▼               │
│  [T-015 Conditions]                              │
└─────────────────────────────────────────────────┘
      │
      ▼
═══════════════════════════════════════════════════
                 PR-2 CHECKPOINT
═══════════════════════════════════════════════════
      │
      ▼
[T-016 Accessibility]
      │
      ▼
┌─────────────────────────────────────────────────┐
│  [T-017 Pricing/Hours] [P]                      │
│  [T-018 Safety] [P]                             │
│  [T-019 History] [P]                            │
│  [T-020 Nearby] [P]                             │
└─────────────────────────────────────────────────┘
      │
      ▼
[T-021 Shared Components]
      │
      ▼
[T-022 Disclaimers]
      │
      ▼
═══════════════════════════════════════════════════
                 PR-3 CHECKPOINT
═══════════════════════════════════════════════════
      │
      ▼
┌─────────────────────────────────────────────────┐
│  [T-023 Tests] [P]                              │
│  [T-024 Build Verification]                     │
│  [T-025 Accessibility Audit]                    │
│  [T-026 Manual Testing] [P]                     │
└─────────────────────────────────────────────────┘
      │
      ▼
═══════════════════════════════════════════════════
                 PR-4 CHECKPOINT
═══════════════════════════════════════════════════
```

---

## Parallel Execution Opportunities

### Within PR-1 (Types)

```
Concurrent: T-002, T-003, T-004, T-005, T-006
Then: T-007 (depends on all above)
Then: T-008 [P], T-009 [S]
```

### Within PR-2 (Hero through Conditions)

```
After T-010: T-011, T-012 can start
After T-011: T-013 can start
T-014 can run parallel to T-013
T-015 after T-014
```

### Within PR-3 (Safety & Integration)

```
After T-016: T-017, T-018, T-019, T-020 all parallel
Then: T-021, T-022 sequential
```

---

## Critical Path

The minimum sequential path:

```
T-001 → T-007 → T-009 → T-010 → T-011 → T-013 → T-016 → T-021 → T-022 → T-024 → T-025
```

**Critical Path Length:** 11 tasks
**Estimated Critical Time:** ~8-10 hours focused work

---

## Notes

### Before Starting

- [ ] Ensure adventure.ts types are stable (StatItem, GearItem, etc.)
- [ ] Review SkiTemplate.astro for pattern reference
- [ ] Have cave research data available for testing

### Blockers

- None identified - this is a standalone component

### Post-Implementation

- SPEC-36, 37, 49 (destination pages) can begin after PR-3
- Photo gallery enhancement can be added in future SPEC

---

## Quick Reference: Task Counts

| Phase | Sequential | Parallelizable | Total |
|-------|------------|----------------|-------|
| Phase 1 | 4 | 22 | 26 |
| Phase 2 | 6 | 18 | 24 |
| Phase 3 | 5 | 16 | 21 |
| Phase 4 | 3 | 10 | 13 |
| **Total** | **18** | **66** | **84** |

**Parallelization Ratio:** 78% (66/84 subtasks)

---

**Tasks Status:** Ready for Implementation
**Next Command:** Start with PR-1 tasks (T-001 through T-009)
