# SPEC-18 State Park Template - Sequential PR Strategy

## Overview

This document outlines a **cascade-forward branching strategy** for submitting 6 sequential PRs where each PR can be independently reviewed and fixed without causing conflicts with other PRs in the chain.

## The Problem

With 6 large PRs totaling ~9,777 lines of code:
- **PR #1**: Type system (2,620 lines) - Foundation for everything
- **PR #2**: Components (943 lines) - Depends on types
- **PR #3**: Template + SEO (1,970 lines) - Depends on components
- **PR #4**: Placeholder data (3,000+ lines) - Depends on template
- **PR #5**: Testing suite (1,150 lines) - Tests everything above
- **PR #6**: Documentation (700 lines) - Documents final implementation

**Challenge**: If PR #4 needs fixes during review, those changes shouldn't conflict with PR #3 (already merged) or PR #5 (still in review).

## The Solution: Sequential Branch Chain

### Branch Strategy

```
main (production)
 │
 └─> spec-18/pr-1-types (PR #1 → main)
      │
      └─> spec-18/pr-2-components (PR #2 → pr-1-types)
           │
           └─> spec-18/pr-3-template-seo (PR #3 → pr-2-components)
                │
                └─> spec-18/pr-4-data (PR #4 → pr-3-template-seo)
                     │
                     └─> spec-18/pr-5-testing (PR #5 → pr-4-data)
                          │
                          └─> spec-18/pr-6-docs (PR #6 → pr-5-testing)
```

**Key Principle**: Each PR branches from the PREVIOUS PR's branch, creating a dependency chain.

### Why This Works

1. **Forward Dependencies Only**: PR #5 depends on PR #4, but PR #4 doesn't know about PR #5
2. **Fixes Cascade Forward**: Changes to PR #1 can be merged into PRs 2-6, but never backward
3. **Independent Review**: Each PR can be reviewed in isolation
4. **No Backward Conflicts**: Earlier PRs are already merged when later PRs are reviewed

## Step-by-Step Implementation

### Phase 1: Create Branch Chain

Starting from your current branch `feature/spec-18-state-park-template`:

