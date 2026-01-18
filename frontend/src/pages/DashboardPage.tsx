import React, { useEffect, useState } from "react";

import MonthlyExpenseChangeBar from "../components/MonthlyExpenseChangeBar";
import SummaryCards from "../components/SummaryCards";
import YearlyCategoryPie from "../components/YearlyCategoryPie";
import YearlyCumulativeSpendLine from "../components/YearlyCumulativeSpendLine";
import YearlyExpenseTrendLine from "../components/YearlyExpenseTrendLine";
import YearlyIncomeExpenseLine from "../components/YearlyIncomeExpenseLine";
import YearlyInvestmentsSavingsBar from "../components/YearlyInvestmentsSavingsBar";
import YearlyNetSavingsBar from "../components/YearlyNetSavingsBar";
import YearlyTotalsBar from "../components/YearlyTotalsBar";
import YearlyTransactionTable from "../components/YearlyTransactionTable";
import { getYearlySummary, getYearlyTransactions } from "../services/api";

export default function DashboardPage() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [summary, setSummary] = useState<any>(null);
  const [yearly, setYearly] = useState<any>(null);
  const [yearlyTransactions, setYearlyTransactions] = useState<any[]>([]);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [error, setError] = useState<string | null>(null);
  const [tableError, setTableError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const yearlyData = await getYearlySummary(year);
        setSummary(yearlyData);
        setYearly(yearlyData);
        setError(null);
      } catch (err: any) {
        setError(err?.message || "Failed to load summary");
        setSummary(null);
        setYearly(null);
      }
    })();
  }, [year]);

  useEffect(() => {
    (async () => {
      try {
        const offset = (page - 1) * pageSize;
        const result = await getYearlyTransactions(year, pageSize, offset);
        setYearlyTransactions(result.items || []);
        setYearlyTotal(result.total || 0);
        setTableError(null);
      } catch (err: any) {
        setTableError(err?.message || "Failed to load yearly transactions");
        setYearlyTransactions([]);
        setYearlyTotal(0);
      }
    })();
  }, [year, page, pageSize]);

  const yearlyCategories = (yearly?.category_totals || []).slice(0, 8);
  const yearlyMonthlyTotals = yearly?.monthly_totals || [];

  return (
    <div className="card">
      <h2 className="section-title">Dashboard</h2>
      <div className="form-row">
        <label className="muted">
          Year
          <input
            className="input"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            min={2000}
            max={2100}
          />
        </label>
      </div>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <SummaryCards summary={summary} />
          <div className="card-grid">
            <YearlyTotalsBar data={yearlyMonthlyTotals} />
            <YearlyCategoryPie data={yearlyCategories} />
          </div>
          <div className="card-grid">
            <YearlyIncomeExpenseLine data={yearlyMonthlyTotals} />
            <YearlyExpenseTrendLine data={yearlyMonthlyTotals} />
          </div>
          <div className="card-grid">
            <YearlyNetSavingsBar data={yearlyMonthlyTotals} />
            <MonthlyExpenseChangeBar data={yearlyMonthlyTotals} />
          </div>
          <YearlyInvestmentsSavingsBar data={yearlyMonthlyTotals} />
          <YearlyCumulativeSpendLine data={yearlyMonthlyTotals} />
          {tableError ? (
            <p className="error">{tableError}</p>
          ) : (
            <YearlyTransactionTable
              transactions={yearlyTransactions}
              total={yearlyTotal}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
