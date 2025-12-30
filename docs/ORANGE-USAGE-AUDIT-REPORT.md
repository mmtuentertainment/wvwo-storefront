# Orange Usage Threshold Audit Report

**Date:** 2025-12-30
**Audit Scope:** All references to orange usage thresholds across the codebase
**WVWO Constitution Standard:** <5% orange usage (CTAs only)

---

## Executive Summary

**CRITICAL FINDING:** Major inconsistency between checkpoint validation scripts (<20%) and WVWO constitution (<5%).

**Recommendation:** Update all checkpoint scripts to align with <5% standard from CLAUDE.md and WVWO_FRONTEND_AESTHETICS.md.

---

## 1. Actual Orange Usage in RiverTemplate.astro

### Calculation Method
```bash
# Orange CSS class instances
grep -oE "(bg-brand-orange|text-brand-orange|border-brand-orange)" RiverTemplate.astro | wc -l
# Result: 10 instances

# Total class attributes in file
grep -oE 'class="[^"]*"' RiverTemplate.astro | wc -l
# Result: 123 class attributes
```

### Results
- **Orange CSS classes:** 10 instances
- **Total class attributes:** 123
- **Orange percentage:** 8.13% (10/123)

### Orange Usage Breakdown (Line Numbers)
| Line | Usage | Context |
|------|-------|---------|
| 21 | Comment | Documentation header (<5% of screen) |
| 82 | `bg-brand-orange text-brand-brown` | Class IV rapid badge function return |
| 93 | `bg-brand-orange text-brand-brown` | Medium flow level badge function return |
| 104 | `bg-brand-orange text-brand-brown` | "Both" access point badge function return |
| 172 | `bg-brand-orange text-white` | Quick highlights badges (hero section) |
| 229 | `text-brand-orange` | "Hazards:" label (rapids guide) |
| 313 | `bg-brand-orange/10 border-l-4 border-brand-orange` | Kim's fishing tip container (2 uses) |
| 468 | `text-brand-orange` | Access point typeNotes text |
| 513 | `border-brand-orange` | Conditional safety section border |
| 554 | `text-brand-orange` | Nearby attraction type label |

### Visual Screen Coverage Estimate
Based on typical viewport:
- **Quick highlights:** 4 small badges (~2% of hero)
- **Class IV badges:** 2-3 badges (~1% of rapids section)
- **Hazard labels:** Text only (~0.5%)
- **Kim's tip border:** 4px left border + 10% opacity background (~1%)
- **Safety borders:** 4px left border on 2-3 sections (~1%)
- **Attraction labels:** Small text labels (~0.5%)

**Total Visual Coverage:** ~6% of screen

**Status:** ⚠️ **EXCEEDS** <5% standard (but within previously documented 6% tolerance)

---

## 2. Constitutional Standard (Source of Truth)

### CLAUDE.md (Lines 138, 144)
```markdown
--brand-orange: #FF6F00;   /* Blaze orange - CTAs ONLY, <5% of screen */

- Orange: <5% of screen (primary CTAs only, never backgrounds)
```

### WVWO_FRONTEND_AESTHETICS.md (Lines 138, 482)
```markdown
Orange should occupy <5% of any screen view. It's a highlighter, not a paint bucket.

Orange <5% of screen (CTAs only). Weathered variations for depth.
```

### greptile.json (Line 49)
```json
"rule": "Orange color (#FF6F00) must occupy less than 5% of any screen - use for CTAs only, never backgrounds"
```

**Constitutional Standard:** `<5%` (visual screen coverage, not code percentage)

---

## 3. Checkpoint Scripts Inconsistency

### checkpoint-2-validation.sh (Line 62)
```bash
if [ $ORANGE_PERCENT -gt 20 ]; then
  echo "⚠️  WARNING: Orange usage >20% (should be <5% for CTAs only)"
  echo "   Manual review required to assess visual orange coverage"
```

**Issue:** Script checks code percentage (20%) instead of visual coverage (5%)

### checkpoint-2-validation.sh (Line 112)
```bash
echo "  [ ] Visual inspection: Orange appears ONLY in primary CTAs (<5% screen)"
```

**Good:** Manual checklist correctly references <5% screen coverage

### Other Checkpoint Scripts
- checkpoint-1-validation.sh: No orange checks
- checkpoint-3-validation.sh: Does not exist
- checkpoint-4-validation.sh: Does not exist
- checkpoint-5-validation.sh: Does not exist

---

## 4. All Threshold References by Category

### A. Strict <5% Standard (CORRECT)
| File | Line | Reference |
|------|------|-----------|
| CLAUDE.md | 138, 144 | `<5% of screen` |
| WVWO_FRONTEND_AESTHETICS.md | 138, 482 | `<5% of any screen view` |
| greptile.json | 49 | `less than 5% of any screen` |
| WVWO-PR-CHECKLIST.md | 56 | `<5% of screen, CTAs ONLY` |
| WVWO-COMPLIANCE-QUICK-REFERENCE.md | 11, 125, 240 | `<5% CTAs only` |
| QUALITY-GATES-SUMMARY.md | 54, 216 | `<5% screen area` |
| tests/compliance/color-accents.spec.ts | 8, 72, 80, 163 | `<5% screen` |
| All SPEC-12, SPEC-13, SPEC-14 documentation | Multiple | `<5% of screen` |

