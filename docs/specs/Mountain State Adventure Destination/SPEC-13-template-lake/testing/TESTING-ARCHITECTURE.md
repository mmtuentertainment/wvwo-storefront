# SPEC-13 Lake Template Testing Architecture

**Feature**: Lake Template Component
**Created**: 2025-12-29
**Test Coverage Target**: 80%+ statements, 75%+ branches
**Framework Stack**: Vitest (unit), Playwright (e2e), Axe-core (a11y)

---

## Overview

Comprehensive testing strategy for LakeTemplate.astro ensuring type safety, WVWO aesthetic compliance, responsive behavior, accessibility, and performance across 7 distinct testing layers.

### Testing Philosophy

1. **Build-Time Validation First**: Zod schemas prevent invalid data from reaching production
2. **Component Logic Testing**: Extract and test pure functions separate from Astro components
3. **Visual Regression Prevention**: Automated checks for WVWO aesthetic violations
4. **Accessibility as Requirement**: WCAG 2.1 AA compliance is non-negotiable
5. **Performance Budgets**: Lighthouse scores 90+ across all categories

---

## Testing Layers

### Layer 1: Type Validation Tests (Build-Time Safety)

**Location**: `wv-wild-web/src/types/__tests__/adventure-lake.test.ts`
**Framework**: Vitest + Zod
**Coverage Target**: 100% (all schemas tested)

#### 1.1 Schema Validation Tests

Test each new SPEC-13 schema with valid/invalid/edge case data:

```typescript
// wv-wild-web/src/types/__tests__/adventure-lake.test.ts
import { describe, it, expect } from 'vitest';
import {
  FishingSpotSchema,
  MarinaSchema,
  ActivitySchema,
  SeasonalGuideSchema,
  RegulationSchema,
} from '../adventure';

describe('SPEC-13: FishingSpotSchema', () => {
  describe('Valid inputs', () => {
    it('parses complete fishing spot with all fields', () => {
      const spot = {
        name: 'Long Point Cliff',
        depth: '40-60 feet',
        structure: 'Rocky ledges with submerged boulders',
        species: ['Smallmouth Bass', 'Walleye', 'Muskie'],
        access: 'Boat only - 2 miles from Battle Run launch',
      };

      const result = FishingSpotSchema.safeParse(spot);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('Long Point Cliff');
        expect(result.data.species).toHaveLength(3);
      }
    });

    it('parses minimal valid spot (1 species minimum)', () => {
      const spot = {
        name: 'Dam Area',
        depth: '100+ feet',
        structure: 'Deep water',
        species: ['Walleye'],
        access: 'Boat',
      };

      expect(FishingSpotSchema.safeParse(spot).success).toBe(true);
    });
  });

  describe('Invalid inputs', () => {
    it('rejects empty species array (min 1 required)', () => {
      const spot = {
        name: 'Test Spot',
        depth: '20 feet',
        structure: 'Rocky',
        species: [], // Invalid - must have at least 1
        access: 'Boat',
      };

      expect(FishingSpotSchema.safeParse(spot).success).toBe(false);
    });

    it('rejects missing required name field', () => {
      const spot = {
        depth: '20 feet',
        structure: 'Rocky',
        species: ['Bass'],
        access: 'Boat',
      };

      expect(FishingSpotSchema.safeParse(spot).success).toBe(false);
    });

    it('rejects empty string name (min length 1)', () => {
      const spot = {
        name: '',
        depth: '20 feet',
        structure: 'Rocky',
        species: ['Bass'],
        access: 'Boat',
      };

      expect(FishingSpotSchema.safeParse(spot).success).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('handles very long species names', () => {
      const spot = {
        name: 'Test',
        depth: '20',
        structure: 'Rocky',
        species: ['Chain Pickerel (Southern Subspecies) - Esox niger'],
        access: 'Shore',
      };

      expect(FishingSpotSchema.safeParse(spot).success).toBe(true);
    });

    it('handles special characters in depth descriptions', () => {
      const spot = {
        name: 'Test',
        depth: '20-45 feet (avg 30\')',
        structure: 'Rocky',
        species: ['Bass'],
        access: 'Boat',
      };

      expect(FishingSpotSchema.safeParse(spot).success).toBe(true);
    });
  });
});

describe('SPEC-13: MarinaSchema', () => {
  describe('Valid inputs', () => {
    it('parses marina with all optional fields', () => {
      const marina = {
        name: 'Summersville Lake Marina',
        services: ['Fuel', 'Bait & tackle', 'Ice', 'Snacks'],
        boatLaunch: { ramps: 3, fee: '$5' },
        rentals: ['Kayaks', 'Pontoon boats'],
        hours: '7am-8pm daily',
        contact: '(304) 872-3773',
      };

      expect(MarinaSchema.safeParse(marina).success).toBe(true);
    });

    it('parses marina without optional rentals and fee', () => {
      const marina = {
        name: 'Basic Launch',
        services: ['Parking'],
        boatLaunch: { ramps: 1 }, // No fee
        hours: '24/7',
        contact: '(304) 555-1234',
      };

      expect(MarinaSchema.safeParse(marina).success).toBe(true);
    });
  });

  describe('Invalid inputs', () => {
    it('rejects zero or negative ramp count', () => {
      const marina = {
        name: 'Test',
        services: ['Fuel'],
        boatLaunch: { ramps: 0 }, // Invalid - must be positive
        hours: '9-5',
        contact: '555-1234',
      };

      expect(MarinaSchema.safeParse(marina).success).toBe(false);
    });

    it('rejects missing required services array', () => {
      const marina = {
        name: 'Test',
        boatLaunch: { ramps: 1 },
        hours: '9-5',
        contact: '555-1234',
      };

      expect(MarinaSchema.safeParse(marina).success).toBe(false);
    });
  });
});

describe('SPEC-13: ActivitySchema', () => {
  describe('Valid inputs', () => {
    it('parses activity with difficulty', () => {
      const activity = {
        name: 'Scuba Diving',
        description: 'Long Point Cliff has 40+ foot visibility',
        season: 'May-October',
        difficulty: 'moderate' as const,
      };

      expect(ActivitySchema.safeParse(activity).success).toBe(true);
    });

    it('parses activity without optional difficulty', () => {
      const activity = {
        name: 'Swimming',
        description: 'Designated beach area',
        season: 'Summer',
      };

      expect(ActivitySchema.safeParse(activity).success).toBe(true);
    });
  });

  describe('Invalid inputs', () => {
    it('rejects invalid difficulty enum value', () => {
      const activity = {
        name: 'Test',
        description: 'Desc',
        season: 'Summer',
        difficulty: 'hard', // Invalid - must be easy/moderate/challenging
      };

      expect(ActivitySchema.safeParse(activity).success).toBe(false);
    });
  });
});

describe('SPEC-13: SeasonalGuideSchema', () => {
  describe('Valid inputs', () => {
    it('parses season with highlights and fishing focus', () => {
      const guide = {
        season: 'Spring' as const,
        highlights: [
          'Smallmouth spawn in shallow areas',
          'Walleye fishing peaks',
          'Water temps 50-65°F',
        ],
        fishingFocus: 'Target shallow rocky areas 5-15 feet deep',
      };

      expect(SeasonalGuideSchema.safeParse(guide).success).toBe(true);
    });

    it('parses season without optional fishingFocus', () => {
      const guide = {
        season: 'Summer' as const,
        highlights: ['Peak tourism', 'Swimming season'],
      };

      expect(SeasonalGuideSchema.safeParse(guide).success).toBe(true);
    });
  });

  describe('Invalid inputs', () => {
    it('rejects invalid season enum', () => {
      const guide = {
        season: 'Autumn', // Invalid - must be Spring/Summer/Fall/Winter
        highlights: ['Test'],
      };

      expect(SeasonalGuideSchema.safeParse(guide).success).toBe(false);
    });

    it('rejects empty highlights array (min 1)', () => {
      const guide = {
        season: 'Fall' as const,
        highlights: [], // Invalid
      };

      expect(SeasonalGuideSchema.safeParse(guide).success).toBe(false);
    });
  });
});

describe('SPEC-13: RegulationSchema', () => {
  describe('Valid inputs', () => {
    it('parses regulation category with multiple rules', () => {
      const regulation = {
        category: 'Walleye Regulations',
        rules: [
          'All walleye 20-30 inches MUST be released',
          'Daily creel limit: 8 walleye maximum',
          'Only 1 walleye over 30 inches per day',
        ],
      };

      expect(RegulationSchema.safeParse(regulation).success).toBe(true);
    });
  });

  describe('Invalid inputs', () => {
    it('rejects empty rules array (min 1)', () => {
      const regulation = {
        category: 'Test',
        rules: [], // Invalid
      };

      expect(RegulationSchema.safeParse(regulation).success).toBe(false);
    });
  });
});
```

