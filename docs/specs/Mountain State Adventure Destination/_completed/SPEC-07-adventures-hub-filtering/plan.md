# SPEC-07 Implementation Plan: Adventures Hub Multi-Axis Filtering

**Version:** 1.0.0
**Created:** 2025-12-23
**Based On:**
- spec.md v2.1.0 (5 clarifications resolved)
- 4 Architect Agent Outputs (System, Code, Strategy, Performance)
- 5 Research Documents (294 sources)

---

## Overview

Phased implementation plan for Adventures Hub with 5-axis filtering (Season, Difficulty, Gear, Elevation, Suitability). Total timeline: ~1.5 weeks (60-70 hours) post-schema-update. Build sequence follows Scout → Architect → Implement pattern with continuous testing and WVWO aesthetic enforcement.

**Prerequisites:** ✅ SPEC-06 schema updated (elevation_gain + suitability fields) - COMPLETED

---

## Phase 1: Foundation & Configuration (Day 1-2, 12-16 hours)

### 1.1 Filter Configuration Setup

**Task:** Create data-driven filter config
**File:** `wv-wild-web/src/lib/adventures/filters.config.ts`
**Effort:** 2 hours

**Deliverables:**
- TypeScript interfaces: `FilterAxisConfig`, `FilterOption`, `FilterState`, `FilterAction`
- 5 filter axes defined:
  1. Season (multi-select, 4 options)
  2. Difficulty (single-select, 4 options)
  3. Gear (multi-select, 8+ options from schema)
  4. Elevation (range, 0-5000 ft, 100 ft increments)
  5. Suitability (multi-select, 4 options)

**Acceptance Criteria:**
- [ ] All 5 axes have id, label, type, options
- [ ] TypeScript compiles with no errors
- [ ] Config exports `FILTER_CONFIG` array

**Code Architect Output:** Complete TypeScript interfaces + config schema provided

---

### 1.2 Filter Utilities (Pure Functions)

**Tasks:**
- Create `filter-utils.ts` (filterAdventures logic)
- Create `filter-reducer.ts` (generic reducer)
- Write unit tests

**Files:**
- `wv-wild-web/src/lib/adventures/filter-utils.ts`
- `wv-wild-web/src/lib/adventures/filter-reducer.ts`
- `wv-wild-web/tests/adventures/filter-utils.test.ts`

**Effort:** 4 hours

**Deliverables:**
- `filterAdventures(adventures, filters)` - Pure filtering function
- `filterReducer(state, action)` - Generic axis-agnostic reducer
- `countActiveFilters(filters)` - Active filter count for mobile badge
- Unit tests: 10+ test cases (single filter, combined filters, edge cases)

**Acceptance Criteria:**
- [ ] Filters work independently (each axis tested)
- [ ] Combined filters use AND intersection
- [ ] OR logic within multi-select axes (season, gear, suitability)
- [ ] Elevation range filter handles min-max correctly
- [ ] All unit tests pass (vitest)

**Code Architect Output:** Complete filterAdventures() and filterReducer() implementation provided

---

### 1.3 URL State Synchronization

**Task:** Bidirectional URL ↔ React state sync
**File:** `wv-wild-web/src/lib/adventures/url-sync.ts`
**Effort:** 3 hours

**Deliverables:**
- `parseUrlParams()` - URL → FilterState
- `syncStateToUrl(filters)` - FilterState → URL
- Debouncing for slider (300ms delay)
- Integration tests for URL sync

**Acceptance Criteria:**
- [ ] URL params populate filters on page load
- [ ] Filter changes update URL (history.pushState)
- [ ] Shareable links work (copy URL, open in new tab)
- [ ] Invalid params ignored gracefully
- [ ] Back button works (browser history)

**System Architect Output:** URL sync pattern with debouncing strategy provided

---

### 1.4 React Context Provider

**Task:** FilterContext with useReducer
**File:** `wv-wild-web/src/lib/adventures/FilterContext.tsx`
**Effort:** 3 hours

