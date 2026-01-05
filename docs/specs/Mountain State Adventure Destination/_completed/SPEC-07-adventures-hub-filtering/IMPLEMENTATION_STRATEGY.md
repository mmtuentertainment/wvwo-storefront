# SPEC-07 Adventures Hub Filtering - Implementation Strategy

**Version:** 1.0.0
**Created:** 2025-12-23
**Status:** Ready for Execution
**Phase:** Mountain State Adventure Destination (Phase 3)
**Estimated Duration:** 3-4 weeks (includes schema update)

---

## EXECUTIVE SUMMARY

SPEC-07 delivers a production-grade adventures filtering system for 70+ WV destinations with 5-axis filtering (Season, Difficulty, Gear, Elevation, Suitability). This strategy document defines the complete path from schema updates through deployment and post-launch monitoring.

**Key Decisions**:

- **Architecture**: Cloudflare Pages + Astro static + React islands (NOT Workers pre-rendering)
- **Filtering**: Client-side with TanStack Table (100-150ms acceptable, 30-50ms Worker gain not worth complexity)
- **Offline**: Service Worker + IndexedDB for rural WV spotty connections
- **Caching**: 3-tier strategy (Edge + Browser + Service Worker)
- **Cost**: $20-25/month all-in (Cloudflare Pages + Argo Smart Routing)

**Critical Path**:

1. Schema Update (SPEC-06 extension) - 3-4 days
2. Filter Infrastructure - 1 week
3. React Island Implementation - 1 week
4. Testing & Accessibility - 4-5 days
5. Deployment & Monitoring - 2-3 days

---

## PHASE ORDERING

### PHASE 0: PREREQUISITE - Schema Update (BLOCKING)

**Duration**: 3-4 days
**Status**: REQUIRED before SPEC-07 begins
**Blocker**: SPEC-06 schema missing `elevation_gain` and `suitability[]` fields

#### Tasks

1. **Update Astro Content Collections Schema** (src/content/config.ts)
   - Add `elevation_gain: z.number().int().min(0).max(5000)` to adventures collection
   - Add `suitability: z.array(z.enum(['dog_friendly', 'kid_friendly', 'wheelchair_accessible', 'beginner_friendly', 'family_friendly']))`
   - Update TypeScript type generation
   - Test validation with example content

2. **Data Backfill Strategy**
   - **Elevation Data** (automated):
     - Google Maps Elevation API (free tier: 2,500 requests/day)
     - Script queries trailhead coordinates → returns elevation in feet
     - Effort: 2 hours to write script + run for 70 destinations
   - **Suitability Data** (manual):
     - Research each destination (trail websites, reviews, DNR resources)
     - Tag with appropriate suitability flags
     - Effort: 5-10 min per destination = 10-15 hours total
   - **Total Time**: 3-4 days (script development + manual research)

3. **Validation**
   - Run `npm run build` - verify no schema errors
   - Check TypeScript inference in IDE
   - Query with `getCollection()` to verify new fields

**Success Criteria**:

- [ ] Schema updated with elevation_gain and suitability fields
- [ ] All 70 existing adventures have elevation data
- [ ] At least 50% have suitability tags (rest can be added progressively)
- [ ] Astro build passes validation
- [ ] TypeScript types inferred correctly

**Risks**:

- **Manual research time** - Mitigate: Start with high-traffic destinations (New River Gorge, Blackwater Falls), backfill rest later
- **Google API quota** - Mitigate: 2,500/day free tier covers all 70 destinations in 1 day with room for retries

---

### PHASE 1: Filter Infrastructure Foundation

**Duration**: 1 week
**Dependencies**: Phase 0 complete
**Goal**: Build data layer and filtering logic without UI

#### 1.1 Data Layer Setup (Day 1-2)

**Tasks**:

- Create `src/lib/adventures/types.ts` - TypeScript interfaces for filtered adventures
- Create `src/lib/adventures/filters.ts` - Filter logic functions
- Create `src/lib/adventures/constants.ts` - Filter enums, ranges, categories
- Set up TanStack Table headless data grid

**Deliverables**:

```typescript
// types.ts
export interface AdventureFilter {
  season?: SeasonType[];
  difficulty?: DifficultyLevel[];
  gear?: GearCategory[];
  elevation?: [min: number, max: number];
  suitability?: SuitabilityTag[];
}

// filters.ts
export function filterAdventures(
  adventures: Adventure[],
  filters: AdventureFilter
): Adventure[] {
  // TanStack Table integration
}

// constants.ts
export const SEASONS = ['spring', 'summer', 'fall', 'winter'] as const;
export const DIFFICULTIES = ['easy', 'moderate', 'hard', 'expert'] as const;
export const ELEVATION_RANGE = [0, 5000] as const;
```

**Testing**:

- Unit tests for filter functions
- Test with mock adventure data (10 items)
- Verify filter combinations work correctly

**Success Criteria**:

- [ ] Filter types defined and exported
- [ ] TanStack Table initialized with adventure data
- [ ] Filter functions pass unit tests
- [ ] Performance: Filter 70 items in <50ms (client-side)

#### 1.2 URL State Management (Day 3-4)

**Tasks**:

- Implement URL parameter serialization/deserialization
- Set up browser history management (Back/Forward buttons work)
- Handle shareable filter URLs
- Implement canonical URL strategy for SEO

**URL Structure**:

