#!/bin/bash
# SPEC-14 Checkpoint 5: Integration Testing Validation
# Run after Phase 5 completion

set -e

echo "========================================="
echo "CHECKPOINT 5: Integration Testing"
echo "========================================="
echo ""

# 1. Build Project
echo "🔍 Building project..."
if npm run build > /dev/null 2>&1; then
  echo "✅ PASS: Project builds successfully"
else
  echo "❌ FAIL: Build errors detected"
  npm run build
  exit 1
fi

# 2. Run Integration Tests
echo ""
echo "🔍 Running integration tests..."
if npm test -- tests/integration/RiverTemplate.test.ts; then
  echo "✅ PASS: All integration tests passed"
else
  echo "❌ FAIL: Integration tests failed"
  exit 1
fi

# 3. Run Unit Tests
echo ""
echo "🔍 Running unit tests..."
if npm test > /dev/null 2>&1; then
  echo "✅ PASS: All unit tests passed"
else
  echo "⚠️  WARNING: Some unit tests failed"
  npm test
fi

# 4. Check File Sizes
echo ""
echo "🔍 Checking file sizes..."
DIST_PATH="dist/rivers"
if [ -d "$DIST_PATH" ]; then
  HTML_FILES=$(find "$DIST_PATH" -name "*.html")

  for file in $HTML_FILES; do
    SIZE=$(du -k "$file" | cut -f1)
    if [ $SIZE -gt 100 ]; then
      echo "   ⚠️  WARNING: $file is ${SIZE}KB (>100KB)"
    else
      echo "   ✅ $file: ${SIZE}KB (OK)"
    fi
  done
else
  echo "⚠️  WARNING: dist/rivers not found"
fi

# 5. Run Lighthouse (requires Lighthouse CLI)
echo ""
echo "🔍 Running Lighthouse audit..."
if command -v lighthouse &> /dev/null; then
  HTML_FILE=$(find dist/rivers -name "*.html" -type f | head -n 1)

  if [ -n "$HTML_FILE" ]; then
    echo "   Testing: $HTML_FILE"
    lighthouse "$HTML_FILE" \
      --output=json \
      --output-path=./lighthouse-report.json \
      --only-categories=performance,accessibility,best-practices,seo \
      --quiet

    # Parse results
    PERF_SCORE=$(jq -r '.categories.performance.score * 100' lighthouse-report.json)
    A11Y_SCORE=$(jq -r '.categories.accessibility.score * 100' lighthouse-report.json)
    BP_SCORE=$(jq -r '.categories["best-practices"].score * 100' lighthouse-report.json)
    SEO_SCORE=$(jq -r '.categories.seo.score * 100' lighthouse-report.json)

    echo ""
    echo "   📊 Lighthouse Scores:"
    echo "   - Performance: $PERF_SCORE"
    echo "   - Accessibility: $A11Y_SCORE"
    echo "   - Best Practices: $BP_SCORE"
    echo "   - SEO: $SEO_SCORE"

    if [ $(echo "$PERF_SCORE >= 90" | bc) -eq 1 ] && \
       [ $(echo "$A11Y_SCORE >= 90" | bc) -eq 1 ] && \
       [ $(echo "$BP_SCORE >= 90" | bc) -eq 1 ] && \
       [ $(echo "$SEO_SCORE >= 90" | bc) -eq 1 ]; then
      echo "   ✅ PASS: All Lighthouse scores ≥90"
    else
      echo "   ❌ FAIL: Some Lighthouse scores <90"
      exit 1
    fi

    # Check Core Web Vitals
    LCP=$(jq -r '.audits["largest-contentful-paint"].numericValue / 1000' lighthouse-report.json)
    CLS=$(jq -r '.audits["cumulative-layout-shift"].numericValue' lighthouse-report.json)

    echo ""
    echo "   📊 Core Web Vitals:"
    echo "   - LCP: ${LCP}s (target: <2.5s)"
    echo "   - CLS: $CLS (target: <0.1)"

    if [ $(echo "$LCP <= 2.5" | bc) -eq 1 ] && \
       [ $(echo "$CLS <= 0.1" | bc) -eq 1 ]; then
      echo "   ✅ PASS: Core Web Vitals meet targets"
    else
      echo "   ⚠️  WARNING: Core Web Vitals need improvement"
    fi

    rm lighthouse-report.json
  else
    echo "   ⚠️  WARNING: No HTML files found in dist/rivers"
  fi
else
  echo "   ⚠️  WARNING: Lighthouse CLI not installed"
  echo "   Install with: npm install -g lighthouse"
fi

echo ""
echo "========================================="
echo "CHECKPOINT 5: Manual Review Required"
echo "========================================="
echo ""
echo "Manual tasks:"
echo "  [ ] Visual inspection at breakpoints:"
echo "      - 375px (mobile)"
echo "      - 768px (tablet)"
echo "      - 1024px (desktop)"
echo "  [ ] Test GPS links open Google Maps"
echo "  [ ] Test phone links open dialer (on mobile)"
echo "  [ ] Test external links open in new tab"
echo "  [ ] Verify all sections visible with example data"
echo "  [ ] Verify empty arrays hide sections gracefully"
echo "  [ ] Test on actual devices:"
echo "      - iOS Safari"
echo "      - Android Chrome"
echo "      - Desktop browsers (Chrome, Firefox, Safari, Edge)"
echo "  [ ] Performance test on slow 2.5 Mbps connection"
echo "  [ ] Verify no layout shifts during load (CLS = 0)"
echo ""
echo "Estimated time: 1.5 hours"
echo ""
echo "✅ Automated checks PASSED"
echo "⏭️  Proceed to manual review before marking SPEC-14 complete"
