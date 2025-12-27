# AdventureHero.astro Performance Architecture

**Spec**: SPEC-09
**Created**: 2025-12-26
**Target**: LCP < 2.5s (4G), CLS < 0.1, FID < 100ms
**Author**: System Architecture Designer

---

## Executive Summary

This document defines the performance architecture for `AdventureHero.astro`, ensuring Core Web Vitals compliance while maintaining WVWO visual richness. The hero is the LCP element on adventure pages - optimizing it directly impacts SEO ranking.

**Key Decisions**:
1. Astro Image with responsive srcset (not CSS background-image)
2. Inline critical CSS for first paint
3. CSS-based camo pattern (not external SVG)
4. Zero JavaScript for static hero
5. Aggressive CDN caching via Cloudflare

---

## 1. Image Optimization Architecture

### 1.1 Astro Image Configuration

```astro
---
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';

interface Props {
  image: ImageMetadata;
  imageAlt: string;
  loading?: 'lazy' | 'eager';
  imagePosition?: 'center' | 'top' | 'bottom';
}

const { image, imageAlt, loading = 'eager', imagePosition = 'center' } = Astro.props;

// Object-position mapping
const positionMap = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom'
};
---

<Image
  src={image}
  alt={imageAlt}
  widths={[400, 800, 1200]}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
  loading={loading}
  decoding="async"
  fetchpriority={loading === 'eager' ? 'high' : 'auto'}
  class:list={[
    'w-full h-full object-cover',
    positionMap[imagePosition]
  ]}
/>
```

### 1.2 Responsive Breakpoint Analysis

| Viewport | Layout | Image Display Width | Optimal Source |
|----------|--------|---------------------|----------------|
| 0-640px (mobile) | Stacked, image 100vw | 375-640px | 400w srcset |
| 641-1023px (tablet) | Stacked, image 100vw | 641-1023px | 800w srcset |
| 1024px+ (desktop) | 2-column, image ~50vw | 512-600px | 800w srcset |

**sizes Attribute Calculation**:

```text
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
```

- Mobile (max-width: 640px): Full viewport width
- Tablet (max-width: 1024px): Half viewport (stacked but constrained container)
- Desktop: Fixed 600px max (2-column layout)

### 1.3 Format Selection Strategy

Astro Image automatically negotiates:
1. **AVIF** - 50% smaller than WebP (Chrome 85+, Firefox 93+)
2. **WebP** - 30% smaller than JPEG (universal modern browser support)
3. **JPEG** - Fallback for older browsers

**Build Output** (per image):

```text
/adventures/summersville-lake/hero.avif   → 45KB (AVIF 1200w)
/adventures/summersville-lake/hero.webp   → 72KB (WebP 1200w)
/adventures/summersville-lake/hero.jpg    → 95KB (JPEG 1200w - fallback)
```

### 1.4 Above-Fold Strategy

```astro
<!-- Hero image is LCP - load immediately -->
<Image
  src={image}
  loading="eager"           <!-- No lazy loading above fold -->
  decoding="async"          <!-- Non-blocking decode -->
  fetchpriority="high"      <!-- Hint to browser: prioritize this -->
/>
```

**Why `decoding="async"`**: Prevents image decode from blocking main thread. Safe because hero has aspect ratio container preventing CLS.

### 1.5 Aspect Ratio Enforcement (CLS Prevention)

```astro
<!-- Container with intrinsic aspect ratio -->
<div class="aspect-[4/3] md:aspect-[16/9] lg:aspect-[3/2] relative overflow-hidden rounded-sm">
  <Image
    src={image}
    class="absolute inset-0 w-full h-full object-cover"
    width={1200}
    height={800}
  />
</div>
```

**CLS Budget**: Each adventure image MUST have consistent aspect ratio in Content Collections schema.

Recommended aspect ratios:
- Landscape destinations (lakes, WMAs): 3:2 or 16:9
- Trail/river shots: 4:3

---

## 2. Critical Rendering Path

### 2.1 Critical CSS Budget

**Target**: < 14KB critical CSS for first paint (TCP slow start window)

