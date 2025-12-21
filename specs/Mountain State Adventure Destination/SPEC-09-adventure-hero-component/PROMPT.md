# SPEC-09: Adventure Hero Component

**Objective**: Create a reusable AdventureHero.astro component with slots for flexible content, following WVWO aesthetic (brand-brown camo pattern, badge system, responsive image).

---

## Agent Selection

**Recommended Swarm**: 4-agent hierarchical coordination
**Topology**: Hierarchical (coordinator → researcher + architect → coder)

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates 3-agent swarm for hero component design → implementation |
| `researcher` | **Scout** | Analyzes summersville-lake.astro hero section (lines 67-92) |
| `architect` | **Designer** | Designs reusable hero API with slots for title, description, badges, image |
| `coder` | **Builder** | Implements AdventureHero.astro with WVWO camo pattern and responsive layout |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading (BEFORE Starting)

```bash
# Parallel context retrieval (Opus 4.5 strength)
npx agentdb@latest reflexion retrieve "hero sections" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "badges" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "brand-brown camo pattern" --k 10 --synthesize-context
npx agentdb@latest skill search "summersville-lake.astro hero" 5
npx agentdb@latest reflexion retrieve "Astro slots composition" --k 10 --synthesize-context
npx agentdb@latest reflexion critique-summary "WVWO"
npx agentdb@latest db stats

```

---

## Hierarchical Swarm Setup

**Coordinator initializes**:

```bash
npx claude-flow@alpha swarm init --topology hierarchical --max-agents 4
npx claude-flow@alpha agent spawn researcher --role "Analyze summersville-lake hero"
npx claude-flow@alpha agent spawn architect --role "Design AdventureHero API"
npx claude-flow@alpha agent spawn coder --role "Implement component"

```

**Coordination Memory**:

```bash
# Coordinator stores task breakdown
npx claude-flow@alpha hooks post-edit \
  --file "swarm-coordination" \
  --memory-key "swarm/spec-09/tasks" \
  --value '{"researcher":"analyze hero patterns","architect":"design slot API","coder":"implement with camo"}'

```

---

## WVWO Context (Critical Constraints)

**From CLAUDE.md**:

- **Aesthetic**: Weathered earth palette, brand-brown camo background pattern
- **Typography**: font-display (Bitter) for heading, font-body (Noto Sans) for description
- **Layout**: Asymmetric layout (text-heavy left, photo right on desktop)
- **Badges**: Difficulty + season badges with WVWO colors
- **Responsive**: Stacked mobile, side-by-side desktop

**From Frontend Aesthetics**:

```css
/* Hero Pattern */
.adventure-hero {
  background: linear-gradient(135deg, #3E2723 0%, #5D4037 100%);
  /* Camo pattern overlay via CSS or SVG */
}

```

---

## Task Breakdown (Coordinator → Agents)

### 1️⃣ Researcher: Analyze Existing Hero Section

**Scout Mission**:

```bash
# Read summersville-lake.astro hero section
Read "./wv-wild-web\src\pages\adventures\summersville-lake.astro" --offset 67 --limit 26

```

**Key Patterns to Extract**:

- Background styling (brand-brown gradient + camo pattern)
- Badge placement and styling (difficulty, season)
- Heading hierarchy (h1 size, font-display)
- Description styling (font-body, text color)
- Image layout (aspect ratio, object-cover)
- Responsive breakpoints (mobile stacked, desktop grid)

**Deliverable**: Pattern analysis stored in memory

```bash
npx claude-flow@alpha hooks post-task \
  --task-id "researcher-hero-analysis" \
  --memory-key "swarm/spec-09/hero-patterns" \
  --value '{"bg":"brand-brown gradient","badges":"top badges","layout":"grid lg:grid-cols-2"}'

```

### 2️⃣ Architect: Design AdventureHero API

**Design Mission**:

```typescript
// AdventureHero.astro interface
interface Props {
  title: string;                      // Adventure name (h1)
  description: string;                // Lead paragraph
  difficulty: 'easy' | 'moderate' | 'advanced';
  season: string;                     // "Year-round", "Spring-Fall", etc.
  image: string;                      // Hero image path
  imageAlt: string;                   // Accessibility
  imagePosition?: 'center' | 'top' | 'bottom';  // object-position
}

// Slot system for flexible content
// - default slot: Additional content below description
// - "cta" slot: Call-to-action buttons

```

**Design Constraints**:

- **Background**: brand-brown gradient + subtle camo SVG pattern
- **Layout**: Grid with text content (lg:col-span-1) + image (lg:col-span-1)
- **Badges**: Absolute positioned top-left, stacked vertically
- **Responsive**: Mobile stacked (image first), desktop side-by-side
- **Typography**:
  - Title: `text-4xl md:text-5xl font-display font-bold text-brand-cream`
  - Description: `text-lg md:text-xl font-body text-brand-cream/90`

**Deliverable**: API spec stored in memory

```bash
npx claude-flow@alpha hooks post-edit \
  --file "AdventureHero-API" \
  --memory-key "swarm/spec-09/api"

```

### 3️⃣ Coder: Implement AdventureHero.astro

**Implementation Requirements**:

