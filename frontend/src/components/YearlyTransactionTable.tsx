import React, { useMemo, useState } from "react";

import { formatCurrencyINR } from "../utils/format";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  reason: string;
  amount: number;
  direction: string;
}

interface YearlyTransactionTableProps {
  transactions: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function YearlyTransactionTable({
  transactions,
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: YearlyTransactionTableProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const pageRange = useMemo(() => {
    const range: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let i = start; i <= end; i += 1) {
      range.push(i);
    }
    return range;
  }, [page, totalPages]);

  return (
    <div className="card">
      <div className="table-header">
        <h3 className="section-title">Yearly Transactions</h3>
        <div className="table-meta muted">{total} records</div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Reason</th>
            <th>Amount</th>
            <th>Direction</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.date}</td>
              <td>{txn.description}</td>
              <td>{txn.category || "Uncategorized"}</td>
              <td>{txn.reason || "-"}</td>
              <td>{formatCurrencyINR(Number(txn.amount || 0))}</td>
              <td>{txn.direction}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="button ghost" disabled={!canPrev} onClick={() => onPageChange(page - 1)}>
          Prev
        </button>
        <div className="pagination-pages">
          {pageRange.map((value) => (
            <button
              key={value}
              className={`page-pill ${value === page ? "active" : ""}`}
              onClick={() => onPageChange(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <button className="button ghost" disabled={!canNext} onClick={() => onPageChange(page + 1)}>
          Next
        </button>
        <label className="muted">
          Rows
          <select className="select" value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
