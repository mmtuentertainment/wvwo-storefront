# SPEC 6: Welcome Email

## 1. SPECIFICATION

### 1.1 Objective
Auto-send a welcome email when someone subscribes. Welcome emails get 4x open rates - critical first impression.

### 1.2 Requirements
| Req | Description | Priority |
|-----|-------------|----------|
| R1 | Auto-trigger on subscription | Must |
| R2 | Introduce Kim/Bryan and the shop | Must |
| R3 | Set expectations (what/when they'll hear from us) | Must |
| R4 | Include directions/contact | Should |
| R5 | Optional first-timer discount | Could |

### 1.3 Constraints
- Buttondown automation feature
- Single template (not segmented)

---

## 2. PSEUDOCODE

```markdown
Subject: Grand love ya for subscribing! Here's what to expect

---

Hey there!

Kim here from WV Wild Outdoors. Thanks for signing up - means a lot.

**Who we are:**
We're a family-owned sporting goods shop in Birch River, WV. Been here since 2008. Bryan and I are both DNR license agents, and we're an FFL dealer for transfers.

**What you'll get:**
- Local hunting and fishing reports (when there's something worth sharing)
- Season reminders before opener
- Occasional restock alerts (ammo, popular gear)

We won't spam you. Promise.

**Where to find us:**
121 WV-82, Birch River, WV 26610
Right off I-79 Exit 57 - look for us across from the fire station road.
Mon-Sat 10am-5pm | (304) 649-2607

[Get Directions](https://maps.google.com/...)

Got questions? Just reply to this email.

Grand love ya,
Kim & Bryan

---
```

---

## 3. ARCHITECTURE

```
Buttondown Automation:
Trigger: New subscriber
Action: Send welcome email
Delay: Immediate (or 5 min for better deliverability)
```

---

## 4. REFINEMENT

### First-Timer Discount (Optional)
- "Mention this email for 10% off your first purchase"
- Track redemption to measure email value

### Follow-Up Sequence (Future)
- Day 3: "Here's what's biting this week" (if fishing season)
- Day 7: "Need a license? We can help"

---

## 5. COMPLETION

### Success Criteria
- [ ] Automation triggers on new signup
- [ ] Email delivers within 5 minutes
- [ ] Links work (directions, shop, etc.)
- [ ] Kim approves tone
