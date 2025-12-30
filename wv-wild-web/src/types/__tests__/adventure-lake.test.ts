/**
 * SPEC-13: Lake Template Type System Tests
 * Validates Zod schemas and TypeScript types for lake adventure pages
 *
 * @module types/__tests__/adventure-lake.test
 */

import { describe, it, expect } from 'vitest';
import {
  FishingSpotSchema,
  MarinaSchema,
  ActivitySchema,
  SeasonalGuideSchema,
  RegulationSchema,
  type FishingSpot,
  type Marina,
  type Activity,
  type SeasonalGuide,
  type Regulation,
  type LakeTemplateProps,
} from '../adventure';

describe('FishingSpotSchema', () => {
  it('validates valid fishing spot', () => {
    const validSpot: FishingSpot = {
      name: 'North Shore Point',
      depth: '8-15 feet',
      structure: 'Rocky ledges with submerged timber',
      species: ['Largemouth Bass', 'Smallmouth Bass', 'Walleye'],
      access: 'Boat only',
    };

    const result = FishingSpotSchema.safeParse(validSpot);
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const invalidSpot = {
      name: '',
      depth: '10 feet',
      structure: 'Rocky',
      species: ['Bass'],
      access: 'Boat',
    };

    const result = FishingSpotSchema.safeParse(invalidSpot);
    expect(result.success).toBe(false);
  });

  it('rejects empty species array', () => {
    const invalidSpot = {
      name: 'Test Spot',
      depth: '10 feet',
      structure: 'Rocky',
      species: [],
      access: 'Boat',
    };

    const result = FishingSpotSchema.safeParse(invalidSpot);
    expect(result.success).toBe(false);
  });

  it('rejects more than 15 species', () => {
    const invalidSpot = {
      name: 'Test Spot',
      depth: '10 feet',
      structure: 'Rocky',
      species: Array(16).fill('Bass'),
      access: 'Boat',
    };

    const result = FishingSpotSchema.safeParse(invalidSpot);
    expect(result.success).toBe(false);
  });

  it('accepts maximum 15 species', () => {
    const validSpot = {
      name: 'Test Spot',
      depth: '10 feet',
      structure: 'Rocky',
      species: Array(15).fill('Bass'),
      access: 'Boat',
    };

    const result = FishingSpotSchema.safeParse(validSpot);
    expect(result.success).toBe(true);
  });
});

describe('MarinaSchema', () => {
  it('validates full-service marina with all fields', () => {
    const validMarina: Marina = {
      name: 'Summersville Marina',
      type: 'Full-service marina',
      services: ['Boat rental', 'Bait shop', 'Fuel', 'Ice', 'Restrooms'],
      contact: '(304) 872-5809',
      hours: 'Daily 6am-8pm (May-October)',
      fees: '$15 launch fee, $10 parking',
    };

    const result = MarinaSchema.safeParse(validMarina);
    expect(result.success).toBe(true);
  });

  it('validates minimal marina without optional fields', () => {
    const validMarina: Marina = {
      name: 'Public Boat Ramp',
      type: 'Public boat ramp',
      services: ['Free launch'],
    };

    const result = MarinaSchema.safeParse(validMarina);
    expect(result.success).toBe(true);
  });

  it('rejects empty services array', () => {
    const invalidMarina = {
      name: 'Test Marina',
      type: 'Public ramp',
      services: [],
    };

    const result = MarinaSchema.safeParse(invalidMarina);
    expect(result.success).toBe(false);
  });

  it('rejects more than 20 services', () => {
    const invalidMarina = {
      name: 'Test Marina',
      type: 'Full-service',
      services: Array(21).fill('Service'),
    };

    const result = MarinaSchema.safeParse(invalidMarina);
    expect(result.success).toBe(false);
  });
});

describe('ActivitySchema', () => {
  it('validates activity with all fields', () => {
    const validActivity: Activity = {
      name: 'Bass Fishing',
      description: 'World-class largemouth and smallmouth bass fishing in clear waters',
      season: 'Best in spring and fall',
      difficulty: 'Beginner-friendly',
      icon: 'location',
    };

    const result = ActivitySchema.safeParse(validActivity);
    expect(result.success).toBe(true);
  });

  it('validates minimal activity', () => {
    const validActivity: Activity = {
      name: 'Swimming',
      description: 'Designated swimming areas with sandy beaches',
    };

    const result = ActivitySchema.safeParse(validActivity);
    expect(result.success).toBe(true);
  });

  it('rejects invalid icon', () => {
    const invalidActivity = {
      name: 'Kayaking',
      description: 'Paddle the shoreline',
      icon: 'invalid-icon',
    };

    const result = ActivitySchema.safeParse(invalidActivity);
    expect(result.success).toBe(false);
  });

  it('accepts valid icon from STAT_ICON_PATHS', () => {
    const validActivity = {
      name: 'Hiking',
      description: 'Scenic trails',
      icon: 'distance',
    };

    const result = ActivitySchema.safeParse(validActivity);
    expect(result.success).toBe(true);
  });
});

