"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = { id: string; email: string };

type AuthContextType = {
  user: User | null;
  // PUBLIC_INTERFACE
  login: (email: string, password: string) => void;
  // PUBLIC_INTERFACE
  signup: (email: string, password: string) => void;
  // PUBLIC_INTERFACE
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function uid() {
  return Math.random().toString(36).slice(2);
}

/**
 * PUBLIC_INTERFACE
 * AuthProvider wraps the application and exposes user authentication state.
 * For this implementation, it uses localStorage to simulate auth.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // hydrate from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("nk_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem("nk_user");
      }
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("nk_user", JSON.stringify(user));
    else localStorage.removeItem("nk_user");
  }, [user]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      login: (email: string, password: string) => {
        // In a real app, call a backend. Here we accept any credentials.
        void password; // not used in demo auth
        setUser({ id: uid(), email });
      },
      signup: (email: string, password: string) => {
        void password; // not used in demo auth
        setUser({ id: uid(), email });
      },
      logout: () => setUser(null),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useAuth provides access to the authentication context.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
