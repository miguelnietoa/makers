import type { User } from "../mock/mockUsers";

interface FriendCardProps {
  friend: User;
  balance: number;
}

export default function FriendCard({ friend, balance }: FriendCardProps) {
  const getBalanceColor = (balance: number) => {
    if (balance > 0) return "text-green-600";
    if (balance < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getBalanceText = (balance: number) => {
    if (balance > 0) return `owes you $${balance.toFixed(2)}`;
    if (balance < 0) return `you owe $${Math.abs(balance).toFixed(2)}`;
    return "settled up";
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 mb-2">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-primary-600 font-semibold">
            {friend.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="font-medium text-gray-900">{friend.name}</p>
          <p className="text-sm text-gray-500">{friend.email}</p>
        </div>
      </div>

      <div className="text-right">
        <p className={`text-sm font-medium ${getBalanceColor(balance)}`}>
          {getBalanceText(balance)}
        </p>
      </div>
    </div>
  );
}
