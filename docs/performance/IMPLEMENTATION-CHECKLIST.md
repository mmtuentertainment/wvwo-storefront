# Performance Optimization Implementation Checklist

**SPEC-12: T-029 through T-033**

Use this checklist to track implementation progress for all 5 WMA pages.

---

## Pre-Implementation Setup

- [ ] Navigate to project: `cd wv-wild-web`
- [ ] Install dependencies: `npm install`
- [ ] Verify Tailwind config has purge enabled
- [ ] Confirm all WMA pages exist in `src/pages/near/`

---

## T-029: Image Optimization

### Script Execution
- [ ] Run image optimizer: `npm run perf:images`
- [ ] Verify optimized images in `public/images/wma/optimized/`
- [ ] Check each WMA has 3 sizes: 400w, 800w, 1200w
- [ ] Confirm all images are WebP format
- [ ] Verify each image <500KB

### Per-Page Updates

**Elk River** (`/near/elk-river.astro`)
- [ ] Replace `<img>` with `<picture>` element
- [ ] Add responsive srcset (400w, 800w, 1200w)
- [ ] Set `loading="eager"` for hero
- [ ] Set `loading="lazy"` for below-fold images
- [ ] Add width/height attributes
- [ ] Verify alt text ~125 characters

**Burnsville Lake** (`/near/burnsville-lake.astro`)
- [ ] Replace `<img>` with `<picture>` element
- [ ] Add responsive srcset
- [ ] Configure lazy loading
- [ ] Add width/height attributes
- [ ] Verify alt text

**Summersville Lake** (`/near/summersville-lake.astro`)
- [ ] Replace `<img>` with `<picture>` element
- [ ] Add responsive srcset
- [ ] Configure lazy loading
- [ ] Add width/height attributes
- [ ] Verify alt text

**Holly River** (`/near/holly-river.astro`)
- [ ] Replace `<img>` with `<picture>` element
- [ ] Add responsive srcset
- [ ] Configure lazy loading
- [ ] Add width/height attributes
- [ ] Verify alt text

**Cranberry** (`/near/cranberry.astro`)
- [ ] Replace `<img>` with `<picture>` element
- [ ] Add responsive srcset
- [ ] Configure lazy loading
- [ ] Add width/height attributes
- [ ] Verify alt text

---

## T-030: CSS Optimization

### Script Execution
- [ ] Run CSS extractor: `npm run perf:css`
- [ ] Verify `src/styles/critical/` directory created
- [ ] Confirm critical CSS files for all 5 WMAs
- [ ] Verify `CriticalCSS.astro` component created
- [ ] Check each critical CSS file <5KB

### Layout Updates
- [ ] Import `CriticalCSS` component in `Layout.astro`
- [ ] Add `<CriticalCSS page={page} />` to `<head>`
- [ ] Add deferred CSS loading (preload + noscript)
- [ ] Remove old blocking CSS links
- [ ] Add `page` prop to Layout interface

### Per-Page Updates
- [ ] Elk River: Pass `page="elk-river"` prop
- [ ] Burnsville Lake: Pass `page="burnsville-lake"` prop
- [ ] Summersville Lake: Pass `page="summersville-lake"` prop
- [ ] Holly River: Pass `page="holly-river"` prop
- [ ] Cranberry: Pass `page="cranberry"` prop

### Tailwind Verification
- [ ] Check `tailwind.config.js` has correct content paths
- [ ] Verify purge/safelist configuration
- [ ] Build and check CSS size <15KB

---

## T-031: Font Optimization

### Script Execution
- [ ] Run font optimizer: `npm run perf:fonts`
- [ ] Verify `FontPreload.astro` component created
- [ ] Confirm font preloading strategy (Bitter, Noto Sans preload)
- [ ] Verify Permanent Marker async load
- [ ] Check inline fallback styles

### Layout Updates
- [ ] Import `FontPreload` component in `Layout.astro`
- [ ] Add `<FontPreload />` to `<head>` (before CriticalCSS)
- [ ] Remove old Google Fonts links
- [ ] Verify `font-display: swap` in component

### Verification
- [ ] Check Network tab: Fonts load in priority order
- [ ] Verify total font size <75KB
- [ ] Test font-display swap (no FOIT)
- [ ] Confirm fallback fonts render correctly

---

## T-032: Lighthouse Audits

### Build & Preview
- [ ] Build production bundle: `npm run build`
- [ ] Start preview server: `npm run preview`
- [ ] Verify server on http://localhost:4321

