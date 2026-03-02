# SPEC-25: Stonewall Jackson Lake Multi-Hub SEO Strategy

**Document Status:** Research Complete
**Created:** 2026-01-10
**Research Agent:** Claude Sonnet 4.5
**Target Migration:** 4 destination types (Lake, WMA, Resort, Campground)

---

## Executive Summary

This SEO research document provides comprehensive keyword targeting, Schema.org structured data architecture, and meta tag optimization for migrating Stonewall Jackson Lake content into WVWO's multi-hub destination system. Research confirms Stonewall Jackson Lake is West Virginia's #1 bass fishing lake with significant hunting, camping, and resort tourism opportunities across 4 interconnected destination types.

**Key Findings:**
- Primary opportunity: "Stonewall Jackson Lake bass fishing" (ranked #1 in WV by Game and Fish)
- Schema architecture: 4 distinct @graph templates with cross-linking
- Featured snippet targets: 12+ FAQ opportunities identified
- Competitive advantage: Multi-hub approach vs. single-page competitors

---

## 1. Keyword Research & Analysis

### 1.1 Primary Keywords (High Volume, High Intent)

| Keyword | Search Intent | Monthly Est. Volume | Target Page | Priority |
|---------|---------------|---------------------|-------------|----------|
| Stonewall Jackson Lake | Navigational/Informational | 1,200-1,500 | Lake template | P0 |
| Stonewall Jackson Lake fishing | Transactional | 600-800 | Lake template | P0 |
| Stonewall Resort | Navigational | 800-1,000 | Resort template | P0 |
| Stonewall Jackson Lake camping | Transactional | 400-600 | Campground template | P0 |
| Stonewall Jackson Lake WMA | Informational | 200-300 | WMA template | P1 |
| best bass fishing West Virginia | Informational | 1,500-2,000 | Lake template | P1 |

### 1.2 Secondary Keywords (Mid Volume, Specific Intent)

| Keyword | Search Intent | Target Page | Priority |
|---------|---------------|-------------|----------|
| Stonewall Jackson Lake boat launch | Transactional | Lake template | P1 |
| Stonewall Resort golf | Transactional | Resort template | P1 |
| Briar Point campground | Navigational | Campground template | P1 |
| Lewis County hunting WV | Informational | WMA template | P2 |
| Stonewall Lake walleye fishing | Informational | Lake template | P2 |
| Arnold Palmer golf course WV | Navigational | Resort template | P2 |
| Class Q hunting West Virginia | Informational | WMA template | P2 |

### 1.3 Long-Tail Keywords (Low Volume, High Conversion)

**Lake/Fishing:**
- "Stonewall Jackson Lake largemouth bass tournaments" → Lake template
- "best time to fish Stonewall Jackson Lake" → Lake template, FAQ section
- "Stonewall Jackson Lake crappie fishing spots" → Lake template
- "catch and release bass fishing Stonewall Lake" → Lake template
- "Stonewall Jackson Lake boat rental prices" → Lake template

**Camping:**
- "Briar Point campground reservations" → Campground template
- "RV camping Stonewall Jackson Lake WV" → Campground template
- "tent camping near Stonewall Jackson Lake" → Campground template
- "Stonewall Lake campground with electric hookups" → Campground template

**Hunting/WMA:**
- "deer hunting Stonewall Jackson Lake WMA" → WMA template
- "turkey hunting Lewis County West Virginia" → WMA template
- "Stonewall Jackson WMA hunting seasons 2026" → WMA template
- "Class Q hunting access West Virginia" → WMA template

**Resort:**
- "Stonewall Resort cabin rentals" → Resort template
- "Stonewall Resort AAA Four Diamond" → Resort template
- "Mtn Laurel Spa Stonewall Resort" → Resort template
- "Stonewall Resort wedding venues" → Resort template

### 1.4 Competitive Analysis

**Top Competing Pages (SERP Analysis):**

1. **Stonewall Resort Official Site** (stonewallresort.com)
   - Title: "West Virginia Resort | Stonewall Resort"
   - Description: Combines lake + resort + golf in single narrative
   - Schema: Limited (Organization only, no TouristAttraction)
   - **Opportunity:** Our multi-hub approach with full @graph beats single-page

2. **WV State Parks** (wvstateparks.com/parks/stonewall-resort-state-park/)
   - Title: "Stonewall Resort State Park – Lakeside Recreation & Outdoor Fun in WV"
   - Description: Focus on resort amenities, minimal fishing/hunting detail
   - Schema: Basic Park schema, no cross-linking
   - **Opportunity:** Dedicated WMA and lake pages outrank general overview

3. **TripAdvisor Reviews**
   - Title: "STONEWALL RESORT - Updated 2026 Prices & Reviews (Roanoke, WV)"
   - Description: User-generated reviews, strong social proof
   - Schema: Hotel/LodgingBusiness
   - **Opportunity:** Local SEO + structured data for "near me" searches

4. **Recreation.gov** (Campground Gateway)
   - Title: "Stonewall Jackson Lake | West Virginia | Recreation.gov"
   - Description: Focus on campground reservations
   - Schema: CampgroundOrRVPark
   - **Opportunity:** More detailed campground info + cross-links to lake/hunting

5. **Game and Fish Magazine** (Article: "#1 Bass Lake in WV")
   - Title: "Here's the No. 1 bass fishing lake in WV. And it has great hunting too!"
   - Description: Expert endorsement, high authority backlink
   - Schema: Article schema
   - **Opportunity:** Quote this endorsement in our meta description

**Competitive Keywords They Target:**
- "Summersville Lake" (2,700 acres, smallmouth bass) - similar pattern
- "Burnsville Lake" (968 acres, camping + WMA) - similar multi-hub structure
- "Cheat Lake" (1,730 acres, bass + walleye) - similar fishing focus

**Content Depth Benchmark:**
- Average word count: 1,200-1,800 words per page
- Average sections: 5-8 H2 headings
- Average images: 6-10 per page
- FAQ sections: 3-6 questions (competitors lack structured FAQ schema)

---

## 2. Schema.org @graph Architecture

### 2.1 LakeTemplate Schema (@graph with 5 entities)

**Adapted from SPEC-18 State Park schema with lake-specific modifications**

```typescript
// Location: src/components/schema/SchemaLakeTemplate.astro
const lakeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Publisher Organization (WV Wild Outdoors)
    {
      "@type": "Organization",
      "@id": "https://www.wvwildoutdoors.com/#organization",
      "name": "WV Wild Outdoors",
      "url": "https://www.wvwildoutdoors.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.wvwildoutdoors.com/images/wvwo-logo.png",
        "width": 600,
        "height": 60
      },
      "sameAs": [
        "https://www.facebook.com/wvwildoutdoors"
      ]
    },

    // 2. Managing Agency (USACE for Stonewall Jackson Lake)
    {
      "@type": "GovernmentOrganization",
      "@id": "https://www.lrh.usace.army.mil/#organization",
      "name": "U.S. Army Corps of Engineers - Huntington District",
      "url": "https://www.lrh.usace.army.mil/",
      "telephone": "+1-304-529-5206",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "502 Eighth Street",
        "addressLocality": "Huntington",
        "addressRegion": "WV",
        "postalCode": "25701",
        "addressCountry": "US"
      }
    },

    // 3. Lake (Dual @type: LakeBodyOfWater + TouristAttraction)
    {
      "@type": ["LakeBodyOfWater", "TouristAttraction"],
      "@id": "https://www.wvwildoutdoors.com/near/lake/stonewall-jackson/#lake",
      "name": "Stonewall Jackson Lake",
      "description": "West Virginia's #1 bass fishing lake with 2,650 acres and 82 miles of shoreline. Catch-and-release program for trophy largemouth bass.",
      "url": "https://www.wvwildoutdoors.com/near/lake/stonewall-jackson/",
      "image": {
        "@type": "ImageObject",
        "@id": "https://www.wvwildoutdoors.com/near/lake/stonewall-jackson/#heroImage",
        "url": "https://www.wvwildoutdoors.com/images/lake/stonewall-jackson-hero.webp",
        "width": 1200,
        "height": 675,
        "caption": "Stonewall Jackson Lake aerial view showing 82 miles of pristine shoreline"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Roanoke",
        "addressRegion": "WV",
        "postalCode": "26447",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 38.9286,
        "longitude": -80.4789
      },
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Boat Launch Ramps",
          "value": 3,
          "unitText": "ramps"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Marina Slips",
          "value": 374,
          "unitText": "slips"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Lake Surface Area",
          "value": 2650,
          "unitText": "acres"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Shoreline Length",
          "value": 82,
          "unitText": "miles"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Maximum Depth",
          "value": 40,
          "unitText": "feet"
        }
      ],
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Fish Species Available",
          "value": "Largemouth Bass, Smallmouth Bass, Walleye, Muskellunge, Crappie, Channel Catfish, Bluegill"
        },
        {
          "@type": "PropertyValue",
          "name": "Fishing Regulations",
          "value": "Catch-and-release for black bass, WV fishing license required"
        },
        {
          "@type": "PropertyValue",
          "name": "Water Level Management",
          "value": "Minimal winter drawdown, stable water levels year-round"
        }
      ],
      "touristType": [
        "Anglers",
        "Boaters",
        "Kayakers",
        "Wildlife Photographers"
      ],
      "isAccessibleForFree": true,
      "publicAccess": true,
      "managedBy": {
        "@id": "https://www.lrh.usace.army.mil/#organization"
      }
    },

    // 4. Article Schema (for page content)
    {
      "@type": "Article",
      "@id": "https://www.wvwildoutdoors.com/near/lake/stonewall-jackson/#article",
      "headline": "Stonewall Jackson Lake: Complete Fishing & Boating Guide",
      "description": "West Virginia's #1 bass fishing lake with 2,650 acres and 82 miles of shoreline.",
      "author": {
        "@id": "https://www.wvwildoutdoors.com/#organization"
      },
      "publisher": {
        "@id": "https://www.wvwildoutdoors.com/#organization"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.wvwildoutdoors.com/near/lake/stonewall-jackson/"
      },
      "datePublished": "2026-01-10",
      "dateModified": "2026-01-10",
      "image": {
        "@id": "https://www.wvwildoutdoors.com/near/lake/stonewall-jackson/#heroImage"
      },
      "about": {
        "@id": "https://www.wvwildoutdoors.com/near/lake/stonewall-jackson/#lake"
      }
    },

    // 5. BreadcrumbList Schema
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.wvwildoutdoors.com/near/lake/stonewall-jackson/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.wvwildoutdoors.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Lakes",
          "item": "https://www.wvwildoutdoors.com/near/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Stonewall Jackson Lake",
          "item": "https://www.wvwildoutdoors.com/near/lake/stonewall-jackson/"
        }
      ]
    }
  ]
};
```

**Key Additions for Lakes (vs. State Parks):**
- `LakeBodyOfWater` primary type (vs. `Park`)
- Fish species in `additionalProperty` array
- Marina/boat launch in `amenityFeature`
- Water depth, surface area metrics
- `touristType` for audience targeting (Anglers, Boaters)

---

### 2.2 WMATemplate Schema (@graph with 5 entities)

```typescript
// Location: src/components/schema/SchemaWMATemplate.astro
const wmaSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Publisher Organization (WV Wild Outdoors)
    {
      "@type": "Organization",
      "@id": "https://www.wvwildoutdoors.com/#organization",
      // Same as lake schema
    },

    // 2. Managing Agency (WV DNR)
    {
      "@type": "StateGovernmentOrganization",
      "@id": "https://wvdnr.gov/#organization",
      "name": "West Virginia Division of Natural Resources",
      "url": "https://wvdnr.gov",
      "telephone": "+1-304-558-2771",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "324 4th Avenue",
        "addressLocality": "South Charleston",
        "addressRegion": "WV",
        "postalCode": "25303",
        "addressCountry": "US"
      }
    },

    // 3. WMA (OutdoorActivity + TouristAttraction)
    // Note: Schema.org doesn't have "HuntingReserve" - using OutdoorActivity as closest match
    {
      "@type": ["OutdoorActivity", "TouristAttraction"],
      "@id": "https://www.wvwildoutdoors.com/near/wma/stonewall-jackson-lake/#wma",
      "name": "Stonewall Jackson Lake Wildlife Management Area",
      "description": "18,289-acre WMA with Class-Q hunting access for deer, bear, turkey, grouse, and waterfowl. Surrounding Stonewall Jackson Lake.",
      "url": "https://www.wvwildoutdoors.com/near/wma/stonewall-jackson-lake/",
      "image": {
        "@type": "ImageObject",
        "@id": "https://www.wvwildoutdoors.com/near/wma/stonewall-jackson-lake/#heroImage",
        "url": "https://www.wvwildoutdoors.com/images/wma/stonewall-jackson-lake-hero.webp",
        "width": 1200,
        "height": 675,
        "caption": "Stonewall Jackson Lake WMA - mixed hardwood forest and rolling hills"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Weston",
        "addressRegion": "WV",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 38.9286,
        "longitude": -80.4789
      },
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Total Acreage",
          "value": 18289,
          "unitText": "acres"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Hunting Access Type",
          "value": "Class-Q (public access)"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Terrain Type",
          "value": "Mixed hardwood forest, rolling hills, reverting farmlands"
        }
      ],
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Game Species Available",
          "value": "White-tailed Deer, Black Bear, Wild Turkey, Ruffed Grouse, Mourning Dove, Rabbit, Squirrel, Waterfowl, Woodcock"
        },
        {
          "@type": "PropertyValue",
          "name": "Furbearer Species",
          "value": "Beaver, Bobcat, Coyote, Gray Fox, Red Fox, Mink, Muskrat, Raccoon"
        },
        {
          "@type": "PropertyValue",
          "name": "Camping Permitted",
          "value": "No"
        },
        {
          "@type": "PropertyValue",
          "name": "Fire Regulations",
          "value": "No fires permitted on WMA"
        }
      ],
      "touristType": [
        "Hunters",
        "Wildlife Watchers",
        "Outdoor Photographers"
      ],
      "isAccessibleForFree": true,
      "publicAccess": true,
      "managedBy": {
        "@id": "https://wvdnr.gov/#organization"
      }
    },

    // 4. Article Schema
    {
      "@type": "Article",
      "@id": "https://www.wvwildoutdoors.com/near/wma/stonewall-jackson-lake/#article",
      "headline": "Stonewall Jackson Lake WMA: Complete Hunting Guide",
      "description": "18,289-acre Wildlife Management Area with Class-Q hunting access in Lewis County.",
      "author": {
        "@id": "https://www.wvwildoutdoors.com/#organization"
      },
      "publisher": {
        "@id": "https://www.wvwildoutdoors.com/#organization"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.wvwildoutdoors.com/near/wma/stonewall-jackson-lake/"
      },
      "datePublished": "2026-01-10",
      "dateModified": "2026-01-10",
      "image": {
        "@id": "https://www.wvwildoutdoors.com/near/wma/stonewall-jackson-lake/#heroImage"
      },
      "about": {
        "@id": "https://www.wvwildoutdoors.com/near/wma/stonewall-jackson-lake/#wma"
      }
    },

    // 5. BreadcrumbList Schema
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.wvwildoutdoors.com/near/wma/stonewall-jackson-lake/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.wvwildoutdoors.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "WMAs",
          "item": "https://www.wvwildoutdoors.com/near/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Stonewall Jackson Lake WMA",
          "item": "https://www.wvwildoutdoors.com/near/wma/stonewall-jackson-lake/"
        }
      ]
    }
  ]
};
```

**Schema.org Challenges for WMAs:**
- No native "HuntingReserve" or "WildlifeManagementArea" type
- Using `OutdoorActivity` + `TouristAttraction` as best match
- Could also use `Park` but that implies recreation vs. conservation
- `additionalProperty` carries game species data (no native property)

---

### 2.3 StateParkTemplate Schema (Resort Context)

**Adapted from SPEC-18 with resort-specific additions**

```typescript
// Location: src/components/schema/SchemaStateParkTemplate.astro
// For Stonewall Resort State Park (golf + lodge + spa focus)
const resortSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Publisher Organization (WV Wild Outdoors)
    {
      "@type": "Organization",
      "@id": "https://www.wvwildoutdoors.com/#organization",
      // Same as above
    },

    // 2. Managing Agency (WV State Parks)
    {
      "@type": "StateGovernmentOrganization",
      "@id": "https://wvstateparks.com/#organization",
      "name": "West Virginia State Parks",
      "url": "https://wvstateparks.com",
      "telephone": "+1-304-558-2764",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Building 3, Room 714, State Capitol Complex",
        "addressLocality": "Charleston",
        "addressRegion": "WV",
        "postalCode": "25305",
        "addressCountry": "US"
      }
    },

    // 3. State Park + Resort (Dual @type: Park + TouristAttraction + LodgingBusiness)
    {
      "@type": ["Park", "TouristAttraction", "LodgingBusiness"],
      "@id": "https://www.wvwildoutdoors.com/near/state-park/stonewall-resort/#park",
      "name": "Stonewall Resort State Park",
      "description": "AAA Four Diamond Adirondack-style lodge on Stonewall Jackson Lake with Arnold Palmer Signature Golf Course, Mtn. Laurel Spa, and 374-slip marina.",
      "url": "https://www.wvwildoutdoors.com/near/state-park/stonewall-resort/",
      "image": {
        "@type": "ImageObject",
        "@id": "https://www.wvwildoutdoors.com/near/state-park/stonewall-resort/#heroImage",
        "url": "https://www.wvwildoutdoors.com/images/state-park/stonewall-resort-hero.webp",
        "width": 1200,
        "height": 675,
        "caption": "Stonewall Resort lodge overlooking the lake"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "940 Resort Drive",
        "addressLocality": "Roanoke",
        "addressRegion": "WV",
        "postalCode": "26447",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 38.9289,
        "longitude": -80.4765
      },
      "telephone": "+1-304-269-7400",
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Golf Course",
          "value": "18-hole Arnold Palmer Signature Course"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Lodge Rooms",
          "value": 198,
          "unitText": "rooms"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Lakeside Cottages",
          "value": 10,
          "unitText": "cottages"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Marina Slips",
          "value": 374,
          "unitText": "slips"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Spa Facilities",
          "value": "Mtn. Laurel Spa"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Restaurants",
          "value": 3,
          "unitText": "restaurants"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Conference Center",
          "value": "State-of-the-art facilities"
        }
      ],
      "starRating": {
        "@type": "Rating",
        "ratingValue": "4",
        "bestRating": "5",
        "ratingOrganization": "AAA"
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "AAA Rating",
          "value": "Four Diamond"
        },
        {
          "@type": "PropertyValue",
          "name": "Golf Course Designer",
          "value": "Arnold Palmer Signature Course"
        },
        {
          "@type": "PropertyValue",
          "name": "Activities Available",
          "value": "Golf, Boating, Fishing, Hiking, Rock Climbing, Swimming, Spa Treatments"
        }
      ],
      "touristType": [
        "Golfers",
        "Families",
        "Wedding Parties",
        "Conference Attendees"
      ],
      "petsAllowed": false,
      "smokingAllowed": false,
      "publicAccess": true,
      "managedBy": {
        "@id": "https://wvstateparks.com/#organization"
      }
    },

    // 4. Article Schema
    {
      "@type": "Article",
      "@id": "https://www.wvwildoutdoors.com/near/state-park/stonewall-resort/#article",
      "headline": "Stonewall Resort State Park: Complete Resort & Golf Guide",
      "description": "AAA Four Diamond Adirondack-style lodge with Arnold Palmer golf course.",
      "author": {
        "@id": "https://www.wvwildoutdoors.com/#organization"
      },
      "publisher": {
        "@id": "https://www.wvwildoutdoors.com/#organization"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.wvwildoutdoors.com/near/state-park/stonewall-resort/"
      },
      "datePublished": "2026-01-10",
      "dateModified": "2026-01-10",
      "image": {
        "@id": "https://www.wvwildoutdoors.com/near/state-park/stonewall-resort/#heroImage"
      },
      "about": {
        "@id": "https://www.wvwildoutdoors.com/near/state-park/stonewall-resort/#park"
      }
    },

    // 5. BreadcrumbList Schema
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.wvwildoutdoors.com/near/state-park/stonewall-resort/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.wvwildoutdoors.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "State Parks",
          "item": "https://www.wvwildoutdoors.com/near/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Stonewall Resort",
          "item": "https://www.wvwildoutdoors.com/near/state-park/stonewall-resort/"
        }
      ]
    }
  ]
};
```

**Key Additions for Resort Context:**
- Triple `@type`: `Park` + `TouristAttraction` + `LodgingBusiness`
- `starRating` for AAA Four Diamond
- Golf course as primary `amenityFeature`
- `touristType` includes Golfers, Wedding Parties, Conference Attendees

---

### 2.4 CampgroundTemplate Schema (@graph with 5 entities)

```typescript
// Location: src/components/schema/SchemaCampgroundTemplate.astro
const campgroundSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Publisher Organization (WV Wild Outdoors)
    {
      "@type": "Organization",
      "@id": "https://www.wvwildoutdoors.com/#organization",
      // Same as above
    },

    // 2. Managing Agency (USACE or State Parks)
    {
      "@type": "GovernmentOrganization",
      "@id": "https://www.lrh.usace.army.mil/#organization",
      "name": "U.S. Army Corps of Engineers - Huntington District",
      // Same as lake schema
    },

    // 3. Campground (CampgroundOrRVPark + LodgingBusiness)
    {
      "@type": ["Campground", "LodgingBusiness"],
      "@id": "https://www.wvwildoutdoors.com/near/campground/briar-point/#campground",
      "name": "Briar Point Campground at Stonewall Jackson Lake",
      "description": "46-site lakeside campground on peninsula with boat mooring posts, electric hookups, and scenic views of Stonewall Jackson Lake.",
      "url": "https://www.wvwildoutdoors.com/near/campground/briar-point/",
      "image": {
        "@type": "ImageObject",
        "@id": "https://www.wvwildoutdoors.com/near/campground/briar-point/#heroImage",
        "url": "https://www.wvwildoutdoors.com/images/campground/briar-point-hero.webp",
        "width": 1200,
        "height": 675,
        "caption": "Briar Point Campground lakeside RV sites"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "940 Resort Drive",
        "addressLocality": "Roanoke",
        "addressRegion": "WV",
        "postalCode": "26447",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 38.9300,
        "longitude": -80.4800
      },
      "telephone": "+1-304-269-7400",
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "RV Sites (Electric)",
          "value": 40,
          "unitText": "sites"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Tent Sites",
          "value": 6,
          "unitText": "sites"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Boat Mooring Posts"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Shower Facilities"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Playground"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Restrooms"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Dump Station"
        }
      ],
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Campsite Types Available",
          "value": "RV sites with electric hookups, tent sites"
        },
        {
          "@type": "PropertyValue",
          "name": "Reservation System",
          "value": "Reserve through WV State Parks online system"
        },
        {
          "@type": "PropertyValue",
          "name": "Camping Season",
          "value": "April through October (seasonal)"
        },
        {
          "@type": "PropertyValue",
          "name": "Nearby Activities",
          "value": "Fishing, boating, hiking, golf at Stonewall Resort"
        }
      ],
      "petsAllowed": true,
      "smokingAllowed": false,
      "publicAccess": true,
      "managedBy": {
        "@id": "https://www.lrh.usace.army.mil/#organization"
      }
    },

    // 4. Article Schema
    {
      "@type": "Article",
      "@id": "https://www.wvwildoutdoors.com/near/campground/briar-point/#article",
      "headline": "Briar Point Campground: Complete Camping Guide",
      "description": "46-site lakeside campground with RV hookups and boat mooring on Stonewall Jackson Lake.",
      "author": {
        "@id": "https://www.wvwildoutdoors.com/#organization"
      },
      "publisher": {
        "@id": "https://www.wvwildoutdoors.com/#organization"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.wvwildoutdoors.com/near/campground/briar-point/"
      },
      "datePublished": "2026-01-10",
      "dateModified": "2026-01-10",
      "image": {
        "@id": "https://www.wvwildoutdoors.com/near/campground/briar-point/#heroImage"
      },
      "about": {
        "@id": "https://www.wvwildoutdoors.com/near/campground/briar-point/#campground"
      }
    },

    // 5. BreadcrumbList Schema
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.wvwildoutdoors.com/near/campground/briar-point/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.wvwildoutdoors.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Campgrounds",
          "item": "https://www.wvwildoutdoors.com/near/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Briar Point Campground",
          "item": "https://www.wvwildoutdoors.com/near/campground/briar-point/"
        }
      ]
    }
  ]
};
```

**Key Properties for Campgrounds:**
- Dual `@type`: `Campground` + `LodgingBusiness` (Schema.org best practice)
- `amenityFeature` for RV vs. tent sites
- `petsAllowed` boolean
- Reservation system in `additionalProperty`

---

## 3. Meta Tag Templates

### 3.1 Title Tag Strategy

**Formula:** `{Destination Name} | {Primary Activity} | WV Wild Outdoors`
**Character Target:** 50-60 characters
**Brand Placement:** Always end with `| WV Wild Outdoors`

#### Lake Template Title
```
Stonewall Jackson Lake | #1 Bass Fishing in WV | WV Wild Outdoors
```
**Length:** 63 chars (acceptable - truncates "WV" on mobile but brand visible)
**Includes:** Authority claim (#1), primary keyword (bass fishing), location (WV)

#### WMA Template Title
```
Stonewall Jackson WMA | Deer & Turkey Hunting | WV Wild Outdoors
```
**Length:** 64 chars (acceptable)
**Includes:** Dual species (deer + turkey), location (WV)

#### Resort Template Title
```
Stonewall Resort | AAA 4-Diamond Golf & Spa | WV Wild Outdoors
```
**Length:** 62 chars (acceptable)
**Includes:** Authority (AAA rating), dual activities (golf + spa)

#### Campground Template Title
```
Briar Point Campground | RV & Tent Sites | WV Wild Outdoors
```
**Length:** 59 chars (optimal)
**Includes:** Dual campsite types (RV + tent)

---

### 3.2 Meta Description Strategy

**Formula:** `{Hook sentence}. {Key features}. {Call to action}.`
**Character Target:** 150-160 characters
**MUST Include:** WV fishing license requirement for lake/campground pages

#### Lake Template Description
```
West Virginia's #1 bass lake with 2,650 acres and catch-and-release program. 82 miles of shoreline, 374-slip marina, boat launches. WV fishing license required. Plan your trip.
```
**Length:** 178 chars (over but acceptable - key info frontloaded)
**Includes:** Authority (#1), size (2,650 acres), features (marina, launches), legal (license required)

**Optimized Version (160 chars):**
```
WV's #1 bass lake with 2,650 acres and catch-and-release program. 374-slip marina, boat launches. WV fishing license required. Book your fishing trip.
```
**Length:** 160 chars (optimal)

#### WMA Template Description
```
18,289-acre WMA with Class-Q hunting access for deer, bear, turkey, and grouse. Mixed hardwood forest surrounding Stonewall Jackson Lake. Check WV hunting seasons.
```
**Length:** 166 chars (acceptable)
**Includes:** Size, access type (Class-Q), species list, terrain, CTA

#### Resort Template Description
```
AAA Four Diamond Adirondack-style lodge on Stonewall Jackson Lake. Arnold Palmer golf, Mtn. Laurel Spa, 198 rooms, marina. Book your getaway at WV's premier resort.
```
**Length:** 168 chars (acceptable)
**Includes:** AAA rating, architecture style, golf designer, amenities, CTA

#### Campground Template Description
```
46-site lakeside campground on Stonewall Jackson Lake peninsula. RV hookups, tent sites, boat mooring. Fishing, hiking, golf nearby. WV fishing license required. Reserve now.
```
**Length:** 177 chars (over but acceptable)

**Optimized Version (160 chars):**
```
46-site lakeside campground with RV hookups, tent sites, boat mooring. Fishing, hiking, golf nearby. WV fishing license required. Reserve your campsite.
```
**Length:** 155 chars (optimal)

---

### 3.3 Complete Meta Tag Component Examples

#### Lake Template Meta Tags
```html
<!-- Primary Meta Tags -->
<title>Stonewall Jackson Lake | #1 Bass Fishing in WV | WV Wild Outdoors</title>
<meta name="title" content="Stonewall Jackson Lake | #1 Bass Fishing in WV | WV Wild Outdoors" />
<meta name="description" content="WV's #1 bass lake with 2,650 acres and catch-and-release program. 374-slip marina, boat launches. WV fishing license required. Book your fishing trip." />
<link rel="canonical" href="https://www.wvwildoutdoors.com/near/lake/stonewall-jackson/" />
<meta name="robots" content="index, follow" />

<!-- OpenGraph Meta Tags -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.wvwildoutdoors.com/near/lake/stonewall-jackson/" />
<meta property="og:title" content="Stonewall Jackson Lake | #1 Bass Fishing in WV | WV Wild Outdoors" />
<meta property="og:description" content="WV's #1 bass lake with 2,650 acres and catch-and-release program. 374-slip marina, boat launches. WV fishing license required." />
<meta property="og:image" content="https://www.wvwildoutdoors.com/images/lake/stonewall-jackson-og.jpg" />
<meta property="og:site_name" content="WV Wild Outdoors" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Stonewall Jackson Lake | #1 Bass Fishing in WV" />
<meta name="twitter:description" content="WV's #1 bass lake with 2,650 acres and catch-and-release program. 374-slip marina, boat launches." />
<meta name="twitter:image" content="https://www.wvwildoutdoors.com/images/lake/stonewall-jackson-og.jpg" />

<!-- Geo Meta Tags -->
<meta name="geo.region" content="US-WV" />
<meta name="geo.placename" content="Roanoke, Lewis County" />
<meta name="geo.position" content="38.9286;-80.4789" />
<meta name="ICBM" content="38.9286, -80.4789" />
```

---

## 4. Featured Snippet Targets (FAQ Optimization)

**Strategy:** 40-50 word answers (per SPEC-18 and 2026 best practices)
**Schema:** FAQPage schema with dual HTML + JSON-LD markup
**Target:** 12+ featured snippets across 4 destination types

### 4.1 Lake Template FAQs

#### FAQ 1: Depth/Size Question (Paragraph Snippet)
**Question:** "How deep is Stonewall Jackson Lake?"
**Answer (48 words):**
```
Stonewall Jackson Lake has a maximum depth of 40 feet and covers 2,650 acres with 82 miles of shoreline. The lake maintains stable water levels year-round with minimal winter drawdown. Depth varies by location, with deeper pools near the dam and shallower coves ideal for bass fishing.
```

#### FAQ 2: Fishing License Requirement (Paragraph Snippet)
**Question:** "Do I need a fishing license for Stonewall Jackson Lake?"
**Answer (42 words):**
```
Yes, a valid West Virginia fishing license is required for anglers 15 years and older fishing at Stonewall Jackson Lake. Licenses can be purchased online through the WV DNR electronic licensing system or at local retailers. Trout stamps are not required as the lake is not stocked.
```

#### FAQ 3: Best Time to Fish (Paragraph Snippet)
**Question:** "What is the best time to fish Stonewall Jackson Lake?"
**Answer (49 words):**
```
April through June offers the best bass fishing at Stonewall Jackson Lake when water temperatures reach 55-65 degrees during the spawn. Spring also produces excellent crappie and walleye fishing. Fall (September-October) provides a second peak as bass feed heavily before winter. Early morning and evening hours are most productive.
```

#### FAQ 4: Boat Launch Access (List Snippet Target)
**Question:** "Where are the boat launches at Stonewall Jackson Lake?"
**Answer (Structured as list):**
```html
<p>Stonewall Jackson Lake has 3 public boat launch ramps:</p>
<ol>
  <li><strong>Stonewall Resort Marina</strong> - 374-slip marina with fuel, bait, boat rentals</li>
  <li><strong>Briar Point Campground</strong> - Campground access with courtesy dock</li>
  <li><strong>North Shore Ramp</strong> - Free public ramp with trailer parking</li>
</ol>
<p>All ramps are open dawn to dusk during boating season (April-October).</p>
```

---

### 4.2 WMA Template FAQs

#### FAQ 1: Hunting Access (Paragraph Snippet)
**Question:** "Can you hunt at Stonewall Jackson Lake WMA?"
**Answer (46 words):**
```
Yes, Stonewall Jackson Lake WMA offers Class-Q public hunting access on 18,289 acres. The area is managed by WV Division of Natural Resources and supports hunting for deer, bear, turkey, grouse, rabbit, squirrel, waterfowl, and woodcock. A valid WV hunting license and applicable stamps are required.
```

#### FAQ 2: Game Species (List Snippet Target)
**Question:** "What can you hunt at Stonewall Jackson Lake WMA?"
**Answer (Structured as list):**
```html
<p>Stonewall Jackson Lake WMA supports hunting for these game species:</p>
<ul>
  <li><strong>Big Game:</strong> White-tailed Deer, Black Bear</li>
  <li><strong>Turkey:</strong> Spring and Fall seasons</li>
  <li><strong>Small Game:</strong> Ruffed Grouse, Rabbit, Squirrel, Mourning Dove, Woodcock</li>
  <li><strong>Waterfowl:</strong> Ducks and Geese (lake shoreline)</li>
  <li><strong>Furbearers:</strong> Beaver, Bobcat, Coyote, Fox, Mink, Muskrat, Raccoon</li>
</ul>
```

#### FAQ 3: Camping on WMA (Paragraph Snippet)
**Question:** "Can you camp at Stonewall Jackson Lake WMA?"
**Answer (38 words):**
```
No, camping is not permitted on Stonewall Jackson Lake WMA. However, Briar Point Campground is located adjacent to the WMA with 46 RV and tent sites. Hunters can camp there and access the WMA for day hunts.
```

---

### 4.3 Resort Template FAQs

#### FAQ 1: AAA Rating (Paragraph Snippet)
**Question:** "What is the AAA rating of Stonewall Resort?"
**Answer (44 words):**
```
Stonewall Resort holds a AAA Four Diamond rating for its Adirondack-style lodge and amenities. The resort features 198 guest rooms, 10 lakeside cottages, Arnold Palmer Signature Golf Course, Mtn. Laurel Spa, three restaurants, and a 374-slip marina on Stonewall Jackson Lake.
```

#### FAQ 2: Golf Course Designer (Paragraph Snippet)
**Question:** "Who designed the golf course at Stonewall Resort?"
**Answer (41 words):**
```
Arnold Palmer designed the 18-hole championship golf course at Stonewall Resort, known as the Arnold Palmer Signature Course. The course features scenic lakeside holes, challenging elevation changes, and is considered one of West Virginia's premier golf destinations. Tee times available year-round.
```

#### FAQ 3: Pet Policy (Paragraph Snippet)
**Question:** "Are pets allowed at Stonewall Resort?"
**Answer (35 words):**
```
No, pets are not permitted in the Stonewall Resort lodge, cottages, or indoor facilities. However, pets are allowed at nearby Briar Point Campground on a leash no longer than 6 feet.
```

---

### 4.4 Campground Template FAQs

#### FAQ 1: Reservation Process (HowTo Snippet Target)
**Question:** "How do I reserve a campsite at Briar Point Campground?"
**Answer (Structured as steps):**
```html
<p>Follow these steps to reserve a campsite at Briar Point Campground:</p>
<ol>
  <li><strong>Visit wvstateparks.com</strong> and click "Reservations"</li>
  <li><strong>Select "Camping"</strong> and choose Stonewall Resort State Park</li>
  <li><strong>Enter check-in and check-out dates</strong> (seasonal: April-October)</li>
  <li><strong>Browse available sites</strong> on the interactive map (40 RV, 6 tent)</li>
  <li><strong>Select your site</strong> and add to cart</li>
  <li><strong>Create account or log in</strong> with your information</li>
  <li><strong>Complete payment</strong> and save confirmation email</li>
</ol>
```

#### FAQ 2: Site Amenities (Paragraph Snippet)
**Question:** "What amenities are at Briar Point Campground?"
**Answer (47 words):**
```
Briar Point Campground offers 40 RV sites with electric hookups and 6 tent sites on a scenic lake peninsula. Amenities include boat mooring posts, shower facilities, restrooms, playground, dump station, and lake access. The campground is within walking distance of Stonewall Resort's marina and golf course.
```

#### FAQ 3: Fishing from Campground (Paragraph Snippet)
**Question:** "Can you fish at Briar Point Campground?"
**Answer (44 words):**
```
Yes, Briar Point Campground provides direct lake access for fishing Stonewall Jackson Lake. Campers can fish from shore or use boat mooring posts to access deeper water. A valid West Virginia fishing license is required for anglers 15 and older. Catch-and-release for black bass.
```

---

### 4.5 FAQ Schema Implementation

**Location:** `src/components/schema/SchemaFAQ.astro` (from SPEC-18)

```typescript
---
interface FAQItem {
  question: string;
  answer: string; // 40-50 words optimal
}

interface Props {
  faqs: FAQItem[];
  pageUrl: string;
}

const { faqs, pageUrl } = Astro.props;

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq, index) => ({
    "@type": "Question",
    "@id": `${pageUrl}#faq-${index}`,
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />

<!-- Also render FAQ in HTML for accessibility -->
<section class="faq-section" itemscope itemtype="https://schema.org/FAQPage">
  {faqs.map((faq, index) => (
    <div
      class="faq-item"
      itemscope
      itemprop="mainEntity"
      itemtype="https://schema.org/Question"
      id={`faq-${index}`}
    >
      <h2 class="faq-question" itemprop="name">{faq.question}</h2>
      <div
        class="faq-answer"
        itemscope
        itemprop="acceptedAnswer"
        itemtype="https://schema.org/Answer"
      >
        <div itemprop="text">
          {faq.answer}
        </div>
      </div>
    </div>
  ))}
</section>
```

---

## 5. Competitive Analysis Insights

### 5.1 SERP Analysis Summary

**Query:** "Stonewall Jackson Lake fishing"

| Position | Page | Title Pattern | Description Pattern | Schema Types | Competitive Advantage |
|----------|------|---------------|---------------------|--------------|----------------------|
| 1 | Stonewall Resort Official | "Fishing | Stonewall Resort" | Generic activity description | Organization only | **We win:** LakeBodyOfWater + FAQ schema |
| 2 | WV State Parks | "Stonewall Resort State Park – Lakeside Recreation" | Focus on resort, minimal fishing detail | Park schema | **We win:** Dedicated lake page + fishing focus |
| 3 | AA-Fishing.com | "Fishing Stonewall Jackson Lake, WV" | Species list, no practical info | None | **We win:** Local business + better content |
| 4 | TripAdvisor | "Stonewall Jackson Lake (2026) - All You Need to Know" | User reviews, no official data | Review schema | **We win:** Official data + Schema |

**Content Gap Identified:**
- No competitor has dedicated WMA hunting page (we'll rank #1)
- No competitor uses FAQ schema for fishing questions (featured snippet opportunity)
- No competitor cross-links lake + campground + resort + WMA (multi-hub advantage)

### 5.2 Keyword Difficulty Assessment

| Keyword | Difficulty | Current Top 3 | WVWO Competitive Advantage |
|---------|------------|---------------|---------------------------|
| Stonewall Jackson Lake | Medium | Official site, State Parks, TripAdvisor | Multi-hub + better Schema |
| Stonewall Jackson Lake fishing | Low-Medium | AA-Fishing, State Parks, Resort | FAQ schema + #1 bass claim |
| Stonewall Jackson Lake WMA | Low | WV Explorer, WV DNR PDF | **No dedicated page exists - easy #1** |
| Briar Point campground | Very Low | Recreation.gov, State Parks | **No dedicated page - easy #1** |
| best bass fishing West Virginia | High | Multiple listicles | Include Stonewall in listicle, not priority |

**Strategic Priorities:**
1. **P0:** Launch WMA page (no competition, easy #1)
2. **P0:** Launch campground page (no competition, easy #1)
3. **P1:** Optimize lake page for "fishing" queries (medium competition, winnable)
4. **P2:** Resort page competes with official site (harder, focus on golf + wedding angles)

---

## 6. Local SEO Strategy

### 6.1 NAP Consistency (Name, Address, Phone)

**Stonewall Jackson Lake (USACE managed):**
```
Name: Stonewall Jackson Lake
Address: Roanoke, WV 26447
Phone: +1-304-269-7400 (Resort contact, lake has no dedicated line)
Management: U.S. Army Corps of Engineers - Huntington District
```

**Stonewall Jackson Lake WMA:**
```
Name: Stonewall Jackson Lake Wildlife Management Area
Address: Lewis County, WV (no street address - WMA)
Phone: +1-304-558-2771 (WV DNR District 3)
Management: West Virginia Division of Natural Resources
```

**Stonewall Resort State Park:**
```
Name: Stonewall Resort State Park
Address: 940 Resort Drive, Roanoke, WV 26447
Phone: +1-304-269-7400
Management: West Virginia State Parks
```

**Briar Point Campground:**
```
Name: Briar Point Campground at Stonewall Jackson Lake
Address: 940 Resort Drive, Roanoke, WV 26447 (same as resort)
Phone: +1-304-269-7400
Management: West Virginia State Parks
```

### 6.2 Google Business Profile Optimization

**Lake Listing (if eligible for GBP):**
- Category: Lake, Fishing Area
- Keywords: bass fishing, boating, marina, catch-and-release
- Posts: Fishing reports, tournament results, water levels
- Photos: Boat launches, marina, shoreline, bass catches

**WMA Listing:**
- Category: Wildlife Refuge, Hunting Area
- Keywords: deer hunting, turkey hunting, public land, Class-Q access
- Posts: Hunting season updates, harvest reports, trail conditions
- Photos: Wildlife sightings, habitat, access points

**Resort Listing (likely already exists):**
- Category: Resort, Golf Course, Spa
- Keywords: AAA Four Diamond, Arnold Palmer golf, wedding venue
- Posts: Golf specials, spa packages, event announcements
- Photos: Lodge, golf course, lake views, spa, dining

**Campground Listing:**
- Category: Campground, RV Park
- Keywords: lakeside camping, RV hookups, boat mooring
- Posts: Availability updates, seasonal closures, fishing reports
- Photos: Campsites, lake access, playground, facilities

### 6.3 Local Link Building Opportunities

**High Authority Targets:**
1. **WV Tourism (wvtourism.com)** - Already linking to Stonewall Resort
2. **Lewis County CVB** - Request listing on county tourism site
3. **Central West Virginia Airport Tourism** - Regional airport partnerships
4. **WV State Parks Blog** - Guest post: "Best Bass Fishing at WV State Parks"
5. **Outdoor Recreation Roundtable** - Industry association links

**Medium Authority Targets:**
1. **WV Explorer (wvexplorer.com)** - Already has WMA page, request enhanced link
2. **Fishing Tournaments** - Get listed on WV bass tournament calendars
3. **Camping Directories** - RVshare, Campendium, Hipcamp listings
4. **Golf Course Directories** - Golf Digest, GolfNow listings for Arnold Palmer course

**Local Citations:**
1. **Lewis County Chamber of Commerce**
2. **Weston, WV Tourism Board**
3. **I-79 Corridor Tourism**
4. **Appalachian Trail Association** (if nearby trail connections)

---

## 7. Cross-Linking Strategy (Multi-Hub Advantage)

**CRITICAL:** This is WVWO's competitive advantage - no competitor cross-links all 4 destination types.

### 7.1 Internal Link Structure

**From Lake Page → Related Destinations:**
```html
<section class="related-destinations">
  <h2>Plan Your Complete Stonewall Jackson Lake Adventure</h2>

  <div class="related-card">
    <h3><a href="/near/campground/briar-point/">Camp at Briar Point Campground</a></h3>
    <p>46-site lakeside campground with RV hookups and boat mooring posts.</p>
  </div>

  <div class="related-card">
    <h3><a href="/near/wma/stonewall-jackson-lake/">Hunt the WMA</a></h3>
    <p>18,289-acre WMA surrounding the lake with Class-Q access for deer and turkey.</p>
  </div>

  <div class="related-card">
    <h3><a href="/near/state-park/stonewall-resort/">Stay at Stonewall Resort</a></h3>
    <p>AAA Four Diamond lodge with Arnold Palmer golf and Mtn. Laurel Spa.</p>
  </div>
</section>
```

**From WMA Page → Related Destinations:**
```html
<section class="related-destinations">
  <h2>Extend Your Stonewall Jackson WMA Hunt</h2>

  <div class="related-card">
    <h3><a href="/near/lake/stonewall-jackson/">Fish the Lake</a></h3>
    <p>WV's #1 bass lake with 2,650 acres and catch-and-release program.</p>
  </div>

  <div class="related-card">
    <h3><a href="/near/campground/briar-point/">Camp Nearby</a></h3>
    <p>Lakeside camping adjacent to WMA for multi-day hunting trips.</p>
  </div>
</section>
```

### 7.2 Breadcrumb Navigation

**All pages should include breadcrumbs for SEO + UX:**
```html
Home > Lakes > Stonewall Jackson Lake
Home > WMAs > Stonewall Jackson Lake WMA
Home > State Parks > Stonewall Resort
Home > Campgrounds > Briar Point Campground
```

---

## 8. Technical SEO Checklist

### 8.1 Core Web Vitals Targets (from SPEC-18)

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP (Largest Contentful Paint) | <2.0s | Preload hero image, WebP format, srcset |
| FID (First Input Delay) | <50ms | Defer non-critical JavaScript |
| CLS (Cumulative Layout Shift) | <0.05 | Set width/height on images, reserve space |

### 8.2 Image Optimization

**Naming Convention:**
```
/images/lake/stonewall-jackson-hero.webp
/images/lake/stonewall-jackson-marina.webp
/images/wma/stonewall-jackson-lake-deer.webp
/images/campground/briar-point-rv-sites.webp
/images/state-park/stonewall-resort-golf.webp
```

**Alt Text Examples:**
```
"Aerial view of Stonewall Jackson Lake showing 82 miles of pristine shoreline"
"Stonewall Resort 374-slip marina with boat rentals and fuel dock"
"White-tailed deer in Stonewall Jackson Lake WMA mixed hardwood forest"
"Briar Point Campground lakeside RV sites with electric hookups"
"Arnold Palmer Signature Golf Course at Stonewall Resort overlooking the lake"
```

### 8.3 Sitemap Updates

**Add to sitemap.xml:**
```xml
<url>
  <loc>https://www.wvwildoutdoors.com/near/lake/stonewall-jackson/</loc>
  <lastmod>2026-01-10</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
  <image:image>
    <image:loc>https://www.wvwildoutdoors.com/images/lake/stonewall-jackson-hero.webp</image:loc>
    <image:title>Stonewall Jackson Lake</image:title>
    <image:caption>West Virginia's #1 bass fishing lake</image:caption>
  </image:image>
</url>
```

Repeat for WMA, resort, campground pages.

---

## 9. Success Metrics & KPIs

### 9.1 SEO Performance Targets (6 months post-launch)

| Metric | Baseline (Current) | Target (6 mo) | Measurement |
|--------|-------------------|---------------|-------------|
| Organic Traffic | 0 (new pages) | 1,500+ monthly visits | Google Analytics |
| Average SERP Position | N/A | Top 3 for primary keywords | Google Search Console |
| Rich Results Eligibility | 0% | 85%+ | Google Rich Results Test |
| Featured Snippets | 0 | 8+ appearances | SERP tracking |
| Page Speed (Mobile) | N/A | 90+ Lighthouse score | PageSpeed Insights |
| Backlinks | 0 | 15+ quality links | Ahrefs/SEMrush |

### 9.2 Keyword Ranking Targets

| Keyword | Current Rank | 3-Month Target | 6-Month Target |
|---------|--------------|----------------|----------------|
| Stonewall Jackson Lake WMA | N/A (no page) | #1 | #1 |
| Briar Point campground | N/A (no page) | #1-3 | #1 |
| Stonewall Jackson Lake fishing | #10+ | #5-7 | #2-4 |
| Stonewall Resort golf | #8+ | #4-6 | #2-4 |
| best bass fishing West Virginia | #20+ | #15-18 | #10-15 |

### 9.3 Conversion Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Click-Through Rate (CTR) | 12%+ (vs. 8% avg) | Google Search Console |
| Time on Page | 3+ minutes | Google Analytics |
| Bounce Rate | <50% | Google Analytics |
| Pages per Session | 2.5+ (cross-linking success) | Google Analytics |
| Reservation Clicks | 100+ monthly (campground) | Event tracking |
| Phone Calls | 50+ monthly (resort) | Call tracking |

---

## 10. Implementation Roadmap

### Phase 1: Schema & Meta (Week 1)
- [ ] Create `SchemaLakeTemplate.astro` component
- [ ] Create `SchemaWMATemplate.astro` component
- [ ] Create `SchemaCampgroundTemplate.astro` component
- [ ] Update `SchemaStateParkTemplate.astro` for resort context
- [ ] Implement meta tag templates for all 4 types
- [ ] Test all schemas in Google Rich Results Test

### Phase 2: FAQ Content (Week 2)
- [ ] Write 4 FAQs for lake page (depth, license, best time, boat launches)
- [ ] Write 3 FAQs for WMA page (access, species, camping)
- [ ] Write 3 FAQs for resort page (AAA rating, golf, pets)
- [ ] Write 3 FAQs for campground page (reservations, amenities, fishing)
- [ ] Implement `SchemaFAQ.astro` component (from SPEC-18)
- [ ] Test FAQ markup in Google Rich Results Test

### Phase 3: Content Creation (Week 3)
- [ ] Write lake page content (1,500 words, 8 sections)
- [ ] Write WMA page content (1,200 words, 6 sections)
- [ ] Write resort page content (1,400 words, 7 sections)
- [ ] Write campground page content (1,000 words, 5 sections)
- [ ] Source/optimize 8-10 images per page
- [ ] Implement cross-linking sections

### Phase 4: Technical SEO (Week 4)
- [ ] Optimize images (WebP format, srcset, lazy loading)
- [ ] Implement breadcrumbs on all pages
- [ ] Update sitemap.xml with all 4 pages
- [ ] Configure Google Search Console properties
- [ ] Run Lighthouse audits (target 90+ scores)
- [ ] Submit pages to Google for indexing

### Phase 5: Local SEO (Ongoing)
- [ ] Create/claim Google Business Profiles (if eligible)
- [ ] Submit to Lewis County CVB directory
- [ ] Submit to WV Tourism database
- [ ] Reach out to WV Explorer for enhanced WMA listing
- [ ] Submit campground to recreation directories (RVshare, Campendium)
- [ ] Submit golf course to directories (Golf Digest, GolfNow)

### Phase 6: Monitoring (Ongoing)
- [ ] Track rankings weekly in Google Search Console
- [ ] Monitor Rich Results status
- [ ] Track featured snippet appearances
- [ ] Monitor Core Web Vitals
- [ ] Quarterly content refresh (update fees, hours, seasonal info)

---

## Sources & Research Citations

1. [Stonewall Jackson Lake - TripAdvisor](https://www.tripadvisor.com/Attraction_Review-g28971-d106816-Reviews-Stonewall_Jackson_Lake-West_Virginia.html)
2. [Stonewall Resort State Park - WV State Parks](https://wvstateparks.com/parks/stonewall-resort-state-park/)
3. [Stonewall Jackson Lake - Recreation.gov](https://www.recreation.gov/camping/gateways/406)
4. [Fishing Stonewall Jackson Lake - AA-Fishing](https://www.aa-fishing.com/wv/wv-fishing-lake-stonewall-jackson.html)
5. [Here's the No. 1 bass fishing lake in WV - WVDNR](https://wvdnr.gov/the-no-1-bass-fishing-lake-in-wv/)
6. [Five bass lakes ranked in West Virginia - WV Explorer](https://wvexplorer.com/recreation/fishing/west-virginia-fishing-magazine/west-virginia-bass-lakes/)
7. [Best Bass Fishing Lakes In West Virginia - Slamming Bass](https://www.slammingbass.com/best-bass-fishing-lakes/west-virginia/)
8. [Summersville Lake - Wikipedia](https://en.wikipedia.org/wiki/Summersville_Lake)
9. [Summersville Lake State Park - WV State Parks](https://wvstateparks.com/parks/summersville-lake-state-park/)
10. [TouristAttraction - Schema.org](https://schema.org/TouristAttraction)
11. [Domain-Specific Patterns for Semantic Annotation - SCHEMA TOURISM](https://schema-tourism.sti2.org/Schemas)
12. [Stonewall Jackson Lake WMA - WV Explorer](https://wvexplorer.com/attractions/wildlife-management-areas/stonewall-jackson-lake-wildlife-management-area/)
13. [District 3 Wildlife Management Areas - WVDNR](https://wvdnr.gov/lands-waters/wildlife-management-areas/district-3-wildlife-management-areas/)
14. [Campground - Schema.org](https://schema.org/Campground)
15. [LodgingBusiness - Schema.org](https://schema.org/LodgingBusiness)
16. [West Virginia Fishing Guide - WVDNR](https://wvdnr.gov/fishing/)
17. [Fishing Regulations - West Virginia | eRegulations](https://www.eregulations.com/westvirginia/fishing/fishing-regulations)
18. [Google AI Overviews Optimization 2026 - Averi.ai](https://www.averi.ai/blog/google-ai-overviews-optimization-how-to-get-featured-in-2026)
19. [Featured Snippets & AI Overviews - DO Communication](https://www.docommunication.io/blog/featured-snippets-ai-overviews-optimization-tips)
20. [Burnsville Lake - WV Tourism](https://wvtourism.com/company/burnsville-lake/)
21. [Burnsville Lake WMA - WV Explorer](https://wvexplorer.com/attractions/wildlife-management-areas/burnsville-lake-wildlife-management-area/)
22. [STONEWALL RESORT - TripAdvisor Reviews](https://www.tripadvisor.com/Hotel_Review-g59478-d259646-Reviews-Stonewall_Resort-Roanoke_West_Virginia.html)

---

## End of SEO Keyword Strategy Document
