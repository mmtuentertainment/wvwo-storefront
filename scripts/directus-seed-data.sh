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
# BASE_URL: Public-facing URL (used for the footer verification link)
BASE_URL="${DIRECTUS_URL%/}"

# DIRECTUS_INTERNAL_URL: Used for container-to-container calls.
# Defaults to $BASE_URL but can be overridden if internal Docker networking requires a different host (e.g. http://directus:8055)
DIRECTUS_INTERNAL_URL="${DIRECTUS_INTERNAL_URL:-$BASE_URL}"

echo "=== Directus Seed Data Loader ==="
echo ""

# Authenticate and get access token
echo "Authenticating..."
AUTH_RESPONSE=$(docker exec wvwo-directus-dev wget -qO - \
    --header="Content-Type: application/json" \
    --post-data="{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" \
    "$DIRECTUS_INTERNAL_URL/auth/login" || echo "failed")

if [[ "$AUTH_RESPONSE" == "failed" ]]; then
    echo "❌ ERROR: Failed to authenticate with Directus." >&2
    echo "response: $AUTH_RESPONSE" >&2
    exit 1
fi

ACCESS_TOKEN=$(echo "$AUTH_RESPONSE" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$ACCESS_TOKEN" ]; then
    echo "❌ ERROR: Could not extract access token from response." >&2
    exit 1
fi
echo "✓ Authenticated"

# Function to insert item (simple POST)
insert_item() {
    local collection=$1
    local data=$2

    if ! docker exec wvwo-directus-dev wget -qO - \
        --header="Content-Type: application/json" \
        --header="Authorization: Bearer $ACCESS_TOKEN" \
        --post-data="$data" \
        "$DIRECTUS_INTERNAL_URL/items/$collection" > /dev/null 2>&1; then
        echo "❌ WARNING: Failed to insert into $collection" >&2
        return 1
    fi
}

# Function to check if item exists, then inset if not (IDEMPOTENT)
check_or_insert_item() {
    local collection=$1
    local slug=$2
    local data=$3

    # Check existence using Directus filter
    # Uses 'grep -c' to count occurrences of "id" in the response (simple verification)
    # Split declaration to avoid masking return values (ShellCheck SC2155)
    local exists
    exists=$(docker exec wvwo-directus-dev wget -qO - \
        --header="Authorization: Bearer $ACCESS_TOKEN" \
        "$DIRECTUS_INTERNAL_URL/items/$collection?filter[slug][_eq]=$slug&limit=1" 2>/dev/null | grep -c '"id"' || true)

    if [ "$exists" -gt 0 ]; then
        echo "  (skipped: $slug already exists)"
        return 0
    fi

    echo "  Inserting: $slug"
    insert_item "$collection" "$data"
}

# Function to update singleton (uses Node.js for PATCH support)
update_singleton() {
    local collection=$1
    local data=$2

    echo "  Updating singleton: $collection"
    # Pass data via stdin to avoid JSON injection/escaping issues in the script string
    # Using 'docker exec -i' to accept stdin
    if ! echo "$data" | docker exec -i wvwo-directus-dev node -e "
const http = require('http');
const fs = require('fs');

// Read JSON data from stdin
const data = fs.readFileSync(0, 'utf-8');

const req = http.request({
  hostname: '127.0.0.1',
  port: 8055,
  path: '/items/$collection',
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
    'Authorization': 'Bearer $ACCESS_TOKEN'
  }
}, (res) => {
  res.on('data', () => {});
  res.on('end', () => process.exit(res.statusCode < 400 ? 0 : 1));
});

req.on('error', (e) => {
  console.error(e);
  process.exit(1);
});

req.write(data);
req.end();
" > /dev/null 2>&1; then
        echo "❌ WARNING: Failed to update $collection" >&2
        return 1
    fi
}

echo ""
echo "=== Loading Categories ==="

# Top-level categories first
check_or_insert_item "categories" "firearms" '{"name":"Firearms","slug":"firearms","sort_order":1}'
check_or_insert_item "categories" "ammunition" '{"name":"Ammunition","slug":"ammunition","sort_order":2}'
check_or_insert_item "categories" "footwear" '{"name":"Footwear","slug":"footwear","sort_order":3}'
check_or_insert_item "categories" "optics" '{"name":"Optics","slug":"optics","sort_order":4}'
check_or_insert_item "categories" "hunting-gear" '{"name":"Hunting Gear","slug":"hunting-gear","sort_order":5}'
check_or_insert_item "categories" "fishing" '{"name":"Fishing","slug":"fishing","sort_order":6}'
check_or_insert_item "categories" "licenses" '{"name":"Licenses","slug":"licenses","description":"WVDNR Hunting & Fishing Licenses","sort_order":7}'

echo "✓ Top-level categories loaded"

# Get category IDs for subcategories
echo "Loading subcategories..."

