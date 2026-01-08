
import json
from datetime import datetime

# Create the comprehensive JSON/TypeScript object for website implementation
wma_data = {
    "name": "Elk River Wildlife Management Area",
    "image": {
        "primary": "https://wvdnr.gov/wmamapproj/pdf/pdf150/ElkRiverFinal11x17_150dpi.pdf",
        "suggestions": [
            "WVDNR official Elk River WMA map with trail network",
            "Sutton Lake scenic view with dam and forested shoreline",
            "Mature hardwood forest habitat typical of area",
            "Elk and Holly Rivers confluence or stream reach photo"
        ]
    },
    "imageAlt": "Topographic map of Elk River Wildlife Management Area showing access points, boat ramps, and trail systems across 18,396 acres in Braxton County, West Virginia",
    "tagline": "Nearly 19,000 acres of mature hardwood forest and dual-river access for hiking, fishing, hunting, wildlife viewing, and boating.",
    "description": "Elk River Wildlife Management Area spans 18,396–19,646 acres across Braxton County, West Virginia, encompassing steep hills, ridges, and benches dominated by mature hardwood forests with old-growth timber interspersed with partially timbered areas and maintained wildlife trails. The WMA protects lands along two major rivers—the Elk River and Holly River—upstream of Sutton Lake, a 1,440-acre impoundment managed by the U.S. Army Corps of Engineers. This area is West Virginia's oldest and most accessible WMA, offering public access to diverse outdoor recreation year-round, from paddle sports and warm-water fisheries in Sutton Lake and tailwaters to rugged forest hiking, wildlife viewing, seasonal hunting and trapping, and nature study across interconnected tracts.",
    "managingAgency": {
        "name": "West Virginia Division of Natural Resources (WVDNR), Wildlife Resources Section",
        "contact": {
            "address": "Box 38, French Creek, WV 26218",
            "phone": "(304) 924-6211",
            "email": "DNR.Wildlife@wv.gov",
            "website": "wvdnr.gov"
        },
        "district": "District 3"
    },
    "stats": [
        {
            "label": "Total Acreage",
            "value": "18,396–19,646 acres (WVDNR official source reports 18,396; Visit Braxton tourism reports 19,646)"
        },
        {
            "label": "Location",
            "value": "Braxton County, West Virginia; centered near Sutton (County seat)"
        },
        {
            "label": "Nearest Major Town",
            "value": "Sutton, WV (~5–7 miles from primary access); I-79 Exit 67 (Flatwoods) ~8 miles"
        },
        {
            "label": "Drive Time from Major Cities",
            "value": "Charleston, WV: ~60 miles (1.5 hrs); Beckley, WV: ~65 miles (1.5 hrs); Clarksburg, WV: ~80 miles (2 hrs)"
        },
        {
            "label": "Elevation Range",
            "value": "~1,000–3,400 feet (estimated based on steep ridge/valley terrain)"
        },
        {
            "label": "Terrain Type",
            "value": "Steep hills, ridges, benches; mixed hardwood forest; river bottoms"
        },
        {
            "label": "Central Coordinates",
            "value": "38.6297°N, 80.5658°W (Elk River access point near Sutton)"
        }
    ],
    "coordinates": {
        "latitude": 38.6297,
        "longitude": -80.5658,
        "citation": "web:1"
    },
    "accessInfo": {
        "mainAccessPoints": [
            {
                "name": "Elk River Section (Primary)",
                "directions": "From I-79 Exit 67 (Flatwoods), take WV Route 19/40 south ~2 miles, turn onto secondary Route 15, follow WVDNR signs. Alternatively, from WV Route 19/40 near Sutton, turn east on Route 17, travel 3.7 miles southeast of Sutton, follow WVDNR signs.",
                "parking": "Multiple WVDNR parking areas; Bee Run Day Use Area (Sutton Lake)",
                "amenities": "Vault toilets, picnic areas, boat ramps"
            },
            {
                "name": "Holly River Section",
                "directions": "From I-79 Exit 67 (Flatwoods), take WV Route 4/19 south ~2 miles to secondary Route 15, proceed east following WVDNR signs.",
                "parking": "WVDNR parking pull-offs",
                "amenities": "Stream access for hiking and fishing"
            }
        ],
        "fees": {
            "day_use": "No entrance fee for WMA itself. Sutton Lake boat launch: $3.00/day or annual pass available.",
            "permits": "West Virginia hunting and fishing licenses required. No hunting during closed season. See wvhunt.com for current seasons, stamps, and regulations."
        },
        "hours": "Open year-round, 24/7 for most day-use activities. Hunting seasons regulated by WVDNR—check wvhunt.com for 2026 dates.",
        "camping": "Camping NOT permitted on WMA lands. Nearby options: Sutton Lake campgrounds (U.S. Army Corps of Engineers), Holly River State Park, Watoga State Park."
    },
    "boatingFishing": {
        "suttonLake": {
            "acres": 1440,
            "boatRamps": 5,
            "details": "5 public boat ramps; handicapped-accessible piers; electric motors only or unrestricted (varies by location). Operated by U.S. Army Corps of Engineers.",
            "marina": "Gerald R. Freeman Campground Marina: (304) 765-2120",
            "lakeConditions": "(304) 765-2705",
            "resourceManager": "(304) 765-2816"
        },
        "warmWaterFisheries": {
            "species": ["Largemouth bass", "Smallmouth bass", "Spotted bass", "Bluegill", "Channel catfish", "Crappie", "Muskellunge", "Walleye", "Carp"],
            "seasons": "Year-round under West Virginia fishing regulations",
            "notes": "Sutton Lake is a warm-water fishery; relatively uncrowded vs. Stonewall Jackson Lake."
        },
        "coldWaterFisheries": {
            "location": "Sutton Dam tailwaters (below dam) and upper Elk River tributaries",
            "species": ["Brown trout", "Rainbow trout", "Golden rainbow trout", "Brook trout", "Tiger trout"],
            "stocking": "Bi-weekly Feb–April, one final stocking in May. Best fishing Feb–May in tailwaters.",
            "notes": "Trout stocked seasonally in tailwaters; excellent opportunity first mile downstream."
        },
        "riverFishing": {
            "streams": ["Elk River", "Holly River"],
            "species": "Bass, panfish, muskie, walleye; trout in upper reaches",
            "access": "Foot traffic and wading permitted; boat access on Elk River subject to water levels"
        }
    },
    "activities": [
        {
            "activity": "Hiking & Walking",
            "where_allowed": "Throughout WMA on maintained trails and informal footpaths; over 30 miles of trails across Elk River and Holly River sections",
            "best_seasons": "Spring (April–May), fall (September–October); summer possible but warm, humid; winter variable (snow not reliable at lower elevations)",
            "difficulty": "Easy to moderate on maintained trails; challenging on steep ridges",
            "key_rules": "Stay on marked trails where available. No camping. Carry out all trash. Respect private land boundaries (WMA boundaries marked).",
            "specific_trails": "30+ miles of managed trail system maintained by WVDNR; many crisscross the landscape allowing pull-off access.",
            "facilities": "Vault toilets at major access points; no developed rest stops on trails"
        },
        {
            "activity": "Wildlife Viewing & Birding",
            "where_allowed": "Throughout WMA; best from trails, stream edges, and open ridge areas",
            "best_seasons": "Spring migration (April–May) for songbirds; year-round for resident birds. Autumn hawk migration (Sept–Oct). Deer and turkey dawn/dusk.",
            "difficulty": "Easy to moderate depending on access choice",
            "key_rules": "Remain quiet and patient. No dogs except hunting season. Do not feed wildlife. Binoculars/spotting scope recommended.",
            "highlights": "Black bears, wild turkey, white-tailed deer, squirrels, raccoons, beavers in streams. Bald eagles, red-tailed hawks, songbirds. Reported folklore of 'Bigfoot' sightings around Sutton Lake area (unconfirmed).",
            "species_diversity": "Over 100 fish species and diverse forest wildlife typical of Central Appalachian hardwood ecosystems"
        },
        {
            "activity": "Photography & Nature Study",
            "where_allowed": "Throughout WMA; scenic overlooks on ridge trails, river confluences, old-growth forest stands, wildlife habitat areas",
            "best_seasons": "Spring wildflowers (April–May); fall foliage (October); golden hour sunrise/sunset",
            "difficulty": "Easy to moderate",
            "key_rules": "Respect wildlife—maintain distance for safe observation and non-disturbance. Permission required for commercial photography on public lands.",
            "opportunities": "Mature hardwood forest ecology, stream geology, wildflower identification, wildlife behavior documentation"
        },
        {
            "activity": "Boating & Paddling",
            "where_allowed": "Sutton Lake (motorized boating permitted with restrictions); Elk River below dam (kayak/canoe if water levels safe); Holly River (kayak/canoe, water level dependent)",
            "best_seasons": "Late spring–fall; summer warm but lake pleasant; winter ice hazard",
            "difficulty": "Easy (lake paddle); easy to moderate (river float, depending on flow)",
            "key_rules": "Wear PFD (personal flotation device) always. Follow USACE regulations for Sutton Lake. Motor restrictions: electric only on Big Ditch Lake; unrestricted elsewhere. Respect hunting zones during seasons.",
            "boat_launches": "5 ramps on Sutton Lake; trailer/canoe access at Bee Run, Baker's Run, Gerald R. Freeman, South Abutment",
            "notes": "Lower Elk River below Sutton Dam excellent for muskie and walleye fishing. Large, deep, cold pool holds trout and gamefish; paddle downstream 1+ miles for scenic float."
        },
        {
            "activity": "Fishing (General)",
            "where_allowed": "Sutton Lake; Elk and Holly rivers; tributary streams",
            "best_seasons": "Year-round under state regulations; trout stocking Feb–May in tailwaters; warm-water bass April–October",
            "difficulty": "Easy to moderate depending on target species and terrain",
            "key_rules": "Valid West Virginia fishing license required (age 15+). Catch-and-release restrictions apply in some areas. Obey creel limits and size limits per current regulations. Check wvdnr.gov for 2026 specifics.",
            "license_info": "Available at wvhunt.com or local licensed agents; lifetime, annual, and daily options"
        },
        {
            "activity": "Hunting & Trapping (Seasonal)",
            "where_allowed": "Throughout WMA during legal seasons; Class Q hunting access provided",
            "seasons": "Deer (archery Sept–Jan; gun Sept–Dec; muzzleloader); turkey (spring April–May; fall Oct–Nov); small game (squirrel, grouse, dove, woodcock, waterfowl); furbearers (beaver, bobcat, coyote, fox, mink, muskrat, opossum, raccoon, skunk)",
            "difficulty": "Moderate to challenging depending on terrain and game",
            "key_rules": "Hunter education certificate required (first-time purchasers). Blaze orange/hunter orange clothing mandated during gun season. Uncased firearms prohibited except during open season. No hunting on Sunday (per WV law). Two shooting ranges available (100- and 175-yard). Black bear seasons: archery/crossbow Sept 27–Dec 31, 2025; firearms seasons vary.",
            "permits": "Standard hunting license + big game stamps (deer, bear, turkey). Trapping license for furbearers.",
            "firearm_safety": "Firearms must be cased when not actively hunting. Never shoot at wildlife unless plainly visible. Never across public roads.",
            "visibility": "WMA has diverse terrain—mature forest limits visibility in some areas; plan accordingly. Expect other hunters during peak season.",
            "access": "Well-maintained hunting trails and road/trail network allow easy pull-off access; described as 'one of most accessible WMAs' in district"
        },
        {
            "activity": "Dog Training & Hunting",
            "where_allowed": "During hunting season only, per state regulations",
            "seasons": "Legal hunting seasons (closed May 1–Aug 15 for dog training on wild game)",
            "difficulty": "Moderate to challenging",
            "key_rules": "Dogs may not chase or pursue wild animals May 1–Aug 15. Non-residents may only train dogs during legal small game hunting season. Firearm possession prohibited during off-season dog training (except self-defense). Pointer/setter/hound training common.",
            "notes": "Consult WVDNR for current dog training regulations; typically done by hunters with pointing/flushing breeds."
        },
        {
            "activity": "Foraging (Not Explicitly Regulated)",
            "where_allowed": "Check with WVDNR; ginseng, ramps, mushroom collection may be allowed with permit",
            "best_seasons": "Spring (ramps, morels); fall (walnuts, hickory nuts, mushrooms)",
            "difficulty": "Easy to moderate",
            "key_rules": "Unknown (not found in sources). Recommend contacting WVDNR District 3 before foraging to confirm what, if any, restrictions apply.",
            "note": "Information gap—foraging rules not documented in official sources reviewed."
        },
        {
            "activity": "Mountain Biking (Informal)",
            "where_allowed": "Likely permitted on WMA roads and trails; not explicitly documented",
            "best_seasons": "Spring, fall (avoid mud)",
            "difficulty": "Moderate depending on trail condition",
            "key_rules": "Unknown (not found in sources). Recommend confirming with WVDNR before planning.",
            "note": "Information gap—biking not explicitly mentioned in official WMA guides."
        },
        {
            "activity": "Horseback Riding (Informal)",
            "where_allowed": "Likely permitted; not explicitly documented for this WMA",
            "best_seasons": "Spring–fall",
            "difficulty": "Moderate",
            "key_rules": "Unknown (not found in sources). Contact WVDNR for confirmation.",
            "note": "Information gap—equestrian use not mentioned in official sources."
        },
        {
            "activity": "Winter Activities (Snowshoe, Cross-Country Ski)",
            "where_allowed": "Throughout WMA where snow permits; nearby Elk River Touring Center (outside WMA, 5 miles away) offers groomed trails",
            "best_seasons": "December–March (snow dependent; average 50–200\" at higher elevations depending on location)",
            "difficulty": "Easy to moderate",
            "key_rules": "No motor vehicles except authorized WVDNR. Trails may not be groomed on WMA itself; nearby Elk River Touring Center maintains ~25 miles of groomed XC ski and snowshoe trails.",
            "nearby_resources": "Elk River Touring Center at base of Snowshoe Mtn (~30 min drive): XC ski/snowshoe rentals, 25+ km groomed trails, 10 km ungroomed, elevation 2,730–4,750 ft, avg. 150–200\" snow annually."
        }
    ],
    "visitorLogistics": {
        "bestTime": {
            "overview": "Spring (April–May) and fall (September–October) offer ideal weather, wildlife activity, and scenery.",
            "spring": "Wildflowers, songbird migration, turkey season, fishing improves",
            "summer": "Warm, humid; lake swimming pleasant; deer hunting closed; buggy (mosquitoes, ticks high)",
            "fall": "Foliage peak, hawk migration, comfortable temps, hunting seasons open, fishing good",
            "winter": "Quiet, fewer crowds; snow unreliable at lower elevations; cross-country skiing possible at higher areas; ice fishing on Sutton Lake if safe"
        },
        "firstTimerPlan": {
            "halfDay": "Start at Bee Run Day Use Area or Sutton Lake boat ramp. Fish Sutton Lake or walk picnic area. Enjoy lake views, rest facilities (handicapped accessible).",
            "fullDay": "Morning: hike Holly River or Elk River trail (2–4 miles easy). Afternoon: boat/kayak on Sutton Lake or fish tailwaters. Evening: scenic overlook at sunset. Stop in Sutton for local dining.",
            "overnight": "Camp at Sutton Lake (U.S. Army Corps campgrounds: Gerald R. Freeman, Baker's Run, Bee Run—reservations via 1-877-444-6777 or recreation.gov). Next day: longer hike (ridge trail, 4–6 miles) or extended float trip."
        },
        "directions": {
            "fromI79": "Exit 67 (Flatwoods): Take WV Route 19/40 south ~2 mi, turn east on secondary Route 15, follow WVDNR signs to Holly River section. For Elk River section, continue on 19/40, turn east onto Route 17 ~3.7 mi SE of Sutton, follow signs.",
            "fromSutton": "Town center is ~5–7 miles from main WMA access. Head toward Sutton Lake / I-79. Route 19/40 corridor provides primary access.",
            "gps": "38.6297°N, 80.5658°W (Elk River central point)"
        },
        "parkingRestrooms": {
            "parking": "WVDNR pull-off areas at major trail heads; Bee Run, Baker's Run, Gerald R. Freeman, South Abutment day-use areas with ample parking",
            "restrooms": "Vault toilets at Bee Run and other developed access points. No facilities on backcountry trails.",
            "water": "Well water available at some WMA facilities; bring water for day hikes. Sutton Lake treated water at marina and campgrounds.",
            "cellCoverage": "Likely spotty in ridge areas; better near Sutton town. Trails have no service—bring map/compass."
        },
        "nearbyServices": {
            "sutton": {
                "distance": "~5–7 miles from main WMA access",
                "services": "Gas, food (local restaurants, cafes), lodging (Elk River Hotel, Days Inn, other motels), groceries, ATMs"
            },
            "flatwoods": {
                "distance": "~8 miles (I-79 Exit 67)",
                "services": "Gas, fast food, some lodging"
            },
            "closestHospital": "Braxton County Medical Center (Sutton, WV); general emergency services. ~20–30 min from remote WMA areas."
        },
        "nearbyAttractions": [
            {
                "name": "Holly River State Park",
                "distance": "~15–20 miles (near Hacker Valley)",
                "highlights": "8,294 acres, 42+ miles of hiking/biking trails, 88-unit campground, cabins, 2 marinas, seasonal swimming pool, picnic areas, guided nature programs"
            },
            {
                "name": "Watoga State Park",
                "distance": "~25–30 miles (Marlinton, Pocahontas County)",
                "highlights": "West Virginia's largest state park (10,100 acres), extensive hiking, cabins, camping, wildflowers, scenic views"
            },
            {
                "name": "Elk River Trail",
                "distance": "Adjacent/overlaps",
                "highlights": "73-mile rail-to-trail from Clendenin to Gassaway; paved/packed gravel, beginner-friendly; crosses Braxton, Clay, Kanawha counties"
            },
            {
                "name": "Sutton Lake Marina & Recreation",
                "distance": "Within WMA boundary",
                "highlights": "Full-service marina, campgrounds, swimming beaches, picnic areas, boat rentals"
            },
            {
                "name": "Elk River Touring Center (Snowshoe Mtn area)",
                "distance": "~30–40 miles north",
                "highlights": "25+ miles XC ski/snowshoe trails, rentals, lessons, lodging, restaurants, base of Snowshoe Mtn ski resort"
            }
        ]
    },
    "rulesAndSafety": {
        "hoursClosures": {
            "hours": "Open 24/7 year-round for day-use activities (hiking, fishing, boating, wildlife viewing)",
            "closures": "No specific seasonal closures documented; hunting seasons have open/close dates per state regulations (consult wvhunt.com)",
            "lakeAccess": "Sutton Lake day-use areas open dawn–dusk typically; some facilities (marinas) have posted hours"
        },
        "vehicles": {
            "policy": "Motor vehicles not permitted on WMA trails or backcountry areas. Vehicles on designated roads/parking areas only.",
            "enforcement": "WVDNR wildlife officers patrol; violations subject to fines."
        },
        "fires": {
            "policy": "Explosives, incendiaries, and flammable materials prohibited on WMA. Open fires not permitted (check current fire regulations).",
            "exception": "Permitted only in designated campground areas (Sutton Lake campgrounds have fire rings where allowed)"
        },
        "camping": {
            "onWMA": "NOT permitted on WMA lands",
            "nearby": "Sutton Lake (U.S. Army Corps): 236 tent/trailer, 12 primitive campsites. Holly River State Park: 88-unit campground. Baker's Run, Gerald R. Freeman, Bee Run campgrounds open late May–late October (dates vary)."
        },
        "pets": {
            "policy": "Dogs permitted during hunting season only. Outside hunting season, restricted (no dog training on wild game May 1–Aug 15). Leash requirements vary—check with WVDNR.",
            "enforcement": "WVDNR law enforcement"
        },
        "drones": {
            "policy": "Drones (unmanned aircraft) prohibited for hunting or wildlife harassment. Limited exceptions for licensed drone operators conducting mortally wounded deer recovery (requires state outfitter/guide license + FAA Part 107 certification). Non-licensed drone use not permitted.",
            "note": "New 2025 law allows thermal drone recovery of wounded deer; other recreational use not explicitly addressed."
        },
        "hunting_season_safety": {
            "visibility": "Wear blaze orange/hunter orange during firearm season (late Sept–Dec). Mature forest terrain can limit visibility—use caution.",
            "season_dates": "Black bear archery Sept 27–Dec 31, 2025; firearms Sept–Oct (specific dates vary). Deer, turkey, small game have multiple seasons—check wvhunt.com for 2026 dates.",
            "firearm_rules": "Uncased firearms prohibited except during open hunting season. Firearms must be unloaded in vehicles. Never shoot across public roads or at anything not clearly visible.",
            "awareness": "Expect hunters during peak season (Sept–Dec). Plan accordingly; avoid high-traffic hunting areas during peak weekends or wear bright orange."
        },
        "hazards": {
            "ticks": "High risk, especially spring–fall. Blacklegged (deer) ticks carry Lyme disease, Rocky Mountain spotted fever. Eastern wood ticks also present. Lyme disease is most common tick-borne illness in WV. Mitigation: tuck pants into socks, use insect repellent (DEET), check body after hiking, remove embedded ticks promptly.",
            "flooding": "Elk and Holly rivers subject to flash flooding during heavy rain. Sutton Lake level managed for flood control; sudden water release possible from dam. Never camp in river bottoms or approach streams during/after heavy rain.",
            "terrain": "Steep hills and ridges—fall hazard. Wear sturdy boots, watch footing on wet/icy terrain. No technical climbing gear required for WMA trails.",
            "river_hazards": "Fast current in sections, cold water year-round. Wear PFD when boating. Strong swimmers only; never wade alone. Water levels vary—check conditions before float trips.",
            "weather": "Appalachian weather changeable. Carry water, sun protection, rain jacket. Temperature swings (50°F to 80°F+ in spring/fall). Winter ice hazard on lake and streams.",
            "wildlife": "Black bears present; maintain distance (100+ yards). Never approach or feed. Store food securely at camps. Venomous snakes (copperhead, timber rattlesnake) rare but possible in warm months—watch ground, avoid tall grass at dusk. Defensive animals (raccoons, opossums) present—never corner; leave alone."
        },
        "emergency": {
            "nearest_hospital": "Braxton County Medical Center, Sutton, WV; ~20–30 min from remote areas",
            "emergency_services": "Call 911 from cell phone if coverage available (spotty on ridges). Inform dispatcher of WMA location; EMS may require hiking time to reach backcountry.",
            "communication": "Carry charged cell phone; satellite communicator (e.g., Garmin InReach) recommended for backcountry. No cell service on most trails.",
            "self_rescue": "Tell someone your planned route and return time. Carry map, compass, basic first aid, water, food. Sit tight if lost; rescuers trained to search along planned routes."
        }
    },
    "ecologyConservation": {
        "habitat_types": [
            "Mature hardwood forest (oak-hickory, mixed mesophytic)",
            "Mixed and young forest with brush and old fields",
            "River bottomlands (Elk River, Holly River floodplain)",
            "Ridge and bench systems (steep, forested slopes)",
            "Wetland areas (emerging wetlands in stream valleys)"
        ],
        "key_species": {
            "mammals": [
                "White-tailed deer (abundant; primary game species)",
                "Black bear (common; expanding population)",
                "Wild turkey (common; major game species)",
                "Beaver, muskrat, mink (stream-dependent)",
                "Raccoon, opossum, skunk, fox (coyote expanding)",
                "Squirrels (eastern gray, fox, southern flying)"
            ],
            "birds": [
                "Bald eagles, red-tailed hawks, red-shouldered hawks (raptors)",
                "Wild turkey vultures",
                "Resident forest songbirds (wood thrush, hooded warbler, ovenbird, Kentucky warbler)",
                "Spring migrants (warblers, vireos, flycatchers April–May)",
                "Waterfowl (Canada geese, mallards, wood ducks on lake/rivers)"
            ],
            "fish": [
                "Largemouth, smallmouth, spotted bass (Sutton Lake)",
                "Walleye, muskellunge (lake and tailwaters)",
                "Bluegill, crappie, catfish (panfish)",
                "Trout: brown, rainbow, golden rainbow, brook, tiger (stocked tailwaters Feb–May)",
                "100+ species total in Elk River (one of state's most biodiverse rivers)"
            ],
            "protected_endangered": [
                "Crystal darter (Crystallaria asprella) – Endangered, endemic to Elk River; extremely rare (8 specimens known as of mid-2000s); benthic habitat specialist",
                "Diamond darter (Etheostoma mooneyi) – Endangered, found only in Elk River; critical habitat King Shoals to Coonskin Park",
                "Spotted darter (Etheostoma maculatum) – Rare in Elk River; benthic specialist",
                "Freshwater mussels: Clubshell (Pleurobema clava), Pink mucket pearlymussel (Lampsilis abrupta), Northern riffleshell (Epioblasma torulosa rangiana), Rayed bean, Snuffbox – Endangered/threatened in lower Elk River below Sutton Dam",
                "Indiana bat – Hibernates in WV caves; not present on WMA but regional conservation concern"
            ]
        },
        "notable_features": {
            "biodiversity": "Elk River is one of West Virginia's most ecologically diverse rivers, supporting 100+ fish species and 30 mussel species",
            "watershed": "Upper Elk River provides year-round trout habitat (limestone spring-fed sections). Main stem supports diverse warm-water and cold-water fish communities.",
            "old_growth_forest": "Mature hardwood stands with large oaks, hickories, and mixed species; old-growth timber interspersed with younger regeneration"
        },
        "management_practices": {
            "prescribed_burn": "West Virginia authorized prescribed burning on WMAs (2018 law). WVDNR uses controlled burns to restore oak regeneration, wildlife habitat diversity, manage invasive species, and enhance turkey/grouse brood habitat in cooperation with state forestry.",
            "invasive_species_control": "Gypsy moth, hemlock disease, and invasive plant species management ongoing across state forests/WMAs. Strategies include monitoring, targeted removal, and habitat restoration.",
            "habitat_enhancement": "Wildlife clearings, brush habitat creation, food plots, stream restoration where applicable",
            "wetland_management": "Wetland development and maintenance for waterfowl and amphibian habitat",
            "timber_management": "Selective harvesting and regeneration forestry to maintain forest health and diversity"
        },
        "seasonal_ecology": {
            "spring": "Wildflower blooms (April–May), songbird migration peak, turkey mating calls, beaver activity high, fish spawning",
            "summer": "Breeding season for birds and mammals; warm water; insect abundance; tick peak",
            "fall": "Acorn production; deer rut (Sept–Oct); hawk migration; leaf color change; cooler temperatures",
            "winter": "Reduced insect activity; resident birds remain; deer yard up; bear denning; limited water flow in small streams"
        },
        "conservation_status": "The Elk River WMA represents critical habitat for multiple rare and endangered aquatic species (mussels, darters) found nowhere else or very limited locations. Threats include siltation from mining/forestry, water quality degradation, invasive species, and dam impacts. WVDNR and partner agencies work to monitor and protect populations through habitat restoration and regulations."
    },
    "accessibilityADA": {
        "accessible_features": [
            "Handicapped-accessible piers at Sutton Lake (2 locations documented)",
            "Bee Run and Gerald R. Freeman day-use areas have universally accessible facilities (parking, restrooms)",
            "Project Office facilities accessible",
            "Some campground facilities designed for accessibility (check ahead)",
            "Boat ramps suitable for trailer launch but not wheelchair-to-dock transfer without assistance"
        ],
        "limitations": "Most WMA trails are backcountry with steep terrain; not ADA-compliant. Wheelchair access limited to developed areas only (parking, picnic, marina offices).",
        "resources": "West Virginia Assistive Technology System offers equipment loans (recumbent bikes, beach wheelchairs) for outdoor access—contact 800-841-8436"
    },
    "gearList": {
        "essential_allActivities": [
            "Valid WV hunting or fishing license (if applicable)",
            "Map of WMA and trail network (download from WVDNR)",
            "Compass or GPS device (cell service unreliable)",
            "Water (2+ liters per person per day)",
            "Sun protection (sunscreen, hat, sunglasses)",
            "Insect repellent (DEET 20%+ for tick/mosquito prevention)",
            "Basic first aid kit",
            "Headlamp or flashlight",
            "Blaze orange/hunter orange clothing (during hunting season)"
        ],
        "hiking_walking": [
            "Sturdy hiking boots (waterproof recommended)",
            "Lightweight rain jacket",
            "Layered clothing (temp swings 30°F+)",
            "Pack (15–25L day pack)",
            "Snacks/energy food",
            "Tick tweezers for removal"
        ],
        "fishing": [
            "Rod and reel or fly rod (appropriate for target species)",
            "Tackle box with lures/baits",
            "Net (if targeting larger fish)",
            "Cooler if keeping fish",
            "License card (physical or on phone)"
        ],
        "boating_paddling": [
            "Personal flotation device (PFD) – REQUIRED",
            "Kayak or canoe (if bringing own)",
            "Paddle",
            "Dry bag for personal items",
            "Whistle",
            "Throw rope",
            "Helmet (if paddling whitewater sections)"
        ],
        "hunting": [
            "Valid hunting license + stamps",
            "Hunter education certificate (first-time)",
            "Firearm or bow + ammunition/arrows (appropriate for game)",
            "Gun case (for transport)",
            "Hunting knife or processing kit",
            "Blaze orange clothing (100+ sq. in. visible)",
            "Scent control (optional; deer hunting)",
            "Tree stand or ground blind (if applicable)"
        ],
        "winter_activities": [
            "Cross-country skis or snowshoes (rent nearby at Elk River Touring Center if preferred)",
            "Insulated, waterproof boots",
            "Thermal layers (merino wool or synthetic)",
            "Insulated gloves and hat",
            "Face protection (balaclava or neck gaiter)",
            "Goggles or sunglasses (snow glare)",
            "Hand/foot warmers",
            "Avalanche safety gear if touring backcountry (not typical for WMA gentle slopes)"
        ],
        "photography": [
            "Camera with macro/telephoto lens",
            "Tripod",
            "Neutral density filter (for waterfall long exposure)",
            "Rain cover for gear"
        ]
    },
    "relatedShop": [
        {
            "category": "Fishing Equipment & Licenses",
            "description": "Local bait & tackle shops in Sutton or Flatwoods; online via wvhunt.com"
        },
        {
            "category": "Hunting & Firearms",
            "description": "Regional sporting goods stores; ensure compliance with WV laws and background checks"
        },
        {
            "category": "Outdoor Apparel",
            "description": "Hiking boots, rain jackets, base layers available locally or online (REI, Amazon, Dick's Sporting Goods, Cabela's)"
        },
        {
            "category": "Camping & Boating Gear",
            "description": "Tent, sleeping bag, PFD, kayak; available locally or online via major retailers"
        },
        {
            "category": "Cross-Country Ski & Snowshoe Rentals",
            "description": "Elk River Touring Center (near Snowshoe Mtn, 30 mi away): rentals $20–$25/day"
        }
    ],
    "sources": [
        {
            "id": "web:1",
            "title": "Elk River Wildlife Management Area",
            "source": "Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Elk_River_Wildlife_Management_Area",
            "date": "2008-04-03 (last verified)",
            "annotation": "Basic facts: 18,225 acres, location near Sutton, Braxton County; coordinates 38.6297°N 80.5658°W"
        },
        {
            "id": "web:3",
            "title": "District 3 Wildlife Management Areas",
            "source": "WVDNR Official",
            "url": "https://wvdnr.gov/lands-waters/wildlife-management-areas/district-3-wildlife-management-areas/",
            "date": "2022-08-01",
            "annotation": "Official WVDNR description: 18,396 acres, directions, facilities (camping not permitted, vault toilets, picnic areas), fishing/hunting prospects, Class Q access, shooting ranges (100- and 175-yard)"
        },
        {
            "id": "web:4",
            "title": "Elk River Wildlife Management Area",
            "source": "Visit Braxton, WV (Tourism)",
            "url": "https://braxtonwv.org/company/elk-river-wildlife-management-area/",
            "annotation": "Public-facing guide: 19,646 acres, open year-round, mature forests, wildlife/hunting/trapping/fishing overview, scenic beauty claim"
        },
        {
            "id": "web:5",
            "title": "West Virginia Wildlife Management Areas (WMAs) Information",
            "source": "WVDNR Official",
            "url": "https://wvdnr.gov/lands-waters/wildlife-management-areas/",
            "date": "2024-06-23",
            "annotation": "Statewide WMA program context: 96 WMAs total, 1.4 million acres, WVDNR management mission, acquisition and conservation strategy"
        },
        {
            "id": "web:28",
            "title": "Sutton Lake Recreation",
            "source": "U.S. Army Corps of Engineers, Great Lakes and Ohio River Division",
            "url": "https://www.lrd.usace.army.mil/Submit-ArticleCS/Recreation/Article/3632925/sutton-lake/",
            "date": "2024-01-04",
            "annotation": "Official USACE guide: 5 boat ramps, camping (236 tent/trailer, 12 primitive sites), marinas, swimming beaches, 31 trail systems (30+ on WMA), facilities (handicapped-accessible), day-use fees ($3 launch), trout stocking schedule, muskie/walleye habitat"
        },
        {
            "id": "web:30",
            "title": "An Ecological Assessment of the Elk River Watershed",
            "source": "West Virginia Department of Environmental Protection",
            "url": "https://dep.wv.gov/WWE/watershed/wqmonitoring/Documents/EcologicalAssessments/EcoAssess_ElkR_1997.pdf",
            "date": "1997",
            "annotation": "Detailed watershed ecology: Elk River geology, trout habitat (Elk River, Back Fork, tributaries), water quality, benthic macroinvertebrate data, crystal darter documentation (endangered species), Sutton Lake specifics (1,440 acres, flood control, public water supply importance)"
        },
        {
            "id": "web:31",
            "title": "A West Virginia Surf-n-Turf: Sutton Dam Area",
            "source": "Wonderful West Virginia Magazine",
            "url": "https://wonderfulwv.com/a-west-virginia-surf-n-turf/",
            "date": "2025-06-23",
            "annotation": "Feature article: tailwater trout fishing excellence, warm-water fishery (bass, walleye, muskie, panfish, catfish), trout stocking details (Feb–April bi-weekly, 5 trout types: brown, rainbow, golden rainbow, brook, tiger), hunting access accessibility, less-crowded experience vs. other lakes"
        },
        {
            "id": "web:16",
            "title": "West Virginia Code §20-2-5: Unlawful Methods of Hunting and Fishing",
            "source": "WV Legislature",
            "url": "https://code.wvlegislature.gov/20-2-5/",
            "date": "2025-09-15",
            "annotation": "State hunting and fishing regulations: firearm rules, drone prohibition, artificial light restrictions, uncased firearm rules, dog training restrictions (May 1–Aug 15), archery regulations"
        },
        {
            "id": "web:24",
            "title": "West Virginia Code of State Rules, Series 58-31",
            "source": "WV State Rules",
            "url": "https://regulations.justia.com/states/west-virginia/agency-58/title-58/series-58-31/section-58-31-2/",
            "date": "2024-09-19",
            "annotation": "Safety regulations: explosives/incendiaries/flammables prohibited on WMA; uncased firearms and bows prohibited except during hunting season"
        },
        {
            "id": "web:19",
            "title": "Understanding the Lyme Disease Surge in WV and Limiting Tick Exposure",
            "source": "Pochahontas County Health Department",
            "url": "https://pchdwv.org/2024/05/07/understanding-the-lyme-disease-surge-in-wv-and-limiting-tick-exposure/",
            "date": "2024-05-06",
            "annotation": "Tick hazard: Lyme disease expanding in WV, mitigation strategies (maintained yards, tick-safe zones, pet prevention, deer population connection)"
        },
        {
            "id": "web:26",
            "title": "Tick-Borne Illnesses Growing in WV",
            "source": "WVU Today",
            "url": "https://wvutoday.wvu.edu/media-center-blog/2025/10/29/expert-pitch-tick-borne-illnesses-growing",
            "date": "2025-10-28",
            "annotation": "Tick health context: expanding tick populations, flood/weather factors, expert guidance"
        },
        {
            "id": "web:27",
            "title": "West Virginia 2020 Forest Action Plan – National Priorities",
            "source": "State Foresters",
            "url": "https://www.stateforesters.org/wp-content/uploads/2021/02/WV-National-Priorities-Addendum-20201.pdf",
            "date": "2020",
            "annotation": "Forest management: prescribed burning authorization (2018 law), habitat restoration, invasive species control, oak regeneration, wildlife brood habitat (turkey, grouse)"
        },
        {
            "id": "web:29",
            "title": "Exploring West Virginia's State Forests",
            "source": "WV Division of Forestry",
            "url": "https://wvforestry.com/exploring-west-virginias-state-forests/",
            "date": "2025-01-20",
            "annotation": "State forestry context: multiple-use management, prescribed fire for habitat, wildlife management cooperation with WVDNR"
        },
        {
            "id": "web:55",
            "title": "Distribution and Habitat Use of the Crystal Darter (Crystallaria asprella) in the Elk River",
            "source": "West Virginia University Thesis",
            "url": "https://researchrepository.wvu.edu/cgi/viewcontent.cgi?article=3193&context=etd",
            "annotation": "Endangered species science: crystal darter extreme rarity (2 specimens collected 2002–2004 from 20 sampling occasions), habitat specialists, benthic preference, sedimentation threat"
        },
        {
            "id": "web:57",
            "title": "Aquatic Habitats Supporting Federally Listed Endangered Species",
            "source": "U.S. Fish and Wildlife Service",
            "url": "https://www.fws.gov/sites/default/files/documents/Aquatic%20Habitats%20Supporting%20Federally%20Listed%20Species_Feb2023.pdf",
            "annotation": "Elk River critical habitat: diamond darter, freshwater mussels (clubshell, pink mucket, northern riffleshell, rayed bean, snuffbox) endangered/threatened in lower Elk River below Sutton Dam"
        },
        {
            "id": "web:60",
            "title": "Endangered & Threatened Species List",
            "source": "WV Department of Environmental Protection",
            "url": "https://dep.wv.gov/WWE/Programs/stormwater/csw/Documents/Endangered%20Threatened%20Species%20List.pdf",
            "annotation": "State-listed protected species in Elk River: freshwater mussels (multiple species), geographic range below Sutton Dam"
        },
        {
            "id": "web:64",
            "title": "Diamond Darter Fact Sheet",
            "source": "U.S. Fish and Wildlife Service",
            "url": "https://www.fws.gov/sites/default/files/documents/508_diamond%20darter%20fact%20sheet.pdf",
            "annotation": "Endangered fish: diamond darter endemic to Elk River; only population known; 100+ fish species, 30 mussel species; threats (mining, drilling, logging, ATV use, erosion)"
        },
        {
            "id": "web:41",
            "title": "Holly River State Park",
            "source": "Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Holly_River_State_Park",
            "date": "2006-05-08",
            "annotation": "Nearby state park: 8,294 acres, 42+ miles trails, cabins, camping, recreation"
        },
        {
            "id": "web:49",
            "title": "Holly River State Park",
            "source": "West Virginia State Parks Official",
            "url": "https://wvstateparks.com/parks/holly-river-state-park/",
            "date": "2025-06-29",
            "annotation": "Contact and hours: 6 AM–10 PM; campground spring–fall; phone (304) 493-6353"
        },
        {
            "id": "web:52",
            "title": "Watoga State Park",
            "source": "West Virginia State Parks Official",
            "url": "https://wvstateparks.com/parks/watoga-state-park/",
            "date": "2025-06-30",
            "annotation": "Nearby largest state park: 10,100 acres (Marlinton); camping, hiking, lodging"
        },
        {
            "id": "web:42",
            "title": "WVDNR Reminds Hunters, Anglers to Purchase Licenses for 2026",
            "source": "WVDNR",
            "url": "https://wvdn.com/184725/",
            "date": "2026-01-06",
            "annotation": "Licensing requirement: 2025 licenses expired 12/31; new 2026 licenses required; purchase at wvhunt.com or licensed agents"
        },
        {
            "id": "web:50",
            "title": "Buyer's Guide: 2026 West Virginia Hunting and Fishing Licenses",
            "source": "WVDNR Official",
            "url": "https://wvdnr.gov/license-guide/",
            "date": "2025-12-15",
            "annotation": "License types: hunting and trapping, fishing, sportsman package, stamps, hunter education requirement"
        },
        {
            "id": "web:59",
            "title": "Cross Country Skiing & Snowshoeing – Elk River Inn",
            "source": "Elk River Inn",
            "url": "https://elkriverwv.com/cross-country-skiing/",
            "date": "2024-12-31",
            "annotation": "Winter sports nearby: Elk River Touring Center, 25 km trails, rentals $20–$25/day, 150–200\" avg. annual snowfall, elevation 2,730–4,750 ft, no cell service on trails"
        },
        {
            "id": "web:62",
            "title": "Cross Country Skiing and Snowshoeing in West Virginia",
            "source": "Ski Southeast",
            "url": "https://www.skisoutheast.com/activities/cross-country-skiing/west-virginia/",
            "annotation": "Regional XC ski opportunities: Elk River Touring Center (25+ miles), Canaan Valley, Whitegrass, Blackwater Falls details"
        },
        {
            "id": "web:38",
            "title": "Black Bear Seasons/Regulations",
            "source": "WVDNR Official",
            "url": "https://wvdnr.gov/frequently-asked-questions/black-bear-seasons-regulations/",
            "date": "2025-08-12",
            "annotation": "2025 bear seasons: archery/crossbow Sept 27–Dec 31; firearms Sept–Oct (specific dates vary)"
        },
        {
            "id": "web:47",
            "title": "Fishing Regulations Summary 2026",
            "source": "WVDNR Official",
            "url": "https://wvdnr.gov/wp-content/uploads/2025/12/Pub_Regs_Fishing_2026_DNR_WILD_pp.pdf",
            "annotation": "2026 fishing regulations: creel limits, size limits, stocking schedules, hand-fishing rules"
        },
        {
            "id": "web:53",
            "title": "West Virginia Fishing Regulations",
            "source": "WVDNR Official",
            "url": "https://wvdnr.gov/fishing/fishing-regulations/",
            "date": "2026-01-05",
            "annotation": "Current fishing rules and resources; downloadable 2026 regulations summary"
        }
    ],
    "contentGaps": [
        {
            "gap": "Specific trail names and detailed descriptions on Elk River WMA",
            "resolution": "Contact WVDNR District 3 (304) 924-6211 or request official trail map PDF from wvdnr.gov"
        },
        {
            "gap": "Foraging regulations (ginseng, ramps, mushrooms) on WMA",
            "resolution": "Check WV Code Title 20 (hunting/fishing laws) or email WVDNR Wildlife Resources; ginseng may require permit"
        },
        {
            "gap": "Mountain biking and horseback riding policy on Elk River WMA",
            "resolution": "Contact WVDNR District 3 to confirm if permitted and any trail restrictions"
        },
        {
            "gap": "Exact trail grooming status and winter trail accessibility",
            "resolution": "Call WVDNR or Elk River Touring Center (304) 572-3771 for seasonal conditions"
        },
        {
            "gap": "Commercial photography or filming permits/restrictions",
            "resolution": "Contact WVDNR Wildlife Resources for media use policy"
        },
        {
            "gap": "Drone use policy beyond hunting (recreational photography)",
            "resolution": "Contact WVDNR; likely restricted but not explicitly documented"
        },
        {
            "gap": "Real-time cell coverage map and trail-specific hazards (cliffs, stream crossings)",
            "resolution": "Download offline maps (Avenza Maps uses WVDNR topographic data); field-test cell phone coverage before trip"
        },
        {
            "gap": "Specific ADA compliance status of individual trails and facilities",
            "resolution": "Contact Sutton Lake Project Office (304) 765-2816 or Holly River State Park (304) 493-6353 for detailed accessibility info"
        }
    ]
}

# Save as JSON for implementation
import json
output_file = "elk_river_wma_dossier.json"
with open(output_file, "w") as f:
    json.dump(wma_data, f, indent=2)

print(f"✓ Dossier compiled: {output_file}")
print(f"✓ Total characters: {len(json.dumps(wma_data))}")
print(f"\nKey sections present:")
print(f"  - Managing agency & contact: {wma_data['managingAgency']['name']}")
print(f"  - Acreage: {wma_data['stats'][0]['value']}")
print(f"  - Activities documented: {len(wma_data['activities'])}")
print(f"  - Sources cited: {len(wma_data['sources'])}")
print(f"  - Content gaps noted: {len(wma_data['contentGaps'])}")
