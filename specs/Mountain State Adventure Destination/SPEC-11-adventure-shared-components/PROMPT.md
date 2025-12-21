# SPEC-11: Adventure Shared Components Bundle

**Objective**: Create 3 reusable shared components for adventure pages: AdventureGettingThere.astro, AdventureGearChecklist.astro, and AdventureRelatedShop.astro. These components provide consistent "Getting There", "Gear Checklist", and "Shop Related Items" sections across all adventure detail pages.

---

## Agent Selection

**Recommended Swarm**: 5-agent hierarchical coordination
**Topology**: Hierarchical (coordinator → researcher + architect → 3 parallel coders)

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates 4-agent swarm for 3 component implementations |
| `researcher` | **Scout** | Analyzes existing sections in summersville-lake.astro |
| `architect` | **Designer** | Designs APIs for all 3 components with slot patterns |
| `coder` (x3) | **Builders** | Each implements one component in parallel |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading (BEFORE Starting)


```bash
# Parallel context retrieval (Opus 4.5 strength)
npx agentdb@latest reflexion retrieve "shared components" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "Astro slots composition" --k 10 --synthesize-context
npx agentdb@latest skill search "summersville-lake.astro sections" 5
npx agentdb@latest reflexion retrieve "checklist UI patterns" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "CTA sections" --k 10 --synthesize-context
npx agentdb@latest reflexion critique-summary "WVWO"
npx agentdb@latest db stats

```

---

## Hierarchical Swarm Setup

**Coordinator initializes**:

```bash
npx claude-flow@alpha swarm init --topology hierarchical --max-agents 5
npx claude-flow@alpha agent spawn researcher --role "Analyze summersville-lake sections"
npx claude-flow@alpha agent spawn architect --role "Design 3 component APIs"
npx claude-flow@alpha agent spawn coder --role "Implement GettingThere" --id coder-1
npx claude-flow@alpha agent spawn coder --role "Implement GearChecklist" --id coder-2
npx claude-flow@alpha agent spawn coder --role "Implement RelatedShop" --id coder-3

```

**Coordination Memory**:

```bash
# Coordinator stores task breakdown
npx claude-flow@alpha hooks post-edit \
  --file "swarm-coordination" \
  --memory-key "swarm/spec-11/tasks" \
  --value '{"researcher":"analyze sections","architect":"design 3 APIs","coder-1":"GettingThere","coder-2":"GearChecklist","coder-3":"RelatedShop"}'

```

---

## WVWO Context (Critical Constraints)

**From CLAUDE.md**:
- **Typography**: font-display for headings, font-body for content
- **Colors**: brand-brown headings, sign-green accents, brand-cream backgrounds
- **Layout**: Container max-width, generous padding, responsive spacing
- **Voice**: Kim's authentic tone (directions, gear tips, product recommendations)
- **Components**: Prefer Astro for static content, React only if interactive

**From Frontend Aesthetics**:

```css
/* Section Pattern */
.adventure-section {
  @apply py-12 md:py-16;
}
.section-heading {
  @apply text-3xl md:text-4xl font-display font-bold text-brand-brown mb-6;
}

```

---

## Task Breakdown (Coordinator → Agents)

### 1️⃣ Researcher: Analyze Existing Sections

**Scout Mission**:

```bash
# Read summersville-lake.astro full file to analyze sections
Read "./wv-wild-web\src\pages\adventures\summersville-lake.astro"

```

**Key Patterns to Extract**:

**A. Getting There Section** (find driving directions pattern):
- Heading structure
- Directions format (from I-79 Exit 57)
- Link styling for "Open in Google Maps"
- Layout (single column text or multi-column)

**B. Gear Checklist Section** (find checklist pattern):
- Heading structure
- List format (checkboxes? icons? plain bullets?)
- Item grouping (categories? flat list?)
- Styling (grid? columns? stacked?)

**C. Shop Related Items Section** (find CTA pattern):
- Heading structure
- Product recommendations (manual list? categories?)
- CTA button styling
- Layout (cards? simple list?)

**Deliverable**: Pattern analysis stored in memory

```bash
npx claude-flow@alpha hooks post-task \
  --task-id "researcher-sections-analysis" \
  --memory-key "swarm/spec-11/section-patterns" \
  --value '{"gettingThere":"directions + map link","gearChecklist":"icon list","shopCTA":"category links"}'

```

### 2️⃣ Architect: Design 3 Component APIs

**Design Mission**: Create consistent, flexible APIs for all 3 components.

#### A. AdventureGettingThere API


