# SPEC-08: Adventure Card Component

**Objective**: Create a reusable AdventureCard.astro component following ProductCard aesthetic patterns (border-l-4 accent, hover lift, animation stagger).

---

## Agent Selection

**Recommended Swarm**: 5-agent hierarchical coordination
**Topology**: Hierarchical (coordinator → researcher + architect → coder + tester)

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates 4-agent swarm for component spec → implementation → testing |
| `researcher` | **Scout** | Analyzes ProductCard.astro patterns, grid layouts, animation timing |
| `architect` | **Designer** | Designs AdventureCard API (props, slots, responsive behavior) |
| `coder` | **Builder** | Implements AdventureCard.astro with WVWO aesthetic compliance |
| `tester` | **Validator** | Reviews border accents, hover states, responsive grid behavior |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading (BEFORE Starting)

```bash
# Parallel context retrieval (Opus 4.5 strength)
npx agentdb@latest reflexion retrieve "card components" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "grid layouts" --k 10 --synthesize-context
npx agentdb@latest skill search "ProductCard CategoryCard" 5
npx agentdb@latest reflexion retrieve "border-l-4 accent hover animation" --k 10 --synthesize-context
npx agentdb@latest reflexion critique-summary "WVWO"
npx agentdb@latest db stats
```

---

## Hierarchical Swarm Setup

**Coordinator initializes**:
```bash
npx claude-flow@alpha swarm init --topology hierarchical --max-agents 5
npx claude-flow@alpha agent spawn researcher --role "Scout ProductCard patterns"
npx claude-flow@alpha agent spawn architect --role "Design AdventureCard API"
npx claude-flow@alpha agent spawn coder --role "Implement component"
npx claude-flow@alpha agent spawn tester --role "Validate aesthetics"
```

**Coordination Memory**:
```bash
# Coordinator stores task breakdown
npx claude-flow@alpha hooks post-edit \
  --file "swarm-coordination" \
  --memory-key "swarm/spec-08/tasks" \
  --value '{"researcher":"analyze ProductCard","architect":"design API","coder":"implement","tester":"validate"}'
```

---

## WVWO Context (Critical Constraints)

**From CLAUDE.md**:
- **Aesthetic**: Border-l-4 accent (sign-green), rounded-sm corners, hover translateY(-2px)
- **Animation**: Gentle stagger on grid load (60ms delay per card)
- **Typography**: font-display for titles, font-body for descriptions
- **Colors**: brand-brown text, sign-green border, brand-cream backgrounds
- **Layout**: Responsive grid (grid-cols-2 md:grid-cols-3 lg:grid-cols-4)
- **Voice**: Kim's authentic tone for any default content

**From Frontend Aesthetics**:
```css
/* Product Card Pattern */
.product-card {
  @apply border-l-4 border-l-sign-green bg-white rounded-sm;
  @apply hover:scale-[1.02] hover:border-l-brand-orange;
  @apply transition-all duration-300 ease-out;
}
```

---

## Task Breakdown (Coordinator → Agents)

### 1️⃣ Researcher: Analyze Existing Card Patterns

**Scout Mission**:
```bash
# Read ProductCard component
npx agentdb@latest skill search "ProductCard component" 5

# Analyze specific patterns
# - Border-left accent (border-l-4 border-l-sign-green)
# - Hover state (translateY(-2px) + border color change)
# - Animation stagger (animation-delay calculation)
# - Grid layout (grid-cols-2 md:grid-cols-3 lg:grid-cols-4)
```

**Deliverable**: Pattern analysis stored in memory
```bash
npx claude-flow@alpha hooks post-task \
  --task-id "researcher-analysis" \
  --memory-key "swarm/spec-08/patterns" \
  --value '{"border":"border-l-4","hover":"translateY(-2px)","stagger":"60ms"}'
```

### 2️⃣ Architect: Design AdventureCard API

**Design Mission**:
```typescript
// AdventureCard.astro interface
interface Props {
  title: string;           // Destination name
  description: string;     // Brief description
  image: string;          // Photo path
  imageAlt: string;       // Accessibility
  difficulty: 'easy' | 'moderate' | 'advanced';  // Badge
  season: string;         // "Year-round", "Spring-Fall", etc.
  href: string;           // Detail page link
  index?: number;         // For stagger animation
}
```

**Design Constraints**:
- Image: `aspect-[4/3] object-cover` (landscape adventures)
- Badge position: Top-right absolute with difficulty color
- Hover: Border-left changes sign-green → brand-orange
- Responsive: Full card clickable, no nested links

**Deliverable**: API spec stored in memory
```bash
npx claude-flow@alpha hooks post-edit \
  --file "AdventureCard-API" \
  --memory-key "swarm/spec-08/api"
```

### 3️⃣ Coder: Implement AdventureCard.astro

**Implementation Requirements**:

