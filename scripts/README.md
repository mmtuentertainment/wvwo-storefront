# SPEC-14 Quality Checkpoint Scripts

## Overview
Automated validation scripts for SPEC-14 (RiverTemplate) quality checkpoints. Each script performs automated checks for specific quality criteria (WVWO compliance, accessibility, type safety, SEO).

## Scripts

### `run-all-checkpoints.sh`
**Purpose**: Execute all 5 checkpoints in sequence
**Usage**: `bash scripts/run-all-checkpoints.sh`
**Time**: ~1h 35min (automated checks only)
**Output**: Summary of passed/failed checkpoints

**When to run**: After completing all phases, before final manual review

---

### `checkpoint-1-validation.sh`
**Purpose**: Type System Review validation
**Usage**: `bash scripts/checkpoint-1-validation.sh`
**Time**: 15 minutes
**Phase**: After Phase 1 (Type Definitions)

**Checks**:
- TypeScript compilation (zero errors)
- No `any` types (except approved)
- Zod schema validation tests
- JSDoc coverage
- Enum values match WVWO palette

**Pass Criteria**: All automated checks pass

**Next Steps**: Manual review of JSDoc completeness and LakeTemplate consistency

---

### `checkpoint-2-validation.sh`
**Purpose**: WVWO Compliance validation
**Usage**: `bash scripts/checkpoint-2-validation.sh`
**Time**: 20 minutes
**Phase**: After Phase 2 (Component Markup)

**Checks**:
- No forbidden fonts (Inter, Poppins, DM Sans, etc.)
- Required fonts present (Bitter, Permanent Marker, Noto Sans)
- No forbidden border-radius (rounded-md/lg/xl/2xl/3xl)
- Orange usage calculation (<20% in code)
- No forbidden effects (glassmorphism, backdrop-blur)
- No forbidden colors (purple, pink, corporate blue)
- No corporate buzzwords in copy

**Pass Criteria**: All automated checks pass

**Next Steps**: Manual visual inspection and voice check

---

### `checkpoint-3-validation.sh`
**Purpose**: Accessibility Compliance validation
**Usage**: `bash scripts/checkpoint-3-validation.sh`
**Time**: 15 minutes
**Phase**: After Phase 2 (Component Markup)

**Checks**:
- ARIA labels on all sections
- Semantic HTML structure
- Alt text on all images
- No invalid tabindex values
- Touch-friendly sizing classes
- Shape indicators on badges

**Pass Criteria**: All automated checks pass

**Next Steps**: Manual axe DevTools audit, contrast checking, keyboard/screen reader testing

---

### `checkpoint-4-validation.sh`
**Purpose**: SEO Schema validation
**Usage**: `bash scripts/checkpoint-4-validation.sh`
**Time**: 15 minutes
**Phase**: After Phase 4 (SEO Implementation)

**Checks**:
- JSON-LD schema presence
- TouristAttraction schema with required properties
- LocalBusiness schemas with contact info
- BreadcrumbList schema structure
- Meta tags presence (og:title, og:description, og:image, twitter:card)
- JSON-LD syntax validation

**Pass Criteria**: All automated checks pass

**Next Steps**: Manual Google Rich Results Test and Schema.org validator

---

### `checkpoint-5-validation.sh`
**Purpose**: Integration Testing validation
**Usage**: `bash scripts/checkpoint-5-validation.sh`
**Time**: 30 minutes
**Phase**: After Phase 5 (Data Population)

**Checks**:
- Project builds successfully
- All integration tests pass
- File sizes <100KB
- Lighthouse audit (requires Lighthouse CLI)
- Core Web Vitals (LCP, CLS)

**Pass Criteria**: All tests pass + Lighthouse scores ≥90

**Next Steps**: Manual cross-browser testing and performance verification

---

## Prerequisites

### Required Tools
```bash
# Node.js and npm (project dependencies)
npm install

# TypeScript compiler (included in project)
npm run typecheck

# Test runner (Vitest, included in project)
npm test
```

