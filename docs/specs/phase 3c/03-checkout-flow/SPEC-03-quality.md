# SPARC Task Specification: SPEC-03 Quality Improvements

```
+==============================================================================+
|  SPEC-03-Q: Checkout Flow Quality & Robustness                               |
|  Feature: Unit tests, error handling, type safety for checkout infrastructure|
+==============================================================================+
|  Model: claude-opus-4-5-20251101    Effort: SMALL                            |
|  Topology: SEQUENTIAL               Thinking: STANDARD                       |
|  Complexity: **..                   Est. Output: ~8K tokens                  |
|  Dependencies: SPEC-03 (Merged)     Blocking: None (Quality Polish)          |
|  Status: ✅ IMPLEMENTED (PR #42 merged 2024-12-17)                           |
+==============================================================================+
```

## Overview

Address quality gaps identified by 6-agent swarm review of PR #40:
- **Test Coverage**: 0% → 80%+ for utility functions
- **Silent Failures**: sessionStorage operations fail silently
- **Type Safety**: JSON.parse returns `unknown`, no runtime validation
- **Return Values**: `storePendingOrder` doesn't indicate success/failure

---

## Problem Analysis

### Current State (Post-PR #40)

| Component | Issue | Risk Level |
|-----------|-------|------------|
| `orderUtils.ts` | `storePendingOrder` returns void | HIGH |
| `orderUtils.ts` | `getPendingOrder` returns null for both "empty" and "error" | CRITICAL |
| `orderUtils.ts` | `JSON.parse` result not validated | HIGH |
| `checkoutSchema.ts` | Zero unit tests | MEDIUM |
| `shipping.ts` | Zero unit tests | MEDIUM |
| `orderUtils.ts` | Zero unit tests | HIGH |

### Silent Failure Example

```typescript
// CURRENT: Silent failure
export function storePendingOrder(order: OrderData): void {
  try {
    sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch (error) {
    console.error('[Order] Failed to store order:', error); // Silent!
  }
}

// CURRENT: Ambiguous return
export function getPendingOrder(): OrderData | null {
  try {
    const stored = sessionStorage.getItem(ORDER_STORAGE_KEY);
    if (!stored) return null;  // Empty
    return JSON.parse(stored); // Could be anything!
  } catch (error) {
    console.error('[Order] Failed to retrieve order:', error);
    return null;  // Same as empty - ambiguous!
  }
}
```

---

## Deliverables

### File Changes

| File | Action | Priority |
|------|--------|----------|
| `src/lib/orderUtils.ts` | EDIT: Add return values, Zod validation | P0 |
| `src/lib/__tests__/orderUtils.test.ts` | NEW: Unit tests | P0 |
| `src/lib/__tests__/shipping.test.ts` | NEW: Unit tests | P1 |
| `src/components/checkout/schemas/__tests__/checkoutSchema.test.ts` | NEW: Schema tests | P1 |
| `vitest.config.ts` | EDIT: Ensure test config | P0 |
| `package.json` | EDIT: Add test:checkout script | P2 |

---

## Implementation Specification

### 1. Order Utils Robustness (`orderUtils.ts`)

#### 1.1 Add Result Type

```typescript
// Add at top of file
export type StorageResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

#### 1.2 Add Order Data Validator

```typescript
import { z } from 'zod';

// Runtime validation schema (mirrors TypeScript types)
const orderDataSchema = z.object({
  id: z.string().regex(/^WVWO-\d{4}-\d{6}$/),
  createdAt: z.string().datetime(),
  contact: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
  fulfillment: z.enum(['ship', 'pickup']),
  shippingAddress: z.object({
    street: z.string(),
    apt: z.string().optional(),
    city: z.string(),
    state: z.string().length(2),
    zip: z.string().regex(/^\d{5}$/),
  }).optional(),
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string().optional(),
    quantity: z.number().int().positive(),
    price: z.number().int().nonnegative(),
    name: z.string(),
    shortName: z.string(),
    image: z.string().optional(),
    fulfillmentType: z.enum(['ship', 'pickup', 'reserve_hold']),
  })),
  subtotal: z.number().int().nonnegative(),
  shipping: z.number().int().nonnegative(),
  tax: z.number().int().nonnegative(),
  total: z.number().int().positive(),
  hasFirearms: z.boolean(),
  hasPickupOnlyItems: z.boolean(),
  reserveAgreed: z.boolean().optional(),
  status: z.enum(['pending_payment', 'paid', 'processing', 'ready_for_pickup', 'shipped', 'completed']),
});
```

#### 1.3 Refactor Storage Functions

```typescript
/**
 * Store order in sessionStorage
 * @returns Success boolean - false if storage failed
 */
