# SPEC-12 Git Staging Plan

**Total Uncommitted**: 69 files
**Date**: 2025-12-27

---

## Category 1: SPEC-12 Production Code (INCLUDE IN PR)

### Modified Core Files (9 files) ✅
- `M wv-wild-web/package.json` - Dependencies (if any added)
- `M wv-wild-web/package-lock.json` - Lock file
- `M wv-wild-web/src/content.config.ts` - Schema extension (type + 8 WMA fields)
- `M wv-wild-web/src/types/adventure.ts` - Type system (CampingFacility, FeatureItem, type guards)
- `M wv-wild-web/src/components/adventure/AdventureHero.astro` - Fixed forbidden gradient
- `M wv-wild-web/src/pages/near/elk-river.astro` - Refactored with components
- `M wv-wild-web/src/pages/near/burnsville-lake.astro` - New WMA page
- `M wv-wild-web/src/pages/near/summersville-lake.astro` - New WMA page
- `D wv-wild-web/src/content/adventures/spring-gobbler-burnsville.md` - Deleted (replaced?)

### New SPEC-12 Components (6 files) ✅
- `?? wv-wild-web/src/components/adventure/AdventureFeatureSection.astro`
- `?? wv-wild-web/src/components/adventure/AdventureWhatToHunt.astro`
- `?? wv-wild-web/src/components/adventure/AdventureWhatToFish.astro`
- `?? wv-wild-web/src/components/adventure/AdventureCampingList.astro`
- `?? wv-wild-web/src/components/adventure/AdventureAmenitiesGrid.astro`
- `?? wv-wild-web/src/components/adventure/AdventureCTA.astro`

### New Component Tests (6+ files) ✅
- `?? wv-wild-web/src/components/adventure/__tests__/AdventureAmenitiesGrid.test.ts`
- `?? wv-wild-web/src/components/adventure/__tests__/AdventureCampingList.test.ts`
- `?? wv-wild-web/src/components/adventure/__tests__/AdventureCTA.test.ts`
- `?? wv-wild-web/src/components/adventure/__tests__/AdventureFeatureSection.test.ts`
- `?? wv-wild-web/src/components/adventure/__tests__/AdventureWhatToFish.test.ts`
- `?? wv-wild-web/src/components/adventure/__tests__/AdventureWhatToHunt.test.ts`

### New WMA Content Files (4 files) ✅
- `?? wv-wild-web/src/content/adventures/burnsville-lake.md`
- `?? wv-wild-web/src/content/adventures/summersville-lake.md`
- `?? wv-wild-web/src/content/adventures/holly-river.md`
- `?? wv-wild-web/src/content/adventures/cranberry.md`

### New WMA Page Files (2 files) ✅
- `?? wv-wild-web/src/pages/near/holly-river.astro`
- `?? wv-wild-web/src/pages/near/cranberry.astro`

**TOTAL FOR PR**: ~27 files (production code)

---

## Category 2: SPEC-12 Documentation (OPTIONAL - Review)

### Specification Documents (4 files) 📝
- `?? docs/specs/Mountain State Adventure Destination/SPEC-12-template-wma/spec.md`
- `?? docs/specs/Mountain State Adventure Destination/SPEC-12-template-wma/plan.md`
- `?? docs/specs/Mountain State Adventure Destination/SPEC-12-template-wma/tasks.md`
- `?? docs/specs/Mountain State Adventure Destination/SPEC-12-template-wma/IMPLEMENTATION-COMPLETE.md`

**Decision**: Include in PR? (Helps reviewers understand scope)

### Architecture Documentation (Multiple folders) 📝
- `?? docs/architecture/SPEC-12-*`
- `?? docs/specs/.../architecture/`
- `?? docs/specifications/`

**Decision**: Include subset? (Component API docs useful)

### Completion Reports (Multiple files) 📝
- `?? docs/T-*.md` (task completion summaries)
- `?? docs/SPEC-12-*.md`

**Decision**: Exclude (internal agent artifacts)

---

## Category 3: Test Artifacts (EXCLUDE FROM PR)

### Playwright Reports ❌
- `?? wv-wild-web/playwright-report/` (test output, regenerates)

### Test Integration Files ❌
- `?? wv-wild-web/docs/__test-wma-integration-results.md`
- `?? wv-wild-web/docs/__test-wma-quick-reference.md`
- `?? wv-wild-web/src/pages/__test-wma-integration.astro` (if exists)

### Visual Regression Tests ❌
- `?? tests/e2e/elk-river-visual-regression.spec.ts` (if exists)
- `?? wv-wild-web/tests/screenshots/` (baseline images)

**Decision**: Exclude (test artifacts, not production code)

---

## Category 4: Serena Memory Files (EXCLUDE FROM PR)

### Serena Artifacts ❌
- `?? .serena/memories/completed-specs-registry.md`
- `?? .serena/memories/spec-11-trajectory.md`
- `?? .serena/memories/wvwo-component-patterns.md`

**Decision**: Exclude (Serena MCP internal state)

---

