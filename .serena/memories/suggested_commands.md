# WVWO Development Commands

## Build & Development
```bash
npm run dev          # Start Astro dev server (localhost:4321)
npm run build        # Production build
npm run preview      # Preview production build
```

## Testing
```bash
npm test             # Run Vitest unit tests
npm run test:watch   # Watch mode
npm run test:e2e     # Run Playwright E2E tests
npx playwright test  # Run specific E2E tests
```

## Linting & Formatting
```bash
npm run lint         # ESLint
npm run typecheck    # TypeScript type checking
npm run format       # Prettier formatting
```

## Git Operations
```bash
git status           # Check working tree
git diff             # View changes
git add .            # Stage all changes
git commit -m "..."  # Commit with message
git push             # Push to remote
```

## ReasoningBank (Memory System)
```bash
# Query WVWO patterns
npx claude-flow@alpha memory query "pattern" --reasoningbank

# Store new pattern
npx claude-flow@alpha memory store <key> "<content>" --namespace wvwo-successes --reasoningbank

# Direct SQLite query
cd .swarm && node -e "const db = require('better-sqlite3')('./memory.db'); console.log(db.prepare('SELECT * FROM memory_entries WHERE namespace LIKE \"wvwo%\" LIMIT 10').all());"
```

## Windows-Specific Utils
```bash
dir                  # List directory (Windows)
dir /b               # Brief listing
type file.txt        # View file content (like cat)
findstr "pattern" *  # Search in files (like grep)
```
