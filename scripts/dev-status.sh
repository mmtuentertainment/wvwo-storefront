#!/usr/bin/env bash
#===============================================================================
# WV Wild Outdoors - Service Status Script
#===============================================================================
# Shows status of all services with formatted output
# Usage: ./scripts/dev-status.sh
#===============================================================================

# Colors
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${BLUE}==================================================================${NC}"
echo -e "${BLUE}  WV Wild Outdoors - Service Status${NC}"
echo -e "${BLUE}==================================================================${NC}"
echo ""

# Show detailed service status
docker compose ps

echo ""
echo -e "${GREEN}Service Endpoints:${NC}"
echo "  Astro Frontend:     http://localhost:3000"
echo "  Directus CMS:       http://localhost:8055"
echo "  Ghost Blog:         http://localhost:2368"
echo "  Listmonk Email:     http://localhost:9000"
echo "  Mixpost Social:     http://localhost:8080"
echo "  PostgreSQL:         localhost:5432"
echo "  Redis:              localhost:6379"
echo ""

# Show resource usage
echo -e "${GREEN}Resource Usage:${NC}"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" $(docker compose ps -q)
echo ""
