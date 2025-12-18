/**
 * Order Utilities
 *
 * Order ID generation, storage, and types for checkout flow.
 */

import type { CartItem, CartSummaryData } from '@/stores/cartStore';

// ============================================================================
// Types
// ============================================================================

export type FulfillmentMethod = 'ship' | 'pickup';
export type OrderStatus = 'pending_payment' | 'paid' | 'processing' | 'ready_for_pickup' | 'shipped' | 'completed';

export interface ShippingAddress {
  street: string;
  apt?: string;
  city: string;
  state: string;
  zip: string;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface OrderData {
  id: string;
  createdAt: string;
  contact: ContactInfo;
  fulfillment: FulfillmentMethod;
  shippingAddress?: ShippingAddress;
  items: CartItem[];
  subtotal: number;      // In cents
  shipping: number;      // In cents (0 for pickup)
  tax: number;           // In cents
  total: number;         // In cents
  hasFirearms: boolean;
  hasPickupOnlyItems: boolean;
  reserveAgreed?: boolean;
  status: OrderStatus;
}

// ============================================================================
// Order ID Generation
// ============================================================================

/**
 * Create a new order identifier using the WVWO-YYYY-XXXXXX pattern.
 *
 * @returns A string order identifier in the format `WVWO-YYYY-XXXXXX` (for example, `WVWO-2024-A3B7X2`)
 */
export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `WVWO-${year}-${random}`;
}

// ============================================================================
// Tax Calculation (Simplified)
// ============================================================================

// WV sales tax rate
const WV_TAX_RATE = 0.06; // 6%

/**
 * Compute the sales tax amount for an order subtotal.
 *
 * Applies West Virginia tax rules for the MVP: pickup orders are charged WV tax, shipping orders are charged WV tax only when the shipping state is `WV`; out-of-state shipping is taxed as 0.
 *
 * @param shippingState - Two-letter state code for the shipping address, or `undefined` when no shipping address is provided
 * @param fulfillment - Fulfillment method (`'ship'` or `'pickup'`)
 * @returns The tax amount in cents, rounded to the nearest cent
 */
export function calculateTax(
  subtotal: number,
  shippingState: string | undefined,
  fulfillment: FulfillmentMethod
): number {
  // Pickup always charged WV tax
  if (fulfillment === 'pickup') {
    return Math.round(subtotal * WV_TAX_RATE);
  }

  // Shipping: Only charge tax if shipping to WV
  if (shippingState === 'WV') {
    return Math.round(subtotal * WV_TAX_RATE);
  }

  // No tax for out-of-state shipping (simplified nexus)
  return 0;
}

// ============================================================================
// Order Creation
// ============================================================================

export interface CreateOrderParams {
  contact: ContactInfo;
  fulfillment: FulfillmentMethod;
  shippingAddress?: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  summary: CartSummaryData;
  reserveAgreed?: boolean;
}

/**
 * Builds a complete OrderData object from checkout inputs.
 *
 * Computes tax and total, generates an order ID and creation timestamp, flattens item entries,
 * and includes the shipping address only when fulfillment is `'ship'`.
 *
 * @param params - CreateOrderParams containing contact, fulfillment, optional shippingAddress, items, subtotal, shippingCost, summary flags, and optional reserveAgreed
 * @returns The populated OrderData with `id`, `createdAt`, contact and fulfillment details, `items` as an array, monetary fields (`subtotal`, `shipping`, `tax`, `total`), flags (`hasFirearms`, `hasPickupOnlyItems`), `reserveAgreed` if provided, and an initial `status` of `pending_payment`
 */
export function createOrder(params: CreateOrderParams): OrderData {
  const { contact, fulfillment, shippingAddress, items, subtotal, shippingCost, summary, reserveAgreed } = params;

  // Calculate tax
  const shippingState = fulfillment === 'ship' ? shippingAddress?.state : 'WV';
  const tax = calculateTax(subtotal, shippingState, fulfillment);

  // Calculate total
  const total = subtotal + shippingCost + tax;

  return {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    contact,
    fulfillment,
    shippingAddress: fulfillment === 'ship' ? shippingAddress : undefined,
    items: Object.values(items),
    subtotal,
    shipping: shippingCost,
    tax,
    total,
    hasFirearms: summary.hasFirearms,
    hasPickupOnlyItems: summary.hasPickupOnlyItems,
    reserveAgreed,
    status: 'pending_payment',
  };
}

// ============================================================================
// Order Storage (Session-based for MVP)
// ============================================================================

const ORDER_STORAGE_KEY = 'wvwo_pending_order';

/**
 * Persist a pending order in session storage for later retrieval (e.g., on a confirmation page).
 *
 * No-ops when executed outside a browser environment; failures while accessing storage are caught and logged.
 *
 * @param order - The order data to persist for the pending/confirmation flow
 */
export function storePendingOrder(order: OrderData): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch (error) {
    console.error('[Order] Failed to store order:', error);
  }
}

/**
 * Retrieve the pending order stored in sessionStorage for the current session.
 *
 * @returns The stored `OrderData` if present and parseable, `null` if not running in a browser environment, no pending order is stored, or the stored data cannot be parsed.
 */
export function getPendingOrder(): OrderData | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = sessionStorage.getItem(ORDER_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as OrderData;
  } catch (error) {
    console.error('[Order] Failed to retrieve order:', error);
    return null;
  }
}

/**
 * Remove the pending order entry from sessionStorage.
 *
 * Deletes the value stored under `ORDER_STORAGE_KEY` in `sessionStorage`. Does nothing when executed outside a browser environment (no `window`), and suppresses errors that occur during removal.
 */
export function clearPendingOrder(): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.removeItem(ORDER_STORAGE_KEY);
  } catch (error) {
    console.error('[Order] Failed to clear order:', error);
  }
}

// ============================================================================
// Formatting Utilities
// ============================================================================

/**
 * Format an amount in cents as a US dollar currency string.
 *
 * @param cents - Amount in cents
 * @returns A US dollar formatted string (e.g., "$12.34")
 */
export function formatOrderPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

/**
 * Format an ISO 8601 date/time string into a human-readable US date with weekday.
 *
 * @param isoString - An ISO 8601 date or datetime string (for example "2024-03-01T12:00:00Z")
 * @returns The date formatted for the en-US locale as "Weekday, Month Day, Year" (for example "Friday, March 1, 2024")
 */
export function formatOrderDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Construct a display name by combining a contact's first and last name.
 *
 * @param contact - Contact information containing `firstName` and `lastName`
 * @returns The contact's full name in the format `First Last`
 */
export function getFullName(contact: ContactInfo): string {
  return `${contact.firstName} ${contact.lastName}`;
}