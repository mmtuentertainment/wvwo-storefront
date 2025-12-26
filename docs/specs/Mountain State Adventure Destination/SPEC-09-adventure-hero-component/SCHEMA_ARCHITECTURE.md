# Schema.org Architecture for AdventureHero.astro

**Version**: 1.0.0
**Author**: SEO & Schema.org Architect
**Date**: 2025-12-26
**Status**: Design Document

---

## Executive Summary

This document defines the structured data architecture for WVWO's adventure content system, designed to dominate "near me" searches and establish WVWO as the authority for WV outdoor adventures. The schema strategy combines geographic precision with content richness to maximize Google Rich Results visibility.

---

## 1. Schema.org Type Selection Strategy

### 1.1 Type Hierarchy by Adventure Category

| Adventure Type | Primary Schema | Secondary Schemas | Why This Combination |
|----------------|----------------|-------------------|----------------------|
| **Lake** (Sutton, Summersville) | `TouristAttraction` | `LakeBodyOfWater`, `Place` | Google recognizes TouristAttraction for rich results; LakeBodyOfWater adds semantic precision |
| **WMA** (Elk River, Burnsville) | `NaturalFeature` | `Place`, `Park` | WMAs are natural areas, Park adds recreation context |
| **River** (Elk River, Gauley) | `TouristAttraction` | `RiverBodyOfWater`, `Place` | Rivers as destinations (kayaking, fishing) |
| **Trail** (backcountry hikes) | `TouristAttraction` | `Trail` (custom extension) | Trail is a pending schema.org type, use TouristAttraction as fallback |
| **State Park** | `Park` | `TouristAttraction`, `Place` | Parks are official recreation areas |
| **Cave** (Seneca Caverns) | `TouristAttraction` | `CivicStructure` | Commercial caves are attractions |
| **Ski Resort** (Snowshoe) | `SkiResort` | `TouristAttraction`, `LocalBusiness` | SkiResort is specific type for winter destinations |
| **Historic Site** | `TouristAttraction` | `HistoricSite` (pending) | Cultural/historic interest |

### 1.2 The @graph Approach (Recommended)

