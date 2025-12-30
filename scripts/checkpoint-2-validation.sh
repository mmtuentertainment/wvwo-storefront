#!/bin/bash
# SPEC-14 Checkpoint 2: Component WVWO Compliance Validation
# Run after Phase 2 completion

set -e

COMPONENT_PATH="src/components/templates/RiverTemplate.astro"

echo "========================================="
echo "CHECKPOINT 2: Component WVWO Compliance"
echo "========================================="
echo ""

if [ ! -f "$COMPONENT_PATH" ]; then
  echo "❌ FAIL: RiverTemplate.astro not found at $COMPONENT_PATH"
  exit 1
fi

# 1. Forbidden Fonts Check
echo "🔍 Checking for forbidden fonts..."
FORBIDDEN_FONTS="Inter|Poppins|DM Sans|Space Grotesk|Montserrat|Raleway|Open Sans|Outfit|system-ui"
if grep -iE "$FORBIDDEN_FONTS" "$COMPONENT_PATH"; then
  echo "❌ FAIL: Forbidden fonts detected (Inter, Poppins, DM Sans, etc.)"
  exit 1
else
  echo "✅ PASS: No forbidden fonts found"
fi

# 2. Required Fonts Check
echo ""
echo "🔍 Checking for required WVWO fonts..."
if grep -q "font-display\|Bitter" "$COMPONENT_PATH" && \
   grep -q "font-hand\|Permanent Marker" "$COMPONENT_PATH" && \
   grep -q "font-body\|Noto Sans" "$COMPONENT_PATH"; then
  echo "✅ PASS: Required fonts (Bitter, Permanent Marker, Noto Sans) present"
else
  echo "⚠️  WARNING: Some required WVWO fonts may be missing"
fi

# 3. Forbidden Border Radius Check
echo ""
echo "🔍 Checking for forbidden border-radius..."
FORBIDDEN_RADIUS="rounded-(md|lg|xl|2xl|3xl|full)"
if grep -E "$FORBIDDEN_RADIUS" "$COMPONENT_PATH"; then
  echo "❌ FAIL: Forbidden border-radius detected (use rounded-sm ONLY)"
  exit 1
else
  echo "✅ PASS: No forbidden border-radius found"
fi

# 4. Orange Usage Calculation
echo ""
echo "🔍 Calculating orange usage..."
ORANGE_COUNT=$(grep -o "orange" "$COMPONENT_PATH" | wc -l)
TOTAL_COLORS=$(grep -oE "(brown|green|cream|orange)" "$COMPONENT_PATH" | wc -l)

if [ $TOTAL_COLORS -gt 0 ]; then
  ORANGE_PERCENT=$((ORANGE_COUNT * 100 / TOTAL_COLORS))
  echo "   Orange usage: $ORANGE_COUNT / $TOTAL_COLORS colors ($ORANGE_PERCENT%)"

  if [ $ORANGE_PERCENT -gt 5 ]; then
    echo "⚠️  WARNING: Orange usage >5% (WVWO constitution requires <5% for CTAs only)"
    echo "   Manual review required to assess visual orange coverage"
  else
    echo "✅ PASS: Orange usage within acceptable range"
  fi
else
  echo "⚠️  WARNING: No WVWO colors detected in component"
fi

# 5. Forbidden Effects Check
echo ""
echo "🔍 Checking for forbidden effects..."
FORBIDDEN_EFFECTS="backdrop-blur|glassmorphic|bg-gradient-to-r.*to-purple|filter blur"
if grep -iE "$FORBIDDEN_EFFECTS" "$COMPONENT_PATH"; then
  echo "❌ FAIL: Forbidden effects detected (glassmorphism, backdrop-blur, etc.)"
  exit 1
else
  echo "✅ PASS: No forbidden effects found"
fi

# 6. Forbidden Colors Check
echo ""
echo "🔍 Checking for forbidden colors..."
FORBIDDEN_COLORS="#ec4899|#a855f7|#0066cc|purple-|pink-|fuchsia-"
if grep -iE "$FORBIDDEN_COLORS" "$COMPONENT_PATH"; then
  echo "❌ FAIL: Forbidden colors detected (purple, pink, corporate blue)"
  exit 1
else
  echo "✅ PASS: No forbidden colors found"
fi

# 7. Corporate Buzzwords Check
echo ""
echo "🔍 Checking for corporate buzzwords..."
BUZZWORDS="unlock|seamless|revolutionize|next-level|transform the way|cutting-edge|all-in-one platform"
if grep -iE "$BUZZWORDS" "$COMPONENT_PATH"; then
  echo "❌ FAIL: Corporate buzzwords detected in copy"
  echo "   Use Kim's authentic rural WV voice instead"
  exit 1
else
  echo "✅ PASS: No corporate buzzwords found"
fi

echo ""
echo "========================================="
echo "CHECKPOINT 2: Manual Review Required"
echo "========================================="
echo ""
echo "Manual tasks:"
echo "  [ ] Visual inspection: Sharp corners everywhere (rounded-sm only)"
echo "  [ ] Visual inspection: Orange appears ONLY in primary CTAs (<5% screen)"
echo "  [ ] font-hand appears ONLY in fishing.kimsTip section"
echo "  [ ] No glassmorphism or backdrop effects"
echo "  [ ] Color palette matches WVWO (brown #3E2723, green #2E7D32, cream #FFF8E1)"
echo "  [ ] Copy voice check: Sounds like Kim, not marketing agency"
echo "  [ ] Litmus test: Would Kim's neighbors recognize this as 'their shop'?"
echo ""
echo "Estimated time: 45 minutes"
echo ""
echo "✅ Automated checks PASSED"
echo "⏭️  Proceed to manual review before starting Phase 3"
