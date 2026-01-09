# Destination Type Research Matrix

## Research Overview

**Research Date:** January 2025
**Methodology:** Analysis of existing WVWO templates, industry best practices, and competitive destination websites
**Purpose:** Define essential data fields, cross-linking patterns, and content benchmarks for WVWO's 14 destination types

---

## Destination Type Matrix

### 1. LAKES

**Best-in-Class Examples:**
- Lake Tahoe Tourism (tahoesouth.com) - Comprehensive seasonal activities
- Finger Lakes Tourism (fingerlakes.org) - Regional wine + outdoor integration
- Lake of the Ozarks (funlake.com) - Marina-centric organization

**WVWO Template:** `LakeTemplate.astro` (SPEC-13)

| Category | Essential Fields | Nice-to-Have Fields |
|----------|-----------------|---------------------|
| **Identity** | name, county, acreage, description | tagline, coordinates |
| **Fishing** | fishingSpots[]: species[], depth, structure, access | seasonal techniques, bag limits |
| **Marinas** | marinas[]: name, type, services[], fees | hours, contact, boat launches |
| **Activities** | activities[]: name, description, difficulty | season, equipment needed |
| **Seasonal** | seasonalGuide[]: period, targetSpecies, techniques | conditions, kimNote |
| **Safety** | regulations[]: category, details, important | external regulation links |
| **Stats** | stats[]: label, value (surface area, max depth, etc.) | elevation, water clarity |
| **Gear** | gearList[]: name, optional | quantity suggestions |

**Cross-Linking Pattern:**
- Nearby campgrounds (USACE, marinas)
- WMA if adjacent (hunting on surrounding public land)
- State parks on the lake
- River inflows/outflows

**Content Length Benchmark:** 2,500-4,000 words

**Schema.org Markup:**
```json
{
  "@type": "LakeBodyOfWater",
  "name": "Lake Name",
  "geo": { "@type": "GeoCoordinates", "latitude": "", "longitude": "" },
  "containedIn": { "@type": "AdministrativeArea", "name": "County" }
}
```

---

### 2. STATE PARKS

**Best-in-Class Examples:**
- Tennessee State Parks (tnstateparks.com) - Lodge booking integration
- California State Parks (parks.ca.gov) - Trail system detail
- New York State Parks - Facility inventory system

**WVWO Template:** `StateParkTemplate.astro` (SPEC-18)

| Category | Essential Fields | Nice-to-Have Fields |
|----------|-----------------|---------------------|
| **Hero** | name, tagline, acreage, signatureFeature | established year, imagePosition |
| **Overview** | operatingHours, fees, contact, managingAgency | distanceFromCity, coordinates |
| **Facilities** | lodging, camping, picnicAreas[], pools[] | visitorCenters, natureCenters, amphitheaters |
| **Activities** | rangerPrograms[], educationalPrograms[], juniorRanger | specialEvents[], recreationalActivities[] |
| **Trails** | trails[]: name, distance, difficulty, surface | accessible flag, dogsAllowed, trailMapUrl |
| **Overlooks** | overlooks[]: name, description, accessible | bestTimes[], elevation |
| **Accessibility** | accessibleFacilities[], assistiveEquipment[] | serviceAnimalPolicy, accommodationsContact |
| **Reservations** | cabins, camping, groupFacilities | reservationUrl, policies |
| **Regulations** | petPolicy, alcoholPolicy, quietHours | smokingPolicy, fireworksPolicy |
| **Emergency** | emergencyContacts[]: name, type, phone | description |
| **SEO** | faqItems[], events[] | breadcrumb data |

**Cross-Linking Pattern:**
- Related nearby parks (geographic proximity via Haversine)
- Lakes/rivers within park boundaries
- Trails connecting to backcountry
- Historic sites within park

**Content Length Benchmark:** 3,000-5,000 words

**Schema.org Markup:**
```json
{
  "@type": ["Park", "TouristAttraction"],
  "name": "Park Name",
  "openingHoursSpecification": [...],
  "amenityFeature": [...],
  "containedIn": { "@type": "AdministrativeArea" }
}
```

---

