# SPEC-07 Performance Architecture

## Adventures Hub Multi-Axis Filtering - Rural WV 3G Optimization

**Version:** 1.0.0
**Created:** 2025-12-23
**Target:** <2.5s LCP, 100-150ms filter response, 230ms HTTP/2 savings on 3G
**Constraint:** Rural WV spotty 3G/4G connections, 70+ adventure items, 5 filter axes

---

## Executive Summary

This performance architecture addresses the unique challenge of delivering interactive filtering for 70+ adventure destinations to rural West Virginia users on spotty 3G connections. The strategy combines aggressive bundle optimization, Cloudflare edge caching, HTTP/2 Server Push, and client-side resilience to achieve sub-2.5s Largest Contentful Paint (LCP) and 100-150ms filter response times.

**Key Performance Targets:**

- **LCP (Largest Contentful Paint):** <2.5 seconds on 3G (Good rating)
- **Filter Response Time:** 100-150ms for 70 items across 5 axes
- **Bundle Size:** <95 KB per React island (gzipped)
- **HTTP/2 Push Savings:** 230ms RTT reduction on 3G
- **Offline Mode:** 0ms filter response (IndexedDB-powered)

---

## 1. Bundle Size Budget & Splitting Strategy

### 1.1 Performance Budget Breakdown

Based on 3G constraints (750 Kbps down, 250 Kbps up, 100-300ms RTT):

| Asset Type | Budget (Gzipped) | Budget (Uncompressed) | Justification |
|-----------|------------------|----------------------|--------------|
| **HTML (Initial)** | 15 KB | 60 KB | Static Astro-rendered HTML with adventure list |
| **Critical CSS** | 10 KB | 30 KB | Above-fold styles, inline in `<head>` |
| **Filter Island JS** | 85 KB | 280 KB | React + TanStack Table + filter logic (main bundle) |
| **shadcn/ui Components** | 12 KB | 40 KB | Shared UI primitives (Dialog, Slider, Checkbox) |
| **Service Worker** | 8 KB | 25 KB | Offline support + cache management |
| **Deferred CSS** | 15 KB | 50 KB | Below-fold styles, lazy-loaded |
| **Total Critical Path** | **110 KB** | **365 KB** | ~1.2s download on 3G (750 Kbps) |

**Math Check (3G Download Time):**

- 110 KB gzipped = 880 Kb (kilobits)
- 880 Kb ÷ 750 Kbps = 1.17 seconds (download)
- Add 300ms RTT + 200ms parse/execute = **1.67s total** (under 2.5s LCP budget)

### 1.2 Bundle Splitting Recommendation: **Single Island Architecture**

**Decision:** Use **ONE** React island for the entire filter UI, not multiple islands.

**Rationale:**

| Approach | Pros | Cons | Verdict |
|----------|------|------|---------|
| **Multiple Islands** (Filters + Results + Map) | Granular hydration, could lazy-load Map | 3x HTTP/2 requests, shared React runtime overhead (50 KB × 3), complex state management | ❌ REJECT |
| **Single Island** (Unified Filter Component) | Single hydration pass, shared React runtime (50 KB once), simpler state | Larger initial bundle | ✅ APPROVED |

**Why Single Island Wins for 70 Items:**

- **Shared React Runtime:** React core (50 KB) is loaded ONCE, not duplicated.
- **State Management:** Filter state, result list, and map markers share a single React context.
- **HTTP/2 Push:** One push relationship (`/adventures/` → `island-filter.js`), not three.
- **Cognitive Load:** For 70 items, there's no performance gain from splitting. TanStack Table handles 70 rows in <10ms.

**Exception:** If the Map component (Leaflet.js) exceeds 30 KB, split it into a separate island loaded on user interaction (click "Show Map").

### 1.3 Code Splitting Within the Single Island

**Entry Point:** `island-filter.tsx`

