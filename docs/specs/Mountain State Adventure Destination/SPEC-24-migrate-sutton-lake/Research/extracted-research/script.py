
import json

# Load the existing schema
with open('sutton_lake_complete_schema.json', 'r') as f:
    schema = json.load(f)

# Add the missing sections from the 12-section framework

# Split recreation_water into: recreation_water + boat_ramps_and_marinas
# Add: family_activities

schema["2b_boat_ramps_and_marinas"] = {
    "_description": "USACE and private boat ramps and marina facilities - separated for detailed focus",
    "_note": "This is complementary detail to recreation_water.boat_ramps; includes marina services",
    
    "usace_boat_ramps": {
        "_type": "array<object>",
        "_fields": {
            "name": "string",
            "location": {
                "address": "string",
                "city": "string",
                "gps_lat": "number|null",
                "gps_lon": "number|null"
            },
            "ramp_conditions": "string (wide concrete, gravel, small dock, etc.)",
            "parking": {
                "capacity": "string|number",
                "trailer_parking": "boolean",
                "accessible_parking": "boolean",
                "spaces_truck_trailer": "number|null"
            },
            "fees": {
                "day_use_launch_fee_usd": "number",
                "included_with_campground_stay": "boolean",
                "annual_pass_available": "boolean"
            },
            "hours": "string|null",
            "season": {
                "open_date": "string (MM/DD)",
                "close_date": "string (MM/DD)"
            },
            "services": {
                "dock_available": "boolean",
                "fish_cleaning_station": "boolean",
                "restrooms": "boolean",
                "picnic_areas": "boolean"
            },
            "closure_conditions": {
                "water_level_ft": "number (lake level at which ramp closes)",
                "reason": "string (ramp toe exposed, etc.)"
            },
            "nearby_amenities": "array<string> (['beach', 'marina', 'showers', 'bathrooms'])"
        }
    },
    
    "private_marinas": {
        "_type": "array<object>",
        "_fields": {
            "name": "string",
            "operator": "string",
            "location": {
                "address": "string",
                "gps_lat": "number|null",
                "gps_lon": "number|null"
            },
            "operator_status": "string (USACE lease, fully private, etc.)",
            "hours": {
                "seasonal_open": "string (e.g., 'mid-April to mid-October')",
                "seasonal_close": "string",
                "daily_hours": "string (e.g., '9 AM - 6 PM')",
                "days_open": "array<string> (Mon-Sat, closed Sunday, etc.)"
            },
            "fuel": {
                "available": "boolean",
                "fuel_grades": "array<string> (['ethanol-free', 'regular', 'premium'])",
                "pump_out_available": "boolean",
                "pump_out_free_for_slip_holders": "boolean"
            },
            "slip_rentals": {
                "total_slips": "number|null",
                "slips_with_hookups": "number|null",
                "hookup_types": "array<string> (['water', 'electric', 'water_electric'])",
                "rates": {
                    "daily_usd_range": "string (e.g., '$25-40')",
                    "weekly_usd_range": "string",
                    "monthly_usd_range": "string",
                    "seasonal_usd": "number|null"
                }
            },
            "boat_rentals": {
                "available": "boolean",
                "types": "array<string> (['houseboats', 'pontoon', 'kayaks', 'jet_skis', 'pedal_boats', 'craig_cats'])",
                "rental_periods": "array<string> (['2_hours', '4_hours', '8_hours', '3_days', 'half_day'])"
            },
            "storage": {
                "winter_storage": "boolean",
                "summer_storage": "boolean",
                "dry_storage": "boolean",
                "boat_trailer_storage": "boolean"
            },
            "services": {
                "marine_mechanic": "boolean",
                "winterization": "boolean",
                "shrink_wrapping": "boolean",
                "laundry_facility": "boolean",
                "ships_store": "boolean",
                "ships_store_items": "array<string> (['pizza', 'hot_dogs', 'ice_cream', 'bait', 'ice', 'marine_accessories', 'souvenirs'])"
            },
            "facilities": {
                "restrooms": "boolean",
                "showers": "boolean",
                "covered_picnic_area": "boolean",
                "fish_feeding_area": "boolean",
                "floating_docks": "boolean"
            },
            "contact": {
                "phone": "string",
                "website": "string|null",
                "email": "string|null"
            }
        }
    }
}

