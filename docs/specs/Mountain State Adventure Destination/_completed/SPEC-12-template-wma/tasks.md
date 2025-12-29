# Tasks: SPEC-12 WMA Template

**Plan Version:** 1.0.0
**Generated:** 2025-12-27
**Status:** Ready for Implementation
**Branch:** `feature/spec-12-wma-template`

---

## Task Legend

- `[P]` **Parallelizable** - Can run concurrently with other [P] tasks
- `[S]` **Sequential** - Depends on previous tasks completing first
- `[ ]` Not started
- `[X]` Completed
- `[~]` In progress

**PR Strategy**: Single Atomic PR (~2,000 LOC) matching SPEC-11 precedent
**Checkpoints**: Milestones for validation, not separate PRs

---

## Phase 1: Type System Foundation (Week 1, Days 1-2)

**Goal**: Schema extension + TypeScript types + type guards
**Est. Time**: 4 hours | **Est. LOC**: 130 lines

### T-001: Schema Extension
- [ ] [S] Create feature branch `feature/spec-12-wma-template`
  ```bash
  git checkout -b feature/spec-12-wma-template
  ```

- [ ] [S] Extend `wv-wild-web/src/content.config.ts` with type field
  - Add `type: z.enum(['adventure', 'wma']).optional()` at line 596
  - Add comment: "SPEC-12: Explicit type field (Session 2025-12-27)"

- [ ] [S] Add 8 WMA optional fields to adventures schema
  - `acreage: z.number().int().positive().optional()`
  - `county: z.string().optional()`
  - `species: z.array(SpeciesSchema).optional()`
  - `fishingWaters: z.array(FishingWaterSchema).optional()`
  - `facilities: z.array(FacilitySchema).optional()`
  - `accessPoints: z.array(AccessPointSchema).optional()`
  - `regulations: RegulationsSchema.optional()`
  - `seasonHighlights: z.array(SeasonHighlightSchema).optional()`
  - `mapUrl: z.string().url().optional()`

- [ ] [S] Define nested Zod schemas (before adventures schema)
  - `SpeciesSchema` - {name, season, notes?, regulationUrl?}
  - `FishingWaterSchema` - {name, species[], access, notes?}
  - `FacilitySchema` - {type, count?, description, contact?, link?, accessibility?}
  - `AccessPointSchema` - {name, coords?, features[], mapLink?}
  - `RegulationsSchema` - {zone?, restrictions[], regulationsUrl?}
  - `SeasonHighlightSchema` - {season, target, tips}

### T-002: TypeScript Type System
- [ ] [P] Extend `wv-wild-web/src/types/adventure.ts` with new schemas
  - Add `CampingFacilitySchema` export
  - Add `FeatureItemSchema` export (for AdventureFeatureSection)
  - Add `AccentColor` type: `'green' | 'orange' | 'brown' | 'mud'`
  - Location: Append after line 223

- [ ] [P] Add type guard function
  ```typescript
  export function isWMAAdventure(adventure: CollectionEntry<'adventures'>): boolean {
    return adventure.data.type === 'wma';
  }
  ```

- [ ] [P] Export inferred TypeScript types
  ```typescript
  export type CampingFacility = z.infer<typeof CampingFacilitySchema>;
  export type FeatureItem = z.infer<typeof FeatureItemSchema>;
  ```

### T-003: Backward Compatibility Validation
- [ ] [S] Update `wv-wild-web/src/content/adventures/elk-river.md`
  - Add `type: "wma"` field to frontmatter (line 8, after coordinates)
  - Verify existing fields remain unchanged

- [ ] [S] Run build validation
  ```bash
  npm run typecheck   # TypeScript compiles
  npm run build       # Zod validation passes
  ```

### T-004: Unit Tests - Schema Validation
- [ ] [P] Create `wv-wild-web/src/types/__tests__/wma-schemas.test.ts`
  - Test 1: Valid WMA frontmatter passes all fields
  - Test 2: Missing required fields fail (title, description)
  - Test 3: Invalid types fail (acreage as string)
  - Test 4: Negative acreage fails
  - Test 5: Empty species array passes (optional)
  - Test 6: Species without name/season fails
  - Test 7: Fishing waters with empty species array fails
  - Test 8: Facilities with negative count fails
  - Test 9: Malformed GPS coordinates fail
  - Test 10: External URLs without protocol fail
  - Test 11: Regulations with empty restrictions passes
  - Test 12: Season highlights without tips fail
  - Test 13: Hero image with missing alt text fails
  - Test 14: Valid optional fields pass
  - Test 15: Backward compatibility (elk-river.md still builds)

- [ ] [S] Run unit tests
  ```bash
  npm run test:unit -- wma-schemas.test.ts
  ```

**Checkpoint Validation**:
- ✅ TypeScript compiles without errors
- ✅ Build succeeds with new schema
- ✅ 15 unit tests passing
- ✅ elk-river.md still builds

<!-- MILESTONE 1: Type System Complete (130 LOC) -->

---

## Phase 2: Generic Base Component (Week 1, Days 3-4)

**Goal**: AdventureFeatureSection + hunt/fish wrappers
**Est. Time**: 8 hours | **Est. LOC**: 250 lines

### T-005: AdventureFeatureSection Base Component
- [ ] [S] Create `wv-wild-web/src/components/adventure/AdventureFeatureSection.astro`
  - Add JSDoc header with SPEC-12 reference, accessibility notes, example
  - Define Props interface (9 props: title, features, columns, variant, accentColor, animate, intro, ariaLabel)
  - Import FeatureItem type from adventure.ts
  - Import STAT_ICON_PATHS for icons

- [ ] [S] Implement component structure
  - Section wrapper with aria-labelledby
  - Heading (h2) with unique ID generation
  - Optional intro paragraph
  - Intro slot (alternative to intro prop)
  - Responsive grid container with column mapping
  - Feature card template (li elements)

- [ ] [S] Build feature card layout
  - Icon display (optional, from STAT_ICON_PATHS)
  - Feature name (h3, font-display font-bold)
  - Metadata display (season/regulations, text-sm)
  - Description paragraph (font-body)
  - Kim's note (font-hand, italic, border-top)
  - Border-left accent color system

- [ ] [S] Add responsive grid logic
  ```typescript
  const columnClasses: Record<2 | 3, string> = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };
  ```

- [ ] [S] Add accent color mapping
  ```typescript
  const accentColors: Record<AccentColor, string> = {
    green: 'border-l-sign-green',
    orange: 'border-l-brand-orange',
    brown: 'border-l-brand-brown',
    mud: 'border-l-brand-mud',
  };
  ```

- [ ] [S] Implement gentle-reveal animation
  - Add `@keyframes gentle-reveal` (0.6s ease-out, opacity + translateY)
  - Stagger delays per card (index × 100ms)
  - Add `@media (prefers-reduced-motion: reduce)` fallback

- [ ] [S] Add conditional rendering
  - Hide section if features.length === 0
  - Hide icon if not provided
  - Hide Kim's note if not provided
  - Hide metadata if not provided

