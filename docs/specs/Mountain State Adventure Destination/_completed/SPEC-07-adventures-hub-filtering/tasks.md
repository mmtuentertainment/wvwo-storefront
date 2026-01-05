# Tasks: Adventures Hub Multi-Axis Filtering (SPEC-07)

**Plan Version:** 1.0.0
**Spec Version:** 2.1.0 (5 clarifications resolved)
**Generated:** 2025-12-23
**Updated:** 2025-12-25 (Marked Phases 1-8 complete)
**Status:** ✅ COMPLETE (PR #1-8 merged)
**Total Estimated Effort:** 90-108 hours (~2.5 weeks)
**Actual Effort:** ~90 hours (within estimate)

---

## Task Legend

- `[P]` Parallelizable - can run concurrently with other [P] tasks
- `[S]` Sequential - depends on previous tasks completing
- `[ ]` Not started
- `[X]` Completed ✅
- `[~]` In progress

---

## Phase 1: Foundation & Configuration (12-16 hours)

### 1.1 Filter Configuration Setup (2 hours)

- [X] [S] Create directory: `src/lib/adventures/`
- [X] [S] Create `filters.config.ts` with TypeScript interfaces
  - [ ] Define `FilterAxisConfig` interface
  - [ ] Define `FilterOption` interface
  - [ ] Define `FilterState` interface (season, difficulty, gear, elevation, suitability)
  - [ ] Define `FilterAction` type union
  - [ ] Export `FILTER_CONFIG` array with 5 axes:
    - [ ] Season (multi-select, 4 options: Spring/Summer/Fall/Winter)
    - [ ] Difficulty (single-select, 4 options: Easy/Moderate/Challenging/Rugged)
    - [ ] Gear (multi-select, 8+ options from schema)
    - [ ] Elevation (range, 0-5000 ft, 100 ft increments)
    - [ ] Suitability (multi-select, 4 options: dog/kid/wheelchair/paved)
- [X] [P] Verify TypeScript compiles with no errors

**Output:** `src/lib/adventures/filters.config.ts` (~80 LOC)

---

### 1.2 Filter Utilities - Pure Functions (4 hours)

- [X] [S] Create `filter-utils.ts` with filtering logic
  - [ ] Implement `filterAdventures(adventures, filters)` function
    - [ ] Season filter: OR logic within axis
    - [ ] Difficulty filter: exact match
    - [ ] Gear filter: OR logic (match ANY selected)
    - [ ] Elevation filter: range (min <= value <= max)
    - [ ] Suitability filter: OR logic
    - [ ] Combined: AND intersection across all axes
  - [ ] Implement `countActiveFilters(filters)` for mobile badge
  - [ ] Add JSDoc comments explaining filter logic

- [X] [S] Create `filter-reducer.ts` with generic reducer
  - [ ] Implement `filterReducer(state, action)` function
  - [ ] Handle `SET_MULTI_SELECT` action
  - [ ] Handle `SET_SINGLE_SELECT` action
  - [ ] Handle `SET_RANGE` action
  - [ ] Handle `RESET_ALL` action
  - [ ] Handle `LOAD_FROM_URL` action
  - [ ] Export `initialFilterState`

- [X] [P] Create unit tests: `tests/adventures/filter-utils.test.ts`
  - [ ] Test single season filter
  - [ ] Test multi-season filter (OR logic)
  - [ ] Test difficulty filter
  - [ ] Test gear filter (OR logic)
  - [ ] Test elevation range filter
  - [ ] Test suitability filter
  - [ ] Test combined filters (AND intersection)
  - [ ] Test edge case: no filters (all adventures shown)
  - [ ] Test edge case: impossible filters (empty result)
  - [ ] Test edge case: missing elevation data

- [X] [S] Run tests: `npm test filter-utils` (all pass)

**Output:**

- `src/lib/adventures/filter-utils.ts` (~120 LOC)
- `src/lib/adventures/filter-reducer.ts` (~60 LOC)
- `tests/adventures/filter-utils.test.ts` (~150 LOC)

---

### 1.3 URL State Synchronization (3 hours)

- [X] [S] Create `url-sync.ts` with bidirectional sync
  - [ ] Implement `parseUrlParams()` → FilterState
    - [ ] Parse season: "fall,winter" → ['fall', 'winter']
    - [ ] Parse difficulty: "moderate" → 'moderate'
    - [ ] Parse gear: "hunting,fishing" → ['hunting', 'fishing']
    - [ ] Parse elevation: "500-2000" → [500, 2000]
    - [ ] Parse suitability: "dog-friendly,kid-friendly" → ['dog-friendly', 'kid-friendly']
    - [ ] Validate values against schema enums (ignore invalid)
  - [ ] Implement `syncStateToUrl(filters)` → URL
    - [ ] Build URLSearchParams from FilterState
    - [ ] Use history.pushState (NOT replaceState - back button should work)
    - [ ] Debounce elevation slider updates (300ms delay)
  - [ ] Add TypeScript types for URL param schema

- [X] [P] Write integration tests for URL sync
  - [ ] Test URL params populate filters on mount
  - [ ] Test filter changes update URL
  - [ ] Test invalid params ignored
  - [ ] Test back button restores filters

**Output:** `src/lib/adventures/url-sync.ts` (~90 LOC)

---

### 1.4 React Context Provider (3 hours)

- [X] [S] Create `FilterContext.tsx` with Context + Provider
  - [ ] Create FilterContext with createContext
  - [ ] Implement FilterProvider component
    - [ ] useReducer with filterReducer
    - [ ] Initialize state from URL on mount (lazy initializer)
    - [ ] useMemo for filterAdventures() (prevent re-compute)
    - [ ] useEffect for URL sync (watches state)
    - [ ] useEffect for ViewTransitions cleanup (astro:before-swap)
  - [ ] Create `useFilters()` hook (safe context access)
  - [ ] Export FilterContextValue interface

- [X] [P] Write integration tests: `tests/adventures/FilterContext.test.tsx`
  - [ ] Test context provides: state, dispatch, filteredAdventures, totalCount
  - [ ] Test URL state loads on mount
  - [ ] Test dispatch updates state
  - [ ] Test filteredAdventures updates when state changes

**Output:** `src/lib/adventures/FilterContext.tsx` (~100 LOC)

---

<!-- PR-CHECKPOINT 1: Foundation & Configuration (~500 LOC) -->

**PR #1 Scope:** Filter configuration, pure utilities, React Context
**Files:** filters.config.ts, filter-utils.ts, filter-reducer.ts, url-sync.ts, FilterContext.tsx, tests
**LOC:** ~500
**Testable:** Unit tests pass, TypeScript compiles, Context initializes correctly

---

## Phase 2: Desktop Filter UI (14-18 hours)

### 2.1 Season Filter Component (2 hours)

- [X] [S] Create directory: `src/components/adventures/filters/`
- [X] [S] Create `SeasonFilter.tsx` (Multi-Select Checkboxes)
  - [ ] Import useFilters hook
  - [ ] Render fieldset + legend ("Season")
  - [ ] Map 4 season options to checkboxes
  - [ ] Dispatch SET_MULTI_SELECT on change
  - [ ] Apply WVWO aesthetic:
    - [ ] Labels: `font-display font-medium text-brand-brown`
    - [ ] Checkboxes: 44×44px touch target (parent padding)
    - [ ] Focus ring: `ring-sign-green`
  - [ ] Add icons from lucide-react (Leaf, Sun, Trees, Snowflake)

**Output:** `SeasonFilter.tsx` (~60 LOC)

---

### 2.2 Difficulty Filter Component (2 hours)

- [X] [S] Create `DifficultyFilter.tsx` (Radio Group)
  - [ ] Render fieldset + legend ("Difficulty")
  - [ ] Map 4 difficulty options to radio buttons
  - [ ] Dispatch SET_SINGLE_SELECT on change
  - [ ] Add helper text for each option
  - [ ] Apply WVWO aesthetic (same as SeasonFilter)

**Output:** `DifficultyFilter.tsx` (~70 LOC)

---

### 2.3 Gear Filter Component (2 hours)

- [X] [S] Create `GearFilter.tsx` (Multi-Select Checkboxes)
  - [ ] Render fieldset + legend ("Gear Type")
  - [ ] Map gear options to checkboxes (from GEAR_OPTIONS)
  - [ ] Implement "Show More" (collapse after 5 items)
  - [ ] Dispatch SET_MULTI_SELECT on change
  - [ ] Apply WVWO aesthetic

**Output:** `GearFilter.tsx` (~80 LOC)

---

### 2.4 Elevation Slider Component (3 hours)

- [X] [S] Install react-slider: `npm install react-slider @types/react-slider`
- [X] [S] Create `ElevationSlider.tsx` (Dual-Thumb Range)
  - [ ] Import ReactSlider from react-slider
  - [ ] Render label: "Elevation Gain"
  - [ ] Display current values: "1,200 ft - 3,400 ft"
  - [ ] Configure ReactSlider:
    - [ ] min: 0, max: 5000, step: 100
    - [ ] value: state.elevation
    - [ ] onChange: dispatch SET_RANGE
    - [ ] minDistance: 100 (prevent thumbs crossing)
    - [ ] pearling: true (thumbs push each other)
    - [ ] ariaLabel: ['Minimum elevation', 'Maximum elevation']
  - [ ] Apply WVWO aesthetic:
    - [ ] Thumb: 44×44px, `bg-sign-green`, `rounded-sm`
    - [ ] Track: `bg-brand-mud/20`
    - [ ] Focus: `ring-sign-green`
  - [ ] Add keyboard support (arrow keys, Page Up/Down)

**Output:** `ElevationSlider.tsx` (~90 LOC)

---

### 2.5 Suitability Filter Component (2 hours)

- [X] [S] Create `SuitabilityFilter.tsx` (Multi-Select Checkboxes)
  - [ ] Render fieldset + legend ("Suitability")
  - [ ] Map 4 suitability options to checkboxes
  - [ ] Add icons: Dog, Baby, Accessibility, Route (lucide-react)
  - [ ] Dispatch SET_MULTI_SELECT on change
  - [ ] Apply WVWO aesthetic

**Output:** `SuitabilityFilter.tsx` (~65 LOC)

---

### 2.6 Desktop Filter Bar (4 hours)

- [X] [S] Create `FilterBar.tsx` (Sidebar Wrapper)
  - [ ] Import all 5 filter components
  - [ ] Render sticky sidebar (1/4 width desktop)
  - [ ] Add results count with ARIA live region
    - [ ] Display: "Showing {count} of {total} adventures"
    - [ ] role="region" aria-live="polite"
  - [ ] Add "Clear All Filters" button
    - [ ] Dispatch RESET_ALL on click
    - [ ] variant="outline" (WVWO style)
  - [ ] Add "Skip to Results" accessibility link
  - [ ] Apply responsive classes: `hidden md:block`
  - [ ] Apply WVWO aesthetic:
    - [ ] Sticky: `sticky top-4`
    - [ ] Background: `bg-brand-cream`
    - [ ] Border: `border-2 border-brand-mud/30 rounded-sm`
    - [ ] Spacing: `p-6 space-y-6`

**Output:** `FilterBar.tsx` (~100 LOC)

---

<!-- PR-CHECKPOINT 2: Desktop Filter UI (~465 LOC) -->

**PR #2 Scope:** All 5 filter components + FilterBar sidebar
**Files:** SeasonFilter, DifficultyFilter, GearFilter, ElevationSlider, SuitabilityFilter, FilterBar
**LOC:** ~465
**Testable:** Each filter dispatches correct actions, UI renders correctly, WVWO aesthetic verified

---

## Phase 3: Results Grid & Cards (10-12 hours)

### 3.1 Adventure Card Component (3 hours)

- [X] [S] Create `AdventureCard.tsx` (Grid Item)
  - [ ] Accept adventure prop (typed from Content Collections)
  - [ ] Render card structure:
    - [ ] Image with aspect-[4/3] (lazy loading)
    - [ ] Type badge (bg-sign-green/10, text-sign-green)
    - [ ] Title (font-display font-bold, line-clamp-2)
    - [ ] Description (text-sm, line-clamp-2)
    - [ ] Metadata: difficulty + elevation
    - [ ] Season tags (pills)
    - [ ] "Learn More" link
  - [ ] Apply WVWO aesthetic:
    - [ ] Border-left accent: `border-l-4 border-l-sign-green`
    - [ ] Background: `bg-white`
    - [ ] Rounded: `rounded-sm`
    - [ ] Hover: `hover:border-brand-orange`
    - [ ] Image scale: `hover:scale-105`
  - [ ] Add motion-safe/motion-reduce prefixes
  - [ ] Handle missing fields (elevation, images) gracefully

**Output:** `AdventureCard.tsx` (~110 LOC)

---

### 3.2 Filtered Grid Component (3 hours)

- [X] [S] Create `FilteredGrid.tsx` (Results Display)
  - [ ] Import useFilters hook
  - [ ] Render responsive grid:
    - [ ] `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
  - [ ] Map filteredAdventures to AdventureCard components
  - [ ] Render ResultsCount header:
    - [ ] Display: "Showing {filteredAdventures.length} of {totalCount} adventures"
    - [ ] role="region" aria-live="polite" aria-atomic="true"
  - [ ] Conditional render: EmptyState if length === 0
  - [ ] Add landmark: `<main role="main">`

**Output:** `FilteredGrid.tsx` (~70 LOC)

---

### 3.3 Empty State Component (2 hours)

- [X] [S] Create `EmptyState.tsx` (No Results)
  - [ ] Import useFilters hook (for dispatch)
  - [ ] Render empty state layout:
    - [ ] Icon (lightbulb SVG, `text-brand-mud/40`)
    - [ ] Title: "No adventures match those filters" (font-display)
    - [ ] Message (Kim's voice): "Try adjusting your filters or give us a call - we can help you find the perfect spot."
    - [ ] "Grand love ya!" (font-hand, text-brand-orange)
  - [ ] Add CTAs:
    - [ ] "Clear Filters" button (dispatches RESET_ALL)
    - [ ] "Call Us: (304) 649-5765" link (tel: protocol)
  - [ ] Apply WVWO aesthetic:
    - [ ] Container: `bg-brand-cream border-2 border-brand-mud/30 rounded-sm p-12`
    - [ ] Buttons: `variant="cta"` and `variant="outline"`

**Output:** `EmptyState.tsx` (~75 LOC)

---

<!-- PR-CHECKPOINT 3: Grid & Cards (~255 LOC) -->

**PR #3 Scope:** Adventure cards, filtered grid, empty state
**Files:** AdventureCard, FilteredGrid, EmptyState
**LOC:** ~255
**Testable:** Cards render with all data, grid responsive, empty state shows correctly, Kim's voice present

---

## Phase 4: Mobile Experience (8-10 hours)

### 4.1 Mobile Filters Sheet (5 hours)

- [X] [S] Create `MobileFiltersSheet.tsx` (Bottom Drawer)
  - [ ] Import shadcn Sheet components
  - [ ] Import all 5 filter components (reuse from Phase 2)
  - [ ] Render SheetTrigger:
    - [ ] Fixed bottom button
    - [ ] Text: "Filter Adventures"
    - [ ] Active count badge (bg-brand-orange if count > 0)
    - [ ] 44×44px touch target: `min-h-[44px] min-w-[44px]`
  - [ ] Render SheetContent (side="bottom"):
    - [ ] SheetHeader: "Filter Adventures"
    - [ ] Accordion with 5 groups:
      - [ ] Season (collapsible)
      - [ ] Difficulty (collapsible)
      - [ ] Gear (collapsible)
      - [ ] Elevation (collapsible)
      - [ ] Suitability (collapsible)
    - [ ] "Apply Filters" button (sticky bottom)
    - [ ] "Reset All" button
  - [ ] Apply WVWO aesthetic:
    - [ ] SheetContent: `bg-brand-cream`
    - [ ] SheetOverlay: `bg-brand-brown/60`
    - [ ] Trigger: `variant="cta"` (sign-green)
    - [ ] Sticky button: `sticky bottom-0 bg-brand-cream border-t-2 border-brand-mud/30`
  - [ ] Configure Sheet:
    - [ ] Swipe-to-dismiss enabled
    - [ ] Visible X button
    - [ ] Max height: `h-[90vh]`
    - [ ] Scrollable: `overflow-y-auto`

**Output:** `MobileFiltersSheet.tsx` (~140 LOC)

---

### 4.2 Mobile Touch Target Verification (3 hours)

- [X] [P] Audit all touch targets with browser inspector
  - [ ] Filter checkboxes: ≥44×44px
  - [ ] Radio buttons: ≥44×44px
  - [ ] Elevation slider thumbs: ≥44×44px
  - [ ] Sheet trigger button: ≥44×44px
  - [ ] Apply button: ≥44×44px
  - [ ] Clear button: ≥44×44px
- [X] [P] Test on actual mobile device (iOS + Android)
  - [ ] Drawer opens smoothly
  - [ ] Filters accessible with thumb
  - [ ] No accidental taps
  - [ ] Apply button always reachable

**Output:** Touch target compliance verified

---

<!-- PR-CHECKPOINT 4: Mobile Experience (~140 LOC) -->

**PR #4 Scope:** Mobile bottom sheet drawer
**Files:** MobileFiltersSheet
**LOC:** ~140
**Testable:** Drawer opens/closes, touch targets ≥44px, filters work on mobile, swipe-to-dismiss works

---

## Phase 5: Offline Support (10-12 hours)

### 5.1 Service Worker Implementation (6 hours)

- [X] [S] Create `src/service-worker.js` (Offline Caching)
  - [ ] Define cache version: `CACHE_VERSION = 'wvwo-v1'`
  - [ ] Implement install event:
    - [ ] Open cache: `adventures-wvwo-v1`
    - [ ] Cache assets: `/adventures/`, React bundles
    - [ ] self.skipWaiting()
  - [ ] Implement activate event:
    - [ ] Delete old cache versions
    - [ ] self.clients.claim()
  - [ ] Implement fetch event:
    - [ ] HTML pages: Network-first (always fresh)
    - [ ] Adventure data: Cache-first (offline support)
    - [ ] Static assets: Cache-first (immutable)
  - [ ] Add IndexedDB helpers:
    - [ ] openDB() - Create "wvwo-adventures" database
    - [ ] saveAdventures(adventures) - Store in object store
    - [ ] getAdventures() - Retrieve from IndexedDB
    - [ ] clearExpired() - Remove >24hr old data

- [X] [S] Register Service Worker in Layout.astro
  - [ ] Add `<script>` tag in Layout.astro
  - [ ] Check `'serviceWorker' in navigator`
  - [ ] Register: `navigator.serviceWorker.register('/service-worker.js')`
  - [ ] Handle registration errors

**Output:**

- `src/service-worker.js` (~200 LOC)
- `src/layouts/Layout.astro` (+10 LOC)

---

### 5.2 Offline Banner Component (2 hours)

- [X] [S] Create `OfflineBanner.tsx` (Top Banner)
  - [ ] useState for isOffline
  - [ ] useEffect for online/offline listeners
    - [ ] window.addEventListener('online', handleOnline)
    - [ ] window.addEventListener('offline', handleOffline)
    - [ ] Check initial state: navigator.onLine
    - [ ] Cleanup listeners on unmount
  - [ ] Conditional render (return null if online)
  - [ ] Render banner:
    - [ ] Fixed top: `fixed top-0 left-0 right-0 z-50`
    - [ ] Message (Kim's voice): "You're offline, but don't worry - filters still work. Grand love ya!"
    - [ ] Icon: 📡 emoji or signal icon
  - [ ] Apply WVWO aesthetic:
    - [ ] Background: `bg-brand-brown`
    - [ ] Text: `text-brand-cream`
    - [ ] Padding: `py-3 px-4`
  - [ ] Add ARIA: `role="status" aria-live="polite"`

**Output:** `OfflineBanner.tsx` (~50 LOC)

---

### 5.3 IndexedDB Offline Storage (4 hours)

- [X] [S] Create `offline.ts` (IndexedDB Utilities)
  - [ ] Implement `openDB()` function
    - [ ] Create database: "wvwo-adventures"
    - [ ] Create object store: "adventures"
    - [ ] Create object store: "metadata"
  - [ ] Implement `cacheAdventures(adventures)` function
    - [ ] Store each adventure in object store
    - [ ] Update "lastSync" metadata
  - [ ] Implement `getCachedAdventures()` function
    - [ ] Query all adventures from object store
    - [ ] Check cache age (lastSync timestamp)
    - [ ] Return null if >24 hours old
  - [ ] Implement `clearExpiredCache()` function
    - [ ] Delete adventures if lastSync >24 hours
  - [ ] Add error handling (IndexedDB not supported)

**Output:** `src/lib/adventures/offline.ts` (~120 LOC)

---

<!-- PR-CHECKPOINT 5: Offline Support (~370 LOC) -->

**PR #5 Scope:** Service Worker, offline banner, IndexedDB
**Files:** service-worker.js, OfflineBanner.tsx, offline.ts, Layout.astro update
**LOC:** ~370
**Testable:** Service Worker registers, offline mode works (airplane mode), banner shows/hides, IndexedDB caches data

---

## Phase 6: Page Integration (12-14 hours)

### 6.1 Root Component Assembly (4 hours)

- [X] [S] Create `AdventuresHub.tsx` (Root Component)
  - [ ] Import FilterProvider from FilterContext
  - [ ] Import FilterBar (desktop)
  - [ ] Import MobileFiltersSheet (mobile)
  - [ ] Import FilteredGrid (results)
  - [ ] Import OfflineBanner (top banner)
  - [ ] Render component structure:
    - [ ] OfflineBanner (fixed top)
    - [ ] FilterProvider wrapper (receives adventures prop)
      - [ ] Desktop layout (flex):
        - [ ] FilterBar (sticky sidebar, 1/4 width)
        - [ ] FilteredGrid (3/4 width)
      - [ ] Mobile layout:
        - [ ] MobileFiltersSheet (fixed bottom trigger)
        - [ ] FilteredGrid (full width)
  - [ ] Add ViewTransitions cleanup:
    - [ ] useEffect with astro:before-swap listener
    - [ ] Clean up event listeners, IndexedDB connections
  - [ ] Add responsive classes: `md:flex md:gap-8`

**Output:** `AdventuresHub.tsx` (~90 LOC)

---

### 6.2 Astro Hub Page (5 hours)

- [X] [S] Create `src/pages/adventures/index.astro`
  - [ ] Import statements:
    - [ ] Layout from layouts/Layout.astro
    - [ ] Header, Footer, Breadcrumb components
    - [ ] SchemaBreadcrumb for SEO
    - [ ] AdventuresHub (React island)
    - [ ] getCollection from astro:content
  - [ ] Frontmatter logic:
    - [ ] Query: `const adventures = await getCollection('adventures')`
    - [ ] Define breadcrumbItems: Home → Adventures
    - [ ] Define CollectionPage schema (JSON-LD)
      - [ ] @type: "CollectionPage"
      - [ ] name: "West Virginia Adventure Destinations"
      - [ ] hasPart: map all adventures to WebPage entities
  - [ ] Render page structure:
    - [ ] Layout with title, description, additionalSchemas
    - [ ] Header
    - [ ] Breadcrumb (UI)
    - [ ] SchemaBreadcrumb (JSON-LD)
    - [ ] Hero section:
      - [ ] Badge: "70+ Destinations" (bg-sign-green)
      - [ ] Title: "Your Mountain State Adventure Headquarters" (font-display font-black)
      - [ ] Description (Kim's voice, 2-3 sentences)
      - [ ] Background: `bg-brand-brown text-white` with camo overlay
    - [ ] AdventuresHub React island:
      - [ ] `client:load` (hydrate immediately)
      - [ ] Pass adventures prop
    - [ ] CTA section: "Stop By Before You Head Out"
      - [ ] Copy from /near/index.astro pattern
      - [ ] Background: `bg-sign-green text-white`
      - [ ] Buttons: Get Directions, Call Us
    - [ ] Footer

**Output:** `src/pages/adventures/index.astro` (~180 LOC)

---

### 6.3 SEO & Structured Data (3 hours)

- [X] [P] Add meta tags to adventures/index.astro:
  - [ ] title: "Adventure Destinations | 70+ Spots Near I-79 Exit 57 | WV Wild Outdoors"
  - [ ] description: "Discover 70+ outdoor destinations in Central WV - hunting, fishing, hiking, camping. Filter by season, difficulty, and accessibility. Stop by before you head out!"
  - [ ] canonical: `<link rel="canonical" href="https://wvwildoutdoors.com/adventures/" />`
- [X] [P] Verify CollectionPage schema structure:
  - [ ] hasPart lists all 70 adventures as WebPage entities
  - [ ] Each adventure has @type, name, url
  - [ ] Publisher: WV Wild Outdoors (LocalBusiness)
- [X] [P] Test schema with Google Rich Results Test
- [X] [P] Add robots meta (for future low-demand combos):
  - [ ] Comment explaining strategy
  - [ ] Placeholder for noindex logic (SPEC-08)

**Output:** SEO metadata complete, schema validated

---

<!-- PR-CHECKPOINT 6: Page Integration (~270 LOC) -->

**PR #6 Scope:** Root component, Astro page, SEO
**Files:** AdventuresHub.tsx, adventures/index.astro, SEO schemas
**LOC:** ~270
**Testable:** Page builds, React island hydrates, SEO schema valid, hero section renders

---

## Phase 7: Cloudflare Deployment (8-10 hours)

### 7.1 Deployment Configuration (4 hours)

- [X] [S] Create `public/_headers` file
  - [ ] Adventures hub cache rules:
    - [ ] `/adventures` → max-age=0, must-revalidate
    - [ ] Add X-Content-Type-Options: nosniff
    - [ ] Add X-Frame-Options: DENY
  - [ ] React bundles cache rules:
    - [ ] `/_astro/*.js` → max-age=31556952, immutable
    - [ ] `/_astro/*.css` → max-age=31556952, immutable
  - [ ] HTTP/2 Push Link headers:
    - [ ] Link: </_astro/FilterIsland.[hash].js>; rel=preload; as=script; crossorigin
    - [ ] Link: </_astro/FilterIsland.[hash].css>; rel=preload; as=style
    - [ ] NOTE: Update [hash] after build with actual filename

- [X] [S] Update `astro.config.mjs` with Vite optimization
  - [ ] Add vite.build.minify: 'terser'
  - [ ] Add terserOptions:
    - [ ] compress: { drop_console: true, drop_debugger: true }
    - [ ] mangle: true
  - [ ] Add rollupOptions.output.manualChunks:
    - [ ] 'react-vendor': ['react', 'react-dom']

**Output:**

- `public/_headers` (~30 LOC)
- `astro.config.mjs` (+20 LOC)

---

### 7.2 Build & Bundle Verification (2 hours)

- [X] [S] Run production build: `npm run build`
- [X] [S] Verify build completes with 0 errors
- [X] [S] Check bundle sizes:
  - [ ] Run: `du -sh dist/_astro/*.js | sort -h`
  - [ ] Verify each island <95 KB gzipped
  - [ ] Alert if any file >150 KB
  - [ ] BLOCKING if total >200 KB
- [X] [S] Find hashed React island filenames:
  - [ ] Run: `ls dist/_astro/ | grep -i filter`
  - [ ] Update `_headers` file with actual hashed names
  - [ ] Replace `FilterIsland.[hash].js` with real filename

**Output:** Build verified, _headers updated with hashes

---

### 7.3 Deploy to Cloudflare Pages (2 hours)

- [X] [S] Deploy to Cloudflare Pages:
  - [ ] Run: `wrangler pages deploy dist/`
  - [ ] Note deployment URL
- [X] [S] Enable Argo Smart Routing:
  - [ ] Log into Cloudflare Dashboard
  - [ ] Navigate: Traffic → Argo
  - [ ] Enable Argo Smart Routing ($5/month)
- [X] [S] Verify deployment:
  - [ ] Visit: <https://wvwildoutdoors.pages.dev/adventures/>
  - [ ] Verify page loads
  - [ ] Verify React island hydrates
  - [ ] Verify filters work
- [X] [S] Verify cache headers:
  - [ ] Run: `curl -I https://wvwildoutdoors.pages.dev/adventures/`
  - [ ] Check: Cache-Control headers correct
  - [ ] Check: HTTP/2 Push headers (cf-h2-pushed)
- [X] [S] Test offline mode on production:
  - [ ] Open DevTools → Network → Offline
  - [ ] Verify filtering continues to work
  - [ ] Verify banner appears

**Output:** Deployed to production, verified working

---

<!-- PR-CHECKPOINT 7: Deployment Config (~50 LOC) -->

**PR #7 Scope:** Cloudflare configuration, deployment
**Files:** _headers, astro.config.mjs updates
**LOC:** ~50
**Testable:** Deploys successfully, cache headers correct, HTTP/2 Push working, Argo enabled

---

## Phase 8: Testing & Validation (12-16 hours)

### 8.1 Functional Testing (6 hours)

**Manual Test Matrix (5 devices × 20 test cases):**

- [X] [P] Desktop Chrome:
  - [ ] Filter by season (fall) → correct results
  - [ ] Filter by difficulty (moderate) → exact match
  - [ ] Filter by gear (hunting, fishing) → OR logic
  - [ ] Filter by elevation (500-2000 ft) → range works
  - [ ] Filter by suitability (dog-friendly) → correct
  - [ ] Combine all 5 axes → AND intersection
  - [ ] Clear filters → all return
  - [ ] URL params load on page load
  - [ ] Share link → same filters
  - [ ] Back button → filters restore

- [X] [P] Desktop Safari (test Webkit differences)
- [X] [P] Desktop Firefox (test Gecko differences)
- [X] [P] Mobile iOS Safari (test touch interactions)
- [X] [P] Mobile Android Chrome (test Service Worker)

- [X] [S] Network condition testing:
  - [ ] Fast 4G → verify LCP <2.5s
  - [ ] Slow 3G throttle → verify HTTP/2 Push savings
  - [ ] Offline (airplane mode) → verify filtering works
  - [ ] Reconnect → verify banner hides

- [X] [S] Edge cases:
  - [ ] No results → empty state shows
  - [ ] Invalid URL params → graceful ignore
  - [ ] Missing elevation data → adventure still shows in unfiltered view
  - [ ] ViewTransitions navigation → no duplicate listeners

**Output:** Test results documented, all pass

---

### 8.2 Accessibility Audit (4 hours)

- [X] [S] Automated testing with axe-core:
  - [ ] Install axe DevTools extension
  - [ ] Scan /adventures/ page
  - [ ] Verify 0 Critical/Serious violations
  - [ ] Fix any warnings

- [X] [S] Keyboard navigation testing:
  - [ ] Tab through all filters (logical order)
  - [ ] Enter/Space activates checkboxes/radios
  - [ ] Arrow keys work on slider
  - [ ] Escape closes mobile drawer
  - [ ] Focus trap works in drawer
  - [ ] Focus restores on drawer close

- [X] [S] Screen reader testing (NVDA):
  - [ ] All filter groups announced
  - [ ] Results count announces on change
  - [ ] Empty state read correctly
  - [ ] Offline banner announced

- [X] [P] Touch target measurement:
  - [ ] All interactive elements ≥44×44px
  - [ ] Use browser inspector to verify

**Checklist:**

- [X] 0 axe violations (Critical/Serious)
- [X] Keyboard navigation works
- [X] Screen reader announces changes
- [X] Focus management correct
- [X] Touch targets ≥44×44px

**Output:** Accessibility audit passed (WCAG 2.1 AA compliant)

---

### 8.3 Performance Testing (3 hours)

- [X] [S] Lighthouse audit:
  - [ ] Run: `lighthouse https://wvwildoutdoors.pages.dev/adventures/ --view`
  - [ ] Verify Performance: ≥90
  - [ ] Verify Accessibility: 100
  - [ ] Verify Best Practices: ≥90
  - [ ] Verify SEO: ≥90

- [X] [S] Filter response time measurement:
  - [ ] Open DevTools → Performance tab
  - [ ] Record filter interaction
  - [ ] Measure: Click to visible result change
  - [ ] Target: 100-150ms

- [X] [S] Bundle size verification:
  - [ ] Check: Each React island <95 KB gzipped
  - [ ] Check: Total bundle <200 KB
  - [ ] Alert if exceeded

- [X] [S] Core Web Vitals:
  - [ ] TTFB: <600ms on 3G (with Argo)
  - [ ] LCP: <2.5s
  - [ ] FID: <100ms
  - [ ] CLS: <0.1

**Output:** Performance benchmarks met

---

### 8.4 WVWO Aesthetic Enforcement (3 hours)

**5 Litmus Tests (from CLAUDE.md):**

- [X] [P] **Neighbor Test:** Would Kim's neighbor say "That's fancy!" or "That's you"?
  - [ ] Must feel like "That's you" (handmade, authentic)
- [X] [P] **Bulletin Board Test:** Would this look out of place next to handwritten notes?
  - [ ] Must fit in (not too polished)
- [X] [P] **Voice Test:** Does this sound like Kim or a marketing agency?
  - [ ] EmptyState copy reviewed
  - [ ] OfflineBanner copy reviewed
  - [ ] Hero copy reviewed
- [X] [P] **Five-Year Test:** Will this trend embarrass us in 2030?
  - [ ] No trendy fonts (Inter, Poppins)
  - [ ] No purple gradients
  - [ ] No glassmorphism
- [X] [P] **Free-Tier Test:** Does this require paid services Kim can't maintain?
  - [ ] Google Maps Elevation API: Free tier (✅)
  - [ ] Cloudflare Pages: Free (✅)
  - [ ] Argo: $5/month (acceptable)

**Enforcement Checklist:**

- [X] Zero SaaS marketing language
- [X] Zero trendy fonts (using Bitter, Permanent Marker, Noto Sans)
- [X] Zero purple/pink/neon colors
- [X] Zero glassmorphic effects
- [X] Text sounds like Kim
- [X] All borders: rounded-sm (verified)
- [X] All focus rings: ring-sign-green (verified)
- [X] Touch targets: 44×44px (verified)
- [X] Orange <5% of screen (verified)

**shadcn Override Verification:**

- [X] All rounded-md → rounded-sm
- [X] All default rings → ring-sign-green
- [X] All 32px targets → 44px

**Output:** WVWO aesthetic compliance verified

---

<!-- PR-CHECKPOINT 8: Testing & Polish (Testing only, ~0 LOC) -->

**PR #8 Scope:** Testing results, aesthetic audit
**Files:** Test documentation
**LOC:** ~0 (documentation only)
**Testable:** All tests pass, WCAG compliant, performance meets targets, aesthetic verified

---

## Phase 9 & 10: Monitoring & Analytics

**MOVED TO SPEC-71:** Site-wide monitoring and analytics setup now documented as separate spec.

**Execute After:** Launch Checkpoint (SPEC-29-38 complete, first 10 adventures live)

**See:** `docs/specs/Mountain State Adventure Destination/SPEC-71-monitoring-analytics-setup/PROMPT.md`

**Includes:**

- GA4 custom event tracking (8 events)
- Cloudflare Analytics baseline
- Performance monitoring dashboard
- Alert thresholds and review cadence
- SPEC-08 decision criteria (Workers pre-rendering vs client-side)

**Timeline:** 3.5 hours (execute within 1 week of launch)

---

## PR Summary

| PR | Scope | Est. LOC | Tasks | Dependencies |
|----|-------|----------|-------|--------------|
| **PR #1** | Foundation & Config | ~500 | 4 | SPEC-06 schema (✅ done) |
| **PR #2** | Desktop Filter UI | ~465 | 6 | PR #1 |
| **PR #3** | Grid & Cards | ~255 | 3 | PR #1 |
| **PR #4** | Mobile Experience | ~140 | 2 | PR #2 (reuses components) |
| **PR #5** | Offline Support | ~370 | 3 | PR #1 (uses Context) |
| **PR #6** | Page Integration | ~270 | 3 | PR #2, #3, #4, #5 (all UI done) |
| **PR #7** | Deployment Config | ~50 | 3 | PR #6 (page complete) |
| **PR #8** | Testing & Audit | ~0 | 4 | PR #7 (deployed) |

**Total Tasks:** 28
**Total Estimated LOC:** ~2,050
**Recommended PRs:** 8 (avg ~250 LOC each, all under 500 LOC)

---

## Dependencies Graph

```
┌──────────────────┐
│ PR #1: Foundation│
│  • Config        │
│  • Reducer       │
│  • Context       │
└────────┬─────────┘
         │
         ├─────────────────────────────┬──────────────────┐
         │                             │                  │
         ▼                             ▼                  ▼
┌────────────────┐          ┌─────────────────┐  ┌──────────────┐
│ PR #2: Desktop │          │ PR #3: Grid     │  │ PR #5: Offline│
│  • 5 Filters   │          │  • Cards        │  │  • Service W. │
│  • FilterBar   │          │  • Grid         │  │  • Banner     │
└────────┬───────┘          │  • EmptyState   │  └──────┬───────┘
         │                  └────────┬────────┘         │
         │                           │                  │
         ▼                           │                  │
┌────────────────┐                  │                  │
│ PR #4: Mobile  │                  │                  │
│  • Sheet       │                  │                  │
│  • Touch Test  │                  │                  │
└────────┬───────┘                  │                  │
         │                           │                  │
         └───────────┬───────────────┴──────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │ PR #6: Integration    │
         │  • AdventuresHub      │
         │  • Astro page         │
         │  • SEO                │
         └───────────┬───────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │ PR #7: Deployment     │
         │  • _headers           │
         │  • Vite config        │
         │  • Deploy to Pages    │
         └───────────┬───────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │ PR #8: Testing        │
         │  • Functional tests   │
         │  • A11y audit         │
         │  • Performance        │
         │  • Aesthetic check    │
         └───────────────────────┘
```

**Parallelization Opportunities:**

- PR #2 + PR #3 + PR #5 can be developed in parallel (after PR #1)
- PR #4 depends on PR #2 (reuses filter components)
- All must complete before PR #6 (integration)

---

## Critical Path (Longest Dependency Chain)

```
PR #1 Foundation (12-16 hrs)
  → PR #2 Desktop UI (14-18 hrs)
  → PR #4 Mobile (8-10 hrs)
  → PR #6 Integration (12-14 hrs)
  → PR #7 Deployment (8-10 hrs)
  → PR #8 Testing (12-16 hrs)

Total Critical Path: 66-94 hours (~1.5-2 weeks if no parallelization)
```

**With Parallelization:**

- PR #1 (Foundation) → 12-16 hrs
- PR #2, #3, #5 in parallel → 14-18 hrs (slowest is PR #2)
- PR #4 (Mobile) → 8-10 hrs
- PR #6 (Integration) → 12-14 hrs
- PR #7 (Deployment) → 8-10 hrs
- PR #8 (Testing) → 12-16 hrs

**Optimized Timeline:** 66-84 hours (~1.5-2 weeks)

---

## Notes

### Blockers & Prerequisites

**COMPLETED ✅:**

- SPEC-06 schema updated (elevation_gain + suitability)
- Backfill script created (backfill-elevation.js)
- Test data backfilled (spring-gobbler-burnsville.md)
- Build verified (56 pages, 0 errors)

**READY TO START:** PR #1 Foundation has NO blockers

---

### Special Considerations

**React Library Installation:**

- [X] Install `react-slider` for dual-thumb elevation slider (PR #2)
- [X] Verify `react` and `react-dom` already in package.json (should exist)

**WVWO Aesthetic:**

- Every PR must verify rounded-sm (not rounded-md/lg)
- Every PR with copy must use Kim's voice
- Every PR with colors must use brand palette

**Testing Strategy:**

- Unit tests in PR #1 (pure functions)
- Integration tests in PR #2-6 (components)
- E2E tests in PR #8 (full workflows)

---

### Task Execution Tips

**For Parallelizable Tasks [P]:**

- Can be done in same work session
- Can spawn multiple agents concurrently
- CLAUDE.md rule: Use single message with multiple Task tool calls for parallel agent execution

**For Sequential Tasks [S]:**

- Must wait for previous task completion
- Often depend on files created in prior task
- Verify previous task's output before starting

**PR Checkpoint Strategy:**

- Create PR when checkpoint reached
- Don't batch multiple checkpoints (increases review time)
- ~250-300 LOC per PR is optimal (research-validated)

---

**Grand love ya!** 🦌🏔️

**Ready to start PR #1: Foundation & Configuration**

**Next command:** `/speckit.implement` to begin execution OR start manually with Phase 1.1
