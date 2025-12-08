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
docker stop tender_jepsen adoring_keldysh 2>$null
docker rm tender_jepsen adoring_keldysh 2>$null

# Remove old/unused images
Write-Host "Removing old unused images..." -ForegroundColor Yellow
docker rmi postgres:15-alpine 2>$null
docker rmi redis:7-alpine 2>$null
docker rmi directus/directus:10 2>$null
docker rmi ghost:5.96.0 2>$null
docker rmi ghost:5-alpine 2>$null
docker rmi inovector/mixpost:latest 2>$null

# Clean build cache
Write-Host "Cleaning build cache..." -ForegroundColor Yellow
docker builder prune -f

# Clean dangling images
Write-Host "Removing dangling images..." -ForegroundColor Yellow
docker image prune -f

Write-Host ""
Write-Host "Cleanup complete! New disk usage:" -ForegroundColor Green
docker system df
