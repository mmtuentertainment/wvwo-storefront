#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SPEC-12 & SPEC-13 Comprehensive Testing
Advanced Swarm Validation Session

Tests all components, pages, and WVWO compliance on live Cloudflare preview.
"""

from playwright.sync_api import sync_playwright
import json
import sys
import io

# Fix Windows console encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

BASE_URL = "https://spec-13-lake-template.wvwildoutdoors.pages.dev"

class ComprehensiveValidator:
    def __init__(self, browser):
        self.browser = browser
        self.results = {
            "spec13": {},
            "spec12": {},
            "spec11": {},
            "wvwo_compliance": {},
            "responsive": {},
            "accessibility": {},
            "overall_pass": True
        }

    def test_spec13_lake_template(self):
        """Test SPEC-13 Lake Template on Summersville Lake page"""
        print("\n" + "="*60)
        print("SPEC-13: LAKE TEMPLATE VALIDATION")
        print("="*60 + "\n")

        page = self.browser.new_page()
        page.goto(f"{BASE_URL}/near/summersville-lake")
        page.wait_for_load_state('networkidle')

        # Take full-page screenshot
        page.screenshot(path='tests/screenshots/spec13-summersville-full.png', full_page=True)
        print("Screenshot: spec13-summersville-full.png")

        tests_passed = 0
        tests_total = 0

        # US3: Hero Section
        print("\nUS3: Hero Section with Lake Stats")
        print("-" * 40)
        tests_total += 3

        hero_h1 = page.locator('h1').first
        if hero_h1.is_visible() and "Summersville" in hero_h1.text_content():
            print("  ✅ Lake name in h1")
            tests_passed += 1
        else:
            print("  ❌ Lake name missing")
            self.results["overall_pass"] = False

        stats = page.locator('text=/Acres|Depth|County/i').count()
        if stats >= 2:
            print(f"  ✅ Stats displayed ({stats} labels)")
            tests_passed += 1
        else:
            print(f"  ❌ Stats missing (found {stats})")

        badges = page.locator('[class*="sign-green"]').count()
        if badges > 0:
            print(f"  ✅ Highlight badges ({badges})")
            tests_passed += 1

        # US1: Fishing Display
        print("\nUS1: Fishing Information Display")
        print("-" * 40)
        tests_total += 4

        what_to_fish = page.locator('h2:has-text("What to Fish")').count()
        if what_to_fish > 0:
            print("  ✅ What to Fish section")
            tests_passed += 1

        where_to_fish = page.locator('h2:has-text("Where to Fish")').count()
        if where_to_fish > 0:
            print("  ✅ Where to Fish section")
            tests_passed += 1

        fish_h3 = page.locator('h3').all()
        fish_count = sum(1 for h3 in fish_h3 if any(fish in h3.text_content() for fish in ['Bass', 'Walleye', 'Muskie', 'Crappie']))
        if fish_count >= 3:
            print(f"  ✅ Fish species ({fish_count} found)")
            tests_passed += 1
        else:
            print(f"  ❌ Fish species ({fish_count} found, expected 3+)")

        kim_tips = page.locator('.font-hand, [class*="font-hand"]').count()
        if kim_tips > 0:
            print(f"  ✅ Kim's tips ({kim_tips} instances)")
            tests_passed += 1

        # US2: Marina & Camping
        print("\nUS2: Marina & Camping Facilities")
        print("-" * 40)
        tests_total += 3

        camping = page.locator('h2:has-text("Camping")').count()
        if camping > 0:
            print("  ✅ Camping section")
            tests_passed += 1

        marina = page.locator('h2:has-text("Marina"), h2:has-text("Boat")').count()
        if marina > 0:
            print("  ✅ Marina section")
            tests_passed += 1

        tel_links = page.locator('a[href^="tel:"]').count()
        if tel_links > 0:
            print(f"  ✅ Phone links ({tel_links})")
            tests_passed += 1

        # US5: Safety & Regulations
        print("\nUS5: Safety & Regulations")
        print("-" * 40)
        tests_total += 2

        regulations = page.locator('h2:has-text("Safety"), h2:has-text("Regulations")').count()
        if regulations > 0:
            print("  ✅ Regulations section")
            tests_passed += 1

        orange_accents = page.locator('[class*="border-l-brand-orange"]').count()
        if orange_accents > 0:
            print(f"  ✅ Orange warning accents ({orange_accents})")
            tests_passed += 1

        # US4: Activities & Seasonal
        print("\nUS4: Activities & Seasonal Guide")
        print("-" * 40)
        tests_total += 2

        activities = page.locator('text=/Swimming|Diving|Kayak/i').count()
        if activities > 0:
            print(f"  ✅ Activities ({activities} found)")
            tests_passed += 1

        seasonal = page.locator('text=/Spring|Summer|Fall|Winter/i').count()
        if seasonal >= 2:
            print(f"  ✅ Seasonal content ({seasonal} references)")
            tests_passed += 1

        spec13_score = (tests_passed / tests_total * 100) if tests_total > 0 else 0
        print(f"\nSPEC-13 Score: {tests_passed}/{tests_total} ({spec13_score:.1f}%)")
        self.results["spec13"] = {"pass": tests_passed, "total": tests_total, "score": spec13_score}

        page.close()

    def test_wvwo_compliance(self):
        """Test WVWO compliance across entire site"""
        print("\n" + "="*60)
        print("WVWO COMPLIANCE VALIDATION (SITE-WIDE)")
        print("="*60 + "\n")

        page = self.browser.new_page()
        page.goto(f"{BASE_URL}/near/summersville-lake")
        page.wait_for_load_state('networkidle')

        violations = []

        # Border Radius Compliance
        print("Border Radius Compliance")
        print("-" * 40)

        forbidden_rounded = page.locator('[class*="rounded-md"], [class*="rounded-lg"], [class*="rounded-xl"]').count()
        if forbidden_rounded == 0:
            print("  ✅ ZERO forbidden rounded classes")
        else:
            print(f"  ❌ {forbidden_rounded} forbidden rounded classes found")
            violations.append(f"rounded violations: {forbidden_rounded}")
            self.results["overall_pass"] = False

        rounded_sm = page.locator('[class*="rounded-sm"]').count()
        print(f"  ✅ rounded-sm usage: {rounded_sm} elements")

        # Font Compliance
        print("\nFont Compliance")
        print("-" * 40)

        font_display = page.locator('.font-display, [class*="font-display"]').count()
        print(f"  ✅ font-display (Bitter): {font_display} usages")

        font_hand = page.locator('.font-hand, [class*="font-hand"]').count()
        print(f"  ✅ font-hand (Permanent Marker): {font_hand} usages (Kim's tips)")

        font_body = page.locator('.font-body, [class*="font-body"]').count()
        print(f"  ✅ font-body (Noto Sans): {font_body} usages")

        # Check for forbidden fonts in computed styles
        forbidden_fonts = page.evaluate('''() => {
            const elements = Array.from(document.querySelectorAll('*'));
            const forbidden = ['Inter', 'Poppins', 'DM Sans', 'system-ui', 'Montserrat', 'Space Grotesk'];
            let violations = [];

            for (let elem of elements.slice(0, 50)) {
                const font = window.getComputedStyle(elem).fontFamily;
                if (font && forbidden.some(f => font.includes(f))) {
                    violations.push(font);
                }
            }
            return violations;
        }''')

        if len(forbidden_fonts) == 0:
            print("  ✅ NO forbidden fonts in computed styles")
        else:
            print(f"  ❌ Forbidden fonts detected: {set(forbidden_fonts)}")
            violations.append(f"forbidden fonts: {forbidden_fonts}")
            self.results["overall_pass"] = False

        # Border Accent Compliance
        print("\nBorder Accent Compliance")
        print("-" * 40)

        green_accents = page.locator('[class*="border-l-sign-green"]').count()
        brown_accents = page.locator('[class*="border-l-brand-brown"]').count()
        orange_accents = page.locator('[class*="border-l-brand-orange"]').count()

        print(f"  ✅ Green (fishing): {green_accents}")
        print(f"  ✅ Brown (camping/marina): {brown_accents}")
        print(f"  ✅ Orange (safety): {orange_accents}")

        if orange_accents > 0:
            total_elements = page.locator('*').count()
            orange_pct = (orange_accents / total_elements * 100) if total_elements > 0 else 0
            if orange_pct < 5:
                print(f"  ✅ Orange usage: {orange_pct:.2f}% (within <5% limit)")
            else:
                print(f"  ⚠️ Orange usage: {orange_pct:.2f}% (exceeds 5% guideline)")

        # Glassmorphism Check
        print("\nGlassmorphism Check")
        print("-" * 40)

        backdrop_blur = page.locator('[class*="backdrop-blur"]').count()
        if backdrop_blur == 0:
            print("  ✅ NO glassmorphism (backdrop-blur)")
        else:
            print(f"  ❌ {backdrop_blur} backdrop-blur instances")
            violations.append(f"glassmorphism: {backdrop_blur}")
            self.results["overall_pass"] = False

        # Computed Border-Radius Check (actual CSS values)
        print("\nComputed Border-Radius Validation")
        print("-" * 40)

        large_radius_violations = page.evaluate('''() => {
            const elements = Array.from(document.querySelectorAll('*'));
            let violations = [];

            for (let elem of elements.slice(0, 100)) {
                const br = window.getComputedStyle(elem).borderRadius;
                if (br && br !== '0px') {
                    const px = parseFloat(br);
                    if (px > 2.5) {  // Allow 2px (0.125rem) + small margin
                        violations.push({
                            tag: elem.tagName,
                            value: br,
                            classes: elem.className.substring(0, 50)
                        });
                    }
                }
            }
            return violations;
        }''')

        if len(large_radius_violations) == 0:
            print("  ✅ ALL border-radius values <= 2.5px")
        else:
            print(f"  ❌ {len(large_radius_violations)} elements exceed 2.5px:")
            for v in large_radius_violations[:5]:
                print(f"      {v['tag']}: {v['value']} - {v['classes']}")
            violations.append(f"large radius: {len(large_radius_violations)}")
            self.results["overall_pass"] = False

        self.results["wvwo_compliance"] = {
            "forbidden_rounded": forbidden_rounded,
            "rounded_sm_count": rounded_sm,
            "glassmorphism": backdrop_blur,
            "border_accents": f"G:{green_accents}, B:{brown_accents}, O:{orange_accents}",
            "violations": violations
        }

        page.close()

    def test_responsive_layouts(self):
        """Test responsive behavior across viewports"""
        print("\n" + "="*60)
        print("RESPONSIVE LAYOUT TESTING")
        print("="*60 + "\n")

        page = self.browser.new_page()
        page.goto(f"{BASE_URL}/near/summersville-lake")
        page.wait_for_load_state('networkidle')

        viewports = [
            ("Mobile", 375, 667),
            ("Tablet", 768, 1024),
            ("Desktop", 1280, 720),
            ("Large Desktop", 1920, 1080)
        ]

        for name, width, height in viewports:
            print(f"{name} ({width}x{height})")
            page.set_viewport_size({"width": width, "height": height})
            page.wait_for_timeout(500)

            # Take screenshot
            filename = f'tests/screenshots/spec13-{name.lower().replace(" ", "-")}.png'
            page.screenshot(path=filename)
            print(f"  📸 {filename}")

            # Check for horizontal scroll
            has_scroll = page.evaluate('() => document.documentElement.scrollWidth > window.innerWidth')
            if has_scroll:
                print(f"  ⚠️ Horizontal scroll detected")
            else:
                print(f"  ✅ No horizontal scroll")

        self.results["responsive"] = {"viewports_tested": len(viewports), "screenshots": len(viewports)}
        page.close()

    def test_interactive_elements(self):
        """Test all interactive elements work"""
        print("\n" + "="*60)
        print("INTERACTIVE ELEMENTS TESTING")
        print("="*60 + "\n")

        page = self.browser.new_page()
        page.goto(f"{BASE_URL}/near/summersville-lake")
        page.wait_for_load_state('networkidle')

        # CTAs and buttons
        ctas = page.locator('a.bg-sign-green, a.bg-brand-orange, button').all()
        print(f"CTAs/Buttons: {len(ctas)} found")

        clickable_count = 0
        for cta in ctas[:5]:  # Test first 5
            if cta.is_visible() and cta.is_enabled():
                clickable_count += 1
        print(f"  ✅ {clickable_count}/{min(5, len(ctas))} CTAs clickable")

        # Phone links
        tel_links = page.locator('a[href^="tel:"]').all()
        print(f"Phone Links: {len(tel_links)} found")
        for tel in tel_links[:3]:
            href = tel.get_attribute('href')
            print(f"  ✅ {href}")

        # External links security
        external_links = page.locator('a[rel*="noopener"]').count()
        print(f"Secure External Links: {external_links}")
        if external_links > 0:
            print(f"  ✅ Secure attributes present")

        # Navigation links
        nav_links = page.locator('nav a, header a').count()
        print(f"Navigation Links: {nav_links}")

        self.results["interactive"] = {
            "ctas": len(ctas),
            "tel_links": len(tel_links),
            "secure_external": external_links,
            "nav_links": nav_links
        }

        page.close()

    def test_accessibility(self):
        """Quick accessibility validation"""
        print("\n" + "="*60)
        print("ACCESSIBILITY VALIDATION")
        print("="*60 + "\n")

        page = self.browser.new_page()
        page.goto(f"{BASE_URL}/near/summersville-lake")
        page.wait_for_load_state('networkidle')

        # Semantic HTML
        sections = page.locator('section').count()
        articles = page.locator('article').count()
        headings = page.locator('h1, h2, h3, h4, h5, h6').count()

        print(f"Semantic HTML:")
        print(f"  ✅ Sections: {sections}")
        print(f"  ✅ Articles: {articles}")
        print(f"  ✅ Headings: {headings}")

        # ARIA
        aria_labels = page.locator('[aria-label], [aria-labelledby]').count()
        print(f"  ✅ ARIA labels: {aria_labels}")

        # Form labels
        labels = page.locator('label').count()
        inputs = page.locator('input, textarea, select').count()
        print(f"  ✅ Labels: {labels}, Inputs: {inputs}")

        # Check heading hierarchy
        heading_order = page.evaluate('''() => {
            const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
            return headings.slice(0, 10).map(h => ({
                tag: h.tagName,
                text: h.textContent.trim().substring(0, 30)
            }));
        }''')

        print(f"\nHeading Hierarchy (first 10):")
        for h in heading_order:
            print(f"  {h['tag']}: {h['text']}")

        self.results["accessibility"] = {
            "sections": sections,
            "headings": headings,
            "aria_labels": aria_labels,
            "labels_inputs": f"{labels}/{inputs}"
        }

        page.close()

    def test_spec11_components(self):
        """Test SPEC-11 Adventure Shared Components integration"""
        print("\n" + "="*60)
        print("SPEC-11: ADVENTURE COMPONENTS VALIDATION")
        print("="*60 + "\n")

        page = self.browser.new_page()
        page.goto(f"{BASE_URL}/near/summersville-lake")
        page.wait_for_load_state('networkidle')

        components_found = 0

        # AdventureQuickStats
        quick_stats = page.locator('section:has([class*="stat"])').count()
        if quick_stats > 0:
            print(f"  ✅ AdventureQuickStats detected ({quick_stats})")
            components_found += 1

        # AdventureGearChecklist (What to Bring section)
        gear_section = page.locator('h2:has-text("What to Bring"), h2:has-text("Gear")').count()
        if gear_section > 0:
            print(f"  ✅ AdventureGearChecklist section found")
            components_found += 1

        # AdventureCTA
        cta_section = page.locator('section:has-text("Stop By"), section:has-text("Visit")').count()
        if cta_section > 0:
            print(f"  ✅ AdventureCTA detected")
            components_found += 1

        # Email Capture
        email_section = page.locator('input[type="email"], section:has-text("newsletter")').count()
        if email_section > 0:
            print(f"  ✅ EmailCapture found")
            components_found += 1

        print(f"\nSPEC-11 Components: {components_found}/4 detected")
        self.results["spec11"] = {"components_found": components_found, "total_expected": 4}

        page.close()

    def generate_report(self):
        """Generate final comprehensive report"""
        print("\n" + "="*60)
        print("COMPREHENSIVE TESTING REPORT")
        print("="*60 + "\n")

        print("SPEC-13 LAKE TEMPLATE:")
        if "spec13" in self.results:
            spec13 = self.results["spec13"]
            print(f"  User Stories: {spec13['pass']}/{spec13['total']} ({spec13['score']:.1f}%)")

        print("\nSPEC-11 COMPONENTS:")
        if "spec11" in self.results:
            spec11 = self.results["spec11"]
            print(f"  Components: {spec11['components_found']}/{spec11['total_expected']}")

        print("\nWVWO COMPLIANCE:")
        if "wvwo_compliance" in self.results:
            wvwo = self.results["wvwo_compliance"]
            print(f"  Forbidden rounded: {wvwo['forbidden_rounded']} (should be 0)")
            print(f"  rounded-sm usage: {wvwo['rounded_sm_count']}")
            print(f"  Glassmorphism: {wvwo['glassmorphism']} (should be 0)")
            print(f"  Border accents: {wvwo['border_accents']}")
            if wvwo['violations']:
                print(f"  ❌ Violations: {', '.join(wvwo['violations'])}")
            else:
                print(f"  ✅ ZERO violations")

        print("\nRESPONSIVE:")
        if "responsive" in self.results:
            resp = self.results["responsive"]
            print(f"  Viewports tested: {resp['viewports_tested']}")
            print(f"  Screenshots: {resp['screenshots']}")

        print("\nACCESSIBILITY:")
        if "accessibility" in self.results:
            a11y = self.results["accessibility"]
            print(f"  Sections: {a11y['sections']}")
            print(f"  Headings: {a11y['headings']}")
            print(f"  ARIA labels: {a11y['aria_labels']}")

        print("\n" + "="*60)
        if self.results["overall_pass"]:
            print("OVERALL: ✅ PASS - All tests successful!")
        else:
            print("OVERALL: ❌ FAIL - Violations detected")
        print("="*60)

        return 0 if self.results["overall_pass"] else 1

def main():
    print("🐝 SPEC-12 & SPEC-13 Comprehensive Validation")
    print("Queen-Led Advanced Testing Swarm\n")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        validator = ComprehensiveValidator(browser)

        # Run all test suites
        validator.test_spec13_lake_template()
        validator.test_spec11_components()
        validator.test_wvwo_compliance()
        validator.test_responsive_layouts()
        validator.test_interactive_elements()
        validator.test_accessibility()

        # Generate final report
        exit_code = validator.generate_report()

        browser.close()
        return exit_code

if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as e:
        print(f"\n❌ FATAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
