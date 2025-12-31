/**
 * Weather Hazards Schema Tests
 * SPEC-17: Validates quantified weather hazards Zod schemas
 *
 * Tests cover:
 * - Flash flood hazard validation (warningTime is critical)
 * - Lightning hazard validation
 * - Temperature by elevation validation
 * - Wind chill and hypothermia schemas
 * - Seasonal conditions validation
 * - Complete AdventureWeather integration
 * - Helper function behavior
 *
 * @module types/__tests__/weather-hazards.test
 */

import { describe, it, expect } from 'vitest';
import {
  // Schemas
  FlashFloodHazardSchema,
  LightningHazardSchema,
  TemperatureByElevationSchema,
  WindChillHazardSchema,
  HypothermiaRiskSchema,
  RapidOnsetEventSchema,
  WeatherHazardsSchema,
  SeasonalConditionsSchema,
  AdventureWeatherSchema,
  AvalancheHazardSchema,
  FireDangerHazardSchema,
  // Helper functions
  getHazardSeverityColor,
  getHazardSeverityLabel,
  getAvalancheDangerColor,
  getFireDangerColor,
  validateQuantifiedData,
  // Color constants
  HAZARD_SEVERITY_COLORS,
  AVALANCHE_DANGER_COLORS,
  FIRE_DANGER_COLORS,
  // Types
  type WeatherHazards,
  type SeasonalConditions,
} from '../weather-hazards';

// ============================================================================
// FLASH FLOOD HAZARD TESTS
// ============================================================================

