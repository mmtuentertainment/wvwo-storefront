# Test Suite - SPEC-14 Lake Template Component System

## Overview

This directory contains the comprehensive test suite for Phase 6 final validation of the River Template Component System.

## Test Structure

```
tests/
├── e2e/                    # End-to-end integration tests
│   └── river-template.spec.ts
├── accessibility/          # WCAG AA compliance tests
│   └── wcag-compliance.spec.ts
├── performance/            # Performance and Lighthouse tests
│   └── lighthouse-metrics.spec.ts
├── validation/             # Acceptance criteria validation
│   └── acceptance-criteria.spec.ts
└── README.md              # This file
```

## Running Tests

### All Tests
```bash
npm run test:all
```

### By Category
```bash
npm run test:e2e              # E2E integration
npm run test:accessibility    # WCAG compliance
npm run test:performance      # Performance metrics
npm run test:validation       # Acceptance criteria
```

### Full Validation Suite
```bash
npm run phase6:full-validation
```

This runs:
1. Build site
2. All checkpoint validations
3. Google Rich Results validation
4. All test suites

## Test Configuration

**Config file**: `playwright.config.ts`

**Browser coverage**:
- Chromium (Desktop Chrome)
- Firefox
- WebKit (Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)
- Tablet (iPad Pro)

**Timeouts**:
- Test: 30 seconds
- Navigation: 30 seconds
- Action: 10 seconds

**Retries**:
- CI: 2 retries
- Local: 0 retries

## Test Reports

All reports saved to `reports/phase6/`:
- `playwright-report/` - HTML test results
- `test-results.json` - JSON test results
- Screenshots on failure
- Videos on failure
- Traces on retry

## E2E Integration Tests

**File**: `tests/e2e/river-template.spec.ts`

**Coverage**:
- Component rendering
- JSON-LD generation
- Content Collections integration
- Section functionality
- Navigation
- Mobile responsiveness
- Basic performance

**Key tests**:
- `RiverTemplate renders with example data`
- `SchemaRiverTemplate generates valid JSON-LD`
- `All 8 sections display correctly`
- `Section navigation works`
- `Related products link to shop`

## Accessibility Tests

**File**: `tests/accessibility/wcag-compliance.spec.ts`

**Coverage**:
- WCAG AA compliance (automated with axe-core)
- Color contrast ratios
- Keyboard navigation
- Focus indicators
- Touch target sizes
- ARIA attributes
- Screen reader compatibility

**Key tests**:
- `Passes automated accessibility scan`
- `Color contrast meets WCAG AA`
- `Keyboard navigation works`
- `Touch targets ≥48px`
- `ARIA landmarks properly defined`

## Performance Tests

**File**: `tests/performance/lighthouse-metrics.spec.ts`

**Coverage**:
- Lighthouse audits (Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals (LCP, FID, CLS)
- Bundle size optimization
- Asset optimization
- 3G connection simulation

**Key tests**:
- `Lighthouse scores ≥90`
- `LCP under 2.5s`
- `FID under 100ms`
- `CLS under 0.1`
- `Page loads on 3G`

## Acceptance Criteria Tests

**File**: `tests/validation/acceptance-criteria.spec.ts`

**Coverage**: All 42 acceptance criteria from SPEC-14
- Component existence
- Schema validation
- WVWO brand compliance
- Accessibility requirements
- Performance targets
- Documentation

**Key tests**:
- `AC-001 to AC-042` - Individual criteria
- `Component integration tests`
- `WVWO brand compliance final check`

## Writing New Tests

### Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/test/river-template-example');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const element = page.locator('[data-test-id]');

    // Act
    await element.click();

    // Assert
    await expect(element).toBeVisible();
  });
});
```

### Best Practices

1. **Use data-test-id attributes** for stable selectors
2. **Wait for elements** before interacting
3. **Use descriptive test names** that explain what and why
4. **Keep tests isolated** - no dependencies between tests
5. **Use page object pattern** for complex flows
6. **Check multiple browsers** via Playwright projects
7. **Screenshot failures** automatically enabled

## Debugging Tests

### Run with UI mode
```bash
npx playwright test --ui
```

### Run specific test
```bash
npx playwright test tests/e2e/river-template.spec.ts
```

### Debug mode
```bash
npx playwright test --debug
```

### View trace
```bash
npx playwright show-trace reports/phase6/trace.zip
```

## CI/CD Integration

Tests run automatically on:
- Push to main
- Pull request
- Manual workflow dispatch

GitHub Actions workflow validates:
1. All tests pass
2. Lighthouse scores meet thresholds
3. Accessibility compliance
4. Brand compliance
5. Performance budgets

## Troubleshooting

### Tests failing locally

1. Check dev server is running:
   ```bash
   npm run preview
   ```

2. Clear build cache:
   ```bash
   rm -rf dist .astro
   npm run build
   ```

3. Verify dependencies:
   ```bash
   npm install
   ```

### Accessibility test failures

1. Run axe-core manually in browser DevTools
2. Check contrast with DevTools color picker
3. Test keyboard navigation manually
4. Use screen reader (NVDA, JAWS, VoiceOver)

### Performance test failures

1. Check network conditions (no throttling locally)
2. Verify bundle sizes haven't increased
3. Run Lighthouse manually in Chrome DevTools
4. Check for console errors

### Flaky tests

1. Increase timeouts if needed
2. Add explicit waits for animations
3. Use `waitForLoadState('networkidle')`
4. Check for race conditions

## Coverage Goals

- **E2E**: All user flows covered
- **Accessibility**: 100% WCAG AA compliance
- **Performance**: All Core Web Vitals in "Good" range
- **Acceptance**: 100% of SPEC-14 criteria validated

## Next Steps

After all tests pass:
1. Generate validation report
2. Review with team
3. Get stakeholder sign-off
4. Deploy to staging
5. User acceptance testing
6. Production deployment
