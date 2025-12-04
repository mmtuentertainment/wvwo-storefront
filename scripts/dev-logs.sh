#!/usr/bin/env bash
#===============================================================================
# WV Wild Outdoors - Service Logs Script
#===============================================================================
# View logs for specific service or all services
# Usage: ./scripts/dev-logs.sh [service-name] [options]
#        ./scripts/dev-logs.sh              # All services (follow)
#        ./scripts/dev-logs.sh directus     # Just directus (follow)
#        ./scripts/dev-logs.sh --tail=50    # Last 50 lines, all services
#===============================================================================

SERVICE=""
EXTRA_ARGS=""

# Parse arguments
for arg in "$@"; do
    if [[ $arg == --* ]]; then
        EXTRA_ARGS="$EXTRA_ARGS $arg"
    else
        SERVICE=$arg
    fi
done

# Colors
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [ -z "$SERVICE" ]; then
    echo -e "${BLUE}Viewing logs for all services (Ctrl+C to exit)${NC}"
    docker compose logs -f $EXTRA_ARGS
else
    echo -e "${BLUE}Viewing logs for $SERVICE (Ctrl+C to exit)${NC}"
    docker compose logs -f $EXTRA_ARGS "$SERVICE"
fi

echo ""
echo -e "${YELLOW}Usage examples:${NC}"
echo "  ./scripts/dev-logs.sh                  # All services, follow"
echo "  ./scripts/dev-logs.sh directus         # Single service, follow"
echo "  ./scripts/dev-logs.sh --tail=50        # Last 50 lines, all services"
echo "  ./scripts/dev-logs.sh postgres --since=10m  # Last 10 minutes"
echo ""
