# Security Audit Report: Checkout Flow (PR #44)

**Audit Date**: 2025-12-18
**Auditor**: Claude (Sonnet 4.5)
**Scope**: Checkout flow security for firearms compliance
**Files Audited**:

- `wv-wild-web/public/_headers` (CSP configuration)
- `wv-wild-web/src/components/checkout/CheckoutForm.tsx`
- `wv-wild-web/src/components/checkout/PaymentSection.tsx`
- `wv-wild-web/src/components/checkout/schemas/checkoutSchema.ts`
- `wv-wild-web/src/lib/orderUtils.ts`
- `wv-wild-web/src/stores/cartStore.ts`

---

## Executive Summary

**Overall Risk Level**: **MEDIUM** (2 High, 3 Medium, 4 Low findings)

The checkout implementation demonstrates **strong security foundations** with comprehensive input validation, proper CSP headers, and firearms compliance controls. However, **CRITICAL ISSUES** exist around state validation bypass risks and PII exposure in browser storage that must be addressed before production deployment.

**Key Strengths**:

- ✅ Comprehensive Zod validation with proper error handling
- ✅ Federal firearms restrictions enforced (WV-only handguns)
- ✅ Strong CSP headers with allowlisted domains
- ✅ sessionStorage for sensitive data (better than localStorage)
- ✅ Runtime validation of stored order data

**Critical Risks**:

- 🚨 **State validation can be bypassed** (client-side only)
- 🚨 **PII stored in sessionStorage** (GDPR/privacy concern)
- ⚠️ **No CSRF protection** (stub payment, but needed for real integration)
- ⚠️ **Order ID collision risk** (timestamp-based, not cryptographically unique)

---

## OWASP Top 10 Analysis

### 1. A01:2021 – Broken Access Control ⚠️ MEDIUM RISK

**Finding**: State validation for firearm restrictions is **client-side only**.

**Location**: `checkoutSchema.ts:174-186`, `CheckoutForm.tsx:104-110`

```typescript
// VULNERABLE: Client can modify state via browser DevTools
if (summary.hasFirearms && data.fulfillment === 'ship') {
  const stateValidation = validateStateRestriction(data.state, true);
  // No server-side verification
}
```

**Attack Vector**:

1. Customer in CA adds handgun to cart (restricted)
2. Opens DevTools → Application → Session Storage
3. Modifies `wvwo_pending_order` state from "CA" to "WV"
4. Bypasses federal law restriction (18 U.S.C. § 922(b)(3))

**Impact**: **HIGH** - Federal firearms law violation. ATF penalties, FFL revocation risk.

**Recommendation**:

```typescript
// Server-side validation (Cloudflare Worker or API endpoint)
export async function POST({ request }) {
  const order = await request.json();

  // CRITICAL: Re-validate state restrictions server-side
  if (order.hasFirearms && order.shippingAddress?.state !== 'WV') {
    return new Response(JSON.stringify({
      error: 'Federal law prohibits out-of-state handgun sales'
    }), { status: 403 });
  }

  // Proceed with payment...
}
```

**Priority**: **CRITICAL** - Must fix before production.

---

### 2. A03:2021 – Injection 🟢 LOW RISK

**Finding**: **No SQL/NoSQL injection risk** (static site, no database).
**Finding**: **XSS well-mitigated** by React's auto-escaping.

**Validation Patterns** (checkoutSchema.ts):

```typescript
// Input sanitization via Zod
phone: z.string().regex(phonePattern)  // Only allows valid phone chars
email: z.string().email()              // Email format validation
zip: z.string().regex(/^\d{5}$/)       // Only 5 digits
```

**Potential XSS Vector** (OrderConfirmation.tsx:129):

```tsx
// SAFE: React auto-escapes
<h1>Thanks, {order.contact.firstName}!</h1>
```

**Test Case**:

```typescript
// Malicious input
firstName: '<script>alert("XSS")</script>'
// Rendered as literal text: "&lt;script&gt;..."
```

**Recommendation**: **No action needed** - React's escaping is sufficient. Consider adding CSP `'unsafe-inline'` removal in future (currently needed for Tailwind).

---

### 3. A04:2021 – Insecure Design ⚠️ MEDIUM RISK

**Finding**: **Order ID collision risk** with timestamp-based generation.

**Location**: `orderUtils.ts:120-124`

```typescript
export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const sequence = (Date.now() % 1000000).toString().padStart(6, '0');
  return `WVWO-${year}-${sequence}`; // WEAK: Collision risk in same millisecond
}
```

