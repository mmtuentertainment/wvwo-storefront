# Git Cleanup File Categorization Report

**Date**: 2025-12-29
**Planner**: File Categorization Specialist
**Total Files Analyzed**: 31+ uncommitted files

---

## Executive Summary

All uncommitted files have been analyzed and categorized into 4 action groups:
1. **COMMIT** - 27 files (3 commits needed)
2. **GITIGNORE** - 2 directories (add to .gitignore)
3. **DELETE** - 1 file (wrong location, delete after commit)
4. **KEEP UNSTAGED** - 1 directory (working memory, not for git)

**Critical Finding**: SPEC-13 directory is in WRONG location. Should be in `docs/specs/active/` not `docs/specs/`.

---

## Category 1: COMMIT - SPEC-12 Post-Merge Cleanup (21 deleted files)

**Action**: Single commit for deleted SPEC-12 documentation

**Files**:
```
D  docs/specs/_completed/SPEC-12-wma-template/GIT-STAGING-PLAN.md
D  docs/specs/_completed/SPEC-12-wma-template/IMPLEMENTATION-COMPLETE.md
D  docs/specs/_completed/SPEC-12-wma-template/PROMPT.md
D  docs/specs/_completed/SPEC-12-wma-template/T-012-completion-summary.md
D  docs/specs/_completed/SPEC-12-wma-template/architecture-validation-report.md
D  docs/specs/_completed/SPEC-12-wma-template/architecture.md
D  docs/specs/_completed/SPEC-12-wma-template/architecture/01-system-architecture.md
D  docs/specs/_completed/SPEC-12-wma-template/architecture/02-feature-section-components.md
D  docs/specs/_completed/SPEC-12-wma-template/architecture/03-camping-amenities-components.md
D  docs/specs/_completed/SPEC-12-wma-template/architecture/04-cta-component.md
D  docs/specs/_completed/SPEC-12-wma-template/architecture/05-schema-architecture.md
D  docs/specs/_completed/SPEC-12-wma-template/architecture/06-type-system-architecture.md
D  docs/specs/_completed/SPEC-12-wma-template/architecture/07-performance-architecture.md
D  docs/specs/_completed/SPEC-12-wma-template/architecture/08-accessibility-architecture.md
D  docs/specs/_completed/SPEC-12-wma-template/architecture/09-integration-architecture.md
D  docs/specs/_completed/SPEC-12-wma-template/architecture/MASTER-ARCHITECTURE.md
D  docs/specs/_completed/SPEC-12-wma-template/architecture/QUEEN_DIRECTIVE.md
D  docs/specs/_completed/SPEC-12-wma-template/plan.md
D  docs/specs/_completed/SPEC-12-wma-template/pseudocode.md
D  docs/specs/_completed/SPEC-12-wma-template/spec.md
D  docs/specs/_completed/SPEC-12-wma-template/tasks.md
```

**Reason**: Post-merge cleanup from PR #70. These files were already archived but deletion was never committed.

**Suggested Commit Message**:
```
docs(SPEC-12): clean up archived documentation after PR #70 merge

Remove SPEC-12 architecture and planning docs from _completed folder.
All content already merged to main in PR #70 (3afc9ae).

- Delete 21 archived documentation files
- Clean up architecture subdirectory
- Part of SPEC-12 post-merge workflow completion
```

---

## Category 2: COMMIT - WVWO Compliance Infrastructure (6 files)

**Action**: Single commit for new compliance infrastructure

**Files**:
```
?? .github/workflows/wvwo-compliance.yml
?? docs/WVWO-COMPLIANCE-QUICK-REFERENCE.md
?? docs/WVWO-PR-CHECKLIST.md
?? config/eslint-local-rules.js
?? tests/compliance/border-radius.spec.ts
?? tests/compliance/color-accents.spec.ts
?? tests/compliance/fonts.spec.ts
```

**File Details**:

1. **`.github/workflows/wvwo-compliance.yml`** (258 lines)
   - GitHub Actions workflow for PR compliance checks
   - Pre-commit scans (forbidden rounded, fonts, glassmorphism)
   - ESLint compliance, Playwright tests, visual regression
   - Automated compliance reporting on PRs

