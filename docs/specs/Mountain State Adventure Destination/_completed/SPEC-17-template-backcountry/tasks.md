# SPEC-17 Backcountry Template - Task Breakdown

**Spec Version:** 1.0.0
**Generated:** 2025-12-31
**Task Swarm:** 4 specialized agents
**Total Tasks:** 320 tasks

---

## Priority Legend

| Marker | Meaning | Action |
|--------|---------|--------|
| **[P0]** | Safety-critical | Blocks other work, complete first |
| **[P1]** | Core functionality | High priority, essential for MVP |
| **[P2]** | Enhancement | Can defer, nice-to-have |

---

## Summary by PR

| PR | Tasks | P0 | P1 | P2 | LOC |
|----|-------|----|----|----|----|
| PR #1: Type System | 92 | 24 | 52 | 16 | ~450 |
| PR #2: Template | 77 | 15 | 50 | 12 | ~550 |
| PR #3: SEO & Integration | 54 | 8 | 33 | 13 | ~330 |
| PR #4: Testing & Content | 97 | 35 | 54 | 8 | ~750 |
| **Total** | **320** | **82** | **189** | **49** | **~2,080** |

---

# PR #1: Type System Foundation

**File:** `wv-wild-web/src/types/backcountry-template-types.ts` (~250 LOC)

---

## Setup Tasks

- [ ] [P1] T-001: Create `backcountry-template-types.ts` with module docstring
- [ ] [P1] T-002: Add imports from `adventure.ts` (CoordinatesSchema, DifficultySchema, SeasonSchema, GearItemSchema)
- [ ] [P1] T-003: Add imports from `navigation-types.ts` (TrailheadSchema, GPSTrackSchema)
- [ ] [P1] T-004: Add imports from `water-safety.ts` (WaterSourceSchema, BackcountryCampingSchema)
- [ ] [P1] T-005: Add imports from `weather-hazards.ts` (WeatherHazardsSchema, SeasonalConditionsSchema)
- [ ] [P1] T-006: Add imports from `backcountry-types.ts` (BackcountryAccessibilitySchema)

---

## Foundation Schemas (No Dependencies)

- [ ] [P0] T-007: Create `EmergencyContactSchema` - service, phone, available, notes
- [ ] [P0] T-008: Create `EmergencyTierSchema` - tier enum (primary/sar/agency/medical), responseTime
- [ ] [P1] T-009: Create `ManagingAgencySchema` - name, type, phone, website, jurisdiction
- [ ] [P1] T-010: Create `RegulationsSchema` - permitRequired, firePolicies, groupSizeLimits

---

## Wildlife & Hazard Schemas

- [ ] [P0] T-011: Create `WildlifeHazardSchema` - species, threatLevel, avoidanceBehavior, encounterProtocol
- [ ] [P1] T-012: Add WILDLIFE_THREAT_COLORS constant (industry standard colors)
- [ ] [P1] T-013: Create WILDLIFE_THREAT_LABELS constant

---

## Area & Trail Schemas

- [ ] [P1] T-014: Create `WildernessAreaSchema` - name, designation, acreage, managedBy
- [ ] [P1] T-015: Create `BackcountryTrailSchema` - name, distance, difficulty, trailhead, waterSources
- [ ] [P1] T-016: Add wildlifeHazards field to BackcountryTrailSchema

---

## Main Template Props Schema

- [ ] [P1] T-017: Create `BackcountryTemplatePropsSchema` base with required fields
- [ ] [P1] T-018: Add location field with coordinates, county, nearestTown
- [ ] [P0] T-019: Add emergency field with contacts array (min 1), satelliteSOS object
- [ ] [P1] T-020: Add wildernessArea field (WildernessAreaSchema)
- [ ] [P1] T-021: Add regulations field (RegulationsSchema)
- [ ] [P1] T-022: Add trails field (BackcountryTrailSchema array)
- [ ] [P1] T-023: Add camping field (BackcountryCampingSchema)
- [ ] [P0] T-024: Add weatherHazards field (WeatherHazardsSchema)
- [ ] [P0] T-025: Add wildlifeHazards field (WildlifeHazardSchema array)
- [ ] [P1] T-026: Add accessibility field (BackcountryAccessibilitySchema)
- [ ] [P1] T-027: Add seasonalConditions field
- [ ] [P1] T-028: Add gear field with required/recommended/optional arrays
- [ ] [P2] T-029: Add stats field (StatItemSchema array)
- [ ] [P2] T-030: Add relatedAdventures field

