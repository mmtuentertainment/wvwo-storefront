# Spec: Summersville Lake Detail Page

## Overview

**File to create:** `wv-wild-web/src/pages/near/summersville-lake.astro`
**Priority:** Medium (45 min from shop, but MASSIVE and famous)
**Status:** Not Started

## Why This Page

Summersville Lake is known as the "Little Bahamas of the East" - 2,700 acres of crystal clear water. It's a major destination that draws visitors from across the region. Even at 45 min away, this captures searches like "fishing supplies near Summersville Lake" and "bait shop near Summersville WV".

## Geographic Data

| Field | Value | Source |
|-------|-------|--------|
| Drive Time | 45 min | User (from Sutton estimate) |
| I-79 Access | N/A - via US-19 South | |
| Lake Size | 2,700 acres | Army Corps of Engineers |
| Managing Agency | US Army Corps of Engineers | |
| Location | Nicholas County, WV | |
| Nickname | "Little Bahamas of the East" | Water clarity |

## Content Sections

### Hero
- "45 min from shop" badge
- "2,700 Acres" badge
- "Little Bahamas of the East" tagline
- Crystal clear water emphasis

### Quick Info Bar
- Acres: 2,700
- Drive time: 45 min
- County: Nicholas
- Max Depth: 320+ feet

### What to Fish

**Bass Fishing** (premier destination)
- Smallmouth Bass (excellent)
- Largemouth Bass
- Spotted Bass

**Other Species**
- Walleye
- Catfish (Channel)
- Crappie
- Bluegill

### Activities Beyond Fishing
- Scuba diving (visibility up to 40+ feet)
- Swimming beaches
- Cliff jumping (Long Point)
- Kayaking/paddleboarding
- Camping

### Facilities
- Multiple boat ramps
- Marina services
- Campgrounds (Battle Run, Salmon Run, etc.)
- Swimming beach
- Picnic areas

### Getting There
Directions from shop (121 WV-82):
1. Head south on US-19
2. Continue through Summersville
3. Follow signs to Summersville Lake
4. ~45 minutes total

### What to Bring
- Fishing tackle (we stock bass gear)
- WV fishing license (we sell it)
- Boat/kayak
- Diving gear (if certified)
- Camping supplies

### Why Stop at Our Shop

Even though we're 45 min north:
- Get your license before you leave the I-79 corridor
- Stock up on tackle
- We know what's hitting at Summersville
- Avoid crowded shops near the lake

### CTA Sections
- Shop CTA: "Heading to Summersville? Stop by on your way down"
- Directions CTA: Google Maps link
- Newsletter: EmailCapture component

## Schema.org Markup

```json
{
  "@type": "Place",
  "name": "Summersville Lake",
  "description": "2,700-acre crystal clear lake known as the 'Little Bahamas of the East'. Premier bass fishing and scuba diving. 45 minutes from WV Wild Outdoors.",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.2200,
    "longitude": -80.8700
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Summersville",
    "addressRegion": "WV",
    "addressCountry": "US"
  }
}

```text

## Research Tasks Before Building

1. [ ] Verify fish species and best techniques
2. [ ] Get campground details
3. [ ] Identify boat ramp locations
4. [ ] Research diving sites/conditions
5. [ ] Get accurate GPS coordinates
6. [ ] Find official Army Corps links

## Voice Guidelines

Follow Kim's authentic voice:
- "Summersville Lake's about 45 minutes south - worth the drive for that clear water and the smallmouth."
- "If you're heading down, stop by on your way. We'll get you set up with a license and the right tackle."
- NOT: "Experience the ultimate aquatic adventure at this world-renowned destination."

## Dependencies

- Follows pattern from burnsville-lake.astro
- Uses existing components
- Update near/index.astro to set `hasDetailPage: true`

## Acceptance Criteria

- [ ] Page builds without errors
- [ ] Place schema validates
- [ ] Mobile responsive
- [ ] Voice passes authenticity check
- [ ] near/index.astro updated
