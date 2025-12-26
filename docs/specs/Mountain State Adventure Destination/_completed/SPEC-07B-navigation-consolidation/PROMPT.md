# SPEC-07B: Navigation Consolidation (Hybrid Approach)

**Version:** 1.0.0
**Created:** 2025-12-25
**Status:** Specification Draft
**Dependencies:**
- SPEC-07 Complete ✅ (Adventures Hub filtering infrastructure)
- Precedes: SPEC-08-11 (Components need navigation in place)

---

## Problem Statement

Users have no way to access the Adventures Hub (`/adventures`) - the page exists but there's no navigation link. Current nav has:
- `/shop` - Shop
- `/guides` - Seasonal prep guides (buck-season, turkey-season, hunting-districts)
- `/near` - Hunt Near Us (7 location pages)

**Issue discovered:** User had to manually type `/adventures` URL to see the filtering hub.

---

## Solution: Hybrid Consolidation Approach

### Strategy

**KEEP educational prep content** (`/guides`) as standalone section
**MIGRATE geographic location content** (`/near`) to Adventures (planned in SPEC-21-28)
**ADD Adventures navigation link** to header
**CROSS-LINK** guides ↔ adventures for discoverability

### Rationale

1. **Guides are HOW TO PREP** (gear lists, season dates, regulatory info)
   - Buck Season Prep Guide
   - Turkey Season Guide
   - Hunting Districts Reference

2. **Adventures are WHERE TO GO** (geographic destinations, filterable)
   - Burnsville Lake
   - Gauley River
   - Seneca Rocks
   - etc.

3. **Different user intents:**
   - "What do I need for turkey season?" → Guides
   - "Where can I hunt turkey near me?" → Adventures (filter: spring, hunting)

---

## Implementation Plan

### Phase 1: Add Adventures to Header Navigation

**File:** `wv-wild-web/src/components/Header.astro`

**Current:**
```astro
<a href="/shop">Shop</a>
<a href="/guides">Guides</a>
<a href="/near">Hunt Near Us</a>
```

**Updated:**
```astro
<a href="/shop">Shop</a>
<a href="/guides">Guides</a>
<a href="/adventures">Adventures</a>
<a href="/near">Hunt Near Us</a>
```

**After SPEC-21-28 migrations complete:**
```astro
<a href="/shop">Shop</a>
<a href="/guides">Guides</a>
<a href="/adventures">Adventures</a>
<!-- /near removed, 301 redirects handle old links -->
```

---

### Phase 2: Cross-Linking Strategy

**2A: Adventures → Guides (Filter-Specific Banners)**

When users filter adventures, show relevant guide links:

**Example: `/adventures?season=fall&activity=hunting`**
```astro
<!-- Top of filtered results -->
<div class="bg-brand-brown/10 border-l-4 border-l-brand-orange p-4 mb-6">
  <p class="text-brand-brown font-body">
    Preparing for buck season?
    <a href="/guides/buck-season" class="text-sign-green underline font-bold">
      Read our Buck Season Prep Guide
    </a>
  </p>
</div>
```

**Example: `/adventures?season=spring&activity=hunting`**
```astro
<div class="bg-brand-brown/10 border-l-4 border-l-brand-orange p-4 mb-6">
  <p class="text-brand-brown font-body">
    Getting ready for turkey season?
    <a href="/guides/turkey-season" class="text-sign-green underline font-bold">
      Check our Turkey Season Guide
    </a>
  </p>
</div>
```

**2B: Guides → Adventures (CTA Sections)**

Add "Find Places to Hunt" CTAs to guide pages:

**In `/guides/buck-season.astro`:**
```astro
<!-- After gear/prep sections -->
<section class="bg-sign-green text-white py-12">
  <div class="container mx-auto px-4 text-center">
    <h2 class="font-display font-bold text-3xl mb-4">
      Ready to Hunt?
    </h2>
    <p class="text-xl mb-6">
      Find the best WV hunting spots near you.
    </p>
    <a
      href="/adventures?season=fall&activity=hunting"
      class="inline-block bg-white text-sign-green px-8 py-3 rounded-sm font-display font-bold hover:bg-brand-cream transition-colors"
    >
      Browse Fall Hunting Destinations
    </a>
  </div>
</section>
```

**In `/guides/turkey-season.astro`:**
```astro
<section class="bg-sign-green text-white py-12">
  <div class="container mx-auto px-4 text-center">
    <h2 class="font-display font-bold text-3xl mb-4">
      Find Your Spot
    </h2>
    <p class="text-xl mb-6">
      Explore WV's best turkey hunting locations.
    </p>
    <a
      href="/adventures?season=spring&activity=hunting"
      class="inline-block bg-white text-sign-green px-8 py-3 rounded-sm font-display font-bold hover:bg-brand-cream transition-colors"
    >
      Browse Spring Turkey Spots
    </a>
  </div>
</section>
```

**2C: Hunting Districts → Adventures Integration**

**Option A:** Keep `/guides/hunting-districts` as reference page, add map links to Adventures
**Option B:** Convert to Adventures filter facet (district becomes metadata)
**Recommendation:** Option A (hunting districts are regulatory info, not destinations)

---

### Phase 3: Homepage Update (Optional)

**Add Adventures to homepage hero or navigation:**

```astro
<!-- Homepage main CTAs -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <a href="/shop" class="...">Shop Gear</a>
  <a href="/guides" class="...">Seasonal Guides</a>
  <a href="/adventures" class="...">Find Adventures</a>
</div>
```

---

## User Flows

### Flow 1: New Visitor Looking for Hunting Spots

