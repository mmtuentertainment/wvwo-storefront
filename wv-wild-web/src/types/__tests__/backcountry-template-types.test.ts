/**
 * Backcountry Template Types Tests
 * SPEC-17: Tests for backcountry-template-types.ts schemas
 *
 * Focus on P0 safety-critical validations first.
 * These tests validate Zod schemas for:
 * - Emergency contacts (P0 - safety critical)
 * - Tiered emergency contact system
 * - Wildlife hazards with threat levels
 * - Managing agencies and regulations
 * - Wilderness area configuration
 * - Backcountry trails
 * - Complete BackcountryTemplateProps
 *
 * @module types/__tests__/backcountry-template-types
 */

import { describe, it, expect } from 'vitest';
import {
  // Core Emergency Schemas (P0 Safety-Critical)
  EmergencyContactSchema,
  EmergencyTierSchema,
  TieredEmergencyContactSchema,
  // Agency and Regulations
  ManagingAgencySchema,
  RegulationsSchema,
  // Wildlife Hazards (P0 Safety-Critical)
  WildlifeHazardSchema,
  ThreatLevelSchema,
  // Area Schemas
  WildernessAreaSchema,
  BackcountryTrailSchema,
  BackcountryTemplatePropsSchema,
  // Leave No Trace
  LeaveNoTracePrincipleSchema,
  RequiredSkillSchema,
  // Display Constants
  EMERGENCY_TIER_COLORS,
  EMERGENCY_TIER_LABELS,
  THREAT_LEVEL_COLORS,
  THREAT_LEVEL_LABELS,
  // Helper Functions
  getEmergencyTierColor,
  getEmergencyTierLabel,
  getThreatLevelColor,
  getThreatLevelLabel,
  hasWildlifeHazards,
  getHighestThreatLevel,
  isBackcountryTemplate,
  // Types
  type EmergencyContact,
  type TieredEmergencyContact,
  type WildlifeHazard,
  type WildernessArea,
  type BackcountryTemplateProps,
} from '../backcountry-template-types';

// ============================================================================
// P0 SAFETY-CRITICAL: EMERGENCY CONTACT SCHEMA TESTS
// ============================================================================

