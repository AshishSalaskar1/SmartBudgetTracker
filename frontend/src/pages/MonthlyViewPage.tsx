import React, { useEffect, useState } from "react";

import CategoryBarChart from "../components/CategoryBarChart";
import CategoryPieChart from "../components/CategoryPieChart";
import CumulativeNetLine from "../components/CumulativeNetLine";
import DailyFlowLines from "../components/DailyFlowLines";
import DailySpendLine from "../components/DailySpendLine";
import IncomeExpensePie from "../components/IncomeExpensePie";
import MonthlyInvestmentsSavingsBar from "../components/MonthlyInvestmentsSavingsBar";
import SummaryCards from "../components/SummaryCards";
import TopMerchantsBar from "../components/TopMerchantsBar";
import TransactionTable from "../components/TransactionTable";
import WeeklyCashflowBar from "../components/WeeklyCashflowBar";
import { getSummary, getTransactions } from "../services/api";

export default function MonthlyViewPage() {
  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [summary, setSummary] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const normalizedTransactions = transactions.map((txn) => ({
    ...txn,
    amount: Number(txn.amount || 0),
    direction: txn.direction || "debit",
    category: txn.category?.trim() || "Uncategorized",
    description: txn.description?.trim() || "Unknown",
  }));

  const expenseTransactions = normalizedTransactions.filter(
    (txn) => txn.direction === "debit" && txn.category !== "Investments"
  );


  const categoryTotals = expenseTransactions.reduce<Record<string, number>>((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryTotals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 8);

  const dailyFlowMap = expenseTransactions.reduce<Record<string, { date: string; credit: number; debit: number }>>(
    (acc, txn) => {
      if (!txn.date) return acc;
      if (!acc[txn.date]) {
        acc[txn.date] = { date: txn.date, credit: 0, debit: 0 };
      }
      acc[txn.date].debit += txn.amount;
      return acc;
    },
    {}
  );

  normalizedTransactions
    .filter((txn) => txn.direction === "credit")
    .forEach((txn) => {
      if (!txn.date) return;
      if (!dailyFlowMap[txn.date]) {
        dailyFlowMap[txn.date] = { date: txn.date, credit: 0, debit: 0 };
      }
      dailyFlowMap[txn.date].credit += txn.amount;
    });

  const dailyFlowData = Object.values(dailyFlowMap)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((item) => ({
      ...item,
      day: item.date.slice(5),
      net: item.credit - item.debit,
    }));

  let runningNet = 0;
  const cumulativeNetData = dailyFlowData.map((item) => {
    runningNet += item.net;
    return { day: item.day, net: runningNet };
  });

  const weeklyMap = expenseTransactions.reduce<Record<string, { week: string; credit: number; debit: number }>>(
    (acc, txn) => {
      const day = txn.date ? Number(txn.date.slice(8)) : 0;
      const weekIndex = day ? Math.ceil(day / 7) : 1;
      const weekLabel = `W${weekIndex}`;
      if (!acc[weekLabel]) {
        acc[weekLabel] = { week: weekLabel, credit: 0, debit: 0 };
      }
      acc[weekLabel].debit += txn.amount;
      return acc;
    },
    {}
  );

  normalizedTransactions
    .filter((txn) => txn.direction === "credit")
    .forEach((txn) => {
      const day = txn.date ? Number(txn.date.slice(8)) : 0;
      const weekIndex = day ? Math.ceil(day / 7) : 1;
      const weekLabel = `W${weekIndex}`;
      if (!weeklyMap[weekLabel]) {
        weeklyMap[weekLabel] = { week: weekLabel, credit: 0, debit: 0 };
      }
      weeklyMap[weekLabel].credit += txn.amount;
    });

  const weeklyData = Object.values(weeklyMap).sort((a, b) => a.week.localeCompare(b.week));

  const merchantTotals = expenseTransactions
    .reduce<Record<string, number>>((acc, txn) => {
      acc[txn.description] = (acc[txn.description] || 0) + txn.amount;
      return acc;
    }, {});

  const merchantData = Object.entries(merchantTotals)
    .map(([merchant, amount]) => ({ merchant, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6);

  const investmentTotal = Number(summary?.total_investments || 0);
  const savingsTotal = Number(summary?.net || 0);

  useEffect(() => {
    (async () => {
      try {
        const [summaryData, transactionData] = await Promise.all([
          getSummary(month, year),
          getTransactions(month, year),
        ]);
        setSummary(summaryData);
        setTransactions(transactionData);
        setError(null);
      } catch (err: any) {
        setError(err?.message || "Failed to load monthly data");
        setSummary(null);
        setTransactions([]);
      }
    })();
  }, [month, year]);

  return (
    <div className="card">
      <h2 className="section-title">Monthly View</h2>
      <div className="form-row">
        <label className="muted">
          Month
          <select className="select" value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {monthOptions.map((label, index) => (
              <option key={label} value={index + 1}>
                {label}
              </option>
            ))}
          </select>
        </label>
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
            <IncomeExpensePie summary={summary} />
            <DailySpendLine data={summary?.daily_spend || []} />
            <DailyFlowLines data={dailyFlowData} />
          </div>
          <CategoryPieChart data={categoryData} />
          <MonthlyInvestmentsSavingsBar investments={investmentTotal} savings={savingsTotal} />
          <div className="card-grid">
            <CategoryBarChart data={categoryData} />
            <WeeklyCashflowBar data={weeklyData} />
            <CumulativeNetLine data={cumulativeNetData} />
          </div>
          <TopMerchantsBar data={merchantData} />
          <TransactionTable transactions={transactions} />
        </div>
      )}
    </div>
  );
}
