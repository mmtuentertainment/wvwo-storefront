#!/bin/bash
# =============================================================================
# Directus Schema Setup Script
# Feature: 002-directus-cms-setup
# Purpose: Create all 8 collections and configure public permissions
# =============================================================================

set -euo pipefail

# Configuration
DIRECTUS_URL="${DIRECTUS_URL:-http://localhost:8055}"
ADMIN_EMAIL="${DIRECTUS_ADMIN_EMAIL:-admin@localhost.dev}"
ADMIN_PASSWORD="${DIRECTUS_ADMIN_PASSWORD:-admin123}"

# Extract host:port for internal container calls
DIRECTUS_INTERNAL_URL="http://127.0.0.1:8055"

echo "=== Directus Schema Setup ==="
echo "URL: $DIRECTUS_URL"
echo ""

# Check if Directus is accessible
echo "Checking Directus health..."
if ! docker exec wvwo-directus-dev wget -q -O - "$DIRECTUS_INTERNAL_URL/server/health" > /dev/null 2>&1; then
    echo "ERROR: Directus is not accessible. Make sure Docker services are running."
    exit 1
fi
echo "✓ Directus is healthy"

# Authenticate and get access token
echo "Authenticating..."
AUTH_RESPONSE=$(docker exec wvwo-directus-dev wget -q -O - \
    --header="Content-Type: application/json" \
    --post-data="{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" \
    "$DIRECTUS_INTERNAL_URL/auth/login")

