# SPEC-05: Order Management

**Phase:** 3C - E-Commerce Foundation
**Status:** SPECIFICATION
**Dependencies:** SPEC-03 (Checkout), SPEC-04 (Payment)

---

## Overview

Order lifecycle management from placement through fulfillment, including notifications, status tracking, and Kim's admin view for processing orders.

---

## Order Data Model

```typescript
interface Order {
  // Identification
  id: string;                    // UUID
  orderNumber: string;           // Human-readable: WVWO-2024-001234
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp

  // Customer
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  // Items
  items: OrderItem[];
  subtotal: number;              // In cents
  shipping: number;              // In cents (0 for pickup)
  tax: number;                   // In cents
  total: number;                 // In cents

  // Fulfillment
  fulfillmentType: 'ship' | 'pickup';
  shippingAddress?: {
    street: string;
    apt?: string;
    city: string;
    state: string;
    zip: string;
  };

  // Status
  status: OrderStatus;
  statusHistory: StatusChange[];

  // Payment
  paymentId: string;             // From payment processor
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';

  // Firearms specific
  hasFirearms: boolean;
  firearmStatus?: 'reserved' | 'ready_for_pickup' | '4473_completed' | 'nics_pending' | 'nics_approved' | 'nics_denied' | 'transferred';

  // Notes
  customerNotes?: string;
  internalNotes?: string;
}

interface OrderItem {
  productId: string;
  sku: string;
  name: string;
  quantity: number;
  price: number;                 // Unit price in cents
  total: number;                 // Line total in cents
  fulfillmentType: 'ship_or_pickup' | 'pickup_only' | 'reserve_hold';
}

type OrderStatus =
  | 'pending'           // Order placed, awaiting payment
  | 'paid'              // Payment confirmed
  | 'processing'        // Being prepared
  | 'ready_for_pickup'  // Pickup orders ready
  | 'shipped'           // Ship orders in transit
  | 'completed'         // Fulfilled
  | 'cancelled'         // Order cancelled
  | 'refunded';         // Payment refunded

interface StatusChange {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}
```

---

## Order Number Generation

Format: `WVWO-YYYY-NNNNNN`

```typescript
function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const sequence = await getNextSequence();  // From KV store
  return `WVWO-${year}-${sequence.toString().padStart(6, '0')}`;
}

// Examples:
// WVWO-2024-000001
// WVWO-2024-000042
// WVWO-2025-000001 (resets yearly)
```

---

## Order Status Flow

### Standard Orders (Ship/Pickup - No Firearms)

```
pending → paid → processing → ready_for_pickup/shipped → completed
                     ↓
                 cancelled
```

### Firearm Orders (Reserve & Hold)

```
pending → paid → processing → ready_for_pickup
                                    ↓
                            4473_completed
                                    ↓
                              nics_pending
                                    ↓
                    ┌───────────────┴───────────────┐
                    ↓                               ↓
              nics_approved                   nics_denied
                    ↓                               ↓
               transferred                     refunded
                    ↓
               completed
```

---

## Order Storage

### Static Site Approach

Since WVWO is a static Cloudflare Pages site, order storage options:

| Option | Pros | Cons | Recommended |
|--------|------|------|-------------|
| **Cloudflare KV** | Fast, simple, included | 25MB value limit | ✅ Yes |
| **Cloudflare D1** | SQL, relational | More setup | Future |
| **Airtable** | Visual for Kim, easy | 3rd party, API limits | ✅ Yes |
| **Google Sheets** | Kim familiar | Less structured | Backup |

**Recommended:** Cloudflare KV for order data + Airtable for Kim's view

### KV Structure

```typescript
// Order by ID
await KV.put(`order:${orderId}`, JSON.stringify(order));

// Order by number (index)
await KV.put(`order_number:${orderNumber}`, orderId);

// Orders by customer email (index)
await KV.put(`customer:${email}:${orderId}`, orderId);

// Recent orders (sorted set simulation)
await KV.put(`orders_recent`, JSON.stringify(recentOrderIds));
```

---

## Email Notifications

### Email Templates

Using Buttondown or SendGrid for transactional emails.

#### 1. Order Confirmation

**Subject:** `Your WV Wild Outdoors Order #WVWO-2024-001234`

```
Hey [FirstName],

Thanks for your order! Here's what you got:

ORDER #WVWO-2024-001234
─────────────────────────────────────

[ItemName] × [Qty]                    $XX.XX
[ItemName] × [Qty]                    $XX.XX
─────────────────────────────────────
Subtotal                              $XX.XX
Shipping                              $XX.XX
Tax                                   $XX.XX
─────────────────────────────────────
TOTAL                                 $XXX.XX

[If Pickup:]
PICKUP AT:
WV Wild Outdoors
121 WV-82 (Birch River Rd)
Birch River, WV 26610
Mon-Sat 10am-5pm

We'll call you at [Phone] when it's ready!

[If Shipping:]
SHIPPING TO:
[Address]

We'll email tracking info when it ships.

[If Firearms:]
FIREARM PICKUP:
Your firearm(s) are reserved and waiting.
When you come in, bring:
• Valid photo ID (WV Driver's License preferred)
• Allow 15-20 minutes for paperwork

Questions? Call us at (304) 649-2607

Grand love ya!
Kim & Bryan
WV Wild Outdoors
```

