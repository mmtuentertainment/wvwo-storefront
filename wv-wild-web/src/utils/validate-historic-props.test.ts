/**
 * Tests for HistoricTemplateProps validation utilities
 */

import { describe, it, expect } from 'vitest';
import { validateHistoricProps, formatValidationResults } from './validate-historic-props';
import type { HistoricTemplateProps } from '../types/templates/historic';

describe('validateHistoricProps', () => {
  // Minimal valid props matching HistoricTemplateProps interface
  const validProps: HistoricTemplateProps = {
    name: 'Carnifex Ferry Battlefield',
    location: 'Summersville, WV',
    era: 'Civil War Era (1861)',
    significance: 'Strategic Civil War site',
    nationalRegister: true,
    quickHighlights: ['First Confederate defeat in WV'],
    heroImage: '/images/carnifex.jpg',
    heroImageAlt: 'Battlefield view',
    heroImageCredit: 'Photo: Library of Congress, LC-DIG-12345',
    historicalContext: {
      events: [{ date: 'Sept 10, 1861', title: 'Battle', description: 'The battle occurred' }],
      significance: 'Important Civil War engagement'
    },
    structures: [],
    tours: [],
    education: {
      programs: []
    },
    visitorInfo: {
      hours: [{ season: 'Summer', hours: '9am-5pm' }],
      fees: [{ type: 'Adults', amount: 'Free' }],
      facilities: [],
      accessibility: [],
      phone: '304-555-1234'
    }
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
    expect(result.errors).toContainEqual({
      level: 'error',
      field: 'location',
      message: 'Location is required'
    });
  });

  it('should error on missing hero image', () => {
    const props = { ...validProps, heroImage: '' };
    const result = validateHistoricProps(props);
    expect(result.valid).toBe(false);
    expect(result.errors).toContainEqual({
      level: 'error',
      field: 'heroImage',
      message: 'Hero image URL is required'
    });
  });

  it('should warn on invalid heroImageCredit format', () => {
    const props = {
      ...validProps,
      heroImageCredit: 'Invalid format'
    };
    const result = validateHistoricProps(props);
    expect(result.warnings).toContainEqual({
      level: 'warning',
      field: 'heroImageCredit',
      message: 'Image credit should follow format: "Photo: [Source], [Catalog Number]"'
    });
  });

  it('should accept valid Library of Congress credit format', () => {
    const props = {
      ...validProps,
      heroImageCredit: 'Photo: Library of Congress, LC-DIG-cwpb-12345'
    };
    const result = validateHistoricProps(props);
    expect(result.warnings.some(w => w.field === 'heroImageCredit')).toBe(false);
  });

  it('should warn on non-HTTPS tour reservation URL', () => {
    const props = {
      ...validProps,
      tours: [{
        name: 'Guided Tour',
        type: 'Ranger-Led',
        description: 'Tour description',
        reservationUrl: 'http://insecure-site.com/book'
      }]
    };
    const result = validateHistoricProps(props);
    expect(result.warnings).toContainEqual({
      level: 'warning',
      field: 'tours[0].reservationUrl',
      message: 'Tour "Guided Tour" reservation URL should use HTTPS protocol'
    });
  });

  it('should warn if ranger-led tour missing reservation URL', () => {
    const props = {
      ...validProps,
      tours: [{
        name: 'Guided Tour',
        type: 'ranger-led',
        description: 'Tour description'
      }]
    };
    const result = validateHistoricProps(props);
    expect(result.warnings).toContainEqual({
      level: 'warning',
      field: 'tours[0].reservationUrl',
      message: 'Ranger-led tour "Guided Tour" should include reservationUrl for booking'
    });
  });

  it('should provide info warning about heritage-gold WCAG compliance', () => {
    const props = {
      ...validProps,
      significance: 'Site features gold-trimmed artifacts'
    };
    const result = validateHistoricProps(props);
    expect(result.info).toContainEqual({
      level: 'info',
      field: 'significance',
      message: 'If using heritage-gold color, ensure text is ≥18px for WCAG compliance'
    });
  });

  it('should warn against heritage-gold backgrounds', () => {
    const props = {
      ...validProps,
      historicalContext: {
        significance: 'Use bg-heritage-gold for section background',
        events: []
      }
    };
    const result = validateHistoricProps(props);
    expect(result.warnings).toContainEqual({
      level: 'warning',
      field: 'content-section-1',
      message: 'Avoid heritage-gold backgrounds - insufficient contrast for body text'
    });
  });

  it('should warn on invalid structure image credit format', () => {
    const props = {
      ...validProps,
      structures: [{
        name: 'Patterson House',
        type: 'Original',
        description: 'Historic house',
        condition: 'Restored' as const,
        accessible: true,
        imageCredit: 'Bad format'
      }]
    };
    const result = validateHistoricProps(props);
    expect(result.warnings).toContainEqual({
      level: 'warning',
      field: 'structures[0].imageCredit',
      message: 'Structure "Patterson House" image credit should follow format: "Photo: [Source], [Catalog Number]"'
    });
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