export function storePendingOrder(order: OrderData): boolean {
  if (typeof window === 'undefined') return false;

  try {
    sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    return true;
  } catch (error) {
    console.error('[Order] Failed to store order:', error);
    return false;
  }
}

/**
 * Retrieve and validate pending order from sessionStorage
 * @returns Result with validated order data or error message
 */
export function getPendingOrder(): StorageResult<OrderData> {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Not in browser environment' };
  }

  try {
    const stored = sessionStorage.getItem(ORDER_STORAGE_KEY);

    if (!stored) {
      return { success: false, error: 'No pending order found' };
    }

    const parsed = JSON.parse(stored);
    const validated = orderDataSchema.safeParse(parsed);

    if (!validated.success) {
      console.error('[Order] Invalid order data:', validated.error.issues);
      // Clear corrupted data
      sessionStorage.removeItem(ORDER_STORAGE_KEY);
      return { success: false, error: 'Order data corrupted' };
    }

    return { success: true, data: validated.data };
  } catch (error) {
    console.error('[Order] Failed to retrieve order:', error);
    return { success: false, error: 'Storage access failed' };
  }
}

/**
 * Clear pending order
 * @returns Success boolean
 */
export function clearPendingOrder(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    sessionStorage.removeItem(ORDER_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('[Order] Failed to clear order:', error);
    return false;
  }
}
```

#### 1.4 Update Consumers

Components using `getPendingOrder()` must handle the new result type:

```typescript
// OrderConfirmation.tsx - BEFORE
const order = getPendingOrder();
if (!order) {
  // Redirect - but why? Empty or error?
}

// OrderConfirmation.tsx - AFTER
const result = getPendingOrder();
if (!result.success) {
  if (result.error === 'No pending order found') {
    // Redirect to cart - expected flow
  } else {
    // Show error message - something went wrong
    console.error('Order retrieval failed:', result.error);
  }
}
const order = result.data;
```

---

### 2. Unit Tests

#### 2.1 Order Utils Tests (`__tests__/orderUtils.test.ts`)

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  generateOrderId,
  calculateTax,
  createOrder,
  storePendingOrder,
  getPendingOrder,
  clearPendingOrder,
  formatOrderPrice,
  formatOrderDate,
} from '../orderUtils';

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
});

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
  });

  it('rounds to nearest cent', () => {
    expect(calculateTax(999, 'WV', 'ship')).toBe(60); // 999 * 0.06 = 59.94 → 60
  });
});

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
    // Mock quota exceeded error
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('QuotaExceededError');
    });

    const order = createMockOrder();
    expect(storePendingOrder(order)).toBe(false);

    vi.restoreAllMocks();
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

  it('returns error for corrupted data', () => {
    sessionStorage.setItem('wvwo_pending_order', '{"invalid": true}');
    const result = getPendingOrder();
    expect(result.success).toBe(false);
  });

  it('returns error for invalid JSON', () => {
    sessionStorage.setItem('wvwo_pending_order', 'not json');
    const result = getPendingOrder();
    expect(result.success).toBe(false);
  });

  it('clears corrupted data from storage', () => {
    sessionStorage.setItem('wvwo_pending_order', '{"invalid": true}');
    getPendingOrder();
    expect(sessionStorage.getItem('wvwo_pending_order')).toBeNull();
  });
});

describe('formatOrderPrice', () => {
  it('formats cents to USD', () => {
    expect(formatOrderPrice(1299)).toBe('$12.99');
    expect(formatOrderPrice(100)).toBe('$1.00');
    expect(formatOrderPrice(0)).toBe('$0.00');
  });
});

// Helper
function createMockOrder() {
  return {
    id: 'WVWO-2024-123456',
    createdAt: new Date().toISOString(),
    contact: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '3045551234',
    },
    fulfillment: 'pickup' as const,
    items: [{
      productId: 'prod_1',
      quantity: 1,
      price: 1000,
      name: 'Test Product',
      shortName: 'Test',
      fulfillmentType: 'pickup' as const,
    }],
    subtotal: 1000,
    shipping: 0,
    tax: 60,
    total: 1060,
    hasFirearms: false,
    hasPickupOnlyItems: false,
    status: 'pending_payment' as const,
  };
}
```

