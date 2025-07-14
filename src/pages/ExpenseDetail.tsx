"use client";

import { useParams } from "react-router-dom";
import { mockExpenses } from "../mock/mockExpenses";
import { mockUsers } from "../mock/mockUsers";
import PayButton from "../components/PayButton";
import HelpButton from "../components/HelpButton";
import WithdrawButton from "../components/WithdrawButton";

export default function ExpenseDetail() {
  const { id } = useParams();
  const expense = mockExpenses.find((e) => e.id === id);

  if (!expense) {
    return <div className="p-4">Expense not found</div>;
  }

  const paidByUser = mockUsers.find((user) => user.id === expense.paidBy);
  const participants = mockUsers.filter((user) =>
    expense.participants.includes(user.id),
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">{expense.title}</h1>
        <p className="text-gray-600 mt-1">{expense.description}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          ${expense.amount.toFixed(2)}
        </p>
      </div>

      {/* Expense Info */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Date</span>
            <span className="text-gray-900">
              {new Date(expense.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Paid by</span>
            <span className="text-gray-900">{paidByUser?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Your share</span>
            <span className="text-gray-900 font-semibold">
              ${expense.yourShare.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Participants */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h2 className="font-semibold text-gray-900 mb-3">👥 Split between</h2>
        <div className="space-y-2">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary-600 text-sm font-semibold">
                    {participant.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-900">{participant.name}</span>
              </div>
              <span className="text-sm text-gray-600">
                ${(expense.amount / participants.length).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-6">
        <div className="space-y-3">
          {expense.status === "you_owe" && (
            <>
              <PayButton amount={expense.yourShare} />
              <div className="flex gap-2">
                <HelpButton />
                <WithdrawButton />
              </div>
            </>
          )}

          {expense.status === "you_are_owed" && (
            <div className="text-center py-4">
              <p className="text-green-600 font-semibold">
                💰 You are owed ${expense.yourShare.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Waiting for payment from others
              </p>
            </div>
          )}

          {expense.status === "settled" && (
            <div className="text-center py-4">
              <p className="text-gray-600 font-semibold">
                🎉 This expense is settled
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
