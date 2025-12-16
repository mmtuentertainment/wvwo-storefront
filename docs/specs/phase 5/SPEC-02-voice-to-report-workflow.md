# SPEC 2: Voice-to-Report Workflow

## 1. SPECIFICATION

### 1.1 Objective
Document the human workflow for Kim to record voice notes and Matt to publish reports. No code - this is process documentation.

### 1.2 Requirements
| Req | Description | Priority |
|-----|-------------|----------|
| R1 | Kim can record on her phone (no app install) | Must |
| R2 | Matt receives within minutes | Must |
| R3 | Transcription takes <15 min | Must |
| R4 | Preserves Kim's authentic voice | Must |
| R5 | Works when Matt is mobile | Should |

### 1.3 Constraints
- Kim is not technical
- Matt manages multiple responsibilities
- No monthly costs for new tools

---

## 2. PSEUDOCODE

```
WORKFLOW: Kim Records Report

1. TRIGGER
   - Kim notices something worth sharing
   - Customer reports good catch/harvest
   - Season opener approaching
   - Ammo restock arrives

2. RECORD (Kim - 2-5 minutes)
   - Open Voice Memos (iPhone) or Recorder (Android)
   - Record naturally: "Hey, it's Kim. Had three customers..."
   - Include: what, where, when, tips
   - Send to Matt via text/Signal

3. RECEIVE (Matt - immediate)
   - Get notification
   - Listen to voice note
   - Decide: publish now or queue for later

4. TRANSCRIBE (Matt - 10-15 minutes)
   - Use phone dictation or Whisper
   - Light edit for clarity (keep Kim's voice)
   - Format as markdown

5. PUBLISH (Matt - 5 minutes)
   - Add to reports.json
   - Git commit + push
   - Send via Buttondown web UI
   - Verify web archive updated

TOTAL TIME: 15-25 minutes per report
```

---

## 3. ARCHITECTURE

```
Kim's Phone          Matt's Phone/Computer       Website + Email
     │                        │                        │
     │  Voice Note            │                        │
     ├───────────────────────>│                        │
     │  (text/Signal)         │                        │
     │                        │  Transcribe            │
     │                        │  (dictation/Whisper)   │
     │                        │                        │
     │                        │  Edit reports.json     │
     │                        ├───────────────────────>│
     │                        │  (git push)            │
     │                        │                        │
     │                        │  Send via Buttondown   │
     │                        ├───────────────────────>│
     │                        │                        │
```

---

## 4. REFINEMENT

### Failure Modes
| Issue | Solution |
|-------|----------|
| Kim forgets to record | Weekly reminder text from Matt |
| Voice note too long | Kim re-records shorter version |
| Matt unavailable | Queue in Signal, publish when back |
| Transcription unclear | Matt texts Kim for clarification |

### Quality Gates
- [ ] Voice note <5 minutes
- [ ] Transcription reviewed before publish
- [ ] Kim's voice preserved (no corporate edits)
- [ ] Published same day if time-sensitive

---

## 5. COMPLETION

### Success Criteria
- [ ] Kim comfortable recording (test run)
- [ ] Matt can transcribe in <15 min
- [ ] First 3 reports published successfully
- [ ] Process documented for backup person
