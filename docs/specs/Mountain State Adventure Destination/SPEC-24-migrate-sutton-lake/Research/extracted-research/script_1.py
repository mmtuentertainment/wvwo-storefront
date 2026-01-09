
import json

# Rebuild the complete schema from scratch with 12 sections

complete_schema_12 = {
    "_schema_version": "1.0",
    "_description": "Complete 12-Section Sutton Lake WV Knowledge Base Schema",
    "_field_value_wrapper": {
        "description": "All data fields follow this wrapper structure",
        "pattern": {
            "value": "actual_data (type varies by field)",
            "status": "verified | unverified_local | conflicting_sources | not_found",
            "sources": [{"tier": "0-3", "agency": "string", "url": "string|null"}],
            "notes": "optional string for conflicts, context, or explanations"
        }
    },
    
    "1_lake_specs": {
        "_description": "Physical specifications and hydrologic data for Sutton Lake and Dam",
        "dam_operator": "string",
        "year_completed": "integer",
        "construction_cost_usd": "integer",
        "lake_acreage_summer": "number",
        "lake_acreage_winter": "number|null",
        "shoreline_miles": "number",
        "max_depth_ft": "number",
        "water_source_rivers": "array<string>",
        "drainage_area_sq_mi": "number",
        "pool_elevations": {
            "summer_pool_ft_msl": "number",
            "winter_pool_ft_msl": "number",
            "drawdown_schedule": "array<{period, dates, elevation_ft}>"
        },
        "coordinates": {
            "latitude": "number",
            "longitude": "number",
            "dms_format": "string"
        },
        "flood_damage_prevented_usd": "number"
    },
    
    "2_recreation_water": {
        "_description": "Water recreation activities (non-boating): swimming, paddling, tow sports",
        "swimming_areas": {
            "_type": "array<object>",
            "name": "string",
            "location": "string",
            "lifeguards": "boolean",
            "fees": {"day_use_fee_usd": "number", "annual_pass_usd": "number"},
            "facilities": "array<string>"
        },
        "paddle_sports": {
            "kayaking": {"launch_points": "array<string>", "rentals": "object"},
            "canoeing": {"launch_points": "array<string>", "rentals": "object"},
            "stand_up_paddleboarding": {"launch_points": "array<string>", "rentals": "object"}
        },
        "tow_sports": {
            "tubing": {"permitted": "boolean", "regulations": "object"},
            "water_skiing": {"permitted": "boolean", "regulations": "object"},
            "pwc_jet_ski": {"permitted": "boolean", "rentals": "object", "regulations": "object"}
        },
        "usace_restrictions": {
            "governing_regulation": "string",
            "drones_allowed": "boolean",
            "firearms_allowed": "boolean",
            "fireworks_allowed": "boolean"
        }
    },
    
    "3_boat_ramps_and_marinas": {
        "_description": "USACE boat ramps and private marina facilities, services, fuel, slips",
        "usace_boat_ramps": {
            "_type": "array<object>",
            "name": "string",
            "location": {"address": "string", "gps_lat": "number", "gps_lon": "number"},
            "ramp_conditions": "string",
            "parking": {"capacity": "number", "trailer_parking": "boolean"},
            "fees": {"day_use_launch_fee_usd": "number"},
            "closure_water_level_ft": "number"
        },
        "private_marinas": {
            "_type": "array<object>",
            "name": "string",
            "operator": "string",
            "hours": "string",
            "fuel": {
                "available": "boolean",
                "fuel_grades": "array<string>",
                "pump_out_available": "boolean"
            },
            "slip_rentals": {
                "total_slips": "number",
                "rates": {"daily_usd_range": "string", "monthly_usd_range": "string"}
            },
            "boat_rentals": {
                "available": "boolean",
                "types": "array<string> (['houseboats', 'pontoon', 'kayaks', 'jet_skis', 'pedal_boats', 'craig_cats'])"
            },
            "storage": {
                "winter_storage": "boolean",
                "summer_storage": "boolean",
                "dry_storage": "boolean"
            },
            "services": {
                "marine_mechanic": "boolean",
                "winterization": "boolean",
                "ships_store": "boolean",
                "ships_store_items": "array<string>"
            }
        }
    },
    
    "4_fishing": {
        "_description": "Fish species, stocking programs, special regulations, tournaments",
        "species_lake": "array<{common_name, scientific_name, category}>",
        "species_tailwaters": "array<{common_name, category, stocked}>",
        "stocking_programs": "array<{location, species_stocked, schedule, agency}>",
        "special_regulations": "array<{species, waterbody_scope, creel_limit, size_limits, slot_limits}>",
        "access_sites": "array<{name, type, location, operator, fees}>",
        "known_fishing_spots": "array<{name, location, target_species, structure}>",
        "seasonal_patterns": {"spring": "string", "summer": "string", "fall": "string", "winter": "string"},
        "tournaments": "array<{name, organization, frequency, date, location}>"
    },
    
    "5_camping": {
        "_description": "USACE campgrounds and nearby private campgrounds with detailed facilities",
        "usace_campgrounds": {
            "_type": "array<object>",
            "name": "string",
            "location": {"address": "string", "gps_lat": "number", "gps_lon": "number"},
            "season": {"open_date": "string", "close_date": "string"},
            "sites": {
                "total_sites": "number",
                "electric_hookup_sites": "number",
                "full_hookup_sites": "number"
            },
            "facilities": {
                "dump_station": "boolean",
                "showers": "boolean",
                "restrooms": "boolean",
                "playground": "boolean"
            },
            "fees": {"per_night_usd": "number"}
        },
        "nearby_private_campgrounds": "array<{name, operator, location, distance_mi, amenities}>"
    },
    
    "6_trails_and_hiking": {
        "_description": "Trail systems, difficulty ratings, distances, accessibility features",
        "trails_sutton_lake": {
            "_type": "array<object>",
            "name": "string",
            "length_miles": "number",
            "type": "array<string> (['hiking', 'biking', 'horseback_riding'])",
            "difficulty": "string (easy, moderate, difficult, strenuous)",
            "surface": "string (dirt, gravel, paved, boardwalk)",
            "trailhead": {"name": "string", "location": "string", "gps_lat": "number", "gps_lon": "number", "parking": "boolean"},
            "elevation_gain_ft": "number",
            "features": {"scenic_views": "boolean", "water_features": "array<string>", "historical_features": "array<string>"},
            "ada_accessible": "boolean",
            "interpretive_features": {"interpretive_signs": "boolean", "guided_tours": "boolean"},
            "restrictions": {"bikes_allowed": "boolean", "horses_allowed": "boolean", "dogs_allowed": "boolean"}
        },
        "nearby_trails": {
            "_type": "array<object>",
            "_note": "Within ~15 miles of Sutton Lake",
            "name": "string",
            "distance_mi": "number",
            "direction": "string (N, NE, E, SE, S, SW, W, NW)"
        }
    },
    
    "7_wildlife_and_nature": {
        "_description": "Wildlife viewing, bird species, wildflower seasons, fall foliage, nature programs",
        "bird_species": {
            "_type": "array<object>",
            "common_name": "string",
            "scientific_name": "string",
            "season": "string (year-round, seasonal)",
            "frequency": "string (common, occasional, rare)"
        },
        "wildlife_viewing_areas": {
            "_type": "array<object>",
            "name": "string",
            "location": "string",
            "best_time": "string",
            "what_to_see": "array<string>"
        },
        "wildlife_management_areas": {
            "_type": "array<object>",
            "name": "string",
            "acreage": "number",
            "key_species": "array<string>",
            "activities": "array<string>"
        },
        "seasonal_nature_events": {
            "wildflower_season": {
                "peak_dates": "string",
                "common_species": "array<string>"
            },
            "fall_foliage": {
                "peak_dates": "string",
                "foliage_rating": "string"
            }
        },
        "nature_programs": {
            "_type": "array<object>",
            "program_name": "string",
            "operator": "string (USACE, WV DNR)",
            "type": "string (guided walk, lecture, bird watching, etc.)",
            "season": "string"
        }
    },
    
    "8_family_activities_and_day_use": {
        "_description": "Picnic areas, playgrounds, recreational facilities, visitor centers, ranger programs",
        "day_use_areas": {
            "_type": "array<object>",
            "name": "string",
            "location": "string",
            "hours": "string",
            "entry_fee": "string",
            "facilities": {
                "picnic_shelters": "boolean",
                "shelter_reservation_required": "boolean",
                "grills": "boolean",
                "playground": "boolean",
                "restrooms": "boolean"
            },
            "recreational_equipment": {
                "volleyball_court": "boolean",
                "horseshoe_pits": "boolean",
                "disc_golf": "boolean"
            },
            "accessibility": {
                "ada_accessible": "boolean",
                "accessible_playground": "boolean",
                "accessible_beach_access": "boolean"
            }
        },
        "visitor_centers_and_exhibits": {
            "_type": "array<object>",
            "name": "string",
            "location": "string",
            "hours": "string",
            "admission": "string (free, fee)",
            "exhibits": "array<string>",
            "interactive_features": "array<string>",
            "accessibility": {"ada_accessible": "boolean"}
        },
        "ranger_programs": {
            "_type": "array<object>",
            "program_name": "string",
            "type": "string (guided tour, talk, hike, clinic)",
            "season": "string",
            "target_audience": "string (families, children, all ages)",
            "cost": "string (free, fee)",
            "topics": "array<string>"
        }
    },
    
    "9_seasonal_conditions_and_access": {
        "_description": "Pool schedules, facility closures, seasonal weather patterns, ice fishing",
        "pool_schedule": {
            "summer_pool": {
                "elevation_ft_msl": "number",
                "start_date": "string (MM/DD)",
                "end_date": "string (MM/DD)",
                "acreage": "number"
            },
            "winter_pool": {
                "elevation_ft_msl": "number",
                "start_date": "string (MM/DD)",
                "end_date": "string (MM/DD)",
                "drawdown_amount_ft": "number"
            }
        },
        "facility_closures": {
            "_type": "array<object>",
            "facility_name": "string",
            "closure_dates": "string",
            "water_level_closure_ft": "number"
        },
        "seasonal_access": {
            "spring": {"flooding_risk": "string", "typical_conditions": "string"},
            "summer": {"typical_conditions": "string", "peak_visitation": "boolean"},
            "fall": {"foliage_peak": "string", "typical_conditions": "string"},
            "winter": {"ice_fishing": "boolean", "typical_conditions": "string"}
        },
        "ice_fishing": {
            "documented_activity": "boolean",
            "notes": "string"
        }
    },
    
    "10_practical_visitor_information": {
        "_description": "Addresses, phone numbers, contact info, town services, hospital, cell coverage",
        "main_access_points": {
            "_type": "array<object>",
            "name": "string",
            "address": "string",
            "gps_lat": "number",
            "gps_lon": "number",
            "directions": "string"
        },
        "usace_contacts": {
            "main_office": {
                "phone": "string",
                "email": "string",
                "website": "string"
            },
            "recreation_areas": "array<{name, phone}>"
        },
        "town_services": {
            "_type": "array<object>",
            "town_name": "string",
            "distance_mi": "number",
            "gas_stations": "array<{name, address}>",
            "grocery_stores": "array<{name, address}>",
            "other_services": "array<string>"
        },
        "nearest_hospital": {
            "name": "string",
            "address": "string",
            "distance_mi": "number",
            "phone": "string",
            "emergency_services": "boolean",
            "services": "array<string>"
        },
        "cell_coverage": {
            "general_assessment": "string (excellent, good, fair, poor)",
            "carrier_rankings": "array<{carrier, coverage_percent, rank}>",
            "best_carriers_by_location": "array<{location, carriers}>"
        }
    },
    
    "11_nearby_outdoor_destinations": {
        "_description": "State parks, wildlife areas, lakes, historic sites within 30 miles",
        "state_parks": {
            "_type": "array<object>",
            "name": "string",
            "distance_mi": "number",
            "direction": "string",
            "within_30_miles": "boolean",
            "size_acres": "number",
            "features": "array<string>"
        },
        "usace_lakes": {
            "_type": "array<object>",
            "name": "string",
            "distance_mi": "number",
            "lake_acres": "number",
            "campgrounds": "number",
            "features": "array<string>"
        },
        "wildlife_management_areas": {
            "_type": "array<object>",
            "name": "string",
            "distance_mi": "number",
            "size_acres": "number",
            "activities": "array<string>"
        },
        "historic_sites": {
            "_type": "array<object>",
            "name": "string",
            "distance_mi": "number",
            "significance": "string",
            "national_register": "boolean"
        },
        "rivers_for_paddling": {
            "_type": "array<object>",
            "name": "string",
            "characteristics": "array<string>"
        },
        "caves": {
            "_type": "array<object>|empty",
            "name": "string",
            "distance_mi": "number",
            "tour_length": "string"
        },
        "national_forest_areas": {
            "_type": "array<object>",
            "name": "string",
            "size_acres": "number",
            "features": "array<string>"
        }
    },
    
    "12_history_and_cultural_sites": {
        "_description": "Dam construction history, Civil War sites, preserved structures, heritage trails",
        "dam_construction_history": {
            "authorization": {"act": "string", "year": "number"},
            "timeline": "array<{year, event, details}>",
            "dam_specifications": {
                "height_ft": "number",
                "length_ft": "number",
                "width_ft": "number",
                "material": "string"
            },
            "cost_usd": "number"
        },
        "communities_flooded": {
            "documented": "boolean",
            "general_acknowledgment": "string",
            "missing_information": "array<string>"
        },
        "elk_river_valley_history": {
            "early_settlement": "array<{decade, settlers, location, significance}>",
            "town_of_sutton": {
                "established": "number",
                "strategic_importance": "string"
            }
        },
        "civil_war_history": {
            "military_significance": "string",
            "major_events": "array<{date, event, description, outcome}>",
            "notable_figures": "array<string>"
        },
        "historic_turnpikes": {
            "_type": "array<object>",
            "name": "string",
            "preserved_length_mi": "number",
            "built_years": "string",
            "national_register": "boolean"
        },
        "preserved_historic_structures": {
            "at_sutton_lake": "array<{name, type, location}>",
            "nearby_sites": "array<{name, distance_mi, features}>"
        },
        "interpretive_heritage": {
            "at_sutton_lake": {
                "historical_trails": "array<string>",
                "interpretive_signs": "array<string>",
                "civil_war_markers": "boolean"
            },
            "nearby_sites": "array<{site_name, interpretive_center, guided_tours}>"
        },
        "national_register_properties": "array<{name, type, year_listed}>"
    }
}

