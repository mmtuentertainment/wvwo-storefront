# SPEC 4: Email Templates

## 1. SPECIFICATION

### 1.1 Objective
Create Buttondown email templates for each report type that match WVWO brand voice and drive traffic to the website.

### 1.2 Requirements
| Req | Description | Priority |
|-----|-------------|----------|
| R1 | Template for hunting reports | Must |
| R2 | Template for fishing reports | Must |
| R3 | Template for restock alerts | Should |
| R4 | Kim's voice in all templates | Must |
| R5 | Mobile-friendly rendering | Must |
| R6 | Link to web archive | Must |
| R7 | Unsubscribe link (Buttondown auto) | Must |

### 1.3 Constraints
- Buttondown markdown format
- No complex HTML (plain text fallback)
- Must work in all email clients

---

## 2. PSEUDOCODE

### Hunting Report Template


```markdown
Subject: [FIELD REPORT] {title}

---

Hey y'all, Kim here from WV Wild Outdoors.

{body - Kim's voice, 2-4 paragraphs}

**Quick Stats:**
- Where: {location.name}
- What: {species.join(", ")}
- Conditions: {conditions.activity}

{conditions.bestBait && "What's working: " + conditions.bestBait}

[Read full report on our website]({websiteUrl}/reports/{slug})

---

**Need gear before you head out?**
We're at US 19 in Birch River, right off I-79 Exit 57.
Mon-Sat 10am-5pm | (304) 649-2607

Grand love ya,
Kim

---
[Unsubscribe] | [View in browser]

```

### Fishing Report Template


```markdown
Subject: [FISHING REPORT] {title}

---

Hey y'all, Kim here.

{body}

**The Breakdown:**
- Spot: {location.name}
- Species: {species.join(", ")}
- Water: {conditions.water}
- What's hitting: {conditions.bestBait}

[Full report + tips →]({websiteUrl}/reports/{slug})

---

Got your license? We're a DNR agent - stop by before you head out.

Grand love ya,
Kim

---

```

---

## 3. ARCHITECTURE


```
Buttondown Account
├── Templates/
│   ├── hunting-report.md
│   ├── fishing-report.md
│   └── restock-alert.md
└── Subscribers/
    ├── Tag: hunter
    ├── Tag: angler
    └── Tag: local / highway

```

---

## 4. REFINEMENT

### Personalization
- Use subscriber first name if available
- Consider segmented sends (hunters get hunting, anglers get fishing)

### A/B Testing
- Subject line variations: "[FIELD REPORT]" vs. specific content
- Test: location in subject vs. species in subject

---

## 5. COMPLETION

### Success Criteria
- [ ] Templates saved in Buttondown
- [ ] Test email renders correctly on mobile
- [ ] Links to website work
- [ ] Unsubscribe works
- [ ] Kim approves voice/tone
