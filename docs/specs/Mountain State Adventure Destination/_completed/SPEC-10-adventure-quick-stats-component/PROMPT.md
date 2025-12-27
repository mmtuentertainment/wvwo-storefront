# SPEC-10: Adventure Quick Stats Component

**Objective**: Create a reusable AdventureQuickStats.astro component for displaying key facts (distance, drive time, best time, facilities) in a responsive grid layout.

---

## Agent Selection

**Recommended Swarm**: 4-agent hierarchical coordination
**Topology**: Hierarchical (coordinator → researcher + architect → coder)

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates 3-agent swarm for stats component design → implementation |
| `researcher` | **Scout** | Analyzes summersville-lake.astro stats section (lines 95-116) |
| `architect` | **Designer** | Designs flexible stats API (array of {label, value, icon?}) |
| `coder` | **Builder** | Implements AdventureQuickStats.astro with responsive grid |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading (BEFORE Starting)

```bash
# Parallel context retrieval (Opus 4.5 strength)
npx agentdb@latest reflexion retrieve "stats grid" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "responsive design" --k 10 --synthesize-context
npx agentdb@latest skill search "summersville-lake.astro stats" 5
npx agentdb@latest reflexion retrieve "icon systems Astro" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "grid layouts" --k 10 --synthesize-context
npx agentdb@latest reflexion critique-summary "WVWO"
npx agentdb@latest db stats

```

---

## Hierarchical Swarm Setup

**Coordinator initializes**:

```bash
npx claude-flow@alpha swarm init --topology hierarchical --max-agents 4
npx claude-flow@alpha agent spawn researcher --role "Analyze summersville-lake stats"
npx claude-flow@alpha agent spawn architect --role "Design stats API"
npx claude-flow@alpha agent spawn coder --role "Implement component"

```

**Coordination Memory**:

```bash
# Coordinator stores task breakdown
npx claude-flow@alpha hooks post-edit \
  --file "swarm-coordination" \
  --memory-key "swarm/spec-10/tasks" \
  --value '{"researcher":"analyze stats patterns","architect":"design flexible API","coder":"implement grid"}'

```

---

## WVWO Context (Critical Constraints)

**From CLAUDE.md**:

- **Layout**: Responsive grid (grid-cols-2 md:grid-cols-4 for 4 stats)
- **Typography**: font-display for values (large, bold), font-body for labels
- **Colors**: brand-brown for values, brand-mud/60 for labels
- **Icons**: Simple inline SVG, sign-green color
- **Spacing**: Generous padding for readability

**From Frontend Aesthetics**:

```css
/* Stats Pattern */
.stat-item {
  @apply text-center space-y-2;
}
.stat-value {
  @apply text-3xl md:text-4xl font-display font-bold text-brand-brown;
}
.stat-label {
  @apply text-sm font-body text-brand-mud/60;
}

```

---

## Task Breakdown (Coordinator → Agents)

### 1️⃣ Researcher: Analyze Existing Stats Section

**Scout Mission**:

```bash
# Read summersville-lake.astro stats section
Read "./wv-wild-web\src\pages\adventures\summersville-lake.astro" --offset 95 --limit 22

```

**Key Patterns to Extract**:

- Grid layout (grid-cols-2 md:grid-cols-4)
- Stat structure (icon + value + label)
- Icon styling (SVG size, color)
- Value styling (text size, font-display, color)
- Label styling (text size, font-body, color)
- Responsive behavior (2 columns mobile, 4 columns desktop)

**Deliverable**: Pattern analysis stored in memory

```bash
npx claude-flow@alpha hooks post-task \
  --task-id "researcher-stats-analysis" \
  --memory-key "swarm/spec-10/stats-patterns" \
  --value '{"grid":"cols-2 md:cols-4","icon":"w-8 h-8 sign-green","value":"text-3xl font-display"}'

```

### 2️⃣ Architect: Design AdventureQuickStats API

**Design Mission**:

```typescript
// AdventureQuickStats.astro interface
interface StatItem {
  label: string;              // "Distance from Shop"
  value: string;              // "18 miles"
  icon?: string;              // Optional SVG icon name or path
}

interface Props {
  stats: StatItem[];          // Array of stat objects
  columns?: 2 | 3 | 4;       // Grid columns (default: 4)
}

// Common adventure stats:
// - Distance: "18 miles", "1.2 hours drive"
// - Best time: "May-October", "Year-round"
// - Facilities: "Yes", "Restrooms & picnic areas"
// - Difficulty: "Easy", "Moderate", "Advanced"

```

**Design Constraints**:

- **Flexible columns**: Default 4 columns desktop, auto-collapse to 2 on mobile
- **Optional icons**: Support SVG icons OR text-only stats
- **Consistent styling**: All stats follow same visual pattern
- **Responsive**: `grid-cols-2 md:grid-cols-{columns}`

**Icon System Decision**:

```typescript
// Option A: Simple inline SVG paths (recommended for simplicity)
// Option B: Icon component with predefined set
// Architect decides based on WVWO simplicity principle

```

**Deliverable**: API spec stored in memory

