/**
 * AddToCartButton - Three-tier add-to-cart button for WVWO e-commerce
 *
 * Tiers:
 * - ship_or_pickup: Green "Add to Cart" button
 * - pickup_only: Green "Add to Cart" + "Pickup Only" badge
 * - reserve_hold: Brown "Reserve This Firearm" button
 */

import * as React from 'react';
import { useCart, type CartItem } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  product: {
    id: string;
    sku: string;
    name: string;
    shortName: string;
    price: number;
    priceDisplay: string;
    images: string[];
    fulfillmentType: 'ship_or_pickup' | 'pickup_only' | 'reserve_hold';
    fflRequired: boolean;
    maxQuantity?: number;
    ageRestriction?: 18 | 21;
  };
  quantity?: number;
  className?: string;
}

export function AddToCartButton({ product, quantity = 1, className }: AddToCartButtonProps) {
  const { addItem, setIsOpen } = useCart();
  const [added, setAdded] = React.useState(false);

  // Reset "added" state after 2 seconds
  React.useEffect(() => {
    if (added) {
      const timer = setTimeout(() => {
        setAdded(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [added]);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      productId: product.id,
      sku: product.sku,
      name: product.name,
      shortName: product.shortName,
      price: product.price,
      priceDisplay: product.priceDisplay,
      quantity,
      maxQuantity: product.maxQuantity ?? 10,
      image: product.images[0] || '/placeholder-product.jpg',
      fulfillmentType: product.fulfillmentType,
      fflRequired: product.fflRequired,
      ageRestriction: product.ageRestriction,
    };

    const result = addItem(cartItem);

    if (result.success) {
      setAdded(true);
      toast.success(result.message, {
        action: {
          label: 'View Cart',
          onClick: () => setIsOpen(true),
        },
      });
    } else {
      toast.error(result.message);
    }
  };

  // Determine button variant and text based on fulfillment type
  const isFirearm = product.fulfillmentType === 'reserve_hold';
  const buttonText = isFirearm ? 'Reserve This Firearm' : 'Add to Cart';

  return (
    <div className={className}>
      <Button
        variant={isFirearm ? 'wvwo' : 'cta'}
        size="lg"
        onClick={handleAddToCart}
        disabled={added}
        className="w-full"
      >
        {added ? 'Added ✓' : buttonText}
      </Button>

      {/* Tier 2: Pickup Only badge */}
      {product.fulfillmentType === 'pickup_only' && (
        <Badge className="mt-2 bg-brand-brown text-brand-cream rounded-sm">
          Pickup Only
        </Badge>
      )}
    </div>
  );
}
