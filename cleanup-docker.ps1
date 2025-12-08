# Docker cleanup script for WV Wild Outdoors

Write-Host "===================================================================" -ForegroundColor Blue
Write-Host "  Docker Cleanup - WV Wild Outdoors" -ForegroundColor Blue
Write-Host "===================================================================" -ForegroundColor Blue
Write-Host ""

# Check if Docker is available
try {
    docker ps > $null 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Docker daemon isn't running"
    }
}
catch {
    Write-Host "Docker daemon isn't running. Please start Docker and try again." -ForegroundColor Red
    exit 1
}

Write-Host "Current disk usage:" -ForegroundColor Yellow
docker system df
Write-Host ""

# Stop non-WVWO containers
Write-Host "Stopping extra containers (MCP servers)..." -ForegroundColor Yellow
try {
    # Note: These container names are hardcoded because they are ephemeral development/Playwright MCP artifacts.
    # If more MCP servers are added in the future, we can switch to a label-based filter.
    docker stop tender_jepsen adoring_keldysh
    docker rm tender_jepsen adoring_keldysh
}
catch {
    Write-Host "No extra containers found or error stopping them (ignoring)." -ForegroundColor DarkGray
}

# Remove old/unused images
Write-Host "Removing old unused images..." -ForegroundColor Yellow
$imagesToRemove = @(
    "postgres:15-alpine",
    "redis:7-alpine",
    "directus/directus:10",
    "ghost:5.96.0",
    "ghost:5-alpine",
    "inovector/mixpost:latest"
)

foreach ($image in $imagesToRemove) {
    try {
        docker rmi $image
    }
    catch {
        # Ignore errors if image doesn't exist
    }
}

# Clean build cache
Write-Host "Cleaning build cache..." -ForegroundColor Yellow
docker builder prune -f

# Clean dangling images
Write-Host "Removing dangling images..." -ForegroundColor Yellow
docker image prune -f

Write-Host ""
Write-Host "Cleanup complete! New disk usage:" -ForegroundColor Green
docker system df
