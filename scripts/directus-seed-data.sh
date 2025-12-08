#!/bin/bash
# =============================================================================
# Directus Seed Data Script
# Feature: 002-directus-cms-setup
# Purpose: Load seed data for all collections
# =============================================================================

set -euo pipefail

# Help / Usage
if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
    cat <<EOF
Directus Seed Data Script

Usage: $(basename "$0") [-h|--help]

Env vars:
  DIRECTUS_URL            External Directus URL (default: http://localhost:8055)
  DIRECTUS_ADMIN_EMAIL    Admin email (default: admin@localhost.dev)
  DIRECTUS_ADMIN_PASSWORD Admin password (default: admin123)

Description:
  Loads initial seed data (categories, brands, singleton content) into the running
  Directus instance. Assumes 'wvwo-directus-dev' container is active.
EOF
    exit 0
fi

DIRECTUS_URL="${DIRECTUS_URL:-http://localhost:8055}"
ADMIN_EMAIL="${DIRECTUS_ADMIN_EMAIL:-admin@localhost.dev}"
ADMIN_PASSWORD="${DIRECTUS_ADMIN_PASSWORD:-admin123}"

# Internal URL for container-based calls
# Internal URL (derived from env var to allow overrides, e.g. http://directus:8055)
# Strip trailing slash from DIRECTUS_URL
BASE_URL="${DIRECTUS_URL%/}"
DIRECTUS_INTERNAL_URL="$BASE_URL"

echo "=== Directus Seed Data Loader ==="
echo ""

# Authenticate and get access token
echo "Authenticating..."
AUTH_RESPONSE=$(docker exec wvwo-directus-dev wget -q -O - \
    --header="Content-Type: application/json" \
    --post-data="{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" \
    "$DIRECTUS_INTERNAL_URL/auth/login")

ACCESS_TOKEN=$(echo "$AUTH_RESPONSE" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$ACCESS_TOKEN" ]; then
    echo "ERROR: Failed to authenticate."
    exit 1
fi
echo "✓ Authenticated"

# Function to insert item (idempotent - checks slug/name before insert)
insert_item() {
    local collection=$1
    local data=$2

    docker exec wvwo-directus-dev wget -q -O - \
        --header="Content-Type: application/json" \
        --header="Authorization: Bearer $ACCESS_TOKEN" \
        --post-data="$data" \
        "$DIRECTUS_INTERNAL_URL/items/$collection" > /dev/null 2>&1 || true
}

# Function to update singleton (uses Node.js for PATCH support)
# Note: Uses hardcoded 127.0.0.1:8055 as Node.js runs inside the container
update_singleton() {
    local collection=$1
    local data=$2

    docker exec wvwo-directus-dev node -e "
const http = require('http');
const data = JSON.stringify($data);
const req = http.request({
  hostname: '127.0.0.1',
  port: 8055,
  path: '/items/$collection',
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'Authorization': 'Bearer $ACCESS_TOKEN'
  }
}, (res) => {
  res.on('data', () => {});
  res.on('end', () => process.exit(res.statusCode < 400 ? 0 : 1));
});
req.write(data);
req.end();
" 2>/dev/null || true
}

echo ""
echo "=== Loading Categories ==="

# Top-level categories first
insert_item "categories" '{"name":"Firearms","slug":"firearms","sort_order":1}'
insert_item "categories" '{"name":"Ammunition","slug":"ammunition","sort_order":2}'
insert_item "categories" '{"name":"Footwear","slug":"footwear","sort_order":3}'
insert_item "categories" '{"name":"Optics","slug":"optics","sort_order":4}'
insert_item "categories" '{"name":"Hunting Gear","slug":"hunting-gear","sort_order":5}'
insert_item "categories" '{"name":"Fishing","slug":"fishing","sort_order":6}'
insert_item "categories" '{"name":"Licenses","slug":"licenses","description":"WVDNR Hunting & Fishing Licenses","sort_order":7}'

echo "✓ Top-level categories loaded"

# Get category IDs for subcategories
echo "Loading subcategories..."

# Subcategories (parent IDs will need to be looked up)
# For simplicity, we'll load them without parent references first
insert_item "categories" '{"name":"Rifles","slug":"rifles","sort_order":1}'
insert_item "categories" '{"name":"Handguns","slug":"handguns","sort_order":2}'
insert_item "categories" '{"name":"Shotguns","slug":"shotguns","sort_order":3}'
insert_item "categories" '{"name":"Rifle Ammo","slug":"rifle-ammo","sort_order":1}'
insert_item "categories" '{"name":"Handgun Ammo","slug":"handgun-ammo","sort_order":2}'
insert_item "categories" '{"name":"Shotgun Ammo","slug":"shotgun-ammo","sort_order":3}'
insert_item "categories" '{"name":"Hunting Boots","slug":"hunting-boots","sort_order":1}'
insert_item "categories" '{"name":"Rubber Boots","slug":"rubber-boots","sort_order":2}'
insert_item "categories" '{"name":"Rifle Scopes","slug":"rifle-scopes","sort_order":1}'
insert_item "categories" '{"name":"Binoculars","slug":"binoculars","sort_order":2}'
insert_item "categories" '{"name":"Camo & Apparel","slug":"camo-apparel","sort_order":1}'
insert_item "categories" '{"name":"Tree Stands","slug":"tree-stands","sort_order":2}'
insert_item "categories" '{"name":"Deer Feed","slug":"deer-feed","sort_order":3}'

echo "✓ Subcategories loaded"

echo ""
echo "=== Loading Brands ==="

insert_item "brands" '{"name":"Remington","slug":"remington","description":"Ammunition and firearms"}'
insert_item "brands" '{"name":"Hornady","slug":"hornady","description":"Premium ammunition"}'
insert_item "brands" '{"name":"Danner","slug":"danner","description":"Hunting boots 400g-1200g insulation"}'
insert_item "brands" '{"name":"LaCrosse","slug":"lacrosse","description":"Alpha Burly and rubber boots"}'
insert_item "brands" '{"name":"Muck","slug":"muck","description":"Rubber hunting boots"}'
insert_item "brands" '{"name":"Vortex Optics","slug":"vortex","description":"Authorized dealer - scopes and binoculars"}'
insert_item "brands" '{"name":"Savage","slug":"savage","description":"Rifles - Axis series"}'
insert_item "brands" '{"name":"Ruger","slug":"ruger","description":"American series rifles and handguns"}'
insert_item "brands" '{"name":"Marlin","slug":"marlin","description":"Lever-action rifles - 30-30"}'
insert_item "brands" '{"name":"Mossy Oak","slug":"mossy-oak","description":"Camo patterns"}'
insert_item "brands" '{"name":"Realtree","slug":"realtree","description":"Camo patterns"}'

echo "✓ Brands loaded"

echo ""
echo "=== Loading Store Info (Singleton) ==="

# Singletons require PATCH, not POST
update_singleton "store_info" '{
    "store_name":"WV Wild Outdoors LLC",
    "address_line1":"121 Birch River Rd",
    "address_line2":"",
    "city":"Birch River",
    "state":"WV",
    "postal_code":"26610",
    "phone":"(304) 649-2607",
    "email":"bkutt1@yahoo.com",
    "hours_weekday":"Mon-Sat: 10am-5pm",
    "hours_weekend":"Sunday: Closed",
    "holiday_hours":"Family comes first - call ahead if you are driving far",
    "about_short":"Family-owned sporting goods in Braxton County since 2008. Filling freezers, not trophy cases.",
    "flood_story":"We have been here since 2008.\n\nStarted in Fayetteville. Moved to Hico - could not make it. Moved to Birch River in 2013. Then June 23, 2016 happened.\n\nThe flood hit Birch River hard. Record water levels. Old Route 19 collapsed. We lost $70,000 in inventory overnight. FEMA said no - Braxton County was not on their list. Then someone broke in and took another $10,000.\n\nWe moved to this corner lot, started smaller, and kept going. Today we own this building and every single thing in it. No debt. No landlord. Just us.\n\nWhen a door closes, look for the blessing. God is good.",
    "facebook_url":"https://www.facebook.com/profile.php?id=100063588635941"
}'

