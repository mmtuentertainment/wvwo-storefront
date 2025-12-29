#!/bin/bash
# validate-test-page.sh
# Quick validation script for __test-wma-integration.astro

echo "=== WMA Integration Test Page Validation ==="
echo ""

# Check source file exists
if [ -f "src/pages/__test-wma-integration.astro" ]; then
    echo "✅ Source file exists: src/pages/__test-wma-integration.astro"
    echo "   Size: $(wc -l < src/pages/__test-wma-integration.astro) lines"
else
    echo "❌ Source file not found"
    exit 1
fi

# Count component imports
echo ""
echo "Component Imports:"
grep "^import.*from.*components/adventure" src/pages/__test-wma-integration.astro | wc -l | xargs echo "  Adventure components:"
grep "^import.*from.*components" src/pages/__test-wma-integration.astro | wc -l | xargs echo "  Total components:"

# Check for all expected components
echo ""
echo "Component Usage:"
grep -q "AdventureQuickStats" src/pages/__test-wma-integration.astro && echo "  ✅ AdventureQuickStats" || echo "  ❌ AdventureQuickStats"
grep -q "AdventureFeatureSection" src/pages/__test-wma-integration.astro && echo "  ✅ AdventureFeatureSection" || echo "  ❌ AdventureFeatureSection"
grep -q "AdventureGettingThere" src/pages/__test-wma-integration.astro && echo "  ✅ AdventureGettingThere" || echo "  ❌ AdventureGettingThere"
grep -q "AdventureCampingList" src/pages/__test-wma-integration.astro && echo "  ✅ AdventureCampingList" || echo "  ❌ AdventureCampingList"
grep -q "AdventureAmenitiesGrid" src/pages/__test-wma-integration.astro && echo "  ✅ AdventureAmenitiesGrid" || echo "  ❌ AdventureAmenitiesGrid"
grep -q "AdventureGearChecklist" src/pages/__test-wma-integration.astro && echo "  ✅ AdventureGearChecklist" || echo "  ❌ AdventureGearChecklist"
grep -q "AdventureCTA" src/pages/__test-wma-integration.astro && echo "  ✅ AdventureCTA" || echo "  ❌ AdventureCTA"
grep -q "AdventureRelatedShop" src/pages/__test-wma-integration.astro && echo "  ✅ AdventureRelatedShop" || echo "  ❌ AdventureRelatedShop"

# Check mock data
echo ""
echo "Mock Data Defined:"
grep -q "quickStats:" src/pages/__test-wma-integration.astro && echo "  ✅ quickStats" || echo "  ❌ quickStats"
grep -q "huntingFeatures" src/pages/__test-wma-integration.astro && echo "  ✅ huntingFeatures" || echo "  ❌ huntingFeatures"
grep -q "fishingFeatures" src/pages/__test-wma-integration.astro && echo "  ✅ fishingFeatures" || echo "  ❌ fishingFeatures"
grep -q "campingFacilities" src/pages/__test-wma-integration.astro && echo "  ✅ campingFacilities" || echo "  ❌ campingFacilities"
grep -q "amenities" src/pages/__test-wma-integration.astro && echo "  ✅ amenities" || echo "  ❌ amenities"
grep -q "gearItems" src/pages/__test-wma-integration.astro && echo "  ✅ gearItems" || echo "  ❌ gearItems"
grep -q "shopCategories" src/pages/__test-wma-integration.astro && echo "  ✅ shopCategories" || echo "  ❌ shopCategories"

# Check background variants
echo ""
echo "Background Variants:"
grep 'variant="cream"' src/pages/__test-wma-integration.astro | wc -l | xargs echo "  Cream backgrounds:"
grep 'variant="white"' src/pages/__test-wma-integration.astro | wc -l | xargs echo "  White backgrounds:"
grep 'variant="sign-green"' src/pages/__test-wma-integration.astro | wc -l | xargs echo "  Green backgrounds:"

# Try to find built output
echo ""
echo "Build Output:"
if [ -d "dist" ]; then
    TOTAL_PAGES=$(find dist -name "*.html" | wc -l)
    echo "  Total pages built: $TOTAL_PAGES"

    # Try different possible paths for the test page
    if [ -f "dist/__test-wma-integration.html" ]; then
        echo "  ✅ Found: dist/__test-wma-integration.html"
    elif [ -f "dist/__test-wma-integration/index.html" ]; then
        echo "  ✅ Found: dist/__test-wma-integration/index.html"
    elif [ -f "dist/test-wma-integration/index.html" ]; then
        echo "  ✅ Found: dist/test-wma-integration/index.html"
    else
        echo "  ⚠️  Test page path not immediately found (this is OK, Astro may use different naming)"
    fi
else
    echo "  ⚠️  No dist directory (run 'npm run build' first)"
fi

echo ""
echo "=== Validation Complete ==="
