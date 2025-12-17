# Implementation Plan: Cart System

**Spec Version:** 1.0.0 (with clarifications 2025-12-17)
**Plan Version:** 1.0.0
**Created:** 2025-12-17

---

## Architecture Overview

React-based shopping cart using Context + useReducer for state management, with localStorage persistence for guest checkout. The cart integrates into the existing Astro + React hybrid architecture, using `client:load` for critical hydration.

**Key Decisions:**
- No new dependencies beyond existing React/Radix stack
- shadcn Sheet for drawer, Toast for notifications
- Cart state lives in React Context, persists to localStorage
- Minimal footprint: ~7 new files, ~550 LOC total

---

## Component Structure

```
wv-wild-web/src/
├── components/
│   ├── cart/
│   │   ├── CartProvider.tsx       # Context + reducer + localStorage
│   │   ├── CartDrawer.tsx         # Sheet-based slide-over
│   │   ├── CartItem.tsx           # Individual item row
│   │   ├── CartSummary.tsx        # Totals + checkout CTA
│   │   ├── AddToCartButton.tsx    # Three-tier button variants
│   │   ├── CartIcon.tsx           # Header icon with count
│   │   └── index.ts               # Barrel export
│   └── ui/
│       ├── sheet.tsx              # shadcn Sheet (NEW)
│       └── toast.tsx              # shadcn Toast (NEW)
├── lib/
│   └── cart-analytics.ts          # Analytics event helper (NEW)
└── layouts/
    └── CartLayout.astro           # Layout wrapper with CartProvider
```

---

## Implementation Phases

### Phase 1: Dependencies & Infrastructure (~150 LOC)

**1.1 Install shadcn components**
```bash
npx shadcn@latest add sheet toast
```

**1.2 Create CartProvider.tsx**
- CartState interface with schemaVersion
- CartAction union type
- useReducer with ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART, HYDRATE
- localStorage hydration with version migration
- isLocalStorageAvailable() check
- Session-only fallback mode

**1.3 Create cart-analytics.ts**
- CartAnalyticsEvent type
- trackCartEvent() function with console.debug fallback

**Files:**
- `wv-wild-web/src/components/cart/CartProvider.tsx`
- `wv-wild-web/src/lib/cart-analytics.ts`

### Phase 2: UI Components (~300 LOC)

**2.1 CartIcon.tsx**
- Shopping bag icon (lucide-react)
- Count badge with WVWO styling
- Opens CartDrawer on click

**2.2 CartDrawer.tsx**
- shadcn Sheet (side="right")
- Empty state with CTA
- Cart items list
- CartSummary component
- Fulfillment notices (firearms, pickup-only)
- Price freshness notice
- Session-only persistence notice

**2.3 CartItem.tsx**
- Product image (80px)
- Name, price, fulfillment badge
- Quantity +/- controls (disabled for firearms)
- Remove link

**2.4 CartSummary.tsx**
- Item count
- Subtotal display
- Checkout button (fires begin_checkout analytics)

**2.5 AddToCartButton.tsx**
Three variants via prop:
- Tier 1: "Add to Cart" (green CTA)
- Tier 2: "Add to Cart" + "Pickup Only" badge
- Tier 3: "Reserve This Firearm" (brown WVWO)

**Files:**
- `wv-wild-web/src/components/cart/CartIcon.tsx`
- `wv-wild-web/src/components/cart/CartDrawer.tsx`
- `wv-wild-web/src/components/cart/CartItem.tsx`
- `wv-wild-web/src/components/cart/CartSummary.tsx`
- `wv-wild-web/src/components/cart/AddToCartButton.tsx`
- `wv-wild-web/src/components/cart/index.ts`

### Phase 3: Integration (~100 LOC)

**3.1 Create CartLayout.astro**
- Wraps slot with CartProvider
- Includes Toaster component

**3.2 Update Layout.astro**
- Import CartLayout
- Wrap body content

**3.3 Update Header.astro → Header.tsx**
- Convert to React component for cart integration
- Add CartIcon after Contact button
- Use client:load directive

**3.4 Update product page**
- Add AddToCartButton to `[product].astro`
- Pass product data as props

**Files:**
- `wv-wild-web/src/layouts/CartLayout.astro`
- `wv-wild-web/src/layouts/Layout.astro` (modify)
- `wv-wild-web/src/components/Header.tsx` (new React version)
- `wv-wild-web/src/pages/shop/[category]/[product].astro` (modify)