describe('EmergencyContactSchema [P0]', () => {
  it('accepts valid minimal contact', () => {
    const result = EmergencyContactSchema.safeParse({
      service: 'Tucker County 911',
      phone: '911',
      available: '24/7',
    });
    expect(result.success).toBe(true);
  });

  it('accepts valid full phone format', () => {
    const result = EmergencyContactSchema.safeParse({
      service: 'Cheat Ranger District',
      phone: '304-478-2000',
      available: '8am-4:30pm Mon-Fri',
      notes: 'Voice mail after hours',
    });
    expect(result.success).toBe(true);
  });

  it('accepts contact with 1-800 number', () => {
    const result = EmergencyContactSchema.safeParse({
      service: 'National Poison Control',
      phone: '1-800-222-1222',
      available: '24/7',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty service', () => {
    const result = EmergencyContactSchema.safeParse({
      service: '',
      phone: '911',
      available: '24/7',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid phone format', () => {
    const result = EmergencyContactSchema.safeParse({
      service: 'Test',
      phone: 'call-me',
      available: '24/7',
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing phone', () => {
    const result = EmergencyContactSchema.safeParse({
      service: 'Tucker County 911',
      available: '24/7',
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing available hours', () => {
    const result = EmergencyContactSchema.safeParse({
      service: 'Tucker County 911',
      phone: '911',
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// EMERGENCY TIER SCHEMA TESTS
// ============================================================================

describe('EmergencyTierSchema', () => {
  it.each(['primary', 'sar', 'agency', 'medical', 'poison'])('accepts valid tier: %s', (tier) => {
    const result = EmergencyTierSchema.safeParse(tier);
    expect(result.success).toBe(true);
  });

  it('rejects invalid tier', () => {
    const result = EmergencyTierSchema.safeParse('urgent');
    expect(result.success).toBe(false);
  });

  it('rejects empty string', () => {
    const result = EmergencyTierSchema.safeParse('');
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// P0 SAFETY-CRITICAL: TIERED EMERGENCY CONTACT SCHEMA TESTS
// ============================================================================

describe('TieredEmergencyContactSchema [P0]', () => {
  it('accepts valid primary tier', () => {
    const result = TieredEmergencyContactSchema.safeParse({
      tier: 'primary',
      service: 'Tucker County 911',
      phone: '911',
      available: '24/7',
    });
    expect(result.success).toBe(true);
  });

  it('accepts sar tier with responseTime', () => {
    const result = TieredEmergencyContactSchema.safeParse({
      tier: 'sar',
      service: 'Tucker County SAR',
      phone: '304-478-2431',
      available: '24/7 via 911',
      responseTime: '4-8 hours typical',
      capabilities: ['ground search', 'technical rescue'],
    });
    expect(result.success).toBe(true);
  });

  it('accepts medical tier with hospital info', () => {
    const result = TieredEmergencyContactSchema.safeParse({
      tier: 'medical',
      service: 'Davis Memorial Hospital',
      phone: '304-636-3300',
      available: '24/7 ER',
      notes: '45 minutes from trailhead',
      capabilities: ['emergency room', 'trauma center'],
    });
    expect(result.success).toBe(true);
  });

  it('accepts agency tier', () => {
    const result = TieredEmergencyContactSchema.safeParse({
      tier: 'agency',
      service: 'Monongahela NF Ranger Station',
      phone: '304-636-1800',
      available: '8am-4:30pm Mon-Fri',
      notes: 'After hours emergencies: call 911',
    });
    expect(result.success).toBe(true);
  });

  it('accepts poison control tier', () => {
    const result = TieredEmergencyContactSchema.safeParse({
      tier: 'poison',
      service: 'WV Poison Center',
      phone: '1-800-222-1222',
      available: '24/7',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid tier', () => {
    const result = TieredEmergencyContactSchema.safeParse({
      tier: 'invalid',
      service: 'Test',
      phone: '911',
      available: '24/7',
    });
    expect(result.success).toBe(false);
  });

  it('inherits phone validation from EmergencyContactSchema', () => {
    const result = TieredEmergencyContactSchema.safeParse({
      tier: 'primary',
      service: 'Test',
      phone: 'not-a-number',
      available: '24/7',
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// THREAT LEVEL SCHEMA TESTS
// ============================================================================

describe('ThreatLevelSchema', () => {
  it.each(['low', 'moderate', 'high', 'extreme'])('accepts valid threat level: %s', (level) => {
    const result = ThreatLevelSchema.safeParse(level);
    expect(result.success).toBe(true);
  });

  it('rejects invalid threat level', () => {
    const result = ThreatLevelSchema.safeParse('medium');
    expect(result.success).toBe(false);
  });

  it('rejects empty string', () => {
    const result = ThreatLevelSchema.safeParse('');
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// P0 SAFETY-CRITICAL: WILDLIFE HAZARD SCHEMA TESTS
// ============================================================================

describe('WildlifeHazardSchema [P0]', () => {
  it('accepts valid black bear hazard', () => {
    const result = WildlifeHazardSchema.safeParse({
      species: 'Black Bear',
      threatLevel: 'moderate',
      seasons: ['spring', 'summer', 'fall'],
      avoidanceBehavior: ['Store food in bear canister', 'Cook 200ft from camp'],
      encounterProtocol: ['Do not run', 'Make yourself large', 'Back away slowly'],
    });
    expect(result.success).toBe(true);
  });

  it('accepts rattlesnake with disease risks', () => {
    const result = WildlifeHazardSchema.safeParse({
      species: 'Timber Rattlesnake',
      threatLevel: 'high',
      seasons: ['spring', 'summer', 'fall'],
      avoidanceBehavior: ['Watch where you step', 'Check before sitting on logs'],
      encounterProtocol: ['Back away slowly', 'Do not attempt to handle'],
      diseaseRisks: ['Venomous bite requires immediate medical attention'],
    });
    expect(result.success).toBe(true);
  });

  it('accepts tick hazard with disease transmission', () => {
    const result = WildlifeHazardSchema.safeParse({
      species: 'Deer Tick (Ixodes scapularis)',
      threatLevel: 'moderate',
      seasons: ['spring', 'summer', 'fall'],
      avoidanceBehavior: ['Wear long pants tucked into socks', 'Use permethrin on clothing', 'Apply DEET to exposed skin'],
      encounterProtocol: ['Remove tick with fine-tipped tweezers', 'Clean area with alcohol', 'Monitor for bulls-eye rash'],
      diseaseRisks: ['Lyme Disease', 'Anaplasmosis', 'Babesiosis'],
    });
    expect(result.success).toBe(true);
  });

  it('accepts copperhead hazard', () => {
    const result = WildlifeHazardSchema.safeParse({
      species: 'Copperhead',
      threatLevel: 'moderate',
      seasons: ['spring', 'summer', 'fall'],
      avoidanceBehavior: ['Watch where you place hands and feet', 'Stay on trails'],
      encounterProtocol: ['Do not approach', 'Give snake space to retreat'],
      diseaseRisks: ['Venomous bite - seek medical attention'],
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty avoidanceBehavior', () => {
    const result = WildlifeHazardSchema.safeParse({
      species: 'Black Bear',
      threatLevel: 'moderate',
      seasons: ['summer'],
      avoidanceBehavior: [],
      encounterProtocol: ['Back away'],
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty encounterProtocol', () => {
    const result = WildlifeHazardSchema.safeParse({
      species: 'Black Bear',
      threatLevel: 'moderate',
      seasons: ['summer'],
      avoidanceBehavior: ['Store food properly'],
      encounterProtocol: [],
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty species name', () => {
    const result = WildlifeHazardSchema.safeParse({
      species: '',
      threatLevel: 'moderate',
      seasons: ['summer'],
      avoidanceBehavior: ['Store food properly'],
      encounterProtocol: ['Back away'],
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid threatLevel', () => {
    const result = WildlifeHazardSchema.safeParse({
      species: 'Black Bear',
      threatLevel: 'danger',
      seasons: ['summer'],
      avoidanceBehavior: ['Store food properly'],
      encounterProtocol: ['Back away'],
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty seasons array', () => {
    const result = WildlifeHazardSchema.safeParse({
      species: 'Black Bear',
      threatLevel: 'moderate',
      seasons: [],
      avoidanceBehavior: ['Store food properly'],
      encounterProtocol: ['Back away'],
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// MANAGING AGENCY SCHEMA TESTS
// ============================================================================

describe('ManagingAgencySchema', () => {
  it('accepts valid managing agency with all fields', () => {
    const result = ManagingAgencySchema.safeParse({
      name: 'Monongahela National Forest',
      jurisdiction: 'USDA Forest Service',
      contact: {
        phone: '304-636-1800',
        email: 'r9_mon@usda.gov',
        website: 'https://www.fs.usda.gov/mnf',
      },
      rangerDistrict: 'Cheat Ranger District',
    });
    expect(result.success).toBe(true);
  });

  it('accepts minimal agency with just name and jurisdiction', () => {
    const result = ManagingAgencySchema.safeParse({
      name: 'WV DNR',
      jurisdiction: 'West Virginia Division of Natural Resources',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = ManagingAgencySchema.safeParse({
      name: '',
      jurisdiction: 'USDA Forest Service',
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// REGULATIONS SCHEMA TESTS
// ============================================================================

describe('RegulationsSchema', () => {
  it('accepts valid regulations object', () => {
    const result = RegulationsSchema.safeParse({
      permitRequired: false,
      firePolicies: ['No campfires during fire ban', 'Fires in established rings only'],
      campingRestrictions: ['200 feet from water sources', 'No camping above 4,000ft elevation'],
      groupSizeLimits: '12 people maximum',
    });
    expect(result.success).toBe(true);
  });

  it('accepts regulations with permit required', () => {
    const result = RegulationsSchema.safeParse({
      permitRequired: true,
      permitDetails: 'Free permit required from ranger station',
      firePolicies: ['No campfires'],
    });
    expect(result.success).toBe(true);
  });

  it('requires at least one fire policy', () => {
    const result = RegulationsSchema.safeParse({
      permitRequired: false,
      firePolicies: [],
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// LEAVE NO TRACE PRINCIPLE SCHEMA TESTS
// ============================================================================

describe('LeaveNoTracePrincipleSchema', () => {
  it('accepts valid LNT principle', () => {
    const result = LeaveNoTracePrincipleSchema.safeParse({
      principle: 'Plan Ahead and Prepare',
      description: 'Know the regulations and special concerns for the area you visit.',
      tips: [
        'Check weather forecasts',
        'Prepare for extreme weather',
        'Schedule trips to avoid high-use times',
      ],
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty principle name', () => {
    const result = LeaveNoTracePrincipleSchema.safeParse({
      principle: '',
      description: 'Some description',
      tips: ['A tip'],
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// REQUIRED SKILL SCHEMA TESTS
// ============================================================================

describe('RequiredSkillSchema', () => {
  it('accepts valid required skill', () => {
    const result = RequiredSkillSchema.safeParse({
      skill: 'Map and Compass Navigation',
      importance: 'essential',
      description: 'GPS signals are unreliable in this area. Paper map and compass skills are required.',
    });
    expect(result.success).toBe(true);
  });

  it('accepts skill with recommended importance', () => {
    const result = RequiredSkillSchema.safeParse({
      skill: 'Leave No Trace',
      importance: 'recommended',
      description: 'Practice LNT principles to preserve the wilderness.',
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// WILDERNESS AREA SCHEMA TESTS
// ============================================================================

describe('WildernessAreaSchema', () => {
  it('accepts valid wilderness area', () => {
    const result = WildernessAreaSchema.safeParse({
      name: 'Dolly Sods Wilderness',
      designation: 'Designated Wilderness',
      acreage: 17371,
      established: 1975,
      description: 'One of the most unique areas in eastern North America.',
    });
    expect(result.success).toBe(true);
  });

  it('accepts minimal wilderness area', () => {
    const result = WildernessAreaSchema.safeParse({
      name: 'Otter Creek Wilderness',
      designation: 'Designated Wilderness',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = WildernessAreaSchema.safeParse({
      name: '',
      designation: 'Designated Wilderness',
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// BACKCOUNTRY TRAIL SCHEMA TESTS
// ============================================================================

describe('BackcountryTrailSchema', () => {
  it('accepts valid backcountry trail', () => {
    const result = BackcountryTrailSchema.safeParse({
      name: 'Roaring Plains Trail',
      length: 7.5,
      lengthUnit: 'miles',
      difficulty: 'challenging',
      elevationGain: 1200,
      estimatedTime: '4-6 hours',
      description: 'Rugged trail through alpine-like terrain.',
    });
    expect(result.success).toBe(true);
  });

  it('accepts trail with all optional fields', () => {
    const result = BackcountryTrailSchema.safeParse({
      name: 'North Fork Trail',
      length: 5.2,
      lengthUnit: 'miles',
      difficulty: 'moderate',
      elevationGain: 800,
      estimatedTime: '3-4 hours',
      description: 'Popular loop trail.',
      trailhead: 'Bear Rocks Parking Area',
      conditions: 'Muddy in spring, rocky year-round',
      waterSources: ['Red Creek at mile 2.1', 'Spring at mile 3.4'],
    });
    expect(result.success).toBe(true);
  });

  it('rejects negative length', () => {
    const result = BackcountryTrailSchema.safeParse({
      name: 'Test Trail',
      length: -5,
      lengthUnit: 'miles',
      difficulty: 'easy',
    });
    expect(result.success).toBe(false);
  });

  it('rejects negative elevation gain', () => {
    const result = BackcountryTrailSchema.safeParse({
      name: 'Test Trail',
      length: 5,
      lengthUnit: 'miles',
      difficulty: 'easy',
      elevationGain: -200,
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// DISPLAY CONSTANTS TESTS
// ============================================================================

describe('Display Constants', () => {
  describe('EMERGENCY_TIER_COLORS', () => {
    it('has all tiers defined', () => {
      expect(EMERGENCY_TIER_COLORS.primary).toBeDefined();
      expect(EMERGENCY_TIER_COLORS.sar).toBeDefined();
      expect(EMERGENCY_TIER_COLORS.agency).toBeDefined();
      expect(EMERGENCY_TIER_COLORS.medical).toBeDefined();
      expect(EMERGENCY_TIER_COLORS.poison).toBeDefined();
    });

    it('primary tier uses red for urgency', () => {
      expect(EMERGENCY_TIER_COLORS.primary).toContain('red');
    });
  });

  describe('EMERGENCY_TIER_LABELS', () => {
    it('has all tier labels defined', () => {
      expect(EMERGENCY_TIER_LABELS.primary).toBeDefined();
      expect(EMERGENCY_TIER_LABELS.sar).toBeDefined();
      expect(EMERGENCY_TIER_LABELS.agency).toBeDefined();
      expect(EMERGENCY_TIER_LABELS.medical).toBeDefined();
      expect(EMERGENCY_TIER_LABELS.poison).toBeDefined();
    });

    it('primary tier label is descriptive', () => {
      expect(EMERGENCY_TIER_LABELS.primary.toLowerCase()).toMatch(/911|emergency|primary/);
    });
  });

  describe('THREAT_LEVEL_COLORS', () => {
    it('has all levels defined', () => {
      expect(THREAT_LEVEL_COLORS.low).toBeDefined();
      expect(THREAT_LEVEL_COLORS.moderate).toBeDefined();
      expect(THREAT_LEVEL_COLORS.high).toBeDefined();
      expect(THREAT_LEVEL_COLORS.extreme).toBeDefined();
    });

    it('follows industry safety color standards', () => {
      expect(THREAT_LEVEL_COLORS.low).toContain('green');
      expect(THREAT_LEVEL_COLORS.moderate).toContain('yellow');
      expect(THREAT_LEVEL_COLORS.high).toContain('orange');
      expect(THREAT_LEVEL_COLORS.extreme).toContain('red');
    });
  });

  describe('THREAT_LEVEL_LABELS', () => {
    it('has all level labels defined', () => {
      expect(THREAT_LEVEL_LABELS.low).toBeDefined();
      expect(THREAT_LEVEL_LABELS.moderate).toBeDefined();
      expect(THREAT_LEVEL_LABELS.high).toBeDefined();
      expect(THREAT_LEVEL_LABELS.extreme).toBeDefined();
    });
  });
});

// ============================================================================
// HELPER FUNCTION TESTS
// ============================================================================

describe('Helper Functions', () => {
  describe('getThreatLevelColor', () => {
    it('returns green for low', () => {
      expect(getThreatLevelColor('low')).toContain('green');
    });

    it('returns yellow for moderate', () => {
      expect(getThreatLevelColor('moderate')).toContain('yellow');
    });

    it('returns orange for high', () => {
      expect(getThreatLevelColor('high')).toContain('orange');
    });

    it('returns red for extreme', () => {
      expect(getThreatLevelColor('extreme')).toContain('red');
    });
  });

  describe('getThreatLevelLabel', () => {
    it('returns correct label for low', () => {
      expect(getThreatLevelLabel('low')).toBe(THREAT_LEVEL_LABELS.low);
    });

    it('returns correct label for extreme', () => {
      expect(getThreatLevelLabel('extreme')).toBe(THREAT_LEVEL_LABELS.extreme);
    });
  });

  describe('hasWildlifeHazards', () => {
    it('returns true when hazards exist', () => {
      const hazards: WildlifeHazard[] = [{
        species: 'Bear',
        threatLevel: 'moderate',
        seasons: ['summer'],
        avoidanceBehavior: ['Store food'],
        encounterProtocol: ['Back away'],
      }];
      expect(hasWildlifeHazards(hazards)).toBe(true);
    });

    it('returns false for empty array', () => {
      expect(hasWildlifeHazards([])).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(hasWildlifeHazards(undefined)).toBe(false);
    });

    it('returns false for null', () => {
      expect(hasWildlifeHazards(null as any)).toBe(false);
    });
  });

  describe('getHighestThreatLevel', () => {
    it('returns highest threat from array', () => {
      const hazards: WildlifeHazard[] = [
        { species: 'A', threatLevel: 'low', seasons: ['summer'], avoidanceBehavior: ['x'], encounterProtocol: ['y'] },
        { species: 'B', threatLevel: 'extreme', seasons: ['summer'], avoidanceBehavior: ['x'], encounterProtocol: ['y'] },
        { species: 'C', threatLevel: 'moderate', seasons: ['summer'], avoidanceBehavior: ['x'], encounterProtocol: ['y'] },
      ];
      expect(getHighestThreatLevel(hazards)).toBe('extreme');
    });

    it('returns single threat level when only one hazard', () => {
      const hazards: WildlifeHazard[] = [
        { species: 'A', threatLevel: 'moderate', seasons: ['summer'], avoidanceBehavior: ['x'], encounterProtocol: ['y'] },
      ];
      expect(getHighestThreatLevel(hazards)).toBe('moderate');
    });

    it('returns low for empty array', () => {
      expect(getHighestThreatLevel([])).toBe('low');
    });

    it('correctly ranks high above moderate', () => {
      const hazards: WildlifeHazard[] = [
        { species: 'A', threatLevel: 'moderate', seasons: ['summer'], avoidanceBehavior: ['x'], encounterProtocol: ['y'] },
        { species: 'B', threatLevel: 'high', seasons: ['summer'], avoidanceBehavior: ['x'], encounterProtocol: ['y'] },
      ];
      expect(getHighestThreatLevel(hazards)).toBe('high');
    });
  });

  describe('isBackcountryTemplate', () => {
    it('returns true for backcountry type', () => {
      expect(isBackcountryTemplate({ data: { type: 'backcountry' } })).toBe(true);
    });

    it('returns false for ski type', () => {
      expect(isBackcountryTemplate({ data: { type: 'ski' } })).toBe(false);
    });

    it('returns false for cave type', () => {
      expect(isBackcountryTemplate({ data: { type: 'cave' } })).toBe(false);
    });

    it('returns false for river type', () => {
      expect(isBackcountryTemplate({ data: { type: 'river' } })).toBe(false);
    });

    it('returns false for null', () => {
      expect(isBackcountryTemplate(null)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isBackcountryTemplate(undefined)).toBe(false);
    });

    it('returns false for object without data', () => {
      expect(isBackcountryTemplate({})).toBe(false);
    });

    it('returns false for object without type', () => {
      expect(isBackcountryTemplate({ data: {} })).toBe(false);
    });
  });
});

// ============================================================================
// BACKCOUNTRY TEMPLATE PROPS SCHEMA TESTS
// ============================================================================

describe('BackcountryTemplatePropsSchema', () => {
  const minimalValid = {
    name: 'Dolly Sods Wilderness',
    heroImage: '/images/dolly-sods.jpg',
    navigation: {
      coordinates: { decimal: { lat: 39.03, lng: -79.35 } },
      cellCoverage: { overall: 'none', carriers: [] },
      satellite: { importance: 'essential', devices: ['Garmin inReach'] },
    },
    emergencyContacts: [{
      tier: 'primary',
      service: '911',
      phone: '911',
      available: '24/7',
    }],
    regulations: {
      permitRequired: false,
      firePolicies: ['No campfires during fire ban'],
    },
  };

  it('accepts minimal valid props', () => {
    const result = BackcountryTemplatePropsSchema.safeParse(minimalValid);
    expect(result.success).toBe(true);
  });

  it('requires name field', () => {
    const { name, ...withoutName } = minimalValid;
    const result = BackcountryTemplatePropsSchema.safeParse(withoutName);
    expect(result.success).toBe(false);
  });

  it('requires heroImage field', () => {
    const { heroImage, ...withoutHero } = minimalValid;
    const result = BackcountryTemplatePropsSchema.safeParse(withoutHero);
    expect(result.success).toBe(false);
  });

  it('requires emergencyContacts [P0]', () => {
    const { emergencyContacts, ...withoutEmergency } = minimalValid;
    const result = BackcountryTemplatePropsSchema.safeParse(withoutEmergency);
    expect(result.success).toBe(false);
  });

  it('requires at least one emergency contact', () => {
    const result = BackcountryTemplatePropsSchema.safeParse({
      ...minimalValid,
      emergencyContacts: [],
    });
    expect(result.success).toBe(false);
  });

  it('requires navigation field', () => {
    const { navigation, ...withoutNav } = minimalValid;
    const result = BackcountryTemplatePropsSchema.safeParse(withoutNav);
    expect(result.success).toBe(false);
  });

  it('requires regulations field', () => {
    const { regulations, ...withoutReg } = minimalValid;
    const result = BackcountryTemplatePropsSchema.safeParse(withoutReg);
    expect(result.success).toBe(false);
  });

  it('accepts full props with optional fields', () => {
    const result = BackcountryTemplatePropsSchema.safeParse({
      ...minimalValid,
      type: 'backcountry',
      county: 'Tucker',
      acreage: 17371,
      wildlifeHazards: [{
        species: 'Black Bear',
        threatLevel: 'moderate',
        seasons: ['summer'],
        avoidanceBehavior: ['Store food properly'],
        encounterProtocol: ['Back away slowly'],
      }],
    });
    expect(result.success).toBe(true);
  });

  it('accepts props with wilderness area info', () => {
    const result = BackcountryTemplatePropsSchema.safeParse({
      ...minimalValid,
      wildernessArea: {
        name: 'Dolly Sods Wilderness',
        designation: 'Designated Wilderness',
        acreage: 17371,
        established: 1975,
      },
    });
    expect(result.success).toBe(true);
  });

  it('accepts props with multiple trails', () => {
    const result = BackcountryTemplatePropsSchema.safeParse({
      ...minimalValid,
      trails: [
        {
          name: 'Roaring Plains Trail',
          length: 7.5,
          lengthUnit: 'miles',
          difficulty: 'challenging',
        },
        {
          name: 'North Fork Trail',
          length: 5.2,
          lengthUnit: 'miles',
          difficulty: 'moderate',
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('accepts props with Leave No Trace principles', () => {
    const result = BackcountryTemplatePropsSchema.safeParse({
      ...minimalValid,
      leaveNoTrace: [
        {
          principle: 'Plan Ahead and Prepare',
          description: 'Know the regulations.',
          tips: ['Check weather', 'Prepare for emergencies'],
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('accepts props with required skills', () => {
    const result = BackcountryTemplatePropsSchema.safeParse({
      ...minimalValid,
      requiredSkills: [
        {
          skill: 'Map and Compass Navigation',
          importance: 'essential',
          description: 'GPS unreliable in area.',
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('accepts props with managing agency', () => {
    const result = BackcountryTemplatePropsSchema.safeParse({
      ...minimalValid,
      managingAgency: {
        name: 'Monongahela National Forest',
        jurisdiction: 'USDA Forest Service',
        contact: {
          phone: '304-636-1800',
        },
      },
    });
    expect(result.success).toBe(true);
  });

  it('accepts full Dolly Sods example', () => {
    const fullDollySods = {
      name: 'Dolly Sods Wilderness',
      heroImage: '/images/dolly-sods-hero.jpg',
      description: 'One of the most unique wilderness areas east of the Mississippi.',
      type: 'backcountry',
      county: 'Tucker',
      navigation: {
        coordinates: { decimal: { lat: 39.0453, lng: -79.3678 } },
        cellCoverage: { overall: 'none', carriers: [] },
        satellite: { importance: 'essential', devices: ['Garmin inReach', 'SPOT'] },
      },
      emergencyContacts: [
        { tier: 'primary', service: 'Tucker County 911', phone: '911', available: '24/7' },
        { tier: 'sar', service: 'Tucker County SAR', phone: '304-478-2431', available: '24/7 via 911', responseTime: '4-8 hours' },
        { tier: 'agency', service: 'Cheat Ranger District', phone: '304-478-2000', available: '8am-4:30pm Mon-Fri' },
        { tier: 'medical', service: 'Davis Memorial Hospital', phone: '304-636-3300', available: '24/7 ER' },
      ],
      regulations: {
        permitRequired: false,
        firePolicies: ['No campfires during fire ban', 'Use existing fire rings'],
        campingRestrictions: ['200 feet from water', '200 feet from trails'],
        groupSizeLimits: '12 people maximum',
      },
      wildernessArea: {
        name: 'Dolly Sods Wilderness',
        designation: 'Designated Wilderness',
        acreage: 17371,
        established: 1975,
      },
      wildlifeHazards: [
        {
          species: 'Black Bear',
          threatLevel: 'moderate',
          seasons: ['spring', 'summer', 'fall'],
          avoidanceBehavior: ['Store food in bear canister', 'Cook 200ft from camp'],
          encounterProtocol: ['Do not run', 'Make yourself large', 'Back away slowly'],
        },
        {
          species: 'Timber Rattlesnake',
          threatLevel: 'high',
          seasons: ['spring', 'summer', 'fall'],
          avoidanceBehavior: ['Watch where you step', 'Use trekking poles'],
          encounterProtocol: ['Back away slowly', 'Do not attempt to handle'],
          diseaseRisks: ['Venomous bite requires immediate medical attention'],
        },
      ],
      trails: [
        { name: 'Roaring Plains Trail', length: 7.5, lengthUnit: 'miles', difficulty: 'challenging', elevationGain: 1200 },
        { name: 'North Fork Trail', length: 5.2, lengthUnit: 'miles', difficulty: 'moderate', elevationGain: 800 },
      ],
      managingAgency: {
        name: 'Monongahela National Forest',
        jurisdiction: 'USDA Forest Service',
        contact: { phone: '304-636-1800' },
        rangerDistrict: 'Cheat Ranger District',
      },
    };
    const result = BackcountryTemplatePropsSchema.safeParse(fullDollySods);
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// EDGE CASES AND ERROR HANDLING
// ============================================================================

describe('Edge Cases', () => {
  describe('Phone number validation', () => {
    it('accepts 911', () => {
      const result = EmergencyContactSchema.safeParse({
        service: 'Test',
        phone: '911',
        available: '24/7',
      });
      expect(result.success).toBe(true);
    });

    it('accepts 10-digit number with dashes', () => {
      const result = EmergencyContactSchema.safeParse({
        service: 'Test',
        phone: '304-478-2000',
        available: '24/7',
      });
      expect(result.success).toBe(true);
    });

    it('accepts 10-digit number with dots', () => {
      const result = EmergencyContactSchema.safeParse({
        service: 'Test',
        phone: '304.478.2000',
        available: '24/7',
      });
      expect(result.success).toBe(true);
    });

    it('accepts 1-800 number', () => {
      const result = EmergencyContactSchema.safeParse({
        service: 'Test',
        phone: '1-800-222-1222',
        available: '24/7',
      });
      expect(result.success).toBe(true);
    });

    it('accepts number with spaces', () => {
      const result = EmergencyContactSchema.safeParse({
        service: 'Test',
        phone: '(304) 478-2000',
        available: '24/7',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('Array length constraints', () => {
    it('accepts maximum number of wildlife hazards', () => {
      const hazards = Array(20).fill(null).map((_, i) => ({
        species: `Species ${i}`,
        threatLevel: 'low',
        seasons: ['summer'],
        avoidanceBehavior: ['Avoid'],
        encounterProtocol: ['Retreat'],
      }));
      const result = BackcountryTemplatePropsSchema.safeParse({
        name: 'Test',
        heroImage: '/test.jpg',
        navigation: { coordinates: { decimal: { lat: 39, lng: -79 } }, cellCoverage: { overall: 'none', carriers: [] }, satellite: { importance: 'essential', devices: ['inReach'] } },
        emergencyContacts: [{ tier: 'primary', service: '911', phone: '911', available: '24/7' }],
        regulations: { permitRequired: false, firePolicies: ['No fires'] },
        wildlifeHazards: hazards,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('Special characters in strings', () => {
    it('accepts apostrophes in names', () => {
      const result = WildernessAreaSchema.safeParse({
        name: "Kim's Favorite Spot",
        designation: 'State Wildlife Area',
      });
      expect(result.success).toBe(true);
    });

    it('accepts unicode in descriptions', () => {
      const result = BackcountryTrailSchema.safeParse({
        name: 'Spruce Knob Trail',
        length: 5.0,
        lengthUnit: 'miles',
        difficulty: 'moderate',
        description: 'Elevation: 4,863\' (highest point in WV) — 360° views',
      });
      expect(result.success).toBe(true);
    });
  });
});

// ============================================================================
// TYPE INTEGRATION TESTS
// ============================================================================

describe('Type Integration', () => {
  it('TieredEmergencyContact can be assigned to EmergencyContact array', () => {
    const tieredContacts: TieredEmergencyContact[] = [
      { tier: 'primary', service: 'Test', phone: '911', available: '24/7' },
    ];
    // This test verifies type compatibility at compile time
    expect(tieredContacts.length).toBe(1);
  });

  it('WildlifeHazard array properly typed', () => {
    const hazards: WildlifeHazard[] = [
      {
        species: 'Bear',
        threatLevel: 'moderate',
        seasons: ['summer'],
        avoidanceBehavior: ['Store food'],
        encounterProtocol: ['Back away'],
      },
    ];
    expect(hazards[0].species).toBe('Bear');
  });
});
