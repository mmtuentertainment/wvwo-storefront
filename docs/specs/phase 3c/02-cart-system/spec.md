# SPEC-02: Cart System

**Phase:** 3C - E-Commerce Foundation
**Status:** ✅ IMPLEMENTED
**Dependencies:** SPEC-01 (Product Model)

---

## Clarifications

### Session 2025-12-17

- Q: What happens if product price/stock changes while in cart? → A: Best-effort notice on cart ("Prices may have changed"), validate at checkout
- Q: What if localStorage is unavailable? → A: Session-only fallback with subtle notice "Cart won't save between visits"
- Q: Should cart actions trigger analytics? → A: Basic events only: `add_to_cart`, `remove_from_cart`, `begin_checkout`
- Q: Multi-tab cart behavior? → A: Independent carts per tab, last-write-wins on localStorage
- Q: Schema versioning for localStorage? → A: Store schema version, attempt migration for known changes, clear if unrecoverable

---

## Overview

React-based shopping cart with localStorage persistence, supporting all three product tiers with appropriate restrictions and UI feedback.

---

## Architecture

### Technology Stack

- **UI Framework:** React + shadcn/ui (approved for interactive components)
- **State Management:** Nanostores (framework-agnostic atoms)
- **Persistence:** localStorage (guest checkout, no backend)
- **Hydration:** Astro `client:visible` directive

### Component Structure

```text

src/components/cart/
├── CartDrawer.tsx         # Slide-over cart UI (shadcn Sheet)
├── CartItem.tsx           # Individual cart item row
├── CartSummary.tsx        # Totals + checkout button
├── AddToCartButton.tsx    # Product page button
├── CartIcon.tsx           # Header cart icon with count
├── CartErrorBoundary.tsx  # Graceful error handling
├── HeaderCart.tsx         # Astro island wrapper
└── index.ts               # Barrel exports

src/stores/
└── cartStore.ts           # Nanostores cart state

src/hooks/
└── useCart.ts             # React hook wrapping nanostores

```text

---

## Cart State Schema

```typescript
const CART_SCHEMA_VERSION = 1;

interface CartState {
  schemaVersion: number;    // For migration support
  items: CartItem[];
  lastUpdated: string;      // ISO timestamp
  sessionId: string;        // UUID for tracking
}

interface CartItem {
  productId: string;
  sku: string;
  name: string;
  shortName: string;
  price: number;            // Price in cents
  priceDisplay: string;
  quantity: number;
  maxQuantity: number;
  image: string;
  fulfillmentType: 'ship_or_pickup' | 'pickup_only' | 'reserve_hold';
  fflRequired: boolean;
  ageRestriction?: 18 | 21;
}

interface CartSummary {
  itemCount: number;
  subtotal: number;         // In cents
  hasShippableItems: boolean;
  hasPickupOnlyItems: boolean;
  hasFirearms: boolean;
  requiresAgeVerification: boolean;
  fulfillmentOptions: ('ship' | 'pickup')[];
}

```text

---

## Cart Actions

```typescript
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartState };

```text

### Add to Cart Logic

```typescript
function addToCart(product: Product, quantity: number = 1) {
  // 1. Check if already in cart
  const existingItem = cart.items.find(i => i.productId === product.id);

  // 2. Validate quantity
  const newQuantity = existingItem
    ? existingItem.quantity + quantity
    : quantity;

  if (newQuantity > product.maxQuantity) {
    showToast(`Maximum ${product.maxQuantity} per order`);
    return;
  }

  // 3. Firearms: max 1 per SKU, max 3 total
  if (product.fulfillmentType === 'reserve_hold') {
    const firearmCount = cart.items.filter(
      i => i.fulfillmentType === 'reserve_hold'
    ).length;

    if (existingItem) {
      showToast('This firearm is already reserved');
      return;
    }

    if (firearmCount >= 3) {
      showToast('Maximum 3 firearms per order');
      return;
    }
  }

  // 4. Add/update item
  dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });

  // 5. Show success feedback
  showToast(`${product.shortName} added to cart`);
}

```text

---

## UI Components

### AddToCartButton

Three variants based on `fulfillmentType`:

```tsx
// Tier 1: Shippable items
<Button variant="cta" onClick={() => addToCart(product)}>
  Add to Cart
</Button>

// Tier 2: Pickup only (ammo)
<Button variant="cta" onClick={() => addToCart(product)}>
  Add to Cart
  <Badge variant="stock" className="ml-2">Pickup Only</Badge>
</Button>

// Tier 3: Firearms (reserve)
<Button variant="wvwo" onClick={() => addToCart(product)}>
  Reserve This Firearm
</Button>
<p className="text-sm text-brand-mud mt-2">
  Pay now to hold. Pick up in store after background check.
</p>

```text