**Attack Scenario**:

- Two customers checkout simultaneously (same millisecond)
- Both receive `WVWO-2025-847291`
- Order data collision in future server-side storage

**Collision Probability**:

- 1ms window = 1/1,000,000 sequence space
- Low traffic volume = **acceptable for MVP**
- Production with high traffic = **UNACCEPTABLE**

**Recommendation** (before production):

```typescript
// Option 1: Cloudflare KV counter (atomic increment)
export async function generateOrderId(env: Env): Promise<string> {
  const counter = await env.ORDER_COUNTER.get("counter", "json");
  const nextId = (counter || 0) + 1;
  await env.ORDER_COUNTER.put("counter", JSON.stringify(nextId));
  return `WVWO-${new Date().getFullYear()}-${nextId.toString().padStart(6, '0')}`;
}

// Option 2: UUID v4 (cryptographically unique)
export function generateOrderId(): string {
  return `WVWO-${crypto.randomUUID()}`; // e.g., WVWO-a3f2e8d4-...
}
```

**Priority**: **MEDIUM** - Document as MVP limitation, fix before launch.

---

### 4. A05:2021 – Security Misconfiguration 🟡 MEDIUM RISK

**Finding**: **CSP allows `'unsafe-inline'`** for scripts and styles.

**Location**: `_headers:7`

```text
Content-Security-Policy: script-src 'self' 'unsafe-inline' https://pay.tacticalpay.com
```

**Risk**: Inline script injection if XSS occurs. Tailwind CSS requires `'unsafe-inline'` for styles.

**Attack Vector**:

1. Attacker finds XSS (unlikely due to React escaping)
2. Injects `<script>` tag via compromised third-party (e.g., npm package)
3. CSP allows execution due to `'unsafe-inline'`

**Mitigation Status**:

- ✅ Tactical Payments domain properly allowlisted
- ✅ `frame-src` restricted to YouTube + Tactical Payments
- ✅ `object-src 'none'` prevents Flash/Java exploits
- ❌ `'unsafe-inline'` weakens CSP

**Recommendation** (post-MVP):

```text
# Generate nonces for inline scripts
script-src 'self' 'nonce-{RANDOM}' https://pay.tacticalpay.com

# Allow hashed styles for Tailwind
style-src 'self' 'sha256-{HASH}' https://fonts.googleapis.com
```

**Priority**: **LOW** - Acceptable for MVP. Harden post-launch.

---

### 5. A07:2021 – Identification and Authentication Failures 🟢 LOW RISK

**Finding**: **No authentication** (anonymous checkout by design).

**Session Management**:

- Session ID generated via `crypto.randomUUID()` (strong)
- Used for cart tracking, not authentication
- No password storage, no session hijacking risk

**Recommendation**: **No action needed** - Anonymous checkout is appropriate for e-commerce.

---

### 6. A08:2021 – Software and Data Integrity Failures 🟡 MEDIUM RISK

**Finding**: **No CSRF protection** (stub payment, but needed for real integration).

**Location**: `CheckoutForm.tsx:88-155` (form submission)

```typescript
const onSubmit = async (data: CheckoutFormData) => {
  // No CSRF token validation
  const order = createOrder(orderParams);
  storePendingOrder(order);
  // Real payment would happen here via Tactical Payments redirect
}
```

**Attack Scenario** (post-production):

1. Attacker creates malicious site: `evil.com`
2. Embeds hidden form that POSTs to `wvwildoutdoors.com/api/checkout`
3. Logged-in user visits `evil.com`
4. Browser auto-submits form with user's cookies
5. Unwanted order placed

**Current Risk**: **LOW** (stub payment, no real transactions).
**Production Risk**: **HIGH** (real payments require CSRF protection).

**Recommendation** (before payment integration):

```typescript
// Cloudflare Worker: Generate CSRF token
export async function onRequest(context) {
  const csrfToken = crypto.randomUUID();
  context.cookies.set('csrf_token', csrfToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });

  return new Response(JSON.stringify({ csrfToken }));
}

// Client: Include token in payment request
const response = await fetch('/api/checkout', {
  method: 'POST',
  headers: { 'X-CSRF-Token': csrfToken },
  body: JSON.stringify(order)
});
```

**Priority**: **CRITICAL** for production payment integration.

---

### 7. A09:2021 – Security Logging and Monitoring Failures 🟢 LOW RISK

**Finding**: **Adequate logging** for MVP (console.error for failures).

**Current Logging**:

