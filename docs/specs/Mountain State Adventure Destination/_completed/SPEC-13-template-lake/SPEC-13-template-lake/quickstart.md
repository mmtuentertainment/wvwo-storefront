# Quickstart Guide: Lake Template Component

**For**: Content Editors & Developers
**Component**: `LakeTemplate.astro`
**Time to First Lake Page**: <30 minutes
**Skill Level**: Intermediate (TypeScript + Astro knowledge required)

---

## Quick Navigation

- [5-Minute Setup](#5-minute-setup)
- [Create Your First Lake Page](#create-your-first-lake-page)
- [Data Structure Guide](#data-structure-guide)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## 5-Minute Setup

### Prerequisites

✅ **Required**:
- Astro 5+ project running
- SPEC-11 Adventure Components installed
- Types defined in `types/adventure.ts`
- Tailwind CSS 4 configured with WVWO colors

✅ **Verify Installation**:
```bash
cd wv-wild-web
npm run typecheck  # Should pass with no errors
```

### File Locations

```
wv-wild-web/
├── src/
│   ├── components/templates/
│   │   └── LakeTemplate.astro           # The template component
│   ├── types/
│   │   └── adventure.ts                  # Type definitions (includes LakeTemplateProps)
│   └── pages/near/
│       ├── summersville-lake.astro       # Example implementation
│       └── your-new-lake.astro           # Your lake page goes here
```

---

## Create Your First Lake Page

### Step 1: Create Page File

```bash
cd wv-wild-web/src/pages/near
touch your-lake-name.astro
```

### Step 2: Import Template & Types

```astro
---
// your-lake-name.astro
import LakeTemplate from '../../components/templates/LakeTemplate.astro';
import type { LakeTemplateProps } from '../../types/adventure';

const lakeData: LakeTemplateProps = {
  // Data goes here (see Step 3)
};
---

<LakeTemplate {...lakeData} />
```

### Step 3: Fill in Minimum Required Data

```astro
---
const lakeData: LakeTemplateProps = {
  // BASIC INFO (Required)
  name: 'Your Lake Name',
  acreage: 1500,
  maxDepth: 200,
  county: 'Your County',
  quickHighlights: [
    'Crystal clear water',
    'Premier fishing destination',
    '45 min from shop'
  ],

  // FISHING (Required - at least 1 species)
  fishSpecies: [
    {
      title: 'Smallmouth Bass',
      description: 'Year-round fishery with 14-18" fish common. Peak spring and fall.',
      notes: 'Use tube jigs on rocky points. Downsize to 6-8 lb test in clear water.'  // Optional: Kim's tip
    }
  ],

  // FISHING SPOTS (Required - at least 1 spot)
  fishingSpots: [
    {
      name: 'Main Point',
      depth: '20-40 feet',
      structure: 'Rocky points with submerged ledges',
      species: ['Smallmouth Bass', 'Walleye'],
      access: 'Boat access from main ramp'
    }
  ],

  // FACILITIES (Required)
  campgrounds: [],  // Use empty array if no campgrounds
  marina: {
    name: 'Lake Marina',
    services: ['Fuel', 'Bait & tackle'],
    boatLaunch: {
      ramps: 2,
      fee: '$5'
    },
    hours: '7am-7pm daily (May-Oct)',
    contact: '(555) 123-4567'
  },

  // ACTIVITIES (Optional - can be empty array)
  activities: [],

  // SEASONAL GUIDE (Optional - can be empty array)
  seasonalGuide: [],

  // SAFETY (Required - at least 1 regulation category)
  regulations: [
    {
      category: 'Boating Safety',
      rules: [
        'Life jackets required for all passengers',
        'No-wake zones within 50 feet of shore'
      ]
    }
  ],

  // MEDIA (Required)
  heroImage: '/images/your-lake-hero.jpg',
  mapUrl: 'https://maps.google.com/?q=Your+Lake+WV'  // Optional
};
---
```

### Step 4: Build & Preview

```bash
npm run build
# Build MUST succeed - if it fails, Zod validation caught an error

npm run preview
# Visit: http://localhost:4321/near/your-lake-name
```

✅ **Success Indicators**:
- Build completes without errors
- Page renders with your lake data
- Hero section shows lake name and stats
- Fish species display in 2-column grid
- Marina section shows boat launch info

❌ **If Build Fails**:
- Read error message carefully (Zod will tell you exactly what's wrong)
- Common issues: Empty arrays for required fields, missing required properties
- Fix data and rebuild

---

## Data Structure Guide

### Basic Info Section

**All Required**:
```typescript
{
  name: string;           // "Summersville Lake"
  acreage: number;        // 2790
  maxDepth: number;       // 327 (in feet)
  county: string;         // "Nicholas"
  quickHighlights: string[];  // 3-5 badges in hero
}
```

**Hero Display**:
- Lake name: Large white text over hero image (h1, font-display)
- Stats: 4-column grid overlay (acreage, depth, county)
- Quick highlights: Green badges below stats

### Fish Species (PRIMARY CONTENT)

**At Least 1 Required**:
```typescript
fishSpecies: Array<{
  title: string;         // "Smallmouth Bass"
  description: string;   // Season, availability, size range
  notes?: string;        // Optional: Kim's tips (renders in font-hand)
}>
```

**Rendering**:
- 2-column grid on desktop, 1-column mobile
- Green border-left accent
- Kim's tips in cursive font with border-top separator

**Best Practices**:
- Order by popularity/importance (most targeted first)
- Include 4-6 species for typical WV lake
- Keep descriptions 1-2 sentences
- Kim's tips: Specific techniques, local knowledge

**Example**:
```typescript
{
  title: 'Walleye',
  description: 'Trophy walleye up to 30+ inches. Best fishing at night or low-light. All walleye 20-30 inches must be released.',
  notes: 'Vertical jig near the dam in 40-60 ft of water. Live bait or blade baits work well. Night fishing permitted year-round.'
}
```

### Fishing Spots

**At Least 1 Required**:
```typescript
fishingSpots: Array<{
  name: string;          // "Long Point Cliff"
  depth: string;         // "40-60 feet" (flexible format)
  structure: string;     // "Rocky ledges, submerged boulders"
  species: string[];     // ["Smallmouth Bass", "Walleye"] (min 1)
  access: string;        // "Boat only, 2 miles from Battle Run launch"
}>
```

**Rendering**:
- Full-width stacked cards
- Brown border-left accent
- 2-column grid inside card (details left, species badges right)

**Best Practices**:
- Include 3-8 named spots
- Be specific about depth ranges
- Describe structure (rocky, sandy, timber, etc.)
- Mention access method (boat/shore/kayak)

### Marina & Boat Access

**Required (Single Marina Object)**:
```typescript
marina: {
  name: string;               // "Summersville Lake Marina"
  services: string[];         // ["Fuel", "Bait & tackle", "Ice"] (min 1)
  boatLaunch: {
    ramps: number;            // 3 (min 1)
    fee?: string;             // "$5" (optional)
  };
  rentals?: string[];         // ["Kayaks", "Pontoon boats"] (optional)
  hours: string;              // "7am-8pm daily (May-Oct)"
  contact: string;            // "(304) 872-3773"
}
```

**Rendering**:
- Full-width card with brown border-left
- 2-column grid (services left, boat launch right)
- Phone number becomes clickable `tel:` link

**Best Practices**:
- List all available services
- Include seasonal hours
- Provide direct phone number
- Note rental availability

### Campgrounds

**Can Be Empty Array**:
```typescript
campgrounds: Array<{
  type: string;          // "Battle Run Campground"
  count: number;         // 117 (site count)
  description: string;   // Brief overview
  link?: string;         // Reservation URL (optional)
  contact?: string;      // Phone number (optional)
}>
```

**Uses Existing Component**: `AdventureCampingList` from SPEC-11

### Activities (Optional)

```typescript
activities: Array<{
  name: string;          // "Scuba Diving"
  description: string;   // Activity details
  season: string;        // "May-October"
  difficulty?: 'easy' | 'moderate' | 'challenging';  // Optional
}>
```

**Rendering**:
- 3-column grid via AdventureFeatureSection
- Season + difficulty as metadata
- Green border-left accent

### Seasonal Guide (Optional)

```typescript
seasonalGuide: Array<{
  season: 'Spring' | 'Summer' | 'Fall' | 'Winter';
  highlights: string[];           // Min 1 highlight
  fishingFocus?: string;          // Optional fishing notes
}>
```

**Rendering**:
- 2-column grid (2 seasons per row)
- Green border-left accent on cards
- Fishing focus in bordered callout if present

**Best Practice**: Provide all 4 seasons for completeness

### Regulations & Safety

**At Least 1 Category Required**:
```typescript
regulations: Array<{
  category: string;      // "Walleye Regulations"
  rules: string[];       // Min 1 rule
}>
```

**Rendering**:
- Full-width cards with **orange** border-left (warning color)
- Bulleted rules list
- Orange warning icon (⚠) prefix

**Best Practices**:
- Separate by category (Walleye, Boating, Diving, etc.)
- Include slot limits, creel limits, safety rules
- Note that regulations are subject to change (footer added automatically)

---

## Common Patterns

### Pattern 1: Copy Existing Lake

**Easiest Way to Start**:
```bash
# Copy summersville-lake.astro as template
cp src/pages/near/summersville-lake.astro src/pages/near/your-lake.astro

# Edit the data to match your lake
# Keep structure, replace content
```

### Pattern 2: Empty Optional Sections

**If lake has no activities or seasonal guide**:
```typescript
const lakeData: LakeTemplateProps = {
  // ... required fields ...

  activities: [],          // Empty array hides section
  seasonalGuide: [],       // Empty array hides section

  campgrounds: [],         // Empty if no campgrounds
};
```

**Template automatically hides empty sections** - no broken UI.

### Pattern 3: Kim's Tips Best Practices

**Good Kim's Tips** (specific, practical):
```typescript
notes: 'Downsize to 6-8 lb test in gin-clear water. Tube jigs and drop shot rigs work well. Target rocky points and ledges.'
```

**Avoid Generic Tips**:
```typescript
notes: 'Fish are active in spring.'  // Too vague
```

**Kim's Voice Characteristics**:
- Direct, practical advice
- Local terminology ("gin-clear", "stack up on structure")
- Specific techniques with gear/bait/depth recommendations
- Conversational tone

### Pattern 4: Array Size Limits

**Performance Limits** (NFR-009):
```typescript
fishSpecies: max 20 items
fishingSpots: max 15 items
campgrounds: max 10 items
activities: max 20 items
```

Lighthouse performance score must remain 90+ within these limits.

**Typical WV Lake Data**:
- Fish species: 6-12
- Fishing spots: 5-10
- Campgrounds: 3-6
- Activities: 4-8

### Pattern 5: Hero Image Best Practices

**Image Requirements**:
- Size: 1920x1080px minimum (16:9 aspect ratio)
- Format: JPG or WebP
- Quality: Compressed for web (aim for <500KB)
- Content: Aerial view or wide landscape shot

**Location**:
```
wv-wild-web/public/images/lakes/your-lake-hero.jpg
```

**Usage**:
```typescript
heroImage: '/images/lakes/your-lake-hero.jpg'
```

---

## Troubleshooting

### Build Error: "Invalid fishing spot at index 0"

**Cause**: Empty `species` array in fishing spot

**Fix**:
```typescript
// ❌ WRONG
fishingSpots: [
  {
    name: 'Spot',
    species: []  // Empty array
  }
]

// ✅ CORRECT
fishingSpots: [
  {
    name: 'Spot',
    species: ['Bass']  // At least 1 species
  }
]
```

### Build Error: "Marina validation failed"

**Cause**: Missing required marina fields

**Fix**:
```typescript
// ✅ All required fields
marina: {
  name: 'Marina Name',        // Required
  services: ['Fuel'],         // Required (min 1)
  boatLaunch: {
    ramps: 1                  // Required
  },
  hours: '9-5',               // Required
  contact: '555-1234'         // Required
}
```

### Build Succeeds But Page Looks Broken

**Check**:
1. Hero image path correct? (Should be relative to `public/`)
2. Empty arrays for optional sections? (They hide gracefully)
3. Browser console errors? (May indicate missing assets)

**Debug**:
```bash
npm run build
npm run preview
# Open browser dev tools, check console
```

### Fish Species Not Displaying

**Cause**: Likely empty `fishSpecies` array

**Fix**:
```typescript
// ❌ WRONG
fishSpecies: []

// ✅ CORRECT - At least 1 species required
fishSpecies: [
  { title: 'Bass', description: 'Year-round' }
]
```

### Marina Section Not Showing

**Cause**: `marina` is likely `undefined` or missing

**Fix**:
```typescript
// Every lake MUST have a marina object
marina: {
  name: 'Lake Access',
  services: ['Public boat ramp'],
  boatLaunch: { ramps: 1 },
  hours: 'Dawn to dusk',
  contact: 'Contact WV DNR'
}
```

---

## Advanced Usage

### Custom Page Title

```typescript
const lakeData: LakeTemplateProps = {
  // ... other fields ...

  title: 'Custom Page Title | WV Wild Outdoors'  // Overrides default
};
```

**Default**: `"${name} | WV Wild Outdoors"`

### Custom Intro Text

```typescript
const lakeData: LakeTemplateProps = {
  // ... other fields ...

  intro: 'Custom introduction text for this specific lake page.'
};
```

**Default**: Template uses standard intro based on lake name.

### Adding Gear Checklist & Shop Categories

**Note**: These are passed separately, not in `LakeTemplateProps`

```astro
---
const lakeData: LakeTemplateProps = { /* ... */ };

const gearItems = [
  { category: 'Fishing Gear', items: ['Rod & reel', 'Tackle box', 'Cooler'] }
];

const shopCategories = [
  { name: 'Fishing Tackle', href: '/shop/fishing' }
];
---

<LakeTemplate
  {...lakeData}
  gearItems={gearItems}
  shopCategories={shopCategories}
/>
```

---

## Complete Example

```astro
---
// your-lake.astro - Complete working example
import LakeTemplate from '../../components/templates/LakeTemplate.astro';
import type { LakeTemplateProps } from '../../types/adventure';

const lakeData: LakeTemplateProps = {
  // BASIC INFO
  name: 'Example Lake',
  acreage: 1200,
  maxDepth: 150,
  county: 'Example County',
  quickHighlights: [
    'Excellent smallmouth fishing',
    'Family-friendly campgrounds',
    '30 min from shop'
  ],

  // FISHING (PRIMARY)
  fishSpecies: [
    {
      title: 'Smallmouth Bass',
      description: 'Year-round fishery. 12-16" fish common, trophy fish to 20". Best spring and fall on rocky structure.',
      notes: 'Use 3-4" tube jigs in natural colors. Target points and ledges in 15-30 ft. Early morning topwater can be productive.'
    },
    {
      title: 'Walleye',
      description: 'Growing walleye population. Best fishing at night. All walleye 20-30" must be released.',
      notes: 'Vertical jig near deeper structure. Blade baits and live minnows work well. Night fishing permitted.'
    }
  ],

  fishingSpots: [
    {
      name: 'North Point',
      depth: '25-45 feet',
      structure: 'Rocky point with submerged ledges and boulders',
      species: ['Smallmouth Bass', 'Walleye'],
      access: 'Boat access from main ramp, 1.5 miles north'
    },
    {
      name: 'Dam Area',
      depth: '60-100 feet',
      structure: 'Deep water with rocky bottom, vertical drop-offs',
      species: ['Walleye', 'Lake Trout'],
      access: 'Boat only, 3 miles from main ramp'
    }
  ],

  // FACILITIES
  campgrounds: [
    {
      type: 'Lakeview Campground',
      count: 75,
      description: 'Wooded sites with electric hookups. Bathhouse, playground, swimming beach access.',
      link: 'https://www.recreation.gov/camping/example-lake',
      contact: '(555) 123-4567'
    }
  ],

  marina: {
    name: 'Example Lake Marina',
    services: ['Fuel (gas only)', 'Bait & tackle', 'Ice', 'Snacks'],
    boatLaunch: {
      ramps: 2,
      fee: '$5'
    },
    rentals: ['Kayaks', 'Paddleboards'],
    hours: '7am-7pm daily (Memorial Day - Labor Day)',
    contact: '(555) 987-6543'
  },

  // ACTIVITIES (Optional but recommended)
  activities: [
    {
      name: 'Swimming',
      description: 'Designated swimming beach with lifeguards. Sandy beach area with gradual depth.',
      season: 'Memorial Day - Labor Day',
      difficulty: 'easy'
    },
    {
      name: 'Kayaking',
      description: 'Calm waters ideal for kayaking. Rentals available at marina. Multiple coves to explore.',
      season: 'May - October',
      difficulty: 'easy'
    }
  ],

  // SEASONAL GUIDE (Optional)
  seasonalGuide: [
    {
      season: 'Spring',
      highlights: [
        'Smallmouth spawn in shallow rocky areas',
        'Walleye fishing picks up',
        'Campground opens mid-May',
        'Water temps 50-65°F'
      ],
      fishingFocus: 'Target shallow rocky points for pre-spawn smallmouth. Use suspending jerkbaits and tube jigs.'
    },
    {
      season: 'Summer',
      highlights: [
        'Peak tourism season',
        'Swimming beach open with lifeguards',
        'Calm waters for kayaking',
        'All facilities fully operational'
      ],
      fishingFocus: 'Deep water smallmouth 25-40 ft. Early morning and evening best. Drop shot rigs effective.'
    },
    {
      season: 'Fall',
      highlights: [
        'Smallmouth fishing peaks',
        'Fall foliage from water',
        'Fewer crowds after Labor Day',
        'Water temps cool to 50-65°F'
      ],
      fishingFocus: 'Smallmouth move back to shallower structure. Topwater effective at dawn. Target 15-30 ft depths.'
    },
    {
      season: 'Winter',
      highlights: [
        'Limited access (some ramps close)',
        'Walleye fishing for trophy fish',
        'Quiet season for solitude',
        'Campground closed'
      ],
      fishingFocus: 'Deep walleye near dam 50-80 ft. Vertical jigging. Night fishing permitted. Dress for cold.'
    }
  ],

  // REGULATIONS (Required)
  regulations: [
    {
      category: 'Walleye Regulations',
      rules: [
        'All walleye 20-30 inches must be released immediately',
        'Daily creel limit: 8 walleye, only 1 over 30 inches',
        'Possession limit: 16 walleye (2 days worth)'
      ]
    },
    {
      category: 'Boating Safety',
      rules: [
        'All boats must have USCG-approved life jackets for each person',
        'Children under 13 must wear life jacket when boat is underway',
        'No-wake zones within 50 feet of shore, docks, swimmers',
        'Navigation lights required after sunset'
      ]
    }
  ],

  // MEDIA
  heroImage: '/images/lakes/example-lake-hero.jpg',
  mapUrl: 'https://maps.google.com/?q=Example+Lake+WV'
};
---

<LakeTemplate {...lakeData} />
```

---

## Next Steps

### After Your First Lake Page

1. **Test Across Devices**:
   ```bash
   npm run preview
   # Test on mobile, tablet, desktop viewports
   ```

2. **Run Lighthouse Audit**:
   - Open Chrome DevTools
   - Navigate to Lighthouse tab
   - Run audit (aim for 90+ on all metrics)

3. **Validate WVWO Compliance**:
   - Check border-radius (should be `rounded-sm` only)
   - Verify font usage (Bitter for headings, Permanent Marker for tips)
   - Confirm color palette (brown, green, cream, orange <5%)

4. **Create More Lake Pages**:
   - Copy your working example
   - Replace data
   - Build and deploy

### Resources

- **Type Definitions**: `wv-wild-web/src/types/adventure.ts`
- **Component Source**: `wv-wild-web/src/components/templates/LakeTemplate.astro`
- **Example Page**: `wv-wild-web/src/pages/near/summersville-lake.astro`
- **SPEC-13 Documentation**: `docs/specs/.../SPEC-13-template-lake/`

### Getting Help

**Build Errors**:
1. Read Zod error message (tells you exactly what's wrong)
2. Check quickstart troubleshooting section
3. Compare to example lake page (summersville-lake.astro)

**Questions**:
- Review SPEC-13 spec.md for requirements
- Check data-model.md for type details
- Reference architecture.md for system design

---

**Ready to Build Your Lake Page!** 🎣

Start with the minimum required data, build, preview, then expand with activities, seasonal guide, and additional fishing spots.
