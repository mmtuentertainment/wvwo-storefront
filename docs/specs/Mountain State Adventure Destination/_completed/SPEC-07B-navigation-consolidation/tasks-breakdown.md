# Tasks: Navigation Consolidation (Hybrid Approach)

**Plan Version:** 1.0.0
**Generated:** 2025-12-26
**Status:** Ready for Implementation
**Branch:** `feature/spec-07b-navigation-consolidation`

## Task Legend

- `[P]` **Parallelizable** - Can run concurrently with other [P] tasks
- `[S]` **Sequential** - Depends on previous tasks completing
- `[ ]` Not started
- `[X]` Completed
- `[~]` In progress

---

## Phase 1: Foundation - Header Navigation (~10 LOC, 15 min)

**Goal**: Make Adventures Hub discoverable (FR-001, FR-002, FR-003)

### Desktop Navigation
- [ ] `[S-1.1]` Read `Header.astro` to understand current nav structure (lines 27-38)
- [ ] `[S-1.2]` Add Adventures link between Guides and Hunt Near Us in desktop nav
  ```astro
  <a href="/adventures" class="text-brand-cream font-medium hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded px-1 transition-colors">Adventures</a>
  ```
- [ ] `[S-1.3]` Verify Adventures link uses same classes as other nav links

### Mobile Navigation
- [ ] `[S-1.4]` Locate mobile nav section in `Header.astro` (after line 50)
- [ ] `[S-1.5]` Add Adventures link to mobile menu (same markup as desktop)
- [ ] `[S-1.6]` Verify mobile menu structure intact

### Testing
- [ ] `[S-1.7]` Run `npm run dev` and test on localhost:4321
- [ ] `[S-1.8]` Click Adventures link → verify navigates to `/adventures`
- [ ] `[S-1.9]` Test mobile navigation (responsive mode or real device)
- [ ] `[S-1.10]` Measure tap target (must be ≥44x44px for WCAG 2.1 AA)

**Deliverable**: Adventures link visible and functional in header (desktop + mobile)

**Estimated LOC**: ~10 LOC

---

## Phase 2A: Core Implementation - GuideBanner Component (~50 LOC, 30 min)

**Goal**: Create conditional banner component (FR-004, FR-005, FR-006, FR-007)

### Component Creation
- [ ] `[P-2A.1]` Create file `wv-wild-web/src/components/GuideBanner.tsx`
- [ ] `[P-2A.2]` Define TypeScript interface:
  ```typescript
  interface GuideBannerProps {
    season?: string[];
    activity?: string[];
  }
  ```
- [ ] `[P-2A.3]` Implement conditional logic:
  - Fall + Hunting → Buck Season Guide banner
  - Spring + Hunting → Turkey Season Guide banner
  - All other combos → return null

### Styling (WVWO Compliance)
- [ ] `[P-2A.4]` Add WVWO design system classes:
  - Background: `bg-brand-brown/10`
  - Border: `border-l-4 border-l-brand-orange`
  - Padding: `p-4 mb-6`
  - Corners: `rounded-sm` (NOT rounded-md/lg)
- [ ] `[P-2A.5]` Style banner text:
  - Text color: `text-brand-brown`
  - Font: `font-body` (Noto Sans)
  - Link: `text-sign-green underline font-bold hover:text-sign-green/80`

### Content (Kim's Voice)
- [ ] `[P-2A.6]` Add buck season banner copy:
  - "Preparing for buck season? Read our Buck Season Prep Guide"
  - Link: `/guides/buck-season`
- [ ] `[P-2A.7]` Add turkey season banner copy:
  - "Getting ready for turkey season? Check our Turkey Season Guide"
  - Link: `/guides/turkey-season`
- [ ] `[P-2A.8]` Verify copy passes "Kim voice test" (no corporate buzzwords)

### TypeScript Verification
- [ ] `[P-2A.9]` Run TypeScript compiler (`npm run typecheck` if available)
- [ ] `[P-2A.10]` Fix any type errors