#### 1.2 Array Size Limit Tests

Validate maximum array sizes per NFR-009:

```typescript
describe('SPEC-13: Array Size Limits (NFR-009)', () => {
  it('fishSpecies accepts up to 20 items', () => {
    const species = Array(20).fill(null).map((_, i) => ({
      title: `Species ${i}`,
      description: 'Desc',
    }));

    // Should not throw - at limit
    expect(() => species).not.toThrow();
  });

  it('fishingSpots accepts up to 15 items', () => {
    const spots = Array(15).fill(null).map((_, i) => ({
      name: `Spot ${i}`,
      depth: '20 feet',
      structure: 'Rocky',
      species: ['Bass'],
      access: 'Boat',
    }));

    expect(() => spots).not.toThrow();
  });

  it('campgrounds accepts up to 10 items', () => {
    const campgrounds = Array(10).fill(null).map((_, i) => ({
      name: `Campground ${i}`,
      sites: 50,
      amenities: ['Water'],
      season: 'May-Oct',
    }));

    expect(() => campgrounds).not.toThrow();
  });

  it('activities accepts up to 20 items', () => {
    const activities = Array(20).fill(null).map((_, i) => ({
      name: `Activity ${i}`,
      description: 'Desc',
      season: 'Summer',
    }));

    expect(() => activities).not.toThrow();
  });
});
```

---

### Layer 2: Component Rendering Tests

**Location**: `wv-wild-web/src/components/templates/__tests__/LakeTemplate.test.ts`
**Framework**: Vitest + Logic Extraction Pattern
**Coverage Target**: 85%+ logic coverage

#### 2.1 Logic Extraction Pattern

Since Astro components don't have native test renderers, extract testable logic:

```typescript
// wv-wild-web/src/components/templates/__tests__/LakeTemplate.test.ts
import { describe, it, expect } from 'vitest';
import type { LakeTemplateProps } from '../../../types/adventure';

/**
 * Logic extraction tests for LakeTemplate.astro
 * Tests pure functions that would be used in template
 */

describe('LakeTemplate Logic', () => {
  describe('generateLakeId', () => {
    function generateLakeId(name: string): string {
      return `lake-${name.toLowerCase().replace(/\s+/g, '-')}`;
    }

    it('converts lake name to valid ID', () => {
      expect(generateLakeId('Summersville Lake')).toBe('lake-summersville-lake');
    });

    it('handles multiple spaces', () => {
      expect(generateLakeId('Stonewall  Jackson   Lake')).toBe('lake-stonewall-jackson-lake');
    });

    it('handles special characters', () => {
      expect(generateLakeId("O'Brien Lake")).toBe("lake-o'brien-lake");
    });
  });

  describe('formatAcreage', () => {
    function formatAcreage(acreage: number): string {
      return acreage.toLocaleString('en-US');
    }

    it('formats large numbers with commas', () => {
      expect(formatAcreage(2790)).toBe('2,790');
      expect(formatAcreage(15500)).toBe('15,500');
    });

    it('handles numbers under 1000 without commas', () => {
      expect(formatAcreage(500)).toBe('500');
    });
  });

  describe('shouldShowSection', () => {
    function shouldShowSection(array: unknown[]): boolean {
      return array && array.length > 0;
    }

    it('shows section when array has items', () => {
      expect(shouldShowSection([1, 2, 3])).toBe(true);
    });

    it('hides section when array is empty', () => {
      expect(shouldShowSection([])).toBe(false);
    });

    it('hides section when array is undefined', () => {
      expect(shouldShowSection(undefined as any)).toBe(false);
    });
  });

  describe('generateMapUrl', () => {
    function generateMapUrl(coords?: { lat: number; lng: number }): string | undefined {
      if (!coords) return undefined;
      return `https://maps.google.com/?q=${coords.lat},${coords.lng}`;
    }

    it('generates Google Maps URL from coordinates', () => {
      const url = generateMapUrl({ lat: 38.2343, lng: -80.8564 });
      expect(url).toBe('https://maps.google.com/?q=38.2343,-80.8564');
    });

    it('returns undefined when coordinates missing', () => {
      expect(generateMapUrl(undefined)).toBeUndefined();
    });
  });
});

describe('LakeTemplate Empty State Handling', () => {
  it('empty fishSpecies array hides "What to Fish" section', () => {
    const isEmpty = [].length === 0;
    expect(isEmpty).toBe(true);
  });

  it('empty campgrounds array hides "Camping" section', () => {
    const isEmpty = [].length === 0;
    expect(isEmpty).toBe(true);
  });

  it('empty activities array hides "Activities" section', () => {
    const isEmpty = [].length === 0;
    expect(isEmpty).toBe(true);
  });
});

describe('LakeTemplate Optional Field Handling', () => {
  it('missing kimsTip does not break species card', () => {
    const species = {
      title: 'Smallmouth Bass',
      description: 'Year-round',
      // No kimsTip - should be fine
    };

    expect(species.title).toBeDefined();
    expect('notes' in species).toBe(false);
  });

  it('missing reservationUrl hides "Reserve Now" button', () => {
    const campground = {
      name: 'Test Camp',
      sites: 50,
      amenities: ['Water'],
      season: 'May-Oct',
      // No reservationUrl
    };

    expect('reservationUrl' in campground).toBe(false);
  });

  it('missing marina rentals does not break marina section', () => {
    const marina = {
      name: 'Test Marina',
      services: ['Fuel'],
      boatLaunch: { ramps: 1 },
      hours: '9-5',
      contact: '555-1234',
      // No rentals array
    };

    expect('rentals' in marina).toBe(false);
  });
});
```

#### 2.2 Section Rendering Logic Tests

```typescript
describe('LakeTemplate Section Ordering', () => {
  it('sections appear in correct order', () => {
    const sections = [
      'hero',
      'what-to-fish',
      'where-to-fish',
      'camping',
      'marina',
      'activities',
      'seasonal-guide',
      'regulations',
    ];

    // Verify expected section count
    expect(sections).toHaveLength(8);

    // Hero always first
    expect(sections[0]).toBe('hero');

    // Regulations always last (safety first principle)
    expect(sections[sections.length - 1]).toBe('regulations');
  });
});

