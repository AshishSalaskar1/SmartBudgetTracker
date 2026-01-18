import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCompactINR, formatCurrencyINR } from "../utils/format";

interface WeeklyCashflow {
  week: string;
  credit: number;
  debit: number;
}

export default function WeeklyCashflowBar({ data }: { data: WeeklyCashflow[] }) {
  if (!data.length) {
    return (
      <div className="card">
        <h3 className="section-title">Weekly Cashflow</h3>
        <p className="muted">No weekly data available yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="section-title">Weekly Cashflow</h3>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#1F2430" strokeDasharray="3 3" />
            <XAxis dataKey="week" tick={{ fill: "#E6E6E6" }} />
            <YAxis
              tick={{ fill: "#E6E6E6" }}
              tickFormatter={(value) => formatCompactINR(Number(value))}
              width={72}
              tickMargin={8}
            />
            <Tooltip
              formatter={(value: number) => formatCurrencyINR(value)}
              contentStyle={{ background: "#111827", border: "1px solid #1F2937", color: "#E6E6E6" }}
              labelStyle={{ color: "#E6E6E6" }}
              itemStyle={{ color: "#E6E6E6" }}
            />
            <Legend wrapperStyle={{ color: "#E6E6E6" }} />
            <Bar dataKey="credit" stackId="flow" fill="#22C55E" radius={[6, 6, 0, 0]} />
            <Bar dataKey="debit" stackId="flow" fill="#F97316" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
