
import plotly.graph_objects as go
from datetime import datetime

# Define events with their years and periods
events = [
    (1765, "Captain Bull & Delaware Settlement", "Pre-Civil War"),
    (1772, "Bulltown Massacre", "Pre-Civil War"),
    (1809, "Salt works est.", "Pre-Civil War"),
    (1820, "Gristmills built", "Pre-Civil War"),
    (1830, "Saltworks prospers", "Pre-Civil War"),
    (1847, "Turnpike construction", "Pre-Civil War"),
    (1850, "Tannery est.", "Pre-Civil War"),
    (1861, "Fort Bulltown", "Civil War Era"),
    (1863, "Battle of Bulltown", "Civil War Era"),
    (1865, "End of occupation", "Civil War Era"),
    (1920, "Pop. peaks 23,973", "Post-Civil War/Modern"),
    (1972, "Dam construction", "Post-Civil War/Modern"),
    (1976, "Dam completed", "Post-Civil War/Modern"),
    (1978, "Lake operational", "Post-Civil War/Modern"),
    (2026, "Historic site today", "Post-Civil War/Modern"),
]

# Assign y-positions based on period
period_y = {
    "Pre-Civil War": 3,
    "Civil War Era": 2,
    "Post-Civil War/Modern": 1
}

# Assign colors to periods
period_colors = {
    "Pre-Civil War": "#1FB8CD",
    "Civil War Era": "#DB4545",
    "Post-Civil War/Modern": "#2E8B57"
}

# Create figure
fig = go.Figure()

# Add background rectangles for each period
fig.add_shape(type="rect", x0=1765, x1=1860, y0=2.7, y1=3.3,
              fillcolor="#1FB8CD", opacity=0.2, line_width=0)
fig.add_shape(type="rect", x0=1861, x1=1865, y0=1.7, y1=2.3,
              fillcolor="#DB4545", opacity=0.2, line_width=0)
fig.add_shape(type="rect", x0=1866, x1=2026, y0=0.7, y1=1.3,
              fillcolor="#2E8B57", opacity=0.2, line_width=0)

# Add events as scatter points
for year, event, period in events:
    y_pos = period_y[period]
    color = period_colors[period]
    
    fig.add_trace(go.Scatter(
        x=[year],
        y=[y_pos],
        mode='markers+text',
        marker=dict(size=12, color=color, line=dict(width=2, color='white')),
        text=f"{year}<br>{event}",
        textposition="top center",
        textfont=dict(size=10),
        showlegend=False,
        hovertemplate=f"<b>{year}</b><br>{event}<br>{period}<extra></extra>"
    ))

# Add period labels on the left
for period, y_pos in period_y.items():
    fig.add_annotation(
        x=1755,
        y=y_pos,
        text=f"<b>{period}</b>",
        showarrow=False,
        xanchor="right",
        font=dict(size=11),
        align="right"
    )

# Update layout
fig.update_layout(
    title={
        "text": "Bulltown WV History Timeline (1765-2026)<br><span style='font-size: 18px; font-weight: normal;'>Three major eras from settlement to historic preservation</span>"
    },
    xaxis=dict(
        title="Year",
        range=[1750, 2035],
        dtick=25,
        gridcolor='lightgray'
    ),
    yaxis=dict(
        showticklabels=False,
        range=[0.5, 3.5],
        showgrid=False
    ),
    showlegend=False,
    hovermode='closest'
)

fig.update_traces(cliponaxis=False)

# Save as PNG and SVG
fig.write_image("bulltown_timeline.png")
fig.write_image("bulltown_timeline.svg", format="svg")
