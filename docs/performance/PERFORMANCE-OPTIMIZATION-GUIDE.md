# WMA Performance Optimization Guide

**SPEC-12 Implementation: T-029 through T-033**

## Performance Targets

- **Lighthouse Performance**: ≥95/100
- **Load Time (3G)**: <2 seconds
- **Page Weight**: <500KB total
- **Core Web Vitals**:
  - LCP (Largest Contentful Paint): <2.5s
  - FID (First Input Delay): <100ms
  - CLS (Cumulative Layout Shift): <0.1

## WMA Pages Optimized

1. `/near/elk-river`
2. `/near/burnsville-lake`
3. `/near/summersville-lake`
4. `/near/holly-river`
5. `/near/cranberry`

## Optimization Tasks

### T-029: Image Optimization ✅

**Goal**: Hero images <500KB, WebP format, responsive srcsets

**Implementation**:
```bash
# Run image optimizer
cd wv-wild-web
npm run optimize-images

# Or manually:
node scripts/performance/image-optimizer.mjs
```

**Output**:
- Generates 400w, 800w, 1200w versions of each hero image
- Converts to WebP format at 85% quality
- Compresses to <500KB per image
- Saves to `public/images/wma/optimized/{wma-name}/`

**Usage in .astro files**:
```astro
<!-- Replace standard img tags with optimized picture elements -->
<picture>
  <source
    type="image/webp"
    srcset="
      /images/wma/optimized/elk-river/elk-river-hero-400w.webp 400w,
      /images/wma/optimized/elk-river/elk-river-hero-800w.webp 800w,
      /images/wma/optimized/elk-river/elk-river-hero-1200w.webp 1200w
    "
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  />
  <img
    src="/images/wma/optimized/elk-river/elk-river-hero-800w.webp"
    alt="Elk River Wildlife Management Area - 20,000 acres of public hunting land in Braxton County, West Virginia"
    loading="eager"
    width="1200"
    height="675"
    class="w-full h-auto"
  />
</picture>

<!-- Below-fold images should use lazy loading -->
<img
  src="/images/camping-facilities.webp"
  alt="Camping facilities at Elk River WMA"
  loading="lazy"
  width="800"
  height="600"
/>
```

**Verification**:
- Check Network tab: Images should be WebP format
- Verify size: Each image <500KB
- Test on 3G throttling: Images load quickly

---

### T-030: CSS Optimization ✅

**Goal**: Extract critical CSS, inline in `<head>`, defer full CSS

**Implementation**:
```bash
# Generate critical CSS
node scripts/performance/critical-css-extractor.mjs
```

**Output**:
- Creates `src/styles/critical/{page}-critical.css` for each WMA page
- Generates `CriticalCSS.astro` component
- Target: <5KB inline CSS per page

**Usage in Layout.astro**:
```astro
---
import CriticalCSS from '../components/CriticalCSS.astro';

const { page } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <!-- ... meta tags ... -->

  <!-- Inline critical CSS (above-fold only) -->
  <CriticalCSS page={page} />

  <!-- Defer full CSS (non-blocking) -->
  <link
    rel="preload"
    href="/styles/main.css"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'"
  />
  <noscript>
    <link rel="stylesheet" href="/styles/main.css" />
  </noscript>
</head>
```

**WMA Page Usage**:
```astro
---
// elk-river.astro
import Layout from '../../layouts/Layout.astro';
---

<Layout page="elk-river" title="Elk River WMA">
  <!-- Page content -->
</Layout>
```

**Tailwind Tree-Shaking**:
- Verify in `tailwind.config.js`:
  ```js
  module.exports = {
    content: [
      './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
    ],
    // Purge unused styles
    safelist: [] // Only add if specific classes are dynamically generated
  };
  ```
- Expected result: 3MB → ~15KB after build

**Verification**:
- Run bundle analyzer: `node tests/performance/bundle-analyzer.mjs`
- Check CSS size: Should be <15KB
- Lighthouse audit: "Eliminate render-blocking resources" should pass

---

### T-031: Font Optimization ✅

**Goal**: Subset WVWO fonts, preload critical fonts, target 75KB total

**Implementation**:
```bash
# Generate font optimization strategy
node scripts/performance/font-optimizer.mjs
```

