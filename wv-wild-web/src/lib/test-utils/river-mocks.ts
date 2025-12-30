/**
 * River Mock Factories
 * SPEC-14: T-013 - Mock data generation for testing
 *
 * These factories generate valid mock data for testing River components and utilities.
 * Use overrides parameter to customize specific properties while maintaining valid defaults.
 *
 * @module lib/test-utils/river-mocks
 */

import type {
  Rapid,
  RiverFishing,
  Outfitter,
  SeasonalFlow,
  RiverAccessPoint,
  RiverSafety,
  NearbyAttraction,
  RiverTemplateProps,
  StatItem,
  GearItem,
  RelatedCategory,
} from '@/types/adventure';

/**
 * Creates a mock Rapid with sensible defaults.
 * Override any properties as needed for specific test cases.
 *
 * @param overrides - Partial Rapid properties to override defaults
 * @returns Complete Rapid object
 *
 * @example
 * ```typescript
 * const rapid = createMockRapid({ name: 'Custom Rapid', class: { base: 'VI' } });
 * ```
 */
export function createMockRapid(overrides?: Partial<Rapid>): Rapid {
  return {
    name: 'Test Rapid',
    class: {
      base: 'IV',
      lowWater: 'III',
      highWater: 'V',
    },
    displayName: 'Class IV',
    description: 'A challenging rapid with multiple features requiring precise boat control.',
    runnable: 'Intermediate to advanced paddlers',
    kimNote: 'Scout this one from river left - the line is tricky at high water.',
    ...overrides,
  };
}

/**
 * Creates a mock RiverFishing object with valid defaults.
 *
 * @param overrides - Partial RiverFishing properties to override defaults
 * @returns Complete RiverFishing object
 */
export function createMockFishing(overrides?: Partial<RiverFishing>): RiverFishing {
  return {
    species: ['Smallmouth Bass', 'Rock Bass', 'Channel Catfish'],
    techniques: 'Fly fishing, spinning, and bait casting work well in slower pools.',
    seasons: 'Spring and Fall offer the best fishing. Summer can be productive early morning.',
    regulations: 'WV fishing license required. Follow statewide bass regulations and size limits.',
    catchAndRelease: 'Consider catch and release for smallmouth to maintain healthy populations.',
    ...overrides,
  };
}

/**
 * Creates a mock Outfitter with valid defaults.
 *
 * @param overrides - Partial Outfitter properties to override defaults
 * @returns Complete Outfitter object
 */
export function createMockOutfitter(overrides?: Partial<Outfitter>): Outfitter {
  return {
    name: 'Test River Outfitters',
    services: ['Guided full-day trips', 'Equipment rental', 'Shuttle service', 'Instruction'],
    contact: '304-555-0100',
    website: 'https://example.com',
    pricing: '$125 per person for full-day guided trip. Equipment rental $50.',
    ...overrides,
  };
}

/**
 * Creates a mock SeasonalFlow entry with valid defaults.
 *
 * @param overrides - Partial SeasonalFlow properties to override defaults
 * @returns Complete SeasonalFlow object
 */
export function createMockSeasonalFlow(overrides?: Partial<SeasonalFlow>): SeasonalFlow {
  return {
    season: 'Spring (March-May)',
    flowRate: '1,500-2,500 CFS',
    conditions: 'High water levels from snowmelt and spring rains create exciting conditions.',
    accessibility: 'Suitable for intermediate to advanced paddlers. Guided trips recommended.',
    ...overrides,
  };
}

/**
 * Creates a mock RiverAccessPoint with valid defaults.
 *
 * @param overrides - Partial RiverAccessPoint properties to override defaults
 * @returns Complete RiverAccessPoint object
 */
export function createMockAccessPoint(overrides?: Partial<RiverAccessPoint>): RiverAccessPoint {
  return {
    name: 'Main Launch',
    type: 'Put-in',
    facilities: ['Parking', 'Restrooms', 'Picnic area', 'Boat ramp'],
    coordinates: {
      lat: 38.2345,
      lng: -80.8567,
    },
    restrictions: 'Day use only. $5 parking fee. Closes at sunset.',
    ...overrides,
  };
}

/**
 * Creates a mock RiverSafety category with valid defaults.
 *
 * @param overrides - Partial RiverSafety properties to override defaults
 * @returns Complete RiverSafety object
 */
export function createMockSafety(overrides?: Partial<RiverSafety>): RiverSafety {
  return {
    category: 'Required Equipment',
    items: [
      'Personal Flotation Device (PFD) - Type III or V',
      'Helmet - ASTM certified for whitewater',
      'Wetsuit or drysuit in cold conditions',
      'Throw rope - 50-70 feet minimum',
      'First aid kit',
      'Whistle for emergency signaling',
    ],
    importance: 'critical',
    ...overrides,
  };
}

/**
 * Creates a mock NearbyAttraction with valid defaults.
 *
 * @param overrides - Partial NearbyAttraction properties to override defaults
 * @returns Complete NearbyAttraction object
 */
export function createMockNearbyAttraction(
  overrides?: Partial<NearbyAttraction>
): NearbyAttraction {
  return {
    name: 'Summersville Lake',
    distance: '5 miles',
    description: 'Crystal-clear lake perfect for swimming, scuba diving, and cliff jumping.',
    link: 'https://www.recreation.gov/camping/campgrounds/233395',
    ...overrides,
  };
}

/**
 * Creates a mock StatItem with valid defaults.
 *
 * @param overrides - Partial StatItem properties to override defaults
 * @returns Complete StatItem object
 */
