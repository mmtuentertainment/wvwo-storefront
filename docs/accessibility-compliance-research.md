# ADA Compliance & Accessibility Research for SPEC-18 State Parks
Generated: 2026-01-02
Researcher: Claude Code Research Agent

## CRITICAL GAPS IDENTIFIED IN SPEC-18

SPEC-18 currently focuses on facilities, programs, and recreation but LACKS comprehensive accessibility coverage across 8 critical categories:

### 1. MOBILITY ACCESSIBILITY (HIGH PRIORITY - MISSING)

**Federal Requirements:**
- ADA Title II requires compliance with 2010 Standards for Accessible Design
- Forest Service Outdoor Recreation Accessibility Guidelines (FSORAG) apply to state parks
- Trail accessibility must meet Forest Service Trail Accessibility Guidelines (FSTAG 2013)

**SPEC-18 GAPS:**
- No wheelchair-accessible trail indicators or ratings
- Missing paved/unpaved surface type indicators
- No trail width specifications (FSTAG requires minimum tread width)
- No slope/grade indicators (FSTAG evaluates trail length, surface firmness, slope)
- Missing accessible parking space counts
- No accessible restroom facility indicators
- Missing accessible campsite counts (with RV hookups, hard surfaces)
- No accessible fishing pier/dock indicators
- Missing accessible boat launch ramps
- No stroller-friendly trail designations
- Missing walker/rollator accessible indicators

**REQUIRED FOR COMPLIANCE:**
```typescript
AccessibilityFeatureSchema = z.object({
  wheelchairAccessible: z.boolean(),
  pavedSurface: z.boolean(),
  trailWidth: z.number().min(36), // FSTAG minimum 36 inches
  maxSlope: z.number().max(8.33), // 8.33% = 1:12 ratio
  firmStableSurface: z.boolean(),
  accessibleParkingSpaces: z.number(),
  accessibleRestrooms: z.boolean(),
  accessibleCampsites: z.number(),
  accessibleFishingAreas: z.array(z.string()),
  strollerFriendly: z.boolean(),
})
```

### 2. VISUAL ACCESSIBILITY (CRITICAL - COMPLETELY MISSING)

**Federal Requirements:**
- WCAG 2.1 Level AA compliance for web content (deadline: April 26, 2026, for entities 50K+)
- Tactile exhibits required at visitor centers
- Braille signage required for permanent facilities

**SPEC-18 GAPS:**
- No braille signage indicators
- Missing tactile map/exhibit availability
- No large print material indicators
- Missing audio description availability for programs
- No high-contrast trail markers indicators
- Missing descriptive signage for blind visitors
- No screen reader compatibility for digital content

**REQUIRED FOR COMPLIANCE:**
```typescript
VisualAccessibilitySchema = z.object({
  brailleSignage: z.array(z.enum(['trailheads', 'visitor-center', 'restrooms', 'campsites'])),
  tactileExhibits: z.boolean(),
  largePrintMaterials: z.boolean(),
  audioDescriptions: z.boolean(),
  highContrastMarkers: z.boolean(),
  descriptiveSignage: z.boolean(),
})
```

### 3. HEARING ACCESSIBILITY (MEDIUM PRIORITY - MISSING)

**Federal Requirements:**
- Visual alerts required for emergency systems
- Captioning required for educational videos
- TTY/relay services for park offices

**SPEC-18 GAPS:**
- No visual emergency alert system indicators
- Missing captioned video availability for programs
- No TTY/relay service information
- Missing hearing loop/assistive listening system indicators
- No sign language interpreter availability

**REQUIRED FOR COMPLIANCE:**
```typescript
HearingAccessibilitySchema = z.object({
  visualEmergencyAlerts: z.boolean(),
  captionedVideos: z.boolean(),
  ttyService: z.string().optional(), // Phone number
  hearingLoops: z.array(z.string()), // Locations with hearing loops
  signLanguageAvailable: z.boolean(),
})
```

### 4. COGNITIVE ACCESSIBILITY (HIGH PRIORITY - COMPLETELY MISSING)

**Neurodiversity Best Practices:**
- National Parks are implementing sensory guides, social stories, quiet spaces
- Death Valley NP: sensory kits with noise-canceling headphones, polarized sunglasses
- Gettysburg NMP: sensory-friendly days (turn off battle sounds, quiet rooms, fidget toys)

**SPEC-18 GAPS:**
- No sensory-friendly program indicators
- Missing quiet space/calm zone locations
- No simplified wayfinding signage indicators
- Missing social stories or visual schedules
- No sensory kit availability
- Missing noise level indicators for programs/facilities
- No predictable routine information
- Missing advance preparation materials