**Output**:
- Creates `FontPreload.astro` component
- Optimizes Bitter (display), Noto Sans (body), Permanent Marker (accents)
- Implements preload for critical fonts
- Uses `font-display: swap` to prevent FOIT

**WVWO Brand Fonts**:
1. **Bitter** (serif): Display headings, weights 700+900 - PRELOAD ✅
2. **Noto Sans** (sans-serif): Body text, weights 400+700 - PRELOAD ✅
3. **Permanent Marker** (cursive): Handwritten accents, weight 400 - ASYNC LOAD

**Usage in Layout.astro**:
```astro
---
import FontPreload from '../components/FontPreload.astro';
---

<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Font preloading and optimization -->
  <FontPreload />

  <!-- Rest of head content -->
</head>
```

**CSS Classes**:
```css
/* Auto-generated in FontPreload.astro */
.font-display { font-family: 'Bitter', Georgia, serif; }
.font-body    { font-family: 'Noto Sans', Arial, sans-serif; }
.font-hand    { font-family: 'Permanent Marker', 'Comic Sans MS', cursive; }
```

**Verification**:
- Network tab: Fonts load in priority order (Bitter → Noto Sans → Permanent Marker)
- Total font size: Should be <75KB
- Lighthouse: No "Ensure text remains visible during webfont load" warnings
- Test `font-display: swap` in DevTools

---

### T-032: Lighthouse Audits ✅

**Goal**: Run comprehensive audits, achieve ≥95/100 Performance

**Prerequisites**:
```bash
# 1. Build the project
npm run build

# 2. Start preview server
npm run preview
# Server runs on http://localhost:4321
```

**Implementation**:
```bash
# Run Lighthouse audits on all 5 WMA pages
node tests/performance/lighthouse-audit.mjs
```

**Output**:
- HTML reports saved to `tests/performance/reports/`
- Console summary with scores and Core Web Vitals
- Identifies optimization opportunities

**Reports Generated**:
- `elk-river-lighthouse.html`
- `burnsville-lake-lighthouse.html`
- `summersville-lake-lighthouse.html`
- `holly-river-lighthouse.html`
- `cranberry-lighthouse.html`

**Manual Lighthouse Testing**:
```bash
# Chrome DevTools method:
# 1. Open DevTools (F12)
# 2. Go to "Lighthouse" tab
# 3. Select "Performance" + "Desktop"
# 4. Click "Analyze page load"
```

**Interpreting Results**:
- **Performance ≥95**: ✅ PASS
- **Performance 90-94**: ⚠️ Close, minor optimizations needed
- **Performance <90**: ❌ FAIL, review T-029, T-030, T-031

**Core Web Vitals Targets**:
- **FCP (First Contentful Paint)**: <1.8s
- **LCP (Largest Contentful Paint)**: <2.5s
- **TBT (Total Blocking Time)**: <200ms
- **CLS (Cumulative Layout Shift)**: <0.1
- **SI (Speed Index)**: <3.4s

**Common Issues & Fixes**:

| Issue | Fix |
|-------|-----|
| "Eliminate render-blocking resources" | Use CriticalCSS component (T-030) |
| "Properly size images" | Run image optimizer (T-029) |
| "Serve images in next-gen formats" | Convert to WebP (T-029) |
| "Ensure text remains visible" | Use FontPreload component (T-031) |
| "Reduce unused CSS" | Verify Tailwind purge (T-030) |
| "Defer offscreen images" | Add `loading="lazy"` to below-fold images |

---

### T-033: Bundle Analysis ✅

**Goal**: Validate page weight <500KB, identify optimization opportunities

**Prerequisites**:
```bash
# Build the project first
npm run build
```

**Implementation**:
```bash
# Analyze bundle sizes
node tests/performance/bundle-analyzer.mjs
```

**Output**:
- Per-page breakdown (JS, CSS, HTML, Images, Fonts)
- Tailwind tree-shaking analysis
- Optimization recommendations

**Target Breakdown (per page)**:
- **Total**: <500KB
  - JS: <150KB
  - CSS: <15KB (Tailwind tree-shaking)
  - HTML: <50KB
  - Images: <500KB (hero images)
  - Fonts: <75KB (total across all pages)

