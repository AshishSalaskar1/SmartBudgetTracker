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

interface InvestmentsSavingsProps {
  investments: number;
  savings: number;
}

export default function MonthlyInvestmentsSavingsBar({ investments, savings }: InvestmentsSavingsProps) {
  const data = [
    { label: "Investments", value: Number(investments || 0) },
    { label: "Savings", value: Number(savings || 0) },
  ];

  const hasData = data.some((item) => Math.abs(item.value) > 0);

  if (!hasData) {
    return (
      <div className="card">
        <h3 className="section-title">Investments vs Savings</h3>
        <p className="muted">No investment or savings data available yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="section-title">Investments vs Savings</h3>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#1F2430" strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fill: "#E6E6E6" }} />
            <YAxis tick={{ fill: "#E6E6E6" }} tickFormatter={(value) => formatCompactINR(Number(value))} />
            <Tooltip
              formatter={(value: number) => formatCurrencyINR(value)}
              contentStyle={{ background: "#111827", border: "1px solid #1F2937", color: "#E6E6E6" }}
              labelStyle={{ color: "#E6E6E6" }}
              itemStyle={{ color: "#E6E6E6" }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((item) => (
                <Cell
                  key={item.label}
                  fill={item.label === "Investments" ? "#8B5CF6" : item.value >= 0 ? "#22C55E" : "#F87171"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
