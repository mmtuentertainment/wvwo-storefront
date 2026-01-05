# Implementation Plan: SPEC-12 WMA Template

**Spec Version:** 1.0.0
**Plan Version:** 1.0.0
**Created:** 2025-12-27
**Branch:** `feature/spec-12-wma-template`

---

## Architecture Overview

SPEC-12 creates a **modular component system** for West Virginia Wildlife Management Area pages by extracting reusable patterns from the 463-line elk-river.astro reference implementation. The system achieves **73% line reduction** (463 → 150 lines per page) through component composition while maintaining full visual depth and WVWO brand compliance.

**Architecture Strategy**: Build 4 new generic components + 2 semantic wrappers that compose with 4 existing SPEC-10/11 components to form complete WMA pages. All components are pure Astro (zero JavaScript), type-safe (Zod + TypeScript), and WCAG 2.1 AA compliant.

**Key Architectural Decisions** (from clarification session 2025-12-27):

1. **Type Discrimination**: Explicit `type: 'wma'` field for adventure differentiation
2. **Wrapper Pattern**: Generic base + hunting/fishing wrappers (DRY principle)
3. **Map Strategy**: Static-first (Mapbox API), progressive enhancement later
4. **Kim's Voice**: Inline tips in species cards (authentic scattered knowledge)
5. **Content Focus**: 5 closest WMAs to shop (high traffic, deep local expertise)

---

## Component Structure

```
wv-wild-web/src/
├── components/adventure/
│   ├── AdventureFeatureSection.astro      [NEW] 150 lines (generic base)
│   ├── AdventureWhatToHunt.astro          [NEW]  50 lines (wrapper)
│   ├── AdventureWhatToFish.astro          [NEW]  50 lines (wrapper)
│   ├── AdventureCampingList.astro         [NEW] 180 lines (facility grid)
│   ├── AdventureAmenitiesGrid.astro       [NEW] 120 lines (checkmark grid)
│   ├── AdventureCTA.astro                 [NEW] 140 lines (dual-button CTA)
│   ├── AdventureQuickStats.astro          [REUSE] SPEC-10
│   ├── AdventureGettingThere.astro        [REUSE] SPEC-11
│   ├── AdventureGearChecklist.astro       [REUSE] SPEC-11
│   └── AdventureRelatedShop.astro         [REUSE] SPEC-11
├── content.config.ts                       [MODIFY] +9 WMA fields +1 type field
├── types/adventure.ts                      [MODIFY] +3 new schemas (CampingFacility, FeatureItem, AccentColor)
├── pages/near/
│   ├── elk-river.astro                     [MODIFY] Refactor to use new components (-313 lines)
│   ├── burnsville-lake.astro               [CREATE] 150 lines (new WMA)
│   ├── summersville-lake.astro             [CREATE] 150 lines (new WMA)
│   ├── holly-river.astro                   [CREATE] 150 lines (new WMA)
│   └── cranberry.astro                     [CREATE] 150 lines (new WMA)
└── content/adventures/
    ├── elk-river.md                        [MODIFY] +1 field (type: 'wma')
    ├── burnsville-lake.md                  [CREATE] Frontmatter with 15+ WMA fields
    ├── summersville-lake.md                [CREATE] Frontmatter with 15+ WMA fields
    ├── holly-river.md                      [CREATE] Frontmatter with 15+ WMA fields
    └── cranberry.md                        [CREATE] Frontmatter with 15+ WMA fields
```

**Component Count**: 6 new components (690 lines) + 4 reused components
**Page Count**: 4 new WMA pages (600 lines) + 1 refactored (elk-river -313 lines)
**Total New LOC**: ~1,290 lines (components + pages + schema)

---

## Implementation Phases

### Phase 1: Type System Foundation (Week 1, Days 1-2)

**Goal**: Establish type-safe schema and TypeScript infrastructure

**Tasks**:

1. ✅ Extend `content.config.ts` with `type` field
   - Add `type: z.enum(['adventure', 'wma', 'trail', 'campground']).optional()`
   - Location: Line 596 (after images schema)

2. ✅ Add 8 optional WMA fields to adventures schema
   - `acreage`, `county`, `species[]`, `fishingWaters[]`, `facilities[]`, `accessPoints[]`, `regulations{}`, `seasonHighlights[]`
   - Nested Zod schemas: SpeciesSchema, FishingWaterSchema, FacilitySchema, etc.
   - Location: Lines 600-622

3. ✅ Extend `types/adventure.ts` with new schemas
   - Add `CampingFacilitySchema`, `FeatureItemSchema`, `AccentColor` type
   - Export inferred TypeScript types
   - Add type guard: `isWMAAdventure(adventure)`
   - Location: Append after line 223

4. ✅ Update elk-river.md frontmatter
   - Add `type: "wma"` field
   - Verify build passes with new schema

**Testing**:

- Run `npm run typecheck` - TypeScript compiles without errors
- Run `npm run build` - Zod validation passes
- Unit test: Schema validation with valid/invalid WMA data

**Deliverables**:

- Type system extended (~50 LOC in config, ~80 LOC in types)
- elk-river.md updated (+1 line)
- 8 unit tests passing

**Est. Time**: 4 hours
**Est. LOC**: 130 lines

---

### Phase 2: Generic Base Component (Week 1, Days 3-4)

**Goal**: Build AdventureFeatureSection as reusable foundation

**Tasks**:

1. ✅ Create `AdventureFeatureSection.astro`
   - Props interface with 9 configurable options
   - Responsive grid system (2-3 column mapping)
   - Border accent color system (4 WVWO colors)
   - Icon integration via STAT_ICON_PATHS
   - Kim's note rendering (font-hand)
   - Animation system (gentle-reveal with stagger)
   - Named slots (intro, footer, default)