2. **`docs/WVWO-COMPLIANCE-QUICK-REFERENCE.md`** (273 lines)
   - One-page dev guide for WVWO aesthetic rules
   - Quick check commands, component cheatsheet
   - Color palette, font stack, test commands
   - Common violations and fixes

3. **`docs/WVWO-PR-CHECKLIST.md`** (207 lines)
   - PR checklist for Adventure template changes
   - Border radius, font, color, style compliance
   - The Litmus Test criteria
   - Reviewer sign-off section

4. **`config/eslint-local-rules.js`** (242 lines)
   - Custom ESLint rules for WVWO aesthetics
   - `wvwo-no-forbidden-rounded` (ban rounded-md/lg/xl)
   - `wvwo-no-forbidden-fonts` (ban SaaS fonts)
   - `wvwo-font-hand-context` (font-hand only for Kim notes)
   - `wvwo-no-glassmorphism` (ban backdrop-blur)

5. **`tests/compliance/`** (3 Playwright test suites)
   - `border-radius.spec.ts` (6 KB) - Border radius compliance
   - `color-accents.spec.ts` (8 KB) - Color accent semantics
   - `fonts.spec.ts` (7 KB) - Font hierarchy compliance

**Reason**: Critical infrastructure for WVWO aesthetic enforcement. Created to prevent future SPEC-12 aesthetic violations.

**Suggested Commit Message**:
```
feat(compliance): add WVWO aesthetic enforcement infrastructure

Implement comprehensive compliance system to enforce rural WV aesthetic:

CI/CD:
- GitHub Actions workflow with pre-commit scans
- Automated PR compliance reporting

Documentation:
- Quick reference guide for developers
- PR checklist template with Litmus Test

Testing:
- Playwright compliance test suites (border-radius, fonts, colors)
- ESLint custom rules for build-time checks

Rules Enforced:
- rounded-sm ONLY (ban rounded-md/lg/xl)
- Bitter/Permanent Marker/Noto Sans fonts (ban SaaS fonts)
- Green/Brown/Orange color semantics
- No glassmorphism or parallax

Prevents future aesthetic violations like those in SPEC-12 development.
```

---

## Category 3: COMMIT - Package Dependencies (1 file)

**Action**: Single commit for package.json changes

**Files**:
```
M  wv-wild-web/package.json
```

**Changes**:
```diff
+    "test:compliance": "playwright test ../tests/compliance/",
+    "test:compliance:border": "playwright test ../tests/compliance/border-radius.spec.ts",
+    "test:compliance:fonts": "playwright test ../tests/compliance/fonts.spec.ts",
+    "test:compliance:colors": "playwright test ../tests/compliance/color-accents.spec.ts",
+    "test:visual": "playwright test --grep @visual",
+    "lint:wvwo": "echo 'WVWO ESLint rules - Integration pending'",
```

**Reason**: New npm scripts for compliance testing infrastructure.

**Suggested Commit Message**:
```
chore(deps): add compliance test scripts to package.json

Add npm scripts for WVWO aesthetic compliance testing:
- test:compliance - Run all compliance tests
- test:compliance:border/fonts/colors - Individual test suites
- test:visual - Visual regression tests
- lint:wvwo - ESLint WVWO rules (integration pending)

Supports compliance infrastructure from previous commit.
```

---

## Category 4: COMMIT - Post-Merge Status Documentation (1 file)

**Action**: Single commit for SPEC-12 completion summary

**Files**:
```
?? SPEC-12-POST-MERGE-COMPLETE.md
```

**File Details**:
- 199 lines documenting SPEC-12 post-merge workflows
- AgentDB advanced features executed (pattern storage, retrieval, optimization)
- ReasoningBank features executed (trajectory tracking, verdicts, critiques)
- Database stats (184 episodes total)
- Production status (5 WMAs live, 418 tests passing)
- Ready for Phase 2 declaration

**Reason**: Important completion record for SPEC-12 workflows.

