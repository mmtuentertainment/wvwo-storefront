/**
 * Create Payment Session Worker
 *
 * Cloudflare Pages Function that creates a Tactical Payments hosted session.
 * Called when user clicks "Pay" button on checkout page.
 *
 * Flow:
 * 1. Receives PaymentRequest from client
 * 2. Validates with Zod schema
 * 3. Calls Tactical Payments API to create hosted session
 * 4. Returns redirect URL to client
 *
 * Security:
 * - API key never exposed to client (server-side only)
 * - Input validation with Zod
 * - HTTPS-only (enforced by Cloudflare)
 */

import { paymentRequestSchema } from '../../../src/lib/payment/schemas';
import type { CreateSessionResponse } from '../../../src/lib/payment/schemas';

interface Env {
  TACTICAL_API_KEY: string;
  TACTICAL_API_URL: string;
}

// Cloudflare Pages Function handler
export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  try {
    // Parse request body
    const body = await request.json();

    // Validate with Zod schema
    const validation = paymentRequestSchema.safeParse(body);
    if (!validation.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Invalid payment request: ${validation.error.message}`,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const paymentRequest = validation.data;

    // Call Tactical Payments API to create hosted session
    const tacticalResponse = await fetch(`${env.TACTICAL_API_URL}/v1/checkout/sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.TACTICAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: paymentRequest.orderId,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        customer: {
          first_name: paymentRequest.customer.firstName,
          last_name: paymentRequest.customer.lastName,
          email: paymentRequest.customer.email,
          phone: paymentRequest.customer.phone,
        },
        items: paymentRequest.items.map((item) => ({
          sku: item.sku,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        return_url: paymentRequest.returnUrl,
        cancel_url: paymentRequest.cancelUrl,
        webhook_url: paymentRequest.webhookUrl,
      }),
    });

    if (!tacticalResponse.ok) {
      const errorText = await tacticalResponse.text();
      console.error('[create-session] Tactical API error:', errorText);

      return new Response(
        JSON.stringify({
          success: false,
          error: "Couldn't create payment session. Please try again or call us at (304) 649-5765.",
        } satisfies CreateSessionResponse),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const tacticalData = await tacticalResponse.json();

    // Return redirect URL to client
    const response: CreateSessionResponse = {
      success: true,
      redirectUrl: tacticalData.hosted_url || tacticalData.checkout_url,
      sessionId: tacticalData.session_id || tacticalData.id,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[create-session] Unexpected error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Something went wrong creating the payment session. Give us a call at (304) 649-5765 and we'll help sort it out.",
      } satisfies CreateSessionResponse),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