describe('SeasonalGuideSchema', () => {
  it('validates seasonal guide with all fields', () => {
    const validGuide: SeasonalGuide = {
      period: 'Spring (March-May)',
      targetSpecies: ['Largemouth Bass', 'Crappie', 'Walleye'],
      techniques: 'Shallow water crankbaits, spinnerbaits, and jigs near spawning areas',
      conditions: 'Water temps 50-65°F, fish moving shallow',
      kimNote: "Spring bass are hungry - don't overthink it, just get your bait near cover!",
    };

    const result = SeasonalGuideSchema.safeParse(validGuide);
    expect(result.success).toBe(true);
  });

  it('validates minimal guide without optional fields', () => {
    const validGuide: SeasonalGuide = {
      period: 'Summer',
      targetSpecies: ['Bass'],
      techniques: 'Deep diving crankbaits',
    };

    const result = SeasonalGuideSchema.safeParse(validGuide);
    expect(result.success).toBe(true);
  });

  it('rejects empty targetSpecies', () => {
    const invalidGuide = {
      period: 'Fall',
      targetSpecies: [],
      techniques: 'Test',
    };

    const result = SeasonalGuideSchema.safeParse(invalidGuide);
    expect(result.success).toBe(false);
  });

  it('rejects more than 15 target species', () => {
    const invalidGuide = {
      period: 'All Seasons',
      targetSpecies: Array(16).fill('Bass'),
      techniques: 'Everything',
    };

    const result = SeasonalGuideSchema.safeParse(invalidGuide);
    expect(result.success).toBe(false);
  });
});

describe('RegulationSchema', () => {
  it('validates important regulation with link', () => {
    const validRegulation: Regulation = {
      category: 'Fishing License',
      details: 'Valid WV fishing license required for all anglers 15+',
      link: 'https://wvdnr.gov/hunting-trapping-fishing/fishing/fishing-regulations/',
      important: true,
    };

    const result = RegulationSchema.safeParse(validRegulation);
    expect(result.success).toBe(true);
  });

  it('validates minimal regulation', () => {
    const validRegulation: Regulation = {
      category: 'Boat Speed',
      details: '10 mph no-wake zone near marina',
    };

    const result = RegulationSchema.safeParse(validRegulation);
    expect(result.success).toBe(true);
  });

  it('defaults important to false', () => {
    const regulation = {
      category: 'Test',
      details: 'Test details',
    };

    const result = RegulationSchema.safeParse(regulation);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.important).toBe(false);
    }
  });

  it('rejects invalid URL format', () => {
    const invalidRegulation = {
      category: 'Test',
      details: 'Test',
      link: 'not-a-url',
    };

    const result = RegulationSchema.safeParse(invalidRegulation);
    expect(result.success).toBe(false);
  });

  it('accepts valid HTTPS URL', () => {
    const validRegulation = {
      category: 'Test',
      details: 'Test',
      link: 'https://example.com/regulations',
    };

    const result = RegulationSchema.safeParse(validRegulation);
    expect(result.success).toBe(true);
  });
});

