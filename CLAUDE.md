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

- **Modular Design**: Components <200 lines, pages <800 lines, functions <50 lines (Claude Code 25K token limit allows more, these limits are for readability)
- **Environment Safety**: Never hardcode secrets
- **Test-First**: Write tests before implementation
- **Clean Architecture**: Separate concerns
- **Documentation**: Keep updated

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

---

# wvwo-storefront Development Guidelines

Auto-generated from constitution v2.1.0. Last updated: 2025-12-12

## Active Technologies
- Astro 5.x (static site generation)
- Tailwind CSS 4.x (styling)
- React + shadcn/ui (interactive components, approved Dec 2025)
- Cloudflare Pages (hosting)

## Project Structure

```text
wv-wild-web/           # Main Astro site
├── src/
│   ├── components/    # Astro components
│   ├── layouts/       # Page layouts
│   ├── pages/         # Routes
│   └── data/          # JSON data (store.json, etc.)
├── public/            # Static assets
└── package.json
```

## Commands

```bash
cd wv-wild-web
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Code Style

- Astro components: `.astro` files with frontmatter
- React components: `.tsx` files with shadcn/ui (use client:visible for hydration)
- Tailwind: Use design system classes (brand-brown, brand-orange, etc.)
- Apply WVWO aesthetic overrides to shadcn defaults (rounded-sm, brand colors)
- Mobile-first responsive design

## Recent Changes
- 2025-12-21: Strategic Pivot - Mountain State Adventure Destination
  - SPEC-05: Disabled e-commerce UI (cart/checkout) via `PUBLIC_COMMERCE_ENABLED` flag.
  - Pivot focus: Transforming from a retail site to an outdoor adventure destination hub.
  - Content Collections: Migrating to structured geographic guides using Astro Content Collections.
- 2025-12-12: Constitution v2.1.0 - Phase 3 Strategy & Geographic Positioning
- 2025-12-09: Constitution v2.0.0 - Pivoted to simple static site approach
- Removed: Docker, Directus, Ghost, Listmonk, Mixpost, PostgreSQL, Redis
- Added: Web3Forms (forms), Buttondown (newsletter), YouTube (embeds)

## Current Phase: 3 - Mountain State Adventure Destination (PIVOT)
**Goal**: Build a high-traffic destination hub that serves as a **professional income source for Matt** while driving massive **in-store foot traffic** for Kim & Bryan along the I-79/US-19 corridor.
- Phase 3A: Adventure Content Foundation (Astro Content Collections for WMAs/Lakes).
- Phase 3B: Geographic SEO (Capturing "near me" and waypoint searches for US-19 to drive **In-Store Traffic**).
- Phase 3C: Static Inventory Showroom (Product catalog persists with "Call to Order" logic for physical fulfillment).
- Phase 3D: E-Commerce Guardrails (Commerce capability preserved but disabled by flag).

<!-- MANUAL ADDITIONS START -->

---

# WVWO Intelligence System (AgentDB + ReasoningBank)

## MASTER SESSION START PROMPT (Opus 4.5 Optimized)

Copy this prompt to start a new session with full context:

```text
You are Claude Opus 4.5 working on the WVWO (WV Wild Outdoors) project. Before proceeding with any task, execute this comprehensive context loading protocol using AgentDB advanced features.

<parallel_context_loading>
Execute ALL of these AgentDB commands IN PARALLEL (Opus 4.5 excels at parallel tool execution):

1. FULL WVWO CONTEXT (15+ episodes):
   npx agentdb@latest reflexion retrieve "WVWO" --k 15 --synthesize-context

