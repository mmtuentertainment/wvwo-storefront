# Spec: Monongahela National Forest Detail Page

## Overview

**File to create:** `wv-wild-web/src/pages/near/monongahela.astro`
**Priority:** Lower (1 hour from shop, but HUGE)
**Status:** Not Started

## Why This Page

Monongahela National Forest is nearly a MILLION acres - the largest public land area in WV. Even at 1 hour away, this captures searches from serious hunters planning multi-day trips. "Gun shop near Monongahela National Forest" is a real query.

## Geographic Data

| Field | Value | Source |
|-------|-------|--------|
| Drive Time | 1 hour | User (via Richwood estimate) |
| Access | Via Richwood, ~50-60 miles | |
| Acreage | ~921,000 acres | USFS |
| Managing Agency | US Forest Service | |
| Location | Eastern WV highlands | |

## Content Sections

### Hero
- "1 hour from shop" badge
- "921,000 Acres" badge (emphasize scale)
- "Nearly a Million Acres of Public Land"

### Quick Info Bar
- Acres: 921,000
- Drive time: ~1 hour
- Counties: Multiple (Tucker, Randolph, Pocahontas, etc.)
- Access: Year-round (weather dependent)

### What to Hunt

**White-tailed Deer**
- Excellent population in the highlands
- Mix of hardwoods and mountain terrain
- Higher elevation = different rut timing

**Wild Turkey**
- Spring and fall seasons
- Mountain gobblers

**Black Bear**
- Significant bear population
- Prime bear hunting territory
- Check DNR for bear zones/seasons

**Ruffed Grouse**
- Excellent grouse habitat
- Younger timber cuts and laurel thickets

**Squirrel**
- Abundant in hardwood stands

### What to Fish

**Trout**
- Native brook trout streams
- Stocked trout in designated waters
- Fly fishing destination

**Smallmouth Bass**
- Various streams

### Notable Areas Within MNF
- Cranberry Wilderness
- Dolly Sods Wilderness
- Spruce Knob (highest point in WV)
- Seneca Rocks
- Various wilderness study areas

### Getting There
Directions from shop (121 WV-82):
1. Head south/east via Richwood
2. Multiple access points depending on destination
3. ~1 hour to nearest access
4. Plan your specific destination before going

### Planning Your Trip
- This is BIG country - know where you're going
- Cell service is limited/nonexistent in many areas
- Weather changes fast at higher elevations
- Download maps, let someone know your plans

### What to Bring
- All standard hunting/fishing gear
- Extra layers (mountain weather)
- Paper maps (no cell service)
- Emergency supplies
- WV license + appropriate stamps
- National Forest regulations knowledge

### Why Stop at Our Shop

Even though we're an hour away:
- Last reliable stop before the backcountry
- Get your license and stamps
- Stock up on ammo and supplies
- Get local intel on what's hitting where

### CTA Sections
- Shop CTA: "Heading into the Mon? Stop by first - we're your last stop for supplies"
- Directions CTA: Google Maps link
- Newsletter: EmailCapture component

## Schema.org Markup

```json
{
  "@type": "Place",
  "name": "Monongahela National Forest",
  "description": "Nearly a million acres of public hunting and fishing land in eastern West Virginia. About 1 hour from WV Wild Outdoors.",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.7000,
    "longitude": -79.8000
  },
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "WV",
    "addressCountry": "US"
  }
}

```text

## Research Tasks Before Building

1. [ ] Verify current acreage
2. [ ] Identify closest access points from shop
3. [ ] Get accurate drive time to nearest access
4. [ ] Research trout stocking schedules
5. [ ] Find USFS regulations links
6. [ ] Identify key destinations (Dolly Sods, Cranberry, etc.)

## Voice Guidelines

Follow Kim's authentic voice:
- "The Monongahela's about an hour out - nearly a million acres of public ground once you get there."
- "If you're heading into the Mon, stop by first. We're your last chance for supplies before you hit the backcountry."
- NOT: "Embark on an epic wilderness adventure in this premier national forest destination."

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