| Category | Estimated Size | Priority |
|----------|----------------|----------|
| Hero layout (grid, flex) | 1.2KB | Critical |
| Typography (font-display, sizes) | 0.8KB | Critical |
| Colors (brand-brown, sign-green, brand-cream) | 0.4KB | Critical |
| Badge styles | 0.6KB | Critical |
| Camo pattern (CSS) | 0.3KB | Critical |
| Animations (gentle-reveal) | 0.2KB | Defer |
| **Total Critical** | **3.3KB** | - |

### 2.2 Inline Critical Styles

For optimal first paint, inline hero-specific critical CSS in the component:

```astro
---
// AdventureHero.astro
---

<style>
  /* Critical hero styles - inlined for first paint */
  .adventure-hero {
    position: relative;
    overflow: hidden;
    background-color: #3E2723; /* brand-brown fallback */
  }

  .adventure-hero__content {
    display: grid;
    gap: 2rem;
    padding: 3rem 1rem;
  }

  @media (min-width: 1024px) {
    .adventure-hero__content {
      grid-template-columns: 1fr 1fr;
      padding: 4rem 2rem;
    }
  }

  /* Aspect ratio placeholder - prevents CLS */
  .adventure-hero__image-container {
    aspect-ratio: 4/3;
    position: relative;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .adventure-hero__image-container {
      aspect-ratio: 3/2;
    }
  }
</style>
```

### 2.3 Font Loading Strategy

**Current**: Google Fonts with `display=swap` (in global.css)

```css
@import url('https://fonts.googleapis.com/css2?family=Bitter:wght@400;600;700;800&family=Permanent+Marker&family=Noto+Sans:wght@400;500;600&display=swap');
```

**Optimization Opportunity** - Preload critical fonts in Layout.astro:

```html
<!-- Preload Bitter Bold for h1 -->
<link
  rel="preload"
  href="https://fonts.gstatic.com/s/bitter/v36/rax8HiqOu8IVPmnRc6SY1KXhnF_Y8fbeCL_EXFh2reU.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

**Font Fallback Sizing** (FOUT mitigation):

```css
/* Georgia matches Bitter metrics closely */
@font-face {
  font-family: 'Bitter';
  size-adjust: 105%;           /* Bitter is slightly wider */
  ascent-override: 95%;
  descent-override: 22%;
  line-gap-override: 0%;
  src: local('Georgia');
}
```

### 2.4 Camo SVG Optimization

**Current State**: External SVG at `/patterns/camo-subtle.svg` (658 bytes)

```svg
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
    </filter>
  </defs>
  <rect width="200" height="200" fill="transparent"/>
  <path d="M20,20 Q50,5 80,40 T120,60 T160,30" fill="#2E7D32" opacity="0.4" filter="url(#blur)"/>
  <path d="M10,100 Q40,80 70,120 T110,150 T180,110" fill="#3E2723" opacity="0.4" filter="url(#blur)"/>
  <path d="M120,10 Q150,50 180,20" fill="#5D4037" opacity="0.4" filter="url(#blur)"/>
  <path d="M50,160 Q90,140 130,180 T190,150" fill="#2E7D32" opacity="0.3" filter="url(#blur)"/>
