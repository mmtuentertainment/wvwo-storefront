# Component Contracts: Lake Template Integration

**Purpose**: Define explicit interfaces between LakeTemplate.astro and all integrated components.

**Contract Philosophy**: Each contract document specifies:

1. **Component Interface**: Props required by the component
2. **Data Transformation**: How lake data maps to component props
3. **Invocation Pattern**: Exact Astro code to integrate component
4. **Validation Rules**: Requirements and constraints

---

## Contract Index

### Existing SPEC-11 Component Contracts

1. **[quick-stats-contract.md](./quick-stats-contract.md)** - AdventureQuickStats
   - Transforms lake stats (acreage, depth, county) → StatItem[]
   - 4-column stats bar above fold

2. **[what-to-fish-contract.md](./what-to-fish-contract.md)** - AdventureWhatToFish
   - Transforms fishSpecies → FeatureItem[]
   - 2-column fish species grid with Kim's tips

3. **[camping-list-contract.md](./camping-list-contract.md)** - AdventureCampingList
   - Direct pass-through of campgrounds array
   - 2-column campground facility cards

4. **[feature-section-contract.md](./feature-section-contract.md)** - AdventureFeatureSection
   - Transforms activities → FeatureItem[]
   - 3-column activities grid (reusable base component)

### Custom Section Contracts

1. **[custom-sections-contract.md](./custom-sections-contract.md)** - Custom HTML Sections
   - Hero Section (name, heroImage, stats, highlights)
   - Where to Fish (fishingSpots array iteration)
   - Marina (marina object rendering)
   - Seasonal Guide (seasonalGuide array by season)
   - Safety & Regulations (regulations array by category)

---

## Contract Usage

### For Developers Implementing Lake Template

**Read contracts in this order**:

1. Start with `custom-sections-contract.md` (understand custom HTML structure)
2. Review `quick-stats-contract.md` (first SPEC-11 component integration)
3. Read `what-to-fish-contract.md` (primary content component)
4. Check remaining contracts as you implement each section

### For Maintainers

**When to update contracts**:

- SPEC-11 component API changes (update transformation functions)
- New lake-specific features added (add new contract or section)
- Validation rules change (update validation section)

---

## Contract Compliance

**All implementations MUST**:

- ✅ Follow exact transformation patterns specified
- ✅ Pass props with correct types
- ✅ Handle optional fields gracefully
- ✅ Validate data against schemas

**Testing**:

- Contract compliance verified in Phase 4 (Integration Tests)
- Each contract has corresponding test coverage
- CI pipeline enforces contract adherence

---

## Quick Reference

### Component Integration Summary

| Component | Contract | Props From | Transformation |
|-----------|----------|------------|----------------|
| AdventureQuickStats | quick-stats-contract.md | acreage, maxDepth, county | transformQuickStats() |
| AdventureWhatToFish | what-to-fish-contract.md | fishSpecies | transformFishSpecies() |
| AdventureCampingList | camping-list-contract.md | campgrounds | Pass-through |
| AdventureFeatureSection | feature-section-contract.md | activities | transformActivities() |
| Hero (custom) | custom-sections-contract.md | name, heroImage, stats, highlights | Direct usage |
| Where to Fish (custom) | custom-sections-contract.md | fishingSpots | Array iteration |
| Marina (custom) | custom-sections-contract.md | marina | Object rendering |

---

**Next Steps**: Read individual contract files for detailed specifications.
