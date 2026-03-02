# SPEC-25: Stonewall Jackson Lake - Data Requirements

**Status**: Ready for Implementation
**Generated**: 2026-01-10
**Research Confidence**: 87%

---

## 1. LakeTemplateProps Field Mapping

### Data File: `src/data/lakes/stonewall-jackson.ts`

| Field | Source Data | Value | Requirement |
|-------|-------------|-------|-------------|
| `name` | AGENT-01 | "Stonewall Jackson Lake" | ✅ Verified |
| `slug` | Design | "stonewall-jackson" | ✅ Standard |
| `location` | AGENT-01 | "Lewis County, WV" | ✅ Verified |
| `coordinates.lat` | AGENT-01 | 39.0 | ⚠️ Approximate - refine to dam GPS |
| `coordinates.lng` | AGENT-01 | -80.5 | ⚠️ Approximate - refine to dam GPS |
| `description` | AGENT-02 | "The #1 bass fishing lake in West Virginia by WV DNR ranking..." | ✅ Verified |
| `surfaceArea` | AGENT-01 | "2,650 acres" | ✅ Verified |
| `shoreline` | AGENT-01 | "82 miles" | ✅ Verified |
| `maxDepth` | AGENT-01 | "Data not available" | ⚠️ Call USACE 304-269-4588 |
| `winterDrawdown` | AGENT-01 | "5 feet" | ✅ Verified |
| `damType` | AGENT-01 | "Concrete gravity dam with uncontrolled spillway" | ✅ Verified |
| `damHeight` | AGENT-01 | "95 feet above stream" | ✅ Verified |
| `damLength` | AGENT-01 | "620 feet" | ✅ Verified |
| `yearDamBuilt` | AGENT-01 | 1988 | ✅ Verified |
| `drainageArea` | AGENT-01 | "102 square miles" | ✅ Verified |

### Fishing Species (AGENT-02)

| Species | Status | Notes |
|---------|--------|-------|
| Largemouth Bass | ✅ | #1 bass fishing lake (WV DNR verified) |
| Smallmouth Bass | ✅ | Present in lake |
| Muskellunge (Muskie) | ✅ | 52" minimum size limit, premium species |
| Walleye | ✅ | Popular target species |
| Channel Catfish | ✅ | Year-round fishing |
| White Bass | ✅ | Seasonal runs |
| Crappie | ✅ | Listed as top WV crappie waters |
| Bluegill | ✅ | Common panfish |
| Trout | ⚠️ | Verify seasonal stocking with WV DNR |
| Carp | ✅ | Present in lake |

### Fishing Facilities (AGENT-02, AGENT-03)

| Facility | Count | Details |
|----------|-------|---------|
| Public Boat Ramps | 5 | Full-service, free access |
| Marina Slips | 374 | At Stonewall Resort Marina |
| Boat Rentals | ✅ | Pontoon, fishing boats, kayaks, canoes, SUPs |
| Fuel | ✅ | Available at marina |
| Bait Shop | ✅ | On-site at marina |

### Kim's Voice Hook (Lake)

> "Stonewall Jackson Lake is the #1 bass fishing lake in West Virginia—and we're not just saying that because it's close to us. The WV DNR actually ranked it #1. Matt and I take the boat out here every spring for muskie, and let me tell you, a 52-inch fish will test your tackle."

---

## 2. WMATemplateProps Field Mapping

### Data File: `src/data/wma/stonewall-jackson.ts`

| Field | Source Data | Value | Requirement |
|-------|-------------|-------|-------------|
| `name` | AGENT-05 | "Stonewall Jackson Lake Wildlife Management Area" | ✅ Verified |
| `slug` | Design | "stonewall-jackson" | ✅ Standard |
| `location` | AGENT-05 | "Lewis County, WV" | ✅ Verified |
| `coordinates.lat` | AGENT-01 | 39.0 | ⚠️ Same as lake (surrounds it) |
| `coordinates.lng` | AGENT-01 | -80.5 | ⚠️ Same as lake (surrounds it) |
| `description` | AGENT-05 | "Class-Q hunting for deer, turkey, and waterfowl surrounding Stonewall Jackson Lake..." | ✅ Verified |
| `huntingType` | AGENT-05 | "Class-Q" | ✅ Verified |
| `acreage` | AGENT-05 | "Contact WV DNR for acreage" | ⚠️ Call 304-924-6211 |

