import React from "react";

import { formatCurrencyINR } from "../utils/format";

interface SummaryCardsProps {
  summary: {
    total_income: number;
    total_expense: number;
    net: number;
    transaction_count: number;
  } | null;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  if (!summary) return null;

  return (
    <div className="card-grid">
      <div
        className="card"
        style={{
          borderColor: "rgba(34, 197, 94, 0.35)",
          background: "linear-gradient(135deg, rgba(34, 197, 94, 0.22), rgba(19, 24, 39, 0.9))",
        }}
      >
        <div className="muted">Income</div>
        <h3>{formatCurrencyINR(summary.total_income)}</h3>
      </div>
      <div
        className="card"
        style={{
          borderColor: "rgba(248, 113, 113, 0.35)",
          background: "linear-gradient(135deg, rgba(248, 113, 113, 0.22), rgba(19, 24, 39, 0.9))",
        }}
      >
        <div className="muted">Expense</div>
        <h3>{formatCurrencyINR(summary.total_expense)}</h3>
      </div>
      <div
        className="card"
        style={{
          borderColor: "rgba(245, 158, 11, 0.35)",
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(19, 24, 39, 0.9))",
        }}
      >
        <div className="muted">Net</div>
        <h3>{formatCurrencyINR(summary.net)}</h3>
      </div>
      <div
        className="card"
        style={{
          borderColor: "rgba(79, 70, 229, 0.5)",
          background: "linear-gradient(135deg, rgba(79, 70, 229, 0.25), rgba(19, 24, 39, 0.9))",
        }}
      >
        <div className="muted">Transactions</div>
        <h3>{summary.transaction_count}</h3>
      </div>
    </div>
  );
}