Use JSON-LD `@graph` to combine multiple related schemas in a single script block:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "TouristAttraction", "@id": "#adventure" },
    { "@type": "Article", "@id": "#guide" },
    { "@type": "BreadcrumbList", "@id": "#breadcrumb" },
    { "@type": "LocalBusiness", "@id": "#wvwo-shop" }
  ]
}
```

**Benefits**:
- Single script block for all related schemas
- Cross-referencing via `@id` for semantic connections
- Cleaner HTML output
- Google can parse relationships between entities

---

## 2. GeoCoordinates Architecture

### 2.1 Precision Guidelines

| Location Type | Precision | Example | Rationale |
|---------------|-----------|---------|-----------|
| **Point Location** (trailhead, boat ramp) | 5 decimal places | 38.66200, -80.69320 | GPS-accurate (~1.1 meter precision) |
| **Lake/Reservoir** | 4 decimal places | 38.6620, -80.6932 | Represents approximate center |
| **WMA/Forest** | 4 decimal places | 38.6833, -80.5833 | Center of management area |
| **WVWO Shop** | 5 decimal places | 38.49910, -80.75460 | Exact business location |

### 2.2 GeoCoordinates Schema

```json
{
  "@type": "GeoCoordinates",
  "latitude": 38.6620,
  "longitude": -80.6932,
  "elevation": 1440
}
```

**Note**: `elevation` is optional but valuable for:
- Mountain destinations (Spruce Knob: 4,863 ft)
- Ski resorts (base vs summit elevation)
- Hiking trails (trailhead elevation)

### 2.3 GeoShape for Larger Areas

For WMAs, lakes, and forests, use `GeoShape` to define boundaries:

```json
{
  "@type": "Place",
  "name": "Elk River Wildlife Management Area",
  "geo": {
    "@type": "GeoShape",
    "polygon": "38.72,-80.52 38.72,-80.62 38.65,-80.62 38.65,-80.52 38.72,-80.52"
  }
}
```

**Use GeoShape when**:
- Area exceeds 1,000 acres
- Multiple access points exist
- Boundary accuracy matters for "near me" searches

**Use GeoCoordinates when**:
- Single point of interest
- Specific trailhead/boat ramp
- Business location

### 2.4 containedInPlace Hierarchy

Establish geographic hierarchy for context:

```json
{
  "@type": "TouristAttraction",
  "name": "Sutton Lake",
  "containedInPlace": {
    "@type": "City",
    "name": "Sutton",
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "Braxton County",
      "containedInPlace": {
        "@type": "State",
        "name": "West Virginia",
        "containedInPlace": {
          "@type": "Country",
          "name": "United States"
        }
      }
    }
  }
}
```

---

## 3. Adventure-Specific Schema Templates

### 3.1 Lake Template

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TouristAttraction", "LakeBodyOfWater"],
      "@id": "#lake",
      "name": "Sutton Lake",
      "alternateName": "Sutton Reservoir",
      "description": "1,440-acre Army Corps lake with excellent bass fishing, three campgrounds, and swimming beach. 25 minutes from WV Wild Outdoors.",
      "url": "https://wvwildoutdoors.pages.dev/near/sutton-lake/",

      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 38.6620,
        "longitude": -80.6932
      },

      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Route 4 North",
        "addressLocality": "Sutton",
        "addressRegion": "WV",
        "postalCode": "26601",
        "addressCountry": "US"
      },

      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Braxton County, West Virginia"
      },

      "publicAccess": true,
      "isAccessibleForFree": true,

      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Fishing", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Boat Ramps", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Camping", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Swimming Beach", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Marina", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Handicap Accessible Pier", "value": true }
      ],

      "touristType": ["FishingTrip", "Camping", "WaterSports"],

      "image": {
        "@type": "ImageObject",
        "url": "https://wvwildoutdoors.pages.dev/images/sutton-lake-hero.jpg",
        "caption": "Sutton Lake at sunrise - prime bass fishing waters",
        "width": 1200,
        "height": 630
      },

      "potentialAction": {
        "@type": "ReserveAction",
        "name": "Reserve Campsite",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.recreation.gov/camping/campgrounds/233678"
        }
      },

      "isRelatedTo": { "@id": "#wvwo-shop" }
    },

    {
      "@type": "Article",
      "@id": "#guide",
      "name": "Sutton Lake Fishing & Camping Guide",
      "headline": "Sutton Lake Fishing & Camping Guide",
      "description": "Complete guide to fishing and camping at Sutton Lake. Bass, crappie, catfish, and walleye. Three campgrounds with reservations.",
      "author": {
        "@type": "Organization",
        "name": "WV Wild Outdoors"
      },
      "publisher": {
        "@type": "Organization",
        "name": "WV Wild Outdoors",
        "logo": {
          "@type": "ImageObject",
          "url": "https://wvwildoutdoors.pages.dev/logo.png"
        }
      },
      "datePublished": "2024-01-15",
      "dateModified": "2024-12-15",
      "mainEntityOfPage": "https://wvwildoutdoors.pages.dev/near/sutton-lake/",
      "about": { "@id": "#lake" }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wvwildoutdoors.pages.dev/" },
        { "@type": "ListItem", "position": 2, "name": "Hunt Near Us", "item": "https://wvwildoutdoors.pages.dev/near/" },
        { "@type": "ListItem", "position": 3, "name": "Sutton Lake", "item": "https://wvwildoutdoors.pages.dev/near/sutton-lake/" }
      ]
    },

    {
      "@type": "SportingGoodsStore",
      "@id": "#wvwo-shop",
      "name": "WV Wild Outdoors",
      "url": "https://wvwildoutdoors.pages.dev/",
      "telephone": "(304) 649-5765",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "121 WV-82",
        "addressLocality": "Birch River",
        "addressRegion": "WV",
        "postalCode": "26610"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 38.49910,
        "longitude": -80.75460
      }
    }
  ]
}
```

