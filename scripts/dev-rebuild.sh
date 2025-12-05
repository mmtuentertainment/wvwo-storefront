#!/usr/bin/env bash
#===============================================================================
# WV Wild Outdoors - Service Rebuild Script
#===============================================================================
# Rebuilds and restarts a specific service (useful after Dockerfile changes)
# Usage: ./scripts/dev-rebuild.sh <service-name>
#        ./scripts/dev-rebuild.sh astro       # Rebuild astro service
#===============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SERVICE=$1

if [ -z "$SERVICE" ]; then
    echo -e "${RED}ERROR: Service name required${NC}"
    echo "Usage: ./scripts/dev-rebuild.sh <service-name>"
    echo ""
    echo "Available services:"
    echo "  postgres, redis, directus, ghost, astro, listmonk, mixpost"
    echo ""
    echo "Example:"
    echo "  ./scripts/dev-rebuild.sh astro"
    exit 1
fi

echo -e "${YELLOW}Rebuilding $SERVICE...${NC}"
docker compose up -d --build "$SERVICE"

echo -e "${GREEN}✓ $SERVICE rebuilt and restarted${NC}"
echo ""
echo "Service status:"
docker compose ps "$SERVICE"
echo ""
