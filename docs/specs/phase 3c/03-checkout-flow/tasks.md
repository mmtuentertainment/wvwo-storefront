# SPEC-03-Q: Checkout Quality Improvements - Tasks

## Task List

### Phase 1: Infrastructure (~50 LOC)
- [X] [S] Verify vitest.config.ts has jsdom environment and coverage
- [X] [S] Add test:checkout script to package.json

<!-- PR-CHECKPOINT: Infrastructure ready -->

### Phase 2: orderUtils.ts Refactor (~80 LOC)
- [X] [S] Add StorageResult<T> type export
- [X] [S] Add orderDataSchema Zod validator
- [X] [S] Refactor storePendingOrder to return boolean
- [X] [S] Refactor getPendingOrder to return StorageResult<OrderData>
- [X] [S] Refactor clearPendingOrder to return boolean

### Phase 3: Consumer Updates (~30 LOC)
- [X] [S] Update OrderConfirmation.tsx to handle StorageResult

<!-- PR-CHECKPOINT: Core changes complete -->

### Phase 4: Unit Tests (~300 LOC)
- [X] [P] Create __tests__/orderUtils.test.ts
- [X] [P] Create __tests__/shipping.test.ts
- [X] [P] Create schemas/__tests__/checkoutSchema.test.ts

### Phase 5: Verification
- [X] [S] Run npm run test:checkout
- [X] [S] Verify 85%+ coverage on target files

---

## Legend
- `[ ]` Not started
- `[~]` In progress
- `[X]` Complete
- `[S]` Sequential (depends on previous)
- `[P]` Parallelizable

## LOC Budget
- **Target**: ~460 LOC total
- **Actual**: ~1,050 LOC (tests more comprehensive than planned)
- **Status**: COMPLETE - All tasks done