### 3.2 WMA Template

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["NaturalFeature", "Park"],
      "@id": "#wma",
      "name": "Elk River Wildlife Management Area",
      "alternateName": "Elk River WMA",
      "description": "Nearly 20,000 acres of public hunting land in Braxton County, West Virginia. 15 minutes from WV Wild Outdoors.",
      "url": "https://wvwildoutdoors.pages.dev/near/elk-river/",

      "geo": {
        "@type": "GeoShape",
        "box": "38.65 -80.62 38.72 -80.52"
      },

      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Airport Rd & Bee Run Rd",
        "addressLocality": "Sutton",
        "addressRegion": "WV",
        "postalCode": "26601",
        "addressCountry": "US"
      },

      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 38.6833,
          "longitude": -80.5833
        },
        "geoRadius": "16000"
      },

      "publicAccess": true,
      "isAccessibleForFree": true,

      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Hunting - Deer", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Hunting - Turkey", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Hunting - Bear", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Fishing", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Camping", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Shooting Range - 100yd", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Shooting Range - 175yd", "value": true }
      ],

      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Acreage", "value": "19,646" },
        { "@type": "PropertyValue", "name": "Drive Time from WVWO", "value": "15 minutes" },
        { "@type": "PropertyValue", "name": "I-79 Access", "value": "Exit 67 (Flatwoods)" },
        { "@type": "PropertyValue", "name": "DNR Contact", "value": "(304) 924-6211" }
      ],

      "touristType": ["Hunting", "Fishing", "Wildlife Observation"],

      "image": {
        "@type": "ImageObject",
        "url": "https://wvwildoutdoors.pages.dev/images/elk-river-wma-hero.jpg",
        "caption": "Elk River WMA - 19,646 acres of prime hunting land",
        "width": 1200,
        "height": 630
      },

      "isRelatedTo": { "@id": "#wvwo-shop" },

      "event": [
        {
          "@type": "Event",
          "name": "Buck Firearms Season",
          "description": "White-tailed deer firearms season at Elk River WMA",
          "startDate": "2024-11-25",
          "endDate": "2024-12-07",
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "location": { "@id": "#wma" }
        },
        {
          "@type": "Event",
          "name": "Spring Gobbler Season",
          "description": "Wild turkey hunting season at Elk River WMA",
          "startDate": "2025-04-21",
          "endDate": "2025-05-24",
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "location": { "@id": "#wma" }
        }
      ]
    },

    {
      "@type": "Article",
      "@id": "#guide",
      "name": "Elk River WMA Hunting & Fishing Guide",
      "headline": "Elk River WMA Hunting & Fishing Guide",
      "description": "Complete hunting and fishing guide for Elk River Wildlife Management Area. Deer, turkey, bear, smallmouth bass.",
      "author": { "@type": "Organization", "name": "WV Wild Outdoors" },
      "publisher": { "@type": "Organization", "name": "WV Wild Outdoors" },
      "datePublished": "2024-01-10",
      "dateModified": "2024-12-20",
      "about": { "@id": "#wma" }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wvwildoutdoors.pages.dev/" },
        { "@type": "ListItem", "position": 2, "name": "Hunt Near Us", "item": "https://wvwildoutdoors.pages.dev/near/" },
        { "@type": "ListItem", "position": 3, "name": "Elk River WMA", "item": "https://wvwildoutdoors.pages.dev/near/elk-river/" }
      ]
    },

    {
      "@type": "SportingGoodsStore",
      "@id": "#wvwo-shop",
      "name": "WV Wild Outdoors",
      "telephone": "(304) 649-5765"
    }
  ]
}
```

### 3.3 River Template

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TouristAttraction", "RiverBodyOfWater"],
      "@id": "#river",
      "name": "Gauley River",
      "alternateName": "Beast of the East",
      "description": "World-class whitewater rafting with Class IV-V rapids. Gauley Season runs September-October during dam releases.",
      "url": "https://wvwildoutdoors.pages.dev/adventures/gauley-river/",

      "geo": {
        "@type": "GeoShape",
        "line": "38.22,-80.91 38.18,-81.05"
      },

      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Nicholas County, West Virginia"
      },

      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Whitewater Rafting", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Kayaking", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Fishing", "value": true }
      ],

      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Difficulty", "value": "Class IV-V (Advanced)" },
        { "@type": "PropertyValue", "name": "Best Season", "value": "September-October (Gauley Season)" },
        { "@type": "PropertyValue", "name": "Dam Release Schedule", "value": "22 weekends annually" },
        { "@type": "PropertyValue", "name": "River Miles", "value": "25 miles of rapids" }
      ],

      "touristType": ["Rafting", "Kayaking", "AdventureSports"],

      "isRelatedTo": { "@id": "#wvwo-shop" }
    }
  ]
}
```

