#===============================================================================
# WV Wild Outdoors - Service Rebuild Script (PowerShell)
#===============================================================================
# Rebuilds and restarts a specific service (useful after Dockerfile changes)
# Usage: .\scripts\dev-rebuild.ps1 <service-name>
#        .\scripts\dev-rebuild.ps1 astro       # Rebuild astro service
#===============================================================================

param(
    [Parameter(Mandatory=$true)]
    [string]$Service
)

if ($Service -eq "") {
    Write-Host "ERROR: Service name required" -ForegroundColor Red
    Write-Host "Usage: .\scripts\dev-rebuild.ps1 <service-name>"
    Write-Host ""
    Write-Host "Available services:"
    Write-Host "  postgres, redis, directus, ghost, astro, listmonk, mixpost"
    Write-Host ""
    Write-Host "Example:"
    Write-Host "  .\scripts\dev-rebuild.ps1 astro"
    exit 1
}

Write-Host "Rebuilding $Service..." -ForegroundColor Yellow
docker compose up -d --build $Service

Write-Host "✓ $Service rebuilt and restarted" -ForegroundColor Green
Write-Host ""
Write-Host "Service status:"
docker compose ps $Service
Write-Host ""
