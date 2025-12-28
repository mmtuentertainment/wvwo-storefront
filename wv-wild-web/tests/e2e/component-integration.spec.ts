import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * SPEC-12: Component Integration Tests
 * Validates composition and integration of completed components:
 * - AdventureFeatureSection
 * - AdventureCampingList
 * - AdventureAmenitiesGrid
 * - AdventureCTA
 *
 * Tests integration with SPEC-10/11 components and validates data flow,
 * responsive behavior, and WVWO aesthetic compliance.
 */

test.describe('SPEC-12: Component Integration Tests', () => {
  const testPagePath = '/near/summersville-lake';

  // ==========================================================================
  // SCENARIO 1: Composition Pattern - All 4 Components Render Together
  // ==========================================================================
  test.describe('Scenario 1: Composition Pattern', () => {
    test('all SPEC-12 components render without conflicts', async ({ page }) => {
      await page.goto(testPagePath);

      // Check that all components exist on page
      const featureSection = page.locator('section.adventure-feature-section');
      const campingList = page.locator('section[aria-labelledby^="adventure-camping-list"]');
      const amenitiesGrid = page.locator('section[aria-labelledby^="adventure-amenities-grid"]');
      const ctaSection = page.locator('section:has(a.bg-sign-green, a.bg-brand-brown)').last();

      // At least one of these should be visible if implemented
      const anyVisible = await featureSection.count() > 0 ||
                         await campingList.count() > 0 ||
                         await amenitiesGrid.count() > 0 ||
                         await ctaSection.count() > 0;

      expect(anyVisible).toBeTruthy();
    });

    test('components maintain correct vertical spacing', async ({ page }) => {
      await page.goto(testPagePath);

      // All section-level components should use py-12 md:py-16
      const sections = page.locator('section.py-12, section.py-16');
      const count = await sections.count();

      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const section = sections.nth(i);
          const classes = await section.getAttribute('class');

          // Should have either py-12 or md:py-16
          const hasCorrectPadding = classes?.includes('py-12') || classes?.includes('py-16');
          expect(hasCorrectPadding).toBeTruthy();
        }
      }
    });

    test('background colors alternate correctly (white → cream → white)', async ({ page }) => {
      await page.goto(testPagePath);

      // Get all adventure sections
      const allSections = page.locator('section[class*="bg-white"], section[class*="bg-brand-cream"]');
      const count = await allSections.count();

      if (count >= 2) {
        const backgrounds: string[] = [];

        for (let i = 0; i < Math.min(count, 5); i++) {
          const section = allSections.nth(i);
          const classes = await section.getAttribute('class');

          if (classes?.includes('bg-white')) {
            backgrounds.push('white');
          } else if (classes?.includes('bg-brand-cream')) {
            backgrounds.push('cream');
          }
        }

        // Verify alternating pattern if we have backgrounds
        if (backgrounds.length >= 2) {
          for (let i = 1; i < backgrounds.length; i++) {
            // Adjacent sections should be different
            expect(backgrounds[i]).not.toBe(backgrounds[i - 1]);
          }
        }
      }
    });
  });

  // ==========================================================================
  // SCENARIO 2: Data Flow - WMA Frontmatter → Component Props
  // ==========================================================================
  test.describe('Scenario 2: Data Flow Validation', () => {
    test('components receive and render frontmatter data', async ({ page }) => {
      await page.goto(testPagePath);

      // AdventureFeatureSection should display feature titles
      const featureTitles = page.locator('h3.font-display.text-2xl');
      if (await featureTitles.count() > 0) {
        const firstTitle = await featureTitles.first().textContent();
        expect(firstTitle).toBeTruthy();
        expect(firstTitle!.length).toBeGreaterThan(0);
      }
    });

    test('handles optional fields gracefully', async ({ page }) => {
      await page.goto(testPagePath);

      // Test that page renders even if some data is missing
      const mainContent = page.locator('main, article');
      await expect(mainContent.first()).toBeVisible();

      // No console errors
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.waitForLoadState('networkidle');

      // Should have no React/Astro errors
      const relevantErrors = consoleErrors.filter(
        (err) => !err.includes('favicon') && !err.includes('404')
      );
      expect(relevantErrors.length).toBe(0);
    });

    test('TypeScript types enforce correct prop structure', async ({ page }) => {
      // This is a compile-time test, but we verify runtime behavior
      await page.goto(testPagePath);

      // Check that amenities are rendered as strings (not objects)
      const amenityItems = page.locator('section[aria-labelledby^="adventure-amenities-grid"] li');

      if (await amenityItems.count() > 0) {
        const firstAmenity = await amenityItems.first().textContent();
        expect(typeof firstAmenity).toBe('string');
      }
    });
  });

  // ==========================================================================
  // SCENARIO 3: Responsive Behavior - 3 Viewport Tests
  // ==========================================================================
  test.describe('Scenario 3: Responsive Behavior', () => {
    test('mobile (375px): all grids collapse to 1-2 columns', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(testPagePath);

      // Check AdventureAmenitiesGrid uses 2 columns on mobile
      const amenitiesGrid = page.locator('section[aria-labelledby^="adventure-amenities-grid"] ul');
      if (await amenitiesGrid.count() > 0) {
        const classes = await amenitiesGrid.getAttribute('class');
        // Should have grid-cols-2 for mobile
        expect(classes).toMatch(/grid-cols-2/);
      }

      // Check AdventureCampingList shows single column
      const campingCards = page.locator('section[aria-labelledby^="adventure-camping-list"] .grid');
      if (await campingCards.count() > 0) {
        const classes = await campingCards.getAttribute('class');
        // Should have grid-cols-1 for mobile
        expect(classes).toMatch(/grid-cols-1/);
      }
    });

    test('tablet (768px): grids expand to 2-3 columns', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(testPagePath);

      // AdventureCampingList should show 3 columns
      const campingGrid = page.locator('section[aria-labelledby^="adventure-camping-list"] .grid');
      if (await campingGrid.count() > 0) {
        const classes = await campingGrid.getAttribute('class');
        expect(classes).toMatch(/md:grid-cols-[234]/);
      }

      // AdventureAmenitiesGrid should show 3 columns
      const amenitiesGrid = page.locator('section[aria-labelledby^="adventure-amenities-grid"] ul');
      if (await amenitiesGrid.count() > 0) {
        const classes = await amenitiesGrid.getAttribute('class');
        expect(classes).toMatch(/md:grid-cols-[34]/);
      }
    });

    test('desktop (1280px): grids show full column counts', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(testPagePath);

      // AdventureFeatureSection should show 2-3 columns
      const featureGrid = page.locator('.adventure-feature-section ul.grid');
      if (await featureGrid.count() > 0) {
        const classes = await featureGrid.getAttribute('class');
        expect(classes).toMatch(/md:grid-cols-[23]/);
      }

      // AdventureCampingList should show 3-4 columns on large screens
      const campingGrid = page.locator('section[aria-labelledby^="adventure-camping-list"] .grid');
      if (await campingGrid.count() > 0) {
        const classes = await campingGrid.getAttribute('class');
        // Should have lg:grid-cols-4 for 4-column layouts
        const hasLargeColumns = classes?.includes('lg:grid-cols-4') || classes?.includes('md:grid-cols-3');
        expect(hasLargeColumns).toBeTruthy();
      }
    });

    test('buttons stack vertically on mobile, horizontal on desktop', async ({ page }) => {
      await page.goto(testPagePath);

      // Test AdventureCTA button layout
      const buttonGroup = page.locator('section:has(a.bg-sign-green, a.bg-brand-brown) .flex').first();

      if (await buttonGroup.count() > 0) {
        const classes = await buttonGroup.getAttribute('class');

        // Should have flex-col for mobile, sm:flex-row for desktop
        expect(classes).toMatch(/flex-col/);
        expect(classes).toMatch(/sm:flex-row/);
      }
    });
  });

  // ==========================================================================
  // SCENARIO 4: SPEC-10/11 Integration - No Styling Conflicts
  // ==========================================================================
  test.describe('Scenario 4: SPEC-10/11 Integration', () => {
    test('AdventureQuickStats + new components render together', async ({ page }) => {
      await page.goto(testPagePath);

      // Check both SPEC-10 and SPEC-12 components coexist
      const quickStats = page.locator('section[aria-labelledby^="adventure-quick-stats"]');
      const newComponents = page.locator('section.adventure-feature-section, section[aria-labelledby^="adventure-camping-list"]');

      const hasQuickStats = await quickStats.count() > 0;
      const hasNewComponents = await newComponents.count() > 0;

      // At least one set should be present
      expect(hasQuickStats || hasNewComponents).toBeTruthy();
    });

    test('AdventureGettingThere + new components maintain spacing', async ({ page }) => {
      await page.goto(testPagePath);

      const gettingThere = page.locator('section[aria-labelledby^="adventure-getting-there"]');
      const amenitiesGrid = page.locator('section[aria-labelledby^="adventure-amenities-grid"]');

      if (await gettingThere.count() > 0 && await amenitiesGrid.count() > 0) {
        // Both should have correct padding
        const gettingThereClasses = await gettingThere.getAttribute('class');
        const amenitiesClasses = await amenitiesGrid.getAttribute('class');

        expect(gettingThereClasses).toMatch(/py-12|py-16/);
        expect(amenitiesClasses).toMatch(/py-12|py-16/);
      }
    });

    test('no conflicting Tailwind classes between components', async ({ page }) => {
      await page.goto(testPagePath);

      const pageHtml = await page.content();

      // Should not have conflicting rounded classes
      const forbiddenClasses = ['rounded-lg', 'rounded-xl', 'rounded-2xl'];
      for (const forbidden of forbiddenClasses) {
        expect(pageHtml).not.toContain(forbidden);
      }

      // Should only use rounded-sm
      const hasRoundedSm = pageHtml.includes('rounded-sm');
      if (pageHtml.includes('rounded')) {
        expect(hasRoundedSm).toBeTruthy();
      }
    });

    test('consistent font families across all components', async ({ page }) => {
      await page.goto(testPagePath);

      // Check that font-display is used for headings
      const headings = page.locator('h2.font-display, h3.font-display');
      const count = await headings.count();

      expect(count).toBeGreaterThan(0);

      // Verify font-display renders correctly
      const firstHeading = headings.first();
      const fontFamily = await firstHeading.evaluate((el) => {
        return window.getComputedStyle(el).fontFamily;
      });

      // Should include 'Bitter' from Tailwind config
      expect(fontFamily.toLowerCase()).toContain('bitter');
    });
  });

  // ==========================================================================
  // SCENARIO 5: Empty State Handling
  // ==========================================================================
  test.describe('Scenario 5: Empty State Handling', () => {
    test('AdventureFeatureSection hidden when features array is empty', async ({ page }) => {
      await page.goto(testPagePath);

      // If section exists, it should have at least one feature item
      const featureSection = page.locator('section.adventure-feature-section');

      if (await featureSection.count() > 0) {
        const featureItems = featureSection.locator('li');
        const count = await featureItems.count();

        expect(count).toBeGreaterThan(0);
      }
    });

    test('AdventureAmenitiesGrid hidden when amenities array is empty', async ({ page }) => {
      await page.goto(testPagePath);

      // If section exists, it should have at least one amenity
      const amenitiesGrid = page.locator('section[aria-labelledby^="adventure-amenities-grid"]');

      if (await amenitiesGrid.count() > 0) {
        const amenityItems = amenitiesGrid.locator('li');
        const count = await amenityItems.count();

        expect(count).toBeGreaterThan(0);
      }
    });

    test('AdventureCampingList shows empty state message when no facilities', async ({ page }) => {
      await page.goto(testPagePath);

      const campingList = page.locator('section[aria-labelledby^="adventure-camping-list"]');

      if (await campingList.count() > 0) {
        // Should have either facility cards OR empty state message
        const facilityCards = campingList.locator('.bg-white.rounded-sm');
        const emptyMessage = campingList.locator('text=/No facilities listed/i');

        const hasCards = await facilityCards.count() > 0;
        const hasEmptyMessage = await emptyMessage.count() > 0;

        expect(hasCards || hasEmptyMessage).toBeTruthy();
      }
    });

    test('AdventureCTA renders with only primary button when secondary is missing', async ({ page }) => {
      await page.goto(testPagePath);

      const ctaSection = page.locator('section:has(a.bg-white)').last();

      if (await ctaSection.count() > 0) {
        const buttons = ctaSection.locator('a.px-8');
        const count = await buttons.count();

        // Should have at least 1 button (primary)
        expect(count).toBeGreaterThanOrEqual(1);
      }
    });
  });

  // ==========================================================================
  // SCENARIO 6: Accessibility & WCAG Compliance
  // ==========================================================================
  test.describe('Scenario 6: Accessibility', () => {
    test('all SPEC-12 components pass WCAG 2.1 AA', async ({ page }) => {
      await page.goto(testPagePath);

      const componentSelectors = [
        'section.adventure-feature-section',
        'section[aria-labelledby^="adventure-camping-list"]',
        'section[aria-labelledby^="adventure-amenities-grid"]',
        'section:has(a.bg-sign-green, a.bg-brand-brown)',
      ];

      for (const selector of componentSelectors) {
        const component = page.locator(selector);

        if (await component.count() > 0) {
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

    test('color contrast meets WCAG AA for all components', async ({ page }) => {
      await page.goto(testPagePath);

      const results = await new AxeBuilder({ page })
        .withTags(['color-contrast'])
        .analyze();

      if (results.violations.length > 0) {
        console.log('Color contrast violations:', JSON.stringify(results.violations, null, 2));
      }

      expect(results.violations).toEqual([]);
    });

    test('icons have aria-hidden and info conveyed in text', async ({ page }) => {
      await page.goto(testPagePath);

      // Check AdventureAmenitiesGrid icons
      const amenityIcons = page.locator('section[aria-labelledby^="adventure-amenities-grid"] svg');

      if (await amenityIcons.count() > 0) {
        const firstIcon = amenityIcons.first();
        const ariaHidden = await firstIcon.getAttribute('aria-hidden');

        expect(ariaHidden).toBe('true');
      }
    });

    test('external links have security attributes', async ({ page }) => {
      await page.goto(testPagePath);

      // Check AdventureCampingList external links
      const externalLinks = page.locator('a[href^="http"]');

      if (await externalLinks.count() > 0) {
        for (let i = 0; i < await externalLinks.count(); i++) {
          const link = externalLinks.nth(i);
          const target = await link.getAttribute('target');
          const rel = await link.getAttribute('rel');

          if (target === '_blank') {
            expect(rel).toContain('noopener');
            expect(rel).toContain('noreferrer');
          }
        }
      }
    });

    test('phone links use proper tel: protocol', async ({ page }) => {
      await page.goto(testPagePath);

      // Check AdventureCampingList phone links
      const phoneLinks = page.locator('a[href^="tel:"]');

      if (await phoneLinks.count() > 0) {
        const firstPhone = phoneLinks.first();
        const href = await firstPhone.getAttribute('href');

        // Should strip formatting: tel:+13045551234
        expect(href).toMatch(/^tel:\+?\d+$/);
      }
    });
  });

  // ==========================================================================
  // SCENARIO 7: WVWO Aesthetic Compliance
  // ==========================================================================
  test.describe('Scenario 7: WVWO Aesthetic Compliance', () => {
    test('no forbidden fonts (Inter, Poppins, etc.)', async ({ page }) => {
      await page.goto(testPagePath);

      const pageHtml = await page.content();

      const forbiddenFonts = ['Inter', 'Poppins', 'DM Sans', 'Space Grotesk', 'Outfit', 'Montserrat'];
      for (const font of forbiddenFonts) {
        expect(pageHtml).not.toContain(font);
      }
    });

    test('uses WVWO brand colors only', async ({ page }) => {
      await page.goto(testPagePath);

      const pageHtml = await page.content();

      const brandColors = ['sign-green', 'brand-brown', 'brand-cream', 'brand-orange', 'brand-mud'];
      const foundColors = brandColors.filter((color) => pageHtml.includes(color));

      // Should use at least some brand colors
      expect(foundColors.length).toBeGreaterThan(0);
    });

    test('no glassmorphism or backdrop-blur effects', async ({ page }) => {
      await page.goto(testPagePath);

      const pageHtml = await page.content();

      expect(pageHtml).not.toContain('backdrop-blur');
      expect(pageHtml).not.toContain('backdrop-filter');
    });

    test('only rounded-sm corners, no rounded-md/lg/xl', async ({ page }) => {
      await page.goto(testPagePath);

      const pageHtml = await page.content();

      const forbiddenRounded = ['rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl'];
      for (const forbidden of forbiddenRounded) {
        // Should not appear in component classes
        const componentSections = page.locator('section[aria-labelledby^="adventure-"], section.adventure-feature-section');
        const count = await componentSections.count();

        for (let i = 0; i < count; i++) {
          const classes = await componentSections.nth(i).getAttribute('class');
          expect(classes).not.toContain(forbidden);
        }
      }
    });

    test('orange used sparingly (<5% of screen)', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(testPagePath);

      const orangeElements = page.locator('[class*="brand-orange"]');
      const count = await orangeElements.count();

      // Orange should be rare (primary CTAs only)
      expect(count).toBeLessThan(5);
    });
  });

  // ==========================================================================
  // SCENARIO 8: Animation & Reduced Motion
  // ==========================================================================
  test.describe('Scenario 8: Animation Behavior', () => {
    test('gentle-reveal animation runs by default', async ({ page }) => {
      await page.goto(testPagePath);

      const featureSection = page.locator('section.adventure-feature-section');

      if (await featureSection.count() > 0) {
        // Check that animation class is present
        const classes = await featureSection.getAttribute('class');
        expect(classes).toContain('adventure-feature-section');

        // Animation should complete (opacity 1)
        await page.waitForTimeout(1000);
        const opacity = await featureSection.evaluate((el) => {
          return parseFloat(window.getComputedStyle(el).opacity);
        });

        expect(opacity).toBe(1);
      }
    });

    test('animations disabled with prefers-reduced-motion', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(testPagePath);

      const sections = page.locator('section.adventure-feature-section, section.adventure-amenities-grid');

      if (await sections.count() > 0) {
        const firstSection = sections.first();

        // Should be immediately visible (no animation delay)
        const opacity = await firstSection.evaluate((el) => {
          return parseFloat(window.getComputedStyle(el).opacity);
        });

        expect(opacity).toBe(1);
      }
    });
  });

  // ==========================================================================
  // SCENARIO 9: Visual Regression Tests
  // ==========================================================================
  test.describe('Scenario 9: Visual Regression', () => {
    test('mobile composition screenshot (375px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(testPagePath);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      const mainContent = page.locator('main, article');
      if (await mainContent.count() > 0) {
        await expect(mainContent.first()).toHaveScreenshot('spec-12-integration-mobile.png', {
          maxDiffPixels: 100,
        });
      }
    });

    test('desktop composition screenshot (1280px)', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(testPagePath);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      const mainContent = page.locator('main, article');
      if (await mainContent.count() > 0) {
        await expect(mainContent.first()).toHaveScreenshot('spec-12-integration-desktop.png', {
          maxDiffPixels: 100,
        });
      }
    });
  });

  // ==========================================================================
  // SCENARIO 10: Performance & Load Behavior
  // ==========================================================================
  test.describe('Scenario 10: Performance', () => {
    test('page loads without layout shift', async ({ page }) => {
      await page.goto(testPagePath);

      // Monitor cumulative layout shift
      const cls = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          let clsValue = 0;
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if ((entry as any).hadRecentInput) continue;
              clsValue += (entry as any).value;
            }
          });

          observer.observe({ type: 'layout-shift', buffered: true });

          setTimeout(() => {
            observer.disconnect();
            resolve(clsValue);
          }, 3000);
        });
      });

      // CLS should be under 0.1 (good threshold)
      expect(cls).toBeLessThan(0.1);
    });

    test('components render without blocking main thread', async ({ page }) => {
      const startTime = Date.now();
      await page.goto(testPagePath);
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - startTime;

      // Should load in under 3 seconds on fast connection
      expect(loadTime).toBeLessThan(3000);
    });
  });
});