#### 2.2 Shipping Tests (`__tests__/shipping.test.ts`)

```typescript
import { describe, it, expect } from 'vitest';
import {
  getShippingZone,
  calculateShipping,
  getAmountForFreeShipping,
  qualifiesForFreeShipping,
  SHIPPING_CONFIG,
} from '../shipping';

describe('getShippingZone', () => {
  it('Zone 1: WV and bordering states (except KY)', () => {
    expect(getShippingZone('WV')).toBe(1);
    expect(getShippingZone('VA')).toBe(1);
    expect(getShippingZone('MD')).toBe(1);
    expect(getShippingZone('PA')).toBe(1);
    expect(getShippingZone('OH')).toBe(1);
  });

  it('Zone 2: KY and regional states', () => {
    expect(getShippingZone('KY')).toBe(2);
    expect(getShippingZone('NC')).toBe(2);
    expect(getShippingZone('TN')).toBe(2);
    expect(getShippingZone('NY')).toBe(2);
  });

  it('Zone 3: National (default)', () => {
    expect(getShippingZone('CA')).toBe(3);
    expect(getShippingZone('TX')).toBe(3);
    expect(getShippingZone('FL')).toBe(3);
    expect(getShippingZone('AK')).toBe(3);
    expect(getShippingZone('HI')).toBe(3);
  });

  it('handles lowercase state codes', () => {
    expect(getShippingZone('wv')).toBe(1);
    expect(getShippingZone('ca')).toBe(3);
  });

  it('defaults unknown codes to Zone 3', () => {
    expect(getShippingZone('XX')).toBe(3);
    expect(getShippingZone('')).toBe(3);
  });
});

describe('calculateShipping', () => {
  it('Zone 1: $8.99', () => {
    const result = calculateShipping('WV', 5000);
    expect(result.cost).toBe(899);
  });

  it('Zone 2: $11.99', () => {
    const result = calculateShipping('KY', 5000);
    expect(result.cost).toBe(1199);
  });

  it('Zone 3: $14.99', () => {
    const result = calculateShipping('CA', 5000);
    expect(result.cost).toBe(1499);
  });

  it('free shipping at $75+', () => {
    const result = calculateShipping('CA', 7500);
    expect(result.cost).toBe(0);
    expect(result.isFree).toBe(true);
  });

  it('charges shipping below $75', () => {
    const result = calculateShipping('WV', 7499);
    expect(result.cost).toBe(899);
    expect(result.isFree).toBe(false);
  });
});

describe('getAmountForFreeShipping', () => {
  it('returns remaining amount needed', () => {
    expect(getAmountForFreeShipping(5000)).toBe(2500); // $25 more needed
    expect(getAmountForFreeShipping(7000)).toBe(500);  // $5 more needed
  });

  it('returns 0 when already qualified', () => {
    expect(getAmountForFreeShipping(7500)).toBe(0);
    expect(getAmountForFreeShipping(10000)).toBe(0);
  });
});

describe('qualifiesForFreeShipping', () => {
  it('true at exactly $75', () => {
    expect(qualifiesForFreeShipping(7500)).toBe(true);
  });

  it('true above $75', () => {
    expect(qualifiesForFreeShipping(10000)).toBe(true);
  });

  it('false below $75', () => {
    expect(qualifiesForFreeShipping(7499)).toBe(false);
  });
});
```