```bash
# Ensure you're on the feature branch with all completed code
git checkout feature/spec-18-state-park-template

# Create PR #1 branch (types only)
git checkout -b spec-18/pr-1-types

# Stage ONLY type system files
git add wv-wild-web/src/types/state-park-types.ts
git add wv-wild-web/src/types/state-park-template-types.ts
git add wv-wild-web/src/types/state-park-seo-types.ts
git add wv-wild-web/src/types/__tests__/state-park-types.test.ts
git add wv-wild-web/src/types/__tests__/state-park-template-types.test.ts
git add wv-wild-web/src/types/__tests__/state-park-seo-types.test.ts

git commit -m "feat(SPEC-18): Phase 1 - Type system for State Park template

- StateBasics (11 fields): name, type, location, contact
- StateParkFacilities (63 fields): accessibility, camping, activities, amenities
- StateParkPrograms (16 fields): seasonal programs, educational offerings
- ParkHours, ParkFees, ParkOperatingStatus schemas
- StateParkSEO: multi-type Schema.org (Park + TouristAttraction)
- EventSchema, FAQSchema types
- Geographic proximity (Haversine formula)
- 2,620 lines total
- 85%+ test coverage

Part of SPEC-18 (6-phase implementation)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 (1M context) <noreply@anthropic.com>"

# Push PR #1
git push -u origin spec-18/pr-1-types

# Create PR #2 branch (FROM PR #1)
git checkout -b spec-18/pr-2-components

# Stage component files
git add wv-wild-web/src/components/state-park/

git commit -m "feat(SPEC-18): Phase 2 - State Park components

- FacilitiesSection: 63 facility types, accessibility-first
- ProgramsSection: Seasonal programming, education
- VisitorInfoSection: Hours, fees, operating status
- NearbyParksSection: Geographic proximity (Haversine)
- 4 section components (943 lines total)
- Depends on Phase 1 type system
- WVWO aesthetics (Bitter, rounded-sm, brand colors)

Part of SPEC-18 (6-phase implementation)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 (1M context) <noreply@anthropic.com>"

git push -u origin spec-18/pr-2-components

# Create PR #3 branch (FROM PR #2)
git checkout -b spec-18/pr-3-template-seo

# Stage template and SEO files
git add wv-wild-web/src/components/templates/StateParkTemplate.astro
git add wv-wild-web/src/components/seo/SchemaStateParkTemplate.astro
git add wv-wild-web/src/components/seo/SchemaEvent.astro
git add wv-wild-web/src/components/seo/SchemaEventSeries.astro
git add wv-wild-web/src/components/seo/SchemaFAQ.astro

git commit -m "feat(SPEC-18): Phase 3 - Main template and SEO schemas

- StateParkTemplate.astro (1,027 lines)
- Multi-type Schema.org (Park + TouristAttribution)
- Event/EventSeries schemas for programs
- FAQ schema for accessibility
- Geographic coordinates, amenities, photos
- Depends on Phase 2 components
- 1,970 lines total

Part of SPEC-18 (6-phase implementation)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 (1M context) <noreply@anthropic.com>"

git push -u origin spec-18/pr-3-template-seo

# Create PR #4 branch (FROM PR #3)
git checkout -b spec-18/pr-4-data

# Stage data files
git add wv-wild-web/src/data/state-parks/

git commit -m "feat(SPEC-18): Phase 4 - Placeholder data for all WV state parks

- 36 state park placeholder files
- Quarterly manual review strategy documented
- Real content migration deferred to SPEC-21-71
- Public domain + attribution image strategy
- Structured for dynamic content (hours, fees, programs)
- Depends on Phase 3 template
- 3,000+ lines total

Part of SPEC-18 (6-phase implementation)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 (1M context) <noreply@anthropic.com>"

git push -u origin spec-18/pr-4-data

# Create PR #5 branch (FROM PR #4)
git checkout -b spec-18/pr-5-testing

# Stage test files
git add wv-wild-web/src/lib/test-utils/state-park-test-utils.ts
git add wv-wild-web/validate-phase4.ts

git commit -m "feat(SPEC-18): Phase 5 - Comprehensive testing suite

- state-park-test-utils.ts: Factory functions, validators
- validate-phase4.ts: Data validation across all 36 parks
- Tests for types, components, template, SEO schemas
- 85%+ coverage target
- Depends on Phase 4 data
- 1,150 lines total

Part of SPEC-18 (6-phase implementation)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 (1M context) <noreply@anthropic.com>"

git push -u origin spec-18/pr-5-testing

# Create PR #6 branch (FROM PR #5)
git checkout -b spec-18/pr-6-docs

# Stage documentation files
git add "docs/specs/Mountain State Adventure Destination/SPEC-18-template-state-park/"

git commit -m "feat(SPEC-18): Phase 6 - Documentation and implementation summary

- SPEC-18-FINAL.md: Complete implementation spec
- SPEC-18-EXECUTIVE-SUMMARY.md: Business overview
- SEO-IMPLEMENTATION-SPEC.md: Schema.org strategies
- architecture/: Type system, data flow, testing approach
- Quarterly manual review procedures
- Lighthouse 100, WCAG 2.1 AA compliance
- Depends on Phase 5 testing
- 700 lines total

Part of SPEC-18 (6-phase implementation)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 (1M context) <noreply@anthropic.com>"

git push -u origin spec-18/pr-6-docs
```

### Phase 2: Create Pull Requests

**IMPORTANT**: Each PR has a different **base branch**.

```bash
# PR #1: Types (base: main)
gh pr create \
  --base main \
  --head spec-18/pr-1-types \
  --title "feat(SPEC-18): Phase 1 - Type system (2,620 lines)" \
  --body "$(cat <<'EOF'
## Summary
- Complete TypeScript type system for State Park template
- 63 facility types, 16 program types, 11 basic fields
- Geographic proximity, SEO schemas
- 85%+ test coverage

## Part of SPEC-18 (6-Phase Implementation)
This is **PR #1 of 6** - the foundation for all subsequent PRs.

**Dependency Chain:**
```
PR #1 (types) ← YOU ARE HERE
  ↓
PR #2 (components)
  ↓
PR #3 (template + SEO)
  ↓
PR #4 (data)
  ↓
PR #5 (testing)
  ↓