</svg>
```

**Recommendation**: Convert to data URI for single HTTP request:

```css
.adventure-hero__camo {
  background-image: url('data:image/svg+xml,%3Csvg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cfilter id="b"%3E%3CfeGaussianBlur in="SourceGraphic" stdDeviation="2"/%3E%3C/filter%3E%3C/defs%3E%3Cpath d="M20,20 Q50,5 80,40 T120,60 T160,30" fill="%232E7D32" opacity=".4" filter="url(%23b)"/%3E%3Cpath d="M10,100 Q40,80 70,120 T110,150 T180,110" fill="%233E2723" opacity=".4" filter="url(%23b)"/%3E%3Cpath d="M120,10 Q150,50 180,20" fill="%235D4037" opacity=".4" filter="url(%23b)"/%3E%3Cpath d="M50,160 Q90,140 130,180 T190,150" fill="%232E7D32" opacity=".3" filter="url(%23b)"/%3E%3C/svg%3E');
  background-size: 200px 200px;
  background-repeat: repeat;
}
```

**SVGO Optimization** (reduces 658B → ~520B):
- Remove XML declaration
- Shorten filter ID (`blur` → `b`)
- Remove redundant rect element
- Minify path coordinates

**Alternative**: CSS-only organic pattern (no external file):

```css
.adventure-hero__camo-css {
  background:
    radial-gradient(ellipse 80px 40px at 20% 20%, rgba(46,125,50,0.4) 0%, transparent 70%),
    radial-gradient(ellipse 100px 50px at 70% 60%, rgba(62,39,35,0.4) 0%, transparent 70%),
    radial-gradient(ellipse 60px 30px at 40% 80%, rgba(46,125,50,0.3) 0%, transparent 70%);
  filter: blur(2px);
}
```

**Trade-off Analysis**:

| Approach | Size | HTTP Requests | Render Cost | Authenticity |
|----------|------|---------------|-------------|--------------|
| External SVG | 658B | 1 | Medium (filter) | High |
| Data URI SVG | 520B | 0 | Medium (filter) | High |
| CSS Gradients | 0.2KB (CSS) | 0 | Low | Medium |

**Recommendation**: Data URI SVG. Best balance of authenticity and performance.

---

## 3. Layout Shift Prevention

### 3.1 Image Container Pre-allocation

```astro
<!-- Fixed aspect ratio container -->
<div class="relative aspect-[4/3] md:aspect-[3/2] bg-brand-brown/10 rounded-sm overflow-hidden">
  <!-- Skeleton placeholder during load -->
  <div class="absolute inset-0 bg-gradient-to-br from-brand-brown/5 to-brand-brown/20 animate-pulse" />

  <!-- Actual image (replaces skeleton on load) -->
  <Image
    src={image}
    alt={imageAlt}
    class="absolute inset-0 w-full h-full object-cover"
    loading="eager"
    decoding="async"
    fetchpriority="high"
  />
</div>
```

### 3.2 Badge Container Pre-allocation

Badges have variable content but fixed container:

```astro
<!-- Pre-allocated badge container with min-height -->
<div class="flex flex-wrap gap-2 min-h-[2rem] items-center">
  <span class="inline-block px-3 py-1 text-sm font-bold rounded-sm bg-sign-green text-white">
    {difficulty}
  </span>
  <span class="inline-block px-3 py-1 text-sm font-bold rounded-sm bg-brand-cream text-brand-brown">
    {season}
  </span>
  {driveTime && (
    <span class="inline-block px-3 py-1 text-sm font-bold rounded-sm bg-brand-orange text-white">
      {driveTime}
    </span>
  )}
</div>
```

### 3.3 Font Fallback Sizing

| Font | Fallback | Adjustment |
|------|----------|------------|
| Bitter (display) | Georgia | size-adjust: 105% |
| Noto Sans (body) | system-ui | size-adjust: 100% |
| Permanent Marker (hand) | cursive | size-adjust: 90% |

```css
/* Font metric overrides to prevent FOUT layout shift */
.font-display {
  font-family: 'Bitter', Georgia, serif;
  font-size-adjust: from-font; /* Modern browsers */
}
```

### 3.4 Skeleton State Architecture

For cached-but-not-yet-painted scenarios:

```astro
<section class="adventure-hero bg-brand-brown">
  <!-- Text skeleton -->
  <div class="space-y-4">
    <div class="h-8 w-3/4 bg-brand-brown-faded/30 rounded animate-pulse" />
    <div class="h-12 w-full bg-brand-brown-faded/30 rounded animate-pulse" />
    <div class="h-6 w-2/3 bg-brand-brown-faded/30 rounded animate-pulse" />
  </div>

  <!-- Image skeleton -->
  <div class="aspect-[3/2] bg-brand-brown-faded/20 rounded-sm animate-pulse" />
