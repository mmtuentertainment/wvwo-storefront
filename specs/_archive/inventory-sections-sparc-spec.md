# SPARC Task Specification: Inventory Sections Update

## META
- **Version**: 1.0
- **Generated**: 2025-12-15
- **Methodology**: First-Party Source + Authentic Naming
- **Source**: Direct from Kim (store owner) - December 2025

---

## 1. SPECIFICATION

### 1.1 Objective
Update all inventory/category references across the codebase to use Kim's official 12 store sections. This is first-party source data that supersedes any previous category assumptions.

### 1.2 Context
| Field | Value |
|-------|-------|
| **Source** | Kim Utt (store owner) - direct communication |
| **Date Received** | December 2025 |
| **Priority** | HIGH - First-party data always supersedes assumptions |
| **Scope** | Data files, components, pages, schema markup |

### 1.3 Kim's Official 12 Inventory Sections

```text

1. Optics
2. Knives
3. Guns
4. Archery
5. Fishing
6. Rustic cabin goods
7. Boots
8. Ammo
9. Animal feed
10. Pet supplies
11. Family clothing
12. Seasonal garden supplies

```text

### 1.4 Success Criteria
- [ ] `store.json` updated with all 12 category entries
- [ ] `CategoryGrid.astro` displays Kim's exact section names
- [ ] `mission.md` updated with official inventory list
- [ ] Schema markup includes all 12 sections in `hasOfferCatalog`
- [ ] Shop page hero text reflects full inventory scope
- [ ] Build passes (`npm run build`)

### 1.5 Constraints
| Constraint | Reason |
|------------|--------|
| Kim's exact naming | First-party source - don't "improve" her words |
| No product invention | Categories only - products come later from Kim |
| Maintain existing products | Don't break current Ammo/Fishing/Firearms products |

---

## 2. PSEUDOCODE (Gap Analysis)

### 2.1 Current State Audit

```text
store.json categories (4):
├── Ammunition
├── Trout Fishing
├── Lake Fishing
└── Firearms

CategoryGrid.astro (5):
├── Firearms
├── Ammunition
├── Live Bait
├── Lures
└── Deer Corn & Feed

mission.md "What They Sell" (9):
├── Firearms
├── Ammunition
├── Hunting gear and apparel
├── Fishing tackle
├── Boots and outdoor footwear
├── Optics
├── Knives and tools
├── Country store items
└── Live bait

```text

### 2.2 Mapping Kim's Sections to Implementation

```text
Kim's Name          → store.json id    → Display Name
─────────────────────────────────────────────────────
Optics              → optics           → Optics
Knives              → knives           → Knives
Guns                → firearms         → Guns (keep existing products)
Archery             → archery          → Archery
Fishing             → fishing          → Fishing (merge creek/lake)
Rustic cabin goods  → rustic-cabin     → Rustic Cabin Goods
Boots               → boots            → Boots
Ammo                → ammo             → Ammo (keep existing products)
Animal feed         → animal-feed      → Animal Feed
Pet supplies        → pet-supplies     → Pet Supplies
Family clothing     → clothing         → Family Clothing
Seasonal garden     → garden           → Seasonal Garden Supplies

```text

---

## 3. ARCHITECTURE (File Changes)

### 3.1 Files to Modify

| File | Action | Details |
|------|--------|---------|
| `src/data/store.json` | EDIT | Add 8 new categories, update existing 4 |
| `src/components/CategoryGrid.astro` | EDIT | Update to Kim's 12 sections |
| `docs/mission.md` | EDIT | Replace "What They Sell" with official list |
| `src/layouts/Layout.astro` | EDIT | Expand schema hasOfferCatalog |
| `src/pages/shop/index.astro` | EDIT | Update hero text if needed |

### 3.2 store.json Category Structure

