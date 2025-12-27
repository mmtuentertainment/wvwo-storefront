"""
SPEC-11 Visual Testing Script
Tests AdventureGettingThere, AdventureGearChecklist, and AdventureRelatedShop components
on the live Cloudflare Pages preview.
"""
from playwright.sync_api import sync_playwright
import os

PREVIEW_URL = "https://feature-spec-11-adventure-sh.wvwildoutdoors.pages.dev/near/summersville-lake"
SCREENSHOT_DIR = "c:/Users/matth/Desktop/wvwo-storefront/tests/e2e/screenshots"

def ensure_screenshot_dir():
    os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def test_spec_11_components():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()

        print("")
        print("=" * 60)
        print("SPEC-11 Adventure Shared Components - Visual Testing")
        print("=" * 60)
        print("")

        # Navigate to the page
        print("[1] Navigating to: " + PREVIEW_URL)
        page.goto(PREVIEW_URL, wait_until="networkidle")
        print("    [OK] Page loaded successfully")

        # Take full page screenshot
        ensure_screenshot_dir()
        page.screenshot(path=SCREENSHOT_DIR + "/01-full-page.png", full_page=True)
        print("    [OK] Full page screenshot saved")

        # Test AdventureGettingThere component
        print("")
        print("[2] Testing AdventureGettingThere Component")
        getting_there = page.locator('section[aria-labelledby^="adventure-getting-there"]')
        if getting_there.count() > 0:
            print("    [OK] Section found with aria-labelledby")
            getting_there.scroll_into_view_if_needed()
            page.wait_for_timeout(500)
            getting_there.screenshot(path=SCREENSHOT_DIR + "/02-getting-there.png")
            print("    [OK] Screenshot saved")

            # Check for heading
            heading = page.locator('h2[id^="adventure-getting-there"]')
            if heading.count() > 0:
                heading_text = heading.inner_text()
                print("    [OK] Heading: '" + heading_text + "'")

            # Check for Google Maps link
            maps_link = getting_there.locator('a[href*="maps.google.com"], a[href*="goo.gl/maps"]')
            if maps_link.count() > 0:
                target = maps_link.get_attribute("target")
                rel = maps_link.get_attribute("rel")
                print("    [OK] Google Maps link found")
                print("      - target=\"" + str(target) + "\"")
                print("      - rel=\"" + str(rel) + "\"")
            else:
                print("    [WARN] Google Maps link not found")

            # Check for drive stats
            stats = getting_there.locator('.flex.items-center.gap-2')
            if stats.count() > 0:
                print("    [OK] Drive stats displayed (" + str(stats.count()) + " items)")
        else:
            print("    [FAIL] AdventureGettingThere section NOT found")

        # Test AdventureGearChecklist component
        print("")
        print("[3] Testing AdventureGearChecklist Component")
        gear_checklist = page.locator('section[aria-labelledby^="adventure-gear-checklist"]')
        if gear_checklist.count() > 0:
            print("    [OK] Section found with aria-labelledby")
            gear_checklist.scroll_into_view_if_needed()
            page.wait_for_timeout(500)
            gear_checklist.screenshot(path=SCREENSHOT_DIR + "/03-gear-checklist.png")
            print("    [OK] Screenshot saved")

            # Check for heading
            heading = page.locator('h2[id^="adventure-gear-checklist"]')
            if heading.count() > 0:
                heading_text = heading.inner_text()
                print("    [OK] Heading: '" + heading_text + "'")

            # Check for gear items
            gear_items = gear_checklist.locator('li')
            if gear_items.count() > 0:
                print("    [OK] Gear items found: " + str(gear_items.count()))

                # Check for required items (checkmark icon)
                required_items = gear_checklist.locator('li:has(svg.text-sign-green)')
                optional_items = gear_checklist.locator('li:has-text("(optional)")')
                print("      - Required items with sign-green checkmark: " + str(required_items.count()))
                print("      - Optional items: " + str(optional_items.count()))

            # Check for footer slot (CTA)
            footer_cta = gear_checklist.locator('a[href*="/shop"]')
            if footer_cta.count() > 0:
                cta_text = footer_cta.first.inner_text()
                print("    [OK] Footer CTA found: '" + cta_text + "'")
        else:
            print("    [FAIL] AdventureGearChecklist section NOT found")

        # Test AdventureRelatedShop component
        print("")
        print("[4] Testing AdventureRelatedShop Component")
        related_shop = page.locator('section[aria-labelledby^="adventure-related-shop"]')
        if related_shop.count() > 0:
            print("    [OK] Section found with aria-labelledby")
            related_shop.scroll_into_view_if_needed()
            page.wait_for_timeout(500)
            related_shop.screenshot(path=SCREENSHOT_DIR + "/04-related-shop.png")
            print("    [OK] Screenshot saved")

            # Check for heading
            heading = page.locator('h2[id^="adventure-related-shop"]')
            if heading.count() > 0:
                heading_text = heading.inner_text()
                print("    [OK] Heading: '" + heading_text + "'")

            # Check for category cards
            category_cards = related_shop.locator('a.block.border-l-4')
            if category_cards.count() > 0:
                print("    [OK] Category cards found: " + str(category_cards.count()))

                # Check first card's href
                first_href = category_cards.first.get_attribute("href")
                print("      - First card href: " + str(first_href))

            # Check for main CTA button
            main_cta = related_shop.locator('a.bg-sign-green, a:has-text("Visit Our Shop"), a:has-text("Browse")')
            if main_cta.count() > 0:
                cta_text = main_cta.first.inner_text()
                print("    [OK] Main CTA button: '" + cta_text + "'")
        else:
            print("    [FAIL] AdventureRelatedShop section NOT found")

        # Test hover effects on category cards
        print("")
        print("[5] Testing Hover Effects")
        if related_shop.count() > 0:
            category_cards = related_shop.locator('a.block.border-l-4')
            if category_cards.count() > 0:
                first_card = category_cards.first

                # Screenshot before hover
                first_card.screenshot(path=SCREENSHOT_DIR + "/05-card-before-hover.png")
                print("    [OK] Card before hover screenshot saved")

                # Hover over card
                first_card.hover()
                page.wait_for_timeout(400)

                # Screenshot after hover
                first_card.screenshot(path=SCREENSHOT_DIR + "/06-card-after-hover.png")
                print("    [OK] Card after hover screenshot saved")
                print("    [OK] Compare screenshots to verify hover effect")

        # Check WVWO aesthetic compliance
        print("")
        print("[6] WVWO Aesthetic Compliance Checks")

        # Check for forbidden rounded classes
        page_html = page.content()
        forbidden_rounded = ["rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl"]
        found_forbidden = [r for r in forbidden_rounded if r in page_html]
        if found_forbidden:
            print("    [FAIL] FORBIDDEN rounded classes found: " + str(found_forbidden))
        else:
            print("    [OK] No forbidden rounded classes (only rounded-sm allowed)")

        # Check for brand colors in use
        brand_colors = ["sign-green", "brand-brown", "brand-mud", "brand-cream", "brand-orange"]
        found_colors = [c for c in brand_colors if c in page_html]
        print("    [OK] Brand colors in use: " + str(found_colors))

        # Check for forbidden colors
        forbidden_colors = ["purple", "pink-", "backdrop-blur", "glassmorphism"]
        found_forbidden_colors = [c for c in forbidden_colors if c in page_html.lower()]
        if found_forbidden_colors:
            print("    [FAIL] Forbidden styles found: " + str(found_forbidden_colors))
        else:
            print("    [OK] No forbidden styles (purple, pink, glassmorphism)")

        # Mobile viewport test
        print("")
        print("[7] Mobile Viewport Test (375px)")
        context.close()
        mobile_context = browser.new_context(viewport={"width": 375, "height": 667})
        mobile_page = mobile_context.new_page()
        mobile_page.goto(PREVIEW_URL, wait_until="networkidle")

        # Scroll to gear checklist and screenshot
        gear_mobile = mobile_page.locator('section[aria-labelledby^="adventure-gear-checklist"]')
        if gear_mobile.count() > 0:
            gear_mobile.scroll_into_view_if_needed()
            mobile_page.wait_for_timeout(500)
            gear_mobile.screenshot(path=SCREENSHOT_DIR + "/07-gear-mobile.png")
            print("    [OK] Mobile gear checklist screenshot saved")
            print("    [OK] Verify single-column layout in screenshot")

        mobile_context.close()
        browser.close()

        print("")
        print("=" * 60)
        print("Testing Complete! Screenshots saved to:")
        print("  " + SCREENSHOT_DIR)
        print("=" * 60)
        print("")

if __name__ == "__main__":
    test_spec_11_components()