```typescript
// island-filter.tsx (Main Bundle - 85 KB)
import { AdventureFilterApp } from './AdventureFilterApp';
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(
  document.getElementById('adventure-filter-root')!,
  <AdventureFilterApp initialData={window.__ADVENTURES_DATA__} />
);
```

**Lazy-Loaded Modules (Dynamic Imports):**

```typescript
// AdventureFilterApp.tsx
import { lazy, Suspense } from 'react';

// Lazy-load heavy components
const MapView = lazy(() => import('./components/MapView'));
const AdvancedFilters = lazy(() => import('./components/AdvancedFilters'));

export function AdventureFilterApp({ initialData }) {
  const [showMap, setShowMap] = useState(false);

  return (
    <div>
      {/* Critical: Filters + Results (loaded immediately) */}
      <FilterBar />
      <ResultList items={filteredData} />

      {/* Deferred: Map (loaded on user interaction) */}
      {showMap && (
        <Suspense fallback={<MapSkeleton />}>
          <MapView items={filteredData} />
        </Suspense>
      )}
    </div>
  );
}
```

**Deferred Modules:**

- **MapView.tsx** (Leaflet.js wrapper): 30 KB → Loaded when user clicks "Show Map"
- **AdvancedFilters.tsx** (Dual-thumb range sliders, elevation UI): 15 KB → Loaded in modal drawer

**Total Initial Bundle:** 85 KB - 30 KB (map) - 15 KB (advanced) = **40 KB** (core filter logic)

---

## 2. HTTP/2 Server Push Configuration

### 2.1 Why HTTP/2 Push Matters for Rural 3G

**Problem:** On 3G, each round-trip time (RTT) costs 100-300ms.

**Traditional Waterfall (Without Push):**

```
1. Request /adventures/            → 300ms RTT
2. Receive HTML, parse <script>    → 100ms
3. Request /island-filter.js       → 300ms RTT ← AVOIDABLE
4. Download JS                     → 1.2s
```

**Total:** 1.9s before JS executes

**With HTTP/2 Push:**

```
1. Request /adventures/            → 300ms RTT
   ↳ Server PUSHES /island-filter.js (no extra RTT)
2. Receive HTML + JS in parallel   → 100ms parse
3. JS already in cache             → 0ms (no request)
4. Download JS                     → 1.2s
```

**Total:** 1.6s before JS executes → **300ms savings**

### 2.2 Cloudflare `_headers` File Configuration

Create `public/_headers` in the Astro project:

```nginx
# Cache static assets at edge + browser
/*.js
  Cache-Control: public, max-age=31556952, immutable
  Link: </island-filter.*.js>; rel=preload; as=script

/*.css
  Cache-Control: public, max-age=31556952, immutable

# Cache HTML at edge (short TTL for freshness)
/adventures/
  Cache-Control: public, max-age=0, must-revalidate
  Link: </island-filter.*.js>; rel=preload; as=script; nopush

# Cache adventure data JSON (1 hour)
/data/adventures.json
  Cache-Control: public, max-age=3600, stale-while-revalidate=86400

# Disable cache for filter API responses (if using)
/api/filter*
  Cache-Control: no-store
```

**Key Directives:**

- **`max-age=31556952, immutable`**: JavaScript bundles use content hashing (`island-filter.abc123.js`), safe to cache for 1 year.
- **`Link: <...>; rel=preload`**: Browser preload hint (loads JS before parser discovers it).
- **`nopush`**: Prevent Cloudflare from pushing (use browser preload instead). HTTP/2 Push is complex; preload is simpler and works across CDNs.

### 2.3 Alternative: Link Preload vs HTTP/2 Push

**2025 Recommendation: Use `<link rel="preload">` in HTML instead of HTTP/2 Push.**

**Why:**

- **Browser Support:** Preload works in 95%+ browsers; HTTP/2 Push has cache invalidation bugs.
- **Simpler:** No server configuration needed beyond `_headers`.
- **Cloudflare Limitation:** Cloudflare Pages doesn't fully support HTTP/2 Push (uses HTTP/3 QUIC, which has different semantics).

