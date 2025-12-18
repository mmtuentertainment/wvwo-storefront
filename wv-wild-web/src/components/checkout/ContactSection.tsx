/**
 * Contact Section
 *
 * First name, last name, email, phone fields.
 * Always required for all checkout flows.
 */

import type { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CheckoutFormData } from './schemas/checkoutSchema';

interface ContactSectionProps {
  form: UseFormReturn<CheckoutFormData>;
}

export function ContactSection({ form }: ContactSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <section className="space-y-4">
      <h2 className="font-display font-bold text-xl text-brand-brown">
        Contact Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-brand-orange">*</span>
          </Label>
          <Input
            id="firstName"
            placeholder="Kim"
            autoComplete="given-name"
            {...register('firstName')}
            aria-invalid={errors.firstName ? 'true' : 'false'}
          />
          {errors.firstName && (
            <p className="text-sm text-red-600" role="alert">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-brand-orange">*</span>
          </Label>
          <Input
            id="lastName"
            placeholder="Smith"
            autoComplete="family-name"
            {...register('lastName')}
            aria-invalid={errors.lastName ? 'true' : 'false'}
          />
          {errors.lastName && (
            <p className="text-sm text-red-600" role="alert">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-brand-orange">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="kim@example.com"
          autoComplete="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        <p className="text-sm text-brand-mud/60">
          We'll send your order confirmation here.
        </p>
        {errors.email && (
          <p className="text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone <span className="text-brand-orange">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          inputMode="tel"
          placeholder="(304) 555-1234"
          autoComplete="tel"
          {...register('phone')}
          aria-invalid={errors.phone ? 'true' : 'false'}
        />
        <p className="text-sm text-brand-mud/60">
          We'll call when your order is ready for pickup.
        </p>
        {errors.phone && (
          <p className="text-sm text-red-600" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>
    </section>
  );
}
