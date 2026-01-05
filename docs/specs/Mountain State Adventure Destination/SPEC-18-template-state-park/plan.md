# Implementation Plan: State Park Template

**Spec Version:** 1.0.0
**Plan Version:** 1.0.0
**Created:** 2026-01-03
**Branch:** `feature/spec-18-state-park-template`

## Architecture Overview

State Park Template builds on proven SPEC-17 Backcountry patterns (70% reusable) to create a multi-template hybrid system supporting family-oriented recreation. The architecture addresses 63 identified gaps across facilities, accessibility, SEO, and programming through a modular 8-section template with comprehensive Schema.org integration.

**Core Pattern:** Hybrid composition combining Lake (boating/fishing), Backcountry (trails/camping), Ski (lodging/facilities), and Cave (programs/education) template elements into a unified state park experience.

**Strategic Positioning:** Developed facilities + ranger programs + reservation systems vs. wilderness self-reliance.

## Component Structure

```text
wv-wild-web/
├── src/
│   ├── types/
│   │   ├── state-park-types.ts              (~1,300 lines) [NEW]
│   │   ├── state-park-seo-types.ts          (~400 lines)   [NEW]
│   │   └── state-park-template-types.ts     (~600 lines)   [NEW]
│   │
│   ├── components/
│   │   ├── templates/
│   │   │   └── StateParkTemplate.astro     (~1,000 lines) [NEW]
│   │   │
│   │   ├── state-park/                      [NEW DIR]
│   │   │   ├── FacilitiesSection.astro     (~300 lines)
│   │   │   ├── ActivitiesSection.astro     (~250 lines)
│   │   │   ├── ReservationSection.astro    (~200 lines)
│   │   │   └── ParkOverviewSection.astro   (~150 lines)
│   │   │
│   │   ├── seo/
│   │   │   ├── SchemaStateParkTemplate.astro  (~400 lines) [NEW]
│   │   │   ├── SchemaFAQ.astro                (~120 lines) [NEW]
│   │   │   ├── SchemaEvent.astro              (~150 lines) [NEW]
│   │   │   └── SchemaEventSeries.astro        (~100 lines) [NEW]
│   │   │
│   │   └── adventure/                       [REUSE]
│   │       ├── AdventureHero.astro
│   │       ├── AdventureQuickStats.astro
│   │       ├── TrailsSection.astro
│   │       ├── ScenicOverlooksSection.astro
│   │       └── AdventureCTA.astro
│   │
│   ├── data/
│   │   └── state-parks/                     [NEW DIR]
│   │       ├── holly-river-sp.ts            (~600 lines)
│   │       └── watoga-sp.ts                 (~550 lines)
│   │
│   ├── pages/
│   │   └── state-parks/
│   │       ├── index.astro                  (~150 lines) [NEW]
│   │       └── [slug].astro                 (~200 lines) [NEW]
│   │
│   └── lib/
│       └── utils/
│           └── geo-proximity.ts             (~80 lines)  [NEW]
│
└── tests/
    ├── types/
    │   └── __tests__/
    │       ├── state-park-types.test.ts           (~600 lines) [NEW]
    │       ├── state-park-seo-types.test.ts       (~150 lines) [NEW]
    │       └── state-park-template-types.test.ts  (~200 lines) [NEW]
    │
    └── e2e/
        └── state-park-template.spec.ts            (~200 lines) [NEW]
```

**Total New Code:** ~6,500 lines
**Reused Components:** ~1,200 lines (from SPEC-17)

## Implementation Phases

### Phase 1: Type System Foundation (6 hours)

**Priority:** P0 - Blocks all subsequent work

### Tasks

1. Create `state-park-types.ts` with 10 facility type schemas (~4h)
   - LodgingFacilitySchema (bedrooms, bathrooms, kitchen, fireplace, petFriendly, seasonalAvail, priceRange)
   - CampingFacilitySchema (siteCount, hookupTypes, bathhouse, dumpStation, maxRVLength)
   - PoolFacilitySchema, BoatLaunchSchema, VisitorCenterSchema, etc.
   - 20+ amenity types, 9 activity types, 18 accessibility features
   - LABELS, COLORS, SHAPES constants + helper functions for all enums

