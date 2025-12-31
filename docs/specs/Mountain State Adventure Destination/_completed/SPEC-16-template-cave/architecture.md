# SPEC-16: CaveTemplate Architecture Document

## 1. Overview

The CaveTemplate is an Astro component (~475 lines) that displays West Virginia cave/cavern destination pages. It follows established patterns from SkiTemplate, LakeTemplate, and RiverTemplate while introducing cave-specific sections for tours, geological formations, accessibility requirements, and safety guidelines.

## 2. File Structure

```
wv-wild-web/
├── src/
│   ├── components/
│   │   └── templates/
│   │       └── CaveTemplate.astro        # ~475 lines
│   ├── types/
│   │   └── cave-types.ts                 # ~350 lines (Zod schemas + types)
│   └── pages/
│       └── destinations/
│           ├── seneca-caverns.astro      # SPEC-36
│           ├── smoke-hole-caverns.astro  # SPEC-37
│           └── lost-world-caverns.astro  # SPEC-49
```

## 3. Component Architecture

### 3.1 Props Interface

```typescript
interface CaveTemplateProps {
  // Hero Section (Required)
  name: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  stats: StatItem[];

  // Cave Metadata (Required)
  location: string;
  county: string;
  depth: number;                    // feet below surface
  temperature: string;              // e.g., "54°F year-round"
  discoveryYear?: number;
  quickHighlights: string[];

  // Content Sections
  tours: CaveTour[];                // Tour options
  formations: CaveFormation[];      // Geological features
  conditions: CaveConditions;       // Temperature, humidity, what to wear/bring
  accessibility: CaveAccessibility; // Physical requirements, limitations
  pricing: CavePricing[];          // Ticket types
  hours: CaveHours[];              // Seasonal hours
  safety: CaveSafety;              // Rules, prohibited items
  history: CaveHistory;            // Discovery, geological age

  // Shared Components (Reused)
  gearList: GearItem[];
  relatedShop: RelatedCategory[];
  nearbyAttractions?: NearbyAttraction[];

  // Optional Metadata
  coordinates?: Coordinates;
  bookingUrl?: string;
  websiteUrl?: string;
  mapUrl?: string;
}
```

### 3.2 Section Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│ 1. HERO SECTION                                             │
│    - Cave name, tagline                                     │
│    - Quick stats (depth, temp, discovery year, location)    │
│    - Hero image with overlay                                │
│    - Quick highlights badges                                │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 2. DESCRIPTION PROSE (bg-brand-cream)                       │
│    - Centered intro paragraph                               │
│    - Kim's authentic voice                                  │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 3. TOUR INFORMATION (bg-white)                              │
│    - Tour cards with duration, difficulty, highlights       │
│    - Border-left: sign-green (standard) / brand-orange (wild)│
│    - Booking CTA                                            │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 4. NOTABLE FORMATIONS (bg-brand-cream)                      │
│    - Formation cards (3-col grid)                           │
│    - Type badges, descriptions, fun facts                   │
│    - Kim's tips in font-hand                                │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 5. CONDITIONS & PREPARATION (bg-white)                      │
│    - Temperature, humidity info                             │
│    - What to wear / what to bring lists                     │
│    - Border-left: sign-green                                │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 6. ACCESSIBILITY (bg-brand-cream)                           │
│    - Physical requirements                                  │
│    - Limitations (wheelchair, claustrophobia, etc.)         │
│    - Accommodations available                               │
│    - Border-left: brand-orange (visibility)                 │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 7. PRICING & HOURS (bg-white)                               │
│    - Two-column layout (pricing | hours)                    │
│    - External booking disclaimer                            │
│    - Link to official website                               │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 8. SAFETY GUIDELINES (bg-brand-cream)                       │
│    - Rules (bullet list)                                    │
│    - Prohibited items (X icons)                             │
│    - Emergency contact                                      │
│    - Border-left: brand-orange                              │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 9. HISTORY & GEOLOGY (bg-white)                             │
│    - Discovery story                                        │
│    - Geological age context                                 │
│    - Notable events / local legends (optional)              │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 10. NEARBY ATTRACTIONS (bg-brand-cream) - Optional          │
│    - Grid of nearby destinations                            │
│    - Distance, activities                                   │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 11. GEAR CHECKLIST (bg-white)                               │
│    - AdventureGearChecklist component                       │
│    - columns={2}                                            │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 12. RELATED SHOP (bg-brand-cream)                           │
│    - AdventureRelatedShop component                         │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 13. CTA SECTION                                             │
│    - AdventureCTA component with custom props               │
│    - "Book a Tour" / "Get Directions"                       │
└─────────────────────────────────────────────────────────────┘
```

## 4. Type System (cave-types.ts)

### 4.1 Zod Schemas (~18 schemas)

```typescript
// Formation Type Taxonomy
export const FormationTypeSchema = z.enum([
  'stalactite',
  'stalagmite',
  'column',
  'flowstone',
  'soda_straw',
  'drapery',
  'helictite',
  'rimstone_pool',
  'cave_coral',
  'cave_ribbon',
  'fossil',
  'underground_pool',
  'large_chamber',
  'other'
]);

