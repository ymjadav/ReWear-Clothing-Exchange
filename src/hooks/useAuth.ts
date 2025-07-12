import { useState, useEffect, useCallback } from "react";
import {
  getUser,
  login as supabaseLogin,
  logout as supabaseLogout,
} from "@/lib/supabase"; // Adjust the import based on your project structure

interface User {
  id: string;
  name: string;
  email: string;
  created_at?: string; // Optional field for user creation date
  // You can add more fields as needed, such as profile picture, etc.
  // Add other user fields as needed
}

interface UseAuthReturn {
  isAuthenticated: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Load user from localStorage/sessionStorage
    checkAuthStatus();
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const checkAuthStatus = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedUser = await getUser();
      if (fetchedUser) {
        setUser({
          id: fetchedUser.id,
          name: fetchedUser.user_metadata?.name || "",
          email: fetchedUser.email || "",
        });
      }
    } catch (err) {
      setError(err.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { user, session } = await supabaseLogin(email, password);

      if (user) {
        const userObj: User = {
          id: user.id,
          name: user.user_metadata?.name || "",
          email: user.email || "",
        };
        setUser(userObj);
        localStorage.setItem("user", JSON.stringify(userObj));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Login failed");
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    await supabaseLogout();
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  return { user, loading, error, login, logout, isAuthenticated };
}
