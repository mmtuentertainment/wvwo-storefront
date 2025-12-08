# Antigravity Agent Plan: Fix CodeRabbit Review Issues

**Target**: `scripts/directus-seed-data.sh` and `scripts/cleanup-docker.ps1`  
**Model**: Gemini 3 Pro (High Thinking Mode)  
**Platform**: Google Antigravity IDE (Free Preview)  
**Execution**: Multi-Agent Parallel Processing  
**Total Issues**: 5 (1 Critical, 2 High, 2 Medium)  
**Estimated Time**: 30 minutes (all agents working in parallel)

---

## 🎯 Master Prompt for Antigravity Manager Surface

Copy this prompt into the **Manager Surface** in Antigravity IDE:

```
[GOAL]
Fix all 5 CodeRabbit review issues in the wvwo-storefront repository scripts. These are blocking PR #6 from merging.

[CONTEXT]
CodeRabbit flagged 5 issues during automated review:

1. **JSON Injection Vulnerability** (CRITICAL)
   - File: scripts/directus-seed-data.sh
   - Lines: 100-128
   - Issue: Embedding $data into double-quoted JS string causes injection risk
   - Impact: Script fails on valid JSON with quotes; potential security vulnerability

2. **Shellcheck SC2155 - Masked Return Value** (HIGH)
   - File: scripts/directus-seed-data.sh
   - Lines: 78-97
   - Issue: Declaring and assigning in one line masks pipeline return value
   - Impact: set -euo pipefail can't catch Docker command failures

3. **Duplicate Announcements on Re-runs** (HIGH)
   - File: scripts/directus-seed-data.sh
   - Lines: 263-269
   - Issue: Uses insert_item instead of check_or_insert_item
   - Impact: Re-running script creates duplicate announcement records

4. **Confusing URL Variables** (MEDIUM)
   - File: scripts/directus-seed-data.sh
   - Lines: 29-37
   - Issue: BASE_URL and DIRECTUS_INTERNAL_URL have identical values
   - Impact: Unclear intent for future maintainers

5. **Redundant PowerShell try/catch** (MEDIUM)
   - File: scripts/cleanup-docker.ps1
   - Lines: 24-54
   - Issue: try/catch around native docker.exe calls never executes catch block
   - Impact: Misleading error handling; failures not properly reported

[AGENT STRATEGY]
Spawn 5 parallel agents in the Manager Surface, one per issue. Each agent should:
1. Read the specific file and lines mentioned
2. Understand the root cause
3. Implement the fix
4. Verify the fix works
5. Generate Artifacts for review

[VERIFICATION REQUIREMENTS]
After all agents complete:
- Run `shellcheck scripts/directus-seed-data.sh` → Must pass with 0 warnings
- Run `scripts/directus-seed-data.sh` twice → Verify no duplicate announcements in Directus admin UI
- Test JSON injection fix → Pass JSON with double quotes, verify no errors
- Review PowerShell script → Confirm $LASTEXITCODE checks work correctly

[ARTIFACTS TO GENERATE]
Each agent must create:
1. **Code Diff Artifact** - Before/after comparison
2. **Verification Artifact** - Test results proving the fix works
3. **Explanation Artifact** - Why this fix solves the root cause

Final summary agent creates:
4. **Master Summary Artifact** - All fixes, verification results, and shellcheck output

[CONSTRAINTS]
- Maintain idempotency for all collections (no duplicates on re-run)
- Don't break existing functionality
- Follow bash best practices (shellcheck compliance)
- Use stdin for JSON data (not inline embedding)
- PowerShell must use $LASTEXITCODE, not try/catch for native exes

[EXECUTION MODE]
- Use Gemini 3 Pro with HIGH thinking mode
- Enable browser automation for Directus UI verification
- Use terminal for shellcheck and script execution
- Work in parallel across all 5 issues
```

---

## 📋 Individual Agent Prompts (If Using Separate Agents)

### Agent 1: Fix JSON Injection Vulnerability ⏱️ 8 min

```
[GOAL]
Fix the JSON injection vulnerability in scripts/directus-seed-data.sh lines 100-128.

[CONTEXT]
The current code embeds $data directly into a double-quoted JavaScript string:
```bash
docker exec directus node -e "
  const data = $data;  // VULNERABLE
  // ...
"
```

This breaks when $data contains unescaped double quotes and creates a security risk.

[SOLUTION APPROACH]
Replace inline embedding with stdin-based approach:
```bash
echo "$data" | docker exec -i directus node -e "
  const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
  // ...
"
```

[VERIFICATION]
1. Create test JSON with double quotes: `{"message":"Test \"quoted\" string"}`
2. Run the patched function with this JSON
3. Verify no errors occur
4. Capture terminal output as Artifact

[ARTIFACTS]
1. Code diff showing the fix
2. Test execution showing JSON with quotes works
3. Explanation of why stdin approach is safer

[THINKING MODE]
Use HIGH thinking to ensure the fix handles all edge cases (nested quotes, escaped characters, etc.)
```