describe('LakeTemplateProps interface', () => {
  it('type checks valid complete lake template props', () => {
    const validProps: LakeTemplateProps = {
      name: 'Summersville Lake',
      image: '/images/summersville-lake-hero.jpg',
      imageAlt: 'Aerial view of Summersville Lake with emerald green waters',
      tagline: "West Virginia's Premier Bass Fishing Destination",
      description: 'Known for crystal-clear waters and trophy bass...',
      stats: [
        { value: '2,790', label: 'Acres' },
        { value: '30 min', label: 'From Shop' },
      ],
      fishingSpots: [
        {
          name: 'North Shore Point',
          depth: '8-15 feet',
          structure: 'Rocky ledges',
          species: ['Largemouth Bass'],
          access: 'Boat only',
        },
      ],
      marinas: [
        {
          name: 'Summersville Marina',
          type: 'Full-service',
          services: ['Boat rental'],
        },
      ],
      activities: [
        {
          name: 'Bass Fishing',
          description: 'World-class fishing',
        },
      ],
      seasonalGuide: [
        {
          period: 'Spring',
          targetSpecies: ['Bass'],
          techniques: 'Crankbaits',
        },
      ],
      regulations: [
        {
          category: 'License',
          details: 'WV license required',
        },
      ],
      gearList: [
        { name: 'Fishing rod', optional: false },
      ],
      relatedShop: [
        {
          name: 'Fishing Gear',
          href: '/shop/fishing',
        },
      ],
      difficulty: 'easy',
      bestSeason: 'spring',
      coordinates: { lat: 38.2345, lng: -80.8567 },
    };

    // TypeScript will catch type errors at compile time
    expect(validProps.name).toBe('Summersville Lake');
    expect(validProps.fishingSpots).toHaveLength(1);
    expect(validProps.difficulty).toBe('easy');
  });

  it('type checks minimal lake template props', () => {
    const validProps: LakeTemplateProps = {
      name: 'Test Lake',
      image: '/test.jpg',
      imageAlt: 'Test',
      tagline: 'Test',
      description: 'Test description',
      stats: [],
      fishingSpots: [],
      marinas: [],
      activities: [],
      seasonalGuide: [],
      regulations: [],
      gearList: [],
      relatedShop: [],
    };

    expect(validProps.name).toBe('Test Lake');
    expect(validProps.difficulty).toBeUndefined();
    expect(validProps.bestSeason).toBeUndefined();
    expect(validProps.coordinates).toBeUndefined();
  });
});

describe('Lake type system integration', () => {
  it('validates all schemas work together', () => {
    const fishingSpot = FishingSpotSchema.parse({
      name: 'Deep Point',
      depth: '20-40 feet',
      structure: 'Submerged timber',
      species: ['Walleye', 'Muskie'],
      access: 'Boat only',
    });

    const marina = MarinaSchema.parse({
      name: 'Main Launch',
      type: 'Public ramp',
      services: ['Free launch', 'Parking'],
      fees: 'Free',
    });

    const activity = ActivitySchema.parse({
      name: 'Kayaking',
      description: 'Explore the shoreline',
      season: 'May-September',
      icon: 'location',
    });

    const guide = SeasonalGuideSchema.parse({
      period: 'Summer',
      targetSpecies: ['Bass', 'Catfish'],
      techniques: 'Night fishing with live bait',
      kimNote: 'Summer catfish bite best after dark!',
    });

    const regulation = RegulationSchema.parse({
      category: 'Daily Limits',
      details: '5 bass per day, 15" minimum',
      important: true,
    });

    expect(fishingSpot.species).toContain('Walleye');
    expect(marina.services).toContain('Free launch');
    expect(activity.icon).toBe('location');
    expect(guide.kimNote).toContain('catfish');
    expect(regulation.important).toBe(true);
  });

  it('ensures type safety for LakeTemplateProps arrays', () => {
    const props: LakeTemplateProps = {
      name: 'Test Lake',
      image: '/test.jpg',
      imageAlt: 'Test',
      tagline: 'Test',
      description: 'Test',
      stats: [{ value: '100', label: 'Acres' }],
      fishingSpots: [
        {
          name: 'Spot 1',
          depth: '10 feet',
          structure: 'Rocky',
          species: ['Bass'],
          access: 'Shore',
        },
      ],
      marinas: [
        {
          name: 'Marina 1',
          type: 'Public',
          services: ['Launch'],
        },
      ],
      activities: [
        {
          name: 'Fishing',
          description: 'Great fishing',
        },
      ],
      seasonalGuide: [
        {
          period: 'All year',
          targetSpecies: ['Bass'],
          techniques: 'Various',
        },
      ],
      regulations: [
        {
          category: 'Rules',
          details: 'Follow all rules',
        },
      ],
      gearList: [{ name: 'Rod', optional: false }],
      relatedShop: [{ name: 'Gear', href: '/shop' }],
    };

    // TypeScript ensures all array types are correct
    props.fishingSpots.forEach((spot) => {
      expect(spot.species).toBeInstanceOf(Array);
    });
    props.marinas.forEach((marina) => {
      expect(marina.services).toBeInstanceOf(Array);
    });
    props.seasonalGuide.forEach((guide) => {
      expect(guide.targetSpecies).toBeInstanceOf(Array);
    });
  });
});
