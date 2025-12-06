# Directus API Contract

**Feature**: 002-directus-cms-setup | **Date**: 2025-12-05
**Base URL**: `http://localhost:8055` (dev) | `https://admin.wvwildoutdoors.com` (prod)

## Overview

This document defines the public (unauthenticated) API endpoints exposed by Directus for the Astro frontend to consume. All endpoints follow Directus REST API conventions.

## Authentication

| Context | Method |
|---------|--------|
| Public reads | No authentication required |
| Admin operations | Bearer token via `/auth/login` |

---

## Public Endpoints

### Products

#### List Published Products

```http
GET /items/products?filter[status][_eq]=published&fields=id,name,slug,short_description,price,on_sale,sale_price,image_main,category.name,category.slug,brand.name,is_featured,just_arrived
```

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": 1,
      "name": "Appalachian Hunter's Pack",
      "slug": "appalachian-hunters-pack",
      "short_description": "Everything you need for a day in the WV wilderness",
      "price": 149.99,
      "on_sale": false,
      "sale_price": null,
      "image_main": "a1b2c3d4-uuid",
      "category": {
        "name": "Hunting",
        "slug": "hunting"
      },
      "brand": {
        "name": "Mountain State Gear"
      },
      "is_featured": true,
      "just_arrived": false
    }
  ]
}
```

#### Get Single Product

```http
GET /items/products/:id?fields=*,category.*,brand.*
```

**Response** (200 OK):
```json
{
  "data": {
    "id": 1,
    "status": "published",
    "name": "Appalachian Hunter's Pack",
    "slug": "appalachian-hunters-pack",
    "sku": "WVWO-HUNT-001",
    "category": { "id": 1, "name": "Hunting", "slug": "hunting" },
    "brand": { "id": 1, "name": "Mountain State Gear", "slug": "mountain-state-gear" },
    "short_description": "Everything you need for a day in the WV wilderness",
    "description": "Full markdown description...",
    "price": 149.99,
    "on_sale": false,
    "sale_price": null,
    "stripe_payment_link": null,
    "image_main": "a1b2c3d4-uuid",
    "is_featured": true,
    "just_arrived": false,
    "inventory_quantity": 12,
    "low_stock_threshold": 5,
    "location_in_store": "Rack 3",
    "discontinued": false
  }
}
```

#### Get Featured Products

```http
GET /items/products?filter[status][_eq]=published&filter[is_featured][_eq]=true&fields=id,name,slug,short_description,price,image_main
```

#### Get New Arrivals

```http
GET /items/products?filter[status][_eq]=published&filter[just_arrived][_eq]=true&fields=id,name,slug,short_description,price,image_main
```

---

### Categories

#### List All Categories

```http
GET /items/categories?fields=id,name,slug,description,parent,sort_order&sort=sort_order
```

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": 1,
      "name": "Hunting",
      "slug": "hunting",
      "description": "Hunting gear and accessories",
      "parent": null,
      "sort_order": 1
    },
    {
      "id": 2,
      "name": "Rifles",
      "slug": "rifles",
      "description": "Hunting rifles",
      "parent": 1,
      "sort_order": 1
    }
  ]
}
```

#### Get Category with Products

```http
GET /items/categories/:id?fields=*
GET /items/products?filter[status][_eq]=published&filter[category][_eq]=:id&fields=id,name,slug,price,image_main
```

---

### Brands

#### List All Brands

```http
GET /items/brands?fields=id,name,slug,logo&sort=name
```

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": 1,
      "name": "Remington",
      "slug": "remington",
      "logo": "uuid-or-null"
    }
  ]
}
```

---

### Store Info (Singleton)

#### Get Store Information

```http
GET /items/store_info
```

**Response** (200 OK):
```json
{
  "data": {
    "id": 1,
    "store_name": "WV Wild Outdoors",
    "address_line1": "123 Main Street",
    "address_line2": null,
    "city": "Birch River",
    "state": "WV",
    "postal_code": "26610",
    "phone": "(304) 555-1234",
    "email": "info@wvwildoutdoors.com",
    "google_maps_link": "https://maps.google.com/...",
    "hours_weekday": "Mon-Sat: 10am-5pm",
    "hours_weekend": "Sun: Closed",
    "holiday_hours": "Closed Thanksgiving & Christmas",
    "about_short": "Your local outdoor adventure headquarters since 2016",
    "flood_story": "# Our Story\n\nIn 2016, the floods came...",
    "facebook_url": "https://facebook.com/wvwildoutdoors",
    "instagram_url": null
  }
}
```

---

### Announcements

#### List Active Announcements

```http
GET /items/announcements?filter[status][_eq]=published&filter[start_date][_lte]=$NOW&filter[end_date][_gte]=$NOW&sort=sort_order&fields=id,message,type,link
```

**Note**: `$NOW` is a Directus dynamic variable for current timestamp.

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": 1,
      "message": "Live bait in stock!",
      "type": "info",
      "link": "/products?category=fishing"
    },
    {
      "id": 2,
      "message": "Buck season opens Monday",
      "type": "alert",
      "link": null
    }
  ]
}
```

---

### Services

#### List Published Services

```http
GET /items/services?filter[status][_eq]=published&sort=sort_order&fields=id,name,slug,short_description,price_info,image
```

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": 1,
      "name": "FFL Transfers",
      "slug": "ffl-transfers",
      "short_description": "Licensed firearm transfers from online dealers",
      "price_info": "$25 per transfer",
      "image": "uuid-or-null"
    }
  ]
}
```

#### Get Single Service

```http
GET /items/services/:id?fields=*
```

---

### Homepage Features

#### List Active Features

```http
GET /items/homepage_features?filter[active][_eq]=true&sort=sort_order&fields=id,title,subtitle,image,cta_label,cta_link
```

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": 1,
      "title": "Buck Season 2025",
      "subtitle": "Get ready for opening day",
      "image": "uuid",
      "cta_label": "Shop Hunting Gear",
      "cta_link": "/products?category=hunting"
    }
  ]
}
```

---

### Pages

#### List Published Pages

```http
GET /items/pages?filter[status][_eq]=published&fields=id,title,slug,meta_title,meta_description
```

#### Get Single Page

```http
GET /items/pages/:slug?filter[status][_eq]=published&fields=*
```

---

### Files/Assets

#### Get File URL

```http
GET /assets/:file_id
GET /assets/:file_id?width=400&height=300&fit=cover  # Transformed
```

**Transformation Options**:
| Parameter | Description |
|-----------|-------------|
| width | Target width in pixels |
| height | Target height in pixels |
| fit | cover, contain, inside, outside |
| quality | 1-100 for lossy formats |
| format | webp, jpg, png, avif |

---

## Error Responses

### 400 Bad Request
```json
{
  "errors": [
    {
      "message": "Invalid query parameters",
      "extensions": { "code": "INVALID_QUERY" }
    }
  ]
}
```

### 403 Forbidden
```json
{
  "errors": [
    {
      "message": "You don't have permission to access this",
      "extensions": { "code": "FORBIDDEN" }
    }
  ]
}
```

### 404 Not Found
```json
{
  "errors": [
    {
      "message": "Item not found",
      "extensions": { "code": "RECORD_NOT_UNIQUE" }
    }
  ]
}
```

---

## Rate Limiting

- No rate limiting configured for local development
- Production: Consider Cloudflare/Traefik rate limiting

---

## CORS Configuration

Configured in Directus environment:
```yaml
CORS_ENABLED: "true"
CORS_ORIGIN: "http://localhost:3000"  # Astro dev server
```

Production will include `https://wvwildoutdoors.com`.
