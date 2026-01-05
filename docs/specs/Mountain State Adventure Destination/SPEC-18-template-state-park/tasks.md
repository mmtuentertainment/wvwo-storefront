# Tasks: State Park Template

**Plan Version:** 1.0.0
**Generated:** 2026-01-03
**Status:** Ready for Implementation
**Branch:** `feature/spec-18-state-park-template`

## Task Legend

- `[P]` Parallelizable - can run concurrently with other [P] tasks
- `[S]` Sequential - depends on previous tasks completing
- `[ ]` Not started
- `[X]` Completed
- `[~]` In progress

## Phase 1: Type System Foundation (6 hours)

### 1.1 Project Setup

- [ ] [S] Create directory structure (src/types/, src/components/state-park/, src/data/state-parks/)
- [ ] [S] Create type file stubs (state-park-types.ts, state-park-seo-types.ts, state-park-template-types.ts)

### 1.2 Core Facility Types (~4 hours)

- [ ] [P] Define FacilityTypeSchema enum (10 types: lodge, cabin, campground, pool, etc.)
- [ ] [P] Create LodgingFacilitySchema (bedrooms, bathrooms, kitchen, fireplace, petFriendly, seasonalAvail, priceRange, reservationUrl)
- [ ] [P] Create CampingFacilitySchema (siteCount, hookupTypes, bathhouse, dumpStation, maxRVLength, season)
- [ ] [P] Create PoolFacilitySchema (type indoor/outdoor, depth, lifeguard, season, accessibility)
- [ ] [P] Create BoatLaunchSchema (rampType, lanes, trailerParking, depth, fees)
- [ ] [P] Create VisitorCenterSchema (hours, exhibits, programs, giftShop, restrooms, accessibility)
- [ ] [P] Create NatureCenterSchema (liveAnimals, interactiveDisplays, trails, programs)
- [ ] [P] Create PicnicAreaSchema (shelterCount, capacity, reservable, grills, electricity)
- [ ] [P] Create PlaygroundSchema (ageGroups, equipment, surfaceType, shade, accessibility)
- [ ] [P] Create AmphitheaterSchema (capacity, season, acoustics, accessibility, programs)
- [ ] [P] Create OtherFacilitySchema (disc golf, tennis, stables with type-specific fields)

### 1.3 Activity & Program Types (~1 hour)

- [ ] [P] Define ProgramTypeSchema enum (ranger-led, educational, junior-ranger, volunteer, exhibits, guided-tours, seasonal-events)
- [ ] [P] Create RangerProgramSchema (title, description, schedule, duration, registration, ageRange, accessibility)
- [ ] [P] Create WorkshopSchema (topic, instructor, materials, skillLevel, cost)
- [ ] [P] Create JuniorRangerProgramSchema (ageRange, activities, badgeEligibility, duration)
- [ ] [P] Create SpecialEventSchema (name, date, description, fees, registration)
- [ ] [P] Create ActivitySchema (name, category, season, difficulty, accessibility)

### 1.4 Accessibility Types (~30 minutes)

- [ ] [P] Define AccessibilityFeatureSchema enum (18 features: all-terrain wheelchairs, beach wheelchairs, accessible fishing piers, etc.)
- [ ] [P] Create TrailAccessInfoSchema (FSTAG specs: surface, width, grade, obstacles)
- [ ] [P] Create ServiceAnimalPolicySchema (allowed, restrictions, reliefAreas)

### 1.5 SEO Types (~1 hour)

- [ ] [P] Create OpeningHoursSpecificationSchema (dayOfWeek, opens, closes, validFrom, validThrough for seasonal variations)
- [ ] [P] Create FAQItemSchema (question, answer with 40-50 word validation, acceptedAnswer structure)
- [ ] [P] Create ParkEventSchema (name, startDate, endDate, eventSchedule, location, offers, isAccessibleForFree)
- [ ] [P] Create EventSeriesSchema (superEvent, subEvents, repeatFrequency)
- [ ] [P] Create AmenityFeatureSchema (LocationFeatureSpecification for 20+ features)

### 1.6 Helper Functions & Display Constants (~30 minutes)

