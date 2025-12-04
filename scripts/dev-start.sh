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

# Wait a moment for services to initialize
sleep 3

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
