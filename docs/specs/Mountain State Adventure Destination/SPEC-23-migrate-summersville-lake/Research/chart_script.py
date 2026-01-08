
import plotly.graph_objects as go
import json

# Data
data = {
    "comparison_data": [
        {"category": "Location & Access", "battle_run": "2981 Summersville Lake Road, Summersville, WV (38.219°N, -80.895°W)", "salmon_run": "Off Airport Road, adjacent to US-19 (6-7 miles from Battle Run)"},
        {"category": "Overnight Camping", "battle_run": "Yes - 117 total sites", "salmon_run": "No - Day-use only"},
        {"category": "Campsite Breakdown", "battle_run": "110 electric (30amp), 7 tent-only/walk-in", "salmon_run": "N/A"},
        {"category": "Maximum RV Length", "battle_run": "Up to 50 feet", "salmon_run": "N/A"},
        {"category": "Hookup Types", "battle_run": "Electric (30amp) + water spigots; NO water-only or full hookups", "salmon_run": "N/A"},
        {"category": "Restrooms/Showers", "battle_run": "3 shower houses, flush toilets, hot showers", "salmon_run": "Vault toilets only"},
        {"category": "Dump Station", "battle_run": "Yes (front of campground)", "salmon_run": "No"},
        {"category": "Boat Launch", "battle_run": "Yes - boat ramp", "salmon_run": "Yes - 2-lane ramp"},
        {"category": "Kayak Launch", "battle_run": "Yes", "salmon_run": "Yes"},
        {"category": "Swimming", "battle_run": "1,000-foot public beach", "salmon_run": "Designated swimming area"},
        {"category": "Fishing Pier", "battle_run": "Yes", "salmon_run": "Yes"},
        {"category": "Hiking Trails", "battle_run": "Yes - nature trails", "salmon_run": "Yes - multiple trailheads"},
        {"category": "Playground", "battle_run": "Yes", "salmon_run": "No"},
        {"category": "Sports Courts", "battle_run": "Basketball, volleyball", "salmon_run": "No"},
        {"category": "Operating Season", "battle_run": "May 1 - Columbus Day (seasonal)", "salmon_run": "Year-round (day-use only)"},
        {"category": "Daily Fee", "battle_run": "$24-34/night camping; $5 day-use", "salmon_run": "$5 day-use"},
        {"category": "Pets Allowed", "battle_run": "NO - strictly prohibited", "salmon_run": "No overnight (day-use only)"},
        {"category": "Quiet Hours", "battle_run": "10 PM - 8 AM", "salmon_run": "N/A (day-use)"},
        {"category": "Year-Round Boat Access", "battle_run": "No - seasonal closure", "salmon_run": "Yes - only year-round launch at Summersville Lake"},
        {"category": "Primary Use", "battle_run": "Overnight camping & full recreation", "salmon_run": "Day-use boating, hiking, water sports"}
    ]
}

# Extract data
categories = [item['category'] for item in data['comparison_data']]
battle_run_values = [item['battle_run'] for item in data['comparison_data']]
salmon_run_values = [item['salmon_run'] for item in data['comparison_data']]

# Create table
fig = go.Figure(data=[go.Table(
    columnwidth=[2, 3, 3],
    header=dict(
        values=['<b>Category</b>', '<b>Battle Run</b>', '<b>Salmon Run</b>'],
        fill_color='#1FB8CD',
        align='left',
        font=dict(color='white', size=14),
        height=40
    ),
    cells=dict(
        values=[categories, battle_run_values, salmon_run_values],
        fill_color=[['#f8f9fa' if i % 2 == 0 else 'white' for i in range(len(categories))]],
        align='left',
        font=dict(color='#2c3e50', size=12),
        height=30
    )
)])

# Update layout
fig.update_layout(
    title={
        "text": "Battle Run vs Salmon Run at Summersville Lake<br><span style='font-size: 18px; font-weight: normal;'>Battle Run offers full camping, Salmon Run provides year-round access</span>",
        "x": 0.5,
        "xanchor": "center"
    }
)

# Save as PNG and SVG
fig.write_image('comparison_chart.png')
fig.write_image('comparison_chart.svg', format='svg')