**Implementation (Astro Layout):**

```astro
---
// src/layouts/AdventuresLayout.astro
const filterBundleUrl = '/island-filter.abc123.js'; // Vite injects hash
---

<html>
<head>
  <!-- Preload critical JS (browser fetches immediately) -->
  <link rel="preload" href={filterBundleUrl} as="script" crossorigin />

  <!-- Inline critical CSS (no extra request) -->
  <style>{criticalCSS}</style>
</head>
<body>
  <div id="adventure-filter-root"></div>
  <script type="module" src={filterBundleUrl}></script>
</body>
</html>
```

**Performance Impact:**

- **Preload:** Starts JS download ~200ms earlier (no parser blocking).
- **HTTP/2 Push:** Would save 300ms RTT, but Cloudflare's implementation is unreliable.
- **Verdict:** Preload is sufficient for 3G target. If benchmarking shows >2.5s LCP, revisit Push.

---

## 3. Cloudflare Caching Strategy (3-Tier)

### 3.1 Caching Tier Breakdown

| Tier | Technology | What It Caches | TTL | Purpose |
|------|-----------|----------------|-----|---------|
| **Tier 1: Edge (Cloudflare)** | CDN Cache | Static HTML, JS, CSS | HTML: 0s (revalidate), JS/CSS: 1 year | Reduce origin load, serve from nearest POP |
| **Tier 2: Browser** | HTTP Cache | Same as Tier 1 | Same as Edge | Offline repeat visits |
| **Tier 3: Service Worker** | IndexedDB | Filter state + adventure JSON | Indefinite (until updated) | Offline filtering (0ms response) |

### 3.2 Tier 1: Cloudflare Edge Cache Rules

**Goal:** Serve 90%+ of requests from edge without hitting origin.

**Cache Behavior by File Type:**

```nginx
# public/_headers (Cloudflare-specific)

# HTML: Always revalidate (check for new adventures)
/adventures/*
  Cache-Control: public, max-age=0, must-revalidate
  Cloudflare-CDN-Cache-Control: max-age=3600
  # Edge caches for 1 hour, but browser must revalidate

# JavaScript/CSS: Immutable (content-hashed filenames)
/*.js
  Cache-Control: public, max-age=31556952, immutable

/*.css
  Cache-Control: public, max-age=31556952, immutable

# Images: Long cache (adventures don't change photos often)
/images/adventures/*
  Cache-Control: public, max-age=2592000
  # 30 days

# JSON data: Stale-while-revalidate (serve stale if origin slow)
/data/adventures.json
  Cache-Control: public, max-age=3600, stale-while-revalidate=86400
  # Serve stale up to 24 hours if origin unreachable
```

**Cloudflare-Specific Optimization:**

Add to Cloudflare Dashboard → Caching → Configuration:

- **Tiered Cache:** Enable (uses regional data centers as secondary cache).
- **Argo Smart Routing:** Enable ($5/month) → Routes around congestion, reduces TTFB by 30-33%.

### 3.3 Tier 2: Browser Cache

Browser automatically respects `Cache-Control` headers from Tier 1.

**Additional Optimization:** Service Worker intercepts fetch requests and serves from cache first.

```javascript
// service-worker.js
const CACHE_NAME = 'wvwo-adventures-v1';

self.addEventListener('fetch', (event) => {
  // Cache-first strategy for static assets
  if (event.request.url.match(/\.(js|css|jpg|png|webp)$/)) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request))
    );
  }

  // Network-first for HTML (check for updates)
  if (event.request.url.includes('/adventures/')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request)) // Fallback to cache if offline
    );
  }
});
```

### 3.4 Tier 3: Service Worker + IndexedDB (Offline Mode)

**Goal:** Enable filtering to work offline (0ms response time).

**Implementation:**