```typescript
// orderUtils.ts:244
console.error('[Order] Invalid order data:', validated.error.issues);

// CheckoutForm.tsx:190
console.error('[CheckoutForm] Payment preparation failed:', error);
```

**Recommendation** (post-MVP):

```typescript
// Integrate with error tracking (e.g., Sentry)
import * as Sentry from '@sentry/browser';

if (!validated.success) {
  Sentry.captureException(new Error('Order validation failed'), {
    extra: {
      orderId: order.id,
      validationErrors: validated.error.issues,
      userState: shippingState
    }
  });
}
```

**Priority**: **LOW** - Add before production launch.

---

### 8. A10:2021 – Server-Side Request Forgery (SSRF) 🟢 NO RISK

**Finding**: **No server-side requests** (static site, client-side only).

---

## PII and Privacy Analysis (GDPR/CCPA)

### 🚨 HIGH RISK: PII Exposure in sessionStorage

**Finding**: Customer contact info (name, email, phone, address) stored in **browser sessionStorage**.

**Location**: `orderUtils.ts:212-222`

```typescript
export function storePendingOrder(order: OrderData): boolean {
  try {
    sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order)); // RISK: PII exposure
    return true;
  } catch (error) {
    return false;
  }
}
```

**Stored Data** (example):

```json
{
  "id": "WVWO-2025-847291",
  "contact": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "(304) 555-1234"
  },
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Charleston",
    "state": "WV",
    "zip": "25301"
  }
}
```

**Privacy Risks**:

1. **Browser Extensions**: Can read sessionStorage (e.g., malicious Chrome extension)
2. **Shared Computers**: sessionStorage persists until tab closes (Kim's shop computer?)
3. **GDPR Article 32**: Requires "appropriate technical measures" for PII protection
4. **CCPA**: California residents' data must be "reasonably secured"

**Attack Scenario**:

1. Customer checks out on public library computer
2. Closes browser but doesn't clear sessionStorage (rare but possible if crash)
3. Next user inspects sessionStorage → sees previous customer's PII

**Mitigation Status**:

- ✅ **sessionStorage > localStorage** (better than 7-day localStorage)
- ✅ **Runtime validation** (orderDataSchema prevents corruption)
- ✅ **Auto-clear** on confirmation page load
- ❌ **Still readable** by extensions and DevTools

**Recommendation**:

**Option 1: Encrypt sessionStorage data** (quick fix)

```typescript
import { encrypt, decrypt } from '@/lib/crypto'; // AES-256-GCM

export function storePendingOrder(order: OrderData): boolean {
  const encrypted = encrypt(JSON.stringify(order), userSessionKey);
  sessionStorage.setItem(ORDER_STORAGE_KEY, encrypted);
}

export function getPendingOrder(): StorageResult<OrderData> {
  const encrypted = sessionStorage.getItem(ORDER_STORAGE_KEY);
  const decrypted = decrypt(encrypted, userSessionKey);
  return JSON.parse(decrypted);
}
```

**Option 2: Server-side order storage** (production-grade)

```typescript
// Store order on Cloudflare KV (server-side)
export async function storePendingOrder(order: OrderData, env: Env): Promise<string> {
  const orderId = order.id;
  await env.ORDERS.put(orderId, JSON.stringify(order), {
    expirationTtl: 3600 // 1 hour expiry
  });
  return orderId; // Client only stores order ID
}

// Retrieve via server-side API
export async function onRequest(context) {
  const orderId = context.params.orderId;
  const order = await context.env.ORDERS.get(orderId, 'json');
  return Response.json(order);
}
```

**Priority**: **HIGH** - Implement encryption before launch.

---

## Firearms Compliance Review

### Federal Law Compliance (18 U.S.C. § 922)

**Requirement**: Out-of-state handgun sales prohibited.

**Implementation**: `checkoutSchema.ts:174-186`

```typescript
export function validateStateRestriction(
  customerState: string | undefined,
  hasHandguns: boolean
): { valid: boolean; error?: string } {
  if (hasHandguns && customerState && customerState !== 'WV') {
    return {
      valid: false,
      error: 'Handgun purchases require WV residency...'
    };
  }
  return { valid: true };
}
```

**Status**: ✅ **CORRECT** - Blocks out-of-state handgun sales.

**Gap**: ⚠️ **Client-side only** - Can be bypassed (see A01 finding above).

**Additional Considerations**:

1. **Age Verification** (18 U.S.C. § 922(b)(1)):
   - Not implemented (cart shows `ageRestriction: 18 | 21`)
   - **Recommendation**: Add age confirmation checkbox:

     ```tsx
     <Checkbox id="ageConfirm" required>
       I confirm I am 21+ (handguns) or 18+ (long guns)
     </Checkbox>
     ```

2. **FFL Transfer Notice** (CheckoutForm.tsx:242-246):
   - ✅ **EXCELLENT**: Clear notice about NICS background check
   - ✅ **EXCELLENT**: "Reserve hold" terminology (accurate)

3. **Long Gun Contiguous States** (checkoutSchema.ts:195-198):
   - ✅ **IMPLEMENTED**: `validateLongGunState()` function exists
   - ❌ **NOT CALLED**: Currently unused in checkout flow
   - **Recommendation**: Wire up when product data includes `firearmType`

---

## Additional Security Concerns

### 1. Payment Stub Security 🟡 MEDIUM RISK

**Finding**: Mock payment form could mislead users.

**Location**: `PaymentSection.tsx:60-88`

```tsx
{/* Mock Payment Form UI */}
<div className="p-4 bg-stone-100 rounded-sm">
  <div className="h-12 bg-stone-200">
    <span className="text-stone-400">•••• •••• •••• ••••</span>
  </div>
  <p className="text-sm text-stone-500 text-center pt-2">
    Payment form will be connected to a 2A-compliant processor
  </p>
</div>
```

**Risk**: User might think this is a real form and try to enter card details (though non-interactive).

**Recommendation**:

```tsx
{/* Make it MORE obvious it's a stub */}
<div className="p-4 bg-yellow-50 border-2 border-yellow-400 rounded-sm">
  <div className="text-center py-8">
    <Lock className="w-12 h-12 mx-auto text-yellow-600 mb-2" />
    <p className="font-display font-bold text-lg text-yellow-900">
      Payment Integration Coming Soon
    </p>
    <p className="text-sm text-yellow-700">
      For now, we'll call you to complete your order.
    </p>
  </div>
</div>
```

**Priority**: **LOW** - Improve UX clarity.

---

### 2. Race Condition Protection ✅ WELL HANDLED

**Finding**: Cart uses mutex lock to prevent race conditions.

**Location**: `cartStore.ts:34-38, 237-240`

```typescript
let isAddingItem = false;

export function addItem(item: CartItem) {
  if (isAddingItem) {
    return { success: false, message: 'Please wait...' };
  }
  isAddingItem = true;
  // ... add logic
  isAddingItem = false;
}
```

**Status**: ✅ **SECURE** - Prevents double-click exploits.

---

### 3. Cart Expiry (7 Days) ✅ REASONABLE

**Finding**: Cart persists for 7 days in localStorage.

**Location**: `cartStore.ts:31, 438-442`

```typescript
const CART_EXPIRY_HOURS = 168; // 7 days

if (hoursSinceUpdate < CART_EXPIRY_HOURS) {
  $cartState.set(parsed);
}
```

**Privacy Analysis**:

- ✅ **REASONABLE**: E-commerce standard (Amazon = 90 days, eBay = 7 days)
- ✅ **AUTO-CLEAR**: Expired carts removed automatically
- ⚠️ **SHARED COMPUTERS**: 7 days could expose cart on shared devices

**Recommendation** (optional):

```typescript
// Add "Clear cart on browser close" option
const CART_MODE = import.meta.env.PUBLIC_CART_MODE || 'persistent';

if (CART_MODE === 'session') {
  // Use sessionStorage instead of localStorage
}
```

**Priority**: **LOW** - Current behavior is standard.

---

## Recommendations Summary

### 🚨 CRITICAL (Must Fix Before Production)

| # | Issue | Priority | Effort | Impact |
|---|-------|----------|--------|--------|
| 1 | **Server-side state validation** (firearms bypass risk) | CRITICAL | Medium | Federal law violation risk |
| 2 | **PII encryption** (sessionStorage exposure) | HIGH | Low | GDPR/CCPA compliance |
| 3 | **CSRF protection** (for real payment integration) | CRITICAL | Low | Payment fraud risk |

### ⚠️ MEDIUM (Address Before Launch)

| # | Issue | Priority | Effort | Impact |
|---|-------|----------|--------|--------|
| 4 | **Order ID collision** (UUID or counter-based) | MEDIUM | Low | Data integrity |
| 5 | **CSP hardening** (remove `'unsafe-inline'`) | LOW | Medium | XSS defense |
| 6 | **Age verification checkbox** (firearms compliance) | MEDIUM | Low | ATF compliance |

### 🟢 LOW (Post-Launch Improvements)

| # | Issue | Priority | Effort | Impact |
|---|-------|----------|--------|--------|
| 7 | **Error tracking** (Sentry integration) | LOW | Low | Debugging |
| 8 | **Payment stub UX** (make stub more obvious) | LOW | Low | User clarity |
| 9 | **Long gun contiguous states** (wire up validation) | LOW | Low | Future feature |

---

## Code Snippets for Critical Fixes

### Fix #1: Server-Side State Validation

**File**: `wv-wild-web/functions/api/validate-order.ts` (new)

```typescript
import type { OrderData } from '@/lib/orderUtils';

export async function onRequestPost(context) {
  try {
    const order: OrderData = await context.request.json();

    // CRITICAL: Re-validate firearms restrictions server-side
    if (order.hasFirearms) {
      if (order.fulfillment === 'ship') {
        return new Response(JSON.stringify({
          error: 'Firearms must be picked up in-store (FFL transfer required)'
        }), { status: 403 });
      }

      // Block out-of-state handgun sales (federal law)
      // Note: This assumes all firearms are handguns. When product data
      // includes firearmType, add: if (hasHandguns && state !== 'WV')
      if (order.shippingAddress?.state !== 'WV') {
        return new Response(JSON.stringify({
          error: 'Federal law prohibits out-of-state handgun sales'
        }), { status: 403 });
      }
    }

    // Store order in Cloudflare KV
    await context.env.ORDERS.put(order.id, JSON.stringify(order), {
      expirationTtl: 3600 // 1 hour
    });

    return new Response(JSON.stringify({ success: true, orderId: order.id }));
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Validation failed' }), {
      status: 500
    });
  }
}
```

**Client Update**: `CheckoutForm.tsx:139-155`

```typescript
const order = createOrder(orderParams);

// Server-side validation before storing
const validationResponse = await fetch('/api/validate-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(order)
});

if (!validationResponse.ok) {
  const { error } = await validationResponse.json();
  setPaymentError(error);
  return;
}

// Only store locally after server validation passes
storePendingOrder(order);
```

---

### Fix #2: PII Encryption

**File**: `wv-wild-web/src/lib/crypto.ts` (new)

```typescript
/**
 * Simple AES-256-GCM encryption for sessionStorage PII.
 * Key is generated per session and stored in memory only.
 */

let sessionKey: CryptoKey | null = null;

async function getSessionKey(): Promise<CryptoKey> {
  if (!sessionKey) {
    sessionKey = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      false, // Non-extractable
      ['encrypt', 'decrypt']
    );
  }
  return sessionKey;
}

export async function encrypt(plaintext: string): Promise<string> {
  const key = await getSessionKey();
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  // Combine IV + ciphertext and encode as base64
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);

  return btoa(String.fromCharCode(...combined));
}

export async function decrypt(ciphertext: string): Promise<string> {
  const key = await getSessionKey();
  const combined = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));

  const iv = combined.slice(0, 12);
  const data = combined.slice(12);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}
```

**Update**: `orderUtils.ts:212-222`

```typescript
import { encrypt, decrypt } from '@/lib/crypto';

export async function storePendingOrder(order: OrderData): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    const encrypted = await encrypt(JSON.stringify(order));
    sessionStorage.setItem(ORDER_STORAGE_KEY, encrypted);
    return true;
  } catch (error) {
    console.error('[Order] Failed to store order:', error);
    return false;
  }
}

export async function getPendingOrder(): Promise<StorageResult<OrderData>> {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Not in browser environment' };
  }

  try {
    const encrypted = sessionStorage.getItem(ORDER_STORAGE_KEY);
    if (!encrypted) {
      return { success: false, error: 'No pending order found' };
    }

    const decrypted = await decrypt(encrypted);
    const parsed = JSON.parse(decrypted);
    const validated = orderDataSchema.safeParse(parsed);

    if (!validated.success) {
      sessionStorage.removeItem(ORDER_STORAGE_KEY);
      return { success: false, error: 'Order data corrupted' };
    }

    return { success: true, data: validated.data };
  } catch (error) {
    console.error('[Order] Failed to retrieve order:', error);
    sessionStorage.removeItem(ORDER_STORAGE_KEY);
    return { success: false, error: 'Decryption failed' };
  }
}
```

---

### Fix #3: CSRF Protection

**File**: `wv-wild-web/functions/api/csrf-token.ts` (new)

```typescript
export async function onRequestGet(context) {
  const csrfToken = crypto.randomUUID();

  // Set secure HttpOnly cookie
  context.cookies.set('csrf_token', csrfToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 3600 // 1 hour
  });

  return new Response(JSON.stringify({ csrfToken }));
}
```

**File**: `wv-wild-web/functions/api/checkout.ts` (new)

```typescript
export async function onRequestPost(context) {
  const csrfCookie = context.cookies.get('csrf_token');
  const csrfHeader = context.request.headers.get('X-CSRF-Token');

  if (!csrfCookie || csrfCookie !== csrfHeader) {
    return new Response(JSON.stringify({ error: 'Invalid CSRF token' }), {
      status: 403
    });
  }

  // Process checkout...
}
```

**Client**: `CheckoutForm.tsx` (fetch CSRF token on mount)

```typescript
const [csrfToken, setCsrfToken] = useState<string | null>(null);

useEffect(() => {
  fetch('/api/csrf-token')
    .then(res => res.json())
    .then(({ csrfToken }) => setCsrfToken(csrfToken));
}, []);

// Include in payment request
const response = await fetch('/api/checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken || ''
  },
  body: JSON.stringify(order)
});
```

---

## Testing Recommendations

### Security Test Cases

```typescript
// Test: State validation bypass attempt
test('Server blocks out-of-state handgun sales', async () => {
  const order = createMockOrder({ state: 'CA', hasFirearms: true });

  const response = await fetch('/api/validate-order', {
    method: 'POST',
    body: JSON.stringify(order)
  });

  expect(response.status).toBe(403);
  expect(await response.json()).toEqual({
    error: 'Federal law prohibits out-of-state handgun sales'
  });
});

// Test: PII encryption
test('sessionStorage contains encrypted data', async () => {
  const order = createMockOrder({ email: 'test@example.com' });
  await storePendingOrder(order);

  const raw = sessionStorage.getItem('wvwo_pending_order');
  expect(raw).not.toContain('test@example.com'); // Should be encrypted
  expect(raw).toMatch(/^[A-Za-z0-9+/=]+$/); // Base64 pattern
});

// Test: CSRF protection
test('Checkout rejects requests without CSRF token', async () => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify(order)
    // No CSRF header
  });

  expect(response.status).toBe(403);
});
```

---

## Compliance Checklist

### Federal Firearms Law (18 U.S.C. § 922)

- [ ] **Out-of-state handgun sales blocked** (server-side validation)
- [ ] **Age verification** (18+ long guns, 21+ handguns)
- [ ] **NICS background check notice** (already implemented ✅)
- [ ] **FFL transfer documentation** (handled in-store)

### GDPR (EU Privacy Law)

- [ ] **PII encryption** (Article 32: security measures)
- [ ] **Data minimization** (only collect necessary fields ✅)
- [ ] **Right to erasure** (auto-clear after 1 hour ✅)
- [ ] **Privacy policy** (link in footer ✅)

### PCI DSS (Payment Card Industry)

- [ ] **No card data stored** (Tactical Payments handles ✅)
- [ ] **HTTPS enforced** (CSP `upgrade-insecure-requests` ✅)
- [ ] **3rd-party scripts restricted** (CSP allowlist ✅)

---

## Conclusion

The checkout implementation demonstrates **strong security fundamentals** with comprehensive validation, proper CSP headers, and firearms compliance controls. However, **CRITICAL GAPS** exist in server-side validation and PII protection that must be addressed before production deployment.

**Recommended Action Plan**:

1. **Immediate** (before payment integration):
   - Implement server-side state validation (Fix #1)
   - Add PII encryption (Fix #2)
   - Add CSRF protection (Fix #3)

2. **Before Launch**:
   - Replace timestamp-based order IDs with UUIDs
   - Add age verification checkbox
   - Integrate error tracking (Sentry)

3. **Post-Launch**:
   - Harden CSP (remove `'unsafe-inline'`)
   - Wire up long gun contiguous state validation
   - Improve payment stub UX

**Overall Assessment**: The codebase is **production-ready with critical fixes applied**. The team has demonstrated strong security awareness and best practices. With the recommended fixes, this checkout flow will meet federal firearms compliance, GDPR/CCPA requirements, and OWASP security standards.

---

**Auditor Notes**:

- Code review based on static analysis (no penetration testing performed)
- Assumes Tactical Payments integration will follow their security guidelines
- Re-audit recommended after payment integration
- Legal review recommended for firearms compliance (not a legal opinion)
