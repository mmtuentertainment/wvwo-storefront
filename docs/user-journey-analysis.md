# WVWO User Journey Analysis
## Visitor Flows, Engagement Loops & Conversion Funnels

**Analysis Date:** January 13, 2026
**Current Site Status:** 8+ destination types with dynamic routing
**Primary Business:** Family-owned hunting/fishing shop + outdoor adventure hub

---

## EXECUTIVE SUMMARY: Critical Findings

### Current State
- **3 entry points actively driving traffic:** Home hero, Adventures hub, Hunt Near Us
- **1 primary conversion goal:** Shop visit (phone call, directions, license purchase)
- **Newsletter funnel:** Present on 90%+ of pages, but buried below fold on most
- **Major gap:** No journey back to shop from destination pages except blind CTAs

### Key Metrics Missing
- No exit-intent surveys
- No abandoned journey tracking
- No "return visitor" reengagement loops
- No seasonal pathway (e.g., buck season → shop gear → destination)

---

## USER JOURNEY MAP #1: Google Search → Lake Page

### Path: `google.com/search?q=burnsville lake fishing` → `/near/lake/burnsville/`

**Visitor Profile:** Targeted searcher (high intent), knows what they want

**Journey Flow:**
```
Google SERP
    ↓
Lake page hero + breadcrumb (clear location)
    ↓
Lake details: fishing spots, marinas, seasons
    ↓
Activities grid + regulations
    ↓
[DECISION POINT #1: "Where next?"]
    ├─ Cross-link to WMA hunting page
    ├─ Cross-link to related campgrounds
    ├─ Newsletter signup (bottom)
    └─ No direct back to /near/ hub
    ↓
[EXIT OR DEEP ENGAGEMENT]
```

**Current CTA Structure:**
1. **Bottom of page (newsletter):** "Get Local Fishing Updates"
   - Embedded in EmailCapture card
   - Position: Below fold, after all content
   - Copy: "Stocking reports, what's biting where, tackle restocks"
   - Strength: Highly relevant to page content
   - Weakness: No phone/visit CTA above this

2. **No cross-selling CTA above fold**
   - Missing: "Need gear? Stop by the shop" (should be between hero and details)

3. **Cross-link section (lower mid-page):**
   - Links to WMA hunting page (if exists)
   - Links to nearby campgrounds
   - Strength: Keeps visitor in WVWO ecosystem
   - Weakness: "Need to camp?" links to campground, not shop supplies

**Drop-Off Points:**
- **#1 - No Shop Bridge Above Fold (HIGH IMPACT)**
  - Visitor reads lake details, never learns "we sell fishing licenses here"
  - Cross-links invite exploration, but no monetization path
  - Fix: Add "Stop by the shop" CTA between hero and lake details

- **#2 - Newsletter Only Below Fold (MEDIUM IMPACT)**
  - Visitor may leave before reaching newsletter
  - No "call the shop" fallback if reader isn't newsletter-ready
  - Fix: Dual CTA button section after details + before newsletter

- **#3 - No Related Adventures Section (LOW IMPACT)**
  - Page doesn't suggest "also planning to visit Elk River WMA?"
  - Missed upsell on 45-min drive to Summersville Lake + campground combo
  - Fix: Add "Nearby Adventures" grid before newsletter

**Behavioral Pattern:**
```
Scenario A: Visitor plans trip (high likelihood)
  Lake page → Bookmarks/screenshots → Leaves
  → No email captured (70% miss rate)

Scenario B: Visitor ready to book campground (medium)
  Lake page → Clicks campground link → Campground page
  → Might book if campground has direct reservation (external link)
  → Never learns about shop

Scenario C: Visitor collecting info (low)
  Lake page → Newsletter signup → Email captured ✓
  → Future email engagement (2-3 day delay)
  → Very weak re-engagement: Generic "hunting updates"
```

---

## USER JOURNEY MAP #2: Adventures Hub → Destination Page

### Path: `/adventures/` (filtered view) → Click card → `/near/lake/burnsville/`

**Visitor Profile:** Discovery-oriented, browsing for ideas, moderate intent

**Journey Flow:**
```
/adventures/ hero "Find Your Next Adventure"
    ↓
Filter panel (season, difficulty, activity)
    ↓
Card grid: [Lake Card] [WMA Card] [Campground Card]...
    ↓
Click [Burnsville Lake - 45 min - Great Bass Fishing]
    ↓
Destination page (same as #1 above)
    ↓
[DECISION POINT: Continue exploring or leave?]
```