#### 2.3 Schema Tests (`schemas/__tests__/checkoutSchema.test.ts`)

```typescript
import { describe, it, expect } from 'vitest';
import {
  contactSchema,
  shippingSchema,
  checkoutSchema,
  validateFirearmAgreement,
  formatPhoneNumber,
  normalizePhone,
} from '../checkoutSchema';

describe('contactSchema', () => {
  const validContact = {
    firstName: 'Kim',
    lastName: 'Smith',
    email: 'kim@example.com',
    phone: '(304) 555-1234',
  };

  it('accepts valid contact', () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it('requires firstName min 2 chars', () => {
    const result = contactSchema.safeParse({ ...validContact, firstName: 'K' });
    expect(result.success).toBe(false);
  });

  it('requires valid email format', () => {
    const result = contactSchema.safeParse({ ...validContact, email: 'invalid' });
    expect(result.success).toBe(false);
  });

  it('accepts various phone formats', () => {
    const formats = [
      '(304) 555-1234',
      '304-555-1234',
      '3045551234',
      '+1 304 555 1234',
    ];
    formats.forEach(phone => {
      const result = contactSchema.safeParse({ ...validContact, phone });
      expect(result.success).toBe(true);
    });
  });

  it('rejects invalid phone formats', () => {
    const invalid = ['123', '12345678901234', 'not-a-phone'];
    invalid.forEach(phone => {
      const result = contactSchema.safeParse({ ...validContact, phone });
      expect(result.success).toBe(false);
    });
  });
});

describe('shippingSchema', () => {
  const validShipping = {
    street: '123 Main Street',
    city: 'Birch River',
    state: 'WV',
    zip: '26610',
  };

  it('accepts valid shipping address', () => {
    expect(shippingSchema.safeParse(validShipping).success).toBe(true);
  });

  it('accepts optional apt field', () => {
    const result = shippingSchema.safeParse({ ...validShipping, apt: 'Suite 100' });
    expect(result.success).toBe(true);
  });

  it('requires exactly 5-digit ZIP', () => {
    expect(shippingSchema.safeParse({ ...validShipping, zip: '2661' }).success).toBe(false);
    expect(shippingSchema.safeParse({ ...validShipping, zip: '26610-1234' }).success).toBe(false);
    expect(shippingSchema.safeParse({ ...validShipping, zip: '26610' }).success).toBe(true);
  });

  it('requires 2-char state code', () => {
    expect(shippingSchema.safeParse({ ...validShipping, state: 'W' }).success).toBe(false);
    expect(shippingSchema.safeParse({ ...validShipping, state: 'West Virginia' }).success).toBe(false);
  });
});

describe('checkoutSchema conditional validation', () => {
  const baseData = {
    firstName: 'Kim',
    lastName: 'Smith',
    email: 'kim@example.com',
    phone: '(304) 555-1234',
    fulfillment: 'pickup' as const,
  };

  it('pickup does not require shipping address', () => {
    const result = checkoutSchema.safeParse(baseData);
    expect(result.success).toBe(true);
  });

  it('ship requires shipping address', () => {
    const result = checkoutSchema.safeParse({ ...baseData, fulfillment: 'ship' });
    expect(result.success).toBe(false);
  });

  it('ship with valid address passes', () => {
    const result = checkoutSchema.safeParse({
      ...baseData,
      fulfillment: 'ship',
      street: '123 Main St',
      city: 'Birch River',
      state: 'WV',
      zip: '26610',
    });
    expect(result.success).toBe(true);
  });
});

describe('validateFirearmAgreement', () => {
  it('returns null when no firearms', () => {
    expect(validateFirearmAgreement(false, false)).toBeNull();
    expect(validateFirearmAgreement(undefined, false)).toBeNull();
  });

  it('returns error when firearms without agreement', () => {
    expect(validateFirearmAgreement(false, true)).toBe(
      "Please confirm you understand the firearm reserve terms."
    );
    expect(validateFirearmAgreement(undefined, true)).toBe(
      "Please confirm you understand the firearm reserve terms."
    );
  });

  it('returns null when firearms with agreement', () => {
    expect(validateFirearmAgreement(true, true)).toBeNull();
  });
});

describe('formatPhoneNumber', () => {
  it('formats 10-digit numbers', () => {
    expect(formatPhoneNumber('3045551234')).toBe('(304) 555-1234');
  });

  it('handles formatted input', () => {
    expect(formatPhoneNumber('(304) 555-1234')).toBe('(304) 555-1234');
    expect(formatPhoneNumber('304-555-1234')).toBe('(304) 555-1234');
  });

  it('returns original if not 10 digits', () => {
    expect(formatPhoneNumber('123')).toBe('123');
    expect(formatPhoneNumber('')).toBe('');
  });
});

describe('normalizePhone', () => {
  it('strips all formatting', () => {
    expect(normalizePhone('(304) 555-1234')).toBe('3045551234');
    expect(normalizePhone('+1 304-555-1234')).toBe('3045551234');
    expect(normalizePhone('304.555.1234')).toBe('3045551234');
  });
});
```

