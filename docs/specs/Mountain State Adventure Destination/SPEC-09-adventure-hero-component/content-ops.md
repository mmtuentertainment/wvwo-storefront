# SPEC-09 Content Ops: Adventure Hero Component

**Type:** Code/Design (Astro component)
**Workflow:** Traditional software development (analyze → design → code → Kim design review)
**Timeline:** 10-12 hours (Matt), 15 min (Kim)

---

## Matt's Workflow (Code-Focused)

### **Phase 1: Analyze Existing Hero Pattern** (1.5 hours)

**Scout Mission:**
```bash
# Read Summersville Lake hero (gold standard from Episode 85)
Read wv-wild-web/src/pages/near/summersville-lake.astro (lines 67-92)

# Check other hero sections
Read wv-wild-web/src/pages/near/index.astro (hero pattern)

# WVWO aesthetic requirements
Read CLAUDE.md (hero section guidelines)
```

**Extract:**
- bg-brand-brown with camo overlay pattern
- Badge system (season, difficulty, type badges)
- Responsive layout (stacked mobile, side-by-side desktop)
- Image position (right side on desktop)
- Typography hierarchy (font-display for title, font-body for description)

---

### **Phase 2: Design Component API** (2 hours)

**Architect Mission:**

Design AdventureHero.astro with slots for flexibility:

```astro
---
interface Props {
  title: string;
  description: string;
  location: string;
  difficulty: 'easy' | 'moderate' | 'challenging' | 'rugged';
  seasons: string[];  // ['spring', 'summer']
  image?: { src: string; alt: string };
}
---

<!-- Hero structure with slots -->
<section class="bg-brand-brown text-white relative overflow-hidden">
  <!-- Camo overlay -->
  <div class="absolute inset-0 bg-camo opacity-5"></div>

  <!-- Content -->
  <slot name="content" />

  <!-- Optional custom sections -->
  <slot />
</section>
```

**WVWO Compliance:**
- Camo texture overlay (opacity-5, pointer-events-none)
- Badge colors (season: brand-cream, difficulty: sign-green)
- Responsive (py-16 md:py-24)
- Asymmetric layout (text-heavy left, image right)

---

### **Phase 3: Implement Component** (5 hours)

**Worker Mission:**

```bash
# Create file
Write wv-wild-web/src/components/adventures/AdventureHero.astro

# Implement:
# - Camo background pattern (CSS or SVG)
# - Badge system (difficulty, season tags)
# - Responsive image (hidden md:block)
# - Slot-based composition (title, description, custom content)
# - WVWO typography (font-display font-black for title)
```

**Code Quality:**
- No hardcoded content (all via props/slots)
- Camo pattern reusable (can apply to other sections)
- Badges match WVWO design system

---

### **Phase 4: Create Example Page** (2 hours)

**Test with Real Data:**
```astro
---
// Example: Burnsville Turkey page
import AdventureHero from '@/components/adventures/AdventureHero.astro';
const adventure = await getEntry('adventures', 'spring-gobbler-burnsville');
---

<AdventureHero
  title={adventure.data.title}
  description={adventure.data.description}
  location={adventure.data.location}
  difficulty={adventure.data.difficulty}
  seasons={adventure.data.season}
  image={adventure.data.images?.[0]}
>
  <Fragment slot="content">
    <!-- Custom hero content -->
  </Fragment>
</AdventureHero>
```

---

## Kim's Input Needed

**Type:** Design review (1-time, 15 minutes)

**When:** After Matt creates example page

**Messenger Prompt (Matt sends):**

```
Hi Kim! I built the hero section for adventure pages (the big header at the top).

Can you look at this screenshot:

[Attach screenshot of Burnsville Turkey page hero]

Tell me:

1️⃣ LAYOUT: Text on left, image on right - does this work? Or flip it?

2️⃣ BADGES: I added season + difficulty badges. Too much? Too little?

3️⃣ CAMO PATTERN: I added a subtle camo texture to the brown background. Keep it or too busy?

4️⃣ OVERALL VIBE: Does this feel like WV Wild Outdoors, or too fancy?

No rush! Just want to make sure the big header section feels right before I use it for all pages.

Thanks!
```

**Kim's Response Time:** 3-7 days (async)

**Matt's Action:**
- Adjust based on Kim feedback
- If major changes (e.g., "flip layout"), rebuild and re-screenshot
- Get final approval before using across all adventures

---

## Deliverables

**Code:**
- [ ] `wv-wild-web/src/components/adventures/AdventureHero.astro` (~120 LOC)
- [ ] Camo background pattern (CSS or inline SVG)
- [ ] Badge components (season pills, difficulty badge)
- [ ] Slot-based composition (flexible content)

**Example:**
- [ ] Test page using AdventureHero with real adventure data
- [ ] Screenshot for Kim review

**Documentation:**
- [ ] Component usage docs (how to use slots)
- [ ] Kim's design approval

**Quality Gates:**
- [ ] Renders correctly with adventure data
- [ ] Responsive (mobile stacked, desktop side-by-side)
- [ ] WVWO aesthetic (camo, badges, typography)
- [ ] Kim approves: "Feels like us"

---

## Success Criteria

**Component is DONE when:**
- ✅ Builds without errors
- ✅ Slots work correctly (can customize content per adventure)
- ✅ Camo pattern renders (not too busy)
- ✅ Badges display season + difficulty
- ✅ Kim design approval
- ✅ Reusable for all adventure types (WMA, Lake, River, etc.)

**Blocked By:** Nothing (can start immediately)

**Blocks:** Adventure detail pages (need hero to build pages)

---

**Grand love ya!** 🦌🏔️
