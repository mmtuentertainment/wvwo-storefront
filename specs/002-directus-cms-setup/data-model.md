# Data Model: Directus CMS Setup

**Feature**: 002-directus-cms-setup | **Date**: 2025-12-05
**Source**: `directus-schema/schema.json`

## Entity Relationship Diagram

```
┌─────────────┐     ┌─────────────┐
│  categories │◄────┤  products   │
│  (parent)   │     │             │
└──────┬──────┘     └──────┬──────┘
       │                   │
       │ self-ref          │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│  categories │     │   brands    │
└─────────────┘     └─────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ store_info  │     │announcements│     │  services   │
│ (singleton) │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘

┌─────────────┐     ┌─────────────┐
│   pages     │     │homepage_    │
│             │     │features     │
└─────────────┘     └─────────────┘
```

---

## Collections

### 1. categories

**Purpose**: Hierarchical product taxonomy (e.g., Firearms > Rifles)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | integer | auto | Primary key |
| name | string | YES | Display name |
| slug | string | YES | URL-friendly identifier, auto-generated |
| parent | integer | no | FK to categories (self-reference) |
| description | text | no | Category description |
| sort_order | integer | no | Manual ordering |

**Relationships**:
- `parent` → categories (M2O self-reference for hierarchy)
- Referenced by: products.category

**Validation Rules**:
- `slug` must be unique within collection
- `name` max 100 characters

---

### 2. brands

**Purpose**: Product manufacturers/brands (e.g., Remington, Vortex)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | integer | auto | Primary key |
| name | string | YES | Brand name |
| slug | string | YES | URL-friendly identifier |
| logo | uuid | no | FK to directus_files |
| description | text | no | Brand description |

**Relationships**:
- `logo` → directus_files (file reference)
- Referenced by: products.brand

**Validation Rules**:
- `slug` must be unique within collection

---

### 3. products

**Purpose**: Sellable items with pricing, inventory, and categorization

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | integer | auto | Primary key |
| status | string | no | 'draft' (default) or 'published' |
| name | string | YES | Product name |
| slug | string | YES | URL-friendly identifier |
| sku | string | no | Stock keeping unit |
| category | integer | YES | FK to categories |
| brand | integer | no | FK to brands |
| short_description | text | no | 1-2 sentences for cards |
| description | text | no | Full markdown description |
| price | decimal | YES | Base price (min: 0) |
| on_sale | boolean | no | Sale flag (default: false) |
| sale_price | decimal | no | Discounted price |
| stripe_payment_link | string | no | External payment URL |
| image_main | uuid | no | FK to directus_files |
| is_featured | boolean | no | Homepage feature flag |
| just_arrived | boolean | no | New arrival flag |
| inventory_quantity | integer | no | Stock count (default: 0) |
| low_stock_threshold | integer | no | Alert threshold (default: 5) |
| location_in_store | string | no | Physical location note |
| discontinued | boolean | no | End-of-life flag |

**Relationships**:
- `category` → categories (M2O, required)
- `brand` → brands (M2O, optional)
- `image_main` → directus_files (file reference)

**Validation Rules**:
- `slug` must be unique within collection
- `price` must be >= 0
- `sale_price` must be >= 0 (when provided)

**State Transitions**:
- draft → published (Kim publishes product)
- published → draft (Kim unpublishes)
- Any status + discontinued=true (end of life)

---

### 4. store_info (Singleton)

**Purpose**: Business metadata - single record for store details

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | integer | auto | Primary key |
| store_name | string | YES | "WV Wild Outdoors" |
| address_line1 | string | YES | Street address |
| address_line2 | string | no | Suite/unit |
| city | string | YES | "Birch River" |
| state | string | YES | "WV" |
| postal_code | string | YES | ZIP code |
| phone | string | YES | Store phone |
| email | string | no | Contact email |
| google_maps_link | string | no | Maps URL |
| hours_weekday | string | YES | e.g., "Mon-Sat: 10am-5pm" |
| hours_weekend | string | no | Weekend hours |
| holiday_hours | text | no | Special hours notes |
| about_short | text | no | Homepage tagline |
| flood_story | text | no | 2016 flood narrative (markdown) |
| facebook_url | string | no | Social link |
| instagram_url | string | no | Social link |

**Singleton Behavior**:
- Only one record allowed
- API returns object, not array
- Admin UI shows edit form directly (no list view)

---

### 5. homepage_features

**Purpose**: Hero banners and promotional content for homepage

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | integer | auto | Primary key |
| title | string | YES | Banner headline |
| subtitle | string | no | Secondary text |
| image | uuid | no | FK to directus_files |
| cta_label | string | no | Button text |
| cta_link | string | no | Click destination URL |
| active | boolean | no | Display toggle (default: true) |
| sort_order | integer | no | Display sequence |

**Validation Rules**:
- `cta_link` should be valid URL when provided

---

### 6. announcements

**Purpose**: Time-sensitive ticker messages ("Bait & Bullet" style)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | integer | auto | Primary key |
| status | string | no | 'draft' (default) or 'published' |
| message | string | YES | Ticker text (max 100 chars) |
| type | string | no | 'info', 'alert', or 'promo' (default: 'info') |
| link | string | no | Optional click-through URL |
| start_date | timestamp | no | Activation date |
| end_date | timestamp | no | Expiration date |
| sort_order | integer | no | Display sequence |

**Validation Rules**:
- `message` max 100 characters
- `end_date` should be >= `start_date` when both provided

**API Filtering**:
- Public API should filter: `status=published AND start_date<=NOW AND end_date>=NOW`

---

### 7. services

**Purpose**: Store service offerings (FFL transfers, licenses, etc.)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | integer | auto | Primary key |
| status | string | no | 'draft' (default) or 'published' |
| name | string | YES | Service name |
| slug | string | YES | URL-friendly identifier |
| short_description | text | no | Card summary (150 chars) |
| description | text | no | Full details (markdown) |
| image | uuid | no | FK to directus_files |
| price_info | string | no | e.g., "$25 per transfer" |
| sort_order | integer | no | Display sequence |

**Validation Rules**:
- `slug` must be unique within collection
- `short_description` recommended max 150 characters

---

### 8. pages

**Purpose**: Static content pages (About, FAQ, custom pages)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | integer | auto | Primary key |
| status | string | no | 'draft' (default) or 'published' |
| title | string | YES | Page title |
| slug | string | YES | URL path (e.g., 'about') |
| content | text | no | Page body (markdown) |
| meta_title | string | no | SEO title |
| meta_description | text | no | SEO description |

**Validation Rules**:
- `slug` must be unique within collection
- Reserved slugs: 'admin', 'api', 'ghost', 'blog'

---

## File Storage

All image fields reference `directus_files` collection:
- Storage location: `/directus/uploads` Docker volume
- Max file size: 5MB (per clarification)
- Supported formats: jpg, png, gif, webp
- Thumbnails auto-generated by Directus

---

## Permissions Matrix

| Collection | Public (Read) | Public (CUD) | Admin |
|------------|---------------|--------------|-------|
| categories | YES | NO | FULL |
| brands | YES | NO | FULL |
| products | YES (published) | NO | FULL |
| store_info | YES | NO | FULL |
| homepage_features | YES (active) | NO | FULL |
| announcements | YES (published+dates) | NO | FULL |
| services | YES (published) | NO | FULL |
| pages | YES (published) | NO | FULL |
| directus_files | YES (referenced) | NO | FULL |