### 3.4 Trail Template

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TouristAttraction",
      "@id": "#trail",
      "name": "Dolly Sods Wilderness",
      "description": "10,215 acres of high-altitude wilderness with alpine-like terrain, cranberry bogs, and rocky outcrops. Backcountry camping and challenging hiking.",
      "url": "https://wvwildoutdoors.pages.dev/adventures/dolly-sods/",

      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 39.0500,
        "longitude": -79.3500,
        "elevation": 4000
      },

      "containedInPlace": {
        "@type": "NationalForest",
        "name": "Monongahela National Forest"
      },

      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Hiking", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Backpacking", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Primitive Camping", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Wildlife Observation", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Photography", "value": true }
      ],

      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Difficulty", "value": "Challenging" },
        { "@type": "PropertyValue", "name": "Elevation Range", "value": "3,500 - 4,800 ft" },
        { "@type": "PropertyValue", "name": "Total Trail Miles", "value": "47 miles" },
        { "@type": "PropertyValue", "name": "Best Season", "value": "June-October" },
        { "@type": "PropertyValue", "name": "Permit Required", "value": "No (Leave No Trace)" }
      ],

      "touristType": ["Hiking", "Backpacking", "NatureWatching"]
    }
  ]
}
```

---

## 4. Local Business Integration

### 4.1 isRelatedTo Pattern

Every adventure schema should reference the WVWO shop to establish geographic authority:

```json
{
  "@type": "TouristAttraction",
  "name": "Sutton Lake",
  "isRelatedTo": {
    "@type": "SportingGoodsStore",
    "@id": "https://wvwildoutdoors.pages.dev/#wvwo-shop",
    "name": "WV Wild Outdoors",
    "telephone": "(304) 649-5765",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "121 WV-82",
      "addressLocality": "Birch River",
      "addressRegion": "WV"
    }
  }
}
```

### 4.2 travelTime Property

Use `travelTime` to capture drive time from shop:

```json
{
  "@type": "TouristAttraction",
  "name": "Sutton Lake",
  "additionalProperty": {
    "@type": "PropertyValue",
    "name": "travelTime",
    "value": "PT25M",
    "description": "25 minutes from WV Wild Outdoors"
  }
}
```

**ISO 8601 Duration Format**:
- PT15M = 15 minutes
- PT1H = 1 hour
- PT1H30M = 1 hour 30 minutes

### 4.3 potentialAction for Shop Visits

```json
{
  "@type": "TouristAttraction",
  "potentialAction": [
    {
      "@type": "VisitAction",
      "name": "Stop by the shop before you head out",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://wvwildoutdoors.pages.dev/",
        "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
      },
      "object": {
        "@type": "SportingGoodsStore",
        "name": "WV Wild Outdoors"
      }
    },
    {
      "@type": "ReserveAction",
      "name": "Get Your License",
      "description": "We're a WVDNR agent - we print licenses on-site",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "tel:+13046495765"
      }
    }
  ]
}
```

---

## 5. Content Freshness Signals

### 5.1 Date Properties

```json
{
  "@type": "Article",
  "datePublished": "2024-01-15",
  "dateModified": "2024-12-15",
  "dateCreated": "2024-01-10"
}
```

**Best Practices**:
- `datePublished`: When content first went live
- `dateModified`: Last significant update (NOT deployment date)
- Update `dateModified` when:
  - Season dates change
  - New facilities added
  - Regulations updated
  - Significant content rewrite

### 5.2 Seasonal Content Relevance

For hunting/fishing seasons, use `Event` schema:

```json
{
  "@type": "Event",
  "name": "WV Buck Firearms Season 2024",
  "description": "White-tailed deer firearms season in West Virginia",
  "startDate": "2024-11-25",
  "endDate": "2024-12-07",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": { "@id": "#wma" },
  "organizer": {
    "@type": "GovernmentOrganization",
    "name": "WV Division of Natural Resources"
  }
}
```

### 5.3 Review Status Property

Custom property for content currency:

```json
{
  "@type": "Article",
  "additionalProperty": {
    "@type": "PropertyValue",
    "name": "contentReviewedDate",
    "value": "2024-12-01",
    "description": "Content accuracy verified for 2024-25 season"
  }
}
```

---

## 6. Breadcrumb Schema

### 6.1 Pattern for Adventure Pages

```json
{
  "@type": "BreadcrumbList",
  "@id": "#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://wvwildoutdoors.pages.dev/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Adventures",
      "item": "https://wvwildoutdoors.pages.dev/adventures/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Sutton Lake",
      "item": "https://wvwildoutdoors.pages.dev/near/sutton-lake/"
    }
  ]
}
```

### 6.2 Integration with AdventureHero

The breadcrumb schema should be generated in the hero component since it:
- Has access to page context
- Can share the `@graph` with other schemas
- Keeps all structured data in one location

---

## 7. Image Schema

### 7.1 ImageObject Pattern

```json
{
  "@type": "ImageObject",
  "@id": "#hero-image",
  "url": "https://wvwildoutdoors.pages.dev/images/sutton-lake-hero.jpg",
  "contentUrl": "https://wvwildoutdoors.pages.dev/images/sutton-lake-hero.jpg",
  "caption": "Sutton Lake at sunrise - prime bass fishing waters in Braxton County, WV",
  "description": "Aerial view of Sutton Lake showing the Bee Run Recreation Area boat ramp and swimming beach",
  "width": 1200,
  "height": 630,
  "representativeOfPage": true,
  "thumbnail": {
    "@type": "ImageObject",
    "url": "https://wvwildoutdoors.pages.dev/images/sutton-lake-thumb.jpg",
    "width": 300,
    "height": 200
  },
  "license": "https://creativecommons.org/licenses/by-nc/4.0/",
  "acquireLicensePage": "https://wvwildoutdoors.pages.dev/photo-credits/",
  "creditText": "WV Wild Outdoors"
}
```

### 7.2 Gallery Pattern for Multiple Images

```json
{
  "@type": "ImageGallery",
  "name": "Sutton Lake Photo Gallery",
  "image": [
    {
      "@type": "ImageObject",
      "url": "https://wvwildoutdoors.pages.dev/images/sutton-lake-1.jpg",
      "caption": "Bee Run boat ramp at Sutton Lake"
    },
    {
      "@type": "ImageObject",
      "url": "https://wvwildoutdoors.pages.dev/images/sutton-lake-2.jpg",
      "caption": "Bass caught at Sutton Lake"
    },
    {
      "@type": "ImageObject",
      "url": "https://wvwildoutdoors.pages.dev/images/sutton-lake-3.jpg",
      "caption": "Gerald Freeman Campground"
    }
  ]
}
```

---

## 8. Validation & Testing

### 8.1 Build-Time Validation

Create a schema validation utility:

**File**: `src/utils/schema-validator.ts`

```typescript
import { z } from 'astro/zod';

