# RiverTemplate Testing & Validation Strategy

## Executive Summary

Comprehensive testing strategy for RiverTemplate implementation covering type safety, component rendering, SEO compliance, accessibility, performance, and WVWO brand compliance.

**Estimated Effort**: 4-6 hours
**Test Coverage Target**: ≥90% for critical paths
**Validation Tools**: Vitest, Axe, Lighthouse, Custom WVWO validator

---

## 1. Type System Testing (Phase 1)

### Test File Location
`wv-wild-web/src/types/__tests__/river-types.test.ts`

### Coverage Areas

#### Zod Schema Validation
- Valid input acceptance
- Invalid input rejection with clear error messages
- Type inference correctness
- Runtime validation behavior

#### Test Cases Summary

**OutfitterSchema**: 10 tests
- Valid contact methods (phone, email, website, combinations)
- Reject missing contact methods
- Reject invalid formats

**RapidClassSchema**: 8 tests
- Valid Class I-VI
- Valid modifiers (II+, III-IV)
- Reject invalid classes

**RiverAdventureSchema**: 12 tests
- Complete river with all fields
- Optional fields handling
- Empty arrays
- Field validation

**Type Guards**: 6 tests
- isRiverAdventure, hasRapids, hasOutfitters

### Validation Commands

```bash
npm test -- src/types/__tests__/river-types.test.ts
npm test -- --coverage src/types/__tests__/river-types.test.ts
npm test -- --watch src/types/__tests__/river-types.test.ts
```

---

## 2. Component Rendering Testing (Phase 2)

### Test File Location
`wv-wild-web/src/components/templates/__tests__/RiverTemplate.test.ts`

### Coverage Areas

#### Section Rendering (15 tests)
- Hero section with name, location, difficulty
- Overview section with description
- Rapids section (conditional)
- Water Levels section
- Outfitters section (conditional)
- Access Points section (conditional)
- Kim's Tip section (conditional)
- Fishing Info section

#### Color Coding (12 tests)
- Rapid classes (I→green, III→yellow, V→red)
- Water levels (Low→blue, High→orange, Flood→red)
- Access types (Public→green, Private→yellow, Fee→blue)

#### Link Formatting (4 tests)
- Phone links strip non-digits
- Email links use mailto:
- External links have security attributes
- Links open appropriately

#### Responsive Grids (3 tests)
- Rapids grid breakpoints
- Outfitters grid breakpoints
- Access points grid breakpoints

### Validation Commands

```bash
npm test -- src/components/templates/__tests__/RiverTemplate.test.ts
npm run test:visual
npm run test:a11y
```

---

## 3. WVWO Compliance Testing

### Test File Location
`wv-wild-web/src/utils/__tests__/wvwo-compliance.test.ts`

### Automated Checks

#### Font Compliance (4 tests)
- No forbidden fonts (Inter, Poppins, DM Sans, etc.)
- Only approved fonts used (Bitter, Permanent Marker, Noto Sans)
- Permanent Marker only in Kim's notes
- Correct font usage contexts

#### Border Radius Compliance (2 tests)
- No forbidden radius classes (rounded-md, lg, xl, 2xl, 3xl)
- Only rounded-sm or sharp corners

#### Orange Usage Compliance (2 tests)
- Orange usage < 5% of screen
- Orange only in CTA buttons

#### Color Contrast Compliance (2 tests)
- All badges meet WCAG AA (≥4.5:1)
- CTA buttons readable

#### Copy Voice Compliance (1 test)
- No forbidden buzzwords

### Manual Checklist

```markdown
## Visual Inspection
- [ ] Display headings use Bitter
- [ ] Kim's notes use Permanent Marker
- [ ] Body text uses Noto Sans
- [ ] All cards use sharp/rounded-sm only
- [ ] Orange only in primary CTAs
- [ ] Copy sounds like Kim
- [ ] No tech buzzwords
```

---

## 4. SEO Schema Testing

### Test File Location
`wv-wild-web/src/utils/__tests__/seo-schema.test.ts`

### Coverage Areas (8 tests)
- @graph structure validates
- TouristAttraction has required fields
- LocalBusiness entities have contact info
- GeoCoordinates format correct
- AggregateRating within valid range
- BreadcrumbList matches visual
- Image URLs are absolute
- All URLs valid

### Validation Tools
- Schema.org Validator: https://validator.schema.org/
- Google Rich Results Test: https://search.google.com/test/rich-results
- Structured Data Linter: http://linter.structured-data.org/

### Commands

```bash
npm run test:schema
npx schema-dts validate dist/rivers/gauley-river.html
```

---

## 5. Accessibility Testing (WCAG AA)

### Test File Location
`wv-wild-web/src/utils/__tests__/accessibility.test.ts`