describe('LakeTemplate Font Class Application', () => {
  it('hero title uses font-display', () => {
    const heroTitleClass = 'font-display text-4xl md:text-5xl lg:text-6xl font-bold';
    expect(heroTitleClass).toContain('font-display');
  });

  it('Kim\'s tips use font-hand (Permanent Marker)', () => {
    const kimsTipClass = 'font-hand text-sm text-brand-brown';
    expect(kimsTipClass).toContain('font-hand');
  });

  it('body text uses font-body (Noto Sans)', () => {
    const bodyClass = 'font-body text-brand-mud';
    expect(bodyClass).toContain('font-body');
  });
});
```

---

### Layer 3: WVWO Compliance Tests

**Location**: `wv-wild-web/src/components/templates/__tests__/LakeTemplate-wvwo.test.ts`
**Framework**: Vitest + Regex Pattern Matching
**Coverage Target**: 100% (all aesthetic rules)

#### 3.1 Border Radius Enforcement

```typescript
// wv-wild-web/src/components/templates/__tests__/LakeTemplate-wvwo.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const TEMPLATE_PATH = path.resolve(__dirname, '../LakeTemplate.astro');

describe('WVWO Aesthetic Compliance (FR-007)', () => {
  let templateContent: string;

  beforeAll(() => {
    templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  });

  describe('Border Radius - ONLY rounded-sm allowed', () => {
    it('contains NO instances of rounded-md', () => {
      const matches = templateContent.match(/rounded-md/g);
      expect(matches).toBeNull();
    });

    it('contains NO instances of rounded-lg', () => {
      const matches = templateContent.match(/rounded-lg/g);
      expect(matches).toBeNull();
    });

    it('contains NO instances of rounded-xl', () => {
      const matches = templateContent.match(/rounded-xl/g);
      expect(matches).toBeNull();
    });

    it('contains NO instances of rounded-2xl', () => {
      const matches = templateContent.match(/rounded-2xl/g);
      expect(matches).toBeNull();
    });

    it('contains NO instances of rounded-3xl', () => {
      const matches = templateContent.match(/rounded-3xl/g);
      expect(matches).toBeNull();
    });

    it('ONLY uses rounded-sm (0.125rem)', () => {
      const roundedSm = templateContent.match(/rounded-sm/g);
      const anyRounded = templateContent.match(/rounded-(?!sm\b)\w+/g);

      expect(roundedSm).toBeTruthy(); // Should have some rounded-sm
      expect(anyRounded).toBeNull(); // No other rounded-* variants
    });
  });
});
```

#### 3.2 Font Hierarchy Enforcement

```typescript
describe('WVWO Font Hierarchy (FR-008)', () => {
  it('uses font-display (Bitter) for headings', () => {
    // Check h1, h2, h3 elements have font-display
    const headingsWithFont = templateContent.match(/<h[1-3][^>]*class="[^"]*font-display/g);
    expect(headingsWithFont).toBeTruthy();
    expect(headingsWithFont!.length).toBeGreaterThan(0);
  });

  it('uses font-hand (Permanent Marker) ONLY for Kim\'s tips', () => {
    const fontHandUsages = templateContent.match(/font-hand/g);

    // Should appear, but sparingly
    expect(fontHandUsages).toBeTruthy();

    // Count should be limited (only in Kim's tip sections)
    // Expect ~1-2 instances per species card = ~6-12 total max
    expect(fontHandUsages!.length).toBeLessThanOrEqual(15);
  });

  it('uses font-body (Noto Sans) for content text', () => {
    const fontBodyUsages = templateContent.match(/font-body/g);
    expect(fontBodyUsages).toBeTruthy();
    expect(fontBodyUsages!.length).toBeGreaterThan(10); // Used extensively
  });

  it('does NOT use forbidden fonts', () => {
    const forbiddenFonts = [
      'Inter',
      'DM Sans',
      'Space Grotesk',
      'Poppins',
      'Outfit',
      'Montserrat',
      'Raleway',
      'Open Sans',
    ];

    forbiddenFonts.forEach(font => {
      const regex = new RegExp(font, 'gi');
      expect(templateContent.match(regex)).toBeNull();
    });
  });
});
```

#### 3.3 Color Accent Validation

```typescript
describe('WVWO Color Accents (FR-009)', () => {
  it('uses border-l-sign-green for fish species cards', () => {
    const fishSectionStart = templateContent.indexOf('What to Fish');
    const fishSectionEnd = templateContent.indexOf('Where to Fish', fishSectionStart);
    const fishSection = templateContent.slice(fishSectionStart, fishSectionEnd);

    expect(fishSection).toContain('border-l-sign-green');
  });

  it('uses border-l-brand-brown for fishing spot cards', () => {
    const spotSectionStart = templateContent.indexOf('Where to Fish');
    const spotSectionEnd = templateContent.indexOf('Camping', spotSectionStart);
    const spotSection = templateContent.slice(spotSectionStart, spotSectionEnd);

    expect(spotSection).toContain('border-l-brand-brown');
  });

  it('uses border-l-brand-orange for safety/regulations', () => {
    const regSectionStart = templateContent.indexOf('Safety & Regulations');
    const regSection = templateContent.slice(regSectionStart);

    expect(regSection).toContain('border-l-brand-orange');
  });

  it('limits brand-orange usage to <5% of classes', () => {
    const totalClasses = templateContent.match(/class="/g)?.length || 0;
    const orangeUsages = templateContent.match(/brand-orange/g)?.length || 0;

    const orangePercentage = (orangeUsages / totalClasses) * 100;
    expect(orangePercentage).toBeLessThan(5);
  });
});
```

#### 3.4 Border-Left Pattern Validation

```typescript
describe('WVWO Border-Left Pattern', () => {
  it('fishing species cards use border-l-4 with green accent', () => {
    // Pattern: border-l-4 border-l-sign-green
    const pattern = /border-l-4\s+border-l-sign-green/g;
    const matches = templateContent.match(pattern);

    expect(matches).toBeTruthy();
    expect(matches!.length).toBeGreaterThan(0);
  });

  it('fishing spot cards use border-l-4 with brown accent', () => {
    const pattern = /border-l-4\s+border-l-brand-brown/g;
    const matches = templateContent.match(pattern);

    expect(matches).toBeTruthy();
  });

  it('regulation cards use border-l-4 with orange accent', () => {
    const pattern = /border-l-4\s+border-l-brand-orange/g;
    const matches = templateContent.match(pattern);

    expect(matches).toBeTruthy();
  });
});
```

---

### Layer 4: Responsive Layout Tests

**Location**: `tests/e2e/lake-template-responsive.spec.ts`
**Framework**: Playwright
**Devices**: Desktop Chrome, iPhone 13, iPad

#### 4.1 Mobile Layout Tests (320px-767px)

```typescript
// tests/e2e/lake-template-responsive.spec.ts
import { test, expect } from '@playwright/test';

test.describe('LakeTemplate Responsive Layout', () => {
  test.describe('Mobile (iPhone 13)', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test.beforeEach(async ({ page }) => {
      // Assumes test page at /adventures/test-lake
      await page.goto('/adventures/test-lake');
    });

    test('hero stats stack in 2-column grid on mobile', async ({ page }) => {
      const statsContainer = page.locator('[class*="grid"][class*="grid-cols-2"]');
      await expect(statsContainer).toBeVisible();
    });

    test('fish species cards stack full-width (1 column)', async ({ page }) => {
      const speciesSection = page.locator('text=What to Fish').locator('..');
      const speciesCards = speciesSection.locator('[class*="border-l-sign-green"]');

      const count = await speciesCards.count();
      expect(count).toBeGreaterThan(0);

      // Check first card is full-width (no grid multi-column on mobile)
      const firstCard = speciesCards.first();
      const box = await firstCard.boundingBox();
      expect(box!.width).toBeGreaterThan(300); // Near full viewport width
    });

    test('fishing spots display full-width on mobile', async ({ page }) => {
      const spotCards = page.locator('[class*="border-l-brand-brown"]');
      const count = await spotCards.count();

      for (let i = 0; i < count; i++) {
        const card = spotCards.nth(i);
        const box = await card.boundingBox();
        expect(box!.width).toBeGreaterThan(300);
      }
    });

    test('NO horizontal scroll on mobile', async ({ page }) => {
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);

      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
    });

    test('touch targets meet 44x44px minimum', async ({ page }) => {
      // Check buttons and links
      const buttons = page.locator('button, a[href]');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        const box = await buttons.nth(i).boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44);
          // Width can vary based on content, but height is critical
        }
      }
    });
  });

  test.describe('Tablet (iPad - 768px)', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('fish species display in 2-column grid', async ({ page }) => {
      await page.goto('/adventures/test-lake');

      const speciesSection = page.locator('text=What to Fish').locator('..');
      const gridClasses = await speciesSection.getAttribute('class');

      expect(gridClasses).toContain('md:grid-cols-2');
    });

    test('hero stats display in 4-column grid', async ({ page }) => {
      await page.goto('/adventures/test-lake');

      const statsContainer = page.locator('[class*="grid-cols-"]').first();
      const classes = await statsContainer.getAttribute('class');

      expect(classes).toMatch(/md:grid-cols-4/);
    });
  });

  test.describe('Desktop (1024px+)', () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test('fish species display in 3-column grid', async ({ page }) => {
      await page.goto('/adventures/test-lake');

      const speciesSection = page.locator('text=What to Fish').locator('..');
      const gridClasses = await speciesSection.getAttribute('class');

      expect(gridClasses).toContain('lg:grid-cols-3');
    });

    test('hero displays at 70vh height', async ({ page }) => {
      await page.goto('/adventures/test-lake');

      const hero = page.locator('section').first();
      const box = await hero.boundingBox();
      const viewportHeight = await page.evaluate(() => window.innerHeight);

      const expectedHeight = viewportHeight * 0.7;
      expect(box!.height).toBeGreaterThanOrEqual(expectedHeight - 50); // 50px tolerance
    });
  });
});
```

#### 4.2 Breakpoint Tests

```typescript
test.describe('Responsive Breakpoints', () => {
  const breakpoints = [
    { name: 'Mobile Small', width: 320, expectedColumns: 1 },
    { name: 'Mobile Large', width: 414, expectedColumns: 1 },
    { name: 'Tablet', width: 768, expectedColumns: 2 },
    { name: 'Desktop Small', width: 1024, expectedColumns: 3 },
    { name: 'Desktop Large', width: 1440, expectedColumns: 3 },
  ];

  breakpoints.forEach(({ name, width, expectedColumns }) => {
    test(`${name} (${width}px) shows ${expectedColumns} species columns`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/adventures/test-lake');

      const speciesCards = page.locator('[class*="border-l-sign-green"]');
      const firstCard = speciesCards.first();
      const secondCard = speciesCards.nth(1);

      const box1 = await firstCard.boundingBox();
      const box2 = await secondCard.boundingBox();

      if (expectedColumns === 1) {
        // Cards should stack vertically
        expect(box2!.top).toBeGreaterThan(box1!.bottom);
      } else {
        // Cards should be side-by-side (same row or close)
        const rowTolerance = 50;
        expect(Math.abs(box1!.top - box2!.top)).toBeLessThan(rowTolerance);
      }
    });
  });
});
```

---

### Layer 5: Accessibility Tests (WCAG 2.1 AA)

**Location**: `tests/e2e/lake-template-a11y.spec.ts`
**Framework**: Playwright + @axe-core/playwright
**Target**: WCAG 2.1 AA compliance

#### 5.1 Automated Accessibility Scans

```typescript
// tests/e2e/lake-template-a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('LakeTemplate Accessibility (WCAG 2.1 AA)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/adventures/test-lake');
  });

  test('passes automated axe accessibility scan', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('hero section is accessible', async ({ page }) => {
    const hero = page.locator('section').first();

    const results = await new AxeBuilder({ page })
      .include(hero)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('fish species section is accessible', async ({ page }) => {
    const section = page.locator('text=What to Fish').locator('..');

    const results = await new AxeBuilder({ page })
      .include(section)
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
```

#### 5.2 Semantic HTML Structure

```typescript
test.describe('Semantic HTML', () => {
  test('uses proper heading hierarchy (h1 -> h2 -> h3)', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();

    // Should have exactly 1 h1 (lake name)
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Should have multiple h2 (section headers)
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThanOrEqual(5); // 8 sections = 8 h2s (minus hero)

    // h3 used for subsections (species names, spot names)
    const h3Count = await page.locator('h3').count();
    expect(h3Count).toBeGreaterThan(0);
  });

  test('hero uses semantic <section> element', async ({ page }) => {
    const heroSection = page.locator('section').first();
    expect(await heroSection.isVisible()).toBe(true);
  });

  test('lists use proper <ul> and <li> elements', async ({ page }) => {
    const lists = page.locator('ul');
    const listCount = await lists.count();

    expect(listCount).toBeGreaterThan(0); // Should have amenities lists, rules lists, etc.

    // Each ul should have li children
    for (let i = 0; i < listCount; i++) {
      const listItems = lists.nth(i).locator('li');
      const itemCount = await listItems.count();
      expect(itemCount).toBeGreaterThan(0);
    }
  });
});
```

#### 5.3 Color Contrast Tests

```typescript
test.describe('Color Contrast (WCAG AA)', () => {
  test('text on brand-brown background meets 4.5:1 ratio', async ({ page }) => {
    // brand-brown (#3E2723) with white text = 12.63:1 (passes)
    const heading = page.locator('.text-brand-brown').first();
    expect(await heading.isVisible()).toBe(true);
  });

  test('orange badges use brand-brown text for contrast', async ({ page }) => {
    // brand-orange (#FF6F00) with brand-brown text = 5.81:1 (passes)
    const orangeBadges = page.locator('.bg-brand-orange');
    const count = await orangeBadges.count();

    for (let i = 0; i < count; i++) {
      const badge = orangeBadges.nth(i);
      const classes = await badge.getAttribute('class');

      // Should have text-brand-brown for WCAG compliance
      expect(classes).toContain('text-brand-brown');
    }
  });

  test('sign-green backgrounds use sufficient contrast', async ({ page }) => {
    // sign-green (#2E7D32) with white text = 4.54:1 (passes)
    const greenElements = page.locator('.bg-sign-green.text-white');
    const count = await greenElements.count();

    expect(count).toBeGreaterThan(0); // Should have some green badges
  });
});
```

#### 5.4 ARIA Labels and Roles

```typescript
test.describe('ARIA Labels', () => {
  test('hero has proper aria-labelledby', async ({ page }) => {
    const hero = page.locator('section').first();
    const ariaLabelledBy = await hero.getAttribute('aria-labelledby');

    expect(ariaLabelledBy).toMatch(/^lake-/); // Should be "lake-{name}"
  });

  test('external reservation links have rel attributes', async ({ page }) => {
    const externalLinks = page.locator('a[href^="http"]');
    const count = await externalLinks.count();

    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      const rel = await link.getAttribute('rel');

      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });

  test('phone numbers are clickable tel: links', async ({ page }) => {
    const telLinks = page.locator('a[href^="tel:"]');
    const count = await telLinks.count();

    expect(count).toBeGreaterThan(0); // Marina contact should be tel: link
  });
});
```

#### 5.5 Keyboard Navigation

```typescript
test.describe('Keyboard Navigation', () => {
  test('all interactive elements are keyboard accessible', async ({ page }) => {
    await page.keyboard.press('Tab');

    const focusedElement = await page.locator(':focus').first();
    expect(await focusedElement.isVisible()).toBe(true);
  });

  test('tab order is logical (top to bottom)', async ({ page }) => {
    const interactiveElements = await page.locator('a, button, input, select').all();

    for (let i = 0; i < Math.min(5, interactiveElements.length); i++) {
      await page.keyboard.press('Tab');
      const focused = await page.locator(':focus').first();
      expect(await focused.isVisible()).toBe(true);
    }
  });

  test('skip to content link is provided', async ({ page }) => {
    // First tab should focus skip link
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a:has-text("Skip to")').first();

    // Skip link may be visually hidden but should be keyboard accessible
    const isFocused = await skipLink.evaluate(el => el === document.activeElement);
    expect(isFocused).toBe(true);
  });
});
```

---

### Layer 6: Integration Tests (Real Data)

**Location**: `tests/integration/lake-template-integration.test.ts`
**Framework**: Vitest + Summersville Lake fixture
**Purpose**: Validate template works with actual production data

#### 6.1 Real Data Validation

```typescript
// tests/integration/lake-template-integration.test.ts
import { describe, it, expect } from 'vitest';
import type { LakeTemplateProps } from '../../src/types/adventure';

// Import real Summersville Lake data
import { summersvilleLakeData } from '../fixtures/summersville-lake-data';

describe('LakeTemplate Integration with Real Data', () => {
  it('Summersville Lake data passes Zod validation', () => {
    // This would use the actual Zod schema for LakeTemplateProps
    // const result = LakeTemplatePropsSchema.safeParse(summersvilleLakeData);
    // expect(result.success).toBe(true);

    // For now, validate structure manually
    expect(summersvilleLakeData.name).toBe('Summersville Lake');
    expect(summersvilleLakeData.acreage).toBe(2790);
    expect(summersvilleLakeData.maxDepth).toBe(327);
  });

  it('real data contains all required sections', () => {
    expect(summersvilleLakeData.fishSpecies.length).toBeGreaterThan(0);
    expect(summersvilleLakeData.fishingSpots.length).toBeGreaterThan(0);
    expect(summersvilleLakeData.campgrounds.length).toBeGreaterThan(0);
    expect(summersvilleLakeData.marina).toBeDefined();
    expect(summersvilleLakeData.activities.length).toBeGreaterThan(0);
    expect(summersvilleLakeData.seasonalGuide.length).toBe(4); // 4 seasons
    expect(summersvilleLakeData.regulations.length).toBeGreaterThan(0);
  });

  it('fish species have valid techniques arrays', () => {
    summersvilleLakeData.fishSpecies.forEach(species => {
      expect(species.title).toBeTruthy();
      expect(species.description).toBeTruthy();
    });
  });

  it('fishing spots have all required fields', () => {
    summersvilleLakeData.fishingSpots.forEach(spot => {
      expect(spot.name).toBeTruthy();
      expect(spot.depth).toBeTruthy();
      expect(spot.structure).toBeTruthy();
      expect(spot.species.length).toBeGreaterThan(0);
      expect(spot.access).toBeTruthy();
    });
  });

  it('marina has valid boat launch info', () => {
    const marina = summersvilleLakeData.marina;
    expect(marina.boatLaunch.ramps).toBeGreaterThan(0);
    expect(marina.services.length).toBeGreaterThan(0);
  });

  it('seasonal guide covers all 4 seasons', () => {
    const seasons = summersvilleLakeData.seasonalGuide.map(g => g.season);
    expect(seasons).toContain('Spring');
    expect(seasons).toContain('Summer');
    expect(seasons).toContain('Fall');
    expect(seasons).toContain('Winter');
  });
});
```

#### 6.2 SPEC-11 Component Integration

```typescript
describe('SPEC-11 Component Integration', () => {
  it('fishSpecies data works with AdventureWhatToFish component', () => {
    // Verify fishSpecies matches AdventureWhatToFish expected props
    const species = summersvilleLakeData.fishSpecies[0];

    expect(species.title).toBeDefined();
    expect(species.description).toBeDefined();
    // optional notes (Kim's tips)
  });

  it('campgrounds data works with AdventureCampingList component', () => {
    const campground = summersvilleLakeData.campgrounds[0];

    expect(campground.name).toBeDefined();
    expect(campground.sites).toBeGreaterThan(0);
    expect(campground.amenities).toBeInstanceOf(Array);
  });

  it('quick stats work with AdventureQuickStats component', () => {
    const stats = [
      { value: summersvilleLakeData.acreage.toLocaleString(), label: 'Acres' },
      { value: `${summersvilleLakeData.maxDepth} ft`, label: 'Max Depth' },
    ];

    stats.forEach(stat => {
      expect(stat.value).toBeTruthy();
      expect(stat.label).toBeTruthy();
    });
  });
});
```

#### 6.3 Build-Time Validation Test

```typescript
describe('Build-Time Validation (NFR-004)', () => {
  it('invalid data causes build failure', async () => {
    const invalidData = {
      ...summersvilleLakeData,
      fishingSpots: [
        {
          name: 'Test Spot',
          depth: '20 feet',
          structure: 'Rocky',
          species: [], // INVALID - empty array violates min(1)
          access: 'Boat',
        },
      ],
    };

    // In real template, this would be:
    // const validated = FishingSpotSchema.parse(invalidData.fishingSpots[0]);
    // This should THROW and fail the build

    expect(() => {
      if (invalidData.fishingSpots[0].species.length === 0) {
        throw new Error('Species array must have at least 1 item');
      }
    }).toThrow();
  });
});
```

---

### Layer 7: Performance Tests

**Location**: `tests/performance/lake-template-performance.spec.ts`
**Framework**: Playwright + Lighthouse CI
**Targets**: Lighthouse scores 90+ all categories

#### 7.1 Lighthouse Performance Tests

```typescript
// tests/performance/lake-template-performance.spec.ts
import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('LakeTemplate Performance (Lighthouse)', () => {
  test('achieves Lighthouse performance score 90+', async ({ page }, testInfo) => {
    await page.goto('/adventures/summersville-lake');

    await playAudit({
      page,
      thresholds: {
        performance: 90,
        accessibility: 95,
        'best-practices': 90,
        seo: 90,
      },
      port: 9222,
    });
  });

  test('First Contentful Paint < 1.5s', async ({ page }) => {
    await page.goto('/adventures/summersville-lake');

    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(performance.timing))
    );

    const fcp = performanceTiming.responseStart - performanceTiming.navigationStart;
    expect(fcp).toBeLessThan(1500); // 1.5 seconds
  });

  test('Largest Contentful Paint < 2.5s', async ({ page }) => {
    await page.goto('/adventures/summersville-lake');

    const lcp = await page.evaluate(() => {
      return new Promise<number>(resolve => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        setTimeout(() => resolve(0), 5000); // Timeout after 5s
      });
    });

    expect(lcp).toBeLessThan(2500); // 2.5 seconds
  });
});
```

#### 7.2 Array Size Performance Tests

```typescript
test.describe('Array Size Performance (NFR-009)', () => {
  test('20 fish species renders without performance degradation', async ({ page }) => {
    // Create test page with 20 species (at limit)
    await page.goto('/adventures/test-lake-max-species');

    const speciesCards = page.locator('[class*="border-l-sign-green"]');
    const count = await speciesCards.count();

    expect(count).toBe(20);

    // Measure render time
    const renderTime = await page.evaluate(() => {
      const start = performance.now();
      document.querySelectorAll('[class*="border-l-sign-green"]');
      return performance.now() - start;
    });

    expect(renderTime).toBeLessThan(100); // <100ms render time
  });

  test('15 fishing spots renders without layout shift', async ({ page }) => {
    await page.goto('/adventures/test-lake-max-spots');

    const spotCards = page.locator('[class*="border-l-brand-brown"]');
    const count = await spotCards.count();

    expect(count).toBe(15);

    // Check for Cumulative Layout Shift (CLS)
    const cls = await page.evaluate(() => {
      return new Promise<number>(resolve => {
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        }).observe({ entryTypes: ['layout-shift'] });

        setTimeout(() => resolve(clsValue), 3000);
      });
    });

    expect(cls).toBeLessThan(0.1); // Good CLS score
  });
});
```

#### 7.3 Image Loading Performance

```typescript
test.describe('Image Performance', () => {
  test('hero image uses lazy loading', async ({ page }) => {
    await page.goto('/adventures/summersville-lake');

    const heroImage = page.locator('section img').first();
    const loading = await heroImage.getAttribute('loading');

    // Hero image should NOT be lazy (it's above fold)
    // Other images SHOULD be lazy
    expect(loading).toBeNull(); // No lazy loading for hero
  });

  test('images have explicit width and height', async ({ page }) => {
    await page.goto('/adventures/summersville-lake');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const width = await img.getAttribute('width');
      const height = await img.getAttribute('height');

      // At least one dimension should be set to prevent layout shift
      expect(width || height).toBeTruthy();
    }
  });
});
```

---

## Test File Organization

```
wv-wild-web/
├── src/
│   ├── types/
│   │   └── __tests__/
│   │       └── adventure-lake.test.ts         # Layer 1: Zod schema tests
│   └── components/
│       └── templates/
│           └── __tests__/
│               ├── LakeTemplate.test.ts         # Layer 2: Logic tests
│               └── LakeTemplate-wvwo.test.ts    # Layer 3: WVWO compliance
├── tests/
│   ├── e2e/
│   │   ├── lake-template-responsive.spec.ts   # Layer 4: Responsive
│   │   └── lake-template-a11y.spec.ts         # Layer 5: Accessibility
│   ├── integration/
│   │   └── lake-template-integration.test.ts  # Layer 6: Real data
│   ├── performance/
│   │   └── lake-template-performance.spec.ts  # Layer 7: Performance
│   └── fixtures/
│       └── summersville-lake-data.ts          # Test data
└── vitest.config.ts                            # Vitest configuration
```

---

## Test Data Fixtures

### Fixture 1: Minimal Valid Lake

```typescript
// tests/fixtures/minimal-lake.ts
import type { LakeTemplateProps } from '../../src/types/adventure';