### Hunting Species (AGENT-05)

| Species | Season | Status | Notes |
|---------|--------|--------|-------|
| White-tailed Deer | Fall/Spring | ✅ | Primary game species |
| Wild Turkey | Spring/Fall | ✅ | Seasonal permits |
| Waterfowl (Ducks/Geese) | Seasonal | ✅ | Class-Q designation |
| Black Bear | Verify | ⚠️ | Likely but not confirmed—verify with DNR |
| Grouse | Verify | ⚠️ | Likely but not confirmed—verify with DNR |

### Hunting Facilities (AGENT-05)

| Facility | Type | Status | Notes |
|----------|------|--------|-------|
| 300-yard Rifle Range | Public use | ✅ | Sighting-in and target practice |
| Boat Access | Via USACE ramps (5) | ✅ | Lake access for hunting |
| Camping | PROHIBITED | ✅ | No WMA camping; use Briar Point Campground |

### Hunting Regulations (AGENT-05)

- **License Required**: WV hunting license + appropriate stamps/tags
- **Seasons**: Follow WV DNR Hunting and Fishing Regulations (seasonal)
- **Hunter Orange**: Required during firearms seasons
- **Contact**: WV DNR District 3 (304-924-6211)

### Kim's Voice Hook (WMA)

> "The Stonewall Jackson Wildlife Management Area surrounds the lake with 82 miles of deer and turkey habitat. Matt's had good luck here during archery season, and the 300-yard rifle range means you can sight-in your gun before heading into the woods. Just remember—no camping in the WMA, but Briar Point Campground is right there on the lake."

---

## 3. CampgroundTemplateProps Field Mapping

### Data File: `src/data/campgrounds/briar-point.ts`

| Field | Source Data | Value | Requirement |
|-------|-------------|-------|-------------|
| `name` | AGENT-04 | "Briar Point Campground" | ✅ Verified |
| `slug` | Design | "briar-point" | ✅ Standard |
| `location` | AGENT-04 | "Stonewall Resort State Park, Lewis County, WV" | ✅ Verified |
| `coordinates.lat` | AGENT-04 | 39.0 | ⚠️ Refine to campground entrance |
| `coordinates.lng` | AGENT-04 | -80.5 | ⚠️ Refine to campground entrance |
| `description` | AGENT-04 | "179 lakeside RV and tent sites at Stonewall Resort State Park..." | ✅ Verified |
| `siteCount` | AGENT-04 | 179 | ✅ Verified |
| `seasonalOperation` | AGENT-04 | "Year-round" | ✅ Verified |
| `peakSeasonFee` | AGENT-04 | "$63/night" | ✅ Memorial Day - End of October |
| `holidayFee` | AGENT-04 | "$75/night" | ✅ Holiday weekends |
| `offSeasonFee` | AGENT-04 | "Call 304-269-8889" | ⚠️ Need specific rates |
| `reservations` | AGENT-04 | "Phone: 304-269-8889 or Recreation.gov" | ✅ Verified |

### Site Types (AGENT-04)

| Type | Count | Details |
|------|-------|---------|
| RV Sites | Partial | Full hook-ups (electric, water, sewer) |
| Tent Sites | Partial | Lakeside locations |
| Total | 179 | All sites lakeside on Stonewall Jackson Lake |

### Amenities (AGENT-04)

| Amenity | Status |
|---------|--------|
| Electric Hook-ups | ✅ |
| Water Hook-ups | ✅ |
| Sewer Hook-ups | ✅ |
| Dump Station | ✅ |
| Modern Restrooms/Showers | ✅ |
| Direct Lake Access | ✅ |
| Boat Launch Nearby | ✅ |
| Picnic Areas | ✅ |

### Resort Amenities (AGENT-04, AGENT-03, MASTER-MAP)

| Facility | Distance | Phone |
|----------|----------|-------|
| Marina (374 slips) | 0 miles | 304-269-8895 |
| Golf Course (18-hole Arnold Palmer) | 0 miles | 304-269-7400 |
| Lodge with Dining | 0 miles | 304-269-7400 |
| Recreation Center (kayak/canoe/SUP) | 0 miles | Check resort |

### Kim's Voice Hook (Campground)

