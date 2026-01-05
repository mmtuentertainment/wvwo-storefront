# SPEC-07B Implementation Plan

**Feature**: Navigation Consolidation (Hybrid Approach)
**Status**: Ready to Execute
**Effort**: 2-3 hours total

## Overview

Add Adventures to header navigation and create bidirectional cross-linking between Guides (prep content) and Adventures (destinations). No new content creation - pure navigation and linking updates.

## Prerequisites

- ✅ SPEC-07 complete (Adventures Hub exists with filtering)
- ✅ Git feature branch created: `feature/spec-07b-navigation-consolidation`
- ✅ Dev environment running (`npm run dev`)

## Phase 1: Header Navigation (15 min)

**Goal**: Make Adventures discoverable via header link

### Tasks

1. Open `wv-wild-web/src/components/Header.astro`
2. Locate existing nav links (Shop, Guides, Hunt Near Us)
3. Add Adventures link between Guides and Hunt Near Us:

   ```astro
   <a href="/adventures" class="nav-link">Adventures</a>
   ```

4. Verify mobile navigation updates (if separate mobile nav exists)
5. Test on localhost - click Adventures → verify navigates to `/adventures`

**Validation**:

- [ ] Adventures link visible in desktop nav
- [ ] Adventures link visible in mobile nav
- [ ] Link navigates to `/adventures` correctly
- [ ] 44x44px tap target on mobile (use browser dev tools)

---

## Phase 2: Guide Banner Component (45 min)

**Goal**: Show contextual guide links on filtered adventures

### Tasks

#### 2A: Create Component (30 min)

1. Create file: `wv-wild-web/src/components/GuideBanner.tsx`
2. Copy implementation from technical spec (see existing spec.md lines 48-95)
3. Verify TypeScript types correct
4. Test component logic:
   - Fall + Hunting → Buck guide banner
   - Spring + Hunting → Turkey guide banner
   - Other combos → null

#### 2B: Integrate in Adventures (15 min)

1. Open `wv-wild-web/src/pages/adventures/index.astro` (or React island if using client-side filtering)
2. Import GuideBanner component
3. Pass active filter state as props:

   ```tsx
   <GuideBanner season={activeFilters.season} activity={activeFilters.activity} />
   ```

4. Position above adventure grid

**Validation**:

- [ ] Visit `/adventures?season=fall&activity=hunting` → See buck season banner
- [ ] Visit `/adventures?season=spring&activity=hunting` → See turkey season banner
- [ ] Visit `/adventures?season=summer&activity=fishing` → No banner
- [ ] Banner links work and navigate to correct guides

---

## Phase 3: Guide CTAs (40 min)

**Goal**: Link from guides to filtered adventures

### Tasks

#### 3A: Buck Season Guide (20 min)

1. Open `wv-wild-web/src/pages/guides/buck-season.astro`
2. Scroll to before `<EmailCapture>` component
3. Add CTA section (see technical spec lines 115-133)
4. Verify:
   - Background: `bg-sign-green`
   - Text: "Ready to Hunt? Browse Fall Hunting Destinations"
   - Link: `/adventures?season=fall&activity=hunting`

#### 3B: Turkey Season Guide (20 min)

1. Open `wv-wild-web/src/pages/guides/turkey-season.astro`
2. Scroll to before `<EmailCapture>` component
3. Add CTA section (see technical spec lines 139-157)
4. Verify:
   - Background: `bg-sign-green`
   - Text: "Find Your Spot - Explore WV's Best Turkey Hunting Locations"
   - Link: `/adventures?season=spring&activity=hunting`

**Validation**:

- [ ] Buck guide shows CTA with correct text
- [ ] Buck CTA navigates to fall hunting filter
- [ ] Turkey guide shows CTA with correct text
- [ ] Turkey CTA navigates to spring hunting filter
- [ ] CTAs readable and clickable on mobile

---

