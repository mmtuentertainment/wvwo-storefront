#!/usr/bin/env bash
#===============================================================================
# WV Wild Outdoors - Restore Script
#===============================================================================
# Restores all Docker volumes from backup tar.gz files
# ⚠️  WARNING: This will OVERWRITE existing data!
# Usage: ./scripts/dev-restore.sh <backup-directory>
#        ./scripts/dev-restore.sh ./backups/20240104-153000
#===============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BACKUP_PATH=$1

if [ -z "$BACKUP_PATH" ]; then
    echo -e "${RED}ERROR: Backup directory required${NC}"
    echo "Usage: ./scripts/dev-restore.sh <backup-directory>"
    echo "Example: ./scripts/dev-restore.sh ./backups/20240104-153000"
    exit 1
fi

if [ ! -d "$BACKUP_PATH" ]; then
    echo -e "${RED}ERROR: Backup directory not found: $BACKUP_PATH${NC}"
    exit 1
fi

echo -e "${RED}==================================================================${NC}"
echo -e "${RED}  WV Wild Outdoors - Restore Volumes${NC}"
echo -e "${RED}==================================================================${NC}"
echo ""
echo -e "${YELLOW}⚠️  WARNING: This will OVERWRITE existing data!${NC}"
echo "Backup location: $BACKUP_PATH"
echo ""
read -r -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo -e "${BLUE}Restore cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}Restoring volumes from backup...${NC}"

# Restore postgres volume
if [ -f "$BACKUP_PATH/postgres-data.tar.gz" ]; then
    echo -e "${YELLOW}Restoring PostgreSQL data...${NC}"
    docker run --rm \
        -v wvwo-postgres-data-dev:/data \
        -v "$(pwd)/$BACKUP_PATH":/backup \
        alpine \
        sh -c "rm -rf /data/* && tar xzf /backup/postgres-data.tar.gz -C /data"
    echo -e "${GREEN}✓ PostgreSQL restored${NC}"
fi

# Restore redis volume
if [ -f "$BACKUP_PATH/redis-data.tar.gz" ]; then
    echo -e "${YELLOW}Restoring Redis data...${NC}"
    docker run --rm \
        -v wvwo-redis-data-dev:/data \
        -v "$(pwd)/$BACKUP_PATH":/backup \
        alpine \
        sh -c "rm -rf /data/* && tar xzf /backup/redis-data.tar.gz -C /data"
    echo -e "${GREEN}✓ Redis restored${NC}"
fi

# Restore directus uploads
if [ -f "$BACKUP_PATH/directus-uploads.tar.gz" ]; then
    echo -e "${YELLOW}Restoring Directus uploads...${NC}"
    docker run --rm \
        -v wvwo-directus-uploads-dev:/data \
        -v "$(pwd)/$BACKUP_PATH":/backup \
        alpine \
        sh -c "rm -rf /data/* && tar xzf /backup/directus-uploads.tar.gz -C /data"
    echo -e "${GREEN}✓ Directus uploads restored${NC}"
fi

# Restore ghost content
if [ -f "$BACKUP_PATH/ghost-content.tar.gz" ]; then
    echo -e "${YELLOW}Restoring Ghost content...${NC}"
    docker run --rm \
        -v wvwo-ghost-content-dev:/data \
        -v "$(pwd)/$BACKUP_PATH":/backup \
        alpine \
        sh -c "rm -rf /data/* && tar xzf /backup/ghost-content.tar.gz -C /data"
    echo -e "${GREEN}✓ Ghost content restored${NC}"
fi

echo ""
echo -e "${GREEN}==================================================================${NC}"
echo -e "${GREEN}  Restore complete!${NC}"
echo -e "${GREEN}==================================================================${NC}"
echo ""
echo "All volumes have been restored from backup."
echo "Restart services to use the restored data:"
echo "  ./scripts/dev-restart.sh"
echo ""
