# Claude Chrome Extension Research Prompts for SPEC-25

**Purpose**: Use Claude Chrome Extension's unique DOM access and screenshot capabilities to gather better context for fixing the StateParkTemplate flatMap bug.

**Setup**: Run `claude --chrome` in terminal to enable integration.

---

## Prompt 1: Extract Live StateParkTemplate Component Code

```
Navigate to the GitHub repository https://github.com/withastro/astro and search for "StateParkTemplate" or similar state park template examples.

If not found in Astro repo, search Google for "Astro state park template component 2026" and open the top 3 results.

For each result:
1. Take a screenshot of any code examples
2. Extract the complete component code (especially how it handles facilities.lodging.cabins)
3. Read console for any TypeScript errors
4. Copy all code snippets that show flatMap usage with optional nested properties

Save findings as structured data with source URLs.
```

---

## Prompt 2: Analyze Zod Schema Validation Patterns

```
Navigate to https://zod.dev and https://github.com/colinhacks/zod

Search for:
- "safeParse nested objects"
- "optional chaining"
- "type guard for optional properties"

Extract:
1. Code examples showing safeParse() with nested optional objects
2. Best practices for checking if object.property.nestedProperty exists
3. Type guard patterns for runtime validation
4. Screenshot any diagrams or flowcharts

Focus on 2025-2026 documentation (latest version).
```

---

## Prompt 3: Live Debug the Actual flatMap Error

```
IF you have access to localhost:

1. Navigate to http://localhost:4321/near/state-park/stonewall-resort/
2. Open Chrome DevTools console
3. Screenshot the exact error message and stack trace
4. Inspect the DOM to see what actually rendered (if anything)
5. In console, type: `stateParkData` and screenshot the object structure
6. In console, type: `stateParkData.facilities` and check what it returns
7. In console, type: `typeof stateParkData.facilities?.flatMap` and report result

Extract the EXACT error location (file:line) and context.
```

---

## Prompt 4: Compare Working vs Broken Data Files

```
Navigate to the local file system (if extension allows):

Compare these two files side-by-side:
- wv-wild-web/src/data/state-parks/holly-river-sp.ts (WORKS)
- wv-wild-web/src/data/state-parks/stonewall-resort.ts (BROKEN)

Extract:
1. Screenshot the `facilities` object structure in both files
2. Identify ANY structural differences
3. Check export names (hollyRiverStatePark vs stonewallResort)
4. Verify both import from same type file
5. Compare nesting depth and property names

Report differences in table format.
```

---

## Prompt 5: Search Astro GitHub Issues for flatMap Bugs

```
Navigate to https://github.com/withastro/astro/issues

Search for:
- "flatMap is not a function"
- "optional chaining template"
- "facilities undefined"

Filter to:
- Open and Closed issues
- Created after January 2025
- Labels: bug, typescript

Extract:
1. Issue numbers and titles
2. Proposed solutions or workarounds
3. Any official Astro team responses
4. Screenshot accepted solutions

Prioritize issues marked as "closed" with accepted solutions.
```

---

## Prompt 6: Extract Astro 5 Migration Guide

```
Navigate to https://docs.astro.build/en/guides/upgrade-to/v5/

Search the page for:
- "import.meta.glob"
- "TypeScript"
- "breaking changes"
- "optional properties"

Extract:
1. Any changes to how import.meta.glob handles TypeScript generics
2. Breaking changes affecting nested object access
3. New best practices for template property access
4. Screenshot migration guide sections

Focus on sections relevant to dynamic routes and getStaticPaths.
```

---

## Prompt 7: Live Test Type Guard Pattern

```
Open Chrome DevTools console on ANY page.

Test these TypeScript patterns:

```javascript
// Pattern 1: Safe array check before flatMap
const facilities = { lodging: { cabins: [1, 2, 3] } };
const result1 = Array.isArray(facilities?.lodging?.cabins)
  ? facilities.lodging.cabins.flatMap(x => x)
  : [];
console.log("Pattern 1:", result1);

// Pattern 2: Nullish coalescing with array default
const result2 = (facilities?.lodging?.cabins ?? []).flatMap(x => x);
console.log("Pattern 2:", result2);

// Pattern 3: Optional chaining with conditional
const result3 = facilities?.lodging?.cabins?.flatMap?.(x => x) ?? [];
console.log("Pattern 3:", result3);
```

Screenshot results and report which pattern works most reliably.
```

---

## Expected Outputs

After running these 7 prompts with Claude Chrome Extension, you should have:

1. ✅ Current Astro template patterns (2026)
2. ✅ Zod safeParse best practices
3. ✅ Exact error context from live debugging
4. ✅ Structural diff between working/broken files
5. ✅ GitHub issues with accepted solutions
6. ✅ Astro 5 migration guide insights
7. ✅ Validated type guard patterns

**Combine this with Context7 research** to create the ultimate fix.

---

## How to Execute

1. Open Claude Desktop or claude.com
2. Ensure Chrome extension is installed and enabled
3. Run `claude --chrome` if using CLI
4. Copy each prompt above
5. Let Claude Chrome Extension gather the data
6. Report findings back to me for analysis

**Sources**:
- [Claude in Chrome: Your Browser Just Got Hands (And Eyes)](https://medium.com/@creativeaininja/claude-in-chrome-your-browser-just-got-hands-and-eyes-c53b1b193856)
- [Claude in Chrome Release Notes](https://support.claude.com/en/articles/12306336-claude-in-chrome-release-notes)
- [Use Claude Code with Chrome](https://code.claude.com/docs/en/chrome)
- [Getting Started with Claude in Chrome](https://support.claude.com/en/articles/12012173-getting-started-with-claude-in-chrome)
