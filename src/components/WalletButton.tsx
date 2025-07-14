import { useState } from "react";
import { useWallet } from "../hooks/useWallet";
import { useWalletBalance } from "../hooks/useWalletBalance";
import { connectWallet, disconnectWallet } from "../util/wallet";

export const WalletButton = () => {
  const [showModal, setShowModal] = useState(false);
  const { address, isPending } = useWallet();
  const { isLoading } = useWalletBalance();

  const buttonLabel = isPending ? "Loading..." : "Connect";

  if (!address) {
    return (
      <button
        type="button"
        onClick={() => void connectWallet()}
        className="bg-primary border border-primary text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/80 transition"
      >
        {buttonLabel}
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${isLoading ? "opacity-60" : ""}`}>
      {/* <span className="text-sm text-gray-700">Wallet Balance: {xlm} XLM</span> */}

      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-3 py-1 rounded-md text-sm font-medium transition"
      >
        {address.slice(0, 4)}...{address.slice(-4)}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-md shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-center">
              <span className="block text-sm text-gray-500 mb-1">
                Connected as
              </span>
              <code className="block text-sm font-mono text-gray-700 break-words bg-gray-100 px-2 py-1 rounded">
                {address}
              </code>
              <span className="block mt-4 text-base text-gray-700">
                Do you want to disconnect?
              </span>
            </h2>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  void disconnectWallet().then(() => setShowModal(false))
                }
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Disconnect
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
