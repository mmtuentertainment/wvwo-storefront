/**
 * Water Safety Schema Tests
 * SPEC-17: Comprehensive tests for AMD-aware water source schemas
 *
 * Tests cover:
 * - Zod schema validation
 * - AMD warning logic
 * - Helper function behavior
 * - Edge cases and safety constraints
 */

import { describe, it, expect } from 'vitest';
import {
  WaterSourceSchema,
  WaterStatusSchema,
  WaterReliabilitySchema,
  WaterTreatmentSchema,
  ContaminantTypeSchema,
  AMDWarningSchema,
  BackcountryCampingSchema,
  WATER_STATUS_CONFIG,
  WATER_RELIABILITY_LABELS,
  WATER_TREATMENT_LABELS,
  CONTAMINANT_INFO,
  AMD_EDUCATION,
  getWaterStatusConfig,
  getContaminantInfo,
  hasAMDWarning,
  filterWaterSourcesByStatus,
  getWaterSourceCounts,
  hasDoNotUseSources,
  isUsableWaterSource,
  isPotableWaterSource,
  isToxicWaterSource,
  type WaterSource,
  type WaterStatus,
} from '../water-safety';

// ============================================================================
// SCHEMA VALIDATION TESTS
// ============================================================================

describe('WaterStatusSchema', () => {
  it('accepts valid status values', () => {
    expect(WaterStatusSchema.parse('safe')).toBe('safe');
    expect(WaterStatusSchema.parse('treat-required')).toBe('treat-required');
    expect(WaterStatusSchema.parse('do-not-use')).toBe('do-not-use');
  });

  it('rejects invalid status values', () => {
    expect(() => WaterStatusSchema.parse('unsafe')).toThrow();
    expect(() => WaterStatusSchema.parse('caution')).toThrow();
    expect(() => WaterStatusSchema.parse('')).toThrow();
  });
});

describe('WaterReliabilitySchema', () => {
  it('accepts valid reliability values', () => {
    expect(WaterReliabilitySchema.parse('year-round')).toBe('year-round');
    expect(WaterReliabilitySchema.parse('seasonal')).toBe('seasonal');
    expect(WaterReliabilitySchema.parse('unreliable')).toBe('unreliable');
  });

  it('rejects invalid reliability values', () => {
    expect(() => WaterReliabilitySchema.parse('always')).toThrow();
    expect(() => WaterReliabilitySchema.parse('sometimes')).toThrow();
  });
});

describe('WaterTreatmentSchema', () => {
  it('accepts valid treatment values', () => {
    expect(WaterTreatmentSchema.parse('filter')).toBe('filter');
    expect(WaterTreatmentSchema.parse('chemical')).toBe('chemical');
    expect(WaterTreatmentSchema.parse('boil')).toBe('boil');
    expect(WaterTreatmentSchema.parse('uv')).toBe('uv');
    expect(WaterTreatmentSchema.parse('none-required')).toBe('none-required');
    expect(WaterTreatmentSchema.parse('not-applicable')).toBe('not-applicable');
  });

  it('rejects invalid treatment values', () => {
    expect(() => WaterTreatmentSchema.parse('purify')).toThrow();
    expect(() => WaterTreatmentSchema.parse('distill')).toThrow();
  });
});

describe('ContaminantTypeSchema', () => {
  it('accepts valid contaminant types', () => {
    expect(ContaminantTypeSchema.parse('amd')).toBe('amd');
    expect(ContaminantTypeSchema.parse('coal-runoff')).toBe('coal-runoff');
    expect(ContaminantTypeSchema.parse('agricultural')).toBe('agricultural');
    expect(ContaminantTypeSchema.parse('bacterial')).toBe('bacterial');
    expect(ContaminantTypeSchema.parse('industrial')).toBe('industrial');
    expect(ContaminantTypeSchema.parse('natural-mineral')).toBe('natural-mineral');
    expect(ContaminantTypeSchema.parse('unknown')).toBe('unknown');
  });
});

describe('AMDWarningSchema [P0]', () => {
  it('accepts valid AMD warning with all fields', () => {
    const warning = {
      contaminantType: 'amd',
      visualIndicators: ['Orange water', 'Rust deposits'],
      knownSource: 'Abandoned Elk Run Mine',
      distanceFromSource: '0.5 miles downstream',
      lastTested: '2024-06-15',
      testedBy: 'WV DEP',
    };
    expect(AMDWarningSchema.parse(warning)).toEqual(warning);
  });

  it('accepts minimal AMD warning', () => {
    const warning = { contaminantType: 'amd' };
    expect(AMDWarningSchema.parse(warning)).toEqual(warning);
  });
});

