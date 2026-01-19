import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/router";

export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "pending" | "approved";
  image?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
  handleUnauthorized: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  // ✅ Lazy initialization - reads from localStorage only once on client
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token") || sessionStorage.getItem("userToken");
  });

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Loading is false since we initialize synchronously
  const [loading] = useState(false);

  const login = (token: string, user: User) => {
    if (typeof window === "undefined") return;
    
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    if (typeof window === "undefined") return;
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("userToken");
    setToken(null);
    setUser(null);
    router.replace("/signin");
  };

  const handleUnauthorized = () => {
  logout();
};

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, handleUnauthorized }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};