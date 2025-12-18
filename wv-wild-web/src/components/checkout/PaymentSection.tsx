/**
 * Payment Section (Stub)
 *
 * Mock payment UI for SPEC-03.
 * Ready to wire up Tactical Payments or similar 2A processor in SPEC-04.
 */

import { Lock, Shield, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/stores/cartStore';

interface PaymentSectionProps {
  total: number;
  onPaymentSuccess: () => void;
  onPaymentError?: (error: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export function PaymentSection({
  total,
  onPaymentSuccess,
  onPaymentError,
  isProcessing,
  setIsProcessing,
}: PaymentSectionProps) {
  const handlePayClick = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real implementation, this is where we'd:
      // 1. Send payment to 2A processor (Tactical Payments)
      // 2. Handle success/failure response
      // 3. Update order status

      // For stub: simulate success
      // When real payment is integrated, failures will call onPaymentError
      onPaymentSuccess();
    } catch (error) {
      console.error('[PaymentSection] Payment failed:', error);
      onPaymentError?.(
        error instanceof Error
          ? error.message
          : 'Payment processing failed. Please try again.'
      );
      setIsProcessing(false);
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="font-display font-bold text-xl text-brand-brown">
        Secure Payment
      </h2>

      {/* Mock Payment Form UI */}
      <div className="p-4 bg-stone-100 rounded-sm border-2 border-stone-200 space-y-3">
        {/* Card Number (mock) */}
        <div className="space-y-1">
          <label className="text-xs text-stone-500 font-medium">Card Number</label>
          <div className="h-12 bg-stone-200 rounded-sm flex items-center px-4">
            <span className="text-stone-400 text-sm">•••• •••• •••• ••••</span>
          </div>
        </div>

        {/* Expiry / CVV (mock) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-stone-500 font-medium">Expiry</label>
            <div className="h-12 bg-stone-200 rounded-sm flex items-center px-4">
              <span className="text-stone-400 text-sm">MM/YY</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-stone-500 font-medium">CVV</label>
            <div className="h-12 bg-stone-200 rounded-sm flex items-center px-4">
              <span className="text-stone-400 text-sm">•••</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-stone-500 text-center pt-2">
          Payment form will be connected to a 2A-compliant processor
        </p>
      </div>

      {/* Trust Signals */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-brand-mud">
        <div className="flex items-center gap-1">
          <Lock className="w-4 h-4 text-sign-green" />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4 text-sign-green" />
          <span>2A-Friendly Processor</span>
        </div>
        <div className="flex items-center gap-1">
          <CreditCard className="w-4 h-4" />
          <span>Visa, MC, Amex</span>
        </div>
      </div>

      {/* Payment Provider Badge */}
      <div className="flex items-center justify-center gap-2 py-3 px-4 bg-brand-cream/50 rounded-sm border border-brand-mud/10">
        <Lock className="w-4 h-4 text-sign-green" />
        <span className="text-sm text-brand-mud">
          Secure payment powered by <strong className="text-brand-brown">Tactical Payments</strong>
        </span>
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-brand-brown text-brand-cream rounded-sm">
          2A-Friendly
        </span>
      </div>

      {/* Pay Button */}
      <Button
        type="button"
        variant="cta"
        size="lg"
        className="w-full h-14 text-lg"
        onClick={handlePayClick}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            Processing...
          </span>
        ) : (
          <>
            <Lock className="w-5 h-5 mr-2" />
            Pay {formatPrice(total)}
          </>
        )}
      </Button>

      <p className="text-xs text-brand-mud/60 text-center">
        By clicking "Pay", you agree to our{' '}
        <a href="/terms" className="underline hover:text-sign-green">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="underline hover:text-sign-green">
          Privacy Policy
        </a>
        .
      </p>
    </section>
  );
}
