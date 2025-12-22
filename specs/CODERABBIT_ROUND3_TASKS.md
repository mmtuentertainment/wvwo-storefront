# CodeRabbit Round 3 Review - Comprehensive Fix Task

## Overview
CodeRabbit has flagged 8+ issues across multiple SPEC files in PR #46. Use Hive Mind to coordinate systematic fixes.

## Issues Cataloged

### 1. Path Normalization (Windows → POSIX)
**Files Affected**:
- `docs/specs/CODERABBIT_ROUND2_REMAINING.md` (line ~43: `./docs\\claude-code-agents-wvwo.html`)
- `docs/specs/Mountain State Adventure Destination/SPEC-08-adventure-card-component/PROMPT.md` (line ~242: backslash in save location)
- Additional files likely affected (search needed)

**Fix**: Replace all `\\` with `/` in file paths; use `docs/path/to/file` format (no leading `./`)

### 2. Missing Code Block Language Identifiers (MD040)
**Files Affected**:
- `docs/specs/CODERABBIT_ROUND2_REMAINING.md` (lines 27, 32, 55-176: Task blocks)
- `docs/specs/Mountain State Adventure Destination/SPEC-19-template-historic/PROMPT.md` (line 22: WebSearch queries, line 81)
- `docs/specs/Mountain State Adventure Destination/SPEC-27-migrate-burnsville-lake-recreation/PROMPT.md` (line 81: output path)
- `docs/specs/Mountain State Adventure Destination/SPEC-28-setup-301-redirects/PROMPT.md` (lines 97-110: redirects format)
- `docs/specs/Mountain State Adventure Destination/SPEC-32-destination-canaan-valley/PROMPT.md` (lines 320, 331, 338, 411)
- `docs/specs/Mountain State Adventure Destination/SPEC-33-destination-ace-adventure-resort/PROMPT.md` (likely similar)

**Fix**: Add `text`, `bash`, `typescript`, or `plaintext` language identifiers to all bare ` ``` ` fences

### 3. CODERABBIT_ROUND2_REMAINING.md Markdown Violations
**File**: `docs/specs/CODERABBIT_ROUND2_REMAINING.md`

**Issues**:
- MD022: Missing blank lines after headings (lines 3, 8, 15, 20, 25)
- MD031: Missing blank lines before code fences (lines 27, 32)

**Fix**: Add blank lines as specified

### 4. SPEC-16 Template Completeness
**File**: `docs/specs/Mountain State Adventure Destination/SPEC-16-template-cave/PROMPT.md`

**Issue**: Missing Astro code skeletons for:
- Safety Guidelines section (uses `safety.rules`, `safety.prohibited`, `safety.emergencyContact` props)
- History section (uses `history.discovery`, `history.geologicalAge`, `history.notableEvents`, `history.localLegends` props)

**Fix**: Insert complete Astro section skeletons after line 469 (after Pricing & Hours, before `---`)

### 5. SPEC-19 Type Safety Enhancement (Optional/Nitpick)
**File**: `docs/specs/Mountain State Adventure Destination/SPEC-19-template-historic/PROMPT.md`

**Issue**: `structures[].condition` is free-form string; risk of typos

**Suggestion**: Define union type: `type StructureCondition = "restored" | "ruins" | "preserved" | "reconstructed"`

**Priority**: Low (nitpick)

## Hive Mind Orchestration Strategy

### Scout Teams (Parallel)
1. **Path Scout**: Search for all Windows backslash paths across `docs/specs/**/*.md`
2. **MD040 Scout**: Identify all bare code fences missing language tags
3. **Template Scout**: Review SPEC-16 cave template and extract missing section requirements

### Implementation Teams (Sequential after scouts)
1. **Bulk Path Normalizer**: Fix all Windows paths → POSIX
2. **Language Tag Fixer**: Add language identifiers to all flagged code blocks
3. **SPEC-16 Implementer**: Add Safety Guidelines + History section skeletons
4. **Meta-Doc Fixer**: Fix `CODERABBIT_ROUND2_REMAINING.md` markdown violations

### Verification Team
1. **Linter**: Run `markdownlint-cli2` on all modified files
2. **Path Validator**: Grep for remaining backslashes in SPEC files
3. **Build Test**: Verify Astro build still passes

## Success Criteria
- [ ] Zero MD040 violations in modified files
- [ ] Zero Windows backslash paths in SPEC files
- [ ] SPEC-16 template has all 8 required sections with code skeletons
- [ ] CODERABBIT_ROUND2_REMAINING.md passes markdown linting
- [ ] All changes committed and pushed to PR #46
- [ ] Build passes on Cloudflare Pages

## Notes
- This is primarily documentation quality work
- No functional code changes to runtime Astro components
- Focus on spec completeness and cross-platform compatibility
