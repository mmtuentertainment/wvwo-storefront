# SPEC-23: Summersville Lake Research Prompts

**Purpose**: Deep research prompts optimized for Perplexity AI to gather verified data for Summersville Lake destination hub.

**UTM Template**: `?utm_source=perplexity&utm_medium=research&utm_campaign=spec-23-summersville`

---

## Overview: Summersville Lake Destination Hub

Summersville Lake ("Little Bahamas of the East") is a **multi-page destination** requiring cross-linked content:

| Page Type | Template | Route | Status |
|-----------|----------|-------|--------|
| Lake | LakeTemplate | `/near/lake/summersville/` | Data exists, needs enrichment |
| WMA | WMATemplate | `/near/wma/summersville/` | Needs research |
| Campground (Battle Run) | CampgroundTemplate | `/near/campground/battle-run/` | Needs research |
| Campground (Salmon Run) | CampgroundTemplate | `/near/campground/salmon-run/` | Needs research |
| Marina (various) | Cross-link data | N/A - embedded in Lake page | Needs research |

---

## PROMPT 1: Lake Overview & Water Recreation

**Goal**: Core lake data for LakeTemplate - crystal-clear water, swimming, scuba diving

```
Summersville Lake West Virginia official statistics and water recreation 2024-2025:

1. LAKE SPECIFICATIONS (USACE official data):
   - Surface acres at summer pool vs winter pool
   - Maximum depth and average depth in feet
   - Shoreline miles
   - Water clarity (Secchi disk readings if available)
   - Why is it called "Little Bahamas of the East"? What makes the water so clear?

2. SWIMMING AREAS:
   - Official designated swimming beaches (names, locations)
   - Beach amenities (restrooms, changing areas, lifeguards)
   - Swimming season dates
   - Any fees for beach access?

3. SCUBA DIVING:
   - Why is Summersville Lake famous for scuba diving?
   - Visibility depths typically achieved
   - Underwater features (submerged towns, structures, rock formations)
   - Dive shop requirements or certifications needed
   - Best diving months/conditions

4. CLIFF JUMPING (Long Point):
   - Legal status of cliff jumping at Long Point
   - Height of cliffs
   - Safety considerations
   - Access trail information

5. MANAGING AGENCY:
   - Who manages the lake? (USACE Huntington District?)
   - Official website and contact information
   - Lake level/conditions hotline if exists

Cite official USACE, WV DNR, or Nicholas County CVB sources only. No travel blogs.
```

---

## PROMPT 2: Fishing - Species, Regulations, Access

**Goal**: Fishing data for LakeTemplate fish sections

```
Summersville Lake West Virginia fishing comprehensive guide 2024-2025:

1. FISH SPECIES (WV DNR verified):
   - Primary game fish species present
   - State record fish caught at Summersville Lake (species, weight, year)
   - Seasonal patterns for each major species:
     * Smallmouth bass - when and where
     * Largemouth bass - when and where
     * Walleye - when and where
     * Muskie - when and where (if present)
     * Trout - stocking schedule if applicable
     * Catfish species present
     * Panfish species (crappie, bluegill)

2. FISHING REGULATIONS:
   - Current size limits by species
   - Creel limits (daily bag limits) by species
   - Any special regulations unique to Summersville Lake
   - Fishing license requirements (resident vs non-resident costs 2025)

3. BOAT RAMPS & FISHING ACCESS:
   - Names and locations of all public boat ramps
   - Ramp fees if any
   - Parking capacity at each ramp
   - Bank fishing access points
   - ADA accessible fishing locations

4. FISHING TOURNAMENTS:
   - Major bass tournaments held annually
   - Tournament organizers and typical dates
   - Economic impact if documented

5. BAIT & TACKLE:
   - What artificial lures work best (tube jigs, etc.)
   - Live bait availability and regulations
   - Nearest bait shops with addresses

Cite WV DNR fishing regulations, USACE, or documented tournament records only.
```

---

## PROMPT 3: Marinas & Boat Rentals

**Goal**: Marina data for LakeTemplate and practical visitor info

```
Summersville Lake West Virginia marinas and boat services 2024-2025:

1. SUMMERSVILLE LAKE MARINA (primary marina):
   - Physical address and GPS coordinates
   - Phone number and website
   - Hours of operation (seasonal)
   - Services offered:
     * Boat slip rentals (sizes, rates)
     * Fuel dock (gas types available)
     * Boat rentals available (types: pontoon, fishing, ski)
     * Rental rates and reservation requirements
   - Store/supplies available
   - Restaurant on-site?

2. OTHER MARINAS/BOAT ACCESS:
   - Are there other commercial marinas on the lake?
   - Private dock permits - who issues them?

3. BOAT REGULATIONS:
   - Horsepower restrictions if any
   - No-wake zones locations
   - Required safety equipment
   - Boat inspection requirements (invasive species)

4. KAYAK/CANOE/PADDLEBOARD:
   - Rental availability and locations
   - Best launch points for non-motorized craft
   - Guided paddle tours if offered

5. HOUSEBOAT RENTALS:
   - Are houseboats available for rent?
   - Companies offering houseboat rentals
   - Typical rates and booking requirements

Cite marina official websites, USACE regulations, or WV DNR boating laws only.
```

