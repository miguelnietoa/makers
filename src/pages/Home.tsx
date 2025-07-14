"use client";

import { useExpenses } from "../hooks/useExpenses";
import ExpenseCard from "../components/ExpenseCard";

export default function Home() {
  const { data: expenses = [] } = useExpenses();
  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className=" border-b border-gray-200 px-4 pb-8 pt-2 bg-[#c6ff00] flex flex-col gap-1">
        <span className="text-2xl font-bold text-gray-900">
          💰 Welcome back!
        </span>
        <p className="text-gray-600 mt-1">Manage your debts and expenses</p>
      </div>

      {/* Expenses List */}
      <div className="px-4 py-6 space-y-4">
        {recentExpenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
}
