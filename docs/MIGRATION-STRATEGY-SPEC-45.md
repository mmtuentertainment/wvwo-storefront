# SPEC-45: RiverTemplate Migration Strategy

**Status**: Planning
**Priority**: High
**Estimated Total Effort**: 14-16 hours
**Target Completion**: 5 business days

---

## 🎯 Mission

Migrate 4 existing river pages to the new RiverTemplate system established in SPEC-13, ensuring:

- Consistent data structure across all rivers
- Enhanced SEO with Schema.org markup
- Improved maintainability through centralized templates
- Zero broken links or SEO regressions

---

## 📊 Current State Analysis

### Existing River Pages

| River | Current Location | Size | Status |
|-------|-----------------|------|--------|
| Elk River | `/near/elk-river.astro` | 17.9 KB | Live, manual composition |
| Holly River | `/near/holly-river.astro` + `/content/adventures/holly-river.md` | 20.1 KB + MD | Split content sources |
| Gauley River | **None** (mentioned in SPEC-29) | N/A | Needs creation |
| Cheat River | **None** (mentioned in SPEC-41) | N/A | Needs creation |

### New System Components (SPEC-13)

- ✅ `src/components/templates/RiverTemplate.astro` (main template)
- ✅ `src/components/schema/SchemaRiverTemplate.astro` (SEO schema)
- ✅ Type system: `RiverTemplateProps`, `Rapid`, `RiverOutfitter`, `RiverFishing`, etc.
- ✅ Reference implementation: Lake template system

---

## 🗺️ Migration Workflow (6-Step Process)

Each river follows this standardized workflow:

### Step 1: Content Audit

**Goal**: Extract all content from existing page(s)
**Deliverable**: Markdown audit document with raw data

**Tasks**:

- Identify all rapids, classifications, GPS coordinates
- Extract outfitter data (names, contacts, services)
- Document fishing information (species, regulations, seasons)
- Map access points (put-ins, take-outs, parking)
- Capture unique content (history, safety notes, local tips)

### Step 2: Data File Creation

**Goal**: Transform audit into TypeScript data file
**Deliverable**: `src/data/rivers/{river-name}.ts`

**Structure**:

```typescript
import type { RiverTemplateProps } from '@/types/adventure';

export const elkRiverData: RiverTemplateProps = {
  hero: { name, tagline, description, backgroundImage },
  overview: { difficulty, scenicRating, crowdLevel, bestSeasons },
  sections: [
    { name, difficulty, distance, duration, description, rapids }
  ],
  rapids: [
    {
      name,
      displayName,
      class: { base, high, low },
      description,
      hazards,
      gps: { latitude, longitude }
    }
  ],
  fishing: { species, regulations, seasons, hotspots },
  outfitters: [
    { name, website, phone, services, priceRange }
  ],
  accessPoints: [
    { name, type, gps, facilities, directions }
  ],
  flowInfo: { gauge, optimalRange, seasonalPatterns }
};
```

### Step 3: Schema Mapping

**Goal**: Ensure data conforms to interfaces
**Deliverable**: Validated TypeScript (no type errors)

**Validation Checklist**:

- [ ] All required fields populated
- [ ] GPS coordinates in decimal format
- [ ] Phone numbers in (XXX) XXX-XXXX format
- [ ] URLs valid and reachable
- [ ] Rapid classes follow standard (I-VI+)
- [ ] Enums match type definitions

### Step 4: Page Refactor

**Goal**: Replace manual composition with template
**Deliverable**: Simplified `.astro` page file

**Before** (manual):

```astro
---
// 400+ lines of custom layout
---
<Layout>
  <Hero />
  <RapidsSection />
  <FishingSection />
  <!-- Lots of manual composition -->
</Layout>
```

**After** (template):

```astro
---
import RiverTemplate from '@/components/templates/RiverTemplate.astro';
import { elkRiverData } from '@/data/rivers/elk';
---
<RiverTemplate {...elkRiverData} />
```

### Step 5: SEO Integration

**Goal**: Add Schema.org markup for search engines
**Deliverable**: Enhanced metadata

```astro
---
import SchemaRiverTemplate from '@/components/schema/SchemaRiverTemplate.astro';
import { elkRiverData } from '@/data/rivers/elk';
---
<RiverTemplate {...elkRiverData} />
<SchemaRiverTemplate data={elkRiverData} />
```

### Step 6: Validation

**Goal**: Confirm functionality and compliance
**Deliverable**: Test report

**Test Checklist**:

