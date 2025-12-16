# SPEC 5: Subscriber Segmentation

## 1. SPECIFICATION

### 1.1 Objective
Tag Buttondown subscribers by interest and source so Matt can send relevant content to the right people.

### 1.2 Requirements
| Req | Description | Priority |
|-----|-------------|----------|
| R1 | Tag by interest: hunter / angler / both | Must |
| R2 | Tag by location: local / highway | Should |
| R3 | Tag by source: website / in-store / other | Should |
| R4 | Preference collection at signup | Must |

### 1.3 Constraints
- Buttondown free tier limitations
- Simple checkbox UI (not complex forms)

---

## 2. PSEUDOCODE

```
SUBSCRIBER TAGS:

Interest Tags (pick one or more):
├── hunter     → Gets hunting reports
├── angler     → Gets fishing reports
└── general    → Gets all reports + restocks

Location Tags (pick one):
├── local      → Braxton/Nicholas County area
└── highway    → I-79 corridor visitor

Source Tags (auto-assigned):
├── website    → Signed up on wvwildoutdoors.com
├── instore    → Signed up at shop counter
└── other      → Manual import or other

SEND LOGIC:
- Hunting report → All with "hunter" OR "general" tag
- Fishing report → All with "angler" OR "general" tag
- Restock alert → All with "general" tag
- Local event → All with "local" tag
```

---

## 3. ARCHITECTURE

```html
EmailCapture Component Update:

<form>
  <input type="email" required />

  <fieldset>
    <legend>What interests you?</legend>
    <label><input type="checkbox" name="tag" value="hunter" /> Hunting</label>
    <label><input type="checkbox" name="tag" value="angler" /> Fishing</label>
  </fieldset>

  <button type="submit">Subscribe</button>
</form>
```

---

## 4. REFINEMENT

### Buttondown Integration
- Tags passed via form hidden fields or API
- Verify Buttondown supports multi-tag signup

### Migration
- Existing subscribers → Tag as "general" (get everything)
- Let them update preferences via email link

---

## 5. COMPLETION

### Success Criteria
- [ ] Signup form collects preferences
- [ ] Tags appear in Buttondown dashboard
- [ ] Segmented send works correctly
- [ ] No duplicate emails to multi-tag users
