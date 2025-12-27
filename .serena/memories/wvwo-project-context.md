# WVWO Project Context

## Project Identity
- **Business**: WVWO - outdoor/hunting shop at I-79 Exit 57, WV-82 (38.5858, -80.8581)
- **Owners**: Kim (shop owner, voice of brand), Matt (developer)
- **Pivot**: Dec 2025: E-commerce → Adventure Destination Hub
- **Revenue**: Adventure content SEO → affiliate marketing + local shop visits

## Tech Stack
- Framework: Astro 5 with Content Collections
- Language: TypeScript + Zod validation
- Styling: Tailwind 4.x (CSS-first @theme blocks)
- Components: shadcn/ui + React (Context API)
- State: Nanostores (cart disabled via PUBLIC_COMMERCE_ENABLED=false)
- Deployment: Cloudflare Pages

## Design System (CRITICAL)
### Borders
- **Allowed**: rounded-sm ONLY
- **Forbidden**: rounded-md, rounded-lg, rounded-xl, rounded-full

### Colors
- brand-brown (primary)
- sign-green (accent/CTA)
- brand-cream (backgrounds)
- brand-orange (<5% of screen, highlights only)
- **Forbidden**: stone-*, gray-*, slate-*, zinc-*

### Fonts
- **Allowed**: font-display (Bitter), font-body (Noto Sans), font-hand (Permanent Marker)
- **Forbidden**: Inter, Poppins, system-ui

### Animations
- Pattern: Morning Mist Lift (staggered reveal)
- Delays: 0ms, 100ms, 180ms, 260ms
- **Required**: @media (prefers-reduced-motion: reduce) on ALL animations

## Kim's Voice Guidelines
### Tone
- Local knowledge ("Some folks say...", "Old-timers will tell you...")
- Practical specifics (exact drive times, real species)
- Humble pride ("We aren't just a store off the highway...")
- Warm closing ("Grand love ya!")

### Forbidden Phrases
seamless, curated, elevate, bespoke, leverage, synergy, best-in-class, game-changer

### Litmus Tests
- Neighbor Test: Would I say this to my neighbor?
- Counter Test: Does it sound like Kim at the shop counter?
- Five-Year Test: Will this still be true in 5 years?

## File Organization
- Specs: docs/specs/Mountain State Adventure Destination/
- Components: src/components/
- Content: src/content/adventures/
- Utilities: src/lib/utils/
- Tests: src/components/**/__tests__/ and tests/e2e/
