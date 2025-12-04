#!/usr/bin/env bash
#===============================================================================
# WV Wild Outdoors - Service Restart Script
#===============================================================================
# Restarts a specific service or all services
# Usage: ./scripts/dev-restart.sh [service-name]
#        ./scripts/dev-restart.sh             # Restarts all services
#        ./scripts/dev-restart.sh postgres    # Restarts only postgres
#===============================================================================

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SERVICE=$1

if [ -z "$SERVICE" ]; then
    echo -e "${YELLOW}Restarting all services...${NC}"
    docker compose restart
    echo -e "${GREEN}✓ All services restarted${NC}"
else
    echo -e "${YELLOW}Restarting $SERVICE...${NC}"
    docker compose restart "$SERVICE"
    echo -e "${GREEN}✓ $SERVICE restarted${NC}"
fi

echo ""
echo "Service status:"
docker compose ps

echo ""
echo "Usage examples:"
echo "  ./scripts/dev-restart.sh              # Restart all"
echo "  ./scripts/dev-restart.sh postgres     # Restart postgres only"
echo "  ./scripts/dev-restart.sh directus     # Restart directus only"
echo ""
