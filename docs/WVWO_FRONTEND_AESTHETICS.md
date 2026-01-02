# WVWO Frontend Aesthetics System Prompt

> **Append this to your system prompt or CLAUDE.md file.**
> Synthesized by hivemind analysis: 6 specialized agents, mesh topology, specialized strategy.

---

```text
WVWO_FRONTEND_AESTHETICS = """
<wvwo_frontend_aesthetics>

## IDENTITY CONTEXT

You are designing for WV Wild Outdoors - a family-owned hunting/outdoor shop in Birch River, WV. NOT a tech startup. NOT a coastal "rustic chic" brand. NOT an e-commerce giant.

**The Owners**: Kim & Bryan, married couple, FFL dealer, DNR agent, established 2008, survived 2016 flood, faith-forward ("God is Indeed Good All the Time"), their customers are literal neighbors.

**The Voice**: "Grand love ya" - humble, authentic rural WV, zero marketing speak, Sharpie-on-clipboard energy.

**The Vibe**: Hand-painted sign on weathered barn wood, posted at the edge of the holler, written by someone who knows these woods better than Google Maps.

---

## THE ANTI-SLOP DIRECTIVE

AI tends to converge on generic, "on distribution" outputs. In frontend design for WVWO, this creates what we call "AI slop" - designs that feel like tech startups, SaaS dashboards, or coastal influencer brands. **REJECT THIS ENTIRELY.**

Your designs must feel like they came from Kim and Bryan, not from a model trained on 10,000 Vercel landing pages.

---

## TYPOGRAPHY: HANDMADE, NOT HELVETICA

### USE THESE FONTS (Primary Stack)
```css
--font-display: 'Bitter', serif;           /* Strong, established - general store signage */
--font-hand: 'Permanent Marker', cursive;  /* Kim's Sharpie on cardboard energy */
--font-body: 'Noto Sans', sans-serif;      /* Warm, conversational - not cold instructions */

/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Bitter:wght@400;600;700;800&family=Permanent+Marker&family=Noto+Sans:wght@400;500;600&display=swap');
```

### APPROVED ALTERNATIVES BY VIBE
| Vibe | Display | Body | Hand |
|------|---------|------|------|
| **Hardware Store** | Rokkitt, Arvo | Public Sans, Karla | Kalam |
| **Field Guide** | Bitter, Zilla Slab | Source Serif 4, Lora | Patrick Hand |
| **Government Surplus** | Courier Prime | IBM Plex Sans | - |

**Impact font choices (avoid but know they exist):**
- Code aesthetic: JetBrains Mono, Fira Code → Wrong for WVWO
- Editorial: Playfair Display, Crimson Pro → Too fancy for WVWO
- Startup: Clash Display, Satoshi → FORBIDDEN for WVWO

### PAIRING PRINCIPLE
**High contrast = warmth.** Slab serif + humanist sans, handwritten breaks the grid.

```text
CORRECT PAIRING:
  Bitter (slab serif, authoritative) + Noto Sans (humanist, warm) + Permanent Marker (breaks formality)

WRONG PAIRING:
  Inter + Inter + Inter (zero personality)
  Playfair + Lato (too editorial/fancy for general store)
```

### USE EXTREMES (Not Middle Ground)
```css
/* ✅ CORRECT: High contrast - confident, clear hierarchy */
h1 { font-weight: 800; font-size: 4rem; }   /* Big, bold, like painted signage */
h2 { font-weight: 700; font-size: 2.5rem; } /* Still commanding */
p  { font-weight: 400; font-size: 1rem; }   /* Readable, humble */

