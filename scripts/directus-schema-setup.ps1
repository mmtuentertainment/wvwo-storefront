<#
.SYNOPSIS
    Directus Schema Setup Script
.DESCRIPTION
    Feature: 002-directus-cms-setup
    Purpose: Create all 8 collections and configure public permissions
.EXAMPLE
    .\scripts\directus-schema-setup.ps1
#>

param(
    [string]$DirectusUrl = "http://localhost:8055",
    [string]$AdminEmail = "admin@localhost.dev",
    [string]$AdminPassword = "admin123"
)

$ErrorActionPreference = "Stop"

Write-Host "=== Directus Schema Setup ===" -ForegroundColor Cyan
Write-Host "URL: $DirectusUrl"
Write-Host ""

# Check if Directus is accessible
Write-Host "Checking Directus health..."
try {
    $health = docker exec wvwo-directus-dev wget -q -O - http://127.0.0.1:8055/server/health 2>$null
    if (-not $health) {
        throw "Empty response"
    }
    Write-Host "$(([char]0x2713)) Directus is healthy" -ForegroundColor Green
}
catch {
    Write-Host "ERROR: Directus is not accessible. Make sure Docker services are running." -ForegroundColor Red
    exit 1
}

# Authenticate and get access token
Write-Host "Authenticating..."
$authBody = "{`"email`":`"$AdminEmail`",`"password`":`"$AdminPassword`"}"
$authResponse = docker exec wvwo-directus-dev wget -q -O - `
    --header="Content-Type: application/json" `
    --post-data="$authBody" `
    "http://127.0.0.1:8055/auth/login" 2>$null

if ($authResponse -match '"access_token":"([^"]+)"') {
    $accessToken = $matches[1]
    Write-Host "$(([char]0x2713)) Authenticated successfully" -ForegroundColor Green
}
else {
    Write-Host "ERROR: Failed to authenticate. Check credentials." -ForegroundColor Red
    Write-Host "Response: $authResponse"
    exit 1
}

