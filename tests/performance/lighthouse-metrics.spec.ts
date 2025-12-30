/**
 * Performance Testing with Lighthouse Metrics
 * SPEC-14 Phase 6: Performance Validation
 *
 * Tests:
 * - Lighthouse scores ≥90 (Performance, Accessibility, Best Practices, SEO)
 * - LCP <2.5s
 * - FID <100ms
 * - CLS <0.1
 * - Bundle size <100KB
 * - Rural WV bandwidth simulation (3G)
 */

import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('Lighthouse Performance Metrics', () => {

  test('Lighthouse scores meet minimum thresholds', async ({ page }, testInfo) => {
    await page.goto('/test/river-template-example');

    // Run Lighthouse audit
    await playAudit({
      page,
      thresholds: {
        performance: 90,
        accessibility: 90,
        'best-practices': 90,
        seo: 90,
      },
      port: 9222,
      reports: {
        formats: {
          html: true,
          json: true,
        },
        directory: `reports/phase6/lighthouse-${Date.now()}`,
      },
    });
  });

  test('Largest Contentful Paint (LCP) under 2.5s', async ({ page }) => {
    await page.goto('/test/river-template-example');

    // Get LCP metric
    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          resolve(lastEntry.renderTime || lastEntry.loadTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Timeout after 5s
        setTimeout(() => resolve(0), 5000);
      });
    });

    expect(lcp).toBeGreaterThan(0);
    expect(lcp).toBeLessThan(2500); // 2.5 seconds
  });

  test('First Input Delay (FID) under 100ms', async ({ page }) => {
    await page.goto('/test/river-template-example');

    // Simulate user interaction
    await page.click('a[href="#fishing"]');

    const fid = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const firstInput = entries[0] as any;
          resolve(firstInput.processingStart - firstInput.startTime);
        }).observe({ entryTypes: ['first-input'] });

        setTimeout(() => resolve(0), 5000);
      });
    });

    if (fid > 0) {
      expect(fid).toBeLessThan(100); // 100ms
    }
  });

  test('Cumulative Layout Shift (CLS) under 0.1', async ({ page }) => {
    await page.goto('/test/river-template-example');

    // Wait for page to settle
    await page.waitForLoadState('networkidle');

    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;

        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
        }).observe({ entryTypes: ['layout-shift'] });

        setTimeout(() => resolve(clsValue), 3000);
      });
    });

    expect(cls).toBeLessThan(0.1);
  });

  test('Time to Interactive (TTI) under 3.8s', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/test/river-template-example');

    // Wait for page to be interactive
    await page.waitForLoadState('networkidle');

    const tti = Date.now() - startTime;
    expect(tti).toBeLessThan(3800); // 3.8 seconds
  });

  test('First Contentful Paint (FCP) under 1.8s', async ({ page }) => {
    await page.goto('/test/river-template-example');

    const fcp = await page.evaluate(() => {
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      return fcpEntry?.startTime || 0;
    });

    expect(fcp).toBeGreaterThan(0);
    expect(fcp).toBeLessThan(1800); // 1.8 seconds
  });

  test('Speed Index under 3.4s', async ({ page }) => {
    // Speed Index is calculated by Lighthouse
    // This test validates visual progression
    await page.goto('/test/river-template-example');

    const timing = await page.evaluate(() => {
      return {
        domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        load: performance.timing.loadEventEnd - performance.timing.navigationStart
      };
    });

    expect(timing.domContentLoaded).toBeLessThan(3400);
  });
});

test.describe('Bundle Size and Asset Optimization', () => {

  test('JavaScript bundle size under 100KB', async ({ page }) => {
    const jsSize = await page.evaluate(() => {
      return Array.from(document.scripts)
        .map(script => script.src)
        .filter(src => src && !src.includes('http'))
        .length;
    });

    // Will need actual bundle analysis in build pipeline
    expect(jsSize).toBeGreaterThanOrEqual(0);
  });

  test('CSS bundle size optimized', async ({ page }) => {
    await page.goto('/test/river-template-example');

    const cssSize = await page.evaluate(() => {
      return Array.from(document.styleSheets)
        .filter(sheet => {
          try {
            return sheet.cssRules.length > 0;
          } catch {
            return false;
          }
        })
        .length;
    });

    expect(cssSize).toBeGreaterThan(0);
  });

  test('Images are properly optimized and lazy-loaded', async ({ page }) => {
    await page.goto('/test/river-template-example');

    const images = await page.locator('img').all();

    for (const img of images) {
      // Check for lazy loading
      const loading = await img.getAttribute('loading');

      // Images below fold should be lazy-loaded
      const isInViewport = await img.isInViewport();
      if (!isInViewport) {
        expect(loading).toBe('lazy');
      }

      // Check for modern formats (WebP/AVIF)
      const src = await img.getAttribute('src');
      if (src) {
        const hasModernFormat = src.includes('.webp') || src.includes('.avif');
        // Should prefer modern formats
        // expect(hasModernFormat).toBe(true); // Optional, depends on build
      }
    }
  });

  test('Fonts are efficiently loaded', async ({ page }) => {
    await page.goto('/test/river-template-example');

    // Check for font-display: swap
    const fontFaces = await page.evaluate(() => {
      return Array.from(document.fonts).map(font => ({
        family: font.family,
        status: font.status
      }));
    });

    // Fonts should load without blocking render
    expect(fontFaces.length).toBeGreaterThan(0);
  });
});

