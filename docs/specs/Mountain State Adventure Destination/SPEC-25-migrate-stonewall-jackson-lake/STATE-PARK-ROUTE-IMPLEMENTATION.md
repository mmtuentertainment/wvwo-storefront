# State Park Route Implementation Guide

**SPEC**: SPEC-18 (State Parks Implementation)
**Status**: BLOCKED - Critical blocker identified
**Priority**: HIGH - Must complete before State Park migration
**Effort**: 30 minutes (copy + modify existing Lake route)

---

## Executive Summary

A critical infrastructure gap has been identified: **The state park dynamic route does not exist**.

While all other infrastructure is complete (type definitions, content schema, routing logic), the missing route file at:

```
src/pages/near/state-park/[slug].astro
```

Blocks the entire SPEC-18 state park migration. This document provides the complete template and step-by-step implementation guide.

**Impact**: Without this route, state park content will fail to generate during build and fall back to `/adventures/{id}/` (404).

---

## What's Missing

### Current Status

```
✓ Type system exists: StateParkTemplateProps in state-park-template-types.ts
✓ Content schema: 'state-park' registered in content.config.ts enum
✓ Routing logic: AdventureCard handles 'state-park' type correctly
✓ Helper functions: hasAccessibleFacilities(), hasLodging(), etc.

✗ MISSING: Route file src/pages/near/state-park/[slug].astro
```

### Why This Blocks State Parks

When Astro processes the build:

```
1. Scans src/pages/ for route files
2. Finds: /lake/, /wma/, /campground/, /river/
3. Missing: /state-park/
4. Result: State park content routes fallback to /adventures/{id}/
5. Issue: /adventures/{id}/ doesn't exist → 404 errors
```

---

## Implementation Steps

### Step 1: Create Directory (if needed)

```bash
mkdir -p src/pages/near/state-park
```

### Step 2: Create Route File

**File**: `src/pages/near/state-park/[slug].astro`

Copy the complete template below (lines 40-180):

