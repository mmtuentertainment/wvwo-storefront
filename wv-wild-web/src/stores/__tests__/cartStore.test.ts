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
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
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
});
