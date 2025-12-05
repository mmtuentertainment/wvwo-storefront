#!/usr/bin/env bash
#===============================================================================
# WV Wild Outdoors - Seed Data Loading Script
#===============================================================================
# Loads sample data into development databases for testing
# Usage: ./scripts/dev-seed.sh [options]
#
# Options:
#   --directus    Load Directus products/categories only
#   --ghost       Show Ghost seeding instructions (uses SQLite)
#   --all         Load all seed data (default)
#   --help        Show this help message
#
# Prerequisites:
#   1. Services must be running (./scripts/dev-start.sh)
#   2. For Directus: Create collections first via Admin UI
#      - categories (name, slug, description)
#      - products (name, slug, description, price, sku, in_stock, featured)
#      - products_categories (many-to-many junction)
#===============================================================================

set -euo pipefail  # Exit on error, unset vars, pipeline failures

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SEED_DATA_DIR="$PROJECT_ROOT/docker/postgres/seed-data"

# Default options
SEED_DIRECTUS=false
SEED_GHOST=false
SHOW_HELP=false

#===============================================================================
# Functions
#===============================================================================

show_help() {
    echo -e "${BLUE}WV Wild Outdoors - Seed Data Loader${NC}"
    echo ""
    echo "Usage: ./scripts/dev-seed.sh [options]"
    echo ""
    echo "Options:"
    echo "  --directus    Load Directus products/categories only"
    echo "  --ghost       Show Ghost seeding instructions"
    echo "  --all         Load all seed data (default)"
    echo "  --help        Show this help message"
    echo ""
    echo "Prerequisites:"
    echo "  1. Services must be running: ./scripts/dev-start.sh"
    echo "  2. Directus collections must be created via Admin UI first"
    echo ""
    echo "Examples:"
    echo "  ./scripts/dev-seed.sh              # Load all seed data"
    echo "  ./scripts/dev-seed.sh --directus   # Load Directus only"
    echo ""
}

check_services() {
    echo -e "${BLUE}Checking services...${NC}"

    # Check if Docker is running
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}ERROR: Docker is not running!${NC}"
        exit 1
    fi

    # Check if PostgreSQL is healthy
    if ! docker compose ps postgres 2>/dev/null | grep -q "(healthy)"; then
        echo -e "${RED}ERROR: PostgreSQL is not running or healthy!${NC}"
        echo "Start services first: ./scripts/dev-start.sh"
        exit 1
    fi

    echo -e "${GREEN}✓ PostgreSQL is running and healthy${NC}"
}

seed_directus() {
    echo ""
    echo -e "${BLUE}==================================================================${NC}"
    echo -e "${BLUE}  Seeding Directus Database${NC}"
    echo -e "${BLUE}==================================================================${NC}"
    echo ""

    # Check if seed file exists
    if [ ! -f "$SEED_DATA_DIR/01-directus-products.sql" ]; then
        echo -e "${RED}ERROR: Seed file not found: $SEED_DATA_DIR/01-directus-products.sql${NC}"
        exit 1
    fi

    echo -e "${YELLOW}NOTE: Directus collections must exist before seeding.${NC}"
    echo "If you haven't created them yet:"
    echo "  1. Visit http://localhost:8055/admin"
    echo "  2. Create 'categories' collection (name, slug, description)"
    echo "  3. Create 'products' collection (name, slug, description, price, sku, in_stock, featured)"
    echo "  4. Create 'products_categories' junction (many-to-many)"
    echo ""

    read -p "Continue with seeding? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Seeding cancelled."
        return
    fi

    echo ""
    echo -e "${YELLOW}Loading Directus seed data...${NC}"

    # Copy seed file to container and execute
    docker cp "$SEED_DATA_DIR/01-directus-products.sql" wvwo-postgres-dev:/tmp/seed-directus.sql

    # Execute the seed SQL
    docker exec wvwo-postgres-dev psql -U directus_user -d directus -f /tmp/seed-directus.sql

    # Cleanup
    docker exec wvwo-postgres-dev rm -f /tmp/seed-directus.sql

    echo ""
    echo -e "${GREEN}✓ Directus seed data loaded${NC}"
    echo "  View products at: http://localhost:8055/admin/content/products"
}

