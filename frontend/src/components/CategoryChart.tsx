import React from "react";

import { formatCurrencyINR } from "../utils/format";

interface CategoryPoint {
  category: string;
  amount: number;
}

export default function CategoryChart({ data }: { data: CategoryPoint[] }) {
  const max = Math.max(0, ...data.map((d) => d.amount));

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
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
        {data.map((item) => (
          <div key={item.category} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 160 }} className="muted">
              {item.category}
            </div>
            <div style={{ flex: 1, height: 10, background: "#1E2230", borderRadius: 999 }}>
              <div
                style={{
                  width: max ? `${(item.amount / max) * 100}%` : "0%",
                  height: "100%",
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #4F46E5, #22D3EE)",
                }}
                title={`${item.category}: ${formatCurrencyINR(item.amount)}`}
              />
            </div>
            <div style={{ width: 90, textAlign: "right" }}>{formatCurrencyINR(item.amount)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
