# SPEC-21: Burnsville Lake WMA Content Migration

**Status**: Ready for implementation
**Assigned Agent**: `coder` (simple 2-agent pattern)
**Dependencies**: SPEC-01 (content collections schema)

---

## AgentDB Context Loading

Before starting, load relevant patterns:

```bash
# Parallel context loading
npx agentdb@latest reflexion retrieve "content migration" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "frontmatter transformation" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO" --k 15 --only-successes --min-reward 0.8
```

---

## Task Overview

Migrate `/wv-wild-web/src/pages/near/burnsville-lake.astro` to content collection format at `/wv-wild-web/src/content/adventures/burnsville-lake-wma.md`.

**Pattern**: Simple (code-explorer + coder)

---

## Agent Instructions

### 1. Code Explorer Agent

**Read source file completely**:
```bash
Read c:\Users\matth\Desktop\wvwo-storefront\wv-wild-web\src\pages\near\burnsville-lake.astro
```

**Extract placeSchema data**:
- `name`, `type`, `coordinates`, `address`, `description`
- `amenities[]`, `activities[]`, `seasons[]`
- `safety`, `regulations`, `website`, `phoneNumber`

**Report findings** to coder agent via coordination hooks:
```bash
npx claude-flow@alpha hooks post-edit --file "burnsville-lake.astro" --memory-key "swarm/explorer/burnsville-schema"
```

---

### 2. Coder Agent

**Transform to .md file**:

**Frontmatter (YAML)**:
- All placeSchema fields from explorer's report
- Schema-compliant structure (see SPEC-01)
- Add `slug: "burnsville-lake-wma"`
- Add `featured: false` (default)

**Body content (Markdown)**:
- Kim's voice: authentic, faith-forward, humble
- Structure:
  1. Opening hook (what makes this special)
  2. Key features/activities (bullets)
  3. Kim's personal take (handwritten energy)
  4. Practical details (hours, fees, regulations)
- NO marketing speak ("unlock", "experience", "next-level")
- YES rural WV authentic ("holler", "Grand love ya")

**Output path**:
```
c:\Users\matth\Desktop\wvwo-storefront\wv-wild-web\src\content\adventures\burnsville-lake-wma.md
```

**Coordinate via hooks**:
```bash
npx claude-flow@alpha hooks post-task --task-id "spec-21-migration"
```

---

## Validation Checklist

Before marking complete:

- [ ] Source file read completely (no truncation)
- [ ] All placeSchema fields extracted
- [ ] Frontmatter validates against schema (SPEC-01)
- [ ] Body content uses Kim's voice
- [ ] NO SaaS marketing language
- [ ] File saved to correct path
- [ ] Coordination hooks executed

---

## Success Criteria

1. Valid `.md` file at `/content/adventures/burnsville-lake-wma.md`
2. Frontmatter passes schema validation
3. Body content maintains WVWO voice
4. All data from source preserved
5. Pattern logged to AgentDB for future migrations

---

## Store Pattern (After Completion)

```bash
# If successful
npx agentdb@latest reflexion store "wvwo-migration" "spec-21-burnsville-lake" 1.0 true "2-agent pattern: explorer extracts schema, coder transforms to .md with Kim's voice"

# If failed
npx agentdb@latest reflexion store "wvwo-migration" "spec-21-burnsville-lake" 0.0 false "<what_went_wrong>"
```
