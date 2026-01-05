# System Architecture - SPEC-12 WMA Template

**Architect**: System Architecture Agent
**Domain**: Overall system design, component relationships, data flow
**Date**: 2025-12-27

---

## System Overview

The WMA Template system follows a **modular component composition pattern** with static site generation (SSG), extending the existing Adventures content infrastructure with specialized WMA components.

### Architectural Principles

1. **Composition over Inheritance**: Small, focused components compose into complete pages
2. **Type Safety First**: Zod schemas + TypeScript ensure build-time validation
3. **Static-First Performance**: Zero runtime JavaScript, pure HTML/CSS delivery
4. **Backward Compatibility**: Zero breaking changes to existing content
5. **WVWO Aesthetic Enforcement**: Brand guidelines enforced at component level

---

## System Component Hierarchy

```
WMA Page Template (150 lines)
├── Layout Layer
│   ├── BaseLayout.astro (existing)
│   └── EmailCapture.astro (existing)
│
├── Content Collections Layer
│   └── adventures collection (extended with WMA fields)
│       ├── type: 'wma' (discriminator)
│       ├── Core fields (title, description, coordinates)
│       └── WMA fields (acreage, county, species, facilities...)
│
├── Section Components (New - SPEC-12)
│   ├── AdventureFeatureSection.astro (generic container)
│   ├── AdventureWhatToHunt.astro (wrapper → FeatureSection)
│   ├── AdventureWhatToFish.astro (wrapper → FeatureSection)
│   ├── AdventureCampingList.astro (complex facilities)
│   ├── AdventureAmenitiesGrid.astro (simple checkmarks)
│   └── AdventureCTA.astro (dual button CTA)
│
└── Reused Components (SPEC-10/11)
    ├── AdventureQuickStats.astro (stats grid)
    ├── AdventureGettingThere.astro (directions)
    ├── AdventureGearChecklist.astro (gear lists)
    └── AdventureRelatedShop.astro (category links)
```

---

## Data Flow Architecture

### Build-Time Flow

```
1. Content Authoring
   └── Kim edits `adventures/burnsville-lake.md`
       └── Frontmatter: type: 'wma', species: [...], facilities: [...]

2. Zod Validation (content.config.ts)
   └── Schema validates all fields
       ├── Required: title, description, heroImage, coordinates
       ├── Optional: acreage, county, species, fishingWaters, facilities...
       └── Type discriminator: type === 'wma'

3. Astro Build Process
   └── Static HTML generation
       ├── getCollection('adventures') filters by type: 'wma'
       ├── WMA page template composes 10 section components
       ├── Props passed from frontmatter → components
       └── Conditional rendering (hide empty sections)

4. Output
   └── Static HTML files
       ├── /adventures/burnsville-lake/index.html
       ├── Zero JavaScript (pure HTML/CSS)
       └── Optimized images (WebP, lazy loading)
```

### Runtime Flow (User Visit)

```
1. User Request
   └── Browser requests /adventures/burnsville-lake

2. Server Response
   └── Cloudflare serves static HTML
       ├── <2s load time on 3G (target)
       ├── Critical CSS inlined in <head>
       └── Below-fold images lazy-loaded

3. Client Rendering
   └── Pure HTML/CSS (zero JavaScript)
       ├── Semantic HTML structure
       ├── WCAG 2.1 AA compliant
       └── Print-optimized (@media print styles)
```

---

## Component Relationships Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     WMA Page Template                        │
│                    (~/pages/wma/[slug].astro)               │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
┌───────▼────────┐              ┌──────▼────────┐
│ Content Layer  │              │  Component     │
│                │              │  Layer         │
│ adventures     │──────────────▶                │
│ collection     │  Props flow  │ 10 Sections    │
│ (Zod schema)   │              │ Compose        │
└────────────────┘              └────┬───────────┘
                                     │
                     ┌───────────────┼───────────────┐
                     │               │               │
              ┌──────▼──────┐ ┌─────▼─────┐  ┌─────▼──────┐
              │   New        │ │  Reused   │  │  Generic   │
              │ Components   │ │Components │  │  Wrappers  │
              │ (SPEC-12)    │ │(SPEC-10/11)│ │            │
              └──────────────┘ └───────────┘  └────────────┘
```

---

## Integration Points

### With Existing Systems

1. **Content Collections** (SPEC-06)
   - Extends `adventures` schema with optional WMA fields
   - Type discriminator: `type: 'wma'` vs. `type: 'adventure'`
   - Backward compatible: existing adventures continue working

2. **Component Library** (SPEC-10/11)
   - Reuses 4 existing components (QuickStats, GettingThere, GearChecklist, RelatedShop)
   - Inherits WVWO aesthetic patterns (fonts, colors, transitions)
   - Maintains 94/100 PR quality bar

3. **Layout System**
   - Uses existing `BaseLayout.astro` for page chrome
   - Section background alternation: cream → white → cream → white
   - EmailCapture component at page footer

### Component Dependencies

```
AdventureWhatToHunt.astro
    └── wraps AdventureFeatureSection.astro
        └── uses STAT_ICON_PATHS (checkmark, info icons)

AdventureWhatToFish.astro
    └── wraps AdventureFeatureSection.astro
        └── uses STAT_ICON_PATHS

AdventureCampingList.astro
    └── independent (no internal dependencies)

AdventureAmenitiesGrid.astro
    └── uses STAT_ICON_PATHS (checkmark icon)

AdventureCTA.astro
    └── independent (button styling from Tailwind)