---

## Type Exports

- [ ] [P1] T-031: Export type `EmergencyContact`
- [ ] [P1] T-032: Export type `EmergencyTier`
- [ ] [P1] T-033: Export type `ManagingAgency`
- [ ] [P1] T-034: Export type `Regulations`
- [ ] [P0] T-035: Export type `WildlifeHazard`
- [ ] [P1] T-036: Export type `WildernessArea`
- [ ] [P1] T-037: Export type `BackcountryTrail`
- [ ] [P1] T-038: Export type `BackcountryTemplateProps`

---

## Helper Functions

- [ ] [P0] T-039: Create `getWildlifeThreatColor(threatLevel)` helper
- [ ] [P0] T-040: Create `getWildlifeThreatLabel(threatLevel)` helper
- [ ] [P1] T-041: Create `isBackcountryTemplate(adventure)` type guard
- [ ] [P2] T-042: Create `filterTrailsByDifficulty()` utility
- [ ] [P2] T-043: Create `hasWildlifeHazards()` utility

---

## Type Tests (~200 LOC)

**File:** `wv-wild-web/src/types/__tests__/backcountry-template-types.test.ts`

### EmergencyContactSchema Tests

- [ ] [P0] T-044: Test accepts valid minimal data
- [ ] [P0] T-045: Test accepts valid complete data
- [ ] [P0] T-046: Test rejects empty service
- [ ] [P0] T-047: Test rejects invalid phone

### EmergencyTierSchema Tests

- [ ] [P0] T-048: Test accepts valid 'primary' tier
- [ ] [P0] T-049: Test accepts valid 'sar' tier
- [ ] [P0] T-050: Test rejects invalid tier value

### ManagingAgencySchema Tests

- [ ] [P1] T-051: Test accepts valid USFS data
- [ ] [P1] T-052: Test accepts valid WVDNR data
- [ ] [P1] T-053: Test rejects missing name

### RegulationsSchema Tests

- [ ] [P1] T-054: Test accepts permit-free area
- [ ] [P1] T-055: Test accepts permit-required area
- [ ] [P1] T-056: Test validates firePolicies array

### WildlifeHazardSchema Tests

- [ ] [P0] T-057: Test accepts black bear hazard
- [ ] [P0] T-058: Test accepts rattlesnake hazard
- [ ] [P0] T-059: Test rejects empty avoidanceBehavior
- [ ] [P0] T-060: Test rejects empty encounterProtocol
- [ ] [P0] T-061: Test validates threatLevel enum

### WildernessAreaSchema Tests

- [ ] [P1] T-062: Test accepts Cranberry Wilderness data
- [ ] [P1] T-063: Test validates designation enum
- [ ] [P1] T-064: Test validates nested ManagingAgencySchema

### BackcountryTrailSchema Tests

- [ ] [P1] T-065: Test accepts trail with required fields
- [ ] [P1] T-066: Test accepts trail with GPS track
- [ ] [P1] T-067: Test validates nested WaterSourceSchema
- [ ] [P1] T-068: Test validates difficulty enum

### BackcountryTemplatePropsSchema Tests

- [ ] [P1] T-069: Test accepts minimal valid props
- [ ] [P1] T-070: Test accepts complete valid props
- [ ] [P0] T-071: Test requires emergency contacts
- [ ] [P0] T-072: Test requires weatherHazards
- [ ] [P1] T-073: Test validates type literal 'backcountry'

### Helper Function Tests

- [ ] [P0] T-074: Test getWildlifeThreatColor for 'low'
- [ ] [P0] T-075: Test getWildlifeThreatColor for 'extreme'
- [ ] [P0] T-076: Test getWildlifeThreatLabel for 'low'
- [ ] [P0] T-077: Test getWildlifeThreatLabel for 'extreme'
- [ ] [P1] T-078: Test isBackcountryTemplate returns true
- [ ] [P1] T-079: Test isBackcountryTemplate returns false for ski
- [ ] [P2] T-080: Test filterTrailsByDifficulty
- [ ] [P2] T-081: Test hasWildlifeHazards true
- [ ] [P2] T-082: Test hasWildlifeHazards false

