# WVWO Storefront - Project Overview

## Identity
- **Business**: West Virginia Wild Outdoors (WVWO) - outdoor/hunting shop at I-79 Exit 57, WV-82 (38.5858, -80.8581)
- **Owners**: Kim (shop owner, brand voice) and Matt (developer, 45 hrs/week)
- **Strategic Pivot (Dec 2025)**: E-commerce → Adventure Destination Hub
- **Reason**: Kim's fraud concerns + shipping economics make heavy item fulfillment impossible

## Revenue Model
Adventure content SEO → affiliate marketing + local shop visits
- Free WV destination guides → SEO traffic → "Stop by before you head out" CTAs

## Tech Stack
- **Framework**: Astro 5 with Content Collections
- **Language**: TypeScript with Zod validation
- **Styling**: Tailwind 4.x (CSS-first @theme blocks in global.css, NOT JS config)
- **Components**: shadcn/ui + React (Context API for state)
- **State**: Nanostores (cart disabled via PUBLIC_COMMERCE_ENABLED=false)
- **Deployment**: Cloudflare Pages
- **Memory**: ReasoningBank (.swarm/memory.db) - 172 WVWO patterns

## Current Progress (as of 2025-12-26)
- ✅ SPEC-07: Adventures Hub Filtering (PR #1-8)
- ✅ SPEC-07B: Navigation Consolidation (PR #60)
- ✅ SPEC-08: AdventureCard Component (PR #61)
- 🔄 SPEC-09: AdventureHero Component (PR #63 merged, PR #64 pending)
- ⏸️ SPEC-10-70: 61 specs remaining

## Launch Timeline
- **Soft Launch**: February 20, 2026 (10 adventures)
- **Full Completion**: May 2026 (42 destinations)

## Source of Truth Documents
- Master Plan: `docs/specs/Mountain State Adventure Destination/MASTER-SEQUENCING-PLAN.md`
- Constitution: `docs/WVWO_CONSTITUTION.md`
- Aesthetics: `docs/WVWO_FRONTEND_AESTHETICS.md`
