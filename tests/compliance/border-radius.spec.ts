/**
 * WVWO Border Radius Compliance Tests
 * ZERO TOLERANCE for rounded-md/lg/xl - ONLY rounded-sm allowed
 *
 * Enforcement Strategy:
 * 1. Scan DOM for forbidden Tailwind classes
 * 2. Verify computed border-radius values <= 2px (0.125rem)
 * 3. Block PR merge on violations
 */

import { test, expect } from '@playwright/test';

test.describe('WVWO Border Radius Compliance', () => {
  test.beforeEach(async ({ page }) => {
    // Test against WMA template as reference implementation
    await page.goto('/__test-wma-integration');
  });

  test('CRITICAL: Zero forbidden rounded classes in DOM', async ({ page }) => {
    const forbiddenClasses = [
      'rounded-md',
      'rounded-lg',
      'rounded-xl',
      'rounded-2xl',
      'rounded-3xl',
    ];

    for (const forbiddenClass of forbiddenClasses) {
      const violators = await page.locator(`.${forbiddenClass}`).count();

      expect(violators, `
        ❌ WVWO VIOLATION DETECTED
        Found ${violators} elements with .${forbiddenClass}

        ONLY rounded-sm (0.125rem) is allowed for hardware store aesthetic.

        Fix: Replace all instances with "rounded-sm"
      `).toBe(0);
    }
  });

  test('CRITICAL: All cards use rounded-sm or rounded-none ONLY', async ({ page }) => {
    // Get all elements with any rounded class
    const roundedElements = await page.locator('[class*="rounded"]').all();

    for (let i = 0; i < roundedElements.length; i++) {
      const element = roundedElements[i];
      const classList = await element.getAttribute('class') || '';

      // Skip if rounded-sm or rounded-none (both allowed)
      if (classList.includes('rounded-sm') || classList.includes('rounded-none')) {
        continue;
      }

      // Check if any forbidden rounded class
      const hasForbidden = /rounded-(md|lg|xl|2xl|3xl|full)/.test(classList);

      expect(hasForbidden, `
        ❌ WVWO VIOLATION in element ${i}
        Classes: ${classList}

        ONLY "rounded-sm" or "rounded-none" allowed.
      `).toBe(false);
    }
  });

  test('CRITICAL: Computed border-radius values <= 2px (0.125rem)', async ({ page }) => {
    // Sample key component types
    const selectors = [
      'section li', // Feature cards
      '[class*="amenity"]', // Amenity grid items
      'button:not([class*="rounded-none"])', // Buttons
      '.card', // Generic cards
    ];

    for (const selector of selectors) {
      const elements = await page.locator(selector).all();

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        const borderRadius = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return computed.borderRadius;
        });

        // Parse pixel values (e.g., "2px" or "2px 2px 2px 2px")
        const pxValues = borderRadius.match(/(\d+(\.\d+)?)px/g) || [];
        const maxRadius = Math.max(...pxValues.map(v => parseFloat(v)));

        expect(maxRadius, `
          ❌ WVWO VIOLATION: ${selector}[${i}]
          Computed border-radius: ${borderRadius}
          Max value: ${maxRadius}px

          Hardware store aesthetic requires <= 2px (0.125rem).
        `).toBeLessThanOrEqual(2);
      }
    }
  });

  test('CRITICAL: Feature cards have sharp corners', async ({ page }) => {
    // What to Hunt, What to Fish sections
    const featureSections = await page.locator('section:has(h2:text-matches("What to (Hunt|Fish)"))').all();

    for (const section of featureSections) {
      const cards = await section.locator('li').all();

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const borderRadius = await card.evaluate((el) =>
          window.getComputedStyle(el).borderRadius
        );

        const pxValue = parseFloat(borderRadius);

        expect(pxValue, `
          ❌ Feature card ${i} has rounded corners: ${borderRadius}

          Feature cards MUST have sharp corners (rounded-sm or rounded-none).
        `).toBeLessThanOrEqual(2);
      }
    }
  });

  test('CRITICAL: CTA buttons use rounded-sm ONLY', async ({ page }) => {
    const ctaButtons = await page.locator('.adventure-cta a, .adventure-cta button').all();

    for (let i = 0; i < ctaButtons.length; i++) {
      const button = ctaButtons[i];
      const classList = await button.getAttribute('class') || '';

      // Must have rounded-sm, not rounded-md/lg/xl
      expect(classList, `
        ❌ CTA button ${i} missing rounded-sm
        Classes: ${classList}
      `).toContain('rounded-sm');

      expect(classList, `
        ❌ CTA button ${i} has forbidden rounded class
        Classes: ${classList}
      `).not.toMatch(/rounded-(md|lg|xl|2xl|3xl)/);
    }
  });
});

test.describe('WVWO Border Radius - Component-Specific', () => {
  test('AdventureAmenitiesGrid: amenity cards sharp corners', async ({ page }) => {
    await page.goto('/__test-wma-integration');

    const amenityCards = await page.locator('[class*="amenity"] li, section:has-text("Amenities") li').all();

    for (let i = 0; i < amenityCards.length; i++) {
      const card = amenityCards[i];
      const classList = await card.getAttribute('class') || '';

      expect(classList).toContain('rounded-sm');
      expect(classList).not.toMatch(/rounded-(md|lg|xl)/);
    }
  });

  test('AdventureFeatureSection: feature cards border-left only', async ({ page }) => {
    await page.goto('/__test-wma-integration');

    const featureCards = await page.locator('section li[class*="border-l"]').all();

    for (const card of featureCards) {
      const borderRadius = await card.evaluate((el) =>
        window.getComputedStyle(el).borderRadius
      );

      const pxValue = parseFloat(borderRadius);

      expect(pxValue, `Feature cards should have minimal rounding`).toBeLessThanOrEqual(2);
    }
  });
});
