# Phase 3 Area Page Specs

Future work items for expanding the "Hunt Near Us" section with detailed area pages.

## Priority Order

| Spec | Area | Drive Time | Why Priority |
|------|------|------------|--------------|
| 1 | [Sutton Lake](./sutton-lake.md) | 10 min | **Closest** - should have been first |
| 2 | [Elk River WMA](./elk-river-wma.md) | 15 min | 18,396 acres, excellent hunting |
| 3 | [Hunting Districts](./hunting-districts.md) | N/A | Educational, establishes expertise |
| 4 | [Summersville Lake](./summersville-lake.md) | 45 min | Famous, high search volume |
| 5 | [Stonewall Jackson](./stonewall-jackson.md) | 40 min | WMA + Lake combo |
| 6 | [Monongahela NF](./monongahela-nf.md) | 1 hour | Massive, but furthest |

## How to Use These Specs

Each spec is a standalone work item. To implement:

1. Pick a spec from the list above
2. Complete the **Research Tasks** section first
3. Build the page following the spec
4. Update `near/index.astro` to set `hasDetailPage: true`
5. Run build, verify schema, check mobile

## Current State

**Implemented:**
- [x] `/near/` index page (lists all areas)
- [x] `/near/burnsville-lake` (detail page)

**Spec'd but not built:**
- [ ] `/near/sutton-lake`
- [ ] `/near/elk-river`
- [ ] `/near/summersville-lake`
- [ ] `/near/stonewall-jackson`
- [ ] `/near/monongahela`
- [ ] `/guides/hunting-districts`

## Pattern to Follow

All area pages follow the pattern established in:
- [burnsville-lake.astro](../../../wv-wild-web/src/pages/near/burnsville-lake.astro)

Components used:
- Layout, Header, Footer (standard)
- EmailCapture (newsletter signup)
- SITE_CONTACT from siteContact.ts

## Voice Reminder

Every page must sound like Kim, not a marketing agency:
- ✅ "Sutton Lake's just up the road - about 10 minutes north on I-79."
- ❌ "Experience premier outdoor recreation at this convenient destination."