```json
{
  "categories": [
    {
      "id": "optics",
      "name": "Optics",
      "slug": "optics",
      "tagline": "See What Counts",
      "description": "Scopes, binoculars, and rangefinders for hunting and birding.",
      "image": "/images/categories/optics.jpg"
    },
    {
      "id": "knives",
      "name": "Knives",
      "slug": "knives",
      "tagline": "Sharp & Ready",
      "description": "Hunting knives, skinning knives, and multi-tools.",
      "image": "/images/categories/knives.jpg"
    },
    {
      "id": "firearms",
      "name": "Guns",
      "slug": "guns",
      "tagline": "Tools for the Woods",
      "description": "Rifles, shotguns, and handguns. All sales require federal background check.",
      "image": "/images/categories/firearms.jpg"
    },
    {
      "id": "archery",
      "name": "Archery",
      "slug": "archery",
      "tagline": "Quiet & Deadly",
      "description": "Bows, crossbows, arrows, and archery accessories.",
      "image": "/images/categories/archery.jpg"
    },
    {
      "id": "fishing",
      "name": "Fishing",
      "slug": "fishing",
      "tagline": "For Creek & Lake",
      "description": "Rods, reels, tackle, and live bait for trout streams and bass lakes.",
      "image": "/images/categories/fishing.jpg"
    },
    {
      "id": "rustic-cabin",
      "name": "Rustic Cabin Goods",
      "slug": "rustic-cabin",
      "tagline": "Country Comforts",
      "description": "Cabin decor, cast iron, and country living essentials.",
      "image": "/images/categories/rustic-cabin.jpg"
    },
    {
      "id": "boots",
      "name": "Boots",
      "slug": "boots",
      "tagline": "Walk the Hills",
      "description": "Hunting boots, work boots, and rubber boots for WV terrain.",
      "image": "/images/categories/boots.jpg"
    },
    {
      "id": "ammo",
      "name": "Ammo",
      "slug": "ammo",
      "tagline": "The WV Staple",
      "description": "Rifle, shotgun, and handgun ammunition.",
      "image": "/images/categories/ammo.jpg"
    },
    {
      "id": "animal-feed",
      "name": "Animal Feed",
      "slug": "animal-feed",
      "tagline": "For the Herd",
      "description": "Deer corn, bird seed, and livestock feed.",
      "image": "/images/categories/animal-feed.jpg"
    },
    {
      "id": "pet-supplies",
      "name": "Pet Supplies",
      "slug": "pet-supplies",
      "tagline": "For Your Hunting Buddies",
      "description": "Dog food, treats, and supplies for hunting dogs and pets.",
      "image": "/images/categories/pet-supplies.jpg"
    },
    {
      "id": "clothing",
      "name": "Family Clothing",
      "slug": "family-clothing",
      "tagline": "Dress for the Outdoors",
      "description": "Camo, blaze orange, work wear, and outdoor apparel for the whole family.",
      "image": "/images/categories/clothing.jpg"
    },
    {
      "id": "garden",
      "name": "Seasonal Garden Supplies",
      "slug": "garden",
      "tagline": "Grow Your Own",
      "description": "Seeds, plants, and garden supplies in season.",
      "image": "/images/categories/garden.jpg"
    }
  ]
}

```text

### 3.3 Schema.org Update

```json
"hasOfferCatalog": {
  "@type": "OfferCatalog",
  "name": "Products & Services",
  "itemListElement": [
    {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Optics"}},
    {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Knives"}},
    {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Guns"}},
    {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Archery"}},
    {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Fishing"}},
    {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Rustic Cabin Goods"}},
    {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Boots"}},
    {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Ammo"}},
    {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Animal Feed"}},
    {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Pet Supplies"}},
    {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Family Clothing"}},
    {"@type": "Offer", "itemOffered": {"@type": "Product", "name": "Seasonal Garden Supplies"}},
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "FFL Transfers"}},
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "WV Hunting Licenses"}},
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "WV Fishing Licenses"}}
  ]
}

```text

---

## 4. REFINEMENT (Voice & Naming)

### 4.1 Naming Guidelines

**USE Kim's exact words:**
- "Guns" not "Firearms" (for display)
- "Ammo" not "Ammunition" (for display)
- "Rustic cabin goods" exactly as stated
- "Family clothing" exactly as stated
- "Seasonal garden supplies" exactly as stated

**Internal IDs can differ:**
- `id: "firearms"` → `name: "Guns"` (keeps existing product links)
- `id: "ammo"` → `name: "Ammo"` (keeps existing product links)

### 4.2 Tagline Voice

Taglines should sound like Kim, not marketing:

```text
✅ "For the Herd" (animal feed)
✅ "The WV Staple" (ammo)
✅ "Walk the Hills" (boots)

❌ "Premium Footwear Solutions"
❌ "Elevate Your Outdoor Experience"

```text

---

## 5. COMPLETION (Implementation Plan)

### 5.1 Phase 1: Data Layer
1. Update `store.json` with 12 categories
2. Migrate existing products to correct category IDs
3. Verify build passes

### 5.2 Phase 2: Display Layer
1. Update `CategoryGrid.astro` with Kim's sections
2. Update shop page category filter
3. Update schema markup in Layout.astro

### 5.3 Phase 3: Documentation
1. Update `mission.md` with official list
2. Consider adding to constitution as reference

### 5.4 Testing Checklist
- [ ] `npm run build` passes
- [ ] Shop page displays all 12 categories
- [ ] Existing product pages still work
- [ ] Schema validates at schema.org/validator
- [ ] Category links resolve correctly

### 5.5 Commit Format

```text
feat(shop): update inventory sections to Kim's official 12 categories

First-party source data from store owner (December 2025):
- Optics, Knives, Guns, Archery, Fishing, Rustic cabin goods
- Boots, Ammo, Animal feed, Pet supplies, Family clothing
- Seasonal garden supplies

Updates:
- store.json: 12 category entries (up from 4)
- CategoryGrid.astro: Kim's exact section names
- Layout.astro: schema hasOfferCatalog expanded
- mission.md: official inventory list

Source: Direct communication with Kim Utt (store owner)

```text

---

## 6. SOURCE DOCUMENTATION

### First-Party Source
| Field | Value |
|-------|-------|
| **Source** | Kim Utt |
| **Role** | Store Owner |
| **Date** | December 2025 |
| **Method** | Direct communication |
| **Verbatim Quote** | "Inventory. Sections. Optics, knives, guns, archery, fishing, rustic cabin goods, boots, ammo, animal feed, pet supplies, family clothing, and seasonal garden supplies." |

### Supersedes
- Previous category assumptions in store.json
- Marketing-derived category names
- Any AI-generated inventory guesses

---

## 7. NOTES

- This is FIRST-PARTY source data - treat as authoritative
- Kim's naming takes precedence over "better" marketing names
- Products will be added later as Kim provides them
- Some categories may be empty initially (category placeholder only)
- Don't add fake products to fill categories
