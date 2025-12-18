/**
 * Tactical Payments Integration Utilities
 *
 * Utilities for working with Tactical Payments (2A-compliant processor).
 * Handles payment request generation, return URL parsing, and status checking.
 *
 * Integration Pattern: Hosted Payment Page (PCI SAQ-A compliant)
 * - No card data touches WVWO servers
 * - Payment form hosted entirely by Tactical Payments
 * - Webhook is source of truth for payment status
 */

import type { OrderData } from '../orderUtils';

// ============================================================================
// Configuration
// ============================================================================

export const TACTICAL_PAYMENT_CONFIG = {
  /** Processor name for display */
  processorName: 'Tactical Payments',

  /** 2A-friendly badge text */
  badge2A: '2A-Friendly',

  /** API base URL (set via environment variable in production) */
  apiUrl: import.meta.env.PUBLIC_TACTICAL_API_URL || 'https://api.tacticalpay.com',

  /** Sandbox API URL for development */
  sandboxUrl: 'https://api.sandbox.tacticalpay.com',
} as const;

// ============================================================================
// Types
// ============================================================================

export type PaymentStatus = 'success' | 'declined' | 'cancelled' | 'error' | 'pending';

export interface PaymentRequest {
  /** Order ID (WVWO-YYYY-NNNNNN) */
  orderId: string;

  /** Total amount in cents */
  amount: number;

  /** Currency code (always USD for WVWO) */
  currency: 'USD';

  /** Customer contact info */
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  /** Line items for display on payment page */
  items: Array<{
    sku: string;
    name: string;
    quantity: number;
    price: number; // in cents
  }>;

  /** URL to return to after successful payment */
  returnUrl: string;

  /** URL to return to if payment is cancelled */
  cancelUrl: string;

  /** Webhook URL for payment status updates */
  webhookUrl: string;
}

export interface PaymentReturnData {
  /** Payment ID from processor */
  paymentId: string;

  /** Order ID (WVWO-YYYY-NNNNNN) */
  orderId: string;

  /** Payment status */
  status: PaymentStatus;

  /** Optional error message */
  errorMessage?: string;
}

// ============================================================================
// Payment Request Generation
// ============================================================================

/**
 * Creates a payment request object from an order.
 * This data is sent to the create-session worker, which forwards it to Tactical Payments.
 *
 * @param order - Complete order data from checkout
 * @returns Payment request object ready for API submission
 */
export function createPaymentRequest(order: OrderData): PaymentRequest {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://wvwildoutdoors.com';

  return {
    orderId: order.id,
    amount: order.total,
    currency: 'USD',
    customer: {
      firstName: order.contact.firstName,
      lastName: order.contact.lastName,
      email: order.contact.email,
      phone: order.contact.phone,
    },
    items: order.items.map((item) => ({
      sku: item.sku,
      name: item.shortName,
      quantity: item.quantity,
      price: item.price,
    })),
    returnUrl: `${siteUrl}/order-confirmation`,
    cancelUrl: `${siteUrl}/checkout`,
    webhookUrl: `${siteUrl}/api/payment/webhook`,
  };
}

// ============================================================================
// Payment Return URL Parsing
// ============================================================================

/**
 * Parses payment return data from URL search params.
 * Called on /order-confirmation page to extract payment result.
 *
 * Expected URL format:
 * /order-confirmation?payment_id=xxx&order_id=WVWO-2025-123456&status=success
 *
 * @param searchParams - URLSearchParams from window.location.search
 * @returns Parsed payment data or null if invalid
 */
export function parsePaymentReturn(searchParams: URLSearchParams): PaymentReturnData | null {
  const paymentId = searchParams.get('payment_id');
  const orderId = searchParams.get('order_id');
  const statusParam = searchParams.get('status');
  const errorMessage = searchParams.get('error');

  // Validate required params
  if (!paymentId || !orderId || !statusParam) {
    return null;
  }

  // Validate order ID format (WVWO-YYYY-NNNNNN)
  const orderIdPattern = /^WVWO-\d{4}-\d{6}$/;
  if (!orderIdPattern.test(orderId)) {
    return null;
  }

  // Normalize status
  const status = normalizePaymentStatus(statusParam);

  return {
    paymentId,
    orderId,
    status,
    errorMessage: errorMessage || undefined,
  };
}

/**
 * Normalizes payment status string to PaymentStatus type.
 * Handles variations in status parameter from different processors.
 */
function normalizePaymentStatus(status: string): PaymentStatus {
  const normalized = status.toLowerCase();

  if (normalized === 'success' || normalized === 'paid' || normalized === 'completed') {
    return 'success';
  }
  if (normalized === 'declined' || normalized === 'failed') {
    return 'declined';
  }
  if (normalized === 'cancelled' || normalized === 'canceled') {
    return 'cancelled';
  }
  if (normalized === 'pending' || normalized === 'processing') {
    return 'pending';
  }

  return 'error';
}

// ============================================================================
// Payment Status Messages (Kim's Voice)
// ============================================================================

/**
 * Returns user-friendly message for payment status in Kim's authentic voice.
 *
 * @param status - Payment status
 * @returns Message to display to customer
 */
export function getPaymentStatusMessage(status: PaymentStatus): string {
  switch (status) {
    case 'success':
      return "Payment successful! We'll get your order ready.";

    case 'declined':
      return "Card was declined. Want to try a different card?";

    case 'cancelled':
      return "Payment was cancelled. Your order is still waiting if you'd like to try again.";

    case 'pending':
      return "Payment is processing. We'll send you an email when it's confirmed.";

    case 'error':
    default:
      return "Something went wrong processing your payment. Give us a call at (304) 649-5765 and we'll help sort it out.";
  }
}

/**
 * Returns appropriate action text for payment status.
 *
 * @param status - Payment status
 * @returns Action button text
 */
export function getPaymentActionText(status: PaymentStatus): string {
  switch (status) {
    case 'success':
      return 'View Order Details';

    case 'declined':
    case 'cancelled':
      return 'Try Again';

    case 'pending':
      return 'Check Status';

    case 'error':
    default:
      return 'Contact Us';
  }
}
