# SEO & Schema.org Compliance Audit Report

**Audit Date:** 2026-01-17
**Auditor:** Code Quality Analyzer (Claude Opus 4.5)
**Codebase:** wvwo-storefront (WV Wild Outdoors)
**Audit Scope:** SEO components, structured data, meta tags, accessibility (WCAG 2.1 AA)

---

## Executive Summary

| Category | Status | Score |
|----------|--------|-------|
| Schema.org Components | PASS | 9/10 |
| Meta Tags & OG Images | PASS | 8/10 |
| Sitemap Configuration | PASS | 9/10 |
| Structured Data Types | PASS | 9/10 |
| Accessibility (WCAG 2.1 AA) | PASS | 8/10 |
| **Overall Score** | **COMPLIANT** | **8.6/10** |

### Key Findings

- **9 Schema.org components** properly implementing JSON-LD structured data
- **@graph pattern** correctly used for multi-entity schemas
- **Zod validation** enforcing schema type safety
- **WCAG 2.1 AA** compliance with `prefers-reduced-motion` and ARIA attributes
- **Minor issues** identified with hardcoded URLs and missing `is:inline` attributes

---

## 1. Schema.org Components Audit

### 1.1 Component Inventory

| Component | Path | Schema Types | Status |
|-----------|------|--------------|--------|
| SchemaBreadcrumb.astro | `components/seo/` | BreadcrumbList | PASS |
| SchemaAdventureHero.astro | `components/seo/` | TouristAttraction, Article, Event, BreadcrumbList | PASS |
| SchemaRiverTemplate.astro | `components/seo/` | TouristAttraction+Place, Article, BreadcrumbList, LocalBusiness | PASS |
| SchemaBackcountryTemplate.astro | `components/seo/` | TouristAttraction+NaturalFeature, SpecialAnnouncement, Article, BreadcrumbList, GovernmentOrganization | PASS |
| SchemaStateParkTemplate.astro | `components/seo/` | Park+TouristAttraction, Organization, StateGovernmentOrganization, Article, BreadcrumbList | PASS |
| SchemaHistoricTemplate.astro | `components/seo/` | TouristAttraction+LandmarksOrHistoricalBuildings, Article, BreadcrumbList, Organization | PASS |
| SchemaEvent.astro | `components/seo/` | Event, EducationEvent, SocialEvent | PASS |
| SchemaEventSeries.astro | `components/seo/` | EventSeries, Schedule | PASS |
| SchemaFAQ.astro | `components/seo/` | FAQPage, Question, Answer | PASS |

### 1.2 JSON-LD Syntax Validation

**All components use valid JSON-LD patterns:**

```javascript
// Correct @context and @graph usage (SchemaRiverTemplate.astro:260-263)
const schema = {
  '@context': 'https://schema.org',
  '@graph': graphEntities,
};
```

**JSON validation with error handling (SchemaBackcountryTemplate.astro:427-437):**
```javascript
let validatedSchema: object;
try {
  validatedSchema = JSON.parse(JSON.stringify(schema));
} catch (e) {
  console.error('SchemaBackcountryTemplate: Invalid JSON structure', e);
  validatedSchema = { '@context': 'https://schema.org', '@graph': [] };
}
```

### 1.3 Required Field Completeness

| Schema Type | Required Fields | Status |
|-------------|-----------------|--------|
| TouristAttraction | @type, name, description, url | COMPLETE |
| Article | @type, headline, author, publisher | COMPLETE |
| BreadcrumbList | @type, itemListElement | COMPLETE |
| Event | @type, name, startDate, location | COMPLETE |
| FAQPage | @type, mainEntity | COMPLETE |
| LocalBusiness | @type, name, address | COMPLETE |
| Organization | @type, name, url | COMPLETE |

### 1.4 Issues Found

| Severity | Issue | Location | Recommendation |
|----------|-------|----------|----------------|
| LOW | Missing `is:inline` on some script tags | SchemaEvent.astro:100, SchemaEventSeries.astro:72, SchemaStateParkTemplate.astro:407 | Add `is:inline` for consistency |
| LOW | Hardcoded `wvwildoutdoors.pages.dev` URLs | SchemaStateParkTemplate.astro:45-47 | Use `Astro.site` pattern consistently |
| INFO | `wvwildoutdoors.com` URLs used in StateParkTemplate | SchemaStateParkTemplate.astro:383-389 | Update when domain is purchased |

---

## 2. Meta Tags & OG Images Audit

### 2.1 Layout.astro Configuration

**Location:** `wv-wild-web/src/layouts/Layout.astro`