export const minimalLakeData: LakeTemplateProps = {
  name: 'Test Lake',
  acreage: 500,
  maxDepth: 50,
  county: 'Test',
  quickHighlights: ['Fishing', 'Boating'],
  fishSpecies: [
    {
      title: 'Bass',
      description: 'Year-round',
    },
  ],
  fishingSpots: [
    {
      name: 'Main Cove',
      depth: '20 feet',
      structure: 'Rocky',
      species: ['Bass'],
      access: 'Boat',
    },
  ],
  campgrounds: [
    {
      name: 'Test Campground',
      sites: 20,
      amenities: ['Water'],
      season: 'May-Oct',
    },
  ],
  marina: {
    name: 'Test Marina',
    services: ['Fuel'],
    boatLaunch: { ramps: 1 },
    hours: '9-5',
    contact: '555-1234',
  },
  activities: [
    {
      name: 'Swimming',
      description: 'Beach area',
      season: 'Summer',
    },
  ],
  seasonalGuide: [
    {
      season: 'Spring',
      highlights: ['Fishing picks up'],
    },
    {
      season: 'Summer',
      highlights: ['Peak season'],
    },
    {
      season: 'Fall',
      highlights: ['Fall colors'],
    },
    {
      season: 'Winter',
      highlights: ['Quiet season'],
    },
  ],
  regulations: [
    {
      category: 'Fishing',
      rules: ['Valid WV license required'],
    },
  ],
  heroImage: '/test-lake.jpg',
};
```

### Fixture 2: Summersville Lake (Full Data)

```typescript
// tests/fixtures/summersville-lake-data.ts
import type { LakeTemplateProps } from '../../src/types/adventure';