### CartDrawer (shadcn Sheet)

```tsx
<Sheet>
  <SheetTrigger asChild>
    <CartIcon count={cart.itemCount} />
  </SheetTrigger>

  <SheetContent side="right" className="w-full sm:max-w-md">
    <SheetHeader>
      <SheetTitle className="font-display">Your Cart</SheetTitle>
    </SheetHeader>

    {cart.items.length === 0 ? (
      <EmptyCart />
    ) : (
      <>
        <div className="flex-1 overflow-y-auto py-4">
          {cart.items.map(item => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        <CartSummary cart={cart} />

        {/* Fulfillment notices */}
        {cart.hasFirearms && (
          <Alert variant="info">
            <p>Firearms require in-store pickup with background check.</p>
          </Alert>
        )}

        {cart.hasPickupOnlyItems && !cart.hasFirearms && (
          <Alert variant="info">
            <p>Some items are pickup only.</p>
          </Alert>
        )}

        <Button
          variant="cta"
          className="w-full mt-4"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </Button>
      </>
    )}
  </SheetContent>
</Sheet>

```text

### CartItem Row

```tsx
<div className="flex gap-4 py-4 border-b border-brand-mud/10">
  <img
    src={item.image}
    alt={item.name}
    className="w-20 h-20 object-contain bg-white rounded-sm"
  />

  <div className="flex-1">
    <h3 className="font-display font-bold text-brand-brown">
      {item.shortName}
    </h3>
    <p className="text-sm text-brand-mud">{item.priceDisplay}</p>

    {/* Fulfillment badge */}
    {item.fulfillmentType === 'pickup_only' && (
      <Badge variant="stock" size="sm">Pickup Only</Badge>
    )}
    {item.fulfillmentType === 'reserve_hold' && (
      <Badge variant="ffl" size="sm">Reserved</Badge>
    )}

    {/* Quantity controls (not for firearms) */}
    {item.fulfillmentType !== 'reserve_hold' ? (
      <div className="flex items-center gap-2 mt-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          disabled={item.quantity >= item.maxQuantity}
        >
          +
        </Button>
      </div>
    ) : (
      <p className="text-sm text-brand-mud mt-2">Qty: 1 (firearms)</p>
    )}
  </div>

  <div className="text-right">
    <p className="font-bold text-brand-brown">
      {formatPrice(item.price * item.quantity)}
    </p>
    <button
      onClick={() => removeItem(item.productId)}
      className="text-sm text-red-600 hover:underline mt-2"
    >
      Remove
    </button>
  </div>
</div>

```text

---

## localStorage Persistence

### Storage Key

```typescript
const CART_STORAGE_KEY = 'wvwo_cart';
const CART_SCHEMA_VERSION = 1;

```text

### Storage Availability Check

```typescript
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// Track persistence mode
const [persistenceMode, setPersistenceMode] = useState<'local' | 'session'>('local');

```text

### Hydration on Mount

```typescript
useEffect(() => {
  // Check localStorage availability
  if (!isLocalStorageAvailable()) {
    setPersistenceMode('session');
    return; // Cart will work but not persist
  }

  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);

      // Schema version check + migration
      if (parsed.schemaVersion !== CART_SCHEMA_VERSION) {
        const migrated = migrateCart(parsed);
        if (migrated) {
          dispatch({ type: 'HYDRATE', payload: migrated });
        } else {
          // Unrecoverable - clear cart
          localStorage.removeItem(CART_STORAGE_KEY);
        }
        return;
      }

      // Validate cart isn't stale (24 hour expiry for firearms)
      const lastUpdated = new Date(parsed.lastUpdated);
      const hoursSinceUpdate = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60);

      if (hoursSinceUpdate < 24) {
        dispatch({ type: 'HYDRATE', payload: parsed });
      } else {
        // Clear stale cart
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    } catch (e) {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }
}, []);

// Migration helper (expand as schema evolves)
function migrateCart(oldCart: unknown): CartState | null {
  // v0 → v1: Add schemaVersion field
  if (!('schemaVersion' in (oldCart as object))) {
    return { ...(oldCart as CartState), schemaVersion: 1 };
  }
  // Unknown version - can't migrate
  return null;
}

```text

### Persist on Change

```typescript
useEffect(() => {
  if (persistenceMode !== 'local') return; // Skip if session-only

  if (cart.items.length > 0) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({
      ...cart,
      schemaVersion: CART_SCHEMA_VERSION,
      lastUpdated: new Date().toISOString()
    }));
  } else {
    localStorage.removeItem(CART_STORAGE_KEY);
  }
}, [cart, persistenceMode]);

```text

