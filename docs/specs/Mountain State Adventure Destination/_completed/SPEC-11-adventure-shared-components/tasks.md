# Tasks: Adventure Shared Components Bundle

**Plan Version:** 1.0.0
**Generated:** 2025-12-27
**Status:** Ready for Implementation

---

## Task Legend

- `[P]` Parallelizable - can run concurrently with other [P] tasks
- `[S]` Sequential - depends on previous tasks completing
- `[ ]` Not started
- `[X]` Completed
- `[~]` In progress

---

## Phase 1: Type System Foundation

**Objective:** Extend `adventure.ts` with schemas and types for SPEC-11 components

### T-001: Extend StatIconSchema
- [ ] [S] Add `circle` icon to `StatIconSchema` enum in `adventure.ts`
- **File:** `wv-wild-web/src/types/adventure.ts:130-139`
- **LOC:** ~2

### T-002: Extend STAT_ICON_PATHS
- [ ] [S] Add circle SVG path to `STAT_ICON_PATHS` mapping
- **File:** `wv-wild-web/src/types/adventure.ts:169-181`
- **LOC:** ~2
- **Depends on:** T-001

### T-003: Add GearItemSchema
- [ ] [P] Add `GearItemSchema` Zod schema and `GearItem` type
- **File:** `wv-wild-web/src/types/adventure.ts` (after STAT_ICON_PATHS)
- **LOC:** ~15

### T-004: Add GearColumns Type
- [ ] [P] Add `GearColumns` type alias (1 | 2 | 3)
- **File:** `wv-wild-web/src/types/adventure.ts` (after GearItem)
- **LOC:** ~2

### T-005: Add RelatedCategorySchema
- [ ] [P] Add `RelatedCategorySchema` Zod schema and `RelatedCategory` type
- **File:** `wv-wild-web/src/types/adventure.ts` (after GearColumns)
- **LOC:** ~15

### T-006: Verify Type Exports
- [ ] [S] Run `npm run typecheck` to verify all exports work
- **Depends on:** T-001 through T-005
- **LOC:** 0

<!-- PR-CHECKPOINT: Type System Foundation (~36 LOC) -->

---

## Phase 2: AdventureGettingThere Component

**Objective:** Create directions component with drive stats and Google Maps integration

### T-007: Create File with Props Interface
- [ ] [S] Create `AdventureGettingThere.astro` with frontmatter, imports, Props interface
- **File:** `wv-wild-web/src/components/adventure/AdventureGettingThere.astro`
- **LOC:** ~50
- **Depends on:** T-006

### T-008: Build Template Structure
- [ ] [S] Add section container, heading, directions card, drive stats, map button, slot
- **File:** `wv-wild-web/src/components/adventure/AdventureGettingThere.astro`
- **LOC:** ~70
- **Depends on:** T-007

### T-009: Add Scoped Styles
- [ ] [S] Add gentle-reveal animation with prefers-reduced-motion
- **File:** `wv-wild-web/src/components/adventure/AdventureGettingThere.astro`
- **LOC:** ~22
- **Depends on:** T-008

**Component Total:** ~142 LOC

<!-- PR-CHECKPOINT: AdventureGettingThere (~142 LOC) -->

---

## Phase 3: AdventureGearChecklist Component

**Objective:** Create gear checklist with required/optional distinction and responsive grid

### T-010: Create File with Props Interface
- [ ] [P] Create `AdventureGearChecklist.astro` with frontmatter, imports, Props interface
- **File:** `wv-wild-web/src/components/adventure/AdventureGearChecklist.astro`
- **LOC:** ~55
- **Depends on:** T-006 (types exist)

### T-011: Build Template Structure
- [ ] [S] Add section container, heading, intro, gear grid with required/optional icons, footer slot
- **File:** `wv-wild-web/src/components/adventure/AdventureGearChecklist.astro`
- **LOC:** ~60
- **Depends on:** T-010

### T-012: Add Scoped Styles
- [ ] [S] Add gentle-reveal animation with prefers-reduced-motion
- **File:** `wv-wild-web/src/components/adventure/AdventureGearChecklist.astro`
- **LOC:** ~22
- **Depends on:** T-011

**Component Total:** ~137 LOC

<!-- PR-CHECKPOINT: AdventureGearChecklist (~137 LOC) -->

---

## Phase 4: AdventureRelatedShop Component

**Objective:** Create shop categories component with hover effects and CTA

### T-013: Create File with Props Interface
- [ ] [P] Create `AdventureRelatedShop.astro` with frontmatter, imports, Props interface
- **File:** `wv-wild-web/src/components/adventure/AdventureRelatedShop.astro`
- **LOC:** ~50
- **Depends on:** T-006 (types exist)

### T-014: Build Template Structure
- [ ] [S] Add section container, heading, intro, category cards grid, CTA button
- **File:** `wv-wild-web/src/components/adventure/AdventureRelatedShop.astro`
- **LOC:** ~55
- **Depends on:** T-013

### T-015: Add Scoped Styles with Hover Effects
- [ ] [S] Add gentle-reveal animation, card hover effects, prefers-reduced-motion
- **File:** `wv-wild-web/src/components/adventure/AdventureRelatedShop.astro`
- **LOC:** ~35
- **Depends on:** T-014

**Component Total:** ~140 LOC

<!-- PR-CHECKPOINT: AdventureRelatedShop (~140 LOC) -->