// Schema validation for required properties
export const AdventureSchemaValidator = z.object({
  '@context': z.literal('https://schema.org'),
  '@graph': z.array(z.object({
    '@type': z.union([z.string(), z.array(z.string())]),
    '@id': z.string().optional(),
    name: z.string(),
    description: z.string(),
    geo: z.object({
      '@type': z.enum(['GeoCoordinates', 'GeoShape']),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    }),
    url: z.string().url(),
  })),
});

export function validateAdventureSchema(schema: unknown): boolean {
  try {
    AdventureSchemaValidator.parse(schema);
    return true;
  } catch (error) {
    console.error('[Schema Validation Error]', error);
    return false;
  }
}
```

### 8.2 Google Rich Results Test Integration

Add to `package.json`:

```json
{
  "scripts": {
    "schema:validate": "node scripts/validate-schemas.js",
    "schema:test": "npx structured-data-testing-tool --url https://wvwildoutdoors.pages.dev/near/sutton-lake/"
  }
}
```

### 8.3 CI Integration

Add to GitHub Actions workflow:

```yaml
- name: Validate Schema.org markup
  run: |
    npm run schema:validate

- name: Test with Google Rich Results
  run: |
    curl -X POST "https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run" \
      -H "Content-Type: application/json" \
      -d '{"url": "https://wvwildoutdoors.pages.dev/near/sutton-lake/"}'