- [ ] [S] Create FACILITY_TYPE_LABELS, COLORS, SHAPES constants
- [ ] [S] Create PROGRAM_TYPE_LABELS, COLORS, SHAPES constants
- [ ] [S] Create ACCESSIBILITY_FEATURE_LABELS, COLORS, SHAPES constants
- [ ] [S] Implement helper functions (getFacilityTypeLabel, getFacilityTypeColor, getFacilityTypeShape, etc.)
- [ ] [S] Map WVWO brand colors (sign-green, brand-brown, brand-cream, brand-orange <5%)
- [ ] [S] Map industry safety color exceptions (trail difficulty: green/blue/red/black)

### 1.7 Template Props Composition (~30 minutes)

- [ ] [S] Create StateParkTemplatePropsSchema (composition of all sections)
- [ ] [S] Define optional vs required fields with sensible defaults
- [ ] [S] Export Zod schema + inferred TypeScript type
- [ ] [S] Add JSDoc comments for all exports

<!-- PR-CHECKPOINT: Type System Foundation (~2,300 LOC) -->
**PR #1:** `feat(SPEC-18): State Park type system foundation`

---

## Phase 2: Section Components (10 hours)

### 2.1 FacilitiesSection Component (~4 hours)

- [ ] [S] Create FacilitiesSection.astro file with props interface
- [ ] [P] Build lodging cards layout (3-column grid desktop, stacked mobile)
- [ ] [P] Implement lodging amenity badges (kitchen, fireplace, pet-friendly icons)
- [ ] [P] Build campground details grid (hookup types, site counts, bathhouse info)
- [ ] [P] Create picnic area list with shelter counts
- [ ] [P] Build pool facility cards (indoor/outdoor, lifeguard, season)
- [ ] [P] Implement conditional rendering (missing facilities don't render empty sections)
- [ ] [P] Add WVWO styling (bg-brand-cream, border-l-4 border-l-sign-green, rounded-sm)
- [ ] [P] Add accessibility attributes (ARIA labels, semantic HTML)
- [ ] [S] Add "Reserve" CTAs with deep links to reservations.wvstateparks.com

### 2.2 ActivitiesSection Component (~3 hours)

- [ ] [S] Create ActivitiesSection.astro file with props interface
- [ ] [P] Build ranger program cards with scheduling info
- [ ] [P] Create Junior Ranger highlight section (badge design, age range, activities)
- [ ] [P] Build educational workshop grid
- [ ] [P] Implement registration indicators (required, recommended, walk-up)
- [ ] [P] Add capacity limit displays
- [ ] [P] Add seasonal event cards
- [ ] [P] Apply WVWO styling (fonts: font-display for titles, font-body for content)
- [ ] [P] Add Event schema integration points (data attributes for SEO)

### 2.3 ReservationSection Component (~2 hours)

- [ ] [S] Create ReservationSection.astro file with props interface
- [ ] [P] Build fee structure grid/table (day-use, camping, cabins)
- [ ] [P] Create booking window display card ("6 months advance" messaging)
- [ ] [P] Build cancellation policy section
- [ ] [P] Create primary CTA button (bg-brand-orange, "Call 1-833-WV-PARKS")
- [ ] [P] Add secondary CTA (deep link to reservations.wvstateparks.com)
- [ ] [P] Add phone number formatting (click-to-call on mobile)
- [ ] [P] Apply WVWO styling (orange CTA <5% of section)

### 2.4 ParkOverviewSection Component (~1 hour)

- [ ] [S] Create ParkOverviewSection.astro file with props interface
- [ ] [P] Build operating hours display with seasonal variations table
- [ ] [P] Create day-use fees display
- [ ] [P] Build contact information grid (phone, email, visitor center)
- [ ] [P] Add managing agency info (WV State Parks logo, contact)
- [ ] [P] Implement park alerts/closures section (ARIA live region for screen readers)
- [ ] [P] Apply WVWO styling (border-l-4 accents, brand colors)

<!-- PR-CHECKPOINT: Section Components (~900 LOC) -->
**PR #2:** `feat(SPEC-18): State Park section components`

---

## Phase 3: Main Template + SEO (12 hours)

### 3.1 StateParkTemplate Main Component (~5 hours)

- [ ] [S] Create StateParkTemplate.astro file with StateParkTemplateProps interface
- [ ] [P] Build Hero section (reuse AdventureHero.astro, pass park data)
- [ ] [P] Build Park Overview section (integrate ParkOverviewSection)
- [ ] [P] Build Facilities section (integrate FacilitiesSection)
- [ ] [P] Build Activities section (integrate ActivitiesSection)
- [ ] [P] Build Trails section (reuse TrailsSection from SPEC-17, pass park.trails)
- [ ] [P] Build Scenic Overlooks section (reuse ScenicOverlooksSection, pass park.overlooks)
- [ ] [P] Build Accessibility section (ADA facilities, TAI trail info, assistive services)
- [ ] [P] Build Planning section (Reservation integration + Park Passes static info with link to wvstateparks.com/passes)
- [ ] [P] Build Safety section (emergency contacts, regulations, managing agency footer)
- [ ] [S] Implement conditional rendering logic (sections don't render if data missing)
- [ ] [S] Add skip-to-content links (accessibility requirement)
- [ ] [P] Apply WVWO aesthetic compliance (rounded-sm only, brand colors, Kim's voice in text)
- [ ] [P] Add responsive breakpoints (mobile-first design)

### 3.2 SchemaStateParkTemplate SEO Component (~3 hours)

- [ ] [S] Create SchemaStateParkTemplate.astro with @graph structure
- [ ] [P] Build Organization entity (WV Wild Outdoors publisher)
- [ ] [P] Build StateGovernmentOrganization entity (WV State Parks managing agency)
- [ ] [P] Build Park + TouristAttraction entity (dual @type with openingHours, amenityFeature, address, telephone)
- [ ] [P] Build Article entity (page content metadata)
- [ ] [P] Build BreadcrumbList entity (Home > State Parks > {name})
- [ ] [P] Build ImageObject entities (hero image with credit/license attribution)
- [ ] [S] Connect entities with @id references
- [ ] [P] Add OpeningHoursSpecification (seasonal hours from park.hours data)
- [ ] [P] Add AmenityFeature array (20+ LocationFeatureSpecification from facilities)
- [ ] [P] Add PropertyValue extensions (campsite_count, trail_miles, cabin_count, acreage)

### 3.3 FAQ & Event SEO Components (~2.5 hours)

- [ ] [S] Create SchemaFAQ.astro with FAQPage schema
- [ ] [P] Implement Question/acceptedAnswer structure (40-50 word validation)
- [ ] [P] Add microdata HTML rendering for accessibility
- [ ] [S] Create SchemaEvent.astro for ranger programs/festivals
- [ ] [P] Implement Event properties (eventSchedule, location, offers, performer, audience)
- [ ] [P] Add eventStatus, eventAttendanceMode properties
- [ ] [S] Create SchemaEventSeries.astro for recurring programs
- [ ] [P] Implement superEvent/subEvent linking
- [ ] [P] Add repeatFrequency, duration properties

### 3.4 Dynamic Routing & Utilities (~1.5 hours)

- [ ] [S] Create pages/state-parks/[slug].astro dynamic route
- [ ] [P] Implement data loading by slug
- [ ] [P] Build meta tag population (title, description, OpenGraph, Twitter Cards)
- [ ] [P] Integrate SchemaStateParkTemplate component
- [ ] [P] Add canonical URL logic (/state-parks/{slug}/)
- [ ] [S] Create lib/utils/geo-proximity.ts utility
- [ ] [P] Implement Haversine distance formula
- [ ] [P] Build findNearestParks function (sorts by distance, returns top 3-5)
- [ ] [P] Add distance formatting helper (e.g., "23 miles away")

### 3.5 Index Page & Navigation (~1 hour)

- [ ] [S] Create pages/state-parks/index.astro hub page
- [ ] [P] Build park category grid (resort-style, recreation, historic)
- [ ] [P] Add regional grouping (Mountain Lakes, New River Gorge, Metro Valley, etc.)
- [ ] [P] Implement park card grid with quick stats
- [ ] [P] Add WVWO styling and Kim's voice intro text

<!-- PR-CHECKPOINT: Main Template + SEO (~1,970 LOC) -->
**PR #3:** `feat(SPEC-18): StateParkTemplate with Schema.org integration`
**⚠️ WARNING:** Exceeds 500 LOC threshold. Consider splitting into PR #3a (Template ~1,000) + PR #3b (SEO ~970) if review bandwidth limited.

---

## Phase 4: Data Files + Content (10 hours)

### 4.1 Holly River State Park Research (~2 hours)

- [ ] [P] Research park metadata at wvstateparks.com/parks/holly-river (acreage, established, location)
- [ ] [P] Document facility details (cabins: count, bedrooms, amenities; campground: sites, hookups)
- [ ] [P] Collect trail data (names, distances, difficulty, elevation, accessibility)
- [ ] [P] Research ranger programs and educational activities
- [ ] [P] Verify operating hours, fees, contact information
- [ ] [P] Source hero image (Unsplash "Holly River State Park West Virginia" OR Wikimedia Commons)
- [ ] [P] Document image credit/license for attribution
- [ ] [P] Generate 6-8 FAQ questions for featured snippets (common visitor questions)
- [ ] [P] Collect keywords (primary: "Holly River State Park", secondary: "Holly River camping", long-tail: "things to do Holly River WV")

### 4.2 Holly River Data File Creation (~3 hours)

- [ ] [S] Create data/state-parks/holly-river-sp.ts file
- [ ] [P] Implement park metadata (name, slug, established, acreage, signatureFeature)
- [ ] [P] Build location object (county, region, coordinates, nearestTown, distanceFromCity)
- [ ] [P] Create facilities object (lodging array, camping array, picnic areas, other)
- [ ] [P] Build activities object (rangerPrograms, workshops, juniorRanger, events, recreational)
- [ ] [P] Add trails array with accessibility indicators
- [ ] [P] Add overlooks array (accessibility, best times, parking)
- [ ] [P] Build accessibility object (adaCompliant facilities, accessibleTrails TAI specs, assistiveServices)
- [ ] [P] Create reservations object (fees, bookingWindow, cancellationPolicy, contact)
- [ ] [P] Add hours array (seasonal variations)
- [ ] [P] Build regulations object (petPolicy, alcohol, smoking, quietHours, parking)
- [ ] [P] Add emergencyContacts array (rangers, police, medical)
- [ ] [P] Add managingAgency object (WV State Parks contact)
- [ ] [P] Build seo object (metaTitle, metaDescription, faq array, keywords)
- [ ] [P] Add media (heroImage with credit/license, parkMapUrl)
- [ ] [S] Validate against StateParkSchema (Zod parse test)
- [ ] [P] Write content in Kim's authentic voice (no marketing buzzwords)

### 4.3 Watoga State Park Research (~2 hours)

- [ ] [P] Research resort-style facilities (lodge, restaurant, conference center, golf course)
- [ ] [P] Document extensive programming (nature center, interpretive programs)
- [ ] [P] Collect Brooks Memorial Arboretum data
- [ ] [P] Research cabin inventory (33 cabins, types, amenities)
- [ ] [P] Source hero image (Unsplash/Wikimedia with attribution)
- [ ] [P] Generate 6-8 FAQs for featured snippets

### 4.4 Watoga Data File Creation (~3 hours)

- [ ] [S] Create data/state-parks/watoga-sp.ts file
- [ ] [P] Implement complete StatePark object (~550 lines)
- [ ] [P] Emphasize resort facilities (Watoga Lake Lodge, restaurant details, conference capacity)
- [ ] [P] Add extensive activity programming
- [ ] [P] Include golf course details (18 holes, par, slope rating)
- [ ] [P] Document Brooks Arboretum trails
- [ ] [S] Validate against StateParkSchema
- [ ] [P] Write content in Kim's voice (resort-friendly but authentic WV)

<!-- PR-CHECKPOINT: Data Files (~1,150 LOC) -->
**PR #4:** `feat(SPEC-18): Holly River and Watoga data with routes`

---

## Phase 5: Comprehensive Testing (8 hours)

### 5.1 Type System Unit Tests (~3 hours)

- [ ] [S] Create tests/types/**tests**/state-park-types.test.ts
- [ ] [P] Write schema validation tests (10 facility type schemas parse correctly)
- [ ] [P] Test helper functions (getFacilityTypeLabel returns correct strings)
- [ ] [P] Test LABELS constant completeness (every enum value has label)
- [ ] [P] Test COLORS constant completeness (every enum value has WVWO color)
- [ ] [P] Test SHAPES constant completeness (every enum value has accessibility shape)
- [ ] [P] Test WVWO color compliance (no purple, pink, neon in COLORS)
- [ ] [P] Test industry color exceptions (trail difficulty uses green/blue/red/black, not WVWO palette)
- [ ] [P] Test edge cases (invalid enum values throw, required fields validated)
- [ ] [P] Test 20+ amenity types validation
- [ ] [P] Test 18 accessibility features validation
- [ ] [S] Create tests/types/**tests**/state-park-seo-types.test.ts
- [ ] [P] Test OpeningHoursSpecification schema (seasonal variations parse)
- [ ] [P] Test FAQItem schema (40-50 word answer validation)
- [ ] [P] Test ParkEvent and EventSeries schemas
- [ ] [S] Create tests/types/**tests**/state-park-template-types.test.ts
- [ ] [P] Test StateParkTemplateProps optional fields
- [ ] [P] Test nested object validation (facilities, activities, accessibility)
- [ ] [P] Test complete park object parsing

### 5.2 Component Tests (~2 hours)

- [ ] [S] Create tests/components/state-park/FacilitiesSection.test.tsx
- [ ] [P] Test lodging cards render with correct data
- [ ] [P] Test conditional rendering (no lodging = section doesn't render)
- [ ] [P] Test WVWO styling applied (bg-brand-cream, border-l-4 border-l-sign-green)
- [ ] [P] Test reservation CTAs display with correct URLs
- [ ] [S] Create tests/components/state-park/ActivitiesSection.test.tsx
- [ ] [P] Test ranger program cards render
- [ ] [P] Test Junior Ranger highlight section
- [ ] [P] Test registration indicators display
- [ ] [S] Create tests/components/state-park/ReservationSection.test.tsx
- [ ] [P] Test fee structure displays correctly
- [ ] [P] Test booking CTA is bg-brand-orange
- [ ] [P] Test phone number formatted (1-833-WV-PARKS)
- [ ] [S] Create tests/components/state-park/ParkOverviewSection.test.tsx
- [ ] [P] Test operating hours display with seasonal variations
- [ ] [P] Test contact information grid renders

### 5.3 Integration Tests (~1.5 hours)

- [ ] [S] Create tests/integration/state-park-template.test.tsx
- [ ] [P] Test full template renders with holly-river-sp data
- [ ] [P] Test conditional sections (missing data doesn't error)
- [ ] [P] Test schema components integrate correctly
- [ ] [P] Test meta tags populated from park.seo data
- [ ] [S] Create tests/integration/state-park-routing.test.ts
- [ ] [P] Test dynamic route [slug].astro generates correctly
- [ ] [P] Test canonical URLs (/state-parks/holly-river/)
- [ ] [P] Test 404 handling for invalid slugs

### 5.4 Accessibility Tests (~1 hour)

- [ ] [S] Create tests/a11y/state-park-wcag.test.ts
- [ ] [P] Run axe-core automated testing (0 violations target)
- [ ] [P] Test keyboard navigation (tab order correct, focus indicators visible)
- [ ] [P] Test screen reader announcements (ARIA labels, landmarks, skip links)
- [ ] [P] Test color contrast ≥4.5:1 (automated check for all text)
- [ ] [P] Test prefers-reduced-motion (animations disabled when preference set)
- [ ] [P] Manual NVDA/JAWS testing (screen reader compatibility)

### 5.5 SEO Validation Tests (~0.5 hours)

- [ ] [S] Create tests/seo/state-park-schema.test.ts
- [ ] [P] Validate Schema.org markup with validator API
- [ ] [P] Test @graph structure correct (8 entities)
- [ ] [P] Test FAQPage schema present (40-50 word answers)
- [ ] [P] Test Event schema for ranger programs
- [ ] [P] Test meta titles 50-60 characters
- [ ] [P] Test meta descriptions 150-160 characters
- [ ] [P] Test OpenGraph and Twitter Card tags present

### 5.6 Visual Regression Tests (~0.5 hours)

- [ ] [S] Create tests/e2e/state-park-visual.spec.ts (Playwright)
- [ ] [P] Capture hero section screenshots (desktop/tablet/mobile)
- [ ] [P] Capture facilities grid responsive layout
- [ ] [P] Capture activities section
- [ ] [P] Capture reservation CTA prominence (orange visibility)
- [ ] [P] Test animation states (prefers-reduced-motion on/off)

### 5.7 Performance Tests (~0.5 hours)

- [ ] [S] Configure Lighthouse CI for state park pages
- [ ] [P] Test Core Web Vitals (LCP <2.5s, FID <100ms, CLS <0.1)
- [ ] [P] Test total page weight <1.5MB
- [ ] [P] Test image optimization (WebP format, lazy loading, srcsets)
- [ ] [P] Test Lighthouse Performance ≥90
- [ ] [P] Test Lighthouse SEO = 100

<!-- PR-CHECKPOINT: Comprehensive Testing (~1,680 LOC) -->
**PR #5:** `test(SPEC-18): Comprehensive test suite`
**⚠️ WARNING:** Exceeds 500 LOC threshold. Consider splitting into PR #5a (Unit Tests ~950) + PR #5b (Integration/E2E ~730) if needed.

---

## Phase 6: Documentation + Polish (4 hours)

### 6.1 Code Documentation (~1 hour)

- [ ] [P] Add JSDoc comments to all type exports (state-park-types.ts)
- [ ] [P] Add JSDoc comments to all components (FacilitiesSection, ActivitiesSection, etc.)
- [ ] [P] Add JSDoc comments to helper functions (geo-proximity.ts)
- [ ] [P] Document prop interfaces with @example usage

### 6.2 Project Documentation (~0.5 hours)

- [ ] [S] Update CLAUDE.md with State Park template patterns
- [ ] [P] Add State Park to completed specs registry
- [ ] [P] Document reusable component patterns

### 6.3 Quarterly Review Process (~0.5 hours)

- [ ] [S] Create docs/maintenance/quarterly-state-park-review-checklist.md
- [ ] [P] Document seasonal hours verification steps
- [ ] [P] Document fee update verification (compare to wvstateparks.com)
- [ ] [P] Document program schedule update process
- [ ] [P] Document facility status checks
- [ ] [P] Document emergency contact validation

### 6.4 ReasoningBank Storage (~0.5 hours)

- [ ] [S] Store pattern in ReasoningBank

  ```bash
  claude-flow memory store "spec-18-state-park-complete" \
    "State Park template completion patterns. 63 gaps addressed. Type system: 10 facility types with balanced detail (10-12 fields). Multi-type Schema.org (Park + TouristAttraction). Geographic proximity for related parks. Quarterly manual review process. Hybrid image strategy (public domain + attribution). 6 PRs, 50 hours, 85%+ coverage, Lighthouse 100, WCAG 2.1 AA." \
    --namespace wvwo-successes --reasoningbank
  ```

### 6.5 Performance Optimization (~1 hour)

- [ ] [P] Optimize hero images (WebP conversion, responsive srcsets)
- [ ] [P] Implement lazy loading for below-fold images
- [ ] [P] Add preload hints for critical resources
- [ ] [P] Optimize bundle size (check for unnecessary imports)
- [ ] [S] Run Lighthouse audit and address any issues (target: all 100s)

### 6.6 Final WVWO Compliance Audit (~0.5 hours)

- [ ] [P] Audit all components for forbidden fonts (grep for "Inter", "Poppins", "DM Sans")
- [ ] [P] Audit for forbidden colors (grep for purple, pink, neon hex codes)
- [ ] [P] Audit for forbidden borders (grep for "rounded-md", "rounded-lg", "rounded-xl")
- [ ] [P] Review all content for marketing buzzwords ("seamless", "revolutionize", etc.)
- [ ] [P] Verify Kim's voice throughout (authentic WV, no corporate tone)
- [ ] [P] Verify industry color exceptions ONLY for safety-critical info (trail difficulty)

<!-- PR-CHECKPOINT: Documentation + Polish (~500 LOC) -->
**PR #6:** `docs(SPEC-18): Complete documentation and polish`

---

## PR Summary

| PR | Scope | Est. LOC | Tasks | Review Time |
|----|-------|----------|-------|-------------|
| **#1** | Type System Foundation | ~2,300 | 28 | 2-3h |
| **#2** | Section Components | ~900 | 29 | 3h |
| **#3** | Main Template + SEO | ~1,970 ⚠️ | 36 | 4-5h |
| **#4** | Data Files | ~1,150 | 17 | 2-3h |
| **#5** | Testing Suite | ~1,680 ⚠️ | 32 | 2-3h |
| **#6** | Documentation + Polish | ~500 | 18 | 1h |

**Total:** 160 tasks, ~6,500 LOC, ~15h review time

**⚠️ Checkpoint Warnings:**

- PR #3 exceeds 500 LOC (1,970 lines) - Consider split if review bandwidth limited
- PR #5 exceeds 500 LOC (1,680 lines) - Low risk (tests don't affect production)

---

## Dependencies Graph

```text
Phase 1: Type System Foundation
    ├─[P]─> Facility Schemas (10 types)
    ├─[P]─> Activity/Program Schemas
    ├─[P]─> Accessibility Schemas
    ├─[P]─> SEO Schemas
    └─[S]─> Helper Functions & Display Constants
                |
                v
Phase 2: Section Components
    ├─[S]─> FacilitiesSection (depends on LodgingSchema, CampingSchema, etc.)
    ├─[S]─> ActivitiesSection (depends on RangerProgramSchema, etc.)
    ├─[S]─> ReservationSection (depends on FeeSchema)
    └─[S]─> ParkOverviewSection (depends on OpeningHoursSchema)
                |
                v
Phase 3: Main Template + SEO
    ├─[S]─> StateParkTemplate (integrates all Phase 2 components)
    ├─[P]─> SchemaStateParkTemplate (@graph structure)
    ├─[P]─> SchemaFAQ, SchemaEvent, SchemaEventSeries
    ├─[S]─> [slug].astro (depends on template)
    └─[P]─> geo-proximity.ts utility
                |
                v
Phase 4: Data Files
    ├─[P]─> Holly River research
    ├─[S]─> holly-river-sp.ts (depends on schemas from Phase 1)
    ├─[P]─> Watoga research
    └─[S]─> watoga-sp.ts (depends on schemas from Phase 1)
                |
                v
Phase 5: Testing
    ├─[P]─> Unit tests (types, helpers)
    ├─[P]─> Component tests (rendering, styling)
    ├─[S]─> Integration tests (depends on template + data)
    ├─[P]─> Accessibility tests (axe-core)
    ├─[P]─> SEO validation (schema.org)
    ├─[P]─> Visual regression (Playwright)
    └─[P]─> Performance tests (Lighthouse CI)
                |
                v
Phase 6: Documentation + Polish
    ├─[P]─> JSDoc comments
    ├─[P]─> CLAUDE.md updates
    ├─[P]─> Quarterly review checklist
    ├─[S]─> ReasoningBank storage
    ├─[P]─> Performance optimization
    └─[P]─> WVWO compliance audit
```

---

## Parallelization Opportunities

**Phase 1:** 23 parallelizable tasks (all schema definitions can run concurrently)
**Phase 2:** 25 parallelizable tasks (component sections independent)
**Phase 3:** 20 parallelizable tasks (SEO components independent)
**Phase 4:** 12 parallelizable tasks (research and content writing)
**Phase 5:** 25 parallelizable tasks (most tests independent)
**Phase 6:** 13 parallelizable tasks (documentation and optimization)

**Total Parallelizable:** 118 of 160 tasks (74%)

### Optimal Execution

- Use concurrent agent spawning (Claude Code Task tool)
- Batch file operations in single messages
- Run tests in parallel (Vitest worker threads)

---

## Notes

### Blockers

- Phase 2 blocked until Phase 1 complete (needs schemas)
- Phase 3 blocked until Phase 2 complete (needs components)
- Phase 4 can start after Phase 1 (only needs schemas for validation)
- Phase 5 blocked until Phases 3 + 4 complete (needs template + data)

### Critical Paths

1. Type System (Phase 1) → Everything depends on this
2. Main Template (Phase 3) → Testing depends on this
3. Data Files (Phase 4) → Integration testing depends on this

### Quality Gates

- After Phase 1: All types validate, 0 TypeScript errors
- After Phase 3: Template renders, WVWO compliance passes
- After Phase 4: Data validates against schemas
- After Phase 5: 85%+ coverage, Lighthouse 100, WCAG 2.1 AA

---

**Task breakdown complete. Ready for `/speckit.implement` or manual execution.** ✅