```typescript
// lib/offline-store.ts
import { openDB, DBSchema } from 'idb';

interface AdventuresDB extends DBSchema {
  adventures: {
    key: string;
    value: Adventure;
    indexes: { 'by-difficulty': string; 'by-season': string };
  };
}

const db = await openDB<AdventuresDB>('wvwo-adventures', 1, {
  upgrade(db) {
    const store = db.createObjectStore('adventures', { keyPath: 'id' });
    store.createIndex('by-difficulty', 'difficulty');
    store.createIndex('by-season', 'season');
  },
});

// Store adventures on first load
export async function cacheAdventures(adventures: Adventure[]) {
  const tx = db.transaction('adventures', 'readwrite');
  await Promise.all(adventures.map(a => tx.store.put(a)));
  await tx.done;
}

// Filter locally when offline
export async function filterOffline(criteria: FilterCriteria): Promise<Adventure[]> {
  const tx = db.transaction('adventures', 'readonly');
  const all = await tx.store.getAll();

  // Client-side filtering (TanStack Table logic)
  return all.filter(adventure => matchesCriteria(adventure, criteria));
}
```

**Performance Characteristics:**

- **IndexedDB Query (70 items):** <5ms
- **Client-side filter (5 axes):** 10-20ms
- **Total Offline Filter Response:** **15-25ms** (6-10x faster than network request)

---

## 4. Vite Build Configuration (Terser + Tree Shaking)

### 4.1 Astro + Vite Configuration

**File:** `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [
    react({
      // Only hydrate filter island (not static content)
      include: ['**/island-filter.tsx'],
    }),
  ],
  adapter: cloudflare({ mode: 'directory' }),

  vite: {
    build: {
      // Bundle size optimization
      target: 'es2020',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,        // Remove console.log in production
          drop_debugger: true,
          pure_funcs: ['console.info', 'console.debug'],
          passes: 2,                 // Extra compression pass
        },
        mangle: {
          safari10: true,            // Safari compatibility
        },
        format: {
          comments: false,           // Strip comments
        },
      },

      // Code splitting strategy
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor chunk for React + TanStack
            'vendor-react': ['react', 'react-dom'],
            'vendor-table': ['@tanstack/react-table'],
            // shadcn components in separate chunk (shared UI)
            'ui-components': [
              './src/components/ui/dialog',
              './src/components/ui/slider',
              './src/components/ui/checkbox',
            ],
          },

          // Content-hashed filenames (enable immutable caching)
          chunkFileNames: 'chunks/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash][extname]',
        },
      },

      // Tree shaking (remove unused exports)
      modulePreload: {
        polyfill: true,
      },
    },

    // Development server optimization
    server: {
      hmr: {
        overlay: true,
      },
    },
  },
});
```

### 4.2 Tree Shaking Best Practices

**Problem:** Many libraries export entire APIs, bloating bundles.

**Solution:** Use named imports + side-effect-free modules.

**Example (TanStack Table):**

```typescript
// ❌ BAD: Imports entire library (200 KB)
import TanStack from '@tanstack/react-table';

// ✅ GOOD: Tree-shakable named imports (80 KB)
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
} from '@tanstack/react-table';
```

**Verification:**

```bash
# Analyze bundle size after build
npm run build
npx vite-bundle-visualizer dist/client

# Check if tree shaking worked
ls -lh dist/client/chunks/*.js | sort -k5 -h
```

**Expected Output:**

```
vendor-react.[hash].js     → 52 KB (React + ReactDOM)
vendor-table.[hash].js     → 28 KB (TanStack Table core)
ui-components.[hash].js    → 12 KB (shadcn Dialog, Slider, Checkbox)
island-filter.[hash].js    → 35 KB (custom filter logic)
```

**Total:** ~127 KB uncompressed → **85 KB gzipped** (within budget)

### 4.3 Advanced Optimization: Preact Compat (Optional)

If React bundle exceeds budget, replace React with Preact (3 KB alternative).

**Configuration:**