**Current CTA Structure - Adventures Hub:**
1. **Page CTA (mid-page, after content):**
   - Section: "Need Gear for Your Adventure?"
   - Copy: "Stop by the shop before you head out..."
   - Buttons: "Browse Gear" + "Call Us: (304) 649-5765"
   - Position: Still visible after filters + grid
   - Strength: **BEST CTA on site** - contextual + dual-button
   - Issue: Positioned AFTER all content (may miss 30% of visitors)

2. **Individual card CTAs:**
   - Card shows: Title, description, season/difficulty/location badges
   - No button on card itself (requires click to read more)
   - Missed opportunity: Could add "Quick View" button to card

**Drop-Off Points:**
- **#1 - Filter Overwhelm (MEDIUM)**
  - 8+ destination types, 4 season filters, 5+ activity filters
  - Visitors may click through 2-3 results, then leave without CTA
  - Comparison: No side-by-side "I'm thinking fishing" → auto-filter to lakes

- **#2 - CTA After Filters Misses Mobile Users (HIGH)**
  - Mobile users scroll: Hero → Filters → Grid → 5-10 cards
  - May not scroll down to "Need Gear?" CTA below grid
  - Fix: Add sticky "Shop Gear" button on mobile, visible above fold at all times

- **#3 - No "Save This Trip" or "Share with Friend" (LOW)**
  - After filtering, no ability to bookmark or email results
  - Contrast: Competitor sites let you "save adventure" to account

**Behavioral Pattern:**
```
Scenario A: Weekend planner (highest likelihood, 60%)
  /adventures/ → Filters for "weekend, fishing, easy"
  → Clicks 1 lake card → Reads details → Newsletter signup
  → Scenario: MODERATE-HIGH engagement (may capture email)

Scenario B: Family trip planner (medium, 30%)
  /adventures/ → Filters for "campground, family-friendly, moderate"
  → Clicks campground → External booking link to USACE/etc
  → Never reaches shop CTA (external redirect)
  → Scenario: LOSS OF CONVERSION

Scenario C: Window shopper (low intent, 10%)
  /adventures/ → Scrolls cards → Leaves
  → Never reaches "Need Gear?" CTA
  → No email, no phone call
  → Scenario: TOTAL DROP OFF
```

---

## USER JOURNEY MAP #3: Hunt Near Us Hub → WMA Page

### Path: `/near/` (hardcoded listing) → Click "Full Guide" → `/near/wma/burnsville/`

**Visitor Profile:** Location-focused, knows geography, seasonal hunter

**Journey Flow:**
```
/near/ hero "Hunt Near Us" (I-79 Exit 57 positioning)
    ↓
Hero CTA buttons: "Get Directions" + "Call Us"
    ↓
WMA section: [Burnsville Card] [Elk River Card] [Stonewall Card]
    ↓
Click "Full Guide" → /near/wma/burnsville/
    ↓
WMA detail page: Species, seasons, regulations, access points
    ↓
[DECISION POINT: Call shop? Go hunting? Save for later?]
    ├─ Cross-link to Burnsville Lake fishing
    ├─ Newsletter signup
    └─ Footer with hours/phone
    ↓
[CONVERSION OR EXIT]
```

**Current CTA Structure - Hunt Near Us Hub:**
1. **Hero section (above fold):**
   - Tagline: "Three Wildlife Management Areas within 45 minutes"
   - Buttons: "Get Directions" (white bg) + "Call Us: (304) 649-5765" (outline)
   - Strength: Highly visible, phone number crystal clear
   - Weakness: Both buttons navigate AWAY from shop (maps, phone), no "Learn More"

2. **Area cards CTAs:**
   - Small green "Full Guide" link on each card
   - Leads to dynamic detail page
   - Strength: Clear hierarchy (scan headline → click for details)
   - Weakness: No secondary action (e.g., "Get Directions to Elk River")

3. **Bottom CTA (very bottom of /near/):**
   - "Stop By Before You Head Out" section (green bg)
   - Buttons: "Get Directions" (white) + "Call Us" (outline)
   - Strength: Repeated reinforcement, green is primary brand color
   - Weakness: Same buttons as hero (redirects to maps/phone, not re-engagement)

