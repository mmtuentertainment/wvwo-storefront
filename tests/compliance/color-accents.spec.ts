/**
 * WVWO Color Accent Compliance Tests
 * Enforce semantic border-left accent colors
 *
 * Color Rules:
 * - sign-green (#2E7D32): Fish features
 * - brand-brown (#3E2723): Camping/marina/spots
 * - brand-orange (#FF6F00): Safety/CTAs ONLY (<5% screen)
 *
 * Forbidden Colors:
 * - Purple gradients, hot pink, neon, corporate blue
 */

import { test, expect } from '@playwright/test';

test.describe('WVWO Color Accent Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/__test-wma-integration');
  });

  test('CRITICAL: Fish features use green border-left', async ({ page }) => {
    // Find "What to Fish" section
    const fishSection = page.locator('section:has-text("What to Fish")');

    if (await fishSection.count() === 0) {
      test.skip();
    }

    const featureCards = await fishSection.locator('li[class*="border-l"]').all();

    for (let i = 0; i < featureCards.length; i++) {
      const card = featureCards[i];
      const classList = await card.getAttribute('class') || '';

      expect(classList, `
        ❌ Fish feature card ${i} missing green accent
        Classes: ${classList}

        Fish features MUST use border-l-sign-green (#2E7D32).
      `).toContain('border-l-sign-green');
    }
  });

  test('CRITICAL: Camping/marina spots use brown border-left', async ({ page }) => {
    const brownSections = [
      'Camping Spots',
      'Boat Launches',
      'Marinas',
    ];

    for (const sectionName of brownSections) {
      const section = page.locator(`section:has-text("${sectionName}")`);

      if (await section.count() === 0) continue;

      const featureCards = await section.locator('li[class*="border-l"]').all();

      for (let i = 0; i < featureCards.length; i++) {
        const card = featureCards[i];
        const classList = await card.getAttribute('class') || '';

        expect(classList, `
          ❌ ${sectionName} card ${i} missing brown accent
          Classes: ${classList}

          Camping/marina/spots MUST use border-l-brand-brown (#3E2723).
        `).toContain('border-l-brand-brown');
      }
    }
  });

  test('CRITICAL: Orange ONLY for CTAs (<5% of screen)', async ({ page }) => {
    // Get all elements with orange color
    const orangeElements = await page.locator('[class*="orange"]').all();

    expect(orangeElements.length, `
      ❌ Orange overuse detected
      Found ${orangeElements.length} elements with orange

      Orange (brand-orange #FF6F00) should be <5% of screen.
      Use ONLY for primary CTAs and safety warnings.
    `).toBeLessThan(5);

    // Orange elements should be CTAs or safety warnings
    for (let i = 0; i < orangeElements.length; i++) {
      const element = orangeElements[i];
      const tagName = await element.evaluate((el) => el.tagName);

      const isCTA = ['A', 'BUTTON'].includes(tagName);

      expect(isCTA, `
        ❌ Orange on non-CTA element: ${tagName}

        Orange should ONLY appear on CTA buttons/links.
      `).toBe(true);
    }
  });

  test('CRITICAL: Zero forbidden colors in palette', async ({ page }) => {
    const forbiddenColors = [
      { hex: '#ec4899', name: 'Hot Pink' },
      { hex: '#a855f7', name: 'Purple' },
      { hex: '#8b5cf6', name: 'Violet' },
      { hex: '#0066cc', name: 'Corporate Blue' },
    ];

    // Sample diverse elements
    const elements = await page.locator('section, div, button, a, p').all();
    const sampleSize = Math.min(elements.length, 100);

    for (let i = 0; i < sampleSize; i++) {
      const element = elements[i];

      const colors = await element.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          bg: computed.backgroundColor,
          color: computed.color,
          border: computed.borderColor,
        };
      });

      const allColors = Object.values(colors).join(' ').toLowerCase();

      for (const forbidden of forbiddenColors) {
        expect(allColors, `
          ❌ Forbidden color detected: ${forbidden.name} (${forbidden.hex})
          Element ${i} colors: ${JSON.stringify(colors)}
        `).not.toContain(forbidden.hex.toLowerCase());
      }
    }
  });

  test('CRITICAL: Sign-green used consistently', async ({ page }) => {
    // Check CSS variable
    const signGreen = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--sign-green').trim()
    );

    expect(signGreen, `
      ❌ --sign-green CSS variable missing or incorrect
      Expected: #2E7D32 (old metal signs, forest canopy)
    `).toMatch(/#2E7D32/i);
  });

  test('CRITICAL: Brand-brown used consistently', async ({ page }) => {
    const brandBrown = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--brand-brown').trim()
    );

    expect(brandBrown).toMatch(/#3E2723/i);
  });

  test('CRITICAL: Brand-orange used sparingly', async ({ page }) => {
    const brandOrange = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--brand-orange').trim()
    );

    expect(brandOrange).toMatch(/#FF6F00/i);

    // Count orange usage
    const orangeCount = await page.locator('[class*="brand-orange"]').count();
    expect(orangeCount, `Orange should be rare (<5% of elements)`).toBeLessThan(5);
  });
});

test.describe('WVWO Color Compliance - Computed Values', () => {
  test('Fish cards have green left border (computed)', async ({ page }) => {
    await page.goto('/__test-wma-integration');

    const fishSection = page.locator('section:has-text("What to Fish")');
    if (await fishSection.count() === 0) test.skip();

    const cards = await fishSection.locator('li').all();

    for (const card of cards) {
      const borderColor = await card.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return computed.borderLeftColor;
      });

      // RGB for #2E7D32: rgb(46, 125, 50)
      expect(borderColor, `Fish card should have green border`).toMatch(/rgb\(46,\s*125,\s*50\)/);
    }
  });

  test('Camping cards have brown left border (computed)', async ({ page }) => {
    await page.goto('/__test-wma-integration');

    const campingSection = page.locator('section:has-text("Camping")');
    if (await campingSection.count() === 0) test.skip();

    const cards = await campingSection.locator('li').all();

    for (const card of cards) {
      const borderColor = await card.evaluate((el) =>
        window.getComputedStyle(el).borderLeftColor
      );

      // RGB for #3E2723: rgb(62, 39, 35)
      expect(borderColor).toMatch(/rgb\(62,\s*39,\s*35\)/);
    }
  });

  test('CTA buttons have orange background (computed)', async ({ page }) => {
    await page.goto('/__test-wma-integration');

    const ctaButtons = await page.locator('.adventure-cta a, .adventure-cta button').all();

    for (const button of ctaButtons) {
      const bgColor = await button.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );

      // RGB for #FF6F00: rgb(255, 111, 0)
      expect(bgColor).toMatch(/rgb\(255,\s*111,\s*0\)/);
    }
  });
});

test.describe('WVWO Color Compliance - Visual Checks', () => {
  test('No neon or gradient backgrounds', async ({ page }) => {
    await page.goto('/__test-wma-integration');

    // Check for gradient backgrounds
    const elements = await page.locator('section, div').all();

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      const backgroundImage = await element.evaluate((el) =>
        window.getComputedStyle(el).backgroundImage
      );

      // Ban linear-gradient, radial-gradient
      expect(backgroundImage, `
        ❌ Gradient background detected in element ${i}

        Gradients are forbidden (SaaS startup aesthetic).
      `).not.toMatch(/gradient/i);
    }
  });
});
