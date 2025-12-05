#!/usr/bin/env bash
#===============================================================================
# WV Wild Outdoors - Development Environment Startup Script
#===============================================================================
# Starts all services with Docker Compose
# Usage: ./scripts/dev-start.sh
#===============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}==================================================================${NC}"
echo -e "${BLUE}  WV Wild Outdoors - Starting Local Development Environment${NC}"
echo -e "${BLUE}==================================================================${NC}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}ERROR: Docker is not running!${NC}"
    echo "Please start Docker Desktop (Windows/macOS) or Docker Engine (Linux)"
    exit 1
fi

echo -e "${GREEN}✓ Docker is running${NC}"

# Check Docker resource availability
echo -e "${BLUE}Checking Docker resources...${NC}"

# Check available disk space (at least 10 GB recommended)
if [[ "$(uname)" == "Darwin" ]]; then
    # macOS uses BSD df with -g flag
    AVAILABLE_DISK=$(df -g . 2>/dev/null | awk 'NR==2 {print $4}' || echo "999")
else
    # Linux uses GNU df with -BG flag
    AVAILABLE_DISK=$(df -BG . 2>/dev/null | awk 'NR==2 {print $4}' | sed 's/G//' || echo "999")
fi

if [ "$AVAILABLE_DISK" -lt 10 ] 2>/dev/null; then
    echo -e "${YELLOW}Warning: Low disk space (${AVAILABLE_DISK}GB available, 10GB+ recommended)${NC}"
fi

# Check Docker memory (cross-platform)
DOCKER_MEM=$(docker info --format '{{.MemTotal}}' 2>/dev/null)
if [ -n "$DOCKER_MEM" ]; then
    # Convert bytes to GB
    DOCKER_MEM_GB=$((DOCKER_MEM / 1024 / 1024 / 1024))
    if [ "$DOCKER_MEM_GB" -lt 4 ]; then
        echo -e "${YELLOW}Warning: Docker has ${DOCKER_MEM_GB}GB RAM (4GB+ recommended)${NC}"
        echo "Increase Docker resources: Docker Desktop → Settings → Resources"
    fi
fi

echo -e "${GREEN}✓ Resources checked${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}ERROR: .env file not found!${NC}"
    echo "Please create .env from .env.example:"
    echo "  cp .env.example .env"
    echo "  # Then edit .env with your actual values"
    exit 2
fi

echo -e "${GREEN}✓ .env file found${NC}"
echo ""

# Start all services
echo -e "${YELLOW}Starting all services...${NC}"
docker compose up -d

# Wait for services to become healthy
echo ""
echo -e "${YELLOW}Waiting for services to become healthy...${NC}"
MAX_WAIT=120  # Maximum 2 minutes
ELAPSED=0
INTERVAL=5

while [ $ELAPSED -lt $MAX_WAIT ]; do
    # Get service status
    PS_JSON=$(docker compose ps --format json 2>/dev/null || echo "[]")

    # Count running services and healthy services
    RUNNING_COUNT=$(echo "$PS_JSON" | grep -c '"State":"running"' || echo "0")
    HEALTHY_COUNT=$(echo "$PS_JSON" | grep -c '"Health":"healthy"' || echo "0")

    # Count services with no health check defined (running but no Health field)
    NO_HEALTHCHECK=$(echo "$PS_JSON" | grep '"State":"running"' | grep -cv '"Health":' || echo "0")

    # Services that need to be healthy = running - no_healthcheck
    EXPECTED_HEALTHY=$((RUNNING_COUNT - NO_HEALTHCHECK))

    if [ "$RUNNING_COUNT" -gt 0 ]; then
        echo -ne "  ${BLUE}[$ELAPSED/$MAX_WAIT s]${NC} Healthy: $HEALTHY_COUNT / $EXPECTED_HEALTHY services\r"

        # All services with health checks are healthy
        if [ "$HEALTHY_COUNT" -ge "$EXPECTED_HEALTHY" ] && [ "$EXPECTED_HEALTHY" -gt 0 ]; then
            echo ""
            echo -e "${GREEN}✓ All services are healthy${NC}"
            break
        fi
    fi

    sleep $INTERVAL
    ELAPSED=$((ELAPSED + INTERVAL))
done

if [ $ELAPSED -ge $MAX_WAIT ]; then
    echo ""
    echo -e "${YELLOW}Warning: Some services may not be healthy yet${NC}"
    echo "Run './scripts/dev-logs.sh' to check service logs"
fi

# Show service status
echo ""
echo -e "${BLUE}Service Status:${NC}"
docker compose ps

echo ""
echo -e "${GREEN}==================================================================${NC}"
echo -e "${GREEN}  Development environment started successfully!${NC}"
echo -e "${GREEN}==================================================================${NC}"
echo ""
echo "Access your services:"
echo -e "  ${BLUE}Astro Frontend:${NC}     http://localhost:3000"
echo -e "  ${BLUE}Directus CMS:${NC}       http://localhost:8055"
echo -e "  ${BLUE}Ghost Blog:${NC}         http://localhost:2368"
echo -e "  ${BLUE}Listmonk Email:${NC}     http://localhost:9000"
echo -e "  ${BLUE}Mixpost Social:${NC}     http://localhost:8080"
echo -e "  ${BLUE}PostgreSQL:${NC}         localhost:5432"
echo -e "  ${BLUE}Redis:${NC}              localhost:6379"
echo ""
echo "Useful commands:"
echo "  View logs:   docker compose logs -f [service]"
echo "  Stop all:    ./scripts/dev-stop.sh"
echo "  Clean all:   ./scripts/dev-clean.sh"
echo ""
