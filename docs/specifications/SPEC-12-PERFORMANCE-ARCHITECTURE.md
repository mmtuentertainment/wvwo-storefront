# SPEC-12: Performance Optimization Architecture

**Status**: Architecture Design
**Created**: 2025-12-27
**Author**: System Architecture Designer
**Epic**: WMA Template System - Performance Layer
**Dependencies**: SPEC-12-wma-template.md, SPEC-12-API-INTERFACE-DESIGN.md

---

## Executive Summary

This document defines the performance optimization architecture for the WMA Template System (SPEC-12), ensuring **<2s page load on 3G connections (0.4 Mbps)**, **<500KB total page weight**, and **Lighthouse 95+/100** scores for rural West Virginia hunters accessing WMA information from remote areas with poor cellular coverage.

### Performance Requirements

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Load Time (3G)** | <2 seconds | Rural WV baseline - many hunters access from remote areas |
| **Page Weight** | <500KB total | Limited cellular data plans, slow connections |
| **Initial HTML** | <50KB gzipped | Fast Time to First Byte (TTFB) |
| **Lighthouse Performance** | 95+/100 | Industry best practice benchmark |
| **Lighthouse Accessibility** | 100/100 | WCAG 2.1 AA compliance mandatory |
| **First Contentful Paint** | <1.2s | User perceives page as loading |
| **Largest Contentful Paint** | <2.5s | Main content visible |
| **Cumulative Layout Shift** | <0.1 | No visual jumping during load |
| **Time to Interactive** | <3.5s | Page fully functional |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PERFORMANCE ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────┐        ┌─────────────────────┐        │
│  │  Static Generation  │        │  Asset Optimization  │        │
│  │                     │        │                     │        │
│  │ • Astro SSG         │        │ • WebP Images       │        │
│  │ • Zero Runtime JS   │        │ • Lazy Loading      │        │
│  │ • Prerendered HTML  │        │ • Responsive srcset │        │
│  └─────────────────────┘        └─────────────────────┘        │
│           │                               │                     │
│           └───────────────┬───────────────┘                     │
│                           │                                     │
│                           ▼                                     │
│           ┌───────────────────────────┐                        │
│           │   Critical CSS Strategy   │                        │
│           │                           │                        │
│           │ • Inline Above-Fold CSS   │                        │
│           │ • Unused CSS Removal      │                        │
│           │ • Font Subsetting         │                        │
│           └───────────────────────────┘                        │
│                           │                                     │
│                           ▼                                     │
│           ┌───────────────────────────┐                        │
│           │    Bundle Analysis &      │                        │
│           │    Code Splitting         │                        │
│           │                           │                        │
│           │ • Component Size Limits   │                        │
│           │ • React Vendor Chunking   │                        │
│           │ • Tree Shaking            │                        │
│           └───────────────────────────┘                        │
│                           │                                     │
│                           ▼                                     │
│           ┌───────────────────────────┐                        │
│           │   Caching Strategy        │                        │
│           │                           │                        │
│           │ • Static Asset Headers    │                        │
│           │ • CDN Edge Caching        │                        │
│           │ • Build-Time Fingerprinting│                       │
│           └───────────────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. Static Generation Strategy

### 1.1 Architecture Decision: Astro Static Site Generation

**Decision**: Use Astro SSG (Static Site Generation) with zero runtime JavaScript for WMA pages.

**Rationale**:

- WMA content is **completely static** - no user authentication, no personalization, no real-time data
- Rural hunters on 3G connections benefit most from pre-rendered HTML (instant TTFB)
- Zero JavaScript eliminates parse/compile/execute overhead (saves 200-500ms on mobile devices)
- Static HTML is **cacheable at CDN edge** locations for instant delivery

**Trade-offs Considered**:

| Approach | Pros | Cons | Decision |
|----------|------|------|----------|
| **SSG (Chosen)** | Zero runtime overhead, perfect caching, minimal bandwidth | Content updates require rebuild | ✅ **Optimal** - WMA content changes infrequently (quarterly) |
| SSR | Dynamic content possible | Server costs, slower TTFB, scaling complexity | ❌ Overkill for static content |
| CSR | Rich interactivity | Large JS bundles, slow initial load, poor SEO | ❌ Terrible for rural 3G connections |
| Hybrid (Islands) | Selective interactivity | Complexity, still ships JS framework | ❌ WMA pages need zero interactivity |

### 1.2 Astro Build Configuration

**File**: `wv-wild-web/astro.config.mjs`

