# Universal Intelligence System Setup Prompt

> **Purpose**: Copy this entire prompt into Claude Code in ANY repository to get a custom AgentDB intelligence/memory system tailored to that project.

---

## THE PROMPT (Copy Everything Below This Line)

```
# Set Up AgentDB Intelligence System for This Project

## Your Mission
Analyze this codebase and create a custom intelligence/memory system that makes you (Claude) a better lead developer for this specific project. You should remember context across sessions, learn what works for this codebase, and understand the project's strategic direction.

## Step 1: Research the 7 AgentDB Skills

Fetch and analyze the official documentation:

```bash
# Option A: Direct fetch
WebFetch https://raw.githubusercontent.com/ruvnet/claude-flow/main/docs/guides/skills-tutorial.md "Extract all 7 intelligence/memory skills. For each skill: name, purpose, key features, use cases, how to invoke"
```

The 7 skills to evaluate:

1. **agentdb-memory-patterns** - Session + long-term memory
2. **agentdb-vector-search** - Semantic code search
3. **reasoningbank-agentdb** - Learn from task outcomes
4. **agentdb-learning** - Reinforcement learning (9 algorithms)
5. **agentdb-optimization** - Performance tuning (quantization, HNSW)
6. **agentdb-advanced** - Enterprise distributed features
7. **reasoningbank-intelligence** - Pattern recognition, strategy

## Step 2: Analyze This Codebase (Do These Concurrently)

### A. Tech Stack Detection

```bash
# Find package.json, Cargo.toml, requirements.txt, go.mod, etc.
Glob "**/package.json" OR "**/Cargo.toml" OR "**/requirements.txt" OR "**/go.mod" OR "**/pyproject.toml"
Read [found config files]
```

### B. Codebase Size

```bash
# Count files by type
Glob "**/*.{js,ts,jsx,tsx,py,go,rs,astro,vue,svelte}"
# Report: "X files total, largest directories"
```

### C. Architecture Patterns

```bash
# Look for common patterns
Glob "**/components/**/*"
Glob "**/pages/**/*" OR "**/routes/**/*" OR "**/views/**/*"
Glob "**/api/**/*" OR "**/services/**/*"
Glob "**/tests/**/*" OR "**/*.test.*" OR "**/*.spec.*"
```

### D. Project Documentation

```bash
Read README.md
Read CLAUDE.md (if exists)
Read CONTRIBUTING.md (if exists)
```

## Step 3: Create Skill Matching Matrix

Based on your analysis, fill out this table:

| Skill | Needed? | Why / Why Not | Priority |
|-------|---------|---------------|----------|
| agentdb-memory-patterns | | | |
| agentdb-vector-search | | | |
| reasoningbank-agentdb | | | |
| agentdb-learning | | | |
| agentdb-optimization | | | |
| agentdb-advanced | | | |
| reasoningbank-intelligence | | | |

**Decision Criteria:**

- **ESSENTIAL**: Codebase > 20 files, multi-session work, clear patterns/conventions
- **USEFUL**: 50+ files (vector search), repeated similar tasks
- **OVERKILL**: Solo dev (no advanced), small project (no optimization), prototype (no learning)

## Step 4: Generate Custom Implementation Prompts

For each ESSENTIAL skill, create a specific prompt tailored to this project.

### Template for Memory Patterns Prompt

```
Use the agentdb-memory-patterns skill to set up persistent memory for this project.

Store in long-term memory:
1. PROJECT IDENTITY: "[One-line description of what this project is]"
2. TECH STACK: "[Primary frameworks, languages, build tools]"
3. ARCHITECTURE: "[Key architectural patterns - components, API, etc.]"
4. CONVENTIONS: "[Code style, naming conventions, file organization]"
5. INTEGRATIONS: "[External services, APIs, databases]"

Create namespace "[project-name]" for session context.
```

### Template for ReasoningBank Prompt

```
Use the reasoningbank-agentdb skill to enable learning for this project.

Track these patterns:
1. SUCCESS: When [specific tech stack] approaches work
2. FAILURE: When I suggest [anti-patterns for this project]
3. COMPONENTS: How [project name] structures [main abstractions]
4. TESTING: What test patterns work for this codebase

Enable verdict judgment to improve over time.
```

### Template for Intelligence Prompt

```
Use the reasoningbank-intelligence skill for strategic understanding.

