// import type { Expense } from "../mock/mockExpenses"
// import PayButton from "./PayButton"
// import HelpButton from "./HelpButton"
// import { mockUsers } from "../mock/mockUsers"
import { mockUsers } from "../mock/mockUsers";
import { Expense } from "../mock/mockExpenses";
import PayButton from "./PayButton";
import HelpButton from "./HelpButton";

interface ExpenseCardProps {
  expense: Expense;
  showActions?: boolean;
}
import { Link } from "react-router-dom";
// …otros imports

export default function ExpenseCard({
  expense,
  showActions = true,
}: ExpenseCardProps) {
  const paidByUser = mockUsers.find((u) => u.id === expense.paidBy);

  const statusColor =
    {
      you_owe: "text-red-600 bg-red-50",
      you_are_owed: "text-green-600 bg-green-50",
      settled: "text-gray-600 bg-gray-50",
    }[expense.status as "you_owe" | "you_are_owed" | "settled"] ??
    "text-gray-600 bg-gray-50";

  const statusText =
    {
      you_owe: `Debes $${expense.yourShare.toFixed(2)}`,
      you_are_owed: `Te deben $${expense.yourShare.toFixed(2)}`,
      settled: "🎉 Liquidado",
    }[expense.status as "you_owe" | "you_are_owed" | "settled"] ??
    "No involucrado";

  return (
    <div
      className="bg-white rounded-lg p-4 mb-3 shadow-lg block border border-gray-200
                  transition hover:-translate-y-[1px]
                 cursor-pointer"
    >
      <Link to={`/expenses/${expense.id}`} className="">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{expense.title}</h3>
            <p className="text-sm text-gray-500">{expense.description}</p>
            <p className="text-xs text-gray-400 mt-1">
              Paid by {paidByUser?.name} •{" "}
              {new Date(expense.date).toLocaleDateString()}
            </p>
          </div>
          <p className="font-semibold text-gray-900">
            ${expense.amount.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
            {statusText}
          </span>

          {showActions && expense.status === "you_owe" && (
            <div className="flex gap-2">
              <PayButton amount={expense.yourShare} />
              <HelpButton />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
