# Tasks: Cart System

**Plan Version:** 1.0.0
**Generated:** 2025-12-17
**Status:** Ready for Implementation

---

## Task Legend

- `[P]` Parallelizable - can run concurrently with other [P] tasks
- `[S]` Sequential - depends on previous tasks
- `[ ]` Not started
- `[X]` Completed
- `[~]` In progress

---

## Phase 1: Infrastructure

### 1.1 shadcn Setup

- [ ] [S] Install shadcn Sheet component (`npx shadcn@latest add sheet`)
- [ ] [P] Install shadcn Toast component (`npx shadcn@latest add toast`)
- [ ] [S] Verify WVWO overrides apply (rounded-sm, brand colors)

### 1.2 Cart Analytics

- [ ] [P] Create `lib/cart-analytics.ts` with CartAnalyticsEvent type
- [ ] [P] Implement trackCartEvent() function with console.debug

### 1.3 Cart Provider

- [ ] [S] Create `components/cart/` directory structure
- [ ] [S] Define CartState and CartItem interfaces in CartProvider.tsx
- [ ] [S] Implement cartReducer with all action types
- [ ] [S] Add isLocalStorageAvailable() utility
- [ ] [S] Implement localStorage hydration with schema migration
- [ ] [S] Add 24-hour cart expiry logic
- [ ] [S] Implement session-only fallback mode
- [ ] [S] Create CartContext and useCart hook export

<!-- PR-CHECKPOINT: PR 1 - Cart Infrastructure (~150 LOC) -->
<!-- Checkpoint validation: Context works, localStorage persists on refresh -->

---

## Phase 2: UI Components

### 2.1 Cart Icon

- [ ] [P] Create `components/cart/CartIcon.tsx`
- [ ] [P] Add ShoppingBag icon from lucide-react
- [ ] [P] Style count badge (bg-brand-orange, text-white, rounded-full)
- [ ] [P] Wire onClick to open cart drawer

### 2.2 Cart Item Row

- [ ] [P] Create `components/cart/CartItem.tsx`
- [ ] [P] Layout: image (80px), details, controls, price
- [ ] [P] Add fulfillment badges (Pickup Only, Reserved)
- [ ] [P] Implement quantity +/- controls with Button variant="outline"
- [ ] [P] Disable quantity controls for firearms (Qty: 1 text)
- [ ] [P] Add Remove link with red-600 color

### 2.3 Cart Summary

- [ ] [P] Create `components/cart/CartSummary.tsx`
- [ ] [P] Display item count and subtotal
- [ ] [P] Add formatPrice utility (cents to display)
- [ ] [P] Wire Checkout button to fire begin_checkout analytics

### 2.4 Cart Drawer

- [ ] [S] Create `components/cart/CartDrawer.tsx`
- [ ] [S] Implement shadcn Sheet with side="right"
- [ ] [S] Add empty cart state with ShoppingBag icon + CTA
- [ ] [S] Render cart items list with CartItem component
- [ ] [S] Include CartSummary below items
- [ ] [S] Add firearms fulfillment notice (Alert variant)
- [ ] [S] Add pickup-only notice
- [ ] [S] Add "Prices may have changed" notice
- [ ] [S] Add session-only persistence notice when applicable
- [ ] [S] Wire "Proceed to Checkout" button

### 2.5 Add to Cart Button

- [ ] [P] Create `components/cart/AddToCartButton.tsx`
- [ ] [P] Implement Tier 1 variant: "Add to Cart" (variant="cta")
- [ ] [P] Implement Tier 2 variant: "Add to Cart" + Pickup Only badge
- [ ] [P] Implement Tier 3 variant: "Reserve This Firearm" (variant="wvwo")
- [ ] [P] Add button state: "Added ✓" for 2 seconds after success
- [ ] [P] Wire addToCart with all validation (max qty, firearm limits)
- [ ] [P] Fire add_to_cart analytics event

### 2.6 Barrel Export

- [ ] [S] Create `components/cart/index.ts` with all exports

<!-- PR-CHECKPOINT: PR 2 - Cart UI Components (~300 LOC) -->
<!-- Checkpoint validation: Cart UI renders, all states visible in isolation -->

---

## Phase 3: Integration

### 3.1 Layout Integration

- [ ] [S] Create `layouts/CartLayout.astro`
- [ ] [S] Wrap slot with CartProvider
- [ ] [S] Add Toaster component for notifications
- [ ] [S] Update `layouts/Layout.astro` to use CartLayout

### 3.2 Header Integration