```astro
---
// File: src/components/adventure/AdventureHero.astro
interface Props {
  title: string;
  description: string;
  difficulty: 'easy' | 'moderate' | 'advanced';
  season: string;
  image: string;
  imageAlt: string;
  imagePosition?: 'center' | 'top' | 'bottom';
}

const {
  title,
  description,
  difficulty,
  season,
  image,
  imageAlt,
  imagePosition = 'center'
} = Astro.props;

const difficultyColors = {
  easy: 'bg-sign-green text-white',
  moderate: 'bg-brand-orange text-white',
  advanced: 'bg-brand-mud text-brand-cream',
};
---

<section class="adventure-hero relative overflow-hidden bg-gradient-to-br from-brand-brown to-brand-mud">
  <!-- Camo pattern overlay -->
  <div class="absolute inset-0 opacity-10">
    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="camo" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="20" fill="#5D4037" opacity="0.3"/>
          <circle cx="75" cy="75" r="15" fill="#4E342E" opacity="0.4"/>
          <circle cx="50" cy="60" r="18" fill="#6D4C41" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#camo)"/>
    </svg>
  </div>

  <div class="relative container mx-auto px-4 py-12 md:py-16">
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <!-- Content Column -->
      <div class="space-y-6 order-2 lg:order-1">
        <!-- Badges -->
        <div class="flex flex-wrap gap-3">
          <span class={`px-4 py-2 rounded-sm font-display font-bold text-sm ${difficultyColors[difficulty]}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          <span class="px-4 py-2 rounded-sm font-display font-bold text-sm bg-brand-cream text-brand-brown">
            {season}
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-cream leading-tight">
          {title}
        </h1>

        <!-- Description -->
        <p class="text-lg md:text-xl font-body text-brand-cream/90 leading-relaxed">
          {description}
        </p>

        <!-- Default slot for additional content -->
        <div class="adventure-hero__content">
          <slot />
        </div>

        <!-- CTA slot -->
        <div class="adventure-hero__cta flex flex-wrap gap-4">
          <slot name="cta" />
        </div>
      </div>

      <!-- Image Column -->
      <div class="order-1 lg:order-2">
        <div class="relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg">
          <img
            src={image}
            alt={imageAlt}
            class={`w-full h-full object-cover object-${imagePosition}`}
          />
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .adventure-hero {
    animation: gentle-reveal 0.8s ease both;
  }

  @keyframes gentle-reveal {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .adventure-hero {
      animation: none;
    }
  }
</style>

```

**Save Location**: `./wv-wild-web\src\components\adventure\AdventureHero.astro`

**Code Quality Checks**:

- [ ] Brand-brown gradient background matches WVWO palette
- [ ] Camo SVG pattern overlay at 10% opacity
- [ ] Badges use approved difficulty colors (sign-green, brand-orange, brand-mud)
- [ ] Typography uses font-display (Bitter) + font-body (Noto Sans)
- [ ] Responsive layout: mobile stacked, desktop grid-cols-2
- [ ] Image aspect-[4/3] with rounded-sm corners
- [ ] Slots work for flexible content (default + cta)
- [ ] Respects prefers-reduced-motion

**Usage Example**:

```astro
---
// Example: src/pages/adventures/summersville-lake.astro
import AdventureHero from '../../components/adventure/AdventureHero.astro';
---

<AdventureHero
  title="Summersville Lake"
  description="Crystal-clear waters for fishing, kayaking, and cliff jumping. Known as the 'Little Bahamas of the East' for its stunning blue-green color."
  difficulty="easy"
  season="Year-round"
  image="/images/adventures/summersville-lake-hero.jpg"
  imageAlt="Aerial view of Summersville Lake's pristine waters"
  imagePosition="center"
>
  <!-- Additional content via default slot -->
  <p class="text-brand-cream/80">
    Just 20 minutes from our shop, Summersville Lake offers 2,700 acres of
    adventure for the whole family.
  </p>

  <!-- CTA buttons via named slot -->
  <div slot="cta">
    <a href="#getting-there" class="btn-cta">
      Plan Your Visit
    </a>
    <a href="#gear-checklist" class="btn-ghost">
      What to Bring
    </a>
  </div>
</AdventureHero>

```

**Deliverable**: Working component + memory update

```bash
npx claude-flow@alpha hooks post-edit \
  --file "wv-wild-web/src/components/adventure/AdventureHero.astro" \
  --memory-key "swarm/spec-09/implementation"

```

---

## Session End Protocol

**Coordinator runs**:

```bash
# Store success pattern
npx agentdb@latest reflexion store "wvwo-session" "SPEC-09-adventure-hero" 1.0 true "Implemented AdventureHero with brand-brown camo pattern, slot composition, responsive layout"

# Export session metrics
npx claude-flow@alpha hooks session-end --export-metrics true

# Summary to user
echo "SPEC-09 Complete: AdventureHero.astro component ready at wv-wild-web/src/components/adventure/"

```

---

## Success Criteria

✅ **Component Implemented**:

- AdventureHero.astro created with brand-brown camo background
- Slot system working (default + cta slots)
- Badge system with difficulty colors
- Responsive layout (mobile stacked, desktop grid)

✅ **WVWO Compliance**:

- Typography: font-display (Bitter) + font-body (Noto Sans)
- Colors: brand-brown gradient, brand-cream text, badge colors
- Camo pattern: Subtle SVG overlay at 10% opacity
- Corners: rounded-sm on image
- Motion: Gentle reveal respects prefers-reduced-motion

✅ **Quality Checks**:

- Flexible content via slots tested
- Responsive behavior validated (mobile/tablet/desktop)
- Accessibility: semantic heading hierarchy, image alt text
- Pattern stored in AgentDB for future hero components

---

**Coordinator**: Execute this prompt via hierarchical swarm, coordinate agents through memory, store learnings in AgentDB.