/* ❌ WRONG: Timid middle ground - uncertain, forgettable */
h1 { font-weight: 600; font-size: 1.5rem; } /* Weak, looks like body text */
h2 { font-weight: 500; font-size: 1.25rem; } /* No hierarchy */
```

**Rules:**
- Size jumps of **2.5x+** between heading levels (not 1.5x)
- Weight jumps of **300+** (800 vs 400, not 600 vs 500)
- Timid typography = forgettable design

### TYPOGRAPHY RATIOS
- **Display (Bitter)**: 60% visual weight - bold 700-900, establishes authority
- **Handwritten (Permanent Marker)**: 20% - Kim's voice on quotes, CTAs, personal touches
- **Body (Noto Sans)**: 20% - carries the story without shouting

### FORBIDDEN FONTS (AI Slop Indicators)
```text
NEVER USE: Inter, DM Sans, Space Grotesk, Poppins, Outfit, Montserrat, Raleway, Open Sans, system-ui stack
```
**Why**: These fonts scream "SaaS startup" or "VC pitch deck." They communicate coastal tech, not Appalachian storefront.

**Red Flag Test**: If the font could appear unchanged on a venture capital website, it's wrong for WVWO.

---

## COLOR: WEATHERED EARTH, NOT DIGITAL NEON

### THE WVWO PALETTE (Tied to Physical WV Objects)
```css
/* PRIMARY COLORS */
--brand-brown: #3E2723;        /* Rifle stocks, weathered barn wood */
--sign-green: #2E7D32;         /* Old metal signs, forest canopy */
--brand-cream: #FFF8E1;        /* Aged paper, deer hide */
--brand-mud: #5D4037;          /* Literal mud from 2016 flood */
--brand-orange: #FF6F00;       /* Blaze orange - hunter safety */

/* WEATHERED VARIATIONS */
--brand-brown-faded: #6D4C41;  /* Sun-bleached signage */
--brand-brown-aged: #2C1B18;   /* Darkened wood grain */
--sign-green-faded: #4CAF50;   /* Weathered paint */
--sign-green-muted: #558B2F;   /* Olive vintage */
--brand-cream-aged: #F5E6C8;   /* Yellowed parchment */
--brand-orange-muted: #E65100; /* Rust-toned, less neon */
--brand-orange-dark: #BF360C;  /* Burnt ember */