---

## PROMPT 4: USACE Campgrounds - Battle Run & Salmon Run

**Goal**: Campground data for CampgroundTemplate pages

```
Summersville Lake USACE campgrounds West Virginia 2024-2025 official information:

1. BATTLE RUN CAMPGROUND:
   - Physical address and GPS coordinates
   - Total number of campsites
   - Site types breakdown:
     * Electric hookup sites (30 amp? 50 amp?)
     * Water hookup sites
     * Full hookup sites
     * Tent-only sites
     * Pull-through vs back-in sites
   - Maximum RV length accommodated
   - Campsite fees (peak season, off-season)
   - Amenities:
     * Restrooms/showers (flush toilets?)
     * Dump station location
     * Playground
     * Beach access
     * Boat ramp proximity
   - Reservation system (Recreation.gov?)
   - Season dates (opening/closing)
   - Pet policy
   - Quiet hours

2. SALMON RUN CAMPGROUND:
   - Same data points as Battle Run above
   - What distinguishes it from Battle Run?
   - Distance between the two campgrounds

3. OTHER CAMPING OPTIONS:
   - Are there other USACE campgrounds on Summersville Lake?
   - Primitive/dispersed camping areas?
   - Group camping facilities?

4. CAMPGROUND CONTACT:
   - Campground office phone numbers
   - USACE Summersville Lake project office contact
   - Emergency contacts

Cite USACE Huntington District, Recreation.gov, or official campground documentation only.
```

---

## PROMPT 5: Summersville Lake WMA - Hunting

**Goal**: WMA data for WMATemplate page

```
Summersville Lake Wildlife Management Area West Virginia hunting 2024-2025:

1. WMA SPECIFICATIONS (WV DNR):
   - Total acreage of Summersville Lake WMA
   - Counties covered
   - Terrain description (ridges, hollows, forest types)
   - Elevation range

2. GAME SPECIES & SEASONS:
   - White-tailed deer:
     * Buck harvest data (antlered deer per square mile if available)
     * Archery season dates
     * Rifle season dates
     * Muzzleloader season dates
     * Antler restrictions if any
   - Wild turkey:
     * Spring gobbler season dates and regulations
     * Fall turkey season dates
     * Beard length requirements
   - Black bear:
     * Is bear hunting allowed in this WMA?
     * Bear harvest data if available
   - Small game:
     * Squirrel (species present, season dates)
     * Grouse (present? season?)
     * Rabbit species and seasons
   - Furbearer trapping if allowed

3. ACCESS & PARKING:
   - Main access points with GPS coordinates
   - Parking area locations
   - Road conditions (passenger car accessible?)
   - ATV/UTV regulations on WMA

4. REGULATIONS SPECIFIC TO THIS WMA:
   - Any weapon restrictions?
   - Special permit requirements?
   - Disabled hunter access areas?

5. CONTACT INFORMATION:
   - WV DNR district office responsible
   - Phone number and address
   - WMA map availability

Cite WV DNR hunting regulations, WMA guides, or official harvest reports only.
```

---

## PROMPT 6: History & Culture - Dam Construction, Submerged Town

**Goal**: Historical context for cultural depth in content

```
Summersville Lake West Virginia history and cultural heritage:

1. DAM CONSTRUCTION:
   - When was Summersville Dam built? (construction years)
   - Why was it built? (flood control, recreation?)
   - Dam specifications (height, length, type)
   - USACE project authorization history
   - Cost of construction (original and adjusted)

2. SUBMERGED HISTORY:
   - What communities or structures were flooded when the lake filled?
   - Is there a "submerged town" that divers explore?
   - Names of communities displaced
   - Cemetery relocations that occurred
   - Any historical artifacts recovered?

3. GAULEY RIVER CONNECTION:
   - How does Summersville Lake connect to Gauley River?
   - Fall dam releases for whitewater rafting - when and how much?
   - "Gauley Season" explanation and significance
   - Economic impact of Gauley Season on Nicholas County

4. NATIVE AMERICAN HISTORY:
   - Indigenous peoples who inhabited this area
   - Archaeological sites discovered (if public information)
   - Place name origins

5. CIVIL WAR HISTORY:
   - Battle of Carnifex Ferry connection (nearby)
   - Any Civil War sites around the lake
   - Historical significance of Nicholas County in Civil War

6. LOCAL CULTURE:
   - Annual events and festivals at Summersville Lake
   - Bridge Day connection (New River Gorge nearby)
   - Local communities: Summersville, Mount Lookout

Cite USACE history, WV Division of Culture and History, Nicholas County historical society, or academic sources only.
```

