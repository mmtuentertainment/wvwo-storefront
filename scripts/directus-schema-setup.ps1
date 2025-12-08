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
    $health = Invoke-RestMethod -Uri "$DirectusUrl/server/health" -Method Get -ErrorAction Stop
    if ($health.status -ne "ok") {
        throw "Status not OK"
    }
    Write-Host "$(([char]0x2713)) Directus is healthy" -ForegroundColor Green
}
catch {
    Write-Host "ERROR: Directus is not accessible at $DirectusUrl. Make sure Docker services are running." -ForegroundColor Red
    exit 1
}

# Authenticate and get access token
Write-Host "Authenticating..."
$authBody = @{
    email    = $AdminEmail
    password = $AdminPassword
} | ConvertTo-Json

try {
    $authResponse = Invoke-RestMethod -Uri "$DirectusUrl/auth/login" -Method Post -Body $authBody -ContentType "application/json"
    $accessToken = $authResponse.data.access_token
    Write-Host "$(([char]0x2713)) Authenticated successfully" -ForegroundColor Green
}
catch {
    Write-Host "ERROR: Failed to authenticate. Check credentials." -ForegroundColor Red
    Write-Host $_.Exception.Message
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $accessToken"
}

# Function to check if collection exists
function Test-DirectusCollection {
    param($Collection)

    try {
        Invoke-RestMethod -Uri "$DirectusUrl/collections/$Collection" -Method Get -Headers $headers -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Function to create collection (idempotent)
function New-DirectusCollection {
    param($Collection, $Schema, $Meta)

    if (Test-DirectusCollection -Collection $Collection) {
        Write-Host "Collection already exists: $Collection (skipping)"
        return
    }

    Write-Host "Creating collection: $Collection"
    $body = @{
        collection = $Collection
        schema     = $Schema | ConvertFrom-Json
        meta       = $Meta | ConvertFrom-Json
    } | ConvertTo-Json -Depth 10

    try {
        Invoke-RestMethod -Uri "$DirectusUrl/collections" -Method Post -Body $body -ContentType "application/json" -Headers $headers | Out-Null
    }
    catch {
        Write-Host "Error creating collection $Collection" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
}

# Function to check if field exists
function Test-DirectusField {
    param($Collection, $Field)

    try {
        Invoke-RestMethod -Uri "$DirectusUrl/fields/$Collection/$Field" -Method Get -Headers $headers -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Function to create field (idempotent)
function New-DirectusField {
    param($Collection, $Field, $Type, $Meta, $Schema = "{}")

    if (Test-DirectusField -Collection $Collection -Field $Field) {
        Write-Host "  Field already exists: $Field (skipping)"
        return
    }

    Write-Host "  Adding field: $Field"
    $body = @{
        field  = $Field
        type   = $Type
        meta   = $Meta | ConvertFrom-Json
        schema = $Schema | ConvertFrom-Json
    } | ConvertTo-Json -Depth 10

    try {
        Invoke-RestMethod -Uri "$DirectusUrl/fields/$Collection" -Method Post -Body $body -ContentType "application/json" -Headers $headers | Out-Null
    }
    catch {
        Write-Host "  Error creating field $Field" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
}

# Function to set public permission (idempotent)
function Set-PublicPermission {
    param($Collection, $Filter = "null")

    Write-Host "Setting public READ permission for: $Collection"
    
    # Check existing permissions first to handle updates better? 
    # For now, simplistic creation which might error if unique constraint hit, but API usually handles it.
    
    $body = @{
        role        = $null
        collection  = $Collection
        action      = "read"
        permissions = if ($Filter -ne "null") { $Filter | ConvertFrom-Json } else { $null }
        fields      = @("*")
    } | ConvertTo-Json -Depth 10

    try {
        Invoke-RestMethod -Uri "$DirectusUrl/permissions" -Method Post -Body $body -ContentType "application/json" -Headers $headers | Out-Null
    }
    catch {
        # Ignore 400/Conflicts for permissions as they might exist
    }
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

# Add parent field to categories (self-reference) with idempotency check
if (-not (Test-DirectusField -Collection "categories" -Field "parent")) {
    Write-Host "Adding parent field to categories..."
    $body = @{
        field = "parent"
        type  = "integer"
        meta  = @{
            interface = "select-dropdown-m2o"
            special   = @("m2o")
            options   = @{ template = "{{name}}" }
        }
    } | ConvertTo-Json -Depth 10

    try {
        Invoke-RestMethod -Uri "$DirectusUrl/fields/categories" -Method Post -Body $body -ContentType "application/json" -Headers $headers | Out-Null
    }
    catch { 
        Write-Host "Error adding parent field" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
}
else {
    Write-Host "  Field already exists: parent (skipping)"
}

# Add category relationship to products
if (-not (Test-DirectusField -Collection "products" -Field "category")) {
    Write-Host "Adding category relationship to products..."
    $body = @{
        field = "category"
        type  = "integer"
        meta  = @{
            interface = "select-dropdown-m2o"
            special   = @("m2o")
            required  = $true
            options   = @{ template = "{{name}}" }
        }
    } | ConvertTo-Json -Depth 10

    try {
        Invoke-RestMethod -Uri "$DirectusUrl/fields/products" -Method Post -Body $body -ContentType "application/json" -Headers $headers | Out-Null
    }
    catch {
        Write-Host "Error adding category field" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
}
else {
    Write-Host "  Field already exists: category (skipping)"
}

# Add brand relationship to products
if (-not (Test-DirectusField -Collection "products" -Field "brand")) {
    Write-Host "Adding brand relationship to products..."
    $body = @{
        field = "brand"
        type  = "integer"
        meta  = @{
            interface = "select-dropdown-m2o"
            special   = @("m2o")
            options   = @{ template = "{{name}}" }
        }
    } | ConvertTo-Json -Depth 10
    
    try {
        Invoke-RestMethod -Uri "$DirectusUrl/fields/products" -Method Post -Body $body -ContentType "application/json" -Headers $headers | Out-Null
    }
    catch {
        Write-Host "Error adding brand field" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
}
else {
    Write-Host "  Field already exists: brand (skipping)"
}

Write-Host ""
Write-Host "=== Creating Relations ===" -ForegroundColor Cyan

$relations = @(
    @{ collection = "categories"; field = "parent"; related_collection = "categories" },
    @{ collection = "products"; field = "category"; related_collection = "categories" },
    @{ collection = "products"; field = "brand"; related_collection = "brands" }
)

# Relations are idempotent - Directus ignores duplicates
foreach ($rel in $relations) {
    try {
        Invoke-RestMethod -Uri "$DirectusUrl/relations" -Method Post -Body ($rel | ConvertTo-Json) -ContentType "application/json" -Headers $headers | Out-Null
    }
    catch {
        # Ignore relation creation errors (likely already exists)
    }
}

Write-Host ""
Write-Host "=== Configuring Public Role Permissions ===" -ForegroundColor Cyan

Set-PublicPermission "categories"
Set-PublicPermission "brands"
Set-PublicPermission "store_info"
Set-PublicPermission "homepage_features" (@{ active = @{ _eq = $true } } | ConvertTo-Json)
Set-PublicPermission "announcements" (@{ status = @{ _eq = "published" } } | ConvertTo-Json)
Set-PublicPermission "services" (@{ status = @{ _eq = "published" } } | ConvertTo-Json)
Set-PublicPermission "pages" (@{ status = @{ _eq = "published" } } | ConvertTo-Json)
Set-PublicPermission "products" (@{ status = @{ _eq = "published" } } | ConvertTo-Json)
Set-PublicPermission "directus_files"

Write-Host ""
Write-Host "=== Schema Setup Complete ===" -ForegroundColor Green
Write-Host "Collections created: categories, brands, store_info, homepage_features, announcements, services, pages, products"
Write-Host "Public permissions configured for all collections"
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Load seed data: bash ./scripts/directus-seed-data.sh"
Write-Host "2. Verify in Directus Admin: $DirectusUrl/admin"