```
/adventures/                           # Empty filters, all results
/adventures/?season=fall               # Single filter
/adventures/?season=fall&difficulty=easy  # Multi-filter
/adventures/?elevation=500-2000        # Range filter (dual-thumb slider)
```

**SEO Strategy** (from research):

- Canonical tags: `/adventures/?activity=hunting&sort=newest` → `/adventures/?activity=hunting`
- robots.txt: Block `?sort=` parameters, allow high-value filter combos
- Index only 2-axis combinations (Season + Difficulty, NOT Season + Difficulty + Gear + Elevation)

**Deliverables**:

```typescript
// src/lib/adventures/url-state.ts
export function serializeFiltersToURL(filters: AdventureFilter): URLSearchParams;
export function parseFiltersFromURL(searchParams: URLSearchParams): AdventureFilter;
export function getCanonicalURL(currentURL: URL): string;
```

**Success Criteria**:

- [ ] URL updates when filters change
- [ ] Back/Forward buttons work correctly
- [ ] Shareable URLs restore exact filter state
- [ ] Canonical tags prevent index bloat

#### 1.3 Geospatial "Closest to Me" (Day 5)

**Tasks**:

- Implement Haversine formula for distance calculation
- Request user geolocation permission
- Sort adventures by distance from user
- Cache user location (session only, per SPEC-07 decision)

**Implementation** (from research):

```typescript
// src/lib/adventures/geolocation.ts
import { haversine } from './haversine';

export async function sortByProximity(
  adventures: Adventure[]
): Promise<Adventure[]> {
  const position = await navigator.geolocation.getCurrentPosition();
  const userCoords = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  return adventures.map(adventure => ({
    ...adventure,
    _distanceFromUser: haversine(userCoords, adventure.coordinates)
  })).sort((a, b) => a._distanceFromUser - b._distanceFromUser);
}
```

**Success Criteria**:

- [ ] Geolocation permission requested on first filter interaction
- [ ] Distance calculated for all 70 adventures in <100ms
- [ ] Sort by "Closest to Me" works correctly
- [ ] Graceful fallback if permission denied (alphabetical sort)

**Performance Target**: Calculate Haversine for 70 items in <50ms (research confirms achievable)

---

### PHASE 2: React Island Implementation

**Duration**: 1 week
**Dependencies**: Phase 1 complete
**Goal**: Build accessible, mobile-optimized filter UI

#### 2.1 Component Architecture (Day 1-2)

**Component Tree**:

```
<AdventuresHub /> (React island, client:visible)
├── <FilterDrawer /> (mobile bottom sheet, desktop sidebar)
│   ├── <SeasonFilter /> (multi-select chips)
│   ├── <DifficultyFilter /> (segmented control)
│   ├── <GearFilter /> (dropdown multi-select)
│   ├── <ElevationSlider /> (dual-thumb range slider)
│   └── <SuitabilityFilter /> (toggle chips)
├── <FilterSummary /> (active filters with remove buttons)
├── <ResultsGrid /> (adventure cards, TanStack Table)
└── <OfflineBanner /> (rural WV spotty connection indicator)
```

**shadcn/ui Components**:

- Sheet (mobile drawer)
- Slider (elevation range)
- Checkbox (multi-select filters)
- Badge (active filter chips)
- Button (WVWO custom variants)

**WVWO Aesthetic Overrides** (per guidelines):

```typescript
// All shadcn components: rounded-md → rounded-sm
// Button variants:
variant: {
  wvwo: "bg-brand-brown text-brand-cream hover:bg-brand-mud",
  cta: "bg-sign-green text-white hover:bg-sign-green/90",
  blaze: "bg-brand-orange text-white hover:bg-brand-orange/90"
}
```

**Success Criteria**:

- [ ] All components use WVWO color palette
- [ ] Sharp corners (rounded-sm) enforced
- [ ] Font stack: Bitter (display), Permanent Marker (hand), Noto Sans (body)
- [ ] No purple/pink gradients, no glassmorphism

#### 2.2 Mobile Filter Drawer (Day 3-4)

**Pattern** (from AllTrails research):

- Bottom sheet slides up from bottom (easy thumb reach)
- Focus trap inside drawer (WCAG 2.1 AA compliance)
- "Show X Results" button applies filters (batched execution, not instant)
- Focus returns to trigger button on close

**Implementation**:

```typescript
// src/components/adventures/FilterDrawer.tsx
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function FilterDrawer({ filters, onApply }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="btn-wvwo" aria-label="Open filters">
          Filter Adventures
        </button>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[80vh]">
        <form onSubmit={onApply}>
          <SeasonFilter />
          <DifficultyFilter />
          <GearFilter />
          <ElevationSlider />
          <SuitabilityFilter />

          <button type="submit" className="btn-cta w-full">
            Show {filteredCount} Adventures
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
```

**Success Criteria**:

- [ ] Drawer slides up smoothly (0.3s ease-out)
- [ ] Focus trapped inside drawer
- [ ] Focus returns to trigger on close
- [ ] "Show X Results" updates count dynamically
- [ ] Touch targets ≥44x44px (WCAG 2.5.5)

#### 2.3 Desktop Filter Sidebar (Day 3-4)

**Pattern** (from REI research):

- Vertical sidebar, left-aligned
- Collapsible filter sections (accordion)
- Filters apply instantly (no "Apply" button needed on desktop)
- Sticky positioning (scroll with page)

