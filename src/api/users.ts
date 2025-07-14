// Get environment variables using Vite's import.meta.env
const SUPABASE_URL =
  import.meta.env.PUBLIC_SUPABASE_URL ||
  "https://qevsvtmjquyujppeffqr.supabase.co/rest/v1";

const getApiKey = (): string => {
  return import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "";
};

export interface User {
  wallet_address: string;
  firstname: string;
  lastname: string;
}

export const registerUser = async (userData: User): Promise<User> => {
  try {
    const apiKey = getApiKey();
    const response = await fetch(`${SUPABASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to register user: ${response.statusText}`);
    }

    const user = (await response.json()) as User;
    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const getUserByWalletAddress = async (
  walletAddress: string,
): Promise<User | null> => {
  try {
    const apiKey = getApiKey();
    const response = await fetch(
      `${SUPABASE_URL}/users?wallet_address=eq.${walletAddress}&select=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const users = (await response.json()) as User[];
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
