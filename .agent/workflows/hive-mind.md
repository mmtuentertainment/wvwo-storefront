---
description: Spawn a Hive Mind swarm for complex multi-agent tasks
---

# Hive Mind Swarm Workflow

Use this workflow when you need multi-agent coordination for complex tasks.

## When to Use

- SPEC planning (like SPEC-05)
- Multi-file refactoring
- Research-intensive tasks
- Code review with multiple perspectives
- Content creation requiring research + implementation

## Available Swarm Templates

| Template | Queen | Workers | Use Case |
|----------|-------|---------|----------|
| `research-swarm` | Strategic | 3 scouts + 1 researcher | Best practices, competitive analysis |
| `implementation-swarm` | Tactical | 1 architect + 2 coders + 1 tester + 1 reviewer | Feature implementation |
| `spec-planning-swarm` | Strategic | 3 scouts + 2 architects + 1 reviewer | SPEC planning (SPEC-05 pattern) |
| `review-swarm` | Adaptive | 2 reviewers + 1 security + 1 performance | PR review, audits |
| `content-swarm` | Adaptive | 1 researcher + 1 coder + 1 reviewer | WVWO content creation |

## Steps

### 1. Check Hive Mind Status
```bash
npx claude-flow@alpha hive-mind status
```

### 2. Initialize if Needed
```bash
npx claude-flow@alpha hive-mind init
```

### 3. Spawn Swarm with Objective
```bash
npx claude-flow@alpha hive-mind spawn "Your objective here"
```

### 4. For SPEC-05 Style Planning (Recommended Pattern)

Use this hierarchical pattern:

1. **Load Context First** (AgentDB):
   ```bash
   npx agentdb@latest reflexion retrieve "relevant topic" --k 15 --synthesize-context
   ```

2. **Spawn Queen Coordinator**:
   - Queen decomposes objective into phases
   - Queen spawns scouts (parallel research)
   - Queen spawns architects (sequential design)
   - Queen spawns reviewer (validation)
   - Queen synthesizes final plan.md

3. **Pattern**: Scouts gather → Architects design → Reviewer validates → Queen delivers

## WVWO Constraints (Always Apply)

- ✅ Kim's authentic voice (not corporate)
- ✅ Brand colors (sign-green, brand-brown, brand-cream)
- ✅ rounded-sm (sharp corners)
- ✅ Astro + Tailwind + React/shadcn
- ❌ No Vue/Angular/Svelte/Next.js
- ❌ No purple/neon colors

## Example: Research Swarm

```bash
# Spawn research swarm
npx claude-flow@alpha hive-mind spawn "Research best practices for feature flag implementation in Astro static sites"
```

## Example: SPEC Planning Swarm

```bash
# Spawn SPEC planning swarm (3 scouts + 2 architects + 1 reviewer)
npx claude-flow@alpha hive-mind spawn "Design SPEC-06 implementation plan following hierarchical swarm pattern: 3 scouts research, 2 architects design, 1 reviewer validates"
```

## MCP Tools Available

| Tool | Purpose |
|------|---------|
| `consensus_vote` | Democratic decisions |
| `memory_share` | Share knowledge across hive |
| `swarm_think` | Collective problem solving |
| `queen_delegate` | Delegate to workers |
| `task_aggregate` | Combine results |

## Tips

1. **Load AgentDB context FIRST** before spawning swarm
2. **Use hierarchical pattern** for complex planning
3. **Scouts gather in parallel**, architects work sequentially
4. **Queen synthesizes** all outputs into deliverable
5. **Store learnings** after swarm completes with AgentDB
