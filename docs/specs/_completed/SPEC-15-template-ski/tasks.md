# Tasks: SPEC-15 Ski Resort Template

**Plan Version:** 2.0.0
**Generated:** 2025-12-30
**Status:** Post-Implementation Verification (Retroactive Task Tracking)

## Task Legend

- `[P]` Parallelizable - can run concurrently with other [P] tasks
- `[S]` Sequential - depends on previous tasks
- `[ ]` Not started
- `[X]` Completed
- `[~]` In progress

---

## Phase 1: Research & Planning

### T-001: Research

- [X] [P] T-001a: Analyze Snowshoe Mountain content patterns
- [X] [P] T-001b: Analyze Canaan Valley positioning (state park, family focus)
- [X] [P] T-001c: Research ski website UX best practices (trail difficulty, pricing)
- [X] [P] T-001d: Analyze existing RiverTemplate/LakeTemplate patterns for reuse

### T-002: Clarifications (5 Questions Resolved)

- [X] [S] T-002a: Resolve blue color exception for trail difficulty (bg-blue-700 approved)
- [X] [S] T-002b: Resolve snow widget approach (embed OnTheSnow/MountainNews iframe)
- [X] [S] T-002c: Resolve seasonal content switching (conditional sections pattern)
- [X] [S] T-002d: Resolve lodging/dining requirements (lodging min 1, dining optional)
- [X] [S] T-002e: Resolve dynamic pricing display ("From $XX" with isDynamic flag)

<!-- PR-CHECKPOINT: Research Complete (~0 LOC, documentation only) -->

---

## Phase 2: Architecture & Types

### T-003: Type Definitions

- [X] [S] T-003a: Create `src/types/ski-types.ts` with Zod schemas
- [X] [P] T-003b: Define ElevationSchema (base, summit, vertical)
- [X] [P] T-003c: Define SkiSeasonSchema (open, close)
- [X] [P] T-003d: Define TrailsSchema (total, beginner, intermediate, advanced, expert, acreage)
- [X] [P] T-003e: Define LiftsSchema (total, types array, capacity)
- [X] [P] T-003f: Define SnowConditionsSchema (averageSnowfall, snowmaking, conditionsUrl, widgetEmbed)
- [X] [P] T-003g: Define PricingSchema with isDynamic flag and lastUpdated
- [X] [P] T-003h: Define TerrainParkSchema (name, difficulty enum, features)
- [X] [P] T-003i: Define LodgingSchema with bookingUrl (REQUIRED min 1)
- [X] [P] T-003j: Define DiningSchema (OPTIONAL)
- [X] [P] T-003k: Define AmenitySchema (category, services)
- [X] [P] T-003l: Define SummerActivitySchema (OPTIONAL)
- [X] [P] T-003m: Define ParkAffiliationSchema (state_park | national_forest | private)
- [X] [P] T-003n: Define NordicSkiingSchema (onSite, nearbyFacilities)
- [X] [P] T-003o: Define PassAffiliationSchema (Indy Pass, Ikon, Epic)
- [X] [P] T-003p: Define SafetyInfoSchema (category, items, importance)
- [X] [P] T-003q: Define KimTipSchema (content, type: tip|warning|insider)

### T-004: Trail Difficulty Helpers

- [X] [S] T-004a: Create TRAIL_DIFFICULTY_COLORS constant (green, blue-700 exception, brown, red)
- [X] [S] T-004b: Create TRAIL_DIFFICULTY_SHAPES constant (●, ■, ◆, ◆◆)
- [X] [S] T-004c: Create getTrailDifficultyColor() helper function
- [X] [S] T-004d: Create getTrailDifficultyShape() helper function
- [X] [S] T-004e: Create getTrailDifficultyLabel() helper function

### T-005: Content Collection Integration

- [X] [S] T-005a: Update `src/content.config.ts` with ski type enum
- [X] [S] T-005b: Import ski-types schemas into content.config.ts
- [X] [S] T-005c: Add all ski-specific optional fields to adventures schema

<!-- PR-CHECKPOINT: Types & Schema (~250 LOC) -->

---

## Phase 3: Template Implementation

### T-006: SkiTemplate Core Structure

- [X] [S] T-006a: Create `src/components/templates/SkiTemplate.astro`
- [X] [S] T-006b: Add imports for Layout and adventure components
- [X] [S] T-006c: Define Props interface extending SkiTemplateProps
- [X] [S] T-006d: Destructure all props in frontmatter

### T-007: Core Requirement #1 - Hero Section

- [X] [S] T-007a: Implement hero with full-bleed image + overlay
- [X] [P] T-007b: Add resort name with font-display text-5xl
- [X] [P] T-007c: Add tagline with font-body
- [X] [P] T-007d: Add elevation stats (base/summit/vertical)
- [X] [P] T-007e: Add quickStats badges
- [X] [P] T-007f: Add season dates (open/close)
- [X] [P] T-007g: Add trail map button (bg-brand-orange, prominent)

