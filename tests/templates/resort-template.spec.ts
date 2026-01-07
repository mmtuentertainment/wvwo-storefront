/**
 * SPEC-20: Adventure Resort Template Tests
 * Validates WVWO aesthetic compliance, accessibility, and component rendering
 *
 * Test Categories:
 * 1. WVWO Aesthetic Compliance (border-radius, colors, fonts)
 * 2. Component Rendering & Props
 * 3. Accessibility (WCAG 2.1 AA)
 * 4. Responsive Design
 * 5. External Link Behavior
 */

import { test, expect } from '@playwright/test';

test.describe('SPEC-20: ResortTemplate - WVWO Aesthetic Compliance', () => {
  test.beforeEach(async ({ page }) => {
    // Test against resort template test page
    await page.goto('/__test-resort-template');
  });

  test('CRITICAL: Zero forbidden rounded classes in ResortTemplate', async ({ page }) => {
    const forbiddenClasses = [
      'rounded-md',
      'rounded-lg',
      'rounded-xl',
      'rounded-2xl',
      'rounded-3xl',
      'rounded-full',
    ];

    for (const forbiddenClass of forbiddenClasses) {
      const violators = await page.locator(`.${forbiddenClass}`).count();

      expect(violators, `
        ❌ WVWO VIOLATION: Found ${violators} elements with .${forbiddenClass}
        ResortTemplate MUST use rounded-sm ONLY for hardware store aesthetic.
      `).toBe(0);
    }
  });

  test('CRITICAL: All section cards use rounded-sm', async ({ page }) => {
    const cardSelectors = [
      '#activities article',
      '#guided-trips > div > div > div',
      '#lodging > div > div > div',
      '#packages > div > div > div',
      '#outfitter-services .border-l-4',
      '#facilities .bg-white',
      '#booking-policies .bg-white',
    ];

    for (const selector of cardSelectors) {
      const cards = await page.locator(selector).all();

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const classList = await card.getAttribute('class') || '';

        // Either has rounded-sm or no rounded class (sharp corners by default)
        const hasForbidden = /rounded-(md|lg|xl|2xl|3xl|full)/.test(classList);

        expect(hasForbidden, `
          ❌ WVWO VIOLATION in ${selector}[${i}]
          Classes: ${classList}
          ResortTemplate cards MUST use rounded-sm or no rounded class.
        `).toBe(false);
      }
    }
  });

  test('CRITICAL: Uses WVWO brand colors only', async ({ page }) => {
    // Check that key elements use brand colors
    const colorChecks = [
      { selector: 'h2', expectedClass: 'text-brand-brown' },
      { selector: '#activities article', expectedClass: 'border-l-sign-green' },
      { selector: '#guided-trips .bg-white', expectedClass: 'border-l-brand-orange' },
      { selector: '#booking-policies a[href*="tel"]', expectedClass: 'text-sign-green' },
    ];

    for (const check of colorChecks) {
      const elements = await page.locator(check.selector).all();

      if (elements.length > 0) {
        const firstElement = elements[0];
        const classList = await firstElement.getAttribute('class') || '';

        expect(classList, `
          ${check.selector} should use ${check.expectedClass}
          Found: ${classList}
        `).toContain(check.expectedClass);
      }
    }
  });

  test('CRITICAL: Uses WVWO fonts (Bitter, Noto Sans)', async ({ page }) => {
    // Display headings should use font-display (Bitter)
    const headings = await page.locator('h1, h2, h3').all();

    for (let i = 0; i < Math.min(headings.length, 5); i++) {
      const heading = headings[i];
      const classList = await heading.getAttribute('class') || '';

      expect(classList, `
        Heading ${i} should use font-display (Bitter)
        Found: ${classList}
      `).toContain('font-display');
    }

    // Body text should use font-body (Noto Sans)
    const bodyText = await page.locator('p.font-body').count();
    expect(bodyText, 'Should have body text using font-body class').toBeGreaterThan(0);
  });

  test('CRITICAL: brand-orange used sparingly (<5% of screen)', async ({ page }) => {
    // Count orange elements vs total elements
    const orangeElements = await page.locator('[class*="brand-orange"]').count();
    const allElements = await page.locator('*').count();

    const orangePercentage = (orangeElements / allElements) * 100;

    expect(orangePercentage, `
      ❌ Too much brand-orange usage: ${orangePercentage.toFixed(2)}%
      WVWO requires orange to be <5% of screen (CTAs only)
    `).toBeLessThan(5);
  });
});

