# SPEC-71: Site-Wide Monitoring & Analytics Setup

**Version:** 1.0.0
**Created:** 2025-12-25
**Status:** Specification Draft
**Execute After:** SPEC-29-38 (Batch 4 - Launch Checkpoint with first 10 adventures)
**Dependencies:**
- Launch Checkpoint Complete (first 10 adventures live)
- Adventures Hub deployed to production
- Cloudflare Pages active

---

## Problem Statement

After launching the Adventures Hub and first 10 destinations (Feb 15-20, 2025), we need comprehensive monitoring and analytics to:
- Track user behavior and conversion funnels
- Measure Core Web Vitals and performance
- Identify high-traffic filter combinations for SEO strategy
- Make data-driven decisions for SPEC-39+ (next destination batches)
- Detect performance degradation early

**Current State:** Zero analytics tracking. Flying blind after launch.

**Desired State:** GA4 events tracking, Cloudflare Analytics baseline, performance monitoring dashboard established within 1 week of launch.

---

## Solution Overview

### Phase 1: Google Analytics 4 Setup (2 hours)

Configure GA4 custom events for user journey tracking:

**Events to Track:**
1. `adventure_view` - When user clicks adventure card
2. `filter_applied` - When any filter changes (dimension: which filter)
3. `empty_state_shown` - When no results match filters
4. `guide_banner_click` - When user clicks guide link from Adventures
5. `guide_cta_click` - When user clicks Adventures link from guide
6. `newsletter_signup` - Conversion goal (EmailCapture component)
7. `phone_call_click` - When user clicks tel: link
8. `get_directions` - When user clicks directions (future adventure detail pages)

**Conversion Funnel:**
- Homepage → Adventures: 50% target
- Filter interaction: 40% target
- Results → Detail: 30% target (future, when detail pages exist)
- Detail → Conversion (call/directions): 5% target

**Core Web Vitals:**
- Enable automatic tracking via gtag.js
- Monitor: TTFB, LCP, FID, CLS
- Alert thresholds defined (see below)

---

### Phase 2: Cloudflare Analytics Baseline (1 hour)

Access Cloudflare Analytics dashboard and capture baseline metrics:

**Metrics to Track:**
- Cache hit ratio (expect ~50% Week 1, >90% Week 2+)
- Edge response time (US-East region priority - closest to WV)
- Request volume by page
- Bandwidth usage
- Geographic distribution (where visitors come from)

**Alerts to Configure:**
- Cache hit ratio <70% → investigate caching config
- Response time >1s → investigate performance bottleneck

---

### Phase 3: Performance Monitoring Dashboard (1 hour)

Create centralized monitoring checklist document:

**Dashboard Links:**
- GA4: Core Web Vitals report URL
- GA4: User journey funnel report URL
- Cloudflare: Analytics dashboard URL
- Lighthouse CI: Automated reports (if configured)

**Alert Thresholds:**
- TTFB >600ms on 3G → investigate (Argo should optimize)
- LCP >2.5s → investigate (check image optimization)
- Filter response >200ms → consider Cloudflare Workers pre-rendering (SPEC-08 decision)
- Bounce rate >50% on /adventures/ → review UX
- Conversion rate <3% (call/directions clicks) → review CTAs

**Review Cadence:**
- **Week 1-2 post-launch:** Daily monitoring (catch critical issues fast)
- **Week 3-4:** Weekly review (establish baseline patterns)
- **Month 2+:** Monthly review (track long-term trends)

---

## Implementation Steps

### Step 1: Install GA4 Tracking Code (30 min)

**File:** `wv-wild-web/src/layouts/Layout.astro`

Add GA4 script to `<head>` (only in production):