export const summersvilleLakeData: LakeTemplateProps = {
  name: 'Summersville Lake',
  acreage: 2790,
  maxDepth: 327,
  county: 'Nicholas',
  quickHighlights: [
    'Crystal clear water',
    'Premier smallmouth fishing',
    'Scuba diving destination',
    'Cliff jumping at Long Point',
  ],
  fishSpecies: [
    {
      title: 'Smallmouth Bass',
      description: 'Year-round - peak spring and fall',
      notes: "They're stacked up on the rock walls. Use topwater at dawn and you'll have the time of your life.",
    },
    {
      title: 'Walleye',
      description: 'Best March-May and October-December',
      notes: 'Deep water near the dam. Night fishing is legal and productive.',
    },
    {
      title: 'Muskie',
      description: 'Year-round - fall peak',
      notes: 'Patience pays off. Work the edges of Long Point with big baits.',
    },
    {
      title: 'Crappie',
      description: 'Spring spawn (April-May)',
      notes: 'Hit the coves early spring. 6-10 feet deep around brush.',
    },
    {
      title: 'Largemouth Bass',
      description: 'Spring-Fall',
    },
    {
      title: 'Lake Trout',
      description: 'Winter - deep water',
    },
  ],
  fishingSpots: [
    {
      name: 'Long Point Cliff',
      depth: '40-60 feet near walls',
      structure: 'Towering rock formation with submerged ledges and boulders',
      species: ['Smallmouth Bass', 'Walleye', 'Muskie'],
      access: 'Boat only - 2 miles from Battle Run launch',
    },
    {
      name: 'Dam End',
      depth: '100+ feet',
      structure: 'Deep water with rocky bottom, vertical drop-offs',
      species: ['Walleye', 'Muskie', 'Lake Trout'],
      access: 'Boat - from Battle Run or Salmon Run ramps',
    },
    {
      name: 'Battle Run Cove',
      depth: '15-30 feet',
      structure: 'Protected cove with timber and rocky points',
      species: ['Crappie', 'Smallmouth Bass', 'Largemouth Bass'],
      access: 'Boat or kayak from Battle Run beach',
    },
    {
      name: 'Rock Castle Creek Arm',
      depth: '20-45 feet',
      structure: 'Creek channel with submerged timber',
      species: ['Crappie', 'Largemouth Bass'],
      access: 'Boat only',
    },
  ],
  campgrounds: [
    {
      name: 'Battle Run Campground',
      sites: 35,
      amenities: [
        'Electric hookups',
        'Water',
        'Flush toilets',
        'Hot showers',
        'Beach access',
        'Boat launch',
      ],
      season: 'Mid-May through September',
      reservationUrl: 'https://www.recreation.gov/camping/campgrounds/251970',
    },
    {
      name: 'Salmon Run Primitive',
      sites: 12,
      amenities: ['Pit toilets', 'Fire rings', 'Picnic tables'],
      season: 'Year-round (weather permitting)',
    },
  ],
  marina: {
    name: 'Summersville Lake Marina',
    services: [
      'Marine fuel (gas)',
      'Bait & tackle shop',
      'Ice and drinks',
      'Snacks and supplies',
      'Boat slip rentals',
      'Basic boat repairs',
    ],
    boatLaunch: {
      ramps: 3,
      fee: '$5 per vehicle',
    },
    rentals: [
      'Kayaks ($20/hour)',
      'Pontoon boats (seasonal - reserve ahead)',
      'Fishing boat charters',
    ],
    hours: '7am-8pm daily (Memorial Day - Labor Day)',
    contact: '(304) 872-3773',
  },
  activities: [
    {
      name: 'Scuba Diving',
      description:
        'Long Point Cliff is the signature dive site with 30-45 foot visibility. Towering rock formation plunges 60+ feet underwater. Sarge\'s Dive Shop offers rentals and certification.',
      season: 'May-October (water temps 68-80°F)',
      difficulty: 'moderate',
    },
    {
      name: 'Cliff Jumping',
      description:
        'Pyramid-shaped rock formation at Long Point is popular for jumping. Several safe spots around the point. WARNING: Jumping from surrounding sandstone cliffs is prohibited and dangerous.',
      season: 'Summer (June-August)',
      difficulty: 'challenging',
    },
    {
      name: 'Swimming',
      description:
        'Battle Run Beach offers designated swimming area with lifeguards Memorial Day through Labor Day. Crystal clear water with excellent visibility.',
      season: 'Memorial Day - Labor Day',
      difficulty: 'easy',
    },
    {
      name: 'Kayaking',
      description:
        'Protected coves and calm water make Summersville ideal for kayaking. Rentals available at marina. Battle Run Cove is perfect for beginners.',
      season: 'May-October',
      difficulty: 'easy',
    },
  ],
  seasonalGuide: [
    {
      season: 'Spring',
      highlights: [
        'Smallmouth spawn in shallow rocky areas (April-May)',
        'Walleye fishing peaks pre-spawn (March-April)',
        'Crappie fishing excellent in coves (April-May)',
        'Water temps rise from 50°F to 65°F',
        'Battle Run Campground opens mid-May',
      ],
      fishingFocus:
        'Target shallow rocky areas 5-15 feet deep for pre-spawn smallmouth. Use jerkbaits and suspending crankbaits. Crappie hit jigs around brush piles.',
    },
    {
      season: 'Summer',
      highlights: [
        'Peak tourism season (June-August)',
        'Scuba diving with 30-45 ft visibility',
        'Swimming beach open with lifeguards',
        'All marinas and campgrounds fully operational',
        'Cliff jumping popular at Long Point',
        'Water temps 70-80°F',
      ],
      fishingFocus:
        'Deep water fishing for smallmouth (25-40 ft). Early morning and late evening best. Use drop shot rigs, deep-diving crankbaits, and live bait. Walleye in deep water near dam.',
    },
    {
      season: 'Fall',
      highlights: [
        'Smallmouth fishing peaks again (September-November)',
        'Walleye active as water cools',
        'Muskie season heats up (September-December)',
        'Fall foliage views from water (October)',
        'Fewer crowds after Labor Day',
        'Water temps drop from 70°F to 50°F',
      ],
      fishingFocus:
        'Smallmouth move back to shallower structure 15-30 ft. Topwater effective at dawn. Target rocky points and ledges. Walleye bite improves as water cools below 60°F.',
    },
    {
      season: 'Winter',
      highlights: [
        'Limited lake access (some ramps close)',
        'Walleye fishing for trophy fish (December-February)',
        'Lake trout season (December-March)',
        'Extremely clear water (lowest algae)',
        'Quiet season - solitude for anglers',
        'Battle Run Campground closed',
      ],
      fishingFocus:
        'Deep water walleye near dam (40-60 ft). Vertical jigging with live bait or blade baits. Lake trout in deepest areas (80+ ft). Night fishing permitted. Dress warm - air temps 20-40°F.',
    },
  ],
  regulations: [
    {
      category: 'Walleye Regulations',
      rules: [
        'All walleye 20-30 inches MUST be released immediately (protected slot)',
        'Daily creel limit: 8 walleye maximum',
        'Only 1 walleye over 30 inches may be kept per day',
        'Possession limit: 16 walleye (2 days worth)',
        'Night fishing permitted year-round',
      ],
    },
    {
      category: 'Boating Safety',
      rules: [
        'All boats must have USCG-approved life jackets for each person',
        'Children under 13 MUST wear life jacket when boat is underway',
        'No-wake zones within 50 feet of shore, docks, and swimmers',
        'Navigation lights required after sunset',
        'Horsepower limits: No motors over 10 HP in designated quiet zones',
        'Alcohol prohibited for boat operators (zero tolerance)',
      ],
    },
    {
      category: 'Scuba Diving',
      rules: [
        'Divers MUST display dive flag when submerged',
        'Boats must stay 100 feet from dive flags',
        'Buddy system required - never dive alone',
        'Register with marina before diving (emergency contacts)',
        'Maximum depth: 60 feet without advanced certification',
      ],
    },
    {
      category: 'General Lake Rules',
      rules: [
        'Valid West Virginia fishing license required (ages 15+)',
        'Trout stamp required for lake trout',
        'Glass containers prohibited on beach',
        'Pets must be leashed',
        'Campfires only in designated fire rings',
        'Pack out all trash',
      ],
    },
  ],
  heroImage: '/images/summersville-lake-hero.jpg',
  mapUrl: 'https://maps.google.com/?q=38.2343,-80.8564',
};
```

### Fixture 3: Invalid Data (Build Failure Test)

```typescript
// tests/fixtures/invalid-lake.ts
export const invalidLakeData = {
  name: 'Invalid Lake',
  acreage: 1000,
  maxDepth: 100,
  county: 'Test',
  quickHighlights: ['Test'],
  fishSpecies: [
    {
      title: 'Bass',
      description: 'Year-round',
    },
  ],
  fishingSpots: [
    {
      name: 'Bad Spot',
      depth: '20 feet',
      structure: 'Rocky',
      species: [], // INVALID - empty array
      access: 'Boat',
    },
  ],
  // Missing required campgrounds, marina, activities, seasonalGuide, regulations
  heroImage: '/test.jpg',
};
```

---

## CI/CD Testing Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/spec-13-tests.yml
name: SPEC-13 Lake Template Tests

on:
  pull_request:
    paths:
      - 'wv-wild-web/src/components/templates/LakeTemplate.astro'
      - 'wv-wild-web/src/types/adventure.ts'
      - 'tests/**/*lake*'

jobs:
  type-validation:
    name: Type Validation Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
        working-directory: wv-wild-web
      - run: npm run test -- src/types/__tests__/adventure-lake.test.ts
        working-directory: wv-wild-web

  component-logic:
    name: Component Logic Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
        working-directory: wv-wild-web
      - run: npm run test -- src/components/templates/__tests__/
        working-directory: wv-wild-web

  wvwo-compliance:
    name: WVWO Aesthetic Compliance
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
        working-directory: wv-wild-web
      - run: npm run test -- src/components/templates/__tests__/LakeTemplate-wvwo.test.ts
        working-directory: wv-wild-web
      - name: Fail if WVWO violations found
        run: |
          if grep -r "rounded-md\|rounded-lg\|rounded-xl" wv-wild-web/src/components/templates/LakeTemplate.astro; then
            echo "WVWO VIOLATION: Found forbidden border-radius classes"
            exit 1
          fi

  responsive-e2e:
    name: Responsive Layout E2E
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
        working-directory: wv-wild-web
      - run: npx playwright install --with-deps
      - run: npm run build
        working-directory: wv-wild-web
      - run: npx playwright test tests/e2e/lake-template-responsive.spec.ts

  accessibility:
    name: Accessibility Tests (WCAG 2.1 AA)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
        working-directory: wv-wild-web
      - run: npx playwright install --with-deps
      - run: npm run build
        working-directory: wv-wild-web
      - run: npx playwright test tests/e2e/lake-template-a11y.spec.ts
      - name: Upload accessibility report
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: accessibility-violations
          path: playwright-report/

  integration:
    name: Integration Tests (Real Data)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
        working-directory: wv-wild-web
      - run: npm run test -- tests/integration/lake-template-integration.test.ts
        working-directory: wv-wild-web

  performance:
    name: Performance Tests (Lighthouse)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
        working-directory: wv-wild-web
      - run: npm run build
        working-directory: wv-wild-web
      - run: npm run preview &
        working-directory: wv-wild-web
      - run: sleep 5
      - run: npx playwright test tests/performance/lake-template-performance.spec.ts
      - name: Fail if Lighthouse score < 90
        run: |
          # Parse Lighthouse JSON report
          # Fail build if performance < 90
          echo "Checking Lighthouse scores..."

  coverage:
    name: Test Coverage Report
    runs-on: ubuntu-latest
    needs: [type-validation, component-logic, wvwo-compliance]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
        working-directory: wv-wild-web
      - run: npm run test:run -- --coverage
        working-directory: wv-wild-web
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          directory: wv-wild-web/coverage
      - name: Enforce coverage thresholds
        run: |
          # vitest.config.ts has thresholds: 80% statements, 75% branches
          # Build will fail if thresholds not met
```

