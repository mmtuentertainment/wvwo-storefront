
import pandas as pd
from datetime import datetime

# Create comprehensive Summersville Lake WMA hunting data
wma_data = {
    "WMA_Name": "Summersville Lake Wildlife Management Area",
    "County": "Nicholas County",
    "State": "West Virginia",
    "Total_Acreage": 5982,
    "Lake_Acreage": 2790,
    "Terrain_Description": "Ranges from forested rolling hills to vertical rock cliffs; oak-hickory forests with mixed hardwood coverage",
    "Elevation_Range_ft": "Not specifically documented",
    "Ownership": "U.S. Army Corps of Engineers",
    "Management": "West Virginia Division of Natural Resources (Wildlife Resources Section)",
    "Location_Reference": "Three miles south of Summersville on U.S. Route 19"
}

# Deer hunting seasons and regulations
deer_seasons = {
    "Season_Type": [
        "Archery & Crossbow",
        "Buck Firearms",
        "Muzzleloader",
        "Antlerless (Multiple Dates)",
        "Antlerless (Multiple Dates)",
        "Antlerless (Multiple Dates)",
        "Antlerless (Multiple Dates)",
        "Youth/Class Q/Class XS Antlerless",
        "Youth/Class Q/Class XS Antlerless",
        "Mountaineer Heritage Season"
    ],
    "Opening_Date": [
        "September 27, 2025",
        "November 24, 2025",
        "December 15, 2025",
        "October 23, 2025",
        "November 24, 2025",
        "December 11, 2025",
        "December 28, 2025",
        "October 18, 2025",
        "December 26, 2025",
        "January 8, 2026"
    ],
    "Closing_Date": [
        "December 31, 2025",
        "December 7, 2025",
        "December 21, 2025",
        "October 26, 2025",
        "December 7, 2025",
        "December 14, 2025",
        "December 31, 2025",
        "October 19, 2025",
        "December 27, 2025",
        "January 11, 2026"
    ],
    "Notes": [
        "Nicholas County: Open to antlerless (both base license and Class N/NN stamps)",
        "Nicholas County: Open to antlerless (both base license and Class N/NN stamps)",
        "Nicholas County: 7 days antlerless for base license and RM/RRM stamps",
        "Archery/Firearms combined",
        "Archery/Firearms combined",
        "Archery/Firearms combined",
        "Archery/Firearms combined",
        "Youth hunters only",
        "Youth hunters only",
        "Percussion side lock, flintlock, long bow, or recurve bow only"
    ]
}

# Game species available
game_species = {
    "Species": [
        "White-tailed Deer",
        "Wild Turkey (Spring)",
        "Wild Turkey (Fall)",
        "Black Bear",
        "Ruffed Grouse",
        "Squirrel (Gray, Black, Fox)",
        "Cottontail Rabbit",
        "Snowshoe/Varying Hare",
        "Waterfowl (Duck/Geese)",
        "Mourning Dove",
        "Woodcock"
    ],
    "Present_on_WMA": [
        "Yes",
        "Yes",
        "Yes (Possibly)",
        "NOT available in 2025",
        "Yes",
        "Yes",
        "Yes",
        "Yes",
        "Yes",
        "Yes",
        "Yes"
    ],
    "Notes": [
        "Primary hunting opportunity; abundant population",
        "April 20 - May 24, 2026; bearded birds only",
        "October 11-19, 2025 (check county for extended seasons)",
        "REMOVED FROM NICHOLAS COUNTY in 2025 - not available on Summersville Lake WMA",
        "October 18 - February 28, 2025-2026; 4 daily bag limit",
        "September 13 - February 28, 2025-2026; 6 daily bag limit",
        "November 1 - February 28, 2025-2026; 5 daily bag limit",
        "November 1 - February 28, 2025-2026; 2 daily bag limit",
        "Multiple segments: Oct 4-12, Nov 8-16, Dec 21-Jan 31",
        "Split season: Sept 1-Oct 12, Nov 3-16, Dec 8-Jan 10",
        "October 18 - November 22, December 1-9 (split season)"
    ]
}

