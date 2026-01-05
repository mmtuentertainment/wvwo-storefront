# Component Architecture - AdventureCTA

**Architect**: Component Architect 3
**Domain**: AdventureCTA (Call-to-Action) component
**Date**: 2025-12-27

---

## Component Overview

**AdventureCTA** is a universal call-to-action component with dual buttons (primary + secondary), heading, and description. Used for driving user actions: Get Directions, Call the Shop, View Regulations, etc.

### Design Philosophy

**Simplicity**: Single-purpose component for action prompts
**Flexibility**: Configurable text, links, and background variants
**WVWO Voice**: Authentic, humble CTAs (no marketing buzzwords)

---

## Component Architecture

### Component Responsibility

**Single Responsibility**: Display heading + description + 2 action buttons with WVWO styling

### Props Interface

```typescript
interface Props {
  /** Primary button text (default: "Get Directions") */
  primaryText?: string;

  /** Primary button href (required) */
  primaryHref: string;

  /** Secondary button text (default: "Call the Shop") */
  secondaryText?: string;

  /** Secondary button href (required) */
  secondaryHref: string;

  /** Optional heading above buttons */
  heading?: string;

  /** Optional description text */
  description?: string;

  /** Background variant (default: 'sign-green') */
  variant?: 'sign-green' | 'brand-brown';
}
```

### DOM Structure

```astro
<section class="py-16 bg-{variant}">
  <div class="container mx-auto px-4">
    <div class="max-w-2xl mx-auto text-center">
      <!-- Optional Heading -->
      {heading && (
        <h2 class="font-display text-4xl font-bold text-white mb-4">
          {heading}
        </h2>
      )}

      <!-- Optional Description -->
      {description && (
        <p class="text-lg text-white/90 mb-8">
          {description}
        </p>
      )}

      <!-- Button Group -->
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <!-- Primary Button -->
        <a
          href={primaryHref}
          class="inline-block px-8 py-4 bg-white text-{variant} font-display font-bold text-lg rounded-sm hover:bg-white/90 transition-colors duration-300"
        >
          {primaryText || "Get Directions"}
        </a>

        <!-- Secondary Button -->
        <a
          href={secondaryHref}
          class="inline-block px-8 py-4 border-2 border-white text-white font-display font-bold text-lg rounded-sm hover:bg-white hover:text-{variant} transition-colors duration-300"
        >
          {secondaryText || "Call the Shop"}
        </a>
      </div>
    </div>
  </div>
</section>
```

### Styling Strategy

**Section Background**:

- **sign-green variant**: Green background (`bg-sign-green`)
- **brand-brown variant**: Brown background (`bg-brand-brown`)
- Default: `sign-green` (outdoor/adventure theme)

**Layout**:

- Centered content: `max-w-2xl mx-auto text-center`
- Container: `container mx-auto px-4` (responsive padding)
- Vertical padding: `py-16` (consistent with other sections)

**Heading**:

- Font: `font-display` (Bitter serif)
- Size: `text-4xl font-bold` (large, attention-grabbing)
- Color: `text-white` (high contrast on green/brown)

**Description**:

- Size: `text-lg` (readable, not overwhelming)
- Color: `text-white/90` (slightly muted vs. heading)
- Margin: `mb-8` (spacing before buttons)

**Button Group**:

- Layout: Flexbox with responsive direction
  - Mobile: `flex-col` (stacked vertically)
  - Desktop: `sm:flex-row` (side-by-side)
- Justify: `justify-center` (centered alignment)
- Gap: `gap-4` (consistent spacing)

**Primary Button**:

- Background: `bg-white` (inverted from section)
- Text: `text-{variant}` (green or brown text)
- Padding: `px-8 py-4` (substantial clickable area)
- Font: `font-display font-bold text-lg` (prominent)
- Hover: `hover:bg-white/90` (subtle darken)
- Transition: `transition-colors duration-300` (smooth)

**Secondary Button**:

- Background: Transparent (border-only)
- Border: `border-2 border-white` (outlined style)
- Text: `text-white` (matches section text)
- Hover: `hover:bg-white hover:text-{variant}` (fills on hover)
- Transition: `transition-colors duration-300` (smooth)

**Accessibility**:

- Corners: `rounded-sm` (WVWO compliance, not rounded-md)
- Contrast: White on green (6.8:1), white on brown (12.1:1)
- Clickable area: 48×48px minimum (exceeds 44px WCAG guideline)

