# SPEC-14 Quality Checkpoint Guide

## Overview

This guide explains the 5 quality checkpoints for SPEC-14 (RiverTemplate) implementation. Each checkpoint includes automated validation scripts and manual review checklists to ensure WVWO compliance, accessibility, type safety, and SEO standards.

## Quick Start

### Run All Checkpoints (Sequential)

```bash
bash scripts/run-all-checkpoints.sh
```

### Run Individual Checkpoints

```bash
# Checkpoint 1: Type System Review (After Phase 1)
bash scripts/checkpoint-1-validation.sh

# Checkpoint 2: WVWO Compliance (After Phase 2)
bash scripts/checkpoint-2-validation.sh

# Checkpoint 3: Accessibility (After Phase 2)
bash scripts/checkpoint-3-validation.sh

# Checkpoint 4: SEO Schema (After Phase 4)
bash scripts/checkpoint-4-validation.sh

# Checkpoint 5: Integration Testing (After Phase 5)
bash scripts/checkpoint-5-validation.sh
```

## Checkpoint Details

### Checkpoint 1: Type System Review

**When**: After Phase 1 completion
**Time**: 45 minutes (15 min automated + 30 min manual)
**Blocks**: Phase 2 start

**Automated Checks**:

- TypeScript compilation (zero errors)
- No `any` types (except approved cases)
- Zod schema validation
- Type guard discriminators

**Manual Review**:

- JSDoc completeness
- Enum values match WVWO palette
- LakeTemplate pattern consistency
- Documented deviations with justification

**Pass Criteria**: ALL automated checks pass + manual review approved

---

### Checkpoint 2: WVWO Compliance

**When**: After Phase 2 completion
**Time**: 1 hour (20 min automated + 40 min manual)
**Blocks**: Phase 3 start

**Automated Checks**:

- No forbidden fonts (Inter, Poppins, etc.)
- No forbidden border-radius (rounded-md/lg/xl)
- Orange usage calculation (<20% in code)
- No corporate buzzwords
- No forbidden effects (glassmorphism, backdrop-blur)

**Manual Review**:

- Visual inspection: Sharp corners everywhere
- Visual inspection: Orange <5% of screen area
- font-hand ONLY in fishing.kimsTip
- Colors match WVWO palette
- Voice sounds like Kim (authentic rural WV)

**Pass Criteria**: ALL automated checks pass + manual review confirms WVWO aesthetic

---

### Checkpoint 3: Accessibility

**When**: After Phase 2 completion (parallel with Checkpoint 2)
**Time**: 1 hour (15 min automated + 45 min manual)
**Blocks**: Deployment

**Automated Checks**:

- ARIA labels on all sections
- Alt text on all images
- Semantic HTML structure
- No invalid tabindex values
- Touch-friendly sizing classes
- Shape indicators on badges

**Manual Review**:

- axe DevTools audit (zero critical/serious)
- Color contrast ≥4.5:1 (WebAIM Contrast Checker)
- Keyboard navigation (Tab, Enter, Space)
- Touch targets ≥48px (DevTools measurement)
- Screen reader test (NVDA/JAWS/VoiceOver)
- Windows High Contrast mode

**Pass Criteria**: axe audit passes + all manual checks verified

---

### Checkpoint 4: SEO Schema Validation

**When**: After Phase 4 completion
**Time**: 45 minutes (15 min automated + 30 min manual)
**Blocks**: Phase 5 data population

**Automated Checks**:

- JSON-LD schema presence
- TouristAttraction schema with required properties
- LocalBusiness schemas with contact info
- BreadcrumbList schema structure
- Meta tags presence
- JSON-LD syntax validation

**Manual Review**:

- Google Rich Results Test (zero errors)
- Schema.org validator (zero errors)
- Meta tags follow formulas (55-65 char titles, 145-165 char descriptions)
- Breadcrumb matches visual breadcrumb
- All LocalBusiness entities have contact info

**Pass Criteria**: Google Rich Results Test passes + schema validator passes

---

### Checkpoint 5: Integration Testing

**When**: After Phase 5 completion
**Time**: 1.5 hours (30 min automated + 60 min manual)
**Blocks**: SPEC-14 completion

**Automated Checks**:

- Project builds successfully
- All integration tests pass
- File sizes <100KB
- Lighthouse scores ≥90 (Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals (LCP <2.5s, CLS <0.1)

**Manual Review**:

- Visual inspection at breakpoints (375px, 768px, 1024px)
- GPS links open Google Maps
- Phone links open dialer
- External links open in new tab
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Slow connection test (2.5 Mbps)
- Zero layout shifts

**Pass Criteria**: ALL automated tests pass + manual cross-browser verification + Lighthouse ≥90 all categories

---

## Workflow Integration

### Development Flow

```
Phase 1: Types
    ↓
[Checkpoint 1] ← 45 min review
    ↓ (GATE: MUST PASS)
Phase 2: Components
    ↓
[Checkpoint 2] ← 1 hour review (WVWO)
[Checkpoint 3] ← 1 hour review (Accessibility)
    ↓ (GATE: BOTH MUST PASS)
Phase 3: Logic
    ↓
Phase 4: SEO
    ↓
[Checkpoint 4] ← 45 min review
    ↓ (GATE: MUST PASS)
Phase 5: Data
    ↓
[Checkpoint 5] ← 1.5 hour review
    ↓ (GATE: MUST PASS)
SPEC-14 Complete ✅
```

### Failure Handling

1. **Automated Check Fails**: Fix immediately before manual review
2. **Manual Review Finds Issues**: Document in GitHub issue, fix, re-run checkpoint
3. **Multiple Failures**: Consider design review meeting before proceeding

---

## Tools & Resources

### Required Tools

- TypeScript compiler: `npm run typecheck`
- Vitest: `npm test`
- Grep/Bash: For pattern matching
- axe DevTools: Browser extension
- Lighthouse CLI: `npm install -g lighthouse`

### Optional Tools

- NVDA Screen Reader (Windows): Free
- JAWS Screen Reader: Trial available
- WebAIM Contrast Checker: <https://webaim.org/resources/contrastchecker/>
- Google Rich Results Test: <https://search.google.com/test/rich-results>
- Schema.org Validator: <https://validator.schema.org/>

### Browser DevTools

- Chrome DevTools: Lighthouse, Performance, Accessibility tabs
- Firefox Developer Tools: Accessibility inspector
- Safari Web Inspector: Accessibility audit

---

## Troubleshooting

### Checkpoint 1 Failures

**Issue**: TypeScript compilation errors
**Fix**: Review type definitions, ensure Zod schemas match interfaces

**Issue**: `any` types detected
**Fix**: Replace with proper types or add to approved list with justification

### Checkpoint 2 Failures

**Issue**: Forbidden fonts detected
**Fix**: Replace with Bitter (display), Permanent Marker (hand), or Noto Sans (body)

**Issue**: Forbidden border-radius
**Fix**: Replace with rounded-sm ONLY

**Issue**: Orange usage too high
**Fix**: Reduce orange to primary CTAs only (<5% screen area)

### Checkpoint 3 Failures

**Issue**: Color contrast below 4.5:1
**Fix**: Adjust colors to meet WCAG AA standards (use WebAIM Contrast Checker)

**Issue**: Missing ARIA labels
**Fix**: Add aria-labelledby or aria-label to all sections

**Issue**: Touch targets too small
**Fix**: Use min-h-[48px] or h-12/h-16 classes

### Checkpoint 4 Failures

**Issue**: Google Rich Results Test errors
**Fix**: Review schema structure, ensure all required properties present

**Issue**: JSON-LD syntax errors
**Fix**: Validate JSON syntax, check for missing quotes/commas

### Checkpoint 5 Failures

**Issue**: Lighthouse Performance <90
**Fix**: Optimize images, reduce bundle size, defer non-critical JS

**Issue**: LCP >2.5s
**Fix**: Optimize hero image loading, use priority hints

**Issue**: CLS >0.1
**Fix**: Reserve space for images, avoid layout shifts

---

## Sign-Off Template

After completing all checkpoints, use this template for sign-off:

```markdown
## SPEC-14 Quality Checkpoint Sign-Off

**Date**: YYYY-MM-DD
**Reviewer**: [Name]

### Checkpoint Results
- [ ] Checkpoint 1: Type System Review - PASSED
- [ ] Checkpoint 2: WVWO Compliance - PASSED
- [ ] Checkpoint 3: Accessibility - PASSED
- [ ] Checkpoint 4: SEO Schema - PASSED
- [ ] Checkpoint 5: Integration Testing - PASSED

### Review Notes
[Any notable findings, warnings, or recommendations]

### Approval
✅ SPEC-14 meets all quality standards and is approved for completion.

**Signature**: [Name]
**Date**: YYYY-MM-DD
```

---

## Estimated Total Time

| Checkpoint | Automated | Manual | Total |
|------------|-----------|--------|-------|
| 1. Type System | 15 min | 30 min | 45 min |
| 2. WVWO | 20 min | 40 min | 1 hour |
| 3. Accessibility | 15 min | 45 min | 1 hour |
| 4. SEO Schema | 15 min | 30 min | 45 min |
| 5. Integration | 30 min | 60 min | 1.5 hours |
| **TOTAL** | **1h 35min** | **3h 25min** | **5 hours** |

---

## Next Steps

After all checkpoints pass:

1. Create final pull request
2. Request peer review
3. Merge to main branch
4. Update project documentation
5. Archive SPEC-14 to `_completed` folder
6. Create deployment ticket

---

For questions or issues, refer to:

- SPEC-14 specification: `docs/spec-14-river-template.md`
- WVWO style guide: `CLAUDE.md` (Frontend Aesthetics section)
- Accessibility guidelines: WCAG 2.1 AA standards