**Implementation**:

```typescript
// src/components/adventures/FilterSidebar.tsx
export function FilterSidebar({ filters, onChange }) {
  return (
    <aside className="sticky top-24 w-64 space-y-4">
      <Accordion type="multiple" defaultValue={['season', 'difficulty']}>
        <AccordionItem value="season">
          <AccordionTrigger>Season</AccordionTrigger>
          <AccordionContent>
            <SeasonFilter />
          </AccordionContent>
        </AccordionItem>
        {/* More filters */}
      </Accordion>
    </aside>
  );
}
```

**Success Criteria**:

- [ ] Sidebar sticky positioning works
- [ ] Accordion sections expand/collapse
- [ ] Filters apply instantly on change
- [ ] "Skip to Results" link for keyboard users (WCAG 2.4.1)

#### 2.4 Elevation Dual-Thumb Slider (Day 5)

**Specification** (from SPEC-07 clarification):

- Range: 0-5000 ft
- Step: 100 ft increments
- Display: "1,200 ft" format (comma-separated thousands)
- URL: `?elevation=500-2000` (min-max pair)
- Mobile: 44x44px touch targets (WCAG compliance)

**Implementation**:

```typescript
// src/components/adventures/ElevationSlider.tsx
import { DualRangeSlider } from '@/components/ui/dual-range-slider';

export function ElevationSlider({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="font-display font-medium">
        Elevation Gain
      </label>

      <DualRangeSlider
        min={0}
        max={5000}
        step={100}
        value={value}
        onValueChange={onChange}
        formatLabel={(val) => `${val.toLocaleString()} ft`}
        className="touch-target-large" // 44x44px thumbs
      />

      <div className="text-sm text-brand-mud/60">
        {value[0].toLocaleString()} ft - {value[1].toLocaleString()} ft
      </div>
    </div>
  );
}
```

**Success Criteria**:

- [ ] Both thumbs draggable
- [ ] Touch targets ≥44x44px
- [ ] Value updates in real-time
- [ ] Accessible keyboard controls (arrow keys move by step)

#### 2.5 Offline Banner (Day 5)

**Specification** (from SPEC-07 clarification):

- Fixed top banner, below header navigation
- Message: "You're offline, but don't worry - filters still work. Grand love ya!"
- Style: `bg-brand-brown text-brand-cream` with subtle icon
- Auto-hide when connection returns
- Accessibility: `role="status" aria-live="polite"`

**Implementation**:

```typescript
// src/components/adventures/OfflineBanner.tsx
export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
  }, []);

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-16 left-0 right-0 bg-brand-brown text-brand-cream px-4 py-2 text-center z-50"
    >
      You're offline, but don't worry - filters still work. Grand love ya!
    </div>
  );
}
```

**Success Criteria**:

- [ ] Banner appears on connection loss
- [ ] Banner disappears on connection return
- [ ] Screen reader announces status change
- [ ] Does not obstruct page content

---

### PHASE 3: Offline Support & Performance

**Duration**: 4-5 days
**Dependencies**: Phase 2 complete
**Goal**: Service Worker + IndexedDB for rural WV spotty connections

#### 3.1 Service Worker Setup (Day 1-2)

**Strategy** (from Cloudflare research):

- Cache adventures data in IndexedDB
- Intercept fetch requests for adventure queries
- Serve from cache when offline
- Background sync when connection returns

**Implementation**:

```typescript
// public/sw.js (or Astro integration)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('adventures-v1').then((cache) => {
      return cache.addAll([
        '/adventures/',
        '/data/adventures.json'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/adventures')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
```

**Success Criteria**:

- [ ] Service Worker registers on first visit
- [ ] Adventures data cached in IndexedDB
- [ ] Offline filtering works (no network required)
- [ ] Background sync updates cache when online

#### 3.2 IndexedDB Filter State (Day 2-3)

**Specification** (from SPEC-07 clarification):

- IndexedDB stores adventure data ONLY (not filter state)
- Filter state persists ONLY via URL parameters
- Every new visit to `/adventures/` shows empty filters
- Exception: URL with params (`?season=fall`) applies those filters

**Implementation**:

```typescript
// src/lib/adventures/offline-store.ts
import { openDB } from 'idb';

const db = await openDB('adventures-db', 1, {
  upgrade(db) {
    db.createObjectStore('adventures', { keyPath: 'id' });
  }
});

export async function cacheAdventures(adventures: Adventure[]) {
  const tx = db.transaction('adventures', 'readwrite');
  await Promise.all(adventures.map(a => tx.store.put(a)));
  await tx.done;
}

export async function getOfflineAdventures(): Promise<Adventure[]> {
  return db.getAll('adventures');
}
```

**Success Criteria**:

- [ ] Adventures cached on first load
- [ ] Offline mode serves from IndexedDB
- [ ] Filter state NOT persisted across sessions
- [ ] URL params override empty filters

#### 3.3 Performance Optimization (Day 4-5)

**Targets** (from SPEC-07):

- Filter response: <50ms for 70 items
- React re-render: <100ms
- Total interaction time: <150ms (acceptable for client-side)

**Optimizations**:

1. **Debounce text search** - 300ms delay on input
2. **Memoize filter functions** - React.useMemo for expensive calculations
3. **Virtualize results grid** - Only render visible cards (react-window)
4. **Bundle size** - Keep React island <50KB gzipped

**Implementation**:

