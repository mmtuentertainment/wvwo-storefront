/**
 * SPEC-14 Checkpoint 5: RiverTemplate Integration Tests
 * End-to-end tests for RiverTemplate component
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('RiverTemplate Integration Tests', () => {
  let dom: JSDOM;
  let document: Document;

  beforeAll(() => {
    // Load built HTML file (adjust path to your built output)
    const htmlPath = path.join(__dirname, '../../dist/rivers/example-river.html');

    if (!fs.existsSync(htmlPath)) {
      throw new Error(`Built HTML not found at ${htmlPath}. Run 'npm run build' first.`);
    }

    const html = fs.readFileSync(htmlPath, 'utf-8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  describe('Template Rendering', () => {
    it('should render all 8 sections with example data', () => {
      const sections = [
        'hero',
        'overview',
        'rapids',
        'fishing',
        'access',
        'safety',
        'outfitters',
        'gallery'
      ];

      sections.forEach(sectionId => {
        const section = document.querySelector(`[data-section="${sectionId}"]`);
        expect(section).toBeTruthy();
        expect(section?.textContent?.trim().length).toBeGreaterThan(0);
      });
    });

    it('should display river name in hero section', () => {
      const heroTitle = document.querySelector('[data-section="hero"] h1');
      expect(heroTitle).toBeTruthy();
      expect(heroTitle?.textContent?.trim().length).toBeGreaterThan(0);
    });

    it('should render overview statistics', () => {
      const statsContainer = document.querySelector('[data-section="overview"] [data-stats]');
      expect(statsContainer).toBeTruthy();

      const statItems = document.querySelectorAll('[data-section="overview"] [data-stat]');
      expect(statItems.length).toBeGreaterThan(0);
    });
  });

  describe('Conditional Rendering', () => {
    it('should hide sections with empty arrays', () => {
      // This test assumes you have a version with empty data
      // If rapids array is empty, rapids section should not render
      const rapidsSection = document.querySelector('[data-section="rapids"]');
      const rapidsItems = rapidsSection?.querySelectorAll('[data-rapids-item]');

      if (rapidsItems && rapidsItems.length === 0) {
        expect(rapidsSection).toBeFalsy();
      }
    });

    it('should render fishing section when data present', () => {
      const fishingSection = document.querySelector('[data-section="fishing"]');
      if (fishingSection) {
        const speciesList = fishingSection.querySelector('[data-species-list]');
        expect(speciesList).toBeTruthy();
      }
    });
  });

  describe('Interactive Elements', () => {
    it('should format GPS links correctly', () => {
      const gpsLinks = document.querySelectorAll('a[href^="https://www.google.com/maps"]');

      gpsLinks.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).toMatch(/https:\/\/www\.google\.com\/maps\/\?q=[\d\.\-,]+/);
      });
    });

    it('should format phone links correctly', () => {
      const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

      phoneLinks.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).toMatch(/^tel:\+?1?[\d-]+$/);
      });
    });

    it('should open external links in new tab', () => {
      const externalLinks = document.querySelectorAll('a[href^="http"]');

      externalLinks.forEach(link => {
        // Exclude internal links (like GPS)
        const href = link.getAttribute('href');
        if (!href?.includes('google.com/maps')) {
          expect(link.getAttribute('target')).toBe('_blank');
          expect(link.getAttribute('rel')).toContain('noopener');
        }
      });
    });

    it('should have accessible button elements', () => {
      const buttons = document.querySelectorAll('button, [role="button"]');

      buttons.forEach(button => {
        // Must have text content or aria-label
        const hasText = button.textContent?.trim().length > 0;
        const hasAriaLabel = button.getAttribute('aria-label');
        expect(hasText || hasAriaLabel).toBeTruthy();
      });
    });
  });

  describe('Responsive Grids', () => {
    it('should use responsive grid classes', () => {
      const grids = document.querySelectorAll('[class*="grid"]');
      expect(grids.length).toBeGreaterThan(0);

      // Check for responsive breakpoints (sm:, md:, lg:)
      const hasResponsiveClasses = Array.from(grids).some(grid => {
        const classes = grid.className;
        return classes.includes('sm:') || classes.includes('md:') || classes.includes('lg:');
      });
      expect(hasResponsiveClasses).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have ARIA labels on sections', () => {
      const sections = document.querySelectorAll('section');

      sections.forEach(section => {
        const hasAriaLabel = section.getAttribute('aria-labelledby') || section.getAttribute('aria-label');
        expect(hasAriaLabel).toBeTruthy();
      });
    });

    it('should have alt text on all images', () => {
      const images = document.querySelectorAll('img');

      images.forEach(img => {
        const alt = img.getAttribute('alt');
        expect(alt).toBeDefined();
        expect(alt?.length).toBeGreaterThan(0);
      });
    });

    it('should use semantic HTML', () => {
      expect(document.querySelector('main')).toBeTruthy();
      expect(document.querySelectorAll('section').length).toBeGreaterThan(0);
      expect(document.querySelectorAll('article').length).toBeGreaterThan(0);
    });

    it('should have touch-friendly button sizes', () => {
      const buttons = document.querySelectorAll('button, [role="button"]');

      buttons.forEach(button => {
        const classes = button.className;
        // Check for min-height/padding classes (h-12 = 48px, h-16 = 64px, etc.)
        const hasTouchSize = classes.includes('h-12') ||
                           classes.includes('h-16') ||
                           classes.includes('min-h-[48px]') ||
                           classes.includes('py-3') ||
                           classes.includes('py-4');
        expect(hasTouchSize).toBeTruthy();
      });
    });
  });

  describe('SEO Schema', () => {
    it('should include JSON-LD schema', () => {
      const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
      expect(jsonLdScripts.length).toBeGreaterThan(0);
    });

    it('should have valid TouristAttraction schema', () => {
      const jsonLdScript = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
        .find(script => script.textContent?.includes('TouristAttraction'));

      expect(jsonLdScript).toBeTruthy();

      const schema = JSON.parse(jsonLdScript?.textContent || '{}');
      expect(schema['@type']).toBe('TouristAttraction');
      expect(schema.name).toBeTruthy();
      expect(schema.description).toBeTruthy();
      expect(schema.address).toBeTruthy();
      expect(schema.geo).toBeTruthy();
    });

    it('should have BreadcrumbList schema', () => {
      const jsonLdScript = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
        .find(script => script.textContent?.includes('BreadcrumbList'));

      expect(jsonLdScript).toBeTruthy();

      const schema = JSON.parse(jsonLdScript?.textContent || '{}');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toBeTruthy();
      expect(Array.isArray(schema.itemListElement)).toBeTruthy();
    });

    it('should have required meta tags', () => {
      expect(document.querySelector('meta[property="og:title"]')).toBeTruthy();
      expect(document.querySelector('meta[property="og:description"]')).toBeTruthy();
      expect(document.querySelector('meta[property="og:image"]')).toBeTruthy();
      expect(document.querySelector('meta[name="twitter:card"]')).toBeTruthy();
    });
  });

  describe('WVWO Compliance', () => {
    it('should use ONLY rounded-sm for border radius', () => {
      const html = fs.readFileSync(
        path.join(__dirname, '../../dist/rivers/example-river.html'),
        'utf-8'
      );

      const forbiddenClasses = ['rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl'];
      forbiddenClasses.forEach(className => {
        expect(html.includes(className)).toBeFalsy();
      });
    });

    it('should use WVWO font families', () => {
      const html = fs.readFileSync(
        path.join(__dirname, '../../dist/rivers/example-river.html'),
        'utf-8'
      );

      expect(html.includes('Bitter') || html.includes('font-display')).toBeTruthy();
      expect(html.includes('Permanent Marker') || html.includes('font-hand')).toBeTruthy();
      expect(html.includes('Noto Sans') || html.includes('font-body')).toBeTruthy();
    });

    it('should NOT use forbidden fonts', () => {
      const html = fs.readFileSync(
        path.join(__dirname, '../../dist/rivers/example-river.html'),
        'utf-8'
      );

      const forbiddenFonts = ['Inter', 'Poppins', 'DM Sans', 'Space Grotesk', 'Montserrat'];
      forbiddenFonts.forEach(font => {
        expect(html.includes(font)).toBeFalsy();
      });
    });
  });

  describe('Performance', () => {
    it('should have reasonable HTML file size', () => {
      const htmlPath = path.join(__dirname, '../../dist/rivers/example-river.html');
      const stats = fs.statSync(htmlPath);
      const sizeKB = stats.size / 1024;

      // HTML should be under 100KB (excluding images)
      expect(sizeKB).toBeLessThan(100);
    });

    it('should lazy load images', () => {
      const images = document.querySelectorAll('img');
      const lazyImages = Array.from(images).filter(img => img.getAttribute('loading') === 'lazy');

      // At least some images should be lazy loaded
      expect(lazyImages.length).toBeGreaterThan(0);
    });
  });
});
