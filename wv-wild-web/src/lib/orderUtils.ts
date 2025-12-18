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
 * Generates a unique order ID in format: WVWO-YYYY-NNNNNN
 * Example: WVWO-2024-847291
 * Note: MVP uses timestamp-based sequence. Production should use Cloudflare KV counter.
 */
export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const sequence = (Date.now() % 1000000).toString().padStart(6, '0');
  return `WVWO-${year}-${sequence}`;
}

// ============================================================================
// Tax Calculation (Simplified)
// ============================================================================

// WV sales tax rate
const WV_TAX_RATE = 0.06; // 6%

/**
 * Calculate sales tax
 * For MVP: Only charge WV tax. Out-of-state shipping has no tax (nexus simplification).
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
 * Create an order object from checkout form data
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
 * Store order in sessionStorage for retrieval on confirmation page
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
 * Retrieve pending order from sessionStorage
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
 * Clear pending order from sessionStorage
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
 * Format order total for display
 */
export function formatOrderPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

/**
 * Format order date for display
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
 * Get full name from contact info
 */
export function getFullName(contact: ContactInfo): string {
  return `${contact.firstName} ${contact.lastName}`;
}