ACCESS_TOKEN=$(echo "$AUTH_RESPONSE" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$ACCESS_TOKEN" ]; then
    echo "ERROR: Failed to authenticate. Check credentials."
    echo "Response: $AUTH_RESPONSE"
    exit 1
fi
echo "✓ Authenticated successfully"

# collection_exists checks if the specified Directus collection exists; returns exit status 0 when it does and non-zero when it does not.
collection_exists() {
    local collection=$1
    docker exec wvwo-directus-dev wget -q -O - \
        --header="Authorization: Bearer $ACCESS_TOKEN" \
        "$DIRECTUS_INTERNAL_URL/collections/$collection" 2>/dev/null | grep -q '"collection"' 2>/dev/null
}

# create_collection idempotently creates a Directus collection if it does not already exist.
# Posts the collection definition to Directus using the global DIRECTUS_INTERNAL_URL and ACCESS_TOKEN.
# collection: name of the collection to create.
# schema: JSON string for the collection schema (e.g., fields/settings).
# meta: JSON string for collection meta/metadata.
create_collection() {
    local collection=$1
    local schema=$2
    local meta=$3

    if collection_exists "$collection"; then
        echo "Collection already exists: $collection (skipping)"
        return 0
    fi

    echo "Creating collection: $collection"

    docker exec wvwo-directus-dev wget -q -O - \
        --header="Content-Type: application/json" \
        --header="Authorization: Bearer $ACCESS_TOKEN" \
        --post-data="{\"collection\":\"$collection\",\"schema\":$schema,\"meta\":$meta}" \
        "$DIRECTUS_INTERNAL_URL/collections" > /dev/null 2>&1 || true
}

# field_exists checks whether a field exists on a Directus collection by querying the Directus API and signalling result via exit status.
field_exists() {
    local collection=$1
    local field=$2
    docker exec wvwo-directus-dev wget -q -O - \
        --header="Authorization: Bearer $ACCESS_TOKEN" \
        "$DIRECTUS_INTERNAL_URL/fields/$collection/$field" 2>/dev/null | grep -q '"field"' 2>/dev/null
}

# create_field idempotently creates a field on a Directus collection via the API and skips creation if the field already exists.
create_field() {
    local collection=$1
    local field=$2
    local type=$3
    local meta=$4
    local schema=${5:-"{}"}

    if field_exists "$collection" "$field"; then
        echo "  Field already exists: $field (skipping)"
        return 0
    fi

    echo "  Adding field: $field"

    docker exec wvwo-directus-dev wget -q -O - \
        --header="Content-Type: application/json" \
        --header="Authorization: Bearer $ACCESS_TOKEN" \
        --post-data="{\"field\":\"$field\",\"type\":\"$type\",\"meta\":$meta,\"schema\":$schema}" \
        "$DIRECTUS_INTERNAL_URL/fields/$collection" > /dev/null 2>&1 || true
}

# get_public_policy_id retrieves the Directus "Public" policy ID from the /policies endpoint and echoes it (prints nothing if not found).
get_public_policy_id() {
    docker exec wvwo-directus-dev wget -q -O - \
        --header="Authorization: Bearer $ACCESS_TOKEN" \
        "$DIRECTUS_INTERNAL_URL/policies" 2>/dev/null | \
        grep -o '"id":"[^"]*","name":"\$t:public_label"' | \
        grep -o '"id":"[^"]*"' | cut -d'"' -f4
}

# permission_exists checks whether a public read permission exists for the given collection in Directus and returns success (0) if found, failure (non‑zero) otherwise.
permission_exists() {
    local collection=$1
    docker exec wvwo-directus-dev wget -q -O - \
        --header="Authorization: Bearer $ACCESS_TOKEN" \
        "$DIRECTUS_INTERNAL_URL/permissions?filter[collection][_eq]=$collection&filter[policy][_eq]=$PUBLIC_POLICY_ID&filter[action][_eq]=read" 2>/dev/null | \
        grep -q '"id"' 2>/dev/null
}

# set_public_permission idempotently assigns the public READ permission to a Directus collection using $PUBLIC_POLICY_ID and $ACCESS_TOKEN; accepts an optional JSON filter as the second argument (defaults to '{}').
set_public_permission() {
    local collection=$1
    local filter=${2:-"{}"}

    if permission_exists "$collection"; then
        echo "Permission already exists for: $collection (skipping)"
        return 0
    fi

    echo "Setting public READ permission for: $collection"

    # Directus 11.x requires policy ID instead of role:null
    docker exec wvwo-directus-dev wget -q -O - \
        --header="Content-Type: application/json" \
        --header="Authorization: Bearer $ACCESS_TOKEN" \
        --post-data="{\"policy\":\"$PUBLIC_POLICY_ID\",\"collection\":\"$collection\",\"action\":\"read\",\"permissions\":$filter,\"fields\":[\"*\"]}" \
        "$DIRECTUS_INTERNAL_URL/permissions" > /dev/null 2>&1 || true
}

echo ""
echo "=== Creating Collections ==="

# 1. Categories collection
create_collection "categories" '{"name":"categories"}' '{"icon":"folder","note":"Product taxonomy - hierarchical"}'
create_field "categories" "name" "string" '{"interface":"input","required":true,"width":"half"}'
create_field "categories" "slug" "string" '{"interface":"input","required":true,"width":"half","options":{"slug":true}}'
create_field "categories" "description" "text" '{"interface":"input-multiline"}'
create_field "categories" "sort_order" "integer" '{"interface":"input","width":"half"}'

# 2. Brands collection
create_collection "brands" '{"name":"brands"}' '{"icon":"local_offer","note":"Product brands/manufacturers"}'
create_field "brands" "name" "string" '{"interface":"input","required":true,"width":"half"}'
create_field "brands" "slug" "string" '{"interface":"input","required":true,"width":"half"}'
create_field "brands" "logo" "uuid" '{"interface":"file-image","special":["file"]}'
create_field "brands" "description" "text" '{"interface":"input-multiline"}'

# 3. Store Info singleton
create_collection "store_info" '{"name":"store_info"}' '{"icon":"store","note":"Store metadata - single record","singleton":true}'
create_field "store_info" "store_name" "string" '{"interface":"input","required":true}'
create_field "store_info" "address_line1" "string" '{"interface":"input","required":true}'
create_field "store_info" "address_line2" "string" '{"interface":"input"}'
create_field "store_info" "city" "string" '{"interface":"input","required":true,"width":"third"}'
create_field "store_info" "state" "string" '{"interface":"input","required":true,"width":"third"}'
create_field "store_info" "postal_code" "string" '{"interface":"input","required":true,"width":"third"}'
create_field "store_info" "phone" "string" '{"interface":"input","required":true,"width":"half"}'
create_field "store_info" "email" "string" '{"interface":"input","width":"half"}'
create_field "store_info" "google_maps_link" "string" '{"interface":"input"}'
create_field "store_info" "hours_weekday" "string" '{"interface":"input","required":true}'
create_field "store_info" "hours_weekend" "string" '{"interface":"input"}'
create_field "store_info" "holiday_hours" "text" '{"interface":"input-multiline"}'
create_field "store_info" "about_short" "text" '{"interface":"input-multiline"}'
create_field "store_info" "flood_story" "text" '{"interface":"input-rich-text-md"}'
create_field "store_info" "facebook_url" "string" '{"interface":"input","width":"half"}'
create_field "store_info" "instagram_url" "string" '{"interface":"input","width":"half"}'

# 4. Homepage Features collection
create_collection "homepage_features" '{"name":"homepage_features"}' '{"icon":"featured_play_list","note":"Hero banners and promotional content"}'
create_field "homepage_features" "title" "string" '{"interface":"input","required":true}'
create_field "homepage_features" "subtitle" "string" '{"interface":"input"}'
create_field "homepage_features" "image" "uuid" '{"interface":"file-image","special":["file"]}'
create_field "homepage_features" "cta_label" "string" '{"interface":"input","width":"half"}'
create_field "homepage_features" "cta_link" "string" '{"interface":"input","width":"half"}'
create_field "homepage_features" "active" "boolean" '{"interface":"boolean","default":true,"width":"half"}'
create_field "homepage_features" "sort_order" "integer" '{"interface":"input","width":"half"}'

# 5. Announcements collection
create_collection "announcements" '{"name":"announcements"}' '{"icon":"campaign","note":"Ticker messages for homepage","sort_field":"sort_order"}'
create_field "announcements" "status" "string" '{"interface":"select-dropdown","options":{"choices":[{"text":"Published","value":"published"},{"text":"Draft","value":"draft"}]},"default":"draft","width":"half"}'
create_field "announcements" "message" "string" '{"interface":"input","required":true,"note":"Keep under 100 chars"}'
create_field "announcements" "type" "string" '{"interface":"select-dropdown","options":{"choices":[{"text":"Info","value":"info"},{"text":"Alert","value":"alert"},{"text":"Promo","value":"promo"}]},"default":"info","width":"half"}'
create_field "announcements" "link" "string" '{"interface":"input","width":"half"}'
create_field "announcements" "start_date" "timestamp" '{"interface":"datetime","width":"half"}'
create_field "announcements" "end_date" "timestamp" '{"interface":"datetime","width":"half"}'
create_field "announcements" "sort_order" "integer" '{"interface":"input","width":"half"}'

# 6. Services collection
create_collection "services" '{"name":"services"}' '{"icon":"build","note":"Store services (FFL transfers, licenses, etc.)","sort_field":"sort_order"}'
create_field "services" "status" "string" '{"interface":"select-dropdown","options":{"choices":[{"text":"Published","value":"published"},{"text":"Draft","value":"draft"}]},"default":"draft","width":"half"}'
create_field "services" "name" "string" '{"interface":"input","required":true,"width":"half"}'
create_field "services" "slug" "string" '{"interface":"input","required":true,"options":{"slug":true},"width":"half"}'
create_field "services" "short_description" "text" '{"interface":"input-multiline","note":"For cards (150 chars max)"}'
create_field "services" "description" "text" '{"interface":"input-rich-text-md"}'
create_field "services" "image" "uuid" '{"interface":"file-image","special":["file"]}'
create_field "services" "price_info" "string" '{"interface":"input","width":"half"}'
create_field "services" "sort_order" "integer" '{"interface":"input","width":"half"}'

# 7. Pages collection
create_collection "pages" '{"name":"pages"}' '{"icon":"article","note":"Custom static pages (About, FAQ, etc.)"}'
create_field "pages" "status" "string" '{"interface":"select-dropdown","options":{"choices":[{"text":"Published","value":"published"},{"text":"Draft","value":"draft"}]},"default":"draft","width":"half"}'
create_field "pages" "title" "string" '{"interface":"input","required":true,"width":"half"}'
create_field "pages" "slug" "string" '{"interface":"input","required":true,"options":{"slug":true},"width":"half"}'
create_field "pages" "content" "text" '{"interface":"input-rich-text-md"}'
create_field "pages" "meta_title" "string" '{"interface":"input","width":"half"}'
create_field "pages" "meta_description" "text" '{"interface":"input-multiline","width":"half"}'

# 8. Products collection (last - depends on categories and brands)
create_collection "products" '{"name":"products"}' '{"icon":"inventory_2","note":"All sellable items"}'
create_field "products" "status" "string" '{"interface":"select-dropdown","options":{"choices":[{"text":"Published","value":"published"},{"text":"Draft","value":"draft"}]},"default":"draft","width":"half"}'
create_field "products" "name" "string" '{"interface":"input","required":true}'
create_field "products" "slug" "string" '{"interface":"input","required":true,"options":{"slug":true}}'
create_field "products" "sku" "string" '{"interface":"input","width":"half"}'
create_field "products" "short_description" "text" '{"interface":"input-multiline"}'
create_field "products" "description" "text" '{"interface":"input-rich-text-md"}'
create_field "products" "price" "decimal" '{"interface":"input","required":true,"width":"half","options":{"min":0}}'
create_field "products" "on_sale" "boolean" '{"interface":"boolean","width":"quarter","default":false}'
create_field "products" "sale_price" "decimal" '{"interface":"input","width":"quarter","options":{"min":0}}'
create_field "products" "stripe_payment_link" "string" '{"interface":"input"}'
create_field "products" "image_main" "uuid" '{"interface":"file-image","special":["file"]}'
create_field "products" "is_featured" "boolean" '{"interface":"boolean","width":"quarter","default":false}'
create_field "products" "just_arrived" "boolean" '{"interface":"boolean","width":"quarter","default":false}'
create_field "products" "inventory_quantity" "integer" '{"interface":"input","width":"third","default":0}'
create_field "products" "low_stock_threshold" "integer" '{"interface":"input","width":"third","default":5}'
create_field "products" "location_in_store" "string" '{"interface":"input","width":"third"}'
create_field "products" "discontinued" "boolean" '{"interface":"boolean","default":false}'

# Add parent field to categories (self-reference) - use create_field for idempotency
if ! field_exists "categories" "parent"; then
    echo "Adding parent field to categories..."
    docker exec wvwo-directus-dev wget -q -O - \
        --header="Content-Type: application/json" \
        --header="Authorization: Bearer $ACCESS_TOKEN" \
        --post-data='{"field":"parent","type":"integer","meta":{"interface":"select-dropdown-m2o","special":["m2o"],"options":{"template":"{{name}}"}}}' \
        "$DIRECTUS_INTERNAL_URL/fields/categories" > /dev/null 2>&1 || true
else
    echo "  Field already exists: parent (skipping)"
fi

# Add category relationship to products
if ! field_exists "products" "category"; then
    echo "Adding category relationship to products..."
    docker exec wvwo-directus-dev wget -q -O - \
        --header="Content-Type: application/json" \
        --header="Authorization: Bearer $ACCESS_TOKEN" \
        --post-data='{"field":"category","type":"integer","meta":{"interface":"select-dropdown-m2o","special":["m2o"],"required":true,"options":{"template":"{{name}}"}}}' \
        "$DIRECTUS_INTERNAL_URL/fields/products" > /dev/null 2>&1 || true
else
    echo "  Field already exists: category (skipping)"
fi

# Add brand relationship to products
if ! field_exists "products" "brand"; then
    echo "Adding brand relationship to products..."
    docker exec wvwo-directus-dev wget -q -O - \
        --header="Content-Type: application/json" \
        --header="Authorization: Bearer $ACCESS_TOKEN" \
        --post-data='{"field":"brand","type":"integer","meta":{"interface":"select-dropdown-m2o","special":["m2o"],"options":{"template":"{{name}}"}}}' \
        "$DIRECTUS_INTERNAL_URL/fields/products" > /dev/null 2>&1 || true
else
    echo "  Field already exists: brand (skipping)"
fi

# Create relations (idempotent - Directus ignores duplicates)
echo ""
echo "=== Creating Relations ==="

docker exec wvwo-directus-dev wget -q -O - \
    --header="Content-Type: application/json" \
    --header="Authorization: Bearer $ACCESS_TOKEN" \
    --post-data='{"collection":"categories","field":"parent","related_collection":"categories"}' \
    "$DIRECTUS_INTERNAL_URL/relations" > /dev/null 2>&1 || true

docker exec wvwo-directus-dev wget -q -O - \
    --header="Content-Type: application/json" \
    --header="Authorization: Bearer $ACCESS_TOKEN" \
    --post-data='{"collection":"products","field":"category","related_collection":"categories"}' \
    "$DIRECTUS_INTERNAL_URL/relations" > /dev/null 2>&1 || true

docker exec wvwo-directus-dev wget -q -O - \
    --header="Content-Type: application/json" \
    --header="Authorization: Bearer $ACCESS_TOKEN" \
    --post-data='{"collection":"products","field":"brand","related_collection":"brands"}' \
    "$DIRECTUS_INTERNAL_URL/relations" > /dev/null 2>&1 || true

echo ""
echo "=== Configuring Public Role Permissions ==="

# Get Public policy ID (Directus 11.x)
echo "Looking up Public policy ID..."
PUBLIC_POLICY_ID=$(get_public_policy_id)
if [ -z "$PUBLIC_POLICY_ID" ]; then
    echo "ERROR: Could not find Public policy. Permissions will not be set."
    exit 1
fi
echo "✓ Found Public policy: $PUBLIC_POLICY_ID"

# Set public permissions for each collection
set_public_permission "categories"
set_public_permission "brands"
set_public_permission "store_info"
set_public_permission "homepage_features" '{"active":{"_eq":true}}'
set_public_permission "announcements" '{"status":{"_eq":"published"}}'
set_public_permission "services" '{"status":{"_eq":"published"}}'
set_public_permission "pages" '{"status":{"_eq":"published"}}'
set_public_permission "products" '{"status":{"_eq":"published"}}'
set_public_permission "directus_files"

echo ""
echo "=== Schema Setup Complete ==="
echo "Collections created: categories, brands, store_info, homepage_features, announcements, services, pages, products"
echo "Public permissions configured for all collections"
echo ""
echo "Next steps:"
echo "1. Load seed data: ./scripts/directus-seed-data.sh"
echo "2. Verify in Directus Admin: $DIRECTUS_URL/admin"