```
User arrives at homepage
  → Clicks "Adventures" in nav
  → Lands on /adventures
  → Filters: Season=Fall, Activity=Hunting
  → Sees banner: "Preparing for buck season? Read our Buck Season Prep Guide →"
  → Browses destinations (Burnsville Lake WMA, Elk River, etc.)
  → Clicks destination → Gets directions
```

### Flow 2: Returning Hunter Preparing for Season

```
User arrives at homepage
  → Clicks "Guides" in nav
  → Lands on /guides
  → Clicks "Buck Season Prep"
  → Reads gear list, season dates
  → Sees CTA: "Ready to Hunt? Browse Fall Hunting Destinations →"
  → Clicks → Filtered adventures (?season=fall&activity=hunting)
  → Finds spot → Gets directions
```

### Flow 3: Search Engine → Guide → Adventures

```
Google: "west virginia turkey season 2025"
  → Lands on /guides/turkey-season
  → Reads prep info
  → Scrolls to "Find Your Spot" CTA
  → Clicks → /adventures?season=spring&activity=hunting
  → Finds local turkey spot → Calls shop for gear
```

---

## SEO Considerations

### Preserve Guide URLs
- `/guides/buck-season` stays (no redirect)
- `/guides/turkey-season` stays (no redirect)
- `/guides/hunting-districts` stays (no redirect)

**Why:** These pages rank for seasonal prep queries. Don't break existing SEO value.

### Sunset Hunt Near Us URLs (SPEC-28)
- `/near/burnsville-lake` → 301 redirect to `/adventures/burnsville-lake`
- `/near/elk-river` → 301 redirect to `/adventures/elk-river`
- etc.

**Why:** Geographic content consolidates to Adventures. Location-specific SEO value transfers via 301s.

### New Internal Linking Opportunities
- Guides link to Adventures (topical relevance signal)
- Adventures link back to Guides (content depth signal)
- Bidirectional linking improves crawl efficiency

---

## Technical Implementation

### Files to Modify

1. **`wv-wild-web/src/components/Header.astro`**
   - Add Adventures nav link
   - (Later) Remove Hunt Near Us link when SPEC-28 complete

2. **`wv-wild-web/src/pages/adventures/index.astro`** (or React island)
   - Add filter-specific guide banners
   - Conditional rendering based on URL params

3. **`wv-wild-web/src/pages/guides/buck-season.astro`**
   - Add "Browse Fall Hunting Destinations" CTA section

4. **`wv-wild-web/src/pages/guides/turkey-season.astro`**
   - Add "Browse Spring Turkey Spots" CTA section

5. **`wv-wild-web/src/pages/guides/index.astro`**
   - Add overview of Guides vs Adventures
   - Link to Adventures hub

---

## Success Criteria

- [ ] Adventures link visible in header navigation
- [ ] Users can navigate to `/adventures` without typing URL
- [ ] Filtered adventures show relevant guide links (fall hunting → buck guide)
- [ ] Guide pages link to filtered adventures (turkey guide → spring hunting filter)
- [ ] Hunting districts page maintained as reference
- [ ] Cross-links use WVWO voice (not generic "Learn More")
- [ ] All links use relative paths (no hardcoded domains)
- [ ] Navigation accessible on mobile (44x44px tap targets)

---

## Timeline

**Effort:** 2-3 hours
- Header update: 15 min
- Filter-specific banners: 45 min
- Guide CTA sections: 1 hour
- Testing: 30 min

**When:** Before SPEC-08 (Components need navigation in place for testing)

---

## Future Considerations (Post-SPEC-28)

### After /near/ Migration Complete
- Remove "Hunt Near Us" from navigation
- All geographic content accessed via Adventures
- 301 redirects preserve old links

### Potential Footer Navigation
```
Quick Links:
- Shop
- Seasonal Guides
- Find Adventures
- About
- Contact
```

### Breadcrumbs
```
Adventures > Fall Hunting > Burnsville Lake WMA
Guides > Buck Season Prep
```

---

## Kim's Voice Guidelines

**For cross-link banners:**
- ✅ "Preparing for buck season? Read our Buck Season Prep Guide"
- ✅ "Getting ready for turkey season? Check our Turkey Season Guide"
- ❌ "Learn more about seasonal preparation"
- ❌ "Optimize your hunting experience"

**For CTAs:**
- ✅ "Ready to Hunt? Browse Fall Hunting Destinations"
- ✅ "Find Your Spot - Explore WV's Best Turkey Hunting Locations"
- ❌ "Discover premium hunting opportunities"
- ❌ "Unlock your next adventure"

---

## Questions for Implementation

1. **Should Adventures be first or third in nav?**
   - Option A: `Shop | Adventures | Guides` (adventure focus)
   - Option B: `Shop | Guides | Adventures` (prep before destinations)
   - Recommendation: Option B (logical flow: gear → prep → where to go)

2. **Show guide banners on ALL filters or hunting-only?**
   - Option A: Only hunting filters (buck/turkey guides exist)
   - Option B: All activities (add fishing/hiking prep guides later)
   - Recommendation: Option A (don't promote guides that don't exist)

3. **Keep /near/ in nav until SPEC-28 complete?**
   - Option A: Yes (gradual transition)
   - Option B: No (remove now, soft 404s until migrations)
   - Recommendation: Option A (don't break existing bookmarks)

---

## Deliverables

- [ ] Updated `Header.astro` with Adventures link
- [ ] Filter-specific guide banners in Adventures hub
- [ ] CTA sections in guide pages linking to Adventures
- [ ] Testing on desktop and mobile
- [ ] Screenshot verification (navigation visible, links work)
- [ ] Update MASTER-SEQUENCING-PLAN.md to include SPEC-07B

---

**Grand love ya!** 🦌
