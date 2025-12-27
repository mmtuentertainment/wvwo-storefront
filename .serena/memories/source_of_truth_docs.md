# WVWO Source of Truth Documents

## Primary Documents

### 1. INTELLIGENCE.md (Root)
**Purpose**: Complete business identity, history, verified facts
**Contains**:
- Business identity (name, address, phone, owners)
- Timeline (2008-present, including 2016 flood)
- Licenses & credentials (FFL, Vortex dealer, WVDNR agent)
- Inventory observations
- Competitive landscape (30-mile radius)
- Kim's verified quotes and voice

### 2. WVWO_FRONTEND_AESTHETICS.md (docs/)
**Purpose**: Design system and anti-slop directive
**Contains**:
- Typography (Bitter, Permanent Marker, Noto Sans - NEVER Inter/Poppins)
- Colors (brand-brown, sign-green, brand-cream, brand-orange)
- Border radius (rounded-sm ONLY)
- Animation patterns (Morning Mist Lift)
- The "AI Slop" rejection principle
- Kim's voice guidelines

### 3. MASTER-SEQUENCING-PLAN.md (docs/specs/Mountain State Adventure Destination/)
**Purpose**: 64-spec execution roadmap
**Contains**:
- Current status (SPEC-07-09 complete, 61 remaining)
- Timeline (Jan-May 2026)
- Batch structure (Components → Templates → Migrations → Destinations)
- Hive mind coordination patterns
- Kim review cadence (~1 hr/week async)
- Quality gates per batch

### 4. CLAUDE.md (Root)
**Purpose**: Claude Code configuration
**Contains**:
- SPARC methodology commands
- Agent types (54 available)
- MCP tool categories
- Concurrent execution rules
- Git commit protocol

## Supporting Documents

### docs/WVWO-INTELLIGENCE-CHEATSHEET.md
Quick reference for business facts

### docs/UNIVERSAL_INTELLIGENCE_SETUP_PROMPT.md
How to load WVWO context into new sessions

### docs/CLAUDE_INTELLIGENCE_ENHANCEMENT_ANALYSIS.md
Analysis of intelligence gathering patterns

## Memory Systems

### ReasoningBank (.swarm/memory.db)
- 172 WVWO patterns migrated from AgentDB
- Namespaces: wvwo-successes, wvwo-failures, wvwo-components, wvwo-ui, wvwo-ecommerce, wvwo-astro
- Query: `npx claude-flow@alpha memory query "pattern" --reasoningbank`

### Serena Memories (.serena/memories/)
- project_overview.md
- suggested_commands.md
- style_conventions.md
- task_completion.md
- codebase_structure.md
- strategic_pivot.md
- business_identity.md
- source_of_truth_docs.md (this file)
