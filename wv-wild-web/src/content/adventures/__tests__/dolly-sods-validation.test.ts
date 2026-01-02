/**
 * Content Validation Tests for Dolly Sods Wilderness
 * Tests T-400 to T-407
 *
 * Validates dolly-sods-wilderness.md frontmatter and dolly-sods.ts data file
 * against the adventures collection schema and BackcountryNavigation type.
 *
 * @module content/adventures/__tests__/dolly-sods-validation
 */

import { describe, it, expect } from 'vitest';
import { z } from 'astro/zod';
import * as dollySodsData from '../../../data/backcountry/dolly-sods';
import type { BackcountryNavigation } from '../../../types/navigation-types';
import type { WaterSource } from '../../../types/water-safety';
import type { TieredEmergencyContact } from '../../../types/backcountry-template-types';

// ============================================================================
// FRONTMATTER DATA (from dolly-sods-wilderness.md)
// ============================================================================

/**
 * Frontmatter data extracted from dolly-sods-wilderness.md
 * This represents the content collection entry.
 */
const dollySodsFrontmatter = {
  title: "Dolly Sods Wilderness",
  description: "17,371 acres of alpine wilderness in the Allegheny Highlands - West Virginia's crown jewel of backcountry. Windswept bogs, sub-arctic tundra, and some of the most remote terrain east of the Mississippi. Not for the unprepared, but absolutely worth the effort.",
  type: "adventure" as const,
  season: ["spring", "summer", "fall", "winter"] as const,
  difficulty: "rugged" as const,
  location: "Tucker County / Randolph County, WV",
  county: "Tucker / Randolph",
  coordinates: {
    lat: 39.03,
    lng: -79.35,
  },
  drive_time: "2.5 hours",
  acreage: 17371,
  slug: "dolly-sods-wilderness",
  image: "/images/adventures/dolly-sods-hero.jpg",
  imageAlt: "Windswept heath barren with stunted red spruce and fog rolling through Dolly Sods Wilderness",
  tagline: "17,371 Acres of Alpine Wilderness in the Allegheny Highlands",
  heroImage: "/images/adventures/dolly-sods-hero.jpg",
  quickStats: [
    "17,371 Acres",
    "4,863 ft Peak",
    "No Cell Service",
    "Rugged Terrain",
  ],
  gearList: [
    { name: "Satellite communicator (Garmin inReach, SPOT)", optional: false },
    { name: "Water filter (Sawyer, Katadyn)", optional: false },
    { name: "USGS topographic maps (Hopeville, Blackbird Knob quads)", optional: false },
    { name: "Baseplate compass", optional: false },
  ],
  relatedShop: [
    {
      name: "Water Filtration",
      description: "Filters and purification for backcountry water",
      href: "/shop/water-filtration",
    },
    {
      name: "Navigation",
      description: "Compasses, GPS devices, and maps",
      href: "/shop/navigation",
    },
  ],
  safety: [
    {
      category: "Navigation Emergency Equipment",
      importance: "critical" as const,
      items: [
        "Satellite communicator (NO cell service)",
        "USGS topographic maps (waterproof copies)",
      ],
    },
    {
      category: "Water Safety",
      importance: "critical" as const,
      items: [
        "NEVER drink orange-tinted water (AMD contamination)",
        "Carry minimum 4 liters capacity",
      ],
    },
  ],
  kimTips: [
    {
      content: "Dolly Sods is not a place to learn backcountry skills. Get your navigation, camping, and wilderness experience somewhere more forgiving first. When you're ready though, this place will blow your mind. Nothing else like it east of the Rockies.",
      type: "warning" as const,
    },
    {
      content: "The weather up here can change in 15 minutes. I've seen snow in June and 80 degrees in April. Carry layers no matter what the valley forecast says.",
      type: "tip" as const,
    },
  ],
};

// ============================================================================
// ADVENTURES COLLECTION SCHEMA (from content.config.ts)
// ============================================================================

const SeasonEnum = z.enum(['spring', 'summer', 'fall', 'winter']);
const DifficultyEnum = z.enum(['easy', 'moderate', 'challenging', 'rugged']);
const SuitabilityEnum = z.enum(['dog-friendly', 'kid-friendly', 'wheelchair-accessible', 'paved']);

const AdventuresCollectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  season: z.array(SeasonEnum),
  difficulty: DifficultyEnum,
  location: z.string(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  gear: z.array(z.string()).optional(),
  elevation_gain: z.number().optional(),
  drive_time: z.string().optional(),
  kim_hook: z.string().optional(),
  suitability: z.array(SuitabilityEnum).optional(),
  type: z.enum(['adventure', 'wma', 'lake', 'river', 'ski']).optional(),
  acreage: z.number().int().positive().optional(),
  county: z.string().optional(),
  slug: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  tagline: z.string().optional(),
  heroImage: z.string().optional(),
  quickStats: z.array(z.string()).optional(),
  gearList: z.array(z.object({
    name: z.string(),
    optional: z.boolean().default(false),
  })).optional(),
  relatedShop: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    href: z.string(),
  })).optional(),
  safety: z.array(z.object({
    category: z.string(),
    importance: z.enum(['critical', 'high', 'moderate']),
    items: z.array(z.string()),
  })).optional(),
  kimTips: z.array(z.object({
    content: z.string(),
    type: z.enum(['warning', 'tip', 'insider']),
  })).optional(),
});

// ============================================================================
// TEST T-400: Dolly Sods passes adventures collection Zod schema
// ============================================================================

describe('T-400: Frontmatter Schema Validation', () => {
  it('dolly-sods-wilderness.md passes adventures collection Zod schema', () => {
    const result = AdventuresCollectionSchema.safeParse(dollySodsFrontmatter);

    if (!result.success) {
      console.error('Schema validation errors:', result.error.format());
    }

    expect(result.success).toBe(true);
  });
});

// ============================================================================
// TEST T-401: All required frontmatter fields present
// ============================================================================

describe('T-401: Required Frontmatter Fields', () => {
  it('has required field: title', () => {
    expect(dollySodsFrontmatter.title).toBeDefined();
    expect(typeof dollySodsFrontmatter.title).toBe('string');
    expect(dollySodsFrontmatter.title.length).toBeGreaterThan(0);
  });

  it('has required field: description', () => {
    expect(dollySodsFrontmatter.description).toBeDefined();
    expect(typeof dollySodsFrontmatter.description).toBe('string');
    expect(dollySodsFrontmatter.description.length).toBeGreaterThan(0);
  });

  it('has required field: season', () => {
    expect(dollySodsFrontmatter.season).toBeDefined();
    expect(Array.isArray(dollySodsFrontmatter.season)).toBe(true);
    expect(dollySodsFrontmatter.season.length).toBeGreaterThan(0);
  });

  it('has required field: difficulty', () => {
    expect(dollySodsFrontmatter.difficulty).toBeDefined();
    expect(['easy', 'moderate', 'challenging', 'rugged']).toContain(dollySodsFrontmatter.difficulty);
  });

  it('difficulty is "rugged" (highest level)', () => {
    expect(dollySodsFrontmatter.difficulty).toBe('rugged');
  });
});

// ============================================================================
// TEST T-402: Data file structure matches BackcountryNavigation type
// ============================================================================

describe('T-402: BackcountryNavigation Type Compliance', () => {
  it('navigation field exists and matches BackcountryNavigation type', () => {
    expect(dollySodsData.navigation).toBeDefined();

    const nav = dollySodsData.navigation as BackcountryNavigation;

    // Required fields from BackcountryNavigation
    expect(nav.coordinates).toBeDefined();
    expect(nav.usgsQuads).toBeDefined();
    expect(nav.compassDeclination).toBeDefined();
    expect(nav.offlineMapApps).toBeDefined();
    expect(nav.navigationDifficulty).toBeDefined();
    expect(nav.gpsReliability).toBeDefined();
    expect(nav.satelliteRecommendation).toBeDefined();
  });

  it('coordinates have required decimal format', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    expect(nav.coordinates.decimal).toBeDefined();
    expect(nav.coordinates.decimal.lat).toBe(39.03);
    expect(nav.coordinates.decimal.lng).toBe(-79.35);
  });

  it('usgsQuads is array with at least one entry', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    expect(Array.isArray(nav.usgsQuads)).toBe(true);
    expect(nav.usgsQuads.length).toBeGreaterThan(0);
  });

  it('compassDeclination has required fields', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    expect(nav.compassDeclination.degrees).toBeDefined();
    expect(nav.compassDeclination.direction).toBeDefined();
    expect(nav.compassDeclination.display).toBeDefined();
    expect(nav.compassDeclination.referenceYear).toBeDefined();
  });
});

// ============================================================================
// TEST T-403: AMD water sources validation
// ============================================================================