# Subcategories (parent IDs will need to be looked up)
# For simplicity, we'll load them without parent references first
check_or_insert_item "categories" "rifles" '{"name":"Rifles","slug":"rifles","sort_order":1}'
check_or_insert_item "categories" "handguns" '{"name":"Handguns","slug":"handguns","sort_order":2}'
check_or_insert_item "categories" "shotguns" '{"name":"Shotguns","slug":"shotguns","sort_order":3}'
check_or_insert_item "categories" "rifle-ammo" '{"name":"Rifle Ammo","slug":"rifle-ammo","sort_order":1}'
check_or_insert_item "categories" "handgun-ammo" '{"name":"Handgun Ammo","slug":"handgun-ammo","sort_order":2}'
check_or_insert_item "categories" "shotgun-ammo" '{"name":"Shotgun Ammo","slug":"shotgun-ammo","sort_order":3}'
check_or_insert_item "categories" "hunting-boots" '{"name":"Hunting Boots","slug":"hunting-boots","sort_order":1}'
check_or_insert_item "categories" "rubber-boots" '{"name":"Rubber Boots","slug":"rubber-boots","sort_order":2}'
check_or_insert_item "categories" "rifle-scopes" '{"name":"Rifle Scopes","slug":"rifle-scopes","sort_order":1}'
check_or_insert_item "categories" "binoculars" '{"name":"Binoculars","slug":"binoculars","sort_order":2}'
check_or_insert_item "categories" "camo-apparel" '{"name":"Camo & Apparel","slug":"camo-apparel","sort_order":1}'
check_or_insert_item "categories" "tree-stands" '{"name":"Tree Stands","slug":"tree-stands","sort_order":2}'
check_or_insert_item "categories" "deer-feed" '{"name":"Deer Feed","slug":"deer-feed","sort_order":3}'

echo "✓ Subcategories loaded"

echo ""
echo "=== Loading Brands ==="

check_or_insert_item "brands" "remington" '{"name":"Remington","slug":"remington","description":"Ammunition and firearms"}'
check_or_insert_item "brands" "hornady" '{"name":"Hornady","slug":"hornady","description":"Premium ammunition"}'
check_or_insert_item "brands" "danner" '{"name":"Danner","slug":"danner","description":"Hunting boots 400g-1200g insulation"}'
check_or_insert_item "brands" "lacrosse" '{"name":"LaCrosse","slug":"lacrosse","description":"Alpha Burly and rubber boots"}'
check_or_insert_item "brands" "muck" '{"name":"Muck","slug":"muck","description":"Rubber hunting boots"}'
check_or_insert_item "brands" "vortex" '{"name":"Vortex Optics","slug":"vortex","description":"Authorized dealer - scopes and binoculars"}'
check_or_insert_item "brands" "savage" '{"name":"Savage","slug":"savage","description":"Rifles - Axis series"}'
check_or_insert_item "brands" "ruger" '{"name":"Ruger","slug":"ruger","description":"American series rifles and handguns"}'
check_or_insert_item "brands" "marlin" '{"name":"Marlin","slug":"marlin","description":"Lever-action rifles - 30-30"}'
check_or_insert_item "brands" "mossy-oak" '{"name":"Mossy Oak","slug":"mossy-oak","description":"Camo patterns"}'
check_or_insert_item "brands" "realtree" '{"name":"Realtree","slug":"realtree","description":"Camo patterns"}'

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

check_or_insert_item "services" "ffl-transfers" '{
    "status":"published",
    "name":"FFL Transfers",
    "slug":"ffl-transfers",
    "short_description":"Transfer firearms purchased online to our store",
    "description":"We are a licensed Type 02 FFL dealer. Bring your online firearm purchase here for legal transfer.\n\n**Process:**\n1. Buy firearm online, ship to our FFL\n2. We notify you when it arrives\n3. Complete ATF Form 4473 in-store\n4. Pass NICS background check\n5. Take your firearm home",
    "price_info":"$25 per transfer",
    "sort_order":1
}'

check_or_insert_item "services" "licenses" '{
    "status":"published",
    "name":"Hunting & Fishing Licenses",
    "slug":"licenses",
    "short_description":"WVDNR authorized license agent",
    "description":"Skip the line at Walmart. We are an authorized WVDNR license agent.\n\n**Available:**\n- Resident/Non-resident hunting\n- Resident/Non-resident fishing\n- Combination licenses\n- Trout stamps\n- National Forest stamps",
    "price_info":"State prices + $1 processing",
    "sort_order":2
}'

check_or_insert_item "services" "buy-sell-trade" '{
    "status":"published",
    "name":"Buy/Sell/Trade Firearms",
    "slug":"buy-sell-trade",
    "short_description":"Fair prices for your used firearms",
    "description":"As a Type 02 FFL, we can buy and sell used firearms legally. Bring in your firearm for a fair cash offer or trade value. No appointment needed.",
    "price_info":"Call for quote",
    "sort_order":3
}'

check_or_insert_item "services" "scope-mounting" '{
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

# Announcements don't have slugs usually, but we need a unique key if we want idempotency.
# We will use the 'message' or 'type' as a quasi-key in our thoughts, but here we might just have to skip idempotency safely or add a Title field?
# Actually T056 says "Announcements list". They usually have IDs.
# For simplicity, we will stick to insert_item for announcements effectively, or just skip if any exist?
# Let's just use insert_item for announcements as they are temporal updates, unless we add a unique field.
# Recommendation: Skip check for announcements to avoid complexity, or check by "message".
# Let's check by message content.
# Filter: ?filter[message][_contains]=Buck...

# Just use insert_item for now to avoid complexity with long strings in URL params
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

check_or_insert_item "pages" "about" '{
    "status":"draft",
    "title":"About Us",
    "slug":"about",
    "content":"[PLACEHOLDER: Story content - gather from Kim]",
    "meta_title":"About WV Wild Outdoors - Family Owned Since 2008",
    "meta_description":"Family-owned sporting goods store serving Braxton County since 2008."
}'

check_or_insert_item "pages" "faq" '{
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
echo "Verify at: $BASE_URL/admin"
