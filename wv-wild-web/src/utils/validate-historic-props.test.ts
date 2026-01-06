/**
 * Tests for HistoricTemplateProps validation utilities
 */

import { describe, it, expect } from 'vitest';
import { validateHistoricProps, formatValidationResults } from './validate-historic-props';
import type { HistoricTemplateProps } from '../types/templates/historic';

describe('validateHistoricProps', () => {
  const validProps: HistoricTemplateProps = {
    name: 'Carnifex Ferry Battlefield',
    location: 'Summersville, WV',
    era: 'Civil War Era (1861)',
    heroImage: {
      src: '/images/carnifex.jpg',
      alt: 'Battlefield view',
      credit: 'Photo: Library of Congress, LC-DIG-12345'
    },
    quickHighlights: ['First Confederate defeat in WV'],
    significance: 'Strategic Civil War site'
  };

  it('should pass validation for complete valid props', () => {
    const result = validateHistoricProps(validProps);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should error on missing required name field', () => {
    const props = { ...validProps, name: '' };
    const result = validateHistoricProps(props);
    expect(result.valid).toBe(false);
    expect(result.errors).toContainEqual({
      level: 'error',
      field: 'name',
      message: 'Site name is required'
    });
  });

  it('should error on missing required location field', () => {
    const props = { ...validProps, location: '' };
    const result = validateHistoricProps(props);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'location')).toBe(true);
  });

  it('should error on missing hero image', () => {
    const props = { ...validProps, heroImage: undefined } as any;
    const result = validateHistoricProps(props);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'heroImage')).toBe(true);
  });

  it('should warn on invalid image credit format', () => {
    const props = {
      ...validProps,
      heroImage: {
        ...validProps.heroImage,
        credit: 'Invalid format'
      }
    };
    const result = validateHistoricProps(props);
    expect(result.warnings.some(w => w.field === 'heroImage.credit')).toBe(true);
  });

  it('should accept valid Library of Congress credit format', () => {
    const props = {
      ...validProps,
      heroImage: {
        ...validProps.heroImage,
        credit: 'Photo: Library of Congress, LC-DIG-cwpb-12345'
      }
    };
    const result = validateHistoricProps(props);
    expect(result.warnings.some(w => w.field === 'heroImage.credit')).toBe(false);
  });

  it('should warn on non-HTTPS tour reservation URL', () => {
    const props = {
      ...validProps,
      tours: [{
        name: 'Guided Tour',
        type: 'ranger-led' as const,
        duration: '1 hour',
        difficulty: 'easy' as const,
        description: 'Tour description',
        reservationUrl: 'http://insecure-site.com/book'
      }]
    };
    const result = validateHistoricProps(props);
    expect(result.warnings.some(w => w.message.includes('HTTPS'))).toBe(true);
  });

  it('should warn if ranger-led tour missing reservation URL', () => {
    const props = {
      ...validProps,
      tours: [{
        name: 'Guided Tour',
        type: 'ranger-led' as const,
        duration: '1 hour',
        difficulty: 'easy' as const,
        description: 'Tour description'
      }]
    };
    const result = validateHistoricProps(props);
    expect(result.warnings.some(w => w.message.includes('reservationUrl'))).toBe(true);
  });

  it('should provide info warning about heritage-gold WCAG compliance', () => {
    const props = {
      ...validProps,
      significance: 'Site features gold-trimmed artifacts'
    };
    const result = validateHistoricProps(props);
    expect(result.info.some(i => i.message.includes('heritage-gold'))).toBe(true);
  });

  it('should warn against heritage-gold backgrounds', () => {
    const props = {
      ...validProps,
      historicalContext: {
        overview: 'Use bg-heritage-gold for section background',
        timeline: [],
        keyEvents: []
      }
    };
    const result = validateHistoricProps(props);
    expect(result.warnings.some(w => w.message.includes('background'))).toBe(true);
  });
});

describe('formatValidationResults', () => {
  it('should format passing validation', () => {
    const result = {
      valid: true,
      errors: [],
      warnings: [],
      info: []
    };
    const formatted = formatValidationResults(result);
    expect(formatted).toContain('✅ Validation passed');
  });

  it('should format errors, warnings, and info', () => {
    const result = {
      valid: false,
      errors: [{ level: 'error' as const, field: 'name', message: 'Name required' }],
      warnings: [{ level: 'warning' as const, field: 'credit', message: 'Invalid format' }],
      info: [{ level: 'info' as const, field: 'colors', message: 'Check WCAG' }]
    };
    const formatted = formatValidationResults(result);
    expect(formatted).toContain('❌ Validation failed');
    expect(formatted).toContain('Errors:');
    expect(formatted).toContain('Warnings:');
    expect(formatted).toContain('Info:');
  });
});
