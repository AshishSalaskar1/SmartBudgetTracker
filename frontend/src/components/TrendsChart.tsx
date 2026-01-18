import React from "react";

import { formatCurrencyINR } from "../utils/format";

interface DailySpend {
  date: string;
  amount: number;
}

export default function TrendsChart({ data }: { data: DailySpend[] }) {
  const max = Math.max(0, ...data.map((d) => d.amount));

  if (!data.length) {
    return (
      <div className="card">
        <h3 className="section-title">Daily Spend</h3>
        <p className="muted">No daily spend data available yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="section-title">Daily Spend</h3>
      <div className="chart">
        {data.map((d) => (
          <div key={d.date} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              className="chart-bar"
              style={{ height: max ? `${(d.amount / max) * 100}%` : "0%" }}
              title={`${d.date}: ${formatCurrencyINR(d.amount)}`}
            />
            <span className="muted" style={{ fontSize: 10, marginTop: 4 }}>
              {d.date.slice(5)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