// ============================================================================
// WATER SOURCE SCHEMA TESTS
// ============================================================================

describe('WaterSourceSchema [P0]', () => {
  const validSafeSource: WaterSource = {
    name: 'Spruce Knob Spring',
    status: 'safe',
    reliability: 'year-round',
    treatment: 'none-required',
    notes: 'Verified potable spring at summit.',
  };

  const validTreatRequiredSource: WaterSource = {
    name: 'Otter Creek',
    status: 'treat-required',
    reliability: 'year-round',
    treatment: 'filter',
    sourceType: 'stream',
    notes: 'Clear-running mountain stream. Filter recommended.',
  };

  const validDoNotUseSource: WaterSource = {
    name: 'Blackwater Fork',
    status: 'do-not-use',
    reliability: 'year-round',
    treatment: 'not-applicable',
    warnings: [
      'AMD contamination from historic coal mining',
      'Orange/rust-colored water visible',
      'Heavy metal content exceeds safe limits',
    ],
    amdDetails: {
      contaminantType: 'amd',
      visualIndicators: ['Orange discoloration', 'Iron deposits on rocks'],
      knownSource: 'Thomas Coal Mine (abandoned 1952)',
      lastTested: '2024-03-10',
      testedBy: 'WV DEP',
    },
    notes: 'DO NOT DRINK - This water cannot be made safe.',
  };

  it('accepts valid safe water source', () => {
    expect(WaterSourceSchema.parse(validSafeSource)).toEqual(validSafeSource);
  });

  it('accepts valid treat-required water source', () => {
    expect(WaterSourceSchema.parse(validTreatRequiredSource)).toEqual(validTreatRequiredSource);
  });

  it('accepts valid do-not-use water source', () => {
    expect(WaterSourceSchema.parse(validDoNotUseSource)).toEqual(validDoNotUseSource);
  });

  it('requires name to be non-empty', () => {
    const invalid = { ...validSafeSource, name: '' };
    expect(() => WaterSourceSchema.parse(invalid)).toThrow();
  });

  it('enforces do-not-use sources have not-applicable treatment', () => {
    const invalid = {
      name: 'Bad Source',
      status: 'do-not-use',
      reliability: 'year-round',
      treatment: 'filter', // Should be not-applicable
    };
    expect(() => WaterSourceSchema.parse(invalid)).toThrow();
  });

  it('accepts optional location coordinates', () => {
    const withLocation = {
      ...validSafeSource,
      location: { lat: 38.9936, lng: -79.5328 },
    };
    expect(WaterSourceSchema.parse(withLocation).location).toEqual({
      lat: 38.9936,
      lng: -79.5328,
    });
  });

  it('accepts optional source type', () => {
    const withType = { ...validSafeSource, sourceType: 'spring' };
    expect(WaterSourceSchema.parse(withType).sourceType).toBe('spring');
  });

  it('accepts optional elevation', () => {
    const withElevation = { ...validSafeSource, elevation: 4861 };
    expect(WaterSourceSchema.parse(withElevation).elevation).toBe(4861);
  });

  it('rejects invalid source type', () => {
    const invalid = { ...validSafeSource, sourceType: 'ocean' };
    expect(() => WaterSourceSchema.parse(invalid)).toThrow();
  });
});

// ============================================================================
// BACKCOUNTRY CAMPING SCHEMA TESTS
// ============================================================================

describe('BackcountryCampingSchema', () => {
  it('accepts valid camping config with water sources', () => {
    const camping = {
      regulations: [
        'Camp 200 feet from water sources',
        'Fires in established rings only',
      ],
      permittedSites: 'Dispersed camping allowed throughout',
      waterSources: [
        {
          name: 'Red Creek',
          status: 'treat-required' as const,
          reliability: 'year-round' as const,
          treatment: 'filter' as const,
        },
      ],
      restrictions: ['No camping within 100 feet of trail'],
      hasAMDConcerns: true,
      waterSafetyAdvisory: 'This area has historic mining activity. Check all water sources.',
    };
    expect(BackcountryCampingSchema.parse(camping)).toBeDefined();
  });

  it('defaults hasAMDConcerns to false', () => {
    const camping = {
      regulations: ['Pack it in, pack it out'],
      permittedSites: 'Designated sites only',
      waterSources: [],
      restrictions: [],
    };
    expect(BackcountryCampingSchema.parse(camping).hasAMDConcerns).toBe(false);
  });
});