**Deliverable**: GuideBanner.tsx component complete and type-safe

**Estimated LOC**: ~50 LOC

**Note**: Phase 2A tasks are parallelizable - can work on styling while implementing logic.

---

## Phase 2B: Integration - Connect GuideBanner to Adventures Hub (~10 LOC, 15 min)

**Goal**: Wire up GuideBanner to Adventures Hub filter state

**Dependencies**: Phase 2A must be complete

### Read Current Structure
- [ ] `[S-2B.1]` Read `wv-wild-web/src/pages/adventures/index.astro`
- [ ] `[S-2B.2]` Identify how Adventures Hub is currently rendered (AdventuresHub.tsx with client:load)
- [ ] `[S-2B.3]` Determine best integration point (Astro page level vs inside AdventuresHub component)

### Implementation (Option A: Astro Page Level - Recommended)
- [ ] `[S-2B.4]` Import GuideBanner at top of adventures/index.astro
- [ ] `[S-2B.5]` Extract URL parameters in frontmatter:
  ```astro
  const url = new URL(Astro.request.url);
  const season = url.searchParams.getAll('season');
  const activity = url.searchParams.getAll('activity');
  ```
- [ ] `[S-2B.6]` Add GuideBanner above AdventuresHub with `client:visible` hydration:
  ```astro
  <GuideBanner season={season} activity={activity} client:visible />
  ```

### Testing
- [ ] `[S-2B.7]` Test `/adventures?season=fall&activity=hunting` → Buck banner appears
- [ ] `[S-2B.8]` Test `/adventures?season=spring&activity=hunting` → Turkey banner appears
- [ ] `[S-2B.9]` Test `/adventures?season=summer&activity=fishing` → NO banner
- [ ] `[S-2B.10]` Test banner links navigate to correct guide pages
- [ ] `[S-2B.11]` Verify banner only hydrates when in viewport (check Network tab)

**Deliverable**: GuideBanner integrated and showing contextual guide links

**Estimated LOC**: ~10 LOC

<!-- PR-CHECKPOINT: Foundation + Core Implementation (~70 LOC) -->

---

## Phase 3A: Guide CTAs - Buck Season Guide (~30 LOC, 20 min)

**Goal**: Add "Ready to Hunt?" CTA to buck season guide (FR-008, FR-010)

### Read Current Structure
- [ ] `[P-3A.1]` Read `wv-wild-web/src/pages/guides/buck-season.astro`
- [ ] `[P-3A.2]` Locate `<EmailCapture>` component position
- [ ] `[P-3A.3]` Identify where to insert CTA (before EmailCapture)

### Add CTA Section
- [ ] `[P-3A.4]` Insert CTA section markup (see implementation plan Phase 3A)
- [ ] `[P-3A.5]` Verify WVWO styling:
  - Background: `bg-sign-green text-white`
  - Heading: `font-display font-bold text-3xl md:text-4xl`
  - Button: `bg-white text-sign-green px-8 py-4 rounded-sm`
  - Link: `/adventures?season=fall&activity=hunting`

### Content Verification
- [ ] `[P-3A.6]` Verify copy matches spec:
  - Heading: "Ready to Hunt?"
  - Subtext: "Find the best WV hunting spots near you."
  - Button: "Browse Fall Hunting Destinations"
- [ ] `[P-3A.7]` Verify responsive typography (3xl on mobile, 4xl on desktop)

### Testing
- [ ] `[P-3A.8]` Visit `/guides/buck-season` on localhost
- [ ] `[P-3A.9]` Scroll to CTA section → verify it appears before footer
- [ ] `[P-3A.10]` Click CTA → verify navigates to `/adventures?season=fall&activity=hunting`
- [ ] `[P-3A.11]` Verify filters are pre-applied on Adventures Hub

**Deliverable**: Buck season guide has functional CTA linking to fall hunting adventures

