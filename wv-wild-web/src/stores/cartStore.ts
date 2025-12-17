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

// Analytics type declarations
interface CartAnalyticsEvent {
  event: 'add_to_cart' | 'remove_from_cart';
  productId: string;
  sku: string;
  quantity?: number;
  price?: number;
}

declare global {
  interface Window {
    trackCartEvent?: (event: CartAnalyticsEvent) => void;
  }
}

// Schema version for localStorage migration support
const CART_SCHEMA_VERSION = 1;
const CART_STORAGE_KEY = 'wvwo_cart';
const CART_EXPIRY_HOURS = 168; // 7 days (was 24 hours)

// Race condition protection for addItem
let isAddingItem = false;

// ============================================================================
// Types
// ============================================================================

export type FulfillmentType = 'ship_or_pickup' | 'pickup_only' | 'reserve_hold';
export type PersistenceMode = 'persistent' | 'session';

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
  // Fallback for older browsers without crypto.randomUUID()
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Polyfill: generate UUID v4 pattern
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    console.warn('[Cart] localStorage unavailable:', error);
    return false;
  }
}

/**
 * Migrate cart data from older schema versions
 * Returns null if migration is not possible (forces cart clear)
 */
function migrateCart(oldVersion: number, data: CartState): CartState | null {
  try {
    // Currently on v1, no migrations needed yet
    // When we bump to v2, add migration logic here:
    // if (oldVersion === 1 && CART_SCHEMA_VERSION === 2) {
    //   return { ...data, schemaVersion: 2, newField: defaultValue };
    // }

    // Cannot migrate unknown versions
    console.warn(`[Cart] Cannot migrate from schema v${oldVersion} to v${CART_SCHEMA_VERSION}`);
    return null;
  } catch (error) {
    console.error('[Cart] Migration failed:', error);
    return null;
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
    // Only shippable items - both options available
    fulfillmentOptions.push('ship', 'pickup');
  } else if (hasShippableItems && hasPickupOnlyItems && !hasFirearms) {
    // Mixed cart with pickup-only items (e.g., ammo) - both options,
    // pickup-only items will be separated at checkout if shipping selected
    fulfillmentOptions.push('ship', 'pickup');
  } else {
    // All other cases require pickup only:
    // - Cart contains firearms (reserve_hold) - FFL transfer required
    // - Cart contains only pickup_only items (ammo without shippables)
    // - Any combination with firearms forces entire order to pickup
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

// Persistence mode: 'persistent' (localStorage working) | 'session' (fallback)
export const $persistenceMode = atom<PersistenceMode>('persistent');

// User-facing error states for localStorage failures
export const $cartRestoreError = atom<boolean>(false);
export const $cartPersistenceWarning = atom<boolean>(false);

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
 * Includes race condition protection for rapid clicks
 */
export function addItem(item: CartItem): { success: boolean; message: string } {
  // Prevent race conditions from rapid clicks
  if (isAddingItem) {
    return { success: false, message: 'Please wait...' };
  }

  isAddingItem = true;

  // Validate required CartItem fields
  if (!item.productId || !item.sku || !item.name || typeof item.quantity !== 'number' || typeof item.maxQuantity !== 'number') {
    isAddingItem = false;
    return {
      success: false,
      message: 'Invalid product data',
    };
  }

  if (item.quantity < 1) {
    isAddingItem = false;
    return {
      success: false,
      message: 'Quantity must be at least 1',
    };
  }

  try {
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

    // Optional: Track analytics (with error handling)
    if (typeof window !== 'undefined' && window.trackCartEvent) {
      try {
        window.trackCartEvent({
          event: 'add_to_cart',
          productId: item.productId,
          sku: item.sku,
          quantity: item.quantity,
          price: item.price,
        });
      } catch (error) {
        console.error('[Cart] Analytics tracking failed:', error);
      }
    }

    return {
      success: true,
      message: `${item.shortName} added to cart`,
    };
  } finally {
    isAddingItem = false;
  }
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

  // Optional: Track analytics (with error handling)
  if (typeof window !== 'undefined' && window.trackCartEvent) {
    try {
      window.trackCartEvent({
        event: 'remove_from_cart',
        productId: item.productId,
        sku: item.sku,
      });
    } catch (error) {
      console.error('[Cart] Analytics tracking failed:', error);
    }
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

        // Validate cart isn't stale (7 day expiry)
        const lastUpdated = new Date(parsed.lastUpdated);
        const hoursSinceUpdate =
          (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60);

        if (hoursSinceUpdate < CART_EXPIRY_HOURS) {
          // Schema version check
          if (parsed.schemaVersion === CART_SCHEMA_VERSION) {
            $cartState.set(parsed);
          } else {
            // Attempt migration instead of clearing
            const migrated = migrateCart(parsed.schemaVersion, parsed);
            if (migrated) {
              $cartState.set(migrated);
              console.log(`[Cart] Migrated cart from v${parsed.schemaVersion} to v${CART_SCHEMA_VERSION}`);
            } else {
              console.warn('[Cart] Could not migrate cart, clearing data');
              localStorage.removeItem(CART_STORAGE_KEY);
            }
          }
        } else {
          // Clear stale cart
          console.log('[Cart] Cart expired, clearing data');
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      } catch (error) {
        console.error('[Cart] Failed to restore cart from localStorage:', error);
        localStorage.removeItem(CART_STORAGE_KEY);
        // Notify UI that cart restoration failed
        $cartRestoreError.set(true);
      }
    }
  } else {
    // localStorage not available - set session mode
    $persistenceMode.set('session');
  }

  // Subscribe to changes and save to localStorage
  $cartState.subscribe((state) => {
    if (!isLocalStorageAvailable()) return;

    try {
      if (Object.keys(state.items).length > 0) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
      } else {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    } catch (error) {
      console.error('[Cart] Failed to persist cart:', error);
      const prevMode = $persistenceMode.get();
      $persistenceMode.set('session'); // Degrade gracefully
      // Only warn once when degrading from persistent to session
      if (prevMode === 'persistent') {
        $cartPersistenceWarning.set(true);
      }
    }
  });
}

// ============================================================================
// Utility: Format price from cents
// ============================================================================

// Memoized price formatter (avoids recreating Intl.NumberFormat on every call)
const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatPrice(cents: number): string {
  return priceFormatter.format(cents / 100);
}
