
import plotly.graph_objects as go
import pandas as pd
import numpy as np

# Data from the provided JSON
data = {
    "approaches": [
        {"name": "Current: Astro + TypeScript", "devex": 8, "contentex": 4, "seo": 8, "perf": 9, "scalability": 7, "cost": 9, "maintenance": 7},
        {"name": "Headless CMS: Sanity/Contentful", "devex": 6, "contentex": 9, "seo": 7, "perf": 7, "scalability": 9, "cost": 3, "maintenance": 5},
        {"name": "MDX + Content Collections", "devex": 7, "contentex": 5, "seo": 8, "perf": 9, "scalability": 6, "cost": 9, "maintenance": 8},
        {"name": "Database-driven (Node/Express API)", "devex": 5, "contentex": 6, "seo": 6, "perf": 6, "scalability": 8, "cost": 5, "maintenance": 3},
        {"name": "Hybrid: Astro + Contentful API", "devex": 7, "contentex": 8, "seo": 9, "perf": 8, "scalability": 9, "cost": 4, "maintenance": 6}
    ]
}

# Create dataframe
metrics = ["devex", "contentex", "seo", "perf", "scalability", "cost", "maintenance"]
metric_labels = ["Dev Exp", "Content Ed", "SEO", "Performance", "Scale 500+", "Cost Launch", "Maintenance"]

approaches = []
scores_matrix = []

for approach in data["approaches"]:
    approaches.append(approach["name"])
    scores = [approach[m] for m in metrics]
    scores_matrix.append(scores)

# Calculate total scores
totals = [sum(scores) for scores in scores_matrix]

# Add total column to the matrix
scores_with_total = [scores + [total] for scores, total in zip(scores_matrix, totals)]
all_labels = metric_labels + ["TOTAL"]

# Find the winner (highest total score)
max_total = max(totals)
winner_indices = [i for i, t in enumerate(totals) if t == max_total]

# Create annotation text with stars for winner(s)
annotations = []
for i, row in enumerate(scores_with_total):
    for j, value in enumerate(row):
        if j == len(row) - 1:  # Total column
            text = f"<b>{value}</b>"
            if i in winner_indices:
                text += "<br>★"
            font_color = "#1FB8CD" if i in winner_indices else "#2E8B57"
            font_size = 16 if i in winner_indices else 14
        else:
            text = str(value)
            font_color = "white"
            font_size = 13
        
        annotations.append(
            dict(
                x=j,
                y=i,
                text=text,
                xref="x",
                yref="y",
                showarrow=False,
                font=dict(size=font_size, color=font_color)
            )
        )

# Create heatmap
fig = go.Figure(data=go.Heatmap(
    z=scores_with_total,
    x=all_labels,
    y=approaches,
    colorscale=[
        [0, "#DB4545"],      # Red for low scores
        [0.3, "#D2BA4C"],    # Yellow for medium-low
        [0.5, "#5D878F"],    # Cyan for medium
        [0.7, "#2E8B57"],    # Green for medium-high
        [1, "#1FB8CD"]       # Strong cyan for high scores
    ],
    showscale=True,
    colorbar=dict(
        title=dict(text="Score", side="right"),
        tickmode="linear",
        tick0=0,
        dtick=2
    ),
    hovertemplate="<b>%{y}</b><br>%{x}: %{z}<extra></extra>",
    zmin=0,
    zmax=10
))

# Add annotations
for ann in annotations:
    fig.add_annotation(ann)

# Update layout
fig.update_layout(
    title={
        "text": "Architecture Decision Matrix for WV Wild Outdoors<br><span style='font-size: 18px; font-weight: normal;'>Current Astro/TypeScript and MDX tied at 52 points for best fit</span>"
    },
    xaxis=dict(
        title="",
        side="top",
        tickangle=0
    ),
    yaxis=dict(
        title="",
        autorange="reversed"
    )
)

fig.update_xaxes(tickangle=-25)

# Save as PNG and SVG
fig.write_image("architecture_comparison.png")
fig.write_image("architecture_comparison.svg", format="svg")
