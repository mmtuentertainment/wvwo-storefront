# SPEC-13 Test File Organization

**Purpose**: Clear directory structure for Lake Template test files

---

## Directory Structure

```
wvwo-storefront/
├── wv-wild-web/
│   ├── src/
│   │   ├── types/
│   │   │   ├── adventure.ts                    # Source: Type definitions
│   │   │   └── __tests__/
│   │   │       ├── adventure.test.ts           # Existing SPEC-11 tests
│   │   │       └── adventure-lake.test.ts      # NEW: SPEC-13 schema tests
│   │   │
│   │   └── components/
│   │       └── templates/
│   │           ├── LakeTemplate.astro          # Source: Template component
│   │           └── __tests__/
│   │               ├── LakeTemplate.test.ts             # NEW: Logic extraction tests
│   │               └── LakeTemplate-wvwo.test.ts        # NEW: WVWO compliance tests
│   │
│   └── tests/
│       ├── e2e/
│       │   ├── lake-template-responsive.spec.ts         # NEW: Responsive tests
│       │   └── lake-template-a11y.spec.ts               # NEW: Accessibility tests
│       │
│       ├── integration/
│       │   └── lake-template-integration.test.ts        # NEW: Real data tests
│       │
│       ├── performance/
│       │   └── lake-template-performance.spec.ts        # NEW: Lighthouse tests
│       │
│       └── fixtures/
│           ├── minimal-lake.ts                          # NEW: Minimal valid data
│           ├── summersville-lake-data.ts                # NEW: Full production data
│           └── invalid-lake.ts                          # NEW: Build failure test data
│
├── .github/
│   └── workflows/
│       └── spec-13-tests.yml                            # NEW: CI/CD pipeline
│
└── docs/
    └── specs/
        └── Mountain State Adventure Destination/
            └── SPEC-13-template-lake/
                └── testing/
                    ├── TESTING-ARCHITECTURE.md          # Main architecture doc
                    ├── TEST-FILE-ORGANIZATION.md        # This file
                    ├── TEST-DATA-FIXTURES.md            # Fixture specifications
                    └── CI-CD-PIPELINE.md                # Pipeline configuration guide
```

---

## File Naming Conventions

### Unit Tests (.test.ts)

- **Pattern**: `{component-name}.test.ts`
- **Location**: `src/**/__tests__/`
- **Framework**: Vitest
- **Examples**:
  - `adventure-lake.test.ts` - Zod schema validation
  - `LakeTemplate.test.ts` - Component logic extraction
  - `LakeTemplate-wvwo.test.ts` - WVWO compliance

### E2E Tests (.spec.ts)

- **Pattern**: `{feature-name}-{test-type}.spec.ts`
- **Location**: `tests/e2e/`
- **Framework**: Playwright
- **Examples**:
  - `lake-template-responsive.spec.ts` - Responsive layout
  - `lake-template-a11y.spec.ts` - Accessibility

### Integration Tests (.test.ts)

- **Pattern**: `{feature-name}-integration.test.ts`
- **Location**: `tests/integration/`
- **Framework**: Vitest
- **Examples**:
  - `lake-template-integration.test.ts` - Real data validation

### Performance Tests (.spec.ts)

- **Pattern**: `{feature-name}-performance.spec.ts`
- **Location**: `tests/performance/`
- **Framework**: Playwright + Lighthouse
- **Examples**:
  - `lake-template-performance.spec.ts` - Lighthouse audits

### Fixture Files (.ts)

- **Pattern**: `{data-name}.ts` or `{data-name}-data.ts`
- **Location**: `tests/fixtures/`
- **Exports**: Typed data objects
- **Examples**:
  - `minimal-lake.ts` - Minimal valid data
  - `summersville-lake-data.ts` - Full production data
  - `invalid-lake.ts` - Invalid data for negative tests

---

## Test File Templates

### Unit Test Template (Vitest)

```typescript
/**
 * {Component Name} Unit Tests
 * SPEC-13: {Test purpose}
 *
 * Tests {what is being tested}
 *
 * @module {module path}
 */
import { describe, it, expect } from 'vitest';
import { /* imports */ } from '../{source-file}';

describe('SPEC-13: {Component/Schema Name}', () => {
  describe('Valid inputs', () => {
    it('test case description', () => {
      // Arrange
      const input = { /* test data */ };

      // Act
      const result = schema.safeParse(input);

      // Assert
      expect(result.success).toBe(true);
    });
  });

  describe('Invalid inputs', () => {
    it('rejects invalid data with descriptive error', () => {
      const input = { /* invalid data */ };

      expect(schema.safeParse(input).success).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('handles edge case scenario', () => {
      // Test edge case
    });
  });
});
```