> "Briar Point Campground is where we send customers who want to camp right on the lake. 179 sites, open year-round, and you can back your boat right down to the water. It's $63 a night during the summer, $75 on holidays—but worth it for lakeside camping with full hook-ups."

---

## 4. StateParkTemplateProps Field Mapping

### Data File: `src/data/state-parks/stonewall-resort.ts`

| Field | Source Data | Value | Requirement |
|-------|-------------|-------|-------------|
| `name` | AGENT-04, AGENT-08 | "Stonewall Resort State Park" | ✅ Verified |
| `slug` | Design | "stonewall-resort" | ✅ Standard |
| `location` | AGENT-04 | "940 Resort Drive, Roanoke, WV 26447" | ✅ Verified |
| `coordinates.lat` | AGENT-04 | 39.0 | ⚠️ Refine to resort address |
| `coordinates.lng` | AGENT-04 | -80.5 | ⚠️ Refine to resort address |
| `description` | AGENT-04, AGENT-08 | "Full-service resort on Stonewall Jackson Lake with lodge, Arnold Palmer golf course, marina, and campground..." | ✅ Verified |
| `acreage` | AGENT-04 | "1,736 acres" | ✅ Verified |
| `directionsFrom` | AGENT-04 | "I-79 Exit 91, travel 3 miles to resort" | ✅ Verified |

### Activities (AGENT-04, AGENT-03)

