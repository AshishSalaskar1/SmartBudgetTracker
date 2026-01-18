import React, { useMemo, useState } from "react";
import { Cell, Pie, PieChart, PieLabelRenderProps, ResponsiveContainer, Tooltip } from "recharts";

import { formatCurrencyINR } from "../utils/format";

interface CategoryPoint {
  category: string;
  amount: number;
}

const COLORS = [
  "#4F46E5",
  "#22D3EE",
  "#F59E0B",
  "#F97316",
  "#EC4899",
  "#10B981",
  "#8B5CF6",
  "#A855F7",
];

const RADIAN = Math.PI / 180;

const renderLabel = (props: PieLabelRenderProps) => {
  const { cx = 0, cy = 0, midAngle = 0, outerRadius = 0, percent = 0, name } = props;
  const radius = outerRadius + 16;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const displayPercent = Math.max(1, Math.round(percent * 100));

  return (
    <text
      x={x}
      y={y}
      fill="#E2E8F0"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${name} ${displayPercent}%`}
    </text>
  );
};

export default function YearlyCategoryPie({ data }: { data: CategoryPoint[] }) {
  const [mode, setMode] = useState<"amount" | "percent">("amount");

  const total = useMemo(() => data.reduce((sum, item) => sum + Number(item.amount || 0), 0), [data]);

  if (!data.length) {
    return (
      <div className="card">
        <h3 className="section-title">Yearly Category Spend</h3>
        <p className="muted">No yearly category data available yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="table-header">
        <h3 className="section-title">Yearly Category Spend</h3>
        <div className="toggle-group">
          <button
            className={`pill-btn ${mode === "amount" ? "active" : ""}`}
            onClick={() => setMode("amount")}
          >
            Amount
          </button>
          <button
            className={`pill-btn ${mode === "percent" ? "active" : ""}`}
            onClick={() => setMode("percent")}
          >
            % Share
          </button>
        </div>
      </div>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={2}
              labelLine={{ stroke: "#94A3B8" }}
              label={renderLabel}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) =>
                mode === "percent" && total
                  ? `${((Number(value || 0) / total) * 100).toFixed(1)}%`
                  : formatCurrencyINR(value)
              }
              contentStyle={{ background: "#111827", border: "1px solid #1F2937", color: "#E6E6E6" }}
              labelStyle={{ color: "#E6E6E6" }}
              itemStyle={{ color: "#E6E6E6" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
