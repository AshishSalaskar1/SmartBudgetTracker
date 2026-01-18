import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCompactINR, formatCurrencyINR } from "../utils/format";

interface MonthlyTotal {
  month: number;
  expense: number;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function YearlyCumulativeSpendLine({ data }: { data: MonthlyTotal[] }) {
  if (!data.length) {
    return (
      <div className="card">
        <h3 className="section-title">Cumulative Spend</h3>
        <p className="muted">No yearly data available yet.</p>
      </div>
    );
  }

  const sorted = [...data].sort((a, b) => a.month - b.month);
  let running = 0;
  const chartData = sorted.map((item) => {
    running += Number(item.expense || 0);
    return {
      label: monthNames[item.month - 1] || String(item.month),
      total: running,
    };
  });

  return (
    <div className="card">
      <h3 className="section-title">Cumulative Spend</h3>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="yearSpendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1F2430" strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fill: "#E6E6E6" }} />
            <YAxis tick={{ fill: "#E6E6E6" }} tickFormatter={(value) => formatCompactINR(Number(value))} />
            <Tooltip
              formatter={(value: number) => formatCurrencyINR(value)}
              contentStyle={{ background: "#111827", border: "1px solid #1F2937", color: "#E6E6E6" }}
              labelStyle={{ color: "#E6E6E6" }}
              itemStyle={{ color: "#E6E6E6" }}
            />
            <Area type="monotone" dataKey="total" stroke="#F97316" fill="url(#yearSpendGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
