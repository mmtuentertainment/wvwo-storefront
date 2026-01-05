# SPEC-04: 2A Payment Integration

**Phase:** 3C - E-Commerce Foundation
**Status:** SPECIFICATION
**Dependencies:** SPEC-03 (Checkout Flow)

---

## Overview

Payment processing for FFL dealers requires specialized "2A-compliant" processors. **Stripe, PayPal, and Square explicitly prohibit firearm and ammunition transactions.**

This spec covers processor selection, integration approach, and compliance requirements.

---

## Why Not Stripe/PayPal/Square?

| Processor | Policy |
|-----------|--------|
| **Stripe** | Prohibited: "firearms, firearm parts or hardware, ammunition" |
| **PayPal** | Prohibited: "firearms, ammunition, or certain firearm parts" |
| **Square** | Prohibited: "weapons and weapons accessories" |
| **Shopify Payments** | Prohibited: "firearms or firearm accessories" |

**Source:** Each processor's Acceptable Use Policy (2024-2025)

**Risk:** Using prohibited processors leads to:

- Frozen funds
- Account termination without warning
- Held reserves (up to 6 months)

---

## Recommended 2A-Compliant Processors

### Tier 1: Purpose-Built for FFLs

| Processor | Pros | Cons | Pricing |
|-----------|------|------|---------|
| **[Tactical Payments](https://www.tacticalpay.com/)** | 18+ years, 5,000+ FFLs, GunBroker integration | Longer approval process | ~2.75% + $0.25 |
| **[Orchid Pay](https://orchidadvisors.com/firearm-payment-processing/)** | Fast approvals, compliance expertise | Newer entrant | ~2.9% + $0.30 |
| **[Blue Payment Agency](https://bluepaymentagency.com/)** | NFA/SOT friendly, ammo OK | Smaller company | ~2.5% + $0.20 |

### Tier 2: Gateway with FFL-Friendly Processor

| Gateway | Notes |
|---------|-------|
| **Authorize.net** | Works with FFL-friendly merchant account providers. Not gun-friendly by itself - depends on underlying processor. |
| **NMI** | Popular with high-risk merchants, integrates with many processors. |

**Important:** Authorize.net alone is NOT gun-friendly. Must be paired with FFL-friendly merchant account from providers like:

- Payment Cloud
- Durango Merchant Services
- Host Merchant Services

---

## Recommended Approach: Tactical Payments

Based on research, **Tactical Payments** is recommended for WVWO:

### Why Tactical Payments?

1. **18+ years** serving FFL dealers exclusively
2. **5,000+ firearms businesses** - proven track record
3. **GunBroker integration** - important for future growth
4. **ACH + Credit Card** - lower fees for ACH
5. **Mobile/countertop options** - Kim can use in-store too

### Integration Options

1. **Hosted Payment Page** (Recommended for MVP)
   - Redirect to Tactical's secure payment page
   - PCI DSS compliance handled by processor
   - Simplest integration, fastest time to market

2. **Embedded Form (iFrame)**
   - Payment form embedded in checkout page
   - Still PCI compliant (form hosted by processor)
   - Better UX, more seamless

3. **Direct API** (Future)
   - Full control over payment UX
   - Requires PCI DSS SAQ A-EP compliance
   - More development effort

---

## Integration Architecture

### Hosted Payment Page Flow

```text

┌─────────────┐      ┌─────────────────────┐      ┌──────────────┐
│   Checkout  │──────│  Tactical Payments  │──────│   Confirm    │
│    Page     │      │   Hosted Page       │      │    Page      │
└─────────────┘      └─────────────────────┘      └──────────────┘
       │                      │                          │
       │  1. Redirect with    │                          │
       │     order details    │                          │
       │─────────────────────>│                          │
       │                      │                          │
       │                      │  2. Customer enters      │
       │                      │     payment info         │
       │                      │                          │
       │                      │  3. Process payment      │
       │                      │                          │
       │                      │  4. Redirect back        │
       │                      │─────────────────────────>│
       │                      │     with token/status    │
       │                      │                          │
       │                      │                          │  5. Verify payment
       │                      │                          │     via webhook/API

```text

### Data Flow

```typescript
// 1. Create payment request
const paymentRequest = {
  orderId: 'WVWO-2024-001234',
  amount: 12747,  // $127.47 in cents
  currency: 'USD',
  customer: {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    phone: '3045551234'
  },
  items: [
    { sku: 'FISH-BPB-CHART', name: 'PowerBait Chartreuse', qty: 2, price: 699 },
    { sku: 'GUN-WIN-SXP-12', name: 'Winchester SXP (Reserve)', qty: 1, price: 34999 }
  ],
  returnUrl: 'https://wvwildoutdoors.com/order-confirmation',
  cancelUrl: 'https://wvwildoutdoors.com/checkout',
  webhookUrl: 'https://wvwildoutdoors.com/api/payment-webhook'
};

// 2. Redirect to payment page
window.location.href = `https://pay.tacticalpay.com/checkout?token=${paymentToken}`;

// 3. Handle return
// URL: /order-confirmation?payment_id=xxx&status=success
const { payment_id, status } = useSearchParams();
if (status === 'success') {
  // Verify with API, show confirmation
}

```text

---

## Webhook Handling

### Webhook Events

| Event | Action |
|-------|--------|
| `payment.completed` | Mark order as paid, send confirmation email |
| `payment.failed` | Log failure, notify customer to retry |
| `payment.refunded` | Mark order as refunded, update inventory |
| `payment.disputed` | Flag for manual review |

### Webhook Endpoint

Since WVWO is a static site (Cloudflare Pages), webhook handling options:

1. **Cloudflare Workers** (Recommended)
   - Serverless function at `/api/payment-webhook`
   - Store order in KV or D1
   - Trigger email via SendGrid/Buttondown API

2. **Web3Forms + Zapier**
   - Less ideal for payment webhooks
   - Works for order notifications

3. **External Service**
   - Use a service like Pipedream or Make.com
   - Forward webhook to email/Airtable

---

## Payment Form UI

### Hosted Page Customization

Most 2A processors allow branding:

```text

┌─────────────────────────────────────────────┐
│  [WVWO Logo]                                │
│                                             │
│  Complete Your Payment                      │
│  Order #WVWO-2024-001234                   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Card Number                          │   │
│  │ [4242 4242 4242 4242            ]   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌────────────────┐ ┌──────────────────┐   │
│  │ Expiry         │ │ CVV              │   │
│  │ [MM/YY     ]   │ │ [123       ]     │   │
│  └────────────────┘ └──────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Billing ZIP                          │   │
│  │ [26610                          ]   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│         [ Pay $127.47 ]                     │
│                                             │
│  🔒 Secure payment by Tactical Payments    │
└─────────────────────────────────────────────┘

```text

### Trust Signals

Display before redirect:

```tsx
<div className="flex items-center gap-4 text-sm text-brand-mud">
  <div className="flex items-center gap-1">
    <Lock className="w-4 h-4" />
    <span>Secure checkout</span>
  </div>
  <div className="flex items-center gap-1">
    <Shield className="w-4 h-4" />
    <span>PCI compliant</span>
  </div>
  <div className="flex items-center gap-1">
    <CreditCard className="w-4 h-4" />
    <span>Visa, MC, Amex</span>
  </div>
</div>

<p className="text-sm text-brand-mud/80 mt-2">
  You'll be redirected to our secure payment processor.
</p>

```text

---

## PCI DSS Compliance

### Compliance Level for WVWO

| Method | SAQ Level | Effort | Risk |
|--------|-----------|--------|------|
| Hosted Payment Page | SAQ A | Low | Lowest |
| iFrame Embed | SAQ A | Low | Low |
| Direct API | SAQ A-EP | High | Medium |

**Recommendation:** Use hosted payment page (SAQ A) for MVP.

### Requirements for SAQ A

1. No card data touches WVWO servers
2. Payment page hosted entirely by processor
3. Use only redirect or iFrame
4. Annual self-assessment questionnaire

---

## Refunds & Disputes

### Refund Flow

```text

Customer Request → Kim Reviews → Initiate Refund → Processor Refunds → Order Updated

```text

### Refund Scenarios

| Scenario | Policy |
|----------|--------|
| Order cancelled before ship | Full refund |
| Item returned (shippable) | Full refund minus restocking if opened |
| Firearm reserve cancelled | Full refund (item never transferred) |
| Firearm - failed background check | Full refund (federal law) |
| Dispute/chargeback | Review case, provide documentation |

### Refund API Call

```typescript
async function processRefund(orderId: string, amount?: number) {
  const response = await fetch('https://api.tacticalpay.com/v1/refunds', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TACTICAL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      payment_id: order.paymentId,
      amount: amount || order.total,  // Partial or full
      reason: 'customer_request'
    })
  });

  return response.json();
}