```

---

## State Management

**No client-side state** - All state comes from:

1. Content Collections frontmatter (static)
2. Component props (passed at build time)
3. Conditional rendering (based on data presence)

---

## Deployment Architecture

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   GitHub     │─────▶│   Netlify    │─────▶│  Cloudflare  │
│  Repository  │ Push │     Build    │Deploy│     CDN      │
└──────────────┘      └──────────────┘      └──────────────┘
                              │
                              ▼
                      Static HTML + Assets
                      - /adventures/burnsville-lake/
                      - /adventures/cranberry/
                      - /adventures/holly-river/
                      - ...
```

---

## Scalability Considerations

### Phase 1: 5 WMAs

- Manual content entry (Kim)
- ~750 lines of frontmatter (150 lines × 5)
- Build time: <30s

### Phase 2: 15 WMAs

- Content templates + defaults
- ~2,250 lines of frontmatter
- Build time: <60s

### Phase 3: 96 WMAs

- Bulk import tools (CSV → frontmatter)
- ~14,400 lines of frontmatter
- Build time: <5 minutes (acceptable)
- Consider parallel builds if needed

---

## Error Handling Strategy

### Build-Time Errors

1. **Zod Validation Failures**
   - Clear error messages: "adventures/burnsville-lake.md: acreage must be a number"
   - Build fails (prevents bad data in production)

2. **Missing Required Fields**
   - Schema enforces: title, description, heroImage, coordinates
   - Build fails with field name + file path

3. **Type Mismatches**
   - TypeScript catches props interface violations
   - Build-time error (not runtime)

### Runtime Graceful Degradation

1. **Empty Optional Arrays**
   - `fishingWaters.length === 0` → section hidden
   - No error, no placeholder

2. **Missing Optional Fields**
   - `mapUrl === undefined` → "Get Directions" button hidden
   - Graceful fallback

3. **Image Load Failures**
   - Browser default behavior (broken image icon)
   - Future: Add image validation to schema

---

## Performance Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| Page Load (3G) | <2s | Rural WV cellular |
| Lighthouse Perf | ≥95/100 | SEO ranking factor |
| Total Page Weight | <500KB | 3G bandwidth constraint |
| Time to Interactive | <3s | User engagement |
| Largest Contentful Paint | <2.5s | Core Web Vital |

---

## Security Considerations

1. **XSS Prevention**
   - Astro auto-escapes HTML in text interpolation
   - No user-generated content (Kim authors all)

2. **External Links**
   - All external links: `rel="noopener noreferrer"`
   - Prevents tab-nabbing attacks

3. **HTTPS Enforcement**
   - Cloudflare CDN forces HTTPS
   - No mixed content warnings

4. **Build-Time Validation**
   - Zod schema prevents malformed data
   - No SQL injection risk (static site)

---

## Monitoring & Observability

### Build Metrics

- Build time (track per WMA count)
- Zod validation errors (log + report)
- Image optimization savings

### Production Metrics

- Page load times (Cloudflare Analytics)
- Lighthouse scores (CI/CD checks)
- 404 errors (broken internal links)

### Content Metrics

- WMAs published (5 → 15 → 96)
- Kim's tips coverage (target ≥50%)
- External link validity (monthly check)

---

## Future Enhancements

### Phase 2 Candidates

1. **Interactive Maps** (progressive enhancement)
   - Leaflet.js for WMAs with 3+ access points
   - Optional JavaScript (static fallback)

2. **Mapbox Static API** (static maps)
   - Replace Google Maps placeholders
   - 50k requests/month (free tier)

3. **Print Optimization** (@media print)
   - PDF-friendly layouts
   - QR codes for GPS coordinates

### Phase 3 Candidates

1. **Content Import Tools**
   - CSV → frontmatter converter
   - WV DNR data scraping

2. **Multi-Language Support** (i18n)
   - Spanish translations
   - Astro i18n integration

3. **User-Generated Content**
   - Trip reports (requires auth + moderation)
   - Photo uploads (requires storage)

---

## Architecture Decision Records

### ADR-001: Extend adventures Collection (Not Create Separate wmas Collection)

- **Decision**: Extend existing `adventures` with optional WMA fields
- **Rationale**: Zero breaking changes, simpler mental model, existing cross-references work
- **Trade-offs**: Schema becomes larger, but optional fields mitigate

### ADR-002: Wrapper Pattern for What-To Components

- **Decision**: AdventureWhatToHunt/Fish wrap AdventureFeatureSection
- **Rationale**: DRY principle, single source of truth, 50 fewer lines
- **Trade-offs**: Slightly more complex to understand, but better maintainability

### ADR-003: Static-First Maps

- **Decision**: Static map images (Phase 1), optional Leaflet.js (Phase 2)
- **Rationale**: <1s load on 3G, works offline/print, 50-70% battery savings
- **Trade-offs**: Less interactive, but progressive enhancement path exists

### ADR-004: Type Discriminator Field

- **Decision**: Explicit `type: 'wma'` field in schema
- **Rationale**: Self-documenting, future-proof, excellent type safety
- **Trade-offs**: Requires one-time update to existing WMAs

### ADR-005: Inline Kim's Tips (Not Dedicated Section)

- **Decision**: `notes` field in species/fishingWaters, render in cards
- **Rationale**: More authentic scattered knowledge, feels personal
- **Trade-offs**: Less structured, but aligns with WVWO voice

---

**System Architect**: Architecture complete, ready for component-level design
**Next**: Component Architects 1-3 design individual components
**Dependencies**: Schema Architect defines data contracts
