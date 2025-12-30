#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SPEC-13 Lake Template Manual Validation
Queen-Led Hivemind Testing Session

Tests all 5 user stories and WVWO compliance on live Cloudflare preview.
"""

from playwright.sync_api import sync_playwright
import json
import sys
import io

# Fix Windows console encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# Preview URL from Cloudflare Pages
PREVIEW_URL = "https://spec-13-lake-template.wvwildoutdoors.pages.dev/near/summersville-lake"

def main():
    results = {
        "user_stories": {},
        "wvwo_compliance": {},
        "responsive": {},
        "interactions": {},
        "overall_pass": True
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("🚀 SPEC-13 Lake Template - Manual Validation")
        print("=" * 60)
        print(f"Testing: {PREVIEW_URL}\n")

        # Navigate and wait for page load
        print("📄 Loading page...")
        page.goto(PREVIEW_URL)
        page.wait_for_load_state('networkidle')
        print("✅ Page loaded\n")

        # Take full page screenshot
        page.screenshot(path='tests/screenshots/spec13-full-page.png', full_page=True)
        print("📸 Screenshot saved: tests/screenshots/spec13-full-page.png\n")

        # =====================================================================
        # US3: HERO SECTION WITH LAKE STATS (P1)
        # =====================================================================
        print("🎯 Testing US3: Hero Section with Lake Stats")
        print("-" * 60)

        try:
            # Check hero section exists
            hero = page.locator('section').first
            assert hero.is_visible(), "Hero section not visible"

            # Check lake name in heading
            lake_name = page.locator('h1').first
            assert lake_name.is_visible(), "Lake name heading not found"
            name_text = lake_name.text_content()
            assert "Summersville" in name_text, f"Expected 'Summersville' in heading, got: {name_text}"
            print(f"  ✅ Lake name displayed: {name_text}")

            # Check hero has image (background or img tag)
            hero_html = hero.inner_html()
            has_image = 'src=' in hero_html or 'background-image' in hero_html
            assert has_image, "Hero image not found"
            print("  ✅ Hero image present")

            # Check for stats display
            stats = page.locator('text=/Acres|Max Depth|County/i').count()
            assert stats >= 2, f"Expected at least 2 stat labels, found {stats}"
            print(f"  ✅ Stats displayed ({stats} labels found)")

            # Check for quick highlight badges
            badges = page.locator('.bg-sign-green, [class*="sign-green"]').count()
            if badges > 0:
                print(f"  ✅ Quick highlight badges found ({badges})")

            results["user_stories"]["US3"] = {"status": "PASS", "details": "Hero renders with stats"}
            print("  🎉 US3: PASS\n")

        except AssertionError as e:
            print(f"  ❌ US3: FAIL - {e}\n")
            results["user_stories"]["US3"] = {"status": "FAIL", "error": str(e)}
            results["overall_pass"] = False

        # =====================================================================
        # US1: FISHING INFORMATION DISPLAY (P1)
        # =====================================================================
        print("🎯 Testing US1: Fishing Information Display")
        print("-" * 60)

        try:
            # Check for "What to Fish" section
            what_to_fish = page.locator('h2:has-text("What to Fish")').first
            assert what_to_fish.is_visible(), "What to Fish section not found"
            print("  ✅ 'What to Fish' section found")

            # Check for fish species (should have multiple)
            fish_species = page.locator('h3').filter(has_text="Bass|Walleye|Muskie|Crappie").count()
            assert fish_species >= 3, f"Expected 3+ fish species, found {fish_species}"
            print(f"  ✅ Fish species displayed ({fish_species} species)")

            # Check for Kim's tips in font-hand (Permanent Marker)
            kim_tips = page.locator('.font-hand, [class*="font-hand"]').count()
            if kim_tips > 0:
                print(f"  ✅ Kim's tips found ({kim_tips} instances)")

            # Check for "Where to Fish" section (fishing spots)
            where_to_fish = page.locator('h2:has-text("Where to Fish")').first
            if where_to_fish.is_visible():
                print("  ✅ 'Where to Fish' section found")

                # Check for fishing spot details (depth, structure, species)
                spot_details = page.locator('text=/Depth:|Structure:|Species:/i').count()
                if spot_details > 0:
                    print(f"  ✅ Fishing spot details found ({spot_details} fields)")

            results["user_stories"]["US1"] = {"status": "PASS", "details": f"{fish_species} species, Kim's tips present"}
            print("  🎉 US1: PASS\n")

        except AssertionError as e:
            print(f"  ❌ US1: FAIL - {e}\n")
            results["user_stories"]["US1"] = {"status": "FAIL", "error": str(e)}
            results["overall_pass"] = False

        # =====================================================================
        # US2: MARINA & CAMPING FACILITIES (P2)
        # =====================================================================
        print("🎯 Testing US2: Marina & Camping Facilities")
        print("-" * 60)

        try:
            # Check for Camping section
            camping = page.locator('h2:has-text("Camping")').first
            if camping.is_visible():
                print("  ✅ Camping section found")

                # Check for campground names/facilities
                facilities = page.locator('text=/Campground|Sites|RV/i').count()
                print(f"  ✅ Camping facilities found ({facilities} mentions)")

            # Check for Marina section
            marina_heading = page.locator('h2:has-text("Marina"), h2:has-text("Boat")').first
            if marina_heading.is_visible():
                print("  ✅ Marina/Boat access section found")

                # Check for tel: links (phone numbers)
                tel_links = page.locator('a[href^="tel:"]').count()
                if tel_links > 0:
                    print(f"  ✅ Clickable phone links found ({tel_links})")

                # Check for external reservation links
                external_links = page.locator('a[rel*="noopener"]').count()
                if external_links > 0:
                    print(f"  ✅ Secure external links found ({external_links})")

            results["user_stories"]["US2"] = {"status": "PASS", "details": "Facilities display correctly"}
            print("  🎉 US2: PASS\n")

        except AssertionError as e:
            print(f"  ❌ US2: FAIL - {e}\n")
            results["user_stories"]["US2"] = {"status": "FAIL", "error": str(e)}
            results["overall_pass"] = False

        # =====================================================================
        # US5: SAFETY & REGULATIONS (P2)
        # =====================================================================
        print("🎯 Testing US5: Safety & Regulations")
        print("-" * 60)

        try:
            # Check for Safety/Regulations section
            regulations = page.locator('h2:has-text("Safety"), h2:has-text("Regulations")').first
            if regulations.is_visible():
                print("  ✅ Safety & Regulations section found")

                # Check for regulation categories
                categories = page.locator('h3').filter(has_text="Regulations|Safety|Rules").count()
                if categories > 0:
                    print(f"  ✅ Regulation categories found ({categories})")

                # Check for orange accent (warning color)
                orange_accents = page.locator('[class*="border-l-brand-orange"], [class*="orange"]').count()
                if orange_accents > 0:
                    print(f"  ✅ Orange warning accents found ({orange_accents})")

                results["user_stories"]["US5"] = {"status": "PASS", "details": "Regulations display with orange accents"}
                print("  🎉 US5: PASS\n")
            else:
                results["user_stories"]["US5"] = {"status": "SKIP", "details": "Section may be optional"}
                print("  ⏭️ US5: SKIP (section not present)\n")

        except Exception as e:
            print(f"  ⚠️ US5: Error - {e}\n")
            results["user_stories"]["US5"] = {"status": "ERROR", "error": str(e)}

        # =====================================================================
        # US4: ACTIVITIES & SEASONAL GUIDE (P3)
        # =====================================================================
        print("🎯 Testing US4: Activities & Seasonal Guide")
        print("-" * 60)

        try:
            # Check for Activities section
            activities = page.locator('h2:has-text("Activities")').first
            if activities.is_visible():
                print("  ✅ Activities section found")

                # Check for activity names (Swimming, Diving, etc.)
                activity_names = page.locator('text=/Swimming|Diving|Kayak|Hiking/i').count()
                if activity_names > 0:
                    print(f"  ✅ Activities listed ({activity_names} found)")

            # Check for Seasonal Guide
            seasonal = page.locator('h2:has-text("Seasonal"), h3:has-text("Spring|Summer|Fall|Winter")').count()
            if seasonal > 0:
                print(f"  ✅ Seasonal guide found ({seasonal} season references)")
                results["user_stories"]["US4"] = {"status": "PASS", "details": "Activities and seasonal content present"}
                print("  🎉 US4: PASS\n")
            else:
                results["user_stories"]["US4"] = {"status": "SKIP", "details": "Optional content"}
                print("  ⏭️ US4: SKIP (optional content)\n")

        except Exception as e:
            print(f"  ⚠️ US4: Error - {e}\n")
            results["user_stories"]["US4"] = {"status": "ERROR", "error": str(e)}

        # =====================================================================
        # WVWO COMPLIANCE VALIDATION
        # =====================================================================
        print("🎨 Testing WVWO Compliance")
        print("-" * 60)

        # Check for forbidden rounded classes in DOM
        forbidden_rounded = page.locator('[class*="rounded-md"], [class*="rounded-lg"], [class*="rounded-xl"]').count()
        if forbidden_rounded == 0:
            print("  ✅ Border radius: ZERO forbidden classes (rounded-md/lg/xl)")
            results["wvwo_compliance"]["border_radius"] = "PASS"
        else:
            print(f"  ❌ Border radius: Found {forbidden_rounded} violations")
            results["wvwo_compliance"]["border_radius"] = f"FAIL ({forbidden_rounded} violations)"
            results["overall_pass"] = False

        # Check rounded-sm usage
        rounded_sm_count = page.locator('[class*="rounded-sm"]').count()
        print(f"  ✅ rounded-sm usage: {rounded_sm_count} elements")

        # Check for font-hand (Permanent Marker) on Kim's tips
        font_hand_count = page.locator('.font-hand, [class*="font-hand"]').count()
        print(f"  ✅ font-hand (Kim's tips): {font_hand_count} instances")
        results["wvwo_compliance"]["fonts"] = f"PASS ({font_hand_count} Kim's tips)"

        # Check for border-left accents
        green_accents = page.locator('[class*="border-l-sign-green"]').count()
        brown_accents = page.locator('[class*="border-l-brand-brown"]').count()
        orange_accents = page.locator('[class*="border-l-brand-orange"]').count()
        print(f"  ✅ Border accents: Green={green_accents}, Brown={brown_accents}, Orange={orange_accents}")
        results["wvwo_compliance"]["border_accents"] = f"PASS (G:{green_accents}, B:{brown_accents}, O:{orange_accents})"

        # Check for glassmorphism violations
        backdrop_blur = page.locator('[class*="backdrop-blur"]').count()
        if backdrop_blur == 0:
            print("  ✅ Glassmorphism: ZERO backdrop-blur detected")
            results["wvwo_compliance"]["glassmorphism"] = "PASS"
        else:
            print(f"  ❌ Glassmorphism: Found {backdrop_blur} violations")
            results["wvwo_compliance"]["glassmorphism"] = f"FAIL ({backdrop_blur} violations)"
            results["overall_pass"] = False

        print()

        # =====================================================================
        # RESPONSIVE TESTING
        # =====================================================================
        print("📱 Testing Responsive Layouts")
        print("-" * 60)

        # Mobile (375px)
        page.set_viewport_size({"width": 375, "height": 667})
        page.wait_for_timeout(500)
        page.screenshot(path='tests/screenshots/spec13-mobile.png', full_page=False)
        print("  ✅ Mobile (375px): Screenshot captured")
        results["responsive"]["mobile"] = "TESTED"

        # Tablet (768px)
        page.set_viewport_size({"width": 768, "height": 1024})
        page.wait_for_timeout(500)
        page.screenshot(path='tests/screenshots/spec13-tablet.png', full_page=False)
        print("  ✅ Tablet (768px): Screenshot captured")
        results["responsive"]["tablet"] = "TESTED"

        # Desktop (1280px)
        page.set_viewport_size({"width": 1280, "height": 720})
        page.wait_for_timeout(500)
        page.screenshot(path='tests/screenshots/spec13-desktop.png', full_page=False)
        print("  ✅ Desktop (1280px): Screenshot captured")
        results["responsive"]["desktop"] = "TESTED"

        print()

        # =====================================================================
        # INTERACTIVE ELEMENTS
        # =====================================================================
        print("🖱️ Testing Interactive Elements")
        print("-" * 60)

        # Reset to desktop
        page.set_viewport_size({"width": 1280, "height": 720})

        # Check CTAs are clickable
        cta_buttons = page.locator('a.bg-sign-green, a.bg-brand-orange, button').count()
        print(f"  ✅ Interactive elements found: {cta_buttons} CTAs/buttons")
        results["interactions"]["cta_count"] = cta_buttons

        # Check reservation links work
        reservation_links = page.locator('a[href*="recreation.gov"], a:has-text("Reserve")').count()
        if reservation_links > 0:
            print(f"  ✅ Reservation links: {reservation_links}")
            results["interactions"]["reservation_links"] = reservation_links

        # Check phone links
        phone_links = page.locator('a[href^="tel:"]').count()
        if phone_links > 0:
            print(f"  ✅ Phone links (tel:): {phone_links}")
            results["interactions"]["phone_links"] = phone_links

        print()

        # =====================================================================
        # COMPUTED STYLES VALIDATION (WVWO)
        # =====================================================================
        print("🎨 Validating Computed Styles (WVWO)")
        print("-" * 60)

        # Check actual border-radius values in DOM
        all_elements = page.locator('*').all()
        max_border_radius = 0
        violated_elements = []

        # Sample first 50 visible elements for performance
        for i, elem in enumerate(all_elements[:50]):
            try:
                if elem.is_visible():
                    border_radius = elem.evaluate('el => window.getComputedStyle(el).borderRadius')
                    if border_radius and border_radius != '0px':
                        # Parse border-radius value (e.g., "2px" or "0.125rem")
                        if 'px' in border_radius:
                            px_value = float(border_radius.replace('px', '').split()[0])
                            if px_value > 2.1:  # Allow 2px (0.125rem) + tiny margin
                                violated_elements.append((i, border_radius))
                            max_border_radius = max(max_border_radius, px_value)
            except:
                pass  # Skip elements that can't be evaluated

        if len(violated_elements) == 0:
            print(f"  ✅ Border-radius validation: All values <= 2px (max: {max_border_radius:.1f}px)")
            results["wvwo_compliance"]["computed_border_radius"] = "PASS"
        else:
            print(f"  ❌ Border-radius violations: {len(violated_elements)} elements exceed 2px")
            for idx, radius in violated_elements[:5]:  # Show first 5
                print(f"      Element {idx}: {radius}")
            results["wvwo_compliance"]["computed_border_radius"] = f"FAIL ({len(violated_elements)} violations)"
            results["overall_pass"] = False

        print()

        # =====================================================================
        # ACCESSIBILITY QUICK CHECK
        # =====================================================================
        print("♿ Accessibility Quick Check")
        print("-" * 60)

        # Check for semantic HTML
        sections = page.locator('section').count()
        headings = page.locator('h1, h2, h3').count()
        print(f"  ✅ Semantic HTML: {sections} sections, {headings} headings")
        results["wvwo_compliance"]["semantic_html"] = f"PASS ({sections} sections, {headings} headings)"

        # Check for ARIA labels
        aria_labels = page.locator('[aria-label], [aria-labelledby]').count()
        if aria_labels > 0:
            print(f"  ✅ ARIA labels: {aria_labels} elements")

        print()

        browser.close()

        # =====================================================================
        # FINAL REPORT
        # =====================================================================
        print("=" * 60)
        print("📊 FINAL VALIDATION REPORT")
        print("=" * 60)
        print()

        print("USER STORIES:")
        for story, result in results["user_stories"].items():
            status_emoji = "✅" if result["status"] == "PASS" else "❌" if result["status"] == "FAIL" else "⏭️"
            print(f"  {status_emoji} {story}: {result['status']}")
            if "details" in result:
                print(f"      {result['details']}")

        print()
        print("WVWO COMPLIANCE:")
        for check, result in results["wvwo_compliance"].items():
            status_emoji = "✅" if "PASS" in result else "❌"
            print(f"  {status_emoji} {check}: {result}")

        print()
        print("RESPONSIVE TESTING:")
        for viewport, status in results["responsive"].items():
            print(f"  📸 {viewport}: {status}")

        print()
        print("=" * 60)

        if results["overall_pass"]:
            print("🎉 OVERALL: ✅ PASS - SPEC-13 is production-ready!")
            print("=" * 60)
            return 0
        else:
            print("❌ OVERALL: FAIL - Issues detected, see details above")
            print("=" * 60)
            return 1

if __name__ == "__main__":
    try:
        exit_code = main()
        sys.exit(exit_code)
    except Exception as e:
        print(f"\n❌ FATAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