```typescript
// Debounce search
const debouncedSearch = useDebouncedValue(searchTerm, 300);

// Memoize filtered results
const filteredAdventures = useMemo(() => {
  return filterAdventures(allAdventures, filters);
}, [allAdventures, filters]);

// Virtualize long lists (if >100 items in future)
import { FixedSizeGrid } from 'react-window';
```

**Testing**:

- Chrome DevTools Performance profiler
- Test on low-end Android device (rural WV users)
- Verify <50ms filter time, <100ms render time

**Success Criteria**:

- [ ] Filter 70 items in <50ms
- [ ] React re-render in <100ms
- [ ] Total interaction time <150ms
- [ ] Bundle size <50KB gzipped

---

### PHASE 4: Accessibility & Testing

**Duration**: 4-5 days
**Dependencies**: Phase 3 complete
**Goal**: WCAG 2.1 AA compliance, manual + automated testing

#### 4.1 WCAG Compliance Audit (Day 1-2)

**Critical Success Criteria** (from research):

| WCAG Criterion | Requirement | Implementation |
|----------------|-------------|----------------|
| **2.1.1 Keyboard** | All filters operable via keyboard | Tab, Enter, Space, Arrow keys work |
| **2.1.2 No Keyboard Trap** | Focus trap in drawer releases | Esc key closes drawer, focus returns |
| **2.4.1 Bypass Blocks** | Skip to results link | "Skip to Results" before filters |
| **1.4.3 Contrast** | 4.5:1 text contrast | Test with axe DevTools |
| **2.5.5 Target Size** | ≥44x44px touch targets | All mobile filter controls |
| **4.1.3 Status Messages** | Announce result count | ARIA live region updates |

**Testing Tools**:

- axe DevTools (automated, catches ~30-50% of issues)
- NVDA screen reader (manual, Windows)
- VoiceOver (manual, Mac/iOS)
- Keyboard-only navigation (manual)

**Implementation**:

```typescript
// ARIA live region for result count
<div role="status" aria-live="polite" className="sr-only">
  Found {filteredCount} adventures
</div>

// Skip to results link
<a href="#results" className="skip-link">
  Skip to Results
</a>

// Focus restoration on drawer close
<Sheet onOpenChange={(open) => {
  if (!open) {
    triggerButtonRef.current?.focus();
  }
}}>
```

**Success Criteria**:

- [ ] axe DevTools: 0 violations
- [ ] NVDA: All filters announced correctly
- [ ] Keyboard-only: Can apply all filters without mouse
- [ ] Contrast: All text meets 4.5:1 ratio
- [ ] Touch targets: All ≥44x44px on mobile

#### 4.2 Manual Testing (Day 3-4)

**Test Scenarios**:

1. **Desktop Safari (Mac)**
   - Apply filters via sidebar
   - Verify instant application
   - Test Back/Forward buttons
   - Test shareable URL

2. **Mobile Chrome (Android)**
   - Open filter drawer
   - Apply multiple filters
   - Test "Show X Results" button
   - Test offline mode (airplane mode)

3. **Mobile Safari (iOS)**
   - Geolocation permission flow
   - Touch target sizes
   - Elevation slider interaction
   - Offline banner appearance

4. **Rural WV Simulation**
   - Throttle network to Slow 3G (Chrome DevTools)
   - Test filter performance
   - Test Service Worker caching
   - Test background sync

**Test Matrix**:

| Device | Browser | Connection | Pass/Fail |
|--------|---------|------------|-----------|
| Desktop | Chrome | Fast | |
| Desktop | Safari | Fast | |
| Android | Chrome | 3G | |
| iOS | Safari | 3G | |
| iOS | Safari | Offline | |

**Success Criteria**:

- [ ] All 5 scenarios pass
- [ ] No layout breaking on any device
- [ ] Performance acceptable on Slow 3G
- [ ] Offline mode works correctly

#### 4.3 Performance Benchmarking (Day 5)

**Metrics** (from research):

- **Lighthouse Performance**: ≥90 score
- **Core Web Vitals**:
  - LCP (Largest Contentful Paint): <2.5s
  - FID (First Input Delay): <100ms
  - CLS (Cumulative Layout Shift): <0.1
- **Custom Metrics**:
  - Filter interaction time: <150ms
  - React island hydration: <500ms

**Testing**:

```bash
# Lighthouse CI
npm run lighthouse -- --url=/adventures/

# Custom performance marks
performance.mark('filter-start');
applyFilters();
performance.mark('filter-end');
performance.measure('filter-duration', 'filter-start', 'filter-end');
```

**Success Criteria**:

- [ ] Lighthouse Performance: ≥90
- [ ] LCP: <2.5s
- [ ] FID: <100ms
- [ ] CLS: <0.1
- [ ] Filter interaction: <150ms

---

### PHASE 5: Deployment & Monitoring

**Duration**: 2-3 days
**Dependencies**: Phase 4 complete
**Goal**: Production deployment with monitoring and rollback plan

#### 5.1 Cloudflare Pages Configuration (Day 1)

**Tasks**:

1. Create `public/_headers` file (cache control)
2. Configure `astro.config.mjs` (Cloudflare adapter)
3. Set up Argo Smart Routing ($5/month)
4. Deploy to Cloudflare Pages
5. Verify cache headers

**Configuration**:

