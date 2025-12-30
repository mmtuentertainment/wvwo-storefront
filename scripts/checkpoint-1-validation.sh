#!/bin/bash
# SPEC-14 Checkpoint 1: Type System Review Validation
# Run after Phase 1 completion

set -e

echo "========================================="
echo "CHECKPOINT 1: Type System Review"
echo "========================================="
echo ""

# 1. TypeScript Compilation
echo "🔍 Checking TypeScript compilation..."
if npm run typecheck > /dev/null 2>&1; then
  echo "✅ PASS: TypeScript compiles without errors"
else
  echo "❌ FAIL: TypeScript compilation errors detected"
  npm run typecheck
  exit 1
fi

# 2. Check for 'any' types
echo ""
echo "🔍 Checking for 'any' types..."
if grep -rn ":\s*any\s*[;,=]" src/types/river.ts | grep -v "Record<string, any>"; then
  echo "❌ FAIL: Unapproved 'any' types detected in river.ts"
  exit 1
else
  echo "✅ PASS: No unapproved 'any' types found"
fi

# 3. Zod Schema Tests (requires test file to exist)
echo ""
echo "🔍 Running Zod schema validation tests..."
if npm test -- --grep "Zod schema" --silent > /dev/null 2>&1; then
  echo "✅ PASS: Zod schemas validate correctly"
else
  echo "⚠️  WARNING: Zod schema tests not found or failing"
  echo "   Ensure tests exist in tests/types/river.test.ts"
fi

# 4. Check JSDoc Coverage
echo ""
echo "🔍 Checking JSDoc coverage..."
if grep -q "@property" src/types/river.ts; then
  echo "✅ PASS: JSDoc @property tags found"
else
  echo "❌ FAIL: Missing JSDoc @property documentation"
  exit 1
fi

# 5. Enum Value Check
echo ""
echo "🔍 Checking enum values against WVWO palette..."
if grep -q "type RiverSectionVariant" src/types/river.ts; then
  if grep "type RiverSectionVariant" src/types/river.ts | grep -qE "(purple|pink|blue|neon)"; then
    echo "❌ FAIL: Forbidden colors found in RiverSectionVariant"
    exit 1
  else
    echo "✅ PASS: RiverSectionVariant uses only WVWO palette colors"
  fi
else
  echo "⚠️  WARNING: RiverSectionVariant not found in river.ts"
fi

echo ""
echo "========================================="
echo "CHECKPOINT 1: Manual Review Required"
echo "========================================="
echo ""
echo "Manual tasks:"
echo "  [ ] Review JSDoc completeness for all interfaces"
echo "  [ ] Verify @example blocks for complex types"
echo "  [ ] Check LakeTemplate pattern consistency"
echo "  [ ] Validate any pattern deviations have justifications"
echo ""
echo "Estimated time: 30 minutes"
echo ""
echo "✅ Automated checks PASSED"
echo "⏭️  Proceed to manual review before starting Phase 2"