## Phase 4: Guides Index Update (15 min)

**Goal**: Explain Guides vs Adventures distinction

### Tasks

1. Open `wv-wild-web/src/pages/guides/index.astro`
2. Add intro section after hero, before guide cards (see technical spec lines 168-180)
3. Include link to Adventures hub
4. Test navigation flow

**Validation**:

- [ ] Intro section visible on `/guides`
- [ ] Explanation clear and concise
- [ ] Link to Adventures works

---

## Phase 5: Testing & Screenshots (45 min)

**Goal**: Verify all user flows work correctly

### Desktop Testing (20 min)

- [ ] Header shows Adventures link
- [ ] Adventures link navigates correctly
- [ ] Fall hunting filter shows buck banner
- [ ] Spring hunting filter shows turkey banner
- [ ] Buck guide CTA works
- [ ] Turkey guide CTA works
- [ ] Guides index explanation visible

### Mobile Testing (15 min)

- [ ] Adventures visible in mobile nav
- [ ] 44x44px tap targets maintained
- [ ] Guide banners readable
- [ ] CTAs not obscured
- [ ] All links work on touch

### Screenshot Documentation (10 min)

Take screenshots for PR:

1. Desktop header with Adventures link
2. Mobile nav with Adventures link
3. Fall hunting filter with buck banner
4. Spring hunting filter with turkey banner
5. Buck guide CTA section
6. Turkey guide CTA section

**Save to**: `docs/specs/Mountain State Adventure Destination/SPEC-07B-navigation-consolidation/screenshots/`

---

## Phase 6: Commit & PR (15 min)

### Tasks

1. **Stage changes**:

   ```bash
   git status  # Verify all modified files
   git add .
   ```

2. **Commit with conventional format**:

   ```bash
   git commit -m "feat(SPEC-07B): add Adventures navigation and cross-linking

   - Add Adventures link to header navigation
   - Create GuideBanner component for filter-specific guide links
   - Add CTAs to buck-season and turkey-season guides
   - Update guides index with explanation of Guides vs Adventures
   - All cross-links use WVWO voice (no corporate speak)
   - Mobile-friendly: 44x44px tap targets maintained

   Closes: SPEC-07B"
   ```

3. **Push and create PR**:

   ```bash
   git push -u origin feature/spec-07b-navigation-consolidation
   gh pr create --title "feat(SPEC-07B): Navigation Consolidation" --body-file docs/specs/Mountain\ State\ Adventure\ Destination/SPEC-07B-navigation-consolidation/PR-TEMPLATE.md
   ```

4. **PR Description** (create PR-TEMPLATE.md):
   - Summary of changes
   - Testing checklist
   - Screenshot attachments
   - Link to spec documentation

---

## Rollback Plan

If issues discovered post-merge:

**Option 1: Full Revert**

```bash
git revert <commit-hash>
git push
```

**Option 2: Selective Disable**
Comment out sections temporarily:

- Header: `<!-- <a href="/adventures">Adventures</a> -->`
- GuideBanner: `{/* <GuideBanner ... /> */}`
- CTAs: Comment out entire section tags

**Risk Assessment**: Very low - all changes are additive, no deletions

---

## Success Metrics (Post-Deployment)

Track in GA4 (Phase 9):

- Adventures page views (should increase >50%)
- Guide → Adventures click-through rate
- Adventures → Guides click-through rate
- Bounce rate on guides (should decrease)

**Not measured in this spec** - just build the infrastructure.

---

## Next Steps After Merge

1. ✅ Mark SPEC-07B complete in MASTER-SEQUENCING-PLAN.md
2. ➡️ Begin SPEC-08 (Components) - navigation now in place for testing
3. 📊 Monitor Adventures Hub traffic in Cloudflare Analytics
4. 🔄 Plan SPEC-21-28 migrations (consolidate /near/ to Adventures)

---

**Grand love ya!** 🦌