```javascript
// vite.config.js
export default {
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
};
```

**Trade-offs:**

- **Savings:** 50 KB → 3 KB (47 KB saved)
- **Cost:** Some React features unsupported (Suspense, React.lazy less reliable)
- **Verdict:** Only use if React bundle >100 KB gzipped after all other optimizations.

---

## 5. Filter Response Optimization (100-150ms Target)

### 5.1 Performance Budget Breakdown (70 Items, 5 Axes)

Target: **100-150ms** from filter selection to UI update.

**Phase Breakdown:**

| Phase | Operation | Time (ms) | Cumulative |
|-------|-----------|-----------|------------|
| **1. Input Event** | User clicks checkbox | 0 | 0 |
| **2. State Update** | React setState + debounce | 10 | 10 |
| **3. TanStack Filter** | Compute filtered rows (70 items, 5 axes) | 20 | 30 |
| **4. Facet Calculation** | Update available filter options | 30 | 60 |
| **5. Virtual DOM Diff** | React reconciliation (70 cards) | 25 | 85 |
| **6. DOM Update** | Paint/layout (70 cards) | 40 | 125 |
| **7. Animation** | Fade-in transition (optional) | 25 | 150 |

**Total:** 150ms (within budget, no optimization needed)

**If >150ms:** Apply the following optimizations.

### 5.2 Optimization Techniques

#### 5.2.1 Debouncing (For Text Search)

```typescript
import { useDebouncedCallback } from 'use-debounce';

const debounced = useDebouncedCallback(
  (value: string) => {
    table.setGlobalFilter(value);
  },
  300 // Wait 300ms after user stops typing
);

<input onChange={(e) => debounced(e.target.value)} />
```

**Impact:** Reduces filter executions from 10+/second to 1 every 300ms.

#### 5.2.2 Virtual Scrolling (If >100 Items)

For 70 items, virtual scrolling is overkill. Enable only if dataset grows >100.

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
  count: filteredData.length,
  getScrollElement: () => scrollContainerRef.current,
  estimateSize: () => 200, // Card height in pixels
});

// Render only visible items
{virtualizer.getVirtualItems().map(virtualItem => (
  <AdventureCard key={virtualItem.key} {...filteredData[virtualItem.index]} />
))}
```

**Impact:** Renders 10-15 items instead of 70 → 200ms → 50ms (4x faster).

#### 5.2.3 Memoization (Prevent Unnecessary Re-renders)

```typescript
import { useMemo } from 'react';

const filteredData = useMemo(() => {
  return table.getFilteredRowModel().rows.map(r => r.original);
}, [table, filterCriteria]); // Only recompute when filters change

// Memoize expensive computations (e.g., difficulty color)
const DifficultyBadge = memo(({ difficulty }: { difficulty: string }) => (
  <span className={getDifficultyColor(difficulty)}>{difficulty}</span>
));
```

**Impact:** Prevents re-rendering 70 cards when unrelated state changes (e.g., drawer open/close).

#### 5.2.4 Web Workers (For Heavy Filtering)

If filtering exceeds 100ms (unlikely for 70 items), offload to Web Worker.

```typescript
// filter-worker.ts
self.onmessage = (e) => {
  const { adventures, criteria } = e.data;
  const filtered = adventures.filter(a => matchesCriteria(a, criteria));
  self.postMessage(filtered);
};