```
# public/_headers
/adventures/*
  Cache-Control: max-age=0, must-revalidate

/_astro/*.js
  Cache-Control: max-age=31556952, immutable

/_astro/*.css
  Cache-Control: max-age=31556952, immutable

/data/adventures.json
  Cache-Control: max-age=3600
```

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  integrations: [react()]
});
```

**Deployment**:

```bash
npm run build
wrangler pages deploy dist/
```

**Success Criteria**:

- [ ] Deployment succeeds
- [ ] Cache headers verified with `curl -I`
- [ ] React island loads correctly
- [ ] Service Worker registers
- [ ] Argo Smart Routing enabled

#### 5.2 Monitoring Setup (Day 2)

**Tools**:

1. **Google Analytics 4** - User behavior tracking
2. **Cloudflare Analytics** - Edge performance
3. **Sentry** (optional) - Error tracking

**Key Metrics**:

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Filter interaction rate | ≥50% | <30% |
| Bounce rate | <40% | >60% |
| Avg session duration | ≥2 min | <1 min |
| Error rate | <1% | >5% |
| Filter performance | <150ms | >300ms |

**GA4 Events**:

```javascript
// Track filter usage
gtag('event', 'filter_apply', {
  season: filters.season,
  difficulty: filters.difficulty,
  elevation_range: filters.elevation
});

// Track offline mode
gtag('event', 'offline_mode', {
  is_offline: true
});
```

**Success Criteria**:

- [ ] GA4 tracking code deployed
- [ ] Custom events firing correctly
- [ ] Cloudflare Analytics dashboard configured
- [ ] Alert thresholds set

#### 5.3 Rollback Plan (Day 3)

**Triggers** (any of these):

- Performance: Filter interaction time >300ms
- Errors: Error rate >5%
- Accessibility: WCAG violations discovered
- User feedback: High complaint volume

**Rollback Process**:

1. Revert to previous Cloudflare Pages deployment
2. Disable React island (serve static HTML only)
3. Show "Filters temporarily unavailable" message
4. Investigate issue in staging environment

**Implementation**:

```bash
# Revert deployment
wrangler pages deployment list
wrangler pages deployment rollback <deployment-id>

# Feature flag (emergency kill switch)
export const FILTERS_ENABLED = import.meta.env.PUBLIC_FILTERS_ENABLED === 'true';
```

**Success Criteria**:

- [ ] Rollback procedure documented
- [ ] Feature flag implemented
- [ ] Previous deployment ID recorded
- [ ] Team trained on rollback process

---

## RISK REGISTER

### Top 5 Risks + Mitigations

| # | Risk | Probability | Impact | Mitigation | Owner |
|---|------|-------------|--------|------------|-------|
| 1 | **Schema update delays SPEC-07** | Medium | High | Run Phase 0 in parallel with planning. Script elevation API early. | Matt |
| 2 | **Bundle size exceeds 50KB** | Medium | Medium | Code-split React island. Lazy-load filters. Use Preact instead of React if needed. | Matt |
| 3 | **WCAG compliance failures** | Low | High | Use Radix UI primitives (pre-built accessibility). Budget extra time for manual testing. | Matt |
| 4 | **Performance <50ms target** | Low | Medium | Accept 100-150ms (research confirms acceptable). Add debouncing. Consider pagination if >100 items. | Matt |
| 5 | **Offline mode doesn't work in rural WV** | Medium | Medium | Manual test on actual device in WV. Deploy progressively (test with 10% users first). | Matt |

### Risk Mitigation Details

**Risk 1: Schema Update Delays**

- **Trigger**: Elevation API fails, manual research takes >15 hours
- **Response**: Launch with 3 axes only (Season, Difficulty, Gear). Add Elevation and Suitability in SPEC-08.
- **Impact**: Reduced functionality, but core filtering works.

**Risk 2: Bundle Size**

- **Trigger**: React island >50KB gzipped
- **Response**: Replace React with Preact (3KB vs 40KB). Code-split filters into separate chunks.
- **Impact**: Same functionality, slightly different API.

**Risk 3: WCAG Failures**

- **Trigger**: Automated or manual testing finds violations
- **Response**: Fix violations before launch. Delay deployment if critical (focus trap, keyboard navigation).
- **Impact**: Timeline +2-3 days.

**Risk 4: Performance**

- **Trigger**: Filter interaction >150ms on low-end devices
- **Response**: Add debouncing (300ms). Virtualize results grid. Accept 150ms as acceptable (not <50ms).
- **Impact**: Slightly slower on old Android devices, but still usable.

**Risk 5: Offline Mode**

- **Trigger**: Service Worker fails on iOS, IndexedDB quota exceeded
- **Response**: Graceful degradation (show message "Filters require internet connection"). Reduce cached data size.
- **Impact**: Offline mode unavailable, but site still works online.

---

## TESTING STRATEGY

### 4.1 Manual Testing Checklist

**Desktop (Chrome, Safari, Firefox)**:

- [ ] Filter sidebar renders correctly
- [ ] Instant filter application works
- [ ] URL updates on filter change
- [ ] Back/Forward buttons work
- [ ] Shareable URLs restore state
- [ ] Keyboard navigation (Tab, Enter, Space)
- [ ] Screen reader announces filters (NVDA/VoiceOver)
- [ ] "Skip to Results" link works
- [ ] No layout breaking on wide screens

**Mobile (iOS Safari, Android Chrome)**:

- [ ] Filter drawer slides up from bottom
- [ ] Touch targets ≥44x44px
- [ ] Elevation slider draggable
- [ ] "Show X Results" applies filters
- [ ] Focus trap works in drawer
- [ ] Offline banner appears when offline
- [ ] Geolocation permission flow
- [ ] No layout breaking on narrow screens

**Rural WV Simulation (Slow 3G)**:

- [ ] Page loads in <5s
- [ ] Filters work offline
- [ ] Service Worker caches data
- [ ] Background sync updates when online
- [ ] No network errors in console

### 4.2 Automated Testing

**Unit Tests** (Vitest):

```bash
npm run test

