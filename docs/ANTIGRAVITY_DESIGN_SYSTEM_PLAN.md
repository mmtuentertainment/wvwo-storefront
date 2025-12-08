# WV Wild Outdoors Design System: Antigravity Implementation Plan

**Project**: wvwo-storefront  
**Branch**: 003-design-system-enhancements (create from main)  
**Antigravity Model**: Gemini 3 Pro (free preview access)  
**Estimated Time**: 10-15 hours (vs 17-25 hours manual)  
**Optimization**: Parallel agent execution + Artifact verification

---

## 🎯 Master Prompt for Antigravity Manager Surface

**Copy-paste this into the Manager Surface to spawn all agents:**

```
[CONTEXT]
Project: WV Wild Outdoors Storefront (wvwo-storefront)
Branch: Create new branch "003-design-system-enhancements" from main
Tech Stack: Astro 5, Tailwind CSS, TypeScript
Directory: wv-wild-web/

Goal: Enhance the design system for a West Virginia hunting/fishing store website
to achieve authentic outdoor aesthetic, flowing narrative storytelling, and 
production-ready quality (WCAG 2.1 AA, Lighthouse > 90).

Constitutional Principles:
- "Anti-MVP Bias" - Production-ready quality from day one
- "Owner-First Simplicity" - Phone-friendly for non-technical owner
- "Hunting & Fishing First" - Authentic rural WV outdoor culture

[WORKFLOW]
Execute 6 phases sequentially. Each phase uses parallel agents where possible.
After each phase, generate Artifacts for human verification before proceeding.

[PHASES]
Phase 1: Design System Foundation (2 parallel agents, 1-2 hours)
Phase 2: Visual Identity & Texture (3 parallel agents, 4-6 hours)
Phase 3: Storytelling & Content Flow (1 agent, 2-3 hours)
Phase 4: Trust & Credibility (2 parallel agents, 2-3 hours)
Phase 5: Component Consistency (1 agent, 6-8 hours)
Phase 6: Accessibility & Performance (2 parallel agents, 2-3 hours)

[VERIFICATION REQUIREMENTS]
After EACH phase, generate Artifacts:
1. Code diffs (before/after for all changed files)
2. Browser screenshots (desktop 1920px, mobile 375px)
3. Terminal output (build success, no errors)
4. Accessibility report (contrast ratios, ARIA labels)

[SUCCESS CRITERIA]
- All color tokens defined and used consistently
- Typography hierarchy followed (no hardcoded fonts)
- WCAG 2.1 AA compliance (4.5:1 text, 3:1 UI)
- Lighthouse score > 90 (Performance, Accessibility, Best Practices)
- No "add this later" comments (complete implementation)
- Flowing narrative layout on story page (user-requested)

[START]
Begin with Phase 1. Spawn 2 agents to work in parallel.
Wait for human approval of Phase 1 Artifacts before proceeding to Phase 2.
```

---

## 📋 Phase-by-Phase Agent Prompts

### **PHASE 1: Design System Foundation** (2 parallel agents, 1-2 hours)

#### **Agent 1: Define `brand-orange` Color Token**

**Thinking Mode**: LOW (simple color definition)

```
[GOAL]
Define the missing `brand-orange` color token in the Tailwind config and global CSS.
This color is currently used in Hero.astro but not defined, causing build errors.

[CONTEXT]
- File: wv-wild-web/tailwind.config.cjs
- File: wv-wild-web/src/styles/global.css
- Usage: Hero location tag (<span class="text-brand-orange">Birch River / Little Birch, WV</span>)
- Cultural significance: Blaze orange is iconic in hunting (safety, visibility)

[IMPLEMENTATION]
1. Add brand-orange to tailwind.config.cjs colors.extend with full shade palette (50-900)
2. Base color: #FF6F00 (blaze orange)
3. Add CSS variable to global.css: --color-brand-orange: #FF6F00
4. Verify contrast ratio: 3:1 minimum on white background (WCAG 2.1 AA for UI)

[VERIFICATION]
- Run `npm run build` - should compile without errors
- Open Hero component in browser - orange location tag displays correctly
- Check contrast ratio using browser DevTools (3:1 minimum)
- Generate screenshot of Hero with orange location tag

[ARTIFACTS]
- Code diff: tailwind.config.cjs (before/after)
- Code diff: global.css (before/after)
- Terminal output: npm run build (success)
- Browser screenshot: Hero component with orange location tag
- Contrast ratio report: brand-orange on white background
```

---

#### **Agent 2: Swap Inter → Archivo for Body Text**

