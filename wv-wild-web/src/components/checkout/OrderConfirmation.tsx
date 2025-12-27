/**
 * Order Confirmation
 *
 * Displays order confirmation with different next-steps based on order type:
 * - Firearms: 5-step pickup instructions
 * - Pickup: Store location and "we'll call" message
 * - Shipping: Tracking notice and delivery address
 */

import { useState, useEffect } from 'react';
import { CheckCircle, Package, Store, Shield, Phone, MapPin, Clock, FileText, UserCheck, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { clearCart } from '@/stores/cartStore';
import {
  getPendingOrder,
  clearPendingOrder,
  formatOrderPrice,
  formatOrderDate,
  getFullName,
  type OrderData,
} from '@/lib/orderUtils';
import { SITE_CONTACT } from '@/config/siteContact';
import { parsePaymentReturn, getPaymentStatusMessage, getPaymentActionText, type PaymentStatus } from '@/lib/payment/tacticalPayments';
import type { OrderStatusResponse } from '@/lib/payment/schemas';

export function OrderConfirmation() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    const verifyPaymentAndLoadOrder = async () => {
      // Check if this is a payment return from Tactical Payments
      const searchParams = new URLSearchParams(window.location.search);
      const paymentReturn = parsePaymentReturn(searchParams);

      if (paymentReturn) {
        console.log('[OrderConfirmation] Payment return detected:', paymentReturn.status);
        setPaymentStatus(paymentReturn.status);

        // If payment succeeded, poll for webhook confirmation
        if (paymentReturn.status === 'success' || paymentReturn.status === 'pending') {
          setIsPolling(true);
          await pollPaymentStatus(paymentReturn.orderId, paymentReturn.status);
          setIsPolling(false);
        }

        // If payment failed/cancelled, show error (order is still in sessionStorage)
        if (paymentReturn.status === 'declined' || paymentReturn.status === 'cancelled' || paymentReturn.status === 'error') {
          setLoading(false);
          return; // Don't clear cart, let user retry
        }
      }

      // Get order from sessionStorage with proper error handling
      const result = getPendingOrder();

      if (result.success) {
        setOrder(result.data);
        // Only clear cart/storage if payment succeeded
        if (!paymentReturn || paymentReturn.status === 'success') {
          clearCart();
          clearPendingOrder();
        }
      } else {
        // Log error for debugging, show user-friendly message
        if (result.error !== 'No pending order found') {
          console.error('[OrderConfirmation] Failed to retrieve order:', result.error);
          setErrorMessage(result.error);
        }
      }

      setLoading(false);
    };

    verifyPaymentAndLoadOrder();
  }, []);

  /**
   * Polls the status endpoint until webhook updates order status to "paid".
   * Maximum 5 attempts with 2-second intervals (10 seconds total).
   */
  const pollPaymentStatus = async (orderId: string, _initialStatus: PaymentStatus): Promise<void> => {
    const maxAttempts = 5;
    const pollInterval = 2000; // 2 seconds

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await fetch(`/api/orders/${orderId}/status`);

        if (!response.ok) {
          console.warn(`[OrderConfirmation] Status poll ${attempt}/${maxAttempts} failed:`, response.status);
          continue;
        }

        const statusData: OrderStatusResponse = await response.json();

        console.log(`[OrderConfirmation] Poll ${attempt}/${maxAttempts}: status=${statusData.status}`);

        if (statusData.status === 'paid') {
          console.log('[OrderConfirmation] Payment confirmed by webhook!');
          setPaymentStatus('success');
          return; // Success - webhook arrived
        }

        if (statusData.status === 'failed') {
          setPaymentStatus('declined');
          return; // Payment failed
        }

        // Status still pending, wait and retry
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, pollInterval));
        }
      } catch (error) {
        console.error(`[OrderConfirmation] Poll ${attempt}/${maxAttempts} error:`, error);
      }
    }

    // Polling timeout - webhook hasn't arrived yet, but payment may still process
    console.warn('[OrderConfirmation] Webhook polling timeout - status may update soon');
    // Keep initial status (likely 'pending' or 'success')
  };

  // Show payment error states BEFORE loading
  if (paymentStatus && ['declined', 'cancelled', 'error'].includes(paymentStatus) && !loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-brand-orange" />
        </div>

        <h1 className="font-display font-black text-2xl text-brand-brown mb-4 text-center">
          {paymentStatus === 'cancelled' ? 'Payment Cancelled' : 'Payment Issue'}
        </h1>

        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="w-5 h-5" />
          <AlertTitle>Payment {paymentStatus === 'cancelled' ? 'Cancelled' : 'Failed'}</AlertTitle>
          <AlertDescription className="font-body">
            {getPaymentStatusMessage(paymentStatus)}
          </AlertDescription>
        </Alert>

        <div className="bg-brand-cream border-2 border-brand-mud/20 rounded-sm p-6 mb-6">
          <p className="text-brand-brown font-medium mb-2">Your cart is still saved</p>
          <p className="text-brand-mud text-sm">
            {paymentStatus === 'cancelled'
              ? "You can return to checkout and try again."
              : "You can try a different payment method or call us for help."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="cta" asChild>
            <a href="/checkout">{getPaymentActionText(paymentStatus)}</a>
          </Button>
          <Button variant="outline" asChild>
            <a href={SITE_CONTACT.phoneHref}>
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </a>
          </Button>
        </div>
      </div>
    );
  }

  if (loading || isPolling) {
    const loadingMessage = isPolling ? 'Confirming payment...' : 'Loading...';
    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-4">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-brand-mud/20 rounded-full mx-auto mb-6" />
          <div className="h-8 bg-brand-mud/20 rounded w-48 mx-auto mb-4" />
          <div className="h-4 bg-brand-mud/20 rounded w-64 mx-auto" />
        </div>
        <p className="text-brand-mud/60 text-sm mt-4">{loadingMessage}</p>
      </div>
    );
  }

  // No order found or error retrieving - show honest uncertainty message
  if (!order) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-4">
        <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-8 h-8 text-brand-orange" />
        </div>
        <h1 className="font-display font-black text-2xl text-brand-brown mb-4">
          We Couldn't Find Your Order Details
        </h1>

        {/* Honest uncertainty - we can't verify what happened */}
        <div className="bg-brand-cream border-2 border-brand-orange/30 rounded-sm p-6 mb-6 text-left">
          <p className="text-brand-brown font-medium mb-3">
            This can happen if:
          </p>
          <ul className="text-brand-mud text-sm space-y-2 mb-4 list-disc list-inside">
            <li>You refreshed this page after placing your order</li>
            <li>Your browser cleared its data</li>
            <li>You're visiting from a different device or browser</li>
          </ul>
          <p className="text-brand-brown font-medium">
            Your payment may still have processed successfully.
          </p>
          <p className="text-brand-mud text-sm mt-2">
            Please call us at{' '}
            <a href={SITE_CONTACT.phoneHref} className="text-sign-green font-medium hover:underline">
              {SITE_CONTACT.phoneDisplay}
            </a>{' '}
            with your approximate order time and we'll confirm your order status.
          </p>
        </div>

        {errorMessage && (
          <p className="text-xs text-brand-mud/50 mb-6">
            Technical details: {errorMessage}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="cta" asChild>
            <a href={SITE_CONTACT.phoneHref}>
              <Phone className="w-4 h-4 mr-2" />
              Call to Confirm
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/shop">Continue Shopping</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-sign-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-sign-green" />
        </div>
        <h1 className="font-display font-black text-3xl text-brand-brown mb-2">
          Order Confirmed!
        </h1>
        <p className="text-brand-mud text-lg">
          Thanks, {order.contact.firstName}! We've got your order.
        </p>
        <p className="text-brand-mud/60 text-sm mt-2">
          Order #{order.id} • {formatOrderDate(order.createdAt)}
        </p>
      </div>

      {/* Order Type Badges */}
      <div className="flex justify-center gap-2 mb-8">
        {order.hasFirearms && (
          <Badge variant="ffl" className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Firearm Reserve
          </Badge>
        )}
        {order.fulfillment === 'pickup' && !order.hasFirearms && (
          <Badge variant="default" className="flex items-center gap-1">
            <Store className="w-3 h-3" />
            In-Store Pickup
          </Badge>
        )}
        {order.fulfillment === 'ship' && (
          <Badge variant="default" className="flex items-center gap-1">
            <Package className="w-3 h-3" />
            Shipping
          </Badge>
        )}
      </div>

      {/* Next Steps Section */}
      <div className="bg-white border-2 border-brand-mud/20 rounded-sm p-6 mb-8">
        <h2 className="font-display font-bold text-xl text-brand-brown mb-4">
          What Happens Next
        </h2>

        {/* Firearms Flow */}
        {order.hasFirearms && <FirearmNextSteps order={order} />}

        {/* Pickup Flow (non-firearm) */}
        {order.fulfillment === 'pickup' && !order.hasFirearms && (
          <PickupNextSteps order={order} />
        )}

        {/* Shipping Flow */}
        {order.fulfillment === 'ship' && !order.hasFirearms && (
          <ShippingNextSteps order={order} />
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white border-2 border-brand-mud/20 rounded-sm p-6 mb-8">
        <h2 className="font-display font-bold text-xl text-brand-brown mb-4">
          Order Summary
        </h2>

        {/* Items */}
        <div className="space-y-3 mb-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span className="text-brand-brown">
                {item.shortName} × {item.quantity}
              </span>
              <span className="text-brand-mud">
                {formatOrderPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <Separator className="bg-brand-mud/10 my-4" />

        {/* Totals */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-brand-mud">Subtotal</span>
            <span className="text-brand-brown">{formatOrderPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-mud">
              {order.fulfillment === 'ship' ? 'Shipping' : 'Pickup'}
            </span>
            <span className={order.shipping === 0 ? 'text-sign-green font-medium' : 'text-brand-brown'}>
              {order.shipping === 0 ? 'FREE' : formatOrderPrice(order.shipping)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-mud">Tax</span>
            <span className="text-brand-brown">
              {order.tax > 0 ? formatOrderPrice(order.tax) : '$0.00'}
            </span>
          </div>
        </div>

        <Separator className="bg-brand-mud/10 my-4" />

        <div className="flex justify-between items-center">
          <span className="font-display font-bold text-lg text-brand-brown">Total Paid</span>
          <span className="font-display font-bold text-xl text-sign-green">
            {formatOrderPrice(order.total)}
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-brand-cream border-2 border-brand-mud/20 rounded-sm p-6 mb-8">
        <h3 className="font-display font-bold text-lg text-brand-brown mb-3">
          Your Information
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-brand-mud/60 mb-1">Contact</p>
            <p className="text-brand-brown font-medium">{getFullName(order.contact)}</p>
            <p className="text-brand-mud">{order.contact.email}</p>
            <p className="text-brand-mud">{order.contact.phone}</p>
          </div>
          {order.fulfillment === 'ship' && order.shippingAddress && (
            <div>
              <p className="text-brand-mud/60 mb-1">Shipping To</p>
              <p className="text-brand-brown font-medium">{order.shippingAddress.street}</p>
              {order.shippingAddress.apt && (
                <p className="text-brand-mud">{order.shippingAddress.apt}</p>
              )}
              <p className="text-brand-mud">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Kim's Sign-off */}
      <div className="text-center py-6">
        <p className="font-hand text-2xl text-brand-brown mb-2">
          Grand love ya!
        </p>
        <p className="text-brand-mud">
          Thanks for shopping local. We appreciate you.
        </p>
        <p className="text-brand-mud/60 text-sm mt-4">
          Questions? Call us at{' '}
          <a href={SITE_CONTACT.phoneHref} className="text-sign-green hover:underline">
            {SITE_CONTACT.phoneDisplay}
          </a>
        </p>
      </div>

      {/* Continue Shopping */}
      <div className="text-center">
        <Button variant="cta" asChild>
          <a href="/shop">Continue Shopping</a>
        </Button>
      </div>
    </div>
  );
}

/**
 * Firearm Next Steps - 5-step pickup process
 */
function FirearmNextSteps({ order }: { order: OrderData }) {
  const steps = [
    {
      icon: Phone,
      title: "We'll call you",
      description: `We'll call ${order.contact.phone} within 24 hours to confirm your firearm reserve and schedule pickup.`,
    },
    {
      icon: UserCheck,
      title: 'Bring valid ID',
      description: "You'll need a valid government-issued photo ID for the background check.",
    },
    {
      icon: FileText,
      title: 'Complete ATF Form 4473',
      description: "We'll help you fill out the required federal paperwork in-store.",
    },
    {
      icon: Shield,
      title: 'NICS background check',
      description: 'We run the FBI background check. Most clear within minutes, some take up to 3 days.',
    },
    {
      icon: Store,
      title: 'Pick up your firearm',
      description: 'Once cleared, your firearm is ready to go home with you.',
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-brand-mud mb-4">
        Your firearm is reserved! Here's what happens next:
      </p>
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-sign-green/10 rounded-full flex items-center justify-center">
              <step.icon className="w-4 h-4 text-sign-green" />
            </div>
            <div>
              <p className="font-display font-bold text-brand-brown">
                {index + 1}. {step.title}
              </p>
              <p className="text-sm text-brand-mud">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <PickupLocation />
    </div>
  );
}

/**
 * Pickup Next Steps - Standard in-store pickup
 */
function PickupNextSteps({ order }: { order: OrderData }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-8 h-8 bg-sign-green/10 rounded-full flex items-center justify-center">
          <Phone className="w-4 h-4 text-sign-green" />
        </div>
        <div>
          <p className="font-display font-bold text-brand-brown">
            We'll call when it's ready
          </p>
          <p className="text-sm text-brand-mud">
            We'll call {order.contact.phone} when your order is ready for pickup.
            Usually same-day if ordered before 3pm.
          </p>
        </div>
      </div>
      <PickupLocation />
      {order.hasPickupOnlyItems && (
        <p className="text-sm text-brand-mud/80 bg-brand-cream p-3 rounded-sm">
          <strong>Note:</strong> Some items in your order (like ammo) require in-store pickup
          due to shipping restrictions.
        </p>
      )}
    </div>
  );
}

/**
 * Shipping Next Steps - Items being shipped
 */
function ShippingNextSteps({ order }: { order: OrderData }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-8 h-8 bg-sign-green/10 rounded-full flex items-center justify-center">
          <Package className="w-4 h-4 text-sign-green" />
        </div>
        <div>
          <p className="font-display font-bold text-brand-brown">
            Ships in 1-2 business days
          </p>
          <p className="text-sm text-brand-mud">
            We'll email {order.contact.email} with tracking info once your order ships.
          </p>
        </div>
      </div>
      {order.shippingAddress && (
        <div className="bg-brand-cream p-4 rounded-sm">
          <p className="text-sm text-brand-mud/60 mb-1">Shipping to:</p>
          <p className="text-brand-brown font-medium">{order.shippingAddress.street}</p>
          {order.shippingAddress.apt && (
            <p className="text-brand-mud">{order.shippingAddress.apt}</p>
          )}
          <p className="text-brand-mud">
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Pickup Location Card - Reusable store info
 */
function PickupLocation() {
  return (
    <div className="bg-brand-cream p-4 rounded-sm mt-4">
      <p className="font-display font-bold text-brand-brown mb-2">Pickup Location</p>
      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-sign-green mt-0.5 flex-shrink-0" />
          <div>
            {SITE_CONTACT.addressLines.map((line, i) => (
              <p key={i} className="text-brand-mud">{line}</p>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-sign-green flex-shrink-0" />
          <p className="text-brand-mud">{SITE_CONTACT.hours}</p>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-sign-green flex-shrink-0" />
          <a
            href={SITE_CONTACT.phoneHref}
            className="text-sign-green hover:underline"
          >
            {SITE_CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
      <a
        href={SITE_CONTACT.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-sign-green hover:underline mt-3"
      >
        <MapPin className="w-3 h-3" />
        Get Directions
      </a>
    </div>
  );
}