**REQUIRED FOR BEST PRACTICES:**
```typescript
CognitiveAccessibilitySchema = z.object({
  sensoryFriendlyPrograms: z.boolean(),
  quietSpaces: z.array(z.object({
    location: z.string(),
    features: z.array(z.enum(['shaded', 'indoor', 'noise-dampening', 'private'])),
  })),
  simplifiedSignage: z.boolean(),
  socialStoriesAvailable: z.boolean(),
  sensoryKits: z.boolean(), // Noise-canceling headphones, sunglasses, fidget toys
  noiseLevelRatings: z.enum(['quiet', 'moderate', 'loud']),
  advancePreparationGuide: z.string().url().optional(),
})
```

### 5. SERVICE ANIMAL POLICIES (MEDIUM PRIORITY - MISSING)

**Federal Requirements:**
- ADA Title II requires service animals be permitted in all public areas
- Emotional support animals NOT protected under ADA
- State parks must clearly communicate policies

**SPEC-18 GAPS:**
- No service animal policy statement
- Missing service animal relief areas
- No pet-friendly vs service animal distinction
- Missing water stations for service animals
- No guidance on wildlife areas with service animals

**REQUIRED FOR COMPLIANCE:**
```typescript
ServiceAnimalPolicySchema = z.object({
  serviceAnimalsAllowed: z.boolean().default(true),
  serviceAnimalReliefAreas: z.array(z.string()),
  waterStations: z.array(z.string()),
  restrictions: z.array(z.string()).optional(), // E.g., "Not allowed on beach during nesting season"
  petsAllowed: z.boolean(), // Separate from service animals
  petRestrictions: z.string().optional(),
})
```

### 6. ACCESSIBLE EQUIPMENT RENTAL (LOW PRIORITY - MISSING)

**Best Practices:**
- Beach wheelchairs (all-terrain)
- Adaptive bikes
- Accessible kayaks/canoes
- Fishing equipment adaptations

**SPEC-18 GAPS:**
- No accessible equipment rental indicators
- Missing beach wheelchair availability
- No adaptive bike rental information
- Missing accessible watercraft

**OPTIONAL BUT RECOMMENDED:**
```typescript
AccessibleEquipmentSchema = z.object({
  beachWheelchairs: z.boolean(),
  adaptiveBikes: z.boolean(),
  accessibleWatercraft: z.boolean(),
  rentalContactInfo: z.string().optional(),
  reservationRequired: z.boolean(),
})
```

### 7. TRAIL ACCESS INFORMATION (HIGH PRIORITY - FEDERAL REQUIREMENT)

**FSTAG/ABA Requirements:**
- Trail Access Information (TAI) required in ALL new trailhead signage
- Must summarize trail features: length, surface, width, slope

**SPEC-18 GAPS:**
- No TAI (Trail Access Information) data structure
- Missing trailhead signage compliance indicators
- No trail difficulty ratings using accessibility criteria

**REQUIRED FOR FSTAG COMPLIANCE:**
```typescript
TrailAccessInfoSchema = z.object({
  trailLength: z.number(), // Miles
  surfaceType: z.enum(['paved', 'crushed-gravel', 'natural-soil', 'boardwalk', 'mixed']),
  surfaceFirmness: z.enum(['firm-stable', 'variable', 'soft']),
  treadWidth: z.number(), // Inches (minimum 36 for wheelchair)
  runningSlope: z.number(), // Percentage (max 8.33% for accessibility)
  crossSlope: z.number(), // Percentage (max 5% for accessibility)
  clearTreadWidth: z.number(), // Inches (minimum 32)
  obstacles: z.array(z.string()).optional(), // Roots, rocks, steps
  restAreas: z.number(), // Count of benches/rest areas
})
```

### 8. WV STATE-SPECIFIC REQUIREMENTS (CRITICAL - MISSING)

**West Virginia Context:**
- 1 in 3 WV residents (600,000 people) has a disability
- 1 in 5 WV residents struggles with mobility
- WV DNR has "slowly gaining greater awareness" of accessibility (per Southerly investigation)

**SPEC-18 GAPS:**
- No WV DNR accessibility contact information
- Missing ADA coordinator contact
- No grievance procedure for accessibility complaints
- Missing accessibility improvement timelines
- No accessibility statement on park pages

**REQUIRED FOR WV STATE COMPLIANCE:**
```typescript
AccessibilityComplianceSchema = z.object({
  adaCoordinator: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
  }),
  grievanceProcedure: z.string().url(),
  accessibilityStatement: z.string(),
  lastAccessibilityAudit: z.string().datetime(),
  plannedImprovements: z.array(z.object({
    feature: z.string(),
    timeline: z.string(),
    status: z.enum(['planned', 'in-progress', 'completed']),
  })),
})
```