2. FAILURE PATTERNS (CRITICAL - don't repeat mistakes):
   npx agentdb@latest reflexion critique-summary "WVWO"
   npx agentdb@latest reflexion retrieve "WVWO" --k 10 --only-failures

3. HIGH-REWARD SUCCESSES (what worked):
   npx agentdb@latest reflexion retrieve "WVWO" --k 10 --min-reward 0.8 --only-successes --filters '{"success":true}'

4. DOMAIN-SPECIFIC (based on likely task):
   npx agentdb@latest reflexion retrieve "checkout security validation" --k 10 --synthesize-context
   npx agentdb@latest reflexion retrieve "shadcn component aesthetic" --k 10 --synthesize-context

5. DATABASE STATS:
   npx agentdb@latest db stats
</parallel_context_loading>

<context_awareness>
Your context window will be automatically compacted as it approaches its limit. Do not stop tasks early due to token budget concerns. Save progress to AgentDB before context refreshes. Be persistent and autonomous - complete tasks fully.
</context_awareness>

<opus_4_5_directives>
- Use interleaved thinking: After receiving tool results, reflect on quality and plan next steps before acting
- Parallel tool calls: Execute independent operations simultaneously (file reads, searches, etc.)
- Explicit action: Implement changes rather than suggesting them unless asked otherwise
- Long-horizon reasoning: Track state across extended sessions using structured formats
- Avoid overengineering: Only make changes directly requested. Keep solutions simple.
</opus_4_5_directives>

<wvwo_constraints>
APPROVED: Astro 5.x, Tailwind CSS 4.x, React/shadcn (with WVWO aesthetic overrides)
NEVER: Vue, Angular, Svelte, Next.js, corporate tone, purple/neon colors
NEVER: Suggest enabling e-commerce while flag is set to false (SPEC-05 requirement)
ALWAYS: rounded-sm (never rounded-md/lg), brand-brown/sign-green/brand-cream palette, Kim's authentic voice
ALWAYS: Use Astro Content Collections for ALL new adventure/destination content (SPEC-06/12)
</wvwo_constraints>

After loading context, acknowledge with:
"Loaded WVWO context: [X] episodes, [Y] failure patterns, [Z] high-reward approaches. Ready for task."
```

## MANDATORY: Session Protocol

Claude MUST follow this protocol for every WVWO session:

### SESSION START (Do this FIRST)

**THOROUGH CONTEXT LOADING** - Execute ALL in PARALLEL (Opus 4.5 strength):

1. **Load Memory File + Full Context** (parallel):
```bash
# Run these 5 commands IN PARALLEL (single message, multiple tool calls)
npx agentdb@latest reflexion retrieve "WVWO" --k 15 --synthesize-context
npx agentdb@latest reflexion critique-summary "WVWO"
npx agentdb@latest reflexion retrieve "WVWO" --k 10 --only-failures
npx agentdb@latest reflexion retrieve "WVWO" --k 10 --min-reward 0.8 --only-successes
npx agentdb@latest db stats
```

2. **Domain-Specific Context** (parallel, based on task type):
```bash
# Pick relevant domains for current task
npx agentdb@latest reflexion retrieve "checkout payment validation" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "FFL compliance firearm" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "shadcn component aesthetic" --k 10 --synthesize-context
```

3. **Causal Patterns** (what CAUSES success):
```bash
npx agentdb@latest recall with-certificate "<current_task>" 12
```

4. **Filtered High-Precision Queries** (MongoDB-style):
```bash
npx agentdb@latest reflexion retrieve "<task>" --k 10 --filters '{"success":true,"reward":{"$gte":0.9}}'
```

5. **Acknowledge Context** - Briefly confirm to user:
> "Loaded WVWO context: [X] episodes, [Y] failure patterns to avoid, [Z] high-reward approaches."

### DURING WORK (Semi-Auto)

**Before implementing any approach**, check verdict:
- REJECT if: Vue, Angular, Svelte, Next.js, corporate tone
- APPROVE if: Astro component, React/shadcn, Tailwind CSS, Kim's voice
- REVIEW if: New pattern, complex feature, third-party integration

**After completing each task**, ask user:
> "Task complete. Did this work correctly? (y/n) - I'll log the pattern."

If YES - store success:
```bash
npx agentdb@latest reflexion store "wvwo-session" "<task_name>" 1.0 true "<what_worked>"
```

If NO - store failure:
```bash
npx agentdb@latest reflexion store "wvwo-session" "<task_name>" 0.0 false "<what_to_avoid>"
```

### SESSION END (Wrap-Up)

1. **Summarize learnings**:
> "This session: X tasks completed, Y patterns learned."

2. **Consolidate if 3+ new patterns**:
```bash
npx agentdb@latest skill consolidate 3 0.8 7 true
```

3. **Discover new causal patterns**:
```bash
npx agentdb@latest learner run 3 0.6 0.7
```

---

## WVWO Core Context (Always Remember)

| Key | Value |
|-----|-------|
| **PROJECT** | WV Wild Outdoors - Kim & Bryan's hunting/outdoor shop |
| **TECH OWNER** | **Matt handles ALL technical work.** Kim runs the store. React/shadcn complexity is fine. |
| **LOCATION** | **121 WV-82 (Birch River Rd), Birch River, WV 26610** (I-79 Exit 57 access) |
| **IDENTITY** | FFL dealer, DNR agent, family-owned since 2008 |
| **PHASE** | Phase 3: Highway Hunter Capture (SEO + Content Hub + E-Commerce) |
| **TECH** | Astro 5.x + Tailwind CSS 4.x + React/shadcn (full stack approved) |
| **HOSTING** | Cloudflare Pages |
| **VOICE** | Faith-forward, humble, rural WV authentic, "Grand love ya" |
| **DESIGN** | brand-brown, brand-orange, brand-cream, sign-green |
| **FORMS** | Web3Forms (key: 30e563a3...) |
| **NEWSLETTER** | Buttondown |

## WVWO Strategic Principles (Check Before Suggesting Features)

| Principle | Meaning | Example |
|-----------|---------|---------|
| **MATT RUNS TECH** | Matt handles ALL technical work. Don't flag React/shadcn as "complex" - Matt can handle it. | Don't suggest simpler alternatives unless asked |
| **AUTHENTIC > CORPORATE** | Kim's real voice for UI copy, not marketing speak. Rural WV culture, not Silicon Valley. | Don't use buzzwords, "solutions", or slick copy |
| **COST-CONSCIOUS** | Prefer free-tier where sensible, but Matt decides on paid services when business value justifies it. | Suggest options, let Matt decide on costs |
| **LOCAL + HIGHWAY** | Kim's customers are neighbors AND out-of-state hunters on I-79. Serve both. | SEO and e-commerce ARE in scope for Phase 3 |
| **QUALITY > SPEED** | This is NOT an MVP. No artificial deadlines. Do it RIGHT, not fast. | Never rush, never cut corners, never "ship it" |

**When suggesting features, Claude MUST check:**
> "Does this sound corporate? Does it serve both local AND highway customers?"
> Technical complexity is fine - Matt handles all tech. Focus on business value and Kim's voice for UI.

## HARD RULES (Never Violate)

- **APPROVED**: React + shadcn/ui for interactive components (Matt handles all tech)
- **NEVER** suggest Vue, Angular, Svelte, or other JS frameworks (React is the exception)
- **NEVER** use corporate marketing tone in UI copy
- **ALWAYS** use Astro components with frontmatter (React islands via client:visible)
- **ALWAYS** use Tailwind design system classes
- **ALWAYS** apply WVWO aesthetic to shadcn defaults (rounded-sm, brand colors, no purple)
- **ALWAYS** match Kim's authentic voice for customer-facing copy
- **TECH DECISIONS**: Matt decides on complexity, architecture, and paid services. Don't second-guess.

## WORKFLOW RULES (Token Efficiency)

- **ASK, DON'T DECIDE**: When encountering risk/uncertainty, ask "Should I test this?" instead of deciding it can't be done
- **PR AWARENESS**: Code review feedback implies PR context. After fixing, ask "Commit to PR?" instead of summarizing
- **SHORT QUESTIONS > LONG EXPLANATIONS**: Ask first, explain only if asked

## Semantic Code Search (Find by Meaning)

Claude can search the indexed codebase by meaning, not just keywords:

```bash
# Find form-related code
npx agentdb@latest skill search "form handling contact submission" 5

# Find navigation code
npx agentdb@latest skill search "navigation menu header" 5

# Find about/story content
npx agentdb@latest skill search "Kim Bryan family business" 5

# Find seasonal/hunting content
npx agentdb@latest skill search "hunting season deer buck" 5

# Find config/settings
npx agentdb@latest skill search "API key config settings" 5
```

**28 files indexed**: 15 components, 10 pages, 1 layout, 1 config, 1 data file

## Quick Commands Reference

```bash
# ══════════════════════════════════════════════════════════════════════════════
# THOROUGH RETRIEVAL (use these k values, not 5)
# ══════════════════════════════════════════════════════════════════════════════

# Full WVWO context (15+ episodes)
npx agentdb@latest reflexion retrieve "WVWO" --k 15 --synthesize-context

# Domain-specific context
npx agentdb@latest reflexion retrieve "checkout" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "FFL compliance" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "shadcn component" --k 10 --synthesize-context

# Learn from failures (CRITICAL)
npx agentdb@latest reflexion retrieve "WVWO" --k 10 --only-failures
npx agentdb@latest reflexion critique-summary "WVWO"

# High-reward successes only
npx agentdb@latest reflexion retrieve "<task>" --k 10 --min-reward 0.8 --only-successes

# Causal recall (what CAUSES success)
npx agentdb@latest recall with-certificate "<task>" 12

# ══════════════════════════════════════════════════════════════════════════════
# SEMANTIC CODE SEARCH
# ══════════════════════════════════════════════════════════════════════════════

npx agentdb@latest skill search "<what you're looking for>" 10

# ══════════════════════════════════════════════════════════════════════════════
# STORE PATTERNS
# ══════════════════════════════════════════════════════════════════════════════

# Store success pattern
npx agentdb@latest reflexion store "wvwo-session" "<task>" 1.0 true "<approach>"

# Store failure pattern
npx agentdb@latest reflexion store "wvwo-session" "<task>" 0.0 false "<what_failed>"

# ══════════════════════════════════════════════════════════════════════════════
# ADVANCED FILTERS (MongoDB-style)
# ══════════════════════════════════════════════════════════════════════════════

# Filter by success AND high reward
npx agentdb@latest reflexion retrieve "<task>" --k 10 --filters '{"success":true,"reward":{"$gte":0.9}}'

# Filter by session
npx agentdb@latest reflexion retrieve "<task>" --k 10 --filters '{"sessionId":"wvwo-session"}'

# Semantic query with domain context
npx agentdb@latest query --query "<task>" --k 10 --synthesize-context --domain "successful-edits"

# ══════════════════════════════════════════════════════════════════════════════
# LEARNING & CONSOLIDATION
# ══════════════════════════════════════════════════════════════════════════════

# Discover causal patterns from episodes
npx agentdb@latest learner run 3 0.6 0.7

# Consolidate skills from successful episodes
npx agentdb@latest skill consolidate 3 0.8 7 true

# Train patterns on domain
npx agentdb@latest train --domain "code-edits" --epochs 10 --batch-size 32

# Memory optimization and cleanup
npx agentdb@latest optimize-memory --compress true --consolidate-patterns true

# Database stats
npx agentdb@latest db stats
```

---

## Web Content Summarizer Skill

A project-wide skill for fetching and summarizing web content. Adapted from Anthropic's web summarization cookbook.

**Location**: `.claude/skills/wvwo-web-research/SKILL.md`

### When to Use
- Researching framework documentation (Astro, Tailwind, etc.)
- Finding design inspiration and analyzing patterns
- Debugging - searching for error solutions
- Competitive analysis and design research
- Gathering content and information for any task

### Quick Usage

**Documentation Lookup**:
```
WebFetch("https://docs.astro.build/en/guides/content-collections/",
         "Summarize how to set up content collections in Astro 5.x")
```

**Design Research**:
```
WebSearch("outdoor store website design inspiration")
// Then WebFetch promising results
```

**Debugging**:
```
WebSearch("Tailwind CSS 4.0 @theme not working")
// WebFetch Stack Overflow or relevant results
```

### Output Formats
```
// Quick summary
WebFetch(url, "Summarize in 3-5 bullet points")

// Detailed breakdown
WebFetch(url, "Break down into: Overview, Key Points, Examples, Gotchas")

// Code extraction
WebFetch(url, "Extract all code examples with brief explanations")
```

### WVWO Context
When researching for WVWO specifically:
- **Design**: Look for rural, authentic, handmade aesthetics
- **Tech**: Prioritize Astro, Tailwind, vanilla JS solutions
- **Voice**: Summarize in conversational tone, avoid marketing speak

See full skill: `.claude/skills/wvwo-web-research/SKILL.md`
See templates: `.claude/skills/wvwo-web-research/resources/templates/`

<!-- MANUAL ADDITIONS END -->

---

# WVWO Frontend Aesthetics (Hivemind-Synthesized)

> **Generated by 6-agent mesh swarm**: researcher, architect, analyzer, typography expert, color reviewer, synthesizer.
> **Purpose**: Prevent AI slop. Enforce authentic rural WV aesthetic.

## THE ANTI-SLOP DIRECTIVE

AI converges on generic "on distribution" outputs. For WVWO, this creates designs that feel like tech startups or coastal influencer brands. **REJECT THIS.**

Every design must feel like it came from Kim and Bryan, not from a model trained on Vercel landing pages.

## TYPOGRAPHY RULES

### USE THESE FONTS (Primary Stack)
```css
--font-display: 'Bitter', serif;           /* General store signage */
--font-hand: 'Permanent Marker', cursive;  /* Kim's Sharpie energy */
--font-body: 'Noto Sans', sans-serif;      /* Warm, conversational */
```

### APPROVED ALTERNATIVES BY VIBE
| Vibe | Display | Body | Hand |
|------|---------|------|------|
| **Hardware Store** | Rokkitt, Arvo | Public Sans, Karla | Kalam |
| **Field Guide** | Bitter, Zilla Slab | Source Serif 4, Lora | Patrick Hand |
| **Government Surplus** | Courier Prime | IBM Plex Sans | - |

### PAIRING PRINCIPLE
**High contrast = warmth.** Slab serif + humanist sans, handwritten breaks the grid.
- Display: Bold weights (700-900) - rural signage is BOLD
- Body: Normal weights (400-500) - readability over flair
- Hand: Use sparingly (20%) for Kim's personal touches

### USE EXTREMES (Not Middle Ground)
```css
/* ✅ CORRECT: High contrast */
h1 { font-weight: 800; font-size: 4rem; }  /* Big, bold, confident */
p  { font-weight: 400; font-size: 1rem; }  /* Readable, humble */

/* ❌ WRONG: Timid middle ground */
h1 { font-weight: 600; font-size: 1.5rem; } /* Weak, uncertain */
```
Size jumps of 2.5x+ between heading levels. Weight jumps of 300+. Timid = forgettable.

### RESPONSIVE TYPOGRAPHY SCALE
Mobile-first scaling for professional hierarchy:

| Class | Mobile | Tablet | Desktop | Use Case |
|-------|--------|--------|---------|----------|
| display-hero | 2.5rem | 4rem | 5rem | Homepage hero "Your Neighbors" |
| display-section | 1.875rem | 2.25rem | 3rem | Section headers "What We Carry" |
| display-card | 1.25rem | 1.5rem | 1.875rem | Category/product titles |
| body-large | 1rem | 1.125rem | 1.25rem | Hero subtext, intros |
| body-base | 0.875rem | 1rem | 1rem | Paragraphs, descriptions |

**Line Height Rules:**
- Display fonts: leading-tight (1.1-1.25) - bold signage doesn't need breathing room
- Body fonts: leading-relaxed (1.625) - readability for product descriptions
- Kim's handwritten: leading-normal (1.5) - natural Sharpie flow

### FORBIDDEN FONTS (AI Slop Indicators)
```
NEVER: Inter, DM Sans, Space Grotesk, Poppins, Outfit, Montserrat, Raleway, Open Sans, system-ui
```
These scream "SaaS startup." Wrong for Appalachian storefront.

## COLOR RULES

### THE WVWO PALETTE
```css
--brand-brown: #3E2723;        /* Rifle stocks, barn wood */
--sign-green: #2E7D32;         /* Forest, old metal signs */
--brand-cream: #FFF8E1;        /* Aged paper, deer hide */
--brand-mud: #5D4037;          /* 2016 flood mud */
--brand-orange: #FF6F00;       /* Blaze orange safety */

/* Weathered variations */
--brand-brown-faded: #6D4C41;  /* Sun-bleached */
--sign-green-muted: #558B2F;   /* Olive vintage */
--brand-orange-muted: #E65100; /* Rust-toned */
```

### FORBIDDEN COLORS
```
NEVER: Purple gradients, hot pink, neon anything, corporate blue (#0066cc), sterile grays on white
```

### ORANGE USAGE
<5% of screen. Highlighter, not paint bucket. CTAs and safety notices only.

### COLOR USAGE BY COMPONENT

| Component Type | Background | Border/Accent | Text | Hover |
|----------------|------------|---------------|------|-------|
| Primary CTA | sign-green | - | white | sign-green/90 |
| Secondary CTA | transparent | brand-brown | brand-brown | brand-mud |
| Ghost CTA | transparent | - | brand-brown | bg-brand-cream |
| Card | white or brand-cream | sign-green (left) | brand-brown | border-orange |
| Input (default) | brand-cream | brand-mud/30 | brand-brown | - |
| Input (focus) | brand-cream | sign-green | brand-brown | - |
| Input (error) | brand-cream | red-600 | brand-brown | - |
| Badge (stock) | sign-green | - | white | - |
| Badge (FFL) | brand-brown | - | brand-cream | - |
| Badge (sale) | brand-orange | - | white | - |
| Toast (success) | sign-green | - | white | - |
| Toast (error) | red-600 | - | white | - |
| Modal overlay | brand-brown/60 | - | - | - |
| Modal dialog | brand-cream | brand-mud | brand-brown | - |

**Orange Budget Rule**: Before adding orange to ANY component, audit the page. Must stay <5% of visible area. Orange reserved for: Primary CTAs, sale badges, required field asterisks.

## MOTION RULES

### ALLOWED
- Gentle reveals: `animation: gentle-reveal 0.8s ease both`
- Tactile hovers: `transform: translateY(-1px)` with shadow
- Pen-on-paper underlines: `background-size: 0% 2px → 100% 2px`

### FORBIDDEN
```
NEVER: Parallax, bouncy buttons, morphing gradients, glassmorphic reveals, confetti, slide-from-every-direction
```

### ALWAYS RESPECT
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

### COMPONENT ANIMATION PATTERNS

| Component | Hover Effect | Duration | Easing |
|-----------|--------------|----------|--------|
| Product Card | `scale-[1.02]` on image | 0.3s | ease-out |
| Category Card | `translateY(-2px)` + border-orange | 0.3s | ease-out |
| CTA Button | `translateY(-1px)` + shadow-md | 0.2s | ease-out |
| Nav Link | Pen-on-paper underline grow | 0.3s | ease-out |
| Card Border | `border-l-sign-green` → `border-l-brand-orange` | 0.3s | ease |

**Page Load Stagger**: For grids (categories, products), stagger entrance with `animation-delay: 60ms` per item.

**Interaction Feedback**:
- Button press: Brief `scale-[0.98]` (tactile press feel)
- Link hover: Underline grows left-to-right
- Form focus: Ring appears instantly (no fade)

**NO Animation List**: Parallax scrolling, bouncy/elastic easing, infinite animations, hero image zoom on scroll, cursor followers.

## LAYOUT RULES

### FORBIDDEN PATTERNS
- Center-aligned hero with "Revolutionize Your [Noun]"
- 3-column icon grid with pastel circles
- Perfect alternating image-left/image-right
- Floating cards with 3xl shadows and rounded corners
- Glassmorphic/neumorphic anything

### USE INSTEAD
- Asymmetric layouts (text-heavy left, photo right)
- Border accents, not floating shadows
- Real photos, not illustrations
- Sharp corners (rounded-sm), not trendy curves
- Slight rotations (2-3deg) like scrapbook

## VOICE RULES

### FORBIDDEN PHRASES (Silicon Valley Speak)
```
NEVER: "Unlock your potential", "Seamless experience", "Cutting-edge solutions",
       "Empower your journey", "Transform the way you", "All-in-one platform",
       "Next-level", "Revolutionize", "Trusted by industry leaders"
```

### KIM'S VOICE
```
USE: "We handle the paperwork legally and quickly."
     "If we don't have it, you probably don't need it."
     "We aren't just a store off the highway. We are your neighbors."
     "Grand love ya"
```

## IMAGERY RULES

### FORBIDDEN
- Stock office workers high-fiving
- Person smiling at MacBook
- Minimalist workspace with succulent
- AI-generated portraits
- Models in hunting costumes

### USE INSTEAD
- Real photos of the actual shop
- Phone-quality is acceptable
- Grayscale treatments
- Raw flood photos

**Philosophy**: If it looks like stock, it's wrong. If it looks like Kim took it on her phone, it's right.

## FORM DESIGN RULES

Forms are critical for FFL transfers, contact, and checkout. Must feel like Kim's clipboard, not a corporate portal.

### Input Fields
```css
/* Default state */
input { @apply bg-brand-cream border-2 border-brand-mud/30 rounded-sm px-4 py-3 font-body; }

/* Focus state - green ring, no glow */
input:focus { @apply ring-2 ring-sign-green border-sign-green outline-none; }

/* Error state */
input.error { @apply ring-2 ring-red-600 border-red-600; }

/* Success state */
input.success { @apply ring-2 ring-sign-green border-sign-green; }
```

### Labels & Required Fields
- Font: `font-display font-medium` (Bitter, not handwritten)
- Required indicator: Asterisk in `text-brand-orange` (not generic red)
- Helper text: `text-sm text-brand-mud/60`
- Position: Above field, left-aligned (like a paper form)

### Error Messages
- Position: Below field, left-aligned
- Style: `text-sm text-red-600 mt-1`
- Voice: Kim's tone ("Oops, we need your phone number to call you back")
- NO: "Invalid input", "Required field", generic robot speak

### Multi-Step Forms (FFL Transfers)
Kim walks customers through FFL paperwork step-by-step. Digital should feel the same.

1. Progress indicator: Simple numbered circles, not fancy stepper
2. Current step: `bg-sign-green text-white`
3. Completed step: Checkmark icon in `text-sign-green`
4. Step titles: Kim's voice ("Tell us about yourself", "About the firearm", "Review & submit")

### Form Examples (Kim's Voice)
```
WRONG: "Please enter a valid email address"
RIGHT: "We'll need your email to send the transfer details"

WRONG: "This field is required"
RIGHT: "Don't forget your phone number - we'll call when it's ready"

WRONG: "Form submitted successfully"
RIGHT: "Got it! We'll be in touch within 24 hours. Grand love ya!"
```

## LOADING & FEEDBACK PATTERNS

### Loading States
Keep it simple. Kim's shop doesn't have fancy animations - just honest waiting.

- **Spinner**: Simple circular in `text-sign-green`, 1.5rem size
- **Skeleton**: `bg-brand-mud/10` blocks with subtle pulse (not shimmer)
- **Duration**: Only show for waits >500ms (avoid flicker)
- **NO**: Bouncing dots, morphing shapes, progress bars for unknown durations

### Empty States
When there's nothing to show, Kim's voice fills the gap:

```
Cart empty: "Your cart's looking a little empty. Browse our [category] to get started."
No search results: "Hmm, we couldn't find that. Give us a call - if we don't have it, we can probably order it."
Out of stock: "This one's popular! Leave your email and we'll holler when it's back."
```

- Illustration: Simple line icon (shopping bag, magnifying glass), not elaborate artwork
- CTA: Always include next action ("Browse categories", "Call us", "View similar")
- Font: Body text in `font-body`, CTA in `font-display`

### Toast Notifications
Quick feedback for actions (add to cart, form submit, etc.)

- **Position**: Top-right (desktop), top-center (mobile)
- **Duration**: 4 seconds with manual dismiss X
- **Success**: `bg-sign-green text-white` with checkmark
- **Error**: `bg-red-600 text-white` with X icon
- **Info**: `bg-brand-brown text-brand-cream`
- **Style**: `rounded-sm shadow-md` (sharp corners, harder shadow)
- **NO**: Confetti, slide-from-bottom, stacking toasts

### Cart Feedback
When someone adds to cart:

1. Button text: "Add to Cart" → "Added ✓" (hold 2 seconds, then reset)
2. Cart icon: Brief pulse animation (scale 1.1 for 0.3s)
3. NO: Modal popup, page redirect, confetti explosion

## MODAL & DIALOG PATTERNS

Guidelines ban glassmorphism - here's what TO use instead.

### Overlay Background
```css
.modal-overlay {
  background: rgba(62, 39, 35, 0.6); /* brand-brown at 60% */
  /* NO: backdrop-blur, pure black, gradient overlays */
}
```

### Dialog Box
```css
.modal-dialog {
  @apply bg-brand-cream border-2 border-brand-mud rounded-sm;
  @apply shadow-xl max-w-lg mx-4 p-6 md:p-8;
  /* NO: rounded-2xl, glassmorphic bg, floating without border */
}
```

### Dialog Header
- Title: `font-display font-bold text-2xl text-brand-brown`
- Close button: Simple X in top-right, `text-brand-mud hover:text-sign-green`
- NO: Elaborate icons, gradient backgrounds, decorative elements

### Dialog Content
- Body text: `font-body text-brand-mud`
- Spacing: Generous padding (p-6 minimum)
- Actions: Right-aligned, primary CTA in `sign-green`, secondary in `outline`

### Common Dialogs (Kim's Voice)
```
Confirm delete: "You sure? Once it's gone, it's gone."
Unsaved changes: "Hold up - you've got unsaved changes. Want to save first?"
Session timeout: "You've been away a while. For security, we logged you out."
```

## E-COMMERCE PATTERNS (Phase 3C)

Professional retail patterns adapted for WVWO aesthetic.

### Product Grid
```css
/* Responsive grid */
.product-grid {
  @apply grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6;
}
```

- Cards: Border-left accent (`border-l-4 border-l-sign-green`)
- Background: `bg-white` for product photos (clean display)
- NO: Floating shadows, rounded-xl corners, gradient overlays

### Product Card Anatomy
1. **Image**: `aspect-square object-contain bg-white` (show full product)
2. **Brand badge**: `text-brand-orange text-xs font-medium`
3. **Title**: `font-display font-bold text-brand-brown line-clamp-2`
4. **Price**: `font-display text-lg text-sign-green`
5. **CTA**: Context-aware (shippable vs call-to-order)

### Add to Cart Flow
```
1. User clicks "Add to Cart"
2. Button shows spinner (0.5s max)
3. Button text changes: "Added ✓" (green checkmark)
4. Cart icon pulses briefly
5. Button resets after 2 seconds
6. NO: Modal popup, page redirect, confetti
```

### Cart Page Layout
- Desktop: 2/3 items list, 1/3 order summary (sticky)
- Mobile: Full-width items, summary below
- Item row: Image (80px), title, quantity +/-, price, remove link
- Remove: Text link ("Remove") not icon-only button

### Cart Empty State
```
"Your cart's looking a little empty."
[Browse Guns] [Browse Ammo] [Browse Gear]
"Or give us a call - we're happy to help you find what you need."
(304) 649-5765
```

### Checkout Flow
- Style: Single page with collapsible sections
- Sections: Contact → Shipping → Payment → Review
- Progress: Simple numbered steps at top
- Trust signals: FFL badge, phone number, "Family-owned since 2008"
- Local pickup: Radio option with shop address + hours

## SHADCN/UI ENFORCEMENT RULES

shadcn components are copied into our codebase - we OWN them. Customize aggressively.

### Mandatory Overrides (All Components)
```
rounded-md → rounded-sm (ALWAYS)
rounded-lg → rounded-sm (ALWAYS)
rounded-xl → rounded-sm (ALWAYS)
```

### Button Component (`src/components/ui/button.tsx`)
Add WVWO custom variants:

```typescript
variant: {
  // ... existing variants ...

  // WVWO custom
  wvwo: "bg-brand-brown text-brand-cream hover:bg-brand-mud font-display font-bold rounded-sm",
  cta: "bg-sign-green text-white hover:bg-sign-green/90 font-display font-bold rounded-sm",
  blaze: "bg-brand-orange text-white hover:bg-brand-orange/90 font-display font-bold rounded-sm",
}
```

### Card Component (`src/components/ui/card.tsx`)
- Enforce `rounded-sm`
- Use `border-l-4 border-l-sign-green` pattern for product cards

### Badge Component (`src/components/ui/badge.tsx`)
Add WVWO custom variants:

```typescript
variant: {
  // ... existing ...
  stock: "bg-sign-green text-white rounded-sm",
  ffl: "bg-brand-brown text-brand-cream rounded-sm",
  blaze: "bg-brand-orange text-white rounded-sm font-hand",
}
```

### Shadow Overrides (`shadcn-wvwo.css`)
Harder shadows for WVWO (not soft SaaS shadows):

```css
.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.15); }
.shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2); }
```

### When to Use shadcn vs Astro
| Use Case | Component Type | Why |
|----------|----------------|-----|
| Product cards | Astro (.astro) | Static, no hydration needed |
| Category grid | Astro (.astro) | Static, better performance |
| Cart slide-over | React (Sheet) | Needs interactivity |
| Checkout form | React (Form) | Validation, state management |
| Product filters | React (Accordion) | Collapse/expand interaction |
| Tooltips | React (Tooltip) | Hover state management |

## PRODUCT CONTENT STRUCTURE

### Product Description Template
```
1. HOOK (1 sentence): What it does, who it's for
2. FEATURES (3-5 bullets): Key benefits, specs that matter
3. KIM'S TAKE (1-2 sentences): Personal recommendation in font-hand
4. SPECS (if applicable): Caliber, size, weight, material
```

### Example: Hunting Jacket
```
Built for cold stands. The Badlands jacket keeps you warm through morning
frost and afternoon wind.