### E2E Test Template (Playwright)

```typescript
/**
 * {Feature Name} E2E Tests
 * SPEC-13: {Test purpose}
 */
import { test, expect } from '@playwright/test';

test.describe('{Feature Name}', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/adventures/test-lake');
  });

  test('test case description', async ({ page }) => {
    // Arrange
    const element = page.locator('selector');

    // Act
    // (user interaction or page load)

    // Assert
    await expect(element).toBeVisible();
  });
});
```

### Integration Test Template

```typescript
/**
 * {Feature Name} Integration Tests
 * SPEC-13: {Test purpose}
 */
import { describe, it, expect } from 'vitest';
import type { LakeTemplateProps } from '../../src/types/adventure';
import { testLakeData } from '../fixtures/test-lake-data';

describe('LakeTemplate Integration with Real Data', () => {
  it('real data passes validation', () => {
    // Test real data structure
    expect(testLakeData.name).toBeDefined();
    expect(testLakeData.fishSpecies.length).toBeGreaterThan(0);
  });
});
```

---

## Test Coverage Mapping

| Test File | Layer | Coverage Target | Framework | Purpose |
|-----------|-------|----------------|-----------|---------|
| `adventure-lake.test.ts` | Layer 1 | 100% schemas | Vitest | Zod schema validation |
| `LakeTemplate.test.ts` | Layer 2 | 85% logic | Vitest | Component logic extraction |
| `LakeTemplate-wvwo.test.ts` | Layer 3 | 100% rules | Vitest | WVWO aesthetic compliance |
| `lake-template-responsive.spec.ts` | Layer 4 | 5 breakpoints | Playwright | Responsive layout |
| `lake-template-a11y.spec.ts` | Layer 5 | 0 violations | Playwright + Axe | Accessibility (WCAG 2.1 AA) |
| `lake-template-integration.test.ts` | Layer 6 | 100% real data | Vitest | Real data validation |
| `lake-template-performance.spec.ts` | Layer 7 | Lighthouse 90+ | Playwright | Performance benchmarks |

---

## Import Path Patterns

### Unit Tests (in `src/**/__tests__/`)

```typescript
// Sibling imports (one level up)
import { SchemaName } from '../adventure';
import type { TypeName } from '../adventure';

// Relative imports (multiple levels)
import { Component } from '../../../components/Component.astro';

// Test utilities
import { describe, it, expect } from 'vitest';
```

### E2E Tests (in `tests/e2e/`)

```typescript
// Playwright framework
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// No direct imports from src/ - tests run against built app
// Use page.goto() to load pages
```

### Integration Tests (in `tests/integration/`)

```typescript
// Type imports from src
import type { LakeTemplateProps } from '../../src/types/adventure';

// Fixture imports
import { summersvilleLakeData } from '../fixtures/summersville-lake-data';

// Test framework
import { describe, it, expect } from 'vitest';
```

### Fixture Files (in `tests/fixtures/`)

```typescript
// Type imports from src
import type { LakeTemplateProps } from '../../src/types/adventure';

// Export typed data
export const dataName: LakeTemplateProps = { /* ... */ };
```

---

## Test Execution Order

### Local Development (TDD)

1. **Type validation** (`npm run test -- adventure-lake.test.ts`)
   - Fast feedback on schema changes
   - Run in watch mode during development

2. **Component logic** (`npm run test -- LakeTemplate.test.ts`)
   - Test extracted logic functions
   - Verify section rendering logic

3. **WVWO compliance** (`npm run test -- LakeTemplate-wvwo.test.ts`)
   - Check aesthetic rules
   - Fast regex-based validation

4. **Responsive E2E** (`npx playwright test lake-template-responsive.spec.ts`)
   - Visual layout verification
   - Slower, run after logic tests pass

5. **Accessibility** (`npx playwright test lake-template-a11y.spec.ts`)
   - Axe scan for WCAG violations
   - Run before PR submission

