# SPEC-12 WMA Template - Pseudocode Phase

**Created**: 2025-12-27
**SPARC Phase**: P - Pseudocode
**Status**: Complete

---

## Overview

This document contains the algorithmic design for all SPEC-12 components before implementation. Each algorithm is specified in pseudocode with complexity analysis.

---

## 1. AdventureFeatureSection - Column Mapping Algorithm

**Purpose**: Map column count (2, 3, 4) to responsive Tailwind grid classes

```pseudocode
FUNCTION mapColumnsToGridClasses(columns: 2 | 3 | 4) -> string
  INPUT: columns (integer, valid values: 2, 3, 4)
  OUTPUT: Tailwind CSS class string

  DEFINE columnMap = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  IF columns NOT IN [2, 3, 4] THEN
    THROW Error("Invalid column count. Must be 2, 3, or 4")
  END IF

  RETURN columnMap[columns]
END FUNCTION

// Complexity: O(1) - constant time lookup
// Memory: O(1) - fixed size map
```

---

## 2. AdventureFeatureSection - Variant Selection Algorithm

**Purpose**: Map semantic variant names to background CSS classes

```pseudocode
FUNCTION mapVariantToBackground(variant: 'white' | 'cream') -> string
  INPUT: variant (string, valid values: 'white', 'cream')
  OUTPUT: Tailwind CSS class string

  DEFINE variantMap = {
    'white': 'bg-white',
    'cream': 'bg-brand-cream'
  }

  IF variant NOT IN ['white', 'cream'] THEN
    DEFAULT variant = 'white'  // Safe fallback
  END IF

  RETURN variantMap[variant]
END FUNCTION

// Complexity: O(1)
// Memory: O(1)
```

---

## 3. AdventureFeatureSection - Accent Color Mapping

**Purpose**: Map accent color names to Tailwind border-left utility classes

```pseudocode
FUNCTION mapAccentColorToBorder(color: AccentColor) -> string
  INPUT: color (AccentColor type: 'green' | 'orange' | 'brown' | 'mud')
  OUTPUT: Tailwind CSS class string

  DEFINE accentMap = {
    'green': 'border-l-sign-green',
    'orange': 'border-l-brand-orange',
    'brown': 'border-l-brand-brown',
    'mud': 'border-l-brand-mud'
  }

  IF color NOT IN accentMap THEN
    DEFAULT color = 'green'  // WVWO default accent
  END IF

  RETURN accentMap[color]
END FUNCTION

// Complexity: O(1)
// Memory: O(1)
// Note: Type system enforces valid colors, so default branch rarely hit
```

---

## 4. AdventureCampingList - Phone Number Formatting

**Purpose**: Strip non-digit characters from phone numbers for `tel:` links

```pseudocode
FUNCTION formatPhoneForTelLink(phoneNumber: string) -> string
  INPUT: phoneNumber (string, may contain formatting like "(304) 555-1234")
  OUTPUT: digits-only string for href="tel:..." attribute

  DEFINE digitsOnly = ""

  FOR EACH character IN phoneNumber DO
    IF character IS DIGIT (0-9) THEN
      digitsOnly += character
    END IF
  END FOR

  RETURN digitsOnly

  // Example: "(304) 555-1234" -> "3045551234"
END FUNCTION

// Complexity: O(n) where n = length of phoneNumber string
// Memory: O(n) for output string
// Alternative: Use regex phoneNumber.replace(/\D/g, '') - same complexity
```

---

## 5. AdventureCTA - External Link Detection

**Purpose**: Auto-detect external links to add security attributes

```pseudocode
FUNCTION isExternalLink(href: string) -> boolean
  INPUT: href (URL string)
  OUTPUT: true if external, false if internal

  IF href STARTS WITH "http://" OR href STARTS WITH "https://" THEN
    RETURN true
  ELSE IF href STARTS WITH "/" OR href STARTS WITH "#" THEN
    RETURN false  // Internal relative or anchor
  ELSE
    RETURN false  // Default to internal for safety
  END IF
END FUNCTION

FUNCTION getLinkAttributes(href: string, externalOverride?: boolean) -> object
  INPUT:
    - href (URL string)
    - externalOverride (optional boolean to force external treatment)
  OUTPUT: Object with HTML attributes

  DEFINE isExternal = externalOverride OR isExternalLink(href)

  IF isExternal THEN
    RETURN {
      target: "_blank",
      rel: "noopener noreferrer"
    }
  ELSE
    RETURN {}  // No extra attributes for internal links
  END IF
END FUNCTION

// Complexity: O(1) - string prefix check
// Memory: O(1)
```

