# RiverTemplate Acceptance Criteria

## Quality Gates

### Level 1: BLOCKER (Cannot Merge PR)

#### Type System
- [ ] All Zod schemas validate correctly (36/36 tests pass)
- [ ] Type guards function properly
- [ ] No TypeScript compilation errors
- [ ] Runtime validation catches invalid data

#### WVWO Compliance (ZERO TOLERANCE)
- [ ] NO forbidden fonts detected (Inter, Poppins, DM Sans, etc.)
- [ ] NO forbidden border-radius classes (rounded-md, rounded-lg, etc.)
- [ ] Orange usage < 5% of screen real estate
- [ ] ALL color contrast ratios ≥ 4.5:1 (WCAG AA)
- [ ] NO marketing buzzwords in copy

#### Accessibility (WCAG AA)
- [ ] Axe audit passes with 0 violations
- [ ] Keyboard navigation fully functional
- [ ] Screen reader announces all content properly
- [ ] Touch targets ≥ 48x48px
- [ ] Focus indicators visible

---

### Level 2: CRITICAL (Fix Before Release)

#### Component Rendering
- [ ] All 8 sections render correctly with valid data
- [ ] Conditional sections show/hide appropriately
- [ ] Color coding matches specification exactly
- [ ] Links format correctly (tel:, mailto:, https://)
- [ ] External links have security attributes
- [ ] Responsive grids work at all breakpoints

#### SEO Schema
- [ ] Schema.org validator passes
- [ ] Google Rich Results Test passes
- [ ] All required schema fields present
- [ ] GeoCoordinates format correct
- [ ] BreadcrumbList matches visual breadcrumb
- [ ] Image URLs are absolute paths

#### Performance
- [ ] Lighthouse performance score ≥ 85
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Bundle size < 100KB gzipped
- [ ] Images optimized (WebP format)
- [ ] Lazy loading implemented

---

### Level 3: IMPORTANT (Fix in Next Iteration)

#### Visual Polish
- [ ] Spacing consistent throughout
- [ ] Typography hierarchy clear
- [ ] Hover states on interactive elements
- [ ] Loading states for dynamic content
- [ ] Empty states handled gracefully

#### Edge Cases
- [ ] Handles missing optional fields
- [ ] Handles empty arrays
- [ ] Handles extremely long text
- [ ] Handles special characters in names
- [ ] Handles rivers with 20+ rapids

#### Documentation
- [ ] Component props documented
- [ ] Test coverage documented
- [ ] WVWO compliance guide updated
- [ ] README has usage examples

---

## Test Coverage Requirements

### Unit Tests (Target: ≥90%)
- **Type System**: 36 tests
  - OutfitterSchema: 10 tests
  - RapidClassSchema: 8 tests
  - SeasonalFlowSchema: 7 tests
  - RiverAdventureSchema: 15 tests
  - Type Guards: 6 tests

### Component Tests (Target: ≥85%)
- **Rendering**: 15 tests
- **Color Coding**: 12 tests
- **Link Formatting**: 4 tests
- **Responsive Grids**: 3 tests
- **Optional Fields**: 5 tests

### Compliance Tests (Target: 100%)
- **WVWO Compliance**: 11 tests
  - Font compliance: 4 tests
  - Border radius: 2 tests
  - Orange usage: 2 tests
  - Color contrast: 2 tests
  - Copy voice: 1 test

### Integration Tests (Target: ≥80%)
- **SEO Schema**: 8 tests
- **Accessibility**: 10 tests
- **Performance**: 6 tests
- **E2E User Flows**: 5 tests

---

## Manual Testing Checklist

### Visual Inspection (WVWO Compliance)
- [ ] Display headings use Bitter (serif)
- [ ] Kim's notes use Permanent Marker (handwritten)
- [ ] Body text uses Noto Sans (sans-serif)
- [ ] All cards use sharp corners or rounded-sm only
- [ ] Orange only appears in primary CTAs
- [ ] Brand brown (#3E2723) is prominent
- [ ] Brand cream (#FFF8E1) used for light backgrounds
- [ ] Copy sounds like Kim (rural WV authentic)
- [ ] No tech startup aesthetic

### Keyboard Navigation
- [ ] Tab through all interactive elements in logical order
- [ ] Enter key activates buttons and links
- [ ] Escape key closes modals/dropdowns (if present)
- [ ] Arrow keys navigate within components (if applicable)
- [ ] Focus order matches visual layout
- [ ] Focus never gets trapped

### Screen Reader Testing (NVDA/JAWS)
- [ ] Page title announces correctly
- [ ] Landmarks identified (nav, main, footer)
- [ ] Headings announce with correct level
- [ ] Links announce with descriptive text
- [ ] Buttons announce with clear purpose
- [ ] Images announce with meaningful alt text
- [ ] Tables have proper headers (if present)

### Mobile Testing (Physical Device)
- [ ] Touch targets easy to tap (≥48px)
- [ ] Text readable without zooming
- [ ] Grids collapse appropriately
- [ ] No horizontal scrolling
- [ ] Performance acceptable on 3G/4G

### Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Firefox (desktop)
- [ ] Safari (desktop & iOS)
- [ ] Edge (desktop)

---

## Performance Benchmarks

### Rural WV Network Simulation (2-5 Mbps)
- **Load Time**: < 3 seconds
- **LCP**: < 2.5 seconds
- **FID**: < 100ms
- **CLS**: < 0.1
- **TTI**: < 3.5 seconds

### Bundle Size
- **JavaScript**: < 50KB gzipped
- **CSS**: < 20KB gzipped
- **Images**: WebP format, appropriately sized
- **Total**: < 100KB gzipped

### Lighthouse Scores (Mobile, Throttled)
- **Performance**: ≥ 85
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 90
- **SEO**: ≥ 95

---

## Review Checklist for PR Approval

### Code Quality
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] No TODO comments (create issues instead)
- [ ] Consistent code style
- [ ] Meaningful variable/function names

### Testing
- [ ] All automated tests pass
- [ ] Test coverage meets targets
- [ ] Manual testing completed
- [ ] No regressions introduced

### WVWO Compliance
- [ ] Visual inspection passed
- [ ] Compliance tests passed
- [ ] Copy reviewed by stakeholder (if possible)
- [ ] "Would Kim's neighbors recognize this?" → YES

### Documentation
- [ ] Component usage documented
- [ ] Type definitions clear
- [ ] Breaking changes noted
- [ ] Migration guide provided (if needed)

---

## Sign-Off

### Developer
- [ ] All Level 1 blockers resolved
- [ ] All Level 2 critical issues resolved
- [ ] Level 3 important issues documented as issues
- [ ] Code reviewed by at least one other developer

### QA/Tester
- [ ] All automated tests passed
- [ ] Manual testing completed
- [ ] Cross-browser testing completed
- [ ] Mobile testing completed
- [ ] Accessibility testing completed

### Stakeholder (Kim/WVWO)
- [ ] Visual design matches WVWO brand
- [ ] Copy sounds authentic
- [ ] Functionality meets requirements
- [ ] "Looks like our shop online" → YES

---

## Estimated Testing Timeline

### Day 1 (4 hours)
- **09:00-10:00**: Set up test infrastructure
- **10:00-11:30**: Write and run type system tests
- **11:30-13:00**: Write and run component tests
- **13:00-14:00**: Write and run WVWO compliance tests

### Day 2 (2 hours)
- **09:00-09:30**: Write and run accessibility tests
- **09:30-10:00**: Write and run performance tests
- **10:00-10:30**: Write and run E2E tests
- **10:30-11:00**: Manual testing and sign-off

---

## Success Metrics

**Definition of Done**:
1. All Level 1 blockers resolved (100%)
2. All Level 2 critical issues resolved (100%)
3. Test coverage ≥ 85% overall
4. WVWO compliance validation passes
5. Performance benchmarks met
6. Accessibility audit passes
7. Manual testing completed
8. PR approved by 2+ reviewers

**Release Readiness**:
- All quality gates passed
- Documentation complete
- Stakeholder sign-off received
- No known P0/P1 bugs
