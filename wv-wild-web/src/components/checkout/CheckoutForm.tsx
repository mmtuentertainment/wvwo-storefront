/**
 * Checkout Form
 *
 * Main checkout orchestrator component.
 * Handles form state, validation, and submission for all three checkout flows.
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield, Package } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import {
  checkoutSchema,
  validateFirearmAgreement,
  validateStateRestriction,
  type CheckoutFormData,
} from './schemas/checkoutSchema';
import { calculateShipping } from '@/lib/shipping';
import { createOrder, storePendingOrder, calculateTax, type CreateOrderParams } from '@/lib/orderUtils';

import { ContactSection } from './ContactSection';
import { FulfillmentSection } from './FulfillmentSection';
import { FirearmAgreement } from './FirearmAgreement';
import { PaymentSection } from './PaymentSection';
import { OrderSummary } from './OrderSummary';
import { CheckoutProgress } from './CheckoutProgress';

export function CheckoutForm() {
  const { state, summary, isEmpty } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [firearmError, setFirearmError] = useState<string | null>(null);
  const [stateError, setStateError] = useState<string | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Initialize form with react-hook-form + Zod
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      fulfillment: summary.fulfillmentOptions.length === 1 ? summary.fulfillmentOptions[0] : undefined,
      street: '',
      apt: '',
      city: '',
      state: '',
      zip: '',
      reserveAgree: false,
    },
  });

  const fulfillment = form.watch('fulfillment');
  const shippingState = form.watch('state');
  const reserveAgree = form.watch('reserveAgree');

  // Calculate shipping cost
  const shippingCost =
    fulfillment === 'ship' && shippingState
      ? calculateShipping(shippingState, summary.subtotal).cost
      : 0;

  // Calculate tax
  const tax = calculateTax(
    summary.subtotal,
    fulfillment === 'ship' ? shippingState : 'WV',
    fulfillment || 'pickup'
  );

  // Calculate total
  const total = summary.subtotal + shippingCost + tax;

  // Auto-set fulfillment when only one option
  useEffect(() => {
    if (summary.fulfillmentOptions.length === 1 && !fulfillment) {
      form.setValue('fulfillment', summary.fulfillmentOptions[0]);
    }
  }, [summary.fulfillmentOptions, fulfillment, form]);

  // Handle form submission
  const onSubmit = async (data: CheckoutFormData) => {
    // Validate firearm agreement separately (conditional)
    if (summary.hasFirearms) {
      const firearmValidation = validateFirearmAgreement(data.reserveAgree, summary.hasFirearms);
      if (firearmValidation) {
        setFirearmError(firearmValidation);
        return;
      }
    }
    setFirearmError(null);

    // Validate state restriction for firearm purchases (federal law)
    // Note: Currently uses hasFirearms as proxy. When product data includes firearmType,
    // this should specifically check for handguns (handguns have stricter state restrictions).
    // For now, since all WVWO firearms are pickup-only, this validation primarily
    // guards against future shipping scenarios.
    if (summary.hasFirearms && data.fulfillment === 'ship') {
      const stateValidation = validateStateRestriction(data.state, true);
      if (!stateValidation.valid) {
        setStateError(stateValidation.error || 'State restriction validation failed.');
        return;
      }
    }
    setStateError(null);

    // Create order object
    const orderParams: CreateOrderParams = {
      contact: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      },
      fulfillment: data.fulfillment,
      shippingAddress:
        data.fulfillment === 'ship'
          ? {
              street: data.street || '',
              apt: data.apt,
              city: data.city || '',
              state: data.state || '',
              zip: data.zip || '',
            }
          : undefined,
      items: Object.values(state.items),
      subtotal: summary.subtotal,
      shippingCost,
      summary,
      reserveAgreed: data.reserveAgree,
    };

    const order = createOrder(orderParams);

    // Store order for confirmation page (returns boolean)
    const stored = storePendingOrder(order);
    if (!stored) {
      // Storage failed - warn user but don't block payment
      setStorageError(
        `Couldn't save your order details locally. Please note your order number: ${order.id}`
      );
      console.error('[CheckoutForm] Storage failed');
    } else {
      setStorageError(null);
    }

    // Payment is handled by PaymentSection (stub for now)
    // Real payment would happen here via Tactical Payments redirect
  };

  // Handle successful payment (called by PaymentSection)
  const handlePaymentSuccess = () => {
    // Navigate to confirmation page
    window.location.href = '/order-confirmation';
  };

  // Handle pre-payment validation
  const handlePaymentAttempt = async (): Promise<boolean> => {
    try {
      // Clear previous errors
      setPaymentError(null);

      // Trigger form validation
      const isValid = await form.trigger();
      if (!isValid) {
        // Scroll to first error
        const firstError = document.querySelector('[aria-invalid="true"]');
        firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
      }

      // Validate firearm agreement
      if (summary.hasFirearms && !reserveAgree) {
        setFirearmError('Please confirm you understand the firearm reserve terms.');
        const agreementSection = document.getElementById('reserveAgree');
        agreementSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
      }

      // Submit form data (creates order and stores it)
      await form.handleSubmit(onSubmit)();
      return true;
    } catch (error) {
      console.error('[CheckoutForm] Payment preparation failed:', error);
      setPaymentError('Something went wrong preparing your order. Please try again.');
      return false;
    }
  };

  // Handle payment error from PaymentSection
  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    setIsProcessing(false);
  };

  // Redirect if cart is empty
  if (isEmpty) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-4">
        <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-8 h-8 text-brand-mud" />
        </div>
        <h1 className="font-display font-black text-2xl text-brand-brown mb-2">
          Your cart is empty
        </h1>
        <p className="text-brand-mud mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Button variant="cta" asChild>
          <a href="/shop">Browse Our Shop</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back to Cart */}
      <a
        href="/shop"
        className="inline-flex items-center gap-2 text-sign-green hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Continue Shopping
      </a>

      <h1 className="font-display font-black text-3xl text-brand-brown mb-8">
        Checkout
      </h1>

      {/* Cart Warnings */}
      {summary.hasFirearms && (
        <Alert variant="info" className="mb-6">
          <Shield className="w-4 h-4" />
          <AlertTitle>Firearm Purchase</AlertTitle>
          <AlertDescription>
            Federal background check (NICS) required. Must be 18+ for long guns, 21+ for handguns.
            Your order will be held as a reserve until you complete the in-store process.
          </AlertDescription>
        </Alert>
      )}

      {summary.hasPickupOnlyItems && !summary.hasFirearms && (
        <Alert variant="info" className="mb-6">
          <Package className="w-4 h-4" />
          <AlertTitle>Ammunition Notice</AlertTitle>
          <AlertDescription>
            Ammunition cannot be shipped and must be picked up in store.
            We'll call you when your order is ready.
          </AlertDescription>
        </Alert>
      )}

      {/* Storage Error Warning */}
      {storageError && (
        <Alert variant="warning" className="mb-6">
          <AlertTriangle className="w-4 h-4" />
          <AlertTitle>Please Note Your Order Number</AlertTitle>
          <AlertDescription>
            {storageError}
          </AlertDescription>
        </Alert>
      )}

      {/* Payment Error */}
      {paymentError && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="w-4 h-4" />
          <AlertTitle>Something Went Wrong</AlertTitle>
          <AlertDescription>
            {paymentError}
            <br />
            <span className="mt-2 block">
              Give us a call at (304) 649-5765 and we'll help sort it out.
            </span>
          </AlertDescription>
        </Alert>
      )}

      {/* State Restriction Error (Handgun out-of-state) */}
      {stateError && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="w-4 h-4" />
          <AlertTitle>State Restriction</AlertTitle>
          <AlertDescription>
            {stateError}
          </AlertDescription>
        </Alert>
      )}

      {/* Checkout Progress Indicator */}
      <CheckoutProgress currentStep={1} />

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Form - 2 columns on desktop */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Section */}
            <ContactSection form={form} />

            <Separator className="bg-brand-mud/20" />

            {/* Fulfillment Section */}
            <FulfillmentSection form={form} summary={summary} />

            {/* Firearm Agreement (conditional) */}
            {summary.hasFirearms && (
              <>
                <Separator className="bg-brand-mud/20" />
                <FirearmAgreement form={form} />
                {firearmError && (
                  <p className="text-sm text-red-600" role="alert">
                    {firearmError}
                  </p>
                )}
              </>
            )}

            <Separator className="bg-brand-mud/20" />

            {/* Payment Section */}
            <PaymentSection
              total={total}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
              isProcessing={isProcessing}
              setIsProcessing={async (processing) => {
                if (processing) {
                  const canProceed = await handlePaymentAttempt();
                  if (!canProceed) return;
                }
                setIsProcessing(processing);
              }}
            />
          </div>

          {/* Order Summary - sticky on desktop */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <OrderSummary
                items={state.items}
                summary={summary}
                fulfillment={fulfillment}
                shippingState={shippingState}
                shippingCost={shippingCost}
                tax={tax}
                total={total}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
