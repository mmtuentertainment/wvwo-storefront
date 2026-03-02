/**
 * Order Utilities
 *
 * Order ID generation, storage, and types for checkout flow.
 * Includes runtime validation for stored order data.
 */

import { z } from 'zod';
import type { CartItem, CartSummaryData } from '@/stores/cartStore';
import { encrypt, decrypt, isCryptoAvailable } from './crypto';

// ============================================================================
// Types
// ============================================================================

export type FulfillmentMethod = 'ship' | 'pickup';
export type OrderStatus = 'pending_payment' | 'paid' | 'processing' | 'ready_for_pickup' | 'shipped' | 'completed';

/**
 * Result type for storage operations with typed errors
 */
export type StorageResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

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
// Runtime Validation Schema
// ============================================================================

/**
 * Zod schema for validating stored order data.
 * Used to detect corrupted sessionStorage data.
 */
const cartItemSchema = z.object({
  productId: z.string(),
  sku: z.string(),
  name: z.string(),
  shortName: z.string(),
  price: z.number().int().nonnegative(),
  priceDisplay: z.string(),
  quantity: z.number().int().positive(),
  maxQuantity: z.number().int().positive(),
  image: z.string(),
  fulfillmentType: z.enum(['ship_or_pickup', 'pickup_only', 'reserve_hold']),
  fflRequired: z.boolean(),
  ageRestriction: z.union([z.literal(18), z.literal(21)]).optional(),
});

const orderDataSchema = z.object({
  id: z.string().regex(/^WVWO-\d{4}-\d{6}$/),
  createdAt: z.string(),
  contact: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
  fulfillment: z.enum(['ship', 'pickup']),
  shippingAddress: z.object({
    street: z.string(),
    apt: z.string().optional(),
    city: z.string(),
    state: z.string().length(2),
    zip: z.string().regex(/^\d{5}$/),
  }).optional(),
  items: z.array(cartItemSchema),
  subtotal: z.number().int().nonnegative(),
  shipping: z.number().int().nonnegative(),
  tax: z.number().int().nonnegative(),
  total: z.number().int().nonnegative(),
  hasFirearms: z.boolean(),
  hasPickupOnlyItems: z.boolean(),
  reserveAgreed: z.boolean().optional(),
  status: z.enum(['pending_payment', 'paid', 'processing', 'ready_for_pickup', 'shipped', 'completed']),
});

// ============================================================================
// Order ID Generation
// ============================================================================

/**
 * Generates an order ID in format: WVWO-YYYY-NNNNNN
 * Example: WVWO-2025-847291 (year reflects current date)
 *
 * Note: Uses timestamp modulo. NOT cryptographically unique.
 * Collision risk is low but possible within same millisecond.
 * MVP acceptable; Production should use Cloudflare KV counter or UUID.
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
    items,
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
const ORDER_ENCRYPTED_FLAG = 'wvwo_pending_order_encrypted';

/**
 * Store order in sessionStorage for retrieval on confirmation page.
 * PII is encrypted using AES-GCM when Web Crypto API is available.
 *
 * @returns Promise resolving to true if stored successfully, false if storage failed
 *
 * Security: GDPR Article 32 / CCPA compliance via encryption
 */
export async function storePendingOrder(order: OrderData): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    if (isCryptoAvailable()) {
      // Encrypt PII before storing (GDPR/CCPA compliance)
      const encrypted = await encrypt(JSON.stringify(order));
      sessionStorage.setItem(ORDER_STORAGE_KEY, encrypted);
      sessionStorage.setItem(ORDER_ENCRYPTED_FLAG, 'true');
    } else {
      // Fallback for non-HTTPS contexts (local dev only)
      // Production always uses HTTPS via Cloudflare
      console.warn('[Order] Crypto unavailable - storing unencrypted (dev mode only)');
      sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
      sessionStorage.removeItem(ORDER_ENCRYPTED_FLAG);
    }
    return true;
  } catch (error) {
    console.error('[Order] Failed to store order:', error);
    return false;
  }
}

/**
 * Retrieve and validate pending order from sessionStorage.
 * Automatically decrypts if data was stored encrypted.
 *
 * @returns Promise resolving to StorageResult with validated order data or typed error message
 */
export async function getPendingOrder(): Promise<StorageResult<OrderData>> {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Not in browser environment' };
  }

  try {
    const stored = sessionStorage.getItem(ORDER_STORAGE_KEY);
    const isEncrypted = sessionStorage.getItem(ORDER_ENCRYPTED_FLAG) === 'true';

    if (!stored) {
      return { success: false, error: 'No pending order found' };
    }

    // Decrypt if data was stored encrypted
    let jsonData: string;
    if (isEncrypted && isCryptoAvailable()) {
      try {
        jsonData = await decrypt(stored);
      } catch (decryptError) {
        // Decryption failed - key may have changed or data corrupted
        console.error('[Order] Decryption failed:', decryptError);
        sessionStorage.removeItem(ORDER_STORAGE_KEY);
        sessionStorage.removeItem(ORDER_ENCRYPTED_FLAG);
        return { success: false, error: 'Order data could not be decrypted' };
      }
    } else {
      jsonData = stored;
    }

    const parsed = JSON.parse(jsonData);
    const validated = orderDataSchema.safeParse(parsed);

    if (!validated.success) {
      console.error('[Order] Invalid order data:', validated.error.issues);
      // Clear corrupted data to prevent repeated failures
      sessionStorage.removeItem(ORDER_STORAGE_KEY);
      sessionStorage.removeItem(ORDER_ENCRYPTED_FLAG);
      return { success: false, error: 'Order data corrupted' };
    }

    return { success: true, data: validated.data as OrderData };
  } catch (error) {
    console.error('[Order] Failed to retrieve order:', error);
    return { success: false, error: 'Storage access failed' };
  }
}

/**
 * Clear pending order from sessionStorage.
 * Also clears the encryption flag.
 *
 * @returns true if cleared successfully, false if operation failed
 */
export function clearPendingOrder(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    sessionStorage.removeItem(ORDER_STORAGE_KEY);
    sessionStorage.removeItem(ORDER_ENCRYPTED_FLAG);
    return true;
  } catch (error) {
    console.error('[Order] Failed to clear order:', error);
    return false;
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
  return `${contact.firstName} ${contact.lastName}`.trim();
}