- [ ] [S] Add footer and default slots
  ```astro
  {Astro.slots.has('footer') && <slot name="footer" />}
  <slot />
  ```

### T-006: Wrapper Components
- [ ] [P] Create `wv-wild-web/src/components/adventure/AdventureWhatToHunt.astro`
  - JSDoc header with hunting-specific example
  - Props interface (features, title?, intro?, columns?, variant?, animate?)
  - Default values: title="What to Hunt", variant="cream", accentColor="green"
  - Delegate to AdventureFeatureSection with hunting presets
  - Slot passthrough (intro, footer, default)
  - Conditional rendering (hide if features empty)

- [ ] [P] Create `wv-wild-web/src/components/adventure/AdventureWhatToFish.astro`
  - JSDoc header with fishing-specific example
  - Props interface (features, title?, intro?, columns?, variant?, animate?)
  - Default values: title="What to Fish", variant="white", accentColor="green"
  - Delegate to AdventureFeatureSection with fishing presets
  - Slot passthrough
  - Conditional rendering

### T-007: Base Component Testing
- [ ] [P] Create test page `wv-wild-web/src/pages/__test-feature-section.astro`
  - Import AdventureFeatureSection
  - Test 2-column grid with sample features
  - Test 3-column grid variant
  - Test white vs cream backgrounds
  - Test Kim's notes rendering (font-hand)
  - Test empty state (features: [])

- [ ] [P] Unit tests for component logic
  - Test column mapping logic (2 → 'grid-cols-1 md:grid-cols-2')
  - Test accent color mapping (green → 'border-l-sign-green')
  - Test variant classes (cream → 'bg-brand-cream')
  - Test conditional rendering (empty features returns null)

- [ ] [P] Create `wv-wild-web/src/components/adventure/__tests__/AdventureFeatureSection.test.ts`
  - Test 1: Renders 2-column grid for columns=2
  - Test 2: Renders 3-column grid for columns=3
  - Test 3: Applies correct accent color class
  - Test 4: Displays Kim's notes in font-hand
  - Test 5: Hides notes when kimNote undefined
  - Test 6: Hides section when features empty
  - Test 7: Applies cream background for variant="cream"

### T-008: E2E Tests - Base Component
- [ ] [P] Create `wv-wild-web/tests/e2e/feature-section.spec.ts`
  - Test 1: Component renders in DOM
  - Test 2: Heading displays correct title
  - Test 3: Grid applies responsive classes
  - Test 4: Feature cards render from array
  - Test 5: Icons display when provided
  - Test 6: Kim's notes render in Permanent Marker
  - Test 7: Empty state hides section
  - Test 8: Intro slot content renders
  - Test 9: Footer slot content renders
  - Test 10: Animation respects prefers-reduced-motion

**Checkpoint Validation**:
- ✅ AdventureFeatureSection renders correctly (all props work)
- ✅ Wrappers delegate correctly to base
- ✅ 7 unit tests + 10 E2E tests passing
- ✅ Visual QA: matches elk-river.astro patterns

<!-- MILESTONE 2: Base Component Complete (250 LOC, Running Total: 380 LOC) -->

---

## Phase 3: Facility Components (Week 1, Days 5-7)

**Goal**: CampingList + AmenitiesGrid for facility display
**Est. Time**: 10 hours | **Est. LOC**: 300 lines

### T-009: AdventureCampingList Component
- [ ] [P] Create `wv-wild-web/src/components/adventure/AdventureCampingList.astro`
  - JSDoc header with facility example
  - Props interface (title?, intro?, facilities, columns?, variant?, animate?)
  - Import CampingFacility type from adventure.ts
  - Section wrapper with aria-labelledby

- [ ] [S] Implement 3-column responsive grid
  ```typescript
  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  ```

- [ ] [S] Build facility card template
  - Facility type heading with optional count badge
  - Description paragraph
  - Phone number as tel: link (strip non-digits)
  - External link with rel="noopener noreferrer" + sr-only text
  - Accessibility info with icon

- [ ] [S] Add phone number formatting
  ```typescript
  href={`tel:${facility.contact.replace(/\D/g, '')}`}
  ```

- [ ] [S] Add external link security
  ```astro
  <a href={facility.link} target="_blank" rel="noopener noreferrer">
    Reserve Online
    <span class="sr-only">(opens in new tab)</span>
  </a>
  ```

- [ ] [S] Add count badge rendering
  ```astro
  {facility.count && (
    <span class="ml-2 text-sm font-normal text-brand-mud">
      ({facility.count})
    </span>
  )}
  ```

- [ ] [S] Add gentle-reveal animation with stagger
- [ ] [S] Add empty state handling (hide if facilities.length === 0)

### T-010: AdventureAmenitiesGrid Component
- [ ] [P] Create `wv-wild-web/src/components/adventure/AdventureAmenitiesGrid.astro`
  - JSDoc header with amenities example
  - Props interface (title?, intro?, amenities, columns?, variant?, animate?)
  - Import STAT_ICON_PATHS for checkmark icon

- [ ] [S] Implement configurable grid
  ```typescript
  const columnClasses: Record<2 | 3 | 4, string> = {
    2: 'grid-cols-2 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };
  ```

- [ ] [S] Build amenity list item template
  - Checkmark SVG icon (sign-green, w-5 h-5)
  - Amenity text (font-body, text-brand-brown)
  - Flex layout (items-center gap-2.5)

- [ ] [S] Add gentle-reveal animation
- [ ] [S] Add footer slot for CTAs
- [ ] [S] Add empty state handling

### T-011: Facility Components Testing
- [ ] [P] Unit tests for AdventureCampingList
  - Test 1: Renders facilities with count badges
  - Test 2: Formats phone numbers as tel: links (strips formatting)
  - Test 3: Adds security attributes to external links
  - Test 4: Displays accessibility info when provided
  - Test 5: Applies correct column classes
  - Test 6: Hides when facilities array empty
  - Test 7: Applies cream background for variant="cream"

- [ ] [P] Unit tests for AdventureAmenitiesGrid
  - Test 1: Renders checkmark icons (sign-green)
  - Test 2: Applies responsive grid (2/3/4 columns)
  - Test 3: Handles long amenity text gracefully
  - Test 4: Hides section when amenities array empty
  - Test 5: Renders footer slot content

- [ ] [P] E2E tests for both components
  - Test 1: CampingList renders 3-column grid on desktop
  - Test 2: Phone link clickable, opens dialer
  - Test 3: External link opens in new tab
  - Test 4: Count badges display correctly
  - Test 5: AmenitiesGrid renders checkmarks
  - Test 6: Responsive grid collapse on mobile (2 cols)
  - Test 7: Empty arrays hide sections

**Checkpoint Validation**:
- ✅ Both components render correctly
- ✅ Phone/external link handling works
- ✅ 12 unit tests + 7 E2E tests passing

<!-- MILESTONE 3: Facility Components Complete (300 LOC, Running Total: 680 LOC) -->