#### 2. Order Ready for Pickup

**Subject:** `Your order is ready! #WVWO-2024-001234`

```
Hey [FirstName],

Good news — your order is packed and ready to pick up!

ORDER #WVWO-2024-001234

PICKUP AT:
WV Wild Outdoors
121 WV-82 (Birch River Rd)
Birch River, WV 26610
Mon-Sat 10am-5pm

[If Firearms:]
Remember to bring:
• Valid photo ID (WV Driver's License preferred)
• Allow 15-20 minutes for background check paperwork

See you soon!
Kim & Bryan
```

#### 3. Order Shipped

**Subject:** `Your order is on the way! #WVWO-2024-001234`

```
Hey [FirstName],

Your order shipped today!

ORDER #WVWO-2024-001234

TRACKING: [TrackingNumber]
CARRIER: [UPS/FedEx]
Track your package: [TrackingURL]

SHIPPING TO:
[Address]

Should arrive in 3-7 business days.

Questions? Call us at (304) 649-2607

Grand love ya!
Kim & Bryan
```

#### 4. Firearm NICS Approved

**Subject:** `Background check approved! Pick up your firearm`

```
Hey [FirstName],

Great news — your background check has been approved!

Your [FirearmName] is ready for pickup at:

WV Wild Outdoors
121 WV-82 (Birch River Rd)
Birch River, WV 26610
Mon-Sat 10am-5pm

Don't forget to bring your ID.

See you soon!
Kim & Bryan
```

---

## Kim's Admin View

### Requirements
- Mobile-friendly (Kim manages from phone)
- Simple list of orders
- Status updates with one tap
- No login required (secured by obscure URL or simple PIN)

### Option A: Airtable (Recommended)

Create Airtable base with:

| View | Columns | Filter |
|------|---------|--------|
| **New Orders** | Order#, Customer, Items, Total, Status | status = paid |
| **Ready for Pickup** | Order#, Customer, Phone, Items | status = ready_for_pickup |
| **Firearms Pending** | Order#, Customer, Firearm, NICS Status | hasFirearms = true |
| **All Orders** | All columns | None |

**Workflow:**
1. Webhook creates Airtable record on new order
2. Kim opens Airtable app on phone
3. Kim updates status (dropdown)
4. Automation sends customer email on status change

### Option B: Simple Admin Page

```
/admin/orders?pin=XXXX

┌─────────────────────────────────────────────┐
│ Orders                            [Refresh] │
├─────────────────────────────────────────────┤
│ Filter: [All ▼]  [Today ▼]                  │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ #WVWO-2024-001234                       │ │
│ │ John Smith · (304) 555-1234             │ │
│ │ 3 items · $127.47 · PICKUP              │ │
│ │ Status: [Processing ▼]                  │ │
│ │ [View Details]                          │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ #WVWO-2024-001233                       │ │
│ │ Jane Doe · (304) 555-5678               │ │
│ │ Winchester SXP · $349.99 · FIREARM      │ │
│ │ Status: [Ready for Pickup ▼]            │ │
│ │ NICS: [Pending ▼]                       │ │
│ │ [View Details]                          │ │
│ └─────────────────────────────────────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Order Lifecycle API

### Cloudflare Worker Endpoints

```typescript
// Get order by ID
GET /api/orders/:id

// Get order by number
GET /api/orders/number/:orderNumber

// Update order status
PATCH /api/orders/:id/status
Body: { status: 'ready_for_pickup', note?: 'Called customer' }

// Add tracking
PATCH /api/orders/:id/tracking
Body: { carrier: 'ups', trackingNumber: '1Z...' }

// Update firearm status
PATCH /api/orders/:id/firearm-status
Body: { status: 'nics_approved' }
```

---

## Automation Triggers

| Trigger | Action |
|---------|--------|
| Payment webhook received | Create order, send confirmation email |
| Status → ready_for_pickup | Send "ready for pickup" email |
| Status → shipped | Send "order shipped" email with tracking |
| Firearm status → nics_approved | Send "NICS approved" email |
| Firearm status → nics_denied | Send "NICS denied" email, initiate refund |
| Order age > 7 days + status = ready_for_pickup | Send reminder email |

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

- [ ] Order created on successful payment
- [ ] Order number generated correctly
- [ ] Confirmation email sent
- [ ] Kim can view orders on phone (Airtable or admin page)
- [ ] Status updates work
- [ ] Status change triggers correct email
- [ ] Firearm orders show NICS status
- [ ] Shipped orders have tracking
- [ ] Order history preserved