echo "✓ Store info loaded"

echo ""
echo "=== Loading Services ==="

insert_item "services" '{
    "status":"published",
    "name":"FFL Transfers",
    "slug":"ffl-transfers",
    "short_description":"Transfer firearms purchased online to our store",
    "description":"We are a licensed Type 02 FFL dealer. Bring your online firearm purchase here for legal transfer.\n\n**Process:**\n1. Buy firearm online, ship to our FFL\n2. We notify you when it arrives\n3. Complete ATF Form 4473 in-store\n4. Pass NICS background check\n5. Take your firearm home",
    "price_info":"$25 per transfer",
    "sort_order":1
}'

insert_item "services" '{
    "status":"published",
    "name":"Hunting & Fishing Licenses",
    "slug":"licenses",
    "short_description":"WVDNR authorized license agent",
    "description":"Skip the line at Walmart. We are an authorized WVDNR license agent.\n\n**Available:**\n- Resident/Non-resident hunting\n- Resident/Non-resident fishing\n- Combination licenses\n- Trout stamps\n- National Forest stamps",
    "price_info":"State prices + $1 processing",
    "sort_order":2
}'

insert_item "services" '{
    "status":"published",
    "name":"Buy/Sell/Trade Firearms",
    "slug":"buy-sell-trade",
    "short_description":"Fair prices for your used firearms",
    "description":"As a Type 02 FFL, we can buy and sell used firearms legally. Bring in your firearm for a fair cash offer or trade value. No appointment needed.",
    "price_info":"Call for quote",
    "sort_order":3
}'

insert_item "services" '{
    "status":"published",
    "name":"Scope Mounting & Bore Sighting",
    "slug":"scope-mounting",
    "short_description":"Professional scope installation",
    "description":"Let us mount your new scope properly. We will bore sight it so you are ready for the range.",
    "price_info":"$20 mount + sight",
    "sort_order":4
}'

echo "✓ Services loaded"

echo ""
echo "=== Loading Announcements ==="

insert_item "announcements" '{
    "status":"published",
    "message":"Buck season opens Nov 25 - we have your gear!",
    "type":"promo",
    "link":"/products?category=hunting-gear",
    "sort_order":1
}'

echo "✓ Announcements loaded"

echo ""
echo "=== Loading Pages ==="

insert_item "pages" '{
    "status":"draft",
    "title":"About Us",
    "slug":"about",
    "content":"[PLACEHOLDER: Story content - gather from Kim]",
    "meta_title":"About WV Wild Outdoors - Family Owned Since 2008",
    "meta_description":"Family-owned sporting goods store serving Braxton County since 2008."
}'

insert_item "pages" '{
    "status":"draft",
    "title":"FAQ",
    "slug":"faq",
    "content":"[PLACEHOLDER: FAQ content]",
    "meta_title":"FAQ - WV Wild Outdoors",
    "meta_description":"Common questions about FFL transfers, licenses, and more."
}'

echo "✓ Pages loaded"

echo ""
echo "=== Seed Data Complete ==="
echo "Loaded: categories, brands, store_info, services, announcements, pages"
echo ""
echo "Verify at: http://localhost:8055/admin"