**Deliverables:**
- `FilterProvider` component (Context.Provider wrapper)
- `useFilters()` hook (safe context access)
- State initialization from URL
- useMemo optimization for filterAdventures()
- ViewTransitions cleanup (astro:before-swap listener)

**Acceptance Criteria:**
- [ ] Context provides: state, dispatch, filteredAdventures, totalCount
- [ ] URL state loads on mount
- [ ] filterAdventures() memoized (not re-computed on every render)
- [ ] ViewTransitions cleanup prevents duplicate listeners
- [ ] Integration tests pass

**Code Architect Output:** Complete FilterContext implementation provided

---

## Phase 2: Desktop Filter UI (Day 3-4, 14-18 hours)

### 2.1 Individual Filter Components

**Tasks:** Create 5 filter components
**Files:** `wv-wild-web/src/components/adventures/filters/*.tsx`
**Effort:** 10 hours total (2 hours each)

**Components:**

**A. SeasonFilter.tsx** (Multi-Select Checkboxes)
- [ ] Checkboxes for Spring, Summer, Fall, Winter
- [ ] `<fieldset>` + `<legend>` (WCAG requirement)
- [ ] 44×44px touch targets
- [ ] Dispatches `SET_MULTI_SELECT` action

**B. DifficultyFilter.tsx** (Radio Group)
- [ ] Radio buttons for Easy, Moderate, Challenging, Rugged
- [ ] `<fieldset>` + `<legend>` (WCAG requirement)
- [ ] Helper text for each option
- [ ] Dispatches `SET_SINGLE_SELECT` action

**C. GearFilter.tsx** (Multi-Select Checkboxes)
- [ ] Dynamically generates checkboxes from GEAR_OPTIONS
- [ ] Collapsible: Show 5, "Show More" expands to all
- [ ] 44×44px touch targets
- [ ] Dispatches `SET_MULTI_SELECT` action

**D. ElevationSlider.tsx** (Dual-Thumb Range)
- [ ] Install `react-slider` library
- [ ] Dual-thumb slider: 0-5000 ft, 100 ft increments
- [ ] Display: "1,200 ft" format (comma-separated)
- [ ] 44×44px thumb size
- [ ] Keyboard support (arrow keys, Page Up/Down)
- [ ] Dispatches `SET_RANGE` action

**E. SuitabilityFilter.tsx** (Multi-Select Checkboxes)
- [ ] Checkboxes for dog-friendly, kid-friendly, wheelchair-accessible, paved
- [ ] Icons from lucide-react (Dog, Baby, Accessibility, Route)
- [ ] 44×44px touch targets
- [ ] Dispatches `SET_MULTI_SELECT` action

**WVWO Aesthetic:**
- All borders: `rounded-sm` (NOT rounded-md/lg)
- Focus rings: `ring-sign-green` (NOT default blue)
- Labels: `font-display font-medium text-brand-brown`
- Helper text: `text-brand-mud/60`

---

### 2.2 Desktop Filter Bar (Sidebar)

**Task:** Compose filters into sidebar
**File:** `wv-wild-web/src/components/adventures/FilterBar.tsx`
**Effort:** 4 hours

**Deliverables:**
- Sticky sidebar (1/4 width on desktop)
- Collapsible sections (Accordion for each filter group)
- Results count display with ARIA live region
- "Clear All Filters" button
- "Skip to Results" accessibility link

**Acceptance Criteria:**
- [ ] Sticky positioning works (CSS `sticky top-4`)
- [ ] All 5 filter components render correctly
- [ ] Results count updates in real-time
- [ ] Clear button resets all filters + URL
- [ ] ARIA landmarks: `<aside role="complementary">`

**Performance Architect Output:** Single island architecture - all filters in one bundle (<95 KB)

---

## Phase 3: Results Grid & Cards (Day 4-5, 10-12 hours)

### 3.1 Adventure Card Component

**Task:** Individual adventure card
**File:** `wv-wild-web/src/components/adventures/AdventureCard.tsx`
**Effort:** 3 hours