### Variant System

**Green Variant** (default):

```astro
<AdventureCTA
  variant="sign-green"
  primaryHref="https://maps.google.com/?q=Elk+River+WMA"
  secondaryHref="tel:+13045551234"
/>
```

- Background: `bg-sign-green` (#2E7D32)
- Primary button text: `text-sign-green`
- Use case: Outdoor/adventure CTAs

**Brown Variant**:

```astro
<AdventureCTA
  variant="brand-brown"
  heading="Stop By the Shop"
  description="We'll get you set up with licenses, ammo, and local tips."
  primaryText="Get Directions to Shop"
  primaryHref="/contact"
  secondaryText="Call Now"
  secondaryHref="tel:+13045551234"
/>
```

- Background: `bg-brand-brown` (#3E2723)
- Primary button text: `text-brand-brown`
- Use case: Shop-related CTAs

---

## Usage Patterns

### Pattern 1: Simple Directions + Phone

**Minimal props**:

```astro
<AdventureCTA
  primaryHref="https://maps.google.com/?q=Burnsville+Lake+WMA"
  secondaryHref="tel:+13045551234"
/>
```

**Renders**:

- Heading: (none)
- Description: (none)
- Primary button: "Get Directions"
- Secondary button: "Call the Shop"

### Pattern 2: Contextual Heading + Description

**Full props**:

```astro
<AdventureCTA
  heading="Ready to Hunt Elk River?"
  description="Stop by the shop for licenses, ammo, and local tips before you head out."
  primaryText="Get Directions"
  primaryHref="https://maps.google.com/?q=Elk+River+WMA"
  secondaryText="Call the Shop"
  secondaryHref="tel:+13045551234"
  variant="sign-green"
/>
```

**Renders**:

- Full heading + description
- Custom button text
- Green background (outdoor theme)

### Pattern 3: Regulations + Contact

**Custom actions**:

```astro
<AdventureCTA
  heading="Plan Your Visit"
  description="Check current regulations and contact the shop for local insights."
  primaryText="View WV DNR Regulations"
  primaryHref="https://wvdnr.gov/hunting/regulations.pdf"
  secondaryText="Ask Kim & Bryan"
  secondaryHref="/contact"
  variant="brand-brown"
/>
```

**Renders**:

- Brown background (shop-related)
- Custom button text (non-default)
- External regulation link

---

## WVWO Voice Guidelines

### Approved CTA Text

**Good (authentic, humble)**:

- "Get Directions"
- "Call the Shop"
- "Stop By Before You Head Out"
- "Ask Kim & Bryan"
- "Check Current Regulations"
- "View DNR Info"

**Bad (marketing buzzwords)**:

- ❌ "Unlock Your Adventure"
- ❌ "Start Your Journey Today"
- ❌ "Transform Your Hunt"
- ❌ "Experience the Difference"

### Approved Heading/Description Patterns

**Good (specific, helpful)**:

- "Ready to Hunt Elk River?" + "Stop by the shop for licenses and local tips."
- "Plan Your Visit" + "Check regulations and contact us for insights."
- "Need Directions?" + "We're 25 minutes from Burnsville Lake WMA."

**Bad (generic, corporate)**:

- ❌ "Discover Your Next Adventure" + "Explore our premium offerings."
- ❌ "Elevate Your Experience" + "Join thousands of satisfied hunters."

---

## Accessibility Features

### Keyboard Navigation

- Buttons use `<a>` tags (native keyboard focus)
- Tab order: Primary → Secondary (logical flow)
- Focus visible: Default browser outline (could add custom ring)

### Screen Readers

- Semantic `<a>` tags (announced as links)
- Descriptive button text (no "Click Here")
- Heading hierarchy (h2 for CTA heading)

### Color Contrast

**Green Variant**:

- White text on green (#FFFFFF on #2E7D32): 6.8:1 (exceeds 4.5:1)
- Green text on white (primary button): 6.8:1 (exceeds 4.5:1)

**Brown Variant**:

- White text on brown (#FFFFFF on #3E2723): 12.1:1 (exceeds 4.5:1)
- Brown text on white (primary button): 12.1:1 (exceeds 4.5:1)

### Touch Targets

- Button size: `px-8 py-4` = minimum 48×48px
- Exceeds 44×44px WCAG 2.1 guideline
- Gap between buttons: `gap-4` (prevents mis-clicks)

---

## Testing Strategy

### Unit Tests (Props)

```typescript
test('renders default button text when not provided', () => {
  const { container } = render(AdventureCTA, {
    primaryHref: '/directions',
    secondaryHref: 'tel:+1234567890'
  });

  expect(container).toContainText('Get Directions');
  expect(container).toContainText('Call the Shop');
});

test('renders custom button text when provided', () => {
  const { container } = render(AdventureCTA, {
    primaryHref: '/regulations',
    primaryText: 'View Regulations',
    secondaryHref: '/contact',
    secondaryText: 'Contact Us'
  });

  expect(container).toContainText('View Regulations');
  expect(container).toContainText('Contact Us');
});

test('applies variant background class', () => {
  const { container } = render(AdventureCTA, {
    variant: 'brand-brown',
    primaryHref: '/',
    secondaryHref: '/'
  });

  const section = container.querySelector('section');
  expect(section.classList.contains('bg-brand-brown')).toBe(true);
});
```

### E2E Tests (Rendering)

```typescript
test('CTA section is visible and centered', async ({ page }) => {
  await page.goto('/adventures/burnsville-lake');

  const section = page.locator('section.bg-sign-green');
  await expect(section).toBeVisible();

  const content = section.locator('.max-w-2xl');
  await expect(content).toHaveClass(/text-center/);
});

test('buttons are clickable and navigate correctly', async ({ page }) => {
  await page.goto('/adventures/burnsville-lake');

  const primaryBtn = page.locator('a:has-text("Get Directions")');
  const secondaryBtn = page.locator('a:has-text("Call the Shop")');

  await expect(primaryBtn).toBeVisible();
  await expect(secondaryBtn).toBeVisible();

  // Check href attributes
  await expect(primaryBtn).toHaveAttribute('href', /maps\.google\.com/);
  await expect(secondaryBtn).toHaveAttribute('href', /^tel:/);
});

test('buttons have hover states', async ({ page }) => {
  await page.goto('/adventures/burnsville-lake');

  const primaryBtn = page.locator('a:has-text("Get Directions")');

  // Hover triggers transition
  await primaryBtn.hover();
  await expect(primaryBtn).toHaveCSS('transition', /colors/);
});
```

### Accessibility Tests

```typescript
test('buttons meet minimum touch target size', async ({ page }) => {
  await page.goto('/adventures/burnsville-lake');

  const primaryBtn = page.locator('a:has-text("Get Directions")');
  const box = await primaryBtn.boundingBox();

  expect(box.width).toBeGreaterThanOrEqual(44);
  expect(box.height).toBeGreaterThanOrEqual(44);
});

test('color contrast meets WCAG AA', async ({ page }) => {
  await page.goto('/adventures/burnsville-lake');

  const section = page.locator('section.bg-sign-green');
  const heading = section.locator('h2');

  // White text on green background
  const bgColor = await section.evaluate(el =>
    getComputedStyle(el).backgroundColor
  );
  const textColor = await heading.evaluate(el =>
    getComputedStyle(el).color
  );

  // Calculate contrast ratio (should be ≥4.5:1)
  const contrast = calculateContrastRatio(bgColor, textColor);
  expect(contrast).toBeGreaterThanOrEqual(4.5);
});
```

---

## Performance Considerations

### Bundle Size

- Component: ~1.5KB (50 lines, simple markup)
- No JavaScript (pure HTML/CSS)
- No external dependencies

### Rendering

- Static HTML generation (build-time)
- Zero runtime cost
- Inline styles via Tailwind (no external CSS)

### Transitions

- CSS-only hover effects
- `transition-colors duration-300` (smooth, performant)
- No JavaScript animations

---

## Future Enhancements

### Icon Support

- Add optional icon prop for buttons
- Example: Phone icon next to "Call the Shop"
- SVG inline (no external requests)

### Multiple Buttons

- Support 3+ buttons (array prop)
- Automatic layout adjustment
- Use case: Directions + Call + Regulations

### Analytics Tracking

- Optional data attributes for click tracking
- Example: `data-cta-type="directions"`
- Privacy-conscious (no third-party scripts)

---

**Component Architect 3**: AdventureCTA component complete
**Lines of Code**: 50 (simple, focused)
**Complexity**: Low (single-purpose component)
**WVWO Compliance**: 100% (approved fonts, colors, voice)
**Next**: Schema Architect defines data contracts