### 3. WMAs/HUNTING AREAS

**Best-in-Class Examples:**
- Texas Parks & Wildlife WMA System - Species-centric organization
- Georgia DNR WMAs - Quota hunt management
- Kansas Hunting Atlas - Interactive species maps

**WVWO Template:** `WMATemplate.astro`

| Category | Essential Fields | Nice-to-Have Fields |
|----------|-----------------|---------------------|
| **Identity** | name, acreage, county, driveTime | accessType, coordinates |
| **Species** | species[]: name, season, bagLimit, notes | kimNote, hunting methods |
| **Areas** | huntingAreas[]: name, access, terrain, targetSpecies | coordinates, parking info |
| **Facilities** | facilities[]: type, count, description | accessibility, contact, reservationLink |
| **Seasonal** | seasonalGuide[]: season, target, tips | kimNote |
| **Regulations** | regulations[]: category, details, important | external links |
| **Access** | accessPoints[]: name, type, facilities | vehicle requirements |
| **Maps** | mapUrl, regulationsUrl | topographic data |

**Cross-Linking Pattern:**
- Adjacent lakes (fishing opportunities)
- Nearby campgrounds for overnight hunts
- Historic sites (cultural interest during off-season)
- Related shop categories (ammo, licenses, gear)

**Content Length Benchmark:** 2,000-3,500 words

**Schema.org Markup:**
```json
{
  "@type": "PublicArea",
  "name": "WMA Name",
  "geo": { "@type": "GeoCoordinates" },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Hunting Permitted", "value": true }
  ]
}
```

---

### 4. RIVERS/PADDLING

**Best-in-Class Examples:**
- American Whitewater (americanwhitewater.org) - Rapids classification system
- Paddle.com - Put-in/take-out organization
- River gypsies guides - Seasonal flow patterns

**WVWO Template:** `RiverTemplate.astro` (SPEC-14)

| Category | Essential Fields | Nice-to-Have Fields |
|----------|-----------------|---------------------|
| **Identity** | name, length, county, difficultyRange | coordinates |
| **Rapids** | rapids[]: name, class (base/modifier), displayName, description | hazards[], runnable levels |
| **Fishing** | fishing: species[], seasons, accessPoints[], techniques[] | kimsTip |
| **Outfitters** | outfitters[]: name, services[], contact | priceRange, seasonalNotes |
| **Flow** | seasonalFlow[]: season, level, cfsRange, bestFor[] | notes |
| **Access** | accessPoints[]: name, type, facilities[], coords | shuttleInfo, typeNotes |
| **Safety** | safety[]: category, items[], important | emergency contacts |
| **Nearby** | nearbyAttractions[]: name, type, distance, description | link |

**Cross-Linking Pattern:**
- Campgrounds along river corridor
- Outfitter/resort partners
- State parks at put-in/take-out points
- USGS water level gauges (external)

**Content Length Benchmark:** 3,000-4,500 words

**Schema.org Markup:**
```json
{
  "@type": "RiverBodyOfWater",
  "name": "River Name",
  "length": { "@type": "QuantitativeValue", "value": "", "unitCode": "SMI" }
}
```

---

### 5. SKI RESORTS

**Best-in-Class Examples:**
- OnTheSnow (onthesnow.com) - Real-time conditions
- Ski.com - Integrated booking
- Snowshoe Mountain - Activity calendar organization

**WVWO Template:** `SkiTemplate.astro` (SPEC-15)

| Category | Essential Fields | Nice-to-Have Fields |
|----------|-----------------|---------------------|
| **Identity** | name, location, county, elevation (summit/base/vertical) | season dates |
| **Trails** | trails: total, beginner, intermediate, advanced, expert, acreage | longestRun |
| **Lifts** | lifts: total, types[], capacity | hourly capacity |
| **Snow** | snowConditions: averageSnowfall, snowmaking | conditionsUrl, widgetEmbed |
| **Pricing** | pricing: liftTickets[], seasonPass[], rentals[] | isDynamic, lastUpdated, pricingUrl |
| **Terrain** | terrainParks[]: name, difficulty, features[] | halfpipe dimensions |
| **Lodging** | lodging[]: name, type, distance, amenities[], priceRange | bookingUrl |
| **Dining** | dining[]: name, type, location | notes |
| **Amenities** | amenities[]: category, services[] | hours |
| **Summer** | summerActivities[]: name, description, season | pricing |
| **Safety** | safety[]: category, items[], importance | ski patrol info |
| **Nordic** | nordicSkiing: onSite, nearbyFacilities[] | trail miles |
| **Passes** | passAffiliations[]: name, daysIncluded, tier | Ikon/Epic info |