// Tour Difficulty
export const TourDifficultySchema = z.enum([
  'easy',
  'moderate',
  'strenuous',
  'wild_cave'
]);

// Cave Tour
export const CaveTourSchema = z.object({
  name: z.string().min(1),
  duration: z.string().min(1),           // "60 minutes"
  difficulty: TourDifficultySchema,
  distance: z.string().optional(),        // "0.5 miles"
  stairs: z.number().optional(),          // ~250
  groupSize: z.string().optional(),       // "Up to 15"
  highlights: z.array(z.string()).min(1).max(10),
  seasonalNotes: z.string().optional(),
  ageMinimum: z.number().optional(),
  reservationRequired: z.boolean().optional()
});

// Cave Formation
export const CaveFormationSchema = z.object({
  name: z.string().min(1),
  type: FormationTypeSchema,
  typeDisplay: z.string().min(1),
  description: z.string().min(10).max(500),
  ageEstimate: z.string().optional(),
  dimensions: z.string().optional(),
  funFact: z.string().optional(),
  highlight: z.boolean().default(false),
  kimNote: z.string().optional()
});

// Cave Conditions
export const CaveConditionsSchema = z.object({
  temperature: z.string().min(1),         // "54°F year-round"
  humidity: z.string().optional(),        // "High (90-100%)"
  groundConditions: z.string().optional(),// "Wet and slippery"
  whatToWear: z.array(z.string()).min(1).max(10),
  whatToBring: z.array(z.string()).min(1).max(10),
  whatToAvoid: z.array(z.string()).optional()
});

// Cave Accessibility
export const CaveAccessibilitySchema = z.object({
  physicalRequirements: z.array(z.string()).min(1).max(15),
  limitations: z.array(z.string()).min(1).max(15),
  accommodations: z.array(z.string()).optional(),
  medicalDisclaimer: z.string().optional(),
  adaStatement: z.string().optional(),
  waiverRequired: z.boolean().optional()
});

// Cave Pricing
export const CavePricingSchema = z.object({
  type: z.string().min(1),               // "Adult", "Child (6-12)"
  price: z.string().min(1),              // "$18" or "See website"
  notes: z.string().optional()
});

// Cave Hours
export const CaveHoursSchema = z.object({
  season: z.string().min(1),             // "Summer (June-August)"
  days: z.string().min(1),               // "Daily"
  times: z.string().min(1),              // "9am - 5pm"
  lastTour: z.string().optional()        // "Last tour at 4pm"
});

// Cave Safety
export const CaveSafetySchema = z.object({
  rules: z.array(z.string()).min(1).max(20),
  prohibited: z.array(z.string()).min(1).max(15),
  emergencyContact: z.string().optional()
});

// Cave History
export const CaveHistorySchema = z.object({
  discovery: z.string().min(1),
  geologicalAge: z.string().min(1),
  notableEvents: z.array(z.string()).optional(),
  localLegends: z.array(z.string()).optional()
});