2. ✅ Create wrapper components
   - `AdventureWhatToHunt.astro` - Hunting defaults
   - `AdventureWhatToFish.astro` - Fishing defaults
   - Slot passthrough implementation
   - Conditional rendering (hide if empty)

3. ✅ Test with mock data
   - Create test page with sample features
   - Verify 2-column and 3-column grids
   - Test white/cream variants
   - Verify Kim's notes render in font-hand
   - Test empty state handling

**Testing**:

- Unit tests: Props validation, column mapping, variant classes
- E2E tests: Component rendering, responsive grids, icons
- Accessibility: axe-core scan, heading hierarchy, ARIA labels

**Deliverables**:

- AdventureFeatureSection.astro (150 lines)
- AdventureWhatToHunt.astro (50 lines)
- AdventureWhatToFish.astro (50 lines)
- 12 unit tests, 10 E2E tests

**Est. Time**: 8 hours
**Est. LOC**: 250 lines

---

### Phase 3: Facility Components (Week 1, Days 5-7)

**Goal**: Build CampingList and AmenitiesGrid for facility display

**Tasks**:

1. ✅ Create `AdventureCampingList.astro`
   - Props interface with CampingFacility type
   - 3-column responsive grid (1 → 2 → 3)
   - Count badge rendering logic
   - Phone number tel: link formatting
   - External link security attributes
   - Accessibility info display
   - Gentle-reveal animation

2. ✅ Create `AdventureAmenitiesGrid.astro`
   - Props interface with string array
   - Configurable columns (2/3/4)
   - Checkmark icon from STAT_ICON_PATHS
   - Responsive grid (2 cols mobile → configurable desktop)
   - Footer slot for CTAs

3. ✅ Test both components
   - CampingList with all optional fields populated
   - AmenitiesGrid with 2/3/4 column layouts
   - Empty state handling
   - White/cream variants
   - Print stylesheet verification

**Testing**:

- Unit tests: Phone formatting, external link attributes, column mapping
- E2E tests: Component rendering, responsive behavior, empty states
- Accessibility: Color contrast, keyboard navigation, screen reader

**Deliverables**:

- AdventureCampingList.astro (180 lines)
- AdventureAmenitiesGrid.astro (120 lines)
- 15 unit tests, 12 E2E tests

**Est. Time**: 10 hours
**Est. LOC**: 300 lines

---

### Phase 4: CTA Component (Week 2, Days 1-2)

**Goal**: Build AdventureCTA universal call-to-action component

**Tasks**:

1. ✅ Create `AdventureCTA.astro`
   - Props interface with dual-button support
   - Variant system (sign-green or brand-brown background)
   - Primary button (filled style)
   - Secondary button (outlined style)
   - Optional icon integration (location, phone)
   - External link auto-detection
   - Responsive layout (stack mobile → row desktop)

2. ✅ Refactor elk-river.astro CTA section
   - Replace lines 414-445 (32 lines inline)
   - Import AdventureCTA
   - Use component with props (11 lines)
   - Verify visual parity

3. ✅ Test CTA component
   - Both variant backgrounds
   - With/without secondary button
   - With/without icons
   - External vs internal links
   - Mobile responsive layout

**Testing**:

- Unit tests: Variant mapping, external link detection
- E2E tests: Button rendering, navigation, focus states
- Accessibility: Focus indicators, sr-only text, ARIA

**Deliverables**:

- AdventureCTA.astro (140 lines)
- elk-river.astro refactored (-21 lines net)
- 8 unit tests, 7 E2E tests

**Est. Time**: 6 hours
**Est. LOC**: 140 lines

---

### Phase 5: elk-river.astro Refactoring (Week 2, Days 3-4)

**Goal**: Refactor existing elk-river.astro to use all 6 new components

**Tasks**:

1. ✅ Replace "What to Hunt" section
   - Lines 103-172 (70 lines) → AdventureWhatToHunt component (5 lines)
   - Extract species data to features array in frontmatter

2. ✅ Replace "Fishing Waters" section
   - Lines 174-209 (36 lines) → AdventureWhatToFish component (5 lines)
   - Extract fishing waters to features array

3. ✅ Replace "Facilities" section
   - Lines 247-327 (81 lines) → AdventureCampingList component (8 lines)
   - Extract facility data to facilities array

4. ✅ Replace "CTA" section
   - Lines 414-445 (32 lines) → AdventureCTA component (11 lines)
   - Already done in Phase 4

5. ✅ Verify elk-river.astro refactoring
   - Before: 463 lines
   - After: ~150 lines
   - Visual regression test (screenshot comparison)
   - Accessibility audit (no regressions)

**Testing**:

- Visual regression: Before/after screenshots match
- E2E tests: All sections render correctly from components
- Accessibility: Zero new axe-core violations
- Performance: Lighthouse score unchanged or improved

**Deliverables**:

- elk-river.astro refactored (463 → ~150 lines, -313 LOC)
- 8 visual regression snapshots
- Performance comparison report

**Est. Time**: 6 hours
**Est. LOC**: -313 lines (net reduction)

---

### Phase 6: Content Population (Week 3)

**Goal**: Create 4 new WMA pages with rich frontmatter data

**WMAs to Create** (Session 2025-12-27 decision):

1. Burnsville Lake WMA (25 min from shop)
2. Summersville Lake WMA (30 min from shop)
3. Holly River WMA (35 min from shop)
4. Cranberry WMA (40 min from shop)

**Per WMA Tasks**:

1. ✅ Create content file `src/content/adventures/{wma-slug}.md`
   - Add frontmatter with 15+ fields (type, acreage, county, species, fishingWaters, facilities, etc.)
   - Write 2-3 paragraph description in Kim's voice
   - Add 3-5 species with seasons and Kim's tips
   - Add 1-3 fishing waters with species lists
   - Add facility data (camping, boat ramps, parking)
   - Add 2-3 season highlights with tactical tips