# Save the complete 12-section schema
with open('sutton_lake_complete_schema_12sections.json', 'w') as f:
    json.dump(complete_schema_12, f, indent=2)

print("✅ COMPLETE 12-SECTION SCHEMA CREATED")
print("="*80)
print("\nAll 12 Sections:")
print("  1. lake_specs - Physical specifications & hydrologic data")
print("  2. recreation_water - Swimming, paddling, tow sports, USACE restrictions")
print("  3. boat_ramps_and_marinas - USACE ramps & private marinas with detailed services")
print("  4. fishing - Species, stocking, regulations, tournaments")
print("  5. camping - USACE & private campgrounds")
print("  6. trails_and_hiking - Trail systems with difficulty & accessibility")
print("  7. wildlife_and_nature - Bird species, wildlife viewing, wildflower/foliage timing")
print("  8. family_activities_and_day_use - Picnic areas, playgrounds, visitor centers, programs")
print("  9. seasonal_conditions_and_access - Pool schedules, facility closures, ice fishing")
print("  10. practical_visitor_information - Addresses, contacts, services, cell coverage")
print("  11. nearby_outdoor_destinations - Parks, lakes, WMAs, historic sites (30 miles)")
print("  12. history_and_cultural_sites - Dam history, Civil War, preserved structures")
print("\n✅ File saved: sutton_lake_complete_schema_12sections.json")
print("\nThis schema matches your original 12-category research framework!")