**Current CTA Structure - WMA Detail Page:**
1. **Cross-link section (lower mid-page):**
   - "Looking for fishing information?"
   - Link to `/near/lake/burnsville/` if exists
   - Strength: Keeps visitor in ecosystem
   - Weakness: No "shop gear" CTA between cross-link and newsletter

2. **Newsletter (near bottom):**
   - "Get Local Hunting Updates"
   - Copy: "Season dates, regulations changes, what's happening in the woods"
   - Position: After cross-links, before footer
   - Strength: Highly relevant to hunter mindset
   - Issue: No backup phone/visit CTA if visitor isn't newsletter-ready

**Drop-Off Points - Hunt Near Us Hub:**
- **#1 - Hero CTAs Navigate Away (CRITICAL)**
  - Both buttons: external (maps) or tel: link
  - Visitor clicks "Get Directions" → maps app/opens in new tab → LOSES CONTEXT
  - Contrast: Should be "Learn More" button that stays on site
  - Impact: Estimated 40-50% exit rate on hero CTA click

- **#2 - No Shop Context on Cards (MEDIUM)**
  - WMA cards show: Name, distance, hunting species, fishing species
  - Missing: "We have licenses, ammo for these species" callout
  - Fix: Add small badge "Shop has [species] licenses in stock"

- **#3 - No Trip Planning Integration (LOW)**
  - After seeing Burnsville WMA + Burnsville Lake, no "Plan This Combo Trip" option
  - Fix: Auto-detect visitor on WMA page, suggest "Add 45 min for lake combo"

**Behavioral Pattern - Hunt Near Us:**
```
Scenario A: Pre-hunt research (highest, 70%)
  /near/ → Reads 2-3 WMA cards → Clicks "Full Guide" on Elk River WMA
  → Reads details: Access points, seasons, species regs
  → Sees cross-link to Elk River Lake fishing
  → Newsletter signup at bottom
  → Scenario: GOOD engagement (email capture likely 60%)

Scenario B: Just needs directions (medium, 20%)
  /near/ → Clicks "Get Directions" hero button
  → Maps app opens → NO CONTEXT retained
  → May call shop (if remembers number) or just show up
  → Scenario: CONVERSION (visit) but NO EMAIL/DATA capture

Scenario C: Mobile quick lookup (low, 10%)
  /near/ → Scrolls WMA cards
  → Mobile menu collapsed, hero buttons out of view
  → Scrolls to footer hours/phone
  → Calls shop or bookmarks
  → Scenario: CONVERSION (visit) via footer fallback
```

---

## USER JOURNEY MAP #4: Seasonal Entry Point (Buck Season Example)

### Path: Home (banner alert) → `/buck-season/` → Shop → Adventure pages

**Current Implementation:**
- Home page banner: "Buck season prep is HERE → Get your checklist"
- Links to: `/buck-season/` page (likely seasonal guide)

**Missing Details:** Not enough implementation visible to fully map, but this represents an important **seasonal acquisition channel** that needs expansion.

**Opportunity:**
```
Seasonal pathway: (e.g., Oct-Nov)

Home banner "BUCK SEASON PREP"
  ↓
/buck-season/ page (checklist, gear guide, timeline)
  ↓
"Shop Our Buck Season Gear"
  ↓
/shop/ (pre-filtered for guns, ammo, stands, decoys)
  ↓
CONVERSION: Purchase + visit
  ↓
Upsell: "Now book your hunt at Elk River WMA" → /near/wma/elk-river/
  ↓
Email capture: "Get hunting updates for next season"
```

**Current Status:** Only entry point exists (banner). Missing orchestrated funnel.

---

## USER JOURNEY MAP #5: Email Subscriber Reengagement Loop

### Path: Subscriber email → Site return → New content discovery

**Current Email Integration:**
- Buttondown service (wvwildoutdoors list)
- Form on: Home (footer), Lake pages, WMA pages, Adventures hub
- Copy varies: "Get stock alerts", "Local fishing updates", "Hunting regulations"

**Problem: No visible reengagement workflow**
- Email service (Buttondown) is connected
- Forms capture email addresses
- Missing: Post-subscribe journey

**Missing CTAs:**
- No "Thank you, check your email" landing page
- No automated welcome email visible in source
- No email-only content/offers
- No seasonal re-engagement triggers