// Main Props Schema
export const CaveTemplatePropsSchema = z.object({
  // Hero
  name: z.string().min(1),
  image: z.string().min(1),
  imageAlt: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  stats: z.array(StatItemSchema).min(1).max(6),

  // Metadata
  location: z.string().min(1),
  county: z.string().min(1),
  depth: z.number().positive(),
  temperature: z.string().min(1),
  discoveryYear: z.number().optional(),
  quickHighlights: z.array(z.string()).min(1).max(10),

  // Content sections
  tours: z.array(CaveTourSchema).min(1).max(10),
  formations: z.array(CaveFormationSchema).min(0).max(30),
  conditions: CaveConditionsSchema,
  accessibility: CaveAccessibilitySchema,
  pricing: z.array(CavePricingSchema).min(1).max(10),
  hours: z.array(CaveHoursSchema).min(1).max(10),
  safety: CaveSafetySchema,
  history: CaveHistorySchema,

  // Shared
  gearList: z.array(GearItemSchema).min(1).max(30),
  relatedShop: z.array(RelatedCategorySchema).min(0).max(10),
  nearbyAttractions: z.array(NearbyAttractionSchema).optional(),

  // Optional
  coordinates: CoordinatesSchema.optional(),
  bookingUrl: z.string().url().optional(),
  websiteUrl: z.string().url().optional(),
  mapUrl: z.string().url().optional()
});
```

### 4.2 Type Labels & Constants

```typescript
export const FORMATION_TYPE_LABELS: Record<FormationType, string> = {
  stalactite: 'Stalactite',
  stalagmite: 'Stalagmite',
  column: 'Column',
  flowstone: 'Flowstone',
  soda_straw: 'Soda Straw',
  drapery: 'Drapery / Bacon Strip',
  helictite: 'Helictite',
  rimstone_pool: 'Rimstone Pool',
  cave_coral: 'Cave Coral / Popcorn',
  cave_ribbon: 'Cave Ribbon',
  fossil: 'Fossil',
  underground_pool: 'Underground Pool',
  large_chamber: 'Large Chamber',
  other: 'Other Formation'
};

export const TOUR_DIFFICULTY_COLORS: Record<TourDifficulty, string> = {
  easy: 'border-l-sign-green',
  moderate: 'border-l-brand-brown',
  strenuous: 'border-l-brand-orange',
  wild_cave: 'border-l-red-800'
};

export const TOUR_DIFFICULTY_BADGES: Record<TourDifficulty, string> = {
  easy: 'bg-sign-green text-white',
  moderate: 'bg-brand-brown text-brand-cream',
  strenuous: 'bg-brand-orange text-brand-brown',
  wild_cave: 'bg-red-800 text-white'
};
```

## 5. Styling Architecture

### 5.1 Color Usage Map

| Section | Background | Border Accent | Text |
|---------|------------|---------------|------|
| Hero | Image overlay (brand-brown/50) | - | white |
| Description | brand-cream | - | brand-mud |
| Tours | white | sign-green (easy/mod), brand-orange (strenuous), red-800 (wild) | brand-brown |
| Formations | brand-cream | brand-brown | brand-brown, sign-green (type) |
| Conditions | white | sign-green | brand-mud |
| Accessibility | brand-cream | brand-orange | brand-brown |
| Pricing/Hours | white | sign-green | brand-mud |
| Safety | brand-cream | brand-orange | brand-brown |
| History | white | brand-brown | brand-mud |
| Nearby | brand-cream | sign-green | brand-brown |
| Gear | white | - | (component handles) |
| Shop | brand-cream | - | (component handles) |
| CTA | sign-green/brand-brown | - | white |

### 5.2 Typography Rules

```css
/* Section Headings */
.section-heading: font-display text-3xl md:text-4xl font-bold text-brand-brown

/* Card Headings */
.card-heading: font-display text-xl md:text-2xl font-bold text-brand-brown

/* Body Text */
.body-text: font-body text-base md:text-lg text-brand-mud leading-relaxed

/* Type Badges */
.type-badge: font-body text-sm text-sign-green

