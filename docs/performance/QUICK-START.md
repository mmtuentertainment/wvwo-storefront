# Performance Optimization Quick Start

**Goal**: Achieve Lighthouse 95+/100 on all 5 WMA pages in under 10 minutes

## Prerequisites

```bash
cd wv-wild-web
npm install
```

## Step 1: Run All Optimizations (5 minutes)

```bash
# Run all optimization scripts
npm run perf:all
```

This will:

- ✅ Convert images to WebP (<500KB each)
- ✅ Extract critical CSS (<5KB inline)
- ✅ Optimize fonts (150KB → 75KB)

## Step 2: Update Components (2 minutes)

**Add to Layout.astro `<head>`**:

```astro
---
import CriticalCSS from '../components/CriticalCSS.astro';
import FontPreload from '../components/FontPreload.astro';

const { page } = Astro.props;
---

<head>
  <FontPreload />
  <CriticalCSS page={page} />
  <!-- ... rest of head ... -->
</head>
```

**Update WMA pages to pass page prop**:

```astro
<Layout page="elk-river" title="Elk River WMA">
```

## Step 3: Build & Test (3 minutes)

```bash
# Build production bundle
npm run build

# Analyze bundle
npm run perf:bundle

# Start preview server
npm run preview

# In another terminal: Run Lighthouse audits
npm run perf:lighthouse
```

## Expected Results

**Bundle Analysis**:

- Total page weight: <500KB ✅
- CSS: <15KB ✅
- Fonts: <75KB ✅

**Lighthouse Scores**:

- Performance: ≥95/100 ✅
- LCP: <2.5s ✅
- CLS: <0.1 ✅

## Troubleshooting

**Images not found?**

- Place hero images in `public/images/wma/`
- Re-run: `npm run perf:images`

**CSS still large?**

- Check Tailwind purge in `tailwind.config.js`
- Verify content paths include all .astro files

**Fonts not loading?**

- Confirm `<FontPreload />` is in Layout.astro
- Check browser Network tab for font requests

## Success Criteria

All 5 WMA pages achieve:

- ✅ Lighthouse Performance: ≥95/100
- ✅ Load time on 3G: <2s
- ✅ Page weight: <500KB
- ✅ LCP: <2.5s, CLS: <0.1

---

**Need detailed help?** See [PERFORMANCE-OPTIMIZATION-GUIDE.md](./PERFORMANCE-OPTIMIZATION-GUIDE.md)
