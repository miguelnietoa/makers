"use client";

import { useParams } from "react-router-dom";
import { mockGroups } from "../mock/mockGroups";
import { mockExpenses } from "../mock/mockExpenses";
import { mockUsers } from "../mock/mockUsers";
import ExpenseCard from "../components/ExpenseCard";

export default function GroupDetail() {
  const { id } = useParams();
  const group = mockGroups.find((g) => g.id === id);
  const groupExpenses = mockExpenses.filter((e) => e.groupId === id);

  if (!group) {
    return <div className="p-4">Group not found</div>;
  }

  const members = mockUsers.filter((user) => group.members.includes(user.id));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
        <p className="text-gray-600 mt-1">{members.length} members</p>

        {/* Balance Summary */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            {/* {group.yourBalance > 0 ? (
              <p className="text-green-600 font-semibold">
                You are owed ${group.yourBalance.toFixed(2)}
              </p>
            ) : group.yourBalance < 0 ? (
              <p className="text-red-600 font-semibold">
                You owe ${Math.abs(group.yourBalance).toFixed(2)}
              </p>
            ) : (
              <p className="text-gray-600 font-semibold">🎉 All settled up!</p>
            )} */}
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h2 className="font-semibold text-gray-900 mb-3">👥 Members</h2>
        <div className="space-y-2">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary-600 text-sm font-semibold">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-900">{member.name}</span>
              </div>
              <span className="text-sm text-gray-500">
                {member.id === "1" ? "You" : "Member"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Expenses Section */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-900">🧾 Expenses</h2>
          <button
            type="button"
            className="bg-primary-500 hover:bg-primary-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            ➕ Add Expense
          </button>
        </div>

        {groupExpenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
}
