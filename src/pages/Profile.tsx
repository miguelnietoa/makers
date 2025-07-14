import { currentUser } from "../mock/mockUsers";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className=" border-b border-gray-200 px-4 pb-8 pt-2 bg-[#c6ff00] flex flex-col gap-1">
        <span className="text-2xl font-bold text-gray-900">👤 Profile</span>
        <p className="text-gray-600 mt-1">Manage your account settings</p>
      </div>

      {/* Profile Info */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-primary text-2xl font-semibold">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {currentUser.name}
              </h2>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>

          <Link
            to="/edit-profile"
            className="block w-full text-center bg-primary hover:bg-primary/80 text-black py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Edit Profile
          </Link>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          <Link
            to="/notifications"
            className="block w-full bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-900">🔔 Notifications</span>
              <span className="text-gray-400">›</span>
            </div>
          </Link>

          <Link
            to="/payment-methods"
            className="block w-full bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-900">💳 Payment Methods</span>
              <span className="text-gray-400">›</span>
            </div>
          </Link>

          <Link
            to="/privacy"
            className="block w-full bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-900">🔒 Privacy & Security</span>
              <span className="text-gray-400">›</span>
            </div>
          </Link>

          <Link
            to="/help"
            className="block w-full bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-900">🆘 Help & Support</span>
              <span className="text-gray-400">›</span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => console.log("Sign out")}
            className="w-full bg-white border border-gray-200 rounded-lg p-4 text-left hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-red-600">🚪 Sign Out</span>
              <span className="text-gray-400">›</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
