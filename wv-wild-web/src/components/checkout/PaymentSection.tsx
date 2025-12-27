/**
 * Payment Section
 *
 * Initiates payment with Tactical Payments (2A-compliant processor).
 * Uses hosted payment page flow for PCI SAQ-A compliance.
 *
 * Flow:
 * 1. User clicks "Pay" button
 * 2. Call /api/payment/create-session worker
 * 3. Redirect to Tactical Payments hosted page
 * 4. Customer enters payment info
 * 5. Tactical redirects back to /order-confirmation with status
 * 6. Webhook updates order status in background
 */

import { Lock, Shield, CreditCard, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { formatPrice } from '@/stores/cartStore';
import { createPaymentRequest } from '@/lib/payment/tacticalPayments';
import { getPendingOrder } from '@/lib/orderUtils';
import type { CreateSessionResponse } from '@/lib/payment/schemas';
import { SITE_CONTACT } from '@/config/siteContact';

interface PaymentSectionProps {
  total: number;
  onPaymentSuccess: () => void;
  onPaymentError?: (error: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export function PaymentSection({
  total,
  onPaymentSuccess: _onPaymentSuccess, // Reserved for future payment integration
  onPaymentError,
  isProcessing,
  setIsProcessing,
}: PaymentSectionProps) {
  // Feature flag: Payment integration disabled until legal review
  const paymentEnabled = import.meta.env.PUBLIC_PAYMENT_ENABLED === 'true';

  const handlePayClick = async () => {
    setIsProcessing(true);

    try {
      // DISABLED: Payment integration under legal review
      if (!paymentEnabled) {
        throw new Error(
          "Online payment is coming soon! For now, please call us at (304) 649-5765 to complete your order."
        );
      }

      // Retrieve pending order from sessionStorage
      const orderResult = getPendingOrder();
      if (!orderResult.success) {
        throw new Error("Couldn't find your order. Please try refreshing the page.");
      }

      const order = orderResult.data;

      // Create payment request
      const paymentRequest = createPaymentRequest(order);

      // Call create-session worker
      const response = await fetch('/api/payment/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentRequest),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Couldn't create payment session. Please try again."
        );
      }

      const sessionData: CreateSessionResponse = await response.json();

      if (!sessionData.success || !sessionData.redirectUrl) {
        throw new Error(
          sessionData.error || "Couldn't create payment session. Please try again."
        );
      }

      // Redirect to Tactical Payments hosted page
      console.log('[PaymentSection] Redirecting to Tactical Payments...');
      window.location.href = sessionData.redirectUrl;
    } catch (error) {
      console.error('[PaymentSection] Payment initiation failed:', error);
      onPaymentError?.(
        error instanceof Error
          ? error.message
          : "Something went wrong with the payment. Give us a call at (304) 649-5765 and we'll sort it out."
      );
      setIsProcessing(false);
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="font-display font-bold text-xl text-brand-brown">
        Secure Payment
      </h2>

      {/* DISABLED: Payment integration under legal review */}
      {!paymentEnabled && (
        <Alert className="border-brand-orange/30 bg-brand-orange/5">
          <Phone className="w-5 h-5 text-brand-orange" />
          <AlertTitle className="font-display font-bold text-brand-brown">
            Call to Complete Your Order
          </AlertTitle>
          <AlertDescription className="font-body text-brand-mud">
            Online payment is coming soon! For now, please call us at{' '}
            <a href={SITE_CONTACT.phoneHref} className="font-medium text-sign-green hover:underline">
              {SITE_CONTACT.phoneDisplay}
            </a>{' '}
            to complete your order.
          </AlertDescription>
        </Alert>
      )}

      {/* Mock Payment Form UI */}
      <div className="p-4 bg-brand-cream rounded-sm border-2 border-brand-mud/30 space-y-3">
        {/* Card Number (mock) */}
        <div className="space-y-1">
          <label className="text-xs text-brand-mud/60 font-medium">Card Number</label>
          <div className="h-12 bg-brand-cream/70 rounded-sm flex items-center px-4">
            <span className="text-brand-mud/50 text-sm">•••• •••• •••• ••••</span>
          </div>
        </div>

        {/* Expiry / CVV (mock) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-brand-mud/60 font-medium">Expiry</label>
            <div className="h-12 bg-brand-cream/70 rounded-sm flex items-center px-4">
              <span className="text-brand-mud/50 text-sm">MM/YY</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-brand-mud/60 font-medium">CVV</label>
            <div className="h-12 bg-brand-cream/70 rounded-sm flex items-center px-4">
              <span className="text-brand-mud/50 text-sm">•••</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-brand-mud/60 text-center pt-2">
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

      {/* Pay Button (or Call Button if disabled) */}
      {!paymentEnabled ? (
        <Button
          type="button"
          variant="cta"
          size="lg"
          className="w-full h-14 text-lg"
          asChild
        >
          <a href={SITE_CONTACT.phoneHref}>
            <Phone className="w-5 h-5 mr-2" />
            Call to Complete Order
          </a>
        </Button>
      ) : (
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
      )}

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
