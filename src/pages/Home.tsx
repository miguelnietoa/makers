"use client";

import { useState } from "react";
import { mockUsers } from "../mock/mockUsers";
import ExpenseCard from "../components/ExpenseCard";
import FriendCard from "../components/FriendCard";
import { useExpenses } from "../hooks/useExpenses";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"expenses" | "friends">(
    "expenses",
  );

  const { data: expenses = [] } = useExpenses();

  const youOweTotal = expenses
    .filter((e) => e.status === "you_owe")
    .reduce((sum, e) => sum + e.yourShare, 0);

  const owesYouTotal = expenses
    .filter((e) => e.status === "you_are_owed")
    .reduce((sum, e) => sum + e.yourShare, 0);

  const recentExpenses = expenses.slice(0, 5);

  const friendBalances = [
    { friend: mockUsers[1], balance: 45.5 },
    { friend: mockUsers[2], balance: -23.75 },
    { friend: mockUsers[3], balance: 67.25 },
    { friend: mockUsers[4], balance: -12.0 },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <div className=" px-4 py-6 shadow-sm top-0 z-10">
        <h1 className="text-xl font-semibold text-black mb-5">Your Balance</h1>

        <div className="flex gap-4">
          <div className="flex-1 rounded-lg bg-[#eec5c5] backdrop-blur p-4 shadow">
            <p className="text-xs text-black font-medium uppercase">You owe</p>
            <p className="text-2xl font-bold text-red-700">
              ${youOweTotal.toFixed(2)}
            </p>
          </div>
          <div className="flex-1 rounded-lg bg-[#C6FF00] p-4 shadow">
            <p className="text-xs text-[lime-600] font-medium uppercase">
              Owes you
            </p>
            <p className="text-2xl font-bold text-lime-700">
              ${owesYouTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <div className="flex">
          <button
            onClick={() => setActiveTab("expenses")}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === "expenses"
                ? "border-b-2 border-lime-500 text-lime-600"
                : "text-gray-400"
            }`}
          >
            🧾 Expenses
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === "friends"
                ? "border-b-2 border-lime-500 text-lime-600"
                : "text-gray-400"
            }`}
          >
            👥 Friends
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-4">
        {activeTab === "expenses"
          ? recentExpenses.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))
          : friendBalances.map(({ friend, balance }) => (
              <FriendCard key={friend.id} friend={friend} balance={balance} />
            ))}
      </div>
    </div>
  );
}
