
import plotly.graph_objects as go
import json

# Data
data = {"specifications": [
    {"category": "Height", "value": "390 feet"}, 
    {"category": "Length", "value": "2,280 feet"}, 
    {"category": "Dam Type", "value": "Rock-fill with central impervious core"}, 
    {"category": "Lake Area (Summer Pool)", "value": "2,790 acres"}, 
    {"category": "Shoreline", "value": "60 miles"}, 
    {"category": "Maximum Depth", "value": "327 feet"}, 
    {"category": "Drainage Basin", "value": "803 square miles"}, 
    {"category": "Regional Ranking", "value": "2nd largest rock-fill dam east of Mississippi River"}
]}

specs = data['specifications']

# Brand colors
colors = ['#1FB8CD', '#DB4545', '#2E8B57', '#5D878F', '#D2BA4C', '#B4413C', '#964325', '#944454']

# Create figure
fig = go.Figure()

# Grid layout: 4 rows x 2 columns
rows = 4
cols = 2
cell_width = 0.45
cell_height = 0.22
gap_x = 0.1
gap_y = 0.04

for idx, spec in enumerate(specs):
    row = idx // cols
    col = idx % cols
    
    # Calculate position
    x0 = col * (cell_width + gap_x) + 0.05
    y0 = 1 - (row + 1) * (cell_height + gap_y) + 0.05
    x1 = x0 + cell_width
    y1 = y0 + cell_height
    
    # Add rectangle
    fig.add_shape(
        type="rect",
        x0=x0, y0=y0, x1=x1, y1=y1,
        fillcolor=colors[idx % len(colors)],
        opacity=0.85,
        line=dict(width=0),
        xref="paper", yref="paper"
    )
    
    # Add category label (top)
    fig.add_annotation(
        x=(x0 + x1) / 2,
        y=y1 - 0.04,
        text=f"<b>{spec['category']}</b>",
        showarrow=False,
        font=dict(size=13, color="white"),
        xref="paper", yref="paper",
        xanchor="center",
        yanchor="top"
    )
    
    # Add value (center)
    fig.add_annotation(
        x=(x0 + x1) / 2,
        y=(y0 + y1) / 2,
        text=spec['value'],
        showarrow=False,
        font=dict(size=14, color="white"),
        xref="paper", yref="paper",
        xanchor="center",
        yanchor="middle"
    )

# Update layout
fig.update_layout(
    title={
        "text": "Summersville Dam and Lake Key Specifications<br><span style='font-size: 18px; font-weight: normal;'>Major flood control structure in West Virginia</span>",
        "x": 0.5,
        "xanchor": "center"
    },
    xaxis=dict(showgrid=False, showticklabels=False, zeroline=False),
    yaxis=dict(showgrid=False, showticklabels=False, zeroline=False),
    plot_bgcolor='rgba(0,0,0,0)',
    paper_bgcolor='rgba(0,0,0,0)',
    showlegend=False
)

# Save as PNG and SVG
fig.write_image("summersville_dam_specs.png")
fig.write_image("summersville_dam_specs.svg", format="svg")