### Optional Tools
```bash
# Lighthouse CLI (for Checkpoint 5 performance testing)
npm install -g lighthouse

# jq (for parsing JSON in scripts)
# Linux/Mac: apt-get install jq / brew install jq
# Windows: choco install jq
```

### Browser Extensions
- axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/extension/

---

## Usage Examples

### Sequential Validation (Recommended)
```bash
# Run all checkpoints in order
bash scripts/run-all-checkpoints.sh
```

### Individual Checkpoint Validation
```bash
# After completing Phase 1
bash scripts/checkpoint-1-validation.sh

# After completing Phase 2
bash scripts/checkpoint-2-validation.sh
bash scripts/checkpoint-3-validation.sh

# After completing Phase 4
bash scripts/checkpoint-4-validation.sh

# After completing Phase 5
bash scripts/checkpoint-5-validation.sh
```

### Integration with CI/CD
```yaml
# Example GitHub Actions workflow
name: SPEC-14 Quality Checkpoints

on:
  pull_request:
    paths:
      - 'src/components/templates/RiverTemplate.astro'
      - 'src/types/river.ts'

jobs:
  quality-gates:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - name: Run Quality Checkpoints
        run: bash scripts/run-all-checkpoints.sh
```

---

## Interpreting Results

### Success Output
```
✅ PASS: TypeScript compiles without errors
✅ PASS: No unapproved 'any' types found
✅ PASS: Zod schemas validate correctly
...
✅ Automated checks PASSED
⏭️  Proceed to manual review before starting Phase 2
```

### Failure Output
```
❌ FAIL: TypeScript compilation errors detected
src/types/river.ts:45:12 - error TS2322: Type 'string' is not assignable to type 'number'.
...
Fix issues and re-run checkpoint
```

### Warning Output
```
⚠️  WARNING: Lighthouse CLI not installed
   Install with: npm install -g lighthouse
```
Warnings indicate missing optional tools but don't fail the checkpoint.

---

## Common Issues

### Issue: Permission Denied
```bash
bash: permission denied: ./checkpoint-1-validation.sh
```
**Fix**: Make scripts executable
```bash
chmod +x scripts/*.sh
```

### Issue: TypeScript Errors
```
❌ FAIL: TypeScript compilation errors detected
```
**Fix**: Review `src/types/river.ts` for type errors, run `npm run typecheck` for details

### Issue: Lighthouse Not Found
```
⚠️  WARNING: Lighthouse CLI not installed
```
**Fix**: Install Lighthouse globally
```bash
npm install -g lighthouse
```

### Issue: jq Not Found
```
bash: jq: command not found
```
**Fix**: Install jq JSON processor
```bash
# Ubuntu/Debian
sudo apt-get install jq

# macOS
brew install jq

# Windows (Chocolatey)
choco install jq
```

---

## Script Maintenance

### Adding New Checks
1. Edit appropriate checkpoint script
2. Add check with clear pass/fail output
3. Update documentation in `CHECKPOINT-GUIDE.md`
4. Test script independently
5. Test in `run-all-checkpoints.sh` pipeline

### Modifying Pass Criteria
1. Update check logic in script
2. Document change in `CHECKPOINT-GUIDE.md`
3. Notify team of updated standards
4. Update CI/CD configuration if applicable

---

## Related Documentation

- **CHECKPOINT-GUIDE.md**: Complete checkpoint workflow and manual review checklists
- **SPEC-14**: `docs/spec-14-river-template.md` - Full RiverTemplate specification
- **CLAUDE.md**: WVWO frontend aesthetics and forbidden patterns
- **Integration Tests**: `tests/integration/RiverTemplate.test.ts`

---

## Support

For issues or questions:
1. Review error messages in script output
2. Check `CHECKPOINT-GUIDE.md` troubleshooting section
3. Verify prerequisites are installed
4. Run individual checks manually for debugging

---

## Changelog

### v1.0.0 (2025-01-XX)
- Initial release
- 5 checkpoint validation scripts
- Sequential pipeline runner
- Automated + manual review workflows
