# WVWO Strategic Pivot (December 2025)

## The Pivot
**FROM:** E-commerce storefront with cart/checkout
**TO:** Adventure Destination Hub with local shop visits

## Why We Pivoted

### 1. Kim's Fraud Concerns
Kim expressed concerns about online sales fraud/complexity. Quote from Matt:
> "no change lets disable cart for now only call and local pick up until we get kim on board"

### 2. Shipping Economics Make Heavy Items Impossible
Research validated this concern:
- **Kayak LTL freight**: $88-768 per shipment (NOT $50-300 initially estimated)
  - Base freight: $50-400
  - Residential surcharge: $16 average
  - Liftgate fee: $5-275
  - Fuel surcharge: ~30%
- **Margin reality**: 2-4.3% profit margins erased by shipping costs
- **Conclusion**: Online fulfillment of heavy outdoor gear is economically impossible

### 3. Competitive Advantage: Location
- **Address**: 121 WV-82, I-79 Exit 57 (38.5858, -80.8581)
- **The Corridor Void**: No dedicated outfitter between Summersville (19mi S) and Sutton (18mi N)
- **SEO opportunity**: "near I-79 Exit 57", "on the way to [destination]"

## New Revenue Model

```
Adventure Content (free)
    → SEO Traffic ("Gauley River fishing", "Snowshoe skiing")
    → "Stop by before you head out" CTAs
    → Local Shop Visits + Affiliate Revenue
```

### Revenue Streams
1. **Local sales**: Customers stop at shop before/after adventures
2. **Affiliate marketing**: Booking.com (25-40%), Hipcamp (5-10%), RVshare (6-8%)
3. **License sales**: WVDNR hunting/fishing license agent

## Feature Flag Implementation

```env
PUBLIC_COMMERCE_ENABLED=false
```

### What This Controls
- Cart icon hidden in header (desktop + mobile)
- CartDrawer component not rendered
- Checkout page returns 307 redirect
- "Add to Cart" becomes "Call to Order" (three-state button)
- Firearms ALWAYS require local pickup (FFL compliance)

### Files Modified
- `.env.example` - flag definition
- `checkout.astro` - 307 redirect guard
- `Layout.astro` - conditional CartDrawer
- `Header.astro` - conditional cart icon
- `[product].astro` - three-state CTA button

## When Commerce Returns
Flag can be re-enabled when:
1. Kim is comfortable with online transactions
2. Payment processor selected (Tactical Payments for 2A compliance)
3. Shipping strategy defined (BOPIS only for heavy items)
4. Legal review completed (see PAYMENT_REVIEW_CHECKLIST.md)
