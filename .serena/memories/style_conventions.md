# WVWO Code Style & Design Conventions

## CRITICAL: WVWO Design System

### Border Radius
- ✅ ONLY use: `rounded-sm`
- ❌ NEVER use: `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`

### Colors (Brand Palette ONLY)
- ✅ `brand-brown` (primary)
- ✅ `sign-green` (accent/CTA)
- ✅ `brand-cream` (backgrounds)
- ✅ `brand-orange` (<5% of screen, highlights only)
- ❌ NEVER use: `stone-*`, `gray-*`, `slate-*`, `zinc-*`

### Typography
- ✅ `font-display`, `font-body`, `font-hand`
- ❌ NEVER use: Inter, Poppins, system-ui defaults

### Animations
- Pattern: "Morning Mist Lift" (staggered reveal)
- Keyframes: `translateY(12px)` to `0` with opacity
- Delays: 0ms, 100ms, 180ms, 260ms
- REQUIRED: `@media (prefers-reduced-motion: reduce)` on ALL animations
- Use: `motion-safe:*` and `motion-reduce:*` Tailwind variants

### Layout Patterns
- Hero: 7/5 asymmetric grid (`lg:col-span-7` content, `lg:col-span-5` image)
- Components: 5-slot architecture (default, cta, badge-extra, aside, schema-extra)

### Accessibility (WCAG 2.1 AA)
- Tap targets: 44px minimum
- Forms: fieldset + legend for groups
- ARIA: Required on all interactive elements
- Colorblind: Shape+color for difficulty (circle/triangle/square/diamond)

## Kim's Voice Guidelines

### Tone
- Local knowledge: "Some folks say...", "Old-timers will tell you..."
- Practical specifics: exact drive times, real species, facility details
- Warm closing: "Grand love ya!"

### Forbidden Phrases
- seamless, curated, elevate, bespoke
- leverage, synergy, best-in-class, game-changer

### Litmus Tests
- Neighbor Test: Would I say this to my neighbor?
- Counter Test: Does it sound like Kim at the shop counter?
- Five-Year Test: Will this still be true in 5 years?

## TypeScript Conventions
- Strict mode enabled
- Interfaces for component props with sensible defaults
- Zod validation for Content Collections
- Typed result pattern: `{ success, reason, data, userMessage }`
