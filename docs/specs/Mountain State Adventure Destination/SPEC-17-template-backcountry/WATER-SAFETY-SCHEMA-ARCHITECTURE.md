# SPEC-17: Water Source Safety Schema Architecture

**Status**: Complete
**Module**: `wv-wild-web/src/types/water-safety.ts`
**Tests**: `wv-wild-web/src/types/__tests__/water-safety.test.ts` (55 tests passing)

---

## Executive Summary

This document describes the comprehensive water source safety schema system designed for West Virginia backcountry adventures. The schema addresses the critical life-safety issue of **Acid Mine Drainage (AMD)** contamination from historic coal mining operations.

### Why This Matters

West Virginia has over 150 years of coal mining history, leaving thousands of abandoned mines. AMD contamination:

- **Cannot be filtered** - Heavy metals are dissolved at the molecular level
- **Cannot be boiled away** - Metals remain after boiling
- **Cannot be chemically treated** - Iodine and chlorine dioxide have no effect
- **Cannot be UV purified** - UV only kills pathogens, not dissolved metals

A "do-not-use" water source designation is **LIFE SAFETY CRITICAL**.

---

## Schema Overview

### Previous SPEC-17 Schema (Insufficient)

```typescript
waterSources: {
  name: string;
  reliability: string;
  treatment: string;
}[]
```

**Problems:**
1. No safety status field
2. No "do-not-use" designation
3. No AMD warning system
4. No location tracking for contaminated sources
5. No educational content for visitors

### New Water Safety Schema (Complete)

```typescript
import { WaterSourceSchema, type WaterSource } from '../types/water-safety';

const waterSource: WaterSource = {
  // REQUIRED FIELDS
  name: string;                    // "Red Creek (Lower Section)"
  status: WaterStatus;             // 'safe' | 'treat-required' | 'do-not-use'
  reliability: WaterReliability;   // 'year-round' | 'seasonal' | 'unreliable'
  treatment: WaterTreatment;       // 'filter' | 'chemical' | 'boil' | 'uv' | 'none-required' | 'not-applicable'

  // CONDITIONAL FIELDS (required for do-not-use sources)
  warnings?: string[];             // ['AMD contamination', 'Orange water visible']
  amdDetails?: AMDWarning;         // Detailed contamination info

  // OPTIONAL FIELDS
  testDate?: string;               // ISO 8601 date of last water quality test
  location?: Coordinates;          // GPS coordinates for mapping
  sourceType?: SourceType;         // 'stream' | 'river' | 'spring' | 'lake' | 'pond' | 'seep' | 'well'
  notes?: string;                  // Kim's wisdom, access notes
  elevation?: number;              // Elevation in feet
  trailMile?: string;              // Trail mile marker
  distanceFromTrailhead?: string;  // Distance from trailhead
}
```

---

## Status Color Coding (UI)

Colors follow danger/safety conventions that **override WVWO brand palette** per CLAUDE.md industry standards policy.

| Status | Color | Icon | Tailwind Classes | Usage |
|--------|-------|------|------------------|-------|
| `safe` | Green | Check (\u2713) | `text-sign-green bg-sign-green/10 border-sign-green` | Verified potable sources (rare) |
| `treat-required` | Yellow | Warning (\u26A0) | `text-yellow-600 bg-yellow-50 border-yellow-500` | Standard backcountry sources |
| `do-not-use` | Red | Skull (\u2620) | `text-red-700 bg-red-50 border-red-700` | AMD/toxic contamination |

### Visual Hierarchy

1. **do-not-use** sources render with high-contrast danger styling
2. **Critical warning banner** appears at top of water section when any do-not-use sources exist
3. **AMD education section** appears when `hasAMDConcerns: true` or do-not-use sources present
4. **Safe sources** are de-emphasized (not the default expectation in WV backcountry)

---

## AMD Warning System

### ContaminantType Enum

```typescript
type ContaminantType =
  | 'amd'              // Acid Mine Drainage (most common in WV)
  | 'coal-runoff'      // Coal processing contamination
  | 'agricultural'     // Farm runoff, pesticides
  | 'bacterial'        // E. coli, giardia (TREATABLE)
  | 'industrial'       // Non-mining industrial pollution
  | 'natural-mineral'  // High natural mineral content (usually safe)
  | 'unknown';         // Suspected contamination, unconfirmed
```