/* Fun Facts / Kim's Tips */
.fun-fact: font-hand text-sm text-brand-brown

/* Stats */
.stat-value: font-display text-2xl font-bold text-brand-brown
.stat-label: font-body text-sm text-brand-mud
```

### 5.3 Border Radius Rule

```css
/* ONLY rounded-sm (0.125rem) allowed */
.rounded-sm {
  border-radius: 0.125rem !important;
}

/* FORBIDDEN: rounded-md, rounded-lg, rounded-xl, rounded-3xl */
```

## 6. Component Integration

### 6.1 Reused Components

```astro
import AdventureGearChecklist from '../adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '../adventure/AdventureRelatedShop.astro';
import AdventureCTA from '../adventure/AdventureCTA.astro';
```

### 6.2 Component Props

**AdventureGearChecklist:**
```astro
<AdventureGearChecklist
  gearList={gearList}
  columns={2}
  variant="white"
/>
```

**AdventureRelatedShop:**
```astro
<AdventureRelatedShop
  categories={relatedShop}
/>
```

**AdventureCTA:**
```astro
<AdventureCTA
  heading="Ready to Explore?"
  description="Stop by WV Wild Outdoors for gear recommendations before your cave adventure."
  primaryText="Visit Our Shop"
  primaryHref="/shop/outdoor-gear"
  secondaryText="Get Directions"
  secondaryHref={mapUrl || "#"}
/>
```

## 7. Accessibility Architecture

### 7.1 ARIA Labels

```astro
<!-- Every section has aria-labelledby -->
<section aria-labelledby="tours-heading">
  <h2 id="tours-heading">Tour Options</h2>
</section>

<section aria-labelledby="formations-heading">
  <h2 id="formations-heading">Notable Formations</h2>
</section>
```

### 7.2 Focus States

```css
/* All interactive elements */
.focus-visible:outline-none
.focus-visible:ring-2
.focus-visible:ring-brand-orange
.focus-visible:ring-offset-2
```

### 7.3 Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 7.4 Color Contrast (WCAG AA)

- Orange badges use brown text (not white) for 5.81:1 contrast
- All text on colored backgrounds meets 4.5:1 minimum

## 8. External Linking Strategy

### 8.1 Booking Disclaimer

Commercial caves are separate businesses. Each cave page must display:

```astro
<div class="border-l-4 border-l-brand-orange bg-brand-cream p-4 rounded-sm">
  <p class="font-body text-sm text-brand-mud">
    <strong>Note:</strong> {name} is a separate commercial business.
    WV Wild Outdoors provides trip planning information only.
    For tickets and reservations, visit their official website.
  </p>
  {bookingUrl && (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block mt-2 font-body text-sm font-semibold text-sign-green hover:underline"
    >
      Visit {name} Website →
    </a>
  )}
</div>
```

### 8.2 External Link Pattern

```astro
{isExternalLink(href) && (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {text} →
  </a>
)}
```

## 9. Error Handling

### 9.1 Zod Validation

```typescript
// Runtime validation in page files
const validatedProps = CaveTemplatePropsSchema.parse(caveData);
```

### 9.2 Conditional Rendering

```astro
{formations.length > 0 && (
  <section>...</section>
)}

{nearbyAttractions && nearbyAttractions.length > 0 && (
  <section>...</section>
)}
```

## 10. Performance Considerations

### 10.1 Image Loading

```astro
<img
  src={image}
  alt={imageAlt}
  class="..."
  loading="eager"  /* Hero image */
/>

<img
  src={attraction.image}
  alt={attraction.name}
  class="..."
  loading="lazy"   /* Below-fold images */