```typescript
interface Props {
  title?: string;                    // Default: "Getting There"
  fromLocation?: string;             // Default: "From our shop (121 WV-82)"
  directions: string;                // Rich HTML or plain text directions
  mapLink?: string;                  // Google Maps URL (optional)
  driveTime?: string;                // "25 minutes" (optional)
  distance?: string;                 // "18 miles" (optional)
}

// Slot: default (for additional transportation notes)

```

**Design Notes**:
- Support HTML in directions for bold text, lists
- Map link opens in new tab with external icon
- Display drive time + distance if provided
- Kim's voice for directions ("Head south on US-19...")

#### B. AdventureGearChecklist API


```typescript
interface GearItem {
  name: string;                      // "Sunscreen"
  optional?: boolean;                // Mark as optional vs required
  icon?: string;                     // Optional icon name
}

interface Props {
  title?: string;                    // Default: "Gear Checklist"
  intro?: string;                    // Optional intro text
  items: GearItem[];                 // Array of gear items
  columns?: 1 | 2 | 3;              // Grid columns (default: 2)
}

// Slot: "footer" (for gear purchase CTA)

```

**Design Notes**:
- Checkmark icon for required items, circle for optional
- Responsive grid (1 column mobile, 2-3 desktop)
- Optional intro text in Kim's voice
- Footer slot for "Don't have this gear? Visit our shop" CTA

#### C. AdventureRelatedShop API


```typescript
interface RelatedCategory {
  name: string;                      // "Fishing Gear"
  description?: string;              // Brief description
  href: string;                      // Link to category/product page
  icon?: string;                     // Optional icon
}

interface Props {
  title?: string;                    // Default: "Shop Related Items"
  intro?: string;                    // Kim's voice intro
  categories: RelatedCategory[];     // Array of related categories
  ctaText?: string;                  // Default: "Visit Our Shop"
  ctaHref?: string;                  // Default: "/shop"
}

```

**Design Notes**:
- Grid of category cards (2 columns mobile, 3-4 desktop)
- Each card links to shop category
- Main CTA button at bottom
- Kim's voice for intro ("Planning a trip? We've got you covered.")

**Deliverable**: API specs stored in memory

```bash
npx claude-flow@alpha hooks post-edit \
  --file "AdventureShared-APIs" \
  --memory-key "swarm/spec-11/apis"

```

### 3️⃣ Coder-1: Implement AdventureGettingThere.astro

**Implementation**:


```astro
---
// File: src/components/adventure/AdventureGettingThere.astro
interface Props {
  title?: string;
  fromLocation?: string;
  directions: string;
  mapLink?: string;
  driveTime?: string;
  distance?: string;
}

const {
  title = "Getting There",
  fromLocation = "From our shop (121 WV-82, Birch River)",
  directions,
  mapLink,
  driveTime,
  distance,
} = Astro.props;
---

<section class="adventure-getting-there py-12 md:py-16 bg-white">
  <div class="container mx-auto px-4 max-w-4xl">
    <!-- Heading -->
    <h2 class="text-3xl md:text-4xl font-display font-bold text-brand-brown mb-6">
      {title}
    </h2>

    <!-- From Location -->
    {fromLocation && (
      <p class="text-lg font-display font-medium text-sign-green mb-4">
        {fromLocation}
      </p>
    )}

    <!-- Drive Time & Distance -->
    {(driveTime || distance) && (
      <div class="flex flex-wrap gap-4 mb-6 text-brand-mud/60">
        {driveTime && (
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="font-body">{driveTime}</span>
          </div>
        )}
        {distance && (
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span class="font-body">{distance}</span>
          </div>
        )}
      </div>
    )}

    <!-- Directions (supports HTML) -->
    <div class="prose prose-lg max-w-none mb-6 font-body text-brand-mud">
      <Fragment set:html={directions} />
    </div>

    <!-- Map Link -->
    {mapLink && (
      <a
        href={mapLink}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-3 bg-sign-green text-white font-display font-bold rounded-sm hover:bg-sign-green/90 transition-colors"
      >
        Open in Google Maps
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    )}

    <!-- Default slot for additional notes -->
    <div class="mt-6">
      <slot />
    </div>
  </div>
</section>

```

**Save Location**: `./wv-wild-web\src\components\adventure\AdventureGettingThere.astro`

### 4️⃣ Coder-2: Implement AdventureGearChecklist.astro

**Implementation**:


```astro
---
// File: src/components/adventure/AdventureGearChecklist.astro
interface GearItem {
  name: string;
  optional?: boolean;
  icon?: string;
}

interface Props {
  title?: string;
  intro?: string;
  items: GearItem[];
  columns?: 1 | 2 | 3;
}

const {
  title = "Gear Checklist",
  intro,
  items,
  columns = 2,
} = Astro.props;

const gridClass = columns === 1 ? 'grid-cols-1' : columns === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2';
---

<section class="adventure-gear-checklist py-12 md:py-16 bg-brand-cream">
  <div class="container mx-auto px-4 max-w-4xl">
    <!-- Heading -->
    <h2 class="text-3xl md:text-4xl font-display font-bold text-brand-brown mb-6">
      {title}
    </h2>

    <!-- Intro -->
    {intro && (
      <p class="text-lg font-body text-brand-mud mb-8">
        {intro}
      </p>
    )}

    <!-- Gear Grid -->
    <div class={`grid ${gridClass} gap-4`}>
      {items.map((item) => (
        <div class="flex items-start gap-3 p-4 bg-white rounded-sm">
          <!-- Icon/Checkbox -->
          <div class="flex-shrink-0 mt-0.5">
            {item.optional ? (
              <svg class="w-6 h-6 text-brand-mud/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke-width="2" />
              </svg>
            ) : (
              <svg class="w-6 h-6 text-sign-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>

          <!-- Item Name -->
          <div class="flex-1">
            <span class="font-body text-brand-brown">
              {item.name}
            </span>
            {item.optional && (
              <span class="ml-2 text-sm text-brand-mud/60 italic">
                (optional)
              </span>
            )}
          </div>
        </div>
      ))}
    </div>

    <!-- Footer slot (for shop CTA) -->
    <div class="mt-8">
      <slot name="footer" />
    </div>
  </div>
</section>

```

**Save Location**: `./wv-wild-web\src\components\adventure\AdventureGearChecklist.astro`

### 5️⃣ Coder-3: Implement AdventureRelatedShop.astro

**Implementation**:


```astro
---
// File: src/components/adventure/AdventureRelatedShop.astro
interface RelatedCategory {
  name: string;
  description?: string;
  href: string;
  icon?: string;
}

interface Props {
  title?: string;
  intro?: string;
  categories: RelatedCategory[];
  ctaText?: string;
  ctaHref?: string;
}

const {
  title = "Shop Related Items",
  intro = "Planning a trip? We've got you covered.",
  categories,
  ctaText = "Visit Our Shop",
  ctaHref = "/shop",
} = Astro.props;
---

<section class="adventure-related-shop py-12 md:py-16 bg-white">
  <div class="container mx-auto px-4 max-w-6xl">
    <!-- Heading -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-display font-bold text-brand-brown mb-4">
        {title}
      </h2>
      {intro && (
        <p class="text-lg font-body text-brand-mud max-w-2xl mx-auto">
          {intro}
        </p>
      )}
    </div>

    <!-- Category Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {categories.map((category) => (
        <a
          href={category.href}
          class="group block p-6 bg-brand-cream border-l-4 border-l-sign-green rounded-sm hover:border-l-brand-orange hover:-translate-y-0.5 transition-all duration-300"
        >
          <h3 class="text-xl font-display font-bold text-brand-brown mb-2 group-hover:text-sign-green transition-colors">
            {category.name}
          </h3>
          {category.description && (
            <p class="text-sm font-body text-brand-mud/80">
              {category.description}
            </p>
          )}
        </a>
      ))}
    </div>

    <!-- Main CTA -->
    <div class="text-center">
      <a
        href={ctaHref}
        class="inline-block px-8 py-4 bg-sign-green text-white font-display font-bold text-lg rounded-sm hover:bg-sign-green/90 transition-colors"
      >
        {ctaText}
      </a>
    </div>
  </div>
</section>

```

**Save Location**: `./wv-wild-web\src\components\adventure\AdventureRelatedShop.astro`

---

## Usage Examples

### Complete Adventure Page Example


