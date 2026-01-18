import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCompactINR, formatCurrencyINR } from "../utils/format";

interface DailySpend {
  date: string;
  amount: number;
}

export default function DailySpendLine({ data }: { data: DailySpend[] }) {
  if (!data.length) {
    return (
      <div className="card">
        <h3 className="section-title">Daily Spend Trend</h3>
        <p className="muted">No daily spend data available yet.</p>
      </div>
    );
  }

  const chartData = data.map((d) => ({
    ...d,
    day: d.date.slice(5),
  }));

  return (
    <div className="card">
      <h3 className="section-title">Daily Spend Trend</h3>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#1F2430" strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: "#E6E6E6" }} />
            <YAxis tick={{ fill: "#E6E6E6" }} tickFormatter={(value) => formatCompactINR(Number(value))} />
            <Tooltip
              formatter={(value: number) => formatCurrencyINR(value)}
              contentStyle={{ background: "#111827", border: "1px solid #1F2937", color: "#E6E6E6" }}
              labelStyle={{ color: "#E6E6E6" }}
              itemStyle={{ color: "#E6E6E6" }}
            />
            <Line type="monotone" dataKey="amount" stroke="#22D3EE" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