```astro
---
/**
 * State Park Page - Dynamic Route
 * SPEC-18: Dynamic route for state park content
 *
 * Renders StateParkTemplate with data from /src/data/state-parks/{slug}.ts
 * Uses Vite's import.meta.glob() for auto-discovery of data files.
 *
 * To add a new state park: just add the .ts data file in /src/data/state-parks/
 */

import type { GetStaticPaths } from 'astro';
import Layout from '../../../layouts/Layout.astro';
import Header from '../../../components/Header.astro';
import Footer from '../../../components/Footer.astro';
import EmailCapture from '../../../components/EmailCapture.astro';
import Breadcrumb from '../../../components/Breadcrumb.astro';
import SchemaBreadcrumb from '../../../components/seo/SchemaBreadcrumb.astro';
import StateParkTemplate from '../../../components/templates/StateParkTemplate.astro';
import type { StateParkTemplateProps } from '../../../types/state-park-template-types';

// Type for data modules
type StateParkDataModule = {
  [key: string]: StateParkTemplateProps;
};

interface Props {
  parkData: StateParkTemplateProps;
  slug: string;
}

// ============================================================================
// STATIC PATH GENERATION WITH AUTO-DISCOVERY
// ============================================================================

export const getStaticPaths: GetStaticPaths = async () => {
  // AUTO-DISCOVER: Vite glob imports all .ts files in /src/data/state-parks/
  const dataModules = import.meta.glob<StateParkDataModule>(
    '../../../data/state-parks/*.ts',
    { eager: true }
  );

  const paths = [];

  for (const [path, module] of Object.entries(dataModules)) {
    const filename = path.split('/').pop() ?? '';
    // Skip example/template files
    if (filename.startsWith('_')) continue;

    const slug = filename.replace('.ts', '');

    // Find the exported data (look for StateParkTemplateProps-shaped export)
    const exportedData = Object.values(module).find(
      (value): value is StateParkTemplateProps =>
        typeof value === 'object' && value !== null && 'name' in value && 'facilities' in value
    );

    if (exportedData) {
      // Build-time validation: log warnings for missing required fields
      const requiredFields = ['name', 'description', 'coordinates', 'facilities', 'activitiesPrograms', 'trails', 'accessibility', 'regulations', 'reservations'] as const;
      const missingFields = requiredFields.filter(field => !(field in exportedData) || exportedData[field] === undefined);
      if (missingFields.length > 0) {
        console.warn(`[State Park ${slug}] Missing required fields: ${missingFields.join(', ')}`);
      }

      paths.push({
        params: { slug },
        props: {
          parkData: exportedData,
          slug,
        },
      });
    } else {
      console.warn(`[State Park ${slug}] No valid StateParkTemplateProps export found in ${path}`);
    }
  }

  return paths;
};

// ============================================================================
// PAGE PROPS
// ============================================================================

const { parkData, slug } = Astro.props;

// Place schema for geographic SEO
const placeSchema = {
  "@context": "https://schema.org",
  "@type": "Park",
  "name": parkData.name,
  "description": parkData.description,
  "geo": parkData.coordinates ? {
    "@type": "GeoCoordinates",
    "latitude": parkData.coordinates.lat,
    "longitude": parkData.coordinates.lng,
  } : undefined,
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "WV",
    "addressCountry": "US",
  },
};

// Breadcrumb data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Near Us', url: '/near/' },
  { name: parkData.name, url: `/near/state-park/${slug}/` },
];

// Meta
const pageTitle = `${parkData.name} | WV Wild Outdoors`;
const metaDescription = parkData.description.slice(0, 155) + (parkData.description.length > 155 ? '...' : '');
---

<Layout
  title={pageTitle}
  description={metaDescription}
  additionalSchemas={[placeSchema]}
>
  <Header />
  <Breadcrumb items={breadcrumbItems} />
  <SchemaBreadcrumb items={breadcrumbItems} />

  <StateParkTemplate {...parkData} />

  {/* Newsletter signup */}
  <section class="py-12 md:py-16 bg-brand-cream">
    <div class="container mx-auto px-4">
      <div class="max-w-xl mx-auto">
        <EmailCapture
          variant="card"
          heading="Get Park Updates"
          subheading="Programs, events, and facility updates from West Virginia State Parks - delivered to your inbox."
        />
      </div>
    </div>
  </section>

  <Footer />
</Layout>
```

### Step 3: Create Data Directory

```bash
mkdir -p src/data/state-parks
```

### Step 4: Create State Park Data Files

Create one file per state park in `src/data/state-parks/{slug}.ts`:

**Example**: `src/data/state-parks/canaan-valley.ts`

