#===============================================================================
# WV Wild Outdoors - Development Environment Clean Script (PowerShell)
#===============================================================================
# Removes all containers, networks, AND volumes (complete reset)
# ⚠️  WARNING: This will DELETE ALL DATA including databases!
# Usage: .\scripts\dev-clean.ps1
#===============================================================================

$ErrorActionPreference = "Stop"

Write-Host "==================================================================" -ForegroundColor Red
Write-Host "  WV Wild Outdoors - CLEAN Development Environment" -ForegroundColor Red
Write-Host "==================================================================" -ForegroundColor Red
Write-Host ""
Write-Host "⚠️  WARNING: This will DELETE ALL DATA!" -ForegroundColor Yellow
Write-Host "  - All containers will be stopped and removed"
Write-Host "  - All Docker volumes will be deleted"
Write-Host "  - All database data will be lost"
Write-Host "  - All uploaded files will be lost"
Write-Host ""

$confirm = Read-Host "Are you sure you want to continue? (yes/no)"

if ($confirm -ne "yes") {
    Write-Host "Cleanup cancelled." -ForegroundColor Blue
    exit 0
}

Write-Host ""
Write-Host "Removing all containers, networks, and volumes..." -ForegroundColor Yellow
docker compose down -v --remove-orphans

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Green
Write-Host "  Environment completely cleaned!" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "All services, networks, and data volumes have been removed."
Write-Host "Next start will initialize fresh databases."
Write-Host ""
Write-Host "To start the environment again:"
Write-Host "  .\scripts\dev-start.ps1"
Write-Host ""