// Main thread
const worker = new Worker('./filter-worker.ts');
worker.postMessage({ adventures, criteria });
worker.onmessage = (e) => setFilteredData(e.data);
```

**Impact:** Non-blocking filtering (UI remains responsive during computation).
**Trade-off:** 50ms overhead for worker communication (only worth it if >200ms filter time).

---

## 6. Performance Monitoring Plan

### 6.1 Core Web Vitals Tracking

**Metrics to Track:**

| Metric | Target | Measurement Tool | Trigger |
|--------|--------|------------------|---------|
| **LCP** (Largest Contentful Paint) | <2.5s | Cloudflare Web Analytics | Page load |
| **FID** (First Input Delay) | <100ms | Google Analytics 4 | First user interaction |
| **CLS** (Cumulative Layout Shift) | <0.1 | Cloudflare RUM | During browsing session |
| **TTI** (Time to Interactive) | <3.5s | Lighthouse CI | Automated build check |
| **Filter Response** | <150ms | Custom Performance API | Filter interaction |

**Implementation (Custom Metrics):**

```typescript
// Track filter performance
const trackFilterPerformance = () => {
  const start = performance.now();

  table.setColumnFilters(newFilters); // Apply filter

  requestAnimationFrame(() => {
    const end = performance.now();
    const duration = end - start;

    // Send to analytics
    gtag('event', 'filter_performance', {
      filter_type: 'difficulty',
      duration_ms: duration,
      result_count: table.getFilteredRowModel().rows.length,
    });

    // Warn if slow
    if (duration > 150) {
      console.warn(`Slow filter: ${duration}ms (target: <150ms)`);
    }
  });
};
```

### 6.2 Cloudflare Analytics Configuration

**Enable in Cloudflare Dashboard:**

1. Navigate to `wvwo-storefront` site → **Speed** → **Web Analytics**
2. Enable **Real User Monitoring (RUM)** → Tracks LCP, FID, CLS automatically
3. Add snippet to Astro layout:

```astro
<!-- src/layouts/Base.astro -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "YOUR_BEACON_TOKEN"}'></script>
```

**Custom Dashboards:**

- **Dashboard 1:** LCP by Connection Type (3G vs 4G vs WiFi)
- **Dashboard 2:** Filter Response Time (p50, p95, p99)
- **Dashboard 3:** Cache Hit Rate (edge vs browser vs miss)

### 6.3 Lighthouse CI (Automated Regression Testing)

**GitHub Actions Workflow:**

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build
        run: npm ci && npm run build
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:4321/adventures/
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
```

**Budget File (`lighthouse-budget.json`):**

```json
{
  "performance": 90,
  "accessibility": 100,
  "best-practices": 95,
  "seo": 100,
  "metrics": {
    "interactive": 3500,
    "first-contentful-paint": 1800,
    "largest-contentful-paint": 2500,
    "cumulative-layout-shift": 0.1
  },
  "resourceSizes": {
    "script": 95000,  // 95 KB (matches bundle budget)
    "stylesheet": 25000,
    "image": 200000,
    "total": 400000
  }
}
```

**Failure Handling:** If Lighthouse score drops below budget, CI fails and blocks merge.

---

## 7. Optimization Checklist (Pre-Launch)

### 7.1 Build-Time Optimizations

- [ ] **Bundle Analysis:** Run `vite-bundle-visualizer` to identify bloat
- [ ] **Terser Minification:** Enabled in `vite.config.js` with `drop_console`
- [ ] **Tree Shaking:** Verify unused exports removed (check bundle size)
- [ ] **Code Splitting:** Vendor chunks separated (react, tanstack-table, ui-components)
- [ ] **Image Optimization:** Use `astro:assets` for automatic WebP conversion
- [ ] **Font Subsetting:** Limit Google Fonts to used characters only

```html
<!-- Font subsetting example -->
<link href="https://fonts.googleapis.com/css2?family=Bitter:wght@700;900&text=WVWildOutdorsAventu&display=swap" rel="stylesheet">
```

### 7.2 Runtime Optimizations

- [ ] **Debouncing:** Text search input debounced to 300ms
- [ ] **Memoization:** `useMemo` for filtered data, `memo` for cards
- [ ] **Lazy Loading:** Map component loaded on-demand (not in critical path)
- [ ] **Virtual Scrolling:** Disabled for <100 items (unnecessary overhead)
- [ ] **Service Worker:** Registered and caching adventures JSON
- [ ] **IndexedDB:** Storing adventures for offline filtering

### 7.3 Cloudflare Configuration