# Test files:
# - src/lib/adventures/filters.test.ts (filter logic)
# - src/lib/adventures/url-state.test.ts (URL serialization)
# - src/lib/adventures/haversine.test.ts (geolocation)
```

**Integration Tests** (Playwright):

```bash
npm run test:e2e

# Test scenarios:
# - Apply single filter
# - Apply multiple filters
# - Clear filters
# - Use elevation slider
# - Share filtered URL
# - Offline mode
```

**Accessibility Tests** (axe-core):

```bash
npm run test:a11y

# Checks:
# - Keyboard navigation
# - ARIA attributes
# - Color contrast
# - Touch target sizes
# - Screen reader labels
```

### 4.3 Performance Testing

**Lighthouse CI** (automated):

```bash
npm run lighthouse

# Metrics:
# - Performance: ≥90
# - Accessibility: 100
# - Best Practices: ≥90
# - SEO: ≥90
```

**Manual Performance Profiling**:

1. Open Chrome DevTools → Performance
2. Start recording
3. Apply multiple filters
4. Stop recording
5. Analyze:
   - Filter function execution time (<50ms target)
   - React re-render time (<100ms target)
   - Total interaction time (<150ms acceptable)

**Network Throttling**:

- Test on Fast 3G (rural WV baseline)
- Test on Slow 3G (worst case)
- Test offline (airplane mode)

---

## DEPLOYMENT STRATEGY

### Pre-Deployment Checklist

**Code Review**:

- [ ] All code reviewed by second developer
- [ ] WVWO aesthetic guidelines followed
- [ ] No hardcoded secrets or API keys
- [ ] TypeScript types strict
- [ ] ESLint/Prettier passing

**Testing**:

- [ ] All manual tests passed
- [ ] All automated tests passing
- [ ] Accessibility audit clean (0 violations)
- [ ] Performance benchmarks met
- [ ] Cross-browser testing complete

**Documentation**:

- [ ] User guide for filter usage (for Kim)
- [ ] Developer documentation for maintenance
- [ ] Schema documentation for content creators
- [ ] Deployment runbook

**Cloudflare**:

- [ ] `_headers` file configured
- [ ] Argo Smart Routing enabled
- [ ] DNS records correct
- [ ] SSL certificate active

### Deployment Steps

**Step 1: Build**

```bash
cd wv-wild-web
npm run build
npm run test  # Verify no errors
```

**Step 2: Deploy to Staging**

```bash
wrangler pages deploy dist/ --project-name wvwo-staging
# Test at staging URL
```

**Step 3: Verify Staging**

- [ ] Filters work correctly
- [ ] Cache headers correct
- [ ] Service Worker registers
- [ ] Offline mode works
- [ ] Analytics tracking

**Step 4: Deploy to Production**

```bash
wrangler pages deploy dist/ --project-name wvwo-production
```

**Step 5: Smoke Test Production**

- [ ] Visit /adventures/
- [ ] Apply filters
- [ ] Check GA4 events firing
- [ ] Verify cache headers with `curl -I`

**Step 6: Monitor (First 24 Hours)**

- [ ] Check Cloudflare Analytics for errors
- [ ] Check GA4 for filter interaction rate
- [ ] Check Sentry for JavaScript errors
- [ ] Monitor bounce rate

### Post-Deployment Monitoring (4 Weeks)

**Week 1: Validation**

- Daily: Check error rate, filter usage, bounce rate
- Action: Fix critical bugs within 24 hours
- Metric: Error rate <1%, filter interaction ≥40%

**Week 2-4: Optimization**

- Weekly: Analyze filter combinations (which are popular?)
- Weekly: Review performance metrics (any slowdowns?)
- Monthly: User feedback survey (is filtering helpful?)

**Decision Criteria for SPEC-08**:
After 4 weeks, answer these questions:

1. **Performance**: Is filter interaction time acceptable? (<150ms or better?)
2. **Usage**: Are users engaging with filters? (≥50% interaction rate?)
3. **Demand**: Which filter combinations are most popular? (inform canonical URLs)
4. **Bottlenecks**: Are there performance issues on specific devices?

**Go/No-Go for Cloudflare Workers Pre-Rendering** (SPEC-08 decision):

- **GO** if: Filter latency >150ms AND high user volume (>1000/day) AND specific combos dominate
- **NO-GO** if: Performance acceptable AND low complexity preferred

---

## DEFINITION OF DONE VALIDATION

### Acceptance Criteria (from SPEC-07)

**Functional**:

- [ ] **5-axis filtering**: Season, Difficulty, Gear, Elevation (0-5000 ft), Suitability
- [ ] **Dual-thumb elevation slider**: Range selection, 100 ft increments, "1,200 ft" display
- [ ] **URL state persistence**: Shareable filter URLs, browser Back/Forward works
- [ ] **Offline filtering**: Works without network (IndexedDB cache, Service Worker)
- [ ] **Geolocation "Closest to Me"**: Haversine distance sort (permission-based)
- [ ] **Mobile filter drawer**: Bottom sheet, focus trap, "Show X Results" button
- [ ] **Desktop sidebar**: Instant application, sticky positioning, accordion sections

**Performance**:

- [ ] Filter 70 items in <50ms (client-side, TanStack Table)
- [ ] React re-render in <100ms
- [ ] Total interaction time <150ms (acceptable)
- [ ] Bundle size <50KB gzipped
- [ ] Lighthouse Performance ≥90

**Accessibility (WCAG 2.1 AA)**:

- [ ] Keyboard navigation (Tab, Enter, Space, Arrow keys)
- [ ] Focus trap in drawer (Esc closes, focus returns)
- [ ] Screen reader support (ARIA labels, live regions)
- [ ] Color contrast 4.5:1 (all text)
- [ ] Touch targets ≥44x44px (mobile)
- [ ] "Skip to Results" link (bypass blocks)

**SEO**:

- [ ] Canonical tags prevent index bloat
- [ ] robots.txt blocks low-value filter combos
- [ ] Schema.org CollectionPage JSON-LD
- [ ] High-value combos indexed (Season + Difficulty, NOT all permutations)

**WVWO Compliance**:

- [ ] Brand colors (brand-brown, sign-green, brand-cream, brand-orange <5%)
- [ ] Typography (Bitter display, Permanent Marker hand, Noto Sans body)
- [ ] Sharp corners (rounded-sm, NOT rounded-md/lg)
- [ ] Kim's voice in UI copy ("Grand love ya!" in offline banner)
- [ ] Authentic rural WV aesthetic (no corporate tone, no AI slop)

**Testing**:

- [ ] Manual testing on 5 devices (desktop, mobile iOS/Android, rural 3G)
- [ ] Automated tests passing (unit, integration, accessibility)
- [ ] Accessibility audit clean (axe DevTools, NVDA, VoiceOver)
- [ ] Performance benchmarks met (Lighthouse, Core Web Vitals)

**Documentation**:

- [ ] User guide for Kim (how to use filters)
- [ ] Developer documentation (maintenance, adding filters)
- [ ] Schema documentation (elevation_gain, suitability fields)
- [ ] Deployment runbook (rollback procedure)

---

## POST-LAUNCH MONITORING PLAN

### Monitoring Dashboard (Google Analytics 4)

**Key Metrics**:

| Metric | Baseline | Target | Alert |
|--------|----------|--------|-------|
| Filter interaction rate | TBD | ≥50% | <30% |
| Bounce rate on /adventures/ | TBD | <40% | >60% |
| Avg session duration | TBD | ≥2 min | <1 min |
| Error rate (JS errors) | 0% | <1% | >5% |
| Filter performance (avg) | TBD | <150ms | >300ms |
| Offline mode usage | 0% | ≥10% | N/A |

**Events to Track**:

```javascript
// Filter interactions
gtag('event', 'filter_apply', {
  filter_type: 'season',
  filter_value: 'fall'
});