Store strategic decisions:
1. [PRINCIPLE_1]: "[Why this project made this architectural choice]"
2. [PRINCIPLE_2]: "[Key constraint or preference]"
3. [PRINCIPLE_3]: "[Business/user context that affects technical decisions]"

Check suggestions against these principles before recommending changes.
```

### Template for Vector Search Prompt (if needed)

```
Use the agentdb-vector-search skill to index this codebase.

Index these directories:
- [src/components/] - [description]
- [src/pages/] - [description]
- [src/api/] - [description]

Enable semantic search so I can find code by meaning.
```

## Step 5: Create Session Protocol

Generate a CLAUDE.md section (or standalone file) with:

```markdown
## [PROJECT_NAME] Intelligence System

### SESSION START
1. Load context: `Read .agentdb/[project]-context.json`
2. Recall patterns: `npx agentdb@latest reflexion retrieve "[PROJECT]" --k 5`
3. Acknowledge: "[Brief context summary]"

### DURING WORK
- REJECT if: [Anti-patterns list]
- APPROVE if: [Approved patterns list]
- After tasks: Store success/failure with `npx agentdb@latest reflexion store`

### SESSION END
1. Summarize learnings
2. Consolidate: `npx agentdb@latest skill consolidate 3 0.8 7 true`
3. Discover: `npx agentdb@latest learner run 3 0.6 0.7`

### HARD RULES
- NEVER [anti-pattern 1]
- NEVER [anti-pattern 2]
- ALWAYS [required pattern 1]
- ALWAYS [required pattern 2]

### QUICK COMMANDS
```bash
npx agentdb@latest skill search "[query]" 5
npx agentdb@latest reflexion retrieve "[topic]" --k 5
npx agentdb@latest reflexion store "[project]" "<task>" [1.0|0.0] [true|false] "<note>"
npx agentdb@latest reflexion critique-summary "[PROJECT]"
```

```

## Step 6: Deliver Final Output

Provide:
1. **Skill Matrix** - Completed table with recommendations
2. **Custom Prompts** - One prompt per essential skill (copy-pasteable)
3. **Session Protocol** - Ready to add to CLAUDE.md
4. **Implementation Commands** - Bash commands to initialize AgentDB
5. **Estimated ROI** - Setup time vs time saved per session

## Constraints
- Focus on PRACTICAL over theoretical
- Skip skills that are overkill for this project size
- Use actual project terminology in prompts
- Keep total context under 2000 tokens
- Make everything copy-pasteable

---

**Execute this analysis now for the current repository.**
```

---

## How to Use

1. **Copy** everything between the two `---` lines above
2. **Open** Claude Code in any repository you want to set up
3. **Paste** the prompt
4. **Claude will**:
   - Fetch the skills docs
   - Analyze your codebase
   - Recommend which skills you need
   - Generate custom prompts for YOUR project
   - Create a session protocol

## What You Get

| Output | Description |
|--------|-------------|
| Skill Matrix | Which of the 7 skills you actually need |
| Custom Prompts | 3-4 prompts tailored to your project |
| Session Protocol | Copy-paste CLAUDE.md section |
| Implementation | Bash commands to run |
| ROI Estimate | Is it worth it for this project? |

## Example Results

For a **React SaaS app**:

- Essential: memory-patterns, reasoningbank-agentdb, vector-search
- Skip: learning, optimization, advanced

For a **Python CLI tool**:

- Essential: memory-patterns, reasoningbank-intelligence
- Skip: vector-search (small), learning, optimization, advanced

For a **Rust systems library**:

- Essential: memory-patterns, vector-search, reasoningbank-agentdb
- Skip: learning, optimization (unless huge), advanced

---

## Quick Version (Shorter Prompt)

If you want a faster, less thorough analysis:

```
Analyze this codebase and recommend which AgentDB intelligence skills I need.

Fetch: https://raw.githubusercontent.com/ruvnet/claude-flow/main/docs/guides/skills-tutorial.md

Then:
1. Detect tech stack and codebase size
2. Evaluate which of the 7 skills are ESSENTIAL vs OVERKILL
3. Generate custom setup prompts for essential skills only
4. Create a session protocol for CLAUDE.md

Keep it practical - skip enterprise features for solo dev projects.
```