---

## 6. AdventureFeatureSection - Conditional Rendering Logic

**Purpose**: Hide sections when data arrays are empty

```pseudocode
FUNCTION shouldRenderSection(features: FeatureItem[]) -> boolean
  INPUT: features (array of FeatureItem objects)
  OUTPUT: true if section should render, false if hidden

  IF features IS NULL OR features.length === 0 THEN
    RETURN false
  END IF

  RETURN true
END FUNCTION

// Astro template usage:
IF shouldRenderSection(features) THEN
  RENDER <section>...</section>
ELSE
  RENDER nothing (component returns null)
END IF

// Complexity: O(1)
// Memory: O(1)
```

---

## 7. AdventureFeatureSection - Animation Stagger Calculation

**Purpose**: Calculate CSS animation delay per feature card

```pseudocode
FUNCTION calculateAnimationDelay(index: number, staggerMs: number = 100) -> string
  INPUT:
    - index (0-based array index)
    - staggerMs (milliseconds between each card animation, default 100)
  OUTPUT: CSS animation-delay value

  DEFINE delayMs = index * staggerMs
  DEFINE delaySeconds = delayMs / 1000

  RETURN `${delaySeconds}s`

  // Example: index=0 -> "0s", index=1 -> "0.1s", index=2 -> "0.2s"
END FUNCTION

// Complexity: O(1) per card
// Memory: O(1)
// Applied in component: style="animation-delay: {calculateAnimationDelay(i)}"
```

---

## 8. AdventureCampingList - Facility Count Badge Logic

**Purpose**: Conditionally render count badge only when count exists

```pseudocode
FUNCTION renderCountBadge(facility: CampingFacility) -> HTML | null
  INPUT: facility (CampingFacility object with optional count field)
  OUTPUT: HTML span element or null

  IF facility.count IS NOT NULL AND facility.count > 0 THEN
    RETURN <span class="ml-2 text-sm font-normal text-brand-mud">
             ({facility.count})
           </span>
  ELSE
    RETURN null  // Don't render badge
  END IF
END FUNCTION

// Complexity: O(1)
// Memory: O(1)
```

---

## 9. Type Guard Algorithm - WMA Adventure Detection

**Purpose**: Runtime type narrowing for WMA vs standard adventures

```pseudocode
FUNCTION isWMAAdventure(adventure: CollectionEntry<'adventures'>) -> boolean
  INPUT: adventure (Content Collection entry)
  OUTPUT: true if WMA type, false otherwise

  IF adventure.data.type === 'wma' THEN
    RETURN true
  ELSE
    RETURN false
  END IF
END FUNCTION

// TypeScript usage:
IF isWMAAdventure(adventure) THEN
  // TypeScript now knows adventure.data has WMA fields
  // (acreage, county, species, etc.)
  ACCESS adventure.data.acreage  // Type-safe
END IF

// Complexity: O(1)
// Memory: O(1)
```

---

## 10. AdventureAmenitiesGrid - Responsive Column Algorithm

**Purpose**: Map column config to responsive grid classes

```pseudocode
FUNCTION mapAmenityColumnsToGrid(columns: 2 | 3 | 4) -> string
  INPUT: columns (integer, valid values: 2, 3, 4)
  OUTPUT: Tailwind CSS class string

  DEFINE columnMap = {
    2: 'grid-cols-2 md:grid-cols-2',      // Always 2 columns
    3: 'grid-cols-2 md:grid-cols-3',      // Mobile: 2, Desktop: 3
    4: 'grid-cols-2 md:grid-cols-4'       // Mobile: 2, Desktop: 4
  }

  IF columns NOT IN [2, 3, 4] THEN
    DEFAULT columns = 3  // WVWO standard for amenities
  END IF

  RETURN columnMap[columns]
END FUNCTION

// Complexity: O(1)
// Memory: O(1)
// Rationale: Mobile always 2 cols for readability on small screens
```

---

## 11. Schema Validation Algorithm - GPS Coordinates

**Purpose**: Validate GPS coordinate format and bounds for West Virginia

