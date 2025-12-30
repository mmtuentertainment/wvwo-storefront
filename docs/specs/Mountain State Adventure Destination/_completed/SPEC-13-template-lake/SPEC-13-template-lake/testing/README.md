# SPEC-13 Lake Template Testing Documentation

**Testing Architect**: QA Specialist Agent
**Created**: 2025-12-29
**Status**: Architecture Complete - Ready for Implementation

---

## Documentation Overview

This directory contains comprehensive testing architecture for the SPEC-13 Lake Template component, ensuring type safety, WVWO aesthetic compliance, accessibility, and performance.

### Core Documents

1. **TESTING-ARCHITECTURE.md** (Primary)
   - Complete 7-layer testing strategy
   - Layer 1: Type Validation (Zod schemas)
   - Layer 2: Component Rendering (logic extraction)
   - Layer 3: WVWO Compliance (aesthetic rules)
   - Layer 4: Responsive Layout (mobile/tablet/desktop)
   - Layer 5: Accessibility (WCAG 2.1 AA)
   - Layer 6: Integration (real Summersville Lake data)
   - Layer 7: Performance (Lighthouse benchmarks)

2. **TEST-FILE-ORGANIZATION.md**
   - Directory structure for test files
   - Naming conventions
   - Import path patterns
   - Test execution order
   - Coverage mapping

3. **TEST-DATA-FIXTURES.md**
   - Fixture specifications
   - Minimal valid data baseline
   - Full Summersville Lake production data
   - Invalid data for build failure tests
   - Array size limit fixtures
   - Edge case fixtures

4. **CI-CD-PIPELINE.md**
   - GitHub Actions workflow configuration
   - Parallel job execution
   - Quality gates and merge blockers
   - Local pre-push validation
   - Branch protection rules
   - Troubleshooting guide

---

## Quick Start

### For Developers Implementing Tests

1. **Read TESTING-ARCHITECTURE.md first**
   - Understand the 7-layer strategy
   - Review test pyramid approach
   - Note coverage targets

2. **Follow TEST-FILE-ORGANIZATION.md**
   - Create test files in correct locations
   - Use naming conventions
   - Import correctly

3. **Use TEST-DATA-FIXTURES.md**
   - Copy fixture templates
   - Validate data structure
   - Test with real and edge case data

4. **Configure CI-CD-PIPELINE.md**
   - Set up GitHub Actions workflow
   - Configure branch protection
   - Enable quality gates

### For Code Reviewers

**Pre-Merge Checklist**:
- [ ] All 7 test layers passing (see CI status)
- [ ] Coverage ≥80% (statements), ≥75% (branches)
- [ ] Zero WVWO violations (no rounded-md/lg/xl)
- [ ] Zero accessibility violations (WCAG 2.1 AA)
- [ ] Lighthouse scores ≥90 (all categories)
- [ ] Real data (Summersville Lake) validates
- [ ] Invalid data causes expected build failure

---

## Testing Layers Summary

| Layer | Focus | Framework | Target | Files |
|-------|-------|-----------|--------|-------|
| **1** | Type Validation | Vitest + Zod | 100% schemas | `adventure-lake.test.ts` |
| **2** | Component Logic | Vitest | 85% coverage | `LakeTemplate.test.ts` |
| **3** | WVWO Compliance | Vitest + Regex | 100% rules | `LakeTemplate-wvwo.test.ts` |
| **4** | Responsive Layout | Playwright | 5 breakpoints | `lake-template-responsive.spec.ts` |
| **5** | Accessibility | Playwright + Axe | 0 violations | `lake-template-a11y.spec.ts` |
| **6** | Integration | Vitest | 100% real data | `lake-template-integration.test.ts` |
| **7** | Performance | Playwright + Lighthouse | Scores 90+ | `lake-template-performance.spec.ts` |

---

## Coverage Targets

### Required Thresholds (vitest.config.ts)

```javascript
{
  statements: 80,   // 80%+ statements covered
  branches: 75,     // 75%+ branches covered
  functions: 80,    // 80%+ functions covered
  lines: 80         // 80%+ lines covered
}
```

### Quality Metrics

- **Type Safety**: 100% Zod validation coverage
- **WVWO Compliance**: Zero aesthetic violations
- **Accessibility**: Zero WCAG 2.1 AA violations
- **Performance**: Lighthouse 90+ (all categories)
- **Reliability**: Build fails with invalid data (expected)

---

## Test Execution Commands

### Local Development

```bash
# Run all unit tests (Layers 1-3)
cd wv-wild-web
npm run test

# Run specific layer
npm run test -- adventure-lake.test.ts           # Layer 1
npm run test -- LakeTemplate.test.ts             # Layer 2
npm run test -- LakeTemplate-wvwo.test.ts        # Layer 3

# Run E2E tests (Layers 4-5)
npx playwright test lake-template-responsive.spec.ts  # Layer 4
npx playwright test lake-template-a11y.spec.ts        # Layer 5

# Run integration (Layer 6)
npm run test -- lake-template-integration.test.ts

# Run performance (Layer 7)
npm run build && npm run preview &
npx playwright test lake-template-performance.spec.ts

# Coverage report
npm run test:run -- --coverage
open coverage/index.html
```

### CI Pipeline

```bash
# Triggered automatically on PR to files:
# - wv-wild-web/src/components/templates/LakeTemplate.astro
# - wv-wild-web/src/types/adventure.ts
# - tests/**/*lake*

# Manual trigger (if needed)
gh workflow run spec-13-tests.yml
```

---

## Test Data Fixtures

### Available Fixtures

