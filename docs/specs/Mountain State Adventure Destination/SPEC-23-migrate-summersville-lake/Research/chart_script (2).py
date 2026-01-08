
import plotly.express as px
import pandas as pd
from datetime import datetime

# Data for hunting seasons
data = {
    "seasons": [
        {"name": "Archery/Crossbow Deer", "start": "2025-09-27", "end": "2025-12-31", "category": "Deer"},
        {"name": "Buck Firearms Deer", "start": "2025-11-24", "end": "2025-12-07", "category": "Deer"},
        {"name": "Muzzleloader Deer", "start": "2025-12-15", "end": "2025-12-21", "category": "Deer"},
        {"name": "Squirrel", "start": "2025-09-13", "end": "2026-02-28", "category": "Small Game"},
        {"name": "Ruffed Grouse", "start": "2025-10-18", "end": "2026-02-28", "category": "Small Game"},
        {"name": "Waterfowl (Segment 1)", "start": "2025-10-04", "end": "2025-10-12", "category": "Waterfowl"},
        {"name": "Waterfowl (Segment 2)", "start": "2025-11-08", "end": "2025-11-16", "category": "Waterfowl"},
        {"name": "Waterfowl (Segment 3)", "start": "2025-12-21", "end": "2026-01-31", "category": "Waterfowl"},
        {"name": "Mourning Dove (Segment 1)", "start": "2025-09-01", "end": "2025-10-12", "category": "Migratory Birds"},
        {"name": "Mourning Dove (Segment 2)", "start": "2025-11-03", "end": "2025-11-16", "category": "Migratory Birds"},
        {"name": "Mourning Dove (Segment 3)", "start": "2025-12-08", "end": "2026-01-10", "category": "Migratory Birds"},
        {"name": "Wild Turkey - Spring", "start": "2026-04-20", "end": "2026-05-24", "category": "Turkey"},
        {"name": "Cottontail Rabbit", "start": "2025-11-01", "end": "2026-02-28", "category": "Small Game"},
        {"name": "Woodcock", "start": "2025-10-18", "end": "2025-11-22", "category": "Migratory Birds"}
    ]
}

# Create DataFrame
df = pd.DataFrame(data["seasons"])

# Convert date strings to datetime
df['start'] = pd.to_datetime(df['start'])
df['end'] = pd.to_datetime(df['end'])

# Sort by start date then by name for better visual organization
df = df.sort_values(['start', 'name'])

# Create color map for categories
category_colors = {
    "Deer": "#1FB8CD",
    "Small Game": "#2E8B57",
    "Waterfowl": "#D2BA4C",
    "Migratory Birds": "#DB4545",
    "Turkey": "#5D878F"
}

df['color'] = df['category'].map(category_colors)

# Create the Gantt chart
fig = px.timeline(
    df, 
    x_start="start", 
    x_end="end", 
    y="name",
    color="category",
    color_discrete_map=category_colors,
    title="Hunting Seasons Timeline at Summersville Lake WMA (Sept 2025-May 2026)<br><span style='font-size: 18px; font-weight: normal;'>Peak activity overlaps occur Nov-Dec with multiple concurrent seasons</span>"
)

# Update layout for better readability
fig.update_layout(
    xaxis_title="Month",
    yaxis_title="Hunting Season",
    legend=dict(
        orientation='h', 
        yanchor='bottom', 
        y=1.02, 
        xanchor='center', 
        x=0.5,
        title_text=""
    ),
    showlegend=True,
    hovermode='closest'
)

# Update y-axis to show all season names clearly
fig.update_yaxes(autorange="reversed", title="Season")

# Update x-axis to show months clearly
fig.update_xaxes(
    dtick="M1",
    tickformat="%b\n%Y",
    title="Timeline"
)

# Update hover template
fig.update_traces(
    hovertemplate="<b>%{y}</b><br>Start: %{x}<br>End: %{customdata[0]}<extra></extra>",
    customdata=df[['end']].values
)

# Save the chart
fig.write_image("hunting_timeline.png")
fig.write_image("hunting_timeline.svg", format="svg")
