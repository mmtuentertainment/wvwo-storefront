# SPEC-07B: Task Breakdown

**Feature**: Navigation Consolidation
**Status**: Ready to Execute
**Total Effort**: 2-3 hours

## Task List

### Phase 1: Header Navigation (15 min)

- [ ] **T1.1**: Open `wv-wild-web/src/components/Header.astro` in editor
- [ ] **T1.2**: Locate existing nav structure (`<nav>` element)
- [ ] **T1.3**: Add Adventures link between Guides and Hunt Near Us
- [ ] **T1.4**: Verify mobile navigation updates automatically
- [ ] **T1.5**: Test on localhost (npm run dev)
- [ ] **T1.6**: Click Adventures → Verify navigates to `/adventures`
- [ ] **T1.7**: Test mobile tap target (44x44px minimum)

**Dependencies**: None
**Blocking**: T2.x (component integration needs nav to exist)

---

### Phase 2A: Create GuideBanner Component (30 min)

- [ ] **T2A.1**: Create file `wv-wild-web/src/components/GuideBanner.tsx`
- [ ] **T2A.2**: Define TypeScript interface: `GuideBannerProps { season?: string[], activity?: string[] }`
- [ ] **T2A.3**: Implement conditional logic:
  - Fall + Hunting → Buck season banner
  - Spring + Hunting → Turkey season banner
  - Other combos → return null
- [ ] **T2A.4**: Style with WVWO classes:
  - Background: `bg-brand-brown/10`
  - Border: `border-l-4 border-l-brand-orange`
  - Text: `text-brand-brown font-body`
  - Link: `text-sign-green underline font-bold`
- [ ] **T2A.5**: Verify TypeScript compiles without errors
- [ ] **T2A.6**: (Optional) Unit test component in isolation

**Dependencies**: None
**Blocking**: T2B.x (integration)

---

### Phase 2B: Integrate GuideBanner (15 min)

- [ ] **T2B.1**: Open `wv-wild-web/src/pages/adventures/index.astro` (or React island)
- [ ] **T2B.2**: Import GuideBanner component
- [ ] **T2B.3**: Identify active filter state source (URL params or React state)
- [ ] **T2B.4**: Pass filters as props: `<GuideBanner season={activeFilters.season} activity={activeFilters.activity} />`
- [ ] **T2B.5**: Position banner above adventure grid (after filter controls)
- [ ] **T2B.6**: Test fall hunting filter → Buck banner appears
- [ ] **T2B.7**: Test spring hunting filter → Turkey banner appears
- [ ] **T2B.8**: Test summer fishing filter → No banner appears

**Dependencies**: T2A.x (component must exist)
**Blocking**: None (independent feature)

---

### Phase 3A: Buck Season Guide CTA (20 min)

- [ ] **T3A.1**: Open `wv-wild-web/src/pages/guides/buck-season.astro`
- [ ] **T3A.2**: Scroll to before `<EmailCapture>` component
- [ ] **T3A.3**: Insert CTA section markup (see technical spec)
- [ ] **T3A.4**: Verify WVWO styling:
  - Background: `bg-sign-green`
  - Heading: `font-display font-bold text-3xl md:text-4xl`
  - Button: `bg-white text-sign-green rounded-sm`
- [ ] **T3A.5**: Verify link: `/adventures?season=fall&activity=hunting`
- [ ] **T3A.6**: Test on localhost → Click CTA → Verify filtered adventures load
- [ ] **T3A.7**: Test responsive layout (mobile/tablet/desktop)

**Dependencies**: T1.x (Adventures nav must exist)
**Blocking**: None (independent feature)

---

### Phase 3B: Turkey Season Guide CTA (20 min)

- [ ] **T3B.1**: Open `wv-wild-web/src/pages/guides/turkey-season.astro`
- [ ] **T3B.2**: Scroll to before `<EmailCapture>` component
- [ ] **T3B.3**: Insert CTA section markup (see technical spec)
- [ ] **T3B.4**: Verify WVWO styling (same as T3A.4)
- [ ] **T3B.5**: Verify link: `/adventures?season=spring&activity=hunting`
- [ ] **T3B.6**: Test on localhost → Click CTA → Verify filtered adventures load
- [ ] **T3B.7**: Test responsive layout

**Dependencies**: T1.x (Adventures nav must exist)
**Blocking**: None (independent feature)

---

### Phase 4: Guides Index Explanation (15 min)

- [ ] **T4.1**: Open `wv-wild-web/src/pages/guides/index.astro`
- [ ] **T4.2**: Identify position (after hero, before guide cards)
- [ ] **T4.3**: Insert intro section (see technical spec lines 168-180)
- [ ] **T4.4**: Verify copy explains Guides vs Adventures distinction
- [ ] **T4.5**: Verify link to Adventures hub works
- [ ] **T4.6**: Test layout (centered, max-w-3xl)

**Dependencies**: T1.x (Adventures nav link must exist)
**Blocking**: None (independent feature)

---

### Phase 5A: Desktop Testing (20 min)