**Thinking Mode**: LOW (simple font swap)

```
[GOAL]
Replace Inter font with Archivo for body text to achieve more rugged,
field guide aesthetic aligned with outdoor/rural brand identity.

[CONTEXT]
- File: wv-wild-web/src/styles/global.css
- Current: Inter (generic, corporate)
- Target: Archivo (technical, utilitarian, government form aesthetic)
- Keep: Roboto Slab (display), Caveat (handwritten)

[IMPLEMENTATION]
1. Update Google Fonts import URL in global.css
2. Change --font-body from 'Inter' to 'Archivo'
3. Keep font weights: 400, 500, 600, 700
4. Verify all body text renders in Archivo
5. Test readability at all sizes (16px, 18px, 20px)

[VERIFICATION]
- All body text uses Archivo (inspect with DevTools)
- Readability maintained (no legibility issues)
- Font loads optimally (display=swap in URL)
- No FOUT (Flash of Unstyled Text)

[ARTIFACTS]
- Code diff: global.css (before/after)
- Browser screenshot: Homepage with Archivo body text
- Browser screenshot: Story page with Archivo body text
- Font loading waterfall (DevTools Network tab)
```

---

### **PHASE 2: Visual Identity & Texture** (3 parallel agents, 4-6 hours)

#### **Agent 1: Add Subtle Noise Texture to Body Background**

**Thinking Mode**: LOW (simple SVG background)

```
[GOAL]
Add subtle noise texture to body background to transform site from
"digital storefront" to "field journal" aesthetic.

[CONTEXT]
- Files: tailwind.config.cjs, wv-wild-web/src/layouts/Layout.astro
- Effect: Aged paper, field guide feel
- Opacity: 0.03 (very subtle, doesn't interfere with readability)

[IMPLEMENTATION]
1. Add noise SVG as data URI in tailwind.config.cjs backgroundImage
2. Apply to body element in Layout.astro: class="bg-brand-cream bg-noise bg-repeat"
3. Test on all pages (homepage, story, inventory)
4. Verify no performance impact (< 50ms)

[VERIFICATION]
- Subtle texture visible on all pages
- Doesn't interfere with text readability
- Performance impact < 50ms (Lighthouse)
- Works on mobile and desktop

[ARTIFACTS]
- Code diff: tailwind.config.cjs
- Code diff: Layout.astro
- Browser screenshot: Homepage with noise texture
- Lighthouse performance report (before/after)
```

---

#### **Agent 2: Create Camo Pattern SVG**

**Thinking Mode**: LOW (SVG pattern creation)

```
[GOAL]
Create culturally authentic camo pattern SVG for hero/section overlays.

[CONTEXT]
- File: wv-wild-web/public/patterns/camo-subtle.svg
- Usage: Hero section overlays (opacity 0.05), alternating section backgrounds
- Style: Woodland camo (greens, browns, blacks)
- Never on text-heavy areas (readability)

[IMPLEMENTATION]
1. Create SVG file at public/patterns/camo-subtle.svg
2. Use organic shapes (not geometric)
3. Colors: brand-brown, sign-green, brand-mud (from theme)
4. Add to Tailwind config as background pattern
5. Apply to hero section with low opacity

[VERIFICATION]
- Camo pattern visible on hero section
- Doesn't interfere with hero text readability
- Culturally authentic (not cartoonish)
- Works on mobile and desktop

[ARTIFACTS]
- New file: public/patterns/camo-subtle.svg
- Code diff: tailwind.config.cjs
- Code diff: Hero.astro (apply pattern)
- Browser screenshot: Hero with camo overlay
```

---

#### **Agent 3: Create Pencil Sketch Category Icons**

**Thinking Mode**: HIGH (requires image generation/sourcing)

```
[GOAL]
Create 4 pencil sketch illustrations for product categories to extend
the established pencil sketch pattern from story page.

[CONTEXT]
- Existing sketches: story-bridge-beginning.jpg, story-old-shop-flood.jpg, story-new-shop-family.jpg
- Style: Hand-drawn on aged paper (sepia tone), field journal aesthetic
- Categories: Hunting, Fishing, Firearms, Feed

[IMPLEMENTATION]
1. Create or source 4 pencil sketch images:
   - category-hunting.jpg (deer in forest)
   - category-fishing.jpg (creek with fly rod)
   - category-firearms.jpg (rifle on workbench)
   - category-feed.jpg (deer at feeder)
2. Save to wv-wild-web/public/sketches/
3. Optimize for web (< 400 KB each)
4. Ensure consistent style with existing story sketches

[VERIFICATION]
- All 4 sketches created and saved
- Consistent style with existing story sketches
- File sizes < 400 KB each
- Aged paper aesthetic maintained

[ARTIFACTS]
- New files: public/sketches/category-*.jpg (4 files)
- Browser screenshot: Category grid with new sketches
- File size report (all < 400 KB)
```