```text

---

## Error Handling

### Payment Errors

| Error | User Message |
|-------|--------------|
| Card declined | "Card was declined. Want to try a different card?" |
| Insufficient funds | "Card was declined. Want to try a different card?" |
| Expired card | "That card appears to be expired." |
| Invalid CVV | "CVV doesn't match. Mind double-checking?" |
| Processor error | "Something went wrong. Give us a call and we'll sort it out." |
| Network timeout | "Connection timed out. Please try again." |

### Error Display

```tsx
{paymentError && (
  <Alert variant="destructive">
    <AlertCircle className="w-5 h-5" />
    <AlertTitle>Payment Issue</AlertTitle>
    <AlertDescription>
      {paymentError.message}
    </AlertDescription>
  </Alert>
)}

```text

---

## Security Considerations

1. **Never log full card numbers** - mask all but last 4
2. **Use HTTPS everywhere** - Cloudflare handles this
3. **Verify webhook signatures** - processor provides signing key
4. **Rate limit payment attempts** - prevent card testing
5. **Fraud screening** - processor typically handles AVS/CVV checks

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

- [ ] Successful payment flow (redirect → pay → return)
- [ ] Payment failure handling
- [ ] Webhook receives and processes events
- [ ] Refund flow works
- [ ] Order confirmation shows correct payment status
- [ ] Error messages are user-friendly
- [ ] Mobile payment flow works
- [ ] Trust signals display correctly
- [ ] PCI SAQ A requirements documented
