#===============================================================================
# WV Wild Outdoors - Service Restart Script (PowerShell)
#===============================================================================
# Restarts a specific service or all services
# Usage: .\scripts\dev-restart.ps1 [service-name]
#        .\scripts\dev-restart.ps1             # Restarts all services
#        .\scripts\dev-restart.ps1 postgres    # Restarts only postgres
#===============================================================================

param(
    [string]$Service = ""
)

if ($Service -eq "") {
    Write-Host "Restarting all services..." -ForegroundColor Yellow
    docker compose restart
    Write-Host "✓ All services restarted" -ForegroundColor Green
} else {
    Write-Host "Restarting $Service..." -ForegroundColor Yellow
    docker compose restart $Service
    Write-Host "✓ $Service restarted" -ForegroundColor Green
}

Write-Host ""
Write-Host "Service status:"
docker compose ps

Write-Host ""
Write-Host "Usage examples:"
Write-Host "  .\scripts\dev-restart.ps1              # Restart all"
Write-Host "  .\scripts\dev-restart.ps1 postgres     # Restart postgres only"
Write-Host "  .\scripts\dev-restart.ps1 directus     # Restart directus only"
Write-Host ""