**Deliverables:**
- Card layout: image + content + metadata
- Type badge (WMA, Lake, River, etc.)
- Season badges (pill chips)
- Difficulty + elevation display
- Gear icons or text list
- "Learn More" link to detail page

**WVWO Aesthetic:**
- Border-left accent: `border-l-4 border-l-sign-green`
- Hover: `hover:border-brand-orange`
- Rounded corners: `rounded-sm`
- Fonts: `font-display` for title, `font-body` for description
- Image: `aspect-[4/3]` with `hover:scale-105` (subtle tactile)

**Acceptance Criteria:**
- [ ] All adventure data fields display correctly
- [ ] Missing fields (elevation, suitability) handled gracefully
- [ ] Image lazy loading: `loading="lazy"`
- [ ] Hover state: border-orange + image scale
- [ ] motion-safe / motion-reduce prefixes

**Code Architect Output:** Complete AdventureCard implementation provided

---

### 3.2 Filtered Grid Component

**Task:** Results grid with empty state
**File:** `wv-wild-web/src/components/adventures/FilteredGrid.tsx`
**Effort:** 3 hours

**Deliverables:**
- Responsive grid: 1-col → 2-col → 3-col
- Results header: count + sort controls (Phase 1: alphabetical)
- ARIA live region: "Showing 23 of 70 adventures"
- Empty state conditional render
- Loading skeleton (future: Phase 1 just shows grid)

**Acceptance Criteria:**
- [ ] Grid responsive: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- [ ] Results count screen-reader accessible
- [ ] Empty state renders when filteredAdventures.length === 0
- [ ] No layout shift on filter apply

---

### 3.3 Empty State Component

**Task:** No results message with Kim's voice
**File:** `wv-wild-web/src/components/adventures/EmptyState.tsx`
**Effort:** 2 hours

**Deliverables:**
- Kim's voice message
- "Clear Filters" button
- "Call Us: (304) 649-5765" CTA
- "Grand love ya!" in font-hand

**WVWO Copy:**
```
"Hmm, nothing matches those filters. Try widening your search - or give us a call. We know spots that aren't on any list. Grand love ya!"
```

**Acceptance Criteria:**
- [ ] Kim's voice (authentic, not generic)
- [ ] Clear Filters button dispatches RESET_ALL
- [ ] Phone link: `href="tel:+13046495765"`
- [ ] "Grand love ya!" uses `font-hand` (Permanent Marker)

**Code Architect Output:** Complete EmptyState implementation provided

---

## Phase 4: Mobile Experience (Day 5-6, 8-10 hours)

### 4.1 Mobile Filters Sheet (Bottom Drawer)

**Task:** shadcn Sheet with filters
**File:** `wv-wild-web/src/components/adventures/MobileFiltersSheet.tsx`
**Effort:** 5 hours

**Deliverables:**
- Sheet component (bottom slide-up drawer)
- All 5 filter components inside (reused from desktop)
- Accordion groups (collapsible sections)
- Active filters count badge on trigger button
- Sticky "Apply Filters" button at bottom of drawer

**Acceptance Criteria:**
- [ ] Sheet opens from bottom (side="bottom")
- [ ] Non-modal (can see page content behind)
- [ ] Swipe-to-dismiss gesture works
- [ ] Visible X button for close
- [ ] Trigger button: Fixed bottom, 44×44px touch target
- [ ] Active count badge: `bg-brand-orange` (orange <5% of screen)

**Research Finding:** Bottom sheet consensus from AllTrails/REI patterns (Document 1, Gap 6)

---

### 4.2 Mobile-Specific Optimizations

**Tasks:**
- Touch target verification (all 44×44px)
- Thumb-friendly layout (important filters at top)
- Apply button sticky positioning

**Effort:** 3 hours

**Acceptance Criteria:**
- [ ] All touch targets ≥44×44px (checked with inspector)
- [ ] Drawer scrollable (can reach bottom filters)
- [ ] Apply button always visible (sticky bottom-0)
- [ ] No horizontal scroll on mobile

---

## Phase 5: Offline Support (Day 6-7, 10-12 hours)

### 5.1 Service Worker Implementation