- [ ] **`_headers` File:** Cache rules configured (HTML: 0s, JS/CSS: 1 year)
- [ ] **Tiered Cache:** Enabled in Cloudflare Dashboard
- [ ] **Argo Smart Routing:** Enabled ($5/month) for 30% TTFB reduction
- [ ] **Minification:** Auto-minify disabled (Vite handles it, avoid double-minification)
- [ ] **HTTP/2:** Enabled by default (no config needed)
- [ ] **Brotli Compression:** Enabled (better than gzip for text)

### 7.4 Testing & Monitoring

- [ ] **Lighthouse CI:** Passing with scores >90 (performance, accessibility, SEO)
- [ ] **Real Device Testing:** Tested on actual 3G device in rural WV
- [ ] **Offline Mode:** Verified filters work without network
- [ ] **Analytics Installed:** Cloudflare RUM tracking Core Web Vitals
- [ ] **Custom Metrics:** Filter response time tracked in GA4
- [ ] **Cache Hit Rate:** Monitored in Cloudflare Analytics (target >80%)

---

## 8. Risk Assessment & Contingency Plans

### 8.1 Potential Performance Bottlenecks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **React Bundle >95 KB** | Medium | High (breaks LCP budget) | Switch to Preact (saves 47 KB) |
| **3G RTT >300ms** | High | Medium (LCP 2.5s → 2.8s) | Enable Argo Smart Routing |
| **Filter Response >150ms** | Low | Low (still usable at 200ms) | Add debouncing + virtual scrolling |
| **Cache Miss Rate >50%** | Medium | Medium (edge not helping) | Increase `max-age` to 1 hour for HTML |
| **Offline Mode Broken** | Low | High (rural users suffer) | Add E2E tests for Service Worker |

### 8.2 Rollback Plan

If performance targets not met after 2 weeks of optimization:

**Phase 1: Reduce Scope (Week 1-2)**

- Remove map component (saves 30 KB)
- Limit filters to 3 axes instead of 5 (simpler UI)
- Disable Service Worker (if causing bugs)

**Phase 2: Architectural Change (Week 3-4)**

- Switch from React islands to Vanilla JS (saves 50 KB, loses maintainability)
- Paginate results (20 items/page instead of 70)
- Move filtering to server-side (requires Cloudflare Workers)

**Phase 3: Accept Higher Budget (Last Resort)**

- Increase LCP target to 3.5s (still "Moderate" rating)
- Focus on desktop users only (mobile gets simplified UI)

---

## 9. Future Optimizations (Post-Launch)

### 9.1 Edge Functions for Dynamic Filtering

If dataset grows beyond 70 items (e.g., 500+ adventures), client-side filtering becomes slow.

**Solution:** Cloudflare Pages Functions (serverless filtering at edge).

```typescript
// functions/api/filter.ts
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const difficulty = url.searchParams.get('difficulty');

  // Query from KV or D1 (Cloudflare's SQLite)
  const db = context.env.DB;
  const results = await db.prepare(
    'SELECT * FROM adventures WHERE difficulty = ?'
  ).bind(difficulty).all();

  return Response.json(results);
}
```

**Trade-offs:**

- **Pro:** Scales to 10,000+ items without client performance hit
- **Con:** Requires network request (100-300ms latency on 3G)
- **When to Use:** Dataset >200 items OR complex queries (geospatial radius search)

### 9.2 Partial Hydration (Astro Islands v2)

Astro 5.x supports partial hydration, but TanStack Table requires full React context.

**Potential Optimization:**

- Split filter UI into smaller islands (e.g., `SearchBar`, `DifficultyFilter`, `ResultList`)
- Only hydrate the active filter (others remain static HTML)

**Expected Savings:** 20-30 KB (only load active filter JS)
**Complexity:** High (state management across islands is tricky)
**Verdict:** Defer until dataset >200 items.

### 9.3 Prefetching Adjacent Pages