```astro
---
const isProduction = import.meta.env.PROD;
const GA4_ID = import.meta.env.PUBLIC_GA4_ID; // Add to .env
---

<head>
  <!-- ... existing head content ... -->

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

**Environment Variable:**
Add to `.env`:
```
PUBLIC_GA4_ID=G-XXXXXXXXXX
```

---

### Step 2: Add Custom Event Tracking (1 hour)

**2A: Adventure Card Clicks**

**File:** `wv-wild-web/src/components/adventures/AdventureCard.tsx` (or similar)

```typescript
const handleCardClick = (adventureSlug: string, adventureTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'adventure_view', {
      adventure_slug: adventureSlug,
      adventure_title: adventureTitle,
      source_page: window.location.pathname
    });
  }
};
```

**2B: Filter Changes**

**File:** `wv-wild-web/src/lib/adventures/FilterContext.tsx`

```typescript
// Inside FilterProvider, after dispatch
useEffect(() => {
  if (typeof window !== 'undefined' && window.gtag) {
    const activeFilters = Object.entries(state)
      .filter(([key, value]) => {
        if (Array.isArray(value)) return value.length > 0;
        if (key === 'elevation') return value[0] !== 0 || value[1] !== 5000;
        return value !== null;
      })
      .map(([key]) => key);

    if (activeFilters.length > 0) {
      window.gtag('event', 'filter_applied', {
        filter_types: activeFilters.join(','),
        filter_count: activeFilters.length
      });
    }
  }
}, [state]);
```

**2C: Empty State Shown**

**File:** `wv-wild-web/src/components/adventures/EmptyState.tsx`

```typescript
useEffect(() => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'empty_state_shown', {
      active_filters: JSON.stringify(filters) // Current filter state
    });
  }
}, []);
```

**2D: Guide Banner Clicks**

**File:** `wv-wild-web/src/components/GuideBanner.tsx`

```typescript
const handleBannerClick = (destination: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'guide_banner_click', {
      source_page: window.location.pathname,
      destination: destination,
      filter_context: `${season.join(',')}_${activity.join(',')}`
    });
  }
};
```

**2E: Guide CTA Clicks**

**File:** `wv-wild-web/src/pages/guides/buck-season.astro` (and turkey-season)

```astro
<a
  href="/adventures?season=fall&activity=hunting"
  class="..."
  onclick="if(window.gtag){gtag('event','guide_cta_click',{source_page:'/guides/buck-season',destination:'/adventures'})}"
>
  Browse Fall Hunting Destinations
</a>
```

**2F: Phone Call Clicks**

**File:** Any component with `tel:` links

```astro
<a
  href="tel:+13046495765"
  class="..."
  onclick="if(window.gtag){gtag('event','phone_call_click',{source_page:window.location.pathname})}"
>
  Call Us: (304) 649-5765
</a>
```

---

### Step 3: TypeScript Declarations (15 min)

**File:** `wv-wild-web/src/types/gtag.d.ts` (new)

```typescript
// Extend window with gtag for TypeScript
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

### Step 4: Cloudflare Analytics Access (15 min)

1. Log into Cloudflare Dashboard
2. Navigate: Analytics & Logs → Web Analytics
3. Bookmark direct URLs:
   - Main dashboard
   - Performance metrics
   - Security overview
4. Capture Week 1 baseline:
   - Screenshot metrics (before/after launch comparison)
   - Note cache hit ratio
   - Note edge response time

---

### Step 5: Create Monitoring Checklist Doc (30 min)

**File:** `docs/monitoring/ANALYTICS-DASHBOARD.md` (new)

```markdown
# WVWO Analytics & Monitoring Dashboard

**Last Updated:** YYYY-MM-DD
**Review Cadence:** Weekly (Weeks 1-4), Monthly (after)

## Quick Links

- **GA4 Dashboard:** https://analytics.google.com/...
- **GA4 Core Web Vitals:** https://analytics.google.com/.../web-vitals
- **GA4 Conversion Funnel:** https://analytics.google.com/.../funnel
- **Cloudflare Analytics:** https://dash.cloudflare.com/.../analytics
- **Lighthouse CI:** (if configured)

## Alert Thresholds

| Metric | Threshold | Action |
|--------|-----------|--------|
| TTFB | >600ms | Investigate Argo routing, server response |
| LCP | >2.5s | Check image optimization, bundle size |
| FID | >100ms | Check React hydration, JS blocking |
| CLS | >0.1 | Check layout shifts, image aspect ratios |
| Filter Response | >200ms | Consider Cloudflare Workers (SPEC-08) |
| Bounce Rate | >50% | Review UX, empty states, content quality |
| Conversion Rate | <3% | Review CTAs, phone number visibility |
| Cache Hit Ratio | <70% | Review _headers config, cache rules |

## Weekly Review Checklist

### Week 1-2 (Post-Launch - Daily Monitoring)

- [ ] Check GA4 Real-Time for errors
- [ ] Verify events firing correctly (DebugView)
- [ ] Monitor Core Web Vitals (any degradation?)
- [ ] Check Cloudflare cache hit ratio
- [ ] Review top filter combinations (for SEO insights)

### Week 3-4 (Baseline Establishment - Weekly)

- [ ] Export GA4 data (4 weeks total)
- [ ] Calculate average filter response time
- [ ] Identify top 10 filter combinations (canonical URL candidates)
- [ ] Review conversion funnel drop-off points
- [ ] Document baseline metrics for comparison

### Month 2+ (Trend Monitoring - Monthly)

- [ ] Compare month-over-month metrics
- [ ] Identify seasonal patterns (turkey season vs buck season traffic)
- [ ] Review goal completions (newsletter signups, calls, directions)
- [ ] Adjust alert thresholds based on actual data

## Key Metrics Baseline (Week 1)

| Metric | Week 1 | Week 4 | Target |
|--------|--------|--------|--------|
| Adventures page views | TBD | TBD | 1000/week |
| Filter interaction rate | TBD | TBD | 40% |
| Avg session duration | TBD | TBD | 2 min |
| Bounce rate | TBD | TBD | <50% |
| Conversion rate | TBD | TBD | >3% |
| Cache hit ratio | TBD | TBD | >90% |
| LCP | TBD | TBD | <2.5s |
| TTFB | TBD | TBD | <600ms |

## SPEC-08 Decision Criteria

After 4 weeks of data collection, decide whether to implement Cloudflare Workers pre-rendering:

**Criteria:**
- **IF** filter_latency >200ms AND bounce_rate >40% → Plan Workers pre-rendering (SPEC-08)
- **ELSE** → Keep React client-side (expected outcome)

**Document decision in AgentDB:**
```bash
npx agentdb@latest reflexion store "wvwo-session" "SPEC-08-decision" 1.0 true "[decision + reasoning]"
```
```

