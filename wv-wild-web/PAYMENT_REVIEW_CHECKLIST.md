# Payment Integration - Legal Review Checklist

**Status**: 🔴 DISABLED - Under Legal/Compliance Review

**Feature Flag**: `PUBLIC_PAYMENT_ENABLED=false` in `.env`

---

## CRITICAL: Do NOT Enable Until Verified

The payment integration is **code-complete** but **DISABLED** until the following checks are completed:

## ✅ Legal & Compliance Review

### 1. Tactical Payments Official Documentation
- [ ] Obtain official API documentation from Tactical Payments
- [ ] Review their recommended integration patterns
- [ ] Verify webhook signature verification matches their spec
- [ ] Confirm hosted payment page flow is their recommended approach
- [ ] Check if they have reference implementations or SDKs

### 2. 2A Industry Best Practices
- [ ] Research [2A Commerce](https://2acommerce.com/) WooCommerce plugins
- [ ] Compare our webhook handling to proven patterns
- [ ] Review [Blue Payment Agency](https://bluepaymentagency.com/) integration docs
- [ ] Check [Firearms-Friendly Payment Processors Gist](https://gist.github.com/codingcreditcardprocessingapps2/3eb5aa8133d837360736e4e0a4d09103)
- [ ] Identify any gaps in our implementation vs. battle-tested solutions

### 3. FFL Compliance
- [ ] Verify 18 U.S.C. § 922(b)(3) handgun restrictions are enforced
- [ ] Confirm long gun contiguous state rules (WV, OH, PA, MD, VA, KY)
- [ ] Ensure firearm reserve agreement is legally sufficient
- [ ] Validate state restriction logic matches federal law

### 4. PCI DSS Compliance
- [ ] Confirm SAQ A qualification (no card data touches our servers) ✅
- [ ] Verify hosted payment page meets PCI requirements
- [ ] Document compliance approach for auditors
- [ ] Annual SAQ A questionnaire filing

### 5. Security Verification
- [ ] HMAC webhook signature verification tested against Tactical's spec
- [ ] Rate limiting implemented on webhook endpoint
- [ ] Order ID validation prevents injection attacks ✅
- [ ] No sensitive data logged ✅
- [ ] HTTPS enforcement (Cloudflare handles) ✅

### 6. Peer Review
- [ ] Have another FFL dealer review the implementation
- [ ] Get legal counsel to review checkout flow
- [ ] Consult with Tactical Payments support on our approach
- [ ] Consider hiring 2A e-commerce consultant for audit

---

## What Was Built (Currently DISABLED)

### ✅ Infrastructure Complete
- Payment utilities (`tacticalPayments.ts`)
- Payment schemas (`schemas.ts`) with Zod validation
- 3 Cloudflare Workers (create-session, webhook, status)
- PaymentSection component with redirect flow
- OrderConfirmation with status polling
- Feature flag to disable until verified

### ⚠️ Needs Verification
- Webhook handling pattern (compare to Tactical's official docs)
- Session creation API call structure
- Error handling coverage
- Edge cases (timeouts, race conditions, etc.)

---

## How to Enable (After Review)

1. **Complete ALL checklist items above**
2. **Get written approval** from legal counsel (if applicable)
3. **Test in sandbox** with Tactical Payments test credentials
4. **Set environment variable**: `PUBLIC_PAYMENT_ENABLED=true` in `.env`
5. **Deploy to staging** and test full flow
6. **Monitor first 10 transactions** closely
7. **Document any issues** and iterate

---

## Resources for Review

- [Tactical Payments Official Site](https://www.tacticalpay.com/)
- [2A Commerce Complete Guide 2025](https://2acommerce.com/the-complete-guide-to-firearm-ecommerce-in-2025/)
- [Gun-Friendly Payment Processors Guide](https://gunfriendlypayments.com/top-5-gun-friendly-payment-processors-for-firearm-businesses/)
- [WooCommerce FFL Processing (Blue Payment)](https://bluepaymentagency.com/woocommerce-credit-card-processing-ffl-firearms/)

---

## Contact for Implementation Review

**Tactical Payments Support**: Check their website for merchant support contact
**2A Commerce**: May offer consulting on e-commerce compliance
**FFL Attorney**: Consult firearms law specialist for checkout flow review

---

**Last Updated**: 2025-12-18
**Next Review**: Before enabling payment integration
