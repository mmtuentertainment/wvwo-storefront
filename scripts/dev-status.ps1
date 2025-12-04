#===============================================================================
# WV Wild Outdoors - Service Status Script (PowerShell)
#===============================================================================
# Shows status of all services with formatted output
# Usage: .\scripts\dev-status.ps1
#===============================================================================

Write-Host "==================================================================" -ForegroundColor Blue
Write-Host "  WV Wild Outdoors - Service Status" -ForegroundColor Blue
Write-Host "==================================================================" -ForegroundColor Blue
Write-Host ""

# Show detailed service status
docker compose ps

Write-Host ""
Write-Host "Service Endpoints:" -ForegroundColor Green
Write-Host "  Astro Frontend:     http://localhost:3000"
Write-Host "  Directus CMS:       http://localhost:8055"
Write-Host "  Ghost Blog:         http://localhost:2368"
Write-Host "  Listmonk Email:     http://localhost:9000"
Write-Host "  Mixpost Social:     http://localhost:8080"
Write-Host "  PostgreSQL:         localhost:5432"
Write-Host "  Redis:              localhost:6379"
Write-Host ""

# Show resource usage
Write-Host "Resource Usage:" -ForegroundColor Green
$containers = docker compose ps -q
if ($containers) {
    docker stats --no-stream --format "table {{.Name}}`t{{.CPUPerc}}`t{{.MemUsage}}" $containers
}
Write-Host ""
