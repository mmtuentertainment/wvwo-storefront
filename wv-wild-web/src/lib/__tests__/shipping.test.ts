/**
 * Shipping Calculation Unit Tests
 *
 * Tests for zone mapping, rate calculation, and free shipping threshold.
 */

import { describe, it, expect } from 'vitest';
import {
  getShippingZone,
  calculateShipping,
  getShippingDisplay,
  formatShippingPrice,
  getAmountForFreeShipping,
  qualifiesForFreeShipping,
  SHIPPING_CONFIG,
} from '../shipping';

// ============================================================================
// Zone Mapping Tests
// ============================================================================

describe('getShippingZone', () => {
  describe('Zone 1: WV and bordering states (except KY)', () => {
    it('maps WV to Zone 1', () => {
      expect(getShippingZone('WV')).toBe(1);
    });

    it('maps VA to Zone 1', () => {
      expect(getShippingZone('VA')).toBe(1);
    });

    it('maps MD to Zone 1', () => {
      expect(getShippingZone('MD')).toBe(1);
    });

    it('maps PA to Zone 1', () => {
      expect(getShippingZone('PA')).toBe(1);
    });

    it('maps OH to Zone 1', () => {
      expect(getShippingZone('OH')).toBe(1);
    });
  });

  describe('Zone 2: KY and regional states', () => {
    it('maps KY to Zone 2 (not Zone 1)', () => {
      expect(getShippingZone('KY')).toBe(2);
    });

    it('maps NC to Zone 2', () => {
      expect(getShippingZone('NC')).toBe(2);
    });

    it('maps TN to Zone 2', () => {
      expect(getShippingZone('TN')).toBe(2);
    });

    it('maps NY to Zone 2', () => {
      expect(getShippingZone('NY')).toBe(2);
    });

    it('maps GA to Zone 2', () => {
      expect(getShippingZone('GA')).toBe(2);
    });

    it('maps MI to Zone 2', () => {
      expect(getShippingZone('MI')).toBe(2);
    });

    // Additional Zone 2 states for complete coverage
    it('maps SC to Zone 2', () => {
      expect(getShippingZone('SC')).toBe(2);
    });

    it('maps IN to Zone 2', () => {
      expect(getShippingZone('IN')).toBe(2);
    });

    it('maps NJ to Zone 2', () => {
      expect(getShippingZone('NJ')).toBe(2);
    });

    it('maps DE to Zone 2', () => {
      expect(getShippingZone('DE')).toBe(2);
    });

    it('maps DC to Zone 2', () => {
      expect(getShippingZone('DC')).toBe(2);
    });

    it('maps CT to Zone 2', () => {
      expect(getShippingZone('CT')).toBe(2);
    });

    it('maps MA to Zone 2', () => {
      expect(getShippingZone('MA')).toBe(2);
    });

    it('maps RI to Zone 2', () => {
      expect(getShippingZone('RI')).toBe(2);
    });

    it('maps VT to Zone 2', () => {
      expect(getShippingZone('VT')).toBe(2);
    });

    it('maps NH to Zone 2', () => {
      expect(getShippingZone('NH')).toBe(2);
    });

    it('maps ME to Zone 2', () => {
      expect(getShippingZone('ME')).toBe(2);
    });

    it('maps AL to Zone 2', () => {
      expect(getShippingZone('AL')).toBe(2);
    });

    it('maps MS to Zone 2', () => {
      expect(getShippingZone('MS')).toBe(2);
    });

    it('maps IL to Zone 2', () => {
      expect(getShippingZone('IL')).toBe(2);
    });

    it('maps WI to Zone 2', () => {
      expect(getShippingZone('WI')).toBe(2);
    });
  });

  describe('Zone 3: National (default)', () => {
    it('maps CA to Zone 3', () => {
      expect(getShippingZone('CA')).toBe(3);
    });

    it('maps TX to Zone 3', () => {
      expect(getShippingZone('TX')).toBe(3);
    });

    it('maps FL to Zone 3', () => {
      expect(getShippingZone('FL')).toBe(3);
    });

    it('maps AK to Zone 3', () => {
      expect(getShippingZone('AK')).toBe(3);
    });

    it('maps HI to Zone 3', () => {
      expect(getShippingZone('HI')).toBe(3);
    });

    it('maps WA to Zone 3', () => {
      expect(getShippingZone('WA')).toBe(3);
    });
  });

  describe('case handling and defaults', () => {
    it('handles lowercase state codes', () => {
      expect(getShippingZone('wv')).toBe(1);
      expect(getShippingZone('ca')).toBe(3);
    });

    it('handles mixed case', () => {
      expect(getShippingZone('Wv')).toBe(1);
      expect(getShippingZone('Ca')).toBe(3);
    });

    it('defaults unknown codes to Zone 3', () => {
      expect(getShippingZone('XX')).toBe(3);
      expect(getShippingZone('ZZ')).toBe(3);
    });

    it('defaults empty string to Zone 3', () => {
      expect(getShippingZone('')).toBe(3);
    });
  });
});

