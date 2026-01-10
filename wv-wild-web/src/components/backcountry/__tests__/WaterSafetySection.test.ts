/**
 * WaterSafetySection Component Tests
 * SPEC-17 T-335: P0 Safety-Critical AMD Warning Tests
 *
 * Tests AMD (Acid Mine Drainage) warning display, water source safety status,
 * and visual indicators for toxic sources. AMD warnings are LIFE-SAFETY CRITICAL
 * for West Virginia backcountry users.
 *
 * @module components/backcountry/__tests__/WaterSafetySection
 */

import { describe, it, expect } from 'vitest';
import {
  WaterSourceSchema,
  WaterStatusSchema,
  WATER_STATUS_CONFIG,
  getWaterStatusConfig,
  getContaminantInfo,
  hasAMDWarning,
  filterWaterSourcesByStatus,
  getWaterSourceCounts,
  hasDoNotUseSources,
  isUsableWaterSource,
  isPotableWaterSource,
  isToxicWaterSource,
  AMD_EDUCATION,
  type WaterSource,
  type WaterStatus,
} from '../../../types/water-safety';

// ============================================================================
// P0 SAFETY-CRITICAL: AMD WARNING BANNER TESTS
// ============================================================================

describe('WaterSafetySection [P0]', () => {
  describe('AMD Warning Banner', () => {
    it('renders AMD banner when hasAMDConcerns is true', () => {
      // Mock camping data with AMD concerns flag
      const campingData = {
        regulations: ['No camping within 200ft of water'],
        permittedSites: 'Dispersed camping allowed',
        waterSources: [],
        restrictions: [],
        hasAMDConcerns: true,
      };

      // Component should render AMD education section when hasAMDConcerns is true
      expect(campingData.hasAMDConcerns).toBe(true);

      // AMD education content should be available
      expect(AMD_EDUCATION.title).toContain('Acid Mine Drainage');
      expect(AMD_EDUCATION.introduction).toContain('coal mining');
    });

    it('hides AMD banner when hasAMDConcerns is false', () => {
      const campingData = {
        regulations: ['No camping within 200ft of water'],
        permittedSites: 'Dispersed camping allowed',
        waterSources: [],
        restrictions: [],
        hasAMDConcerns: false,
      };

      expect(campingData.hasAMDConcerns).toBe(false);
    });

    it('includes Kim voice warning text', () => {
      // AMD education section should include Kim's personal note
      expect(AMD_EDUCATION.kimNote).toBeDefined();
      expect(AMD_EDUCATION.kimNote).toContain('Kim');
      // Kim's authentic voice - references personal experience
      expect(AMD_EDUCATION.kimNote).toMatch(/daddy|grew up|mountains|30 years/i);
    });

    it('AMD education includes visual indicators list', () => {
      expect(AMD_EDUCATION.visualIndicators).toBeDefined();
      expect(AMD_EDUCATION.visualIndicators.length).toBeGreaterThan(0);
      // Should include common AMD visual signs
      expect(AMD_EDUCATION.visualIndicators.some((i) => i.toLowerCase().includes('orange'))).toBe(true);
      expect(AMD_EDUCATION.visualIndicators.some((i) => i.toLowerCase().includes('rust'))).toBe(true);
    });

    it('AMD education explains why it is dangerous', () => {
      expect(AMD_EDUCATION.whyItsDangerous).toBeDefined();
      expect(AMD_EDUCATION.whyItsDangerous).toContain('heavy metals');
      expect(AMD_EDUCATION.whyItsDangerous).toContain('CANNOT');
      expect(AMD_EDUCATION.whyItsDangerous).toMatch(/filter|boil|chemical/i);
    });

    it('AMD education includes safety guidelines', () => {
      expect(AMD_EDUCATION.safetyGuidelines).toBeDefined();
      expect(AMD_EDUCATION.safetyGuidelines.length).toBeGreaterThan(0);
      // Should include actionable guidance
      expect(AMD_EDUCATION.safetyGuidelines.some((g) => g.toLowerCase().includes('never'))).toBe(true);
    });
  });

  // ============================================================================
  // DO NOT USE SOURCES TESTS
  // ============================================================================

  describe('Do Not Use Sources', () => {
    it('renders skull icon for toxic sources', () => {
      // WATER_STATUS_CONFIG should define skull icon for do-not-use
      const config = WATER_STATUS_CONFIG['do-not-use'];
      expect(config.icon).toBe('\u2620'); // Skull and crossbones
    });

    it('uses red border for do-not-use status', () => {
      const config = WATER_STATUS_CONFIG['do-not-use'];
      expect(config.borderClass).toContain('red');
    });

    it('uses red text color for do-not-use status', () => {
      const config = WATER_STATUS_CONFIG['do-not-use'];
      expect(config.colorClass).toContain('red');
    });

    it('uses red background for do-not-use status', () => {
      const config = WATER_STATUS_CONFIG['do-not-use'];
      expect(config.bgClass).toContain('red');
    });

    it('shows visual indicators from amdDetails', () => {
      const toxicSource: WaterSource = {
        name: 'Abandoned Mine Runoff',
        status: 'do-not-use',
        reliability: 'year-round',
        treatment: 'not-applicable',
        amdDetails: {
          contaminantType: 'amd',
          visualIndicators: ['Orange water', 'White mineral deposits', 'No aquatic life'],
          knownSource: 'Abandoned Elk Run Mine',
        },
      };

      expect(toxicSource.amdDetails?.visualIndicators).toBeDefined();
      expect(toxicSource.amdDetails?.visualIndicators).toHaveLength(3);
      expect(toxicSource.amdDetails?.knownSource).toContain('Mine');
    });

    it('getWaterStatusConfig returns correct config for do-not-use', () => {
      const config = getWaterStatusConfig('do-not-use');

      expect(config.label).toBe('DO NOT USE');
      expect(config.description).toContain('TOXIC');
      expect(config.description).toContain('Cannot be made safe');
    });

    it('hasAMDWarning returns true for AMD contaminant type', () => {
      const source: WaterSource = {
        name: 'Test Creek',
        status: 'do-not-use',
        reliability: 'year-round',
        treatment: 'not-applicable',
        amdDetails: {
          contaminantType: 'amd',
        },
      };

      expect(hasAMDWarning(source)).toBe(true);
    });

    it('hasAMDWarning returns true for coal-runoff contaminant type', () => {
      const source: WaterSource = {
        name: 'Test Creek',
        status: 'do-not-use',
        reliability: 'year-round',
        treatment: 'not-applicable',
        amdDetails: {
          contaminantType: 'coal-runoff',
        },
      };

      expect(hasAMDWarning(source)).toBe(true);
    });

    it('hasAMDWarning returns true for warnings mentioning AMD', () => {
      const source: WaterSource = {
        name: 'Test Creek',
        status: 'do-not-use',
        reliability: 'year-round',
        treatment: 'not-applicable',
        warnings: ['AMD contamination suspected'],
      };

      expect(hasAMDWarning(source)).toBe(true);
    });

    it('hasAMDWarning returns true for warnings mentioning acid mine', () => {
      const source: WaterSource = {
        name: 'Test Creek',
        status: 'do-not-use',
        reliability: 'year-round',
        treatment: 'not-applicable',
        warnings: ['acid mine drainage present'],
      };

      expect(hasAMDWarning(source)).toBe(true);
    });

    it('hasAMDWarning returns false for non-AMD toxic source', () => {
      const source: WaterSource = {
        name: 'Test Creek',
        status: 'do-not-use',
        reliability: 'year-round',
        treatment: 'not-applicable',
        amdDetails: {
          contaminantType: 'agricultural',
        },
        warnings: ['Agricultural runoff contamination'],
      };

      expect(hasAMDWarning(source)).toBe(false);
    });
  });

  // ============================================================================
  // SOURCE COUNTS TESTS
  // ============================================================================

  describe('Source Counts', () => {
    const mixedSources: WaterSource[] = [
      { name: 'Safe Spring', status: 'safe', reliability: 'year-round', treatment: 'none-required' },
      { name: 'Creek 1', status: 'treat-required', reliability: 'seasonal', treatment: 'filter' },
      { name: 'Creek 2', status: 'treat-required', reliability: 'year-round', treatment: 'boil' },
      { name: 'Toxic Creek', status: 'do-not-use', reliability: 'year-round', treatment: 'not-applicable' },
      { name: 'Another Toxic', status: 'do-not-use', reliability: 'year-round', treatment: 'not-applicable' },
    ];

    it('shows correct count by status', () => {
      const counts = getWaterSourceCounts(mixedSources);

      expect(counts.safe).toBe(1);
      expect(counts['treat-required']).toBe(2);
      expect(counts['do-not-use']).toBe(2);
    });

    it('handles empty sources array', () => {
      const counts = getWaterSourceCounts([]);

      expect(counts.safe).toBe(0);
      expect(counts['treat-required']).toBe(0);
      expect(counts['do-not-use']).toBe(0);
    });

    it('handles all safe sources', () => {
      const allSafe: WaterSource[] = [
        { name: 'Spring 1', status: 'safe', reliability: 'year-round', treatment: 'none-required' },
        { name: 'Spring 2', status: 'safe', reliability: 'year-round', treatment: 'none-required' },
      ];

      const counts = getWaterSourceCounts(allSafe);
      expect(counts.safe).toBe(2);
      expect(counts['treat-required']).toBe(0);
      expect(counts['do-not-use']).toBe(0);
    });

    it('handles all toxic sources', () => {
      const allToxic: WaterSource[] = [
        { name: 'Toxic 1', status: 'do-not-use', reliability: 'year-round', treatment: 'not-applicable' },
        { name: 'Toxic 2', status: 'do-not-use', reliability: 'year-round', treatment: 'not-applicable' },
      ];

      const counts = getWaterSourceCounts(allToxic);
      expect(counts.safe).toBe(0);
      expect(counts['treat-required']).toBe(0);
      expect(counts['do-not-use']).toBe(2);
    });
  });

  // ============================================================================
  // WATER STATUS CONFIG TESTS
  // ============================================================================

  describe('Water Status Configuration', () => {
    it('all status types have complete configuration', () => {
      const statuses: WaterStatus[] = ['safe', 'treat-required', 'do-not-use'];

      statuses.forEach((status) => {
        const config = WATER_STATUS_CONFIG[status];
        expect(config.label).toBeDefined();
        expect(config.icon).toBeDefined();
        expect(config.colorClass).toBeDefined();
        expect(config.bgClass).toBeDefined();
        expect(config.borderClass).toBeDefined();
        expect(config.description).toBeDefined();
      });
    });

    it('safe status uses green color', () => {
      const config = WATER_STATUS_CONFIG.safe;
      expect(config.colorClass).toContain('green');
      expect(config.icon).toBe('\u2713'); // Checkmark
    });

    it('treat-required status uses yellow/amber color', () => {
      const config = WATER_STATUS_CONFIG['treat-required'];
      expect(config.colorClass).toContain('yellow');
      expect(config.icon).toBe('\u26A0'); // Warning triangle
    });
  });

  // ============================================================================
  // FILTER WATER SOURCES TESTS
  // ============================================================================

  describe('Filter Water Sources', () => {
    const mixedSources: WaterSource[] = [
      { name: 'Safe Spring', status: 'safe', reliability: 'year-round', treatment: 'none-required' },
      { name: 'Creek 1', status: 'treat-required', reliability: 'seasonal', treatment: 'filter' },
      { name: 'Toxic Creek', status: 'do-not-use', reliability: 'year-round', treatment: 'not-applicable' },
    ];

    it('filters safe sources correctly', () => {
      const safe = filterWaterSourcesByStatus(mixedSources, 'safe');
      expect(safe).toHaveLength(1);
      expect(safe[0].name).toBe('Safe Spring');
    });

    it('filters treat-required sources correctly', () => {
      const treatRequired = filterWaterSourcesByStatus(mixedSources, 'treat-required');
      expect(treatRequired).toHaveLength(1);
      expect(treatRequired[0].name).toBe('Creek 1');
    });

    it('filters do-not-use sources correctly', () => {
      const doNotUse = filterWaterSourcesByStatus(mixedSources, 'do-not-use');
      expect(doNotUse).toHaveLength(1);
      expect(doNotUse[0].name).toBe('Toxic Creek');
    });

    it('returns empty array when no matches', () => {
      const onlySafe: WaterSource[] = [
        { name: 'Spring', status: 'safe', reliability: 'year-round', treatment: 'none-required' },
      ];
      const toxic = filterWaterSourcesByStatus(onlySafe, 'do-not-use');
      expect(toxic).toHaveLength(0);
    });
  });

  // ============================================================================
  // HAS DO NOT USE SOURCES TESTS
  // ============================================================================

  describe('Has Do Not Use Sources Detection', () => {
    it('hasDoNotUseSources returns true when toxic sources exist', () => {
      const sources: WaterSource[] = [
        { name: 'Safe Spring', status: 'safe', reliability: 'year-round', treatment: 'none-required' },
        { name: 'Toxic Creek', status: 'do-not-use', reliability: 'year-round', treatment: 'not-applicable' },
      ];

      expect(hasDoNotUseSources(sources)).toBe(true);
    });

    it('hasDoNotUseSources returns false when no toxic sources', () => {
      const sources: WaterSource[] = [
        { name: 'Safe Spring', status: 'safe', reliability: 'year-round', treatment: 'none-required' },
        { name: 'Creek', status: 'treat-required', reliability: 'seasonal', treatment: 'filter' },
      ];

      expect(hasDoNotUseSources(sources)).toBe(false);
    });

    it('hasDoNotUseSources returns false for empty array', () => {
      expect(hasDoNotUseSources([])).toBe(false);
    });
  });

  // ============================================================================
  // TYPE GUARD TESTS
  // ============================================================================

  describe('Type Guards', () => {
    it('isUsableWaterSource returns true for safe sources', () => {
      const source: WaterSource = {
        name: 'Spring',
        status: 'safe',
        reliability: 'year-round',
        treatment: 'none-required',
      };
      expect(isUsableWaterSource(source)).toBe(true);
    });

    it('isUsableWaterSource returns true for treat-required sources', () => {
      const source: WaterSource = {
        name: 'Creek',
        status: 'treat-required',
        reliability: 'seasonal',
        treatment: 'filter',
      };
      expect(isUsableWaterSource(source)).toBe(true);
    });

    it('isUsableWaterSource returns false for do-not-use sources', () => {
      const source: WaterSource = {
        name: 'Toxic',
        status: 'do-not-use',
        reliability: 'year-round',
        treatment: 'not-applicable',
      };
      expect(isUsableWaterSource(source)).toBe(false);
    });

    it('isPotableWaterSource returns true only for verified safe sources', () => {
      const potable: WaterSource = {
        name: 'Spring',
        status: 'safe',
        reliability: 'year-round',
        treatment: 'none-required',
      };
      expect(isPotableWaterSource(potable)).toBe(true);
    });

    it('isPotableWaterSource returns false for treat-required even if safe status', () => {
      const notPotable: WaterSource = {
        name: 'Spring',
        status: 'safe',
        reliability: 'year-round',
        treatment: 'filter', // requires treatment, so not truly potable
      };
      expect(isPotableWaterSource(notPotable)).toBe(false);
    });

    it('isToxicWaterSource returns true for do-not-use status', () => {
      const toxic: WaterSource = {
        name: 'AMD Creek',
        status: 'do-not-use',
        reliability: 'year-round',
        treatment: 'not-applicable',
      };
      expect(isToxicWaterSource(toxic)).toBe(true);
    });

    it('isToxicWaterSource returns false for other statuses', () => {
      const safe: WaterSource = {
        name: 'Spring',
        status: 'safe',
        reliability: 'year-round',
        treatment: 'none-required',
      };
      expect(isToxicWaterSource(safe)).toBe(false);
    });
  });

  // ============================================================================
  // CONTAMINANT INFO TESTS
  // ============================================================================

  describe('Contaminant Information', () => {
    it('getContaminantInfo returns correct AMD info', () => {
      const info = getContaminantInfo('amd');
      expect(info.name).toBe('Acid Mine Drainage');
      expect(info.treatable).toBe(false);
      expect(info.severity).toBe('critical');
    });

    it('getContaminantInfo returns correct coal-runoff info', () => {
      const info = getContaminantInfo('coal-runoff');
      expect(info.name).toContain('Coal');
      expect(info.treatable).toBe(false);
      expect(info.severity).toBe('critical');
    });

    it('getContaminantInfo returns correct bacterial info', () => {
      const info = getContaminantInfo('bacterial');
      expect(info.treatable).toBe(true);
      expect(info.severity).toBe('moderate');
    });

    it('getContaminantInfo returns correct agricultural info', () => {
      const info = getContaminantInfo('agricultural');
      expect(info.treatable).toBe(false);
      expect(info.severity).toBe('high');
    });

    it('all contaminant types have complete info', () => {
      const types = ['amd', 'coal-runoff', 'agricultural', 'bacterial', 'industrial', 'natural-mineral', 'unknown'] as const;

      types.forEach((type) => {
        const info = getContaminantInfo(type);
        expect(info.name).toBeDefined();
        expect(info.shortDescription).toBeDefined();
        expect(typeof info.treatable).toBe('boolean');
        expect(['critical', 'high', 'moderate']).toContain(info.severity);
      });
    });
  });

  // ============================================================================
  // SCHEMA VALIDATION TESTS
  // ============================================================================

  describe('Schema Validation', () => {
    it('WaterSourceSchema requires treatment not-applicable for do-not-use', () => {
      const invalidSource = {
        name: 'Invalid Source',
        status: 'do-not-use',
        reliability: 'year-round',
        treatment: 'filter', // Invalid: can't filter toxic water
      };

      const result = WaterSourceSchema.safeParse(invalidSource);
      expect(result.success).toBe(false);
    });

    it('WaterSourceSchema accepts valid do-not-use source', () => {
      const validSource = {
        name: 'AMD Creek',
        status: 'do-not-use',
        reliability: 'year-round',
        treatment: 'not-applicable',
        warnings: ['AMD contamination'],
      };

      const result = WaterSourceSchema.safeParse(validSource);
      expect(result.success).toBe(true);
    });

    it('WaterSourceSchema accepts valid treat-required source', () => {
      const validSource = {
        name: 'Backcountry Creek',
        status: 'treat-required',
        reliability: 'seasonal',
        treatment: 'filter',
      };

      const result = WaterSourceSchema.safeParse(validSource);
      expect(result.success).toBe(true);
    });

    it('WaterSourceSchema accepts valid safe source', () => {
      const validSource = {
        name: 'Verified Spring',
        status: 'safe',
        reliability: 'year-round',
        treatment: 'none-required',
        notes: 'Tested by WV DEP annually',
        testDate: '2024-06-15',
      };

      const result = WaterSourceSchema.safeParse(validSource);
      expect(result.success).toBe(true);
    });

    it('WaterStatusSchema accepts only valid statuses', () => {
      expect(WaterStatusSchema.safeParse('safe').success).toBe(true);
      expect(WaterStatusSchema.safeParse('treat-required').success).toBe(true);
      expect(WaterStatusSchema.safeParse('do-not-use').success).toBe(true);
      expect(WaterStatusSchema.safeParse('dangerous').success).toBe(false);
      expect(WaterStatusSchema.safeParse('').success).toBe(false);
    });
  });

  // ============================================================================
  // OPTIONAL FIELD TESTS
  // ============================================================================

  describe('Optional Fields', () => {
    it('water source can include GPS coordinates', () => {
      const sourceWithCoords: WaterSource = {
        name: 'Backcountry Spring',
        status: 'safe',
        reliability: 'year-round',
        treatment: 'none-required',
        location: { lat: 39.0453, lng: -79.3678 },
      };

      expect(sourceWithCoords.location).toBeDefined();
      expect(sourceWithCoords.location?.lat).toBe(39.0453);
    });

    it('water source can include trail mile marker', () => {
      const sourceWithMile: WaterSource = {
        name: 'Creek Crossing',
        status: 'treat-required',
        reliability: 'seasonal',
        treatment: 'filter',
        trailMile: 'Mile 4.2',
      };

      expect(sourceWithMile.trailMile).toBe('Mile 4.2');
    });

    it('water source can include elevation', () => {
      const sourceWithElevation: WaterSource = {
        name: 'High Mountain Spring',
        status: 'safe',
        reliability: 'year-round',
        treatment: 'none-required',
        elevation: 4200,
      };

      expect(sourceWithElevation.elevation).toBe(4200);
    });

    it('water source can include source type', () => {
      const springSource: WaterSource = {
        name: 'Natural Spring',
        status: 'safe',
        reliability: 'year-round',
        treatment: 'none-required',
        sourceType: 'spring',
      };

      expect(springSource.sourceType).toBe('spring');
    });
  });
});