<!-- PR-CHECKPOINT: Components Foundation (680 LOC) -->

---

## Phase 4: CTA Component (Week 2, Days 1-2)

**Goal**: Universal call-to-action component
**Est. Time**: 6 hours | **Est. LOC**: 140 lines

### T-012: AdventureCTA Component
- [ ] [S] Create `wv-wild-web/src/components/adventure/AdventureCTA.astro`
  - JSDoc header with dual-button example
  - Props interface (heading, description?, primaryText/Href, secondaryText/Href?, variant?, icons, external flags)

- [ ] [S] Implement variant system
  ```typescript
  const variantClasses = {
    'sign-green': 'bg-sign-green text-white',
    'brand-brown': 'bg-brand-brown text-brand-cream',
  }[variant];
  ```

- [ ] [S] Build primary button (filled style)
  - Conditional icon rendering (location SVG if showLocationIcon)
  - Background: white on green, orange on brown
  - Hover: bg-brand-cream or bg-brand-orange/90
  - Focus: ring-2 ring-white/60 or ring-brand-orange/60

- [ ] [S] Build secondary button (outlined style)
  - Conditional icon rendering (phone SVG if showPhoneIcon)
  - Background: white/10 or cream/10
  - Border: white/30 or cream/30
  - Hover: bg-white/20 or bg-cream/20

- [ ] [S] Add external link auto-detection
  ```typescript
  const isPrimaryExternal = primaryExternal || primaryHref.startsWith('http');
  ```

- [ ] [S] Add sr-only text for external links
  ```astro
  {isPrimaryExternal && <span class="sr-only"> (opens in new tab)</span>}
  ```

- [ ] [S] Add responsive layout (flex-wrap, justify-center, gap-4)
- [ ] [S] Add gentle-reveal animation
- [ ] [S] Add default slot for custom content

### T-013: CTA Component Testing
- [ ] [P] Unit tests for AdventureCTA
  - Test 1: Renders both buttons when secondaryText provided
  - Test 2: Hides secondary button when secondaryText undefined
  - Test 3: Applies sign-green variant classes correctly
  - Test 4: Applies brand-brown variant classes correctly
  - Test 5: Auto-detects external links (starts with http)
  - Test 6: Icons only render when flags true
  - Test 7: Sr-only text added for external links

- [ ] [P] E2E tests for AdventureCTA
  - Test 1: Primary button navigates correctly
  - Test 2: Secondary button navigates correctly
  - Test 3: External links open in new tab
  - Test 4: Icons display when flags enabled
  - Test 5: Responsive layout (stack mobile, row desktop)
  - Test 6: Focus states visible on keyboard nav
  - Test 7: Animation respects prefers-reduced-motion

**Checkpoint Validation**:
- ✅ Component renders both variants
- ✅ Buttons navigate correctly
- ✅ 7 unit tests + 7 E2E tests passing

<!-- MILESTONE 4: CTA Component Complete (140 LOC, Running Total: 820 LOC) -->

---

## Phase 5: elk-river Refactoring (Week 2, Days 3-4)

**Goal**: Replace inline sections with components, validate integration
**Est. Time**: 6 hours | **Est. LOC**: -313 lines (net reduction)

### T-014: Import New Components
- [ ] [S] Add imports to `wv-wild-web/src/pages/near/elk-river.astro` (after line 6)
  ```astro
  import AdventureFeatureSection from '../../components/adventure/AdventureFeatureSection.astro';
  import AdventureWhatToHunt from '../../components/adventure/AdventureWhatToHunt.astro';
  import AdventureWhatToFish from '../../components/adventure/AdventureWhatToFish.astro';
  import AdventureCampingList from '../../components/adventure/AdventureCampingList.astro';
  import AdventureAmenitiesGrid from '../../components/adventure/AdventureAmenitiesGrid.astro';
  import AdventureCTA from '../../components/adventure/AdventureCTA.astro';
  ```

### T-015: Replace What to Hunt Section
- [ ] [S] Extract species data to features array (in frontmatter around line 40)
  ```astro
  const huntingFeatures: FeatureItem[] = [
    {
      name: 'White-tailed Deer',
      description: 'Abundant in oak stands and regenerating cuts...',
      metadata: 'Nov 13 - Dec 31 (firearms), Sep 1 - Jan 31 (archery)',
      kimNote: "Wind's tricky in the steep terrain — play it carefully.",
    },
    // ... 4 more species
  ];
  ```

- [ ] [S] Replace lines 103-172 (70 lines) with component
  ```astro
  <AdventureWhatToHunt features={huntingFeatures} />
  ```

### T-016: Replace Fishing Waters Section
- [ ] [S] Extract fishing data to features array
  ```astro
  const fishingFeatures: FeatureItem[] = [
    {
      name: 'Elk River & Holly River',
      description: 'Smallmouth, largemouth, spotted bass, catfish, and trout...',
      metadata: 'Year-round (trout stocking Feb-May)',
      kimNote: 'Bring waders for creek fishing.',
    },
    // ... 1 more water
  ];
  ```

- [ ] [S] Replace lines 174-209 (36 lines) with component
  ```astro
  <AdventureWhatToFish features={fishingFeatures} />
  ```

### T-017: Replace Facilities Section
- [ ] [S] Extract facility data to facilities array
  ```astro
  const facilities: CampingFacility[] = [
    {
      type: 'Camping Sites',
      count: 240,
      description: 'Tent and trailer sites, primitive and improved available.',
    },
    {
      type: 'Shooting Ranges',
      count: 2,
      description: '100-yard rifle range and 175-yard range.',
    },
    // ... more facilities
  ];
  ```

- [ ] [S] Replace lines 247-327 (81 lines) with component
  ```astro
  <AdventureCampingList
    title="Camping & Facilities"
    facilities={facilities}
    columns={3}
    variant="white"
  />
  ```

### T-018: Replace CTA Section
- [ ] [S] Replace lines 414-445 (32 lines) with component
  ```astro
  <AdventureCTA
    heading="Stop By Before You Head Out"
    description="We're on your way. Grab your license, stock up on ammo, and we'll point you to the best spots on the WMA."
    primaryText="Get Directions to Shop"
    primaryHref={SITE_CONTACT.mapsUrl}
    primaryExternal
    showLocationIcon
    secondaryText={SITE_CONTACT.phoneDisplay}
    secondaryHref={SITE_CONTACT.phoneHref}
    showPhoneIcon
  />
  ```

### T-019: Visual Regression Testing
- [ ] [S] Capture baseline screenshots of original elk-river.astro
  - Mobile (375px)
  - Tablet (768px)
  - Desktop (1280px)

- [ ] [S] Capture screenshots after refactoring
  - Same 3 viewports

- [ ] [S] Visual comparison
  - Verify pixel-perfect match (or document intentional improvements)
  - Check spacing, colors, fonts unchanged
  - Verify animations identical

- [ ] [S] Performance comparison
  - Before: Lighthouse scores
  - After: Lighthouse scores
  - Verify no regression (target: same or better)

