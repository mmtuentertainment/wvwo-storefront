# SPEC-07B: Content Operations Workflow

**Type:** Code + Navigation Update (not content creation)
**Effort:** 2-3 hours
**Kim Input:** None required (navigation structure only)

---

## Workflow Overview

This spec is **code-focused** (not content-focused). No new adventures created, no Kim review needed.

```
Matt: Update navigation → Add cross-links → Test → Deploy
```

**No Scout/Worker/Kim cycle needed.**

---

## Step-by-Step Execution

### Step 1: Update Header Navigation (15 min)

**File:** `wv-wild-web/src/components/Header.astro`

1. Open file in editor
2. Locate `<nav>` element with existing links
3. Add Adventures link:

   ```astro
   <a href="/adventures" class="nav-link">Adventures</a>
   ```

4. Verify mobile navigation updated (if separate mobile nav exists)
5. Save file

**Test:**

```bash
npm run dev
# Navigate to http://localhost:4321
# Verify Adventures link appears in header
# Click Adventures → Should navigate to /adventures
```

---

### Step 2: Create Guide Banner Component (30 min)

**File:** `wv-wild-web/src/components/GuideBanner.tsx` (new file)

1. Create new file in components directory
2. Copy code from `spec.md` (GuideBanner component)
3. Verify TypeScript types
4. Test component in isolation (if time permits)

**No AgentDB pattern needed** - simple React component.

---

### Step 3: Integrate Banner in Adventures (15 min)

**File:** `wv-wild-web/src/pages/adventures/index.astro` or React island

1. Import GuideBanner component
2. Pass active filters as props
3. Render banner above adventure grid
4. Verify conditional logic (only shows for hunting filters)

**Test:**

```bash
# Visit /adventures?season=fall&activity=hunting
# Should see: "Preparing for buck season? Read our Buck Season Prep Guide"

# Visit /adventures?season=spring&activity=hunting
# Should see: "Getting ready for turkey season? Check our Turkey Season Guide"

# Visit /adventures?season=summer&activity=fishing
# Should NOT see guide banner (no fishing guide exists)
```

---

### Step 4: Add CTAs to Guide Pages (40 min)

**Files:**

- `wv-wild-web/src/pages/guides/buck-season.astro`
- `wv-wild-web/src/pages/guides/turkey-season.astro`

**For each guide:**

1. Open file in editor
2. Scroll to bottom (before `<EmailCapture>`)
3. Add CTA section (copy from `spec.md`)
4. Verify link URLs correct
5. Test on dev server

**Test:**

```bash
# Visit /guides/buck-season
# Scroll to bottom
# Should see: "Ready to Hunt? Browse Fall Hunting Destinations" CTA
# Click CTA → Should navigate to /adventures?season=fall&activity=hunting
```

---

### Step 5: Update Guides Index (15 min)

**File:** `wv-wild-web/src/pages/guides/index.astro`

1. Open file
2. Add intro section explaining Guides vs Adventures
3. Link to Adventures hub
4. Save and test

---

### Step 6: Testing (30 min)

**Desktop Tests:**

- [ ] Header shows Adventures link
- [ ] Adventures link navigates to `/adventures`
- [ ] Fall hunting filter shows buck season banner
- [ ] Spring hunting filter shows turkey season banner
- [ ] Buck season guide has CTA linking to fall hunting
- [ ] Turkey season guide has CTA linking to spring turkey
- [ ] Guides index explains difference and links to Adventures

**Mobile Tests:**

- [ ] Adventures link visible in mobile nav
- [ ] Adventures link has 44x44px tap target
- [ ] Guide banners readable on mobile
- [ ] CTAs work on mobile (not obscured)

**Cross-Browser:**

- [ ] Chrome/Edge (primary)
- [ ] Safari (if available)
- [ ] Firefox (if available)

---

### Step 7: Screenshot Verification (15 min)

Take screenshots for PR documentation:

1. Header with Adventures link (desktop)
2. Header with Adventures link (mobile)
3. Fall hunting filter with buck season banner
4. Spring hunting filter with turkey season banner
5. Buck season guide CTA section
6. Turkey season guide CTA section

**Save to:** `docs/specs/Mountain State Adventure Destination/SPEC-07B-navigation-consolidation/screenshots/`

