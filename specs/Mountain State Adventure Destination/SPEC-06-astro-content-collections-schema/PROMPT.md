# SPEC-06: Astro Content Collections Schema - FOUNDATION PATTERN

## ARCHITECTURAL CONTEXT
See [PIVOT_RATIONALE.md](../PIVOT_RATIONALE.md) for details on the strategic shift to Content Collections and the disabling of e-commerce.


**CONTEXT**: WVWO Phase 4 (Mountain State Adventure Destination) requires structured content for hunting guides, trail maps, seasonal calendars, and adventure stories. Astro 5.x Content Collections provide type-safe frontmatter schemas with Zod validation.

**GOAL**: Design and implement content collection schemas for adventure content, hunter resources, and seasonal guides with strict TypeScript types and validation.

---

## 🧠 LOAD WVWO INTELLIGENCE (Execute FIRST)


```bash
# Execute ALL in PARALLEL (Opus 4.5 strength)
npx agentdb@latest reflexion retrieve "WVWO" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "Astro content collections schema" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "frontmatter validation Zod" --k 10 --synthesize-context
npx agentdb@latest reflexion critique-summary "WVWO"
npx agentdb@latest reflexion retrieve "WVWO" --k 10 --only-failures
npx agentdb@latest db stats

```

**Acknowledge context load**: "Loaded WVWO context: [X] episodes, [Y] Astro patterns, [Z] schema design approaches."

---

## 🎯 HIERARCHICAL SWARM STRUCTURE

### QUEEN AGENT: Content Architect
**Role**: Orchestrate schema design, ensure type safety, coordinate scouts and specialists.

**Responsibilities**:
- Parse SPEC-06 requirements for content types
- Coordinate scout research and specialist analysis
- Design unified schema architecture
- Validate against Astro 5.x best practices
- Ensure WVWO voice/aesthetic compatibility

**MCP Coordination**:

```javascript
mcp__claude-flow__swarm_init {
  topology: "hierarchical",
  maxAgents: 8,
  coordinator: "content-architect"
}

mcp__claude-flow__memory_usage {
  action: "store",
  key: "swarm/queen/status",
  namespace: "coordination",
  value: JSON.stringify({
    agent: "content-architect",
    phase: "initialization",
    timestamp: Date.now()
  })
}

```

---

## 🔍 SCOUT AGENTS (Research Phase)

### Scout 1: Astro 5 Documentation Researcher
**Task**: Research Astro 5.x Content Collections API, Zod integration, and TypeScript generation.

**Instructions**:

```
1. Use WebSearch + WebFetch to retrieve:
   - Astro 5.x Content Collections docs (https://docs.astro.build/en/guides/content-collections/)
   - Zod schema syntax and validation patterns
   - TypeScript type inference from Zod schemas
   - Collection references and relationships

2. Extract code examples for:
   - src/content/config.ts setup
   - defineCollection() syntax
   - schema definition with z.object()
   - getCollection() usage in pages
   - Type inference patterns

3. Store findings in memory:
   npx claude-flow@alpha hooks post-task --task-id "astro-5-research"

   mcp__claude-flow__memory_usage {
     action: "store",
     key: "swarm/scout1/astro-api",
     namespace: "coordination",
     value: JSON.stringify({
       api_patterns: [...],
       examples: [...],
       gotchas: [...]
     })
   }

4. Report to queen: "Astro 5 API patterns loaded. Key findings: [summary]."

```

### Scout 2: Existing Frontmatter Analyzer
**Task**: Analyze existing WVWO markdown files for frontmatter patterns to preserve.

**Instructions**:

```
1. Search codebase for markdown files with frontmatter:
   npx agentdb@latest skill search "markdown frontmatter yaml" 10
   Glob "**/*.md"

2. Read representative files:
   - Blog posts (if any)
   - Static pages (About, Contact, etc.)
   - Existing content with metadata

3. Extract patterns:
   - Common fields (title, description, date, author)
   - WVWO-specific fields (season, location, difficulty, etc.)
   - Image/media handling
   - SEO metadata

4. Store findings:
   mcp__claude-flow__memory_usage {
     action: "store",
     key: "swarm/scout2/frontmatter-patterns",
     namespace: "coordination",
     value: JSON.stringify({
       existing_fields: [...],
       wvwo_custom: [...],
       image_patterns: [...]
     })
   }

5. Report to queen: "Existing frontmatter analyzed. Found [X] patterns to preserve."

```

---

## 🏗️ SPECIALIST AGENTS (Design Phase)

### Specialist 1: Code Architect
**Role**: Design content collection schemas based on scout findings.

**Instructions**:

```
1. Retrieve scout research from memory:
   mcp__claude-flow__memory_usage {
     action: "retrieve",
     key: "swarm/scout1/astro-api",
     namespace: "coordination"
   }

   mcp__claude-flow__memory_usage {
     action: "retrieve",
     key: "swarm/scout2/frontmatter-patterns",
     namespace: "coordination"
   }

2. Design schemas for content types:
   - adventures (hunting guides, trail maps, seasonal calendars)
   - stories (customer stories, hunt reports, community highlights)
   - resources (WMA maps, season dates, regulatory info)
   - locations (trailheads, WMAs, local spots)

3. Create src/content/config.ts with:
   - Strict Zod validation for all fields
   - Required vs optional field logic
   - Enum types for seasons, difficulty, categories
   - Image schema (src, alt, caption)
   - Reference schemas (author, location, related content)

4. Apply WVWO constraints:
   - Voice fields (description, excerpt) for Kim's tone
   - Geographic fields (coordinates, I-79 proximity)
   - Seasonal fields (hunting seasons, weather considerations)
   - Safety fields (difficulty, required gear)

5. Store schema design:
   mcp__claude-flow__memory_usage {
     action: "store",
     key: "swarm/architect/schema-design",
     namespace: "coordination",
     value: JSON.stringify({
       collections: [...],
       validation_rules: [...],
       wvwo_fields: [...]
     })
   }

6. Report to queen: "Schema design complete. [X] collections with [Y] validation rules."

```

### Specialist 2: Type Design Analyzer
**Role**: Validate TypeScript type generation and ensure type safety.

**Instructions**:

```
1. Retrieve architect's schema design:
   mcp__claude-flow__memory_usage {
     action: "retrieve",
     key: "swarm/architect/schema-design",
     namespace: "coordination"
   }

2. Analyze type inference:
   - Verify Zod → TypeScript type generation
   - Check for type-safe getCollection() usage
   - Validate reference types (relations between collections)
   - Ensure discriminated unions for content variants

3. Test type safety scenarios:
   - Required fields enforced at build time
   - Optional fields handled correctly
   - Enum types prevent typos (seasons, categories)
   - Image types enforce alt text

4. Identify type safety gaps:
   - Missing required fields
   - Overly permissive schemas
   - Unclear union types

5. Store validation report:
   mcp__claude-flow__memory_usage {
     action: "store",
     key: "swarm/analyzer/type-validation",
     namespace: "coordination",
     value: JSON.stringify({
       type_safety_score: 0.95,
       gaps: [...],
       recommendations: [...]
     })
   }

6. Report to queen: "Type analysis complete. Safety score: [X]. Issues: [Y]."

```

---

## 📋 IMPLEMENTATION WORKFLOW

### Phase 1: Research (Scouts Execute)