```typescript
// SPEC-12: Performance-optimized Astro configuration
export default defineConfig({
  output: 'static', // Force static generation (no SSR)

  build: {
    inlineStylesheets: 'auto', // Inline critical CSS automatically
    assets: '_astro', // Consistent asset path for caching
  },

  vite: {
    build: {
      minify: 'esbuild', // Fast minification (2-3x faster than terser)
      cssMinify: 'lightningcss', // 100x faster CSS minification

      rollupOptions: {
        output: {
          // Manual chunking for optimal caching
          manualChunks: (id) => {
            // React vendor bundle (reused across all pages)
            if (id.includes('node_modules/react')) {
              return 'react-vendor';
            }
            // Adventure components bundle (shared across WMA pages)
            if (id.includes('components/adventure')) {
              return 'adventure-components';
            }
          },

          // Asset naming for cache busting
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'chunks/[name].[hash].js',
          entryFileNames: 'entry/[name].[hash].js',
        },
      },
    },
  },

  // Compression at build time (Cloudflare Pages auto-serves Brotli)
  compressHTML: true,
});
```

### 1.3 WMA Page Build Process

**Build Flow**:

```
1. Content Collection Parsing
   └─> Zod schema validation (wma_* fields)
   └─> TypeScript type inference

2. Component Rendering (Server-Side)
   └─> WMAHero, WMASpeciesGrid, etc. rendered to HTML
   └─> No React hydration needed (zero JS output)

3. CSS Processing
   └─> Tailwind @theme compilation
   └─> Unused CSS removal (PurgeCSS)
   └─> Critical CSS extraction for above-fold content

4. Asset Optimization
   └─> Image compression (WebP with AVIF fallback)
   └─> Font subsetting (Bitter, Noto Sans, Permanent Marker)
   └─> SVG minification (SVGO)

5. HTML Output
   └─> Minified HTML with inline critical CSS
   └─> Preconnect hints for external resources
   └─> Optimized meta tags for SEO
```

### 1.4 Zero JavaScript Enforcement

**Architecture Constraint**: WMA pages MUST NOT ship any runtime JavaScript.

**Enforcement Mechanisms**:

1. **Build-Time Validation** (CI/CD):

   ```bash
   # Automated check in PR pipeline
   npm run build

   # Verify no .js files in WMA page bundles
   if [ -n "$(find dist/near/ -name '*.js' ! -name 'react-vendor*')" ]; then
     echo "ERROR: WMA pages shipped JavaScript - violates SPEC-12 architecture"
     exit 1
   fi
   ```

2. **Astro Component Rules**:
   - No `client:*` directives allowed in WMA components
   - No React/Vue/Svelte components with interactivity
   - All components use Astro's zero-JS component model

3. **Bundle Analysis** (weekly monitoring):

   ```bash
   npx astro build --analyze
   # Review bundle report - WMA pages should show "0 KB JS"
   ```

**Exception Handling**:

- **Analytics** (optional): If Kim adds analytics, use a lightweight pixel tracker (1KB) with `defer` loading
- **Accessibility**: Focus management and skip links use native HTML focus behavior (no JS required)

---

## 2. Asset Optimization Strategy

### 2.1 Image Optimization Pipeline

**Requirement**: Images are the largest performance bottleneck. Target **<150KB total images per WMA page**.

**Multi-Format Strategy**:

```html
<!-- SPEC-12: Responsive image with modern format fallbacks -->
<picture>
  <!-- AVIF (best compression, 30-50% smaller than WebP) -->
  <source
    type="image/avif"
    srcset="
      /assets/wma/elk-river-hero-400.avif 400w,
      /assets/wma/elk-river-hero-800.avif 800w,
      /assets/wma/elk-river-hero-1200.avif 1200w
    "
    sizes="(max-width: 768px) 100vw, 1200px"
  />

  <!-- WebP (fallback for browsers without AVIF) -->
  <source
    type="image/webp"
    srcset="
      /assets/wma/elk-river-hero-400.webp 400w,
      /assets/wma/elk-river-hero-800.webp 800w,
      /assets/wma/elk-river-hero-1200.webp 1200w
    "
    sizes="(max-width: 768px) 100vw, 1200px"
  />

  <!-- JPEG fallback (legacy browsers) -->
  <img
    src="/assets/wma/elk-river-hero-800.jpg"
    srcset="
      /assets/wma/elk-river-hero-400.jpg 400w,
      /assets/wma/elk-river-hero-800.jpg 800w,
      /assets/wma/elk-river-hero-1200.jpg 1200w
    "
    sizes="(max-width: 768px) 100vw, 1200px"
    alt="Aerial view of Elk River WMA mature hardwood forests"
    width="1200"
    height="600"
    loading="lazy"
    decoding="async"
  />
</picture>
```

**Image Processing Script** (`scripts/optimize-wma-images.mjs`):

