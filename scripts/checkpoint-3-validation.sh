#!/bin/bash
# SPEC-14 Checkpoint 3: Accessibility Compliance Validation
# Run after Phase 2 completion

set -e

COMPONENT_PATH="src/components/templates/RiverTemplate.astro"

echo "========================================="
echo "CHECKPOINT 3: Accessibility Compliance"
echo "========================================="
echo ""

if [ ! -f "$COMPONENT_PATH" ]; then
  echo "❌ FAIL: RiverTemplate.astro not found at $COMPONENT_PATH"
  exit 1
fi

# 1. ARIA Label Check
echo "🔍 Checking for ARIA labels on sections..."
SECTIONS=$(grep -c "<section" "$COMPONENT_PATH" || echo "0")
ARIA_LABELS=$(grep -c "aria-labelledby\|aria-label" "$COMPONENT_PATH" || echo "0")

echo "   Found $SECTIONS <section> elements"
echo "   Found $ARIA_LABELS ARIA labels"

if [ $SECTIONS -gt 0 ] && [ $ARIA_LABELS -ge $SECTIONS ]; then
  echo "✅ PASS: All sections have ARIA labels"
elif [ $SECTIONS -gt 0 ]; then
  echo "❌ FAIL: Some sections missing ARIA labels ($ARIA_LABELS/$SECTIONS)"
  exit 1
else
  echo "⚠️  WARNING: No sections found yet"
fi

# 2. Semantic HTML Check
echo ""
echo "🔍 Checking semantic HTML structure..."
if grep -q "<main>\|<article>\|<section>\|<nav>" "$COMPONENT_PATH"; then
  echo "✅ PASS: Semantic HTML elements present"
else
  echo "❌ FAIL: Missing semantic HTML elements (main, article, section, nav)"
  exit 1
fi

# 3. Alt Text Check
echo ""
echo "🔍 Checking for alt text on images..."
IMAGES=$(grep -c "<img\|<Image" "$COMPONENT_PATH" || echo "0")
ALT_TEXT=$(grep -c "alt=" "$COMPONENT_PATH" || echo "0")

echo "   Found $IMAGES image elements"
echo "   Found $ALT_TEXT alt attributes"

if [ $IMAGES -gt 0 ] && [ $ALT_TEXT -ge $IMAGES ]; then
  echo "✅ PASS: All images have alt text"
elif [ $IMAGES -gt 0 ]; then
  echo "❌ FAIL: Some images missing alt text ($ALT_TEXT/$IMAGES)"
  exit 1
else
  echo "✅ PASS: No images found (OK if not implemented yet)"
fi

# 4. Keyboard Navigation Check
echo ""
echo "🔍 Checking keyboard navigation attributes..."
if grep -qE "tabindex=\"-1\"|tabindex=\"[2-9]\"" "$COMPONENT_PATH"; then
  echo "❌ FAIL: Invalid tabindex values detected (use 0 or no tabindex)"
  exit 1
else
  echo "✅ PASS: No invalid tabindex values found"
fi

# 5. Color Contrast Check (requires manual verification)
echo ""
echo "🔍 Checking for contrast ratio documentation..."
echo "   ⚠️  Automated contrast testing requires axe-core in browser"
echo "   Manual verification required:"
echo "   - Brown #3E2723 on Cream #FFF8E1: Must be ≥4.5:1"
echo "   - Green #2E7D32 on Cream #FFF8E1: Must be ≥4.5:1"
echo "   - Cream #FFF8E1 on Brown #3E2723: Must be ≥4.5:1"
echo "   - Orange #FF6F00 on Brown #3E2723: Must be ≥4.5:1"

# 6. Touch Target Size Check
echo ""
echo "🔍 Checking for touch target sizing..."
if grep -qE "min-h-\[48px\]|h-12|h-16|min-w-\[48px\]|w-12|w-16" "$COMPONENT_PATH"; then
  echo "✅ PASS: Touch-friendly sizing classes found (≥48px)"
else
  echo "⚠️  WARNING: No explicit touch target sizing found"
  echo "   Ensure interactive elements are ≥48px"
fi

# 7. Shape Icons Check (for colorblind accessibility)
echo ""
echo "🔍 Checking for shape indicators on rapids badges..."
if grep -q "●\|▲\|■\|circle\|triangle\|square" "$COMPONENT_PATH"; then
  echo "✅ PASS: Shape indicators found (good for colorblind users)"
else
  echo "⚠️  WARNING: No shape indicators found"
  echo "   Add ● ▲ ■ to rapids difficulty badges for colorblind accessibility"
fi

echo ""
echo "========================================="
echo "CHECKPOINT 3: Manual Review Required"
echo "========================================="
echo ""
echo "Manual tasks:"
echo "  [ ] Run axe DevTools on built page for automated a11y audit"
echo "  [ ] Verify color contrast ≥4.5:1 with WebAIM Contrast Checker"
echo "  [ ] Test keyboard navigation (Tab, Enter, Space, Arrow keys)"
echo "  [ ] Measure touch targets with browser DevTools (≥48px)"
echo "  [ ] Test with screen reader (NVDA on Windows, JAWS, or VoiceOver)"
echo "  [ ] Verify shape icons on rapids badges (●▲■)"
echo "  [ ] Check focus indicators visible on all interactive elements"
echo "  [ ] Test with Windows High Contrast mode"
echo ""
echo "Estimated time: 1 hour"
echo ""
echo "✅ Automated checks PASSED"
echo "⏭️  Proceed to manual review before deployment"