describe('T-403: AMD Water Sources Status and Treatment', () => {
  it('AMD-contaminated water sources have status="do-not-use"', () => {
    const waterSources = dollySodsData.waterSources as WaterSource[];

    const amdSources = waterSources.filter(source =>
      source.amdDetails?.contaminantType === 'amd'
    );

    expect(amdSources.length).toBeGreaterThan(0);

    amdSources.forEach(source => {
      expect(source.status).toBe('do-not-use');
    });
  });

  it('AMD water sources have treatment="not-applicable"', () => {
    const waterSources = dollySodsData.waterSources as WaterSource[];

    const amdSources = waterSources.filter(source =>
      source.amdDetails?.contaminantType === 'amd'
    );

    amdSources.forEach(source => {
      expect(source.treatment).toBe('not-applicable');
    });
  });

  it('Red Creek (Lower Sections) is marked as do-not-use', () => {
    const waterSources = dollySodsData.waterSources as WaterSource[];

    const redCreekLower = waterSources.find(source =>
      source.name === 'Red Creek (Lower Sections)'
    );

    expect(redCreekLower).toBeDefined();
    expect(redCreekLower!.status).toBe('do-not-use');
    expect(redCreekLower!.treatment).toBe('not-applicable');
  });

  it('do-not-use sources have warnings array', () => {
    const waterSources = dollySodsData.waterSources as WaterSource[];

    const doNotUseSources = waterSources.filter(source =>
      source.status === 'do-not-use'
    );

    doNotUseSources.forEach(source => {
      expect(source.warnings).toBeDefined();
      expect(Array.isArray(source.warnings)).toBe(true);
      expect(source.warnings!.length).toBeGreaterThan(0);
    });
  });
});

// ============================================================================
// TEST T-404: Emergency contacts have all 5 tiers
// ============================================================================

describe('T-404: Emergency Contact Tiers', () => {
  it('emergency contacts include all 5 required tiers', () => {
    const contacts = dollySodsData.emergencyContacts as TieredEmergencyContact[];

    const requiredTiers = ['primary', 'sar', 'agency', 'medical', 'poison'];
    const presentTiers = contacts.map(contact => contact.tier);

    requiredTiers.forEach(tier => {
      expect(presentTiers).toContain(tier);
    });
  });

  it('has exactly 5 emergency contacts (one per tier)', () => {
    const contacts = dollySodsData.emergencyContacts as TieredEmergencyContact[];
    expect(contacts.length).toBe(5);
  });

  it('primary tier is 911', () => {
    const contacts = dollySodsData.emergencyContacts as TieredEmergencyContact[];
    const primaryContact = contacts.find(c => c.tier === 'primary');

    expect(primaryContact).toBeDefined();
    expect(primaryContact!.phone).toBe('911');
  });

  it('all contacts have required fields', () => {
    const contacts = dollySodsData.emergencyContacts as TieredEmergencyContact[];

    contacts.forEach(contact => {
      expect(contact.tier).toBeDefined();
      expect(contact.service).toBeDefined();
      expect(contact.phone).toBeDefined();
      expect(contact.available).toBeDefined();
    });
  });
});

// ============================================================================
// TEST T-405: USGS quad names match official quads
// ============================================================================

describe('T-405: USGS Quad Map References', () => {
  it('includes Hopeville quad as primary coverage', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;

    const hopevilleQuad = nav.usgsQuads.find(quad =>
      quad.name === 'Hopeville'
    );

    expect(hopevilleQuad).toBeDefined();
    expect(hopevilleQuad!.coverage).toBe('primary');
    expect(hopevilleQuad!.scale).toBe('1:24000');
  });

  it('includes Blackbird Knob quad as primary coverage', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;

    const blackbirdQuad = nav.usgsQuads.find(quad =>
      quad.name === 'Blackbird Knob'
    );

    expect(blackbirdQuad).toBeDefined();
    expect(blackbirdQuad!.coverage).toBe('primary');
    expect(blackbirdQuad!.scale).toBe('1:24000');
  });

  it('both primary quads use 7.5-minute scale (1:24000)', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;

    const primaryQuads = nav.usgsQuads.filter(quad =>
      quad.coverage === 'primary'
    );

    primaryQuads.forEach(quad => {
      expect(quad.scale).toBe('1:24000');
    });
  });
});

// ============================================================================
// TEST T-406: Compass declination matches NOAA 2024
// ============================================================================

describe('T-406: Compass Declination Accuracy', () => {
  it('compass declination is 8.2° W', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;

    expect(nav.compassDeclination.degrees).toBe(8.2);
    expect(nav.compassDeclination.direction).toBe('W');
  });

  it('declination display format is "8.2° W"', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    expect(nav.compassDeclination.display).toBe('8.2° W');
  });

  it('declination reference year is 2024', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    expect(nav.compassDeclination.referenceYear).toBe(2024);
  });

  it('declination source is NOAA', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    expect(nav.compassDeclination.source).toBe('NOAA');
  });
});

