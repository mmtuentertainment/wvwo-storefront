
import plotly.graph_objects as go
import json

# Data from the provided JSON
data = {
    "timeline": [
        {"phase": "Phase 1: Foundation", "duration": "Weeks 1-12", "destinations": 250, "monthlyVisitors": 0, "monthlyRevenue": 0, "teamSize": 1, "monthlyBudget": 560, "keyMilestone": "System live, 250 verified destinations, internal linking complete"},
        {"phase": "Phase 2: Early Growth", "duration": "Months 4-8", "destinations": 450, "monthlyVisitors": 15000, "monthlyRevenue": 1500, "teamSize": 2, "monthlyBudget": 560, "keyMilestone": "Hire content person, SEO starts ranking, first partnerships"},
        {"phase": "Phase 2: Late Growth", "duration": "Months 9-12", "destinations": 600, "monthlyVisitors": 50000, "monthlyRevenue": 8000, "teamSize": 2, "monthlyBudget": 560, "keyMilestone": "500+ destinations live, 50K monthly visitors, revenue scaling"},
        {"phase": "Phase 3: Monetization", "duration": "Months 13-18", "destinations": 650, "monthlyVisitors": 60000, "monthlyRevenue": 12000, "teamSize": 2, "monthlyBudget": 560, "keyMilestone": "Break-even achieved, partnerships generating steady revenue"},
        {"phase": "Phase 4: Optimization", "duration": "Months 19-24", "destinations": 700, "monthlyVisitors": 70000, "monthlyRevenue": 15000, "teamSize": 2, "monthlyBudget": 560, "keyMilestone": "Sustainable model, 100K+ annual revenue, expansion decision point"}
    ]
}

# Create detailed timeline with key milestones
months = [1, 3, 6, 8, 12, 18, 24]
visitors = [0, 5000, 12000, 15000, 50000, 60000, 70000]
revenue = [0, 0, 500, 1500, 8000, 12000, 15000]

# Create figure
fig = go.Figure()

# Add visitor growth line
fig.add_trace(go.Scatter(
    x=months,
    y=visitors,
    name='Monthly Visitors',
    line=dict(color='#1FB8CD', width=3),
    mode='lines+markers',
    marker=dict(size=8),
    hovertemplate='Month %{x}<br>Visitors: %{y:,.0f}<extra></extra>'
))

# Add revenue projection line (scaled to be visible with visitors)
# Scale revenue by 5 to make it visible on same chart
revenue_scaled = [r * 5 for r in revenue]
fig.add_trace(go.Scatter(
    x=months,
    y=revenue_scaled,
    name='Monthly Revenue',
    line=dict(color='#2E8B57', width=3),
    mode='lines+markers',
    marker=dict(size=8),
    customdata=revenue,
    hovertemplate='Month %{x}<br>Revenue: $%{customdata:,.0f}<extra></extra>'
))

# Add milestone annotations
milestones = [
    (1, 0, "Week 4: System Live<br>1 Dev, $560/mo"),
    (3, 10000, "Month 3: 250 Dest.<br>1 Dev"),
    (6, 25000, "Month 6: SEO Working<br>2 Team, $560/mo"),
    (12, 55000, "Month 12: Monetization<br>50K visitors, $8K revenue"),
    (18, 65000, "Month 18: Break-Even<br>$12K/mo revenue"),
    (24, 75000, "Month 24: Expansion<br>70K visitors, $15K/mo")
]

for month, y_pos, text in milestones:
    fig.add_annotation(
        x=month,
        y=y_pos,
        text=text,
        showarrow=True,
        arrowhead=2,
        arrowsize=1,
        arrowwidth=2,
        arrowcolor='#5D878F',
        ax=0,
        ay=-60 if y_pos > 40000 else -50,
        font=dict(size=10, color='#13343B'),
        bgcolor='rgba(255, 255, 255, 0.9)',
        bordercolor='#5D878F',
        borderwidth=1,
        borderpad=4
    )

# Add phase backgrounds
phases = [
    (0, 3, "Phase 1: Foundation"),
    (3, 8, "Phase 2: Growth"),
    (8, 18, "Phase 3: Monetization"),
    (18, 24, "Phase 4: Optimize")
]

colors = ['rgba(31, 184, 205, 0.05)', 'rgba(46, 139, 87, 0.05)', 
          'rgba(210, 186, 76, 0.05)', 'rgba(93, 135, 143, 0.05)']

for i, (start, end, label) in enumerate(phases):
    fig.add_vrect(
        x0=start, x1=end,
        fillcolor=colors[i],
        layer="below",
        line_width=0
    )

# Update layout
fig.update_layout(
    title={
        "text": "24-Month Roadmap: Growth Journey to Sustainable Business<br><span style='font-size: 18px; font-weight: normal;'>2-person team scaling from 0 to 70K visitors & $15K monthly revenue</span>"
    },
    xaxis_title="Timeline (Months)",
    yaxis_title="Monthly Visitors",
    legend=dict(
        orientation='h',
        yanchor='bottom',
        y=1.02,
        xanchor='center',
        x=0.5
    ),
    hovermode='x unified'
)

# Update axes
fig.update_xaxes(
    range=[0, 25],
    tickmode='linear',
    tick0=0,
    dtick=3,
    showgrid=True
)

fig.update_yaxes(
    range=[0, 80000],
    tickformat=',',
    showgrid=True
)

# Add secondary y-axis labels as text annotations
fig.add_annotation(
    x=1.02,
    y=0.85,
    xref='paper',
    yref='paper',
    text='Revenue ÷5<br>for scale',
    showarrow=False,
    font=dict(size=9, color='#2E8B57'),
    xanchor='left'
)

fig.update_traces(cliponaxis=False)

# Save both formats
fig.write_image("roadmap_timeline.png")
fig.write_image("roadmap_timeline.svg", format="svg")