**Estimated LOC**: ~30 LOC

---

## Phase 3B: Guide CTAs - Turkey Season Guide (~30 LOC, 20 min)

**Goal**: Add "Find Your Spot" CTA to turkey season guide (FR-009, FR-010)

**Note**: Phase 3A and 3B are parallelizable (different files, no conflicts)

### Read Current Structure
- [ ] `[P-3B.1]` Read `wv-wild-web/src/pages/guides/turkey-season.astro`
- [ ] `[P-3B.2]` Locate `<EmailCapture>` component position
- [ ] `[P-3B.3]` Identify where to insert CTA (before EmailCapture)

### Add CTA Section
- [ ] `[P-3B.4]` Insert CTA section markup (see implementation plan Phase 3B)
- [ ] `[P-3B.5]` Verify WVWO styling (same as Phase 3A)
- [ ] `[P-3B.6]` Update copy:
  - Heading: "Find Your Spot"
  - Subtext: "Explore WV's best turkey hunting locations."
  - Button: "Browse Spring Turkey Spots"
  - Link: `/adventures?season=spring&activity=hunting`

### Testing
- [ ] `[P-3B.7]` Visit `/guides/turkey-season` on localhost
- [ ] `[P-3B.8]` Scroll to CTA section → verify it appears
- [ ] `[P-3B.9]` Click CTA → verify navigates to `/adventures?season=spring&activity=hunting`
- [ ] `[P-3B.10]` Verify filters are pre-applied on Adventures Hub

**Deliverable**: Turkey season guide has functional CTA linking to spring hunting adventures

**Estimated LOC**: ~30 LOC

---

## Phase 4: Polish - Guides Index Explanation (~20 LOC, 15 min)

**Goal**: Help users understand Guides vs Adventures distinction (FR-011)

**Note**: Phase 4 parallelizable with Phase 3 (different file)

### Read Current Structure
- [ ] `[P-4.1]` Read `wv-wild-web/src/pages/guides/index.astro`
- [ ] `[P-4.2]` Identify hero section
- [ ] `[P-4.3]` Identify guide cards section
- [ ] `[P-4.4]` Determine insertion point (after hero, before cards)

### Add Intro Section
- [ ] `[P-4.5]` Insert intro section markup (see implementation plan Phase 4)
- [ ] `[P-4.6]` Verify WVWO styling:
  - Background: `bg-white`
  - Border: `border-l-4 border-l-sign-green`
  - Padding: `p-6`
  - Container: `max-w-3xl mx-auto`

### Content
- [ ] `[P-4.7]` Add heading: "Looking for Places to Go?"
- [ ] `[P-4.8]` Add explanation text with Adventures link
- [ ] `[P-4.9]` Verify link: `<a href="/adventures" class="text-sign-green underline font-bold">`

### Testing
- [ ] `[P-4.10]` Visit `/guides` on localhost
- [ ] `[P-4.11]` Verify intro section appears after hero
- [ ] `[P-4.12]` Click Adventures link → verify navigation
- [ ] `[P-4.13]` Verify responsive layout (mobile/tablet/desktop)

**Deliverable**: Guides index explains difference and links to Adventures Hub

**Estimated LOC**: ~20 LOC

<!-- PR-CHECKPOINT: All Implementation Complete (~150 LOC) -->

---

## Phase 5: Testing & Validation (30 min)

**Goal**: Comprehensive manual testing (SC-001 through SC-010)

**Dependencies**: All implementation phases (1-4) must be complete

### Desktop Testing
- [ ] `[S-5.1]` **Chrome/Edge**: Test all user flows (see checklist below)
- [ ] `[S-5.2]` **Firefox**: Verify cross-browser compatibility
- [ ] `[S-5.3]` **Safari** (if available): Verify styles render correctly