/>
```

### 10.2 Component Code Splitting

Astro automatically code-splits components. No additional configuration needed.

## 11. Testing Strategy

### 11.1 Type Validation Tests

```typescript
describe('cave-types', () => {
  it('validates CaveTemplateProps schema', () => {
    const result = CaveTemplatePropsSchema.safeParse(mockCaveData);
    expect(result.success).toBe(true);
  });
});
```

### 11.2 Visual Regression Tests

- Hero section rendering
- Formation grid layout
- Accessibility section visibility
- Safety section orange accents
- CTA button styling

### 11.3 Accessibility Tests

- ARIA labels present
- Color contrast ratios
- Focus state visibility
- Screen reader navigation

## 12. Dependencies

### 12.1 Required Imports

```typescript
// Types
import type { StatItem, GearItem, RelatedCategory, NearbyAttraction, Coordinates } from '../../types/adventure';
import type { CaveTemplateProps, CaveTour, CaveFormation } from '../../types/cave-types';

// Components
import AdventureGearChecklist from '../adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '../adventure/AdventureRelatedShop.astro';
import AdventureCTA from '../adventure/AdventureCTA.astro';
```

### 12.2 No New Dependencies

CaveTemplate uses only existing WVWO dependencies:
- Astro 5
- TypeScript
- Tailwind CSS 4
- Zod (for schemas)

---

## 13. Detailed Component Integration Architecture

This section defines how CaveTemplate integrates with existing shared adventure components.

### 13.1 AdventureGearChecklist Integration

#### Component Source
```
wv-wild-web/src/components/adventure/AdventureGearChecklist.astro
```

#### Available Props
```typescript
interface AdventureGearChecklistProps {
  title?: string;           // Default: 'Gear Checklist'
  intro?: string;           // Optional intro paragraph
  items: GearItem[];        // Required: array of gear items
  columns?: 1 | 2 | 3;      // Default: 2
  variant?: 'white' | 'cream';  // Default: 'cream'
  animate?: boolean;        // Default: true
}

interface GearItem {
  name: string;
  optional: boolean;  // Default: false (required)
  icon?: StatIcon;    // Optional icon override
}
```

#### CaveTemplate Invocation Pattern
```astro
<!-- GEAR CHECKLIST SECTION -->
<section class="py-16 bg-white" aria-labelledby="gear-heading">
  <div class="container mx-auto px-4">
    <AdventureGearChecklist
      items={gearList}
      title="What to Bring"
      intro="Pack smart for your underground adventure. Caves stay 54-56°F year-round."
      columns={2}
      variant="cream"
    />
  </div>
</section>
```

#### Props Mapping Table

| CaveTemplateProps | AdventureGearChecklist Prop | Value/Logic |
|-------------------|----------------------------|-------------|
| `gearList` | `items` | Direct pass-through from cave data |
| (constant) | `title` | "What to Bring" |
| (constant) | `intro` | Cave-appropriate context text |
| (constant) | `columns` | 2 (cave gear lists are concise) |
| (constant) | `variant` | "cream" (matches section background alternation) |

#### Cave-Specific Default Gear Items
When creating cave data files, these are recommended default gear items:

```typescript
const CAVE_DEFAULT_GEAR: GearItem[] = [
  // Required items (mandatory for all tours)
  { name: 'Closed-toe shoes with good grip', optional: false },
  { name: 'Light jacket or sweater (54-56°F)', optional: false },
  { name: 'Long pants (protection from rocks)', optional: false },

  // Optional items
  { name: 'Camera (no flash photography)', optional: true },
  { name: 'Water bottle', optional: true },
  { name: 'Any required medication', optional: true },

  // Wild cave tour additions
  { name: 'Headlamp or flashlight', optional: true },
  { name: 'Knee pads', optional: true },
  { name: 'Gloves', optional: true },
];
```

#### Conditional Rendering
```astro
{/* Always show gear section - caves have specific requirements */}
<AdventureGearChecklist items={gearList} ... />
```
- Gear section is **always rendered** for cave pages
- If `gearList` is empty, the component internally renders nothing

#### Slot Usage for Waiver Reminder
The component supports a `footer` slot. For cave tours requiring waivers:

```astro
<AdventureGearChecklist items={gearList} title="What to Bring" columns={2}>
  <p slot="footer" class="font-body text-sm text-brand-mud mt-4">
    <span class="font-bold text-brand-orange">Note:</span> A signed waiver is required for all tour participants.
  </p>