• PrimaLoft insulation rated to 20°F
• Odor control lining won't spook deer
• Quiet outer shell for movement
• Reinforced elbows and shoulders
• Available in Mossy Oak or Realtree

*Kim says: "I've worn mine four seasons now. Still waterproof, still warm."*

Specs: M-3XL | 2.4 lbs | Machine washable
```

### Voice Rules for Products
```
WRONG: "Experience unparalleled warmth with our premium insulation technology"
RIGHT: "Keeps you warm on 20-degree mornings. Trust us, we've tested it."

WRONG: "Industry-leading performance in all conditions"
RIGHT: "Works in rain, snow, and that weird November drizzle"

WRONG: "Shop now and elevate your hunting experience"
RIGHT: "Questions? Give us a call - we've got this jacket in the shop"
```

## 5 LITMUS TESTS (Run Before Every Design Decision)

| Test | Question | Fail Condition |
|------|----------|----------------|
| **Neighbor** | Would Kim's neighbor say "That's fancy!" or "That's you"? | "Fancy" = wrong |
| **Bulletin Board** | Would this look out of place next to handwritten notes? | Yes = too polished |
| **Voice** | Does this sound like Kim or a marketing agency? | Any doubt = AI slop |
| **Five-Year** | Will this trend embarrass us in 2030? | Purple gradients fail |
| **Free-Tier** | Does this require paid services Kim can't maintain? | Yes = violates simplicity |

## QUICK ENFORCEMENT CHECKLIST

Before merging ANY design:
```
[ ] Zero SaaS marketing language
[ ] Zero trendy fonts (Inter, Poppins, Space Grotesk)
[ ] Zero purple/pink gradients or neon
[ ] Zero glassmorphic/neumorphic effects
[ ] Zero stock photos of models
[ ] Zero bouncy animations or parallax
[ ] Text sounds like Kim's actual voice
[ ] Colors tie to real WV objects
[ ] Layout feels handmade, not template
[ ] Passed all 5 litmus tests
```

## QUICK REFERENCE TABLE

| Element | DO | DON'T |
|---------|-----|-------|
| Display Font | Bitter, Rokkitt | Inter, DM Sans |
| Body Font | Noto Sans, Public Sans | system-ui, Open Sans |
| Hand Font | Permanent Marker | Generic script |
| Backgrounds | Textured, noisy | Flat, gradient |
| Borders | Left-accent, sharp | Floating shadows |
| Animations | Gentle, tactile | Bouncy, parallax |
| Photos | Real, grainy | Stock, staged |
| Copy | Kim's voice | Marketing speak |

---

**Full reference with CSS snippets**: [docs/WVWO_FRONTEND_AESTHETICS.md](docs/WVWO_FRONTEND_AESTHETICS.md)

---

## ISOLATED PROMPTS (Quick Targeted Guidance)

Use these when you need focused control over a single dimension:

### Typography-Only (Fast)
```text
<wvwo_typography>
Use Bitter (display), Permanent Marker (hand), Noto Sans (body).
Bold weights 700-900 for headings. Size jumps 2.5x+.
NEVER: Inter, Poppins, Space Grotesk, system fonts.
Rural signage energy, not SaaS dashboard.
</wvwo_typography>
```

### Color-Only (Fast)
```text
<wvwo_color>
Brown #3E2723, Green #2E7D32, Cream #FFF8E1, Orange #FF6F00.
Orange <5% of screen (CTAs only). Weathered variations for depth.
NEVER: Purple gradients, hot pink, neon, corporate blue.
Colors tied to real WV objects: barn wood, forest, blaze orange.
</wvwo_color>
```

### Voice-Only (Fast)
```text
<wvwo_voice>
Write like Kim, not a marketing agency.
USE: "We handle the paperwork legally and quickly." / "Grand love ya"
NEVER: "Unlock potential", "Seamless experience", "Next-level", "Revolutionize"
Faith-forward, humble, rural WV authentic. Zero buzzwords.
</wvwo_voice>
```

### WVWO Theme Lock (Full Constraint)
```text
<wvwo_theme_lock>
Always design with WVWO aesthetic:
- Weathered earth palette (browns, forest greens, cream, blaze orange accents)
- Slab serif + handwritten typography (Bitter, Permanent Marker)
- Textured backgrounds (wood grain, worn paper, subtle noise)
- Asymmetric layouts with border accents, not floating shadows
- Sharp corners (rounded-sm), slight rotations like scrapbook
- Real photography energy, even if illustrated
- Faith-forward, humble, rural WV authentic voice
- NO: Purple, neon, glassmorphism, parallax, Inter font, marketing speak
The vibe: Hand-painted sign on weathered barn wood at the edge of the holler.
</wvwo_theme_lock>
```