```typescript
import type { StateParkTemplateProps } from '../../types/state-park-template-types';

export const canaaanValleyData: StateParkTemplateProps = {
  name: 'Canaan Valley State Park',
  description: 'Premier mountain destination featuring pristine wilderness...',
  image: '/images/state-parks/canaan-valley-hero.webp',
  imageAlt: 'Canaan Valley State Park scenic overlook',

  coordinates: {
    lat: 39.0334,
    lng: -79.5044,
  },

  facilities: {
    camping: {
      campgrounds: [
        {
          name: 'Canaan Valley Campground',
          sites: 140,
          amenities: ['water', 'electricity', 'dump station'],
          reservationUrl: 'https://www.recreation.gov/camping/campgrounds/...',
        },
      ],
    },
    boatLaunches: [
      {
        name: 'Blackwater Falls Lake Launch',
        description: 'Main access point to 20-acre lake',
        facilities: ['dock', 'parking', 'picnic area'],
      },
    ],
    picnicAreas: [
      {
        name: 'Overlook Picnic Area',
        capacity: 50,
        amenities: ['grills', 'tables', 'water'],
      },
    ],
    accessibility: {
      features: [
        'wheelchair-accessible trails',
        'accessible parking',
        'accessible restrooms',
      ],
    },
  },

  activitiesPrograms: {
    recreationalActivities: [
      {
        type: 'hiking',
        name: 'Backcountry Trails',
        description: 'Extensive trail network from easy to challenging',
        featured: true,
      },
      {
        type: 'fishing',
        name: 'Lake and Stream Fishing',
        description: 'Trout and bass fishing in pristine waters',
        featured: true,
      },
      {
        type: 'boating',
        name: 'Canoeing and Kayaking',
        description: 'Paddling on Blackwater Falls Lake',
        featured: true,
      },
    ],
    rangerPrograms: [
      {
        name: 'Guided Nature Walks',
        schedule: 'Weekends May-October',
        description: 'Learn about local flora and fauna',
        ageGroup: 'All ages',
        registrationRequired: false,
      },
    ],
    specialEvents: [
      {
        name: 'Wildflower Festival',
        date: 'May 15-17, 2026',
        description: 'Celebrate spring wildflowers with guided hikes',
      },
    ],
  },

  trails: {
    featured: [
      {
        name: 'Blackwater Falls Trail',
        difficulty: 'moderate',
        length: 2.2,
        elevationGain: 300,
        description: 'Scenic descent to 65-foot waterfall',
        features: ['waterfall', 'river', 'forest'],
      },
    ],
  },

  accessibility: {
    features: [
      'Wheelchair-accessible visitor center',
      'Accessible playground',
      'Accessible fishing platform',
    ],
    contact: 'Call 304-555-0123 for accessibility accommodations',
  },

  regulations: {
    contactInfo: 'Park Office: 304-555-0123',
    website: 'https://www.wvstateparks.com/canaan-valley',
    hours: {
      open: '8:00 AM',
      close: 'Sunset',
    },
    rules: [
      'No glass containers',
      'Leash required for pets',
      'Quiet hours 10 PM - 8 AM',
    ],
  },

  reservations: {
    contactInfo: 'https://www.recreation.gov',
    campgroundReservationUrl: 'https://www.recreation.gov/camping/campgrounds/...',
    cabinReservationUrl: 'https://www.wvstateparks.com/cabins',
    advanceBooking: '6 months recommended',
  },
};
```

### Step 5: Verify imports exist

Ensure these components exist before building:

```
✓ src/components/templates/StateParkTemplate.astro
✓ src/types/state-park-template-types.ts
✓ src/layouts/Layout.astro
✓ src/components/Header.astro
✓ src/components/Footer.astro
✓ src/components/Breadcrumb.astro
✓ src/components/seo/SchemaBreadcrumb.astro
✓ src/components/EmailCapture.astro
```

If any are missing, create them following the pattern of Lake/WMA equivalents.

### Step 6: Build and Test

```bash
# Build the project
npm run build

# Watch for warnings about missing state parks
# Should see: "[State Park {slug}] Missing required fields: ..." if data incomplete

# Start development server
npm run dev

# Test generated routes
# Visit: http://localhost:3000/near/state-park/canaan-valley/
```

---

## Verification Checklist

After implementation, verify:

| Check | Status | Notes |
|-------|--------|-------|
| Route file created | - | `src/pages/near/state-park/[slug].astro` |
| getStaticPaths imports typed | - | Type: StateParkDataModule |
| Props interface matches other routes | - | shape: { parkData, slug } |
| Template imported correctly | - | StateParkTemplate component exists |
| Build passes without errors | - | Run: npm run build |
| Build passes without warnings | - | Check for field validation warnings |
| Detail pages generated | - | Verify dist/ contains state-park pages |
| /near/state-park/{slug}/ works | - | Test in dev server or built site |
| Cross-linking working | - | Check for links to related lakes/wmas (if implemented) |

---

## Future Enhancements

### Cross-Linking (Phase 2)

Add bidirectional links from state parks to lakes/wmas:

```typescript
// Add to state-park route:
const lakeModules = import.meta.glob('../../../data/lakes/*.ts', { eager: true });
const wmaModules = import.meta.glob('../../../data/wma/*.ts', { eager: true });

// Build cross-link relationships
const relatedLakes = [];
const relatedWMAs = [];

// Then render in template:
{relatedLakes.length > 0 && (
  <div>
    <p>Nearby fishing lakes:</p>
    {relatedLakes.map(lake => (
      <a href={`/near/lake/${lake.slug}/`}>{lake.name}</a>
    ))}
  </div>
)}
```