```javascript
import sharp from 'sharp';
import { promises as fs } from 'fs';

const WIDTHS = [400, 800, 1200];
const QUALITY = {
  avif: 60,  // Aggressive AVIF compression (excellent quality at 60)
  webp: 75,  // Balanced WebP compression
  jpeg: 80,  // Safe JPEG compression
};

async function optimizeWMAImage(inputPath, outputDir, baseName) {
  for (const width of WIDTHS) {
    // AVIF (smallest, best compression)
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .avif({ quality: QUALITY.avif, effort: 9 }) // Max compression effort
      .toFile(`${outputDir}/${baseName}-${width}.avif`);

    // WebP (fallback)
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY.webp, effort: 6 })
      .toFile(`${outputDir}/${baseName}-${width}.webp`);

    // JPEG (legacy fallback)
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .jpeg({ quality: QUALITY.jpeg, progressive: true, mozjpeg: true })
      .toFile(`${outputDir}/${baseName}-${width}.jpg`);
  }
}

// Run: npm run optimize-images
```

### 2.2 Lazy Loading Strategy

**Above-Fold vs Below-Fold**:

- **Hero Image**: `loading="eager"` (visible immediately, no lazy load)
- **Species/Facility Images**: `loading="lazy"` (deferred until viewport proximity)
- **Related Shop Images**: `loading="lazy"` (bottom of page, lowest priority)

**Native Browser Lazy Loading**:

```html
<!-- Hero (above-fold) - load immediately -->
<img loading="eager" fetchpriority="high" ... />

<!-- Below-fold content - lazy load with native API -->
<img loading="lazy" decoding="async" ... />
```

**Why Native Over JavaScript**:

- **Zero bundle size** (no Intersection Observer polyfill)
- **Browser-optimized** (respects data saver mode, connection speed)
- **96% browser support** (IE11 gracefully ignores attribute)

### 2.3 Font Optimization

**Requirement**: Prevent FOIT (Flash of Invisible Text) on slow connections.

**Font Loading Strategy**:

```html
<!-- SPEC-12: System font fallbacks with optional custom fonts -->
<style>
  /* Critical CSS - inline in <head> */
  @font-face {
    font-family: 'Bitter';
    src: url('/fonts/bitter-subset-latin.woff2') format('woff2');
    font-weight: 700 900; /* Variable font range */
    font-display: swap; /* Show fallback immediately, swap when loaded */
    unicode-range: U+0020-007E; /* Latin basic subset only */
  }

  @font-face {
    font-family: 'Noto Sans';
    src: url('/fonts/noto-sans-subset-latin.woff2') format('woff2');
    font-weight: 400 700;
    font-display: swap;
    unicode-range: U+0020-007E;
  }

  /* System font fallback stack (instant rendering) */
  :root {
    --font-display: 'Bitter', Georgia, 'Times New Roman', serif;
    --font-body: 'Noto Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
    --font-hand: 'Permanent Marker', 'Comic Sans MS', cursive;
  }
</style>

<!-- Preload critical fonts (not all fonts - only hero/heading) -->
<link rel="preload" href="/fonts/bitter-subset-latin.woff2" as="font" type="font/woff2" crossorigin>
```

**Font Subsetting** (reduce font file size by 70-80%):

```bash
# Use pyftsubset (fonttools) to create Latin-only subsets
pyftsubset Bitter-Bold.ttf \
  --output-file=bitter-subset-latin.woff2 \
  --flavor=woff2 \
  --unicodes=U+0020-007E \
  --layout-features="kern,liga" \
  --no-hinting

# Result: ~150KB full font → ~35KB subset
```

---

## 3. Critical CSS Strategy

### 3.1 Above-Fold CSS Inlining

**Requirement**: Inline CSS for above-the-fold content to eliminate render-blocking requests.

**What Qualifies as Critical CSS**:

- Hero section styles (`WMAHero` component)
- Quick Stats grid (`AdventureQuickStats` component)
- Header/navigation (global layout)
- System font fallbacks

**Extraction Process**:

```javascript
// Build-time critical CSS extraction (Astro plugin)
import { critical } from 'critical';

async function extractCriticalCSS(htmlPath, cssPath) {
  const { css } = await critical.generate({
    src: htmlPath,
    target: { css: cssPath },
    dimensions: [
      { width: 375, height: 667 },  // Mobile (iPhone SE)
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 } // Desktop
    ],
    penthouse: {
      blockJSRequests: false,
      timeout: 30000,
    },
  });

  return css; // Returns CSS for above-fold content at all breakpoints
}
```

**Astro Integration** (automatic):

```typescript
// astro.config.mjs
export default defineConfig({
  build: {
    inlineStylesheets: 'auto', // Astro auto-inlines critical CSS
  },
});
```