```astro
---
// src/pages/adventures/summersville-lake.astro
import AdventureHero from '../../components/adventure/AdventureHero.astro';
import AdventureQuickStats from '../../components/adventure/AdventureQuickStats.astro';
import AdventureGettingThere from '../../components/adventure/AdventureGettingThere.astro';
import AdventureGearChecklist from '../../components/adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '../../components/adventure/AdventureRelatedShop.astro';

const quickStats = [
  { label: 'Distance from Shop', value: '18 miles', icon: 'distance' },
  { label: 'Drive Time', value: '25 min', icon: 'time' },
  { label: 'Best Time', value: 'May-Oct', icon: 'calendar' },
  { label: 'Facilities', value: 'Yes', icon: 'check' },
];

const gearList = [
  { name: 'Fishing rod & tackle', optional: false },
  { name: 'Life jackets (required on water)', optional: false },
  { name: 'Sunscreen (SPF 30+)', optional: false },
  { name: 'Cooler for drinks', optional: true },
  { name: 'Camera for cliff photos', optional: true },
];

const relatedCategories = [
  {
    name: 'Fishing Gear',
    description: 'Rods, reels, tackle for bass and walleye',
    href: '/shop/fishing',
  },
  {
    name: 'Water Sports',
    description: 'Kayaks, life jackets, water safety',
    href: '/shop/water-sports',
  },
  {
    name: 'Camping',
    description: 'Tents, coolers, camp cookware',
    href: '/shop/camping',
  },
];
---

<AdventureHero
  title="Summersville Lake"
  description="Crystal-clear waters for fishing, kayaking, and cliff jumping."
  difficulty="easy"
  season="Year-round"
  image="/images/adventures/summersville-lake.jpg"
  imageAlt="Aerial view of Summersville Lake"
/>

<AdventureQuickStats stats={quickStats} />

<AdventureGettingThere
  directions="<p>Head south on <strong>US-19 South</strong> from our shop for 18 miles. Turn right onto <strong>Summersville Lake Road</strong>. Follow signs to the marina.</p>"
  mapLink="https://maps.google.com/?q=Summersville+Lake+WV"
  driveTime="25 minutes"
  distance="18 miles"
>
  <p class="text-brand-mud/80 mt-4">
    <strong>Pro tip:</strong> Get there early on summer weekends - parking fills up fast.
  </p>
</AdventureGettingThere>

<AdventureGearChecklist
  intro="Don't forget these essentials for a safe, fun day on the lake."
  items={gearList}
  columns={2}
>
  <div slot="footer" class="text-center">
    <p class="font-body text-brand-mud mb-4">
      Don't have this gear? We can help.
    </p>
    <a href="/shop" class="inline-block px-6 py-3 bg-sign-green text-white font-display font-bold rounded-sm hover:bg-sign-green/90">
      Shop Fishing & Water Gear
    </a>
  </div>
</AdventureGearChecklist>

<AdventureRelatedShop
  intro="Everything you need for your Summersville Lake adventure."
  categories={relatedCategories}
/>

```

---

## Code Quality Checks (All 3 Components)

### AdventureGettingThere
- [ ] Supports HTML in directions (Fragment set:html)
- [ ] Map link opens in new tab (target="_blank" rel="noopener")
- [ ] Drive time + distance icons match design system
- [ ] Default slot works for additional notes
- [ ] Typography: font-display headings, font-body content

### AdventureGearChecklist
- [ ] Required items show checkmark icon (sign-green)
- [ ] Optional items show circle icon + "(optional)" text
- [ ] Responsive grid (1 col mobile → 2-3 desktop)
- [ ] Footer slot works for shop CTA
- [ ] Background: brand-cream for contrast

### AdventureRelatedShop
- [ ] Category cards use border-l-4 pattern
- [ ] Hover effect: border color change + translateY
- [ ] Responsive grid (1 col mobile → 3 desktop)
- [ ] Main CTA button styled consistently
- [ ] Typography: font-display headings, font-body descriptions

---

## Session End Protocol

**Coordinator runs**:

```bash
# Store success pattern for all 3 components
npx agentdb@latest reflexion store "wvwo-session" "SPEC-11-getting-there" 1.0 true "AdventureGettingThere with HTML directions, map link, drive stats"
npx agentdb@latest reflexion store "wvwo-session" "SPEC-11-gear-checklist" 1.0 true "AdventureGearChecklist with required/optional icons, responsive grid, footer slot"
npx agentdb@latest reflexion store "wvwo-session" "SPEC-11-related-shop" 1.0 true "AdventureRelatedShop with category cards, border-l-4 pattern, main CTA"

# Export session metrics
npx claude-flow@alpha hooks session-end --export-metrics true

# Summary to user
echo "SPEC-11 Complete: 3 shared adventure components ready:"
echo "  - AdventureGettingThere.astro"
echo "  - AdventureGearChecklist.astro"
echo "  - AdventureRelatedShop.astro"
echo "Location: wv-wild-web/src/components/adventure/"

```

---

## Success Criteria

✅ **All 3 Components Implemented**:
- AdventureGettingThere: Directions + map link + drive stats
- AdventureGearChecklist: Required/optional items + responsive grid
- AdventureRelatedShop: Category cards + main CTA

✅ **WVWO Compliance**:
- Typography: font-display + font-body throughout
- Colors: brand-brown, sign-green, brand-cream, brand-mud
- Layout: Responsive grids, container max-width
- Voice: Kim's authentic tone in default content
- Corners: rounded-sm (not rounded-md/lg)

✅ **Quality Checks**:
- Slot system working (default + named slots)
- Responsive behavior validated (mobile/tablet/desktop)
- Accessibility: Semantic HTML, alt text, external link rel
- Integration tested with complete adventure page example
- Patterns stored in AgentDB for future shared components

---

**Coordinator**: Execute this prompt via hierarchical swarm with 3 parallel coders, coordinate through memory, store learnings in AgentDB.
