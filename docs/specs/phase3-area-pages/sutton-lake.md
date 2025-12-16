# Spec: Sutton Lake Recreation Area Detail Page

## Overview

**File to create:** `wv-wild-web/src/pages/near/sutton-lake.astro`
**Priority:** High (closest to shop - 10 min)
**Status:** Not Started

## Why This Page

Sutton Lake is the CLOSEST recreational area to the shop (10 min via I-79). Currently only listed in the index with no detail page. This is a missed opportunity for "fishing near Birch River" and "camping near I-79 Exit 57" searches.

## Geographic Data

| Field | Value | Source |
|-------|-------|--------|
| Drive Time | 10 min | User (local knowledge) |
| I-79 Exit | Exit 62 (Sutton) | 5 exits north of shop |
| Lake Size | 1,440 acres | Army Corps of Engineers |
| Managing Agency | US Army Corps of Engineers | |
| Location | 1 mi east of Sutton, WV | |

## Content Sections

### Hero
- "10 min from shop" badge
- "1,440 Acres" badge
- Lake name and tagline
- Brief intro about proximity

### Quick Info Bar
- Acres: 1,440
- Drive time: 10 min
- County: Braxton
- Access: Year-round

### What to Fish
Research needed for accurate species list. Current placeholder:
- Largemouth Bass
- Smallmouth Bass
- Catfish (Channel, Flathead)
- Crappie
- Walleye

### Facilities
- Boat ramps (locations TBD)
- Campgrounds (names TBD)
- Swimming areas
- Picnic areas
- Restrooms

### Getting There
Directions from shop (121 WV-82):
1. Head north on I-79
2. Take Exit 62 (Sutton)
3. Follow signs to Sutton Lake
4. ~10 minutes total

### What to Bring
- Fishing tackle (we stock it)
- WV fishing license (we sell it)
- Boat/kayak (launch access available)
- Cooler, sunscreen, etc.

### CTA Sections
- Shop CTA: "Need tackle? Stop by before you head out"
- Directions CTA: Google Maps link to shop
- Newsletter: EmailCapture component

## Schema.org Markup

```json
{
  "@type": "Place",
  "name": "Sutton Lake",
  "description": "1,440-acre Army Corps lake with fishing, camping, and swimming. 10 minutes from WV Wild Outdoors.",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.6589,
    "longitude": -80.7000
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sutton",
    "addressRegion": "WV",
    "addressCountry": "US"
  }
}
```

## Research Tasks Before Building

1. [ ] Verify fish species present (WV DNR stocking reports)
2. [ ] Get campground names and details
3. [ ] Identify boat ramp locations
4. [ ] Find any regulations specific to this lake
5. [ ] Get accurate GPS coordinates for schema

## Voice Guidelines

Follow Kim's authentic voice:
- "Sutton Lake's just up the road - about 10 minutes north on I-79."
- "Stop by the shop on your way and we'll get you set up with a license and some tackle recommendations."
- NOT: "Experience premier fishing at this convenient recreational destination."

## Dependencies

- Follows pattern from [burnsville-lake.astro](../../../wv-wild-web/src/pages/near/burnsville-lake.astro)
- Uses existing components: Layout, Header, Footer, EmailCapture
- Uses SITE_CONTACT from siteContact.ts
- Update near/index.astro to set `hasDetailPage: true`

## Acceptance Criteria

- [ ] Page builds without errors
- [ ] Place schema validates
- [ ] Mobile responsive
- [ ] Links to shop work
- [ ] Voice passes authenticity check
- [ ] near/index.astro updated with hasDetailPage: true
