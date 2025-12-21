# SPEC-28: Setup 301 Redirects for Migrated Content

**Status**: Ready for implementation
**Assigned Agent**: `coder` (simple 2-agent pattern)
**Dependencies**: SPEC-21 through SPEC-27 (content migrations)

---

## AgentDB Context Loading

Before starting, load relevant patterns:


```bash
# Parallel context loading
npx agentdb@latest reflexion retrieve "Cloudflare Pages redirects" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "SEO 301 redirects" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "_redirects file syntax" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO" --k 15 --only-successes --min-reward 0.8

```

---

## Task Overview

Create Cloudflare Pages `_redirects` file to handle 301 redirects for all migrated adventure content (SPEC-21 through SPEC-27).

**Why**: Old `/near/*` URLs need to redirect to new content collection routes (`/adventures/*`) to preserve SEO equity and prevent 404s.

**Pattern**: Simple (researcher + coder)

**Special Case**: `burnsville-lake-recreation.astro` merges into `burnsville-lake-wma`, so two old URLs redirect to ONE new URL.

---

## Agent Instructions

### 1. Researcher Agent

**Research Cloudflare Pages _redirects syntax**:


```bash
# WebSearch for official documentation
WebSearch("Cloudflare Pages _redirects file syntax 2025")
WebFetch("<cloudflare_docs_url>", "Summarize _redirects file format, 301 redirect syntax, splat/placeholder patterns, and file location requirements")

```

**Key questions to answer**:
- File location (`public/_redirects` vs root `_redirects`)
- 301 redirect syntax format
- Path handling (absolute vs relative)
- Wildcard/splat support
- Processing order (first match wins vs priority)

**Report findings** via coordination hooks:

```bash
npx claude-flow@alpha hooks post-edit --file "cloudflare-redirects-research.md" --memory-key "swarm/researcher/cloudflare-redirects-syntax"

```

---

### 2. Coder Agent

**Create `_redirects` file** based on researcher's findings.

**File location**:

```
./wv-wild-web\public\_redirects

```

**Redirect mapping** (8 total URLs → 7 destinations):

| Old URL (source) | New URL (destination) | Status |
|------------------|------------------------|--------|
| `/near/burnsville-lake` | `/adventures/burnsville-lake-wma` | 301 |
| `/near/burnsville-lake-recreation` | `/adventures/burnsville-lake-wma` | 301 |
| `/near/elk-river-wma` | `/adventures/elk-river-wma` | 301 |
| `/near/summersville-lake` | `/adventures/summersville-lake` | 301 |
| `/near/sutton-lake` | `/adventures/sutton-lake` | 301 |
| `/near/stonewall-jackson-lake` | `/adventures/stonewall-jackson-lake` | 301 |
| `/near/monongahela-national-forest` | `/adventures/monongahela-national-forest` | 301 |
| `/near/birch-river-recreation` | `/adventures/birch-river-wma` | 301 |

**Special case handling**:
- **TWO old URLs** (`burnsville-lake` + `burnsville-lake-recreation`) → **ONE new URL** (`burnsville-lake-wma`)
- Order matters: Put both redirects explicitly (no wildcards needed for these specific cases)

**File format** (based on researcher's findings):

```
# Adventure content migrations (SPEC-21 through SPEC-27)
# Format: <source_path> <destination_path> <status_code>

/near/burnsville-lake /adventures/burnsville-lake-wma 301
/near/burnsville-lake-recreation /adventures/burnsville-lake-wma 301
/near/elk-river-wma /adventures/elk-river-wma 301
/near/summersville-lake /adventures/summersville-lake 301
/near/sutton-lake /adventures/sutton-lake 301
/near/stonewall-jackson-lake /adventures/stonewall-jackson-lake 301
/near/monongahela-national-forest /adventures/monongahela-national-forest 301
/near/birch-river-recreation /adventures/birch-river-wma 301

```

**Coordinate via hooks**:

```bash
npx claude-flow@alpha hooks post-task --task-id "spec-28-redirects"

```

---

## Testing Strategy

**Manual verification** (post-deployment):

1. **Test old URLs** (should 301 redirect):
   ```
   https://wvwild.com/near/burnsville-lake → /adventures/burnsville-lake-wma
   https://wvwild.com/near/burnsville-lake-recreation → /adventures/burnsville-lake-wma
   https://wvwild.com/near/elk-river-wma → /adventures/elk-river-wma
   ```

2. **Test with curl** (check HTTP status):
   ```bash
   curl -I https://wvwild.com/near/burnsville-lake
   # Should return: HTTP/1.1 301 Moved Permanently
   # Location: /adventures/burnsville-lake-wma
   ```

3. **Google Search Console**:
   - Monitor 404 errors for `/near/*` paths
   - Verify redirects are being followed by Googlebot

**Cloudflare Pages behavior**:
- Redirects processed on every request (no caching issues)
- First matching rule wins (order matters)
- Works with trailing slashes automatically

---

## Validation Checklist

Before marking complete:

- [ ] Researcher documented Cloudflare Pages `_redirects` syntax
- [ ] File created at correct path (`wv-wild-web/public/_redirects`)
- [ ] All 8 source URLs mapped to 7 destinations
- [ ] Special case handled (2 URLs → 1 destination for Burnsville Lake)
- [ ] 301 status codes specified
- [ ] File format follows Cloudflare syntax (verified by researcher)
- [ ] Comments added for clarity
- [ ] Coordination hooks executed
- [ ] Testing strategy documented

---

## Success Criteria

1. Valid `_redirects` file at `/wv-wild-web/public/_redirects`
2. All 8 migrated URLs redirect with 301 status
3. Burnsville Lake merge case handled (2 → 1)
4. File syntax validated against Cloudflare docs
5. Testing strategy documented for post-deployment
6. Pattern logged to AgentDB for future redirect work

---

## WVWO Context

**Why 301 redirects matter**:
- Phase 3 Strategy: Geographic SEO foundation for I-79 highway hunters
- Preserve existing search rankings for "near Birch River" queries
- Prevent 404s for users/bots visiting old `/near/*` URLs
- Signal to Google that content moved permanently (transfer SEO equity)

**Project principles**:
- Quality over speed: Get redirects right, don't rush
- Local + highway: Serve both existing visitors and new I-79 traffic
- SEO matters: We're capturing out-of-state hunters via search

---

## Store Pattern (After Completion)


```bash
# If successful
npx agentdb@latest reflexion store "wvwo-migration" "spec-28-redirects" 1.0 true "2-agent pattern: researcher finds Cloudflare _redirects syntax, coder writes file mapping old /near/* URLs to new /adventures/* routes with 301 status. Special case: 2 URLs redirect to 1 destination for content merge."

# If failed
npx agentdb@latest reflexion store "wvwo-migration" "spec-28-redirects" 0.0 false "<what_went_wrong>"

```
