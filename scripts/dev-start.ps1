#===============================================================================
# WV Wild Outdoors - Development Environment Startup Script (PowerShell)
#===============================================================================
# Starts all services with Docker Compose
# Usage: .\scripts\dev-start.ps1
#===============================================================================

$ErrorActionPreference = "Stop"

Write-Host "==================================================================" -ForegroundColor Blue
Write-Host "  WV Wild Outdoors - Starting Local Development Environment" -ForegroundColor Blue
Write-Host "==================================================================" -ForegroundColor Blue
Write-Host ""

# Check if Docker is running
try {
    $null = docker info 2>&1
    Write-Host "✓ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Docker is not running!" -ForegroundColor Red
    Write-Host "Please start Docker Desktop"
    exit 1
}

# Check Docker resource availability
Write-Host "Checking Docker resources..." -ForegroundColor Blue

# Check available disk space
try {
    $drive = (Get-Location).Drive
    $freeSpaceGB = [math]::Round(($drive.Free / 1GB), 1)
    if ($freeSpaceGB -lt 10) {
        Write-Host "Warning: Low disk space ($freeSpaceGB GB available, 10GB+ recommended)" -ForegroundColor Yellow
    }
} catch {
    # Disk check failed, continue anyway
}

# Check Docker memory
try {
    $dockerInfo = docker info --format '{{.MemTotal}}' 2>&1
    if ($dockerInfo -match '^\d+$') {
        $dockerMemGB = [math]::Floor([long]$dockerInfo / 1GB)
        if ($dockerMemGB -lt 4) {
            Write-Host "Warning: Docker has $dockerMemGB GB RAM (4GB+ recommended)" -ForegroundColor Yellow
            Write-Host "Increase Docker resources: Docker Desktop -> Settings -> Resources"
        }
    }
} catch {
    # Memory check failed, continue anyway
}

Write-Host "✓ Resources checked" -ForegroundColor Green

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "ERROR: .env file not found!" -ForegroundColor Red
    Write-Host "Please create .env from .env.example:"
    Write-Host "  Copy-Item .env.example .env"
    Write-Host "  # Then edit .env with your actual values"
    exit 2
}

Write-Host "✓ .env file found" -ForegroundColor Green
Write-Host ""

# Start all services
Write-Host "Starting all services..." -ForegroundColor Yellow
docker compose up -d

# Wait for services to become healthy
Write-Host ""
Write-Host "Waiting for services to become healthy..." -ForegroundColor Yellow
$MaxWait = 120  # Maximum 2 minutes
$Elapsed = 0
$Interval = 5

while ($Elapsed -lt $MaxWait) {
    # Get service status
    $psOutput = docker compose ps --format json 2>&1

    # Count running services and healthy services
    $runningCount = ($psOutput | Select-String -Pattern '"State":"running"' -AllMatches).Matches.Count
    $healthyCount = ($psOutput | Select-String -Pattern '"Health":"healthy"' -AllMatches).Matches.Count

    # Count services with no health check defined (running but no Health field)
    $runningLines = $psOutput | Select-String -Pattern '"State":"running"'
    $noHealthCheck = ($runningLines | Select-String -Pattern '"Health":' -NotMatch).Count

    # Services that need to be healthy = running - no_healthcheck
    $expectedHealthy = $runningCount - $noHealthCheck

    if ($runningCount -gt 0) {
        Write-Host "  [$Elapsed/$MaxWait s] Healthy: $healthyCount / $expectedHealthy services" -ForegroundColor Blue -NoNewline
        Write-Host "`r" -NoNewline

        # All services with health checks are healthy
        if ($healthyCount -ge $expectedHealthy -and $expectedHealthy -gt 0) {
            Write-Host ""
            Write-Host "✓ All services are healthy" -ForegroundColor Green
            break
        }
    }

    Start-Sleep -Seconds $Interval
    $Elapsed += $Interval
}

if ($Elapsed -ge $MaxWait) {
    Write-Host ""
    Write-Host "Warning: Some services may not be healthy yet" -ForegroundColor Yellow
    Write-Host "Run '.\scripts\dev-logs.ps1' to check service logs"
}

# Show service status
Write-Host ""
Write-Host "Service Status:" -ForegroundColor Blue
docker compose ps

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Green
Write-Host "  Development environment started successfully!" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Access your services:"
Write-Host "  Astro Frontend:     http://localhost:3000" -ForegroundColor Blue
Write-Host "  Directus CMS:       http://localhost:8055" -ForegroundColor Blue
Write-Host "  Ghost Blog:         http://localhost:2368" -ForegroundColor Blue
Write-Host "  Listmonk Email:     http://localhost:9000" -ForegroundColor Blue
Write-Host "  Mixpost Social:     http://localhost:8080" -ForegroundColor Blue
Write-Host "  PostgreSQL:         localhost:5432" -ForegroundColor Blue
Write-Host "  Redis:              localhost:6379" -ForegroundColor Blue
Write-Host ""
Write-Host "Useful commands:"
Write-Host "  View logs:   docker compose logs -f [service]"
Write-Host "  Stop all:    .\scripts\dev-stop.ps1"
Write-Host "  Clean all:   .\scripts\dev-clean.ps1"
Write-Host ""