**Critical Issue**: File is in ROOT folder (VIOLATES CLAUDE.md rules)

**Suggested Commit Message**:
```
docs(SPEC-12): document post-merge completion status

Record SPEC-12 post-merge workflow completion:
- AgentDB: 10 episodes stored, pattern retrieval, memory optimization
- ReasoningBank: Trajectory tracking, verdict judgments, critiques
- Database: 184 total episodes, 90% success rate
- Production: 5 WMAs live, 418 tests passing
- Ready for Phase 2 (10 more WMAs with AI-assisted content)

Temporary root location will be moved to docs/specs/_completed/ after commit.
```

**POST-COMMIT ACTION REQUIRED**:
```bash
# After commit, move to correct location
git mv SPEC-12-POST-MERGE-COMPLETE.md docs/specs/_completed/SPEC-12-wma-template/
git commit -m "docs(SPEC-12): move completion summary to _completed folder"
```

---

## Category 5: GITIGNORE - Generated Artifacts (1 directory)

**Action**: Add to .gitignore

**Files**:
```
?? wv-wild-web/playwright-report/
```

**File Details**:
- `wv-wild-web/playwright-report/index.html` (517 KB)
- Generated HTML report from Playwright test runs
- Contains test results, screenshots, traces

**Reason**: Generated build artifact, should never be committed.

**Current .gitignore Status**:
- Has `test-results/` (✅ covered)
- Has `*-test-results/` (✅ covered)
- **MISSING**: `playwright-report/` (❌ NOT covered)

**Recommended .gitignore Addition**:
```gitignore
# Playwright test artifacts
test-screenshots/
test-*.js
*-test-results/
test-results/
playwright-report/  # <-- ADD THIS
.playwright/
```

**Action Command**:
```bash
# Add to .gitignore (line 39, after test-results/)
echo "playwright-report/" >> .gitignore

# Remove from staging if tracked
git rm -r --cached wv-wild-web/playwright-report/ 2>/dev/null || true
```

---

## Category 6: KEEP UNSTAGED - Working Memory (1 directory)

**Action**: DO NOT commit, DO NOT gitignore (already ignored)

**Files**:
```
?? docs/swarm-memory/
```

**File Details**:
- `MEMORY-MANAGER-STATUS.md` (11 KB)
- `PROGRESS-METRICS.json` (8 KB)
- `README.md` (7 KB)
- `SPEC-13-IMPLEMENTATION-INDEX.md` (16 KB)
- `spec13-planning/` subdirectory
- `WVWO-COMPLIANCE-CACHE.json` (6 KB)

**Purpose**: Working memory for swarm coordination during SPEC-13 development.

**Current .gitignore Status**: ✅ ALREADY COVERED
```gitignore
# Line 108-110 in .gitignore
.agentdb/
docs/CLAUDE_INTELLIGENCE_ENHANCEMENT_ANALYSIS.md
docs/WVWO-INTELLIGENCE-CHEATSHEET.md
```

**Why NOT Showing as Ignored**:
- Directory path `docs/swarm-memory/` is NOT explicitly in .gitignore
- Should be added for clarity

**Recommended .gitignore Addition**:
```gitignore
# Claude Intelligence System (local memory)
.agentdb/
docs/swarm-memory/  # <-- ADD THIS
docs/CLAUDE_INTELLIGENCE_ENHANCEMENT_ANALYSIS.md
docs/WVWO-INTELLIGENCE-CHEATSHEET.md
docs/research/
```

**Action Command**:
```bash
# Add to .gitignore (line 109, after .agentdb/)
# Will prevent future confusion
```

---

## Category 7: REVIEW NEEDED - Wrong Location (1 directory)

**Action**: Move to correct location AFTER committing current work

**Files**:
```
?? docs/specs/SPEC-13-lake-template/
```

**File Details**:
- 19 top-level files (planning, architecture, reports)
- 6 subdirectories (analysis, compliance, contracts, migration, planning, tasks)
- ~40 total files

**Critical Issue**: SPEC-13 is in WRONG location.

