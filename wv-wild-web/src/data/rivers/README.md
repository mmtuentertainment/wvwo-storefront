# River Data Files

This directory contains data files for river adventure pages following the **RiverTemplate** component structure defined in SPEC-14.

## Quick Start

### Creating a New River Page

1. **Copy the example template**:
   ```bash
   cp _example.ts new-river.ts
   ```

2. **Fill in your river's data** using the example as a guide

3. **Import in your Astro page**:
   ```astro
   ---
   import RiverTemplate from '@/components/adventure/RiverTemplate.astro';
   import { newRiverData } from '@/data/rivers/new-river';
   ---
   <RiverTemplate {...newRiverData} />
   ```

## File Structure

```
rivers/
├── _example.ts          # Complete reference with all fields (COPY THIS)
├── gauley.ts           # Gauley River (IN PROGRESS - has TODOs)
└── README.md           # This file
```

## Data File Format

River data files export a typed object matching `RiverTemplateProps`:

```typescript
import type { RiverTemplateProps } from '../../types/adventure';

export const myRiverData: RiverTemplateProps = {
  // Hero section (REQUIRED)
  name: 'River Name',
  image: '/images/rivers/hero.jpg',
  imageAlt: 'Description for screen readers',
  tagline: 'Brief compelling tagline',
  description: 'Full description...',
  stats: [
    { value: '25', label: 'Miles', icon: 'distance' },
    // ... more stats
  ],

  // Metadata (REQUIRED)
  length: 25,
  county: 'County Name',
  difficultyRange: 'Class III-V',
  quickHighlights: ['Rapids', 'Fishing', 'Guides'],

  // Content sections
  rapids: [...],
  fishing: {...},
  outfitters: [...],
  seasonalFlow: [...],
  accessPoints: [...],
  safety: [...],
  nearbyAttractions: [...],
  gearList: [...],
  relatedShop: [...],

  // Optional metadata
  difficulty: 'challenging',
  bestSeason: 'fall',
  coordinates: { lat: 38.2347, lng: -80.8653 },
};
```

## Required Fields

Every river data file MUST include:

- **Hero section**: name, image, imageAlt, tagline, description, stats
- **Metadata**: length, county, difficultyRange, quickHighlights
- **Content sections**: rapids[], fishing{}, outfitters[], seasonalFlow[], accessPoints[], safety[], nearbyAttractions[], gearList[], relatedShop[]

## Optional Fields

- `difficulty`: Overall difficulty level ('easy' | 'moderate' | 'challenging' | 'rugged')
- `bestSeason`: Recommended season ('spring' | 'summer' | 'fall' | 'winter')
- `coordinates`: GPS coordinates for mapping
- `mapUrl`: Google Maps link
- `waterLevelUrl`: Real-time water gauge link

## Content Guidelines

### Rapids Section

Show **3-5 showcase rapids** that define the river's character:

```typescript
rapids: [
  {
    name: 'Pillow Rock',
    class: { base: 'V', modifier: '+' },
    displayName: 'Class V+',
    description: 'Technical description...',
    runnable: 'Who can run this rapid',
    kimNote: 'Optional personal tip from Kim',
  },
]
```

**Rapid Class Notation**:
- `base`: Roman numerals I-V
- `modifier`: '+' or '-' for precision
- `lowWater`: Optional easier class at low flows
- `highWater`: Optional harder class at high flows
- `displayName`: Human-readable UI label

### Fishing Information

Complete fishing details for anglers:

```typescript
fishing: {
  species: ['Smallmouth Bass', 'Rainbow Trout'],
  techniques: 'Fishing methods and baits...',
  seasons: 'Best times to fish...',
  regulations: 'Size/creel limits, license requirements...',
  catchAndRelease: 'Optional C&R guidelines',
  kimNote: 'Optional fishing tip from Kim',
}
```

### Outfitters

**2-3 commercial outfitters** with services and contact info:

