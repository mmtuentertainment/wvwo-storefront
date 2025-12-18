/**
 * Cart Store Unit Tests
 * Tests core cart functionality: add, remove, update, validation
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock localStorage before importing store
const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

// Must mock before import
vi.stubGlobal('localStorage', localStorageMock);

// Now import the store
import {
  $cartState,
  $itemCount,
  $subtotal,
  $summary,
  $cartRestoreError,
  $cartPersistenceWarning,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  clearCartRestoreError,
  clearCartPersistenceWarning,
  formatPrice,
  type CartItem,
} from '../cartStore';

const createMockItem = (overrides: Partial<CartItem> = {}): CartItem => ({
  productId: 'test-123',
  sku: 'TEST-SKU',
  name: 'Test Product',
  shortName: 'Test',
  price: 2999,
  priceDisplay: '$29.99',
  quantity: 1,
  maxQuantity: 10,
  image: '/test.jpg',
  fulfillmentType: 'ship_or_pickup',
  fflRequired: false,
  ...overrides,
});

describe('cartStore', () => {
  beforeEach(() => {
    clearCart();
    vi.clearAllMocks();
  });

  afterEach(() => {
    clearCart();
  });

  describe('addItem', () => {
    it('adds item to empty cart', () => {
      const item = createMockItem();
      const result = addItem(item);

      expect(result.success).toBe(true);
      expect(result.message).toContain('added to cart');
      expect($cartState.get().items['test-123']).toBeDefined();
    });

    it('respects maxQuantity limit', () => {
      const item = createMockItem({ quantity: 11, maxQuantity: 10 });
      const result = addItem(item);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Maximum');
    });

    it('limits firearms to 1 per SKU', () => {
      const firearm = createMockItem({ fulfillmentType: 'reserve_hold' });

      const first = addItem(firearm);
      expect(first.success).toBe(true);

      const second = addItem(firearm);
      expect(second.success).toBe(false);
      expect(second.message).toContain('already reserved');
    });

    it('limits total firearms to 3 per order', () => {
      // Add 3 different firearms
      for (let i = 1; i <= 3; i++) {
        const firearm = createMockItem({
          productId: `gun-${i}`,
          fulfillmentType: 'reserve_hold',
        });
        addItem(firearm);
      }

      // Try to add a 4th
      const fourth = createMockItem({
        productId: 'gun-4',
        fulfillmentType: 'reserve_hold',
      });
      const result = addItem(fourth);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Maximum 3');
    });
  });

  describe('removeItem', () => {
    it('removes item from cart', () => {
      const item = createMockItem();
      addItem(item);

      expect($cartState.get().items['test-123']).toBeDefined();

      removeItem('test-123');

      expect($cartState.get().items['test-123']).toBeUndefined();
    });

    it('handles removing non-existent item gracefully', () => {
      // Should not throw
      expect(() => removeItem('nonexistent')).not.toThrow();
    });
  });

  describe('updateQuantity', () => {
    it('updates quantity within bounds', () => {
      const item = createMockItem();
      addItem(item);

      updateQuantity('test-123', 5);

      expect($cartState.get().items['test-123'].quantity).toBe(5);
    });

    it('caps quantity at maxQuantity', () => {
      const item = createMockItem({ maxQuantity: 5 });
      addItem(item);

      updateQuantity('test-123', 100);

      expect($cartState.get().items['test-123'].quantity).toBe(5);
    });

    it('removes item when quantity is 0 or less', () => {
      const item = createMockItem();
      addItem(item);

      updateQuantity('test-123', 0);

      expect($cartState.get().items['test-123']).toBeUndefined();
    });
  });

  describe('clearCart', () => {
    it('removes all items from cart', () => {
      addItem(createMockItem({ productId: 'item-1' }));
      addItem(createMockItem({ productId: 'item-2' }));

      clearCart();

      expect(Object.keys($cartState.get().items)).toHaveLength(0);
    });
  });

  describe('formatPrice', () => {
    it('formats cents to USD currency string', () => {
      expect(formatPrice(2999)).toBe('$29.99');
      expect(formatPrice(100)).toBe('$1.00');
      expect(formatPrice(0)).toBe('$0.00');
      expect(formatPrice(99)).toBe('$0.99');
      expect(formatPrice(10000)).toBe('$100.00');
    });

    it('handles large amounts', () => {
      expect(formatPrice(999999)).toBe('$9,999.99');
    });

    it('handles negative (refunds)', () => {
      expect(formatPrice(-500)).toBe('-$5.00');
    });
  });

  describe('fulfillment type validation', () => {
    it('allows ship_or_pickup items', () => {
      const item = createMockItem({ fulfillmentType: 'ship_or_pickup' });
      const result = addItem(item);
      expect(result.success).toBe(true);
    });

    it('allows pickup_only items', () => {
      clearCart();
      const item = createMockItem({ productId: 'ammo-1', fulfillmentType: 'pickup_only' });
      const result = addItem(item);
      expect(result.success).toBe(true);
    });

    it('allows reserve_hold (firearms) with restrictions', () => {
      clearCart();
      const item = createMockItem({ productId: 'gun-1', fulfillmentType: 'reserve_hold' });
      const result = addItem(item);
      expect(result.success).toBe(true);
    });
  });

  describe('computed values', () => {
    it('$itemCount returns correct sum of quantities', () => {
      addItem(createMockItem({ productId: 'item-1', quantity: 2 }));
      addItem(createMockItem({ productId: 'item-2', quantity: 3 }));

      expect($itemCount.get()).toBe(5);
    });

    it('$subtotal returns correct sum of price * quantity', () => {
      addItem(createMockItem({ productId: 'item-1', price: 1000, quantity: 2 })); // $10 x 2 = $20
      addItem(createMockItem({ productId: 'item-2', price: 500, quantity: 3 }));  // $5 x 3 = $15

      expect($subtotal.get()).toBe(3500); // $35 in cents
    });

    it('$summary.hasShippableItems detects ship_or_pickup items', () => {
      addItem(createMockItem({ fulfillmentType: 'ship_or_pickup' }));

      expect($summary.get().hasShippableItems).toBe(true);
      expect($summary.get().hasPickupOnlyItems).toBe(false);
      expect($summary.get().hasFirearms).toBe(false);
    });

    it('$summary.hasPickupOnlyItems detects pickup_only items', () => {
      addItem(createMockItem({ productId: 'ammo-1', fulfillmentType: 'pickup_only' }));

      expect($summary.get().hasPickupOnlyItems).toBe(true);
    });

    it('$summary.hasFirearms detects reserve_hold items', () => {
      addItem(createMockItem({ productId: 'gun-1', fulfillmentType: 'reserve_hold' }));

      expect($summary.get().hasFirearms).toBe(true);
    });

    it('$summary.requiresAgeVerification detects age-restricted items', () => {
      addItem(createMockItem({ ageRestriction: 21 }));

      expect($summary.get().requiresAgeVerification).toBe(true);
    });

    it('$summary.fulfillmentOptions allows ship and pickup for shippable-only cart', () => {
      addItem(createMockItem({ fulfillmentType: 'ship_or_pickup' }));

      expect($summary.get().fulfillmentOptions).toEqual(['ship', 'pickup']);
    });

    it('$summary.fulfillmentOptions forces pickup-only for firearms', () => {
      addItem(createMockItem({ productId: 'gun-1', fulfillmentType: 'reserve_hold' }));

      expect($summary.get().fulfillmentOptions).toEqual(['pickup']);
    });

    it('$summary.fulfillmentOptions allows both when mixing shippable and pickup_only', () => {
      addItem(createMockItem({ productId: 'gear-1', fulfillmentType: 'ship_or_pickup' }));
      addItem(createMockItem({ productId: 'ammo-1', fulfillmentType: 'pickup_only' }));

      expect($summary.get().fulfillmentOptions).toEqual(['ship', 'pickup']);
    });

    it('$summary.fulfillmentOptions forces pickup-only for pickup_only-only cart', () => {
      addItem(createMockItem({ productId: 'ammo-1', fulfillmentType: 'pickup_only' }));
      addItem(createMockItem({ productId: 'ammo-2', fulfillmentType: 'pickup_only' }));

      expect($summary.get().fulfillmentOptions).toEqual(['pickup']);
    });
  });

  describe('invalid product data validation', () => {
    it('rejects item with missing productId', () => {
      const item = createMockItem({ productId: '' });
      const result = addItem(item);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid product data');
    });

    it('rejects item with missing sku', () => {
      const item = createMockItem({ sku: '' });
      const result = addItem(item);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid product data');
    });

    it('rejects item with missing name', () => {
      const item = createMockItem({ name: '' });
      const result = addItem(item);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid product data');
    });

    it('rejects item with quantity less than 1', () => {
      const item = createMockItem({ quantity: 0 });
      const result = addItem(item);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Quantity must be at least 1');
    });

    it('rejects item with negative quantity', () => {
      const item = createMockItem({ quantity: -1 });
      const result = addItem(item);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Quantity must be at least 1');
    });
  });

  describe('cumulative quantity validation', () => {
    it('fails when adding to existing item exceeds maxQuantity', () => {
      const item = createMockItem({ productId: 'item-1', quantity: 6, maxQuantity: 10 });
      addItem(item);

      // Try to add 6 more (total would be 12, max is 10)
      const result = addItem(createMockItem({ productId: 'item-1', quantity: 6, maxQuantity: 10 }));

      expect(result.success).toBe(false);
      expect(result.message).toContain('Maximum 10');
    });
  });

  describe('updateQuantity edge cases', () => {
    it('handles updating non-existent item gracefully', () => {
      // Should not throw
      expect(() => updateQuantity('nonexistent', 5)).not.toThrow();
      // Cart should remain unchanged
      expect(Object.keys($cartState.get().items)).toHaveLength(0);
    });
  });

  describe('firearm edge cases', () => {
    it('hasFirearms becomes false when removing the only firearm', () => {
      const firearm = createMockItem({ productId: 'gun-1', fulfillmentType: 'reserve_hold' });
      addItem(firearm);

      expect($summary.get().hasFirearms).toBe(true);

      removeItem('gun-1');

      expect($summary.get().hasFirearms).toBe(false);
    });

    it('hasFirearms remains true when removing one of multiple firearms', () => {
      addItem(createMockItem({ productId: 'gun-1', fulfillmentType: 'reserve_hold' }));
      addItem(createMockItem({ productId: 'gun-2', fulfillmentType: 'reserve_hold' }));

      expect($summary.get().hasFirearms).toBe(true);

      removeItem('gun-1');

      expect($summary.get().hasFirearms).toBe(true);
    });

    it('hasFirearms becomes true when re-adding a firearm after removal', () => {
      const firearm = createMockItem({ productId: 'gun-1', fulfillmentType: 'reserve_hold' });
      addItem(firearm);
      removeItem('gun-1');

      expect($summary.get().hasFirearms).toBe(false);

      addItem(firearm);

      expect($summary.get().hasFirearms).toBe(true);
    });

    it('fulfillmentOptions updates from pickup-only to ship+pickup when firearm removed', () => {
      // Add a firearm and a shippable item
      addItem(createMockItem({ productId: 'gear-1', fulfillmentType: 'ship_or_pickup' }));
      addItem(createMockItem({ productId: 'gun-1', fulfillmentType: 'reserve_hold' }));

      // With firearm: pickup only
      expect($summary.get().fulfillmentOptions).toEqual(['pickup']);

      // Remove firearm
      removeItem('gun-1');

      // Without firearm: ship and pickup available again
      expect($summary.get().fulfillmentOptions).toEqual(['ship', 'pickup']);
    });

    it('fulfillmentOptions updates from ship+pickup to pickup-only when firearm added', () => {
      addItem(createMockItem({ productId: 'gear-1', fulfillmentType: 'ship_or_pickup' }));

      // Without firearm: ship and pickup available
      expect($summary.get().fulfillmentOptions).toEqual(['ship', 'pickup']);

      // Add firearm
      addItem(createMockItem({ productId: 'gun-1', fulfillmentType: 'reserve_hold' }));

      // With firearm: pickup only
      expect($summary.get().fulfillmentOptions).toEqual(['pickup']);
    });
  });

  describe('error state management', () => {
    beforeEach(() => {
      // Reset error states before each test
      $cartRestoreError.set(false);
      $cartPersistenceWarning.set(false);
    });

    it('clearCartRestoreError resets $cartRestoreError to false', () => {
      $cartRestoreError.set(true);
      expect($cartRestoreError.get()).toBe(true);

      clearCartRestoreError();
      expect($cartRestoreError.get()).toBe(false);
    });

    it('clearCartPersistenceWarning resets $cartPersistenceWarning to false', () => {
      $cartPersistenceWarning.set(true);
      expect($cartPersistenceWarning.get()).toBe(true);

      clearCartPersistenceWarning();
      expect($cartPersistenceWarning.get()).toBe(false);
    });

    it('clear functions are idempotent (calling when already false is safe)', () => {
      expect($cartRestoreError.get()).toBe(false);
      clearCartRestoreError();
      expect($cartRestoreError.get()).toBe(false);

      expect($cartPersistenceWarning.get()).toBe(false);
      clearCartPersistenceWarning();
      expect($cartPersistenceWarning.get()).toBe(false);
    });
  });
});
