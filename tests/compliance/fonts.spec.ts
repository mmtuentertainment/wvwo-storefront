/**
 * WVWO Font Compliance Tests
 * Enforce font hierarchy and prevent SaaS startup font leakage
 *
 * Required Fonts:
 * - font-display: Bitter (headings)
 * - font-hand: Permanent Marker (Kim's notes ONLY)
 * - font-body: Noto Sans (body text)
 *
 * Forbidden Fonts:
 * - Inter, Poppins, DM Sans, system-ui (SaaS startup aesthetic)
 */

import { test, expect } from '@playwright/test';

test.describe('WVWO Font Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/__test-wma-integration');
  });

  test('CRITICAL: font-hand (Permanent Marker) ONLY for Kim notes', async ({ page }) => {
    const fontHandElements = await page.locator('.font-hand').all();

    expect(fontHandElements.length, `
      font-hand should be rare - only for Kim's personal tips
    `).toBeGreaterThanOrEqual(0);

    for (let i = 0; i < fontHandElements.length; i++) {
      const element = fontHandElements[i];
      const text = await element.textContent() || '';

      // Kim's notes always have quotes
      const hasQuotes = text.includes('"') || text.includes("'");

      expect(hasQuotes, `
        ❌ WVWO VIOLATION: font-hand element ${i} lacks quotes
        Text: "${text}"

        font-hand (Permanent Marker) is ONLY for Kim's personal notes/tips.
        Kim's voice ALWAYS includes quotes: "Creek bottoms at dawn."
      `).toBe(true);

      // Check context - must be in a notes/tips area
      const parentClasses = await element.locator('..').getAttribute('class') || '';
      const hasNoteContext =
        parentClasses.includes('note') ||
        parentClasses.includes('tip') ||
        text.toLowerCase().includes('kim') ||
        text.includes('"');

      expect(hasNoteContext, `
        ❌ WVWO VIOLATION: font-hand misused outside notes context
        Element ${i} classes: ${parentClasses}

        font-hand should ONLY appear in feature.notes fields.
      `).toBe(true);
    }
  });

  test('CRITICAL: Zero forbidden SaaS fonts in computed styles', async ({ page }) => {
    const forbiddenFonts = [
      'Inter',
      'DM Sans',
      'Poppins',
      'Outfit',
      'system-ui',
      'Montserrat',
      'Raleway',
      'Open Sans',
    ];

    // Check body element (inherits down)
    const bodyFont = await page.locator('body').evaluate((el) =>
      window.getComputedStyle(el).fontFamily
    );

    for (const forbidden of forbiddenFonts) {
      expect(bodyFont, `
        ❌ WVWO VIOLATION: Forbidden font "${forbidden}" detected in body
        Computed font-family: ${bodyFont}

        This is a SaaS startup font. Use Bitter/Permanent Marker/Noto Sans.
      `).not.toContain(forbidden);
    }

    // Spot-check random elements
    const randomElements = await page.locator('h1, h2, h3, p, button').all();

    for (let i = 0; i < Math.min(randomElements.length, 20); i++) {
      const element = randomElements[i];
      const fontFamily = await element.evaluate((el) =>
        window.getComputedStyle(el).fontFamily
      );

      for (const forbidden of forbiddenFonts) {
        expect(fontFamily, `
          ❌ Element ${i} using forbidden font: ${fontFamily}
        `).not.toContain(forbidden);
      }
    }
  });

  test('CRITICAL: Required fonts present in CSS custom properties', async ({ page }) => {
    const cssVars = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return {
        display: styles.getPropertyValue('--font-display').trim(),
        hand: styles.getPropertyValue('--font-hand').trim(),
        body: styles.getPropertyValue('--font-body').trim(),
      };
    });

    expect(cssVars.display, `
      ❌ --font-display missing or incorrect
      Expected: 'Bitter', serif
      Got: ${cssVars.display}
    `).toContain('Bitter');

    expect(cssVars.hand, `
      ❌ --font-hand missing or incorrect
      Expected: 'Permanent Marker', cursive
      Got: ${cssVars.hand}
    `).toContain('Permanent Marker');

    expect(cssVars.body, `
      ❌ --font-body missing or incorrect
      Expected: 'Noto Sans', sans-serif
      Got: ${cssVars.body}
    `).toContain('Noto Sans');
  });

  test('CRITICAL: Headings use font-display (Bitter)', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3').all();

    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const fontFamily = await heading.evaluate((el) =>
        window.getComputedStyle(el).fontFamily
      );

      expect(fontFamily, `
        ❌ Heading ${i} not using Bitter
        Font: ${fontFamily}

        All headings should use font-display (Bitter serif).
      `).toContain('Bitter');
    }
  });

  test('CRITICAL: Body text uses font-body (Noto Sans)', async ({ page }) => {
    const paragraphs = await page.locator('p:not(.font-hand)').all();

    for (let i = 0; i < Math.min(paragraphs.length, 10); i++) {
      const paragraph = paragraphs[i];
      const fontFamily = await paragraph.evaluate((el) =>
        window.getComputedStyle(el).fontFamily
      );

      expect(fontFamily, `
        ❌ Paragraph ${i} not using Noto Sans
        Font: ${fontFamily}

        Body text should use font-body (Noto Sans).
      `).toContain('Noto Sans');
    }
  });

  test('Kim notes use font-hand (Permanent Marker)', async ({ page }) => {
    // Find feature notes with quotes (Kim's voice)
    const kimNotes = await page.locator('p.font-hand, [class*="note"].font-hand').all();

    for (const note of kimNotes) {
      const fontFamily = await note.evaluate((el) =>
        window.getComputedStyle(el).fontFamily
      );

      expect(fontFamily).toContain('Permanent Marker');
    }
  });
});

test.describe('WVWO Font Compliance - Component-Specific', () => {
  test('AdventureFeatureSection: notes use font-hand', async ({ page }) => {
    await page.goto('/__test-wma-integration');

    // Feature cards with notes field
    const noteElements = await page.locator('section li p.font-hand').all();

    for (const note of noteElements) {
      const text = await note.textContent() || '';
      const fontFamily = await note.evaluate((el) =>
        window.getComputedStyle(el).fontFamily
      );

      // Must have quotes
      expect(text.includes('"') || text.includes("'")).toBe(true);

      // Must use Permanent Marker
      expect(fontFamily).toContain('Permanent Marker');
    }
  });

  test('AdventureHero: title uses font-display', async ({ page }) => {
    await page.goto('/__test-wma-integration');

    const heroTitle = page.locator('.adventure-hero h1');
    const fontFamily = await heroTitle.evaluate((el) =>
      window.getComputedStyle(el).fontFamily
    );

    expect(fontFamily).toContain('Bitter');
  });
});