// ============================================================================
// DISPLAY CONFIG TESTS
// ============================================================================

describe('WATER_STATUS_CONFIG', () => {
  it('has config for all status types', () => {
    expect(WATER_STATUS_CONFIG.safe).toBeDefined();
    expect(WATER_STATUS_CONFIG['treat-required']).toBeDefined();
    expect(WATER_STATUS_CONFIG['do-not-use']).toBeDefined();
  });

  it('safe status has green color class', () => {
    expect(WATER_STATUS_CONFIG.safe.colorClass).toContain('green');
  });

  it('treat-required status has yellow/warning color class', () => {
    expect(WATER_STATUS_CONFIG['treat-required'].colorClass).toContain('yellow');
  });

  it('do-not-use status has red/danger color class', () => {
    expect(WATER_STATUS_CONFIG['do-not-use'].colorClass).toContain('red');
  });

  it('do-not-use has skull icon for maximum visibility', () => {
    expect(WATER_STATUS_CONFIG['do-not-use'].icon).toBe('\u2620');
  });
});

describe('CONTAMINANT_INFO', () => {
  it('marks AMD as critical and not treatable', () => {
    expect(CONTAMINANT_INFO.amd.severity).toBe('critical');
    expect(CONTAMINANT_INFO.amd.treatable).toBe(false);
  });

  it('marks coal-runoff as critical', () => {
    expect(CONTAMINANT_INFO['coal-runoff'].severity).toBe('critical');
    expect(CONTAMINANT_INFO['coal-runoff'].treatable).toBe(false);
  });

  it('marks bacterial as treatable', () => {
    expect(CONTAMINANT_INFO.bacterial.treatable).toBe(true);
    expect(CONTAMINANT_INFO.bacterial.severity).toBe('moderate');
  });
});

describe('AMD_EDUCATION', () => {
  it('has required educational content', () => {
    expect(AMD_EDUCATION.title).toContain('AMD');
    expect(AMD_EDUCATION.introduction.length).toBeGreaterThan(100);
    expect(AMD_EDUCATION.visualIndicators.length).toBeGreaterThan(3);
    expect(AMD_EDUCATION.safetyGuidelines.length).toBeGreaterThan(3);
  });

  it('includes Kim\'s personal note', () => {
    expect(AMD_EDUCATION.kimNote).toContain('Kim');
  });

  it('explains why filters don\'t work', () => {
    expect(AMD_EDUCATION.whyItsDangerous.toLowerCase()).toContain('filter');
    expect(AMD_EDUCATION.whyItsDangerous.toLowerCase()).toContain('cannot');
  });
});

// ============================================================================
// HELPER FUNCTION TESTS
// ============================================================================

describe('getWaterStatusConfig', () => {
  it('returns correct config for each status', () => {
    expect(getWaterStatusConfig('safe')).toBe(WATER_STATUS_CONFIG.safe);
    expect(getWaterStatusConfig('treat-required')).toBe(WATER_STATUS_CONFIG['treat-required']);
    expect(getWaterStatusConfig('do-not-use')).toBe(WATER_STATUS_CONFIG['do-not-use']);
  });
});

describe('getContaminantInfo', () => {
  it('returns correct info for each contaminant type', () => {
    expect(getContaminantInfo('amd').name).toBe('Acid Mine Drainage');
    expect(getContaminantInfo('bacterial').treatable).toBe(true);
  });
});

