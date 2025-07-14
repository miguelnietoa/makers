import type { User } from "../mock/mockUsers";

interface FriendCardProps {
  friend: User;
  balance: number;
}

export default function FriendCard({ friend, balance }: FriendCardProps) {
  /* ───────── helpers ───────── */
  const color =
    balance > 0
      ? "text-green-600 bg-green-50"
      : balance < 0
        ? "text-red-600 bg-red-50"
        : "text-gray-600 bg-gray-50";

  const text =
    balance > 0
      ? `owes you $${balance.toFixed(2)}`
      : balance < 0
        ? `you owe $${Math.abs(balance).toFixed(2)}`
        : "settled up";

  /* ───────── UI ───────── */
  return (
    <div
      className="bg-white rounded-lg p-4 mb-3 shadow-lg border border-gray-200
                 transition hover:-translate-y-[1px] flex items-center justify-between"
    >
      {/* avatar + info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary font-semibold">
            {friend.name[0].toUpperCase()}
          </span>
        </div>

        <div>
          <p className="font-medium text-gray-900">{friend.name}</p>
          <p className="text-sm text-gray-500">{friend.email}</p>
        </div>
      </div>

      {/* balance badge */}
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${color}`}>
        {text}
      </span>
    </div>
  );
}
