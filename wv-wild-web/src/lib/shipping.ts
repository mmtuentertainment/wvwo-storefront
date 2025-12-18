/**
 * Shipping Rate Calculation
 *
 * Flat-rate shipping by zone for MVP.
 * Based on distance from Birch River, WV.
 */

// ============================================================================
// Shipping Zones
// ============================================================================

/**
 * Zone 1: Local / Regional (WV + bordering states)
 * Zone 2: Mid-Atlantic / Southeast
 * Zone 3: National (everywhere else)
 */
type ShippingZone = 1 | 2 | 3;

// State to zone mapping
const STATE_ZONES: Record<string, ShippingZone> = {
  // Zone 1: WV + bordering states
  WV: 1,
  VA: 1,
  MD: 1,
  PA: 1,
  OH: 1,
  KY: 1,

  // Zone 2: Regional (within ~500 miles)
  NC: 2,
  SC: 2,
  TN: 2,
  GA: 2,
  IN: 2,
  MI: 2,
  NY: 2,
  NJ: 2,
  DE: 2,
  DC: 2,
  CT: 2,
  MA: 2,
  RI: 2,
  VT: 2,
  NH: 2,
  ME: 2,
  AL: 2,
  MS: 2,
  IL: 2,
  WI: 2,

  // Zone 3: National (default for all others)
  // FL, LA, TX, OK, AR, MO, IA, MN, ND, SD, NE, KS, etc.
};

// ============================================================================
// Shipping Rates (in cents)
// ============================================================================

interface ShippingRate {
  standard: number;
  description: string;
  estimatedDays: string;
}

const ZONE_RATES: Record<ShippingZone, ShippingRate> = {
  1: {
    standard: 799,  // $7.99
    description: 'Regional shipping',
    estimatedDays: '3-5 business days',
  },
  2: {
    standard: 1199, // $11.99
    description: 'Standard shipping',
    estimatedDays: '5-7 business days',
  },
  3: {
    standard: 1499, // $14.99
    description: 'Standard shipping',
    estimatedDays: '7-10 business days',
  },
};

// Free shipping threshold (in cents)
const FREE_SHIPPING_THRESHOLD = 9900; // $99.00

// ============================================================================
// Calculation Functions
// ============================================================================

/**
 * Resolve the shipping zone for a US state postal code.
 *
 * @param stateCode - Two-letter US state postal code (case-insensitive)
 * @returns The shipping zone: 1, 2, or 3; defaults to 3 when the state code is not mapped
 */
export function getShippingZone(stateCode: string): ShippingZone {
  return STATE_ZONES[stateCode.toUpperCase()] ?? 3;
}

/**
 * Compute the shipping rate and whether shipping is free for an order.
 *
 * @param stateCode - A US postal state code (case-insensitive) used to determine the shipping zone
 * @param subtotal - Order subtotal in cents
 * @returns The selected shipping rate augmented with `cost` (shipping cost in cents) and `isFree` (`true` if `subtotal` meets or exceeds the free-shipping threshold, `false` otherwise)
 */
export function calculateShipping(
  stateCode: string,
  subtotal: number
): ShippingRate & { cost: number; isFree: boolean } {
  const zone = getShippingZone(stateCode);
  const rate = ZONE_RATES[zone];

  // Free shipping for orders over threshold
  const isFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const cost = isFree ? 0 : rate.standard;

  return {
    ...rate,
    cost,
    isFree,
  };
}

/**
 * Produce the storefront shipping label for a given destination and subtotal.
 *
 * @param stateCode - Optional two-letter US state code; when omitted the function prompts for an address
 * @param subtotal - Cart subtotal in cents used to determine free-shipping eligibility
 * @returns The shipping label: "Enter address for shipping" if `stateCode` is missing, "FREE" when free shipping applies, or a formatted price string like "$X.XX" for the calculated cost
 */
export function getShippingDisplay(
  stateCode: string | undefined,
  subtotal: number
): string {
  if (!stateCode) {
    return 'Enter address for shipping';
  }

  const shipping = calculateShipping(stateCode, subtotal);

  if (shipping.isFree) {
    return 'FREE';
  }

  return formatShippingPrice(shipping.cost);
}

/**
 * Formats a shipping amount in cents into a display string.
 *
 * @param cents - The amount in cents
 * @returns A formatted price like `$X.XX`, or `'FREE'` when `cents` is 0
 */
export function formatShippingPrice(cents: number): string {
  if (cents === 0) return 'FREE';
  return `$${(cents / 100).toFixed(2)}`;
}

/**
 * Compute the remaining amount (in cents) required to reach the free-shipping threshold.
 *
 * @param subtotal - Order subtotal in cents
 * @returns The number of cents remaining to qualify for free shipping, or 0 if the threshold is already met
 */
export function getAmountForFreeShipping(subtotal: number): number {
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  return remaining > 0 ? remaining : 0;
}

/**
 * Determines whether an order subtotal meets the free-shipping threshold.
 *
 * @param subtotal - Order subtotal in cents
 * @returns `true` if `subtotal` is greater than or equal to the free-shipping threshold, `false` otherwise.
 */
export function qualifiesForFreeShipping(subtotal: number): boolean {
  return subtotal >= FREE_SHIPPING_THRESHOLD;
}

// ============================================================================
// Constants Export
// ============================================================================

export const SHIPPING_CONFIG = {
  freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
  zones: ZONE_RATES,
};