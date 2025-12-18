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
  // Zone 1: WV + adjacent states (shorter shipping distance)
  // Note: KY is Zone 2 despite bordering WV (per business decision - higher carrier rates)
  WV: 1,
  VA: 1,
  MD: 1,
  PA: 1,
  OH: 1,

  // Zone 2: Regional (within ~500 miles)
  KY: 2,
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
    standard: 899,  // $8.99
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
const FREE_SHIPPING_THRESHOLD = 7500; // $75.00

// ============================================================================
// Calculation Functions
// ============================================================================

/**
 * Get the shipping zone for a state
 */
export function getShippingZone(stateCode: string): ShippingZone {
  return STATE_ZONES[stateCode.toUpperCase()] ?? 3;
}

/**
 * Calculate shipping cost for an order
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
 * Get shipping display string
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
 * Format shipping price (cents to dollars)
 */
export function formatShippingPrice(cents: number): string {
  if (cents === 0) return 'FREE';
  return `$${(cents / 100).toFixed(2)}`;
}

/**
 * Get amount needed for free shipping
 */
export function getAmountForFreeShipping(subtotal: number): number {
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  return remaining > 0 ? remaining : 0;
}

/**
 * Check if order qualifies for free shipping
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
