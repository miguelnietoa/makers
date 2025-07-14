import React, { useState } from "react";
import { useUserRegistration } from "../hooks/useUserRegistration";
import ConnectAccount from "./ConnectAccount";

interface UserRegistrationFormProps {
  onRegistrationSuccess?: () => void;
}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  onRegistrationSuccess,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { register, isLoading } = useUserRegistration();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please fill in all fields");
      return;
    }

    void (async () => {
      try {
        await register(firstName.trim(), lastName.trim());
        onRegistrationSuccess?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Registration failed");
      }
    })();
  };

  return (
    <>
      {/* Div centered horizontally */}
      <div className=" bg-white flex items-center justify-center px-4">
        <ConnectAccount />
      </div>

      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Complete Your Registration
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please provide your information to continue
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-lime-500 focus:border-lime-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-lime-500 focus:border-lime-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registering..." : "Complete Registration"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRegistrationForm;