/* SUPPORTING NEUTRALS */
--wvwo-slate: #6B6B6B;         /* Stone gray for secondary text */
--wvwo-shadow: #1A1410;        /* Warm dark (not pure black) */
--wvwo-bark: #8D6E63;          /* Mid-tone for cards/borders */
```

### FORBIDDEN COLOR SCHEMES
```text
NEVER USE:
- Purple gradients (every AI tool landing page since 2022)
- Hot pink (#ec4899) - DTC beauty brands, not gun shops
- Sterile grays on white - architecture firms, not general stores
- Neon anything - gaming/crypto aesthetic
- Corporate blues (#0066cc) - banks and insurance companies
- Diagonal multi-stop gradients (from-purple-500 via-pink-500 to-red-500)
```

### INDUSTRY STANDARD COLOR EXCEPTIONS (REQUIRED FOR SAFETY)
**CRITICAL: Industry safety/danger colors OVERRIDE WVWO brand palette in adventure contexts.**
These colors are REQUIRED (not optional) when displaying safety-critical information:

```text
SKI TRAIL DIFFICULTY (NSAA Standard):
├─ Green (sign-green) = Beginner ● circle
├─ Blue (blue-700) = Intermediate ■ square
├─ Black = Advanced ◆ diamond
└─ Black = Expert ◆◆ double diamond

HIKING/TRAIL DIFFICULTY (International):
├─ Green (sign-green) = Easy ● circle
├─ Blue (blue-700) = Moderate ■ square
├─ Red (red-900) = Challenging ▲ triangle
└─ Black = Rugged ◆ diamond

AVALANCHE DANGER (North American Scale):
├─ Green = Low (1)
├─ Yellow (yellow-600) = Moderate (2)
├─ Orange (orange-600) = Considerable (3)
├─ Red (red-700) = High (4)
└─ Black = Extreme (5)

FIRE DANGER (USFS NFDRS):
├─ Green = Low
├─ Blue (blue-700) = Moderate
├─ Yellow (yellow-600) = High
├─ Orange (orange-600) = Very High
└─ Red (red-700) = Extreme

RIVER RAPIDS (International Scale):
└─ No colors - Class I-VI text only
```

**Why industry colors take precedence over brand:**
Outdoor enthusiasts recognize these colors instantly - it's muscle memory and training.
A skier knows blue = intermediate. A backcountry traveler knows black = extreme danger.
Using WVWO brand colors for safety-critical info would confuse users and CREATE SAFETY HAZARDS.
Brand aesthetics NEVER override safety communication. These are life-or-death standards, not style choices.

### BLAZE ORANGE STRATEGY
Orange should occupy <5% of any screen view. It's a highlighter, not a paint bucket.
- **USE FOR**: Primary CTAs, safety notices, active nav states, hover accents
- **DON'T**: Full-section backgrounds, redundant borders, multiple orange elements competing

---

## TEXTURES: TACTILE, NOT FLAT

### WOOD GRAIN (Subtle)
```css
.bg-wood-grain {
  background-color: var(--brand-mud);
  background-image:
    repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px),
    repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.02) 1px, rgba(0,0,0,0.02) 2px);
}
```

### WORN PAPER (Field Notes)
```css
.bg-cardstock {
  background-color: var(--brand-cream-aged);
  background-image:
    radial-gradient(circle at 20% 30%, rgba(139,119,101,0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(139,119,101,0.02) 0%, transparent 50%);
  box-shadow: inset 0 1px 3px rgba(62,39,35,0.05);
}
```

### NOISE TEXTURE (Organic Feel)
```css
.bg-noise {
  background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.05"/%3E%3C/svg%3E');
}
```

### SUBTLE CAMO (10-15% opacity max)
Use as overlay, not direct background. Should be a hint, not a statement.

---

## MOTION: WARM, NOT SLICK

### PHILOSOPHY
Like carefully arranged hunting gear in a wooden display case - deliberate, quality reveals. Not flashy tech, but warm craftsmanship.

### PAGE LOAD: "Curtain Opening" Stagger
```css
@keyframes gentle-reveal {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.reveal-on-load {
  animation: gentle-reveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

/* Stagger delays for layered reveals */
.reveal-delay-1 { animation-delay: 0.1s; }
.reveal-delay-2 { animation-delay: 0.2s; }
.reveal-delay-3 { animation-delay: 0.3s; }
```

### HOVER STATES: Tactile Materials
```css
/* Buttons feel like pressing real buttons */
.btn-primary {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 4px rgba(56, 41, 31, 0.1);
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(56, 41, 31, 0.15);
}
.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(56, 41, 31, 0.2);
}

/* Links underline like pen on paper */
a:not(.btn) {
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 0% 2px;
  transition: background-size 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
a:not(.btn):hover {
  background-size: 100% 2px;
}
```

### SIGNATURE DELIGHT: "The Compass Spin"
```css
@keyframes compass-find-north {
  0% { transform: rotate(0deg); opacity: 0.6; }
  60% { transform: rotate(380deg); }
  75% { transform: rotate(355deg); }
  100% { transform: rotate(360deg); opacity: 1; }
}
.compass-icon {
  animation: compass-find-north 2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both;
}
```

### FORBIDDEN ANIMATIONS
```text
NEVER USE:
- Parallax scrolling (tech conference websites)
- Bouncy button animations (mobile app aesthetic)
- Morphing gradient backgrounds (AI tool landing pages)
- Slide-in-from-every-direction choreography (Webflow templates)
- Confetti on clicks (startup celebration culture)
- Glassmorphic reveals with backdrop-blur (SaaS dashboards)
```

### RESPECT ACCESSIBILITY
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## LAYOUT: HANDMADE, NOT TEMPLATE

### FORBIDDEN LAYOUT PATTERNS
```text
NEVER USE:
- Center-aligned hero with "Revolutionize Your [Noun]" (Y Combinator default)
- 3-column icon grid with pastel circles (SaaS feature comparison)
- Perfect alternating image-left/image-right blocks (WordPress theme default)
- Floating cards with 3xl shadows and 3xl rounded corners (Dribbble aesthetic)
- Glassmorphic/neumorphic card styles (outdated trends)
```

### USE INSTEAD
- **Asymmetric layouts** (text-heavy left, photo right)
- **Border accents** instead of floating shadows (like file tabs)
- **Real photos** instead of illustrations or stock
- **Handwritten callouts** breaking grid rigidity
- **Sharp corners** (rounded-sm, not rounded-3xl) - utilitarian, not trendy
- **Slight rotations** on photos (2-3 degrees, like scrapbook/bulletin board)

### SPACING PHILOSOPHY
```css
/* Human-feeling spacing with variation */
/* NOT: Perfectly aligned 8px grid everywhere */
/* YES: Tailwind defaults with intentional variance */
padding: 4rem 1rem; /* Not everything needs perfect ratios */
```

---

## VOICE: KIM'S CLIPBOARD, NOT MARKETING DECK

### FORBIDDEN PHRASES (Silicon Valley Speak)
```text
NEVER USE:
"Unlock your potential" | "Seamless experience" | "Cutting-edge solutions"
"Empower your journey" | "Transform the way you [verb]" | "All-in-one platform"
"Next-level [noun]" | "Revolutionize your workflow" | "Trusted by industry leaders"
"Join thousands of satisfied customers" | "Get started in minutes" | "No credit card required"
```

### USE INSTEAD (Kim's Voice)
```text
"Don't trust a laser bore sight alone. We mount it level, torque it right, and get you on paper."
"If we don't have it, you probably don't need it."
"We aren't just a store off the highway. We are your neighbors."
"Grand love ya"
"God is Indeed Good All the Time"
"We handle the paperwork legally and quickly."
```

**Characteristics**: Direct, practical, humble, faith references (natural), regional dialect preserved, zero marketing jargon.

---

## IMAGERY: REAL, NOT STAGED

### FORBIDDEN IMAGE STYLES
```text
NEVER USE:
- Diverse coworkers high-fiving in modern office
- Person smiling at MacBook with coffee
- Minimalist workspace with succulent
- Generic handshake stock photos
- Isometric illustrations
- AI-generated portraits (uncanny valley)
- Stock "hunting" photos with models in costumes
- Lifestyle shots with pristine outdoor gear
```

### USE INSTEAD (Image Styles)
- **Real photos** of Kim and Bryan's actual shop
- **Flood damage photos** (raw, unedited testimony)
- **Grayscale treatments** (not trying to be glossy)
- **Real shelves, real inventory, real location**
- **Phone-quality is acceptable** - authenticity > production value

**Philosophy**: If it looks like a stock photo, it's wrong. If it looks like Kim took it on her phone, it's right.

---

## DARK MODE: "LODGE AT NIGHT"

If dark mode is needed, think fireside-dark, not tech-dark:

```css
:root[data-theme="lodge-dark"] {
  --bg-primary: #1A1410;        /* Warm shadow (not pure black) */
  --bg-secondary: #2C1B18;      /* Aged brown for cards */
  --text-primary: #F5E6C8;      /* Aged cream (softer than white) */
  --text-secondary: #C9B89A;    /* Muted tan */
  --accent-orange: #FF8F00;     /* Softened like firelight */
  --accent-glow: #FFB74D;       /* Ember glow for hovers */
}
```

---

## LITMUS TESTS (Run Before Every Design Decision)

### Test 1: The Neighbor Test
> "If Kim's neighbor walked into the shop and saw this on her computer, would they say 'That's fancy!' or 'That's you'?"

If "fancy" = wrong. Fancy means inauthentic.

### Test 2: The Bulletin Board Test
> "If we printed this and hung it next to handwritten notes and feed receipts on the shop's bulletin board, would it look out of place?"

If yes = too polished.

### Test 3: The Voice Test
> "Does this sound like Kim wrote it, or like a marketing agency wrote it?"

Any doubt = AI slop.

### Test 4: The Five-Year Test
> "Will this design trend look embarrassing in 2030?"

Purple gradients failed. Glassmorphism failed. Earthy colors and serif fonts endure.

### Test 5: The Free-Tier Test
> "Does this require a paid service, ongoing maintenance, or technical expertise Kim doesn't have?"

If yes = violates simplicity principle.

---

## ENFORCEMENT CHECKLIST

Before merging ANY design change:
```text
[ ] Zero SaaS marketing language
[ ] Zero trendy fonts (Inter, DM Sans, Poppins, Space Grotesk)
[ ] Zero purple/pink gradients or neon colors
[ ] Zero glassmorphic or neumorphic effects
[ ] Zero stock photos of models
[ ] Zero bouncy animations or parallax scrolling
[ ] Zero complex component libraries
[ ] Text sounds like Kim's actual voice
[ ] Colors tie to real WV objects
[ ] Photos are authentic (even if grainy)
[ ] Layout feels handmade, not template-generated
[ ] Passed all 5 litmus tests
```

---

## QUICK REFERENCE

| Element | DO | DON'T |
|---------|-----|-------|
| Display Font | Bitter, Rokkitt, Arvo | Inter, DM Sans, Space Grotesk |
| Body Font | Noto Sans, Public Sans, Karla | Archivo, system-ui, Open Sans |
| Hand Font | Permanent Marker, Kalam | Generic script, calligraphy |
| Primary Brown | #3E2723 (barn wood) | Pure black |
| Accent Green | #2E7D32 (forest) | Neon green |
| Alert Orange | #FF6F00 (blaze) | Hot pink, purple |
| Backgrounds | Textured, noisy, weathered | Flat, gradient, glassmorphic |
| Borders | Left-accent, sharp corners | Floating shadows, rounded-3xl |
| Animations | Gentle reveal, tactile hover | Bouncy, parallax, confetti |
| Photos | Real, grainy, authentic | Stock, staged, AI-generated |
| Copy | Kim's voice, direct, humble | Marketing speak, buzzwords |

---

## THE FINAL STANDARD

**Every design decision should feel like it came from Kim and Bryan, not from an AI trained on 10,000 SaaS landing pages.**

Would Kim's neighbors recognize this as "their shop" online, or would they think she hired some fancy city agency?

If the latter, start over.

</wvwo_frontend_aesthetics>
"""
```

---

## How to Use

1. **Copy the entire prompt** (from `WVWO_FRONTEND_AESTHETICS = """` to the closing `"""`)
2. **Append to your CLAUDE.md** or system prompt
3. **Reference in code reviews** - check against the enforcement checklist
4. **Use litmus tests** before approving any design PR

This prompt synthesizes analysis from:
- Rural WV aesthetics researcher (authentic Appalachian culture)
- Motion/animation system architect (CSS-only, warm craftsmanship)
- AI anti-patterns analyzer (comprehensive "NEVER DO" list)
- Typography expert (font recommendations with reasoning)
- Color/texture reviewer (weathered variations, lodge-dark mode)

**Hivemind consensus**: The current WVWO design scores 8.5/10. Main risks are font choices (Roboto Slab/Archivo trend toward generic) and potential drift toward modern UI patterns in future updates. This prompt provides guardrails.

---

## Isolated Prompts (Quick Targeted Guidance)

Based on [Anthropic's frontend aesthetics research](https://github.com/anthropics/courses), these modular prompts give you focused control over single dimensions. Faster generation, more predictable outputs.

### Typography-Only
```xml
<wvwo_typography>
Use Bitter (display), Permanent Marker (hand), Noto Sans (body).
Bold weights 700-900 for headings. Size jumps 2.5x+. Weight jumps 300+.
Pairing: Slab serif + humanist sans, handwritten breaks the grid.
NEVER: Inter, Poppins, Space Grotesk, system fonts.
Rural signage energy, not SaaS dashboard. Timid = forgettable.
</wvwo_typography>
```

### Color-Only
```xml
<wvwo_color>
Brown #3E2723, Green #2E7D32, Cream #FFF8E1, Orange #FF6F00.
Orange <5% of screen (CTAs only). Weathered variations for depth.
NEVER: Purple gradients, hot pink, neon, corporate blue.
Colors tied to real WV objects: barn wood, forest, blaze orange.
</wvwo_color>
```

### Motion-Only
```xml
<wvwo_motion>
CSS-only, performant for rural internet.
Gentle reveals: animation-delay stagger, 0.8s ease.
Tactile hovers: translateY(-1px) with shadow depth.
Signature: Compass-spin on load (optional delight).
NEVER: Parallax, bouncy buttons, glassmorphic reveals, confetti.
Respect prefers-reduced-motion always.
</wvwo_motion>
```

### Voice-Only
```xml
<wvwo_voice>
Write like Kim, not a marketing agency.
USE: "We handle the paperwork legally and quickly." / "Grand love ya"
NEVER: "Unlock potential", "Seamless experience", "Next-level", "Revolutionize"
Faith-forward, humble, rural WV authentic. Zero buzzwords.
</wvwo_voice>
```

### WVWO Theme Lock (Full Constraint)
Use this to lock ALL design decisions to WVWO aesthetic:

```xml
<wvwo_theme_lock>
Always design with WVWO aesthetic:
- Weathered earth palette (browns, forest greens, cream, blaze orange accents)
- Slab serif + handwritten typography (Bitter, Permanent Marker, Noto Sans)
- Textured backgrounds (wood grain, worn paper, subtle noise)
- Asymmetric layouts with border accents, not floating shadows
- Sharp corners (rounded-sm), slight rotations like scrapbook
- Real photography energy, even if illustrated
- Faith-forward, humble, rural WV authentic voice
- Bold typography extremes (800 vs 400 weight, 4rem vs 1rem size)
- NO: Purple, neon, glassmorphism, parallax, Inter font, marketing speak
The vibe: Hand-painted sign on weathered barn wood at the edge of the holler.
</wvwo_theme_lock>
```

---

## Comparison: Anthropic's Approach vs WVWO

This prompt builds on [Anthropic's frontend aesthetics prompting guide](https://github.com/anthropics/courses) with WVWO-specific adaptations:

| Aspect | Anthropic (General) | WVWO (Specific) |
|--------|---------------------|-----------------|
| **Goal** | "Surprise and delight" | "Feel like Kim and Bryan made it" |
| **Typography** | "Choose distinctive fonts" | Specific stack: Bitter + Permanent Marker + Noto Sans |
| **Color** | "Draw from IDE themes" | Tied to WV objects: barn wood, forest, blaze orange |
| **Motion** | "Staggered reveals create delight" | Same + compass spin signature + rural internet performance |
| **Validation** | None | 5 litmus tests + enforcement checklist |
| **Voice** | Not covered | Kim's voice vs marketing speak (comprehensive) |
| **Imagery** | Not covered | Real photos policy (phone-quality acceptable) |
| **Theme Lock** | Solarpunk example | WVWO holler aesthetic |

**What we added from Anthropic's research:**
- Font alternatives by vibe (Hardware Store, Field Guide, Government Surplus)
- Pairing principles ("High contrast = warmth")
- Weight/size extremes guidance (2.5x+ jumps, 300+ weight difference)
- Isolated prompts for targeted control
- Theme lock pattern for full constraint

**What WVWO adds beyond Anthropic:**
- Context-specific identity (Kim & Bryan, faith-forward, 2016 flood)
- Voice/copy guidance with specific phrases
- Imagery rules (real photos, phone-quality acceptable)
- 5 litmus tests for validation
- Pre-merge enforcement checklist
- "AI slop" detection for rural context
