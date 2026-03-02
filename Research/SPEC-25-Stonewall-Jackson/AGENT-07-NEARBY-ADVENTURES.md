# Agent 7: Nearby Adventures Discovery (Cross-Linking Candidates)
**Mission**: Discover all nearby adventure destinations within 30 miles for cross-linking
**Status**: COMPLETE
**Assigned by**: Queen Coordinator

---

## Immediate Area (0-10 Miles)

### Within Lake Complex
1. **Stonewall Jackson Lake** (Lake hub)
   - Type: Lake
   - Distance: 0 miles (primary hub)
   - Activities: Fishing, boating, swimming

2. **Stonewall Jackson Lake WMA** (WMA hub)
   - Type: Wildlife Management Area
   - Distance: 0 miles (surrounds lake)
   - Activities: Deer, turkey, waterfowl hunting

3. **Briar Point Campground** (Campground hub)
   - Type: Campground
   - Distance: 0 miles (at resort)
   - Sites: 179 RV/tent sites

4. **Stonewall Resort State Park** (State Park/Resort hub)
   - Type: State Park + Resort
   - Distance: 0 miles (primary facility)
   - Activities: Golf, marina, lodge, recreation

### Near Weston (5-10 Miles)
5. **Jackson's Mill Historic Area**
   - Type: Historic Site
   - Distance: ~8 miles from lake
   - Significance: Boyhood home of Stonewall Jackson
   - Activities: Living history, museum, events

6. **Trans-Allegheny Lunatic Asylum**
   - Type: Historic Site
   - Distance: ~10 miles (Weston)
   - Significance: Largest hand-cut stone masonry building in North America
   - Activities: Tours, paranormal events, museum

7. **Lewis County Park**
   - Type: County Park
   - Distance: ~10 miles (Weston)
   - Activities: Recreation, picnicking

---

## Regional Area (10-30 Miles)

### Other Lewis County WMAs
8. **Smoke Camp Wildlife Management Area**
   - Type: WMA
   - Distance: ~15 miles (estimate)
   - County: Lewis County
   - Activities: Hunting (species TBD)

9. **Stonecoal Lake Wildlife Management Area**
   - Type: WMA
   - Distance: ~20 miles (estimate)
   - County: Lewis County
   - Activities: Hunting, fishing (small lake)

### Nearby State Parks
10. **Watters Smith State Park**
    - Type: State Park
    - Distance: 25 miles northeast (West Milford)
    - Features: Museum, log cabins, hiking trails
    - Activities: History, hiking

### Wineries & Agritourism
11. **Lambert's Winery**
    - Type: Winery
    - Distance: ~15 miles (estimate)
    - Activities: Wine tasting, tours

### Military Heritage
12. **Mountaineer Military Museum**
    - Type: Museum/Historic
    - Distance: ~10 miles (estimate)
    - Activities: Military history exhibits

---

## Adjacent Counties (20-30 Miles)

### Harrison County
13. **North Bend State Park**
    - Type: State Park
    - Distance: ~30 miles west
    - Features: Rail trail, camping, lodge
    - Activities: Hiking, biking, camping

14. **North Bend Rail Trail**
    - Type: Rail Trail
    - Distance: ~25-30 miles
    - Length: 72 miles (spans multiple counties)
    - Activities: Hiking, biking

### Upshur County
15. **Audra State Park**
    - Type: State Park
    - Distance: ~25 miles east
    - Features: Middle Fork River, camping
    - Activities: Swimming, camping, hiking

### Braxton County
16. **Burnsville Lake**
    - Type: Lake (USACE)
    - Distance: ~30 miles south
    - Activities: Fishing, boating, camping
    - Cross-reference: SPEC-23 destination

17. **Burnsville WMA**
    - Type: WMA
    - Distance: ~30 miles south
    - Activities: Hunting

---

## Cross-Linking Priority Matrix

### Tier 1: Immediate Cross-Links (Same Complex)
- ✅ Stonewall Jackson Lake → Stonewall Jackson WMA
- ✅ Stonewall Jackson Lake → Briar Point Campground
- ✅ Stonewall Jackson Lake → Stonewall Resort State Park
- ✅ Briar Point Campground → Stonewall Jackson WMA
- ✅ Jackson's Mill Historic Area → Stonewall Jackson Lake (heritage connection)

### Tier 2: Regional Cross-Links (10-30 Miles)
- ⚠️ Trans-Allegheny Lunatic Asylum → Stonewall Jackson Lake
- ⚠️ Watters Smith State Park → Stonewall Jackson Lake
- ⚠️ Smoke Camp WMA → Stonewall Jackson WMA
- ⚠️ Stonecoal Lake WMA → Stonewall Jackson WMA

### Tier 3: Multi-County Cross-Links (25-30 Miles)
- ⚠️ North Bend State Park → Stonewall Resort
- ⚠️ Audra State Park → Stonewall Resort
- ⚠️ Burnsville Lake → Stonewall Jackson Lake (USACE lake connection)

---

## Geographic Distances (Need Haversine Calculation)

### Coordinates Needed For:
- Jackson's Mill Historic Area (lat/lng)
- Trans-Allegheny Lunatic Asylum (39.055, -80.465 approx)
- Watters Smith State Park (lat/lng)
- North Bend State Park (lat/lng)
- Audra State Park (lat/lng)
- Burnsville Lake (38.5476, -80.6590 approx)

### Base Coordinates:
- **Stonewall Jackson Lake**: 39.0°N, 80.5°W (approximate - need precise coords)

---

## Multi-Hub Strategy Implications

### Confirmed Hubs for SPEC-25:
1. **Lake Hub**: `/near/lake/stonewall-jackson/`
2. **WMA Hub**: `/near/wma/stonewall-jackson/`
3. **Campground Hub**: `/near/campground/briar-point/`
4. **State Park/Resort Hub**: `/near/state-park/stonewall-resort/` OR `/near/resort/stonewall-resort/`
5. **Historic Hub**: `/near/historic/jacksons-mill/` (already exists - verify)

### Cross-Linking Strategy:
- Each hub page links to all other hubs in Tier 1
- "Nearby Adventures" section on each page
- Distance calculations via Haversine formula
- Filter by activity type (fishing, hunting, camping, history)

---

## Data Quality Assessment
- ✅ **Immediate area destinations documented**
- ✅ **Regional state parks identified**
- ⚠️ **Precise distances need Haversine calculation**
- ⚠️ **Some WMA locations approximate**
- ⚠️ **Need to verify existing WVWO pages for cross-links**
- ✅ **Multi-hub strategy confirmed (4-5 hubs)**

## Recommended Follow-Up
1. Calculate precise Haversine distances for all destinations
2. Verify which destinations already have WVWO pages
3. Cross-reference with existing `src/data/` files
4. Map out cross-linking matrix in spreadsheet
5. Prioritize by distance and activity relevance

## Sources
- [Lewis County CVB - Outdoor Recreation](https://stonewallcountry.com/outdoor-recreation)
- [Lewis County, West Virginia - West Virginia Explorer](https://wvexplorer.com/communities/counties/lewis-county-west-virginia/)
- [Itinerary: Lewis County - Group Tour magazine](https://grouptourmagazine.com/tour-ideas/itineraries/itinerary-lewis-county-west-virginia/)
- [Stonewall Jackson Lake State Park - West Virginia Explorer](https://wvexplorer.com/attractions/state-parks/stonewall-jackson-lake-state-park/)

---

**Report Submitted**: 2026-01-10
**Agent**: nearby-adventures-scout
