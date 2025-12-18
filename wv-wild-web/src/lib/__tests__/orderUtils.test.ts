/**
 * Order Utils Unit Tests
 *
 * Tests for order ID generation, tax calculation, storage operations,
 * and formatting utilities.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateOrderId,
  calculateTax,
  createOrder,
  storePendingOrder,
  getPendingOrder,
  clearPendingOrder,
  formatOrderPrice,
  formatOrderDate,
  getFullName,
  type OrderData,
  type ContactInfo,
  type CreateOrderParams,
} from '../orderUtils';

// ============================================================================
// Test Helpers
// ============================================================================

function createMockOrder(overrides?: Partial<OrderData>): OrderData {
  return {
    id: 'WVWO-2024-123456',
    createdAt: new Date().toISOString(),
    contact: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '3045551234',
    },
    fulfillment: 'pickup',
    items: [{
      productId: 'prod_1',
      sku: 'SKU-001',
      name: 'Test Product',
      shortName: 'Test',
      price: 1000,
      priceDisplay: '$10.00',
      quantity: 1,
      maxQuantity: 10,
      image: '/images/test.jpg',
      fulfillmentType: 'pickup_only',
      fflRequired: false,
    }],
    subtotal: 1000,
    shipping: 0,
    tax: 60,
    total: 1060,
    hasFirearms: false,
    hasPickupOnlyItems: true,
    status: 'pending_payment',
    ...overrides,
  };
}

// ============================================================================
// Order ID Generation Tests
// ============================================================================

describe('generateOrderId', () => {
  it('returns format WVWO-YYYY-NNNNNN', () => {
    const id = generateOrderId();
    expect(id).toMatch(/^WVWO-\d{4}-\d{6}$/);
  });

  it('uses current year', () => {
    const id = generateOrderId();
    const year = new Date().getFullYear();
    expect(id).toContain(`WVWO-${year}`);
  });

  it('generates different IDs across milliseconds', async () => {
    const id1 = generateOrderId();
    await new Promise(r => setTimeout(r, 2));
    const id2 = generateOrderId();
    expect(id1).not.toBe(id2);
  });

  it('sequence portion is 6 digits padded', () => {
    const id = generateOrderId();
    const sequence = id.split('-')[2];
    expect(sequence).toHaveLength(6);
  });
});

// ============================================================================
// Order Creation Tests
// ============================================================================

describe('createOrder', () => {
  const mockCartItem = {
    productId: 'prod_1',
    sku: 'SKU-001',
    name: 'Test Product',
    shortName: 'Test',
    price: 2999, // $29.99
    priceDisplay: '$29.99',
    quantity: 2,
    maxQuantity: 10,
    image: '/images/test.jpg',
    fulfillmentType: 'ship_or_pickup' as const,
    fflRequired: false,
  };

  const mockSummary = {
    itemCount: 2,
    subtotal: 5998, // 2 × $29.99
    hasShippableItems: true,
    hasPickupOnlyItems: false,
    hasFirearms: false,
    requiresAgeVerification: false,
    fulfillmentOptions: ['ship', 'pickup'] as ('ship' | 'pickup')[],
  };

  const baseParams: CreateOrderParams = {
    contact: {
      firstName: 'Kim',
      lastName: 'Smith',
      email: 'kim@wvwild.com',
      phone: '3046495765',
    },
    fulfillment: 'ship',
    shippingAddress: {
      street: '121 WV-82',
      city: 'Birch River',
      state: 'WV',
      zip: '26610',
    },
    items: [mockCartItem],
    subtotal: 5998,
    shippingCost: 995,
    summary: mockSummary,
  };

  it('calculates total from subtotal + shipping + tax', () => {
    const order = createOrder(baseParams);
    // subtotal: 5998 + shipping: 995 + tax: 360 (6% of 5998) = 7353
    expect(order.total).toBe(5998 + 995 + Math.round(5998 * 0.06));
  });

  it('includes shipping address only when fulfillment is ship', () => {
    const order = createOrder(baseParams);
    expect(order.shippingAddress).toBeDefined();
    expect(order.shippingAddress?.city).toBe('Birch River');
  });

  it('excludes shipping address for pickup orders', () => {
    const pickupParams: CreateOrderParams = {
      ...baseParams,
      fulfillment: 'pickup',
      shippingCost: 0,
    };
    const order = createOrder(pickupParams);
    expect(order.shippingAddress).toBeUndefined();
  });

  it('sets status to pending_payment', () => {
    const order = createOrder(baseParams);
    expect(order.status).toBe('pending_payment');
  });

  it('generates order ID in WVWO format', () => {
    const order = createOrder(baseParams);
    expect(order.id).toMatch(/^WVWO-\d{4}-\d{6}$/);
  });

  it('propagates hasFirearms from summary', () => {
    const firearmsParams: CreateOrderParams = {
      ...baseParams,
      summary: { ...mockSummary, hasFirearms: true },
    };
    const order = createOrder(firearmsParams);
    expect(order.hasFirearms).toBe(true);
  });

  it('propagates hasPickupOnlyItems from summary', () => {
    const pickupOnlyParams: CreateOrderParams = {
      ...baseParams,
      summary: { ...mockSummary, hasPickupOnlyItems: true },
    };
    const order = createOrder(pickupOnlyParams);
    expect(order.hasPickupOnlyItems).toBe(true);
  });

  it('includes reserveAgreed when provided', () => {
    const reserveParams: CreateOrderParams = {
      ...baseParams,
      reserveAgreed: true,
    };
    const order = createOrder(reserveParams);
    expect(order.reserveAgreed).toBe(true);
  });

  it('sets createdAt to current ISO timestamp', () => {
    const before = new Date().toISOString();
    const order = createOrder(baseParams);
    const after = new Date().toISOString();

    expect(order.createdAt >= before).toBe(true);
    expect(order.createdAt <= after).toBe(true);
  });

  it('calculates no tax for out-of-state shipping', () => {
    const outOfStateParams: CreateOrderParams = {
      ...baseParams,
      shippingAddress: {
        street: '123 Main St',
        city: 'Columbus',
        state: 'OH',
        zip: '43215',
      },
    };
    const order = createOrder(outOfStateParams);
    expect(order.tax).toBe(0);
  });

  it('calculates WV tax for pickup orders', () => {
    const pickupParams: CreateOrderParams = {
      ...baseParams,
      fulfillment: 'pickup',
      shippingCost: 0,
    };
    const order = createOrder(pickupParams);
    expect(order.tax).toBe(Math.round(5998 * 0.06));
  });
});

// ============================================================================
// Tax Calculation Tests
// ============================================================================

describe('calculateTax', () => {
  it('charges 6% WV tax for pickup', () => {
    expect(calculateTax(10000, undefined, 'pickup')).toBe(600);
  });

  it('charges 6% tax for WV shipping', () => {
    expect(calculateTax(10000, 'WV', 'ship')).toBe(600);
  });

  it('charges no tax for out-of-state shipping', () => {
    expect(calculateTax(10000, 'OH', 'ship')).toBe(0);
    expect(calculateTax(10000, 'CA', 'ship')).toBe(0);
    expect(calculateTax(10000, 'TX', 'ship')).toBe(0);
  });

  it('rounds to nearest cent', () => {
    // 999 * 0.06 = 59.94 → 60
    expect(calculateTax(999, 'WV', 'ship')).toBe(60);
    // 1001 * 0.06 = 60.06 → 60
    expect(calculateTax(1001, 'WV', 'ship')).toBe(60);
  });

  it('handles zero subtotal', () => {
    expect(calculateTax(0, 'WV', 'ship')).toBe(0);
  });

  it('pickup always charges WV tax regardless of state param', () => {
    // Even if shipping state is passed, pickup should use WV rate
    expect(calculateTax(10000, 'CA', 'pickup')).toBe(600);
  });
});

// ============================================================================
// Storage Operation Tests
// ============================================================================

describe('storePendingOrder', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('returns true on successful store', () => {
    const order = createMockOrder();
    expect(storePendingOrder(order)).toBe(true);
  });

  it('stores order retrievably', () => {
    const order = createMockOrder();
    storePendingOrder(order);
    const result = getPendingOrder();
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBe(order.id);
    }
  });

  it('returns false when storage quota exceeded', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('QuotaExceededError');
    });

    const order = createMockOrder();
    expect(storePendingOrder(order)).toBe(false);

    vi.restoreAllMocks();
  });

  it('overwrites existing order', () => {
    const order1 = createMockOrder({ id: 'WVWO-2024-111111' });
    const order2 = createMockOrder({ id: 'WVWO-2024-222222' });

    storePendingOrder(order1);
    storePendingOrder(order2);

    const result = getPendingOrder();
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBe('WVWO-2024-222222');
    }
  });
});

describe('getPendingOrder', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('returns error for empty storage', () => {
    const result = getPendingOrder();
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('No pending order found');
    }
  });

  it('returns validated order data on success', () => {
    const order = createMockOrder();
    storePendingOrder(order);
    const result = getPendingOrder();

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBe(order.id);
      expect(result.data.contact.firstName).toBe('Test');
      expect(result.data.total).toBe(1060);
    }
  });

  it('returns error for corrupted data', () => {
    sessionStorage.setItem('wvwo_pending_order', '{"invalid": true}');
    const result = getPendingOrder();
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('Order data corrupted');
    }
  });

  it('returns error for invalid JSON', () => {
    sessionStorage.setItem('wvwo_pending_order', 'not json at all');
    const result = getPendingOrder();
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('Storage access failed');
    }
  });

  it('clears corrupted data from storage', () => {
    sessionStorage.setItem('wvwo_pending_order', '{"invalid": true}');
    getPendingOrder();
    expect(sessionStorage.getItem('wvwo_pending_order')).toBeNull();
  });

  it('validates order ID format', () => {
    const badOrder = createMockOrder({ id: 'INVALID-ID' });
    sessionStorage.setItem('wvwo_pending_order', JSON.stringify(badOrder));
    const result = getPendingOrder();
    expect(result.success).toBe(false);
  });

  it('validates email format', () => {
    const badOrder = createMockOrder();
    badOrder.contact.email = 'not-an-email';
    sessionStorage.setItem('wvwo_pending_order', JSON.stringify(badOrder));
    const result = getPendingOrder();
    expect(result.success).toBe(false);
  });
});

describe('clearPendingOrder', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('returns true on successful clear', () => {
    const order = createMockOrder();
    storePendingOrder(order);
    expect(clearPendingOrder()).toBe(true);
  });

  it('removes order from storage', () => {
    const order = createMockOrder();
    storePendingOrder(order);
    clearPendingOrder();
    const result = getPendingOrder();
    expect(result.success).toBe(false);
  });

  it('returns true even when storage was empty', () => {
    expect(clearPendingOrder()).toBe(true);
  });

  it('returns false when storage access fails', () => {
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('Storage error');
    });

    expect(clearPendingOrder()).toBe(false);

    vi.restoreAllMocks();
  });
});

// ============================================================================
// Formatting Utility Tests
// ============================================================================

describe('formatOrderPrice', () => {
  it('formats cents to USD', () => {
    expect(formatOrderPrice(1299)).toBe('$12.99');
    expect(formatOrderPrice(100)).toBe('$1.00');
    expect(formatOrderPrice(0)).toBe('$0.00');
  });

  it('formats large amounts', () => {
    expect(formatOrderPrice(99999)).toBe('$999.99');
    expect(formatOrderPrice(100000)).toBe('$1,000.00');
  });

  it('handles single digit cents', () => {
    expect(formatOrderPrice(1)).toBe('$0.01');
    expect(formatOrderPrice(9)).toBe('$0.09');
  });
});

describe('formatOrderDate', () => {
  it('formats ISO date to readable string', () => {
    const result = formatOrderDate('2024-12-15T10:30:00.000Z');
    // Should contain day of week, month, day, year
    expect(result).toMatch(/\w+, \w+ \d+, \d{4}/);
  });

  it('handles different dates', () => {
    const result1 = formatOrderDate('2024-01-01T00:00:00.000Z');
    const result2 = formatOrderDate('2024-12-31T23:59:59.000Z');
    expect(result1).not.toBe(result2);
  });
});

describe('getFullName', () => {
  it('combines first and last name', () => {
    const contact: ContactInfo = {
      firstName: 'Kim',
      lastName: 'Smith',
      email: 'kim@example.com',
      phone: '3045551234',
    };
    expect(getFullName(contact)).toBe('Kim Smith');
  });

  it('handles single names (trims trailing space)', () => {
    const contact: ContactInfo = {
      firstName: 'Madonna',
      lastName: '',
      email: 'madonna@example.com',
      phone: '3045551234',
    };
    expect(getFullName(contact)).toBe('Madonna');
  });
});