2. ✅ Create page file `src/pages/near/{wma-slug}.astro`
   - Import 10 components (6 new + 4 existing)
   - Compose components in canonical order
   - Configure background alternation (cream/white rhythm)
   - Add Schema.org structured data
   - Add breadcrumbs

3. ✅ Source hero images
   - 1920×1080 WebP format
   - <500KB file size
   - Descriptive alt text (125 char target)
   - Save to `public/images/wma/`

**Content Sources**:

- WV DNR WMA pages (acreage, GPS, species)
- Kim's local knowledge (tips, best times, access notes)
- Google Maps (driving directions, GPS coordinates)
- WV DNR PDFs (hunting regulations, facility lists)

**Testing** (per WMA):

- Build validation: Frontmatter passes Zod schema
- Visual QA: All sections render correctly
- Accessibility: axe-core zero violations
- Performance: Lighthouse 95+/100
- Content review: Kim's voice authentic, no marketing buzzwords

**Deliverables**:

- 4 new adventure markdown files (~100 lines each = 400 lines)
- 4 new WMA page files (~150 lines each = 600 lines)
- 12+ hero images optimized
- Content review checklist completed

**Est. Time**: 20 hours (5 hours per WMA)
**Est. LOC**: 1,000 lines (content files)

---

### Phase 7: Testing Suite (Week 4, Days 1-3)

**Goal**: Comprehensive test coverage for all 6 new components

**Unit Tests** (Target: 43+ tests):

**Schema Validation** (15 tests):

- Valid WMA frontmatter passes
- Invalid `type` field fails
- Missing required fields fail
- Negative acreage fails
- Malformed GPS coordinates fail
- Species without name/season fails
- Fishing waters with empty species array fails
- Facilities with negative count fails
- External URLs without protocol fail
- Regulations with empty restrictions passes

**Backward Compatibility** (8 tests):

- Existing elk-river.md still builds
- Non-WMA adventures ignore WMA fields
- Partial WMA data (only acreage + county) valid
- Type inference works for Content Collections

**Component Logic** (10 tests):

- FeatureSection column mapping correct
- CampingList phone formatting works
- AmenitiesGrid checkmark rendering
- CTA external link auto-detection
- Wrapper components delegate correctly

**Type Safety** (10 tests):

- TypeScript autocomplete works
- Type guard `isWMAAdventure()` narrows correctly
- Optional fields are `| undefined`
- Inferred types match Zod schemas

**E2E Tests** (Target: 35+ scenarios):

**Component Rendering** (20 tests):

