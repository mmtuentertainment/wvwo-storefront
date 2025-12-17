import { ShoppingBag } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { useCart } from '@/hooks/useCart';
import { CartItemRow } from './CartItem';
import { CartSummary } from './CartSummary';

export function CartDrawer() {
  const { state, summary, isOpen, setIsOpen, cartRestoreError, cartPersistenceWarning } = useCart();

  // Generate accessible cart status for screen readers
  const cartStatusAnnouncement = state.items.length === 0
    ? 'Cart is empty'
    : `Cart has ${state.items.length} ${state.items.length === 1 ? 'item' : 'items'}, subtotal ${(summary.subtotal / 100).toFixed(2)} dollars`;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-brand-brown">
            Your Cart
          </SheetTitle>
          {/* Live region for screen reader announcements */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {cartStatusAnnouncement}
          </div>
        </SheetHeader>

        {/* Storage warning banners */}
        {cartRestoreError && (
          <div role="alert" className="mx-4 mb-2 p-3 bg-brand-cream border border-brand-mud/30 rounded-sm text-brand-brown text-sm">
            <p className="font-body">Your previous cart couldn't be restored. You may need to re-add items.</p>
          </div>
        )}
        {cartPersistenceWarning && (
          <div role="alert" className="mx-4 mb-2 p-3 bg-brand-cream border border-brand-mud/30 rounded-sm text-brand-brown text-sm">
            <p className="font-body">Cart won't be saved between sessions. Complete checkout before leaving.</p>
          </div>
        )}

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {state.items.length === 0 ? (
            // Empty state
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
              <ShoppingBag className="w-12 h-12 text-brand-mud/40" />
              <div className="space-y-2">
                <p className="font-display text-lg text-brand-brown">
                  Your cart is empty
                </p>
                <p className="font-body text-sm text-brand-mud/60">
                  Browse our guns, ammo, and gear to get started.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 font-display font-bold text-sign-green hover:text-sign-green/80 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart items list */}
              <div className="space-y-3">
                {state.items.map((item) => (
                  <CartItemRow key={item.productId} item={item} />
                ))}
              </div>

              {/* Notices */}
              <div className="space-y-3 pt-2">
                {/* Firearms fulfillment notice */}
                {summary.hasFirearms && (
                  <div className="border-l-4 border-l-brand-orange bg-brand-cream/50 p-3 rounded-sm">
                    <p className="font-body text-sm text-brand-brown">
                      <strong className="font-display font-bold">
                        Firearms require in-store pickup and FFL transfer.
                      </strong>{' '}
                      We'll contact you to arrange pickup at our Birch River
                      location.
                    </p>
                  </div>
                )}

                {/* Pickup-only notice (non-firearms) */}
                {summary.hasPickupOnlyItems && !summary.hasFirearms && (
                  <div className="border-l-4 border-l-brand-orange bg-brand-cream/50 p-3 rounded-sm">
                    <p className="font-body text-sm text-brand-brown">
                      <strong className="font-display font-bold">
                        Some items are pickup only.
                      </strong>{' '}
                      We'll contact you to arrange pickup at our Birch River
                      location.
                    </p>
                  </div>
                )}

                {/* Price freshness notice */}
                <div className="border-l-4 border-l-brand-mud bg-brand-cream/30 p-3 rounded-sm">
                  <p className="font-body text-xs text-brand-mud/80">
                    Prices may have changed since you added items. Final prices
                    will be confirmed at checkout.
                  </p>
                </div>

              </div>
            </>
          )}
        </div>

        {/* Sticky footer with summary */}
        {state.items.length > 0 && (
          <SheetFooter className="border-t border-brand-mud/20 pt-4">
            <CartSummary />
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
