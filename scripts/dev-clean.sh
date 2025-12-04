#!/usr/bin/env bash
#===============================================================================
# WV Wild Outdoors - Development Environment Clean Script
#===============================================================================
# Removes all containers, networks, AND volumes (complete reset)
# ⚠️  WARNING: This will DELETE ALL DATA including databases!
# Usage: ./scripts/dev-clean.sh
#===============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${RED}==================================================================${NC}"
echo -e "${RED}  WV Wild Outdoors - CLEAN Development Environment${NC}"
echo -e "${RED}==================================================================${NC}"
echo ""
echo -e "${YELLOW}⚠️  WARNING: This will DELETE ALL DATA!${NC}"
echo "  - All containers will be stopped and removed"
echo "  - All Docker volumes will be deleted"
echo "  - All database data will be lost"
echo "  - All uploaded files will be lost"
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo -e "${BLUE}Cleanup cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}Removing all containers, networks, and volumes...${NC}"
docker compose down -v --remove-orphans

echo ""
echo -e "${GREEN}==================================================================${NC}"
echo -e "${GREEN}  Environment completely cleaned!${NC}"
echo -e "${GREEN}==================================================================${NC}"
echo ""
echo "All services, networks, and data volumes have been removed."
echo "Next start will initialize fresh databases."
echo ""
echo "To start the environment again:"
echo "  ./scripts/dev-start.sh"
echo ""