---

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| State management | React Context + useReducer | Simple, no external deps, matches existing patterns |
| Persistence | localStorage | Guest checkout, no backend required per spec |
| Drawer component | shadcn Sheet | Consistent with existing UI library |
| Notifications | shadcn Toast | Consistent styling, accessibility built-in |
| Header conversion | Astro → React | Required for cart icon state; use client:load |
| Analytics | Console debug | Placeholder for future integration, minimal overhead |

---

## Dependencies

### External (to install)
```bash
# shadcn components (uses existing @radix-ui packages)
npx shadcn@latest add sheet toast
```

### Internal (existing)
- `types/product.ts` — Product interface
- `lib/products.ts` — getProductTier(), isFirearm(), getMaxQuantity()
- `components/ui/button.tsx` — Button variants
- `components/ui/badge.tsx` — Badge variants
- `lucide-react` — Icons (ShoppingBag, Plus, Minus, X)

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Header hydration flash | Medium | Low | Use client:load, CSS for initial state |
| localStorage quota exceeded | Low | Low | Session-only fallback implemented |
| Schema migration breaks | Low | Medium | Versioned schema, clear-on-fail strategy |
| shadcn sheet conflicts | Low | Low | Using official components, tested patterns |

---

## PR Strategy

**Estimated Total LOC:** ~550

### PR 1: Cart Infrastructure (~150 LOC)
- shadcn sheet + toast installation
- CartProvider.tsx
- cart-analytics.ts
- No visible UI changes yet

**Checkpoint:** Context works, localStorage persists

### PR 2: Cart UI Components (~300 LOC)
- All cart components (Icon, Drawer, Item, Summary, AddToCart)
- Barrel export
- Can test in isolation with mock data

**Checkpoint:** Cart UI renders, all states visible

### PR 3: Integration (~100 LOC)
- CartLayout wrapper
- Header conversion to React
- Product page integration
- Full e2e flow works

**Checkpoint:** Complete add-to-cart flow functional

---

## Testing Strategy

### Manual Testing (per spec checklist)
- [ ] Add shippable item to cart
- [ ] Add ammo (pickup only) to cart
- [ ] Reserve firearm (max 1 per SKU)
- [ ] Enforce max 3 firearms per order
- [ ] Quantity +/- respects maxQuantity
- [ ] Remove item from cart
- [ ] Clear entire cart
- [ ] Cart persists on page refresh
- [ ] Cart expires after 24 hours
- [ ] localStorage unavailable: session-only mode
- [ ] Schema migration works
- [ ] Empty cart state displays
- [ ] Fulfillment notices display
- [ ] Mobile drawer usable
- [ ] Keyboard navigation works
- [ ] Analytics events fire (console)

### Browser Testing
- Chrome (primary)
- Safari (iOS)
- Firefox
- Private browsing mode (localStorage disabled)

---

## Rollback Plan

1. **PR-level rollback:** Revert individual PRs via git
2. **Feature flag:** Not needed (cart is additive, no breaking changes)
3. **Data rollback:** localStorage can be cleared client-side; no server state

---

## Files to Create/Modify

### New Files
| File | LOC Est | PR |
|------|---------|-----|
| `components/cart/CartProvider.tsx` | 120 | 1 |
| `lib/cart-analytics.ts` | 30 | 1 |
| `components/ui/sheet.tsx` | ~80 | 1 |
| `components/ui/toast.tsx` | ~60 | 1 |
| `components/cart/CartIcon.tsx` | 40 | 2 |
| `components/cart/CartDrawer.tsx` | 100 | 2 |
| `components/cart/CartItem.tsx` | 80 | 2 |
| `components/cart/CartSummary.tsx` | 40 | 2 |
| `components/cart/AddToCartButton.tsx` | 60 | 2 |
| `components/cart/index.ts` | 10 | 2 |
| `components/Header.tsx` | 60 | 3 |
| `layouts/CartLayout.astro` | 20 | 3 |

### Modified Files
| File | Changes | PR |
|------|---------|-----|
| `layouts/Layout.astro` | Wrap with CartLayout | 3 |
| `pages/shop/[category]/[product].astro` | Add AddToCartButton | 3 |
| `components/Header.astro` | Deprecate (keep for fallback) | 3 |

---

## Open Questions (Resolved)

All questions resolved via `/speckit.clarify`:
- ✅ Price/stock changes → Best-effort notice, validate at checkout
- ✅ localStorage unavailable → Session-only fallback with notice
- ✅ Analytics → Basic events (add, remove, begin_checkout)
- ✅ Multi-tab → Independent carts, last-write-wins
- ✅ Schema versioning → Version + migrate, clear if unrecoverable