---

## Index Exports

- [ ] [P1] T-083: Add barrel export for schemas
- [ ] [P1] T-084: Add barrel export for types
- [ ] [P1] T-085: Add barrel export for helpers
- [ ] [P1] T-086: Add barrel export for constants

---

## Validation

- [ ] [P1] T-087: Run TypeScript compiler check
- [ ] [P1] T-088: Run test suite - all passing
- [ ] [P2] T-089: Verify Zod parse/safeParse
- [ ] [P2] T-090: Document example usage

---

# PR #2: BackcountryTemplate.astro

**File:** `wv-wild-web/src/components/templates/BackcountryTemplate.astro` (~550 LOC)

---

## Setup & Structure

- [ ] [P1] T-100: Create template file with SPEC-17 docblock
- [ ] [P1] T-101: Add all type imports from backcountry-types, water-safety, navigation-types
- [ ] [P1] T-102: Import shared helpers: getDifficultyColor, getDifficultyShape
- [ ] [P1] T-103: Import reusable components: AdventureGearChecklist, AdventureRelatedShop, AdventureCTA
- [ ] [P1] T-104: Define Props interface from BackcountryTemplateProps
- [ ] [P1] T-105: Destructure all props with typing
- [ ] [P1] T-106: Create local helpers: isExternalLink, formatPhoneNumber, getWorstCellStatus

---

## Section 1: Hero (~65 LOC)

- [ ] [P0] T-107: Hero wrapper with aria-label, background image, dark overlay
- [ ] [P0] T-108: Cell coverage warning badge using CELL_COVERAGE_COLORS
- [ ] [P1] T-109: Hero title (h1) with font-display, location, county
- [ ] [P1] T-110: Acreage, remoteness badges in stat grid
- [ ] [P1] T-111: Stats grid with rounded-sm styling
- [ ] [P2] T-112: Optional external link icons for mapUrl

---

## Section 2: Navigation & Cell (~55 LOC)

- [ ] [P0] T-113: Cell coverage status card with CELL_COVERAGE_ICONS
- [ ] [P0] T-114: Satellite communication recommendation with importance level
- [ ] [P1] T-115: GPS coordinates in decimal and DMS formats
- [ ] [P1] T-116: USGS quad map list
- [ ] [P1] T-117: Compass declination display
- [ ] [P1] T-118: Offline map app recommendations

---

## Section 3: Wilderness Areas (~70 LOC)

- [ ] [P1] T-119: Wilderness area cards with difficulty badges
- [ ] [P1] T-120: Acreage, terrain, access info per area
- [ ] [P1] T-121: Highlights list with sign-green border-left
- [ ] [P2] T-122: Optional restrictions with brand-orange warning

---

## Section 4: Camping & Water (~80 LOC)

- [ ] [P0] T-123: AMD safety advisory banner when hasAMDConcerns
- [ ] [P0] T-124: Water source cards with WATER_STATUS_CONFIG styling
- [ ] [P0] T-125: "DO NOT USE" sources with red border, skull icon
- [ ] [P0] T-126: Kim's voice AMD warning text
- [ ] [P1] T-127: Safe/treat-required sources with reliability
- [ ] [P1] T-128: Camping regulations with permittedSites

---

## Section 5: Trail System (~60 LOC)

- [ ] [P1] T-129: Trail cards with industry-standard difficulty colors
- [ ] [P1] T-130: Trail distance, elevation gain, water availability
- [ ] [P1] T-131: Best seasons badges
- [ ] [P2] T-132: Optional Kim's trail notes in font-hand
- [ ] [P2] T-133: Trail highlights with checkmarks

---

## Section 6: Skills & Gear (~80 LOC)

- [ ] [P1] T-134: Required skills grid: navigation, survival, first aid
- [ ] [P1] T-135: Required gear checklist by category
- [ ] [P1] T-136: Fitness level with FITNESS_LEVEL_LABELS
- [ ] [P1] T-137: AdventureGearChecklist integration
- [ ] [P2] T-138: AdventureRelatedShop with Kim's CTA

---

## Section 7: Safety & Hazards (~100 LOC)

