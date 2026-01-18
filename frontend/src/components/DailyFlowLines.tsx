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

interface DailyFlow {
  day: string;
  credit: number;
  debit: number;
}

export default function DailyFlowLines({ data }: { data: DailyFlow[] }) {
  if (!data.length) {
    return (
      <div className="card">
        <h3 className="section-title">Daily Inflow vs Outflow</h3>
        <p className="muted">No daily flow data available yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="section-title">Daily Inflow vs Outflow</h3>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#1F2430" strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: "#E6E6E6" }} />
            <YAxis tick={{ fill: "#E6E6E6" }} tickFormatter={(value) => formatCompactINR(Number(value))} />
            <Tooltip
              formatter={(value: number) => formatCurrencyINR(value)}
              contentStyle={{ background: "#111827", border: "1px solid #1F2937", color: "#E6E6E6" }}
              labelStyle={{ color: "#E6E6E6" }}
              itemStyle={{ color: "#E6E6E6" }}
            />
            <Line type="monotone" dataKey="credit" stroke="#22C55E" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="debit" stroke="#F97316" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
