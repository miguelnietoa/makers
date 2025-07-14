"use client";

import { useExpenses } from "../hooks/useExpenses";
import ExpenseCard from "../components/ExpenseCard";

export default function Home() {
  const { data: expenses = [] } = useExpenses();
  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      {/* Expenses List */}
      <div className="px-4 py-6 space-y-4">
        {recentExpenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
}