### Severity Levels

| Contaminant | Severity | Treatable | Action |
|-------------|----------|-----------|--------|
| `amd` | Critical | NO | Do not use under any circumstances |
| `coal-runoff` | Critical | NO | Do not use under any circumstances |
| `industrial` | Critical | NO | Do not use under any circumstances |
| `agricultural` | High | NO | Avoid, especially during/after rain |
| `unknown` | High | NO | Treat as unsafe until confirmed |
| `natural-mineral` | Moderate | YES | May have metallic taste, generally safe |
| `bacterial` | Moderate | YES | Standard filtration/boiling effective |

---

## AMD Educational Content

The schema includes `AMD_EDUCATION` constant with:

1. **Introduction** - Historical context of WV coal mining
2. **Visual Indicators** - How to spot AMD-contaminated water
   - Orange, red, or rust-colored water
   - White, gray, or yellow mineral deposits
   - Lack of aquatic life
   - Metallic or sulfur smell
   - Oily sheen
   - Dead vegetation along banks
3. **Why It's Dangerous** - Explanation of why treatment doesn't work
4. **Safety Guidelines** - Practical steps for visitors
5. **Kim's Note** - Authentic voice: "I grew up around these mountains..."

---

## Helper Functions

### Status Checks

```typescript
import {
  isUsableWaterSource,    // Returns true for safe OR treat-required
  isPotableWaterSource,   // Returns true ONLY for safe + none-required
  isToxicWaterSource,     // Returns true for do-not-use
  hasAMDWarning,          // Returns true if AMD/mining contamination
} from '../types/water-safety';
```

### Filtering & Counting

```typescript
import {
  filterWaterSourcesByStatus,  // Filter array by status
  getWaterSourceCounts,        // Get counts for each status
  hasDoNotUseSources,          // Check if danger warning needed
} from '../types/water-safety';

// Example: Get counts for summary badges
const counts = getWaterSourceCounts(sources);
// { safe: 1, 'treat-required': 5, 'do-not-use': 2 }

// Example: Check if critical warning banner needed
if (hasDoNotUseSources(sources)) {
  // Render prominent danger warning
}
```

### Display Configuration

```typescript
import {
  getWaterStatusConfig,   // Get colors, icons, labels for status
  getContaminantInfo,     // Get name, description, severity for contaminant
} from '../types/water-safety';

const config = getWaterStatusConfig('do-not-use');
// {
//   label: 'DO NOT USE',
//   icon: '\u2620',
//   colorClass: 'text-red-700',
//   bgClass: 'bg-red-50',
//   borderClass: 'border-red-700',
//   description: 'TOXIC - Cannot be made safe by any field treatment...'
// }
```

---

## Real-World WV Examples

### AMD-Contaminated Source (Dolly Sods)

```typescript
const redCreekAMD: WaterSource = {
  name: 'Red Creek (Lower Section)',
  status: 'do-not-use',
  reliability: 'year-round',
  treatment: 'not-applicable',
  warnings: [
    'AMD contamination from historic coal mining',
    'Orange/rust discoloration visible',
    'Heavy metal content exceeds EPA limits',
  ],
  amdDetails: {
    contaminantType: 'amd',
    visualIndicators: ['Orange/rust-colored water', 'Iron oxide deposits'],
    knownSource: 'Red Creek Coal Company mines (abandoned 1940s)',
    lastTested: '2024-08-15',
    testedBy: 'WV DEP',
  },
  sourceType: 'stream',
  location: { lat: 39.0453, lng: -79.3678 },
  notes: 'Upper section above mine seeps is usable. This lower section is contaminated.',
};
```

### Clean Backcountry Source (Otter Creek)

```typescript
const otterCreek: WaterSource = {
  name: 'Otter Creek (Main Fork)',
  status: 'treat-required',
  reliability: 'year-round',
  treatment: 'filter',
  sourceType: 'stream',
  location: { lat: 38.9456, lng: -79.6234 },
  trailMile: 'Mile 3.2',
  notes: 'Clear mountain stream. Standard backcountry treatment required.',
};
```