**Current Location**: `docs/specs/SPEC-13-lake-template/`
**Correct Location**: `docs/specs/active/SPEC-13-lake-template/`

**Why This Matters**:
- `docs/specs/` is for active specs ONLY (no subdirectory organization)
- SPEC-12 was archived to `docs/specs/_completed/SPEC-12-wma-template/`
- SPEC-13 should follow same pattern: active work in organized subdirectory

**Repository Structure**:
```
docs/specs/
├── active/               # <-- SPEC-13 should be here
│   └── SPEC-13-lake-template/
├── _completed/           # <-- SPEC-12 moved here
│   └── SPEC-12-wma-template/
└── [other legacy specs]
```

**Recommended Action (AFTER Category 1-4 commits)**:
```bash
# DO NOT commit in current location
# Move to active/ subdirectory first

mkdir -p docs/specs/active
git mv docs/specs/SPEC-13-lake-template docs/specs/active/
git commit -m "docs(SPEC-13): move to active/ subdirectory for organization

Move SPEC-13 Lake Template development to active/ folder:
- Matches SPEC-12 organization pattern
- Separates active work from completed/archived specs
- Keeps docs/specs/ root clean

Will be moved to _completed/ after implementation finishes."
```

**Alternative**: Delete and recreate in correct location (if not committed yet).

---

## Commit Sequence Strategy

### Step 1: Update .gitignore FIRST
```bash
# Add missing entries to prevent accidental commits
sed -i '39a playwright-report/' .gitignore
sed -i '109a docs/swarm-memory/' .gitignore

git add .gitignore
git commit -m "chore(gitignore): add playwright-report and swarm-memory

Prevent committing generated artifacts:
- playwright-report/ (generated test HTML reports)
- docs/swarm-memory/ (local swarm coordination memory)

Both are build/runtime artifacts, not source code."
```

### Step 2: Commit SPEC-12 Deletions
```bash
git add docs/specs/_completed/SPEC-12-wma-template/
git commit -m "docs(SPEC-12): clean up archived documentation after PR #70 merge

Remove SPEC-12 architecture and planning docs from _completed folder.
All content already merged to main in PR #70 (3afc9ae).

- Delete 21 archived documentation files
- Clean up architecture subdirectory
- Part of SPEC-12 post-merge workflow completion"
```

### Step 3: Commit WVWO Compliance Infrastructure
```bash
git add .github/workflows/wvwo-compliance.yml
git add docs/WVWO-COMPLIANCE-QUICK-REFERENCE.md
git add docs/WVWO-PR-CHECKLIST.md
git add config/eslint-local-rules.js
git add tests/compliance/

git commit -m "feat(compliance): add WVWO aesthetic enforcement infrastructure

Implement comprehensive compliance system to enforce rural WV aesthetic:

CI/CD:
- GitHub Actions workflow with pre-commit scans
- Automated PR compliance reporting

Documentation:
- Quick reference guide for developers
- PR checklist template with Litmus Test

Testing:
- Playwright compliance test suites (border-radius, fonts, colors)
- ESLint custom rules for build-time checks

Rules Enforced:
- rounded-sm ONLY (ban rounded-md/lg/xl)
- Bitter/Permanent Marker/Noto Sans fonts (ban SaaS fonts)
- Green/Brown/Orange color semantics
- No glassmorphism or parallax

Prevents future aesthetic violations like those in SPEC-12 development."
```

### Step 4: Commit Package.json Changes
```bash
git add wv-wild-web/package.json

git commit -m "chore(deps): add compliance test scripts to package.json

Add npm scripts for WVWO aesthetic compliance testing:
- test:compliance - Run all compliance tests
- test:compliance:border/fonts/colors - Individual test suites
- test:visual - Visual regression tests
- lint:wvwo - ESLint WVWO rules (integration pending)

Supports compliance infrastructure from previous commit."
```

