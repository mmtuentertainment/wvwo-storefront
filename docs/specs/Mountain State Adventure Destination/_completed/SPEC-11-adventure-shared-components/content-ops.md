# SPEC-11 Content Ops: Adventure Shared Components Bundle

**Type:** Code/Design (3 Astro components)
**Workflow:** Traditional software development (analyze → design → code → Kim review on 1 component only)
**Timeline:** 12-14 hours (Matt), 10 min (Kim - optional)

---

## Matt's Workflow (3 Components)

### **Component 1: AdventureGettingThere.astro** (4 hours)

**Purpose:** Directions from shop + from I-79 (dual-audience pattern)

**Scout Mission:**
```bash
# Analyze Summersville Lake "Getting There" section
Read wv-wild-web/src/pages/near/summersville-lake.astro (Getting There section)
```

**Design API:**
```typescript
interface Props {
  fromShop: string;      // "Head south on US-19 for 30 min"
  fromI79: string;       // "Take Exit 67, follow signs"
  driveTimeShop: string; // "30 min"
  driveTimeI79: string;  // "35 min from Exit 67"
}
```

**Implementation:**
- 2-route tabs or sections (From Shop, From I-79)
- Map embed (optional, iframe or static image)
- Typography: font-body for directions (Kim's voice)
- Icons: map-pin, navigation (sign-green)

---

### **Component 2: AdventureGearChecklist.astro** (3 hours)

**Purpose:** What to bring (specific gear per adventure type)

**Scout Mission:**
```bash
# Analyze gear sections across pages
Read wv-wild-web/src/content/adventures/spring-gobbler-burnsville.md (gear list)
```

**Design API:**
```typescript
interface Props {
  gearItems: string[];  // From adventure.data.gear
  shopLinks?: boolean;  // Link gear to shop products?
}
```

**Implementation:**
- Bulleted list or grid of gear items
- Optional: Link each item to shop product page
- Typography: font-body for items
- Checkboxes or bullets (ul/li)
- CTA: "Get your gear at the shop"

---

### **Component 3: AdventureRelatedShop.astro** (4 hours)

**Purpose:** Product recommendations (specific products for this adventure)

**Scout Mission:**
```bash
# Check how products link to adventures
Read wv-wild-web/src/content.config.ts (related_adventures field in products schema)
```

**Design API:**
```typescript
interface Props {
  adventureSlug: string;           // Current adventure
  maxProducts?: number;            // Default 3-4
  products?: CollectionEntry<'products'>[]; // Optional override
}
```

**Implementation:**
- Query products with related_adventures including this adventure
- Display 3-4 product cards
- CTA: "Shop All [Category] Gear"
- Typography: font-display for section heading
- Grid: responsive product cards

---

## Kim's Input Needed

**Type:** Design review (OPTIONAL, 1 component only)

**When:** After Matt completes AdventureGettingThere (most Kim-voice dependent)

**Messenger Prompt (Matt sends):**

```
Hi Kim! I built the "Getting There" directions section for adventure pages.

Quick optional review - does this layout work?

[Attach screenshot showing 2 routes: From Shop vs From I-79]

1️⃣ DUAL ROUTES: Is showing "From Shop" + "From I-79" helpful? Or just one route?

2️⃣ DIRECTIONS VOICE: I used your style ("Head south on US-19"). Sound right?

TOTALLY OPTIONAL - if you don't respond, I'll just use this layout.

Thanks!
```

**Kim's Response:** Optional (if she has time/opinion)

**Matt's Action:**
- If Kim responds: Adjust based on feedback
- If no response after 7 days: Proceed (component is fine)

---

## Deliverables

**Code:**
- [ ] `AdventureGettingThere.astro` (~60 LOC)
- [ ] `AdventureGearChecklist.astro` (~50 LOC)
- [ ] `AdventureRelatedShop.astro` (~80 LOC)

**Total:** ~190 LOC (3 components)

**Testing:**
- [ ] Each component renders with real adventure data
- [ ] GettingThere shows 2 routes correctly
- [ ] GearChecklist maps gear array to bullets
- [ ] RelatedShop queries products correctly

**Quality Gates:**
- [ ] TypeScript compiles
- [ ] Build passes
- [ ] WVWO aesthetic compliant
- [ ] Reusable across all adventure types

---

## Success Criteria

**Bundle is DONE when:**
- ✅ All 3 components render without errors
- ✅ GettingThere: Dual-route pattern works
- ✅ GearChecklist: Maps gear array to UI
- ✅ RelatedShop: Queries products with related_adventures field
- ✅ (Optional) Kim approves GettingThere layout
- ✅ Reusable for all 42 destinations

**Blocked By:** Nothing (SPEC-06 schema has all needed fields)

**Blocks:** Adventure detail pages (need these sections)

---

**Grand love ya!** 🦌🏔️