---

## PROMPT 7: Nearby Adventures - Cross-Linking Destinations

**Goal**: Identify all cross-link opportunities for Adventure Hub architecture

```
Outdoor recreation destinations within 30 minutes of Summersville Lake West Virginia:

1. WHITEWATER RAFTING:
   - Gauley River access points from Summersville Lake
   - Distance to Gauley River outfitters
   - New River Gorge proximity and access

2. STATE PARKS NEARBY:
   - Carnifex Ferry Battlefield State Park - distance and connection
   - Babcock State Park - distance
   - Hawks Nest State Park - distance
   - Any other state parks within 45 minutes

3. OTHER WMAS NEARBY:
   - Adjoining or nearby Wildlife Management Areas
   - Distances and primary game species differences

4. HIKING/TRAILS:
   - Long Point Trail at Summersville Lake
   - Other hiking trails within the WMA or USACE land
   - Nearby backcountry areas

5. ROCK CLIMBING:
   - New River Gorge climbing proximity
   - Summersville Lake area climbing spots if any

6. CAVES:
   - Any caves in Nicholas County open to public?
   - Distance to Organ Cave or other show caves

7. SCENIC DRIVES:
   - Gauley Mountain scenic routes
   - Highland Scenic Highway proximity

8. TOWNS/SERVICES:
   - Summersville (county seat) - distance, services
   - Nearest hospitals
   - Grocery stores and gas stations

Cite official sources, Google Maps verified distances, or tourism board information only.
```

---

## PROMPT 8: Practical Visitor Information

**Goal**: Fees, hours, contact info, seasonal considerations

```
Summersville Lake West Virginia visitor practical information 2024-2025:

1. FEES & PASSES:
   - Day use fees for beach/recreation areas
   - Annual pass options and costs
   - Senior/military discounts (federal lands)
   - Boat launch fees

2. SEASONAL OPERATIONS:
   - When does summer pool begin and end?
   - Winter drawdown schedule and depth
   - Which facilities close for winter?
   - Best months to visit for each activity:
     * Swimming
     * Fishing
     * Scuba diving
     * Camping
     * Hunting

3. CONTACT INFORMATION:
   - USACE Summersville Lake office address and phone
   - After-hours emergency contacts
   - Lake level information line
   - Website URLs

4. DIRECTIONS:
   - From I-79 (closest interstate exits)
   - From I-64/I-77 (Charleston area)
   - From US-19 approaches
   - GPS coordinates for main entrance

5. CELL SERVICE & CONNECTIVITY:
   - Cell coverage quality at the lake
   - Which carriers work best?
   - WiFi availability at campgrounds?

6. ACCESSIBILITY:
   - ADA accessible facilities
   - Accessible fishing piers
   - Accessible campsites
   - Beach wheelchair availability

7. PET POLICIES:
   - Dogs allowed at beaches?
   - Pet rules at campgrounds
   - Leash requirements

Cite USACE, Recreation.gov, or official accessibility documentation only.
```

---

## Research Execution Checklist

| Prompt | Topic | Pages Supported | Priority |
|--------|-------|-----------------|----------|
| 1 | Lake Overview & Water Recreation | Lake | HIGH |
| 2 | Fishing | Lake | HIGH |
| 3 | Marinas & Boats | Lake | HIGH |
| 4 | Campgrounds | Battle Run, Salmon Run | HIGH |
| 5 | WMA Hunting | WMA | HIGH |
| 6 | History & Culture | All (context) | MEDIUM |
| 7 | Nearby Adventures | Cross-links | MEDIUM |
| 8 | Practical Info | All | HIGH |

---

## Source Verification Requirements

**Accepted Sources**:
- USACE Huntington District (usace.army.mil)
- WV DNR (wvdnr.gov)
- Recreation.gov (campground reservations)
- Nicholas County CVB (official tourism)
- WV Division of Culture and History

**Rejected Sources**:
- Travel blogs (TripAdvisor, random .com sites)
- User-generated wiki content without citations
- Outdated information (pre-2023 unless historical)
- Social media posts

---

## After Research: Data File Locations

| Research | Data File Path |
|----------|----------------|
| Prompts 1-3, 8 | `src/data/lakes/summersville.ts` (enrich existing) |
| Prompt 4 - Battle Run | `src/data/campgrounds/battle-run.ts` (create new) |
| Prompt 4 - Salmon Run | `src/data/campgrounds/salmon-run.ts` (create new) |
| Prompt 5 | `src/data/wma/summersville.ts` (create new) |
| Prompt 7 | Cross-link arrays in each data file |