```

---

## 9. Implementation in AdventureHero.astro

### 9.1 Schema Generation Component

**File**: `src/components/adventure/AdventureSchema.astro`

```astro
---
import { SITE_CONTACT } from '../../config/siteContact';

interface Props {
  type: 'lake' | 'wma' | 'river' | 'trail' | 'park' | 'cave' | 'ski' | 'historic';
  name: string;
  alternateName?: string;
  description: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  address?: {
    street?: string;
    city: string;
    state: string;
    zip?: string;
  };
  amenities: string[];
  difficulty?: 'easy' | 'moderate' | 'challenging' | 'rugged';
  season?: string;
  driveTime?: string;
  heroImage?: string;
  heroImageAlt?: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumbs: { name: string; url: string }[];
}

const {
  type,
  name,
  alternateName,
  description,
  latitude,
  longitude,
  elevation,
  address,
  amenities,
  difficulty,
  season,
  driveTime,
  heroImage,
  heroImageAlt,
  datePublished = new Date().toISOString().split('T')[0],
  dateModified = new Date().toISOString().split('T')[0],
  breadcrumbs,
} = Astro.props;

const BASE_URL = 'https://wvwildoutdoors.pages.dev';
const pageUrl = `${BASE_URL}${Astro.url.pathname}`;

// Type mapping
const typeMap: Record<string, string[]> = {
  lake: ['TouristAttraction', 'LakeBodyOfWater'],
  wma: ['NaturalFeature', 'Park'],
  river: ['TouristAttraction', 'RiverBodyOfWater'],
  trail: ['TouristAttraction'],
  park: ['Park', 'TouristAttraction'],
  cave: ['TouristAttraction', 'CivicStructure'],
  ski: ['SkiResort', 'TouristAttraction'],
  historic: ['TouristAttraction'],
};

// Build amenity features
const amenityFeatures = amenities.map(amenity => ({
  '@type': 'LocationFeatureSpecification',
  'name': amenity,
  'value': true,
}));

// Build additional properties
const additionalProperties = [];
if (difficulty) {
  additionalProperties.push({
    '@type': 'PropertyValue',
    'name': 'Difficulty',
    'value': difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
  });
}
if (season) {
  additionalProperties.push({
    '@type': 'PropertyValue',
    'name': 'Best Season',
    'value': season,
  });
}
if (driveTime) {
  additionalProperties.push({
    '@type': 'PropertyValue',
    'name': 'Drive Time from WV Wild Outdoors',
    'value': driveTime,
  });
}

// Build schema
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': typeMap[type],
      '@id': '#adventure',
      'name': name,
      ...(alternateName && { 'alternateName': alternateName }),
      'description': description,
      'url': pageUrl,
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': latitude,
        'longitude': longitude,
        ...(elevation && { 'elevation': elevation }),
      },
      ...(address && {
        'address': {
          '@type': 'PostalAddress',
          ...(address.street && { 'streetAddress': address.street }),
          'addressLocality': address.city,
          'addressRegion': address.state,
          ...(address.zip && { 'postalCode': address.zip }),
          'addressCountry': 'US',
        },
      }),
      'publicAccess': true,
      'amenityFeature': amenityFeatures,
      ...(additionalProperties.length > 0 && { 'additionalProperty': additionalProperties }),
      ...(heroImage && {
        'image': {
          '@type': 'ImageObject',
          'url': `${BASE_URL}${heroImage}`,
          'caption': heroImageAlt || `${name} - outdoor adventure in West Virginia`,
        },
      }),
      'isRelatedTo': { '@id': '#wvwo-shop' },
    },
    {
      '@type': 'Article',
      '@id': '#guide',
      'name': `${name} Guide`,
      'headline': `${name} Guide | WV Wild Outdoors`,
      'description': description,
      'author': { '@type': 'Organization', 'name': 'WV Wild Outdoors' },
      'publisher': {
        '@type': 'Organization',
        'name': 'WV Wild Outdoors',
        'logo': { '@type': 'ImageObject', 'url': `${BASE_URL}/logo.png` },
      },
      'datePublished': datePublished,
      'dateModified': dateModified,
      'mainEntityOfPage': pageUrl,
      'about': { '@id': '#adventure' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': '#breadcrumb',
      'itemListElement': breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': crumb.name,
        'item': crumb.url.startsWith('http') ? crumb.url : `${BASE_URL}${crumb.url}`,
      })),
    },
    {
      '@type': 'SportingGoodsStore',
      '@id': '#wvwo-shop',
      'name': 'WV Wild Outdoors',
      'telephone': SITE_CONTACT.phone,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '121 WV-82',
        'addressLocality': 'Birch River',
        'addressRegion': 'WV',
        'postalCode': '26610',
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 38.49910,
        'longitude': -80.75460,
      },
    },
  ],
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema, null, 0)} />
```

### 9.2 Usage in AdventureHero.astro

```astro
---
import AdventureSchema from './AdventureSchema.astro';

