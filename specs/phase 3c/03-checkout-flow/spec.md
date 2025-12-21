# SPEC-03: Checkout Flow

**Phase:** 3C - E-Commerce Foundation
**Status:** ✅ IMPLEMENTED (PR #40 + PR #42 merged)
**Dependencies:** SPEC-01 (Product Model), SPEC-02 (Cart System)

---

## Overview

Guest checkout process supporting all three product tiers with appropriate fulfillment options, form validation, and Kim's authentic voice throughout.

---

## Checkout Flow by Cart Contents

### Flow A: Shippable Items Only

```text

Cart → Contact Info → Shipping Address → Payment → Confirmation

```text

### Flow B: Pickup Only (Ammo or Mixed)

```text

Cart → Contact Info → Pickup Confirmation → Payment → Confirmation

```text

### Flow C: Firearms (Reserve & Hold)

```text

Cart → Contact Info → Reserve Agreement → Payment → Confirmation
                                ↓
                    (In-Store: 4473 + NICS → Pickup)

```text

---

## Page Structure

### URL: `/checkout`

Single-page checkout with collapsible sections:

```text

┌─────────────────────────────────────────────┐
│ Checkout                                     │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ 1. Contact Information          [Edit]  │ │
│ │    Name, Email, Phone                   │ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ 2. Fulfillment                  [Edit]  │ │
│ │    ○ Ship to Address                    │ │
│ │    ● Pick Up in Store                   │ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ 3. Payment                      [Edit]  │ │
│ │    Card ending in 4242                  │ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ Order Summary                           │ │
│ │    3 items · $127.47                    │ │
│ │    [Review Order]                       │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│         [ Place Order - $127.47 ]           │
└─────────────────────────────────────────────┘

```text

---

## Section 1: Contact Information

### Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| First Name | text | Yes | 2-50 chars |
| Last Name | text | Yes | 2-50 chars |
| Email | email | Yes | Valid email format |
| Phone | tel | Yes | Valid US phone |

### Form Markup

```tsx
<div className="space-y-4">
  <div className="grid grid-cols-2 gap-4">
    <div>
      <Label htmlFor="firstName">First Name *</Label>
      <Input
        id="firstName"
        placeholder="Kim"
        {...register('firstName', { required: true, minLength: 2 })}
      />
      {errors.firstName && (
        <p className="text-sm text-red-600 mt-1">
          We need your first name to process your order.
        </p>
      )}
    </div>
    <div>
      <Label htmlFor="lastName">Last Name *</Label>
      <Input
        id="lastName"
        placeholder="Smith"
        {...register('lastName', { required: true, minLength: 2 })}
      />
    </div>
  </div>

  <div>
    <Label htmlFor="email">Email *</Label>
    <Input
      id="email"
      type="email"
      placeholder="kim@example.com"
      {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
    />
    <p className="text-sm text-brand-mud/60 mt-1">
      We'll send your order confirmation here.
    </p>
  </div>

  <div>
    <Label htmlFor="phone">Phone *</Label>
    <Input
      id="phone"
      type="tel"
      placeholder="(304) 555-1234"
      {...register('phone', { required: true })}
    />
    <p className="text-sm text-brand-mud/60 mt-1">
      We'll call when your order is ready for pickup.
    </p>
  </div>
</div>

```text

---

## Section 2: Fulfillment

### Conditional Display

```tsx
{cart.fulfillmentOptions.includes('ship') && cart.fulfillmentOptions.includes('pickup') && (
  // Show radio choice
  <RadioGroup value={fulfillment} onValueChange={setFulfillment}>
    <div className="flex items-start gap-3 p-4 border rounded-sm">
      <RadioGroupItem value="ship" id="ship" />
      <Label htmlFor="ship" className="flex-1">
        <span className="font-bold">Ship to Address</span>
        <span className="block text-sm text-brand-mud">
          Standard shipping: 3-7 business days
        </span>
      </Label>
    </div>
    <div className="flex items-start gap-3 p-4 border rounded-sm">
      <RadioGroupItem value="pickup" id="pickup" />
      <Label htmlFor="pickup" className="flex-1">
        <span className="font-bold">Pick Up in Store</span>
        <span className="block text-sm text-brand-mud">
          Usually ready same day
        </span>
      </Label>
    </div>
  </RadioGroup>
)}

{cart.hasPickupOnlyItems && !cart.fulfillmentOptions.includes('ship') && (
  // Pickup only notice
  <Alert className="bg-brand-cream border-sign-green">
    <Store className="w-5 h-5" />
    <AlertTitle>In-Store Pickup</AlertTitle>
    <AlertDescription>
      {cart.hasFirearms
        ? "Firearms require in-store pickup with background check."
        : "Some items in your cart are pickup only."}
    </AlertDescription>
  </Alert>
)}

```text

### Shipping Address (if ship selected)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Street Address | text | Yes | 5-100 chars |
| Apt/Suite | text | No | 0-50 chars |
| City | text | Yes | 2-50 chars |
| State | select | Yes | US states |
| ZIP Code | text | Yes | 5-digit US ZIP |

### Pickup Location Display

```tsx
<div className="p-4 bg-brand-cream rounded-sm">
  <h4 className="font-display font-bold text-brand-brown">
    WV Wild Outdoors
  </h4>
  <p className="text-brand-mud">
    121 WV-82 (Birch River Rd)<br />
    Birch River, WV 26610
  </p>
  <p className="text-sm text-brand-mud mt-2">
    <strong>Hours:</strong> Mon-Sat 10am-5pm
  </p>
  <a
    href={SITE_CONTACT.mapsUrl}
    target="_blank"
    className="text-sign-green hover:underline text-sm mt-2 inline-block"
  >
    Get Directions →
  </a>
</div>

```text

---

## Section 3: Firearms Reserve Agreement

**Only displayed when cart contains firearms (`reserve_hold` items)**

```tsx
<div className="p-4 bg-brand-cream border-l-4 border-brand-orange rounded-sm">
  <h4 className="font-display font-bold text-brand-brown mb-2">
    Firearm Reserve Agreement
  </h4>

  <div className="space-y-3 text-sm text-brand-mud">
    <p>By placing this order, you understand:</p>

    <ul className="list-disc pl-5 space-y-2">
      <li>
        <strong>Payment holds the firearm(s)</strong> for pickup at our store.
      </li>
      <li>
        <strong>Background check required.</strong> You must complete ATF Form 4473
        and pass NICS background check before taking possession.
      </li>
      <li>
        <strong>Valid ID required.</strong> Bring government-issued photo ID
        (WV Driver's License or ID preferred).
      </li>
      <li>
        <strong>Age requirements.</strong> Must be 21+ for handguns, 18+ for long guns.
      </li>
      <li>
        <strong>Pickup window.</strong> Reserved items held for 7 days.
        After 7 days, we'll contact you to confirm or refund.
      </li>
    </ul>

    <div className="flex items-start gap-2 mt-4">
      <Checkbox
        id="reserveAgree"
        {...register('reserveAgree', { required: cart.hasFirearms })}
      />
      <Label htmlFor="reserveAgree" className="text-sm">
        I understand and agree to the firearm reserve terms above.
      </Label>
    </div>
    {errors.reserveAgree && (
      <p className="text-sm text-red-600">
        Please confirm you understand the reserve terms.
      </p>
    )}
  </div>
</div>

```text

---

## Section 4: Payment

See [SPEC-04: 2A Payment Integration](SPEC-04-2a-payment-integration.md) for payment form details.

```tsx
<div className="space-y-4">
  <PaymentForm
    amount={cart.total}
    onSuccess={handlePaymentSuccess}
    onError={handlePaymentError}
  />

  <div className="flex items-center gap-2 text-sm text-brand-mud">
    <Lock className="w-4 h-4" />
    <span>Secure payment processing</span>
  </div>
</div>

```text

---

## Order Summary

```tsx
<div className="bg-white border border-brand-mud/20 rounded-sm p-4">
  <h3 className="font-display font-bold text-brand-brown mb-4">
    Order Summary
  </h3>

  {/* Item list */}
  <div className="space-y-3 pb-4 border-b border-brand-mud/10">
    {cart.items.map(item => (
      <div key={item.productId} className="flex justify-between text-sm">
        <span>
          {item.shortName} × {item.quantity}
          {item.fulfillmentType === 'reserve_hold' && (
            <Badge variant="ffl" size="sm" className="ml-2">Reserved</Badge>
          )}
        </span>
        <span>{formatPrice(item.price * item.quantity)}</span>
      </div>
    ))}
  </div>

  {/* Totals */}
  <div className="space-y-2 py-4">
    <div className="flex justify-between text-sm">
      <span>Subtotal</span>
      <span>{formatPrice(cart.subtotal)}</span>
    </div>

    {fulfillment === 'ship' && (
      <div className="flex justify-between text-sm">
        <span>Shipping</span>
        <span>{shippingCost ? formatPrice(shippingCost) : 'Calculated at next step'}</span>
      </div>
    )}

    <div className="flex justify-between text-sm">
      <span>Tax</span>
      <span>{formatPrice(cart.tax)}</span>
    </div>
  </div>

  <div className="flex justify-between font-display font-bold text-lg pt-4 border-t border-brand-mud/10">
    <span>Total</span>
    <span>{formatPrice(cart.total)}</span>
  </div>
</div>

```text

---

## Error Messages (Kim's Voice)

| Error | Message |
|-------|---------|
| Missing first name | "We need your first name to process your order." |
| Missing email | "We'll need your email to send the confirmation." |
| Invalid email | "That email doesn't look quite right. Mind checking it?" |
| Missing phone | "We'll need your phone number to call when it's ready." |
| Missing address | "Where should we ship this?" |
| Invalid ZIP | "That ZIP code doesn't look right. Should be 5 digits." |
| Reserve not checked | "Please confirm you understand the firearm reserve terms." |
| Payment failed | "Payment didn't go through. Want to try a different card?" |

---

## Success Flow

### Order Confirmation Page (`/order-confirmation`)

```tsx
<div className="max-w-2xl mx-auto text-center py-12">
  <div className="w-16 h-16 bg-sign-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
    <Check className="w-8 h-8 text-sign-green" />
  </div>

  <h1 className="font-display font-black text-3xl text-brand-brown mb-2">
    Order Confirmed!
  </h1>
  <p className="text-xl text-brand-mud mb-6">
    Order #{order.number}
  </p>

  {order.hasFirearms ? (
    <div className="bg-brand-cream p-6 rounded-sm text-left mb-8">
      <h2 className="font-display font-bold text-brand-brown mb-3">
        What's Next: Firearm Pickup
      </h2>
      <ol className="list-decimal pl-5 space-y-2 text-brand-mud">
        <li>We'll call you at {order.phone} when your firearm is ready.</li>
        <li>Bring your valid photo ID (WV Driver's License preferred).</li>
        <li>Complete ATF Form 4473 at the counter.</li>
        <li>Pass NICS background check.</li>
        <li>Take home your firearm!</li>
      </ol>
      <p className="text-sm text-brand-mud/80 mt-4">
        Most pickups take about 15-20 minutes. Call us if you have questions.
      </p>
    </div>
  ) : order.fulfillment === 'pickup' ? (
    <div className="bg-brand-cream p-6 rounded-sm text-left mb-8">
      <h2 className="font-display font-bold text-brand-brown mb-3">
        Ready for Pickup
      </h2>
      <p className="text-brand-mud mb-4">
        We'll call you at {order.phone} when your order is ready.
        Usually same day!
      </p>
      <div className="text-sm text-brand-mud">
        <strong>WV Wild Outdoors</strong><br />
        121 WV-82 (Birch River Rd)<br />
        Birch River, WV 26610<br />
        Mon-Sat 10am-5pm
      </div>
    </div>
  ) : (
    <div className="bg-brand-cream p-6 rounded-sm text-left mb-8">
      <h2 className="font-display font-bold text-brand-brown mb-3">
        Shipping Information
      </h2>
      <p className="text-brand-mud mb-4">
        Your order is being prepared and will ship within 1-2 business days.
        We'll email tracking info to {order.email}.
      </p>
      <div className="text-sm text-brand-mud">
        <strong>Shipping to:</strong><br />
        {order.shippingAddress.street}<br />
        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
      </div>
    </div>
  )}

  <p className="text-brand-mud mb-6">
    Confirmation email sent to <strong>{order.email}</strong>
  </p>

  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <Button variant="cta" asChild>
      <a href="/shop">Continue Shopping</a>
    </Button>
    <Button variant="outline" asChild>
      <a href={`tel:${SITE_CONTACT.phone}`}>
        Questions? Call Us
      </a>
    </Button>
  </div>

  <p className="text-sm text-brand-mud/60 mt-8">
    Grand love ya! Thanks for shopping local.
  </p>
</div>

```text

---

## Mobile Optimization

- **Sticky order summary** on desktop, collapsed on mobile
- **Large touch targets** (44px minimum)
- **Numeric keyboard** for phone/ZIP inputs
- **Auto-scroll** to errors on validation failure
- **Progress indicator** at top (optional)

---

## Aesthetic Compliance

Per CLAUDE.md WVWO Frontend Aesthetics:
- All `rounded-*` classes → `rounded-sm`
- All headings → `font-display font-bold`
- Button variants: `wvwo` (brown), `cta` (green), `blaze` (orange)
- Badge variants: `stock` (green), `ffl` (brown), `blaze` (orange)
- Form inputs: `ring-sign-green` on focus, `border-brand-mud/30`
- Shadows: Use harder shadows per shadcn-wvwo.css

---

## Testing Checklist

- [ ] Complete checkout with shippable items only
- [ ] Complete checkout with pickup only items
- [ ] Complete checkout with firearms (reserve agreement)
- [ ] Validation errors display correctly
- [ ] Kim's voice in all error messages
- [ ] Order confirmation page displays correctly
- [ ] Email confirmation sent
- [ ] Mobile checkout is usable
- [ ] Form persists on browser back
- [ ] Payment failure shows retry option