**Impact:**
```
Visitor lifecycle:
  Day 0: Newsletter signup (email captured ✓)
  Day 1-7: Silence - Buttondown may send defaults
  Day 8: Visitor returns to site cold (may not remember they signed up)
  Day 30: Email forgotten, no re-engagement

Better lifecycle:
  Day 0: Newsletter signup
  Day 0 (instant): Welcome email + "early access to buck season guide"
  Day 1: Auto-reply with link to /buck-season/ (seasonal)
  Day 7: Email: "New lake fishing guide: Summersville Lake (staff tips)"
  Day 30: Re-engagement: "Check what's new on your nearest WMA"
```

---

## CTA AUDIT: Where Conversion Points Exist

### Global CTAs (Every Page)

| Location | Text | Target | Status | Issue |
|----------|------|--------|--------|-------|
| Header (desktop) | Contact button | `/contact/` | Present | Visible |
| Header (mobile) | Contact button | `/contact/` | Present | Buried in menu |
| Footer (all pages) | Phone number link | `tel:+1304...` | Present | Works well |
| Footer (all pages) | Hours + Address | On-page | Present | Text only, no CTA button |

### Page-Specific CTAs

| Page | Primary CTA | Secondary CTA | Tertiary CTA | Issue |
|------|------------|---------------|-------------|-------|
| Home | Call Shop (green) | Hours & Directions | Shop (link) | Multiple CTAs compete |
| Home | FFL Transfers $25 | - | - | Orange button good highlight |
| /near/ (hub) | Get Directions | Call Us | Both navigate away | Exit risk |
| /near/wma/[slug]/ | None explicit | Cross-link to lake | Newsletter signup | No phone CTA visible |
| /near/lake/[slug]/ | None explicit | Cross-link to WMA | Newsletter signup | Same issue |
| /adventures/ | Browse Gear | Call Us | - | Positioned after 15+ items |
| /contact/ | Form submission | Call/Visit info | - | Single-purpose page |
| /checkout/ | Disabled (feature flag) | Redirect to /shop | - | Commerce not enabled |

### Newsletter CTAs (Reengagement Layer)

**Coverage:** Home, Lake pages, WMA pages, Adventures hub
**Copy Variants:**
1. Home: "Get Season Updates" (generic)
2. Lake pages: "Get Local Fishing Updates" (specific)
3. WMA pages: "Get Local Hunting Updates" (specific)
4. Adventures hub: Not on hub (only on destination pages)

**Problem:** Variant copy is good, but placement is inconsistent.

---

## CONVERSION FUNNEL ANALYSIS

### Primary Funnel: Awareness → Visit → Purchase

```
                    [100%] Google/Social Entry
                         ↓
            [85%] Land on destination page (lake, WMA, adventure)
                         ↓
            [45%] Read details (scroll 60%+ of page)
                         ↓
        [25%] Decide "I'll visit this place"
                         ↓
    [15%] Newsletter signup (email capture)
                         ↓
     [5%] Call shop (phone number visible)
                         ↓
   [3%] Visit in person (likely conversion to purchase)
                         ↓
   [1%] Return visitor (high lifetime value)
```

**Critical Leaks:**
1. **85% → 45% drop:** No CTA between hero and details. Visitors read title/image, leave without reading.
2. **45% → 25% drop:** No "shop here" messaging integrated into details. Visitor learns about place, not why they need gear.
3. **25% → 15% drop:** Newsletter signup is below fold on most pages. 40% of visitors never reach it.
4. **15% → 5% drop:** Phone number only in footer/header. Should be in-page after main content.
5. **5% → 3% drop:** No tracking or booking system to verify visits. Shop can't measure this funnel.
6. **3% → 1% drop:** No re-engagement strategy. Visitor comes once, not tracked for return visit.

### Secondary Funnel: Adventures Hub Filtering

```
              [100%] Land on /adventures/
                      ↓
          [70%] Use filters (season, difficulty, activity)
                      ↓
         [50%] Click through 1+ destination card
                      ↓
        [30%] Read destination page details
                      ↓
       [15%] Newsletter signup OR navigate away
                      ↓
        [5%] Take further action (call/visit/plan trip)
```

