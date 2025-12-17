# SPEC-07: FFL Compliance

**Phase:** 3C - E-Commerce Foundation
**Status:** SPECIFICATION
**Dependencies:** SPEC-01 (Product Model), SPEC-03 (Checkout)

---

## Overview

Federal and state compliance requirements for selling firearms online with local pickup. This spec covers the "Reserve & Hold" model where customers pay online and pick up in-store after completing ATF Form 4473 and NICS background check.

**Important:** This spec is for **LOCAL SALES ONLY**. Interstate FFL transfers (shipping to customer's FFL) are OUT OF SCOPE for Phase 3C.

---

## Reserve & Hold Model

### Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Browse    │───▶│   Reserve   │───▶│    Pay      │───▶│  Confirmed  │
│   Firearm   │    │   Online    │    │   Online    │    │  (Held)     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                                │
                                                                ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Pickup    │◀───│    NICS     │◀───│   4473      │◀───│  In-Store   │
│  Complete   │    │  Approved   │    │  Completed  │    │   Arrive    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### Why Reserve & Hold?

1. **No FFL-to-FFL shipping** - Simpler, no transfer paperwork
2. **Customer commitment** - Payment secures the firearm
3. **Compliance in-person** - 4473 and NICS done face-to-face (standard process)
4. **Kim keeps control** - Firearms never leave until background check passes

---

## Age Requirements

| Firearm Type | Minimum Age | Federal Law |
|--------------|-------------|-------------|
| Long guns (rifles, shotguns) | 18 | 18 U.S.C. § 922(b)(1) |
| Handguns | 21 | 18 U.S.C. § 922(b)(1) |
| Ammunition (handgun) | 21 | 18 U.S.C. § 922(b)(1) |
| Ammunition (rifle/shotgun) | 18 | 18 U.S.C. § 922(b)(1) |

### Product Schema

```json
{
  "id": "ruger-1022-carbine",
  "ageRestriction": 18,
  "firearmType": "long_gun"
}

{
  "id": "glock-19-gen5",
  "ageRestriction": 21,
  "firearmType": "handgun"
}
```

### Age Verification Display

```tsx
{product.ageRestriction && (
  <Alert className="bg-brand-cream border-brand-orange">
    <AlertTriangle className="w-5 h-5 text-brand-orange" />
    <AlertDescription>
      Must be {product.ageRestriction}+ to purchase.
      Valid ID required at pickup.
    </AlertDescription>
  </Alert>
)}
```

---

## ATF Form 4473

### What It Is

ATF Form 4473 (Firearms Transaction Record) is the federal form required for **every** firearm transfer from an FFL to a non-licensee. The customer completes it in-store.

### Form Sections

1. **Section A** - Transferee/Buyer information (customer fills out)
2. **Section B** - Transferor/Seller information (Kim fills out)
3. **Section C** - NICS check record
4. **Section D** - Firearm description

### Key Questions (Customer Must Answer)

- Are you the actual transferee/buyer?
- Are you under indictment for a felony?
- Have you been convicted of a felony?
- Are you a fugitive from justice?
- Are you an unlawful user of controlled substances?
- Have you been adjudicated mentally defective?
- Have you been dishonorably discharged?
- Are you subject to a restraining order?
- Have you been convicted of domestic violence?
- Are you an illegal alien?
- Have you renounced US citizenship?

**Any "yes" to prohibiting questions = NO TRANSFER**

### ID Requirements

Customer must provide:

- **Government-issued photo ID** showing:
  - Name
  - Date of birth
  - Current address
  - Photo

- **Acceptable IDs:**
  - WV Driver's License (preferred)
  - WV State ID
  - US Passport + proof of WV residency
  - Military ID + proof of WV residency

- **Proof of Residency** (if address differs from ID):
  - Utility bill (within 3 months)
  - Bank statement
  - Voter registration card
  - Vehicle registration

---

## NICS Background Check

### What It Is

National Instant Criminal Background Check System (NICS) - FBI database check required before firearm transfer.

### Process

1. Kim calls NICS (1-877-324-6427) or uses FBI NICS E-Check
2. Provides customer information from 4473
3. Receives one of three responses:
   - **PROCEED** - Transfer approved
   - **DELAYED** - More research needed (up to 3 business days)
   - **DENIED** - Cannot transfer

### Response Handling

| Response | Action | Timeframe |
|----------|--------|-----------|
| **PROCEED** | Complete transfer immediately | Instant |
| **DELAYED** | Hold firearm, wait for response | Up to 3 business days |
| **DENIED** | Cannot transfer, initiate refund | Immediate |

### Delayed Transfers

If NICS returns DELAYED:

1. Kim holds the firearm
2. Customer is notified (call + email)
3. If no response in **3 business days**, Kim MAY proceed (optional - many FFLs wait for explicit PROCEED)
4. If DENIED after delay, refund customer

### Denied Transfers

If NICS returns DENIED:

1. **Cannot complete transfer** - federal law
2. Customer may appeal to FBI
3. **Full refund** initiated within 24 hours
4. Firearm returns to inventory

```tsx
// Denied email template
Subject: Important Update - Order #WVWO-2024-001234

Hey [FirstName],

We're sorry, but the background check for your firearm order
came back denied. By federal law, we cannot complete this transfer.

We're processing a full refund of [Amount] to your original
payment method. You should see it within 3-5 business days.

If you believe this is an error, you can appeal directly to the FBI:
https://www.fbi.gov/services/cjis/nics/nics-appeals-vaf

Questions? Give us a call at (304) 649-2607.

Kim & Bryan
WV Wild Outdoors
```

---

## Firearm Reservation Agreement

Displayed during checkout for all firearm orders:

```markdown
## Firearm Reserve Agreement

By placing this order, you understand and agree:

1. **Payment reserves the firearm(s)** for pickup at our store.
   The firearm remains our property until transfer is complete.

2. **Background check required.** You must complete ATF Form 4473
   and pass NICS background check before taking possession.

3. **Valid ID required.** Bring government-issued photo ID with
   current address (WV Driver's License preferred).

4. **Age requirements apply.**
   - Long guns (rifles/shotguns): Must be 18+
   - Handguns: Must be 21+

5. **Pickup window.** Reserved items held for 7 calendar days.
   After 7 days, we'll contact you to confirm or process refund.

6. **Denied background check.** If NICS denies the transfer,
   we'll issue a full refund within 24 hours.

7. **No transfer to third parties.** The person who paid must
   be the person who picks up. No exceptions (straw purchases
   are a federal felony).

[ ] I understand and agree to these terms.
```

---

## Record Keeping

### ATF Requirements

Kim must maintain:

1. **ATF Form 4473** - Keep for **20 years** minimum
2. **Acquisition & Disposition (A&D) Book** - Permanent record of all firearms
3. **NICS transaction numbers** - Record on 4473

### Digital Records (Kim's Reference)

Order system should track:

```typescript
interface FirearmOrder {
  orderId: string;
  firearmSku: string;
  serialNumber?: string;        // Added when specific firearm assigned
  customerName: string;
  reservedAt: string;
  pickupDeadline: string;       // reservedAt + 7 days

  // Status tracking
  status: FirearmStatus;
  statusHistory: {
    status: FirearmStatus;
    timestamp: string;
    note?: string;
  }[];

  // 4473 tracking
  form4473CompletedAt?: string;

  // NICS tracking
  nicsCallDate?: string;
  nicsTransactionNumber?: string;
  nicsResponse?: 'proceed' | 'delayed' | 'denied';
  nicsResolvedAt?: string;

  // Transfer
  transferCompletedAt?: string;
}

type FirearmStatus =
  | 'reserved'           // Payment received, awaiting pickup
  | 'ready_for_pickup'   // Kim has assigned specific firearm
  | '4473_pending'       // Customer in store, filling form
  | '4473_completed'     // Form complete, running NICS
  | 'nics_pending'       // Waiting for NICS response
  | 'nics_delayed'       // NICS returned DELAYED
  | 'nics_approved'      // NICS returned PROCEED
  | 'nics_denied'        // NICS returned DENIED
  | 'transferred'        // Customer took possession
  | 'refunded';          // Order cancelled/denied, refunded
```

---

## West Virginia Specific

### State Laws

- **No state permit required** to purchase firearms
- **No waiting period** (federal NICS only)
- **No assault weapons ban**
- **No magazine capacity restrictions**
- **Constitutional carry** (no permit for concealed carry, 21+)

### Residency

- WV residents can purchase any firearm type
- Out-of-state residents from **contiguous states** (OH, PA, MD, VA, KY) can purchase long guns
- Out-of-state residents **cannot** purchase handguns (must transfer to their home state FFL)

```tsx
// Checkout validation
if (product.firearmType === 'handgun' && customer.state !== 'WV') {
  showError('Handgun purchases require WV residency. Out-of-state customers can have handguns transferred to an FFL in their home state (contact us for details).');
}
```

---

## UI Components

### Product Page - Firearm

```tsx
<div className="space-y-4">
  <h1 className="font-display font-black text-3xl">{product.name}</h1>
  <p className="text-xl text-sign-green font-bold">{product.priceDisplay}</p>

  {/* FFL Badge */}
  <Badge variant="ffl">Licensed FFL Dealer</Badge>

  {/* Age requirement */}
  <Alert className="bg-brand-cream">
    <Info className="w-5 h-5" />
    <AlertDescription>
      Must be {product.ageRestriction}+ with valid ID.
      Background check required at pickup.
    </AlertDescription>
  </Alert>

  {/* Reserve button */}
  <Button
    variant="wvwo"
    size="lg"
    onClick={() => addToCart(product)}
    className="w-full"
  >
    Reserve This Firearm
  </Button>

  <p className="text-sm text-brand-mud">
    Pay now to hold. Pick up at our store in Birch River
    after completing background check.
  </p>

  {/* Process explainer */}
  <div className="border-t border-brand-mud/20 pt-4 mt-4">
    <h3 className="font-bold text-brand-brown mb-2">How It Works</h3>
    <ol className="list-decimal pl-5 text-sm text-brand-mud space-y-1">
      <li>Reserve online with payment</li>
      <li>We hold the firearm for you (7 days)</li>
      <li>Come to the store with valid ID</li>
      <li>Complete ATF Form 4473</li>
      <li>Pass background check</li>
      <li>Take home your firearm!</li>
    </ol>
  </div>
</div>
```

### Order Confirmation - Firearm

```tsx
<div className="bg-brand-cream p-6 rounded-sm">
  <h2 className="font-display font-bold text-xl text-brand-brown mb-4">
    Firearm Pickup Instructions
  </h2>

  <div className="space-y-4 text-brand-mud">
    <p>
      Your <strong>{firearmName}</strong> is reserved and waiting at our store.
    </p>

    <div className="bg-white p-4 rounded-sm">
      <h3 className="font-bold mb-2">When You Arrive:</h3>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Bring valid government photo ID (WV Driver's License preferred)</li>
        <li>Complete ATF Form 4473 at the counter</li>
        <li>We run NICS background check (usually instant)</li>
        <li>If approved, you take home your firearm!</li>
      </ol>
    </div>

    <div className="bg-white p-4 rounded-sm">
      <h3 className="font-bold mb-2">Location & Hours:</h3>
      <p>WV Wild Outdoors</p>
      <p>121 WV-82 (Birch River Rd)</p>
      <p>Birch River, WV 26610</p>
      <p className="mt-2">Mon-Sat 10am-5pm</p>
    </div>

    <p className="text-sm text-brand-mud/80">
      <strong>Note:</strong> Reserved items held for 7 days.
      Most pickups take 15-20 minutes.
    </p>
  </div>
</div>
```

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

- [ ] Firearm products show Reserve button (not Add to Cart)
- [ ] Age restriction displays correctly
- [ ] Reserve agreement checkbox required at checkout
- [ ] Firearm orders marked correctly in system
- [ ] Confirmation shows pickup instructions
- [ ] Kim can update firearm status (4473, NICS)
- [ ] NICS denied triggers refund flow
- [ ] Out-of-state handgun purchase blocked
- [ ] 7-day reservation window tracked