**Task:** Offline-first caching
**File:** `wv-wild-web/src/service-worker.js`
**Effort:** 6 hours

**Deliverables:**
- Install event: Cache adventures hub HTML
- Activate event: Clean old caches
- Fetch event: Cache-first for adventure data
- IndexedDB schema: adventures object store
- Cache versioning strategy

**Acceptance Criteria:**
- [ ] Service Worker registers successfully
- [ ] Adventures data cached on first load
- [ ] Filtering works offline (airplane mode test)
- [ ] Cache expires after 24 hours
- [ ] Old cache versions cleaned on update

**System Architect Output:** Complete Service Worker lifecycle + IndexedDB schema provided

---

### 5.2 Offline Banner Component

**Task:** Top banner with Kim's voice
**File:** `wv-wild-web/src/components/adventures/OfflineBanner.tsx`
**Effort:** 2 hours

**Deliverables:**
- Online/offline event listeners
- Conditional render (only when offline)
- Auto-hide on reconnect
- ARIA status announcement

**Message (Kim's Voice):**
```
"You're offline, but don't worry - filters still work. Grand love ya!"
```

**Acceptance Criteria:**
- [ ] Banner appears when connection drops
- [ ] Banner hides when connection returns
- [ ] Screen reader announces status change
- [ ] `bg-brand-brown text-brand-cream` (WVWO colors)

**Code Architect Output:** Complete OfflineBanner implementation provided

---

### 5.3 IndexedDB Offline Storage

**Task:** Adventure data caching
**File:** `wv-wild-web/src/lib/adventures/offline.ts`
**Effort:** 4 hours

**Deliverables:**
- `openDB()` - Initialize IndexedDB
- `cacheAdventures(adventures)` - Store on first load
- `getCachedAdventures()` - Retrieve for offline filtering
- `clearExpiredCache()` - Remove >24hr old data

**Acceptance Criteria:**
- [ ] Adventures stored in IndexedDB on first visit
- [ ] Offline filtering queries IndexedDB (not network)
- [ ] Cache cleared if >24 hours old
- [ ] Error handling (IndexedDB not supported)

---

## Phase 6: Page Integration (Day 7-8, 12-14 hours)

### 6.1 Root Component Assembly

**Task:** AdventuresHub root component
**File:** `wv-wild-web/src/components/adventures/AdventuresHub.tsx`
**Effort:** 4 hours

**Deliverables:**
- FilterProvider wrapper
- Desktop layout (sidebar + grid)
- Mobile layout (full-width grid + drawer)
- OfflineBanner integration
- ViewTransitions cleanup

**Acceptance Criteria:**
- [ ] FilterProvider receives adventures from Astro
- [ ] Desktop: Sidebar visible md:flex
- [ ] Mobile: Drawer trigger visible md:hidden
- [ ] OfflineBanner renders at top
- [ ] ViewTransitions cleanup on astro:before-swap

**Code Architect Output:** Complete component tree + integration pattern provided

---

### 6.2 Astro Hub Page

**Task:** Create /adventures/ page
**File:** `wv-wild-web/src/pages/adventures/index.astro`
**Effort:** 5 hours

**Deliverables:**
- Query `getCollection('adventures')` in frontmatter
- Hero section (copy from /near/index.astro pattern)
- Breadcrumb: Home → Adventures
- CollectionPage schema with hasPart (all 70 adventures)
- Render AdventuresHub React island: `client:load`
- CTA section: "Stop By Before You Head Out"

**Acceptance Criteria:**
- [ ] Page builds without errors
- [ ] getCollection() returns adventures with new schema fields
- [ ] Hero uses WVWO aesthetic (bg-brand-brown, sign-green badge)
- [ ] CollectionPage schema includes all adventures
- [ ] React island hydrates correctly

**System Architect Output:** Astro page → React island integration pattern provided

---

### 6.3 SEO & Schema

**Task:** Metadata and structured data
**Effort:** 3 hours

**Deliverables:**
- Meta description: "70+ outdoor destinations near I-79 Exit 57..."
- CollectionPage JSON-LD (all 70 adventures in hasPart)
- Breadcrumb schema
- Canonical tag (self-referencing)
- robots meta (for future low-demand combos)

**Acceptance Criteria:**
- [ ] Google Rich Results Test passes
- [ ] Breadcrumb renders in search results
- [ ] CollectionPage recognized by Google
- [ ] No schema validation errors

---

## Phase 7: Cloudflare Deployment (Day 8-9, 8-10 hours)

### 7.1 Deployment Configuration Files

**Tasks:**
- Create `public/_headers` (cache rules + HTTP/2 Push)
- Update `astro.config.mjs` (Vite terser optimization)
- Add Service Worker registration to Layout.astro

**Effort:** 4 hours

**Deliverables:**

**File:** `wv-wild-web/public/_headers`
```
/adventures
  Link: </_astro/FilterIsland.[hash].js>; rel=preload; as=script; crossorigin
  Cache-Control: max-age=0, must-revalidate

/_astro/*.js
  Cache-Control: public, max-age=31556952, immutable
```

**File:** `astro.config.mjs` (Vite optimization)
```javascript
vite: {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true },
      mangle: true,
    },
  },
}
```

**Acceptance Criteria:**
- [ ] _headers file created with cache rules
- [ ] HTTP/2 Push Link headers for React bundles
- [ ] Vite terser minification enabled
- [ ] Service Worker registered in Layout

**Performance Architect Output:** Complete _headers file + Vite config provided

---

### 7.2 Build & Bundle Verification

**Task:** Verify bundle sizes
**Effort:** 2 hours

**Process:**
```bash
npm run build
du -sh dist/_astro/*.js | sort -h
```

**Acceptance Criteria:**
- [ ] Each React island <95 KB gzipped
- [ ] No single file >150 KB (alert threshold)
- [ ] Total bundle <200 KB (blocking threshold)
- [ ] Build completes with 0 errors

**Performance Architect Output:** Bundle budget breakdown + monitoring script provided

---

### 7.3 Deploy to Cloudflare Pages

**Task:** Production deployment
**Effort:** 2 hours

**Process:**
```bash
wrangler pages deploy dist/
```

**Post-Deployment:**
- Enable Argo Smart Routing ($5/month)
- Verify cache headers: `curl -I`
- Verify HTTP/2 Push: `grep cf-h2-pushed`
- Test offline mode on production

**Acceptance Criteria:**
- [ ] Deployed to Cloudflare Pages
- [ ] Argo Smart Routing enabled
- [ ] Cache headers correct
- [ ] HTTP/2 Push working (cf-h2-pushed header)
- [ ] Offline mode works on production

**Implementation Strategist Output:** Deployment checklist (30 items) provided

---

## Phase 8: Testing & Validation (Day 9-10, 12-16 hours)

### 8.1 Functional Testing

**Manual Tests (5-device matrix):**
- Desktop: Chrome, Safari, Firefox
- Mobile: iOS Safari, Android Chrome
- Network: Fast 4G, Slow 3G, Offline

**Test Cases (20 total):**
1. Filter by single season (fall) → correct results
2. Filter by multiple seasons (spring, summer) → OR logic works
3. Filter by difficulty (moderate) → exact match
4. Filter by gear (hunting, fishing) → OR logic works
5. Filter by elevation (500-2000 ft) → range works
6. Filter by suitability (dog-friendly) → correct results
7. Combine all 5 axes → AND intersection works
8. Clear filters → all adventures return
9. URL params load on page load
10. Share link → recipient sees same filters
11. Back button → filters restore
12. Invalid URL params → graceful ignore
13. No results → empty state shows
14. Offline mode → filtering continues
15. Reconnect → banner hides
16. ViewTransitions navigation → no duplicates
17. Mobile drawer → opens/closes smoothly
18. Touch targets → all ≥44×44px
19. Keyboard navigation → all filters accessible
20. Screen reader → announces result count changes

**Effort:** 6 hours

**Acceptance Criteria:**
- [ ] All 20 test cases pass
- [ ] No console errors
- [ ] No visual glitches

---

### 8.2 Accessibility Audit

**Tasks:**
- Automated: Run axe-core DevTools extension
- Manual: NVDA screen reader testing
- Keyboard-only navigation test

**Effort:** 4 hours

**Checklist:**
- [ ] 0 axe violations (Critical/Serious)
- [ ] All filter groups have fieldset + legend
- [ ] Results count has aria-live="polite"
- [ ] No nested interactive controls
- [ ] All touch targets ≥44×44px
- [ ] Focus trap in mobile drawer works
- [ ] Focus restoration on drawer close
- [ ] Keyboard navigation: Tab, Enter, Space, Arrows all work
- [ ] Screen reader announces filter changes

**Cost of Failure:** $5,000-$10,000 ADA remediation

**Optional:** Professional audit ($3,000-$5,000 before launch)

---

### 8.3 Performance Testing

**Tasks:**
- Lighthouse CI audit (target ≥90 score)
- Filter response time measurement
- Bundle size verification
- Offline mode test

**Effort:** 3 hours

**Tools:**
```bash
lighthouse https://wvwildoutdoors.pages.dev/adventures/ --view
```

**Acceptance Criteria:**
- [ ] Lighthouse Performance: ≥90
- [ ] Lighthouse Accessibility: 100
- [ ] Filter response time: 100-150ms (measured with DevTools)
- [ ] Bundle size: <95 KB per island
- [ ] LCP: <2.5s on 3G
- [ ] TTFB: <600ms with Argo

**Performance Architect Output:** Complete monitoring plan + Lighthouse budget provided

---

### 8.4 WVWO Aesthetic Enforcement

**Task:** Final aesthetic audit
**Effort:** 3 hours

**Checklist (from CLAUDE.md):**
- [ ] Zero SaaS marketing language
- [ ] Zero trendy fonts (Inter, Poppins, Space Grotesk)
- [ ] Zero purple/pink gradients or neon
- [ ] Zero glassmorphic/neumorphic effects
- [ ] Zero stock photos of models
- [ ] Zero bouncy animations or parallax
- [ ] Text sounds like Kim's actual voice
- [ ] Colors tie to real WV objects (barn wood, forest, blaze orange)
- [ ] Layout feels handmade, not template
- [ ] Passed all 5 litmus tests (Neighbor, Bulletin Board, Voice, Five-Year, Free-Tier)

**shadcn Overrides:**
- [ ] All rounded-md → rounded-sm
- [ ] All default focus rings → ring-sign-green
- [ ] All touch targets 32px → 44px

---

## Phase 9: Monitoring Setup → MOVED TO SPEC-71

**NOTE:** Phase 9 monitoring and analytics setup has been moved to a separate spec:

**SPEC-71: Monitoring & Analytics Setup**
- Location: `docs/specs/Mountain State Adventure Destination/SPEC-71-monitoring-analytics-setup/`
- Execute: After Launch Checkpoint (SPEC-29-38 complete)
- Duration: 3.5 hours

This change allows monitoring to be set up as post-launch infrastructure (site-wide, not just Adventures Hub).

---

### ~~9.1 Google Analytics 4 Configuration~~ (MOVED TO SPEC-71)

**Task:** Set up conversion tracking
**Effort:** 2 hours

**GA4 Events to Create:**
1. `adventure_view` - User clicks adventure card
2. `filter_applied` - User changes any filter
3. `map_download` - Highest intent (future: when map downloads added)
4. `get_directions` - Medium intent (detail page)
5. `newsletter_signup` - Conversion goal
6. `phone_call_click` - Highest commercial intent

**Acceptance Criteria:**
- [ ] All 6 events fire correctly (verify in GA4 DebugView)
- [ ] Core Web Vitals tracking enabled
- [ ] Conversion funnel configured

---

### 9.2 Cloudflare Analytics

**Task:** Monitor infrastructure metrics
**Effort:** 1 hour

**Metrics:**
- Cache hit ratio (target >90%)
- Edge response time (US-East region)
- Bandwidth usage
- Request volume

**Acceptance Criteria:**
- [ ] Cloudflare Analytics accessible
- [ ] Baseline metrics captured (Week 1)

---

### 9.3 Performance Monitoring Dashboard

**Task:** Create monitoring dashboard
**Effort:** 1 hour

**Tools:**
- GA4: Core Web Vitals report
- Cloudflare: Analytics dashboard
- Lighthouse CI: Automated regression testing

**Acceptance Criteria:**
- [ ] Can view TTFB, LCP, FID in one place
- [ ] Alerts configured (if metrics degrade)

---

## Phase 10: Post-Launch (Week 2-5, Monitoring)

### 10.1 Week 1-2: Baseline Collection

**Monitor:**
- Filter interaction rate
- Bounce rate on /adventures/
- Top filter combinations used
- Performance metrics (TTFB, LCP)

**No actions** - just collect data

---

### 10.2 Week 3-4: Analysis & Decision

**Decision Point: Workers Pre-Rendering (SPEC-08)**

**IF** filter_latency >200ms AND bounce_rate >40%
**THEN** implement Cloudflare Workers pre-rendering for top 50 combos
**ELSE** keep client-side React (simpler, maintainable)

**Expected Outcome:** Keep React (research predicts 100-150ms filter response is acceptable)

---

## Critical Path & Dependencies

```
┌─────────────────────────────────────────────────────────────────┐
│ BLOCKING PREREQUISITE                                           │
│ ✅ SPEC-06 Schema Update (COMPLETED)                            │
│    elevation_gain + suitability fields                          │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ Phase 1: Foundation (MUST complete first)                      │
│  • filter config                                                │
│  • filter reducer                                               │
│  • URL sync                                                     │
│  • FilterContext                                                │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ Phase 2-3: UI Components (Parallel - can split work)           │
│  • Desktop filters (Phase 2)                                    │
│  • Grid + cards (Phase 3)                                       │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ Phase 4: Mobile (Depends on Phase 2 - reuses components)       │
│  • Mobile drawer                                                │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ Phase 5: Offline (Parallel with Phase 6)                       │
│  • Service Worker                                               │
│  • OfflineBanner                                                │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ Phase 6: Integration (Depends on all above)                    │
│  • AdventuresHub root                                           │
│  • /adventures/index.astro page                                 │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ Phase 7: Deployment (Depends on Phase 6 complete)              │
│  • Cloudflare config                                            │
│  • Build verification                                           │
│  • Deploy to Pages                                              │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ Phase 8-9: Testing & Polish (Parallel)                         │
│  • Functional testing                                           │
│  • Accessibility audit                                          │
│  • Performance testing                                          │
│  • WVWO aesthetic enforcement                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Risk Register (Top 5 from Implementation Strategist)

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| **1. Bundle size >95 KB** | Medium | High | Code-split islands, lazy load Map component, use Preact if needed (saves 47 KB) |
| **2. WCAG compliance failures** | Medium | Critical | Use shadcn/Radix primitives (accessible by default), professional audit before launch |
| **3. Filter response >150ms** | Low | Medium | Add debouncing (300ms), pagination (20 items/page), Web Workers (if needed) |
| **4. Offline mode broken** | Low | High | E2E Service Worker tests, manual test on actual rural WV device |
| **5. React island hydration fails** | Low | High | Test ViewTransitions cleanup, verify Astro islands pattern in existing codebase |

---

## Effort Summary

| Phase | Tasks | Hours | Days (8hr) |
|-------|-------|-------|------------|
| Phase 1: Foundation | 4 tasks | 12-16 | 1.5-2 |
| Phase 2: Desktop UI | 2 tasks | 14-18 | 1.75-2.25 |
| Phase 3: Grid & Cards | 3 tasks | 10-12 | 1.25-1.5 |
| Phase 4: Mobile | 2 tasks | 8-10 | 1-1.25 |
| Phase 5: Offline | 3 tasks | 10-12 | 1.25-1.5 |
| Phase 6: Integration | 3 tasks | 12-14 | 1.5-1.75 |
| Phase 7: Deployment | 3 tasks | 8-10 | 1-1.25 |
| Phase 8: Testing | 4 tasks | 12-16 | 1.5-2 |
| ~~Phase 9: Monitoring~~ | ~~3 tasks~~ | ~~4~~ | ~~0.5~~ |
| **TOTAL (Phases 1-8)** | **24 tasks** | **86-104 hrs** | **10.5-13 days** |

**Note:** Phase 9 (Monitoring) moved to SPEC-71 (execute post-launch)

**Timeline:** ~2.5 weeks at 40 hrs/week (or 1.5 weeks at 60 hrs/week if focused)

---

## Definition of Done (38 Acceptance Criteria)

### Functional (8 criteria)
- [ ] All 5 filter axes work independently
- [ ] Combined filters use AND intersection
- [ ] URL params sync bidirectionally
- [ ] Offline filtering works (airplane mode test)
- [ ] Empty state shows Kim's voice
- [ ] Clear filters resets all + URL
- [ ] ViewTransitions don't duplicate listeners
- [ ] Real adventures from getCollection()

### Performance (6 criteria)
- [ ] LCP <2.5s on 3G
- [ ] Filter response: 100-150ms
- [ ] Bundle: <95 KB per island
- [ ] HTTP/2 Push: 230ms savings verified
- [ ] Cache hit ratio: >90%
- [ ] No layout shift

### Accessibility (7 criteria)
- [ ] WCAG 2.1 AA: 0 violations
- [ ] fieldset + legend for all filter groups
- [ ] aria-live region for results count
- [ ] 44×44px touch targets
- [ ] Keyboard navigation works
- [ ] Focus trap in mobile drawer
- [ ] Screen reader testing passed

### Aesthetic (7 criteria)
- [ ] rounded-sm (NO rounded-md/lg)
- [ ] brand colors (brown, green, cream, orange <5%)
- [ ] font-display for headings
- [ ] font-hand for Kim's voice
- [ ] 44×44px touch targets
- [ ] Kim's voice in all copy
- [ ] All 5 litmus tests passed

### Deployment (5 criteria)
- [ ] _headers file with HTTP/2 Push
- [ ] Service Worker offline support
- [ ] Argo Smart Routing enabled
- [ ] Build: 0 errors
- [ ] GA4 tracking configured

### Post-Launch (5 criteria)
- [ ] TTFB tracked (4 weeks)
- [ ] Filter interaction rate >40%
- [ ] Bounce rate <50%
- [ ] No critical bugs reported
- [ ] Decision logged for SPEC-08

---

## Success Metrics (AllTrails/REI Benchmarks)

**Track for 4 Weeks:**

| Metric | Target | AllTrails | Industry |
|--------|--------|-----------|----------|
| Avg Session | >3 min | 8:32 | 2-4 min |
| Bounce Rate | <50% | 61% | 40-55% |
| Pages/Session | >3 | 3.29 | 2-4 |
| Engagement Rate | >60% | 50-65% | 50-65% |
| Conversion Rate | >3% | N/A | 3.7% |
| Filter Interaction | >40% | N/A | N/A |

**Decision Criteria (Week 4):**
- ✅ Keep React if metrics within targets
- ⚠️ Add Workers if filter_latency >200ms AND bounce >40%

---

## Next Steps

**Immediate (This Week):**
1. Start Phase 1: Create filter config + reducer + URL sync
2. Write unit tests for filter-utils.ts
3. Create FilterContext with URL state initialization

**Week 2:**
4. Build desktop filter components (5 components)
5. Build grid + cards + empty state
6. Mobile drawer integration

**Week 3:**
7. Offline support (Service Worker + IndexedDB)
8. Deploy to Cloudflare Pages
9. Testing & aesthetic enforcement

**Week 4-7:**
10. Monitor metrics
11. Collect data for SPEC-08 decision

---

**Grand love ya!** 🦌🏔️

**Plan ready for execution. Follow phase sequence, verify acceptance criteria, ship when Definition of Done met.**