### Coverage Areas (10 tests)
- Color contrast ≥ 4.5:1
- Rapid badges have shape icons
- aria-labelledby on sections
- Touch targets ≥ 48px
- Heading hierarchy correct
- Images have alt text
- Focus indicators visible
- Keyboard navigation
- Screen reader support

### Manual Testing Checklist

```markdown
## Keyboard Navigation
- [ ] Tab through all elements
- [ ] Enter activates buttons/links
- [ ] Focus order logical
- [ ] Focus never trapped

## Screen Reader (NVDA/JAWS)
- [ ] Page title announces
- [ ] Landmarks identified
- [ ] Headings with levels
- [ ] Links descriptive
```

---

## 6. Performance Testing

### Test File Location
`wv-wild-web/src/utils/__tests__/performance.test.ts`

### Target Metrics (Rural WV: 2-5 Mbps)
- Load Time: < 3 seconds
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- Bundle Size: < 100KB (gzipped)
- Time to Interactive: < 3.5s

### Coverage Areas (6 tests)
- Bundle size under 100KB
- Lighthouse performance score ≥85
- LCP under 2.5s
- CLS under 0.1
- Images optimized (WebP)
- Lazy loading implemented

### Commands

```bash
npm run lighthouse -- --url=http://localhost:4321/rivers/gauley-river
npm run build && du -sh dist
npm run test:performance
```

---

## 7. Integration Testing (E2E)

### Test File Location
`wv-wild-web/tests/e2e/river-template.spec.ts`

### User Flows (5 tests)
- Navigate to river detail page
- View rapids information
- Contact outfitters
- Mobile navigation
- Breadcrumb navigation

### Commands

```bash
npm run test:e2e
npx playwright test
```

---

## 8. Test Execution Plan

### Phase Schedule

**Phase 1: Unit Tests** (1 hour)
```bash
npm test -- src/types/__tests__/
npm test -- src/utils/__tests__/
```

**Phase 2: Component Tests** (1.5 hours)
```bash
npm test -- src/components/__tests__/
npm run test:visual
```

**Phase 3: Compliance Validation** (1 hour)
```bash
npm run test:wvwo-compliance
npm run test:schema
npm run test:a11y
```

**Phase 4: Performance Testing** (30 min)
```bash
npm run lighthouse
npm run test:performance
```

**Phase 5: E2E Testing** (1 hour)
```bash
npm run test:e2e
```

---

## 9. Acceptance Criteria

### Pass/Fail Checklist

**Type System** (Must Pass):
- [ ] All Zod schemas validate correctly
- [ ] Type guards work as expected
- [ ] No TypeScript errors

**Component Rendering** (Must Pass):
- [ ] All 8 sections render correctly
- [ ] Conditional sections work properly
- [ ] Color coding matches spec
- [ ] Links format correctly

**WVWO Compliance** (ZERO TOLERANCE):
- [ ] No forbidden fonts detected
- [ ] No forbidden border-radius
- [ ] Orange usage < 5%
- [ ] All contrast ratios ≥ 4.5:1
- [ ] No buzzwords

**SEO Schema** (Must Pass):
- [ ] Schema.org validator passes
- [ ] Google Rich Results passes
- [ ] All required fields present

**Accessibility** (Must Pass):
- [ ] Axe audit passes (0 violations)
- [ ] WCAG AA compliance
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

**Performance** (Must Pass):
- [ ] Lighthouse score ≥ 85
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Bundle size < 100KB

### Quality Gates

**Level 1: Blocker** (Cannot merge)
- Type system failures
- WVWO compliance violations
- Accessibility failures

**Level 2: Critical** (Fix before release)
- Performance below target
- SEO schema errors
- Broken navigation

**Level 3: Important** (Fix next iteration)
- Visual polish
- Edge cases
- Documentation gaps

---

## 10. Tools & Dependencies

```json
{
  "devDependencies": {
    "vitest": "^0.34.0",
    "@testing-library/react": "^14.0.0",
    "@playwright/test": "^1.38.0",
    "jest-axe": "^8.0.0",
    "lighthouse": "^11.0.0",
    "chrome-launcher": "^0.15.2",
    "jsdom": "^22.1.0",
    "@axe-core/playwright": "^4.7.0"
  }
}
```

### Installation

```bash
npm install -D vitest @testing-library/react @playwright/test jest-axe lighthouse chrome-launcher jsdom @axe-core/playwright
```

---

## Summary

**Total Test Files**: 7
**Total Test Cases**: ~85 automated tests
**Estimated Effort**: 4-6 hours
**Coverage Target**: ≥90% critical paths
**Quality Gates**: 3 levels (Blocker, Critical, Important)
