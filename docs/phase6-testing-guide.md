# Phase 6 Testing Guide - SPEC-14 Lake Template Component System

## Overview

Phase 6 implements comprehensive testing and validation for the River Template Component System. This guide covers all test suites, validation scripts, and acceptance criteria checks.

## Test Categories

### 1. E2E Integration Tests

**Location**: `tests/e2e/river-template.spec.ts`

**Coverage**:
- RiverTemplate component rendering with example data
- SchemaRiverTemplate JSON-LD generation and validation
- Content Collections integration
- All 8 sections display and functionality
- Section navigation
- Related products linking
- Accessibility features
- Mobile responsive layout
- Performance metrics (LCP)
- SEO metadata

**Run**:
```bash
npm run test:e2e
```

### 2. Accessibility Testing

**Location**: `tests/accessibility/wcag-compliance.spec.ts`

**Coverage**:
- WCAG AA compliance (automated with axe-core)
- Color contrast ratios (4.5:1 text, 3:1 large text)
- Keyboard navigation
- Focus indicators
- Touch target sizes (≥48px)
- ARIA landmarks and roles
- Image alt text
- Heading hierarchy
- Form labels
- Skip links
- Screen reader compatibility
- No keyboard traps
- Language specification
- Page titles

**Run**:
```bash
npm run test:accessibility
```

### 3. Performance Testing

**Location**: `tests/performance/lighthouse-metrics.spec.ts`