### T-008: Core Requirement #2 - Trail Breakdown

- [X] [S] T-008a: Create trails section with bg-white
- [X] [P] T-008b: Display total trail count prominently
- [X] [P] T-008c: Display beginner count with green circle shape
- [X] [P] T-008d: Display intermediate count with blue square shape (bg-blue-700 exception)
- [X] [P] T-008e: Display advanced count with black diamond shape
- [X] [P] T-008f: Display expert count with double-black shape
- [X] [P] T-008g: Display acreage stat
- [X] [P] T-008h: Display longestRun if provided

### T-009: Core Requirement #3 - Lift System

- [X] [S] T-009a: Create lifts section within bg-brand-cream
- [X] [P] T-009b: Display total lift count
- [X] [P] T-009c: Display lift types breakdown (Quad, Triple, Double, Surface)
- [X] [P] T-009d: Display capacity stat if provided

### T-010: Core Requirement #4 - Snow Conditions

- [X] [S] T-010a: Create snow conditions subsection
- [X] [P] T-010b: Display averageSnowfall stat
- [X] [P] T-010c: Display snowmaking coverage stat
- [X] [P] T-010d: Add "View Snow Report" link with conditionsUrl
- [X] [P] T-010e: Add widgetEmbed iframe support with set:html

### T-011: Core Requirement #5 - Pricing Section

- [X] [S] T-011a: Create pricing section with bg-white
- [X] [S] T-011b: Add isDynamic conditional note ("Prices vary by date")
- [X] [P] T-011c: Display lastUpdated freshness indicator
- [X] [P] T-011d: Create lift tickets grid with type/price/notes
- [X] [P] T-011e: Create season pass grid with type/price/benefits
- [X] [P] T-011f: Create rentals grid if provided
- [X] [P] T-011g: Add pricing URL link to resort page

### T-012: Core Requirement #6 - Terrain Parks (Optional)

- [X] [S] T-012a: Create conditional terrainParks section (bg-brand-cream)
- [X] [P] T-012b: Display park name and difficulty badge
- [X] [P] T-012c: Display features list for each park

### T-013: Core Requirement #7 - Lodging Grid

- [X] [S] T-013a: Create lodging section with bg-white
- [X] [P] T-013b: Display lodging cards with name/type/distance
- [X] [P] T-013c: Display amenities list per lodging
- [X] [P] T-013d: Display priceRange if provided
- [X] [P] T-013e: Add "Book Now" button with bookingUrl (target="_blank")

### T-014: Core Requirement #8 - Dining & Amenities

- [X] [S] T-014a: Create conditional dining section (bg-brand-cream)
- [X] [P] T-014b: Display dining options with name/type/location/notes
- [X] [S] T-014c: Create amenities section
- [X] [P] T-014d: Display amenities by category with services list

### T-015: Core Requirement #9 - Summer Activities (Optional)

- [X] [S] T-015a: Create conditional summerActivities section (bg-white)
- [X] [P] T-015b: Display activity cards with name/description/season

### T-016: Core Requirement #10 - Kim's Tips (Optional)

- [X] [S] T-016a: Add KimTipSchema to ski-types.ts
- [X] [S] T-016b: Add kimTips prop to SkiTemplatePropsSchema
- [X] [S] T-016c: Add kimTips to SkiTemplateProps interface
- [X] [S] T-016d: Create conditional kimTips section after Description
- [X] [P] T-016e: Style with font-hand (Permanent Marker)
- [X] [P] T-016f: Add role="note" for accessibility
- [X] [P] T-016g: Add border-l-4 accent (brand-brown/orange/green by type)

### T-017: Shared Components Integration

- [X] [S] T-017a: Import AdventureGearChecklist component
- [X] [S] T-017b: Import AdventureRelatedShop component
- [X] [S] T-017c: Import AdventureCTA component
- [X] [S] T-017d: Add Gear Checklist section (bg-brand-cream)
- [X] [S] T-017e: Add Related Shop section (bg-white)
- [X] [S] T-017f: Add CTA section (bg-sign-green) with correct prop mapping

### T-018: Edge Case Sections (Optional)

- [X] [P] T-018a: Add conditional Nordic Skiing section
- [X] [P] T-018b: Add conditional Park Affiliation display
- [X] [P] T-018c: Add Pass Affiliations display in Description area
- [X] [P] T-018d: Add Safety section with importance-based styling

<!-- PR-CHECKPOINT: Template Complete (~770 LOC) -->

---

## Phase 4: Content Population

### T-019: Snowshoe Mountain Content

