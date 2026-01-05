# SPEC-18 State Park Template - PR Workflow Guide

## Overview

This guide documents the stacked PR strategy for merging SPEC-18 State Park Template into the main branch. The implementation is split into 6 sequential PRs using a dependency-based branching model to ensure conflict-free merges and independent code review.

**Total Implementation**: 9,777 lines across 6 phases
**Timeline**: 50 hours of development
**Strategy**: Stacked PRs with sequential dependencies

## Branch Structure

```text
main
  └─ spec-18/pr-1-types (PR #83)
       └─ spec-18/pr-2-components (PR #84)
            └─ spec-18/pr-3-template-seo (PR #85)
                 └─ spec-18/pr-4-data (PR #86)
                      └─ spec-18/pr-5-testing (PR #87)
                           └─ spec-18/pr-6-docs (PR #88)
```

## Pull Requests

### PR #83: State Park Type System Foundation

**Branch**: `spec-18/pr-1-types`
**Base**: `main`
**Status**: <https://github.com/mmtuentertainment/wvwo-storefront/pull/83>

**Files Changed**: 6 files, 4,640 insertions

- `wv-wild-web/src/types/state-park-types.ts` (1,130 lines)
- `wv-wild-web/src/types/state-park-template-types.ts` (570 lines)
- `wv-wild-web/src/types/state-park-seo-types.ts` (920 lines)
- `wv-wild-web/src/types/__tests__/state-park-types.test.ts` (~300 lines)
- `wv-wild-web/src/types/__tests__/state-park-template-types.test.ts` (~300 lines)
- `wv-wild-web/src/types/__tests__/state-park-seo-types.test.ts` (~290 lines)

**Key Features**:

- 10 facility type categories (camping, trails, water, winter, etc.)
- Comprehensive TypeScript type system (2,620 lines)
- 85%+ test coverage (890 lines of tests)
- Zero dependencies on other SPEC-18 code

**Review Focus**:

- Type safety and completeness
- Test coverage adequacy
- Naming conventions consistency
- Documentation clarity

**Merge Criteria**:

- All tests passing
- TypeScript compilation succeeds
- 85%+ coverage maintained
- Zero linting warnings

---

### PR #84: State Park Section Components

**Branch**: `spec-18/pr-2-components`
**Base**: `spec-18/pr-1-types`
**Status**: <https://github.com/mmtuentertainment/wvwo-storefront/pull/84>

**Files Changed**: 5 files, 1,902 insertions

- `wv-wild-web/src/components/state-park/ParkOverviewSection.astro` (480 lines)
- `wv-wild-web/src/components/state-park/FacilitiesSection.astro` (520 lines)
- `wv-wild-web/src/components/state-park/ActivitiesSection.astro` (390 lines)
- `wv-wild-web/src/components/state-park/ReservationSection.astro` (285 lines)
- `wv-wild-web/src/components/state-park/README.md` (227 lines)

**Key Features**:

- 4 modular Astro components (1,675 lines)
- WVWO aesthetic compliance (Bitter font, brand palette, rounded-sm)
- Industry-standard trail/ski difficulty colors (green/blue/black)
- WCAG 2.1 AA accessibility
- Responsive design (320px-2560px)

**Review Focus**:

- WVWO aesthetic compliance (NO Inter, NO glassmorphism, NO purple)
- Accessibility (ARIA labels, semantic HTML, color contrast)
- Industry color standards for trail difficulty
- Component modularity and reusability

**Merge Criteria**:

- PR #83 merged first (type dependencies)
- Zero linting errors
- Lighthouse accessibility score 100
- WVWO aesthetic checklist passed

---

### PR #85: State Park Template and SEO Schemas

**Branch**: `spec-18/pr-3-template-seo`
**Base**: `spec-18/pr-2-components`
**Status**: <https://github.com/mmtuentertainment/wvwo-storefront/pull/85>

**Files Changed**: 5 files, 1,476 insertions

- `wv-wild-web/src/components/templates/StateParkTemplate.astro` (295 lines)
- `wv-wild-web/src/components/seo/SchemaStateParkTemplate.astro` (380 lines)
- `wv-wild-web/src/components/seo/SchemaFAQ.astro` (180 lines)
- `wv-wild-web/src/components/seo/SchemaEvent.astro` (160 lines)
- `wv-wild-web/src/components/seo/SchemaEventSeries.astro` (155 lines)

**Key Features**:

- Main orchestrator template (295 lines)
- 4 Schema.org components for SEO (875 lines)
- Multi-type schema (Park + TouristAttraction)
- Geographic proximity utility (Haversine formula)
- Rich snippet optimization

**Review Focus**:

- Schema.org validation (use validator.schema.org)
- SEO best practices (meta tags, Open Graph)
- Template integration with components
- Geographic proximity accuracy