---

### Step 8: Commit and PR (15 min)

```bash
git checkout -b feat/spec-07b-navigation-consolidation
git add .
git commit -m "feat(SPEC-07B): add Adventures navigation and cross-linking

- Add Adventures link to header navigation
- Create GuideBanner component for filter-specific guide links
- Add CTAs to buck-season and turkey-season guides
- Update guides index with explanation of Guides vs Adventures
- All cross-links use WVWO voice (no corporate speak)
- Mobile-friendly: 44x44px tap targets maintained

Closes: SPEC-07B"

git push -u origin feat/spec-07b-navigation-consolidation
gh pr create --title "feat(SPEC-07B): Navigation Consolidation" --body "$(cat <<'EOF'
## Summary
Adds Adventures navigation link and cross-linking between Guides and Adventures.

## Changes
- Header: Added Adventures link (before Hunt Near Us)
- GuideBanner: Conditional component shows relevant guides on filtered adventures
- Buck Season Guide: Added "Browse Fall Hunting Destinations" CTA
- Turkey Season Guide: Added "Browse Spring Turkey Spots" CTA
- Guides Index: Added explanation of Guides vs Adventures

## Testing
- ✅ Desktop navigation works
- ✅ Mobile navigation works (44x44px tap targets)
- ✅ Fall hunting filter shows buck season banner
- ✅ Spring hunting filter shows turkey season banner
- ✅ Guide CTAs navigate to correctly filtered Adventures
- ✅ All links use relative paths
- ✅ WVWO voice maintained (no corporate speak)

## Screenshots
[Attach screenshots from Step 7]

🦌 Grand love ya!
EOF
)"
```

---

## No Kim Review Required

**Why:** Navigation structure is Matt's domain (technical decision).

**When Kim Input IS Needed:**

- Content authenticity (destination descriptions)
- Voice verification (copy sounds like Kim)
- Local knowledge (what matters to customers)

**When Kim Input NOT Needed:**

- Navigation structure
- Technical implementation
- Cross-linking strategy
- Filter logic

**This spec = navigation structure only → No Kim review**

---

## AgentDB Pattern Storage

After successful deployment:

```bash
# Store successful navigation consolidation pattern
npx agentdb@latest reflexion store "wvwo-session" "SPEC-07B-navigation-consolidation" 1.0 true "Hybrid approach: Keep Guides (prep), migrate Near (locations) to Adventures. Cross-link with filter-specific banners. No Kim review needed for nav structure."

# Store cross-linking approach
npx agentdb@latest reflexion store "wvwo-session" "cross-linking-strategy" 1.0 true "Guides link to filtered Adventures (buck season → fall hunting filter). Adventures show guide banners when hunting filters active. Bidirectional linking improves UX and SEO."
```

**Use for future specs:**

- SPEC-21-28 migrations (know where to redirect /near/ pages)
- Future guide creation (follow same CTA pattern)
- Other cross-linking opportunities

---

## Rollback Strategy

If issues discovered:

1. **Revert PR** (git revert)
2. **Or comment out sections:**

   ```astro
   <!-- Temporarily disabled: Adventures link -->
   <!-- <a href="/adventures">Adventures</a> -->
   ```

**Risk:** Very low (additive changes only)

---

## Success Metrics (Post-Deployment)

Track in GA4 (Phase 9):

- Click-through rate: Guides → Adventures
- Click-through rate: Adventures → Guides
- Adventures page views (should increase with nav link)
- Bounce rate on guides (should decrease with clear next action)

**Not measured in this spec** - just build the infrastructure.

---

## Timeline

**Execute immediately after SPEC-07 merge** (before starting SPEC-08).

**Estimated:** 2-3 hours start to finish.

**Blocking:** SPEC-08-11 (Components) - need navigation in place for manual testing.

---

## Deliverables

- [ ] Updated Header.astro with Adventures link
- [ ] GuideBanner.tsx component created
- [ ] GuideBanner integrated in Adventures hub
- [ ] Buck season guide has CTA section
- [ ] Turkey season guide has CTA section
- [ ] Guides index updated with explanation
- [ ] Screenshots saved to spec folder
- [ ] PR created and merged
- [ ] Pattern stored in AgentDB

---

**Grand love ya!** 🦌
