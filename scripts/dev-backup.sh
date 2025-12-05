#!/usr/bin/env bash
#===============================================================================
# WV Wild Outdoors - Backup Script
#===============================================================================
# Backs up all Docker volumes to tar.gz files
# Usage: ./scripts/dev-backup.sh [backup-directory]
#        ./scripts/dev-backup.sh            # Backs up to ./backups/
#        ./scripts/dev-backup.sh /path/to/  # Custom backup location
#===============================================================================

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BACKUP_DIR="${1:-./backups}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_PATH="$BACKUP_DIR/$TIMESTAMP"

echo -e "${BLUE}==================================================================${NC}"
echo -e "${BLUE}  WV Wild Outdoors - Backup Volumes${NC}"
echo -e "${BLUE}==================================================================${NC}"
echo ""

# Create backup directory
mkdir -p "$BACKUP_PATH"
echo -e "${GREEN}✓ Created backup directory: $BACKUP_PATH${NC}"

# Backup postgres volume
echo -e "${YELLOW}Backing up PostgreSQL data...${NC}"
docker run --rm \
    -v wvwo-postgres-data-dev:/data \
    -v "$(pwd)/$BACKUP_PATH":/backup \
    alpine \
    tar czf /backup/postgres-data.tar.gz -C /data .
echo -e "${GREEN}✓ PostgreSQL backup complete${NC}"

# Backup redis volume
echo -e "${YELLOW}Backing up Redis data...${NC}"
docker run --rm \
    -v wvwo-redis-data-dev:/data \
    -v "$(pwd)/$BACKUP_PATH":/backup \
    alpine \
    tar czf /backup/redis-data.tar.gz -C /data .
echo -e "${GREEN}✓ Redis backup complete${NC}"

# Backup directus uploads
echo -e "${YELLOW}Backing up Directus uploads...${NC}"
docker run --rm \
    -v wvwo-directus-uploads-dev:/data \
    -v "$(pwd)/$BACKUP_PATH":/backup \
    alpine \
    tar czf /backup/directus-uploads.tar.gz -C /data .
echo -e "${GREEN}✓ Directus uploads backup complete${NC}"

# Backup ghost content
echo -e "${YELLOW}Backing up Ghost content...${NC}"
docker run --rm \
    -v wvwo-ghost-content-dev:/data \
    -v "$(pwd)/$BACKUP_PATH":/backup \
    alpine \
    tar czf /backup/ghost-content.tar.gz -C /data .
echo -e "${GREEN}✓ Ghost content backup complete${NC}"

echo ""
echo -e "${GREEN}==================================================================${NC}"
echo -e "${GREEN}  Backup complete!${NC}"
echo -e "${GREEN}==================================================================${NC}"
echo ""
echo "Backup location: $BACKUP_PATH"
echo "Files created:"
echo "  - postgres-data.tar.gz"
echo "  - redis-data.tar.gz"
echo "  - directus-uploads.tar.gz"
echo "  - ghost-content.tar.gz"
echo ""
echo "To restore: ./scripts/dev-restore.sh $BACKUP_PATH"
echo ""
