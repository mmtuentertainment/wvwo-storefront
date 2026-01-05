# Spec: Stonewall Jackson Lake Detail Page

## Overview

**File to create:** `wv-wild-web/src/pages/near/stonewall-jackson.astro`
**Priority:** Medium (40 min from shop)
**Status:** Not Started

## Why This Page

Stonewall Jackson Lake has BOTH a large WMA (18,289 acres) AND a lake (2,650 acres). This creates unique opportunities - hunting on the WMA, fishing on the lake. Captures "hunting near Weston WV" and "fishing Stonewall Jackson Lake" searches.

## Geographic Data

| Field | Value | Source |
|-------|-------|--------|
| Drive Time | 40 min | User (local knowledge) |
| I-79 Exit | Exit 91 or 96 | Near Weston |
| WMA Acreage | 18,289 acres | WV DNR |
| Lake Size | 2,650 acres | Army Corps |
| Location | Lewis County, near Weston | |

## Content Sections

### Hero

- "40 min from shop" badge
- Dual badges: "18,289 Acre WMA" + "2,650 Acre Lake"
- "Hunt and Fish in One Trip"

### Quick Info Bar

- WMA: 18,289 acres
- Lake: 2,650 acres
- Drive time: 40 min
- County: Lewis

### What to Hunt (WMA)

**White-tailed Deer**

- Rolling hills terrain
- Good deer population
- Mix of hardwoods and fields

**Wild Turkey**

- Spring gobbler season
- Field edges productive

**Waterfowl**

- Lake proximity creates opportunity
- Check waterfowl zones/regulations

**Small Game**

- Squirrel
- Rabbit
- Grouse in appropriate habitat

### What to Fish (Lake)

**Primary Species**

- Largemouth Bass
- Musky (trophy potential)
- Catfish (Channel, Flathead)
- Crappie
- Bluegill

### Facilities

**Lake Side**

- Boat ramps
- Marina
- Campgrounds
- Swimming area
- Stonewall Jackson Lake State Park

**WMA Side**

- Multiple access points
- Parking areas
- Hiking trails

### Getting There

Directions from shop (121 WV-82):

1. Head north on I-79
2. Take Exit 91 or 96 (Weston area)
3. Follow signs to Stonewall Jackson Lake
4. ~40 minutes total

### What to Bring

**For Hunting:**

- Rifle/shotgun + ammo
- Blaze orange (deer season)
- WV license + stamps
- Camo for turkey/waterfowl

**For Fishing:**

- Rod/reel + tackle
- WV fishing license
- Boat or kayak
- Musky gear if targeting trophy fish

### CTA Sections

- Shop CTA: "Planning a hunt-and-fish trip? We'll help you gear up"
- Directions CTA: Google Maps link
- Newsletter: EmailCapture component

## Schema.org Markup

```json
{
  "@type": "Place",
  "name": "Stonewall Jackson Lake Wildlife Management Area",
  "description": "Over 18,000 acres of hunting land plus 2,650-acre lake for fishing. 40 minutes from WV Wild Outdoors.",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.0300,
    "longitude": -80.4500
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Weston",
    "addressRegion": "WV",
    "addressCountry": "US"
  }
}

```text

## Research Tasks Before Building

1. [ ] Verify WMA acreage with DNR
2. [ ] Get accurate lake size
3. [ ] Identify best access points
4. [ ] Research musky fishing reputation
5. [ ] Get State Park info (separate from WMA)
6. [ ] Confirm waterfowl hunting availability

## Voice Guidelines

Follow Kim's authentic voice:
- "Stonewall's about 40 minutes up I-79 - you can hunt the WMA and fish the lake in the same trip."
- "They've got musky in that lake if you're after a trophy."
- NOT: "Discover the ultimate outdoor experience combining world-class hunting and fishing."

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
