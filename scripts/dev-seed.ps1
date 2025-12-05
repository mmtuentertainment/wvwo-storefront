#===============================================================================
# WV Wild Outdoors - Seed Data Loading Script (PowerShell)
#===============================================================================
# Loads sample data into development databases for testing
# Usage: .\scripts\dev-seed.ps1 [options]
#
# Options:
#   -Directus     Load Directus products/categories only
#   -Ghost        Show Ghost seeding instructions (uses SQLite)
#   -All          Load all seed data (default)
#   -Help         Show help message
#
# Prerequisites:
#   1. Services must be running (.\scripts\dev-start.ps1)
#   2. For Directus: Create collections first via Admin UI
#===============================================================================

param(
    [switch]$Directus,
    [switch]$Ghost,
    [switch]$All,
    [switch]$Help
)

$ErrorActionPreference = "Stop"

# Configuration
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$SeedDataDir = Join-Path $ProjectRoot "docker\postgres\seed-data"

#===============================================================================
# Functions
#===============================================================================

function Show-Help {
    Write-Host "WV Wild Outdoors - Seed Data Loader" -ForegroundColor Blue
    Write-Host ""
    Write-Host "Usage: .\scripts\dev-seed.ps1 [options]"
    Write-Host ""
    Write-Host "Options:"
    Write-Host "  -Directus     Load Directus products/categories only"
    Write-Host "  -Ghost        Show Ghost seeding instructions"
    Write-Host "  -All          Load all seed data (default)"
    Write-Host "  -Help         Show this help message"
    Write-Host ""
    Write-Host "Prerequisites:"
    Write-Host "  1. Services must be running: .\scripts\dev-start.ps1"
    Write-Host "  2. Directus collections must be created via Admin UI first"
    Write-Host ""
    Write-Host "Examples:"
    Write-Host "  .\scripts\dev-seed.ps1              # Load all seed data"
    Write-Host "  .\scripts\dev-seed.ps1 -Directus    # Load Directus only"
    Write-Host ""
}

function Test-Services {
    Write-Host "Checking services..." -ForegroundColor Blue

    # Check if Docker is running
    try {
        $null = docker info 2>&1
    } catch {
        Write-Host "ERROR: Docker is not running!" -ForegroundColor Red
        exit 1
    }

    # Check if PostgreSQL is healthy
    $pgStatus = docker compose ps postgres 2>&1
    if ($pgStatus -notmatch "healthy") {
        Write-Host "ERROR: PostgreSQL is not running or healthy!" -ForegroundColor Red
        Write-Host "Start services first: .\scripts\dev-start.ps1"
        exit 1
    }

    Write-Host "PostgreSQL is running and healthy" -ForegroundColor Green
}

function Invoke-DirectusSeed {
    Write-Host ""
    Write-Host "==================================================================" -ForegroundColor Blue
    Write-Host "  Seeding Directus Database" -ForegroundColor Blue
    Write-Host "==================================================================" -ForegroundColor Blue
    Write-Host ""

    $seedFile = Join-Path $SeedDataDir "01-directus-products.sql"

    # Check if seed file exists
    if (-not (Test-Path $seedFile)) {
        Write-Host "ERROR: Seed file not found: $seedFile" -ForegroundColor Red
        exit 1
    }

    Write-Host "NOTE: Directus collections must exist before seeding." -ForegroundColor Yellow
    Write-Host "If you haven't created them yet:"
    Write-Host "  1. Visit http://localhost:8055/admin"
    Write-Host "  2. Create 'categories' collection (name, slug, description)"
    Write-Host "  3. Create 'products' collection (name, slug, description, price, sku, in_stock, featured)"
    Write-Host "  4. Create 'products_categories' junction (many-to-many)"
    Write-Host ""

    $confirm = Read-Host "Continue with seeding? (y/N)"
    if ($confirm -notmatch "^[Yy]$") {
        Write-Host "Seeding cancelled."
        return
    }

    Write-Host ""
    Write-Host "Loading Directus seed data..." -ForegroundColor Yellow

    # Copy seed file to container and execute
    docker cp $seedFile wvwo-postgres-dev:/tmp/seed-directus.sql
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to copy seed file to container" -ForegroundColor Red
        exit 1
    }

    # Execute the seed SQL
    docker exec wvwo-postgres-dev psql -U directus_user -d directus -f /tmp/seed-directus.sql
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to execute seed SQL" -ForegroundColor Red
        exit 1
    }

    # Cleanup
    docker exec wvwo-postgres-dev rm -f /tmp/seed-directus.sql

    Write-Host ""
    Write-Host "Directus seed data loaded" -ForegroundColor Green
    Write-Host "  View products at: http://localhost:8055/admin/content/products"
}

