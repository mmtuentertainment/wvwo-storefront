#!/usr/bin/env bash
#===============================================================================
# WV Wild Outdoors - Development Environment Stop Script
#===============================================================================
# Stops all services gracefully (preserves data volumes)
# Usage: ./scripts/dev-stop.sh
#===============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}==================================================================${NC}"
echo -e "${BLUE}  WV Wild Outdoors - Stopping Development Environment${NC}"
echo -e "${BLUE}==================================================================${NC}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}ERROR: Docker is not running!${NC}"
    exit 1
fi

# Stop all services
echo -e "${YELLOW}Stopping all services...${NC}"
docker compose down

echo ""
echo -e "${GREEN}==================================================================${NC}"
echo -e "${GREEN}  All services stopped successfully!${NC}"
echo -e "${GREEN}==================================================================${NC}"
echo ""
echo "All containers have been stopped and removed."
echo "Data volumes are preserved and will be available on next start."
echo ""
echo "To completely remove all data, use:"
echo "  ./scripts/dev-clean.sh"
echo ""