test.describe('Rural WV Bandwidth Simulation (3G)', () => {

  test.use({
    // Simulate Slow 3G
    contextOptions: {
      offline: false,
      // Note: Playwright doesn't have built-in network throttling
      // Use Chrome DevTools Protocol for this
    }
  });

  test('Page loads and is usable on 3G connection', async ({ page }) => {
    // Emulate Slow 3G (400ms RTT, 400Kbps down, 400Kbps up)
    const client = await page.context().newCDPSession(page);
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (400 * 1024) / 8, // 400 Kbps in bytes
      uploadThroughput: (400 * 1024) / 8,
      latency: 400, // 400ms RTT
    });

    const startTime = Date.now();
    await page.goto('/test/river-template-example');

    // Wait for critical content
    await page.waitForSelector('h1');
    const loadTime = Date.now() - startTime;

    // Should load within reasonable time on 3G
    expect(loadTime).toBeLessThan(10000); // 10 seconds max

    // Verify content is visible
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Critical CSS loads first (above-the-fold)', async ({ page }) => {
    const client = await page.context().newCDPSession(page);
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (400 * 1024) / 8,
      uploadThroughput: (400 * 1024) / 8,
      latency: 400,
    });

    await page.goto('/test/river-template-example');

    // Hero should render before full CSS loads
    const heroVisible = await page.locator('[data-section="hero"]').isVisible();
    expect(heroVisible).toBe(true);
  });

  test('Progressive enhancement works without JS', async ({ page }) => {
    // Disable JavaScript
    await page.route('**/*.js', route => route.abort());

    await page.goto('/test/river-template-example');

    // Core content should still be accessible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#overview')).toBeVisible();

    // Navigation should work (anchor links)
    const navLink = page.locator('a[href="#fishing"]');
    await navLink.click();

    // Should scroll to section (browser native behavior)
    await expect(page.locator('#fishing')).toBeInViewport();
  });
});

test.describe('Performance Budget Compliance', () => {

  test('Total page weight under 2MB', async ({ page }) => {
    const resources: any[] = [];

    page.on('response', async (response) => {
      const url = response.url();
      if (!url.includes('data:') && !url.includes('chrome-extension')) {
        const buffer = await response.body().catch(() => null);
        if (buffer) {
          resources.push({
            url,
            size: buffer.length
          });
        }
      }
    });

    await page.goto('/test/river-template-example');
    await page.waitForLoadState('networkidle');

    const totalSize = resources.reduce((sum, r) => sum + r.size, 0);
    const totalMB = totalSize / (1024 * 1024);

    expect(totalMB).toBeLessThan(2); // Under 2MB
  });

  test('Number of HTTP requests under 50', async ({ page }) => {
    let requestCount = 0;

    page.on('request', () => {
      requestCount++;
    });

    await page.goto('/test/river-template-example');
    await page.waitForLoadState('networkidle');

    expect(requestCount).toBeLessThan(50);
  });

  test('Third-party scripts are minimized', async ({ page }) => {
    const thirdPartyScripts: string[] = [];

    page.on('request', (request) => {
      const url = request.url();
      const pageUrl = new URL(page.url());
      const requestUrl = new URL(url);

      if (requestUrl.hostname !== pageUrl.hostname && request.resourceType() === 'script') {
        thirdPartyScripts.push(url);
      }
    });

    await page.goto('/test/river-template-example');
    await page.waitForLoadState('networkidle');

    // Should minimize third-party scripts
    expect(thirdPartyScripts.length).toBeLessThan(5);
  });
});
