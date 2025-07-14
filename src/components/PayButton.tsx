interface PayButtonProps {
  amount: number;
}

export default function PayButton({ amount }: PayButtonProps) {
  return (
    <button
      type="button"
      className="bg-primary-500 hover:bg-primary-600 text-black px-3 py-1 rounded-full text-xs font-medium transition-colors"
    >
      💸 Pay ${amount.toFixed(2)}
    </button>
  );
}