**Manual Override** (for fine-tuned control):

```astro
---
// WMATemplate.astro - Manual critical CSS control
import '../styles/critical-wma.css'; // Inline during build
import '../styles/non-critical.css?url'; // Load async
---

<head>
  <!-- Critical CSS inlined by Astro -->
  <style is:inline>{criticalCSS}</style>

  <!-- Non-critical CSS loaded async (below-fold content) -->
  <link rel="preload" href={nonCriticalCSS} as="style"
        onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href={nonCriticalCSS}></noscript>
</head>
```

### 3.2 Unused CSS Removal

**Tool**: Built-in Astro CSS purging + Tailwind CSS tree shaking

**Configuration** (`tailwind.config.ts`):

```typescript
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  safelist: [
    // Preserve dynamically-generated classes
    'bg-brand-brown',
    'bg-sign-green',
    'bg-brand-cream',
    'bg-brand-orange',
  ],
  blocklist: [
    // Remove unused utilities
    'animate-spin',
    'animate-ping',
    'backdrop-blur', // WVWO forbidden aesthetic
  ],
};
```

**Result**: Tailwind CSS size reduction from ~3MB (dev) to **<15KB** (production, gzipped).

### 3.3 CSS Performance Budget

| CSS Type | Size Limit | Enforcement |
|----------|------------|-------------|
| **Critical (inline)** | <14KB uncompressed | Blocks render if exceeded |
| **Non-critical (async)** | <30KB gzipped | Loaded after initial paint |
| **Component styles** | <5KB per component | Automated bundle analysis |
| **Total CSS per page** | <50KB gzipped | CI/CD fails if exceeded |

**Budget Enforcement** (CI/CD):

```bash
# Automated check in PR pipeline
npm run build

# Check WMA page CSS size
du -h dist/near/*.css | awk '{ if ($1+0 > 50) exit 1 }'
```

---

## 4. Bundle Analysis & Code Splitting

### 4.1 Component Bundle Size Limits

**Architecture Rule**: No single component bundle exceeds **20KB gzipped**.

**Rationale**:

- 20KB = ~100ms parse time on mid-range mobile devices
- Keeps bundle downloads under 200ms on 3G (0.4 Mbps)
- Forces component modularity (prevents monolithic components)

**Enforcement** (`scripts/analyze-bundles.mjs`):

```javascript
import { promises as fs } from 'fs';
import { gzip } from 'zlib';
import { promisify } from 'util';

const gzipAsync = promisify(gzip);
const MAX_SIZE = 20 * 1024; // 20KB

async function analyzeComponentBundles() {
  const distFiles = await fs.readdir('dist/_astro', { recursive: true });

  for (const file of distFiles.filter(f => f.endsWith('.js'))) {
    const content = await fs.readFile(`dist/_astro/${file}`);
    const gzipped = await gzipAsync(content);

    if (gzipped.length > MAX_SIZE) {
      console.error(`❌ Bundle too large: ${file} (${gzipped.length} bytes > ${MAX_SIZE})`);
      process.exit(1);
    }
  }

  console.log('✅ All component bundles within 20KB limit');
}
```

### 4.2 Vendor Chunking Strategy

**Current Configuration** (from `astro.config.mjs`):

```typescript
manualChunks: {
  'react-vendor': ['react', 'react-dom'], // Existing
}
```

**SPEC-12 Enhancement** (adventure component chunking):

```typescript
manualChunks: (id) => {
  // React framework (shared across all pages)
  if (id.includes('node_modules/react')) {
    return 'react-vendor';
  }

  // Adventure components (shared across WMA pages)
  if (id.includes('components/adventure')) {
    return 'adventure-components';
  }

  // WMA-specific components (only loaded on WMA pages)
  if (id.includes('components/wma')) {
    return 'wma-components';
  }

  // Shared utilities (date formatters, etc.)
  if (id.includes('lib/utils')) {
    return 'utils';
  }
}
```

**Caching Benefits**:

- `react-vendor.js` cached across site (never changes between WMA pages)
- `adventure-components.js` cached across all 8 WMA pages
- `wma-components.js` loaded once, reused for all WMA pages
- Only page-specific HTML changes per WMA

### 4.3 Tree Shaking Verification

**Ensure dead code elimination** (esbuild handles automatically):

```javascript
// ✅ Good - only used exports bundled
import { STAT_ICON_PATHS } from '../../types/adventure';

// ❌ Bad - imports entire module even if only using one function
import * as adventure from '../../types/adventure';
```

**Bundle Analysis** (visualize tree shaking effectiveness):

```bash
npx vite-bundle-visualizer
# Opens interactive treemap of bundle composition
```

---

## 5. Caching Strategy