---

### **PHASE 3: Storytelling & Content Flow** (1 agent, 2-3 hours)

#### **Agent 1: Implement Flowing Narrative Layout**

**Thinking Mode**: HIGH (complex layout logic, user-requested)

```
[GOAL]
Transform story page from vertical stacking to flowing narrative layout
where text and images are interwoven like a magazine article.

USER REQUEST: "I want the story and pictures to be one flow not vertical grouped"

[CONTEXT]
- File: wv-wild-web/src/pages/story.astro
- Current: Vertical stacking (heading → text → image, repeat)
- Target: Magazine-style alternating grid (Field & Stream, National Geographic)
- Images: story-bridge-beginning.jpg, story-old-shop-flood.jpg, story-new-shop-family.jpg

[IMPLEMENTATION]
1. Section 1: Image LEFT, text RIGHT (grid-cols-2, gap-8)
2. Section 2: Image RIGHT, text LEFT (order-1 md:order-2)
3. Section 3: Full-width dramatic image (-mx-4 md:-mx-12)
4. Mobile: Collapse to vertical stack (grid-cols-1)
5. Ensure accessibility (keyboard nav, screen reader)

[VERIFICATION]
- Desktop (1920px): Images alternate left/right, text flows beside
- Tablet (768px): Grid still works
- Mobile (375px): Vertical stack
- Accessible (keyboard nav, screen reader tested)
- No layout shift (CLS < 0.1)

[ARTIFACTS]
- Code diff: story.astro (before/after)
- Browser screenshot: Desktop story page (1920px)
- Browser screenshot: Mobile story page (375px)
- Accessibility report (keyboard nav, screen reader)
- Lighthouse CLS score (< 0.1)
```

---

### **PHASE 4: Trust & Credibility** (2 parallel agents, 2-3 hours)

#### **Agent 1: Add FFL & WVDNR Badges**

**Thinking Mode**: LOW (simple badge placement)

```
[GOAL]
Add Federal Firearms License (FFL) and WV DNR License Agent badges
to establish authority and legitimacy.

[CONTEXT]
- Files: wv-wild-web/src/components/Header.astro, Footer.astro
- Badges: FFL (Federal Firearms License), WVDNR (WV Dept of Natural Resources)
- Placement: Header (desktop), Footer (mobile), Firearms category page

[IMPLEMENTATION]
1. Create or source badge images (SVG preferred)
2. Add to Header component (desktop only, hidden on mobile)
3. Add to Footer component (always visible)
4. Add to Firearms category page (if exists)
5. Ensure accessibility (alt text, ARIA labels)

[VERIFICATION]
- Badges visible on desktop header
- Badges visible on mobile footer
- Accessible (alt text, ARIA labels)
- No layout shift (CLS < 0.1)

[ARTIFACTS]
- New files: public/badges/ffl.svg, public/badges/wvdnr.svg
- Code diff: Header.astro
- Code diff: Footer.astro
- Browser screenshot: Header with badges (desktop)
- Browser screenshot: Footer with badges (mobile)
```

---

#### **Agent 2: Add "Since 2008" Marker**

**Thinking Mode**: LOW (simple text addition)

```
[GOAL]
Add "Since 2008" marker to reinforce resilience storytelling
(survived 2016 flood, still here).

[CONTEXT]
- Files: Header.astro, story.astro intro
- Font: Caveat (handwritten, already in theme)
- Placement: Header (next to logo), Story page intro
- Style: Handwritten, warm, personal

[IMPLEMENTATION]
1. Add "Since 2008" to Header component (Caveat font)
2. Add to Story page intro section
3. Style: text-brand-brown, font-hand (Caveat)
4. Ensure mobile responsiveness

[VERIFICATION]
- "Since 2008" visible in header (desktop and mobile)
- "Since 2008" visible on story page intro
- Uses Caveat font (handwritten)
- Mobile responsive (doesn't break layout)

[ARTIFACTS]
- Code diff: Header.astro
- Code diff: story.astro
- Browser screenshot: Header with "Since 2008" (desktop)
- Browser screenshot: Header with "Since 2008" (mobile)
```

---

### **PHASE 5: Component Consistency** (1 agent, 6-8 hours)

#### **Agent 1: Audit All Components**

**Thinking Mode**: HIGH (requires comprehensive analysis)

