/**
 * Validation utilities for HistoricTemplateProps
 * Prevents WCAG violations and ensures content quality before deployment
 */

import type { HistoricTemplateProps } from '../types/templates/historic';

export interface ValidationMessage {
  level: 'error' | 'warning' | 'info';
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationMessage[];
  warnings: ValidationMessage[];
  info: ValidationMessage[];
}

/**
 * WCAG 2.1 AA contrast ratio minimum: 4.5:1 for normal text, 3:1 for large text (≥18px)
 * Heritage-gold (#d18a00, #ffc655) has insufficient contrast on white backgrounds for small text
 */
const WCAG_CONTRAST_RULES = {
  'heritage-gold-dark': { hex: '#d18a00', minFontSize: 18, contrast: 3.2 }, // Fails <18px
  'heritage-gold-light': { hex: '#ffc655', minFontSize: 24, contrast: 2.1 }, // Large text only
  'heritage-burgundy': { hex: '#93282c', minFontSize: 0, contrast: 8.9 }, // Passes all sizes
  'coal-gray': { hex: '#424242', minFontSize: 0, contrast: 9.7 } // Passes all sizes
};

/**
 * Validate required fields exist and meet minimum standards
 */
function validateRequiredFields(props: HistoricTemplateProps): ValidationMessage[] {
  const errors: ValidationMessage[] = [];

  if (!props.name || props.name.trim().length === 0) {
    errors.push({
      level: 'error',
      field: 'name',
      message: 'Site name is required'
    });
  }

  if (!props.location || props.location.trim().length === 0) {
    errors.push({
      level: 'error',
      field: 'location',
      message: 'Location is required'
    });
  }

  if (!props.era || props.era.trim().length === 0) {
    errors.push({
      level: 'error',
      field: 'era',
      message: 'Historical era is required'
    });
  }

  if (!props.heroImage || typeof props.heroImage !== 'string' || props.heroImage.trim().length === 0) {
    errors.push({
      level: 'error',
      field: 'heroImage',
      message: 'Hero image URL is required'
    });
  }

  return errors;
}

/**
 * Validate image credits follow Library of Congress/Archives format
 * Format: "Photo: [Source], [Catalog Number]"
 */
function validateImageCredits(props: HistoricTemplateProps): ValidationMessage[] {
  const warnings: ValidationMessage[] = [];
  const creditRegex = /^Photo:\s+.+,\s+.+$/;

  // Validate hero image credit (top-level heroImageCredit field)
  if (props.heroImageCredit && !creditRegex.test(props.heroImageCredit)) {
    warnings.push({
      level: 'warning',
      field: 'heroImageCredit',
      message: 'Image credit should follow format: "Photo: [Source], [Catalog Number]"'
    });
  }

  // Validate structure image credits
  if (props.structures) {
    props.structures.forEach((structure, index) => {
      if (structure.imageCredit && !creditRegex.test(structure.imageCredit)) {
        warnings.push({
          level: 'warning',
          field: `structures[${index}].imageCredit`,
          message: `Structure "${structure.name}" image credit should follow format: "Photo: [Source], [Catalog Number]"`
        });
      }
    });
  }

  return warnings;
}

/**
 * Validate tour booking URLs are valid HTTPS
 */
function validateTourBookingUrls(props: HistoricTemplateProps): ValidationMessage[] {
  const warnings: ValidationMessage[] = [];

  if (props.tours) {
    props.tours.forEach((tour, index) => {
      if (tour.reservationUrl) {
        try {
          const url = new URL(tour.reservationUrl);
          if (url.protocol !== 'https:') {
            warnings.push({
              level: 'warning',
              field: `tours[${index}].reservationUrl`,
              message: `Tour "${tour.name}" reservation URL should use HTTPS protocol`
            });
          }
        } catch {
          warnings.push({
            level: 'warning',
            field: `tours[${index}].reservationUrl`,
            message: `Tour "${tour.name}" has invalid reservation URL format`
          });
        }
      } else if (tour.type === 'ranger-led') {
        warnings.push({
          level: 'warning',
          field: `tours[${index}].reservationUrl`,
          message: `Ranger-led tour "${tour.name}" should include reservationUrl for booking`
        });
      }
    });
  }

  return warnings;
}

/**
 * Check for heritage color usage compliance with WCAG contrast
 * Note: This is a content validation - actual color enforcement happens in CSS
 */
function validateHeritageColorUsage(props: HistoricTemplateProps): ValidationMessage[] {
  const warnings: ValidationMessage[] = [];
  const info: ValidationMessage[] = [];

  // Info: Heritage-gold should only be used for large text (≥18px) or metallic accents
  if (props.significance && props.significance.includes('gold')) {
    info.push({
      level: 'info',
      field: 'significance',
      message: 'If using heritage-gold color, ensure text is ≥18px for WCAG compliance'
    });
  }

  // Warn if content suggests using heritage-gold backgrounds
  const sections = [
    props.significance,
    props.historicalContext?.significance,
    ...(props.historicalContext?.events?.map(e => e.description) || [])
  ].filter(Boolean);

  sections.forEach((content, index) => {
    if (content && /background|bg-/.test(content.toLowerCase())) {
      warnings.push({
        level: 'warning',
        field: `content-section-${index}`,
        message: 'Avoid heritage-gold backgrounds - insufficient contrast for body text'
      });
    }
  });

  return [...warnings, ...info];
}

/**
 * Main validation function for HistoricTemplateProps
 */
export function validateHistoricProps(props: HistoricTemplateProps): ValidationResult {
  const errors: ValidationMessage[] = [];
  const warnings: ValidationMessage[] = [];
  const info: ValidationMessage[] = [];

  // Run all validations
  errors.push(...validateRequiredFields(props));
  warnings.push(...validateImageCredits(props));
  warnings.push(...validateTourBookingUrls(props));

  const colorValidation = validateHeritageColorUsage(props);
  warnings.push(...colorValidation.filter(m => m.level === 'warning'));
  info.push(...colorValidation.filter(m => m.level === 'info'));

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    info
  };
}

/**
 * Helper to format validation results for console output
 */
export function formatValidationResults(result: ValidationResult): string {
  const lines: string[] = [];

  if (result.valid) {
    lines.push('✅ Validation passed');
  } else {
    lines.push('❌ Validation failed');
  }

  if (result.errors.length > 0) {
    lines.push('\nErrors:');
    result.errors.forEach(error => {
      lines.push(`  - [${error.field}] ${error.message}`);
    });
  }

  if (result.warnings.length > 0) {
    lines.push('\nWarnings:');
    result.warnings.forEach(warning => {
      lines.push(`  - [${warning.field}] ${warning.message}`);
    });
  }

  if (result.info.length > 0) {
    lines.push('\nInfo:');
    result.info.forEach(infoMsg => {
      lines.push(`  - [${infoMsg.field}] ${infoMsg.message}`);
    });
  }

  return lines.join('\n');
}