- AdventureFeatureSection (2-col, 3-col grids)
- AdventureWhatToHunt (species cards, Kim's tips)
- AdventureWhatToFish (waters, species lists)
- AdventureCampingList (badges, phone links, external links)
- AdventureAmenitiesGrid (2/3/4 columns)
- AdventureCTA (dual buttons, variants)

**Responsive Behavior** (8 tests):

- Mobile (375px) - 1 column stacking
- Tablet (768px) - 2 column grids
- Desktop (1280px) - 3-4 column grids
- Grid reflow at breakpoints

**Accessibility** (7 tests):

- Heading hierarchy (h1 → h2 → h3)
- Keyboard navigation (tab order)
- Focus indicators visible
- Screen reader landmarks
- External link announcements
- Reduced motion support

**Accessibility Tests** (axe-core):

**Color Contrast** (5 tests):

- Brown on cream ≥4.5:1 (expected: 13.8:1)
- Green on cream ≥4.5:1 (expected: 6.2:1)
- Orange on white ≥4.5:1 (validate)
- White on green ≥4.5:1 (CTA buttons)
- Large text ≥3:1

**Semantic HTML** (8 tests):

- Single h1 per page
- No skipped heading levels
- Lists use ul/ol
- Links have descriptive text
- Images have alt text
- Proper landmark regions

**Screen Reader** (5 tests):

- ARIA labels on icon buttons
- aria-hidden on decorative icons
- External link notifications
- Table headers for data tables

**Visual Regression** (20 snapshots):

- Full WMA pages (mobile/desktop)
- Individual components (all variants)
- State variations (hover, focus, empty)

**Testing Framework Setup**:

```bash
npm install --save-dev @axe-core/playwright  # Accessibility testing
```

**Test Files to Create**:

- `src/types/__tests__/wma-schemas.test.ts` - Schema validation (15 tests)
- `src/types/__tests__/type-guards.test.ts` - Type guard logic (5 tests)
- `tests/e2e/wma-components.spec.ts` - Component rendering (20 tests)
- `tests/e2e/wma-accessibility.spec.ts` - WCAG compliance (18 tests)
- `tests/visual/wma-snapshots.spec.ts` - Visual regression (20 snapshots)

**Deliverables**:

- 43 unit tests passing
- 35+ E2E tests passing
- Zero axe-core violations
- 20 visual regression baselines
- Test coverage report (≥85% line coverage)

**Est. Time**: 12 hours
**Est. LOC**: 500 lines (test code)

---

### Phase 8: Performance Optimization (Week 4, Days 4-5)

**Goal**: Achieve <2s load on 3G, Lighthouse 95+/100

**Tasks**:

1. ✅ Image optimization
   - Convert hero images to WebP (<500KB each)
   - Generate responsive srcset (400w/800w/1200w)
   - Implement lazy loading (native browser)
   - Verify AVIF fallback support

2. ✅ CSS optimization
   - Extract critical CSS for above-fold content (<14KB)
   - Inline critical CSS in `<head>`
   - Async load non-critical CSS
   - Verify Tailwind tree-shaking (3MB → 15KB)

3. ✅ Font optimization
   - Subset WVWO fonts (Bitter, Noto Sans, Permanent Marker)
   - Remove unused glyphs (150KB → 35KB per font)
   - Preload critical fonts

4. ✅ Performance testing
   - Lighthouse CI audit (all 5 WMA pages)
   - Chrome DevTools 3G throttling (0.4 Mbps)
   - Real device testing (iPhone SE, rural WV conditions)

5. ✅ Bundle analysis
   - Verify per-component bundles <20KB
   - Check total page weight <500KB
   - Identify optimization opportunities

**Performance Budget**:

- Hero image: 150KB (30%)
- Other images: 100KB (20%)
- Fonts: 75KB (15%)
- HTML: 50KB (10%)
- Non-critical CSS: 35KB (7%)
- Icons: 25KB (5%)
- Critical CSS: 15KB (3%)
- **Total: 450KB** (90% of budget)

**Testing**:

- Lighthouse Performance ≥95/100
- Load time <2s on 3G
- Core Web Vitals (LCP <2.5s, FID <100ms, CLS <0.1)

**Deliverables**:

- WebP images optimized (12 images)
- Critical CSS extracted and inlined
- Fonts subsetted
- Performance report (Lighthouse scores)

**Est. Time**: 8 hours
**Est. LOC**: 0 lines (optimization only)

---

### Phase 9: WVWO Aesthetic Audit (Week 5, Days 1-2)

**Goal**: 100% compliance with WVWO design system

**Tasks**:

1. ✅ Visual audit checklist
   - Zero `rounded-md/lg/xl` (only rounded-sm)
   - All colors from brand palette
   - Orange <5% of screen area
   - Typography: Bitter/Noto Sans/Permanent Marker only
   - No forbidden patterns (glassmorphism, purple, gradients)

2. ✅ Voice audit
   - Kim's tips sound authentic (not marketing copy)
   - No corporate buzzwords ("seamless", "unlock", etc.)
   - Specific local knowledge (not generic advice)
   - Humble expertise tone

3. ✅ Animation audit
   - Only `gentle-reveal` animation used
   - `prefers-reduced-motion` respected
   - No bouncy/parallax effects

4. ✅ Code review
   - Prettier formatting passes
   - No hardcoded colors (use CSS variables)
   - Consistent spacing (py-12 md:py-16)

**Testing**:

- Automated: Grep for forbidden patterns
- Manual: Visual inspection against CLAUDE.md checklist
- Content review: Kim reads all tips for authenticity

**Deliverables**:

- WVWO compliance report (100% pass)
- Content edits if marketing language found
- Visual fixes if aesthetic violations detected

**Est. Time**: 4 hours
**Est. LOC**: 0 lines (audit only)

---

### Phase 10: Documentation & PR Prep (Week 5, Days 3-5)

**Goal**: Complete documentation and prepare PR for review

**Tasks**:

1. ✅ Component API documentation
   - Add JSDoc examples to all 6 components
   - Update `.serena/memories/wvwo-component-patterns.md`
   - Document phone formatting pattern
   - Document external link security pattern

2. ✅ Migration guide
   - Document elk-river.astro refactoring steps
   - Provide template for new WMA pages
   - List required frontmatter fields

3. ✅ Changelog
   - Create `SPEC-12-template-wma/CHANGELOG.md`
   - Document all changes (components, schema, pages)
   - Note breaking changes (none expected)

4. ✅ PR description
   - Summary of 5 WMAs added
   - Component inventory (6 new + 4 reused)
   - Test coverage metrics (43 unit + 35 E2E)
   - Performance metrics (Lighthouse scores)
   - Before/after screenshots

5. ✅ Create feature branch

   ```bash
   git checkout -b feature/spec-12-wma-template
   ```

**Deliverables**:

- Component API docs complete
- Migration guide created
- CHANGELOG.md written
- PR description drafted
- Feature branch created

**Est. Time**: 6 hours
**Est. LOC**: 0 lines (documentation)

---

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Component Architecture** | Wrapper pattern (generic + 2 wrappers) | DRY principle, easier maintenance, proven SPEC-11 pattern |
| **Schema Strategy** | Extend `adventures` collection | Zero breaking changes, incremental enhancement |
| **Type Discrimination** | Explicit `type: 'wma'` field | Self-documenting, future-proof, excellent type safety |
| **Map Implementation** | Static-first (Mapbox Static API) | <1s load on 3G, offline support, print-friendly |
| **Kim's Tips Placement** | Inline in cards | Authentic scattered knowledge, not structured guide section |
| **Phase 1 WMAs** | Closest to shop (5 total) | High traffic, deep local knowledge, business-aligned |
| **Testing Framework** | Vitest (unit) + Playwright (E2E) + axe-core (a11y) | Already installed, proven in SPEC-10/11 |
| **Image Format** | WebP primary, JPEG fallback | 66% size reduction, 98% browser support |
| **Font Loading** | Preload + subset | Eliminates render-blocking, reduces file size |
| **PR Strategy** | Single PR (all 6 components + tests) | Atomic change, easier review, matches SPEC-11 precedent |

---

## Dependencies

### External Dependencies

**Runtime** (no new dependencies):

- ✅ Astro 4.x - Static site generation
- ✅ Tailwind CSS 3.x - Utility-first CSS
- ✅ Zod 3.x - Schema validation
- ✅ TypeScript 5.x - Type system

**Development** (1 new dependency):

- ⏳ @axe-core/playwright - Accessibility testing (need to install)

  ```bash
  npm install --save-dev @axe-core/playwright
  ```

**Optional** (future enhancements):

- ⏳ Mapbox Static API - Static map images (free tier: 50k requests/month)
- ⏳ Leaflet.js - Interactive maps (Phase 2 progressive enhancement)

### Internal Dependencies

**Required Components** (SPEC-10/11):

- ✅ AdventureQuickStats.astro - Stats grid
- ✅ AdventureGettingThere.astro - Directions
- ✅ AdventureGearChecklist.astro - Gear lists
- ✅ AdventureRelatedShop.astro - Category links

**Required Schemas** (SPEC-06):

- ✅ `adventures` collection - Base schema to extend
- ✅ ImageSchema - Hero image validation
- ✅ StatIconSchema - Icon type definitions

**Shared Utilities**:

- ✅ STAT_ICON_PATHS - Checkmark, location, info icons
- ✅ Tailwind config - Brand colors, font families
- ✅ Layout components - BaseLayout, Header, Footer, EmailCapture

### Data Dependencies

**WV DNR Sources**:

- WMA boundaries GeoJSON (96 WMAs)
- Species hunting seasons (annual updates from wvdnr.gov)
- Facility listings (boat ramps, camping, ADA access)
- GPS coordinates (NAD 1983 standard)

**Content Requirements** (per WMA):

- Hero image (1920×1080, <500KB WebP)
- 3-5 huntable species with seasons
- 1-3 fishing waters with species lists
- Facility descriptions
- 2-4 access points with GPS
- Regulations (zone, restrictions)
- 2-3 season highlights with Kim's tips

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **WVWO Aesthetic Violations** | Medium | High | Pre-commit hooks, visual regression tests, CodeRabbit review, aesthetic checklist in PR template |
| **Schema Breaking Changes** | Low | High | All WMA fields optional, backward compat tests, gradual rollout (1→5→96 WMAs) |
| **Performance Regression** | Low | Medium | Lighthouse CI (fail <95), image optimization, critical CSS, static HTML only |
| **Accessibility Failures** | Low | High | axe-core CI (zero violations), manual NVDA testing, keyboard nav audits, WCAG training |
| **Content Scalability** | Medium | Medium | Content templates, WV DNR data scraping, bulk import tools, Kim's review workflow, **AgentDB learning layer** (learn from Phase 1 tips → suggest Phase 2/3 tips), **ReasoningBank trajectory tracking** (learn from successful vs rejected content patterns, verdict judgment on tip quality) |
| **Orange Contrast Issues** | Medium | Low | Validated orange-on-white (not cream), use sparingly, automated contrast checking |
| **Kim Voice Drift** | Medium | Medium | Content review checklist, voice guidelines, example bank, Kim's final approval |
| **Build Time Increase** | Low | Low | 5 WMAs → <30s build time, incremental static generation, caching |

---

## PR Strategy

### Estimated Total LOC

**New Code**:

- 6 components: 690 lines
- 4 new WMA pages: 600 lines
- 4 new content files: 400 lines
- Schema extension: 130 lines
- Test files: 500 lines
- **Total New**: 2,320 lines

**Code Reduction**:

- elk-river.astro refactored: -313 lines

**Net Addition**: ~2,000 lines

### PR Breakdown Strategy

**Recommended: Single Atomic PR** (matches SPEC-11 precedent)

**Rationale**:

1. Components are tightly coupled (wrappers depend on base)
2. Schema extension required for all components to function
3. Testing validates entire system, not individual pieces
4. SPEC-11 PR #69 was similar size (1,800 LOC) and scored 94/100

**PR Structure**:

```
PR Title: feat(SPEC-12): WMA Template Component System

Sections:
- 6 new components (AdventureFeatureSection, CampingList, AmenitiesGrid, CTA, WhatToHunt, WhatToFish)
- Schema extension (type field + 8 WMA fields)
- 4 new WMAs (Burnsville, Summersville, Holly River, Cranberry)
- elk-river.astro refactored (463 → 150 lines)
- 78+ tests (43 unit + 35 E2E + accessibility)

LOC: ~2,000 lines
```

**Checkpoint Warnings**:

- ⚠️ 300 LOC - No warning needed (components are cohesive)
- ⚠️ 500 LOC - Expected for comprehensive feature
- ⚠️ 2,000 LOC - Matches SPEC-11 precedent (94/100 review score)

**Alternative: Multi-PR Approach** (if reviewer requests):

**PR 1: Schema + Type System** (~200 LOC)

- Extend adventures schema with type field + 8 WMA fields
- Add TypeScript types and type guards
- Unit tests for schema validation (15 tests)

**PR 2: Generic Components** (~470 LOC)

- AdventureFeatureSection + wrappers (250 lines)
- AdventureAmenitiesGrid (120 lines)
- Component unit/E2E tests (100 lines)

**PR 3: Complex Components** (~320 LOC)

- AdventureCampingList (180 lines)
- AdventureCTA (140 lines)
- Component tests

**PR 4: elk-river Refactoring** (~50 LOC)

- Refactor elk-river.astro to use components
- Visual regression tests

**PR 5-8: New WMAs** (4 PRs × ~250 LOC)

- One PR per WMA (content + page)

---

## Testing Strategy

### Unit Testing (Vitest)

**File**: `src/types/__tests__/wma-schemas.test.ts`

```typescript
describe('WMA Schema Validation', () => {
  test('valid WMA adventure passes schema', () => {
    const validWMA = {
      type: 'wma',
      title: 'Test WMA',
      description: 'Test description',
      acreage: 1000,
      county: 'Test County',
      species: [{ name: 'Deer', season: 'Nov-Dec' }],
    };
    expect(() => adventuresSchema.parse(validWMA)).not.toThrow();
  });

  test('negative acreage fails validation', () => {
    const invalidWMA = { acreage: -1000 };
    expect(() => adventuresSchema.parse(invalidWMA)).toThrow('positive');
  });
});
```

### E2E Testing (Playwright)

**File**: `tests/e2e/wma-components.spec.ts`

```typescript
test('AdventureFeatureSection renders 2-column grid', async ({ page }) => {
  await page.goto('/near/elk-river');
  const grid = await page.locator('.adventure-feature-section ul');
  await expect(grid).toHaveClass(/grid-cols-1 md:grid-cols-2/);
});

test('Kim notes render in Permanent Marker font', async ({ page }) => {
  await page.goto('/near/elk-river');
  const kimNote = await page.locator('text="Wind\'s tricky"');
  await expect(kimNote).toHaveClass(/font-hand/);
});
```

### Accessibility Testing (axe-core)

**File**: `tests/e2e/wma-accessibility.spec.ts`

```typescript
import { injectAxe, checkA11y } from 'axe-playwright';

test('WMA page has zero accessibility violations', async ({ page }) => {
  await page.goto('/near/burnsville-lake');
  await injectAxe(page);
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: { html: true },
  });
});
```

### Visual Regression Testing (Playwright)

**File**: `tests/visual/wma-snapshots.spec.ts`

```typescript
test('Burnsville Lake WMA desktop snapshot', async ({ page }) => {
  await page.goto('/near/burnsville-lake');
  await expect(page).toHaveScreenshot('burnsville-lake-desktop.png', {
    fullPage: true,
  });
});
```

---

## Rollback Plan

### Scenario 1: Schema Extension Breaks Existing Adventures

**Symptoms**: Build fails, elk-river.md validation errors

**Rollback Steps**:

1. Revert `content.config.ts` to previous version

   ```bash
   git checkout HEAD~1 -- src/content.config.ts
   ```

2. Remove `type: 'wma'` from elk-river.md
3. Rebuild: `npm run build`
4. Verify elk-river page renders correctly

**Root Cause Analysis**: Identify which WMA field caused failure (check build error message)

**Recovery**: Fix Zod schema validation rules, re-deploy

---

### Scenario 2: Component Breaks WVWO Aesthetic

**Symptoms**: PR review flags forbidden patterns (rounded-md, purple colors, etc.)

**Rollback Steps**:

1. Identify violating component (CodeRabbit comment)
2. Fix locally:

   ```astro
   <!-- Before: rounded-lg -->
   class="rounded-sm"

   <!-- Before: bg-purple-500 -->
   class="bg-sign-green"
   ```

3. Re-run visual regression tests
4. Push fix, request re-review

**Prevention**: Run aesthetic audit (Phase 9) before PR submission

---

### Scenario 3: Performance Regression

**Symptoms**: Lighthouse score <95, load time >2s on 3G

**Rollback Steps**:

1. Identify bottleneck via Chrome DevTools Performance tab
2. Common fixes:
   - Compress images further (WebP quality 80 → 70)
   - Remove unused CSS (re-run Tailwind purge)
   - Inline more critical CSS
   - Add lazy loading to below-fold images
3. Re-run Lighthouse audit
4. Deploy fix

**Prevention**: Lighthouse CI runs on every PR commit

---

### Scenario 4: Accessibility Violations

**Symptoms**: axe-core reports WCAG failures

**Rollback Steps**:

1. Review axe-core violation details
2. Common fixes:
   - Add missing alt text to images
   - Fix color contrast (darken text or lighten background)
   - Add ARIA labels to icon-only buttons
   - Fix heading hierarchy (skip levels)
3. Re-run axe-core tests
4. Manual screen reader verification (NVDA)

**Prevention**: axe-core CI blocks PR merge if violations found

---

### Scenario 5: Content Errors (Species/Seasons)

**Symptoms**: WV DNR reports incorrect hunting season dates

**Rollback Steps**:

1. Update affected WMA markdown file

   ```yaml
   species:
     - name: "White-tailed Deer"
       season: "Nov 20 - Dec 3" # CORRECTED from Nov 13
   ```

2. Rebuild site: `npm run build`
3. Deploy corrected content
4. No code rollback needed (data-only issue)

**Prevention**: Annual WV DNR regulation review checklist

---

## Greptile Custom Context (PR Safety)

### Pattern to Add

**Location**: `.greptile/config.yml` (or via Greptile web UI)

```yaml
patterns:
  - name: "WMA Missing Type Field"
    description: "Detect WMA adventures without explicit type field"
    pattern: |
      If a markdown file in src/content/adventures/ has WMA-specific fields
      (acreage, county, species, fishingWaters, facilities) but is missing
      `type: 'wma'` in the frontmatter, flag it as a code smell.
    severity: "warning"
    files:
      - "src/content/adventures/**/*.md"
    message: |
      This appears to be a WMA (has acreage/species/fishingWaters) but is missing `type: 'wma'` field.
      Add `type: "wma"` to frontmatter for proper type discrimination and component rendering.
```

**How It Works**:

1. Developer creates new WMA adventure with species data
2. Forgets to add `type: "wma"` field
3. Opens PR
4. Greptile AI scans diff, detects WMA fields present
5. Comments: "Missing `type: 'wma'` field" with guidance
6. Developer adds field, pushes update
7. PR approved

---

## Success Criteria

### Component Quality (Match SPEC-10/11)

- ✅ PR review score: ≥90/100 (target: 94+)
- ✅ Unit test coverage: ≥40 tests passing
- ✅ E2E test coverage: ≥30 scenarios passing
- ✅ Accessibility: Zero violations (WCAG 2.1 AA)
- ✅ Visual regression: Zero unexpected changes

### Template Quality

- ✅ Line count: ~150 lines per page (73% reduction)
- ✅ Component reuse: ≥80%
- ✅ Load time: <2s on 3G
- ✅ Lighthouse: 100/100/100/100 (or 95+/100/100/100 minimum)

### Content Quality (Per WMA)

- ✅ Kim's voice: Authentic (passes "neighbor" litmus test)
- ✅ Data accuracy: 100% (verified against WV DNR)
- ✅ Accessibility: WCAG 2.1 AA compliant
- ✅ Print-friendly: Regulations/maps print cleanly

### WVWO Aesthetic

- ✅ Zero forbidden patterns (corporate fonts, colors, corners)
- ✅ 100% brand palette compliance
- ✅ Orange <5% of screen
- ✅ Kim's neighbors would recognize it ✅

---

## Timeline & Milestones

### Week 1: Foundation & Components (40 hours)

- Days 1-2: Type system (schema + TypeScript)
- Days 3-4: AdventureFeatureSection + wrappers
- Days 5-7: Facility components (CampingList, AmenitiesGrid, CTA)

**Milestone 1**: All 6 components functional with unit tests

### Week 2: Integration & Testing (40 hours)

- Days 1-2: AdventureCTA + elk-river refactoring
- Days 3-5: E2E test suite (35+ scenarios)

**Milestone 2**: elk-river.astro refactored, E2E tests passing

### Week 3: Content Population (40 hours)

- Days 1-2: Burnsville Lake + Summersville Lake
- Days 3-4: Holly River + Cranberry
- Days 5-7: Content review, polish, Kim's approval

**Milestone 3**: 4 new WMAs published, content quality verified

### Week 4: QA & Optimization (32 hours)

- Days 1-3: Testing suite completion (accessibility, visual)
- Days 4-5: Performance optimization (images, CSS, fonts)

**Milestone 4**: All tests passing, Lighthouse 95+/100

### Week 5: Final QA & PR (24 hours)

- Days 1-2: WVWO aesthetic audit
- Days 3-5: Documentation, PR prep, review cycle

**Milestone 5**: PR submitted, approved, merged ✅

**Total Effort**: 176 hours (~4.4 weeks at full-time capacity)

---

## Implementation Sequence (Build Order)

**Critical Path** (dependencies enforced):

1. **Schema First**: `content.config.ts` + `adventure.ts` types
   - **Why first**: Components depend on type definitions
   - **Blockers**: None

2. **AdventureFeatureSection**: Generic base component
   - **Why second**: Wrappers depend on this base
   - **Blockers**: Type system (Phase 1)

3. **Wrappers**: AdventureWhatToHunt, AdventureWhatToFish
   - **Why third**: Depend on base component
   - **Blockers**: AdventureFeatureSection

4. **Parallel**: CampingList, AmenitiesGrid, CTA
   - **Why parallel**: No interdependencies, can build concurrently
   - **Blockers**: Type system only

5. **elk-river Refactoring**: Replace inline sections with components
   - **Why fifth**: Validates component integration
   - **Blockers**: All 6 components complete

6. **Content**: 4 new WMAs
   - **Why last**: Requires all components functional
   - **Blockers**: elk-river refactored and validated

**Parallelization Opportunities**:

- Week 1 Days 5-7: Build CampingList, AmenitiesGrid, CTA concurrently (3-agent swarm)
- Week 3: Populate 4 WMAs concurrently (4-agent swarm, one per WMA)

---

## Code Quality Standards

### Pre-Commit Checks

- ✅ Prettier formatting (enforced)
- ✅ TypeScript compilation (`npm run typecheck`)
- ✅ Zod schema validation (build succeeds)
- ✅ No forbidden patterns grep (rounded-md, purple, etc.)

### PR Review Checklist

- ✅ All 40 acceptance criteria met (from spec.md)
- ✅ Zero CodeRabbit "must fix" issues
- ✅ Lighthouse 95+/100/100/100
- ✅ axe-core zero violations
- ✅ Visual regression baselines approved
- ✅ Content voice authentic (Kim's approval)
- ✅ Documentation complete

### Merge Requirements

- ✅ 2 approvals (1 code, 1 design)
- ✅ All CI checks passing
- ✅ No merge conflicts with main
- ✅ Changelog updated

---

## Next Steps After Merge

### Immediate (Week 6)

1. **Monitor production**: Check Lighthouse scores, Core Web Vitals, error logs
2. **Content feedback**: Gather Kim's thoughts on 4 new WMA pages
3. **User testing**: Observe hunters navigating WMA pages (analytics)

### Short-term (Weeks 7-12)

1. **Phase 2 Content**: Add 5 more regional WMAs (Northern/Southern/Eastern WV)
2. **Progressive Enhancement**: Add Leaflet.js for Cranberry (3+ access points)
3. **Content Optimization**: Improve Kim's tips based on user engagement

### Long-term (Months 4-6)

1. **Phase 3 Content**: Complete 96 WV WMAs catalog
2. **Automation**: Build WV DNR data scraper for acreage/GPS/species
3. **Analytics**: Track which WMAs drive highest shop traffic

---

## Constitutional Compliance Checklist

**WVWO Strategic Principles** (from CLAUDE.md):

- ✅ **Simplicity**: No over-engineering, wrapper pattern is DRY but not complex
- ✅ **Authenticity**: Kim's voice guidelines enforced, inline tips feel personal
- ✅ **Free-Tier**: Mapbox Static API free tier (50k requests/month) sufficient
- ✅ **Quality > Speed**: 5-week timeline prioritizes testing, aesthetic compliance, accessibility

**Hard Rules**:

- ✅ **Tech Stack**: Pure Astro components (no Vue/Angular/Svelte)
- ✅ **Voice**: All content reviewed for Kim's authentic rural WV voice
- ✅ **Paid Services**: Mapbox free tier only, no premium plans

**Frontend Aesthetics**:

- ✅ **Corners**: rounded-sm ONLY (enforced in all components)
- ✅ **Fonts**: Bitter/Noto Sans/Permanent Marker (no Inter/Poppins)
- ✅ **Colors**: Brand palette only (brown/green/cream/orange <5%)
- ✅ **Effects**: Gentle-reveal only (no glassmorphism/parallax)

**Workflow Rules**:

- ✅ **Ask, Don't Decide**: 5 critical questions asked, all approved
- ✅ **Short Questions**: Each question answerable in 1-2 words
- ✅ **Concurrent Execution**: All agents spawned in parallel (10-agent swarm)

---

## Estimated Effort Breakdown

| Phase | Tasks | Est. Hours | Est. LOC |
|-------|-------|------------|----------|
| 1. Type System | Schema + types + tests | 4h | 130 |
| 2. Base Component | FeatureSection + wrappers + tests | 8h | 250 |
| 3. Facility Components | CampingList + AmenitiesGrid + tests | 10h | 300 |
| 4. CTA Component | AdventureCTA + tests | 6h | 140 |
| 5. elk-river Refactor | Replace inline sections + tests | 6h | -313 |
| 6. Content Population | 4 new WMAs + frontmatter | 20h | 1,000 |
| 7. Testing Suite | Unit + E2E + a11y + visual | 12h | 500 |
| 8. Performance Optimization | Images + CSS + fonts | 8h | 0 |
| 9. WVWO Aesthetic Audit | Visual compliance + voice | 4h | 0 |
| 10. Documentation & PR | Docs + changelog + PR prep | 6h | 0 |
| **TOTAL** | | **84h** | **~2,000** |

**Timeline**: 5 weeks at ~17 hours/week (part-time) or 2 weeks at full-time

---

## File Manifest (Complete Change List)

### Files to CREATE (14 files)

**Components** (6 files, 690 lines):

1. `wv-wild-web/src/components/adventure/AdventureFeatureSection.astro` (150 lines)
2. `wv-wild-web/src/components/adventure/AdventureWhatToHunt.astro` (50 lines)
3. `wv-wild-web/src/components/adventure/AdventureWhatToFish.astro` (50 lines)
4. `wv-wild-web/src/components/adventure/AdventureCampingList.astro` (180 lines)
5. `wv-wild-web/src/components/adventure/AdventureAmenitiesGrid.astro` (120 lines)
6. `wv-wild-web/src/components/adventure/AdventureCTA.astro` (140 lines)

**Pages** (4 files, 600 lines):
7. `wv-wild-web/src/pages/near/burnsville-lake.astro` (150 lines)
8. `wv-wild-web/src/pages/near/summersville-lake.astro` (150 lines)
9. `wv-wild-web/src/pages/near/holly-river.astro` (150 lines)
10. `wv-wild-web/src/pages/near/cranberry.astro` (150 lines)

**Content** (4 files, 400 lines):
11. `wv-wild-web/src/content/adventures/burnsville-lake.md` (100 lines)
12. `wv-wild-web/src/content/adventures/summersville-lake.md` (100 lines)
13. `wv-wild-web/src/content/adventures/holly-river.md` (100 lines)
14. `wv-wild-web/src/content/adventures/cranberry.md` (100 lines)

### Files to MODIFY (3 files)

1. `wv-wild-web/src/content.config.ts` (+130 lines)
    - Add `type` enum field (line 596)
    - Add 8 WMA optional fields (lines 600-622)
    - Add 5 nested schemas (SpeciesSchema, FishingWaterSchema, etc.)

2. `wv-wild-web/src/types/adventure.ts` (+80 lines)
    - Add CampingFacilitySchema, FeatureItemSchema, AccentColor type
    - Add isWMAAdventure() type guard
    - Export new TypeScript types

3. `wv-wild-web/src/pages/near/elk-river.astro` (-313 lines)
    - Add imports for 6 new components (lines 6-11)
    - Replace What to Hunt section (lines 103-172 → 5 lines)
    - Replace Fishing Waters section (lines 174-209 → 5 lines)
    - Replace Facilities section (lines 247-327 → 8 lines)
    - Replace CTA section (lines 414-445 → 11 lines)
    - **Before: 463 lines → After: 150 lines**

4. `wv-wild-web/src/content/adventures/elk-river.md` (+1 line)
    - Add `type: "wma"` field to frontmatter

### Files to CREATE (Tests) (5 files, 500 lines)

1. `wv-wild-web/src/types/__tests__/wma-schemas.test.ts` (150 lines, 15 tests)
2. `wv-wild-web/src/types/__tests__/type-guards.test.ts` (80 lines, 10 tests)
3. `wv-wild-web/tests/e2e/wma-components.spec.ts` (120 lines, 20 tests)
4. `wv-wild-web/tests/e2e/wma-accessibility.spec.ts` (100 lines, 18 tests)
5. `wv-wild-web/tests/visual/wma-snapshots.spec.ts` (50 lines, 20 snapshots)

**Total Files Changed**: 23 files
**Total New LOC**: ~2,000 lines (1,690 new + 210 schema/types - 313 refactored)

---

## Post-Implementation Validation

### Automated Checks (CI/CD)

```bash
# Type checking
npm run typecheck

# Build validation
npm run build

# Unit tests
npm run test:unit

# E2E tests
npm run test:e2e

# Accessibility
npm run test:a11y

# Lighthouse CI
npm run lighthouse -- --url=/near/burnsville-lake

# Visual regression
npm run test:visual
```

### Manual Checks

- [ ] All 5 WMA pages render correctly
- [ ] Responsive behavior (375px → 1920px)
- [ ] Print preview (regulations, maps)
- [ ] Keyboard navigation (tab order)
- [ ] Screen reader (NVDA, read all sections)
- [ ] WVWO aesthetic (rounded-sm, brand colors)
- [ ] Kim's voice (authentic, not corporate)

---

## Ready for Implementation

This plan provides everything needed to implement SPEC-12 with high confidence in achieving 94+ PR review score (matching SPEC-10/11 quality bar).

**Next Command**: `/speckit.tasks` to generate task breakdown with [P] priority markers

---

**END OF IMPLEMENTATION PLAN**