```bash
npx claude-flow@alpha hooks post-edit \
  --file "AdventureQuickStats-API" \
  --memory-key "swarm/spec-10/api"

```

### 3️⃣ Coder: Implement AdventureQuickStats.astro

**Implementation Requirements**:

```astro
---
// File: src/components/adventure/AdventureQuickStats.astro
interface StatItem {
  label: string;
  value: string;
  icon?: string;  // SVG path data or predefined icon name
}

interface Props {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
}

const { stats, columns = 4 } = Astro.props;

// Predefined icon set (common adventure stats)
const iconSet: Record<string, string> = {
  distance: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  time: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  check: 'M5 13l4 4L19 7',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
};

const gridClass = `grid grid-cols-2 md:grid-cols-${columns}`;
---

<section class="adventure-quick-stats py-8 md:py-12 bg-brand-cream">
  <div class="container mx-auto px-4">
    <div class={`${gridClass} gap-6 md:gap-8`}>
      {stats.map((stat) => (
        <div class="stat-item text-center space-y-2">
          {/* Icon (if provided) */}
          {stat.icon && (
            <div class="flex justify-center">
              <svg
                class="w-8 h-8 md:w-10 md:h-10 text-sign-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d={iconSet[stat.icon] || stat.icon}
                />
              </svg>
            </div>
          )}

          {/* Value */}
          <div class="stat-value text-3xl md:text-4xl font-display font-bold text-brand-brown">
            {stat.value}
          </div>

          {/* Label */}
          <div class="stat-label text-sm md:text-base font-body text-brand-mud/60">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .adventure-quick-stats {
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
    .adventure-quick-stats {
      animation: none;
    }
  }
</style>

```

**Save Location**: `./wv-wild-web\src\components\adventure\AdventureQuickStats.astro`

**Code Quality Checks**:

- [ ] Responsive grid: grid-cols-2 (mobile) → grid-cols-{columns} (desktop)
- [ ] Typography: font-display for values, font-body for labels
- [ ] Colors: brand-brown values, brand-mud/60 labels, sign-green icons
- [ ] Icon system: Predefined set + custom SVG path support
- [ ] Background: brand-cream for contrast with page
- [ ] Spacing: Generous gaps (gap-6 md:gap-8)
- [ ] Accessibility: Icons have aria-hidden (decorative)
- [ ] Respects prefers-reduced-motion

**Usage Example**:

```astro
---
// Example: src/pages/adventures/summersville-lake.astro
import AdventureQuickStats from '../../components/adventure/AdventureQuickStats.astro';

const quickStats = [
  {
    label: 'Distance from Shop',
    value: '18 miles',
    icon: 'distance',
  },
  {
    label: 'Drive Time',
    value: '25 min',
    icon: 'time',
  },
  {
    label: 'Best Time to Visit',
    value: 'May-Oct',
    icon: 'calendar',
  },
  {
    label: 'Facilities',
    value: 'Yes',
    icon: 'check',
  },
];
---

<AdventureQuickStats stats={quickStats} columns={4} />

```

**Alternative Usage (3 stats)**:

```astro
const threeStats = [
  { label: 'Distance', value: '12 miles', icon: 'distance' },
  { label: 'Difficulty', value: 'Advanced', icon: 'info' },
  { label: 'Season', value: 'Spring-Fall', icon: 'calendar' },
];

<AdventureQuickStats stats={threeStats} columns={3} />

```

**Deliverable**: Working component + memory update

```bash
npx claude-flow@alpha hooks post-edit \
  --file "wv-wild-web/src/components/adventure/AdventureQuickStats.astro" \
  --memory-key "swarm/spec-10/implementation"

```

---

## Session End Protocol

**Coordinator runs**:

```bash
# Store success pattern
npx agentdb@latest reflexion store "wvwo-session" "SPEC-10-adventure-quick-stats" 1.0 true "Implemented AdventureQuickStats with flexible array API, responsive grid, predefined icon set"

# Export session metrics
npx claude-flow@alpha hooks session-end --export-metrics true

# Summary to user
echo "SPEC-10 Complete: AdventureQuickStats.astro component ready at wv-wild-web/src/components/adventure/"

```

---

## Success Criteria

✅ **Component Implemented**:

- AdventureQuickStats.astro created with flexible stats array
- Responsive grid (2 columns mobile → 4 columns desktop)
- Optional icon system (predefined set + custom SVG)
- Background color for section contrast

✅ **WVWO Compliance**:

- Typography: font-display (Bitter) for values, font-body (Noto Sans) for labels
- Colors: brand-brown values, brand-mud/60 labels, sign-green icons
- Background: brand-cream section background
- Motion: Gentle reveal respects prefers-reduced-motion

✅ **Quality Checks**:

- Flexible columns prop tested (2, 3, 4 columns)
- Icon system works (predefined + custom SVG paths)
- Responsive behavior validated (mobile/tablet/desktop)
- Accessibility: Icons marked as decorative (aria-hidden)
- Pattern stored in AgentDB for future stat components

---

**Coordinator**: Execute this prompt via hierarchical swarm, coordinate agents through memory, store learnings in AgentDB.