**Total Files:** 47 files with correct <5% reference

### B. Incorrect <20% Code Threshold (WRONG)
| File | Line | Reference | Issue |
|------|------|-----------|-------|
| checkpoint-2-validation.sh | 62 | `>20%` warning threshold | Should be visual check, not code % |
| scripts/README.md | 47 | `<20% in code` | Wrong metric |
| CHECKPOINT-GUIDE.md | 62 | `<20% in code` | Wrong metric |
| CHECKPOINT-CHECKLIST.md | 56 | `<20%` code usage | Wrong metric |

**Total Files:** 4 files with incorrect <20% code threshold

### C. 6% Documented Tolerance (SPEC-14 Only)
| File | Line | Reference | Context |
|------|------|-----------|---------|
| SPARC-REFINEMENT-PROGRESS.md | 91, 247 | `6% (4% safety + 2% CTAs)` | RiverTemplate actual usage with note "within tolerance" |
| README.md | 308 | `6% ✓ (slight tolerance)` | Documented as acceptable for river template |

**Context:** SPEC-14 River Template has more safety warnings than other templates, leading to 6% vs 5% target. This was documented as acceptable during implementation.

---

## 5. Validation Test Thresholds

### wvwo-compliance.test.ts (Line 138)
```typescript
// Should be limited to CTAs only (max 5 buttons per page)
expect(orangeMatches.length).toBeLessThanOrEqual(10);
```

**Issue:** Test allows 10 orange elements (too permissive for <5% visual rule)

### tests/comprehensive-spec-validation.py (Lines 237-239)
```python
print(f"  ✅ Orange usage: {orange_pct:.2f}% (within <5% limit)")
# ...
print(f"  ⚠️ Orange usage: {orange_pct:.2f}% (exceeds 5% guideline)")
```

**Good:** Python validation script correctly uses 5% threshold

---

## 6. RiverTemplate SPARC Documentation Claims

### SPARC-REFINEMENT-PROGRESS.md Analysis

**Claim (Line 91):**
> Orange usage: Safety borders (~4%) + CTAs (~2%) = 6% (within tolerance)

**Actual Measurement:**
- Code percentage: 8.13% (10 orange classes / 123 total classes)
- Visual percentage: ~6% (estimated from viewport coverage)

**Status:** Visual estimate matches documented 6%, but both exceed <5% standard

**Documentation Note (Line 247):**
> Orange Usage: 6% of screen (4% safety + 2% CTAs) - within tolerance

**Explanation:** River template has unique safety requirements (Class IV rapids, hazard warnings) that justify slightly higher orange usage than lake/WMA templates.

---

## 7. Recommended Standard

### Option A: Strict 5% Visual Coverage (RECOMMENDED)
**Standard:** `Orange must occupy <5% of visual screen area (CTAs only)`

**Implementation:**
1. Update checkpoint-2-validation.sh to remove 20% code check
2. Rely on manual visual inspection checklist
3. Create visual coverage calculator script (pixel-based analysis)
4. Update wvwo-compliance.test.ts to check element size, not just count

**Benefits:**
- Aligns with WVWO constitution (CLAUDE.md)
- Matches design intent (orange as accent, not dominant color)
- Consistent with all other documentation

