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
  income: number;
  expense: number;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function YearlyNetSavingsBar({ data }: { data: MonthlyTotal[] }) {
  if (!data.length) {
    return (
      <div className="card">
        <h3 className="section-title">Net Savings</h3>
        <p className="muted">No yearly data available yet.</p>
      </div>
    );
  }

  const chartData = data.map((item) => {
    const net = Number(item.income || 0) - Number(item.expense || 0);
    return {
      ...item,
      net,
      label: monthNames[item.month - 1] || String(item.month),
    };
  });

  return (
    <div className="card">
      <h3 className="section-title">Net Savings</h3>
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
            <Bar dataKey="net" radius={[6, 6, 0, 0]}>
              {chartData.map((item) => (
                <Cell key={item.label} fill={item.net >= 0 ? "#22C55E" : "#F87171"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
