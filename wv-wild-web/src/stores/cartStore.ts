/**
 * Cart Store (nanostores)
 *
 * Lightweight shopping cart using nanostores for framework-agnostic state management.
 * Supports three product tiers with appropriate restrictions:
 * - Tier 1: Shippable items (ship_or_pickup)
 * - Tier 2: Pickup-only items like ammo (pickup_only)
 * - Tier 3: FFL firearms requiring reserve (reserve_hold)
 */

import { atom, map, computed } from 'nanostores';

// Schema version for localStorage migration support
const CART_SCHEMA_VERSION = 1;
const CART_STORAGE_KEY = 'wvwo_cart';
const CART_EXPIRY_HOURS = 24;

// ============================================================================
// Types
// ============================================================================

export type FulfillmentType = 'ship_or_pickup' | 'pickup_only' | 'reserve_hold';

export interface CartItem {
  productId: string;
  sku: string;
  name: string;
  shortName: string;
  price: number;           // Price in cents
  priceDisplay: string;
  quantity: number;
  maxQuantity: number;
  image: string;
  fulfillmentType: FulfillmentType;
  fflRequired: boolean;
  ageRestriction?: 18 | 21;
}

export interface CartState {
  schemaVersion: number;
  items: Record<string, CartItem>;  // Using Record for easier lookup
  lastUpdated: string;              // ISO timestamp
  sessionId: string;                // UUID for tracking
}

export interface CartSummaryData {
  itemCount: number;
  subtotal: number;        // In cents
  hasShippableItems: boolean;
  hasPickupOnlyItems: boolean;
  hasFirearms: boolean;
  requiresAgeVerification: boolean;
  fulfillmentOptions: ('ship' | 'pickup')[];
}

// ============================================================================
// Utilities
// ============================================================================

function generateSessionId(): string {
  return crypto.randomUUID();
}

function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

function calculateSummary(items: Record<string, CartItem>): CartSummaryData {
  const itemsArray = Object.values(items);

  const hasShippableItems = itemsArray.some(
    (item) => item.fulfillmentType === 'ship_or_pickup'
  );
  const hasPickupOnlyItems = itemsArray.some(
    (item) => item.fulfillmentType === 'pickup_only'
  );
  const hasFirearms = itemsArray.some(
    (item) => item.fulfillmentType === 'reserve_hold'
  );
  const requiresAgeVerification = itemsArray.some(
    (item) => item.ageRestriction !== undefined
  );

  // Determine available fulfillment options
  const fulfillmentOptions: ('ship' | 'pickup')[] = [];
  if (hasShippableItems && !hasFirearms && !hasPickupOnlyItems) {
    fulfillmentOptions.push('ship', 'pickup');
  } else if (hasShippableItems && hasPickupOnlyItems && !hasFirearms) {
    // Mixed cart with pickup-only - customer can choose
    fulfillmentOptions.push('ship', 'pickup');
  } else {
    // Firearms in cart = entire order is pickup only
    fulfillmentOptions.push('pickup');
  }

  return {
    itemCount: itemsArray.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: itemsArray.reduce((sum, item) => sum + item.price * item.quantity, 0),
    hasShippableItems,
    hasPickupOnlyItems,
    hasFirearms,
    requiresAgeVerification,
    fulfillmentOptions,
  };
}

// ============================================================================
// Stores
// ============================================================================

// Core cart state
export const $cartState = map<CartState>({
  schemaVersion: CART_SCHEMA_VERSION,
  items: {},
  lastUpdated: new Date().toISOString(),
  sessionId: generateSessionId(),
});

// Cart drawer open/closed
export const $isCartOpen = atom(false);

// Computed values
export const $cartItems = computed($cartState, (state) => state.items);

export const $itemCount = computed($cartState, (state) => {
  const items = Object.values(state.items);
  return items.reduce((sum, item) => sum + item.quantity, 0);
});

