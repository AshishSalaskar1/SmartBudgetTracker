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

interface NetPoint {
  day: string;
  net: number;
}

export default function CumulativeNetLine({ data }: { data: NetPoint[] }) {
  if (!data.length) {
    return (
      <div className="card">
        <h3 className="section-title">Cumulative Net</h3>
        <p className="muted">No cumulative data available yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="section-title">Cumulative Net</h3>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="netGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6D64FF" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#6D64FF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1F2430" strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: "#E6E6E6" }} />
            <YAxis tick={{ fill: "#E6E6E6" }} tickFormatter={(value) => formatCompactINR(Number(value))} />
            <Tooltip
              formatter={(value: number) => formatCurrencyINR(value)}
              contentStyle={{ background: "#111827", border: "1px solid #1F2937", color: "#E6E6E6" }}
              labelStyle={{ color: "#E6E6E6" }}
              itemStyle={{ color: "#E6E6E6" }}
            />
            <Area type="monotone" dataKey="net" stroke="#6D64FF" fill="url(#netGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
