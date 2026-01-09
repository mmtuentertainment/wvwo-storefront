
import plotly.graph_objects as go
import json

# Data provided
data = {
    "taxonomy": [
        {"type": "Lakes & Reservoirs", "examples": "Summersville Lake, Bluestone Lake, Cheat Lake, Moncove Lake", "requiredFields": "Name, Location (county), Coordinates, Lake Area (acres), Max Depth, Public Access Points, Fishing Species", "optionalFields": "Boat Ramps, Camping Nearby, Marinas, Water Quality Data, Scenic Rating", "crosslinks": ["Campgrounds", "State Parks", "Fishing Guides", "Lodging"], "audience": "Families, Anglers, Boaters, Vacationers", "monetization": 7, "complexity": 5, "inventory": 42},
        {"type": "Campgrounds", "examples": "Babcock State Park Campground, New River Gorge NP Campgrounds, KOA Locations", "requiredFields": "Name, Location, Elevation, Sites Count, Water/Electric, Reservation System, Pet Policy", "optionalFields": "Group Sites, Amenities (showers/laundry), Nearby Attractions, Reviews, Price Range", "crosslinks": ["Lakes", "Trails", "State Parks", "Rivers", "Lodging"], "audience": "Families, Hikers, RV Travelers, Outdoor Enthusiasts", "monetization": 6, "complexity": 4, "inventory": 150},
        {"type": "WMAs (Wildlife Management Areas)", "examples": "Eastern Panhandle WMA, Canaan Valley WMA, Greenbrier County WMAs", "requiredFields": "WMA Name, County, Acres, Managed Species, Hunting/Fishing Season Dates, Access Rules", "optionalFields": "Wildlife Sightings Data, Trail Map PDF, Historic Hunting Tradition, Conservation Status", "crosslinks": ["Hunting Guides", "Trails", "Lodging", "Outfitters"], "audience": "Hunters, Fishermen, Wildlife Watchers", "monetization": 5, "complexity": 6, "inventory": 85},
        {"type": "State Parks", "examples": "Blackwater Falls, Hawks Nest, Pipestem, Watoga, Stonewall Resort", "requiredFields": "Park Name, County, Acres, Amenities (lodge/cabins/camping), Trails Count, Activities Offered", "optionalFields": "Historic Significance, Scenic Rating, Accessibility Data, Visitor Stats, Photography Spots", "crosslinks": ["Trails", "Campgrounds", "Lodging", "Historic Sites", "River Access"], "audience": "Families, Retirees, Vacationers, Nature Photographers", "monetization": 8, "complexity": 7, "inventory": 39},
        {"type": "Rivers & Waterways", "examples": "New River Gorge, Gauley River, Cheat River, Shenandoah River Sections", "requiredFields": "River Name, Segment/Section, Length (miles), Difficulty Class (I-V), Put-in/Take-out Points, Access", "optionalFields": "Seasonal Flow Data, Best Season, Rapids Details, Scenic Highlights, Outfitter Directory", "crosslinks": ["Rafting Outfitters", "Lodging", "Campgrounds", "Climbing Areas"], "audience": "Rafters, Kayakers, Fishermen, Adrenaline Seekers", "monetization": 9, "complexity": 7, "inventory": 28},
        {"type": "Hiking Trails", "examples": "Endless Wall Trail, Long Point Trail, Sandstone Falls, Blackwater Falls Trail", "requiredFields": "Trail Name, Location, Distance (miles), Difficulty (easy/mod/hard), Elevation Gain, Trailhead Coords", "optionalFields": "Elevation Profile, Season Recommendations, Wildlife/Flora Notes, Viewpoint Photos, GPX Download", "crosslinks": ["Campgrounds", "Lodging", "State Parks", "Caves", "Overlooks"], "audience": "Hikers, Families, Nature Photographers, Fitness Enthusiasts", "monetization": 6, "complexity": 6, "inventory": 200},
        {"type": "Caves & Caverns", "examples": "Organ Cave, Lost River Cavern, Blowing Cave, Pearl Cavern", "requiredFields": "Cave Name, Location, Guided/Self-Guided, Length/Depth, Difficulty, Entry Fee", "optionalFields": "Formation Types, Wildlife (bats/salamanders), Historic Uses, Photo Restrictions, Accessibility", "crosslinks": ["Historic Sites", "Lodging", "Nearby Trails", "State Parks"], "audience": "Families, Spelunkers, Geology Enthusiasts, Photographers", "monetization": 5, "complexity": 4, "inventory": 22},
        {"type": "Historic Sites", "examples": "New River Gorge Bridge, Harpers Ferry (adjacent), Civil War Battlefields, Homesteads", "requiredFields": "Site Name, Historical Period, Location, Significance, Accessibility, Hours/Admission", "optionalFields": "Story/Narrative, Preservation Status, Original Use, Related Events, Archival Photos", "crosslinks": ["Nearby Trails", "Lodging", "Museums", "State Parks"], "audience": "History Buffs, Families, Cultural Tourists, Educators", "monetization": 4, "complexity": 5, "inventory": 45},
        {"type": "Ski & Snow Sports", "examples": "Snowshoe Mountain Resort, Winterplace Ski Resort", "requiredFields": "Resort Name, Location, Base Elevation, Runs Count, Terrain %, Lift Count, Season Dates", "optionalFields": "Vertical Drop, Night Skiing, Lessons Available, Lodging On-Site, Après Skiing", "crosslinks": ["Lodging", "Dining", "Trail Networks", "Photo Ops"], "audience": "Skiers/Snowboarders, Families, Winter Vacationers", "monetization": 9, "complexity": 6, "inventory": 4},
        {"type": "Rock Climbing Areas", "examples": "Fayetteville Climbing Area, Seneca Rocks (adjacent WV), New River Gorge Crags", "requiredFields": "Climbing Area Name, Location, Rock Type, Route Count, Difficulty Range (5.0-5.13+), Access", "optionalFields": "First Ascent History, Notable Crags, Guidebook Reference, Local Guides, Gear Shops", "crosslinks": ["Lodging", "Rafting (nearby fun)", "Campgrounds", "Guides"], "audience": "Rock Climbers, Outdoor Adventurers, Bouldering Enthusiasts", "monetization": 8, "complexity": 8, "inventory": 12},
        {"type": "National Parks & Preserves", "examples": "New River Gorge National Park & Preserve, Gauley River (NRRA), Bluefield Area", "requiredFields": "Park Name, Total Area (acres), Established Date, Jurisdiction (NPS/USACE), Visitor Center, Key Features", "optionalFields": "UNESCO/Scenic Designation, Endangered Species, Visitor Stats, Management Plans, Research Opportunities", "crosslinks": ["All Types (hub)", "Lodging", "Dining", "Guides"], "audience": "Park Visitors, Nature Enthusiasts, Educational Groups", "monetization": 7, "complexity": 8, "inventory": 3},
        {"type": "Adventure Resorts & Outfitters", "examples": "Adventures on the Gorge, ACE Adventure Resort, Gauley River Outfitters", "requiredFields": "Resort Name, Location, Activities Offered, Capacity, Lodging Type (rooms/cabins/glamping), Seasonality", "optionalFields": "Pricing, Food Service, Equipment Rentals, Certifications, Customer Reviews", "crosslinks": ["Lodging", "Rivers", "Climbing", "Trails", "Gear Shops"], "audience": "Adventure Seekers, Groups, Vacationers, Corporate Retreats", "monetization": 9, "complexity": 7, "inventory": 18},
        {"type": "Backcountry & Wilderness", "examples": "Greenbrier River Trail, Highlands Scenic Byway, Remote Camping", "requiredFields": "Area Name, Location/County, Acreage, Permit Required?, Difficulty Level, Best Season", "optionalFields": "Wildlife Density, Water Sources, Hazards/Alerts, Leave-No-Trace Guide, Solo/Group Suitability", "crosslinks": ["Trails", "Lodging", "Guides", "Survival Skills"], "audience": "Backcountry Hikers, Campers, Bushcrafters, Solo Adventurers", "monetization": 3, "complexity": 7, "inventory": 35},
        {"type": "Mountain Biking Trails", "examples": "Hatfield-McCoy Trails, Arrowhead Trail System, Ashford Mountain Biking", "requiredFields": "Trail Name, Location, Distance, Difficulty (DH/XC/Enduro), Surface Type, Elevation Gain", "optionalFields": "Tech Rating, Seasonal Conditions, Parking, Nearby Amenities, Trail Building Community", "crosslinks": ["Campgrounds", "Lodging", "Guides", "Bike Shops"], "audience": "Mountain Bikers, Enduro Racers, Cross-Country Enthusiasts", "monetization": 7, "complexity": 6, "inventory": 60}
    ]
}