PR #6 (docs)
```

## Review Strategy
- Merge this PR FIRST
- PRs #2-6 will rebase on this after merge
- Changes to types will cascade forward automatically

## Files Changed
- `wv-wild-web/src/types/state-park-types.ts` (950 lines)
- `wv-wild-web/src/types/state-park-template-types.ts` (820 lines)
- `wv-wild-web/src/types/state-park-seo-types.ts` (850 lines)
- Type tests (3 files, 85%+ coverage)

## Test Plan
- [ ] All type tests pass
- [ ] No circular dependencies
- [ ] Zod schemas validate correctly
- [ ] Test coverage >85%

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"

# PR #2: Components (base: PR #1 branch)
gh pr create \
  --base spec-18/pr-1-types \
  --head spec-18/pr-2-components \
  --title "feat(SPEC-18): Phase 2 - State Park components (943 lines)" \
  --body "$(cat <<'EOF'
## Summary
- 4 section components: Facilities, Programs, Visitor Info, Nearby Parks
- WVWO aesthetics compliant (Bitter font, rounded-sm, brand colors)
- Accessibility-first facility rendering

## Part of SPEC-18 (6-Phase Implementation)
This is **PR #2 of 6** - depends on PR #1 (types).

**Dependency Chain:**
```
PR #1 (types) ✓ MERGED
  ↓
PR #2 (components) ← YOU ARE HERE
  ↓
PR #3 (template + SEO)
  ↓
PR #4 (data)
  ↓
PR #5 (testing)
  ↓
PR #6 (docs)
```

## Review Strategy
- Base branch: `spec-18/pr-1-types`
- After PR #1 merges, this will auto-update
- Merge this PR SECOND
- PRs #3-6 will rebase on this after merge

## Files Changed
- `wv-wild-web/src/components/state-park/FacilitiesSection.astro`
- `wv-wild-web/src/components/state-park/ProgramsSection.astro`
- `wv-wild-web/src/components/state-park/VisitorInfoSection.astro`
- `wv-wild-web/src/components/state-park/NearbyParksSection.astro`

## Test Plan
- [ ] Components render without errors
- [ ] WVWO aesthetics checklist passed
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] No forbidden fonts/colors/styles

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"

# PR #3: Template + SEO (base: PR #2 branch)
gh pr create \
  --base spec-18/pr-2-components \
  --head spec-18/pr-3-template-seo \
  --title "feat(SPEC-18): Phase 3 - Main template and SEO schemas (1,970 lines)" \
  --body "$(cat <<'EOF'
## Summary
- Complete StateParkTemplate.astro (1,027 lines)
- Multi-type Schema.org (Park + TouristAttribution)
- Event/EventSeries/FAQ schemas

## Part of SPEC-18 (6-Phase Implementation)
This is **PR #3 of 6** - depends on PR #2 (components).

**Dependency Chain:**
```
PR #1 (types) ✓ MERGED
  ↓
PR #2 (components) ✓ MERGED
  ↓
PR #3 (template + SEO) ← YOU ARE HERE
  ↓
PR #4 (data)
  ↓
PR #5 (testing)
  ↓
PR #6 (docs)
```

## Review Strategy
- Base branch: `spec-18/pr-2-components`
- After PR #2 merges, this will auto-update
- Merge this PR THIRD

## Files Changed
- `wv-wild-web/src/components/templates/StateParkTemplate.astro`
- `wv-wild-web/src/components/seo/SchemaStateParkTemplate.astro`
- `wv-wild-web/src/components/seo/SchemaEvent.astro`
- `wv-wild-web/src/components/seo/SchemaEventSeries.astro`
- `wv-wild-web/src/components/seo/SchemaFAQ.astro`

## Test Plan
- [ ] Template renders all sections
- [ ] Schema.org validation passes
- [ ] SEO meta tags correct
- [ ] Lighthouse SEO score 100

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"

# PR #4: Data (base: PR #3 branch)
gh pr create \
  --base spec-18/pr-3-template-seo \
  --head spec-18/pr-4-data \
  --title "feat(SPEC-18): Phase 4 - Placeholder data for 36 WV state parks (3,000+ lines)" \
  --body "$(cat <<'EOF'
## Summary
- 36 state park placeholder data files
- Quarterly manual review strategy
- Public domain + attribution image strategy

## Part of SPEC-18 (6-Phase Implementation)
This is **PR #4 of 6** - depends on PR #3 (template).

**Dependency Chain:**
```
PR #1 (types) ✓ MERGED
  ↓
PR #2 (components) ✓ MERGED
  ↓
PR #3 (template + SEO) ✓ MERGED
  ↓