- [ ] [P0] T-139: Emergency contacts multi-tier with EMERGENCY_TIER_COLORS
- [ ] [P0] T-140: Weather hazards with HAZARD_SEVERITY_COLORS
- [ ] [P0] T-141: Kim's weather warnings in font-hand
- [ ] [P1] T-142: Wildlife hazards with DANGER_LEVEL_COLORS
- [ ] [P1] T-143: Disease risk display (Lyme, Giardia)
- [ ] [P1] T-144: Avoidance/response guidance
- [ ] [P2] T-145: Flash flood warning time

---

## Section 8: Leave No Trace (~45 LOC)

- [ ] [P1] T-146: 7 principles with sign-green border-left
- [ ] [P1] T-147: Guidelines per principle with checkmarks
- [ ] [P2] T-148: Optional Kim's stewardship note

---

## Section 9: Access Points (~50 LOC)

- [ ] [P1] T-149: Access point cards with facilities
- [ ] [P1] T-150: Per-point cell coverage display
- [ ] [P1] T-151: Seasonal access restrictions
- [ ] [P2] T-152: Vehicle requirements badge

---

## Section 10: Seasonal (~40 LOC)

- [ ] [P1] T-153: Season cards with temp ranges
- [ ] [P1] T-154: Best/not-recommended activities
- [ ] [P2] T-155: Kim's seasonal tips in font-hand
- [ ] [P2] T-156: Snow depth for winter

---

## Empty State Handling

- [ ] [P0] T-157: Water sources empty → Kim's warning "Pack all water needed"
- [ ] [P0] T-158: Emergency contacts empty → "Contact ranger district"
- [ ] [P0] T-159: Weather hazards empty → "Check NOAA"
- [ ] [P0] T-160: Trails empty → "Navigate with map/compass"
- [ ] [P1] T-161: Optional sections (nearbyAttractions, etc.) → hide when empty

---

## Accessibility & WCAG

- [ ] [P1] T-162: Aria-labels on all sections
- [ ] [P1] T-163: Difficulty colors with shape icons for colorblind
- [ ] [P1] T-164: Screen reader-friendly water status (sr-only)
- [ ] [P1] T-165: Keyboard navigation
- [ ] [P1] T-166: Semantic HTML5 elements
- [ ] [P1] T-167: Proper heading hierarchy (h1 > h2 > h3)

---

## WVWO Aesthetic Compliance

- [ ] [P1] T-168: Enforce rounded-sm ONLY
- [ ] [P1] T-169: Border-left accents (sign-green/brand-orange)
- [ ] [P1] T-170: Typography: font-display, font-hand, font-body
- [ ] [P1] T-171: Orange usage <5%
- [ ] [P1] T-172: Industry safety colors override brand
- [ ] [P1] T-173: Responsive grid layouts

---

## CTA Integration

- [ ] [P1] T-174: AdventureCTA with backcountry messaging
- [ ] [P2] T-175: Kim's CTA: "Stop by the shop..."
- [ ] [P2] T-176: Optional nearby attractions

---

# PR #3: SEO & Integration

---

## SchemaBackcountryTemplate.astro (~180 LOC)

**File:** `wv-wild-web/src/components/seo/SchemaBackcountryTemplate.astro`

### Core Structure

- [ ] [P1] T-200: Create file with Props interface
- [ ] [P1] T-201: Implement TouristAttraction + NaturalFeature @type array
- [ ] [P1] T-202: Add GeoCoordinates schema
- [ ] [P1] T-203: Implement Article schema with headline, datePublished
- [ ] [P1] T-204: Implement BreadcrumbList (Home > Near > {name})
- [ ] [P2] T-205: Add FAQPage from leaveNoTrace principles
- [ ] [P2] T-206: Add PropertyValue for acreage, cellCoverage, etc.

### AMD SpecialAnnouncement (Safety Critical)

- [ ] [P0] T-207: Implement SpecialAnnouncement when hasDoNotUseSources
- [ ] [P0] T-208: Set category to environmental hazard Wikidata
- [ ] [P0] T-209: Map do-not-use sources to spatialCoverage
- [ ] [P0] T-210: Add datePosted and expires (1 year)
- [ ] [P0] T-211: Include Kim's voice AMD warning text

### Entity Relationships