```pseudocode
FUNCTION validateWVGPS(lat: number, lon: number) -> boolean
  INPUT: lat (latitude), lon (longitude)
  OUTPUT: true if valid WV coordinates, false otherwise

  DEFINE WV_BOUNDS = {
    minLat: 37.2,    // Southern border
    maxLat: 40.6,    // Northern border
    minLon: -82.6,   // Eastern border
    maxLon: -77.7    // Western border
  }

  IF lat < WV_BOUNDS.minLat OR lat > WV_BOUNDS.maxLat THEN
    RETURN false
  END IF

  IF lon < WV_BOUNDS.maxLon OR lon > WV_BOUNDS.minLon THEN
    RETURN false
  END IF

  RETURN true
END FUNCTION

// Zod schema implementation:
CoordinatesSchema = z.object({
  lat: z.number().min(37.2).max(40.6),
  lon: z.number().min(-82.6).max(-77.7)
})

// Complexity: O(1)
// Memory: O(1)
```

---

## 12. ID Generation Algorithm - Unique Section IDs

**Purpose**: Generate collision-resistant IDs for aria-labelledby

```pseudocode
FUNCTION generateSectionId(prefix: string) -> string
  INPUT: prefix (semantic identifier like 'what-to-hunt')
  OUTPUT: Unique ID string

  DEFINE randomSuffix = Math.random().toString(36).substring(2, 9)
  RETURN `${prefix}-${randomSuffix}`

  // Example: 'what-to-hunt-x7k9m2p'
END FUNCTION

// Collision probability: ~1 in 2 billion for 7-char base36
// Complexity: O(1)
// Memory: O(1)
// Note: Sufficient for single page, not globally unique
```

---

## 13. Icon Path Retrieval Algorithm

**Purpose**: Safely retrieve SVG icon paths from constant map

```pseudocode
FUNCTION getIconPath(iconName?: StatIcon) -> string | null
  INPUT: iconName (optional StatIcon type from adventure.ts)
  OUTPUT: SVG path data or null

  IF iconName IS NULL OR iconName IS UNDEFINED THEN
    RETURN null  // No icon to render
  END IF

  IF iconName NOT IN STAT_ICON_PATHS THEN
    CONSOLE.warn(`Unknown icon: ${iconName}, falling back to null`)
    RETURN null
  END IF

  RETURN STAT_ICON_PATHS[iconName]
END FUNCTION

// Complexity: O(1) - object property lookup
// Memory: O(1)
// Defensive: Returns null on invalid input, never throws
```

---

## 14. Slot Content Detection Algorithm

**Purpose**: Check if Astro slot has content before rendering wrapper

```pseudocode
FUNCTION hasSlotContent(slotName: string, slots: AstroSlots) -> boolean
  INPUT:
    - slotName (string like 'footer' or 'intro')
    - slots (Astro.slots object)
  OUTPUT: true if slot has content, false if empty

  IF slots[slotName] IS UNDEFINED THEN
    RETURN false
  END IF

  RETURN slots[slotName].hasContent()
END FUNCTION

// Astro template usage:
IF hasSlotContent('footer', Astro.slots) THEN
  RENDER <footer><slot name="footer" /></footer>
END IF

// Complexity: O(1)
// Memory: O(1)
```

---

## 15. Data Transformation - Species to Features

**Purpose**: Transform WMA species data to generic FeatureItem format

```pseudocode
FUNCTION transformSpeciesToFeatures(species: Species[]) -> FeatureItem[]
  INPUT: species (array of Species objects from frontmatter)
  OUTPUT: array of FeatureItem objects for AdventureFeatureSection

  DEFINE features = []

  FOR EACH s IN species DO
    DEFINE feature = {
      name: s.name,
      description: `Season: ${s.season}`,
      metadata: s.regulationUrl ? `Regulations` : null,
      kimNote: s.notes OR null,
      icon: null  // Species don't need icons
    }

    features.push(feature)
  END FOR

  RETURN features
END FUNCTION

// Complexity: O(n) where n = number of species
// Memory: O(n) for output array
// Applied in AdventureWhatToHunt wrapper
```

---

## 16. Data Transformation - Fishing Waters to Features

**Purpose**: Transform fishing water data with multiple species

```pseudocode
FUNCTION transformFishingToFeatures(waters: FishingWater[]) -> FeatureItem[]
  INPUT: waters (array of FishingWater objects)
  OUTPUT: array of FeatureItem objects

  DEFINE features = []

  FOR EACH w IN waters DO
    DEFINE speciesList = w.species.join(', ')

    DEFINE feature = {
      name: w.name,
      description: `Species: ${speciesList}`,
      metadata: w.access,
      kimNote: w.notes OR null,
      icon: null
    }

    features.push(feature)
  END FOR

  RETURN features
END FUNCTION

// Complexity: O(n * m) where n = waters, m = avg species per water
// Memory: O(n)
// Example: ["Smallmouth", "Largemouth"] -> "Species: Smallmouth, Largemouth"
```

---

## Complexity Summary

