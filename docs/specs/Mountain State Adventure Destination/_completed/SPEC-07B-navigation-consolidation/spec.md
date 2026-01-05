# Feature Specification: Navigation Consolidation (Hybrid Approach)

**Feature Branch**: `feature/spec-07b-navigation-consolidation`
**Created**: 2025-12-25
**Status**: Ready for Implementation
**Original Docs**: See PROMPT.md, spec.md, content-ops.md in this directory

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Adventures Hub Discoverability (Priority: P1)

A new visitor arrives at the WVWO website looking for hunting spots in West Virginia. Currently, they cannot find the Adventures Hub because there's no navigation link - they must manually type `/adventures` in the URL.

**Why this priority**: This is critical - the Adventures Hub exists with working filters but is completely hidden from users. Zero value if undiscoverable.

**Independent Test**: Can be fully tested by navigating the header menu and verifying Adventures link is visible and clickable, delivering immediate access to the filterable destinations hub.

**Acceptance Scenarios**:

1. **Given** user on homepage, **When** they view header navigation, **Then** they see "Adventures" link between "Guides" and "Hunt Near Us"
2. **Given** user clicks "Adventures" link, **When** page loads, **Then** they arrive at `/adventures` with working filters
3. **Given** user on mobile device, **When** they open navigation menu, **Then** Adventures link has 44x44px tap target and is clearly visible

---

### User Story 2 - Contextual Guide Discovery (Priority: P2)

A hunter filtering adventures by fall hunting season should discover the Buck Season Prep Guide to help them prepare. Currently, there's no connection between the Adventures Hub and seasonal prep guides.

**Why this priority**: Enhances user experience by connecting "where to go" (adventures) with "how to prep" (guides), but Adventures Hub is functional without it.

**Independent Test**: Filter adventures to fall hunting, verify buck season guide banner appears with working link to `/guides/buck-season`.

**Acceptance Scenarios**:

1. **Given** user filters `/adventures?season=fall&activity=hunting`, **When** results load, **Then** they see banner: "Preparing for buck season? Read our Buck Season Prep Guide →"
2. **Given** user filters `/adventures?season=spring&activity=hunting`, **When** results load, **Then** they see banner: "Getting ready for turkey season? Check our Turkey Season Guide →"
3. **Given** user filters `/adventures?season=summer&activity=fishing`, **When** results load, **Then** NO guide banner appears (no fishing guide exists yet)
4. **Given** user clicks guide banner link, **When** navigation occurs, **Then** they arrive at the relevant guide page

---

### User Story 3 - Destination Discovery from Guides (Priority: P2)

A returning hunter reading the Buck Season Prep Guide should have a clear path to discover nearby hunting destinations. Currently, guides are dead-ends with no onward journey.

**Why this priority**: Completes the bidirectional linking strategy (guides ↔ adventures), improving SEO and user flow, but guides have standalone value.

**Independent Test**: Visit `/guides/buck-season`, scroll to bottom, verify "Ready to Hunt? Browse Fall Hunting Destinations" CTA appears and links to filtered adventures.

**Acceptance Scenarios**:

1. **Given** user on `/guides/buck-season`, **When** they scroll to CTA section, **Then** they see "Ready to Hunt? Browse Fall Hunting Destinations" with sign-green background
2. **Given** user clicks CTA, **When** navigation occurs, **Then** they arrive at `/adventures?season=fall&activity=hunting` with filters pre-applied
3. **Given** user on `/guides/turkey-season`, **When** they scroll to CTA section, **Then** they see "Find Your Spot - Explore WV's Best Turkey Hunting Locations"
4. **Given** user clicks turkey CTA, **When** navigation occurs, **Then** they arrive at `/adventures?season=spring&activity=hunting`

---

### User Story 4 - Search Engine → Guide → Adventures Flow (Priority: P3)

A Google searcher finding WVWO via "west virginia turkey season 2025" lands on the turkey guide, reads prep info, then should have clear path to find local turkey hunting spots.

**Why this priority**: Captures organic search traffic and guides them through full journey, but requires P1-P3 to be in place first.

**Independent Test**: Simulate Google → `/guides/turkey-season` → verify CTA → click → verify filtered adventures load.

**Acceptance Scenarios**:

1. **Given** user arrives from search engine on `/guides/turkey-season`, **When** they read guide content, **Then** they see clear "Find Your Spot" CTA before footer
2. **Given** user clicks "Find Your Spot" CTA, **When** Adventures Hub loads, **Then** spring hunting filter is pre-applied showing relevant destinations
3. **Given** user browses filtered adventures, **When** they see spring hunting banner, **Then** it offers link back to turkey guide (bidirectional)

