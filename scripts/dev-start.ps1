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

# Wait a moment for services to initialize
Start-Sleep -Seconds 3

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
