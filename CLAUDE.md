# Claude Code Configuration - SPARC Development Environment

## 🚨 CRITICAL: CONCURRENT EXECUTION & FILE MANAGEMENT

**ABSOLUTE RULES**:
1. ALL operations MUST be concurrent/parallel in a single message
2. **NEVER save working files, text/mds and tests to the root folder**
3. ALWAYS organize files in appropriate subdirectories
4. **USE CLAUDE CODE'S TASK TOOL** for spawning agents concurrently, not just MCP

### ⚡ GOLDEN RULE: "1 MESSAGE = ALL RELATED OPERATIONS"

**MANDATORY PATTERNS:**
- **TodoWrite**: ALWAYS batch ALL todos in ONE call (5-10+ todos minimum)
- **Task tool (Claude Code)**: ALWAYS spawn ALL agents in ONE message with full instructions
- **File operations**: ALWAYS batch ALL reads/writes/edits in ONE message
- **Bash commands**: ALWAYS batch ALL terminal operations in ONE message
- **Memory operations**: ALWAYS batch ALL memory store/retrieve in ONE message

### 🎯 CRITICAL: Claude Code Task Tool for Agent Execution

**Claude Code's Task tool is the PRIMARY way to spawn agents:**
```javascript
// ✅ CORRECT: Use Claude Code's Task tool for parallel agent execution
[Single Message]:
  Task("Research agent", "Analyze requirements and patterns...", "researcher")
  Task("Coder agent", "Implement core features...", "coder")
  Task("Tester agent", "Create comprehensive tests...", "tester")
  Task("Reviewer agent", "Review code quality...", "reviewer")
  Task("Architect agent", "Design system architecture...", "system-architect")
```

**MCP tools are ONLY for coordination setup:**
- `mcp__claude-flow__swarm_init` - Initialize coordination topology
- `mcp__claude-flow__agent_spawn` - Define agent types for coordination
- `mcp__claude-flow__task_orchestrate` - Orchestrate high-level workflows

### 📁 File Organization Rules

**NEVER save to root folder. Use these directories:**
- `/src` - Source code files
- `/tests` - Test files
- `/docs` - Documentation and markdown files
- `/config` - Configuration files
- `/scripts` - Utility scripts
- `/examples` - Example code

## Project Overview

This project uses SPARC (Specification, Pseudocode, Architecture, Refinement, Completion) methodology with Claude-Flow orchestration for systematic Test-Driven Development.

## 🧠 Serena MCP Semantic Memory System (CRITICAL)

**Serena provides semantic code understanding and project memory for instant codebase navigation.**

### Quick Setup & Configuration

**One-Time Fix: Disable Dashboard Popup Spam**
```bash
# Edit C:\Users\matth\.serena\serena_config.yml
# Line 35: Change from 'true' to 'false'
web_dashboard_open_on_launch: false
```
Restart VSCode after changing. Dashboard still available at http://localhost:24282/dashboard/ if needed.

### Auto-Activate wvwo-storefront Project

**Manual activation (if needed):**
```bash
mcp__serena__activate_project { project: "wvwo-storefront" }
```

**Auto-activation:** Serena should auto-detect when working in `wvwo-storefront/` directory. If not activating, check Serena config has project registered.

### Serena Memory Commands

**List all project memories:**
```typescript
mcp__serena__list_memories()
// Returns: 45+ memories including architectural patterns, FAQs, code review verdicts
```

**Read specific memory:**
```typescript
mcp__serena__read_memory({ memory_file_name: "wvwo-developer-faq-quick-reference" })
// Instant answers to 20 common dev questions
```

**Write new memory:**
```typescript
mcp__serena__write_memory({
  memory_file_name: "spec-25-completion-notes",
  content: "SPEC-25 patterns and learnings..."
})
```

### Key Serena Memories Available

| Memory Name | Purpose | Token Savings |
|-------------|---------|---------------|
| `wvwo-template-type-system-architecture` | Template patterns (Historic, Resort) | ~2,500 tokens |
| `wvwo-destination-routing-and-cross-linking` | Routing matrix, cross-linking | ~3,000 tokens |
| `wvwo-modular-design-500-line-pattern` | File size limits, extraction patterns | ~2,800 tokens |
| `wvwo-code-review-verdict-patterns` | PR review patterns from #114 | ~3,500 tokens |
| `wvwo-developer-faq-quick-reference` | 20 instant Q&A answers | ~4,000 tokens |

**Total Indexed:** 50,755 characters across 5 comprehensive memories

### Serena Semantic Search Tools

**Symbol overview (no full file read):**
```typescript
mcp__serena__get_symbols_overview({
  relative_path: "src/types/templates/historic.ts",
  depth: 1
})
// Returns: All 17 HistoricTemplateProps properties instantly
```

**Find symbol across codebase:**
```typescript
mcp__serena__find_symbol({
  name_path_pattern: "LakeTemplatePropsEnriched",
  include_body: false
})
// Finds type definition without reading entire file
```

**Find all references to symbol:**
```typescript
mcp__serena__find_referencing_symbols({
  name_path: "haversineDistance",
  relative_path: "src/utils/cross-links.ts"
})
// Shows all files using this function with code snippets
```