// Popular combos
gtag('event', 'filter_combo', {
  season: 'fall',
  difficulty: 'moderate',
  gear: 'hunting'
});

// Geolocation
gtag('event', 'geolocation_used', {
  permission_granted: true
});

// Offline mode
gtag('event', 'offline_mode_active', {
  duration_seconds: 120
});

// Performance
gtag('event', 'filter_performance', {
  duration_ms: 87,
  item_count: 70
});
```

### Weekly Review (4 Weeks)

**Week 1** (Dec 30 - Jan 5):

- **Focus**: Bug detection, critical fixes
- **Metrics**: Error rate, filter interaction rate
- **Action**: Fix any errors >1%, optimize if interaction <40%

**Week 2** (Jan 6 - Jan 12):

- **Focus**: Performance optimization
- **Metrics**: Filter performance, bounce rate
- **Action**: Add debouncing if >150ms, investigate high bounce rate

**Week 3** (Jan 13 - Jan 19):

- **Focus**: User behavior analysis
- **Metrics**: Popular filter combinations, session duration
- **Action**: Document top 10 filter combos for SEO canonical strategy

**Week 4** (Jan 20 - Jan 26):

- **Focus**: Decision criteria for SPEC-08
- **Metrics**: All metrics, user feedback
- **Action**: Decide on Workers pre-rendering (GO/NO-GO)

### Decision Criteria for SPEC-08

**Workers Pre-Rendering** (from research):

- **GO** if ALL true:
  - Filter performance >150ms on 50%+ devices
  - User volume >1000/day
  - Top 10 filter combos account for >60% usage
  - Team has 20 hours for implementation

- **NO-GO** if ANY true:
  - Filter performance acceptable (<150ms)
  - Low user volume (<500/day)
  - Filter usage distributed (no clear winners)
  - Timeline too tight

**Alternative Optimizations** (if Workers not justified):

- Add pagination (20 items/page instead of 70)
- Code-split filters (lazy-load less-used ones)
- Add debouncing (already planned)
- Switch to Preact (3KB vs 40KB React)

---

## CRITICAL PATH ITEMS

### Blocking Dependencies

**Phase 0 → Phase 1**:

- Schema must have elevation_gain and suitability fields
- At least 70% of adventures must have elevation data
- Cannot start filter logic without these fields

**Phase 1 → Phase 2**:

- Filter types and functions must be defined
- TanStack Table integration must work
- URL state management must be functional

**Phase 2 → Phase 3**:

- React components must render correctly
- Mobile drawer and desktop sidebar must work
- Cannot test offline mode without working UI

**Phase 3 → Phase 4**:

- Service Worker must register
- IndexedDB caching must work
- Cannot test accessibility without functional app

**Phase 4 → Phase 5**:

- All WCAG violations must be fixed
- Performance benchmarks must be met
- Cannot deploy with known critical issues

### Timeline Impact

**Critical Path** (longest dependency chain):

```
Schema Update (3-4 days)
  ↓
