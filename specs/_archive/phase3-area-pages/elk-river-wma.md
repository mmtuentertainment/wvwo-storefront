# Spec: Elk River WMA Detail Page

## Overview

**File to create:** `wv-wild-web/src/pages/near/elk-river.astro`
**Priority:** High (15 min from shop, 18,396 acres)
**Status:** Not Started

## Why This Page

Elk River WMA is massive (18,396 acres) and only 15 minutes from the shop. It's bounded by Sutton Lake which creates diverse habitat. Excellent for "turkey hunting near I-79" and "deer hunting Braxton County" searches.

## Geographic Data

| Field | Value | Source |
|-------|-------|--------|
| Drive Time | 15 min | User (local knowledge) |
| I-79 Exit | Exit 67 area | East of Sutton |
| Acreage | 18,396 acres | WV DNR |
| Managing Agency | WV DNR | |
| Location | East of Sutton, bounded by Sutton Lake | |

## Content Sections

### Hero
- "15 min from shop" badge
- "18,396 Acres" badge
- WMA name and intro
- "Hardwood ridges and creek bottoms"

### Quick Info Bar
- Acres: 18,396
- Drive time: 15 min
- County: Braxton
- Access: Year-round (check seasons)

### What to Hunt

**White-tailed Deer**
- Excellent population
- Buck firearms season Nov/Dec
- Archery starts late September
- Best areas: Ridge tops, oak flats, creek bottoms during rut

**Wild Turkey**
- Outstanding spring gobbler hunting
- Birds roost in mature timber
- Best areas: Field edges, old logging roads

**Black Bear**
- Present in the area
- Check WV DNR for bear season dates and zones

**Small Game**
- Ruffed Grouse in younger timber
- Squirrel in hickory/oak stands
- Rabbit in brush edges

### What to Fish
- Trout (stocked streams - verify)
- Smallmouth Bass (Elk River sections)

### Getting There
Directions from shop (121 WV-82):
1. Head north on I-79
2. Take Exit 67 (Burnsville/Flatwoods area)
3. Access roads are marked
4. ~15 minutes total

### What to Bring
Split into hunting vs fishing checklists:

**Hunting Checklist:**
- Rifle/shotgun + appropriate ammo
- Blaze orange (500 sq in for deer)
- WV hunting license + appropriate stamps
- Knife, game bags
- Map of WMA (download from DNR)

**Fishing Checklist:**
- Rod/reel + tackle
- WV fishing license
- Trout stamp if targeting stocked streams
- Waders for creek fishing

### Local Tips
- User mentioned working at Bulltown - opportunity for authentic local knowledge
- Ridge-top hunting strategies
- Early season vs late season differences

### CTA Sections
- Shop CTA: "We've got licenses, ammo, and local knowledge"
- Directions CTA: Google Maps link
- Newsletter: EmailCapture component

## Schema.org Markup

```json
{
  "@type": "Place",
  "name": "Elk River Wildlife Management Area",
  "description": "Over 18,000 acres of public hunting land in Braxton County, WV. 15 minutes from WV Wild Outdoors.",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.7200,
    "longitude": -80.6500
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sutton",
    "addressRegion": "WV",
    "addressCountry": "US"
  }
}

```text

## Research Tasks Before Building

1. [ ] Verify acreage with WV DNR
2. [ ] Get accurate boundary/access point info
3. [ ] Confirm fish species in WMA waters
4. [ ] Check for any special regulations
5. [ ] Get accurate GPS coordinates
6. [ ] Find WMA map PDF link from DNR

## Voice Guidelines

Follow Kim's authentic voice:
- "Elk River WMA is about 15 minutes up the road - over 18,000 acres of public ground."
- "Turkey hunting here in the spring is something else. Those birds gobble on the ridges at dawn."
- NOT: "Discover world-class hunting opportunities at this premier wildlife destination."

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
