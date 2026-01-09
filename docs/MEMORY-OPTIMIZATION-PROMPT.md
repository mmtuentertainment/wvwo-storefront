# 🧠 Universal Memory Optimization System - Deployment Prompt

**Copy this prompt to Claude Opus 4.5 for ANY project to set up advanced memory architecture.**

---

## 📋 PROMPT FOR CLAUDE OPUS 4.5

```
MISSION: Deploy Advanced Memory Optimization System for Maximum Token Efficiency

You are deploying a comprehensive 4-tier memory architecture to optimize this codebase for 40-60% token reduction in future development work.

**CRITICAL CONTEXT:**
- Project: [YOUR_PROJECT_NAME]
- Working Directory: [YOUR_PROJECT_PATH]
- Tech Stack: [YOUR_STACK - e.g., React/TypeScript/Next.js]
- Codebase Size: [ESTIMATE - e.g., ~50 files, ~15,000 lines]
- Primary Goal: Reduce token usage for common dev questions, pattern recall, architecture lookups

---

## PHASE 1: DATABASE AUDIT & CLEANUP

### Step 1.1: Inventory Existing Databases

Search for all existing memory databases:
```bash
find . -name "*.db" -o -name "agentdb*" -o -name ".swarm" -type d
```

Expected databases you might find:
- `agentdb.db` (root or `.agentdb/`) - AgentDB skills
- `.swarm/memory.db` - ReasoningBank patterns
- `.hive-mind/*.db` - Hive Mind coordination
- Potential orphaned duplicates from testing

### Step 1.2: Analyze Each Database

For EACH database found, determine:
```bash
# Get database size
ls -lh [database_path]

# Count transactions (SQLite)
sqlite3 [database_path] "SELECT COUNT(*) FROM sqlite_master WHERE type='table';"

# Check last modified
stat [database_path]
```

**Classify as:**
- ✅ ACTIVE (high transaction count, recently modified)
- ⚠️ DORMANT (low transactions, old modification date)
- ❌ ORPHANED (duplicate of active DB, safe to delete)

### Step 1.3: Research Industry Best Practices

Use WebSearch to find:
1. "Vector database best practices 2025"
2. "AgentDB ReasoningBank integration patterns"
3. "Multi-database strategy for AI agents"
4. "Hybrid Store Pattern agentic AI"

**Expected finding:** Specialized databases for specialized purposes (NOT unified monolithic DB)

### Step 1.4: Clean Up Orphaned Databases

**BEFORE deletion:**
```bash
# Backup everything
mkdir -p docs/memory-backups/$(date +%Y-%m-%d)-cleanup
cp -r .agentdb docs/memory-backups/$(date +%Y-%m-%d)-cleanup/
cp agentdb.db docs/memory-backups/$(date +%Y-%m-%d)-cleanup/ 2>/dev/null || true
```

**Delete orphaned duplicates:**
```bash
# Only delete files with <10 transactions AND older than 7 days
# Examples:
rm .agentdb/wvwo-memory.db      # If duplicate exists
rm .agentdb/reasoningbank.db    # If duplicate exists
```

**Verify cleanup:**
```bash
# Test that ReasoningBank still works
claude-flow memory query "test query" --namespace [your-namespace] --reasoningbank
```

---

## PHASE 2: REASONINGBANK SEMANTIC MEMORY

### Step 2.1: Install Global Claude Flow

```bash
npm install -g claude-flow@alpha
```

**Why global:** Provides real AI semantic embeddings (Xenova/all-MiniLM-L6-v2) instead of hash-based fallback.

### Step 2.2: Store Critical Patterns

After completing major features/PRs, store patterns:

```bash
claude-flow memory store "feature-name-complete" "Pattern description with key learnings, decisions, and gotchas. Include file paths, line counts, PR numbers." --namespace [project-name]-successes --reasoningbank
```

**What to store:**
1. **Completed Feature Patterns**
   - What worked well (architecture decisions)
   - What didn't work (gotchas, pitfalls)
   - Key file locations, line counts
   - PR numbers, commit hashes

2. **Architectural Decisions**
   - Why you chose X over Y
   - Trade-offs considered
   - Performance implications
   - Future migration paths

3. **Code Review Verdict Patterns**
   - Common review feedback
   - "ALWAYS do X" patterns
   - "NEVER do Y" anti-patterns
   - Edge cases to watch for

4. **Common Dev Questions**
   - FAQ-style Q&A
   - "How to add feature X"
   - "Where is Y handled"
   - File organization patterns

### Step 2.3: Verify Semantic Search

```bash
# Query for patterns
claude-flow memory query "architecture patterns" --namespace [project-name]-successes --reasoningbank

# Expected: 60-95% match scores for relevant memories
```

**If match scores <50%:** You're using npx (hash fallback) instead of global installation.

### Step 2.4: Create Memory Storage Checklist

Document when to store memories:
- ✅ After completing major features
- ✅ After discovering important architectural patterns
- ✅ After solving complex problems
- ✅ After PR reviews with important feedback
- ✅ Monthly pattern review sessions

---

## PHASE 3: SERENA SEMANTIC CODE INDEXING

### Step 3.1: Activate Serena Project

```typescript
mcp__serena__activate_project({ project: "[project-name]" })
```

**Verify activation:**
```typescript
mcp__serena__list_memories()
// Should show existing project memories
```

### Step 3.2: Index Codebase Symbols

**Create 5 comprehensive memory entries using mcp__serena__write_memory:**

#### Memory 1: Component/Module Architecture
```typescript
mcp__serena__write_memory({
  memory_file_name: "[project]-component-architecture",
  content: `
COMPONENT ARCHITECTURE PATTERNS

Directory Structure:
- [List key directories: src/components, src/utils, src/types, etc.]

Component Patterns:
[Use mcp__serena__get_symbols_overview on key files]
- Main component types (e.g., Page components, Layout components, UI components)
- Shared utilities (formatters, validators, API clients)
- Type hierarchy (interfaces, schemas, props)

Symbol Counts:
- [File 1]: X symbols (list top-level exports)
- [File 2]: Y symbols
- [File 3]: Z symbols

Reusable Patterns:
- [Pattern 1: e.g., "All pages use Layout wrapper"]
- [Pattern 2: e.g., "API calls go through client/ directory"]
- [Pattern 3: e.g., "Types in types/ directory, never inline"]

See Related Memories: [project]-routing-patterns, [project]-type-system
  `
})
```

#### Memory 2: Routing & Navigation Patterns
```typescript
mcp__serena__write_memory({
  memory_file_name: "[project]-routing-patterns",
  content: `
ROUTING & NAVIGATION ARCHITECTURE

Route Structure:
[Map out your routing system]
- Static routes: /about, /contact, etc.
- Dynamic routes: /blog/[slug], /products/[id], etc.
- API routes: /api/*, /api/v1/*, etc.

Route File Locations:
- [Framework-specific: pages/, app/, routes/, etc.]

URL Generation Patterns:
[Document how URLs are built]
- Helper functions: getProductUrl(), getBlogUrl(), etc.
- Link components: <Link>, <NavLink>, etc.

Common 404 Causes:
1. [List project-specific 404 pitfalls]
2. [e.g., "Missing slug in dynamic route"]
3. [e.g., "Route file not created after adding type"]

New Route Checklist:
[ ] Step 1: [e.g., Add route file]
[ ] Step 2: [e.g., Update navigation]
[ ] Step 3: [e.g., Add to sitemap]
[ ] Step 4: [e.g., Create link helper]

See Related Memories: [project]-component-architecture
  `
})
```

#### Memory 3: Modular Design Patterns
```typescript
mcp__serena__write_memory({
  memory_file_name: "[project]-modular-design-patterns",
  content: `
MODULAR DESIGN & CODE ORGANIZATION

File Size Limits:
- Maximum lines per file: [YOUR_LIMIT - e.g., 500, 300, 200]
- When to extract: [Threshold - e.g., "When file exceeds limit OR has >5 responsibilities"]

Extraction Patterns:
[Document how you modularize code]
1. Extract Pattern: [e.g., "Large data arrays → separate files"]
2. Naming Convention: [e.g., "main-file-category.ts"]
3. Import Pattern: [e.g., "Main file as orchestrator, import extracted modules"]
4. Type Exports: [e.g., "Export shared types from types/ directory"]

Real-World Examples:
- Example 1: [File that was refactored, before/after line counts]
- Example 2: [Component extracted to separate module]
- Example 3: [Utility function library organization]

Code Organization Rules:
- [Rule 1: e.g., "One component per file"]
- [Rule 2: e.g., "Group related utilities in directories"]
- [Rule 3: e.g., "Test files adjacent to source: __tests__/ or .test.ts"]

See Related Memories: [project]-component-architecture
  `
})
```

#### Memory 4: Code Review Verdict Patterns
```typescript
mcp__serena__write_memory({
  memory_file_name: "[project]-code-review-verdicts",
  content: `
CODE REVIEW VERDICT PATTERNS

ALWAYS Do These (Learned from PR Reviews):
1. [Pattern 1 - e.g., "Validate numeric inputs with Number.isFinite()"]
2. [Pattern 2 - e.g., "Document pending features in JSDoc with @pending"]
3. [Pattern 3 - e.g., "Use environment-safe checks (import.meta.env not process.env)"]
4. [Pattern 4 - e.g., "Keep type guards pure (no input mutation)"]
5. [Pattern 5 - e.g., "Write comprehensive tests for utilities (>85% coverage)"]

NEVER Do These (Common Mistakes):
1. [Anti-pattern 1 - e.g., "Don't duplicate data - derive from single source"]
2. [Anti-pattern 2 - e.g., "Don't use typeof === 'number' without Number.isFinite()"]
3. [Anti-pattern 3 - e.g., "Don't hardcode magic numbers - use named constants"]
4. [Anti-pattern 4 - e.g., "Don't skip edge case handling (NaN, Infinity, negative values)"]
5. [Anti-pattern 5 - e.g., "Don't forget backward compatibility when refactoring"]

Real PR Examples:
- [PR #X: Issue - Fix applied - Lesson learned]
- [PR #Y: Review feedback - Code changes - Pattern established]

Test Coverage Requirements:
- Utilities: [X%] coverage minimum
- Components: [Y%] coverage
- Critical paths: [Z%] coverage

Before Submitting PR Checklist:
[ ] All numeric validation uses Number.isFinite()
[ ] All pending features documented in JSDoc
[ ] All utilities have comprehensive tests
[ ] All edge cases handled (NaN, null, undefined)
[ ] All constants named with units/context
[ ] No duplicate data (single source of truth)

See Related Memories: [project]-modular-design-patterns
  `
})
```

#### Memory 5: Developer FAQ Index
```typescript
mcp__serena__write_memory({
  memory_file_name: "[project]-developer-faq",
  content: `
DEVELOPER FAQ - INSTANT ANSWERS

Q1: How do I add [new feature type]?
A: [Step-by-step checklist with file paths]

Q2: Where is [common functionality] handled?
A: [File path, symbol name, line number]

Q3: How do [key system components] work?
A: [Architecture explanation with code examples]

Q4: What's the [design pattern/convention]?
A: [Pattern explanation with real examples from codebase]

Q5: Which database stores what?
A: [Database architecture table]

Q6: How do I [common task]?
A: [Implementation guide]

Q7: What are [active feature types]?
A: [List with examples]

Q8: How do I avoid [common mistake]?
A: [Prevention pattern with explanation]

Q9: [Project-specific question 1]
A: [Answer with file references]

Q10: [Project-specific question 2]
A: [Answer with code examples]

[Add 10 more questions relevant to your project]

Quick Memory Lookup Table:
- Architecture patterns → [memory-name]
- Routing/navigation → [memory-name]
- Code review patterns → [memory-name]
- Modular design → [memory-name]
- Test requirements → [memory-name]

See All Related Memories for Cross-References
  `
})
```

### Step 3.3: Index Symbol Hierarchies

For each critical file type, run:

```typescript
// Get symbol overview (doesn't read full file)
mcp__serena__get_symbols_overview({
  relative_path: "src/[critical-file].ts",
  depth: 1  // Top-level symbols only
})

// Store results in memory with:
// - Symbol names
// - Export patterns
// - Type hierarchies
// - Common usage patterns
```

**Target files:**
- Main type definition files
- Core utility files
- Component base classes
- API client modules

### Step 3.4: Map Symbol References

For critical functions, map dependencies:

```typescript
mcp__serena__find_referencing_symbols({
  name_path: "[function-name]",
  relative_path: "src/utils/[file].ts"
})

// Document in memory:
// - Which files use this function
// - Common usage patterns
// - Integration points
```

### Step 3.5: Disable Dashboard Popup Spam (Optional)

If using Serena MCP:
```bash
# Edit ~/.serena/serena_config.yml
# Line 35: Change to false
web_dashboard_open_on_launch: false
```

Restart IDE after changing.

---

## PHASE 4: AGENTDB ADVANCED FEATURES

### Step 4.1: Verify AgentDB Setup

```bash
# Check if agentdb.db exists at root
ls -lh agentdb.db

# If not, initialize
npx agentdb@latest init
```

**Expected:** Database at project root (NOT in subdirectories)

### Step 4.2: Configure Advanced Features

**Multi-Database Management (if needed):**
```javascript
// For large projects (>100 files), consider specialized databases
// Example:
// - [project]-codebase.db → File structure, symbols
// - [project]-decisions.db → Architectural decisions
// - [project]-data.db → Domain-specific data patterns
```

**HNSW Indexing (for fast search):**
```javascript
// AgentDB uses HNSW automatically for 150x faster queries
// No manual configuration needed - enabled by default
```

**Quantization (for memory efficiency):**
```javascript
// Reduces memory usage by 4-32x
// Enable in AgentDB config if dealing with large datasets
```

### Step 4.3: Store Skill-Based Patterns

```bash
# Use AgentDB to store project-specific skills
npx agentdb@latest skill create "[skill-name]" --description "[what it does]"
```

---

## PHASE 5: DEPLOY QUEEN-LED MEMORY SWARM

### Step 5.1: Spawn Hierarchical Hive Mind

Use Claude Code's Task tool (NOT MCP directly):

```typescript
Task("Queen Coordinator", `
Deploy a 12-agent hierarchical memory swarm to index this codebase.

**Your Mission:**
1. Analyze codebase structure (directories, file types, patterns)
2. Extract architectural patterns (component structure, data flow, routing)
3. Identify code review patterns (from git log analysis)
4. Create FAQ index (common dev questions from README, docs)
5. Store everything in Serena memories + ReasoningBank

**Deliverables:**
- 5 comprehensive Serena memory entries (architecture, routing, patterns, reviews, FAQ)
- 6 ReasoningBank pattern entries (with semantic embeddings)
- Symbol index (50+ symbols for instant lookup)
- Token reduction estimate (target: 40-60%)

**Safety Protocols:**
- Read-only operations on production code
- All memory writes to approved directories only
- Validate patterns before storage
- No file modifications without approval
`, "queen-coordinator")
```

### Step 5.2: Specify Memory Entries to Create

**Template for each memory:**

```typescript
mcp__serena__write_memory({
  memory_file_name: "[project]-[category]-patterns",
  content: `
[CATEGORY] PATTERNS FOR [PROJECT]

Overview:
[High-level summary of this pattern category]

Key Patterns:
1. [Pattern name]: [Description with examples]
2. [Pattern name]: [Description with examples]
3. [Pattern name]: [Description with examples]

File Locations:
- [Pattern 1 files]: [paths]
- [Pattern 2 files]: [paths]

Code Examples:
\`\`\`[language]
[Real code from your project]
\`\`\`

Common Questions:
Q: [Question]
A: [Answer with file references]

Gotchas:
- [Gotcha 1]: [How to avoid]
- [Gotcha 2]: [How to avoid]

See Related Memories: [other-memory-1], [other-memory-2]
  `
})
```

**Recommended categories:**
1. Component/Module Architecture
2. Routing & Navigation
3. Modular Design & Code Organization
4. Code Review Verdicts
5. Developer FAQ

---

## PHASE 6: VERIFICATION & DOCUMENTATION

### Step 6.1: Test Memory Retrieval

**Serena:**
```typescript
mcp__serena__read_memory({ memory_file_name: "[project]-developer-faq" })
// Should return full content instantly
```

**ReasoningBank:**
```bash
claude-flow memory query "[test query]" --namespace [project]-successes --reasoningbank
# Should return 60-95% match scores
```

### Step 6.2: Calculate Token Savings

**Before/After Analysis:**

| Operation | Before (Manual Search) | After (Memory Query) | Savings |
|-----------|------------------------|----------------------|---------|
| Common question 1 | [X tokens] | [Y tokens] | [%] |
| Common question 2 | [X tokens] | [Y tokens] | [%] |
| Common question 3 | [X tokens] | [Y tokens] | [%] |

**Target: 40-60% average reduction**

### Step 6.3: Document Final Architecture

Add to project's main documentation file (README.md or equivalent):

```markdown
## 🗄️ Memory Architecture

[PROJECT] uses a specialized multi-database strategy for optimal token efficiency:

### Database Locations & Purposes

| Database | Location | Purpose | Size | Commands |
|----------|----------|---------|------|----------|
| **ReasoningBank** | `.swarm/memory.db` | Semantic pattern search | ~[X] MB | `claude-flow memory` |
| **AgentDB** | `agentdb.db` (root) | Skill storage | ~[Y] MB | `npx agentdb` |
| **Serena** | Managed by MCP | Codebase symbol indexing | N/A | `mcp__serena__` tools |
| **Hive Mind** | `.hive-mind/` | Swarm coordination | ~[Z] KB | Auto-managed |

### Memory-First Development Workflow

**BEFORE implementing features:**
\`\`\`bash
# Query ReasoningBank for patterns
claude-flow memory query "[feature type]" --namespace [project]-successes --reasoningbank

# Read Serena memory for architecture
mcp__serena__read_memory({ memory_file_name: "[project]-component-architecture" })
\`\`\`

**AFTER completing features:**
\`\`\`bash
# Store new patterns
claude-flow memory store "[feature]-complete" "Learnings..." --namespace [project]-successes --reasoningbank
\`\`\`

### Token Efficiency Gains

- Routing questions: **~95% reduction**
- Architecture lookups: **~80% reduction**
- Pattern recall: **~60% reduction**
- **Overall: 40-60% token savings**
```

---

## PHASE 7: MAINTENANCE & BEST PRACTICES

### Ongoing Maintenance Schedule

**After Each Major Feature:**
- [ ] Store completion pattern in ReasoningBank (~5 min)
- [ ] Update relevant Serena memory if architecture changed (~5 min)
- [ ] Add new FAQ entries if common questions arose (~5 min)

**Monthly Review:**
- [ ] Query all memories, check relevance (~15 min)
- [ ] Remove outdated patterns (~5 min)
- [ ] Consolidate similar patterns (~10 min)
- [ ] Backup all databases to version control (~2 min)

**Quarterly Deep Clean:**
- [ ] Analyze token usage metrics (before/after memory system)
- [ ] Optimize memory entry sizes (target: 500-1000 bytes each)
- [ ] Re-index if codebase structure changed significantly
- [ ] Update HNSW indices for performance

### Database Backup Strategy

```bash
# Automated backup script
#!/bin/bash
DATE=$(date +%Y-%m-%d)
mkdir -p docs/memory-backups/$DATE

# Backup all databases
cp agentdb.db docs/memory-backups/$DATE/
cp .swarm/memory.db docs/memory-backups/$DATE/
cp -r .hive-mind docs/memory-backups/$DATE/

# Commit to git (databases are usually .gitignored, so store exports)
claude-flow memory export --namespace [project]-successes --output docs/memory-backups/$DATE/reasoningbank-export.json
```

**Run weekly or before major changes.**

---

## SUCCESS CRITERIA

Your memory optimization is successful when:

✅ **Token Reduction:** 40-60% reduction in common operations (measured)
✅ **Query Speed:** <2 seconds for semantic search (vs. 30s+ file grepping)
✅ **Memory Coverage:** 5+ Serena memories, 6+ ReasoningBank patterns
✅ **Zero Data Loss:** All databases backed up, no orphaned duplicates
✅ **Documentation:** Memory architecture documented in main docs
✅ **Developer Experience:** No dashboard popups, instant answers to common questions

---

## EXPECTED RESULTS

**From WVWO Implementation:**
- 45+ Serena memories (50,755 chars indexed)
- 10+ ReasoningBank patterns (69.6% match accuracy)
- 75% avg token reduction for codebase queries
- <2s query response time
- Zero code corruption
- 752 KB orphaned data cleaned up

**Your results will vary based on:**
- Codebase size
- Pattern complexity
- Number of memories created
- Quality of memory entries

---

## TROUBLESHOOTING

**Low semantic match scores (<50%):**
→ Use global `claude-flow` not `npx claude-flow@alpha`

**Dashboard still popping up:**
→ Restart IDE after config change
→ Check correct config file edited (might have user vs global config)

**Serena not activating:**
→ Run `mcp__serena__activate_project` manually
→ Check project registered in Serena config

**Memory queries slow (>5s):**
→ Reduce memory entry sizes (target: 500-1000 bytes)
→ Check HNSW indexing enabled
→ Consider quantization for large datasets

**Database fragmentation:**
→ Follow Phase 1 cleanup procedure
→ Keep specialized databases separate (don't merge)

---

## FINAL CHECKLIST

Before considering memory optimization complete:

- [ ] Phase 1: Database audit complete, orphans deleted
- [ ] Phase 2: ReasoningBank installed globally, 6+ patterns stored
- [ ] Phase 3: Serena activated, 5+ memories created, symbols indexed
- [ ] Phase 4: AgentDB configured, root location verified
- [ ] Phase 5: Queen-led swarm executed, deliverables received
- [ ] Phase 6: Memory retrieval verified, token savings calculated
- [ ] Phase 7: Documentation updated, backup strategy implemented
- [ ] Success criteria met (40-60% token reduction)
- [ ] Zero code corruption (git diff clean or intentional changes only)

---

## ADAPTATION NOTES

**This prompt was proven on:**
- Project: WVWO Storefront (Astro + TypeScript + React)
- Codebase: ~15,000 lines, 10 destination types
- Result: 75% token reduction, 45+ memories, 69.6% semantic accuracy

**Adapt for your project by:**
1. Replace [PROJECT_NAME] with your project name
2. Replace [YOUR_STACK] with your tech stack
3. Customize memory categories for your domain
4. Adjust file size limits to your conventions
5. Modify FAQ questions to your common dev questions

**Timeline:**
- Phase 1-2: ~30 minutes (database audit + ReasoningBank)
- Phase 3-5: ~60 minutes (Serena indexing + swarm deployment)
- Phase 6-7: ~30 minutes (verification + documentation)
- **Total: ~2 hours for complete memory optimization**

---

**END OF PROMPT - Copy everything above this line to Claude Opus 4.5**
```

---

## How to Use This Template

1. **Copy** entire prompt above
2. **Replace** all `[placeholders]` with your project specifics
3. **Paste** to Claude Opus 4.5 in a new conversation
4. **Provide** project context (tech stack, directory structure, main pain points)
5. **Let the queen-led swarm** execute all 7 phases
6. **Verify** token savings after completion

**Expected outcome:** 40-60% token reduction in ~2 hours of setup work.
