import { useState, useEffect } from "react";
import { useWallet } from "./useWallet";
import { registerUser, getUserByWalletAddress, User } from "../api/users";

export const useUserRegistration = () => {
  const { address } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Check if user exists when wallet is connected
  useEffect(() => {
    const checkUserExists = async () => {
      if (!address) {
        setUser(null);
        setIsRegistered(false);
        return;
      }

      console.log("Checking if user exists for wallet address:", address);
      setIsLoading(true);
      try {
        const existingUser = await getUserByWalletAddress(address);
        console.log("User lookup result:", existingUser);

        if (existingUser) {
          console.log("User found, setting as registered");
          setUser(existingUser);
          setIsRegistered(true);
        } else {
          console.log("User not found, will show registration form");
          setIsRegistered(false);
        }
      } catch (error) {
        console.error("Error checking user registration:", error);
        setIsRegistered(false);
      } finally {
        setIsLoading(false);
      }
    };

    void checkUserExists();
  }, [address]);

  const register = async (
    firstName: string,
    lastName: string,
  ): Promise<void> => {
    if (!address) {
      throw new Error("Wallet must be connected to register");
    }

    setIsLoading(true);
    try {
      const userData: User = {
        wallet_address: address,
        firstname: firstName,
        lastname: lastName,
      };

      console.log("Registering user:", userData);

      const newUser = await registerUser(userData);

      console.log("User registered successfully:", newUser);
      setUser(newUser);
      setIsRegistered(true);
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    isRegistered,
    register,
    isWalletConnected: !!address,
  };
};