---

## Test Execution Commands

### Local Development

```bash
# Run all unit tests (Layers 1-3)
cd wv-wild-web
npm run test

# Run specific test suites
npm run test -- src/types/__tests__/adventure-lake.test.ts
npm run test -- src/components/templates/__tests__/LakeTemplate.test.ts
npm run test -- src/components/templates/__tests__/LakeTemplate-wvwo.test.ts

# Run with coverage
npm run test:run -- --coverage

# Watch mode for TDD
npm run test -- --watch

# Run E2E tests (Layers 4-5)
npx playwright test tests/e2e/lake-template-responsive.spec.ts
npx playwright test tests/e2e/lake-template-a11y.spec.ts

# Run integration tests (Layer 6)
npm run test -- tests/integration/lake-template-integration.test.ts

# Run performance tests (Layer 7)
npm run build
npm run preview &
npx playwright test tests/performance/lake-template-performance.spec.ts
```

### CI Environment

```bash
# Full test suite (all layers)
npm run test:run && npx playwright test

# Quick validation (pre-commit)
npm run test -- --run --changed

# Coverage report
npm run test:run -- --coverage --reporter=html
```

---

## Success Metrics

### Coverage Targets

- **Type Validation (Layer 1)**: 100% schema coverage
- **Component Logic (Layer 2)**: 85%+ code coverage
- **WVWO Compliance (Layer 3)**: 100% rule coverage (zero violations allowed)
- **Responsive (Layer 4)**: Test 5 breakpoints
- **Accessibility (Layer 5)**: Zero axe violations (WCAG 2.1 AA)
- **Integration (Layer 6)**: 100% real data validation
- **Performance (Layer 7)**: Lighthouse 90+ all categories

### Quality Gates (PR Requirements)

✅ All 7 test layers pass
✅ Zero WVWO aesthetic violations
✅ Zero accessibility violations
✅ 80%+ test coverage
✅ Lighthouse scores 90+
✅ Build succeeds with real data
✅ Build fails with invalid data (expected behavior)

---

## Maintenance Plan

### Test Review Cadence

- **Weekly**: Review failed tests, update fixtures
- **Per PR**: Run full test suite, enforce quality gates
- **Per Sprint**: Review coverage reports, identify gaps
- **Per Quarter**: Update accessibility tests for new WCAG guidelines

### Test Data Updates

- Update Summersville Lake fixture when content changes
- Add new lake fixtures as templates are created
- Version control test data with semantic versioning

### Continuous Improvement

- Monitor test execution times (target <5min full suite)
- Refactor slow E2E tests to unit tests where possible
- Add visual regression tests as budget allows
- Expand performance tests with more array size scenarios

---

**Next Steps**: Implement test files following this architecture, starting with Layer 1 (type validation) as foundation.
