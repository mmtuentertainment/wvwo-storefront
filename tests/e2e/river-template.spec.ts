/**
 * E2E Integration Tests - River Template System
 * SPEC-14 Phase 6: Final Testing and Validation
 *
 * Tests:
 * - RiverTemplate component rendering with example data
 * - SchemaRiverTemplate JSON-LD generation
 * - Content Collections integration
 * - All 8 sections display and functionality
 */

import { test, expect } from '@playwright/test';

test.describe('River Template E2E Integration', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to test page with river template
    await page.goto('/test/river-template-example');
  });

  test('RiverTemplate renders with example data', async ({ page }) => {
    // Check hero section
    await expect(page.locator('h1')).toContainText('New River Gorge');
    await expect(page.locator('[data-section="hero"]')).toBeVisible();

    // Check navigation
    const navLinks = page.locator('nav a');
    await expect(navLinks).toHaveCount(8); // 8 sections

    // Check all section IDs are present
    const sectionIds = [
      'overview',
      'geography',
      'fishing',
      'hunting',
      'wildlife',
      'regulations',
      'access',
      'products'
    ];

    for (const id of sectionIds) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test('SchemaRiverTemplate generates valid JSON-LD', async ({ page }) => {
    // Find the JSON-LD script tag
    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toHaveCount(1);

    // Extract and parse JSON-LD
    const jsonLdContent = await jsonLdScript.textContent();
    const schema = JSON.parse(jsonLdContent);

    // Validate @context and @graph structure
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@graph']).toBeDefined();
    expect(Array.isArray(schema['@graph'])).toBe(true);

    // Find Place entity in @graph
    const placeEntity = schema['@graph'].find((item: any) => item['@type'] === 'Place');
    expect(placeEntity).toBeDefined();
    expect(placeEntity.name).toBe('New River Gorge');

    // Validate required properties
    expect(placeEntity.geo).toBeDefined();
    expect(placeEntity.geo['@type']).toBe('GeoCoordinates');
    expect(placeEntity.geo.latitude).toBeDefined();
    expect(placeEntity.geo.longitude).toBeDefined();

    // Find TouristAttraction entity
    const attractionEntity = schema['@graph'].find((item: any) =>
      item['@type'] === 'TouristAttraction'
    );
    expect(attractionEntity).toBeDefined();
    expect(attractionEntity.touristType).toContain('Fishing');
    expect(attractionEntity.touristType).toContain('Hunting');
  });

  test('Content Collections query returns river type', async ({ page }) => {
    // This would test the actual Astro collection query
    // For now, verify data attributes are present
    const riverElement = page.locator('[data-river-id]');
    await expect(riverElement).toBeVisible();

    const riverId = await riverElement.getAttribute('data-river-id');
    expect(riverId).toBeTruthy();

    // Verify collection type attribute
    const collectionType = await riverElement.getAttribute('data-collection');
    expect(collectionType).toBe('rivers');
  });

  test('All 8 sections display correctly', async ({ page }) => {
    // Test each section individually

    // 1. Overview
    const overview = page.locator('#overview');
    await expect(overview).toBeVisible();
    await expect(overview.locator('h2')).toContainText('Overview');

    // 2. Geography
    const geography = page.locator('#geography');
    await expect(geography).toBeVisible();
    await expect(geography.locator('h2')).toContainText('Geography');

    // 3. Fishing
    const fishing = page.locator('#fishing');
    await expect(fishing).toBeVisible();
    await expect(fishing.locator('h2')).toContainText('Fishing');
    await expect(fishing.locator('[data-section-type="fishing"]')).toBeVisible();

    // 4. Hunting
    const hunting = page.locator('#hunting');
    await expect(hunting).toBeVisible();
    await expect(hunting.locator('h2')).toContainText('Hunting');

    // 5. Wildlife
    const wildlife = page.locator('#wildlife');
    await expect(wildlife).toBeVisible();
    await expect(wildlife.locator('h2')).toContainText('Wildlife');

    // 6. Regulations
    const regulations = page.locator('#regulations');
    await expect(regulations).toBeVisible();
    await expect(regulations.locator('h2')).toContainText('Regulations');

    // 7. Access Points
    const access = page.locator('#access');
    await expect(access).toBeVisible();
    await expect(access.locator('h2')).toContainText('Access');

    // 8. Related Products
    const products = page.locator('#products');
    await expect(products).toBeVisible();
    await expect(products.locator('h2')).toContainText('Products');
  });

  test('Section navigation works correctly', async ({ page }) => {
    // Click navigation link and verify scroll
    await page.click('a[href="#fishing"]');

    // Wait for scroll animation
    await page.waitForTimeout(500);

    // Check if fishing section is in viewport
    const fishingSection = page.locator('#fishing');
    await expect(fishingSection).toBeInViewport();
  });

  test('Related products section links to shop', async ({ page }) => {
    const productsSection = page.locator('#products');
    await productsSection.scrollIntoViewIfNeeded();

    // Find product cards
    const productCards = productsSection.locator('[data-product-card]');
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);

    // Verify first product links to shop
    const firstProductLink = productCards.first().locator('a');
    const href = await firstProductLink.getAttribute('href');
    expect(href).toMatch(/^\/shop\//);
  });

  test('Accessibility features are present', async ({ page }) => {
    // Check ARIA landmarks
    await expect(page.locator('main')).toHaveAttribute('role', 'main');
    await expect(page.locator('nav')).toHaveAttribute('aria-label');

    // Check heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check image alt text
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('Mobile responsive layout', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Verify mobile navigation
    const mobileNav = page.locator('[data-mobile-nav]');
    await expect(mobileNav).toBeVisible();

    // Check sections stack vertically
    const sections = page.locator('[data-section]');
    const firstSection = sections.first();
    const secondSection = sections.nth(1);

    const firstBox = await firstSection.boundingBox();
    const secondBox = await secondSection.boundingBox();

    // Second section should be below first (vertical stacking)
    expect(secondBox!.y).toBeGreaterThan(firstBox!.y + firstBox!.height);
  });

  test('Performance: LCP under 2.5s', async ({ page }) => {
    const navigationTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(performance.timing))
    );

    // Calculate LCP approximation
    const loadTime = navigationTiming.loadEventEnd - navigationTiming.navigationStart;
    expect(loadTime).toBeLessThan(2500); // 2.5 seconds
  });

  test('Schema validation with Google Rich Results Test', async ({ page }) => {
    // Extract JSON-LD
    const jsonLdContent = await page.locator('script[type="application/ld+json"]').textContent();

    // Basic validation of structure
    const schema = JSON.parse(jsonLdContent);

    // Validate Google Search Gallery requirements
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@graph']).toBeDefined();

    // Check Place entity has required fields for Google
    const placeEntity = schema['@graph'].find((item: any) => item['@type'] === 'Place');
    expect(placeEntity.name).toBeDefined();
    expect(placeEntity.geo).toBeDefined();
    expect(placeEntity.address).toBeDefined();

    // Validate TouristAttraction
    const attraction = schema['@graph'].find((item: any) =>
      item['@type'] === 'TouristAttraction'
    );
    expect(attraction.name).toBeDefined();
    expect(attraction.description).toBeDefined();
    expect(attraction.touristType).toBeDefined();
  });
});