</section>
```

**Note**: Skeleton only needed for client-side navigation (View Transitions). Initial page load has content immediately from Astro SSG.

---

## 4. JavaScript Budget

### 4.1 Zero JS Strategy

`AdventureHero.astro` is a static Astro component. **No JavaScript required.**

| Feature | Implementation | JS Required |
|---------|----------------|-------------|
| Layout | CSS Grid/Flexbox | No |
| Responsive images | `<picture>` via Astro Image | No |
| Badges | Static HTML | No |
| Camo overlay | CSS background | No |
| Reduced motion | CSS `@media` query | No |
| Schema.org | Server-rendered JSON-LD | No |

### 4.2 Image Error Handling

**Option A: CSS-only fallback** (Recommended)

```css
/* Hide broken image icon, show fallback background */
.adventure-hero__image {
  background: linear-gradient(135deg, var(--color-brand-mud) 0%, var(--color-brand-brown) 100%);
}

.adventure-hero__image img {
  object-fit: cover;
}

/* Broken image styling */
.adventure-hero__image img:not([src]),
.adventure-hero__image img[src=""] {
  visibility: hidden;
}
```

**Option B: JavaScript fallback** (More robust but adds JS)

```astro
<Image
  src={image}
  alt={imageAlt}
  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
/>
<div class="hidden absolute inset-0 bg-brand-brown items-center justify-center">
  <span class="text-brand-cream/60 text-sm">Image unavailable</span>
</div>
```

**Recommendation**: Option A (CSS-only). Broken images are rare with build-time optimization.

### 4.3 Schema.org Injection

**Strategy**: Build-time injection (no runtime JS)

```astro
---
// Build-time schema generation
const schema = {
  "@context": "https://schema.org",
  "@type": schemaType || "Place",
  "name": title,
  "description": description,
  ...(coordinates && {
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": coordinates.lat,
      "longitude": coordinates.lng
    }
  })
};
---

<!-- Injected at build time -->
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

---

## 5. Caching Strategy

### 5.1 Static Asset Fingerprinting

Astro automatically fingerprints built assets:

```text
/_astro/AdventureHero.abc123.css   → Immutable
/_astro/hero-image.def456.webp     → Immutable
```

**Cloudflare Headers** (already configured in `public/_headers`):