### Token Efficiency with Serena

| Query Type | Without Serena | With Serena | Reduction |
|------------|----------------|-------------|-----------|
| "How to add destination type?" | 7,600 tokens (grep + 4 files) | 1,500 tokens (1 memory) | **80%** |
| "Where is X symbol defined?" | 3,000 tokens (grep + read) | 200 tokens (find_symbol) | **93%** |
| "Template architecture?" | 5,000 tokens (read multiple) | 2,500 tokens (1 memory) | **50%** |
| "Code review patterns?" | 4,500 tokens (read PRs) | 1,000 tokens (verdict memory) | **78%** |

**Average: 75% token reduction for common codebase queries**

### Best Practices

1. **Always check memories first** before grepping/reading files
2. **Use symbol tools** instead of full file reads when possible
3. **Update memories** after completing SPECs with new patterns
4. **Cross-reference** memories (each memory links to related memories)

## 🏔️ Adventure Hub Architecture (CRITICAL)

**THIS IS NOT JUST A HUNTING/FISHING SITE.** WVWO is pivoting to a comprehensive **Adventure Hub Database** - a network of interconnected outdoor destinations across West Virginia. Think of it as a partnership database where each destination type has dedicated pages but cross-links to related content.

### Destination Types (Each Gets Dedicated Pages)

| Type | Template | Route | Data Location | Primary Focus |
|------|----------|-------|---------------|---------------|
| **WMA** | WMATemplate | `/near/wma/[slug]/` | `src/data/wma/` | Hunting (deer, turkey, grouse, bear) |
| **Lake** | LakeTemplate | `/near/lake/[slug]/` | `src/data/lakes/` | Fishing (bass, walleye, trout, catfish) |
| **Campground** | CampgroundTemplate | `/near/campground/[slug]/` | `src/data/campgrounds/` | Camping (RV, tent, facilities) |
| **State Park** | StateParkTemplate | `/near/state-park/[slug]/` | `src/data/state-parks/` | Recreation (trails, nature, programs) |
| **River** | RiverTemplate | `/near/river/[slug]/` | `src/data/rivers/` | Paddling (kayak, canoe, whitewater, lazy) |
| **Ski Resort** | SkiTemplate | `/near/ski/[slug]/` | `src/data/ski/` | Winter sports (skiing, snowboarding) |
| **Historic Site** | HistoricTemplate | `/near/historic/[slug]/` | `src/data/historic/` | Heritage (Civil War, coal history) |
| **Backcountry** | BackcountryTemplate | `/backcountry/[slug]/` | `src/data/backcountry/` | Wilderness (hiking, backpacking) |
| **Cave** | CaveTemplate | `/near/cave/[slug]/` | `src/data/caves/` | Spelunking (tours, geology) |
| **Trail** | TrailTemplate | `/near/trail/[slug]/` | `src/data/trails/` | Hiking/Biking (day hikes, MTB) |
| **Rock Climbing** | ClimbingTemplate | `/near/climbing/[slug]/` | `src/data/climbing/` | Climbing (sport, trad, bouldering) |
| **National Park** | NationalParkTemplate | `/near/national-park/[slug]/` | `src/data/national-parks/` | NPS sites (New River Gorge, etc.) |
| **Adventure Resort** | AdventureResortTemplate | `/near/resort/[slug]/` | `src/data/resorts/` | Multi-activity destinations |

### Cross-Linking Philosophy (CRITICAL)

**Every destination should link to related destinations.** Users don't think in silos - a camper at Bulltown wants to know about:
- The lake they're camping on (Burnsville Lake fishing)
- The WMA surrounding it (Burnsville WMA hunting)
- Historic sites nearby (Bulltown Historic Area)
- Trails accessible from camp

**Implementation Pattern:**
```typescript
// In each [slug].astro dynamic route:
// 1. Discover related content via import.meta.glob()
// 2. Match by geographic proximity (nearbyLake, nearbyWMA, etc.)
// 3. Pass relatedX arrays to page props
// 4. Render cross-link section at bottom of page

// Example from campground data:
nearbyLake: 'Burnsville Lake',  // Auto-links to /near/lake/burnsville/
nearbyWMA: 'Burnsville',        // Auto-links to /near/wma/burnsville/
nearbyHistoric: ['bulltown-historic-area']  // Links to historic pages
```

### What Each Destination Page Should Cover

**DON'T just focus on hunting/fishing for every destination.** Cover what's RELEVANT:

- **Campground**: Sites, amenities, fees, policies, nearby activities (ALL types)
- **Lake**: Fishing spots, boat ramps, marinas, swimming, paddling, camping
- **WMA**: Species, seasons, access points, regulations, camping, trails
- **State Park**: Trails, facilities, programs, camping, fishing, swimming
- **River**: Rapids, put-ins, take-outs, fishing, outfitters, water levels
- **Ski Resort**: Trails, lifts, snow conditions, pricing, lodging, summer activities
- **Historic Site**: History, tours, events, accessibility, related sites
- **Trail**: Distance, difficulty, trailhead, features, seasonal conditions

### Auto-Discovery Pattern