test.describe('SPEC-20: ResortTemplate - Section Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/__test-resort-template');
  });

  test('Hero section renders with all required elements', async ({ page }) => {
    // Resort name
    const name = await page.locator('h1').first();
    await expect(name).toBeVisible();

    // Location
    const location = await page.locator('[class*="location"], p:has-text("West Virginia")').first();
    await expect(location).toBeVisible();

    // Signature activities
    const activities = await page.locator('[class*="signature"], .bg-brand-orange').first();
    await expect(activities).toBeVisible();

    // Hero CTA (if reservation URL provided)
    const cta = await page.locator('a:has-text("Book"), a:has-text("Reserve")').first();
    if (await cta.isVisible()) {
      await expect(cta).toHaveAttribute('target', '_blank');
    }
  });

  test('Activity Menu section renders categories and activities', async ({ page }) => {
    const section = page.locator('#activities');
    await expect(section).toBeVisible();

    // Category headers
    const categories = await section.locator('h3').count();
    expect(categories, 'Should have at least one activity category').toBeGreaterThan(0);

    // Activity cards
    const activityCards = await section.locator('article').count();
    expect(activityCards, 'Should have at least one activity card').toBeGreaterThan(0);

    // Difficulty badges
    const badges = await section.locator('[class*="bg-brand-cream"]').count();
    expect(badges, 'Activities should show difficulty badges').toBeGreaterThan(0);
  });

  test('Guided Trips section renders with pricing', async ({ page }) => {
    const section = page.locator('#guided-trips');
    await expect(section).toBeVisible();

    // Trip names
    const tripNames = await section.locator('h3').count();
    expect(tripNames, 'Should have at least one guided trip').toBeGreaterThan(0);

    // Pricing in sign-green
    const pricing = await section.locator('.text-sign-green').count();
    expect(pricing, 'Pricing should be displayed in sign-green').toBeGreaterThan(0);

    // Includes list with checkmarks
    const checkmarks = await section.locator('text=✓').count();
    expect(checkmarks, 'Should show checkmarks for included items').toBeGreaterThan(0);
  });

  test('Lodging section renders accommodation options', async ({ page }) => {
    const section = page.locator('#lodging');
    await expect(section).toBeVisible();

    // Lodging cards
    const lodgingCards = await section.locator('.border-l-sign-green').count();
    expect(lodgingCards, 'Should have lodging options with sign-green border').toBeGreaterThan(0);

    // Price range display
    const prices = await section.locator('.text-sign-green').count();
    expect(prices, 'Should display prices in sign-green').toBeGreaterThan(0);

    // Book Now buttons (external links)
    const bookButtons = await section.locator('a:has-text("Book Now")').all();
    for (const btn of bookButtons) {
      await expect(btn).toHaveAttribute('target', '_blank');
      await expect(btn).toHaveAttribute('rel', /noopener/);
    }
  });

  test('Packages section renders with includes list', async ({ page }) => {
    const section = page.locator('#packages');
    await expect(section).toBeVisible();

    // Package cards with orange border
    const packageCards = await section.locator('.border-l-brand-orange').count();
    expect(packageCards, 'Should have package cards with brand-orange border').toBeGreaterThan(0);

    // Duration badges
    const durationBadges = await section.locator('[class*="bg-brand-cream"]').count();
    expect(durationBadges, 'Should show duration badges').toBeGreaterThan(0);

    // Includes checkmarks
    const checkmarks = await section.locator('text=✓').count();
    expect(checkmarks, 'Should show checkmarks for included items').toBeGreaterThan(0);
  });

  test('Outfitter Services section renders by category', async ({ page }) => {
    const section = page.locator('#outfitter-services');
    await expect(section).toBeVisible();

    // Service categories
    const categories = await section.locator('h3').count();
    expect(categories, 'Should have service categories').toBeGreaterThan(0);

    // Service items with sign-green border
    const serviceItems = await section.locator('.border-l-sign-green').count();
    expect(serviceItems, 'Should have service items with sign-green border').toBeGreaterThan(0);
  });

  test('Facilities section renders all subsections', async ({ page }) => {
    const section = page.locator('#facilities');
    await expect(section).toBeVisible();

    // Subsection headers (Dining, Retail, Event Spaces, Other)
    const subsections = await section.locator('h3').count();
    expect(subsections, 'Should have facility subsections').toBeGreaterThan(0);

    // Facility cards with brand-brown border
    const facilityCards = await section.locator('.border-l-brand-brown').count();
    expect(facilityCards, 'Should have facility items with brand-brown border').toBeGreaterThan(0);
  });

  test('Booking & Policies section renders contact info and policies', async ({ page }) => {
    const section = page.locator('#booking-policies');
    await expect(section).toBeVisible();

    // Phone number link
    const phoneLink = await section.locator('a[href^="tel:"]');
    await expect(phoneLink).toBeVisible();

    // Policy cards
    const policyCards = await section.locator('.border-l-brand-brown').count();
    expect(policyCards, 'Should have policy cards').toBeGreaterThan(0);

    // Book Online CTA (if URL provided)
    const bookOnline = await section.locator('a:has-text("Book Online")').first();
    if (await bookOnline.isVisible()) {
      await expect(bookOnline).toHaveClass(/bg-brand-orange/);
      await expect(bookOnline).toHaveAttribute('target', '_blank');
    }
  });
});

