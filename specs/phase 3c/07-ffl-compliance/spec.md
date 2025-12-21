# SPEC-07: FFL Compliance

**Phase:** 3C - E-Commerce Foundation
**Status:** SPECIFICATION (Updated 2024-12-17 - Audit Additions)
**Dependencies:** SPEC-01 (Product Model), SPEC-03 (Checkout)
**Audit:** 5-Agent Hive Mind Review - 7 Critical Additions

---

## Overview

Federal and state compliance requirements for selling firearms online with local pickup. This spec covers the "Reserve & Hold" model where customers pay online and pick up in-store after completing ATF Form 4473 and NICS background check.

**Important:** This spec is for **LOCAL SALES ONLY**. Interstate FFL transfers (shipping to customer's FFL) are OUT OF SCOPE for Phase 3C.

---

## Reserve & Hold Model

### Flow

```text

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

```text

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

```text

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

```text

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

```text

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

```text

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

```text

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

```text

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

```text

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

```text

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
- [ ] Straw purchase warning displayed prominently
- [ ] State validation blocks out-of-state handgun orders

---

## Audit Additions (2024-12-17)

The following sections were added based on a comprehensive 5-agent hive mind audit identifying 7 critical compliance gaps.

---

## Straw Purchase Prevention

**Risk Level:** HIGH - Federal Felony if violated
**ATF Authority:** 18 U.S.C. § 922(a)(6)

### Requirements

1. **Name Matching:** Customer name on order MUST match government ID at pickup
2. **Identity Verification:** Customer completing 4473 MUST be the person who placed/paid for order
3. **No Third-Party Pickup:** Absolutely forbidden, even with written authorization
4. **Red Flags Training:** Kim should document if customer exhibits straw purchase indicators:
   - Someone else waiting in car/outside
   - Customer asks if "friend can pick up"
   - Customer unsure of firearm details they ordered
   - Customer brings another person who tries to answer 4473 questions

### UI Implementation

Add prominent warning to FirearmAgreement.tsx:

```tsx
<Alert className="bg-red-50 border-2 border-red-600 mb-4">
  <AlertTriangle className="w-5 h-5 text-red-600" />
  <AlertTitle className="text-red-800 font-bold">
    Federal Law: No Third-Party Transfers
  </AlertTitle>
  <AlertDescription className="text-red-700">
    <strong>The person placing this order MUST be the person who picks up the firearm.</strong>
    {' '}Purchasing a firearm for another person (straw purchase) is a federal felony
    punishable by up to 10 years in prison. You must bring the ID matching the name
    on this order. No exceptions.
  </AlertDescription>
</Alert>

```text

---

## Out-of-State Handgun Validation

**Risk Level:** HIGH - Federal Violation
**ATF Authority:** 18 U.S.C. § 922(b)(3)

### Requirements

Handguns can ONLY be transferred to residents of the dealer's state (WV). Out-of-state residents MUST have handguns shipped to an FFL in their home state.

### Validation Logic

```typescript
// checkoutSchema.ts or orderUtils.ts
export function validateStateRestriction(
  customerState: string | undefined,
  hasHandguns: boolean
): { valid: boolean; error?: string } {
  // CRITICAL: Block out-of-state handgun purchases entirely
  if (hasHandguns && customerState && customerState !== 'WV') {
    return {
      valid: false,
      error: 'Handgun purchases require WV residency. Out-of-state customers can have handguns transferred to an FFL in their home state (contact us for details).',
    };
  }
  return { valid: true };
}

// Long guns: Allow contiguous states only
export function validateLongGunState(customerState: string): boolean {
  const contiguousStates = ['WV', 'OH', 'PA', 'MD', 'VA', 'KY'];
  return contiguousStates.includes(customerState);
}

```text

### Error Display

When blocked, show:

```text
"Handgun purchases require WV residency. Out-of-state customers can have handguns transferred to an FFL in their home state (contact us for details)."

```text

---

## Multiple Handgun Sales Reporting

**Risk Level:** MEDIUM - Federal Reporting Requirement
**ATF Authority:** 18 U.S.C. § 923(g)(3)

### Requirements

FFLs must report sales of 2+ handguns to the same person within 5 consecutive business days to ATF and local law enforcement.

### Trigger Conditions

- **2+ handguns** to same person within **5 consecutive business days**
- Includes semi-automatic pistols, revolvers (any handgun)
- Does NOT include rifles/shotguns

### Reporting Process

1. **Detection:** System alerts Kim when customer has 2+ handgun transfers in 5-day window
2. **Form 3310.4:** Kim completes ATF Form 3310.4 (Report of Multiple Sale)
3. **Submission:** Fax/mail to ATF within 24 hours of second transfer
4. **Local Notice:** Copy to WV State Police (if required by state)

### Implementation (Future - SPEC-05 Order Management)

```typescript
interface MultipleHandgunAlert {
  customerId: string;
  handgunCount: number;
  windowStart: Date;
  transferDates: Date[];
  formRequired: boolean;
  formSubmitted: boolean;
}

```text

---

## Ammunition Age Verification (Clarification)

**ATF Authority:** 18 U.S.C. § 922(b)(1), ATF Ruling 2011-5

### Age Rules by Ammunition Type

| Ammo Type | Minimum Age | Notes |
|-----------|-------------|-------|
| Handgun-only calibers (.45 ACP, 9mm, .40 S&W) | 21 | Strict |
| Rifle/shotgun-only calibers (.30-06, 12ga, .270) | 18 | Strict |
| **Dual-use calibers (.22 LR, .223/5.56, .30-30)** | **18 if for rifle** | Kim verifies intent |

### WVWO Policy (Conservative)

Mark ALL ammunition as `ageRestriction: 21` in product data to avoid compliance risk. Since WVWO does pickup-only, Kim can verify intent in-person if customer is 18-20.

```json
{
  "id": "federal-bulk-22lr",
  "ageRestriction": 21,
  "notes": "18+ allowed for rifle use - Kim verifies intent at pickup"
}

```text

---

## NICS Delayed Policy

**ATF Authority:** 18 U.S.C. § 922(t)(1)(B)(ii)

### Legal Background

If NICS does not respond within 3 business days, dealer MAY proceed with transfer (not required).

### WVWO Policy Decision Required

### Option A: Default Proceed (ATF Minimum)
- After 3 business days with no DENIED, transfer may proceed
- Risk: Transfer could later be flagged if NICS returns late DENIED

### Option B: Explicit Proceed Only (Conservative) - RECOMMENDED
- Wait for explicit PROCEED from NICS, even beyond 3 days
- Risk: None - customer waits longer, but zero compliance risk

### Customer Communication (Option B)

```text
"We've submitted your background check, but it's taking longer than usual.
We'll hold your firearm and contact you as soon as we receive approval.
This can take up to 10 business days. Thanks for your patience!"

```text

---

## Bound Book Integration

**ATF Authority:** 27 CFR § 478.125

### Required Fields for Firearm Dispositions

```typescript
interface FirearmDisposition {
  // ATF Bound Book columns
  dispositionDate: string;       // Date of transfer (NICS approval + pickup)
  firearmMake: string;
  firearmModel: string;
  firearmSerialNumber: string;
  firearmType: 'Rifle' | 'Shotgun' | 'Pistol' | 'Revolver' | 'Receiver';
  firearmCaliber: string;

  // Transferee (buyer)
  buyerName: string;             // Full name from 4473
  buyerAddress: string;          // Full address from 4473
  buyerDOB: string;
  buyerIdType: string;           // WV DL, State ID, etc.
  buyerIdNumber: string;
  buyerIdExpiration: string;

  // Background check
  nicsTransactionNumber: string;
  nicsDate: string;
  nicsResult: 'proceed' | 'delayed-proceed';

  // Form 4473
  form4473Location: string;      // Physical location of paper form
}

```text

### Kim's Workflow

1. Customer picks up firearm after NICS approval
2. Kim enters serial number (from specific firearm assigned)
3. Kim enters all 4473 data into bound book (paper or eZ-Check)
4. System stores digital reference (NOT a replacement for official bound book)

---

## Prohibited Persons Disclosure (Optional Enhancement)

**⚠️ Legal Review Required:** Before implementing this optional enhancement, consult with legal counsel. Some FFLs prefer not to enumerate prohibitions to prevent customers from self-screening incorrectly. If implemented, consider placing behind a feature flag until legal approval is obtained.

Add expandable disclosure to FirearmAgreement for customer awareness:

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="prohibited">
    <AccordionTrigger className="font-display text-brand-brown text-sm">
      Am I legally able to purchase a firearm?
    </AccordionTrigger>
    <AccordionContent className="text-sm text-brand-mud space-y-2">
      <p>Federal law prohibits firearm sales to anyone who:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Is under indictment for a felony</li>
        <li>Has been convicted of a felony</li>
        <li>Is a fugitive from justice</li>
        <li>Is an unlawful user of controlled substances</li>
        <li>Has been adjudicated mentally defective</li>
        <li>Has been dishonorably discharged from the military</li>
        <li>Is subject to a domestic violence restraining order</li>
        <li>Has been convicted of misdemeanor domestic violence</li>
        <li>Has renounced U.S. citizenship</li>
      </ul>
      <p className="text-xs text-brand-mud/60 mt-3">
        If any of these apply, please do not place an order. We will discover
        this during the background check and cannot complete the transfer.
      </p>
    </AccordionContent>
  </AccordionItem>
</Accordion>

```text

---

## Compliance Checklist Summary

| Item | Status | Priority |
|------|--------|----------|
| Reserve & Hold Model | ✅ Compliant | - |
| Form 4473 In-Person | ✅ Compliant | - |
| NICS Process | ✅ Compliant | - |
| Age Requirements | ✅ Compliant | - |
| 20-Year Record Retention | ✅ Compliant | - |
| **Straw Purchase Warning** | 🔧 Added | P0 |
| **Out-of-State Handgun Blocking** | 🔧 Added | P0 |
| **Multiple Handgun Reporting** | 📋 Specified | P1 |
| **Ammo Age Clarification** | 📋 Specified | P1 |
| **NICS Delayed Policy** | 📋 Specified | P1 |
| **Bound Book Integration** | 📋 Specified | P2 |
| **Prohibited Persons Disclosure** | 📋 Specified | P2 |

---

## Legal Disclaimer

This specification is based on researcher analysis of ATF regulations as of December 2024. Kim should consult with:
1. **ATF Industry Operations Inspector** for her area
2. **West Virginia attorney** specializing in firearms law
3. **FFL compliance consultant** before accepting first online firearm order

**ATF FFL Hotline:** 1-888-283-3219