All dynamic routes use the same pattern:
```typescript
// getStaticPaths discovers data files automatically
const dataModules = import.meta.glob('../../../data/{type}/*.ts', { eager: true });

// Cross-link discovery
const relatedModules = import.meta.glob('../../../data/{otherType}/*.ts', { eager: true });
```

**To add a new destination:** Just create the data file. No route changes needed.

### 🚨 DUAL DATA SYSTEM ARCHITECTURE (CRITICAL)

**There are TWO parallel data systems that BOTH must be updated for every destination:**

| System | Location | Powers | Navigation Link |
|--------|----------|--------|-----------------|
| **Data Files** | `src/data/{type}/{slug}.ts` | Template pages (`/near/{type}/{slug}/`) | "Hunt Near Us" → `/near/` |
| **Content Collection** | `src/content/adventures/{slug}.md` | Adventures hub (`/adventures/`) | "Adventures" → `/adventures/` |

**BOTH systems are ACTIVE in the main navigation (Header.astro):**
- `/adventures/` = "Adventures" link - browsable card grid with filtering
- `/near/` = "Hunt Near Us" link - geographic destination listings

**Why two systems exist:**
- **Data files** (`src/data/`) provide structured TypeScript data for rich template pages with full cross-linking
- **Content collection** (`src/content/adventures/`) provides markdown entries for the filterable Adventures hub

**The template pages are shared:** Both systems link to the same destination pages (e.g., `/near/lake/sutton/`). The difference is HOW users discover them:
- Via `/adventures/` card grid (needs content collection entry)
- Via `/near/` listing page (needs entry in hardcoded array)
- Via cross-links from related pages (needs data file)

### ✅ COMPLETE DESTINATION CHECKLIST

When adding ANY new destination, you MUST create/update ALL of these:

| Step | File | Purpose | Missing = |
|------|------|---------|-----------|
| 1 | `src/data/{type}/{slug}.ts` | Template page data | 404 on `/near/{type}/{slug}/` |
| 2 | `src/content/adventures/{slug}.md` | Adventures hub card | Not visible on `/adventures/` |
| 3 | `src/pages/near/index.astro` | "Hunt Near Us" listing | Not visible on `/near/` |
| 4 | `src/content.config.ts` | Type validation | Build errors |
| 5 | `src/components/adventures/AdventureCard.tsx` | URL routing | 404 when clicking card |

### Content Collection Entry Template

Every destination needs a `.md` file in `src/content/adventures/`:

```markdown
---
title: "Destination Name - Subtitle"
description: "Brief description for SEO and card display"
season:
  - spring
  - summer
  - fall
  - winter
difficulty: easy  # easy, moderate, difficult
location: "Location Name, County"
coordinates:
  lat: 38.0000
  lng: -80.0000
drive_time: "45 min"
suitability:
  - kid-friendly
  - dog-friendly
  - wheelchair-accessible
gear:
  - WV fishing license (required)  # REQUIRED for all lakes/rivers/campgrounds
  - camping gear
  - fishing rod
type: lake  # MUST match: wma, lake, campground, river, historic, backcountry, ski, state-park
images:
  - src: /images/{type}/{slug}-hero.webp
    alt: Descriptive alt text
    caption: Optional caption
kim_hook: "Kim's personal tip in her voice"
---

# Markdown content for the page body
```

**CRITICAL: Filename convention:**
- Lakes: `{lake-name}-lake.md` → AdventureCard strips `-lake` suffix for URL
- Campgrounds: `{name}-campground.md` → AdventureCard strips `-campground` suffix for URL
- WMAs: `{name}-wma.md` → AdventureCard strips `-wma` suffix for URL

### 🚨 NEW DESTINATION TYPE MIGRATION CHECKLIST (CRITICAL)

When migrating content to dynamic routes OR adding a new destination type, you MUST update **ALL** of these locations to avoid 404 errors:

| Step | File | What to Update |
|------|------|----------------|
| 1 | `src/content.config.ts` | Add type to `z.enum(['adventure', 'wma', 'lake', 'river', 'ski', 'campground', 'historic', ...])` |
| 2 | `src/components/adventures/AdventureCard.tsx` | Add `case '{type}':` to `getAdventureUrl()` switch statement |
| 3 | `src/pages/near/{type}/[slug].astro` | Create dynamic route if it doesn't exist |
| 4 | `src/data/{type}/{slug}.ts` | Create data file with correct `{Type}TemplateProps` |
| 5 | `src/content/adventures/{slug}.md` | Set correct `type:` field in frontmatter |
| 6 | `src/pages/near/index.astro` | Update slug to `{type}/{slug}` format (e.g., `wma/elk-river`) |

**Current `getAdventureUrl()` supported types:**
```typescript
case 'wma':          return `/near/wma/${slug}/`;
case 'lake':         return `/near/lake/${slug}/`;
case 'campground':   return `/near/campground/${slug}/`;
case 'river':        return `/near/river/${slug}/`;
case 'historic':     return `/historic/${slug}/`;
case 'state-park':   return `/near/state-park/${slug}/`;
case 'backcountry':  return `/backcountry/${slug}/`;
case 'ski':          return `/near/ski/${slug}/`;
case 'cave':         return `/near/cave/${slug}/`;
case 'trail':        return `/near/trail/${slug}/`;
case 'climbing':     return `/near/climbing/${slug}/`;
case 'national-park': return `/near/national-park/${slug}/`;
case 'resort':       return `/near/resort/${slug}/`;
// default falls back to /adventures/{id}/ (causes 404s!)
```