---

### Agent 2: Fix Shellcheck SC2155 ⏱️ 5 min

```
[GOAL]
Fix the shellcheck SC2155 warning in scripts/directus-seed-data.sh lines 78-97.

[CONTEXT]
Current code:
```bash
local exists=$(docker exec ... | grep -c '"id"' || true)
```

Shellcheck warns: "Declare and assign separately to avoid masking return values."

If `docker exec` fails, `set -euo pipefail` won't catch it because the assignment masks the error.

[SOLUTION APPROACH]
Declare first, then assign:
```bash
local exists
exists=$(docker exec ... | grep -c '"id"' || true)
```

[VERIFICATION]
1. Run `shellcheck scripts/directus-seed-data.sh`
2. Verify SC2155 warning is gone
3. Capture shellcheck output as Artifact

[ARTIFACTS]
1. Code diff showing the fix
2. Shellcheck output (clean pass)
3. Explanation of why this prevents masked errors

[THINKING MODE]
Use LOW thinking (straightforward fix)
```

---

### Agent 3: Add Idempotency to Announcements ⏱️ 7 min

```
[GOAL]
Make the announcements collection idempotent in scripts/directus-seed-data.sh lines 263-269.

[CONTEXT]
Current code uses `insert_item` instead of `check_or_insert_item`:
```bash
insert_item "announcements" '{
    "status":"published",
    "message":"Buck season opens Nov 25 - we have your gear!",
    ...
}'
```

Re-running the script creates duplicate announcements, cluttering the admin UI.

[SOLUTION APPROACH]
1. Add a `title` field to the announcement JSON (or use a slug)
2. Change to `check_or_insert_item` with a stable key:
```bash
check_or_insert_item "announcements" "buck-season-nov" '{
    "status":"published",
    "title":"Buck Season Opening",
    "message":"Buck season opens Nov 25 - we have your gear!",
    ...
}'
```

[VERIFICATION]
1. Run `scripts/directus-seed-data.sh` twice
2. Open Directus admin UI in browser (http://localhost:8055/admin)
3. Navigate to announcements collection
4. Verify only 1 announcement exists (not 2)
5. Capture screenshot as Artifact

[ARTIFACTS]
1. Code diff showing the fix
2. Browser screenshot of Directus admin showing single announcement
3. Terminal output showing script ran twice successfully

[THINKING MODE]
Use HIGH thinking to determine the best stable key strategy
```

---

### Agent 4: Clarify URL Variables ⏱️ 4 min

```
[GOAL]
Clarify the purpose of BASE_URL and DIRECTUS_INTERNAL_URL in scripts/directus-seed-data.sh lines 29-37.

[CONTEXT]
Current code:
```bash
BASE_URL="http://localhost:8055"
DIRECTUS_INTERNAL_URL="http://localhost:8055"  # Same value, unclear why
```

Two variables with identical values is confusing for maintainers.

[SOLUTION APPROACH - Option A: Collapse]
```bash
DIRECTUS_URL="http://localhost:8055"
# Use DIRECTUS_URL everywhere
```

[SOLUTION APPROACH - Option B: Clarify]
```bash
BASE_URL="http://localhost:8055"  # External access (browser, curl)
DIRECTUS_INTERNAL_URL="http://directus:8055"  # Container-to-container calls
# Note: Currently both point to localhost; update INTERNAL_URL if using Docker network
```

[VERIFICATION]
1. Review the script to see if both variables are actually used differently
2. If they're used the same way, collapse to one variable
3. If they're meant for different purposes, add clarifying comments
4. Run the script to ensure it still works

[ARTIFACTS]
1. Code diff showing the fix
2. Explanation of which approach was chosen and why
3. Terminal output showing script still works

[THINKING MODE]
Use HIGH thinking to analyze variable usage patterns throughout the script
```

---

### Agent 5: Fix PowerShell try/catch ⏱️ 6 min

```
[GOAL]
Fix the redundant try/catch blocks in scripts/cleanup-docker.ps1 lines 24-54.

[CONTEXT]
Current code:
```powershell
try {
    docker stop container
} catch {
    Write-Host "Error stopping container"  # Never executes
}
```

Native executables like `docker.exe` set `$LASTEXITCODE`, not throw exceptions. The `catch` block never runs.

[SOLUTION APPROACH]
Replace try/catch with $LASTEXITCODE checks:
```powershell
docker stop container
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error stopping container (exit code: $LASTEXITCODE)"
}
```

[VERIFICATION]
1. Run the PowerShell script
2. Verify error handling works correctly
3. Test with a non-existent container to trigger an error
4. Capture terminal output showing proper error reporting

[ARTIFACTS]
1. Code diff showing all try/catch blocks fixed
2. Terminal output showing error handling works
3. Explanation of PowerShell native exe behavior

[THINKING MODE]
Use LOW thinking (straightforward PowerShell semantics)
```

---

## 🔄 Execution Workflow in Antigravity

