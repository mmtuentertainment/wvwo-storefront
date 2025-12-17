# SPEC-08: Inventory & Stock Display

**Phase:** 3C - E-Commerce Foundation
**Status:** SPECIFICATION
**Dependencies:** SPEC-01 (Product Model)

---

## Overview

Stock management and display states for product availability, including visual indicators, messaging, and cart behavior based on inventory status.

---

## Stock Levels

### Status Definitions

| Status | Meaning | Cart Behavior |
|--------|---------|---------------|
| `in_stock` | Available for purchase | Normal add to cart |
| `low_stock` | Limited quantity (≤3) | Add to cart + warning |
| `out_of_stock` | Currently unavailable | Cannot add to cart |
| `call_for_availability` | Check with store | Show phone number |
| `reserved` | Held for customer | Not purchasable |

### Product Schema Extension

```typescript
interface Product {
  // ... existing fields ...

  // Stock management
  stockLevel: 'in_stock' | 'low_stock' | 'out_of_stock' | 'call_for_availability';
  stockQuantity?: number;       // Actual count (optional, for Kim's reference)
  backorderAllowed?: boolean;   // Can order when out of stock?
  backorderMessage?: string;    // "Usually ships in 2-3 weeks"
  restockDate?: string;         // Expected restock (optional)
}
```

### Example Products

```json
{
  "id": "berkley-powerbait-chartreuse",
  "stockLevel": "in_stock",
  "stockQuantity": 24
}

{
  "id": "ruger-1022-carbine",
  "stockLevel": "low_stock",
  "stockQuantity": 2
}

{
  "id": "winchester-sxp-pump-12ga",
  "stockLevel": "out_of_stock",
  "backorderAllowed": false
}

{
  "id": "custom-rifle-build",
  "stockLevel": "call_for_availability"
}
```

---

## Stock Display Components

### Badge Component

```tsx
interface StockBadgeProps {
  stockLevel: Product['stockLevel'];
  className?: string;
}

function StockBadge({ stockLevel, className }: StockBadgeProps) {
  const config = {
    in_stock: {
      label: 'In Stock',
      variant: 'stock',  // bg-sign-green
      icon: Check
    },
    low_stock: {
      label: 'Low Stock',
      variant: 'blaze',  // bg-brand-orange
      icon: AlertTriangle
    },
    out_of_stock: {
      label: 'Out of Stock',
      variant: 'outline',
      icon: X
    },
    call_for_availability: {
      label: 'Call for Availability',
      variant: 'ffl',  // bg-brand-brown
      icon: Phone
    }
  };

  const { label, variant, icon: Icon } = config[stockLevel];

  return (
    <Badge variant={variant} className={className}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  );
}
```

### Product Card Stock Display

```tsx
<div className="relative">
  {/* Product image */}
  <img src={product.images[0]} alt={product.name} />

  {/* Stock badge overlay */}
  <div className="absolute top-2 right-2">
    <StockBadge stockLevel={product.stockLevel} />
  </div>

  {/* Out of stock overlay */}
  {product.stockLevel === 'out_of_stock' && (
    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
      <span className="font-display font-bold text-brand-mud">
        Out of Stock
      </span>
    </div>
  )}
</div>
```

### Product Page Stock Display

```tsx
<div className="space-y-3">
  {/* Stock status */}
  <div className="flex items-center gap-2">
    <StockBadge stockLevel={product.stockLevel} />

    {product.stockLevel === 'low_stock' && (
      <span className="text-sm text-brand-orange">
        Only {product.stockQuantity} left!
      </span>
    )}
  </div>

  {/* Add to cart / Reserve / Contact */}
  {product.stockLevel === 'in_stock' && (
    <Button variant="cta" onClick={() => addToCart(product)}>
      Add to Cart
    </Button>
  )}

  {product.stockLevel === 'low_stock' && (
    <>
      <Button variant="cta" onClick={() => addToCart(product)}>
        Add to Cart
      </Button>
      <p className="text-sm text-brand-orange">
        Hurry! Only {product.stockQuantity} left in stock.
      </p>
    </>
  )}

  {product.stockLevel === 'out_of_stock' && (
    <>
      <Button variant="outline" disabled>
        Out of Stock
      </Button>

      {product.backorderAllowed ? (
        <>
          <Button variant="wvwo" onClick={() => addToCart(product)}>
            Backorder
          </Button>
          <p className="text-sm text-brand-mud">
            {product.backorderMessage || 'Usually ships in 2-4 weeks'}
          </p>
        </>
      ) : (
        <div className="p-3 bg-brand-cream rounded-sm">
          <p className="text-sm text-brand-mud">
            Want us to notify you when it's back?
          </p>
          <NotifyForm productId={product.id} />
        </div>
      )}
    </>
  )}

  {product.stockLevel === 'call_for_availability' && (
    <>
      <Button variant="wvwo" asChild>
        <a href={`tel:${SITE_CONTACT.phone}`}>
          <Phone className="w-4 h-4 mr-2" />
          Call for Availability
        </a>
      </Button>
      <p className="text-sm text-brand-mud">
        Stock varies. Give us a call at {SITE_CONTACT.phoneDisplay} to check.
      </p>
    </>
  )}
</div>
```

