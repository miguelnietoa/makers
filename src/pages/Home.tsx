"use client";

import { useExpenses } from "../hooks/useExpenses";
import ConnectAccount from "../components/ConnectAccount";
import UserRegistrationForm from "../components/UserRegistrationForm";
import { useUserRegistration } from "../hooks/useUserRegistration";

import ExpenseCard from "../components/ExpenseCard";

export default function Home() {
  const { data: expenses = [] } = useExpenses();
  const { isWalletConnected, isRegistered, isLoading } = useUserRegistration();

  // Show wallet connection screen if wallet is not connected
  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Expense Splitter
            </h1>
            <p className="text-gray-600 mb-8">
              Connect your wallet to get started
            </p>
          </div>
          <ConnectAccount />
        </div>
      </div>
    );
  }

  // Show registration form if wallet is connected but user is not registered
  if (isWalletConnected && !isRegistered && !isLoading) {
    return (
      <UserRegistrationForm
        onRegistrationSuccess={() => {
          // Optionally, you can refresh the page or fetch user data again
          window.location.reload();
        }}
      />
    );
  }

  // Show loading screen while checking registration status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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

      <div className="px-4 py-6 space-y-4">
        {recentExpenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
}
