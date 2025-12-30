#!/bin/bash
# SPEC-14: Run All Quality Checkpoints
# Execute all 5 checkpoints in sequence

set -e

echo "╔══════════════════════════════════════════╗"
echo "║  SPEC-14 Quality Checkpoints Pipeline   ║"
echo "╚══════════════════════════════════════════╝"
echo ""

CHECKPOINTS=(
  "checkpoint-1-validation.sh|Type System Review"
  "checkpoint-2-validation.sh|WVWO Compliance"
  "checkpoint-3-validation.sh|Accessibility"
  "checkpoint-4-validation.sh|SEO Schema"
  "checkpoint-5-validation.sh|Integration Testing"
)

PASSED=0
FAILED=0

for checkpoint in "${CHECKPOINTS[@]}"; do
  IFS='|' read -r script name <<< "$checkpoint"

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Running: $name"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  if [ -f "scripts/$script" ]; then
    if bash "scripts/$script"; then
      echo "✅ $name PASSED"
      ((PASSED++))
    else
      echo "❌ $name FAILED"
      ((FAILED++))
      echo "⚠️  Fix issues before proceeding to next checkpoint"
      exit 1
    fi
  else
    echo "⚠️  WARNING: $script not found"
  fi
done

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║         Checkpoint Summary               ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "Total Checkpoints: ${#CHECKPOINTS[@]}"
echo "Passed: $PASSED"
echo "Failed: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
  echo "🎉 All checkpoints PASSED!"
  echo "✅ SPEC-14 ready for final manual review"
else
  echo "❌ Some checkpoints FAILED"
  echo "⚠️  Review errors and re-run"
  exit 1
fi
