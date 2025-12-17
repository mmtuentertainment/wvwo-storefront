# SPEC-01: E-Commerce Product Model

**Phase:** 3C - E-Commerce Foundation
**Status:** SPECIFICATION
**Dependencies:** None (extends existing store.json)

---

## Overview

Extend the existing product data model in `store.json` to support full e-commerce functionality including cart operations, fulfillment routing, and regulatory compliance flags.

---

## Current Schema (store.json)

The existing schema already includes key e-commerce fields:

```json
{
  "id": "berkley-powerbait-chartreuse",
  "sku": "FISH-BPB-CHART",
  "slug": "berkley-powerbait-chartreuse",
  "categoryId": "fishing",
  "brand": "Berkley",
  "name": "PowerBait Trout Dough - Chartreuse",
  "shortName": "PowerBait Chartreuse",
  "description": "The original and still the best...",
  "price": 699,
  "priceDisplay": "$6.99",
  "priceUnit": "1.75oz jar",
  "images": ["/images/products/powerbait-chartreuse.jpg"],
  "shippable": true,
  "fflRequired": false,
  "inStock": true,
  "specs": { ... },
  "tags": ["trout", "bait", "stocked", "beginners"]
}
```

---

## Extended Schema

### New Fields

```typescript
interface Product {
  // === EXISTING FIELDS ===
  id: string;
  sku: string;
  slug: string;
  categoryId: string;
  brand: string;
  name: string;
  shortName: string;
  description: string;
  price: number;              // Price in cents
  priceDisplay: string;       // Formatted price
  priceUnit: string;          // "each", "box of 20", etc.
  images: string[];
  shippable: boolean;
  fflRequired: boolean;
  inStock: boolean;
  specs: Record<string, string>;
  tags: string[];

  // === NEW E-COMMERCE FIELDS ===

  // Cart & Quantity
  maxQuantity?: number;       // Max per order (default: 10, firearms: 1)
  minQuantity?: number;       // Min per order (default: 1)
  quantityStep?: number;      // Quantity increment (default: 1)

  // Fulfillment
  fulfillmentType: 'ship_or_pickup' | 'pickup_only' | 'reserve_hold';
  weight?: number;            // Weight in ounces (for shipping calc)
  dimensions?: {              // For shipping calc
    length: number;
    width: number;
    height: number;
  };

  // Regulatory
  ageRestriction?: 18 | 21;   // Minimum age (18 for long guns, 21 for handguns/ammo)
  hazmat?: boolean;           // ORM-D shipping (ammo)
  stateRestrictions?: string[]; // States where item cannot be shipped

  // Stock Management
  stockLevel?: 'in_stock' | 'low_stock' | 'out_of_stock' | 'call_for_availability';
  stockQuantity?: number;     // Actual count (optional, for Kim's reference)
  backorderAllowed?: boolean; // Can customer order when out of stock?

  // Pricing Variants (future)
  compareAtPrice?: number;    // Original price for sales (in cents)
  saleActive?: boolean;       // Is this item on sale?
}
```

### Fulfillment Type Mapping

| fulfillmentType | Products | Cart Behavior | Checkout Flow |
|-----------------|----------|---------------|---------------|
| `ship_or_pickup` | Fishing, gear, clothing | Standard add to cart | Shipping or pickup selection |
| `pickup_only` | Ammo | Add to cart, pickup notice | Pickup only, no shipping |
| `reserve_hold` | Firearms | "Reserve" button, qty=1 | Reserve flow, pickup + 4473 |

---

## Product Tier Classification

### Tier 1: Shippable Items
```json
{
  "shippable": true,
  "fflRequired": false,
  "fulfillmentType": "ship_or_pickup",
  "maxQuantity": 10
}
```

### Tier 2: Ammunition (Pickup Only)
```json
{
  "shippable": false,
  "fflRequired": true,
  "fulfillmentType": "pickup_only",
  "ageRestriction": 21,
  "hazmat": true,
  "maxQuantity": 10
}
```

