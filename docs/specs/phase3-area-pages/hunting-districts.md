# Spec: WV DNR Hunting Districts Overview Page

## Overview

**File to create:** `wv-wild-web/src/pages/guides/hunting-districts.astro`
**Priority:** Medium-High (educational content, regulatory info)
**Status:** Not Started

## Why This Page

User mentioned "the bigger picture: WV DNR Hunting Districts/Management Areas" - this is regulatory/zone information that affects ALL hunters. Different districts have different bag limits, season dates, and regulations. This page educates hunters and positions the shop as a knowledgeable resource.

## Research Required

This spec requires significant research before implementation:

1. **What are WV Hunting Districts?**
   - How does WV DNR divide the state for hunting regulations?
   - District boundaries
   - How do districts affect bag limits?
   - How do districts affect season dates?

2. **Where does Birch River fall?**
   - What district(s) is the shop in?
   - What districts are nearby WMAs in?

3. **What regulations vary by district?**
   - Deer bag limits
   - Turkey limits
   - Bear zones
   - Antler restrictions
   - Season date variations

## Content Sections (Tentative)

### Hero
- "Know Your Zone Before You Go"
- Explain why this matters

### What Are Hunting Districts?
- Plain-English explanation
- Why WV uses this system
- How it affects your hunt

### Our Area
- What district is the shop in?
- What districts are nearby WMAs in?
- Table showing: WMA → District → Key regulations

### District-Specific Regulations
- Deer regulations by district
- Turkey regulations by district
- Bear zones
- Antler restrictions where applicable

### How to Find Your Zone
- Link to WV DNR district map
- How to look up a specific location
- Mobile-friendly lookup tips

### CTA Sections
- Shop CTA: "Confused about regulations? Stop by and we'll help you figure it out"
- License CTA: "We're a DNR license agent - get your license and ask questions"
- Newsletter: Season updates and regulation changes

## Schema.org Markup

```json
{
  "@type": "Article",
  "headline": "West Virginia Hunting Districts Explained",
  "description": "Understanding WV DNR hunting districts and how they affect deer, turkey, and bear regulations.",
  "author": {
    "@type": "Organization",
    "name": "WV Wild Outdoors"
  },
  "datePublished": "TBD",
  "dateModified": "TBD"
}
```

## Research Tasks Before Building

1. [ ] Study WV DNR hunting districts system
2. [ ] Download/review district maps
3. [ ] Identify which district Birch River is in
4. [ ] Map nearby WMAs to their districts
5. [ ] Document key regulation differences
6. [ ] Find official DNR links for regulations
7. [ ] Understand antler point restrictions by zone
8. [ ] Research bear management zones

## Voice Guidelines

Follow Kim's authentic voice:
- "WV divides the state into hunting districts - each one has its own rules. Here's what you need to know."
- "We're in [District X], which means [specific regulation]. The WMAs nearby are in [District Y]."
- NOT: "Navigate the complex regulatory landscape with our comprehensive district guide."

## Dependencies

- New page type (educational/regulatory)
- Uses existing components
- May need to link from other guide pages
- Should link TO specific WMA pages

## Acceptance Criteria

- [ ] Research complete and accurate
- [ ] Page builds without errors
- [ ] Article schema validates
- [ ] Mobile responsive
- [ ] Voice passes authenticity check
- [ ] Links to official DNR sources
- [ ] Cross-linked with WMA detail pages

## Notes

This is the most research-intensive spec. It should NOT be built until the research phase is complete. Consider splitting into:
1. Research task (gather all district info)
2. Build task (create page with verified info)

The value here is becoming a LOCAL EXPERT resource - not just listing regulations, but explaining them in plain English and connecting them to the specific WMAs hunters will visit from our shop.