- [X] [S] T-019a: Create `src/content/adventures/snowshoe-mountain.md`
- [X] [P] T-019b: Add hero content (title, tagline, description, image)
- [X] [P] T-019c: Add elevation data (base: 4150, summit: 4848, vertical: 1500)
- [X] [P] T-019d: Add trails data (60 total, breakdown by difficulty)
- [X] [P] T-019e: Add lifts data (14 lifts, types breakdown)
- [X] [P] T-019f: Add snow conditions (180", 100% snowmaking)
- [X] [P] T-019g: Add pricing with isDynamic: true and "From $XX" prices
- [X] [P] T-019h: Add terrain parks (Silvercreek, Cupp Run)
- [X] [P] T-019i: Add lodging options with booking URLs
- [X] [P] T-019j: Add dining options
- [X] [P] T-019k: Add amenities by category
- [X] [P] T-019l: Add summer activities (bike park, golf, hiking)
- [X] [P] T-019m: Add gear list and related shop
- [X] [P] T-019n: Add safety information
- [X] [P] T-019o: Add widgetEmbed for OnTheSnow iframe
- [X] [P] T-019p: Add Kim's Tips content (3 tips: tip, insider, warning)

### T-020: Canaan Valley Content

- [X] [S] T-020a: Create `src/content/adventures/canaan-valley.md`
- [X] [P] T-020b: Add hero content (family-friendly positioning)
- [X] [P] T-020c: Add elevation data (base: 3800, summit: 4280, vertical: 850)
- [X] [P] T-020d: Add trails data (47 total, family-friendly distribution)
- [X] [P] T-020e: Add lifts data (5 lifts)
- [X] [P] T-020f: Add snow conditions (150", 100% primary terrain)
- [X] [P] T-020g: Add pricing with isDynamic: false and fixed prices
- [X] [P] T-020h: Add park affiliation (state_park)
- [X] [P] T-020i: Add lodging including state park options
- [X] [P] T-020j: Add dining options
- [X] [P] T-020k: Add amenities with state park features
- [X] [P] T-020l: Add gear list and related shop
- [X] [P] T-020m: Add safety information
- [X] [P] T-020n: Add widgetEmbed for OnTheSnow iframe
- [X] [P] T-020o: Add Kim's Tips content (3 tips focused on families)

<!-- PR-CHECKPOINT: Content Complete (~650 LOC in .md files) -->

---

## Phase 5: Page Routes & Integration

### T-021: Page Routes

- [X] [S] T-021a: Create `src/pages/near/snowshoe-mountain.astro`
- [X] [P] T-021b: Import getEntry from astro:content
- [X] [P] T-021c: Import SkiTemplate component
- [X] [P] T-021d: Map content data to SkiTemplateProps
- [X] [P] T-021e: Include kimTips in prop mapping
- [X] [S] T-021f: Create `src/pages/near/canaan-valley.astro`
- [X] [P] T-021g: Map content data to SkiTemplateProps
- [X] [P] T-021h: Include kimTips in prop mapping

### T-022: Build Verification

- [X] [S] T-022a: Run `npm run build` and verify 62+ pages
- [X] [S] T-022b: Fix any prop mapping errors (AdventureCTA props fixed)
- [X] [S] T-022c: Verify no TypeScript errors

<!-- PR-CHECKPOINT: Routes & Build (~180 LOC) -->

---

## Phase 6: Accessibility & Polish

### T-023: Accessibility Compliance

- [X] [S] T-023a: Add motion-safe: prefix to trail map button transition
- [X] [S] T-023b: Add motion-safe: prefix to snow conditions link transition
- [X] [S] T-023c: Add motion-safe: prefix to lodging booking button transition
- [X] [P] T-023d: Verify all images have alt text
- [X] [P] T-023e: Verify heading hierarchy (h1 → h2 → h3)
- [X] [P] T-023f: Verify trail difficulty uses color + shape + text

### T-024: WVWO Aesthetic Verification

- [X] [P] T-024a: Verify zero rounded-md/lg/xl (only rounded-sm)
- [X] [P] T-024b: Verify zero forbidden fonts (Inter, Poppins, etc.)
- [X] [P] T-024c: Verify zero purple/pink/neon colors
- [X] [P] T-024d: Verify border-l-4 accents on cards
- [X] [P] T-024e: Verify Kim's Tips use font-hand

<!-- PR-CHECKPOINT: Accessibility (~50 LOC changes) -->

---

## Phase 7: Testing & Documentation

### T-025: Visual Testing (Pending)

- [ ] [P] T-025a: Test mobile responsive (320px - 768px)
- [ ] [P] T-025b: Test tablet layout (768px - 1024px)
- [ ] [P] T-025c: Test desktop layout (1024px+)
- [ ] [P] T-025d: Verify trail difficulty colors render correctly
- [ ] [P] T-025e: Verify Kim's Tips styling (font-hand visible)

### T-026: Documentation Updates

- [X] [S] T-026a: Update spec.md acceptance criteria checkboxes
- [X] [S] T-026b: Document accepted deviation (770 lines vs 550-600 target)
- [X] [S] T-026c: Document blue color exception in spec
- [ ] [S] T-026d: Create PR for merge to main

<!-- PR-CHECKPOINT: Testing & Docs (~minimal LOC) -->

---

## PR Summary

| PR | Scope | Est. LOC | Tasks | Status |
|----|-------|----------|-------|--------|
| 1 | Types & Schema | ~250 | T-003, T-004, T-005 | ✅ Complete |
| 2 | Template Core | ~770 | T-006 through T-018 | ✅ Complete |
| 3 | Content Files | ~650 | T-019, T-020 | ✅ Complete |
| 4 | Routes & Build | ~180 | T-021, T-022 | ✅ Complete |
| 5 | Accessibility | ~50 | T-023, T-024 | ✅ Complete |
| 6 | Testing & PR | ~0 | T-025, T-026 | ⚠️ Partial |

**Total Implemented LOC:** ~1,900
**Recommended PRs:** 6 (5 complete, 1 in progress)

---

## Dependencies Graph

```
[T-001 Research] ─────────────────────────────────────────┐
       │                                                   │
       v                                                   v
[T-002 Clarifications] ──────────> [T-003 Type Definitions]
                                          │
                                          v
                                   [T-004 Trail Helpers]
                                          │
                                          v
                                   [T-005 Content Config]
                                          │
       ┌──────────────────────────────────┴──────────────────────────────────┐
       │                                                                      │
       v                                                                      v
[T-006-T-018 Template Implementation]                              [T-019-T-020 Content Files]
       │                                                                      │
       └──────────────────────────────────┬──────────────────────────────────┘
                                          │
                                          v
                                   [T-021 Page Routes]
                                          │
                                          v
                                   [T-022 Build Verification]
                                          │
                                          v
                                   [T-023 Accessibility]
                                          │
                                          v
                                   [T-024 WVWO Aesthetic]
                                          │
                                          v
                                   [T-025 Visual Testing]
                                          │
                                          v
                                   [T-026 Documentation & PR]
```

---

## Verification: All 10 Core Requirements Tracked

| # | Requirement | Task ID | Status |
|---|-------------|---------|--------|
| 1 | Hero Section | T-007 | ✅ |
| 2 | Trail Breakdown | T-008 | ✅ |
| 3 | Lift System | T-009 | ✅ |
| 4 | Snow Conditions | T-010 | ✅ |
| 5 | Pricing Section | T-011 | ✅ |
| 6 | Terrain Parks | T-012 | ✅ |
| 7 | Lodging Grid | T-013 | ✅ |
| 8 | Dining & Amenities | T-014 | ✅ |
| 9 | Summer Activities | T-015 | ✅ |
| 10 | Kim's Tips | T-016 | ✅ |

---

## Verification: All 5 Clarifications Tracked

| # | Clarification | Task ID | Implemented |
|---|---------------|---------|-------------|
| 1 | Blue color exception | T-002a, T-004a | ✅ bg-blue-700 |
| 2 | Widget embed | T-002b, T-010e | ✅ widgetEmbed + set:html |
| 3 | Seasonal switching | T-002c, T-015 | ✅ Conditional sections |
| 4 | Lodging/Dining req | T-002d, T-003i/j | ✅ min(1)/optional |
| 5 | Dynamic pricing | T-002e, T-011b | ✅ isDynamic flag |

---

## Notes

- **Accepted Deviation:** Template is 770 lines vs 550-600 target. This is acceptable because the template includes all 10 core requirements plus 4 additional edge case sections (Nordic, Park Affiliation, Pass Affiliations, Safety).

- **Kim's Tips:** Was initially missing from implementation. Added in gap-fix session with:
  - KimTipSchema in ski-types.ts
  - Kim's Tips section in SkiTemplate.astro (lines 217-242)
  - Sample content in both resort .md files

- **Blue Exception:** Industry-standard trail difficulty colors (green/blue/black) require bg-blue-700 which is normally forbidden. Documented exception in spec.md and ski-types.ts comments.

---

## Lessons Learned

1. **Run /speckit.tasks BEFORE implementation** - Would have generated this task list upfront, ensuring Kim's Tips wasn't missed
2. **Each Core Requirement = Explicit Task** - T-016 for Kim's Tips would have been visible
3. **Clarifications = Tasks** - T-002a-e ensure design decisions are tracked
4. **Verification Tables** - Final check ensures 100% requirement coverage
