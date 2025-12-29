---
title: "Test WMA Integration Page"
description: "Test page for validating SPEC-12 component integration with all 4 components rendered together"
pubDate: 2025-01-15
heroImage: "/images/test-hero.jpg"
heroAlt: "Test WMA landscape"
difficulty: "moderate"
location: "Test County, WV"
coordinates:
  lat: 38.1234
  lng: -81.5678
driveTime: "30 min"
stats:
  - value: "5,000"
    label: "Acres"
    icon: "area"
  - value: "Year-Round"
    label: "Access"
    icon: "calendar"
  - value: "Free"
    label: "Entry"
    icon: "check"

# SPEC-12 Component Data
features:
  - title: "White-tailed Deer"
    description: "Archery season Sep 15-Dec 31. Rifle Nov 20-Dec 5."
    notes: "Creek bottoms at dawn. Glass south-facing ridges mid-morning."
  - title: "Eastern Wild Turkey"
    description: "Spring gobbler season April 17-May 20. Fall either-sex Oct 15-Nov 20."
    notes: "Work the oak flats near campground. Birds roost along river bluff."
  - title: "Ruffed Grouse"
    description: "Season Oct 1-Feb 28. No limit."

amenities:
  - "Gravel parking (20 vehicles)"
  - "Primitive camping (no hookups)"
  - "Vault toilets (seasonal)"
  - "ADA-accessible trails"
  - "Shooting range (archery only)"
  - "Boat launch (canoes/kayaks)"

facilities:
  - type: "Camping Sites"
    count: 12
    description: "Primitive sites along creek. First-come, first-served. No electric or water."
    contact: "(304) 555-CAMP"
    accessibility: "2 ADA-accessible sites near parking"
  - type: "Shooting Range"
    count: 5
    description: "Archery range with 3D targets. Open dawn-dusk. Free with valid hunting license."
    contact: "(304) 555-DNR1"
  - type: "Boat Launch"
    description: "Small gravel launch for canoes/kayaks. No motorized boats. Launch at your own risk."
    link: "https://wvdnr.gov/boating"
---

# Test WMA Integration Page

This page is used exclusively for E2E testing of SPEC-12 component integration.
All 4 components should render with proper data flow and no conflicts.

## Test Components

1. **AdventureFeatureSection** - "What to Hunt" with 3 species
2. **AdventureCampingList** - 3 facilities with count badges
3. **AdventureAmenitiesGrid** - 6 amenities in 3-column grid
4. **AdventureCTA** - Dual buttons with sign-green background
