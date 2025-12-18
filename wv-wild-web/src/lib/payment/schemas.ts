/**
 * Payment Integration Schemas
 *
 * Zod schemas for runtime validation of payment data.
 * Ensures type safety at API boundaries (client ↔ worker ↔ Tactical Payments).
 */

import { z } from 'zod';

// ============================================================================
// Payment Request Schema
// ============================================================================

export const paymentRequestSchema = z.object({
  orderId: z
    .string()
    .regex(/^WVWO-\d{4}-\d{6}$/, 'Invalid order ID format'),

  amount: z
    .number()
    .int('Amount must be in cents (integer)')
    .positive('Amount must be positive'),

  currency: z.literal('USD'),

  customer: z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  }),

  items: z.array(
    z.object({
      sku: z.string().min(1),
      name: z.string().min(1),
      quantity: z.number().int().positive(),
      price: z.number().int().positive(),
    })
  ).min(1, 'At least one item required'),

  returnUrl: z.string().url(),
  cancelUrl: z.string().url(),
  webhookUrl: z.string().url(),
});

export type PaymentRequestData = z.infer<typeof paymentRequestSchema>;

// ============================================================================
// Payment Return Schema (URL params)
// ============================================================================

export const paymentReturnSchema = z.object({
  paymentId: z.string().min(1),
  orderId: z.string().regex(/^WVWO-\d{4}-\d{6}$/),
  status: z.enum(['success', 'declined', 'cancelled', 'error', 'pending']),
  errorMessage: z.string().optional(),
});

export type PaymentReturnData = z.infer<typeof paymentReturnSchema>;

// ============================================================================
// Webhook Event Schema
// ============================================================================

export const webhookEventSchema = z.object({
  /** Event ID from Tactical Payments */
  id: z.string(),

  /** Event type */
  type: z.enum([
    'payment.completed',
    'payment.failed',
    'payment.refunded',
    'payment.disputed',
  ]),

  /** Payment ID */
  payment_id: z.string(),

  /** Order ID (WVWO-YYYY-NNNNNN) */
  order_id: z.string().regex(/^WVWO-\d{4}-\d{6}$/),

  /** Amount in cents */
  amount: z.number().int().positive(),

  /** Payment status */
  status: z.enum(['paid', 'failed', 'refunded', 'disputed']),

  /** Event timestamp (ISO 8601) */
  timestamp: z.string().datetime(),

  /** Optional metadata */
  metadata: z.record(z.unknown()).optional(),
});

export type TacticalWebhookEvent = z.infer<typeof webhookEventSchema>;

// ============================================================================
// Order Status Record (KV Storage)
// ============================================================================

export const orderStatusRecordSchema = z.object({
  /** Order ID */
  id: z.string().regex(/^WVWO-\d{4}-\d{6}$/),

  /** Payment status */
  status: z.enum(['pending_payment', 'paid', 'failed', 'refunded', 'disputed']),

  /** Payment ID from processor */
  paymentId: z.string().optional(),

  /** When payment was completed (ISO 8601) */
  paidAt: z.string().datetime().optional(),

  /** Customer email for notifications */
  email: z.string().email(),

  /** Total amount in cents */
  total: z.number().int().positive(),

  /** Order creation timestamp */
  createdAt: z.string().datetime(),

  /** Last update timestamp */
  updatedAt: z.string().datetime(),
});

export type OrderStatusRecord = z.infer<typeof orderStatusRecordSchema>;

// ============================================================================
// Create Session Response (from Cloudflare Worker)
// ============================================================================

export const createSessionResponseSchema = z.object({
  success: z.boolean(),
  redirectUrl: z.string().url().optional(),
  sessionId: z.string().optional(),
  error: z.string().optional(),
});

export type CreateSessionResponse = z.infer<typeof createSessionResponseSchema>;

// ============================================================================
// Order Status Response (from status endpoint)
// ============================================================================

export const orderStatusResponseSchema = z.object({
  status: z.enum(['pending_payment', 'paid', 'failed', 'refunded', 'disputed']),
  paymentId: z.string().optional(),
  paidAt: z.string().datetime().optional(),
});

export type OrderStatusResponse = z.infer<typeof orderStatusResponseSchema>;