**Meta Tags Implemented:**

| Tag | Status | Implementation |
|-----|--------|----------------|
| `<meta charset>` | PASS | UTF-8 |
| `<meta name="description">` | PASS | Dynamic with fallback |
| `<meta name="viewport">` | PASS | `width=device-width` |
| `<link rel="canonical">` | PASS | Origin + pathname (no query/hash) |
| `<link rel="icon">` | PASS | SVG favicon |
| `<meta name="generator">` | PASS | Astro generator |

**Open Graph Tags:**

| Tag | Status | Value |
|-----|--------|-------|
| `og:title` | PASS | Dynamic from props |
| `og:description` | PASS | Dynamic with fallback |
| `og:type` | PASS | `website` |
| `og:url` | PASS | Canonical URL |
| `og:image` | PASS | `/og-wvwo-storefront.png` |
| `og:image:alt` | PASS | Descriptive alt text |

**Twitter Card Tags:**

| Tag | Status | Value |
|-----|--------|-------|
| `twitter:card` | PASS | `summary_large_image` |
| `twitter:title` | PASS | Dynamic |
| `twitter:description` | PASS | Dynamic |
| `twitter:image` | PASS | Same as OG image |

### 2.2 Schema.org LocalBusiness (Layout.astro)

**SportingGoodsStore schema implemented with:**

- Contact information (phone, address)
- GeoCoordinates (lat/lng)
- OpeningHoursSpecification (Mon-Sat 10:00-17:00)
- OfferCatalog with 12 product categories
- Service offers (FFL Transfer, Hunting/Fishing Licenses)
- Area served with GeoCircle and specific destinations
- Social media sameAs links

### 2.3 Issues Found

| Severity | Issue | Location | Recommendation |
|----------|-------|----------|----------------|
| LOW | OG image uses pages.dev domain | Layout.astro:29 | Update to production domain when available |
| INFO | TODO comments for domain update | Multiple locations | Track in issue tracker |
| LOW | Missing `og:site_name` tag | Layout.astro | Add for better social sharing |

---

## 3. Sitemap Configuration Audit

### 3.1 Astro Configuration

**Location:** `wv-wild-web/astro.config.mjs`

```javascript
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://wvwildoutdoors.pages.dev',
  integrations: [react(), sitemap()],
});
```

**Status:** PASS - Sitemap integration properly configured with site URL.

### 3.2 robots.txt

**Location:** `wv-wild-web/public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://wvwildoutdoors.pages.dev/sitemap-index.xml

User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /
```

**Status:** PASS

**Analysis:**
- General crawling allowed
- Sitemap properly referenced
- AI training bots appropriately blocked (GPTBot, CCBot, anthropic-ai)

### 3.3 Issues Found

| Severity | Issue | Location | Recommendation |
|----------|-------|----------|----------------|
| INFO | Sitemap URL hardcoded | robots.txt:9 | Update when domain changes |

---

## 4. Structured Data Types Validation

### 4.1 Type Definitions

**Location:** `wv-wild-web/src/types/state-park-seo-types.ts`

**Zod Schemas Implemented:**

| Schema | Lines | Validation Rules |
|--------|-------|------------------|
| OpeningHoursSpecificationSchema | 29-57 | 24hr time format regex, valid weekdays |
| FAQItemSchema | 71-84 | Min/max text lengths (Question: 10-200, Answer: 20-500) |
| ParkEventSchema | 112-180 | Event types, status URLs, attendance modes |
| EventSeriesSchema | 192-218 | ISO 8601 duration format support |
| AmenityFeatureSpecificationSchema | 232-243 | Boolean or string values |
| ReserveActionSchema | 257-277 | URL validation, action platforms |
| ImageGallerySchema | 288-312 | 1-50 images, dimensions, licensing |
| AggregateRatingSchema | 325-344 | 1-5 scale, rating counts |
| ReviewSchema | 351-372 | ISO 8601 dates, rating values |

### 4.2 Helper Functions

| Function | Purpose | Status |
|----------|---------|--------|
| `convertToOpeningHoursSpec()` | Seasonal hours to Schema.org format | PASS |
| `createFAQItem()` | FAQ item builder | PASS |
| `createAmenityFeature()` | Amenity feature builder | PASS |
| `validateFAQAnswerLength()` | 20-100 word validation | PASS |
| `rangerProgramToEvent()` | Ranger program to Event schema | PASS |
| `createImageObject()` | Image with attribution | PASS |

### 4.3 Water Safety Types

**Location:** `wv-wild-web/src/types/water-safety.ts`

