# Tasks: Lake Template Component

**Input**: Design documents from `docs/specs/Mountain State Adventure Destination/SPEC-13-template-lake/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, architecture/, contracts/

**Organization**: Tasks grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

- **Template**: `wv-wild-web/src/components/templates/LakeTemplate.astro`
- **Types**: `wv-wild-web/src/types/adventure.ts`
- **Tests**: `wv-wild-web/src/components/templates/__tests__/`
- **Pages**: `wv-wild-web/src/pages/near/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and directory structure

- [ ] T001 Create `wv-wild-web/src/components/templates/` directory
- [ ] T002 Create `wv-wild-web/src/components/templates/__tests__/` directory
- [ ] T003 [P] Create `wv-wild-web/src/data/lakes/` directory for data files

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core type system that MUST be complete before ANY user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Type System Extensions (wv-wild-web/src/types/adventure.ts)

- [ ] T004 Add `FishingSpotSchema` with Zod validation (name, depth, structure, species[], access) after line 295
- [ ] T005 [P] Add `MarinaSchema` with Zod validation (name, services[], boatLaunch, rentals[], hours, contact)
- [ ] T006 [P] Add `ActivitySchema` with Zod validation (name, description, season, difficulty?)
- [ ] T007 [P] Add `SeasonalGuideSchema` with Zod validation (season enum, highlights[], fishingFocus?)
- [ ] T008 [P] Add `RegulationSchema` with Zod validation (category, rules[])
- [ ] T009 Export type inferences: `FishingSpot`, `Marina`, `Activity`, `SeasonalGuide`, `Regulation`
- [ ] T010 Define `LakeTemplateProps` interface with 16 fields (name, acreage, maxDepth, county, quickHighlights, fishSpecies, fishingSpots, campgrounds, marina, activities, seasonalGuide, regulations, heroImage, mapUrl, title?, intro?)
- [ ] T011 Add array size validation: `.max(20)` for fishSpecies, `.max(15)` for fishingSpots, `.max(10)` for campgrounds, `.max(20)` for activities
- [ ] T012 Re-export `LakeTemplateProps` in `wv-wild-web/src/types/index.ts`

### Type Testing (wv-wild-web/src/types/**tests**/adventure-lake.test.ts)

- [ ] T013 [P] Create test file with FishingSpot schema validation tests (valid data passes, invalid fails)
- [ ] T014 [P] Add Marina schema tests (with/without optional rentals and fee)
- [ ] T015 [P] Add Activity, SeasonalGuide, Regulation schema tests
- [ ] T016 [P] Add array size limit tests (reject 21 species, 16 spots, etc.)
- [ ] T017 Run `npm run typecheck` to validate TypeScript compilation
- [ ] T018 Run `npm run test` to validate all Zod schema tests pass

**Checkpoint**: ✅ Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Fishing Information Display (Priority: P1)

**Goal**: Display fish species and fishing spots with WVWO brand styling

**Independent Test**: Create lake with only fishSpecies + fishingSpots arrays, verify rendering with green/brown accents

### What to Fish Section (reuses AdventureWhatToFish)

- [ ] T019 [P] [US1] Import `AdventureWhatToFish` from `wv-wild-web/src/components/adventure/` in LakeTemplate.astro
- [ ] T020 [P] [US1] Add "What to Fish" section with fishSpecies prop, variant="cream"
- [ ] T021 [P] [US1] Test fish species rendering with 6 species (Summersville Lake data)
- [ ] T022 [P] [US1] Validate Kim's tips render in font-hand (Permanent Marker) with border-top separator

### Where to Fish Section (custom ~100 lines)