schema["8b_family_activities"] = {
    "_description": "Family-friendly day use areas, recreational facilities, programs, and accessible features",
    
    "day_use_areas": {
        "_type": "array<object>",
        "_fields": {
            "name": "string",
            "location": "string",
            "operator": "string (USACE, etc.)",
            "hours": "string",
            "entry_fee": "string|null",
            "facilities": {
                "picnic_areas": "boolean",
                "picnic_shelters": "boolean",
                "number_of_shelters": "number|null",
                "shelter_reservation_required": "boolean",
                "shelter_capacity_people": "number|null",
                "grills": "boolean",
                "fire_rings": "boolean",
                "restrooms": "boolean",
                "restroom_type": "string (flush, vault, portable)",
                "water_fountains": "boolean",
                "playground": "boolean",
                "beach_area": "boolean",
                "boat_ramp": "boolean"
            },
            "recreational_equipment": {
                "volleyball_court": "boolean",
                "horseshoe_pits": "boolean",
                "disc_golf": "boolean",
                "basketball_court": "boolean",
                "open_grass_area": "boolean"
            },
            "accessibility": {
                "ada_accessible": "boolean",
                "accessible_parking": "boolean",
                "accessible_restrooms": "boolean",
                "accessible_picnic_tables": "boolean",
                "accessible_playground": "boolean",
                "accessible_beach_access": "boolean"
            },
            "pet_policy": {
                "pets_allowed": "boolean",
                "dogs_allowed": "boolean",
                "leash_required": "boolean",
                "restrictions": "array<string>|null"
            },
            "nearby_amenities": "array<string>"
        }
    },
    
    "visitor_centers_and_exhibits": {
        "_type": "array<object>",
        "_fields": {
            "name": "string",
            "location": "string",
            "address": "string",
            "operator": "string (USACE, tourism board, etc.)",
            "hours": "string",
            "admission": "string (free, fee amount)",
            "exhibits": {
                "types": "array<string> (['natural_history', 'dam_engineering', 'local_history', 'environmental'])",
                "descriptions": "array<string>"
            },
            "interactive_features": "array<string> (['hands-on_exhibits', 'videos', 'interpretive_displays'])",
            "facilities": {
                "restrooms": "boolean",
                "gift_shop": "boolean",
                "water_fountains": "boolean"
            },
            "accessibility": {
                "ada_accessible": "boolean",
                "wheelchair_accessible": "boolean"
            },
            "contact": {
                "phone": "string|null",
                "website": "string|null"
            }
        }
    },
    
    "ranger_programs_and_activities": {
        "_type": "array<object>",
        "_fields": {
            "program_name": "string",
            "operator": "string (USACE, etc.)",
            "type": "string (guided_tour, educational_talk, ranger_led_hike, nature_program, fishing_clinic, etc.)",
            "season": "string (seasonal, year-round)",
            "typical_dates": "string|null",
            "typical_times": "string|null",
            "target_audience": "string (families, children, adults, all ages)",
            "duration_minutes": "number|null",
            "cost": "string (free, fee amount)",
            "registration_required": "boolean",
            "topics": "array<string>",
            "description": "string",
            "max_participants": "number|null",
            "contact_for_info": "string|null"
        }
    },
    
    "seasonal_activities": {
        "spring": {
            "activities": "array<string>",
            "wildflower_displays": "boolean",
            "bird_watching": "boolean",
            "wildflower_peak_dates": "string|null"
        },
        "summer": {
            "activities": "array<string>",
            "peak_visitation_months": "array<string>",
            "swimming_season_peak": "boolean"
        },
        "fall": {
            "activities": "array<string>",
            "foliage_peak_dates": "string|null",
            "fall_colors_rated": "string|null"
        },
        "winter": {
            "activities": "array<string>",
            "facility_availability": "string"
        }
    }
}

# Add "family_activities" as separate top-level for clarity
schema["8_family_activities_day_use"] = schema.pop("8b_family_activities")

# Rename boat_ramps_and_marinas to separate section
schema["3_boat_ramps_and_marinas"] = schema.pop("2b_boat_ramps_and_marinas")

# Re-number everything to maintain order
new_schema = {}
counter = 1

# Define the order we want
section_order = [
    "metadata",
    "_schema_version",
    "_field_value_wrapper",
    "1_lake_specs",
    "2_recreation_water",
    "3_boat_ramps_and_marinas",
    "4_fishing",
    "5_camping",
    "6_trails_and_wildlife",
    "7_seasonal_ops",
    "8_family_activities_day_use",
    "9_visitor_info",
    "10_nearby_destinations",
    "11_history_cultural"
]

# Copy schema maintaining order
for key in section_order:
    if key in schema:
        new_schema[key] = schema[key]

# Add any remaining keys not in order
for key in schema:
    if key not in section_order:
        new_schema[key] = schema[key]

# Save updated schema
with open('sutton_lake_complete_schema_12sections.json', 'w') as f:
    json.dump(new_schema, f, indent=2)

print("✅ SCHEMA UPDATED TO 12 SECTIONS")
print("="*80)
print("\nSections (reorganized):")
print("  1. lake_specs")
print("  2. recreation_water")
print("  3. boat_ramps_and_marinas (NEW - separated for detail)")
print("  4. fishing")
print("  5. camping")
print("  6. trails_and_wildlife")
print("  7. seasonal_ops")
print("  8. family_activities_day_use (NEW - includes visitor centers & programs)")
print("  9. visitor_info")
print("  10. nearby_destinations")
print("  11. history_cultural")
print("\n(Plus metadata sections)")
print("\n✅ New subsections added:")
print("  - boat_ramps_and_marinas:")
print("    • usace_boat_ramps (detailed ramp info)")
print("    • private_marinas (fuel, slips, boat rentals, storage, services)")
print("  - family_activities_day_use:")
print("    • day_use_areas (picnic, playgrounds, accessibility)")
print("    • visitor_centers_and_exhibits")
print("    • ranger_programs_and_activities")
print("    • seasonal_activities")
print("\n✅ File saved: sutton_lake_complete_schema_12sections.json")