describe('hasAMDWarning [P0]', () => {
  it('returns true for AMD contaminant type', () => {
    const source: WaterSource = {
      name: 'Test Creek',
      status: 'do-not-use',
      reliability: 'year-round',
      treatment: 'not-applicable',
      amdDetails: { contaminantType: 'amd' },
    };
    expect(hasAMDWarning(source)).toBe(true);
  });

  it('returns true for coal-runoff contaminant type', () => {
    const source: WaterSource = {
      name: 'Test Creek',
      status: 'do-not-use',
      reliability: 'year-round',
      treatment: 'not-applicable',
      amdDetails: { contaminantType: 'coal-runoff' },
    };
    expect(hasAMDWarning(source)).toBe(true);
  });

  it('returns true for AMD-related warnings', () => {
    const source: WaterSource = {
      name: 'Test Creek',
      status: 'do-not-use',
      reliability: 'year-round',
      treatment: 'not-applicable',
      warnings: ['acid mine drainage contamination'],
    };
    expect(hasAMDWarning(source)).toBe(true);
  });

  it('returns true for mining-related warnings', () => {
    const source: WaterSource = {
      name: 'Test Creek',
      status: 'do-not-use',
      reliability: 'year-round',
      treatment: 'not-applicable',
      warnings: ['Runoff from historic mining operations'],
    };
    expect(hasAMDWarning(source)).toBe(true);
  });

  it('returns false for non-AMD sources', () => {
    const source: WaterSource = {
      name: 'Test Creek',
      status: 'treat-required',
      reliability: 'year-round',
      treatment: 'filter',
    };
    expect(hasAMDWarning(source)).toBe(false);
  });
});

describe('filterWaterSourcesByStatus', () => {
  const sources: WaterSource[] = [
    { name: 'Safe Spring', status: 'safe', reliability: 'year-round', treatment: 'none-required' },
    { name: 'Mountain Creek', status: 'treat-required', reliability: 'seasonal', treatment: 'filter' },
    { name: 'AMD River', status: 'do-not-use', reliability: 'year-round', treatment: 'not-applicable' },
    { name: 'Another Creek', status: 'treat-required', reliability: 'year-round', treatment: 'boil' },
  ];

  it('filters safe sources correctly', () => {
    const result = filterWaterSourcesByStatus(sources, 'safe');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Safe Spring');
  });

  it('filters treat-required sources correctly', () => {
    const result = filterWaterSourcesByStatus(sources, 'treat-required');
    expect(result).toHaveLength(2);
  });

  it('filters do-not-use sources correctly', () => {
    const result = filterWaterSourcesByStatus(sources, 'do-not-use');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('AMD River');
  });
});

describe('getWaterSourceCounts', () => {
  const sources: WaterSource[] = [
    { name: 'A', status: 'safe', reliability: 'year-round', treatment: 'none-required' },
    { name: 'B', status: 'treat-required', reliability: 'seasonal', treatment: 'filter' },
    { name: 'C', status: 'do-not-use', reliability: 'year-round', treatment: 'not-applicable' },
    { name: 'D', status: 'treat-required', reliability: 'year-round', treatment: 'boil' },
  ];

  it('returns correct counts', () => {
    const counts = getWaterSourceCounts(sources);
    expect(counts.safe).toBe(1);
    expect(counts['treat-required']).toBe(2);
    expect(counts['do-not-use']).toBe(1);
  });

  it('returns zeros for empty array', () => {
    const counts = getWaterSourceCounts([]);
    expect(counts.safe).toBe(0);
    expect(counts['treat-required']).toBe(0);
    expect(counts['do-not-use']).toBe(0);
  });
});

describe('hasDoNotUseSources', () => {
  it('returns true when do-not-use sources exist', () => {
    const sources: WaterSource[] = [
      { name: 'A', status: 'safe', reliability: 'year-round', treatment: 'none-required' },
      { name: 'B', status: 'do-not-use', reliability: 'year-round', treatment: 'not-applicable' },
    ];
    expect(hasDoNotUseSources(sources)).toBe(true);
  });

  it('returns false when no do-not-use sources', () => {
    const sources: WaterSource[] = [
      { name: 'A', status: 'safe', reliability: 'year-round', treatment: 'none-required' },
      { name: 'B', status: 'treat-required', reliability: 'seasonal', treatment: 'filter' },
    ];
    expect(hasDoNotUseSources(sources)).toBe(false);
  });
});

// ============================================================================
// TYPE GUARD TESTS
// ============================================================================

describe('isUsableWaterSource', () => {
  it('returns true for safe sources', () => {
    const source: WaterSource = {
      name: 'Test',
      status: 'safe',
      reliability: 'year-round',
      treatment: 'none-required',
    };
    expect(isUsableWaterSource(source)).toBe(true);
  });

  it('returns true for treat-required sources', () => {
    const source: WaterSource = {
      name: 'Test',
      status: 'treat-required',
      reliability: 'year-round',
      treatment: 'filter',
    };
    expect(isUsableWaterSource(source)).toBe(true);
  });

  it('returns false for do-not-use sources', () => {
    const source: WaterSource = {
      name: 'Test',
      status: 'do-not-use',
      reliability: 'year-round',
      treatment: 'not-applicable',
    };
    expect(isUsableWaterSource(source)).toBe(false);
  });
});