describe('FlashFloodHazardSchema', () => {
  const validFlashFlood = {
    warningTime: '15-30 minutes',
    highRiskAreas: ['Narrow hollows below cliffs', 'Stream crossings', 'Canyon bottoms'],
    safeBehavior: [
      'Move to high ground immediately',
      'Never cross rising water',
      'Camp above high water marks',
    ],
  };

  it('validates complete flash flood hazard data', () => {
    const result = FlashFloodHazardSchema.safeParse(validFlashFlood);
    expect(result.success).toBe(true);
  });

  it('requires warningTime field', () => {
    const { warningTime, ...withoutWarning } = validFlashFlood;
    const result = FlashFloodHazardSchema.safeParse(withoutWarning);
    expect(result.success).toBe(false);
  });

  it('requires at least one high risk area', () => {
    const result = FlashFloodHazardSchema.safeParse({
      ...validFlashFlood,
      highRiskAreas: [],
    });
    expect(result.success).toBe(false);
  });

  it('accepts optional gauge URLs', () => {
    const result = FlashFloodHazardSchema.safeParse({
      ...validFlashFlood,
      gaugeUrls: ['https://waterdata.usgs.gov/nwis/uv?site_no=03189100'],
    });
    expect(result.success).toBe(true);
  });

  it('validates URL format for gauge URLs', () => {
    const result = FlashFloodHazardSchema.safeParse({
      ...validFlashFlood,
      gaugeUrls: ['not-a-url'],
    });
    expect(result.success).toBe(false);
  });

  it('accepts optional severity rating', () => {
    const result = FlashFloodHazardSchema.safeParse({
      ...validFlashFlood,
      currentSeverity: 'high',
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// LIGHTNING HAZARD TESTS
// ============================================================================

describe('LightningHazardSchema', () => {
  const validLightning = {
    peakHours: '2pm-6pm May-September',
    protocol: [
      'Descend from ridgelines by early afternoon',
      'Avoid isolated trees and rock outcrops',
      'Crouch low if caught in the open',
    ],
    exposedAreas: ['Spruce Knob summit', 'Open meadows', 'Ridgeline trails'],
  };

  it('validates complete lightning hazard data', () => {
    const result = LightningHazardSchema.safeParse(validLightning);
    expect(result.success).toBe(true);
  });

  it('requires peakHours field', () => {
    const { peakHours, ...withoutPeak } = validLightning;
    const result = LightningHazardSchema.safeParse(withoutPeak);
    expect(result.success).toBe(false);
  });

  it('requires at least one protocol step', () => {
    const result = LightningHazardSchema.safeParse({
      ...validLightning,
      protocol: [],
    });
    expect(result.success).toBe(false);
  });

  it('accepts optional quantified guidance', () => {
    const result = LightningHazardSchema.safeParse({
      ...validLightning,
      quantifiedGuidance: 'If thunder follows lightning by less than 30 seconds, take shelter.',
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// TEMPERATURE BY ELEVATION TESTS
// ============================================================================

describe('TemperatureByElevationSchema', () => {
  const validTemp = {
    baseTemp: '65°F at 2,000ft trailhead',
    dropPerThousandFeet: '3.5°F per 1000ft',
  };

  it('validates temperature by elevation data', () => {
    const result = TemperatureByElevationSchema.safeParse(validTemp);
    expect(result.success).toBe(true);
  });

  it('requires baseTemp field', () => {
    const { baseTemp, ...withoutBase } = validTemp;
    const result = TemperatureByElevationSchema.safeParse(withoutBase);
    expect(result.success).toBe(false);
  });

  it('requires dropPerThousandFeet field', () => {
    const { dropPerThousandFeet, ...withoutDrop } = validTemp;
    const result = TemperatureByElevationSchema.safeParse(withoutDrop);
    expect(result.success).toBe(false);
  });

  it('accepts optional summit estimate', () => {
    const result = TemperatureByElevationSchema.safeParse({
      ...validTemp,
      summitEstimate: 'Expect 50°F at Spruce Knob (4,863ft)',
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// WIND CHILL HAZARD TESTS
// ============================================================================

describe('WindChillHazardSchema', () => {
  const validWindChill = {
    threshold: '-10°F wind chill',
    guidance: 'Limit exposed skin time. Cover all extremities.',
  };

  it('validates wind chill hazard data', () => {
    const result = WindChillHazardSchema.safeParse(validWindChill);
    expect(result.success).toBe(true);
  });

  it('accepts optional frostbite onset time', () => {
    const result = WindChillHazardSchema.safeParse({
      ...validWindChill,
      frostbiteOnset: 'Frostbite possible in 30 minutes below -10°F wind chill',
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// HYPOTHERMIA RISK TESTS
// ============================================================================

describe('HypothermiaRiskSchema', () => {
  const validHypothermia = {
    seasons: ['Spring', 'Fall', 'Winter'],
    wetConditionWarning: 'Hypothermia possible at 50°F with wet clothing and wind.',
  };

  it('validates hypothermia risk data', () => {
    const result = HypothermiaRiskSchema.safeParse(validHypothermia);
    expect(result.success).toBe(true);
  });

  it('requires at least one season', () => {
    const result = HypothermiaRiskSchema.safeParse({
      ...validHypothermia,
      seasons: [],
    });
    expect(result.success).toBe(false);
  });

  it('accepts optional water temperature and immersion time', () => {
    const result = HypothermiaRiskSchema.safeParse({
      ...validHypothermia,
      waterTemperature: 'River water 45-55°F spring through fall',
      immersionTime: '10-15 minutes functional time in 50°F water',
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// RAPID ONSET EVENT TESTS
// ============================================================================

describe('RapidOnsetEventSchema', () => {
  const validEvent = {
    name: 'Mountain Fog',
    warningSigns: ['Clouds descending below ridgeline', 'Temperature drop', 'Increasing moisture'],
    onsetSpeed: 'Can develop in 15-30 minutes',
    responseActions: ['Stay on marked trail', 'Use compass/GPS navigation', 'Wait for clearing'],
  };

  it('validates rapid onset event data', () => {
    const result = RapidOnsetEventSchema.safeParse(validEvent);
    expect(result.success).toBe(true);
  });

  it('requires at least one warning sign', () => {
    const result = RapidOnsetEventSchema.safeParse({
      ...validEvent,
      warningSigns: [],
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// COMPLETE WEATHER HAZARDS SCHEMA TESTS
// ============================================================================

describe('WeatherHazardsSchema', () => {
  const validWeatherHazards: WeatherHazards = {
    flashFloods: {
      warningTime: '15-30 minutes',
      highRiskAreas: ['Narrow hollows', 'Stream crossings'],
      safeBehavior: ['Move to high ground', 'Never cross rising water'],
    },
    lightning: {
      peakHours: '2pm-6pm May-September',
      protocol: ['Descend from ridgelines by early afternoon'],
      exposedAreas: ['Spruce Knob summit', 'Open meadows'],
    },
    temperatureByElevation: {
      baseTemp: '65°F at 2,000ft trailhead',
      dropPerThousandFeet: '3.5°F per 1000ft',
    },
    rapidOnsetEvents: ['Mountain fog', 'Microbursts', 'Ice storms'],
  };

  it('validates complete weather hazards object', () => {
    const result = WeatherHazardsSchema.safeParse(validWeatherHazards);
    expect(result.success).toBe(true);
  });

  it('requires all core hazard sections', () => {
    const { flashFloods, ...withoutFlash } = validWeatherHazards;
    const result = WeatherHazardsSchema.safeParse(withoutFlash);
    expect(result.success).toBe(false);
  });

  it('requires at least one rapid onset event', () => {
    const result = WeatherHazardsSchema.safeParse({
      ...validWeatherHazards,
      rapidOnsetEvents: [],
    });
    expect(result.success).toBe(false);
  });

  it('accepts optional wind chill and hypothermia', () => {
    const result = WeatherHazardsSchema.safeParse({
      ...validWeatherHazards,
      windChill: {
        threshold: '-10°F wind chill',
        guidance: 'Limit exposure time',
      },
      hypothermiaRisk: {
        seasons: ['Spring', 'Winter'],
        wetConditionWarning: 'Hypothermia possible at 50°F with wet clothing',
      },
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// SEASONAL CONDITIONS TESTS
// ============================================================================

describe('SeasonalConditionsSchema', () => {
  const validSeasonal: SeasonalConditions = {
    season: 'Spring (March-May)',
    avgHighTemp: '55-70°F',
    avgLowTemp: '35-50°F',
    precipitationDays: 12,
    primaryHazards: ['Flash floods', 'Rapidly changing temperatures'],
    bestActivities: ['Hiking', 'Wildflower viewing', 'Fishing'],
  };

  it('validates complete seasonal conditions', () => {
    const result = SeasonalConditionsSchema.safeParse(validSeasonal);
    expect(result.success).toBe(true);
  });

  it('requires precipitation days to be non-negative', () => {
    const result = SeasonalConditionsSchema.safeParse({
      ...validSeasonal,
      precipitationDays: -5,
    });
    expect(result.success).toBe(false);
  });

  it('requires at least one primary hazard', () => {
    const result = SeasonalConditionsSchema.safeParse({
      ...validSeasonal,
      primaryHazards: [],
    });
    expect(result.success).toBe(false);
  });

  it('accepts optional snow depth and not recommended activities', () => {
    const result = SeasonalConditionsSchema.safeParse({
      ...validSeasonal,
      snowDepthRange: '0-6 inches at higher elevations',
      notRecommended: ['Backcountry camping without cold weather gear'],
    });
    expect(result.success).toBe(true);
  });

  it('accepts optional Kim note', () => {
    const result = SeasonalConditionsSchema.safeParse({
      ...validSeasonal,
      kimNote: 'Spring wildflowers peak mid-April up here. Worth the drive!',
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// AVALANCHE HAZARD TESTS
// ============================================================================

describe('AvalancheHazardSchema', () => {
  const validAvalanche = {
    applicableElevation: 'Above 4,000ft during winter',
    dangerSeason: 'December through March',
    commonProblems: ['Wind slab', 'Persistent slab'],
    safetyGuidelines: ['Check avalanche forecast before trips', 'Carry rescue equipment'],
  };

  it('validates avalanche hazard data', () => {
    const result = AvalancheHazardSchema.safeParse(validAvalanche);
    expect(result.success).toBe(true);
  });

  it('accepts optional forecast source', () => {
    const result = AvalancheHazardSchema.safeParse({
      ...validAvalanche,
      forecastSource: {
        name: 'West Virginia Avalanche Center',
        url: 'https://avalanche.org',
      },
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// FIRE DANGER HAZARD TESTS
// ============================================================================

describe('FireDangerHazardSchema', () => {
  const validFire = {
    restrictions: 'No open fires during high danger periods',
    peakSeason: 'Late summer through fall (August-October)',
    campfireRegulations: [
      'Use designated fire rings only',
      'Never leave fires unattended',
      'Ensure fires are fully extinguished',
    ],
  };

  it('validates fire danger hazard data', () => {
    const result = FireDangerHazardSchema.safeParse(validFire);
    expect(result.success).toBe(true);
  });

  it('requires at least one campfire regulation', () => {
    const result = FireDangerHazardSchema.safeParse({
      ...validFire,
      campfireRegulations: [],
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// ADVENTURE WEATHER INTEGRATION TESTS
// ============================================================================

describe('AdventureWeatherSchema', () => {
  const fullAdventureWeather = {
    weatherHazards: {
      flashFloods: {
        warningTime: '15-30 minutes',
        highRiskAreas: ['Narrow hollows'],
        safeBehavior: ['Move to high ground'],
      },
      lightning: {
        peakHours: '2pm-6pm May-September',
        protocol: ['Descend from ridgelines'],
        exposedAreas: ['Summit areas'],
      },
      temperatureByElevation: {
        baseTemp: '65°F at 2,000ft',
        dropPerThousandFeet: '3.5°F per 1000ft',
      },
      rapidOnsetEvents: ['Mountain fog'],
    },
    seasonalConditions: [
      {
        season: 'Spring',
        avgHighTemp: '55-70°F',
        avgLowTemp: '35-50°F',
        precipitationDays: 12,
        primaryHazards: ['Flash floods'],
        bestActivities: ['Hiking'],
      },
    ],
  };

  it('validates complete adventure weather object', () => {
    const result = AdventureWeatherSchema.safeParse(fullAdventureWeather);
    expect(result.success).toBe(true);
  });

  it('requires at least one seasonal condition', () => {
    const result = AdventureWeatherSchema.safeParse({
      ...fullAdventureWeather,
      seasonalConditions: [],
    });
    expect(result.success).toBe(false);
  });

  it('accepts optional climate overview and best time to visit', () => {
    const result = AdventureWeatherSchema.safeParse({
      ...fullAdventureWeather,
      climateOverview: 'Humid continental climate with cold winters and warm summers.',
      bestTimeToVisit: 'Late September through mid-October',
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// HELPER FUNCTION TESTS
// ============================================================================

describe('Helper Functions', () => {
  describe('getHazardSeverityColor', () => {
    it('returns correct color for each severity level', () => {
      expect(getHazardSeverityColor('low')).toBe(HAZARD_SEVERITY_COLORS.low);
      expect(getHazardSeverityColor('moderate')).toBe(HAZARD_SEVERITY_COLORS.moderate);
      expect(getHazardSeverityColor('high')).toBe(HAZARD_SEVERITY_COLORS.high);
      expect(getHazardSeverityColor('extreme')).toBe(HAZARD_SEVERITY_COLORS.extreme);
    });
  });

  describe('getHazardSeverityLabel', () => {
    it('returns correct label for each severity level', () => {
      expect(getHazardSeverityLabel('low')).toBe('Low Risk');
      expect(getHazardSeverityLabel('extreme')).toBe('Extreme Risk');
    });
  });

  describe('getAvalancheDangerColor', () => {
    it('returns industry-standard avalanche colors', () => {
      expect(getAvalancheDangerColor('low')).toContain('green');
      expect(getAvalancheDangerColor('moderate')).toContain('yellow');
      expect(getAvalancheDangerColor('considerable')).toContain('orange');
      expect(getAvalancheDangerColor('high')).toContain('red');
      expect(getAvalancheDangerColor('extreme')).toContain('black');
    });
  });

  describe('getFireDangerColor', () => {
    it('returns NFDRS-standard fire danger colors', () => {
      expect(getFireDangerColor('low')).toContain('green');
      expect(getFireDangerColor('moderate')).toContain('blue');
      expect(getFireDangerColor('high')).toContain('yellow');
      expect(getFireDangerColor('very_high')).toContain('orange');
      expect(getFireDangerColor('extreme')).toContain('red');
    });
  });

  describe('validateQuantifiedData', () => {
    it('returns true for properly quantified data', () => {
      const validData: WeatherHazards = {
        flashFloods: {
          warningTime: '15-30 minutes',
          highRiskAreas: ['Test area'],
          safeBehavior: ['Test behavior'],
        },
        lightning: {
          peakHours: '2pm-6pm May-September',
          protocol: ['Test protocol'],
          exposedAreas: ['Test area'],
        },
        temperatureByElevation: {
          baseTemp: '65°F at 2,000ft',
          dropPerThousandFeet: '3.5°F per 1000ft',
        },
        rapidOnsetEvents: ['Test event'],
      };
      expect(validateQuantifiedData(validData)).toBe(true);
    });

    it('returns false for vague/non-quantified data', () => {
      const vagueData: WeatherHazards = {
        flashFloods: {
          warningTime: 'Short notice', // No numbers
          highRiskAreas: ['Test area'],
          safeBehavior: ['Test behavior'],
        },
        lightning: {
          peakHours: 'Afternoon in summer', // No specific times
          protocol: ['Test protocol'],
          exposedAreas: ['Test area'],
        },
        temperatureByElevation: {
          baseTemp: 'Warm at valley floor',
          dropPerThousandFeet: 'Several degrees cooler higher up', // No numbers
        },
        rapidOnsetEvents: ['Test event'],
      };
      expect(validateQuantifiedData(vagueData)).toBe(false);
    });
  });
});

// ============================================================================
// COLOR CONSTANT TESTS (Industry Standards)
// ============================================================================

describe('Industry Standard Colors', () => {
  it('avalanche colors follow North American Public Avalanche Danger Scale', () => {
    // Green for low, Yellow for moderate, Orange for considerable, Red for high, Black for extreme
    expect(AVALANCHE_DANGER_COLORS.low).toContain('green');
    expect(AVALANCHE_DANGER_COLORS.moderate).toContain('yellow');
    expect(AVALANCHE_DANGER_COLORS.considerable).toContain('orange');
    expect(AVALANCHE_DANGER_COLORS.high).toContain('red');
    expect(AVALANCHE_DANGER_COLORS.extreme).toContain('black');
  });

  it('fire danger colors follow USFS NFDRS standard', () => {
    // Green for low, Blue for moderate, Yellow for high, Orange for very high, Red for extreme
    expect(FIRE_DANGER_COLORS.low).toContain('green');
    expect(FIRE_DANGER_COLORS.moderate).toContain('blue');
    expect(FIRE_DANGER_COLORS.high).toContain('yellow');
    expect(FIRE_DANGER_COLORS.very_high).toContain('orange');
    expect(FIRE_DANGER_COLORS.extreme).toContain('red');
  });
});
