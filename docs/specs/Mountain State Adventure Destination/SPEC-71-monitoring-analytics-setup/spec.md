# SPEC-71: Monitoring & Analytics Setup - Technical Specification

**Version:** 1.0.0
**Created:** 2025-12-25
**Status:** Specification Complete
**Execute After:** Launch Checkpoint (SPEC-29-38 complete, Feb 15-20, 2025)

---

## Background

Originally planned as "Phase 9" within SPEC-07, this work has been extracted as a standalone spec for better organization. Monitoring and analytics are **site-wide infrastructure** (not Adventures Hub-specific), and should be set up **after launch** when there's traffic to measure.

**Cross-Reference:** See SPEC-07 tasks.md and plan.md (Phase 9 references point here)

---

## Implementation Tasks

### Task 1: Install GA4 Tracking Code (30 min)

**File:** `wv-wild-web/src/layouts/Layout.astro`

```astro
---
const isProduction = import.meta.env.PROD;
const GA4_ID = import.meta.env.PUBLIC_GA4_ID;
---

<head>
  <!-- Existing head content -->

  {isProduction && GA4_ID && (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}></script>
      <script is:inline define:vars={{ GA4_ID }}>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA4_ID, {
          send_page_view: true,
          cookie_flags: 'SameSite=None;Secure'
        });
      </script>
    </>
  )}
</head>
```

**Environment variable (.env):**

```
PUBLIC_GA4_ID=G-XXXXXXXXXX
```

---

### Task 2: TypeScript Declarations (15 min)

**File:** `wv-wild-web/src/types/gtag.d.ts` (new)

```typescript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

export {};
```

---

### Task 3: Custom Event Tracking (1 hour)

Add event tracking to 6 components:

**3A: Adventure Card Clicks**

```typescript
// In AdventureCard.tsx or similar
const handleCardClick = (slug: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'adventure_view', {
      adventure_slug: slug,
      adventure_title: title
    });
  }
};
```

**3B: Filter Changes**

```typescript
// In FilterContext.tsx
useEffect(() => {
  if (typeof window !== 'undefined' && window.gtag) {
    const activeFilters = Object.keys(state).filter(/* has value */);
    if (activeFilters.length > 0) {
      window.gtag('event', 'filter_applied', {
        filter_types: activeFilters.join(','),
        filter_count: activeFilters.length
      });
    }
  }
}, [state]);
```

**3C: Empty State**

```typescript
// In EmptyState.tsx
useEffect(() => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'empty_state_shown', {
      active_filters: JSON.stringify(filters)
    });
  }
}, []);
```

**3D: Guide Banner Clicks**

```typescript
// In GuideBanner.tsx
const handleClick = (dest: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'guide_banner_click', {
      source_page: window.location.pathname,
      destination: dest,
      filter_context: `${season}_${activity}`
    });
  }
};
```

**3E: Guide CTA Clicks**

```astro
<!-- In guides/buck-season.astro -->
<a
  href="/adventures?season=fall&activity=hunting"
  onclick="if(window.gtag){gtag('event','guide_cta_click',{source_page:'/guides/buck-season'})}"
>
  Browse Fall Hunting Destinations
</a>
```

**3F: Phone Clicks**

```astro
<!-- In any tel: link -->
<a
  href="tel:+13046495765"
  onclick="if(window.gtag){gtag('event','phone_call_click',{source_page:window.location.pathname})}"
>
  Call Us
</a>
```

---

### Task 4: Cloudflare Analytics Access (15 min)

1. Log into Cloudflare Dashboard
2. Navigate: Analytics & Logs → Web Analytics
3. Bookmark URLs:
   - Main dashboard
   - Performance metrics
4. Capture Week 1 baseline (screenshot)

---

### Task 5: Create Monitoring Doc (30 min)

**File:** `docs/monitoring/ANALYTICS-DASHBOARD.md` (new)

Document:

- GA4 dashboard URLs (Core Web Vitals, Funnel)
- Cloudflare Analytics URL
- Alert thresholds (TTFB >600ms, LCP >2.5s, etc.)
- Review cadence (daily Week 1-2, weekly Week 3-4, monthly after)
- SPEC-08 decision criteria

---

### Task 6: Test GA4 Events (30 min)

1. Open GA4 → Configure → DebugView
2. Visit `/adventures` in browser
3. Apply filters → Verify `filter_applied` fires
4. Click adventure card → Verify `adventure_view` fires
5. Click guide banner → Verify `guide_banner_click` fires
6. Click phone link → Verify `phone_call_click` fires

**All events should appear within 60 seconds.**

---

## Success Criteria

- [ ] GA4 tracking code installed (production only, not dev)
- [ ] 8 custom events firing correctly (verified in DebugView)
- [ ] Core Web Vitals tracking enabled
- [ ] Cloudflare Analytics accessible and showing data
- [ ] Monitoring checklist document created (`docs/monitoring/ANALYTICS-DASHBOARD.md`)
- [ ] Baseline metrics captured (Week 1)
- [ ] Alert thresholds defined
- [ ] Review cadence scheduled

---

## Files Modified/Created

**Modified:**

1. `wv-wild-web/src/layouts/Layout.astro` - GA4 script
2. `wv-wild-web/src/components/adventures/AdventureCard.tsx` - adventure_view event
3. `wv-wild-web/src/lib/adventures/FilterContext.tsx` - filter_applied event
4. `wv-wild-web/src/components/adventures/EmptyState.tsx` - empty_state_shown event
5. `wv-wild-web/src/components/GuideBanner.tsx` - guide_banner_click event
6. `wv-wild-web/src/pages/guides/buck-season.astro` - guide_cta_click event
7. `wv-wild-web/src/pages/guides/turkey-season.astro` - guide_cta_click event

**Created:**

1. `wv-wild-web/src/types/gtag.d.ts` - TypeScript declarations
2. `docs/monitoring/ANALYTICS-DASHBOARD.md` - Monitoring checklist

**Environment:**

1. `.env` - Add PUBLIC_GA4_ID

---

## Testing Checklist

- [ ] GA4 script only loads in production (not dev)
- [ ] All 8 custom events fire correctly (DebugView)
- [ ] No console errors in browser
- [ ] TypeScript compiles with no errors
- [ ] Page load time impact <100ms (async script loading)
- [ ] Cloudflare Analytics showing traffic after 24 hours
- [ ] Monitoring doc accessible and complete

---

## Timeline

**Execute:** Within 1 week of launch (Feb 15-27, 2025)

**Total Effort:** 3.5 hours

---

## Cost

- **GA4:** Free (unlimited events, standard features)
- **Cloudflare Analytics:** Free (included with Pages)

**Total: $0**

---

## References

- **Original SPEC-07 Phase 9:** See SPEC-07 tasks.md (moved from here)
- **GA4 Event Guide:** <https://developers.google.com/analytics/devguides/collection/ga4/events>
- **Cloudflare Analytics:** <https://developers.cloudflare.com/analytics/>

---

**Grand love ya!** 🦌