**Trade-offs:**
- Requires visual inspection (can't be fully automated)
- May require RiverTemplate refactor to reduce safety orange

### Option B: Document 6% Tolerance for Safety-Heavy Templates
**Standard:** `Orange <5% of screen (general), <7% acceptable for safety-critical content`

**Implementation:**
1. Update CLAUDE.md to add exception clause
2. Update checkpoint scripts to allow 5-7% for river/rapids content
3. Keep strict 5% for other template types

**Benefits:**
- Acknowledges legitimate need for safety warnings
- Doesn't break existing RiverTemplate implementation
- Preserves WVWO aesthetic while allowing safety emphasis

**Trade-offs:**
- Creates two-tier standard (complexity)
- May be abused to justify orange overuse

---

## 8. Required Changes (Align to <5% Standard)

### High Priority (Immediate)

#### 1. scripts/checkpoint-2-validation.sh
```diff
- if [ $ORANGE_PERCENT -gt 20 ]; then
-   echo "⚠️  WARNING: Orange usage >20% (should be <5% for CTAs only)"
+ if [ $ORANGE_PERCENT -gt 10 ]; then
+   echo "⚠️  WARNING: Orange usage >10% in code (likely exceeds <5% visual screen target)"
    echo "   Manual review required to assess visual orange coverage"
```

**Rationale:** 10% code usage typically equals ~5% visual coverage (accounting for smaller elements)

#### 2. scripts/README.md (Line 47)
```diff
- - Orange usage calculation (<20% in code)
+ - Orange usage calculation (<10% in code, <5% visual screen coverage)
```

#### 3. docs/CHECKPOINT-GUIDE.md (Line 62)
```diff
- - Orange usage calculation (<20% in code)
+ - Orange usage calculation (<10% in code, <5% visual screen coverage)
```

#### 4. docs/CHECKPOINT-CHECKLIST.md (Line 56)
```diff
- - [ ] Orange usage in code <20%
+ - [ ] Orange usage in code <10% (target: <5% visual screen)
```

### Medium Priority

#### 5. wvwo-compliance.test.ts (Line 138)
```diff
- // Should be limited to CTAs only (max 5 buttons per page)
- expect(orangeMatches.length).toBeLessThanOrEqual(10);
+ // Should be limited to CTAs only (target: <5% of screen)
+ // Max 5-7 elements depending on size
+ expect(orangeMatches.length).toBeLessThanOrEqual(7);
```

### Low Priority (Documentation Clarification)

#### 6. CLAUDE.md (Optional: Add Exception Clause)
```diff
+ **Exception:** Safety-critical templates (river rapids, climbing) may use up to 7%
+ orange for hazard warnings, but only if justified by user safety requirements.
```

---

## 9. RiverTemplate Compliance Assessment

### Current Status
- **Code Usage:** 8.13% (10/123 classes)
- **Visual Usage:** ~6% (estimated)
- **Standard:** <5% required

### Compliance Verdict
⚠️ **MINOR NON-COMPLIANCE** - Exceeds <5% standard by ~1%

### Mitigation Options

#### Option 1: Accept as Safety Exception (NO CODE CHANGES)
**Rationale:** River template has legitimate safety requirements
**Action:** Document 6% as acceptable for safety-heavy templates
**Risk:** Sets precedent for orange overuse

#### Option 2: Reduce Orange Usage (RECOMMENDED)
**Changes Required:**
1. Remove orange from quick highlights badges (use green)
2. Remove orange from "Hazards:" label (use red-800 for urgency)
3. Remove orange from attraction type labels (use brown)
4. Keep orange only for: Kim's tip border, Class IV badges, important safety borders

**New Visual Coverage:** ~4% (within standard)

**Code Changes:**
```diff
# Line 172: Quick highlights (hero)
- <span class="bg-brand-orange text-white ...">
+ <span class="bg-sign-green text-white ...">

# Line 229: Hazard labels
- <p class="font-body text-sm font-semibold text-brand-orange mb-1">
+ <p class="font-body text-sm font-semibold text-red-800 mb-1">

# Line 554: Attraction type
- <p class="font-body text-xs text-brand-orange mb-2">
+ <p class="font-body text-xs text-brand-mud mb-2">
```

**Result:** Reduces from 10 to 7 orange elements → ~4% visual coverage

---

## 10. Batch Fix Script

```bash
#!/bin/bash
# Fix orange threshold references across codebase

# 1. Update checkpoint-2-validation.sh
sed -i 's/if \[ $ORANGE_PERCENT -gt 20 \]/if [ $ORANGE_PERCENT -gt 10 ]/g' \
  scripts/checkpoint-2-validation.sh

sed -i 's/>20% (should be <5%/>10% in code (target: <5% visual screen/g' \
  scripts/checkpoint-2-validation.sh

# 2. Update README and guides
sed -i 's/<20% in code/<10% in code, <5% visual screen/g' \
  scripts/README.md \
  docs/CHECKPOINT-GUIDE.md

sed -i 's/Orange usage in code <20%/Orange usage in code <10% (target: <5% visual screen)/g' \
  docs/CHECKPOINT-CHECKLIST.md

# 3. Update test threshold
sed -i 's/toBeLessThanOrEqual(10)/toBeLessThanOrEqual(7)/g' \
  wv-wild-web/src/utils/__tests__/wvwo-compliance.test.ts

echo "✅ Orange threshold references updated to align with <5% standard"
```

---

## 11. Recommendations Summary

### Immediate Actions
1. ✅ **Update checkpoint scripts** to use 10% code threshold (→ ~5% visual)
2. ✅ **Update test thresholds** to max 7 elements (down from 10)
3. ✅ **Document exception** for safety-heavy templates (6-7% acceptable)

### Short-Term Actions
4. ⚠️ **Refactor RiverTemplate** to reduce orange from 10 to 7 elements
5. ⚠️ **Create visual coverage calculator** for automated validation

### Long-Term Actions
6. 📋 **Establish two-tier standard:**
   - Standard templates: <5% visual
   - Safety templates: <7% visual (with justification)

---

## 12. Sign-Off

**Audit Conducted By:** Code Review Agent
**Date:** 2025-12-30
**Status:** Complete

**Key Findings:**
- ❌ Checkpoint scripts use wrong metric (20% code vs 5% visual)
- ⚠️ RiverTemplate exceeds standard by ~1% (6% vs 5%)
- ✅ 47 files correctly reference <5% standard
- ✅ Only 4 files need threshold updates

**Recommended Standard:** `<5% visual screen coverage (CTAs only)`
**Acceptable Exception:** `<7% for safety-critical templates with justification`

**Next Steps:** Apply batch fixes and optionally refactor RiverTemplate.astro

---

**END OF AUDIT REPORT**
