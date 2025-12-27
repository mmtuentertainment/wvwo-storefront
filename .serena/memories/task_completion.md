# Task Completion Checklist

## Before Marking Done

### Code Quality
- [ ] TypeScript compiles (`npm run typecheck`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Unit tests pass (`npm test`)
- [ ] E2E tests pass if applicable (`npm run test:e2e`)

### WVWO Aesthetic Verification
- [ ] Only `rounded-sm` used (no rounded-md/lg)
- [ ] Only brand colors used (no stone-*/gray-*)
- [ ] All animations have `prefers-reduced-motion` protection
- [ ] Tap targets are 44px minimum

### Accessibility
- [ ] ARIA labels on interactive elements
- [ ] Proper heading hierarchy
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Keyboard navigation works

### Documentation
- [ ] Component props documented
- [ ] Any new patterns stored in ReasoningBank

## After Completion

### Git
```bash
git add .
git commit -m "feat(SPEC-XX): description"
git push origin feature/SPEC-XX-name
```

### Store Pattern in ReasoningBank
```bash
npx claude-flow@alpha memory store "pattern-name" "What was learned" --namespace wvwo-successes --reasoningbank
```

### Update Master Plan
If SPEC is complete, update status in:
`docs/specs/Mountain State Adventure Destination/MASTER-SEQUENCING-PLAN.md`