</AdventureGearChecklist>
```

---

### 13.2 AdventureRelatedShop Integration

#### Component Source
```
wv-wild-web/src/components/adventure/AdventureRelatedShop.astro
```

#### Available Props
```typescript
interface AdventureRelatedShopProps {
  title?: string;           // Default: 'Shop Related Items'
  intro?: string;           // Default: "Planning a trip? We've got you covered."
  categories: RelatedCategory[];  // Required
  ctaText?: string;         // Default: 'Visit Our Shop'
  ctaHref?: string;         // Default: '/shop'
  variant?: 'white' | 'cream';  // Default: 'white'
  animate?: boolean;        // Default: true
}

interface RelatedCategory {
  name: string;
  description?: string;
  href: string;  // Must start with '/'
  icon?: StatIcon;
}
```

#### CaveTemplate Invocation Pattern
```astro
<!-- RELATED SHOP SECTION (Conditional) -->
{relatedShop && relatedShop.length > 0 && (
  <section class="py-16 bg-brand-cream" aria-labelledby="shop-heading">
    <div class="container mx-auto px-4">
      <AdventureRelatedShop
        categories={relatedShop}
        title="Gear Up for Your Cave Adventure"
        intro="Explore our selection of cave-friendly gear and outdoor essentials."
        ctaText="Shop All Outdoor Gear"
        ctaHref="/shop"
        variant="white"
      />
    </div>
  </section>
)}
```

#### Props Mapping Table

| CaveTemplateProps | AdventureRelatedShop Prop | Value/Logic |
|-------------------|--------------------------|-------------|
| `relatedShop` | `categories` | Direct pass-through |
| (constant) | `title` | "Gear Up for Your Cave Adventure" |
| (constant) | `intro` | Cave-appropriate promotional text |
| (constant) | `ctaText` | "Shop All Outdoor Gear" |
| (constant) | `ctaHref` | "/shop" |
| (constant) | `variant` | "white" (contrast with cream section bg) |

#### Cave-Specific Default Shop Categories
Recommended shop categories for cave destination pages:

```typescript
const CAVE_DEFAULT_SHOP_CATEGORIES: RelatedCategory[] = [
  {
    name: 'Flashlights & Headlamps',
    description: 'Essential for wild cave tours',
    href: '/shop/lights',
  },
  {
    name: 'Hiking Footwear',
    description: 'Grip matters underground',
    href: '/shop/footwear',
  },
  {
    name: 'Jackets & Layers',
    description: 'Caves stay 54-56°F year-round',
    href: '/shop/apparel/jackets',
  },
  {
    name: 'Day Packs',
    description: 'Compact bags for your essentials',
    href: '/shop/bags',
  },
];
```

#### Conditional Rendering
```astro
{relatedShop && relatedShop.length > 0 && (
  <AdventureRelatedShop ... />
)}
```
- **Show when**: `relatedShop` has at least one category
- **Hide when**: Empty array or undefined (valid for minimal pages)

---

### 13.3 AdventureCTA Integration

#### Component Source
```
wv-wild-web/src/components/adventure/AdventureCTA.astro
```

#### Available Props
```typescript
interface AdventureCTAProps {
  primaryText?: string;     // Default: 'Get Directions'
  primaryHref: string;      // Required
  secondaryText?: string;   // Default: 'Call the Shop'
  secondaryHref: string;    // Required
  heading?: string;         // Optional
  description?: string;     // Optional
  variant?: 'sign-green' | 'brand-brown';  // Default: 'sign-green'
  primaryIcon?: string;     // SVG path for icon
  secondaryIcon?: string;   // SVG path for icon
}
```

#### CaveTemplate Invocation Pattern
```astro
<!-- CTA SECTION -->
<AdventureCTA
  heading={`Plan Your Visit to ${name}`}
  description="Heading underground? Stop by the shop for flashlights, layers, and local tips."
  primaryText="Shop Outdoor Gear"
  primaryHref="/shop"
  secondaryText="Call the Shop"
  secondaryHref="tel:+13045551234"
  variant="sign-green"
