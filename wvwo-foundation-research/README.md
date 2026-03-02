# WVWO Foundation Specs - Deep Research Archive

## Purpose
This archive contains the files needed to validate **SPEC-05 (Disable E-commerce)** and **SPEC-06 (Content Collections Schema)** as the foundation for the 60+ SPEC roadmap.

## Directory Structure

```
wvwo-foundation-research/
├── README.md                     ← YOU ARE HERE
├── CLAUDE.md                     ← Project context & constraints
│
├── foundation/                   ← THE SPECS BEING VALIDATED
│   ├── PIVOT_RATIONALE.md        ← Why we're pivoting
│   ├── SPEC-05/PROMPT.md         ← Disable e-commerce spec
│   └── SPEC-06/PROMPT.md         ← Content collections schema spec
│
├── implementation/               ← WHAT SPEC-06 PRODUCED
│   └── content.config.ts         ← The actual schema implementation
│
├── templates/                    ← SPECS THAT DEPEND ON THE SCHEMA
│   ├── SPEC-12-wma/PROMPT.md
│   ├── SPEC-13-lake/PROMPT.md
│   ├── SPEC-14-river/PROMPT.md
│   ├── SPEC-15-ski/PROMPT.md
│   ├── SPEC-16-cave/PROMPT.md
│   ├── SPEC-17-backcountry/PROMPT.md
│   ├── SPEC-18-state-park/PROMPT.md
│   ├── SPEC-19-historic/PROMPT.md
│   └── SPEC-20-resort/PROMPT.md
│
├── migrations/                   ← SPECS THAT MIGRATE EXISTING PAGES
│   ├── SPEC-21-migrate-burnsville-lake/PROMPT.md
│   └── SPEC-27-migrate-burnsville-lake-recreation/PROMPT.md
│
└── existing-pages/               ← CURRENT PAGES TO BE MIGRATED
    ├── burnsville-lake.astro
    ├── elk-river.astro
    └── sutton-lake.astro
```

## Research Questions This Archive Should Answer

1. **Schema Completeness**: Does `content.config.ts` have all fields needed by SPEC-12 through SPEC-20?
2. **Migration Compatibility**: Will existing `.astro` pages cleanly migrate to the new schema?
3. **E-commerce Pivot Validity**: Is disabling e-commerce the right call?
4. **Dual-Use Viability**: Is the schema truly retail-neutral for MMTU Entertainment?

## How to Use

1. Upload this entire .zip to Gemini 2.5 Pro or Claude Opus 4.5
2. Use the Deep Research prompt provided separately
3. The AI will cross-reference these files to validate the foundation

## File Reading Priority

**Start with these 3 files to understand the context:**
1. `CLAUDE.md` - Project overview and constraints
2. `foundation/PIVOT_RATIONALE.md` - Why we're doing this
3. `implementation/content.config.ts` - What SPEC-06 produced

**Then validate against templates (SPEC-12 to SPEC-20):**
- Each template PROMPT.md lists required fields
- Cross-check if those fields exist in content.config.ts

**Finally check migration compatibility (SPEC-21, SPEC-27):**
- These specs show what data exists in current pages
- Verify that data has a home in the new schema

## Key Schema Collections (from content.config.ts)

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| `adventures` | Hunting guides, trail maps | title, description, season, difficulty, location, gear |
| `stories` | Customer stories, hunt reports | title, excerpt, author, date, category |
| `resources` | WMA maps, regulations | title, type, pdf_url, related_adventures |
| `locations` | Trailheads, WMAs, lakes | name, type, coordinates, directions, i79_proximity |

## What's NOT Included (Intentionally)

- `node_modules/` - Package dependencies (not needed)
- `dist/` - Build output (not needed)
- `.astro/` - Astro cache (not needed)
- Example content `.md` files - Already validated in SPEC-06

## Contact

Project Owner: Matt (Developer) & Kim (Store Owner)
Repository: mmtuentertainment/wvwo-storefront
