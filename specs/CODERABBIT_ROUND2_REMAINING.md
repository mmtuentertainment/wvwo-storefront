# CodeRabbit Round 2 - Remaining Work

## Completed (Committed)
- [x] SPEC-05 plan.md markdown fixes (MD036, MD040, MD031)

## Remaining for Next Pass

### High Priority
- [ ] Expand BLUEPRINT.md Phase 3 (lines 883-903) with detailed checklists
  - Add Data Schema Setup subsection
  - Add Content Blocks Standardization
  - Add Destination Page Templates
  - Add Build & Deploy checklist
  
### Bulk Markdown Linting (70+ SPEC files)
- [ ] Fix MD022: Blank lines around headings
- [ ] Fix MD031: Blank lines around code blocks
- [ ] Fix MD040: Add language identifiers to code blocks

### Technical Notes
- **Issue**: npm cache lockfile preventing npx markdownlint-cli2
- **Issue**: BLUEPRINT.md line ending mismatches preventing automated replace
- **Solution**: Will need manual editing or alternative approach for next session

### Suggested Approach for Next Session
1. Install markdownlint-cli2 globally to avoid npx cache issues:
   ```bash
   npm install -g markdownlint-cli2
   ```

2. Run bulk fix manually:
   ```bash
   markdownlint-cli2 --fix "docs/specs/Mountain State Adventure Destination/**/*.md"
   markdownlint-cli2 --fix "docs/BLUEPRINT.md"
   markdownlint-cli2 --fix "docs/constitution.md"
   ```

3. Manually expand BLUEPRINT.md Phase 3 using detailed checklist from implementation_plan.md

4. Spot-check 5 random SPEC files for lingering MD040 violations