seed_ghost() {
    echo ""
    echo -e "${BLUE}==================================================================${NC}"
    echo -e "${BLUE}  Ghost Blog Seeding${NC}"
    echo -e "${BLUE}==================================================================${NC}"
    echo ""

    echo -e "${YELLOW}NOTE: Ghost uses SQLite in current configuration.${NC}"
    echo ""
    echo "Ghost cannot be seeded via PostgreSQL SQL files."
    echo "Instead, seed Ghost content using one of these methods:"
    echo ""
    echo -e "${GREEN}Option 1: Manual Creation (Recommended for Dev)${NC}"
    echo "  1. Visit http://localhost:2368/ghost/"
    echo "  2. Complete setup wizard if not done"
    echo "  3. Create posts manually in the editor"
    echo ""
    echo -e "${GREEN}Option 2: JSON Import${NC}"
    echo "  1. Export content from another Ghost instance"
    echo "  2. Ghost Admin > Settings > Labs > Import Content"
    echo ""
    echo -e "${GREEN}Option 3: Ghost Admin API${NC}"
    echo "  1. Create integration in Ghost Admin > Settings > Integrations"
    echo "  2. Use Admin API key with @tryghost/admin-api package"
    echo "  3. See docker/postgres/seed-data/02-ghost-posts.sql for example"
    echo ""
    echo -e "${GREEN}Sample post content is documented in:${NC}"
    echo "  $SEED_DATA_DIR/02-ghost-posts.sql"
    echo ""
}

show_summary() {
    echo ""
    echo -e "${GREEN}==================================================================${NC}"
    echo -e "${GREEN}  Seed Data Summary${NC}"
    echo -e "${GREEN}==================================================================${NC}"
    echo ""
    echo "Directus (http://localhost:8055/admin):"
    echo "  - 5 categories (Hunting, Fishing, Camping, Apparel, Accessories)"
    echo "  - 15 products with WV-themed names and descriptions"
    echo "  - Product-category relationships"
    echo ""
    echo "Ghost (http://localhost:2368/ghost/):"
    echo "  - Manual seeding required (see instructions above)"
    echo "  - Sample content documented in seed-data/02-ghost-posts.sql"
    echo ""
    echo "All seed data uses WV Wild Outdoors theming:"
    echo "  - Local rivers: Elk, New, Gauley, Seneca Creek"
    echo "  - Places: Dolly Sods, Allegheny Mountains, Birch River"
    echo "  - Culture: 'Almost Heaven', 'Wild Wonderful', coal heritage"
    echo ""
}

#===============================================================================
# Parse Arguments
#===============================================================================

# Default to --all if no arguments
if [ $# -eq 0 ]; then
    SEED_DIRECTUS=true
    SEED_GHOST=true
fi

while [[ $# -gt 0 ]]; do
    case $1 in
        --directus)
            SEED_DIRECTUS=true
            shift
            ;;
        --ghost)
            SEED_GHOST=true
            shift
            ;;
        --all)
            SEED_DIRECTUS=true
            SEED_GHOST=true
            shift
            ;;
        --help|-h)
            SHOW_HELP=true
            shift
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            show_help
            exit 1
            ;;
    esac
done

#===============================================================================
# Main
#===============================================================================

if [ "$SHOW_HELP" = true ]; then
    show_help
    exit 0
fi

echo -e "${BLUE}==================================================================${NC}"
echo -e "${BLUE}  WV Wild Outdoors - Loading Seed Data${NC}"
echo -e "${BLUE}==================================================================${NC}"
echo ""

# Check services are running
check_services

# Seed databases
if [ "$SEED_DIRECTUS" = true ]; then
    seed_directus
fi

if [ "$SEED_GHOST" = true ]; then
    seed_ghost
fi

# Show summary
show_summary

echo -e "${GREEN}Done!${NC}"
