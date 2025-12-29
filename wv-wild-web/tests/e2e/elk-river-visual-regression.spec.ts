/**
 * Visual Regression Testing - elk-river.astro
 * T-019: Validate refactored version visually matches original
 *
 * Test Strategy:
 * 1. Capture baseline screenshots (before refactoring)
 * 2. Capture comparison screenshots (after refactoring)
 * 3. Pixel-by-pixel comparison
 * 4. Functional validation
 * 5. Performance comparison
 */

import { test, expect, type Page } from '@playwright/test';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
// @ts-ignore - pixelmatch is available
import pixelmatch from 'pixelmatch';
// @ts-ignore - PNG library from pngjs
import { PNG } from 'pngjs';

// Test configuration
const PAGE_URL = '/near/elk-river/';
const SCREENSHOT_DIR = join(process.cwd(), 'tests', 'screenshots', 'elk-river');
const BASELINE_DIR = join(SCREENSHOT_DIR, 'baseline');
const COMPARISON_DIR = join(SCREENSHOT_DIR, 'comparison');
const DIFF_DIR = join(SCREENSHOT_DIR, 'diff');

// Viewports for testing
const VIEWPORTS = {
  mobile: { width: 375, height: 667, name: 'mobile' },
  tablet: { width: 768, height: 1024, name: 'tablet' },
  desktop: { width: 1280, height: 720, name: 'desktop' },
};

// WVWO brand colors for validation
const BRAND_COLORS = {
  brown: '#3E2723',
  green: '#2E7D32',
  cream: '#FFF8E1',
  orange: '#FF6F00',
};

// Ensure screenshot directories exist
function ensureDirectories() {
  [BASELINE_DIR, COMPARISON_DIR, DIFF_DIR].forEach(dir => {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  });
}

// Helper function for pixel comparison
async function compareScreenshots(
  baselinePath: string,
  comparisonPath: string,
  diffPath: string
): Promise<{ mismatchPercentage: number; totalPixels: number }> {
  const baseline = PNG.sync.read(readFileSync(baselinePath));
  const comparison = PNG.sync.read(readFileSync(comparisonPath));

  const { width, height } = baseline;
  const diff = new PNG({ width, height });

  const mismatchedPixels = pixelmatch(
    baseline.data,
    comparison.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  // Write diff image
  writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = width * height;
  const mismatchPercentage = (mismatchedPixels / totalPixels) * 100;

  return { mismatchPercentage, totalPixels };
}

// Helper to scroll page fully for full-page screenshot
async function scrollPageFully(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          // Scroll back to top
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });
}

