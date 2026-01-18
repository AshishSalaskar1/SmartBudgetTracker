import React, { createContext, useContext, useEffect, useState } from "react";

import { login as apiLogin, logout as apiLogout, me as apiMe } from "../services/auth";

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthContextValue {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const me = await apiMe();
      if (me) {
        setUser(me);
      }
    })();
  }, []);

  const login = async (username: string, password: string) => {
    const data = await apiLogin(username, password);
    if (data?.token) {
      localStorage.setItem("auth_token", data.token);
    }
    setUser({ id: data.id, username: data.username, role: data.role });
  };

  const logout = async () => {
    await apiLogout();
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("AuthProvider missing");
  }
  return ctx;
}