export const $subtotal = computed($cartState, (state) => {
  const items = Object.values(state.items);
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

export const $summary = computed($cartState, (state) => {
  return calculateSummary(state.items);
});

// ============================================================================
// Actions
// ============================================================================

/**
 * Add item to cart with validation
 */
export function addItem(item: CartItem): { success: boolean; message: string } {
  const state = $cartState.get();
  const existingItem = state.items[item.productId];

  // Validate quantity
  const newQuantity = existingItem
    ? existingItem.quantity + item.quantity
    : item.quantity;

  if (newQuantity > item.maxQuantity) {
    return {
      success: false,
      message: `Maximum ${item.maxQuantity} per order`,
    };
  }

  // Firearms: max 1 per SKU, max 3 total
  if (item.fulfillmentType === 'reserve_hold') {
    const firearmCount = Object.values(state.items).filter(
      (i) => i.fulfillmentType === 'reserve_hold'
    ).length;

    if (existingItem) {
      return {
        success: false,
        message: 'This firearm is already reserved',
      };
    }

    if (firearmCount >= 3) {
      return {
        success: false,
        message: 'Maximum 3 firearms per order',
      };
    }
  }

  // Add or update the item
  if (existingItem) {
    $cartState.setKey('items', {
      ...state.items,
      [item.productId]: {
        ...existingItem,
        quantity: Math.min(
          existingItem.quantity + item.quantity,
          existingItem.maxQuantity
        ),
      },
    });
  } else {
    $cartState.setKey('items', {
      ...state.items,
      [item.productId]: item,
    });
  }

  $cartState.setKey('lastUpdated', new Date().toISOString());

  // Optional: Track analytics
  if (typeof window !== 'undefined' && (window as any).trackCartEvent) {
    (window as any).trackCartEvent({
      event: 'add_to_cart',
      productId: item.productId,
      sku: item.sku,
      quantity: item.quantity,
      price: item.price,
    });
  }

  return {
    success: true,
    message: `${item.shortName} added to cart`,
  };
}

/**
 * Remove item from cart
 */
export function removeItem(productId: string): void {
  const state = $cartState.get();
  const item = state.items[productId];

  if (!item) return;

  const { [productId]: removed, ...rest } = state.items;

  $cartState.setKey('items', rest);
  $cartState.setKey('lastUpdated', new Date().toISOString());

  // Optional: Track analytics
  if (typeof window !== 'undefined' && (window as any).trackCartEvent) {
    (window as any).trackCartEvent({
      event: 'remove_from_cart',
      productId: item.productId,
      sku: item.sku,
    });
  }
}

/**
 * Update item quantity (0 or less removes item)
 */
export function updateQuantity(productId: string, quantity: number): void {
  if (quantity <= 0) {
    removeItem(productId);
    return;
  }

  const state = $cartState.get();
  const item = state.items[productId];

  if (!item) return;

  $cartState.setKey('items', {
    ...state.items,
    [productId]: {
      ...item,
      quantity: Math.min(quantity, item.maxQuantity),
    },
  });

  $cartState.setKey('lastUpdated', new Date().toISOString());
}

/**
 * Clear all items from cart
 */
export function clearCart(): void {
  $cartState.setKey('items', {});
  $cartState.setKey('lastUpdated', new Date().toISOString());
}

/**
 * Toggle cart drawer
 */
export function toggleCart(): void {
  $isCartOpen.set(!$isCartOpen.get());
}

/**
 * Open cart drawer
 */
export function openCart(): void {
  $isCartOpen.set(true);
}

/**
 * Close cart drawer
 */
export function closeCart(): void {
  $isCartOpen.set(false);
}

// ============================================================================
// localStorage Persistence
// ============================================================================

if (typeof window !== 'undefined') {
  // Load from localStorage on init
  if (isLocalStorageAvailable()) {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartState;

        // Validate cart isn't stale (24 hour expiry)
        const lastUpdated = new Date(parsed.lastUpdated);
        const hoursSinceUpdate =
          (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60);

        if (hoursSinceUpdate < CART_EXPIRY_HOURS) {
          // Schema version check
          if (parsed.schemaVersion === CART_SCHEMA_VERSION) {
            $cartState.set(parsed);
          } else {
            // Clear incompatible schema
            localStorage.removeItem(CART_STORAGE_KEY);
          }
        } else {
          // Clear stale cart
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }

  // Subscribe to changes and save to localStorage
  $cartState.subscribe((state) => {
    if (!isLocalStorageAvailable()) return;

    if (Object.keys(state.items).length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  });
}

// ============================================================================
// Utility: Format price from cents
// ============================================================================

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}