- [ ] **T5A.1**: Header shows Adventures link (visual inspection)
- [ ] **T5A.2**: Adventures link navigates to `/adventures` (click test)
- [ ] **T5A.3**: Fall hunting filter shows buck season banner (URL: `/adventures?season=fall&activity=hunting`)
- [ ] **T5A.4**: Spring hunting filter shows turkey season banner (URL: `/adventures?season=spring&activity=hunting`)
- [ ] **T5A.5**: Summer fishing filter shows NO banner (URL: `/adventures?season=summer&activity=fishing`)
- [ ] **T5A.6**: Buck guide CTA navigates correctly (visit `/guides/buck-season`, click CTA)
- [ ] **T5A.7**: Turkey guide CTA navigates correctly (visit `/guides/turkey-season`, click CTA)
- [ ] **T5A.8**: Guides index explanation visible (visit `/guides`)
- [ ] **T5A.9**: All links use relative paths (inspect href attributes)

**Dependencies**: ALL previous tasks
**Blocking**: T5B.x (mobile testing)

---

### Phase 5B: Mobile Testing (15 min)

- [ ] **T5B.1**: Open localhost on mobile device or browser dev tools responsive mode
- [ ] **T5B.2**: Adventures visible in mobile navigation
- [ ] **T5B.3**: Measure Adventures tap target (minimum 44x44px)
- [ ] **T5B.4**: Guide banners readable on mobile (text not truncated)
- [ ] **T5B.5**: CTAs not obscured by footer/email capture
- [ ] **T5B.6**: All links work on touch (no hover-only interactions)

**Dependencies**: T5A.x (desktop testing must pass first)
**Blocking**: T5C.x (screenshots)

---

### Phase 5C: Screenshot Documentation (10 min)

- [ ] **T5C.1**: Create directory: `docs/specs/Mountain State Adventure Destination/SPEC-07B-navigation-consolidation/screenshots/`
- [ ] **T5C.2**: Screenshot: Desktop header with Adventures link
- [ ] **T5C.3**: Screenshot: Mobile nav with Adventures link
- [ ] **T5C.4**: Screenshot: Fall hunting filter with buck banner
- [ ] **T5C.5**: Screenshot: Spring hunting filter with turkey banner
- [ ] **T5C.6**: Screenshot: Buck guide CTA section
- [ ] **T5C.7**: Screenshot: Turkey guide CTA section
- [ ] **T5C.8**: Optimize images (<500KB each)
- [ ] **T5C.9**: Commit screenshots to git

**Dependencies**: T5B.x (mobile testing complete)
**Blocking**: T6.x (PR creation needs screenshots)

---

### Phase 6: Commit & PR (15 min)

- [ ] **T6.1**: Run `git status` to verify modified files
- [ ] **T6.2**: Stage all changes: `git add .`
- [ ] **T6.3**: Write conventional commit message (see plan.md)
- [ ] **T6.4**: Commit changes
- [ ] **T6.5**: Push to origin: `git push -u origin feature/spec-07b-navigation-consolidation`
- [ ] **T6.6**: Create PR via GitHub CLI: `gh pr create --title "feat(SPEC-07B): Navigation Consolidation"`
- [ ] **T6.7**: Attach screenshots to PR description
- [ ] **T6.8**: Link to spec documentation in PR body
- [ ] **T6.9**: Request review (if applicable) or self-merge
- [ ] **T6.10**: Verify Cloudflare Pages preview deployment works

**Dependencies**: ALL previous tasks
**Blocking**: None (final step)

---

## Task Checklist Summary

**Total Tasks**: 53
**Estimated Time**: 2-3 hours

### By Phase
- Phase 1 (Header): 7 tasks, 15 min
- Phase 2A (Component): 6 tasks, 30 min
- Phase 2B (Integration): 8 tasks, 15 min
- Phase 3A (Buck CTA): 7 tasks, 20 min
- Phase 3B (Turkey CTA): 7 tasks, 20 min
- Phase 4 (Guides Index): 6 tasks, 15 min
- Phase 5A (Desktop Test): 9 tasks, 20 min
- Phase 5B (Mobile Test): 6 tasks, 15 min
- Phase 5C (Screenshots): 9 tasks, 10 min
- Phase 6 (PR): 10 tasks, 15 min

---

## Parallel Execution Opportunities

These phases can run in parallel (different files, no conflicts):

**Parallel Set 1** (after Phase 1 complete):
- Phase 2A + Phase 3A + Phase 3B + Phase 4

**Parallel Set 2** (after all code complete):
- Phase 5A + Phase 5B (test desktop and mobile simultaneously)

**Serial Requirements**:
- Phase 1 → MUST complete first (nav link needed for other features)
- Phase 2B → Depends on Phase 2A (component must exist)
- Phase 5 → Depends on ALL code phases (can't test what doesn't exist)
- Phase 6 → Depends on Phase 5C (PR needs screenshots)

---

## Progress Tracking

Update this section as tasks complete:

**Current Status**: Not Started
**Completed**: 0/53 tasks (0%)
**Blocked**: None
**In Progress**: None

---

**Grand love ya!** 🦌