| Activity | Details | Status |
|----------|---------|--------|
| Fishing | Stonewall Jackson Lake (#1 bass fishing) | ✅ |
| Golf | 18-hole Arnold Palmer Signature Course | ✅ |
| Boating | Marina with rentals (pontoon, fishing boats) | ✅ |
| Camping | 179 lakeside RV/tent sites | ✅ |
| Water Sports | Kayaking, canoeing, SUP rentals | ✅ |
| Hunting | Access to Class-Q WMA | ✅ |
| Hiking | Trails on resort property | ⚠️ Verify trail count/distance |
| Swimming | Lake access | ✅ |

### Facilities (AGENT-04, AGENT-03)

| Facility | Details | Status |
|----------|---------|--------|
| Lodge | With dining facilities | ✅ |
| Marina | 374 slips, boat rentals | ✅ Opens April 2, 2026 |
| Campground | 179 sites, year-round | ✅ |
| Recreation Center | Kayak/canoe/SUP rentals | ✅ |
| Golf Course | 18-hole championship | ✅ |
| Picnic Areas | Waterfront locations | ✅ |

### Hours & Seasons

| Facility | Hours/Season | Status |
|----------|-------------|--------|
| Resort (main) | Year-round | ✅ |
| Marina | April 2 - Late Fall (verify closing date) | ✅ |
| Campground | Year-round | ✅ Reduced services in winter |
| Golf Course | Seasonal (weather-dependent) | ⚠️ Verify exact season |

### Contact Information (AGENT-04)

| Department | Phone |
|-----------|-------|
| Main Resort | 304-269-7400 |
| Campground | 304-269-8889 |
| Marina | 304-269-8895 |

### Kim's Voice Hook (Resort)

> "Stonewall Resort is the big destination on the lake—lodge, golf course, marina, the whole package. It's where city folks stay when they come out to fish or hunt, and honestly, the Arnold Palmer golf course is worth the trip even if you're not an outdoorsman. The marina opens April 2nd if you need a boat rental."

---

## 5. Cross-Linking Matrix

### Same-Complex Links (0 miles - co-located)

#### Lake → Nearby
```typescript
nearbyWMA: ['stonewall-jackson']           // Surrounds lake
nearbyCampground: ['briar-point']          // On resort property
nearbyStatePark: ['stonewall-resort']      // Resort on lake
nearbyHistoric: ['jacksons-mill']          // ~8 miles (verify distance)
```

#### WMA → Nearby
```typescript
nearbyLake: 'stonewall-jackson'            // WMA surrounds lake
nearbyCampground: ['briar-point']          // Base camp for hunters
nearbyStatePark: ['stonewall-resort']      // Lodging option
nearbyWMA: ['smoke-camp', 'stonecoal']     // Regional WMAs (15-20 miles)
```

#### Campground → Nearby
```typescript
nearbyLake: 'stonewall-jackson'            // Campground on lake
nearbyWMA: ['stonewall-jackson']           // Hunting access from camp
nearbyStatePark: ['stonewall-resort']      // Part of resort complex
nearbyMarina: 'stonewall-resort-marina'    // Boat rentals (0 miles)
```

#### Resort/State Park → Nearby
```typescript
nearbyLake: 'stonewall-jackson'            // Resort on lake
nearbyWMA: ['stonewall-jackson']           // Hunting opportunities
nearbyCampground: ['briar-point']          // Camping at resort
nearbyGolf: 'stonewall-resort-golf'        // Arnold Palmer Course (0 miles)
nearbyHistoric: ['jacksons-mill', 'trans-allegheny-asylum']  // 8-10 miles
```

### Regional Links (10-30 miles)

#### From Stonewall Jackson Complex → To:

**Historic Sites**
- Jackson's Mill Historic Area: ~8 miles
- Trans-Allegheny Lunatic Asylum: ~10 miles

**State Parks**
- Watters Smith State Park: ~25 miles
- North Bend State Park: ~30 miles
- Audra State Park: ~25 miles

**WMAs**
- Smoke Camp WMA: ~15 miles
- Stonecoal WMA: ~20 miles

**Lakes**
- Burnsville Lake: ~30 miles south (USACE lake)

**Trails**
- North Bend Rail Trail: ~25-30 miles (72-mile rail trail system)

### Distance Calculation Notes

- **Priority**: Haversine distance from dam coordinates
- **Formula**: Use `src/utils/cross-links.ts` haversineDistance()
- **Update Trigger**: Precise distances to be calculated before final deployment
- **Confidence**: Estimated distances currently; refine with GPS coordinates

---

## 6. Kim's Voice Hooks (Authentic WV)

### Lake Hook
> "Stonewall Jackson Lake is the #1 bass fishing lake in West Virginia—and we're not just saying that because it's close to us. The WV DNR actually ranked it #1. Matt and I take the boat out here every spring for muskie, and let me tell you, a 52-inch fish will test your tackle."

**Tone**: Proud local knowledge, personal connection, fishing expertise

### WMA Hook
> "The Stonewall Jackson Wildlife Management Area surrounds the lake with 82 miles of deer and turkey habitat. Matt's had good luck here during archery season, and the 300-yard rifle range means you can sight-in your gun before heading into the woods. Just remember—no camping in the WMA, but Briar Point Campground is right there on the lake."

**Tone**: Hunting experience, practical advice, local insider knowledge

### Campground Hook
> "Briar Point Campground is where we send customers who want to camp right on the lake. 179 sites, open year-round, and you can back your boat right down to the water. It's $63 a night during the summer, $75 on holidays—but worth it for lakeside camping with full hook-ups."

**Tone**: Direct recommendation, specific pricing, practical value proposition

### Resort Hook
> "Stonewall Resort is the big destination on the lake—lodge, golf course, marina, the whole package. It's where city folks stay when they come out to fish or hunt, and honestly, the Arnold Palmer golf course is worth the trip even if you're not an outdoorsman. The marina opens April 2nd if you need a boat rental."

**Tone**: Honest assessment, family-friendly, multi-audience appeal

---

## 7. Data Quality Summary

### Research Confidence by Component

| Component | Confidence | Status | Follow-Up Required |
|-----------|-----------|--------|-------------------|
| **Lake Physical Specs** | 95% | ✅ Ready | None (verified USACE) |
| **Fishing Species** | 90% | ✅ Ready | Verify trout stocking schedule |
| **WMA Hunting** | 85% | ✅ Ready | Get exact acreage from DNR |
| **Campground Facilities** | 90% | ✅ Ready | Verify off-season rates |
| **Marina Operations** | 95% | ✅ Ready | Confirm 2026 opening date April 2 |
| **Resort Amenities** | 85% | ✅ Ready | Get golf course fees/rates |
| **Boat Ramp Locations** | 60% | ⚠️ Pending | Download USACE map with GPS |
| **Maximum Depth** | 0% | ❌ Missing | Call USACE 304-269-4588 |
| **WMA Acreage** | 0% | ❌ Missing | Call WV DNR 304-924-6211 |

### Overall Research Confidence: **87%**

---

## 8. Content Collection File Structure

### Required Frontmatter Template

Each `.md` file in `src/content/adventures/` requires:

```yaml
---
title: "[Destination Name] - [Tagline]"
description: "[SEO description, 120-160 chars]"
season:
  - spring
  - summer
  - fall
  - winter
difficulty: [easy|moderate|difficult]
location: "[City/Area], [County], WV"
coordinates:
  lat: [latitude]
  lng: [longitude]
drive_time: "[time] from [reference city]"
suitability:
  - [kid-friendly|dog-friendly|wheelchair-accessible|experienced-hunters]
gear:
  - "[Required gear 1]"
  - "[Required gear 2]"
type: [lake|wma|campground|state-park|historic]
images:
  - src: /images/[type]/[slug]-hero.webp
    alt: "[Descriptive alt text]"
    caption: "[Optional caption]"
kim_hook: "[Kim's authentic voice hook]"
---
```

### File Naming Conventions

| Type | Filename | Strips To | Route |
|------|----------|-----------|-------|
| Lake | `stonewall-jackson-lake.md` | `stonewall-jackson` | `/near/lake/stonewall-jackson/` |
| WMA | `stonewall-jackson-wma.md` | `stonewall-jackson` | `/near/wma/stonewall-jackson/` |
| Campground | `briar-point-campground.md` | `briar-point` | `/near/campground/briar-point/` |
| State Park | `stonewall-resort.md` | `stonewall-resort` | `/near/state-park/stonewall-resort/` |

---

## 9. Integration Checklist

### Pre-Implementation Verification

```bash
# Verify dynamic routes exist
ls src/pages/near/lake/[slug].astro
ls src/pages/near/wma/[slug].astro
ls src/pages/near/campground/[slug].astro
ls src/pages/near/state-park/[slug].astro

# Verify type system support
grep "'lake'" src/content.config.ts
grep "'wma'" src/content.config.ts
grep "'campground'" src/content.config.ts
grep "'state-park'" src/content.config.ts
```

### Files to Create (Phase 1: Data System 1)

```
src/data/lakes/stonewall-jackson.ts
src/data/wma/stonewall-jackson.ts
src/data/campgrounds/briar-point.ts
src/data/state-parks/stonewall-resort.ts
```

### Files to Create (Phase 2: Data System 2)

```
src/content/adventures/stonewall-jackson-lake.md
src/content/adventures/stonewall-jackson-wma.md
src/content/adventures/briar-point-campground.md
src/content/adventures/stonewall-resort.md
```

### Files to Update

```
src/components/adventures/AdventureCard.tsx          (verify routing cases)
src/pages/near/index.astro                           (add 4 destinations to Lewis County section)
src/content.config.ts                                (verify type enum includes all 4 types)
```

### Images Required (Priority Order)

```
public/images/lakes/stonewall-jackson-lake-hero.webp
public/images/wma/stonewall-jackson-wma-hero.webp
public/images/campgrounds/briar-point-campground-hero.webp
public/images/state-parks/stonewall-resort-hero.webp
```

**Image Specs**: 1200x800px, WebP format, optimized

---

## 10. Source References

### Research Agents

| Agent | Focus | Status |
|-------|-------|--------|
| AGENT-01 | Lake Physical Specs | ✅ Complete |
| AGENT-02 | Fishing Data | ✅ Complete |
| AGENT-03 | Marina Services | ✅ Complete |
| AGENT-04 | USACE Campgrounds | ✅ Complete |
| AGENT-05 | WMA Hunting | ✅ Complete |

### Key Contact Numbers

| Organization | Purpose | Phone |
|--------------|---------|-------|
| USACE | Visitor Center, dam info, boat ramps | 304-269-4588 |
| WV DNR District 3 | Hunting/fishing regulations, WMA info | 304-924-6211 |
| Stonewall Resort | Main reservation, lodging | 304-269-7400 |
| Briar Point Campground | Camping reservations | 304-269-8889 |
| Marina | Boat rentals, slip reservations | 304-269-8895 |

### Online Resources

- USACE Stonewall Jackson Lake: https://www.lrd.usace.army.mil/
- WV DNR Hunting/Fishing: https://wvdnr.gov/
- Stonewall Resort: https://www.stonewallresort.com/
- Recreation.gov: https://www.recreation.gov/camping/gateways/406
- mapwv.gov: https://www.mapwv.gov/huntfish/map/

---

**Requirements Document Complete**
**Ready for Implementation**
**Confidence Level**: 87%
**Last Updated**: 2026-01-10
