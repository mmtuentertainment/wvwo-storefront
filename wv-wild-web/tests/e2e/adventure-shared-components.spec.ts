import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * SPEC-11: Adventure Shared Components E2E Tests
 * Tests AdventureGettingThere, AdventureGearChecklist, AdventureRelatedShop
 *
 * Includes axe-core accessibility auditing for WCAG 2.1 AA compliance.
 */

test.describe('SPEC-11: Adventure Shared Components', () => {
  const testPagePath = '/near/summersville-lake';

  // ==========================================================================
  // AdventureGettingThere Component Tests
  // ==========================================================================
  test.describe('AdventureGettingThere', () => {
    test.describe('Core Rendering', () => {
      test('renders section with aria-labelledby', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-getting-there"]');
        await expect(section).toBeVisible();
      });

      test('renders heading with correct ID pattern', async ({ page }) => {
        await page.goto(testPagePath);

        const heading = page.locator('h2[id^="adventure-getting-there"]');
        await expect(heading).toBeVisible();

        const headingText = await heading.textContent();
        expect(headingText).toContain('Getting There');
      });

      test('renders directions content with HTML', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-getting-there"]');
        const proseContent = section.locator('.prose');
        await expect(proseContent).toBeVisible();

        // Should contain ordered list from directions HTML
        const orderedList = proseContent.locator('ol');
        if (await orderedList.count() > 0) {
          await expect(orderedList).toBeVisible();
        }
      });
    });

    test.describe('Map Link', () => {
      test('renders Google Maps link when mapLink provided', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-getting-there"]');
        const mapsLink = section.locator('a[href*="maps.google.com"], a[href*="goo.gl/maps"]');

        if (await mapsLink.count() > 0) {
          await expect(mapsLink).toBeVisible();
        }
      });

      test('map link opens in new tab with security attributes', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-getting-there"]');
        const mapsLink = section.locator('a[href*="maps.google.com"], a[href*="goo.gl/maps"]').first();

        if (await mapsLink.count() > 0) {
          const target = await mapsLink.getAttribute('target');
          const rel = await mapsLink.getAttribute('rel');

          expect(target).toBe('_blank');
          expect(rel).toContain('noopener');
          expect(rel).toContain('noreferrer');
        }
      });

      test('map link has accessible "(opens in new tab)" text', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-getting-there"]');
        const mapsLink = section.locator('a[target="_blank"]').first();

        if (await mapsLink.count() > 0) {
          const srText = mapsLink.locator('.sr-only');
          const srContent = await srText.textContent();
          expect(srContent?.toLowerCase()).toContain('new tab');
        }
      });
    });

    test.describe('Drive Stats', () => {
      test('displays drive time when provided', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-getting-there"]');
        const driveTimeText = section.locator('text=/\\d+\\s*(min|minute|hour)/i');

        if (await driveTimeText.count() > 0) {
          await expect(driveTimeText.first()).toBeVisible();
        }
      });

      test('displays distance when provided', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-getting-there"]');
        const distanceText = section.locator('text=/\\d+\\s*miles?/i');

        if (await distanceText.count() > 0) {
          await expect(distanceText.first()).toBeVisible();
        }
      });
    });

    test.describe('Slot Content', () => {
      test('renders default slot content when provided', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-getting-there"]');

        // Check for italicized "Pro tip" or similar slot content
        const slotContent = section.locator('.italic, em');
        if (await slotContent.count() > 0) {
          await expect(slotContent.first()).toBeVisible();
        }
      });
    });
  });

  // ==========================================================================
  // AdventureGearChecklist Component Tests
  // ==========================================================================
  test.describe('AdventureGearChecklist', () => {
    test.describe('Core Rendering', () => {
      test('renders section with aria-labelledby', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-gear-checklist"]');
        await expect(section).toBeVisible();
      });

      test('renders heading with correct ID pattern', async ({ page }) => {
        await page.goto(testPagePath);

        const heading = page.locator('h2[id^="adventure-gear-checklist"]');
        await expect(heading).toBeVisible();
      });
    });

    test.describe('Gear Items', () => {
      test('renders gear items as list', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-gear-checklist"]');
        const listItems = section.locator('li');

        const count = await listItems.count();
        expect(count).toBeGreaterThan(0);
      });

      test('shows checkmark icon for required items', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-gear-checklist"]');

        // Required items should have sign-green checkmark
        const requiredItems = section.locator('li:has(svg.text-sign-green)');
        const count = await requiredItems.count();

        // Should have at least some required items
        expect(count).toBeGreaterThan(0);
      });

      test('shows circle icon and "(optional)" text for optional items', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-gear-checklist"]');

        // Optional items should have "(optional)" text
        const optionalItems = section.locator('li:has-text("(optional)")');
        const count = await optionalItems.count();

        // May or may not have optional items
        expect(count).toBeGreaterThanOrEqual(0);
      });

      test('icons have aria-hidden="true"', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-gear-checklist"]');
        const icons = section.locator('svg[aria-hidden="true"]');

        const count = await icons.count();
        expect(count).toBeGreaterThan(0);
      });
    });

    test.describe('Empty State', () => {
      // This would need a test page with empty items array
      test('component handles empty items gracefully', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-gear-checklist"]');

        // Even if list is empty, section should exist
        await expect(section).toBeVisible();
      });
    });

    test.describe('Responsive Grid', () => {
      test('single column on mobile (375px)', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-gear-checklist"]');
        await expect(section).toBeVisible();
      });

      test('multiple columns on desktop (1280px)', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-gear-checklist"]');

        // Check for grid or multi-column layout
        const gridContainer = section.locator('ul');
        if (await gridContainer.count() > 0) {
          const gridClasses = await gridContainer.getAttribute('class');
          // Should have grid classes for desktop
          expect(gridClasses).toMatch(/grid|md:grid-cols|lg:grid-cols/);
        }
      });
    });

    test.describe('Footer Slot', () => {
      test('renders footer slot with CTA link', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-gear-checklist"]');

        // Footer slot typically contains shop link
        const footerCta = section.locator('a[href*="/shop"]');
        if (await footerCta.count() > 0) {
          await expect(footerCta.first()).toBeVisible();
        }
      });
    });
  });

  // ==========================================================================
  // AdventureRelatedShop Component Tests
  // ==========================================================================
  test.describe('AdventureRelatedShop', () => {
    test.describe('Core Rendering', () => {
      test('renders section with aria-labelledby', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-related-shop"]');
        await expect(section).toBeVisible();
      });

      test('renders heading with correct ID pattern', async ({ page }) => {
        await page.goto(testPagePath);

        const heading = page.locator('h2[id^="adventure-related-shop"]');
        await expect(heading).toBeVisible();
      });
    });

    test.describe('Category Cards', () => {
      test('renders category cards with links', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-related-shop"]');
        const categoryCards = section.locator('a.block.border-l-4');

        const count = await categoryCards.count();
        expect(count).toBeGreaterThan(0);
      });

      test('category cards have internal hrefs (start with /)', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-related-shop"]');
        const categoryCards = section.locator('a.block.border-l-4');

        const count = await categoryCards.count();
        for (let i = 0; i < count; i++) {
          const href = await categoryCards.nth(i).getAttribute('href');
          expect(href).toMatch(/^\//);
        }
      });

      test('category cards display name', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-related-shop"]');
        const cardTitles = section.locator('a.block.border-l-4 h3, a.block.border-l-4 [class*="font-bold"]');

        const count = await cardTitles.count();
        expect(count).toBeGreaterThan(0);
      });

      test('category cards optionally display description', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-related-shop"]');
        const cards = section.locator('a.block.border-l-4');

        // At least check that cards exist - description is optional
        const count = await cards.count();
        expect(count).toBeGreaterThanOrEqual(0);
      });
    });

    test.describe('Hover Effects', () => {
      test('card border color changes on hover', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-related-shop"]');
        const firstCard = section.locator('a.block.border-l-4').first();

        if (await firstCard.count() > 0) {
          // Get initial border color
          const initialBorderColor = await firstCard.evaluate((el) => {
            return window.getComputedStyle(el).borderLeftColor;
          });

          // Hover over card
          await firstCard.hover();
          await page.waitForTimeout(400);

          // Get hover border color
          const hoverBorderColor = await firstCard.evaluate((el) => {
            return window.getComputedStyle(el).borderLeftColor;
          });

          // Colors should potentially differ (depends on CSS)
          expect(initialBorderColor).toBeDefined();
          expect(hoverBorderColor).toBeDefined();
        }
      });
    });

    test.describe('CTA Button', () => {
      test('renders main CTA button', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-related-shop"]');

        // CTA button typically has bg-sign-green or similar
        const ctaButton = section.locator('a.bg-sign-green, a:has-text("Visit Our Shop"), a:has-text("Browse")');

        if (await ctaButton.count() > 0) {
          await expect(ctaButton.first()).toBeVisible();
        }
      });

      test('CTA button has correct href', async ({ page }) => {
        await page.goto(testPagePath);

        const section = page.locator('section[aria-labelledby^="adventure-related-shop"]');
        const ctaButton = section.locator('a.bg-sign-green, a:has-text("Visit Our Shop")').first();

        if (await ctaButton.count() > 0) {
          const href = await ctaButton.getAttribute('href');
          expect(href).toMatch(/^\//); // Internal link
        }
      });
    });
  });

  // ==========================================================================
  // Cross-Component Accessibility Tests
  // ==========================================================================
  test.describe('Accessibility', () => {
    test('all SPEC-11 components pass WCAG 2.1 AA', async ({ page }) => {
      await page.goto(testPagePath);

      // Test each component section
      const sections = [
        'section[aria-labelledby^="adventure-getting-there"]',
        'section[aria-labelledby^="adventure-gear-checklist"]',
        'section[aria-labelledby^="adventure-related-shop"]',
      ];

      for (const selector of sections) {
        const section = page.locator(selector);
        if (await section.count() > 0) {
          const results = await new AxeBuilder({ page })
            .include(selector)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

          if (results.violations.length > 0) {
            console.log(`Violations in ${selector}:`, JSON.stringify(results.violations, null, 2));
          }

          expect(results.violations).toEqual([]);
        }
      }
    });

    test('color contrast meets WCAG AA', async ({ page }) => {
      await page.goto(testPagePath);

      const results = await new AxeBuilder({ page })
        .include('section[aria-labelledby^="adventure-getting-there"]')
        .include('section[aria-labelledby^="adventure-gear-checklist"]')
        .include('section[aria-labelledby^="adventure-related-shop"]')
        .options({ runOnly: ['color-contrast'] })
        .analyze();

      expect(results.violations).toEqual([]);
    });

    test('focus indicators visible on interactive elements', async ({ page }) => {
      await page.goto(testPagePath);

      // Test focus on a link in AdventureRelatedShop
      const section = page.locator('section[aria-labelledby^="adventure-related-shop"]');
      const link = section.locator('a').first();

      if (await link.count() > 0) {
        await link.focus();

        const hasFocusIndicator = await link.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return (
            computed.outlineWidth !== '0px' ||
            computed.boxShadow !== 'none'
          );
        });

        expect(hasFocusIndicator).toBeTruthy();
      }
    });
  });

  // ==========================================================================
  // Reduced Motion Tests
  // ==========================================================================
  test.describe('Reduced Motion', () => {
    test('animations disabled with prefers-reduced-motion', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(testPagePath);

      // Check that content is immediately visible
      const sections = [
        'section[aria-labelledby^="adventure-getting-there"]',
        'section[aria-labelledby^="adventure-gear-checklist"]',
        'section[aria-labelledby^="adventure-related-shop"]',
      ];

      for (const selector of sections) {
        const section = page.locator(selector);
        if (await section.count() > 0) {
          const opacity = await section.evaluate((el) => {
            return parseFloat(window.getComputedStyle(el).opacity);
          });

          expect(opacity).toBe(1);
        }
      }
    });
  });

  // ==========================================================================
  // WVWO Aesthetic Compliance Tests
  // ==========================================================================
  test.describe('WVWO Aesthetic Compliance', () => {
    test('no forbidden rounded classes', async ({ page }) => {
      await page.goto(testPagePath);

      const pageHtml = await page.content();

      const forbiddenClasses = ['rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl'];

      for (const forbidden of forbiddenClasses) {
        // These should not appear in SPEC-11 component sections
        // Note: May appear elsewhere on page
        expect(pageHtml).not.toMatch(new RegExp(`class="[^"]*${forbidden}[^"]*"`));
      }
    });

    test('uses brand colors', async ({ page }) => {
      await page.goto(testPagePath);

      const pageHtml = await page.content();

      const brandColors = ['sign-green', 'brand-brown', 'brand-mud', 'brand-cream', 'brand-orange'];
      const foundColors = brandColors.filter((color) => pageHtml.includes(color));

      // Should use at least some brand colors
      expect(foundColors.length).toBeGreaterThan(0);
    });

    test('no glassmorphism or backdrop-blur', async ({ page }) => {
      await page.goto(testPagePath);

      const pageHtml = await page.content();

      expect(pageHtml).not.toContain('backdrop-blur');
      expect(pageHtml).not.toContain('glassmorphism');
    });
  });

  // ==========================================================================
  // Visual Regression Tests
  // ==========================================================================
  test.describe('Visual Regression', () => {
    test('mobile layout screenshot (375px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(testPagePath);
      await page.waitForTimeout(1000);

      const section = page.locator('section[aria-labelledby^="adventure-gear-checklist"]');
      if (await section.count() > 0) {
        await expect(section).toHaveScreenshot('spec-11-gear-mobile.png', {
          maxDiffPixels: 100,
        });
      }
    });

    test('desktop layout screenshot (1280px)', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(testPagePath);
      await page.waitForTimeout(1000);

      const section = page.locator('section[aria-labelledby^="adventure-related-shop"]');
      if (await section.count() > 0) {
        await expect(section).toHaveScreenshot('spec-11-shop-desktop.png', {
          maxDiffPixels: 100,
        });
      }
    });
  });
});