- [ ] T023 [US1] Create "Where to Fish" section header in LakeTemplate.astro (font-display, text-3xl md:text-4xl, brand-brown)
- [ ] T024 [US1] Implement fishing spot card container with space-y-6 for full-width stacking
- [ ] T025 [US1] Add spot card with brown border-left accent (border-l-4 border-l-brand-brown)
- [ ] T026 [US1] Implement spot name heading (font-display, text-2xl, brand-brown)
- [ ] T027 [US1] Add 2-column grid inside card (details column | species badges column) with md:grid-cols-2
- [ ] T028 [US1] Implement details column (depth, structure, access) with bold labels
- [ ] T029 [US1] Implement species badges with sign-green background, white text, rounded-sm
- [ ] T030 [US1] Add bg-white and p-6 md:p-8 padding to spot cards
- [ ] T031 [US1] Test spot rendering with 3 fishing spots (Long Point Cliff, Dam End, Battle Run Cove)
- [ ] T032 [US1] Test mobile responsive stacking at 375px viewport (cards full-width)
- [ ] T033 [US1] Validate brown accent color matches brand-brown (#3E2723)
- [ ] T034 [US1] Independent test: Lake with ONLY fishSpecies + fishingSpots renders correctly

---

## Phase 4: User Story 3 - Hero Section with Lake Stats (Priority: P1)

**Goal**: Display lake name, stats, and highlights in visually striking hero

**Independent Test**: Create lake with only hero data (name, acreage, maxDepth, county, heroImage, quickHighlights), verify visual impact

### Hero Section (custom ~80 lines)

- [ ] T035 [US3] Create Hero section with relative positioning (h-[70vh] min-h-[500px])
- [ ] T036 [US3] Add hero image with absolute positioning, inset-0, w-full h-full, object-cover
- [ ] T037 [US3] Add dark overlay div with bg-brand-brown/50 for text readability
- [ ] T038 [US3] Add container with flex flex-col justify-end pb-16 for content positioning
- [ ] T039 [US3] Implement lake name heading in white font-display (text-4xl md:text-5xl lg:text-6xl font-bold)
- [ ] T040 [US3] Create 4-stat grid (grid-cols-2 md:grid-cols-4 gap-4 text-brand-cream)
- [ ] T041 [US3] Add stat items: acreage, maxDepth, county with uppercase labels (text-sm uppercase tracking-wide opacity-80)
- [ ] T042 [US3] Add stat values with font-display text-2xl font-bold
- [ ] T043 [US3] Implement quickHighlights badges (bg-sign-green, text-white, px-4 py-2, rounded-sm) with flex-wrap
- [ ] T044 [US3] Test hero renders on desktop (1280px viewport, 4-column stats grid)
- [ ] T045 [US3] Test hero responsive on mobile (stats switch to 2-column grid)
- [ ] T046 [US3] Validate white text contrast on dark overlay (WCAG AA compliance)
- [ ] T047 [US3] Independent test: Lake with ONLY hero data renders with visual impact

---

## Phase 5: User Story 2 - Marina & Camping Facilities (Priority: P2)

**Goal**: Display marina services and campground information for trip planning

**Independent Test**: Create lake with only campgrounds + marina, verify trip planning info displays

### Camping Section (reuses AdventureCampingList)

- [ ] T048 [P] [US2] Import `AdventureCampingList` from `wv-wild-web/src/components/adventure/` in LakeTemplate.astro
- [ ] T049 [P] [US2] Add "Camping" section with campgrounds prop, columns=2, variant="cream"
- [ ] T050 [P] [US2] Test campground rendering with 4 facilities (Battle Run, Mountain Lake, Long Point, Retreat)
- [ ] T051 [P] [US2] Validate reservation links have rel="noopener noreferrer" security attribute

### Marina Section (custom ~110 lines)

- [ ] T052 [US2] Create "Marina & Boat Access" section header (font-display, text-3xl md:text-4xl, brand-brown)
- [ ] T053 [US2] Create marina card with brown border-left accent (border-l-4 border-l-brand-brown, p-8, rounded-sm)
- [ ] T054 [US2] Add marina name heading (font-display, text-2xl, brand-brown)
- [ ] T055 [US2] Implement 2-column grid (grid md:grid-cols-2 gap-8) for services + boat launch
- [ ] T056 [US2] Add services list with sign-green bullets (ul space-y-2, bullet color text-sign-green)
- [ ] T057 [US2] Add boat launch details: ramp count display with pluralization logic
- [ ] T058 [US2] Add conditional fee display (only if boatLaunch.fee provided)
- [ ] T059 [US2] Add conditional rentals section (only if marina.rentals array provided)
- [ ] T060 [US2] Add hours + contact footer with border-top separator (border-brand-mud/20)
- [ ] T061 [US2] Implement contact phone as clickable tel: link (strip non-digits for href, display formatted)
- [ ] T062 [US2] Test marina renders with all fields (Summersville marina: 3 ramps, $5 fee, kayak rentals)
- [ ] T063 [US2] Test marina renders without optional rentals/fee (graceful degradation)
- [ ] T064 [US2] Validate tel: link formatting strips non-digits correctly
- [ ] T065 [US2] Independent test: Lake with ONLY campgrounds + marina renders trip planning features

---

## Phase 6: User Story 5 - Safety & Regulations Display (Priority: P2)

**Goal**: Display safety rules and regulations with orange warning accents

**Independent Test**: Create lake with only regulations array, verify warning display with orange accents

### Safety & Regulations Section (custom ~80 lines)

- [ ] T066 [US5] Create "Safety & Regulations" section header (font-display, text-3xl md:text-4xl, brand-brown)
- [ ] T067 [US5] Create regulation category card container with space-y-6 vertical stacking
- [ ] T068 [US5] Implement category card with orange border-left accent (border-l-4 border-l-brand-orange)
- [ ] T069 [US5] Add cream background to cards for visibility (bg-brand-cream, p-6, rounded-sm)
- [ ] T070 [US5] Add category heading (font-display, text-xl, brand-brown)
- [ ] T071 [US5] Implement rules as bulleted list with orange bullet markers (text-brand-orange, font-bold)
- [ ] T072 [US5] Add proper spacing for rules list (space-y-2)
- [ ] T073 [US5] Test regulations render with 3 categories (Walleye, Boating Safety, Scuba Diving)
- [ ] T074 [US5] Validate orange accent color matches brand-orange (#FF6F00)
- [ ] T075 [US5] Test long regulation text wrapping and readability
- [ ] T076 [US5] Independent test: Lake with ONLY regulations array renders warning display

---

## Phase 7: User Story 4 - Activities & Seasonal Guide (Priority: P3)

**Goal**: Display activities beyond fishing and seasonal breakdown

**Independent Test**: Create lake with only activities + seasonalGuide, verify content displays

### Activities Section (custom ~70 lines)

- [ ] T077 [US4] Create "Activities" section header (font-display, text-3xl md:text-4xl, brand-brown)
- [ ] T078 [US4] Implement activity cards in responsive grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- [ ] T079 [US4] Add activity card with border-l-4 border-l-sign-green accent
- [ ] T080 [US4] Add activity name, description, season display
- [ ] T081 [US4] Implement optional difficulty badge with color mapping (easy=green, moderate=orange, challenging=brown)
- [ ] T082 [US4] Test activities render with 3 items (Scuba Diving, Swimming, Cliff Jumping)
- [ ] T083 [US4] Validate difficulty badge colors match WVWO palette

### Seasonal Guide Section (custom ~90 lines)

- [ ] T084 [US4] Create "Seasonal Guide" section header (font-display, text-3xl md:text-4xl, brand-brown)
- [ ] T085 [US4] Implement 4-season card grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- [ ] T086 [US4] Add season name headings (Spring, Summer, Fall, Winter)
- [ ] T087 [US4] Add seasonal highlights as bulleted lists (space-y-2)
- [ ] T088 [US4] Implement optional fishingFocus callout with visual distinction (font-hand, italic, bg-brand-cream)
- [ ] T089 [US4] Apply seasonal visual distinction (border colors or subtle backgrounds)
- [ ] T090 [US4] Test seasonal guide renders all 4 seasons with highlights
- [ ] T091 [US4] Validate fishingFocus renders in font-hand when provided
- [ ] T092 [US4] Independent test: Lake with ONLY activities + seasonalGuide displays correctly

---

## Phase 8: Component Integration & Polish

**Purpose**: Integrate remaining SPEC-11 components and add supporting sections

### Existing Component Integration

- [ ] T093 [P] Import and add `AdventureQuickStats` with lake stats transformation
- [ ] T094 [P] Import and add `AdventureAmenitiesGrid` for lake amenities (boat ramps, beaches, etc.)
- [ ] T095 [P] Import and add `AdventureGearChecklist` for fishing/camping gear
- [ ] T096 [P] Import and add `AdventureGettingThere` with directions from shop
- [ ] T097 [P] Import and add `AdventureRelatedShop` with fishing/camping/hunting categories
- [ ] T098 [P] Import and add `AdventureCTA` with "Stop By Before You Head Out" messaging
- [ ] T099 [P] Import and add `EmailCapture` for lake updates newsletter

### Template Polish

- [ ] T100 Add Layout wrapper with SEO meta tags (title, description, schema)
- [ ] T101 Add Breadcrumb and SchemaBreadcrumb components
- [ ] T102 Implement build-time Zod validation in frontmatter using `.parse()` (fail build on invalid props)
- [ ] T103 Add conditional section rendering (hide sections with empty arrays)
- [ ] T104 Apply gentle-reveal animations with prefers-reduced-motion support

---

## Phase 9: WVWO Compliance & Testing

**Purpose**: Validate 100% WVWO aesthetic compliance and accessibility

### WVWO Compliance Testing

- [ ] T105 [P] Test template has ZERO instances of rounded-md/lg/xl (only rounded-sm allowed)
- [ ] T106 [P] Validate border-left accents: green (fish), brown (spots/marina), orange (regulations)
- [ ] T107 [P] Validate font hierarchy: font-display (headings), font-hand (Kim's tips ONLY), font-body (content)
- [ ] T108 [P] Test Kim's tips render ONLY in font-hand (Permanent Marker), not other content
- [ ] T109 [P] Validate brand colors only: no purple, pink, neon, corporate blue

### Responsive Layout Testing

- [ ] T110 [P] Test mobile layout at 375px viewport (all grids stack to 1-column)
- [ ] T111 [P] Test tablet layout at 768px viewport (2-column grids activate)
- [ ] T112 [P] Test desktop layout at 1280px viewport (3-4 column grids activate)
- [ ] T113 [P] Validate no horizontal scroll on any viewport size

### Accessibility Testing (WCAG 2.1 AA)

- [ ] T114 [P] Run axe-core accessibility audit (95+ score target)
- [ ] T115 [P] Validate color contrast ratios (white on overlay: 4.5:1+, badges: 4.5:1+)
- [ ] T116 [P] Test semantic HTML structure (proper heading hierarchy h1→h2→h3)
- [ ] T117 [P] Validate ARIA labels for complex sections
- [ ] T118 [P] Test keyboard navigation (tab order, focus indicators)

### Integration Testing

- [ ] T119 Test complete Summersville Lake data renders all sections correctly
- [ ] T120 Test empty arrays hide sections gracefully (no broken UI)
- [ ] T121 Test missing optional fields don't break layout (kimsTip, mapUrl, rentals, fee)
- [ ] T122 Test build FAILS with invalid Zod data (wrong types, missing required fields)

### Performance Testing

- [ ] T123 [P] Run Lighthouse audit on Summersville Lake page (90+ all categories)
- [ ] T124 [P] Validate First Contentful Paint < 1.5s
- [ ] T125 [P] Validate Largest Contentful Paint < 2.5s
- [ ] T126 [P] Test with maximum array sizes (20 species, 15 spots) - performance must remain 90+

---

## Phase 10: Migration & Documentation

**Purpose**: Refactor existing lake page and create usage examples

### Summersville Lake Migration

- [ ] T127 Extract Summersville Lake data from existing page to `wv-wild-web/src/data/lakes/summersville.ts`
- [ ] T128 Refactor `wv-wild-web/src/pages/near/summersville-lake.astro` to use LakeTemplate
- [ ] T129 Visual regression test: Compare new template output to original page (should be identical)
- [ ] T130 Validate SEO unchanged (meta tags, structured data, breadcrumbs)
- [ ] T131 Test all links work (reservation URLs, tel: links, shop links, newsletter)

### Documentation & Examples

- [ ] T132 [P] Create example lake data file at `wv-wild-web/src/data/lakes/_example.ts` with comprehensive comments
- [ ] T133 [P] Update quickstart.md with post-implementation notes (actual usage patterns discovered)
- [ ] T134 [P] Create migration guide in examples/ showing before/after for summersville-lake.astro

---

## Dependencies & Execution Strategy

### Critical Path

```
T001-T003 (Setup) →
T004-T018 (Foundation - BLOCKS ALL) →
  ├─→ T019-T034 (US1 - Fishing) [P]
  ├─→ T035-T047 (US3 - Hero) [P]
  ├─→ T048-T065 (US2 - Facilities) [P]
  ├─→ T066-T076 (US5 - Regulations) [P]
  └─→ T077-T092 (US4 - Activities/Seasonal) [P]
→ T093-T104 (Integration) →
T105-T126 (Testing) [P] →
T127-T134 (Migration/Docs) [P]
```

### Parallel Execution Opportunities

**After Foundation (T004-T018)**:

- **Parallel Wave 1**: US1, US3, US2, US5, US4 can ALL run in parallel (different sections, no dependencies)
- **5 agents simultaneously**: Each agent implements one user story
- **Time savings**: ~4 hours (sequential: 12 hours, parallel: 8 hours)

**Testing Phase (T105-T126)**:

- All 22 test tasks can run in parallel
- Use test runner parallelization
- Estimated: 15-20 minutes total

**Migration Phase (T127-T134)**:

- Tasks T132-T134 can run in parallel
- Migration (T127-T131) must be sequential

### User Story Independence Validation

✅ **US1**: Fishing display - independent (only needs fishSpecies + fishingSpots)
✅ **US3**: Hero section - independent (only needs name, stats, heroImage)
✅ **US2**: Facilities - independent (only needs campgrounds + marina)
✅ **US5**: Regulations - independent (only needs regulations array)
✅ **US4**: Activities/Seasonal - independent (only needs activities + seasonalGuide)

**Each user story is fully independent and testable on its own.**

---

## Task Statistics

**Total Tasks**: 134

- Phase 1 (Setup): 3 tasks
- Phase 2 (Foundation): 15 tasks (BLOCKING)
- Phase 3 (US1): 16 tasks
- Phase 4 (US3): 13 tasks
- Phase 5 (US2): 18 tasks
- Phase 6 (US5): 11 tasks
- Phase 7 (US4): 16 tasks
- Phase 8 (Integration): 12 tasks
- Phase 9 (Testing): 22 tasks
- Phase 10 (Migration): 8 tasks

**Parallel Opportunities**: 67 tasks marked with [P] (50% parallelizable)

**Estimated Time**:

- Sequential: ~24 hours
- Parallel: ~16 hours
- **Savings: 33% via concurrent execution**

---

## Implementation Notes

1. **Foundation First**: Complete T004-T018 before ANY user story work
2. **Parallel User Stories**: After foundation, all 5 user stories can run concurrently
3. **WVWO Compliance**: Every custom section enforces rounded-sm, brand colors, font hierarchy
4. **Build-Time Validation**: Template validates props in frontmatter, build fails on errors
5. **Independent Testing**: Each user story has independent test task (T034, T047, T065, T076, T092)

---

## Next Steps

Tasks are ready for implementation. Proceed with:

1. **Phase 1-2**: Setup + Foundation (2-3 hours) - sequential
2. **Phase 3-7**: User Stories (parallel execution with 5 agents) - 4-6 hours
3. **Phase 8-10**: Integration, Testing, Migration (parallel testing) - 2-3 hours

**Total: 8-12 hours with parallel execution**

Ready for `/speckit.implement` or manual task execution.