```typescript
// Minimal valid data (baseline)
import { minimalLakeData } from '../fixtures/minimal-lake';

// Full production data (Summersville Lake)
import { summersvilleLakeData } from '../fixtures/summersville-lake-data';

// Invalid data (build failure testing)
import { invalidLakeData } from '../fixtures/invalid-lake';

// Array size limits (performance testing)
import { maxSpeciesLakeData } from '../fixtures/max-species-lake';
import { maxSpotsLakeData } from '../fixtures/max-spots-lake';

// Edge cases (empty arrays)
import { emptyArraysLakeData } from '../fixtures/empty-arrays-lake';
```

---

## WVWO Compliance Rules (Critical)

### Enforced by Layer 3

**FORBIDDEN** (instant PR rejection):
- ❌ `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`
- ❌ Fonts: Inter, DM Sans, Space Grotesk, Poppins, Outfit, Montserrat, Raleway, Open Sans
- ❌ Colors: Purple gradients, hot pink (#ec4899), neon colors
- ❌ Styles: Glassmorphism, backdrop-blur, parallax scrolling

**REQUIRED**:
- ✅ `rounded-sm` ONLY (0.125rem)
- ✅ Fonts: font-display (Bitter), font-hand (Permanent Marker), font-body (Noto Sans)
- ✅ Colors: brand-brown, sign-green, brand-cream, brand-orange (<5% usage)
- ✅ Border-left patterns: green (fish), brown (spots), orange (safety)

---

## Accessibility Requirements (WCAG 2.1 AA)

### Enforced by Layer 5

**Must Pass**:
- ✅ Color contrast ≥4.5:1 (text), ≥3:1 (UI elements)
- ✅ Semantic HTML (h1→h2→h3 hierarchy)
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation (tab order logical)
- ✅ Screen reader compatibility
- ✅ Touch targets ≥44×44px (mobile)
- ✅ No horizontal scroll on mobile
- ✅ Skip to content link

**Tools**:
- @axe-core/playwright for automated scanning
- Manual keyboard navigation testing
- Color contrast checker in tests

---

## Performance Budgets

### Enforced by Layer 7

**Lighthouse Scores** (minimum):
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

**Core Web Vitals**:
- First Contentful Paint (FCP): <1.5s
- Largest Contentful Paint (LCP): <2.5s
- Cumulative Layout Shift (CLS): <0.1

**Array Size Limits** (NFR-009):
- fishSpecies: max 20 items
- fishingSpots: max 15 items
- campgrounds: max 10 items
- activities: max 20 items

---

## Integration Points

### SPEC-11 Component Reuse

Lake Template integrates with existing SPEC-11 components:
- `AdventureWhatToFish` - Fish species wrapper
- `AdventureFeatureSection` - Generic feature base
- `AdventureCampingList` - Campground cards
- `AdventureAmenitiesGrid` - Amenities checklist
- `AdventureQuickStats` - Stats bar

**Integration Tests** verify:
- Props match expected interfaces
- Components render with Lake Template data
- No breaking changes to existing APIs

---

## Maintenance

### Test Review Cadence

- **Weekly**: Review failed tests, update fixtures
- **Per PR**: Full test suite, enforce quality gates
- **Per Sprint**: Review coverage gaps, refactor slow tests
- **Per Quarter**: Update WCAG guidelines, refresh fixtures

### When to Update Tests

1. **Type changes** → Update Layer 1 (schema tests)
2. **Template changes** → Update Layer 2-3 (logic, WVWO)
3. **Layout changes** → Update Layer 4 (responsive)
4. **Accessibility updates** → Update Layer 5 (a11y rules)
5. **Performance budgets** → Update Layer 7 (thresholds)

---

## Next Steps

### Implementation Priority

1. **Create test files** (start with Layer 1)
   - `wv-wild-web/src/types/__tests__/adventure-lake.test.ts`
   - Follow patterns from existing `adventure.test.ts`

2. **Create test fixtures** (parallel with Layer 1)
   - `tests/fixtures/minimal-lake.ts`
   - `tests/fixtures/summersville-lake-data.ts`

3. **Implement component tests** (Layer 2-3)
   - Logic extraction tests
   - WVWO compliance tests

4. **Set up E2E tests** (Layer 4-5)
   - Responsive layout
   - Accessibility

5. **Configure CI/CD** (final step)
   - GitHub Actions workflow
   - Branch protection rules

### Success Criteria

✅ All 7 layers implemented
✅ Coverage ≥80% across all layers
✅ CI pipeline running successfully
✅ Quality gates blocking bad PRs
✅ Documentation updated with test results

---

## Support and Resources

### Framework Documentation

- **Vitest**: https://vitest.dev/
- **Playwright**: https://playwright.dev/
- **Axe Core**: https://github.com/dequelabs/axe-core
- **Zod**: https://zod.dev/

### WVWO Guidelines

- **CLAUDE.md**: WVWO aesthetic rules (root directory)
- **SPEC-13 spec.md**: Requirements and constraints
- **data-model.md**: Type definitions and schemas

### Getting Help

1. Check documentation in this directory
2. Review existing test files in `src/**/__tests__/`
3. Run tests locally to debug issues
4. Review CI logs for detailed error messages
5. Contact testing architect agent for architecture questions

---

**Status**: Architecture complete. Ready for test implementation.

**Deliverables**:
- ✅ 7-layer testing architecture
- ✅ Test file organization specification
- ✅ Test data fixtures design
- ✅ CI/CD pipeline configuration
- ✅ Documentation complete

**Memory**: Stored in `swarm/tester/testing-architecture`