- [ ] [P1] T-212: Link @graph entities with @id references
- [ ] [P1] T-213: Add publisher/author Organization
- [ ] [P2] T-214: Add containedInPlace for managing agency

---

## Content Config (~30 LOC)

**File:** `wv-wild-web/src/content.config.ts`

- [ ] [P1] T-215: Add 'backcountry' to type enum
- [ ] [P1] T-216: Import backcountry schemas
- [ ] [P1] T-217: Import water-safety schemas
- [ ] [P2] T-218: Add optional backcountry fields (navigation, regulations, accessibility)
- [ ] [P2] T-219: Add wilderness arrays (wildernessAreas, trails, hazards)

---

## Route Setup

- [ ] [P1] T-220: Create `[slug].astro` for dynamic routes
- [ ] [P1] T-221: Implement getStaticPaths filtering by type='backcountry'
- [ ] [P1] T-222: Render BackcountryTemplate with entry data
- [ ] [P1] T-223: Render SchemaBackcountryTemplate in head
- [ ] [P2] T-224: Create index route listing backcountry areas
- [ ] [P2] T-225: Add canonical/prev/next links

---

## Meta Tags

- [ ] [P1] T-226: Title tag (50-60 chars)
- [ ] [P1] T-227: Meta description (150-160 chars)
- [ ] [P1] T-228: Open Graph tags (title, description, image, url)
- [ ] [P1] T-229: Twitter Card tags
- [ ] [P1] T-230: Robots and canonical link
- [ ] [P2] T-231: Geo meta tags
- [ ] [P2] T-232: Safety classification meta

---

## SEO Validation

- [ ] [P0] T-233: Create SchemaBackcountryTemplate.test.ts
- [ ] [P0] T-234: Test SpecialAnnouncement renders ONLY when AMD present
- [ ] [P0] T-235: Test SpecialAnnouncement has required fields
- [ ] [P1] T-236: Test TouristAttraction+NaturalFeature format
- [ ] [P1] T-237: Test BreadcrumbList has 3 items
- [ ] [P1] T-238: Test Article links to #attraction
- [ ] [P1] T-239: Test @id references resolve to valid URLs
- [ ] [P2] T-240: Test FAQPage maps principles correctly

---

## Integration Validation

- [ ] [P1] T-241: Test type='backcountry' passes Zod
- [ ] [P1] T-242: Test backcountry fields are optional (no breaking changes)
- [ ] [P2] T-243: Test full frontmatter parses
- [ ] [P1] T-244: Test getStaticPaths returns correct paths
- [ ] [P1] T-245: Test [slug].astro renders template
- [ ] [P2] T-246: Test index filters correctly
- [ ] [P1] T-247: Test title length 50-60 chars
- [ ] [P1] T-248: Test description length 150-160 chars
- [ ] [P1] T-249: Test OG image is absolute URL

---

## Integration Smoke Tests

- [ ] [P1] T-250: Validate JSON-LD with Google Rich Results Test
- [ ] [P1] T-251: Validate with schema.org validator
- [ ] [P0] T-252: Verify AMD SpecialAnnouncement in Search Console
- [ ] [P2] T-253: Lighthouse SEO >= 95

---

# PR #4: Testing & Content

---

## Type Schema Tests (Extended)

### Emergency Contact Tier Validation

- [ ] [P0] T-300: Test rejects missing required emergency fields
- [ ] [P0] T-301: Test validates phone formats (304-xxx, 911, +1-xxx)
- [ ] [P0] T-302: Test SAR requires responseTime
- [ ] [P0] T-303: Test SatelliteSOS requires importance level
- [ ] [P0] T-304: Test Hospital validates TraumaLevel enum
- [ ] [P0] T-305: Test SelfRescue requires message

### Cell Coverage to Satellite Logic

- [ ] [P0] T-306: Test isSatelliteCritical when coverage='none'
- [ ] [P0] T-307: Test isSatelliteCritical when satelliteRequired=true
- [ ] [P0] T-308: Test getWorstCellCoverage returns 'none' for mixed
- [ ] [P1] T-309: Test getCellCoverageColor for 'none'
- [ ] [P1] T-310: Test getSatelliteSOSBadgeClasses per importance

### AMD Detection