function Show-GhostInstructions {
    Write-Host ""
    Write-Host "==================================================================" -ForegroundColor Blue
    Write-Host "  Ghost Blog Seeding" -ForegroundColor Blue
    Write-Host "==================================================================" -ForegroundColor Blue
    Write-Host ""

    Write-Host "NOTE: Ghost uses SQLite in current configuration." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Ghost cannot be seeded via PostgreSQL SQL files."
    Write-Host "Instead, seed Ghost content using one of these methods:"
    Write-Host ""
    Write-Host "Option 1: Manual Creation (Recommended for Dev)" -ForegroundColor Green
    Write-Host "  1. Visit http://localhost:2368/ghost/"
    Write-Host "  2. Complete setup wizard if not done"
    Write-Host "  3. Create posts manually in the editor"
    Write-Host ""
    Write-Host "Option 2: JSON Import" -ForegroundColor Green
    Write-Host "  1. Export content from another Ghost instance"
    Write-Host "  2. Ghost Admin > Settings > Labs > Import Content"
    Write-Host ""
    Write-Host "Option 3: Ghost Admin API" -ForegroundColor Green
    Write-Host "  1. Create integration in Ghost Admin > Settings > Integrations"
    Write-Host "  2. Use Admin API key with @tryghost/admin-api package"
    Write-Host "  3. See docker/postgres/seed-data/02-ghost-posts.sql for example"
    Write-Host ""
    Write-Host "Sample post content is documented in:" -ForegroundColor Green
    Write-Host "  $SeedDataDir\02-ghost-posts.sql"
    Write-Host ""
}

function Show-Summary {
    Write-Host ""
    Write-Host "==================================================================" -ForegroundColor Green
    Write-Host "  Seed Data Summary" -ForegroundColor Green
    Write-Host "==================================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Directus (http://localhost:8055/admin):"
    Write-Host "  - 5 categories (Hunting, Fishing, Camping, Apparel, Accessories)"
    Write-Host "  - 15 products with WV-themed names and descriptions"
    Write-Host "  - Product-category relationships"
    Write-Host ""
    Write-Host "Ghost (http://localhost:2368/ghost/):"
    Write-Host "  - Manual seeding required (see instructions above)"
    Write-Host "  - Sample content documented in seed-data\02-ghost-posts.sql"
    Write-Host ""
    Write-Host "All seed data uses WV Wild Outdoors theming:"
    Write-Host "  - Local rivers: Elk, New, Gauley, Seneca Creek"
    Write-Host "  - Places: Dolly Sods, Allegheny Mountains, Birch River"
    Write-Host "  - Culture: 'Almost Heaven', 'Wild Wonderful', coal heritage"
    Write-Host ""
}

#===============================================================================
# Main
#===============================================================================

if ($Help) {
    Show-Help
    exit 0
}

# Default to -All if no options specified
if (-not $Directus -and -not $Ghost -and -not $All) {
    $All = $true
}

if ($All) {
    $Directus = $true
    $Ghost = $true
}

Write-Host "==================================================================" -ForegroundColor Blue
Write-Host "  WV Wild Outdoors - Loading Seed Data" -ForegroundColor Blue
Write-Host "==================================================================" -ForegroundColor Blue
Write-Host ""

# Check services are running
Test-Services

# Seed databases
if ($Directus) {
    Invoke-DirectusSeed
}

if ($Ghost) {
    Show-GhostInstructions
}

# Show summary
Show-Summary

Write-Host "Done!" -ForegroundColor Green