```
[GOAL]
Audit all 9+ components to ensure design system consistency:
- Uses design tokens (no hardcoded colors)
- Typography hierarchy followed
- Accessible (WCAG 2.1 AA)
- Responsive (mobile, tablet, desktop)
- Performance optimized

[CONTEXT]
Components to audit:
1. Hero.astro (already audited, use as reference)
2. Header.astro
3. Footer.astro
4. CategoryGrid.astro
5. InventoryGrid.astro
6. ContactStrip.astro
7. Services.astro
8. StorySection.astro
9. Ticker.astro
10. Visit.astro

[IMPLEMENTATION]
For EACH component:
1. Check color usage (design tokens only, no hex codes)
2. Check typography (uses --font-display, --font-hand, --font-body)
3. Check accessibility (WCAG 2.1 AA: 4.5:1 text, 3:1 UI, ARIA labels)
4. Check responsiveness (mobile 375px, tablet 768px, desktop 1920px)
5. Check performance (lazy loading, optimized images)
6. Fix any issues found

[VERIFICATION]
- All components use design tokens (no hardcoded colors)
- Typography hierarchy followed (no hardcoded fonts)
- WCAG 2.1 AA compliance (contrast ratios, ARIA labels)
- Responsive on all screen sizes
- Performance optimized (lazy loading, compressed images)

[ARTIFACTS]
- Audit report: Component consistency checklist (all 10 components)
- Code diffs: All components with fixes
- Browser screenshots: All components (desktop + mobile)
- Accessibility report: Contrast ratios, ARIA labels
- Performance report: Lazy loading, image optimization
```

---

### **PHASE 6: Accessibility & Performance** (2 parallel agents, 2-3 hours)

#### **Agent 1: WCAG 2.1 AA Validation**

**Thinking Mode**: HIGH (requires comprehensive testing)

```
[GOAL]
Validate entire site meets WCAG 2.1 AA standards:
- Text contrast 4.5:1 (3:1 for large text)
- UI contrast 3:1
- Keyboard navigation works
- Screen reader tested
- Focus indicators visible (3:1 contrast)

[CONTEXT]
- All pages: homepage, story, inventory, category pages
- Tools: axe DevTools, WAVE, Lighthouse Accessibility

[IMPLEMENTATION]
1. Run axe DevTools on all pages
2. Run WAVE on all pages
3. Run Lighthouse Accessibility audit
4. Test keyboard navigation (Tab, Enter, Escape, Arrow keys)
5. Test with screen reader (NVDA or VoiceOver)
6. Fix all CRITICAL and HIGH issues
7. Document MEDIUM/LOW issues for future work

[VERIFICATION]
- axe DevTools: 0 violations
- WAVE: 0 errors
- Lighthouse Accessibility: > 90
- Keyboard navigation: all interactive elements reachable
- Screen reader: all content announced correctly

[ARTIFACTS]
- Accessibility report: axe DevTools results
- Accessibility report: WAVE results
- Lighthouse Accessibility score (> 90)
- Keyboard navigation video (screen recording)
- Screen reader test notes
```

---

#### **Agent 2: Performance Optimization**

**Thinking Mode**: HIGH (requires analysis and optimization)

```
[GOAL]
Optimize site performance to meet targets:
- Lighthouse Performance > 90
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

[CONTEXT]
- All pages: homepage, story, inventory, category pages
- Tools: Lighthouse, WebPageTest, Chrome DevTools

[IMPLEMENTATION]
1. Run Lighthouse Performance audit on all pages
2. Optimize images (compress, lazy load, WebP format)
3. Optimize fonts (display=swap, preload critical fonts)
4. Minimize CSS (remove unused, inline critical)
5. Optimize JavaScript (defer non-critical, tree-shake)
6. Fix layout shift issues (CLS < 0.1)

[VERIFICATION]
- Lighthouse Performance > 90 (all pages)
- LCP < 2.5s (all pages)
- FID < 100ms (all pages)
- CLS < 0.1 (all pages)
- Images optimized (WebP, lazy load)
- Fonts optimized (display=swap, preload)

[ARTIFACTS]
- Lighthouse Performance report (before/after, all pages)
- WebPageTest results (LCP, FID, CLS)
- Image optimization report (file sizes before/after)
- Font loading waterfall (DevTools Network tab)
```

---

## 🎯 Success Criteria (Final Verification)

After all 6 phases complete, verify:

### Design System Health
- [ ] All color tokens defined and used consistently
- [ ] No hardcoded hex values in components
- [ ] Typography hierarchy followed (no hardcoded fonts)
- [ ] Visual patterns documented (noise, camo, pencil sketches)