// ... existing props
---

<section class="adventure-hero ...">
  <!-- Existing hero content -->
</section>

<!-- Schema.org structured data -->
<AdventureSchema
  type={adventureType}
  name={title}
  description={description}
  latitude={coordinates.lat}
  longitude={coordinates.lng}
  amenities={amenities}
  difficulty={difficulty}
  season={season}
  driveTime={driveTime}
  heroImage={image}
  heroImageAlt={imageAlt}
  breadcrumbs={breadcrumbItems}
/>
```

---

## 10. SEO Impact Summary

### 10.1 Target Search Queries

| Query Pattern | Schema Strategy | Expected Rich Result |
|---------------|-----------------|----------------------|
| "fishing near Birch River WV" | TouristAttraction + LocalBusiness | Knowledge panel with shop |
| "hunting WMA near I-79" | NaturalFeature + Place + Event | Map pack, season dates |
| "Sutton Lake camping" | TouristAttraction + potentialAction | Reserve campsite CTA |
| "Elk River WMA deer hunting" | Event + LocalBusiness | Season dates, shop info |
| "WV Wild Outdoors" | LocalBusiness (main) | Full knowledge panel |
| "outdoor store near Summersville Lake" | LocalBusiness + isRelatedTo | "Near: Summersville Lake" |

### 10.2 Knowledge Panel Optimization

To maximize knowledge panel appearance:

1. **Consistent NAP**: Name, Address, Phone across all schemas
2. **sameAs Links**: Link to Google Business, Facebook, Yelp
3. **Image Quality**: 1200x630px minimum for OG images
4. **Review Aggregation**: If collecting reviews, add AggregateRating

### 10.3 Rich Results Coverage

| Schema Type | Rich Result | Impact |
|-------------|-------------|--------|
| BreadcrumbList | Breadcrumb trail in SERP | Higher CTR |
| Article | Date published badge | Freshness signal |
| Event | Season dates in SERP | Hunting/fishing queries |
| TouristAttraction | Map pin, photos | Local search dominance |
| LocalBusiness | Knowledge panel | Brand authority |
| ImageObject | Image carousel | Visual SERP presence |

---

## Appendix A: Quick Reference

### A.1 Coordinate Lookup Sources

- **WMAs**: WVDNR WMA Map PDFs
- **Lakes**: Army Corps of Engineers records
- **State Parks**: WV State Parks GPS coordinates
- **Trails**: USFS trail database
- **I-79 Exits**: WVDOT mile marker records

### A.2 Season Date Sources

- **Hunting**: WVDNR Hunting Regulations (updated annually)
- **Fishing**: WVDNR Fishing Regulations
- **Trout Stocking**: WVDNR Stocking Schedule
- **Dam Releases**: Army Corps (Gauley River)

### A.3 Schema.org Reference Links

- [TouristAttraction](https://schema.org/TouristAttraction)
- [GeoCoordinates](https://schema.org/GeoCoordinates)
- [LocalBusiness](https://schema.org/LocalBusiness)
- [Event](https://schema.org/Event)
- [Article](https://schema.org/Article)
- [BreadcrumbList](https://schema.org/BreadcrumbList)

---

**Document Status**: Ready for implementation
**Next Steps**: Implement AdventureSchema.astro component, integrate with AdventureHero.astro
