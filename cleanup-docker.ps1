# Docker cleanup script for WV Wild Outdoors

Write-Host "===================================================================" -ForegroundColor Blue
Write-Host "  Docker Cleanup - WV Wild Outdoors" -ForegroundColor Blue
Write-Host "===================================================================" -ForegroundColor Blue
Write-Host ""

Write-Host "Current disk usage:" -ForegroundColor Yellow
docker system df
Write-Host ""

# Stop non-WVWO containers
Write-Host "Stopping extra containers (MCP servers)..." -ForegroundColor Yellow
try {
    docker stop tender_jepsen adoring_keldysh 2>$null
    docker rm tender_jepsen adoring_keldysh 2>$null
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
        docker rmi $image 2>$null
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
