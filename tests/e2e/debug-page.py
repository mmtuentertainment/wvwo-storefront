"""Debug script to inspect what's on the preview page."""
from playwright.sync_api import sync_playwright
import os

PREVIEW_URL = "https://feature-spec-11-adventure-sh.wvwildoutdoors.pages.dev/near/summersville-lake"
SCREENSHOT_DIR = "c:/Users/matth/Desktop/wvwo-storefront/tests/e2e/screenshots"

def debug_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 3000})
        page = context.new_page()

        print("Loading page...")
        page.goto(PREVIEW_URL, wait_until="networkidle")

        # Save full page screenshot
        os.makedirs(SCREENSHOT_DIR, exist_ok=True)
        page.screenshot(path=SCREENSHOT_DIR + "/debug-fullpage.png", full_page=True)
        print("Full page screenshot saved")

        # Find all sections with aria-labelledby
        sections = page.locator('section[aria-labelledby]')
        print("\nSections with aria-labelledby: " + str(sections.count()))
        for i in range(sections.count()):
            section = sections.nth(i)
            labelledby = section.get_attribute("aria-labelledby")
            print("  - " + str(labelledby))

        # Find all h2 headings
        print("\nAll h2 headings on page:")
        h2s = page.locator('h2')
        for i in range(h2s.count()):
            h2 = h2s.nth(i)
            h2_id = h2.get_attribute("id")
            h2_text = h2.inner_text()
            print("  - id='" + str(h2_id) + "' text='" + h2_text[:50] + "'")

        # Check if page has "Getting There" text anywhere
        print("\nSearching for key text...")
        content = page.content()
        if "Getting There" in content:
            print("  [FOUND] 'Getting There' text exists on page")
        else:
            print("  [MISSING] 'Getting There' text NOT on page")

        if "Gear Checklist" in content:
            print("  [FOUND] 'Gear Checklist' text exists on page")
        else:
            print("  [MISSING] 'Gear Checklist' text NOT on page")

        if "Shop Related" in content or "Related Items" in content:
            print("  [FOUND] Shop related text exists on page")
        else:
            print("  [MISSING] Shop related text NOT on page")

        # Check for component imports
        if "AdventureGettingThere" in content:
            print("  [FOUND] AdventureGettingThere component rendered")
        else:
            print("  [MISSING] AdventureGettingThere component NOT rendered")

        browser.close()

if __name__ == "__main__":
    debug_page()