### Step 1: Open Antigravity IDE
1. Launch Antigravity
2. Open the `wvwo-storefront` repository
3. Switch to the `002-directus-cms-setup` branch

### Step 2: Open Manager Surface
1. Click the **Manager** tab (not Editor)
2. This is where you orchestrate agents

### Step 3: Configure Gemini 3 Pro
1. Select **Gemini 3 Pro** from model dropdown
2. Set thinking level to **HIGH**
3. Enable browser automation

### Step 4: Paste Master Prompt
1. Paste the Master Prompt into the Manager Surface
2. Click "Spawn Agents" or "Execute"
3. Antigravity will automatically create 5 agents

### Step 5: Monitor Agent Progress
Watch the Manager Surface as agents work in parallel:
- **Agent 1**: Fixing JSON injection...
- **Agent 2**: Running shellcheck...
- **Agent 3**: Opening Directus in browser...
- **Agent 4**: Analyzing variable usage...
- **Agent 5**: Testing PowerShell script...

### Step 6: Review Artifacts
As agents complete, they'll generate Artifacts:
- Code diffs
- Screenshots
- Test results
- Verification outputs

### Step 7: Provide Feedback (If Needed)
If an Artifact shows an issue:
1. Click the Artifact
2. Add a comment (like Google Docs)
3. The agent will incorporate feedback and re-execute

### Step 8: Final Verification
Once all agents complete:
1. Review the Master Summary Artifact
2. Verify all 5 issues are fixed
3. Check shellcheck output is clean
4. Confirm no duplicate announcements

### Step 9: Commit Changes
1. Switch to Editor View
2. Review the code changes
3. Commit with message: `fix: resolve 5 CodeRabbit review issues`
4. Push to `002-directus-cms-setup` branch

---

## ✅ Success Criteria

### All Agents Must Achieve:
- ✅ Code changes committed
- ✅ Shellcheck passes with 0 warnings
- ✅ Script runs twice with no duplicates
- ✅ JSON with quotes doesn't break script
- ✅ PowerShell error handling works
- ✅ All Artifacts generated and reviewed

### Final Checklist:
- [ ] Agent 1: JSON injection fixed and tested
- [ ] Agent 2: Shellcheck SC2155 resolved
- [ ] Agent 3: Announcements idempotent (verified in browser)
- [ ] Agent 4: URL variables clarified
- [ ] Agent 5: PowerShell try/catch fixed
- [ ] Master Summary Artifact reviewed
- [ ] All changes committed to branch
- [ ] PR #6 ready for re-review

---

## 🚀 Expected Outcome

After running this plan in Antigravity:

1. **All 5 issues fixed** in ~30 minutes (parallel execution)
2. **Artifacts generated** for easy review (no log diving)
3. **Verification complete** (shellcheck, browser tests, script re-runs)
4. **PR #6 unblocked** (CodeRabbit review issues resolved)
5. **Ready to merge** into main branch

---

## 💡 Why This Approach Works

### Traditional Approach (Manual)
- Fix issues one by one (serial)
- Context switch between files
- Manual testing and verification
- Read raw logs to debug
- **Total time: 2-3 hours**

### Antigravity Approach (Agent-First)
- Fix all issues in parallel (5 agents)
- Agents handle context automatically
- Automated testing and verification
- Review Artifacts, not logs
- **Total time: 30 minutes**

### Key Advantages:
1. **Parallel execution** - All 5 issues fixed simultaneously
2. **Autonomous verification** - Agents test their own fixes
3. **Artifact-based review** - Visual diffs, screenshots, test results
4. **Browser automation** - Agents verify Directus UI changes
5. **High thinking mode** - Deep reasoning for complex issues (JSON injection)

---

## 📚 Prompting Best Practices Applied

This plan follows Antigravity best practices:

✅ **Task-oriented prompts** (not step-by-step instructions)  
✅ **Verification criteria specified** (how to know when done)  
✅ **Artifacts requested** (code diffs, screenshots, test results)  
✅ **Browser automation leveraged** (Directus UI verification)  
✅ **Multi-agent orchestration** (parallel execution)  
✅ **Context provided** (why each issue matters)  
✅ **Thinking mode specified** (HIGH for complex, LOW for simple)

---

## 🎯 Next Steps

1. **Copy the Master Prompt** above
2. **Open Antigravity Manager Surface**
3. **Paste and execute**
4. **Monitor agent progress**
5. **Review Artifacts**
6. **Commit changes**
7. **Update PR #6**

**Estimated Total Time**: 30 minutes (agents working) + 10 minutes (review) = **40 minutes**

---

## 📝 Notes

- This plan assumes you have Antigravity IDE installed with free preview access
- Gemini 3 Pro is available with generous rate limits during preview
- If any agent fails, you can re-spawn it individually with the specific agent prompt
- Artifacts are stored in the Antigravity workspace for future reference
- The Manager Surface allows you to observe all agents simultaneously

---

**Ready to execute? Open Antigravity and paste the Master Prompt into the Manager Surface!** 🚀