describe('isPotableWaterSource', () => {
  it('returns true only for safe sources with no treatment required', () => {
    const potable: WaterSource = {
      name: 'Spring',
      status: 'safe',
      reliability: 'year-round',
      treatment: 'none-required',
    };
    expect(isPotableWaterSource(potable)).toBe(true);
  });

  it('returns false for safe sources that still need treatment', () => {
    const source: WaterSource = {
      name: 'Creek',
      status: 'safe',
      reliability: 'year-round',
      treatment: 'filter', // Still needs treatment
    };
    expect(isPotableWaterSource(source)).toBe(false);
  });
});

describe('isToxicWaterSource [P0]', () => {
  it('returns true for do-not-use sources', () => {
    const source: WaterSource = {
      name: 'AMD Creek',
      status: 'do-not-use',
      reliability: 'year-round',
      treatment: 'not-applicable',
    };
    expect(isToxicWaterSource(source)).toBe(true);
  });

  it('returns false for usable sources', () => {
    const source: WaterSource = {
      name: 'Good Creek',
      status: 'treat-required',
      reliability: 'year-round',
      treatment: 'filter',
    };
    expect(isToxicWaterSource(source)).toBe(false);
  });
});

// ============================================================================
// REAL-WORLD WV WATER SOURCE EXAMPLES
// ============================================================================

describe('Real-World WV Water Source Examples', () => {
  it('validates Dolly Sods AMD-affected source', () => {
    const dollySodsAMD: WaterSource = {
      name: 'Red Creek (Lower Section)',
      status: 'do-not-use',
      reliability: 'year-round',
      treatment: 'not-applicable',
      warnings: [
        'AMD contamination from historic coal mining',
        'Orange/rust discoloration visible',
        'Heavy metal content exceeds EPA limits',
        'Water has been tested - do not consume',
      ],
      amdDetails: {
        contaminantType: 'amd',
        visualIndicators: [
          'Orange/rust-colored water',
          'Iron oxide deposits on streambed rocks',
          'White aluminum precipitate along banks',
        ],
        knownSource: 'Red Creek Coal Company mines (abandoned 1940s)',
        distanceFromSource: '2 miles downstream from abandoned portal',
        lastTested: '2024-08-15',
        testedBy: 'WV DEP Water Quality Division',
      },
      sourceType: 'stream',
      location: { lat: 39.0453, lng: -79.3678 },
      elevation: 3800,
      notes: 'Upper section above mine seeps is usable with treatment. This lower section is contaminated.',
    };

    expect(WaterSourceSchema.parse(dollySodsAMD)).toBeDefined();
    expect(hasAMDWarning(dollySodsAMD)).toBe(true);
    expect(isToxicWaterSource(dollySodsAMD)).toBe(true);
  });

  it('validates Otter Creek Wilderness clean source', () => {
    const otterCreek: WaterSource = {
      name: 'Otter Creek (Main Fork)',
      status: 'treat-required',
      reliability: 'year-round',
      treatment: 'filter',
      sourceType: 'stream',
      location: { lat: 38.9456, lng: -79.6234 },
      elevation: 2800,
      trailMile: 'Mile 3.2',
      notes: 'Clear mountain stream. Standard backcountry treatment required. Best water access on the Otter Creek Trail.',
    };

    expect(WaterSourceSchema.parse(otterCreek)).toBeDefined();
    expect(hasAMDWarning(otterCreek)).toBe(false);
    expect(isUsableWaterSource(otterCreek)).toBe(true);
  });

  it('validates Seneca Rocks verified spring', () => {
    const senecaSpring: WaterSource = {
      name: 'Seneca Rocks Visitor Center Spring',
      status: 'safe',
      reliability: 'year-round',
      treatment: 'none-required',
      sourceType: 'spring',
      location: { lat: 38.8344, lng: -79.3718 },
      testDate: '2024-01-15',
      notes: 'Regularly tested potable spring at visitor center. Fill up here before heading into wilderness.',
    };

    expect(WaterSourceSchema.parse(senecaSpring)).toBeDefined();
    expect(isPotableWaterSource(senecaSpring)).toBe(true);
  });
});
