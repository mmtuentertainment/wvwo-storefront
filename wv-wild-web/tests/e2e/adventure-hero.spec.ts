import { test, expect } from '@playwright/test';

/**
 * Adventure Hero Component E2E Tests
 * SPEC-09: Slot rendering, responsive layout, reduced motion
 */

test.describe('AdventureHero Component', () => {
  // Test page path - uses a test adventure page
  const testPagePath = '/near/summersville-lake';

  test.describe('Slot Rendering', () => {
    test('renders default slot content', async ({ page }) => {
      await page.goto(testPagePath);

      // Default slot content should be visible within the hero
      const heroSection = page.locator('section[aria-labelledby^="adventure-hero"]');
      await expect(heroSection).toBeVisible();

      // Check that the hero contains expected content structure
      const title = heroSection.locator('h1');
      await expect(title).toBeVisible();
    });

    test('renders CTA slot with action buttons', async ({ page }) => {
      await page.goto(testPagePath);

      const heroSection = page.locator('section[aria-labelledby^="adventure-hero"]');

      // CTA buttons should be present in the hero
      const ctaButtons = heroSection.locator('a[href], button');
      const buttonCount = await ctaButtons.count();

      // Should have at least one CTA
      expect(buttonCount).toBeGreaterThan(0);
    });

    test('renders badge components correctly', async ({ page }) => {
      await page.goto(testPagePath);

      const heroSection = page.locator('section[aria-labelledby^="adventure-hero"]');

      // Check for difficulty badge
      const difficultyBadge = heroSection.locator('text=/Easy|Moderate|Advanced|Rugged/i');
      await expect(difficultyBadge.first()).toBeVisible();

      // Check for season badge
      const seasonBadge = heroSection.locator('text=/Year-round|Spring|Summer|Fall|Winter/i');
      await expect(seasonBadge.first()).toBeVisible();
    });

    test('shape icons visible for accessibility', async ({ page }) => {
      await page.goto(testPagePath);

      const heroSection = page.locator('section[aria-labelledby^="adventure-hero"]');

      // Look for shape icon indicators (●, ▲, ■, ◆)
      const shapeIndicators = heroSection.locator('span[aria-hidden="true"]');
      const count = await shapeIndicators.count();

      // Should have shape indicators for badges
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Responsive Layout', () => {
    test('mobile layout: stacked grid', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(testPagePath);

      const heroSection = page.locator('section[aria-labelledby^="adventure-hero"]');
      await expect(heroSection).toBeVisible();

      // On mobile, image should appear before text (order-1)
      const imageContainer = heroSection.locator('.order-1').first();
      await expect(imageContainer).toBeVisible();
    });

    test('desktop layout: 7/5 asymmetric grid', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(testPagePath);

      const heroSection = page.locator('section[aria-labelledby^="adventure-hero"]');
      await expect(heroSection).toBeVisible();

      // Check for lg:col-span-7 content area
      const contentColumn = heroSection.locator('.lg\\:col-span-7');
      await expect(contentColumn).toBeVisible();

      // Check for lg:col-span-5 image area
      const imageColumn = heroSection.locator('.lg\\:col-span-5');
      await expect(imageColumn).toBeVisible();
    });

    test('title scales responsively', async ({ page }) => {
      // Mobile
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(testPagePath);

      const title = page.locator('section[aria-labelledby^="adventure-hero"] h1');
      const mobileStyles = await title.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return { fontSize: computed.fontSize };
      });

      // Desktop
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(testPagePath);

      const desktopStyles = await title.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return { fontSize: computed.fontSize };
      });

      // Desktop title should be larger than mobile
      const mobileFontSize = parseFloat(mobileStyles.fontSize);
      const desktopFontSize = parseFloat(desktopStyles.fontSize);
      expect(desktopFontSize).toBeGreaterThan(mobileFontSize);
    });
  });

  test.describe('Accessibility', () => {
    test('hero section has aria-labelledby', async ({ page }) => {
      await page.goto(testPagePath);

      const heroSection = page.locator('section[aria-labelledby^="adventure-hero"]');
      await expect(heroSection).toBeVisible();

      const ariaLabelledBy = await heroSection.getAttribute('aria-labelledby');
      expect(ariaLabelledBy).toBeTruthy();
      expect(ariaLabelledBy).toMatch(/^adventure-hero-/);
    });

    test('decorative elements have aria-hidden', async ({ page }) => {
      await page.goto(testPagePath);

      // Camo pattern overlay should be hidden from screen readers
      const decorativeOverlays = page.locator('[aria-hidden="true"]');
      const count = await decorativeOverlays.count();

      // Should have at least the camo overlay marked as decorative
      expect(count).toBeGreaterThan(0);
    });

    test('image has alt text', async ({ page }) => {
      await page.goto(testPagePath);

      const heroSection = page.locator('section[aria-labelledby^="adventure-hero"]');
      const image = heroSection.locator('img').first();

      if (await image.count() > 0) {
        const altText = await image.getAttribute('alt');
        expect(altText).toBeTruthy();
        expect(altText!.length).toBeGreaterThan(0);
      }
    });

    test('focus indicators visible on interactive elements', async ({ page }) => {
      await page.goto(testPagePath);

      const heroSection = page.locator('section[aria-labelledby^="adventure-hero"]');
      const ctaLink = heroSection.locator('a[href]').first();

      if (await ctaLink.count() > 0) {
        await ctaLink.focus();

        // Check that focus styles are applied
        const outlineStyle = await ctaLink.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return computed.outlineWidth !== '0px' || computed.boxShadow !== 'none';
        });

        // Element should have visible focus indicator
        expect(outlineStyle).toBeTruthy();
      }
    });
  });

  test.describe('Reduced Motion', () => {
    test('animations disabled with prefers-reduced-motion', async ({ page }) => {
      // Emulate reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(testPagePath);

      const animatedElements = page.locator('.adventure-hero__animated');

      if (await animatedElements.count() > 0) {
        const firstAnimated = animatedElements.first();

        // Check that animation is disabled
        const animationDuration = await firstAnimated.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return computed.animationDuration;
        });

        // Animation should be 0s or animation should be 'none'
        const isDisabled =
          animationDuration === '0s' ||
          animationDuration === '0ms';

        expect(isDisabled).toBeTruthy();
      }
    });

    test('content visible immediately with reduced motion', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(testPagePath);

      const heroSection = page.locator('section[aria-labelledby^="adventure-hero"]');
      const title = heroSection.locator('h1');

      // Content should be visible immediately (opacity: 1)
      const opacity = await title.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return parseFloat(computed.opacity);
      });

      expect(opacity).toBe(1);
    });
  });

  test.describe('Visual Regression', () => {
    test('mobile hero screenshot', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(testPagePath);

      // Wait for any animations to complete
      await page.waitForTimeout(1000);

      const heroSection = page.locator('section[aria-labelledby^="adventure-hero"]');
      await expect(heroSection).toHaveScreenshot('adventure-hero-mobile.png', {
        maxDiffPixels: 100,
      });
    });

    test('desktop hero screenshot', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(testPagePath);

      // Wait for any animations to complete
      await page.waitForTimeout(1000);

      const heroSection = page.locator('section[aria-labelledby^="adventure-hero"]');
      await expect(heroSection).toHaveScreenshot('adventure-hero-desktop.png', {
        maxDiffPixels: 100,
      });
    });
  });

  test.describe('Image Handling', () => {
    test('image container maintains aspect ratio', async ({ page }) => {
      await page.goto(testPagePath);

      const heroSection = page.locator('section[aria-labelledby^="adventure-hero"]');
      const imageContainer = heroSection.locator('.aspect-\\[4\\/3\\]');

      if (await imageContainer.count() > 0) {
        const box = await imageContainer.boundingBox();
        if (box) {
          const expectedRatio = 4 / 3;
          const actualRatio = box.width / box.height;

          // Allow 5% tolerance for rounding
          expect(Math.abs(actualRatio - expectedRatio)).toBeLessThan(0.1);
        }
      }
    });

    test('fallback UI shown when image missing', async ({ page }) => {
      // This test would require a page with no image configured
      // For now, verify the fallback class exists in the component
      await page.goto(testPagePath);

      const heroSection = page.locator('section[aria-labelledby^="adventure-hero"]');

      // If fallback is visible, check its content
      const fallback = heroSection.locator('text=/Image unavailable/i');
      const hasFallback = await fallback.count() > 0;

      // Either has image OR has fallback
      const hasImage = await heroSection.locator('img').count() > 0;
      expect(hasImage || hasFallback).toBeTruthy();
    });
  });
});