- [ ] Page renders without errors
- [ ] All sections display correctly
- [ ] Images load (hero, rapids, access points)
- [ ] Interactive map works (if present)
- [ ] Links functional (outfitters, gauges)
- [ ] Schema.org validates (Google Rich Results Test)
- [ ] WVWO aesthetic compliance
  - [ ] Fonts: Bitter, Permanent Marker, Noto Sans
  - [ ] Colors: brand-brown, sign-green, brand-cream
  - [ ] No forbidden styles (glassmorphism, rounded-lg)
  - [ ] Voice: Kim's authentic WV tone

---

## 📋 River-Specific Plans

### 1. Elk River (2.5 hours)

**Complexity**: Low-Medium
**Existing Data**: Good (17.9 KB page)

**Tasks**:

1. ⏱️ **30 min** - Audit elk-river.astro (rapids, fishing, outfitters)
2. ⏱️ **45 min** - Create `src/data/rivers/elk.ts`
3. ⏱️ **30 min** - Map rapids to new structure
4. ⏱️ **15 min** - Validate outfitter contacts
5. ⏱️ **15 min** - Refactor page to template
6. ⏱️ **15 min** - Add SEO schema + test

**Known Data**:

- Class I-II rapids (beginner-friendly)
- Trout fishing (catch-and-release)
- 2-3 outfitters in area
- Multiple access points (Webster Springs)

---

### 2. Holly River (2.5 hours)

**Complexity**: Medium (split content sources)
**Existing Data**: Good (20.1 KB page + MD frontmatter)

**Tasks**:

1. ⏱️ **45 min** - Audit holly-river.astro + holly-river.md
2. ⏱️ **45 min** - Create `src/data/rivers/holly.ts` (merge sources)
3. ⏱️ **30 min** - Map fishing data (species, regulations)
4. ⏱️ **15 min** - Map access points + facilities
5. ⏱️ **15 min** - Refactor page
6. ⏱️ **20 min** - Add SEO + test dual-source integration

**Known Data**:

- Class II-III rapids
- State park access
- Fishing: smallmouth bass, rock bass
- Camping/lodging nearby

---

### 3. Gauley River (4 hours) ⚠️ MOST COMPLEX

**Complexity**: High (no existing page, 50+ rapids)
**Existing Data**: Minimal (requires research)

**Tasks**:

1. ⏱️ **60 min** - Research Upper vs. Lower Gauley sections
2. ⏱️ **90 min** - Create `src/data/rivers/gauley.ts` (50+ rapids catalog)
3. ⏱️ **30 min** - Map seasonal flow (dam release schedules)
4. ⏱️ **30 min** - Map 8+ outfitters (ACE Adventure Resort, etc.)
5. ⏱️ **30 min** - Create new gauley-river.astro page
6. ⏱️ **30 min** - Add complete SEO (high-traffic page)

**Research Needed**:

- Upper Gauley: Class V (Pillow Rock, Lost Paddle, Insignificant)
- Lower Gauley: Class III-IV (Heaven's Gate, Mash)
- Dam release schedule (Summersville Dam)
- USGS gauge #03189600
- Gauley Season (Sept-Oct)
- Major outfitters: ACE, Adventures on the Gorge, Cantrell Ultimate

---

### 4. Cheat River (3 hours)

**Complexity**: Medium-High (no existing page)
**Existing Data**: Minimal (requires research)

**Tasks**:

1. ⏱️ **45 min** - Research Cheat Canyon sections
2. ⏱️ **60 min** - Create `src/data/rivers/cheat.ts`
3. ⏱️ **30 min** - Map fishing (trophy trout sections)
4. ⏱️ **15 min** - Map outfitters
5. ⏱️ **20 min** - Create new cheat-river.astro page
6. ⏱️ **10 min** - Add SEO schema

**Research Needed**:

- Cheat Canyon (Class III-IV)
- Upper Cheat (Class II)
- Big Nasty rapid (Class V)
- Trout fishing (Shavers Fork tributary)
- Outfitters: Cheat River Outfitters, USA Raft

---

## 🔀 URL Migration Strategy

### Current Structure

```
/near/elk-river/
/near/holly-river/
```

### New Structure

```
/rivers/elk-river/
/rivers/holly-river/
/rivers/gauley-river/
/rivers/cheat-river/
```

### Implementation

**1. Create Directory Structure**

```bash
mkdir -p src/pages/rivers
mv src/pages/near/elk-river.astro src/pages/rivers/elk-river.astro
mv src/pages/near/holly-river.astro src/pages/rivers/holly-river.astro
# Create new pages for Gauley & Cheat
```

**2. Set Up 301 Redirects** (`vercel.json`)

```json
{
  "redirects": [
    {
      "source": "/near/elk-river",
      "destination": "/rivers/elk-river",
      "permanent": true
    },
    {
      "source": "/near/holly-river",
      "destination": "/rivers/holly-river",
      "permanent": true
    }
  ]
}
```

**3. Update Internal Links**

```bash
# Find all references to old URLs
npx grep -r "/near/.*-river" src/
# Update navigation components
# Update sitemap
```

**4. Submit New Sitemap**

- Update `public/sitemap.xml` with `/rivers/` URLs
- Submit to Google Search Console
- Monitor 301 redirect performance

---

## 🛡️ Rollback Plan

If critical issues arise during migration:

### Immediate Rollback (< 5 minutes)

```bash
# 1. Restore original files from git
git checkout HEAD~1 src/pages/near/elk-river.astro
git checkout HEAD~1 src/pages/near/holly-river.astro

# 2. Remove redirects
git checkout HEAD~1 vercel.json

# 3. Deploy rollback
npm run build && vercel deploy --prod
```

### Partial Rollback (per river)

Keep successfully migrated rivers, rollback problematic ones:

```bash
# Example: Rollback only Gauley River
rm src/pages/rivers/gauley-river.astro
rm src/data/rivers/gauley.ts
# Update redirects to exclude Gauley
```

### Rollback Triggers

- Schema.org validation fails
- Page load time > 3 seconds
- User-reported broken links > 5
- Mobile rendering issues
- SEO ranking drops > 20%

---

## 📈 Success Metrics

### Technical

- [ ] All pages render in < 2 seconds
- [ ] Zero TypeScript errors
- [ ] 100% Schema.org validation pass rate
- [ ] 0 broken internal links
- [ ] 0 broken outfitter links

### SEO

- [ ] Google Rich Results Test passes for all pages
- [ ] Sitemap submitted and indexed within 48 hours
- [ ] 301 redirects return proper status codes
- [ ] No ranking drops for existing pages
- [ ] New pages (Gauley, Cheat) indexed within 1 week

### Design

- [ ] WVWO aesthetic compliance 100%
- [ ] No forbidden fonts (Inter, Poppins, etc.)
- [ ] No purple/pink/neon colors
- [ ] Only `rounded-sm` corners
- [ ] Kim's authentic voice in copy

### Performance

- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] Lighthouse SEO > 95
- [ ] First Contentful Paint < 1.5s

---

## 🗓️ Timeline

**Total Effort**: 14-16 hours
**Timeline**: 5 business days (assuming 3 hours/day)

| Day | Rivers | Tasks | Hours |
|-----|--------|-------|-------|
| **Day 1** | Elk | Audit → Data File → Schema | 2.5h |
| **Day 2** | Holly | Audit → Data File → Schema | 2.5h |
| **Day 3** | Gauley (Part 1) | Research → Rapids Catalog | 3h |
| **Day 4** | Gauley (Part 2) + Cheat (Part 1) | Outfitters → Page Creation → Schema + Research | 3h |
| **Day 5** | Cheat (Part 2) + URL Migration | Page Creation → Schema → Redirects → Testing | 3.5h |

**Buffer**: 2-3 hours for unexpected issues

---

## 📦 Deliverables

### Per River

- [ ] `src/data/rivers/{river-name}.ts` (data file)
- [ ] `src/pages/rivers/{river-name}.astro` (refactored page)
- [ ] Content audit document (in `/docs/audits/`)
- [ ] Validation test report

### Project-Wide

- [ ] Updated `vercel.json` with redirects
- [ ] Updated sitemap.xml
- [ ] Updated navigation links
- [ ] Migration completion report
- [ ] Rollback script (`scripts/rollback-rivers.sh`)

---

## 🚨 Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Data loss during migration** | Low | High | Git commits per river, rollback script |
| **Broken outfitter links** | Medium | Medium | Pre-migration link validation script |
| **SEO ranking drops** | Low | High | 301 redirects, sitemap submission, GSC monitoring |
| **Schema.org validation fails** | Low | Medium | Test with Google Rich Results before deploy |
| **WVWO aesthetic violations** | Medium | Low | Checklist review, peer review |
| **Mobile rendering issues** | Low | Medium | Responsive testing on 3+ devices |

---

## 🎯 Next Steps

1. **Get approval on this strategy** (stakeholder review)
2. **Create audit templates** (standardized data extraction)
3. **Set up validation scripts** (link checker, schema validator)
4. **Begin Elk River migration** (lowest risk, good test case)
5. **Iterate and improve process** (apply learnings to remaining rivers)

---

**Document Version**: 1.0
**Last Updated**: 2025-12-30
**Author**: Strategic Planning Agent
**Status**: Awaiting Approval