- [ ] [P0] T-311: Test hasAMDWarning for contaminantType='amd'
- [ ] [P0] T-312: Test hasAMDWarning for contaminantType='coal-runoff'
- [ ] [P0] T-313: Test hasAMDWarning for "acid mine drainage" text
- [ ] [P0] T-314: Test hasAMDWarning for "mining" text
- [ ] [P0] T-315: Test isToxicWaterSource for status='do-not-use'
- [ ] [P1] T-316: Test treatment='not-applicable' for do-not-use

### Industry Difficulty Colors

- [ ] [P1] T-317: Test 'easy' → 'bg-sign-green'
- [ ] [P1] T-318: Test 'moderate' → 'bg-blue-700'
- [ ] [P1] T-319: Test 'challenging' → 'bg-red-900'
- [ ] [P1] T-320: Test 'rugged' → 'bg-black'
- [ ] [P1] T-321: Test unique shapes per level

---

## Template Component Tests (~150 LOC)

**File:** `BackcountryTemplate.test.ts`

### Hero Section

- [ ] [P1] T-330: Test renders name in h1
- [ ] [P1] T-331: Test renders hero image with alt
- [ ] [P1] T-332: Test renders tagline
- [ ] [P2] T-333: Test renders quick stats

### Navigation Section

- [ ] [P1] T-334: Test renders USGS quads
- [ ] [P1] T-335: Test renders compass declination
- [ ] [P1] T-336: Test renders offline map apps
- [ ] [P1] T-337: Test renders cell coverage with colors

### Water Safety Section

- [ ] [P0] T-338: Test renders AMD warning for do-not-use
- [ ] [P0] T-339: Test renders skull icon for toxic
- [ ] [P1] T-340: Test renders source counts by status
- [ ] [P1] T-341: Test renders AMD education when hasAMDConcerns

### Emergency Contact Section

- [ ] [P0] T-342: Test renders PrimaryContactCard with tel: link
- [ ] [P0] T-343: Test renders SARContactCard with response time
- [ ] [P0] T-344: Test renders SatelliteSOSCard with importance
- [ ] [P0] T-345: Test renders SelfRescueWarning
- [ ] [P1] T-346: Test renders HospitalCard with trauma level

### Weather Hazards Section

- [ ] [P1] T-347: Test renders flash flood warningTime
- [ ] [P1] T-348: Test renders lightning protocol
- [ ] [P1] T-349: Test renders temp by elevation
- [ ] [P2] T-350: Test renders seasonal grid

### Aesthetic Compliance

- [ ] [P1] T-351: Test uses only rounded-sm
- [ ] [P1] T-352: Test phone links have tel: href
- [ ] [P1] T-353: Test images have alt text
- [ ] [P2] T-354: Test headings use font-display

---

## Dolly Sods Content (~350 LOC)

**File:** `wv-wild-web/src/content/adventures/dolly-sods-wilderness.mdx`

### Frontmatter Metadata

- [ ] [P1] T-360: Create file with name: "Dolly Sods Wilderness"
- [ ] [P1] T-361: Add heroImage path
- [ ] [P1] T-362: Add tagline: "17,371 acres of alpine wilderness..."
- [ ] [P1] T-363: Add county: "Tucker / Randolph"
- [ ] [P1] T-364: Add managingAgency: "Monongahela National Forest"
- [ ] [P1] T-365: Add coordinates: lat 39.03, lng -79.35
- [ ] [P1] T-366: Add difficulty: "rugged"

### Navigation Section

- [ ] [P1] T-367: Add USGS quads: [Hopeville, Blackbird Knob, ...]
- [ ] [P1] T-368: Add compassDeclination: 8.2° W (2024)
- [ ] [P1] T-369: Add trailBlazing: blue diamond, moderate/faded
- [ ] [P1] T-370: Add offlineMapApps: [Gaia, CalTopo, Avenza]
- [ ] [P0] T-371: Add cellCoverage: status "none"

### Water Sources (AMD-Critical)

- [ ] [P0] T-372: Add Red Creek (Lower) as do-not-use with AMD
- [ ] [P0] T-373: Add amdDetails: contaminantType, knownSource
- [ ] [P0] T-374: Add visualIndicators: [orange water, iron deposits]
- [ ] [P1] T-375: Add Red Creek (Upper) as treat-required
- [ ] [P1] T-376: Add Stonecoal Run as treat-required
- [ ] [P1] T-377: Add Cabin Mountain Spring as safe
- [ ] [P1] T-378: Set hasAMDConcerns: true

