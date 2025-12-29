#!/bin/bash

# Visual Regression Testing Runner for elk-river.astro
# T-019: Automated workflow for baseline, comparison, and validation

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  Elk River WMA Visual Regression Testing         ║${NC}"
echo -e "${GREEN}║  T-019: Validate refactored version              ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════╝${NC}"
echo ""

# Check if dev server is running
if ! curl -s http://localhost:4321 > /dev/null; then
  echo -e "${RED}❌ Dev server not running!${NC}"
  echo -e "${YELLOW}Please run 'npm run dev' in another terminal first.${NC}"
  exit 1
fi

echo -e "${GREEN}✓${NC} Dev server is running"
echo ""

# Function to run test group
run_test_group() {
  local group_name=$1
  local grep_pattern=$2

  echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${YELLOW}Running: ${group_name}${NC}"
  echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

  npx playwright test elk-river-visual-regression --grep "$grep_pattern"

  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ ${group_name} passed${NC}"
  else
    echo -e "${RED}✗ ${group_name} failed${NC}"
    return 1
  fi

  echo ""
}

# Main menu
echo "Select test workflow:"
echo ""
echo "  1) Capture Baseline (BEFORE refactoring)"
echo "  2) Capture Comparison (AFTER refactoring)"
echo "  3) Run Pixel Comparison"
echo "  4) Run Functional Validation"
echo "  5) Run Performance Tests"
echo "  6) Run Full Test Suite"
echo "  7) Complete Workflow (Baseline → Refactor → Compare → Validate)"
echo ""
read -p "Enter choice (1-7): " choice

case $choice in
  1)
    echo -e "${YELLOW}📸 Capturing baseline screenshots...${NC}"
    echo ""
    run_test_group "Baseline Capture" "Baseline Capture"

    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✓ Baseline screenshots captured!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Refactor elk-river.astro into components"
    echo "  2. Run option 2 to capture comparison screenshots"
    ;;

  2)
    echo -e "${YELLOW}📸 Capturing comparison screenshots...${NC}"
    echo ""
    run_test_group "Comparison Capture" "Comparison Capture"

    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✓ Comparison screenshots captured!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Run option 3 for pixel comparison"
    echo "  2. Run option 6 for full validation"
    ;;

  3)
    echo -e "${YELLOW}🔍 Running pixel comparison...${NC}"
    echo ""
    run_test_group "Pixel Comparison" "Pixel-by-Pixel"

    if [ -d "tests/screenshots/elk-river/diff" ]; then
      diff_count=$(ls -1 tests/screenshots/elk-river/diff/*.png 2>/dev/null | wc -l)
      if [ $diff_count -gt 0 ]; then
        echo -e "${YELLOW}⚠ Found ${diff_count} diff image(s) in tests/screenshots/elk-river/diff/${NC}"
        echo "Review these images to verify differences are intentional."
      fi
    fi
    ;;

  4)
    echo -e "${YELLOW}🧪 Running functional validation...${NC}"
    echo ""
    run_test_group "Functional Validation" "Functional Requirements"
    ;;

  5)
    echo -e "${YELLOW}⚡ Running performance tests...${NC}"
    echo ""
    run_test_group "Performance Tests" "Performance Comparison"
    ;;

  6)
    echo -e "${YELLOW}🚀 Running full test suite...${NC}"
    echo ""

    # Run all test groups
    all_passed=true

    run_test_group "Pixel Comparison" "Pixel-by-Pixel" || all_passed=false
    run_test_group "Functional Validation" "Functional Requirements" || all_passed=false
    run_test_group "Performance Tests" "Performance Comparison" || all_passed=false
    run_test_group "Accessibility Tests" "Accessibility Requirements" || all_passed=false

    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    if [ "$all_passed" = true ]; then
      echo -e "${GREEN}✓ ALL TESTS PASSED!${NC}"
      echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
      echo ""
      echo "Refactoring validated successfully!"
      echo "  ✓ Visual match confirmed"
      echo "  ✓ All functionality preserved"
      echo "  ✓ No performance regression"
      echo "  ✓ Accessibility maintained"
    else
      echo -e "${RED}✗ SOME TESTS FAILED${NC}"
      echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
      echo ""
      echo "Please review failures and fix before proceeding."
      exit 1
    fi
    ;;

  7)
    echo -e "${YELLOW}📋 Starting complete workflow...${NC}"
    echo ""

    # Step 1: Baseline
    echo -e "${YELLOW}Step 1/3: Capturing baseline...${NC}"
    run_test_group "Baseline Capture" "Baseline Capture"

    # Pause for refactoring
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}Now refactor elk-river.astro into components.${NC}"
    echo -e "${YELLOW}Press Enter when refactoring is complete...${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    read

    # Step 2: Comparison
    echo ""
    echo -e "${YELLOW}Step 2/3: Capturing comparison...${NC}"
    run_test_group "Comparison Capture" "Comparison Capture"

    # Step 3: Validation
    echo ""
    echo -e "${YELLOW}Step 3/3: Running validation...${NC}"

    all_passed=true
    run_test_group "Pixel Comparison" "Pixel-by-Pixel" || all_passed=false
    run_test_group "Functional Validation" "Functional Requirements" || all_passed=false
    run_test_group "Performance Tests" "Performance Comparison" || all_passed=false

    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    if [ "$all_passed" = true ]; then
      echo -e "${GREEN}✓ COMPLETE WORKFLOW PASSED!${NC}"
      echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    else
      echo -e "${RED}✗ WORKFLOW FAILED${NC}"
      echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
      exit 1
    fi
    ;;

  *)
    echo -e "${RED}Invalid choice${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}Visual regression testing complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
