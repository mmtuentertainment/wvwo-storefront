/**
 * Order Status Endpoint
 *
 * Returns payment status for a specific order.
 * Called by order-confirmation page to check if webhook has updated status.
 *
 * Flow:
 * 1. Client polls this endpoint every 2s with orderId
 * 2. Worker fetches from KV: `order:{orderId}`
 * 3. Returns status: pending_payment | paid | failed | refunded | disputed
 * 4. Client stops polling once status != pending_payment
 *
 * Security:
 * - Order ID format validation (WVWO-YYYY-NNNNNN)
 * - No sensitive data returned (only status, paymentId, paidAt)
 * - Rate limiting recommended (10 req/min per orderId)
 */

import type { OrderStatusResponse, OrderStatusRecord } from '../../../../src/lib/payment/schemas';
import type { KVNamespace } from '@cloudflare/workers-types';

interface Env {
  WVWO_ORDERS: KVNamespace;
}

// Cloudflare Pages Function handler
export const onRequestGet = async (context: { params: { orderId?: string }; env: Env }) => {
  const { params, env } = context;

  try {
    const orderId = params.orderId as string;

    // Validate order ID format
    const orderIdPattern = /^WVWO-\d{4}-\d{6}$/;
    if (!orderIdPattern.test(orderId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid order ID format' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch from KV
    const recordJson = await env.WVWO_ORDERS.get(`order:${orderId}`);

    if (!recordJson) {
      // Order not found in KV (webhook hasn't arrived yet, or order doesn't exist)
      return new Response(
        JSON.stringify({
          status: 'pending_payment',
        } satisfies OrderStatusResponse),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        }
      );
    }

    // Parse and return status
    const record: OrderStatusRecord = JSON.parse(recordJson);

    const response: OrderStatusResponse = {
      status: record.status,
      paymentId: record.paymentId,
      paidAt: record.paidAt,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[order-status] Error:', error);

    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
