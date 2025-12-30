/**
 * River Template Validation Helpers
 * SPEC-14: T-011 - Validation utilities with clear error messages
 *
 * @module lib/validation/river
 */

import { ZodError } from 'zod';
import { RiverTemplatePropsSchema } from '@/types/adventure';
import type { RiverTemplateProps } from '@/types/adventure';

/**
 * Custom validation error class with detailed field-level errors.
 * Provides structured error information for debugging and user feedback.
 */
export class ValidationError extends Error {
  /**
   * Array of validation errors with field paths and messages.
   * Example: [{ path: 'rapids.0.name', message: 'String must contain at least 1 character(s)' }]
   */
  public errors: Array<{ path: string; message: string }>;

  constructor(message: string, errors: Array<{ path: string; message: string }>) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;

    // Maintains proper stack trace for where error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }

  /**
   * Returns a formatted error message with all validation errors.
   * Useful for logging and debugging.
   */
  toString(): string {
    const errorList = this.errors
      .map(err => `  - ${err.path}: ${err.message}`)
      .join('\n');
    return `${this.message}\n${errorList}`;
  }
}

/**
 * Validates river template data against the RiverTemplatePropsSchema.
 * Throws detailed ValidationError if validation fails.
 *
 * @param data - Unvalidated river template data
 * @returns Validated and typed RiverTemplateProps
 * @throws {ValidationError} If validation fails with detailed field-level errors
 *
 * @example
 * ```typescript
 * try {
 *   const validData = validateRiverTemplate(untrustedData);
 *   // validData is now type-safe RiverTemplateProps
 * } catch (error) {
 *   if (error instanceof ValidationError) {
 *     console.error('Validation failed:', error.errors);
 *   }
 * }
 * ```
 */
export function validateRiverTemplate(data: unknown): RiverTemplateProps {
  try {
    return RiverTemplatePropsSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      throw new ValidationError('River template validation failed', errors);
    }
    // Re-throw non-Zod errors
    throw error;
  }
}

/**
 * Safely validates river template data without throwing.
 * Returns validation result with success flag and data or errors.
 *
 * @param data - Unvalidated river template data
 * @returns Validation result object
 *
 * @example
 * ```typescript
 * const result = safeValidateRiverTemplate(untrustedData);
 * if (result.success) {
 *   console.log('Valid data:', result.data);
 * } else {
 *   console.error('Validation errors:', result.errors);
 * }
 * ```
 */
export function safeValidateRiverTemplate(
  data: unknown
):
  | { success: true; data: RiverTemplateProps }
  | { success: false; errors: Array<{ path: string; message: string }> }
{
  try {
    const validData = validateRiverTemplate(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { success: false, errors: error.errors };
    }
    // Handle unexpected errors
    return {
      success: false,
      errors: [{ path: 'unknown', message: 'Unexpected validation error' }],
    };
  }
}

/**
 * Validates only the hero section of river template data.
 * Useful for partial validation during form input.
 *
 * @param data - Unvalidated hero section data
 * @returns true if hero section is valid
 *
 * @example
 * ```typescript
 * const isValidHero = validateRiverHeroSection({
 *   name: 'Gauley River',
 *   image: '/images/gauley.jpg',
 *   imageAlt: 'Rapids',
 *   tagline: 'Epic whitewater',
 *   description: 'Great river',
 *   stats: [{ value: '28 miles', label: 'Length' }]
 * });
 * ```
 */
export function validateRiverHeroSection(data: unknown): boolean {
  const heroSchema = RiverTemplatePropsSchema.pick({
    name: true,
    image: true,
    imageAlt: true,
    tagline: true,
    description: true,
    stats: true,
  });

  return heroSchema.safeParse(data).success;
}

/**
 * Validates river metadata section (length, county, difficulty range).
 * Useful for partial validation during form input.
 *
 * @param data - Unvalidated metadata
 * @returns true if metadata is valid
 */
export function validateRiverMetadata(data: unknown): boolean {
  const metadataSchema = RiverTemplatePropsSchema.pick({
    length: true,
    county: true,
    difficultyRange: true,
    quickHighlights: true,
  });

  return metadataSchema.safeParse(data).success;
}