### Emergency Contacts (Multi-Tier)

- [ ] [P0] T-379: Add primary: Cheat Ranger District
- [ ] [P0] T-380: Add countySAR: Tucker County 304-478-2431
- [ ] [P0] T-381: Add satelliteSOS: importance "essential"
- [ ] [P0] T-382: Add nearestHospital: Davis Memorial, 45 mi, Level III
- [ ] [P0] T-383: Add selfRescueExpectation: "SAR response 4-8 hours"
- [ ] [P1] T-384: Add agencies: Monongahela NF, WV State Police

### Weather Hazards

- [ ] [P1] T-385: Add flashFloods: 15-30 min warning
- [ ] [P1] T-386: Add lightning: 2pm-6pm May-Sep
- [ ] [P1] T-387: Add temperatureByElevation
- [ ] [P1] T-388: Add rapidOnsetEvents

### Regulations

- [ ] [P1] T-389: Add "Permit not required but registration encouraged"
- [ ] [P1] T-390: Add "Camp 200 feet from water"
- [ ] [P1] T-391: Add "No campfires above 4,000 ft during high fire danger"
- [ ] [P1] T-392: Add "Leave No Trace required"
- [ ] [P1] T-393: Add "Hunting allowed in season"

### Gear & Shop

- [ ] [P1] T-394: Add required gear: satellite communicator, filter, maps
- [ ] [P1] T-395: Add optional gear: bear canister, poles, rain gear
- [ ] [P2] T-396: Add relatedShop categories

---

## Content Validation

- [ ] [P1] T-400: Test dolly-sods.mdx passes Zod validation
- [ ] [P1] T-401: Test all required fields present
- [ ] [P0] T-402: Test AMD sources have do-not-use + not-applicable
- [ ] [P0] T-403: Test emergency contacts have all tiers
- [ ] [P1] T-404: Verify USGS quad names match official
- [ ] [P1] T-405: Verify declination matches NOAA 2024
- [ ] [P1] T-406: Verify SAR phone is current
- [ ] [P1] T-407: Verify hospital info is accurate

---

# Critical Path

```
PR #1 (Types) ─────────────────────────────┐
  T-001..T-006 (Setup)                     │
  T-007..T-010 (Foundation schemas)        │
  T-011..T-016 (Wildlife/Area schemas)     │
  T-017..T-030 (Main Props schema)         │
  T-031..T-043 (Exports/Helpers)           │
  T-044..T-090 (Tests)                     │
                                           ▼
PR #2 (Template) ──────────────────────────┐
  T-100..T-106 (Setup)                     │
  T-107..T-176 (All sections)              │
                                           ▼
PR #3 (SEO) ───────────────────────────────┐
  T-200..T-253 (Schema + Config + Routes)  │
                                           ▼
PR #4 (Tests + Content) ───────────────────┘
  T-300..T-407 (Extended tests + Dolly Sods)
```

---

# Checkpoint Triggers

| Threshold | Action |
|-----------|--------|
| 300 LOC per file | ⚠️ Warning: Consider splitting |
| 500 LOC per file | 🛑 Required: Must split before merge |
| P0 incomplete | 🚫 Cannot merge PR |
| Tests failing | 🚫 Cannot merge PR |

---

# Success Criteria per PR

## PR #1: Type System

- [ ] Zero TypeScript errors
- [ ] All 8 Zod schemas validate
- [ ] 100% coverage on P0 schemas
- [ ] Index exports work

## PR #2: Template

- [ ] All 10 sections render
- [ ] P0 empty states show warnings
- [ ] WVWO aesthetic compliance
- [ ] Accessibility audit passes

## PR #3: SEO

- [ ] JSON-LD validates
- [ ] AMD SpecialAnnouncement works
- [ ] Routes generate correctly
- [ ] Meta tags in range

## PR #4: Testing & Content

- [ ] 85%+ test coverage
- [ ] Dolly Sods content accurate
- [ ] All P0 tests pass
- [ ] Content validation passes

---

*Generated by 4-agent task swarm | 2025-12-31*