6. **Integration** (`npm run test -- lake-template-integration.test.ts`)
   - Validate real data works
   - Run with production data fixtures

7. **Performance** (`npx playwright test lake-template-performance.spec.ts`)
   - Lighthouse audits
   - Slowest tests, run before merge

### CI Pipeline (GitHub Actions)

**Jobs run in parallel** (see `.github/workflows/spec-13-tests.yml`):

1. `type-validation` - Layer 1 tests
2. `component-logic` - Layer 2 tests
3. `wvwo-compliance` - Layer 3 tests (includes regex scan)
4. `responsive-e2e` - Layer 4 tests
5. `accessibility` - Layer 5 tests
6. `integration` - Layer 6 tests
7. `performance` - Layer 7 tests
8. `coverage` - Generate coverage report (runs after unit tests)

**Quality Gates**: All jobs must pass before PR can merge.

---

## Fixture Data Organization

### Minimal Test Data

**File**: `tests/fixtures/minimal-lake.ts`
**Purpose**: Smallest valid data for schema validation
**Use Cases**:

- Quick schema validation tests
- Negative testing (remove fields to test validation errors)
- Performance baseline (minimal render overhead)

### Full Production Data

**File**: `tests/fixtures/summersville-lake-data.ts`
**Purpose**: Complete real-world data from Summersville Lake page
**Use Cases**:

- Integration testing with realistic data
- Visual regression testing
- Performance testing with typical array sizes

### Invalid Data

**File**: `tests/fixtures/invalid-lake.ts`
**Purpose**: Intentionally invalid data to test build-time validation
**Use Cases**:

- Test Zod schema catches errors
- Verify build fails with clear error messages
- Document common data validation mistakes

### Custom Test Data

**Pattern**: `tests/fixtures/{test-case}-lake.ts`
**Examples**:

- `max-species-lake.ts` - 20 fish species (array size limit)
- `max-spots-lake.ts` - 15 fishing spots (array size limit)
- `empty-arrays-lake.ts` - Empty optional arrays (edge case)

---

## Test Output and Reports

### Vitest (Unit Tests)

**Output Location**: `wv-wild-web/coverage/`
**Formats**:

- `coverage/index.html` - HTML coverage report
- `coverage/lcov.info` - LCOV format for CI
- Terminal summary during test run

**View Coverage**:

```bash
cd wv-wild-web
npm run test:run -- --coverage
open coverage/index.html
```

### Playwright (E2E Tests)

**Output Location**: `wv-wild-web/playwright-report/`
**Formats**:

- HTML report with screenshots
- Trace files for debugging
- Video recordings (on failure)

**View Report**:

```bash
cd wv-wild-web
npx playwright show-report
```

### Lighthouse (Performance)

**Output Location**: `wv-wild-web/lighthouse-reports/`
**Formats**:

- JSON report (parseable)
- HTML report (visual)

**View Report**:

```bash
cd wv-wild-web
open lighthouse-reports/latest.html
```

---

## Git Ignore Patterns

Add to `.gitignore`:

```gitignore
# Test outputs
**/coverage/
**/playwright-report/
**/test-results/
**/lighthouse-reports/

# Vitest cache
**/.vitest/

# Playwright cache
**/.playwright/
```

---

## Maintenance Guidelines

### When to Update Tests

1. **Type changes** (`adventure.ts` modified)
   - Update `adventure-lake.test.ts` to cover new schemas
   - Update fixtures to include new fields

2. **Template changes** (`LakeTemplate.astro` modified)
   - Update logic extraction tests if functions change
   - Update WVWO tests if new classes added
   - Update responsive tests if layout changes

3. **Accessibility requirements change**
   - Update WCAG test thresholds in `lake-template-a11y.spec.ts`
   - Add new axe rules to test configuration

4. **Performance budgets change**
   - Update Lighthouse thresholds in `lake-template-performance.spec.ts`
   - Adjust array size limits if requirements change

### Test Review Checklist

Before PR submission:

- [ ] All 7 test layers passing
- [ ] Coverage meets 80%+ threshold
- [ ] No WVWO violations found
- [ ] Zero accessibility violations
- [ ] Lighthouse scores 90+ all categories
- [ ] Real data (Summersville Lake) validates
- [ ] Invalid data causes expected build failure

---

**Next**: Proceed to TEST-DATA-FIXTURES.md for detailed fixture specifications.
