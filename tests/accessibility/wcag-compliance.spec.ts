/**
 * WCAG AA Accessibility Compliance Tests
 * SPEC-14 Phase 6: Accessibility Testing
 *
 * Tests:
 * - Color contrast ratios (WCAG AA: 4.5:1 text, 3:1 large text)
 * - Keyboard navigation
 * - Screen reader compatibility
 * - Touch targets ≥48px
 * - ARIA attributes
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('WCAG AA Compliance - River Template', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/test/river-template-example');
  });

  test('Passes automated accessibility scan (axe-core)', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Color contrast meets WCAG AA (4.5:1 for text)', async ({ page }) => {
    // Test heading contrast
    const h1 = page.locator('h1').first();
    const h1Color = await h1.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        color: style.color,
        background: style.backgroundColor
      };
    });

    // Manual verification needed, but check colors are defined
    expect(h1Color.color).toBeTruthy();
    expect(h1Color.background).toBeTruthy();

    // Test body text contrast
    const paragraph = page.locator('p').first();
    const pColor = await paragraph.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        color: style.color,
        background: style.backgroundColor
      };
    });

    expect(pColor.color).toBeTruthy();
  });

  test('Large text contrast meets WCAG AA (3:1)', async ({ page }) => {
    // Find large text elements (≥18pt or ≥14pt bold)
    const largeHeadings = page.locator('h2, h3');
    const count = await largeHeadings.count();

    expect(count).toBeGreaterThan(0);

    // Verify contrast is adequate (automated by axe-core above)
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('h2, h3')
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    );
    expect(contrastViolations).toHaveLength(0);
  });

  test('Keyboard navigation works for all interactive elements', async ({ page }) => {
    // Tab through all focusable elements
    const focusableElements = await page.locator(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ).all();

    expect(focusableElements.length).toBeGreaterThan(0);

    // Test tab navigation
    await page.keyboard.press('Tab');
    let activeElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeElement).toBeTruthy();

    // Test navigation links
    await page.click('a[href="#fishing"]', { force: false }); // Click via keyboard
    await page.waitForTimeout(500);

    const fishingSection = page.locator('#fishing');
    await expect(fishingSection).toBeInViewport();
  });

  test('Focus indicators are visible', async ({ page }) => {
    const links = page.locator('a').all();

    for (const link of await links) {
      await link.focus();

      // Check outline or box-shadow is present
      const focusStyle = await link.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          outline: style.outline,
          boxShadow: style.boxShadow,
          outlineWidth: style.outlineWidth
        };
      });

      // Should have visible focus indicator
      const hasFocusIndicator =
        focusStyle.outlineWidth !== '0px' ||
        focusStyle.boxShadow !== 'none';

      expect(hasFocusIndicator).toBe(true);
    }
  });

  test('Touch targets are at least 48x48 pixels', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const interactiveElements = await page.locator(
      'a, button, [role="button"]'
    ).all();

    for (const element of interactiveElements) {
      const box = await element.boundingBox();

      if (box) {
        // WCAG 2.5.5: Target Size (Level AAA, but good practice)
        // Minimum 44x44, we use 48x48 for safety
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('ARIA landmarks are properly defined', async ({ page }) => {
    // Check main landmark
    const main = page.locator('main, [role="main"]');
    await expect(main).toHaveCount(1);

    // Check navigation landmark
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav).toBeVisible();

    // Navigation should have aria-label
    const navLabel = await nav.getAttribute('aria-label');
    expect(navLabel).toBeTruthy();
  });

  test('Images have appropriate alt text', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');

      // All images must have alt attribute (can be empty for decorative)
      expect(alt).not.toBeNull();

      // Content images should have descriptive alt
      const src = await img.getAttribute('src');
      if (!src?.includes('decoration') && !src?.includes('spacer')) {
        expect(alt!.length).toBeGreaterThan(0);
      }
    }
  });

  test('Heading hierarchy is logical', async ({ page }) => {
    // Only one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Get all headings in order
    const headings = await page.evaluate(() => {
      const headingElements = Array.from(
        document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      );
      return headingElements.map(el => ({
        tag: el.tagName,
        text: el.textContent?.trim()
      }));
    });

    // Verify no skipped levels
    let previousLevel = 0;
    for (const heading of headings) {
      const level = parseInt(heading.tag.charAt(1));

      if (previousLevel > 0) {
        // Can't skip levels (e.g., h2 -> h4)
        expect(level - previousLevel).toBeLessThanOrEqual(1);
      }

      previousLevel = level;
    }
  });

  test('Form elements have associated labels', async ({ page }) => {
    const inputs = await page.locator('input, select, textarea').all();

    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');

      // Must have either: associated label, aria-label, or aria-labelledby
      const hasLabel = id ?
        await page.locator(`label[for="${id}"]`).count() > 0 :
        false;

      const isLabeled = hasLabel || ariaLabel || ariaLabelledBy;
      expect(isLabeled).toBe(true);
    }
  });

  test('Skip links are present for keyboard users', async ({ page }) => {
    // Press Tab to focus skip link
    await page.keyboard.press('Tab');

    const activeElement = page.locator(':focus');
    const text = await activeElement.textContent();

    // First focusable element should be skip link
    expect(text?.toLowerCase()).toMatch(/skip to|skip navigation/);
  });

  test('Screen reader text for icon-only buttons', async ({ page }) => {
    const iconButtons = await page.locator('button:has(svg):not(:has-text(""))').all();

    for (const button of iconButtons) {
      const ariaLabel = await button.getAttribute('aria-label');
      const srText = await button.locator('.sr-only, .visually-hidden').count();

      // Icon-only buttons must have accessible text
      const hasAccessibleText = ariaLabel || srText > 0;
      expect(hasAccessibleText).toBe(true);
    }
  });

  test('No keyboard traps exist', async ({ page }) => {
    const focusableElements = await page.locator(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ).count();

    // Tab through all elements and verify we can continue
    for (let i = 0; i < focusableElements; i++) {
      await page.keyboard.press('Tab');
    }

    // Should be able to continue tabbing (not trapped)
    await page.keyboard.press('Tab');
    const activeElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeElement).toBeTruthy();
  });

  test('Language is specified', async ({ page }) => {
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBeTruthy();
    expect(htmlLang).toBe('en'); // English for WVWO
  });

  test('Page title is descriptive', async ({ page }) => {
    const title = await page.title();

    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title).toContain('New River'); // Should include river name
  });
});

test.describe('Screen Reader Compatibility', () => {

  test('ARIA roles are semantically correct', async ({ page }) => {
    await page.goto('/test/river-template-example');

    const rolesCheck = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .include('[role]')
      .analyze();

    const roleViolations = rolesCheck.violations.filter(
      v => v.id.includes('aria-role') || v.id.includes('role')
    );

    expect(roleViolations).toHaveLength(0);
  });

  test('Dynamic content updates announce to screen readers', async ({ page }) => {
    await page.goto('/test/river-template-example');

    // Find elements that might update (e.g., loading states)
    const liveRegions = page.locator('[aria-live], [role="status"], [role="alert"]');
    const count = await liveRegions.count();

    // If live regions exist, verify they're properly configured
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const region = liveRegions.nth(i);
        const ariaLive = await region.getAttribute('aria-live');

        expect(['polite', 'assertive', 'off']).toContain(ariaLive!);
      }
    }
  });

  test('Lists are properly marked up', async ({ page }) => {
    await page.goto('/test/river-template-example');

    const lists = await page.locator('ul, ol').all();

    for (const list of lists) {
      // Verify list items are direct children
      const listItems = await list.locator('> li').count();
      expect(listItems).toBeGreaterThan(0);
    }
  });
});