---

### Edge Cases

- **Mobile navigation overflow**: What happens when nav has 4 links (Shop, Guides, Adventures, Hunt Near Us) on narrow screens?
  - **Solution**: Already solved in existing Header.astro responsive design

- **Missing guide for filter combo**: What happens when user filters winter fishing (no winter fishing guide exists)?
  - **Solution**: GuideBanner component returns null (no banner shown)

- **Deep-linked filtered URLs**: What happens when user bookmarks `/adventures?season=fall&activity=hunting` and returns months later?
  - **Solution**: URL params preserved, banner appears correctly

- **After SPEC-28 migration**: What happens when "Hunt Near Us" removed from nav?
  - **Solution**: Graceful - just remove nav link, 301 redirects handle old URLs

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display "Adventures" link in header navigation between "Guides" and "Hunt Near Us"
- **FR-002**: Adventures link MUST navigate to `/adventures` page when clicked
- **FR-003**: Adventures link MUST maintain 44x44px tap target on mobile devices (WCAG 2.1 AA)
- **FR-004**: System MUST conditionally display guide banners on Adventures Hub when hunting filters active
- **FR-005**: Guide banner MUST appear when URL params include `season=fall&activity=hunting` (Buck Season Guide)
- **FR-006**: Guide banner MUST appear when URL params include `season=spring&activity=hunting` (Turkey Season Guide)
- **FR-007**: Guide banner MUST NOT appear for filter combinations without corresponding guides (e.g., summer fishing)
- **FR-008**: Buck Season guide page MUST include "Ready to Hunt? Browse Fall Hunting Destinations" CTA section
- **FR-009**: Turkey Season guide page MUST include "Find Your Spot" CTA section
- **FR-010**: Guide CTAs MUST link to Adventures Hub with appropriate filters pre-applied
- **FR-011**: Guides index page MUST include explanation distinguishing Guides (prep) vs Adventures (destinations)
- **FR-012**: All cross-links MUST use relative paths (no hardcoded domains)
- **FR-013**: All copy MUST use Kim's authentic voice (no corporate marketing speak)
- **FR-014**: All components MUST follow WVWO aesthetic (brand-brown, sign-green, rounded-sm, Bitter font)

### Key Entities *(include if feature involves data)*

- **Navigation Link**: Adventures link in Header.astro nav component
  - Label: "Adventures"
  - Href: `/adventures`
  - Position: Between Guides and Hunt Near Us (initially)

- **GuideBanner Component**: React component conditionally rendering guide links
  - Props: `season: string[]`, `activity: string[]`
  - Conditional logic: Fall+Hunting → Buck guide, Spring+Hunting → Turkey guide
  - Styling: WVWO aesthetic (brand-brown/10 bg, border-l-brand-orange)

- **Guide CTA Sections**: Astro HTML sections in guide pages
  - Background: sign-green with white text
  - Heading: Font-display, bold, 3xl (mobile) to 4xl (desktop)
  - CTA button: White bg, sign-green text, rounded-sm

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Adventures Hub page views increase by >50% after adding navigation link (baseline: manual URL typing only)
- **SC-002**: 100% of navigation links functional on desktop and mobile (tested manually pre-deployment)
- **SC-003**: Guide-to-Adventures click-through rate measurable via URL params (e.g., `/adventures?season=fall&activity=hunting` traffic sources)
- **SC-004**: Adventures-to-Guides click-through rate measurable via banner link clicks (requires GA4 event tracking - Phase 9)
- **SC-005**: Zero broken links introduced (tested via manual navigation all user flows)
- **SC-006**: Mobile navigation maintains accessibility (44x44px tap targets, tested on real devices)
- **SC-007**: Page load time impact <100ms (GuideBanner conditional render adds minimal JS)
- **SC-008**: All copy passes "Kim voice test" (no corporate buzzwords, authentic WV tone)
- **SC-009**: Bounce rate on guides decreases (users have clear next action vs dead-end)
- **SC-010**: Adventures Hub becomes top 3 most-visited pages (previously hidden, now discoverable)

## Technical Constraints

### WVWO Stack Compliance

