/**
 * Order Summary
 *
 * Displays cart items, subtotal, shipping, tax, and total.
 * Sticky on desktop, collapsible on mobile.
 */

import { ChevronDown, Package, Store } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatPrice, type CartItem } from '@/stores/cartStore';
import { qualifiesForFreeShipping, getAmountForFreeShipping } from '@/lib/shipping';
import type { CartSummaryData } from '@/stores/cartStore';

interface OrderSummaryProps {
  items: CartItem[];
  summary: CartSummaryData;
  fulfillment: 'ship' | 'pickup' | undefined;
  shippingState: string | undefined;
  shippingCost: number;
  tax: number;
  total: number;
}

export function OrderSummary({
  items,
  summary,
  fulfillment,
  shippingState,
  shippingCost,
  tax,
  total,
}: OrderSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const itemsArray = Object.values(items);
  const amountForFreeShipping = getAmountForFreeShipping(summary.subtotal);
  const hasFreeShipping = qualifiesForFreeShipping(summary.subtotal);

  return (
    <div className="bg-white border-2 border-brand-mud/20 rounded-sm">
      {/* Mobile: Collapsible Header */}
      <button
        type="button"
        className="w-full lg:hidden flex items-center justify-between p-4 text-left"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className="font-display font-bold text-lg text-brand-brown">
          Order Summary ({summary.itemCount} {summary.itemCount === 1 ? 'item' : 'items'})
        </span>
        <span className="flex items-center gap-2">
          <span className="font-display font-bold text-lg text-brand-brown">
            {formatPrice(total)}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-brand-mud transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      {/* Desktop: Always Visible Header */}
      <div className="hidden lg:block p-4 border-b border-brand-mud/10">
        <h3 className="font-display font-bold text-lg text-brand-brown">
          Order Summary
        </h3>
      </div>

      {/* Content (expanded on mobile, always visible on desktop) */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block p-4 space-y-4`}>
        {/* Free Shipping Progress */}
        {fulfillment === 'ship' && !hasFreeShipping && amountForFreeShipping > 0 && (
          <div className="p-3 bg-sign-green/10 rounded-sm text-sm text-brand-brown">
            <Package className="w-4 h-4 inline mr-1" />
            Add {formatPrice(amountForFreeShipping)} more for <strong>FREE shipping!</strong>
          </div>
        )}

        {/* Item List */}
        <div className="space-y-3">
          {itemsArray.map((item) => (
            <div key={item.productId} className="flex gap-3">
              {/* Image */}
              <div className="w-16 h-16 bg-brand-cream rounded-sm flex-shrink-0 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.shortName}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-mud/30">
                    <Package className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-brand-brown text-sm truncate">
                  {item.shortName}
                </p>
                <p className="text-xs text-brand-mud">
                  Qty: {item.quantity}
                </p>
                {item.fulfillmentType === 'reserve_hold' && (
                  <Badge variant="ffl" className="mt-1 text-xs">
                    Reserved
                  </Badge>
                )}
                {item.fulfillmentType === 'pickup_only' && (
                  <Badge variant="default" className="mt-1 text-xs">
                    <Store className="w-3 h-3 mr-1" />
                    Pickup Only
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="text-sm font-medium text-brand-brown">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <Separator className="bg-brand-mud/10" />

        {/* Totals */}
        <div className="space-y-2 text-sm">
          {/* Subtotal */}
          <div className="flex justify-between">
            <span className="text-brand-mud">Subtotal</span>
            <span className="text-brand-brown">{formatPrice(summary.subtotal)}</span>
          </div>

          {/* Shipping */}
          {fulfillment === 'ship' && (
            <div className="flex justify-between">
              <span className="text-brand-mud">Shipping</span>
              <span className={`${hasFreeShipping ? 'text-sign-green font-medium' : 'text-brand-brown'}`}>
                {shippingState
                  ? hasFreeShipping
                    ? 'FREE'
                    : formatPrice(shippingCost)
                  : 'Enter address'}
              </span>
            </div>
          )}

          {/* Pickup Note */}
          {fulfillment === 'pickup' && (
            <div className="flex justify-between">
              <span className="text-brand-mud">Pickup</span>
              <span className="text-sign-green font-medium">FREE</span>
            </div>
          )}

          {/* Tax */}
          <div className="flex justify-between">
            <span className="text-brand-mud">Tax</span>
            <span className="text-brand-brown">
              {tax > 0 ? formatPrice(tax) : fulfillment ? '$0.00' : '—'}
            </span>
          </div>
        </div>

        <Separator className="bg-brand-mud/10" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="font-display font-bold text-lg text-brand-brown">Total</span>
          <span className="font-display font-bold text-xl text-brand-brown">
            {formatPrice(total)}
          </span>
        </div>

        {/* Notices */}
        {summary.hasFirearms && (
          <p className="text-xs text-brand-mud/80 pt-2">
            * Firearm purchases require in-store pickup with completed background check.
          </p>
        )}
        {summary.requiresAgeVerification && (
          <p className="text-xs text-brand-mud/80">
            * Age verification required at pickup for some items.
          </p>
        )}
      </div>
    </div>
  );
}