**Cross-Linking Pattern:**
- Nearby lodging off-mountain
- Cross-country ski areas
- Summer hiking trails
- Backcountry access points
- Equipment shops

**Content Length Benchmark:** 3,500-5,000 words

**Schema.org Markup:**
```json
{
  "@type": "SkiResort",
  "name": "Resort Name",
  "amenityFeature": [...],
  "geo": { "@type": "GeoCoordinates" },
  "priceRange": "$$$"
}
```

---

### 6. HISTORIC SITES

**Best-in-Class Examples:**
- Civil War Trust (battlefields.org) - Narrative-driven tours
- National Trust for Historic Preservation - Preservation stories
- WV State Archives - Primary source integration

**WVWO Template:** `HistoricTemplate.astro` (SPEC-19)

| Category | Essential Fields | Nice-to-Have Fields |
|----------|-----------------|---------------------|
| **Identity** | name, location, era, significance | nationalRegister designation |
| **Context** | historicalContext: overview, timeline[], keyFigures[] | themes[] |
| **Structures** | structures[]: name, type, status, significance | builtDate, architecturalStyle |
| **Tours** | tours[]: name, duration, schedule, fee | accessibility, reservationRequired |
| **Exhibits** | exhibits[]: name, description, permanent | interactiveElements |
| **Education** | education: programs[], fieldTrips[], virtualTours | lessonPlans |
| **Visitor** | visitorInfo: hours, admission, parking, contact | accessibility |
| **Nearby** | nearbyHistory[]: name, era, distance | crossReference |

**Cross-Linking Pattern:**
- Related historic sites (same era/theme)
- State parks containing historic sites
- Civil War battlefields network
- Coal mining heritage trail

**Content Length Benchmark:** 2,500-4,000 words (narrative-heavy)

**Schema.org Markup:**
```json
{
  "@type": ["LandmarksOrHistoricalBuildings", "TouristAttraction"],
  "name": "Site Name",
  "historicalSignificance": "...",
  "isPartOf": { "@type": "HistoricalEvent" }
}
```

---

### 7. CAVES

**Best-in-Class Examples:**
- Mammoth Cave NPS (nps.gov/maca) - Tour difficulty system
- Luray Caverns - Formation highlights
- Show Caves USA - Commercial cave standards

**WVWO Template:** `CaveTemplate.astro` (SPEC-16)

| Category | Essential Fields | Nice-to-Have Fields |
|----------|-----------------|---------------------|
| **Identity** | name, location, county, depth, temperature | discoveryYear |
| **Tours** | tours[]: name, difficulty, duration, distance, stairs | groupSize, ageMinimum, reservationRequired, seasonalNotes |
| **Formations** | formations[]: name, type, description, typeDisplay | ageEstimate, dimensions, funFact, kimNote |
| **Conditions** | conditions: temperature, humidity, whatToWear[], whatToBring[] | flash photography policy |
| **Accessibility** | accessibility: physicalRequirements[], limitations[], accommodations[] | medicalDisclaimer, waiverRequired |
| **Pricing** | pricing[]: tier, price, notes | combo tickets |
| **Hours** | hours[]: season, days, hours | notes |
| **Safety** | safety: rules[], prohibited[], emergencyContact | first aid location |
| **History** | history: discoveryStory, geologicalAge, notableEvents[] | localLegends[] |
| **Nearby** | nearbyAttractions[]: name, type, distance, description | link |

**Cross-Linking Pattern:**
- Nearby campgrounds for overnight stays
- State parks with caves
- Other caves in region (cave trail)
- Geology-focused attractions