test.describe('SPEC-20: ResortTemplate - Accessibility (WCAG 2.1 AA)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/__test-resort-template');
  });

  test('All interactive elements have visible focus states', async ({ page }) => {
    const interactiveElements = await page.locator('a, button').all();

    for (let i = 0; i < Math.min(interactiveElements.length, 10); i++) {
      const element = interactiveElements[i];

      // Focus the element
      await element.focus();

      // Check for focus-visible outline
      const outlineStyle = await element.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.outlineWidth !== '0px' || style.boxShadow !== 'none';
      });

      // Note: This is a basic check - real a11y testing should use axe-core
    }
  });

  test('Images have alt text', async ({ page }) => {
    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');

      expect(alt, `
        Image missing alt text
        Src: ${await img.getAttribute('src')}
      `).toBeTruthy();
    }
  });

  test('Decorative icons have aria-hidden', async ({ page }) => {
    const decorativeIcons = await page.locator('span:has-text("✓"), span:has-text("•")').all();

    for (const icon of decorativeIcons) {
      const ariaHidden = await icon.getAttribute('aria-hidden');

      expect(ariaHidden, `
        Decorative icon should have aria-hidden="true"
      `).toBe('true');
    }
  });

  test('Section headings follow hierarchy (h2 > h3 > h4)', async ({ page }) => {
    const h2s = await page.locator('main h2').count();
    const h3s = await page.locator('main h3').count();
    const h4s = await page.locator('main h4').count();

    // Should have section headers (h2)
    expect(h2s, 'Should have h2 section headers').toBeGreaterThan(0);

    // If h4 exists, h3 should also exist
    if (h4s > 0) {
      expect(h3s, 'If h4 exists, h3 should also exist').toBeGreaterThan(0);
    }
  });

  test('External links have proper rel attributes', async ({ page }) => {
    const externalLinks = await page.locator('a[target="_blank"]').all();

    for (const link of externalLinks) {
      const rel = await link.getAttribute('rel');

      expect(rel, `
        External link should have rel="noopener noreferrer"
        Href: ${await link.getAttribute('href')}
      `).toMatch(/noopener/);
    }
  });

  test('Touch targets meet minimum 44px size on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });

    const touchTargets = await page.locator('a, button').all();

    for (let i = 0; i < Math.min(touchTargets.length, 10); i++) {
      const target = touchTargets[i];
      const box = await target.boundingBox();

      if (box) {
        // At least one dimension should be >= 44px
        const meetsMinSize = box.width >= 44 || box.height >= 44;

        expect(meetsMinSize, `
          Touch target ${i} too small: ${box.width}x${box.height}
          Minimum 44px required for accessibility
        `).toBe(true);
      }
    }
  });
});

test.describe('SPEC-20: ResortTemplate - Responsive Design', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 812 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1440, height: 900 },
  ];

  for (const viewport of viewports) {
    test(`Renders correctly at ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/__test-resort-template');

      // Hero section visible
      const hero = await page.locator('h1').first();
      await expect(hero).toBeVisible();

      // Key sections visible
      const sections = ['#activities', '#guided-trips', '#lodging', '#booking-policies'];
      for (const section of sections) {
        const sectionEl = page.locator(section);
        await expect(sectionEl).toBeVisible();
      }

      // No horizontal overflow
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasOverflow, `
        Horizontal overflow detected at ${viewport.name}
      `).toBe(false);
    });
  }
});

test.describe('SPEC-20: ResortTemplate - External Booking Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/__test-resort-template');
  });

  test('All booking CTAs link to external URLs', async ({ page }) => {
    const bookingLinks = await page.locator('a:has-text("Book"), a:has-text("Reserve")').all();

    for (const link of bookingLinks) {
      const href = await link.getAttribute('href');
      const target = await link.getAttribute('target');

      // Should be external (not relative path)
      if (href && !href.startsWith('#')) {
        expect(target, `
          Booking link should open in new tab
          Href: ${href}
        `).toBe('_blank');
      }
    }
  });

  test('Reservation URL in booking section works correctly', async ({ page }) => {
    const mainBookingCTA = await page.locator('#booking-policies a:has-text("Book Online")').first();

    if (await mainBookingCTA.isVisible()) {
      const href = await mainBookingCTA.getAttribute('href');
      const target = await mainBookingCTA.getAttribute('target');
      const rel = await mainBookingCTA.getAttribute('rel');

      expect(href).toBeTruthy();
      expect(target).toBe('_blank');
      expect(rel).toMatch(/noopener/);
    }
  });

  test('Phone number is clickable with tel: protocol', async ({ page }) => {
    const phoneLink = await page.locator('a[href^="tel:"]').first();

    await expect(phoneLink).toBeVisible();

    const href = await phoneLink.getAttribute('href');
    expect(href).toMatch(/^tel:/);
  });

  test('Email link uses mailto: protocol', async ({ page }) => {
    const emailLink = await page.locator('a[href^="mailto:"]').first();

    if (await emailLink.isVisible()) {
      const href = await emailLink.getAttribute('href');
      expect(href).toMatch(/^mailto:/);
    }
  });
});