```typescript
outfitters: [
  {
    name: 'ACE Adventure Resort',
    services: ['Guided rafting', 'Kayak rentals'],
    contact: '(304) 469-2651',
    website: 'https://aceraft.com',
    pricing: '$75-$150 per person',
  },
]
```

### Seasonal Flow

**4 seasonal entries** (Spring, Summer, Fall, Winter):

```typescript
seasonalFlow: [
  {
    season: 'Fall (September-October)',
    flowRate: 'Dam releases 2000-3000 CFS',
    conditions: 'Water and weather description...',
    accessibility: 'Who can run at these flows...',
  },
]
```

### Access Points

**Minimum 2 points** (put-in and take-out):

```typescript
accessPoints: [
  {
    name: 'Summersville Dam Put-In',
    type: 'Put-in',
    facilities: ['Parking', 'Toilets', 'Boat ramp'],
    coordinates: { lat: 38.2347, lng: -80.8653 },
    restrictions: 'Fees, hours, special rules...',
  },
]
```

### Safety

**Minimum 3 categories** (Required Equipment, Skill Requirements, Hazards):

```typescript
safety: [
  {
    category: 'Required Equipment',
    items: ['Type V PFD', 'Helmet', 'Throw rope'],
    importance: 'critical', // 'critical' | 'high' | 'medium'
  },
]
```

### Nearby Attractions

**3-5 points of interest** for trip planning:

```typescript
nearbyAttractions: [
  {
    name: 'Summersville Lake',
    distance: '5 miles upstream',
    description: 'Camping and swimming...',
    link: 'https://www.summersville-lake.com',
  },
]
```

## Image Guidelines

### Hero Images

Save hero images to `/public/images/rivers/[river-name]-hero.jpg`:

- **Aspect ratio**: 16:9 or 21:9 (wide landscape)
- **Resolution**: 1920x1080px minimum
- **Subject**: Action shot showing whitewater or scenic beauty
- **Alt text**: Descriptive for accessibility (include difficulty, season, location)

**Good alt text examples**:
- "Whitewater kayaker navigating Class V rapids on the Gauley River in fall colors"
- "Commercial raft team running Sweet's Falls on the Upper Gauley"
- "Fly fisherman casting in the Gauley River tailwater at sunrise"

## Stats Icons

Available icon options for stats array:

- `distance`: Map/distance icon
- `time`: Clock icon
- `calendar`: Calendar/season icon
- `check`: Checkmark icon
- `info`: Information icon
- `location`: Pin/location icon
- `area`: Area/region icon
- `elevation`: Elevation icon
- `circle`: Filled circle (use for optional gear items)
- `none`: No icon

## Shop Integration

Link to **2-3 relevant shop categories**:

```typescript
relatedShop: [
  {
    name: 'Kayaking & Rafting Gear',
    description: 'PFDs, helmets, and safety equipment',
    href: '/shop/kayaking',
  },
  {
    name: 'Fishing Equipment',
    description: 'Rods, reels, and tackle',
    href: '/shop/fishing',
  },
]
```

## Type Safety

All river data files are **fully type-checked** against `RiverTemplateProps` from `types/adventure.ts`:

- ✅ Compile-time validation
- ✅ IDE autocomplete
- ✅ Inline documentation
- ✅ Runtime validation with Zod schemas

## Example River: Gauley River

See `gauley.ts` for a **working example** (currently has TODOs for missing data):

- Shows complete structure
- Includes TODO comments for incomplete sections
- Demonstrates all field types
- Ready to fill in with actual data

## Validation

Run type-check to validate all river data files:

```bash
npm run typecheck
```

## Related Documentation

- **SPEC-14**: River Template Component System
- **types/adventure.ts**: Complete type definitions
- **RiverTemplate.astro**: Component implementation

---

**Questions?** Check `_example.ts` for complete field documentation with inline comments.