- [ ] [S] Create `components/Header.tsx` (React version)
- [ ] [S] Port existing Header.astro markup and mobile menu logic
- [ ] [S] Add CartIcon after Contact button (desktop)
- [ ] [S] Add CartIcon to mobile menu
- [ ] [S] Update Layout.astro to use Header.tsx with client:load
- [ ] [P] Keep Header.astro as fallback (rename to Header.astro.bak)

### 3.3 Product Page Integration

- [ ] [S] Update `pages/shop/[category]/[product].astro`
- [ ] [S] Import AddToCartButton component
- [ ] [S] Pass product data as props with correct tier
- [ ] [S] Add client:visible directive for hydration

### 3.4 CartDrawer Wiring

- [ ] [S] Add CartDrawer to CartLayout (renders globally)
- [ ] [S] Wire CartIcon click to toggle drawer open state

<!-- PR-CHECKPOINT: PR 3 - Integration (~100 LOC) -->
<!-- Checkpoint validation: Full add-to-cart flow works end-to-end -->

---

## Phase 4: Testing & Polish

### 4.1 Core Functionality Testing

- [ ] [P] Test: Add shippable item to cart
- [ ] [P] Test: Add ammo (pickup only) to cart
- [ ] [P] Test: Reserve firearm (max 1 per SKU enforced)
- [ ] [P] Test: Max 3 firearms per order enforced
- [ ] [P] Test: Quantity +/- respects maxQuantity
- [ ] [P] Test: Remove item from cart
- [ ] [P] Test: Clear entire cart

### 4.2 Persistence Testing

- [ ] [P] Test: Cart persists on page refresh
- [ ] [P] Test: Cart expires after 24 hours
- [ ] [P] Test: localStorage disabled → session-only mode with notice
- [ ] [P] Test: Schema migration for old cart format
- [ ] [P] Test: Unknown schema version clears cart

### 4.3 UI State Testing

- [ ] [P] Test: Empty cart state displays correctly
- [ ] [P] Test: Mixed cart shows fulfillment notices
- [ ] [P] Test: "Prices may have changed" notice visible
- [ ] [P] Test: Mobile drawer is usable
- [ ] [P] Test: Keyboard navigation (Escape closes drawer)

### 4.4 Analytics Testing

- [ ] [P] Test: add_to_cart event fires (check console)
- [ ] [P] Test: remove_from_cart event fires
- [ ] [P] Test: begin_checkout event fires

### 4.5 Browser Testing

- [ ] [P] Test in Chrome (primary)
- [ ] [P] Test in Safari/iOS
- [ ] [P] Test in Firefox
- [ ] [P] Test in private browsing mode

<!-- PR-CHECKPOINT: Testing complete, ready for merge -->

---

## PR Summary

| PR | Scope | Est. LOC | Tasks |
|----|-------|----------|-------|
| 1 | Infrastructure | ~150 | 11 |
| 2 | UI Components | ~300 | 26 |
| 3 | Integration | ~100 | 13 |
| — | Testing | — | 24 |

**Total Estimated LOC:** ~550
**Total Tasks:** 74
**Parallelizable Tasks:** 47 (64%)
**Sequential Tasks:** 27 (36%)

---

## Dependencies Graph

```text
[shadcn Install] ──────────────────────────────────────┐
       │                                               │
       v                                               v
[CartProvider] ──────────────────────────────> [CartDrawer]
       │                                               │
       │  ┌─────────────┬─────────────┐               │
       │  v             v             v               │
       │ [CartIcon] [CartItem] [CartSummary]          │
       │      │          │            │               │
       │      └──────────┴────────────┘               │
       │                 │                            │
       v                 v                            v
[cart-analytics] [AddToCartButton] ────────> [CartDrawer complete]
                         │                            │
                         v                            v
               [Product Page] <───────────── [Header.tsx]
                         │                            │
                         └────────────────────────────┘
                                      │
                                      v
                              [CartLayout.astro]
                                      │
                                      v
                              [Layout.astro update]
                                      │
                                      v
                                 [TESTING]

```text

---

## Notes

- **shadcn components** are copied into codebase, not imported from node_modules. Customize WVWO styling in place.
- **Header conversion** is the riskiest change. Keep Header.astro.bak for quick rollback.
- **Testing tasks** are all parallelizable - can be done by multiple testers simultaneously.
- **No backend required** - all state is client-side localStorage.

---

## Quick Start

```bash
# PR 1: Infrastructure
cd wv-wild-web
npx shadcn@latest add sheet toast
# Then create CartProvider.tsx and cart-analytics.ts

# PR 2: UI Components
# Create all components in src/components/cart/

# PR 3: Integration
# Wire everything together in Layout and product pages

```text