# Furbearer trapping
furbearers = {
    "Species": [
        "Raccoon",
        "Red Fox",
        "Gray Fox",
        "Bobcat",
        "Coyote",
        "Beaver",
        "Mink",
        "Muskrat",
        "Opossum"
    ],
    "Trapping_Season": [
        "November 1 - February 28, 2025-2026",
        "November 1 - February 28, 2025-2026",
        "November 1 - February 28, 2025-2026",
        "November 1 - February 28, 2025-2026; 3 bag limit",
        "Year-round (hunting also available)",
        "November 1 - March 31, 2025-2026",
        "November 1 - February 28, 2025-2026",
        "November 1 - February 28, 2025-2026",
        "November 1 - February 28, 2025-2026"
    ],
    "Notes": [
        "Trapping permit required from District Wildlife Biologist",
        "Red fox hunting also available Nov 1-Feb 28 (day hunting)",
        "Gray fox hunting also available Nov 1-Feb 28 (day hunting)",
        "Limited to 3 bobcats per season statewide",
        "No closed season; available year-round hunting",
        "Requires daily trap check",
        "Requires daily trap check",
        "Requires daily trap check",
        "Year-round hunting available"
    ]
}

# Access and parking information
access_points = {
    "Area": [
        "Battle Run Campground",
        "Salmon Run",
        "Long Point",
        "Damsite Picnic Area",
        "Main WMA Access",
        "Archery Trail"
    ],
    "Access_Type": [
        "Major camping/boat ramp area",
        "Boat ramp and day use area",
        "Boat ramp and day use area",
        "Picnic area; winter boat launch",
        "Primary hunting access",
        "Archery/hunting trail (REOPENED)"
    ],
    "Facilities": [
        "110 RV campsites (electric hookups), 7 tent sites, boat ramp, beach, trails",
        "Boat ramp, day use area, trail access",
        "Boat ramp, day use area",
        "Picnic shelters, restrooms, winter boat access",
        "Parking areas, WMA trail access",
        "Dedicated archery trail (reopened July 2024)"
    ],
    "Road_Access": [
        "Passenger car accessible",
        "Passenger car accessible",
        "Passenger car accessible",
        "Passenger car accessible",
        "Passenger car accessible",
        "Dedicated trail access"
    ]
}

# Contact Information
contact_info = {
    "Organization": [
        "WVDNR District 3",
        "Summersville Lake Marina",
        "Summersville Lake Office",
        "USACE Resource Manager"
    ],
    "Phone": [
        "(304) 924-6211",
        "(304) 872-1331",
        "(304) 872-3412 or 1-800-SUMMERSVILLE",
        "(304) 872-3412"
    ],
    "Address": [
        "Box 38, French Creek, WV 26218",
        "On-site marina",
        "2981 Summersville Lake Road, Summersville, WV 26651",
        "2981 Summersville Lake Road, Summersville, WV 26651"
    ],
    "Purpose": [
        "Hunting licenses, permits, WMA information",
        "Boat rentals, fishing information",
        "General lake operations and emergency info",
        "Recreation area management"
    ]
}

# Create DataFrames
df_wma_info = pd.DataFrame([wma_data])
df_deer = pd.DataFrame(deer_seasons)
df_game_species = pd.DataFrame(game_species)
df_furbearers = pd.DataFrame(furbearers)
df_access = pd.DataFrame(access_points)
df_contact = pd.DataFrame(contact_info)

# Export to CSV for reference
df_wma_info.to_csv('summersville_wma_specifications.csv', index=False)
df_deer.to_csv('summersville_deer_seasons.csv', index=False)
df_game_species.to_csv('summersville_game_species.csv', index=False)
df_furbearers.to_csv('summersville_furbearers.csv', index=False)
df_access.to_csv('summersville_access_points.csv', index=False)
df_contact.to_csv('summersville_contact_info.csv', index=False)

print("=== SUMMERSVILLE LAKE WMA HUNTING DATA ===\n")
print("WMA SPECIFICATIONS:")
print(df_wma_info.to_string(index=False))
print("\n" + "="*80 + "\n")
print("DEER HUNTING SEASONS:")
print(df_deer.to_string(index=False))
print("\n" + "="*80 + "\n")
print("GAME SPECIES AVAILABLE:")
print(df_game_species.to_string(index=False))
print("\n" + "="*80 + "\n")
print("FURBEARER TRAPPING SEASONS:")
print(df_furbearers.to_string(index=False))
print("\n" + "="*80 + "\n")
print("ACCESS POINTS & PARKING:")
print(df_access.to_string(index=False))
print("\n" + "="*80 + "\n")
print("CONTACT INFORMATION:")
print(df_contact.to_string(index=False))
