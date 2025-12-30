# Phase 6 Execution Checklist - SPEC-14

**Date**: 2025-12-30
**Executor**: [Name]

---

## Pre-Execution Checklist

### Prerequisites ✅

- [x] Phase 5 example data complete (`src/content/rivers/new-river.md`)
- [x] Test page created (`src/pages/test/river-template-example.astro`)
- [x] All dependencies installed (`npm install`)
- [x] Playwright browsers installed (`npx playwright install`)
- [x] Site builds successfully (`npm run build`)

### Environment Check

```bash
# Verify Node.js version (≥18.x required)
node --version

# Verify dependencies
npm list @playwright/test
npm list @axe-core/playwright
npm list playwright-lighthouse

# Verify build
npm run build
# Should complete without errors

# Verify preview server
npm run preview
# Navigate to http://localhost:4321/test/river-template-example
# Should render river page
```

---

## Execution Steps

### Step 1: E2E Integration Tests

**Command**:
```bash
npm run test:e2e
```

**Expected**:
- ✓ 12/12 tests passing
- 0 failures
- All sections render correctly
- JSON-LD valid
- Navigation works
- Mobile responsive

**If Failed**:
1. Check test page URL: http://localhost:4321/test/river-template-example
2. Verify example data: `src/content/rivers/new-river.md`
3. Check browser console for errors
4. Review Playwright trace: `npx playwright show-trace`

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Passed | ❌ Failed

**Notes**:
_______________________________________________________________________

---

### Step 2: Accessibility Tests

**Command**:
```bash
npm run test:accessibility
```

**Expected**:
- ✓ 18/18 tests passing
- 0 WCAG violations
- Color contrast 4.5:1 (text), 3:1 (large text)
- Keyboard navigation works
- Touch targets ≥44px
- ARIA landmarks present

**If Failed**:
1. Run axe DevTools extension manually
2. Check color contrast in DevTools
3. Test keyboard navigation manually (Tab, Enter, Escape)
4. Verify ARIA attributes in Elements panel

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Passed | ❌ Failed

**Violations Found**: _________________

**Notes**:
_______________________________________________________________________

---

### Step 3: Performance Tests

**Command**:
```bash
npm run test:performance
```

**Expected**:
- ✓ 17/17 tests passing
- Lighthouse Performance ≥90
- Lighthouse Accessibility ≥90
- Lighthouse Best Practices ≥90
- Lighthouse SEO ≥90
- LCP <2.5s
- FID <100ms
- CLS <0.1

**If Failed**:
1. Run Lighthouse manually in Chrome DevTools
2. Check bundle sizes: `ls -lh dist/_astro/`
3. Verify image optimization
4. Check network waterfall for blocking resources

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Passed | ❌ Failed

**Lighthouse Scores**:
- Performance: _____
- Accessibility: _____
- Best Practices: _____
- SEO: _____

**Notes**:
_______________________________________________________________________

---

### Step 4: Acceptance Criteria Validation

**Command**:
```bash
npm run test:validation
```

**Expected**:
- ✓ 26/26 tests passing
- All 42 acceptance criteria validated
- WVWO brand compliance verified
- No forbidden fonts (Inter, Poppins, etc.)
- No forbidden colors (purple, hot pink)
- No forbidden styles (glassmorphism)
- No marketing buzzwords

**If Failed**:
1. Review specific failing criteria
2. Check component files exist
3. Verify frontmatter in example data
4. Test WVWO brand compliance manually

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Passed | ❌ Failed

**Failed Criteria**: _________________

**Notes**:
_______________________________________________________________________

---

### Step 5: Checkpoint Validations

**Command**:
```bash
npm run validate:checkpoints
```

**Expected**:
- ✓ Checkpoint 1: Type System Review (PASSED)
- ✓ Checkpoint 2: WVWO Compliance (PASSED)
- ✓ Checkpoint 3: Accessibility (PASSED)
- ✓ Checkpoint 4: SEO Schema (PASSED)
- ✓ Checkpoint 5: Integration Testing (PASSED)

**If Failed**:
1. Run individual checkpoints: `bash scripts/checkpoint-N-validation.sh`
2. Review checkpoint script output
3. Fix reported issues
4. Re-run checkpoints

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Passed | ❌ Failed

**Checkpoint Results**:
- CP1: _____
- CP2: _____
- CP3: _____
- CP4: _____
- CP5: _____

**Notes**:
_______________________________________________________________________

---

### Step 6: Google Rich Results Validation

**Command**:
```bash
npm run validate:rich-results
```

**Expected**:
- ✓ Valid @context and @graph
- ✓ Place entity complete
- ✓ TouristAttraction entity complete
- ✓ GeoCoordinates valid
- 0 errors
- 0-2 warnings (optional entities)

**If Failed**:
1. Review report: `reports/phase6/google-rich-results-*.txt`
2. Check JSON-LD syntax
3. Verify required fields in example data
4. Test schema manually at https://search.google.com/test/rich-results

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Passed | ❌ Failed

**Errors**: _____
**Warnings**: _____

**Manual Google Rich Results Test**:
- [x] Schema pasted into tool
- [x] Screenshot captured
- [x] All entities recognized
- [x] No critical issues

**Screenshot Path**: _______________________________________________________________________

**Notes**:
_______________________________________________________________________

---

### Step 7: Full Validation Suite

**Command**:
```bash
npm run phase6:full-validation
```

**Expected**:
- ✓ Build successful
- ✓ All checkpoints passed
- ✓ Rich Results validation passed
- ✓ All test suites passed (E2E, accessibility, performance, acceptance)
- Total duration: ~5-10 minutes

