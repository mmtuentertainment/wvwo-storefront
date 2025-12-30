#!/bin/bash
# SPEC-14 Checkpoint 4: SEO Schema Validation
# Run after Phase 4 completion

set -e

COMPONENT_PATH="src/components/templates/RiverTemplate.astro"

echo "========================================="
echo "CHECKPOINT 4: SEO Schema Validation"
echo "========================================="
echo ""

if [ ! -f "$COMPONENT_PATH" ]; then
  echo "❌ FAIL: RiverTemplate.astro not found at $COMPONENT_PATH"
  exit 1
fi

# 1. JSON-LD Presence Check
echo "🔍 Checking for JSON-LD schema..."
if grep -q "application/ld+json" "$COMPONENT_PATH"; then
  echo "✅ PASS: JSON-LD script tag found"
else
  echo "❌ FAIL: JSON-LD schema missing"
  exit 1
fi

# 2. TouristAttraction Schema Check
echo ""
echo "🔍 Checking for TouristAttraction schema..."
if grep -q '"@type".*"TouristAttraction"' "$COMPONENT_PATH"; then
  echo "✅ PASS: TouristAttraction schema found"

  # Check required properties
  REQUIRED_PROPS=("name" "description" "address" "geo" "url")
  for prop in "${REQUIRED_PROPS[@]}"; do
    if grep -q "\"$prop\"" "$COMPONENT_PATH"; then
      echo "   ✅ $prop property present"
    else
      echo "   ❌ MISSING: $prop property"
      exit 1
    fi
  done
else
  echo "❌ FAIL: TouristAttraction schema missing"
  exit 1
fi

# 3. LocalBusiness Schema Check
echo ""
echo "🔍 Checking for LocalBusiness schemas..."
if grep -q '"@type".*"LocalBusiness"' "$COMPONENT_PATH"; then
  echo "✅ PASS: LocalBusiness schemas found"

  # Check contact method presence
  if grep -q "telephone\|email" "$COMPONENT_PATH"; then
    echo "   ✅ Contact methods present"
  else
    echo "   ⚠️  WARNING: No contact methods found"
  fi
else
  echo "⚠️  WARNING: No LocalBusiness schemas found (OK if no outfitters/guides)"
fi

# 4. BreadcrumbList Schema Check
echo ""
echo "🔍 Checking for BreadcrumbList schema..."
if grep -q '"@type".*"BreadcrumbList"' "$COMPONENT_PATH"; then
  echo "✅ PASS: BreadcrumbList schema found"

  # Check itemListElement
  if grep -q "itemListElement" "$COMPONENT_PATH"; then
    echo "   ✅ itemListElement property present"
  else
    echo "   ❌ MISSING: itemListElement property"
    exit 1
  fi
else
  echo "❌ FAIL: BreadcrumbList schema missing"
  exit 1
fi

# 5. Meta Tags Check
echo ""
echo "🔍 Checking for meta tags..."
REQUIRED_META=("og:title" "og:description" "og:image" "twitter:card")
for meta in "${REQUIRED_META[@]}"; do
  if grep -q "property=\"$meta\"\|name=\"$meta\"" "$COMPONENT_PATH"; then
    echo "   ✅ $meta present"
  else
    echo "   ⚠️  WARNING: $meta missing"
  fi
done

# 6. JSON-LD Syntax Validation (basic)
echo ""
echo "🔍 Checking JSON-LD syntax..."
JSON_LD=$(grep -Pzo '(?s)<script type="application/ld\+json">.*?</script>' "$COMPONENT_PATH" | tr -d '\0' | sed -n 's/.*<script type="application\/ld+json">\(.*\)<\/script>.*/\1/p')

if [ -n "$JSON_LD" ]; then
  # Check for common syntax errors
  if echo "$JSON_LD" | grep -q "@context.*schema.org"; then
    echo "   ✅ @context present"
  else
    echo "   ❌ MISSING: @context with schema.org"
    exit 1
  fi

  if echo "$JSON_LD" | grep -q "@type"; then
    echo "   ✅ @type present"
  else
    echo "   ❌ MISSING: @type property"
    exit 1
  fi
else
  echo "   ⚠️  WARNING: Could not extract JSON-LD for validation"
fi

echo ""
echo "========================================="
echo "CHECKPOINT 4: Manual Review Required"
echo "========================================="
echo ""
echo "Manual tasks:"
echo "  [ ] Build project: npm run build"
echo "  [ ] Test with Google Rich Results Test:"
echo "      https://search.google.com/test/rich-results"
echo "  [ ] Validate with Schema.org validator:"
echo "      https://validator.schema.org/"
echo "  [ ] Verify meta tags follow formulas:"
echo "      - Title: 55-65 chars, includes river name + WV"
echo "      - Description: 145-165 chars, includes key features"
echo "  [ ] Check breadcrumb schema matches visual breadcrumb"
echo "  [ ] Verify all LocalBusiness entities have contact info"
echo "  [ ] Confirm JSON-LD parses without errors"
echo ""
echo "Commands to run:"
echo "  npm run build"
echo "  # Then upload dist/rivers/*.html to validation tools"
echo ""
echo "Estimated time: 45 minutes"
echo ""
echo "✅ Automated checks PASSED"
echo "⏭️  Proceed to manual validation before Phase 5"