/>
```

#### Props Mapping Table

| CaveTemplateProps | AdventureCTA Prop | Value/Logic |
|-------------------|-------------------|-------------|
| `name` | (in) `heading` | Dynamic: `Plan Your Visit to ${name}` |
| (constant) | `description` | Cave-specific value proposition |
| (constant) | `primaryText` | "Shop Outdoor Gear" |
| (constant) | `primaryHref` | "/shop" |
| (constant) | `secondaryText` | "Call the Shop" |
| (constant) | `secondaryHref` | WVWO phone number |
| (constant) | `variant` | "sign-green" |

#### Alternative: Directions CTA (when coordinates available)
```astro
{/* Option: Provide directions to cave when coordinates/mapUrl available */}
<AdventureCTA
  heading={`Plan Your Visit to ${name}`}
  description="Stop by the shop on your way for gear, snacks, and local tips."
  primaryText="Get Directions to Cave"
  primaryHref={mapUrl || `https://maps.google.com/?q=${coordinates?.lat},${coordinates?.lng}`}
  secondaryText="Shop Outdoor Gear"
  secondaryHref="/shop"
  variant="sign-green"
/>
```

#### Key Design Decision
The CTA emphasizes **WVWO's role as a gear supplier**, NOT a booking agent.
- Caves are third-party businesses
- WVWO sells gear for the adventure
- Booking is handled separately via the external booking disclaimer

---

### 13.4 External Booking Disclaimer Pattern

#### Problem Statement
Caves are separate commercial businesses. WVWO does not handle tour bookings. Users must clearly understand this before clicking external booking links.

#### Component Pattern (Inline Block)
```astro
<!-- BOOKING DISCLAIMER - Placed after Tours section -->
{bookingUrl && (
  <aside
    class="mt-8 p-5 bg-brand-cream border-l-4 border-brand-orange rounded-sm"
    role="note"
    aria-label="Third-party booking notice"
  >
    <div class="flex items-start gap-4">
      <!-- Info Icon -->
      <svg
        class="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <div>
        <p class="font-display text-lg font-bold text-brand-brown">
          Book Directly with {name}
        </p>
        <p class="font-body text-sm text-brand-mud mt-1">
          Tours and tickets are handled by {name}, not WV Wild Outdoors.
          We're here to help you find great adventures and gear up for your trip.
        </p>

        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 mt-4 bg-brand-orange text-white px-5 py-2.5 rounded-sm font-body font-bold hover:bg-brand-orange/90 motion-safe:transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
        >
          Book Tour on Official Site
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  </aside>
)}
```

#### Placement
- **Location**: End of Tours section, before Formations section
- **Visibility**: Only shown when `bookingUrl` is provided

#### Fallback: No Booking URL
```astro
{!bookingUrl && (
  <p class="mt-6 font-body text-brand-mud text-center">
    For tour reservations, call {name} directly or visit their official website.
  </p>
)}
```

---

### 13.5 Third-Party Cave Business Disclaimer Pattern

#### Problem Statement
Cave destination pages feature third-party businesses. WVWO requires legal clarity and trust-building.

#### Footer Disclaimer Pattern
```astro
<!-- THIRD-PARTY DISCLAIMER FOOTER - Always visible -->
<aside
  class="bg-brand-cream py-8 border-t border-brand-brown/10"
  role="contentinfo"
  aria-label="Third-party business disclaimer"
>
  <div class="container mx-auto px-4">
    <p class="font-body text-sm text-brand-mud text-center max-w-2xl mx-auto">
      <strong class="text-brand-brown">{name}</strong> is an independent business
      and not affiliated with WV Wild Outdoors. Tour availability, pricing, and
      policies are determined by {name}. WV Wild Outdoors provides this information
      as a service to outdoor adventurers.
      {websiteUrl && (
        <>
          {' '}
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="text-sign-green hover:underline"
          >
            Visit official {name} website
          </a>
        </>
      )}
    </p>
  </div>
