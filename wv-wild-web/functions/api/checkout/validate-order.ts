/**
 * Validate Order Worker
 *
 * Server-side validation for checkout orders.
 * CRITICAL: Re-validates state restrictions for firearms purchases.
 *
 * Federal law (18 U.S.C. § 922(b)(3)):
 * - Handguns: Can ONLY be sold to WV residents
 * - Long guns: Can be sold to contiguous states (WV, OH, PA, MD, VA, KY)
 *
 * Why server-side validation is required:
 * - Client-side validation in checkoutSchema.ts can be bypassed via DevTools
 * - Federal firearms violations carry criminal penalties
 * - This worker provides the authoritative validation layer
 */

import { z } from 'zod';

interface Env {
  // No secrets needed for validation
}

// Validation schema for incoming order
const orderValidationSchema = z.object({
  items: z.array(
    z.object({
      sku: z.string(),
      fflRequired: z.boolean(),
      fulfillmentType: z.enum(['ship_or_pickup', 'pickup_only', 'reserve_hold']),
    })
  ),
  shippingAddress: z
    .object({
      state: z.string().length(2),
    })
    .optional(),
  fulfillment: z.enum(['ship', 'pickup']),
  hasHandguns: z.boolean(),
  hasLongGuns: z.boolean(),
});

// Contiguous states for long gun sales per 18 U.S.C. § 922(b)(3)
const CONTIGUOUS_STATES = ['WV', 'OH', 'PA', 'MD', 'VA', 'KY'];

// Cloudflare Pages Function handler
export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request } = context;

  try {
    const body = await request.json();
    const validation = orderValidationSchema.safeParse(body);

    if (!validation.success) {
      return new Response(
        JSON.stringify({
          valid: false,
          error: 'Invalid order data',
          details: validation.error.issues,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const order = validation.data;

    // Determine customer state:
    // - For shipping: use shipping address state
    // - For pickup: customer is physically in WV (always valid)
    const customerState =
      order.shippingAddress?.state?.toUpperCase() ||
      (order.fulfillment === 'pickup' ? 'WV' : undefined);

    // CRITICAL: Validate handgun state restriction
    // 18 U.S.C. § 922(b)(3): Handguns can ONLY be sold to WV residents
    if (order.hasHandguns && customerState !== 'WV') {
      console.warn('[validate-order] BLOCKED: Out-of-state handgun purchase attempted', {
        customerState,
        timestamp: new Date().toISOString(),
      });

      return new Response(
        JSON.stringify({
          valid: false,
          error:
            'Federal law (18 U.S.C. § 922(b)(3)) prohibits out-of-state handgun sales. Handgun purchases require WV residency.',
          code: 'HANDGUN_STATE_RESTRICTION',
        }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate long gun state restriction (contiguous states only)
    // 18 U.S.C. § 922(b)(3): Long guns can be sold to residents of contiguous states
    if (
      order.hasLongGuns &&
      !order.hasHandguns &&
      customerState &&
      !CONTIGUOUS_STATES.includes(customerState)
    ) {
      console.warn('[validate-order] BLOCKED: Non-contiguous state long gun purchase', {
        customerState,
        timestamp: new Date().toISOString(),
      });

      return new Response(
        JSON.stringify({
          valid: false,
          error:
            'Long gun sales are only available to residents of WV and contiguous states (OH, PA, MD, VA, KY).',
          code: 'LONGGUN_STATE_RESTRICTION',
        }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // All validations passed
    return new Response(
      JSON.stringify({
        valid: true,
        message: 'Order validation passed',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('[validate-order] Unexpected error:', error);
    return new Response(
      JSON.stringify({
        valid: false,
        error: 'Validation failed. Please try again or call us at (304) 649-5765.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