---

## Testing & Validation

### GA4 Event Testing (DebugView)

1. Open GA4 → Configure → DebugView
2. Visit `/adventures` in browser
3. Apply filters → Verify `filter_applied` event fires
4. Click adventure card → Verify `adventure_view` event fires
5. Click guide banner → Verify `guide_banner_click` event fires
6. Click phone link → Verify `phone_call_click` event fires

**All events should appear in DebugView within 60 seconds.**

---

### Cloudflare Analytics Verification

1. Deploy to production
2. Wait 24 hours (Cloudflare needs time to collect data)
3. Access Cloudflare Analytics dashboard
4. Verify:
   - Traffic showing for `/adventures`
   - Cache hit ratio >0% (should improve to 70%+ by Week 2)
   - Edge response time <500ms (US-East region)

---

## Success Criteria

- [ ] GA4 tracking code installed (production only)
- [ ] 8 custom events firing correctly (verified in DebugView)
- [ ] Core Web Vitals tracking enabled
- [ ] Cloudflare Analytics accessible and showing data
- [ ] Monitoring checklist document created
- [ ] Baseline metrics captured (Week 1)
- [ ] Alert thresholds defined
- [ ] Review cadence scheduled

---

## Deliverables

1. **Updated Layout.astro** - GA4 tracking code
2. **Updated components** - Custom event tracking (6 files)
3. **TypeScript declarations** - gtag.d.ts
4. **Monitoring doc** - ANALYTICS-DASHBOARD.md
5. **Environment variable** - PUBLIC_GA4_ID in .env

---

## Timeline

**Execute:** Immediately after Launch Checkpoint (Feb 15-20)

| Task | Time |
|------|------|
| Install GA4 tracking code | 30 min |
| Add custom event tracking (6 components) | 1 hour |
| TypeScript declarations | 15 min |
| Cloudflare Analytics access | 15 min |
| Create monitoring doc | 30 min |
| Testing (DebugView) | 30 min |

**Total:** 3.5 hours

---

## Notes

### Privacy Considerations

- **Cookie consent:** GA4 uses analytics cookies. Add consent banner in future if needed (not required for basic analytics).
- **IP anonymization:** GA4 automatically anonymizes IPs (GDPR compliant).
- **Data retention:** Set to 14 months (GA4 default).

### Cost

- **GA4:** Free (unlimited events, standard features)
- **Cloudflare Analytics:** Free (included with Pages)
- **Lighthouse CI:** Free (if self-hosted)

**Total cost:** $0

---

## References

- GA4 Event Reference: https://developers.google.com/analytics/devguides/collection/ga4/events
- Cloudflare Analytics: https://developers.cloudflare.com/analytics/
- Core Web Vitals: https://web.dev/vitals/
- SPEC-07 Phase 9 (original tasks): `SPEC-07-adventures-hub-filtering/tasks.md`

---

**Grand love ya!** 🦌