**Checkpoint Validation**:
- ✅ elk-river.astro reduced from 463 → ~150 lines
- ✅ Visual regression test passes (identical rendering)
- ✅ Performance unchanged or improved
- ✅ All 9 sections functional

<!-- MILESTONE 5: Refactoring Complete (Running Total: 507 LOC net) -->

---

## Phase 6: Content Population (Week 3)

**Goal**: Create 4 new WMA pages with frontmatter
**Est. Time**: 20 hours (5h per WMA) | **Est. LOC**: 1,000 lines

### T-020: Burnsville Lake WMA (5 hours, 250 LOC)
- [ ] [P] Research content (parallel with other WMAs)
  - WV DNR page: acreage, GPS, species, regulations
  - Google Maps: driving directions from shop
  - Kim's local knowledge: tips, best times, access notes

- [ ] [S] Create `wv-wild-web/src/content/adventures/burnsville-lake.md`
  - Add `type: "wma"` field
  - Add required fields: title, description, heroImage, coordinates
  - Add WMA fields: acreage (1,000), county ("Braxton")
  - Add 3-5 species with seasons and Kim's tips
  - Add 1-3 fishing waters with species lists
  - Add facilities array (camping, boat ramps, parking)
  - Add access points with GPS
  - Add regulations (zone, restrictions)
  - Add 2-3 season highlights with tactical tips

- [ ] [S] Create `wv-wild-web/src/pages/near/burnsville-lake.astro`
  - Import 10 components (6 new + 4 existing)
  - Add Schema.org structured data (Place type)
  - Add breadcrumbs (Home → Hunt Near Us → Burnsville Lake)
  - Compose sections in canonical order (Hero → Stats → Hunt → Fish → Directions → Facilities → Gear → CTA → Newsletter)
  - Configure background alternation (cream → white → cream)

- [ ] [S] Source hero image
  - Find/create 1920×1080 image
  - Optimize to WebP (<500KB)
  - Save to `public/images/wma/burnsville-lake-hero.webp`
  - Write descriptive alt text (125 chars)

- [ ] [S] Build validation
  ```bash
  npm run build         # Zod schema validation
  npm run dev           # Visual QA at /near/burnsville-lake
  ```

