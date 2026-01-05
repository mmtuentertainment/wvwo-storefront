# Phase 3C: E-Commerce Foundation

**Status:** SPECIFICATIONS COMPLETE
**Priority:** After Phase 3A/3B (Geographic SEO + Hunter Content Hub)
**Owner:** Matt (implementation) / Kim (business decisions)

---

## Executive Summary

Full e-commerce implementation for WV Wild Outdoors, enabling online purchases with three distinct product tiers based on regulatory requirements and fulfillment complexity.

**Key Insight:** Stripe, PayPal, and Square **prohibit** firearm/ammunition transactions. This specification uses 2A-compliant payment processors (Tactical Payments, Orchid Pay, or Authorize.net via FFL-friendly merchant account).

---

## Product Tiers

| Tier | Products | Online Action | Fulfillment | Payment |
|------|----------|---------------|-------------|---------|
| **Tier 1** | Fishing, gear, clothing | Buy online | Ship OR pickup | 2A processor |
| **Tier 2** | Ammo | Buy online | **Pickup only** | 2A processor |
| **Tier 3** | Firearms | **Reserve & Hold** | **Pickup only** + 4473 | 2A processor |

### Tier 3: Reserve & Hold Model (Firearms)

1. Customer sees firearm online, clicks "Reserve This Firearm"
2. Pays full price (or deposit) online via 2A processor
3. Kim receives notification, holds the item
4. Customer visits store, completes ATF Form 4473 + NICS background check
5. Picks up firearm after approval

**Note:** Interstate FFL transfers are OUT OF SCOPE for Phase 3C. All firearm sales are local pickup only.

---

## Specification Index

Each spec has its own folder for spec.md, plan.md, and tasks.md:

| Folder | Title | Description |
|--------|-------|-------------|
| [01-product-model](01-product-model/) | Product Model | E-commerce product schema extension |
| [02-cart-system](02-cart-system/) | Cart System | Shopping cart with localStorage persistence |
| [03-checkout-flow](03-checkout-flow/) | Checkout Flow | Guest checkout process by product tier |
| [04-2a-payment-integration](04-2a-payment-integration/) | 2A Payment Integration | 2A-compliant payment processing |
| [05-order-management](05-order-management/) | Order Management | Order lifecycle & notifications |
| [06-shipping-pickup](06-shipping-pickup/) | Shipping & Pickup | Fulfillment options by tier |
| [07-ffl-compliance](07-ffl-compliance/) | FFL Compliance | Reserve & Hold workflow, ATF requirements |
| [08-inventory-display](08-inventory-display/) | Inventory Display | Stock management & display states |

### Folder Structure

```text

phase 3c/
├── README.md                      # This file
├── 01-product-model/
│   ├── spec.md                    # Specification (complete)
│   ├── plan.md                    # Implementation plan (add when ready)
│   └── tasks.md                   # Task breakdown (add when ready)
├── 02-cart-system/
│   └── spec.md
├── 03-checkout-flow/
│   └── spec.md
├── 04-2a-payment-integration/
│   └── spec.md
├── 05-order-management/
│   └── spec.md
├── 06-shipping-pickup/
│   └── spec.md
├── 07-ffl-compliance/
│   └── spec.md
└── 08-inventory-display/
    └── spec.md

```text

---

## Technology Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Cart UI | React + shadcn/ui | Already approved for interactive components |
| Cart Storage | localStorage | No backend needed, guest checkout |
| Forms | Web3Forms | Existing pattern in codebase |
| Payment | 2A-compliant processor | Stripe/PayPal prohibit firearms |
| Hosting | Cloudflare Pages | Static site, existing infrastructure |

---

## Constitution Compliance (v2.1.0)

- [x] E-commerce IS in scope (Phase 3C)
- [ ] Kim can manage from phone (mobile-first admin)
- [ ] Guest checkout (no account required)
- [ ] Local pickup as primary option
- [ ] FFL compliance documented
- [ ] Quality over speed (Anti-Speed Clause)

---

## Research Sources

- [2A Commerce Complete Guide 2025](https://2acommerce.com/the-complete-guide-to-firearm-ecommerce-in-2025/)
- [Orchid Advisors FFL E-Commerce](https://orchidadvisors.com/navigating-the-legal-and-regulatory-landscape-in-ecommerce-and-point-of-sale-for-firearm-transactions/)
- [Tactical Payments](https://www.tacticalpay.com/)
- [Tasker Payment Gateways - Authorize.net](https://taskerpaymentgateways.com/authorize-net-allowing-gun-sales-online/)
- [Blue Payment Agency](https://bluepaymentagency.com/fast-affordable-firearms-credit-card-processing/)

---

## Out of Scope (Future Phases)

- Interstate FFL transfers (ship to customer's FFL)
- Customer accounts / order history
- Inventory sync with POS system
- Automated stock updates
- Subscription products
