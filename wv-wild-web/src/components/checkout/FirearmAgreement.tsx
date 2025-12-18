/**
 * Firearm Reserve Agreement
 *
 * Legal agreement checkbox for firearm orders.
 * Only displayed when cart contains firearms (reserve_hold items).
 */

import type { UseFormReturn } from 'react-hook-form';
import { AlertTriangle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { CheckoutFormData } from './schemas/checkoutSchema';

interface FirearmAgreementProps {
  form: UseFormReturn<CheckoutFormData>;
}

export function FirearmAgreement({ form }: FirearmAgreementProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const reserveAgree = watch('reserveAgree');

  return (
    <section className="p-4 bg-brand-cream border-l-4 border-brand-orange rounded-sm">
      <h2 className="flex items-center gap-2 font-display font-bold text-xl text-brand-brown mb-3">
        <AlertTriangle className="h-5 w-5 text-brand-orange" />
        Firearm Reserve Agreement
      </h2>

      <div className="space-y-3 text-sm text-brand-mud">
        <p>By placing this order, you understand:</p>

        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Payment holds the firearm(s)</strong> for pickup at our store.
            This is a reserve, not a completed sale.
          </li>
          <li>
            <strong>Background check required.</strong> You must complete ATF Form 4473
            and pass NICS background check before taking possession.
          </li>
          <li>
            <strong>Valid ID required.</strong> Bring government-issued photo ID
            (WV Driver's License or ID preferred). Out-of-state residents may have
            restrictions.
          </li>
          <li>
            <strong>Age requirements.</strong> Must be 21+ for handguns, 18+ for long guns
            under federal law.
          </li>
          <li>
            <strong>Pickup window.</strong> Reserved items are held for 7 days.
            After 7 days, we'll contact you to confirm or process a refund.
          </li>
          <li>
            <strong>Refund policy.</strong> Full refund if background check is denied
            or if you cancel before pickup.
          </li>
        </ul>

        <div className="flex items-start gap-3 mt-4 pt-4 border-t border-brand-mud/20">
          <Checkbox
            id="reserveAgree"
            checked={reserveAgree || false}
            onCheckedChange={(checked) => setValue('reserveAgree', checked === true)}
            aria-invalid={errors.reserveAgree ? 'true' : 'false'}
          />
          <Label htmlFor="reserveAgree" className="text-sm leading-relaxed cursor-pointer">
            I understand and agree to the firearm reserve terms above. I confirm that I am
            legally eligible to purchase firearms under federal and state law.
          </Label>
        </div>

        {errors.reserveAgree && (
          <p className="text-sm text-red-600 mt-2" role="alert">
            Please confirm you understand the firearm reserve terms.
          </p>
        )}
      </div>
    </section>
  );
}