If results are paginated (future state), prefetch next page on scroll.

```typescript
import { useEffect } from 'react';

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      // User scrolled to bottom, prefetch next page
      fetch(`/api/adventures?page=${currentPage + 1}`);
    }
  });

  observer.observe(scrollSentinelRef.current);
}, [currentPage]);
```

**Impact:** Instant page transitions (0ms perceived latency)

---

## 10. Conclusion & Performance SLA

### 10.1 Performance Service Level Agreement (SLA)

**Commitment:** 95% of users will experience:

- **LCP:** <2.5 seconds (Good)
- **FID:** <100ms (Good)
- **CLS:** <0.1 (Good)
- **Filter Response:** <150ms

**Measured Over:** 30-day rolling window (Cloudflare RUM data)

**If SLA Violated:** Trigger optimization sprint (review checklist, apply contingency plan)

### 10.2 Success Metrics

**Launch Criteria (Must Pass All):**

- [ ] Lighthouse Performance Score >90 on 3G throttle
- [ ] Real-world 3G test (WV location) shows <2.5s LCP
- [ ] Filter response <150ms for 70 items (measured in GA4)
- [ ] Offline mode works (Service Worker caches adventures)
- [ ] Cache hit rate >80% (Cloudflare Analytics)
- [ ] Bundle size <95 KB gzipped (island-filter.js)

**Long-Term Goals (3 Months Post-Launch):**

- [ ] 90th percentile LCP <2.0s (move from "Good" to "Excellent")
- [ ] Filter response <100ms (current target: 150ms)
- [ ] Zero CLS (eliminate all layout shifts)
- [ ] 95%+ cache hit rate (edge serving almost everything)

---

## Appendices

### Appendix A: File Structure

```
wv-wild-web/
├── public/
│   ├── _headers                          # Cloudflare cache rules
│   └── service-worker.js                 # Offline support
├── src/
│   ├── components/
│   │   ├── island-filter.tsx             # Main React island (85 KB)
│   │   ├── AdventureFilterApp.tsx        # Filter logic
│   │   ├── FilterBar.tsx                 # UI for filters
│   │   ├── ResultList.tsx                # Adventure cards
│   │   └── MapView.tsx                   # Lazy-loaded map (30 KB)
│   ├── layouts/
│   │   └── AdventuresLayout.astro        # Base layout with preload
│   └── pages/
│       └── adventures/
│           └── index.astro               # Static /adventures/ page
├── astro.config.mjs                      # Vite + Terser config
└── lighthouse-budget.json                # CI performance budget
```

### Appendix B: Performance Testing Commands

```bash
# Build and analyze bundle
npm run build
npx vite-bundle-visualizer dist/client

# Run Lighthouse locally (3G simulation)
npx lighthouse http://localhost:4321/adventures/ \
  --throttling-method=devtools \
  --throttling.requestLatencyMs=300 \
  --throttling.downloadThroughputKbps=750 \
  --output=html --output-path=./lighthouse-report.html

# Test offline mode
npm run preview
# Open DevTools → Application → Service Workers → "Offline" checkbox
# Click filters → Should still work

# Measure filter response time
# (Open browser DevTools → Performance tab → Record → Click filter → Stop)
# Look for "Filter Update" marker → Should be <150ms
```

### Appendix C: References

1. **Core Web Vitals:** <https://web.dev/vitals/>
2. **Cloudflare Caching Docs:** <https://developers.cloudflare.com/cache/>
3. **TanStack Table Performance:** <https://tanstack.com/table/v8/docs/guide/column-faceting>
4. **Astro Islands Architecture:** <https://docs.astro.build/en/concepts/islands/>
5. **HTTP/2 Push vs Preload:** <https://www.smashingmagazine.com/2017/04/guide-http2-server-push/>

---

**Document Version:** 1.0.0
**Last Updated:** 2025-12-23
**Next Review:** After SPEC-07 implementation complete

**Grand love ya!** 🦌🏔️