```astro
---
// File: src/components/adventure/AdventureCard.astro
interface Props {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  difficulty: 'easy' | 'moderate' | 'advanced';
  season: string;
  href: string;
  index?: number;
}

const { title, description, image, imageAlt, difficulty, season, href, index = 0 } = Astro.props;

const difficultyColors = {
  easy: 'bg-sign-green',
  moderate: 'bg-brand-orange',
  advanced: 'bg-brand-mud',
};

const staggerDelay = `${index * 60}ms`;
---

<a
  href={href}
  class="adventure-card group block border-l-4 border-l-sign-green bg-white rounded-sm overflow-hidden hover:border-l-brand-orange hover:-translate-y-0.5 transition-all duration-300 ease-out"
  style={`animation-delay: ${staggerDelay}`}
>
  <!-- Image container -->
  <div class="relative aspect-[4/3] overflow-hidden">
    <img
      src={image}
      alt={imageAlt}
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
    <!-- Difficulty badge -->
    <div class={`absolute top-3 right-3 px-3 py-1 ${difficultyColors[difficulty]} text-white text-sm font-display font-bold rounded-sm`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </div>
  </div>

  <!-- Content -->
  <div class="p-4 space-y-2">
    <h3 class="font-display font-bold text-xl text-brand-brown line-clamp-2">
      {title}
    </h3>
    <p class="font-body text-brand-mud text-sm line-clamp-3">
      {description}
    </p>
    <div class="flex items-center gap-2 text-sm text-brand-mud/60">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span>{season}</span>
    </div>
  </div>
</a>

<style>
  .adventure-card {
    animation: gentle-reveal 0.8s ease both;
  }

  @keyframes gentle-reveal {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .adventure-card {
      animation: none;
    }
  }
</style>
```

**Save Location**: `c:\Users\matth\Desktop\wvwo-storefront\wv-wild-web\src\components\adventure\AdventureCard.astro`

**Code Quality Checks**:
- [ ] Border-l-4 pattern matches ProductCard
- [ ] Hover state includes translateY(-2px) AND border color change
- [ ] Stagger animation uses 60ms delay per index
- [ ] Difficulty badge uses approved WVWO colors
- [ ] Typography uses font-display and font-body
- [ ] Respects prefers-reduced-motion
- [ ] Image hover scales to 105%

**Deliverable**: Working component + memory update
```bash
npx claude-flow@alpha hooks post-edit \
  --file "wv-wild-web/src/components/adventure/AdventureCard.astro" \
  --memory-key "swarm/spec-08/implementation"
```

### 4️⃣ Tester: Validate Component

**Validation Checklist**:

**Visual Audit**:
- [ ] Border accent is 4px left, sign-green default
- [ ] Hover changes border to brand-orange + lifts 2px
- [ ] Difficulty badge positioned top-right with correct colors
- [ ] Image scales on hover (scale-105)
- [ ] Typography matches design system (Bitter + Noto Sans)
- [ ] Rounded-sm corners (not rounded-md/lg)
- [ ] Animation stagger works on grid load

**Responsive Behavior**:
```bash
# Test grid layouts
# Mobile: grid-cols-2 gap-4
# Tablet: grid-cols-3 gap-6
# Desktop: grid-cols-4 gap-6
```

**Accessibility**:
- [ ] Full card is single clickable link (no nested links)
- [ ] Image has descriptive alt text
- [ ] Difficulty badge has semantic meaning
- [ ] Keyboard navigation works (focus visible)

**Integration Test**:
```astro
---
// Test file: src/pages/test-adventure-card.astro
import AdventureCard from '../components/adventure/AdventureCard.astro';

const testAdventures = [
  {
    title: "Summersville Lake",
    description: "Crystal-clear waters for fishing, kayaking, and cliff jumping.",
    image: "/images/adventures/summersville-lake.jpg",
    imageAlt: "Aerial view of Summersville Lake",
    difficulty: "easy" as const,
    season: "Year-round",
    href: "/adventures/summersville-lake",
  },
  {
    title: "Gauley River Rafting",
    description: "Class V rapids through the New River Gorge.",
    image: "/images/adventures/gauley-river.jpg",
    imageAlt: "Rafters navigating Gauley River rapids",
    difficulty: "advanced" as const,
    season: "Spring-Fall",
    href: "/adventures/gauley-river",
  },
];
---

<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 p-6">
  {testAdventures.map((adventure, index) => (
    <AdventureCard {...adventure} index={index} />
  ))}
</div>
```

**Deliverable**: Test results stored in memory
```bash
npx claude-flow@alpha hooks post-task \
  --task-id "tester-validation" \
  --memory-key "swarm/spec-08/test-results"
```

---

## Session End Protocol

**Coordinator runs**:
```bash
# Store success pattern
npx agentdb@latest reflexion store "wvwo-session" "SPEC-08-adventure-card" 1.0 true "Implemented AdventureCard following ProductCard patterns - border-l-4, hover lift, animation stagger"

# Export session metrics
npx claude-flow@alpha hooks session-end --export-metrics true

# Summary to user
echo "SPEC-08 Complete: AdventureCard.astro component ready at wv-wild-web/src/components/adventure/"
```

---

## Success Criteria

✅ **Component Implemented**:
- AdventureCard.astro created with full ProductCard aesthetic
- Border-l-4 accent pattern working
- Hover state with translateY + border color change
- Animation stagger for grid reveals

✅ **WVWO Compliance**:
- Typography: font-display (Bitter) + font-body (Noto Sans)
- Colors: brand-brown, sign-green, brand-orange
- Corners: rounded-sm (not rounded-md/lg)
- Motion: Respects prefers-reduced-motion

✅ **Quality Checks**:
- Responsive grid tested (mobile/tablet/desktop)
- Accessibility validated (full card link, alt text)
- Integration test file created
- Pattern stored in AgentDB for future reference

---

**Coordinator**: Execute this prompt via hierarchical swarm, coordinate agents through memory, store learnings in AgentDB.