2. Create `state-park-seo-types.ts` with SEO schemas (~1h)
   - OpeningHoursSpecificationSchema (seasonal variations)
   - FAQItemSchema (40-50 word answers for featured snippets)
   - ParkEventSchema, EventSeriesSchema
   - AmenityFeatureSchema (LocationFeatureSpecification)

3. Create `state-park-template-types.ts` with props interface (~1h)
   - StateParkTemplatePropsSchema (8 sections)
   - Composition of all facility, activity, accessibility schemas
   - Optional vs required field definitions

### Deliverables

- 3 type files (~2,300 lines total)
- 100% type coverage (0 `any` types)
- Exported Zod schemas + TypeScript types

**PR:** `feat(SPEC-18): State Park type system foundation`

---

### Phase 2: New Section Components (10 hours)

**Priority:** P0/P1 - Core user experience

### Tasks

1. Build `FacilitiesSection.astro` (~4h)
   - Lodging cards with 3-column grid (desktop), stacked (mobile)
   - Campground details with hookup type badges
   - Amenity icons and descriptions
   - Conditional rendering (missing facilities don't error)
   - WVWO styling: bg-brand-cream, border-l-4 border-l-sign-green

2. Build `ActivitiesSection.astro` (~3h)
   - Ranger program cards with scheduling
   - Junior Ranger highlight section (badge-worthy for kids)
   - Educational workshop grid
   - Registration indicators, capacity limits
   - Event schema integration points

3. Build `ReservationSection.astro` (~2h)
   - Fee structure grid/table
   - Booking window display ("6 months advance")
   - Cancellation policy details
   - Primary CTA: bg-brand-orange (1-833-WV-PARKS)
   - Deep link to reservations.wvstateparks.com/{park-slug}

4. Build `ParkOverviewSection.astro` (~1h)
   - Operating hours with seasonal variations
   - Day-use fees display
   - Contact information (phone, visitor center)
   - Managing agency info
   - Park alerts/closures (ARIA live regions)

### Deliverables

- 4 new section components (~900 lines)
- WVWO brand compliant (rounded-sm, brand colors)
- Accessibility attributes (ARIA labels, semantic HTML)

**PR:** `feat(SPEC-18): State Park section components`

---

### Phase 3: Main Template + SEO (12 hours)

**Priority:** P0 - Integration of all pieces

### Tasks

1. Build `StateParkTemplate.astro` (~5h)
   - 8-section architecture implementation
   - Conditional rendering for optional sections
   - Park Passes static info section (link to wvstateparks.com/passes)
   - Reuse 5 SPEC-17 components (Hero, QuickStats, Trails, Overlooks, CTA)
   - WVWO aesthetic validation
   - Skip-to-content links for accessibility

2. Build `SchemaStateParkTemplate.astro` (~3h)
   - @graph structure with 8 entity types
   - Multi-type: ["Park", "TouristAttraction"]
   - Organization (WV Wild Outdoors publisher)
   - StateGovernmentOrganization (WV State Parks)
   - OpeningHoursSpecification (seasonal hours)
   - AmenityFeature (20+ LocationFeatureSpecification items)

3. Build `SchemaFAQ.astro` (~1.5h)
   - FAQPage schema for featured snippets
   - 6-8 question/answer pairs
   - 40-50 word answer optimization
   - acceptedAnswer with text property

4. Build `SchemaEvent.astro` + `SchemaEventSeries.astro` (~1.5h)
   - Event schema for ranger programs, festivals
   - EventSeries for recurring programs (weekly/monthly)
   - eventSchedule, location, offers properties
   - isAccessibleForFree flag

5. Create dynamic route `[slug].astro` (~1h)
   - Import park data by slug
   - Meta tag population
   - Schema component integration
   - Canonical URL logic

### Deliverables

- StateParkTemplate.astro (~1,000 lines)
- 4 SEO schema components (~770 lines)
- Dynamic routing (~200 lines)
- Total: ~1,970 lines

**PR:** `feat(SPEC-18): StateParkTemplate with Schema.org integration`

---

### Phase 4: Data Files + Routes (10 hours)

**Priority:** P1 - Content population

### Tasks

1. Research Holly River State Park (~2h)
   - Verify facilities, hours, fees at wvstateparks.com
   - Source hero image (Unsplash CC0 or Wikimedia Commons)
   - Collect trail data, accessibility info
   - Generate 6-8 FAQs for featured snippets

2. Create `holly-river-sp.ts` (~3h)
   - Complete StatePark object (~600 lines)
   - All facility types with balanced detail
   - Ranger program schedules
   - Accessibility features
   - SEO metadata (title, description, keywords, FAQs)
   - Kim's authentic voice in descriptions

3. Research Watoga State Park (~2h)
   - Resort-style park with lodge
   - Conference center details
   - Restaurant/dining info
   - Golf course data

4. Create `watoga-sp.ts` (~3h)
   - Complete StatePark object (~550 lines)
   - Emphasis on resort facilities
   - Full programming schedule
   - Image sourcing with attribution

### Deliverables

- 2 complete data files (~1,150 lines)
- Validated against Zod schemas
- Hero images with credit/license attribution
- Kim's voice throughout

**PR:** `feat(SPEC-18): Holly River and Watoga data with routes`

---

### Phase 5: Comprehensive Testing (8 hours)

**Priority:** P0 - Quality assurance

### Tasks

1. Unit tests for type system (~3h)
   - state-park-types.test.ts (~600 lines)
   - Schema validation for all 10 facility types
   - Helper function tests (LABELS, COLORS, SHAPES)
   - WVWO color compliance tests
   - Industry color exception tests (trail difficulty)

2. Component tests (~2h)
   - FacilitiesSection.test.tsx (~150 lines)
   - ActivitiesSection.test.tsx (~100 lines)
   - ReservationSection.test.tsx (~80 lines)
   - ParkOverviewSection.test.tsx (~70 lines)
   - Rendering, conditional logic, WVWO styling

3. Integration tests (~1.5h)
   - StateParkTemplate.test.tsx (~150 lines)
   - Full template rendering
   - Schema.org markup validation
   - Meta tag population

4. Accessibility tests (~1h)
   - WCAG 2.1 Level AA compliance (axe-core)
   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast ≥4.5:1

5. SEO validation tests (~0.5h)
   - Schema.org validation (Google Rich Results Test)
   - Meta tag completeness
   - FAQ schema format (40-50 words)

### Deliverables

- ~1,680 lines of tests
- 85%+ code coverage
- 0 axe violations
- Lighthouse 100 targets

**PR:** `test(SPEC-18): Comprehensive test suite`

---

### Phase 6: Documentation + Polish (4 hours)

**Priority:** P1 - Knowledge transfer

### Tasks

1. JSDoc comments for all public APIs (~1h)
2. Update CLAUDE.md with State Park patterns (~0.5h)
3. Create quarterly review checklist (~0.5h)
   - Seasonal hours verification
   - Fee updates
   - Program schedule changes
   - Facility status updates
   - Emergency contact validation

4. Store pattern in ReasoningBank (~0.5h)

   ```bash
   claude-flow memory store "spec-18-complete" "State Park template patterns..." --namespace wvwo-successes --reasoningbank
   ```

5. Performance optimization (~1h)
   - Image lazy loading
   - WebP conversion
   - Core Web Vitals tuning

6. Final WVWO compliance audit (~0.5h)
   - Zero forbidden fonts
   - Zero forbidden colors
   - Zero forbidden borders (rounded-md/lg/xl)
   - Kim's voice throughout

### Deliverables

- Updated CLAUDE.md
- Quarterly review process documented
- ReasoningBank pattern stored
- Lighthouse 100 achieved

**PR:** `docs(SPEC-18): Complete documentation and polish`

---

## Technical Decisions

| Decision | Choice | Rationale | Impact |
|----------|--------|-----------|--------|
| **Facility Detail Level** | Balanced (10-12 fields) | Matches SPEC-17 pattern, covers 80% of user questions without overwhelming content team | Phase 1: 6h (no change) |
| **Related Parks Logic** | Geographic proximity (Haversine formula) | Automatic from GPS coordinates, matches user mental model "what's nearby?" | Phase 3: +1h for geo util |
| **Content Updates** | Quarterly manual review | Sustainable maintenance (8h/quarter), catches seasonal changes | Phase 6: Document checklist |
| **Multi-Park Passes** | External link only | Zero schema impact, delegates to WV State Parks authoritative source | Phase 3: Static section only |
| **Image Strategy** | Hybrid (public domain + attribution) | Legal, free, immediate availability. Unsplash CC0 + Wikimedia Commons + WV Parks with credit | Phase 4: +2h sourcing |
| **Schema.org Type** | Multi-type: ["Park", "TouristAttraction"] | State parks are civic structures (hours, fees) AND tourism destinations | Phase 3: SEO components |
| **Accessibility Level** | WCAG 2.1 Level AA | Federal legal requirement by April 26, 2026 | All phases: Design constraint |
| **Test Coverage** | 85%+ (match SPEC-17) | Proven quality standard, comprehensive validation | Phase 5: 8h testing |

## Dependencies

### Internal Dependencies (Blocking)

**SPEC-17 Backcountry Template** (must exist):

- ✅ `AdventureHero.astro` - Hero section pattern
- ✅ `AdventureQuickStats.astro` - Stats grid
- ✅ `TrailsSection.astro` - Trail display with difficulty colors
- ✅ `ScenicOverlooksSection.astro` - Overlook cards
- ✅ `AdventureCTA.astro` - Call-to-action sections
- ✅ `TieredEmergencyContact` type - Emergency contact pattern
- ✅ `ManagingAgency` type - Footer agency info

**SPEC-09 Adventure Shared Types** (must exist):

- ✅ `GearItemSchema` - Equipment lists
- ✅ `CoordinatesSchema` - GPS data
- ✅ `DifficultySchema` - Trail difficulty (with industry color exceptions)
- ✅ `SeasonSchema` - Seasonal data

**Existing Infrastructure**:

- ✅ Astro 5 with Content Collections
- ✅ Tailwind 4.x CSS
- ✅ Zod validation
- ✅ shadcn/ui components
- ✅ Vitest + Playwright testing

### External Dependencies (Non-Blocking)

**WV State Parks Reservation System**:

- URL: reservations.wvstateparks.com
- Phone: 1-833-WV-PARKS (833-987-2757)
- **Dependency Type:** Deep links only (no API)
- **Failure Mode:** If system down, CTAs still display with phone fallback
- **Mitigation:** Always show phone number alongside URL

**Image Sources**:

- Unsplash API (CC0 public domain)
- Wikimedia Commons (public domain + CC licenses)
- WV State Parks media (with attribution)
- **Failure Mode:** If sources unavailable, use placeholder + manual sourcing
- **Mitigation:** Document image attribution requirements in data files

**Legal/Compliance Standards**:

- WCAG 2.1 Level AA (federal requirement by April 26, 2026)
- FSTAG trail specifications
- Schema.org structured data standards
- **Failure Mode:** N/A - standards are stable
- **Mitigation:** Automated axe-core testing, Schema.org validation

### Internal Non-Blocking Dependencies

**Future Enhancements** (deferred):

- User reviews/ratings system (AggregateRating schema)
- Real-time reservation API (if WV State Parks releases API)
- Interactive facility maps
- Real-time weather integration

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|------------|--------|---------------------|
| **WVVO Brand Violations** | Medium | High | Automated linter, PR checklist, visual regression tests. Review all new components against forbidden fonts/colors/borders list. |
| **WCAG 2.1 AA Non-Compliance** | Low | Critical | axe-core automated testing in CI/CD. Manual screen reader testing (NVDA/JAWS). Legal deadline April 2026 gives 15-month buffer. |
| **Data Accuracy** | Medium | High | Verify all park data against official wvstateparks.com. Document sources in data files. Quarterly review process (Jan/Apr/Jul/Oct). |
| **Schema.org Complexity** | Low | Medium | Follow proven SPEC-17 @graph pattern. Validate with Google Rich Results Test. Test with 2 parks before scaling to 50+. |
| **Image Licensing Issues** | Low | Medium | Prioritize CC0 public domain (Unsplash, Wikimedia). Document credit/license in ImageObject. WV Parks attribution per their guidelines. |
| **Scope Creep** | Medium | Medium | Strict adherence to 63 identified gaps. Defer reviews/ratings, real-time APIs, interactive maps to future SPECs. |
| **Type System Complexity** | Low | Low | Follow SPEC-17 pattern exactly (1,724 lines reference). Balanced detail (10-12 fields) prevents over-engineering. |
| **Performance Degradation** | Low | Medium | Core Web Vitals monitoring. Image optimization (WebP, lazy loading). Bundle budget <1.5MB. Lighthouse CI in PR checks. |

## PR Strategy

**Estimated Total LOC:** ~6,500 lines (new code + tests)

### Checkpoint Triggers

- ⚠️ Warn at 300 LOC per PR
- 🚨 Split required at 500 LOC per PR

### Recommended PR Breakdown (6 PRs)

**PR #1: Type System Foundation** (~2,300 lines)

- Files: state-park-types.ts, state-park-seo-types.ts, state-park-template-types.ts
- **LOC:** Types only, no tests (split tests to PR #5)
- **Review Time:** 2-3 hours
- **Risk:** Low (no runtime changes)

**PR #2: New Section Components** (~900 lines)

- Files: FacilitiesSection.astro, ActivitiesSection.astro, ReservationSection.astro, ParkOverviewSection.astro
- **LOC:** Components only, no template integration yet
- **Review Time:** 3 hours
- **Risk:** Low (isolated components)

**PR #3: Main Template + SEO** (~1,970 lines) ⚠️ **CHECKPOINT**

- Files: StateParkTemplate.astro, SchemaStateParkTemplate.astro, SchemaFAQ/Event/EventSeries.astro, [slug].astro, geo-proximity.ts
- **LOC:** Exceeds 500 - Consider splitting
- **Split Option A:** PR #3a Template (~1,000 lines) + PR #3b SEO (~970 lines)
- **Split Option B:** Keep together (comprehensive review, single integration)
- **Review Time:** 4-5 hours
- **Risk:** Medium (integration complexity)

**PR #4: Data Files** (~1,150 lines)

- Files: holly-river-sp.ts, watoga-sp.ts
- **LOC:** Data only, validates against schemas from PR #1
- **Review Time:** 2-3 hours
- **Risk:** Low (data only)

**PR #5: Comprehensive Testing** (~1,680 lines) ⚠️ **CHECKPOINT**

- Files: state-park-types.test.ts, component tests, integration tests, E2E tests
- **LOC:** Exceeds 500 - Consider splitting
- **Split Option A:** PR #5a Unit Tests (~950 lines) + PR #5b Integration/E2E (~730 lines)
- **Split Option B:** Keep together (comprehensive coverage validation)
- **Review Time:** 2-3 hours
- **Risk:** Low (tests don't affect production)

**PR #6: Documentation + Polish** (~500 lines)

- Files: JSDoc comments, CLAUDE.md updates, quarterly checklist, performance optimizations
- **LOC:** Documentation + minor optimizations
- **Review Time:** 1 hour
- **Risk:** Low (polish only)

### PR Strategy Decision

**Recommended:** 6 PRs (as listed above, keep PR #3 and PR #5 together)

- Total review time: ~15 hours
- Better isolation of concerns
- Easier rollback if issues found

**Alternative:** 8 PRs (split PR #3 and PR #5)

- Total review time: ~17 hours
- Smaller change sets
- More CI/CD runs (slower)

## Testing Strategy

**Target:** 85%+ coverage (match SPEC-17 standard)

### Unit Tests (~950 lines)

**Files:** state-park-types.test.ts, state-park-seo-types.test.ts, state-park-template-types.test.ts

### Test Cases

- Schema validation for all 10 facility types
- Zod parse success/failure scenarios
- Helper function correctness (getTypeLabel, getTypeColor, getTypeShape)
- LABELS/COLORS/SHAPES constant completeness
- WVVO color compliance (no purple, pink, neon)
- Industry color exception validation (trail difficulty: green/blue/red/black)
- Edge cases (null, undefined, invalid enums)

### Component Tests (~400 lines)

**Framework:** Vitest + Testing Library

### Components

- FacilitiesSection: Renders lodging cards, campground grids, conditional rendering for missing data
- ActivitiesSection: Ranger program cards, Junior Ranger highlight, registration indicators
- ReservationSection: Fee display, booking CTAs, phone formatting (1-833-WV-PARKS)
- ParkOverviewSection: Operating hours, contact info, managing agency
- StateParkTemplate: Full integration, all sections render when data provided

### Focus

- Rendering correctness
- WVWO styling applied (bg-brand-cream, border-l-4 border-l-sign-green, rounded-sm)
- Accessibility attributes (ARIA labels, semantic HTML, skip links)
- Conditional rendering (empty arrays don't error)

### Integration Tests (~200 lines)

**Files:** state-park-template.spec.ts

### Scenarios

- Dynamic route [slug].astro generates pages correctly
- Meta tags populated from data (title 50-60 chars, description 150-160 chars)
- Schema.org markup present and valid
- Canonical URLs correct (/state-parks/{slug}/)
- OpenGraph and Twitter Card tags present
- Related parks calculated by geographic proximity

### Visual Regression Tests (~150 lines)

**Framework:** Playwright

### Scenarios

- Hero section (desktop/tablet/mobile)
- Facilities grid responsive layout
- Activities section responsive design
- Reservation CTA prominence (bg-brand-orange)
- Accessibility section high-visibility styling (border-l-brand-orange)
- Animation states (prefers-reduced-motion on/off)

### SEO Validation Tests (~100 lines)

**Tools:** Google Rich Results Test API (if available), Schema.org validator

### Checks

- Schema.org markup validates
- @graph structure correct
- FAQPage schema present (40-50 word answers)
- Event schema for ranger programs
- OpeningHoursSpecification for seasonal hours
- Meta titles 50-60 characters
- Meta descriptions 150-160 characters

### Accessibility Tests (~150 lines)

**Tools:** axe-core, Pa11y

### Validations

- WCAG 2.1 Level AA compliance (0 violations)
- Keyboard navigation 100% functional (tab order correct)
- Screen reader announcements (ARIA labels, landmarks)
- Color contrast ≥4.5:1 for all text
- Focus indicators visible
- Skip-to-content links present and functional

### Performance Tests (~80 lines)

**Tools:** Lighthouse CI

### Metrics

- Lighthouse Performance ≥90
- Lighthouse SEO = 100
- Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- Total page weight <1.5MB
- Image optimization (WebP, srcsets, lazy loading)

### Manual Testing Checklist

- [ ] Test with actual WV State Parks data (Holly River, Watoga)
- [ ] Verify reservation CTAs link correctly (reservations.wvstateparks.com)
- [ ] Phone number click-to-call works on mobile (1-833-WV-PARKS)
- [ ] Related parks show 3-5 nearest parks by distance
- [ ] Park Passes static section links to wvstateparks.com/passes
- [ ] All images have proper attribution (credit, license fields)
- [ ] Kim's voice authentic throughout (no marketing buzzwords)
- [ ] Industry color exceptions only for trail difficulty (green/blue/red/black)

## Rollback Plan

### Low-Risk Rollback (Types/Components Only)

### If issues in PR #1 (Type System)

1. Revert commit
2. No runtime impact (types not used yet)
3. Fix issues, re-submit

### If issues in PR #2 (Section Components)

1. Revert commit
2. Components not integrated into templates yet
3. Fix and re-submit

### Medium-Risk Rollback (Template Integration)

### If issues in PR #3 (StateParkTemplate + SEO)

1. Revert PR #3 commits
2. Keep PR #1 and PR #2 (types and components)
3. Fix template integration issues
4. Re-submit with additional tests

### Critical Paths

- Schema.org validation failures → Fix @graph structure, re-validate
- WVWO aesthetic violations → Audit borders/colors/fonts, fix styling
- Accessibility failures → Fix ARIA labels, keyboard nav, contrast

### High-Risk Rollback (Data Integration)

### If issues in PR #4 (Data Files)

1. Revert specific park data files
2. Template and types remain intact
3. Fix data validation issues
4. Re-submit corrected data

### Data Validation

- All fields validate against Zod schemas
- No TypeScript errors in strict mode
- Images load correctly with attribution

### Test Rollback

### If issues in PR #5 (Testing)

1. Tests don't affect production
2. Fix failing tests
3. Re-submit
4. Low risk

### Emergency Full Rollback

### If critical production issues

1. Revert all SPEC-18 commits (Git: `git revert <commit-range>`)
2. Create hotfix branch
3. Identify root cause
4. Fix in isolation
5. Re-implement with fixes

### Rollback Validation

- All existing tests still pass
- No breaking changes to other templates
- Site builds successfully
- No 404s or broken links

## Validation Checklist

### Before Each PR

- [ ] All TypeScript errors resolved (strict mode)
- [ ] All tests passing locally
- [ ] Lighthouse 100 (or ≥90 for performance)
- [ ] axe-core 0 violations
- [ ] WVWO brand compliance (no forbidden fonts/colors/borders)
- [ ] Schema.org validates (Google Rich Results Test)
- [ ] Images optimized (WebP, lazy loading)

### Before Final PR #6

- [ ] 85%+ test coverage achieved
- [ ] All 63 identified gaps addressed
- [ ] Quarterly review checklist documented
- [ ] ReasoningBank pattern stored
- [ ] CLAUDE.md updated with State Park patterns
- [ ] All acceptance criteria met

---

## Timeline

### Sequential (Single Developer)

- **Day 1:** Phase 1 (6h) + Phase 2 start (2h)
- **Day 2:** Phase 2 finish (8h)
- **Day 3:** Phase 3 (8h)
- **Day 4:** Phase 3 finish (4h) + Phase 4 start (4h)
- **Day 5:** Phase 4 finish (6h) + Phase 5 start (2h)
- **Day 6:** Phase 5 finish (6h) + Phase 6 start (2h)
- **Day 7:** Phase 6 finish (2h)

**Total:** 50 hours = 6.25 business days

### Parallel (Two Developers)

- **Developer A:** Phase 1 (6h) → Phase 2 (10h) → Phase 5 Unit Tests (3h) = 19h
- **Developer B:** Wait Phase 1 → Phase 3 (12h) → Phase 4 (10h) → Phase 5 Integration (5h) = 27h
- **Shared:** Phase 6 Documentation (4h)

**Total:** 32 hours = 4 business days (36% faster)

### Review Timeline

- PR #1: 2h review
- PR #2: 3h review
- PR #3: 4-5h review
- PR #4: 2-3h review
- PR #5: 2-3h review
- PR #6: 1h review

**Total Review:** ~15 hours

---

## Success Metrics

### Code Quality

- ✅ 0 TypeScript errors (strict mode)
- ✅ 85%+ test coverage
- ✅ 0 ESLint errors
- ✅ All builds pass (Astro, TypeScript, Vitest, Playwright)

### SEO Performance

- ✅ Lighthouse SEO = 100
- ✅ Schema.org validates (Google Rich Results Test passes)
- ✅ 15+ featured snippet optimization opportunities (FAQ schema)
- ✅ Meta titles 50-60 characters
- ✅ Meta descriptions 150-160 characters

### Accessibility (Legal Requirement)

- ✅ WCAG 2.1 Level AA compliance (0 axe violations)
- ✅ Keyboard navigation 100% functional
- ✅ Screen reader compatible (NVDA/JAWS tested)
- ✅ Color contrast ≥4.5:1
- ✅ prefers-reduced-motion respected

### WVWO Brand Compliance

- ✅ 0 forbidden fonts (Inter, Poppins, DM Sans, etc.)
- ✅ 0 forbidden colors (purple, pink, neon)
- ✅ 0 forbidden borders (rounded-md/lg/xl - only rounded-sm)
- ✅ 0 marketing buzzwords ("seamless", "revolutionize", etc.)
- ✅ Kim's authentic voice throughout

### Functional Completeness

- ✅ All 10 facility types supported
- ✅ 7 program types implemented
- ✅ 18 accessibility features documented
- ✅ Reservation integration complete
- ✅ 2 reference data files validated

### Performance

- ✅ Lighthouse Performance ≥90
- ✅ Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- ✅ Total page weight <1.5MB
- ✅ Images WebP with responsive srcsets

---

## Next Steps

1. ✅ Review plan.md for approval
2. ⏭️ `/speckit.tasks` - Generate detailed task breakdown with [P] markers
3. ⏭️ Begin Phase 1 - Create type system foundation
4. ⏭️ Submit PR #1 after Phase 1 completion

---

### Implementation plan ready. Estimated: 50 hours across 6 PRs with 15 hours review time