**Coverage**:
- Lighthouse scores ≥90 (Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals:
  - LCP (Largest Contentful Paint) <2.5s
  - FID (First Input Delay) <100ms
  - CLS (Cumulative Layout Shift) <0.1
- TTI (Time to Interactive) <3.8s
- FCP (First Contentful Paint) <1.8s
- Speed Index <3.4s
- Bundle size optimization (<100KB)
- Asset optimization (images, CSS, JS)
- Font loading efficiency
- Rural WV bandwidth simulation (3G)
- Progressive enhancement
- Performance budgets

**Run**:
```bash
npm run test:performance
```

### 4. Acceptance Criteria Validation

**Location**: `tests/validation/acceptance-criteria.spec.ts`

**Coverage**: All 42 acceptance criteria from SPEC-14
- Component existence (RiverTemplate, SchemaRiverTemplate)
- Content collection configuration
- 8 sections implementation
- JSON-LD validity
- Schema.org entities (Place, TouristAttraction, GeoCoordinates)
- WVWO brand compliance (colors, fonts, styles)
- WCAG AA compliance
- Touch targets
- Keyboard navigation
- Performance metrics
- Mobile responsiveness
- 3G connection support
- Example data
- Migration scripts
- TypeScript types
- Documentation
- Checkpoint validations

**Run**:
```bash
npm run test:validation
```

## Validation Scripts

### Checkpoint Validations

**All Checkpoints**:
```bash
npm run validate:checkpoints
```

This runs all 5 checkpoint validation scripts:
1. Foundation (content collection, types, schema component)
2. Schema (JSON-LD structure, entities, validation)
3. Template Structure (8 sections, navigation, layout)
4. Section Implementation (content, styling, functionality)
5. Example Data (new-river.md, frontmatter, completeness)

**Reports**: `reports/phase6/checkpoint-validation-*.txt`

### Google Rich Results Test

**Run**:
```bash
npm run validate:rich-results
```

**Process**:
1. Extracts JSON-LD from built test page
2. Validates schema structure
3. Checks Place entity requirements
4. Checks TouristAttraction entity
5. Checks BodyOfWater entity (optional)
6. Generates validation report with Google Rich Results Test URL

**Reports**: `reports/phase6/google-rich-results-*.txt`

**Manual Verification**:
1. Copy JSON-LD from report
2. Open https://search.google.com/test/rich-results
3. Paste schema
4. Verify all entities recognized
5. Screenshot results

### Full Validation Suite

**Run complete Phase 6 validation**:
```bash
npm run phase6:full-validation
```

This executes:
1. Build site (`npm run build`)
2. All checkpoint validations
3. Google Rich Results validation
4. All test suites (E2E, accessibility, performance, acceptance)

**Duration**: ~5-10 minutes
**Reports**: All saved to `reports/phase6/`

## Test Data

### Example River Page

**Path**: `src/pages/test/river-template-example.astro`

Uses example data from `src/content/rivers/new-river.md` to test:
- RiverTemplate rendering
- SchemaRiverTemplate JSON-LD
- All 8 sections
- Navigation
- Products section
- Mobile responsiveness
- Accessibility
- Performance

## WVWO Brand Compliance Tests

### Fonts
```typescript
// ✓ APPROVED
Bitter (display headings)
Permanent Marker (Kim's touches)
Noto Sans (body text)

// ✗ FORBIDDEN
Inter, Poppins, DM Sans, Space Grotesk, etc.
```

### Colors
```typescript
// ✓ APPROVED
--brand-brown: #3E2723
--sign-green: #2E7D32
--brand-cream: #FFF8E1
--brand-orange: #FF6F00 (CTAs only, <5%)

// ✗ FORBIDDEN
Purple gradients, hot pink, neon, corporate blue
```

### Styles
```typescript
// ✓ APPROVED
rounded-sm (2px corners)

// ✗ FORBIDDEN
Glassmorphism, backdrop-blur
rounded-md, rounded-lg, rounded-xl
Parallax, confetti, neumorphic
```

### Copy
```typescript
// ✗ FORBIDDEN BUZZWORDS
"Unlock potential"
"Seamless experience"
"Revolutionize"
"Next-level"
"Transform the way you"
```

## Performance Benchmarks

### Core Web Vitals Targets

| Metric | Target | Measured |
|--------|--------|----------|
| LCP | <2.5s | ✓ Pass |
| FID | <100ms | ✓ Pass |
| CLS | <0.1 | ✓ Pass |
| TTI | <3.8s | ✓ Pass |
| FCP | <1.8s | ✓ Pass |

### Lighthouse Scores

| Category | Target | Score |
|----------|--------|-------|
| Performance | ≥90 | TBD |
| Accessibility | ≥90 | TBD |
| Best Practices | ≥90 | TBD |
| SEO | ≥90 | TBD |

### Performance Budgets

| Resource | Budget | Actual |
|----------|--------|--------|
| Total Page Weight | <2MB | TBD |
| JavaScript | <100KB | TBD |
| HTTP Requests | <50 | TBD |
| Third-party Scripts | <5 | TBD |

## Accessibility Compliance

### WCAG AA Requirements

- ✓ Color contrast 4.5:1 (text)
- ✓ Color contrast 3:1 (large text)
- ✓ Keyboard navigation
- ✓ Focus indicators
- ✓ Touch targets ≥48px
- ✓ ARIA landmarks
- ✓ Screen reader compatible
- ✓ Heading hierarchy
- ✓ Image alt text
- ✓ Form labels
- ✓ Skip links
- ✓ Language specified

## Reports and Artifacts

### Generated Reports

All reports saved to `reports/phase6/`:
- `checkpoint-validation-*.txt` - Checkpoint results
- `google-rich-results-*.txt` - Schema validation
- `playwright-report/` - Test results HTML
- `test-results.json` - Test results JSON
- `lighthouse-*/` - Lighthouse audit reports

### Screenshots

Automatically captured on test failure:
- Component rendering
- Accessibility violations
- Performance issues
- Layout problems

### Videos

Automatically recorded on test failure:
- User interaction flows
- Navigation testing
- Mobile responsive behavior

## Continuous Integration

### GitHub Actions Workflow

```yaml
name: Phase 6 Validation

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run phase6:full-validation
      - uses: actions/upload-artifact@v3
        with:
          name: validation-reports
          path: reports/phase6/
```

## Sign-off Criteria

### Ready for Production

All must pass:
- ✓ All E2E tests passing
- ✓ All accessibility tests passing (100% WCAG AA)
- ✓ All performance tests passing (Lighthouse ≥90)
- ✓ All 42 acceptance criteria validated
- ✓ All 5 checkpoint validations passing
- ✓ Google Rich Results validation passing
- ✓ WVWO brand compliance verified
- ✓ No forbidden fonts, colors, or styles
- ✓ No marketing buzzwords in copy
- ✓ Mobile responsive on all devices
- ✓ Works on 3G connections (rural WV)
- ✓ Documentation complete

### Final Deliverables

1. Complete test suite (E2E, accessibility, performance)
2. Validation reports (checkpoints, Rich Results, acceptance)
3. Performance benchmarks (Lighthouse, Core Web Vitals)
4. Accessibility audit (WCAG AA compliance)
5. Brand compliance verification
6. Documentation (usage guide, testing guide)
7. Migration scripts
8. Example data
9. TypeScript types
10. Sign-off checklist

## Troubleshooting

### Test Failures

**E2E failures**:
- Check dev server is running (`npm run preview`)
- Verify test page built correctly (`dist/test/river-template-example/`)
- Check example data exists (`src/content/rivers/new-river.md`)

**Accessibility failures**:
- Run axe-core manually in browser DevTools
- Check contrast ratios with DevTools
- Verify keyboard navigation manually

**Performance failures**:
- Clear build cache (`rm -rf dist .astro`)
- Rebuild project (`npm run build`)
- Check network throttling settings

**Validation failures**:
- Review checkpoint scripts for errors
- Verify file paths are correct
- Check JSON-LD syntax

## Next Steps

After Phase 6 passes:
1. Review all reports with team
2. Address any warnings or recommendations
3. Create final sign-off document
4. Merge to main branch
5. Deploy to staging environment
6. User acceptance testing
7. Production deployment

## Support

Questions or issues:
- Review test output in `reports/phase6/`
- Check Playwright traces for failed tests
- Verify all dependencies installed (`npm install`)
- Ensure Node.js ≥18.x