</aside>
```

#### Placement
- **Location**: After AdventureCTA, before Layout footer
- **Visibility**: Always displayed on ALL cave pages

#### Minimal Variant (for tight layouts)
```astro
<p class="text-center text-xs text-brand-mud py-4 border-t border-brand-brown/10">
  {name} is an independent business. Pricing and availability subject to change.
</p>
```

---

### 13.6 Emergency Contact Display Pattern

#### Problem Statement
Cave safety requires visible emergency contact information without creating alarm.

#### Pattern: Safety Section Emergency Block
```astro
<!-- EMERGENCY CONTACT - Within Safety section -->
{safety.emergencyContact && (
  <div class="mt-8 p-6 bg-white border-l-4 border-brand-orange rounded-sm">
    <h3 class="font-display text-xl font-bold text-brand-brown mb-2">
      Emergency Contact
    </h3>
    <p class="font-body text-brand-mud mb-4">
      In case of emergency during your cave visit:
    </p>
    <a
      href={`tel:${safety.emergencyContact.replace(/[^0-9+]/g, '')}`}
      class="inline-flex items-center gap-3 font-display text-2xl font-bold text-brand-orange hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
    >
      <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      {safety.emergencyContact}
    </a>
  </div>
)}
```

#### Props Source
```typescript
interface CaveSafety {
  rules: string[];
  prohibited: string[];
  emergencyContact?: string;  // e.g., "911" or "(304) 567-8900"
}
```

#### Conditional Rendering
- **Show when**: `safety.emergencyContact` is defined
- **Hide when**: Not provided (caves with standard 911 coverage may omit)

#### Accessibility Notes
- Phone number is a clickable `tel:` link
- Large touch target (text-2xl, min 44x44px effective area)
- High contrast (brand-orange on white)
- SVG icon has aria-hidden="true"

---

### 13.7 Complete Section Order

```
CaveTemplate.astro Layout:
├── <Layout>
│   ├── 1.  Hero Section
│   ├── 2.  Description Prose (bg-brand-cream)
│   ├── 3.  Tours Section (bg-white)
│   │       └── Booking Disclaimer (conditional)
│   ├── 4.  Formations Section (bg-brand-cream)
│   ├── 5.  Conditions Section (bg-white)
│   ├── 6.  Accessibility Section (bg-brand-cream, orange accent)
│   ├── 7.  Pricing & Hours Section (bg-white)
│   ├── 8.  Safety Section (bg-brand-cream, orange accent)
│   │       └── Emergency Contact (conditional)
│   ├── 9.  History Section (bg-white)
│   ├── 10. Nearby Attractions (bg-brand-cream, conditional)
│   ├── 11. AdventureGearChecklist (bg-white)
│   ├── 12. AdventureRelatedShop (bg-brand-cream, conditional)
│   ├── 13. AdventureCTA (bg-sign-green)
│   └── 14. Third-Party Disclaimer Footer (bg-brand-cream)
└── </Layout>
```

---

### 13.8 Edge Cases and Fallbacks Summary

| Missing Data | Fallback Behavior |
|--------------|-------------------|
| `gearList` empty | AdventureGearChecklist renders nothing internally |
| `relatedShop` empty | Shop section hidden entirely |
| `bookingUrl` undefined | Show text "call directly" instead of button |
| `coordinates` undefined | Skip map link in CTA, use "/shop" as primary |
| `safety.emergencyContact` undefined | Emergency block hidden |
| `websiteUrl` undefined | Skip link in third-party disclaimer |
| `formations` empty | Formations section hidden |
| `nearbyAttractions` empty | Nearby section hidden |

---

### 13.9 Helper Functions

```typescript
/**
 * Generate a Google Maps URL from coordinates
 */
function getMapUrl(props: CaveTemplateProps): string | null {
  if (props.mapUrl) return props.mapUrl;
  if (props.coordinates) {
    return `https://maps.google.com/?q=${props.coordinates.lat},${props.coordinates.lng}`;
  }
  return null;
}

/**
 * Format phone number for tel: link
 */
function formatPhoneForLink(phone: string): string {
  return phone.replace(/[^0-9+]/g, '');
}

/**
 * Check if URL is external
 */
function isExternalLink(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}
```