**Filename suffix stripping (AdventureCard.tsx):**
The card component strips these suffixes from filenames to generate slugs:
- `-lake-wma` → WMA slug (e.g., `burnsville-lake-wma` → `burnsville`)
- `-wma` → WMA slug
- `-lake` → Lake slug
- `-campground` → Campground slug
- `-historic-area` → Historic slug
- `-state-park` → State park slug
- `-wilderness` → Backcountry slug
- `-battlefield` → Historic slug
- `-river` → River slug
- `-cave` → Cave slug
- `-trail` → Trail slug
- `-resort` → Resort slug
- `-mountain` → Ski slug (e.g., `snowshoe-mountain` → `snowshoe`)

**Root cause of 404s:** The Adventures hub (`/adventures/`) uses `AdventureCard.tsx` which reads the content collection's `type` field. If the type isn't in the switch statement, it falls back to `/adventures/{id}/` which doesn't exist.

### Common Mistakes to Avoid

❌ **DON'T** create a lake page that only talks about fishing
❌ **DON'T** create a campground page without linking to nearby activities
❌ **DON'T** assume every visitor is a hunter - cover ALL audiences
❌ **DON'T** duplicate content - cross-link instead
❌ **DON'T** forget families, kayakers, history buffs, RV travelers

✅ **DO** cover the full range of activities for each destination
✅ **DO** cross-link to related destinations automatically
✅ **DO** use verified data from official sources (USACE, NPS, WV DNR, etc.)
✅ **DO** include practical info (fees, hours, contact, directions)
✅ **DO** think about the complete visitor experience

## SPARC Commands

### Core Commands
- `npx claude-flow sparc modes` - List available modes
- `npx claude-flow sparc run <mode> "<task>"` - Execute specific mode
- `npx claude-flow sparc tdd "<feature>"` - Run complete TDD workflow
- `npx claude-flow sparc info <mode>` - Get mode details

### Batchtools Commands
- `npx claude-flow sparc batch <modes> "<task>"` - Parallel execution
- `npx claude-flow sparc pipeline "<task>"` - Full pipeline processing
- `npx claude-flow sparc concurrent <mode> "<tasks-file>"` - Multi-task processing

### Build Commands
- `npm run build` - Build project
- `npm run test` - Run tests
- `npm run lint` - Linting
- `npm run typecheck` - Type checking

## SPARC Workflow Phases

1. **Specification** - Requirements analysis (`sparc run spec-pseudocode`)
2. **Pseudocode** - Algorithm design (`sparc run spec-pseudocode`)
3. **Architecture** - System design (`sparc run architect`)
4. **Refinement** - TDD implementation (`sparc tdd`)
5. **Completion** - Integration (`sparc run integration`)

## Code Style & Best Practices

- **Modular Design**: Files under 500 lines
- **Environment Safety**: Never hardcode secrets
- **Test-First**: Write tests before implementation
- **Clean Architecture**: Separate concerns
- **Documentation**: Keep updated

## 🎨 WVWO Frontend Aesthetics (CRITICAL for PR Review)

This project is for WV Wild Outdoors - a family-owned hunting shop in rural West Virginia. NOT a tech startup. All frontend must reflect authentic rural WV identity.

### When Checklist is Required

**REQUIRE full WVWO checklist when PR includes:**
- New/modified `.astro` components in `/components/`
- CSS/style changes
- New visual UI elements
- Changes to fonts, colors, or borders

**SKIP checklist when PR is:**
- Types/schemas only (`.ts` files in `/types/`)
- Test files only (`__tests__/`)
- Documentation only (`.md` files)
- Data files only (`/src/data/`)
- Backend/API changes

**For PR #79 and similar:** If compliance is documented in commit messages and PR description, streamlined note acceptable instead of full checklist.

### FORBIDDEN (Instant PR Rejection)

**Fonts - NEVER USE:**
```
Inter, DM Sans, Space Grotesk, Poppins, Outfit, Montserrat, Raleway, Open Sans, system-ui
```
*Why: These scream "SaaS startup" - wrong for Appalachian storefront*

**Colors - NEVER USE:**
```
- Purple gradients (AI tool landing pages)
- Hot pink (#ec4899)
- Neon anything
- Corporate blue (#0066cc)
- Diagonal multi-stop gradients
```

**Color Exceptions (Industry Standards):**
**IMPORTANT: Industry safety/danger colors OVERRIDE WVWO brand palette in adventure contexts.**
These colors are REQUIRED (not just allowed) when displaying safety-critical information:

```
SKI TRAIL DIFFICULTY (NSAA Standard):
- Green (#2E7D32 / sign-green) = Beginner (● circle)
- Blue (#1976D2 / blue-700) = Intermediate (■ square)
- Black (#000000 / black) = Advanced (◆ diamond)
- Black (#000000 / black) = Expert (◆◆ double diamond)

HIKING/TRAIL DIFFICULTY (International Standard):
- Green (#2E7D32 / sign-green) = Easy (● circle)
- Blue (#1976D2 / blue-700) = Moderate (■ square)
- Red (#B71C1C / red-900) = Challenging (▲ triangle)
- Black (#000000 / black) = Rugged/Expert (◆ diamond)

AVALANCHE DANGER (North American Public Scale):
- Green = Low (Level 1)
- Yellow (#FBC02D / yellow-600) = Moderate (Level 2)
- Orange (#F57C00 / orange-600) = Considerable (Level 3)
- Red (#D32F2F / red-700) = High (Level 4)
- Black (#000000 / black) = Extreme (Level 5)

FIRE DANGER (USFS NFDRS):
- Green = Low
- Blue (#1976D2 / blue-700) = Moderate
- Yellow (#FBC02D / yellow-600) = High
- Orange (#F57C00 / orange-600) = Very High
- Red (#D32F2F / red-700) = Extreme

RIVER RAPIDS (International Scale):
- No colors - uses Class I-VI Roman numerals only
- Display as text badges, not color-coded
```

**Why industry colors take precedence:**
Outdoor enthusiasts are trained to recognize these colors instantly - it's muscle memory.
A skier knows blue = intermediate. A backcountry traveler knows black = extreme danger.
Using WVWO brand colors for safety-critical info would confuse users and CREATE SAFETY HAZARDS.
Brand aesthetics NEVER override safety communication standards.

**Color Exceptions (Historic Authenticity):**
**APPROVED FOR SPEC-19+ HISTORIC SITES ONLY** - Appalachian heritage colors that tell the story of coal barons, moonshining, and mountain defiance:

```
HISTORIC HERITAGE PALETTE (SPEC-19+):
- Heritage Burgundy: #93282c, #c02032 (museum sections, blood of labor strikes)
- Aged Gold: #d18a00, #ffc655 (metallic accents, brass fixtures, large text only - WCAG)
- Coal-Gray: #424242 (timeline markers, company town control → defiance)
- Stone-Gray: #757575, #616161 (carved monuments, CCC-era markers)
- Heritage Green: #0a5861, #234b43 (layered with sign-green for aged copper depth)
- Heritage Cream: #fff8e9, #efebe2 (aged paper, museum exhibit backgrounds)
```

**Narrative Arc Philosophy (C→B→D→A):**
Colors evolve meaning through sections to tell power-struggle story:
1. **Balanced Truth (C)**: Coal-gray as oppression, burgundy as museum respect
2. **Raw Reality (B)**: Burgundy becomes blood metaphor (Paint Creek Strike), coal-gray shows control
3. **Defiant Spirit (D)**: Coal-gray transforms to STRENGTH ("built from barons' scraps, built to last")
4. **Reverent Honor (A)**: Heritage colors celebrate survival, grit that endures

**Why historic colors matter:**
"Coal barons controlled wages, but not souls." Design elements (riveted borders, lumber asymmetry, coal-gray timelines) visually tell the story of Appalachian resilience. These aren't decorative - they're narrative tools for authentic mountain heritage storytelling.

**Styles - NEVER USE:**
```
- Glassmorphism / backdrop-blur
- rounded-md, rounded-lg, rounded-xl, rounded-3xl (use rounded-sm ONLY)
- Parallax scrolling
- Bouncy button animations
- Confetti effects
- Neumorphic designs
```

**Copy - NEVER USE:**
```
"Unlock potential" | "Seamless experience" | "Revolutionize" | "Next-level"
"Transform the way you" | "All-in-one platform" | "Cutting-edge solutions"
```

### REQUIRED (Must Use)

**Fonts:**
```css
--font-display: 'Bitter', serif;           /* Display headings */
--font-hand: 'Permanent Marker', cursive;  /* Kim's personal touches */
--font-body: 'Noto Sans', sans-serif;      /* Body text */
```

**Colors (WVWO Palette):**
```css
--brand-brown: #3E2723;    /* Rifle stocks, weathered barn wood */
--sign-green: #2E7D32;     /* Old metal signs, forest canopy */
--brand-cream: #FFF8E1;    /* Aged paper, deer hide */
--brand-orange: #FF6F00;   /* Blaze orange - CTAs ONLY, <5% of screen */
```

**Design Rules:**
- Sharp corners: `rounded-sm` ONLY (hardware store aesthetic)
- Typography: Bold weights 700-900, size jumps 2.5x+ between levels
- Orange: <5% of screen (primary CTAs only, never backgrounds)
- Voice: Kim's authentic rural WV - direct, humble, faith-forward

### PR Review Checklist (Frontend)
```
[ ] Zero forbidden fonts (Inter, Poppins, etc.)
[ ] Zero purple/pink/neon colors
[ ] Zero glassmorphic or backdrop-blur effects
[ ] Zero rounded-md/lg/xl corners - only rounded-sm
[ ] Zero marketing buzzwords in copy
[ ] Colors match WVWO palette
[ ] Text sounds like Kim, not a marketing agency
```