**Content Length Benchmark:** 2,500-3,500 words

**Schema.org Markup:**
```json
{
  "@type": ["TouristAttraction", "Landform"],
  "name": "Cave Name",
  "tourBookingPage": "...",
  "offers": [...]
}
```

---

### 8. BACKCOUNTRY/WILDERNESS

**Best-in-Class Examples:**
- Wilderness.net (wilderness.net) - Leave No Trace emphasis
- Backpacker Magazine - Trip planning depth
- USFS Wilderness Areas - Permit systems

**WVWO Template:** `BackcountryTemplate.astro` (SPEC-17)

| Category | Essential Fields | Nice-to-Have Fields |
|----------|-----------------|---------------------|
| **Identity** | name, county, acreage, description | tagline, coordinates |
| **Navigation** | navigation: cellCoverage, satellite, coordinates | GPS waypoints |
| **Wilderness** | wildernessArea: name, designation, acreage, established | description |
| **Camping** | camping: permittedSites, regulations[], restrictions[], waterSources[] | hasAMDConcerns |
| **Trails** | trails[]: name, distance, difficulty, elevationGain, blazing | trailNumber, kimNote |
| **Skills** | requiredSkills[]: category, importance, skills[] | training resources |
| **Hazards** | wildlifeHazards[]: species, threatLevel, avoidanceBehavior[], encounterProtocol[] | seasons |
| **Emergency** | emergencyContacts[]: tier, service, phone, capabilities[] | responseTime, notes |
| **LNT** | leaveNoTrace[]: principle, guidelines[] | area-specific tips |
| **Access** | accessPoints[]: name, type, coordinates, cellCoverage, facilities[] | vehicleRequirements |
| **Seasonal** | seasonalConditions[]: season, avgHighTemp, avgLowTemp, primaryHazards[], bestActivities[] | kimNote |
| **Regulations** | regulations: permitRequired, firePolicies[], groupSizeLimits | huntingAllowed |
| **Agency** | managingAgency: name, jurisdiction, contact | rangerDistrict |

**Cross-Linking Pattern:**
- Trailheads with parking/camping
- Adjacent wilderness areas
- Ranger stations/visitor centers
- Emergency evacuation routes
- Outfitters for guided trips

**Content Length Benchmark:** 4,000-6,000 words (safety-critical)

**Schema.org Markup:**
```json
{
  "@type": ["NaturalFeature", "TouristAttraction"],
  "name": "Wilderness Name",
  "containedIn": { "@type": "NationalForest" },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Wilderness Designation" }
  ]
}
```

---

### 9. TRAILS

**Best-in-Class Examples:**
- AllTrails (alltrails.com) - User reviews, GPX downloads
- Hiking Project (hikingproject.com) - Trail conditions
- TrailLink (traillink.com) - Rail-trail networks

**WVWO Template:** Not yet implemented (candidate for new SPEC)

| Category | Essential Fields | Nice-to-Have Fields |
|----------|-----------------|---------------------|
| **Identity** | name, length, difficulty, type (loop/out-and-back/point-to-point) | elevationGain, estimatedTime |
| **Route** | trailhead: name, parking, coordinates, facilities | alternateAccess[] |
| **Conditions** | surface, blazeColor, dogFriendly, bikeAllowed | wheelchairAccessible, seasonalClosures |
| **Waypoints** | waypoints[]: name, mileMarker, description, coordinates | waterSource, viewpoint |
| **Difficulty** | technicalRating, fitnessLevel, hazards[] | scrambling required |
| **Seasonal** | bestSeasons[], winterConditions, mudSeasons | wildflowerPeaks |
| **Connections** | connectingTrails[], nearbyTrails[] | thru-hike options |

**Cross-Linking Pattern:**
- State park containing trail
- Campgrounds at trailhead
- Backcountry areas accessed by trail
- Related shop (hiking boots, poles)

**Content Length Benchmark:** 1,500-2,500 words per trail

