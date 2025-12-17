/**
 * Cart Analytics Helper
 *
 * Fires basic analytics events for cart actions.
 * Currently logs to console; can be extended to integrate with
 * Google Analytics, Plausible, or other providers.
 */

export type CartAnalyticsEvent =
  | { event: 'add_to_cart'; productId: string; sku: string; quantity: number; price: number }
  | { event: 'remove_from_cart'; productId: string; sku: string }
  | { event: 'begin_checkout'; itemCount: number; subtotal: number };

/**
 * Track a cart analytics event.
 *
 * @param event - The analytics event to track
 *
 * @example
 * trackCartEvent({
 *   event: 'add_to_cart',
 *   productId: 'prod_123',
 *   sku: 'SKU-001',
 *   quantity: 1,
 *   price: 2999
 * });
 */
export function trackCartEvent(event: CartAnalyticsEvent): void {
  // Log to console for debugging
  console.debug('[Cart Analytics]', event);

  // Integration point for analytics providers
  // Example: Google Analytics 4
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', event.event, {
  //     ...event,
  //     currency: 'USD',
  //     value: 'price' in event ? event.price / 100 : undefined,
  //   });
  // }

  // Example: Plausible
  // if (typeof window !== 'undefined' && window.plausible) {
  //   window.plausible(event.event, { props: event });
  // }
}
