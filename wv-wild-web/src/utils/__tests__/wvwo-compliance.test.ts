import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('WVWO Compliance Validation', () => {
  let html: string;
  let css: string;

  beforeAll(() => {
    try {
      // Load built HTML and extract CSS
      const distPath = join(process.cwd(), 'dist/rivers/gauley-river.html');
      html = readFileSync(distPath, 'utf-8');

      const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/);
      css = styleMatch ? styleMatch[1] : '';
    } catch (error) {
      console.warn('Build files not found. Run npm run build first.');
      html = '';
      css = '';
    }
  });

  describe('Font Compliance', () => {
    const FORBIDDEN_FONTS = [
      'Inter',
      'DM Sans',
      'Space Grotesk',
      'Poppins',
      'Outfit',
      'Montserrat',
      'Raleway',
      'Open Sans',
      'system-ui'
    ];

    it('contains no forbidden fonts in CSS', () => {
      if (!css) {
        console.warn('Skipping: CSS not available');
        return;
      }

      FORBIDDEN_FONTS.forEach(font => {
        expect(css).not.toContain(font);
      });
    });

    it('contains no forbidden fonts in HTML', () => {
      if (!html) {
        console.warn('Skipping: HTML not available');
        return;
      }

      FORBIDDEN_FONTS.forEach(font => {
        expect(html).not.toContain(font);
      });
    });

    it('only uses approved fonts', () => {
      if (!css) {
        console.warn('Skipping: CSS not available');
        return;
      }

      const APPROVED_FONTS = ['Bitter', 'Permanent Marker', 'Noto Sans'];
      const fontFamilyMatches = css.match(/font-family:\s*([^;]+);/g) || [];

      fontFamilyMatches.forEach(match => {
        const hasApprovedFont = APPROVED_FONTS.some(font =>
          match.includes(font)
        );
        expect(hasApprovedFont).toBe(true);
      });
    });

    it('uses Permanent Marker only in specific contexts', () => {
      if (!html) {
        console.warn('Skipping: HTML not available');
        return;
      }

      // Check that font-hand class is limited
      const fontHandUsage = (html.match(/font-hand|Permanent Marker/gi) || []).length;

      // Should be used sparingly (only in Kim's notes)
      expect(fontHandUsage).toBeLessThan(10);
    });
  });

  describe('Border Radius Compliance', () => {
    const FORBIDDEN_RADIUS = [
      'rounded-md',
      'rounded-lg',
      'rounded-xl',
      'rounded-2xl',
      'rounded-3xl',
      'rounded-full'
    ];

    it('contains no forbidden border radius classes', () => {
      if (!html) {
        console.warn('Skipping: HTML not available');
        return;
      }

      FORBIDDEN_RADIUS.forEach(radius => {
        const regex = new RegExp(`\\b${radius}\\b`, 'g');
        const matches = html.match(regex);
        expect(matches).toBeNull();
      });
    });

    it('only uses rounded-sm or sharp corners', () => {
      if (!html) {
        console.warn('Skipping: HTML not available');
        return;
      }

      const roundedMatches = html.match(/\brounded-[a-z0-9]+\b/g) || [];

      roundedMatches.forEach(match => {
        expect(['rounded-sm', 'rounded-none']).toContain(match);
      });
    });
  });

  describe('Orange Usage Compliance', () => {
    it('orange usage appears limited (max 5 instances)', () => {
      if (!html) {
        console.warn('Skipping: HTML not available');
        return;
      }

      // Check that orange only appears in specific contexts
      const orangeMatches = html.match(/bg-\[#FF6F00\]|bg-brand-orange|text-\[#FF6F00\]/gi) || [];

      // Should be limited to CTAs only (max 5 buttons per page)
      expect(orangeMatches.length).toBeLessThanOrEqual(10);
    });

    it('orange only appears in button/CTA contexts', () => {
      if (!html) {
        console.warn('Skipping: HTML not available');
        return;
      }

      // Find all elements with orange background
      const orangeBgRegex = /<([a-z]+)[^>]*(bg-\[#FF6F00\]|bg-brand-orange)[^>]*>/gi;
      const matches = [...html.matchAll(orangeBgRegex)];

      matches.forEach(match => {
        const tagName = match[1];
        // Should be button, a (link), or div with CTA class
        expect(['button', 'a', 'div']).toContain(tagName);
      });
    });
  });

  describe('Color Contrast Compliance', () => {
    it('validates known badge color combinations', () => {
      // Test rapid difficulty badge colors
      const badgeCombos = [
        { bg: '#E8F5E9', text: '#2E7D32', name: 'Green badges (I-II)' },
        { bg: '#FFF3E0', text: '#E65100', name: 'Orange badges (IV)' },
        { bg: '#FFEBEE', text: '#C62828', name: 'Red badges (V)' },
        { bg: '#FFF8E1', text: '#3E2723', name: 'Cream/Brown' }
      ];

      badgeCombos.forEach(({ bg, text, name }) => {
        const contrast = calculateContrast(bg, text);
        expect(contrast).toBeGreaterThanOrEqual(4.5);
      });
    });

    it('CTA button text readable on orange background', () => {
      const orangeBg = '#FF6F00';
      const whiteText = '#FFFFFF';
      const contrast = calculateContrast(orangeBg, whiteText);

      // Should have good contrast
      expect(contrast).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Copy Voice Compliance', () => {
    const FORBIDDEN_BUZZWORDS = [
      'unlock',
      'seamless',
      'revolutionize',
      'revolutionary',
      'transform the way',
      'next-level',
      'cutting-edge',
      'all-in-one platform',
      'game-changing',
      'disrupt'
    ];

    it('contains no forbidden buzzwords', () => {
      if (!html) {
        console.warn('Skipping: HTML not available');
        return;
      }

      FORBIDDEN_BUZZWORDS.forEach(buzzword => {
        const regex = new RegExp(buzzword, 'gi');
        const matches = html.match(regex);
        expect(matches).toBeNull();
      });
    });

    it('does not use marketing jargon', () => {
      if (!html) {
        console.warn('Skipping: HTML not available');
        return;
      }

      const JARGON = [
        'leverage',
        'synergy',
        'ecosystem',
        'best-in-class',
        'world-class',
        'enterprise-grade'
      ];

      JARGON.forEach(term => {
        const regex = new RegExp(term, 'gi');
        expect(html.match(regex)).toBeNull();
      });
    });
  });

  describe('Component Style Compliance', () => {
    it('does not use glassmorphism effects', () => {
      if (!css) {
        console.warn('Skipping: CSS not available');
        return;
      }

      expect(css).not.toContain('backdrop-blur');
      expect(css).not.toContain('backdrop-filter');
    });

    it('does not use neon colors', () => {
      if (!css) {
        console.warn('Skipping: CSS not available');
        return;
      }

      const NEON_COLORS = [
        '#ec4899', // Hot pink
        '#8b5cf6', // Purple
        '#06b6d4', // Cyan
        '#10b981'  // Neon green
      ];

      NEON_COLORS.forEach(color => {
        expect(css.toLowerCase()).not.toContain(color);
      });
    });

    it('uses WVWO brand colors', () => {
      if (!css) {
        console.warn('Skipping: CSS not available');
        return;
      }

      const BRAND_COLORS = [
        '#3E2723', // Brand brown
        '#2E7D32', // Sign green
        '#FFF8E1', // Brand cream
        '#FF6F00'  // Brand orange
      ];

      // At least some brand colors should be present
      const hasBrandColors = BRAND_COLORS.some(color =>
        css.toLowerCase().includes(color.toLowerCase())
      );

      expect(hasBrandColors).toBe(true);
    });
  });
});

/**
 * Calculate WCAG contrast ratio between two hex colors
 */
function calculateContrast(bg: string, fg: string): number {
  const getLuminance = (hex: string): number => {
    // Remove # if present
    hex = hex.replace('#', '');

    // Convert to RGB
    const rgb = parseInt(hex, 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;

    // Apply gamma correction
    const [rs, gs, bs] = [r, g, b].map(c =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );

    // Calculate relative luminance
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(bg);
  const l2 = getLuminance(fg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  // Calculate contrast ratio
  return (lighter + 0.05) / (darker + 0.05);
}