# Prepare table data
types = []
examples = []
required = []
optional = []
crosslinks = []
audience = []
monetization = []
complexity = []
inventory = []

for item in data["taxonomy"]:
    types.append(item["type"])
    examples.append(item["examples"][:60] + "..." if len(item["examples"]) > 60 else item["examples"])
    required.append(item["requiredFields"][:80] + "..." if len(item["requiredFields"]) > 80 else item["requiredFields"])
    optional.append(item["optionalFields"][:80] + "..." if len(item["optionalFields"]) > 80 else item["optionalFields"])
    crosslinks.append(", ".join(item["crosslinks"]))
    audience.append(item["audience"])
    monetization.append(str(item["monetization"]) + "/10")
    complexity.append(str(item["complexity"]) + "/10")
    inventory.append(str(item["inventory"]))

# Create table
fig = go.Figure(data=[go.Table(
    columnwidth=[120, 180, 180, 180, 120, 140, 60, 60, 60],
    header=dict(
        values=['<b>Destination Type</b>', '<b>Examples in WV</b>', '<b>Required Fields</b>', 
                '<b>Optional Fields</b>', '<b>Cross-links</b>', '<b>Primary Audience</b>', 
                '<b>Monetize</b>', '<b>Complex</b>', '<b>Count</b>'],
        fill_color='#1FB8CD',
        align=['left', 'left', 'left', 'left', 'left', 'left', 'center', 'center', 'center'],
        font=dict(color='white', size=11),
        height=40
    ),
    cells=dict(
        values=[types, examples, required, optional, crosslinks, audience, monetization, complexity, inventory],
        fill_color=[['#f8f9fa' if i % 2 == 0 else 'white' for i in range(len(types))]],
        align=['left', 'left', 'left', 'left', 'left', 'left', 'center', 'center', 'center'],
        font=dict(size=9),
        height=50
    )
)])

fig.update_layout(
    title={
        "text": "WV Wild Outdoors Destination Type Taxonomy Matrix (14 Types)<br><span style='font-size: 18px; font-weight: normal;'>Complete reference guide with metadata, audiences, and opportunities</span>"
    }
)

# Save the figure
fig.write_image("taxonomy_matrix.png")
fig.write_image("taxonomy_matrix.svg", format="svg")