export function createMockStatItem(overrides?: Partial<StatItem>): StatItem {
  return {
    value: '28 miles',
    label: 'Length',
    icon: 'distance',
    ...overrides,
  };
}

/**
 * Creates a mock GearItem with valid defaults.
 *
 * @param overrides - Partial GearItem properties to override defaults
 * @returns Complete GearItem object
 */
export function createMockGearItem(overrides?: Partial<GearItem>): GearItem {
  return {
    name: 'Whitewater kayak or raft',
    optional: false,
    icon: 'check',
    ...overrides,
  };
}

/**
 * Creates a mock RelatedCategory with valid defaults.
 *
 * @param overrides - Partial RelatedCategory properties to override defaults
 * @returns Complete RelatedCategory object
 */
export function createMockRelatedCategory(
  overrides?: Partial<RelatedCategory>
): RelatedCategory {
  return {
    name: 'Water Sports Gear',
    description: 'Kayaks, paddles, PFDs, and all your whitewater essentials',
    href: '/shop/water-sports',
    icon: 'check',
    ...overrides,
  };
}

/**
 * Creates a complete mock RiverTemplateProps with all required fields.
 * Perfect for testing components that expect full river template data.
 *
 * @param overrides - Partial RiverTemplateProps properties to override defaults
 * @returns Complete RiverTemplateProps object
 *
 * @example
 * ```typescript
 * // Create custom river with specific properties
 * const gauleyRiver = createMockRiverTemplate({
 *   name: 'Gauley River',
 *   length: 28,
 *   difficultyRange: 'Class III-V+',
 * });
 * ```
 */
export function createMockRiverTemplate(
  overrides?: Partial<RiverTemplateProps>
): RiverTemplateProps {
  return {
    // Hero section (required)
    name: 'Mock River',
    image: '/images/mock-river.jpg',
    imageAlt: 'Beautiful river flowing through wilderness',
    tagline: 'Epic Whitewater Adventure in West Virginia',
    description:
      'Experience world-class whitewater on this stunning river. Perfect for intermediate to advanced paddlers seeking an unforgettable adventure through remote wilderness.',
    stats: [
      createMockStatItem({ value: '15 miles', label: 'Length', icon: 'distance' }),
      createMockStatItem({ value: 'Class III-IV', label: 'Difficulty', icon: 'info' }),
      createMockStatItem({ value: '45 min', label: 'From Shop', icon: 'time' }),
      createMockStatItem({ value: 'Apr-Oct', label: 'Best Season', icon: 'calendar' }),
    ],

    // River metadata
    length: 15,
    county: 'Mock County',
    difficultyRange: 'Class III-IV',
    quickHighlights: [
      'Over 50 named rapids',
      'Stunning wilderness scenery',
      'Excellent fishing opportunities',
      'Professional guide services available',
    ],

    // Content sections
    rapids: [
      createMockRapid({ name: 'Upper Falls', class: { base: 'III' } }),
      createMockRapid({ name: 'Middle Drop', class: { base: 'IV' } }),
      createMockRapid({ name: 'Lower Gorge', class: { base: 'IV+' } }),
    ],
    fishing: createMockFishing(),
    outfitters: [
      createMockOutfitter({ name: 'River Adventures Inc' }),
      createMockOutfitter({ name: 'Whitewater Expeditions' }),
    ],
    seasonalFlow: [
      createMockSeasonalFlow({ season: 'Spring (Mar-May)' }),
      createMockSeasonalFlow({ season: 'Summer (Jun-Aug)', flowRate: '800-1,200 CFS' }),
      createMockSeasonalFlow({ season: 'Fall (Sept-Oct)' }),
    ],
    accessPoints: [
      createMockAccessPoint({ name: 'Upper Launch', type: 'Put-in' }),
      createMockAccessPoint({ name: 'Mid-River Access', type: 'Emergency exit' }),
      createMockAccessPoint({ name: 'Lower Landing', type: 'Take-out' }),
    ],
    safety: [
      createMockSafety({ category: 'Required Equipment', importance: 'critical' }),
      createMockSafety({
        category: 'Hazards',
        items: ['Strong currents', 'Undercut rocks', 'Strainers', 'Cold water'],
        importance: 'high',
      }),
    ],
    nearbyAttractions: [
      createMockNearbyAttraction({ name: 'State Park', distance: '3 miles' }),
      createMockNearbyAttraction({ name: 'Historic Town', distance: '10 miles' }),
    ],
    gearList: [
      createMockGearItem({ name: 'Whitewater kayak or raft', optional: false }),
      createMockGearItem({ name: 'Paddle', optional: false }),
      createMockGearItem({ name: 'PFD (Type III or V)', optional: false }),
      createMockGearItem({ name: 'Helmet', optional: false }),
      createMockGearItem({ name: 'Wetsuit/Drysuit', optional: false }),
      createMockGearItem({ name: 'Throw rope', optional: true }),
      createMockGearItem({ name: 'Dry bag', optional: true }),
      createMockGearItem({ name: 'First aid kit', optional: false }),
    ],
    relatedShop: [
      createMockRelatedCategory({ name: 'Water Sports', href: '/shop/water-sports' }),
      createMockRelatedCategory({ name: 'Fishing Gear', href: '/shop/fishing' }),
      createMockRelatedCategory({ name: 'Camping', href: '/shop/camping' }),
    ],

    // Optional metadata
    difficulty: 'challenging',
    bestSeason: 'spring',
    coordinates: {
      lat: 38.2345,
      lng: -80.8567,
    },
    mapUrl: 'https://maps.example.com/mock-river',
    waterLevelUrl: 'https://waterdata.usgs.gov/mock-river',

    // Apply any overrides
    ...overrides,
  };
}
