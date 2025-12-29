# Visual Regression Testing for elk-river.astro

## Overview

This test suite validates that the refactored elk-river.astro (componentized version) visually matches the original inline version.

## Test Structure

### 1. Baseline Capture (Before Refactoring)
Run BEFORE making any changes to elk-river.astro.

```bash
# Capture baseline screenshots
npx playwright test elk-river-visual-regression --grep "Baseline Capture"
```

This creates screenshots in `tests/screenshots/elk-river/baseline/`:
- `elk-river-mobile.png` (375x667)
- `elk-river-tablet.png` (768x1024)
- `elk-river-desktop.png` (1280x720)

### 2. Comparison Capture (After Refactoring)
Run AFTER refactoring elk-river.astro into components.

```bash
# Capture comparison screenshots
npx playwright test elk-river-visual-regression --grep "Comparison Capture"
```

This creates screenshots in `tests/screenshots/elk-river/comparison/`:
- `elk-river-mobile.png`
- `elk-river-tablet.png`
- `elk-river-desktop.png`

### 3. Pixel-by-Pixel Comparison
Automatically compares baseline vs comparison screenshots.

```bash
# Run pixel comparison
npx playwright test elk-river-visual-regression --grep "Pixel-by-Pixel"
```

Creates diff images in `tests/screenshots/elk-river/diff/` if differences detected.

**Pass Criteria**: <0.5% pixel difference (allows for minor anti-aliasing/rendering variations)

### 4. Functional Validation
Validates critical functional requirements:
- All sections render correctly
- Permanent Marker font used for Kim's tips (after refactor)
- Phone links are clickable (`tel:` format)
- External links open in new tab with `rel="noopener noreferrer"`
- Responsive grids work (2 cols mobile → 4 cols desktop)
- WVWO brand colors used correctly
- Only `rounded-sm` corners (no rounded-md/lg/xl)

```bash
# Run functional tests
npx playwright test elk-river-visual-regression --grep "Functional Requirements"
```

### 5. Performance Validation
Validates no performance regression:
- DOM Interactive < 2 seconds
- Cumulative Layout Shift (CLS) < 0.1
- All images have width/height attributes

```bash
# Run performance tests
npx playwright test elk-river-visual-regression --grep "Performance Comparison"
```

### 6. Accessibility Validation
Validates WVWO accessibility standards:
- Proper heading hierarchy (h1 → h2 → h3)
- Form labels accessible
- Sufficient color contrast

```bash
# Run accessibility tests
npx playwright test elk-river-visual-regression --grep "Accessibility"
```

## Complete Workflow

### Step 1: Capture Baseline (DO THIS FIRST)

```bash
# 1. Ensure dev server is running
npm run dev

# 2. In another terminal, capture baseline
npx playwright test elk-river-visual-regression --grep "Baseline Capture"
```

**Verify**: Check that `tests/screenshots/elk-river/baseline/` contains 3 PNG files.

### Step 2: Refactor elk-river.astro

Create the following components (examples):
- `components/adventure/AdventureHero.astro`
- `components/adventure/AdventureQuickStats.astro`
- `components/adventure/AdventureWhatToHunt.astro`
- `components/adventure/AdventureWhatToFish.astro`
- `components/adventure/AdventureGettingThere.astro`
- `components/adventure/AdventureFacilities.astro`
- `components/adventure/AdventureWhatToBring.astro`
- `components/adventure/AdventureCTA.astro`

Replace inline sections in elk-river.astro with component imports.

### Step 3: Capture Comparison Screenshots

```bash
# Capture comparison (after refactoring)
npx playwright test elk-river-visual-regression --grep "Comparison Capture"
```

**Verify**: Check that `tests/screenshots/elk-river/comparison/` contains 3 PNG files.

### Step 4: Run Full Test Suite

```bash
# Run all tests
npx playwright test elk-river-visual-regression

# OR run specific test groups
npx playwright test elk-river-visual-regression --grep "Pixel-by-Pixel"
npx playwright test elk-river-visual-regression --grep "Functional"
npx playwright test elk-river-visual-regression --grep "Performance"
```