**Reading the Report**:
```
📦 Analyzing: near/elk-river
   Total: 387KB ✅ (target: 500KB)
   Breakdown:
     JS:     142KB (3 files) ✅
     CSS:    12KB (1 file) ✅
     HTML:   38KB (1 file) ✅
     Images: 485KB (1 file) ✅
     Fonts:  22KB (3 files)
```

**Interpreting Status**:
- ✅ **Green**: Under target, no action needed
- ⚠️ **Yellow**: Over target, optimization recommended

**Common Optimization Actions**:
1. **JS over 150KB**:
   - Code split large components
   - Lazy load below-fold features
   - Remove unused dependencies
   - Use dynamic imports

2. **CSS over 15KB**:
   - Verify Tailwind purge in `tailwind.config.js`
   - Remove unused component styles
   - Check for duplicate CSS

3. **Images over 500KB**:
   - Re-run image optimizer (T-029)
   - Increase WebP compression
   - Crop images to 16:9 aspect ratio
   - Consider using AVIF format

**Tailwind Tree-Shaking Verification**:
```
🌲 Tailwind Tree-Shaking Analysis:
   Main CSS bundle: 12.4KB
   Original Tailwind: ~3MB
   Target after tree-shaking: ~15KB
   Reduction: 99.6%
   ✅ Tree-shaking effective! Under 15KB target
```

---

## Complete Workflow

### 1. Initial Setup
```bash
cd wv-wild-web

# Install dependencies if needed
npm install
```

### 2. Run Optimizations (Sequential)
```bash
# T-029: Optimize images
node scripts/performance/image-optimizer.mjs

# T-030: Extract critical CSS
node scripts/performance/critical-css-extractor.mjs

# T-031: Optimize fonts
node scripts/performance/font-optimizer.mjs
```

### 3. Update WMA Pages
```astro
---
// Example: elk-river.astro
import Layout from '../../layouts/Layout.astro';
// ... other imports
---

<Layout page="elk-river" title="Elk River WMA">
  <!-- Hero with optimized images -->
  <div class="hero">
    <picture>
      <source
        type="image/webp"
        srcset="
          /images/wma/optimized/elk-river/elk-river-hero-400w.webp 400w,
          /images/wma/optimized/elk-river/elk-river-hero-800w.webp 800w,
          /images/wma/optimized/elk-river/elk-river-hero-1200w.webp 1200w
        "
        sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
      />
      <img
        src="/images/wma/optimized/elk-river/elk-river-hero-800w.webp"
        alt="Elk River Wildlife Management Area hunting and fishing destination"
        loading="eager"
        width="1200"
        height="675"
      />
    </picture>

    <h1 class="font-display font-black text-5xl">
      Elk River Wildlife Management Area
    </h1>
  </div>

  <!-- Below-fold images with lazy loading -->
  <img
    src="/images/camping.webp"
    alt="Camping facilities"
    loading="lazy"
    width="800"
    height="600"
  />
</Layout>
```

### 4. Update Layout.astro
```astro
---
import CriticalCSS from '../components/CriticalCSS.astro';
import FontPreload from '../components/FontPreload.astro';

interface Props {
  page: string;
  title: string;
}

const { page, title } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} | WV Wild Outdoors</title>

  <!-- Font optimization (T-031) -->
  <FontPreload />

  <!-- Critical CSS inline (T-030) -->
  <CriticalCSS page={page} />
</head>
<body>
  <slot />
</body>
</html>
```

### 5. Build & Test
```bash
# Build production bundle
npm run build

# Start preview server
npm run preview
```

### 6. Run Audits (Parallel - in separate terminals)
```bash
# Terminal 1: Bundle analysis
node tests/performance/bundle-analyzer.mjs

# Terminal 2: Lighthouse audits (requires preview server running)
node tests/performance/lighthouse-audit.mjs
```

---

## Verification Checklist

### Pre-Deployment
- [ ] All 5 WMA pages have optimized images (WebP, <500KB)
- [ ] CriticalCSS component imported in Layout.astro
- [ ] FontPreload component imported in Layout.astro
- [ ] Tailwind CSS purge is active (check tailwind.config.js)
- [ ] All hero images have explicit width/height attributes
- [ ] Below-fold images have `loading="lazy"`
- [ ] Alt text is ~125 characters for accessibility

