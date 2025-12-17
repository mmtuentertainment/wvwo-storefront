# SPEC-06: Shipping & Local Pickup

**Phase:** 3C - E-Commerce Foundation
**Status:** SPECIFICATION
**Dependencies:** SPEC-01 (Product Model), SPEC-03 (Checkout)

---

## Overview

Fulfillment options by product tier, with local pickup as the primary/default option and shipping available for non-restricted items.

---

## Fulfillment Matrix

| Product Tier | Ship | Pickup | Notes |
|--------------|------|--------|-------|
| **Tier 1** (Fishing, gear, clothing) | ✅ | ✅ | Customer choice |
| **Tier 2** (Ammo) | ❌ | ✅ | Pickup only (carrier restrictions) |
| **Tier 3** (Firearms) | ❌ | ✅ | Pickup only + 4473 |

---

## Local Pickup

### Pickup Location

```
WV Wild Outdoors
121 WV-82 (Birch River Rd)
Birch River, WV 26610

Hours: Mon-Sat 10am-5pm
Phone: (304) 649-2607

Directions: I-79 Exit 57 → South on US 19 → Right on WV-82
```

### Pickup Flow

```
Order Placed → Kim Notified → Order Prepared → Customer Called → Customer Picks Up
```

### Pickup UI (Checkout)

```tsx
<div className="p-4 bg-brand-cream rounded-sm">
  <div className="flex items-start gap-3">
    <Store className="w-6 h-6 text-sign-green flex-shrink-0 mt-1" />
    <div>
      <h4 className="font-display font-bold text-brand-brown">
        Pick Up in Store
      </h4>
      <p className="text-sm text-brand-mud mt-1">
        Usually ready same day. We'll call when it's ready.
      </p>

      <div className="mt-3 text-sm text-brand-mud">
        <p className="font-medium">WV Wild Outdoors</p>
        <p>121 WV-82 (Birch River Rd)</p>
        <p>Birch River, WV 26610</p>
        <p className="mt-2">Mon-Sat 10am-5pm</p>
      </div>

      <a
        href="https://www.google.com/maps?q=38.499062,-80.754607"
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-1 text-sign-green hover:underline text-sm mt-3"
      >
        <MapPin className="w-4 h-4" />
        Get Directions
      </a>
    </div>
  </div>
</div>
```

### Pickup Confirmation Email

```
Your order is ready for pickup!

ORDER #WVWO-2024-001234

Come on by during business hours:

WV Wild Outdoors
121 WV-82 (Birch River Rd)
Birch River, WV 26610
Mon-Sat 10am-5pm

[If Firearms:]
Don't forget:
• Valid photo ID
• Allow 15-20 min for background check

Questions? (304) 649-2607

See you soon!
```

---

## Shipping (Tier 1 Items Only)

### Carrier Options

| Carrier | Products | Notes |
|---------|----------|-------|
| **UPS Ground** | All shippable | Primary carrier |
| **USPS Priority** | Small/light items | Alternative |
| **FedEx** | Backup | More expensive |

**Note:** FedEx prohibits ammunition. UPS allows ammo with restrictions, but we're doing pickup-only for ammo to simplify.

### Shipping Zones

Based on distance from Birch River, WV (26610):

| Zone | States | Est. Transit | Rate Example |
|------|--------|--------------|--------------|
| **Zone 1** | WV, VA, PA, OH, MD | 2-3 days | $8.99 |
| **Zone 2** | KY, NC, TN, IN, NY, NJ | 3-4 days | $11.99 |
| **Zone 3** | All other states | 4-7 days | $14.99 |

### Shipping Rate Calculation

#### Option A: Flat Rate by Zone (Recommended for MVP)

```typescript
const SHIPPING_RATES = {
  zone1: { states: ['WV', 'VA', 'PA', 'OH', 'MD'], rate: 899 },
  zone2: { states: ['KY', 'NC', 'TN', 'IN', 'NY', 'NJ', 'DE', 'DC'], rate: 1199 },
  zone3: { rate: 1499 }  // Default for all others
};

function calculateShipping(state: string, items: CartItem[]): number {
  // Free shipping threshold
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  if (subtotal >= 7500) return 0;  // Free shipping over $75

  // Find zone
  for (const [zone, config] of Object.entries(SHIPPING_RATES)) {
    if (config.states?.includes(state)) {
      return config.rate;
    }
  }
  return SHIPPING_RATES.zone3.rate;
}
```

#### Option B: Weight-Based (Future)

```typescript
interface ShippingCalc {
  baseRate: number;      // $5.99
  perPound: number;      // $0.50/lb
  freeThreshold: number; // $75
}

function calculateShipping(items: CartItem[], state: string): number {
  const totalWeight = items.reduce((sum, i) => {
    const product = getProduct(i.productId);
    return sum + (product.weight || 8) * i.quantity;  // Default 8oz
  }, 0);

  const weightLbs = totalWeight / 16;
  const zone = getZone(state);

  return Math.round(zone.baseRate + (weightLbs * zone.perPound));
}
```

### Shipping Address Validation

Basic validation (full address verification is future enhancement):

```typescript
const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'DC'
];

function validateAddress(address: ShippingAddress): ValidationResult {
  const errors: string[] = [];

  if (!address.street || address.street.length < 5) {
    errors.push('Please enter a valid street address.');
  }

  if (!address.city || address.city.length < 2) {
    errors.push('Please enter a city.');
  }

  if (!US_STATES.includes(address.state)) {
    errors.push('Please select a valid US state.');
  }

  if (!/^\d{5}(-\d{4})?$/.test(address.zip)) {
    errors.push('Please enter a valid ZIP code (5 digits).');
  }

  return { valid: errors.length === 0, errors };
}
```