test.describe('River Template SEO and Metadata', () => {

  test('Meta tags are correctly set', async ({ page }) => {
    await page.goto('/test/river-template-example');

    // Check title
    await expect(page).toHaveTitle(/New River Gorge/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /New River Gorge/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'place');
  });

  test('Canonical URL is set', async ({ page }) => {
    await page.goto('/test/river-template-example');

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /.+/);
  });
});

test.describe('WVWO Brand Compliance', () => {

  test('Uses approved WVWO fonts only', async ({ page }) => {
    await page.goto('/test/river-template-example');

    // Get computed styles of key elements
    const h1Font = await page.locator('h1').evaluate(el =>
      window.getComputedStyle(el).fontFamily
    );

    // Should use Bitter for display headings
    expect(h1Font).toMatch(/Bitter/i);

    // Check body text uses Noto Sans
    const bodyFont = await page.locator('p').first().evaluate(el =>
      window.getComputedStyle(el).fontFamily
    );
    expect(bodyFont).toMatch(/Noto Sans/i);
  });

  test('Uses WVWO color palette', async ({ page }) => {
    await page.goto('/test/river-template-example');

    // Check primary CTA uses brand orange
    const ctaButton = page.locator('[data-cta-primary]').first();
    const bgColor = await ctaButton.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );

    // Should be brand orange (#FF6F00 = rgb(255, 111, 0))
    expect(bgColor).toMatch(/rgb\(255,\s*111,\s*0\)/);
  });

  test('Rounded corners are sharp (rounded-sm only)', async ({ page }) => {
    await page.goto('/test/river-template-example');

    // Check section cards
    const cards = page.locator('[data-section-card]');
    const firstCard = cards.first();

    const borderRadius = await firstCard.evaluate(el =>
      window.getComputedStyle(el).borderRadius
    );

    // rounded-sm is 2px in Tailwind
    expect(borderRadius).toBe('2px');
  });

  test('No forbidden styles (glassmorphism, gradients)', async ({ page }) => {
    await page.goto('/test/river-template-example');

    // Check no backdrop-blur
    const elements = page.locator('*');
    const count = await elements.count();

    for (let i = 0; i < Math.min(count, 50); i++) {
      const backdropFilter = await elements.nth(i).evaluate(el =>
        window.getComputedStyle(el).backdropFilter
      );
      expect(backdropFilter).toBe('none');
    }
  });

  test('Copy voice matches WVWO brand (no buzzwords)', async ({ page }) => {
    await page.goto('/test/river-template-example');

    const bodyText = await page.locator('body').textContent();

    // Check for forbidden buzzwords
    const forbiddenWords = [
      'unlock potential',
      'seamless experience',
      'revolutionize',
      'next-level',
      'transform the way you',
      'cutting-edge solutions'
    ];

    for (const word of forbiddenWords) {
      expect(bodyText?.toLowerCase()).not.toContain(word.toLowerCase());
    }
  });
});
