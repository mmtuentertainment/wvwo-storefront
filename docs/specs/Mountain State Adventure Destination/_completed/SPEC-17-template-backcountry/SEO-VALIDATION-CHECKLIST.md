# SPEC-17 Backcountry SEO Validation Checklist

**Purpose:** Step-by-step validation for backcountry pages SEO and structured data
**Tasks:** T-250 to T-253
**Status:** Testing & Validation Guide

---

## T-250: Google Rich Results Test

**URL:** <https://search.google.com/test/rich-results>

### Steps

1. Build and deploy backcountry page (e.g., `/backcountry/dolly-sods-wilderness/`)
2. Enter full URL in Rich Results Test
3. Click "Test URL"
4. Wait for crawler to fetch page

### Expected Results

**✓ Valid Results:**

- TouristAttraction entity detected
- NaturalFeature type recognized
- BreadcrumbList validated (Home > Backcountry > {name})
- Article schema detected

**✓ AMD Warning (P0 Safety):**

- SpecialAnnouncement entity appears ONLY for pages with do-not-use water sources
- Category shows environmental hazard (Wikidata Q12047938)
- spatialCoverage maps contaminated water sources
- datePosted and expires fields present

**✗ Common Errors:**

- Missing required fields (name, url, @type)
- Invalid @id format
- Broken entity references
- Missing @context

### Screenshot Location

Save validation screenshots to: `docs/specs/SPEC-17/screenshots/rich-results-{page}.png`

---

## T-251: Schema.org Validator

**URL:** <https://validator.schema.org/>

### Steps

1. Visit backcountry page in browser
2. View page source (Ctrl+U)
3. Find `<script type="application/ld+json">` block
4. Copy entire JSON-LD content
5. Paste into Schema.org validator
6. Click "Validate"

### Expected Results

**✓ Valid Schema:**

- Zero errors
- Zero warnings (or only minor suggestions)
- All @type values recognized
- All @id references resolve

**✓ Entity Structure:**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "#organization" },
    { "@type": ["TouristAttraction", "NaturalFeature"], "@id": "#attraction" },
    { "@type": "BreadcrumbList", "@id": "#breadcrumb" },
    { "@type": "Article", "@id": "#article" },
    { "@type": "SpecialAnnouncement", "@id": "#amd-warning" } // Only if AMD
  ]
}
```

**✗ Common Issues:**

- Invalid property names (typos)
- Wrong value types (string vs number)
- Missing required properties
- Duplicate @id values

---

## T-252: Search Console Verification (P0)

**URL:** <https://search.google.com/search-console>

### Prerequisites

- Site must be verified in Search Console
- Page must be indexed by Google
- Allow 24-48 hours after deployment for indexing

### Steps

1. Navigate to Search Console for wvwildoutdoors.pages.dev
2. Go to "Enhancements" → "Unparsed Structured Data"
3. Search for backcountry page URL
4. Verify structured data entities

### P0 Validation: AMD SpecialAnnouncement

**Critical Check:**

- SpecialAnnouncement entity indexed for pages with AMD concerns
- Category = environmental hazard
- Spatial coverage includes contaminated sources
- Text contains clear "DO NOT USE" language

**Why P0:**
Users searching for backcountry water sources MUST see AMD warnings in search results.
SpecialAnnouncement can trigger rich result snippets with safety alerts.

### Expected Rich Snippet

```
Dolly Sods Wilderness Backcountry Guide
⚠️ Special Announcement: Water Safety Warning
Some water sources contain toxic Acid Mine Drainage...
```

**If missing:**

1. Check SpecialAnnouncement only renders when hasDoNotUseSources=true
2. Verify category Wikidata URL is correct
3. Confirm datePosted and expires are valid ISO 8601
4. Check spatialCoverage has @type and name

---

## T-253: Lighthouse SEO Audit

**Target:** SEO score >= 95

### Steps

1. Open backcountry page in Chrome
2. Open DevTools (F12) → Lighthouse tab
3. Select "SEO" category only
4. Click "Analyze page load"

### Required Passing Audits

**✓ Metadata (100%):**

- Document has valid title (50-60 chars)
- Document has meta description (150-160 chars)
- Page has valid canonical URL
- Links are crawlable (no javascript: hrefs)

**✓ Mobile (100%):**

- Viewport meta tag present
- Font sizes legible (>= 12px)
- Tap targets sized appropriately (48x48px minimum)

**✓ Content (100%):**

- Document has valid hreflang
- Structured data is valid
- Images have alt text

**✓ Crawl (100%):**

- robots.txt is valid
- Page is not blocked from indexing
- HTTP status is 200

### Common SEO Issues

**❌ Title Too Long:**

- Fix: Shorten to 50-60 chars max
- Example: "Dolly Sods Guide | WV Wild" (30 chars)

**❌ Description Missing:**

- Fix: Add meta description tag
- Length: 150-160 chars

**❌ Image Missing Alt Text:**

- Fix: Ensure all `<img>` tags have alt attribute
- Required for accessibility and SEO

**❌ Links Not Crawlable:**

- Fix: Use href with valid URLs, not javascript:
- Bad: `<a href="javascript:void(0)">`
- Good: `<a href="/backcountry/dolly-sods/">`

---

## Validation Workflow

### Quick Check (3 minutes)

1. Google Rich Results Test → Confirm entities detected
2. Schema.org Validator → Confirm zero errors
3. Visual inspection → Meta tags in `<head>`

### Full Validation (15 minutes)

1. Rich Results Test with screenshots
2. Schema.org Validator with JSON export
3. Search Console check (if indexed)
4. Lighthouse audit >= 95 score
5. Manual review of SpecialAnnouncement text

### Pre-PR Checklist

- [ ] Rich Results Test passes
- [ ] Schema.org validator: zero errors
- [ ] SpecialAnnouncement renders for AMD pages only
- [ ] Lighthouse SEO >= 95
- [ ] Meta description 150-160 chars
- [ ] Title 50-60 chars
- [ ] OG image absolute URL
- [ ] All images have alt text

---

## Troubleshooting

### SpecialAnnouncement Not Appearing

**Possible causes:**

1. hasDoNotUseSources() returns false - Check waterSources array
2. No water sources with status='do-not-use'
3. SpecialAnnouncement code not executed
4. JSON-LD syntax error preventing parse

**Debug steps:**

```javascript
// In SchemaBackcountryTemplate.astro
console.log('waterSources:', waterSources);
console.log('hasDoNotUse:', hasDoNotUseSources(waterSources));
```

### Structured Data Not Indexed

**Possible causes:**

1. Page not crawled yet (wait 24-48 hours)
2. robots.txt blocking crawlers
3. Invalid JSON-LD syntax
4. Page returns 404 or 500 error

**Debug steps:**

1. Check Search Console Coverage report
2. Use URL Inspection Tool
3. Request manual indexing
4. Verify JSON-LD validates

### Low Lighthouse Score

**Possible causes:**

1. Missing meta description
2. Title too long or too short
3. Images missing alt text
4. Links not crawlable
5. Mobile viewport not set

**Fix priority:**

1. Add missing meta tags (immediate fix)
2. Optimize images with alt text
3. Ensure proper heading hierarchy (H1 → H2 → H3)

---

## Resources

- [Google Search Central](https://developers.google.com/search/docs)
- [Schema.org Documentation](https://schema.org/docs/gs.html)
- [SpecialAnnouncement Guide](https://developers.google.com/search/docs/appearance/structured-data/special-announcements)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Lighthouse Scoring](https://developer.chrome.com/docs/lighthouse/seo/)