## Category 5: Temp/Working Files (CLEAN UP)

### Package Patch File ❌
- `?? wv-wild-web/package.json.patch` (patch file, not actual package.json)

### Scripts (Review) 🔍
- `?? wv-wild-web/scripts/performance/` (optimization scripts)
- `?? wv-wild-web/scripts/run-visual-regression.sh`
- `?? wv-wild-web/scripts/validate-test-page.sh`

**Decision**: Include if useful for CI/CD, exclude if just prototypes

### Wrong Directory (Move or Delete) ⚠️
- `?? specs/Mountain State Adventure Destination/SPEC-12-template-wma/functional-requirements-edge-cases.md`
  - **Issue**: Should be in `docs/specs/`, not root `specs/`
  - **Action**: Move or delete

---

## Recommended Git Actions

### Step 1: Stage SPEC-12 Production Code

```bash
# Stage modified core files
git add wv-wild-web/package.json
git add wv-wild-web/package-lock.json
git add wv-wild-web/src/content.config.ts
git add wv-wild-web/src/types/adventure.ts
git add wv-wild-web/src/components/adventure/AdventureHero.astro
git add wv-wild-web/src/pages/near/elk-river.astro
git add wv-wild-web/src/pages/near/burnsville-lake.astro
git add wv-wild-web/src/pages/near/summersville-lake.astro

# Stage deleted file
git add wv-wild-web/src/content/adventures/spring-gobbler-burnsville.md

# Stage all new components
git add wv-wild-web/src/components/adventure/Adventure*.astro

# Stage all component tests
git add wv-wild-web/src/components/adventure/__tests__/

# Stage new WMA content
git add wv-wild-web/src/content/adventures/burnsville-lake.md
git add wv-wild-web/src/content/adventures/summersville-lake.md
git add wv-wild-web/src/content/adventures/holly-river.md
git add wv-wild-web/src/content/adventures/cranberry.md

# Stage new WMA pages
git add wv-wild-web/src/pages/near/holly-river.astro
git add wv-wild-web/src/pages/near/cranberry.astro
```

**Estimated**: ~27 files for PR

---

### Step 2: Stage Essential Documentation (Optional)

```bash
# Core SPEC-12 docs
git add "docs/specs/Mountain State Adventure Destination/SPEC-12-template-wma/spec.md"
git add "docs/specs/Mountain State Adventure Destination/SPEC-12-template-wma/plan.md"
git add "docs/specs/Mountain State Adventure Destination/SPEC-12-template-wma/IMPLEMENTATION-COMPLETE.md"

# Component API documentation
git add docs/components/AdventureCTA-usage.md
git add docs/components/AdventureFeatureSection-usage.md
# ... other component docs if exist
```

**Estimated**: ~10-15 files (documentation)

---

### Step 3: Clean Up Test Artifacts

```bash
# Remove test artifacts (regenerate as needed)
rm -rf wv-wild-web/playwright-report/
rm -f wv-wild-web/docs/__test-*.md
rm -f wv-wild-web/package.json.patch

# Clean up wrong directory
rm -rf "specs/Mountain State Adventure Destination/"

# .gitignore additions
echo "playwright-report/" >> wv-wild-web/.gitignore
echo "__test-*.md" >> wv-wild-web/.gitignore
echo "*.patch" >> wv-wild-web/.gitignore
```

---

### Step 4: Keep Serena Memory Files (Don't Commit)

```bash
# .serena/memories/ should be in .gitignore already
# If not, add it:
echo ".serena/memories/" >> .gitignore
```

---

### Step 5: Handle Performance Scripts (Decision Needed)

**Option A**: Include in PR (if you want CI/CD performance testing)
```bash
git add wv-wild-web/scripts/performance/
git add tests/performance/
```

**Option B**: Exclude (defer to future PR)
```bash
# Don't stage, leave as untracked
```

---

## Summary of Recommendations

### INCLUDE IN SPEC-12 PR (~27-42 files):
✅ **Core Code**: 9 modified files + 6 components + 6 tests + 4 content + 2 pages = **27 files**
✅ **Essential Docs** (optional): spec.md, plan.md, IMPLEMENTATION-COMPLETE.md = **+3 files**
✅ **Component Docs** (optional): API usage guides = **+5-10 files**
🔍 **Performance Scripts** (optional): CI/CD automation = **+10 files**

### EXCLUDE FROM PR:
❌ **Test Artifacts**: playwright-report/, __test-*.md
❌ **Serena Files**: .serena/memories/
❌ **Temp Files**: *.patch
❌ **Wrong Directory**: specs/ folder
❌ **Agent Reports**: docs/T-*.md (internal)

### CLEAN UP:
🗑️ Delete test artifacts
🗑️ Delete wrong directory files
🗑️ Update .gitignore

---

## Execution Plan

**1. Clean up first** (remove garbage)
**2. Stage production code** (27 files minimum)
**3. Review documentation** (decide what's useful for PR)
**4. Commit with SPEC-12 message**
**5. Push branch**
**6. Create PR**

---

**Next**: Shall I execute this staging plan?