### User Experience
- [ ] Flowing narrative on story page (user-requested) ✅
- [ ] Authentic outdoor aesthetic (noise, camo, sketches)
- [ ] Trust signals prominently displayed (FFL, WVDNR, "Since 2008")
- [ ] Emotional resonance (resilience narrative, local connection)

### Technical Excellence
- [ ] WCAG 2.1 AA compliance (4.5:1 text, 3:1 UI, keyboard nav, screen reader)
- [ ] Performance targets met (Lighthouse > 90, LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Component consistency validated (all 10 components audited)
- [ ] Production-ready code (no "add this later" comments)

### Brand Alignment
- [ ] "Hunting & Fishing First" identity reinforced
- [ ] Cinematic, authentic aesthetic maintained
- [ ] Resilience narrative visualized (flood motif, "Since 2008")
- [ ] Local connection emphasized (place over product)

---

## 📊 Estimated Timeline

| Phase | Agents | Time | Dependencies |
|-------|--------|------|--------------|
| **Phase 1** | 2 parallel | 1-2 hours | None |
| **Phase 2** | 3 parallel | 4-6 hours | Phase 1 complete |
| **Phase 3** | 1 sequential | 2-3 hours | Phase 2 complete |
| **Phase 4** | 2 parallel | 2-3 hours | Phase 3 complete |
| **Phase 5** | 1 sequential | 6-8 hours | Phase 4 complete |
| **Phase 6** | 2 parallel | 2-3 hours | Phase 5 complete |
| **TOTAL** | - | **17-25 hours** | Sequential phases |

**With Antigravity Optimization**: 10-15 hours (parallel execution + reduced manual work)

---

## ⚠️ Anti-Patterns to Avoid

Based on power user feedback:

### ❌ **Don't Do This**:
1. **Trust agents blindly** - Always verify Artifacts
2. **Accept "add this later" comments** - Reject and request complete implementation
3. **Let agents rewrite tests** - Verify tests still validate correct behavior
4. **Skip human verification** - Review diffs before accepting
5. **Use multi-agents for sequential tasks** - Use single agent instead

### ✅ **Do This Instead**:
1. **Request Artifacts** - Screenshots, diffs, terminal output
2. **Verify each phase** - Human approval before proceeding
3. **Test manually** - Don't rely solely on agent-generated tests
4. **Review diffs carefully** - Check for dropped functionality
5. **Use parallel agents** - Only for independent tasks

---

## 🚀 How to Execute This Plan

### **Step 1: Open Antigravity IDE**
1. Open wvwo-storefront project
2. Ensure you're on `main` branch (PR #6 merged)
3. Open Manager Surface (Agent orchestration view)

### **Step 2: Create New Branch**
```bash
git checkout main
git pull origin main
git checkout -b 003-design-system-enhancements
git push -u origin 003-design-system-enhancements
```

### **Step 3: Paste Master Prompt**
1. Copy the Master Prompt from top of this document
2. Paste into Manager Surface
3. Let Antigravity spawn agents for Phase 1

### **Step 4: Verify Each Phase**
1. Wait for Phase 1 agents to complete
2. Review Artifacts (diffs, screenshots, terminal output)
3. Test manually in browser
4. Approve Phase 1 → Proceed to Phase 2
5. Repeat for all 6 phases

### **Step 5: Create Pull Request**
```bash
git add .
git commit -m "feat: design system enhancements (brand-orange, Archivo, flowing story, badges, audit)"
git push origin 003-design-system-enhancements
gh pr create --title "Feature 003: Design System Enhancements" --body "See SEQUENTIAL_PLAN_UPDATED.md for details"
```

### **Step 6: Review & Merge**
1. Review PR on GitHub
2. Check CodeRabbit feedback
3. Fix any CRITICAL/HIGH issues
4. Get human approval
5. Merge to main

---

## 📚 Reference Documents

1. **SEQUENTIAL_PLAN_UPDATED.md** - Original plan with detailed rationale
2. **antigravity-power-user-insights.md** - Power user patterns and anti-patterns
3. **DESIGN_SYSTEM_AUDIT.md** - Initial audit findings
4. **wv-wild-blueprint.md** - Project context and constitutional principles

---

## ✅ Ready to Execute

This plan is **100% ready** for Antigravity IDE. Just:
1. Open Manager Surface
2. Paste Master Prompt
3. Let agents work
4. Verify Artifacts after each phase

**Total time: 10-15 hours** (with parallel execution)

Good luck! 🚀
