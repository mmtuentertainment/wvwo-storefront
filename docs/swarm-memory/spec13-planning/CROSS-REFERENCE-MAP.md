# SPEC-13 Planning - Cross-Reference Map

**Purpose**: Track dependencies, relationships, and data flows between all planning artifacts.

## Artifact Dependency Graph

### Phase 0: Research & Context
```
Queen Directive
    ↓
Technical Context Research
    ↓
├─→ Constitution Compliance Check
├─→ Architecture Pattern Analysis
└─→ Dependency Audit
```

### Phase 1: Data Model Design
```
Technical Context
    ↓
Data Model Specification
    ↓
├─→ Schema Definitions
├─→ Type Hierarchies
└─→ Validation Rules
```

### Phase 2: TypeScript Contracts
```
Data Model Spec
    ↓
Contract Generation
    ↓
├─→ Interface Definitions
├─→ Type Guards
├─→ Zod Schemas
└─→ API Contracts
```

### Phase 3: Project Structure
```
Contracts + Architecture
    ↓
File Organization Plan
    ↓
├─→ Directory Tree
├─→ Naming Conventions
├─→ Import Patterns
└─→ Module Boundaries
```

### Phase 4: Implementation Sequence
```
Project Structure + Contracts
    ↓
Implementation Plan
    ↓
├─→ Build Order
├─→ Dependency Chain
├─→ Test Strategy
└─→ Integration Steps
```

## Memory Key Relationships

| Source Key | Depends On | Consumers | Sync Priority |
|------------|------------|-----------|---------------|
| `swarm/queen/spec13-planning` | - | All agents | CRITICAL |
| `swarm/planner/technical-context` | Queen directive | All phases | HIGH |
| `swarm/planner/phase0-research` | Technical context | Phase 1-4 | HIGH |
| `swarm/planner/phase1-data-model` | Phase 0 | Phase 2-4 | HIGH |
| `swarm/planner/phase2-contracts` | Phase 1 | Phase 3-4 | HIGH |
| `swarm/planner/project-structure` | Phase 2 | Phase 4 | MEDIUM |
| `swarm/coder/implementation-sequence` | Phase 3-4 | Worker synthesis | MEDIUM |
| `swarm/researcher/constitution-compliance` | All phases | Queen review | CRITICAL |
| `swarm/worker/plan-synthesis` | All outputs | Final deliverable | CRITICAL |

## Data Flow Patterns

### Write Operations
```
Planner Agent → Pre-Task Hook → Memory Store → Post-Edit Hook → Sync Broadcast
```

### Read Operations
```
Agent Request → L1 Cache Check → L2 Cache Check → L3 Cache Check → Memory Retrieve
```

### Cross-Agent Communication
```
Agent A → Memory Store → Sync Manifest Update → Agent B Cache Invalidate → Agent B Read
```

## Consistency Validation Rules

### Phase Transition Gates
1. **Phase 0 → Phase 1**: Technical context complete, constitution validated
2. **Phase 1 → Phase 2**: Data model approved, no schema conflicts
3. **Phase 2 → Phase 3**: Contracts type-safe, Zod schemas valid
4. **Phase 3 → Phase 4**: Structure aligned with architecture, naming consistent
5. **Phase 4 → Synthesis**: Sequence feasible, dependencies resolved

### Cross-Phase Invariants
- All TypeScript contracts MUST reference data model types
- Project structure MUST accommodate all contracts
- Implementation sequence MUST respect dependency order
- Constitution compliance MUST pass at every phase

## Conflict Resolution Matrix

| Conflict Type | Detection Method | Resolution Strategy | Rollback Required |
|---------------|------------------|---------------------|-------------------|
| Concurrent Schema Edit | Vector clock | CRDT merge | No |
| Contract Type Mismatch | Type checker | Last-write-wins + notify | Yes |
| Naming Convention Violation | Pattern validator | Reject write | Yes |
| Phase Dependency Break | Graph analyzer | Block transition | Yes |
| Constitution Violation | Researcher agent | Immediate halt | Yes |

## Cache Invalidation Triggers

### Global Invalidation
- Queen directive update
- Constitution change
- Architecture pattern shift

### Partial Invalidation
- Phase completion
- Contract update
- Dependency addition

### No Invalidation (Append-Only)
- Research notes
- Implementation logs
- Metrics data

---

**Last Updated**: ${new Date().toISOString()}
**Cross-References**: 0 (awaiting planning artifacts)
**Consistency Status**: INITIAL