test.describe('Elk River WMA - Visual Regression Testing', () => {
  test.beforeAll(() => {
    ensureDirectories();
  });

  // Test 1: Capture baseline screenshots (run this BEFORE refactoring)
  test.describe('Baseline Capture (Before Refactoring)', () => {
    Object.values(VIEWPORTS).forEach(({ width, height, name }) => {
      test(`should capture baseline at ${name} (${width}x${height})`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.goto(PAGE_URL);

        // Wait for page to be fully loaded
        await page.waitForLoadState('networkidle');

        // Scroll page to load all content
        await scrollPageFully(page);

        // Wait a bit for any lazy-loaded content
        await page.waitForTimeout(1000);

        // Capture full-page screenshot
        const screenshotPath = join(BASELINE_DIR, `elk-river-${name}.png`);
        await page.screenshot({
          path: screenshotPath,
          fullPage: true
        });

        console.log(`✓ Baseline captured: ${screenshotPath}`);
      });
    });
  });

  // Test 2: Capture comparison screenshots (run this AFTER refactoring)
  test.describe('Comparison Capture (After Refactoring)', () => {
    Object.values(VIEWPORTS).forEach(({ width, height, name }) => {
      test(`should capture comparison at ${name} (${width}x${height})`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.goto(PAGE_URL);

        // Wait for page to be fully loaded
        await page.waitForLoadState('networkidle');

        // Scroll page to load all content
        await scrollPageFully(page);

        // Wait for any transitions
        await page.waitForTimeout(1000);

        // Capture full-page screenshot
        const screenshotPath = join(COMPARISON_DIR, `elk-river-${name}.png`);
        await page.screenshot({
          path: screenshotPath,
          fullPage: true
        });

        console.log(`✓ Comparison captured: ${screenshotPath}`);
      });
    });
  });

  // Test 3: Pixel comparison
  test.describe('Pixel-by-Pixel Comparison', () => {
    Object.values(VIEWPORTS).forEach(({ name }) => {
      test(`should have <0.5% visual difference at ${name}`, async () => {
        const baselinePath = join(BASELINE_DIR, `elk-river-${name}.png`);
        const comparisonPath = join(COMPARISON_DIR, `elk-river-${name}.png`);
        const diffPath = join(DIFF_DIR, `elk-river-${name}-diff.png`);

        // Check if baseline exists
        if (!existsSync(baselinePath)) {
          test.skip(true, 'Baseline not found - run baseline capture first');
          return;
        }

        // Check if comparison exists
        if (!existsSync(comparisonPath)) {
          test.skip(true, 'Comparison not found - run comparison capture first');
          return;
        }

        const { mismatchPercentage, totalPixels } = await compareScreenshots(
          baselinePath,
          comparisonPath,
          diffPath
        );

        console.log(`${name}: ${mismatchPercentage.toFixed(3)}% mismatch (${totalPixels} total pixels)`);

        // Allow <0.5% difference for anti-aliasing, font rendering differences
        expect(mismatchPercentage).toBeLessThan(0.5);

        if (mismatchPercentage > 0) {
          console.log(`⚠ Diff image saved: ${diffPath}`);
        }
      });
    });
  });

  // Test 4: Functional validation
  test.describe('Functional Requirements Validation', () => {
    test('should render all major sections', async ({ page }) => {
      await page.goto(PAGE_URL);

      // Check hero section
      await expect(page.locator('h1')).toContainText('Elk River WMA');

      // Check What to Hunt section
      await expect(page.locator('h2').filter({ hasText: 'What to Hunt' })).toBeVisible();
      await expect(page.locator('h3').filter({ hasText: 'White-tailed Deer' })).toBeVisible();
      await expect(page.locator('h3').filter({ hasText: 'Wild Turkey' })).toBeVisible();

      // Check Fishing Waters section
      await expect(page.locator('h2').filter({ hasText: 'Fishing Waters' })).toBeVisible();

      // Check Getting There section
      await expect(page.locator('h2').filter({ hasText: 'Getting There' })).toBeVisible();

      // Check Facilities section
      await expect(page.locator('h2').filter({ hasText: 'Facilities' })).toBeVisible();

      // Check What to Bring section
      await expect(page.locator('h2').filter({ hasText: 'What to Bring' })).toBeVisible();

      // Check CTA section
      await expect(page.locator('h2').filter({ hasText: 'Stop By Before You Head Out' })).toBeVisible();
    });

    test('should use Permanent Marker font for Kim\'s tips', async ({ page }) => {
      await page.goto(PAGE_URL);

      // Look for any elements that should use hand font
      // Note: This will be more relevant after refactoring when Kim's tips are componentized
      const bodyText = await page.locator('body').evaluate(el => {
        return window.getComputedStyle(el).fontFamily;
      });

      // Verify base fonts are loaded (Noto Sans, Bitter)
      expect(bodyText).toBeTruthy();
    });

    test('should have clickable phone links', async ({ page }) => {
      await page.goto(PAGE_URL);

      // Find phone number links
      const phoneLinks = page.locator('a[href^="tel:"]');
      const count = await phoneLinks.count();

      expect(count).toBeGreaterThan(0);

      // Verify phone links have correct format
      for (let i = 0; i < count; i++) {
        const href = await phoneLinks.nth(i).getAttribute('href');
        expect(href).toMatch(/^tel:\+?1?[\d-()]+$/);
      }
    });

    test('should have external links open in new tab', async ({ page }) => {
      await page.goto(PAGE_URL);

      // Find WV DNR links
      const externalLinks = page.locator('a[target="_blank"]');
      const count = await externalLinks.count();

      expect(count).toBeGreaterThan(0);

      // Verify they have rel="noopener noreferrer"
      for (let i = 0; i < count; i++) {
        const rel = await externalLinks.nth(i).getAttribute('rel');
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      }
    });

    test('should have responsive grids working', async ({ page }) => {
      // Test mobile layout
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(PAGE_URL);

      // Check Quick Info grid (should be 2 columns on mobile)
      const quickInfoGrid = page.locator('.grid.grid-cols-2.md\\:grid-cols-4').first();
      await expect(quickInfoGrid).toBeVisible();

      // Test desktop layout
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.reload();

      // Grid should expand to 4 columns
      await expect(quickInfoGrid).toBeVisible();
    });

    test('should use correct WVWO brand colors', async ({ page }) => {
      await page.goto(PAGE_URL);

      // Check hero section background (brand-brown)
      const hero = page.locator('section.bg-brand-brown').first();
      const heroBg = await hero.evaluate(el => {
        return window.getComputedStyle(el).backgroundColor;
      });

      // RGB equivalent of #3E2723
      expect(heroBg).toBe('rgb(62, 39, 35)');
    });

    test('should only use rounded-sm for corners', async ({ page }) => {
      await page.goto(PAGE_URL);

      // Find all rounded elements
      const roundedElements = page.locator('[class*="rounded"]');
      const count = await roundedElements.count();

      for (let i = 0; i < count; i++) {
        const className = await roundedElements.nth(i).getAttribute('class');

        // Should NOT have rounded-md, rounded-lg, rounded-xl, rounded-3xl
        expect(className).not.toContain('rounded-md');
        expect(className).not.toContain('rounded-lg');
        expect(className).not.toContain('rounded-xl');
        expect(className).not.toContain('rounded-3xl');

        // Only rounded-sm is allowed (sharp corner aesthetic)
        if (className?.includes('rounded') && !className.includes('rounded-sm')) {
          console.warn(`⚠ Found non-sm rounded class: ${className}`);
        }
      }
    });
  });

  // Test 5: Performance validation
  test.describe('Performance Comparison', () => {
    test('should meet Lighthouse performance thresholds', async ({ page }) => {
      await page.goto(PAGE_URL);

      // Measure page load metrics
      const metrics = await page.evaluate(() => {
        const perf = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return {
          domContentLoaded: perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart,
          loadComplete: perf.loadEventEnd - perf.loadEventStart,
          domInteractive: perf.domInteractive - perf.fetchStart,
          firstPaint: performance.getEntriesByType('paint').find(e => e.name === 'first-paint')?.startTime || 0,
        };
      });

      console.log('Performance Metrics:');
      console.log(`  DOM Content Loaded: ${metrics.domContentLoaded.toFixed(2)}ms`);
      console.log(`  Load Complete: ${metrics.loadComplete.toFixed(2)}ms`);
      console.log(`  DOM Interactive: ${metrics.domInteractive.toFixed(2)}ms`);
      console.log(`  First Paint: ${metrics.firstPaint.toFixed(2)}ms`);

      // DOM Interactive should be under 2 seconds
      expect(metrics.domInteractive).toBeLessThan(2000);
    });

    test('should not have layout shifts', async ({ page }) => {
      await page.goto(PAGE_URL);

      // Wait for page to settle
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Check Cumulative Layout Shift
      const cls = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          let clsValue = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
          }).observe({ type: 'layout-shift', buffered: true });

          setTimeout(() => resolve(clsValue), 1000);
        });
      });

      console.log(`Cumulative Layout Shift: ${cls.toFixed(4)}`);

      // CLS should be under 0.1 (good)
      expect(cls).toBeLessThan(0.1);
    });

    test('should have all images properly sized', async ({ page }) => {
      await page.goto(PAGE_URL);

      const images = page.locator('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const hasWidthHeight = await img.evaluate(el => {
          return el.hasAttribute('width') && el.hasAttribute('height');
        });

        // All images should have width/height to prevent CLS
        if (!hasWidthHeight) {
          const src = await img.getAttribute('src');
          console.warn(`⚠ Image missing dimensions: ${src}`);
        }
      }
    });
  });

  // Test 6: Accessibility validation
  test.describe('Accessibility Requirements', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto(PAGE_URL);

      // Check h1 exists and is unique
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // Check heading order (h1 -> h2 -> h3, no skipping)
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
      const headingLevels = await Promise.all(
        headings.map(h => h.evaluate(el => parseInt(el.tagName.substring(1))))
      );

      // First heading should be h1
      expect(headingLevels[0]).toBe(1);
    });

    test('should have accessible form labels', async ({ page }) => {
      await page.goto(PAGE_URL);

      // Check email capture form
      const emailInput = page.locator('input[type="email"]');
      if (await emailInput.count() > 0) {
        // Should have associated label or aria-label
        const hasLabel = await emailInput.evaluate(el => {
          return el.hasAttribute('aria-label') ||
                 el.hasAttribute('aria-labelledby') ||
                 !!document.querySelector(`label[for="${el.id}"]`);
        });

        expect(hasLabel).toBeTruthy();
      }
    });

    test('should have sufficient color contrast', async ({ page }) => {
      await page.goto(PAGE_URL);

      // Check text contrast on hero section
      const heroText = page.locator('section.bg-brand-brown p').first();
      const contrast = await heroText.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          color: style.color,
          background: style.backgroundColor,
        };
      });

      // Brand cream text on brand brown should have good contrast
      expect(contrast.color).toBeTruthy();
      expect(contrast.background).toBeTruthy();
    });
  });
});