### Session-Only Notice
When `persistenceMode === 'session'`, display subtle notice in cart:

```tsx
{persistenceMode === 'session' && (
  <p className="text-xs text-brand-mud/60 text-center py-2">
    Cart won't save between visits
  </p>
)}

```text

---

## Cart Validation Rules

### Quantity Limits
| Product Type | Min | Max | Notes |
|--------------|-----|-----|-------|
| Shippable | 1 | 10 | Default |
| Ammo | 1 | 10 | May vary by product |
| Firearms | 1 | 1 | Per SKU |
| Firearms Total | - | 3 | Per order |

### Mixed Cart Rules
1. **Firearms + Other**: Entire order becomes pickup only
2. **Ammo + Shippable**: Customer chooses ship or pickup at checkout
3. **Age Restricted**: Display verification notice (no hard block at cart)

---

## Empty Cart State

```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <ShoppingBag className="w-16 h-16 text-brand-mud/30 mb-4" />
  <h3 className="font-display font-bold text-xl text-brand-brown mb-2">
    Your cart's looking empty
  </h3>
  <p className="text-brand-mud mb-6">
    Browse our selection and find what you need.
  </p>
  <Button variant="cta" asChild>
    <a href="/shop">Browse Products</a>
  </Button>
</div>

```text

---

## Toast Notifications

Using shadcn Toast component with WVWO styling:

```tsx
// Success
toast({
  title: "Added to cart",
  description: `${product.shortName} is ready for checkout.`,
  variant: "success"
});

// Error
toast({
  title: "Can't add more",
  description: `Maximum ${product.maxQuantity} per order.`,
  variant: "destructive"
});

// Info
toast({
  title: "Pickup only",
  description: "This item requires in-store pickup.",
  variant: "info"
});

```text

---

## Accessibility

- **Focus Management**: Return focus to trigger after drawer closes
- **Screen Readers**: Announce cart updates (`aria-live="polite"`)
- **Keyboard Navigation**: All controls keyboard accessible
- **Touch Targets**: Minimum 44x44px for mobile

---

## Analytics Events

Fire basic analytics events for cart actions. Integrate with existing analytics provider (if any) or prepare hooks for future integration.

```typescript
type CartAnalyticsEvent =
  | { event: 'add_to_cart'; productId: string; sku: string; quantity: number; price: number }
  | { event: 'remove_from_cart'; productId: string; sku: string }
  | { event: 'begin_checkout'; itemCount: number; subtotal: number };

function trackCartEvent(event: CartAnalyticsEvent) {
  // Integration point - fire to analytics provider
  // e.g., window.gtag?.('event', event.event, event);
  console.debug('[Cart Analytics]', event);
}

```text

**Usage:**
- `add_to_cart`: Fire after successful addToCart
- `remove_from_cart`: Fire after item removal
- `begin_checkout`: Fire when user clicks "Proceed to Checkout"

---

## Price Freshness Notice

Display best-effort notice when cart contains items:

```tsx
{cart.items.length > 0 && (
  <p className="text-xs text-brand-mud/60 text-center py-2 border-t border-brand-mud/10">
    Prices shown may have changed. Final price confirmed at checkout.
  </p>
)}

```text

Actual validation of price/stock changes happens at checkout (SPEC-03).

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

### Core Functionality
- [ ] Add shippable item to cart
- [ ] Add ammo (pickup only) to cart
- [ ] Reserve firearm (max 1 per SKU)
- [ ] Enforce max 3 firearms per order
- [ ] Quantity +/- respects maxQuantity
- [ ] Remove item from cart
- [ ] Clear entire cart

### Persistence & Edge Cases
- [ ] Cart persists on page refresh
- [ ] Cart expires after 24 hours
- [ ] localStorage unavailable: cart works in session-only mode with notice
- [ ] Schema migration: old cart format migrates successfully
- [ ] Schema migration: unknown version clears cart gracefully
- [ ] Multi-tab: last-write-wins behavior (no sync required)

### UI States
- [ ] Empty cart state displays correctly
- [ ] Mixed cart shows correct fulfillment notices
- [ ] "Prices may have changed" notice displays
- [ ] Session-only notice displays when localStorage unavailable
- [ ] Mobile cart drawer is usable
- [ ] Keyboard navigation works

### Analytics
- [ ] `add_to_cart` event fires on add
- [ ] `remove_from_cart` event fires on remove
- [ ] `begin_checkout` event fires on checkout click