```
[Single Message - Parallel Scout Execution]:
  Task("Astro 5 researcher", "Research Content Collections API. Store findings in memory.", "researcher")
  Task("Frontmatter analyzer", "Analyze existing WVWO markdown. Store patterns.", "code-analyzer")

  TodoWrite { todos: [
    {content: "Research Astro 5 Content Collections API", status: "in_progress", activeForm: "Researching Astro 5 API"},
    {content: "Analyze existing frontmatter patterns", status: "in_progress", activeForm: "Analyzing frontmatter"},
    {content: "Design content collection schemas", status: "pending", activeForm: "Designing schemas"},
    {content: "Implement src/content/config.ts", status: "pending", activeForm: "Implementing config"},
    {content: "Validate TypeScript type generation", status: "pending", activeForm: "Validating types"},
    {content: "Create example content entries", status: "pending", activeForm: "Creating examples"},
    {content: "Test schema validation with Astro build", status: "pending", activeForm: "Testing validation"},
    {content: "Document schema usage for Matt", status: "pending", activeForm: "Documenting schemas"}
  ]}

```

### Phase 2: Design (Specialists Execute)

```
[Single Message - Parallel Specialist Execution]:
  Task("Schema architect", "Design Zod schemas for all collections. Coordinate with scouts.", "system-architect")
  Task("Type validator", "Analyze type safety and validate inference. Report gaps.", "code-analyzer")

  TodoWrite { todos: [...update Phase 1 todos to completed, mark Phase 2 in_progress...] }

```

### Phase 3: Implementation (Coder + Tester)

```
[Single Message - Parallel Implementation]:
  Task("Schema coder", "Implement src/content/config.ts with Zod schemas. Follow architect design.", "coder")
  Task("Content example creator", "Create example .md files for each collection type.", "coder")
  Task("Schema tester", "Test validation with Astro build. Verify type inference.", "tester")

  TodoWrite { todos: [...update to show implementation progress...] }

```

### Phase 4: Validation (Reviewer)

```
[Single Message - Review and Documentation]:
  Task("Schema reviewer", "Review for WVWO voice/aesthetic compliance. Check type safety.", "reviewer")
  Task("Documentation writer", "Document schema usage, field meanings, and examples for Matt.", "coder")

  TodoWrite { todos: [...mark all completed or document issues...] }

```

---

## 🔧 TECHNICAL REQUIREMENTS

### Content Collection Types (Minimum)

1. **adventures** - Hunting guides, trail maps, seasonal calendars
   - Fields: title, description, season, difficulty, location, coordinates, gear, images, body
   - Validation: season enum, difficulty 1-5, required images with alt text

2. **stories** - Customer stories, hunt reports, community highlights
   - Fields: title, excerpt, author, date, featured_image, category, body
   - Validation: date format, author reference, category enum

3. **resources** - WMA maps, season dates, regulatory info
   - Fields: title, type, updated_date, pdf_url, description, related_adventures
   - Validation: type enum, valid URLs, date freshness

4. **locations** - Trailheads, WMAs, local spots
   - Fields: name, type, coordinates, directions, i79_proximity, amenities, images
   - Validation: lat/long format, I-79 exit references

### Zod Schema Patterns (Use These)


```typescript
// Enum example
const SeasonEnum = z.enum(['spring', 'summer', 'fall', 'winter']);

// Required vs optional
const schema = z.object({
  title: z.string(),                    // Required
  description: z.string().optional(),   // Optional
});

// Image schema
const ImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

// Reference schema
const AuthorSchema = z.reference('authors');  // Collection reference

```

### File Organization


```
src/
├── content/
│   ├── config.ts                 # Schema definitions
│   ├── adventures/
│   │   ├── fall-deer-hunting.md
│   │   └── spring-turkey.md
│   ├── stories/
│   │   └── 2024-opening-day.md
│   ├── resources/
│   │   └── wma-map-nicholas.md
│   └── locations/
│       └── birch-river-wma.md

```

---

## ✅ WVWO COMPLIANCE CHECKLIST

Before finalizing schemas:

```
[ ] All text fields support Kim's authentic voice
[ ] Geographic fields (coordinates, I-79 proximity) included
[ ] Seasonal fields (hunting seasons, weather) included
[ ] Safety fields (difficulty, required gear) included
[ ] Image schemas enforce alt text (accessibility)
[ ] Enum types prevent typos (seasons, categories, difficulty)
[ ] TypeScript types are strict and auto-generated
[ ] Example content passes validation
[ ] Astro build succeeds with no schema errors
[ ] Documentation explains all fields for Matt

```

---

## 🧪 VALIDATION PROTOCOL

### Build-Time Validation

```bash
# Test schema validation
cd wv-wild-web
npm run build  # Should fail on invalid frontmatter

# Type check
npm run typecheck  # Verify TypeScript inference

```

### Example Content Testing
Create at least one example for EACH collection type:
- adventures/example-hunt.md
- stories/example-story.md
- resources/example-wma.md
- locations/example-trailhead.md

Verify each example:
1. Passes Zod validation (build succeeds)
2. TypeScript types are inferred correctly
3. Can be queried with getCollection()

---

## 📊 SUCCESS CRITERIA

**Research Phase**:
- [ ] Astro 5 Content Collections API documented
- [ ] Existing frontmatter patterns analyzed
- [ ] Scout findings stored in memory

**Design Phase**:
- [ ] Schemas designed for 4+ content types
- [ ] Zod validation rules defined
- [ ] TypeScript type safety validated
- [ ] WVWO-specific fields included

**Implementation Phase**:
- [ ] src/content/config.ts created
- [ ] Example content for each collection type
- [ ] Astro build passes validation
- [ ] Types inferred correctly in IDE

**Validation Phase**:
- [ ] WVWO compliance checklist passed
- [ ] Documentation written for Matt
- [ ] Schema patterns stored in AgentDB for future reference

---

## 🧠 AGENTDB COORDINATION HOOKS

### Pre-Task (All Agents)

```bash
npx claude-flow@alpha hooks pre-task --description "SPEC-06 [agent role]"
npx claude-flow@alpha hooks session-restore --session-id "spec-06-schema"

```

### Post-Edit (After File Changes)

```bash
npx claude-flow@alpha hooks post-edit --file "src/content/config.ts" --memory-key "swarm/coder/schema-config"

```

### Post-Task (After Phase Completion)

```bash
npx claude-flow@alpha hooks post-task --task-id "spec-06-[phase]"
npx claude-flow@alpha hooks notify --message "[Phase] complete: [summary]"

```

### Session End (Final)

```bash
npx claude-flow@alpha hooks session-end --export-metrics true

# Store schema patterns for future reference
npx agentdb@latest reflexion store "wvwo-session" "SPEC-06-schema-design" 1.0 true "Astro 5 Content Collections with Zod validation. 4 collection types: adventures, stories, resources, locations. Strict TypeScript inference. WVWO-specific fields for seasons, geography, safety."

```

---

## 🚀 EXECUTION COMMAND

**For Claude Opus 4.5**:

```
Load WVWO intelligence (parallel AgentDB retrieval).
Initialize hierarchical swarm with content-architect queen.
Execute scouts in parallel (Astro research + frontmatter analysis).
Execute specialists in parallel (schema design + type validation).
Implement src/content/config.ts with example content.
Test validation with Astro build.
Store patterns in AgentDB.
Report: "SPEC-06 complete. [X] collections, [Y] validation rules, [Z] examples created."

```

**Remember**:
- ALL operations in single messages (parallel execution)
- Coordinate via MCP memory tools
- Use Claude Code's Task tool for agent spawning
- WVWO aesthetic/voice in all content examples
- Store successful patterns in AgentDB for future specs

---

**Generated for**: SPEC-06 Astro Content Collections Schema
**Pattern**: Foundation (Hierarchical Swarm)
**Agents**: 1 queen (content-architect), 2 scouts (researcher, analyzer), 2 specialists (architect, type-validator), 3 workers (coder, tester, reviewer)
**Coordination**: MCP memory + AgentDB session tracking
