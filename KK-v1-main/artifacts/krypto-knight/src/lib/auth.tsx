import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const API = "https://api.krypto-knight.com";

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  isAdmin: boolean;
  emailVerified: boolean;
  twoFaEnabled: boolean;
  phoneVerified: boolean;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem("kk_client_token"),
    loading: true,
  });

  const apiFetch = useCallback(async (path: string, opts: RequestInit = {}, token?: string | null) => {
    const t = token ?? state.token;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (t) headers["Authorization"] = `Bearer ${t}`;
    const res = await fetch(`${API}${path}`, { ...opts, headers: { ...headers, ...(opts.headers as Record<string, string> ?? {}) } });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Request failed");
    return data.data;
  }, [state.token]);

  const loadUser = useCallback(async (token: string) => {
    try {
      const data = await apiFetch("/me", {}, token);
      setState(s => ({ ...s, user: data.user, loading: false }));
    } catch {
      localStorage.removeItem("kk_client_token");
      setState({ user: null, token: null, loading: false });
    }
  }, [apiFetch]);

  useEffect(() => {
    const token = localStorage.getItem("kk_client_token");
    if (token) {
      loadUser(token);
    } else {
      setState(s => ({ ...s, loading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }, null);
    localStorage.setItem("kk_client_token", data.token);
    setState({ user: data.user, token: data.token, loading: false });
  }, [apiFetch]);

  const register = useCallback(async (email: string, password: string, firstName?: string, lastName?: string) => {
    const data = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, firstName, lastName }),
    }, null);
    localStorage.setItem("kk_client_token", data.token);
    setState({ user: data.user, token: data.token, loading: false });
  }, [apiFetch]);

  const logout = useCallback(async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch { /* ignore */ }
    localStorage.removeItem("kk_client_token");
    setState({ user: null, token: null, loading: false });
  }, [apiFetch]);

  const refreshUser = useCallback(async () => {
    if (!state.token) return;
    await loadUser(state.token);
  }, [state.token, loadUser]);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