**If Failed**:
1. Review which step failed
2. Run individual test suites for debugging
3. Check all reports in `reports/phase6/`

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Passed | ❌ Failed

**Duration**: _____ minutes

**Notes**:
_______________________________________________________________________

---

## Post-Execution Checklist

### Reports Review

- [ ] Review `reports/phase6/checkpoint-validation-*.txt`
- [ ] Review `reports/phase6/google-rich-results-*.txt`
- [ ] Review `reports/phase6/lighthouse-*/report.html`
- [ ] Review `reports/phase6/playwright-report/index.html`
- [ ] Review `reports/phase6/test-results.json`

### Manual Verification

#### WVWO Brand Compliance

- [ ] Fonts: Bitter (headings), Noto Sans (body), Permanent Marker (accents)
- [ ] Colors: Brand palette only (brown, green, cream, orange)
- [ ] Corners: Sharp edges (rounded-sm = 2px only)
- [ ] No glassmorphism or backdrop-blur
- [ ] Copy: No marketing buzzwords

#### Accessibility

- [ ] Tab through all interactive elements (keyboard navigation)
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Verify color contrast with DevTools
- [ ] Check touch targets on mobile device

#### Performance

- [ ] Run Lighthouse in Chrome DevTools (incognito mode)
- [ ] Test on 3G throttled connection
- [ ] Verify images lazy-load
- [ ] Check font loading (no FOIT)

#### SEO

- [ ] Copy JSON-LD to Google Rich Results Test
- [ ] Verify all meta tags present
- [ ] Check canonical URL
- [ ] Verify Open Graph tags

### Screenshots

Capture and save:
- [ ] Desktop view (1920x1080)
- [ ] Mobile view (390x844 - iPhone 12)
- [ ] Tablet view (1024x1366 - iPad Pro)
- [ ] Lighthouse report
- [ ] Google Rich Results Test
- [ ] Playwright test report
- [ ] axe DevTools results

**Screenshot Directory**: `reports/phase6/screenshots/`

---

## Validation Report

### Fill Out Template

Use: `docs/phase6-validation-report-template.md`

Fill in:
- [ ] Executive Summary (status, totals)
- [ ] E2E test results
- [ ] Accessibility results (WCAG AA)
- [ ] Performance results (Lighthouse, Core Web Vitals)
- [ ] Acceptance criteria results
- [ ] Checkpoint results
- [ ] Google Rich Results validation
- [ ] WVWO brand compliance
- [ ] Mobile responsiveness
- [ ] Rural WV bandwidth testing
- [ ] Documentation review
- [ ] Issues and recommendations
- [ ] Sign-off checklist
- [ ] Final recommendation

**Report Path**: `reports/phase6/VALIDATION-REPORT-FINAL.md`

---

## Stakeholder Sign-off

### Required Approvals

- [ ] **Product Owner**: All acceptance criteria met
- [ ] **UX/Accessibility Lead**: 100% WCAG AA compliance
- [ ] **Performance Lead**: Lighthouse ≥90, Core Web Vitals green
- [ ] **Brand Manager**: WVWO compliance verified (fonts, colors, copy)
- [ ] **Technical Lead**: Code quality and architecture approved

**Sign-off Date**: _______________________

---

## Final Steps

### Code Review

- [ ] Create PR: `feature/spec-14-lake-template` → `main`
- [ ] Request reviews from team
- [ ] Address review feedback
- [ ] Squash commits if needed
- [ ] Update PR description with validation report link

### Merge

- [ ] All CI/CD checks passing
- [ ] All reviews approved
- [ ] No merge conflicts
- [ ] Merge to main
- [ ] Delete feature branch

### Deployment

- [ ] Deploy to staging environment
- [ ] Run smoke tests on staging
- [ ] User acceptance testing
- [ ] Deploy to production
- [ ] Monitor error logs

---

## Success Criteria

Phase 6 is **COMPLETE** when:

- ✅ All 73 automated tests passing
- ✅ 0 WCAG violations (100% Level AA compliance)
- ✅ All Lighthouse scores ≥90
- ✅ All 42 acceptance criteria validated
- ✅ All 5 checkpoints passing
- ✅ Google Rich Results validation passing (0 errors)
- ✅ WVWO brand compliance verified
- ✅ Manual testing complete (keyboard, screen reader, mobile)
- ✅ All stakeholders approved
- ✅ Validation report finalized
- ✅ Code merged to main
- ✅ Deployed to production

---

## Issues Log

Document any issues encountered:

### Issue 1

**Description**: _______________________________________________________________________

**Severity**: ⬜ Critical | ⬜ High | ⬜ Medium | ⬜ Low

**Resolution**: _______________________________________________________________________

**Status**: ⬜ Open | ⬜ In Progress | ⬜ Resolved

---

### Issue 2

**Description**: _______________________________________________________________________

**Severity**: ⬜ Critical | ⬜ High | ⬜ Medium | ⬜ Low

**Resolution**: _______________________________________________________________________

**Status**: ⬜ Open | ⬜ In Progress | ⬜ Resolved

---

## Notes

_______________________________________________________________________
_______________________________________________________________________
_______________________________________________________________________
_______________________________________________________________________

---

## Execution Summary

**Start Time**: _______________________
**End Time**: _______________________
**Total Duration**: _______________________

**Final Status**: ⬜ PASS | ⬜ FAIL | ⬜ PASS WITH WARNINGS

**Executor Signature**: _______________________
**Date**: _______________________

---

**Next Phase**: Merge to main and deploy to production
