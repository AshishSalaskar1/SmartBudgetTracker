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

export default function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [directionFilter, setDirectionFilter] = useState("all");
  const [dateSort, setDateSort] = useState<"desc" | "asc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const categories = useMemo(() => {
    const values = new Set<string>();
    transactions.forEach((txn) => {
      const label = txn.category?.trim() || "Uncategorized";
      values.add(label);
    });
    return Array.from(values).sort();
  }, [transactions]);

  const filtered = useMemo(() => {
    return transactions
      .map((txn) => ({
        ...txn,
        category: txn.category?.trim() || "Uncategorized",
        reason: txn.reason?.trim() || "-",
      }))
      .filter((txn) => (categoryFilter === "all" ? true : txn.category === categoryFilter))
      .filter((txn) => (directionFilter === "all" ? true : txn.direction === directionFilter))
      .sort((a, b) => {
        const aDate = new Date(a.date).getTime() || 0;
        const bDate = new Date(b.date).getTime() || 0;
        return dateSort === "asc" ? aDate - bDate : bDate - aDate;
      });
  }, [transactions, categoryFilter, directionFilter, dateSort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paged = filtered.slice(startIndex, startIndex + pageSize);

  const pageRange = useMemo(() => {
    const range: number[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i += 1) {
      range.push(i);
    }
    return range;
  }, [currentPage, totalPages]);

  const resetPage = () => setPage(1);

  return (
    <div className="card">
      <h3 className="section-title">Transactions</h3>
      <div className="table-controls">
        <label className="muted">
          Category
          <select
            className="select"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              resetPage();
            }}
          >
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="muted">
          Direction
          <select
            className="select"
            value={directionFilter}
            onChange={(e) => {
              setDirectionFilter(e.target.value);
              resetPage();
            }}
          >
            <option value="all">All</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </label>
        <label className="muted">
          Date sort
          <select
            className="select"
            value={dateSort}
            onChange={(e) => {
              setDateSort(e.target.value as "asc" | "desc");
              resetPage();
            }}
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </label>
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
          {paged.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.date}</td>
              <td>{txn.description}</td>
              <td>{txn.category}</td>
              <td>{txn.reason}</td>
              <td>{formatCurrencyINR(Number(txn.amount || 0))}</td>
              <td>{txn.direction}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="button ghost" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>
          Prev
        </button>
        <div className="pagination-pages">
          {pageRange.map((value) => (
            <button
              key={value}
              className={`page-pill ${value === currentPage ? "active" : ""}`}
              onClick={() => setPage(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <button className="button ghost" disabled={currentPage >= totalPages} onClick={() => setPage(currentPage + 1)}>
          Next
        </button>
        <label className="muted">
          Rows
          <select
            className="select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
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
