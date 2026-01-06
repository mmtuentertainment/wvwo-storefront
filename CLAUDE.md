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