| Algorithm | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| Column Mapping | O(1) | O(1) | Constant lookup |
| Variant Selection | O(1) | O(1) | Constant lookup |
| Accent Color Mapping | O(1) | O(1) | Constant lookup |
| Phone Formatting | O(n) | O(n) | n = phone string length |
| External Link Detection | O(1) | O(1) | String prefix check |
| Conditional Rendering | O(1) | O(1) | Array length check |
| Animation Stagger | O(1) | O(1) | Per card calculation |
| Count Badge | O(1) | O(1) | Conditional render |
| Type Guard | O(1) | O(1) | Property comparison |
| Amenity Columns | O(1) | O(1) | Constant lookup |
| GPS Validation | O(1) | O(1) | Bounds checking |
| ID Generation | O(1) | O(1) | Random suffix |
| Icon Path Retrieval | O(1) | O(1) | Map lookup |
| Slot Detection | O(1) | O(1) | Astro API call |
| Species Transform | O(n) | O(n) | n = species count |
| Fishing Transform | O(n*m) | O(n) | n = waters, m = species/water |

**Overall System Complexity**: O(n*m) dominated by fishing water transformation, but n and m are small (typically <10 waters, <5 species each).

---

## Edge Case Handling

### 1. Empty Data Arrays

```pseudocode
IF features.length === 0 THEN
  RETURN null  // Don't render section
END IF
```

### 2. Missing Optional Fields

```pseudocode
IF facility.count IS NULL THEN
  // Render facility without count badge
END IF

IF species.notes IS NULL THEN
  // Don't render Kim's note section
END IF
```

### 3. Invalid Column Counts

```pseudocode
IF columns NOT IN [2, 3, 4] THEN
  DEFAULT columns = 3  // Fallback to safe default
END IF
```

### 4. Malformed Phone Numbers

```pseudocode
FUNCTION formatPhoneForTelLink(phone: string) -> string
  DEFINE digits = phone.replace(/\D/g, '')

  IF digits.length < 10 THEN
    CONSOLE.warn(`Phone number too short: ${phone}`)
    // Still return digits (partial number better than error)
  END IF

  RETURN digits
END FUNCTION
```

### 5. GPS Out of Bounds

```pseudocode
// Handled at schema level - build fails if coordinates invalid
CoordinatesSchema.refine(
  (coords) => validateWVGPS(coords.lat, coords.lon),
  { message: "Coordinates must be within West Virginia bounds" }
)
```

---

## Performance Optimizations

### 1. Memoized Column Classes

```pseudocode
// Pre-compute map at module load (not per component render)
CONST COLUMN_CLASSES = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
}

// O(1) lookup during render
FUNCTION getColumnClasses(cols) -> COLUMN_CLASSES[cols]
```

### 2. Early Return on Empty Arrays

```pseudocode
// Check isEmpty BEFORE expensive operations
IF features.length === 0 THEN
  RETURN null  // Skip all rendering logic
END IF

// Only reached if data exists
features.map((f) => renderFeatureCard(f))
```

### 3. Animation Only When Enabled

```pseudocode
IF animate === false THEN
  // Skip stagger delay calculations
  RENDER cards WITHOUT animation classes
ELSE
  // Apply animation + stagger
  FOR EACH card IN cards DO
    card.style.animationDelay = calculateDelay(index)
  END FOR
END IF
```

---

## Testing Strategy

Each algorithm will have corresponding unit tests:

1. **Column Mapping**: Test all valid inputs (2, 3, 4) + invalid (1, 5)
2. **Phone Formatting**: Test various formats ("(304) 555-1234", "304.555.1234", "3045551234")
3. **External Link Detection**: Test http://, https://, /, #, relative paths
4. **GPS Validation**: Test WV bounds, out-of-bounds, edge cases (exact borders)
5. **Type Guard**: Test WMA type, adventure type, undefined type
6. **Conditional Rendering**: Test empty arrays, null, undefined, populated arrays
7. **Animation Stagger**: Test index 0-10, verify delay progression
8. **Data Transformations**: Test species/fishing water mapping, empty arrays, missing fields

**Coverage Target**: 100% for algorithmic functions (all O(1) and O(n) functions)

---

## SPARC Phase Completion Criteria

- [x] All component algorithms specified in pseudocode
- [x] Complexity analysis documented for each algorithm
- [x] Edge cases identified and handling specified
- [x] Performance optimizations noted
- [x] Testing strategy defined
- [x] Ready for Refinement phase (TDD implementation)

**Next Phase**: R - Refinement (TDD Implementation)

---

**END OF PSEUDOCODE PHASE**
