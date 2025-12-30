#!/bin/bash

# Import Path Correction Script
# Fixes the single mismatch found in MIGRATION-STRATEGY-SPEC-45.md
# Date: 2025-12-30

echo "======================================"
echo "Import Path Correction Script"
echo "======================================"
echo ""

# Define the file to fix
TARGET_FILE="docs/MIGRATION-STRATEGY-SPEC-45.md"

# Check if file exists
if [ ! -f "$TARGET_FILE" ]; then
    echo "❌ ERROR: File not found: $TARGET_FILE"
    exit 1
fi

echo "📄 Target file: $TARGET_FILE"
echo ""

# Create backup
BACKUP_FILE="${TARGET_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
cp "$TARGET_FILE" "$BACKUP_FILE"
echo "💾 Backup created: $BACKUP_FILE"
echo ""

# Show current line (Line 61)
echo "🔍 Current line 61 (BEFORE):"
sed -n '61p' "$TARGET_FILE"
echo ""

# Apply fix
sed -i "s|from '@/types/river-template'|from '@/types/adventure'|g" "$TARGET_FILE"

# Verify change
echo "✅ Updated line 61 (AFTER):"
sed -n '61p' "$TARGET_FILE"
echo ""

# Count changes
CHANGES=$(diff "$BACKUP_FILE" "$TARGET_FILE" | grep -c "^<")

if [ "$CHANGES" -eq 0 ]; then
    echo "⚠️  WARNING: No changes detected. The line may have already been fixed."
    echo "    Or the pattern didn't match. Manual verification recommended."
else
    echo "✅ SUCCESS: $CHANGES line(s) corrected"
fi

echo ""
echo "======================================"
echo "Next Steps:"
echo "======================================"
echo "1. Review the changes in: $TARGET_FILE"
echo "2. Run TypeScript validation:"
echo "   cd wv-wild-web && npm run typecheck"
echo "3. If satisfied, delete backup: $BACKUP_FILE"
echo "4. If issues occur, restore from backup:"
echo "   cp $BACKUP_FILE $TARGET_FILE"
echo ""
echo "✅ Script completed"