### Verified Potable Spring

```typescript
const senecaSpring: WaterSource = {
  name: 'Seneca Rocks Visitor Center Spring',
  status: 'safe',
  reliability: 'year-round',
  treatment: 'none-required',
  sourceType: 'spring',
  testDate: '2024-01-15',
  notes: 'Regularly tested potable spring at visitor center.',
};
```

---

## BackcountryCamping Schema Update

The `BackcountryCampingSchema` now uses the comprehensive water source schema:

```typescript
import { BackcountryCampingSchema } from '../types/water-safety';

const camping = {
  regulations: ['Camp 200 feet from water sources'],
  permittedSites: 'Dispersed camping allowed',
  waterSources: [/* WaterSource[] */],
  restrictions: ['No camping within 100 feet of trail'],
  hasAMDConcerns: true,  // Triggers AMD education section
  waterSafetyAdvisory: 'This area has historic mining. Check all water sources.',
};
```

---

## UI Implementation Guidelines

### Critical Warning Banner

When `hasDoNotUseSources(sources)` returns true, render:

```astro
<div class="border-l-4 border-l-red-700 bg-red-50 p-6 mb-8">
  <div class="flex items-center gap-3">
    <span class="text-3xl">\u2620</span>
    <div>
      <h3 class="font-display text-xl font-bold text-red-700">
        WATER SAFETY WARNING
      </h3>
      <p class="font-body text-red-900 mt-1">
        Some water sources in this area are contaminated with Acid Mine Drainage (AMD)
        and CANNOT be made safe by any field treatment method. Check individual source
        status before drinking.
      </p>
    </div>
  </div>
</div>
```

### Water Source Card

```astro
{sources.map(source => {
  const config = getWaterStatusConfig(source.status);
  return (
    <div class={`border-l-4 ${config.borderClass} ${config.bgClass} p-4`}>
      <div class="flex items-center gap-2 mb-2">
        <span class={`text-2xl ${config.colorClass}`}>{config.icon}</span>
        <h4 class="font-display font-bold text-brand-brown">{source.name}</h4>
      </div>
      <p class={`font-body text-sm font-bold ${config.colorClass}`}>
        {config.label}
      </p>
      {source.warnings && (
        <ul class="mt-2 space-y-1">
          {source.warnings.map(warning => (
            <li class="font-body text-sm text-red-800 flex items-start gap-2">
              <span class="text-red-700">\u26A0</span>
              <span>{warning}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
})}
```

---

## Validation Constraints

The schema enforces critical safety constraints via Zod refinements:

1. **do-not-use sources must have `treatment: 'not-applicable'`**
   - Prevents misleading users into thinking they can treat AMD water
   - Schema validation throws error if violated

2. **do-not-use sources should have warnings**
   - Console warning if warnings array is empty
   - Not a hard fail, but strongly encouraged

---

## File Locations

| File | Purpose |
|------|---------|
| `wv-wild-web/src/types/water-safety.ts` | Zod schemas, types, helper functions |
| `wv-wild-web/src/types/__tests__/water-safety.test.ts` | 55 comprehensive tests |
| `docs/specs/.../WATER-SAFETY-SCHEMA-ARCHITECTURE.md` | This document |

---

## Integration with SPEC-17

The `BackcountryTemplate.astro` should import from water-safety.ts:

```typescript
---
import {
  type WaterSource,
  type BackcountryCamping,
  WaterSourceSchema,
  BackcountryCampingSchema,
  getWaterStatusConfig,
  hasAMDWarning,
  hasDoNotUseSources,
  AMD_EDUCATION,
} from '../types/water-safety';
---
```

Update the BackcountryTemplateProps interface to use the new schema:

```typescript
interface BackcountryTemplateProps {
  // ... existing props ...
  camping: BackcountryCamping;  // Uses new comprehensive water sources
}
```

---

## Safety Disclaimer

This schema system provides structure for displaying water safety information.
**Actual water quality testing must be performed by qualified authorities (WV DEP, USFS, etc.).**
Content authors are responsible for accuracy of contamination status designations.

Kim says: "When in doubt, don't drink. Carry your water in. Better thirsty than sick."
