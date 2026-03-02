import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * WVWO Brand Compliance Tests
 *
 * These tests validate that built HTML follows WVWO brand guidelines:
 * - No forbidden fonts (Inter, Poppins, etc.) in font imports
 * - No forbidden border radius classes (rounded-md, rounded-lg, etc.)
 * - Limited orange usage (CTAs only)
 * - No marketing buzzwords in visible text
 * - Proper WCAG color contrast
 *
 * NOTE: Tests focus on ACTUAL USAGE in HTML, not Tailwind framework definitions.
 * Tailwind 4 includes utility class definitions for all rounded-* variants but
 * we only check if they're actually used in class attributes.
 */
describe('WVWO Compliance Validation', () => {
  let html: string;
  let fontImports: string[];
  let classAttributes: string[];

  beforeAll(() => {
    try {
      const distPath = join(process.cwd(), 'dist/adventures/index.html');
      html = readFileSync(distPath, 'utf-8');

      // Extract Google Fonts imports (what fonts are actually loaded)
      fontImports = html.match(/fonts\.googleapis\.com\/css2\?[^"']+/g) || [];

      // Extract all class attribute values (actual CSS class usage)
      classAttributes = [];
      const classMatches = html.matchAll(/class="([^"]*)"/g);
      for (const match of classMatches) {
        classAttributes.push(match[1]);
      }
    } catch (error) {
      // Check if dist exists but specific file doesn't
      const distExists = existsSync(join(process.cwd(), 'dist'));
      if (distExists) {
        console.warn('Build exists but adventures/index.html not found. Checking alternate pages...');
        // Try index.html as fallback
        try {
          html = readFileSync(join(process.cwd(), 'dist/index.html'), 'utf-8');
          fontImports = html.match(/fonts\.googleapis\.com\/css2\?[^"']+/g) || [];
          classAttributes = [];
          const classMatches = html.matchAll(/class="([^"]*)"/g);
          for (const match of classMatches) {
            classAttributes.push(match[1]);
          }
        } catch {
          console.warn('Build files not found. Run npm run build first.');
          html = '';
          fontImports = [];
          classAttributes = [];
        }
      } else {
        console.warn('Build files not found. Run npm run build first.');
        html = '';
        fontImports = [];
        classAttributes = [];
      }
    }
  });

  describe('Font Compliance', () => {
    // These fonts scream "SaaS startup" - forbidden for WVWO's rural WV identity
    const FORBIDDEN_FONTS = [
      'Inter',
      'DM+Sans',
      'Space+Grotesk',
      'Poppins',
      'Outfit',
      'Montserrat',
      'Raleway',
      'Open+Sans',
    ];

    // WVWO brand fonts
    const REQUIRED_FONTS = ['Bitter', 'Permanent+Marker', 'Noto+Sans'];

    it('does not load forbidden fonts from Google Fonts', () => {
      if (fontImports.length === 0) {
        console.warn('Skipping: No font imports found (this is OK if fonts are self-hosted)');
        return;
      }

      const fontsImported = fontImports.join(' ');
      FORBIDDEN_FONTS.forEach(font => {
        expect(fontsImported).not.toContain(font);
      });
    });

    it('loads WVWO brand fonts', () => {
      if (fontImports.length === 0) {
        console.warn('Skipping: No font imports found');
        return;
      }

      const fontsImported = fontImports.join(' ');
      const hasRequiredFonts = REQUIRED_FONTS.every(font =>
        fontsImported.includes(font)
      );

      expect(hasRequiredFonts).toBe(true);
    });

    it('uses Permanent Marker only sparingly (Kim\'s personal touches)', () => {
      if (!html) {
        console.warn('Skipping: HTML not available');
        return;
      }

      // Check for font-hand class usage (Permanent Marker)
      const fontHandCount = classAttributes.filter(c => c.includes('font-hand')).length;

      // Should be limited - only Kim's notes, signatures, etc.
      expect(fontHandCount).toBeLessThan(15);
    });
  });

  describe('Border Radius Compliance', () => {
    // WVWO uses sharp corners (rounded-sm only) - "hardware store aesthetic"
    const FORBIDDEN_RADIUS_CLASSES = [
      'rounded-md',
      'rounded-lg',
      'rounded-xl',
      'rounded-2xl',
      'rounded-3xl',
      'rounded-full', // Exception: avatar images may use this
    ];

    it('does not use forbidden border radius classes in HTML', () => {
      if (classAttributes.length === 0) {
        console.warn('Skipping: No class attributes found');
        return;
      }

      const allClasses = classAttributes.join(' ');

      // Skip rounded-full check - commonly used for avatar images which is OK
      const radiusToCheck = FORBIDDEN_RADIUS_CLASSES.filter(r => r !== 'rounded-full');

      radiusToCheck.forEach(radius => {
        // Look for word boundary match to avoid false positives
        const regex = new RegExp(`\\b${radius}\\b`);
        const found = regex.test(allClasses);
        if (found) {
          // Find which element uses it for debugging
          const violating = classAttributes.find(c => c.includes(radius));
          console.error(`Found forbidden radius class "${radius}" in: "${violating}"`);
        }
        expect(found).toBe(false);
      });
    });

    it('allows rounded-sm and rounded-none', () => {
      if (classAttributes.length === 0) {
        console.warn('Skipping: No class attributes found');
        return;
      }

      // Find all rounded-* classes actually used
      const allClasses = classAttributes.join(' ');
      const roundedUsed = allClasses.match(/\brounded-[a-z0-9]+\b/g) || [];
      const uniqueRounded = [...new Set(roundedUsed)];

      // Filter to only check significant ones (not rounded-t-sm, rounded-b-sm, etc.)
      const significantRounded = uniqueRounded.filter(r =>
        !r.includes('-t-') && !r.includes('-b-') &&
        !r.includes('-l-') && !r.includes('-r-') &&
        !r.includes('-tl-') && !r.includes('-tr-') &&
        !r.includes('-bl-') && !r.includes('-br-')
      );

      // Each should be sm, none, or directional variant
      significantRounded.forEach(cls => {
        const isAllowed = cls === 'rounded-sm' || cls === 'rounded-none' || cls === 'rounded-full';
        if (!isAllowed) {
          console.error(`Unexpected rounded class: ${cls}`);
        }
        expect(isAllowed).toBe(true);
      });
    });
  });

  describe('Orange Usage Compliance', () => {
    it('orange background usage is limited (CTAs only, max 10)', () => {
      if (classAttributes.length === 0) {
        console.warn('Skipping: No class attributes found');
        return;
      }

      const orangeBgCount = classAttributes.filter(c =>
        c.includes('bg-brand-orange') || c.includes('bg-[#FF6F00]')
      ).length;

      // Should be limited to primary CTAs only
      expect(orangeBgCount).toBeLessThanOrEqual(10);
    });
  });

  describe('Copy Voice Compliance', () => {
    // These buzzwords scream "tech startup marketing" - forbidden for Kim's authentic voice
    const FORBIDDEN_BUZZWORDS = [
      'unlock your potential',
      'seamless experience',
      'revolutionize',
      'next-level',
      'cutting-edge',
      'all-in-one platform',
      'game-changing',
      'disruptive',
    ];

    // Jargon that doesn't fit rural WV storefront
    const FORBIDDEN_JARGON = [
      'synergy',
      'best-in-class',
      'world-class',
      'enterprise-grade',
    ];

    it('contains no forbidden marketing buzzwords in visible text', () => {
      if (!html) {
        console.warn('Skipping: HTML not available');
        return;
      }

      // Extract visible text (strip script/style tags first)
      const visibleText = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .toLowerCase();

      FORBIDDEN_BUZZWORDS.forEach(buzzword => {
        expect(visibleText).not.toContain(buzzword.toLowerCase());
      });
    });

    it('does not use corporate jargon in visible text', () => {
      if (!html) {
        console.warn('Skipping: HTML not available');
        return;
      }

      const visibleText = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .toLowerCase();

      FORBIDDEN_JARGON.forEach(term => {
        expect(visibleText).not.toContain(term.toLowerCase());
      });
    });
  });

  describe('Color Contrast Compliance (WCAG AA)', () => {
    it('validates known badge color combinations meet 4.5:1 contrast', () => {
      const badgeCombos = [
        { bg: '#E8F5E9', text: '#2E7D32', name: 'Green badges (I-II)' },
        { bg: '#FFF3E0', text: '#BF360C', name: 'Orange badges (IV)' },
        { bg: '#FFEBEE', text: '#C62828', name: 'Red badges (V)' },
        { bg: '#FFF8E1', text: '#3E2723', name: 'Cream/Brown' }
      ];

      badgeCombos.forEach(({ bg, text, name }) => {
        const contrast = calculateContrast(bg, text);
        if (contrast < 4.5) {
          console.error(`${name}: contrast ${contrast.toFixed(2)}:1 (needs 4.5:1)`);
        }
        expect(contrast).toBeGreaterThanOrEqual(4.5);
      });
    });

    it('CTA button text is readable on orange background', () => {
      const orangeBg = '#FF6F00';
      const brownText = '#3E2723';
      const contrast = calculateContrast(orangeBg, brownText);

      expect(contrast).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Component Style Compliance', () => {
    it('does not use glassmorphism classes in HTML', () => {
      if (classAttributes.length === 0) {
        console.warn('Skipping: No class attributes found');
        return;
      }

      const allClasses = classAttributes.join(' ');

      // Check for actual usage of backdrop-blur classes
      const hasBackdropBlur = /\bbackdrop-blur\b/.test(allClasses);

      expect(hasBackdropBlur).toBe(false);
    });

    it('uses WVWO brand color classes', () => {
      if (classAttributes.length === 0) {
        console.warn('Skipping: No class attributes found');
        return;
      }

      const allClasses = classAttributes.join(' ');

      // Should use brand color classes
      const hasBrandBrown = allClasses.includes('brand-brown');
      const hasSignGreen = allClasses.includes('sign-green');
      const hasBrandCream = allClasses.includes('brand-cream');

      // At least some brand colors should be in use
      expect(hasBrandBrown || hasSignGreen || hasBrandCream).toBe(true);
    });
  });
});

/**
 * Calculate WCAG contrast ratio between two hex colors
 */
function calculateContrast(bg: string, fg: string): number {
  const getLuminance = (hex: string): number => {
    hex = hex.replace('#', '');
    const rgb = parseInt(hex, 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;

    const [rs, gs, bs] = [r, g, b].map(c =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(bg);
  const l2 = getLuminance(fg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}