**Schema.org Markup:**
```json
{
  "@type": "ExerciseAction",
  "name": "Trail Name",
  "location": {
    "@type": "Place",
    "geo": { "@type": "GeoCoordinates" }
  },
  "distance": { "@type": "Distance", "value": "", "unitCode": "SMI" }
}
```

---

### 10. CAMPGROUNDS

**Best-in-Class Examples:**
- Recreation.gov - Federal campground standards
- Hipcamp - Private land camping
- KOA - Amenity classification system

**WVWO Template:** `CampgroundTemplate.astro` (SPEC-21-A)

| Category | Essential Fields | Nice-to-Have Fields |
|----------|-----------------|---------------------|
| **Identity** | name, totalSites, managingAgency, recreationGovId | county, nearbyLake |
| **Sites** | campsites[]: name, count, amenities, fee | siteNumbers, hookupTypes |
| **Amenities** | amenities[]: name, available, description | accessibility |
| **Seasonal** | seasonalDates[]: period, dates, bookingStatus | winterCamping |
| **Policies** | policies[]: category, details, important | checkIn/checkOut times |
| **Activities** | nearbyActivities[]: name, distance, description, season | link |
| **Contact** | contacts[]: type, phone, address, url | emergencyContact |
| **Access** | directions, coordinates, cellService, maxRvLength | roadConditions |
| **Booking** | recreationGovId (auto-generates booking URL) | reservationWindow |

**Cross-Linking Pattern:**
- Lake being camped on
- Nearby WMA for hunting
- State park if within
- Hiking trails from campground

**Content Length Benchmark:** 2,000-3,000 words

**Schema.org Markup:**
```json
{
  "@type": "Campground",
  "name": "Campground Name",
  "amenityFeature": [...],
  "numberOfRooms": { "@type": "QuantitativeValue", "value": "" },
  "priceRange": "$"
}
```

---

### 11. CLIMBING

**Best-in-Class Examples:**
- Mountain Project (mountainproject.com) - Route database
- Climbing destination guides - Crag organization
- Access Fund - Conservation focus

**WVWO Template:** Not yet implemented (candidate for new SPEC)

| Category | Essential Fields | Nice-to-Have Fields |
|----------|-----------------|---------------------|
| **Identity** | name, location, climbingType (sport/trad/bouldering/mixed) | elevation |
| **Routes** | routes[]: name, grade, length, pitches, style | firstAscent, quality rating |
| **Crags** | crags[]: name, aspect, approach, rockType | bestSeasons, crowdLevel |
| **Access** | trailhead, approachTime, parkingNotes | accessIssues, permitsRequired |
| **Conditions** | seasonalConditions, shadeTiming | closures (nesting, ice) |
| **Gear** | requiredGear[], rentalsAvailable | guidebookRecommendations |
| **Safety** | hazards[], emergencyAccess | nearestHospital |
| **Ethics** | accessNotes, leaveNoTrace[], bolting policies | local climbing coalition |

**Cross-Linking Pattern:**
- Nearby campgrounds for climbers
- Gear shops with rentals
- Guiding services
- Related backcountry areas

**Content Length Benchmark:** 2,000-3,500 words per area

**Schema.org Markup:**
```json
{
  "@type": "SportsActivityLocation",
  "name": "Climbing Area",
  "sport": "Rock Climbing",
  "amenityFeature": [...]
}
```

---

### 12. NATIONAL PARKS

**Best-in-Class Examples:**
- NPS.gov - Comprehensive park organization
- National Park Foundation - Trip planning
- AllTrails NPS integration - Trail detail

**WVWO Template:** Not yet implemented (candidate for new SPEC, New River Gorge priority)

| Category | Essential Fields | Nice-to-Have Fields |
|----------|-----------------|---------------------|
| **Identity** | name, designation (National Park/NRA/Monument), acreage | established, npsCode |
| **Visitor Centers** | visitorCenters[]: name, hours, exhibits, contact | bookstore, accessibility |
| **Attractions** | keyAttractions[]: name, type, description | coordinates, bestTimes |
| **Activities** | activities[]: type, locations[], seasons | permits required |
| **Camping** | campgrounds[]: name, sites, reservable, amenities | backcountry camping |
| **Trails** | trails[]: name, distance, difficulty, highlights | ranger-led hikes |
| **Programs** | rangerPrograms[]: name, schedule, duration | juniorRanger |
| **Fees** | entranceFees, annualPass, specialPasses | fee-free days |
| **Access** | entrances[], roads[], closures | publicTransit |
| **Lodging** | inParkLodging[], nearbyLodging[] | concessionaires |
| **Regulations** | parkRules[], petPolicy, dronePolicy | specialUsePermits |

