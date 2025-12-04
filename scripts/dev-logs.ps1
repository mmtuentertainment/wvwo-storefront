#===============================================================================
# WV Wild Outdoors - Service Logs Script (PowerShell)
#===============================================================================
# View logs for specific service or all services
# Usage: .\scripts\dev-logs.ps1 [service-name] [-Tail 50] [-Since "10m"]
#        .\scripts\dev-logs.ps1              # All services (follow)
#        .\scripts\dev-logs.ps1 directus     # Just directus (follow)
#        .\scripts\dev-logs.ps1 -Tail 50     # Last 50 lines, all services
#===============================================================================

param(
    [string]$Service = "",
    [int]$Tail = 0,
    [string]$Since = ""
)

$args = @("-f")

if ($Tail -gt 0) {
    $args += "--tail=$Tail"
}

if ($Since -ne "") {
    $args += "--since=$Since"
}

if ($Service -eq "") {
    Write-Host "Viewing logs for all services (Ctrl+C to exit)" -ForegroundColor Blue
    docker compose logs @args
} else {
    Write-Host "Viewing logs for $Service (Ctrl+C to exit)" -ForegroundColor Blue
    docker compose logs @args $Service
}

Write-Host ""
Write-Host "Usage examples:" -ForegroundColor Yellow
Write-Host "  .\scripts\dev-logs.ps1                  # All services, follow"
Write-Host "  .\scripts\dev-logs.ps1 directus         # Single service, follow"
Write-Host "  .\scripts\dev-logs.ps1 -Tail 50         # Last 50 lines, all services"
Write-Host "  .\scripts\dev-logs.ps1 postgres -Since `"10m`"  # Last 10 minutes"
Write-Host ""
