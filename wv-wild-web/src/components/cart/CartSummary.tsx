// CartSummary.tsx - Cart totals and checkout CTA
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/stores/cartStore';
import { trackCartEvent } from '@/lib/cart-analytics';

export function CartSummary() {
  const { summary } = useCart();

  const handleCheckout = () => {
    trackCartEvent({
      event: 'begin_checkout',
      itemCount: summary.itemCount,
      subtotal: summary.subtotal,
    });
    // TODO: Navigate to checkout page
  };

  return (
    <div className="border-t border-brand-mud/20 pt-4 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-brand-mud">
          {summary.itemCount} {summary.itemCount === 1 ? 'item' : 'items'}
        </span>
        <span className="font-display font-bold text-lg text-brand-brown">
          {formatPrice(summary.subtotal)}
        </span>
      </div>
      <Button
        onClick={handleCheckout}
        className="w-full bg-sign-green hover:bg-sign-green/90 text-white font-display font-bold"
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}