### Run Audits
- [ ] Execute Lighthouse script: `npm run perf:lighthouse`
- [ ] Wait for all 5 pages to complete
- [ ] Check `tests/performance/reports/` for HTML reports

### Per-Page Results

**Elk River**
- [ ] Performance score ≥95/100
- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] No render-blocking resources

**Burnsville Lake**
- [ ] Performance score ≥95/100
- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] No render-blocking resources

**Summersville Lake**
- [ ] Performance score ≥95/100
- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] No render-blocking resources

**Holly River**
- [ ] Performance score ≥95/100
- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] No render-blocking resources

**Cranberry**
- [ ] Performance score ≥95/100
- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] No render-blocking resources

### Average Metrics
- [ ] Average performance ≥95
- [ ] Average LCP <2500ms
- [ ] Average CLS <0.1
- [ ] All pages meet targets

---

## T-033: Bundle Analysis

### Run Analysis
- [ ] Ensure project is built: `npm run build`
- [ ] Execute bundle analyzer: `npm run perf:bundle`
- [ ] Review console output

### Per-Page Validation

**Elk River**
- [ ] Total page weight <500KB
- [ ] JS bundle <150KB
- [ ] CSS bundle <15KB
- [ ] HTML size <50KB
- [ ] Images <500KB

**Burnsville Lake**
- [ ] Total page weight <500KB
- [ ] JS bundle <150KB
- [ ] CSS bundle <15KB
- [ ] HTML size <50KB
- [ ] Images <500KB

**Summersville Lake**
- [ ] Total page weight <500KB
- [ ] JS bundle <150KB
- [ ] CSS bundle <15KB
- [ ] HTML size <50KB
- [ ] Images <500KB

**Holly River**
- [ ] Total page weight <500KB
- [ ] JS bundle <150KB
- [ ] CSS bundle <15KB
- [ ] HTML size <50KB
- [ ] Images <500KB

**Cranberry**
- [ ] Total page weight <500KB
- [ ] JS bundle <150KB
- [ ] CSS bundle <15KB
- [ ] HTML size <50KB
- [ ] Images <500KB

### Tailwind Tree-Shaking
- [ ] CSS bundle <15KB (from ~3MB)
- [ ] Reduction >99%
- [ ] No unused utilities in bundle

### Overall Compliance
- [ ] All 5 pages under 500KB
- [ ] Average page weight <400KB
- [ ] No optimization recommendations (all ✅)

---

## Post-Implementation Testing

### Manual Testing
- [ ] Test on desktop Chrome (Lighthouse DevTools)
- [ ] Test on mobile device (3G throttling)
- [ ] Verify images load progressively
- [ ] Confirm no layout shift during font load
- [ ] Check lazy loading works for below-fold images

### Network Tab Verification
- [ ] Fonts load before images
- [ ] Critical CSS inline (not separate request)
- [ ] Full CSS loads deferred
- [ ] Images are WebP format
- [ ] Total requests <50

### Accessibility
- [ ] All images have alt text
- [ ] Alt text 100-150 characters
- [ ] No WCAG contrast issues
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

---

## Final Checklist

### Code Quality
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] All imports resolved
- [ ] No unused components
- [ ] Code formatted consistently

### Documentation
- [ ] Update CHANGELOG if needed
- [ ] Document any custom optimizations
- [ ] Note any WMA-specific tweaks
- [ ] Add performance metrics to docs

### Git & Deploy
- [ ] Commit optimized images
- [ ] Commit component updates
- [ ] Commit performance scripts
- [ ] Create PR with performance report
- [ ] Tag PR with `performance` label
- [ ] Deploy to staging for testing

---

## Success Criteria (SPEC-12)

**ALL 5 WMA pages must achieve**:
- ✅ Lighthouse Performance: ≥95/100
- ✅ Load time on 3G: <2 seconds
- ✅ Page weight: <500KB
- ✅ LCP: <2.5s
- ✅ FID: <100ms
- ✅ CLS: <0.1

**Component Targets**:
- ✅ Images: WebP, <500KB each
- ✅ CSS: <15KB (Tailwind tree-shaking)
- ✅ Fonts: <75KB total
- ✅ Critical CSS: <5KB inline per page

---

**Status**:
- [ ] Not Started
- [ ] In Progress
- [ ] Testing
- [ ] Complete ✅

**Date Completed**: _______________
**Tested By**: _______________
**Deployed**: _______________