- **Approved Technologies**: Astro 5.x components, React/shadcn for interactive islands, Tailwind CSS 4.x
- **Never Use**: Vue, Angular, Svelte, other JS frameworks (React is the only exception)
- **Design System**: WVWO aesthetic enforced (see CLAUDE.md Frontend Aesthetics section)
  - Colors: brand-brown (#3E2723), sign-green (#2E7D32), brand-cream (#FFF8E1), brand-orange (#FF6F00)
  - Typography: Bitter (display), Permanent Marker (hand), Noto Sans (body)
  - Corners: rounded-sm (NEVER rounded-md or rounded-lg)
  - Orange usage: <5% of screen (CTAs only)

### Performance

- **Bundle Size Impact**: <1KB for GuideBanner component
- **Page Load**: No noticeable delay (conditional render is lightweight)
- **Accessibility**: WCAG 2.1 AA compliant (color contrast, tap targets, keyboard navigation)

### Dependencies

- **Prerequisite**: SPEC-07 Complete ✅ (Adventures Hub with filtering exists)
- **Blocks**: SPEC-08-11 (Components need navigation in place for testing)
- **Future**: SPEC-21-28 (When /near/ migrates, remove "Hunt Near Us" from nav)

## Non-Functional Requirements

### SEO Impact

- **Positive**: Internal linking improved (guides ↔ adventures), topical relevance signals, reduced crawl depth
- **Preserved**: No URL changes (guides stay at `/guides/*`), no content removed, no redirects needed
- **Future**: 301 redirects for `/near/*` → `/adventures/*` handled in SPEC-28

### Rollback Strategy

- **Risk Level**: Very low (additive changes only, no deletions)
- **Revert Method**: Git revert commit OR comment out new sections
- **Testing**: Manual verification on preview deployment before merge

### Analytics (Phase 9)

- Optional event tracking for cross-link effectiveness
- Guide banner clicks: `gtag('event', 'guide_banner_click', {source_page, destination, filter_context})`
- Guide CTA clicks: `gtag('event', 'guide_cta_click', {source_page, destination})`

## Implementation Files

### Files to Modify

1. **`wv-wild-web/src/components/Header.astro`**
   - Add Adventures nav link
   - Position between Guides and Hunt Near Us
   - Verify mobile navigation updates

2. **`wv-wild-web/src/components/GuideBanner.tsx`** (NEW)
   - Create React component with conditional logic
   - Props: season, activity arrays
   - Return JSX or null based on filter combo

3. **`wv-wild-web/src/pages/adventures/index.astro`** (OR React island)
   - Import GuideBanner component
   - Pass active filters as props
   - Render above adventure grid

4. **`wv-wild-web/src/pages/guides/buck-season.astro`**
   - Add CTA section before EmailCapture/Footer
   - Link to `/adventures?season=fall&activity=hunting`

5. **`wv-wild-web/src/pages/guides/turkey-season.astro`**
   - Add CTA section before EmailCapture/Footer
   - Link to `/adventures?season=spring&activity=hunting`

6. **`wv-wild-web/src/pages/guides/index.astro`**
   - Add intro section explaining Guides vs Adventures
   - Link to Adventures hub

## Open Questions

**RESOLVED**:

1. ✅ Should Adventures be first or third in nav? → **Third** (logical flow: gear → prep → destinations)
2. ✅ Show guide banners on ALL filters or hunting-only? → **Hunting-only** (don't promote guides that don't exist)
3. ✅ Keep /near/ in nav until SPEC-28 complete? → **Yes** (gradual transition, don't break bookmarks)

**NO OPEN QUESTIONS** - Spec complete and ready for implementation.

## Timeline & Effort

**Total Effort**: 2-3 hours

| Task | Time |
|------|------|
| Update Header.astro | 15 min |
| Create GuideBanner.tsx | 30 min |
| Integrate GuideBanner in Adventures | 15 min |
| Add CTAs to buck-season.astro | 20 min |
| Add CTAs to turkey-season.astro | 20 min |
| Update guides/index.astro | 15 min |
| Testing (desktop + mobile) | 30 min |
| Screenshot verification | 15 min |

**Execute**: Immediately (before SPEC-08)

## References

- **Original Spec**: [spec.md](./spec.md) - Comprehensive problem/solution documentation
- **Technical Spec**: [spec.md](./spec.md) - Implementation checklist and code snippets
- **Content Ops**: [content-ops.md](./content-ops.md) - Step-by-step workflow
- **WVWO Aesthetics**: See CLAUDE.md section "WVWO Frontend Aesthetics"
- **Design System**: Tailwind CSS 4.x with WVWO custom classes

---

**Grand love ya!** 🦌