Filter Logic (2 days)
  ↓
React Components (5 days)
  ↓
Offline Support (4 days)
  ↓
Accessibility Testing (4 days)
  ↓
Deployment (2 days)
  ↓
Monitoring (4 weeks)

TOTAL: 20-21 days + 4 weeks monitoring
```

**Parallelizable**:

- Data backfill (elevation) can overlap with schema design
- UI design can overlap with filter logic implementation
- Automated testing can run during manual testing
- Documentation can be written during development

**Buffer**: Add 20% contingency (4 days) for unknowns
**Final Timeline**: 3-4 weeks development + 4 weeks monitoring

---

## COST BREAKDOWN

### Monthly Recurring Costs

| Service | Plan | Cost | Notes |
|---------|------|------|-------|
| **Cloudflare Pages** | Free | $0 | Unlimited static hosting |
| **Cloudflare Pages Functions** | Free | $0 | 100K requests/month included |
| **Cloudflare Argo Smart Routing** | Paid | $5 | 30-33% latency improvement for rural WV |
| **Domain (via Cloudflare)** | Paid | $20 | wvwildoutdoors.com |
| **Google Analytics 4** | Free | $0 | Core tracking |
| **Sentry (optional)** | Free | $0 | 5K errors/month free tier |
| **TOTAL** | | **$25/month** | |

**vs. Alternatives**:

- Vercel (Next.js ISR): $20-50/month
- AWS CloudFront: $50-200/month + origin costs
- **Cloudflare: 50-75% cheaper**

### One-Time Development Costs

| Task | Hours | Notes |
|------|-------|-------|
| Schema update (Phase 0) | 24-32 | Elevation API script + manual research |
| Filter logic (Phase 1) | 40 | TanStack Table, URL state, geolocation |
| React components (Phase 2) | 40 | Mobile drawer, desktop sidebar, filters |
| Offline support (Phase 3) | 32 | Service Worker, IndexedDB |
| Testing (Phase 4) | 32 | Manual + automated + accessibility |
| Deployment (Phase 5) | 16 | Config, deploy, monitor setup |
| **TOTAL** | **184-192 hours** | ~4-5 weeks at 40 hr/week |

---

## APPENDIX: RESEARCH SUMMARY

### Key Findings from Research Documents

**1. Architecture Decision** (from Adventures Hub Filtering Architecture Research):

- **React + TanStack Table** recommended over Vanilla JS
- Reason: Maintainability, accessibility ecosystem (Radix UI), scalable to 700+ items
- Trade-off: Slight performance cost (~100ms vs 50ms), but acceptable for 70 items

**2. UX Patterns** (from AllTrails/REI analysis):

- **Desktop**: Horizontal filter bar OR left sidebar (chose sidebar for WVWO)
- **Mobile**: Bottom sheet drawer (thumb-friendly, focus trap required)
- **Progressive disclosure**: Quick filters (chips) + "All Filters" button for advanced

**3. Cloudflare Optimization** (from Cloudflare research):

- **Pages over Workers** for SPEC-07 (simpler, automatic static caching)
- **Argo Smart Routing**: $5/month, 30-33% latency reduction (worth it for rural WV)
- **Cache strategy**: HTML (max-age=0), JS/CSS (immutable 1 year), Data (1 hour)

**4. Workers Pre-Rendering** (NOT recommended for SPEC-07):

- **Performance gain**: 30-50ms (imperceptible to users)
- **Complexity cost**: 20-30 hours extra development
- **Decision**: Launch with client-side filtering, re-evaluate in SPEC-08 if data shows need

**5. SEO Strategy** (from GSC/Cloudflare Analytics proxy):

- **High-demand combos**: Hunting + Fall, Easy Waterfall Hikes, Dog-Friendly Trails
- **Canonical strategy**: Index 2-axis combos only (Season + Difficulty)
- **I-79 Corridor**: High-value local SEO target (Exits 57-155)

---

## REFERENCES

1. **SPEC-07 Specification** (v2.1.0) - Complete requirements
2. **Adventures Hub Filtering Architecture Research** - React vs Vanilla JS, TanStack Table, WCAG compliance
3. **Cloudflare Pages + Astro Caching Strategy** - Cache headers, Argo Smart Routing, Service Worker
4. **Cloudflare Workers Pre-Rendering Decision** - Performance analysis, cost-benefit
5. **Cloudflare Analytics + GSC Research** - High-demand filter combos, SEO strategy
6. **SPEC-06 Content Collections Schema** - Foundation for adventure data structure

---

**Document Owner**: Matt (Tech Lead)
**Last Updated**: 2025-12-23
**Next Review**: After Phase 0 completion (schema update)
