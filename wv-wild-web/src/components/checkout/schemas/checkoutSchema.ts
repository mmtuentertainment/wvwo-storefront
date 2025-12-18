/**
 * Checkout Form Validation Schemas
 *
 * Zod schemas with Kim's voice for error messages.
 * "We need your first name" > "Invalid field"
 */

import { z } from 'zod';

// ============================================================================
// Patterns
// ============================================================================

// US phone: accepts (304) 555-1234, 304-555-1234, 3045551234, +1 304 555 1234
const phonePattern = /^(\+1)?[\s.-]?\(?[0-9]{3}\)?[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/;

// US ZIP: exactly 5 digits
const zipPattern = /^\d{5}$/;

// ============================================================================
// Contact Schema
// ============================================================================

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, "We need your first name to process your order.")
    .max(50, "First name is too long."),

  lastName: z
    .string()
    .min(2, "We need your last name to process your order.")
    .max(50, "Last name is too long."),

  email: z
    .string()
    .min(1, "We'll need your email to send the confirmation.")
    .email("That email doesn't look quite right. Mind checking it?"),

  phone: z
    .string()
    .min(1, "We'll need your phone number to call when it's ready.")
    .regex(phonePattern, "That phone number doesn't look right. Try (304) 555-1234."),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ============================================================================
// Shipping Address Schema
// ============================================================================

export const shippingSchema = z.object({
  street: z
    .string()
    .min(5, "Please enter your full street address.")
    .max(100, "Street address is too long."),

  apt: z
    .string()
    .max(50, "Apt/Suite is too long.")
    .optional()
    .or(z.literal('')),

  city: z
    .string()
    .min(2, "Please enter your city.")
    .max(50, "City name is too long."),

  state: z
    .string()
    .min(1, "Please select a state.")
    .length(2, "Please select a state."),

  zip: z
    .string()
    .regex(zipPattern, "That ZIP code doesn't look right. Should be 5 digits."),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;

// ============================================================================
// Full Checkout Schema
// ============================================================================

export const checkoutSchema = z
  .object({
    // Contact info (always required)
    firstName: contactSchema.shape.firstName,
    lastName: contactSchema.shape.lastName,
    email: contactSchema.shape.email,
    phone: contactSchema.shape.phone,

    // Fulfillment choice
    fulfillment: z.enum(['ship', 'pickup'], {
      required_error: "Please choose how you'd like to receive your order.",
    }),

    // Shipping address (conditionally required when fulfillment === 'ship')
    street: z.string().optional(),
    apt: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),

    // Firearm reserve agreement (conditionally required when cart has firearms)
    reserveAgree: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // Validate shipping address if shipping is selected
    if (data.fulfillment === 'ship') {
      if (!data.street || data.street.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['street'],
          message: "Where should we ship this?",
        });
      }
      if (!data.city || data.city.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['city'],
          message: "Please enter your city.",
        });
      }
      if (!data.state || data.state.length !== 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['state'],
          message: "Please select a state.",
        });
      }
      if (!data.zip || !zipPattern.test(data.zip)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['zip'],
          message: "That ZIP code doesn't look right. Should be 5 digits.",
        });
      }
    }
  });

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// ============================================================================
// Helper: Validate firearm agreement separately
// ============================================================================

/**
 * Validates the firearm reserve agreement.
 * Call this separately when cart.hasFirearms is true.
 */
export function validateFirearmAgreement(
  reserveAgree: boolean | undefined,
  hasFirearms: boolean
): string | null {
  if (hasFirearms && !reserveAgree) {
    return "Please confirm you understand the firearm reserve terms.";
  }
  return null;
}

// ============================================================================
// Helper: Validate state restrictions for firearms
// ============================================================================

/**
 * Validates state restrictions for handgun purchases.
 * Federal law (18 U.S.C. § 922(b)(3)) prohibits out-of-state handgun sales.
 *
 * @param customerState - The customer's state (from shipping address or ID)
 * @param hasHandguns - Whether the cart contains handguns
 * @returns Validation result with error message if invalid
 */
export function validateStateRestriction(
  customerState: string | undefined,
  hasHandguns: boolean
): { valid: boolean; error?: string } {
  // CRITICAL: Block out-of-state handgun purchases entirely
  // Normalize to uppercase for case-insensitive comparison
  const normalizedState = customerState?.toUpperCase();
  if (hasHandguns && normalizedState && normalizedState !== 'WV') {
    return {
      valid: false,
      error: 'Handgun purchases require WV residency. Out-of-state customers can have handguns transferred to an FFL in their home state (contact us for details).',
    };
  }
  return { valid: true };
}

/**
 * Validates state for long gun sales.
 * Long guns can be sold to residents of contiguous states.
 *
 * @param customerState - The customer's state
 * @returns Whether the state is valid for long gun purchase
 */
export function validateLongGunState(customerState: string): boolean {
  const contiguousStates = ['WV', 'OH', 'PA', 'MD', 'VA', 'KY'];
  // Normalize to uppercase for case-insensitive comparison
  return contiguousStates.includes(customerState.toUpperCase());
}

// ============================================================================
// Utility: Format phone for display
// ============================================================================

/**
 * Formats a phone number to (XXX) XXX-XXXX format
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '').slice(-10);
  if (cleaned.length !== 10) return phone;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}

// ============================================================================
// Utility: Normalize phone for submission
// ============================================================================

/**
 * Strips formatting from phone number for storage/API
 */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '').slice(-10);
}