---

## Notify When Available

For out-of-stock items, offer email notification:

### Form Component

```tsx
function NotifyForm({ productId }: { productId: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submitNotifyRequest(productId, email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-sm text-sign-green flex items-center gap-2">
        <Check className="w-4 h-4" />
        We'll email you when it's back!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
      />
      <Button type="submit" variant="outline" size="sm">
        Notify Me
      </Button>
    </form>
  );
}
```

### Storage

Using Web3Forms or simple KV storage:

```typescript
interface NotifyRequest {
  email: string;
  productId: string;
  productName: string;
  requestedAt: string;
}

// Store in Cloudflare KV
await KV.put(`notify:${productId}:${email}`, JSON.stringify({
  email,
  productId,
  productName: product.name,
  requestedAt: new Date().toISOString()
}));
```

---

## Cart Validation

### Prevent Adding Out-of-Stock

```typescript
function addToCart(product: Product, quantity: number = 1) {
  // Check stock
  if (product.stockLevel === 'out_of_stock' && !product.backorderAllowed) {
    toast({
      title: "Out of Stock",
      description: "This item is currently unavailable.",
      variant: "destructive"
    });
    return;
  }

  if (product.stockLevel === 'call_for_availability') {
    toast({
      title: "Call to Order",
      description: `Please call ${SITE_CONTACT.phoneDisplay} for this item.`,
      variant: "info"
    });
    return;
  }

  // Check quantity vs stock
  if (product.stockQuantity && quantity > product.stockQuantity) {
    toast({
      title: "Not Enough Stock",
      description: `Only ${product.stockQuantity} available.`,
      variant: "destructive"
    });
    return;
  }

  // Add to cart
  dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });
}
```

### Low Stock Warning at Checkout

```tsx
{cart.items.some(item => {
  const product = getProduct(item.productId);
  return product.stockLevel === 'low_stock';
}) && (
  <Alert className="bg-brand-orange/10 border-brand-orange">
    <AlertTriangle className="w-5 h-5 text-brand-orange" />
    <AlertDescription>
      Some items in your cart are low stock. Complete checkout soon!
    </AlertDescription>
  </Alert>
)}
```

---

## Stock Updates (Kim's Workflow)

### Manual Update (MVP)

Kim updates store.json or Airtable when stock changes:

```json
// store.json
{
  "id": "ruger-1022-carbine",
  "stockLevel": "in_stock",  // Changed from "out_of_stock"
  "stockQuantity": 5
}
```

Rebuild and deploy site after changes.

### Airtable Integration (Recommended)

| Column | Type | Notes |
|--------|------|-------|
| SKU | Text | Primary key |
| Product Name | Text | Display name |
| Stock Level | Single Select | in_stock, low_stock, out_of_stock, call |
| Quantity | Number | Actual count |
| Last Updated | Date | Auto-updated |

Kim updates in Airtable app → Webhook triggers rebuild → Site updates.

### Future: Real-Time Sync

For Phase 4+, consider:
- POS integration (Square, Clover)
- Automatic decrement on order
- Real-time inventory API
- Threshold alerts for Kim

---

## Display Rules by Category

| Category | Default Stock Display | Notes |
|----------|----------------------|-------|
| Fishing | Show stock level | High turnover, useful info |
| Ammo | "In Stock" or "Limited" | No exact counts (runs out fast) |
| Firearms | Show stock level | Important for reserve |
| Clothing | "In Stock" only | Sizes vary, call for specific |
| Seasonal | Show stock level | Time-sensitive |

### Ammo Special Handling

Don't show exact counts for ammo (creates rush buying):

```tsx
{product.categoryId === 'ammo' ? (
  <Badge variant="stock">
    {product.stockLevel === 'in_stock' ? 'In Stock' : 'Limited Supply'}
  </Badge>
) : (
  <StockBadge stockLevel={product.stockLevel} />
)}
```

---

## Visual States Summary

### In Stock
- **Badge:** Green "In Stock" with checkmark
- **Button:** "Add to Cart" (enabled)
- **Price:** Normal display

### Low Stock
- **Badge:** Orange "Low Stock" with warning
- **Button:** "Add to Cart" (enabled)
- **Message:** "Only X left!" in orange
- **Price:** Normal display

### Out of Stock
- **Badge:** Gray "Out of Stock" with X
- **Button:** Disabled OR "Notify Me"
- **Overlay:** Semi-transparent on product image
- **Price:** Still shown (grayed slightly)

### Call for Availability
- **Badge:** Brown "Call for Availability" with phone
- **Button:** "Call for Availability" (links to phone)
- **Price:** May show "Call for Price"

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

- [ ] In Stock badge displays correctly
- [ ] Low Stock badge displays with quantity warning
- [ ] Out of Stock prevents add to cart
- [ ] Call for Availability shows phone CTA
- [ ] Notify Me form submits successfully
- [ ] Cart validates stock before checkout
- [ ] Low stock warning at checkout
- [ ] Product card overlays for out of stock
- [ ] Ammo shows "Limited" not exact count
- [ ] Stock updates reflect on site (after rebuild)
