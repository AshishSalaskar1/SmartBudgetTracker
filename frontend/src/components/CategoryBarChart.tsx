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

import { formatCurrencyINR } from "../utils/format";

interface CategoryPoint {
  category: string;
  amount: number;
}

export default function CategoryBarChart({ data }: { data: CategoryPoint[] }) {
  if (!data.length) {
    return (
      <div className="card">
        <h3 className="section-title">Category Spend</h3>
        <p className="muted">No category spend data available yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="section-title">Category Spend</h3>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
            <CartesianGrid stroke="#1F2430" strokeDasharray="3 3" />
            <XAxis dataKey="category" angle={-20} textAnchor="end" height={50} tick={{ fill: "#E6E6E6" }} />
            <YAxis tick={{ fill: "#E6E6E6" }} />
            <Tooltip
              formatter={(value: number) => formatCurrencyINR(value)}
              contentStyle={{ background: "#111827", border: "1px solid #1F2937", color: "#E6E6E6" }}
              labelStyle={{ color: "#E6E6E6" }}
              itemStyle={{ color: "#E6E6E6" }}
            />
            <Bar dataKey="amount" fill="#4F46E5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