// ============================================================================
// TEST T-407: Tucker County SAR phone verification
// ============================================================================

describe('T-407: Search and Rescue Contact Verification', () => {
  it('Tucker County SAR phone is 304-478-2431', () => {
    const contacts = dollySodsData.emergencyContacts as TieredEmergencyContact[];

    const sarContact = contacts.find(c =>
      c.tier === 'sar' && c.service.includes('Tucker County Search and Rescue')
    );

    expect(sarContact).toBeDefined();
    expect(sarContact!.phone).toBe('304-478-2431');
  });

  it('SAR contact is available 24/7', () => {
    const contacts = dollySodsData.emergencyContacts as TieredEmergencyContact[];

    const sarContact = contacts.find(c => c.tier === 'sar');

    expect(sarContact).toBeDefined();
    expect(sarContact!.available).toBe('24/7');
  });

  it('SAR contact has response time estimate', () => {
    const contacts = dollySodsData.emergencyContacts as TieredEmergencyContact[];

    const sarContact = contacts.find(c => c.tier === 'sar');

    expect(sarContact).toBeDefined();
    expect(sarContact!.responseTime).toBeDefined();
    expect(sarContact!.responseTime).toContain('4-8 hours');
  });
});

// ============================================================================
// TEST T-408: Davis Memorial Hospital information
// ============================================================================

describe('T-408: Medical Facility Information', () => {
  it('Davis Memorial Hospital contact exists', () => {
    const contacts = dollySodsData.emergencyContacts as TieredEmergencyContact[];

    const hospitalContact = contacts.find(c =>
      c.tier === 'medical' && c.service.includes('Davis Memorial Hospital')
    );

    expect(hospitalContact).toBeDefined();
    expect(hospitalContact!.phone).toBe('304-636-3300');
  });

  it('hospital is Level III trauma center', () => {
    expect(dollySodsData.nearestHospital).toBeDefined();
    expect(dollySodsData.nearestHospital.traumaLevel).toBe('Level III');
  });

  it('hospital distance is approximately 45 minutes', () => {
    expect(dollySodsData.nearestHospital.distance).toBe('45 minutes');

    const contacts = dollySodsData.emergencyContacts as TieredEmergencyContact[];
    const hospitalContact = contacts.find(c => c.tier === 'medical');

    expect(hospitalContact!.notes).toContain('45 minutes');
  });

  it('hospital name is Davis Memorial Hospital', () => {
    expect(dollySodsData.nearestHospital.name).toBe('Davis Memorial Hospital');
  });

  it('hospital is in Elkins, WV', () => {
    expect(dollySodsData.nearestHospital.address).toContain('Elkins');
    expect(dollySodsData.nearestHospital.address).toContain('WV');
  });
});

// ============================================================================
// TEST T-409: Cell coverage status
// ============================================================================

describe('T-409: Cell Coverage and Satellite Communication', () => {
  it('overall cell coverage is "none"', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    expect(nav.cellCoverage.overall).toBe('none');
  });

  it('satellite communication is required', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    expect(nav.satelliteRecommendation.required).toBe(true);
    expect(nav.satelliteRecommendation.level).toBe('required');
  });

  it('compatible satellite devices listed', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    const devices = nav.satelliteRecommendation.compatibleDevices;

    expect(devices).toBeDefined();
    expect(Array.isArray(devices)).toBe(true);
    expect(devices!.length).toBeGreaterThan(0);
    expect(devices).toContain('Garmin inReach');
    expect(devices).toContain('SPOT');
  });
});

// ============================================================================
// TEST T-410: Trail blazing system
// ============================================================================

describe('T-410: Trail Blazing and Navigation', () => {
  it('trail blazing system is documented', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    expect(nav.trailBlazing).toBeDefined();
  });

  it('trail blazing uses blue diamonds', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    expect(nav.trailBlazing!.system).toBe('Blue diamond blazes');
    expect(nav.trailBlazing!.color).toBe('blue');
    expect(nav.trailBlazing!.shape).toBe('diamond');
  });

  it('trail blazing reliability is moderate (safety warning)', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    expect(nav.trailBlazing!.reliability).toBe('moderate');
  });

  it('navigation difficulty is expert level', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    expect(nav.navigationDifficulty).toBe('expert');
  });

  it('GPS reliability is unreliable', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    expect(nav.gpsReliability).toBe('unreliable');
  });

  it('paper map is required', () => {
    const nav = dollySodsData.navigation as BackcountryNavigation;
    expect(nav.paperMapRequired).toBe(true);
  });
});
