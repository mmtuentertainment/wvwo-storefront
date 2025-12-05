#===============================================================================
# WV Wild Outdoors - Restore Script (PowerShell)
#===============================================================================
# Restores all Docker volumes from backup tar.gz files
# ⚠️  WARNING: This will OVERWRITE existing data!
# Usage: .\scripts\dev-restore.ps1 <backup-directory>
#        .\scripts\dev-restore.ps1 .\backups\20240104-153000
#===============================================================================

param(
    [Parameter(Mandatory=$true)]
    [string]$BackupPath
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $BackupPath)) {
    Write-Host "ERROR: Backup directory not found: $BackupPath" -ForegroundColor Red
    exit 1
}

Write-Host "==================================================================" -ForegroundColor Red
Write-Host "  WV Wild Outdoors - Restore Volumes" -ForegroundColor Red
Write-Host "==================================================================" -ForegroundColor Red
Write-Host ""
Write-Host "⚠️  WARNING: This will OVERWRITE existing data!" -ForegroundColor Yellow
Write-Host "Backup location: $BackupPath"
Write-Host ""

$confirm = Read-Host "Are you sure you want to continue? (yes/no)"

if ($confirm -ne "yes") {
    Write-Host "Restore cancelled." -ForegroundColor Blue
    exit 0
}

Write-Host ""
Write-Host "Restoring volumes from backup..." -ForegroundColor Yellow

# Get absolute path for Docker
$AbsoluteBackupPath = (Resolve-Path $BackupPath).Path

# Restore postgres volume
if (Test-Path "$BackupPath\postgres-data.tar.gz") {
    Write-Host "Restoring PostgreSQL data..." -ForegroundColor Yellow
    docker run --rm `
        -v wvwo-postgres-data-dev:/data `
        -v "${AbsoluteBackupPath}:/backup" `
        alpine `
        sh -c "rm -rf /data/* && tar xzf /backup/postgres-data.tar.gz -C /data"
    Write-Host "✓ PostgreSQL restored" -ForegroundColor Green
}

# Restore redis volume
if (Test-Path "$BackupPath\redis-data.tar.gz") {
    Write-Host "Restoring Redis data..." -ForegroundColor Yellow
    docker run --rm `
        -v wvwo-redis-data-dev:/data `
        -v "${AbsoluteBackupPath}:/backup" `
        alpine `
        sh -c "rm -rf /data/* && tar xzf /backup/redis-data.tar.gz -C /data"
    Write-Host "✓ Redis restored" -ForegroundColor Green
}

# Restore directus uploads
if (Test-Path "$BackupPath\directus-uploads.tar.gz") {
    Write-Host "Restoring Directus uploads..." -ForegroundColor Yellow
    docker run --rm `
        -v wvwo-directus-uploads-dev:/data `
        -v "${AbsoluteBackupPath}:/backup" `
        alpine `
        sh -c "rm -rf /data/* && tar xzf /backup/directus-uploads.tar.gz -C /data"
    Write-Host "✓ Directus uploads restored" -ForegroundColor Green
}

# Restore ghost content
if (Test-Path "$BackupPath\ghost-content.tar.gz") {
    Write-Host "Restoring Ghost content..." -ForegroundColor Yellow
    docker run --rm `
        -v wvwo-ghost-content-dev:/data `
        -v "${AbsoluteBackupPath}:/backup" `
        alpine `
        sh -c "rm -rf /data/* && tar xzf /backup/ghost-content.tar.gz -C /data"
    Write-Host "✓ Ghost content restored" -ForegroundColor Green
}

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Green
Write-Host "  Restore complete!" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "All volumes have been restored from backup."
Write-Host "Restart services to use the restored data:"
Write-Host "  .\scripts\dev-restart.ps1"
Write-Host ""
