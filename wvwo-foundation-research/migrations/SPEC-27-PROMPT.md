# SPEC-27: Burnsville Lake Recreation Content Merge

**Status**: Ready for implementation
**Assigned Agents**: `code-explorer + coder` (2-agent orchestration)
**Dependencies**: SPEC-21 (Burnsville Lake WMA migration)

**Prerequisite**: SPEC-21 must complete successfully and create `wv-wild-web/src/content/adventures/burnsville-lake-wma.md` before SPEC-27 starts.

---

## AgentDB Context Loading

Before starting, load relevant patterns:

```bash
# Parallel context loading
npx agentdb@latest reflexion retrieve "content migration" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "content merge" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO" --k 15 --only-successes --min-reward 0.8

```

---

## Task Overview

**SPECIAL CASE**: Merge `wv-wild-web/src/pages/near/burnsville-lake-recreation.astro` INTO existing `wv-wild-web/src/content/adventures/burnsville-lake-wma.md` (created in SPEC-21).

**Why merge**: Burnsville Lake WMA and recreation area are the same location, just different activity focuses (hunting vs general recreation). Consolidate into single comprehensive entry.

**Pattern**: Simple (code-explorer + coder)

---

## Agent Instructions

### 1. Code Explorer Agent

**Read BOTH files completely**:

```bash
Read wv-wild-web/src/pages/near/burnsville-lake-recreation.astro
Read wv-wild-web/src/content/adventures/burnsville-lake-wma.md

```

**Extract from recreation.astro**:

- Additional `activities[]` not in WMA version (boating, swimming, camping)
- Additional `amenities[]` (boat ramps, beaches, campgrounds)
- Recreation-specific safety notes
- Any unique content not covered in WMA version

**Report findings** to coder agent via coordination hooks:

```bash
npx claude-flow@alpha hooks post-edit --file "burnsville-lake-recreation.astro" --memory-key "swarm/explorer/burnsville-recreation-data"

```

---

### 2. Coder Agent

**Merge INTO existing burnsville-lake-wma.md**:

**Frontmatter updates**:

- Merge `activities[]`:
  - Sort order: Hunting Season > Spring/Fall Rec > Summer Water
  - Dedupe: Exact match first, then fuzzy match > 85% similarity
- Merge `amenities[]`:
  - Group by type (e.g., "boat-ramps", "beaches", "campgrounds")
  - Dedupe per type
- Safety Notes Strategy:
  - Keep hunting-specific and recreation-specific sections separate
  - Concatenate with source attribution
  - Remove exact duplicates
- Update description to reflect BOTH hunting and recreation
- Keep Kim's voice throughout
  - Example: "Don't trust a laser bore sight alone. We mount it level, torque it right." — reflects practical expertise, no corporate jargon.
- Organize by season where relevant (hunting season vs summer recreation)

**Body content merge**:

- Expand "Activities" section to include recreation options
- Add "Recreation Facilities" subsection for boat ramps, beaches, campgrounds
- Keep Kim's voice throughout
- Organize by season where relevant (hunting season vs summer recreation)

**Output**: Update existing file at:

```plaintext
wv-wild-web/src/content/adventures/burnsville-lake-wma.md

```

**Coordinate via hooks**:

```bash
npx claude-flow@alpha hooks post-task --task-id "spec-27-merge"

```

---

## Validation Checklist

Before marking complete:

- [ ] Both source files read completely
- [ ] All unique recreation data extracted
- [ ] Arrays merged and deduplicated
- [ ] Frontmatter still validates against schema (SPEC-01)
- [ ] Body content flows naturally (hunting + recreation)
- [ ] Kim's voice maintained throughout
- [ ] NO duplicate information
- [ ] File updated at correct path
- [ ] Coordination hooks executed

---

## Success Criteria

1. Single comprehensive `.md` file at `wv-wild-web/src/content/adventures/burnsville-lake-wma.md`
2. Covers BOTH hunting/WMA and general recreation
3. Frontmatter passes schema validation
4. Body content flows naturally (not frankensteined)
5. All data from BOTH sources preserved
6. Pattern logged to AgentDB for future merge operations

---

## Store Pattern (After Completion)

```bash
# If successful
npx agentdb@latest reflexion store "wvwo-migration" "spec-27-burnsville-merge" 1.0 true "Content merge pattern: explorer extracts unique data from 2nd source, coder integrates into existing .md while maintaining voice and flow"

# If failed
npx agentdb@latest reflexion store "wvwo-migration" "spec-27-burnsville-merge" 0.0 false "<what_went_wrong>"

```