**Cross-Linking Pattern:**
- Gateway communities
- Surrounding national forest
- State parks in region
- Partner outfitters/guides

**Content Length Benchmark:** 5,000-8,000 words

**Schema.org Markup:**
```json
{
  "@type": ["NationalPark", "TouristAttraction"],
  "name": "Park Name",
  "isAccessibleForFree": false,
  "publicAccess": true,
  "containedIn": { "@type": "AdministrativeArea", "name": "West Virginia" }
}
```

---

### 13. ADVENTURE RESORTS

**Best-in-Class Examples:**
- ACE Adventure Resort - Multi-activity menu
- Adventures on the Gorge - Package bundling
- Snowshoe Mountain Resort - Year-round programming

**WVWO Template:** `ResortTemplate.astro` (SPEC-20)

| Category | Essential Fields | Nice-to-Have Fields |
|----------|-----------------|---------------------|
| **Identity** | name, location, season, signatureActivities[] | quickHighlights[] |
| **Activities** | activityCategories[]: name, activities[] | difficulty, ageRange, pricing |
| **Guided** | guidedTrips[]: name, duration, difficulty, groupSize | minAge, includes[], pricing |
| **Lodging** | lodging[]: name, type, capacity, amenities[], priceRange | bookingUrl |
| **Packages** | packages[]: name, days, includes[], price | discountFromAlaCarte |
| **Services** | outfitterServices: rentals[], shuttles[], instruction[] | guideCertifications |
| **Facilities** | facilities: dining[], retail[], eventSpaces[] | spa, conference |
| **Booking** | booking: reservationUrl, phone, policies[] | cancellationPolicy |
| **Map** | activityMapUrl | interactive map embed |

**Cross-Linking Pattern:**
- River access (paddling)
- Nearby attractions not at resort
- State parks/national parks
- Airport/driving directions

**Content Length Benchmark:** 4,000-6,000 words

**Schema.org Markup:**
```json
{
  "@type": ["TouristAttraction", "LodgingBusiness"],
  "name": "Resort Name",
  "amenityFeature": [...],
  "makesOffer": [...]
}
```

---

### 14. GENERIC ADVENTURE

**Best-in-Class Examples:**
- Regional tourism boards - Activity hubs
- Outdoor retailer blogs - Destination roundups
- AAA travel guides - Multi-interest coverage

**WVWO Template:** Base adventure components (shared across templates)

| Category | Essential Fields | Nice-to-Have Fields |
|----------|-----------------|---------------------|
| **Hero** | name, image, imageAlt, tagline, description | quickHighlights[], stats[] |
| **Location** | coordinates, county, driveTime | nearestTown |
| **Activities** | activities[]: name, description, difficulty, season | equipment, groupSize |
| **Gear** | gearList[]: name, optional | purchaseLink |
| **Shop** | relatedShop[]: name, href, description | categoryIds |
| **CTA** | heading, description, primaryText, primaryHref | secondaryText, secondaryHref |

**Cross-Linking Pattern:**
- Activity-specific destination pages
- Related shop categories
- Seasonal alternatives
- Nearby destinations

**Content Length Benchmark:** 1,500-2,500 words

---

## Cross-Linking Philosophy Summary

### Universal Cross-Link Fields

Every destination type should include these cross-link opportunities:

1. **nearbyLake** - Link to lake fishing guides
2. **nearbyWMA** - Link to hunting areas
3. **nearbyCampground** - Link to overnight options
4. **nearbyStatePark** - Link to state park pages
5. **nearbyHistoric** - Link to cultural/heritage sites
6. **nearbyTrails** - Link to hiking options
7. **relatedShop** - Link to WVWO shop categories

