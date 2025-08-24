import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CostBreakdownChart = ({ data, title, height = 300 }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const total = payload?.reduce((sum, entry) => sum + entry?.value, 0);
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-muted-foreground">{entry?.dataKey}:</span>
              </div>
              <span className="text-foreground font-medium">${entry?.value?.toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-border mt-2 pt-2">
            <div className="flex items-center justify-between text-sm font-medium">
              <span className="text-foreground">Total:</span>
              <span className="text-foreground">${total?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="gpt4"
              stackId="1"
              stroke="var(--color-primary)"
              fill="var(--color-primary)"
              fillOpacity={0.8}
              name="GPT-4"
            />
            <Area
              type="monotone"
              dataKey="claude"
              stackId="1"
              stroke="var(--color-secondary)"
              fill="var(--color-secondary)"
              fillOpacity={0.8}
              name="Claude"
            />
            <Area
              type="monotone"
              dataKey="cohere"
              stackId="1"
              stroke="var(--color-accent)"
              fill="var(--color-accent)"
              fillOpacity={0.8}
              name="Cohere"
            />
            <Area
              type="monotone"
              dataKey="other"
              stackId="1"
              stroke="var(--color-warning)"
              fill="var(--color-warning)"
              fillOpacity={0.8}
              name="Other"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CostBreakdownChart;