**Desktop Test Checklist**:
- [ ] Header shows Adventures link (between Guides and Hunt Near Us)
- [ ] Adventures link navigates to `/adventures`
- [ ] Fall hunting filter (`/adventures?season=fall&activity=hunting`) shows buck banner
- [ ] Spring hunting filter (`/adventures?season=spring&activity=hunting`) shows turkey banner
- [ ] Summer fishing filter (`/adventures?season=summer&activity=fishing`) shows NO banner
- [ ] Buck banner link navigates to `/guides/buck-season`
- [ ] Turkey banner link navigates to `/guides/turkey-season`
- [ ] Buck guide shows "Ready to Hunt?" CTA
- [ ] Buck CTA navigates to fall hunting adventures
- [ ] Turkey guide shows "Find Your Spot" CTA
- [ ] Turkey CTA navigates to spring hunting adventures
- [ ] Guides index shows explanation section
- [ ] Guides index Adventures link works

### Mobile Testing
- [ ] `[S-5.4]` **Responsive Mode**: Test 375px (iPhone SE), 768px (iPad), 414px (iPhone Pro Max)
- [ ] `[S-5.5]` **Real Device** (if available): Test on actual mobile device

**Mobile Test Checklist**:
- [ ] Adventures visible in mobile navigation
- [ ] Adventures tap target ≥44x44px (measure in dev tools)
- [ ] Mobile nav doesn't overflow with 4 links
- [ ] Guide banners readable on mobile (no text truncation)
- [ ] CTAs not obscured by footer or email capture
- [ ] All links work on touch (no hover-only interactions)

### Accessibility Testing (WCAG 2.1 AA)
- [ ] `[S-5.6]` Keyboard navigation: Tab through all links (Adventures, banners, CTAs)
- [ ] `[S-5.7]` Focus states visible (browser default underline)
- [ ] `[S-5.8]` Color contrast check:
  - brand-brown on brand-brown/10: ≥4.5:1 (AA)
  - sign-green on white: ≥4.5:1 (AA)
  - white on sign-green: ≥4.5:1 (AA)
- [ ] `[S-5.9]` Screen reader test (if available): Verify link announcements

### Performance Testing
- [ ] `[S-5.10]` Open Chrome DevTools Network tab
- [ ] `[S-5.11]` Visit `/adventures?season=fall&activity=hunting`
- [ ] `[S-5.12]` Verify GuideBanner.tsx only loads when scrolled into viewport (`client:visible`)
- [ ] `[S-5.13]` Verify bundle size <1KB for GuideBanner component

### Kim Voice Test
- [ ] `[S-5.14]` Read all copy aloud:
  - Adventures nav link: "Adventures" ✅
  - Buck banner: "Preparing for buck season? Read our Buck Season Prep Guide" ✅
  - Turkey banner: "Getting ready for turkey season? Check our Turkey Season Guide" ✅
  - Buck CTA: "Ready to Hunt? Browse Fall Hunting Destinations" ✅
  - Turkey CTA: "Find Your Spot - Explore WV's Best Turkey Hunting Locations" ✅
  - Guides intro: Natural, not corporate ✅
- [ ] `[S-5.15]` Verify NO corporate buzzwords ("optimize", "unlock", "revolutionize")

**Deliverable**: All acceptance criteria verified, zero broken links

---

## Phase 6: Documentation & PR (30 min)

**Goal**: Document implementation and create pull request

**Dependencies**: Phase 5 (testing) must be complete

### Screenshots
- [ ] `[S-6.1]` Create screenshots directory: `docs/specs/.../screenshots/`
- [ ] `[S-6.2]` Screenshot: Desktop header with Adventures link
- [ ] `[S-6.3]` Screenshot: Mobile nav with Adventures link
- [ ] `[S-6.4]` Screenshot: Fall hunting filter with buck season banner
- [ ] `[S-6.5]` Screenshot: Spring hunting filter with turkey season banner
- [ ] `[S-6.6]` Screenshot: Buck season guide CTA section
- [ ] `[S-6.7]` Screenshot: Turkey season guide CTA section
- [ ] `[S-6.8]` Screenshot: Guides index explanation section
- [ ] `[S-6.9]` Optimize images (<500KB each, use PNG or WebP)

