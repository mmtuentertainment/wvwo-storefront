import { useStore } from '@nanostores/react';
import {
  $cartItems,
  $isCartOpen,
  $itemCount,
  $subtotal,
  $summary,
  $persistenceMode,
  $cartRestoreError,
  $cartPersistenceWarning,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
  clearCartRestoreError,
  clearCartPersistenceWarning,
  type CartItem,
  type CartSummaryData,
  type PersistenceMode
} from '@/stores/cartStore';

/**
 * React hook for cart state management
 *
 * Wraps nanostores with a familiar useCart() interface.
 * Allows existing cart components to work with minimal changes.
 *
 * @example
 * ```tsx
 * function CartButton() {
 *   const { state, isOpen, setIsOpen, addItem } = useCart();
 *
 *   return (
 *     <button onClick={() => setIsOpen(true)}>
 *       Cart ({state.itemCount})
 *     </button>
 *   );
 * }
 * ```
 */
export function useCart() {
  const cartItems = useStore($cartItems);
  const isOpen = useStore($isCartOpen);
  const itemCount = useStore($itemCount);
  const subtotal = useStore($subtotal);
  const summary = useStore($summary);
  const persistenceMode = useStore($persistenceMode);
  const cartRestoreError = useStore($cartRestoreError);
  const cartPersistenceWarning = useStore($cartPersistenceWarning);

  return {
    // State (match old interface)
    state: {
      items: Object.values(cartItems),
      itemCount,
      subtotal,
      isOpen,
    },

    // Summary data (item count, subtotal, fulfillment restrictions)
    summary,

    // Cart visibility
    isOpen,
    setIsOpen: (open: boolean) => {
      if (open) {
        openCart();
      } else {
        closeCart();
      }
    },
    openCart,
    closeCart,
    toggleCart,

    // Cart actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,

    // Persistence mode and error states
    persistenceMode,
    cartRestoreError,
    cartPersistenceWarning,
    clearCartRestoreError,
    clearCartPersistenceWarning,

    // Convenience computed values
    isEmpty: itemCount === 0,
  };
}

// Re-export types for convenience
export type { CartItem, CartSummaryData, PersistenceMode } from '@/stores/cartStore';