---

## Phase 5: Integration & Testing

**Objective:** Verify components work in summersville-lake.astro

### T-016: Add Imports to summersville-lake.astro
- [ ] [S] Add component and type imports
- **File:** `wv-wild-web/src/pages/near/summersville-lake.astro`
- **LOC:** ~5
- **Depends on:** T-009, T-012, T-015

### T-017: Add Test Data
- [ ] [S] Add `summersvilleGear[]` and `summersvilleCategories[]` arrays
- **File:** `wv-wild-web/src/pages/near/summersville-lake.astro`
- **LOC:** ~20
- **Depends on:** T-016

### T-018: Replace Hardcoded Sections
- [ ] [S] Replace "Getting There" and "What to Bring" sections with components
- **File:** `wv-wild-web/src/pages/near/summersville-lake.astro`
- **LOC:** ~30 (net reduction from removing hardcoded)
- **Depends on:** T-017

### T-019: Add AdventureRelatedShop Section
- [ ] [S] Add new related shop section after gear checklist
- **File:** `wv-wild-web/src/pages/near/summersville-lake.astro`
- **LOC:** ~10
- **Depends on:** T-018

### T-020: Visual Testing Checklist
- [ ] [P] Test all viewports (375px, 768px, 1280px)
- [ ] [P] Verify component rendering
- [ ] [P] Test reduced-motion mode
- [ ] [P] Verify focus states
- **Depends on:** T-019

### T-021: Accessibility Audit
- [ ] [S] Run axe-core audit
- [ ] [S] Verify keyboard navigation
- [ ] [S] Check WCAG 2.1 AA compliance
- **Depends on:** T-020

### T-022: Final Build Verification
- [ ] [S] Run `npm run build` and verify no errors
- [ ] [S] Run `npm run typecheck` clean
- **Depends on:** T-021

<!-- PR-CHECKPOINT: Integration & Testing (~65 LOC, but replaces ~120 LOC hardcoded) -->

---

## PR Summary

| PR | Phase | Scope | Est. LOC | Tasks |
|----|-------|-------|----------|-------|
| 1 | All | Full SPEC-11 Implementation | ~315 | 22 |

**Recommended Strategy:** Single PR with all changes

**Rationale:**
- All types needed before any component works
- Components are interdependent with shared patterns
- Integration testing validates all components together
- Total LOC well within reasonable PR size

---

## Parallelization Opportunities

### Fully Parallel After Types (T-006):
```
T-007 (GettingThere Props)  ←──┐
T-010 (GearChecklist Props) ←──┼── Can run in parallel
T-013 (RelatedShop Props)   ←──┘
```

### Sequential Within Components:
```
Props → Template → Styles (must be sequential per component)
```

### Integration Must Be Last:
```
All Components Complete → Integration → Testing → Build Verification
```

---

## Dependencies Graph

```
[T-001: StatIconSchema]
         │
         v
[T-002: STAT_ICON_PATHS]
         │
         ├──────────────┬──────────────┐
         v              v              v
[T-003: GearItem]  [T-004: Cols]  [T-005: Category]
         │              │              │
         └──────────────┴──────────────┘
                        │
                        v
               [T-006: typecheck]
                        │
         ┌──────────────┼──────────────┐
         v              v              v
   [T-007-009]    [T-010-012]    [T-013-015]
   GettingThere   GearChecklist  RelatedShop
         │              │              │
         └──────────────┴──────────────┘
                        │
                        v
         [T-016-019: Integration]
                        │
                        v
         [T-020-021: Testing]
                        │
                        v
           [T-022: Build Verify]
```

---

## Estimated Effort

| Phase | Sequential Time | With Parallelism |
|-------|-----------------|------------------|
| Phase 1: Types | 20 min | 15 min |
| Phase 2: GettingThere | 45 min | 45 min |
| Phase 3: GearChecklist | 45 min | 30 min (parallel start) |
| Phase 4: RelatedShop | 45 min | 30 min (parallel start) |
| Phase 5: Integration | 30 min | 30 min |
| **Total** | **~3 hours** | **~2.5 hours** |

---

## Risk Mitigation

| Risk | Detection | Mitigation |
|------|-----------|------------|
| Type import errors | T-006 typecheck | Verify exports before components |
| Icon not rendering | Visual test at T-020 | Check STAT_ICON_PATHS mapping |
| Slot content missing | Visual test at T-020 | Verify slot name matches |
| Animation jank | T-020 reduced-motion test | Use transform/opacity only |
| WVWO style violation | PR review | Self-check before T-022 |

---

## WVWO Aesthetic Checklist (Pre-PR)

Before marking T-022 complete, verify:

- [ ] `rounded-sm` ONLY (no rounded-md/lg)
- [ ] Brand colors only (brand-brown, sign-green, brand-cream, brand-mud, brand-orange)
- [ ] `font-display` for all headings
- [ ] `font-body` for all content text
- [ ] `transition-colors duration-300` on interactive elements
- [ ] No glassmorphism or backdrop-blur
- [ ] No purple, pink, or neon colors
- [ ] No Inter, Poppins, DM Sans fonts

---

## References

- [spec.md](./spec.md) - Full requirements specification
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture decisions
- [plan.md](./plan.md) - Detailed implementation plan
- [AdventureQuickStats.astro](../../../../wv-wild-web/src/components/adventure/AdventureQuickStats.astro) - Pattern reference
