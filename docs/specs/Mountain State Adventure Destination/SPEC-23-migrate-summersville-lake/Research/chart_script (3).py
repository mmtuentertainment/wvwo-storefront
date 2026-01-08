
import plotly.graph_objects as go
import json

# Data
data = {
    "events": [
        {"year": 1938, "event": "Flood Control Act of 1938 - Summersville Dam authorized by Congress", "detail": "Federal authorization provided"},
        {"year": 1960, "event": "Construction begins on Summersville Dam", "detail": "Diversion tunnel and site preparation"},
        {"year": 1966, "event": "Dam completed and dedicated by President Lyndon B. Johnson", "detail": "September 3, 1966 - Cost $48 million"},
        {"year": 1985, "event": "Whitewater recreation added to project purposes", "detail": "Act of Congress - Birth of Gauley Season"},
        {"year": 2001, "event": "Hydroelectric power plant completed", "detail": "80 MW capacity, 200+ million kWh annually"},
        {"year": 2023, "event": "Summersville Lake State Park established", "detail": "West Virginia's 36th state park - first in 30+ years"}
    ]
}

events = data["events"]
years = [e["year"] for e in events]
event_names = [e["event"] for e in events]
details = [e["detail"] for e in events]

# Create alternating y positions for better text placement
y_positions = [1 if i % 2 == 0 else 1.5 for i in range(len(years))]

# Colors from the theme
colors = ['#1FB8CD', '#DB4545', '#2E8B57', '#5D878F', '#D2BA4C', '#B4413C']

fig = go.Figure()

# Add the timeline line
fig.add_trace(go.Scatter(
    x=years,
    y=[1.25] * len(years),
    mode='lines',
    line=dict(color='#5D878F', width=3),
    showlegend=False,
    hoverinfo='skip'
))

# Add markers for each event
for i, (year, event, detail, y_pos) in enumerate(zip(years, event_names, details, y_positions)):
    color = colors[i % len(colors)]
    
    # Add marker
    fig.add_trace(go.Scatter(
        x=[year],
        y=[1.25],
        mode='markers',
        marker=dict(size=16, color=color, line=dict(width=2, color='white')),
        showlegend=False,
        hovertemplate=f"<b>{year}</b><br>{event}<br><i>{detail}</i><extra></extra>"
    ))
    
    # Add text annotation
    text_position = "top" if y_pos > 1.25 else "bottom"
    fig.add_annotation(
        x=year,
        y=y_pos,
        text=f"<b>{year}</b><br>{event}",
        showarrow=True,
        arrowhead=2,
        arrowsize=1,
        arrowwidth=2,
        arrowcolor=color,
        ax=0,
        ay=-50 if text_position == "top" else 50,
        font=dict(size=11, color=color),
        align="center",
        bgcolor="rgba(255, 255, 255, 0.9)",
        bordercolor=color,
        borderwidth=1,
        borderpad=4
    )

# Update layout
fig.update_layout(
    title={
        "text": "Summersville Dam Development Timeline (1938-2023)<br><span style='font-size: 18px; font-weight: normal;'>From authorization to state park designation</span>"
    },
    xaxis=dict(
        title="Year",
        showgrid=False,
        zeroline=False,
        range=[1930, 2030]
    ),
    yaxis=dict(
        visible=False,
        range=[0.5, 2]
    ),
    showlegend=False,
    hovermode='closest'
)

fig.update_xaxes(showline=True, linewidth=2, linecolor='#5D878F')

# Save the chart
fig.write_image("summersville_timeline.png")
fig.write_image("summersville_timeline.svg", format="svg")