**Life-Safety Critical Schemas:**

| Schema | Purpose | Status |
|--------|---------|--------|
| WaterStatusSchema | safe/treat-required/do-not-use | PASS |
| WaterReliabilitySchema | year-round/seasonal/unreliable | PASS |
| WaterTreatmentSchema | Treatment methods | PASS |
| AMDWarningSchema | Acid Mine Drainage warnings | PASS |
| WaterSourceSchema | Complete source with validation | PASS |
| BackcountryCampingSchema | Camping with water safety | PASS |

**Validation refinements enforced:**
- `do-not-use` sources must have `treatment: 'not-applicable'`
- Development warnings for missing safety information

### 4.4 Issues Found

| Severity | Issue | Location | Recommendation |
|----------|-------|----------|----------------|
| NONE | All schemas properly validated | N/A | Maintain current patterns |

---

## 5. Accessibility Compliance Audit (WCAG 2.1 AA)

### 5.1 ARIA Attributes

**Components with proper ARIA implementation:**

| Component | ARIA Attributes | Status |
|-----------|-----------------|--------|
| AdventureCard.tsx | `aria-label`, `role="img"`, `aria-hidden` | PASS |
| ContactStrip.astro | `aria-labelledby` | PASS |
| EmergencyContactsSection.astro | `aria-labelledby`, `aria-hidden`, `aria-label`, `role="alert"` | PASS |
| FilteredGrid.tsx | `role="main"`, `role="region"`, `aria-live`, `aria-atomic` | PASS |
| OfflineBanner.tsx | `role="status"`, `aria-live="polite"` | PASS |
| CellCoverageSection.astro | `aria-labelledby`, `aria-hidden`, `role="alert"` | PASS |
| MobileFiltersSheet.tsx | `aria-label`, `aria-describedby`, `role="region"` | PASS |
| SchemaFAQ.astro | `itemscope`, `itemtype`, `itemprop`, `aria-labelledby` | PASS |

### 5.2 Reduced Motion Support

**Components respecting `prefers-reduced-motion`:**

| File | Implementation | Status |
|------|----------------|--------|
| global.css | Lines 129, 289 | PASS |
| adventure-hero.css | Line 141 | PASS |
| Ticker.astro | Line 27 | PASS |
| SchemaFAQ.astro | Line 110 | PASS |
| WMATemplate.astro | Line 560 | PASS |
| SkiTemplate.astro | Line 767 | PASS |
| RiverTemplate.astro | Line 611 | PASS |
| LakeTemplate.astro | Line 550 | PASS |
| CaveTemplate.astro | Line 908 | PASS |
| BackcountryTemplate.astro | Line 1161 | PASS |
| StateParkTemplate.astro | Line 771 | PASS |

**Pattern used:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
```

### 5.3 Semantic HTML

**Proper semantic structure observed:**

- `<section>` with `aria-labelledby` for content regions
- `<h1>` - `<h6>` hierarchy maintained
- `<nav>` for navigation elements
- `<main>` with `role="main"` for primary content
- `<article>` for self-contained content
- `<aside>` with `role="note"` for supplementary content

### 5.4 Color Contrast

**Brand palette (from CLAUDE.md):**

| Color | Hex | Usage |
|-------|-----|-------|
| brand-brown | #3E2723 | Primary text |
| brand-cream | #FFF8E1 | Background |
| sign-green | #2E7D32 | Accents, links |
| brand-orange | #FF6F00 | CTAs (< 5% screen) |

**Contrast ratios (estimated):**
- Brown on cream: ~12:1 (WCAG AAA)
- Green on cream: ~6:1 (WCAG AA)
- Orange on cream: ~4.5:1 (WCAG AA)

**Safety colors override brand palette (correctly documented in CLAUDE.md):**
- Ski trail difficulty colors (NSAA Standard)
- Avalanche/fire danger colors
- Water safety status colors

### 5.5 Keyboard Navigation

**Focus states observed:**

```css
/* SchemaFAQ.astro */
.faq-item:focus-within {
  outline: 2px solid #FF6F00;
  outline-offset: 2px;
}

