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

interface MerchantPoint {
  merchant: string;
  amount: number;
}

export default function TopMerchantsBar({ data }: { data: MerchantPoint[] }) {
  if (!data.length) {
    return (
      <div className="card">
        <h3 className="section-title">Top Merchants</h3>
        <p className="muted">No merchant data available yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="section-title">Top Merchants</h3>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
            <CartesianGrid stroke="#1F2430" strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fill: "#E6E6E6" }} tickFormatter={(value) => formatCompactINR(Number(value))} />
            <YAxis type="category" dataKey="merchant" width={100} tick={{ fill: "#E6E6E6" }} />
            <Tooltip
              formatter={(value: number) => formatCurrencyINR(value)}
              contentStyle={{ background: "#111827", border: "1px solid #1F2937", color: "#E6E6E6" }}
              labelStyle={{ color: "#E6E6E6" }}
              itemStyle={{ color: "#E6E6E6" }}
            />
            <Bar dataKey="amount" fill="#22D3EE" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