### T-021: Summersville Lake WMA (5 hours, 250 LOC)
- [ ] [P] Research content (WV DNR + Google Maps + Kim's knowledge)
- [ ] [S] Create `wv-wild-web/src/content/adventures/summersville-lake.md`
  - Full frontmatter (15+ fields)
  - Species: Deer, turkey, squirrel, grouse
  - Fishing: Summersville Lake (bass, walleye, crappie)
  - Drive time: 30 min from shop
- [ ] [S] Create `wv-wild-web/src/pages/near/summersville-lake.astro`
- [ ] [S] Source and optimize hero image
- [ ] [S] Build validation and visual QA

### T-022: Holly River WMA (5 hours, 250 LOC)
- [ ] [P] Research content
- [ ] [S] Create `wv-wild-web/src/content/adventures/holly-river.md`
  - Full frontmatter (15+ fields)
  - Species: Deer, bear, turkey, trout fishing
  - Drive time: 35 min from shop
- [ ] [S] Create `wv-wild-web/src/pages/near/holly-river.astro`
- [ ] [S] Source and optimize hero image
- [ ] [S] Build validation and visual QA

### T-023: Cranberry WMA (5 hours, 250 LOC)
- [ ] [P] Research content
- [ ] [S] Create `wv-wild-web/src/content/adventures/cranberry.md`
  - Full frontmatter (15+ fields)
  - Species: Deer, bear, turkey, grouse (largest WMA, 158k acres)
  - Fishing: Cranberry River (trout, native brook trout)
  - Drive time: 40 min from shop
- [ ] [S] Create `wv-wild-web/src/pages/near/cranberry.astro`
- [ ] [S] Source and optimize hero image
- [ ] [S] Build validation and visual QA

### T-024: Content Review & Polish
- [ ] [S] Kim's voice audit
  - Review all tips for authenticity
  - Check for marketing buzzwords ("seamless", "unlock", etc.)
  - Verify specific local knowledge (not generic advice)
  - Ensure humble expertise tone

- [ ] [S] Fact-checking
  - Verify hunting seasons against WV DNR 2025-2026 regs
  - Verify GPS coordinates (cross-check Google Maps)
  - Verify acreage (cross-check WV DNR GIS data)
  - Verify facility counts (camping sites, boat ramps)

- [ ] [S] Image optimization
  - All hero images <500KB
  - WebP format with JPEG fallback
  - Descriptive alt text (125 char target)

- [ ] [P] **AgentDB + ReasoningBank Learning - Store Phase 1 Patterns**
  - **AgentDB Pattern Storage**: Store Kim's tips from 5 Phase 1 WMAs
  ```bash
  npx agentdb@latest reflexion store "wvwo-wma-tips" "elk-river-deer-tip" 1.0 true "Bucks here run 100-150 inches. Creek bottoms at dawn."
  npx agentdb@latest reflexion store "wvwo-wma-tips" "elk-river-turkey-tip" 1.0 true "Ridge tops for gobbler calls. Wind swirls in hollows."
  # ... store all Phase 1 tips with metadata (WMA name, species, terrain type)
  ```

  - **ReasoningBank Trajectory Tracking**: Track content creation outcomes
  ```bash
  # Track successful content (Kim approved on first review)
  npx agentdb@latest reflexion store "wvwo-content-trajectory" "burnsville-species-tips-success" 1.0 true "WMA: Burnsville, Approach: Specific measurements + terrain tactics, Outcome: Kim approved immediately, Metrics: 5/5 tips accepted"

  # Track rejected content (needed heavy editing)
  npx agentdb@latest reflexion store "wvwo-content-trajectory" "summersville-generic-advice-rejected" 0.3 false "WMA: Summersville, Approach: Generic hunting advice, Outcome: Kim rejected as too corporate, Metrics: 0/5 tips accepted, needed rewrite"
  ```

  - **Verdict Judgment**: Before suggesting Phase 2 tips, query ReasoningBank
  ```bash
  # Retrieve similar successful patterns
  npx agentdb@latest reflexion retrieve "deer hunting tips mountainous terrain" --k 10
  # Returns: Successful patterns (reward 1.0) with similar metadata
  ```

  - **Pattern for Phase 2/3**:
    1. AI retrieves similar successful tips from ReasoningBank
    2. AI drafts new tip based on learned patterns
    3. Kim edits for authenticity (10 min vs 1 hour per WMA)
    4. Store outcome (approved/rejected) for continuous learning

**Checkpoint Validation**:
- ✅ 4 new WMAs published (Burnsville, Summersville, Holly River, Cranberry)
- ✅ All frontmatter validates (Zod schema passes)
- ✅ Kim's voice authentic (passes neighbor litmus test)
- ✅ Data accuracy verified (WV DNR sources)

<!-- MILESTONE 6: Content Population Complete (1,000 LOC, Running Total: 1,507 LOC) -->

<!-- PR-CHECKPOINT: Content Complete (1,507 LOC) -->

---

## Phase 7: Comprehensive Testing (Week 4, Days 1-3)

**Goal**: Full test suite (unit + E2E + accessibility + visual)
**Est. Time**: 12 hours | **Est. LOC**: 500 lines (test code)

### T-025: Unit Test Suite Completion
- [ ] [P] Create `wv-wild-web/src/types/__tests__/type-guards.test.ts`
  - Test 1: isWMAAdventure() returns true for type="wma"
  - Test 2: isWMAAdventure() returns false for type="adventure"
  - Test 3: isWMAAdventure() returns false for type undefined
  - Test 4: TypeScript narrows type correctly after guard
  - Test 5: Type guard works with CollectionEntry

- [ ] [P] Backward compatibility tests
  - Test 1: Existing elk-river.md still builds
  - Test 2: Non-WMA adventures ignore WMA fields
  - Test 3: Partial WMA data (only acreage) valid
  - Test 4: Type inference works for Content Collections

- [ ] [P] Type safety tests
  - Test 1: TypeScript autocomplete works for WMA fields
  - Test 2: Optional fields are `| undefined` in types
  - Test 3: Nested object types inferred correctly
  - Test 4: Component props match schema types

- [ ] [S] Run full unit test suite
  ```bash
  npm run test:unit
  ```
  - Target: 43+ tests passing
  - Coverage target: ≥85% line coverage

### T-026: E2E Test Suite
- [ ] [P] Create `wv-wild-web/tests/e2e/wma-components.spec.ts`
  - **FeatureSection Tests** (5 tests):
    - Test 1: Renders 2-column grid on desktop
    - Test 2: Renders 1-column on mobile (375px)
    - Test 3: Border-left accent applies correctly
    - Test 4: Kim's notes in font-hand
    - Test 5: Intro slot renders content

  - **CampingList Tests** (4 tests):
    - Test 1: Renders 3-column grid
    - Test 2: Count badges display
    - Test 3: Phone link works
    - Test 4: External link opens new tab

  - **AmenitiesGrid Tests** (3 tests):
    - Test 1: Checkmarks render (sign-green)
    - Test 2: Configurable columns (2/3/4)
    - Test 3: Empty array hides section

  - **CTA Tests** (3 tests):
    - Test 1: Dual buttons render
    - Test 2: Variant backgrounds apply
    - Test 3: Icons display when enabled

  - **Wrappers Tests** (5 tests):
    - Test 1: WhatToHunt sets hunting defaults
    - Test 2: WhatToFish sets fishing defaults
    - Test 3: Empty features hide sections
    - Test 4: Slots pass through correctly
    - Test 5: Props delegate to base component

- [ ] [P] Integration tests (full WMA pages)
  - Test 1: Burnsville Lake renders all sections
  - Test 2: Summersville Lake renders correctly
  - Test 3: Holly River renders correctly
  - Test 4: Cranberry renders correctly
  - Test 5: elk-river refactored version matches original
  - Test 6: Section background alternation (cream → white)
  - Test 7: Conditional sections hide when data missing

- [ ] [S] Run E2E suite
  ```bash
  npm run test:e2e
  ```
  - Target: 35+ scenarios passing

### T-027: Accessibility Testing
- [ ] [P] Create `wv-wild-web/tests/e2e/wma-accessibility.spec.ts`
  - **Color Contrast** (5 tests):
    - Test 1: Brown on cream ≥4.5:1
    - Test 2: Green on cream ≥4.5:1
    - Test 3: Orange on white ≥4.5:1
    - Test 4: White on green ≥4.5:1 (CTA)
    - Test 5: Large text ≥3:1

  - **Semantic HTML** (8 tests):
    - Test 1: Single h1 per page
    - Test 2: No skipped heading levels
    - Test 3: Lists use ul/ol elements
    - Test 4: Links have descriptive text
    - Test 5: Images have alt text
    - Test 6: Proper landmark regions
    - Test 7: Buttons use <a> not <div role="button">
    - Test 8: External links have sr-only notifications

  - **Keyboard Navigation** (5 tests):
    - Test 1: All interactive elements reachable via Tab
    - Test 2: Focus order follows visual order
    - Test 3: Focus indicators visible (ring-2 ring-brand-orange)
    - Test 4: No keyboard traps
    - Test 5: Skip to content link works

- [ ] [S] Install axe-core Playwright
  ```bash
  npm install --save-dev @axe-core/playwright
  ```

- [ ] [S] Run automated accessibility tests
  ```bash
  npm run test:a11y    # Custom script: playwright test wma-accessibility
  ```
  - Target: Zero violations on all 5 WMA pages

- [ ] [P] Manual screen reader testing
  - Test with NVDA on Windows (elk-river.astro)
  - Navigate by landmarks (sections)
  - Navigate by headings (h1 → h2 → h3)
  - Verify Kim's notes announced correctly
  - Verify external link notifications

### T-028: Visual Regression Testing
- [ ] [P] Create `wv-wild-web/tests/visual/wma-snapshots.spec.ts`
  - **Full Pages** (mobile + desktop):
    - elk-river.astro (2 snapshots)
    - burnsville-lake.astro (2 snapshots)
    - summersville-lake.astro (2 snapshots)
    - holly-river.astro (2 snapshots)
    - cranberry.astro (2 snapshots)

  - **Individual Components** (all variants):
    - AdventureFeatureSection (2-col, 3-col)
    - AdventureCampingList (2-col, 3-col)
    - AdventureAmenitiesGrid (2/3/4 cols)
    - AdventureCTA (green, brown variants)
    - WhatToHunt with multiple species
    - WhatToFish with multiple waters

  - **State Variations**:
    - Hover states (CTA buttons)
    - Focus states (keyboard nav)
    - Empty states (no facilities, no fishing)

- [ ] [S] Generate baseline snapshots
  ```bash
  npm run test:visual -- --update-snapshots
  ```
  - Total: 20 snapshot baselines

**Checkpoint Validation**:
- ✅ 43+ unit tests passing
- ✅ 35+ E2E tests passing
- ✅ Zero axe-core violations (WCAG 2.1 AA)
- ✅ 20 visual regression baselines captured

<!-- MILESTONE 7: Testing Complete (500 LOC test code, Running Total: 2,007 LOC) -->

<!-- PR-CHECKPOINT: Full Test Suite (2,007 LOC) -->

---

## Phase 8: Performance Optimization (Week 4, Days 4-5)

**Goal**: Achieve <2s load on 3G, Lighthouse 95+/100
**Est. Time**: 8 hours | **Est. LOC**: 0 lines (optimization only)

### T-029: Image Optimization
- [ ] [P] Convert all hero images to WebP
  ```bash
  # For each WMA hero image
  cwebp -q 85 input.jpg -o output.webp
  ```
  - elk-river-hero.webp
  - burnsville-lake-hero.webp
  - summersville-lake-hero.webp
  - holly-river-hero.webp
  - cranberry-hero.webp

- [ ] [P] Generate responsive srcsets
  - 400w, 800w, 1200w breakpoints
  - Save to `public/images/wma/`

- [ ] [P] Verify file sizes
  - Each hero <500KB
  - Total images <700KB across all 5 WMAs

- [ ] [P] Add lazy loading attributes
  - Below-fold images: `loading="lazy"`
  - Above-fold (hero): `loading="eager"`

### T-030: CSS Optimization
- [ ] [S] Extract critical CSS
  - Identify above-fold styles
  - Inline in `<head>` tag (target: <14KB)
  - Async load non-critical CSS

- [ ] [S] Verify Tailwind tree-shaking
  ```bash
  npm run build
  # Check output CSS size (should be ~15KB, not 3MB)
  ```

- [ ] [P] Remove unused CSS
  - Run PurgeCSS or Tailwind's built-in purge
  - Verify custom WVWO styles preserved

### T-031: Font Optimization
- [ ] [P] Subset WVWO fonts
  - Bitter (display headings) - Remove unused glyphs
  - Noto Sans (body text) - Latin subset only
  - Permanent Marker (Kim's notes) - Basic glyphs
  - Target: 150KB → 75KB total

- [ ] [P] Add font preloading
  ```html
  <link rel="preload" href="/fonts/bitter-subset.woff2" as="font" type="font/woff2" crossorigin>
  ```

### T-032: Performance Testing
- [ ] [S] Lighthouse CI setup
  ```bash
  npm install --save-dev @lhci/cli
  ```

- [ ] [S] Run Lighthouse audits on all 5 WMA pages
  ```bash
  npm run lighthouse -- --url=/near/elk-river
  npm run lighthouse -- --url=/near/burnsville-lake
  npm run lighthouse -- --url=/near/summersville-lake
  npm run lighthouse -- --url=/near/holly-river
  npm run lighthouse -- --url=/near/cranberry
  ```
  - Performance: ≥95/100
  - Accessibility: 100/100
  - Best Practices: 100/100
  - SEO: 100/100

- [ ] [S] 3G network testing (Chrome DevTools)
  - Throttle to 3G (0.4 Mbps)
  - Load time target: <2 seconds
  - Test all 5 WMA pages

- [ ] [P] Real device testing (if possible)
  - iPhone SE (rural WV common device)
  - Android budget phone (Pixel 5 or similar)

### T-033: Bundle Analysis
- [ ] [S] Analyze component bundle sizes
  ```bash
  npm run build -- --analyze
  ```
  - Verify each component <20KB
  - Check total page weight <500KB

- [ ] [S] Identify optimization opportunities
  - Unused imports
  - Duplicate code
  - Large dependencies

**Checkpoint Validation**:
- ✅ Lighthouse Performance ≥95/100 on all 5 WMAs
- ✅ Page load <2s on 3G
- ✅ Total page weight <500KB
- ✅ Core Web Vitals passing (LCP <2.5s, FID <100ms, CLS <0.1)

<!-- MILESTONE 8: Performance Optimized -->

---

## Phase 9: WVWO Aesthetic Audit (Week 5, Days 1-2)

**Goal**: 100% brand compliance
**Est. Time**: 4 hours | **Est. LOC**: 0 lines (audit only)

### T-034: Visual Compliance Audit
- [ ] [P] Automated pattern detection
  ```bash
  # Check for forbidden patterns
  grep -r "rounded-md\|rounded-lg\|rounded-xl" wv-wild-web/src/components/adventure/
  grep -r "backdrop-blur\|bg-gradient" wv-wild-web/src/components/adventure/
  grep -r "text-purple\|bg-purple\|text-pink" wv-wild-web/src/components/adventure/
  ```
  - Target: Zero matches

- [ ] [P] Color palette audit
  - Verify only brand-brown, sign-green, brand-cream, brand-orange used
  - Check orange usage <5% of screen (CTAs only)
  - Verify no stone-*/gray-* colors

- [ ] [P] Typography audit
  - Verify font-display (Bitter) for headings
  - Verify font-body (Noto Sans) for content
  - Verify font-hand (Permanent Marker) for Kim's notes
  - Check no Inter, Poppins, DM Sans, system-ui

- [ ] [P] Spacing/layout audit
  - Verify rounded-sm corners on all cards/buttons
  - Check transition-colors duration-300 consistency
  - Verify py-12 md:py-16 section padding

### T-035: Animation Compliance
- [ ] [S] Animation audit
  - Verify only gentle-reveal animation used
  - Check no bouncy/parallax effects
  - Verify prefers-reduced-motion support

- [ ] [S] Test motion preferences
  - Enable "Reduce motion" in OS settings
  - Reload all 5 WMA pages
  - Verify animations disabled

### T-036: Voice & Content Audit
- [ ] [P] Content voice review (per WMA)
  - Burnsville Lake: Check all Kim's tips
  - Summersville Lake: Check all Kim's tips
  - Holly River: Check all Kim's tips
  - Cranberry: Check all Kim's tips
  - Verify specific local knowledge (not generic)
  - Check for marketing buzzwords
  - Ensure humble expertise tone

- [ ] [S] Kim's final approval
  - Walk through all 5 WMA pages with Kim
  - Gather feedback on tips, descriptions, voice
  - Make edits if needed

**Checkpoint Validation**:
- ✅ Zero forbidden patterns detected
- ✅ 100% brand palette compliance
- ✅ Orange <5% of screen
- ✅ Kim approves all content voice

<!-- MILESTONE 9: WVWO Aesthetic Verified -->

---

## Phase 10: Documentation & PR Prep (Week 5, Days 3-5)

**Goal**: Complete docs and submit PR
**Est. Time**: 6 hours | **Est. LOC**: 0 lines (documentation)

### T-037: Component API Documentation
- [ ] [P] Update component JSDoc (ensure all examples present)
  - AdventureFeatureSection.astro - Usage example with 2 features
  - AdventureWhatToHunt.astro - Hunting features example
  - AdventureWhatToFish.astro - Fishing features example
  - AdventureCampingList.astro - Facilities array example
  - AdventureAmenitiesGrid.astro - Amenities string array example
  - AdventureCTA.astro - Dual-button example

- [ ] [P] Update `.serena/memories/wvwo-component-patterns.md`
  - Document wrapper pattern (generic + semantic wrappers)
  - Document phone formatting: `tel:${contact.replace(/\D/g, '')}`
  - Document external link security: `rel="noopener noreferrer"`
  - Document type guard pattern: `isWMAAdventure()`

### T-038: Migration Guide
- [ ] [S] Create migration guide for future WMAs
  - Template frontmatter (copy-paste ready)
  - Required vs optional fields list
  - Kim's voice guidelines (with good/bad examples)
  - Component composition pattern (canonical section order)

- [ ] [S] Document refactoring pattern
  - How to convert inline sections to components
  - Data extraction (inline → frontmatter arrays)
  - Component prop mapping

### T-039: Changelog
- [ ] [S] Create `docs/specs/Mountain State Adventure Destination/SPEC-12-template-wma/CHANGELOG.md`
  - **Added**: 6 new components, 8 schema fields, 4 WMAs
  - **Changed**: elk-river.astro refactored (463 → 150 lines)
  - **Deprecated**: None
  - **Breaking Changes**: None (all WMA fields optional)

### T-040: PR Preparation
- [ ] [S] Create PR description
  - Summary: "feat(SPEC-12): WMA Template Component System"
  - **Components**: List 6 new components with line counts
  - **Schema**: Document type field + 8 WMA fields
  - **Content**: 4 new WMAs (Burnsville, Summersville, Holly River, Cranberry)
  - **Refactoring**: elk-river.astro (463 → 150 lines, 73% reduction)
  - **Testing**: 78+ tests (43 unit + 35 E2E + accessibility)
  - **Performance**: Lighthouse 95+/100, <2s on 3G
  - **LOC**: ~2,000 lines net

- [ ] [S] Add before/after screenshots
  - elk-river.astro original (baseline)
  - elk-river.astro refactored (visual parity)
  - Burnsville Lake full page (desktop)
  - Component samples (grid layouts)

- [ ] [S] Create PR checklist
  - [ ] All 40 acceptance criteria met (from spec.md)
  - [ ] Zero CodeRabbit "must fix" issues
  - [ ] Lighthouse 95+/100/100/100
  - [ ] axe-core zero violations
  - [ ] Visual regression baselines approved
  - [ ] Kim approves content voice
  - [ ] WVWO aesthetic 100% compliant
  - [ ] Documentation complete

### T-041: Greptile Custom Context
- [ ] [S] Add pattern to `.greptile/config.yml` (or via web UI)
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
  ```

### T-042: Final Pre-PR Checklist
- [ ] [S] Run full test suite
  ```bash
  npm run test        # All tests
  npm run typecheck   # TypeScript
  npm run build       # Production build
  ```

- [ ] [S] Visual inspection (all 5 WMAs)
  - Mobile (375px) - iPhone SE
  - Tablet (768px) - iPad
  - Desktop (1280px) - Laptop
  - Wide (1920px) - Desktop monitor

- [ ] [S] Commit all changes
  ```bash
  git add .
  git commit -m "feat(SPEC-12): WMA Template Component System

  - 6 new components (FeatureSection, WhatToHunt, WhatToFish, CampingList, AmenitiesGrid, CTA)
  - Schema extension (type field + 8 WMA fields)
  - 4 new WMAs (Burnsville, Summersville, Holly River, Cranberry)
  - elk-river refactored (463 → 150 lines, 73% reduction)
  - 78+ tests (43 unit + 35 E2E + accessibility)
  - Performance: Lighthouse 95+, <2s on 3G

  Closes #SPEC-12"
  ```

- [ ] [S] Push branch and create PR
  ```bash
  git push -u origin feature/spec-12-wma-template
  gh pr create --title "feat(SPEC-12): WMA Template Component System" --body "$(cat pr-description.md)"
  ```

**Checkpoint Validation**:
- ✅ All tests passing
- ✅ Documentation complete
- ✅ PR created with comprehensive description
- ✅ Greptile pattern active

<!-- MILESTONE 10: PR Submitted -->

---

## Task Summary

### By Phase

| Phase | Tasks | Est. Hours | Est. LOC | Parallelizable |
|-------|-------|------------|----------|----------------|
| 1. Type System | 4 tasks | 4h | 130 | 2/4 (50%) |
| 2. Base Component | 4 tasks | 8h | 250 | 2/4 (50%) |
| 3. Facility Components | 3 tasks | 10h | 300 | 2/3 (67%) |
| 4. CTA Component | 2 tasks | 6h | 140 | 1/2 (50%) |
| 5. elk-river Refactor | 5 tasks | 6h | -313 | 0/5 (0%) |
| 6. Content Population | 5 tasks | 20h | 1,000 | 3/5 (60%) |
| 7. Testing Suite | 4 tasks | 12h | 500 | 3/4 (75%) |
| 8. Performance | 4 tasks | 8h | 0 | 3/4 (75%) |
| 9. Aesthetic Audit | 3 tasks | 4h | 0 | 2/3 (67%) |
| 10. Documentation | 5 tasks | 6h | 0 | 3/5 (60%) |
| **TOTAL** | **39 tasks** | **84h** | **~2,000** | **21/39 (54%)** |

### By Priority

| Marker | Count | Description |
|--------|-------|-------------|
| `[S]` | 18 tasks | Sequential (dependencies enforced) |
| `[P]` | 21 tasks | Parallelizable (can run concurrently) |

**Parallelization Opportunities**:
- **Week 1 Day 5**: T-009 + T-010 (CampingList + AmenitiesGrid) - 2-agent swarm
- **Week 3**: T-020 + T-021 + T-022 + T-023 (4 WMAs) - 4-agent swarm
- **Week 4 Days 1-2**: T-025 + T-026 + T-027 + T-028 (all testing) - 4-agent swarm

---

## PR Breakdown (Single Atomic PR)

| Checkpoint | Scope | Est. LOC | Tasks | Cumulative |
|------------|-------|----------|-------|------------|
| **Milestone 1** | Type System | 130 | T-001 to T-004 | 130 |
| **Milestone 2** | Base Component | 250 | T-005 to T-008 | 380 |
| **Milestone 3** | Facility Components | 300 | T-009 to T-011 | 680 |
| **Milestone 4** | CTA Component | 140 | T-012 to T-013 | 820 |
| **Milestone 5** | Refactoring | -313 | T-014 to T-019 | 507 |
| **Milestone 6** | Content | 1,000 | T-020 to T-024 | 1,507 |
| **Milestone 7** | Testing | 500 | T-025 to T-028 | 2,007 |
| **Milestone 8** | Performance | 0 | T-029 to T-033 | 2,007 |
| **Milestone 9** | Aesthetic | 0 | T-034 to T-036 | 2,007 |
| **Milestone 10** | Documentation | 0 | T-037 to T-042 | 2,007 |

**Recommended**: Single PR with all milestones (matches SPEC-11 precedent: 1,800 LOC → 94/100 review score)

**Rationale**:
- Components tightly coupled (wrappers depend on base)
- Schema required for all components to function
- Testing validates entire system, not individual pieces
- SPEC-11 PR #69 was similar size and succeeded

---

## Dependencies Graph

```
[T-001: Schema Extension]
        ↓
[T-002: TypeScript Types] ──────┬──────────────────────────────┐
        ↓                        ↓                              ↓
[T-003: elk-river Update]  [T-005: FeatureSection]     [T-009: CampingList]
        ↓                        ↓                              ↓
[T-004: Schema Tests]      [T-006: Wrappers]           [T-010: AmenitiesGrid]
                                 ↓                              ↓
                           [T-007: Base Tests]          [T-011: Facility Tests]
                                 ↓                              ↓
                                 └──────────┬───────────────────┘
                                            ↓
                                   [T-012: AdventureCTA]
                                            ↓
                                   [T-013: CTA Tests]
                                            ↓
                            ┌───────────────┴───────────────┐
                            ↓                               ↓
                [T-014-019: elk-river Refactor]    [T-020-023: 4 New WMAs]
                            ↓                               ↓
                            └───────────────┬───────────────┘
                                            ↓
                                   [T-025-028: Testing]
                                            ↓
                                   [T-029-033: Performance]
                                            ↓
                                   [T-034-036: Aesthetic]
                                            ↓
                                   [T-037-042: Documentation]
                                            ↓
                                        [PR Submit]
```

**Critical Path** (longest dependency chain):
Schema → Types → FeatureSection → Wrappers → elk-river Refactor → Content → Testing → PR
**Est. Time**: 56 hours (67% of total, rest parallelizable)

---

## Detailed Task Breakdown

### T-001: Schema Extension (2 hours, 80 LOC)
**Dependencies**: None
**Deliverables**:
- `wv-wild-web/src/content.config.ts` modified
- 1 type field + 8 WMA fields + 5 nested schemas

**Subtasks**:
1. Create feature branch
2. Add type enum field
3. Add 8 WMA optional fields
4. Define 5 nested Zod schemas (Species, FishingWater, Facility, AccessPoint, Regulations, SeasonHighlight)
5. Add JSDoc comments

**Validation**: `npm run typecheck && npm run build`

---

### T-002: TypeScript Type System (1 hour, 50 LOC)
**Dependencies**: None (parallel with T-001)
**Deliverables**:
- `wv-wild-web/src/types/adventure.ts` extended
- 3 new exports + type guard function

**Subtasks**:
1. Add CampingFacilitySchema
2. Add FeatureItemSchema
3. Add AccentColor type
4. Add isWMAAdventure() type guard
5. Export inferred TypeScript types

**Validation**: `npm run typecheck`

---

### T-003: Backward Compatibility (15 min, 1 LOC)
**Dependencies**: T-001 complete
**Deliverables**:
- `elk-river.md` updated with type field

**Subtasks**:
1. Add `type: "wma"` to elk-river.md frontmatter
2. Verify build succeeds

**Validation**: `npm run build`

---

### T-004: Schema Unit Tests (1 hour, 150 LOC test code)
**Dependencies**: T-001, T-002 complete
**Deliverables**:
- 15 passing unit tests for schema validation

**Validation**: `npm run test:unit -- wma-schemas.test.ts`

---

### T-005: AdventureFeatureSection Component (4 hours, 150 LOC)
**Dependencies**: T-002 complete (needs FeatureItem type)
**Deliverables**:
- Generic base component with 9 configurable props

**Subtasks**:
1. Create file with JSDoc header
2. Define Props interface
3. Build section wrapper (aria-labelledby)
4. Implement responsive grid (2-3 columns)
5. Create feature card template
6. Add icon integration (STAT_ICON_PATHS)
7. Add Kim's note rendering (font-hand)
8. Add accent color system (4 colors)
9. Add animation with stagger delays
10. Add 3 slots (intro, footer, default)

**Validation**: Visual QA with test page

---

### T-006: Wrapper Components (1 hour, 100 LOC)
**Dependencies**: T-005 complete (needs AdventureFeatureSection)
**Deliverables**:
- 2 semantic wrappers (50 lines each)

**Subtasks**:
1. Create AdventureWhatToHunt.astro
   - Set defaults: title, variant, accentColor
   - Delegate to base component
   - Slot passthrough
2. Create AdventureWhatToFish.astro
   - Set defaults (different variant)
   - Delegate to base component
   - Slot passthrough

**Validation**: Import in test page, verify defaults applied

---

### T-007 through T-042: [Abbreviated for length - see above sections]

Each task includes:
- Time estimate (15 min to 5 hours)
- LOC estimate
- Dependencies
- Deliverables
- Validation criteria

---

## Execution Recommendations

### Week 1: Sequential Foundation
- **Days 1-2**: Execute T-001 → T-004 sequentially (schema stability)
- **Days 3-4**: Execute T-005 → T-008 sequentially (base component)
- **Days 5-7**: **Parallel execution** - Spawn 3-agent swarm for T-009, T-010, T-012 (CampingList, AmenitiesGrid, CTA)

### Week 2: Validation
- **Days 1-2**: Complete T-012, T-013 (CTA component + tests)
- **Days 3-4**: Execute T-014 → T-019 sequentially (elk-river refactoring + visual regression)

### Week 3: Content Swarm
- **All week**: **Parallel execution** - Spawn 4-agent swarm for T-020, T-021, T-022, T-023 (one agent per WMA)
  - Each agent researches content, creates markdown + page, sources images
  - Week end: T-024 content review and polish

### Week 4: Testing Swarm
- **Days 1-3**: **Parallel execution** - Spawn 4-agent swarm for T-025, T-026, T-027, T-028 (unit, E2E, a11y, visual tests)
- **Days 4-5**: Execute T-029 → T-033 (performance optimization)

### Week 5: Final QA
- **Days 1-2**: Execute T-034 → T-036 (aesthetic audit)
- **Days 3-5**: Execute T-037 → T-042 (documentation + PR)

---

## Notes

### Special Considerations
- **Greptile AI**: Add custom pattern to catch missing type field (T-041)
- **Kim's Review**: Schedule time for T-024 and T-036 (voice approval)
- **Real Device Testing**: If possible, test on rural WV cellular (T-032)

### Blockers & Prerequisites
- **None**: All dependencies internal to feature
- **External Data**: WV DNR sources for species/seasons (publicly available)
- **Images**: May need to create/source hero images (stock photos acceptable)

### Risk Mitigation
- **Daily builds**: Run `npm run build` after each milestone
- **Incremental testing**: Run tests after each phase (catch issues early)
- **Visual regression**: Baseline elk-river.astro before refactoring (T-019)

---

## Success Metrics (Target vs Actual)

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| **Components Created** | 6 | ___ | ⏳ |
| **Unit Tests Passing** | 43+ | ___ | ⏳ |
| **E2E Tests Passing** | 35+ | ___ | ⏳ |
| **Accessibility Violations** | 0 | ___ | ⏳ |
| **Lighthouse Performance** | ≥95/100 | ___ | ⏳ |
| **Page Load Time (3G)** | <2s | ___ | ⏳ |
| **Total Page Weight** | <500KB | ___ | ⏳ |
| **Line Reduction** | 73% | ___ | ⏳ |
| **PR Review Score** | ≥90/100 | ___ | ⏳ |
| **WMAs Published** | 5 | ___ | ⏳ |

**Update this table as tasks complete!**

---

## Next Steps

1. **Start Implementation**: Begin with T-001 (create feature branch)
2. **Parallel Execution**: Use agent swarms for parallelizable tasks (Week 1 Day 5, Week 3, Week 4)
3. **Milestone Validation**: Check criteria after each milestone
4. **PR Submission**: T-042 creates PR with comprehensive description

**Estimated Completion**: 5 weeks from start (84 hours total effort)

---

**END OF TASK BREAKDOWN**