### Git Workflow
- [ ] `[S-6.10]` Run `git status` to verify modified files
- [ ] `[S-6.11]` Stage all changes: `git add .`
- [ ] `[S-6.12]` Verify staged files are correct (no unintended changes)
- [ ] `[S-6.13]` Write conventional commit message:
  ```
  feat(SPEC-07B): add Adventures navigation and cross-linking

  - Add Adventures link to header navigation (desktop + mobile)
  - Create GuideBanner component for filter-specific guide links
  - Add CTAs to buck-season and turkey-season guides
  - Update guides index with explanation of Guides vs Adventures
  - All cross-links use WVWO voice (no corporate speak)
  - Mobile-friendly: 44x44px tap targets maintained
  - WCAG 2.1 AA compliant

  Closes: SPEC-07B
  ```
- [ ] `[S-6.14]` Commit changes: `git commit -m "..."`

### Pull Request
- [ ] `[S-6.15]` Push to origin: `git push -u origin feature/spec-07b-navigation-consolidation`
- [ ] `[S-6.16]` Create PR via GitHub CLI:
  ```bash
  gh pr create --title "feat(SPEC-07B): Navigation Consolidation" --body "See PR description template"
  ```
- [ ] `[S-6.17]` Add PR description (see PR template below)
- [ ] `[S-6.18]` Attach screenshots to PR
- [ ] `[S-6.19]` Link PR to SPEC-07B issue (if exists)
- [ ] `[S-6.20]` Request review (if applicable) or self-merge

### PR Description Template
```markdown
## Summary
Adds Adventures navigation link and cross-linking between Guides (prep content) and Adventures (destinations).

## Changes
- **Header**: Added Adventures link (between Guides and Hunt Near Us)
- **GuideBanner**: Conditional component shows relevant guides on filtered adventures
- **Buck Season Guide**: Added "Browse Fall Hunting Destinations" CTA
- **Turkey Season Guide**: Added "Browse Spring Turkey Spots" CTA
- **Guides Index**: Added explanation of Guides vs Adventures

## Testing
- ✅ Desktop navigation works (Chrome, Firefox, Safari)
- ✅ Mobile navigation works (44x44px tap targets verified)
- ✅ Fall hunting filter shows buck season banner
- ✅ Spring hunting filter shows turkey season banner
- ✅ Guide CTAs navigate to correctly filtered Adventures
- ✅ All links use relative paths
- ✅ WVWO voice maintained (no corporate speak)
- ✅ WCAG 2.1 AA compliant (color contrast, keyboard nav)

## Screenshots
[Attach 8 screenshots here]

## Performance Impact
- Bundle size: <1KB (GuideBanner component)
- Page load: <100ms impact
- Hydration: `client:visible` (only loads when in viewport)

🦌 Grand love ya!
```

**Deliverable**: PR created and ready for merge

---

## PR Summary

| PR | Scope | Est. LOC | Phase | Tasks |
|----|-------|----------|-------|-------|
| **1** | **Navigation Consolidation** | **~150** | **1-6** | **All 73 tasks** |

**Total Estimated LOC**: ~150 LOC
**Recommended PRs**: 1 (well under 300 LOC threshold)

**Rationale for Single PR**:
- Feature is cohesive (navigation + cross-linking)
- Total LOC well under 300 (warning threshold)
- All phases deliver incremental value
- Easy to review as single logical change
- Low risk (all additive, easy rollback)

---

## Dependencies Graph

```
Phase 1: Header Navigation (S)
    │
    ├──> Phase 2A: GuideBanner Component (P)
    │         │
    │         └──> Phase 2B: Integration (S)
    │
    ├──> Phase 3A: Buck CTA (P) ────┐
    │                                │
    ├──> Phase 3B: Turkey CTA (P) ──┼──> Phase 5: Testing (S)
    │                                │         │
    └──> Phase 4: Guides Index (P) ─┘         └──> Phase 6: PR (S)
```