// ============================================================================
// Shipping Rate Calculation Tests
// ============================================================================

describe('calculateShipping', () => {
  describe('zone-based rates', () => {
    it('Zone 1: $8.99', () => {
      const result = calculateShipping('WV', 5000);
      expect(result.cost).toBe(899);
      expect(result.standard).toBe(899);
    });

    it('Zone 2: $11.99', () => {
      const result = calculateShipping('KY', 5000);
      expect(result.cost).toBe(1199);
      expect(result.standard).toBe(1199);
    });

    it('Zone 3: $14.99', () => {
      const result = calculateShipping('CA', 5000);
      expect(result.cost).toBe(1499);
      expect(result.standard).toBe(1499);
    });
  });

  describe('free shipping threshold ($75)', () => {
    it('free shipping at exactly $75', () => {
      const result = calculateShipping('CA', 7500);
      expect(result.cost).toBe(0);
      expect(result.isFree).toBe(true);
    });

    it('free shipping above $75', () => {
      const result = calculateShipping('CA', 10000);
      expect(result.cost).toBe(0);
      expect(result.isFree).toBe(true);
    });

    it('charges shipping below $75', () => {
      const result = calculateShipping('WV', 7499);
      expect(result.cost).toBe(899);
      expect(result.isFree).toBe(false);
    });

    it('free shipping applies to all zones', () => {
      expect(calculateShipping('WV', 7500).isFree).toBe(true);
      expect(calculateShipping('KY', 7500).isFree).toBe(true);
      expect(calculateShipping('CA', 7500).isFree).toBe(true);
    });
  });

  describe('returned metadata', () => {
    it('includes description for Zone 1', () => {
      const result = calculateShipping('WV', 5000);
      expect(result.description).toBe('Regional shipping');
    });

    it('includes estimated days', () => {
      const result = calculateShipping('WV', 5000);
      expect(result.estimatedDays).toBe('3-5 business days');
    });

    it('Zone 3 has longer estimated days', () => {
      const result = calculateShipping('CA', 5000);
      expect(result.estimatedDays).toBe('7-10 business days');
    });
  });
});

// ============================================================================
// Display Helper Tests
// ============================================================================

describe('getShippingDisplay', () => {
  it('returns placeholder when no state provided', () => {
    expect(getShippingDisplay(undefined, 5000)).toBe('Enter address for shipping');
  });

  it('returns FREE when qualified', () => {
    expect(getShippingDisplay('WV', 7500)).toBe('FREE');
  });

  it('returns formatted price when not qualified', () => {
    expect(getShippingDisplay('WV', 5000)).toBe('$8.99');
  });
});

describe('formatShippingPrice', () => {
  it('formats zero as FREE', () => {
    expect(formatShippingPrice(0)).toBe('FREE');
  });

  it('formats cents to dollars', () => {
    expect(formatShippingPrice(899)).toBe('$8.99');
    expect(formatShippingPrice(1199)).toBe('$11.99');
    expect(formatShippingPrice(1499)).toBe('$14.99');
  });
});

// ============================================================================
// Free Shipping Helpers
// ============================================================================

describe('getAmountForFreeShipping', () => {
  it('returns remaining amount needed', () => {
    expect(getAmountForFreeShipping(5000)).toBe(2500); // $25 more needed
    expect(getAmountForFreeShipping(7000)).toBe(500);  // $5 more needed
    expect(getAmountForFreeShipping(7499)).toBe(1);    // $0.01 more needed
  });

  it('returns 0 when already qualified', () => {
    expect(getAmountForFreeShipping(7500)).toBe(0);
    expect(getAmountForFreeShipping(10000)).toBe(0);
  });

  it('returns full threshold for zero subtotal', () => {
    expect(getAmountForFreeShipping(0)).toBe(7500);
  });
});

describe('qualifiesForFreeShipping', () => {
  it('true at exactly $75', () => {
    expect(qualifiesForFreeShipping(7500)).toBe(true);
  });

  it('true above $75', () => {
    expect(qualifiesForFreeShipping(7501)).toBe(true);
    expect(qualifiesForFreeShipping(10000)).toBe(true);
  });

  it('false below $75', () => {
    expect(qualifiesForFreeShipping(7499)).toBe(false);
    expect(qualifiesForFreeShipping(0)).toBe(false);
  });
});

// ============================================================================
// Config Export Tests
// ============================================================================

describe('SHIPPING_CONFIG', () => {
  it('exports free shipping threshold', () => {
    expect(SHIPPING_CONFIG.freeShippingThreshold).toBe(7500);
  });

  it('exports zone rates', () => {
    expect(SHIPPING_CONFIG.zones[1].standard).toBe(899);
    expect(SHIPPING_CONFIG.zones[2].standard).toBe(1199);
    expect(SHIPPING_CONFIG.zones[3].standard).toBe(1499);
  });
});