### Amenity Icons (Phase 2)

Enhance schema with visual indicators:

```typescript
// Add to placeSchema:
"amenityFeature": [
  { "@type": "LocationFeatureSpecification", name: "Camping", value: true },
  { "@type": "LocationFeatureSpecification", name: "Hiking", value: true },
  { "@type": "LocationFeatureSpecification", name: "Fishing", value: true },
]
```

---

## Related Files Already Complete

These files are ready and just need this route:

### Type Definitions
- `src/types/state-park-template-types.ts` (lines 589: `export type StateParkTemplateProps`)
- Includes: Helper functions, all field definitions, schema exports

### Content Schema
- `src/content.config.ts` (line 147: `'state-park'` in enum)
- Already validates markdown frontmatter

### Routing Logic
- `src/components/adventures/AdventureCard.tsx` (line 76-77):
  ```typescript
  case 'state-park':
    return `/near/state-park/${slug}/`;
  ```

### Suffix Stripping
- `src/components/adventures/AdventureCard.tsx` (line 47-48):
  ```typescript
  else if (id.endsWith('-state-park')) {
    slug = id.slice(0, -'-state-park'.length);
  }
  ```

---

## Common Issues & Troubleshooting

### Issue: Build Fails - "Cannot find module 'StateParkTemplate'"

**Solution**: Ensure StateParkTemplate.astro exists in `src/components/templates/`
- Check for typos in import path
- Verify component file name matches import statement

### Issue: Build Warns - "Missing required fields"

**Solution**: Add missing fields to state park data file
- Check console output for specific field names
- Refer to StateParkTemplateProps type definition
- Use type autocomplete in IDE

### Issue: /near/state-park/{slug}/ returns 404

**Solution**:
1. Verify route file created at exact path: `src/pages/near/state-park/[slug].astro`
2. Run `npm run build` (development mode may not update routes)
3. Check that state park data file exists: `src/data/state-parks/{slug}.ts`
4. Verify data matches StateParkTemplateProps shape

### Issue: Page renders but looks broken

**Solution**: Check that StateParkTemplate component exists and has correct structure
- Compare with LakeTemplate for structure
- Verify all props are used by template
- Check for missing component imports

---

## Testing Checklist for State Parks

```markdown
# State Park Route Testing Checklist

## Build Phase
- [ ] npm run build completes successfully
- [ ] No TypeScript errors
- [ ] No Zod validation warnings
- [ ] dist/near/state-park/ directory created
- [ ] dist/near/state-park/{slug}/index.html files generated

## Runtime Phase
- [ ] npm run dev starts without errors
- [ ] http://localhost:3000/near/state-park/canaan-valley/ loads
- [ ] Page displays park name and description
- [ ] Hero image loads correctly
- [ ] Park information sections render

## Content Verification
- [ ] Facilities section shows camping info
- [ ] Activities section lists recreations
- [ ] Trails section displays hiking paths
- [ ] Accessibility info shows accommodation options
- [ ] Contact and reservation info displayed

## SEO Verification
- [ ] Page title includes park name
- [ ] Meta description is set
- [ ] Schema.org Place schema included in page source
- [ ] Breadcrumb markup present

## Experience
- [ ] Newsletter signup appears at bottom
- [ ] Links are styled consistently
- [ ] Mobile view is responsive
- [ ] Page loads in < 2 seconds
```

---

## Summary

**What's Been Done**:
- Complete template provided (copy-paste ready)
- Step-by-step implementation guide
- Data file example
- Verification checklist
- Troubleshooting guide

**Time to Implement**: 30 minutes
1. Create file: 2 minutes
2. Copy template: 2 minutes
3. Create sample data: 10 minutes
4. Test build: 5 minutes
5. Verify routes: 5 minutes
6. Fix any issues: 5 minutes

**Result**: State park migration can begin immediately after implementation

---

**Implementation Guide Version**: 1.0
**Created**: January 10, 2026
**Status**: READY FOR DEPLOYMENT