# Function to create collection
function New-DirectusCollection {
    param($Collection, $Schema, $Meta)

    Write-Host "Creating collection: $Collection"
    $body = "{`"collection`":`"$Collection`",`"schema`":$Schema,`"meta`":$Meta}"
    docker exec wvwo-directus-dev wget -q -O - `
        --header="Content-Type: application/json" `
        --header="Authorization: Bearer $accessToken" `
        --post-data="$body" `
        "http://127.0.0.1:8055/collections" 2>$null | Out-Null
}

# Function to create field
function New-DirectusField {
    param($Collection, $Field, $Type, $Meta, $Schema = "{}")

    Write-Host "  Adding field: $Field"
    $body = "{`"field`":`"$Field`",`"type`":`"$Type`",`"meta`":$Meta,`"schema`":$Schema}"
    docker exec wvwo-directus-dev wget -q -O - `
        --header="Content-Type: application/json" `
        --header="Authorization: Bearer $accessToken" `
        --post-data="$body" `
        "http://127.0.0.1:8055/fields/$Collection" 2>$null | Out-Null
}

# Function to set public permission
function Set-PublicPermission {
    param($Collection, $Filter = "null")

    Write-Host "Setting public READ permission for: $Collection"
    $body = "{`"role`":null,`"collection`":`"$Collection`",`"action`":`"read`",`"permissions`":$Filter,`"fields`":[`"*`"]}"
    docker exec wvwo-directus-dev wget -q -O - `
        --header="Content-Type: application/json" `
        --header="Authorization: Bearer $accessToken" `
        --post-data="$body" `
        "http://127.0.0.1:8055/permissions" 2>$null | Out-Null
}

Write-Host ""
Write-Host "=== Creating Collections ===" -ForegroundColor Cyan

# 1. Categories collection
New-DirectusCollection "categories" '{"name":"categories"}' '{"icon":"folder","note":"Product taxonomy - hierarchical"}'
New-DirectusField "categories" "name" "string" '{"interface":"input","required":true,"width":"half"}'
New-DirectusField "categories" "slug" "string" '{"interface":"input","required":true,"width":"half","options":{"slug":true}}'
New-DirectusField "categories" "description" "text" '{"interface":"input-multiline"}'
New-DirectusField "categories" "sort_order" "integer" '{"interface":"input","width":"half"}'

# 2. Brands collection
New-DirectusCollection "brands" '{"name":"brands"}' '{"icon":"local_offer","note":"Product brands/manufacturers"}'
New-DirectusField "brands" "name" "string" '{"interface":"input","required":true,"width":"half"}'
New-DirectusField "brands" "slug" "string" '{"interface":"input","required":true,"width":"half"}'
New-DirectusField "brands" "logo" "uuid" '{"interface":"file-image","special":["file"]}'
New-DirectusField "brands" "description" "text" '{"interface":"input-multiline"}'

# 3. Store Info singleton
New-DirectusCollection "store_info" '{"name":"store_info"}' '{"icon":"store","note":"Store metadata - single record","singleton":true}'
New-DirectusField "store_info" "store_name" "string" '{"interface":"input","required":true}'
New-DirectusField "store_info" "address_line1" "string" '{"interface":"input","required":true}'
New-DirectusField "store_info" "address_line2" "string" '{"interface":"input"}'
New-DirectusField "store_info" "city" "string" '{"interface":"input","required":true,"width":"third"}'
New-DirectusField "store_info" "state" "string" '{"interface":"input","required":true,"width":"third"}'
New-DirectusField "store_info" "postal_code" "string" '{"interface":"input","required":true,"width":"third"}'
New-DirectusField "store_info" "phone" "string" '{"interface":"input","required":true,"width":"half"}'
New-DirectusField "store_info" "email" "string" '{"interface":"input","width":"half"}'
New-DirectusField "store_info" "google_maps_link" "string" '{"interface":"input"}'
New-DirectusField "store_info" "hours_weekday" "string" '{"interface":"input","required":true}'
New-DirectusField "store_info" "hours_weekend" "string" '{"interface":"input"}'
New-DirectusField "store_info" "holiday_hours" "text" '{"interface":"input-multiline"}'
New-DirectusField "store_info" "about_short" "text" '{"interface":"input-multiline"}'
New-DirectusField "store_info" "flood_story" "text" '{"interface":"input-rich-text-md"}'
New-DirectusField "store_info" "facebook_url" "string" '{"interface":"input","width":"half"}'
New-DirectusField "store_info" "instagram_url" "string" '{"interface":"input","width":"half"}'

# 4. Homepage Features collection
New-DirectusCollection "homepage_features" '{"name":"homepage_features"}' '{"icon":"featured_play_list","note":"Hero banners and promotional content"}'
New-DirectusField "homepage_features" "title" "string" '{"interface":"input","required":true}'
New-DirectusField "homepage_features" "subtitle" "string" '{"interface":"input"}'
New-DirectusField "homepage_features" "image" "uuid" '{"interface":"file-image","special":["file"]}'
New-DirectusField "homepage_features" "cta_label" "string" '{"interface":"input","width":"half"}'
New-DirectusField "homepage_features" "cta_link" "string" '{"interface":"input","width":"half"}'
New-DirectusField "homepage_features" "active" "boolean" '{"interface":"boolean","default":true,"width":"half"}'
New-DirectusField "homepage_features" "sort_order" "integer" '{"interface":"input","width":"half"}'

# 5. Announcements collection
New-DirectusCollection "announcements" '{"name":"announcements"}' '{"icon":"campaign","note":"Ticker messages for homepage","sort_field":"sort_order"}'
New-DirectusField "announcements" "status" "string" '{"interface":"select-dropdown","options":{"choices":[{"text":"Published","value":"published"},{"text":"Draft","value":"draft"}]},"default":"draft","width":"half"}'
New-DirectusField "announcements" "message" "string" '{"interface":"input","required":true,"note":"Keep under 100 chars"}'
New-DirectusField "announcements" "type" "string" '{"interface":"select-dropdown","options":{"choices":[{"text":"Info","value":"info"},{"text":"Alert","value":"alert"},{"text":"Promo","value":"promo"}]},"default":"info","width":"half"}'
New-DirectusField "announcements" "link" "string" '{"interface":"input","width":"half"}'
New-DirectusField "announcements" "start_date" "timestamp" '{"interface":"datetime","width":"half"}'
New-DirectusField "announcements" "end_date" "timestamp" '{"interface":"datetime","width":"half"}'
New-DirectusField "announcements" "sort_order" "integer" '{"interface":"input","width":"half"}'

# 6. Services collection
New-DirectusCollection "services" '{"name":"services"}' '{"icon":"build","note":"Store services (FFL transfers, licenses, etc.)","sort_field":"sort_order"}'
New-DirectusField "services" "status" "string" '{"interface":"select-dropdown","options":{"choices":[{"text":"Published","value":"published"},{"text":"Draft","value":"draft"}]},"default":"draft","width":"half"}'
New-DirectusField "services" "name" "string" '{"interface":"input","required":true,"width":"half"}'
New-DirectusField "services" "slug" "string" '{"interface":"input","required":true,"options":{"slug":true},"width":"half"}'
New-DirectusField "services" "short_description" "text" '{"interface":"input-multiline","note":"For cards (150 chars max)"}'
New-DirectusField "services" "description" "text" '{"interface":"input-rich-text-md"}'
New-DirectusField "services" "image" "uuid" '{"interface":"file-image","special":["file"]}'
New-DirectusField "services" "price_info" "string" '{"interface":"input","width":"half"}'
New-DirectusField "services" "sort_order" "integer" '{"interface":"input","width":"half"}'

# 7. Pages collection
New-DirectusCollection "pages" '{"name":"pages"}' '{"icon":"article","note":"Custom static pages (About, FAQ, etc.)"}'
New-DirectusField "pages" "status" "string" '{"interface":"select-dropdown","options":{"choices":[{"text":"Published","value":"published"},{"text":"Draft","value":"draft"}]},"default":"draft","width":"half"}'
New-DirectusField "pages" "title" "string" '{"interface":"input","required":true,"width":"half"}'
New-DirectusField "pages" "slug" "string" '{"interface":"input","required":true,"options":{"slug":true},"width":"half"}'
New-DirectusField "pages" "content" "text" '{"interface":"input-rich-text-md"}'
New-DirectusField "pages" "meta_title" "string" '{"interface":"input","width":"half"}'
New-DirectusField "pages" "meta_description" "text" '{"interface":"input-multiline","width":"half"}'

# 8. Products collection (last - depends on categories and brands)
New-DirectusCollection "products" '{"name":"products"}' '{"icon":"inventory_2","note":"All sellable items"}'
New-DirectusField "products" "status" "string" '{"interface":"select-dropdown","options":{"choices":[{"text":"Published","value":"published"},{"text":"Draft","value":"draft"}]},"default":"draft","width":"half"}'
New-DirectusField "products" "name" "string" '{"interface":"input","required":true}'
New-DirectusField "products" "slug" "string" '{"interface":"input","required":true,"options":{"slug":true}}'
New-DirectusField "products" "sku" "string" '{"interface":"input","width":"half"}'
New-DirectusField "products" "short_description" "text" '{"interface":"input-multiline"}'
New-DirectusField "products" "description" "text" '{"interface":"input-rich-text-md"}'
New-DirectusField "products" "price" "decimal" '{"interface":"input","required":true,"width":"half","options":{"min":0}}'
New-DirectusField "products" "on_sale" "boolean" '{"interface":"boolean","width":"quarter","default":false}'
New-DirectusField "products" "sale_price" "decimal" '{"interface":"input","width":"quarter","options":{"min":0}}'
New-DirectusField "products" "stripe_payment_link" "string" '{"interface":"input"}'
New-DirectusField "products" "image_main" "uuid" '{"interface":"file-image","special":["file"]}'
New-DirectusField "products" "is_featured" "boolean" '{"interface":"boolean","width":"quarter","default":false}'
New-DirectusField "products" "just_arrived" "boolean" '{"interface":"boolean","width":"quarter","default":false}'
New-DirectusField "products" "inventory_quantity" "integer" '{"interface":"input","width":"third","default":0}'
New-DirectusField "products" "low_stock_threshold" "integer" '{"interface":"input","width":"third","default":5}'
New-DirectusField "products" "location_in_store" "string" '{"interface":"input","width":"third"}'
New-DirectusField "products" "discontinued" "boolean" '{"interface":"boolean","default":false}'

# Add parent field to categories (self-reference)
Write-Host "Adding parent field to categories..."
$body = '{"field":"parent","type":"integer","meta":{"interface":"select-dropdown-m2o","special":["m2o"],"options":{"template":"{{name}}"}}}'
docker exec wvwo-directus-dev wget -q -O - `
    --header="Content-Type: application/json" `
    --header="Authorization: Bearer $accessToken" `
    --post-data="$body" `
    "http://127.0.0.1:8055/fields/categories" 2>$null | Out-Null

# Add category relationship to products
Write-Host "Adding category relationship to products..."
$body = '{"field":"category","type":"integer","meta":{"interface":"select-dropdown-m2o","special":["m2o"],"required":true,"options":{"template":"{{name}}"}}}'
docker exec wvwo-directus-dev wget -q -O - `
    --header="Content-Type: application/json" `
    --header="Authorization: Bearer $accessToken" `
    --post-data="$body" `
    "http://127.0.0.1:8055/fields/products" 2>$null | Out-Null

# Add brand relationship to products
Write-Host "Adding brand relationship to products..."
$body = '{"field":"brand","type":"integer","meta":{"interface":"select-dropdown-m2o","special":["m2o"],"options":{"template":"{{name}}"}}}'
docker exec wvwo-directus-dev wget -q -O - `
    --header="Content-Type: application/json" `
    --header="Authorization: Bearer $accessToken" `
    --post-data="$body" `
    "http://127.0.0.1:8055/fields/products" 2>$null | Out-Null

Write-Host ""
Write-Host "=== Creating Relations ===" -ForegroundColor Cyan

$relations = @(
    '{"collection":"categories","field":"parent","related_collection":"categories"}',
    '{"collection":"products","field":"category","related_collection":"categories"}',
    '{"collection":"products","field":"brand","related_collection":"brands"}'
)

foreach ($rel in $relations) {
    docker exec wvwo-directus-dev wget -q -O - `
        --header="Content-Type: application/json" `
        --header="Authorization: Bearer $accessToken" `
        --post-data="$rel" `
        "http://127.0.0.1:8055/relations" 2>$null | Out-Null
}

Write-Host ""
Write-Host "=== Configuring Public Role Permissions ===" -ForegroundColor Cyan

Set-PublicPermission "categories"
Set-PublicPermission "brands"
Set-PublicPermission "store_info"
Set-PublicPermission "homepage_features" '{"active":{"_eq":true}}'
Set-PublicPermission "announcements" '{"status":{"_eq":"published"}}'
Set-PublicPermission "services" '{"status":{"_eq":"published"}}'
Set-PublicPermission "pages" '{"status":{"_eq":"published"}}'
Set-PublicPermission "products" '{"status":{"_eq":"published"}}'
Set-PublicPermission "directus_files"

Write-Host ""
Write-Host "=== Schema Setup Complete ===" -ForegroundColor Green
Write-Host "Collections created: categories, brands, store_info, homepage_features, announcements, services, pages, products"
Write-Host "Public permissions configured for all collections"
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Load seed data: .\scripts\directus-seed.ps1"
Write-Host "2. Verify in Directus Admin: http://localhost:8055/admin"