## PRIORITY IMPLEMENTATION ROADMAP

### P0 (MUST HAVE - Federal Law):
1. Trail Access Information (TAI) - FSTAG requirement
2. Accessible facility indicators (parking, restrooms, campsites)
3. WCAG 2.1 Level AA compliance for web content (April 2026 deadline)
4. Service animal policy statement
5. ADA coordinator contact information

### P1 (SHOULD HAVE - Best Practices):
1. Cognitive accessibility features (quiet spaces, sensory guides)
2. Visual accessibility (braille, tactile, audio descriptions)
3. Hearing accessibility (captions, visual alerts)
4. Accessible trail surface/slope data

### P2 (NICE TO HAVE - Enhanced Experience):
1. Accessible equipment rental
2. Sensory-friendly program schedules
3. Advance preparation materials

## TYPE SYSTEM ADDITIONS REQUIRED

```typescript
// /types/accessibility-types.ts (NEW FILE NEEDED)

export const AccessibilityFeaturesSchema = z.object({
  // P0 - Federal Requirements
  trailAccessInfo: TrailAccessInfoSchema.optional(),
  accessibleParking: z.number().min(0),
  accessibleRestrooms: z.boolean(),
  accessibleCampsites: z.number().min(0),
  serviceAnimalPolicy: ServiceAnimalPolicySchema,
  adaCoordinator: AccessibilityComplianceSchema,

  // P1 - Best Practices
  visualAccessibility: VisualAccessibilitySchema.optional(),
  hearingAccessibility: HearingAccessibilitySchema.optional(),
  cognitiveAccessibility: CognitiveAccessibilitySchema.optional(),

  // P2 - Enhanced Features
  accessibleEquipment: AccessibleEquipmentSchema.optional(),
})

export const StateParkTemplatePropsSchema = z.object({
  // ... existing fields from SPEC-18 ...
  accessibility: AccessibilityFeaturesSchema, // NEW REQUIRED FIELD
})
```

## DESIGN SYSTEM COMPLIANCE

**Industry Safety Colors for Accessibility (OVERRIDE WVWO palette):**
- Green (#2E7D32) = Accessible/Easy
- Blue (#1976D2) = Partially Accessible/Moderate
- Red (#B71C1C) = Not Accessible/Challenging
- Black (#000000) = Inaccessible/Expert Only

**These colors are REQUIRED for accessibility indicators - they override brand colors per CLAUDE.md lines 38-86.**

## COMPONENT ADDITIONS REQUIRED

```
/components/state-park/
├── AccessibilityFeaturesSection.astro (NEW - P0)
├── TrailAccessibilityGrid.astro (NEW - P0)
├── SensoryFriendlyProgramsBadge.astro (NEW - P1)
├── ServiceAnimalPolicySection.astro (NEW - P0)
└── AccessibilityStatementFooter.astro (NEW - P0)
```

## SOURCES

Federal Requirements:
- [ADA Title II Web Accessibility Rule (April 2026 deadline)](https://www.ada.gov/resources/web-rule-first-steps/)
- [WCAG 2.1 Level AA Standard](https://www.federalregister.gov/documents/2024/04/24/2024-07758/)
- [FSORAG/FSTAG Guidelines](https://www.fs.usda.gov/sites/default/files/FSTAG-2013-Update.pdf)

Universal Design Standards:
- [NPS Accessibility Standards](https://www.nps.gov/dscw/ds-accessibility-universal-design.htm)
- [Trail Accessibility Standards](https://www.accessoutdoorsot.com/accessibility-standards-guidelines)

Neurodiversity Best Practices:
- [National Parks Autism-Friendly Initiatives](https://www.afar.com/magazine/how-u-s-national-parks-are-becoming-more-autism-friendly)
- [Sensory-Inclusive Design](https://www.mdpi.com/2073-445X/13/5/636)

West Virginia Context:
- [WV State Parks Accessibility Investigation](https://southerlymag.org/2021/11/03/wv-outdoor-rec-accessibility/)
- [WV State Parks Accessible Accommodations](https://wvstateparks.com/accessible-accommodations/)

## NEXT STEPS FOR SPEC-18

1. Add accessibility-types.ts with all schemas above
2. Update StateParkTemplatePropsSchema to require accessibility field
3. Create AccessibilityFeaturesSection.astro component
4. Add Trail Access Information (TAI) to all trail data files
5. Document ADA coordinator contact in all state park data files
6. Implement WCAG 2.1 Level AA compliance for all web content
7. Add service animal policy to StateParkTemplate.astro
8. Create accessibility compliance tests (FSTAG, WCAG, ADA Title II)
