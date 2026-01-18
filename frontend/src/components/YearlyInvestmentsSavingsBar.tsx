import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCompactINR, formatCurrencyINR } from "../utils/format";

interface MonthlyTotal {
  month: number;
  investments?: number;
  net?: number;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function YearlyInvestmentsSavingsBar({ data }: { data: MonthlyTotal[] }) {
  if (!data.length) {
    return (
      <div className="card">
        <h3 className="section-title">Investments vs Savings</h3>
        <p className="muted">No yearly data available yet.</p>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    label: monthNames[item.month - 1] || String(item.month),
    investments: Number(item.investments || 0),
    savings: Number(item.net || 0),
  }));

  return (
    <div className="card">
      <h3 className="section-title">Investments vs Savings</h3>
      <div style={{ width: "100%", height: 260 }}>
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
            <Bar dataKey="investments" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="savings" fill="#22C55E" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
