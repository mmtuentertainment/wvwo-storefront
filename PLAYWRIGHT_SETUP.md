# Playwright MCP Setup - WV Wild Outdoors Project

> **Status:** Installed Dec 3, 2024
> **Configuration:** Persistent Profile (Option 1)

---

## What Was Installed

**Playwright MCP Server** - Browser automation for intelligence gathering

**Location:** Configured in `C:\Users\matth\.claude.json`

**Command:** `npx @playwright/mcp@latest`

---

## How It Works

1. **First use:** Playwright launches a Chromium browser
2. **You log into Facebook** in that browser (one time)
3. **Session is saved** in persistent storage
4. **Future sessions:** Fully automatic, no re-login needed

---

## Next Steps (After Restart)

### 1. Restart Claude Code
The MCP server needs a restart to activate.

### 2. First-Time Facebook Login
When you first use Playwright to visit Facebook:
- A Chromium browser window will open
- Navigate to facebook.com
- Log in with your credentials
- The session will be saved automatically

### 3. Facebook Data Extraction Tasks

Once logged in, ask Claude Code to:

#### **Task 1: WV Wild Outdoors Page Analysis**
```
Navigate to WV Wild Outdoors Facebook page and extract:
- Last 5 posts (content, date, type)
- Post frequency pattern
- Engagement (likes, comments, shares per post)
- About section (hours, address, phone, description)
- Check for Shop tab or Marketplace listings
- Messenger response time indicator
- Take screenshots of the page
```

#### **Task 2: Competitor Facebook Analysis**
```
Check if these competitors have Facebook pages:
- T&T Outdoors (Mt. Nebo)
- Smarrs Outdoor Services (Flatwoods)
- Friendly Bass & Buck (Summersville)

For each, extract:
- Follower count
- Post frequency
- What content they share
```

#### **Task 3: Competitor Website Scraping**
```
Visit and analyze:
- crossroadsgeneral.com
- valleyoutdoorswv.com
- apptactoutfitters.com

Extract:
- Page structure
- Copy/messaging tone
- What services they highlight
- Hours presentation
- Contact info placement
- Screenshots for reference
```

---

## Storage Location

**Browser profile:** `%LOCALAPPDATA%\ms-playwright` (or similar platform cache)

**Screenshots/Data:** Can be saved to project directory

---

## Troubleshooting

**If MCP tools don't appear after restart:**
- Check `C:\Users\matth\.claude.json` for playwright config
- Ensure Node.js is accessible (run `node --version`)
- Reinstall: `claude mcp add playwright npx @playwright/mcp@latest`

**If Facebook login doesn't persist:**
- Check browser profile permissions
- May need to manually specify `--user-data-dir` path

**If browser doesn't launch:**
- Playwright browsers may need installation
- Run: `npx playwright install chromium`

---

## Commands You Can Use

Once MCP is active, you'll have access to Playwright browser automation tools through Claude Code. Simply ask Claude to:
- "Navigate to [URL]"
- "Take a screenshot of [page]"
- "Extract text from [element]"
- "Click on [button/link]"
- "Fill out [form]"

---

## Security Notes

- Your Facebook credentials are stored in the browser profile
- Profile is local to your machine
- Clear profile by deleting `%LOCALAPPDATA%\ms-playwright\*`
- Never commit browser profile to git (already in .gitignore)

---

## Project Integration

**Add to INTELLIGENCE.md:**
- Facebook analysis results
- Competitor findings
- Screenshot references

**Add to .gitignore:**
```
# Browser automation
playwright-profile/
.auth/
screenshots/
*.png
```

---

## What's Next

After restart, start with the WV Wild Outdoors Facebook analysis. This will:
1. Trigger first-time login
2. Save your session
3. Extract the data you need for INTELLIGENCE.md
4. Take screenshots for reference

Then move on to competitor analysis once the session is working.