### Step 5: Review Results

Check test output:
- ✅ Pixel comparison <0.5% difference
- ✅ All functional requirements pass
- ✅ No performance regression
- ✅ Accessibility maintained

If pixel differences detected:
1. Check diff images in `tests/screenshots/elk-river/diff/`
2. Verify differences are intentional (or fix)
3. Re-run comparison capture and tests

## Expected Results

### Successful Refactoring
```
✓ Pixel-by-Pixel Comparison
  ✓ should have <0.5% visual difference at mobile (0.02% mismatch)
  ✓ should have <0.5% visual difference at tablet (0.01% mismatch)
  ✓ should have <0.5% visual difference at desktop (0.03% mismatch)

✓ Functional Requirements Validation
  ✓ should render all major sections
  ✓ should use Permanent Marker font for Kim's tips
  ✓ should have clickable phone links
  ✓ should have external links open in new tab
  ✓ should have responsive grids working
  ✓ should use correct WVWO brand colors
  ✓ should only use rounded-sm for corners

✓ Performance Comparison
  ✓ should meet Lighthouse performance thresholds
  ✓ should not have layout shifts (CLS: 0.02)
  ✓ should have all images properly sized
```

### Failed Tests - What to Check

**High pixel difference (>0.5%)**:
- Font rendering differences (different font loaded?)
- Spacing/margin differences
- Missing CSS classes
- Color differences
- Incorrect component structure

**Functional failures**:
- Components not rendering
- Missing attributes (target="_blank", rel="noopener")
- Incorrect CSS classes
- Wrong fonts applied

**Performance regression**:
- Added unnecessary JavaScript
- Images missing dimensions
- New layout shifts introduced
- Slow component rendering

## WVWO Brand Compliance

The test suite validates WVWO brand standards:

### Forbidden (Will Fail Tests)
- ❌ Fonts: Inter, Poppins, DM Sans, etc. (use Bitter, Noto Sans, Permanent Marker)
- ❌ Rounded corners: rounded-md, rounded-lg, rounded-xl (use rounded-sm only)
- ❌ Purple/pink/neon colors

### Required (Must Pass)
- ✅ Brand colors: #3E2723 (brown), #2E7D32 (green), #FFF8E1 (cream), #FF6F00 (orange)
- ✅ Permanent Marker font for Kim's handwritten tips
- ✅ Sharp corners (rounded-sm)
- ✅ Authentic rural WV voice in copy

## Troubleshooting

### "Baseline not found"
Run baseline capture first:
```bash
npx playwright test elk-river-visual-regression --grep "Baseline Capture"
```

### "Comparison not found"
Run comparison capture:
```bash
npx playwright test elk-river-visual-regression --grep "Comparison Capture"
```

### High pixel mismatch
1. Check diff images in `tests/screenshots/elk-river/diff/`
2. Visually inspect differences
3. Fix component or CSS issues
4. Re-capture comparison screenshots
5. Re-run tests

### Dev server not running
```bash
npm run dev
```

Keep dev server running in one terminal, run tests in another.

## File Structure

```
tests/
  e2e/
    elk-river-visual-regression.spec.ts  # Main test file
    README-VISUAL-REGRESSION.md           # This file
  screenshots/
    elk-river/
      baseline/                           # Before refactoring
        elk-river-mobile.png
        elk-river-tablet.png
        elk-river-desktop.png
      comparison/                         # After refactoring
        elk-river-mobile.png
        elk-river-tablet.png
        elk-river-desktop.png
      diff/                               # Difference images (if any)
        elk-river-mobile-diff.png
        elk-river-tablet-diff.png
        elk-river-desktop-diff.png
```

## Next Steps After Passing

1. ✅ All tests pass
2. Document refactoring in SPEC-11 trajectory
3. Commit changes with test results
4. Create PR with before/after screenshots
5. Update component documentation

## Related Tasks

- **T-019**: Visual Regression Testing (this task)
- **SPEC-11**: Adventure Shared Components Bundle
- **PR Review**: Include test results and screenshots in PR description