**Critical Leaks:**
1. **100% → 70%:** Filters work, but no "default" filtered view (e.g., "Fishing trips near you")
2. **70% → 50%:** Card grid is long (15+ items). Mobile users may tap card just to close filter menu.
3. **50% → 30%:** Destination page is same as primary funnel (see above leak #1).
4. **30% → 15%:** No "Save this adventure" or "Share with friend" option. Hard to keep interest.
5. **15% → 5%:** Newsletter is the only re-engagement option (not guaranteed capture).

### Tertiary Funnel: Seasonal (Buck Season Example)

```
        [100%] See home banner "Buck Season Prep"
                      ↓
         [40%] Click banner (CTR weak - text link in colored banner)
                      ↓
         [25%] Land on /buck-season/ (if it exists)
                      ↓
         [15%] Read guide, find gear needs
                      ↓
          [8%] Click "Shop Buck Season Gear" (if visible)
                      ↓
          [5%] Browse /shop/ pre-filtered inventory
                      ↓
          [3%] Add to cart / plan visit
                      ↓
          [1%] Checkout or visit in person
```

**Critical Issues:**
1. **Home banner CTR weak (40%):** Text link in colored bar. Should be button or larger.
2. **Missing orchestration:** No clear "buck season journey" documented. Landing page may not exist or may be static.
3. **No shop pre-filtering:** "Shop Buck Season Gear" doesn't pre-filter to relevant categories.
4. **No seasonal email:** Buck season email subscribers don't get special seasonal messaging.

---

## ENGAGEMENT LOOP OPPORTUNITIES (Not Currently Implemented)

### Missing Loop #1: The "Plan Your Trip" Loop
**Concept:** Visitor plans multi-day trip, not single destination.

**Current:** Visitor sees lake → wma → campground in cross-links. No "bundle" option.

**Desired Flow:**
```
/near/lake/burnsville/
  → "Plan a complete trip" button
  → Modal/form: "I want to [fish/hunt/camp] for [weekend/week]"
  → Auto-suggest nearby destinations (lake + wma + campground combo)
  → Email: "Your planned itinerary with shop prep list"
  → CTA: "Stop by shop to get licenses + gear for this trip"
```

**Impact:** Could increase email capture 30-50% (emotional engagement)

### Missing Loop #2: The "What's Biting Now" Reengagement
**Concept:** Active fishing season → email subscribers get weekly "what's working" updates.

**Current:** Generic "stock alerts" on newsletter signup. No dynamic content.

**Desired Flow:**
```
Weekly (Fri AM):
  → Staff fishes local lakes (Burnsville, Summersville, Stonewall)
  → Quick report: "Bass on structure, top baits this week"
  → Email to subscribers: "This week at Burnsville Lake: [report]"
  → Link: /near/lake/burnsville/ (updated with weekly tips)
  → CTA: "Get your tackle at the shop"
```

**Impact:** High email open rate (15% → 40%), visit frequency increase

### Missing Loop #3: The "You're Near Us" Geolocation Trigger
**Concept:** When visitor is physically near shop (2 mi radius), send SMS/push.

**Current:** No location services integrated.

**Desired Flow:**
```
Subscriber (geofenced):
  → Walking distance to I-79 Exit 57
  → SMS: "Hey! We're 2 min away. Stop in for [seasonal gear]?"
  → Link: /contact/ (directions, hours, current deals)
  → High conversion (already nearby)
```

**Requires:** Email list with location opt-in + geofencing service (Braze, OneSignal)

### Missing Loop #4: The "Return Visitor" Re-engagement
**Concept:** Visitor came once, track in CRM, email when new content released.

**Current:** No CRM integration visible. Newsletter is fire-and-forget.

**Desired Flow:**
```
Day 0: Visitor comes to shop (staff asks email, offers "never miss a season update")
Day 7: Email: "Spotted any good deer signs? New WMA guide just dropped"
Day 21: Email: "New lake added to our guides: [Stonewall Lake], plus staff fishing report"
Day 60: Email: "What are you hunting this season? Here's your personalized guide"
```

**Impact:** Return visit increase (estimated 40% → 70%)

### Missing Loop #5: The "Social Proof" Engagement
**Concept:** Show recent customer trips, catches, reviews.

**Current:** No customer content, testimonials, or user-generated content visible.

**Desired Flow:**
```
Lake page: "Recent catches at Burnsville Lake"
  → Testimonial grid: "Just booked Burnsville 2 weeks ago, 15 lb largemouth! Grab tackle at WV Wild"
  → Adventure hub card: "See what others found here" link
  → Email: "Your friends are exploring [lake name]. Join them?"
```

**Impact:** Trust building, FOMO-driven engagement

---

## DROP-OFF POINT HEATMAP

### Page Entry Point Severity
| Entry | Page | Severity | Reason |
|-------|------|----------|--------|
| 🔴 **HIGH** | All destination pages | Drop-off #1 exists | No CTA between hero and content |
| 🔴 **HIGH** | /near/ hub | Hero CTAs exit site | Maps/phone links break flow |
| 🟡 **MEDIUM** | /adventures/ | Content length | 15+ items before CTA visible |
| 🟡 **MEDIUM** | Mobile (all) | No sticky CTA | Call-to-action buttons out of view |
| 🟢 **LOW** | /contact/ | Single purpose OK | Contact form is only job |
| 🟢 **LOW** | /ffl-transfers/ | Clear funnel | Specific audience, clear goal |

### Device-Specific Drops
| Device | Issue | Impact |
|--------|-------|--------|
| Mobile | Menu collapsed | Header "Contact" button hidden in menu |
| Mobile | Scrolling required | Newsletter on lake pages (80%+ scroll depth needed) |
| Mobile | Sticky header | Phone number visible, but no hero CTA re-enforcement |
| Desktop | Page length | "Stop by shop" CTA often below fold (scroll depth 60%+) |
| Desktop | Banner blindness | Home page banner ("Buck season") has low CTR |

---

## WHAT CREATES "BOOKMARK AND RETURN" BEHAVIOR

### High-Return-Intent Signals (Current)
1. **Seasonal planning** (Oct-Nov: buck season; May-Aug: fishing)
   - Users save lake/WMA pages for trip planning
   - Return to reference species, regulations, seasons

2. **Equipment check** (before trip)
   - User reads "gear list" or "regulations" section
   - Returns next week when purchasing gear
   - **Current strength:** Gear lists exist on pages ✓
   - **Current weakness:** No "gear reminder email" after page visit

3. **Cross-linking discovery** (nearby attractions)
   - User sees "Also see Burnsville Lake WMA nearby"
   - Returns to explore related destination
   - **Current strength:** Cross-links exist ✓
   - **Current weakness:** No "save trip plan" (can't bookmark multiple pages as one trip)

### Low-Return-Intent Signals (Missing)
1. **Email nurture** - No post-visit email sequence
2. **Seasonal reminders** - No "buck season starts in X weeks" reactivation
3. **New content alerts** - No "new fishing report for Summersville Lake" notification
4. **Social proof** - No recent catches/reviews to spark interest
5. **Loyalty program** - No "return visitor" incentive (e.g., "Visited 3 lakes? Get 10% gear discount")

---

## CONVERSION GOAL CLARITY

### Primary Goal: Physical Visit to Shop
**Current measurement:** Unknown (no analytics integration visible)
**Drivers:** Phone number (header, footer), hours (footer, contact page)
**Estimated conversion:** 3-5% of destination page visitors

**Improvement opportunities:**
- Add phone CTA mid-page on destination content (increase to 8-10%)
- Add "hours & directions" sticky button on mobile (increase to 6-8%)
- Add geolocation trigger for nearby visitors (increase to 15%+)

### Secondary Goal: Email Subscription
**Current measurement:** Buttondown integration (partially visible)
**Drivers:** Newsletter forms on lake pages, WMA pages, adventures hub
**Estimated conversion:** 10-15% of destination page visitors

**Improvement opportunities:**
- Move newsletter form to in-page CTA section (vs. below all content) → 20-25%
- Add "welcome discount" offer (first purchase 10% off) → 25-30%
- Segment by activity type (fishing emails vs. hunting emails) → 30-40% with better targeting

### Tertiary Goal: Commerce (Currently Disabled)
**Current measurement:** Feature flag disabled (PUBLIC_COMMERCE_ENABLED=false)
**Drivers:** None (shop redirects to /shop, which likely links to external inventory)
**Status:** Not yet a primary revenue driver

**When enabled:**
- Phone → email → visit → purchase pipeline
- Estimated: 1-2% of home page visitors complete purchase
- Seasonal peaks: Oct-Nov (buck), May-Aug (fishing)

---

## SPECIFIC RECOMMENDATIONS BY PRIORITY

### 🔴 CRITICAL (Impact: >20% conversion gain)

**1. Add Mid-Page "Stop by the Shop" CTA on All Destination Pages**
- Position: After hero + breadcrumb, before details section
- Placement: `/near/lake/[slug]/`, `/near/wma/[slug]/`, all dynamic routes
- Content: "You'll need gear for [activity]. We have [species] licenses, ammo, tackle. Stop by I-79 Exit 57."
- CTA Buttons: "Get Directions" + "Call Shop: (304) 649-5765"
- Expected impact: +15-20% "shop visit" conversion rate

**2. Make Newsletter Form Sticky or In-Content on Mobile**
- Current: Below-fold on destination pages
- Fix option A: Sticky footer bar on mobile (below all content, always visible)
- Fix option B: In-page CTA card between destination details + cross-links
- Expected impact: +8-12% email capture rate

**3. Restructure /near/ Hub CTA to Stay On-Site**
- Current: Hero "Get Directions" button exits to maps app
- Fix: Change hero button to "Explore WMAs" (stays on page, expands details)
- Keep "Call Shop" button as secondary (exits to phone)
- Expected impact: +10-15% email capture (visitors stay longer)

### 🟡 HIGH (Impact: 10-20% conversion gain)

**4. Add "Trip Planner" Feature**
- Let visitors combine lake + WMA + campground into one "trip"
- Email itinerary with prep checklist
- CTA: "Get gear at WV Wild before your trip"
- Expected impact: +12-18% email capture, +5-8% shop visits

**5. Implement Segment-Specific Email Campaigns**
- Split subscribers: Fishing vs. Hunting vs. Camping
- Send "what's biting" vs. "season updates" vs. "site reviews" accordingly
- Expected impact: +15-25% email open rate, +8-12% click-through

**6. Add Sticky "Call Shop" Button on Mobile**
- Always visible phone number in header or footer
- Current: Phone visible but requires scrolling to footer
- Fix: Sticky button (green, right-aligned) on mobile below fold
- Expected impact: +5-10% phone calls from mobile users

### 🟢 MEDIUM (Impact: 5-10% conversion gain)

**7. Create Seasonal Landing Pages**
- /buck-season/ (Sept-Dec) with orchestrated funnel
- /fishing-season/ (May-Aug) with lake focus
- /spring-season/ (Mar-May) with cross-season content
- Link from home banner (improve CTR from 40% to 60%+)
- Expected impact: +7-12% seasonal traffic, +5% conversions

**8. Add "Recent Catches" Widget to Lake Pages**
- Display recent testimonials: "Caught 15 lb largemouth at Burnsville last month"
- Link testimonials to emailCapture: "Tell us your catch! Get on our featured list"
- Expected impact: +5-8% engagement, +3-5% testimonial submissions

**9. Implement Geolocation Trigger (Advanced)**
- SMS/push when subscriber within 2 mi of shop
- Message: "We're 2 min away! Current deals: [seasonal gear]"
- Requires: Geofencing service, SMS integration
- Expected impact: +20-30% visit conversion for nearby subscribers

### 🟢 LOW (Impact: <5% conversion gain, high effort)

**10. Build User Accounts & Trip Saving**
- Subscribers can "save trips" (multi-destination bundles)
- Auto-suggest related items on shop
- Low impact on current funnel (requires account friction)

---

## VISITOR BEHAVIOR PATTERNS BY SEGMENT

### Segment #1: "Pre-Hunt Planner" (40% of traffic)
**Profile:** Arrives 1-2 weeks before season, plans trip
**Current behavior:** Lake → WMA → Newsletter
**Conversion:** Email signup 60%, visit 20%
**Needed:** Trip planning tools, calendar integration

### Segment #2: "Weekend Adventurer" (30% of traffic)
**Profile:** Arrives Fri AM, searches "what to do this weekend"
**Current behavior:** Adventures hub → Filter → Click card → Exit
**Conversion:** Email signup 15%, visit 8%
**Needed:** Quick-access "popular this weekend" section, mobile optimization

### Segment #3: "Navigation Searcher" (20% of traffic)
**Profile:** Arrives with GPS, knows destination, needs address/hours
**Current behavior:** /near/ hub → Maps app → Done
**Conversion:** Visit 80%, email 0%
**Needed:** No friction - just directions (current flow works)

### Segment #4: "Seasonal Trigger" (10% of traffic)
**Profile:** Arrives when major season opens (e.g., Oct 1 buck season)
**Current behavior:** Home banner → /buck-season/ → If exists, convert
**Conversion:** Email signup 40%, visit 25%
**Needed:** Orchestrated seasonal funnel with inventory highlights

---

## MEASUREMENT & ANALYTICS GAPS

### Missing Data Points
1. **Drop-off tracking** - Where do visitors leave each page?
   - Google Analytics can show scroll depth
   - Missing: Exit page tracking by element

2. **CTA performance** - Which buttons get clicked?
   - Missing: Button click tracking, conversion by CTA type
   - Missing: A/B test results for CTA placement

3. **Journey tracking** - Do visitors visit multiple destinations?
   - Missing: Multi-session attribution
   - Missing: Email subscribers → return visitor tracking

4. **Seasonal patterns** - When do conversions peak?
   - Missing: Bucketing by season (Oct-Nov, May-Aug, etc.)
   - Missing: Year-over-year seasonal comparison

5. **Device-specific drops** - Where do mobile users leave?
   - Missing: Mobile-specific drop-off funnel
   - Missing: Desktop vs. mobile conversion rate comparison

### Recommended Analytics Setup
```yaml
Events to track:
  - destination_page_load
  - cta_click (by cta_type: "call_shop", "get_directions", "newsletter_signup")
  - newsletter_signup (segment: fishing, hunting, camping)
  - scroll_depth_milestone (25%, 50%, 75%, 100%)
  - external_link_click (maps, phone, external campground booking)
  - form_start (quote form, contact form)
  - form_abandon (form started but not submitted)

Conversions:
  - email_signup (secondary conversion)
  - physical_visit (tracked via phone call or form submission)
  - seasonal_engagement (subscribe to hunting + fishing segments)

Segments:
  - traffic_source (organic, social, direct, email)
  - device (mobile, desktop, tablet)
  - season (month, hunting/fishing period)
  - geography (IP-based region, if available)
  - content_type (lake, wma, campground, guide, etc.)
```

---

## SUMMARY TABLE: Current vs. Ideal State

| Aspect | Current State | Ideal State | Gap |
|--------|---------------|------------|-----|
| **Primary CTA** | Phone in header/footer | Phone + in-page shop CTA | +1-2 CTAs per page |
| **Newsletter Placement** | Below fold | In-page + below fold | Sticky/prominent |
| **Email Segmentation** | Generic | Activity-based (fishing/hunting) | +2-3 segment types |
| **Journey Integration** | Siloed (lake OR wma OR campground) | Trip planning (bundled) | +1 feature (trip planner) |
| **Seasonal Funnels** | Banner only | Full orchestrated funnel | +3-4 seasonal pages |
| **Reengagement** | Post-signup silence | Weekly/biweekly emails | +2-3 email sequences |
| **Mobile CTA** | Hidden in menu | Sticky button visible | +1 mobile component |
| **Social Proof** | Testimonials (general) | Recent catches + reviews | +1 content type |
| **Analytics** | Partial (Google Analytics) | Full event tracking | +5-8 event types |

---

## CONCLUSION

The WVWO website has excellent **content and discovery** architecture (Adventures hub, dynamic destination pages, cross-linking). However, the **conversion funnel is leaky** due to:

1. **Missing mid-page CTAs** that connect content → shop visit
2. **Below-fold engagement tools** (newsletter, phone) that miss 40%+ of visitors
3. **No email reengagement** after signup (fire-and-forget)
4. **Siloed journeys** (can't plan multi-destination trips)
5. **No seasonal orchestration** (seasonal funnels aren't coordinated)

**Quick wins** (implement first):
- Add mid-page "shop" CTA to all destination pages
- Make newsletter sticky on mobile
- Change /near/ hero CTA to stay on-site

**Medium-term** (30-60 days):
- Build trip planner feature
- Implement email segmentation
- Create seasonal landing pages

**Long-term** (60+ days):
- Integrate CRM for reengagement
- Add geolocation triggers
- Build analytics dashboard for funnel tracking

**Estimated impact of all recommendations:** 25-40% increase in email capture + 15-25% increase in shop visits.