PR #4 (data) ← YOU ARE HERE
  ↓
PR #5 (testing)
  ↓
PR #6 (docs)
```

## Review Strategy
- Base branch: `spec-18/pr-3-template-seo`
- After PR #3 merges, this will auto-update
- Merge this PR FOURTH

## Files Changed
- `wv-wild-web/src/data/state-parks/*.ts` (36 files)

## Test Plan
- [ ] All data files validate against types
- [ ] No TypeScript errors
- [ ] Placeholder strategy documented
- [ ] Image attribution correct

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"

# PR #5: Testing (base: PR #4 branch)
gh pr create \
  --base spec-18/pr-4-data \
  --head spec-18/pr-5-testing \
  --title "feat(SPEC-18): Phase 5 - Comprehensive testing suite (1,150 lines)" \
  --body "$(cat <<'EOF'
## Summary
- Test utilities and validators
- 85%+ coverage across all phases
- Data validation for all 36 parks

## Part of SPEC-18 (6-Phase Implementation)
This is **PR #5 of 6** - depends on PR #4 (data).

**Dependency Chain:**
```
PR #1 (types) ✓ MERGED
  ↓
PR #2 (components) ✓ MERGED
  ↓
PR #3 (template + SEO) ✓ MERGED
  ↓
PR #4 (data) ✓ MERGED
  ↓
PR #5 (testing) ← YOU ARE HERE
  ↓
PR #6 (docs)
```

## Review Strategy
- Base branch: `spec-18/pr-4-data`
- After PR #4 merges, this will auto-update
- Merge this PR FIFTH

## Files Changed
- `wv-wild-web/src/lib/test-utils/state-park-test-utils.ts`
- `wv-wild-web/validate-phase4.ts`

## Test Plan
- [ ] All tests pass
- [ ] Coverage >85%
- [ ] Data validation passes for all parks
- [ ] No test flakiness

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"

# PR #6: Documentation (base: PR #5 branch)
gh pr create \
  --base spec-18/pr-5-testing \
  --head spec-18/pr-6-docs \
  --title "feat(SPEC-18): Phase 6 - Documentation and implementation summary (700 lines)" \
  --body "$(cat <<'EOF'
## Summary
- Complete SPEC-18 documentation
- Implementation summary, executive summary
- SEO strategy, architecture diagrams

## Part of SPEC-18 (6-Phase Implementation)
This is **PR #6 of 6** - FINAL PR, depends on PR #5 (testing).

**Dependency Chain:**
```
PR #1 (types) ✓ MERGED
  ↓
PR #2 (components) ✓ MERGED
  ↓
PR #3 (template + SEO) ✓ MERGED
  ↓
PR #4 (data) ✓ MERGED
  ↓
PR #5 (testing) ✓ MERGED
  ↓
PR #6 (docs) ← YOU ARE HERE (FINAL)
```

## Review Strategy
- Base branch: `spec-18/pr-5-testing`
- After PR #5 merges, this will auto-update
- Merge this PR LAST to complete SPEC-18

## Files Changed
- `docs/specs/Mountain State Adventure Destination/SPEC-18-template-state-park/*.md`

## Test Plan
- [ ] Documentation complete and accurate
- [ ] No broken links
- [ ] Quarterly review procedures clear
- [ ] All acceptance criteria met

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

## Handling Review Feedback & Fixes

### Scenario 1: Fix Needed in PR #1 (Types)

**Problem**: Reviewer finds issue in `state-park-types.ts` after PR #1 is created.

**Solution**: Fix PR #1, then cascade forward to all dependent PRs.

```bash
# Fix PR #1
git checkout spec-18/pr-1-types
# Make your fixes to types
git add wv-wild-web/src/types/state-park-types.ts
git commit -m "fix(SPEC-18): Address PR review feedback in types"
git push origin spec-18/pr-1-types

# Cascade fix to PR #2
git checkout spec-18/pr-2-components
git merge spec-18/pr-1-types
git push origin spec-18/pr-2-components

# Cascade fix to PR #3
git checkout spec-18/pr-3-template-seo
git merge spec-18/pr-2-components  # This includes PR #1 fix
git push origin spec-18/pr-3-template-seo

# Cascade fix to PR #4
git checkout spec-18/pr-4-data
git merge spec-18/pr-3-template-seo  # This includes PR #1 fix
git push origin spec-18/pr-4-data

# Cascade fix to PR #5
git checkout spec-18/pr-5-testing
git merge spec-18/pr-4-data  # This includes PR #1 fix
git push origin spec-18/pr-5-testing

# Cascade fix to PR #6
git checkout spec-18/pr-6-docs
git merge spec-18/pr-5-testing  # This includes PR #1 fix
git push origin spec-18/pr-6-docs
```

**Automation Script**:
```bash
# Save as: cascade-fix.sh
#!/bin/bash
FROM_BRANCH=$1
BRANCHES=("spec-18/pr-2-components" "spec-18/pr-3-template-seo" "spec-18/pr-4-data" "spec-18/pr-5-testing" "spec-18/pr-6-docs")

for BRANCH in "${BRANCHES[@]}"; do
  git checkout "$BRANCH"
  git merge "$FROM_BRANCH" --no-edit
  git push origin "$BRANCH"
  FROM_BRANCH="$BRANCH"  # Next merge uses this branch
done

# Usage: ./cascade-fix.sh spec-18/pr-1-types
```

### Scenario 2: Fix Needed in PR #4 (Data)

**Problem**: Reviewer finds issue in placeholder data after PR #4 is created.

**Solution**: Fix PR #4, cascade ONLY to PR #5 and PR #6 (not backward to PR #1-3).

```bash
# Fix PR #4
git checkout spec-18/pr-4-data
# Make your fixes to data files
git add wv-wild-web/src/data/state-parks/
git commit -m "fix(SPEC-18): Address PR review feedback in data files"
git push origin spec-18/pr-4-data

# Cascade fix to PR #5 (testing depends on data)
git checkout spec-18/pr-5-testing
git merge spec-18/pr-4-data
git push origin spec-18/pr-5-testing

# Cascade fix to PR #6 (docs depend on testing)
git checkout spec-18/pr-6-docs
git merge spec-18/pr-5-testing  # This includes PR #4 fix
git push origin spec-18/pr-6-docs

# NO CASCADE NEEDED to PR #1-3 (they're already merged or don't depend on data)
```

### Scenario 3: Fix Needed in PR #6 (Docs)

**Problem**: Reviewer finds typo in documentation.

**Solution**: Fix PR #6 only - no cascade needed (it's the last PR).

```bash
git checkout spec-18/pr-6-docs
# Fix documentation
git add "docs/specs/Mountain State Adventure Destination/SPEC-18-template-state-park/"
git commit -m "fix(SPEC-18): Fix documentation typos"
git push origin spec-18/pr-6-docs

# No cascade needed - this is the last PR in the chain
```

## Merge Order & Post-Merge Cleanup

### Merge Order (CRITICAL)

**MUST merge in this order:**
1. PR #1 (types) → main
2. PR #2 (components) → main (after updating base)
3. PR #3 (template) → main (after updating base)
4. PR #4 (data) → main (after updating base)
5. PR #5 (testing) → main (after updating base)
6. PR #6 (docs) → main (after updating base)

### Post-Merge Procedure

After each PR merges, update the next PR's base branch:

```bash
# Example: After PR #1 merges to main
# Update PR #2's base branch using GitHub CLI
gh pr edit <PR-NUMBER-FOR-PR-2> --base main

# Then update PR #2 branch
git checkout spec-18/pr-2-components
git rebase main
git push --force-with-lease origin spec-18/pr-2-components

# Cascade this update to dependent PRs
git checkout spec-18/pr-3-template-seo
git rebase spec-18/pr-2-components
git push --force-with-lease origin spec-18/pr-3-template-seo

# Continue for PR #4, #5, #6...
```

**Automation Script**:
```bash
# Save as: post-merge-update.sh
#!/bin/bash
MERGED_BRANCH=$1  # e.g., "spec-18/pr-1-types"
NEXT_BRANCH=$2    # e.g., "spec-18/pr-2-components"
PR_NUMBER=$3      # GitHub PR number for next branch

# Update next PR's base to main
gh pr edit "$PR_NUMBER" --base main

# Rebase next branch on main
git checkout "$NEXT_BRANCH"
git rebase main
git push --force-with-lease origin "$NEXT_BRANCH"

echo "✓ $NEXT_BRANCH updated to target main"

# Usage: ./post-merge-update.sh spec-18/pr-1-types spec-18/pr-2-components 123
```

## Alternative: GitHub Stacked PRs (Experimental)

GitHub CLI supports **draft PRs** and **base branch updates**, but not native stacked PR workflows.

### Third-Party Tools

**1. Graphite (graphite.dev)**
```bash
# Install
npm install -g @withgraphite/graphite-cli
gt init

# Create stacked PRs
gt branch create spec-18/pr-1-types
# ... commit changes ...
gt stack submit

# Automatically handles base branch updates
```

**2. Aviator (aviator.co)**
- Auto-merge queues
- Stacked PR visualization
- Automated cascade merges

**3. ghstack (Facebook)**
```bash
pip install ghstack

# Submit stacked PRs
ghstack submit
```

### Recommendation

**For SPEC-18, use manual GitHub CLI approach**:
- More control over review process
- No external dependencies
- Works with existing GitHub workflow
- Team is already familiar with gh CLI

**Consider Graphite/Aviator for future SPECs** if:
- More than 6 sequential PRs
- Frequent cascade fixes needed
- Multiple developers working on chain

## Conflict Resolution

### Merge Conflicts During Cascade

If `git merge` fails during cascade:

```bash
# Example: Conflict when merging PR #1 fix into PR #2
git checkout spec-18/pr-2-components
git merge spec-18/pr-1-types
# CONFLICT in wv-wild-web/src/types/state-park-types.ts

# Resolve conflicts
git status  # Shows conflicted files
# Edit files to resolve conflicts
git add wv-wild-web/src/types/state-park-types.ts
git commit -m "merge: Resolve conflicts from PR #1 type fixes"
git push origin spec-18/pr-2-components

# Continue cascade to PR #3
git checkout spec-18/pr-3-template-seo
git merge spec-18/pr-2-components  # Should be clean now
```

### Prevention Strategies

1. **Minimize Overlapping Changes**: Keep each PR focused on its phase
2. **Communicate Fixes**: Announce in PR comments when cascading fixes
3. **Test After Cascade**: Run tests after merging fixes forward
4. **Use Feature Flags**: For risky changes, use flags until all PRs merge

## Summary Checklist

### Initial Setup
- [ ] Create 6 branches in sequence (each from previous)
- [ ] Commit phase-specific code to each branch
- [ ] Push all branches to origin
- [ ] Create 6 PRs with correct base branches

### During Review
- [ ] Fix feedback in appropriate branch
- [ ] Cascade fixes forward to dependent PRs
- [ ] Test cascade merges
- [ ] Update PR descriptions if needed

### Merge Process
- [ ] Merge PR #1 to main
- [ ] Update PR #2 base to main, rebase
- [ ] Merge PR #2 to main
- [ ] Update PR #3 base to main, rebase
- [ ] Continue through PR #6
- [ ] Delete feature branches after all merges

### Post-Merge
- [ ] Archive SPEC-18 to `_completed/`
- [ ] Store pattern in ReasoningBank memory
- [ ] Update project documentation
- [ ] Celebrate successful 6-phase delivery!

## Why This Strategy Works

### Benefits

1. **No Backward Conflicts**: PR #1 doesn't know about PR #6, so fixes to PR #6 can't break PR #1
2. **Independent Review**: Each PR can be reviewed in isolation
3. **Automatic Updates**: GitHub updates PRs when base branch changes
4. **Clear Dependencies**: Visual chain shows what depends on what
5. **Rollback Safety**: Can abandon later PRs without affecting merged ones

### Trade-offs

1. **Cascade Overhead**: Fixes to early PRs require cascading to all later PRs
2. **Merge Order Rigidity**: Must merge in strict order (1→2→3→4→5→6)
3. **Rebase Complexity**: Post-merge rebases can be tricky with force-push

### When to Use

**Use this strategy when:**
- Large feature split into 6+ sequential PRs
- Each PR builds on previous work
- Independent review of each phase needed
- Changes unlikely to affect earlier phases

**Don't use when:**
- PRs are independent (can all target main)
- Frequent back-and-forth changes expected
- Single developer working alone (just use feature branch)

---

**Generated for SPEC-18 State Park Template - 6-Phase Implementation**

Total Lines: ~9,777 across 6 PRs
Estimated Review Time: 2-3 weeks (1-2 days per PR)
Risk Level: Low (cascade-forward strategy prevents backward conflicts)
