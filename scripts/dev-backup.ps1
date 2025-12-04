#===============================================================================
# WV Wild Outdoors - Backup Script (PowerShell)
#===============================================================================
# Backs up all Docker volumes to tar.gz files
# Usage: .\scripts\dev-backup.ps1 [backup-directory]
#        .\scripts\dev-backup.ps1            # Backs up to .\backups\
#        .\scripts\dev-backup.ps1 C:\backups # Custom backup location
#===============================================================================

param(
    [string]$BackupDir = ".\backups"
)

$ErrorActionPreference = "Stop"
$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$BackupPath = Join-Path $BackupDir $Timestamp

Write-Host "==================================================================" -ForegroundColor Blue
Write-Host "  WV Wild Outdoors - Backup Volumes" -ForegroundColor Blue
Write-Host "==================================================================" -ForegroundColor Blue
Write-Host ""

# Create backup directory
New-Item -ItemType Directory -Force -Path $BackupPath | Out-Null
Write-Host "✓ Created backup directory: $BackupPath" -ForegroundColor Green

# Get absolute path for Docker
$AbsoluteBackupPath = (Resolve-Path $BackupPath).Path

# Backup postgres volume
Write-Host "Backing up PostgreSQL data..." -ForegroundColor Yellow
docker run --rm `
    -v wvwo-postgres-data-dev:/data `
    -v "${AbsoluteBackupPath}:/backup" `
    alpine `
    tar czf /backup/postgres-data.tar.gz -C /data .
Write-Host "✓ PostgreSQL backup complete" -ForegroundColor Green

# Backup redis volume
Write-Host "Backing up Redis data..." -ForegroundColor Yellow
docker run --rm `
    -v wvwo-redis-data-dev:/data `
    -v "${AbsoluteBackupPath}:/backup" `
    alpine `
    tar czf /backup/redis-data.tar.gz -C /data .
Write-Host "✓ Redis backup complete" -ForegroundColor Green

# Backup directus uploads
Write-Host "Backing up Directus uploads..." -ForegroundColor Yellow
docker run --rm `
    -v wvwo-directus-uploads-dev:/data `
    -v "${AbsoluteBackupPath}:/backup" `
    alpine `
    tar czf /backup/directus-uploads.tar.gz -C /data .
Write-Host "✓ Directus uploads backup complete" -ForegroundColor Green

# Backup ghost content
Write-Host "Backing up Ghost content..." -ForegroundColor Yellow
docker run --rm `
    -v wvwo-ghost-content-dev:/data `
    -v "${AbsoluteBackupPath}:/backup" `
    alpine `
    tar czf /backup/ghost-content.tar.gz -C /data .
Write-Host "✓ Ghost content backup complete" -ForegroundColor Green

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Green
Write-Host "  Backup complete!" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backup location: $BackupPath"
Write-Host "Files created:"
Write-Host "  - postgres-data.tar.gz"
Write-Host "  - redis-data.tar.gz"
Write-Host "  - directus-uploads.tar.gz"
Write-Host "  - ghost-content.tar.gz"
Write-Host ""
Write-Host "To restore: .\scripts\dev-restore.ps1 $BackupPath"
Write-Host ""