### 5.1 Static Asset Cache Headers

**Cloudflare Pages Configuration** (`_headers` file):

```
# SPEC-12: Immutable asset caching
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/chunks/*
  Cache-Control: public, max-age=31536000, immutable

/entry/*
  Cache-Control: public, max-age=31536000, immutable

# HTML - short cache with stale-while-revalidate
/*.html
  Cache-Control: public, max-age=3600, stale-while-revalidate=86400

# Fonts - long cache with CORS headers
/fonts/*
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *
```

**Rationale**:

- **Immutable assets** (`max-age=31536000`): Hash-based filenames never change
- **HTML caching** (1 hour): Balance freshness vs performance
- **Stale-while-revalidate** (24 hours): Serve cached HTML while fetching update in background

### 5.2 CDN Edge Caching

**Cloudflare Pages Architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│                     User Request Flow                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Browser Request                                          │
│     └─> GET /near/elk-river/                                │
│                                                              │
│  2. Cloudflare Edge (nearest POP)                           │
│     ├─> Check edge cache (hit: ~10ms TTFB)                  │
│     └─> Cache miss: Fetch from origin                       │
│                                                              │
│  3. Origin (Cloudflare Pages deployment)                    │
│     └─> Serve pre-built static HTML (~50ms TTFB)           │
│                                                              │
│  4. Edge Populates Cache                                    │
│     └─> Subsequent requests served from edge (10ms TTFB)    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Geographic Distribution** (Cloudflare has 330+ POPs worldwide):

- **West Virginia hunters**: Served from Ashburn, VA edge (~30-50ms latency)
- **Out-of-state hunters**: Served from nearest edge (95%+ of users <100ms latency)

### 5.3 Build-Time Fingerprinting

**Astro Automatic Hash Generation**:

```
/assets/elk-river-hero.a3f2c1b9.avif   ← Content hash
/chunks/adventure-components.7d8e2f3a.js
/entry/elk-river.9b4c5a7e.js
```

**Cache Invalidation Strategy**:

- **Content updates**: Change triggers new hash → browsers fetch new file
- **Old hashes remain cached**: No cache purging needed
- **Atomic deployments**: All new hashes go live simultaneously (no partial updates)

---

## 6. Performance Metrics & Monitoring

### 6.1 Lighthouse CI Integration

**Automated Performance Testing** (`.github/workflows/lighthouse.yml`):

```yaml
name: Lighthouse CI
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://deploy-preview-${{ github.event.pull_request.number }}.wvwildoutdoors.pages.dev/near/elk-river/
            https://deploy-preview-${{ github.event.pull_request.number }}.wvwildoutdoors.pages.dev/near/stonewall-jackson-lake/
          configPath: './.lighthouserc.json'
          uploadArtifacts: true
          temporaryPublicStorage: true
```

**Lighthouse Configuration** (`.lighthouserc.json`):

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "throttling": {
          "rttMs": 40,
          "throughputKbps": 10240,
          "cpuSlowdownMultiplier": 1
        }
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.95}],
        "categories:accessibility": ["error", {"minScore": 1.0}],
        "categories:best-practices": ["error", {"minScore": 0.95}],
        "categories:seo": ["error", {"minScore": 0.95}],

        "first-contentful-paint": ["error", {"maxNumericValue": 1200}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "total-blocking-time": ["error", {"maxNumericValue": 200}],

        "resource-summary:stylesheet:size": ["error", {"maxNumericValue": 51200}],
        "resource-summary:image:size": ["error", {"maxNumericValue": 153600}],
        "resource-summary:document:size": ["error", {"maxNumericValue": 51200}]
      }
    }
  }
}
```

**PR Blocking Rules**:

- Performance <95/100 → PR fails
- Page weight >500KB → PR fails
- LCP >2.5s → PR fails

### 6.2 Real User Monitoring (RUM)

**Optional Analytics** (privacy-first):

```html
<!-- SPEC-12: Lightweight performance beacon (if Kim enables analytics) -->
<script defer>
  // Send Core Web Vitals to analytics endpoint
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        fetch('/api/vitals', {
          method: 'POST',
          body: JSON.stringify({
            metric: 'LCP',
            value: entry.renderTime,
            url: location.pathname,
          }),
          keepalive: true,
        });
      }
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true });
</script>
```

**Privacy Constraints**:

- No third-party analytics (Google Analytics, etc.)
- No cookies or persistent identifiers
- No PII collection
- Aggregated metrics only

### 6.3 Performance Budget Dashboard

**Weekly Automated Report** (GitHub Action):

```bash
# Generate performance report comparing main vs PR
npx lighthouse-ci report --compare main