### Step 5: Commit SPEC-12 Completion Summary
```bash
git add SPEC-12-POST-MERGE-COMPLETE.md

git commit -m "docs(SPEC-12): document post-merge completion status

Record SPEC-12 post-merge workflow completion:
- AgentDB: 10 episodes stored, pattern retrieval, memory optimization
- ReasoningBank: Trajectory tracking, verdict judgments, critiques
- Database: 184 total episodes, 90% success rate
- Production: 5 WMAs live, 418 tests passing
- Ready for Phase 2 (10 more WMAs with AI-assisted content)

Temporary root location will be moved to docs/specs/_completed/ after commit."
```

### Step 6: Move SPEC-12 Summary to Correct Location
```bash
git mv SPEC-12-POST-MERGE-COMPLETE.md docs/specs/_completed/SPEC-12-wma-template/

git commit -m "docs(SPEC-12): move completion summary to _completed folder

Move post-merge summary to archived SPEC-12 directory.
Keeps root folder clean per CLAUDE.md file organization rules."
```

### Step 7: Fix SPEC-13 Location
```bash
mkdir -p docs/specs/active
git mv docs/specs/SPEC-13-lake-template docs/specs/active/

git commit -m "docs(SPEC-13): move to active/ subdirectory for organization

Move SPEC-13 Lake Template development to active/ folder:
- Matches SPEC-12 organization pattern
- Separates active work from completed/archived specs
- Keeps docs/specs/ root clean

Will be moved to _completed/ after implementation finishes."
```

---

## Summary Statistics

| Category | Files | Action | Commits |
|----------|-------|--------|---------|
| SPEC-12 Deletions | 21 | Commit | 1 |
| Compliance Infrastructure | 6 | Commit | 1 |
| Package Dependencies | 1 | Commit | 1 |
| SPEC-12 Summary | 1 | Commit + Move | 2 |
| .gitignore Updates | 1 | Commit | 1 |
| SPEC-13 Relocation | 1 dir | Move + Commit | 1 |
| Playwright Report | 1 dir | Gitignore (delete) | 0 |
| Swarm Memory | 1 dir | Gitignore (keep unstaged) | 0 |
| **TOTAL** | **31+** | **7 commits** | **7** |

---

## Critical Findings

### ❌ VIOLATIONS OF CLAUDE.md

1. **SPEC-12-POST-MERGE-COMPLETE.md in root folder**
   - Rule: "NEVER save working files, text/mds and tests to the root folder"
   - Action: Commit, then move to `docs/specs/_completed/SPEC-12-wma-template/`

2. **SPEC-13-lake-template/ in wrong location**
   - Rule: Organize files in appropriate subdirectories
   - Action: Move to `docs/specs/active/SPEC-13-lake-template/`

### ✅ COMPLIANCE INFRASTRUCTURE VALUE

The new compliance system addresses SPEC-12's aesthetic violations:
- **Prevention**: Pre-commit scans, ESLint build-time checks
- **Testing**: Automated Playwright compliance tests
- **Documentation**: Quick reference, PR checklist
- **CI/CD**: GitHub Actions automated reporting

This prevents future issues like Greptile flagging `bg-camo` as non-compliant.

---

## Post-Commit Verification

```bash
# After all 7 commits, verify clean state
git status
# Should show ONLY:
# - docs/swarm-memory/ (untracked, working memory)

# Verify .gitignore working
git check-ignore wv-wild-web/playwright-report/
# Should output: wv-wild-web/playwright-report/

git check-ignore docs/swarm-memory/
# Should output: docs/swarm-memory/

# Verify SPEC-13 in correct location
ls docs/specs/active/SPEC-13-lake-template/
# Should show planning files

# Verify SPEC-12 summary moved
ls docs/specs/_completed/SPEC-12-wma-template/SPEC-12-POST-MERGE-COMPLETE.md
# Should exist
```

---

## Next Steps

1. **Execute Commit Sequence** (Steps 1-7 above)
2. **Verify Clean State** (post-commit verification)
3. **Continue SPEC-13 Development** (files now in correct location)
4. **Use Compliance Tools** (test:compliance scripts available)

---

## Memory Storage

This categorization stored in:
```
swarm/planner/file-categories
```

All 31+ files analyzed, categorized, and actionable.