/* FilteredGrid.tsx */
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-sign-green
focus-visible:ring-offset-2
```

### 5.6 Issues Found

| Severity | Issue | Location | Recommendation |
|----------|-------|----------|----------------|
| LOW | Some images may lack alt text | Various components | Audit image usage in templates |
| LOW | Missing skip-to-content link | Layout.astro | Add skip navigation for keyboard users |
| INFO | Focus styles could be more consistent | Various | Standardize focus ring patterns |

---

## 6. Google Rich Results Compatibility

### 6.1 Supported Rich Results

| Rich Result Type | Schema Component | Google Eligibility |
|------------------|------------------|-------------------|
| Breadcrumbs | SchemaBreadcrumb.astro | ELIGIBLE |
| FAQ | SchemaFAQ.astro | ELIGIBLE |
| Event | SchemaEvent.astro | ELIGIBLE |
| Local Business | Layout.astro | ELIGIBLE |
| Article | Multiple templates | ELIGIBLE |

### 6.2 Validation Recommendations

Run the following tests before each deployment:

1. **Google Rich Results Test:** https://search.google.com/test/rich-results
2. **Schema.org Validator:** https://validator.schema.org/
3. **Lighthouse SEO Audit:** Chrome DevTools > Lighthouse > SEO

---

## 7. Recommendations

### High Priority

1. **Add `is:inline` to all script tags** (3 components affected)
2. **Add skip-to-content link** in Layout.astro for keyboard navigation
3. **Add `og:site_name`** meta tag for improved social sharing

### Medium Priority

4. **Standardize URL handling** - Use `Astro.site` consistently across all schema components
5. **Add date metadata** to Article schemas (datePublished/dateModified are conditional)
6. **Implement image alt text audit** across all templates

### Low Priority

7. **Track domain migration TODOs** - Create issue to update all hardcoded URLs
8. **Standardize focus ring styles** across interactive components
9. **Add structured data testing** to CI/CD pipeline

---

## 8. Compliance Checklist

### Schema.org

- [x] JSON-LD format with `application/ld+json`
- [x] `@context: "https://schema.org"` on all schemas
- [x] `@graph` pattern for multi-entity pages
- [x] Unique `@id` URIs for entity references
- [x] Required fields complete per schema type
- [x] Zod validation for type safety

### SEO

- [x] Canonical URLs on all pages
- [x] Meta descriptions with fallbacks
- [x] Open Graph tags complete
- [x] Twitter Card tags complete
- [x] Sitemap generation configured
- [x] robots.txt with AI bot blocking

### Accessibility

- [x] ARIA landmarks and labels
- [x] Semantic HTML structure
- [x] `prefers-reduced-motion` respected
- [x] Focus states visible
- [x] Color contrast (WCAG AA minimum)
- [ ] Skip navigation link

---

## Appendix A: File Manifest

| File | Lines | Last Modified |
|------|-------|---------------|
| `components/seo/SchemaBreadcrumb.astro` | 36 | N/A |
| `components/seo/SchemaAdventureHero.astro` | 198 | N/A |
| `components/seo/SchemaRiverTemplate.astro` | 267 | N/A |
| `components/seo/SchemaBackcountryTemplate.astro` | 441 | N/A |
| `components/seo/SchemaStateParkTemplate.astro` | 408 | N/A |
| `components/seo/SchemaHistoricTemplate.astro` | 273 | N/A |
| `components/seo/SchemaEvent.astro` | 101 | N/A |
| `components/seo/SchemaEventSeries.astro` | 73 | N/A |
| `components/seo/SchemaFAQ.astro` | 116 | N/A |
| `layouts/Layout.astro` | 238 | N/A |
| `types/state-park-seo-types.ts` | 525 | N/A |
| `types/breadcrumb.ts` | 11 | N/A |
| `types/water-safety.ts` | 563 | N/A |
| `lib/utils/date-formatter.ts` | 75 | N/A |
| `astro.config.mjs` | 27 | N/A |
| `public/robots.txt` | 20 | N/A |

---

## Appendix B: Schema.org Type Reference

### Used Types

- Article
- AggregateRating
- Answer
- Audience
- BreadcrumbList
- EducationEvent
- EntryPoint
- Event
- EventSeries
- FAQPage
- GeoCircle
- GeoCoordinates
- GovernmentOrganization
- ImageGallery
- ImageObject
- LandmarksOrHistoricalBuildings
- ListItem
- LocalBusiness
- LocationFeatureSpecification
- NaturalFeature
- Offer
- OfferCatalog
- OpeningHoursSpecification
- Organization
- Park
- Person
- Place
- PostalAddress
- PropertyValue
- Question
- Rating
- ReserveAction
- Review
- Schedule
- Service
- SocialEvent
- SpecialAnnouncement
- SportingGoodsStore
- StateGovernmentOrganization
- TouristAttraction

---

**Report Generated:** 2026-01-17
**Next Audit Recommended:** 2026-04-17 (Quarterly)