### Geographic Proximity Algorithm

Use Haversine formula for "nearby" calculations:
- **Very Close:** < 10 miles (same destination)
- **Close:** 10-25 miles (day-trip add-on)
- **Nearby:** 25-50 miles (multi-day trip)
- **Regional:** 50-100 miles (trip planning context)

---

## Content Length Benchmarks Summary

| Destination Type | Word Count | Justification |
|-----------------|------------|---------------|
| Lakes | 2,500-4,000 | Fishing detail + seasonal |
| State Parks | 3,000-5,000 | Facility inventory + programs |
| WMAs | 2,000-3,500 | Species + regulations |
| Rivers | 3,000-4,500 | Rapids + flows + outfitters |
| Ski Resorts | 3,500-5,000 | Trails + pricing + lodging |
| Historic Sites | 2,500-4,000 | Narrative-heavy |
| Caves | 2,500-3,500 | Tour options + safety |
| Backcountry | 4,000-6,000 | Safety-critical detail |
| Trails | 1,500-2,500 | Per-trail focus |
| Campgrounds | 2,000-3,000 | Site inventory + policies |
| Climbing | 2,000-3,500 | Route/crag database |
| National Parks | 5,000-8,000 | Comprehensive planning |
| Resorts | 4,000-6,000 | Multi-activity coverage |
| Generic | 1,500-2,500 | Overview/hub pages |

---

## Schema.org Patterns by Type

### Primary Types Used

| Destination | Primary Schema Type | Secondary Types |
|-------------|-------------------|-----------------|
| Lake | LakeBodyOfWater | TouristAttraction |
| State Park | Park | TouristAttraction |
| WMA | PublicArea | - |
| River | RiverBodyOfWater | TouristAttraction |
| Ski Resort | SkiResort | LodgingBusiness |
| Historic | LandmarksOrHistoricalBuildings | TouristAttraction |
| Cave | TouristAttraction | Landform |
| Backcountry | NaturalFeature | TouristAttraction |
| Trail | ExerciseAction | - |
| Campground | Campground | LodgingBusiness |
| Climbing | SportsActivityLocation | - |
| National Park | NationalPark | TouristAttraction |
| Resort | TouristAttraction | LodgingBusiness |

---

## Recommendations for Missing Templates

### Priority 1: National Park Template (SPEC-30)
- New River Gorge NPS is WVWO's flagship destination
- Requires comprehensive activity coverage
- Consider modular approach (reuse State Park sections)

### Priority 2: Trail Template (SPEC-44+)
- AllTrails-style individual trail pages
- GPX download integration
- User condition reports (future)

### Priority 3: Climbing Template
- Mountain Project-style route database
- Access/ethics focus
- Seasonal closures (raptor nesting)

---

## Data Quality Checklist

Before publishing any destination page, verify:

- [ ] All required fields populated
- [ ] Coordinates verified (not placeholder)
- [ ] Phone numbers validated
- [ ] External URLs tested
- [ ] Cross-links resolve to existing pages
- [ ] Schema.org validates (Google Rich Results Test)
- [ ] Images have proper alt text
- [ ] Emergency contacts current
- [ ] Seasonal hours/dates updated
- [ ] Fees verified against official sources

---

## Research Sources Referenced

### Official Sources (Primary)
- WV DNR (wvdnr.gov) - Hunting/fishing regulations
- WV State Parks (wvstateparks.com) - Park information
- USFS Monongahela (fs.usda.gov) - National forest data
- NPS (nps.gov) - National park standards
- USACE (usace.army.mil) - Lake/dam data
- Recreation.gov - Campground standards

### Industry Standards
- NSAA (nsaa.org) - Ski trail difficulty standards
- American Whitewater - River classification
- Leave No Trace Center - LNT principles
- Access Fund - Climbing access standards

### Competitive Analysis
- AllTrails - Trail page structure
- Mountain Project - Climbing page structure
- OnTheSnow - Ski resort pages
- Hipcamp - Campground UX patterns

---

*Research compiled by WVWO Research Worker Agent*
*Last updated: January 2025*