### Post-Build
- [ ] Bundle analysis shows total page weight <500KB
- [ ] CSS bundle is <15KB (Tailwind tree-shaking effective)
- [ ] Font files total <75KB
- [ ] No console errors in browser DevTools

### Lighthouse Audit
- [ ] Performance score ≥95/100
- [ ] LCP <2.5s
- [ ] FCP <1.8s
- [ ] CLS <0.1
- [ ] No render-blocking resources
- [ ] All images properly sized

### 3G Network Test
- [ ] Page loads in <2 seconds on 3G throttling
- [ ] Hero image appears quickly (eager loading)
- [ ] Below-fold images lazy load correctly
- [ ] No layout shift during font loading

---

## Troubleshooting

### Issue: Lighthouse Score Still Low After Optimization

**Possible Causes**:
1. Dev server instead of production build
   - **Fix**: Use `npm run preview` not `npm run dev`

2. Large third-party scripts
   - **Fix**: Defer non-critical scripts with `<script defer>`

3. Unoptimized images still in use
   - **Fix**: Verify `<picture>` elements are using `/optimized/` paths

### Issue: Images Not Displaying

**Possible Causes**:
1. Image optimizer hasn't run
   - **Fix**: `node scripts/performance/image-optimizer.mjs`

2. Wrong path in `<picture>` srcset
   - **Fix**: Verify path matches `public/images/wma/optimized/{wma-name}/`

3. Missing source images
   - **Fix**: Place hero images in `public/images/wma/` before optimizing

### Issue: CSS Bundle Still Large (>15KB)

**Possible Causes**:
1. Tailwind purge not configured
   - **Fix**: Check `tailwind.config.js` content paths

2. Unused components imported
   - **Fix**: Remove unused imports from .astro files

3. Duplicate styles
   - **Fix**: Use shared components, avoid inline styles

### Issue: Fonts Not Preloading

**Possible Causes**:
1. FontPreload component not imported
   - **Fix**: Add `<FontPreload />` to Layout.astro `<head>`

2. Wrong font URLs
   - **Fix**: Verify Google Fonts URLs in font-optimizer.mjs

---

## Performance Monitoring

### Continuous Monitoring

Set up automated Lighthouse audits in CI/CD:
```yaml
# .github/workflows/performance.yml
name: Performance Audit

on:
  pull_request:
    paths:
      - 'wv-wild-web/src/pages/near/**'

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run preview &
      - run: node tests/performance/lighthouse-audit.mjs
      - name: Upload Reports
        uses: actions/upload-artifact@v3
        with:
          name: lighthouse-reports
          path: tests/performance/reports/
```

### Real User Monitoring (RUM)

Consider adding Web Vitals tracking:
```astro
---
// src/components/WebVitals.astro
---

<script>
  import { getCLS, getFID, getLCP } from 'web-vitals';

  function sendToAnalytics(metric) {
    // Send to your analytics service
    console.log(metric.name, metric.value);
  }

  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getLCP(sendToAnalytics);
</script>
```

---

## Success Criteria Summary

**All 5 WMA pages must achieve**:
- ✅ Lighthouse Performance: ≥95/100
- ✅ 3G Load Time: <2 seconds
- ✅ Page Weight: <500KB
- ✅ LCP: <2.5s
- ✅ FID: <100ms
- ✅ CLS: <0.1

**Component Targets**:
- ✅ Images: WebP format, <500KB each, responsive srcsets
- ✅ CSS: <15KB (Tailwind tree-shaking from 3MB)
- ✅ Fonts: <75KB total (Bitter, Noto Sans, Permanent Marker)
- ✅ Critical CSS: <5KB inline per page

---

## Additional Resources

- [Lighthouse Scoring Guide](https://web.dev/performance-scoring/)
- [Core Web Vitals](https://web.dev/vitals/)
- [WebP Image Format](https://developers.google.com/speed/webp)
- [Font-display Property](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)
- [Tailwind CSS Optimization](https://tailwindcss.com/docs/optimizing-for-production)

---

**Document Status**: Complete ✅
**Last Updated**: 2025-12-27
**Owner**: Performance Optimization Team
**Related Tasks**: T-029, T-030, T-031, T-032, T-033
