
# Create a comprehensive data summary for Summersville Lake based on research

data = {
    "Lake Specifications": {
        "Surface Area - Summer Pool": "2,700-2,790 acres",
        "Surface Area - Winter Pool": "928 acres", 
        "Summer Pool Elevation": "1,652 feet",
        "Winter Pool Elevation": "1,575 feet",
        "Maximum Depth": "327 feet",
        "Average Depth": "Not officially published in USACE sources",
        "Shoreline Length": "60 miles",
        "Water Clarity (Visibility)": "20-45 feet (summer average for scuba divers)",
        "Secchi Disk Readings": "Not officially published in public USACE data"
    },
    "Swimming Areas": {
        "Battle Run Beach": {
            "Description": "1,000-foot sandy swimming beach",
            "Lifeguards": "No - swim at your own risk",
            "Restrooms": "Yes - vault toilets, changing rooms",
            "Day Use Fee": "$5.00 per vehicle",
            "Amenities": "Picnic shelters, boat ramps, changing facilities"
        },
        "Salmon Run": {
            "Description": "Swimming area with boat ramp access",
            "Day Use Fee": "$5.00 per vehicle",
            "Year-Round Access": "Only boat launch open year-round"
        },
        "Swimming Season": "May 1 - Columbus Day (mid-October), peak summer use June-September",
        "Rules": "Pets and alcohol prohibited at beaches; cliff diving/jumping prohibited; always swim with buddy and wear life jacket"
    },
    "Scuba Diving": {
        "Reputation": "Called 'Little Bahamas of the East' by Skin Diver Magazine",
        "Visibility": "20-45 feet average in summer",
        "Water Temperature": "78-85°F June-September; 68-80°F general summer range",
        "Underwater Features": [
            "Steep sandstone cliffs descending ~100 feet below surface",
            "Rock walls, overhangs, boulders, swim-throughs",
            "Submerged town of Gad (ghost town flooded in 1966)",
            "Thomas Patrick boat (intentionally sunk ~30 feet deep near winter boat ramp)"
        ],
        "Popular Dive Sites": "Long Point Cliff, Bubble's Cave, The Overlook, Copperhead Cove, The Wall",
        "Dive Shop": "Sarge's Dive Shop - offers NAUI & SDI certification, equipment rental",
        "Certification Required": "Yes - must be certified to dive; training available on-site",
        "Best Diving Months": "June through September (warmest water, best visibility)"
    },
    "Cliff Jumping - Long Point": {
        "Legal Status": "ILLEGAL - USACE banned cliff jumping from heights >6 feet in 2007",
        "Cliff Heights": "30-70 feet (varies by location)",
        "Enforcement": "Violators may face fines; ban covers all 19 Huntington District lakes",
        "Safety": "69 water-related deaths 1993-2007 led to ban",
        "Access": "Hiking trails at Long Point, Battle Run, Salmon Run",
        "Note": "Deep water soloing (climbing) is technically legal; falling is prohibited"
    },
    "Managing Agency": {
        "Primary Manager": "U.S. Army Corps of Engineers, Huntington District",
        "Contact": {
            "Address": "Summersville Lake, 2981 Summersville Lake Road, Summersville, WV 26651",
            "Phone": "304-872-3412",
            "Email": "pa2@usace.army.mil",
            "Recording": "24-hour lake/stream info available via phone menu"
        },
        "Official Website": "https://www.lrd.usace.army.mil/Missions/Recreation/Lakes/Summersville-Lake/",
        "Partners": "WV DNR manages 5,390 acres for fish and wildlife; WV State Parks manages 177-acre state park section"
    }
}

# Print organized summary
print("SUMMERSVILLE LAKE - OFFICIAL DATA SUMMARY")
print("="*60)

for category, details in data.items():
    print(f"\n{category.upper()}")
    print("-"*60)
    if isinstance(details, dict):
        for key, value in details.items():
            if isinstance(value, dict):
                print(f"\n  {key}:")
                for subkey, subvalue in value.items():
                    print(f"    • {subkey}: {subvalue}")
            elif isinstance(value, list):
                print(f"  {key}:")
                for item in value:
                    print(f"    • {item}")
            else:
                print(f"  • {key}: {value}")
    else:
        print(f"  {details}")

print("\n" + "="*60)
print("Sources: USACE Huntington District, WV State Parks, Nicholas County CVB")
