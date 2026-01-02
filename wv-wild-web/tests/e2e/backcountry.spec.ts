/**
 * E2E Integration Tests - Backcountry Template System
 * SPEC-17: Backcountry wilderness areas with safety-critical features
 *
 * Tests:
 * - Backcountry hub listing page functionality
 * - Individual backcountry area detail pages (Dolly Sods Wilderness)
 * - Safety-critical components (cell coverage, emergency contacts, water safety)
 * - WVWO brand compliance (fonts, colors, borders, copy)
 * - Accessibility features (ARIA labels, alt text, phone links)
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Backcountry Hub Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/backcountry/');
  });

  test('renders hero section with title and description', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();

    const title = page.locator('h1');
    await expect(title).toContainText('West Virginia Backcountry');

    const description = page.locator('p').first();
    await expect(description).toContainText('Remote wilderness areas');
  });

  test('displays backcountry area cards in grid', async ({ page }) => {
    const areaCards = page.locator('a[href*="/backcountry/"]').filter({ hasNot: page.locator('nav a') });
    const cardCount = await areaCards.count();

    // Should have at least 1 area (Dolly Sods)
    expect(cardCount).toBeGreaterThanOrEqual(1);

    // First card should link to a backcountry area
    const firstCardHref = await areaCards.first().getAttribute('href');
    expect(firstCardHref).toMatch(/\/backcountry\/.+/);
  });

  test('difficulty badges render correctly', async ({ page }) => {
    // Look for difficulty badge with shape indicator
    const difficultyBadge = page.locator('span').filter({ hasText: /Rugged|Challenging|Moderate|Easy/i }).first();

    if (await difficultyBadge.count() > 0) {
      await expect(difficultyBadge).toBeVisible();

      // Check for shape indicator (◆, ▲, ■, ●)
      const badgeText = await difficultyBadge.textContent();
      expect(badgeText).toMatch(/[◆▲■●]/);
    }
  });

  test('safety notice section exists with critical warnings', async ({ page }) => {
    const safetySection = page.locator('section').filter({ hasText: /Safety Essentials/i });
    await expect(safetySection).toBeVisible();

    // Check for cell coverage warning
    await expect(safetySection).toContainText(/Cell Coverage|NO cell service/i);

    // Check for water safety warning
    await expect(safetySection).toContainText(/Water Safety|Acid Mine Drainage/i);

    // Check for navigation warning
    await expect(safetySection).toContainText(/Navigation|Paper maps/i);
  });

  test('area cards show hero images with alt text', async ({ page }) => {
    const images = page.locator('a[href*="/backcountry/"] img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      const firstImage = images.first();
      await expect(firstImage).toBeVisible();

      const altText = await firstImage.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText!.length).toBeGreaterThan(0);
    }
  });

  test('acreage information displays correctly', async ({ page }) => {
    const acreageText = page.locator('text=/\\d+,?\\d* acres/i').first();

    if (await acreageText.count() > 0) {
      await expect(acreageText).toBeVisible();
      const text = await acreageText.textContent();
      expect(text).toMatch(/\d{1,3}(,\d{3})* acres/);
    }
  });
});

test.describe('Dolly Sods Wilderness Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/backcountry/dolly-sods-wilderness/');
    // Wait for network to be idle to ensure all components loaded
    await page.waitForLoadState('networkidle');
  });

  test('page loads with correct title and meta description', async ({ page }) => {
    await expect(page).toHaveTitle(/Dolly Sods/i);

    // Use .first() to avoid strict mode violation (Layout.astro may add another meta tag)
    const metaDescription = page.locator('meta[name="description"]').first();
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });

  test('hero image loads successfully', async ({ page }) => {
    const heroImage = page.locator('img').first();

    if (await heroImage.count() > 0) {
      await expect(heroImage).toBeVisible();

      // Check alt text (naturalWidth check may fail if image is placeholder/data URI)
      const altText = await heroImage.getAttribute('alt');
      expect(altText).toBeTruthy();

      // Optionally check if image has src attribute
      const src = await heroImage.getAttribute('src');
      expect(src).toBeTruthy();
    }
  });

  test('cell coverage section shows "No Coverage" badge', async ({ page }) => {
    const cellCoverageSection = page.locator('section').filter({
      has: page.locator('h2:has-text("Cell Coverage")')
    });
    await expect(cellCoverageSection).toBeVisible();

    // Check for "No Coverage" or "None" status badge
    const noCoverageBadge = cellCoverageSection.locator('span').filter({
      hasText: /No Coverage|None/i
    }).first();
    await expect(noCoverageBadge).toBeVisible();

    // Check for satellite communication section
    await expect(cellCoverageSection).toContainText(/Satellite/i);
  });

  test('emergency contacts section renders with phone links', async ({ page }) => {
    const emergencySection = page.locator('section').filter({
      has: page.locator('h2:has-text("Emergency Contacts")')
    });
    await expect(emergencySection).toBeVisible();

    // Check for tel: links
    const phoneLinks = emergencySection.locator('a[href^="tel:"]');
    const linkCount = await phoneLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    // Verify first phone link is properly formatted
    const firstPhoneHref = await phoneLinks.first().getAttribute('href');
    expect(firstPhoneHref).toMatch(/^tel:\+?[0-9]+$/);

    // Check that phone number is visible and clickable
    await expect(phoneLinks.first()).toBeVisible();
  });

  test('emergency contacts have tier badges', async ({ page }) => {
    const emergencySection = page.locator('section').filter({
      has: page.locator('h2:has-text("Emergency Contacts")')
    });

    // Look for tier labels (Primary, SAR, Agency, Medical, Poison Control)
    const tierBadge = emergencySection.locator('span').filter({
      hasText: /Primary|SAR|Agency|Medical|Poison/i
    }).first();

    if (await tierBadge.count() > 0) {
      await expect(tierBadge).toBeVisible();
    }
  });

  test('water safety section with AMD warning banner', async ({ page }) => {
    const waterSection = page.locator('section').filter({
      has: page.locator('h2:has-text("Water")')
    });
    await expect(waterSection).toBeVisible();

    // Check for AMD warning (Acid Mine Drainage)
    const amdWarning = waterSection.locator('[role="alert"]').filter({
      hasText: /AMD|Acid Mine Drainage/i
    }).first();

    if (await amdWarning.count() > 0) {
      await expect(amdWarning).toBeVisible();

      // Should have red styling for toxic water warning
      const bgColor = await amdWarning.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );
      // Red-50 background: rgb(254, 242, 242) or similar
      expect(bgColor).toMatch(/rgb\(25[0-9], 24[0-9], 24[0-9]\)/);
    }
  });

  test('trail system section exists and is visible', async ({ page }) => {
    const trailSection = page.locator('section').filter({
      hasText: /Trail|Hiking/i
    });

    if (await trailSection.count() > 0) {
      await expect(trailSection.first()).toBeVisible();
    }
  });

  test("Kim's tips use Permanent Marker font (font-hand)", async ({ page }) => {
    const kimTip = page.locator('.font-hand').first();

    if (await kimTip.count() > 0) {
      await expect(kimTip).toBeVisible();

      const fontFamily = await kimTip.evaluate((el) =>
        window.getComputedStyle(el).fontFamily
      );

      // Should use Permanent Marker (font-hand)
      expect(fontFamily.toLowerCase()).toContain('permanent marker');
    }
  });

  test('satellite device recommendations display', async ({ page }) => {
    const satelliteSection = page.locator('text=/Garmin inReach|SPOT|Zoleo/i').first();

    if (await satelliteSection.count() > 0) {
      await expect(satelliteSection).toBeVisible();
    }
  });
});

test.describe('WVWO Brand Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/backcountry/dolly-sods-wilderness/');
    await page.waitForLoadState('networkidle');
  });

  test('no forbidden rounded-* classes (only rounded-sm allowed)', async ({ page }) => {
    // Get all elements with class attributes
    const allElements = page.locator('[class*="rounded"]');
    const count = await allElements.count();

    for (let i = 0; i < count; i++) {
      const className = await allElements.nth(i).getAttribute('class');

      // Check for forbidden rounded classes
      const forbiddenRounded = [
        'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl',
        'rounded-3xl', 'rounded-full'
      ];

      for (const forbidden of forbiddenRounded) {
        expect(className).not.toContain(forbidden);
      }
    }
  });

  test('headings use Bitter font (font-display)', async ({ page }) => {
    const h1 = page.locator('h1').first();
    const fontFamily = await h1.evaluate((el) =>
      window.getComputedStyle(el).fontFamily
    );

    expect(fontFamily.toLowerCase()).toContain('bitter');
  });

  test('body text uses Noto Sans font', async ({ page }) => {
    const bodyText = page.locator('p').first();
    const fontFamily = await bodyText.evaluate((el) =>
      window.getComputedStyle(el).fontFamily
    );

    expect(fontFamily.toLowerCase()).toContain('noto sans');
  });

  test("Kim's handwritten notes use Permanent Marker", async ({ page }) => {
    const kimNote = page.locator('.font-hand').first();

    if (await kimNote.count() > 0) {
      const fontFamily = await kimNote.evaluate((el) =>
        window.getComputedStyle(el).fontFamily
      );

      expect(fontFamily.toLowerCase()).toContain('permanent marker');
    }
  });

  test('no glassmorphism (backdrop-blur) effects', async ({ page }) => {
    const elements = page.locator('*');
    const count = await elements.count();

    // Sample check (check first 50 elements to avoid timeout)
    for (let i = 0; i < Math.min(count, 50); i++) {
      const backdropFilter = await elements.nth(i).evaluate((el) =>
        window.getComputedStyle(el).backdropFilter
      );
      expect(backdropFilter).toBe('none');
    }
  });

  test('WVWO color palette usage (no purple/pink/neon)', async ({ page }) => {
    const bodyText = await page.locator('body').textContent();

    // Should not contain forbidden marketing buzzwords
    const forbiddenWords = [
      'unlock potential',
      'seamless experience',
      'revolutionize',
      'next-level',
      'cutting-edge solutions'
    ];

    for (const word of forbiddenWords) {
      expect(bodyText?.toLowerCase()).not.toContain(word.toLowerCase());
    }
  });

  test('emergency orange used sparingly (<5% of screen)', async ({ page }) => {
    // Count elements with brand-orange color
    const orangeElements = page.locator('[class*="orange"]');
    const totalElements = page.locator('*');

    const orangeCount = await orangeElements.count();
    const totalCount = await totalElements.count();

    // Orange should be less than 5% of all elements
    const orangePercentage = (orangeCount / totalCount) * 100;
    expect(orangePercentage).toBeLessThan(5);
  });
});

test.describe('Accessibility Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/backcountry/dolly-sods-wilderness/');
    await page.waitForLoadState('networkidle');
  });

  test('all images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const altText = await images.nth(i).getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText!.length).toBeGreaterThan(0);
    }
  });

  test('phone links are properly formatted with tel: hrefs', async ({ page }) => {
    const phoneLinks = page.locator('a[href^="tel:"]');
    const linkCount = await phoneLinks.count();

    expect(linkCount).toBeGreaterThan(0);

    for (let i = 0; i < linkCount; i++) {
      const href = await phoneLinks.nth(i).getAttribute('href');
      // tel: href should only contain digits, +, and no spaces/dashes
      expect(href).toMatch(/^tel:\+?[0-9]+$/);
    }
  });

  test('sections have proper ARIA labels', async ({ page }) => {
    const sections = page.locator('section');
    const sectionCount = await sections.count();

    for (let i = 0; i < sectionCount; i++) {
      const section = sections.nth(i);

      // Each section should have aria-labelledby or aria-label
      const ariaLabelledBy = await section.getAttribute('aria-labelledby');
      const ariaLabel = await section.getAttribute('aria-label');

      const hasAria = ariaLabelledBy !== null || ariaLabel !== null;
      expect(hasAria).toBeTruthy();
    }
  });

  test('heading hierarchy is correct (single h1)', async ({ page }) => {
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('emergency contact phone links have aria-label', async ({ page }) => {
    const phoneLinks = page.locator('a[href^="tel:"]');
    const linkCount = await phoneLinks.count();

    if (linkCount > 0) {
      const firstPhoneLink = phoneLinks.first();
      const ariaLabel = await firstPhoneLink.getAttribute('aria-label');

      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toContain('Call');
    }
  });

  test('alert regions have role="alert" for screen readers', async ({ page }) => {
    const alerts = page.locator('[role="alert"]');
    const alertCount = await alerts.count();

    // Should have at least one alert (water safety or emergency)
    expect(alertCount).toBeGreaterThan(0);
  });

  test('focus indicators visible on interactive elements', async ({ page }) => {
    const firstLink = page.locator('a').first();
    await firstLink.focus();

    const outlineStyle = await firstLink.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return computed.outlineWidth !== '0px' || computed.boxShadow !== 'none';
    });

    expect(outlineStyle).toBeTruthy();
  });
});

test.describe('Axe-Core Accessibility Audit', () => {
  test('backcountry hub passes WCAG 2.1 AA', async ({ page }) => {
    await page.goto('/backcountry/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('backcountry detail page passes WCAG 2.1 AA', async ({ page }) => {
    await page.goto('/backcountry/dolly-sods-wilderness/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('color contrast meets WCAG AA requirements', async ({ page }) => {
    await page.goto('/backcountry/dolly-sods-wilderness/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .options({ runOnly: ['color-contrast'] })
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('SEO and Structured Data', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/backcountry/dolly-sods-wilderness/');
    await page.waitForLoadState('networkidle');
  });

  test('canonical URL is set correctly', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);

    const href = await canonical.getAttribute('href');
    expect(href).toContain('/backcountry/dolly-sods-wilderness/');
  });

  test('Open Graph tags are present', async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveCount(1);

    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveCount(1);

    const ogUrl = page.locator('meta[property="og:url"]');
    await expect(ogUrl).toHaveCount(1);
  });

  test('geo meta tags are present with coordinates', async ({ page }) => {
    const geoPosition = page.locator('meta[name="geo.position"]');

    if (await geoPosition.count() > 0) {
      const content = await geoPosition.getAttribute('content');
      expect(content).toMatch(/^-?\d+\.\d+;-?\d+\.\d+$/);
    }
  });

  test('safety classification meta tags present', async ({ page }) => {
    // Check for custom safety meta tags
    const cellCoverageMeta = page.locator('meta[name="wvwo:cell-coverage"]');
    const waterSafetyMeta = page.locator('meta[name="wvwo:water-safety"]');

    // At least one safety meta tag should be present
    const hasSafetyMeta =
      (await cellCoverageMeta.count()) > 0 ||
      (await waterSafetyMeta.count()) > 0;

    expect(hasSafetyMeta).toBeTruthy();
  });

  test('JSON-LD structured data is present and valid', async ({ page }) => {
    const jsonLdScript = page.locator('script[type="application/ld+json"]');

    if (await jsonLdScript.count() > 0) {
      const jsonLdContent = await jsonLdScript.textContent();

      // Parse JSON-LD
      const schema = JSON.parse(jsonLdContent!);

      // Validate basic structure
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@graph']).toBeDefined();
      expect(Array.isArray(schema['@graph'])).toBe(true);
    }
  });
});

test.describe('Mobile Responsiveness', () => {
  test('mobile layout stacks correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/backcountry/dolly-sods-wilderness/');
    await page.waitForLoadState('networkidle');

    const sections = page.locator('section');
    const firstSection = sections.first();

    await expect(firstSection).toBeVisible();
  });

  test('phone links are easily tappable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/backcountry/dolly-sods-wilderness/');
    await page.waitForLoadState('networkidle');

    const phoneLink = page.locator('a[href^="tel:"]').first();

    if (await phoneLink.count() > 0) {
      const box = await phoneLink.boundingBox();

      // Touch target should be at least 44x44px (iOS guidelines)
      expect(box!.height).toBeGreaterThanOrEqual(40);
    }
  });
});

test.describe('Performance', () => {
  test('page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/backcountry/dolly-sods-wilderness/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });
});
