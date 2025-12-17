import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart, type CartItem } from '@/hooks/useCart';
import { formatPrice } from '@/stores/cartStore';

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();
  const isFirearm = item.fulfillmentType === 'reserve_hold';

  return (
    <div className="flex gap-4 py-4 border-b border-brand-mud/20">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-contain bg-white rounded-sm border border-brand-mud/20"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-brand-brown text-base leading-tight mb-1">
          {item.name}
        </h3>

        {/* Fulfillment Badge */}
        {item.fulfillmentType === 'pickup_only' && (
          <Badge className="bg-brand-brown text-brand-cream text-xs rounded-sm mb-2">
            Pickup Only
          </Badge>
        )}
        {item.fulfillmentType === 'reserve_hold' && (
          <Badge className="bg-sign-green text-white text-xs rounded-sm mb-2">
            Reserved
          </Badge>
        )}

        {/* Quantity Controls or Firearm Notice */}
        <div className="flex items-center gap-2 mt-2">
          {isFirearm ? (
            <span className="text-sm text-brand-mud font-body">Qty: 1</span>
          ) : (
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
                className="h-8 w-8 p-0 rounded-sm"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-sm font-body text-brand-brown w-8 text-center">
                {item.quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.productId, Math.min(item.maxQuantity, item.quantity + 1))}
                disabled={item.quantity >= item.maxQuantity}
                aria-label="Increase quantity"
                className="h-8 w-8 p-0 rounded-sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Remove Link */}
        <button
          onClick={() => removeItem(item.productId)}
          className="text-sm text-red-600 hover:text-red-700 mt-2 font-body underline"
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </button>
      </div>

      {/* Price */}
      <div className="flex-shrink-0 text-right">
        <p className="font-display text-lg font-bold text-sign-green">
          {formatPrice(item.price * item.quantity)}
        </p>
        {item.quantity > 1 && (
          <p className="text-sm text-brand-mud/60 font-body">
            {formatPrice(item.price)} each
          </p>
        )}
      </div>
    </div>
  );
}
