# Performance Testing Suite

Automated performance testing for WVWO WMA pages (SPEC-12: T-029 through T-033)

## Available Tests

### 1. Lighthouse Audit (`lighthouse-audit.mjs`)

**Purpose**: Run comprehensive Lighthouse audits on all 5 WMA pages

**Prerequisites**:
```bash
# Must have preview server running
npm run build
npm run preview  # Server on http://localhost:4321
```

**Run**:
```bash
node tests/performance/lighthouse-audit.mjs
```

**Output**:
- HTML reports in `tests/performance/reports/`
- Console summary with scores and Core Web Vitals
- Pass/fail against SPEC-12 targets

**Targets**:
- Performance: ≥95/100
- LCP: <2500ms
- FID: <100ms
- CLS: <0.1

---

### 2. Bundle Analyzer (`bundle-analyzer.mjs`)

**Purpose**: Analyze page bundle sizes and identify optimization opportunities

**Prerequisites**:
```bash
npm run build  # Must build first
```

**Run**:
```bash
node tests/performance/bundle-analyzer.mjs
```

**Output**:
- Per-page breakdown (JS, CSS, HTML, Images, Fonts)
- Tailwind tree-shaking analysis (3MB → 15KB verification)
- Optimization recommendations

**Targets**:
- Total page weight: <500KB
- CSS: <15KB
- JS: <150KB
- Images: <500KB

---

## Running All Tests

**Complete Performance Audit Workflow**:

```bash
# 1. Run optimizations
cd wv-wild-web
npm run perf:all

# 2. Build production bundle
npm run build

# 3. Analyze bundle (no server needed)
npm run perf:bundle

# 4. Start preview server
npm run preview &

# 5. Run Lighthouse audits
npm run perf:lighthouse

# 6. Kill preview server
pkill -f "astro preview"
```

---

## CI/CD Integration

**GitHub Actions Example**:

```yaml
name: Performance Tests

on:
  pull_request:
    paths:
      - 'wv-wild-web/src/pages/near/**'

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          cd wv-wild-web
          npm ci

      - name: Build
        run: |
          cd wv-wild-web
          npm run build

      - name: Bundle Analysis
        run: node tests/performance/bundle-analyzer.mjs

      - name: Start Preview Server
        run: |
          cd wv-wild-web
          npm run preview &
          sleep 5  # Wait for server

      - name: Lighthouse Audits
        run: node tests/performance/lighthouse-audit.mjs

      - name: Upload Reports
        uses: actions/upload-artifact@v3
        with:
          name: performance-reports
          path: tests/performance/reports/
```

---

## Test Configuration

**Lighthouse Options** (in `lighthouse-audit.mjs`):
```javascript
{
  formFactor: 'desktop',
  throttling: {
    rttMs: 40,
    throughputKbps: 10 * 1024,
    cpuSlowdownMultiplier: 1
  }
}
```

**3G Mobile Throttling**:
```javascript
{
  formFactor: 'mobile',
  throttling: {
    rttMs: 150,
    throughputKbps: 1.6 * 1024,  // 3G speed
    cpuSlowdownMultiplier: 4
  }
}
```

---

## Interpreting Results

### Lighthouse Scores

**Performance Score Breakdown**:
- 90-100: ✅ Excellent
- 50-89: ⚠️ Needs improvement
- 0-49: ❌ Poor

**Core Web Vitals**:
- **LCP <2.5s**: Good - ✅
- **LCP 2.5-4s**: Needs improvement - ⚠️
- **LCP >4s**: Poor - ❌

- **FID <100ms**: Good - ✅
- **FID 100-300ms**: Needs improvement - ⚠️
- **FID >300ms**: Poor - ❌

- **CLS <0.1**: Good - ✅
- **CLS 0.1-0.25**: Needs improvement - ⚠️
- **CLS >0.25**: Poor - ❌

### Bundle Analysis

**Status Indicators**:
- ✅ Green: Under target, no action needed
- ⚠️ Yellow: Over target, optimization recommended
- ❌ Red: Significantly over, optimization required

**Common Issues**:
1. **JS >150KB**: Code splitting needed
2. **CSS >15KB**: Tailwind purge not working
3. **Images >500KB**: Re-run image optimizer
4. **Fonts >75KB**: Review font subsetting

---

## Troubleshooting

### "Connection refused" Error

**Cause**: Preview server not running

**Fix**:
```bash
cd wv-wild-web
npm run preview
```

### "dist directory not found"

**Cause**: Project not built

**Fix**:
```bash
cd wv-wild-web
npm run build
```

### Scores Lower Than Expected

**Check**:
1. Using production build? (`npm run build` + `preview`, not `dev`)
2. Optimizations applied? (run `npm run perf:all`)
3. Components updated? (CriticalCSS, FontPreload in Layout)
4. Images optimized? (check `public/images/wma/optimized/`)

---

## Expected Results (SPEC-12 Compliance)

**All 5 WMA Pages**:
- ✅ Lighthouse Performance: ≥95/100
- ✅ LCP: <2.5s
- ✅ FID: <100ms
- ✅ CLS: <0.1
- ✅ Total page weight: <500KB
- ✅ CSS bundle: <15KB
- ✅ Font total: <75KB

**Success Rate**: 5/5 pages meeting all targets = ✅ PASS