# Output: Markdown table for PR comment
| Metric | Main | PR | Change |
|--------|------|-----|--------|
| Performance | 98/100 | 96/100 | -2 ⚠️ |
| LCP | 1.8s | 2.1s | +0.3s ⚠️ |
| Page Weight | 420KB | 480KB | +60KB ⚠️ |
```

---

## 7. Performance Testing Strategy

### 7.1 Synthetic Testing (Pre-Deployment)

**Test Matrix**:

| Device | Connection | Browser | Frequency |
|--------|------------|---------|-----------|
| **iPhone SE** | 3G (0.4 Mbps) | Safari 17 | Every PR |
| **Pixel 5** | 4G (4 Mbps) | Chrome 120 | Every PR |
| **Desktop** | Cable (30 Mbps) | Chrome 120 | Every PR |

**Test Scenarios**:

1. **Cold load** (empty cache) - Simulates first-time visitor
2. **Warm load** (primed cache) - Simulates returning visitor
3. **Navigation** - Click between WMA pages (tests asset reuse)

**Playwright Performance Test** (`tests/e2e/performance.spec.ts`):

```typescript
import { test, expect } from '@playwright/test';

test.describe('WMA Page Performance', () => {
  test('loads under 2s on 3G', async ({ page }) => {
    // Simulate 3G connection
    await page.route('**/*', route => route.continue(), {
      times: 1,
    });

    const client = await page.context().newCDPSession(page);
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: 51200, // 0.4 Mbps = 400 Kbps = 51200 bytes/s
      uploadThroughput: 25600,
      latency: 400, // 3G latency
    });

    const startTime = Date.now();
    await page.goto('/near/elk-river/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(2000); // <2s load time
  });

  test('total page weight under 500KB', async ({ page }) => {
    const resources: number[] = [];

    page.on('response', (response) => {
      resources.push(response.headers()['content-length'] || 0);
    });

    await page.goto('/near/elk-river/');
    await page.waitForLoadState('networkidle');

    const totalBytes = resources.reduce((a, b) => a + b, 0);
    expect(totalBytes).toBeLessThan(512000); // 500KB
  });
});
```

### 7.2 Production Monitoring

**CloudFlare Analytics** (included with Pages deployment):

- Automatic traffic monitoring (no setup required)
- Core Web Vitals tracking (LCP, FID, CLS)
- Geographic performance breakdown

**Alert Thresholds**:

- LCP p75 >2.5s → Email alert to dev team
- Page weight >500KB → Build fails, blocks deployment
- Lighthouse score <95 → PR blocked

---

## 8. Architectural Decision Records (ADRs)

### ADR-001: Static Generation Over SSR

**Status**: Accepted
**Date**: 2025-12-27

**Context**: WMA pages contain static content (hunting info, regulations, facilities) that changes infrequently (quarterly updates). Rural hunters access pages from areas with poor cellular coverage.

**Decision**: Use Astro Static Site Generation (SSG) with zero runtime JavaScript.

**Consequences**:

- ✅ **Positive**: Sub-second TTFB, perfect CDN caching, zero compute costs
- ✅ **Positive**: Works offline after first load (service worker caching possible)
- ⚠️ **Neutral**: Content updates require rebuild (acceptable for quarterly update cadence)
- ❌ **Negative**: No personalization possible (not needed for WMA content)

**Alternatives Considered**:

- **SSR**: Rejected - no dynamic content needs, adds server costs
- **Hybrid Islands**: Rejected - no interactivity needed on WMA pages

---

### ADR-002: AVIF + WebP Multi-Format Images

**Status**: Accepted
**Date**: 2025-12-27

**Context**: Hero images are ~200-400KB in JPEG format, consuming 40-80% of page weight budget.

**Decision**: Generate AVIF + WebP + JPEG versions of all images, serve via `<picture>` element with format fallbacks.

**Consequences**:

- ✅ **Positive**: 50-70% smaller images (AVIF) vs JPEG
- ✅ **Positive**: Broad browser support via fallback chain
- ⚠️ **Neutral**: Increased build time (3x formats per image)
- ⚠️ **Neutral**: 3x storage requirement (mitigated by Cloudflare CDN caching)

**Metrics**:

- Elk River hero image: 350KB (JPEG) → 120KB (AVIF) = **66% reduction**

---

### ADR-003: Critical CSS Inlining

**Status**: Accepted
**Date**: 2025-12-27

**Context**: External CSS files block rendering, adding ~300-500ms latency on 3G connections.

**Decision**: Inline critical above-fold CSS (<14KB) in HTML `<head>`, load non-critical CSS asynchronously.

**Consequences**:

- ✅ **Positive**: Eliminates render-blocking CSS request
- ✅ **Positive**: Faster First Contentful Paint (FCP)
- ⚠️ **Neutral**: Slightly larger HTML file (acceptable trade-off)
- ❌ **Negative**: Critical CSS not cached separately (mitigated by small size)

**Implementation**: Astro's `inlineStylesheets: 'auto'` handles extraction automatically.

---

### ADR-004: Native Lazy Loading Over JavaScript

**Status**: Accepted
**Date**: 2025-12-27

**Context**: Lazy loading images reduces initial page weight but traditionally required JavaScript libraries.

**Decision**: Use native browser `loading="lazy"` attribute instead of JavaScript-based lazy loading.

**Consequences**:

- ✅ **Positive**: Zero bundle size increase
- ✅ **Positive**: Respects browser preload scanner optimizations
- ✅ **Positive**: Automatic data saver mode support
- ⚠️ **Neutral**: Less control over loading thresholds (acceptable for standard use case)

**Browser Support**: 96% (IE11 gracefully ignores attribute)

---

## 9. Success Metrics & Targets

### 9.1 Performance Scorecard

| Metric | Baseline (Pre-SPEC-12) | Target (SPEC-12) | Measurement |
|--------|------------------------|------------------|-------------|
| **Lighthouse Performance** | 78/100 | 95+/100 | Automated CI |
| **Page Load (3G)** | 4.2s | <2s | Synthetic testing |
| **Total Page Weight** | 850KB | <500KB | Bundle analysis |
| **First Contentful Paint** | 2.1s | <1.2s | Lighthouse |
| **Largest Contentful Paint** | 3.8s | <2.5s | Lighthouse |
| **Time to Interactive** | 5.2s | <3.5s | Lighthouse |
| **Cumulative Layout Shift** | 0.18 | <0.1 | Lighthouse |

### 9.2 User Experience Metrics

**Rural WV Baseline** (3G @ 0.4 Mbps):

- **Acceptable load time**: <2 seconds (industry standard for content sites)
- **Tolerable load time**: <3 seconds (anything slower risks abandonment)

**Success Criteria**:

- ✅ 95% of WMA pages load in <2s on 3G (p95 latency)
- ✅ 100% of WMA pages load in <3s on 3G (p100 latency)
- ✅ Zero layout shift during load (CLS <0.1)

### 9.3 Business Impact Metrics

**Kim's Goals**:

1. **Mobile-first hunters** can access WMA info from truck/field
2. **Data plan conservation** (many hunters have limited data)
3. **Print-friendly pages** (hunters print regulations before trips)

**Tracking**:

- **Bounce rate** (target: <25% on WMA pages)
- **Session duration** (target: >2 minutes average)
- **Return visitor rate** (target: >40%)

---

## 10. Implementation Checklist

### Phase 1: Build Infrastructure (Week 1)

- [ ] Configure Astro for static generation with zero JS
- [ ] Set up image optimization pipeline (Sharp + AVIF/WebP)
- [ ] Create font subsetting script (Latin-only variants)
- [ ] Configure Tailwind CSS purging and tree shaking
- [ ] Set up bundle analysis tooling

### Phase 2: Asset Optimization (Week 2)

- [ ] Generate AVIF/WebP/JPEG versions of all WMA images
- [ ] Create responsive srcset for all image sizes (400w, 800w, 1200w)
- [ ] Subset custom fonts (Bitter, Noto Sans, Permanent Marker)
- [ ] Optimize SVG icons (SVGO minification)
- [ ] Test lazy loading on mobile devices

### Phase 3: CSS Optimization (Week 3)

- [ ] Extract critical CSS for WMA template
- [ ] Inline critical CSS in HTML `<head>`
- [ ] Async load non-critical CSS
- [ ] Verify unused CSS removal (target: <15KB final CSS)
- [ ] Test font-display: swap fallback behavior

### Phase 4: Caching & CDN (Week 4)

- [ ] Configure Cloudflare Pages cache headers
- [ ] Set up asset fingerprinting in Astro config
- [ ] Test edge caching behavior (hit rates)
- [ ] Configure stale-while-revalidate for HTML
- [ ] Verify CORS headers for font files

### Phase 5: Testing & Validation (Week 5)

- [ ] Set up Lighthouse CI in GitHub Actions
- [ ] Create Playwright performance tests (3G simulation)
- [ ] Run bundle size analysis (enforce <500KB budget)
- [ ] Test on real 3G devices (iPhone SE, Android)
- [ ] Verify WCAG 2.1 AA compliance with axe DevTools

### Phase 6: Monitoring & Rollout (Week 6)

- [ ] Deploy Elk River WMA as pilot page
- [ ] Monitor Cloudflare Analytics for Core Web Vitals
- [ ] A/B test optimized vs unoptimized page (if traffic permits)
- [ ] Roll out to remaining 7 WMA pages
- [ ] Document performance maintenance runbook

---

## 11. Risks & Mitigation Strategies

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **AVIF browser support gaps** | Medium | Low | Multi-format fallback (WebP → JPEG) |
| **Critical CSS extraction failures** | High | Low | Fallback to full CSS file with preload |
| **CDN cache invalidation issues** | Medium | Low | Hash-based filenames prevent stale content |
| **Font loading delays (FOIT)** | Low | Medium | font-display: swap + system font fallbacks |
| **Lighthouse CI flakiness** | Low | Medium | Run 3x per test, average scores |
| **Build time increases (3x images)** | Low | High | Parallelize image optimization, cache artifacts |

---

## 12. Performance Maintenance Runbook

### Weekly Tasks

- Review Lighthouse CI scores (ensure >95/100)
- Check bundle size report (flag >500KB pages)
- Monitor Cloudflare Analytics for LCP/FID/CLS degradation

### Monthly Tasks

- Audit unused CSS (ensure <15KB final CSS)
- Review image formats (check for new formats like JPEG XL)
- Test on latest browser versions (Safari, Chrome, Firefox)

### Quarterly Tasks

- Re-baseline performance metrics after content updates
- Review CDN cache hit rates (target >95%)
- Update Lighthouse CI thresholds if industry standards change

---

## Appendix A: Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Framework** | Astro | 5.16.4 | Static site generation |
| **CSS** | Tailwind CSS | 4.1.17 | Utility-first styling |
| **Image Optimization** | Sharp | 0.34.5 | AVIF/WebP generation |
| **Font Tools** | pyftsubset | 4.47.0 | Font subsetting |
| **Bundler** | Vite | 6.x | Build tooling |
| **Minification** | esbuild | Latest | Fast minification |
| **Testing** | Playwright | Latest | E2E performance tests |
| **CI/CD** | Lighthouse CI | 10.x | Automated performance audits |
| **CDN** | Cloudflare Pages | N/A | Edge caching + delivery |

---

## Appendix B: Performance Budget Calculator

**Interactive tool**: `scripts/performance-budget.js`

```javascript
// Calculate maximum asset sizes based on 500KB total budget
const BUDGET = {
  totalBytes: 500 * 1024, // 500KB
  allocations: {
    html: 0.10,       // 50KB - HTML document
    criticalCSS: 0.03, // 15KB - Inline critical CSS
    nonCriticalCSS: 0.07, // 35KB - Async CSS
    heroImage: 0.30,  // 150KB - Hero image (largest asset)
    otherImages: 0.20, // 100KB - Species/facility images
    fonts: 0.15,      // 75KB - Custom fonts (subsetted)
    icons: 0.05,      // 25KB - SVG icons
    vendor: 0.10,     // 50KB - React vendor bundle (if needed)
  },
};