### Tier 3: Firearms (Reserve & Hold)
```json
{
  "shippable": false,
  "fflRequired": true,
  "fulfillmentType": "reserve_hold",
  "ageRestriction": 21,  // or 18 for long guns
  "maxQuantity": 1
}
```

---

## Schema.org Product Markup

Each product page should include structured data:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "PowerBait Trout Dough - Chartreuse",
  "description": "The original and still the best...",
  "sku": "FISH-BPB-CHART",
  "brand": {
    "@type": "Brand",
    "name": "Berkley"
  },
  "offers": {
    "@type": "Offer",
    "price": "6.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "WV Wild Outdoors"
    }
  },
  "image": "https://wvwildoutdoors.pages.dev/images/products/powerbait-chartreuse.jpg"
}
```

**Note:** For firearms, use `availability: "https://schema.org/InStoreOnly"` and do NOT include price in schema (prevents price comparison shopping for regulated items).

---

## Migration Strategy

### Phase 1: Add New Fields to Existing Products
1. Add `fulfillmentType` based on existing `shippable` + `fflRequired` flags
2. Add `maxQuantity` defaults
3. Add `ageRestriction` for ammo and firearms
4. Add `stockLevel` (default to `in_stock` for existing items)

### Phase 2: Extend store.json Structure
```json
{
  "categories": [...],
  "products": [...],
  "settings": {
    "defaultMaxQuantity": 10,
    "firearmMaxQuantity": 1,
    "pickupOnlyCategories": ["ammo"],
    "reserveHoldCategories": ["firearms"]
  }
}
```

---

## Validation Rules

### Cart Validation
1. **Quantity**: `minQuantity <= quantity <= maxQuantity`
2. **Firearms**: Max 1 per SKU, max 3 firearms total per order
3. **Mixed Cart**: If cart contains `reserve_hold` items, entire order is pickup only
4. **Age**: Display age verification notice for restricted items

### Checkout Validation
1. **Shipping Address**: Required only for `ship_or_pickup` items
2. **Pickup Notice**: Display for `pickup_only` and `reserve_hold` items
3. **4473 Notice**: Display for `reserve_hold` items (firearms)

---

## Example Updated Product

```json
{
  "id": "winchester-sxp-pump-12ga",
  "sku": "GUN-WIN-SXP-12",
  "slug": "winchester-sxp-pump-shotgun",
  "categoryId": "firearms",
  "brand": "Winchester",
  "name": "SXP Pump-Action Shotgun 12ga 28\"",
  "shortName": "Winchester SXP",
  "description": "Fast-cycling inertia-assisted action...",
  "price": 34999,
  "priceDisplay": "$349.99",
  "priceUnit": "each",
  "images": ["/images/products/winchester-sxp.jpg"],
  "shippable": false,
  "fflRequired": true,
  "inStock": true,
  "specs": {
    "gauge": "12 Gauge",
    "chamber": "3 inch",
    "barrelLength": "28 inches",
    "capacity": "4+1",
    "stock": "Black Synthetic"
  },
  "tags": ["shotgun", "pump", "hunting", "waterfowl", "turkey"],

  "fulfillmentType": "reserve_hold",
  "maxQuantity": 1,
  "ageRestriction": 18,
  "stockLevel": "in_stock"
}
```

---

## Aesthetic Compliance

Per CLAUDE.md WVWO Frontend Aesthetics:
- All `rounded-*` classes → `rounded-sm`
- All headings → `font-display font-bold`
- Button variants: `wvwo` (brown), `cta` (green), `blaze` (orange)
- Badge variants: `stock` (green), `ffl` (brown), `blaze` (orange)
- Form inputs: `ring-sign-green` on focus, `border-brand-mud/30`
- Shadows: Use harder shadows per shadcn-wvwo.css

---

## Testing Checklist

- [ ] All existing products have valid `fulfillmentType`
- [ ] Firearms have `maxQuantity: 1` and `ageRestriction`
- [ ] Ammo has `ageRestriction: 21` and `hazmat: true`
- [ ] Schema.org Product markup validates (Google Rich Results Test)
- [ ] Cart respects `maxQuantity` limits
- [ ] `npm run build` passes with extended schema