### The Litmus Test
> "Would Kim's neighbors recognize this as 'their shop' online?"
> If it looks like a tech startup or SaaS landing page, **reject it**.

## 🚀 Available Agents (54 Total)

### Core Development
`coder`, `reviewer`, `tester`, `planner`, `researcher`

### Swarm Coordination
`hierarchical-coordinator`, `mesh-coordinator`, `adaptive-coordinator`, `collective-intelligence-coordinator`, `swarm-memory-manager`

### Consensus & Distributed
`byzantine-coordinator`, `raft-manager`, `gossip-coordinator`, `consensus-builder`, `crdt-synchronizer`, `quorum-manager`, `security-manager`

### Performance & Optimization
`perf-analyzer`, `performance-benchmarker`, `task-orchestrator`, `memory-coordinator`, `smart-agent`

### GitHub & Repository
`github-modes`, `pr-manager`, `code-review-swarm`, `issue-tracker`, `release-manager`, `workflow-automation`, `project-board-sync`, `repo-architect`, `multi-repo-swarm`

### SPARC Methodology
`sparc-coord`, `sparc-coder`, `specification`, `pseudocode`, `architecture`, `refinement`

### Specialized Development
`backend-dev`, `mobile-dev`, `ml-developer`, `cicd-engineer`, `api-docs`, `system-architect`, `code-analyzer`, `base-template-generator`

### Testing & Validation
`tdd-london-swarm`, `production-validator`

### Migration & Planning
`migration-planner`, `swarm-init`

## 🎯 Claude Code vs MCP Tools

### Claude Code Handles ALL EXECUTION:
- **Task tool**: Spawn and run agents concurrently for actual work
- File operations (Read, Write, Edit, MultiEdit, Glob, Grep)
- Code generation and programming
- Bash commands and system operations
- Implementation work
- Project navigation and analysis
- TodoWrite and task management
- Git operations
- Package management
- Testing and debugging

### MCP Tools ONLY COORDINATE:
- Swarm initialization (topology setup)
- Agent type definitions (coordination patterns)
- Task orchestration (high-level planning)
- Memory management
- Neural features
- Performance tracking
- GitHub integration

**KEY**: MCP coordinates the strategy, Claude Code's Task tool executes with real agents.

## 🚀 Quick Setup

```bash
# Add MCP servers (Claude Flow required, others optional)
claude mcp add claude-flow npx claude-flow@alpha mcp start
claude mcp add ruv-swarm npx ruv-swarm mcp start  # Optional: Enhanced coordination
claude mcp add flow-nexus npx flow-nexus@latest mcp start  # Optional: Cloud features
```

## MCP Tool Categories

### Coordination
`swarm_init`, `agent_spawn`, `task_orchestrate`

### Monitoring
`swarm_status`, `agent_list`, `agent_metrics`, `task_status`, `task_results`

### Memory & Neural
`memory_usage`, `neural_status`, `neural_train`, `neural_patterns`

### GitHub Integration
`github_swarm`, `repo_analyze`, `pr_enhance`, `issue_triage`, `code_review`

### System
`benchmark_run`, `features_detect`, `swarm_monitor`

### Flow-Nexus MCP Tools (Optional Advanced Features)
Flow-Nexus extends MCP capabilities with 70+ cloud-based orchestration tools:

**Key MCP Tool Categories:**
- **Swarm & Agents**: `swarm_init`, `swarm_scale`, `agent_spawn`, `task_orchestrate`
- **Sandboxes**: `sandbox_create`, `sandbox_execute`, `sandbox_upload` (cloud execution)
- **Templates**: `template_list`, `template_deploy` (pre-built project templates)
- **Neural AI**: `neural_train`, `neural_patterns`, `seraphina_chat` (AI assistant)
- **GitHub**: `github_repo_analyze`, `github_pr_manage` (repository management)
- **Real-time**: `execution_stream_subscribe`, `realtime_subscribe` (live monitoring)
- **Storage**: `storage_upload`, `storage_list` (cloud file management)

**Authentication Required:**
- Register: `mcp__flow-nexus__user_register` or `npx flow-nexus@latest register`
- Login: `mcp__flow-nexus__user_login` or `npx flow-nexus@latest login`
- Access 70+ specialized MCP tools for advanced orchestration

## 🧠 ReasoningBank Memory Commands (CRITICAL)

**⚠️ ALWAYS use global installation for real semantic embeddings:**

### One-Time Setup
```bash
npm install -g claude-flow@alpha
```

### ✅ CORRECT Commands (AI Semantic Embeddings)
```bash
# Store pattern after completing features
claude-flow memory store "spec-17-backcountry-complete" "Pattern details..." --namespace wvwo-successes --reasoningbank

# Query/search for patterns
claude-flow memory query "backcountry template" --namespace wvwo-successes --reasoningbank

# List all memories
claude-flow memory list --namespace wvwo-successes --reasoningbank

# Check status
claude-flow memory status --reasoningbank
```

### ❌ WRONG Commands (Hash-Based Fallback)
```bash
# Produces 31.5% match scores instead of 85-95%
npx claude-flow@alpha memory query "search" --reasoningbank
```

