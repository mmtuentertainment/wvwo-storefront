/**
 * Cart Provider
 *
 * React Context-based shopping cart with localStorage persistence.
 * Supports three product tiers with appropriate restrictions:
 * - Tier 1: Shippable items (ship_or_pickup)
 * - Tier 2: Pickup-only items like ammo (pickup_only)
 * - Tier 3: FFL firearms requiring reserve (reserve_hold)
 */

import * as React from 'react';
import { trackCartEvent } from '@/lib/cart-analytics';

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
  items: CartItem[];
  lastUpdated: string;     // ISO timestamp
  sessionId: string;       // UUID for tracking
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;        // In cents
  hasShippableItems: boolean;
  hasPickupOnlyItems: boolean;
  hasFirearms: boolean;
  requiresAgeVerification: boolean;
  fulfillmentOptions: ('ship' | 'pickup')[];
}

type PersistenceMode = 'local' | 'session';

// ============================================================================
// Actions
// ============================================================================

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartState };

// ============================================================================
// Reducer
// ============================================================================

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingIndex >= 0) {
        // Update existing item quantity
        const items = [...state.items];
        const existing = items[existingIndex];
        items[existingIndex] = {
          ...existing,
          quantity: Math.min(
            existing.quantity + action.payload.quantity,
            existing.maxQuantity
          ),
        };
        return {
          ...state,
          items,
          lastUpdated: new Date().toISOString(),
        };
      }

      // Add new item
      return {
        ...state,
        items: [...state.items, action.payload],
        lastUpdated: new Date().toISOString(),
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.productId !== action.payload.productId
        ),
        lastUpdated: new Date().toISOString(),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return {
          ...state,
          items: state.items.filter((item) => item.productId !== productId),
          lastUpdated: new Date().toISOString(),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.min(quantity, item.maxQuantity) }
            : item
        ),
        lastUpdated: new Date().toISOString(),
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        lastUpdated: new Date().toISOString(),
      };
    }

    case 'HYDRATE': {
      return action.payload;
    }

    default:
      return state;
  }
}

// ============================================================================
// Utilities
// ============================================================================

function generateSessionId(): string {
  return crypto.randomUUID();
}

function createInitialState(): CartState {
  return {
    schemaVersion: CART_SCHEMA_VERSION,
    items: [],
    lastUpdated: new Date().toISOString(),
    sessionId: generateSessionId(),
  };
}

function isLocalStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Migrate old cart schema to current version.
 * Returns null if migration is not possible.
 */
function migrateCart(oldCart: unknown): CartState | null {
  if (!oldCart || typeof oldCart !== 'object') {
    return null;
  }

  const cart = oldCart as Record<string, unknown>;

  // v0 → v1: Add schemaVersion field
  if (!('schemaVersion' in cart)) {
    return {
      ...(cart as unknown as CartState),
      schemaVersion: 1,
    };
  }

  // Unknown version - can't migrate
  return null;
}

function calculateSummary(items: CartItem[]): CartSummary {
  const hasShippableItems = items.some(
    (item) => item.fulfillmentType === 'ship_or_pickup'
  );
  const hasPickupOnlyItems = items.some(
    (item) => item.fulfillmentType === 'pickup_only'
  );
  const hasFirearms = items.some(
    (item) => item.fulfillmentType === 'reserve_hold'
  );
  const requiresAgeVerification = items.some(
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
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    hasShippableItems,
    hasPickupOnlyItems,
    hasFirearms,
    requiresAgeVerification,
    fulfillmentOptions,
  };
}

// ============================================================================
// Context
// ============================================================================

interface CartContextValue {
  state: CartState;
  summary: CartSummary;
  persistenceMode: PersistenceMode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: CartItem) => { success: boolean; message: string };
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextValue | null>(null);

// ============================================================================
// Provider
// ============================================================================

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = React.useReducer(cartReducer, null, createInitialState);
  const [persistenceMode, setPersistenceMode] = React.useState<PersistenceMode>('local');
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Hydrate from localStorage on mount
  React.useEffect(() => {
    if (!isLocalStorageAvailable()) {
      setPersistenceMode('session');
      setIsHydrated(true);
      return;
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
          setIsHydrated(true);
          return;
        }

        // Validate cart isn't stale (24 hour expiry)
        const lastUpdated = new Date(parsed.lastUpdated);
        const hoursSinceUpdate =
          (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60);

        if (hoursSinceUpdate < CART_EXPIRY_HOURS) {
          dispatch({ type: 'HYDRATE', payload: parsed });
        } else {
          // Clear stale cart
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
    setIsHydrated(true);
  }, []);

  // Persist to localStorage on change
  React.useEffect(() => {
    if (!isHydrated) return;
    if (persistenceMode !== 'local') return;

    if (state.items.length > 0) {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({
          ...state,
          schemaVersion: CART_SCHEMA_VERSION,
          lastUpdated: new Date().toISOString(),
        })
      );
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [state, persistenceMode, isHydrated]);

  // Calculate summary
  const summary = React.useMemo(() => calculateSummary(state.items), [state.items]);

  // Action: Add item with validation
  const addItem = React.useCallback(
    (item: CartItem): { success: boolean; message: string } => {
      const existingItem = state.items.find((i) => i.productId === item.productId);

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
        const firearmCount = state.items.filter(
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

      // Add the item
      dispatch({ type: 'ADD_ITEM', payload: item });

      // Track analytics
      trackCartEvent({
        event: 'add_to_cart',
        productId: item.productId,
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
      });

      return {
        success: true,
        message: `${item.shortName} added to cart`,
      };
    },
    [state.items]
  );

  // Action: Remove item
  const removeItem = React.useCallback((productId: string) => {
    const item = state.items.find((i) => i.productId === productId);
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });

    if (item) {
      trackCartEvent({
        event: 'remove_from_cart',
        productId: item.productId,
        sku: item.sku,
      });
    }
  }, [state.items]);

  // Action: Update quantity
  const updateQuantity = React.useCallback(
    (productId: string, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    },
    []
  );

  // Action: Clear cart
  const clearCart = React.useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const value: CartContextValue = {
    state,
    summary,
    persistenceMode,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ============================================================================
// Hook
// ============================================================================

export function useCart(): CartContextValue {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
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
