/**
 * Fulfillment Section
 *
 * Ship vs Pickup choice + shipping address form.
 * Conditionally shows based on cart contents.
 */

import type { UseFormReturn } from 'react-hook-form';
import { Store, Truck, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { US_STATES } from '@/config/usStates';
import { SITE_CONTACT } from '@/config/siteContact';
import type { CheckoutFormData } from './schemas/checkoutSchema';
import type { CartSummaryData } from '@/stores/cartStore';

interface FulfillmentSectionProps {
  form: UseFormReturn<CheckoutFormData>;
  summary: CartSummaryData;
}

export function FulfillmentSection({ form, summary }: FulfillmentSectionProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const fulfillment = watch('fulfillment');
  const showShippingChoice = summary.fulfillmentOptions.includes('ship') && summary.fulfillmentOptions.includes('pickup');
  const pickupOnly = !summary.fulfillmentOptions.includes('ship');
  const showShippingAddress = fulfillment === 'ship';

  return (
    <section className="space-y-4">
      <h2 className="font-display font-bold text-xl text-brand-brown">
        Fulfillment
      </h2>

      {/* Pickup Only Notice */}
      {pickupOnly && (
        <Alert variant="info" className="border-l-4 border-l-sign-green">
          <Store className="h-5 w-5" />
          <AlertTitle>In-Store Pickup Required</AlertTitle>
          <AlertDescription>
            {summary.hasFirearms
              ? "Firearms require in-store pickup with background check completion."
              : "Some items in your cart are pickup only (like ammunition)."}
          </AlertDescription>
        </Alert>
      )}

      {/* Ship/Pickup Choice */}
      {showShippingChoice && (
        <>
        <Label className="font-display font-bold text-brand-brown">
          How would you like to receive your order? <span className="text-brand-orange">*</span>
        </Label>
        <RadioGroup
          value={fulfillment}
          onValueChange={(value) => setValue('fulfillment', value as 'ship' | 'pickup')}
          className="space-y-3"
        >
          <div className={`flex items-start gap-3 p-4 border-2 rounded-sm cursor-pointer transition-colors ${
            fulfillment === 'ship' ? 'border-sign-green bg-sign-green/5' : 'border-brand-mud/30 hover:border-brand-mud/50'
          }`}>
            <RadioGroupItem value="ship" id="ship" className="mt-1" />
            <Label htmlFor="ship" className="flex-1 cursor-pointer">
              <span className="flex items-center gap-2 font-display font-bold text-brand-brown">
                <Truck className="h-5 w-5" />
                Ship to Address
              </span>
              <span className="block text-sm text-brand-mud mt-1">
                Standard shipping: 3-7 business days
              </span>
            </Label>
          </div>

          <div className={`flex items-start gap-3 p-4 border-2 rounded-sm cursor-pointer transition-colors ${
            fulfillment === 'pickup' ? 'border-sign-green bg-sign-green/5' : 'border-brand-mud/30 hover:border-brand-mud/50'
          }`}>
            <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
            <Label htmlFor="pickup" className="flex-1 cursor-pointer">
              <span className="flex items-center gap-2 font-display font-bold text-brand-brown">
                <Store className="h-5 w-5" />
                Pick Up in Store
              </span>
              <span className="block text-sm text-brand-mud mt-1">
                Usually ready same day
              </span>
            </Label>
          </div>
        </RadioGroup>
        </>
      )}

      {/* Shipping Address Form */}
      {showShippingAddress && (
        <div className="space-y-4 pt-4 border-t border-brand-mud/20">
          <h3 className="font-display font-bold text-lg text-brand-brown">
            Shipping Address
          </h3>

          {/* Street Address */}
          <div className="space-y-2">
            <Label htmlFor="street">
              Street Address <span className="text-brand-orange">*</span>
            </Label>
            <Input
              id="street"
              placeholder="123 Main St"
              autoComplete="street-address"
              {...register('street')}
              aria-invalid={errors.street ? 'true' : 'false'}
            />
            {errors.street && (
              <p className="text-sm text-red-600" role="alert">
                {errors.street.message}
              </p>
            )}
          </div>

          {/* Apt/Suite */}
          <div className="space-y-2">
            <Label htmlFor="apt">Apt / Suite / Unit</Label>
            <Input
              id="apt"
              placeholder="Apt 4B"
              autoComplete="address-line2"
              {...register('apt')}
            />
          </div>

          {/* City, State, ZIP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* City */}
            <div className="col-span-2 space-y-2">
              <Label htmlFor="city">
                City <span className="text-brand-orange">*</span>
              </Label>
              <Input
                id="city"
                placeholder="Birch River"
                autoComplete="address-level2"
                {...register('city')}
                aria-invalid={errors.city ? 'true' : 'false'}
              />
              {errors.city && (
                <p className="text-sm text-red-600" role="alert">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label htmlFor="state">
                State <span className="text-brand-orange">*</span>
              </Label>
              <Select
                value={watch('state') || ''}
                onValueChange={(value) => setValue('state', value)}
              >
                <SelectTrigger id="state" aria-invalid={errors.state ? 'true' : 'false'}>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="text-sm text-red-600" role="alert">
                  {errors.state.message}
                </p>
              )}
            </div>

            {/* ZIP */}
            <div className="space-y-2">
              <Label htmlFor="zip">
                ZIP <span className="text-brand-orange">*</span>
              </Label>
              <Input
                id="zip"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="26610"
                autoComplete="postal-code"
                {...register('zip')}
                aria-invalid={errors.zip ? 'true' : 'false'}
              />
              {errors.zip && (
                <p className="text-sm text-red-600" role="alert">
                  {errors.zip.message}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Pickup Location Card */}
      {(fulfillment === 'pickup' || pickupOnly) && (
        <div className="p-4 bg-brand-cream rounded-sm border-2 border-brand-mud/20">
          <h4 className="flex items-center gap-2 font-display font-bold text-brand-brown mb-2">
            <MapPin className="h-5 w-5 text-sign-green" />
            WV Wild Outdoors
          </h4>
          <div className="text-brand-mud">
            {SITE_CONTACT.addressLines.slice(1).map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <p className="text-sm text-brand-mud mt-2">
            <strong>Hours:</strong> {SITE_CONTACT.hours}
          </p>
          <a
            href={SITE_CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sign-green hover:underline text-sm mt-2 inline-block"
          >
            Get Directions →
          </a>
        </div>
      )}
    </section>
  );
}
