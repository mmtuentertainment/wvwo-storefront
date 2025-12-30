# Import Path Correction Script (PowerShell)
# Fixes the single mismatch found in MIGRATION-STRATEGY-SPEC-45.md
# Date: 2025-12-30

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Import Path Correction Script" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Define the file to fix
$TargetFile = "docs\MIGRATION-STRATEGY-SPEC-45.md"

# Check if file exists
if (-not (Test-Path $TargetFile)) {
    Write-Host "❌ ERROR: File not found: $TargetFile" -ForegroundColor Red
    exit 1
}

Write-Host "📄 Target file: $TargetFile" -ForegroundColor Yellow
Write-Host ""

# Create backup
$BackupFile = "$TargetFile.backup.$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Copy-Item $TargetFile $BackupFile
Write-Host "💾 Backup created: $BackupFile" -ForegroundColor Green
Write-Host ""

# Show current line (Line 61)
Write-Host "🔍 Current line 61 (BEFORE):" -ForegroundColor Yellow
$content = Get-Content $TargetFile
Write-Host $content[60]  # Zero-indexed
Write-Host ""

# Apply fix
(Get-Content $TargetFile) -replace "@/types/river-template", "@/types/adventure" | Set-Content $TargetFile

# Verify change
Write-Host "✅ Updated line 61 (AFTER):" -ForegroundColor Green
$newContent = Get-Content $TargetFile
Write-Host $newContent[60]  # Zero-indexed
Write-Host ""

# Count changes
$oldContent = Get-Content $BackupFile -Raw
$newContentRaw = Get-Content $TargetFile -Raw
$changes = ($oldContent -ne $newContentRaw)

if (-not $changes) {
    Write-Host "⚠️  WARNING: No changes detected. The line may have already been fixed." -ForegroundColor Yellow
    Write-Host "    Or the pattern didn't match. Manual verification recommended." -ForegroundColor Yellow
} else {
    Write-Host "✅ SUCCESS: Import path corrected" -ForegroundColor Green
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "1. Review the changes in: $TargetFile"
Write-Host "2. Run TypeScript validation:"
Write-Host "   cd wv-wild-web; npm run typecheck"
Write-Host "3. If satisfied, delete backup: $BackupFile"
Write-Host "4. If issues occur, restore from backup:"
Write-Host "   Copy-Item $BackupFile $TargetFile -Force"
Write-Host ""
Write-Host "✅ Script completed" -ForegroundColor Green
