/**
 * Checkout Schema Unit Tests
 *
 * Tests for Zod validation schemas including contact, shipping,
 * and full checkout form validation with Kim's voice error messages.
 */

import { describe, it, expect } from 'vitest';
import {
  contactSchema,
  shippingSchema,
  checkoutSchema,
  validateFirearmAgreement,
  formatPhoneNumber,
  normalizePhone,
} from '../checkoutSchema';

// ============================================================================
// Contact Schema Tests
// ============================================================================

describe('contactSchema', () => {
  const validContact = {
    firstName: 'Kim',
    lastName: 'Smith',
    email: 'kim@example.com',
    phone: '(304) 555-1234',
  };

  describe('valid inputs', () => {
    it('accepts valid contact', () => {
      expect(contactSchema.safeParse(validContact).success).toBe(true);
    });

    it('accepts minimum length names', () => {
      const result = contactSchema.safeParse({
        ...validContact,
        firstName: 'Jo',
        lastName: 'Li',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('firstName validation', () => {
    it('requires firstName min 2 chars', () => {
      const result = contactSchema.safeParse({ ...validContact, firstName: 'K' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "We need your first name to process your order."
        );
      }
    });

    it('rejects firstName over 50 chars', () => {
      const result = contactSchema.safeParse({
        ...validContact,
        firstName: 'A'.repeat(51),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('lastName validation', () => {
    it('requires lastName min 2 chars', () => {
      const result = contactSchema.safeParse({ ...validContact, lastName: 'S' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "We need your last name to process your order."
        );
      }
    });
  });

  describe('email validation', () => {
    it('requires valid email format', () => {
      const result = contactSchema.safeParse({ ...validContact, email: 'invalid' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "That email doesn't look quite right. Mind checking it?"
        );
      }
    });

    it('requires email not empty', () => {
      const result = contactSchema.safeParse({ ...validContact, email: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "We'll need your email to send the confirmation."
        );
      }
    });

    it('accepts various email formats', () => {
      const emails = [
        'kim@example.com',
        'kim.smith@example.com',
        'kim+tag@example.co.uk',
        'kim123@example.org',
      ];
      emails.forEach(email => {
        const result = contactSchema.safeParse({ ...validContact, email });
        expect(result.success).toBe(true);
      });
    });
  });

  describe('phone validation', () => {
    it('accepts various phone formats', () => {
      const formats = [
        '(304) 555-1234',
        '304-555-1234',
        '3045551234',
        '+1 304 555 1234',
        '+13045551234',
        '304.555.1234',
      ];
      formats.forEach(phone => {
        const result = contactSchema.safeParse({ ...validContact, phone });
        expect(result.success).toBe(true);
      });
    });

    it('rejects invalid phone formats', () => {
      const invalid = ['123', '12345678901234', 'not-a-phone', '555-1234'];
      invalid.forEach(phone => {
        const result = contactSchema.safeParse({ ...validContact, phone });
        expect(result.success).toBe(false);
      });
    });

    it('shows friendly error message', () => {
      const result = contactSchema.safeParse({ ...validContact, phone: '123' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "That phone number doesn't look right. Try (304) 555-1234."
        );
      }
    });

    it('requires phone not empty', () => {
      const result = contactSchema.safeParse({ ...validContact, phone: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "We'll need your phone number to call when it's ready."
        );
      }
    });
  });
});

// ============================================================================
// Shipping Schema Tests
// ============================================================================

describe('shippingSchema', () => {
  const validShipping = {
    street: '123 Main Street',
    city: 'Birch River',
    state: 'WV',
    zip: '26610',
  };

  describe('valid inputs', () => {
    it('accepts valid shipping address', () => {
      expect(shippingSchema.safeParse(validShipping).success).toBe(true);
    });

    it('accepts optional apt field', () => {
      const result = shippingSchema.safeParse({ ...validShipping, apt: 'Suite 100' });
      expect(result.success).toBe(true);
    });

    it('accepts empty apt field', () => {
      const result = shippingSchema.safeParse({ ...validShipping, apt: '' });
      expect(result.success).toBe(true);
    });
  });

  describe('street validation', () => {
    it('requires street min 5 chars', () => {
      const result = shippingSchema.safeParse({ ...validShipping, street: '123' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Please enter your full street address."
        );
      }
    });

    it('rejects street over 100 chars', () => {
      const result = shippingSchema.safeParse({
        ...validShipping,
        street: 'A'.repeat(101),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('city validation', () => {
    it('requires city min 2 chars', () => {
      const result = shippingSchema.safeParse({ ...validShipping, city: 'A' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Please enter your city.");
      }
    });
  });

  describe('state validation', () => {
    it('requires exactly 2-char state code', () => {
      expect(shippingSchema.safeParse({ ...validShipping, state: 'W' }).success).toBe(false);
      expect(shippingSchema.safeParse({ ...validShipping, state: 'West Virginia' }).success).toBe(false);
      expect(shippingSchema.safeParse({ ...validShipping, state: 'WVA' }).success).toBe(false);
    });

    it('shows friendly error message', () => {
      const result = shippingSchema.safeParse({ ...validShipping, state: 'West Virginia' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Please select a state.");
      }
    });
  });

  describe('ZIP validation', () => {
    it('requires exactly 5-digit ZIP', () => {
      expect(shippingSchema.safeParse({ ...validShipping, zip: '2661' }).success).toBe(false);
      expect(shippingSchema.safeParse({ ...validShipping, zip: '266100' }).success).toBe(false);
      expect(shippingSchema.safeParse({ ...validShipping, zip: '26610-1234' }).success).toBe(false);
      expect(shippingSchema.safeParse({ ...validShipping, zip: '26610' }).success).toBe(true);
    });

    it('rejects non-numeric ZIP', () => {
      expect(shippingSchema.safeParse({ ...validShipping, zip: 'ABCDE' }).success).toBe(false);
    });

    it('shows friendly error message', () => {
      const result = shippingSchema.safeParse({ ...validShipping, zip: '1234' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "That ZIP code doesn't look right. Should be 5 digits."
        );
      }
    });
  });
});

// ============================================================================
// Full Checkout Schema Tests
// ============================================================================

describe('checkoutSchema conditional validation', () => {
  const baseData = {
    firstName: 'Kim',
    lastName: 'Smith',
    email: 'kim@example.com',
    phone: '(304) 555-1234',
    fulfillment: 'pickup' as const,
  };

  describe('pickup flow', () => {
    it('pickup does not require shipping address', () => {
      const result = checkoutSchema.safeParse(baseData);
      expect(result.success).toBe(true);
    });

    it('pickup ignores shipping address fields', () => {
      const result = checkoutSchema.safeParse({
        ...baseData,
        street: '', // Empty but doesn't matter for pickup
        city: '',
        state: '',
        zip: '',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('shipping flow', () => {
    it('ship requires shipping address', () => {
      const result = checkoutSchema.safeParse({ ...baseData, fulfillment: 'ship' });
      expect(result.success).toBe(false);
    });

    it('ship with valid address passes', () => {
      const result = checkoutSchema.safeParse({
        ...baseData,
        fulfillment: 'ship',
        street: '123 Main St',
        city: 'Birch River',
        state: 'WV',
        zip: '26610',
      });
      expect(result.success).toBe(true);
    });

    it('ship validates street length', () => {
      const result = checkoutSchema.safeParse({
        ...baseData,
        fulfillment: 'ship',
        street: '123', // Too short
        city: 'Birch River',
        state: 'WV',
        zip: '26610',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const streetError = result.error.issues.find(i => i.path[0] === 'street');
        expect(streetError?.message).toBe("Where should we ship this?");
      }
    });

    it('ship validates ZIP format', () => {
      const result = checkoutSchema.safeParse({
        ...baseData,
        fulfillment: 'ship',
        street: '123 Main St',
        city: 'Birch River',
        state: 'WV',
        zip: '1234', // Invalid
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const zipError = result.error.issues.find(i => i.path[0] === 'zip');
        expect(zipError?.message).toBe("That ZIP code doesn't look right. Should be 5 digits.");
      }
    });
  });
});

// ============================================================================
// Firearm Agreement Validation Tests
// ============================================================================

describe('validateFirearmAgreement', () => {
  it('returns null when no firearms', () => {
    expect(validateFirearmAgreement(false, false)).toBeNull();
    expect(validateFirearmAgreement(undefined, false)).toBeNull();
  });

  it('returns error when firearms without agreement', () => {
    expect(validateFirearmAgreement(false, true)).toBe(
      "Please confirm you understand the firearm reserve terms."
    );
    expect(validateFirearmAgreement(undefined, true)).toBe(
      "Please confirm you understand the firearm reserve terms."
    );
  });

  it('returns null when firearms with agreement', () => {
    expect(validateFirearmAgreement(true, true)).toBeNull();
  });

  it('returns null when agreement given but no firearms', () => {
    expect(validateFirearmAgreement(true, false)).toBeNull();
  });
});

// ============================================================================
// Phone Formatting Tests
// ============================================================================

describe('formatPhoneNumber', () => {
  it('formats 10-digit numbers', () => {
    expect(formatPhoneNumber('3045551234')).toBe('(304) 555-1234');
  });

  it('handles already formatted input', () => {
    expect(formatPhoneNumber('(304) 555-1234')).toBe('(304) 555-1234');
    expect(formatPhoneNumber('304-555-1234')).toBe('(304) 555-1234');
  });

  it('handles numbers with +1 prefix', () => {
    expect(formatPhoneNumber('+13045551234')).toBe('(304) 555-1234');
    expect(formatPhoneNumber('+1 304 555 1234')).toBe('(304) 555-1234');
  });

  it('returns original if cleaned result is not 10 digits', () => {
    expect(formatPhoneNumber('123')).toBe('123');
    expect(formatPhoneNumber('')).toBe('');
    expect(formatPhoneNumber('555-1234')).toBe('555-1234'); // Only 7 digits
  });

  it('formats 11-digit numbers by taking last 10', () => {
    // 12345678901 -> slice(-10) -> 2345678901 -> formatted
    expect(formatPhoneNumber('12345678901')).toBe('(234) 567-8901');
  });
});

describe('normalizePhone', () => {
  it('strips all formatting', () => {
    expect(normalizePhone('(304) 555-1234')).toBe('3045551234');
    expect(normalizePhone('+1 304-555-1234')).toBe('3045551234');
    expect(normalizePhone('304.555.1234')).toBe('3045551234');
  });

  it('keeps last 10 digits only', () => {
    expect(normalizePhone('+13045551234')).toBe('3045551234');
    expect(normalizePhone('113045551234')).toBe('3045551234');
  });

  it('handles short numbers', () => {
    expect(normalizePhone('555-1234')).toBe('5551234');
    expect(normalizePhone('1234')).toBe('1234');
  });
});
