import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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

export default function MonthlyExpenseChangeBar({ data }: { data: MonthlyTotal[] }) {
  if (!data.length) {
    return (
      <div className="card">
        <h3 className="section-title">Month-over-Month Change</h3>
        <p className="muted">No yearly data available yet.</p>
      </div>
    );
  }

  const sorted = [...data].sort((a, b) => a.month - b.month);
  const chartData = sorted.map((item, index) => {
    const prev = index > 0 ? Number(sorted[index - 1].expense || 0) : 0;
    const current = Number(item.expense || 0);
    const diff = index === 0 ? 0 : current - prev;
    return {
      label: monthNames[item.month - 1] || String(item.month),
      diff,
    };
  });

  return (
    <div className="card">
      <h3 className="section-title">Month-over-Month Change</h3>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#1F2430" strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fill: "#E6E6E6" }} />
            <YAxis tick={{ fill: "#E6E6E6" }} tickFormatter={(value) => formatCompactINR(Number(value))} />
            <Tooltip
              formatter={(value: number) => formatCurrencyINR(value)}
              contentStyle={{ background: "#111827", border: "1px solid #1F2937", color: "#E6E6E6" }}
              labelStyle={{ color: "#E6E6E6" }}
              itemStyle={{ color: "#E6E6E6" }}
            />
            <Bar dataKey="diff" radius={[6, 6, 0, 0]}>
              {chartData.map((item) => (
                <Cell key={item.label} fill={item.diff >= 0 ? "#F97316" : "#22C55E"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
