/**
 * Checkout Progress Indicator
 *
 * Visual step indicator for checkout flow.
 * Shows current progress through: Info → Shipping → Payment → Review
 * Responsive: Shows numbers + labels on desktop, numbers only on mobile.
 */

import { Fragment } from 'react';
import { Check } from 'lucide-react';

export type CheckoutStep = 1 | 2 | 3 | 4;

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
}

const STEPS = [
  { num: 1 as const, label: 'Info' },
  { num: 2 as const, label: 'Shipping' },
  { num: 3 as const, label: 'Payment' },
  { num: 4 as const, label: 'Review' },
];

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return (
    <nav aria-label="Checkout progress" className="mb-8">
      <ol className="flex items-center justify-center gap-1 sm:gap-2">
        {STEPS.map((step, index) => {
          const isCompleted = step.num < currentStep;
          const isCurrent = step.num === currentStep;
          const isPending = step.num > currentStep;

          return (
            <Fragment key={step.num}>
              <li className="flex items-center gap-1 sm:gap-2">
                {/* Step Circle */}
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors
                    ${isCompleted ? 'bg-sign-green border-sign-green text-white' : ''}
                    ${isCurrent ? 'border-sign-green text-sign-green bg-white' : ''}
                    ${isPending ? 'border-brand-mud/30 text-brand-mud/40 bg-white' : ''}
                  `}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <span>{step.num}</span>
                  )}
                </div>

                {/* Step Label - hidden on small screens */}
                <span
                  className={`
                    hidden sm:inline text-sm font-medium
                    ${isCompleted ? 'text-sign-green' : ''}
                    ${isCurrent ? 'text-sign-green' : ''}
                    ${isPending ? 'text-brand-mud/40' : ''}
                  `}
                >
                  {step.label}
                </span>
              </li>

              {/* Connector Line (between steps) */}
              {index < STEPS.length - 1 && (
                <li aria-hidden="true" className="flex-shrink-0">
                  <div
                    className={`
                      w-6 sm:w-8 h-0.5 transition-colors
                      ${step.num < currentStep ? 'bg-sign-green' : 'bg-brand-mud/20'}
                    `}
                  />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>

      {/* Screen reader description */}
      <p className="sr-only">
        Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1]?.label}
      </p>
    </nav>
  );
}