**Key Dependencies**:
- Phase 1 must complete before any other phases (navigation link needed)
- Phase 2B depends on Phase 2A (component must exist before integration)
- Phases 3A, 3B, and 4 are fully parallelizable (different files)
- Phase 5 depends on all implementation phases (1-4) completing
- Phase 6 depends on Phase 5 (can't PR without testing)

**Parallelization Opportunities**:
- **After Phase 1**: Can work on Phases 2A, 3A, 3B, and 4 simultaneously
- **After Phase 2A**: Can work on Phase 2B while continuing 3A/3B/4
- **Before Phase 5**: Complete all implementation in parallel

---

## Task Execution Strategy

### Recommended Approach (Maximize Parallelism)

**Day 1 (2-3 hours)**:
1. **Sequential**: Complete Phase 1 (15 min) - Header navigation
2. **Parallel Session 1** (60 min):
   - Start Phase 2A (GuideBanner component)
   - Start Phase 3A (Buck CTA)
   - Start Phase 3B (Turkey CTA)
   - Start Phase 4 (Guides index)
3. **Sequential**: Complete Phase 2B (15 min) - Integration (after 2A done)
4. **Sequential**: Phase 5 Testing (30 min) - All user flows
5. **Sequential**: Phase 6 PR (30 min) - Screenshots + PR

**Total Time**: 2h 45m (matches plan estimate)

### Alternative Approach (Fully Sequential)

**If you prefer step-by-step**:
1. Phase 1: Header (15 min)
2. Phase 2A: Component (30 min)
3. Phase 2B: Integration (15 min)
4. Phase 3A: Buck CTA (20 min)
5. Phase 3B: Turkey CTA (20 min)
6. Phase 4: Guides index (15 min)
7. Phase 5: Testing (30 min)
8. Phase 6: PR (30 min)

**Total Time**: 2h 55m (slightly longer, but simpler mental model)

---

## Progress Tracking

**Status**: Not Started
**Completed Tasks**: 0/73 (0%)
**Current Phase**: Ready to begin Phase 1

### Phase Completion Status
- [ ] Phase 1: Header Navigation (0/10 tasks)
- [ ] Phase 2A: GuideBanner Component (0/10 tasks)
- [ ] Phase 2B: Integration (0/11 tasks)
- [ ] Phase 3A: Buck Season CTA (0/11 tasks)
- [ ] Phase 3B: Turkey Season CTA (0/10 tasks)
- [ ] Phase 4: Guides Index (0/13 tasks)
- [ ] Phase 5: Testing (0/15 tasks)
- [ ] Phase 6: PR (0/20 tasks)

---

## Notes

### Special Considerations
- **WVWO Voice**: Every piece of copy must pass "Kim voice test" (no corporate buzzwords)
- **Accessibility**: 44x44px tap targets mandatory for mobile (WCAG 2.1 AA)
- **Performance**: Use `client:visible` for GuideBanner (only hydrate when in viewport)
- **Simplicity**: No state management needed - URL params drive everything

### Blockers & Prerequisites
- ✅ SPEC-07 Complete (Adventures Hub with filtering exists)
- ✅ Git feature branch created (`feature/spec-07b-navigation-consolidation`)
- ✅ Dev environment running (`npm run dev`)
- ⚠️ **Before starting**: Verify Adventures Hub works at `/adventures`

### Risk Mitigation
- **Low Risk**: All changes additive (easy to rollback via `git revert`)
- **Testing**: Comprehensive manual testing before PR (no automated tests required)
- **Rollback Plan**: Can comment out sections or full git revert if issues

---

**Ready to execute!** Start with Phase 1, Task S-1.1.

**Grand love ya!** 🦌