---

## Implementation Sequence

```text
[1] Setup Test Infrastructure
    ├─ Verify vitest.config.ts has proper coverage settings
    └─ Add test:checkout script to package.json

[2] Add Order Data Zod Schema
    └─ orderUtils.ts: Add orderDataSchema for runtime validation

[3] Refactor Storage Functions
    ├─ Add StorageResult type
    ├─ storePendingOrder returns boolean
    ├─ getPendingOrder returns StorageResult<OrderData>
    └─ clearPendingOrder returns boolean

[4] Update Consumers
    └─ OrderConfirmation.tsx: Handle new result type

[5] Write Unit Tests (Parallel)
    ├─ __tests__/orderUtils.test.ts
    ├─ __tests__/shipping.test.ts
    └─ schemas/__tests__/checkoutSchema.test.ts

[6] Run Full Test Suite
    └─ npm run test:checkout
```

---

## Test Coverage Targets

| File | Target | Critical Paths |
|------|--------|----------------|
| `orderUtils.ts` | 90% | Storage operations, ID generation, tax calc |
| `shipping.ts` | 95% | Zone mapping, rate calculation, free shipping |
| `checkoutSchema.ts` | 85% | All validators, conditional logic, Kim's messages |

---

## Acceptance Criteria

- [ ] `storePendingOrder` returns `boolean` success indicator
- [ ] `getPendingOrder` returns `StorageResult<OrderData>` with typed errors
- [ ] Corrupted sessionStorage data is detected and cleared
- [ ] Order data validated against Zod schema on retrieval
- [ ] `OrderConfirmation.tsx` handles all error cases with appropriate UX
- [ ] Unit tests pass with 85%+ coverage
- [ ] No console errors in happy path
- [ ] Kim's voice preserved in all error messages

---

## Estimated Effort

| Component | Hours |
|-----------|-------|
| Order data Zod schema | 0.5h |
| Storage function refactor | 1h |
| Consumer updates | 0.5h |
| orderUtils.test.ts | 1.5h |
| shipping.test.ts | 1h |
| checkoutSchema.test.ts | 1h |
| Integration & debugging | 0.5h |
| **Total** | **~6h** |

---

## PR Strategy

**Single PR**: `feat(checkout): add unit tests and robust error handling`

All changes are tightly coupled - the test mocks depend on the new return types.

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Breaking OrderConfirmation | Update consumer first, test manually |
| Zod schema mismatch with TypeScript | Schema mirrors existing interfaces exactly |
| sessionStorage unavailable | Already handled with SSR check |

---

## Summary

This spec addresses the four quality gaps from swarm review:
1. **Unit tests** - 3 test files covering 85%+ of checkout utilities
2. **sessionStorage error handling** - Explicit success/failure returns
3. **Type validation** - Zod runtime validation on deserialize
4. **Return values** - All storage functions return actionable results

Post-implementation, SPEC-03 will have production-ready error handling suitable for a real payment integration in SPEC-04.
