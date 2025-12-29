# SPEC-12: Component Integration Tests

## Overview

This test suite validates that the 4 completed SPEC-12 components work together and integrate with existing SPEC-10/11 components.

## Components Under Test

### SPEC-12 Components (New)
1. **AdventureFeatureSection** - Generic feature grid (191 lines, 14 tests passing)
2. **AdventureCampingList** - Complex facility cards (200 lines, 33 tests passing)
3. **AdventureAmenitiesGrid** - Simple amenities grid (158 lines, 21 tests passing)
4. **AdventureCTA** - Universal call-to-action (174 lines, 21 tests passing)

### SPEC-10/11 Components (Integration)
- AdventureQuickStats
- AdventureGettingThere
- AdventureGearChecklist
- AdventureRelatedShop

## Test Scenarios

### 1. Composition Pattern
**Purpose**: Verify all 4 components render together without conflicts

**Tests**:
- ✅ All components render on same page
- ✅ Vertical spacing maintained (py-12 md:py-16)
- ✅ Background alternation (white → cream → white)

### 2. Data Flow Validation
**Purpose**: Test frontmatter → component props pipeline

**Tests**:
- ✅ Components receive and render frontmatter data
- ✅ Optional fields handled gracefully
- ✅ TypeScript types enforce correct structure

### 3. Responsive Behavior
**Purpose**: Validate responsive design at 3 breakpoints

**Tests**:
- ✅ Mobile (375px): All grids collapse to 1-2 columns
- ✅ Tablet (768px): Grids expand to 2-3 columns
- ✅ Desktop (1280px): Full column counts (3-4 columns)
- ✅ Buttons stack vertically on mobile, horizontal on desktop

### 4. SPEC-10/11 Integration
**Purpose**: Ensure no conflicts with existing components

**Tests**:
- ✅ AdventureQuickStats + new components render together
- ✅ AdventureGettingThere + new components maintain spacing
- ✅ No conflicting Tailwind classes
- ✅ Consistent font families

### 5. Empty State Handling
**Purpose**: Test graceful degradation with missing data

**Tests**:
- ✅ AdventureFeatureSection hidden when features array is empty
- ✅ AdventureAmenitiesGrid hidden when amenities array is empty
- ✅ AdventureCampingList shows empty state message
- ✅ AdventureCTA renders with single button when secondary is missing

### 6. Accessibility
**Purpose**: Validate WCAG 2.1 AA compliance

**Tests**:
- ✅ All components pass WCAG 2.1 AA (axe-core)
- ✅ Color contrast meets WCAG AA
- ✅ Icons have aria-hidden with text alternatives
- ✅ External links have security attributes (rel="noopener noreferrer")
- ✅ Phone links use proper tel: protocol

### 7. WVWO Aesthetic Compliance
**Purpose**: Enforce brand guidelines

**Tests**:
- ✅ No forbidden fonts (Inter, Poppins, etc.)
- ✅ Uses WVWO brand colors only
- ✅ No glassmorphism or backdrop-blur
- ✅ Only rounded-sm corners (no rounded-md/lg/xl)
- ✅ Orange used sparingly (<5% of screen)

### 8. Animation Behavior
**Purpose**: Test gentle-reveal animation and reduced motion

**Tests**:
- ✅ gentle-reveal animation runs by default
- ✅ Animations disabled with prefers-reduced-motion

### 9. Visual Regression
**Purpose**: Catch unintended visual changes

**Tests**:
- ✅ Mobile composition screenshot (375px)
- ✅ Desktop composition screenshot (1280px)

### 10. Performance
**Purpose**: Ensure components don't degrade page performance

**Tests**:
- ✅ Page loads without layout shift (CLS < 0.1)
- ✅ Components render without blocking main thread (<3s)

## Running Tests

### Full Suite
```bash
cd wv-wild-web
npm run test:e2e
```

### Integration Tests Only
```bash
npx playwright test component-integration
```

### Specific Scenario
```bash
npx playwright test component-integration -g "Scenario 1"
```

### Debug Mode
```bash
npx playwright test component-integration --debug
```

### UI Mode (Interactive)
```bash
npx playwright test component-integration --ui
```

## Test Data

### Test Page
**Path**: `/near/summersville-lake`

### Test Fixture
**Path**: `tests/fixtures/test-wma-integration.md`

**Includes**:
- 3 feature items (What to Hunt)
- 6 amenities
- 3 facilities with count badges
- Dual CTA buttons

## Success Criteria

**All tests must pass** (no failures or violations):

- ✅ 100+ assertions across 10 scenarios
- ✅ Zero accessibility violations (axe-core)
- ✅ Zero console errors
- ✅ Zero layout shift (CLS < 0.1)
- ✅ Zero WVWO aesthetic violations

## Expected Failures

If tests fail, check:

1. **Component not implemented on test page**
   - Solution: Add component to page template
   - Error: "Expected to be visible" but count is 0

2. **Missing frontmatter data**
   - Solution: Add data to test page frontmatter
   - Error: "Expected count > 0" but got 0

3. **Styling conflicts**
   - Solution: Remove conflicting Tailwind classes
   - Error: "Expected not to contain 'rounded-lg'"

4. **Accessibility violations**
   - Solution: Fix color contrast, add aria-labels
   - Error: axe-core violations array not empty

## Maintenance

### When Adding New Components
1. Add test fixture data to `test-wma-integration.md`
2. Add component selector to Scenario 1 tests
3. Add responsive tests to Scenario 3
4. Add accessibility tests to Scenario 6
5. Update visual regression screenshots

### When Changing Styles
1. Run visual regression tests
2. Review screenshot diffs
3. Update baselines if changes are intentional

### When Updating Content Schema
1. Update test fixture frontmatter
2. Verify TypeScript types still match
3. Re-run data flow tests (Scenario 2)

## CI/CD Integration

These tests should run:
- ✅ On every PR to main
- ✅ Before merging SPEC-12 PR
- ✅ On nightly builds (regression detection)

## Contact

**Owner**: Testing & Quality Assurance Agent
**Spec**: SPEC-12
**Related PRs**: #69 (SPEC-11), #68 (SPEC-10)