### Shipping UI (Checkout)

```tsx
{fulfillment === 'ship' && (
  <div className="space-y-4">
    <div>
      <Label htmlFor="street">Street Address *</Label>
      <Input
        id="street"
        placeholder="123 Main St"
        {...register('street', { required: true, minLength: 5 })}
      />
    </div>

    <div>
      <Label htmlFor="apt">Apt, Suite, etc.</Label>
      <Input
        id="apt"
        placeholder="Apt 4B"
        {...register('apt')}
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          placeholder="Charleston"
          {...register('city', { required: true })}
        />
      </div>
      <div>
        <Label htmlFor="state">State *</Label>
        <Select {...register('state', { required: true })}>
          <option value="">Select...</option>
          {US_STATES.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </Select>
      </div>
    </div>

    <div className="w-1/2">
      <Label htmlFor="zip">ZIP Code *</Label>
      <Input
        id="zip"
        placeholder="25301"
        inputMode="numeric"
        {...register('zip', { required: true, pattern: /^\d{5}$/ })}
      />
    </div>

    {/* Shipping cost display */}
    <div className="p-3 bg-brand-cream rounded-sm flex justify-between">
      <span className="text-brand-mud">Shipping ({shippingZone}):</span>
      <span className="font-bold text-brand-brown">
        {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
      </span>
    </div>

    {subtotal < 7500 && (
      <p className="text-sm text-sign-green">
        Add {formatPrice(7500 - subtotal)} more for free shipping!
      </p>
    )}
  </div>
)}
```

---

## Shipping Restrictions

### State Restrictions (Future - Currently All Shippable to All States)

Some items may have state restrictions (e.g., certain knives in CA). Schema support:

```typescript
interface Product {
  // ...
  stateRestrictions?: string[];  // States where cannot ship
}

// Example: Certain knives restricted in CA, NY
{
  "id": "benchmade-auto-knife",
  "stateRestrictions": ["CA", "NY", "MA"]
}
```

Validation at checkout:

```typescript
function validateShipping(items: CartItem[], state: string): ValidationResult {
  const restricted = items.filter(item => {
    const product = getProduct(item.productId);
    return product.stateRestrictions?.includes(state);
  });

  if (restricted.length > 0) {
    return {
      valid: false,
      errors: [`${restricted.map(i => i.name).join(', ')} cannot ship to ${state}.`]
    };
  }

  return { valid: true, errors: [] };
}
```

---

## Free Shipping Threshold

| Threshold | Behavior |
|-----------|----------|
| **$75+** | Free shipping (Zone 1-3) |
| **Under $75** | Zone-based flat rate |

### Free Shipping Banner

```tsx
{subtotal < 7500 && (
  <div className="bg-sign-green/10 text-sign-green p-3 rounded-sm text-center">
    <Truck className="w-5 h-5 inline mr-2" />
    Free shipping on orders over $75!
    {subtotal > 0 && (
      <span className="ml-1">
        Add {formatPrice(7500 - subtotal)} more to qualify.
      </span>
    )}
  </div>
)}
```

---

## Order Tracking

### Tracking Integration

When Kim ships an order, she adds tracking:

```typescript
// Admin action
await updateOrder(orderId, {
  status: 'shipped',
  tracking: {
    carrier: 'ups',
    trackingNumber: '1Z999AA10123456784',
    shippedAt: new Date().toISOString()
  }
});

// Generates tracking URL
function getTrackingUrl(carrier: string, number: string): string {
  const urls = {
    ups: `https://www.ups.com/track?tracknum=${number}`,
    usps: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${number}`,
    fedex: `https://www.fedex.com/fedextrack/?trknbr=${number}`
  };
  return urls[carrier] || '#';
}
```

### Shipped Email

```
Your order is on the way!

ORDER #WVWO-2024-001234

TRACKING NUMBER: 1Z999AA10123456784
CARRIER: UPS Ground

Track your package:
https://www.ups.com/track?tracknum=1Z999AA10123456784

SHIPPING TO:
John Smith
123 Main St
Charleston, WV 25301

Should arrive in 3-5 business days.

Questions? (304) 649-2607
```

---

## Packaging Guidelines (For Kim)

### Small Items (Fishing Lures, etc.)
- Padded envelope or small box
- Bubble wrap for fragile items
- Include packing slip

### Medium Items (Boots, Clothing)
- Standard shipping box
- Tissue paper for presentation
- Include packing slip + business card

### Large/Heavy Items
- Sturdy corrugated box
- Appropriate cushioning
- Fragile labels if needed

### Packing Slip Template

```
─────────────────────────────────────
WV Wild Outdoors
121 WV-82 · Birch River, WV 26610
(304) 649-2607
─────────────────────────────────────

ORDER #WVWO-2024-001234
Date: December 17, 2024

SHIP TO:
John Smith
123 Main St
Charleston, WV 25301

─────────────────────────────────────
ITEMS:

[x] PowerBait Chartreuse × 2
[x] Trout Magnet Kit × 1
[x] Panther Martin Gold × 3

─────────────────────────────────────

Thanks for shopping local!
Grand love ya!
- Kim & Bryan
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

- [ ] Pickup option displays correctly
- [ ] Pickup confirmation email sends
- [ ] Shipping option displays for Tier 1 items
- [ ] Shipping disabled for Tier 2/3 items
- [ ] Address validation works
- [ ] ZIP code determines shipping zone
- [ ] Shipping cost calculates correctly
- [ ] Free shipping threshold works ($75+)
- [ ] Tracking number can be added
- [ ] Shipped email includes tracking link
- [ ] State restrictions prevent checkout (future)
