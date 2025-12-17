// CartIcon.tsx - Shopping cart icon with item count badge
import * as React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

interface CartIconProps {
  className?: string;
}

export function CartIcon({ className }: CartIconProps) {
  const { summary, setIsOpen } = useCart();
  const itemCount = summary.itemCount;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsOpen(true)}
      className={cn("relative", className)}
      aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}
    >
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-sm bg-brand-orange text-xs font-bold text-white">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
      {/* Screen reader announcement */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
      </span>
    </Button>
  );
}
