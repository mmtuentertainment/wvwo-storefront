#===============================================================================
# WV Wild Outdoors - Development Environment Stop Script (PowerShell)
#===============================================================================
# Stops all services gracefully (preserves data volumes)
# Usage: .\scripts\dev-stop.ps1
#===============================================================================

$ErrorActionPreference = "Stop"

Write-Host "==================================================================" -ForegroundColor Blue
Write-Host "  WV Wild Outdoors - Stopping Development Environment" -ForegroundColor Blue
Write-Host "==================================================================" -ForegroundColor Blue
Write-Host ""

# Check if Docker is running
try {
    $null = docker info 2>&1
} catch {
    Write-Host "ERROR: Docker is not running!" -ForegroundColor Red
    exit 1
}

# Stop all services
Write-Host "Stopping all services..." -ForegroundColor Yellow
docker compose down

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Green
Write-Host "  All services stopped successfully!" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "All containers have been stopped and removed."
Write-Host "Data volumes are preserved and will be available on next start."
Write-Host ""
Write-Host "To completely remove all data, use:"
Write-Host "  .\scripts\dev-clean.ps1"
Write-Host ""