### Why Global Installation Matters

| Command | Embeddings | Match Score | Performance |
|---------|-----------|-------------|-------------|
| `claude-flow` (global) | AI semantic (Xenova/all-MiniLM-L6-v2) | 85-95% | Fast, cached |
| `npx claude-flow@alpha` | Hash-based fallback | 31.5% | Slow, re-downloads |

**Database:** `.swarm/memory.db` (project-local, ~13MB)
**Model Cache:** Global npm location (~23MB, one-time download)
**Embeddings:** 384-dimension vectors for semantic search

### When to Store Patterns

1. After completing a SPEC (all PRs merged)
2. After discovering important architectural patterns
3. After solving complex problems
4. After implementing WVWO-specific conventions

### Memory Best Practices

- Use `--namespace wvwo-successes` for project learnings
- Keep entries 500-1000 bytes for optimal retrieval
- Include SPEC numbers, PR numbers, commit hashes
- Document "why" decisions were made, not just "what"
- Query before implementing similar features

### Completed Specs in ReasoningBank

**SPEC-17: Backcountry Template** (Completed)
- Pattern: backcountry-template-complete
- 6 PRs, 40 hours, dynamic routes, SEO schemas, 85%+ coverage
- Key learning: Balanced detail approach (10-15 fields per schema)

**SPEC-18: State Park Template** (Completed)
- Pattern: spec-18-state-park-complete
- 6 PRs, 50 hours, 63 gaps addressed, 10 facility types, 2,620 line type system
- Key learning: Quarterly manual review for dynamic content (hours, fees, programs)
- Components: 4 sections + main template, 1,970 lines total
- Geographic proximity (Haversine formula) for related parks
- Hybrid image strategy (public domain + attribution)
- Multi-type Schema.org (Park + TouristAttraction)
- Placeholder data strategy - real content in SPEC-21-71 migration
- Lighthouse 100, WCAG 2.1 AA, 85%+ coverage

## 🗄️ Memory Architecture (CRITICAL)

**WVWO uses a specialized multi-database strategy for optimal token efficiency:**

### Database Locations & Purposes

| Database | Location | Purpose | Size | Commands |
|----------|----------|---------|------|----------|
| **ReasoningBank** | `.swarm/memory.db` | Semantic pattern search (PRIMARY) | ~33 MB | `claude-flow memory` |
| **AgentDB Skills** | `agentdb.db` (root) | AgentDB skill storage | ~1.4 MB | AgentDB CLI |
| **Hive Mind** | `.hive-mind/hive.db` | Queen-led coordination | ~180 KB | Auto-managed |
| **Serena Memories** | Managed by Serena | Project-scoped patterns | N/A | Auto-activated |

### Why Specialized Databases?

**Industry Best Practice (2025 Hybrid Store Pattern):**
- Vector DB (ReasoningBank) → Semantic search, pattern recognition
- SQL DB (AgentDB) → Canonical facts, skill metadata
- Graph DB (Hive) → Agent coordination, swarm topology

**Performance Benefits:**
- ReasoningBank: 69.6%+ match scores, <2s queries
- AgentDB: 150x faster with HNSW indexing
- Hive Mind: Real-time coordination (0.95 coherence score)

### Token Efficiency Gains

| Operation | Before | After | Savings |
|-----------|--------|-------|---------|
| Routing questions | ~800 lines (CLAUDE.md + files) | 1 memory query | **95%** |
| SPEC patterns | ~293 lines (full summary) | Semantic search | **60%** |
| Brand compliance | Full design docs | Pre-indexed rules | **70%** |
| **Overall Estimate** | Standard file reads | Memory-first workflow | **40-60%** |

### Memory-First Development Workflow

**BEFORE implementing SPEC-25+:**
```bash
# Query ReasoningBank for relevant patterns
claude-flow memory query "state park template" --namespace wvwo-successes --reasoningbank

# Serena auto-activates wvwo-storefront project (39 memories available)
```

**AFTER completing work:**
```bash
# Store new patterns with semantic embeddings
claude-flow memory store "spec-25-complete" "Summary..." --namespace wvwo-successes --reasoningbank
```

### Maintenance

**Backups:** Stored in `docs/memory-backups/` (automated)
**Database Integrity:** Verified Jan 9, 2026 (69.6% brand compliance match test)
**Migration History:** Orphaned `.agentdb/*.db` duplicates deleted (752 KB saved)

## 🚀 Agent Execution Flow with Claude Code

### The Correct Pattern:

1. **Optional**: Use MCP tools to set up coordination topology
2. **REQUIRED**: Use Claude Code's Task tool to spawn agents that do actual work
3. **REQUIRED**: Each agent runs hooks for coordination
4. **REQUIRED**: Batch all operations in single messages

### Example Full-Stack Development:

```javascript
// Single message with all agent spawning via Claude Code's Task tool
[Parallel Agent Execution]:
  Task("Backend Developer", "Build REST API with Express. Use hooks for coordination.", "backend-dev")
  Task("Frontend Developer", "Create React UI. Coordinate with backend via memory.", "coder")
  Task("Database Architect", "Design PostgreSQL schema. Store schema in memory.", "code-analyzer")
  Task("Test Engineer", "Write Jest tests. Check memory for API contracts.", "tester")
  Task("DevOps Engineer", "Setup Docker and CI/CD. Document in memory.", "cicd-engineer")
  Task("Security Auditor", "Review authentication. Report findings via hooks.", "reviewer")
  
  // All todos batched together
  TodoWrite { todos: [...8-10 todos...] }
  
  // All file operations together
  Write "backend/server.js"
  Write "frontend/App.jsx"
  Write "database/schema.sql"
```

## 📋 Agent Coordination Protocol

### Every Agent Spawned via Task Tool MUST:

**1️⃣ BEFORE Work:**
```bash
npx claude-flow@alpha hooks pre-task --description "[task]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-[id]"
```

**2️⃣ DURING Work:**
```bash
npx claude-flow@alpha hooks post-edit --file "[file]" --memory-key "swarm/[agent]/[step]"
npx claude-flow@alpha hooks notify --message "[what was done]"
```

**3️⃣ AFTER Work:**
```bash
npx claude-flow@alpha hooks post-task --task-id "[task]"
npx claude-flow@alpha hooks session-end --export-metrics true
```

## 🎯 Concurrent Execution Examples

### ✅ CORRECT WORKFLOW: MCP Coordinates, Claude Code Executes

```javascript
// Step 1: MCP tools set up coordination (optional, for complex tasks)
[Single Message - Coordination Setup]:
  mcp__claude-flow__swarm_init { topology: "mesh", maxAgents: 6 }
  mcp__claude-flow__agent_spawn { type: "researcher" }
  mcp__claude-flow__agent_spawn { type: "coder" }
  mcp__claude-flow__agent_spawn { type: "tester" }

// Step 2: Claude Code Task tool spawns ACTUAL agents that do the work
[Single Message - Parallel Agent Execution]:
  // Claude Code's Task tool spawns real agents concurrently
  Task("Research agent", "Analyze API requirements and best practices. Check memory for prior decisions.", "researcher")
  Task("Coder agent", "Implement REST endpoints with authentication. Coordinate via hooks.", "coder")
  Task("Database agent", "Design and implement database schema. Store decisions in memory.", "code-analyzer")
  Task("Tester agent", "Create comprehensive test suite with 90% coverage.", "tester")
  Task("Reviewer agent", "Review code quality and security. Document findings.", "reviewer")
  
  // Batch ALL todos in ONE call
  TodoWrite { todos: [
    {id: "1", content: "Research API patterns", status: "in_progress", priority: "high"},
    {id: "2", content: "Design database schema", status: "in_progress", priority: "high"},
    {id: "3", content: "Implement authentication", status: "pending", priority: "high"},
    {id: "4", content: "Build REST endpoints", status: "pending", priority: "high"},
    {id: "5", content: "Write unit tests", status: "pending", priority: "medium"},
    {id: "6", content: "Integration tests", status: "pending", priority: "medium"},
    {id: "7", content: "API documentation", status: "pending", priority: "low"},
    {id: "8", content: "Performance optimization", status: "pending", priority: "low"}
  ]}
  
  // Parallel file operations
  Bash "mkdir -p app/{src,tests,docs,config}"
  Write "app/package.json"
  Write "app/src/server.js"
  Write "app/tests/server.test.js"
  Write "app/docs/API.md"
```

### ❌ WRONG (Multiple Messages):
```javascript
Message 1: mcp__claude-flow__swarm_init
Message 2: Task("agent 1")
Message 3: TodoWrite { todos: [single todo] }
Message 4: Write "file.js"
// This breaks parallel coordination!
```

## Performance Benefits

- **84.8% SWE-Bench solve rate**
- **32.3% token reduction**
- **2.8-4.4x speed improvement**
- **27+ neural models**

## Hooks Integration

### Pre-Operation
- Auto-assign agents by file type
- Validate commands for safety
- Prepare resources automatically
- Optimize topology by complexity
- Cache searches

### Post-Operation
- Auto-format code
- Train neural patterns
- Update memory
- Analyze performance
- Track token usage

### Session Management
- Generate summaries
- Persist state
- Track metrics
- Restore context
- Export workflows

## Advanced Features (v2.0.0)

- 🚀 Automatic Topology Selection
- ⚡ Parallel Execution (2.8-4.4x speed)
- 🧠 Neural Training
- 📊 Bottleneck Analysis
- 🤖 Smart Auto-Spawning
- 🛡️ Self-Healing Workflows
- 💾 Cross-Session Memory
- 🔗 GitHub Integration

## Integration Tips

1. Start with basic swarm init
2. Scale agents gradually
3. Use memory for context
4. Monitor progress regularly
5. Train patterns from success
6. Enable hooks automation
7. Use GitHub tools first

## Support

- Documentation: https://github.com/ruvnet/claude-flow
- Issues: https://github.com/ruvnet/claude-flow/issues
- Flow-Nexus Platform: https://flow-nexus.ruv.io (registration required for cloud features)

---

Remember: **Claude Flow coordinates, Claude Code creates!**

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
Never save working files, text/mds and tests to the root folder.