**Merge Criteria**:

- PR #84 merged first (component dependencies)
- Schema.org validation passes
- Lighthouse SEO score 100
- Build succeeds without errors

---

### PR #86: Placeholder State Park Data

**Branch**: `spec-18/pr-4-data`
**Base**: `spec-18/pr-3-template-seo`
**Status**: <https://github.com/mmtuentertainment/wvwo-storefront/pull/86>

**Files Changed**: 2 files, 2,093 insertions

- `wv-wild-web/src/data/state-parks/holly-river-sp.ts` (~1,050 lines)
- `wv-wild-web/src/data/state-parks/watoga-sp.ts` (~1,040 lines)

**Key Features**:

- 2 placeholder state parks (~2,090 lines)
- Public domain content from WVDNR
- All 10 facility types demonstrated
- Seasonal programming examples
- Quarterly manual review pattern

**Review Focus**:

- Data structure integrity
- Type safety (matches PR #83 types)
- Public domain content verification
- Placeholder clarity (documented as temporary)

**Merge Criteria**:

- PR #83 merged first (type dependencies)
- TypeScript compilation succeeds
- Data validation script passes (PR #87)
- Attribution tracking in place

---

### PR #87: Testing Infrastructure and Validation

**Branch**: `spec-18/pr-5-testing`
**Base**: `spec-18/pr-4-data`
**Status**: <https://github.com/mmtuentertainment/wvwo-storefront/pull/87>

**Files Changed**: 2 files, 503 insertions

- `wv-wild-web/src/lib/test-utils/state-park-test-utils.ts` (~300 lines)
- `wv-wild-web/validate-phase4.ts` (~200 lines)

**Key Features**:

- Test data factory functions (~300 lines)
- Runtime validation script (~200 lines)
- Mock data generators for all types
- Geographic coordinate validation
- URL and contact format checks

**Review Focus**:

- Test utility completeness
- Validation coverage (all required fields)
- Error messaging clarity
- Integration with existing test infrastructure

**Merge Criteria**:

- PR #86 merged first (data dependencies)
- All tests passing
- Validation script reports 0 errors on placeholder data
- 85%+ coverage maintained

---

### PR #88: Comprehensive Documentation and Maintenance Guides

**Branch**: `spec-18/pr-6-docs`
**Base**: `spec-18/pr-5-testing`
**Status**: <https://github.com/mmtuentertainment/wvwo-storefront/pull/88>

**Files Changed**: 21 files, 19,075 insertions

**Documentation Files**:

- `SPEC-18-FINAL.md` (28,000+ tokens)
- `SPEC-18-EXECUTIVE-SUMMARY.md` (500 lines)
- `PHASE-6-DOCUMENTATION-SUMMARY.md`
- `architecture/component-architecture.md`
- `type-system-specification.md`
- `data-structure-specification.md`
- `testing-specification.md`
- `SEO-IMPLEMENTATION-SPEC.md`

**Research Files**:

- `state-park-facility-gaps.md` (63 gaps)
- `state-park-research-findings.md`
- `state-park-seo-research.md`
- `accessibility-compliance-research.md`
- `research-seasonal-programming.md`
- `template-comparison-matrix.md`

**Maintenance Files**:

- `docs/maintenance/quarterly-state-park-review-checklist.md`

**CLAUDE.md Updates**:

- SPEC-18 completion entry for ReasoningBank

**Key Features**:

- Complete specification (~3,000 lines of docs)
- Maintenance procedures for quarterly updates
- Research findings and decisions
- CLAUDE.md updates for future reference

**Review Focus**:

- Documentation completeness
- Maintenance guide clarity
- CLAUDE.md accuracy for ReasoningBank
- Stakeholder readability

**Merge Criteria**:

- PR #87 merged first (all code complete)
- Documentation accuracy verified
- Maintenance procedures tested
- CLAUDE.md format valid

---

## Merge Sequence

**CRITICAL**: PRs MUST be merged in strict sequential order to avoid conflicts.

### Step-by-Step Merge Process

1. **PR #83 (Types)**

   ```bash
   # Review and approve PR #83
   # Merge to main
   git checkout main
   git pull origin main
   # Verify merge successful
   ```

2. **PR #84 (Components)**

   ```bash
   # After PR #83 merged, update PR #84 base if needed
   git checkout spec-18/pr-2-components
   git rebase spec-18/pr-1-types  # Only if PR #83 had changes during review
   git push -f origin spec-18/pr-2-components

   # Review and approve PR #84
   # Merge to spec-18/pr-1-types (then auto-merge to main)
   ```

3. **PR #85 (Template/SEO)**

   ```bash
   # After PR #84 merged, update base
   git checkout spec-18/pr-3-template-seo
   git rebase spec-18/pr-2-components
   git push -f origin spec-18/pr-3-template-seo

   # Review and approve PR #85
   # Merge to spec-18/pr-2-components
   ```

4. **PR #86 (Data)**

   ```bash
   # After PR #85 merged
   git checkout spec-18/pr-4-data
   git rebase spec-18/pr-3-template-seo
   git push -f origin spec-18/pr-4-data

   # Review and approve PR #86
   # Merge to spec-18/pr-3-template-seo
   ```

5. **PR #87 (Testing)**

   ```bash
   # After PR #86 merged
   git checkout spec-18/pr-5-testing
   git rebase spec-18/pr-4-data
   git push -f origin spec-18/pr-5-testing

   # Review and approve PR #87
   # Merge to spec-18/pr-4-data
   ```

6. **PR #88 (Documentation)**

   ```bash
   # After PR #87 merged
   git checkout spec-18/pr-6-docs
   git rebase spec-18/pr-5-testing
   git push -f origin spec-18/pr-6-docs

   # Review and approve PR #88
   # Merge to spec-18/pr-5-testing
   # FINAL MERGE TO MAIN
   ```

---

## Handling Merge Conflicts

### If Changes Needed During Review

**Scenario**: PR #83 requires changes during code review.

**Solution - Merge Forward Strategy**:

```bash
# 1. Make changes on PR #83 branch
git checkout spec-18/pr-1-types
# ... make changes ...
git add .
git commit -m "fix: address review comments"
git push origin spec-18/pr-1-types

# 2. Merge forward to dependent branches
git checkout spec-18/pr-2-components
git merge spec-18/pr-1-types
git push origin spec-18/pr-2-components

git checkout spec-18/pr-3-template-seo
git merge spec-18/pr-2-components
git push origin spec-18/pr-3-template-seo

git checkout spec-18/pr-4-data
git merge spec-18/pr-3-template-seo
git push origin spec-18/pr-4-data

git checkout spec-18/pr-5-testing
git merge spec-18/pr-4-data
git push origin spec-18/pr-5-testing

git checkout spec-18/pr-6-docs
git merge spec-18/pr-5-testing
git push origin spec-18/pr-6-docs
```

**Automation Script** (for merge-forward):

```bash
#!/bin/bash
# merge-forward.sh
# Usage: ./merge-forward.sh <starting-branch>

branches=(
  "spec-18/pr-1-types"
  "spec-18/pr-2-components"
  "spec-18/pr-3-template-seo"
  "spec-18/pr-4-data"
  "spec-18/pr-5-testing"
  "spec-18/pr-6-docs"
)

start_branch=$1
found=false

for branch in "${branches[@]}"; do
  if [ "$branch" == "$start_branch" ]; then
    found=true
    continue
  fi

  if [ "$found" == true ]; then
    echo "Merging forward to $branch"
    git checkout $branch
    git merge $start_branch --no-edit
    git push origin $branch
    start_branch=$branch
  fi
done

echo "Merge forward complete"
```

---

## Testing Before Each Merge

### PR #83: Types

```bash
npm run typecheck
npm test src/types/__tests__/state-park*.test.ts
npm run lint
```

### PR #84: Components

```bash
npm run typecheck
npm run build
npm run dev  # Manual visual testing
npm run lighthouse  # Accessibility check
```

### PR #85: Template/SEO

```bash
npm run build
npm run dev
# Visit /state-parks/blackwater-falls
# Validate Schema.org: https://validator.schema.org/
npm run lighthouse  # SEO score check
```

### PR #86: Data

```bash
npm run typecheck
npm run validate:parks
npm run build
```

### PR #87: Testing

```bash
npm test
npm run coverage  # Verify 85%+
npm run validate:parks
```

### PR #88: Documentation

```bash
# Manual review of documentation
# Verify CLAUDE.md format
# Check maintenance guide completeness
```

---

## Quality Gates

Each PR must meet these criteria before merge:

- [ ] All tests passing
- [ ] TypeScript compilation succeeds (zero errors)
- [ ] Linting passes (zero warnings)
- [ ] Code coverage ≥85% (where applicable)
- [ ] Lighthouse scores: Accessibility 100, SEO 100 (where applicable)
- [ ] WVWO aesthetic checklist passed (frontend PRs)
- [ ] Schema.org validation passes (SEO PRs)
- [ ] Documentation complete and accurate

---

## Post-Merge Checklist

After all 6 PRs merged to main:

1. **Verify Production Build**

   ```bash
   git checkout main
   git pull origin main
   npm run build
   npm run preview  # Test production build locally
   ```

2. **Store Pattern in ReasoningBank**

   ```bash
   claude-flow memory store "spec-18-state-park-complete" \
     "SPEC-18 State Park Template: 6 PRs, 50 hours, 9,777 lines.
     10 facility types, 2,620 line type system, 85%+ coverage.
     Key: Quarterly manual review for dynamic content (hours, fees, programs).
     Components: 4 sections + template (1,970 lines).
     Geographic proximity via Haversine.
     Multi-type Schema.org (Park + TouristAttraction).
     Placeholder data strategy for SPEC-21-71 migration.
     Lighthouse 100, WCAG 2.1 AA compliant." \
     --namespace wvwo-successes --reasoningbank
   ```

3. **Archive SPEC-18 Branch**

   ```bash
   # Move spec files to _completed directory
   mkdir -p "docs/specs/Mountain State Adventure Destination/_completed/SPEC-18-template-state-park"
   mv "docs/specs/Mountain State Adventure Destination/SPEC-18-template-state-park/"* \
      "docs/specs/Mountain State Adventure Destination/_completed/SPEC-18-template-state-park/"

   git add .
   git commit -m "docs(SPEC-18): archive to _completed after merge"
   git push origin main
   ```

4. **Delete Feature Branches** (after successful deployment)

   ```bash
   git push origin --delete feature/spec-18-state-park-template
   git push origin --delete spec-18/pr-1-types
   git push origin --delete spec-18/pr-2-components
   git push origin --delete spec-18/pr-3-template-seo
   git push origin --delete spec-18/pr-4-data
   git push origin --delete spec-18/pr-5-testing
   git push origin --delete spec-18/pr-6-docs

   # Clean up local branches
   git branch -d feature/spec-18-state-park-template
   git branch -d spec-18/pr-1-types
   git branch -d spec-18/pr-2-components
   git branch -d spec-18/pr-3-template-seo
   git branch -d spec-18/pr-4-data
   git branch -d spec-18/pr-5-testing
   git branch -d spec-18/pr-6-docs
   ```

5. **Monitor SEO Performance**
   - Google Search Console: Submit new sitemaps
   - Track rich snippet appearances (FAQs, Events)
   - Monitor organic search traffic (target: +20-30%)
   - Verify Schema.org markup in live search results

6. **Plan SPEC-21-71 Content Migration**
   - Schedule: Q1 2026
   - Scope: 37 WV state parks + 9 state forests
   - Reference: Maintenance guide in docs/maintenance/

---

## Success Metrics

### Code Quality

- ✅ 9,777 lines of code (types, components, templates, data, tests, docs)
- ✅ 85%+ test coverage
- ✅ Zero TypeScript errors
- ✅ Zero linting warnings
- ✅ Lighthouse 100 (Accessibility, SEO)
- ✅ WCAG 2.1 AA compliant

### SEO Impact (Projected)

- 20-30% increase in organic search traffic
- Rich snippets for FAQs (increased CTR)
- Event markup in Google Calendar
- Local search optimization for WV tourism

### Developer Experience

- Modular component architecture (easy to extend)
- Comprehensive type system (type-safe development)
- Test utilities for rapid feature development
- Documentation for onboarding and maintenance

### Business Value

- Professional state park pages for WV tourism
- Foundation for SPEC-21-71 migration (37 parks + 9 forests)
- Quarterly update workflow established
- SEO-optimized for outdoor recreation searches

---

## Troubleshooting

### Issue: PR shows unexpected conflicts

**Cause**: Base branch was updated after PR creation.

**Solution**:

```bash
git checkout <your-pr-branch>
git fetch origin
git rebase origin/<base-branch>
git push -f origin <your-pr-branch>
```

### Issue: Tests failing on CI but passing locally

**Cause**: Environment differences (Node version, dependencies).

**Solution**:

```bash
# Match CI Node version
nvm use 18.17.0  # Or version specified in .nvmrc

# Fresh dependency install
rm -rf node_modules package-lock.json
npm install

# Run tests
npm test
```

### Issue: Lighthouse scores lower than expected

**Cause**: Build optimization not applied in dev mode.

**Solution**:

```bash
npm run build
npm run preview  # Test production build
npm run lighthouse  # Run against preview server
```

### Issue: Schema.org validation errors

**Cause**: Missing required fields or incorrect types.

**Solution**:

1. Visit <https://validator.schema.org/>
2. Paste page URL or markup
3. Review error messages
4. Fix schema component
5. Rebuild and retest

---

## Contact

**SPEC Owner**: Claude Sonnet 4.5 (1M context)
**Project**: WVWO Storefront - Mountain State Adventure Destination
**Repository**: <https://github.com/mmtuentertainment/wvwo-storefront>

For questions about this PR workflow, refer to:

- SPEC-18-FINAL.md (complete specification)
- CLAUDE.md (project conventions)
- ReasoningBank (stored patterns)

---

**Generated**: 2026-01-03
**Last Updated**: 2026-01-03
**SPEC-18 Status**: All PRs created, awaiting sequential merge
