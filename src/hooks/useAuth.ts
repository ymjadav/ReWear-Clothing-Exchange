import { useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  // Add other user fields as needed
}

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Example: Load user from localStorage/sessionStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual authentication logic/API call
      // Example mock:
      if (email === "test@example.com" && password === "password") {
        const loggedInUser: User = {
          id: "1",
          name: "Test User",
          email,
        };
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  return { user, loading, error, login, logout };
}
