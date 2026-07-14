import { createContext, useContext, useState, type ReactNode } from "react";
import type { User, UserRole } from "../types";
import { mockUsers } from "../data/mockData";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string, role: UserRole): boolean => {
    const found = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
    if (found) { setUser(found); return true; }
    const fallback = mockUsers.find(u => u.role === role);
    if (fallback) { setUser(fallback); return true; }
    return false;
  };

  const logout = () => setUser(null);

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