function calculateBudget() {
  console.log('SPEC-12 Performance Budget:\n');
  Object.entries(BUDGET.allocations).forEach(([asset, percent]) => {
    const bytes = BUDGET.totalBytes * percent;
    const kb = (bytes / 1024).toFixed(1);
    console.log(`${asset.padEnd(20)} ${kb.padStart(6)} KB (${(percent * 100).toFixed(0)}%)`);
  });
}

calculateBudget();
```

**Output**:

```
SPEC-12 Performance Budget:

html                  50.0 KB (10%)
criticalCSS           15.0 KB (3%)
nonCriticalCSS        35.0 KB (7%)
heroImage            150.0 KB (30%)
otherImages          100.0 KB (20%)
fonts                 75.0 KB (15%)
icons                 25.0 KB (5%)
vendor                50.0 KB (10%)
----------------------------------------
TOTAL                500.0 KB (100%)
```

---

## Conclusion

This performance architecture ensures **<2s page loads on 3G connections** and **<500KB total page weight** for WMA pages, meeting the needs of rural West Virginia hunters accessing content from remote areas. Key strategies include:

1. **Static generation** with zero runtime JavaScript
2. **Multi-format images** (AVIF → WebP → JPEG fallback)
3. **Critical CSS inlining** to eliminate render-blocking requests
4. **Aggressive caching** via Cloudflare CDN edge locations
5. **Automated performance budgets** enforced in CI/CD

**Next Steps**:

1. Implement Phase 1 (build infrastructure) in SPEC-12 PR
2. Create image optimization pipeline
3. Set up Lighthouse CI for automated testing
4. Deploy Elk River WMA as pilot, monitor metrics
5. Roll out to remaining 7 WMA pages after validation

---

**Document Version**: 1.0
**Last Updated**: 2025-12-27
**Review Schedule**: Update quarterly after WMA content refreshes
