# WVWO Codebase Structure

```
wvwo-storefront/
├── src/
│   ├── components/           # Astro & React components
│   │   ├── adventure/        # Adventure-specific (AdventureHero, AdventureCard)
│   │   ├── ui/               # shadcn/ui components
│   │   └── __tests__/        # Component unit tests (Vitest)
│   ├── content/              # Astro Content Collections
│   │   └── adventures/       # Adventure markdown files
│   ├── layouts/              # Astro layouts
│   ├── lib/                  # Shared utilities
│   │   └── utils/            # Helpers (date-formatter.ts, etc.)
│   ├── pages/                # Astro pages
│   │   ├── adventures/       # Adventure hub
│   │   ├── near/             # Location pages (migrating to Content Collections)
│   │   └── guides/           # Seasonal guides
│   └── styles/               # Global CSS (Tailwind @theme)
├── tests/
│   └── e2e/                  # Playwright E2E tests
├── docs/
│   └── specs/                # SPEC documentation
│       └── Mountain State Adventure Destination/
│           └── MASTER-SEQUENCING-PLAN.md
├── .swarm/                   # ReasoningBank memory
│   └── memory.db             # SQLite database (172 patterns)
├── .serena/                  # Serena MCP configuration
│   └── memories/             # Serena memory files
├── public/                   # Static assets
├── astro.config.mjs          # Astro configuration
├── tailwind.config.ts        # Tailwind config (minimal, CSS-first)
├── tsconfig.json             # TypeScript config
├── vitest.config.ts          # Vitest config
├── playwright.config.ts      # Playwright config
└── CLAUDE.md                 # Claude Code instructions
```

## Key Files
- **Component Tests**: `src/components/**/__tests__/*.test.ts`
- **E2E Tests**: `tests/e2e/*.spec.ts`
- **Content Schema**: `src/content/config.ts`
- **Global Styles**: `src/styles/global.css` (Tailwind @theme)
- **Feature Flag**: `.env` → `PUBLIC_COMMERCE_ENABLED=false`