```text
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

### 5.2 Hero Image CDN Strategy

Adventure images in `/public/adventures/`:

```text
/adventures/summersville-lake/hero.jpg
/adventures/elk-river-wma/hero.jpg
```

**Recommended Headers**:

```text
/adventures/*
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800
```

- `max-age=86400`: Fresh for 24 hours
- `stale-while-revalidate=604800`: Serve stale for 7 days while revalidating

### 5.3 Service Worker Considerations

Current service worker (`public/service-worker.js`) handles `/adventures/` paths with stale-while-revalidate:

```javascript
// Line 226-231 in service-worker.js
const isFirstParty = url.origin === self.location.origin;
const isAdventureAsset = url.pathname.includes('/adventures');

if (isFirstParty && isAdventureAsset) {
  // Stale-while-revalidate pattern
}
```

**Hero Image Offline**:
- First visit: Network fetch, cache response
- Subsequent visits: Serve from cache immediately, background revalidate
- Offline: Serve from cache (may be stale)

**Pre-caching**: Consider adding popular adventure heroes to STATIC_ASSETS for install-time caching:

```javascript
const STATIC_ASSETS = [
  '/adventures/',
  '/adventures/summersville-lake/hero.webp',
  '/adventures/elk-river-wma/hero.webp',
  // Top 5 by traffic
];
```

---

## 6. Measurement Architecture

### 6.1 Development LCP Verification

**Chrome DevTools**:
1. Open DevTools > Performance panel
2. Start recording
3. Hard refresh (Cmd+Shift+R)
4. Stop recording
5. Check "Timings" row for LCP marker

**Web Vitals Extension**:
- Install: Chrome Web Store "Web Vitals"
- Green badge = passing, Red = failing
- Click for breakdown (LCP element highlighted)

### 6.2 Lighthouse CI Integration

Add to CI pipeline (`.github/workflows/lighthouse.yml`):

```yaml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build
      - uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            http://localhost:4321/near/summersville-lake/
            http://localhost:4321/near/elk-river/
          budgetPath: ./.lighthouserc.json
          uploadArtifacts: true
```

**Budget File** (`.lighthouserc.json`):

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "first-input-delay": ["error", {"maxNumericValue": 100}]
      }
    }
  }
}
```

### 6.3 Real User Monitoring (RUM) Hooks

For production monitoring, add web-vitals reporting:

```astro
<!-- In Layout.astro, after SW registration -->
<script>
  import { onLCP, onCLS, onFID } from 'web-vitals';

  function sendToAnalytics(metric) {
    // Send to analytics endpoint (could be Cloudflare Analytics, etc.)
    console.log('[WVWO Vitals]', metric.name, metric.value);
  }

  onLCP(sendToAnalytics);
  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
</script>
```

**Note**: This adds ~1.5KB gzipped JS. Only enable in production if actively monitoring.

---

## 7. Byte Budgets

### 7.1 Component Budget

| Asset | Budget | Actual (Est.) | Status |
|-------|--------|---------------|--------|
| Hero HTML | 2KB | 1.8KB | Pass |
| Critical CSS (inlined) | 4KB | 3.3KB | Pass |
| Camo SVG (data URI) | 1KB | 0.52KB | Pass |
| Hero Image (AVIF, 1200w) | 80KB | 45KB | Pass |
| Hero Image (WebP, 800w, mobile) | 40KB | 28KB | Pass |
| Schema.org JSON-LD | 1KB | 0.6KB | Pass |
| **Total First Paint** | **128KB** | **~79KB** | **Pass** |

### 7.2 Loading Sequence

```text
T+0ms    HTML arrives (hero markup inline)
T+10ms   Critical CSS parsed (inlined in <style>)
T+15ms   Camo data URI renders (no network)
T+20ms   Image fetch begins (fetchpriority=high)
T+50ms   Font swap begins (display=swap)
T+200ms  Hero painted with fallback font
T+800ms  Hero image decoded and painted (LCP)
T+1000ms Web fonts loaded and swapped
```

**Target LCP**: < 2500ms on 4G (50Mbps, 150ms RTT)

---

## 8. Implementation Checklist

### Pre-Implementation

- [ ] Verify Astro Image integration in `astro.config.mjs`
- [ ] Create test adventure images at 1200px width minimum
- [ ] Define aspect ratio in Content Collections schema

### Implementation

- [ ] Create `AdventureHero.astro` with responsive srcset
- [ ] Inline critical CSS in component `<style>` block
- [ ] Add camo pattern as data URI
- [ ] Implement aspect-ratio containers
- [ ] Add Schema.org JSON-LD generation
- [ ] Add `aria-labelledby` and accessibility attributes

### Verification

- [ ] Run Lighthouse on sample adventure page (target: 90+ performance)
- [ ] Verify LCP < 2.5s on throttled 4G
- [ ] Verify CLS < 0.1 (check with 3G throttling + cache disabled)
- [ ] Test with `prefers-reduced-motion: reduce`
- [ ] Validate Schema.org with Google Rich Results Test

### CI/CD

- [ ] Add Lighthouse CI workflow
- [ ] Set performance budget assertions
- [ ] Add to PR checks

---

## 9. Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Large hero images from content authors | High | LCP regression | Enforce 1200px max in Content Collections, build-time validation |
| Missing image alt text | Medium | Accessibility violation | Required field in schema, build error on missing |
| Font blocking render | Low | FOUT/FOIT | Already using display=swap, add font-display in CSS |
| Camo filter performance on mobile | Low | Jank | Filter already has minimal stdDeviation, test on low-end devices |

---

## 10. References

- [Astro Image Documentation](https://docs.astro.build/en/guides/images/)
- [Web Vitals Optimization](https://web.dev/vitals/)
- [WVWO Cloudflare Headers](../../wv-wild-web/public/_headers)
- [WVWO Service Worker](../../wv-wild-web/public/service-worker.js)
- [SPEC-09 Specification](./spec.md)
- [WVWO Frontend Aesthetics](../../../../CLAUDE.md#wvwo-frontend-aesthetics)

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-26 | Initial performance architecture |
