import { CartIcon, useCart } from '@/components/cart';

export default function HeaderCart() {
  const { setIsOpen } = useCart();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="text-white hover:text-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-sm p-1 transition-colors"
      aria-label="Open shopping cart"
    >
      <CartIcon />
    </button>
  );
}
