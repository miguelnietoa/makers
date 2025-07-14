import { Link } from "react-router-dom";
import type { Group } from "../mock/mockGroups";

interface GroupCardProps {
  group: Group;
}

export default function GroupCard({ group }: GroupCardProps) {
  // const getBalanceColor = (balance: number) => {
  //   if (balance > 0) return "text-green-600";
  //   if (balance < 0) return "text-red-600";
  //   return "text-gray-600";
  // };

  // const getBalanceText = (balance: number) => {
  //   if (balance > 0) return `You are owed $${balance.toFixed(2)}`;
  //   if (balance < 0) return `You owe $${Math.abs(balance).toFixed(2)}`;
  //   return "All settled up";
  // };

  return (
    <Link to={`/groups/${group.id}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{group.name}</h3>
            <p className="text-sm text-gray-500">
              {group.members.length} members
            </p>
          </div>
          <div className="flex items-center">
            {group.status === "settled" ? (
              <span className="text-green-600 text-sm">🎉 Settled</span>
            ) : (
              <span className="text-orange-600 text-sm">⏳ Ongoing</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/* <span
            className={`text-sm font-medium ${getBalanceColor(group.yourBalance)}`}
          >
            {getBalanceText(group.yourBalance)}
          </span> */}
          <span className="text-xs text-gray-400">
            {new Date(group.lastActivity).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
